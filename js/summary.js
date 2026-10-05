/* סיכום, כרטיסיות והערות למדריך. נטען לפני app.js. */

var summaryUnit = "all";
var summaryKind = "all";

function cardsPlacement() {
  return localStorage.getItem("cs-summary-cards") === "page" ? "page" : "after";
}

function setCardsPlacement(value) {
  localStorage.setItem("cs-summary-cards", value);
}

function cardArticle(c) {
  const extra = (window.SUMMARY_DETAIL || {})[c.id];
  const more = extra ? `<div class="card-detail study-text">${studyRich(extra)}</div>` : "";
  return `<article class="card card-rich"><p class="kind">${esc(c.kind)}</p><div class="box-head"><h2><bdi>${esc(c.title)}</bdi></h2>${editLink("card:" + c.id, c.title)}</div><div class="study-text">${studyRich(c.body)}</div>${more}</article>`;
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
var flipState = { unit: "all", kind: "all", index: 0, back: false, lockId: "" };

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

function renderGuideNotes() {
  const notes = window.STUDY_GUIDE_NOTES || [];
  let html = `<p class="back-row"><a class="back" href="#/course/${COURSE.id}">לקורס</a></p>`;
  html += `<h1>הערות למדריך הלמידה</h1>`;
  html += `<p class="muted">ריכוז הערות ו"צ'יט-שיטים" מומלצים לכתיבה במדריך הלמידה הרשמי לקראת המבחן.</p>`;
  
    html += `
    <div class="panel quiz is-bad" style="background-color: var(--bad-bg); border-color: var(--bad); padding: 15px; margin-bottom: 25px; border-radius: 12px; box-shadow: var(--shadow-sm);">
      <h3 style="margin-top:0; color: var(--bad); display:flex; align-items:center; gap:8px;">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        שימו לב - הנחיות למבחן
      </h3>
      <p style="margin-bottom:0; color: var(--ink);">
        חובה על הסטודנט לבדוק מול צוות הקורס אם מותר להכניס את מדריך הלמידה עם הערות למבחן בסמסטר הנוכחי, ומה היקף ההערות שמותר לכתוב במדריך. בנוסף, ההערות כאן הן בגדר המלצה - מומלץ מאוד לעבור על המדריך באופן עצמאי ולחשוב אילו הערות נוספות כדאי לכם להוסיף.
      </p>
    </div>
    `;

    html += `<div class="guide-notes-list">`;
  
  notes.forEach((note) => {
    html += `<div class="panel quiz">
      <div class="box-head"><h2>יחידה ${note.unit}: ${esc(note.title)}</h2></div>
      <div class="content">${note.content}</div>
    </div>`;
  });
  html += `</div>`;
  return shell(html);
}
