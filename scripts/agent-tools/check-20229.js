/* Static check of data/20229: parts vs sections, unique IDs, KaTeX formatting,
   absence of raw backticks in HTML, and absence of raw < or > inside math.
   usage:
     node scripts/agent-tools/check-20229.js [unit_id] [path_to_katex.min.js]
   examples:
     node scripts/agent-tools/check-20229.js
     node scripts/agent-tools/check-20229.js 0
     node scripts/agent-tools/check-20229.js 1
*/
const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "..", "..");

// Try loading KaTeX if provided as argument or installed
let katex = null;
let unitFilter = null;

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (/^(?:unit)?([0-9]|1[0-1])$/i.test(arg)) {
    const m = arg.match(/^(?:unit)?([0-9]|1[0-1])$/i);
    unitFilter = m[1];
  } else if (arg.endsWith(".js") || arg.includes("katex")) {
    try {
      katex = require(path.isAbsolute(arg) ? arg : path.resolve(arg));
    } catch (e) {
      console.warn("Warning: Could not load KaTeX from " + arg + ": " + e.message);
    }
  }
}

if (!katex) {
  const localKatex = path.join(__dirname, "katex.min.js");
  if (fs.existsSync(localKatex)) {
    try {
      katex = require(localKatex);
    } catch (e) {}
  }
}

if (!katex) {
  try {
    katex = require("katex");
  } catch (e) {
    // KaTeX npm package not installed globally/locally; static checks will still run.
  }
}

globalThis.window = globalThis;
window.SUMMARY_CARDS = [];
window.SUMMARY_PROSE = [];
window.SUMMARY_DETAIL = {};

require(path.join(root, "data/20229/course.js"));
require(path.join(root, "data/20229/unit-parts.js"));

const problems = [];
const ids = new Map();
let segments = 0;

function claim(id, where) {
  if (!id) return;
  if (ids.has(id)) {
    problems.push(`duplicate id "${id}": ${ids.get(id)} / ${where}`);
  } else {
    ids.set(id, where);
  }
}

function scanString(s, where) {
  if (/[\x08\x0b\x0c]/.test(s)) {
    problems.push(`${where}: control character (single backslash before b/v/f?)`);
  }
  if (/\t(imes|ext|heta|au|o\b|riangle|au)/.test(s)) {
    problems.push(`${where}: tab before TeX word (single backslash before t?)`);
  }

  // Check for raw Markdown backticks inside html strings
  if (s.includes("`")) {
    problems.push(`${where}: raw Markdown backtick (\`) found inside string. Use <code>...</code> or KaTeX instead.`);
  }

  const re = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
  let m;
  while ((m = re.exec(s))) {
    const tex = m[1] !== undefined ? m[1] : m[2];
    const isDisplay = m[2] !== undefined;
    segments += 1;

    // Check for HTML tag inside math
    if (/<[a-zA-Z\/]/.test(tex)) {
      problems.push(`${where}: HTML tag inside math: ${tex.slice(0, 60)}`);
    }

    // Check for unescaped raw < or > inside math (should be \lt, \gt, \le, \ge, or matrix &)
    if (/(^|[^\\])[<>]/.test(tex)) {
      problems.push(`${where}: raw unescaped < or > inside math: "${tex.slice(0, 60)}". Use \\lt, \\gt, \\le, or \\ge.`);
    }

    if (katex) {
      try {
        katex.renderToString(tex.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"), {
          displayMode: isDisplay,
          throwOnError: true,
          strict: "ignore",
        });
      } catch (err) {
        problems.push(`${where}: KaTeX error: ${String(err.message).slice(0, 140)}`);
      }
    }
  }

  const rest = s.replace(re, "");
  if (/\\\(|\\\)|\\\[|\\\]/.test(rest)) {
    problems.push(`${where}: unbalanced math delimiter in: "${rest.slice(0, 80)}"`);
  }
}

function walk(value, where) {
  if (typeof value === "string") {
    scanString(value, where);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${where}[${i}]`));
  } else if (value && typeof value === "object") {
    Object.keys(value).forEach((k) => walk(value[k], `${where}.${k}`));
  }
}

const targetUnits = unitFilter !== null ? [unitFilter] : COURSE.units.map((u) => u.id);

let unitsChecked = 0;

for (const n of targetUnits) {
  const mainFile = path.join(root, `data/20229/units/unit${n}.js`);
  if (!fs.existsSync(mainFile)) {
    // If running full check and file doesn't exist yet, skip or note
    if (unitFilter !== null) {
      problems.push(`Unit ${n} requested but ${mainFile} does not exist`);
    }
    continue;
  }

  unitsChecked += 1;

  const files = [
    ["units", ""],
    ["units", "-interact"],
    ["summary", "-summary"],
  ];

  for (const [folder, suffix] of files) {
    const fpath = path.join(root, `data/20229/${folder}/unit${n}${suffix}.js`);
    if (fs.existsSync(fpath)) {
      try {
        require(fpath);
      } catch (err) {
        problems.push(`unit${n}${suffix}.js: ${err.message}`);
      }
    } else if (folder === "units" && suffix === "") {
      problems.push(`Missing main file: unit${n}.js`);
    }
  }

  const hwPath = path.join(root, `data/20229/units/unit${n}-hw.js`);
  if (fs.existsSync(hwPath)) {
    try {
      require(hwPath);
    } catch (err) {
      problems.push(`unit${n}-hw.js: ${err.message}`);
    }
  }

  const data = window["UNIT" + n];
  if (!data) continue;

  const sectionIds = (data.sections || []).map((s) => s.id);
  sectionIds.forEach((id) => claim(id, `unit${n} section`));

  const parted = (UNIT_PARTS[n] || []).flatMap((p) => p.sections);
  parted
    .filter((id) => !sectionIds.includes(id) && !(id === `l${n}-hw` && !fs.existsSync(hwPath)))
    .forEach((id) => problems.push(`unit${n}: part lists missing section "${id}"`));
  sectionIds
    .filter((id) => !parted.includes(id))
    .forEach((id) => problems.push(`unit${n}: section "${id}" not defined in UNIT_PARTS`));

  walk(data, `UNIT${n}`);

  const quizzes = window[`UNIT${n}_QUIZZES`] || [];
  quizzes.forEach((q) => claim(q.id, `unit${n} quiz`));
  walk(quizzes, `UNIT${n}_QUIZZES`);
}

// Check study guide notes if exists
const guidePath = path.join(root, "data/20229/summary/study-guide-notes.js");
if (fs.existsSync(guidePath)) {
  try {
    require(guidePath);
    walk(window.STUDY_GUIDE_NOTES || {}, "STUDY_GUIDE_NOTES");
  } catch (err) {
    problems.push(`study-guide-notes.js: ${err.message}`);
  }
}

SUMMARY_CARDS.forEach((c) => claim(c.id, "card"));
walk(SUMMARY_CARDS, "SUMMARY_CARDS");
walk(window.SUMMARY_PROSE || {}, "SUMMARY_PROSE");
walk(window.SUMMARY_DETAIL || {}, "SUMMARY_DETAIL");

console.log(`[check-20229] Checked ${unitsChecked} unit(s). ${segments} math segments, ${ids.size} IDs, ${problems.length} problems found.`);
if (!katex) {
  console.log(`[check-20229] Note: KaTeX renderer not loaded (static regex checks active).`);
}

problems.forEach((p) => console.log("  - " + p));
process.exitCode = problems.length ? 1 : 0;
