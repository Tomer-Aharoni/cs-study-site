(function () {
  const PAGES = [
    ["home", "דף הבית"],
    ["learn", "יחידות"],
    ["learn:1", "יחידה 1"],
    ["learn:2", "יחידה 2"],
    ["learn:3", "יחידה 3"],
    ["learn:4", "יחידה 4"],
    ["learn:5", "יחידה 5"],
    ["learn:6", "יחידה 6"],
    ["learn:7", "יחידה 7"],
    ["summary", "סיכום"],
    ["practice", "תרגול"],
    ["search", "חיפוש"],
    ["me", "ההתקדמות שלי"],
    ["admin", "ניהול"],
  ];
  const SIZES = ["sm", "md", "lg", "xl"];
  const PAGE_IDS = new Set(PAGES.map((page) => page[0]));

  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
    );
  }

  function hex(value, fallback) {
    return /^#[0-9a-fA-F]{3}$/.test(value || "") || /^#[0-9a-fA-F]{6}$/.test(value || "") ? value : fallback;
  }

  function normalize(body) {
    const src = body || {};
    const runs = (Array.isArray(src.runs) ? src.runs : [])
      .slice(0, 40)
      .map((run) => ({
        text: String((run && run.text) || "").slice(0, 400),
        bold: !!(run && run.bold),
        italic: !!(run && run.italic),
        underline: !!(run && run.underline),
        size: SIZES.indexOf(run && run.size) >= 0 ? run.size : "md",
      }))
      .filter((run) => run.text);
    const mode = src.mode === "whitelist" || src.mode === "blacklist" ? src.mode : "all";
    return {
      enabled: src.enabled !== false,
      bg: hex(src.bg, "#0f766e"),
      color: hex(src.color, "#ffffff"),
      mode: mode,
      pages: (Array.isArray(src.pages) ? src.pages : []).filter((id) => PAGE_IDS.has(id)),
      runs: runs.length ? runs : [{ text: "", bold: false, italic: false, underline: false, size: "md" }],
    };
  }

  function reset() {
    window.SITE_BANNERS = [];
  }

  function store(row) {
    if (!window.SITE_BANNERS) reset();
    const banner = {
      id: row.id,
      sort: Number(row.sort) || 0,
      body: normalize(row.body),
    };
    const idx = window.SITE_BANNERS.findIndex((item) => item.id === row.id);
    if (idx >= 0) window.SITE_BANNERS[idx] = banner;
    else window.SITE_BANNERS.push(banner);
  }

  function forget(id) {
    if (!window.SITE_BANNERS) return;
    window.SITE_BANNERS = window.SITE_BANNERS.filter((item) => item.id !== id);
  }

  function pageKeys(route) {
    if (!route || route.me) return ["me"];
    if (route.admin) return ["admin"];
    if (route.isHome || !route.course || route.area === "hub") return ["home"];
    if (route.area === "learn" && route.unit) return ["learn", "learn:" + route.unit];
    if (route.area === "learn") return ["learn"];
    if (route.area === "summary") return ["summary"];
    if (route.area === "practice") return ["practice"];
    if (route.area === "search") return ["search"];
    return ["home"];
  }

  function visible(body, route) {
    const banner = normalize(body);
    if (!banner.enabled) return false;
    if (!banner.runs.some((run) => run.text.trim())) return false;
    const keys = pageKeys(route);
    if (banner.mode === "whitelist") return keys.some((key) => banner.pages.indexOf(key) !== -1);
    if (banner.mode === "blacklist") return !keys.some((key) => banner.pages.indexOf(key) !== -1);
    return true;
  }

  function runsHtml(runs) {
    return normalize({ runs: runs }).runs
      .map((run) => {
        const cls = [
          "banner-" + run.size,
          run.bold ? "is-bold" : "",
          run.italic ? "is-italic" : "",
          run.underline ? "is-under" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return `<span class="${cls}">${esc(run.text)}</span>`;
      })
      .join("");
  }

  function html(route) {
    const list = (window.SITE_BANNERS || [])
      .slice()
      .sort((a, b) => a.sort - b.sort || String(a.id).localeCompare(String(b.id)))
      .filter((item) => visible(item.body, route));
    if (!list.length) return "";
    const bars = list
      .map((item) => {
        const banner = normalize(item.body);
        return `<p class="site-banner" style="background:${banner.bg};color:${banner.color}">${runsHtml(banner.runs)}</p>`;
      })
      .join("");
    return `<div class="site-banners">${bars}</div>`;
  }

  function serialize(root) {
    const runs = [];
    function walk(node, marks) {
      if (node.nodeType === 3) {
        if (node.textContent) runs.push(Object.assign({ text: node.textContent }, marks));
        return;
      }
      if (node.nodeType !== 1) return;
      const next = {
        bold: marks.bold || node.tagName === "B" || node.tagName === "STRONG",
        italic: marks.italic || node.tagName === "I" || node.tagName === "EM",
        underline: marks.underline || node.tagName === "U",
        size: (node.dataset && SIZES.indexOf(node.dataset.size) >= 0 && node.dataset.size) || marks.size,
      };
      node.childNodes.forEach((child) => walk(child, next));
    }
    walk(root, { bold: false, italic: false, underline: false, size: "md" });
    const merged = [];
    runs.forEach((run) => {
      const prev = merged[merged.length - 1];
      if (prev && prev.bold === run.bold && prev.italic === run.italic && prev.underline === run.underline && prev.size === run.size) {
        prev.text += run.text;
      } else merged.push(run);
    });
    return normalize({ runs: merged }).runs;
  }

  function fillEditor(root, runs) {
    root.replaceChildren();
    normalize({ runs: runs }).runs.forEach((run) => {
      if (!run.text) return;
      let node = document.createElement("span");
      node.dataset.size = run.size;
      node.textContent = run.text;
      if (run.underline) {
        const wrap = document.createElement("u");
        wrap.appendChild(node);
        node = wrap;
      }
      if (run.italic) {
        const wrap = document.createElement("i");
        wrap.appendChild(node);
        node = wrap;
      }
      if (run.bold) {
        const wrap = document.createElement("b");
        wrap.appendChild(node);
        node = wrap;
      }
      root.appendChild(node);
    });
  }

  function plainTitle(runs) {
    const text = normalize({ runs: runs }).runs.map((run) => run.text).join("").trim();
    return text.slice(0, 80) || "באנר";
  }

  window.CSBanners = {
    pages: function () {
      return PAGES;
    },
    normalize: normalize,
    reset: reset,
    store: store,
    forget: forget,
    html: html,
    serialize: serialize,
    fillEditor: fillEditor,
    plainTitle: plainTitle,
    hex: hex,
    preview: function (body) {
      const banner = normalize(body);
      return `<p class="site-banner" style="background:${banner.bg};color:${banner.color}">${runsHtml(banner.runs)}</p>`;
    },
  };
})();
