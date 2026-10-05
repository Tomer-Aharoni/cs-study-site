function studyEsc(s) {
  return String(s || "").replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
  );
}

function studyInline(raw) {
  const codes = [];
  let text = studyEsc(raw);
  text = text.replace(/`([^`\n]+)`/g, (_, code) => {
    codes.push(code);
    return "\u0000C" + (codes.length - 1) + "\u0000";
  });
  text = text.replace(/\n/g, "<br>");
  return text.replace(/\u0000C(\d+)\u0000/g, (_, i) => "<code>" + codes[Number(i)] + "</code>");
}

function looksLikeCode(block) {
  const lines = String(block || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length < 2) return false;
  let hits = 0;
  lines.forEach((line) => {
    if (/[א-ת]/.test(line) && !/[{};]/.test(line)) return;
    if (
      /^(#include|class |struct |int |void |def |public:|private:|protected:|using |namespace |if |for |while |return |char |const |std::)/.test(
        line
      ) ||
      /[{};]/.test(line)
    ) {
      hits += 1;
    }
  });
  return hits >= Math.max(2, Math.ceil(lines.length * 0.4));
}

function studyBlock(block) {
  if (looksLikeCode(block)) {
    return `<pre class="code" dir="ltr"><code>${studyEsc(block.replace(/\n$/, ""))}</code></pre>`;
  }
  let html = "";
  let paras = [];
  let list = [];
  function flushList() {
    if (!list.length) return;
    html += "<ul>" + list.map((item) => "<li>" + studyInline(item) + "</li>").join("") + "</ul>";
    list = [];
  }
  function flushParas() {
    if (!paras.length) return;
    html += "<p>" + paras.map(studyInline).join("<br>") + "</p>";
    paras = [];
  }
  String(block || "")
    .split("\n")
    .forEach((line) => {
      const bullet = line.match(/^\s*[•\-*]\s+(.*)$/);
      if (bullet) {
        flushParas();
        list.push(bullet[1]);
        return;
      }
      if (!line.trim()) {
        flushParas();
        flushList();
        return;
      }
      flushList();
      paras.push(line);
    });
  flushParas();
  flushList();
  return html;
}

function studyRich(raw) {
  const text = String(raw || "").replace(/\r\n/g, "\n").trim();
  if (!text) return "";
  if (/^\s*</.test(text) && /<\/?[a-z][\s\S]*>/i.test(text)) return text;
  const chunks = [];
  const re = /```[a-zA-Z0-9_+-]*\n?([\s\S]*?)```/g;
  let last = 0;
  let match;
  while ((match = re.exec(text))) {
    if (match.index > last) chunks.push({ type: "prose", text: text.slice(last, match.index) });
    chunks.push({ type: "code", text: match[1].replace(/\n$/, "") });
    last = match.index + match[0].length;
  }
  if (last < text.length) chunks.push({ type: "prose", text: text.slice(last) });
  return chunks
    .map((chunk) => {
      if (chunk.type === "code") return `<pre class="code" dir="ltr"><code>${studyEsc(chunk.text)}</code></pre>`;
      return chunk.text
        .split(/\n{2,}/)
        .map((block) => (block.trim() ? studyBlock(block.trim()) : ""))
        .join("");
    })
    .join("");
}
