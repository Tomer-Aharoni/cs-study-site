/* Static check of data/20425: parts vs sections, unique ids, and every \( \) / \[ \] segment rendered by KaTeX.
   usage: node scripts/agent-tools/check-20425.js <path-to-katex.min.js> */
const path = require("path");
const root = path.resolve(__dirname, "..", "..");
const katex = require(path.resolve(process.argv[2] || ""));
globalThis.window = globalThis;
window.SUMMARY_CARDS = [];
require(path.join(root, "data/20425/course.js"));
require(path.join(root, "data/20425/unit-parts.js"));

const problems = [];
const ids = new Map();
let segments = 0;

function claim(id, where) {
  if (!id) return;
  if (ids.has(id)) problems.push(`duplicate id ${id}: ${ids.get(id)} / ${where}`);
  else ids.set(id, where);
}

function scanString(s, where) {
  if (/[\x08\x0b\x0c]/.test(s)) problems.push(`${where}: control character (single backslash before b/v/f?)`);
  if (/\t(imes|ext|heta|au|o\b|riangle)/.test(s)) problems.push(`${where}: tab before TeX word (single backslash before t?)`);
  const re = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
  let m;
  while ((m = re.exec(s))) {
    const tex = m[1] !== undefined ? m[1] : m[2];
    segments += 1;
    if (/<[a-zA-Z\/]/.test(tex)) problems.push(`${where}: HTML tag inside math: ${tex.slice(0, 60)}`);
    try {
      katex.renderToString(tex.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"), {
        displayMode: m[2] !== undefined,
        throwOnError: true,
        strict: "ignore",
      });
    } catch (err) {
      problems.push(`${where}: KaTeX: ${String(err.message).slice(0, 140)}`);
    }
  }
  const rest = s.replace(re, "");
  if (/\\\(|\\\)|\\\[|\\\]/.test(rest)) problems.push(`${where}: unbalanced math delimiter`);
}

function walk(value, where) {
  if (typeof value === "string") scanString(value, where);
  else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${where}[${i}]`));
  else if (value && typeof value === "object") Object.keys(value).forEach((k) => walk(value[k], `${where}.${k}`));
}

for (const unit of COURSE.units) {
  const n = unit.id;
  for (const suffix of ["", "-interact", "-summary"]) {
    try {
      require(path.join(root, `data/20425/unit${n}${suffix}.js`));
    } catch (err) {
      problems.push(`unit${n}${suffix}.js: ${err.message}`);
    }
  }
  const data = window["UNIT" + n];
  if (!data) continue;
  const sectionIds = data.sections.map((s) => s.id);
  sectionIds.forEach((id) => claim(id, `unit${n} section`));
  const parted = (UNIT_PARTS[n] || []).flatMap((p) => p.sections);
  parted.filter((id) => !sectionIds.includes(id)).forEach((id) => problems.push(`unit${n}: part lists missing section ${id}`));
  sectionIds.filter((id) => !parted.includes(id)).forEach((id) => problems.push(`unit${n}: section ${id} not in any part`));
  walk(data, `UNIT${n}`);
  (window[`UNIT${n}_QUIZZES`] || []).forEach((q) => claim(q.id, `unit${n} quiz`));
  walk(window[`UNIT${n}_QUIZZES`] || [], `UNIT${n}_QUIZZES`);
}
SUMMARY_CARDS.forEach((c) => claim(c.id, "card"));
walk(SUMMARY_CARDS, "SUMMARY_CARDS");
walk(window.SUMMARY_PROSE || {}, "SUMMARY_PROSE");
walk(window.SUMMARY_DETAIL || {}, "SUMMARY_DETAIL");

console.log(`${segments} math segments, ${ids.size} ids, ${problems.length} problems`);
problems.forEach((p) => console.log(" - " + p));
process.exitCode = problems.length ? 1 : 0;
