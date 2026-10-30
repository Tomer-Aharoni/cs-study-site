(function () {
  function courseMark() {
    const id = window.COURSE && COURSE.id;
    return id && id !== "20937" ? id : "";
  }

  function storageKey(base) {
    const mark = courseMark();
    return mark ? base + ":" + mark : base;
  }

  function itemPrefix() {
    const mark = courseMark();
    return mark ? mark + ":" : "";
  }

  function toItem(id) {
    const prefix = itemPrefix();
    const text = String(id || "");
    if (!prefix || text.indexOf(prefix) === 0) return text;
    return prefix + text;
  }

  function fromItem(id) {
    const prefix = itemPrefix();
    const text = String(id || "");
    if (prefix && text.indexOf(prefix) === 0) return text.slice(prefix.length);
    return text;
  }

  function ownsItem(id) {
    const text = String(id || "");
    const foreign = /^[0-9]{5}:/.test(text);
    if (!courseMark()) return !foreign;
    return text.indexOf(itemPrefix()) === 0;
  }

  function nestKey() {
    return courseMark() ? "c" + courseMark() : "";
  }

  window.csStorageKey = storageKey;

  const ANON_KEY = storageKey("cs-study-progress-anon");
  const APPLIED = storageKey("cs-progress-cloud-applied");
  const PROGRESS_KEY = storageKey("cs-study-progress");
  let userId = null;
  let hydrating = false;
  let practice = [];
  let bookmarks = [];
  let labNames = {};
  let bootGen = 0;
  let stateTimer = null;
  let lastSyncError = "";
  let cloudSeen = [];
  let cloudResume = null;
  let stateLoaded = false;

  try {
    labNames = JSON.parse(localStorage.getItem(storageKey("cs-lab-names")) || "{}") || {};
  } catch (err) {
    labNames = {};
  }

  const LAB_NAMES = {
    risk: "טבלת ממצא",
    mem: "מחסנית וערימה",
    copy: "העתקה",
    ov: "גלישת חוצץ",
    int: "מספרים שלמים",
    uaf: "שימוש אחרי שחרור",
    "py-alias": "כינוי בפייתון",
    "py-eval": "eval",
    "u5-osi": "שכבות OSI",
    "u5-sock": "שקעים",
    "u5-race": "מרוץ",
    "u6-web": "HTTP",
    "u6-iso": "בידוד",
    "u6-tru": "ענן וקוד לא מהימן",
    "u7-sql": "הזרקת SQL",
    "u7-lang": "שפת SQL",
    "u7-cln": "עקרונות קוד",
    tree: "עץ איומים",
  };

  function readLocal() {
    try {
      const raw = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "");
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

  function writeLocal(progress) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (err) {
      /* מצב פרטי */
    }
  }

  function localHas(progress) {
    return progress.seen.length || progress.wrong.length || progress.resume;
  }

  function cloudHas(row) {
    if (!row) return false;
    const key = nestKey();
    if (key) {
      const bundle = row.resume && row.resume[key];
      return !!(bundle && ((bundle.seen && bundle.seen.length) || (bundle.resume && bundle.resume.unit)));
    }
    return !!((row.seen && row.seen.length) || (row.resume && row.resume.unit));
  }

  function resumeForLocal(row) {
    const resume = row && row.resume;
    if (!resume || typeof resume !== "object") return resume || null;
    const nested = Object.keys(resume).some((key) => /^c[0-9]{5}$/.test(key));
    if (!nested) return resume;
    if (!resume.unit) return null;
    return { unit: resume.unit, section: resume.section, title: resume.title };
  }

  function bundleOf(row) {
    const key = nestKey();
    if (!key || !row || !row.resume || typeof row.resume !== "object") return null;
    return row.resume[key] || null;
  }

  function scopedState(progress) {
    const key = nestKey();
    const prior = cloudResume && typeof cloudResume === "object" ? cloudResume : null;
    if (key) {
      const next = {};
      if (prior) {
        Object.keys(prior).forEach((field) => {
          next[field] = prior[field];
        });
      }
      next[key] = {
        seen: Array.isArray(progress.seen) ? progress.seen.slice() : [],
        resume: progress.resume || null,
      };
      return { seen: (cloudSeen || []).slice(), resume: next };
    }
    const next = {};
    if (progress.resume && progress.resume.unit) {
      next.unit = progress.resume.unit;
      next.section = progress.resume.section;
      next.title = progress.resume.title;
    }
    if (prior) {
      Object.keys(prior).forEach((field) => {
        if (field === "unit" || field === "section" || field === "title") return;
        next[field] = prior[field];
      });
    }
    const hasOwn = !!(progress.resume && progress.resume.unit);
    const hasNest = Object.keys(next).some((field) => field !== "unit" && field !== "section" && field !== "title");
    if (!hasOwn && !hasNest) return { seen: progress.seen || [], resume: null };
    return { seen: progress.seen || [], resume: next };
  }

  function strugglingIds() {
    return practice
      .filter((row) => row.kind === "quiz" && row.outcome === "struggling")
      .map((row) => fromItem(row.item_id));
  }

  function rememberPractice(row) {
    const idx = practice.findIndex((item) => item.item_id === row.item_id);
    if (idx >= 0) practice[idx] = row;
    else practice.push(row);
  }

  let pushTail = Promise.resolve();

  async function pushState(progress) {
    const run = pushTail.then(() => sendState(progress));
    pushTail = run.then(
      () => {},
      () => {}
    );
    return run;
  }

  async function sendState(progress) {
    const client = window.CSAuth && CSAuth.client();
    const uid = userId;
    if (!client || !uid) return;
    const { data, error } = await client.from("learner_state").select("seen,resume").eq("user_id", uid).maybeSingle();
    if (uid !== userId) return;
    if (error) {
      lastSyncError = "ההתקדמות לא נשמרה בשרת.";
      return;
    }
    cloudSeen = data && data.seen ? data.seen.slice() : [];
    cloudResume = data && data.resume && typeof data.resume === "object" ? data.resume : null;
    stateLoaded = true;
    const payload = scopedState(progress);
    const { error: writeError } = await client.from("learner_state").upsert({
      user_id: uid,
      seen: payload.seen,
      resume: payload.resume,
    });
    if (uid !== userId) return;
    lastSyncError = writeError ? "ההתקדמות לא נשמרה בשרת." : "";
    if (!writeError) {
      cloudSeen = (payload.seen || []).slice();
      cloudResume = payload.resume && typeof payload.resume === "object" ? payload.resume : null;
    }
  }

  async function upsertPractice(rows) {
    const client = window.CSAuth && CSAuth.client();
    if (!client || !userId || !rows.length) return;
    const payload = rows.map((row) => ({
      user_id: userId,
      item_id: row.item_id,
      kind: row.kind,
      outcome: row.outcome,
    }));
    const { error } = await client.from("practice_status").upsert(payload);
    if (error) {
      lastSyncError = "תרגול לא נשמר בשרת.";
      return;
    }
    lastSyncError = "";
    payload.forEach(rememberPractice);
  }

  function scheduleState(progress) {
    if (!userId || hydrating) return;
    clearTimeout(stateTimer);
    stateTimer = setTimeout(() => {
      pushState(progress);
    }, 350);
  }

  function noteQuiz(qid, correct) {
    if (!userId || !qid) return;
    upsertPractice([{ item_id: toItem(qid), kind: "quiz", outcome: correct ? "correct" : "struggling" }]);
  }

  function noteExam(exam, run) {
    if (!userId || !exam || !run) return;
    const rows = [{ item_id: toItem("exam:" + exam.id), kind: "exam", outcome: "completed" }];
    (exam.partA || []).forEach((quiz) => {
      const picked = (run.answers || {})[quiz.id];
      rows.push({
        item_id: toItem("examq:" + exam.id + ":" + quiz.id),
        kind: "exam",
        outcome: picked && picked === quiz.answer ? "correct" : "struggling",
      });
    });
    upsertPractice(rows);
  }

  function rememberLab(id, title) {
    if (!id || !title) return;
    labNames[id] = title;
    try {
      localStorage.setItem(storageKey("cs-lab-names"), JSON.stringify(labNames));
    } catch (err) {
      /* מצב פרטי */
    }
  }

  function noteLab(id) {
    if (!id) return { ok: false, reason: "id" };
    if (!userId) return { ok: false, reason: "auth" };
    upsertPractice([{ item_id: toItem(id), kind: "lab", outcome: "completed" }]);
    return { ok: true };
  }

  function hasLab(id) {
    return practice.some((row) => row.kind === "lab" && row.item_id === toItem(id) && row.outcome === "completed");
  }

  function hasBookmark(partId) {
    return bookmarks.indexOf(toItem(partId)) !== -1;
  }

  async function toggleBookmark(partId) {
    const client = window.CSAuth && CSAuth.client();
    if (!client || !userId) return { ok: false, reason: "auth" };
    const stored = toItem(partId);
    const on = hasBookmark(partId);
    if (on) {
      const { error } = await client.from("bookmarks").delete().eq("user_id", userId).eq("part_id", stored);
      if (error) return { ok: false, reason: "save" };
      bookmarks = bookmarks.filter((id) => id !== stored);
      return { ok: true, on: false };
    }
    const { error } = await client.from("bookmarks").insert({ user_id: userId, part_id: stored });
    if (error) return { ok: false, reason: "save" };
    bookmarks.push(stored);
    return { ok: true, on: true };
  }

  async function boot() {
    const gen = ++bootGen;
    userId = null;
    practice = [];
    bookmarks = [];
    if (!window.CSAuth || !CSAuth.enabled()) return;
    await CSAuth.ready;
    if (gen !== bootGen) return;
    const user = CSAuth.user();
    const client = CSAuth.client();
    if (!user || !client) {
      if (sessionStorage.getItem(APPLIED)) {
        try {
          const backup = JSON.parse(localStorage.getItem(ANON_KEY) || "");
          if (backup && typeof backup === "object") writeLocal(backup);
        } catch (err) {
          /* גיבוי לא תקין */
        }
        sessionStorage.removeItem(APPLIED);
      }
      return;
    }
    userId = user.id;
    hydrating = true;
    try {
      const [stateRes, pracRes, markRes] = await Promise.all([
        client.from("learner_state").select("seen,resume").eq("user_id", userId).maybeSingle(),
        client.from("practice_status").select("item_id,kind,outcome").eq("user_id", userId),
        client.from("bookmarks").select("part_id").eq("user_id", userId),
      ]);
      if (gen !== bootGen) return;
      if (stateRes.error || pracRes.error || markRes.error) {
        lastSyncError = "המעקב מהשרת לא נטען. מוצג מה שנשמר במכשיר.";
        return;
      }
      const cloud = stateRes.data;
      practice = (pracRes.data || []).filter((row) => ownsItem(row.item_id));
      bookmarks = (markRes.data || []).map((row) => row.part_id).filter((id) => ownsItem(id));
      cloudSeen = cloud && cloud.seen ? cloud.seen.slice() : [];
      cloudResume = cloud && cloud.resume && typeof cloud.resume === "object" ? cloud.resume : null;
      stateLoaded = true;
      const local = readLocal();
      const seededKey = storageKey("cs-cloud-seeded:" + userId);
      const seeded = localStorage.getItem(seededKey) === "1";
      if (!cloudHas(cloud) && !practice.length && localHas(local) && !seeded && !sessionStorage.getItem(APPLIED)) {
        await pushState(local);
        if (local.wrong.length) {
          await upsertPractice(local.wrong.map((qid) => ({ item_id: toItem(qid), kind: "quiz", outcome: "struggling" })));
        }
        if (!lastSyncError) localStorage.setItem(seededKey, "1");
      } else if (cloudHas(cloud) || practice.length) {
        if (!sessionStorage.getItem(APPLIED)) {
          try {
            localStorage.setItem(ANON_KEY, JSON.stringify(local));
          } catch (err) {
            /* מצב פרטי */
          }
        }
        const bundle = bundleOf(cloud);
        writeLocal({
          seen: bundle ? bundle.seen || [] : (cloud && cloud.seen) || [],
          wrong: strugglingIds(),
          resume: bundle ? bundle.resume || null : resumeForLocal(cloud),
        });
        sessionStorage.setItem(APPLIED, userId);
        localStorage.setItem(seededKey, "1");
      }
      lastSyncError = "";
    } finally {
      hydrating = false;
    }
  }

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
    );
  }

  function quizLabel(id) {
    id = fromItem(id);
    if (typeof findQuiz === "function") {
      const quiz = findQuiz(id);
      if (quiz) return quiz.prompt;
    }
    return id;
  }

  function examLabel(id) {
    id = fromItem(id);
    const examId = id.slice("exam:".length);
    if (typeof examById === "function") {
      const exam = examById(examId);
      if (exam) return exam.title;
    }
    return examId;
  }

  function examQuestionLabel(id) {
    id = fromItem(id);
    const parts = id.split(":");
    const examId = parts[1] || "";
    const qid = parts.slice(2).join(":");
    if (typeof examById === "function") {
      const exam = examById(examId);
      const quiz = exam && (exam.partA || []).find((item) => item.id === qid);
      if (quiz) return quiz.prompt;
    }
    return qid || id;
  }

  function bookmarkLink(partId) {
    partId = fromItem(partId);
    const course = window.COURSE && COURSE.id;
    const bits = partId.split(":");
    if (bits[0] !== "summary" || !course) return "#/me";
    return "#/course/" + course + "/summary/u/" + bits[1] + "/" + bits.slice(2).join(":");
  }

  function bookmarkLabel(partId) {
    partId = fromItem(partId);
    const bits = partId.split(":");
    const unit = bits[1];
    const pid = bits.slice(2).join(":");
    const chapter = (window.SUMMARY_PROSE || []).find((item) => item.unit === unit);
    const part = chapter && (chapter.parts || []).find((item) => item.id === pid);
    if (part) return "יחידה " + unit + " · " + part.title;
    return partId;
  }

  function listHtml(rows, empty) {
    if (!rows.length) return `<p class="muted">${empty}</p>`;
    return `<ul class="me-list">${rows.join("")}</ul>`;
  }

  function meHtml() {
    const course = window.COURSE;
    const base = course ? "#/course/" + course.id : "#/";
    const signed = !!(window.CSAuth && CSAuth.enabled() && CSAuth.user());
    const progress = typeof getProgress === "function" ? getProgress() : readLocal();
    const resume = progress.resume;
    const resumeHref = resume
      ? `${base}/learn/${encodeURIComponent(resume.unit)}${resume.section ? "/" + encodeURIComponent(resume.section) : ""}`
      : "";
    const units = (course && course.units) || [];
    const seen = new Set(progress.seen || []);
    const unitItems = units.map((unit) => {
      const mark = seen.has(unit.id) ? "נצפתה" : "עדיין לא";
      return `<li><a href="${base}/learn/${unit.id}">יחידה ${esc(unit.id)} · ${esc(unit.title)}</a> <span class="pill">${mark}</span></li>`;
    });
    const solved = practice.filter((row) => row.kind === "quiz" && row.outcome === "correct");
    const hard = practice.filter((row) => row.kind === "quiz" && row.outcome === "struggling");
    const exams = practice.filter((row) => row.kind === "exam" && row.outcome === "completed");
    const examHard = practice.filter((row) => row.kind === "exam" && row.outcome === "struggling");
    const labs = practice.filter((row) => row.kind === "lab" && row.outcome === "completed");
    const localWrong = !signed ? progress.wrong || [] : [];
    const intro = !window.CSAuth || !CSAuth.enabled()
      ? "חיבור החשבונות עדיין לא הוגדר. מה שמופיע כאן נשמר רק במכשיר הזה."
      : signed
        ? "המעקב שמור בחשבון Google. יחידות, שאלות, מעבדות וסימניות לחזרה."
        : "אחרי התחברות עם Google המעקב נשמר בחשבון וזמין גם ממכשיר אחר. עד אז הוא נשאר במכשיר הזה.";
    const sync = lastSyncError ? `<p class="save-note">${esc(lastSyncError)}</p>` : "";
    const resumeBlock = resume
      ? `<p><a class="primary-link" href="${resumeHref}">המשך קריאה · יחידה ${esc(resume.unit)}${resume.title ? " · " + esc(resume.title) : ""}</a></p>`
      : `<p class="muted">עדיין אין נקודת המשך. פתחו יחידה והקריאה תסומן.</p>`;
    return `<div class="me-panel">
      <p class="back-row"><a class="back" href="${base}">לקורס</a></p>
      <h1>ההתקדמות שלי</h1>
      <p class="muted">${intro}</p>
      ${sync}
      ${window.CSAuth && CSAuth.enabled() && !signed ? `<p><button type="button" class="primary" data-auth-in>התחברות עם Google</button></p>` : ""}
      <section class="section">
        <h2>המשך</h2>
        ${resumeBlock}
      </section>
      <section class="section">
        <h2>יחידות</h2>
        ${listHtml(unitItems, "אין יחידות בקורס.")}
      </section>
      <section class="section">
        <h2>שאלות שנפתרו</h2>
        ${listHtml(
          solved.map((row) => `<li>${esc(quizLabel(row.item_id))}</li>`),
          signed ? "עדיין אין שאלות שנפתרו בחשבון." : "שאלות שנפתרו נשמרות אחרי התחברות."
        )}
      </section>
      <section class="section">
        <h2>שאלות לחזרה</h2>
        ${
          signed
            ? listHtml(hard.map((row) => `<li>${esc(quizLabel(row.item_id))}</li>`), "אין שאלות שמסומנות כקשות.")
            : listHtml(localWrong.map((id) => `<li>${esc(quizLabel(id))}</li>`), "אין טעויות שמורות במכשיר.")
        }
      </section>
      ${
        !window.COURSE_DATA || (Array.isArray(COURSE_DATA.exams) && COURSE_DATA.exams.length) || exams.length || examHard.length
          ? `<section class="section">
        <h2>סימולציות מבחן</h2>
        ${listHtml(exams.map((row) => `<li>${esc(examLabel(row.item_id))}</li>`), "עדיין לא נסגרה סימולציה בחשבון.")}
        ${examHard.length ? `<h3>שאלות מבחן לחזרה</h3>${listHtml(examHard.map((row) => `<li>${esc(examQuestionLabel(row.item_id))}</li>`), "")}` : ""}
      </section>`
          : ""
      }
      <section class="section">
        <h2>מעבדות שהושלמו</h2>
        ${listHtml(
          labs.map((row) => {
            const id = fromItem(row.item_id);
            return `<li>${esc(labNames[id] || LAB_NAMES[id] || id)}</li>`;
          }),
          "עדיין לא סומנה מעבדה כהושלמה."
        )}
      </section>
      <section class="section">
        <h2>סימניות לחזרה</h2>
        ${listHtml(
          bookmarks.map((id) => `<li><a href="${bookmarkLink(id)}">${esc(bookmarkLabel(id))}</a></li>`),
          "אין סימניות. בסיכום אפשר לסמן חלק לחזרה."
        )}
      </section>
    </div>`;
  }

  window.CSProgress = {
    boot: boot,
    scheduleState: scheduleState,
    noteQuiz: noteQuiz,
    noteExam: noteExam,
    noteLab: noteLab,
    rememberLab: rememberLab,
    hasLab: hasLab,
    hasBookmark: hasBookmark,
    toggleBookmark: toggleBookmark,
    meHtml: meHtml,
    resetUser: async function (targetId) {
      const client = window.CSAuth && CSAuth.client();
      const admin = window.CSAuth && CSAuth.user();
      if (!client || !admin) throw new Error("auth");
      const steps = await Promise.all([
        client.from("learner_state").delete().eq("user_id", targetId),
        client.from("practice_status").delete().eq("user_id", targetId),
        client.from("bookmarks").delete().eq("user_id", targetId),
      ]);
      const failed = steps.find((step) => step.error);
      if (failed) throw failed.error;
      const { error } = await client.from("audit_log").insert({
        admin_id: admin.id,
        action: "reset_progress",
        target_user_id: targetId,
        detail: {},
      });
      if (error) throw error;
    },
  };
})();
