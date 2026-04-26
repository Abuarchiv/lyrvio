"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type UploadState =
  | { status: "idle" }
  | { status: "uploading"; progress: number }
  | { status: "ocr" }
  | { status: "done"; url: string; filename: string; extractedFields?: Record<string, string> }
  | { status: "error"; message: string };

interface MappeUploaderProps {
  onUpload: (url: string) => void;
  className?: string;
}

export function MappeUploader({ onUpload, className }: MappeUploaderProps) {
  const [state, setState] = useState<UploadState>({ status: "idle" });
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.includes("pdf") && !file.type.includes("image")) {
        setState({
          status: "error",
          message: "Nur PDF oder Bild-Dateien erlaubt (JPG, PNG, PDF)",
        });
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        setState({ status: "error", message: "Datei zu groß (max. 20 MB)" });
        return;
      }

      setState({ status: "uploading", progress: 0 });

      // Simulate upload progress
      const simulateProgress = () => {
        let p = 0;
        const iv = setInterval(() => {
          p += Math.random() * 20;
          if (p >= 90) {
            clearInterval(iv);
            p = 90;
          }
          setState({ status: "uploading", progress: Math.min(p, 90) });
        }, 200);
        return iv;
      };
      const iv = simulateProgress();

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/onboarding/upload-mappe", {
          method: "POST",
          body: formData,
        });

        clearInterval(iv);

        if (!res.ok) {
          throw new Error(await res.text());
        }

        const data = await res.json();
        setState({ status: "ocr" });

        // OCR step — API triggers Claude Haiku extraction
        const ocrRes = await fetch("/api/onboarding/ocr-mappe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: data.url }),
        });

        const ocrData = ocrRes.ok ? await ocrRes.json() : {};

        setState({
          status: "done",
          url: data.url,
          filename: file.name,
          extractedFields: ocrData.fields,
        });
        onUpload(data.url);
      } catch (err) {
        clearInterval(iv);
        setState({
          status: "error",
          message:
            err instanceof Error
              ? err.message
              : "Upload fehlgeschlagen. Bitte erneut versuchen.",
        });
      }
    },
    [onUpload]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const reset = () => setState({ status: "idle" });

  return (
    <div className={cn("space-y-2", className)}>
      <div
        role="region"
        aria-label="Mietmappe hochladen"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer",
          isDragging
            ? "border-indigo-500 bg-indigo-500/10"
            : state.status === "done"
            ? "border-emerald-600/50 bg-emerald-900/10"
            : state.status === "error"
            ? "border-red-600/50 bg-red-900/10"
            : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800"
        )}
        onClick={() => {
          if (state.status === "idle" || state.status === "error") {
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,image/jpeg,image/png,image/webp"
          className="sr-only"
          aria-label="Mietmappe Datei auswählen"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <div className="flex flex-col items-center gap-3 p-6 text-center min-h-[140px] justify-center">
          {state.status === "idle" && (
            <>
              <Upload className="w-8 h-8 text-slate-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-slate-300">
                  PDF oder Foto hochladen
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Drag & Drop oder klicken — max. 20 MB
                </p>
              </div>
              <p className="text-xs text-indigo-400/80">
                Daten werden automatisch via KI extrahiert
              </p>
            </>
          )}

          {state.status === "uploading" && (
            <>
              <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" aria-hidden="true" />
              <p className="text-sm text-slate-300">Hochladen…</p>
              <div className="w-full max-w-xs bg-slate-700 rounded-full h-1.5">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all duration-200"
                  style={{ width: `${state.progress}%` }}
                  role="progressbar"
                  aria-valuenow={state.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </>
          )}

          {state.status === "ocr" && (
            <>
              <Loader2 className="w-8 h-8 text-violet-400 animate-spin" aria-hidden="true" />
              <p className="text-sm text-slate-300">KI liest Daten aus…</p>
              <p className="text-xs text-slate-500">Dauert ca. 5–10 Sekunden</p>
            </>
          )}

          {state.status === "done" && (
            <div className="flex flex-col items-center gap-2 w-full" onClick={(e) => e.stopPropagation()}>
              <CheckCircle2 className="w-8 h-8 text-emerald-400" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <p className="text-sm text-slate-200 truncate max-w-[200px]">
                  {state.filename}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="text-slate-500 hover:text-slate-300 ml-1"
                  aria-label="Datei entfernen"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {state.extractedFields &&
                Object.keys(state.extractedFields).length > 0 && (
                  <div className="mt-1 w-full max-w-sm text-left bg-slate-800 rounded-lg p-3 space-y-1">
                    <p className="text-xs font-semibold text-emerald-400 mb-1">
                      Automatisch erkannt:
                    </p>
                    {Object.entries(state.extractedFields).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs gap-2">
                        <span className="text-slate-500">{k}</span>
                        <span className="text-slate-300 font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          )}

          {state.status === "error" && (
            <>
              <AlertCircle className="w-8 h-8 text-red-400" aria-hidden="true" />
              <p className="text-sm text-red-300">{state.message}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  reset();
                }}
                className="text-xs text-indigo-400 hover:underline"
              >
                Erneut versuchen
              </button>
            </>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Deine Mappe ist Ende-zu-Ende-verschlüsselt und wird nur für Bewerbungen
        in deinem Namen verwendet.
      </p>
    </div>
  );
}
