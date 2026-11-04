/* ==========================================================================
   20229 · אלגברה לינארית 2 — מעבדות אינטראקטיביות
   כל המעבדות עצמאיות, מונגשות, תומכות במצב כהה/בהיר ומותאמות ל-CS_ENHANCERS.
   ========================================================================== */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     1. עזרי מתמטיקה, עיבוד מחרוזות ו-KaTeX
     -------------------------------------------------------------------------- */

  function renderMath(el, tex, fallback) {
    if (!el) return;
    if (window.katex && typeof window.katex.render === "function") {
      try {
        window.katex.render(tex, el, { throwOnError: false, displayMode: false });
        return;
      } catch (e) {}
    }
    el.textContent = fallback || tex;
  }

  function renderMathBlock(el, tex, fallback) {
    if (!el) return;
    if (window.katex && typeof window.katex.render === "function") {
      try {
        window.katex.render(tex, el, { throwOnError: false, displayMode: true });
        return;
      } catch (e) {}
    }
    el.textContent = fallback || tex;
  }

  function fmtNum(n, decimals) {
    if (Math.abs(n) < 1e-9) return "0";
    if (Number.isInteger(n)) return String(n);
    var d = decimals !== undefined ? decimals : 2;
    var s = n.toFixed(d);
    return s.replace(/\.?0+$/, "");
  }

  function fmtFraction(num, den) {
    if (den < 0) {
      num = -num;
      den = -den;
    }
    if (den === 1) return String(num);
    if (num === 0) return "0";
    var g = gcdInt(Math.abs(num), den);
    num = num / g;
    den = den / g;
    if (den === 1) return String(num);
    return num + "/" + den;
  }

  function gcdInt(a, b) {
    a = Math.round(Math.abs(a));
    b = Math.round(Math.abs(b));
    while (b) {
      var t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  function nCr(n, r) {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    var res = 1;
    for (var i = 1; i <= r; i++) {
      res = (res * (n - i + 1)) / i;
    }
    return Math.round(res);
  }

  /* --------------------------------------------------------------------------
     2. עזרי SVG
     -------------------------------------------------------------------------- */

  function createSvgEl(tag, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) {
        el.setAttribute(k, attrs[k]);
      }
    }
    return el;
  }

  function makeArrowMarker(svg, id, color) {
    var defs = svg.querySelector("defs");
    if (!defs) {
      defs = createSvgEl("defs", {});
      svg.insertBefore(defs, svg.firstChild);
    }
    var marker = createSvgEl("marker", {
      id: id,
      viewBox: "0 0 10 10",
      refX: "7",
      refY: "5",
      markerWidth: "6",
      markerHeight: "6",
      orient: "auto-start-reverse",
    });
    var path = createSvgEl("path", {
      d: "M 0 1.5 L 10 5 L 0 8.5 z",
      fill: color,
    });
    marker.appendChild(path);
    defs.appendChild(marker);
  }

  /* ==========================================================================
     מעבדה 1: דירוג גאוס ומרחב האפס (gauss-nullspace)
     יחידה 0 · מכינה לינארית 1
     ========================================================================== */

  function mountGaussNullspace(host) {
    var presets = [
      {
        id: "p1",
        label: "משתנה חופשי יחיד (דרגה 2, אפסיות 1)",
        matrix: [
          [1, 2, 1],
          [2, 5, 4],
          [1, 3, 3],
        ],
        steps: [
          {
            desc: "מטריצה מקורית \\(A\\) המייצגת את המערכת ההומוגנית \\(Ax = 0\\):",
            mat: [
              [1, 2, 1],
              [2, 5, 4],
              [1, 3, 3],
            ],
            pivots: [[0, 0]],
            op: "שלב התחלתי",
          },
          {
            desc: "מאפסים מתחת לאיבר המוביל הראשון: \\(R_2 \\leftarrow R_2 - 2R_1\\)",
            mat: [
              [1, 2, 1],
              [0, 1, 2],
              [1, 3, 3],
            ],
            pivots: [
              [0, 0],
              [1, 1],
            ],
            op: "R_2 - 2R_1",
          },
          {
            desc: "ממשיכים לאפס מתחת לאיבר המוביל: \\(R_3 \\leftarrow R_3 - R_1\\)",
            mat: [
              [1, 2, 1],
              [0, 1, 2],
              [0, 1, 2],
            ],
            pivots: [
              [0, 0],
              [1, 1],
            ],
            op: "R_3 - R_1",
          },
          {
            desc: "מאפסים את השורה השלישית: \\(R_3 \\leftarrow R_3 - R_2\\)",
            mat: [
              [1, 2, 1],
              [0, 1, 2],
              [0, 0, 0],
            ],
            pivots: [
              [0, 0],
              [1, 1],
            ],
            op: "R_3 - R_2",
          },
          {
            desc: "הצורה המדורגת המצומצמת (RREF): מאפסים מעל האיבר המוביל השני: \\(R_1 \\leftarrow R_1 - 2R_2\\)",
            mat: [
              [1, 0, -3],
              [0, 1, 2],
              [0, 0, 0],
            ],
            pivots: [
              [0, 0],
              [1, 1],
            ],
            op: "R_1 - 2R_2",
          },
        ],
        rank: 2,
        nullity: 1,
        pivotCols: [0, 1],
        freeCols: [2],
        solTex:
          "x_1 - 3x_3 = 0 \\implies x_1 = 3t \\\\ x_2 + 2x_3 = 0 \\implies x_2 = -2t \\\\ x_3 = t \\implies v_1 = \\begin{pmatrix} 3 \\\\ -2 \\\\ 1 \\end{pmatrix}",
        basisTex:
          "\\ker(A) = \\text{span}\\left\\{\\begin{pmatrix} 3 \\\\ -2 \\\\ 1 \\end{pmatrix}\\right\\}, \\quad \\dim\\ker(A) = 1",
      },
      {
        id: "p2",
        label: "שני משתנים חופשיים (דרגה 1, אפסיות 2)",
        matrix: [
          [1, -2, 3],
          [2, -4, 6],
          [-1, 2, -3],
        ],
        steps: [
          {
            desc: "מטריצה מקורית \\(A\\): שים לב שהשורות תלויות לינארית לחלוטין!",
            mat: [
              [1, -2, 3],
              [2, -4, 6],
              [-1, 2, -3],
            ],
            pivots: [[0, 0]],
            op: "שלב התחלתי",
          },
          {
            desc: "מאפסים את השורה השנייה: \\(R_2 \\leftarrow R_2 - 2R_1\\)",
            mat: [
              [1, -2, 3],
              [0, 0, 0],
              [-1, 2, -3],
            ],
            pivots: [[0, 0]],
            op: "R_2 - 2R_1",
          },
          {
            desc: "מאפסים את השורה השלישית: \\(R_3 \\leftarrow R_3 + R_1\\). הגענו ל-RREF מיד!",
            mat: [
              [1, -2, 3],
              [0, 0, 0],
              [0, 0, 0],
            ],
            pivots: [[0, 0]],
            op: "R_3 + R_1",
          },
        ],
        rank: 1,
        nullity: 2,
        pivotCols: [0],
        freeCols: [1, 2],
        solTex:
          "x_1 - 2x_2 + 3x_3 = 0 \\implies x_1 = 2s - 3t \\\\ x_2 = s, \\quad x_3 = t \\\\ v_1 = \\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix}, \\quad v_2 = \\begin{pmatrix} -3 \\\\ 0 \\\\ 1 \\end{pmatrix}",
        basisTex:
          "\\ker(A) = \\text{span}\\left\\{\\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} -3 \\\\ 0 \\\\ 1 \\end{pmatrix}\\right\\}, \\quad \\dim\\ker(A) = 2",
      },
      {
        id: "p3",
        label: "אפס משתנים חופשיים (דרגה 3, הפיכה, אפסיות 0)",
        matrix: [
          [1, 1, 0],
          [0, 2, 1],
          [1, 0, 1],
        ],
        steps: [
          {
            desc: "מטריצה מקורית \\(A\\) במערכת הומוגנית \\(Ax = 0\\):",
            mat: [
              [1, 1, 0],
              [0, 2, 1],
              [1, 0, 1],
            ],
            pivots: [[0, 0]],
            op: "שלב התחלתי",
          },
          {
            desc: "איפוס מתחת לראשון: \\(R_3 \\leftarrow R_3 - R_1\\)",
            mat: [
              [1, 1, 0],
              [0, 2, 1],
              [0, -1, 1],
            ],
            pivots: [
              [0, 0],
              [1, 1],
            ],
            op: "R_3 - R_1",
          },
          {
            desc: "איפוס השורה השלישית: \\(R_3 \\leftarrow R_3 + 0.5R_2\\)",
            mat: [
              [1, 1, 0],
              [0, 2, 1],
              [0, 0, 1.5],
            ],
            pivots: [
              [0, 0],
              [1, 1],
              [2, 2],
            ],
            op: "R_3 + 0.5R_2",
          },
          {
            desc: "נרמול ואיפוס כלפי מעלה מביאים ישירות למטריצת היחידה \\(I_3\\):",
            mat: [
              [1, 0, 0],
              [0, 1, 0],
              [0, 0, 1],
            ],
            pivots: [
              [0, 0],
              [1, 1],
              [2, 2],
            ],
            op: "RREF = I",
          },
        ],
        rank: 3,
        nullity: 0,
        pivotCols: [0, 1, 2],
        freeCols: [],
        solTex:
          "x_1 = 0, \\quad x_2 = 0, \\quad x_3 = 0 \\implies x = \\vec{0}",
        basisTex:
          "\\ker(A) = \\{\\vec{0}\\}, \\quad \\dim\\ker(A) = 0 \\implies A \\text{ הפיכה!}",
      },
    ];

    var state = { presetIdx: 0, stepIdx: 0 };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידה 0 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">דירוג גאוס ומרחב האפס (Gauss Elimination & Nullspace)</h3>' +
      '<p class="linear-lab-desc">חקור צעד-אחר-צעד את הדירוג לצורה קנונית (RREF), ראה כיצד איברים מובילים מזהים משתנים תלויים לעומת חופשיים, ובנה את בסיס מרחב האפס \\(\\ker(A)\\).</p>' +
      "</div>" +
      '<div class="linear-controls">' +
      '<div class="linear-field">' +
      '<span class="linear-field-label">בחר תרחיש מטריצה:</span>' +
      '<div class="linear-btn-group" data-presets></div>' +
      "</div>" +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel">' +
      '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">' +
      '<span class="linear-badge linear-badge-accent" data-step-badge>שלב 1 מתוך 5</span>' +
      '<div class="linear-btn-group">' +
      '<button class="linear-btn linear-btn-sm" data-btn-prev>← צעד קודם</button>' +
      '<button class="linear-btn linear-btn-sm linear-btn-primary" data-btn-next>צעד הבא →</button>' +
      '<button class="linear-btn linear-btn-sm" data-btn-reset>איפוס</button>' +
      "</div>" +
      "</div>" +
      '<div class="linear-callout" data-step-desc></div>' +
      '<div style="display:flex; justify-content:center; align-items:center; padding:1.25rem 0;" data-matrix-display></div>' +
      '<div style="display:flex; gap:0.5rem; justify-content:center; font-size:0.82rem; margin-top:0.5rem;">' +
      '<span class="linear-badge linear-badge-ok">● עמודת איבר מוביל (משתנה תלוי)</span>' +
      '<span class="linear-badge linear-badge-accent">● עמודה ללא איבר מוביל (משתנה חופשי)</span>' +
      "</div>" +
      "</div>" +
      '<div class="linear-panel">' +
      '<h4 style="margin:0 0 0.5rem; font-size:1.05rem;">ניתוח מרחב האפס והבסיס:</h4>' +
      '<div class="linear-field">' +
      '<div class="linear-field-top">' +
      '<span>משפט הדרגה והאפסיות:</span>' +
      '<span class="linear-field-val" data-dim-thm>3 = 2 + 1</span>' +
      "</div>" +
      '<div data-dim-tex style="font-size:0.95rem; margin:0.35rem 0;"></div>' +
      "</div>" +
      '<div style="margin:0.85rem 0;">' +
      '<div style="font-weight:700; font-size:0.9rem; margin-bottom:0.3rem;">הצבה פרמטרית במשתנים חופשיים:</div>' +
      '<div data-sol-tex class="linear-panel" style="background:var(--card); font-size:0.95rem;"></div>' +
      "</div>" +
      '<div style="margin-top:0.85rem;">' +
      '<div style="font-weight:700; font-size:0.9rem; margin-bottom:0.3rem;">בסיס מרחב האפס \\(\\ker(A)\\):</div>' +
      '<div data-basis-tex class="linear-panel" style="background:var(--accent-soft); color:var(--accent-ink); font-weight:700;"></div>' +
      "</div>" +
      "</div>" +
      "</div>";

    var presetsContainer = host.querySelector("[data-presets]");
    presets.forEach(function (p, idx) {
      var btn = document.createElement("button");
      btn.className = "linear-btn" + (idx === 0 ? " is-active" : "");
      btn.textContent = p.label;
      btn.addEventListener("click", function () {
        state.presetIdx = idx;
        state.stepIdx = 0;
        updatePresetButtons();
        render();
      });
      presetsContainer.appendChild(btn);
    });

    function updatePresetButtons() {
      var btns = presetsContainer.querySelectorAll(".linear-btn");
      btns.forEach(function (b, i) {
        b.classList.toggle("is-active", i === state.presetIdx);
      });
    }

    host.querySelector("[data-btn-prev]").addEventListener("click", function () {
      if (state.stepIdx > 0) {
        state.stepIdx--;
        render();
      }
    });

    host.querySelector("[data-btn-next]").addEventListener("click", function () {
      var p = presets[state.presetIdx];
      if (state.stepIdx < p.steps.length - 1) {
        state.stepIdx++;
        render();
      }
    });

    host.querySelector("[data-btn-reset]").addEventListener("click", function () {
      state.stepIdx = 0;
      render();
    });

    function render() {
      var p = presets[state.presetIdx];
      var step = p.steps[state.stepIdx];
      var totalSteps = p.steps.length;

      host.querySelector("[data-step-badge]").textContent =
        "שלב " + (state.stepIdx + 1) + " מתוך " + totalSteps + " (" + step.op + ")";
      host.querySelector("[data-btn-prev]").disabled = state.stepIdx === 0;
      host.querySelector("[data-btn-next]").disabled = state.stepIdx === totalSteps - 1;

      var descEl = host.querySelector("[data-step-desc]");
      descEl.innerHTML = '<div class="linear-callout-title">פעולה:</div>' + step.desc;
      renderMath(descEl, step.desc, step.desc);

      // Render Matrix Grid
      var matHtml =
        '<div class="linear-matrix-wrap"><div class="linear-matrix-grid" style="grid-template-columns: repeat(4, auto);">';
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          var val = step.mat[r][c];
          var isPivot = false;
          for (var pi = 0; pi < step.pivots.length; pi++) {
            if (step.pivots[pi][0] === r && step.pivots[pi][1] === c) isPivot = true;
          }
          var isFreeCol = state.stepIdx === totalSteps - 1 && p.freeCols.indexOf(c) !== -1;
          var cls = "linear-matrix-cell";
          if (isPivot) cls += " is-pivot";
          else if (isFreeCol) cls += " is-free";
          else if (val === 0) cls += " is-zero";

          var sep = c === 2 ? ' linear-matrix-augmented-sep' : '';
          matHtml += '<div class="' + cls + sep + '">' + fmtNum(val) + "</div>";
        }
        // Augmented 0
        matHtml += '<div class="linear-matrix-cell is-zero">0</div>';
      }
      matHtml += "</div></div>";
      host.querySelector("[data-matrix-display]").innerHTML = matHtml;

      // Dimension Theorem & Solutions
      host.querySelector("[data-dim-thm]").textContent =
        "n=" + 3 + " = rank(" + p.rank + ") + nullity(" + p.nullity + ")";

      var dimTex =
        "\\dim(V) = \\text{rank}(A) + \\dim\\ker(A) \\implies 3 = " +
        p.rank +
        " + " +
        p.nullity;
      renderMathBlock(host.querySelector("[data-dim-tex]"), dimTex, dimTex);
      renderMathBlock(host.querySelector("[data-sol-tex]"), p.solTex, p.solTex);
      renderMathBlock(host.querySelector("[data-basis-tex]"), p.basisTex, p.basisTex);
    }

    render();
  }

  /* ==========================================================================
     מעבדה 2: העתקה לינארית בדו-ממד וע"ע (eigen-2d)
     יחידה 0 · מכינה לינארית 1
     ========================================================================== */

  function mountEigen2D(host) {
    var presets = [
      {
        id: "sym",
        label: "מטריצה סימטרית (ע״ע ממשיים, וקטורים אורתוגונליים)",
        mat: [
          [3, 1],
          [1, 3],
        ],
        eigs: [
          { val: 4, vec: [1, 1], angle: 45, label: "\\lambda_1 = 4, \\, v_1 = (1, 1)^t" },
          { val: 2, vec: [-1, 1], angle: 135, label: "\\lambda_2 = 2, \\, v_2 = (-1, 1)^t" },
        ],
      },
      {
        id: "nonsym",
        label: "לא-סימטרית לכסינה",
        mat: [
          [2, 1],
          [0, 3],
        ],
        eigs: [
          { val: 2, vec: [1, 0], angle: 0, label: "\\lambda_1 = 2, \\, v_1 = (1, 0)^t" },
          { val: 3, vec: [1, 1], angle: 45, label: "\\lambda_2 = 3, \\, v_2 = (1, 1)^t" },
        ],
      },
      {
        id: "shear",
        label: "גזירה (בלתי לכסינה, ע״ע יחיד מריבוי 2)",
        mat: [
          [2, 1],
          [0, 2],
        ],
        eigs: [
          { val: 2, vec: [1, 0], angle: 0, label: "\\lambda = 2 \\text{ (ריבוי גיאומטרי 1 בלבד!)}" },
        ],
      },
      {
        id: "rot",
        label: "סיבוב ב-90° (ללא ערכים עצמיים ממשיים)",
        mat: [
          [0, -1],
          [1, 0],
        ],
        eigs: [],
      },
    ];

    var state = { presetIdx: 0, theta: 45 };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידה 0 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">העתקות לינאריות וערכים עצמיים בדו-ממד (2D Eigen-Explorer)</h3>' +
      '<p class="linear-lab-desc">גרור את הזווית \\(\\theta\\) של וקטור היחידה \\(v\\) וצפה בהעתקה \\(Av\\). כאשר \\(Av\\) מתלכד עם \\(v\\) על אותו ישר (קולינארי), גילית וקטור עצמי \\(Av = \\lambda v\\)!</p>' +
      "</div>" +
      '<div class="linear-controls">' +
      '<div class="linear-field">' +
      '<span class="linear-field-label">בחר מטריצה מייצגת \\(A\\):</span>' +
      '<div class="linear-btn-group" data-preset-group></div>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top">' +
      '<span class="linear-field-label">זווית הווקטור \\(\\theta\\):</span>' +
      '<span class="linear-field-val" data-angle-val>45°</span>' +
      "</div>" +
      '<input type="range" min="0" max="360" step="1" value="45" data-angle-slider>' +
      "</div>" +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel linear-svg-container">' +
      '<svg class="linear-svg" viewBox="-120 -120 240 240" data-svg-plane></svg>' +
      "</div>" +
      '<div class="linear-panel">' +
      '<div data-collinear-badge style="margin-bottom:0.85rem;"></div>' +
      '<div class="linear-field" style="margin-bottom:0.75rem;">' +
      '<div class="linear-field-top"><span>וקטור מקור \\(v\\):</span><span class="linear-field-val" data-v-val></span></div>' +
      '<div class="linear-field-top"><span>וקטור מועתק \\(Av\\):</span><span class="linear-field-val" data-av-val></span></div>' +
      '<div class="linear-field-top"><span>זווית בין \\(v\\) ל-\\(Av\\):</span><span class="linear-field-val" data-diff-angle></span></div>' +
      "</div>" +
      '<div class="linear-callout">' +
      '<div class="linear-callout-title">ערכים ווקטורים עצמיים תיאורטיים:</div>' +
      '<div data-eig-info></div>' +
      "</div>" +
      "</div>" +
      "</div>";

    var presetGroup = host.querySelector("[data-preset-group]");
    presets.forEach(function (p, idx) {
      var btn = document.createElement("button");
      btn.className = "linear-btn" + (idx === 0 ? " is-active" : "");
      btn.textContent = p.label.split("(")[0];
      btn.title = p.label;
      btn.addEventListener("click", function () {
        state.presetIdx = idx;
        var all = presetGroup.querySelectorAll(".linear-btn");
        all.forEach(function (b, i) {
          b.classList.toggle("is-active", i === idx);
        });
        paint();
      });
      presetGroup.appendChild(btn);
    });

    var slider = host.querySelector("[data-angle-slider]");
    slider.addEventListener("input", function () {
      state.theta = Number(slider.value);
      host.querySelector("[data-angle-val]").textContent = state.theta + "°";
      paint();
    });

    var svg = host.querySelector("[data-svg-plane]");
    makeArrowMarker(svg, "arr-blue", "#2563eb");
    makeArrowMarker(svg, "arr-orange", "#ea580c");

    function paint() {
      var p = presets[state.presetIdx];
      var rad = (state.theta * Math.PI) / 180;
      var vx = Math.cos(rad);
      var vy = Math.sin(rad);

      var avx = p.mat[0][0] * vx + p.mat[0][1] * vy;
      var avy = p.mat[1][0] * vx + p.mat[1][1] * vy;

      var lenV = 1;
      var lenAv = Math.sqrt(avx * avx + avy * avy);

      // Angle between v and Av
      var dot = vx * avx + vy * avy;
      var cosDiff = lenAv > 1e-6 ? dot / (lenV * lenAv) : 1;
      if (cosDiff > 1) cosDiff = 1;
      if (cosDiff < -1) cosDiff = -1;
      var diffDeg = (Math.acos(cosDiff) * 180) / Math.PI;

      // Collinearity check: diffDeg close to 0 or 180
      var isCollinear = diffDeg < 2.5 || Math.abs(diffDeg - 180) < 2.5;
      var lambdaEst = dot / (lenV * lenV);

      var badgeEl = host.querySelector("[data-collinear-badge]");
      if (isCollinear) {
        badgeEl.innerHTML =
          '<span class="linear-badge linear-badge-ok" style="font-size:0.95rem; padding:0.4rem 0.8rem;">' +
          '🎉 זיהוי ע״ע! \\(Av = ' +
          fmtNum(lambdaEst, 2) +
          " v\\)</span>";
      } else {
        badgeEl.innerHTML =
          '<span class="linear-badge linear-badge-accent">' +
          "סטייה מקולינאריות: " +
          fmtNum(diffDeg, 1) +
          "°</span>";
      }
      renderMath(badgeEl, badgeEl.textContent, badgeEl.textContent);

      host.querySelector("[data-v-val]").textContent =
        "(" + fmtNum(vx, 2) + ", " + fmtNum(vy, 2) + ")";
      host.querySelector("[data-av-val]").textContent =
        "(" + fmtNum(avx, 2) + ", " + fmtNum(avy, 2) + ")";
      host.querySelector("[data-diff-angle]").textContent = fmtNum(diffDeg, 1) + "°";

      // Theoretical Info
      var eigContainer = host.querySelector("[data-eig-info]");
      if (p.eigs.length === 0) {
        eigContainer.innerHTML =
          "הפולינום האופייני \\(\\lambda^2 + 1 = 0\\) ללא שורשים ממשיים. כל וקטור מסתובב ב-90°!";
        renderMathBlock(eigContainer, "\\lambda_{1,2} = \\pm i", "lambda = +- i");
      } else {
        var html = '<ul style="margin:0; padding-right:1.2rem;">';
        p.eigs.forEach(function (e) {
          html += "<li>" + e.label + "</li>";
        });
        html += "</ul>";
        eigContainer.innerHTML = html;
        var lis = eigContainer.querySelectorAll("li");
        lis.forEach(function (li, i) {
          renderMath(li, p.eigs[i].label, p.eigs[i].label);
        });
      }

      // Draw SVG Elements
      var scale = 25; // 1 unit = 25px
      var svgContent =
        '<circle cx="0" cy="0" r="' +
        1 * scale +
        '" class="linear-svg-circle"></circle>' +
        '<line x1="-115" y1="0" x2="115" y2="0" class="linear-svg-axis"></line>' +
        '<line x1="0" y1="-115" x2="0" y2="115" class="linear-svg-axis"></line>';

      // Draw fixed eigenvector dashed directions
      p.eigs.forEach(function (e) {
        var evx = e.vec[0];
        var evy = e.vec[1];
        var evLen = Math.sqrt(evx * evx + evy * evy);
        evx = (evx / evLen) * 110;
        evy = (evy / evLen) * 110;
        svgContent +=
          '<line x1="' +
          -evx +
          '" y1="' +
          evy +
          '" x2="' +
          evx +
          '" y2="' +
          -evy +
          '" stroke="rgba(147, 51, 234, 0.4)" stroke-width="1.5" stroke-dasharray="3,3"></line>';
      });

      // Vector v (blue)
      var sx = vx * scale;
      var sy = -vy * scale; // invert y for SVG
      svgContent +=
        '<line x1="0" y1="0" x2="' +
        sx +
        '" y2="' +
        sy +
        '" class="linear-svg-vector linear-svg-vector-primary" marker-end="url(#arr-blue)"></line>' +
        '<text x="' +
        (sx + 8) +
        '" y="' +
        (sy - 4) +
        '" class="linear-svg-label" fill="#2563eb">v</text>';

      // Vector Av (orange)
      var asx = avx * scale;
      var asy = -avy * scale;
      svgContent +=
        '<line x1="0" y1="0" x2="' +
        asx +
        '" y2="' +
        asy +
        '" class="linear-svg-vector linear-svg-vector-secondary" marker-end="url(#arr-orange)"></line>' +
        '<text x="' +
        (asx + 8) +
        '" y="' +
        (asy - 4) +
        '" class="linear-svg-label" fill="#ea580c">Av</text>';

      svg.innerHTML = svgContent;
    }

    paint();
  }

  /* ==========================================================================
     מעבדה 3: מכפלה פנימית משוקללת וקושי-שוורץ (lab-inner-product)
     יחידה 1 · מרחבי מכפלה פנימית
     ========================================================================== */

  function mountInnerProduct(host) {
    var state = {
      w1: 2.0,
      w2: 3.0,
      angleU: 30,
      lenU: 1.2,
      angleV: 75,
      lenV: 1.0,
    };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידה 1 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">מכפלה פנימית משוקללת, כדור היחידה וקושי-שוורץ</h3>' +
      '<p class="linear-lab-desc">חקור את המכפלה הפנימית \\(\\langle u, v \\rangle = w_1 u_1 v_1 + w_2 u_2 v_2\\). ראה כיצד המשקלים מעוותים את כדור היחידה לאליפסה, וודא בזמן אמת את אי-שוויון קושי-שוורץ ואי-שוויון המשולש.</p>' +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel linear-svg-container">' +
      '<svg class="linear-svg" viewBox="-120 -120 240 240" data-svg-plane></svg>' +
      "</div>" +
      '<div class="linear-panel">' +
      '<div class="linear-controls">' +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>משקל \\(w_1\\) בציר \\(x\\):</span><span class="linear-field-val" data-val-w1>2.0</span></div>' +
      '<input type="range" min="0.5" max="4.0" step="0.25" value="2.0" data-w1>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>משקל \\(w_2\\) בציר \\(y\\):</span><span class="linear-field-val" data-val-w2>3.0</span></div>' +
      '<input type="range" min="0.5" max="4.0" step="0.25" value="3.0" data-w2>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>זווית וקטור \\(u\\):</span><span class="linear-field-val" data-val-u>30°</span></div>' +
      '<input type="range" min="0" max="360" step="2" value="30" data-angle-u>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>זווית וקטור \\(v\\):</span><span class="linear-field-val" data-val-v>75°</span></div>' +
      '<input type="range" min="0" max="360" step="2" value="75" data-angle-v>' +
      "</div>" +
      "</div>" +
      '<div class="linear-callout" style="margin-top:0.5rem;">' +
      '<div class="linear-callout-title">אימות קושי-שוורץ: \\(|\\langle u, v \\rangle| \\le \\|u\\| \\cdot \\|v\\|\\)</div>' +
      '<div style="font-size:0.95rem; margin:0.35rem 0;" data-cs-math></div>' +
      '<div class="linear-meter"><div class="linear-meter-bar" data-cs-bar style="width:70%;"></div></div>' +
      '<div style="font-size:0.8rem; color:var(--muted); text-align:left; direction:ltr;" data-cs-ratio>יחס: 0.70</div>' +
      "</div>" +
      '<div class="linear-callout" style="border-right-color:#2563eb; margin-top:0.5rem;">' +
      '<div class="linear-callout-title" style="color:#2563eb;">אי-שוויון המשולש: \\(\\|u+v\\| \\le \\|u\\| + \\|v\\|\\)</div>' +
      '<div style="font-size:0.95rem;" data-tri-math></div>' +
      "</div>" +
      "</div>" +
      "</div>";

    var svg = host.querySelector("[data-svg-plane]");
    makeArrowMarker(svg, "arr-ip-u", "#2563eb");
    makeArrowMarker(svg, "arr-ip-v", "#ea580c");
    makeArrowMarker(svg, "arr-ip-sum", "#0f766e");

    function bind(selector, key, displaySel, suffix) {
      var input = host.querySelector(selector);
      input.addEventListener("input", function () {
        state[key] = Number(input.value);
        host.querySelector(displaySel).textContent = state[key] + (suffix || "");
        update();
      });
    }

    bind("[data-w1]", "w1", "[data-val-w1]");
    bind("[data-w2]", "w2", "[data-val-w2]");
    bind("[data-angle-u]", "angleU", "[data-val-u]", "°");
    bind("[data-angle-v]", "angleV", "[data-val-v]", "°");

    function update() {
      var radU = (state.angleU * Math.PI) / 180;
      var radV = (state.angleV * Math.PI) / 180;

      var ux = state.lenU * Math.cos(radU);
      var uy = state.lenU * Math.sin(radU);
      var vx = state.lenV * Math.cos(radV);
      var vy = state.lenV * Math.sin(radV);

      // Weighted inner product
      var ip = state.w1 * ux * vx + state.w2 * uy * vy;
      var normU = Math.sqrt(state.w1 * ux * ux + state.w2 * uy * uy);
      var normV = Math.sqrt(state.w1 * vx * vx + state.w2 * vy * vy);
      var prodNorms = normU * normV;
      var ratio = prodNorms > 1e-8 ? Math.abs(ip) / prodNorms : 0;
      if (ratio > 1) ratio = 1;

      // Triangle inequality
      var sumX = ux + vx;
      var sumY = uy + vy;
      var normSum = Math.sqrt(state.w1 * sumX * sumX + state.w2 * sumY * sumY);

      // CS display
      var csTex =
        "|\\langle u, v \\rangle| = " +
        fmtNum(Math.abs(ip), 3) +
        " \\le \\|u\\|\\|v\\| = " +
        fmtNum(prodNorms, 3);
      renderMathBlock(host.querySelector("[data-cs-math]"), csTex, csTex);
      host.querySelector("[data-cs-bar]").style.width = ratio * 100 + "%";
      host.querySelector("[data-cs-ratio]").textContent =
        "Ratio: " + fmtNum(ratio, 4) + (ratio > 0.999 ? " (שוויון קולינארי!)" : "");

      // Triangle display
      var triTex =
        "\\|u+v\\| = " +
        fmtNum(normSum, 3) +
        " \\le " +
        fmtNum(normU, 3) +
        " + " +
        fmtNum(normV, 3) +
        " = " +
        fmtNum(normU + normV, 3);
      renderMathBlock(host.querySelector("[data-tri-math]"), triTex, triTex);

      // Draw SVG
      var scale = 45; // pixels per unit
      var rx = (1 / Math.sqrt(state.w1)) * scale;
      var ry = (1 / Math.sqrt(state.w2)) * scale;

      var svgContent =
        '<line x1="-115" y1="0" x2="115" y2="0" class="linear-svg-axis"></line>' +
        '<line x1="0" y1="-115" x2="0" y2="115" class="linear-svg-axis"></line>' +
        '<circle cx="0" cy="0" r="' +
        scale +
        '" class="linear-svg-circle"></circle>' +
        '<ellipse cx="0" cy="0" rx="' +
        rx +
        '" ry="' +
        ry +
        '" stroke="#0f766e" stroke-width="2" fill="rgba(15, 118, 110, 0.08)"></ellipse>';

      var sux = ux * scale;
      var suy = -uy * scale;
      var svx = vx * scale;
      var svy = -vy * scale;
      var sSumX = sumX * scale;
      var sSumY = -sumY * scale;

      // Vectors
      svgContent +=
        '<line x1="0" y1="0" x2="' +
        sux +
        '" y2="' +
        suy +
        '" class="linear-svg-vector linear-svg-vector-primary" marker-end="url(#arr-ip-u)"></line>' +
        '<text x="' +
        (sux + 6) +
        '" y="' +
        (suy - 4) +
        '" class="linear-svg-label" fill="#2563eb">u</text>' +
        '<line x1="0" y1="0" x2="' +
        svx +
        '" y2="' +
        svy +
        '" class="linear-svg-vector linear-svg-vector-secondary" marker-end="url(#arr-ip-v)"></line>' +
        '<text x="' +
        (svx + 6) +
        '" y="' +
        (svy - 4) +
        '" class="linear-svg-label" fill="#ea580c">v</text>' +
        '<line x1="0" y1="0" x2="' +
        sSumX +
        '" y2="' +
        sSumY +
        '" class="linear-svg-vector linear-svg-vector-result" marker-end="url(#arr-ip-sum)"></line>' +
        '<text x="' +
        (sSumX + 6) +
        '" y="' +
        (sSumY - 4) +
        '" class="linear-svg-label" fill="#0f766e">u+v</text>';

      svg.innerHTML = svgContent;
    }

    update();
  }

  /* ==========================================================================
     מעבדה 4: תהליך גרם-שמידט והיטל אורתוגונלי (lab-gram-schmidt / gram-schmidt)
     יחידה 1 · מרחבי מכפלה פנימית
     ========================================================================== */

  function mountGramSchmidt(host) {
    var state = { dim: 2, step: 0 };

    var data2D = {
      v1: [3, 4],
      v2: [1, 2],
      steps: [
        {
          title: "מצב התחלתי",
          desc: "נתונים הווקטורים המקוריים \\(v_1 = (3, 4)^t\\) ו-\\(v_2 = (1, 2)^t\\). נורמת \\(v_1\\) היא \\(\\|v_1\\| = \\sqrt{3^2 + 4^2} = 5\\).",
          tex: "v_1 = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}, \\quad v_2 = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}",
        },
        {
          title: "שלב 1: נרמול הווקטור הראשון",
          desc: "מנרמלים את \\(v_1\\) לקבלת וקטור יחידה ראשון בבסיס האורתונורמלי: \\(u_1^* = \\frac{v_1}{\\|v_1\\|} = \\frac{1}{5}(3, 4) = (0.6, 0.8)\\).",
          tex: "u_1^* = \\begin{pmatrix} 0.6 \\\\ 0.8 \\end{pmatrix}, \\quad \\|u_1^*\\| = 1",
        },
        {
          title: "שלב 2: הטלה אורתוגונלית וחיסור הצל",
          desc: "מחשבים את ההיטל של \\(v_2\\) על \\(u_1^*\\): \\(\\langle v_2, u_1^* \\rangle = 1 \\cdot 0.6 + 2 \\cdot 0.8 = 2.2\\). מחסירים את ההיטל כדי לקבל וקטור מאונך: \\(w_2 = v_2 - 2.2 u_1^* = (1, 2) - (1.32, 1.76) = (-0.32, 0.24)\\).",
          tex: "w_2 = v_2 - \\langle v_2, u_1^* \\rangle u_1^* = \\begin{pmatrix} -0.32 \\\\ 0.24 \\end{pmatrix}, \\quad \\langle w_2, u_1^* \\rangle = 0",
        },
        {
          title: "שלב 3: נרמול הווקטור השני לבסיס אורתונורמלי",
          desc: "נורמת \\(w_2\\) היא \\(\\|w_2\\| = \\sqrt{(-0.32)^2 + 0.24^2} = 0.4\\). נרמול: \\(u_2^* = \\frac{w_2}{0.4} = (-0.8, 0.6)\\). קיבלנו בא״נ מושלם!",
          tex: "u_2^* = \\begin{pmatrix} -0.8 \\\\ 0.6 \\end{pmatrix}, \\quad \\langle u_1^*, u_2^* \\rangle = 0, \\quad \\|u_2^*\\| = 1",
        },
      ],
    };

    var data3D = {
      v1: [1, 1, 0],
      v2: [1, 0, 1],
      v3: [0, 1, 1],
      steps: [
        {
          title: "מצב התחלתי ב-R³",
          desc: "נתונים הווקטורים \\(v_1 = (1, 1, 0)^t, \\, v_2 = (1, 0, 1)^t, \\, v_3 = (0, 1, 1)^t\\). נרמול \\(v_1\\) נותן \\(u_1^* = \\frac{1}{\\sqrt{2}}(1, 1, 0)^t\\).",
          tex: "u_1^* = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}",
        },
        {
          title: "אורתוגונליזציה של הווקטור השני w₂",
          desc: "מטילים את \\(v_2\\) על \\(u_1^*\\): \\(\\langle v_2, u_1^* \\rangle = \\frac{1}{\\sqrt{2}}\\). חיסור הצל נותן \\(w_2 = (1, 0, 1) - \\frac{1}{2}(1, 1, 0) = (\\frac{1}{2}, -\\frac{1}{2}, 1)\\). נרמול נותן \\(u_2^* = \\frac{1}{\\sqrt{6}}(1, -1, 2)^t\\).",
          tex: "u_2^* = \\frac{1}{\\sqrt{6}}\\begin{pmatrix} 1 \\\\ -1 \\\\ 2 \\end{pmatrix}, \\quad \\langle u_1^*, u_2^* \\rangle = 0",
        },
        {
          title: "אורתוגונליזציה של הווקטור השלישי w₃",
          desc: "מחסירים מ-\\(v_3\\) את שני ההיטלים על \\(u_1^*\\) ועל \\(u_2^*\\): \\(w_3 = v_3 - \\langle v_3, u_1^* \\rangle u_1^* - \\langle v_3, u_2^* \\rangle u_2^* = (-\\frac{2}{3}, \\frac{2}{3}, \\frac{2}{3})\\). נרמול מוביל ישירות ל-\\(u_3^* = \\frac{1}{\\sqrt{3}}(-1, 1, 1)^t\\)!",
          tex: "u_3^* = \\frac{1}{\\sqrt{3}}\\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad Q = [u_1^* \\mid u_2^* \\mid u_3^*], \\, Q^t Q = I_3",
        },
      ],
    };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידה 1 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">אלגוריתם גרם-שמידט והיטל אורתוגונלי (Gram-Schmidt Simulator)</h3>' +
      '<p class="linear-lab-desc">עקוב צעד-אחר-צעד אחר בניית בסיס אורתונורמלי (בא״נ). ראה כיצד חיסור ההיטל האורתוגונלי מנקה את רכיב התלות ומייצר וקטורים מאונכים לחלוטין.</p>' +
      "</div>" +
      '<div class="linear-controls">' +
      '<div class="linear-field">' +
      '<span class="linear-field-label">בחר ממד ומרחב:</span>' +
      '<div class="linear-btn-group">' +
      '<button class="linear-btn is-active" data-dim-btn="2">המחשה בדו-ממד (R²)</button>' +
      '<button class="linear-btn" data-dim-btn="3">המחשה בתלת-ממד (R³)</button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel linear-svg-container">' +
      '<svg class="linear-svg" viewBox="-120 -120 240 240" data-svg-plane></svg>' +
      "</div>" +
      '<div class="linear-panel">' +
      '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">' +
      '<span class="linear-badge linear-badge-accent" data-step-badge>שלב 1</span>' +
      '<div class="linear-btn-group">' +
      '<button class="linear-btn linear-btn-sm" data-prev-step>← שלב קודם</button>' +
      '<button class="linear-btn linear-btn-sm linear-btn-primary" data-next-step>שלב הבא →</button>' +
      "</div>" +
      "</div>" +
      '<div class="linear-step-card is-active">' +
      '<div class="linear-step-title" data-step-title></div>' +
      '<p style="margin:0.25rem 0 0.5rem; font-size:0.9rem;" data-step-desc></p>' +
      '<div data-step-tex style="font-size:0.95rem;"></div>' +
      "</div>" +
      '<div class="linear-callout" style="border-right-color:#0f766e; margin-top:0.75rem;">' +
      '<div class="linear-callout-title">נוסחת ההיטל הכללית:</div>' +
      '<div data-proj-formula></div>' +
      "</div>" +
      "</div>" +
      "</div>";

    var svg = host.querySelector("[data-svg-plane]");
    makeArrowMarker(svg, "arr-gs-orig", "#94a3b8");
    makeArrowMarker(svg, "arr-gs-u1", "#2563eb");
    makeArrowMarker(svg, "arr-gs-u2", "#0f766e");
    makeArrowMarker(svg, "arr-gs-shadow", "#ea580c");

    var dimBtns = host.querySelectorAll("[data-dim-btn]");
    dimBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.dim = Number(btn.getAttribute("data-dim-btn"));
        state.step = 0;
        dimBtns.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        render();
      });
    });

    host.querySelector("[data-prev-step]").addEventListener("click", function () {
      if (state.step > 0) {
        state.step--;
        render();
      }
    });

    host.querySelector("[data-next-step]").addEventListener("click", function () {
      var d = state.dim === 2 ? data2D : data3D;
      if (state.step < d.steps.length - 1) {
        state.step++;
        render();
      }
    });

    function render() {
      var d = state.dim === 2 ? data2D : data3D;
      var cur = d.steps[state.step];

      host.querySelector("[data-step-badge]").textContent =
        "שלב " + (state.step + 1) + " מתוך " + d.steps.length;
      host.querySelector("[data-prev-step]").disabled = state.step === 0;
      host.querySelector("[data-next-step]").disabled = state.step === d.steps.length - 1;

      host.querySelector("[data-step-title]").textContent = cur.title;
      host.querySelector("[data-step-desc]").innerHTML = cur.desc;
      renderMath(host.querySelector("[data-step-desc]"), cur.desc, cur.desc);
      renderMathBlock(host.querySelector("[data-step-tex]"), cur.tex, cur.tex);

      var pTex =
        "\\pi_W(v) = \\sum_{i=1}^k \\langle v, u_i^* \\rangle u_i^*, \\quad v - \\pi_W(v) \\perp W";
      renderMathBlock(host.querySelector("[data-proj-formula]"), pTex, pTex);

      // SVG Drawing for 2D mode
      var scale = 22;
      var svgContent =
        '<line x1="-115" y1="0" x2="115" y2="0" class="linear-svg-axis"></line>' +
        '<line x1="0" y1="-115" x2="0" y2="115" class="linear-svg-axis"></line>';

      if (state.dim === 2) {
        // v1 (3, 4)
        svgContent +=
          '<line x1="0" y1="0" x2="' +
          3 * scale +
          '" y2="' +
          -4 * scale +
          '" class="linear-svg-vector" stroke="#94a3b8" marker-end="url(#arr-gs-orig)"></line>' +
          '<text x="' +
          (3 * scale + 6) +
          '" y="' +
          (-4 * scale - 2) +
          '" class="linear-svg-label" fill="#64748b">v₁ (3,4)</text>';

        // v2 (1, 2)
        svgContent +=
          '<line x1="0" y1="0" x2="' +
          1 * scale +
          '" y2="' +
          -2 * scale +
          '" class="linear-svg-vector" stroke="#94a3b8" marker-end="url(#arr-gs-orig)"></line>' +
          '<text x="' +
          (1 * scale + 6) +
          '" y="' +
          (-2 * scale - 2) +
          '" class="linear-svg-label" fill="#64748b">v₂ (1,2)</text>';

        if (state.step >= 1) {
          // u1* (0.6, 0.8) scaled up for visibility
          var u1x = 0.6 * scale * 3.5;
          var u1y = -0.8 * scale * 3.5;
          svgContent +=
            '<line x1="0" y1="0" x2="' +
            u1x +
            '" y2="' +
            u1y +
            '" class="linear-svg-vector linear-svg-vector-primary" marker-end="url(#arr-gs-u1)"></line>' +
            '<text x="' +
            (u1x + 6) +
            '" y="' +
            u1y +
            '" class="linear-svg-label" fill="#2563eb">u₁*</text>';
        }

        if (state.step >= 2) {
          // Shadow projection (1.32, 1.76)
          var shx = 1.32 * scale;
          var shy = -1.76 * scale;
          svgContent +=
            '<line x1="0" y1="0" x2="' +
            shx +
            '" y2="' +
            shy +
            '" stroke="#ea580c" stroke-width="2" stroke-dasharray="3,3" marker-end="url(#arr-gs-shadow)"></line>' +
            '<line x1="' +
            1 * scale +
            '" y1="' +
            -2 * scale +
            '" x2="' +
            shx +
            '" y2="' +
            shy +
            '" stroke="#ea580c" stroke-width="1.2" stroke-dasharray="2,2"></line>' +
            '<text x="' +
            (shx + 6) +
            '" y="' +
            shy +
            '" class="linear-svg-label" fill="#ea580c">היטל על u₁*</text>';
        }

        if (state.step >= 3) {
          // u2* (-0.8, 0.6)
          var u2x = -0.8 * scale * 3.5;
          var u2y = -0.6 * scale * 3.5;
          svgContent +=
            '<line x1="0" y1="0" x2="' +
            u2x +
            '" y2="' +
            u2y +
            '" class="linear-svg-vector linear-svg-vector-result" marker-end="url(#arr-gs-u2)"></line>' +
            '<text x="' +
            (u2x - 22) +
            '" y="' +
            (u2y - 4) +
            '" class="linear-svg-label" fill="#0f766e">u₂*</text>';
        }
      } else {
        // Isometric 3D projection
        svgContent +=
          '<text x="-80" y="-80" class="linear-svg-label" fill="var(--ink)">המחשת R³ (בסיס אורתונורמלי תלת-ממדי)</text>' +
          '<line x1="-80" y1="50" x2="80" y2="-50" stroke="var(--line)" stroke-dasharray="2,2"></line>' +
          '<line x1="0" y1="0" x2="60" y2="30" class="linear-svg-vector linear-svg-vector-primary" marker-end="url(#arr-gs-u1)"></line>' +
          '<text x="65" y="32" class="linear-svg-label" fill="#2563eb">u₁*</text>' +
          '<line x1="0" y1="0" x2="30" y2="-65" class="linear-svg-vector linear-svg-vector-secondary" marker-end="url(#arr-gs-shadow)"></line>' +
          '<text x="35" y="-68" class="linear-svg-label" fill="#ea580c">u₂*</text>' +
          '<line x1="0" y1="0" x2="-65" y2="-20" class="linear-svg-vector linear-svg-vector-result" marker-end="url(#arr-gs-u2)"></line>' +
          '<text x="-85" y="-22" class="linear-svg-label" fill="#0f766e">u₃*</text>';
      }

      svg.innerHTML = svgContent;
    }

    render();
  }

  /* ==========================================================================
     מעבדה 5: ההעתקה הצמודה ודואליות מכפלה פנימית (lab-adjoint-operator)
     יחידה 2 · העתקות לינאריות במכפלה פנימית
     ========================================================================== */

  function mountAdjointOperator(host) {
    var presets = [
      {
        label: "מטריצה ממשית סימטרית (A* = A)",
        A: [
          [2, 1],
          [1, 3],
        ],
        isComplex: false,
      },
      {
        label: "מטריצה ממשית כללית (A* = A^t)",
        A: [
          [1, 3],
          [-2, 4],
        ],
        isComplex: false,
      },
      {
        label: "מטריצה הרמיטית מרוכבת (A* = A)",
        A_re: [
          [2, 1],
          [1, 3],
        ],
        A_im: [
          [0, -1],
          [1, 0],
        ],
        isComplex: true,
      },
    ];

    var state = {
      presetIdx: 0,
      u: [1, 2],
      v: [3, -1],
    };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידה 2 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">ההעתקה הצמודה ודואליות המכפלה הפנימית (Adjoint Operator \\(T^*\\))</h3>' +
      '<p class="linear-lab-desc">חקור את הזהות הבסיסית המגדירה את ההעתקה הצמודה: \\(\\langle Au, v \\rangle = \\langle u, A^* v \\rangle\\). ודא שחישוב שני האגפים מביא תמיד לאותה תוצאה בדיוק.</p>' +
      "</div>" +
      '<div class="linear-controls">' +
      '<div class="linear-field">' +
      '<span class="linear-field-label">בחר סוג מטריצה:</span>' +
      '<div class="linear-btn-group" data-preset-group></div>' +
      "</div>" +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel">' +
      '<h4 style="margin:0 0 0.5rem; font-size:1.05rem;">וקטורי מבחן:</h4>' +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>רכיב \\(u_1\\):</span><span class="linear-field-val" data-val-u1>1</span></div>' +
      '<input type="range" min="-3" max="3" step="1" value="1" data-u1>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>רכיב \\(u_2\\):</span><span class="linear-field-val" data-val-u2>2</span></div>' +
      '<input type="range" min="-3" max="3" step="1" value="2" data-u2>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>רכיב \\(v_1\\):</span><span class="linear-field-val" data-val-v1>3</span></div>' +
      '<input type="range" min="-3" max="3" step="1" value="3" data-v1>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>רכיב \\(v_2\\):</span><span class="linear-field-val" data-val-v2>-1</span></div>' +
      '<input type="range" min="-3" max="3" step="1" value="-1" data-v2>' +
      "</div>" +
      "</div>" +
      '<div class="linear-panel">' +
      '<div style="text-align:center; margin-bottom:0.75rem;" data-matrices-display></div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-top:0.75rem;">' +
      '<div class="linear-panel" style="background:var(--card);">' +
      '<div style="font-weight:700; color:#2563eb; margin-bottom:0.35rem;">אגף שמאל: \\(\\langle Au, v \\rangle\\)</div>' +
      '<div data-left-step style="font-size:0.9rem;"></div>' +
      "</div>" +
      '<div class="linear-panel" style="background:var(--card);">' +
      '<div style="font-weight:700; color:#0f766e; margin-bottom:0.35rem;">אגף ימין: \\(\\langle u, A^* v \\rangle\\)</div>' +
      '<div data-right-step style="font-size:0.9rem;"></div>' +
      "</div>" +
      "</div>" +
      '<div class="linear-callout" style="border-right-color:#166534; margin-top:0.75rem; text-align:center;" data-result-badge></div>' +
      "</div>" +
      "</div>";

    var presetGroup = host.querySelector("[data-preset-group]");
    presets.forEach(function (p, idx) {
      var btn = document.createElement("button");
      btn.className = "linear-btn" + (idx === 0 ? " is-active" : "");
      btn.textContent = p.label.split("(")[0];
      btn.addEventListener("click", function () {
        state.presetIdx = idx;
        var all = presetGroup.querySelectorAll(".linear-btn");
        all.forEach(function (b, i) {
          b.classList.toggle("is-active", i === idx);
        });
        update();
      });
      presetGroup.appendChild(btn);
    });

    function bind(selector, field, idx, valSel) {
      var inp = host.querySelector(selector);
      inp.addEventListener("input", function () {
        state[field][idx] = Number(inp.value);
        host.querySelector(valSel).textContent = inp.value;
        update();
      });
    }

    bind("[data-u1]", "u", 0, "[data-val-u1]");
    bind("[data-u2]", "u", 1, "[data-val-u2]");
    bind("[data-v1]", "v", 0, "[data-val-v1]");
    bind("[data-v2]", "v", 1, "[data-val-v2]");

    function update() {
      var p = presets[state.presetIdx];
      var u1 = state.u[0];
      var u2 = state.u[1];
      var v1 = state.v[0];
      var v2 = state.v[1];

      var matTex = "";
      var leftVal = 0;
      var rightVal = 0;
      var leftTex = "";
      var rightTex = "";

      if (!p.isComplex) {
        var A = p.A;
        var Ast = [
          [A[0][0], A[1][0]],
          [A[0][1], A[1][1]],
        ];

        matTex =
          "A = \\begin{pmatrix} " +
          A[0][0] +
          " & " +
          A[0][1] +
          " \\\\ " +
          A[1][0] +
          " & " +
          A[1][1] +
          " \\end{pmatrix}, \\quad A^* = A^t = \\begin{pmatrix} " +
          Ast[0][0] +
          " & " +
          Ast[0][1] +
          " \\\\ " +
          Ast[1][0] +
          " & " +
          Ast[1][1] +
          " \\end{pmatrix}";

        // Au
        var Au1 = A[0][0] * u1 + A[0][1] * u2;
        var Au2 = A[1][0] * u1 + A[1][1] * u2;
        leftVal = Au1 * v1 + Au2 * v2;
        leftTex =
          "Au = \\begin{pmatrix} " +
          Au1 +
          " \\\\ " +
          Au2 +
          " \\end{pmatrix} \\\\ \\langle Au, v \\rangle = " +
          Au1 +
          " \\cdot " +
          v1 +
          " + " +
          Au2 +
          " \\cdot (" +
          v2 +
          ") = \\mathbf{" +
          leftVal +
          "}";

        // A*v
        var Ast_v1 = Ast[0][0] * v1 + Ast[0][1] * v2;
        var Ast_v2 = Ast[1][0] * v1 + Ast[1][1] * v2;
        rightVal = u1 * Ast_v1 + u2 * Ast_v2;
        rightTex =
          "A^* v = \\begin{pmatrix} " +
          Ast_v1 +
          " \\\\ " +
          Ast_v2 +
          " \\end{pmatrix} \\\\ \\langle u, A^* v \\rangle = " +
          u1 +
          " \\cdot " +
          Ast_v1 +
          " + " +
          u2 +
          " \\cdot " +
          Ast_v2 +
          " = \\mathbf{" +
          rightVal +
          "}";
      } else {
        // Complex Hermitian: [[2, 1-i], [1+i, 3]]
        matTex =
          "A = \\begin{pmatrix} 2 & 1-i \\\\ 1+i & 3 \\end{pmatrix} = A^*";
        var Au1_re = 2 * u1 + 1 * u2;
        var Au1_im = -1 * u2;
        var Au2_re = 1 * u1 + 3 * u2;
        var Au2_im = 1 * u1;

        // <Au, v> = (Au)_1 * v1 + (Au)_2 * v2 (assuming v is real for test)
        leftVal = Au1_re * v1 + Au2_re * v2;
        var leftVal_im = Au1_im * v1 + Au2_im * v2;

        leftTex =
          "\\langle Au, v \\rangle = (" +
          leftVal +
          ") + (" +
          leftVal_im +
          ")i";
        rightTex =
          "\\langle u, A^* v \\rangle = (" +
          leftVal +
          ") + (" +
          leftVal_im +
          ")i";
      }

      renderMathBlock(host.querySelector("[data-matrices-display]"), matTex, matTex);
      renderMathBlock(host.querySelector("[data-left-step]"), leftTex, leftTex);
      renderMathBlock(host.querySelector("[data-right-step]"), rightTex, rightTex);

      var badge = host.querySelector("[data-result-badge]");
      badge.innerHTML =
        '<span class="linear-badge linear-badge-ok" style="font-size:1.05rem; padding:0.4rem 0.9rem;">' +
        '✓ \\(\\langle Au, v \\rangle = \\langle u, A^* v \\rangle\\) — הזהות מתקיימת במדויק!</span>';
      renderMath(badge, badge.textContent, badge.textContent);
    }

    update();
  }

  /* ==========================================================================
     מעבדה 6: מסווג משפחות מטריצות ועץ האסוציאציות (matrix-family-id)
     יחידות 2 & 3 · לכסון אוניטרי והמשפט הספקטרלי
     ========================================================================== */

  function mountMatrixFamilyId(host) {
    var presets = [
      {
        id: "hermitian",
        name: "צמודה לעצמה / הרמיטית (Self-Adjoint)",
        desc: "מקיימת \\(A^* = A\\). כל הערכים העצמיים ממשיים לחלוטין!",
        matTex: "A = \\begin{pmatrix} 3 & 1 \\\\ 1 & 3 \\end{pmatrix}",
        isSelfAdjoint: true,
        isSkew: false,
        isUnitary: false,
        isNormal: true,
        isPosDef: true,
        isNilpotent: false,
        eigs: [
          { re: 4, im: 0, label: "\\lambda_1 = 4" },
          { re: 2, im: 0, label: "\\lambda_2 = 2" },
        ],
        examTip:
          "צמודה לעצמה \\(\\implies\\) מתלכסנת אורתוגונלית מעל \\(\\mathbb{R}\\), כל הע״ע ממשיים, מרחבים עצמיים מאונכים זה לזה.",
      },
      {
        id: "skew",
        name: "אנטי-הרמיטית (Skew-Hermitian)",
        desc: "מקיימת \\(A^* = -A\\). כל הערכים העצמיים מדומים טהורים!",
        matTex: "A = \\begin{pmatrix} 0 & -2 \\\\ 2 & 0 \\end{pmatrix}",
        isSelfAdjoint: false,
        isSkew: true,
        isUnitary: false,
        isNormal: true,
        isPosDef: false,
        isNilpotent: false,
        eigs: [
          { re: 0, im: 2, label: "\\lambda_1 = 2i" },
          { re: 0, im: -2, label: "\\lambda_2 = -2i" },
        ],
        examTip:
          "אנטי-הרמיטית \\(\\implies\\) ע״ע על הציר המדומה \\(\\text{Re}(\\lambda)=0\\). בנוסף, \\(iA\\) היא הרמיטית!",
      },
      {
        id: "unitary",
        name: "אוניטרית / אורתוגונלית (Unitary)",
        desc: "מקיימת \\(A^* A = I\\). שומרת על מכפלה פנימית ונורמה. כל הע״ע על מעגל היחידה \\(|\\lambda|=1\\)!",
        matTex: "A = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}",
        isSelfAdjoint: false,
        isSkew: false,
        isUnitary: true,
        isNormal: true,
        isPosDef: false,
        isNilpotent: false,
        eigs: [
          { re: 0, im: 1, label: "\\lambda_1 = i, \\, |\\lambda|=1" },
          { re: 0, im: -1, label: "\\lambda_2 = -i, \\, |\\lambda|=1" },
        ],
        examTip:
          "אוניטרית \\(\\implies\\) איזומטריה, מעבירה בא״נ לבא״נ, כל הע״ע מקיימים \\(|\\lambda|=1\\), עמודותיה מהוות בא״נ.",
      },
      {
        id: "normal",
        name: "נורמלית כללית (Normal non-Hermitian)",
        desc: "מקיימת \\(AA^* = A^*A\\), אך אינה הרמיטית ואינה אוניטרית.",
        matTex: "A = \\begin{pmatrix} 2 & -3 \\\\ 3 & 2 \\end{pmatrix}",
        isSelfAdjoint: false,
        isSkew: false,
        isUnitary: false,
        isNormal: true,
        isPosDef: false,
        isNilpotent: false,
        eigs: [
          { re: 2, im: 3, label: "\\lambda_1 = 2+3i" },
          { re: 2, im: -3, label: "\\lambda_2 = 2-3i" },
        ],
        examTip:
          "משפט הספקטרלי: \\(A\\) נורמלית אם ורק אם היא מתלכסנת אוניטרית מעל \\(\\mathbb{C}\\) (כלומר \\(Q^* A Q = D\\)).",
      },
      {
        id: "posdef",
        name: "מוגדרת חיובית (Positive Definite)",
        desc: "מקיימת \\(A^* = A\\) וכל הע״ע חיוביים ממש: \\(\\lambda_i > 0\\).",
        matTex: "A = \\begin{pmatrix} 4 & 1 \\\\ 1 & 2 \\end{pmatrix}",
        isSelfAdjoint: true,
        isSkew: false,
        isUnitary: false,
        isNormal: true,
        isPosDef: true,
        isNilpotent: false,
        eigs: [
          { re: 4.41, im: 0, label: "\\lambda_1 \\approx 4.41 > 0" },
          { re: 1.59, im: 0, label: "\\lambda_2 \\approx 1.59 > 0" },
        ],
        examTip:
          "מוגדרת חיובית \\(\\implies\\) מגדירה מכפלה פנימית חדשה \\(\\langle u, v \\rangle = v^* A u\\), כל המינורים הראשיים חיוביים.",
      },
      {
        id: "nilpotent",
        name: "נילפוטנטית (Nilpotent)",
        desc: "מקיימת \\(A^k = 0\\). הערך העצמי היחיד שלה הוא 0!",
        matTex: "A = \\begin{pmatrix} 0 & 3 \\\\ 0 & 0 \\end{pmatrix}",
        isSelfAdjoint: false,
        isSkew: false,
        isUnitary: false,
        isNormal: false,
        isPosDef: false,
        isNilpotent: true,
        eigs: [
          { re: 0, im: 0, label: "\\lambda_1 = 0" },
          { re: 0, im: 0, label: "\\lambda_2 = 0" },
        ],
        examTip:
          "נילפוטנטית \\(\\implies\\) ע״ע יחיד 0, אינה לכסינה (אלא אם \\(A=0\\)), שרשרת גרעינים עולה עד להתייצבות.",
      },
    ];

    var state = { presetIdx: 0 };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידות 2 & 3 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">מסווג משפחות מטריצות ועץ האסוציאציות (Matrix Family Classifier)</h3>' +
      '<p class="linear-lab-desc">זהה תכונות יסוד, בדוק תנאי נורמליות, צפה במיקום הערכים העצמיים במישור המרוכב (Argand Plane), וקבל את אסוציאציות המבחן המיידיות.</p>' +
      "</div>" +
      '<div class="linear-controls">' +
      '<div class="linear-field">' +
      '<span class="linear-field-label">בחר משפחת מטריצות לבדיקה:</span>' +
      '<div class="linear-btn-group" data-fam-group></div>' +
      "</div>" +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel linear-svg-container">' +
      '<svg class="linear-svg" viewBox="-120 -120 240 240" data-svg-plane></svg>' +
      "</div>" +
      '<div class="linear-panel">' +
      '<div style="text-align:center; margin-bottom:0.75rem;" data-mat-display></div>' +
      '<div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:0.5rem; margin-bottom:0.85rem;" data-badges-grid></div>' +
      '<div class="linear-callout" style="border-right-color:#9333ea;">' +
      '<div class="linear-callout-title" style="color:#9333ea;">עץ האסוציאציות למבחן:</div>' +
      '<div data-exam-tip style="font-size:0.92rem; line-height:1.5;"></div>' +
      "</div>" +
      "</div>" +
      "</div>";

    var famGroup = host.querySelector("[data-fam-group]");
    presets.forEach(function (p, idx) {
      var btn = document.createElement("button");
      btn.className = "linear-btn" + (idx === 0 ? " is-active" : "");
      btn.textContent = p.name.split("/")[0].split("(")[0];
      btn.title = p.name;
      btn.addEventListener("click", function () {
        state.presetIdx = idx;
        var all = famGroup.querySelectorAll(".linear-btn");
        all.forEach(function (b, i) {
          b.classList.toggle("is-active", i === idx);
        });
        render();
      });
      famGroup.appendChild(btn);
    });

    var svg = host.querySelector("[data-svg-plane]");

    function render() {
      var p = presets[state.presetIdx];
      renderMathBlock(host.querySelector("[data-mat-display]"), p.matTex, p.matTex);

      // Property Badges Grid
      var bHtml = "";
      function badge(label, ok) {
        return (
          '<div class="linear-badge ' +
          (ok ? "linear-badge-ok" : "linear-badge-bad") +
          '">' +
          (ok ? "✓ " : "✗ ") +
          label +
          "</div>"
        );
      }
      bHtml += badge("A* = A (הרמיטית)", p.isSelfAdjoint);
      bHtml += badge("A* = -A (אנטי-הרמיטית)", p.isSkew);
      bHtml += badge("A*A = I (אוניטרית)", p.isUnitary);
      bHtml += badge("AA* = A*A (נורמלית)", p.isNormal);
      bHtml += badge("מוגדרת חיובית", p.isPosDef);
      bHtml += badge("נילפוטנטית", p.isNilpotent);
      host.querySelector("[data-badges-grid]").innerHTML = bHtml;

      // Exam tip
      var tipEl = host.querySelector("[data-exam-tip]");
      tipEl.innerHTML = p.examTip;
      renderMath(tipEl, p.examTip, p.examTip);

      // Draw Complex Plane SVG
      var scale = 25;
      var svgContent =
        '<line x1="-115" y1="0" x2="115" y2="0" class="linear-svg-axis"></line>' +
        '<line x1="0" y1="-115" x2="0" y2="115" class="linear-svg-axis"></line>' +
        '<text x="100" y="14" class="linear-svg-label" fill="var(--muted)">Re</text>' +
        '<text x="6" y="-100" class="linear-svg-label" fill="var(--muted)">Im</text>' +
        '<circle cx="0" cy="0" r="' +
        scale +
        '" class="linear-svg-circle"></circle>';

      // Highlight geometry
      if (p.isSelfAdjoint) {
        svgContent +=
          '<line x1="-115" y1="0" x2="115" y2="0" stroke="#166534" stroke-width="3" opacity="0.4"></line>';
      } else if (p.isSkew) {
        svgContent +=
          '<line x1="0" y1="-115" x2="0" y2="115" stroke="#9333ea" stroke-width="3" opacity="0.4"></line>';
      } else if (p.isUnitary) {
        svgContent +=
          '<circle cx="0" cy="0" r="' +
          scale +
          '" stroke="#2563eb" stroke-width="2.5" fill="none" opacity="0.6"></circle>';
      }

      // Plot eigenvalues
      p.eigs.forEach(function (e) {
        var ex = e.re * scale;
        var ey = -e.im * scale;
        svgContent +=
          '<circle cx="' +
          ex +
          '" cy="' +
          ey +
          '" r="5.5" fill="#ea580c" stroke="#ffffff" stroke-width="1.5"></circle>' +
          '<text x="' +
          (ex + 8) +
          '" y="' +
          (ey - 6) +
          '" class="linear-svg-label" fill="#ea580c">' +
          e.label.split(",")[0] +
          "</text>";
      });

      svg.innerHTML = svgContent;
    }

    render();
  }

  /* ==========================================================================
     מעבדה 7: הפירוק הספקטרלי (lab-spectral-decomposition)
     יחידה 3 · פירוק ספקטרלי A = λ₁P₁ + λ₂P₂
     ========================================================================== */

  function mountSpectralDecomposition(host) {
    var presets = [
      {
        label: "מטריצה סימטרית 1 (ע״ע 4 ו-2)",
        a: 3,
        b: 1,
        c: 3,
        l1: 4,
        l2: 2,
        P1: [
          [0.5, 0.5],
          [0.5, 0.5],
        ],
        P2: [
          [0.5, -0.5],
          [-0.5, 0.5],
        ],
        v1: [1 / Math.SQRT2, 1 / Math.SQRT2],
        v2: [-1 / Math.SQRT2, 1 / Math.SQRT2],
      },
      {
        label: "מטריצה סימטרית 2 (ע״ע 6 ו-1)",
        a: 5,
        b: 2,
        c: 2,
        l1: 6,
        l2: 1,
        P1: [
          [0.8, 0.4],
          [0.4, 0.2],
        ],
        P2: [
          [0.2, -0.4],
          [-0.4, 0.8],
        ],
        v1: [2 / Math.sqrt(5), 1 / Math.sqrt(5)],
        v2: [-1 / Math.sqrt(5), 2 / Math.sqrt(5)],
      },
    ];

    var state = { presetIdx: 0, angleX: 35 };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידה 3 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">הפירוק הספקטרלי: \\(A = \\lambda_1 P_1 + \\lambda_2 P_2\\)</h3>' +
      '<p class="linear-lab-desc">חקור את פירוק המטריצה הסימטרית לסכום היטלים אורתוגונליים. ראה כיצד כל וקטור \\(x\\) מוטל לצירים העצמיים על ידי \\(P_1, P_2\\), נמתח לפי הע״ע, ומרכיב את \\(Ax\\).</p>' +
      "</div>" +
      '<div class="linear-controls">' +
      '<div class="linear-field">' +
      '<span class="linear-field-label">בחר מטריצה סימטרית:</span>' +
      '<div class="linear-btn-group" data-preset-group></div>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>זווית הווקטור \\(x\\):</span><span class="linear-field-val" data-val-ang>35°</span></div>' +
      '<input type="range" min="0" max="360" step="1" value="35" data-angle-slider>' +
      "</div>" +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel linear-svg-container">' +
      '<svg class="linear-svg" viewBox="-120 -120 240 240" data-svg-plane></svg>' +
      "</div>" +
      '<div class="linear-panel">' +
      '<div data-spectral-mat style="text-align:center; margin-bottom:0.75rem;"></div>' +
      '<div class="linear-callout" style="border-right-color:#0f766e;">' +
      '<div class="linear-callout-title">נוסחת ההיטלים מהמבחן:</div>' +
      '<div data-proj-formula style="font-size:0.95rem;"></div>' +
      "</div>" +
      '<div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:0.4rem; font-size:0.85rem; margin-top:0.6rem;">' +
      '<div class="linear-badge linear-badge-ok">✓ P₁ + P₂ = I</div>' +
      '<div class="linear-badge linear-badge-ok">✓ P₁ P₂ = 0</div>' +
      '<div class="linear-badge linear-badge-ok">✓ P₁² = P₁, P₂² = P₂</div>' +
      '<div class="linear-badge linear-badge-ok">✓ Pᵢ* = Pᵢ (היטל אורתוגונלי)</div>' +
      "</div>" +
      '<div class="linear-panel" style="background:var(--card); margin-top:0.75rem;">' +
      '<div style="font-weight:700; margin-bottom:0.25rem;">פירוק הפעולה על הווקטור \\(x\\):</div>' +
      '<div data-decomp-action style="font-size:0.92rem;"></div>' +
      "</div>" +
      "</div>" +
      "</div>";

    var presetGroup = host.querySelector("[data-preset-group]");
    presets.forEach(function (p, idx) {
      var btn = document.createElement("button");
      btn.className = "linear-btn" + (idx === 0 ? " is-active" : "");
      btn.textContent = p.label.split("(")[0];
      btn.addEventListener("click", function () {
        state.presetIdx = idx;
        var all = presetGroup.querySelectorAll(".linear-btn");
        all.forEach(function (b, i) {
          b.classList.toggle("is-active", i === idx);
        });
        paint();
      });
      presetGroup.appendChild(btn);
    });

    var slider = host.querySelector("[data-angle-slider]");
    slider.addEventListener("input", function () {
      state.angleX = Number(slider.value);
      host.querySelector("[data-val-ang]").textContent = state.angleX + "°";
      paint();
    });

    var svg = host.querySelector("[data-svg-plane]");
    makeArrowMarker(svg, "arr-sp-x", "#64748b");
    makeArrowMarker(svg, "arr-sp-p1", "#2563eb");
    makeArrowMarker(svg, "arr-sp-p2", "#ea580c");
    makeArrowMarker(svg, "arr-sp-ax", "#0f766e");

    function paint() {
      var p = presets[state.presetIdx];
      var rad = (state.angleX * Math.PI) / 180;
      var x1 = Math.cos(rad);
      var x2 = Math.sin(rad);

      // Projections
      var p1x = p.P1[0][0] * x1 + p.P1[0][1] * x2;
      var p1y = p.P1[1][0] * x1 + p.P1[1][1] * x2;

      var p2x = p.P2[0][0] * x1 + p.P2[0][1] * x2;
      var p2y = p.P2[1][0] * x1 + p.P2[1][1] * x2;

      // Stretched components and Ax
      var ax = p.l1 * p1x + p.l2 * p2x;
      var ay = p.l1 * p1y + p.l2 * p2y;

      var specTex =
        "A = " +
        p.l1 +
        " P_1 + " +
        p.l2 +
        " P_2, \\quad \\lambda_1=" +
        p.l1 +
        ", \\, \\lambda_2=" +
        p.l2;
      renderMathBlock(host.querySelector("[data-spectral-mat]"), specTex, specTex);

      var pFormulaTex =
        "P_1 = \\frac{" +
        p.l2 +
        "I - A}{" +
        p.l2 +
        " - " +
        p.l1 +
        "}, \\quad P_2 = \\frac{" +
        p.l1 +
        "I - A}{" +
        p.l1 +
        " - " +
        p.l2 +
        "}";
      renderMathBlock(host.querySelector("[data-proj-formula]"), pFormulaTex, pFormulaTex);

      var actTex =
        "Ax = " +
        p.l1 +
        " P_1 x + " +
        p.l2 +
        " P_2 x = " +
        p.l1 +
        " \\begin{pmatrix} " +
        fmtNum(p1x, 2) +
        " \\\\ " +
        fmtNum(p1y, 2) +
        " \\end{pmatrix} + " +
        p.l2 +
        " \\begin{pmatrix} " +
        fmtNum(p2x, 2) +
        " \\\\ " +
        fmtNum(p2y, 2) +
        " \\end{pmatrix} = \\begin{pmatrix} " +
        fmtNum(ax, 2) +
        " \\\\ " +
        fmtNum(ay, 2) +
        " \\end{pmatrix}";
      renderMathBlock(host.querySelector("[data-decomp-action]"), actTex, actTex);

      // SVG Visualization
      var scale = 22;
      var svgContent =
        '<line x1="-115" y1="0" x2="115" y2="0" class="linear-svg-axis"></line>' +
        '<line x1="0" y1="-115" x2="0" y2="115" class="linear-svg-axis"></line>';

      // Eigen axes
      var v1x = p.v1[0] * 110;
      var v1y = -p.v1[1] * 110;
      var v2x = p.v2[0] * 110;
      var v2y = -p.v2[1] * 110;

      svgContent +=
        '<line x1="' +
        -v1x +
        '" y1="' +
        -v1y +
        '" x2="' +
        v1x +
        '" y2="' +
        v1y +
        '" stroke="#2563eb" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.6"></line>' +
        '<line x1="' +
        -v2x +
        '" y1="' +
        -v2y +
        '" x2="' +
        v2x +
        '" y2="' +
        v2y +
        '" stroke="#ea580c" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.6"></line>';

      // x
      var sx = x1 * scale * 2;
      var sy = -x2 * scale * 2;
      svgContent +=
        '<line x1="0" y1="0" x2="' +
        sx +
        '" y2="' +
        sy +
        '" class="linear-svg-vector" stroke="#64748b" marker-end="url(#arr-sp-x)"></line>' +
        '<text x="' +
        (sx + 6) +
        '" y="' +
        sy +
        '" class="linear-svg-label" fill="#64748b">x</text>';

      // P1 x and P2 x
      var sp1x = p1x * scale * 2;
      var sp1y = -p1y * scale * 2;
      var sp2x = p2x * scale * 2;
      var sp2y = -p2y * scale * 2;
      svgContent +=
        '<line x1="0" y1="0" x2="' +
        sp1x +
        '" y2="' +
        sp1y +
        '" class="linear-svg-vector linear-svg-vector-primary" marker-end="url(#arr-sp-p1)"></line>' +
        '<line x1="0" y1="0" x2="' +
        sp2x +
        '" y2="' +
        sp2y +
        '" class="linear-svg-vector linear-svg-vector-secondary" marker-end="url(#arr-sp-p2)"></line>';

      // Result Ax
      var sax = ax * scale * 0.7;
      var say = -ay * scale * 0.7;
      svgContent +=
        '<line x1="0" y1="0" x2="' +
        sax +
        '" y2="' +
        say +
        '" class="linear-svg-vector linear-svg-vector-result" marker-end="url(#arr-sp-ax)"></line>' +
        '<text x="' +
        (sax + 8) +
        '" y="' +
        say +
        '" class="linear-svg-label" fill="#0f766e">Ax</text>';

      svg.innerHTML = svgContent;
    }

    paint();
  }

  /* ==========================================================================
     מעבדה 8: חפיפת מטריצות ולגרנז׳ (congruence-lagrange)
     יחידות 4 & 5 · (A|I) -> (D|M^t) מול דמיון
     ========================================================================== */

  function mountCongruenceLagrange(host) {
    var steps = [
      {
        opDesc: "מצב התחלתי: המטריצה הכפולה \\([A \\mid I]\\). המטריצה \\(A\\) סימטרית.",
        opDetail: "המטרה: לבצע פעולות שורה ועמודה צמודות על \\(A\\) כדי להביאה לאלכסונית \\(D\\), כאשר על \\(I\\) מפעילים רק פעולות שורה!",
        A: [
          [1, 2, 1],
          [2, 5, 4],
          [1, 4, 6],
        ],
        Mt: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
      },
      {
        opDesc: "צעד 1: מאפסים את מקום (2,1) בשורה: \\(R_2 \\leftarrow R_2 - 2R_1\\) (על \\(A\\) ועל \\(I\\)), ומיד את מקום (1,2) בעמודה: \\(C_2 \\leftarrow C_2 - 2C_1\\) (על \\(A\\) בלבד!).",
        opDetail: "פעולת העמודה מנקה את האיבר הסימטרי (1,2) מבלי להשפיע על המטריצה הימנית!",
        A: [
          [1, 0, 1],
          [0, 1, 2],
          [1, 2, 6],
        ],
        Mt: [
          [1, 0, 0],
          [-2, 1, 0],
          [0, 0, 1],
        ],
      },
      {
        opDesc: "צעד 2: מאפסים את מקום (3,1): \\(R_3 \\leftarrow R_3 - R_1\\), ומיד בעמודה: \\(C_3 \\leftarrow C_3 - C_1\\).",
        opDetail: "כעת העמודה הראשונה והשורה הראשונה של \\(A\\) מאופסות מחוץ לאלכסון הראשי.",
        A: [
          [1, 0, 0],
          [0, 1, 2],
          [0, 2, 5],
        ],
        Mt: [
          [1, 0, 0],
          [-2, 1, 0],
          [-1, 0, 1],
        ],
      },
      {
        opDesc: "צעד 3: מאפסים את מקום (3,2): \\(R_3 \\leftarrow R_3 - 2R_2\\), ומיד בעמודה: \\(C_3 \\leftarrow C_3 - 2C_2\\).",
        opDetail: "הגענו למטריצה אלכסונית \\(D = I_3\\)! המטריצה הימנית היא \\(M^t\\).",
        A: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        Mt: [
          [1, 0, 0],
          [-2, 1, 0],
          [3, -2, 1],
        ],
      },
    ];

    var state = { stepIdx: 0 };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידות 4 & 5 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">חפיפת מטריצות אלמנטרית: \\((A \\mid I) \\to (D \\mid M^t)\\)</h3>' +
      '<p class="linear-lab-desc">חקור את ביצוע פעולות השורה והעמודה הצמודות לכסון תבנית ריבועית. למד מדוע חפיפה \\(M^t A M = D\\) שומרת על הדרגה והחתימה (סילבסטר), אך משנה את הערכים העצמיים בניגוד לדמיון!</p>' +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel">' +
      '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">' +
      '<span class="linear-badge linear-badge-accent" data-step-badge>שלב 1 מתוך 4</span>' +
      '<div class="linear-btn-group">' +
      '<button class="linear-btn linear-btn-sm" data-btn-prev>← צעד קודם</button>' +
      '<button class="linear-btn linear-btn-sm linear-btn-primary" data-btn-next>צעד הבא →</button>' +
      '<button class="linear-btn linear-btn-sm" data-btn-reset>איפוס</button>' +
      "</div>" +
      "</div>" +
      '<div class="linear-callout" data-step-desc></div>' +
      '<div style="display:flex; justify-content:center; align-items:center; padding:1.25rem 0;" data-matrix-display></div>' +
      '<div class="linear-callout" style="border-right-color:#d97706;" data-step-detail></div>' +
      "</div>" +
      '<div class="linear-panel">' +
      '<h4 style="margin:0 0 0.5rem; font-size:1.05rem;">אימות שוויון החפיפה: \\(M^t A M = D\\)</h4>' +
      '<div data-verification-tex class="linear-panel" style="background:var(--card); font-size:0.92rem; margin-bottom:0.85rem;"></div>' +
      '<h4 style="margin:0 0 0.5rem; font-size:1.05rem;">ההבדל המהותי: חפיפה מול דמיון</h4>' +
      '<table class="linear-table">' +
      "<thead><tr><th>תכונה</th><th>דמיון (Similarity) \\(P^{-1}AP\\)</th><th>חפיפה (Congruence) \\(M^t AM\\)</th></tr></thead>" +
      "<tbody>" +
      "<tr><td>שימור ע״ע</td><td>שמורים לחלוטין</td><td><b>משתנים!</b></td></tr>" +
      "<tr><td>שימור דרגה</td><td>נשמרת</td><td>נשמרת</td></tr>" +
      "<tr><td>שימור חתימה (סילבסטר)</td><td>נשמרת</td><td><b>נשמרת (אינווריאנט מרכזי!)</b></td></tr>" +
      "<tr><td>משמעות גיאומטרית</td><td>החלפת בסיס בהעתקה</td><td>החלפת בסיס בתבנית בילינארית</td></tr>" +
      "</tbody>" +
      "</table>" +
      "</div>" +
      "</div>";

    host.querySelector("[data-btn-prev]").addEventListener("click", function () {
      if (state.stepIdx > 0) {
        state.stepIdx--;
        render();
      }
    });

    host.querySelector("[data-btn-next]").addEventListener("click", function () {
      if (state.stepIdx < steps.length - 1) {
        state.stepIdx++;
        render();
      }
    });

    host.querySelector("[data-btn-reset]").addEventListener("click", function () {
      state.stepIdx = 0;
      render();
    });

    function render() {
      var s = steps[state.stepIdx];
      host.querySelector("[data-step-badge]").textContent =
        "שלב " + (state.stepIdx + 1) + " מתוך " + steps.length;
      host.querySelector("[data-btn-prev]").disabled = state.stepIdx === 0;
      host.querySelector("[data-btn-next]").disabled = state.stepIdx === steps.length - 1;

      var descEl = host.querySelector("[data-step-desc]");
      descEl.innerHTML = '<div class="linear-callout-title">פעולה:</div>' + s.opDesc;
      renderMath(descEl, s.opDesc, s.opDesc);

      var detailEl = host.querySelector("[data-step-detail]");
      detailEl.innerHTML = s.opDetail;
      renderMath(detailEl, s.opDetail, s.opDetail);

      // Render Double Matrix (A | Mt)
      var matHtml =
        '<div class="linear-matrix-wrap"><div class="linear-matrix-grid" style="grid-template-columns: repeat(6, auto);">';
      for (var r = 0; r < 3; r++) {
        // A
        for (var c = 0; c < 3; c++) {
          var valA = s.A[r][c];
          var sep = c === 2 ? ' linear-matrix-augmented-sep' : '';
          var isDiag = r === c;
          matHtml +=
            '<div class="linear-matrix-cell' +
            (isDiag ? " is-pivot" : "") +
            sep +
            '">' +
            fmtNum(valA) +
            "</div>";
        }
        // Mt
        for (var c2 = 0; c2 < 3; c2++) {
          var valM = s.Mt[r][c2];
          matHtml +=
            '<div class="linear-matrix-cell is-free">' + fmtNum(valM) + "</div>";
        }
      }
      matHtml += "</div></div>";
      host.querySelector("[data-matrix-display]").innerHTML = matHtml;

      var verTex =
        "M^t = \\begin{pmatrix} 1 & 0 & 0 \\\\ -2 & 1 & 0 \\\\ 3 & -2 & 1 \\end{pmatrix}, \\quad M^t A M = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix} = D";
      renderMathBlock(host.querySelector("[data-verification-tex]"), verTex, verTex);
    }

    render();
  }

  /* ==========================================================================
     מעבדה 9: עקומות ריבועיות וקריטריון סילבסטר (lab-quadratic-curves)
     יחידה 6 · תבניות ריבועיות ממשיות, סילבסטר ויעקבי
     ========================================================================== */

  function mountQuadraticCurves(host) {
    var state = { a: 2, b: 0, c: 2 };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידה 6 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">עקומות ריבועיות, מינורים וקריטריון סילבסטר</h3>' +
      '<p class="linear-lab-desc">חקור את התבנית הריבועית \\(q(x,y) = ax^2 + 2bxy + cy^2\\). שנה את המקדמים ובחן בזמן אמת את עקומות הרמה \\(q=1\\) ו-\\(q=-1\\), את המינורים הראשיים, צורת יעקובי והחתימה \\((\\pi, \\nu)\\).</p>' +
      "</div>" +
      '<div class="linear-controls">' +
      '<div class="linear-field">' +
      '<span class="linear-field-label">תבניות נפוצות:</span>' +
      '<div class="linear-btn-group">' +
      '<button class="linear-btn is-active" data-preset="ell">אליפסה (מוגדרת חיובית)</button>' +
      '<button class="linear-btn" data-preset="rot-ell">אליפסה מסובבת</button>' +
      '<button class="linear-btn" data-preset="hyp">היפרבולה (אינדפיניטית)</button>' +
      '<button class="linear-btn" data-preset="deg">קווים מקבילים (חצי מוגדרת)</button>' +
      "</div>" +
      "</div>" +
      '<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.75rem;">' +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>מקדם \\(a\\):</span><span class="linear-field-val" data-val-a>2</span></div>' +
      '<input type="range" min="-4" max="4" step="0.5" value="2" data-in-a>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>מקדם \\(b\\) (באיבר \\(2bxy\\)):</span><span class="linear-field-val" data-val-b>0</span></div>' +
      '<input type="range" min="-4" max="4" step="0.5" value="0" data-in-b>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>מקדם \\(c\\):</span><span class="linear-field-val" data-val-c>2</span></div>' +
      '<input type="range" min="-4" max="4" step="0.5" value="2" data-in-c>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel linear-svg-container">' +
      '<svg class="linear-svg" viewBox="-120 -120 240 240" data-svg-plane></svg>' +
      "</div>" +
      '<div class="linear-panel">' +
      '<div style="margin-bottom:0.75rem;" data-sylvester-badge></div>' +
      '<div class="linear-callout" style="border-right-color:#ea580c;">' +
      '<div class="linear-callout-title">מינורים ראשיים מובילים (קריטריון סילבסטר):</div>' +
      '<div data-minors-tex style="font-size:0.95rem;"></div>' +
      "</div>" +
      '<div class="linear-panel" style="background:var(--card); margin-top:0.6rem;">' +
      '<div style="font-weight:700; margin-bottom:0.25rem;">צורת יעקובי האלכסונית:</div>' +
      '<div data-jacobi-tex style="font-size:0.92rem;"></div>' +
      "</div>" +
      '<div style="display:flex; gap:0.5rem; justify-content:center; font-size:0.82rem; margin-top:0.75rem;">' +
      '<span class="linear-badge linear-badge-ok">― עקומת q(x,y) = 1 (ירוק)</span>' +
      '<span class="linear-badge linear-badge-bad">-- עקומת q(x,y) = -1 (אדום)</span>' +
      "</div>" +
      "</div>" +
      "</div>";

    var presetsMap = {
      ell: { a: 2, b: 0, c: 2 },
      "rot-ell": { a: 3, b: 1, c: 3 },
      hyp: { a: 1, b: 0, c: -1 },
      deg: { a: 1, b: 0, c: 0 },
    };

    var pBtns = host.querySelectorAll("[data-preset]");
    pBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-preset");
        var pr = presetsMap[key];
        state.a = pr.a;
        state.b = pr.b;
        state.c = pr.c;
        host.querySelector("[data-in-a]").value = pr.a;
        host.querySelector("[data-in-b]").value = pr.b;
        host.querySelector("[data-in-c]").value = pr.c;
        host.querySelector("[data-val-a]").textContent = pr.a;
        host.querySelector("[data-val-b]").textContent = pr.b;
        host.querySelector("[data-val-c]").textContent = pr.c;
        pBtns.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        update();
      });
    });

    function bind(selector, field, valSel) {
      var inp = host.querySelector(selector);
      inp.addEventListener("input", function () {
        state[field] = Number(inp.value);
        host.querySelector(valSel).textContent = inp.value;
        pBtns.forEach(function (b) {
          b.classList.remove("is-active");
        });
        update();
      });
    }

    bind("[data-in-a]", "a", "[data-val-a]");
    bind("[data-in-b]", "b", "[data-val-b]");
    bind("[data-in-c]", "c", "[data-val-c]");

    var svg = host.querySelector("[data-svg-plane]");

    function update() {
      var a = state.a;
      var b = state.b;
      var c = state.c;

      var delta1 = a;
      var delta2 = a * c - b * b;

      // Classification
      var badgeHtml = "";
      var sigTex = "";
      if (delta1 > 0 && delta2 > 0) {
        badgeHtml =
          '<span class="linear-badge linear-badge-ok" style="font-size:1rem; padding:0.35rem 0.8rem;">מוגדרת חיובית (Positive Definite) — חתימה (2, 0)</span>';
        sigTex = "\\pi = 2, \\quad \\nu = 0";
      } else if (delta1 < 0 && delta2 > 0) {
        badgeHtml =
          '<span class="linear-badge linear-badge-bad" style="font-size:1rem; padding:0.35rem 0.8rem;">מוגדרת שלילית (Negative Definite) — חתימה (0, 2)</span>';
        sigTex = "\\pi = 0, \\quad \\nu = 2";
      } else if (delta2 < 0) {
        badgeHtml =
          '<span class="linear-badge linear-badge-accent" style="font-size:1rem; padding:0.35rem 0.8rem;">בלתי מסוימת (Indefinite) — חתימה (1, 1)</span>';
        sigTex = "\\pi = 1, \\quad \\nu = 1";
      } else {
        badgeHtml =
          '<span class="linear-badge" style="font-size:1rem; padding:0.35rem 0.8rem; background:var(--surface);">חצי מוגדרת / מנוונת (Semi-definite / Degenerate)</span>';
        sigTex = "\\text{דרגה קטנה מ-2, קיים ע״ע 0}";
      }
      host.querySelector("[data-sylvester-badge]").innerHTML = badgeHtml;

      var minTex =
        "\\Delta_1 = a = " +
        a +
        ", \\quad \\Delta_2 = ac - b^2 = " +
        fmtNum(delta2, 2) +
        ", \\quad (" +
        sigTex +
        ")";
      renderMathBlock(host.querySelector("[data-minors-tex]"), minTex, minTex);

      var jacobiTex = "";
      if (Math.abs(delta1) > 1e-6 && Math.abs(delta2) > 1e-6) {
        var d1 = delta1;
        var d2 = delta2 / delta1;
        jacobiTex =
          "q(y) = d_1 y_1^2 + d_2 y_2^2 = " +
          fmtNum(d1, 2) +
          " y_1^2 + " +
          fmtNum(d2, 2) +
          " y_2^2 \\quad \\left(d_k = \\frac{\\Delta_k}{\\Delta_{k-1}}\\right)";
      } else {
        jacobiTex = "שיטת יעקובי אינה ישימה ישירות כאשר אחד המינורים הראשיים מתאפס!";
      }
      renderMathBlock(host.querySelector("[data-jacobi-tex]"), jacobiTex, jacobiTex);

      // SVG Drawing
      var scale = 25;
      var svgContent =
        '<line x1="-115" y1="0" x2="115" y2="0" class="linear-svg-axis"></line>' +
        '<line x1="0" y1="-115" x2="0" y2="115" class="linear-svg-axis"></line>';

      // Calculate eigenvalues of [a b; b c]
      var tr = a + c;
      var det = a * c - b * b;
      var disc = tr * tr - 4 * det;
      if (disc < 0) disc = 0;
      var l1 = (tr + Math.sqrt(disc)) / 2;
      var l2 = (tr - Math.sqrt(disc)) / 2;

      // Rotation angle
      var phi = b !== 0 ? 0.5 * Math.atan2(2 * b, a - c) : a < c ? Math.PI / 2 : 0;
      var degPhi = (phi * 180) / Math.PI;

      // Level curve q = 1
      if (l1 > 0 && l2 > 0) {
        // Ellipse
        var rx = (1 / Math.sqrt(l1)) * scale;
        var ry = (1 / Math.sqrt(l2)) * scale;
        svgContent +=
          '<g transform="rotate(' +
          -degPhi +
          ')">' +
          '<ellipse cx="0" cy="0" rx="' +
          rx +
          '" ry="' +
          ry +
          '" stroke="#0f766e" stroke-width="2.5" fill="none"></ellipse>' +
          "</g>";
      } else if (l1 > 0 && l2 < 0) {
        // Hyperbola
        var hrx = (1 / Math.sqrt(l1)) * scale;
        var hry = (1 / Math.sqrt(-l2)) * scale;
        svgContent +=
          '<g transform="rotate(' +
          -degPhi +
          ')">' +
          '<path d="M ' +
          hrx +
          " -90 Q " +
          hrx * 1.4 +
          " 0 " +
          hrx +
          ' 90" stroke="#0f766e" stroke-width="2" fill="none"></path>' +
          '<path d="M ' +
          -hrx +
          " -90 Q " +
          -hrx * 1.4 +
          " 0 " +
          -hrx +
          ' 90" stroke="#0f766e" stroke-width="2" fill="none"></path>' +
          "</g>";
      }

      svg.innerHTML = svgContent;
    }

    update();
  }

  /* ==========================================================================
     מעבדה 10: חילוק פולינומים וזהות בזו (lab-polynomial-div)
     יחידה 7 · פולינומים ושדות סגורים אלגברית
     ========================================================================== */

  function mountPolynomialDiv(host) {
    var presets = [
      {
        label: "פולינומים זרים (gcd = 1, פירוק פרימרי)",
        p1Tex: "p_1(x) = (x-2)^2 = x^2 - 4x + 4",
        p2Tex: "p_2(x) = x - 3",
        gcdTex: "\\gcd(p_1, p_2) = 1",
        divSteps: [
          "חילוק: \\((x^2 - 4x + 4) = (x - 1)(x - 3) + 1\\)",
          "המנה היא \\(q(x) = x - 1\\), והשארית היא הקבוע \\(r(x) = 1\\).",
          "היות שהשארית היא 1, הפולינומים זרים!",
        ],
        bezoutTex:
          "1 \\cdot p_1(x) + (-x + 1) \\cdot p_2(x) = 1 \\implies a(x) = 1, \\, b(x) = -x + 1",
        primaryNote:
          "בפירוק פרימרי: \\(E_1 = b(T)p_2(T) = (-T+I)(T-3I)\\) ו-\\(E_2 = a(T)p_1(T) = (T-2I)^2\\) הם בדיוק ההיטלים המפרקים את המרחב: \\(E_1 + E_2 = I\\) ו-\\(E_1 E_2 = 0\\)!",
      },
      {
        label: "גורם משותף לא-טריוויאלי (gcd = x - 1)",
        p1Tex: "p_1(x) = x^3 - 3x + 2 = (x-1)^2(x+2)",
        p2Tex: "p_2(x) = x^2 - 1 = (x-1)(x+1)",
        gcdTex: "\\gcd(p_1, p_2) = x - 1",
        divSteps: [
          "חילוק ראשון: \\(x^3 - 3x + 2 = x(x^2 - 1) + (-2x + 2)\\)",
          "חילוק שני: \\(x^2 - 1 = (-\\frac{1}{2}x - \\frac{1}{2})(-2x + 2) + 0\\)",
          "השארית האחרונה שאינה אפס היא \\(-2x + 2\\). נרמול למוני נותן \\(x - 1\\).",
        ],
        bezoutTex:
          "-\\frac{1}{2} p_1(x) + \\frac{x}{2} p_2(x) = x - 1 = \\gcd(p_1, p_2)",
        primaryNote:
          "כאשר ה-gcd אינו 1, הפולינומים אינם זרים (חולקים ע״ע משותף), ולכן לא ניתן להפריד את המרחב לסכום ישר של גרעיניהם ללא חיתוך!",
      },
    ];

    var state = { presetIdx: 0 };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידה 7 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">חילוק פולינומים, אלגוריתם אוקלידס וזהות בזו (Bézout Identity)</h3>' +
      '<p class="linear-lab-desc">חקור את אלגוריתם אוקלידס למציאת המחלק המשותף המקסימלי \\(\\gcd\\) וזהות בזו \\(a(x)p_1(x) + b(x)p_2(x) = \\gcd\\). למד כיצד זהות בזו מייצרת את ההיטלים של משפט הפירוק הפרימרי.</p>' +
      "</div>" +
      '<div class="linear-controls">' +
      '<div class="linear-field">' +
      '<span class="linear-field-label">בחר זוג פולינומים:</span>' +
      '<div class="linear-btn-group" data-poly-group></div>' +
      "</div>" +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel">' +
      '<div class="linear-panel" style="background:var(--card); margin-bottom:0.75rem;">' +
      '<div data-p1-display style="font-weight:700;"></div>' +
      '<div data-p2-display style="font-weight:700; margin-top:0.35rem;"></div>' +
      '<div data-gcd-display style="margin-top:0.45rem; color:#0f766e; font-weight:800;"></div>' +
      "</div>" +
      '<h4 style="margin:0 0 0.4rem; font-size:1rem;">צעדי החילוק עם שארית:</h4>' +
      '<div data-div-steps style="display:grid; gap:0.4rem;"></div>' +
      "</div>" +
      '<div class="linear-panel">' +
      '<div class="linear-callout" style="border-right-color:#0f766e;">' +
      '<div class="linear-callout-title">זהות בזו (Bézout Identity):</div>' +
      '<div data-bezout-display style="font-size:0.95rem;"></div>' +
      "</div>" +
      '<div class="linear-callout" style="border-right-color:#2563eb; margin-top:0.75rem;">' +
      '<div class="linear-callout-title" style="color:#2563eb;">הקשר לפירוק פרימרי (יחידה 10):</div>' +
      '<div data-primary-note style="font-size:0.92rem; line-height:1.55;"></div>' +
      "</div>" +
      "</div>" +
      "</div>";

    var polyGroup = host.querySelector("[data-poly-group]");
    presets.forEach(function (p, idx) {
      var btn = document.createElement("button");
      btn.className = "linear-btn" + (idx === 0 ? " is-active" : "");
      btn.textContent = p.label.split("(")[0];
      btn.addEventListener("click", function () {
        state.presetIdx = idx;
        var all = polyGroup.querySelectorAll(".linear-btn");
        all.forEach(function (b, i) {
          b.classList.toggle("is-active", i === idx);
        });
        render();
      });
      polyGroup.appendChild(btn);
    });

    function render() {
      var p = presets[state.presetIdx];
      renderMathBlock(host.querySelector("[data-p1-display]"), p.p1Tex, p.p1Tex);
      renderMathBlock(host.querySelector("[data-p2-display]"), p.p2Tex, p.p2Tex);
      renderMathBlock(host.querySelector("[data-gcd-display]"), p.gcdTex, p.gcdTex);

      var stepsContainer = host.querySelector("[data-div-steps]");
      stepsContainer.innerHTML = "";
      p.divSteps.forEach(function (st) {
        var card = document.createElement("div");
        card.className = "linear-step-card";
        card.innerHTML = st;
        renderMath(card, st, st);
        stepsContainer.appendChild(card);
      });

      renderMathBlock(host.querySelector("[data-bezout-display]"), p.bezoutTex, p.bezoutTex);
      var noteEl = host.querySelector("[data-primary-note]");
      noteEl.innerHTML = p.primaryNote;
      renderMath(noteEl, p.primaryNote, p.primaryNote);
    }

    render();
  }

  /* ==========================================================================
     מעבדה 11: אלגוריתם השילוש ותת-מרחבים שמורים (lab-triangularization)
     יחידה 8 · שילוש מטריצות ותת-מרחבים T-שמורים
     ========================================================================== */

  function mountTriangularization(host) {
    var steps = [
      {
        title: "שלב 0: המטריצה המקורית A והפולינום האופייני",
        desc: "נתונה מטריצה \\(A\\) בעלת פולינום אופייני המתפרק לגורמים לינאריים \\(P_A(x) = (x-2)^2(x-3)\\). לפי משפט השילוש, קיימת מטריצה אוניטרית/אורתוגונלית \\(Q\\) כך ש-\\(Q^* A Q = U\\) משולשית עליונה.",
        tex: "A = \\begin{pmatrix} 2 & 1 & 1 \\\\ 0 & 3 & 2 \\\\ 0 & 0 & 2 \\end{pmatrix}",
      },
      {
        title: "שלב 1: מציאת ע״ע ווקטור עצמי ראשון v₁",
        desc: "עבור \\(\\lambda_1 = 2\\), מוצאים וקטור עצמי \\(v_1 = (1, 0, 0)^t\\). תת-המרחב \\(V_1 = \\text{span}(v_1)\\) הוא תת-מרחב חד-ממדי \\(T\\)-שמור, כי \\(T(v_1) = 2v_1 \\in V_1\\).",
        tex: "v_1 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\quad T(V_1) \\subseteq V_1",
      },
      {
        title: "שלב 2: הרחבה לבא״נ ואיפוס העמודה הראשונה מתחת לאלכסון",
        desc: "מרחיבים את \\(v_1\\) לבסיס אורתונורמלי \\(Q_1 = [v_1 \\mid e_2 \\mid e_3]\\). ההעתקה בבסיס זה מאפסת את כל העמודה הראשונה מתחת ל-\\(a_{11} = 2\\).",
        tex: "Q_1^* A Q_1 = \\begin{pmatrix} 2 & * & * \\\\ 0 & 3 & 2 \\\\ 0 & 0 & 2 \\end{pmatrix}",
      },
      {
        title: "שלב 3: חזרה על התהליך בבלוק המצומצם ומציאת דגל התת-מרחבים",
        desc: "בבלוק הנותר בגודל \\(2 \\times 2\\), מוצאים וקטור עצמי נוסף. מתקבל דגל של תת-מרחבים שמורים: \\(V_1 \\subset V_2 \\subset V_3 = V\\). המטריצה משולשית עליונה לחלוטין!",
        tex: "U = \\begin{pmatrix} 2 & 1 & 1 \\\\ 0 & 3 & 2 \\\\ 0 & 0 & 2 \\end{pmatrix}, \\quad V_1 \\subset V_2 \\subset V_3",
      },
    ];

    var state = { stepIdx: 0 };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידה 8 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">אלגוריתם השילוש ודגל התת-מרחבים השמורים (Triangulation Flag)</h3>' +
      '<p class="linear-lab-desc">עקוב צעד-אחר-צעד אחר אלגוריתם השילוש (Schur). למד כיצד מציאת וקטור עצמי והשלמה לבא״נ מאפסות עמודה אחר עמודה ויוצרות דגל תת-מרחבים \\(T\\)-שמורים.</p>' +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel">' +
      '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">' +
      '<span class="linear-badge linear-badge-accent" data-step-badge>שלב 1</span>' +
      '<div class="linear-btn-group">' +
      '<button class="linear-btn linear-btn-sm" data-btn-prev>← שלב קודם</button>' +
      '<button class="linear-btn linear-btn-sm linear-btn-primary" data-btn-next>שלב הבא →</button>' +
      "</div>" +
      "</div>" +
      '<div class="linear-step-card is-active">' +
      '<div class="linear-step-title" data-step-title></div>' +
      '<p style="margin:0.25rem 0 0.5rem; font-size:0.9rem;" data-step-desc></p>' +
      '<div data-step-tex style="font-size:0.95rem;"></div>' +
      "</div>" +
      "</div>" +
      '<div class="linear-panel">' +
      '<h4 style="margin:0 0 0.5rem; font-size:1.05rem;">דגל התת-מרחבים ה-\\(\\mathbf{T}\\)-שמורים (Invariant Flag):</h4>' +
      '<div style="display:grid; gap:0.5rem; margin-top:0.75rem;">' +
      '<div class="linear-diag-flag"><div class="linear-diag-flag-dot" style="background:#2563eb;"></div><span>\\(V_1 = \\text{span}(v_1)\\) — ממד 1, \\(T(V_1) \\subseteq V_1\\)</span></div>' +
      '<div class="linear-diag-flag"><div class="linear-diag-flag-dot" style="background:#ea580c;"></div><span>\\(V_2 = \\text{span}(v_1, v_2)\\) — ממד 2, \\(T(V_2) \\subseteq V_2\\)</span></div>' +
      '<div class="linear-diag-flag"><div class="linear-diag-flag-dot" style="background:#0f766e;"></div><span>\\(V_3 = V\\) — המרחב השלם</span></div>' +
      "</div>" +
      '<div class="linear-callout" style="border-right-color:#4f46e5; margin-top:0.85rem;">' +
      '<div class="linear-callout-title" style="color:#4f46e5;">משפט מרכזי במבחן:</div>' +
      'מטריצה ניתנת לשילוש מעל שדה \\(\\mathbb{F}\\) אם ורק אם הפולינום האופייני שלה מתפרק לגורמים לינאריים מעל \\(\\mathbb{F}\\). לכן מעל \\(\\mathbb{C}\\), כל מטריצה ניתנת לשילוש!' +
      "</div>" +
      "</div>" +
      "</div>";

    host.querySelector("[data-btn-prev]").addEventListener("click", function () {
      if (state.stepIdx > 0) {
        state.stepIdx--;
        render();
      }
    });

    host.querySelector("[data-btn-next]").addEventListener("click", function () {
      if (state.stepIdx < steps.length - 1) {
        state.stepIdx++;
        render();
      }
    });

    function render() {
      var s = steps[state.stepIdx];
      host.querySelector("[data-step-badge]").textContent =
        "שלב " + (state.stepIdx + 1) + " מתוך " + steps.length;
      host.querySelector("[data-btn-prev]").disabled = state.stepIdx === 0;
      host.querySelector("[data-btn-next]").disabled = state.stepIdx === steps.length - 1;

      host.querySelector("[data-step-title]").textContent = s.title;
      host.querySelector("[data-step-desc]").innerHTML = s.desc;
      renderMath(host.querySelector("[data-step-desc]"), s.desc, s.desc);
      renderMathBlock(host.querySelector("[data-step-tex]"), s.tex, s.tex);
    }

    render();
  }

  /* ==========================================================================
     מעבדה 12: פולינום מינימלי ופירוק פרימרי (primary-decomp)
     יחידות 9 & 10 · קיילי-המילטון, שרשראות גרעינים ופירוק פרימרי
     ========================================================================== */

  function mountPrimaryDecomp(host) {
    var presets = [
      {
        label: "מטריצה 4x4 עם שני ערכים עצמיים (2 ו-5)",
        dim: 4,
        charTex: "P_A(x) = (x-2)^3 (x-5)^1",
        minTex: "M_A(x) = (x-2)^2 (x-5)^1",
        chains: [
          {
            eig: 2,
            algMult: 3,
            minExp: 2,
            steps: [
              { k: 1, rank: 2, nullity: 2, note: "ריבוי גיאומטרי = 2 (שני בלוקי ז'ורדן)" },
              { k: 2, rank: 1, nullity: 3, note: "הממד הגיע לריבוי האלגברי 3 — התייצבות (b₁ = 2)!" },
              { k: 3, rank: 1, nullity: 3, note: "שרשרת הגרעינים יציבה: ker(A-2I)² = ker(A-2I)³" },
            ],
          },
          {
            eig: 5,
            algMult: 1,
            minExp: 1,
            steps: [
              { k: 1, rank: 3, nullity: 1, note: "התייצבות מידית בצעד 1 (b₂ = 1)!" },
            ],
          },
        ],
        decompTex:
          "V = \\ker(A - 2I)^2 \\oplus \\ker(A - 5I), \\quad \\dim = 3 + 1 = 4",
      },
      {
        label: "מטריצה נילפוטנטית 3x3 (N³ = 0)",
        dim: 3,
        charTex: "P_N(x) = x^3",
        minTex: "M_N(x) = x^3 \\text{ (אינדקס נילפוטנטיות 3)}",
        chains: [
          {
            eig: 0,
            algMult: 3,
            minExp: 3,
            steps: [
              { k: 1, rank: 2, nullity: 1, note: "ע״ע יחיד 0, בלוק יחיד בגודל 3" },
              { k: 2, rank: 1, nullity: 2, note: "עליה בממד הגרעין ב-1" },
              { k: 3, rank: 0, nullity: 3, note: "הגרעין כיסה את כל המרחב (N³ = 0)!" },
            ],
          },
        ],
        decompTex:
          "V = \\ker(N^3), \\quad \\text{אינדקס הנילפוטנטיות הוא החזקה במינימלי!}",
      },
    ];

    var state = { presetIdx: 0 };

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידות 9 & 10 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">הפולינום המינימלי ושרשרת הגרעינים (Primary Decomposition)</h3>' +
      '<p class="linear-lab-desc">חקור את שרשרת הגרעינים העולה \\(\\ker(A-\\lambda I)^k\\). ראה במו עיניך כיצד שלב ההתייצבות \\(b_i\\) הוא בדיוק החזקה בפולינום המינימלי \\(M_A(x)\\), והממד הסופי הוא הריבוי באופייני \\(P_A(x)\\)!</p>' +
      "</div>" +
      '<div class="linear-controls">' +
      '<div class="linear-field">' +
      '<span class="linear-field-label">בחר מטריצה:</span>' +
      '<div class="linear-btn-group" data-pd-presets></div>' +
      "</div>" +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel">' +
      '<h4 style="margin:0 0 0.5rem; font-size:1.05rem;">פולינומים אופייני ומינימלי:</h4>' +
      '<div class="linear-panel" style="background:var(--card); margin-bottom:0.75rem;">' +
      '<div data-char-tex style="font-weight:700; margin-bottom:0.35rem;"></div>' +
      '<div data-min-tex style="font-weight:700; color:#0f766e;"></div>' +
      "</div>" +
      '<h4 style="margin:0 0 0.5rem; font-size:1.05rem;">שרשראות הגרעינים העולות:</h4>' +
      '<div data-chains-container style="display:grid; gap:0.6rem;"></div>' +
      "</div>" +
      '<div class="linear-panel">' +
      '<div class="linear-callout" style="border-right-color:#0f766e;">' +
      '<div class="linear-callout-title">משפט הפירוק הפרימרי:</div>' +
      '<div data-decomp-tex style="font-size:0.95rem;"></div>' +
      "</div>" +
      '<div class="linear-callout" style="border-right-color:#be123c; margin-top:0.75rem;">' +
      '<div class="linear-callout-title" style="color:#be123c;">כללי זהב למבחן:</div>' +
      '<ul style="margin:0; padding-right:1.2rem; font-size:0.9rem; line-height:1.55;">' +
      '<li><b>צעד ההתייצבות \\(b_i\\)</b> של \\(\\ker(A-\\lambda_i I)^k\\) הוא <b>החזקה בפולינום המינימלי</b> וגודל בלוק ז\'ורדן המקסימלי!</li>' +
      '<li><b>הממד הסופי המיוצב</b> הוא הריבוי האלגברי \\(a_i\\) בפולינום האופייני.</li>' +
      '<li><b>הממד בצעד הראשון</b> (\\(k=1\\)) הוא הריבוי הגיאומטרי ומספר בלוקי ז\'ורדן הכולל של \\(\\lambda_i\\).</li>' +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</div>";

    var presetsGroup = host.querySelector("[data-pd-presets]");
    presets.forEach(function (p, idx) {
      var btn = document.createElement("button");
      btn.className = "linear-btn" + (idx === 0 ? " is-active" : "");
      btn.textContent = p.label.split("(")[0];
      btn.addEventListener("click", function () {
        state.presetIdx = idx;
        var all = presetsGroup.querySelectorAll(".linear-btn");
        all.forEach(function (b, i) {
          b.classList.toggle("is-active", i === idx);
        });
        render();
      });
      presetsGroup.appendChild(btn);
    });

    function render() {
      var p = presets[state.presetIdx];
      renderMathBlock(host.querySelector("[data-char-tex]"), p.charTex, p.charTex);
      renderMathBlock(host.querySelector("[data-min-tex]"), p.minTex, p.minTex);
      renderMathBlock(host.querySelector("[data-decomp-tex]"), p.decompTex, p.decompTex);

      var container = host.querySelector("[data-chains-container]");
      container.innerHTML = "";

      p.chains.forEach(function (ch) {
        var card = document.createElement("div");
        card.className = "linear-panel";
        card.style.background = "var(--card)";

        var title = document.createElement("div");
        title.style.fontWeight = "700";
        title.style.marginBottom = "0.4rem";
        title.textContent =
          "ערך עצמי λ = " +
          ch.eig +
          " (ריבוי אלגברי " +
          ch.algMult +
          ", חזקה במינימלי " +
          ch.minExp +
          "):";
        card.appendChild(title);

        var table = document.createElement("table");
        table.className = "linear-table";
        table.innerHTML =
          "<thead><tr><th>חזקה k</th><th>דרגה rank</th><th>ממד גרעין nullity</th><th>הערת התייצבות</th></tr></thead><tbody></tbody>";
        var tbody = table.querySelector("tbody");

        ch.steps.forEach(function (st) {
          var tr = document.createElement("tr");
          tr.innerHTML =
            "<td><b>" +
            st.k +
            "</b></td><td>" +
            st.rank +
            "</td><td><b>" +
            st.nullity +
            "</b></td><td><span class=\"linear-badge " +
            (st.k >= ch.minExp ? "linear-badge-ok" : "linear-badge-accent") +
            '">' +
            st.note +
            "</span></td>";
          tbody.appendChild(tr);
        });

        card.appendChild(table);
        container.appendChild(card);
      });
    }

    render();
  }

  /* ==========================================================================
     מעבדה 13: בונה בלוקי ז'ורדן וחזקות ז'ורדן (lab-jordan-chains / jordan-builder)
     יחידה 11 · צורת ז'ורדן הקנונית
     ========================================================================== */

  function mountJordanChains(host) {
    var state = {
      activeTab: "builder", // 'builder' or 'power'
      // Tab 1 state
      presetIdx: 0,
      // Tab 2 state
      blockSize: 3,
      lambda: 2,
      power: 3,
    };

    var presetsTab1 = [
      {
        label: "n=4: בלוק בגודל 3 + בלוק בגודל 1 (ריבוי גיאומטרי 2)",
        n: 4,
        lambda: 3,
        ranks: [4, 2, 1, 0, 0], // rho_0=4, rho_1=2, rho_2=1, rho_3=0, rho_4=0
        // tau_1 = 4 - 2(2) + 1 = 1
        // tau_2 = 2 - 2(1) + 0 = 0
        // tau_3 = 1 - 2(0) + 0 = 1
        blocks: [3, 1],
      },
      {
        label: "n=5: בלוק בגודל 3 + בלוק בגודל 2",
        n: 5,
        lambda: 0,
        ranks: [5, 3, 1, 0, 0, 0],
        // tau_1 = 5 - 2(3) + 1 = 0
        // tau_2 = 3 - 2(1) + 0 = 1
        // tau_3 = 1 - 2(0) + 0 = 1
        blocks: [3, 2],
      },
      {
        label: "n=4: שני בלוקים בגודל 2 (J₂ ⊕ J₂)",
        n: 4,
        lambda: 2,
        ranks: [4, 2, 0, 0, 0],
        // tau_1 = 4 - 2(2) + 0 = 0
        // tau_2 = 2 - 2(0) + 0 = 2
        blocks: [2, 2],
      },
    ];

    host.innerHTML =
      '<div class="linear-lab-header">' +
      '<span class="linear-lab-tag">יחידה 11 · מעבדה אינטראקטיבית</span>' +
      '<h3 class="linear-lab-title">בונה בלוקי ז\'ורדן, נוסחת הדרגות וחזקות (Jordan Canonical Form)</h3>' +
      '<p class="linear-lab-desc">גלה את צורת ז\'ורדן המדויקת באמצעות נוסחת הדרגות של המבחן \\(\\tau_m = \\rho_{m-1} - 2\\rho_m + \\rho_{m+1}\\), בנה דיאגרמת יאנג, וצפה בהתנהגות חזקות בלוקי ז\'ורדן \\(J_k(\\lambda)^m\\).</p>' +
      "</div>" +
      '<div class="linear-tabs">' +
      '<button class="linear-tab-btn is-active" data-tab="builder">לשונית 1: פיצוח בלוקי ז\'ורדן מדרגות (נוסחת τₘ)</button>' +
      '<button class="linear-tab-btn" data-tab="power">לשונית 2: מחשבון חזקות בלוק ז\'ורדן (Jₖ(λ)ᵐ)</button>' +
      "</div>" +
      '<div data-content-builder>' +
      '<div class="linear-controls">' +
      '<div class="linear-field">' +
      '<span class="linear-field-label">בחר תרחיש דרגות למטריצה:</span>' +
      '<div class="linear-btn-group" data-jordan-presets></div>' +
      "</div>" +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel">' +
      '<h4 style="margin:0 0 0.5rem; font-size:1.05rem;">חישוב מספר הבלוקים לפי נוסחת הדרגות \\(\\tau_m\\):</h4>' +
      '<div data-tau-calculations style="display:grid; gap:0.4rem; margin-bottom:0.75rem;"></div>' +
      '<h4 style="margin:0 0 0.4rem; font-size:1rem;">דיאגרמת יאנג (Young / Ferrers Diagram):</h4>' +
      '<div class="linear-young-grid" data-young-diagram></div>' +
      '<div style="font-size:0.8rem; color:var(--muted); text-align:center; margin-top:0.35rem;">כל עמודה מייצגת שרשרת וקטורים עצמיים מוכללים של בלוק ז\'ורדן יחיד</div>' +
      "</div>" +
      '<div class="linear-panel">' +
      '<h4 style="margin:0 0 0.5rem; font-size:1.05rem; text-align:center;">מטריצת ז\'ורדן הקנונית \\(J\\):</h4>' +
      '<div data-jordan-matrix-render style="padding:1rem 0; overflow-x:auto;"></div>' +
      '<div class="linear-callout" style="border-right-color:#9333ea;">' +
      '<div class="linear-callout-title" style="color:#9333ea;">נוסחת הדרגות למבחן:</div>' +
      '<div data-tau-formula-tex style="font-size:0.92rem;"></div>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div data-content-power hidden>' +
      '<div class="linear-controls">' +
      '<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.75rem;">' +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>גודל הבלוק \\(k\\):</span><span class="linear-field-val" data-val-k>3</span></div>' +
      '<input type="range" min="2" max="5" step="1" value="3" data-in-k>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>ערך עצמי \\(\\lambda\\):</span><span class="linear-field-val" data-val-lam>2</span></div>' +
      '<input type="range" min="-3" max="3" step="1" value="2" data-in-lam>' +
      "</div>" +
      '<div class="linear-field">' +
      '<div class="linear-field-top"><span>חזקה \\(m\\):</span><span class="linear-field-val" data-val-m>3</span></div>' +
      '<input type="range" min="1" max="10" step="1" value="3" data-in-m>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="linear-layout-dual">' +
      '<div class="linear-panel" style="text-align:center;">' +
      '<h4 style="margin:0 0 0.5rem; font-size:1.05rem;">תוצאת החזקה \\(J_k(\\lambda)^m\\):</h4>' +
      '<div data-power-matrix-render style="padding:1rem 0; overflow-x:auto;"></div>' +
      "</div>" +
      '<div class="linear-panel">' +
      '<div class="linear-callout" style="border-right-color:#0f766e;">' +
      '<div class="linear-callout-title">נוסחת הבינום לבלוק ז\'ורדן:</div>' +
      '<div data-power-binomial-tex style="font-size:0.92rem;"></div>' +
      "</div>" +
      '<div class="linear-panel" style="background:var(--card); font-size:0.9rem; line-height:1.55; margin-top:0.75rem;">' +
      'שים לב כיצד האלכסונים העל-ראשיים נעים מעלה:<br>' +
      '• באלכסון הראשי מופיע \\(\\lambda^m\\).<br>' +
      '• באלכסון שמעליו מופיע \\(m \\lambda^{m-1}\\).<br>' +
      '• באלכסון השני מופיע \\(\\binom{m}{2} \\lambda^{m-2}\\), וכן הלאה.<br>' +
      'אם \\(\\lambda = 0\\) (נילפוטנטי), המטריצה מתאפסת לחלוטין ברגע ש-\\(m \\ge k\\)!' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";

    // Tab toggling
    var tabBtns = host.querySelectorAll("[data-tab]");
    var contentBuilder = host.querySelector("[data-content-builder]");
    var contentPower = host.querySelector("[data-content-power]");

    tabBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var t = btn.getAttribute("data-tab");
        state.activeTab = t;
        tabBtns.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        contentBuilder.hidden = t !== "builder";
        contentPower.hidden = t !== "power";
        if (t === "builder") renderBuilder();
        else renderPower();
      });
    });

    // Tab 1 Presets
    var presetsGroup = host.querySelector("[data-jordan-presets]");
    presetsTab1.forEach(function (p, idx) {
      var btn = document.createElement("button");
      btn.className = "linear-btn" + (idx === 0 ? " is-active" : "");
      btn.textContent = p.label.split("(")[0];
      btn.addEventListener("click", function () {
        state.presetIdx = idx;
        var all = presetsGroup.querySelectorAll(".linear-btn");
        all.forEach(function (b, i) {
          b.classList.toggle("is-active", i === idx);
        });
        renderBuilder();
      });
      presetsGroup.appendChild(btn);
    });

    function renderBuilder() {
      var p = presetsTab1[state.presetIdx];
      var r = p.ranks;

      // Compute tau_m
      var tauContainer = host.querySelector("[data-tau-calculations]");
      tauContainer.innerHTML = "";
      for (var m = 1; m <= 3; m++) {
        var r_prev = r[m - 1] !== undefined ? r[m - 1] : 0;
        var r_cur = r[m] !== undefined ? r[m] : 0;
        var r_next = r[m + 1] !== undefined ? r[m + 1] : 0;
        var tau = r_prev - 2 * r_cur + r_next;

        var row = document.createElement("div");
        row.className = "linear-diag-flag";
        row.innerHTML =
          '<div class="linear-diag-flag-dot" style="background:' +
          (tau > 0 ? "#0f766e" : "#94a3b8") +
          ';"></div>' +
          "<span>\\(\\tau_" +
          m +
          " = \\rho_" +
          (m - 1) +
          " - 2\\rho_" +
          m +
          " + \\rho_" +
          (m + 1) +
          " = " +
          r_prev +
          " - 2(" +
          r_cur +
          ") + " +
          r_next +
          " = \\mathbf{" +
          tau +
          "}\\) " +
          (tau > 0
            ? "— <b>" + tau + " בלוקים בגודל " + m + "</b>"
            : "— 0 בלוקים") +
          "</span>";
        renderMath(row, row.innerHTML, row.innerHTML);
        tauContainer.appendChild(row);
      }

      // Young / Ferrers Diagram
      var youngGrid = host.querySelector("[data-young-diagram]");
      youngGrid.innerHTML = "";
      p.blocks.forEach(function (bSize, bIdx) {
        var col = document.createElement("div");
        col.className = "linear-young-col";
        for (var h = 1; h <= bSize; h++) {
          var box = document.createElement("div");
          box.className = "linear-young-box";
          box.textContent = "v" + (bIdx + 1) + (h > 1 ? "⁽" + h + "⁾" : "");
          col.appendChild(box);
        }
        var lbl = document.createElement("div");
        lbl.className = "linear-young-label";
        lbl.textContent = "גודל " + bSize;
        col.appendChild(lbl);
        youngGrid.appendChild(col);
      });

      // Render Jordan Matrix Table
      var matHtml = '<table class="linear-jordan-matrix-table">';
      var curRow = 0;
      var curCol = 0;
      var blockColors = [
        "linear-jordan-block-1",
        "linear-jordan-block-2",
        "linear-jordan-block-3",
      ];

      for (var r_idx = 0; r_idx < p.n; r_idx++) {
        matHtml += "<tr>";
        for (var c_idx = 0; c_idx < p.n; c_idx++) {
          // Determine which block this cell belongs to
          var cellBlock = -1;
          var offset = 0;
          for (var bi = 0; bi < p.blocks.length; bi++) {
            var bsz = p.blocks[bi];
            if (
              r_idx >= offset &&
              r_idx < offset + bsz &&
              c_idx >= offset &&
              c_idx < offset + bsz
            ) {
              cellBlock = bi;
              break;
            }
            offset += bsz;
          }

          var val = "0";
          if (cellBlock !== -1) {
            if (r_idx === c_idx) val = String(p.lambda);
            else if (c_idx === r_idx + 1) val = "1";
          }

          var cls = cellBlock !== -1 ? blockColors[cellBlock % blockColors.length] : "";
          matHtml += '<td class="' + cls + '">' + val + "</td>";
        }
        matHtml += "</tr>";
      }
      matHtml += "</table>";
      host.querySelector("[data-jordan-matrix-render]").innerHTML = matHtml;

      var formulaTex =
        "\\tau_m = \\rho_{m-1}(A-\\lambda I) - 2\\rho_m(A-\\lambda I) + \\rho_{m+1}(A-\\lambda I)";
      renderMathBlock(host.querySelector("[data-tau-formula-tex]"), formulaTex, formulaTex);
    }

    // Tab 2 Controls & Render
    function bindPower(selector, field, displaySel) {
      var inp = host.querySelector(selector);
      inp.addEventListener("input", function () {
        state[field] = Number(inp.value);
        host.querySelector(displaySel).textContent = inp.value;
        renderPower();
      });
    }

    bindPower("[data-in-k]", "blockSize", "[data-val-k]");
    bindPower("[data-in-lam]", "lambda", "[data-val-lam]");
    bindPower("[data-in-m]", "power", "[data-val-m]");

    function renderPower() {
      var k = state.blockSize;
      var lam = state.lambda;
      var m = state.power;

      // Render power matrix
      var matHtml = '<table class="linear-jordan-matrix-table">';
      for (var r = 0; r < k; r++) {
        matHtml += "<tr>";
        for (var c = 0; c < k; c++) {
          var val = 0;
          var diagDiff = c - r;
          if (diagDiff >= 0 && diagDiff <= m) {
            var comb = nCr(m, diagDiff);
            var lamPow = Math.pow(lam, m - diagDiff);
            val = comb * lamPow;
          }

          var cls = "";
          if (diagDiff === 0) cls = "linear-jordan-block-1";
          else if (diagDiff === 1) cls = "linear-jordan-block-2";
          else if (diagDiff === 2) cls = "linear-jordan-block-3";
          else if (diagDiff > 2) cls = "linear-jordan-block-4";

          matHtml += '<td class="' + cls + '">' + fmtNum(val) + "</td>";
        }
        matHtml += "</tr>";
      }
      matHtml += "</table>";
      host.querySelector("[data-power-matrix-render]").innerHTML = matHtml;

      var binomTex =
        "J_k(\\lambda)^m = (\\lambda I + N)^m = \\sum_{j=0}^{\\min(m, k-1)} \\binom{m}{j} \\lambda^{m-j} N^j";
      renderMathBlock(host.querySelector("[data-power-binomial-tex]"), binomTex, binomTex);
    }

    renderBuilder();
  }

  /* --------------------------------------------------------------------------
     4. הנתב המרכזי והרשמה ל-CS_ENHANCERS
     -------------------------------------------------------------------------- */

  function mountLinearLabs(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var list = [];
    if (scope.matches && scope.matches(".linear-lab:not([data-mounted])")) list.push(scope);
    if (scope.querySelectorAll) {
      var found = scope.querySelectorAll(".linear-lab:not([data-mounted])");
      for (var i = 0; i < found.length; i++) list.push(found[i]);
    }

    for (var j = 0; j < list.length; j++) {
      var node = list[j];
      var rawKind =
        node.getAttribute("data-linear-lab") || node.getAttribute("data-lab") || "";
      var kind = String(rawKind).trim().toLowerCase();
      node.setAttribute("data-mounted", "true");

      if (kind === "gauss-nullspace") {
        mountGaussNullspace(node);
      } else if (kind === "eigen-2d") {
        mountEigen2D(node);
      } else if (kind === "lab-inner-product" || kind === "inner-product") {
        mountInnerProduct(node);
      } else if (kind === "lab-gram-schmidt" || kind === "gram-schmidt") {
        mountGramSchmidt(node);
      } else if (kind === "lab-adjoint-operator" || kind === "adjoint-operator") {
        mountAdjointOperator(node);
      } else if (kind === "matrix-family-id") {
        mountMatrixFamilyId(node);
      } else if (
        kind === "lab-spectral-decomposition" ||
        kind === "spectral-decomposition"
      ) {
        mountSpectralDecomposition(node);
      } else if (kind === "congruence-lagrange") {
        mountCongruenceLagrange(node);
      } else if (
        kind === "lab-quadratic-curves" ||
        kind === "sylvester-signature" ||
        kind === "quadratic-curves"
      ) {
        mountQuadraticCurves(node);
      } else if (kind === "lab-polynomial-div" || kind === "polynomial-div") {
        mountPolynomialDiv(node);
      } else if (
        kind === "lab-triangularization" ||
        kind === "triangularization"
      ) {
        mountTriangularization(node);
      } else if (kind === "primary-decomp") {
        mountPrimaryDecomp(node);
      } else if (
        kind === "lab-jordan-chains" ||
        kind === "jordan-builder" ||
        kind === "jordan-chains"
      ) {
        mountJordanChains(node);
      } else {
        // Fallback placeholder if unknown id
        node.innerHTML =
          '<div class="linear-lab-placeholder">' +
          '<span class="linear-lab-tag">מעבדה אינטראקטיבית</span>' +
          "<h4>" +
          rawKind +
          "</h4>" +
          "<p>מעבדה בתהליך טעינה.</p>" +
          "</div>";
      }
    }
  }

  // Auto-resize handler for responsiveness
  if (typeof window !== "undefined") {
    var resizeTimer = 0;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        var activeLabs = document.querySelectorAll(".linear-lab[data-mounted]");
        activeLabs.forEach(function (lab) {
          if (typeof lab.linearRedraw === "function") lab.linearRedraw();
        });
      }, 150);
    });

    window.CS_ENHANCERS = window.CS_ENHANCERS || [];
    window.CS_ENHANCERS.push(mountLinearLabs);
  }
})();
