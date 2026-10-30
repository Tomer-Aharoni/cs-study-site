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
  const LEGACY_IDS = ["1", "2", "3", "4", "5", "6", "7"];
  const SUPABASE = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.49.8/dist/umd/supabase.js";

  function manifest() {
    if (window.COURSE_DATA) return window.COURSE_DATA;
    return {
      units: UNITS,
      viz: VIZ,
      banks: BANKS,
      exams: EXAMS,
      summary: SUMMARY,
      guide: GUIDE,
    };
  }

  function unitSpec(id) {
    const units = manifest().units || {};
    return units[id] || null;
  }

  function activeIds() {
    if (!window.COURSE_DATA) return LEGACY_IDS.slice();
    return ((window.COURSE && COURSE.units) || []).map((unit) => String(unit.id));
  }

  function listed(value) {
    return Array.isArray(value) ? value.filter(Boolean) : [];
  }

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
    if (!src) return Promise.resolve();
    if (inflight.has(src)) return inflight.get(src);
    const keep = (keys || []).filter(Boolean);
    const job = (async function () {
      const saved = {};
      keep.forEach((key) => {
        saved[key] = (window[key] || []).slice();
      });
      await inject(src);
      keep.forEach((key) => {
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

  async function loadOptional(src, keys) {
    try {
      await loadOne(src, keys);
    } catch (err) {
      if (!window.COURSE_DATA) throw err;
    }
  }

  async function loadUnit(id) {
    const unit = unitSpec(id);
    if (!unit) return;
    if (unit.main) await loadOptional(unit.main);
    const rest = unit.rest || [];
    for (let i = 0; i < rest.length; i += 1) await loadOptional(rest[i]);
    if (!unit.interact) return;
    await loadOptional(unit.interact, [unit.quizzes, "SUMMARY_CARDS"]);
  }

  async function loadUnits(ids) {
    for (let i = 0; i < ids.length; i += 1) await loadUnit(ids[i]);
  }

  async function loadList(urls) {
    for (let i = 0; i < urls.length; i += 1) await loadOptional(urls[i]);
  }

  function stepsFor(route) {
    const data = manifest();
    const ids = activeIds();
    const banks = listed(data.banks);
    const exams = listed(data.exams);
    const summary = listed(data.summary);
    if (!route) return [];
    if (route.area === "learn" && route.unit && unitSpec(route.unit)) {
      const steps = [{ unit: route.unit }];
      if (data.viz) steps.push({ src: data.viz });
      if (banks.length) steps.push({ list: banks });
      return steps;
    }
    if (route.area === "guide-notes") return data.guide ? [{ src: data.guide }] : [];
    if (route.area === "summary") {
      const steps = [{ units: ids }];
      if (summary.length) steps.push({ list: summary });
      return steps;
    }
    if (route.area === "practice") {
      const steps = [{ units: ids }];
      if (data.viz) steps.push({ src: data.viz });
      if (exams.length) steps.push({ list: exams });
      return steps;
    }
    if (route.area === "search" || route.print || route.admin) {
      const steps = [{ units: ids }];
      if (data.viz) steps.push({ src: data.viz });
      if (summary.length) steps.push({ list: summary });
      if (exams.length) steps.push({ list: exams });
      if (data.guide) steps.push({ src: data.guide });
      return steps;
    }
    return [];
  }

  function missing(route) {
    const steps = stepsFor(route);
    return steps.length > 0 && steps.some((step) => {
      if (step.unit) {
        const spec = unitSpec(step.unit);
        return !!(spec && spec.interact && !inflight.has(spec.interact));
      }
      if (step.units) {
        return step.units.some((id) => {
          const spec = unitSpec(id);
          return !!(spec && spec.interact && !inflight.has(spec.interact));
        });
      }
      if (step.list) return step.list.some((src) => src && !inflight.has(src));
      return !!(step.src && !inflight.has(step.src));
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
        else if (step.src) await loadOne(step.src);
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
