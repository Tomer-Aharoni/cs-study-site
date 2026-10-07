/* בחירת טווחים להדפסה. נטען לפני app.js. */

var printState = {
  selected: new Set(),
  labs: true,
  exercises: true,
  hints: false,
  solutions: false,
};

function loadPrintState() {
  try {
    const raw = JSON.parse(sessionStorage.getItem("cs-print") || "");
    if (raw && Array.isArray(raw.selected)) raw.selected.forEach((id) => printState.selected.add(id));
    if (raw && typeof raw.labs === "boolean") printState.labs = raw.labs;
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
        labs: printState.labs,
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
    if (quizzesFor(unit.id).length) children.push({ id: "u" + unit.id + ":quiz", label: "תרגילי היחידה" });
    return { id: "u" + unit.id, label: "יחידה " + unit.id + " · " + unit.title, children: children };
  });
  const summaries = (window.SUMMARY_PROSE || []).map((chapter) => ({
    id: "u" + chapter.unit + ":summary",
    label: chapter.title,
  }));
  if (summaries.length) units.push({ id: "summaries", label: "סיכומים", children: summaries });
  const cardsByUnit = {};
  (window.SUMMARY_CARDS || []).forEach((card) => {
    cardsByUnit[card.unit] = true;
  });
  const cards = (COURSE.units || [])
    .filter((unit) => cardsByUnit[unit.id])
    .map((unit) => ({ id: "cards:u" + unit.id, label: "יחידה " + unit.id + " · " + unit.title }));
  if (cards.length) units.push({ id: "cards", label: "כרטיסיות", children: cards });
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
  const options = (q.options || []).map((opt) => `<li>${studyInline(opt.text)}</li>`).join("");
  const hintText = practiceHintHtml(q);
  const hint = printState.hints
    ? `<div class="print-extra"><strong>רמז.</strong> ${String(hintText || "").indexOf("<") === 0 ? hintText : "<p>" + esc(hintText) + "</p>"}</div>`
    : "";
  const solution = printState.solutions
    ? `<div class="print-extra"><strong>פתרון.</strong> ${practiceSolutionHtml(q)}</div>`
    : "";
  return `<div class="print-quiz study-text"><p><strong>תרגול.</strong></p>${studyRich(q.prompt)}${options ? `<ul>${options}</ul>` : ""}${hint}${solution}</div>`;
}

function embeddedQuizIds(lesson) {
  const ids = new Set();
  const attach = window.SECTION_ATTACH || {};
  ((lesson && lesson.sections) || []).forEach((section) => {
    const spec = attach[section.id];
    ((spec && spec.quizzes) || []).forEach((qid) => ids.add(qid));
  });
  return ids;
}

function printSectionHtml(unitId, section, usedQuizzes) {
  const spec = (window.SECTION_ATTACH || {})[section.id] || {};
  let figures = "";
  (spec.viz || []).forEach((key) => {
    figures += window.vizHtml ? window.vizHtml(key) : "";
  });
  if (printState.labs) {
    (spec.labs || []).forEach((key) => {
      figures += labByName(key);
    });
  }
  let quizzes = "";
  if (printState.labs && printState.exercises) {
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

function printSummaryHtml(chapter) {
  let html = `<section class="print-block"><h3>${esc(chapter.title)}</h3><p>${esc(chapter.intro || "")}</p>`;
  (chapter.parts || []).forEach((part) => {
    html += `<h4>${esc(part.title)}</h4>${part.html}`;
  });
  return html + `</section>`;
}

function printCardsHtml(unit) {
  const cards = (window.SUMMARY_CARDS || []).filter((card) => card.unit === unit.id);
  if (!cards.length) return "";
  let html = `<section class="print-block"><h3>יחידה ${esc(unit.id)} · ${esc(unit.title)}</h3>`;
  cards.forEach((card) => {
    const extra = (window.SUMMARY_DETAIL || {})[card.id];
    const more = extra ? `<div class="card-detail">${studyRich(extra)}</div>` : "";
    html += `<article class="print-card study-text"><p class="kind">${esc(card.kind)}</p><h4>${esc(card.title)}</h4>${studyRich(card.body)}${more}</article>`;
  });
  return html + `</section>`;
}

function printSheetHtml() {
  const selected = printState.selected;
  if (!selected.size) return `<p class="muted">בחרו לפחות אזור אחד.</p>`;
  let html = `<article class="print-sheet" id="print-sheet"><header class="print-cover"><p>${esc(COURSE.code)}</p><h1>${esc(COURSE.name)}</h1></header>`;
  (COURSE.units || []).forEach((unit) => {
    const lesson = lessonById(unit.id);
    const prefix = "u" + unit.id;
    const summaryId = prefix + ":summary";
    const any =
      selected.has(prefix) ||
      [...selected].some((id) => id.indexOf(prefix + ":") === 0 && id !== summaryId);
    if (!any || !lesson) return;
    html += `<h2>יחידה ${esc(unit.id)} · ${esc(unit.title)}</h2>`;
    if (selected.has(prefix) || selected.has(prefix + ":goals")) {
      html += `<section class="print-block"><h3>מה נלמד ביחידה זו</h3><ul>${(lesson.goals || []).map((goal) => `<li>${esc(goal)}</li>`).join("")}</ul></section>`;
    }
    const usedQuizzes = new Set();
    const embedded = printState.labs ? null : embeddedQuizIds(lesson);
    (lesson.sections || []).forEach((section) => {
      if (selected.has(prefix) || selected.has(prefix + ":s:" + section.id)) html += printSectionHtml(unit.id, section, usedQuizzes);
    });
    if (printState.exercises && (selected.has(prefix) || selected.has(prefix + ":quiz"))) {
      quizzesFor(unit.id).forEach((quiz) => {
        if (usedQuizzes.has(quiz.id)) return;
        if (embedded && embedded.has(quiz.id)) return;
        usedQuizzes.add(quiz.id);
        html += printQuizHtml(quiz);
      });
    }
  });
  const summaries = (window.SUMMARY_PROSE || []).filter(
    (chapter) => selected.has("summaries") || selected.has("u" + chapter.unit + ":summary")
  );
  if (summaries.length) {
    html += `<h2>סיכומים</h2>`;
    summaries.forEach((chapter) => {
      html += printSummaryHtml(chapter);
    });
  }
  const cardUnits = (COURSE.units || []).filter(
    (unit) => selected.has("cards") || selected.has("cards:u" + unit.id)
  );
  const cardBlocks = cardUnits.map(printCardsHtml).join("");
  if (cardBlocks) html += `<h2>כרטיסיות</h2>` + cardBlocks;
  (window.EXAM_SIMS || []).forEach((exam) => {
    if (!selected.has("practice") && !selected.has("exam:" + exam.id)) return;
    html += `<h2>${esc(exam.title)}</h2>`;
    (exam.partA || []).forEach((quiz) => {
      html += printQuizHtml(quiz);
    });
    (exam.partB || []).forEach((quiz) => {
      html += `<section class="print-block study-text"><h3>${esc(quiz.title || "")}</h3>${studyRich(quiz.prompt || "")}`;
      if (printState.solutions) {
        html += `<div class="print-extra">${studyRich(quiz.solution || quiz.proposed || "")}</div>`;
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
      <legend>מה לכלול</legend>
      <label class="check-line"><input type="checkbox" data-print-opt="labs"${checked("labs")}> מעבדות ותרגילים משולבים</label>
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
