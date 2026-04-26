/**
 * Minimal Markdown-to-HTML converter for static export compatibility.
 * Handles headings, bold, links, lists, tables, code blocks, paragraphs.
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Code blocks (fenced)
  html = html.replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<pre class="bg-slate-800 rounded-xl p-4 overflow-x-auto my-4"><code class="text-sm text-slate-300 font-mono">${escaped.trim()}</code></pre>`;
  });

  // Tables
  html = html.replace(
    /((?:\|.+\|\n)+)/g,
    (match) => {
      const rows = match.trim().split("\n").filter((r) => r.trim());
      const isHeader = (r: string) => /^\|[-\s|:]+\|$/.test(r);
      let tableHtml = '<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse">';
      let inBody = false;
      rows.forEach((row, i) => {
        if (isHeader(row)) {
          inBody = true;
          tableHtml += "<tbody>";
          return;
        }
        const cells = row
          .split("|")
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
          .map((c) => c.trim());
        if (i === 0) {
          tableHtml += "<thead><tr>";
          cells.forEach((c) => {
            tableHtml += `<th class="px-4 py-2 text-left text-slate-300 font-semibold border-b border-slate-700">${c}</th>`;
          });
          tableHtml += "</tr></thead>";
        } else {
          tableHtml += "<tr>";
          cells.forEach((c) => {
            tableHtml += `<td class="px-4 py-2 text-slate-400 border-b border-slate-800">${c}</td>`;
          });
          tableHtml += "</tr>";
        }
      });
      if (inBody) tableHtml += "</tbody>";
      tableHtml += "</table></div>";
      return tableHtml;
    }
  );

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-white mt-6 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-white mt-8 mb-4 pb-2 border-b border-slate-800">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>');

  // Bold + Italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-200 font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors">$1</a>'
  );

  // Unordered lists
  html = html.replace(
    /((?:^- .+\n?)+)/gm,
    (match) => {
      const items = match.trim().split("\n").map((line) => line.replace(/^- /, "").trim());
      return `<ul class="my-4 space-y-2">${items.map((i) => `<li class="flex gap-2 text-slate-400"><span class="text-indigo-400 mt-1 flex-shrink-0">•</span><span>${i}</span></li>`).join("")}</ul>`;
    }
  );

  // Ordered lists
  html = html.replace(
    /((?:^\d+\. .+\n?)+)/gm,
    (match) => {
      const items = match.trim().split("\n").map((line) => line.replace(/^\d+\. /, "").trim());
      return `<ol class="my-4 space-y-2 counter-reset-item">${items.map((i, idx) => `<li class="flex gap-3 text-slate-400"><span class="text-indigo-400 font-semibold flex-shrink-0 w-5">${idx + 1}.</span><span>${i}</span></li>`).join("")}</ol>`;
    }
  );

  // Blockquotes
  html = html.replace(
    /^> (.+)$/gm,
    '<blockquote class="border-l-4 border-indigo-500/40 pl-4 my-4 italic text-slate-400">$1</blockquote>'
  );

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="border-slate-800 my-6" />');

  // Paragraphs - wrap lines not already wrapped
  const lines = html.split("\n");
  const result: string[] = [];
  let inBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed.startsWith("<h") ||
      trimmed.startsWith("<ul") ||
      trimmed.startsWith("<ol") ||
      trimmed.startsWith("<li") ||
      trimmed.startsWith("<pre") ||
      trimmed.startsWith("<block") ||
      trimmed.startsWith("<hr") ||
      trimmed.startsWith("<div") ||
      trimmed.startsWith("<table") ||
      trimmed.startsWith("</") ||
      trimmed === ""
    ) {
      result.push(line);
    } else {
      result.push(`<p class="text-slate-400 leading-relaxed my-3">${trimmed}</p>`);
    }
  }

  return result.join("\n");
}
