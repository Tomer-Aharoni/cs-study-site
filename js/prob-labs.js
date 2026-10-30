/* מעבדות הסתברות לקורס 20425. */
(function () {
  "use strict";

  var logFactCache = [0];

  function logFact(n) {
    n = Math.round(n);
    if (n < 0) return NaN;
    var i = logFactCache.length;
    while (i <= n) {
      logFactCache[i] = logFactCache[i - 1] + Math.log(i);
      i += 1;
    }
    return logFactCache[n];
  }

  function binomPmf(k, n, p) {
    n = Math.round(Number(n));
    k = Math.round(Number(k));
    p = Number(p);
    if (n < 0 || k < 0 || k > n || !(p >= 0 && p <= 1)) return 0;
    if (p === 0) return k === 0 ? 1 : 0;
    if (p === 1) return k === n ? 1 : 0;
    var logP = logFact(n) - logFact(k) - logFact(n - k) + k * Math.log(p) + (n - k) * Math.log(1 - p);
    if (logP < -745) return 0;
    return Math.exp(logP);
  }

  function binomCdf(k, n, p) {
    n = Math.round(Number(n));
    k = Math.floor(Number(k));
    if (n < 0) return NaN;
    if (k < 0) return 0;
    if (k >= n) return 1;
    var sum = 0;
    for (var i = 0; i <= k; i++) sum += binomPmf(i, n, p);
    return sum > 1 ? 1 : sum;
  }

  function binomMean(n, p) {
    return Number(n) * Number(p);
  }

  function binomVar(n, p) {
    p = Number(p);
    return Number(n) * p * (1 - p);
  }

  function poissonPmf(k, lambda) {
    k = Math.round(Number(k));
    lambda = Number(lambda);
    if (!(lambda >= 0) || k < 0) return 0;
    if (lambda === 0) return k === 0 ? 1 : 0;
    var logP = -lambda + k * Math.log(lambda) - logFact(k);
    if (logP < -745) return 0;
    return Math.exp(logP);
  }

  function poissonCdf(k, lambda) {
    k = Math.floor(Number(k));
    lambda = Number(lambda);
    if (!(lambda >= 0)) return NaN;
    if (k < 0) return 0;
    if (lambda === 0) return 1;
    var term = Math.exp(-lambda);
    var sum = term;
    for (var i = 1; i <= k; i++) {
      term *= lambda / i;
      sum += term;
      if (sum > 1) return 1;
    }
    return sum > 1 ? 1 : sum;
  }

  function poissonMean(lambda) {
    return Number(lambda);
  }

  function poissonVar(lambda) {
    return Number(lambda);
  }

  function geomPmf(k, p) {
    k = Math.round(Number(k));
    p = Number(p);
    if (!(p > 0 && p <= 1) || k < 1) return 0;
    if (p === 1) return k === 1 ? 1 : 0;
    var logP = (k - 1) * Math.log(1 - p) + Math.log(p);
    if (logP < -745) return 0;
    return Math.exp(logP);
  }

  function geomCdf(k, p) {
    k = Math.floor(Number(k));
    p = Number(p);
    if (!(p > 0 && p <= 1)) return NaN;
    if (k < 1) return 0;
    if (p === 1) return 1;
    var logTail = k * Math.log(1 - p);
    if (logTail < -745) return 1;
    return 1 - Math.exp(logTail);
  }

  function geomMean(p) {
    p = Number(p);
    return p > 0 ? 1 / p : NaN;
  }

  function geomVar(p) {
    p = Number(p);
    return p > 0 ? (1 - p) / (p * p) : NaN;
  }

  function nbinomPmf(k, r, p) {
    k = Math.round(Number(k));
    r = Math.round(Number(r));
    p = Number(p);
    if (r < 1 || k < r || !(p > 0 && p <= 1)) return 0;
    if (p === 1) return k === r ? 1 : 0;
    var logP = logFact(k - 1) - logFact(r - 1) - logFact(k - r) + r * Math.log(p) + (k - r) * Math.log(1 - p);
    if (logP < -745) return 0;
    return Math.exp(logP);
  }

  function nbinomCdf(k, r, p) {
    k = Math.floor(Number(k));
    r = Math.round(Number(r));
    p = Number(p);
    if (r < 1 || !(p > 0 && p <= 1)) return NaN;
    if (k < r) return 0;
    if (p === 1) return 1;
    var term = Math.exp(r * Math.log(p));
    var sum = term;
    for (var j = r; j < k; j++) {
      term *= (j / (j - r + 1)) * (1 - p);
      sum += term;
      if (sum > 1) return 1;
    }
    return sum > 1 ? 1 : sum;
  }

  function nbinomMean(r, p) {
    p = Number(p);
    return p > 0 ? Number(r) / p : NaN;
  }

  function nbinomVar(r, p) {
    p = Number(p);
    return p > 0 ? (Number(r) * (1 - p)) / (p * p) : NaN;
  }

  function hyperLo(N, m, n) {
    return Math.max(0, n - (N - m));
  }

  function hyperHi(N, m, n) {
    return Math.min(n, m);
  }

  function hyperPmf(k, N, m, n) {
    N = Math.round(Number(N));
    m = Math.round(Number(m));
    n = Math.round(Number(n));
    k = Math.round(Number(k));
    if (N < 1 || m < 0 || m > N || n < 0 || n > N) return 0;
    if (k < hyperLo(N, m, n) || k > hyperHi(N, m, n)) return 0;
    var logP = logFact(m) - logFact(k) - logFact(m - k);
    logP += logFact(N - m) - logFact(n - k) - logFact(N - m - (n - k));
    logP -= logFact(N) - logFact(n) - logFact(N - n);
    if (logP < -745) return 0;
    return Math.exp(logP);
  }

  function hyperCdf(k, N, m, n) {
    N = Math.round(Number(N));
    m = Math.round(Number(m));
    n = Math.round(Number(n));
    k = Math.floor(Number(k));
    if (N < 1 || m < 0 || m > N || n < 0 || n > N) return NaN;
    var hi = hyperHi(N, m, n);
    if (k < hyperLo(N, m, n)) return 0;
    if (k >= hi) return 1;
    var sum = 0;
    for (var i = hyperLo(N, m, n); i <= k; i++) sum += hyperPmf(i, N, m, n);
    return sum > 1 ? 1 : sum;
  }

  function hyperMean(N, m, n) {
    N = Number(N);
    if (!(N > 0)) return NaN;
    return (Number(n) * Number(m)) / N;
  }

  function hyperVar(N, m, n) {
    N = Number(N);
    m = Number(m);
    n = Number(n);
    if (!(N > 1)) return 0;
    var p = m / N;
    return n * p * (1 - p) * (N - n) / (N - 1);
  }

  function normalPdf(x, mu, sigma) {
    mu = Number(mu);
    sigma = Number(sigma);
    x = Number(x);
    if (!(sigma > 0)) return 0;
    var z = (x - mu) / sigma;
    return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
  }

  function normalCdf(z) {
    z = Number(z);
    if (z !== z) return NaN;
    if (z > 8.3) return 1;
    if (z < -8.3) return 0;
    var x = Math.abs(z);
    var t = 1 / (1 + 0.2316419 * x);
    var poly = t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    var tail = 0.39894228040143267794 * Math.exp(-0.5 * x * x) * poly;
    var cdf = z >= 0 ? 1 - tail : tail;
    if (cdf < 0) return 0;
    if (cdf > 1) return 1;
    return cdf;
  }

  function normalCdfAt(x, mu, sigma) {
    sigma = Number(sigma);
    if (!(sigma > 0)) return NaN;
    return normalCdf((Number(x) - Number(mu)) / sigma);
  }

  window.ProbMath = {
    logFact: logFact,
    binomPmf: binomPmf,
    binomCdf: binomCdf,
    binomMean: binomMean,
    binomVar: binomVar,
    poissonPmf: poissonPmf,
    poissonCdf: poissonCdf,
    poissonMean: poissonMean,
    poissonVar: poissonVar,
    geomPmf: geomPmf,
    geomCdf: geomCdf,
    geomMean: geomMean,
    geomVar: geomVar,
    nbinomPmf: nbinomPmf,
    nbinomCdf: nbinomCdf,
    nbinomMean: nbinomMean,
    nbinomVar: nbinomVar,
    hyperPmf: hyperPmf,
    hyperCdf: hyperCdf,
    hyperMean: hyperMean,
    hyperVar: hyperVar,
    normalPdf: normalPdf,
    normalCdf: normalCdf,
    normalCdfAt: normalCdfAt
  };

  var BAR_CAP = 72;

  function attrNum(el, name, fallback) {
    var raw = el.getAttribute(name);
    if (raw == null || String(raw).trim() === "") return fallback;
    var v = Number(raw);
    return isFinite(v) ? v : fallback;
  }

  function attrEnum(el, name, allowed, fallback) {
    var raw = el.getAttribute(name);
    if (raw == null) return fallback;
    raw = String(raw).trim().toLowerCase();
    for (var i = 0; i < allowed.length; i++) {
      if (allowed[i] === raw) return raw;
    }
    return fallback;
  }

  function fmtProb(x) {
    if (!isFinite(x)) return "—";
    if (x < 0 && x > -1e-8) x = 0;
    if (x > 1 && x < 1 + 1e-8) x = 1;
    if (x !== 0 && Math.abs(x) < 5e-5) return x.toExponential(2);
    return x.toFixed(4);
  }

  function fmtStat(x) {
    if (!isFinite(x)) return "—";
    var ax = Math.abs(x);
    if (ax !== 0 && (ax >= 1e6 || ax < 1e-4)) return x.toExponential(2);
    if (Math.abs(x - Math.round(x)) < 1e-8) return String(Math.round(x));
    return x.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  }

  function texNum(x) {
    var s = fmtStat(x);
    var e = s.toLowerCase().indexOf("e");
    if (e < 0) return s;
    return s.slice(0, e) + "\\times 10^{" + Number(s.slice(e + 1)) + "}";
  }

  function fmtTick(y) {
    if (!isFinite(y) || Math.abs(y) < 1e-12) return "0";
    var ax = Math.abs(y);
    if (ax >= 100) return y.toFixed(0);
    if (ax >= 10) return y.toFixed(1).replace(/\.0$/, "");
    if (ax >= 1) return y.toFixed(2).replace(/0$/, "").replace(/\.0$/, "");
    if (ax >= 0.01) return y.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
    return y.toExponential(1);
  }

  function stepDecimals(step) {
    var s = String(step);
    var dot = s.indexOf(".");
    return dot < 0 ? 0 : s.length - dot - 1;
  }

  function formatStep(v, step) {
    if (!isFinite(v)) return "—";
    if (!(step > 0) || step >= 1) return String(Math.round(v));
    return Number(v).toFixed(stepDecimals(step));
  }

  function readNum(input) {
    var v = Number(input.value);
    var step = Number(input.step || "1");
    if (!(step > 0)) return v;
    if (step >= 1) return Math.round(v);
    var pow = Math.pow(10, Math.min(8, stepDecimals(step) + 2));
    return Math.round(Math.round(v / step) * step * pow) / pow;
  }

  function clamp(v, lo, hi) {
    if (v < lo) return lo;
    if (v > hi) return hi;
    return v;
  }

  function niceStep(span) {
    if (!(span > 0)) return 0.1;
    var target = span / 80;
    var pow = Math.pow(10, Math.floor(Math.log10(target)));
    var n = target / pow;
    var f = 1;
    if (n > 5) f = 10;
    else if (n > 2) f = 5;
    else if (n > 1) f = 2;
    return f * pow;
  }

  function snap(v, step) {
    if (!(step > 0)) return v;
    var pow = Math.pow(10, Math.min(8, stepDecimals(step) + 2));
    return Math.round(Math.round(v / step) * step * pow) / pow;
  }

  function writeRange(input, min, max, step, value) {
    if (typeof document !== "undefined" && document.activeElement === input) {
      return readNum(input);
    }
    var pow = Math.pow(10, Math.min(8, stepDecimals(step) + 2));
    var minG = Math.round(Math.floor((min + step * 1e-6) / step) * step * pow) / pow;
    var maxG = Math.round(Math.ceil((max - step * 1e-6) / step) * step * pow) / pow;
    if (!(maxG > minG)) maxG = Math.round((minG + step) * pow) / pow;
    var v = snap(value, step);
    if (v < minG) v = minG;
    if (v > maxG) v = maxG;
    input.min = String(minG);
    input.max = String(maxG);
    input.step = String(step);
    input.value = formatStep(v, step);
    return readNum(input);
  }

  function setMath(node, sr, tex, plain) {
    if (sr) sr.textContent = plain;
    if (!node) return;
    var ok = false;
    if (window.katex && typeof window.katex.render === "function") {
      try {
        window.katex.render(tex, node, { throwOnError: true, displayMode: false });
        ok = true;
      } catch (err) {
        ok = false;
      }
    }
    if (!ok) node.textContent = plain;
  }

  function chartSize(host) {
    var w = host.clientWidth || 0;
    if (w < 40) w = 640;
    return { w: Math.round(w), h: w < 520 ? 224 : 272 };
  }

  function mountSvg(host, w, h, inner) {
    host.innerHTML = '<svg class="prob-svg" aria-hidden="true" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '">' + inner + "</svg>";
    if (host.firstChild && host.firstChild.style) host.firstChild.style.height = h + "px";
  }

  function labelIdx(n) {
    if (n <= 1) return [0];
    var want = n <= 14 ? n : 7;
    var seen = {};
    var out = [];
    for (var i = 0; i < want; i++) {
      var idx = Math.round((i * (n - 1)) / (want - 1));
      if (!seen[idx]) {
        seen[idx] = 1;
        out.push(idx);
      }
    }
    return out;
  }

  function plotChrome(under, over, w, h, padL, padT, innerW, innerH, yMax, xLabels) {
    var g;
    for (g = 1; g <= 3; g++) {
      var gy = padT + innerH - (innerH * g) / 3;
      under.push('<line class="prob-grid" x1="' + padL + '" y1="' + gy.toFixed(1) + '" x2="' + (padL + innerW) + '" y2="' + gy.toFixed(1) + '"></line>');
    }
    for (g = 0; g <= 3; g++) {
      var gyL = padT + innerH - (innerH * g) / 3;
      over.push('<text class="prob-tick" x="' + (padL - 6) + '" y="' + gyL.toFixed(1) + '" text-anchor="end" dominant-baseline="middle">' + fmtTick((yMax * g) / 3) + "</text>");
    }
    over.push('<line class="prob-axis" x1="' + padL + '" y1="' + (padT + innerH) + '" x2="' + (padL + innerW) + '" y2="' + (padT + innerH) + '"></line>');
    over.push('<line class="prob-axis" x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (padT + innerH) + '"></line>');
    for (var j = 0; j < xLabels.length; j++) {
      var lab = xLabels[j];
      over.push('<text class="prob-tick" x="' + lab.x.toFixed(1) + '" y="' + (h - 8) + '" text-anchor="middle">' + lab.text + "</text>");
    }
  }

  function drawDiscrete(host, points, kCut) {
    var box = chartSize(host);
    var w = box.w;
    var h = box.h;
    var padL = 46;
    var padR = 8;
    var padT = 16;
    var padB = 26;
    var innerW = Math.max(10, w - padL - padR);
    var innerH = Math.max(10, h - padT - padB);
    if (!points.length) {
      mountSvg(host, w, h, "");
      return;
    }
    var yMax = 0;
    var i;
    for (i = 0; i < points.length; i++) if (points[i].p > yMax) yMax = points[i].p;
    if (!(yMax > 0)) yMax = 1;
    yMax *= 1.12;
    var n = points.length;
    var slot = innerW / n;
    var gap = n > 24 ? 1 : 2;
    var bw = Math.max(1, slot - gap);
    var under = [];
    var over = [];
    var parts = [];
    var markX = null;
    for (i = 0; i < n; i++) {
      var pt = points[i];
      var bh = (pt.p / yMax) * innerH;
      var x = padL + i * slot + (slot - bw) / 2;
      var y = padT + innerH - bh;
      parts.push('<rect class="prob-bar' + (pt.k <= kCut ? " prob-bar-on" : "") + '" x="' + x.toFixed(2) + '" y="' + y.toFixed(2) + '" width="' + bw.toFixed(2) + '" height="' + Math.max(0, bh).toFixed(2) + '"></rect>');
      if (pt.k === kCut) markX = x + bw;
    }
    if (markX != null) {
      parts.push('<line class="prob-mark" x1="' + markX.toFixed(2) + '" y1="' + padT + '" x2="' + markX.toFixed(2) + '" y2="' + (padT + innerH) + '"></line>');
    }
    var idxs = labelIdx(n);
    var xLabels = [];
    for (i = 0; i < idxs.length; i++) {
      var ii = idxs[i];
      xLabels.push({ x: padL + ii * slot + slot / 2, text: String(points[ii].k) });
    }
    plotChrome(under, over, w, h, padL, padT, innerW, innerH, yMax, xLabels);
    mountSvg(host, w, h, under.concat(parts, over).join(""));
  }

  function drawCurveChart(host, spec) {
    var box = chartSize(host);
    var w = box.w;
    var h = box.h;
    var padL = 46;
    var padR = 10;
    var padT = 16;
    var padB = 26;
    var innerW = Math.max(10, w - padL - padR);
    var innerH = Math.max(10, h - padT - padB);
    var x0 = spec.x0;
    var x1 = spec.x1;
    var yMax = spec.yMax > 0 ? spec.yMax : 1;
    function sx(x) {
      return padL + ((x - x0) / (x1 - x0)) * innerW;
    }
    function sy(y) {
      return padT + innerH - (y / yMax) * innerH;
    }
    var under = [];
    var over = [];
    var parts = [];
    var lo = Math.min(spec.shadeLo, spec.shadeHi);
    var hi = Math.max(spec.shadeLo, spec.shadeHi);
    var s0 = clamp(lo, x0, x1);
    var s1 = clamp(hi, x0, x1);
    if (s1 > s0 + 1e-9) {
      var shade = [];
      var stepsS = Math.max(24, Math.round(((s1 - s0) / (x1 - x0)) * innerW / 3));
      shade.push("M" + sx(s0).toFixed(1) + "," + sy(0).toFixed(1));
      for (var s = 0; s <= stepsS; s++) {
        var xs = s0 + ((s1 - s0) * s) / stepsS;
        shade.push("L" + sx(xs).toFixed(1) + "," + sy(spec.pdf(xs)).toFixed(1));
      }
      shade.push("L" + sx(s1).toFixed(1) + "," + sy(0).toFixed(1) + "Z");
      parts.push('<path class="prob-shade" d="' + shade.join("") + '"></path>');
    }
    if (spec.bars) {
      var barData = Math.min(0.78, (x1 - x0) / 30);
      for (var b = 0; b < spec.bars.length; b++) {
        var bar = spec.bars[b];
        if (bar.k < x0 - 0.6 || bar.k > x1 + 0.6) continue;
        var bw = Math.max(1, (barData / (x1 - x0)) * innerW);
        var bh = (bar.p / yMax) * innerH;
        var x = sx(bar.k) - bw / 2;
        var y = padT + innerH - bh;
        parts.push('<rect class="prob-pmf" x="' + x.toFixed(2) + '" y="' + y.toFixed(2) + '" width="' + bw.toFixed(2) + '" height="' + Math.max(0, bh).toFixed(2) + '"></rect>');
      }
    }
    if (spec.hist) {
      var bins = spec.hist.length;
      var slot = innerW / bins;
      var gap = 1;
      var hw = Math.max(1, slot - gap);
      for (var c = 0; c < bins; c++) {
        var hh = (spec.hist[c] / yMax) * innerH;
        var hx = padL + c * slot + (slot - hw) / 2;
        var hy = padT + innerH - hh;
        parts.push('<rect class="prob-hist" x="' + hx.toFixed(2) + '" y="' + hy.toFixed(2) + '" width="' + hw.toFixed(2) + '" height="' + Math.max(0, hh).toFixed(2) + '"></rect>');
      }
    }
    var steps = Math.max(48, Math.round(innerW / 3));
    var d = [];
    for (var i = 0; i <= steps; i++) {
      var x = x0 + ((x1 - x0) * i) / steps;
      d.push((i ? "L" : "M") + sx(x).toFixed(1) + "," + sy(spec.pdf(x)).toFixed(1));
    }
    parts.push('<path class="prob-curve" d="' + d.join("") + '"></path>');
    if (isFinite(spec.mark)) {
      var mx = sx(spec.mark);
      parts.push('<line class="prob-mean" x1="' + mx.toFixed(1) + '" y1="' + padT + '" x2="' + mx.toFixed(1) + '" y2="' + (padT + innerH) + '"></line>');
      parts.push('<text class="prob-mu" x="' + (mx + 5).toFixed(1) + '" y="' + (padT + 14) + '" text-anchor="start">μ</text>');
    }
    var xLabels = [];
    for (var t = 0; t <= 4; t++) {
      var xv = x0 + ((x1 - x0) * t) / 4;
      xLabels.push({ x: sx(xv), text: fmtTick(xv) });
    }
    plotChrome(under, over, w, h, padL, padT, innerW, innerH, yMax, xLabels);
    mountSvg(host, w, h, under.concat(parts, over).join(""));
  }

  function fieldHtml(p) {
    return '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">' + p.legend +
      '</span><output data-out="' + p.key + '">' + formatStep(p.value, p.step) + "</output></span>" +
      '<input type="range" data-param="' + p.key + '" min="' + p.min + '" max="' + p.max + '" step="' + p.step +
      '" value="' + p.value + '" aria-label="' + p.aria + '"></label>';
  }

  function headHtml(title, lead) {
    return '<div class="prob-lab-head"><h3 class="prob-lab-title">' + title + '</h3><p class="prob-lab-lead">' + lead + "</p></div>";
  }

  function statHtml(kicker, key) {
    return '<div class="prob-stat"><span class="prob-k">' + kicker + '</span><div class="prob-math" aria-hidden="true" data-' + key +
      '></div><span class="prob-sr" data-' + key + "-sr></span></div>";
  }

  function plainStat(kicker, key) {
    return '<div class="prob-stat"><span class="prob-k">' + kicker + '</span><strong class="prob-num" data-' + key + "></strong></div>";
  }

  function coveredPoints(pmfAt, kMin, target, cap) {
    var pts = [];
    var sum = 0;
    var k = kMin;
    var last = kMin;
    while (k <= cap) {
      var pk = pmfAt(k);
      pts.push({ k: k, p: pk });
      sum += pk;
      last = k;
      if (k >= target && sum >= 0.999) break;
      k += 1;
    }
    var tail = 1 - sum;
    if (tail < 0.0005) tail = 0;
    if (tail < 0) tail = 0;
    return { points: pts, tail: tail, last: last };
  }

  var DIST = {
    binomial: {
      option: "בינומית (Binomial)",
      def: "X סופר הצלחות ב־n ניסויי ברנולי בלתי תלויים, לכל אחד הסתברות הצלחה p. הערכים האפשריים הם 0, 1, …, n.",
      params: [
        { key: "n", legend: "n מספר ניסויים", aria: "מספר ניסויים n", min: 1, max: 40, step: 1, value: 10 },
        { key: "p", legend: "p הסתברות להצלחה", aria: "הסתברות להצלחה p", min: 0.01, max: 0.99, step: 0.01, value: 0.5 }
      ],
      mean: function (par) { return binomMean(par.n, par.p); },
      variance: function (par) { return binomVar(par.n, par.p); },
      meanPlain: function (val) { return "E[X] = np = " + fmtStat(val); },
      meanTex: function (val) { return "E[X]=np=" + texNum(val); },
      varPlain: function (val) { return "Var(X) = np(1−p) = " + fmtStat(val); },
      varTex: function (val) { return "\\mathrm{Var}(X)=np(1-p)=" + texNum(val); },
      cdf: function (k, par) { return binomCdf(k, par.n, par.p); },
      points: function (par) {
        var pts = [];
        for (var k = 0; k <= par.n; k++) pts.push({ k: k, p: binomPmf(k, par.n, par.p) });
        return { points: pts, tail: 0 };
      }
    },
    poisson: {
      option: "פואסונית (Poisson)",
      def: "X סופר אירועים כשהממוצע הוא λ. הערכים האפשריים הם 0, 1, 2, …",
      params: [
        { key: "lambda", legend: "λ ממוצע האירועים", aria: "ממוצע האירועים למבדה", min: 0.1, max: 20, step: 0.1, value: 4 }
      ],
      mean: function (par) { return poissonMean(par.lambda); },
      variance: function (par) { return poissonVar(par.lambda); },
      meanPlain: function (val) { return "E[X] = λ = " + fmtStat(val); },
      meanTex: function (val) { return "E[X]=\\lambda=" + texNum(val); },
      varPlain: function (val) { return "Var(X) = λ = " + fmtStat(val); },
      varTex: function (val) { return "\\mathrm{Var}(X)=\\lambda=" + texNum(val); },
      cdf: function (k, par) { return poissonCdf(k, par.lambda); },
      points: function (par) {
        var target = Math.max(8, Math.ceil(par.lambda + 5 * Math.sqrt(par.lambda)));
        return coveredPoints(function (k) { return poissonPmf(k, par.lambda); }, 0, target, BAR_CAP);
      }
    },
    geometric: {
      option: "גאומטרית (Geometric)",
      def: "X הוא מספר הניסויים עד ההצלחה הראשונה, כולל אותה. התמיכה היא k = 1, 2, 3, …",
      params: [
        { key: "p", legend: "p הסתברות להצלחה", aria: "הסתברות להצלחה p", min: 0.05, max: 0.95, step: 0.01, value: 0.3 }
      ],
      mean: function (par) { return geomMean(par.p); },
      variance: function (par) { return geomVar(par.p); },
      meanPlain: function (val) { return "E[X] = 1/p = " + fmtStat(val); },
      meanTex: function (val) { return "E[X]=\\frac{1}{p}=" + texNum(val); },
      varPlain: function (val) { return "Var(X) = (1−p)/p² = " + fmtStat(val); },
      varTex: function (val) { return "\\mathrm{Var}(X)=\\frac{1-p}{p^{2}}=" + texNum(val); },
      cdf: function (k, par) { return geomCdf(k, par.p); },
      points: function (par) {
        var target = 8;
        if (par.p < 1) target = Math.max(8, Math.ceil(Math.log(0.001) / Math.log(1 - par.p)));
        return coveredPoints(function (k) { return geomPmf(k, par.p); }, 1, target, BAR_CAP);
      }
    },
    negbinomial: {
      option: "בינומית שלילית (Negative Binomial)",
      def: "X הוא מספר הניסויים עד הצלחה מספר r, כולל. התמיכה היא k = r, r+1, …",
      params: [
        { key: "r", legend: "r מספר הצלחות", aria: "מספר ההצלחות הנדרש r", min: 1, max: 8, step: 1, value: 3 },
        { key: "p", legend: "p הסתברות להצלחה", aria: "הסתברות להצלחה p", min: 0.25, max: 0.95, step: 0.01, value: 0.4 }
      ],
      mean: function (par) { return nbinomMean(par.r, par.p); },
      variance: function (par) { return nbinomVar(par.r, par.p); },
      meanPlain: function (val) { return "E[X] = r/p = " + fmtStat(val); },
      meanTex: function (val) { return "E[X]=\\frac{r}{p}=" + texNum(val); },
      varPlain: function (val) { return "Var(X) = r(1−p)/p² = " + fmtStat(val); },
      varTex: function (val) { return "\\mathrm{Var}(X)=\\frac{r(1-p)}{p^{2}}=" + texNum(val); },
      cdf: function (k, par) { return nbinomCdf(k, par.r, par.p); },
      points: function (par) {
        var mean = nbinomMean(par.r, par.p);
        var sd = Math.sqrt(nbinomVar(par.r, par.p));
        var target = Math.max(par.r + 6, Math.ceil(mean + 5 * sd));
        return coveredPoints(function (k) { return nbinomPmf(k, par.r, par.p); }, par.r, target, BAR_CAP);
      }
    },
    hypergeometric: {
      option: "היפרגאומטרית (Hypergeometric)",
      def: "מדגם בגודל n נמשך מאוכלוסייה בגודל N שבה m פריטים מסומנים. X סופר כמה מסומנים נדגמו.",
      params: [
        { key: "N", legend: "N גודל האוכלוסייה", aria: "גודל האוכלוסייה N", min: 2, max: 36, step: 1, value: 20 },
        { key: "m", legend: "m מספר המסומנים", aria: "מספר הפריטים המסומנים באוכלוסייה m", min: 0, max: 20, step: 1, value: 8 },
        { key: "n", legend: "n גודל המדגם", aria: "גודל המדגם n", min: 1, max: 20, step: 1, value: 6 }
      ],
      mean: function (par) { return hyperMean(par.N, par.m, par.n); },
      variance: function (par) { return hyperVar(par.N, par.m, par.n); },
      meanPlain: function (val) { return "E[X] = nm/N = " + fmtStat(val); },
      meanTex: function (val) { return "E[X]=\\frac{nm}{N}=" + texNum(val); },
      varPlain: function (val) { return "Var(X) = n(m/N)(1−m/N)(N−n)/(N−1) = " + fmtStat(val); },
      varTex: function (val) { return "\\mathrm{Var}(X)=n\\frac{m}{N}\\left(1-\\frac{m}{N}\\right)\\frac{N-n}{N-1}=" + texNum(val); },
      cdf: function (k, par) { return hyperCdf(k, par.N, par.m, par.n); },
      points: function (par) {
        var lo = hyperLo(par.N, par.m, par.n);
        var hi = hyperHi(par.N, par.m, par.n);
        var pts = [];
        for (var k = lo; k <= hi; k++) pts.push({ k: k, p: hyperPmf(k, par.N, par.m, par.n) });
        return { points: pts, tail: 0 };
      }
    }
  };

  function mountDist(el) {
    var initial = attrEnum(el, "data-dist", ["binomial", "poisson", "geometric", "negbinomial", "hypergeometric"], "binomial");
    var options = "";
    var key;
    for (key in DIST) {
      if (!Object.prototype.hasOwnProperty.call(DIST, key)) continue;
      options += '<option value="' + key + '"' + (key === initial ? " selected" : "") + ">" + DIST[key].option + "</option>";
    }
    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: התפלגויות בדידות");
    el.innerHTML = headHtml("התפלגויות בדידות", "העמודות הן פונקציית ההסתברות P(X=k). הזיזו את k כדי לסמן את ההסתברות המצטברת P(X≤k).") +
      '<div class="prob-controls"><label class="prob-field prob-span"><span class="prob-field-label">התפלגות</span>' +
      '<select data-pick aria-label="בחירת התפלגות">' + options + "</select></label>" +
      '<div class="prob-params" data-params></div>' +
      '<label class="prob-field prob-span"><span class="prob-field-top"><span class="prob-field-label">k לסימון P(X≤k)</span><output data-k-out>0</output></span>' +
      '<input type="range" data-k min="0" max="1" step="1" value="0" aria-label="סף k להסתברות המצטברת"></label></div>' +
      '<p class="prob-def" data-def></p>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="תרשים פונקציית הסתברות"></div>' +
      '<p class="prob-note" data-note></p>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("תוחלת (Expectation)", "mean") +
      statHtml("שונות (Variance)", "var") +
      statHtml("הסתברות מצטברת (CDF)", "cdf") +
      "</div>";

    var paramsBox = el.querySelector("[data-params]");
    function build(name) {
      var html = "";
      var list = DIST[name].params;
      for (var i = 0; i < list.length; i++) html += fieldHtml(list[i]);
      paramsBox.innerHTML = html;
    }
    build(initial);
    el.setAttribute("data-reset-k", "1");

    function readParams(name) {
      var spec = DIST[name];
      var params = {};
      for (var i = 0; i < spec.params.length; i++) {
        var p = spec.params[i];
        var input = el.querySelector('[data-param="' + p.key + '"]');
        params[p.key] = readNum(input);
        var out = el.querySelector('[data-out="' + p.key + '"]');
        if (out) out.textContent = formatStep(params[p.key], p.step);
      }
      if (name === "hypergeometric") {
        var mIn = el.querySelector('[data-param="m"]');
        var nIn = el.querySelector('[data-param="n"]');
        if (document.activeElement !== mIn) {
          mIn.max = String(params.N);
          if (params.m > params.N) {
            params.m = params.N;
            mIn.value = String(params.N);
          }
        } else {
          params.m = Math.min(params.m, params.N);
        }
        if (document.activeElement !== nIn) {
          nIn.max = String(params.N);
          if (params.n > params.N) {
            params.n = params.N;
            nIn.value = String(params.N);
          }
          if (params.n < 1) {
            params.n = 1;
            nIn.value = "1";
          }
        } else {
          params.n = clamp(params.n, 1, params.N);
        }
        var mOut = el.querySelector('[data-out="m"]');
        var nOut = el.querySelector('[data-out="n"]');
        if (mOut) mOut.textContent = String(params.m);
        if (nOut) nOut.textContent = String(params.n);
      }
      return params;
    }

    var last = null;
    function paint() {
      var name = el.querySelector("[data-pick]").value;
      if (!DIST[name]) name = "binomial";
      var spec = DIST[name];
      var params = readParams(name);
      var pack = spec.points(params);
      var mean = spec.mean(params);
      var variance = spec.variance(params);
      var kInput = el.querySelector("[data-k]");
      var minK = pack.points.length ? pack.points[0].k : 0;
      var maxK = pack.points.length ? pack.points[pack.points.length - 1].k : 0;
      var k;
      if (el.getAttribute("data-reset-k") === "1") {
        k = clamp(Math.round(mean), minK, maxK);
        el.removeAttribute("data-reset-k");
        kInput.min = String(minK);
        kInput.max = String(maxK);
        kInput.value = String(k);
      } else if (document.activeElement === kInput) {
        kInput.min = String(minK);
        kInput.max = String(maxK);
        k = clamp(Math.round(Number(kInput.value)), minK, maxK);
      } else {
        k = clamp(Math.round(Number(kInput.value)), minK, maxK);
        kInput.min = String(minK);
        kInput.max = String(maxK);
        kInput.value = String(k);
      }
      el.querySelector("[data-k-out]").textContent = String(k);
      var cdf = spec.cdf(k, params);
      last = {
        spec: spec,
        pack: pack,
        mean: mean,
        variance: variance,
        k: k,
        cdf: cdf,
        minK: minK,
        maxK: maxK,
        name: name
      };
      applyDist(last);
      drawDist(last);
    }

    function applyDist(model) {
      el.querySelector("[data-def]").textContent = model.spec.def;
      var note = el.querySelector("[data-note]");
      if (model.pack.tail > 0) {
        note.textContent = "התרשים מראה k מ־" + model.minK + " עד " + model.maxK + ". ההסתברות מעבר לכך היא " + fmtProb(model.pack.tail) + ". הערך P(X≤k) מחושב על כל התמיכה, לא רק על מה שמצויר.";
      } else {
        note.textContent = "";
      }
      var meanPlain = model.spec.meanPlain(model.mean);
      var varPlain = model.spec.varPlain(model.variance);
      var cdfPlain = "P(X ≤ " + model.k + ") = " + fmtProb(model.cdf);
      setMath(el.querySelector("[data-mean]"), el.querySelector("[data-mean-sr]"), model.spec.meanTex(model.mean), meanPlain);
      setMath(el.querySelector("[data-var]"), el.querySelector("[data-var-sr]"), model.spec.varTex(model.variance), varPlain);
      setMath(el.querySelector("[data-cdf]"), el.querySelector("[data-cdf-sr]"), "P(X\\le " + model.k + ")=" + texNum(model.cdf), cdfPlain);
      el.querySelector("[data-chart]").setAttribute("aria-label", "תרשים עמודות של " + model.spec.option + ". העמודות עד k שווה " + model.k + " מודגשות, ו־P(X≤k) שווה " + fmtProb(model.cdf) + ".");
    }

    function drawDist(model) {
      drawDiscrete(el.querySelector("[data-chart]"), model.pack.points, model.k);
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      paint();
    });
    el.addEventListener("change", function (ev) {
      if (!ev.target || !ev.target.getAttribute || ev.target.getAttribute("data-pick") == null) return;
      build(ev.target.value);
      el.setAttribute("data-reset-k", "1");
      paint();
    });
    el.setAttribute("data-chart-live", "1");
    el.probRedraw = function () {
      if (last) drawDist(last);
    };
    paint();
  }

  function ceilEps(x) {
    return Math.ceil(Math.round(x * 1e6) / 1e6 - 1e-8);
  }

  function floorEps(x) {
    return Math.floor(Math.round(x * 1e6) / 1e6 + 1e-8);
  }

  function mountNormal(el) {
    var mu0 = attrNum(el, "data-mu", 0);
    var sigma0 = attrNum(el, "data-sigma", 1);
    if (!(sigma0 > 0)) sigma0 = 1;
    var nRaw = el.getAttribute("data-n");
    var pRaw = el.getAttribute("data-p");
    var startCompare = nRaw != null && String(nRaw).trim() !== "" && pRaw != null && String(pRaw).trim() !== "";
    var n0 = startCompare ? Math.round(attrNum(el, "data-n", 20)) : 20;
    var p0 = startCompare ? attrNum(el, "data-p", 0.5) : 0.5;
    if (!(n0 >= 1)) n0 = 1;
    if (n0 > 200) n0 = 200;
    if (!(p0 > 0 && p0 < 1)) p0 = 0.5;
    p0 = clamp(p0, 0.01, 0.99);
    var muMin = Math.min(-6, mu0);
    var muMax = Math.max(6, mu0);
    var sigMin = Math.min(0.2, sigma0);
    var sigMax = Math.max(5, sigma0);
    if (sigMin < 0.05) sigMin = 0.05;
    var a0 = mu0 - sigma0;
    var b0 = mu0 + sigma0;
    var win0 = 4 * sigma0;
    var step0 = niceStep(2 * win0);

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: התפלגות נורמלית");
    el.innerHTML = headHtml("התפלגות נורמלית (Normal)", "השטח הצבוע הוא ההסתברות שהמשתנה נופל בין שני גבולות. ערך z הוא המרחק מהתוחלת ביחידות של סטיית תקן.") +
      '<div class="prob-controls">' +
      '<div class="prob-params" data-free' + (startCompare ? " hidden" : "") + ">" +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">μ תוחלת</span><output data-out="mu"></output></span>' +
      '<input type="range" data-mu min="' + muMin + '" max="' + muMax + '" step="0.1" value="' + mu0 + '" aria-label="תוחלת מיו"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">σ סטיית תקן</span><output data-out="sigma"></output></span>' +
      '<input type="range" data-sigma min="' + sigMin + '" max="' + sigMax + '" step="0.1" value="' + sigma0 + '" aria-label="סטיית תקן סיגמה"></label>' +
      "</div>" +
      '<div class="prob-params" data-bin' + (startCompare ? "" : " hidden") + ">" +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">n מספר ניסויים</span><output data-out="n">' + n0 + "</output></span>" +
      '<input type="range" data-n min="1" max="200" step="1" value="' + n0 + '" aria-label="מספר ניסויים בינומיים n"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">p הסתברות להצלחה</span><output data-out="p">' + formatStep(p0, 0.01) + "</output></span>" +
      '<input type="range" data-p min="0.01" max="0.99" step="0.01" value="' + p0 + '" aria-label="הסתברות להצלחה p"></label>' +
      "</div>" +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">a גבול תחתון</span><output data-out="a"></output></span>' +
      '<input type="range" data-a min="' + (mu0 - win0) + '" max="' + (mu0 + win0) + '" step="' + step0 + '" value="' + a0 + '" aria-label="גבול תחתון a"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">b גבול עליון</span><output data-out="b"></output></span>' +
      '<input type="range" data-b min="' + (mu0 - win0) + '" max="' + (mu0 + win0) + '" step="' + step0 + '" value="' + b0 + '" aria-label="גבול עליון b"></label>' +
      '<div class="prob-actions"><button type="button" class="prob-toggle" data-compare aria-pressed="' + (startCompare ? "true" : "false") + '">השוואה לבינומית עם תיקון רציפות</button></div>' +
      "</div>" +
      '<p class="prob-def" data-def>X מתפלג נורמלית עם תוחלת μ ושונות σ². Φ היא פונקציית ההתפלגות המצטברת של נורמלית סטנדרטית.</p>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="צפיפות נורמלית"></div>' +
      '<p class="prob-note" data-note></p>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      plainStat("תוחלת μ", "mu-read") +
      plainStat("סטיית תקן σ", "sigma-read") +
      '<div class="prob-stat"><span class="prob-k" data-prob-k>הסתברות</span><strong class="prob-num" data-prob></strong></div>' +
      plainStat("ציוני תקן (z)", "z") +
      '<div class="prob-stat" data-exact-box' + (startCompare ? "" : " hidden") + '><span class="prob-k">הסתברות מדויקת (בינומית)</span><strong class="prob-num" data-exact></strong></div>' +
      '<div class="prob-stat" data-approx-box' + (startCompare ? "" : " hidden") + '><span class="prob-k">קירוב עם תיקון רציפות</span><strong class="prob-num" data-approx></strong></div>' +
      '<div class="prob-stat" data-diff-box' + (startCompare ? "" : " hidden") + '><span class="prob-k">הפרש מוחלט</span><strong class="prob-num" data-diff></strong></div>' +
      "</div>";

    var binMu = n0 * p0;
    var binSigma = Math.sqrt(n0 * p0 * (1 - p0));
    var state = {
      compare: startCompare,
      mu: startCompare ? binMu : mu0,
      sigma: startCompare ? binSigma : sigma0,
      a: startCompare ? binMu - binSigma : a0,
      b: startCompare ? binMu + binSigma : b0,
      n: n0,
      p: p0,
      free: { mu: mu0, sigma: sigma0, a: a0, b: b0 }
    };
    var last = null;

    function syncOutputs() {
      el.querySelector('[data-out="mu"]').textContent = formatStep(state.mu, 0.1);
      el.querySelector('[data-out="sigma"]').textContent = formatStep(state.sigma, 0.1);
      el.querySelector('[data-out="n"]').textContent = String(state.n);
      el.querySelector('[data-out="p"]').textContent = formatStep(state.p, 0.01);
      var aStep = Number(el.querySelector("[data-a]").step) || 0.1;
      el.querySelector('[data-out="a"]').textContent = formatStep(state.a, aStep);
      el.querySelector('[data-out="b"]').textContent = formatStep(state.b, aStep);
    }

    function syncBounds() {
      var span = 4 * state.sigma;
      var lo = state.mu - span;
      var hi = state.mu + span;
      var step = niceStep(hi - lo);
      var aIn = el.querySelector("[data-a]");
      var bIn = el.querySelector("[data-b]");
      state.a = writeRange(aIn, lo, hi, step, state.a);
      state.b = writeRange(bIn, lo, hi, step, state.b);
    }

    function readFree() {
      state.mu = readNum(el.querySelector("[data-mu]"));
      state.sigma = readNum(el.querySelector("[data-sigma]"));
      if (!(state.sigma > 0)) state.sigma = sigMin;
      state.a = Number(el.querySelector("[data-a]").value);
      state.b = Number(el.querySelector("[data-b]").value);
    }

    function readBin() {
      state.n = readNum(el.querySelector("[data-n]"));
      state.p = readNum(el.querySelector("[data-p]"));
      state.mu = state.n * state.p;
      state.sigma = Math.sqrt(state.n * state.p * (1 - state.p));
      state.a = Number(el.querySelector("[data-a]").value);
      state.b = Number(el.querySelector("[data-b]").value);
    }

    function setCompare(on) {
      var btn = el.querySelector("[data-compare]");
      if (on === state.compare) return;
      if (on) {
        state.free = { mu: state.mu, sigma: state.sigma, a: state.a, b: state.b };
        state.compare = true;
        state.mu = state.n * state.p;
        state.sigma = Math.sqrt(state.n * state.p * (1 - state.p));
        state.a = state.mu - state.sigma;
        state.b = state.mu + state.sigma;
      } else {
        state.compare = false;
        state.mu = state.free.mu;
        state.sigma = state.free.sigma;
        state.a = state.free.a;
        state.b = state.free.b;
        el.querySelector("[data-mu]").value = formatStep(state.mu, 0.1);
        el.querySelector("[data-sigma]").value = formatStep(state.sigma, 0.1);
      }
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      el.querySelector("[data-free]").hidden = on;
      el.querySelector("[data-bin]").hidden = !on;
      el.querySelector("[data-exact-box]").hidden = !on;
      el.querySelector("[data-approx-box]").hidden = !on;
      el.querySelector("[data-diff-box]").hidden = !on;
      syncBounds();
      paint(false);
    }

    function paint(fromInputs) {
      if (fromInputs) {
        if (state.compare) readBin();
        else readFree();
      }
      syncBounds();
      syncOutputs();
      var lo = Math.min(state.a, state.b);
      var hi = Math.max(state.a, state.b);
      var shadeLo = lo;
      var shadeHi = hi;
      var bars = null;
      var exact = null;
      var approx = null;
      var k1 = null;
      var k2 = null;
      var zShowA = (state.a - state.mu) / state.sigma;
      var zShowB = (state.b - state.mu) / state.sigma;
      if (state.compare) {
        k1 = ceilEps(lo);
        k2 = floorEps(hi);
        if (k1 <= k2) {
          shadeLo = k1 - 0.5;
          shadeHi = k2 + 0.5;
          exact = binomCdf(k2, state.n, state.p) - binomCdf(k1 - 1, state.n, state.p);
          var zLo = (k1 - 0.5 - state.mu) / state.sigma;
          var zHi = (k2 + 0.5 - state.mu) / state.sigma;
          approx = normalCdf(zHi) - normalCdf(zLo);
          zShowA = zLo;
          zShowB = zHi;
        } else {
          exact = 0;
          approx = 0;
          shadeLo = lo;
          shadeHi = lo;
        }
        bars = [];
        var x0b = state.mu - 4 * state.sigma;
        var x1b = state.mu + 4 * state.sigma;
        var ks = Math.max(0, Math.ceil(x0b));
        var ke = Math.min(state.n, Math.floor(x1b));
        for (var k = ks; k <= ke; k++) bars.push({ k: k, p: binomPmf(k, state.n, state.p) });
      }
      var prob = normalCdf((hi - state.mu) / state.sigma) - normalCdf((lo - state.mu) / state.sigma);
      last = {
        mu: state.mu,
        sigma: state.sigma,
        a: state.a,
        b: state.b,
        lo: lo,
        hi: hi,
        shadeLo: shadeLo,
        shadeHi: shadeHi,
        bars: bars,
        prob: prob,
        exact: exact,
        approx: approx,
        k1: k1,
        k2: k2,
        zA: zShowA,
        zB: zShowB,
        compare: state.compare,
        n: state.n,
        p: state.p
      };
      applyNormal(last);
      drawNormal(last);
    }

    function applyNormal(model) {
      el.querySelector("[data-prob-k]").textContent = model.compare ? "השטח הצבוע" : "הסתברות";
      el.querySelector("[data-mu-read]").textContent = model.compare ? "μ = np = " + fmtStat(model.mu) : "μ = " + fmtStat(model.mu);
      el.querySelector("[data-sigma-read]").textContent = model.compare ? "σ = √(np(1−p)) = " + fmtStat(model.sigma) : "σ = " + fmtStat(model.sigma);
      if (model.compare) {
        var hasK = model.k1 != null && model.k2 != null && model.k1 <= model.k2;
        el.querySelector("[data-prob]").textContent = hasK ? fmtProb(model.approx) : "0";
        el.querySelector("[data-z]").textContent = hasK ? "z(k₁−½) = " + fmtStat(model.zA) + ",  z(k₂+½) = " + fmtStat(model.zB) : "—";
        el.querySelector("[data-exact]").textContent = hasK ? "P(" + model.k1 + " ≤ X ≤ " + model.k2 + ") = " + fmtProb(model.exact) : "0";
        el.querySelector("[data-approx]").textContent = hasK ? "Φ(" + fmtStat(model.zB) + ") − Φ(" + fmtStat(model.zA) + ") = " + fmtProb(model.approx) : "0";
        el.querySelector("[data-diff]").textContent = fmtProb(Math.abs(model.exact - model.approx));
        el.querySelector("[data-note]").textContent = "בינומית עם n = " + model.n + " ו־p = " + formatStep(model.p, 0.01) +
          " מול נורמלית עם אותה תוחלת ואותה שונות. השלמים מ־k₁ = " + model.k1 + " עד k₂ = " + model.k2 +
          " נכללים בחישוב המדויק. השטח הצבוע רץ מ־k₁−½ עד k₂+½.";
        el.querySelector("[data-chart]").setAttribute("aria-label", "עמודות בינומיות ועקומה נורמלית. ההסתברות המדויקת היא " + fmtProb(model.exact) + " והקירוב עם תיקון רציפות הוא " + fmtProb(model.approx) + ".");
      } else {
        el.querySelector("[data-prob]").textContent = "P(" + fmtStat(model.lo) + " ≤ X ≤ " + fmtStat(model.hi) + ") = " + fmtProb(model.prob);
        el.querySelector("[data-z]").textContent = "z_a = " + fmtStat((model.a - model.mu) / model.sigma) + ",  z_b = " + fmtStat((model.b - model.mu) / model.sigma);
        el.querySelector("[data-note]").textContent = "";
        el.querySelector("[data-chart]").setAttribute("aria-label", "צפיפות נורמלית. השטח בין " + fmtStat(model.lo) + " ל־" + fmtStat(model.hi) + " שווה " + fmtProb(model.prob) + ".");
      }
    }

    function drawNormal(model) {
      var x0 = model.mu - 4 * model.sigma;
      var x1 = model.mu + 4 * model.sigma;
      var pdfMax = normalPdf(model.mu, model.mu, model.sigma);
      var yMax = pdfMax;
      if (model.bars) {
        for (var i = 0; i < model.bars.length; i++) if (model.bars[i].p > yMax) yMax = model.bars[i].p;
      }
      drawCurveChart(el.querySelector("[data-chart]"), {
        x0: x0,
        x1: x1,
        yMax: yMax * 1.12,
        shadeLo: model.shadeLo,
        shadeHi: model.shadeHi,
        bars: model.bars,
        mark: model.mu,
        pdf: function (x) { return normalPdf(x, model.mu, model.sigma); }
      });
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      paint(true);
    });
    el.addEventListener("click", function (ev) {
      var node = ev.target;
      var btn = null;
      while (node && node !== el) {
        if (node.getAttribute && node.getAttribute("data-compare") != null) btn = node;
        node = node.parentNode;
      }
      if (!btn) return;
      setCompare(btn.getAttribute("aria-pressed") !== "true");
    });
    el.setAttribute("data-chart-live", "1");
    el.probRedraw = function () {
      if (last) drawNormal(last);
    };
    paint(false);
  }

  var bayesSeq = 0;

  function bayesPost(prior, sens, spec, positive) {
    if (positive) {
      var num = prior * sens;
      var den = num + (1 - prior) * (1 - spec);
      return den > 0 ? num / den : null;
    }
    var numN = prior * (1 - sens);
    var denN = numN + (1 - prior) * spec;
    return denN > 0 ? numN / denN : null;
  }

  function mountBayes(el) {
    var prior0 = clamp(attrNum(el, "data-prior", 0.01), 0, 1);
    var sens0 = clamp(attrNum(el, "data-sens", 0.99), 0, 1);
    var spec0 = clamp(attrNum(el, "data-spec", 0.99), 0, 1);
    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: נוסחת בייס");
    el.innerHTML = headHtml("נוסחת בייס (Bayes)", "כל תא הוא אדם אחד מתוך אלף. שכיחות היא P(D), רגישות היא P(+|D), וסגוליות היא P(−|לא D).") +
      '<div class="prob-controls">' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">שכיחות (Prevalence)</span><output data-out="prior"></output></span>' +
      '<input type="range" data-prior min="0" max="1" step="0.01" value="' + prior0 + '" aria-label="שכיחות המחלה"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">רגישות (Sensitivity)</span><output data-out="sens"></output></span>' +
      '<input type="range" data-sens min="0" max="1" step="0.01" value="' + sens0 + '" aria-label="רגישות הבדיקה"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">סגוליות (Specificity)</span><output data-out="spec"></output></span>' +
      '<input type="range" data-spec min="0" max="1" step="0.01" value="' + spec0 + '" aria-label="סגוליות הבדיקה"></label>' +
      "</div>" +
      '<p class="prob-def">התאים מסודרים משמאל לימין: חיובי אמיתי, שלילי שגוי, חיובי שגוי, שלילי אמיתי.</p>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="רשת של אלף אנשים"></div>' +
      '<ul class="prob-legend">' +
      '<li><i class="prob-swatch tp" aria-hidden="true"></i><span data-leg="tp"></span></li>' +
      '<li><i class="prob-swatch fn" aria-hidden="true"></i><span data-leg="fn"></span></li>' +
      '<li><i class="prob-swatch fp" aria-hidden="true"></i><span data-leg="fp"></span></li>' +
      '<li><i class="prob-swatch tn" aria-hidden="true"></i><span data-leg="tn"></span></li>' +
      "</ul>" +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      '<div class="prob-stat prob-stat-wide"><span class="prob-k">הסתברות בדיעבד לחיובי, P(D|+)</span><div class="prob-math" aria-hidden="true" data-pos></div><span class="prob-sr" data-pos-sr></span><p class="prob-sub" data-pos-grid></p></div>' +
      '<div class="prob-stat prob-stat-wide"><span class="prob-k">הסתברות בדיעבד לשלילי, P(D|−)</span><div class="prob-math" aria-hidden="true" data-neg></div><span class="prob-sr" data-neg-sr></span><p class="prob-sub" data-neg-grid></p></div>' +
      "</div>";

    var chart = el.querySelector("[data-chart]");
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "prob-bayes");
    svg.setAttribute("viewBox", "0 0 550 220");
    svg.setAttribute("role", "presentation");
    svg.setAttribute("aria-hidden", "true");
    bayesSeq += 1;
    var patId = "prob-fp-" + bayesSeq;
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var pat = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    pat.setAttribute("id", patId);
    pat.setAttribute("patternUnits", "userSpaceOnUse");
    pat.setAttribute("width", "4");
    pat.setAttribute("height", "4");
    var patBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    patBg.setAttribute("width", "4");
    patBg.setAttribute("height", "4");
    patBg.setAttribute("class", "prob-fp-bg");
    var patLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
    patLine.setAttribute("d", "M-1 1 L1 -1 M0 4 L4 0 M3 5 L5 3");
    patLine.setAttribute("class", "prob-fp-line");
    pat.appendChild(patBg);
    pat.appendChild(patLine);
    defs.appendChild(pat);
    svg.appendChild(defs);
    var cells = [];
    for (var i = 0; i < 1000; i++) {
      var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      var col = i % 50;
      var row = Math.floor(i / 50);
      rect.setAttribute("x", String(col * 11));
      rect.setAttribute("y", String(row * 11));
      rect.setAttribute("width", "9");
      rect.setAttribute("height", "9");
      rect.setAttribute("rx", "1.5");
      rect.setAttribute("class", "prob-cell tn");
      svg.appendChild(rect);
      cells.push(rect);
    }
    chart.appendChild(svg);

    var leg = {
      tp: "חיובי אמיתי (True Positive)",
      fn: "שלילי שגוי (False Negative)",
      fp: "חיובי שגוי (False Positive)",
      tn: "שלילי אמיתי (True Negative)"
    };

    function paint() {
      var prior = readNum(el.querySelector("[data-prior]"));
      var sens = readNum(el.querySelector("[data-sens]"));
      var spec = readNum(el.querySelector("[data-spec]"));
      el.querySelector('[data-out="prior"]').textContent = formatStep(prior, 0.01);
      el.querySelector('[data-out="sens"]').textContent = formatStep(sens, 0.01);
      el.querySelector('[data-out="spec"]').textContent = formatStep(spec, 0.01);
      var diseased = clamp(Math.round(1000 * prior), 0, 1000);
      var healthy = 1000 - diseased;
      var tp = Math.round(diseased * sens);
      var fn = diseased - tp;
      var fp = Math.round(healthy * (1 - spec));
      var tn = healthy - fp;
      var counts = { tp: tp, fn: fn, fp: fp, tn: tn };
      var order = [];
      var name;
      for (name in counts) {
        if (!Object.prototype.hasOwnProperty.call(counts, name)) continue;
        for (var c = 0; c < counts[name]; c++) order.push(name);
      }
      for (var n = 0; n < 1000; n++) {
        var kind = order[n] || "tn";
        cells[n].setAttribute("class", "prob-cell " + kind);
        if (kind === "fp") cells[n].setAttribute("fill", "url(#" + patId + ")");
        else cells[n].removeAttribute("fill");
      }
      for (name in leg) {
        if (!Object.prototype.hasOwnProperty.call(leg, name)) continue;
        el.querySelector('[data-leg="' + name + '"]').textContent = leg[name] + ": " + counts[name];
      }
      var pPos = formatStep(prior, 0.01);
      var se = formatStep(sens, 0.01);
      var sp = formatStep(spec, 0.01);
      var oneMinusPrior = fmtStat(1 - prior);
      var oneMinusSens = fmtStat(1 - sens);
      var oneMinusSpec = fmtStat(1 - spec);
      var postP = bayesPost(prior, sens, spec, true);
      var postN = bayesPost(prior, sens, spec, false);
      var posPlain = postP == null ? "לא מוגדרת: אין תוצאה חיובית." : "(" + pPos + " × " + se + ") / (" + pPos + " × " + se + " + " + oneMinusPrior + " × " + oneMinusSpec + ") = " + fmtProb(postP);
      var negPlain = postN == null ? "לא מוגדרת: אין תוצאה שלילית." : "(" + pPos + " × " + oneMinusSens + ") / (" + pPos + " × " + oneMinusSens + " + " + oneMinusPrior + " × " + sp + ") = " + fmtProb(postN);
      var posTex = postP == null ? "\\text{undefined}" : "\\frac{" + pPos + "\\times " + se + "}{" + pPos + "\\times " + se + "+" + oneMinusPrior + "\\times " + oneMinusSpec + "}=" + texNum(postP);
      var negTex = postN == null ? "\\text{undefined}" : "\\frac{" + pPos + "\\times " + oneMinusSens + "}{" + pPos + "\\times " + oneMinusSens + "+" + oneMinusPrior + "\\times " + sp + "}=" + texNum(postN);
      if (postP == null) el.querySelector("[data-pos]").textContent = posPlain;
      else setMath(el.querySelector("[data-pos]"), null, posTex, posPlain);
      if (postN == null) el.querySelector("[data-neg]").textContent = negPlain;
      else setMath(el.querySelector("[data-neg]"), null, negTex, negPlain);
      el.querySelector("[data-pos-sr]").textContent = posPlain;
      el.querySelector("[data-neg-sr]").textContent = negPlain;
      var posDen = tp + fp;
      var negDen = fn + tn;
      el.querySelector("[data-pos-grid]").textContent = posDen ? "באלף התאים: " + tp + " חיוביים אמיתיים מתוך " + posDen + " תוצאות חיוביות, כלומר " + fmtProb(tp / posDen) + "." : "באלף התאים אין תוצאה חיובית.";
      el.querySelector("[data-neg-grid]").textContent = negDen ? "באלף התאים: " + fn + " שליליים שגויים מתוך " + negDen + " תוצאות שליליות, כלומר " + fmtProb(fn / negDen) + "." : "באלף התאים אין תוצאה שלילית.";
      chart.setAttribute("aria-label", "אלף אנשים: " + tp + " חיוביים אמיתיים, " + fn + " שליליים שגויים, " + fp + " חיוביים שגויים, " + tn + " שליליים אמיתיים. ההסתברות בדיעבד לחיובי היא " + (postP == null ? "לא מוגדרת" : fmtProb(postP)) + ".");
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      paint();
    });
    paint();
  }

  var POPS = {
    uniform: {
      option: "אחידה (Uniform) על (0, 1)",
      meanText: "1/2",
      varText: "1/12",
      mean: function () { return 0.5; },
      variance: function () { return 1 / 12; },
      meanOfMean: function (n) { return "μ = 1/2 = " + fmtStat(0.5); },
      varOfMean: function (n) { return "σ²/n = 1/(12n) = " + fmtStat((1 / 12) / n); },
      draw: function () { return Math.random(); }
    },
    exponential: {
      option: "מעריכית (Exponential), λ = 1",
      meanText: "1",
      varText: "1",
      mean: function () { return 1; },
      variance: function () { return 1; },
      meanOfMean: function () { return "μ = 1"; },
      varOfMean: function (n) { return "σ²/n = 1/n = " + fmtStat(1 / n); },
      draw: function () {
        var u = Math.random();
        return u <= 0 ? 40 : -Math.log(u);
      }
    },
    bernoulli: {
      option: "ברנולי (Bernoulli)",
      meanText: "p",
      varText: "p(1−p)",
      mean: function (p) { return p; },
      variance: function (p) { return p * (1 - p); },
      meanOfMean: function (n, p) { return "μ = p = " + fmtStat(p); },
      varOfMean: function (n, p) { return "σ²/n = p(1−p)/n = " + fmtStat((p * (1 - p)) / n); },
      draw: function (p) { return Math.random() < p ? 1 : 0; }
    }
  };

  function mountClt(el) {
    var initial = attrEnum(el, "data-dist", ["uniform", "exponential", "bernoulli"], "uniform");
    var options = "";
    var key;
    for (key in POPS) {
      if (!Object.prototype.hasOwnProperty.call(POPS, key)) continue;
      options += '<option value="' + key + '"' + (key === initial ? " selected" : "") + ">" + POPS[key].option + "</option>";
    }
    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: משפט הגבול המרכזי");
    el.innerHTML = headHtml("משפט הגבול המרכזי (Central Limit Theorem)", "כל עמודה סופרת ממוצעי מדגם בגודל n. העקומה היא ההתפלגות הנורמלית N(μ, σ²/n).") +
      '<div class="prob-controls">' +
      '<label class="prob-field prob-span"><span class="prob-field-label">אוכלוסייה</span><select data-pick aria-label="בחירת התפלגות האוכלוסייה">' + options + "</select></label>" +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">n גודל המדגם</span><output data-out="n">10</output></span>' +
      '<input type="range" data-n min="1" max="80" step="1" value="10" aria-label="גודל המדגם n"></label>' +
      '<label class="prob-field" data-bern hidden><span class="prob-field-top"><span class="prob-field-label">p הסתברות להצלחה</span><output data-out="p">0.50</output></span>' +
      '<input type="range" data-p min="0.05" max="0.95" step="0.01" value="0.5" aria-label="הסתברות להצלחה p"></label>' +
      '<div class="prob-actions"><button type="button" class="prob-btn" data-sample>דגום 1000 ממוצעים</button></div>' +
      "</div>" +
      '<p class="prob-def" data-def></p>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="היסטוגרמה של ממוצעי מדגם"></div>' +
      '<p class="prob-note" data-note></p>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      plainStat("תוחלת לפי התיאוריה", "theory-mean") +
      plainStat("שונות לפי התיאוריה", "theory-var") +
      plainStat("ממוצע 1000 הממוצעים", "sample-mean") +
      plainStat("שונות 1000 הממוצעים", "sample-var") +
      "</div>";

    var last = null;

    function currentPop() {
      var name = el.querySelector("[data-pick]").value;
      if (!POPS[name]) name = "uniform";
      var p = readNum(el.querySelector("[data-p]"));
      var n = readNum(el.querySelector("[data-n]"));
      return { name: name, pop: POPS[name], p: p, n: n };
    }

    function sample(info) {
      var means = new Array(1000);
      var draw = info.pop.draw;
      var n = info.n;
      var p = info.p;
      for (var i = 0; i < 1000; i++) {
        var s = 0;
        for (var j = 0; j < n; j++) s += draw(p);
        means[i] = s / n;
      }
      return means;
    }

    function summarize(means) {
      var sum = 0;
      var i;
      for (i = 0; i < means.length; i++) sum += means[i];
      var mean = sum / means.length;
      var ss = 0;
      for (i = 0; i < means.length; i++) {
        var d = means[i] - mean;
        ss += d * d;
      }
      return { mean: mean, variance: ss / (means.length - 1) };
    }

    function paint(resample) {
      var info = currentPop();
      el.querySelector("[data-bern]").hidden = info.name !== "bernoulli";
      el.querySelector('[data-out="n"]').textContent = String(info.n);
      el.querySelector('[data-out="p"]').textContent = formatStep(info.p, 0.01);
      var popMean = info.pop.mean(info.p);
      var popVar = info.pop.variance(info.p);
      var sd = Math.sqrt(popVar / info.n);
      if (!(sd > 0)) sd = 1e-6;
      var means = resample || !last ? sample(info) : last.means;
      var stats = summarize(means);
      var lo = popMean - 4 * sd;
      var hi = popMean + 4 * sd;
      var bins = 24;
      var width = (hi - lo) / bins;
      var counts = [];
      for (var b = 0; b < bins; b++) counts.push(0);
      var outside = 0;
      for (var i = 0; i < means.length; i++) {
        var idx = Math.floor((means[i] - lo) / width);
        if (means[i] === hi) idx = bins - 1;
        if (idx < 0 || idx >= bins) outside += 1;
        else counts[idx] += 1;
      }
      last = {
        name: info.name,
        pop: info.pop,
        p: info.p,
        n: info.n,
        means: means,
        stats: stats,
        popMean: popMean,
        popVar: popVar,
        sd: sd,
        lo: lo,
        hi: hi,
        width: width,
        counts: counts,
        outside: outside
      };
      applyClt(last);
      drawClt(last);
    }

    function applyClt(model) {
      el.querySelector("[data-def]").textContent = "האוכלוסייה: " + model.pop.option + ". התוחלת μ = " + model.pop.meanText + " והשונות σ² = " + model.pop.varText + ". כל ממוצע מחושב מ־n תצפיות בלתי תלויות.";
      el.querySelector("[data-theory-mean]").textContent = model.pop.meanOfMean(model.n, model.p);
      el.querySelector("[data-theory-var]").textContent = model.pop.varOfMean(model.n, model.p);
      el.querySelector("[data-sample-mean]").textContent = fmtStat(model.stats.mean);
      el.querySelector("[data-sample-var]").textContent = fmtStat(model.stats.variance);
      var note = el.querySelector("[data-note]");
      note.textContent = model.outside ? model.outside + " ממוצעים נפלו מחוץ לחלון של ארבע סטיות תקן ולא נכנסו להיסטוגרמה." : "";
      el.querySelector("[data-chart]").setAttribute("aria-label", "היסטוגרמה של 1000 ממוצעי מדגם בגודל " + model.n + " מול עקומה נורמלית. ממוצע הממוצעים הוא " + fmtStat(model.stats.mean) + " והתוחלת התיאורטית היא " + fmtStat(model.popMean) + ".");
    }

    function drawClt(model) {
      var pdfMax = normalPdf(model.popMean, model.popMean, model.sd) * 1000 * model.width;
      var yMax = pdfMax;
      for (var i = 0; i < model.counts.length; i++) if (model.counts[i] > yMax) yMax = model.counts[i];
      drawCurveChart(el.querySelector("[data-chart]"), {
        x0: model.lo,
        x1: model.hi,
        yMax: yMax * 1.12,
        shadeLo: model.popMean,
        shadeHi: model.popMean,
        hist: model.counts,
        mark: model.popMean,
        pdf: function (x) { return normalPdf(x, model.popMean, model.sd) * 1000 * model.width; }
      });
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      paint(true);
    });
    el.addEventListener("change", function (ev) {
      if (!ev.target || !ev.target.getAttribute || ev.target.getAttribute("data-pick") == null) return;
      paint(true);
    });
    el.addEventListener("click", function (ev) {
      var node = ev.target;
      var btn = null;
      while (node && node !== el) {
        if (node.getAttribute && node.getAttribute("data-sample") != null) btn = node;
        node = node.parentNode;
      }
      if (!btn) return;
      paint(true);
    });
    el.setAttribute("data-chart-live", "1");
    el.probRedraw = function () {
      if (last) drawClt(last);
    };
    paint(true);
  }

  function mountLabs(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var list = [];
    if (scope.matches && scope.matches(".prob-lab:not([data-mounted])")) list.push(scope);
    if (scope.querySelectorAll) {
      var found = scope.querySelectorAll(".prob-lab:not([data-mounted])");
      for (var i = 0; i < found.length; i++) list.push(found[i]);
    }
    for (var j = 0; j < list.length; j++) {
      var node = list[j];
      var kind = node.getAttribute("data-prob-lab") || "";
      node.setAttribute("data-mounted", "1");
      if (kind === "dist") mountDist(node);
      else if (kind === "normal") mountNormal(node);
      else if (kind === "bayes") mountBayes(node);
      else if (kind === "clt") mountClt(node);
    }
    bindResize();
  }

  var resizeBound = false;
  function bindResize() {
    if (resizeBound || !window.addEventListener) return;
    resizeBound = true;
    var timer = 0;
    window.addEventListener("resize", function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        var nodes = document.querySelectorAll(".prob-lab[data-chart-live]");
        for (var i = 0; i < nodes.length; i++) {
          if (typeof nodes[i].probRedraw === "function") nodes[i].probRedraw();
        }
      }, 120);
    });
  }

  window.CS_ENHANCERS = window.CS_ENHANCERS || [];
  window.CS_ENHANCERS.push(mountLabs);
})();
