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
    section: area === "learn" ? parts[4] || null : null,
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
        `<button type="button" class="option" data-quiz="${esc(q.id)}" data-choice="${esc(o.id)}">${esc(o.text)}</button>`
    )
    .join("");
  return `<div class="quiz panel" data-qid="${esc(q.id)}">
    <div class="box-head"><p>${questionBuiltByAi(q) ? aiBubble() : ""}<strong>תרגול.</strong> ${esc(q.prompt)}</p>${editLink(quizContentId(q.id), "השאלה")}</div>
    ${opts}
    <p class="feedback" hidden></p>
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

function labKeyFromAttr(attr) {
  const raw = String(attr || "");
  if (raw.indexOf("risk-lab") !== -1) return "risk";
  const match = raw.match(/data-([a-z0-9-]+)/);
  if (!match) return "";
  return match[1].replace(/-lab$/, "");
}

function labChrome({ attr, title, brief, stage, actions, logAttr, ready, log = true }) {
  const extra = attr ? " " + attr : "";
  const key = labKeyFromAttr(attr);
  const binary = key === "risk" || key === "tree" || key === "u7-sql";
  const doneAlready = key && window.CSProgress && CSProgress.hasLab(key);
  const done =
    key && !binary
      ? `<div class="lab-done-row"><button type="button" class="ghost-btn lab-done${doneAlready ? " is-on" : ""}" data-lab-done="${esc(key)}">${doneAlready ? "הושלם" : "סימנתי שהבנתי"}</button></div>`
      : "";
  const logEl = log
    ? `<div class="feedback" ${logAttr || ""}>${ready || "מוכן. בחרו פעולה בשלב."}</div>`
    : "";
  const labAttr = key ? ` data-lab="${esc(key)}"` : "";
  return `<section class="lab"${labAttr}${extra}>
    <div class="lab-head">
      <p class="lab-kicker"><span class="lab-live" aria-hidden="true"></span> מעבדה חיה</p>
      <h2>${title}</h2>
      ${brief ? `<p class="lab-brief">${brief}</p>` : ""}
    </div>
    ${stage ? `<div class="lab-stage">${stage}</div>` : ""}
    ${actions ? `<div class="lab-actions">${actions}</div>` : ""}
    ${logEl}
    ${done}
  </section>`;
}

function codeLine(mark, text) {
  return `<span class="code-line" data-cline="${mark}">${text}</span>`;
}

function codePanel(title, inner) {
  return `<div class="lab-panel lab-code-panel">
    <p class="lab-panel-k">${title}</p>
    <pre class="code lab-snippet"><code>${inner}</code></pre>
  </div>`;
}

function withCode(stage, code) {
  return `<div class="lab-with-code">${stage}${code}</div>`;
}

function markCodeLines(scope, id) {
  const root = (typeof scope === "string" ? app.querySelector(scope) : scope) || app;
  if (!root) return;
  const ids = !id ? [] : Array.isArray(id) ? id.filter(Boolean) : [id];
  root.querySelectorAll(".code-line").forEach((n) => {
    const marks = (n.getAttribute("data-cline") || "").split(/\s+/);
    n.classList.toggle("on", ids.some((x) => marks.includes(x)));
  });
}

function riskLabHtml() {
  const r = RISK_LAB;
  const fields = r.fields
    .map((f) => `<label>${f.label}<input name="${f.id}" placeholder="${f.placeholder}" /></label>`)
    .join("");
  return labChrome({
    attr: 'id="risk-lab"',
    title: r.title,
    brief: r.intro + " " + r.scenario,
    stage: withCode(
      `<form class="risk-form lab-panel">${fields}
      <button class="primary" type="submit">בדיקה</button>
    </form>
    <div class="model" hidden></div>`,
      codePanel(
        "שמות השדות (מלאו אתם — התשובה אחרי בדיקה)",
        `component:  רכיב מושפע
klass:      עיצוב / מימוש / תפעול
cia:        סודיות / שלמות / זמינות
fix:        אפחות מוצעת`
      )
    ),
    log: false,
  });
}

function memLabHtml() {
  return labChrome({
    attr: "data-mem-lab",
    title: MEM_LAB.title,
    brief: MEM_LAB.intro + " לחצו צעד-אחר-צעד: מקומי נעלם ביציאה; new נשאר עד delete.",
    stage: withCode(
      `<div class="mem-cols">
      <div class="mem-col lab-panel"><p class="lab-panel-k">מחסנית (אוטומטי)</p><div data-mem-stack></div></div>
      <div class="mem-col lab-panel"><p class="lab-panel-k">ערימה (new)</p><div data-mem-heap></div></div>
    </div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `void demo() {
${codeLine("local", "    int local = 1;              // מחסנית")}
${codeLine("new", "    int* p = new int(5);        // p במחסנית, 5 בערימה")}
${codeLine("delete", "    delete p;")}
${codeLine("delete", "    p = nullptr;")}
${codeLine("return", "}  // יציאה: local נעלם; בלי delete נשארת דליפה")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-mem="local">משתנה מקומי</button>
      <button type="button" class="primary" data-mem="new">new + מצביע</button>
      <button type="button" class="primary" data-mem="delete">delete</button>
      <button type="button" class="primary" data-mem="return">יציאה מהפונקציה</button>
      <button type="button" class="primary" data-mem="reset">איפוס</button>`,
    logAttr: "data-mem-fb",
  });
}

function copyLabHtml() {
  return labChrome({
    attr: "data-copy-lab",
    title: COPY_LAB.title,
    brief: COPY_LAB.intro + " העתיקו, מחקו את a, והשוו לאן b מצביע.",
    stage: withCode(
      `<div class="copy-cols">
      <div class="mem-col lab-panel"><p class="lab-panel-k">אובייקט a</p><div data-copy-a></div></div>
      <div class="mem-col lab-panel"><p class="lab-panel-k">אובייקט b (העתק)</p><div data-copy-b></div></div>
    </div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `struct Buf { int* p; };
Buf a; a.p = new int(1);
Buf b;
${codeLine("shallow", "b.p = a.p;              // רדוד: אותה כתובת")}
${codeLine("deep", "b.p = new int(*a.p);    // עמוק: בלוק חדש")}
${codeLine("del", "delete a.p;             // שחרור של a")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-copy="shallow">העתקה רדודה a → b</button>
      <button type="button" class="primary" data-copy="deep">העתקה עמוקה a → b</button>
      <button type="button" class="primary" data-copy="del">delete על הנתונים של a</button>
      <button type="button" class="primary" data-copy="reset">איפוס</button>`,
    logAttr: "data-copy-fb",
  });
}

function ovLabHtml() {
  return labChrome({
    attr: "data-ov-lab",
    title: OV_LAB.title,
    brief: OV_LAB.intro + " כמו במצגת: כתובות נמוכות למעלה. גלישה ב-buf מתקדמת אל EBP, קנרית, כתובת חזרה. הקנרית היא אפחות — לא תיקון של strcpy.",
    stage: withCode(
      `<div class="lab-panel"><p class="lab-panel-k">מסגרת המחסנית</p><div class="stack-viz" data-ov-slots></div></div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `void func(char const* fromstr) {
${codeLine("write", "    char buf[16];")}
${codeLine("write", "    strcpy(buf, fromstr);  /* באג: אין גבול ליעד */")}
${codeLine("canary", "    /* קנרית (אפחות): ערך לפני כתובת החזרה */")}
}
${codeLine("safe", "/* במקום: fgets / string — קיבולת + בדיקה */")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-ov="write">צעד: כתוב 4 בתים</button>
      <button type="button" class="primary" data-ov="canary">עם / בלי קנרית</button>
      <button type="button" class="primary" data-ov="reset">איפוס</button>`,
    logAttr: "data-ov-fb",
  });
}

function intLabHtml() {
  return labChrome({
    attr: "data-int-lab",
    title: INT_LAB.title,
    brief: INT_LAB.intro + " השוו הקצאה מדומה (32 סיביות) למספר הפריטים שהלולאה עדיין סופרת.",
    stage: withCode(
      `<div class="lab-panel">
      <p class="lab-panel-k">n × sizeof מול תקרת הטיפוס</p>
      <div class="wrap-meter">
        <div class="wrap-bar" data-int-bar></div>
        <span class="wrap-cap" data-int-cap>בחרו מספר פריטים</span>
      </div>
      <div class="int-facts" data-int-facts>
        <div>פריטים<strong dir="ltr">—</strong></div>
        <div>כפל מלא<strong dir="ltr">—</strong></div>
        <div>הקצאה ב־32 סיביות<strong dir="ltr">—</strong></div>
        <div>כתיבות בלולאה<strong dir="ltr">—</strong></div>
      </div>
    </div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `${codeLine("bad", "/* פגיע: כפל בלי בדיקה */")}
${codeLine("bad", "int *p = malloc(items * sizeof *p);")}
${codeLine("ok", "if (items == 0 || items &gt; SIZE_MAX / sizeof *p)")}
${codeLine("ok", "    return NULL;")}
${codeLine("ok", "int *q = malloc(items * sizeof *q);")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-int="5">5 פריטים</button>
      <button type="button" class="primary" data-int="100">100 פריטים</button>
      <button type="button" class="primary" data-int="1073741824">2<sup>30</sup> פריטים</button>`,
    logAttr: "data-int-fb",
  });
}

function uafLabHtml() {
  return labChrome({
    attr: "data-uaf-lab",
    title: UAF_LAB.title,
    brief: UAF_LAB.intro + " הקצו A, שחררו, הקצו B, ואז השתמשו ב-p הישן — בלי לגעת בזיכרון אמיתי.",
    stage: withCode(
      `<div class="mem-cols">
      <div class="mem-col lab-panel"><p class="lab-panel-k">מצביע ישן p</p><div data-uaf-p></div></div>
      <div class="mem-col lab-panel"><p class="lab-panel-k">ערימה</p><div data-uaf-heap></div></div>
    </div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `${codeLine("alloc", "int* p = new int(1);     // A")}
${codeLine("free", "delete p;                // p עדיין מחזיק כתובת")}
${codeLine("reuse", "int* q = new int(2);     // B, אולי אותה כתובת")}
${codeLine("use", "*p;                      // use-after-free")}
${codeLine("reset", "p = nullptr;             // אחרי שחרור — לא משאירים חי")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-uaf="alloc">הקצה (A)</button>
      <button type="button" class="primary" data-uaf="free">שחרר</button>
      <button type="button" class="primary" data-uaf="reuse">הקצה אחר (B)</button>
      <button type="button" class="primary" data-uaf="use">השתמש ב-p הישן</button>
      <button type="button" class="primary" data-uaf="reset">איפוס</button>`,
    logAttr: "data-uaf-fb",
  });
}

function pyAliasLabHtml() {
  return labChrome({
    attr: "data-py-alias",
    title: PY_ALIAS_LAB.title,
    brief: PY_ALIAS_LAB.intro + " שייכו, העתיקו, שנו fruit[0] וראו אם vegs זז.",
    stage: withCode(
      `<div class="mem-cols">
      <div class="mem-col lab-panel"><p class="lab-panel-k">fruit</p><div data-py-fruit></div></div>
      <div class="mem-col lab-panel"><p class="lab-panel-k">vegs</p><div data-py-vegs></div></div>
    </div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `fruit = ["banana", "apple", "cherry"]
${codeLine("alias", "vegs = fruit            # אותו אובייקט (is)")}
${codeLine("copy", "vegs = fruit.copy()     # רשימה חדשה")}
${codeLine("mut", 'fruit[0] = "pear"       # משפיע על vegs רק ב-alias')}
`
      )
    ),
    actions: `<button type="button" class="primary" data-pya="alias">vegs = fruit</button>
      <button type="button" class="primary" data-pya="copy">vegs = fruit.copy()</button>
      <button type="button" class="primary" data-pya="mut">fruit[0] = pear</button>
      <button type="button" class="primary" data-pya="reset">איפוס</button>`,
    logAttr: "data-pya-fb",
  });
}

function pyEvalLabHtml() {
  return labChrome({
    attr: "data-py-eval",
    title: PY_EVAL_LAB.title,
    brief: PY_EVAL_LAB.intro + " השוו דלת למפרש מול דלת להמרה. לא מריצים כאן קלט חופשי.",
    stage: withCode(
      `<div class="door-row compact">
      <div class="door bad-door" data-pye-door="input">קלט → מפרש</div>
      <div class="door ok-door" data-pye-door="safe">קלט → מספר</div>
    </div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `${codeLine("const", 'eval("2+3")              # ביטוי קבוע אצלכם')}
${codeLine("input", "comp = input(...)")}
${codeLine("input", "eval(comp)               # פגיע: קלט כקוד")}
${codeLine("safe", "int(s) if s.isnumeric()  # כמו במצגת: המחרוזת נתון")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-pye="const">eval של 2+3 בקוד</button>
      <button type="button" class="primary" data-pye="input">eval על מחרוזת מ-input</button>
      <button type="button" class="primary" data-pye="safe">isnumeric ואז int</button>`,
    logAttr: "data-pye-fb",
  });
}

function u5OsiLabHtml() {
  const stack = [...U5_OSI]
    .reverse()
    .map(
      (L) =>
        `<button type="button" class="osi-layer" data-u5osi="${L.id}"><span class="osi-num">${L.id}</span> ${L.name.replace(/^\d+\s/, "")}</button>`
    )
    .join("");
  return labChrome({
    attr: "data-u5-osi",
    title: U5_OSI_LAB.title,
    brief: U5_OSI_LAB.intro + " לחצו על שכבה. במודל TCP/IP המעשי (חמש שכבות במצגת) שיחה וייצוג מתקפלות ליישום.",
    stage: withCode(
      `<div class="lab-panel"><p class="lab-panel-k">מגדל OSI · 7 למעלה</p><div class="osi-stack">${stack}</div></div>`,
      codePanel(
        "מעטפת הבקשה שהסימולציה ממחישה",
        `${codeLine("7", "GET /grades HTTP/1.1          /* 7 יישום */")}
${codeLine("6", "  TLS record / UTF-8          /* 6 ייצוג */")}
${codeLine("5", "    session id                /* 5 שיחה */")}
${codeLine("4", "      TCP dport=443           /* 4 תובלה */")}
${codeLine("3", "        IP dst=server         /* 3 רשת */")}
${codeLine("2", "          Ethernet / MAC      /* 2 ערוץ */")}
${codeLine("1", "            bits on the wire  /* 1 פיזית */")}
`
      )
    ),
    logAttr: "data-u5osi-fb",
  });
}

function u5SockLabHtml() {
  return labChrome({
    attr: "data-u5-sock",
    title: U5_SOCK_LAB.title,
    brief: U5_SOCK_LAB.intro + " שרת: socket→bind→listen→accept. לקוח: socket→htons→connect. htons במבחן: סדר בתים של הרשת לפורט.",
    stage: withCode(
      `<div class="mem-cols">
      <div class="mem-col lab-panel"><p class="lab-panel-k">שרת</p><div data-u5-srv></div></div>
      <div class="mem-col lab-panel"><p class="lab-panel-k">לקוח</p><div data-u5-cli></div></div>
    </div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `${codeLine("srv0", "int s = socket(AF_INET, SOCK_STREAM, 0);")}
${codeLine("srv1", "setsockopt(s, SOL_SOCKET, SO_REUSEADDR, ...);")}
${codeLine("srv2", "bind(s, &amp;addr, sizeof addr);")}
${codeLine("srv3", "listen(s, backlog);")}
${codeLine("srv4", "int cfd = accept(s, ...);")}
${codeLine("srv5", "read / send על cfd;")}
${codeLine("cli0", "int c = socket(AF_INET, SOCK_STREAM, 0);")}
${codeLine("cli1", "serv.sin_port = htons(PORT);")}
${codeLine("cli2", "connect(c, &amp;serv, sizeof serv);")}
${codeLine("cli3", "send(c, buf, n, 0);")}
${codeLine("cli4", "recv(c, buf, n, 0);")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-u5s="srv">צעד שרת</button>
      <button type="button" class="primary" data-u5s="cli">צעד לקוח</button>
      <button type="button" class="primary" data-u5s="reset">איפוס</button>`,
    logAttr: "data-u5s-fb",
    ready: "שרת: socket → bind → listen → accept. לקוח: socket → htons → connect. אפשר accept לפני connect.",
  });
}

function u5RaceLabHtml() {
  return labChrome({
    attr: "data-u5-race",
    title: U5_RACE_LAB.title,
    brief: U5_RACE_LAB.intro + " כל צעד בלי מנעול הוא שלב אחד: קריאה, +10, כתיבה. שזרו א→ב→א כדי לראות עדכון שאבד. עם mutex כל חוט מוסיף 10 בבת אחת.",
    stage: withCode(
      `<div class="race-board">
      <div class="lab-panel">
        <p class="lab-panel-k">חוט א</p>
        <div class="step-line" data-race-sa="0">1. read g_value → reg</div>
        <div class="step-line" data-race-sa="1">2. reg += 10</div>
        <div class="step-line" data-race-sa="2">3. write g_value</div>
        <div class="race-lane"><span></span><i data-race-a></i></div>
      </div>
      <div class="lab-panel shared-cell">
        <p class="lab-panel-k">זיכרון משותף</p>
        <div class="shared-val" data-u5-gv>0</div>
        <p class="muted">g_value · צפוי עם mutex: 20</p>
      </div>
      <div class="lab-panel">
        <p class="lab-panel-k">חוט ב</p>
        <div class="step-line" data-race-sb="0">1. read g_value → reg</div>
        <div class="step-line" data-race-sb="1">2. reg += 10</div>
        <div class="step-line" data-race-sb="2">3. write g_value</div>
        <div class="race-lane"><span></span><i data-race-b></i></div>
      </div>
    </div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `int g_value = 0;
${codeLine("free", "g_value += 10;   // קריאה-שינוי-כתיבה, לא אטומי")}
${codeLine("lock", "{")}
${codeLine("lock", "  std::lock_guard&lt;std::mutex&gt; lk(m);")}
${codeLine("lock", "  g_value += 10;  // הקטע הקריטי נעול")}
${codeLine("lock", "}")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-u5r="free1">צעד א בלי מנעול</button>
      <button type="button" class="primary" data-u5r="free2">צעד ב בלי מנעול</button>
      <button type="button" class="primary" data-u5r="lock1">א עם mutex (+10)</button>
      <button type="button" class="primary" data-u5r="lock2">ב עם mutex (+10)</button>
      <button type="button" class="primary" data-u5r="reset">איפוס</button>`,
    logAttr: "data-u5r-fb",
    ready: "g_value = 0. נסו שזירה: א, ב, א, ב, א, ב — שניהם קוראים 0 וכותבים 10. אחר כך אפסו ונסו mutex.",
  });
}

function u6WebLabHtml() {
  return labChrome({
    attr: "data-u6-web",
    title: U6_WEB_LAB.title,
    brief: U6_WEB_LAB.intro + " בחרו מצב שרת וראו מה רץ בצד השני של הבקשה.",
    stage: withCode(
      `<div class="web-stage">
      <div class="web-end" data-web-end="cli">דפדפן</div>
      <div class="http-wire"><span class="http-pkt" data-u6-pkt>HTTP</span></div>
      <div class="web-end" data-web-end="srv">שרת</div>
    </div>`,
      codePanel(
        "הקוד / הפרוטוקול שהסימולציה ממחישה",
        `${codeLine("static", "GET /index.html HTTP/1.1     # מיפוי לנתיב קובץ")}
${codeLine("cgi", "qs = os.environ['QUERY_STRING']  # נתון, לא פקודה")}
${codeLine("app", "# יישום: מושב + תבנית + בסיס נתונים")}
${codeLine("get", "GET  /page?id=3     POST  body")}
${codeLine("cookie", "Cookie: sid=&lt;random&gt;   # לא admin=true")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-u6w="static">סטטי</button>
      <button type="button" class="primary" data-u6w="cgi">CGI</button>
      <button type="button" class="primary" data-u6w="app">יישום רשת</button>
      <button type="button" class="primary" data-u6w="get">GET מול POST</button>
      <button type="button" class="primary" data-u6w="cookie">עוגיה</button>`,
    logAttr: "data-u6w-fb",
  });
}

function u6IsoLabHtml() {
  return labChrome({
    attr: "data-u6-iso",
    title: U6_ISO_LAB.title,
    brief: U6_ISO_LAB.intro + " השוו תהליך חשוף, sandbox, container ו-VM לפי מה שנשבר אם הקוד זדוני.",
    stage: withCode(
      `<div class="iso-pair compact">
      <div class="iso-bldg" data-iso-vis="vm"><span class="iso-roof">VM</span><span class="iso-floor">ליבה מדומה נפרדת</span></div>
      <div class="iso-bldg ct" data-iso-vis="ct"><span class="iso-roof">container</span><span class="iso-floor warn-floor">ליבה משותפת</span></div>
    </div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `${codeLine("exec", "exec(user_src)     # פגיע: המחרוזת היא קוד")}
${codeLine("sand", "# sandbox: תהליך + הרשאות + מכסות")}
${codeLine("ct", "# container: namespaces, ליבה משותפת")}
${codeLine("vm", "# VM: hypervisor, ליבה נפרדת לאורח")}
${codeLine("raw", "# בלי בידוד: הקוד רואה את קבצי השרת")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-u6i="raw">תהליך בלי בידוד</button>
      <button type="button" class="primary" data-u6i="exec">exec במפרש</button>
      <button type="button" class="primary" data-u6i="sand">Sandbox</button>
      <button type="button" class="primary" data-u6i="ct">container</button>
      <button type="button" class="primary" data-u6i="vm">VM + hypervisor</button>`,
    logAttr: "data-u6i-fb",
  });
}

function u6TruLabHtml() {
  return labChrome({
    attr: "data-u6-tru",
    title: U6_TRU_LAB.title,
    brief: U6_TRU_LAB.intro + " לחצו על מודל פריסה וראו איפה גבול האמון שלכם נגמר.",
    stage: codePanel(
      "המודל שהסימולציה ממחישה",
      `${codeLine("saas", "# SaaS: יישום מוכן; אתם מנהלים משתמשים ותוכן")}
${codeLine("paas", "# PaaS: מעלים קוד; הספק מנהל OS וריצה")}
${codeLine("iaas", "# IaaS: אתם מתקינים ומעדכנים OS")}
${codeLine("comp", "# מהדר מקוון: אתם מארחים קוד זר → sandbox")}
${codeLine("deep", "# Deep web: לא באינדקס (לא פשיעה)")}
${codeLine("tor", "# Tor: שלושה ממסרים; יציאה רואה יעד בלי HTTPS")}
`
    ),
    actions: `<button type="button" class="primary" data-u6t="saas">SaaS</button>
      <button type="button" class="primary" data-u6t="paas">PaaS</button>
      <button type="button" class="primary" data-u6t="iaas">IaaS</button>
      <button type="button" class="primary" data-u6t="comp">מהדר מקוון</button>
      <button type="button" class="primary" data-u6t="deep">Deep web</button>
      <button type="button" class="primary" data-u6t="tor">Tor</button>`,
    logAttr: "data-u6t-fb",
  });
}

function u7SqlLabHtml() {
  return labChrome({
    attr: "data-u7-sql",
    title: U7_SQL_LAB.title,
    brief: U7_SQL_LAB.intro + " השוו מה המנוע מקבל: משפט אחד מעורבב, או תבנית קבועה + ערך.",
    stage: withCode(
      `<div class="sql-pair">
      <div class="sql-pipe bad-pipe" data-sql-vis="concat">שרשור / format — הקלט נכנס לתחביר</div>
      <div class="sql-pipe ok-pipe" data-sql-vis="param">תבנית עם <code>?</code> — הקלט נקשר כערך</div>
    </div>
    <div class="sql-engine" data-sql-engine>engine waiting…</div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `${codeLine("concat", "cur.execute(\"SELECT … WHERE name = '\" + name + \"'\")")}
${codeLine("fmt", "cur.execute(\"… name = '{}'\".format(name))")}
${codeLine("param", "cur.execute(\"SELECT … WHERE name = ?\", (name,))")}
${codeLine("ident", "# שם טבלה: לא ? — רק whitelist בקוד")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-u7s="concat">שרשור למחרוזת</button>
      <button type="button" class="primary" data-u7s="fmt">format / f-string</button>
      <button type="button" class="primary" data-u7s="param">שאילתה פרמטרית</button>
      <button type="button" class="primary" data-u7s="ident">שם טבלה מהמשתמש</button>`,
    logAttr: "data-u7s-fb",
  });
}

function u7LangLabHtml() {
  return labChrome({
    attr: "data-u7-lang",
    title: U7_LANG_LAB.title,
    brief: U7_LANG_LAB.intro + " כל כפתור הוא תת-שפה. הזרקה פוגעת ב-CIA שונה בכל אחת.",
    stage: withCode(
      `<div class="lang-grid">
      <div class="lang-chip" data-lang-vis="dql">DQL · סודיות</div>
      <div class="lang-chip" data-lang-vis="dml">DML · שלמות</div>
      <div class="lang-chip" data-lang-vis="ddl">DDL · מבנה</div>
      <div class="lang-chip" data-lang-vis="dcl">DCL · הרשאות</div>
    </div>`,
      codePanel(
        "הקוד שהסימולציה ממחישה",
        `${codeLine("dql", "SELECT firstname FROM Students WHERE id = ?")}
${codeLine("dml", "INSERT INTO messages (id, body) VALUES (?, ?)")}
${codeLine("ddl", "CREATE TABLE IF NOT EXISTS messages (id INTEGER, body TEXT)")}
${codeLine("dcl", "GRANT SELECT ON Students TO reader;  /* ב-SQLite: הרשאת הקובץ */")}
`
      )
    ),
    actions: `<button type="button" class="primary" data-u7d="dql">SELECT</button>
      <button type="button" class="primary" data-u7d="dml">INSERT</button>
      <button type="button" class="primary" data-u7d="ddl">CREATE TABLE</button>
      <button type="button" class="primary" data-u7d="dcl">GRANT</button>`,
    logAttr: "data-u7d-fb",
  });
}

function u7ClnLabHtml() {
  return labChrome({
    attr: "data-u7-cln",
    title: U7_CLN_LAB.title,
    brief: U7_CLN_LAB.intro + " עיקרון אחד בכל לחיצה — איך הוא מונע הדבקת SQL מועתקת.",
    stage: codePanel(
      "הקוד שהסימולציה ממחישה",
      `${codeLine("kiss", "if day &lt; 1 or day &gt; 7: return  # טווח, לא קיצור")}
${codeLine("dry", "def find_student(sid):")}
${codeLine("dry", "    cur.execute(\"SELECT … WHERE id = ?\", (sid,))")}
${codeLine("arrow", "if not sid: return          # יציאה מוקדמת")}
${codeLine("name", "sid = form[\"id\"]           # לא x — השם מסגיר קלט")}
`
    ),
    actions: `<button type="button" class="primary" data-u7c="kiss">KISS</button>
      <button type="button" class="primary" data-u7c="dry">DRY</button>
      <button type="button" class="primary" data-u7c="arrow">קוד חץ</button>
      <button type="button" class="primary" data-u7c="name">שייום</button>`,
    logAttr: "data-u7c-fb",
  });
}

function labByName(name) {
  if (name === "tree") {
    return labChrome({
      attr: "data-tree-lab",
      title: THREAT_TREE.title,
      brief: THREAT_TREE.intro + " פתחו ענפים עד לעלה ובחרו אפחות שסוגרת את הנתיב.",
      stage: withCode(
        `<div class="lab-panel"><p class="lab-panel-k">העץ</p>${treeHtml(THREAT_TREE.root)}</div>`,
        codePanel(
          "מה העץ מתאר",
          `# עץ איומים (Threat Tree)
# שורש: מטרת התוקף
# ענף: דרך להגיע למטרה
# עלה + אפחות: הנתיב נסגר
# עלה בלי אפחות: נתיב פתוח`
        )
      ),
      log: false,
    });
  }
  const map = {
    risk: riskLabHtml,
    mem: memLabHtml,
    copy: copyLabHtml,
    ov: ovLabHtml,
    int: intLabHtml,
    uaf: uafLabHtml,
    pyalias: pyAliasLabHtml,
    pyeval: pyEvalLabHtml,
    osi: u5OsiLabHtml,
    sock: u5SockLabHtml,
    race: u5RaceLabHtml,
    u6web: u6WebLabHtml,
    u6iso: u6IsoLabHtml,
    u6tru: u6TruLabHtml,
    u7sql: u7SqlLabHtml,
    u7lang: u7LangLabHtml,
    u7cln: u7ClnLabHtml,
  };
  const fn = map[name];
  return fn ? fn() : "";
}

function attachAfterSection(spec, usedLabs, usedQuizzes) {
  if (!spec) return "";
  let html = "";
  (spec.viz || []).forEach((k) => {
    html += window.vizHtml ? window.vizHtml(k) : "";
  });
  (spec.labs || []).forEach((k) => {
    usedLabs.add(k);
    html += labByName(k);
  });
  (spec.quizzes || []).forEach((qid) => {
    const q = findQuiz(qid);
    if (!q) return;
    usedQuizzes.add(qid);
    html += quizBlock(q);
  });
  return html;
}

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
  const usedLabs = new Set();
  const usedQuizzes = new Set();
  const attach = window.SECTION_ATTACH || {};
  const sections = u.sections
    .map((s) => {
      const extra = attachAfterSection(attach[s.id], usedLabs, usedQuizzes);
      return `<section class="section" id="${esc(s.id)}"><div class="box-head"><h2>${esc(s.title)}</h2>${editLink("section:" + id + ":" + s.id, s.title)}</div>${s.html}</section>${extra}`;
    })
    .join("");
  const leftoverLabs = ((window.UNIT_LAB_KEYS || {})[id] || [])
    .filter((k) => !usedLabs.has(k))
    .map(labByName)
    .join("");
  const leftoverQs = quizzesFor(id)
    .filter((q) => !usedQuizzes.has(q.id))
    .map(quizBlock)
    .join("");
  const more = leftoverQs
    ? `<section class="section" id="more-practice"><h2>עוד תרגול</h2>${leftoverQs}</section>`
    : "";
  const meta = COURSE.units.find((x) => x.id === id);
  const base = `#/course/${COURSE.id}`;
  const rail = [
    `<a href="${base}/learn/${u.id}" data-rail="unit-goals" class="is-current">מה נלמד ביחידה זו</a>`,
    ...u.sections.map((s) => `<a href="${base}/learn/${u.id}" data-rail="${esc(s.id)}">${esc(s.title)}</a>`),
    more ? `<a href="${base}/learn/${u.id}" data-rail="more-practice">עוד תרגול</a>` : "",
  ].join("");
  const idx = COURSE.units.findIndex((x) => x.id === id);
  const prev = COURSE.units[idx - 1];
  const next = COURSE.units[idx + 1];
  const pager = `<nav class="pager" aria-label="מעבר בין יחידות">
      ${
        prev && prev.status === "ready"
          ? `<a class="pager-prev" href="${base}/learn/${prev.id}"><span>יחידה קודמת</span><strong>${esc(prev.title)}</strong></a>`
          : "<span></span>"
      }
      ${
        next && next.status === "ready"
          ? `<a class="pager-next" href="${base}/learn/${next.id}"><span>יחידה הבאה</span><strong>${esc(next.title)}</strong></a>`
          : "<span></span>"
      }
    </nav>`;
  return shell(`
    <p class="back-row"><a class="back" href="${base}/learn">כל היחידות</a></p>
    <header class="unit-head">
      <p class="eyebrow">יחידה ${u.id}</p>
      <div class="box-head"><h1>${esc(u.title)}</h1>${editLink("unit:" + u.id, u.title)}</div>
      ${meta && meta.blurb ? `<p class="muted lead">${esc(meta.blurb)}</p>` : ""}
    </header>
    <div class="read">
      <aside class="rail" aria-label="פרקי היחידה">
        <p class="rail-kicker">בתוך היחידה</p>
        <nav>${rail}</nav>
        <a class="rail-summary" href="${base}/summary/u/${u.id}">לסיכום היחידה</a>
      </aside>
      <div class="read-main">
        <section class="section" id="unit-goals">
          <div class="box-head"><h2>מה נלמד ביחידה זו</h2>${editLink("unit:" + u.id, "מטרות היחידה")}</div>
          <ul class="goals">${u.goals.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>
        </section>
        ${sections}
        ${leftoverLabs}
        ${more}
        ${pager}
      </div>
    </div>
  `);
}

let summaryUnit = "all";
let summaryKind = "all";

function cardsPlacement() {
  return localStorage.getItem("cs-summary-cards") === "page" ? "page" : "after";
}

function setCardsPlacement(value) {
  localStorage.setItem("cs-summary-cards", value);
}

function cardArticle(c) {
  const extra = (window.SUMMARY_DETAIL || {})[c.id];
  const more = extra ? `<p class="card-detail">${esc(extra)}</p>` : "";
  return `<article class="card card-rich"><p class="kind">${esc(c.kind)}</p><div class="box-head"><h2><bdi>${esc(c.title)}</bdi></h2>${editLink("card:" + c.id, c.title)}</div><p>${esc(c.body)}</p>${more}</article>`;
}

function cardsForUnit(unitId) {
  return SUMMARY_CARDS.filter((c) => {
    const unitOk = !unitId || c.unit === unitId;
    const kindOk = summaryKind === "all" || c.kind === summaryKind;
    return unitOk && kindOk;
  });
}

function cardsBlock(unitId, heading) {
  const cards = cardsForUnit(unitId);
  if (!cards.length) return "";
  const title = heading || `כרטיסיות · יחידה ${unitId}`;
  return `<section class="cards-chapter" id="cards-${unitId}">
    <h2 class="cards-chapter-title">${title}</h2>
    <div class="grid grid-cards">${cards.map(cardArticle).join("")}</div>
  </section>`;
}

function summaryCardsHtml() {
  const units = [...new Set(SUMMARY_CARDS.map((c) => c.unit))];
  const filtered = summaryUnit === "all" ? units : units.filter((u) => u === summaryUnit);
  return filtered.map((u) => cardsBlock(u)).join("");
}

function kindFiltersHtml() {
  const kinds = [
    ["all", "הכל"],
    ["הגדרה", "הגדרות"],
    ["טריק", "טריקים"],
    ["מלכודת", "מלכודות"],
    ["לזכור", "לזכור"],
  ];
  return kinds
    .map(([k, label]) => {
      const active = summaryKind === k ? " active" : "";
      return `<button type="button" class="${active.trim()}" data-kind="${k}">${label}</button>`;
    })
    .join("");
}

function unitFiltersHtml() {
  return ["all", "1", "2", "3", "4", "5", "6", "7"]
    .map((u) => {
      const label = u === "all" ? "כל היחידות" : "יחידה " + u;
      const active = summaryUnit === u ? " active" : "";
      return `<button type="button" class="${active.trim()}" data-unit-filter="${u}">${label}</button>`;
    })
    .join("");
}

function proseChapter(ch) {
  const parts = ch.parts
    .map((p) => {
      const markId = "summary:" + ch.unit + ":" + p.id;
      const on = window.CSProgress && CSProgress.hasBookmark(markId);
      return `<section class="prose-part" id="sum-${esc(ch.unit)}-${esc(p.id)}">
        <div class="prose-part-head">
          <h3>${esc(p.title)}</h3>
          <span class="prose-part-actions">${editLink("summary:" + ch.unit + ":" + p.id, p.title)}<button type="button" class="ghost-btn bookmark-btn${on ? " is-on" : ""}" data-bookmark="${esc(markId)}">${on ? "סומן לחזרה" : "סימנייה לחזרה"}</button></span>
        </div>
        ${p.html}
      </section>`;
    })
    .join("");
  const after = cardsPlacement() === "after" ? cardsBlock(ch.unit, `כרטיסיות ליחידה ${ch.unit}`) : "";
  return `<article class="prose-chapter" id="sum-${esc(ch.unit)}">
    <div class="box-head"><h2>${esc(ch.title)}</h2>${editLink("summary:" + ch.unit, ch.title)}</div>
    <p class="lead">${esc(ch.intro)}</p>
    ${parts}
    ${after}
  </article>`;
}

function summaryTocHtml(r) {
  const base = `#/course/${COURSE.id}/summary`;
  const place = cardsPlacement();
  const chapters = (window.SUMMARY_PROSE || [])
    .map((ch) => {
      const kids = ch.parts
        .map((p) => `<li><a href="${base}/u/${ch.unit}/${p.id}">${esc(p.title)}</a></li>`)
        .join("");
      return `<li>
        <a href="${base}/u/${ch.unit}">${esc(ch.title)}</a>
        <ul>${kids}</ul>
      </li>`;
    })
    .join("");
  return `
    <p class="toc-label">תצוגת כרטיסיות</p>
    <label class="toc-choice"><input type="radio" name="cards-place" data-cards-place="after" ${place === "after" ? "checked" : ""}> אחרי הסיכום של כל פרק</label>
    <label class="toc-choice"><input type="radio" name="cards-place" data-cards-place="page" ${place === "page" ? "checked" : ""}> עמוד נפרד לכל הכרטיסיות</label>
    <p class="toc-links">
      <a href="${base}">סיכומים רציפים</a>
      <a href="${base}/cards"${r.summaryCardsPage ? ' class="is-current"' : ""}>כל הכרטיסיות</a>
      <a href="${base}/flip"${r.summaryFlip ? ' class="is-current"' : ""}>דפדוף</a>
    </p>
    <p class="toc-label">פרקים ותתי־פרקים</p>
    <ul class="toc-tree">${chapters}</ul>
  `;
}

function renderSummary() {
  const r = parseRoute();
  const base = `#/course/${COURSE.id}`;
  const place = cardsPlacement();
  const onCards = r.summaryCardsPage;
  const prose = (window.SUMMARY_PROSE || []).map(proseChapter).join("");
  const cardsOnly = `
    <h1>כרטיסיות סיכום</h1>
    <p class="muted">כל כרטיסיה: הגדרה קצרה ואז הסבר שמחבר לשימוש במבחן ובקוד. הפרדה לפי יחידה.</p>
    <div class="filter-row">${unitFiltersHtml()}</div>
    <div class="filter-row" id="sum-filters">${kindFiltersHtml()}</div>
    <div id="sum-grid">${summaryCardsHtml()}</div>
  `;
  const readPage = `
    <h1>סיכום החומר</h1>
    <p class="muted">${
      place === "after"
        ? "לכל פרק יש טקסט רציף עם המושגים, ואחריו הכרטיסיות של אותו פרק. אפשר להעביר את הכרטיסיות לעמוד נפרד מהסרגל."
        : "כאן הסיכומים הרציפים. הכרטיסיות בעמוד נפרד — פתחו את הסרגל או לחצו כל הכרטיסיות."
    }</p>
    <p class="to-cards"><a href="${base}/summary/flip">כרטיסיות לדפדוף</a></p>
    ${prose}
    ${place === "page" ? `<p class="to-cards"><a href="${base}/summary/cards">לכל הכרטיסיות →</a></p>` : ""}
  `;
  return shell(`
    <button type="button" class="toc-fab" data-toc-toggle>ניווט בסיכום</button>
    <div class="toc-backdrop" data-toc-close hidden></div>
    <aside class="toc-drawer" id="sum-toc" hidden>
      <div class="toc-head">
        <strong>סיכום</strong>
        <button type="button" class="toc-x" data-toc-close aria-label="סגירה">×</button>
      </div>
      ${summaryTocHtml(r)}
    </aside>
    <p><a href="${base}">← חזרה לקורס</a></p>
    ${onCards ? cardsOnly : readPage}
  `);
}

function scrollSummaryFocus() {
  const r = parseRoute();
  if (r.area !== "summary" || r.summaryCardsPage) return;
  let id = null;
  if (r.summaryFocusUnit && r.summaryFocusPart) id = `sum-${r.summaryFocusUnit}-${r.summaryFocusPart}`;
  else if (r.summaryFocusUnit) id = `sum-${r.summaryFocusUnit}`;
  const el = id && document.getElementById(id);
  if (el) el.scrollIntoView({ block: "start" });
}

function drillHubHtml() {
  const base = `#/course/${COURSE.id}`;
  const wrong = getProgress().wrong.length;
  const total = allQuizzes().length;
  const units = COURSE.units
    .map((u) => {
      const n = allQuizzes().filter((q) => q.unit === u.id).length;
      if (!n) return "";
      return `<option value="${u.id}">יחידה ${u.id} · ${esc(u.title)} (${n})</option>`;
    })
    .join("");
  const review =
    wrong > 0
      ? `<button type="button" class="ghost-btn" data-start-review>חזרה על טעויות (${wrong})</button>`
      : `<p class="muted">תשובה שגויה, כאן או בתוך יחידה, נשמרת לחזרה.</p>`;
  return `<section class="drill-setup-card">
    <h2>סבב שאלות</h2>
    <p class="muted">שאלות מהיחידות ומחוברת ההכנה, כולל שאלות פתוחות. ${total} שאלות. אחרי בחירה רואים מיד אם זה נכון. בשאלה פתוחה מציגים פתרון.</p>
    <form class="drill-setup" data-drill-setup>
      <label>יחידה
        <select name="unit">
          <option value="all">כל היחידות (${total})</option>
          ${units}
        </select>
      </label>
      <label>כמות
        <select name="count">
          <option value="5">5</option>
          <option value="10" selected>10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </label>
      <button class="primary" type="submit">התחלת סבב</button>
    </form>
    <p class="drill-review">${review} <a href="${base}/summary/flip">לכרטיסיות</a></p>
  </section>`;
}

function renderRound(mode) {
  const base = `#/course/${COURSE.id}`;
  let round = loadRound();
  if (!round || round.mode !== mode) {
    if (mode === "review") {
      const ids = shuffle(allQuizzes().filter((q) => getProgress().wrong.includes(q.id)).map((q) => q.id));
      round = { ids: ids, index: 0, picked: {}, mode: "review", unit: "wrong" };
      saveRound(round);
    } else {
      return shell(`
        <p class="back-row"><a class="back" href="${base}/practice">לתרגול</a></p>
        <h1>סבב שאלות</h1>
        <p>בחרו יחידה וכמות בעמוד התרגול, ואז מתחיל הסבב.</p>
        <p><a href="${base}/practice">חזרה לתרגול</a></p>
      `);
    }
  }
  const title = mode === "review" ? "חזרה על טעויות" : "סבב שאלות";
  if (!round.ids.length) {
    return shell(`
      <p class="back-row"><a class="back" href="${base}/practice">לתרגול</a></p>
      <h1>${title}</h1>
      <p>אין שאלות בערימה. תשובה שגויה בתרגול או בתוך יחידה תופיע כאן.</p>
    `);
  }
  if (round.index >= round.ids.length) {
    const graded = round.ids.filter((id) => {
      const item = findQuiz(id);
      return item && item.kind !== "open";
    });
    const good = graded.filter((id) => round.picked[id] === findQuiz(id).answer).length;
    const openN = round.ids.length - graded.length;
    const left = getProgress().wrong.length;
    return shell(`
      <p class="back-row"><a class="back" href="${base}/practice">לתרגול</a></p>
      <h1>סוף הסבב</h1>
      <p class="drill-score">${good} תשובות נכונות מתוך ${graded.length}.</p>
      <p class="muted">${openN ? openN + " שאלות פתוחות עם פתרון. " : ""}${left ? "בערימת הטעויות נשארו " + left + " שאלות." : "ערימת הטעויות ריקה."}</p>
      <p class="drill-end">
        <a class="primary-link" href="${base}/practice">סבב חדש</a>
        ${left ? `<button type="button" class="ghost-btn" data-start-review>חזרה על מה שנשאר</button>` : ""}
      </p>
    `);
  }
  const q = findQuiz(round.ids[round.index]);
  if (!q) {
    round.index += 1;
    saveRound(round);
    return renderRound(mode);
  }
  const nextLabel = round.index + 1 === round.ids.length ? "סיום" : "השאלה הבאה";
  const unitName = COURSE.units.find((u) => u.id === q.unit);
  const kindLabel = q.kind === "open" ? " · פתוחה" : "";
  let body = "";
  if (q.kind === "open") {
    const shown = !!(round.revealed || {})[q.id];
    body = `
      <h1>${questionBuiltByAi(q) ? aiBubble() : ""}${esc(q.title || "שאלה פתוחה")}</h1>
      <p>${esc(q.prompt)}</p>
      ${foldHtml("💡 רמז לפתרון", practiceHintHtml(q))}
      <button type="button" class="ghost-btn" data-drill-reveal ${shown ? "hidden" : ""}>הצגת פתרון</button>
      <div class="panel prep-solution" ${shown ? "" : "hidden"}>
        ${foldHtml((answerBuiltByAi(q) ? aiBubble() : "") + "פתרון מפורט ודרך חישוב", q.solution || "<p>אין פתרון שמור.</p>")}
        ${q.note ? `<p class="feedback ok">${esc(q.note)}</p>` : ""}
      </div>
      <button type="button" class="primary" data-drill-next ${shown ? "" : "hidden"}>${nextLabel}</button>`;
  } else {
    const picked = round.picked[q.id];
    const opts = (q.options || [])
      .map((o) => {
        const mark = picked ? (o.id === q.answer ? " correct" : o.id === picked ? " wrong" : "") : "";
        const dis = picked ? " disabled" : "";
        return `<button type="button" class="option${mark}" data-drill-choice="${o.id}"${dis}>${esc(o.text)}</button>`;
      })
      .join("");
    const fb = picked
      ? `<p class="feedback ${picked === q.answer ? "ok" : "bad"}">${picked === q.answer ? "נכון." : "לא נכון."}</p>
        ${foldHtml((answerBuiltByAi(q) ? aiBubble() : "") + "פתרון מפורט ודרך חישוב", practiceSolutionHtml(q))}`
      : `<p class="feedback" hidden></p>`;
    body = `
      <h1>${questionBuiltByAi(q) ? aiBubble() : ""}${esc(q.prompt)} ${editLink(quizContentId(q.id), "השאלה")}</h1>
      ${opts}
      ${foldHtml("💡 רמז לפתרון", practiceHintHtml(q))}
      ${fb}
      <button type="button" class="primary" data-drill-next ${picked ? "" : "hidden"}>${nextLabel}</button>`;
  }
  return shell(`
    <p class="back-row"><a class="back" href="${base}/practice">לתרגול</a></p>
    <p class="drill-meta">שאלה ${round.index + 1} מתוך ${round.ids.length}${unitName ? " · יחידה " + unitName.id : ""}${kindLabel}</p>
    <section class="drill" data-drill>
      ${body}
    </section>
  `);
}

function examById(id) {
  return (window.EXAM_SIMS || []).find((e) => e.id === id) || null;
}

function loadExamRun() {
  try {
    return JSON.parse(sessionStorage.getItem("cs-exam-run") || "");
  } catch (err) {
    return null;
  }
}

function saveExamRun(run) {
  sessionStorage.setItem("cs-exam-run", JSON.stringify(run));
}

function startExam(id) {
  const exam = examById(id);
  if (!exam) return;
  saveExamRun({
    id: id,
    started: Date.now(),
    answers: {},
    picks: {},
    finished: false,
  });
  location.hash = `#/course/${COURSE.id}/practice/exam/${id}`;
}

function finishExam() {
  const run = loadExamRun();
  if (!run) return;
  run.finished = true;
  run.ended = Date.now();
  saveExamRun(run);
  location.hash = `#/course/${COURSE.id}/practice/exam/${run.id}/review`;
}

function examRemainMs(exam, run) {
  const limit = (exam.minutes || 180) * 60 * 1000;
  const end = (run.started || Date.now()) + limit;
  return Math.max(0, end - Date.now());
}

function fmtClock(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h + ":" + String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
}

function mountExamClock() {
  if (window.__examClock) {
    clearInterval(window.__examClock);
    window.__examClock = null;
  }
  const el = app.querySelector("[data-exam-clock]");
  if (!el) return;
  const tick = () => {
    const r = parseRoute();
    const exam = examById(r.examId);
    const run = loadExamRun();
    if (!exam || !run || run.finished) return;
    const left = examRemainMs(exam, run);
    el.textContent = "נשארו " + fmtClock(left);
    if (left <= 0) finishExam();
  };
  tick();
  window.__examClock = setInterval(tick, 1000);
}

function foldHtml(summary, html) {
  return `<details class="fold"><summary>${summary}</summary><div class="fold-body">${html}</div></details>`;
}

function practiceQuestionText(q) {
  return `${q.title || ""} ${q.prompt || ""}`.toLowerCase();
}

function practiceHintHtml(q) {
  if (q.hint) return q.hint;
  const text = practiceQuestionText(q);
  const hints = [
    [/לכידות|cohesion/, "בדקו אם כל רכיבי המחלקה משרתים אחריות אחת ברורה, או אוסף משימות שאינן קשורות זו לזו."],
    [/צמידות|coupling/, "חשבו כמה המחלקה צריכה לדעת על פרטי המימוש של מחלקות אחרות, ומה יקרה אם הפרטים האלה ישתנו."],
    [/אין שחזור|לא זכור|הסעיף ריק/, "אין נוסח שאלה אמין במקור, ולכן אין דרך להסיק דרישות או פתרון בלי להמציא תוכן."],
    [/sql|sqlite|שאילתה|insert|primary key/, "הפרידו בין מבנה פקודת ה-SQL לבין הערכים, ובדקו אילו אילוצים קובעים אם שורה תתקבל."],
    [/sandbox|ארגז חול|קוד של לקוח|\bexec\b/, "מנו את המשאבים וההרשאות שקוד לא מוכר צריך לאבד, ואז ציינו מה קורה אם שכבת הבידוד עצמה פגיעה."],
    [/מפתח ציבורי|מפתח סימטרי|הצפנ|תעודה|certificate/, "השוו את העלות והתפקיד של הצפנה אסימטרית וסימטרית, והסבירו כיצד אימות זהות מונע החלפת מפתח בדרך."],
    [/פייתון|מילון|רשימת מילים|מחלקת book|שטח משולש/, "פתרו כל סעיף בנפרד: קודם טרנספורמציית הנתונים, אחר כך מודל המחלקות, ולבסוף קלט/פלט וטיפול בשגיאות."],
    [/חולש|vulnerability|אפחות|mitigation/, "הפרידו בין הפגם שמאפשר חריגה, הפעולה שמנצלת אותו, והגנה שמצמצמת את הנזק."],
    [/vtable|vptr|וירטואל|פולימורפ|מצביע בסיס/, "הפרידו בין הטיפוס הסטטי של המצביע לבין טיפוס האובייקט בפועל, ובדקו אם הפונקציה הוגדרה virtual."],
    [/כלל השלושה|כלל החמישה|בנאי העתקה|אופרטור השמה/, "זהו מי הבעלים של המשאב ומה יקרה בהעתקה, בהשמה ובהשמדה. בדקו גם השמה עצמית."],
    [/חיתוך|slicing|יהלום/, "בדקו אם אובייקט נגזר מועתק לפי ערך לאובייקט בסיס, או אם אותו בסיס מגיע בשני מסלולי ירושה."],
    [/protected/, "השוו גישה מתוך המחלקה ומתוך יורש לגישה של קוד חיצוני שאינו חלק מהיררכיית הירושה."],
    [/by-reference|by-value|לפי הפניה|לפי ערך/, "שאלו אם נוצר עותק חדש, ומה המחיר או אובדן המידע שעלולים להיגרם מהעתקה."],
    [/ipv6/, "השוו לאורך כתובת IPv4, ואז זכרו שכתובת IPv6 נכתבת כשמונה קבוצות של 16 סיביות."],
    [/העמס|overload/, "בדקו אם השפה בוחרת בין כמה חתימות בזמן קומפילציה, או שהגדרה מאוחרת פשוט מחליפה שם קודם."],
    [/copy|העתקה רדודה|העתקה עמוקה/, "בדקו אם הועתקו גם האובייקטים המקוננים, או רק ההפניות אליהם."],
    [/osi|שכבת הייצוג/, "התמקדו בשינוי הייצוג של המידע: קידוד, דחיסה והצפנה — לא ניתוב ולא אמינות תעבורה."],
    [/htons|big-endian|little-endian|סדר בתים/, "פרקו את הערך לבתים והבחינו בין סדר הבתים של המעבד לבין סדר הרשת."],
    [/\bbind\b|inaddr_any|כתובת ip נקובה/, "בדקו לאיזו כתובת מקומית השקע נקשר: ממשק מסוים או כל הממשקים של המחשב."],
    [/aslr|קנרית|canary|dep|nx|חוצץ|strcpy|malloc|calloc|גלישה נומרית|integer overflow/, "עקבו אחרי הגבול או חישוב הגודל, ציינו איזה זיכרון עלול להיפגע, ואז הפרידו בין תיקון השורש לשכבות אפחות."],
    [/סיסמ|ערוץ צדדי|side.channel/, "בדקו אם זמן הריצה או התנהגות אחרת תלויים במיקום התו השגוי ויכולים לחשוף מידע חלקי."],
    [/decorator|מעטפת|wraps|__name__/, "עקבו אחרי האובייקט שהשם המקורי מצביע אליו לאחר העיטוף, ואילו פרטי מטא־נתונים נשמרים."],
    [/selector|socket|שקע|tcp|udp|recv|שרת|לקוח|צ'אנק/, "עברו לפי מחזור החיים של השקע והפרוטוקול: יצירה, קישור או חיבור, מסגור, קריאה/כתיבה וסגירה."],
    [/thread|חוט|atomic|סנכרון|counter/, "פרקו את הפעולה לקריאה, חישוב וכתיבה ובדקו אם חוט אחר יכול להשתלב ביניהן."],
    [/ddos|זמינות/, "בדקו איזו מתכונות האבטחה נפגעת כשמשאב מוצף ולא ניתן עוד שירות למשתמשים לגיטימיים."],
    [/ביטוי משולש|ternary/, "חפשו את שלושת חלקי הביטוי: תנאי, ערך אם אמת וערך אם שקר, ואת סימני הפיסוק שמפרידים ביניהם."],
  ];
  const match = hints.find(([pattern]) => pattern.test(text));
  const fallback =
    q.kind === "open" || q.proposed
      ? "חלקו את התשובה להגדרה, אופן הפעולה ומגבלה או תיקון. עברו שוב על כל דרישה בניסוח השאלה."
      : "בדקו איזו אפשרות מתארת את המנגנון עצמו, ולא רק תוצאה אפשרית או טענה גורפת מדי.";
  return `<p>${esc(match ? match[1] : fallback)}</p>`;
}

function practiceExplanation(q) {
  const text = practiceQuestionText(q);
  const explanations = [
    [/לכידות|cohesion/, "לכידות מתארת עד כמה מרכיבי יחידה תוכנתית משרתים מטרה משותפת. אחריות אחת ברורה מעידה על לכידות גבוהה."],
    [/צמידות|coupling/, "צמידות חלשה מתקבלת כשמחלקות תלויות בממשק יציב ולא בפרטי המימוש זו של זו, ולכן שינוי פנימי אינו מתפשט למערכת."],
    [/חולש|vulnerability/, "חולשת אבטחה היא פגם שמאפשר פעולה שלא תוכננה. ניצול הוא השימוש בפגם, ואפחות היא הגנה שמצמצמת סיכון או נזק."],
    [/אפחות|mitigation/, "אפחות אינה הבטחה שאין באגים; היא שכבת הגנה שמקטינה את הסיכוי לניצול מוצלח או את הנזק ממנו."],
    [/vtable|vptr/, "באובייקט פולימורפי ה-vptr מפנה לטבלה המשותפת למחלקה, והכניסה המתאימה בטבלה קובעת בזמן ריצה את יעד הקריאה הווירטואלית."],
    [/וירטואל|פולימורפ|מצביע בסיס/, "פונקציה וירטואלית נקבעת לפי טיפוס האובייקט בפועל. פונקציה לא־וירטואלית נקבעת לפי הטיפוס הסטטי של המצביע או ההפניה."],
    [/כלל השלושה/, "מחלקה שמנהלת משאב צריכה מפרק, בנאי העתקה ואופרטור השמה עקביים, כדי למנוע העתקה רדודה, דליפה ושחרור כפול."],
    [/חיתוך|slicing/, "בהעתקת אובייקט נגזר לבסיס לפי ערך נשמר רק חלק הבסיס. מצביע או הפניה שומרים את הזהות הדינמית של האובייקט."],
    [/יהלום/, "בירושת יהלום רגילה מתקבלים שני עותקים של הבסיס ונוצרת דו־משמעות. ירושה וירטואלית משאירה עותק בסיס משותף."],
    [/protected/, "חבר protected נגיש למחלקה וליורשיה, אך לא לקוד חיצוני רגיל. הוא אינו ציבורי."],
    [/by-reference|by-value|לפי הפניה|לפי ערך/, "העברה לפי הפניה נמנעת מיצירת עותק ושומרת על האובייקט המלא; const reference גם מונעת שינוי דרך ההפניה."],
    [/ipv6/, "כתובת IPv6 היא באורך 128 סיביות, לעומת 32 סיביות ב-IPv4."],
    [/העמס|overload/, "C++ תומכת בהעמסה לפי חתימות שונות. בפייתון שם חדש באותו תחום מחליף את הקודם, ולכן משתמשים בברירות מחדל או בארגומנטים משתנים."],
    [/copy|העתקה רדודה|העתקה עמוקה/, "list.copy יוצרת רשימה חיצונית חדשה אך משאירה הפניות לאותם אובייקטים פנימיים; שינוי אובייקט מקונן נראה בשתי הרשימות."],
    [/osi|שכבת הייצוג/, "שכבת הייצוג עוסקת באופן ייצוג הנתונים, כגון קידוד, דחיסה והצפנה. ניתוב שייך לשכבת הרשת ואמינות מקצה לקצה לתובלה."],
    [/htons/, "htons ממירה מספר פורט בן 16 סיביות מסדר הבתים של המארח לסדר הרשת, שהוא big-endian."],
    [/\bbind\b|inaddr_any|כתובת ip נקובה/, "bind לכתובת נקובה מאזין רק בממשק המתאים; INADDR_ANY מאפשר קבלה בכל הממשקים המקומיים."],
    [/aslr/, "ASLR מגריל כתובות טעינה ומקשה על שימוש בכתובות צפויות. הוא אינו מתקן את באג הכתיבה ואינו מספיק לבדו."],
    [/dep|nx/, "DEP/NX מונע הרצת קוד באזורי נתונים. הוא אינו מונע את הכתיבה עצמה ואינו חוסם כל שימוש בקוד שכבר קיים."],
    [/קנרית|canary/, "קנרית נבדקת לפני החזרה מפונקציה כדי לזהות דריסה רציפה במחסנית. היא אינה מגינה על כל סוגי השחתת הזיכרון."],
    [/חוצץ|strcpy/, "העתקה שאינה בודקת את קיבולת היעד עלולה לכתוב מעבר לחוצץ. התיקון הוא אימות אורך והעתקה חסומה עם סיום תקין."],
    [/malloc|calloc|גלישה נומרית|integer overflow/, "יש לבדוק את החישוב לפני חיבור או כפל גדלים. עטיפה עלולה לגרום להקצאה קטנה ולאחריה כתיבה לפי הגודל הגדול המקורי."],
    [/סיסמ|ערוץ צדדי|side.channel/, "יציאה בתו השגוי הראשון גורמת לזמן שתלוי באורך הקידומת הנכונה. השוואה בזמן קבוע אינה עוצרת לפי מיקום ההבדל."],
    [/wraps|__name__/, "מעטפת מחליפה את אובייקט הפונקציה שאליו מצביע השם. functools.wraps מעתיקה אליה מטא־נתונים כמו __name__."],
    [/selector/, "selectors מאפשרים ללולאה אחת לטפל באירועי קלט ופלט של כמה שקעים, בלי להקצות חוט או תהליך לכל חיבור."],
    [/htons|socket|שקע|tcp|udp|recv|שרת|לקוח|צ'אנק/, "תקשורת היא זרם או סדרת הודעות, ולכן קריאה אחת אינה מבטיחה הודעה שלמה. צריך מסגור, לולאות קריאה/כתיבה ומגבלות גודל."],
    [/sql|sqlite|שאילתה|insert|primary key/, "מצייני מקום וקשירת ערכים משאירים קלט כנתון ולא כחלק מתחביר SQL. אילוצים כמו PRIMARY KEY מטפלים בכפילויות בנפרד."],
    [/thread|חוט|atomic|סנכרון|counter/, "הגדלה רגילה היא רצף קריאה־שינוי־כתיבה ולא פעולה אטומית. mutex או טיפוס atomic מונעים אובדן עדכונים."],
    [/sandbox|ארגז חול|קוד של לקוח/, "ארגז חול מגביל הרשאות, קבצים, רשת ומשאבים של קוד לא מוכר. הוא מצמצם נזק אך אינו מבטיח שבמנגנון הבידוד אין חולשה."],
    [/ddos|זמינות/, "DDoS מציף משאבים כדי למנוע שירות, ולכן הפגיעה המרכזית היא בזמינות."],
    [/ביטוי משולש|ternary/, "ב-C++ התחביר הוא condition ? value_if_true : value_if_false."],
  ];
  const match = explanations.find(([pattern]) => pattern.test(text));
  return match ? match[1] : "האפשרות הנכונה תואמת את ההגדרה וההתנהגות שנלמדו; שאר האפשרויות מחליפות בין מושגים או מציגות כלל גורף שאינו נכון.";
}

function practiceSolutionHtml(q) {
  if (q.solution) return q.solution;
  const right = ((q.options || []).find((o) => o.id === q.answer) || {}).text || q.answer || "";
  const explanation = q.explain || practiceExplanation(q);
  return `<p><strong>התשובה הנכונה: ${esc(right)}</strong></p><p>${esc(explanation)}</p>`;
}

function examMcqHtml(exam, run, review) {
  return exam.partA
    .map((q) => {
      const picked = (run.answers || {})[q.id];
      const opts = q.options
        .map((o) => {
          let cls = "option";
          if (review) {
            if (o.id === q.answer) cls += " correct";
            else if (o.id === picked) cls += " wrong";
          } else if (picked === o.id) cls += " is-on";
          const dis = review ? " disabled" : "";
          return `<button type="button" class="${cls}" data-exam-a="${q.id}" data-choice="${o.id}"${dis}>${esc(o.text)}</button>`;
        })
        .join("");
      const mark =
        review && picked
          ? picked === q.answer
            ? `<p class="feedback ok">נכון.</p>`
            : `<p class="feedback bad">התשובה הנכונה: ${esc((q.options.find((o) => o.id === q.answer) || {}).text || q.answer)}</p>`
          : review
            ? `<p class="feedback bad">לא נענתה. נכון: ${esc((q.options.find((o) => o.id === q.answer) || {}).text || "")}</p>`
            : "";
      const hint = foldHtml("💡 רמז לפתרון", practiceHintHtml(q));
      const solution = review ? foldHtml((answerBuiltByAi(q, exam) ? aiBubble() : "") + "פתרון מפורט ודרך חישוב", practiceSolutionHtml(q)) : "";
      return `<div class="quiz panel" data-qid="${q.id}">
        <div class="box-head"><p class="exam-prompt">${questionBuiltByAi(q, exam) ? aiBubble() : ""}<strong>${esc(q.prompt)}</strong></p>${editLink("exam:" + exam.id + ":a:" + q.id, "שאלת המבחן")}</div>
        ${q.code ? `<pre class="code exam-code" dir="ltr">${esc(q.code)}</pre>` : ""}
        ${opts}
        ${hint}
        ${mark}
        ${solution}
      </div>`;
    })
    .join("");
}

function examPartBHtml(exam, run, review) {
  const picks = run.picks || {};
  const nPick = Object.keys(picks).filter((k) => picks[k]).length;
  return exam.partB
    .map((q) => {
      const on = !!picks[q.id];
      const pickBtn = review
        ? `<p class="muted">${on ? "נבחרה בחלק ב." : "לא נבחרה — עדיין אפשר לקרוא פתרון."}</p>`
        : `<button type="button" class="ghost-btn${on ? " is-on" : ""}" data-exam-pick="${q.id}">${on ? "הסרה מהבחירה" : "בחירה לחלק ב"}</button>`;
      let sol = "";
      if (review) {
        const kind = q.verdictKind || "new";
        sol = `<div class="exam-sol">
          ${q.hadOfficial ? `<h3>מה היה בפתרון הקיים</h3><p>${esc(q.official)}</p>` : `<h3>אין פתרון רשמי קריא</h3>`}
          ${foldHtml((answerBuiltByAi(q, exam) ? aiBubble() : "") + "פתרון מפורט ודרך חישוב", q.solution || q.proposed || "<p>לא נמצא פתרון מלא במקור.</p>")}
          <p class="verdict ${kind === "ok" ? "ok" : kind === "fix" ? "fix" : "new"}"><strong>חוות דעת:</strong> ${esc(q.verdict)}</p>
        </div>`;
      }
      const hint = foldHtml("💡 רמז לפתרון", practiceHintHtml(q));
      return `<article class="section exam-bq" id="${q.id}">
        <div class="box-head"><h2>${questionBuiltByAi(q, exam) ? aiBubble() : ""}${esc(q.title)}</h2>${editLink("exam:" + exam.id + ":b:" + q.id, q.title)}</div>
        <p class="exam-prompt">${questionBuiltByAi(q, exam) ? aiBubble() : ""}${esc(q.prompt)}</p>
        ${q.code ? `<pre class="code exam-code" dir="ltr">${esc(q.code)}</pre>` : ""}
        ${hint}
        ${pickBtn}
        ${sol}
      </article>`;
    })
    .join("") + (review ? "" : `<p class="muted">בחרו ${exam.pick} שאלות פתוחות (נבחרו ${nPick}).</p>`);
}

function renderExam(exam, review) {
  const base = `#/course/${COURSE.id}/practice`;
  let run = loadExamRun();
  if (!run || run.id !== exam.id) {
    if (review) {
      return shell(`
        <p class="back-row"><a class="back" href="${base}">לתרגול</a></p>
        <h1>${esc(exam.title)} ${editLink("exam:" + exam.id, exam.title)}</h1>
        <p>אין סימולציה פתוחה. התחילו מועד ואז סיימו כדי לראות פתרונות.</p>
        <p><button type="button" class="primary" data-exam-start="${exam.id}">התחלת סימולציה</button></p>
      `);
    }
    run = { id: exam.id, started: Date.now(), answers: {}, picks: {}, finished: false };
    saveExamRun(run);
  }
  if (review || run.finished) {
    if (window.CSProgress) CSProgress.noteExam(exam, run);
    const good = exam.partA.filter((q) => run.answers[q.id] === q.answer).length;
    return shell(`
      <p class="back-row"><a class="back" href="${base}">לתרגול</a></p>
      <p class="eyebrow">סימולציה · בדיקה</p>
      <h1>${esc(exam.title)} ${editLink("exam:" + exam.id, exam.title)}</h1>
      <p class="drill-score">חלק א: ${good} מתוך ${exam.partA.length}.</p>
      <p class="muted">${esc(exam.note)}</p>
      <h2>חלק א</h2>
      ${examMcqHtml(exam, run, true)}
      <h2>חלק ב</h2>
      ${examPartBHtml(exam, run, true)}
      <p class="drill-end"><button type="button" class="primary" data-exam-start="${exam.id}">סימולציה מחדש</button></p>
    `);
  }
  return shell(`
    <p class="back-row"><a class="back" href="${base}">לתרגול</a></p>
    <div class="exam-bar">
      <p class="eyebrow">סימולציה · ${exam.minutes} דקות</p>
      <p class="exam-clock" data-exam-clock></p>
    </div>
    <h1>${esc(exam.title)} ${editLink("exam:" + exam.id, exam.title)}</h1>
    <p class="muted">${esc(exam.note)} חלק א: כולן. חלק ב: בחרו ${exam.pick} מתוך ${exam.partB.length}. הפתרונות נפתחים בסוף — לא תוך כדי.</p>
    <h2>חלק א · רב-ברירה</h2>
    ${examMcqHtml(exam, run, false)}
    <h2>חלק ב · בחרו ${exam.pick}</h2>
    ${examPartBHtml(exam, run, false)}
    <p class="drill-end"><button type="button" class="primary" data-exam-finish>סיום והצגת פתרונות</button></p>
  `);
}

function examHubHtml() {
  const cards = (window.EXAM_SIMS || [])
    .map(
      (e) => `<div class="editable-wrap"><a class="card exam-card" href="#/course/${COURSE.id}/practice/exam/${e.id}">
        <p class="meta">${e.minutes} דק׳ · בחרו ${e.pick} פתוחות</p>
        <h2>${esc(e.title)}</h2>
        <p>${esc(e.note)}</p>
      </a>${editLink("exam:" + e.id, e.title)}</div>`
    )
    .join("");
  return `<section class="section">
    <h2>סימולציות מועד</h2>
    <p class="muted">רק מועדים שמבוססים על מבחן. שעון, חלק א בלי חשיפת תשובה, בחירת שאלות בחלק ב, ואז פתרון.</p>
    <div class="grid exam-grid">${cards}</div>
  </section>`;
}

function renderPractice() {
  const r = parseRoute();
  const view = r.practiceView;
  if (view === "round" || view === "review" || view === "bank") return renderRound(view === "bank" ? "round" : view);
  if (view === "bank") return renderPrepBank();
  if (view === "exam" && r.examId) {
    const exam = examById(r.examId);
    if (!exam) {
      return shell(`
        <p class="back-row"><a class="back" href="#/course/${COURSE.id}/practice">לתרגול</a></p>
        <h1>מועד לא נמצא</h1>
      `);
    }
    return renderExam(exam, r.examReview);
  }
  const exams = (window.EXAM_RECONS || [])
    .map(
      (e) => `<article class="section" id="${e.id}">
        <h2>${e.title}</h2>
        <p class="muted">${e.source}</p>
        ${e.html}
      </article>`
    )
    .join("");
  return shell(`
    <p><a href="#/course/${COURSE.id}">← חזרה לקורס</a></p>
    <h1>תרגול למבחנים</h1>
    ${examHubHtml()}
    ${drillHubHtml()}
    ${exams}
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

const latinPhrase =
  /[A-Za-z][A-Za-z0-9_+#.'’\-]*(?:[ \t]*[\/+,.][ \t]*|[ \t]+)[A-Za-z][A-Za-z0-9_+#.'’\-]*(?:(?:[ \t]*[\/+,.][ \t]*|[ \t]+)[A-Za-z][A-Za-z0-9_+#.'’\-]*)*/g;

function expandLatin(text, start, end) {
  if (start > 0 && text[start - 1] === "(" && text[end] === ")") {
    start -= 1;
    end += 1;
  }
  if (text[start] === "(" && start >= 2 && text[start - 1] === " ") {
    const lead = text.slice(0, start - 1).match(/[A-Za-z][A-Za-z0-9_+#.'’\-]*$/);
    if (lead) start = start - 1 - lead[0].length;
  }
  return [start, end];
}

function isolateLatin(root) {
  if (!root) return;
  const nodes = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || !node.nodeValue) continue;
    if (parent.closest("pre, code, script, style, textarea, input, select, [contenteditable], .banner-editor, .admin-form, .latn, [dir='ltr']")) continue;
    latinPhrase.lastIndex = 0;
    if (latinPhrase.test(node.nodeValue)) nodes.push(node);
  }
  nodes.forEach((textNode) => {
    const text = textNode.nodeValue;
    const ranges = [];
    latinPhrase.lastIndex = 0;
    let match;
    while ((match = latinPhrase.exec(text))) {
      const words = match[0].split(/[^A-Za-z0-9_+#.'’\-]+/).filter(Boolean);
      if (words.every((word) => word.length < 2)) continue;
      let start = match.index;
      let end = start + match[0].length;
      [start, end] = expandLatin(text, start, end);
      const prev = ranges[ranges.length - 1];
      if (prev && start < prev[1]) prev[1] = Math.max(prev[1], end);
      else ranges.push([start, end]);
      if (latinPhrase.lastIndex < end) latinPhrase.lastIndex = end;
    }
    if (!ranges.length) return;
    const frag = document.createDocumentFragment();
    let cursor = 0;
    ranges.forEach(([start, end]) => {
      if (start > cursor) frag.append(text.slice(cursor, start));
      const hold = document.createElement("bdi");
      hold.className = "latn";
      hold.dir = "ltr";
      hold.textContent = text.slice(start, end);
      frag.append(hold);
      cursor = end;
    });
    if (cursor < text.length) frag.append(text.slice(cursor));
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

function watchLatin() {
  if (window.__latinObs) return;
  const obs = new MutationObserver(() => {
    obs.disconnect();
    isolateLatin(app);
    obs.observe(app, { childList: true, subtree: true });
  });
  window.__latinObs = obs;
  obs.observe(app, { childList: true, subtree: true });
}

function enhance() {
  if (railObserver) {
    railObserver.disconnect();
    railObserver = null;
  }
  mountPath();
  mountRail();
  const r = parseRoute();
  if (r.area === "learn" && r.section) {
    const el = document.getElementById(r.section);
    if (el) el.scrollIntoView({ block: "start" });
  }
  const searchInput = app.querySelector("[data-search-input]");
  if (searchInput) searchInput.focus();
  isolateLatin(app);
}

let flipState = { unit: "all", kind: "all", index: 0, back: false, lockId: "" };

function flipDeck() {
  return (window.SUMMARY_CARDS || []).filter((c) => {
    const unitOk = flipState.unit === "all" || c.unit === flipState.unit;
    const kindOk = flipState.kind === "all" || c.kind === flipState.kind;
    return unitOk && kindOk;
  });
}

function syncFlip(r) {
  if (!r.flipCard) return;
  const id = decodeURIComponent(r.flipCard);
  if (flipState.lockId === id) return;
  flipState.unit = "all";
  flipState.kind = "all";
  flipState.back = false;
  const deck = window.SUMMARY_CARDS || [];
  const i = deck.findIndex((c) => c.id === id);
  flipState.index = i >= 0 ? i : 0;
  flipState.lockId = id;
}

function moveFlip(delta) {
  const deck = flipDeck();
  if (!deck.length) return;
  flipState.index = (flipState.index + delta + deck.length) % deck.length;
  flipState.back = false;
  flipState.lockId = "moved";
  const dest = `#/course/${COURSE.id}/summary/flip`;
  if (location.hash !== dest) history.replaceState(null, "", dest);
  showFlip();
}

function showFlip() {
  app.innerHTML = renderFlip();
  const card = app.querySelector("[data-flip]");
  if (card) card.focus();
}

function renderFlip() {
  const base = `#/course/${COURSE.id}`;
  const deck = flipDeck();
  if (deck.length && flipState.index >= deck.length) flipState.index = 0;
  const card = deck[flipState.index];
  const units = ["all", "1", "2", "3", "4", "5", "6", "7"]
    .map((u) => {
      const label = u === "all" ? "כל היחידות" : "יחידה " + u;
      const on = flipState.unit === u ? " active" : "";
      return `<button type="button" class="${on.trim()}" data-flip-unit="${u}">${label}</button>`;
    })
    .join("");
  const kinds = [
    ["all", "הכל"],
    ["הגדרה", "הגדרות"],
    ["טריק", "טריקים"],
    ["מלכודת", "מלכודות"],
    ["לזכור", "לזכור"],
  ]
    .map(([k, label]) => {
      const on = flipState.kind === k ? " active" : "";
      return `<button type="button" class="${on.trim()}" data-flip-kind="${k}">${label}</button>`;
    })
    .join("");
  const face = card
    ? `<button type="button" class="flash-card${flipState.back ? " is-back" : ""}" data-flip>
        <span class="flash-kicker">${flipState.back ? "הסבר" : esc(card.kind) + " · יחידה " + esc(card.unit)}</span>
        <strong>${esc(flipState.back ? card.body : card.title)}</strong>
        <span class="muted">${flipState.back ? "לחצו שוב למושג" : "לחצו להסבר"}</span>
      </button>`
    : `<p>אין כרטיסיות בסינון הזה.</p>`;
  return shell(`
    <p class="back-row"><a class="back" href="${base}/summary">לסיכום</a></p>
    <h1>כרטיסיות</h1>
    <p class="muted">המושג מקדימה, ההסבר מאחורה. רווח או Enter הופכים את הכרטיס. חצים עוברים הלאה ואחורה.</p>
    <div class="filter-row">${units}</div>
    <div class="filter-row">${kinds}</div>
    <div class="flash" data-flash>
      <p class="drill-meta">${deck.length ? flipState.index + 1 + " מתוך " + deck.length : ""}</p>
      ${face}
      <div class="flash-nav">
        <button type="button" class="ghost-btn" data-flip-nav="-1">הקודם</button>
        <button type="button" class="ghost-btn" data-flip-nav="1">הבא</button>
      </div>
    </div>
  `);
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

const printState = {
  selected: new Set(),
  exercises: true,
  hints: false,
  solutions: false,
};

function loadPrintState() {
  try {
    const raw = JSON.parse(sessionStorage.getItem("cs-print") || "");
    if (raw && Array.isArray(raw.selected)) raw.selected.forEach((id) => printState.selected.add(id));
    if (raw && typeof raw.exercises === "boolean") printState.exercises = raw.exercises;
    if (raw && typeof raw.hints === "boolean") printState.hints = raw.hints;
    if (raw && typeof raw.solutions === "boolean") printState.solutions = raw.solutions;
  } catch (err) {
    /* אין בחירה שמורה */
  }
}

function savePrintState() {
  try {
    sessionStorage.setItem(
      "cs-print",
      JSON.stringify({
        selected: [...printState.selected],
        exercises: printState.exercises,
        hints: printState.hints,
        solutions: printState.solutions,
      })
    );
  } catch (err) {
    /* מצב פרטי */
  }
}

function printTree() {
  const units = (COURSE.units || []).map((unit) => {
    const lesson = lessonById(unit.id);
    const children = [{ id: "u" + unit.id + ":goals", label: "מה נלמד ביחידה" }];
    ((lesson && lesson.sections) || []).forEach((section) => {
      children.push({ id: "u" + unit.id + ":s:" + section.id, label: section.title });
    });
    if ((window.SUMMARY_PROSE || []).some((chapter) => chapter.unit === unit.id)) {
      children.push({ id: "u" + unit.id + ":summary", label: "סיכום היחידה" });
    }
    if (quizzesFor(unit.id).length) children.push({ id: "u" + unit.id + ":quiz", label: "תרגילי היחידה" });
    return { id: "u" + unit.id, label: "יחידה " + unit.id + " · " + unit.title, children: children };
  });
  const exams = (window.EXAM_SIMS || []).map((exam) => ({ id: "exam:" + exam.id, label: exam.title }));
  if (exams.length) units.push({ id: "practice", label: "תרגול ומבחנים", children: exams });
  return units;
}

function printNodeById(id, nodes) {
  const list = nodes || printTree();
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id === id) return list[i];
    const found = list[i].children && printNodeById(id, list[i].children);
    if (found) return found;
  }
  return null;
}

function printBranchIds(node, out) {
  out.push(node.id);
  (node.children || []).forEach((child) => printBranchIds(child, out));
}

function printAllIds() {
  const ids = [];
  printTree().forEach((node) => printBranchIds(node, ids));
  return ids;
}

function printTreeHtml(nodes, depth) {
  return (nodes || [])
    .map((node) => {
      const on = printState.selected.has(node.id) ? " checked" : "";
      const kids = node.children ? `<ul class="print-kids">${printTreeHtml(node.children, depth + 1)}</ul>` : "";
      return `<li>
        <label class="print-row"><input type="checkbox" data-print-check="${esc(node.id)}"${on}> <span>${esc(node.label)}</span></label>
        ${kids}
      </li>`;
    })
    .join("");
}

function printQuizHtml(q) {
  const options = (q.options || []).map((opt) => `<li>${esc(opt.text)}</li>`).join("");
  const hintText = practiceHintHtml(q);
  const hint = printState.hints
    ? `<div class="print-extra"><strong>רמז.</strong> ${String(hintText || "").indexOf("<") === 0 ? hintText : "<p>" + esc(hintText) + "</p>"}</div>`
    : "";
  const solution = printState.solutions
    ? `<div class="print-extra"><strong>פתרון.</strong> ${practiceSolutionHtml(q)}</div>`
    : "";
  return `<div class="print-quiz"><p><strong>תרגול.</strong> ${esc(q.prompt)}</p>${options ? `<ul>${options}</ul>` : ""}${hint}${solution}</div>`;
}

function printSectionHtml(unitId, section, usedQuizzes) {
  const spec = (window.SECTION_ATTACH || {})[section.id] || {};
  let figures = "";
  (spec.viz || []).forEach((key) => {
    figures += window.vizHtml ? window.vizHtml(key) : "";
  });
  (spec.labs || []).forEach((key) => {
    figures += labByName(key);
  });
  let quizzes = "";
  if (printState.exercises) {
    (spec.quizzes || []).forEach((qid) => {
      if (usedQuizzes.has(qid)) return;
      const quiz = findQuiz(qid);
      if (!quiz) return;
      usedQuizzes.add(qid);
      quizzes += printQuizHtml(quiz);
    });
  }
  return `<section class="print-block"><h3>${esc(section.title)}</h3>${section.html}<div class="print-static">${figures}</div>${quizzes}</section>`;
}

function printSheetHtml() {
  const selected = printState.selected;
  if (!selected.size) return `<p class="muted">בחרו לפחות אזור אחד.</p>`;
  let html = `<article class="print-sheet" id="print-sheet"><header class="print-cover"><p>${esc(COURSE.code)}</p><h1>${esc(COURSE.name)}</h1></header>`;
  (COURSE.units || []).forEach((unit) => {
    const lesson = lessonById(unit.id);
    const prefix = "u" + unit.id;
    const any =
      selected.has(prefix) ||
      [...selected].some((id) => id.indexOf(prefix + ":") === 0);
    if (!any || !lesson) return;
    html += `<h2>יחידה ${esc(unit.id)} · ${esc(unit.title)}</h2>`;
    if (selected.has(prefix) || selected.has(prefix + ":goals")) {
      html += `<section class="print-block"><h3>מה נלמד ביחידה זו</h3><ul>${(lesson.goals || []).map((goal) => `<li>${esc(goal)}</li>`).join("")}</ul></section>`;
    }
    const usedQuizzes = new Set();
    (lesson.sections || []).forEach((section) => {
      if (selected.has(prefix) || selected.has(prefix + ":s:" + section.id)) html += printSectionHtml(unit.id, section, usedQuizzes);
    });
    if (selected.has(prefix) || selected.has(prefix + ":summary")) {
      const chapter = (window.SUMMARY_PROSE || []).find((item) => item.unit === unit.id);
      if (chapter) {
        html += `<section class="print-block"><h3>${esc(chapter.title)}</h3><p>${esc(chapter.intro || "")}</p>`;
        (chapter.parts || []).forEach((part) => {
          html += `<h4>${esc(part.title)}</h4>${part.html}`;
        });
        html += `</section>`;
      }
    }
    if (printState.exercises && (selected.has(prefix) || selected.has(prefix + ":quiz"))) {
      quizzesFor(unit.id).forEach((quiz) => {
        if (usedQuizzes.has(quiz.id)) return;
        usedQuizzes.add(quiz.id);
        html += printQuizHtml(quiz);
      });
    }
  });
  (window.EXAM_SIMS || []).forEach((exam) => {
    if (!selected.has("practice") && !selected.has("exam:" + exam.id)) return;
    html += `<h2>${esc(exam.title)}</h2>`;
    (exam.partA || []).forEach((quiz) => {
      html += printQuizHtml(quiz);
    });
    (exam.partB || []).forEach((quiz) => {
      html += `<section class="print-block"><h3>${esc(quiz.title || "")}</h3><p>${esc(quiz.prompt || "")}</p>`;
      if (printState.solutions) {
        html += `<div class="print-extra">${quiz.solution || quiz.proposed || ""}</div>`;
      }
      html += `</section>`;
    });
  });
  html += `</article>`;
  return html;
}

function renderPrintPage() {
  loadPrintState();
  const checked = (key) => (printState[key] ? " checked" : "");
  return `<div class="print-setup">
    <p class="back-row"><a class="back" href="#/">לדף הבית</a></p>
    <h1>בחירת טווחים להדפסה</h1>
    <p class="muted">סמנו אזורים בעץ. תרשימים שבתוכן נכנסים להדפסה. המחשה עם אנימציה מוחלפת בתרשים הסטטי שלה, כולל המצבים שהלחיצה חושפת.</p>
    <div class="print-actions">
      <button type="button" class="ghost-btn" data-print-all>סימון הכל</button>
      <button type="button" class="ghost-btn" data-print-clear>ניקוי הבחירה</button>
    </div>
    <ul class="print-tree">${printTreeHtml(printTree(), 0)}</ul>
    <fieldset class="print-options">
      <legend>מה לכלול בתרגילים</legend>
      <label class="check-line"><input type="checkbox" data-print-opt="exercises"${checked("exercises")}> תרגילים</label>
      <label class="check-line"><input type="checkbox" data-print-opt="hints"${checked("hints")}> רמזים</label>
      <label class="check-line"><input type="checkbox" data-print-opt="solutions"${checked("solutions")}> פתרונות</label>
    </fieldset>
    <p><button type="button" class="primary" data-print-go>הדפסה</button></p>
  </div>
  <div class="print-sheet-host" data-print-host hidden></div>`;
}

function runRangePrint() {
  const host = document.querySelector("[data-print-host]");
  if (!host) return;
  if (!printState.selected.size) {
    window.alert("בחרו לפחות אזור אחד להדפסה.");
    return;
  }
  host.innerHTML = printSheetHtml();
  host.hidden = false;
  document.body.classList.add("is-range-print");
  window.print();
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
  } else if (r.area === "practice") {
    app.innerHTML = renderPractice();
    mountExamClock();
  } else {
    app.innerHTML = renderHub();
  }
  enhance();
}

const pyAlias = { fruit: ["banana", "apple", "cherry"], vegs: null, linked: false };

function renderPyAlias() {
  const f = app.querySelector("[data-py-fruit]");
  const v = app.querySelector("[data-py-vegs]");
  if (!f) return;
  f.innerHTML = `<div class="slot ok">${pyAlias.fruit.join(", ")}</div>`;
  if (pyAlias.vegs == null) v.innerHTML = `<p class="muted">עדיין לא שויך</p>`;
  else {
    const shown = pyAlias.linked ? pyAlias.fruit : pyAlias.vegs;
    v.innerHTML = `<div class="slot ${pyAlias.linked ? "linked" : "ok"}">${shown.join(", ")}${
      pyAlias.linked ? " · אותו אובייקט (is)" : " · עותק (copy)"
    }</div>`;
  }
}

function resetUnit4Labs() {
  pyAlias.fruit = ["banana", "apple", "cherry"];
  pyAlias.vegs = null;
  pyAlias.linked = false;
  renderPyAlias();
}

const u5sock = { srv: 0, cli: 0 };
const U5_SRV = ["socket()", "setsockopt (reuse)", "bind", "listen(backlog)", "accept → שקע שיחה", "read / send"];
const U5_CLI = ["socket()", "htons + inet_pton", "connect", "send", "read / recv"];

function renderU5Sock() {
  const s = app.querySelector("[data-u5-srv]");
  const c = app.querySelector("[data-u5-cli]");
  if (!s) return;
  function col(n, steps) {
    if (n === 0) return `<p class="muted">עדיין לא התחיל</p>`;
    return steps
      .slice(0, n)
      .map((t, i) => `<div class="slot ${i === n - 1 ? "ok" : ""}">${t}</div>`)
      .join("");
  }
  s.innerHTML = col(u5sock.srv, U5_SRV);
  c.innerHTML = col(u5sock.cli, U5_CLI);
  const ids = [];
  if (u5sock.srv > 0) ids.push("srv" + Math.min(u5sock.srv - 1, 5));
  if (u5sock.cli > 0) ids.push("cli" + Math.min(u5sock.cli - 1, 4));
  markCodeLines("[data-u5-sock]", ids);
}

const u5race = { v: 0, a: 0, b: 0, locA: 0, locB: 0, lockA: false, lockB: false };

function renderU5Race() {
  const el = app.querySelector("[data-u5-gv]");
  if (el) el.textContent = String(u5race.v);
  const a = app.querySelector("[data-race-a]");
  const b = app.querySelector("[data-race-b]");
  const pct = (ph) => (ph <= 0 ? "12%" : ph === 1 ? "40%" : ph === 2 ? "70%" : "92%");
  if (a) {
    a.style.width = pct(u5race.a);
    a.classList.toggle("go", u5race.a > 0);
    a.classList.toggle("locked", u5race.lockA);
  }
  if (b) {
    b.style.width = pct(u5race.b);
    b.classList.toggle("go", u5race.b > 0);
    b.classList.toggle("locked", u5race.lockB);
  }
  app.querySelectorAll("[data-race-sa]").forEach((n) => {
    const i = Number(n.getAttribute("data-race-sa"));
    n.classList.toggle("on", u5race.a === i + 1 || (u5race.lockA && i === 2));
  });
  app.querySelectorAll("[data-race-sb]").forEach((n) => {
    const i = Number(n.getAttribute("data-race-sb"));
    n.classList.toggle("on", u5race.b === i + 1 || (u5race.lockB && i === 2));
  });
  const raceMark = u5race.lockA || u5race.lockB ? "lock" : u5race.a || u5race.b ? "free" : null;
  markCodeLines("[data-u5-race]", raceMark);
}

function resetU5Sock() {
  u5sock.srv = 0;
  u5sock.cli = 0;
  renderU5Sock();
}

function resetU5Race() {
  u5race.v = 0;
  u5race.a = 0;
  u5race.b = 0;
  u5race.locA = 0;
  u5race.locB = 0;
  u5race.lockA = false;
  u5race.lockB = false;
  renderU5Race();
}

function resetUnit5Labs() {
  resetU5Sock();
  resetU5Race();
}
const uafState = { live: null, pAlive: false };
const ovState = { bytes: 0, canaryOn: true };
const memState = { locals: [], pointers: [], heaps: [], next: 1 };

function renderOvSlots() {
  const el = app.querySelector("[data-ov-slots]");
  if (!el) return;
  const b = ovState.bytes;
  const canaryOn = ovState.canaryOn;
  const retStart = canaryOn ? 24 : 20;
  function fill(start, size) {
    if (b <= start) return "";
    const n = Math.min(b, start + size) - start;
    return "A".repeat(Math.max(0, n));
  }
  const ebpHit = b > 16;
  const canaryHit = canaryOn && b > 20;
  const retHit = b > retStart;
  const stopped = canaryOn && canaryHit;
  el.innerHTML = `
    <p class="muted">נכתבו ${b} בתים · קנרית ${canaryOn ? "דולקת" : "כבויה"} · כתובות נמוכות למעלה</p>
    <div class="slot ${b > 0 ? "ok" : ""}"><span dir="ltr">buf[0..3]</span> · ${fill(0, 4) || "·"}</div>
    <div class="slot ${b > 4 ? "ok" : ""}"><span dir="ltr">buf[4..7]</span> · ${fill(4, 4) || "·"}</div>
    <div class="slot ${b > 8 ? "ok" : ""}"><span dir="ltr">buf[8..11]</span> · ${fill(8, 4) || "·"}</div>
    <div class="slot ${b > 12 ? "ok" : ""}"><span dir="ltr">buf[12..15]</span> · ${fill(12, 4) || "·"}</div>
    <div class="slot ${ebpHit ? "dead" : ""}">EBP שמור · ${ebpHit ? fill(16, 4) : "ערך תקין"}</div>
    <div class="slot ${canaryOn ? (canaryHit ? "dead" : "ok") : ""}">${
      canaryOn ? "קנרית · " + (canaryHit ? "נדרסה" : "שלמה") : "אין קנרית במסגרת הזו"
    }</div>
    <div class="slot ${retHit ? "dead" : "ok"}">כתובת חזרה · ${
      retHit ? (stopped ? "הייתה נדרסת, אבל הקנרית כבר נשברה — התהליך נעצר לפני ret" : "נדרסה") : "תקינה"
    }</div>
  `;
}

function renderUafSlots() {
  const p = app.querySelector("[data-uaf-p]");
  const h = app.querySelector("[data-uaf-heap]");
  if (!p) return;
  p.innerHTML = uafState.pAlive
    ? `<div class="slot ${uafState.live === "A" ? "ok" : "dead"}">p → בלוק (חושב שזה A)</div>`
    : `<p class="muted">אין מצביע</p>`;
  if (!uafState.live) h.innerHTML = `<p class="muted">אין בלוק חי</p>`;
  else if (uafState.live === "A") h.innerHTML = `<div class="slot ok">בלוק עם נתוני A</div>`;
  else h.innerHTML = `<div class="slot ok">בלוק עם נתוני B (אותה כתובת ממוחזרת)</div>`;
}

function resetUnit3Labs() {
  ovState.bytes = 0;
  ovState.canaryOn = true;
  uafState.live = null;
  uafState.pAlive = false;
  renderOvSlots();
  renderUafSlots();
}
const copyState = { mode: null, heapA: "block-A", heapB: null, deadA: false };

function renderMemSlots() {
  const stackEl = app.querySelector("[data-mem-stack]");
  const heapEl = app.querySelector("[data-mem-heap]");
  if (!stackEl) return;
  const stackBits = [
    ...memState.locals.map((x) => `<div class="slot ok">int x${x} — מקומי</div>`),
    ...memState.pointers.map((p) => {
      const live = memState.heaps.includes(p.heap);
      return `<div class="slot ${live ? "ok" : "dead"}">int* p${p.id} → ${live ? p.heap : "כתובת מתה"}</div>`;
    }),
  ];
  stackEl.innerHTML = stackBits.join("") || `<p class="muted">ריק</p>`;
  heapEl.innerHTML =
    memState.heaps.map((h) => `<div class="slot ok">${h} (new int)</div>`).join("") ||
    `<p class="muted">ריק</p>`;
}

function resetMemOnly() {
  memState.locals = [];
  memState.pointers = [];
  memState.heaps = [];
  memState.next = 1;
  renderMemSlots();
}

function resetCopyOnly() {
  copyState.mode = null;
  copyState.heapA = "block-A";
  copyState.heapB = null;
  copyState.deadA = false;
  renderCopySlots();
}

function resetMemLab() {
  resetMemOnly();
  resetCopyOnly();
}

function renderCopySlots() {
  const a = app.querySelector("[data-copy-a]");
  const b = app.querySelector("[data-copy-b]");
  if (!a) return;
  a.innerHTML = copyState.deadA
    ? `<div class="slot dead">ptr → ${copyState.heapA} (שוחרר)</div>`
    : `<div class="slot ok">ptr → ${copyState.heapA}</div>`;
  if (!copyState.mode) {
    b.innerHTML = `<p class="muted">עדיין לא הועתק</p>`;
    return;
  }
  if (copyState.mode === "shallow") {
    b.innerHTML = copyState.deadA
      ? `<div class="slot dead">ptr → ${copyState.heapA} (אותו בלוק, כבר מת)</div>`
      : `<div class="slot ok">ptr → ${copyState.heapA} (אותו בלוק כמו a)</div>`;
  } else {
    b.innerHTML = `<div class="slot ok">ptr → ${copyState.heapB} (בלוק עצמאי)</div>`;
  }
}

const vizState = { plates: 3, wrap: 30 };
const PLATE_LABELS = ["main", "foo", "bar", "baz"];

function showSide(stageSel, k) {
  const stage = app.querySelector(stageSel);
  if (!stage) return;
  stage.classList.add("has-side");
  stage.querySelectorAll("[data-side]").forEach((el) => {
    const show = el.getAttribute("data-side") === k;
    el.hidden = !show;
    if (show) {
      el.classList.remove("is-in");
      void el.offsetWidth;
      el.classList.add("is-in");
    }
  });
}

function setVizFb(key, text, cls) {
  const fb = app.querySelector(`[data-viz-fb="${key}"]`);
  if (!fb) return;
  fb.className = "viz-fb " + (cls || "muted");
  fb.textContent = text;
}

function renderPlates() {
  const rack = app.querySelector("[data-plate-rack]");
  if (!rack) return;
  const n = vizState.plates;
  rack.innerHTML = PLATE_LABELS.slice(0, n)
    .map((name, i) => {
      const top = i === n - 1;
      const label = top ? name + " · מסגרת עליונה" : name;
      return `<div class="plate ${top ? "on-top" : ""}" data-plate="${n - 1 - i}">${label}</div>`;
    })
    .join("");
}

function handleVizClick(btn) {
  const kind = btn.getAttribute("data-viz");
  const k = btn.getAttribute("data-viz-k");
  if (kind === "cia") {
    const msg = {
      c: "סודיות (Confidentiality): מידע מגיע למי שאין לו רשות. דוגמה: לוג עם סיסמאות, או תשובת SQL שמחזירה יותר שורות.",
      i: "שלמות (Integrity): שינוי בלי הרשאה. דוגמה: סכום בחשבון, או UPDATE שהזרקה הרחיבה.",
      a: "זמינות (Availability): השירות לא עומד בעומס או נופל. דוגמה: הצפת בקשות לכספומט / שרת.",
    };
    app.querySelectorAll(".cia-node").forEach((n) => {
      const on = n === btn;
      n.classList.toggle("on", on);
      n.setAttribute("aria-pressed", on ? "true" : "false");
    });
    showSide("[data-cia-stage]", k);
    setVizFb("cia", msg[k] || "", "ok");
    return true;
  }
  if (kind === "layers") {
    const msg = {
      d: "תכנון: מי רשאי ומה מוסתר. בתרשים + ציבורי, − פרטי, # מוגן. טעות כאן חוזרת בכל המימוש.",
      i: "מימוש: ארבעה תאים, והחמישי נעצר בשער. כאן נשברות רוב דוגמאות היחידות 3–4.",
      o: "הפעלה: מסך נעול, עדכון, ומי שמסתכל. שכבה שבורח ממנה לא אמורה להפיל את השאר.",
    };
    app.querySelectorAll(".layer-row").forEach((n) => {
      const on = n === btn;
      n.classList.toggle("on", on);
      n.setAttribute("aria-pressed", on ? "true" : "false");
    });
    showSide("[data-layer-stage]", k);
    setVizFb("layers", msg[k] || "", "ok");
    return true;
  }
  if (kind === "trust-play") {
    const row = app.querySelector("[data-trust-draw]");
    if (row) {
      row.classList.remove("play");
      void row.offsetWidth;
      row.classList.add("play");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const pulse = row.querySelector(".pulse");
      const anim = row.querySelector("animate");
      if (reduce && pulse) pulse.setAttribute("cx", "50");
      else if (anim && typeof anim.beginElement === "function") anim.beginElement();
    }
    setVizFb("trust", "הנקודה רצה מ־A אל C. אם B מעביר בלי בדיקה — הסדק מגיע לנתונים.", "ok");
    return true;
  }
  if (kind === "threat") {
    const msg = {
      root: "השורש הוא המטרה: גניבת תשלום. מתחתיו דרכים, לא רשימת באגים.",
      enc: "עיגול: לערוץ כבר יש אפחות — הצפנה. העלה הזה סגור.",
      auth: "מלבן: הרשאת יתר עדיין פתוחה. אין על העלה הזה אפחות.",
      lib: "עיגול: עדכון הספרייה סוגר חוליה רחוקה בשרשרת האמון.",
    };
    app.querySelectorAll(".t-node").forEach((n) => {
      const on = n === btn;
      n.classList.toggle("on", on);
      n.setAttribute("aria-pressed", on ? "true" : "false");
    });
    setVizFb("tree", msg[k] || "", k === "auth" ? "bad" : "ok");
    return true;
  }
  if (kind === "ptr") {
    const house = app.querySelector("[data-ptr-house]");
    const mail = app.querySelector("[data-ptr-mail]");
    if (house) house.classList.remove("gone");
    if (mail) mail.classList.remove("empty", "glow");
    if (k === "addr") {
      if (mail) mail.classList.add("glow");
      setVizFb("ptr", "p שומר כתובת, כמו מספר בית על המעטפה — לא את הבית עצמו.", "ok");
    } else if (k === "deref") {
      if (house) house.classList.add("glow");
      setVizFb("ptr", "*p קורא את תוכן הבית. הבית חייב להתקיים; אחרת זו גישה לא חוקית.", "ok");
    } else {
      if (mail) mail.classList.add("empty");
      if (house) house.classList.add("gone");
      setVizFb("ptr", "nullptr: מעטפה בלי כתובת. אסור לדפוק בדלת — לא קוראים ולא כותבים דרכו.", "bad");
    }
    return true;
  }
  if (kind === "plates") {
    if (k === "push" && vizState.plates < PLATE_LABELS.length) vizState.plates += 1;
    if (k === "pop" && vizState.plates > 1) vizState.plates -= 1;
    renderPlates();
    setVizFb(
      "plates",
      k === "push"
        ? "נוספה מסגרת למעלה. המקומיים של הקודמת נשארים מתחת עד שתחזור."
        : "חזרה: המסגרת העליונה יורדת. LIFO — אחרון שנכנס, ראשון שיוצא.",
      "ok"
    );
    return true;
  }
  if (kind === "canary") {
    const stack = app.querySelector("[data-canary-stack]");
    if (stack) {
      stack.classList.remove("is-ok", "is-spill");
      void stack.offsetWidth;
      stack.classList.add(k === "ok" ? "is-ok" : "is-spill");
    }
    setVizFb(
      "canary",
      k === "ok"
        ? "העותק תואם את הקנרית במסגרת. מותר לחזור אל main."
        : "הגלישה ירדה מהחוצץ ושינתה את הקנרית. הבדיקה נכשלת לפני ret. זו אפחות — הכתיבה עצמה כבר קרתה.",
      k === "ok" ? "ok" : "bad"
    );
    return true;
  }
  if (kind === "chain") {
    const msg = {
      bug: "באג: התוכנית לא עושה מה שהתכוונו. רוב הבאגים אינם חולשת אבטחה.",
      vuln: "חולשה: יש פתח לפעולה שלא הותרה. רוב החולשות הן באגים, לא כולן.",
      use: "ניצול: מישהו משתמש בפתח. כאן מזהים את הפתח, בלי לבנות ניצול.",
      mit: "אפחות: מצמצמים סיכוי או נזק. קנרית, למשל, לא מוחקת את הבאג.",
    };
    app.querySelectorAll(".term-flow .pic-btn").forEach((n) => n.classList.toggle("on", n === btn));
    setVizFb("chain", msg[k] || "", "ok");
    return true;
  }
  if (kind === "isa") {
    app.querySelectorAll(".isa-row .pic-btn").forEach((n) => n.classList.toggle("on", n === btn));
    setVizFb(
      "isa",
      k === "isa"
        ? "תפוח הוא סוג של פרי: ירושה. אפשר לשים תפוח במקום שמצפים לפרי, לפי החוזה."
        : "לבית יש חלון: החלון הוא חלק, לא הורה. זו הכלה — שדה בתוך האובייקט.",
      "ok"
    );
    return true;
  }
  if (kind === "spill") {
    const cup = app.querySelector("[data-cup]");
    if (cup) {
      cup.classList.remove("is-fit", "is-over");
      void cup.offsetWidth;
      cup.classList.add(k === "over" ? "is-over" : "is-fit");
    }
    setVizFb(
      "spill",
      k === "over"
        ? "ארבעה תאים התמלאו, והעודף נשפך אל השכן. על המחסנית השכן יכול להיות כתובת חזרה."
        : "הכמות שווה לכוס. השכן נשאר נקי. זו בדיקת הגבול שצריכה לקרות לפני ההעתקה.",
      k === "over" ? "bad" : "ok"
    );
    return true;
  }
  if (kind === "guards") {
    const msg = {
      aslr: "ASLR: אותה תוכנית עולה בכתובת אחרת בכל הרצה. אין כתובת קבועה לשנן. גלישה עדיין יכולה לקרות.",
      dep: "DEP: דפי נתונים, כולל המחסנית, לא מסומנים לביצוע. אי אפשר להריץ את מה שנשפך לחוצץ כאילו הוא קוד.",
      cet: "CET: מחסנית צל שומרת את כתובת החזרה המקורית. ב-ret משווים. אם המחסנית הרגילה הושחתה והצל לא — עוצרים.",
    };
    app.querySelectorAll(".guard-grid .pic-btn").forEach((n) => n.classList.toggle("on", n === btn));
    setVizFb("guards", msg[k] || "", "ok");
    return true;
  }
  if (kind === "gil") {
    const box = app.querySelector("[data-gil-box]");
    const a = app.querySelector('[data-gil-t="a"]');
    const b = app.querySelector('[data-gil-t="b"]');
    const onA = a && a.classList.contains("on");
    if (a && b) {
      a.classList.toggle("on", !onA);
      b.classList.toggle("on", onA);
    }
    if (box) box.classList.toggle("swapped", onA);
    setVizFb(
      "gil",
      "המנעול עבר חוט. עדיין רק אחד מריץ bytecode. השני יכול לחכות לקלט או לרשת.",
      "ok"
    );
    return true;
  }
  if (kind === "lane") {
    const lane = app.querySelector("[data-lane]");
    if (lane) {
      lane.classList.remove("is-mitm", "is-replay");
      void lane.offsetWidth;
      lane.classList.add(k === "replay" ? "is-replay" : "is-mitm");
    }
    setVizFb(
      "lane",
      k === "replay"
        ? "ההודעה הייתה חוקית, ועכשיו משודרת שוב. אפחות: nonce, מונה או חלון זמן. הצפנה לבדה לא תמיד מספיקה."
        : "גורם על הנתיב קורא או משנה. אפחות: ערוץ מוצפן ובדיקת תעודה מול סמכות סרטיפיקטים.",
      k === "replay" ? "ok" : "bad"
    );
    return true;
  }
  if (kind === "evalv") {
    app.querySelectorAll(".door").forEach((d) => d.classList.toggle("on", d === btn));
    setVizFb(
      "evalv",
      k === "eval"
        ? "הדלת נפתחת והמחרוזת רצה כפייתון. try לא נועל אותה."
        : "הדלת נפתחת למספר. המחרוזת נשארת נתון, אחרי בדיקה.",
      k === "eval" ? "bad" : "ok"
    );
    return true;
  }
  if (kind === "tcpudp") {
    app.querySelectorAll(".track").forEach((n) => n.classList.toggle("on", n === btn));
    setVizFb(
      "tcpudp",
      k === "tcp"
        ? "TCP: זרם בתים עם אישור וסדר. send אחד יכול להתפצל ב-recv — מגדירים מסגור."
        : "UDP: כל מנה עצמאית. יכולה ללכת לאיבוד או להגיע לא בסדר. אין חיבור כמו ב־TCP.",
      "ok"
    );
    return true;
  }
  if (kind === "http") {
    const pkt = app.querySelector("[data-http-pkt]");
    const ticket = app.querySelector("[data-ticket]");
    if (k === "get" && pkt) {
      pkt.textContent = "GET /";
      pkt.classList.remove("fly");
      void pkt.offsetWidth;
      pkt.classList.add("fly");
      setTimeout(() => {
        if (pkt) pkt.textContent = "200 OK";
      }, 700);
      setVizFb("http", "בקשה הולכת לשרת וחוזרת תשובה. בלי עוגיה השרת לא זוכר מי אתם בין בקשות.", "ok");
    } else if (k === "cookie") {
      if (ticket) ticket.classList.add("stamped");
      if (pkt) pkt.textContent = "Cookie: sid=…";
      setVizFb("http", "הלקוח מחזיר כרטיס. מי שמחזיק אותו נראה כמו המשתמש — לכן HTTPS וערך אקראי, לא admin=true.", "ok");
    }
    return true;
  }
  if (kind === "vmct") {
    app.querySelectorAll(".iso-bldg").forEach((n) => n.classList.toggle("on", n === btn));
    setVizFb(
      "vmct",
      k === "vm"
        ? "VM: hypervisor מדמה חומרה; לאורח יש ליבה משלו. כבד יותר, בידוד חזק יותר מול באג בליבת המארח."
        : "Container: namespaces על ליבה אחת. קל וזול; באג בליבה משותף לכל המכולות על המארח.",
      "ok"
    );
    return true;
  }
  if (kind === "sqlv") {
    app.querySelectorAll(".sql-pipe").forEach((n) => n.classList.toggle("on", n === btn));
    setVizFb(
      "sqlv",
      k === "concat"
        ? "הקלט נדבק למשפט. המנוע מפרסר תחביר אחד — זו הזרקת SQL. format זה אותו רעיון."
        : "התבנית קבועה עם ?. הערך נקשר בנפרד ונשאר נתון. לא לשמות טבלה — רק לערכים.",
      k === "concat" ? "bad" : "ok"
    );
    return true;
  }
  if (kind === "wrap") {
    vizState.wrap += 40;
    if (vizState.wrap > 100) vizState.wrap = 12;
    const bar = app.querySelector("[data-wrap-bar]");
    if (bar) {
      bar.style.width = vizState.wrap + "%";
      bar.classList.toggle("wrapped", vizState.wrap < 20);
    }
    setVizFb(
      "wrap",
      vizState.wrap < 20
        ? "עברתם את התקרה — המונה התקפל למספר קטן. הקצאה לפי n*size תהיה קצרה מדי."
        : "עוד מוסיפים. השלם לא נעצר בתקרה — הוא מתקפל.",
      vizState.wrap < 20 ? "bad" : "ok"
    );
    return true;
  }
  if (kind === "usecase") {
    const fig = app.querySelector("[data-usecase]");
    if (fig) {
      fig.classList.remove("is-pass", "is-drive", "is-edge");
      fig.classList.add("is-on", "is-" + k);
    }
    const msg = {
      pass: "הנוסע מחוץ למלבן, והקו שלו מגיע אל בקשת נסיעה ואל הרשמה.",
      drive: "הנהג מחוץ למלבן, והקו שלו מגיע אל הצעת נסיעה.",
      edge: "הדמות היא שחקן: מחוץ לגבול המערכת. האליפסה היא תרחיש בתוך הגבול.",
    };
    setVizFb("usecase", msg[k] || "", "ok");
    return true;
  }
  if (kind === "uml") {
    const fig = app.querySelector("[data-uml]");
    if (fig) {
      fig.classList.remove("is-box", "is-gen", "is-comp", "is-face");
      fig.classList.add("is-on", "is-" + k);
    }
    const msg = {
      box: "שלושה תאים: שם, שדות עם טיפוס, מתודות. + ציבורי, − פרטי, # מוגן. setSeats בודקת טווח כי seats פרטי.",
      gen: "קו רצוף ומשולש חלול שפונה אל User. Passenger הוא User: ירושה, is-a.",
      comp: "מעוין מלא על Ride והסימון 1 ליד Route: אובייקט אחד. 0..* ליד Passenger: אוסף בלי תקרה. vehicle : Vehicle הוא אותו יחס has-a בתוך המלבן.",
      face: "קו מקווקו ומשולש חלול שפונה אל Payable. Ride מתחייבת ל־pay, בלי לרשת את הממשק.",
    };
    setVizFb("uml", msg[k] || "", "ok");
    return true;
  }
  if (kind === "dfd") {
    const fig = app.querySelector("[data-dfd]");
    if (fig) fig.classList.add("is-cross");
    setVizFb("dfd", "פרטי תשלום חוצים את הקו המקווקו. שם בודקים הצפנה, אימות, והודעת שגיאה זהירה.", "ok");
    return true;
  }
  if (kind === "reactor") {
    const fig = app.querySelector("[data-reactor]");
    if (fig) {
      fig.classList.remove("is-many", "is-one");
      void fig.offsetWidth;
      fig.classList.add(k === "one" ? "is-one" : "is-many");
      const anim = fig.querySelector("animate");
      if (k === "one" && anim && typeof anim.beginElement === "function") {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) fig.querySelector(".wake").setAttribute("cx", "468");
        else anim.beginElement();
      }
    }
    setVizFb(
      "reactor",
      k === "one"
        ? "תהליך אחד מאזין לערוצים ומתעורר רק כשיש קלט. זו תקרת העומס של Reactor, וביחידה 5 אותו רעיון ב־Selector."
        : "תהליך נפרד לכל לקוח. בלי תקרה זה צומח עם מספר החיבורים.",
      "ok"
    );
    return true;
  }
  return false;
}

app.addEventListener("click", async (e) => {
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
  fb.innerHTML = (answerBuiltByAi(q) ? aiBubble() : "") + esc(q.explain);
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
  route();
  watchLatin();
}
boot();
