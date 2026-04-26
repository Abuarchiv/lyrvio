/**
 * Turso DB Backup Worker
 *
 * Cloudflare Worker mit Cron-Trigger: täglich 03:00 UTC
 * Strategie: libSQL HTTP API → JSON-Dump → R2 Upload (30-Tage-Retention)
 *
 * Turso bietet kein direktes pg_dump-äquivalent über HTTP.
 * Wir verwenden die libSQL HTTP API zum Lesen aller Tabellen + JSON-Serialisierung.
 * Für vollständige SQLite-Binary-Backups: Turso CLI nutzen (separater Cron-Job).
 *
 * Deployment:
 *   cd infra/backup
 *   wrangler deploy
 */

export interface Env {
  TURSO_DATABASE_URL: string;
  TURSO_AUTH_TOKEN: string;
  BACKUP_BUCKET: R2Bucket;
  BACKUP_ENCRYPTION_KEY?: string; // Optional: AES-256 Verschlüsselung
}

interface TableRow {
  [column: string]: unknown;
}

interface BackupManifest {
  timestamp: string;
  version: string;
  tables: Record<string, { rows: number }>;
  size_bytes: number;
  checksum: string;
}

/**
 * Führt eine SQL-Query gegen Turso via HTTP API aus.
 */
async function tursoQuery(
  url: string,
  token: string,
  sql: string,
  args: unknown[] = []
): Promise<{ columns: string[]; rows: unknown[][] }> {
  const response = await fetch(`${url}/v2/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          type: 'execute',
          stmt: { sql, args: args.map((a) => ({ type: 'text', value: String(a) })) },
        },
        { type: 'close' },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Turso query failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as {
    results: Array<{
      type: string;
      response?: {
        result?: {
          cols: Array<{ name: string }>;
          rows: unknown[][];
        };
      };
    }>;
  };

  const result = data.results[0];
  if (result.type !== 'ok' || !result.response?.result) {
    throw new Error(`Turso query error: ${JSON.stringify(result)}`);
  }

  return {
    columns: result.response.result.cols.map((c) => c.name),
    rows: result.response.result.rows,
  };
}

/**
 * Holt alle Tabellennamen aus der SQLite-Datenbank.
 */
async function getTables(url: string, token: string): Promise<string[]> {
  const result = await tursoQuery(
    url,
    token,
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '__drizzle%' ORDER BY name"
  );

  return result.rows.map((row) => String((row as unknown[])[0]));
}

/**
 * Dumpt eine einzelne Tabelle als Array von Objekten.
 */
async function dumpTable(
  url: string,
  token: string,
  tableName: string
): Promise<TableRow[]> {
  const result = await tursoQuery(url, token, `SELECT * FROM "${tableName}"`);

  return result.rows.map((row) => {
    const obj: TableRow = {};
    result.columns.forEach((col, i) => {
      obj[col] = (row as unknown[])[i];
    });
    return obj;
  });
}

/**
 * Berechnet SHA-256 Checksum eines Strings.
 */
async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Schreibt den Backup-Status in eine R2-Datei (für GitHub Actions Verification).
 */
async function writeBackupStatus(
  bucket: R2Bucket,
  manifest: BackupManifest,
  success: boolean,
  error?: string
): Promise<void> {
  const status = {
    last_run: manifest.timestamp,
    success,
    error: error ?? null,
    tables: manifest.tables,
    size_bytes: manifest.size_bytes,
  };

  await bucket.put('_status/last-backup.json', JSON.stringify(status, null, 2), {
    httpMetadata: { contentType: 'application/json' },
  });
}

/**
 * Haupt-Handler: Cron-Trigger täglich 03:00 UTC
 */
export default {
  async scheduled(
    _event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    ctx.waitUntil(runBackup(env));
  },

  // HTTP-Handler für manuelle Trigger (z.B. POST /backup)
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Basic Auth für manuellen Trigger
    const auth = request.headers.get('Authorization');
    if (!auth || !auth.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
      const manifest = await runBackup(env);
      return Response.json({ success: true, manifest });
    } catch (err) {
      return Response.json(
        { success: false, error: String(err) },
        { status: 500 }
      );
    }
  },
};

async function runBackup(env: Env): Promise<BackupManifest> {
  const timestamp = new Date().toISOString();
  const dateStr = timestamp.split('T')[0]; // YYYY-MM-DD

  console.log(`[Backup] Starting Turso backup at ${timestamp}`);

  let tables: string[];
  try {
    tables = await getTables(env.TURSO_DATABASE_URL, env.TURSO_AUTH_TOKEN);
  } catch (err) {
    await writeBackupStatus(
      env.BACKUP_BUCKET,
      { timestamp, version: '1', tables: {}, size_bytes: 0, checksum: '' },
      false,
      String(err)
    );
    throw err;
  }

  console.log(`[Backup] Found tables: ${tables.join(', ')}`);

  const dump: Record<string, TableRow[]> = {};
  const tableMeta: Record<string, { rows: number }> = {};

  for (const table of tables) {
    const rows = await dumpTable(env.TURSO_DATABASE_URL, env.TURSO_AUTH_TOKEN, table);
    dump[table] = rows;
    tableMeta[table] = { rows: rows.length };
    console.log(`[Backup] Dumped ${table}: ${rows.length} rows`);
  }

  const backupData = JSON.stringify(
    {
      metadata: {
        timestamp,
        source: 'turso',
        format: 'json-dump-v1',
      },
      tables: dump,
    },
    null,
    2
  );

  const checksum = await sha256(backupData);
  const sizeBytes = new TextEncoder().encode(backupData).length;

  const manifest: BackupManifest = {
    timestamp,
    version: '1',
    tables: tableMeta,
    size_bytes: sizeBytes,
    checksum,
  };

  // R2: Tages-Backup mit Datum im Pfad
  const backupKey = `backups/${dateStr}/lyrvio-db-${timestamp}.json`;
  const manifestKey = `backups/${dateStr}/manifest.json`;

  await env.BACKUP_BUCKET.put(backupKey, backupData, {
    httpMetadata: {
      contentType: 'application/json',
      contentEncoding: 'identity',
    },
    customMetadata: {
      checksum,
      timestamp,
      tables: tables.join(','),
    },
  });

  await env.BACKUP_BUCKET.put(manifestKey, JSON.stringify(manifest, null, 2), {
    httpMetadata: { contentType: 'application/json' },
  });

  // Status-Datei für Monitoring updaten
  await writeBackupStatus(env.BACKUP_BUCKET, manifest, true);

  console.log(`[Backup] Completed. Key: ${backupKey}, Size: ${sizeBytes} bytes, Checksum: ${checksum}`);

  // Alte Backups bereinigen (>30 Tage) — R2 Lifecycle Rules empfohlen
  // Alternativ: manuelle Bereinigung hier
  await pruneOldBackups(env.BACKUP_BUCKET, 30);

  return manifest;
}

/**
 * Entfernt Backups die älter als `retentionDays` sind.
 * R2 Lifecycle Rules sind bevorzugt — dies ist der Fallback.
 */
async function pruneOldBackups(bucket: R2Bucket, retentionDays: number): Promise<void> {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - retentionDays);

  const listed = await bucket.list({ prefix: 'backups/' });

  for (const obj of listed.objects) {
    const uploaded = obj.uploaded;
    if (uploaded < cutoff) {
      await bucket.delete(obj.key);
      console.log(`[Backup] Pruned old backup: ${obj.key}`);
    }
  }
}
