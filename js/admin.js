(function () {
  const KINDS = [
    ["all", "כל הסוגים"],
    ["course", "קורס"],
    ["unit_meta", "יחידה"],
    ["section", "סעיף"],
    ["summary_unit", "פתיח סיכום"],
    ["summary_part", "חלק סיכום"],
    ["card", "כרטיסייה"],
    ["quiz", "שאלה"],
    ["exam_meta", "מבחן"],
    ["exam_question", "שאלת מבחן"],
  ];

  let filterText = "";
  let filterKind = "all";
  let filterUnit = "all";
  let userQuery = "";
  let bound = false;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
    );
  }

  function kindLabel(kind) {
    const found = KINDS.find((item) => item[0] === kind);
    return found ? found[1] : kind;
  }

  function currentToken() {
    return window.__routeToken || 0;
  }

  function root() {
    return document.querySelector("[data-admin-root]");
  }

  function status(text, bad) {
    const el = document.querySelector("[data-admin-status]");
    if (!el) return;
    el.textContent = text || "";
    el.classList.toggle("is-bad", !!bad);
  }

  function explainError(err) {
    const msg = (err && (err.message || err.details)) || "";
    if (String(msg).indexOf("html rejected") !== -1) {
      return "השמירה נדחתה: בטקסט יש תגית או מאפיין אסורים (script, iframe, javascript: או אירוע כמו onclick).";
    }
    if (String(msg).toLowerCase().indexOf("row-level security") !== -1) {
      return "אין הרשאת ניהול בשרת.";
    }
    return "הפעולה נכשלה. נסו שוב.";
  }

  function filteredItems() {
    const q = filterText.trim().toLowerCase();
    return CSContent.catalog()
      .filter((item) => {
        if (filterKind !== "all" && item.kind !== filterKind) return false;
        if (filterUnit !== "all" && item.unit_id !== filterUnit) return false;
        if (!q) return true;
        return (item.title || "").toLowerCase().indexOf(q) !== -1 || item.id.toLowerCase().indexOf(q) !== -1;
      })
      .sort((a, b) => a.kind.localeCompare(b.kind) || (a.unit_id || "").localeCompare(b.unit_id || "") || a.sort - b.sort);
  }

  function listHtml() {
    const items = filteredItems();
    const shown = items.slice(0, 120);
    const rows = shown
      .map((item) => {
        const href = "#/admin/item/" + encodeURIComponent(item.id);
        const cloud = CSContent.isCloud(item.id) ? `<span class="pill">בשרת</span>` : "";
        return `<a class="admin-item" href="${href}"><span>${esc(kindLabel(item.kind))}${item.unit_id ? " · " + esc(item.unit_id) : ""}</span><strong>${esc(item.title || item.id)}</strong>${cloud}</a>`;
      })
      .join("");
    const more = items.length > shown.length ? `<p class="muted">מוצגים ${shown.length} מתוך ${items.length}. צמצמו בחיפוש.</p>` : "";
    return `<div class="admin-list">${rows || `<p class="muted">אין פריטים תואמים.</p>`}</div>${more}`;
  }

  function field(name, label, value, multiline) {
    if (multiline) {
      return `<label>${label}<textarea name="${name}" rows="8"></textarea></label>`;
    }
    return `<label>${label}<input name="${name}" type="text" value="${esc(value || "")}" /></label>`;
  }

  function editorHtml(item) {
    if (!item) return `<p class="muted">בחרו פריט מהרשימה.</p>`;
    const body = item.body || {};
    let fields = field("title", "כותרת", item.title, false);
    if (item.kind === "course") {
      fields += field("code", "קוד קורס", body.code, false);
      fields += field("blurb", "תקציר", body.blurb, true);
      fields += field("languages", "שפות, מופרדות בפסיק", (body.languages || []).join(", "), false);
    } else if (item.kind === "unit_meta") {
      fields += field("blurb", "תקציר", body.blurb, true);
      fields += field("hue", "צבע (hex)", body.hue, false);
      fields += `<label>סטטוס<select name="status"><option value="ready"${body.status !== "soon" ? " selected" : ""}>פתוח</option><option value="soon"${body.status === "soon" ? " selected" : ""}>בקרוב</option></select></label>`;
      fields += field("goals", "מטרות, שורה לכל מטרה", (body.goals || []).join("\n"), true);
    } else if (item.kind === "section" || item.kind === "summary_part") {
      fields += field("html", "HTML", "", true);
    } else if (item.kind === "summary_unit") {
      fields += field("intro", "פתיח", body.intro, true);
    } else if (item.kind === "card") {
      fields += field("cardKind", "סוג כרטיסייה", body.cardKind, false);
      fields += field("cardBody", "ניסוח קצר", body.body, true);
      fields += field("detail", "הרחבה", body.detail, true);
    } else if (item.kind === "quiz" || (item.kind === "exam_question" && body.part === "A")) {
      fields += field("prompt", "שאלה", body.prompt, true);
      const lines = (body.options || []).map((opt) => opt.id + " | " + opt.text).join("\n");
      fields += field("options", "אפשרויות: מזהה | ניסוח", lines, true);
      fields += field("answer", "מזהה התשובה הנכונה", body.answer, false);
      if (item.kind === "quiz") fields += field("explain", "הסבר", body.explain, true);
    } else if (item.kind === "exam_meta") {
      fields += field("minutes", "דקות", body.minutes, false);
      fields += field("pick", "כמה שאלות פתוחות לבחור", body.pick, false);
      fields += field("note", "הערה", body.note, true);
    } else if (item.kind === "exam_question") {
      fields += field("prompt", "שאלה", body.prompt, true);
      fields += `<label class="check-line"><input name="hadOfficial" type="checkbox"${body.hadOfficial ? " checked" : ""}> יש ניסוח רשמי</label>`;
      fields += field("official", "מה היה בפתרון הקיים", body.official, true);
      fields += field("html", "פתרון (HTML)", "", true);
      fields += `<label>סוג חוות דעת<select name="verdictKind">
        <option value="ok"${body.verdictKind === "ok" ? " selected" : ""}>תקין</option>
        <option value="fix"${body.verdictKind === "fix" ? " selected" : ""}>תיקון</option>
        <option value="new"${body.verdictKind !== "ok" && body.verdictKind !== "fix" ? " selected" : ""}>חדש</option>
      </select></label>`;
      fields += field("verdict", "חוות דעת", body.verdict, true);
    }
    const preview = item.html ? `<div class="admin-preview" data-admin-preview-box>${item.html}</div>` : `<div class="admin-preview" data-admin-preview-box hidden></div>`;
    return `<form class="admin-form" data-admin-form data-item="${esc(item.id)}">
      <p class="meta">${esc(kindLabel(item.kind))} · <span dir="ltr">${esc(item.id)}</span></p>
      ${fields}
      <p class="admin-actions">
        <button type="submit" class="primary">שמירה</button>
        <button type="button" class="ghost-btn" data-admin-preview>תצוגה מקדימה</button>
        <button type="button" class="ghost-btn" data-admin-replace>החזרה מהקובץ</button>
      </p>
      <p class="save-note" data-admin-status></p>
      ${preview}
    </form>`;
  }

  function fillTextareas(item) {
    const form = document.querySelector("[data-admin-form]");
    if (!form || !item) return;
    const body = item.body || {};
    const set = (name, value) => {
      const el = form.elements[name];
      if (el && (el.tagName === "TEXTAREA" || el.type === "text")) el.value = value == null ? "" : String(value);
    };
    set("title", item.title);
    set("blurb", body.blurb);
    set("goals", (body.goals || []).join("\n"));
    set("html", item.html || "");
    set("intro", body.intro);
    set("cardBody", body.body);
    set("detail", body.detail);
    set("prompt", body.prompt);
    set("options", (body.options || []).map((opt) => opt.id + " | " + opt.text).join("\n"));
    set("explain", body.explain);
    set("note", body.note);
    set("official", body.official);
    set("verdict", body.verdict);
  }

  function readOptions(text) {
    return String(text || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const cut = line.indexOf("|");
        if (cut === -1) return { id: line.slice(0, 1), text: line };
        return { id: line.slice(0, cut).trim(), text: line.slice(cut + 1).trim() };
      })
      .filter((opt) => opt.id && opt.text);
  }

  function readItem(item) {
    const form = document.querySelector("[data-admin-form]");
    const data = new FormData(form);
    const next = {
      id: item.id,
      kind: item.kind,
      unit_id: item.unit_id,
      sort: item.sort || 0,
      title: String(data.get("title") || "").trim(),
      html: item.html,
      body: Object.assign({}, item.body || {}),
    };
    if (item.kind === "course") {
      next.body.code = String(data.get("code") || "").trim();
      next.body.blurb = String(data.get("blurb") || "");
      next.body.languages = String(data.get("languages") || "")
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
    } else if (item.kind === "unit_meta") {
      next.body.blurb = String(data.get("blurb") || "");
      next.body.hue = String(data.get("hue") || "").trim();
      next.body.status = data.get("status") === "soon" ? "soon" : "ready";
      next.body.goals = String(data.get("goals") || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    } else if (item.kind === "section" || item.kind === "summary_part") {
      next.html = String(data.get("html") || "");
    } else if (item.kind === "summary_unit") {
      next.body.intro = String(data.get("intro") || "");
    } else if (item.kind === "card") {
      next.body.cardKind = String(data.get("cardKind") || "").trim();
      next.body.body = String(data.get("cardBody") || "");
      next.body.detail = String(data.get("detail") || "");
    } else if (item.kind === "quiz") {
      next.body.prompt = String(data.get("prompt") || "");
      next.body.options = readOptions(data.get("options"));
      next.body.answer = String(data.get("answer") || "").trim();
      next.body.explain = String(data.get("explain") || "");
      next.title = next.body.prompt.slice(0, 80);
    } else if (item.kind === "exam_meta") {
      next.body.minutes = Number(data.get("minutes")) || 180;
      next.body.pick = Number(data.get("pick")) || 1;
      next.body.note = String(data.get("note") || "");
    } else if (item.kind === "exam_question" && item.body && item.body.part === "A") {
      next.body.prompt = String(data.get("prompt") || "");
      next.body.options = readOptions(data.get("options"));
      next.body.answer = String(data.get("answer") || "").trim();
      next.title = next.body.prompt.slice(0, 80);
    } else if (item.kind === "exam_question") {
      next.body.prompt = String(data.get("prompt") || "");
      next.body.hadOfficial = !!form.querySelector("[name=hadOfficial]").checked;
      next.body.official = String(data.get("official") || "");
      next.body.verdictKind = String(data.get("verdictKind") || "new");
      next.body.verdict = String(data.get("verdict") || "");
      next.html = String(data.get("html") || "");
    }
    return next;
  }

  function userCards(pack) {
    const q = userQuery.trim().toLowerCase();
    const rows = (pack.profiles || [])
      .filter((person) => {
        if (!q) return true;
        return (person.email || "").toLowerCase().indexOf(q) !== -1 || (person.display_name || "").toLowerCase().indexOf(q) !== -1;
      })
      .map((person) => {
        const seen = (pack.seen.get(person.id) || []).length;
        const practiceCount = pack.practice.get(person.id) || 0;
        const marks = pack.marks.get(person.id) || 0;
        return `<article class="panel admin-user">
          <h2>${esc(person.display_name || person.email || "משתמש")}</h2>
          <p class="muted" dir="ltr">${esc(person.email)}</p>
          <p>${person.role === "admin" ? "מנהל" : "סטודנט"} · יחידות שנצפו: ${seen} · רשומות תרגול: ${practiceCount} · סימניות: ${marks}</p>
          <form data-admin-reset data-user="${esc(person.id)}" data-email="${esc(person.email)}">
            <label>לאיפוס המעקב הקלידו את כתובת הדוא״ל
              <input name="confirm" type="email" autocomplete="off" placeholder="${esc(person.email)}">
            </label>
            <button type="submit" class="ghost-btn">איפוס מעקב</button>
          </form>
        </article>`;
      })
      .join("");
    return rows || `<p class="muted">אין משתמשים תואמים.</p>`;
  }

  function usersHtml(pack) {
    return `<div class="admin-users">
      <label>חיפוש לפי דוא״ל או שם
        <input type="search" data-admin-user-filter value="${esc(userQuery)}" placeholder="name@gmail.com">
      </label>
      <div data-admin-user-list>${userCards(pack)}</div>
      <p class="save-note" data-admin-status></p>
    </div>`;
  }

  async function loadUserPack() {
    const client = CSAuth.client();
    const [profiles, states, practice, marks] = await Promise.all([
      client.from("profiles").select("id,email,display_name,role").order("email"),
      client.from("learner_state").select("user_id,seen"),
      client.from("practice_status").select("user_id"),
      client.from("bookmarks").select("user_id"),
    ]);
    if (profiles.error) throw profiles.error;
    const seen = new Map();
    (states.data || []).forEach((row) => seen.set(row.user_id, row.seen || []));
    const practiceCount = new Map();
    (practice.data || []).forEach((row) => practiceCount.set(row.user_id, (practiceCount.get(row.user_id) || 0) + 1));
    const markCount = new Map();
    (marks.data || []).forEach((row) => markCount.set(row.user_id, (markCount.get(row.user_id) || 0) + 1));
    return { profiles: profiles.data || [], seen: seen, practice: practiceCount, marks: markCount };
  }

  function shellTabs(active) {
    return `<div class="admin-panel">
      <p class="back-row"><a class="back" href="#/course/${COURSE.id}">לקורס</a></p>
      <h1>ניהול</h1>
      <nav class="admin-tabs">
        <a href="#/admin"${active === "content" ? ' class="is-on"' : ""}>תוכן</a>
        <a href="#/admin/users"${active === "users" ? ' class="is-on"' : ""}>משתמשים</a>
      </nav>
      <div data-admin-body></div>
    </div>`;
  }

  function denied(message) {
    const box = root();
    if (!box) return;
    box.innerHTML = `<div class="admin-panel"><h1>ניהול</h1><div class="admin-denied">${message}</div><p><a href="#/course/${COURSE.id}">חזרה לקורס</a></p></div>`;
  }

  async function mount(routeInfo, token) {
    bind();
    const box = root();
    if (!box) return;
    if (!window.CSAuth || !CSAuth.enabled()) {
      denied("חיבור Supabase לא הוגדר. העתיקו את js/config.example.js אל js/config.js והשלימו את כתובת הפרויקט ואת מפתח anon.");
      return;
    }
    await CSAuth.ready;
    if (token !== currentToken()) return;
    if (!CSAuth.user()) {
      denied(`כדי להיכנס לניהול צריך להתחבר עם Google, ורק חשבון שסומן כמנהל במסד נתונים רואה את המסך הזה.<p><button type="button" class="primary" data-auth-in>התחברות עם Google</button></p>`);
      return;
    }
    if (!CSAuth.isAdmin()) {
      denied("אין הרשאת ניהול לחשבון הזה. תפקיד מנהל נקבע רק ב-SQL של Supabase, לא מהדפדפן.");
      return;
    }
    if (routeInfo.adminUsers) {
      box.innerHTML = shellTabs("users");
      const body = box.querySelector("[data-admin-body]");
      body.innerHTML = `<p class="muted">טוען משתמשים…</p>`;
      try {
        const pack = await loadUserPack();
        if (token !== currentToken()) return;
        body.innerHTML = usersHtml(pack);
        body._pack = pack;
      } catch (err) {
        if (token !== currentToken()) return;
        body.innerHTML = `<p class="save-note is-bad">${esc(explainError(err))}</p>`;
      }
      return;
    }
    box.innerHTML = shellTabs("content");
    const item = routeInfo.adminItem ? CSContent.item(routeInfo.adminItem) : null;
    const units = ["all"].concat((COURSE.units || []).map((unit) => unit.id));
    box.querySelector("[data-admin-body]").innerHTML = `<div class="admin-split">
      <div>
        <p class="admin-actions"><button type="button" class="primary" data-admin-import>ייבוא מהקבצים המצורפים</button></p>
        <div class="admin-filters">
          <label>סוג<select data-admin-kind>${KINDS.map(([id, label]) => `<option value="${id}"${filterKind === id ? " selected" : ""}>${label}</option>`).join("")}</select></label>
          <label>יחידה<select data-admin-unit>${units.map((id) => `<option value="${id}"${filterUnit === id ? " selected" : ""}>${id === "all" ? "הכל" : "יחידה " + id}</option>`).join("")}</select></label>
          <label>חיפוש<input type="search" data-admin-filter value="${esc(filterText)}" placeholder="כותרת"></label>
        </div>
        <div data-admin-list>${listHtml()}</div>
      </div>
      <div data-admin-editor>${editorHtml(item)}</div>
    </div>`;
    fillTextareas(item);
  }

  function repaintList() {
    const list = document.querySelector("[data-admin-list]");
    if (list) list.innerHTML = listHtml();
  }

  async function onSubmit(e) {
    const reset = e.target.closest("[data-admin-reset]");
    if (reset) {
      e.preventDefault();
      const typed = String(new FormData(reset).get("confirm") || "").trim().toLowerCase();
      const email = String(reset.getAttribute("data-email") || "").trim().toLowerCase();
      if (!email || typed !== email) {
        status("הקלידו את כתובת הדוא״ל המלאה של המשתמש.", true);
        return;
      }
      const button = reset.querySelector("button");
      button.disabled = true;
      try {
        await CSProgress.resetUser(reset.getAttribute("data-user"));
        status("המעקב אופס.");
        const pack = await loadUserPack();
        const body = document.querySelector("[data-admin-body]");
        if (body) {
          body.innerHTML = usersHtml(pack);
          body._pack = pack;
          status("המעקב אופס.");
        }
      } catch (err) {
        button.disabled = false;
        status(explainError(err), true);
      }
      return;
    }
    const form = e.target.closest("[data-admin-form]");
    if (!form) return;
    e.preventDefault();
    const item = CSContent.item(form.getAttribute("data-item"));
    if (!item) return;
    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    try {
      const next = readItem(item);
      if (next.kind === "unit_meta" && next.body.hue && !/^#[0-9a-fA-F]{3,8}$/.test(next.body.hue)) {
        status("צבע צריך להיות בפורמט #RRGGBB.", true);
        return;
      }
      await CSContent.saveItem(next);
      status("נשמר.");
      repaintList();
    } catch (err) {
      status(explainError(err), true);
    } finally {
      button.disabled = false;
    }
  }

  function bind() {
    if (bound) return;
    bound = true;
    document.addEventListener("submit", onSubmit);
    document.addEventListener("click", async (e) => {
      const preview = e.target.closest("[data-admin-preview]");
      if (preview) {
        const form = preview.closest("[data-admin-form]");
        const item = CSContent.item(form.getAttribute("data-item"));
        const next = readItem(item);
        const box = form.querySelector("[data-admin-preview-box]");
        const blob = (next.html || "") + JSON.stringify(next.body || {});
        if (CSContent.danger(blob)) {
          status("אי אפשר להציג: בטקסט יש תגית או מאפיין אסורים.", true);
          return;
        }
        box.hidden = false;
        box.innerHTML = next.html || `<p>${esc(next.body.prompt || next.body.intro || next.body.body || next.title)}</p>`;
        return;
      }
      const replace = e.target.closest("[data-admin-replace]");
      if (replace) {
        const form = replace.closest("[data-admin-form]");
        const id = form.getAttribute("data-item");
        const original = CSContent.bundledItem(id);
        if (!original) {
          status("אין עותק בקובץ המצורף.", true);
          return;
        }
        const ok = window.confirm("להחליף את הטקסט שנשמר בשרת לפריט הזה בטקסט מהקבצים המצורפים?");
        if (!ok) return;
        replace.disabled = true;
        try {
          await CSContent.saveItem(original);
          location.hash = "#/admin/item/" + encodeURIComponent(id);
        } catch (err) {
          replace.disabled = false;
          status(explainError(err), true);
        }
        return;
      }
      const imp = e.target.closest("[data-admin-import]");
      if (imp) {
        const ok = window.confirm("לייבא מהקבצים רק פריטים שעדיין אין להם שורה בשרת?");
        if (!ok) return;
        imp.disabled = true;
        try {
          const count = await CSContent.importMissing();
          status(count ? "יובאו " + count + " פריטים." : "אין פריטים חדשים לייבוא.");
          repaintList();
        } catch (err) {
          status(explainError(err), true);
        } finally {
          imp.disabled = false;
        }
      }
    });
    document.addEventListener("input", (e) => {
      if (e.target.matches("[data-admin-filter]")) {
        filterText = e.target.value;
        repaintList();
      }
      if (e.target.matches("[data-admin-user-filter]")) {
        userQuery = e.target.value;
        const body = document.querySelector("[data-admin-body]");
        const list = document.querySelector("[data-admin-user-list]");
        if (!body || !body._pack || !list) return;
        list.innerHTML = userCards(body._pack);
      }
    });
    document.addEventListener("change", (e) => {
      if (e.target.matches("[data-admin-kind]")) {
        filterKind = e.target.value;
        repaintList();
      }
      if (e.target.matches("[data-admin-unit]")) {
        filterUnit = e.target.value;
        repaintList();
      }
    });
  }

  window.CSAdmin = { mount: mount };
})();
