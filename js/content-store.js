(function () {
  let bundled = null;
  let loaded = [];
  let cloudIds = new Set();

  function danger(text) {
    const blob = String(text || "");
    return (
      /<\s*script/i.test(blob) ||
      /<\s*\/\s*script/i.test(blob) ||
      /<\s*iframe/i.test(blob) ||
      /<\s*object/i.test(blob) ||
      /<\s*embed/i.test(blob) ||
      /<\s*link/i.test(blob) ||
      /<\s*meta/i.test(blob) ||
      /<\s*style/i.test(blob) ||
      /javascript\s*:/i.test(blob) ||
      /data\s*:\s*text\/html/i.test(blob) ||
      /\son[a-z]+\s*=/i.test(blob)
    );
  }

  function lesson(id) {
    if (typeof lessonById === "function") return lessonById(id);
    return window["UNIT" + id] || null;
  }

  function quizList(unitId) {
    const key = "UNIT" + unitId + "_QUIZZES";
    if (!window[key]) window[key] = [];
    return window[key];
  }

  function collect() {
    const items = [];
    const course = window.COURSE;
    if (!course) return items;
    items.push({
      id: "course",
      kind: "course",
      unit_id: null,
      sort: 0,
      title: course.name || "",
      html: null,
      body: {
        code: course.code || "",
        blurb: course.blurb || "",
        languages: course.languages || [],
      },
    });
    (course.units || []).forEach((unit, index) => {
      const doc = lesson(unit.id);
      items.push({
        id: "unit:" + unit.id,
        kind: "unit_meta",
        unit_id: unit.id,
        sort: index,
        title: unit.title || "",
        html: null,
        body: {
          blurb: unit.blurb || "",
          hue: unit.hue || "",
          status: unit.status || "ready",
          goals: doc && doc.goals ? doc.goals.slice() : [],
        },
      });
      ((doc && doc.sections) || []).forEach((section, si) => {
        items.push({
          id: "section:" + unit.id + ":" + section.id,
          kind: "section",
          unit_id: unit.id,
          sort: si,
          title: section.title || "",
          html: section.html || "",
          body: {},
        });
      });
    });
    (window.SUMMARY_PROSE || []).forEach((chapter, ci) => {
      items.push({
        id: "summary:" + chapter.unit,
        kind: "summary_unit",
        unit_id: chapter.unit,
        sort: ci,
        title: chapter.title || "",
        html: null,
        body: { intro: chapter.intro || "" },
      });
      (chapter.parts || []).forEach((part, pi) => {
        items.push({
          id: "summary:" + chapter.unit + ":" + part.id,
          kind: "summary_part",
          unit_id: chapter.unit,
          sort: pi,
          title: part.title || "",
          html: part.html || "",
          body: {},
        });
      });
    });
    (window.SUMMARY_CARDS || []).forEach((card, i) => {
      items.push({
        id: "card:" + card.id,
        kind: "card",
        unit_id: card.unit,
        sort: i,
        title: card.title || "",
        html: null,
        body: {
          cardKind: card.kind || "",
          body: card.body || "",
          detail: (window.SUMMARY_DETAIL || {})[card.id] || "",
        },
      });
    });
    (course.units || []).forEach((unit) => {
      quizList(unit.id).forEach((quiz, i) => {
        items.push({
          id: "quiz:" + unit.id + ":" + quiz.id,
          kind: "quiz",
          unit_id: unit.id,
          sort: i,
          title: String(quiz.prompt || "").slice(0, 80),
          html: null,
          body: {
            qid: quiz.id,
            prompt: quiz.prompt || "",
            options: quiz.options || [],
            answer: quiz.answer || "",
            explain: quiz.explain || "",
          },
        });
      });
    });
    (window.EXAM_SIMS || []).forEach((exam, ei) => {
      items.push({
        id: "exam:" + exam.id,
        kind: "exam_meta",
        unit_id: null,
        sort: ei,
        title: exam.title || "",
        html: null,
        body: {
          minutes: exam.minutes || 180,
          pick: exam.pick || 1,
          note: exam.note || "",
        },
      });
      (exam.partA || []).forEach((quiz, i) => {
        items.push({
          id: "exam:" + exam.id + ":a:" + quiz.id,
          kind: "exam_question",
          unit_id: null,
          sort: i,
          title: String(quiz.prompt || "").slice(0, 80),
          html: null,
          body: {
            examId: exam.id,
            part: "A",
            qid: quiz.id,
            prompt: quiz.prompt || "",
            options: quiz.options || [],
            answer: quiz.answer || "",
          },
        });
      });
      (exam.partB || []).forEach((quiz, i) => {
        items.push({
          id: "exam:" + exam.id + ":b:" + quiz.id,
          kind: "exam_question",
          unit_id: null,
          sort: 100 + i,
          title: quiz.title || "",
          html: quiz.proposed || "",
          body: {
            examId: exam.id,
            part: "B",
            qid: quiz.id,
            prompt: quiz.prompt || "",
            hadOfficial: !!quiz.hadOfficial,
            official: quiz.official || "",
            verdictKind: quiz.verdictKind || "new",
            verdict: quiz.verdict || "",
          },
        });
      });
    });
    return items;
  }

  function snapshot() {
    if (!bundled) bundled = JSON.parse(JSON.stringify(collect()));
    return bundled;
  }

  function applyItems(rows) {
    const course = window.COURSE;
    if (!course || !rows) return;
    rows.forEach((row) => {
      const body = row.body || {};
      if (row.kind === "course") {
        if (row.title) course.name = row.title;
        if (body.code) course.code = body.code;
        if (body.blurb != null) course.blurb = body.blurb;
        if (Array.isArray(body.languages)) course.languages = body.languages;
      }
      if (row.kind === "unit_meta") {
        const unit = (course.units || []).find((item) => item.id === row.unit_id);
        if (unit) {
          if (row.title) unit.title = row.title;
          if (body.blurb != null) unit.blurb = body.blurb;
          if (/^#[0-9a-fA-F]{3,8}$/.test(body.hue || "")) unit.hue = body.hue;
          if (body.status === "ready" || body.status === "soon") unit.status = body.status;
        }
        const doc = lesson(row.unit_id);
        if (doc) {
          if (row.title) doc.title = row.title;
          if (Array.isArray(body.goals)) doc.goals = body.goals.slice();
        }
      }
    });

    const sectionRows = rows.filter((row) => row.kind === "section");
    const byUnit = {};
    sectionRows.forEach((row) => {
      (byUnit[row.unit_id] || (byUnit[row.unit_id] = [])).push(row);
    });
    Object.keys(byUnit).forEach((unitId) => {
      const doc = lesson(unitId);
      if (!doc) return;
      if (!doc.sections) doc.sections = [];
      const prefix = "section:" + unitId + ":";
      byUnit[unitId]
        .slice()
        .sort((a, b) => a.sort - b.sort)
        .forEach((row) => {
          const sid = row.id.startsWith(prefix) ? row.id.slice(prefix.length) : "";
          if (!sid) return;
          let found = doc.sections.find((section) => section.id === sid);
          if (!found) {
            found = { id: sid, title: "", html: "" };
            doc.sections.push(found);
          }
          found.title = row.title || found.title;
          found.html = row.html || "";
        });
      const order = byUnit[unitId]
        .slice()
        .sort((a, b) => a.sort - b.sort)
        .map((row) => (row.id.startsWith(prefix) ? row.id.slice(prefix.length) : ""))
        .filter(Boolean);
      if (doc.sections.every((section) => order.indexOf(section.id) !== -1)) {
        doc.sections.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
      }
    });

    rows
      .filter((row) => row.kind === "summary_unit")
      .forEach((row) => {
        const chapter = (window.SUMMARY_PROSE || []).find((item) => item.unit === row.unit_id);
        if (!chapter) return;
        if (row.title) chapter.title = row.title;
        if (row.body && row.body.intro != null) chapter.intro = row.body.intro;
      });
    rows
      .filter((row) => row.kind === "summary_part")
      .forEach((row) => {
        const chapter = (window.SUMMARY_PROSE || []).find((item) => item.unit === row.unit_id);
        if (!chapter) return;
        const prefix = "summary:" + row.unit_id + ":";
        const pid = row.id.startsWith(prefix) ? row.id.slice(prefix.length) : "";
        if (!pid) return;
        if (!chapter.parts) chapter.parts = [];
        let part = chapter.parts.find((item) => item.id === pid);
        if (!part) {
          part = { id: pid, title: "", html: "" };
          chapter.parts.push(part);
        }
        part.title = row.title || part.title;
        part.html = row.html || "";
      });
    const partUnits = {};
    rows
      .filter((row) => row.kind === "summary_part")
      .forEach((row) => {
        (partUnits[row.unit_id] || (partUnits[row.unit_id] = [])).push(row);
      });
    Object.keys(partUnits).forEach((unitId) => {
      const chapter = (window.SUMMARY_PROSE || []).find((item) => item.unit === unitId);
      if (!chapter || !chapter.parts) return;
      const prefix = "summary:" + unitId + ":";
      const order = partUnits[unitId]
        .slice()
        .sort((a, b) => a.sort - b.sort)
        .map((row) => (row.id.startsWith(prefix) ? row.id.slice(prefix.length) : ""))
        .filter(Boolean);
      if (chapter.parts.every((part) => order.indexOf(part.id) !== -1)) {
        chapter.parts.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
      }
    });

    rows
      .filter((row) => row.kind === "card")
      .forEach((row) => {
        const cid = row.id.slice("card:".length);
        const card = (window.SUMMARY_CARDS || []).find((item) => item.id === cid);
        if (card) {
          if (row.title) card.title = row.title;
          if (row.unit_id) card.unit = row.unit_id;
          if (row.body) {
            if (row.body.cardKind) card.kind = row.body.cardKind;
            if (row.body.body != null) card.body = row.body.body;
          }
        }
        if (row.body && row.body.detail != null) {
          if (!window.SUMMARY_DETAIL) window.SUMMARY_DETAIL = {};
          window.SUMMARY_DETAIL[cid] = row.body.detail;
        }
      });

    rows
      .filter((row) => row.kind === "quiz")
      .forEach((row) => {
        const body = row.body || {};
        if (!body.qid) return;
        const list = quizList(row.unit_id);
        let quiz = list.find((item) => item.id === body.qid);
        if (!quiz) {
          quiz = { id: body.qid, prompt: "", options: [], answer: "", explain: "" };
          list.push(quiz);
        }
        quiz.prompt = body.prompt || "";
        quiz.options = Array.isArray(body.options) ? body.options : [];
        quiz.answer = body.answer || "";
        quiz.explain = body.explain || "";
      });

    rows
      .filter((row) => row.kind === "exam_meta")
      .forEach((row) => {
        const eid = row.id.slice("exam:".length);
        const exam = (window.EXAM_SIMS || []).find((item) => item.id === eid);
        if (!exam) return;
        if (row.title) exam.title = row.title;
        const body = row.body || {};
        if (body.minutes) exam.minutes = Number(body.minutes) || exam.minutes;
        if (body.pick) exam.pick = Number(body.pick) || exam.pick;
        if (body.note != null) exam.note = body.note;
      });
    rows
      .filter((row) => row.kind === "exam_question")
      .forEach((row) => {
        const body = row.body || {};
        const exam = (window.EXAM_SIMS || []).find((item) => item.id === body.examId);
        if (!exam || !body.qid) return;
        if (body.part === "A") {
          if (!exam.partA) exam.partA = [];
          let quiz = exam.partA.find((item) => item.id === body.qid);
          if (!quiz) {
            quiz = { id: body.qid, prompt: "", options: [], answer: "" };
            exam.partA.push(quiz);
          }
          quiz.prompt = body.prompt || "";
          quiz.options = Array.isArray(body.options) ? body.options : [];
          quiz.answer = body.answer || "";
        } else {
          if (!exam.partB) exam.partB = [];
          let quiz = exam.partB.find((item) => item.id === body.qid);
          if (!quiz) {
            quiz = { id: body.qid, title: "", prompt: "", proposed: "" };
            exam.partB.push(quiz);
          }
          quiz.title = row.title || quiz.title;
          quiz.prompt = body.prompt || "";
          quiz.hadOfficial = !!body.hadOfficial;
          quiz.official = body.official || "";
          quiz.verdictKind = body.verdictKind || "new";
          quiz.verdict = body.verdict || "";
          quiz.proposed = row.html || "";
        }
      });
  }

  async function fetchAll(client) {
    const page = 400;
    let from = 0;
    const all = [];
    while (true) {
      const { data, error } = await client.from("content_items").select("*").range(from, from + page - 1);
      if (error) throw error;
      const chunk = data || [];
      all.push.apply(all, chunk);
      if (chunk.length < page) break;
      from += page;
    }
    return all;
  }

  function rowFor(item) {
    return {
      id: item.id,
      kind: item.kind,
      unit_id: item.unit_id,
      sort: item.sort || 0,
      title: item.title || "",
      html: item.html,
      body: item.body || {},
    };
  }

  async function writeAudit(action, detail) {
    const client = window.CSAuth && CSAuth.client();
    const user = window.CSAuth && CSAuth.user();
    if (!client || !user) return;
    await client.from("audit_log").insert({
      admin_id: user.id,
      action: action,
      detail: detail || {},
    });
  }

  async function saveItem(item) {
    const client = window.CSAuth && CSAuth.client();
    if (!client) throw new Error("no client");
    const blob = (item.title || "") + " " + (item.html || "") + " " + JSON.stringify(item.body || {});
    if (danger(blob)) throw new Error("html rejected");
    const row = rowFor(item);
    const { error } = await client.from("content_items").upsert(row);
    if (error) throw error;
    cloudIds.add(item.id);
    const idx = loaded.findIndex((entry) => entry.id === item.id);
    if (idx >= 0) loaded[idx] = row;
    else loaded.push(row);
    applyItems([row]);
    await writeAudit("edit_content", { id: item.id, kind: item.kind });
  }

  async function importMissing() {
    const client = window.CSAuth && CSAuth.client();
    if (!client) throw new Error("no client");
    const fresh = snapshot().filter((item) => !cloudIds.has(item.id));
    const size = 30;
    for (let i = 0; i < fresh.length; i += size) {
      const chunk = fresh.slice(i, i + size).map(rowFor);
      const { error } = await client.from("content_items").upsert(chunk);
      if (error) throw error;
      chunk.forEach((row) => {
        cloudIds.add(row.id);
        loaded.push(row);
      });
    }
    if (fresh.length) {
      applyItems(fresh.map(rowFor));
      await writeAudit("import_content", { count: fresh.length });
    }
    return fresh.length;
  }

  async function boot() {
    snapshot();
    if (!window.CSAuth || !CSAuth.enabled()) return;
    await CSAuth.ready;
    const client = CSAuth.client();
    if (!client) return;
    try {
      loaded = await fetchAll(client);
      cloudIds = new Set(loaded.map((row) => row.id));
      applyItems(loaded);
    } catch (err) {
      loaded = [];
      cloudIds = new Set();
    }
  }

  function catalog() {
    const map = new Map();
    snapshot().forEach((item) => map.set(item.id, item));
    loaded.forEach((item) => map.set(item.id, item));
    return Array.from(map.values());
  }

  window.CSContent = {
    boot: boot,
    danger: danger,
    catalog: catalog,
    bundledItem: function (id) {
      return snapshot().find((item) => item.id === id) || null;
    },
    isCloud: function (id) {
      return cloudIds.has(id);
    },
    saveItem: saveItem,
    importMissing: importMissing,
    item: function (id) {
      return catalog().find((item) => item.id === id) || null;
    },
  };
})();
