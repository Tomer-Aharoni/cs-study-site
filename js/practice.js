/* תרגול וסימולציות מועד. נטען לפני app.js. */

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
      <div class="study-text quiz-lead">${studyRich(q.prompt)}</div>
      ${foldHtml("💡 רמז לפתרון", practiceHintHtml(q))}
      <button type="button" class="ghost-btn" data-drill-reveal ${shown ? "hidden" : ""}>הצגת פתרון</button>
      <div class="panel prep-solution" ${shown ? "" : "hidden"}>
        ${foldHtml((answerBuiltByAi(q) ? aiBubble() : "") + "פתרון מפורט ודרך חישוב", q.solution || "<p>אין פתרון שמור.</p>")}
        ${q.note ? `<div class="feedback ok study-text">${studyRich(q.note)}</div>` : ""}
      </div>
      <button type="button" class="primary" data-drill-next ${shown ? "" : "hidden"}>${nextLabel}</button>`;
  } else {
    const picked = round.picked[q.id];
    const opts = (q.options || [])
      .map((o) => {
        const mark = picked ? (o.id === q.answer ? " correct" : o.id === picked ? " wrong" : "") : "";
        const dis = picked ? " disabled" : "";
        return `<button type="button" class="option${mark}" data-drill-choice="${o.id}"${dis}>${studyInline(o.text)}</button>`;
      })
      .join("");
    const fb = picked
      ? `<p class="feedback ${picked === q.answer ? "ok" : "bad"}">${picked === q.answer ? "נכון." : "לא נכון."}</p>
        ${foldHtml((answerBuiltByAi(q) ? aiBubble() : "") + "פתרון מפורט ודרך חישוב", practiceSolutionHtml(q))}`
      : `<p class="feedback" hidden></p>`;
    body = `
      <div class="study-text quiz-lead">${questionBuiltByAi(q) ? aiBubble() : ""}${studyRich(q.prompt)}</div>
      ${editLink(quizContentId(q.id), "השאלה")}
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
  return `<div class="study-text"><p><strong>התשובה הנכונה: ${studyInline(right)}</strong></p>${studyRich(explanation)}</div>`;
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
          return `<button type="button" class="${cls}" data-exam-a="${q.id}" data-choice="${o.id}"${dis}>${studyInline(o.text)}</button>`;
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
        <div class="box-head"><div class="study-text quiz-lead">${questionBuiltByAi(q, exam) ? aiBubble() : ""}${studyRich(q.prompt)}</div>${editLink("exam:" + exam.id + ":a:" + q.id, "שאלת המבחן")}</div>
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
          ${q.hadOfficial ? `<h3>מה היה בפתרון הקיים</h3><div class="study-text">${studyRich(q.official)}</div>` : `<h3>אין פתרון רשמי קריא</h3>`}
          ${foldHtml((answerBuiltByAi(q, exam) ? aiBubble() : "") + "פתרון מפורט ודרך חישוב", q.solution || q.proposed || "<p>לא נמצא פתרון מלא במקור.</p>")}
          <div class="verdict ${kind === "ok" ? "ok" : kind === "fix" ? "fix" : "new"} study-text"><strong>חוות דעת:</strong> ${studyRich(q.verdict)}</div>
        </div>`;
      }
      const hint = foldHtml("💡 רמז לפתרון", practiceHintHtml(q));
      return `<article class="section exam-bq" id="${q.id}">
        <div class="box-head"><h2>${questionBuiltByAi(q, exam) ? aiBubble() : ""}${esc(q.title)}</h2>${editLink("exam:" + exam.id + ":b:" + q.id, q.title)}</div>
        <p class="exam-prompt study-text">${questionBuiltByAi(q, exam) ? aiBubble() : ""}${studyRich(q.prompt)}</p>
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
