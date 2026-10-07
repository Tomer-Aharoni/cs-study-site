/* טוען רק את קבצי התוכן של העמוד הפתוח. שאר הקורס נמשך בכניסה אליו. */
(function () {
  const inflight = new Map();
  const UNITS = {
    "1": {
      main: "data/unit1.js?v=38",
      rest: [],
      interact: "data/unit1-interact.js?v=33",
      quizzes: "UNIT1_QUIZZES",
    },
    "2": {
      main: "data/unit2.js?v=31",
      rest: [
        "data/unit2-part-a.js?v=30",
        "data/unit2-part-b.js?v=30",
        "data/unit2-part-c.js?v=38",
        "data/unit2-part-d.js?v=31",
        "data/unit2-hw.js?v=31",
      ],
      interact: "data/unit2-interact.js?v=37",
      quizzes: "UNIT2_QUIZZES",
    },
    "3": {
      main: "data/unit3.js?v=33",
      rest: [
        "data/unit3-part-a.js?v=31",
        "data/unit3-part-b.js?v=34",
        "data/unit3-part-c.js?v=36",
        "data/unit3-part-d.js?v=34",
      ],
      interact: "data/unit3-interact.js?v=35",
      quizzes: "UNIT3_QUIZZES",
    },
    "4": {
      main: "data/unit4.js?v=30",
      rest: [
        "data/unit4-part-a.js?v=38",
        "data/unit4-part-b.js?v=37",
        "data/unit4-part-c.js?v=36",
        "data/unit4-part-d.js?v=37",
        "data/unit4-hw.js?v=30",
      ],
      interact: "data/unit4-interact.js?v=37",
      quizzes: "UNIT4_QUIZZES",
    },
    "5": {
      main: "data/unit5.js?v=30",
      rest: [
        "data/unit5-part-a.js?v=34",
        "data/unit5-part-b.js?v=37",
        "data/unit5-part-c.js?v=34",
        "data/unit5-part-d.js?v=34",
        "data/unit5-hw.js?v=31",
      ],
      interact: "data/unit5-interact.js?v=35",
      quizzes: "UNIT5_QUIZZES",
    },
    "6": {
      main: "data/unit6.js?v=30",
      rest: ["data/unit6-part-a.js?v=35", "data/unit6-part-b.js?v=33", "data/unit6-part-c.js?v=33"],
      interact: "data/unit6-interact.js?v=33",
      quizzes: "UNIT6_QUIZZES",
    },
    "7": {
      main: "data/unit7.js?v=30",
      rest: [
        "data/unit7-part-a.js?v=31",
        "data/unit7-part-b.js?v=34",
        "data/unit7-part-c.js?v=33",
        "data/unit7-part-d.js?v=36",
        "data/unit7-hw.js?v=31",
      ],
      interact: "data/unit7-interact.js?v=34",
      quizzes: "UNIT7_QUIZZES",
    },
  };
  const VIZ = "data/viz.js?v=30";
  const BANKS = ["data/exam-prep-bank.js?v=34", "data/exam-mc-bank.js?v=1"];
  const EXAMS = ["data/exam-recon.js?v=37", "data/exam-sims.js?v=36", "data/exam-sims-recon.js?v=39"].concat(BANKS);
  const SUMMARY = ["data/summary-prose.js?v=34", "data/summary-detail.js?v=31"];
  const GUIDE = "data/study-guide-notes.js?v=2";
  const SUPABASE = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.8/dist/umd/supabase.js";

  function inject(src) {
    return new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = src;
      el.onload = function () {
        resolve();
      };
      el.onerror = function () {
        reject(new Error(src));
      };
      document.body.appendChild(el);
    });
  }

  function loadOne(src, keys) {
    if (inflight.has(src)) return inflight.get(src);
    const job = (async function () {
      const saved = {};
      (keys || []).forEach((key) => {
        saved[key] = (window[key] || []).slice();
      });
      await inject(src);
      (keys || []).forEach((key) => {
        const now = window[key] || [];
        const ids = new Set(now.map((item) => item && item.id).filter(Boolean));
        saved[key].forEach((item) => {
          if (!item || !item.id || ids.has(item.id)) return;
          now.push(item);
          ids.add(item.id);
        });
        window[key] = now;
      });
      window.__searchStale = true;
    })();
    inflight.set(src, job);
    job.catch(function () {
      inflight.delete(src);
    });
    return job;
  }

  async function loadUnit(id) {
    const unit = UNITS[id];
    if (!unit) return;
    await loadOne(unit.main);
    for (let i = 0; i < unit.rest.length; i += 1) await loadOne(unit.rest[i]);
    await loadOne(unit.interact, [unit.quizzes, "SUMMARY_CARDS"]);
  }

  async function loadUnits(ids) {
    for (let i = 0; i < ids.length; i += 1) await loadUnit(ids[i]);
  }

  async function loadList(urls) {
    for (let i = 0; i < urls.length; i += 1) await loadOne(urls[i]);
  }

  function stepsFor(route) {
    const ids = ["1", "2", "3", "4", "5", "6", "7"];
    if (!route) return [];
    if (route.area === "learn" && route.unit && UNITS[route.unit]) {
      return [{ unit: route.unit }, { src: VIZ }, { list: BANKS }];
    }
    if (route.area === "guide-notes") return [{ src: GUIDE }];
    if (route.area === "summary") return [{ units: ids }, { list: SUMMARY }];
    if (route.area === "practice") return [{ units: ids }, { src: VIZ }, { list: EXAMS }];
    if (route.area === "search" || route.print || route.admin) {
      return [{ units: ids }, { src: VIZ }, { list: SUMMARY }, { list: EXAMS }, { src: GUIDE }];
    }
    return [];
  }

  function missing(route) {
    return stepsFor(route).length > 0 && stepsFor(route).some((step) => {
      if (step.unit) return !inflight.has(UNITS[step.unit].interact);
      if (step.units) return step.units.some((id) => !inflight.has(UNITS[id].interact));
      if (step.list) return step.list.some((src) => !inflight.has(src));
      return !inflight.has(step.src);
    });
  }

  async function ensure(route) {
    const steps = stepsFor(route);
    for (let i = 0; i < steps.length; i += 1) {
      const step = steps[i];
      try {
        if (step.unit) await loadUnit(step.unit);
        else if (step.units) await loadUnits(step.units);
        else if (step.list) await loadList(step.list);
        else await loadOne(step.src);
      } catch (err) {
        /* עמוד חלקי עדיף על מסך ריק */
      }
    }
    if (window.CSContent && CSContent.prepare) CSContent.prepare();
  }

  window.CSPageData = {
    missing: missing,
    ensure: ensure,
    loadSupabase: function () {
      return loadOne(SUPABASE);
    },
  };
})();
