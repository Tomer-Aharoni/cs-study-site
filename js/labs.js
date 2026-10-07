/* מעבדות והמחשות. נטען לפני app.js. */

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
    brief: U5_SOCK_LAB.intro + " שרת: <span dir=\"ltr\">socket→bind→listen→accept</span>. לקוח: <span dir=\"ltr\">socket→htons→connect</span>. htons במבחן: סדר בתים של הרשת לפורט.",
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

var pyAlias = { fruit: ["banana", "apple", "cherry"], vegs: null, linked: false };

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

var u5sock = { srv: 0, cli: 0 };
var U5_SRV = ["socket()", "setsockopt (reuse)", "bind", "listen(backlog)", "accept → שקע שיחה", "read / send"];
var U5_CLI = ["socket()", "htons + inet_pton", "connect", "send", "read / recv"];

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

var u5race = { v: 0, a: 0, b: 0, locA: 0, locB: 0, lockA: false, lockB: false };

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
var uafState = { live: null, pAlive: false };
var ovState = { bytes: 0, canaryOn: true };
var memState = { locals: [], pointers: [], heaps: [], next: 1 };

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
var copyState = { mode: null, heapA: "block-A", heapB: null, deadA: false };

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

var vizState = { plates: 3, wrap: 30 };
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
