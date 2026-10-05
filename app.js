const app = document.getElementById("app");

function lessonById(id) {
  if (id === "1") return window.UNIT1;
  if (id === "2") return window.UNIT2;
  if (id === "3") return window.UNIT3;
  if (id === "4") return window.UNIT4;
  if (id === "5") return window.UNIT5;
  if (id === "6") return window.UNIT6;
  if (id === "7") return window.UNIT7;
  return null;
}

function quizzesFor(id) {
  if (id === "1") return UNIT1_QUIZZES;
  if (id === "2") return UNIT2_QUIZZES;
  if (id === "3") return window.UNIT3_QUIZZES || [];
  if (id === "4") return window.UNIT4_QUIZZES || [];
  if (id === "5") return window.UNIT5_QUIZZES || [];
  if (id === "6") return window.UNIT6_QUIZZES || [];
  if (id === "7") return window.UNIT7_QUIZZES || [];
  return [];
}

function findQuiz(qid) {
  return allQuizzes().find((q) => q.id === qid) || null;
}

function safeDecode(s) {
  try {
    return decodeURIComponent(s);
  } catch (err) {
    return s;
  }
}

function parseRoute() {
  const raw = (location.hash || "#/").replace(/^#/, "");
  const parts = raw.split("/").filter(Boolean);
  if (parts[0] === "me" || parts[0] === "admin" || parts[0] === "print") {
    return {
      parts: parts,
      isHome: false,
      course: null,
      area: parts[0],
      unit: null,
      summaryCardsPage: false,
      summaryFlip: false,
      flipCard: null,
      summaryFocusUnit: null,
      summaryFocusPart: null,
      practiceView: null,
      examId: null,
      examReview: false,
      section: null,
      searchQuery: "",
      me: parts[0] === "me",
      admin: parts[0] === "admin",
      adminUsers: parts[0] === "admin" && parts[1] === "users",
      adminItem: parts[0] === "admin" && parts[1] === "item" ? safeDecode(parts.slice(2).join("/")) : "",
      adminBanners: parts[0] === "admin" && parts[1] === "banners",
      adminBannerId: parts[0] === "admin" && parts[1] === "banners" && parts[2] ? safeDecode(parts[2]) : "",
      print: parts[0] === "print",
    };
  }
  const area = parts[2] || "hub";
  return {
    parts,
    isHome: parts.length === 0,
    course: parts[0] === "course" ? parts[1] : null,
    area,
    unit: parts[3],
    summaryCardsPage: area === "summary" && parts[3] === "cards",
    summaryFlip: area === "summary" && parts[3] === "flip",
    flipCard: area === "summary" && parts[3] === "flip" ? parts[4] || null : null,
    summaryFocusUnit: area === "summary" && parts[3] === "u" ? parts[4] : null,
    summaryFocusPart: area === "summary" && parts[3] === "u" ? parts[5] || null : null,
    practiceView: area === "practice" ? parts[3] || "hub" : null,
    examId: area === "practice" && parts[3] === "exam" ? parts[4] || null : null,
    examReview: area === "practice" && parts[3] === "exam" && parts[5] === "review",
    examFocus: area === "practice" && parts[3] === "exam" && parts[5] === "q" ? parts[6] || null : null,
    section: learnSection(parts),
    part: learnPart(parts),
    quizFocus: area === "learn" && parts[4] === "q" ? parts[5] || null : null,
    searchQuery: area === "search" ? decodeURIComponent((parts.slice(3).join("/") || "").replace(/\+/g, " ")) : "",
    me: false,
    admin: false,
    adminUsers: false,
    adminItem: "",
    print: false,
  };
}

function safeHue(value) {
  return /^#[0-9a-fA-F]{3,8}$/.test(String(value || "")) ? value : "#0f766e";
}

function esc(s) {
  return String(s || "").replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
  );
}

function aiBubble() {
  return `<abbr class="ai-bubble" title="נוצר באמצעות AI, לא נשלף מקבצי המקור">AI</abbr>`;
}

function contentOrigin(q, exam) {
  const map = window.CONTENT_ORIGIN || {};
  let mapped = { q: true, a: true };
  if (q) {
    const keys = [];
    if (exam) {
      keys.push(exam.id + ":" + q.id);
      keys.push(exam.id + "-" + q.id);
    }
    keys.push(q.id);
    for (let i = 0; i < keys.length; i += 1) {
      if (map[keys[i]]) {
        mapped = map[keys[i]];
        break;
      }
    }
  }
  return {
    q: q && q.fromAsset === true ? false : q && q.fromAsset === false ? true : !!mapped.q,
    a: q && q.answerFromAsset === true ? false : q && q.answerFromAsset === false ? true : !!mapped.a,
  };
}

function questionBuiltByAi(q, exam) {
  return !!contentOrigin(q, exam).q;
}

function answerBuiltByAi(q, exam) {
  return !!contentOrigin(q, exam).a;
}

function learnSection(parts) {
  if (parts[2] !== "learn" || !parts[4] || parts[4] === "q") return null;
  const defined = window.UNIT_PARTS && UNIT_PARTS[parts[3]];
  if (defined && defined.some((part) => part.id === parts[4])) return null;
  return parts[4];
}

function learnPart(parts) {
  if (parts[2] !== "learn" || !parts[4] || parts[4] === "q") return null;
  const defined = window.UNIT_PARTS && UNIT_PARTS[parts[3]];
  if (defined && defined.some((part) => part.id === parts[4])) return parts[4];
  return null;
}

function pageUrl(hash) {
  return location.origin + location.pathname + location.search + hash;
}

function shareButton(hash, label) {
  const url = pageUrl(hash);
  return `<button type="button" class="share-link" data-share="${esc(url)}" aria-label="${esc("העתקת קישור אל " + (label || "האזור"))}" title="העתקת קישור"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg></button>`;
}

function boxTools(editId, hash, label) {
  return `<span class="box-tools">${editLink(editId, label)}${shareButton(hash, label)}</span>`;
}

function quizContentId(qid) {
  const unit = (COURSE.units || []).find((item) =>
    (window["UNIT" + item.id + "_QUIZZES"] || []).some((quiz) => quiz.id === qid)
  );
  return unit ? "quiz:" + unit.id + ":" + qid : "";
}

function editLink(id, label) {
  if (!id || !window.CSAuth || !CSAuth.isAdmin()) return "";
  const href = "#/admin/item/" + encodeURIComponent(id);
  return `<a class="edit-link" href="${href}" aria-label="${esc(label ? "עריכת " + label : "עריכת התוכן")}" title="עריכה"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg></a>`;
}

function getProgress() {
  try {
    const raw = JSON.parse(localStorage.getItem("cs-study-progress") || "");
    if (!raw || typeof raw !== "object") throw new Error("empty");
    return {
      seen: Array.isArray(raw.seen) ? raw.seen : [],
      wrong: Array.isArray(raw.wrong) ? raw.wrong : [],
      resume: raw.resume && raw.resume.unit ? raw.resume : null,
    };
  } catch (err) {
    return { seen: [], wrong: [], resume: null };
  }
}

function setProgress(p) {
  try {
    localStorage.setItem("cs-study-progress", JSON.stringify(p));
  } catch (err) {
    /* private mode */
  }
  if (window.CSProgress) CSProgress.scheduleState(p);
}

function sectionTitle(unitId, sectionId) {
  if (sectionId === "unit-goals") return "מה נלמד ביחידה זו";
  if (sectionId === "more-practice") return "עוד תרגול";
  const lesson = lessonById(unitId);
  const found = lesson && (lesson.sections || []).find((s) => s.id === sectionId);
  return found ? found.title : "";
}

function markSeen(unitId) {
  if (!unitId) return;
  const p = getProgress();
  if (p.seen.includes(unitId)) return;
  p.seen.push(unitId);
  setProgress(p);
}

function saveResume(unitId, sectionId) {
  if (!unitId || !sectionId) return;
  const p = getProgress();
  p.resume = { unit: unitId, section: sectionId, title: sectionTitle(unitId, sectionId) };
  if (!p.seen.includes(unitId)) p.seen.push(unitId);
  setProgress(p);
}

function noteAnswer(qid, correct) {
  if (!qid) return;
  const p = getProgress();
  const has = p.wrong.includes(qid);
  if (correct && has) p.wrong = p.wrong.filter((id) => id !== qid);
  if (!correct && !has) p.wrong.push(qid);
  setProgress(p);
  if (window.CSProgress) CSProgress.noteQuiz(qid, correct);
}

function allQuizzes() {
  const out = [];
  COURSE.units.forEach((u) => {
    quizzesFor(u.id).forEach((q) => out.push(Object.assign({ unit: u.id, kind: q.kind || "mcq" }, q)));
  });
  (window.PREP_BANK || []).forEach((q) => {
    if (out.some((item) => item.id === q.id)) return;
    out.push(Object.assign({ unit: String(q.topic || ""), kind: q.kind || "mcq" }, q));
  });
  return out;
}

function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function loadRound() {
  try {
    return JSON.parse(sessionStorage.getItem("cs-practice-round") || "");
  } catch (err) {
    return null;
  }
}

function saveRound(round) {
  sessionStorage.setItem("cs-practice-round", JSON.stringify(round));
}

function startRound(unit, count) {
  const pool = shuffle(allQuizzes().filter((q) => unit === "all" || q.unit === unit));
  if (!pool.length) return;
  const n = Math.max(1, Math.min(Number(count) || 10, pool.length));
  saveRound({
    ids: pool.slice(0, n).map((q) => q.id),
    index: 0,
    picked: {},
    revealed: {},
    mode: "round",
    unit: unit,
  });
  location.hash = `#/course/${COURSE.id}/practice/round`;
}

function startReview() {
  const wrong = getProgress().wrong;
  const ids = shuffle(allQuizzes().filter((q) => wrong.includes(q.id)).map((q) => q.id));
  saveRound({ ids: ids, index: 0, picked: {}, revealed: {}, mode: "review", unit: "wrong" });
  const dest = `#/course/${COURSE.id}/practice/review`;
  if (location.hash === dest) route();
  else location.hash = dest;
}

function normText(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[״"׳']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(html) {
  const node = document.createElement("div");
  node.innerHTML = html || "";
  return node.textContent || "";
}

let searchCache = null;

function searchIndex() {
  if (searchCache) return searchCache;
  const base = `#/course/${COURSE.id}`;
  const items = [];
  COURSE.units.forEach((u) => {
    items.push({
      group: "יחידות",
      title: "יחידה " + u.id + " · " + u.title,
      text: u.blurb || "",
      href: base + "/learn/" + u.id,
    });
    const lesson = lessonById(u.id);
    ((lesson && lesson.sections) || []).forEach((s) => {
      items.push({
        group: "פרקים",
        title: s.title,
        text: "יחידה " + u.id + " · " + u.title,
        href: base + "/learn/" + u.id + "/" + s.id,
      });
    });
  });
  (window.SUMMARY_CARDS || []).forEach((c) => {
    items.push({
      group: "כרטיסיות",
      title: c.title,
      text: c.kind + " · יחידה " + c.unit + ". " + c.body,
      href: base + "/summary/flip/" + encodeURIComponent(c.id),
    });
  });
  (window.SUMMARY_PROSE || []).forEach((ch) => {
    (ch.parts || []).forEach((p) => {
      items.push({
        group: "סיכום",
        title: p.title,
        text: stripHtml(p.html).slice(0, 320),
        href: base + "/summary/u/" + ch.unit + "/" + p.id,
      });
    });
  });
  searchCache = items;
  return items;
}

function searchHits(query) {
  const q = normText(query);
  if (q.length < 2) return [];
  const words = q.split(" ").filter(Boolean);
  return searchIndex()
    .filter((item) => {
      const hay = normText(item.title + " " + item.text);
      return words.every((w) => hay.includes(w));
    })
    .slice(0, 40);
}

function searchResultsHtml(query) {
  const q = String(query || "").trim();
  if (normText(q).length < 2) {
    return `<p class="muted">הקלידו לפחות שתי אותיות. אפשר שם של מושג, יחידה, או מילה מתוך כרטיסייה.</p>`;
  }
  const hits = searchHits(q);
  if (!hits.length) return `<p class="muted">אין תוצאות עבור "${esc(q)}".</p>`;
  const groups = ["יחידות", "פרקים", "כרטיסיות", "סיכום"];
  return groups
    .map((group) => {
      const rows = hits.filter((h) => h.group === group);
      if (!rows.length) return "";
      const list = rows
        .map(
          (h) => `<a class="search-hit" href="${h.href}">
            <strong>${esc(h.title)}</strong>
            <span>${esc(h.text)}</span>
          </a>`
        )
        .join("");
      return `<section class="search-group"><h2>${group}</h2>${list}</section>`;
    })
    .join("");
}

function navLink(href, text, prefix) {
  const current = "#" + (location.hash || "#/").replace(/^#/, "");
  const active =
    current === href || (prefix && current.startsWith(prefix)) ? " active" : "";
  return `<a class="${active.trim()}" href="${href}">${text}</a>`;
}

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function themeIcon(theme) {
  const attrs =
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  if (theme === "dark") {
    return `<svg ${attrs}><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z"/></svg>`;
  }
  return `<svg ${attrs}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
}

function accountControls() {
  if (!window.CSAuth || !CSAuth.enabled()) return "";
  return `<div class="account-slot">${CSAuth.controlsHtml()}</div>`;
}

function flashSave(anchor, text) {
  if (!anchor) return;
  let note = anchor.parentElement && anchor.parentElement.querySelector(":scope > .save-note");
  if (!note) {
    note = document.createElement("p");
    note.className = "save-note";
    anchor.insertAdjacentElement("afterend", note);
  }
  note.textContent = text;
}

function themeButton(floating) {
  const theme = currentTheme();
  const label = theme === "dark" ? "מעבר למצב בהיר" : "מעבר למצב כהה";
  return `<button type="button" class="theme-toggle${floating ? " is-float" : ""}" data-theme-toggle aria-label="${label}" title="${label}">${themeIcon(theme)}</button>`;
}

function applyTheme(next) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("cs-theme", next);
  } catch (err) {
    /* private mode */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "dark" ? "#0b1220" : "#f4f7fb");
  const label = next === "dark" ? "מעבר למצב בהיר" : "מעבר למצב כהה";
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.innerHTML = themeIcon(next);
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  });
}

function siteFooter() {
  return `<footer class="site-footer">
    <nav class="footer-links" aria-label="יצירת קשר">
      <a class="footer-link" href="https://www.linkedin.com/in/tomer-ah7" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.1c.5-1 1.8-2.1 3.8-2.1 4 0 4.8 2.6 4.8 6V24h-4v-7.7c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V24h-4V8.5z"/></svg>
        LinkedIn
      </a>
      <a class="footer-link" href="https://github.com/tomer-aharoni" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 1.8 2.8 1.3.1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C16.9 4.8 18 5.1 18 5.1a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>
        GitHub
      </a>
      <a class="footer-link" href="mailto:tomeraharoni7@gmail.com">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M3 6h18v12H3z"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="m3 7 9 7 9-7"/></svg>
        דוא״ל
      </a>
    </nav>
    <div class="footer-disclaimer">
      <p>למידה מהנה ובהצלחה!</p>
      <p>האתר נבנה בעזרת בינה מלאכותית ולכן ייתכנו טעויות. אשמח לעדכון אם מצאתם, על מנת שאוכל לתקן.</p>
      <p>© כל הזכויות על המבחנים וחומרי הלמידה שמורות לאוניברסיטה הפתוחה. האתר מיועד לתלמידי האוניברסיטה הפתוחה בלבד, ואין לעשות שימוש חיצוני בתכנים.</p>
      <p class="footer-credit">רעיון והשראה: <a href="https://www.linkedin.com/in/yair-kurtzman-382417247/" target="_blank" rel="noopener noreferrer">יאיר קורצמן</a>, שבנה <a href="https://all-the-courses.pages.dev/" target="_blank" rel="noopener noreferrer">אחלה אתר</a> לקורסים מערכות הפעלה ושפות תכנות ופתח לי את התיאבון ליצור את האתר הזה גם. אם אהבתם, לכו לפרגן בלינקדאין שלו :)</p>
    </div>
  </footer>`;
}

function toolDock() {
  return `<div class="tool-dock">
    <div class="tool-panel" data-tool-panel hidden>
      <p class="tool-kicker">כלים</p>
      <button type="button" class="tool-item" data-print-current>הדפסת העמוד הנוכחי</button>
      <a class="tool-item" href="#/print">בחירת טווחים להדפסה</a>
        <button type="button" class="tool-item" onclick="openAiSettingsModal()">⚙️ הגדרות עוזר AI</button>
    </div>
    <button type="button" class="tool-fab" data-tool-toggle aria-expanded="false" aria-controls="tool-panel" title="כלים נוספים" aria-label="כלים נוספים">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
    </button>
  </div>`;
}

function shell(body, opts) {
  const stage = !!(opts && opts.stage);
  const r = parseRoute();
  const inCourse = r.course === COURSE.id;
  const base = `#/course/${COURSE.id}`;
  const banners = window.CSBanners ? CSBanners.html(r) : "";
  if (stage) {
    return `
      ${banners}
      <div class="stage-tools">
        ${themeButton(false)}
        ${accountControls()}
      </div>
      <a class="wordmark is-float" href="#/">${esc(COURSE.code)}</a>
      <main class="page page-stage">${body}</main>
      ${toolDock()}
      ${siteFooter()}
    `;
  }
  const pageClass = [
    "page",
    r.area === "summary" ? "page-summary" : "",
    r.area === "learn" && r.unit ? "page-read" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return `
    ${banners}
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="#/">${esc(COURSE.code)} · ${esc(COURSE.name)}</a>
        <div class="topbar-tools">
          ${
            inCourse
              ? `<nav class="nav">
                  ${navLink(base, "קורס")}
                  ${navLink(base + "/learn", "יחידות", base + "/learn")}
                  ${navLink(base + "/summary", "סיכום", base + "/summary")}
                  ${navLink(base + "/practice", "תרגול", base + "/practice")}
                  ${navLink(base + "/search", "חיפוש", base + "/search")}
                  ${navLink(base + "/guide-notes", "הערות למדריך", base + "/guide-notes")}
                  ${navLink("#/print", "הדפסה", "#/print")}
                </nav>`
              : ""
          }
          ${accountControls()}
          ${themeButton(false)}
        </div>
      </div>
    </header>
    <main class="${pageClass}">${body}</main>
    ${toolDock()}
    ${siteFooter()}
  `;
}

function renderStage() {
  const base = `#/course/${COURSE.id}`;
  const progress = getProgress();
  const resume = progress.resume;
  const seen = new Set(progress.seen || []);
  const resumeHref = resume
    ? `${base}/learn/${resume.unit}${resume.section ? "/" + resume.section : ""}`
    : "";
  const stops = COURSE.units
    .map((u, i) => {
      const here = resume && resume.unit === u.id;
      const href = here ? resumeHref : `${base}/learn/${u.id}`;
      const cls = ["path-stop", here ? "is-resume" : "", seen.has(u.id) ? "is-seen" : ""].filter(Boolean).join(" ");
      const go = here ? `<span class="path-go">${resume.section ? "המשך קריאה" : "למעבר ליחידה"}</span>` : "";
      return `<a class="${cls}" data-path-stop href="${href}" style="--hue:${safeHue(u.hue)};--i:${i}">
        <span class="path-num" aria-hidden="true">${u.id}</span>
        <span class="path-copy"><strong>${esc(u.title)}</strong><span>${esc(u.blurb || "")}</span></span>
        ${go}
      </a>`;
    })
    .join("");
  const banner = resume
    ? `<a class="resume-strip" href="${resumeHref}">המשך קריאה · יחידה ${esc(resume.unit)}${resume.title ? " · " + esc(resume.title) : ""}</a>`
    : "";
  return shell(
    `
    <section class="stage">
      <div class="hero rise">
        <p class="eyebrow">${COURSE.code} · ${COURSE.languages.join(" · ")}</p>
        <button type="button" class="hero-pill" data-why-toggle aria-expanded="false">על האתר</button>
        <h1>${esc(COURSE.name)} ${editLink("course", COURSE.name)}</h1>
        <p class="hero-lead">${esc(COURSE.blurb)} שבע יחידות לפי הסדר. כל אחת נפתחת להסבר, להמחשה ולמעבדה.</p>
      </div>
      <div class="why" data-why>
        <div class="why-inner">
          <div class="why-card">
            <h2>למה ללמוד כאן</h2>
            <p>הקורס מחבר תכנות מערכות לתכנות דפנסיבי, והבחינה נשענת על הבחנות מדויקות: באג מול חולשה, אפחות מול תיקון שורש, ומה כל שפה דורשת מהזיכרון ומהקלט. במדריך זה רצף ארוך. כאן כל יחידה נפתחת להסבר, להמחשה ולמעבדה ליד הנושא, ואחר כך אפשר לעבור לסיכום או לתרגול בלי לאבד את המפה.</p>
          </div>
        </div>
      </div>
      ${banner}
      <div class="stage-portals rise rise-2">
        <a class="portal portal-practice" href="${base}/practice">
          <span class="portal-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/></svg></span>
          <span class="portal-kicker">לפני הבחינה</span>
          <strong>תרגול<br>מבחנים</strong>
        </a>
        <a class="portal portal-summary" href="${base}/summary">
          <span class="portal-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>
          <span class="portal-kicker">לחזרה</span>
          <strong>מעבר<br>לסיכום</strong>
        </a>

        <a class="portal portal-guide-notes" href="${base}/guide-notes" style="--portal: #0284c7;">
          <span class="portal-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></span>
          <span class="portal-kicker">למדריך הלמידה</span>
          <strong>הערות<br>למדריך</strong>
        </a>

      </div>
      <nav class="course-path" data-path aria-label="יחידות הקורס">
        ${stops}
      </nav>
      <form class="stage-search" data-search-form>
        <label class="sr" for="stage-q">חיפוש בחומר</label>
        <input id="stage-q" name="q" type="search" placeholder="חיפוש מושג, יחידה או כרטיסייה" autocomplete="off" />
        <button class="primary" type="submit">חיפוש</button>
      </form>
      <p class="stage-print"><a class="print-entry" href="#/print">בחירת טווחים להדפסה</a></p>
    </section>
  `,
    { stage: true }
  );
}

function renderHome() {
  return renderStage();
}

function renderHub() {
  return renderStage();
}

function renderLearnList() {
  const base = `#/course/${COURSE.id}`;
  const ready = COURSE.units.filter((u) => u.status === "ready").length;
  const items = COURSE.units
    .map((u, i) => {
      const open = u.status === "ready";
      const inner = `<span class="path-index" style="--hue:${safeHue(u.hue)}">${u.id}</span>
        <span class="path-copy"><strong>${esc(u.title)}</strong><span>${esc(u.blurb || "")}</span></span>
        <span class="pill${open ? "" : " soon"}">${open ? "פתוח" : "בקרוב"}</span>`;
      if (!open) return `<div class="card path-row" style="animation-delay:${i * 45}ms">${inner}</div>`;
      return `<a class="card path-row" href="${base}/learn/${u.id}" style="animation-delay:${i * 45}ms">${inner}</a>`;
    })
    .join("");
  return shell(`
    <p class="back-row"><a class="back" href="${base}">לקורס</a></p>
    <h1>היחידות</h1>
    <p class="muted">שבע יחידות לפי הסדר. ${ready} יחידות פתוחות: הסבר, המחשה ומעבדה.</p>
    <div class="path">${items}</div>
  `);
}

function quizBlock(q) {
  const opts = q.options
    .map(
      (o) =>
        `<button type="button" class="option" data-quiz="${esc(q.id)}" data-choice="${esc(o.id)}">${studyInline(o.text)}</button>`
    )
    .join("");
  const unitId = (COURSE.units || []).find((item) =>
    (window["UNIT" + item.id + "_QUIZZES"] || []).some((quiz) => quiz.id === q.id)
  );
  const hash = unitId ? "#/course/" + COURSE.id + "/learn/" + unitId.id + "/q/" + q.id : "";
  return `<div class="quiz panel" id="q-${esc(q.id)}" data-qid="${esc(q.id)}">
    <div class="box-head"><p>${questionBuiltByAi(q) ? aiBubble() : ""}<strong>תרגול.</strong></p>${boxTools(quizContentId(q.id), hash, "השאלה")}</div>
    <div class="study-text quiz-lead">${studyRich(q.prompt)}</div>
    ${opts}
    <div class="feedback study-text" hidden></div>
  </div>`;
}

function treeHtml(node) {
  if (!node.children) {
    const wrong = (node.wrong || [])
      .map((w) => `<button type="button" class="option" data-leaf="${node.id}" data-ok="0">${w}</button>`)
      .join("");
    return `<div class="panel" data-leaf-block="${node.id}">
      <p><strong>עלה:</strong> ${node.label}</p>
      <p class="muted">איזו אפחות מתאימה?</p>
      <button type="button" class="option" data-leaf="${node.id}" data-ok="1">${node.mitigation}</button>
      ${wrong}
      <p class="feedback" hidden></p>
    </div>`;
  }
  const kids = node.children.map(treeHtml).join("");
  return `<div class="tree-node">
    <button type="button" class="tree-toggle" data-expand="${node.id}" data-label="${node.label}">▸ ${node.label}</button>
    <div class="tree-children" data-branch="${node.id}" hidden>${kids}</div>
  </div>`;
}


function unitParts(unitId, sections) {
  const defined = (window.UNIT_PARTS && UNIT_PARTS[unitId]) || [];
  const known = new Set();
  defined.forEach((part) => part.sections.forEach((id) => known.add(id)));
  const extra = (sections || []).map((section) => section.id).filter((id) => !known.has(id));
  const parts = defined.map((part) => ({
    id: part.id,
    title: part.title,
    sections: part.sections.filter((id) => (sections || []).some((section) => section.id === id)),
  }));
  if (extra.length) parts.push({ id: "x", title: "עוד", sections: extra });
  return parts.filter((part) => part.sections.length);
}

function partById(unitId, partId, sections) {
  return unitParts(unitId, sections).find((part) => part.id === partId) || null;
}

function partForSection(unitId, sectionId, sections) {
  return unitParts(unitId, sections).find((part) => part.sections.indexOf(sectionId) !== -1) || null;
}

const PART_LETTERS = ["א", "ב", "ג", "ד", "ה", "ו", "ז"];

function renderUnit(id) {
  const u = lessonById(id);
  if (!u) {
    const meta = COURSE.units.find((x) => x.id === id);
    return shell(`
      <p><a href="#/course/${COURSE.id}/learn">← כל היחידות</a></p>
      <h1>יחידה ${id}${meta ? " · " + meta.title : ""}</h1>
      <p class="muted">הפרק ייכתב בהמשך באותו תבנית: הסבר, מעבדה, תרגול.</p>
    `);
  }
  const route = parseRoute();
  const parts = unitParts(id, u.sections);
  const active =
    (route.quizFocus && partForSection(id, Object.keys(window.SECTION_ATTACH || {}).find((sid) => ((SECTION_ATTACH[sid] || {}).quizzes || []).indexOf(route.quizFocus) !== -1) || "", u.sections)) ||
    (route.section && partForSection(id, route.section, u.sections)) ||
    partById(id, route.part, u.sections) ||
    parts[0] ||
    null;
  const visible = active ? u.sections.filter((section) => active.sections.indexOf(section.id) !== -1) : u.sections;
  const usedLabs = new Set();
  const usedQuizzes = new Set();
  const attach = window.SECTION_ATTACH || {};
  const sections = visible
    .map((s) => {
      const extra = attachAfterSection(attach[s.id], usedLabs, usedQuizzes);
      const hash = "#/course/" + COURSE.id + "/learn/" + id + "/" + s.id;
      return `<section class="section" id="${esc(s.id)}"><div class="box-head"><h2>${esc(s.title)}</h2>${boxTools("section:" + id + ":" + s.id, hash, s.title)}</div>${s.html}</section>${extra}`;
    })
    .join("");
  const leftoverLabs = ((window.UNIT_LAB_KEYS || {})[id] || [])
    .filter((key) => {
      if (usedLabs.has(key)) return false;
      const home = Object.keys(attach).find((sid) => ((attach[sid] || {}).labs || []).indexOf(key) !== -1);
      if (home) return active && active.sections.indexOf(home) !== -1;
      return active && parts.length && active.id === parts[parts.length - 1].id;
    })
    .map(labByName)
    .join("");
  const leftoverQs = quizzesFor(id)
    .filter((q) => {
      const home = Object.keys(attach).find((sid) => ((attach[sid] || {}).quizzes || []).indexOf(q.id) !== -1);
      const inPart = !home || (active && active.sections.indexOf(home) !== -1);
      const unplaced = !home && active && parts.length && active.id === parts[parts.length - 1].id;
      return !usedQuizzes.has(q.id) && ((inPart && !!home) || unplaced);
    })
    .map(quizBlock)
    .join("");
  const more = leftoverQs
    ? `<section class="section" id="more-practice"><h2>עוד תרגול</h2>${leftoverQs}</section>`
    : "";
  const meta = COURSE.units.find((x) => x.id === id);
  const base = `#/course/${COURSE.id}`;
  const partIndex = active ? parts.findIndex((part) => part.id === active.id) : -1;
  const prevPart = partIndex > 0 ? parts[partIndex - 1] : null;
  const nextPart = partIndex >= 0 && partIndex < parts.length - 1 ? parts[partIndex + 1] : null;
  const rail = [
    partIndex <= 0 ? `<a href="${base}/learn/${u.id}/${active ? active.id : ""}" data-rail="unit-goals" class="is-current">מה נלמד ביחידה זו</a>` : "",
    ...visible.map((s) => `<a href="${base}/learn/${u.id}/${s.id}" data-rail="${esc(s.id)}">${esc(s.title)}</a>`),
    more ? `<a href="${base}/learn/${u.id}/${active ? active.id : ""}" data-rail="more-practice">עוד תרגול</a>` : "",
  ].join("");
  const idx = COURSE.units.findIndex((x) => x.id === id);
  const prev = !prevPart ? COURSE.units[idx - 1] : null;
  const next = !nextPart ? COURSE.units[idx + 1] : null;
  const pager = `<nav class="pager" aria-label="מעבר בין תתי־יחידות">
      ${
        prevPart
          ? `<a class="pager-prev" href="${base}/learn/${u.id}/${prevPart.id}"><span>תת־יחידה קודמת</span><strong>${esc(prevPart.title)}</strong></a>`
          : prev && prev.status === "ready"
            ? `<a class="pager-prev" href="${base}/learn/${prev.id}"><span>יחידה קודמת</span><strong>${esc(prev.title)}</strong></a>`
            : "<span></span>"
      }
      ${
        nextPart
          ? `<a class="pager-next" href="${base}/learn/${u.id}/${nextPart.id}"><span>תת־יחידה הבאה</span><strong>${esc(nextPart.title)}</strong></a>`
          : next && next.status === "ready"
            ? `<a class="pager-next" href="${base}/learn/${next.id}"><span>יחידה הבאה</span><strong>${esc(next.title)}</strong></a>`
            : "<span></span>"
      }
    </nav>`;
  const partNav = parts.length
    ? `<nav class="part-switch" aria-label="תתי־יחידות">${parts
        .map((part, i) => {
          const on = active && part.id === active.id ? " is-on" : "";
          return `<a class="part-tab${on}" href="${base}/learn/${u.id}/${part.id}"><span>${PART_LETTERS[i] || part.id}</span> ${esc(part.title)}</a>`;
        })
        .join("")}</nav>`
    : "";
  const partHead = active
    ? `<div class="box-head part-head"><h2>תת־יחידה ${PART_LETTERS[partIndex] || ""} · ${esc(active.title)}</h2>${shareButton(base + "/learn/" + u.id + "/" + active.id, active.title)}</div>`
    : "";
  const goals = !active || partIndex <= 0
    ? `<section class="section" id="unit-goals">
          <div class="box-head"><h2>מה נלמד ביחידה זו</h2>${boxTools("unit:" + u.id, base + "/learn/" + u.id + (active ? "/" + active.id : ""), "מטרות היחידה")}</div>
          <ul class="goals">${u.goals.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>
        </section>`
    : "";
  return shell(`
    <p class="back-row"><a class="back" href="${base}/learn">כל היחידות</a></p>
    <header class="unit-head">
      <p class="eyebrow">יחידה ${u.id}</p>
      <div class="box-head"><h1>${esc(u.title)}</h1>${boxTools("unit:" + u.id, base + "/learn/" + u.id + (active ? "/" + active.id : ""), u.title)}</div>
      ${meta && meta.blurb ? `<p class="muted lead">${esc(meta.blurb)}</p>` : ""}
      ${partNav}
      ${partHead}
    </header>
    <div class="read">
      <aside class="rail" aria-label="פרקי היחידה">
        <p class="rail-kicker">בתת־היחידה</p>
        <nav>${rail}</nav>
        <a class="rail-summary" href="${base}/summary/u/${u.id}">לסיכום היחידה</a>
      </aside>
      <div class="read-main">
        ${goals}
        ${sections}
        ${leftoverLabs}
        ${more}
        ${pager}
      </div>
    </div>
  `);
}



let railObserver = null;

function mountPath() {
  const root = app.querySelector("[data-path]");
  if (!root) return;
  const rows = [...root.querySelectorAll("[data-path-stop]")];
  root.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    const current = rows.indexOf(document.activeElement);
    if (current < 0) return;
    const forward = e.key === "ArrowDown" || e.key === "ArrowLeft";
    const next = rows[(current + (forward ? 1 : -1) + rows.length) % rows.length];
    next.focus();
    e.preventDefault();
  });
}

function mountRail() {
  const links = [...app.querySelectorAll("[data-rail]")];
  if (!links.length || !("IntersectionObserver" in window)) return;
  const visible = new Set();
  railObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) visible.add(en.target.id);
        else visible.delete(en.target.id);
      });
      const current = links.map((a) => a.getAttribute("data-rail")).find((id) => visible.has(id));
      if (!current) return;
      links.forEach((a) => a.classList.toggle("is-current", a.getAttribute("data-rail") === current));
      const unitId = parseRoute().unit;
      if (unitId) saveResume(unitId, current);
    },
    { rootMargin: "-18% 0px -58% 0px", threshold: 0 }
  );
  links.forEach((a) => {
    const el = document.getElementById(a.getAttribute("data-rail"));
    if (el) railObserver.observe(el);
  });
}

function enhance() {
  if (railObserver) {
    railObserver.disconnect();
    railObserver = null;
  }
  mountPath();
  mountRail();
  const r = parseRoute();
  if (r.area === "learn" && (r.section || r.quizFocus)) {
    const el = document.getElementById(r.quizFocus ? "q-" + r.quizFocus : r.section);
    if (el) el.scrollIntoView({ block: "start" });
  }
  if (r.examFocus) {
    const el = document.getElementById("q-" + r.examFocus);
    if (el) el.scrollIntoView({ block: "start" });
  }
  const searchInput = app.querySelector("[data-search-input]");
  if (searchInput) searchInput.focus();
}


function renderSearch() {
  const q = parseRoute().searchQuery || "";
  return shell(`
    <p class="back-row"><a class="back" href="#/course/${COURSE.id}">לקורס</a></p>
    <h1>חיפוש</h1>
    <form class="stage-search search-page" data-search-form>
      <label class="sr" for="search-q">חיפוש</label>
      <input id="search-q" data-search-input name="q" type="search" value="${esc(q)}" placeholder="למשל אפחות, שאילתה פרמטרית, ASLR" autocomplete="off" />
      <button class="primary" type="submit">חיפוש</button>
    </form>
    <div data-search-results>${searchResultsHtml(q)}</div>
  `);
}


async function route() {
  if (!window.__csBooted) return;
  const token = (window.__routeToken = (window.__routeToken || 0) + 1);
  if (window.__examClock) {
    clearInterval(window.__examClock);
    window.__examClock = null;
  }
  document.body.classList.remove("toc-open");
  const r = parseRoute();
  if (r.print) {
    app.innerHTML = shell(renderPrintPage());
    return;
  }
  if (r.me) {
    app.innerHTML = shell(window.CSProgress ? CSProgress.meHtml() : `<p class="muted">אין מעקב.</p>`);
    return;
  }
  if (r.admin) {
    app.innerHTML = shell(`<div class="admin-panel" data-admin-root><p class="muted">טוען ניהול…</p></div>`);
    if (window.CSAdmin) await CSAdmin.mount(r, token);
    return;
  }
  if (r.isHome || r.course !== COURSE.id) {
    app.innerHTML = renderHome();
  } else if (r.area === "hub") {
    app.innerHTML = renderHub();
  } else if (r.area === "learn" && !r.unit) {
    app.innerHTML = renderLearnList();
  } else if (r.area === "learn") {
    markSeen(r.unit);
    if (r.section) saveResume(r.unit, r.section);
    else if (!getProgress().resume || getProgress().resume.unit !== r.unit) saveResume(r.unit, "unit-goals");
    app.innerHTML = renderUnit(r.unit);
    vizState.plates = 3;
    vizState.wrap = 30;
    if (r.unit === "2") resetMemLab();
    if (r.unit === "3") resetUnit3Labs();
    if (r.unit === "4") resetUnit4Labs();
    if (r.unit === "5") resetUnit5Labs();
  } else if (r.area === "summary" && r.summaryFlip) {
    syncFlip(r);
    app.innerHTML = renderFlip();
  } else if (r.area === "summary") {
    app.innerHTML = renderSummary();
    scrollSummaryFocus();
  } else if (r.area === "search") {
    app.innerHTML = renderSearch();
  } else if (r.area === "guide-notes") {
    app.innerHTML = renderGuideNotes();
  } else if (r.area === "practice") {
    app.innerHTML = renderPractice();
    mountExamClock();
  } else {
    app.innerHTML = renderHub();
  }
  enhance();
}


app.addEventListener("click", async (e) => {
  const share = e.target.closest("[data-share]");
  if (share) {
    e.preventDefault();
    const url = share.getAttribute("data-share") || "";
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(url);
      else {
        const field = document.createElement("textarea");
        field.value = url;
        document.body.appendChild(field);
        field.select();
        document.execCommand("copy");
        field.remove();
      }
      share.classList.add("is-copied");
      share.setAttribute("title", "הקישור הועתק");
      setTimeout(() => {
        share.classList.remove("is-copied");
        share.setAttribute("title", "העתקת קישור");
      }, 1600);
    } catch (err) {
      share.setAttribute("title", "לא הצלחנו להעתיק");
    }
    return;
  }
  const toolToggle = e.target.closest("[data-tool-toggle]");
  if (toolToggle) {
    const dock = toolToggle.closest(".tool-dock");
    const panel = dock && dock.querySelector("[data-tool-panel]");
    if (!panel) return;
    const open = panel.hidden;
    panel.hidden = !open;
    toolToggle.setAttribute("aria-expanded", open ? "true" : "false");
    return;
  }
  if (e.target.closest("[data-print-current]")) {
    document.body.classList.add("is-print-current");
    window.print();
    return;
  }
  if (e.target.closest("[data-print-all]")) {
    printAllIds().forEach((id) => printState.selected.add(id));
    savePrintState();
    route();
    return;
  }
  if (e.target.closest("[data-print-clear]")) {
    printState.selected.clear();
    savePrintState();
    route();
    return;
  }
  if (e.target.closest("[data-print-go]")) {
    runRangePrint();
    return;
  }
  if (!e.target.closest(".tool-dock")) {
    document.querySelectorAll("[data-tool-panel]").forEach((panel) => {
      panel.hidden = true;
    });
    document.querySelectorAll("[data-tool-toggle]").forEach((btn) => btn.setAttribute("aria-expanded", "false"));
  }
  const authIn = e.target.closest("[data-auth-in]");
  if (authIn) {
    authIn.disabled = true;
    try {
      await CSAuth.signIn();
    } catch (err) {
      authIn.disabled = false;
      flashSave(authIn, "ההתחברות לא הושלמה. נסו שוב.");
    }
    return;
  }
  const authOut = e.target.closest("[data-auth-out]");
  if (authOut) {
    authOut.disabled = true;
    try {
      await CSAuth.signOut();
    } catch (err) {
      authOut.disabled = false;
      flashSave(authOut, "היציאה לא הושלמה. נסו שוב.");
    }
    return;
  }
  const bookmark = e.target.closest("[data-bookmark]");
  if (bookmark) {
    if (!window.CSAuth || !CSAuth.enabled()) {
      flashSave(bookmark, "חיבור החשבונות עדיין לא הוגדר.");
      return;
    }
    if (!CSAuth.user()) {
      flashSave(bookmark, "כדי לשמור סימנייה צריך להתחבר עם Google.");
      return;
    }
    const result = await CSProgress.toggleBookmark(bookmark.getAttribute("data-bookmark"));
    if (!result.ok) {
      flashSave(bookmark, "הסימנייה לא נשמרה. נסו שוב.");
      return;
    }
    bookmark.classList.toggle("is-on", result.on);
    bookmark.textContent = result.on ? "סומן לחזרה" : "סימנייה לחזרה";
    const note = bookmark.parentElement && bookmark.parentElement.querySelector(":scope > .save-note");
    if (note) note.textContent = "";
    return;
  }
  const labDone = e.target.closest("[data-lab-done]");
  if (labDone) {
    const id = labDone.getAttribute("data-lab-done");
    const section = labDone.closest("[data-lab]");
    const heading = section && section.querySelector("h2");
    if (heading) CSProgress.rememberLab(id, heading.textContent.trim());
    if (!window.CSAuth || !CSAuth.enabled()) {
      flashSave(labDone, "חיבור החשבונות עדיין לא הוגדר.");
      return;
    }
    if (!CSAuth.user()) {
      flashSave(labDone, "כדי לשמור השלמה צריך להתחבר עם Google.");
      return;
    }
    const result = CSProgress.noteLab(id);
    if (!result.ok) {
      flashSave(labDone, "ההשלמה לא נשמרה. נסו שוב.");
      return;
    }
    labDone.classList.add("is-on");
    labDone.textContent = "הושלם";
    return;
  }

  const themeBtn = e.target.closest("[data-theme-toggle]");
  if (themeBtn) {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
    return;
  }

  const whyBtn = e.target.closest("[data-why-toggle]");
  if (whyBtn) {
    const panel = app.querySelector("[data-why]");
    if (!panel) return;
    const open = panel.classList.toggle("open");
    whyBtn.setAttribute("aria-expanded", open ? "true" : "false");
    return;
  }

  const rail = e.target.closest("[data-rail]");
  if (rail) {
    const el = document.getElementById(rail.getAttribute("data-rail"));
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    app.querySelectorAll("[data-rail]").forEach((a) => a.classList.remove("is-current"));
    rail.classList.add("is-current");
    const unitId = parseRoute().unit;
    if (unitId) saveResume(unitId, rail.getAttribute("data-rail"));
    return;
  }

  if (e.target.closest("[data-start-review]")) {
    startReview();
    return;
  }

  const examStart = e.target.closest("[data-exam-start]");
  if (examStart) {
    startExam(examStart.getAttribute("data-exam-start"));
    return;
  }

  if (e.target.closest("[data-exam-finish]")) {
    finishExam();
    return;
  }

  const examA = e.target.closest("[data-exam-a]");
  if (examA) {
    const run = loadExamRun();
    if (!run || run.finished) return;
    run.answers = run.answers || {};
    run.answers[examA.getAttribute("data-exam-a")] = examA.getAttribute("data-choice");
    saveExamRun(run);
    app.innerHTML = renderPractice();
    mountExamClock();
    return;
  }

  const examPick = e.target.closest("[data-exam-pick]");
  if (examPick) {
    const run = loadExamRun();
    const exam = run && examById(run.id);
    if (!run || !exam || run.finished) return;
    const qid = examPick.getAttribute("data-exam-pick");
    run.picks = run.picks || {};
    if (run.picks[qid]) delete run.picks[qid];
    else {
      const n = Object.keys(run.picks).filter((k) => run.picks[k]).length;
      if (n >= exam.pick) return;
      run.picks[qid] = true;
    }
    saveExamRun(run);
    app.innerHTML = renderPractice();
    mountExamClock();
    return;
  }

  const drillChoice = e.target.closest("[data-drill-choice]");
  if (drillChoice) {
    const round = loadRound();
    if (!round || round.index >= round.ids.length) return;
    const q = findQuiz(round.ids[round.index]);
    if (!q || round.picked[q.id]) return;
    const choice = drillChoice.getAttribute("data-drill-choice");
    round.picked[q.id] = choice;
    saveRound(round);
    noteAnswer(q.id, choice === q.answer);
    app.innerHTML = renderRound(round.mode);
    return;
  }

  if (e.target.closest("[data-drill-next]")) {
    const round = loadRound();
    if (!round) return;
    round.index += 1;
    saveRound(round);
    app.innerHTML = renderRound(round.mode);
    return;
  }

  if (e.target.closest("[data-drill-reveal]")) {
    const round = loadRound();
    if (!round || round.index >= round.ids.length) return;
    const q = findQuiz(round.ids[round.index]);
    if (!q || q.kind !== "open") return;
    round.revealed = round.revealed || {};
    round.revealed[q.id] = true;
    saveRound(round);
    app.innerHTML = renderRound(round.mode);
    return;
  }

  if (e.target.closest("[data-flip]")) {
    flipState.back = !flipState.back;
    showFlip();
    return;
  }

  const flipNav = e.target.closest("[data-flip-nav]");
  if (flipNav) {
    moveFlip(Number(flipNav.getAttribute("data-flip-nav")) || 1);
    return;
  }

  const flipUnit = e.target.closest("[data-flip-unit]");
  if (flipUnit) {
    flipState.unit = flipUnit.getAttribute("data-flip-unit");
    flipState.index = 0;
    flipState.back = false;
    flipState.lockId = "moved";
    showFlip();
    return;
  }

  const flipKind = e.target.closest("[data-flip-kind]");
  if (flipKind) {
    flipState.kind = flipKind.getAttribute("data-flip-kind");
    flipState.index = 0;
    flipState.back = false;
    flipState.lockId = "moved";
    showFlip();
    return;
  }

  const vizBtn = e.target.closest("[data-viz]");
  if (vizBtn && handleVizClick(vizBtn)) return;

  const memBtn = e.target.closest("[data-mem]");
  if (memBtn) {
    const op = memBtn.getAttribute("data-mem");
    const fb = app.querySelector("[data-mem-fb]");
    if (op === "local") {
      if (memState.locals.length >= 3) {
        fb.textContent = "יש כבר כמה מקומיים. לחצו יציאה מהפונקציה, או איפוס.";
      } else {
        memState.locals.push(memState.next++);
        fb.textContent = "int מקומי על המחסנית. ביציאה מהפונקציה הוא נעלם לבד — בלי delete.";
      }
    } else if (op === "new") {
      const heap = "H" + memState.next++;
      memState.heaps.push(heap);
      memState.pointers.push({ id: memState.next++, heap });
      fb.textContent = "המצביע p במחסנית; הערך עצמו בערימה. יציאה מהפונקציה לא מוחקת את הבלוק.";
    } else if (op === "delete") {
      const p = memState.pointers[memState.pointers.length - 1];
      if (!p || !memState.heaps.includes(p.heap)) {
        fb.textContent = "אין בלוק חי למחוק, או שכבר שוחרר — זה כיוון של באג (double-free / מצביע מת).";
      } else {
        memState.heaps = memState.heaps.filter((h) => h !== p.heap);
        fb.textContent = "הבלוק שוחרר. p במחסנית עדיין מחזיק כתובת — מצביע מת עד שתאפסו אותו.";
      }
    } else if (op === "return") {
      memState.locals = [];
      memState.pointers = [];
      fb.textContent =
        memState.heaps.length > 0
          ? "המחסנית התרוקנה. בערימה נשארו בלוקים בלי מצביע — דליפת זיכרון."
          : "המחסנית התרוקנה. הערימה ריקה — אין דליפה.";
    } else if (op === "reset") {
      resetMemOnly();
      fb.textContent = "המחסנית והערימה אופסו.";
    }
    fb.className = "feedback ok";
    renderMemSlots();
    markCodeLines("[data-mem-lab]", op === "reset" ? null : op);
    return;
  }

  const copyBtn = e.target.closest("[data-copy]");
  if (copyBtn) {
    const op = copyBtn.getAttribute("data-copy");
    const fb = app.querySelector("[data-copy-fb]");
    if (op === "reset") {
      resetCopyOnly();
      fb.textContent = "אופס. שני אובייקטים מחדש.";
    } else if (op === "shallow") {
      copyState.mode = "shallow";
      copyState.heapB = copyState.heapA;
      fb.textContent = "b קיבל את אותה כתובת. אין עותק שני של הנתונים.";
    } else if (op === "deep") {
      copyState.mode = "deep";
      copyState.heapB = "block-B";
      fb.textContent = "הוקצה בלוק חדש. a ו־b עצמאיים.";
    } else if (op === "del") {
      copyState.deadA = true;
      if (copyState.mode === "shallow") {
        fb.textContent = "הבלוק המשותף שוחרר. גם b מצביע למת. מפרק של b שיקרא delete שוב — קריסה / double-free.";
      } else if (copyState.mode === "deep") {
        fb.textContent = "הבלוק של a שוחרר. b עדיין מחזיק block-B תקין.";
      } else {
        fb.textContent = "שוחרר הבלוק של a. אין עדיין העתק.";
      }
    }
    fb.className = "feedback ok";
    renderCopySlots();
    markCodeLines("[data-copy-lab]", op === "reset" ? null : op);
    return;
  }

  const ovBtn = e.target.closest("[data-ov]");
  if (ovBtn) {
    const op = ovBtn.getAttribute("data-ov");
    const fb = app.querySelector("[data-ov-fb]");
    if (op === "reset") {
      ovState.bytes = 0;
      fb.textContent = "המסגרת אופסה. החוצץ ריק, כתובת החזרה תקינה.";
    } else if (op === "canary") {
      ovState.canaryOn = !ovState.canaryOn;
      ovState.bytes = 0;
      fb.textContent = ovState.canaryOn
        ? "עם קנרית — כמו בתרשים של המצגת. גלישה רציפה תשבור את החותם לפני שישתמשו בכתובת החזרה. לא מתקן את strcpy."
        : "בלי קנרית — תרשים המסגרת לבחינה: buf, EBP שמור, כתובת חזרה. גלישה רציפה יכולה להגיע ל-ret.";
    } else if (op === "write") {
      if (ovState.bytes >= 28) {
        fb.textContent = "החוצץ והשכנים כבר מלאים בהדגמה. אפסו כדי להתחיל שוב.";
      } else {
        ovState.bytes += 4;
        if (ovState.bytes <= 16) fb.textContent = "נכתב בתוך החוצץ. עדיין בגבול שהוקצה.";
        else if (ovState.bytes <= 20) fb.textContent = "עברתם את החוצץ. EBP השמור נדרס — נתון שליטה של המסגרת.";
        else if (ovState.canaryOn && ovState.bytes <= 24)
          fb.textContent = "הקנרית נדרסה. ביציאה מהפונקציה הבדיקה תיכשל והתהליך ייעצר.";
        else if (ovState.canaryOn)
          fb.textContent = "גם אזור כתובת החזרה נכתב, אבל הקנרית כבר שבור — לא ממשיכים ל-ret.";
        else fb.textContent = "כתובת החזרה נדרסה. ret היה קופץ למקום הלא נכון. זו חולשת שליטה — לא מדגימים קפיצה.";
      }
    }
    fb.className = "feedback ok";
    renderOvSlots();
    markCodeLines("[data-ov-lab]", op === "reset" ? null : op === "canary" ? "canary" : "write");
    return;
  }

  const intBtn = e.target.closest("[data-int]");
  if (intBtn) {
    const items = Number(intBtn.getAttribute("data-int"));
    const fb = app.querySelector("[data-int-fb]");
    const alloc = Number((BigInt(items) * 4n) & 0xffffffffn);
    const naive = items * 4;
    const wrapped = alloc !== naive && alloc < naive;
    fb.className = "feedback " + (wrapped ? "bad" : "ok");
    fb.textContent = wrapped
      ? `items=${items} (=2³⁰). כפל מלא ${naive} בתים. ב־size_t של 32 סיביות זה נעטף ל־${alloc} בתים, אבל הלולאה עדיין רצה ${items} פעמים — כתיבה מעבר לבלוק. (unsigned נעטף; signed ב־C++ הוא UB.)`
      : `items=${items}. הקצאה ${alloc} בתים = ${items}×4. אין עטיפה. במבחן הסכנה היא כפל בלי בדיקה לפני malloc.`;
    const bar = app.querySelector("[data-int-bar]");
    const cap = app.querySelector("[data-int-cap]");
    if (bar) {
      bar.style.width = wrapped ? "6%" : items >= 100 ? "70%" : "28%";
      bar.classList.toggle("wrapped", wrapped);
    }
    if (cap) cap.textContent = wrapped ? `${alloc} בתים (נעטף)` : `${alloc} בתים`;
    const facts = app.querySelector("[data-int-facts]");
    if (facts) {
      const cells = facts.querySelectorAll("strong");
      if (cells[0]) cells[0].textContent = String(items);
      if (cells[1]) cells[1].textContent = String(naive);
      if (cells[2]) cells[2].textContent = String(alloc);
      if (cells[3]) cells[3].textContent = String(items);
    }
    markCodeLines("[data-int-lab]", wrapped ? "bad" : "ok");
    return;
  }

  const uafBtn = e.target.closest("[data-uaf]");
  if (uafBtn) {
    const op = uafBtn.getAttribute("data-uaf");
    const fb = app.querySelector("[data-uaf-fb]");
    if (op === "reset") {
      uafState.live = null;
      uafState.pAlive = false;
      fb.textContent = "אופס.";
    } else if (op === "alloc") {
      uafState.live = "A";
      uafState.pAlive = true;
      fb.textContent = "p מצביע לבלוק עם נתוני A.";
    } else if (op === "free") {
      if (!uafState.pAlive) fb.textContent = "אין מה לשחרר.";
      else {
        uafState.live = null;
        fb.textContent = "הבלוק שוחרר. p עדיין מחזיק כתובת — מצביע מת.";
      }
    } else if (op === "reuse") {
      if (!uafState.pAlive) fb.textContent = "הקצו ושחררו קודם — בלי מצביע מת אין מה להראות.";
      else if (uafState.live === "A") fb.textContent = "שחררו קודם. אחרת זו הקצאה חדשה בלי UAF.";
      else {
        uafState.live = "B";
        fb.textContent = "המקצה נתן את אותה כתובת ל-B. p הישן לא עודכן — הוא עדיין מצביע כאילו זה A.";
      }
    } else if (op === "use") {
      if (!uafState.pAlive) fb.textContent = "אין מצביע.";
      else if (uafState.live === "A") fb.textContent = "עדיין A חי — השימוש חוקי בהדגמה הזו.";
      else if (uafState.live === "B")
        fb.textContent = "use-after-free: p קורא כאילו זה A ומקבל את נתוני B. שלמות נשברה.";
      else fb.textContent = "שימוש בכתובת משוחררת — זיכרון מת, קריסה או ערך אשפה.";
    }
    fb.className = "feedback ok";
    renderUafSlots();
    markCodeLines("[data-uaf-lab]", op === "reset" ? null : op);
    return;
  }

  const pya = e.target.closest("[data-pya]");
  if (pya) {
    const op = pya.getAttribute("data-pya");
    const fb = app.querySelector("[data-pya-fb]");
    if (op === "reset") {
      resetUnit4Labs();
      fb.textContent = "fruit חזר ל-[banana, apple, cherry].";
    } else if (op === "alias") {
      pyAlias.linked = true;
      pyAlias.vegs = pyAlias.fruit;
      fb.textContent = "vegs ו-fruit הם אותו list. is יהיה True.";
    } else if (op === "copy") {
      pyAlias.linked = false;
      pyAlias.vegs = pyAlias.fruit.slice();
      fb.textContent = "copy: שני אובייקטים. == יכול להיות True, is הוא False.";
    } else if (op === "mut") {
      pyAlias.fruit[0] = "pear";
      fb.textContent = pyAlias.linked
        ? "שיניתם fruit[0] וגם vegs השתנה — aliasing."
        : pyAlias.vegs
          ? "fruit השתנה. vegs (עותק) נשאר עם הערך הישן באיבר 0."
          : "fruit[0] = pear. שיוכו קודם vegs כדי לראות את ההבדל.";
    }
    fb.className = "feedback ok";
    renderPyAlias();
    markCodeLines("[data-py-alias]", op === "reset" ? null : op);
    return;
  }

  const pye = e.target.closest("[data-pye]");
  if (pye) {
    const op = pye.getAttribute("data-pye");
    const fb = app.querySelector("[data-pye-fb]");
    if (op === "const") {
      fb.className = "feedback ok";
      fb.textContent = "eval('2+3') בקוד שלכם → 5. הביטוי קבוע אצל המתכנת, לא קלט.";
    } else if (op === "input") {
      fb.className = "feedback bad";
      fb.textContent =
        "המחרוזת מ-input רצה כפייתון מלא. זו הזרקת קוד (Code Injection). try לא הופך את זה לבטוח. לא מריצים כאן קלט חופשי.";
    } else {
      fb.className = "feedback ok";
      fb.textContent = "isnumeric ואז int: כמו במצגת. המחרוזת נשארת נתון, לא קוד.";
    }
    app.querySelectorAll("[data-pye-door]").forEach((d) => d.classList.remove("on"));
    const door = app.querySelector(`[data-pye-door="${op === "input" ? "input" : op === "safe" ? "safe" : ""}"]`);
    if (door) door.classList.add("on");
    markCodeLines("[data-py-eval]", op);
    return;
  }

  const u5osi = e.target.closest("[data-u5osi]");
  if (u5osi) {
    const id = u5osi.getAttribute("data-u5osi");
    const layer = U5_OSI.find((x) => x.id === id);
    const fb = app.querySelector("[data-u5osi-fb]");
    if (layer && fb) {
      fb.className = "feedback ok";
      const fold =
        id === "5" || id === "6"
          ? " במודל TCP/IP המעשי (חמש שכבות במצגת) השכבה הזו מתקפלת לתוך היישום."
          : "";
      fb.textContent = layer.name + " — " + layer.body + fold;
    }
    app.querySelectorAll(".osi-layer").forEach((n) => n.classList.toggle("on", n.getAttribute("data-u5osi") === id));
    markCodeLines("[data-u5-osi]", id);
    return;
  }

  const u5s = e.target.closest("[data-u5s]");
  if (u5s) {
    const op = u5s.getAttribute("data-u5s");
    const fb = app.querySelector("[data-u5s-fb]");
    if (op === "reset") {
      resetU5Sock();
      fb.textContent = "הרצף אופס. שרת: socket→bind→listen→accept. לקוח: socket→htons→connect.";
    } else if (op === "srv") {
      if (u5sock.srv < U5_SRV.length) u5sock.srv += 1;
      fb.textContent =
        u5sock.srv >= 5 && u5sock.cli < 3
          ? "השרת יכול להיות ב-accept בזמן שהלקוח עוד לא עשה connect — זה תקין: listen כבר פתוח."
          : "צעד שרת: " + U5_SRV[u5sock.srv - 1];
    } else if (op === "cli") {
      if (u5sock.cli < U5_CLI.length) u5sock.cli += 1;
      fb.textContent =
        u5sock.cli === 2
          ? "htons: host to network short — ממיר את הפורט לסדר בתים של הרשת (big-endian). במבחן: בלי זה המספר יישלח הפוך על little-endian."
          : "צעד לקוח: " + U5_CLI[u5sock.cli - 1];
    }
    fb.className = "feedback ok";
    renderU5Sock();
    return;
  }

  const u5r = e.target.closest("[data-u5r]");
  if (u5r) {
    const op = u5r.getAttribute("data-u5r");
    const fb = app.querySelector("[data-u5r-fb]");
    if (op === "reset") {
      resetU5Race();
      fb.className = "feedback ok";
      fb.textContent = "g_value חזר ל-0. נסו שזירה בלי מנעול, או שני mutex.";
    } else if (op === "free1" || op === "free2") {
      if (u5race.lockA || u5race.lockB) {
        fb.textContent = "כבר התחלתם מסלול עם mutex. אפסו כדי לא לערבב.";
        fb.className = "feedback bad";
        renderU5Race();
        return;
      }
      const isA = op === "free1";
      const ph = isA ? u5race.a : u5race.b;
      if (ph >= 3) {
        fb.textContent = (isA ? "חוט א" : "חוט ב") + " כבר כתב. אפסו לסיבוב חדש.";
        fb.className = "feedback ok";
      } else {
        const next = ph + 1;
        if (next === 1) {
          if (isA) {
            u5race.locA = u5race.v;
            u5race.a = 1;
            fb.textContent = "חוט א קרא g_value = " + u5race.locA + " לתוך reg.";
          } else {
            u5race.locB = u5race.v;
            u5race.b = 1;
            fb.textContent = "חוט ב קרא g_value = " + u5race.locB + " לתוך reg.";
          }
        } else if (next === 2) {
          if (isA) {
            u5race.locA += 10;
            u5race.a = 2;
            fb.textContent = "חוט א: reg += 10 → " + u5race.locA + " (עדיין לא בזיכרון המשותף).";
          } else {
            u5race.locB += 10;
            u5race.b = 2;
            fb.textContent = "חוט ב: reg += 10 → " + u5race.locB + " (עדיין לא בזיכרון המשותף).";
          }
        } else {
          if (isA) {
            u5race.v = u5race.locA;
            u5race.a = 3;
          } else {
            u5race.v = u5race.locB;
            u5race.b = 3;
          }
          if (u5race.a === 3 && u5race.b === 3) {
            fb.textContent =
              u5race.v === 20
                ? "יצא 20 כי לא נשזרו הקריאות. בלי מנעול זה תלוי תזמון. ב־C++ גישה מקבילית בלי סנכרון היא מרוץ נתונים — התנהגות לא מוגדרת, גם אם המספר נראה נכון."
                : "שני החוטים כתבו. g_value = " +
                  u5race.v +
                  " במקום 20: עדכון אבד, כי שניהם קראו את אותו ערך ישן. זו תנאי מרוץ; ב־C++ זה גם מרוץ נתונים (UB).";
          } else {
            fb.textContent =
              (isA ? "חוט א" : "חוט ב") + " כתב g_value = " + u5race.v + ". קדמו את החוט השני.";
          }
        }
        fb.className = u5race.a === 3 && u5race.b === 3 && u5race.v !== 20 ? "feedback bad" : "feedback ok";
      }
    } else if (op === "lock1" || op === "lock2") {
      if (u5race.a > 0 || u5race.b > 0) {
        fb.textContent = "כבר התחלתם מסלול בלי מנעול. אפסו לפני mutex.";
        fb.className = "feedback bad";
        renderU5Race();
        return;
      }
      if (op === "lock1" && u5race.lockA) fb.textContent = "חוט א כבר הוסיף עם מנעול.";
      else if (op === "lock2" && u5race.lockB) fb.textContent = "חוט ב כבר הוסיף עם מנעול.";
      else {
        if (op === "lock1") u5race.lockA = true;
        else u5race.lockB = true;
        u5race.v += 10;
        fb.textContent =
          u5race.lockA && u5race.lockB
            ? "עם mutex: כל חוט +10 בזה אחר זה. עכשיו " + u5race.v + " — זה החוזה, לא מזל."
            : "הקטע הקריטי נעול. חוט אחד סיים +10. הפעילו את השני.";
      }
      fb.className = "feedback ok";
    }
    renderU5Race();
    return;
  }

  const u6w = e.target.closest("[data-u6w]");
  if (u6w) {
    const op = u6w.getAttribute("data-u6w");
    const fb = app.querySelector("[data-u6w-fb]");
    const msg = {
      static: "השרת פותח קובץ מוכן. גבול אמון: הנתיב (לא לצאת משורש המסמכים).",
      cgi: "מופעל סקריפט; QUERY_STRING וגוף POST הם נתון. לא eval/SQL/מעטפת על המחרוזת. תהליך לבקשה יקר בהצפה.",
      app: "יישום דינמי שרת-לקוח: מושב, בסיס נתונים, דפים שנוצרים. אותו HTTP, יותר לוגיקה.",
      get: "GET שם פרמטרים בכתובת (לוגים, היסטוריה). POST בגוף. שניהם קלט שהלקוח שולט בו.",
      cookie: "HTTP חסר מצב. העוגיה מזהה מושב — סוד. לא לסמוך על שדה שהלקוח יכול לערוך בלי חתימה.",
    };
    fb.className = "feedback ok";
    fb.textContent = msg[op] || "";
    const pkt = app.querySelector("[data-u6-pkt]");
    if (pkt) {
      pkt.textContent = op === "cookie" ? "Cookie" : op === "get" ? "GET/POST" : "HTTP";
      pkt.classList.remove("fly");
      void pkt.offsetWidth;
      pkt.classList.add("fly");
    }
    app.querySelectorAll("[data-web-end]").forEach((n) => n.classList.add("on"));
    markCodeLines("[data-u6-web]", op);
    return;
  }

  const u6i = e.target.closest("[data-u6i]");
  if (u6i) {
    const op = u6i.getAttribute("data-u6i");
    const fb = app.querySelector("[data-u6i-fb]");
    const msg = {
      raw: "הקוד רואה את קבצי השרת. לא מתאים למהדר מקוון.",
      exec: "exec על מחרוזת לקוח = המפרש מריץ קוד. כמו eval. לא באותו תהליך של שרת היישום.",
      sand: "Sandbox: תהליך חסר הרשאות, מגבלות קבצים/רשת/CPU. באג בבקר או מכסות רופפות נשארים.",
      ct: "container: מרחב משתמש על ליבה משותפת. קל לפריסה; באג בליבה משותף לכל הדיירים על המארח.",
      vm: "VM+hypervisor: ליבה נפרדת לכל אורח. כבד יותר. סוג 1 על החומרה; סוג 2 מעל מערכת מארחת.",
    };
    fb.className = op === "raw" || op === "exec" ? "feedback bad" : "feedback ok";
    fb.textContent = msg[op] || "";
    app.querySelectorAll("[data-iso-vis]").forEach((n) => {
      n.classList.toggle("on", (op === "vm" && n.getAttribute("data-iso-vis") === "vm") || (op === "ct" && n.getAttribute("data-iso-vis") === "ct"));
    });
    markCodeLines("[data-u6-iso]", op);
    return;
  }

  const u6t = e.target.closest("[data-u6t]");
  if (u6t) {
    const op = u6t.getAttribute("data-u6t");
    const fb = app.querySelector("[data-u6t-fb]");
    const msg = {
      saas: "SaaS: יישום מוכן; הנתונים אצל הספק. אתם מנהלים משתמשים ותוכן. לא מבטל באגים בקוד שלכם.",
      paas: "PaaS: מעלים קוד; הספק מנהל מערכת הפעלה וסביבת ריצה. באג ביישום נשאר שלכם.",
      iaas: "IaaS: אתם מתקינים ומעדכנים מערכת הפעלה. הספק נותן מכונה. משלים את SaaS/PaaS — לא במקום.",
      comp: "אתם המארח של קוד זר. מכסות + בידוד. DoS אם בלי גבול מעבד. קומפילציה עדיין לא הרצה.",
      deep: "Deep web = לא באינדקס (מייל אחרי התחברות). לא שם לפשיעה ולא זהה ל-Tor.",
      tor: "שלושה ממסרים מסתירים זהות. צומת יציאה רואה יעד בלי HTTPS. לא מתרגלים האזנה.",
    };
    fb.className = "feedback ok";
    fb.textContent = msg[op] || "";
    markCodeLines("[data-u6-tru]", op);
    return;
  }

  const u7s = e.target.closest("[data-u7s]");
  if (u7s) {
    const op = u7s.getAttribute("data-u7s");
    const fb = app.querySelector("[data-u7s-fb]");
    const msg = {
      concat: "query = תבנית + id. המנוע מפרסר משפט אחד: קלט יכול להפוך לתחביר. לא מדביקים.",
      fmt: "format / f-string עדיין מכניסים את המחרוזת לתחביר. גרש במחרוזת אינו גבול. רק ? וטיפל.",
      param: "תבנית קבועה עם ?. הערך נקשר בנפרד ונשאר נתון — גם אם הוא נראה כמו SQL.",
      ident: "מציין מקום לא לשם טבלה. רק רשימת שמות מותרים בקוד, אחרת שוב שרשור.",
    };
    fb.className = op === "param" ? "feedback ok" : "feedback bad";
    fb.textContent = msg[op] || "";
    app.querySelectorAll("[data-sql-vis]").forEach((n) => {
      const k = n.getAttribute("data-sql-vis");
      n.classList.toggle("on", (op === "param" && k === "param") || (op !== "param" && k === "concat"));
    });
    const eng = app.querySelector("[data-sql-engine]");
    if (eng) {
      const shown = {
        concat: "המנוע מפרסר משפט אחד: SELECT … WHERE name = '<קלט>'",
        fmt: "format / f-string: עדיין מחרוזת אחת שמפורסרת — גרש אינו גבול",
        param: "תבנית קבועה: SELECT … WHERE name = ?   |  bind(הערך)",
        ident: "FROM <שם-מהמשתמש> — ? לא נקשר למזהה. רק רשימה סגורה בקוד",
      };
      eng.textContent = shown[op] || "";
    }
    markCodeLines("[data-u7-sql]", op);
    if (op === "param" && window.CSProgress) {
      const section = u7s.closest("[data-lab]");
      const heading = section && section.querySelector("h2");
      if (heading) CSProgress.rememberLab("u7-sql", heading.textContent.trim());
      CSProgress.noteLab("u7-sql");
    }
    return;
  }

  const u7d = e.target.closest("[data-u7d]");
  if (u7d) {
    const op = u7d.getAttribute("data-u7d");
    const fb = app.querySelector("[data-u7d-fb]");
    const msg = {
      dql: "DQL: שאילתה. SELECT. הזרקה כאן מרחיבה שליפה (סודיות).",
      dml: "DML: שינוי שורות. INSERT/UPDATE/DELETE. הזרקה כאן שוברת שלמות.",
      ddl: "DDL: מבנה. CREATE/ALTER/DROP. חשבון בלי DDL מצמצם נזק.",
      dcl: "DCL: הרשאות GRANT/REVOKE. ב-SQLite בעיקר הרשאות הקובץ במערכת.",
    };
    fb.className = "feedback ok";
    fb.textContent = msg[op] || "";
    app.querySelectorAll("[data-lang-vis]").forEach((n) => {
      n.classList.toggle("on", n.getAttribute("data-lang-vis") === op);
    });
    markCodeLines("[data-u7-lang]", op);
    return;
  }

  const u7c = e.target.closest("[data-u7c]");
  if (u7c) {
    const op = u7c.getAttribute("data-u7c");
    const fb = app.querySelector("[data-u7c-fb]");
    const msg = {
      kiss: "פשטות לקריאה. לא להשמיט בדיקת טווח כדי לקצר.",
      dry: "פונקציה אחת עם קשירה. לא להעתיק שרשור לכל מסך.",
      arrow: "return מוקדם כשתנאי נכשל — במקום if בתוך if.",
      name: "sid ברור יותר מ-x כשהמקור טופס. שם רע מסתיר קלט לא אמין.",
    };
    fb.className = "feedback ok";
    fb.textContent = msg[op] || "";
    markCodeLines("[data-u7-cln]", op);
    return;
  }

  const expand = e.target.closest("[data-expand]");
  if (expand) {
    const id = expand.getAttribute("data-expand");
    const label = expand.getAttribute("data-label");
    const branch = app.querySelector(`[data-branch="${id}"]`);
    if (!branch) return;
    branch.hidden = !branch.hidden;
    expand.textContent = (branch.hidden ? "▸ " : "▾ ") + label;
    return;
  }

  const leaf = e.target.closest("[data-leaf]");
  if (leaf) {
    const block = leaf.closest("[data-leaf-block]");
    const fb = block.querySelector(".feedback");
    const ok = leaf.getAttribute("data-ok") === "1";
    block.querySelectorAll(".option").forEach((b) => b.classList.remove("correct", "wrong"));
    leaf.classList.add(ok ? "correct" : "wrong");
    fb.hidden = false;
    fb.className = "feedback " + (ok ? "ok" : "bad");
    fb.textContent = ok ? "מתאים: זו אפחות שסוגרת את הנתיב בעלה." : "זה לא סוגר את הנתיב הזה. נסו שוב.";
    if (ok && window.CSProgress) {
      const section = leaf.closest("[data-lab]");
      const heading = section && section.querySelector("h2");
      if (heading) CSProgress.rememberLab("tree", heading.textContent.trim());
      CSProgress.noteLab("tree");
    }
    return;
  }

  const tocToggle = e.target.closest("[data-toc-toggle]");
  if (tocToggle) {
    const drawer = app.querySelector("#sum-toc");
    const backdrop = app.querySelector(".toc-backdrop");
    const open = drawer.hidden;
    drawer.hidden = !open;
    backdrop.hidden = !open;
    document.body.classList.toggle("toc-open", open);
    return;
  }

  if (e.target.closest("[data-toc-close]")) {
    const drawer = app.querySelector("#sum-toc");
    const backdrop = app.querySelector(".toc-backdrop");
    if (drawer) drawer.hidden = true;
    if (backdrop) backdrop.hidden = true;
    document.body.classList.remove("toc-open");
    return;
  }

  const place = e.target.closest("[data-cards-place]");
  if (place) {
    const value = place.getAttribute("data-cards-place");
    setCardsPlacement(value);
    const r = parseRoute();
    const base = `#/course/${COURSE.id}/summary`;
    if (value === "after" && r.summaryCardsPage) {
      location.hash = base;
      return;
    }
    app.innerHTML = renderSummary();
    scrollSummaryFocus();
    return;
  }

  const unitFilter = e.target.closest("[data-unit-filter]");
  if (unitFilter) {
    summaryUnit = unitFilter.getAttribute("data-unit-filter");
    app.innerHTML = renderSummary();
    return;
  }

  const kindBtn = e.target.closest("#sum-filters [data-kind]");
  if (kindBtn) {
    summaryKind = kindBtn.getAttribute("data-kind");
    app.querySelectorAll("#sum-filters button").forEach((b) => b.classList.remove("active"));
    kindBtn.classList.add("active");
    const grid = document.getElementById("sum-grid");
    if (grid) grid.innerHTML = summaryCardsHtml();
    return;
  }

  const choice = e.target.closest("[data-quiz]");
  if (!choice) return;
  const q = findQuiz(choice.getAttribute("data-quiz"));
  if (!q) return;
  const box = choice.closest(".quiz");
  const fb = box.querySelector(".feedback");
  box.querySelectorAll(".option").forEach((b) => b.classList.remove("correct", "wrong"));
  const good = choice.getAttribute("data-choice") === q.answer;
  choice.classList.add(good ? "correct" : "wrong");
  if (!good) {
    const right = box.querySelector(`[data-choice="${q.answer}"]`);
    if (right) right.classList.add("correct");
  }
  fb.hidden = false;
  fb.className = "feedback " + (good ? "ok" : "bad");
  fb.innerHTML = (answerBuiltByAi(q) ? aiBubble() : "") + studyRich(q.explain);
  noteAnswer(q.id, good);
});

app.addEventListener("submit", (e) => {
  const searchForm = e.target.closest("[data-search-form]");
  if (searchForm) {
    e.preventDefault();
    const q = String(new FormData(searchForm).get("q") || "").trim();
    location.hash = `#/course/${COURSE.id}/search` + (q ? "/" + encodeURIComponent(q) : "");
    return;
  }
  const drillForm = e.target.closest("[data-drill-setup]");
  if (drillForm) {
    e.preventDefault();
    const data = new FormData(drillForm);
    startRound(String(data.get("unit") || "all"), String(data.get("count") || "10"));
    return;
  }
  if (!e.target.classList.contains("risk-form")) return;
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  let hits = 0;
  RISK_LAB.fields.forEach((f) => {
    const val = (data[f.id] || "").toLowerCase();
    if (f.ok.some((k) => val.includes(k.toLowerCase()))) hits += 1;
  });
  const model = form.parentElement.querySelector(".model");
  model.hidden = false;
  const m = RISK_LAB.modelAnswer;
  model.innerHTML = `<p class="feedback ${hits >= 3 ? "ok" : "bad"}">כיסיתם בערך ${hits} מתוך ${RISK_LAB.fields.length} שדות בכיוון הנכון.</p>
    <div class="panel"><p><strong>תשובת מודל</strong></p>
    <p>רכיב: ${esc(m.component)}</p>
    <p>סיווג: ${esc(m.klass)}</p>
    <p>CIA: ${esc(m.cia)}</p>
    <p>נזק: ${esc(m.impact)}</p>
    <p>אפחות: ${esc(m.fix)}</p></div>`;
  if (hits >= 3 && window.CSProgress) {
    const section = form.closest("[data-lab]");
    const heading = section && section.querySelector("h2");
    if (heading) CSProgress.rememberLab("risk", heading.textContent.trim());
    CSProgress.noteLab("risk");
  }
});

app.addEventListener("input", (e) => {
  if (!e.target.matches("[data-search-input]")) return;
  const q = e.target.value;
  const box = app.querySelector("[data-search-results]");
  if (box) box.innerHTML = searchResultsHtml(q);
  const next = `#/course/${COURSE.id}/search` + (q.trim() ? "/" + encodeURIComponent(q.trim()) : "");
  if (location.hash !== next) history.replaceState(null, "", next);
});

document.addEventListener("keydown", (e) => {
  const drawn = e.target.closest(".t-node");
  if (drawn && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    handleVizClick(drawn);
    return;
  }
  if (!app.querySelector("[data-flash]")) return;
  if (e.target.closest("input, textarea, select")) return;
  if (e.key === " " || e.key === "Enter") {
    if (e.target.closest("[data-flip-nav], [data-flip-unit], [data-flip-kind]")) return;
    e.preventDefault();
    flipState.back = !flipState.back;
    showFlip();
    return;
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
    e.preventDefault();
    moveFlip(1);
  } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
    e.preventDefault();
    moveFlip(-1);
  }
});

app.addEventListener("change", (e) => {
  const box = e.target.closest("[data-print-check]");
  if (box) {
    const node = printNodeById(box.getAttribute("data-print-check"));
    if (!node) return;
    const ids = [];
    printBranchIds(node, ids);
    ids.forEach((id) => (box.checked ? printState.selected.add(id) : printState.selected.delete(id)));
    savePrintState();
    const tree = document.querySelector(".print-tree");
    if (tree) tree.innerHTML = printTreeHtml(printTree(), 0);
    return;
  }
  const opt = e.target.closest("[data-print-opt]");
  if (!opt) return;
  const key = opt.getAttribute("data-print-opt");
  if (key === "exercises" || key === "hints" || key === "solutions") printState[key] = opt.checked;
  if (key === "exercises" && !opt.checked) {
    printState.hints = false;
    printState.solutions = false;
    document.querySelectorAll("[data-print-opt='hints'], [data-print-opt='solutions']").forEach((input) => {
      input.checked = false;
    });
  }
  savePrintState();
});

window.addEventListener("afterprint", () => {
  document.body.classList.remove("is-print-current", "is-range-print");
  const host = document.querySelector("[data-print-host]");
  if (host) {
    host.hidden = true;
    host.innerHTML = "";
  }
});

window.addEventListener("hashchange", route);
if (window.CSAuth) {
  let seenAuthId = CSAuth.user() ? CSAuth.user().id : null;
  CSAuth.onChange(async (event) => {
    const nextId = CSAuth.user() ? CSAuth.user().id : null;
    if (event === "SIGNED_IN" || event === "USER_UPDATED") {
      if (nextId === seenAuthId) return;
      seenAuthId = nextId;
    } else if (event === "SIGNED_OUT") {
      if (!seenAuthId) return;
      seenAuthId = null;
    } else return;
    const editing = document.activeElement && document.activeElement.closest("textarea, input, select, [contenteditable='true']");
    if (editing && event !== "SIGNED_OUT") return;
    if (window.CSProgress) await CSProgress.boot();
    route();
  });
}
function mountTopbarScroll() {
  if (window.__topbarScroll) return;
  window.__topbarScroll = true;
  let last = window.scrollY;
  let up = 0;
  let down = 0;
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const bar = document.querySelector(".topbar");
        const y = window.scrollY;
        const delta = y - last;
        last = y;
        if (!bar) return;
        const focused = bar.contains(document.activeElement);
        if (y < 24 || focused) {
          bar.classList.remove("is-away");
          up = 0;
          down = 0;
          return;
        }
        if (delta > 4) {
          up = 0;
          down += delta;
          if (down >= 12) {
            bar.classList.add("is-away");
            down = 0;
          }
        } else if (delta < -4) {
          down = 0;
          up += -delta;
          if (up >= 72) {
            bar.classList.remove("is-away");
            up = 0;
          }
        }
      });
    },
    { passive: true }
  );
}

async function boot() {
  try {
    if (window.CSContent) await CSContent.boot();
  } catch (err) {
    /* נשארים עם הקבצים המצורפים */
  }
  try {
    if (window.CSProgress) await CSProgress.boot();
  } catch (err) {
    /* המעקב המקומי נשאר */
  }
  window.__csBooted = true;
  mountTopbarScroll();
  route();
}
boot();
