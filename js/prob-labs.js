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

  function nCr(n, r) {
    n = Math.round(Number(n));
    r = Math.round(Number(r));
    if (r < 0 || r > n || n < 0) return 0;
    if (r === 0 || r === n) return 1;
    if (r === 1 || r === n - 1) return n;
    var logP = logFact(n) - logFact(r) - logFact(n - r);
    return Math.round(Math.exp(logP));
  }

  function nPr(n, r) {
    n = Math.round(Number(n));
    r = Math.round(Number(r));
    if (r < 0 || r > n || n < 0) return 0;
    if (r === 0) return 1;
    var logP = logFact(n) - logFact(n - r);
    return Math.round(Math.exp(logP));
  }

  function expPdf(x, lambda) {
    x = Number(x); lambda = Number(lambda);
    if (x < 0 || !(lambda > 0)) return 0;
    return lambda * Math.exp(-lambda * x);
  }

  function expCdf(x, lambda) {
    x = Number(x); lambda = Number(lambda);
    if (x < 0 || !(lambda > 0)) return 0;
    return 1 - Math.exp(-lambda * x);
  }

  function uniformPdf(x, a, b) {
    x = Number(x); a = Number(a); b = Number(b);
    if (x < a || x > b || !(b > a)) return 0;
    return 1 / (b - a);
  }

  function uniformCdf(x, a, b) {
    x = Number(x); a = Number(a); b = Number(b);
    if (!(b > a)) return NaN;
    if (x < a) return 0;
    if (x >= b) return 1;
    return (x - a) / (b - a);
  }

  function normalInv(p) {
    p = Number(p);
    if (!(p > 0 && p < 1)) {
      if (p <= 0) return -Infinity;
      if (p >= 1) return Infinity;
      return NaN;
    }
    var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
    var b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
    var c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
    var d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
    var p_low = 0.02425;
    var p_high = 1 - p_low;
    var q, r;
    if (p < p_low) {
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
    }
    if (p <= p_high) {
      q = p - 0.5;
      r = q * q;
      return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q / (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
    }
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }

  function randUniform(a, b) {
    return a + Math.random() * (b - a);
  }

  function randNormal(mu, sigma) {
    var u1 = Math.max(1e-12, Math.random());
    var u2 = Math.random();
    var z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return (mu || 0) + (sigma || 1) * z;
  }

  function randInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
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
    normalCdfAt: normalCdfAt,
    nCr: nCr,
    nPr: nPr,
    expPdf: expPdf,
    expCdf: expCdf,
    uniformPdf: uniformPdf,
    uniformCdf: uniformCdf,
    normalInv: normalInv,
    randUniform: randUniform,
    randNormal: randNormal,
    randInt: randInt
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
    el.innerHTML = headHtml("התפלגויות בדידות", "מה לנסות כאן: בחרו התפלגות בדידה ושנו את הפרמטרים בסליידרים. הזיזו את k כדי לסמן את ההסתברות המצטברת P(X≤k) ולראות את התוחלת והשונות.") +
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
    el.innerHTML = headHtml("התפלגות נורמלית (Normal)", "מה לנסות כאן: שנו את התוחלת μ וסטיית התקן σ, והזיזו את הגבולות a ו-b. השטח הצבוע הוא ההסתברות שהמשתנה נופל בין שני הגבולות, וציון התקן z מציג את המרחק מהתוחלת.") +
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
    el.innerHTML = headHtml("נוסחת בייס (Bayes)", "מה לנסות כאן: שנו את שכיחות המחלה, רגישות הבדיקה והסגוליות. כל תא מייצג אדם אחד מאלף: שימו לב מדוע בדיקה חיובית אינה אומרת בהכרח מחלה כאשר השכיחות באוכלוסייה נמוכה.") +
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
    el.innerHTML = headHtml("משפט הגבול המרכזי (Central Limit Theorem)", "מה לנסות כאן: בחרו את התפלגות האוכלוסייה (אחידה, מעריכית או בי-מודאלית) ושנו את גודל המדגם n. לחצו על 'דגימה מחדש' כדי לראות איך ממוצעי המדגמים מקבלים צורת פעמון נורמלי גם כשהאוכלוסייה רחוקה מלהיות נורמלית.") +
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

  /* === 1. מעבדת קומבינטוריקה ובניית מדגם (counting) === */
  function mountCounting(el) {
    var n0 = clamp(Math.round(attrNum(el, "data-n", 5)), 1, 20);
    var k0 = clamp(Math.round(attrNum(el, "data-k", 3)), 1, 10);
    var order0 = attrEnum(el, "data-order", ["1", "0", "true", "false"], "1") === "1" || attrEnum(el, "data-order", ["1", "0", "true", "false"], "1") === "true";
    var rep0 = attrEnum(el, "data-rep", ["1", "0", "true", "false"], "0") === "1" || attrEnum(el, "data-rep", ["1", "0", "true", "false"], "0") === "true";

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: עקרונות ספירה ובניית מדגם");
    el.innerHTML = headHtml("עקרונות ספירה ובניית מדגם (Combinatorics)", "מה לנסות כאן: בחרו האם יש חשיבות לסדר והאם מותרת החזרה באמצעות שאלות האשף או לחיצה ישירה על הכרטיסים. שנו את n ו-k כדי לצפות בנוסחה, במספר האפשרויות ובדוגמאות קונקרטיות של המדגם.") +
      '<div class="prob-controls">' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">n גודל האוכלוסייה</span><output data-out="n">' + n0 + '</output></span>' +
      '<input type="range" data-n min="1" max="20" step="1" value="' + n0 + '" aria-label="גודל האוכלוסייה n"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">k גודל המדגם</span><output data-out="k">' + k0 + '</output></span>' +
      '<input type="range" data-k min="1" max="10" step="1" value="' + k0 + '" aria-label="גודל המדגם k"></label>' +
      '<div class="prob-wizard-box">' +
      '<div class="prob-wizard-q"><span class="prob-wizard-q-label">שאלה 1: האם יש חשיבות לסדר האיברים במדגם?</span>' +
      '<div class="prob-btn-group"><button type="button" class="prob-toggle" data-btn-order="1" aria-pressed="' + (order0 ? "true" : "false") + '">כן — המדגם סדור (סדרות/תמורות)</button>' +
      '<button type="button" class="prob-toggle" data-btn-order="0" aria-pressed="' + (!order0 ? "true" : "false") + '">לא — ללא חשיבות לסדר (תת-קבוצות/צירופים)</button></div></div>' +
      '<div class="prob-wizard-q"><span class="prob-wizard-q-label">שאלה 2: האם מותר לחזור על אותו איבר יותר מפעם אחת?</span>' +
      '<div class="prob-btn-group"><button type="button" class="prob-toggle" data-btn-rep="1" aria-pressed="' + (rep0 ? "true" : "false") + '">כן — עם החזרה (חזרות מותרות)</button>' +
      '<button type="button" class="prob-toggle" data-btn-rep="0" aria-pressed="' + (!rep0 ? "true" : "false") + '">לא — ללא החזרה (כל איבר מופיע לכל היותר פעם אחת)</button></div></div>' +
      '</div>' +
      '<div class="prob-card-grid">' +
      '<div class="prob-card" data-card="order-rep"><h4 class="prob-card-title">סדור עם החזרה</h4><div class="prob-card-formula">n^k</div><p class="prob-card-desc">מילים באורך k, קוד לכספת, תוצאות הטלת מטבע</p></div>' +
      '<div class="prob-card" data-card="order-norep"><h4 class="prob-card-title">סדור ללא החזרה</h4><div class="prob-card-formula">P(n,k) = n! / (n-k)!</div><p class="prob-card-desc">תמורות חלקיות, פודיום זוכים, סידור בשורה</p></div>' +
      '<div class="prob-card" data-card="noorder-norep"><h4 class="prob-card-title">ללא סדר וללא החזרה</h4><div class="prob-card-formula">C(n,k) = (n über k)</div><p class="prob-card-desc">בחירת ועד, יד קלפים, תת-קבוצות בגודל k</p></div>' +
      '<div class="prob-card" data-card="noorder-rep"><h4 class="prob-card-title">ללא סדר ועם החזרה</h4><div class="prob-card-formula">(n+k-1 über k)</div><p class="prob-card-desc">כוכבים ומחיצות, קניית k כדורי גלידה מתוך n טעמים</p></div>' +
      '</div>' +
      '<div class="prob-span"><span class="prob-k">דוגמאות מתוך המדגם מהאיברים {A, B, C, ...}:</span><div class="prob-tags-wrap" data-samples aria-live="polite"></div></div>' +
      '</div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      '<div class="prob-stat"><span class="prob-k">תבנית הספירה המתאימה</span><strong class="prob-num" data-model-name style="direction:rtl;text-align:right;font-size:0.95rem;font-weight:700;"></strong></div>' +
      statHtml("הנוסחה המתמטית", "formula") +
      statHtml("מספר האפשרויות הכולל", "count") +
      '<div class="prob-stat prob-stat-wide"><span class="prob-k">משמעות אינטואיטיבית</span><strong class="prob-num" data-intuition style="font-size:0.95rem;font-weight:600;direction:rtl;text-align:right;"></strong></div>' +
      '</div>';

    var state = { n: n0, k: k0, order: order0, rep: rep0 };

    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];

    function generateSamples(n, k, order, rep) {
      var pool = alphabet.slice(0, n);
      var results = [];
      var maxSamples = 16;
      function helper(current, startIndex, used) {
        if (results.length >= maxSamples) return;
        if (current.length === k) {
          results.push(current.slice());
          return;
        }
        for (var i = (order ? 0 : startIndex); i < pool.length; i++) {
          if (results.length >= maxSamples) break;
          if (!rep && order && used[i]) continue;
          var nextUsed = used ? used.slice() : [];
          if (!rep && order) nextUsed[i] = true;
          current.push(pool[i]);
          helper(current, rep ? i : i + 1, nextUsed);
          current.pop();
        }
      }
      helper([], 0, []);
      return results;
    }

    function paint() {
      var n = state.n;
      var k = state.k;
      var order = state.order;
      var rep = state.rep;

      el.querySelector('[data-out="n"]').textContent = String(n);
      el.querySelector('[data-out="k"]').textContent = String(k);

      var btnOrder1 = el.querySelector('[data-btn-order="1"]');
      var btnOrder0 = el.querySelector('[data-btn-order="0"]');
      var btnRep1 = el.querySelector('[data-btn-rep="1"]');
      var btnRep0 = el.querySelector('[data-btn-rep="0"]');

      if (btnOrder1) btnOrder1.setAttribute("aria-pressed", order ? "true" : "false");
      if (btnOrder0) btnOrder0.setAttribute("aria-pressed", !order ? "true" : "false");
      if (btnRep1) btnRep1.setAttribute("aria-pressed", rep ? "true" : "false");
      if (btnRep0) btnRep0.setAttribute("aria-pressed", !rep ? "true" : "false");

      var cardKey = (order ? "order" : "noorder") + "-" + (rep ? "rep" : "norep");
      var cards = el.querySelectorAll(".prob-card");
      for (var c = 0; c < cards.length; c++) {
        cards[c].classList.toggle("is-active", cards[c].getAttribute("data-card") === cardKey);
      }

      var modelTitle = "";
      var texFormula = "";
      var plainFormula = "";
      var totalCount = 0;
      var intuition = "";

      if (order && rep) {
        modelTitle = "סדורה עם החזרה (סדרות / מילים)";
        texFormula = "n^k = " + n + "^{" + k + "}";
        plainFormula = "n^k = " + n + "^" + k;
        totalCount = Math.pow(n, k);
        intuition = "בכל אחד מ־" + k + " המקומות יש " + n + " אפשרויות בלתי תלויות (לדוגמה קוד כספת בן " + k + " ספרות מתוך " + n + " אופציות).";
      } else if (order && !rep) {
        modelTitle = "סדורה ללא החזרה (תמורות של k מתוך n)";
        texFormula = "P(n,k) = \\frac{n!}{(n-k)!} = \\frac{" + n + "!}{(" + n + "-" + k + ")!}";
        plainFormula = "P(n,k) = n! / (n-k)! = " + n + "! / (" + (n - k) + ")!";
        totalCount = k > n ? 0 : nPr(n, k);
        intuition = k > n ? "לא ניתן לבחור מדגם בגודל k הגדול מ־n ללא החזרה." : "במקום הראשון n אפשרויות, בשני n-1 וכן הלאה עד n-k+1 (למשל חלוקת מדליות זהב, כסף וארד).";
      } else if (!order && !rep) {
        modelTitle = "לא סדורה ללא החזרה (צירופים / תת-קבוצות)";
        texFormula = "\\binom{n}{k} = \\frac{n!}{k!(n-k)!} = \\binom{" + n + "}{" + k + "}";
        plainFormula = "C(n,k) = n! / (k!(n-k)!) = (" + n + " over " + k + ")";
        totalCount = k > n ? 0 : nCr(n, k);
        intuition = k > n ? "לא ניתן לבחור תת-קבוצה בגודל k הגדול מ־n." : "מחלקים ב־k! כי אין חשיבות לסדר הפנימי (למשל בחירת ועד של " + k + " חברים מתוך כיתה של " + n + ").";
      } else {
        modelTitle = "לא סדורה עם החזרה (צירופים עם חזרות / כוכבים ומחיצות)";
        var totalStars = n + k - 1;
        texFormula = "\\binom{n+k-1}{k} = \\binom{" + totalStars + "}{" + k + "}";
        plainFormula = "C(n+k-1, k) = (" + totalStars + " over " + k + ")";
        totalCount = nCr(totalStars, k);
        intuition = "חלוקת " + k + " כדורים זהים ל־" + n + " תאים שונים (לדוגמה קניית " + k + " כדורי גלידה כאשר קיימים " + n + " טעמים לבחירה).";
      }

      el.querySelector("[data-model-name]").textContent = modelTitle;
      setMath(el.querySelector("[data-formula]"), el.querySelector("[data-formula-sr]"), texFormula, plainFormula);
      setMath(el.querySelector("[data-count]"), el.querySelector("[data-count-sr]"), texNum(totalCount), fmtStat(totalCount));
      el.querySelector("[data-intuition]").textContent = intuition;

      var sampleList = generateSamples(n, k, order, rep);
      var sampleBox = el.querySelector("[data-samples]");
      if (sampleList.length === 0) {
        sampleBox.innerHTML = '<span class="prob-tag" style="color:var(--bad);">אין אפשרויות חוקיות (k > n ללא החזרה)</span>';
      } else {
        var tagsHtml = "";
        for (var s = 0; s < sampleList.length; s++) {
          var open = order ? "(" : "{";
          var close = order ? ")" : "}";
          tagsHtml += '<span class="prob-tag">' + open + sampleList[s].join(order ? "," : ", ") + close + "</span>";
        }
        if (totalCount > sampleList.length) {
          tagsHtml += '<span class="prob-tag" style="background:var(--accent-soft);color:var(--accent-ink);">ועוד ' + fmtStat(totalCount - sampleList.length) + ' אפשרויות נוספות...</span>';
        }
        sampleBox.innerHTML = tagsHtml;
      }
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      var nVal = readNum(el.querySelector('[data-n]'));
      var kVal = readNum(el.querySelector('[data-k]'));
      state.n = clamp(nVal, 1, 20);
      state.k = clamp(kVal, 1, 10);
      paint();
    });

    el.addEventListener("click", function (ev) {
      var btn = ev.target.closest("button");
      if (btn) {
        if (btn.hasAttribute("data-btn-order")) {
          state.order = btn.getAttribute("data-btn-order") === "1";
          paint();
          return;
        }
        if (btn.hasAttribute("data-btn-rep")) {
          state.rep = btn.getAttribute("data-btn-rep") === "1";
          paint();
          return;
        }
      }
      var card = ev.target.closest(".prob-card");
      if (card) {
        var ck = card.getAttribute("data-card");
        if (ck === "order-rep") { state.order = true; state.rep = true; }
        else if (ck === "order-norep") { state.order = true; state.rep = false; }
        else if (ck === "noorder-norep") { state.order = false; state.rep = false; }
        else if (ck === "noorder-rep") { state.order = false; state.rep = true; }
        paint();
      }
    });

    paint();
  }

  /* === 2. מעבדת כוכבים ומחיצות (stars) === */
  function mountStars(el) {
    var n0 = clamp(Math.round(attrNum(el, "data-n", 7)), 1, 25);
    var k0 = clamp(Math.round(attrNum(el, "data-k", 3)), 2, 6);
    var min0 = clamp(Math.round(attrNum(el, "data-min", 0)), 0, 3);

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: כוכבים ומחיצות");
    el.innerHTML = headHtml("כוכבים ומחיצות (Stars & Bars)", "מה לנסות כאן: שנו את מספר הכדורים n, מספר התאים k, ואת החסם התחתון (למשל 'לפחות כדור אחד בכל תא'). לחצו על 'הגרל חלוקה לדוגמה' כדי לראות המחשה חזותית של הכוכבים והמחיצות ואת המשוואה האלגברית.") +
      '<div class="prob-controls">' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">n מספר כדורים (כוכבים)</span><output data-out="n">' + n0 + '</output></span>' +
      '<input type="range" data-n min="1" max="25" step="1" value="' + n0 + '" aria-label="מספר כדורים n"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">k מספר תאים (משתנים)</span><output data-out="k">' + k0 + '</output></span>' +
      '<input type="range" data-k min="2" max="6" step="1" value="' + k0 + '" aria-label="מספר תאים k"></label>' +
      '<div class="prob-span"><span class="prob-k">חסם תחתון למספר הכדורים בכל תא:</span>' +
      '<div class="prob-btn-group">' +
      '<button type="button" class="prob-toggle" data-bound="0" aria-pressed="' + (min0 === 0 ? "true" : "false") + '">x_i ≥ 0 (ללא הגבלה)</button>' +
      '<button type="button" class="prob-toggle" data-bound="1" aria-pressed="' + (min0 === 1 ? "true" : "false") + '">x_i ≥ 1 (לפחות כדור אחד בכל תא)</button>' +
      '<button type="button" class="prob-toggle" data-bound="2" aria-pressed="' + (min0 === 2 ? "true" : "false") + '">x_i ≥ 2 (לפחות שני כדורים בכל תא)</button>' +
      '</div></div>' +
      '<div class="prob-actions"><button type="button" class="prob-btn" data-randomize>הגרל חלוקה לדוגמה</button></div>' +
      '</div>' +
      '<div class="prob-stars-stage" data-stage aria-live="polite"></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("משוואה אלגברית וחסמים", "equation") +
      statHtml("המרת משתנים y_i = x_i - c", "reduced") +
      statHtml("נוסחת כוכבים ומחיצות", "formula") +
      statHtml("מספר הפתרונות השלמים", "total") +
      '</div>';

    var state = { n: n0, k: k0, min: min0, partition: null };

    function createPartition(n, k, min) {
      var rem = n - k * min;
      if (rem < 0) return null;
      var cuts = [];
      for (var i = 0; i < k - 1; i++) cuts.push(Math.random());
      cuts.sort(function(a, b) { return a - b; });
      var parts = [];
      var prev = 0;
      for (var j = 0; j < cuts.length; j++) {
        parts.push(cuts[j] - prev);
        prev = cuts[j];
      }
      parts.push(1 - prev);
      var counts = [];
      var assigned = 0;
      for (var m = 0; m < k; m++) {
        var val = Math.floor(parts[m] * rem);
        counts.push(val);
        assigned += val;
      }
      var left = rem - assigned;
      while (left > 0) {
        var idx = Math.floor(Math.random() * k);
        counts[idx]++;
        left--;
      }
      for (var p = 0; p < k; p++) counts[p] += min;
      return counts;
    }

    function paint() {
      var n = state.n;
      var k = state.k;
      var min = state.min;

      el.querySelector('[data-out="n"]').textContent = String(n);
      el.querySelector('[data-out="k"]').textContent = String(k);

      var boundBtns = el.querySelectorAll("[data-bound]");
      for (var b = 0; b < boundBtns.length; b++) {
        boundBtns[b].setAttribute("aria-pressed", boundBtns[b].getAttribute("data-bound") === String(min) ? "true" : "false");
      }

      var rem = n - k * min;
      var stage = el.querySelector("[data-stage]");

      if (rem < 0) {
        stage.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--bad);font-weight:700;">אין פתרון אפשרי: סכום החסמים התחתונים (' + (k * min) + ') גדול ממספר הכדורים הכולל (' + n + ').</div>';
        setMath(el.querySelector("[data-equation]"), el.querySelector("[data-equation-sr]"), "x_1+\\dots+x_" + k + "=" + n + ",\\; x_i \\ge " + min, "x_1+...+x_" + k + "=" + n + ", x_i >= " + min);
        setMath(el.querySelector("[data-reduced]"), el.querySelector("[data-reduced-sr]"), "\\sum y_i = " + rem + " < 0", "sum y_i = " + rem + " < 0");
        setMath(el.querySelector("[data-formula]"), el.querySelector("[data-formula-sr]"), "0", "0");
        setMath(el.querySelector("[data-total]"), el.querySelector("[data-total-sr]"), "0", "0");
        return;
      }

      if (!state.partition || state.partition.length !== k || state.partition.reduce(function(a,c){return a+c;}, 0) !== n) {
        state.partition = createPartition(n, k, min);
      }

      var parts = state.partition;
      var binsHtml = '<div class="prob-bins-row">';
      for (var i = 0; i < k; i++) {
        var ballDots = "";
        for (var d = 0; d < parts[i]; d++) ballDots += '<div class="prob-ball"></div>';
        binsHtml += '<div class="prob-bin-box"><span class="prob-bin-title">תא ' + (i + 1) + ' (x_' + (i + 1) + ' = ' + parts[i] + ')</span><div class="prob-bin-balls">' + (ballDots || '<span style="font-size:0.75rem;color:var(--muted);">(ריק)</span>') + '</div></div>';
      }
      binsHtml += "</div>";

      var starsBarsStr = '<div class="prob-stars-bars-str" aria-label="ייצוג כוכבים ומחיצות">';
      for (var j = 0; j < k; j++) {
        var freeBalls = parts[j] - min;
        for (var s = 0; s < freeBalls; s++) starsBarsStr += '<span class="prob-str-star">★</span>';
        if (j < k - 1) starsBarsStr += '<span class="prob-str-bar">|</span>';
      }
      starsBarsStr += "</div>";

      stage.innerHTML = binsHtml + '<p style="text-align:center;margin:0.4rem 0 0.1rem;font-size:0.85rem;color:var(--muted);">ייצוג המשתנים החופשיים y_i = x_i - ' + min + ' באמצעות ' + rem + ' כוכבים ו־' + (k - 1) + ' מחיצות:</p>' + starsBarsStr;

      var total = nCr(rem + k - 1, k - 1);
      var eqTex = "x_1 + \\dots + x_" + k + " = " + n + ",\\; x_i \\ge " + min;
      var redTex = "y_1 + \\dots + y_" + k + " = " + n + " - (" + k + "\\times " + min + ") = " + rem + ",\\; y_i \\ge 0";
      var formTex = "\\binom{" + rem + " + " + k + " - 1}{" + k + " - 1} = \\binom{" + (rem + k - 1) + "}{" + (k - 1) + "}";

      setMath(el.querySelector("[data-equation]"), el.querySelector("[data-equation-sr]"), eqTex, "x_1+...+x_" + k + "=" + n + ", x_i>=" + min);
      setMath(el.querySelector("[data-reduced]"), el.querySelector("[data-reduced-sr]"), redTex, "y_1+...+y_" + k + "=" + rem + ", y_i>=0");
      setMath(el.querySelector("[data-formula]"), el.querySelector("[data-formula-sr]"), formTex, "(" + (rem + k - 1) + " over " + (k - 1) + ")");
      setMath(el.querySelector("[data-total]"), el.querySelector("[data-total-sr]"), texNum(total), fmtStat(total));
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      state.n = clamp(readNum(el.querySelector('[data-n]')), 1, 25);
      state.k = clamp(readNum(el.querySelector('[data-k]')), 2, 6);
      state.partition = null;
      paint();
    });

    el.addEventListener("click", function (ev) {
      var boundBtn = ev.target.closest("[data-bound]");
      if (boundBtn) {
        state.min = Number(boundBtn.getAttribute("data-bound"));
        state.partition = null;
        paint();
        return;
      }
      if (ev.target.closest("[data-randomize]")) {
        state.partition = null;
        paint();
      }
    });

    paint();
  }

  /* === 3. מעבדת משולש פסקל (pascal) === */
  function mountPascal(el) {
    var rows0 = clamp(Math.round(attrNum(el, "data-rows", 7)), 4, 11);

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: משולש פסקל וזהויות מקדמים");
    el.innerHTML = headHtml("משולש פסקל וזהויות מקדמים (Pascal's Triangle)", "מה לנסות כאן: לחצו על כל משבצת כדי לראות כיצד היא נבנית כסכום שתי המשבצות שמעליה לפי זהות פסקל (n über k = (n-1 über k-1) + (n-1 über k)). שימו לב שסכום כל שורה שווה תמיד ל-2 בחזקת n, ונסו להפעיל את תבנית הזוגיים/אי-זוגיים.") +
      '<div class="prob-controls">' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">מספר שורות N</span><output data-out="rows">' + rows0 + '</output></span>' +
      '<input type="range" data-rows min="4" max="11" step="1" value="' + rows0 + '" aria-label="מספר שורות במשולש פסקל"></label>' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-mode="identity" aria-pressed="true">הדגש זהות פסקל</button>' +
      '<button type="button" class="prob-toggle" data-mode="sierpinski" aria-pressed="false">זוגיים / אי-זוגיים (משולש שרפינסקי)</button>' +
      '</div>' +
      '</div>' +
      '<div class="prob-pascal-wrap" data-triangle role="region" aria-label="משולש פסקל אינטראקטיבי"></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("זהות פסקל לתא הנבחר", "identity") +
      statHtml("סכום איברי השורה", "row-sum") +
      statHtml("סימטריית המקדמים", "symmetry") +
      '</div>';

    var state = { rows: rows0, selectedN: 4, selectedK: 2, sierpinski: false };

    function paint() {
      var N = state.rows;
      el.querySelector('[data-out="rows"]').textContent = String(N);

      if (state.selectedN > N) {
        state.selectedN = N;
        state.selectedK = Math.min(state.selectedK, N);
      }

      var container = el.querySelector("[data-triangle]");
      var rowsHtml = "";
      for (var n = 0; n <= N; n++) {
        var rowCells = "";
        for (var k = 0; k <= n; k++) {
          var val = nCr(n, k);
          var isSel = n === state.selectedN && k === state.selectedK;
          var isParent = n === state.selectedN - 1 && (k === state.selectedK - 1 || k === state.selectedK);
          var classes = "prob-pascal-cell";
          if (state.sierpinski) {
            classes += (val % 2 === 1) ? " is-odd" : " is-even";
          } else {
            if (isSel) classes += " is-selected";
            else if (isParent) classes += " is-parent";
          }
          rowCells += '<button type="button" class="' + classes + '" data-r="' + n + '" data-c="' + k + '" aria-label="שורה ' + n + ' עמודה ' + k + ' ערך ' + val + '">' + val + '</button>';
        }
        var rowSum = Math.pow(2, n);
        rowsHtml += '<div class="prob-pascal-row"><span class="prob-pascal-sum" title="סכום שורה n=' + n + '">Σ=' + fmtStat(rowSum) + '</span>' + rowCells + '</div>';
      }
      container.innerHTML = rowsHtml;

      var sn = state.selectedN;
      var sk = state.selectedK;
      var sVal = nCr(sn, sk);
      var idTex = "";
      var idPlain = "";
      if (sk > 0 && sk < sn) {
        var p1 = nCr(sn - 1, sk - 1);
        var p2 = nCr(sn - 1, sk);
        idTex = "\\binom{" + sn + "}{" + sk + "} = \\binom{" + (sn - 1) + "}{" + (sk - 1) + "} + \\binom{" + (sn - 1) + "}{" + sk + "} \\implies " + sVal + " = " + p1 + " + " + p2;
        idPlain = "(" + sn + " over " + sk + ") = (" + (sn - 1) + " over " + (sk - 1) + ") + (" + (sn - 1) + " over " + sk + ") => " + sVal + " = " + p1 + " + " + p2;
      } else {
        idTex = "\\binom{" + sn + "}{" + sk + "} = 1 \\quad (\\text{קצה השורה})";
        idPlain = "(" + sn + " over " + sk + ") = 1 (edge)";
      }

      var sumTex = "\\sum_{k=0}^{" + sn + "} \\binom{" + sn + "}{k} = 2^{" + sn + "} = " + fmtStat(Math.pow(2, sn));
      var sumPlain = "sum_{k=0}^" + sn + " (" + sn + " over k) = 2^" + sn + " = " + fmtStat(Math.pow(2, sn));
      var symTex = "\\binom{" + sn + "}{" + sk + "} = \\binom{" + sn + "}{" + (sn - sk) + "} = " + sVal;
      var symPlain = "(" + sn + " over " + sk + ") = (" + sn + " over " + (sn - sk) + ") = " + sVal;

      setMath(el.querySelector("[data-identity]"), el.querySelector("[data-identity-sr]"), idTex, idPlain);
      setMath(el.querySelector("[data-row-sum]"), el.querySelector("[data-row-sum-sr]"), sumTex, sumPlain);
      setMath(el.querySelector("[data-symmetry]"), el.querySelector("[data-symmetry-sr]"), symTex, symPlain);
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      state.rows = clamp(readNum(el.querySelector('[data-rows]')), 4, 11);
      paint();
    });

    el.addEventListener("click", function (ev) {
      var cell = ev.target.closest(".prob-pascal-cell");
      if (cell) {
        state.selectedN = Number(cell.getAttribute("data-r"));
        state.selectedK = Number(cell.getAttribute("data-c"));
        paint();
        return;
      }
      var modeBtn = ev.target.closest("[data-mode]");
      if (modeBtn) {
        var m = modeBtn.getAttribute("data-mode");
        state.sierpinski = (m === "sierpinski");
        el.querySelector('[data-mode="identity"]').setAttribute("aria-pressed", !state.sierpinski ? "true" : "false");
        el.querySelector('[data-mode="sierpinski"]').setAttribute("aria-pressed", state.sierpinski ? "true" : "false");
        paint();
      }
    });

    paint();
  }

  /* === 4. מעבדת דיאגרמת ון (venn) === */
  function mountVenn(el) {
    var pa0 = clamp(attrNum(el, "data-pa", 0.5), 0.05, 0.95);
    var pb0 = clamp(attrNum(el, "data-pb", 0.4), 0.05, 0.95);
    var pab0 = clamp(attrNum(el, "data-pab", 0.2), 0, Math.min(pa0, pb0));
    var evMode = attrEnum(el, "data-events", ["2", "3"], "2");

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: דיאגרמת ון ואקסיומות ההסתברות");
    el.innerHTML = headHtml("דיאגרמת ון ואקסיומות ההסתברות (Venn Diagram)", "מה לנסות כאן: שנו את ההסתברויות בסליידרים או לחצו על כפתורי החוקים (הכלה והפרדה, דה-מורגן, מאורעות זרים או בלתי תלויים). צפו באזורים הצבועים בדיאגרמה ובחישוב ההסתברות המדויק.") +
      '<div class="prob-controls">' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">P(A)</span><output data-out="pa">' + pa0.toFixed(2) + '</output></span>' +
      '<input type="range" data-pa min="0.05" max="0.95" step="0.01" value="' + pa0 + '" aria-label="הסתברות המאורע A"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">P(B)</span><output data-out="pb">' + pb0.toFixed(2) + '</output></span>' +
      '<input type="range" data-pb min="0.05" max="0.95" step="0.01" value="' + pb0 + '" aria-label="הסתברות המאורע B"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">P(A ∩ B)</span><output data-out="pab">' + pab0.toFixed(2) + '</output></span>' +
      '<input type="range" data-pab min="0" max="' + Math.min(pa0, pb0).toFixed(2) + '" step="0.01" value="' + pab0 + '" aria-label="הסתברות החיתוך"></label>' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-rule="union">הכלה והפרדה P(A∪B)</button>' +
      '<button type="button" class="prob-toggle" data-rule="demorgan1">דה-מורגן (A∪B)ᶜ = Aᶜ∩Bᶜ</button>' +
      '<button type="button" class="prob-toggle" data-rule="demorgan2">דה-מורגן (A∩B)ᶜ = Aᶜ∪Bᶜ</button>' +
      '<button type="button" class="prob-toggle" data-rule="disjoint">מאורעות זרים P(A∩B)=0</button>' +
      '<button type="button" class="prob-toggle" data-rule="indep">מאורעות בלתי תלויים P(A∩B)=P(A)P(B)</button>' +
      '</div>' +
      '</div>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="דיאגרמת ון"></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("האיחוד P(A ∪ B)", "union-stat") +
      statHtml("המשלים P((A ∪ B)ᶜ)", "comp-stat") +
      statHtml("הפרש P(A \\ B)", "diff-stat") +
      statHtml("סטטוס אי-תלות", "indep-stat") +
      '</div>';

    var state = { pa: pa0, pb: pb0, pab: pab0, activeHighlight: "union" };

    function paint() {
      var pa = state.pa;
      var pb = state.pb;
      var pab = Math.min(state.pab, Math.min(pa, pb));
      var maxPab = Math.min(pa, pb);
      var pabInput = el.querySelector('[data-pab]');
      pabInput.max = maxPab.toFixed(2);
      if (pab > maxPab) pab = maxPab;
      state.pab = pab;

      var minPab = Math.max(0, pa + pb - 1);
      if (pab < minPab) pab = minPab;
      state.pab = pab;

      el.querySelector('[data-out="pa"]').textContent = pa.toFixed(2);
      el.querySelector('[data-out="pb"]').textContent = pb.toFixed(2);
      el.querySelector('[data-out="pab"]').textContent = pab.toFixed(2);

      var onlyA = Math.max(0, pa - pab);
      var onlyB = Math.max(0, pb - pab);
      var unionP = Math.min(1, pa + pb - pab);
      var neither = Math.max(0, 1 - unionP);

      var w = 480; var h = 220;
      var svg = '<svg class="prob-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="דיאגרמת ון של שני מאורעות">';
      var bgFill = (state.activeHighlight === "demorgan1" || state.activeHighlight === "demorgan2") ? "var(--accent-soft)" : "var(--lab)";
      svg += '<rect x="10" y="10" width="460" height="200" rx="12" fill="' + bgFill + '" stroke="var(--line)" stroke-width="1.5"></rect>';
      svg += '<text x="28" y="32" class="prob-tick" font-weight="700">Ω (מרחב המדגם, 1.0)</text>';
      svg += '<text x="445" y="32" text-anchor="end" class="prob-tick">מחוץ לאיחוד: ' + neither.toFixed(3) + '</text>';

      var caX = 185; var cbX = 295; var cy = 115; var r = 75;
      var fillA = "var(--accent-soft)";
      var fillB = "rgba(37,99,235,0.18)";
      if (state.activeHighlight === "demorgan1") {
        fillA = "none"; fillB = "none";
      }

      svg += '<circle cx="' + caX + '" cy="' + cy + '" r="' + r + '" class="prob-venn-circle" fill="' + fillA + '"></circle>';
      svg += '<circle cx="' + cbX + '" cy="' + cy + '" r="' + r + '" class="prob-venn-circle circle-b" fill="' + fillB + '"></circle>';

      svg += '<text x="145" y="115" text-anchor="middle" font-weight="700" fill="var(--accent-ink)">A \\ B<tspan x="145" dy="18" font-size="12">' + onlyA.toFixed(3) + '</tspan></text>';
      svg += '<text x="240" y="115" text-anchor="middle" font-weight="800" fill="var(--ink)">A ∩ B<tspan x="240" dy="18" font-size="12">' + pab.toFixed(3) + '</tspan></text>';
      svg += '<text x="335" y="115" text-anchor="middle" font-weight="700" fill="#1d4ed8">B \\ A<tspan x="335" dy="18" font-size="12">' + onlyB.toFixed(3) + '</tspan></text>';
      svg += '<text x="120" y="36" text-anchor="middle" font-weight="800" fill="var(--accent-ink)">מאורע A (' + pa.toFixed(2) + ')</text>';
      svg += '<text x="360" y="36" text-anchor="middle" font-weight="800" fill="#1d4ed8">מאורע B (' + pb.toFixed(2) + ')</text>';
      svg += '</svg>';

      el.querySelector("[data-chart]").innerHTML = svg;

      var uTex = "P(A \\cup B) = P(A)+P(B)-P(A \\cap B) = " + unionP.toFixed(4);
      var uPlain = "P(A U B) = " + pa.toFixed(2) + " + " + pb.toFixed(2) + " - " + pab.toFixed(2) + " = " + unionP.toFixed(4);
      var cTex = "P((A \\cup B)^c) = 1 - P(A \\cup B) = " + neither.toFixed(4);
      var cPlain = "P((A U B)^c) = " + neither.toFixed(4);
      var dTex = "P(A \\setminus B) = P(A) - P(A \\cap B) = " + onlyA.toFixed(4);
      var dPlain = "P(A \\ B) = " + onlyA.toFixed(4);

      var mult = pa * pb;
      var isIndep = Math.abs(pab - mult) < 0.005;
      var indepTex = isIndep ? "\\text{בלתי תלויים: } P(A\\cap B) \\approx P(A)P(B)" : "\\text{תלויים: } P(A\\cap B) \\neq P(A)P(B)";
      var indepPlain = isIndep ? "בלתי תלויים (" + pab.toFixed(3) + " ≈ " + mult.toFixed(3) + ")" : "תלויים (" + pab.toFixed(3) + " ≠ " + mult.toFixed(3) + ")";

      setMath(el.querySelector("[data-union-stat]"), el.querySelector("[data-union-stat-sr]"), uTex, uPlain);
      setMath(el.querySelector("[data-comp-stat]"), el.querySelector("[data-comp-stat-sr]"), cTex, cPlain);
      setMath(el.querySelector("[data-diff-stat]"), el.querySelector("[data-diff-stat-sr]"), dTex, dPlain);
      setMath(el.querySelector("[data-indep-stat]"), el.querySelector("[data-indep-stat-sr]"), indepTex, indepPlain);
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      state.pa = readNum(el.querySelector('[data-pa]'));
      state.pb = readNum(el.querySelector('[data-pb]'));
      state.pab = readNum(el.querySelector('[data-pab]'));
      paint();
    });

    el.addEventListener("click", function (ev) {
      var ruleBtn = ev.target.closest("[data-rule]");
      if (!ruleBtn) return;
      var r = ruleBtn.getAttribute("data-rule");
      state.activeHighlight = r;
      if (r === "disjoint") {
        state.pab = 0;
        el.querySelector('[data-pab]').value = "0";
      } else if (r === "indep") {
        var prod = Math.round(state.pa * state.pb * 100) / 100;
        state.pab = prod;
        el.querySelector('[data-pab]').value = String(prod);
      }
      paint();
    });

    el.probRedraw = function() { paint(); };
    el.setAttribute("data-chart-live", "1");
    paint();
  }

  /* === 5. מעבדת פרדוקס ימי ההולדת (birthday) === */
  function mountBirthday(el) {
    var k0 = clamp(Math.round(attrNum(el, "data-k", 23)), 2, 70);
    var days0 = clamp(Math.round(attrNum(el, "data-days", 365)), 10, 365);

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: פרדוקס ימי ההולדת");
    el.innerHTML = headHtml("פרדוקס ימי ההולדת (Birthday Problem)", "מה לנסות כאן: שנו את מספר האנשים בחדר k וגלו שב-23 אנשים כבר יש מעל 50% סיכוי ליום הולדת משותף! לחצו על 'הגרל חדר' כדי לראות תאריכים אמיתיים, או על 'הרץ 1,000 חדרים' כדי להשוות תדירות אמפירית לעקומה התיאורטית.") +
      '<div class="prob-controls">' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">k מספר אנשים בחדר</span><output data-out="k">' + k0 + '</output></span>' +
      '<input type="range" data-k min="2" max="70" step="1" value="' + k0 + '" aria-label="מספר אנשים בחדר k"></label>' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-mode="any" aria-pressed="true">כל שני אנשים (פרדוקס ימי ההולדת)</button>' +
      '<button type="button" class="prob-toggle" data-mode="specific" aria-pressed="false">התאמה ליום ההולדת שלי</button>' +
      '</div>' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-btn" data-action="single">הגרל חדר אחד (הצג תאריכים)</button>' +
      '<button type="button" class="prob-toggle" data-action="sim">הרץ 1,000 חדרים (מונטה קרלו)</button>' +
      '</div>' +
      '</div>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="עקומת הסתברות לימי הולדת משותפים"></div>' +
      '<div class="prob-span" data-room-wrap hidden><span class="prob-k" data-room-title>תאריכים בחדר שהוגרל:</span><div class="prob-tags-wrap" data-room-tags></div></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("הסתברות תיאורטית מדויקת", "prob-theo") +
      statHtml("הסתברות שכל התאריכים שונים", "prob-diff") +
      statHtml("תוצאת סימולציית מונטה קרלו", "prob-sim") +
      '</div>';

    var state = { k: k0, days: days0, mode: "any", empiricalProb: null };

    var monthNames = ["בינואר", "בפברואר", "במרץ", "באפריל", "במאי", "ביוני", "ביולי", "באוגוסט", "בספטמבר", "באוקטובר", "בנובמבר", "בדצמבר"];
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function dayToHebrewDate(d) {
      var left = d;
      for (var m = 0; m < 12; m++) {
        if (left <= monthDays[m]) return left + " " + monthNames[m];
        left -= monthDays[m];
      }
      return d + " בשנה";
    }

    function calcExactProb(k, days, mode) {
      if (mode === "specific") {
        return 1 - Math.pow((days - 1) / days, k);
      }
      if (k > days) return 1;
      var probNo = 1;
      for (var i = 0; i < k; i++) {
        probNo *= (days - i) / days;
      }
      return 1 - probNo;
    }

    function drawChart() {
      var host = el.querySelector("[data-chart]");
      var box = chartSize(host);
      var w = box.w; var h = box.h;
      var padL = 44; var padR = 12; var padT = 16; var padB = 26;
      var innerW = Math.max(10, w - padL - padR);
      var innerH = Math.max(10, h - padT - padB);

      var kMax = 70;
      function sx(k) { return padL + ((k - 1) / (kMax - 1)) * innerW; }
      function sy(p) { return padT + innerH - (p / 1) * innerH; }

      var under = []; var over = []; var parts = [];

      // horizontal 50% line
      var y50 = sy(0.5);
      under.push('<line class="prob-grid" x1="' + padL + '" y1="' + y50.toFixed(1) + '" x2="' + (padL + innerW) + '" y2="' + y50.toFixed(1) + '" stroke-dasharray="3 3"></line>');
      over.push('<text class="prob-tick" x="' + (padL - 6) + '" y="' + y50.toFixed(1) + '" text-anchor="end" dominant-baseline="middle">50%</text>');

      if (state.mode === "any") {
        var x23 = sx(23);
        under.push('<line class="prob-mean" x1="' + x23.toFixed(1) + '" y1="' + padT + '" x2="' + x23.toFixed(1) + '" y2="' + (padT + innerH) + '"></line>');
        over.push('<text class="prob-mu" x="' + x23.toFixed(1) + '" y="' + (padT + 12) + '" text-anchor="middle">k=23 (50.7%)</text>');
      }

      // curve points
      var d = [];
      for (var k = 1; k <= kMax; k++) {
        var pk = calcExactProb(k, state.days, state.mode);
        d.push((k === 1 ? "M" : "L") + sx(k).toFixed(1) + "," + sy(pk).toFixed(1));
      }
      parts.push('<path class="prob-curve" d="' + d.join("") + '"></path>');

      // current k marker
      var curP = calcExactProb(state.k, state.days, state.mode);
      var mx = sx(state.k); var my = sy(curP);
      parts.push('<circle cx="' + mx.toFixed(1) + '" cy="' + my.toFixed(1) + '" r="5.5" fill="var(--accent)" stroke="var(--card)" stroke-width="2"></circle>');

      // empirical dot if simulated
      if (state.empiricalProb != null) {
        var ey = sy(state.empiricalProb);
        parts.push('<circle cx="' + mx.toFixed(1) + '" cy="' + ey.toFixed(1) + '" r="6" fill="var(--bad)" stroke="var(--card)" stroke-width="2"></circle>');
      }

      var xLabels = [
        { x: sx(1), text: "1" },
        { x: sx(23), text: "23" },
        { x: sx(40), text: "40" },
        { x: sx(50), text: "50" },
        { x: sx(70), text: "70" }
      ];
      plotChrome(under, over, w, h, padL, padT, innerW, innerH, 1, xLabels);
      mountSvg(host, w, h, under.concat(parts, over).join(""));
    }

    function paint() {
      el.querySelector('[data-out="k"]').textContent = String(state.k);
      var anyBtn = el.querySelector('[data-mode="any"]');
      var specBtn = el.querySelector('[data-mode="specific"]');
      if (anyBtn) anyBtn.setAttribute("aria-pressed", state.mode === "any" ? "true" : "false");
      if (specBtn) specBtn.setAttribute("aria-pressed", state.mode === "specific" ? "true" : "false");

      var pExact = calcExactProb(state.k, state.days, state.mode);
      var pDiff = 1 - pExact;

      var texP = "P(\\text{התאמה}) = " + pExact.toFixed(4) + " \\; (" + (pExact * 100).toFixed(2) + "\\%)";
      var plainP = "P(match) = " + (pExact * 100).toFixed(2) + "%";
      var texDiff = "P(\\text{כולם שונים}) = " + pDiff.toFixed(4);
      var plainDiff = "P(all diff) = " + pDiff.toFixed(4);

      setMath(el.querySelector("[data-prob-theo]"), el.querySelector("[data-prob-theo-sr]"), texP, plainP);
      setMath(el.querySelector("[data-prob-diff]"), el.querySelector("[data-prob-diff-sr]"), texDiff, plainDiff);

      var simNode = el.querySelector("[data-prob-sim]");
      var simSr = el.querySelector("[data-prob-sim-sr]");
      if (state.empiricalProb != null) {
        var ep = state.empiricalProb;
        var sTex = "\\hat{p} = " + ep.toFixed(4) + " \\; (" + (ep * 100).toFixed(1) + "\\%)";
        setMath(simNode, simSr, sTex, (ep * 100).toFixed(1) + "%");
      } else {
        setMath(simNode, simSr, "\\text{לחצו 'הרץ 1,000 חדרים'}", "טרם הורצה סימולציה");
      }

      drawChart();
    }

    function runSingleRoom() {
      var k = state.k;
      var days = state.days;
      var room = [];
      var counts = {};
      var hasMatch = false;
      for (var i = 0; i < k; i++) {
        var day = randInt(1, days);
        room.push(day);
        counts[day] = (counts[day] || 0) + 1;
        if (counts[day] > 1) hasMatch = true;
      }
      var wrap = el.querySelector("[data-room-wrap]");
      wrap.hidden = false;
      var title = el.querySelector("[data-room-title]");
      title.textContent = hasMatch ? "נמצאה התאמה! לפחות שני אנשים חולקים יום הולדת:" : "בחדר זה כל ימי ההולדת שונים (אין התאמה):";
      title.style.color = hasMatch ? "var(--bad)" : "var(--ok)";
      var tagsBox = el.querySelector("[data-room-tags]");
      var html = "";
      for (var j = 0; j < k; j++) {
        var d = room[j];
        var isMatch = counts[d] > 1;
        html += '<span class="prob-tag' + (isMatch ? " is-match" : "") + '">' + dayToHebrewDate(d) + "</span>";
      }
      tagsBox.innerHTML = html;
    }

    function runSimulation() {
      var k = state.k;
      var days = state.days;
      var mode = state.mode;
      var trials = 1000;
      var matches = 0;
      for (var t = 0; t < trials; t++) {
        if (mode === "specific") {
          var myBday = 1;
          var found = false;
          for (var i = 0; i < k; i++) {
            if (randInt(1, days) === myBday) { found = true; break; }
          }
          if (found) matches++;
        } else {
          var seen = {};
          var dup = false;
          for (var j = 0; j < k; j++) {
            var b = randInt(1, days);
            if (seen[b]) { dup = true; break; }
            seen[b] = true;
          }
          if (dup) matches++;
        }
      }
      state.empiricalProb = matches / trials;
      paint();
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      state.k = clamp(readNum(el.querySelector('[data-k]')), 2, 70);
      state.empiricalProb = null;
      paint();
    });

    el.addEventListener("click", function (ev) {
      var modeBtn = ev.target.closest("[data-mode]");
      if (modeBtn) {
        state.mode = modeBtn.getAttribute("data-mode");
        state.empiricalProb = null;
        paint();
        return;
      }
      var actBtn = ev.target.closest("[data-action]");
      if (actBtn) {
        var act = actBtn.getAttribute("data-action");
        if (act === "single") runSingleRoom();
        else if (act === "sim") runSimulation();
      }
    });

    el.probRedraw = function() { drawChart(); };
    el.setAttribute("data-chart-live", "1");
    paint();
  }

  /* === 6. מעבדת עץ הסתברות ובייס (tree) === */
  function mountTree(el) {
    var pa0 = clamp(attrNum(el, "data-pa", 0.3), 0.01, 0.99);
    var pba0 = clamp(attrNum(el, "data-pba", 0.8), 0.01, 0.99);
    var pba_not0 = clamp(attrNum(el, "data-pba-not", 0.1), 0.01, 0.99);

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: עץ הסתברות, הסתברות שלמה ובייס");
    el.innerHTML = headHtml("עץ הסתברות, הסתברות שלמה ובייס (Probability Tree)", "מה לנסות כאן: שנו את ההסתברויות בענפי העץ (או בחרו תרחיש מוכן כמו בדיקה רפואית או ספאם). לחצו על חישוב P(B) או P(A|B) כדי לראות את המסלולים הרלוונטיים מודגשים בעץ ואת הנוסחאות מחושבות.") +
      '<div class="prob-controls">' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">P(A)</span><output data-out="pa">' + pa0.toFixed(2) + '</output></span>' +
      '<input type="range" data-pa min="0.01" max="0.99" step="0.01" value="' + pa0 + '" aria-label="הסתברות א-פריורית P(A)"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">P(B | A)</span><output data-out="pba">' + pba0.toFixed(2) + '</output></span>' +
      '<input type="range" data-pba min="0.01" max="0.99" step="0.01" value="' + pba0 + '" aria-label="הסתברות מותנית P(B|A)"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">P(B | Aᶜ)</span><output data-out="pba-not">' + pba_not0.toFixed(2) + '</output></span>' +
      '<input type="range" data-pba-not min="0.01" max="0.99" step="0.01" value="' + pba_not0 + '" aria-label="הסתברות מותנית בהינתן המשלים P(B|Aᶜ)"></label>' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-preset="med">בדיקה רפואית (1% חולים, 95% דיוק)</button>' +
      '<button type="button" class="prob-toggle" data-preset="spam">סינון ספאם (40% ספאם, מילת מפתח)</button>' +
      '<button type="button" class="prob-toggle" data-preset="factory">קו ייצור (60% מכונה א, 40% מכונה ב)</button>' +
      '</div>' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-highlight="pb">הדגש P(B) (הסתברות שלמה)</button>' +
      '<button type="button" class="prob-toggle" data-highlight="bayes">הדגש P(A | B) (נוסחת בייס)</button>' +
      '<button type="button" class="prob-toggle" data-highlight="none">נקה הדגשות</button>' +
      '</div>' +
      '</div>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="עץ הסתברות"></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("חוק ההסתברות השלמה P(B)", "pb-stat") +
      statHtml("נוסחת בייס P(A | B)", "bayes-stat") +
      statHtml("הסתברות משלימה בדיעבד P(Aᶜ | B)", "comp-stat") +
      '</div>';

    var state = { pa: pa0, pba: pba0, pba_not: pba_not0, highlight: "none" };

    function drawTree() {
      var host = el.querySelector("[data-chart]");
      var w = 520; var h = 240;

      var pa = state.pa;
      var pa_not = 1 - pa;
      var pba = state.pba;
      var pb_not_a = 1 - pba;
      var pba_not = state.pba_not;
      var pb_not_a_not = 1 - pba_not;

      var pAB = pa * pba;
      var pABc = pa * pb_not_a;
      var pAcB = pa_not * pba_not;
      var pAcBc = pa_not * pb_not_a_not;
      var pB = pAB + pAcB;

      var hl = state.highlight;
      var actBranchAB = (hl === "pb" || hl === "bayes");
      var actBranchAcB = (hl === "pb");

      var svg = '<svg class="prob-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="עץ הסתברות דו-שלבי">';

      // coords
      var rX = 40; var rY = 120;
      var aX = 180; var aY = 60;
      var acX = 180; var acY = 180;
      var leafX = 350;
      var l1Y = 32; var l2Y = 88; var l3Y = 152; var l4Y = 208;

      // branches stage 1
      svg += '<line x1="' + rX + '" y1="' + rY + '" x2="' + aX + '" y2="' + aY + '" class="prob-tree-branch' + (actBranchAB ? " is-active" : "") + '"></line>';
      svg += '<line x1="' + rX + '" y1="' + rY + '" x2="' + acX + '" y2="' + acY + '" class="prob-tree-branch' + (actBranchAcB ? " is-active" : "") + '"></line>';

      // branch labels stage 1
      svg += '<text x="95" y="74" class="prob-tick" font-weight="700" fill="var(--accent-ink)">P(A)=' + pa.toFixed(2) + '</text>';
      svg += '<text x="95" y="174" class="prob-tick" font-weight="700">P(Aᶜ)=' + pa_not.toFixed(2) + '</text>';

      // branches stage 2
      svg += '<line x1="' + aX + '" y1="' + aY + '" x2="' + leafX + '" y2="' + l1Y + '" class="prob-tree-branch' + (actBranchAB ? " is-active" : "") + '"></line>';
      svg += '<line x1="' + aX + '" y1="' + aY + '" x2="' + leafX + '" y2="' + l2Y + '" class="prob-tree-branch"></line>';
      svg += '<line x1="' + acX + '" y1="' + acY + '" x2="' + leafX + '" y2="' + l3Y + '" class="prob-tree-branch' + (actBranchAcB ? " is-active" : "") + '"></line>';
      svg += '<line x1="' + acX + '" y1="' + acY + '" x2="' + leafX + '" y2="' + l4Y + '" class="prob-tree-branch"></line>';

      // branch labels stage 2
      svg += '<text x="250" y="28" class="prob-tick">P(B|A)=' + pba.toFixed(2) + '</text>';
      svg += '<text x="250" y="94" class="prob-tick">P(Bᶜ|A)=' + pb_not_a.toFixed(2) + '</text>';
      svg += '<text x="250" y="148" class="prob-tick">P(B|Aᶜ)=' + pba_not.toFixed(2) + '</text>';
      svg += '<text x="250" y="214" class="prob-tick">P(Bᶜ|Aᶜ)=' + pb_not_a_not.toFixed(2) + '</text>';

      // nodes
      svg += '<circle cx="' + rX + '" cy="' + rY + '" r="12" class="prob-tree-node"></circle><text x="' + rX + '" y="' + (rY+4) + '" text-anchor="middle" font-size="11" font-weight="700">Ω</text>';
      svg += '<circle cx="' + aX + '" cy="' + aY + '" r="14" class="prob-tree-node' + (actBranchAB ? " is-active" : "") + '"></circle><text x="' + aX + '" y="' + (aY+4) + '" text-anchor="middle" font-size="12" font-weight="700">A</text>';
      svg += '<circle cx="' + acX + '" cy="' + acY + '" r="14" class="prob-tree-node' + (actBranchAcB ? " is-active" : "") + '"></circle><text x="' + acX + '" y="' + (acY+4) + '" text-anchor="middle" font-size="12" font-weight="700">Aᶜ</text>';

      // leaf labels
      var bgL1 = actBranchAB ? "var(--ok-bg)" : "var(--card)";
      var bgL3 = actBranchAcB ? "var(--ok-bg)" : "var(--card)";
      svg += '<rect x="' + leafX + '" y="' + (l1Y - 14) + '" width="155" height="26" rx="6" fill="' + bgL1 + '" stroke="var(--line)"></rect>';
      svg += '<text x="' + (leafX + 8) + '" y="' + (l1Y + 4) + '" font-size="11" font-weight="700">P(A ∩ B) = ' + pAB.toFixed(4) + '</text>';

      svg += '<rect x="' + leafX + '" y="' + (l2Y - 14) + '" width="155" height="26" rx="6" fill="var(--card)" stroke="var(--line)"></rect>';
      svg += '<text x="' + (leafX + 8) + '" y="' + (l2Y + 4) + '" font-size="11">P(A ∩ Bᶜ) = ' + pABc.toFixed(4) + '</text>';

      svg += '<rect x="' + leafX + '" y="' + (l3Y - 14) + '" width="155" height="26" rx="6" fill="' + bgL3 + '" stroke="var(--line)"></rect>';
      svg += '<text x="' + (leafX + 8) + '" y="' + (l3Y + 4) + '" font-size="11" font-weight="700">P(Aᶜ ∩ B) = ' + pAcB.toFixed(4) + '</text>';

      svg += '<rect x="' + leafX + '" y="' + (l4Y - 14) + '" width="155" height="26" rx="6" fill="var(--card)" stroke="var(--line)"></rect>';
      svg += '<text x="' + (leafX + 8) + '" y="' + (l4Y + 4) + '" font-size="11">P(Aᶜ ∩ Bᶜ) = ' + pAcBc.toFixed(4) + '</text>';

      svg += '</svg>';
      host.innerHTML = svg;
    }

    function paint() {
      el.querySelector('[data-out="pa"]').textContent = state.pa.toFixed(2);
      el.querySelector('[data-out="pba"]').textContent = state.pba.toFixed(2);
      el.querySelector('[data-out="pba-not"]').textContent = state.pba_not.toFixed(2);

      var pa = state.pa; var pba = state.pba; var pba_not = state.pba_not;
      var pAB = pa * pba;
      var pAcB = (1 - pa) * pba_not;
      var pB = pAB + pAcB;
      var pAgivenB = pB > 0 ? pAB / pB : 0;
      var pAcgivenB = 1 - pAgivenB;

      var pbTex = "P(B) = P(A)P(B|A) + P(A^c)P(B|A^c) = " + pAB.toFixed(4) + " + " + pAcB.toFixed(4) + " = " + pB.toFixed(4);
      var pbPlain = "P(B) = " + pAB.toFixed(4) + " + " + pAcB.toFixed(4) + " = " + pB.toFixed(4);
      var bayesTex = "P(A | B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{" + pAB.toFixed(4) + "}{" + pB.toFixed(4) + "} = " + pAgivenB.toFixed(4) + " \\; (" + (pAgivenB*100).toFixed(1) + "\\%)";
      var bayesPlain = "P(A|B) = " + pAB.toFixed(4) + " / " + pB.toFixed(4) + " = " + (pAgivenB*100).toFixed(1) + "%";
      var compTex = "P(A^c | B) = 1 - P(A|B) = " + pAcgivenB.toFixed(4) + " \\; (" + (pAcgivenB*100).toFixed(1) + "\\%)";
      var compPlain = "P(A^c|B) = " + (pAcgivenB*100).toFixed(1) + "%";

      setMath(el.querySelector("[data-pb-stat]"), el.querySelector("[data-pb-stat-sr]"), pbTex, pbPlain);
      setMath(el.querySelector("[data-bayes-stat]"), el.querySelector("[data-bayes-stat-sr]"), bayesTex, bayesPlain);
      setMath(el.querySelector("[data-comp-stat]"), el.querySelector("[data-comp-stat-sr]"), compTex, compPlain);

      drawTree();
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      state.pa = readNum(el.querySelector('[data-pa]'));
      state.pba = readNum(el.querySelector('[data-pba]'));
      state.pba_not = readNum(el.querySelector('[data-pba-not]'));
      paint();
    });

    el.addEventListener("click", function (ev) {
      var preBtn = ev.target.closest("[data-preset]");
      if (preBtn) {
        var p = preBtn.getAttribute("data-preset");
        if (p === "med") { state.pa = 0.01; state.pba = 0.95; state.pba_not = 0.05; }
        else if (p === "spam") { state.pa = 0.40; state.pba = 0.85; state.pba_not = 0.10; }
        else if (p === "factory") { state.pa = 0.60; state.pba = 0.02; state.pba_not = 0.08; }
        el.querySelector('[data-pa]').value = String(state.pa);
        el.querySelector('[data-pba]').value = String(state.pba);
        el.querySelector('[data-pba-not]').value = String(state.pba_not);
        paint();
        return;
      }
      var hlBtn = ev.target.closest("[data-highlight]");
      if (hlBtn) {
        state.highlight = hlBtn.getAttribute("data-highlight");
        drawTree();
      }
    });

    el.probRedraw = function() { drawTree(); };
    el.setAttribute("data-chart-live", "1");
    paint();
  }

  /* === 7. מעבדת אי־תלות של מאורעות (indep) === */
  function mountIndep(el) {
    var evA0 = attrEnum(el, "data-event-a", ["first_even", "sum_7", "sum_even", "first_6", "sum_ge_10", "doubles"], "first_even");
    var evB0 = attrEnum(el, "data-event-b", ["second_even", "sum_7", "sum_8", "second_3", "diff_dice", "any_6"], "sum_7");

    var EVENTS_A = {
      first_even: { title: "קובייה 1 היא זוגית (P=1/2)", pred: function(d1, d2) { return d1 % 2 === 0; } },
      sum_7: { title: "סכום הקוביות הוא 7 (P=1/6)", pred: function(d1, d2) { return d1 + d2 === 7; } },
      sum_even: { title: "סכום הקוביות זוגי (P=1/2)", pred: function(d1, d2) { return (d1 + d2) % 2 === 0; } },
      first_6: { title: "קובייה 1 היא 6 (P=1/6)", pred: function(d1, d2) { return d1 === 6; } },
      sum_ge_10: { title: "סכום הקוביות לפחות 10 (P=6/36)", pred: function(d1, d2) { return d1 + d2 >= 10; } },
      doubles: { title: "שתי הקוביות מראות אותו מספר (P=1/6)", pred: function(d1, d2) { return d1 === d2; } }
    };

    var EVENTS_B = {
      second_even: { title: "קובייה 2 היא זוגית (P=1/2)", pred: function(d1, d2) { return d2 % 2 === 0; } },
      sum_7: { title: "סכום הקוביות הוא 7 (P=1/6)", pred: function(d1, d2) { return d1 + d2 === 7; } },
      sum_8: { title: "סכום הקוביות הוא 8 (P=5/36)", pred: function(d1, d2) { return d1 + d2 === 8; } },
      second_3: { title: "קובייה 2 היא 3 (P=1/6)", pred: function(d1, d2) { return d2 === 3; } },
      diff_dice: { title: "הקוביות מראות מספרים שונים (P=30/36)", pred: function(d1, d2) { return d1 !== d2; } },
      any_6: { title: "לפחות אחת הקוביות היא 6 (P=11/36)", pred: function(d1, d2) { return d1 === 6 || d2 === 6; } }
    };

    var optA = ""; var optB = "";
    for (var ka in EVENTS_A) optA += '<option value="' + ka + '"' + (ka === evA0 ? " selected" : "") + '>' + EVENTS_A[ka].title + '</option>';
    for (var kb in EVENTS_B) optB += '<option value="' + kb + '"' + (kb === evB0 ? " selected" : "") + '>' + EVENTS_B[kb].title + '</option>';

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: בדיקת אי־תלות בין מאורעות");
    el.innerHTML = headHtml("אי־תלות בין מאורעות (Event Independence)", "מה לנסות כאן: בחרו שני מאורעות A ו-B על הטלת שתי קוביות (36 תוצאות שוות-סיכוי). ראו היכן הם נחתכים בטבלה, ובדקו האם מתקיים תנאי האי-תלות P(A∩B) = P(A)P(B). הריצו הטלות כדי לבחון התכנסות אמפירית.") +
      '<div class="prob-controls">' +
      '<label class="prob-field"><span class="prob-field-label">מאורע A (צבע ירוק-טורקיז)</span>' +
      '<select data-pick-a aria-label="בחירת מאורע A">' + optA + '</select></label>' +
      '<label class="prob-field"><span class="prob-field-label">מאורע B (צבע כחול)</span>' +
      '<select data-pick-b aria-label="בחירת מאורע B">' + optB + '</select></label>' +
      '<div class="prob-actions"><button type="button" class="prob-btn" data-sim-dice>הטל שתי קוביות 300 פעמים (סימולציה)</button></div>' +
      '</div>' +
      '<p class="prob-def" style="text-align:center;">טבלת 36 התוצאות (קובייה 1 בשורות, קובייה 2 בעמודות). ירוק מודגש: A ∩ B.</p>' +
      '<div class="prob-dice-grid" data-grid></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("הסתברויות יחידות P(A) ו־P(B)", "single-probs") +
      statHtml("מכפלת ההסתברויות P(A) · P(B)", "prod-prob") +
      statHtml("הסתברות החיתוך P(A ∩ B)", "inter-prob") +
      '<div class="prob-stat prob-stat-wide"><span class="prob-k">פסק דין אי־תלות והסתברות מותנית</span><div data-verdict style="font-weight:700;line-height:1.5;"></div></div>' +
      statHtml("תוצאה אמפירית (סימולציה)", "sim-stat") +
      '</div>';

    var state = { evA: evA0, evB: evB0, simResult: null };

    function paint() {
      var predA = EVENTS_A[state.evA].pred;
      var predB = EVENTS_B[state.evB].pred;

      var countA = 0; var countB = 0; var countBoth = 0;
      var gridHtml = "";
      for (var d1 = 1; d1 <= 6; d1++) {
        for (var d2 = 1; d2 <= 6; d2++) {
          var inA = predA(d1, d2);
          var inB = predB(d1, d2);
          if (inA) countA++;
          if (inB) countB++;
          if (inA && inB) countBoth++;

          var cls = "prob-dice-cell";
          if (inA && inB) cls += " is-both";
          else if (inA) cls += " is-a";
          else if (inB) cls += " is-b";

          gridHtml += '<div class="' + cls + '" title="(' + d1 + ',' + d2 + ') סכום ' + (d1+d2) + '"><span>' + d1 + ',' + d2 + '</span><small style="font-size:0.7rem;color:var(--muted);">' + (d1+d2) + '</small></div>';
        }
      }
      el.querySelector("[data-grid]").innerHTML = gridHtml;

      var pa = countA / 36;
      var pb = countB / 36;
      var pab = countBoth / 36;
      var prod = pa * pb;
      var isIndep = Math.abs(pab - prod) < 1e-6;

      var sTex = "P(A) = \\frac{" + countA + "}{36} = " + pa.toFixed(3) + ",\\quad P(B) = \\frac{" + countB + "}{36} = " + pb.toFixed(3);
      var prodTex = "P(A) \\cdot P(B) = " + pa.toFixed(3) + " \\times " + pb.toFixed(3) + " = " + prod.toFixed(4);
      var interTex = "P(A \\cap B) = \\frac{" + countBoth + "}{36} = " + pab.toFixed(4);

      setMath(el.querySelector("[data-single-probs]"), el.querySelector("[data-single-probs-sr]"), sTex, "P(A)=" + countA + "/36, P(B)=" + countB + "/36");
      setMath(el.querySelector("[data-prod-prob]"), el.querySelector("[data-prod-prob-sr]"), prodTex, "P(A)*P(B)=" + prod.toFixed(4));
      setMath(el.querySelector("[data-inter-prob]"), el.querySelector("[data-inter-prob-sr]"), interTex, "P(A∩B)=" + countBoth + "/36=" + pab.toFixed(4));

      var verd = el.querySelector("[data-verdict]");
      var pAgivenB = pb > 0 ? (pab / pb).toFixed(3) : "—";
      if (isIndep) {
        verd.innerHTML = '<span class="prob-badge prob-badge-ok">מאורעות בלתי תלויים ✓</span> P(A∩B) = P(A)P(B) מתקיים בדיוק. ידיעת B אינה משנה את הסיכוי של A: P(A|B) = ' + pAgivenB + ' = P(A).';
      } else {
        verd.innerHTML = '<span class="prob-badge prob-badge-bad">מאורעות תלויים ✗</span> P(A∩B) ≠ P(A)P(B). ידיעת B משנה את הסיכוי ל־A: P(A|B) = ' + pAgivenB + ' לעומת P(A) = ' + pa.toFixed(3) + '.';
      }

      var simNode = el.querySelector("[data-sim-stat]");
      var simSr = el.querySelector("[data-sim-stat-sr]");
      if (state.simResult) {
        var r = state.simResult;
        var rTex = "\\hat{P}(A\\cap B) = \\frac{" + r.both + "}{300} = " + (r.both/300).toFixed(3) + ",\\; \\hat{P}(A)\\hat{P}(B) = " + ((r.a/300)*(r.b/300)).toFixed(3);
        setMath(simNode, simSr, rTex, "Sim: P(A∩B)=" + (r.both/300).toFixed(3));
      } else {
        setMath(simNode, simSr, "\\text{לחצו 'הטל 300 פעמים' להרצה}", "טרם הורצה סימולציה");
      }
    }

    function runDiceSim() {
      var predA = EVENTS_A[state.evA].pred;
      var predB = EVENTS_B[state.evB].pred;
      var aCount = 0; var bCount = 0; var bothCount = 0;
      for (var i = 0; i < 300; i++) {
        var d1 = randInt(1, 6); var d2 = randInt(1, 6);
        var inA = predA(d1, d2); var inB = predB(d1, d2);
        if (inA) aCount++;
        if (inB) bCount++;
        if (inA && inB) bothCount++;
      }
      state.simResult = { a: aCount, b: bCount, both: bothCount };
      paint();
    }

    el.addEventListener("change", function (ev) {
      if (ev.target.matches("[data-pick-a]")) {
        state.evA = ev.target.value;
        state.simResult = null;
        paint();
      } else if (ev.target.matches("[data-pick-b]")) {
        state.evB = ev.target.value;
        state.simResult = null;
        paint();
      }
    });

    el.addEventListener("click", function (ev) {
      if (ev.target.closest("[data-sim-dice]")) runDiceSim();
    });

    paint();
  }

  /* === 8. מעבדת בונה pmf בדידה ו-CDF (rv) === */
  function mountRv(el) {
    var rawVals = el.getAttribute("data-values") || "1,2,3,4,5";
    var rawProbs = el.getAttribute("data-probs") || "0.1,0.2,0.4,0.2,0.1";
    var initX = rawVals.split(",").map(Number);
    var initP = rawProbs.split(",").map(Number);

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: בונה משתנה מקרי בדיד");
    el.innerHTML = headHtml("בניית משתנה מקרי בדיד (Custom Discrete PMF)", "מה לנסות כאן: שנו את ההסתברויות של הערכים בטבלה, לחצו 'נרמל' אם הסכום שונה מ-1, וצפו בחישוב התוחלת (מרכז הכובד המסומן בקו מקווקו), השונות, ובפונקציית ההתפלגות המצטברת F(x) שקופצת בכל ערך.") +
      '<div class="prob-controls">' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-preset="die">קובייה הוגנת (1-6)</button>' +
      '<button type="button" class="prob-toggle" data-preset="gamble">משחק הימור (-2 עד +5)</button>' +
      '<button type="button" class="prob-toggle" data-preset="bell">פעמון סימטרי</button>' +
      '<button type="button" class="prob-toggle" data-preset="skew">מוטה ימינה</button>' +
      '</div>' +
      '<div class="prob-params" data-inputs style="grid-column:1/-1;"></div>' +
      '<div class="prob-actions"><button type="button" class="prob-btn" data-normalize>נרמל הסתברויות ל־1.0</button></div>' +
      '</div>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="פונקציית הסתברות ופונקציית התפלגות מצטברת"></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("סכום הסתברויות Σ p_i", "sum-stat") +
      statHtml("תוחלת המשתנה E[X]", "mean-stat") +
      statHtml("שונות Var(X)", "var-stat") +
      statHtml("סטיית תקן σ(X)", "sd-stat") +
      '</div>';

    var state = { x: initX, p: initP };

    function buildInputs() {
      var box = el.querySelector("[data-inputs]");
      var html = "";
      for (var i = 0; i < state.x.length; i++) {
        html += '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">P(X = ' + state.x[i] + ')</span><output data-out-p="' + i + '">' + state.p[i].toFixed(2) + '</output></span>' +
          '<input type="range" data-p-idx="' + i + '" min="0" max="1" step="0.01" value="' + state.p[i] + '" aria-label="הסתברות של ' + state.x[i] + '"></label>';
      }
      box.innerHTML = html;
    }

    function drawCharts(meanVal) {
      var host = el.querySelector("[data-chart]");
      var box = chartSize(host);
      var w = box.w; var h = box.h;
      var padL = 46; var padR = 14; var padT = 16; var padB = 26;
      var innerW = Math.max(10, w - padL - padR);
      var innerH = Math.max(10, h - padT - padB);

      var n = state.x.length;
      var xMin = state.x[0] - 0.5;
      var xMax = state.x[n - 1] + 0.5;
      function sx(xv) { return padL + ((xv - xMin) / (xMax - xMin)) * innerW; }
      function sy(pv) { return padT + innerH - pv * innerH; }

      var under = []; var over = []; var parts = [];

      // PMF bars
      var slot = innerW / n;
      var bw = Math.min(32, slot * 0.6);
      for (var i = 0; i < n; i++) {
        var bx = sx(state.x[i]) - bw / 2;
        var by = sy(state.p[i]);
        var bh = (state.p[i]) * innerH;
        parts.push('<rect class="prob-bar prob-bar-on" x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '"></rect>');
      }

      // Mean vertical line
      if (isFinite(meanVal) && meanVal >= xMin && meanVal <= xMax) {
        var mx = sx(meanVal);
        parts.push('<line class="prob-mean" x1="' + mx.toFixed(1) + '" y1="' + padT + '" x2="' + mx.toFixed(1) + '" y2="' + (padT + innerH) + '"></line>');
        parts.push('<text class="prob-mu" x="' + (mx + 4).toFixed(1) + '" y="' + (padT + 12) + '">E[X]=' + meanVal.toFixed(2) + '</text>');
      }

      // CDF step function curve
      var cdfPoints = [];
      var cum = 0;
      cdfPoints.push("M" + sx(xMin).toFixed(1) + "," + sy(0).toFixed(1));
      for (var j = 0; j < n; j++) {
        var xVal = state.x[j];
        cdfPoints.push("L" + sx(xVal).toFixed(1) + "," + sy(cum).toFixed(1));
        cum += state.p[j];
        cdfPoints.push("L" + sx(xVal).toFixed(1) + "," + sy(cum).toFixed(1));
      }
      cdfPoints.push("L" + sx(xMax).toFixed(1) + "," + sy(cum).toFixed(1));
      parts.push('<path d="' + cdfPoints.join("") + '" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-dasharray="2 2"></path>');

      var xLabels = [];
      for (var k = 0; k < n; k++) xLabels.push({ x: sx(state.x[k]), text: String(state.x[k]) });
      plotChrome(under, over, w, h, padL, padT, innerW, innerH, 1, xLabels);
      mountSvg(host, w, h, under.concat(parts, over).join(""));
    }

    function paint() {
      var sumP = 0;
      for (var i = 0; i < state.p.length; i++) {
        sumP += state.p[i];
        var outEl = el.querySelector('[data-out-p="' + i + '"]');
        if (outEl) outEl.textContent = state.p[i].toFixed(2);
      }

      var mean = 0; var eX2 = 0;
      for (var j = 0; j < state.x.length; j++) {
        mean += state.x[j] * state.p[j];
        eX2 += state.x[j] * state.x[j] * state.p[j];
      }
      var variance = eX2 - (mean * mean);
      if (variance < 0 && variance > -1e-8) variance = 0;
      var sd = Math.sqrt(Math.max(0, variance));

      var sumTex = "\\sum p_i = " + sumP.toFixed(3);
      var meanTex = "E[X] = \\sum x_i p_i = " + fmtStat(mean);
      var varTex = "\\mathrm{Var}(X) = E[X^2] - (E[X])^2 = " + fmtStat(variance);
      var sdTex = "\\sigma(X) = \\sqrt{\\mathrm{Var}} = " + fmtStat(sd);

      setMath(el.querySelector("[data-sum-stat]"), el.querySelector("[data-sum-stat-sr]"), sumTex, sumP.toFixed(3));
      setMath(el.querySelector("[data-mean-stat]"), el.querySelector("[data-mean-stat-sr]"), meanTex, "E[X]=" + fmtStat(mean));
      setMath(el.querySelector("[data-var-stat]"), el.querySelector("[data-var-stat-sr]"), varTex, "Var=" + fmtStat(variance));
      setMath(el.querySelector("[data-sd-stat]"), el.querySelector("[data-sd-stat-sr]"), sdTex, "sd=" + fmtStat(sd));

      drawCharts(mean);
    }

    function normalize() {
      var sum = 0;
      for (var i = 0; i < state.p.length; i++) sum += state.p[i];
      if (sum <= 0) {
        for (var j = 0; j < state.p.length; j++) state.p[j] = 1 / state.p.length;
      } else {
        for (var k = 0; k < state.p.length; k++) state.p[k] = Math.round((state.p[k] / sum) * 100) / 100;
      }
      buildInputs();
      paint();
    }

    buildInputs();

    el.addEventListener("input", function (ev) {
      if (!ev.target || !ev.target.hasAttribute("data-p-idx")) return;
      var idx = Number(ev.target.getAttribute("data-p-idx"));
      state.p[idx] = readNum(ev.target);
      paint();
    });

    el.addEventListener("click", function (ev) {
      if (ev.target.closest("[data-normalize]")) {
        normalize();
        return;
      }
      var preBtn = ev.target.closest("[data-preset]");
      if (preBtn) {
        var pr = preBtn.getAttribute("data-preset");
        if (pr === "die") {
          state.x = [1, 2, 3, 4, 5, 6];
          state.p = [1/6, 1/6, 1/6, 1/6, 1/6, 1/6];
        } else if (pr === "gamble") {
          state.x = [-2, -1, 0, 2, 5];
          state.p = [0.35, 0.25, 0.20, 0.15, 0.05];
        } else if (pr === "bell") {
          state.x = [1, 2, 3, 4, 5];
          state.p = [0.06, 0.24, 0.40, 0.24, 0.06];
        } else if (pr === "skew") {
          state.x = [1, 2, 3, 4, 5];
          state.p = [0.50, 0.25, 0.13, 0.08, 0.04];
        }
        buildInputs();
        paint();
      }
    });

    el.probRedraw = function() { paint(); };
    el.setAttribute("data-chart-live", "1");
    paint();
  }

  /* === 9. מעבדת חוק המספרים הגדולים (lln) === */
  function mountLln(el) {
    var dist0 = attrEnum(el, "data-dist", ["die", "coin", "exp", "uniform", "cauchy"], "die");
    var n0 = clamp(Math.round(attrNum(el, "data-n", 500)), 50, 1000);

    var DIST_CONFIG = {
      die: {
        name: "הטלת קובייה הוגנת",
        mu: 3.5,
        hasMu: true,
        sample: function() { return randInt(1, 6); },
        yMin: 1, yMax: 6
      },
      coin: {
        name: "מטבע הוגן (0 או 1)",
        mu: 0.5,
        hasMu: true,
        sample: function() { return Math.random() < 0.5 ? 1 : 0; },
        yMin: 0, yMax: 1
      },
      exp: {
        name: "מעריכית λ=1.0",
        mu: 1.0,
        hasMu: true,
        sample: function() { return -Math.log(Math.max(1e-12, Math.random())); },
        yMin: 0, yMax: 3
      },
      uniform: {
        name: "אחידה רציפה U(0, 10)",
        mu: 5.0,
        hasMu: true,
        sample: function() { return randUniform(0, 10); },
        yMin: 0, yMax: 10
      },
      cauchy: {
        name: "קושי Cauchy (חסרת תוחלת!)",
        mu: NaN,
        hasMu: false,
        sample: function() { return Math.tan(Math.PI * (Math.random() - 0.5)); },
        yMin: -10, yMax: 10
      }
    };

    var opts = "";
    for (var k in DIST_CONFIG) {
      opts += '<option value="' + k + '"' + (k === dist0 ? " selected" : "") + '>' + DIST_CONFIG[k].name + '</option>';
    }

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: חוק המספרים הגדולים");
    el.innerHTML = headHtml("חוק המספרים הגדולים (Law of Large Numbers)", "מה לנסות כאן: בחרו התפלגות והגדילו את מספר הצעדים N. שימו לב כיצד ממוצע המדגם הולך ומתכנס לתוחלת התיאורטית. נסו לבחור בהתפלגות קושי (Cauchy) כדי לראות מה קורה כאשר התוחלת אינה קיימת!") +
      '<div class="prob-controls">' +
      '<label class="prob-field prob-span"><span class="prob-field-label">התפלגות דגימה</span>' +
      '<select data-pick-dist aria-label="בחירת התפלגות">' + opts + '</select></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">N מספר צעדים / גודל מדגם</span><output data-out="n">' + n0 + '</output></span>' +
      '<input type="range" data-n min="50" max="1000" step="25" value="' + n0 + '" aria-label="מספר צעדים N"></label>' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-paths="1" aria-pressed="true">מסלול יחיד</button>' +
      '<button type="button" class="prob-toggle" data-paths="3" aria-pressed="false">3 מסלולים במקביל</button>' +
      '<button type="button" class="prob-toggle" data-paths="5" aria-pressed="false">5 מסלולים במקביל</button>' +
      '</div>' +
      '<div class="prob-actions"><button type="button" class="prob-btn" data-resample>הגרל מדגם חדש</button></div>' +
      '</div>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="גרף התכנסות ממוצע המדגם"></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("תוחלת תיאורטית μ", "mu-stat") +
      statHtml("ממוצע מדגם סופי X̄_N", "sample-stat") +
      statHtml("מרחק מהתוחלת |X̄_N - μ|", "diff-stat") +
      '<div class="prob-stat prob-stat-wide"><span class="prob-k">הסבר והבחנה מתמטית</span><div data-info style="font-size:0.92rem;line-height:1.5;"></div></div>' +
      '</div>';

    var state = { dist: dist0, n: n0, numPaths: 1, trajectories: [] };

    function simulatePaths() {
      var cfg = DIST_CONFIG[state.dist];
      var N = state.n;
      var paths = [];
      for (var p = 0; p < state.numPaths; p++) {
        var running = [];
        var sum = 0;
        for (var i = 1; i <= N; i++) {
          sum += cfg.sample();
          running.push(sum / i);
        }
        paths.push(running);
      }
      state.trajectories = paths;
    }

    function drawChart() {
      var host = el.querySelector("[data-chart]");
      var box = chartSize(host);
      var w = box.w; var h = box.h;
      var padL = 46; var padR = 14; var padT = 16; var padB = 26;
      var innerW = Math.max(10, w - padL - padR);
      var innerH = Math.max(10, h - padT - padB);

      var cfg = DIST_CONFIG[state.dist];
      var N = state.n;
      var yMin = cfg.yMin;
      var yMax = cfg.yMax;

      if (state.dist === "cauchy" && state.trajectories.length > 0) {
        var allVals = [];
        for (var p = 0; p < state.trajectories.length; p++) {
          allVals = allVals.concat(state.trajectories[p]);
        }
        allVals.sort(function(a,b){return a-b;});
        var q10 = allVals[Math.floor(allVals.length * 0.05)];
        var q90 = allVals[Math.floor(allVals.length * 0.95)];
        yMin = Math.min(-5, q10);
        yMax = Math.max(5, q90);
      }

      function sx(step) { return padL + ((step - 1) / (N - 1)) * innerW; }
      function sy(v) { return padT + innerH - ((v - yMin) / (yMax - yMin)) * innerH; }

      var under = []; var over = []; var parts = [];

      // mu line if exists
      if (cfg.hasMu) {
        var my = sy(cfg.mu);
        under.push('<line class="prob-mean" x1="' + padL + '" y1="' + my.toFixed(1) + '" x2="' + (padL + innerW) + '" y2="' + my.toFixed(1) + '"></line>');
        over.push('<text class="prob-mu" x="' + (padL + innerW - 4) + '" y="' + (my - 5).toFixed(1) + '" text-anchor="end">μ = ' + cfg.mu + '</text>');
      }

      var colors = ["var(--accent)", "#2563eb", "#d97706", "#7c3aed", "#db2777"];
      for (var t = 0; t < state.trajectories.length; t++) {
        var path = state.trajectories[t];
        var d = [];
        var stepSkip = Math.max(1, Math.floor(N / 400));
        for (var i = 0; i < N; i += stepSkip) {
          var vy = clamp(path[i], yMin, yMax);
          d.push((i === 0 ? "M" : "L") + sx(i + 1).toFixed(1) + "," + sy(vy).toFixed(1));
        }
        var col = colors[t % colors.length];
        parts.push('<path d="' + d.join("") + '" fill="none" stroke="' + col + '" stroke-width="' + (t === 0 ? "2.2" : "1.6") + '"></path>');
      }

      var xLabels = [
        { x: sx(1), text: "1" },
        { x: sx(Math.round(N * 0.25)), text: String(Math.round(N * 0.25)) },
        { x: sx(Math.round(N * 0.50)), text: String(Math.round(N * 0.50)) },
        { x: sx(Math.round(N * 0.75)), text: String(Math.round(N * 0.75)) },
        { x: sx(N), text: String(N) }
      ];
      plotChrome(under, over, w, h, padL, padT, innerW, innerH, yMax, xLabels);
      mountSvg(host, w, h, under.concat(parts, over).join(""));
    }

    function paint() {
      el.querySelector('[data-out="n"]').textContent = String(state.n);
      var cfg = DIST_CONFIG[state.dist];

      var lastVal = state.trajectories[0] ? state.trajectories[0][state.n - 1] : NaN;
      var diffVal = cfg.hasMu ? Math.abs(lastVal - cfg.mu) : NaN;

      var muTex = cfg.hasMu ? "\\mu = " + cfg.mu : "\\text{אינה מוגדרת}";
      var muPlain = cfg.hasMu ? "μ=" + cfg.mu : "לא מוגדרת";
      var sTex = "\\bar{X}_N = " + fmtStat(lastVal);
      var sPlain = "X̄_N = " + fmtStat(lastVal);
      var dTex = cfg.hasMu ? "|\\bar{X}_N - \\mu| = " + fmtStat(diffVal) : "—";
      var dPlain = cfg.hasMu ? fmtStat(diffVal) : "—";

      setMath(el.querySelector("[data-mu-stat]"), el.querySelector("[data-mu-stat-sr]"), muTex, muPlain);
      setMath(el.querySelector("[data-sample-stat]"), el.querySelector("[data-sample-stat-sr]"), sTex, sPlain);
      setMath(el.querySelector("[data-diff-stat]"), el.querySelector("[data-diff-stat-sr]"), dTex, dPlain);

      var info = el.querySelector("[data-info]");
      if (cfg.hasMu) {
        info.innerHTML = '<strong style="color:var(--ok);">חוק המספרים הגדולים החלש והחזק מתקיימים:</strong> כאשר התוחלת סופית, ממוצע המדגם X̄_n מתכנס בהסתברות (חלש) וכמעט בוודאות (חזק) לתוחלת μ ככל ש־n גדל. השונות של הממוצע דועכת בקצב σ²/n.';
      } else {
        info.innerHTML = '<strong style="color:var(--bad);">הפרת תנאי החוק (התפלגות קושי):</strong> להתפלגות קושי אין תוחלת (האינטגרל מתבדר). לכן ממוצע המדגם X̄_n אינו מתכנס לשום מספר קבוע, אלא ממשיך לקפוץ בפראות ללא תלות בגודל N!';
      }

      drawChart();
    }

    simulatePaths();

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      state.n = clamp(readNum(el.querySelector('[data-n]')), 50, 1000);
      simulatePaths();
      paint();
    });

    el.addEventListener("change", function (ev) {
      if (ev.target.matches("[data-pick-dist]")) {
        state.dist = ev.target.value;
        simulatePaths();
        paint();
      }
    });

    el.addEventListener("click", function (ev) {
      var pathBtn = ev.target.closest("[data-paths]");
      if (pathBtn) {
        var pCount = Number(pathBtn.getAttribute("data-paths"));
        state.numPaths = pCount;
        var allP = el.querySelectorAll("[data-paths]");
        for (var i = 0; i < allP.length; i++) allP[i].setAttribute("aria-pressed", allP[i] === pathBtn ? "true" : "false");
        simulatePaths();
        paint();
        return;
      }
      if (ev.target.closest("[data-resample]")) {
        simulatePaths();
        paint();
      }
    });

    el.probRedraw = function() { drawChart(); };
    el.setAttribute("data-chart-live", "1");
    paint();
  }

  /* === 10. מעבדת שטח מתחת לצפיפות רציפה (density) === */
  function mountDensity(el) {
    var dist0 = attrEnum(el, "data-dist", ["uniform", "exponential", "normal"], "exponential");
    var x1_0 = attrNum(el, "data-x1", 0.5);
    var x2_0 = attrNum(el, "data-x2", 2.0);

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: צפיפות רציפה וחישוב שטח");
    el.innerHTML = headHtml("צפיפות הסתברות רציפה וחישוב שטח (Continuous Density)", "מה לנסות כאן: בחרו התפלגות רציפה והזיזו את גבולות הקטע a ו-b. השטח הצבוע מתחת לגרף פונקציית הצפיפות f(x) הוא ההסתברות המדויקת P(a ≤ X ≤ b) = F(b) - F(a).") +
      '<div class="prob-controls">' +
      '<label class="prob-field prob-span"><span class="prob-field-label">סוג התפלגות</span>' +
      '<select data-pick-dist aria-label="בחירת התפלגות רציפה">' +
      '<option value="exponential"' + (dist0 === "exponential" ? " selected" : "") + '>מעריכית Exp(λ)</option>' +
      '<option value="uniform"' + (dist0 === "uniform" ? " selected" : "") + '>אחידה רציפה U(a, b)</option>' +
      '<option value="normal"' + (dist0 === "normal" ? " selected" : "") + '>נורמלית N(μ, σ²)</option>' +
      '</select></label>' +
      '<div class="prob-params" data-params></div>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">גבול תחתון x_1</span><output data-out="x1">' + x1_0.toFixed(2) + '</output></span>' +
      '<input type="range" data-x1 min="0" max="6" step="0.1" value="' + x1_0 + '" aria-label="גבול תחתון x1"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">גבול עליון x_2</span><output data-out="x2">' + x2_0.toFixed(2) + '</output></span>' +
      '<input type="range" data-x2 min="0" max="6" step="0.1" value="' + x2_0 + '" aria-label="גבול עליון x2"></label>' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-preset="sigma">תחום סטיית תקן [μ-σ, μ+σ]</button>' +
      '<button type="button" class="prob-toggle" data-preset="median">חציון ימני (הסתברות 0.5)</button>' +
      '</div>' +
      '</div>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="פונקציית צפיפות ושטח"></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("ההסתברות P(x_1 ≤ X ≤ x_2)", "prob-stat") +
      statHtml("הפרש פונקציית ההתפלגות F(x_2) - F(x_1)", "cdf-stat") +
      statHtml("תוחלת ושונות", "mean-var") +
      '<div class="prob-stat prob-stat-wide"><span class="prob-k">נקודה למחשבה</span><p style="margin:0;font-size:0.9rem;line-height:1.45;">במשתנה מקרי רציף, ההסתברות לקבל ערך מדויק בודד היא תמיד 0: P(X = c) = 0. הסתברות חיובית קיימת רק עבור קטעים בעלי אורך (אינטגרל על שטח).</p></div>' +
      '</div>';

    var state = {
      dist: dist0,
      x1: Math.min(x1_0, x2_0),
      x2: Math.max(x1_0, x2_0),
      expLambda: 1.0,
      unifA: 1.0,
      unifB: 5.0,
      normMu: 2.0,
      normSigma: 1.0
    };

    function buildParams() {
      var box = el.querySelector("[data-params]");
      var html = "";
      if (state.dist === "exponential") {
        html = fieldHtml({ key: "lambda", legend: "פרמטר קצב λ", aria: "פרמטר קצב למבדה", min: 0.2, max: 3.0, step: 0.1, value: state.expLambda });
      } else if (state.dist === "uniform") {
        html = fieldHtml({ key: "unif_a", legend: "גבול תחתון a", aria: "גבול תחתון", min: 0, max: 4, step: 0.5, value: state.unifA }) +
               fieldHtml({ key: "unif_b", legend: "גבול עליון b", aria: "גבול עליון", min: 2, max: 8, step: 0.5, value: state.unifB });
      } else if (state.dist === "normal") {
        html = fieldHtml({ key: "norm_mu", legend: "תוחלת μ", aria: "תוחלת מיו", min: -2, max: 5, step: 0.2, value: state.normMu }) +
               fieldHtml({ key: "norm_sig", legend: "סטיית תקן σ", aria: "סטיית תקן סיגמה", min: 0.4, max: 2.5, step: 0.1, value: state.normSigma });
      }
      box.innerHTML = html;
    }

    function getPdfCdf() {
      if (state.dist === "exponential") {
        var l = state.expLambda;
        return {
          pdf: function(x) { return expPdf(x, l); },
          cdf: function(x) { return expCdf(x, l); },
          mean: 1 / l,
          variance: 1 / (l * l),
          x0: 0, x1: Math.max(5, 5 / l),
          yMax: l * 1.05
        };
      } else if (state.dist === "uniform") {
        var a = state.unifA; var b = Math.max(a + 0.5, state.unifB);
        return {
          pdf: function(x) { return uniformPdf(x, a, b); },
          cdf: function(x) { return uniformCdf(x, a, b); },
          mean: (a + b) / 2,
          variance: Math.pow(b - a, 2) / 12,
          x0: Math.max(0, a - 1), x1: b + 1,
          yMax: (1 / (b - a)) * 1.3
        };
      } else {
        var mu = state.normMu; var sig = state.normSigma;
        return {
          pdf: function(x) { return normalPdf(x, mu, sig); },
          cdf: function(x) { return normalCdfAt(x, mu, sig); },
          mean: mu,
          variance: sig * sig,
          x0: mu - 3.5 * sig, x1: mu + 3.5 * sig,
          yMax: normalPdf(mu, mu, sig) * 1.15
        };
      }
    }

    function drawChart() {
      var host = el.querySelector("[data-chart]");
      var spec = getPdfCdf();
      drawCurveChart(host, {
        x0: spec.x0,
        x1: spec.x1,
        yMax: spec.yMax,
        shadeLo: state.x1,
        shadeHi: state.x2,
        mark: spec.mean,
        pdf: spec.pdf
      });
    }

    function paint() {
      var spec = getPdfCdf();
      var x1 = Math.min(state.x1, state.x2);
      var x2 = Math.max(state.x1, state.x2);
      state.x1 = x1; state.x2 = x2;

      el.querySelector('[data-out="x1"]').textContent = x1.toFixed(2);
      el.querySelector('[data-out="x2"]').textContent = x2.toFixed(2);

      var f1 = spec.cdf(x1);
      var f2 = spec.cdf(x2);
      var prob = Math.max(0, f2 - f1);

      var pTex = "P(" + x1.toFixed(2) + " \\le X \\le " + x2.toFixed(2) + ") = " + prob.toFixed(4) + " \\; (" + (prob * 100).toFixed(1) + "\\%)";
      var pPlain = "P(" + x1.toFixed(2) + " <= X <= " + x2.toFixed(2) + ") = " + prob.toFixed(4);
      var cTex = "F(" + x2.toFixed(2) + ") - F(" + x1.toFixed(2) + ") = " + f2.toFixed(4) + " - " + f1.toFixed(4) + " = " + prob.toFixed(4);
      var cPlain = "F(x2) - F(x1) = " + prob.toFixed(4);
      var mvTex = "E[X] = " + fmtStat(spec.mean) + ",\\quad \\mathrm{Var}(X) = " + fmtStat(spec.variance);
      var mvPlain = "E[X] = " + fmtStat(spec.mean) + ", Var(X) = " + fmtStat(spec.variance);

      setMath(el.querySelector("[data-prob-stat]"), el.querySelector("[data-prob-stat-sr]"), pTex, pPlain);
      setMath(el.querySelector("[data-cdf-stat]"), el.querySelector("[data-cdf-stat-sr]"), cTex, cPlain);
      setMath(el.querySelector("[data-mean-var]"), el.querySelector("[data-mean-var-sr]"), mvTex, mvPlain);

      drawChart();
    }

    buildParams();

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      if (ev.target.matches("[data-x1]")) state.x1 = readNum(ev.target);
      else if (ev.target.matches("[data-x2]")) state.x2 = readNum(ev.target);
      else if (ev.target.matches('[data-param="lambda"]')) state.expLambda = readNum(ev.target);
      else if (ev.target.matches('[data-param="unif_a"]')) state.unifA = readNum(ev.target);
      else if (ev.target.matches('[data-param="unif_b"]')) state.unifB = readNum(ev.target);
      else if (ev.target.matches('[data-param="norm_mu"]')) state.normMu = readNum(ev.target);
      else if (ev.target.matches('[data-param="norm_sig"]')) state.normSigma = readNum(ev.target);
      paint();
    });

    el.addEventListener("change", function (ev) {
      if (ev.target.matches("[data-pick-dist]")) {
        state.dist = ev.target.value;
        buildParams();
        var spec = getPdfCdf();
        var in1 = el.querySelector("[data-x1]");
        var in2 = el.querySelector("[data-x2]");
        in1.min = String(spec.x0.toFixed(1)); in1.max = String(spec.x1.toFixed(1));
        in2.min = String(spec.x0.toFixed(1)); in2.max = String(spec.x1.toFixed(1));
        state.x1 = spec.mean - Math.sqrt(spec.variance) * 0.5;
        state.x2 = spec.mean + Math.sqrt(spec.variance) * 0.5;
        in1.value = String(state.x1); in2.value = String(state.x2);
        paint();
      }
    });

    el.addEventListener("click", function (ev) {
      var preBtn = ev.target.closest("[data-preset]");
      if (!preBtn) return;
      var pr = preBtn.getAttribute("data-preset");
      var spec = getPdfCdf();
      var sd = Math.sqrt(spec.variance);
      if (pr === "sigma") {
        state.x1 = Math.max(spec.x0, spec.mean - sd);
        state.x2 = Math.min(spec.x1, spec.mean + sd);
      } else if (pr === "median") {
        state.x1 = spec.mean;
        state.x2 = spec.x1;
      }
      el.querySelector("[data-x1]").value = String(state.x1);
      el.querySelector("[data-x2]").value = String(state.x2);
      paint();
    });

    el.probRedraw = function() { drawChart(); };
    el.setAttribute("data-chart-live", "1");
    paint();
  }

  /* === 11. מעבדת התפלגות משותפת 3x3 (joint) === */
  function mountJoint(el) {
    var preset0 = attrEnum(el, "data-preset", ["independent", "positive", "negative", "uncorrelated"], "independent");

    var PRESETS = {
      independent: [
        [0.06, 0.12, 0.02],
        [0.15, 0.30, 0.05],
        [0.09, 0.18, 0.03]
      ],
      positive: [
        [0.25, 0.05, 0.00],
        [0.05, 0.30, 0.05],
        [0.00, 0.05, 0.25]
      ],
      negative: [
        [0.00, 0.05, 0.25],
        [0.05, 0.30, 0.05],
        [0.25, 0.05, 0.00]
      ],
      uncorrelated: [
        [0.00, 0.25, 0.00],
        [0.25, 0.00, 0.25],
        [0.00, 0.25, 0.00]
      ]
    };

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: התפלגות משותפת 3x3");
    el.innerHTML = headHtml("התפלגות משותפת, שוליות וקורלציה (Joint Distribution)", "מה לנסות כאן: ערכו את ההסתברויות בטבלה 3x3 או בחרו תבנית מוכנה. צפו בחישוב ההתפלגויות השוליות בשולי הטבלה, בתוחלת, בקו-וריאנס (Cov), במקדם המתאם (רו), ובבדיקה האם המשתנים בלתי תלויים.") +
      '<div class="prob-controls">' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-preset="independent" aria-pressed="' + (preset0 === "independent" ? "true" : "false") + '">בלתי תלויים</button>' +
      '<button type="button" class="prob-toggle" data-preset="positive" aria-pressed="' + (preset0 === "positive" ? "true" : "false") + '">מתואמים חיובית</button>' +
      '<button type="button" class="prob-toggle" data-preset="negative" aria-pressed="' + (preset0 === "negative" ? "true" : "false") + '">מתואמים שלילית</button>' +
      '<button type="button" class="prob-toggle" data-preset="uncorrelated" aria-pressed="' + (preset0 === "uncorrelated" ? "true" : "false") + '">תלויים ללא קורלציה (Cov=0)</button>' +
      '</div>' +
      '<label class="prob-field"><span class="prob-field-label">התניה עבור משתנה Y</span>' +
      '<select data-pick-cond aria-label="בחירת ערך Y להתניה">' +
      '<option value="1">Y = 1</option><option value="2">Y = 2</option><option value="3">Y = 3</option>' +
      '</select></label>' +
      '</div>' +
      '<table class="prob-joint-table" data-table aria-label="טבלת התפלגות משותפת של X ו-Y"></table>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("תוחלות E[X] ו־E[Y]", "means") +
      statHtml("שונות משותפת Cov(X,Y)", "cov-stat") +
      statHtml("מקדם מתאם פירסון ρ(X,Y)", "corr-stat") +
      '<div class="prob-stat prob-stat-wide"><span class="prob-k">בדיקת אי־תלות בין X ל־Y</span><div data-indep-badge style="font-weight:700;"></div></div>' +
      statHtml("תוחלת מותנית E[X | Y=y]", "cond-stat") +
      '</div>';

    var state = {
      grid: JSON.parse(JSON.stringify(PRESETS[preset0] || PRESETS.independent)),
      condY: 1
    };

    function paint() {
      var g = state.grid;
      var pX = [0, 0, 0];
      var pY = [0, 0, 0];
      var sumAll = 0;

      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          pX[r] += g[r][c];
          pY[c] += g[r][c];
          sumAll += g[r][c];
        }
      }

      // build table HTML
      var tbl = el.querySelector("[data-table]");
      var html = "<thead><tr><th>X \\ Y</th><th>Y = 1</th><th>Y = 2</th><th>Y = 3</th><th class=\"prob-joint-marginal\">P_X(x)</th></tr></thead><tbody>";
      for (var i = 0; i < 3; i++) {
        html += "<tr><th>X = " + (i + 1) + "</th>";
        for (var j = 0; j < 3; j++) {
          var pVal = g[i][j];
          var bgAlpha = Math.min(0.65, pVal * 1.5);
          html += '<td style="background:rgba(15,118,110,' + bgAlpha.toFixed(2) + ');"><input type="number" step="0.01" min="0" max="1" data-r="' + i + '" data-c="' + j + '" value="' + pVal.toFixed(2) + '" aria-label="הסתברות משותפת X=' + (i+1) + ' Y=' + (j+1) + '"></td>';
        }
        html += '<td class="prob-joint-marginal">' + pX[i].toFixed(2) + "</td></tr>";
      }
      html += "<tr><th class=\"prob-joint-marginal\">P_Y(y)</th>";
      for (var k = 0; k < 3; k++) html += '<td class="prob-joint-marginal">' + pY[k].toFixed(2) + "</td>";
      html += '<td class="prob-joint-marginal" style="font-weight:900;">Σ=' + sumAll.toFixed(2) + "</td></tr></tbody>";
      tbl.innerHTML = html;

      // Moments
      var eX = 0; var eX2 = 0;
      for (var x = 1; x <= 3; x++) { eX += x * pX[x - 1]; eX2 += x * x * pX[x - 1]; }
      var varX = Math.max(0, eX2 - eX * eX); var sdX = Math.sqrt(varX);

      var eY = 0; var eY2 = 0;
      for (var y = 1; y <= 3; y++) { eY += y * pY[y - 1]; eY2 += y * y * pY[y - 1]; }
      var varY = Math.max(0, eY2 - eY * eY); var sdY = Math.sqrt(varY);

      var eXY = 0;
      for (var rx = 0; rx < 3; rx++) {
        for (var cy = 0; cy < 3; cy++) {
          eXY += (rx + 1) * (cy + 1) * g[rx][cy];
        }
      }
      var cov = eXY - (eX * eY);
      var corr = (sdX > 0 && sdY > 0) ? (cov / (sdX * sdY)) : 0;
      corr = clamp(corr, -1, 1);

      // Independence check
      var isIndep = true;
      for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
          if (Math.abs(g[a][b] - pX[a] * pY[b]) > 0.015) isIndep = false;
        }
      }

      // Conditional E[X | Y = y0]
      var yIdx = state.condY - 1;
      var denomY = pY[yIdx];
      var condEx = 0;
      if (denomY > 0) {
        for (var xx = 0; xx < 3; xx++) {
          condEx += (xx + 1) * (g[xx][yIdx] / denomY);
        }
      }

      var meansTex = "E[X] = " + eX.toFixed(2) + ",\\quad E[Y] = " + eY.toFixed(2);
      var covTex = "\\mathrm{Cov}(X,Y) = E[XY]-E[X]E[Y] = " + cov.toFixed(3);
      var corrTex = "\\rho(X,Y) = \\frac{\\mathrm{Cov}(X,Y)}{\\sigma_X \\sigma_Y} = " + corr.toFixed(3);
      var condTex = "E[X | Y=" + state.condY + "] = " + condEx.toFixed(2);

      setMath(el.querySelector("[data-means]"), el.querySelector("[data-means-sr]"), meansTex, "E[X]=" + eX.toFixed(2) + ", E[Y]=" + eY.toFixed(2));
      setMath(el.querySelector("[data-cov-stat]"), el.querySelector("[data-cov-stat-sr]"), covTex, "Cov=" + cov.toFixed(3));
      setMath(el.querySelector("[data-corr-stat]"), el.querySelector("[data-corr-stat-sr]"), corrTex, "rho=" + corr.toFixed(3));
      setMath(el.querySelector("[data-cond-stat]"), el.querySelector("[data-cond-stat-sr]"), condTex, "E[X|Y=" + state.condY + "]=" + condEx.toFixed(2));

      var badgeBox = el.querySelector("[data-indep-badge]");
      if (isIndep) {
        badgeBox.innerHTML = '<span class="prob-badge prob-badge-ok">בלתי תלויים ✓</span> לכל זוג (x,y) מתקיים P(X=x,Y=y) = P_X(x)P_Y(y). מקדם המתאם הוא 0.';
      } else {
        badgeBox.innerHTML = '<span class="prob-badge prob-badge-bad">תלויים ✗</span> קיים תא שבו ההסתברות המשותפת אינה שווה למכפלת השוליות. (שימו לב: ייתכן מתאם 0 גם כשיש תלות!).';
      }
    }

    el.addEventListener("change", function (ev) {
      if (ev.target.matches("input[data-r]")) {
        var r = Number(ev.target.getAttribute("data-r"));
        var c = Number(ev.target.getAttribute("data-c"));
        var val = clamp(Number(ev.target.value) || 0, 0, 1);
        state.grid[r][c] = val;
        paint();
      } else if (ev.target.matches("[data-pick-cond]")) {
        state.condY = Number(ev.target.value);
        paint();
      }
    });

    el.addEventListener("click", function (ev) {
      var preBtn = ev.target.closest("[data-preset]");
      if (!preBtn) return;
      var pr = preBtn.getAttribute("data-preset");
      if (PRESETS[pr]) {
        state.grid = JSON.parse(JSON.stringify(PRESETS[pr]));
        var allPre = el.querySelectorAll("[data-preset]");
        for (var i = 0; i < allPre.length; i++) allPre[i].setAttribute("aria-pressed", allPre[i] === preBtn ? "true" : "false");
        paint();
      }
    });

    paint();
  }

  /* === 12. מעבדת סכום משתנים וקונבולוציה (conv) === */
  function mountConv(el) {
    var dx0 = attrEnum(el, "data-dist-x", ["die", "binom", "bernoulli", "poisson", "uniform"], "die");
    var dy0 = attrEnum(el, "data-dist-y", ["die", "binom", "bernoulli", "poisson", "uniform"], "die");

    var DIST_SPEC = {
      die: { name: "קובייה הוגנת (1-6)", pmf: { 1:1/6, 2:1/6, 3:1/6, 4:1/6, 5:1/6, 6:1/6 } },
      binom: { name: "בינומי B(4, 0.5)", pmf: { 0:0.0625, 1:0.25, 2:0.375, 3:0.25, 4:0.0625 } },
      bernoulli: { name: "ברנולי p=0.6", pmf: { 0:0.4, 1:0.6 } },
      poisson: { name: "פואסון קטום λ=2", pmf: { 0:0.135, 1:0.271, 2:0.271, 3:0.180, 4:0.090, 5:0.036 } },
      uniform: { name: "אחיד בדיד (0-3)", pmf: { 0:0.25, 1:0.25, 2:0.25, 3:0.25 } }
    };

    function makeOptions(sel) {
      var s = "";
      for (var k in DIST_SPEC) s += '<option value="' + k + '"' + (k === sel ? " selected" : "") + '>' + DIST_SPEC[k].name + '</option>';
      return s;
    }

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: סכום משתנים וקונבולוציה");
    el.innerHTML = headHtml("סכום משתנים מקריים וקונבולוציה (Convolution)", "מה לנסות כאן: בחרו התפלגות עבור X ועבור Y. צפו כיצד התפלגות הסכום S = X + Y מחושבת מקונבולוציה של שתי ההתפלגויות, והזיזו את סליידר הסכום s כדי לראות אילו זוגות (x, y) מרכיבים אותו.") +
      '<div class="prob-controls">' +
      '<label class="prob-field"><span class="prob-field-label">משתנה מקרי X</span>' +
      '<select data-pick-x aria-label="בחירת התפלגות X">' + makeOptions(dx0) + '</select></label>' +
      '<label class="prob-field"><span class="prob-field-label">משתנה מקרי Y</span>' +
      '<select data-pick-y aria-label="בחירת התפלגות Y">' + makeOptions(dy0) + '</select></label>' +
      '<label class="prob-field prob-span"><span class="prob-field-top"><span class="prob-field-label">סכום יעד לבחינה s</span><output data-out-s></output></span>' +
      '<input type="range" data-s min="0" max="12" step="1" value="7" aria-label="סכום יעד s"></label>' +
      '</div>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="התפלגות הסכום S=X+Y"></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("לינאריות התוחלת E[X + Y]", "mean-sum") +
      statHtml("שונות הסכום Var(X + Y)", "var-sum") +
      statHtml("הסתברות הסכום שנבחר P(S = s)", "prob-s") +
      '<div class="prob-stat prob-stat-wide"><span class="prob-k">פירוק הסכום הנבחר לזוגות (x, y)</span><div data-pairs style="font-family:monospace;direction:ltr;text-align:left;font-size:0.92rem;"></div></div>' +
      '</div>';

    var state = { distX: dx0, distY: dy0, targetS: 7 };

    function convolve(pX, pY) {
      var pS = {};
      for (var x in pX) {
        for (var y in pY) {
          var s = Number(x) + Number(y);
          pS[s] = (pS[s] || 0) + pX[x] * pY[y];
        }
      }
      return pS;
    }

    function getStats(pmf) {
      var mean = 0; var e2 = 0;
      for (var k in pmf) {
        var kv = Number(k);
        mean += kv * pmf[k];
        e2 += kv * kv * pmf[k];
      }
      return { mean: mean, variance: Math.max(0, e2 - mean * mean) };
    }

    function paint() {
      var pX = DIST_SPEC[state.distX].pmf;
      var pY = DIST_SPEC[state.distY].pmf;
      var pS = convolve(pX, pY);

      var sKeys = Object.keys(pS).map(Number).sort(function(a,b){return a-b;});
      var sMin = sKeys[0]; var sMax = sKeys[sKeys.length - 1];
      var sInput = el.querySelector("[data-s]");
      sInput.min = String(sMin); sInput.max = String(sMax);
      state.targetS = clamp(state.targetS, sMin, sMax);
      sInput.value = String(state.targetS);
      el.querySelector("[data-out-s]").textContent = String(state.targetS);

      var statsX = getStats(pX);
      var statsY = getStats(pY);
      var statsS = getStats(pS);

      // render chart
      var pts = [];
      for (var i = 0; i < sKeys.length; i++) {
        var sk = sKeys[i];
        pts.push({ k: sk, p: pS[sk] });
      }
      drawDiscrete(el.querySelector("[data-chart]"), pts, state.targetS);

      var mTex = "E[X+Y] = E[X] + E[Y] = " + statsX.mean.toFixed(2) + " + " + statsY.mean.toFixed(2) + " = " + statsS.mean.toFixed(2);
      var vTex = "\\mathrm{Var}(X+Y) = \\mathrm{Var}(X) + \\mathrm{Var}(Y) = " + statsX.variance.toFixed(2) + " + " + statsY.variance.toFixed(2) + " = " + statsS.variance.toFixed(2);
      var psVal = pS[state.targetS] || 0;
      var psTex = "P(S = " + state.targetS + ") = " + psVal.toFixed(4);

      setMath(el.querySelector("[data-mean-sum]"), el.querySelector("[data-mean-sum-sr]"), mTex, "E[X+Y]=" + statsS.mean.toFixed(2));
      setMath(el.querySelector("[data-var-sum]"), el.querySelector("[data-var-sum-sr]"), vTex, "Var=" + statsS.variance.toFixed(2));
      setMath(el.querySelector("[data-prob-s]"), el.querySelector("[data-prob-s-sr]"), psTex, "P(S=" + state.targetS + ")=" + psVal.toFixed(4));

      // pairs breakdown
      var pairList = [];
      for (var x in pX) {
        var needY = state.targetS - Number(x);
        if (pY[needY] != null) {
          var term = (pX[x] * pY[needY]).toFixed(4);
          pairList.push("P(X=" + x + ",Y=" + needY + ") = " + term);
        }
      }
      el.querySelector("[data-pairs]").textContent = pairList.join("  +  ") || "אין זוגות מתאימים לסכום זה";
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      state.targetS = readNum(el.querySelector("[data-s]"));
      paint();
    });

    el.addEventListener("change", function (ev) {
      if (ev.target.matches("[data-pick-x]")) {
        state.distX = ev.target.value;
        paint();
      } else if (ev.target.matches("[data-pick-y]")) {
        state.distY = ev.target.value;
        paint();
      }
    });

    el.probRedraw = function() { paint(); };
    el.setAttribute("data-chart-live", "1");
    paint();
  }

  /* === 13. מעבדת תוחלת מותנית וחוק התוחלת השלמה (condexp) === */
  function mountCondExp(el) {
    var ex0 = attrEnum(el, "data-example", ["grades", "factory", "service"], "grades");

    var EXAMPLES = {
      grades: {
        title: "ציונים לפי חוגי לימוד",
        groups: ["מדעי המחשב", "הנדסה", "מדעים מדויקים"],
        weights: [0.45, 0.35, 0.20],
        means: [84, 76, 80],
        vars: [64, 49, 81]
      },
      factory: {
        title: "תפוקת ייצור לפי סוג קו",
        groups: ["קו רובוטי חדיש", "קו סטנדרטי", "קו ישן ידני"],
        weights: [0.50, 0.30, 0.20],
        means: [120, 95, 70],
        vars: [100, 64, 144]
      },
      service: {
        title: "זמן שירות (בדקות) לפי סוג פנייה",
        groups: ["בירור חשבון פשוט", "תמיכה טכנית", "תלונה מורכבת"],
        weights: [0.60, 0.25, 0.15],
        means: [4, 12, 25],
        vars: [4, 16, 36]
      }
    };

    var exOpts = "";
    for (var k in EXAMPLES) {
      exOpts += '<option value="' + k + '"' + (k === ex0 ? " selected" : "") + '>' + EXAMPLES[k].title + '</option>';
    }

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: תוחלת מותנית וחוק התוחלת השלמה");
    el.innerHTML = headHtml("תוחלת מותנית וחוק התוחלת השלמה (Conditional Expectation)", "מה לנסות כאן: שנו את משקל הקבוצות P(Y=y) ואת הממוצעים והשונות בכל קבוצה. שימו לב כיצד חוק התוחלת השלמה E[X] = E[E[X|Y]] משקלל את הממוצעים, וכיצד השונות הכוללת מתפרקת לחלק שבתוך הקבוצות ולחלק שבין הקבוצות.") +
      '<div class="prob-controls">' +
      '<label class="prob-field prob-span"><span class="prob-field-label">תרחיש לדוגמה</span>' +
      '<select data-pick-ex aria-label="בחירת תרחיש">' + exOpts + '</select></label>' +
      '<div class="prob-params" data-params style="grid-column:1/-1;"></div>' +
      '</div>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="המחשה של תוחלת שלמה ושונות שלמה"></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("חוק התוחלת השלמה E[X] = E[E[X|Y]]", "tot-mean") +
      statHtml("שונות ממוצעת בתוך הקבוצות E[Var(X|Y)]", "within-var") +
      statHtml("שונות בין ממוצעי הקבוצות Var(E[X|Y])", "between-var") +
      statHtml("סך השונות הכוללת Var(X)", "tot-var") +
      '</div>';

    var curEx = EXAMPLES[ex0];
    var state = {
      weights: curEx.weights.slice(),
      means: curEx.means.slice(),
      vars: curEx.vars.slice(),
      names: curEx.groups.slice()
    };

    function buildFields() {
      var box = el.querySelector("[data-params]");
      var html = "";
      for (var i = 0; i < 3; i++) {
        var gName = state.names[i];
        html += '<div class="prob-wizard-box"><strong style="color:var(--ink);">קבוצה ' + (i + 1) + ': ' + gName + '</strong>' +
          '<div class="prob-controls">' +
          '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">משקל P(Y=' + (i+1) + ')</span><output data-out-w="' + i + '">' + state.weights[i].toFixed(2) + '</output></span>' +
          '<input type="range" data-w-idx="' + i + '" min="0.05" max="0.90" step="0.05" value="' + state.weights[i] + '"></label>' +
          '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">ממוצע E[X|Y=' + (i+1) + ']</span><output data-out-m="' + i + '">' + state.means[i] + '</output></span>' +
          '<input type="range" data-m-idx="' + i + '" min="10" max="150" step="1" value="' + state.means[i] + '"></label>' +
          '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">שונות Var(X|Y=' + (i+1) + ')</span><output data-out-v="' + i + '">' + state.vars[i] + '</output></span>' +
          '<input type="range" data-v-idx="' + i + '" min="1" max="200" step="1" value="' + state.vars[i] + '"></label>' +
          '</div></div>';
      }
      box.innerHTML = html;
    }

    function drawBalance(totMean) {
      var host = el.querySelector("[data-chart]");
      var w = 500; var h = 210;
      var svg = '<svg class="prob-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="דיאגרמת מאזן תוחלת שלמה">';

      var colors = ["var(--accent)", "#2563eb", "#d97706"];
      var startX = 30; var totalW = 440;
      var maxM = Math.max.apply(null, state.means.concat([totMean])) * 1.15;
      if (maxM <= 0) maxM = 100;

      var curX = startX;
      for (var i = 0; i < 3; i++) {
        var barW = totalW * state.weights[i];
        var barH = (state.means[i] / maxM) * 120;
        var barY = 160 - barH;
        svg += '<rect x="' + curX.toFixed(1) + '" y="' + barY.toFixed(1) + '" width="' + (barW - 3).toFixed(1) + '" height="' + barH.toFixed(1) + '" fill="' + colors[i] + '" rx="4" opacity="0.85"></rect>';
        svg += '<text x="' + (curX + barW / 2).toFixed(1) + '" y="' + (barY - 6).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700">μ_' + (i+1) + '=' + state.means[i] + '</text>';
        svg += '<text x="' + (curX + barW / 2).toFixed(1) + '" y="178" text-anchor="middle" font-size="10" font-weight="600" fill="var(--muted)">' + (state.weights[i] * 100).toFixed(0) + '%</text>';
        curX += barW;
      }

      // Baseline
      svg += '<line x1="20" y1="160" x2="480" y2="160" stroke="var(--ink)" stroke-width="1.5"></line>';

      // Total mean horizontal dashed line
      var totY = 160 - (totMean / maxM) * 120;
      svg += '<line x1="20" y1="' + totY.toFixed(1) + '" x2="480" y2="' + totY.toFixed(1) + '" stroke="var(--bad)" stroke-width="2" stroke-dasharray="4 3"></line>';
      svg += '<text x="475" y="' + (totY - 6).toFixed(1) + '" text-anchor="end" font-weight="800" fill="var(--bad)">E[X] = ' + totMean.toFixed(2) + ' (תוחלת משוקללת)</text>';

      svg += '</svg>';
      host.innerHTML = svg;
    }

    function paint() {
      // Normalize weights sum to 1
      var sumW = state.weights[0] + state.weights[1] + state.weights[2];
      if (sumW <= 0) sumW = 1;
      for (var i = 0; i < 3; i++) {
        state.weights[i] = Math.round((state.weights[i] / sumW) * 100) / 100;
        var wEl = el.querySelector('[data-out-w="' + i + '"]');
        var mEl = el.querySelector('[data-out-m="' + i + '"]');
        var vEl = el.querySelector('[data-out-v="' + i + '"]');
        if (wEl) wEl.textContent = state.weights[i].toFixed(2);
        if (mEl) mEl.textContent = String(state.means[i]);
        if (vEl) vEl.textContent = String(state.vars[i]);
      }

      // Total expectation
      var totMean = 0;
      for (var j = 0; j < 3; j++) totMean += state.weights[j] * state.means[j];

      // Law of total variance
      // Within group: E[Var(X|Y)] = sum(P(Y=y) * Var(X|Y=y))
      var withinVar = 0;
      for (var k = 0; k < 3; k++) withinVar += state.weights[k] * state.vars[k];

      // Between group: Var(E[X|Y]) = sum(P(Y=y) * (E[X|Y=y] - E[X])^2)
      var betweenVar = 0;
      for (var m = 0; m < 3; m++) {
        var diff = state.means[m] - totMean;
        betweenVar += state.weights[m] * diff * diff;
      }
      var totVar = withinVar + betweenVar;

      var tmTex = "E[X] = \\sum_{y} E[X|Y=y]P(Y=y) = " + totMean.toFixed(2);
      var wvTex = "E[\\mathrm{Var}(X|Y)] = " + withinVar.toFixed(2);
      var bvTex = "\\mathrm{Var}(E[X|Y]) = " + betweenVar.toFixed(2);
      var tvTex = "\\mathrm{Var}(X) = " + withinVar.toFixed(2) + " + " + betweenVar.toFixed(2) + " = " + totVar.toFixed(2);

      setMath(el.querySelector("[data-tot-mean]"), el.querySelector("[data-tot-mean-sr]"), tmTex, "E[X]=" + totMean.toFixed(2));
      setMath(el.querySelector("[data-within-var]"), el.querySelector("[data-within-var-sr]"), wvTex, "Within=" + withinVar.toFixed(2));
      setMath(el.querySelector("[data-between-var]"), el.querySelector("[data-between-var-sr]"), bvTex, "Between=" + betweenVar.toFixed(2));
      setMath(el.querySelector("[data-tot-var]"), el.querySelector("[data-tot-var-sr]"), tvTex, "TotVar=" + totVar.toFixed(2));

      drawBalance(totMean);
    }

    buildFields();

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      if (ev.target.hasAttribute("data-w-idx")) {
        var wi = Number(ev.target.getAttribute("data-w-idx"));
        state.weights[wi] = readNum(ev.target);
      } else if (ev.target.hasAttribute("data-m-idx")) {
        var mi = Number(ev.target.getAttribute("data-m-idx"));
        state.means[mi] = readNum(ev.target);
      } else if (ev.target.hasAttribute("data-v-idx")) {
        var vi = Number(ev.target.getAttribute("data-v-idx"));
        state.vars[vi] = readNum(ev.target);
      }
      paint();
    });

    el.addEventListener("change", function (ev) {
      if (ev.target.matches("[data-pick-ex]")) {
        var ex = EXAMPLES[ev.target.value];
        state.weights = ex.weights.slice();
        state.means = ex.means.slice();
        state.vars = ex.vars.slice();
        state.names = ex.groups.slice();
        buildFields();
        paint();
      }
    });

    el.probRedraw = function() { paint(); };
    el.setAttribute("data-chart-live", "1");
    paint();
  }

  /* === 14. מעבדת אי־שוויונות מרקוב וצ'בישב (ineq) === */
  function mountIneq(el) {
    var dist0 = attrEnum(el, "data-dist", ["exponential", "binomial", "poisson", "uniform"], "exponential");
    var bound0 = attrEnum(el, "data-bound", ["markov", "chebyshev"], "markov");
    var cut0 = attrNum(el, "data-cutoff", 3.0);

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: אי־שוויונות מרקוב וצ'בישב");
    el.innerHTML = headHtml("אי־שוויונות מרקוב וצ'בישב (Markov & Chebyshev)", "מה לנסות כאן: בחרו התפלגות וסף חסימה. השוו את ההסתברות האמיתית של הזנב לחסם מרקוב ולחסם צ'בישב, וראו עד כמה החסם שמרני ומתי הוא הופך לטריוויאלי (גדול מ-1).") +
      '<div class="prob-controls">' +
      '<label class="prob-field"><span class="prob-field-label">התפלגות מקורית</span>' +
      '<select data-pick-dist aria-label="בחירת התפלגות">' +
      '<option value="exponential"' + (dist0 === "exponential" ? " selected" : "") + '>מעריכית Exp(λ=0.5)</option>' +
      '<option value="binomial"' + (dist0 === "binomial" ? " selected" : "") + '>בינומית B(20, 0.5)</option>' +
      '<option value="poisson"' + (dist0 === "poisson" ? " selected" : "") + '>פואסון Pois(λ=4)</option>' +
      '<option value="uniform"' + (dist0 === "uniform" ? " selected" : "") + '>אחידה רציפה U(0, 10)</option>' +
      '</select></label>' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-bound="markov" aria-pressed="' + (bound0 === "markov" ? "true" : "false") + '">חסם מרקוב: P(X ≥ a) ≤ E[X] / a</button>' +
      '<button type="button" class="prob-toggle" data-bound="chebyshev" aria-pressed="' + (bound0 === "chebyshev" ? "true" : "false") + '">חסם צ׳בישב: P(|X - μ| ≥ kσ) ≤ 1 / k²</button>' +
      '</div>' +
      '<label class="prob-field prob-span"><span class="prob-field-top"><span class="prob-field-label" data-cut-label>סף a למרקוב</span><output data-out-cut>' + cut0 + '</output></span>' +
      '<input type="range" data-cutoff min="1" max="15" step="0.5" value="' + cut0 + '" aria-label="סף חסימה"></label>' +
      '</div>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="התפלגות וזנב"></div>' +
      '<div class="prob-bar-compare">' +
      '<div class="prob-bar-compare-row"><span class="prob-bar-compare-label">הסתברות אמיתית:</span><div class="prob-bar-track"><div class="prob-bar-fill true-prob" data-bar-true></div></div><span class="prob-bar-val" data-val-true></span></div>' +
      '<div class="prob-bar-compare-row"><span class="prob-bar-compare-label">חסם תיאורטי:</span><div class="prob-bar-track"><div class="prob-bar-fill bound-prob" data-bar-bound></div></div><span class="prob-bar-val" data-val-bound></span></div>' +
      '</div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("תוחלת ושונות", "stat-mv") +
      statHtml("הסתברות הזנב האמיתית", "stat-true") +
      statHtml("ערך החסם התיאורטי", "stat-bound") +
      statHtml("פי כמה החסם שמרני", "stat-ratio") +
      '</div>';

    var state = { dist: dist0, bound: bound0, cutoff: cut0 };

    function getDistModel() {
      var d = state.dist;
      if (d === "exponential") {
        var l = 0.5;
        return {
          discrete: false, mean: 1/l, variance: 1/(l*l),
          pdf: function(x) { return expPdf(x, l); },
          tailGe: function(a) { return a <= 0 ? 1 : Math.exp(-l * a); },
          tailDev: function(eps) {
            var mu = 1/l;
            var pLo = (mu - eps > 0) ? (1 - Math.exp(-l * (mu - eps))) : 0;
            var pHi = Math.exp(-l * (mu + eps));
            return pLo + pHi;
          },
          x0: 0, x1: 12, yMax: 0.55
        };
      } else if (d === "binomial") {
        var n = 20; var p = 0.5;
        return {
          discrete: true, mean: n*p, variance: n*p*(1-p),
          pts: (function() {
            var arr = []; for (var i = 0; i <= n; i++) arr.push({ k: i, p: binomPmf(i, n, p) });
            return arr;
          })(),
          tailGe: function(a) {
            var s = 0; for (var i = Math.ceil(a); i <= n; i++) s += binomPmf(i, n, p);
            return s;
          },
          tailDev: function(eps) {
            var mu = n*p; var s = 0;
            for (var i = 0; i <= n; i++) if (Math.abs(i - mu) >= eps) s += binomPmf(i, n, p);
            return s;
          }
        };
      } else if (d === "poisson") {
        var lam = 4;
        return {
          discrete: true, mean: lam, variance: lam,
          pts: (function() {
            var arr = []; for (var i = 0; i <= 14; i++) arr.push({ k: i, p: poissonPmf(i, lam) });
            return arr;
          })(),
          tailGe: function(a) {
            var s = 0; for (var i = Math.ceil(a); i <= 30; i++) s += poissonPmf(i, lam);
            return s;
          },
          tailDev: function(eps) {
            var mu = lam; var s = 0;
            for (var i = 0; i <= 30; i++) if (Math.abs(i - mu) >= eps) s += poissonPmf(i, lam);
            return s;
          }
        };
      } else {
        // uniform [0, 10]
        return {
          discrete: false, mean: 5, variance: 100/12,
          pdf: function(x) { return uniformPdf(x, 0, 10); },
          tailGe: function(a) { if (a <= 0) return 1; if (a >= 10) return 0; return (10 - a) / 10; },
          tailDev: function(eps) {
            var left = Math.max(0, 5 - eps);
            var right = Math.max(0, 10 - (5 + eps));
            return (left + right) / 10;
          },
          x0: 0, x1: 10, yMax: 0.15
        };
      }
    }

    function paint() {
      var mod = getDistModel();
      var isMarkov = state.bound === "markov";
      var cutIn = el.querySelector("[data-cutoff]");
      var cutLabel = el.querySelector("[data-cut-label]");

      if (isMarkov) {
        cutLabel.textContent = "סף a למרקוב (P(X ≥ a))";
        cutIn.min = "1"; cutIn.max = String(Math.round(mod.mean * 3)); cutIn.step = "0.5";
      } else {
        cutLabel.textContent = "מכפיל k לסטיית תקן (P(|X-μ| ≥ kσ))";
        cutIn.min = "1.0"; cutIn.max = "4.0"; cutIn.step = "0.1";
      }
      state.cutoff = clamp(state.cutoff, Number(cutIn.min), Number(cutIn.max));
      cutIn.value = String(state.cutoff);
      el.querySelector('[data-out-cut]').textContent = state.cutoff.toFixed(1);

      var trueP = 0; var boundP = 0;
      var formulaTex = ""; var boundFormulaTex = "";
      var sd = Math.sqrt(mod.variance);

      if (isMarkov) {
        var a = state.cutoff;
        trueP = mod.tailGe(a);
        boundP = mod.mean / a;
        formulaTex = "P(X \\ge " + a + ") = " + trueP.toFixed(4);
        boundFormulaTex = "\\frac{E[X]}{a} = \\frac{" + mod.mean.toFixed(2) + "}{" + a + "} = " + boundP.toFixed(4);
      } else {
        var kMul = state.cutoff;
        var eps = kMul * sd;
        trueP = mod.tailDev(eps);
        boundP = 1 / (kMul * kMul);
        formulaTex = "P(|X - \\mu| \\ge " + kMul.toFixed(1) + "\\sigma) = " + trueP.toFixed(4);
        boundFormulaTex = "\\frac{1}{k^2} = \\frac{1}{" + (kMul * kMul).toFixed(2) + "} = " + boundP.toFixed(4);
      }

      // Chart
      var chartHost = el.querySelector("[data-chart]");
      if (mod.discrete) {
        drawDiscrete(chartHost, mod.pts, isMarkov ? state.cutoff : Math.round(mod.mean));
      } else {
        drawCurveChart(chartHost, {
          x0: mod.x0, x1: mod.x1, yMax: mod.yMax,
          shadeLo: isMarkov ? state.cutoff : Math.max(mod.x0, mod.mean + state.cutoff * sd),
          shadeHi: mod.x1,
          mark: mod.mean,
          pdf: mod.pdf
        });
      }

      // Comparison progress bars
      var barTrue = el.querySelector("[data-bar-true]");
      var barBound = el.querySelector("[data-bar-bound]");
      var clampTrue = clamp(trueP, 0, 1);
      var clampBound = clamp(boundP, 0, 1);
      barTrue.style.width = (clampTrue * 100).toFixed(1) + "%";
      barBound.style.width = (clampBound * 100).toFixed(1) + "%";
      el.querySelector("[data-val-true]").textContent = (trueP * 100).toFixed(1) + "%";
      el.querySelector("[data-val-bound]").textContent = boundP > 1 ? "> 100% (טריוויאלי)" : (boundP * 100).toFixed(1) + "%";

      var ratio = (trueP > 0) ? (boundP / trueP).toFixed(1) : "—";
      var mvTex = "E[X] = " + mod.mean.toFixed(2) + ",\\quad \\sigma = " + sd.toFixed(2);
      var ratioTex = "\\text{החסם גדול פי } " + ratio + " \\text{ מההסתברות האמיתית}";

      setMath(el.querySelector("[data-stat-mv]"), el.querySelector("[data-stat-mv-sr]"), mvTex, "E=" + mod.mean.toFixed(2) + ", sd=" + sd.toFixed(2));
      setMath(el.querySelector("[data-stat-true]"), el.querySelector("[data-stat-true-sr]"), formulaTex, "True=" + trueP.toFixed(4));
      setMath(el.querySelector("[data-stat-bound]"), el.querySelector("[data-stat-bound-sr]"), boundFormulaTex, "Bound=" + boundP.toFixed(4));
      setMath(el.querySelector("[data-stat-ratio]"), el.querySelector("[data-stat-ratio-sr]"), ratioTex, "Ratio=" + ratio);
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      state.cutoff = readNum(el.querySelector("[data-cutoff]"));
      paint();
    });

    el.addEventListener("change", function (ev) {
      if (ev.target.matches("[data-pick-dist]")) {
        state.dist = ev.target.value;
        paint();
      }
    });

    el.addEventListener("click", function (ev) {
      var bBtn = ev.target.closest("[data-bound]");
      if (!bBtn) return;
      state.bound = bBtn.getAttribute("data-bound");
      el.querySelector('[data-bound="markov"]').setAttribute("aria-pressed", state.bound === "markov" ? "true" : "false");
      el.querySelector('[data-bound="chebyshev"]').setAttribute("aria-pressed", state.bound === "chebyshev" ? "true" : "false");
      paint();
    });

    el.probRedraw = function() { paint(); };
    el.setAttribute("data-chart-live", "1");
    paint();
  }

  /* === 15. מעבדת רווחי סמך (ci) === */
  function mountCi(el) {
    var level0 = attrNum(el, "data-level", 0.95);
    var n0 = clamp(Math.round(attrNum(el, "data-n", 30)), 5, 100);

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: רווחי סמך ודגימה חוזרת");
    el.innerHTML = headHtml("רווחי סמך והתכנסות (Confidence Intervals)", "מה לנסות כאן: שנו את רמת הסמך (90%, 95%, 99%) ואת גודל המדגם n, ולחצו על 'דגימה מחדש'. 100 רווחי סמך נדגמים במקביל: שימו לב לכמה מהם תופסים את התוחלת האמיתית (ירוק) וכמה מפספסים אותה (אדום).") +
      '<div class="prob-controls">' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-level="0.90" aria-pressed="' + (level0 === 0.90 ? "true" : "false") + '">רמת סמך 90% (z=1.645)</button>' +
      '<button type="button" class="prob-toggle" data-level="0.95" aria-pressed="' + (level0 === 0.95 ? "true" : "false") + '">רמת סמך 95% (z=1.960)</button>' +
      '<button type="button" class="prob-toggle" data-level="0.99" aria-pressed="' + (level0 === 0.99 ? "true" : "false") + '">רמת סמך 99% (z=2.576)</button>' +
      '</div>' +
      '<label class="prob-field prob-span"><span class="prob-field-top"><span class="prob-field-label">גודל מדגם n (מדגם גדול = רווח צר יותר)</span><output data-out-n>' + n0 + '</output></span>' +
      '<input type="range" data-n min="5" max="100" step="5" value="' + n0 + '" aria-label="גודל מדגם n"></label>' +
      '<div class="prob-actions"><button type="button" class="prob-btn" data-resample>דגימה מחדש של 100 רווחים</button></div>' +
      '</div>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="100 רווחי סמך מול התוחלת"></div>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("שיעור הכיסוי בפועל", "stat-cover") +
      statHtml("רמת סמך מבוקשת 1 - α", "stat-req") +
      statHtml("שגיאת דגימה מרבית E", "stat-margin") +
      '<div class="prob-stat prob-stat-wide"><span class="prob-k">משמעות המושג רמת סמך</span><p data-ci-meaning style="margin:0;font-size:0.9rem;line-height:1.45;">התוחלת האמיתית μ היא קבועה ולא מקרית. הרווח הוא המשתנה האקראי: ב־95% מכלל המדגמים האפשריים, הרווח שנחשב יכיל את התוחלת μ. ב־5% מהמקרים הרווח יפספס (מסומן באדום).</p></div>' +
      '</div>';

    var state = {
      level: level0,
      n: n0,
      mu: 100,
      sigma: 15,
      samples: []
    };

    function drawSamples() {
      var z = normalInv(1 - (1 - state.level) / 2);
      var se = state.sigma / Math.sqrt(state.n);
      var margin = z * se;
      var list = [];
      for (var i = 0; i < 100; i++) {
        var xBar = randNormal(state.mu, se);
        var lo = xBar - margin;
        var hi = xBar + margin;
        var hit = (state.mu >= lo && state.mu <= hi);
        list.push({ xBar: xBar, lo: lo, hi: hi, hit: hit });
      }
      state.samples = list;
    }

    function drawCiChart() {
      var host = el.querySelector("[data-chart]");
      var box = chartSize(host);
      var w = box.w; var h = 320;
      var padL = 46; var padR = 14; var padT = 16; var padB = 26;
      var innerW = Math.max(10, w - padL - padR);
      var innerH = Math.max(10, h - padT - padB);

      var mu = state.mu;
      var span = 3.5 * (state.sigma / Math.sqrt(state.n)) * normalInv(1 - (1 - state.level) / 2);
      span = Math.max(span, 12);
      var x0 = mu - span; var x1 = mu + span;

      function sx(x) { return padL + ((x - x0) / (x1 - x0)) * innerW; }
      function sy(idx) { return padT + (idx / 100) * innerH; }

      var svg = '<svg class="prob-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="100 רווחי סמך">';

      // Center true mu line
      var mx = sx(mu);
      svg += '<line class="prob-ci-target" x1="' + mx.toFixed(1) + '" y1="' + padT + '" x2="' + mx.toFixed(1) + '" y2="' + (padT + innerH) + '"></line>';
      svg += '<text class="prob-mu" x="' + mx.toFixed(1) + '" y="' + (padT - 4) + '" text-anchor="middle">μ = ' + mu + '</text>';

      for (var i = 0; i < state.samples.length; i++) {
        var s = state.samples[i];
        var y = sy(i);
        var xL = sx(s.lo); var xR = sx(s.hi); var xC = sx(s.xBar);
        var cls = s.hit ? "hit" : "miss";
        svg += '<line class="prob-ci-line ' + cls + '" x1="' + xL.toFixed(1) + '" y1="' + y.toFixed(1) + '" x2="' + xR.toFixed(1) + '" y2="' + y.toFixed(1) + '"></line>';
        svg += '<circle cx="' + xC.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.5" fill="var(--ink)"></circle>';
      }

      // X axis
      svg += '<line class="prob-axis" x1="' + padL + '" y1="' + (padT + innerH) + '" x2="' + (padL + innerW) + '" y2="' + (padT + innerH) + '"></line>';
      for (var t = 0; t <= 4; t++) {
        var xv = x0 + ((x1 - x0) * t) / 4;
        svg += '<text class="prob-tick" x="' + sx(xv).toFixed(1) + '" y="' + (h - 8) + '" text-anchor="middle">' + xv.toFixed(1) + '</text>';
      }
      svg += '</svg>';
      host.innerHTML = svg;
    }

    function paint() {
      el.querySelector('[data-out-n]').textContent = String(state.n);
      var z = normalInv(1 - (1 - state.level) / 2);
      var se = state.sigma / Math.sqrt(state.n);
      var margin = z * se;

      var hits = 0;
      for (var i = 0; i < state.samples.length; i++) if (state.samples[i].hit) hits++;

      var cTex = hits + " / 100 \\; (" + hits + "\\%)";
      var reqTex = ((state.level) * 100).toFixed(0) + "\\%";
      var mTex = "E = z_{1-\\alpha/2}\\frac{\\sigma}{\\sqrt{n}} = " + margin.toFixed(2);

      setMath(el.querySelector("[data-stat-cover]"), el.querySelector("[data-stat-cover-sr]"), cTex, hits + "%");
      setMath(el.querySelector("[data-stat-req]"), el.querySelector("[data-stat-req-sr]"), reqTex, (state.level*100) + "%");
      setMath(el.querySelector("[data-stat-margin]"), el.querySelector("[data-stat-margin-sr]"), mTex, "E=" + margin.toFixed(2));
      var meaningEl = el.querySelector("[data-ci-meaning]");
      if (meaningEl) {
        var pct = Math.round(state.level * 100);
        meaningEl.textContent = "התוחלת האמיתית μ היא קבועה ולא מקרית. הרווח הוא המשתנה האקראי: ב־" + pct + "% מכלל המדגמים האפשריים, הרווח שנחשב יכיל את התוחלת μ. ב־" + (100 - pct) + "% מהמקרים הרווח יפספס (מסומן באדום).";
      }

      drawCiChart();
    }

    drawSamples();

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      state.n = clamp(readNum(el.querySelector("[data-n]")), 5, 100);
      drawSamples();
      paint();
    });

    el.addEventListener("click", function (ev) {
      var lvlBtn = ev.target.closest("[data-level]");
      if (lvlBtn) {
        state.level = Number(lvlBtn.getAttribute("data-level"));
        var allL = el.querySelectorAll("[data-level]");
        for (var i = 0; i < allL.length; i++) allL[i].setAttribute("aria-pressed", allL[i] === lvlBtn ? "true" : "false");
        drawSamples();
        paint();
        return;
      }
      if (ev.target.closest("[data-resample]")) {
        drawSamples();
        paint();
      }
    });

    el.probRedraw = function() { drawCiChart(); };
    el.setAttribute("data-chart-live", "1");
    paint();
  }

  /* === 16. מעבדת בדיקת השערות (htest) === */
  function mountHTest(el) {
    var mu0_0 = attrNum(el, "data-mu0", 100);
    var mu1_0 = attrNum(el, "data-mu1", 106);
    var alpha0 = attrNum(el, "data-alpha", 0.05);
    var n0 = clamp(Math.round(attrNum(el, "data-n", 25)), 5, 100);

    el.setAttribute("role", "group");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "מעבדה: בדיקת השערות, p-value ועוצמת המבחן");
    el.innerHTML = headHtml("בדיקת השערות, p-value ועוצמת המבחן (Hypothesis Testing)", "מה לנסות כאן: שנו את רמת המובהקות אלפא, את גודל המדגם n ואת התוחלת החלופית. צפו בחלוקה בין שגיאה מסוג I (אלפא), שגיאה מסוג II (בטא) ועוצמת המבחן (1 מינוס בטא), והזיזו את הממוצע שנמדד כדי לבחון את ה-p-value וההחלטה.") +
      '<div class="prob-controls">' +
      '<div class="prob-btn-group prob-span">' +
      '<button type="button" class="prob-toggle" data-alpha="0.01" aria-pressed="' + (alpha0 === 0.01 ? "true" : "false") + '">רמת מובהקות α = 0.01</button>' +
      '<button type="button" class="prob-toggle" data-alpha="0.05" aria-pressed="' + (alpha0 === 0.05 ? "true" : "false") + '">רמת מובהקות α = 0.05</button>' +
      '<button type="button" class="prob-toggle" data-alpha="0.10" aria-pressed="' + (alpha0 === 0.10 ? "true" : "false") + '">רמת מובהקות α = 0.10</button>' +
      '</div>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">גודל מדגם n</span><output data-out-n>' + n0 + '</output></span>' +
      '<input type="range" data-n min="5" max="100" step="5" value="' + n0 + '" aria-label="גודל מדגם n"></label>' +
      '<label class="prob-field"><span class="prob-field-top"><span class="prob-field-label">תוחלת חלופית μ_1 (H_1)</span><output data-out-mu1>' + mu1_0 + '</output></span>' +
      '<input type="range" data-mu1 min="101" max="112" step="0.5" value="' + mu1_0 + '" aria-label="תוחלת חלופית"></label>' +
      '<label class="prob-field prob-span"><span class="prob-field-top"><span class="prob-field-label">ממוצע מדגם נמדד X̄</span><output data-out-xbar>104.5</output></span>' +
      '<input type="range" data-xbar min="96" max="112" step="0.2" value="104.5" aria-label="ממוצע שנמדד במדגם"></label>' +
      '</div>' +
      '<div class="prob-chart" dir="ltr" role="img" data-chart aria-label="עקומות התפלגות תחת H0 ותחת H1"></div>' +
      '<ul class="prob-legend">' +
      '<li><i class="prob-swatch" style="background:var(--accent);"></i><span>H_0: μ = ' + mu0_0 + '</span></li>' +
      '<li><i class="prob-swatch" style="background:#2563eb;"></i><span>H_1: μ = <span data-leg-mu1></span></span></li>' +
      '<li><i class="prob-swatch fn"></i><span>שגיאה מסוג I (אזור דחייה α)</span></li>' +
      '<li><i class="prob-swatch" style="background:#2563eb;opacity:0.5;"></i><span>שגיאה מסוג II (בטא β)</span></li>' +
      '<li><i class="prob-swatch tp"></i><span>עוצמת המבחן (1 - β)</span></li>' +
      '</ul>' +
      '<div class="prob-readout" aria-live="polite" aria-atomic="true">' +
      statHtml("ערך קריטי לדחייה c", "stat-crit") +
      statHtml("p-value עבור הממוצע הנמדד", "stat-pval") +
      statHtml("שגיאה מסוג II (בטא β)", "stat-beta") +
      statHtml("עוצמת המבחן (Power = 1 - β)", "stat-power") +
      '<div class="prob-stat prob-stat-wide"><span class="prob-k">פסק דין המבחן הסטטיסטי</span><div data-verdict style="font-weight:700;"></div></div>' +
      '</div>';

    var state = {
      mu0: mu0_0,
      mu1: mu1_0,
      sigma: 15,
      alpha: alpha0,
      n: n0,
      xBar: 104.5
    };

    function drawDualCurves(cVal, pVal, betaVal) {
      var host = el.querySelector("[data-chart]");
      var box = chartSize(host);
      var w = box.w; var h = box.h;
      var padL = 46; var padR = 14; var padT = 16; var padB = 26;
      var innerW = Math.max(10, w - padL - padR);
      var innerH = Math.max(10, h - padT - padB);

      var se = state.sigma / Math.sqrt(state.n);
      var x0 = state.mu0 - 3.5 * se;
      var x1 = state.mu1 + 3.5 * se;
      var maxPdf = normalPdf(state.mu0, state.mu0, se) * 1.15;

      function sx(x) { return padL + ((x - x0) / (x1 - x0)) * innerW; }
      function sy(y) { return padT + innerH - (y / maxPdf) * innerH; }

      var svg = '<svg class="prob-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="עקומות H0 ו-H1">';

      // Shading alpha (H0 tail right of cVal)
      var alphaSteps = 24;
      var sAlpha = [];
      sAlpha.push("M" + sx(cVal).toFixed(1) + "," + sy(0).toFixed(1));
      for (var a = 0; a <= alphaSteps; a++) {
        var xa = cVal + ((x1 - cVal) * a) / alphaSteps;
        sAlpha.push("L" + sx(xa).toFixed(1) + "," + sy(normalPdf(xa, state.mu0, se)).toFixed(1));
      }
      sAlpha.push("L" + sx(x1).toFixed(1) + "," + sy(0).toFixed(1) + "Z");
      svg += '<path d="' + sAlpha.join("") + '" class="prob-shade-alpha"></path>';

      // Shading beta (H1 area left of cVal)
      var betaSteps = 24;
      var sBeta = [];
      sBeta.push("M" + sx(x0).toFixed(1) + "," + sy(0).toFixed(1));
      for (var b = 0; b <= betaSteps; b++) {
        var xb = x0 + ((cVal - x0) * b) / betaSteps;
        sBeta.push("L" + sx(xb).toFixed(1) + "," + sy(normalPdf(xb, state.mu1, se)).toFixed(1));
      }
      sBeta.push("L" + sx(cVal).toFixed(1) + "," + sy(0).toFixed(1) + "Z");
      svg += '<path d="' + sBeta.join("") + '" class="prob-shade-beta"></path>';

      // Curves
      var steps = 60;
      var d0 = []; var d1 = [];
      for (var i = 0; i <= steps; i++) {
        var x = x0 + ((x1 - x0) * i) / steps;
        d0.push((i === 0 ? "M" : "L") + sx(x).toFixed(1) + "," + sy(normalPdf(x, state.mu0, se)).toFixed(1));
        d1.push((i === 0 ? "M" : "L") + sx(x).toFixed(1) + "," + sy(normalPdf(x, state.mu1, se)).toFixed(1));
      }
      svg += '<path d="' + d0.join("") + '" class="prob-curve-h0"></path>';
      svg += '<path d="' + d1.join("") + '" class="prob-curve-h1"></path>';

      // Critical line cVal
      var cx = sx(cVal); var ox = sx(state.xBar); var distCO = Math.abs(ox - cx); var cY = distCO < 55 ? (padT - 2) : (padT + 12); var oY = distCO < 55 ? (padT + 16) : (padT + 14);
      svg += '<line class="prob-line-crit" x1="' + cx.toFixed(1) + '" y1="' + padT + '" x2="' + cx.toFixed(1) + '" y2="' + (padT + innerH) + '"></line>';
      svg += '<text x="' + (cx - 4).toFixed(1) + '" y="' + cY + '" text-anchor="end" font-size="11" font-weight="700" fill="var(--bad)">c = ' + cVal.toFixed(2) + '</text>';

      // Observed xBar marker
      // observed marker
      svg += '<line class="prob-line-obs" x1="' + ox.toFixed(1) + '" y1="' + (padT + 20) + '" x2="' + ox.toFixed(1) + '" y2="' + (padT + innerH) + '"></line>';
      svg += '<circle cx="' + ox.toFixed(1) + '" cy="' + (padT + 20) + '" r="4.5" fill="var(--ink)"></circle>';
      svg += '<text x="' + ox.toFixed(1) + '" y="' + oY + '" text-anchor="middle" font-size="11" font-weight="800">X̄ = ' + state.xBar.toFixed(1) + '</text>';

      // Axes
      svg += '<line class="prob-axis" x1="' + padL + '" y1="' + (padT + innerH) + '" x2="' + (padL + innerW) + '" y2="' + (padT + innerH) + '"></line>';
      for (var k = 0; k <= 4; k++) {
        var xv = x0 + ((x1 - x0) * k) / 4;
        svg += '<text class="prob-tick" x="' + sx(xv).toFixed(1) + '" y="' + (h - 8) + '" text-anchor="middle">' + xv.toFixed(1) + '</text>';
      }
      svg += '</svg>';
      host.innerHTML = svg;
    }

    function paint() {
      el.querySelector('[data-out-n]').textContent = String(state.n);
      el.querySelector('[data-out-mu1]').textContent = state.mu1.toFixed(1);
      el.querySelector('[data-out-xbar]').textContent = state.xBar.toFixed(1);
      el.querySelector('[data-leg-mu1]').textContent = state.mu1.toFixed(1);

      var se = state.sigma / Math.sqrt(state.n);
      var zAlpha = normalInv(1 - state.alpha);
      var cVal = state.mu0 + zAlpha * se;

      // Beta and Power
      var zBeta = (cVal - state.mu1) / se;
      var beta = clamp(normalCdf(zBeta), 0, 1);
      var power = 1 - beta;

      // p-value
      var zObs = (state.xBar - state.mu0) / se;
      var pVal = clamp(1 - normalCdf(zObs), 0, 1);

      var cTex = "c = \\mu_0 + z_{1-\\alpha}\\frac{\\sigma}{\\sqrt{n}} = " + cVal.toFixed(2);
      var pTex = "p\\text{-value} = P(Z \\ge " + zObs.toFixed(2) + ") = " + pVal.toFixed(4);
      var betaTex = "\\beta = \\Phi\\left(\\frac{c - \\mu_1}{\\mathrm{SE}}\\right) = " + beta.toFixed(4) + " \\; (" + (beta*100).toFixed(1) + "\\%)";
      var powTex = "1 - \\beta = " + power.toFixed(4) + " \\; (" + (power*100).toFixed(1) + "\\%)";

      setMath(el.querySelector("[data-stat-crit]"), el.querySelector("[data-stat-crit-sr]"), cTex, "c=" + cVal.toFixed(2));
      setMath(el.querySelector("[data-stat-pval]"), el.querySelector("[data-stat-pval-sr]"), pTex, "p-value=" + pVal.toFixed(4));
      setMath(el.querySelector("[data-stat-beta]"), el.querySelector("[data-stat-beta-sr]"), betaTex, "beta=" + (beta*100).toFixed(1) + "%");
      setMath(el.querySelector("[data-stat-power]"), el.querySelector("[data-stat-power-sr]"), powTex, "Power=" + (power*100).toFixed(1) + "%");

      var verd = el.querySelector("[data-verdict]");
      if (pVal < state.alpha) {
        verd.innerHTML = '<span class="prob-badge prob-badge-bad">דוחים את H_0 (מובהק סטטיסטית)</span> ממוצע המדגם (' + state.xBar.toFixed(1) + ') נפל באזור הדחייה מעל c=' + cVal.toFixed(2) + ', ו־p-value (' + pVal.toFixed(4) + ') קטן מ־α=' + state.alpha + '. קיים ממצא מובהק לטובת H_1.';
      } else {
        verd.innerHTML = '<span class="prob-badge prob-badge-ok">אין עדות לדחיית H_0 (לא מובהק)</span> ממוצע המדגם (' + state.xBar.toFixed(1) + ') טרם חצה את הערך הקריטי c=' + cVal.toFixed(2) + ', ו־p-value (' + pVal.toFixed(4) + ') גדול מ־α=' + state.alpha + '.';
      }

      drawDualCurves(cVal, pVal, beta);
    }

    el.addEventListener("input", function (ev) {
      if (!ev.target || ev.target.type !== "range") return;
      if (ev.target.matches("[data-n]")) state.n = clamp(readNum(ev.target), 5, 100);
      else if (ev.target.matches("[data-mu1]")) state.mu1 = readNum(ev.target);
      else if (ev.target.matches("[data-xbar]")) state.xBar = readNum(ev.target);
      paint();
    });

    el.addEventListener("click", function (ev) {
      var aBtn = ev.target.closest("[data-alpha]");
      if (!aBtn) return;
      state.alpha = Number(aBtn.getAttribute("data-alpha"));
      var allA = el.querySelectorAll("[data-alpha]");
      for (var i = 0; i < allA.length; i++) allA[i].setAttribute("aria-pressed", allA[i] === aBtn ? "true" : "false");
      paint();
    });

    el.probRedraw = function() { paint(); };
    el.setAttribute("data-chart-live", "1");
    paint();
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
      else if (kind === "counting") mountCounting(node);
      else if (kind === "stars") mountStars(node);
      else if (kind === "pascal") mountPascal(node);
      else if (kind === "venn") mountVenn(node);
      else if (kind === "birthday") mountBirthday(node);
      else if (kind === "tree") mountTree(node);
      else if (kind === "indep") mountIndep(node);
      else if (kind === "rv") mountRv(node);
      else if (kind === "lln") mountLln(node);
      else if (kind === "density") mountDensity(node);
      else if (kind === "joint") mountJoint(node);
      else if (kind === "conv") mountConv(node);
      else if (kind === "condexp") mountCondExp(node);
      else if (kind === "ineq") mountIneq(node);
      else if (kind === "ci") mountCi(node);
      else if (kind === "htest") mountHTest(node);
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
