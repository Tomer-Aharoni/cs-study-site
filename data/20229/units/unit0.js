// edit-pass: 2 | unit: 0 | date: 2026-11-04
window.UNIT0 = {
  id: "0",
  title: "מכינת השלמות מלינארית 1: ארגז הכלים המלא",
  goals: [
    "להבין שדות מספרים (ממשיים ומרוכבים), לבצע פעולות אריתמטיות במרוכבים, ולשלוט בתכונות הצמוד המרוכב והערך המוחלט.",
    "להבין את מושג המאפיין של שדה, ולדעת מדוע בלינארית 2 נדרש לרוב שדה בעל מאפיין שונה מ־2 (שבו 1+1 שונה מאפס ומותר לחלק ב־2).",
    "לבצע כפל מטריצות, שחלוף, הצמדה הרמיטית ועקבה, ולמצוא מטריצה הפיכה דרך אלגוריתם הדירוג.",
    "לדרג מטריצות צעד־אחר־צעד לצורה קנונית, ולמצוא בסיס למרחב הפתרונות של מערכת הומוגנית (מרחב האפס) בעזרת משתנים מובילים וחופשיים.",
    "לזהות מרחבים וקטוריים ותת־מרחבים, לפרוש קבוצות וקטורים, ולבדוק תלות ואי־תלות לינארית באמצעות מערכת משוואות.",
    "למצוא בסיס וממד, להשלים קבוצה בת\"ל לבסיס, ולהשתמש במשפט הממדים ובפירוק לסכום ישר של תת־מרחבים.",
    "לחשב וקטור קואורדינטות לפי בסיס סדור, ולבנות מטריצת מעבר מבסיס לבסיס.",
    "לנתח העתקות לינאריות: למצוא בסיס וממד לגרעין ולתמונה, להשתמש במשפט הממד להעתקות, ולזהות העתקות הפיכות והטלות.",
    "לבנות את המטריצה המייצגת העתקה לינארית בבסיסים שונים, ולהבין את מושג דמיון המטריצות דרך החלפת בסיס.",
    "לחשב דטרמיננטות של מטריצות 2x2 ו־3x3, להשתמש בתכונותיהן, ולחשב את הפולינום האופייני של מטריצה.",
    "למצוא ערכים עצמיים ומרחבים עצמיים, לקבוע ריבוי אלגברי וריבוי גיאומטרי, ולבצע לכסון מלא של מטריצה כאשר הדבר אפשרי.",
  ],
  sections: [
    {
      id: "l0-fields-complex",
      title: "שדות ומספרים מרוכבים (Fields and Complex Numbers)",
      html: `
<p>ברוכים הבאים ללינארית 2! הקורס הזה עוסק במבנים גיאומטריים ואלגבריים עמוקים: מרחבי מכפלה פנימית, אופרטורים הרמיטיים ואוניטריים, תבניות ריבועיות וצורות ז'ורדן. אבל לפני שנוכל לחקור את המבנים האלה, עלינו לוודא שארגז הכלים הבסיסי שלנו יציב לחלוטין. אם לא למדתם לינארית 1 או שעבר זמן רב – המכינה הזו נכתבה במיוחד עבורכם, בשפה אנושית, בגובה העיניים ובלי לדלג על אף שלב.</p>

<h3>אינטואיציה: מאיפה המספרים שלנו מגיעים?</h3>
<p>כל תאוריה מתמטית צריכה "מגרש משחקים" שבו המספרים חיים. באלגברה לינארית, מגרש המשחקים הזה נקרא <strong>שדה</strong>. שדה הוא מערכת מספרים שבה מותר לבצע את ארבע פעולות החשבון: חיבור, חיסור, כפל, והחשוב מכל – <strong>חילוק בכל איבר שונה מאפס</strong>, בלי לצאת מהמערכת.</p>
<p>לדוגמה, קבוצת המספרים השלמים \\(\\mathbb{Z} = \\{\\dots, -2, -1, 0, 1, 2, \\dots\\}\\) <em>אינה שדה</em>! מדוע? כי אם נחלק \\(1\\) ב־\\(2\\), נקבל \\(\\frac{1}{2}\\), שהוא אינו מספר שלם. לעומת זאת, המספרים הרציונליים \\(\\mathbb{Q}\\), המספרים הממשיים \\(\\mathbb{R}\\), והמספרים המרוכבים \\(\\mathbb{C}\\) הם שדות מלאים.</p>

<h3>המספרים המרוכבים והסוד של הצמוד המרוכב</h3>
<p>המספרים הממשיים \\(\\mathbb{R}\\) אינם מספיקים לכל הצרכים שלנו, כי למשוואה הפשוטה \\(x^2 + 1 = 0\\) אין פתרון ממשי (ריבוע של מספר ממשי הוא תמיד אי־שלילי). כדי לפתור זאת, הוגדרה היחידה המדומה \\(i\\) המקיימת \\(i^2 = -1\\).</p>
<p>מספר מרוכב נכתב כ־\\(z = a + bi\\), כאשר \\(a\\) הוא <strong>החלק הממשי</strong> (\\(\\text{Re}(z)\\)) ו־\\(b\\) הוא <strong>החלק המדומה</strong> (\\(\\text{Im}(z)\\)). גיאומטרית, מספר מרוכב אינו סתם מספר על ציר, אלא <strong>נקודה או חץ במישור הדו־ממדי</strong>: הציר האופקי מייצג את החלק הממשי, והציר האנכי מייצג את החלק המדומה.</p>
<p><strong>למה הצמדה מרוכבת \\(\\overline{z} = a - bi\\) היא הפעולה החשובה ביותר בלינארית 2?</strong><br>
במספרים ממשיים, אם ניקח מספר \\(a\\), ריבועו \\(a^2 \\ge 0\\) תמיד חיובי או אפס, ולכן קל למדוד מרחקים ואורכים. אבל במרוכבים, אם היינו מעלים בריבוע סתם כך: \\(i^2 = -1 \\lt 0\\)! אורך שלילי הוא אסון בגיאומטריה. הפתרון הגאוני הוא לכפול את המספר ב<strong>צמוד המרוכב</strong> שלו:
\\[ z \\cdot \\overline{z} = (a + bi)(a - bi) = a^2 - (bi)^2 = a^2 - b^2 i^2 = a^2 + b^2 \\]
מכיוון ש־\\(a, b\\) ממשיים, הביטוי \\(a^2 + b^2\\) הוא <strong>תמיד ממשי ואי־שלילי</strong>! שורש ביטוי זה הוא המרחק מראשית הצירים: \\(|z| = \\sqrt{a^2 + b^2}\\). זהו הבסיס לכל הגדרות המכפלה הפנימית מעל \\(\\mathbb{C}\\) שנלמד ביחידה 1!</p>

<!-- SVG Diagram: Complex Plane -->
<svg viewBox="0 0 460 260" style="max-width:100%;height:auto;display:block;margin:1.5rem auto;background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:12px;" aria-label="איור המישור המרוכב: מספר, צמוד, מודול וזווית">
  <!-- Grid lines -->
  <defs>
    <pattern id="grid-c" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--line,#e2e8f0)" stroke-width="0.8" opacity="0.6"/>
    </pattern>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--ink,#1e293b)"/>
    </marker>
    <marker id="arrow-acc" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent,#3b82f6)"/>
    </marker>
    <marker id="arrow-ok" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--ok,#10b981)"/>
    </marker>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid-c)"/>

  <!-- Axes -->
  <line x1="40" y1="130" x2="420" y2="130" stroke="var(--ink,#1e293b)" stroke-width="1.8" marker-end="url(#arrow)"/>
  <line x1="160" y1="235" x2="160" y2="25" stroke="var(--ink,#1e293b)" stroke-width="1.8" marker-end="url(#arrow)"/>
  <text x="415" y="120" font-size="13" font-family="sans-serif" font-weight="bold" fill="var(--ink,#1e293b)">Re (ציר ממשי)</text>
  <text x="170" y="38" font-size="13" font-family="sans-serif" font-weight="bold" fill="var(--ink,#1e293b)">Im (ציר מדומה)</text>
  <text x="145" y="145" font-size="12" font-family="sans-serif" fill="var(--ink,#64748b)">0</text>

  <!-- Triangle for z -->
  <polygon points="160,130 310,130 310,60" fill="rgba(59,130,246,0.12)"/>
  <line x1="310" y1="130" x2="310" y2="60" stroke="var(--accent,#3b82f6)" stroke-width="1.5" stroke-dasharray="4,4"/>
  <line x1="160" y1="60" x2="310" y2="60" stroke="var(--line,#94a3b8)" stroke-width="1" stroke-dasharray="3,3"/>

  <!-- Vector z -->
  <line x1="160" y1="130" x2="310" y2="60" stroke="var(--accent,#3b82f6)" stroke-width="2.5" marker-end="url(#arrow-acc)"/>
  <circle cx="310" cy="60" r="4.5" fill="var(--accent,#3b82f6)"/>
  <text x="320" y="58" font-size="14" font-family="sans-serif" font-weight="bold" fill="var(--accent,#3b82f6)">z = a + bi</text>
  <text x="215" y="85" font-size="12" font-family="sans-serif" fill="var(--accent,#3b82f6)">|z| = √(a²+b²)</text>
  <text x="230" y="146" font-size="12" font-family="sans-serif" fill="var(--ink,#1e293b)">a</text>
  <text x="318" y="100" font-size="12" font-family="sans-serif" fill="var(--ink,#1e293b)">b</text>

  <!-- Angle theta arc -->
  <path d="M 200 130 A 40 40 0 0 0 196 114" fill="none" stroke="var(--ink,#1e293b)" stroke-width="1.5"/>
  <text x="206" y="122" font-size="12" font-family="sans-serif" fill="var(--ink,#1e293b)">θ</text>

  <!-- Reflection line & Vector z-bar -->
  <line x1="310" y1="130" x2="310" y2="200" stroke="var(--ok,#10b981)" stroke-width="1.5" stroke-dasharray="4,4"/>
  <line x1="160" y1="130" x2="310" y2="200" stroke="var(--ok,#10b981)" stroke-width="2.5" marker-end="url(#arrow-ok)"/>
  <circle cx="310" cy="200" r="4.5" fill="var(--ok,#10b981)"/>
  <text x="320" y="206" font-size="14" font-family="sans-serif" font-weight="bold" fill="var(--ok,#10b981)">z̄ = a - bi (צמוד)</text>
  <text x="318" y="170" font-size="12" font-family="sans-serif" fill="var(--ink,#1e293b)">-b</text>

  <!-- Annotation text -->
  <text x="50" y="210" font-size="11.5" font-family="sans-serif" fill="var(--ink,#475569)">שיקוף ביחס לציר הממשי: החלק הממשי נשמר, המדומה הופך סימן</text>
</svg>

<dl class="term-list">
  <dt>שדה (Field)</dt>
  <dd>קבוצה \\(\\mathbb{F}\\) בעלת שתי פעולות בינאריות, חיבור (\\(+\\)) וכפל (\\(\\cdot\\)), המקיימת:
    <ul>
      <li><strong>סגירות, אסוציאטיביות וקומוטטיביות:</strong> לכל \\(a, b \\in \\mathbb{F}\\), הסכום \\(a+b\\) והמכפלה \\(a \\cdot b\\) שייכים ל־\\(\\mathbb{F}\\), והפעולות קיבוציות וחילופיות.</li>
      <li><strong>איברי אפס ויחידה:</strong> קיים איבר ניטרלי לחיבור \\(0 \\in \\mathbb{F}\\) כך ש־\\(a + 0 = a\\), ואיבר ניטרלי לכפל \\(1 \\in \\mathbb{F}\\) (\\(1 \\ne 0\\)) כך ש־\\(a \\cdot 1 = a\\).</li>
      <li><strong>איברים נגדיים והופכיים:</strong> לכל \\(a\\) קיים נגדי \\(-a\\) כך ש־\\(a + (-a) = 0\\); ולכל \\(a \\ne 0\\) קיים הופכי כפלי \\(a^{-1} = \\frac{1}{a}\\) כך ש־\\(a \\cdot a^{-1} = 1\\).</li>
      <li><strong>פילוג (דיסטריבוטיביות):</strong> \\(a \\cdot (b + c) = a \\cdot b + a \\cdot c\\).</li>
    </ul>
  </dd>
  <dt>המספרים המרוכבים (Complex Numbers)</dt>
  <dd>השדה \\(\\mathbb{C}\\) מוגדר כאוסף כל המספרים מהצורה \\(z = a + bi\\), כאשר \\(a, b \\in \\mathbb{R}\\) ו־\\(i^2 = -1\\).
    החיבור מבוצע רכיב־ברכיב: \\((a + bi) + (c + di) = (a + c) + (b + d)i\\).
    הכפל מבוצע לפי פתיחת סוגריים ושימוש ב־\\(i^2 = -1\\):
    \\[ (a + bi)(c + di) = ac + adi + bci + bdi^2 = (ac - bd) + (ad + bc)i \\]
  </dd>
  <dt>צמוד מרוכב (Complex Conjugate)</dt>
  <dd>הצמוד של \\(z = a + bi\\) הוא \\(\\overline{z} = a - bi\\). תכונות מפתח:
    \\[ \\overline{z + w} = \\overline{z} + \\overline{w}, \\quad \\overline{z \\cdot w} = \\overline{z} \\cdot \\overline{w}, \\quad \\overline{\\overline{z}} = z \\]
    כמו כן: \\(z \\in \\mathbb{R} \\iff \\overline{z} = z\\), ו־\\(z\\) מדומה טהור (\\(a=0\\)) אם ורק אם \\(\\overline{z} = -z\\).
  </dd>
  <dt>ערך מוחלט ומודול (Absolute Value and Modulus)</dt>
  <dd>המרחק של \\(z = a + bi\\) מראשית הצירים:
    \\[ |z| = \\sqrt{a^2 + b^2} \\]
    הקשר החשוב ביותר: \\(|z|^2 = z \\cdot \\overline{z}\\). תכונות: \\(|z \\cdot w| = |z| \\cdot |w|\\), ואי־שוויון המשולש \\(|z + w| \\le |z| + |w|\\).
  </dd>
  <dt>חילוק מספרים מרוכבים (Division of Complex Numbers)</dt>
  <dd>כדי לחלק במספר מרוכב \\(w \\ne 0\\), כופלים את המונה ואת המכנה בצמוד המכנה \\(\\overline{w}\\):
    \\[ \\frac{z}{w} = \\frac{z \\cdot \\overline{w}}{w \\cdot \\overline{w}} = \\frac{z \\cdot \\overline{w}}{|w|^2} \\]
    בכך הופכים את המכנה למספר ממשי חיובי ונוח לחלוקה.
  </dd>
  <dt>הצגה קוטבית ונוסחת דה־מואבר (Polar Form and De Moivre's Formula)</dt>
  <dd>כל מספר מרוכב שאינו אפס ניתן להצגה בצורה קוטבית:
    \\[ z = r(\\cos \\theta + i \\sin \\theta) = r e^{i\\theta} \\]
    כאשר \\(r = |z|\\) ו־\\(\\theta = \\arg(z)\\) היא הזווית ביחס לציר הממשי החיובי. לפי נוסחת דה־מואבר, חזקה של מספר מרוכב היא:
    \\[ (r e^{i\\theta})^n = r^n e^{i n \\theta} = r^n (\\cos(n\\theta) + i \\sin(n\\theta)) \\]
  </dd>
</dl>

<div class="panel">
  <h4>מתכון עבודה שלב־אחר־שלב: חילוק מרוכבים והעלאה בחזקה</h4>
  <p><strong>מתכון 1: חילוק מספרים מרוכבים \\(\\frac{z}{w}\\):</strong></p>
  <ol>
    <li>מזהים את המכנה: \\(w = c + di\\).</li>
    <li>מוצאים את הצמוד שלו: מחליפים את הסימן של החלק המדומה: \\(\\overline{w} = c - di\\).</li>
    <li>כופלים את המונה ואת המכנה ב־\\(\\overline{w}\\).</li>
    <li>מחשבים את המכנה הממשי: \\((c+di)(c-di) = c^2 + d^2\\).</li>
    <li>פותחים סוגריים במונה לפי חוק הפילוג ומחליפים כל \\(i^2\\) ב־\\(-1\\).</li>
    <li>מפצלים את התוצאה לחלק ממשי ולחלק מדומה: \\(\\frac{A}{c^2+d^2} + \\frac{B}{c^2+d^2}i\\).</li>
  </ol>
  <p><strong>מתכון 2: העלאה בחזקה גבוהה \\(z^n\\) בעזרת דה־מואבר:</strong></p>
  <ol>
    <li>מוצאים את הרדיוס: \\(r = \\sqrt{a^2 + b^2}\\).</li>
    <li>מוצאים את הזווית \\(\\theta\\): \\(\\tan \\theta = \\frac{b}{a}\\) (תוך שימת לב לרביע שבו הנקודה נמצאת במישור).</li>
    <li>מפעילים את דה־מואבר: \\(z^n = r^n (\\cos(n\\theta) + i \\sin(n\\theta))\\).</li>
  </ol>
</div>

<h3>דוגמאות פתורות צעד־אחר־צעד</h3>

<div class="panel">
  <p><strong>דוגמה 1 (קלה: חילוק מרוכבים ופתרון משוואה לינארית):</strong></p>
  <p><strong>חלק א':</strong> נחשב את המנה \\(\\frac{3 + 4i}{1 - 2i}\\).</p>
  <ol>
    <li>המכנה הוא \\(w = 1 - 2i\\). הצמוד שלו הוא \\(\\overline{w} = 1 + 2i\\).</li>
    <li>נכפול מונה ומכנה ב־\\(1 + 2i\\):
      \\[ \\frac{3 + 4i}{1 - 2i} = \\frac{(3 + 4i)(1 + 2i)}{(1 - 2i)(1 + 2i)} \\]
    </li>
    <li>נחשב את המכנה:
      \\[ (1 - 2i)(1 + 2i) = 1^2 - (2i)^2 = 1 - 4(-1) = 1 + 4 = 5 \\]
    </li>
    <li>נפתח סוגריים במונה:
      \\[ (3 + 4i)(1 + 2i) = 3 \\cdot 1 + 3 \\cdot 2i + 4i \\cdot 1 + 4i \\cdot 2i = 3 + 6i + 4i + 8i^2 \\]
      נציב \\(i^2 = -1\\):
      \\[ 3 + 10i + 8(-1) = 3 - 8 + 10i = -5 + 10i \\]
    </li>
    <li>נחלק במכנה 5:
      \\[ \\frac{-5 + 10i}{5} = \\frac{-5}{5} + \\frac{10}{5}i = -1 + 2i \\]
    </li>
  </ol>
  <p><strong>חלק ב':</strong> נפתור את המשוואה \\((1 + i)z + (2 - i) = 3 + 2i\\):</p>
  <ol>
    <li>נעביר אגף את המספר החופשי:
      \\[ (1 + i)z = (3 + 2i) - (2 - i) = (3 - 2) + (2 - (-1))i = 1 + 3i \\]
    </li>
    <li>נחלק ב־\\((1 + i)\\) באמצעות כפל בצמוד \\((1 - i)\\):
      \\[ z = \\frac{1 + 3i}{1 + i} = \\frac{(1 + 3i)(1 - i)}{(1 + i)(1 - i)} = \\frac{1 - i + 3i - 3i^2}{1^2 + 1^2} = \\frac{1 + 2i - 3(-1)}{2} = \\frac{4 + 2i}{2} = 2 + i \\]
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 2 (בינונית: משוואה המשלבת מספר וצמוד מרוכב):</strong></p>
  <p>נפתור את המשוואה הבאה ב־\\(\\mathbb{C}\\):
    \\[ 2z + i\\overline{z} = 5 - 2i \\]
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>כאשר משוואה מכילה הן את \\(z\\) והן את \\(\\overline{z}\\), הדרך הסטנדרטית היא להציב \\(z = a + bi\\) (כאשר \\(a, b \\in \\mathbb{R}\\)), ולכן \\(\\overline{z} = a - bi\\).</li>
    <li>נציב במשוואה:
      \\[ 2(a + bi) + i(a - bi) = 5 - 2i \\]
    </li>
    <li>נפתח סוגריים:
      \\[ 2a + 2bi + ai - bi^2 = 5 - 2i \\]
      מכיוון ש־\\(i^2 = -1\\), האיבר \\(-bi^2\\) הופך ל־\\(+b\\):
      \\[ (2a + b) + (a + 2b)i = 5 - 2i \\]
    </li>
    <li>שני מספרים מרוכבים שווים אם ורק אם החלק הממשי שלהם שווה והחלק המדומה שווה. לכן מקבלים מערכת של שתי משוואות לינאריות בשני נעלמים ממשיים:
      \\[
      \\begin{cases}
      2a + b = 5 & \\text{(משוואה 1: חלק ממשי)} \\\\
      a + 2b = -2 & \\text{(משוואה 2: חלק מדומה)}
      \\end{cases}
      \\]
    </li>
    <li>נבודד את \\(b\\) ממשוואה 1: \\(b = 5 - 2a\\). נציב במשוואה 2:
      \\[ a + 2(5 - 2a) = -2 \\implies a + 10 - 4a = -2 \\implies -3a = -12 \\implies a = 4 \\]
    </li>
    <li>נציב חזרה כדי למצוא את \\(b\\):
      \\[ b = 5 - 2(4) = 5 - 8 = -3 \\]
    </li>
    <li>לכן הפתרון היחיד הוא:
      \\[ z = 4 - 3i \\]
      בדיקה מהירה: \\(2(4 - 3i) + i(4 + 3i) = 8 - 6i + 4i + 3i^2 = 8 - 3 - 2i = 5 - 2i\\). הפתרון אומת במדויק!
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 3 (ברמת לינארית 2: הצגה קוטבית וחישוב חזקה גבוהה לפי דה־מואבר):</strong></p>
  <p>נחשב את ערך הביטוי \\((1 + i)^8\\).</p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>אם ננסה לפתוח סוגריים בחזקת 8 ישירות, נקבל ביטוי ארוך מאוד עם נוסחת הבינום. במקום זאת נעבור להצגה קוטבית!</li>
    <li>עבור \\(z = 1 + i\\): החלק הממשי הוא \\(a = 1\\) והחלק המדומה הוא \\(b = 1\\).</li>
    <li>נחשב את המודול (רדיוס):
      \\[ r = |z| = \\sqrt{1^2 + 1^2} = \\sqrt{2} \\]
    </li>
    <li>נחשב את הארגומנט (זווית): הנקודה \\((1, 1)\\) נמצאת ברביע הראשון. מתקיים:
      \\[ \\tan \\theta = \\frac{1}{1} = 1 \\implies \\theta = \\frac{\\pi}{4} \\quad (45^\\circ) \\]
      לכן ההצגה הקוטבית היא:
      \\[ 1 + i = \\sqrt{2} e^{i \\frac{\\pi}{4}} = \\sqrt{2}\\left(\\cos \\frac{\\pi}{4} + i \\sin \\frac{\\pi}{4}\\right) \\]
    </li>
    <li>נפעיל את נוסחת דה־מואבר לחזקת 8:
      \\[ (1 + i)^8 = \\left(\\sqrt{2} e^{i \\frac{\\pi}{4}}\\right)^8 = (\\sqrt{2})^8 \\cdot e^{i \\cdot 8 \\cdot \\frac{\\pi}{4}} = (2^{1/2})^8 \\cdot e^{i 2\\pi} \\]
    </li>
    <li>מחשבים:
      \\[ (2^{1/2})^8 = 2^4 = 16 \\]
      ולפי נוסחת אוילר: \\(e^{i 2\\pi} = \\cos(2\\pi) + i \\sin(2\\pi) = 1 + 0i = 1\\).
    </li>
    <li>לכן התוצאה הסופית נקייה ומפתיעה בפשטותה:
      \\[ (1 + i)^8 = 16 \\cdot 1 = 16 \\]
    </li>
  </ol>
</div>

<div class="linear-lab" data-linear-lab="complex-plane"></div>
      `,
    },
    {
      id: "l0-char-field",
      title: "מאפיין של שדה ושדות סופיים (Characteristic of a Field and Finite Fields)",
      html: `
<p>בבית הספר התיכון ובחיי היומיום אנו רגילים לעבוד עם המספרים הממשיים שבהם \\(1 + 1 = 2 \\ne 0\\). אך בעולם מדעי המחשב – החל מהצפנה (כגון RSA ועקומות אליפטיות), דרך תורת הקודים ועד אלגוריתמים – עובדים רבות עם שדות סופיים שבהם סכימה חוזרת של איבר היחידה 1 מגיעה בסופו של דבר חזרה ל־0!</p>

<h3>אינטואיציה: אנלוגיית השעון של החשבון המודולרי</h3>
<p>חשבו על מחוגי שעון: אם השעה עכשיו 11:00 ונוסיף שעתיים, השעה אינה 13:00 אלא 1:00. השעון "מתאפס" בכל כפולה של 12. בשדות סופיים המסומנים \\(\\mathbb{Z}_p\\) (כאשר \\(p\\) הוא מספר ראשוני), המספרים הם השאריות מחלוקה ב־\\(p\\): \\(\\{0, 1, 2, \\dots, p-1\\}\\), וכל פעולות החיבור והכפל מבוצעות מודולו \\(p\\).</p>
<p>מהו "הופכי כפלי" בשדה סופי? אם בשדה הממשי ההופכי של 2 הוא \\(\\frac{1}{2}\\), בשדה \\(\\mathbb{Z}_5 = \\{0, 1, 2, 3, 4\\}\\) אין שברים! ההופכי של 2 הוא המספר השלם \\(x\\) שמקיים \\(2x \\equiv 1 \\pmod 5\\). בדיקה פשוטה מראה: \\(2 \\cdot 3 = 6 \\equiv 1 \\pmod 5\\). לכן ב־\\(\\mathbb{Z}_5\\), מתקיים בדיוק: <strong>\\(2^{-1} = 3\\)</strong>!</p>

<h3>מדוע בלינארית 2 דורשים \\(\\text{char}(\\mathbb{F}) \\ne 2\\)?</h3>
<p>בשדה \\(\\mathbb{Z}_2 = \\{0, 1\\}\\), מתקיים:
\\[ 1 + 1 = 0 \\pmod 2 \\]
משמעות השוויון הזה דרמטית: \\(1 = -1\\), מה שאומר שאין הבדל בין חיבור לחיסור! אבל התוצאה הקריטית ביותר היא ש־<strong>האיבר 2 שווה לאפס</strong>. וכמו שכולנו יודעים, <em>אסור לחלק באפס</em>! לכן בשדה ממאפיין 2, לאיבר 2 אין הופכי כפלי.</p>
<p>לאורך כל הקורס בלינארית 2 (בפרט ביחידות 4–6 על תבניות בילינאריות ותרגומן לתבניות ריבועיות), נפגוש שוב ושוב את שתי הנוסחאות המרכזיות הבאות:
\\[ A = \\frac{A + A^t}{2} + \\frac{A - A^t}{2} \\quad \\text{(פירוק מטריצה לחלק סימטרי ואנטי־סימטרי)} \\]
\\[ B(u, v) = \\frac{q(u+v) - q(u) - q(v)}{2} \\quad \\text{(זהות הקיטוב המשחזרת תבנית מתוך תבנית ריבועית)} \\]
שימו לב למכנה: <strong>יש כאן חלוקה מפורשת ב־2!</strong> אם \\(\\text{char}(\\mathbb{F}) = 2\\), הנוסחאות האלה אינן מוגדרות כלל. לכן כל משפטי היסוד של תבניות ריבועיות פותחים בהכרזה: <em>"יהי \\(\\mathbb{F}\\) שדה בעל מאפיין שונה מ־2"</em>.</p>

<!-- Visual Modular Tables -->
<div style="display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center;margin:1.5rem 0;">
  <div style="background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:10px;padding:1rem;min-width:200px;">
    <h4 style="margin:0 0 0.5rem;text-align:center;">לוח חיבור וכפל ב־\\(\\mathbb{Z}_2\\) (\\(\\text{char}=2\\))</h4>
    <div style="display:flex;gap:1rem;justify-content:center;">
      <table style="border-collapse:collapse;font-size:13px;text-align:center;">
        <caption>חיבור (+)</caption>
        <tr><th style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;background:var(--card,#f1f5f9);">+</th><th style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">0</th><th style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">1</th></tr>
        <tr><th style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">0</th><td style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">0</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">1</td></tr>
        <tr><th style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">1</th><td style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">1</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;background:rgba(239,68,68,0.2);color:var(--bad,#dc2626);font-weight:bold;">0 (1+1=0!)</td></tr>
      </table>
      <table style="border-collapse:collapse;font-size:13px;text-align:center;">
        <caption>כפל (×)</caption>
        <tr><th style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;background:var(--card,#f1f5f9);">×</th><th style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">0</th><th style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">1</th></tr>
        <tr><th style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">0</th><td style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">0</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">0</td></tr>
        <tr><th style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">1</th><td style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;">0</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 8px;background:rgba(16,185,129,0.15);font-weight:bold;">1</td></tr>
      </table>
    </div>
  </div>

  <div style="background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:10px;padding:1rem;min-width:240px;">
    <h4 style="margin:0 0 0.5rem;text-align:center;">לוח כפל ב־\\(\\mathbb{Z}_5\\) (הופכי כפלי: היכן יש 1?)</h4>
    <table style="border-collapse:collapse;font-size:13px;text-align:center;margin:0 auto;">
      <tr><th style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;background:var(--card,#f1f5f9);">×</th><th style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">1</th><th style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">2</th><th style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">3</th><th style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">4</th></tr>
      <tr><th style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">1</th><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;background:rgba(16,185,129,0.2);font-weight:bold;">1</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">2</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">3</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">4</td></tr>
      <tr style="background:rgba(59,130,246,0.08);"><th style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;font-weight:bold;color:var(--accent,#3b82f6);">2</th><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">2</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">4</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;background:rgba(16,185,129,0.25);font-weight:bold;color:var(--ok,#10b981);">1 (2·3=1!)</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">3</td></tr>
      <tr><th style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">3</th><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">3</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;background:rgba(16,185,129,0.25);font-weight:bold;color:var(--ok,#10b981);">1</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">4</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">2</td></tr>
      <tr><th style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">4</th><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">4</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">3</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;">2</td><td style="border:1px solid var(--line,#cbd5e1);padding:4px 7px;background:rgba(16,185,129,0.2);font-weight:bold;">1</td></tr>
    </table>
    <p style="margin:0.5rem 0 0;font-size:11.5px;text-align:center;color:var(--ink,#475569);">מסקנה מלוח הכפל ב־\\(\\mathbb{Z}_5\\): \\(1^{-1}=1, 2^{-1}=3, 3^{-1}=2, 4^{-1}=4\\).</p>
  </div>
</div>

<dl class="term-list">
  <dt>מאפיין של שדה (Characteristic of a Field)</dt>
  <dd>המאפיין של שדה \\(\\mathbb{F}\\), המסומן \\(\\text{char}(\\mathbb{F})\\), הוא המספר השלם החיובי הקטן ביותר \\(p\\) כך שחיבור של \\(1\\) לעצמו \\(p\\) פעמים נותן \\(0\\):
    \\[ \\underbrace{1 + 1 + \\dots + 1}_{p \\text{ פעמים}} = 0 \\]
    אם שום סכום כזה אינו מתאפס, אנו מגדירים \\(\\text{char}(\\mathbb{F}) = 0\\).
    דוגמאות: \\(\\text{char}(\\mathbb{Q}) = 0, \\text{char}(\\mathbb{R}) = 0, \\text{char}(\\mathbb{C}) = 0\\), אך \\(\\text{char}(\\mathbb{Z}_p) = p\\).
  </dd>
  <dt>השדה הסופי Z_p (Finite Field)</dt>
  <dd>עבור כל מספר ראשוני \\(p\\), הקבוצה \\(\\mathbb{Z}_p = \\{0, 1, \\dots, p-1\\}\\) יחד עם פעולות חיבור וכפל מודולו \\(p\\) היא שדה בעל \\(p\\) איברים ומאפיין \\(p\\).
    (אם \\(n\\) אינו ראשוני, למשל \\(n=4\\), \\(\\mathbb{Z}_4\\) אינו שדה כי \\(2 \\cdot 2 = 4 \\equiv 0 \\pmod 4\\), כלומר יש מחלקי אפס ו־2 אינו הפיך).
  </dd>
  <dt>הופכי כפלי בשדה סופי (Multiplicative Inverse in Finite Field)</dt>
  <dd>לכל איבר \\(a \\in \\mathbb{Z}_p\\) שונה מאפס (\\(a \\ne 0\\)), קיים איבר יחיד \\(a^{-1} \\in \\mathbb{Z}_p\\) המקיים \\(a \\cdot a^{-1} \\equiv 1 \\pmod p\\).
    חילוק באיבר \\(a\\) מוגדר ככפל בהופכי שלו: \\(\\frac{b}{a} = b \\cdot a^{-1} \\pmod p\\).
  </dd>
</dl>

<div class="panel">
  <h4>מתכון עבודה שלב־אחר־שלב: חשבון ודירוג בשדה סופי \\(\\mathbb{Z}_p\\)</h4>
  <ol>
    <li><strong>איסור על שברים רגילים:</strong> לעולם אל תכתבו שבר כמו \\(\\frac{3}{2}\\) בפתרון סופי! מצאו תמיד את ההופכי הכפלי \\(2^{-1}\\) מודולו \\(p\\), והחליפו את החילוק בכפל: \\(3 \\cdot 2^{-1} \\pmod p\\).</li>
    <li><strong>איפוס מספרים שליליים:</strong> אם קיבלתם מספר שלילי \\(-a\\), הוסיפו לו כפולות של \\(p\\) עד שיהפוך לחיובי בין \\(0\\) ל־\\(p-1\\) (לדוגמה, ב־\\(\\mathbb{Z}_5\\): \\(-1 \\equiv 4, -2 \\equiv 3\\)).</li>
    <li><strong>דירוג גאוס בשדה סופי:</strong> כל פעולות השורה (כפל שורה בסקלר, הוספת כפולה של שורה) נעשות כרגיל, אך כל כפל וחיבור מצומצמים מודולו \\(p\\).</li>
  </ol>
</div>

<h3>דוגמאות פתורות צעד־אחר־צעד</h3>

<div class="panel">
  <p><strong>דוגמה 1 (קלה: מציאת הופכי ופתרון משוואה ב־\\(\\mathbb{Z}_5\\)):</strong></p>
  <p><strong>חלק א':</strong> נחשב את ערך הביטוי \\(\\frac{3}{2}\\) בשדה \\(\\mathbb{Z}_5\\).</p>
  <ol>
    <li>עלינו למצוא את ההופכי \\(2^{-1}\\) ב־\\(\\mathbb{Z}_5\\), כלומר לפתור \\(2x \\equiv 1 \\pmod 5\\).</li>
    <li>נבדוק את איברי \\(\\mathbb{Z}_5\\):
      \\[ 2 \\cdot 1 = 2, \\quad 2 \\cdot 2 = 4, \\quad 2 \\cdot 3 = 6 \\equiv 1 \\pmod 5 \\]
      לכן \\(2^{-1} = 3\\).
    </li>
    <li>נחליף את החילוק בכפל בהופכי:
      \\[ \\frac{3}{2} \\equiv 3 \\cdot 2^{-1} \\equiv 3 \\cdot 3 = 9 \\equiv 4 \\pmod 5 \\]
    </li>
    <li>בדיקה: נכפול את התוצאה 4 במכנה 2: \\(4 \\cdot 2 = 8 \\equiv 3 \\pmod 5\\). מדויק!</li>
  </ol>
  <p><strong>חלק ב':</strong> נפתור את המשוואה \\(2x + 4 \\equiv 1 \\pmod 5\\):</p>
  <ol>
    <li>נעביר אגף:
      \\[ 2x \\equiv 1 - 4 \\equiv -3 \\equiv 2 \\pmod 5 \\]
    </li>
    <li>נכפול בהופכי \\(2^{-1} = 3\\):
      \\[ x \\equiv 2 \\cdot 3 = 6 \\equiv 1 \\pmod 5 \\]
      בדיקה: \\(2(1) + 4 = 6 \\equiv 1 \\pmod 5\\).
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 2 (בינונית: פתרון מערכת משוואות לינאריות מעל \\(\\mathbb{Z}_2\\)):</strong></p>
  <p>נפתור את מערכת המשוואות הבאה מעל השדה \\(\\mathbb{Z}_2 = \\{0, 1\\}\\):
    \\[
    \\begin{cases}
    x + y = 1 \\\\
    x + y + z = 0 \\\\
    x + z = 0
    \\end{cases}
    \\]
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>נרשום את המטריצה המורחבת של המערכת:
      \\[ \\left(\\begin{array}{ccc|c} 1 & 1 & 0 & 1 \\\\ 1 & 1 & 1 & 0 \\\\ 1 & 0 & 1 & 0 \\end{array}\\right) \\]
    </li>
    <li>נאפס מתחת לאיבר המוביל בעמודה 1. זכרו: ב־\\(\\mathbb{Z}_2\\), \\(1 + 1 = 0\\), ולכן חיסור זהה לחיבור (\\(R_2 \\leftarrow R_2 + R_1\\)):
      \\[ R_2 \\leftarrow R_2 + R_1: \\quad (1+1, 1+1, 1+0 \\mid 0+1) = (0, 0, 1 \\mid 1) \\]
      \\[ R_3 \\leftarrow R_3 + R_1: \\quad (1+1, 0+1, 1+0 \\mid 0+1) = (0, 1, 1 \\mid 1) \\]
      המטריצה כעת:
      \\[ \\left(\\begin{array}{ccc|c} 1 & 1 & 0 & 1 \\\\ 0 & 0 & 1 & 1 \\\\ 0 & 1 & 1 & 1 \\end{array}\\right) \\]
    </li>
    <li>נחליף בין שורה 2 לשורה 3 (\\(R_2 \\leftrightarrow R_3\\)) כדי לסדר את המדרגות:
      \\[ \\left(\\begin{array}{ccc|c} 1 & 1 & 0 & 1 \\\\ 0 & 1 & 1 & 1 \\\\ 0 & 0 & 1 & 1 \\end{array}\\right) \\]
    </li>
    <li>משורה 3: נקבל ישירות \\(z = 1\\).</li>
    <li>נציב בשורה 2:
      \\[ y + z = 1 \\implies y + 1 = 1 \\implies y = 0 \\]
    </li>
    <li>נציב בשורה 1:
      \\[ x + y = 1 \\implies x + 0 = 1 \\implies x = 1 \\]
    </li>
    <li>לכן למערכת יש פתרון יחיד מעל \\(\\mathbb{Z}_2\\):
      \\[ (x, y, z) = (1, 0, 1) \\]
      בדיקה בכל 3 המשוואות:
      \\(1+0 = 1\\) (נכון), \\(1+0+1 = 2 \\equiv 0\\) (נכון), \\(1+1 = 2 \\equiv 0\\) (נכון).
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 3 (ברמת לינארית 2: פירוק מטריצה לסימטרית ואנטי־סימטרית מעל שדות שונים):</strong></p>
  <p>נתונה המטריצה \\(A = \\begin{pmatrix} 1 & 2 \\\\ 4 & 3 \\end{pmatrix}\\). נחקור את פירוקה לחלק סימטרי \\(A_s = \\frac{A + A^t}{2}\\) ולחלק אנטי־סימטרי \\(A_a = \\frac{A - A^t}{2}\\) מעל שלושה שדות: \\(\\mathbb{R}\\), \\(\\mathbb{Z}_5\\), ו־\\(\\mathbb{Z}_2\\).</p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>המשוחלפת היא \\(A^t = \\begin{pmatrix} 1 & 4 \\\\ 2 & 3 \\end{pmatrix}\\).</li>
    <li>נחשב את הסכום וההפרש:
      \\[ A + A^t = \\begin{pmatrix} 1+1 & 2+4 \\\\ 4+2 & 3+3 \\end{pmatrix} = \\begin{pmatrix} 2 & 6 \\\\ 6 & 6 \\end{pmatrix} \\]
      \\[ A - A^t = \\begin{pmatrix} 1-1 & 2-4 \\\\ 4-2 & 3-3 \\end{pmatrix} = \\begin{pmatrix} 0 & -2 \\\\ 2 & 0 \\end{pmatrix} \\]
    </li>
    <li><strong>מעל \\(\\mathbb{R}\\):</strong> המאפיין הוא 0, מותר לחלק ב־2:
      \\[ A_s = \\frac{1}{2} \\begin{pmatrix} 2 & 6 \\\\ 6 & 6 \\end{pmatrix} = \\begin{pmatrix} 1 & 3 \\\\ 3 & 3 \\end{pmatrix} \\quad (A_s^t = A_s) \\]
      \\[ A_a = \\frac{1}{2} \\begin{pmatrix} 0 & -2 \\\\ 2 & 0 \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix} \\quad (A_a^t = -A_a) \\]
      וחיבורם נותן בדיוק \\(A_s + A_a = \\begin{pmatrix} 1+0 & 3-1 \\\\ 3+1 & 3+0 \\end{pmatrix} = \\begin{pmatrix} 1 & 2 \\\\ 4 & 3 \\end{pmatrix} = A\\).
    </li>
    <li><strong>מעל \\(\\mathbb{Z}_5\\):</strong> המאפיין הוא 5 (שונה מ־2!).
      נצמצם את האיברים מודולו 5: \\(6 \\equiv 1\\), \\(-2 \\equiv 3\\). לכן:
      \\[ A + A^t = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}, \\quad A - A^t = \\begin{pmatrix} 0 & 3 \\\\ 2 & 0 \\end{pmatrix} \\]
      חלוקה ב־2 פירושה כפל ב־\\(2^{-1} = 3\\):
      \\[ A_s = 3 \\cdot \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix} = \\begin{pmatrix} 6 & 3 \\\\ 3 & 3 \\end{pmatrix} \\equiv \\begin{pmatrix} 1 & 3 \\\\ 3 & 3 \\end{pmatrix} \\]
      \\[ A_a = 3 \\cdot \\begin{pmatrix} 0 & 3 \\\\ 2 & 0 \\end{pmatrix} = \\begin{pmatrix} 0 & 9 \\\\ 6 & 0 \\end{pmatrix} \\equiv \\begin{pmatrix} 0 & 4 \\\\ 1 & 0 \\end{pmatrix} \\]
      בדיקה ב־\\(\\mathbb{Z}_5\\): שימו לב ש־\\(-A_a = -\\begin{pmatrix} 0 & 4 \\\\ 1 & 0 \\end{pmatrix} \\equiv \\begin{pmatrix} 0 & 1 \\\\ 4 & 0 \\end{pmatrix} = A_a^t\\)! והסכום הוא:
      \\[ A_s + A_a = \\begin{pmatrix} 1 & 3 \\\\ 3 & 3 \\end{pmatrix} + \\begin{pmatrix} 0 & 4 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} 1 & 7 \\\\ 4 & 3 \\end{pmatrix} \\equiv \\begin{pmatrix} 1 & 2 \\\\ 4 & 3 \\end{pmatrix} = A \\]
    </li>
    <li><strong>מעל \\(\\mathbb{Z}_2\\):</strong> כאן \\(\\text{char}(\\mathbb{Z}_2) = 2\\).
      האיבר 2 שווה לאפס, ואין אפשרות לחלק ב־2! נוסחת הפירוק קורסת לחלוטין.
      (בנוסף, מעל \\(\\mathbb{Z}_2\\), מכיוון ש־\\(1 = -1\\), מטריצה אנטי־סימטרית \\(A^t = -A\\) היא בדיוק אותה הגדרה של מטריצה סימטרית \\(A^t = A\\), ולכן אין הפרדה בין שני המרחבים!).
    </li>
  </ol>
</div>

<div class="linear-lab" data-linear-lab="modular-field-calc"></div>
      `,
    },
    {
      id: "l0-matrix-ops",
      title: "אלגברת מטריצות, שחלוף והצמדה הרמיטית (Matrix Algebra, Transpose, and Hermitian Adjoint)",
      html: `
<p>מטריצה היא לא סתם טבלה מרובעת של מספרים. באלגברה לינארית, מטריצה היא <strong>מכונה שמבצעת טרנספורמציה גיאומטרית</strong>: היא לוקחת וקטור, מסובבת אותו, מותחת אותו, או מועכת אותו. כדי לשלוט בלינארית 2, עלינו להכיר לעומק את כללי הכפל, השחלוף, הצמוד ההרמיטי ואלגוריתם ההיפוך.</p>

<h3>אינטואיציה: חוק הדומינו של כפל מטריצות</h3>
<p>כדי ששתי מטריצות יוכלו להיכפל, ממדיהן חייבים להתאים כמו אבני דומינו:
\\[ (m \\times \\mathbf{k}) \\cdot (\\mathbf{k} \\times n) = (m \\times n) \\]
מספר העמודות של המטריצה הראשונה חייב להיות שווה במדויק למספר השורות של המטריצה השנייה (\\(\\mathbf{k}\\)). המטריצה המתקבלת היא בגודל השוליים החיצוניים: \\(m \\times n\\).</p>
<p>כל תא \\(C_{i,j}\\) במטריצת המכפלה מחושב על ידי <strong>מכפלה סקלרית של השורה ה־\\(i\\) במטריצה הראשונה כפול העמודה ה־\\(j\\) במטריצה השנייה</strong>.</p>

<h3>למה סדר הפעולות מתהפך בשחלוף ובהצמדה הרמיטית?</h3>
<p>כפל מטריצות אינו חילופי (\\(AB \\ne BA\\)). אם תסובבו דף ואז תזיזו אותו ימינה, התוצאה אינה זהה להזזתו ימינה ואז סיבובו! וכשמפעילים פעולת שחלוף (\\(t\\)) או הצמדה הרמיטית (\\(*\\)) על מכפלה, הסדר חייב להתהפך:
\\[ (AB)^t = B^t A^t, \\quad (AB)^* = B^* A^* \\]
חשבו על <em>אנלוגיית הגרביים והנעליים</em>: בבוקר אתם קודם גורבים גרביים ואז נועלים נעליים (\\(AB\\)). אבל כשאתם חוזרים הביתה ומסירים אותם (הפעולה ההפוכה), אתם חייבים להסיר קודם את הנעליים ורק אז את הגרביים (\\(B^t A^t\\))!</p>

<!-- SVG Diagram: Row times Column Multiplication -->
<svg viewBox="0 0 520 180" style="max-width:100%;height:auto;display:block;margin:1.5rem auto;background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:12px;" aria-label="איור כפל שורה בעמודה">
  <!-- Matrix A -->
  <rect x="30" y="30" width="110" height="110" rx="6" fill="var(--card,#ffffff)" stroke="var(--ink,#1e293b)" stroke-width="1.5"/>
  <rect x="32" y="65" width="106" height="26" fill="rgba(59,130,246,0.2)" stroke="var(--accent,#3b82f6)" stroke-width="1.5"/>
  <text x="85" y="20" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">מטריצה A (גודל m×k)</text>
  <text x="85" y="82" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--accent,#3b82f6)">שורה i ב־A</text>

  <!-- Multiply symbol -->
  <text x="165" y="92" font-size="22" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">×</text>

  <!-- Matrix B -->
  <rect x="195" y="30" width="110" height="110" rx="6" fill="var(--card,#ffffff)" stroke="var(--ink,#1e293b)" stroke-width="1.5"/>
  <rect x="235" y="32" width="26" height="106" fill="rgba(16,185,129,0.2)" stroke="var(--ok,#10b981)" stroke-width="1.5"/>
  <text x="250" y="20" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">מטריצה B (גודל k×n)</text>
  <text x="248" y="152" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ok,#10b981)">עמודה j ב־B</text>

  <!-- Equals symbol -->
  <text x="330" y="92" font-size="22" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">=</text>

  <!-- Matrix C -->
  <rect x="360" y="30" width="110" height="110" rx="6" fill="var(--card,#ffffff)" stroke="var(--ink,#1e293b)" stroke-width="1.5"/>
  <rect x="400" y="65" width="26" height="26" fill="rgba(245,158,11,0.3)" stroke="#f59e0b" stroke-width="2"/>
  <text x="415" y="20" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">תוצאה C = AB (גודל m×n)</text>
  <text x="413" y="82" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#d97706">C_{i,j}</text>

  <!-- Footer explanation -->
  <text x="260" y="170" font-size="11.5" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#475569)">C_{i,j} הוא סכום המכפלות: איבר ראשון בשורה כפול ראשון בעמודה + שני כפול שני + ...</text>
</svg>

<!-- Special Matrix Families Comparison Table -->
<div style="overflow-x:auto;margin:1.5rem 0;">
  <table style="width:100%;border-collapse:collapse;font-size:13px;text-align:right;">
    <thead>
      <tr style="background:var(--card,#f1f5f9);border-bottom:2px solid var(--line,#cbd5e1);">
        <th style="padding:8px 12px;">משפחת המטריצות</th>
        <th style="padding:8px 12px;">הגדרה מתמטית</th>
        <th style="padding:8px 12px;">שדה (\\(\\mathbb{R}\\) או \\(\\mathbb{C}\\))</th>
        <th style="padding:8px 12px;">תפקיד מפתח בלינארית 2</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid var(--line,#e2e8f0);">
        <td style="padding:8px 12px;font-weight:bold;">מטריצה סימטרית (Symmetric)</td>
        <td style="padding:8px 12px;">\\(A^t = A\\)</td>
        <td style="padding:8px 12px;">מעל \\(\\mathbb{R}\\)</td>
        <td style="padding:8px 12px;">מייצגת תבניות ריבועיות (יח' 4); ניתנת ללכסון אורתוגונלי (יח' 3).</td>
      </tr>
      <tr style="border-bottom:1px solid var(--line,#e2e8f0);background:var(--surface,#f8fafc);">
        <td style="padding:8px 12px;font-weight:bold;">מטריצה אנטי־סימטרית (Skew-Symmetric)</td>
        <td style="padding:8px 12px;">\\(A^t = -A\\) (בפרט איברי האלכסון הם 0)</td>
        <td style="padding:8px 12px;">מעל \\(\\mathbb{R}\\)</td>
        <td style="padding:8px 12px;">חלק אנטי־סימטרי בפירוק תבניות; כל הערכים העצמיים מדומים טהורים.</td>
      </tr>
      <tr style="border-bottom:1px solid var(--line,#e2e8f0);">
        <td style="padding:8px 12px;font-weight:bold;color:var(--accent,#3b82f6);">מטריצה הרמיטית (Hermitian)</td>
        <td style="padding:8px 12px;">\\(A^* = A\\) (בפרט איברי האלכסון ממשיים!)</td>
        <td style="padding:8px 12px;">מעל \\(\\mathbb{C}\\)</td>
        <td style="padding:8px 12px;">הכללת הסימטריות למרוכבים! כל ע״ע שלה ממשיים לחלוטין (יח' 2–3).</td>
      </tr>
      <tr style="border-bottom:1px solid var(--line,#e2e8f0);background:var(--surface,#f8fafc);">
        <td style="padding:8px 12px;font-weight:bold;">מטריצה אנטי־הרמיטית (Skew-Hermitian)</td>
        <td style="padding:8px 12px;">\\(A^* = -A\\) (איברי האלכסון מדומים טהורים או אפס)</td>
        <td style="padding:8px 12px;">מעל \\(\\mathbb{C}\\)</td>
        <td style="padding:8px 12px;">פירוק כל אופרטור מרוכב לחלק הרמיטי ואנטי־הרמיטי: \\(T = T_1 + iT_2\\).</td>
      </tr>
      <tr style="border-bottom:1px solid var(--line,#e2e8f0);">
        <td style="padding:8px 12px;font-weight:bold;">מטריצה משולשית עליונה (Upper Triangular)</td>
        <td style="padding:8px 12px;">\\(A_{i,j} = 0\\) לכל \\(i \\gt j\\) (מתחת לאלכסון)</td>
        <td style="padding:8px 12px;">\\(\\mathbb{R}\\) או \\(\\mathbb{C}\\)</td>
        <td style="padding:8px 12px;">משפט השילוש של שור (יח' 8): כל אופרטור מרוכב ניתן לשילוש!</td>
      </tr>
      <tr style="background:var(--surface,#f8fafc);">
        <td style="padding:8px 12px;font-weight:bold;color:var(--ok,#10b981);">מטריצה אלכסונית (Diagonal)</td>
        <td style="padding:8px 12px;">כל האיברים מחוץ לאלכסון הראשי הם 0</td>
        <td style="padding:8px 12px;">\\(\\mathbb{R}\\) או \\(\\mathbb{C}\\)</td>
        <td style="padding:8px 12px;">הצורה האידיאלית ביותר של העתקה: לכסון מטריצות ופירוק ספקטרלי (יח' 3).</td>
      </tr>
    </tbody>
  </table>
</div>

<dl class="term-list">
  <dt>כפל מטריצות (Matrix Multiplication)</dt>
  <dd>עבור \\(A \\in M_{m \\times k}\\) ו־\\(B \\in M_{k \\times n}\\), המכפלה \\(C = AB \\in M_{m \\times n}\\) מוגדרת לפי:
    \\[ C_{i,j} = \\sum_{r=1}^k A_{i,r} B_{r,j} \\]
    הכפל אסוציאטיבי \\((AB)C = A(BC)\\) ופילוגי ביחס לחיבור, אך <strong>אינו חילופי</strong> בדרך כלל (\\(AB \\ne BA\\)).
  </dd>
  <dt>שחלוף מטריצה (Matrix Transpose)</dt>
  <dd>השחלוף \\(A^t\\) מתקבל מהפיכת שורות המטריצה לעמודות: \\((A^t)_{i,j} = A_{j,i}\\).
    תכונות יסוד:
    \\[ (A^t)^t = A, \\quad (A + B)^t = A^t + B^t, \\quad (cA)^t = c A^t, \\quad (AB)^t = B^t A^t \\]
  </dd>
  <dt>הצמדה הרמיטית (Conjugate Transpose / Adjoint Matrix)</dt>
  <dd>עבור מטריצה מעל \\(\\mathbb{C}\\), ההצמדה ההרמיטית מוגדרת כשחלוף ולאחריו הצמדה מרוכבת:
    \\[ A^* = \\overline{A}^t, \\quad \\text{כלומר } (A^*)_{i,j} = \\overline{A_{j,i}} \\]
    מעל \\(\\mathbb{R}\\), \\(A^* = A^t\\). תכונות מפתח:
    \\[ (A^*)^* = A, \\quad (A + B)^* = A^* + B^*, \\quad (cA)^* = \\overline{c} A^*, \\quad (AB)^* = B^* A^* \\]
  </dd>
  <dt>עקבה (Trace)</dt>
  <dd>העקבה של מטריצה ריבועית \\(A \\in M_{n \\times n}\\) היא סכום איברי האלכסון הראשי:
    \\[ \\text{tr}(A) = \\sum_{i=1}^n A_{i,i} \\]
    תכונת המפתח: <strong>העקבה היא ציקלית</strong>: \\(\\text{tr}(AB) = \\text{tr}(BA)\\).
    מכאן נובע שלמטריצות דומות יש אותה עקבה: \\(\\text{tr}(P^{-1}AP) = \\text{tr}(A)\\).
  </dd>
  <dt>מטריצה הפיכה (Invertible Matrix)</dt>
  <dd>מטריצה ריבועית \\(A\\) נקראת הפיכה אם קיימת מטריצה \\(A^{-1}\\) כך ש־\\(A A^{-1} = A^{-1} A = I\\).
    תכונות מפתח:
    \\[ (A^{-1})^{-1} = A, \\quad (AB)^{-1} = B^{-1} A^{-1}, \\quad (A^t)^{-1} = (A^{-1})^t, \\quad (A^*)^{-1} = (A^{-1})^* \\]
  </dd>
</dl>

<div class="panel">
  <h4>מתכון עבודה שלב־אחר־שלב: היפוך מטריצה \\(3 \\times 3\\) בשיטת גאוס־ז'ורדן</h4>
  <p>כדי להפוך מטריצה \\(A\\) מגודל \\(3 \\times 3\\) ללא טעויות:</p>
  <ol>
    <li>מעמידים מטריצה מורחבת כפולה: \\([A \\mid I]\\), כאשר בצד ימין נמצאת מטריצת היחידה \\(I_3 = \\begin{pmatrix}1&0&0\\\\0&1&0\\\\0&0&1\\end{pmatrix}\\).</li>
    <li>מבצעים פעולות שורה אלמנטריות כדי להביא את הצד השמאלי לצורה מדורגת קנונית (\\(I\\)). כל פעולת שורה מבוצעת על פני כל 6 העמודות במקביל!</li>
    <li>אם במהלך הדירוג נוצרת שורת אפסים בצד שמאל – המטריצה <strong>אינה הפיכה</strong> ונעצרים!</li>
    <li>כאשר הצד השמאלי הופך ל־\\(I\\), הצד הימני הוא בדיוק המטריצה ההופכית: \\([I \\mid A^{-1}]\\).</li>
    <li><strong>בדיקת חובה:</strong> כופלים את התוצאה במטריצה המקורית ומוודאים שמתקבל \\(A A^{-1} = I\\).</li>
  </ol>
</div>

<h3>דוגמאות פתורות צעד־אחר־צעד</h3>

<div class="panel">
  <p><strong>דוגמה 1 (קלה: חישוב הצמדה הרמיטית ועקבה מעל \\(\\mathbb{C}\\)):</strong></p>
  <p>נתונה המטריצה המרוכבת \\(A = \\begin{pmatrix} 1 + i & 2 \\\\ 0 & 3 - i \\end{pmatrix}\\). נחשב את \\(A^*\\), את המכפלה \\(A^* A\\), ואת העקבה \\(\\text{tr}(A^* A)\\).</p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>נחשב את השחלוף: מחליפים שורות בעמודות:
      \\[ A^t = \\begin{pmatrix} 1 + i & 0 \\\\ 2 & 3 - i \\end{pmatrix} \\]
    </li>
    <li>נצמיד כל איבר:
      \\[ A^* = \\overline{A}^t = \\begin{pmatrix} \\overline{1 + i} & \\overline{0} \\\\ \\overline{2} & \\overline{3 - i} \\end{pmatrix} = \\begin{pmatrix} 1 - i & 0 \\\\ 2 & 3 + i \\end{pmatrix} \\]
    </li>
    <li>נחשב את המכפלה \\(A^* A\\) במכפלת שורה בעמודה:
      \\[ A^* A = \\begin{pmatrix} 1 - i & 0 \\\\ 2 & 3 + i \\end{pmatrix} \\begin{pmatrix} 1 + i & 2 \\\\ 0 & 3 - i \\end{pmatrix} \\]
      שורה 1 כפול עמודה 1: \\((1 - i)(1 + i) + 0 \\cdot 0 = (1^2 + 1^2) + 0 = 2\\).<br>
      שורה 1 כפול עמודה 2: \\((1 - i) \\cdot 2 + 0 \\cdot (3 - i) = 2 - 2i\\).<br>
      שורה 2 כפול עמודה 1: \\(2 \\cdot (1 + i) + (3 + i) \\cdot 0 = 2 + 2i\\).<br>
      שורה 2 כפול עמודה 2: \\(2 \\cdot 2 + (3 + i)(3 - i) = 4 + (3^2 + 1^2) = 4 + 10 = 14\\).<br>
      לכן:
      \\[ A^* A = \\begin{pmatrix} 2 & 2 - 2i \\\\ 2 + 2i & 14 \\end{pmatrix} \\]
      שימו לב: המטריצה \\(A^* A\\) היא הרמיטית בעצמה! \\((A^* A)^* = A^* (A^*)^* = A^* A\\).
    </li>
    <li>נחשב את העקבה: סכום איברי האלכסון הראשי:
      \\[ \\text{tr}(A^* A) = 2 + 14 = 16 \\]
      תובנה עמוקה של לינארית 2: שימו לב ש־\\(\\text{tr}(A^* A)\\) שווה בדיוק לסכום ריבועי כל המודולים של איברי \\(A\\):
      \\[ |1+i|^2 + |2|^2 + |0|^2 + |3-i|^2 = 2 + 4 + 0 + 10 = 16 \\]
      זהו בדיוק הריבוע של <em>נורמת פרובניוס</em> שנלמד ביחידה 1!
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 2 (בינונית: היפוך מטריצה \\(2 \\times 2\\) בנוסחה המהירה ובדיקה):</strong></p>
  <p>נתונה המטריצה \\(A = \\begin{pmatrix} 2 & 5 \\\\ 1 & 3 \\end{pmatrix}\\). נהפוך אותה ונבדוק את התוצאה.</p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>נחשב את הדטרמיננטה:
      \\[ \\det(A) = ad - bc = 2 \\cdot 3 - 5 \\cdot 1 = 6 - 5 = 1 \\ne 0 \\]
      מכיוון ש־\\(\\det(A) \\ne 0\\), המטריצה הפיכה!
    </li>
    <li>נשתמש בנוסחת ההיפוך ל־\\(2 \\times 2\\): מחליפים בין איברי האלכסון הראשי (2 ו־3), ומשנים את הסימן של שני האיברים האחרים (5 ו־1):
      \\[ A^{-1} = \\frac{1}{\\det(A)} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix} = \\frac{1}{1} \\begin{pmatrix} 3 & -5 \\\\ -1 & 2 \\end{pmatrix} = \\begin{pmatrix} 3 & -5 \\\\ -1 & 2 \\end{pmatrix} \\]
    </li>
    <li>בדיקה בכפל מלא:
      \\[ A A^{-1} = \\begin{pmatrix} 2 & 5 \\\\ 1 & 3 \\end{pmatrix} \\begin{pmatrix} 3 & -5 \\\\ -1 & 2 \\end{pmatrix} = \\begin{pmatrix} 2\\cdot 3 + 5\\cdot(-1) & 2\\cdot(-5) + 5\\cdot 2 \\\\ 1\\cdot 3 + 3\\cdot(-1) & 1\\cdot(-5) + 3\\cdot 2 \\end{pmatrix} = \\begin{pmatrix} 6-5 & -10+10 \\\\ 3-3 & -5+6 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = I \\]
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 3 (ברמת לינארית 2: היפוך מלא של מטריצה \\(3 \\times 3\\) באלגוריתם גאוס־ז'ורדן):</strong></p>
  <p>נמצא את ההופכית של המטריצה \\(A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{pmatrix}\\) בשיטת \\([A \\mid I] \\to [I \\mid A^{-1}]\\).</p>
  <p><strong>פתרון מפורט צעד־אחר־צעד:</strong></p>
  <ol>
    <li>מעמידים את המטריצה המורחבת הכפולה:
      \\[ \\left(\\begin{array}{ccc|ccc} 1 & 2 & 3 & 1 & 0 & 0 \\\\ 0 & 1 & 4 & 0 & 1 & 0 \\\\ 5 & 6 & 0 & 0 & 0 & 1 \\end{array}\\right) \\]
    </li>
    <li>איפוס מתחת לאיבר המוביל הראשון (עמודה 1): מבצעים \\(R_3 \\leftarrow R_3 - 5R_1\\):
      \\[ R_3 - 5R_1 = (5-5, 6-10, 0-15 \\mid 0-5, 0-0, 1-0) = (0, -4, -15 \\mid -5, 0, 1) \\]
      המטריצה הופכת ל־:
      \\[ \\left(\\begin{array}{ccc|ccc} 1 & 2 & 3 & 1 & 0 & 0 \\\\ 0 & 1 & 4 & 0 & 1 & 0 \\\\ 0 & -4 & -15 & -5 & 0 & 1 \\end{array}\\right) \\]
    </li>
    <li>איפוס מתחת לאיבר המוביל השני (עמודה 2): מבצעים \\(R_3 \\leftarrow R_3 + 4R_2\\):
      \\[ R_3 + 4R_2 = (0+0, -4+4, -15+16 \\mid -5+0, 0+4, 1+0) = (0, 0, 1 \\mid -5, 4, 1) \\]
      המטריצה הופכת ל־:
      \\[ \\left(\\begin{array}{ccc|ccc} 1 & 2 & 3 & 1 & 0 & 0 \\\\ 0 & 1 & 4 & 0 & 1 & 0 \\\\ 0 & 0 & 1 & -5 & 4 & 1 \\end{array}\\right) \\]
      הגענו לצורה מדורגת! כעת נאפס מעל האיברים המובילים (הליכה לאחור ל־RREF).
    </li>
    <li>איפוס מעל האיבר המוביל בעמודה 3 בעזרת \\(R_3\\):
      \\[ R_2 \\leftarrow R_2 - 4R_3: \\quad (0, 1, 4-4 \\mid 0 - 4(-5), 1 - 4(4), 0 - 4(1)) = (0, 1, 0 \\mid 20, -15, -4) \\]
      \\[ R_1 \\leftarrow R_1 - 3R_3: \\quad (1, 2, 3-3 \\mid 1 - 3(-5), 0 - 3(4), 0 - 3(1)) = (1, 2, 0 \\mid 16, -12, -3) \\]
      המטריצה כעת:
      \\[ \\left(\\begin{array}{ccc|ccc} 1 & 2 & 0 & 16 & -12 & -3 \\\\ 0 & 1 & 0 & 20 & -15 & -4 \\\\ 0 & 0 & 1 & -5 & 4 & 1 \\end{array}\\right) \\]
    </li>
    <li>איפוס מעל האיבר המוביל בעמודה 2 בעזרת \\(R_2\\):
      \\[ R_1 \\leftarrow R_1 - 2R_2: \\quad (1, 2-2, 0 \\mid 16 - 2(20), -12 - 2(-15), -3 - 2(-4)) = (1, 0, 0 \\mid -24, 18, 5) \\]
      וקיבלנו את צורת היחידה בצד שמאל:
      \\[ \\left(\\begin{array}{ccc|ccc} 1 & 0 & 0 & -24 & 18 & 5 \\\\ 0 & 1 & 0 & 20 & -15 & -4 \\\\ 0 & 0 & 1 & -5 & 4 & 1 \\end{array}\\right) \\]
    </li>
    <li>מסקנה: המטריצה ההופכית היא:
      \\[ A^{-1} = \\begin{pmatrix} -24 & 18 & 5 \\\\ 20 & -15 & -4 \\\\ -5 & 4 & 1 \\end{pmatrix} \\]
      בדיקה מהירה: שורה 1 כפול עמודה 1: \\(1(-24) + 2(20) + 3(-5) = -24 + 40 - 15 = 1\\). התוצאה מושלמת!
    </li>
  </ol>
</div>

<div class="linear-lab" data-linear-lab="matrix-ops-adjoint"></div>
      `,
    },
    {
      id: "l0-gauss-nullspace",
      title: "דירוג גאוס, צורה קנונית ומרחב האפס (Gaussian Elimination, RREF, and Nullspace)",
      html: `
<p>דירוג גאוס הוא אלגוריתם הליבה של כל האלגברה הלינארית. כל מציאת פתרון של מערכת משוואות, מציאת בסיס לגרעין, בדיקת אי־תלות לינארית, מציאת מרחב עצמי וקביעת דרגה – כולם מתבססים עליו. אם אי פעם הרגשתם שדירוג מטריצות הוא "סתם פעולות חשבון טכניות", כאן נגלה את המשמעות הגיאומטרית הברורה מאחורי כל שורה ועמודה.</p>

<h3>אינטואיציה: מדרגות, מובילים ומשתנים חופשיים</h3>
<p>כאשר יש לנו מערכת של משוואות לינאריות, כל משוואה קושרת בין כמה נעלמים בו־זמנית (למשל \\(x_1 + 2x_2 - x_3 = 0\\)). דירוג גאוס הוא תהליך של "הפרדת כוחות": בעזרת שלוש פעולות שורה אלמנטריות, אנו מבודדים בכל משוואה נעלם ראשי אחד, כך שנוכל לפתור את המערכת בהצבה לאחור.</p>
<p>בצורה המדורגת קנונית (RREF), העמודות של המטריצה מתחלקות לשני סוגים בלבד:
<ul>
  <li><strong>עמודות עם איבר מוביל (Pivots):</strong> המשתנים המתאימים נקראים <strong>משתנים מובילים (קשורים)</strong>. ערכם של משתנים אלה נקבע במדויק ואינו נתון לבחירתנו.</li>
  <li><strong>עמודות ללא איבר מוביל:</strong> המשתנים המתאימים נקראים <strong>משתנים חופשיים (פרמטרים)</strong>. אלו הן דרגות החופש האמיתיות של המערכת – נוכל לבחור להם כל ערך סקלרי שנרצה!</li>
</ul>
מספר המשתנים החופשיים הוא בדיוק ממד מרחב הפתרונות של המערכת ההומוגנית: \\(\\dim \\ker(A) = n - \\text{rank}(A)\\).</p>

<!-- SVG Diagram: Staircase RREF -->
<svg viewBox="0 0 500 200" style="max-width:100%;height:auto;display:block;margin:1.5rem auto;background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:12px;" aria-label="איור מדרגות RREF: משתנים מובילים מול חופשיים">
  <text x="250" y="24" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">מבנה מטריצה מדורגת קנונית (RREF)</text>

  <!-- Matrix outline -->
  <rect x="60" y="40" width="380" height="110" rx="8" fill="var(--card,#ffffff)" stroke="var(--ink,#1e293b)" stroke-width="1.8"/>

  <!-- Columns highlight: Col 1 & 3 are pivots (green/blue), Col 2 & 4 are free (amber) -->
  <rect x="75" y="45" width="55" height="100" fill="rgba(59,130,246,0.12)" rx="4"/>
  <rect x="145" y="45" width="55" height="100" fill="rgba(245,158,11,0.12)" rx="4"/>
  <rect x="215" y="45" width="55" height="100" fill="rgba(59,130,246,0.12)" rx="4"/>
  <rect x="285" y="45" width="55" height="100" fill="rgba(245,158,11,0.12)" rx="4"/>

  <!-- Matrix values (3x4 example: [1 2 0 5; 0 0 1 2; 0 0 0 0]) -->
  <!-- Row 1 -->
  <circle cx="102" cy="65" r="13" fill="var(--accent,#3b82f6)"/>
  <text x="102" y="70" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#ffffff">1</text>
  <text x="172" y="70" font-size="13" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#1e293b)">2</text>
  <text x="242" y="70" font-size="13" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#64748b)">0</text>
  <text x="312" y="70" font-size="13" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#1e293b)">5</text>

  <!-- Row 2 -->
  <text x="102" y="102" font-size="13" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#64748b)">0</text>
  <text x="172" y="102" font-size="13" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#64748b)">0</text>
  <circle cx="242" cy="98" r="13" fill="var(--accent,#3b82f6)"/>
  <text x="242" y="103" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#ffffff">1</text>
  <text x="312" y="102" font-size="13" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#1e293b)">2</text>

  <!-- Row 3 (zero row) -->
  <text x="102" y="132" font-size="13" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#94a3b8)">0</text>
  <text x="172" y="132" font-size="13" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#94a3b8)">0</text>
  <text x="242" y="132" font-size="13" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#94a3b8)">0</text>
  <text x="312" y="132" font-size="13" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#94a3b8)">0</text>

  <!-- Staircase line -->
  <path d="M 70 48 L 135 48 L 135 82 L 210 82 L 210 115 L 350 115" fill="none" stroke="var(--accent,#3b82f6)" stroke-width="2.5"/>

  <!-- Column labels above/below -->
  <text x="102" y="170" font-size="11.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--accent,#3b82f6)">עמודה 1: מוביל (x₁)</text>
  <text x="172" y="185" font-size="11.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#d97706">עמודה 2: חופשי (s)</text>
  <text x="242" y="170" font-size="11.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--accent,#3b82f6)">עמודה 3: מוביל (x₃)</text>
  <text x="312" y="185" font-size="11.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#d97706">עמודה 4: חופשי (t)</text>
</svg>

<h3>3 המצבים של מערכת משוואות לינארית \\(Ax = b\\)</h3>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin:1.5rem 0;">
  <div style="background:var(--surface,#f8fafc);border:1px solid var(--bad,#ef4444);border-radius:10px;padding:1rem;">
    <h4 style="margin:0 0 0.5rem;color:var(--bad,#dc2626);">מצב 1: אין פתרון (מערכת סתירתית)</h4>
    <p style="margin:0;font-size:13px;">במטריצה המורחבת \\([A \\mid b]\\) מופיעה <strong>שורת סתירה</strong> מהצורה:
    \\[ [0 \\quad 0 \\quad \\dots \\quad 0 \\mid c] \\quad (c \\ne 0) \\]
    משמעותה היא המשוואה הבלתי־אפשרית: \\(0 \\cdot x_1 + \\dots + 0 \\cdot x_n = c\\).</p>
  </div>
  <div style="background:var(--surface,#f8fafc);border:1px solid var(--ok,#10b981);border-radius:10px;padding:1rem;">
    <h4 style="margin:0 0 0.5rem;color:var(--ok,#10b981);">מצב 2: פתרון יחיד</h4>
    <p style="margin:0;font-size:13px;">אין שורת סתירה, ובנוסף <strong>אין אף משתנה חופשי</strong>:
    \\[ \\text{rank}(A) = n \\quad (\\dim \\ker(A) = 0) \\]
    במקרה זה המטריצה \\(A\\) (אם היא ריבועית) היא הפיכה, והפתרון הוא \\(x = A^{-1}b\\).</p>
  </div>
  <div style="background:var(--surface,#f8fafc);border:1px solid var(--accent,#3b82f6);border-radius:10px;padding:1rem;">
    <h4 style="margin:0 0 0.5rem;color:var(--accent,#3b82f6);">מצב 3: אינסוף פתרונות</h4>
    <p style="margin:0;font-size:13px;">אין שורת סתירה, אך <strong>יש לפחות משתנה חופשי אחד</strong>:
    \\[ \\text{rank}(A) \\lt n \\implies \\dim \\ker(A) = n - \\text{rank}(A) \\ge 1 \\]
    הפתרון הכללי נרשם כסכום: \\(x = x_p + x_h\\) (פתרון פרטי + מרחב הפתרונות של ההומוגנית).</p>
  </div>
</div>

<dl class="term-list">
  <dt>פעולות שורה אלמנטריות (Elementary Row Operations)</dt>
  <dd>שלוש הפעולות שאינן משנות את אוסף הפתרונות של המערכת:
    <ol>
      <li>החלפת שתי שורות: \\(R_i \\leftrightarrow R_j\\).</li>
      <li>כפל שורה בסקלר שונה מאפס: \\(R_i \\leftarrow c R_i\\) (\\(c \\ne 0\\)).</li>
      <li>הוספת כפולה של שורה לשורה אחרת: \\(R_j \\leftarrow R_j + c R_i\\).</li>
    </ol>
  </dd>
  <dt>צורה מדורגת ומדורגת קנונית (Row Echelon Form and RREF)</dt>
  <dd>מטריצה נמצאת בצורה <strong>מדורגת</strong> אם שורות האפסים בתחתית, ובכל שורה שאינה אפס, האיבר המוביל הראשון נמצא מימין למוביל של השורה מעליה.<br>
    היא <strong>מדורגת קנונית (RREF)</strong> אם בנוסף: כל מוביל הוא \\(1\\), ובעמודה של כל מוביל, כל שאר האיברים הם אפס!
  </dd>
  <dt>דרגת מטריצה (Matrix Rank)</dt>
  <dd>דרגת המטריצה, המסומנת \\(\\text{rank}(A)\\) או \\(\\rho(A)\\), היא מספר האיברים המובילים בצורתה המדורגת (שהוא גם מספר השורות שאינן שורות אפסים).
    היא שווה לממד מרחב השורות ולממד מרחב העמודות.
  </dd>
  <dt>מרחב האפס / גרעין של מטריצה (Nullspace / Kernel)</dt>
  <dd>עבור מטריצה \\(A \\in M_{m \\times n}\\), מרחב האפס הוא אוסף כל הפתרונות למערכת ההומוגנית \\(Ax = 0\\):
    \\[ \\ker(A) = \\text{Null}(A) = \\{x \\in \\mathbb{F}^n \\mid Ax = 0\\} \\]
    זהו תת־מרחב של \\(\\mathbb{F}^n\\).
  </dd>
  <dt>משפט הדרגה והאפסיות (Rank-Nullity Theorem for Matrices)</dt>
  <dd>לכל מטריצה \\(A \\in M_{m \\times n}\\) מתקיים תמיד:
    \\[ \\text{rank}(A) + \\dim \\ker(A) = n \\]
    כאשר \\(n\\) הוא מספר העמודות הכולל (מספר הנעלמים במערכת).
  </dd>
</dl>

<div class="panel">
  <h4>מתכון עבודה שלב־אחר־שלב: שיטת ה־"1 ו־0" לחילוץ בסיס למרחב האפס \\(\\ker(A)\\)</h4>
  <p>כדי למצוא בסיס למרחב הפתרונות של \\(Ax = 0\\) בביטחון מלא ובלי לפספס אף וקטור:</p>
  <ol>
    <li>מעמידים את המטריצה ההומוגנית ומדרגים אותה עד להגעה ל־<strong>RREF (צורה קנונית)</strong>.</li>
    <li>מזהים אילו עמודות אינן מכילות איבר מוביל. עמודות אלו מתאימות ל<strong>משתנים חופשיים</strong> (פרמטרים). נקרא להם למשל \\(s, t\\).</li>
    <li>רושמים את המשתנים המובילים כפונקציה של המשתנים החופשיים.</li>
    <li><strong>טריק ההצבה הישיר (הבטחת בת"ל):</strong>
      <ul>
        <li>כדי לקבל את וקטור הבסיס הראשון: מציבים \\(s=1\\) וכל שאר הפרמטרים \\(0\\).</li>
        <li>כדי לקבל את וקטור הבסיס השני: מציבים \\(t=1\\) וכל שאר הפרמטרים \\(0\\).</li>
      </ul>
      שיטה זו מבטיחה שהווקטורים שנקבל יהיו בלתי תלויים לינארית בוודאות מוחלטת!
    </li>
    <li>הקבוצה המכילה וקטורים אלה היא בסיס ל־\\(\\ker(A)\\), ומספרם שווה ל־\\(\\dim \\ker(A) = n - \\text{rank}(A)\\).</li>
  </ol>
</div>

<h3>דוגמאות פתורות צעד־אחר־צעד</h3>

<div class="panel">
  <p><strong>דוגמה 1 (קלה: מציאת בסיס וממד למרחב האפס \\(\\ker(A)\\)):</strong></p>
  <p>נמצא בסיס וממד למרחב האפס של המטריצה הבאה מגודל \\(3 \\times 4\\):
    \\[ A = \\begin{pmatrix} 1 & 2 & -1 & 3 \\\\ 2 & 4 & -1 & 8 \\\\ 3 & 6 & -1 & 13 \\end{pmatrix} \\]
  </p>
  <p><strong>פתרון מפורט צעד־אחר־צעד:</strong></p>
  <ol>
    <li>איפוס עמודה 1 מתחת למוביל הראשון:
      \\[ \\begin{pmatrix} 1 & 2 & -1 & 3 \\\\ 2 & 4 & -1 & 8 \\\\ 3 & 6 & -1 & 13 \\end{pmatrix}
      \\xrightarrow[R_3 \\leftarrow R_3 - 3R_1]{R_2 \\leftarrow R_2 - 2R_1}
      \\begin{pmatrix} 1 & 2 & -1 & 3 \\\\ 0 & 0 & 1 & 2 \\\\ 0 & 0 & 2 & 4 \\end{pmatrix} \\]
    </li>
    <li>איפוס עמודה 3 מתחת למוביל השני:
      \\[ \\begin{pmatrix} 1 & 2 & -1 & 3 \\\\ 0 & 0 & 1 & 2 \\\\ 0 & 0 & 2 & 4 \\end{pmatrix}
      \\xrightarrow{R_3 \\leftarrow R_3 - 2R_2}
      \\begin{pmatrix} 1 & 2 & -1 & 3 \\\\ 0 & 0 & 1 & 2 \\\\ 0 & 0 & 0 & 0 \\end{pmatrix} \\]
    </li>
    <li>הבאה לצורה קנונית (איפוס מעל המוביל של שורה 2):
      \\[ \\begin{pmatrix} 1 & 2 & -1 & 3 \\\\ 0 & 0 & 1 & 2 \\\\ 0 & 0 & 0 & 0 \\end{pmatrix}
      \\xrightarrow{R_1 \\leftarrow R_1 + R_2}
      \\begin{pmatrix} 1 & 2 & 0 & 5 \\\\ 0 & 0 & 1 & 2 \\\\ 0 & 0 & 0 & 0 \\end{pmatrix} \\]
    </li>
    <li>זיהוי משתנים:
      עמודות 1 ו־3 מכילות מובילים \\(\\implies x_1, x_3\\) משתנים מובילים.<br>
      עמודות 2 ו־4 אינן מכילות מובילים \\(\\implies x_2 = s, x_4 = t\\) משתנים חופשיים.
    </li>
    <li>חילוץ המשתנים המובילים:
      משורה 2: \\(x_3 + 2t = 0 \\implies x_3 = -2t\\).<br>
      משורה 1: \\(x_1 + 2s + 5t = 0 \\implies x_1 = -2s - 5t\\).
    </li>
    <li>הפעלת טריק ה־"1 ו־0":
      הצבה 1: נבחר \\(s = 1, t = 0\\):
      \\[ v_1 = \\begin{pmatrix} -2(1) - 5(0) \\\\ 1 \\\\ -2(0) \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 0 \\end{pmatrix} \\]
      הצבה 2: נבחר \\(s = 0, t = 1\\):
      \\[ v_2 = \\begin{pmatrix} -2(0) - 5(1) \\\\ 0 \\\\ -2(1) \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -5 \\\\ 0 \\\\ -2 \\\\ 1 \\end{pmatrix} \\]
    </li>
    <li>לכן בסיס למרחב האפס הוא:
      \\[ B = \\left\\{ \\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} -5 \\\\ 0 \\\\ -2 \\\\ 1 \\end{pmatrix} \\right\\} \\]
      וממד מרחב האפס הוא \\(\\dim \\ker(A) = 2\\). בדיקת משפט הממדים: \\(\\text{rank}(A) + \\dim \\ker(A) = 2 + 2 = 4 = n\\). מושלם!
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 2 (בינונית: פתרון מערכת לא־הומוגנית והצגת הפתרון כ־\\(x_p + x_h\\)):</strong></p>
  <p>נפתור את המערכת הלא־הומוגנית הבאה:
    \\[
    \\begin{cases}
    x + 2y + z = 4 \\\\
    2x + 4y + 3z = 9 \\\\
    3x + 6y + 4z = 13
    \\end{cases}
    \\]
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>נרשום את המטריצה המורחבת \\([A \\mid b]\\):
      \\[ \\left(\\begin{array}{ccc|c} 1 & 2 & 1 & 4 \\\\ 2 & 4 & 3 & 9 \\\\ 3 & 6 & 4 & 13 \\end{array}\\right) \\]
    </li>
    <li>נאפס את עמודה 1:
      \\[ \\xrightarrow[R_3 \\leftarrow R_3 - 3R_1]{R_2 \\leftarrow R_2 - 2R_1}
      \\left(\\begin{array}{ccc|c} 1 & 2 & 1 & 4 \\\\ 0 & 0 & 1 & 1 \\\\ 0 & 0 & 1 & 1 \\end{array}\\right) \\]
    </li>
    <li>נאפס את עמודה 3 בשורה 3 (\\(R_3 \\leftarrow R_3 - R_2\\)):
      \\[ \\left(\\begin{array}{ccc|c} 1 & 2 & 1 & 4 \\\\ 0 & 0 & 1 & 1 \\\\ 0 & 0 & 0 & 0 \\end{array}\\right) \\]
    </li>
    <li>נאפס מעל האיבר המוביל בעמודה 3 (\\(R_1 \\leftarrow R_1 - R_2\\)):
      \\[ \\left(\\begin{array}{ccc|c} 1 & 2 & 0 & 3 \\\\ 0 & 0 & 1 & 1 \\\\ 0 & 0 & 0 & 0 \\end{array}\\right) \\]
    </li>
    <li>אין שורת סתירה, ויש משתנה חופשי אחד (\\(y = t\\)). לכן יש אינסוף פתרונות!
      משורה 2: \\(z = 1\\).<br>
      משורה 1: \\(x + 2t = 3 \\implies x = 3 - 2t\\).
    </li>
    <li>נרשום את הפתרון כווקטור ונפרק לפתרון פרטי ולפתרון הומוגני:
      \\[ \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 3 - 2t \\\\ t \\\\ 1 \\end{pmatrix} = \\underbrace{\\begin{pmatrix} 3 \\\\ 0 \\\\ 1 \\end{pmatrix}}_{x_p \\text{ (פתרון פרטי)}} + t \\underbrace{\\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\end{pmatrix}}_{x_h \\text{ (מרחב האפס)}} \\]
      בדיקה: נציב את הפתרון הפרטי \\((3, 0, 1)\\) במשוואות המקוריות:
      \\(3 + 0 + 1 = 4\\) (נכון), \\(2(3) + 0 + 3(1) = 9\\) (נכון), \\(3(3) + 0 + 4(1) = 13\\) (נכון).
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 3 (ברמת לינארית 2: חקירת מערכת משוואות עם פרמטר \\(k\\) — סגנון בחינה קלאסי):</strong></p>
  <p>עבור אילו ערכי פרמטר \\(k \\in \\mathbb{R}\\) למערכת הבאה יש פתרון יחיד, אינסוף פתרונות, או אין פתרון כלל?
    \\[
    \\begin{cases}
    x + y + k z = 1 \\\\
    x + k y + z = 1 \\\\
    k x + y + z = 1
    \\end{cases}
    \\]
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>נחשב תחילה את הדטרמיננטה של מטריצת המקדמים:
      \\[ \\det(A) = \\det \\begin{pmatrix} 1 & 1 & k \\\\ 1 & k & 1 \\\\ k & 1 & 1 \\end{pmatrix} \\]
      נחסר את שורה 1 משורה 2 ומשורה 3:
      \\[ \\det \\begin{pmatrix} 1 & 1 & k \\\\ 0 & k - 1 & 1 - k \\\\ k - 1 & 0 & 1 - k^2 \\end{pmatrix} \\]
      נוציא גורם משותף \\((k-1)\\) משורה 2 ומשורה 3, ונחשב:
      \\[ \\det(A) = -(k - 1)^2 (k + 2) \\]
    </li>
    <li>לפי כלל קרמר: אם \\(\\det(A) \\ne 0\\), המטריצה הפיכה ולמערכת יש <strong>פתרון יחיד</strong>.
      לכן: <strong>עבור כל \\(k \\ne 1\\) ו־\\(k \\ne -2\\) קיים פתרון יחיד</strong>.
    </li>
    <li><strong>בדיקת נקודת הקצה \\(k = 1\\):</strong>
      נציב \\(k = 1\\) במערכת:
      כל שלוש המשוואות הופכות להיות בדיוק אותה משוואה: \\(x + y + z = 1\\)!
      המטריצה המדורגת היא \\([1 \\quad 1 \\quad 1 \\mid 1]\\). אין שורת סתירה, ויש \\(3 - 1 = 2\\) משתנים חופשיים.
      לכן: <strong>עבור \\(k = 1\\) יש אינסוף פתרונות (הפתרונות מהווים מישור דו־ממדי)</strong>.
    </li>
    <li><strong>בדיקת נקודת הקצה \\(k = -2\\):</strong>
      נציב \\(k = -2\\) במטריצה המורחבת:
      \\[ \\left(\\begin{array}{ccc|c} 1 & 1 & -2 & 1 \\\\ 1 & -2 & 1 & 1 \\\\ -2 & 1 & 1 & 1 \\end{array}\\right) \\]
      נחבר את כל שלוש השורות יחד:
      סכום אגפי שמאל: \\((1+1-2)x + (1-2+1)y + (-2+1+1)z = 0x + 0y + 0z = 0\\).<br>
      סכום אגפי ימין: \\(1 + 1 + 1 = 3\\).<br>
      קיבלנו את משוואת הסתירה: \\(0 = 3\\)!
      לכן: <strong>עבור \\(k = -2\\) אין פתרון כלל</strong>.
    </li>
  </ol>
</div>

<div class="linear-lab" data-linear-lab="gauss-nullspace"></div>
      `,
    },
    {
      id: "l0-span-indep",
      title: "מרחבים וקטוריים, פרישה ואי־תלות לינארית (Vector Spaces, Span, and Linear Independence)",
      html: `
<p>וקטור אינו חייב להיות חץ במישור הדו־ממדי. באלגברה לינארית מודרנית, וקטור הוא כל אובייקט מתמטי שמותר לחבר אותו עם אובייקטים דומים לו ולכפול אותו בסקלר. פולינומים הם וקטורים, מטריצות הן וקטורים, ואפילו פונקציות רציפות הן וקטורים. המשותף לכולם הוא שהם חיים בתוך <strong>מרחב וקטורי</strong>.</p>

<h3>אינטואיציה: מהו תת־מרחב, ומתי קבוצה אינה תת־מרחב?</h3>
<p>תת־מרחב הוא "עולם סגור ועצמאי" בתוך המרחב הגדול. אם תטיילו בתוכו בעזרת חיבורים וכפל בסקלרים, לעולם לא תיפלו החוצה.
כדי שקבוצה תהיה תת־מרחב, היא חייבת לקיים 3 תנאים פשוטים:
<ol>
  <li><strong>איבר האפס חייב להיות בפנים (\\(0 \\in W\\)):</strong> זהו המבחן המהיר ביותר לפסילת קבוצות! אם משוואת הקבוצה מכילה קבוע שאינו אפס (כמו \\(x + y = 1\\)), אז \\((0, 0)\\) לא מקיים את המשוואה (\\(0+0=0 \\ne 1\\)), והקבוצה <em>נפסלת בשנייה אחת</em> מלהיות תת־מרחב!</li>
  <li><strong>סגירות לחיבור:</strong> אם ניקח שני וקטורים מהקבוצה, סכומם חייב להישאר בקבוצה.</li>
  <li><strong>סגירות לכפל בסקלר:</strong> אם ניקח וקטור ונכפול אותו בכל מספר (חיובי, שלילי או אפס), התוצאה חייבת להישאר בקבוצה.</li>
</ol>
</p>

<!-- SVG Diagram: Subspace plane through origin vs Shifted plane -->
<svg viewBox="0 0 500 210" style="max-width:100%;height:auto;display:block;margin:1.5rem auto;background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:12px;" aria-label="איור גיאומטרי של תת־מרחב העובר בראשית מול מישור מוזז">
  <!-- Left Side: Valid Subspace (passes through 0) -->
  <g transform="translate(20, 10)">
    <rect width="210" height="185" rx="8" fill="var(--card,#ffffff)" stroke="var(--ok,#10b981)" stroke-width="1.5"/>
    <text x="105" y="24" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ok,#10b981)">תת־מרחב תקין: עובר בראשית (0,0,0)</text>

    <!-- 3D axes -->
    <line x1="105" y1="110" x2="190" y2="110" stroke="var(--ink,#94a3b8)" stroke-width="1.2"/>
    <line x1="105" y1="110" x2="105" y2="35" stroke="var(--ink,#94a3b8)" stroke-width="1.2"/>
    <line x1="105" y1="110" x2="45" y2="155" stroke="var(--ink,#94a3b8)" stroke-width="1.2"/>

    <!-- Slanted plane through origin -->
    <polygon points="50,140 160,85 180,115 70,170" fill="rgba(16,185,129,0.18)" stroke="var(--ok,#10b981)" stroke-width="1.8"/>

    <!-- Origin dot -->
    <circle cx="105" cy="110" r="4.5" fill="var(--ok,#10b981)"/>
    <text x="115" y="125" font-size="11.5" font-family="sans-serif" font-weight="bold" fill="var(--ok,#10b981)">(0,0,0) ∈ W</text>

    <text x="105" y="172" font-size="11" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#475569)">משוואה הומוגנית: 2x - y + z = 0</text>
  </g>

  <!-- Right Side: NOT a Subspace (shifted, does not contain 0) -->
  <g transform="translate(260, 10)">
    <rect width="210" height="185" rx="8" fill="var(--card,#ffffff)" stroke="var(--bad,#ef4444)" stroke-width="1.5"/>
    <text x="105" y="24" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--bad,#dc2626)">אינו תת־מרחב: מוזז מהראשית</text>

    <!-- 3D axes -->
    <line x1="105" y1="110" x2="190" y2="110" stroke="var(--ink,#94a3b8)" stroke-width="1.2"/>
    <line x1="105" y1="110" x2="105" y2="35" stroke="var(--ink,#94a3b8)" stroke-width="1.2"/>
    <line x1="105" y1="110" x2="45" y2="155" stroke="var(--ink,#94a3b8)" stroke-width="1.2"/>

    <!-- Shifted plane (does NOT pass through origin) -->
    <polygon points="50,95 160,40 180,70 70,125" fill="rgba(239,68,68,0.18)" stroke="var(--bad,#ef4444)" stroke-width="1.8"/>

    <!-- Origin dot outside -->
    <circle cx="105" cy="110" r="4.5" fill="var(--bad,#ef4444)"/>
    <text x="115" y="125" font-size="11.5" font-family="sans-serif" font-weight="bold" fill="var(--bad,#dc2626)">(0,0,0) ∉ W !</text>

    <text x="105" y="172" font-size="11" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#475569)">משוואה מוזזת: 2x - y + z = 1</text>
  </g>
</svg>

<h3>ההבדל בין פרישה (\\(\\text{Sp}\\)) לבין אי־תלות לינארית (בת"ל)</h3>
<ul>
  <li><strong>פרישה (\\(\\text{Sp}\\)) = יכולת הגעה וכיסוי:</strong> "לאן אפשר להגיע בעזרת צירופים לינאריים של הווקטורים האלה?". שני וקטורים שאינם על אותו ישר פורשים מישור שלם דו־ממדי; שלושה וקטורים שאינם באותו מישור פורשים מרחב תלת־ממדי שלם.</li>
  <li><strong>אי־תלות לינארית (בת"ל) = חיסכון ויעילות:</strong> "האם יש בקבוצה וקטור מיותר?". אם אפשר לבנות את אחד הווקטורים בעזרת האחרים, הוא "מיותר", אינו מוסיף שום כיוון חדש, והקבוצה <em>תלויה לינארית</em>. קבוצה היא בלתי תלויה לינארית אם <strong>כל וקטור פותח ממד חדש באמת</strong>.</li>
</ul>

<!-- Essential Reference Table -->
<div style="background:var(--card,#f8fafc);border:2px solid var(--accent,#3b82f6);border-radius:10px;padding:1rem;margin:1.5rem 0;">
  <h4 style="margin:0 0 0.5rem;color:var(--accent,#3b82f6);text-align:center;">טבלת הזהב: מתי שמים וקטורים בשורות ומתי בעמודות?</h4>
  <p style="margin:0 0 0.8rem;font-size:12.5px;text-align:center;color:var(--ink,#475569);">זהו הבלבול הטכני הנפוץ ביותר בקרב סטודנטים. שמרו טבלה זו מול העיניים!</p>
  <table style="width:100%;border-collapse:collapse;font-size:13px;text-align:right;">
    <thead>
      <tr style="background:rgba(59,130,246,0.1);border-bottom:2px solid var(--line,#cbd5e1);">
        <th style="padding:8px 12px;width:30%;">המשימה החישובית</th>
        <th style="padding:8px 12px;width:25%;">איפה שמים את הווקטורים?</th>
        <th style="padding:8px 12px;width:45%;">מדוע ולמה?</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid var(--line,#e2e8f0);">
        <td style="padding:8px 12px;font-weight:bold;">מציאת בסיס וממד למרחב נפרש \\(\\text{Sp}\\{v_1, \\dots, v_k\\}\\)</td>
        <td style="padding:8px 12px;color:var(--ok,#10b981);font-weight:bold;">בשורות המטריצה</td>
        <td style="padding:8px 12px;">פעולות שורה אינן משנות את מרחב השורות! וקטורים תלויים יתאפסו לשורות אפסים ויינשרו אוטומטית. השורות הנותרות הן בסיס.</td>
      </tr>
      <tr style="border-bottom:1px solid var(--line,#e2e8f0);background:var(--surface,#f8fafc);">
        <td style="padding:8px 12px;font-weight:bold;">מציאת בסיס לסכום תת־מרחבים \\(U + W\\)</td>
        <td style="padding:8px 12px;color:var(--ok,#10b981);font-weight:bold;">בשורות המטריצה</td>
        <td style="padding:8px 12px;">שמים את בסיס \\(U\\) ובסיס \\(W\\) יחד בשורות ומדרגים.</td>
      </tr>
      <tr style="border-bottom:1px solid var(--line,#e2e8f0);">
        <td style="padding:8px 12px;font-weight:bold;">בדיקת אי־תלות לינארית (בת"ל מול ת"ל)</td>
        <td style="padding:8px 12px;color:var(--accent,#3b82f6);font-weight:bold;">בעמודות המטריצה</td>
        <td style="padding:8px 12px;">פותרים \\(\\alpha_1 v_1 + \\dots + \\alpha_k v_k = 0\\). המקדמים הם הנעלמים שמוכפלים בעמודות. בת"ל \\(\\iff\\) אין משתנים חופשיים!</td>
      </tr>
      <tr style="border-bottom:1px solid var(--line,#e2e8f0);background:var(--surface,#f8fafc);">
        <td style="padding:8px 12px;font-weight:bold;">בדיקת שייכות וקטור \\(b\\) למרחב נפרש (\\(b \\in \\text{Sp}\\)?)</td>
        <td style="padding:8px 12px;color:var(--accent,#3b82f6);font-weight:bold;">בעמודות המטריצה</td>
        <td style="padding:8px 12px;">בודקים האם למערכת המורחבת \\([v_1 \\dots v_k \\mid b]\\) יש פתרון (אין שורת סתירה).</td>
      </tr>
      <tr>
        <td style="padding:8px 12px;font-weight:bold;">בניית מטריצת מעבר \\([I]_B^C\\) ומטריצה מייצגת \\([T]_B^C\\)</td>
        <td style="padding:8px 12px;color:var(--accent,#3b82f6);font-weight:bold;">בעמודות המטריצה</td>
        <td style="padding:8px 12px;">וקטורי הקואורדינטות מועמדים תמיד כעמודות המטריצה המייצגת.</td>
      </tr>
    </tbody>
  </table>
</div>

<dl class="term-list">
  <dt>מרחב וקטורי (Vector Space)</dt>
  <dd>קבוצה \\(V\\) מעל שדה \\(\\mathbb{F}\\) המצוידת בחיבור וקטורים ובכפל בסקלר, המקיימת 8 אקסיומות (סגירות, אסוציאטיביות, קומוטטיביות, איבר אפס, נגדי, ודיסטריבוטיביות).<br>
    מרחבים מרכזיים שנחקור:
    <ul>
      <li>\\(\\mathbb{F}^n\\): מרחב וקטורי העמודות הסטנדרטי ממימד \\(n\\).</li>
      <li>\\(M_{m \\times n}(\\mathbb{F})\\): מרחב המטריצות, בעל ממד \\(m \\cdot n\\).</li>
      <li>\\(\\mathbb{F}_n[x]\\): מרחב הפולינומים עם מקדמים מ־\\(\\mathbb{F}\\) ממעלה \\(\\le n\\), בעל ממד \\(n + 1\\).</li>
    </ul>
  </dd>
  <dt>תת־מרחב וקטורי (Vector Subspace)</dt>
  <dd>תת־קבוצה לא ריקה \\(W \\subseteq V\\) נקראת תת־מרחב אם ורק אם היא סגורה לחיבור וכפל בסקלר:
    \\[ 0 \\in W, \\quad \\forall u, v \\in W: u + v \\in W, \\quad \\forall \\alpha \\in \\mathbb{F}, v \\in W: \\alpha v \\in W \\]
    (קריטריון מקוצר: לכל \\(u, v \\in W\\) ו־\\(\\alpha \\in \\mathbb{F}\\), מתקיים \\(\\alpha u + v \\in W\\)).
  </dd>
  <dt>צירוף לינארי וקבוצה פורשת (Linear Combination and Span)</dt>
  <dd>צירוף לינארי של הווקטורים \\(v_1, \\dots, v_k\\) הוא וקטור מהצורה \\(v = \\alpha_1 v_1 + \\dots + \\alpha_k v_k\\) (\\(\\alpha_i \\in \\mathbb{F}\\)).<br>
    המרחב הנפרש על ידי הקבוצה \\(S = \\{v_1, \\dots, v_k\\}\\), המסומן \\(\\text{Sp}(S)\\) או \\(\\text{span}(S)\\), הוא אוסף <strong>כל הצירופים הלינאריים האפשריים</strong>. זהו תת־המרחב הקטן ביותר המכיל את \\(S\\).
  </dd>
  <dt>אי־תלות לינארית ותלות לינארית (Linear Independence and Dependence)</dt>
  <dd>הקבוצה \\(\\{v_1, \\dots, v_k\\}\\) נקראת <strong>בלתי תלויה לינארית (בת"ל)</strong> אם המשוואה:
    \\[ \\alpha_1 v_1 + \\alpha_2 v_2 + \\dots + \\alpha_k v_k = 0 \\]
    מתקיימת <strong>אך ורק</strong> עבור הפתרון הטריוויאלי: \\(\\alpha_1 = \\dots = \\alpha_k = 0\\).<br>
    אם קיים פתרון עם מקדמים שלא כולם אפס, הקבוצה נקראת <strong>תלויה לינארית (ת"ל)</strong>, מה שמעיד על כך שלפחות וקטור אחד ניתן להצגה כצירוף של שאר הווקטורים.
  </dd>
</dl>

<div class="panel">
  <h4>מתכוני עבודה שלב־אחר־שלב: בדיקת תת־מרחב, בדיקת שייכות ל־\\(\\text{Sp}\\), ובדיקת בת"ל</h4>
  <p><strong>מתכון 1: איך בודקים האם קבוצה \\(W\\) היא תת־מרחב?</strong></p>
  <ol>
    <li>בדיקת איבר האפס: מציבים את וקטור האפס במשוואות המגדירות את \\(W\\). אם הוא אינו מקיים את התנאי – עוצרים מיד: הקבוצה אינה תת־מרחב!</li>
    <li>לוקחים שני וקטורים כלליים \\(u, v \\in W\\) וסקלר \\(\\alpha \\in \\mathbb{F}\\).</li>
    <li>בודקים האם הצירוף \\(\\alpha u + v\\) מקיים את התנאי המגדיר של \\(W\\). אם כן – הקבוצה היא תת־מרחב.</li>
  </ol>
  <p><strong>מתכון 2: איך בודקים האם קבוצת וקטורים היא בת"ל?</strong></p>
  <ol>
    <li>מעמידים את הווקטורים כ<strong>עמודות</strong> במטריצה \\(A = \\begin{pmatrix} v_1 & \\dots & v_k \\end{pmatrix}\\).</li>
    <li>מדרגים את המטריצה לצורה מדורגת.</li>
    <li>אם <strong>בכל עמודה יש איבר מוביל</strong> (אין משתנים חופשיים, \\(\\text{rank}(A) = k\\)) \\(\\implies\\) הקבוצה היא <strong>בת"ל</strong>!</li>
    <li>אם יש עמודה ללא איבר מוביל (משתנה חופשי) \\(\\implies\\) הקבוצה היא <strong>תלויה לינארית (ת"ל)</strong>.</li>
  </ol>
</div>

<h3>דוגמאות פתורות צעד־אחר־צעד</h3>

<div class="panel">
  <p><strong>דוגמה 1 (קלה: בדיקת 3 קבוצות לתת־מרחב — מתי כן ומתי לא?):</strong></p>
  <p>נקבע עבור כל אחת מ־3 הקבוצות הבאות האם היא תת־מרחב וקטורי:</p>
  <ol>
    <li>\\(W_1 = \\{(x, y, z) \\in \\mathbb{R}^3 \\mid 2x - 3y + z = 0\\}\\):<br>
      <strong>כן, תת־מרחב!</strong>
      איבר האפס: \\(2(0) - 3(0) + 0 = 0\\) (מתקיים).
      סגירות: אם \\(u = (x_1, y_1, z_1)\\) ו־\\(v = (x_2, y_2, z_2)\\) מקיימים את המשוואה, אז עבור \\(\\alpha u + v\\):
      \\[ 2(\\alpha x_1 + x_2) - 3(\\alpha y_1 + y_2) + (\\alpha z_1 + z_2) = \\alpha(2x_1 - 3y_1 + z_1) + (2x_2 - 3y_2 + z_2) = \\alpha(0) + 0 = 0 \\]
      זהו מישור העובר דרך הראשית (גרעין של העתקה לינארית), ולכן תת־מרחב.
    </li>
    <li>\\(W_2 = \\{(x, y, z) \\in \\mathbb{R}^3 \\mid x + y + z = 1\\}\\):<br>
      <strong>לא תת־מרחב!</strong>
      נבדוק את איבר האפס: \\((0, 0, 0)\\). מתקיים \\(0 + 0 + 0 = 0 \\ne 1\\).
      מכיוון שווקטור האפס אינו שייך לקבוצה, היא אינה תת־מרחב.
    </li>
    <li>\\(W_3 = \\{(x, y) \\in \\mathbb{R}^2 \\mid xy = 0\\}\\) (איחוד שני הצירים):<br>
      <strong>לא תת־מרחב!</strong>
      איבר האפס שייך (\\(0 \\cdot 0 = 0\\)), והיא סגורה לכפל בסקלר. אך <strong>אינה סגורה לחיבור</strong>:
      הווקטור \\(u = (1, 0) \\in W_3\\) כי \\(1 \\cdot 0 = 0\\).<br>
      הווקטור \\(v = (0, 1) \\in W_3\\) כי \\(0 \\cdot 1 = 0\\).<br>
      אך סכומם הוא \\(u + v = (1, 1)\\), ומתקיים \\(1 \\cdot 1 = 1 \\ne 0\\)!
      הסכום נפל מחוץ לקבוצה, ולכן אינה תת־מרחב.
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 2 (בינונית: בדיקת שייכות ל־\\(\\text{Sp}\\) ובדיקת בת"ל ב־\\(\\mathbb{R}^3\\)):</strong></p>
  <p>נתונים הווקטורים ב־\\(\\mathbb{R}^3\\):
    \\[ v_1 = \\begin{pmatrix} 1 \\\\ 2 \\\\ 1 \\end{pmatrix}, \\quad v_2 = \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad v_3 = \\begin{pmatrix} 2 \\\\ 5 \\\\ 3 \\end{pmatrix} \\]
  </p>
  <p><strong>חלק א':</strong> האם הווקטור \\(b = \\begin{pmatrix} 1 \\\\ 3 \\\\ 2 \\end{pmatrix}\\) שייך ל־\\(\\text{Sp}\\{v_1, v_2\\}\\)?</p>
  <ol>
    <li>נחפש סקלרים \\(\\alpha, \\beta\\) כך ש־\\(\\alpha v_1 + \\beta v_2 = b\\):
      \\[ \\alpha \\begin{pmatrix} 1 \\\\ 2 \\\\ 1 \\end{pmatrix} + \\beta \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 3 \\\\ 2 \\end{pmatrix} \\]
    </li>
    <li>נרשום כמערכת משוואות:
      משורה 1: \\(\\alpha = 1\\).<br>
      משורה 2: \\(2\\alpha + \\beta = 3 \\implies 2(1) + \\beta = 3 \\implies \\beta = 1\\).<br>
      נבדוק בשורה 3: \\(\\alpha + \\beta = 1 + 1 = 2\\). מתאים במדויק לרכיב השלישי של \\(b\\)!
    </li>
    <li>מסקנה: \\(b = 1 v_1 + 1 v_2\\), ולכן \\(b \\in \\text{Sp}\\{v_1, v_2\\}\\).</li>
  </ol>
  <p><strong>חלק ב':</strong> האם הקבוצה \\(\\{v_1, v_2, v_3\\}\\) היא בלתי תלויה לינארית (בת"ל)?</p>
  <ol>
    <li>נשים את הווקטורים כעמודות במטריצה ונבדוק האם יש פתרון לא טריוויאלי למערכת ההומוגנית:
      \\[ \\begin{pmatrix} 1 & 0 & 2 \\\\ 2 & 1 & 5 \\\\ 1 & 1 & 3 \\end{pmatrix}
      \\xrightarrow[R_3 \\leftarrow R_3 - R_1]{R_2 \\leftarrow R_2 - 2R_1}
      \\begin{pmatrix} 1 & 0 & 2 \\\\ 0 & 1 & 1 \\\\ 0 & 1 & 1 \\end{pmatrix}
      \\xrightarrow{R_3 \\leftarrow R_3 - R_2}
      \\begin{pmatrix} 1 & 0 & 2 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix} \\]
    </li>
    <li>קיבלנו שורת אפסים! יש לנו משתנה חופשי (עמודה 3 ללא איבר מוביל).</li>
    <li>אם נבחר \\(\\alpha_3 = 1\\), נקבל: \\(\\alpha_2 = -1\\) ו־\\(\\alpha_1 = -2\\).
      הצירוף הלינארי: \\(-2 v_1 - v_2 + v_3 = 0 \\implies v_3 = 2 v_1 + v_2\\).
    </li>
    <li>מסקנה: הקבוצה <strong>תלויה לינארית (ת"ל)</strong>, שכן \\(v_3\\) הוא צירוף לינארי של שני הווקטורים האחרים.</li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 3 (ברמת לינארית 2: בדיקת אי־תלות לינארית במרחב הפולינומים \\(\\mathbb{R}_2[x]\\)):</strong></p>
  <p>נבדוק האם שלושת הפולינומים הבאים במרחב \\(\\mathbb{R}_2[x]\\) הם בת"ל או ת"ל:
    \\[ p_1(x) = 1 + x, \\quad p_2(x) = x + x^2, \\quad p_3(x) = 1 - x^2 \\]
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>נרשום את משוואת התלות הלינארית: נחפש סקלרים \\(\\alpha_1, \\alpha_2, \\alpha_3 \\in \\mathbb{R}\\) כך שמתקיים פולינום האפס:
      \\[ \\alpha_1 p_1(x) + \\alpha_2 p_2(x) + \\alpha_3 p_3(x) = 0 \\]
    </li>
    <li>נציב את הפולינומים המפורשים:
      \\[ \\alpha_1 (1 + x) + \\alpha_2 (x + x^2) + \\alpha_3 (1 - x^2) = 0 + 0x + 0x^2 \\]
    </li>
    <li>נכנס איברים לפי חזקות של \\(x\\):
      \\[ (\\alpha_1 + \\alpha_3) \\cdot 1 + (\\alpha_1 + \\alpha_2) \\cdot x + (\\alpha_2 - \\alpha_3) \\cdot x^2 = 0 \\]
    </li>
    <li>פולינום שווה לפולינום האפס אם ורק אם כל מקדמיו שווים לאפס. מתקבלת מערכת משוואות הומוגנית:
      \\[
      \\begin{cases}
      \\alpha_1 + \\alpha_3 = 0 & \\text{(מקדם החופשי)} \\\\
      \\alpha_1 + \\alpha_2 = 0 & \\text{(מקדם } x) \\\\
      \\alpha_2 - \\alpha_3 = 0 & \\text{(מקדם } x^2)
      \\end{cases}
      \\]
    </li>
    <li>נפתור את המערכת:
      ממשוואה 1: \\(\\alpha_3 = -\\alpha_1\\).<br>
      ממשוואה 2: \\(\\alpha_2 = -\\alpha_1\\).<br>
      נציב במשוואה 3: \\((-\\alpha_1) - (-\\alpha_1) = 0\\), שמתקיים תמיד לכל בחירה של \\(\\alpha_1\\)!
    </li>
    <li>קיבלנו פתרון לא טריוויאלי! אם נבחר \\(\\alpha_1 = 1\\), נקבל \\(\\alpha_2 = -1\\) ו־\\(\\alpha_3 = -1\\).
      הצירוף הוא:
      \\[ 1 \\cdot p_1(x) - 1 \\cdot p_2(x) - 1 \\cdot p_3(x) = (1+x) - (x+x^2) - (1-x^2) = 0 \\]
      כלומר: \\(p_1(x) = p_2(x) + p_3(x)\\).
    </li>
    <li>מסקנה: הפולינומים <strong>תלויים לינארית (ת"ל)</strong>.</li>
  </ol>
</div>

<div class="linear-lab" data-linear-lab="span-independence"></div>
      `,
    },
    {
      id: "l0-basis-dim-sum",
      title: "בסיס, ממד, משפט הממדים וסכום ישר (Basis, Dimension, Dimension Theorem, and Direct Sum)",
      html: `
<p>אם מרחב וקטורי הוא יקום של אינסוף וקטורים, ה<strong>בסיס</strong> הוא השלד הקומפקטי שלו. ברגע שאנו מכירים את איברי הבסיס, אנו שולטים בכל וקטור במרחב. המושג של <strong>פירוק לסכום ישר</strong> (\\(V = U \\oplus W\\)) הוא הכלי החשוב ביותר שישרת אותנו בלינארית 2: פירוק מרחב למרחב ניצב (\\(W^\\perp\\)) ביחידה 1, ופירוק ספקטרלי למרחבים עצמיים ביחידות 3 ו־10!</p>

<h3>אינטואיציה: נקודת האיזון המושלמת</h3>
<p>בסיס הוא נקודת האיזון המתמטית המושלמת בין שתי תכונות מנוגדות:
<ul>
  <li>הוא <strong>גדול מספיק כדי לפרוש</strong> את כל המרחב (אף כיוון אינו חסר).</li>
  <li>הוא <strong>קטן מספיק כדי להיות בת"ל</strong> (אין בו אף וקטור מיותר).</li>
</ul>
מספר הווקטורים בבסיס נקרא <strong>ממד המרחב</strong> (\\(\\dim V\\)). זהו מספר דרגות החופש של המרחב. במרחב ממימד \\(n\\), כל קבוצה פורשת מכילה לפחות \\(n\\) וקטורים, וכל קבוצה בת"ל מכילה לכל היותר \\(n\\) וקטורים. כאשר שניהם מתקיימים יחד עבור \\(n\\) וקטורים – זהו בסיס!</p>

<!-- SVG Diagram: Intersecting Planes vs Direct Sum -->
<svg viewBox="0 0 520 220" style="max-width:100%;height:auto;display:block;margin:1.5rem auto;background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:12px;" aria-label="איור חיתוך מישורים מול סכום ישר">
  <!-- Left Diagram: Intersecting Planes U and W in R^3 -->
  <g transform="translate(15, 15)">
    <rect width="235" height="190" rx="8" fill="var(--card,#ffffff)" stroke="var(--line,#cbd5e1)" stroke-width="1.2"/>
    <text x="117" y="24" font-size="12.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--accent,#3b82f6)">חיתוך מישורים: dim(U∩W) = 1</text>

    <!-- Plane U (blue) -->
    <polygon points="30,130 140,80 190,110 80,160" fill="rgba(59,130,246,0.18)" stroke="var(--accent,#3b82f6)" stroke-width="1.5"/>
    <text x="55" y="145" font-size="11" font-family="sans-serif" font-weight="bold" fill="var(--accent,#3b82f6)">מישור U (ממד 2)</text>

    <!-- Plane W (green) intersecting U -->
    <polygon points="110,40 180,60 110,180 40,160" fill="rgba(16,185,129,0.18)" stroke="var(--ok,#10b981)" stroke-width="1.5"/>
    <text x="155" y="55" font-size="11" font-family="sans-serif" font-weight="bold" fill="var(--ok,#10b981)">מישור W (ממד 2)</text>

    <!-- Intersection Line (orange) -->
    <line x1="110" y1="95" x2="110" y2="155" stroke="#f59e0b" stroke-width="3"/>
    <text x="120" y="130" font-size="11" font-family="sans-serif" font-weight="bold" fill="#d97706">ישר חיתוך U∩W (ממד 1)</text>

    <text x="117" y="180" font-size="10.5" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#475569)">משפט הממדים: 2 + 2 - 1 = 3 = dim(U+W)</text>
  </g>

  <!-- Right Diagram: Direct Sum Plane U and Line W -->
  <g transform="translate(270, 15)">
    <rect width="235" height="190" rx="8" fill="var(--card,#ffffff)" stroke="var(--ok,#10b981)" stroke-width="1.8"/>
    <text x="117" y="24" font-size="12.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ok,#10b981)">סכום ישר: R³ = U ⊕ W</text>

    <!-- Plane U (green) -->
    <polygon points="25,140 150,90 205,120 80,170" fill="rgba(16,185,129,0.18)" stroke="var(--ok,#10b981)" stroke-width="1.5"/>
    <text x="50" y="155" font-size="11" font-family="sans-serif" font-weight="bold" fill="var(--ok,#10b981)">מישור U (ממד 2)</text>

    <!-- Origin point -->
    <circle cx="115" cy="130" r="4.5" fill="var(--ink,#1e293b)"/>
    <text x="123" y="140" font-size="11" font-family="sans-serif" font-weight="bold" fill="var(--ink,#1e293b)">0</text>

    <!-- Line W cutting through origin (purple) -->
    <line x1="115" y1="130" x2="115" y2="35" stroke="#8b5cf6" stroke-width="2.8"/>
    <line x1="115" y1="130" x2="115" y2="185" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="3,3"/>
    <circle cx="115" cy="40" r="3.5" fill="#8b5cf6"/>
    <text x="125" y="50" font-size="11" font-family="sans-serif" font-weight="bold" fill="#8b5cf6)">ישר W (ממד 1)</text>

    <text x="117" y="172" font-size="10.5" font-family="sans-serif" text-anchor="middle" fill="var(--ok,#10b981)">U ∩ W = {0} בלבד! פירוק יחיד v = u + w</text>
    <text x="117" y="185" font-size="10.5" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#475569)">dim(U ⊕ W) = 2 + 1 = 3</text>
  </g>
</svg>

<dl class="term-list">
  <dt>בסיס סדור (Ordered Basis)</dt>
  <dd>קבוצה סדורה של וקטורים \\(B = (v_1, \\dots, v_n) \\subseteq V\\) נקראת בסיס אם:
    <ol>
      <li>היא בלתי תלויה לינארית (בת"ל).</li>
      <li>היא פורשת את המרחב: \\(\\text{Sp}(B) = V\\).</li>
    </ol>
    תכונת המפתח: <strong>כל וקטור \\(v \\in V\\) ניתן להצגה יחידה כצירוף לינארי של איברי הבסיס</strong>: \\(v = \\sum_{i=1}^n \\alpha_i v_i\\).
  </dd>
  <dt>ממד של מרחב וקטורי (Dimension of a Vector Space)</dt>
  <dd>מספר הווקטורים בבסיס של \\(V\\) הוא קבוע שאינו תלוי בבסיס הספציפי שנבחר, ומסומן \\(\\dim V\\).<br>
    אם \\(\\dim V = n\\), אזי:
    <ul>
      <li>כל \\(n\\) וקטורים בת"ל מהווים אוטומטית בסיס של \\(V\\).</li>
      <li>כל \\(n\\) וקטורים הפורשים את \\(V\\) מהווים אוטומטית בסיס של \\(V\\).</li>
      <li>כל קבוצה של יותר מ־\\(n\\) וקטורים היא בהכרח תלויה לינארית.</li>
    </ul>
  </dd>
  <dt>משפט השלמה לבסיס (Basis Extension Theorem)</dt>
  <dd>כל קבוצה בת"ל במרחב ממימד סופי ניתן להשלים לבסיס של המרחב כולו על ידי הוספת וקטורים מתאימים מתוך בסיס נתון של המרחב.</dd>
  <dt>סכום וחיתוך תת־מרחבים (Sum and Intersection of Subspaces)</dt>
  <dd>עבור שני תת־מרחבים \\(U, W \\subseteq V\\):
    <ul>
      <li>החיתוך \\(U \\cap W = \\{v \\in V \\mid v \\in U \\text{ וגם } v \\in W\\}\\) הוא תמיד תת־מרחב.</li>
      <li>הסכום \\(U + W = \\{u + w \\mid u \\in U, w \\in W\\}\\) הוא תת־מרחב (התת־מרחב הקטן ביותר המכיל את שניהם).</li>
    </ul>
  </dd>
  <dt>משפט הממדים לסכום תת־מרחבים (Dimension Theorem for Subspaces)</dt>
  <dd>לכל שני תת־מרחבים בעלי ממד סופי מתקיים:
    \\[ \\dim(U + W) = \\dim U + \\dim W - \\dim(U \\cap W) \\]
    (מקביל לעקרון ההכלה וההפרדה בתורת הקבוצות).
  </dd>
  <dt>סכום ישר ותת־מרחב משלים (Direct Sum and Complementary Subspace)</dt>
  <dd>הסכום \\(U + W\\) נקרא <strong>סכום ישר</strong> ומסומן \\(U \\oplus W\\) אם מתקיים אחד התנאים השקולים הבאים:
    <ol>
      <li>\\(U \\cap W = \\{0\\}\\) (נחתכים בווקטור האפס בלבד).</li>
      <li>כל וקטור בסכום מתפרק <strong>באופן יחיד</strong> כ־\\(v = u + w\\) (\\(u \\in U, w \\in W\\)).</li>
      <li>\\(\\dim(U + W) = \\dim U + \\dim W\\).</li>
    </ol>
    אם בנוסף \\(U \\oplus W = V\\), נאמר ש־\\(W\\) הוא <strong>תת־מרחב משלים</strong> ל־\\(U\\) בתוך \\(V\\).
  </dd>
</dl>

<div class="panel">
  <h4>ארבעת המתכונים המעשיים לטיפול בתת־מרחבים (ארגז הכלים המלא ללינארית 2)</h4>
  <p><strong>מתכון 1: ממשוואות הומוגניות לבסיס פורש:</strong> פותרים את המערכת ההומוגנית באמצעות דירוג ל־RREF, מזהים משתנים חופשיים, ומפעילים את שיטת ה־"1 ו־0".</p>
  <p><strong>מתכון 2: מבסיס פורש חזרה למשוואות הומוגניות:</strong> מציבים וקטור כללי \\((x_1, \\dots, x_n)\\) כעמודה חופשית מול עמודות הבסיס, מדרגים, וכל שורת אפסים בצד שמאל דורשת שהאיבר בצד ימין יתאפס – זוהי המשוואה!</p>
  <p><strong>מתכון 3: מציאת בסיס וממד לסכום \\(U + W\\):</strong> מעמידים את וקטורי הבסיס של \\(U\\) ואת וקטורי הבסיס של \\(W\\) כ<strong>שורות</strong> במטריצה אחת ומדרגים. השורות שאינן אפס הן בסיס ל־\\(U+W\\).</p>
  <p><strong>מתכון 4: מציאת בסיס וממד לחיתוך \\(U \\cap W\\):</strong> אם נתונות המשוואות של שניהם – פשוט מאחדים את כל המשוואות יחד למערכת אחת ופותרים. אם נתונים בסיסים – משווים \\(\\alpha_1 u_1 + \\dots = \\beta_1 w_1 + \\dots\\), מעבירים אגף ומוצאים את הווקטורים המשותפים.</p>
</div>

<h3>דוגמאות פתורות צעד־אחר־צעד</h3>

<div class="panel">
  <p><strong>דוגמה 1 (קלה: מציאת בסיס וממד והשלמת קבוצה בת"ל לבסיס של \\(\\mathbb{R}^4\\)):</strong></p>
  <p>נתון תת־המרחב \\(U \\subseteq \\mathbb{R}^4\\) המוגדר על ידי שתי המשוואות:
    \\[
    \\begin{cases}
    x_1 - 2x_2 + x_3 = 0 \\\\
    x_2 - x_4 = 0
    \\end{cases}
    \\]
    נמצא בסיס וממד ל־\\(U\\), ונשלים אותו לבסיס של \\(\\mathbb{R}^4\\) כולו.
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>המשתנים המובילים הם \\(x_1\\) ו־\\(x_2\\). המשתנים החופשיים הם \\(x_3, x_4\\).
      ממשוואה 2: \\(x_2 = x_4\\).<br>
      ממשוואה 1: \\(x_1 = 2x_2 - x_3 = 2x_4 - x_3\\).
    </li>
    <li>נציב \\((x_3=1, x_4=0)\\): \\(x_1 = -1, x_2 = 0 \\implies u_1 = \\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\\\ 0 \\end{pmatrix}\\).<br>
      נציב \\((x_3=0, x_4=1)\\): \\(x_1 = 2, x_2 = 1 \\implies u_2 = \\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\\\ 1 \\end{pmatrix}\\).
    </li>
    <li>בסיס ל־\\(U\\) הוא \\(\\{u_1, u_2\\}\\), ולכן \\(\\dim U = 2\\).</li>
    <li><strong>השלמה לבסיס של \\(\\mathbb{R}^4\\):</strong> עלינו להוסיף 2 וקטורים כך שנקבל 4 וקטורים בת"ל.
      נעמיד מטריצה ששורותיה הראשונות הן \\(u_1, u_2\\) ואחריהן איברי הבסיס הסטנדרטי \\(e_1, e_2, e_3, e_4\\):
      \\[ \\begin{pmatrix} -1 & 0 & 1 & 0 \\\\ 2 & 1 & 0 & 1 \\\\ 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\end{pmatrix} \\]
      נדרג שורות:
      \\(R_1 \\leftarrow -R_1 \\implies (1, 0, -1, 0)\\).<br>
      \\(R_2 \\leftarrow R_2 - 2R_1 \\implies (0, 1, 2, 1)\\).<br>
      \\(R_3 \\leftarrow R_3 - R_1 \\implies (0, 0, 1, 0)\\).<br>
      \\(R_4 \\leftarrow R_4 - R_2 \\implies (0, 0, -2, -1) \\xrightarrow{R_4 + 2R_3} (0, 0, 0, -1)\\).<br>
      כל 4 השורות הן בעלות איבר מוביל!
    </li>
    <li>לכן הבסיס המושלם ל־\\(\\mathbb{R}^4\\) הוא:
      \\[ B = \\left\\{ \\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} 2 \\\\ 1 \\\\ 0 \\\\ 1 \\end{pmatrix}, \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\\\ 0 \\end{pmatrix} \\right\\} \\]
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 2 (בינונית: חישוב מלא של \\(U \\cap W\\) ו־\\(U + W\\) ואימות משפט הממדים):</strong></p>
  <p>במרחב \\(\\mathbb{R}^3\\) נתונים תת־המרחבים:
    \\[ U = \\{(x, y, z) \\in \\mathbb{R}^3 \\mid z = 0\\} \\quad \\text{(מישור } xy) \\]
    \\[ W = \\{(x, y, z) \\in \\mathbb{R}^3 \\mid x - y + z = 0\\} \\]
    נמצא בסיס וממד ל־\\(U\\), ל־\\(W\\), לחיתוך \\(U \\cap W\\) ולסכום \\(U + W\\), ונאמת את משפט הממדים.
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li><strong>בסיס ל־\\(U\\):</strong> \\(z = 0\\), משתנים חופשיים \\(x, y\\).
      בסיס ל־\\(U\\) הוא \\(B_U = \\{(1, 0, 0), (0, 1, 0)\\}\\), ולכן \\(\\dim U = 2\\).
    </li>
    <li><strong>בסיס ל־\\(W\\):</strong> \\(y = x + z\\), משתנים חופשיים \\(x, z\\).
      נציב \\((1, 0) \\implies (1, 1, 0)\\); נציב \\((0, 1) \\implies (0, 1, 1)\\).
      בסיס ל־\\(W\\) הוא \\(B_W = \\{(1, 1, 0), (0, 1, 1)\\}\\), ולכן \\(\\dim W = 2\\).
    </li>
    <li><strong>בסיס וממד לחיתוך \\(U \\cap W\\):</strong>
      וקטור שייך לחיתוך אם ורק אם הוא מקיים את שתי המשוואות במקביל:
      \\[
      \\begin{cases}
      z = 0 \\\\
      x - y + z = 0
      \\end{cases}
      \\implies x - y + 0 = 0 \\implies x = y
      \\]
      לכן וקטור כללי בחיתוך הוא \\((t, t, 0) = t(1, 1, 0)\\).
      בסיס לחיתוך הוא \\(\\{(1, 1, 0)\\}\\), ולכן \\(\\dim(U \\cap W) = 1\\).
    </li>
    <li><strong>בסיס וממד לסכום \\(U + W\\):</strong>
      נשים את וקטורי הבסיס של \\(U\\) ושל \\(W\\) בשורות מטריצה ונדרג:
      \\[ \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 1 & 1 & 0 \\\\ 0 & 1 & 1 \\end{pmatrix}
      \\xrightarrow{R_3 \\leftarrow R_3 - R_1 - R_2}
      \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 1 & 1 \\end{pmatrix}
      \\xrightarrow{R_4 \\leftarrow R_4 - R_2}
      \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix} \\]
      יש 3 שורות שאינן אפס, והן פורשות את \\(\\mathbb{R}^3\\) כולו!
      לכן \\(U + W = \\mathbb{R}^3\\), וממדו \\(\\dim(U + W) = 3\\).
    </li>
    <li><strong>אימות משפט הממדים:</strong>
      \\[ \\dim(U + W) = \\dim U + \\dim W - \\dim(U \\cap W) \\implies 3 = 2 + 2 - 1 \\]
      השוויון \\(3 = 3\\) מתקיים במדויק!
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 3 (ברמת לינארית 2: הוכחת סכום ישר \\(\\mathbb{R}^3 = U \\oplus W\\) ופירוק וקטור לרכיביו היחידים):</strong></p>
  <p>במרחב \\(\\mathbb{R}^3\\) נתונים:
    \\[ U = \\{(x, y, z) \\in \\mathbb{R}^3 \\mid x + y - z = 0\\}, \\quad W = \\text{Sp}\\left\\{\\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}\\right\\} \\]
    נוכיח כי \\(\\mathbb{R}^3 = U \\oplus W\\), ונפרק את הווקטור \\(v = \\begin{pmatrix} 3 \\\\ 4 \\\\ 5 \\end{pmatrix}\\) באופן יחיד כ־\\(v = u + w\\) כאשר \\(u \\in U\\) ו־\\(w \\in W\\).
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li><strong>הוכחת סכום ישר:</strong>
      תחילה נבדוק את החיתוך \\(U \\cap W\\):
      וקטור כללי ב־\\(W\\) הוא \\(w = (\\alpha, 0, 0)^t\\).
      נבדוק מתי וקטור זה מקיים את משוואת \\(U\\):
      \\[ \\alpha + 0 - 0 = 0 \\implies \\alpha = 0 \\]
      לכן הווקטור היחיד בחיתוך הוא וקטור האפס: \\(U \\cap W = \\{0\\}\\).
      מכיוון ש־\\(U\\) מוגדר על ידי משוואה אחת שאינה טריוויאלית ב־\\(\\mathbb{R}^3\\), \\(\\dim U = 3 - 1 = 2\\).
      כמו כן \\(\\dim W = 1\\) (נפרש על ידי וקטור יחיד שאינו אפס).
      לפי משפט הממדים: \\(\\dim(U \\oplus W) = \\dim U + \\dim W = 2 + 1 = 3 = \\dim \\mathbb{R}^3\\).
      לכן מתקיים סכום ישר: \\(\\mathbb{R}^3 = U \\oplus W\\).
    </li>
    <li><strong>פירוק הווקטור \\(v = (3, 4, 5)^t\\):</strong>
      נחפש \\(w \\in W\\) כך ש־\\(u = v - w \\in U\\).
      מכיוון ש־\\(w \\in W\\), הוא מהצורה \\(w = (\\alpha, 0, 0)^t\\).
      לכן:
      \\[ u = v - w = \\begin{pmatrix} 3 \\\\ 4 \\\\ 5 \\end{pmatrix} - \\begin{pmatrix} \\alpha \\\\ 0 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 3 - \\alpha \\\\ 4 \\\\ 5 \\end{pmatrix} \\]
    </li>
    <li>נדרוש ש־\\(u \\in U\\), כלומר יקיים את משוואת המישור \\(x + y - z = 0\\):
      \\[ (3 - \\alpha) + 4 - 5 = 0 \\implies 2 - \\alpha = 0 \\implies \\alpha = 2 \\]
    </li>
    <li>לכן הרכיבים היחידים הם:
      \\[ w = \\begin{pmatrix} 2 \\\\ 0 \\\\ 0 \\end{pmatrix} \\in W, \\quad u = \\begin{pmatrix} 3 - 2 \\\\ 4 \\\\ 5 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 4 \\\\ 5 \\end{pmatrix} \\in U \\]
    </li>
    <li>בדיקות סופיות:
      \\(u \\in U\\): \\(1 + 4 - 5 = 0\\) (נכון).<br>
      \\(w \\in W\\): \\((2, 0, 0) = 2(1, 0, 0)\\) (נכון).<br>
      \\(u + w = (1+2, 4+0, 5+0) = (3, 4, 5) = v\\) (נכון).<br>
      הפירוק אומת והוא יחיד לחלוטין!
    </li>
  </ol>
</div>

<div class="linear-lab" data-linear-lab="subspaces-direct-sum"></div>
      `,
    },
    {
      id: "l0-coords-transition",
      title: "וקטורי קואורדינטות ומטריצת מעבר בסיס (Coordinate Vectors and Change of Basis)",
      html: `
<p>וקטורים יכולים להיות חיצים, פולינומים, או מטריצות. כיצד מחשב יכול לבצע חישובים על פולינום מופשט כמו \\(p(x) = 3 + 5x + 2x^2\\)? התשובה היא <strong>וקטורי קואורדינטות</strong>: ברגע שאנו קובעים בסיס סדור למרחב, כל וקטור מופשט מקבל "תעודת זהות" חד־משמעית – עמודת מספרים פשוטה ב־\\(\\mathbb{F}^n\\)!</p>

<h3>אינטואיציה: אנלוגיית השפות, המטבעות ורשתות הצירים</h3>
<p>חשבו על וקטור פיזיקלי \\(v\\) במרחב: הוא קיים בעולם ללא קשר לשום שפה או יחידות מדידה. הבסיס \\(B\\) הוא "סרגל המדידה" שלנו.
אם נמדוד חפץ בסנטימטרים נקבל מספר אחד (\\([v]_B\\)), ואם נמדוד אותו באינצ'ים נקבל מספר אחר (\\([v]_C\\)). החפץ עצמו לא גדל ולא זז מילימטר אחד! רק <strong>המספרים שמייצגים אותו השתנו בהתאם ליחידת המדידה שבחרנו</strong>.</p>
<p><strong>כיצד לא להתבלבל לעולם בסימון \\([I]_B^C\\)?</strong><br>
כלל העזר פשוט: <em>נכנס הבסיס התחתון (\\(B\\)) ויוצא הבסיס העליון (\\(C\\))</em>:
\\[ [I]_B^C [v]_B = [v]_C \\]
הבסיס הישן \\(B\\) "מצטמצם" בצד ימין, והבסיס החדש \\(C\\) מופיע כתוצאה!
עמודות המטריצה \\([I]_B^C\\) הן וקטורי הקואורדינטות של איברי הבסיס הישן \\(B\\) מפורקים לפי הבסיס החדש \\(C\\):
\\[ [I]_B^C = \\begin{pmatrix} [v_1]_C & [v_2]_C & \\dots & [v_n]_C \\end{pmatrix} \\]</p>

<!-- SVG Diagram: Dual Coordinate Grids Overlay -->
<svg viewBox="0 0 500 240" style="max-width:100%;height:auto;display:block;margin:1.5rem auto;background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:12px;" aria-label="איור רשת כפולה: קואורדינטות לפי שני בסיסים שונים">
  <defs>
    <marker id="arr-e" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--ink,#1e293b)"/>
    </marker>
    <marker id="arr-b" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent,#3b82f6)"/>
    </marker>
    <marker id="arr-target" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--ok,#10b981)"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="250" y="24" font-size="13.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">אותו וקטור w – שתי שפות קואורדינטות שונות!</text>

  <!-- Standard grid lines (gray dashed) -->
  <g stroke="var(--line,#e2e8f0)" stroke-width="1" stroke-dasharray="2,3">
    <line x1="80" y1="210" x2="80" y2="40"/>
    <line x1="140" y1="210" x2="140" y2="40"/>
    <line x1="200" y1="210" x2="200" y2="40"/>
    <line x1="260" y1="210" x2="260" y2="40"/>
    <line x1="320" y1="210" x2="320" y2="40"/>
    <line x1="380" y1="210" x2="380" y2="40"/>

    <line x1="40" y1="200" x2="440" y2="200"/>
    <line x1="40" y1="160" x2="440" y2="160"/>
    <line x1="40" y1="120" x2="440" y2="120"/>
    <line x1="40" y1="80" x2="440" y2="80"/>
  </g>

  <!-- Standard Axes (Origin at 80, 200) -->
  <line x1="80" y1="200" x2="420" y2="200" stroke="var(--ink,#1e293b)" stroke-width="2" marker-end="url(#arr-e)"/>
  <line x1="80" y1="200" x2="80" y2="45" stroke="var(--ink,#1e293b)" stroke-width="2" marker-end="url(#arr-e)"/>
  <text x="420" y="218" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--ink,#1e293b)">e₁ (ציר x)</text>
  <text x="90" y="55" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--ink,#1e293b)">e₂ (ציר y)</text>
  <text x="68" y="215" font-size="12" font-family="sans-serif" fill="var(--ink,#64748b)">0</text>

  <!-- Basis B vectors: v1 = (1, 1), v2 = (1, 2) -->
  <!-- scale: 1 unit = 50px x, 20px y => v1 = 80+50=130, 200-20=180 -->
  <line x1="80" y1="200" x2="140" y2="160" stroke="var(--accent,#3b82f6)" stroke-width="2.5" marker-end="url(#arr-b)"/>
  <text x="145" y="165" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--accent,#3b82f6)">v₁ = (1,1)</text>

  <line x1="80" y1="200" x2="140" y2="120" stroke="var(--accent,#3b82f6)" stroke-width="2.5" marker-end="url(#arr-b)"/>
  <text x="145" y="115" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--accent,#3b82f6)">v₂ = (1,2)</text>

  <!-- Target Vector w = 5e1 + 7e2 = 3v1 + 2v2 -->
  <!-- Target coordinates: x = 80 + 5*60 = 380, y = 200 - 7*18 = 74 -->
  <line x1="80" y1="200" x2="340" y2="70" stroke="var(--ok,#10b981)" stroke-width="3" marker-end="url(#arr-target)"/>
  <circle cx="340" cy="70" r="5" fill="var(--ok,#10b981)"/>

  <!-- Coordinates callouts -->
  <rect x="350" y="60" width="135" height="52" rx="6" fill="var(--card,#ffffff)" stroke="var(--ok,#10b981)" stroke-width="1.5"/>
  <text x="358" y="80" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--ink,#1e293b)">בבסיס סטנדרטי: [w]_E = (5, 7)ᵗ</text>
  <text x="358" y="100" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--accent,#3b82f6)">בבסיס B: [w]_B = (3, 2)ᵗ</text>

  <text x="250" y="230" font-size="11.5" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#475569)">הווקטור w הוא צירוף: w = 3 v₁ + 2 v₂ = 3(1,1) + 2(1,2) = (5, 7)</text>
</svg>

<dl class="term-list">
  <dt>וקטור קואורדינטות (Coordinate Vector)</dt>
  <dd>יהי \\(B = (v_1, \\dots, v_n)\\) בסיס סדור של מרחב וקטורי \\(V\\). מכיוון שכל \\(v \\in V\\) נרשם באופן יחיד כ־
    \\[ v = \\alpha_1 v_1 + \\dots + \\alpha_n v_n \\]
    וקטור הקואורדינטות של \\(v\\) לפי הבסיס \\(B\\) הוא וקטור העמודה של המקדמים:
    \\[ [v]_B = \\begin{pmatrix} \\alpha_1 \\\\ \\alpha_2 \\\\ \\vdots \\\\ \\alpha_n \\end{pmatrix} \\in \\mathbb{F}^n \\]
  </dd>
  <dt>איזומורפיזם הקואורדינטות (Coordinate Isomorphism)</dt>
  <dd>ההעתקה \\(v \\mapsto [v]_B\\) ממרחב \\(n\\)־ממדי מופשט \\(V\\) ל־\\(\\mathbb{F}^n\\) היא <strong>איזומורפיזם</strong> (העתקה חח"ע, על ושומרת על חיבור וכפל בסקלר):
    \\[ [u + v]_B = [u]_B + [v]_B, \\quad [c v]_B = c [v]_B \\]
    המשמעות: כל שאלה על פולינומים או מטריצות ניתן לתרגם לשאלה רגילה על עמודות מספרים!
  </dd>
  <dt>מטריצת מעבר בסיס (Change of Basis Matrix / Transition Matrix)</dt>
  <dd>אם \\(B = (v_1, \\dots, v_n)\\) בסיס ישן ו־\\(C = (u_1, \\dots, u_n)\\) בסיס חדש, מטריצת המעבר מ־\\(B\\) ל־\\(C\\) היא:
    \\[ [I]_B^C = \\begin{pmatrix} [v_1]_C & [v_2]_C & \\dots & [v_n]_C \\end{pmatrix} \\]
    היא מקיימת לכל וקטור:
    \\[ [v]_C = [I]_B^C [v]_B \\]
    מטריצת המעבר תמיד הפיכה, וההופכית שלה היא המעבר ההפוך: \\(([I]_B^C)^{-1} = [I]_C^B\\).
  </dd>
</dl>

<div class="panel">
  <h4>מתכון עבודה שלב־אחר־שלב: מציאת מטריצת מעבר בשיטת הדירוג הסימולטני</h4>
  <p>כאשר נתונים שני בסיסים כלליים \\(B\\) ו־\\(C\\) ב־\\(\\mathbb{F}^n\\) ורוצים למצוא את \\([I]_B^C\\) בלי להפוך מטריצות בנפרד:</p>
  <ol>
    <li>מעמידים את עמודות הבסיס החדש \\(C\\) בצד שמאל, ואת עמודות הבסיס הישן \\(B\\) בצד ימין:
      \\[ [C \\mid B] = \\left(\\begin{array}{ccc|ccc} u_1 & \\dots & u_n & v_1 & \\dots & v_n \\end{array}\\right) \\]
    </li>
    <li>מדרגים פעולות שורה עד שהצד השמאלי הופך למטריצת היחידה \\(I\\):
      \\[ [C \\mid B] \\xrightarrow{\\text{RREF}} [I \\mid [I]_B^C] \\]
    </li>
    <li>הצד הימני שמתקבל הוא באופן מיידי מטריצת המעבר \\([I]_B^C\\)! (מדוע? כי פעולות השורה שהופכות את \\(C\\) ל־\\(I\\) מפעילות עליו את \\(C^{-1}\\), ולכן בצד ימין מתקבל \\(C^{-1} B = [I]_B^C\\)).</li>
  </ol>
</div>

<h3>דוגמאות פתורות צעד־אחר־צעד</h3>

<div class="panel">
  <p><strong>דוגמה 1 (קלה: מעבר בסיס ב־\\(\\mathbb{R}^2\\) בין בסיס סטנדרטי לבסיס כללי):</strong></p>
  <p>במרחב \\(\\mathbb{R}^2\\), נתון הבסיס הסטנדרטי \\(E = (e_1, e_2)\\) ובסיס \\(B = (v_1, v_2) = \\left(\\begin{pmatrix}1\\\\1\\end{pmatrix}, \\begin{pmatrix}1\\\\2\\end{pmatrix}\\right)\\).
  נמצא את \\([I]_B^E\\), את \\([I]_E^B\\), ונחשב את \\([w]_B\\) עבור \\(w = \\begin{pmatrix}5\\\\7\\end{pmatrix}\\).</p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>עמודות הבסיס \\(B\\) כבר נתונות לפי הבסיס הסטנדרטי \\(E\\):
      \\[ [I]_B^E = \\begin{pmatrix} [v_1]_E & [v_2]_E \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\end{pmatrix} \\]
    </li>
    <li>מטריצת המעבר ההפוכה \\([I]_E^B\\) היא ההופכית שלה:
      \\[ \\det([I]_B^E) = 1 \\cdot 2 - 1 \\cdot 1 = 1 \\]
      \\[ [I]_E^B = \\left([I]_B^E\\right)^{-1} = \\frac{1}{1} \\begin{pmatrix} 2 & -1 \\\\ -1 & 1 \\end{pmatrix} = \\begin{pmatrix} 2 & -1 \\\\ -1 & 1 \\end{pmatrix} \\]
    </li>
    <li>נשתמש בה כדי למצוא את הקואורדינטות של \\(w\\) בבסיס \\(B\\):
      \\[ [w]_B = [I]_E^B [w]_E = \\begin{pmatrix} 2 & -1 \\\\ -1 & 1 \\end{pmatrix} \\begin{pmatrix} 5 \\\\ 7 \\end{pmatrix} = \\begin{pmatrix} 2\\cdot 5 + (-1)\\cdot 7 \\\\ (-1)\\cdot 5 + 1\\cdot 7 \\end{pmatrix} = \\begin{pmatrix} 10 - 7 \\\\ -5 + 7 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} \\]
    </li>
    <li>בדיקה:
      \\[ 3 v_1 + 2 v_2 = 3 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} + 2 \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 3+2 \\\\ 3+4 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 7 \\end{pmatrix} = w \\]
      הבדיקה אוששה במדויק!
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 2 (בינונית: מעבר בין שני בסיסים כלליים ב־\\(\\mathbb{R}^3\\) בשיטת הדירוג הסימולטני):</strong></p>
  <p>במרחב \\(\\mathbb{R}^3\\) נתונים שני בסיסים לא־סטנדרטיים:
    \\[ B = (v_1, v_2, v_3) = \\left( \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\right) \\]
    \\[ C = (u_1, u_2, u_3) = \\left( \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix} \\right) \\]
    נמצא את מטריצת המעבר \\([I]_B^C\\) בשיטת הדירוג הסימולטני \\([C \\mid B] \\to [I \\mid [I]_B^C]\\).
  </p>
  <p><strong>פתרון מפורט צעד־אחר־צעד:</strong></p>
  <ol>
    <li>מעמידים את המטריצה המורחבת הכפולה:
      \\[ [C \\mid B] = \\left(\\begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & 1 & 1 \\\\ 1 & 1 & 0 & 0 & 1 & 1 \\\\ 0 & 1 & 1 & 0 & 0 & 1 \\end{array}\\right) \\]
    </li>
    <li>פעולת שורה 1: נאפס את האיבר מתחת למוביל הראשון (\\(R_2 \\leftarrow R_2 - R_1\\)):
      \\[ R_2 - R_1 = (1-1, 1-0, 0-0 \\mid 0-1, 1-1, 1-1) = (0, 1, 0 \\mid -1, 0, 0) \\]
      המטריצה הופכת ל־:
      \\[ \\left(\\begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & 1 & 1 \\\\ 0 & 1 & 0 & -1 & 0 & 0 \\\\ 0 & 1 & 1 & 0 & 0 & 1 \\end{array}\\right) \\]
    </li>
    <li>פעולת שורה 2: נאפס את האיבר מתחת למוביל השני (\\(R_3 \\leftarrow R_3 - R_2\\)):
      \\[ R_3 - R_2 = (0-0, 1-1, 1-0 \\mid 0 - (-1), 0-0, 1-0) = (0, 0, 1 \\mid 1, 0, 1) \\]
      המטריצה הופכת ל־:
      \\[ \\left(\\begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & 1 & 1 \\\\ 0 & 1 & 0 & -1 & 0 & 0 \\\\ 0 & 0 & 1 & 1 & 0 & 1 \\end{array}\\right) \\]
    </li>
    <li>הצד השמאלי הוא בדיוק מטריצת היחידה \\(I_3\\)! לכן הצד הימני הוא מיידית מטריצת המעבר:
      \\[ [I]_B^C = \\begin{pmatrix} 1 & 1 & 1 \\\\ -1 & 0 & 0 \\\\ 1 & 0 & 1 \\end{pmatrix} \\]
    </li>
    <li>בדיקה: נבדוק את העמודה הראשונה \\([v_1]_C = \\begin{pmatrix}1\\\\-1\\\\1\\end{pmatrix}\\):
      \\[ 1 \\cdot u_1 - 1 \\cdot u_2 + 1 \\cdot u_3 = \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix} - \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix} = v_1 \\]
      הבדיקה מדויקת לחלוטין!
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 3 (ברמת לינארית 2: קואורדינטות ומטריצת מעבר במרחב הפולינומים \\(\\mathbb{R}_2[x]\\)):</strong></p>
  <p>במרחב הפולינומים \\(\\mathbb{R}_2[x]\\), נתון הבסיס הסטנדרטי \\(E = (1, x, x^2)\\) ובסיס חדש:
    \\[ B = (1, 1 + x, 1 + x + x^2) \\]
    נמצא את וקטור הקואורדינטות \\([p]_B\\) של הפולינום \\(p(x) = 3 + 5x + 2x^2\\).
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>בבסיס הסטנדרטי \\(E\\), הקואורדינטות של \\(p\\) הן פשוט המקדמים שלו:
      \\[ [p]_E = \\begin{pmatrix} 3 \\\\ 5 \\\\ 2 \\end{pmatrix} \\]
    </li>
    <li>מטריצת המעבר מ־\\(B\\) ל־\\(E\\) מורכבת מפירוק איברי \\(B\\) לפי \\(E\\):
      איבר 1: \\(1 = 1(1) + 0(x) + 0(x^2) \\implies \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}\\).<br>
      איבר 2: \\(1+x = 1(1) + 1(x) + 0(x^2) \\implies \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}\\).<br>
      איבר 3: \\(1+x+x^2 = 1(1) + 1(x) + 1(x^2) \\implies \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix}\\).<br>
      לכן:
      \\[ [I]_B^E = \\begin{pmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix} \\]
    </li>
    <li>ההופכית שלה (המעבר מ־\\(E\\) ל־\\(B\\)) מחושבת בדירוג או באלגוריתם:
      \\[ [I]_E^B = \\left([I]_B^E\\right)^{-1} = \\begin{pmatrix} 1 & -1 & 0 \\\\ 0 & 1 & -1 \\\\ 0 & 0 & 1 \\end{pmatrix} \\]
    </li>
    <li>נחשב את הקואורדינטות של \\(p\\) בבסיס \\(B\\):
      \\[ [p]_B = [I]_E^B [p]_E = \\begin{pmatrix} 1 & -1 & 0 \\\\ 0 & 1 & -1 \\\\ 0 & 0 & 1 \\end{pmatrix} \\begin{pmatrix} 3 \\\\ 5 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 3 - 5 + 0 \\\\ 0 + 5 - 2 \\\\ 0 + 0 + 2 \\end{pmatrix} = \\begin{pmatrix} -2 \\\\ 3 \\\\ 2 \\end{pmatrix} \\]
    </li>
    <li>בדיקה: נחבר את הצירוף:
      \\[ -2(1) + 3(1 + x) + 2(1 + x + x^2) = -2 + (3 + 3x) + (2 + 2x + 2x^2) = 3 + 5x + 2x^2 = p(x) \\]
      הבדיקה מאומתת!
    </li>
  </ol>
</div>

<div class="linear-lab" data-linear-lab="change-of-basis-2d"></div>
      `,
    },
    {
      id: "l0-linear-maps-ker-im",
      title: "העתקות לינאריות, גרעין ותמונה (Linear Transformations, Kernel, and Image)",
      html: `
<p>העתקה לינארית (טרנספורמציה לינארית) היא פונקציה בין שני מרחבים וקטוריים השומרת על המבנה שלהם: ישרים נשארים ישרים, והראשית נשארת בראשית (\\(T(0) = 0\\)). בלינארית 2, כל הנושאים המרכזיים – העתקות צמודות, העתקות אוניטריות, הטלות והעתקות חיוביות – הם סוגים של העתקות לינאריות בעלות תכונות גיאומטריות מיוחדות.</p>

<h3>אינטואיציה: דיאגרמת "צינור הממדים" ומשפט שימור הממד</h3>
<p>מה קורה כשמפעילים העתקה לינארית \\(T: V \\to W\\)? מרחב המקור \\(V\\) (בעל ממד \\(n\\)) נשלח אל תוך מרחב היעד \\(W\\). חלק מהממדים עשויים "להימעך" לאפס – זהו ה<strong>גרעין</strong> (\\(\\ker T\\)). שאר הממדים שורדים וממלאים תת־מרחב בתוך היעד – זוהי ה<strong>תמונה</strong> (\\(\\text{Im } T\\)).</p>
<p><strong>משפט הממד להעתקות (Rank-Nullity Theorem) הוא חוק שימור הממד:</strong>
\\[ \\dim V = \\dim \\ker(T) + \\dim \\text{Im}(T) \\]
אף ממד אינו הולך לאיבוד! סך הממדים שנמעכו לאפס ועוד סך הממדים ששרדו בתמונה שווה במדויק לממד המקור \\(V\\).</p>
<ul>
  <li>אם \\(\\ker(T) = \\{0\\}\\), שום דבר לא נמעך לאפס, המידע נשמר בשלמותו, וההעתקה היא <strong>חד־חד־ערכית (חח"ע)</strong>.</li>
  <li>אם \\(\\text{Im}(T) = W\\), התמונה מכסה את כל מרחב היעד, וההעתקה היא <strong>על</strong>.</li>
  <li>אם הממדים שווים (\\(\\dim V = \\dim W\\)), מתקיים הנס הלינארי: <strong>חח"ע \\(\\iff\\) על \\(\\iff\\) הפיכה!</strong></li>
</ul>

<!-- SVG Diagram: Dimension Pipe -->
<svg viewBox="0 0 520 220" style="max-width:100%;height:auto;display:block;margin:1.5rem auto;background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:12px;" aria-label="איור צינור הממדים: גרעין ותמונה">
  <defs>
    <marker id="arr-pipe" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent,#3b82f6)"/>
    </marker>
    <marker id="arr-bad" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--bad,#ef4444)"/>
    </marker>
  </defs>

  <!-- Domain Ellipse V -->
  <ellipse cx="120" cy="115" rx="85" ry="75" fill="var(--card,#ffffff)" stroke="var(--ink,#1e293b)" stroke-width="1.8"/>
  <text x="120" y="32" font-size="13.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">מרחב המקור V (ממד n)</text>

  <!-- Kernel sub-ellipse (red) -->
  <ellipse cx="120" cy="135" rx="45" ry="32" fill="rgba(239,68,68,0.15)" stroke="var(--bad,#ef4444)" stroke-width="1.8"/>
  <text x="120" y="138" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--bad,#dc2626)">ker(T) (גרעין)</text>
  <text x="120" y="153" font-size="10.5" font-family="sans-serif" text-anchor="middle" fill="var(--bad,#dc2626)">נמעך לאפס!</text>

  <!-- Codomain Ellipse W -->
  <ellipse cx="400" cy="115" rx="85" ry="75" fill="var(--card,#ffffff)" stroke="var(--ink,#1e293b)" stroke-width="1.8"/>
  <text x="400" y="32" font-size="13.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">מרחב היעד W (ממד m)</text>

  <!-- Image sub-ellipse (green/blue) -->
  <ellipse cx="400" cy="100" rx="58" ry="42" fill="rgba(16,185,129,0.15)" stroke="var(--ok,#10b981)" stroke-width="1.8"/>
  <text x="400" y="95" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ok,#10b981)">Im(T) (תמונה)</text>
  <text x="400" y="112" font-size="10.5" font-family="sans-serif" text-anchor="middle" fill="var(--ok,#10b981)">כל הווקטורים שמתקבלים</text>

  <!-- Zero point in W -->
  <circle cx="400" cy="165" r="4.5" fill="var(--bad,#ef4444)"/>
  <text x="415" y="170" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--bad,#ef4444)">0_W</text>

  <!-- Arrows from V to W -->
  <!-- Arrow from Ker to 0_W -->
  <path d="M 165 140 Q 280 180 392 166" fill="none" stroke="var(--bad,#ef4444)" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arr-bad)"/>
  <text x="270" y="188" font-size="11" font-family="sans-serif" font-weight="bold" fill="var(--bad,#ef4444)">קריסת הגרעין: T(v) = 0</text>

  <!-- Arrow from Rest to Im(T) -->
  <path d="M 185 85 Q 280 50 340 85" fill="none" stroke="var(--accent,#3b82f6)" stroke-width="2.5" marker-end="url(#arr-pipe)"/>
  <text x="265" y="55" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--accent,#3b82f6)">T (העתקה לינארית)</text>

  <!-- Bottom formula -->
  <text x="260" y="212" font-size="12.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">משפט הממד: dim V = dim ker(T) + dim Im(T)</text>
</svg>

<dl class="term-list">
  <dt>העתקה לינארית (Linear Transformation)</dt>
  <dd>פונקציה \\(T: V \\to W\\) בין שני מרחבים וקטוריים מעל אותו שדה \\(\\mathbb{F}\\) נקראת לינארית אם לכל \\(u, v \\in V\\) ולכל \\(\\alpha \\in \\mathbb{F}\\):
    \\[ T(u + v) = T(u) + T(v), \\quad T(\\alpha u) = \\alpha T(u) \\]
    תכונה הכרחית: כל העתקה לינארית מעבירה את האפס לאפס: \\(T(0_V) = 0_W\\).
  </dd>
  <dt>גרעין ההעתקה (Kernel / Nullspace)</dt>
  <dd>אוסף כל הווקטורים במרחב המקור \\(V\\) ש־\\(T\\) שולחת לווקטור האפס:
    \\[ \\ker(T) = \\{v \\in V \\mid T(v) = 0_W\\} \\]
    הגרעין הוא תמיד <strong>תת־מרחב של מרחב המקור \\(V\\)</strong>.<br>
    <strong>תנאי חח"ע:</strong> \\(T\\) חח"ע \\(\\iff \\ker(T) = \\{0_V\\}\\).
  </dd>
  <dt>תמונת ההעתקה (Image / Range)</dt>
  <dd>אוסף כל הווקטורים במרחב היעד \\(W\\) שמתקבלים כפלט של \\(T\\):
    \\[ \\text{Im}(T) = \\{T(v) \\mid v \\in V\\} \\]
    התמונה היא תמיד <strong>תת־מרחב של מרחב היעד \\(W\\)</strong>.<br>
    אם \\(B = \\{v_1, \\dots, v_n\\}\\) בסיס של \\(V\\), אז התמונה נפרשת על ידי תמונות איברי הבסיס:
    \\[ \\text{Im}(T) = \\text{Sp}\\{T(v_1), \\dots, T(v_n)\\} \\]
    <strong>תנאי על:</strong> \\(T\\) על \\(\\iff \\text{Im}(T) = W\\).
  </dd>
  <dt>משפט הממד להעתקות לינאריות (Rank-Nullity Theorem)</dt>
  <dd>אם \\(V\\) מרחב ממימד סופי, אז:
    \\[ \\dim V = \\dim \\ker(T) + \\dim \\text{Im}(T) \\]
    אם בנוסף \\(\\dim V = \\dim W\\), אזי שלושת התנאים הבאים שקולים: \\(T\\) חח"ע \\(\\iff\\) \\(T\\) על \\(\\iff\\) \\(T\\) הפיכה.
  </dd>
  <dt>הטלה על תת־מרחב (Projection Operator)</dt>
  <dd>אם \\(V = U \\oplus W\\), כל וקטור נרשם באופן יחיד כ־\\(v = u + w\\) (\\(u \\in U, w \\in W\\)). ההעתקה \\(P: V \\to V\\) המוגדרת על ידי \\(P(v) = u\\) נקראת <strong>הטלה על \\(U\\) במקביל ל־\\(W\\)</strong>.<br>
    היא מקיימת:
    \\[ P^2 = P \\quad (\\text{אידמפוטנטיות}), \\quad \\text{Im}(P) = U, \\quad \\ker(P) = W \\]
  </dd>
</dl>

<div class="panel">
  <h4>מתכון עבודה שלב־אחר־שלב: חקירה מלאה של העתקה לינארית</h4>
  <ol>
    <li><strong>מציאת בסיס וממד ל־\\(\\ker(T)\\):</strong> פותרים את המערכת ההומוגנית \\(T(v) = 0\\). מחלצים משתנים חופשיים ומשתמשים בשיטת ה־"1 ו־0". ממד הגרעין הוא מספר המשתנים החופשיים.</li>
    <li><strong>מציאת בסיס וממד ל־\\(\\text{Im}(T)\\):</strong> מפעילים את \\(T\\) על איברי הבסיס הסטנדרטי של \\(V\\). מעמידים את התמונות \\(T(e_1), \\dots, T(e_n)\\) בשורות מטריצה ומדרגים. השורות שאינן אפס הן בסיס ל־\\(\\text{Im}(T)\\).</li>
    <li><strong>אימות משפט הממד:</strong> בודקים שמתקיים: \\(\\dim \\ker(T) + \\dim \\text{Im}(T) = \\dim V\\).</li>
    <li><strong>בדיקת חח"ע ועל:</strong>
      חח"ע אם ורק אם \\(\\dim \\ker(T) = 0\\).<br>
      על אם ורק אם \\(\\dim \\text{Im}(T) = \\dim W\\).
    </li>
  </ol>
</div>

<h3>דוגמאות פתורות צעד־אחר־צעד</h3>

<div class="panel">
  <p><strong>דוגמה 1 (קלה: חקירה מלאה של העתקה \\(T: \\mathbb{R}^3 \\to \\mathbb{R}^3\\)):</strong></p>
  <p>נתונה ההעתקה הלינארית:
    \\[ T(x, y, z) = (x + 2y - z, \\ 2x + 4y - 2z, \\ -x - 2y + z) \\]
    נמצא בסיס וממד ל־\\(\\ker(T)\\) ול־\\(\\text{Im}(T)\\), נבדוק האם \\(T\\) חח"ע או על, ונאמת את משפט הממד.
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li><strong>מציאת הגרעין \\(\\ker(T)\\):</strong>
      נשווה את פלט ההעתקה לווקטור האפס:
      \\[
      \\begin{cases}
      x + 2y - z = 0 \\\\
      2x + 4y - 2z = 0 \\\\
      -x - 2y + z = 0
      \\end{cases}
      \\]
      שימו לב: שורה 2 היא \\(2 \\cdot R_1\\) ושורה 3 היא \\(-R_1\\)!
      לכן שתי המשוואות מתאפסות, ונותרנו עם משוואה אחת בלבד:
      \\[ x + 2y - z = 0 \\implies x = -2y + z \\]
      המשתנים החופשיים הם \\(y\\) ו־\\(z\\). נציב לפי שיטת ה־"1 ו־0":
      הצבה 1: \\((y=1, z=0) \\implies x = -2 \\implies v_1 = \\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\end{pmatrix}\\).<br>
      הצבה 2: \\((y=0, z=1) \\implies x = 1 \\implies v_2 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix}\\).<br>
      לכן בסיס ל־\\(\\ker(T)\\) הוא \\(\\{v_1, v_2\\}\\), וממדו \\(\\dim \\ker(T) = 2\\).
    </li>
    <li><strong>מציאת התמונה \\(\\text{Im}(T)\\):</strong>
      נפעיל את \\(T\\) על איברי הבסיס הסטנדרטי:
      \\(T(1, 0, 0) = (1, 2, -1)\\).<br>
      \\(T(0, 1, 0) = (2, 4, -2) = 2(1, 2, -1)\\).<br>
      \\(T(0, 0, 1) = (-1, -2, 1) = -1(1, 2, -1)\\).<br>
      כל התמונות הן כפולות של הווקטור \\((1, 2, -1)\\)!
      לכן בסיס לתמונה הוא \\(\\left\\{\\begin{pmatrix} 1 \\\\ 2 \\\\ -1 \\end{pmatrix}\\right\\}\\), וממדה \\(\\dim \\text{Im}(T) = 1\\).
    </li>
    <li><strong>אימות משפט הממד:</strong>
      \\[ \\dim \\ker(T) + \\dim \\text{Im}(T) = 2 + 1 = 3 = \\dim \\mathbb{R}^3 \\]
    </li>
    <li><strong>חח"ע ועל:</strong>
      \\(T\\) <strong>אינה חח"ע</strong> כי \\(\\dim \\ker(T) = 2 \\ne 0\\).<br>
      \\(T\\) <strong>אינה על</strong> כי \\(\\dim \\text{Im}(T) = 1 \\ne 3 = \\dim \\mathbb{R}^3\\).
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 2 (בינונית: העתקה לינארית במרחב המטריצות \\(M_{2 \\times 2}(\\mathbb{R})\\)):</strong></p>
  <p>נתבונן בהעתקה \\(T: M_{2 \\times 2}(\\mathbb{R}) \\to M_{2 \\times 2}(\\mathbb{R})\\) המוגדרת על ידי:
    \\[ T(A) = A - A^t \\]
    נמצא בסיס וממד לגרעין ולתמונה, ונאמת את משפט הממד.
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li><strong>הגרעין \\(\\ker(T)\\):</strong>
      \\[ A \\in \\ker(T) \\iff T(A) = 0 \\iff A - A^t = 0 \\iff A = A^t \\]
      הגרעין הוא בדיוק <strong>תת־מרחב המטריצות הסימטריות</strong>!
      מטריצה סימטרית כללית \\(2 \\times 2\\) היא מהצורה \\(\\begin{pmatrix} a & b \\\\ b & c \\end{pmatrix}\\):
      \\[ \\begin{pmatrix} a & b \\\\ b & c \\end{pmatrix} = a \\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix} + b \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} + c \\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix} \\]
      לכן בסיס ל־\\(\\ker(T)\\) מכיל 3 מטריצות, וממדו \\(\\dim \\ker(T) = 3\\).
    </li>
    <li><strong>התמונה \\(\\text{Im}(T)\\):</strong>
      נבדוק את תכונות הפלט: לכל מטריצה \\(A\\),
      \\[ (T(A))^t = (A - A^t)^t = A^t - (A^t)^t = A^t - A = -(A - A^t) = -T(A) \\]
      כלומר כל פלט של \\(T\\) הוא <strong>מטריצה אנטי־סימטרית</strong>!
      מטריצה אנטי־סימטרית כללית \\(2 \\times 2\\) היא מהצורה:
      \\[ \\begin{pmatrix} 0 & k \\\\ -k & 0 \\end{pmatrix} = k \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix} \\]
      אם נציב למשל \\(A = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}\\), נקבל \\(T(A) = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\).
      לכן בסיס לתמונה הוא \\(\\left\\{ \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix} \\right\\}\\), וממדה \\(\\dim \\text{Im}(T) = 1\\).
    </li>
    <li><strong>אימות משפט הממד:</strong>
      \\[ \\dim \\ker(T) + \\dim \\text{Im}(T) = 3 + 1 = 4 = \\dim M_{2 \\times 2}(\\mathbb{R}) \\]
      המשפט אומת במדויק!
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 3 (ברמת לינארית 2: שחזור נוסחה מפורשת להעתקה מתמונות איברי בסיס):</strong></p>
  <p>נתון בסיס \\(B = (v_1, v_2, v_3)\\) של \\(\\mathbb{R}^3\\):
    \\[ v_1 = \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}, \\quad v_2 = \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad v_3 = \\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix} \\]
    ונתונות תמונותיהן תחת העתקה לינארית \\(T: \\mathbb{R}^3 \\to \\mathbb{R}^2\\):
    \\[ T(v_1) = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}, \\quad T(v_2) = \\begin{pmatrix} 3 \\\\ 0 \\end{pmatrix}, \\quad T(v_3) = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} \\]
    נמצא את הנוסחה המפורשת עבור \\(T(x, y, z)\\).
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>לפי משפט הקביעה היחידה, נפרק תחילה וקטור כללי \\((x, y, z)^t\\) לפי איברי הבסיס \\(B\\):
      \\[ \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = c_1 \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix} + c_2 \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix} + c_3 \\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix} \\]
    </li>
    <li>נפתור את המערכת:
      משורה 1: \\(c_1 = x\\).<br>
      משורה 2: \\(c_1 + c_2 = y \\implies x + c_2 = y \\implies c_2 = y - x\\).<br>
      משורה 3: \\(c_2 + c_3 = z \\implies (y - x) + c_3 = z \\implies c_3 = x - y + z\\).
    </li>
    <li>נפעיל את \\(T\\) תוך שימוש בלינאריות:
      \\[ T(x, y, z) = c_1 T(v_1) + c_2 T(v_2) + c_3 T(v_3) \\]
      \\[ = x \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} + (y - x) \\begin{pmatrix} 3 \\\\ 0 \\end{pmatrix} + (x - y + z) \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} \\]
    </li>
    <li>נכנס איברים לפי רכיבים:
      רכיב 1: \\(x \\cdot 1 + 3(y - x) + 1(x - y + z) = x + 3y - 3x + x - y + z = -x + 2y + z\\).<br>
      רכיב 2: \\(x \\cdot 2 + 0(y - x) + (-1)(x - y + z) = 2x - x + y - z = x + y - z\\).
    </li>
    <li>לכן הנוסחה המפורשת היא:
      \\[ T(x, y, z) = \\begin{pmatrix} -x + 2y + z \\\\ x + y - z \\end{pmatrix} \\]
    </li>
    <li>בדיקה על איברי הבסיס:
      \\(T(1, 1, 0) = (-1+2+0, \\ 1+1-0)^t = (1, 2)^t = T(v_1)\\) (נכון!).<br>
      \\(T(0, 1, 1) = (0+2+1, \\ 0+1-1)^t = (3, 0)^t = T(v_2)\\) (נכון!).<br>
      \\(T(0, 0, 1) = (0+0+1, \\ 0+0-1)^t = (1, -1)^t = T(v_3)\\) (נכון!).
    </li>
  </ol>
</div>

<div class="linear-lab" data-linear-lab="linear-map-ker-im"></div>
      `,
    },
    {
      id: "l0-rep-matrix-similarity",
      title: "המטריצה המייצגת ודמיון מטריצות (Representation Matrix and Matrix Similarity)",
      html: `
<p>כשם שווקטורים הופכים לעמודות מספרים באמצעות בסיס, כך כל העתקה לינארית מופשטת הופכת למטריצה. המטריצה המייצגת היא הגשר המחבר בין אופרטורים מופשטים לבין חישובי מטריצות במחשב: כל שאלה על העתקה (האם היא הפיכה? מהם הערכים העצמיים שלה?) הופכת לשאלה פשוטה על המטריצה המייצגת אותה!</p>

<h3>אינטואיציה: דמיון מטריצות דרך הדיאגרמה הקומוטטיבית</h3>
<p>מה קורה כאשר אנו מחליפים בסיס מ־\\(B\\) ל־\\(B'\\)? ההעתקה \\(T\\) נשארת אותה העתקה גיאומטרית בדיוק, אך המטריצה המייצגת שלה משתנה לפי נוסחת הדמיון:
\\[ [T]_{B'} = P^{-1} [T]_B P \\quad \\left(\\text{כאשר } P = [I]_{B'}^B\\right) \\]
חשבו על כך כתהליך של <strong>תרגום סימולטני</strong>:
<ol>
  <li>וקטור הקלט נתון בשפה החדשה: \\([v]_{B'}\\).</li>
  <li>המטריצה \\(P\\) מתרגמת אותו לשפה הישנה: \\([v]_B = P [v]_{B'}\\).</li>
  <li>המטריצה \\([T]_B\\) מבצעת את ההעתקה בשפה הישנה: \\([T(v)]_B = [T]_B [v]_B\\).</li>
  <li>המטריצה \\(P^{-1}\\) מתרגמת את התוצאה חזרה לשפה החדשה: \\([T(v)]_{B'} = P^{-1} [T(v)]_B\\).</li>
</ol>
שתי מטריצות דומות \\(A \\sim B\\) הן בעצם <strong>אותה העתקה לינארית בדיוק, רק מנקודת מבט של בסיסים שונים</strong>!</p>

<!-- SVG Diagram: 4-Corner Commutative Diagram -->
<svg viewBox="0 0 500 230" style="max-width:100%;height:auto;display:block;margin:1.5rem auto;background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:12px;" aria-label="דיאגרמה קומוטטיבית של שינוי בסיס ודמיון מטריצות">
  <defs>
    <marker id="arr-diag" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent,#3b82f6)"/>
    </marker>
    <marker id="arr-vert" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--ok,#10b981)"/>
    </marker>
  </defs>

  <text x="250" y="24" font-size="13.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">הדיאגרמה הקומוטטיבית: [T]_{B'} = P⁻¹ [T]_B P</text>

  <!-- Top row: Basis B -->
  <rect x="70" y="45" width="80" height="40" rx="6" fill="var(--card,#ffffff)" stroke="var(--ink,#1e293b)" stroke-width="1.5"/>
  <text x="110" y="70" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">[v]_B</text>

  <rect x="350" y="45" width="80" height="40" rx="6" fill="var(--card,#ffffff)" stroke="var(--ink,#1e293b)" stroke-width="1.5"/>
  <text x="390" y="70" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">[T(v)]_B</text>

  <!-- Horizontal Top Arrow [T]_B -->
  <line x1="155" y1="65" x2="340" y2="65" stroke="var(--accent,#3b82f6)" stroke-width="2.5" marker-end="url(#arr-diag)"/>
  <text x="250" y="55" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--accent,#3b82f6)">כפל ב־[T]_B</text>

  <!-- Bottom row: Basis B' -->
  <rect x="70" y="145" width="80" height="40" rx="6" fill="var(--card,#ffffff)" stroke="var(--ink,#1e293b)" stroke-width="1.5"/>
  <text x="110" y="170" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">[v]_{B'}</text>

  <rect x="350" y="145" width="80" height="40" rx="6" fill="var(--card,#ffffff)" stroke="var(--ink,#1e293b)" stroke-width="1.5"/>
  <text x="390" y="170" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">[T(v)]_{B'}</text>

  <!-- Horizontal Bottom Arrow [T]_{B'} -->
  <line x1="155" y1="165" x2="340" y2="165" stroke="var(--accent,#3b82f6)" stroke-width="2.5" marker-end="url(#arr-diag)"/>
  <text x="250" y="155" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--accent,#3b82f6)">כפל ב־[T]_{B'}</text>

  <!-- Left Vertical Arrow: P (from B' up to B) -->
  <line x1="110" y1="140" x2="110" y2="92" stroke="var(--ok,#10b981)" stroke-width="2.2" marker-end="url(#arr-vert)"/>
  <text x="80" y="118" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ok,#10b981)">P</text>

  <!-- Right Vertical Arrow: P^-1 (from B down to B') -->
  <line x1="390" y1="90" x2="390" y2="138" stroke="var(--ok,#10b981)" stroke-width="2.2" marker-end="url(#arr-vert)"/>
  <text x="420" y="118" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ok,#10b981)">P⁻¹</text>

  <text x="250" y="215" font-size="11.5" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#475569)">מסלול ישיר = מסלול עוקף: כדי לחשב [T]_{B'}, עולים עם P, מפעילים [T]_B, ויורדים עם P⁻¹</text>
</svg>

<dl class="term-list">
  <dt>המטריצה המייצגת העתקה (Matrix Representation of Linear Transformation)</dt>
  <dd>תהי \\(T: V \\to W\\) העתקה לינארית, יהי \\(B = (v_1, \\dots, v_n)\\) בסיס של \\(V\\), ויהי \\(C = (w_1, \\dots, w_m)\\) בסיס של \\(W\\). המטריצה המייצגת \\([T]_B^C \\in M_{m \\times n}\\) מוגדרת כך שעמודותיה הן וקטורי הקואורדינטות לפי \\(C\\) של תמונות איברי \\(B\\):
    \\[ [T]_B^C = \\begin{pmatrix} [T(v_1)]_C & [T(v_2)]_C & \\dots & [T(v_n)]_C \\end{pmatrix} \\]
    היא מקיימת: לכל \\(v \\in V\\),
    \\[ [T(v)]_C = [T]_B^C [v]_B \\]
  </dd>
  <dt>אופרטור לינארי (Linear Operator)</dt>
  <dd>העתקה לינארית ממרחב לעצמו, \\(T: V \\to V\\). כאשר בוחרים את אותו בסיס \\(B\\) למקור וליעד, מסמנים בקצרה \\([T]_B = [T]_B^B \\in M_{n \\times n}\\).</dd>
  <dt>דמיון מטריצות (Matrix Similarity)</dt>
  <dd>שתי מטריצות ריבועיות \\(A, B \\in M_{n \\times n}\\) נקראות <strong>דומות</strong> (מסומן \\(A \\sim B\\)) אם קיימת מטריצה הפיכה \\(P\\) כך ש־
    \\[ B = P^{-1} A P \\]
    מטריצות דומות מייצגות את אותה העתקה לינארית בבסיסים שונים.
  </dd>
  <dt>אינווריאנטים של דמיון (Similarity Invariants)</dt>
  <dd>תכונות הנשמרות לחלוטין תחת דמיון מטריצות:
    <ul>
      <li><strong>דטרמיננטה זהה:</strong> \\(\\det(P^{-1}AP) = \\det(A)\\).</li>
      <li><strong>עקבה זהה:</strong> \\(\\text{tr}(P^{-1}AP) = \\text{tr}(A)\\).</li>
      <li><strong>דרגה זהה:</strong> \\(\\text{rank}(P^{-1}AP) = \\text{rank}(A)\\).</li>
      <li><strong>אותו פולינום אופייני ואותם ערכים עצמיים</strong> עם אותם ריבויים אלגבריים וגיאומטריים!</li>
    </ul>
  </dd>
</dl>

<div class="panel">
  <h4>מתכון 3 השלבים לבניית המטריצה המייצגת \\([T]_B^C\\)</h4>
  <ol>
    <li><strong>שלב 1:</strong> לוקחים כל וקטור מבסיס המקור \\(v_j \\in B\\) ומפעילים עליו את ההעתקה \\(T\\): מחשבים את \\(T(v_1), \\dots, T(v_n)\\).</li>
    <li><strong>שלב 2:</strong> מפרקים כל תוצאה \\(T(v_j)\\) כצירוף לינארי של איברי בסיס היעד \\(C\\), ומוצאים את וקטור הקואורדינטות \\([T(v_j)]_C\\).</li>
    <li><strong>שלב 3:</strong> מציבים את וקטורי הקואורדינטות הללו כ<strong>עמודות</strong> המטריצה: עמודה \\(1\\) היא \\([T(v_1)]_C\\), עמודה \\(2\\) היא \\([T(v_2)]_C\\), וכך הלאה.</li>
  </ol>
</div>

<h3>דוגמאות פתורות צעד־אחר־צעד</h3>

<div class="panel">
  <p><strong>דוגמה 1 (קלה: בניית מטריצה מייצגת ב־\\(\\mathbb{R}^2\\) ישירות ומול נוסחת הדמיון):</strong></p>
  <p>נתון האופרטור \\(T: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) המוגדר על ידי \\(T(x, y) = (2x + 3y, \\ x + 4y)\\).
  נמצא את המטריצה המייצגת בבסיס הסטנדרטי \\([T]_E\\), ונמצא את \\([T]_B\\) עבור הבסיס \\(B = (v_1, v_2) = \\left(\\begin{pmatrix}1\\\\1\\end{pmatrix}, \\begin{pmatrix}1\\\\-1\\end{pmatrix}\\right)\\) בשתי דרכים שונות.</p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>בבסיס הסטנדרטי \\(E = (e_1, e_2)\\):
      \\(T(1, 0) = (2, 1)^t\\), \\(T(0, 1) = (3, 4)^t\\).
      לכן:
      \\[ [T]_E = \\begin{pmatrix} 2 & 3 \\\\ 1 & 4 \\end{pmatrix} \\]
    </li>
    <li><strong>דרך א' (ישירות לפי ההגדרה):</strong>
      נחשב את תמונות איברי הבסיס \\(B\\):
      \\(T(v_1) = T(1, 1) = (2(1)+3(1), 1+4(1))^t = \\begin{pmatrix} 5 \\\\ 5 \\end{pmatrix} = 5 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} + 0 \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} \\implies [T(v_1)]_B = \\begin{pmatrix} 5 \\\\ 0 \\end{pmatrix}\\).<br>
      \\(T(v_2) = T(1, -1) = (2-3, 1-4)^t = \\begin{pmatrix} -1 \\\\ -3 \\end{pmatrix} = -2 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} + 1 \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} \\implies [T(v_2)]_B = \\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix}\\).<br>
      נעמיד כעמודות:
      \\[ [T]_B = \\begin{pmatrix} 5 & -2 \\\\ 0 & 1 \\end{pmatrix} \\]
    </li>
    <li><strong>דרך ב' (בעזרת נוסחת הדמיון \\(P^{-1} [T]_E P\\)):</strong>
      עמודות \\(P = [I]_B^E\\) הן איברי \\(B\\): \\(P = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}\\).
      ההופכית היא:
      \\[ P^{-1} = \\frac{1}{-2} \\begin{pmatrix} -1 & -1 \\\\ -1 & 1 \\end{pmatrix} = \\begin{pmatrix} 1/2 & 1/2 \\\\ 1/2 & -1/2 \\end{pmatrix} \\]
      נכפול:
      \\[ [T]_E P = \\begin{pmatrix} 2 & 3 \\\\ 1 & 4 \\end{pmatrix} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} = \\begin{pmatrix} 5 & -1 \\\\ 5 & -3 \\end{pmatrix} \\]
      \\[ P^{-1} ([T]_E P) = \\begin{pmatrix} 1/2 & 1/2 \\\\ 1/2 & -1/2 \\end{pmatrix} \\begin{pmatrix} 5 & -1 \\\\ 5 & -3 \\end{pmatrix} = \\begin{pmatrix} 2.5 + 2.5 & -0.5 - 1.5 \\\\ 2.5 - 2.5 & -0.5 + 1.5 \\end{pmatrix} = \\begin{pmatrix} 5 & -2 \\\\ 0 & 1 \\end{pmatrix} \\]
      שתי הדרכים הניבו בדיוק את אותה מטריצה!
    </li>
    <li>אימות שמורות הדמיון:
      \\(\\text{tr}([T]_E) = 2 + 4 = 6 = 5 + 1 = \\text{tr}([T]_B)\\).<br>
      \\(\\det([T]_E) = 2(4) - 3(1) = 5 = 5(1) - (-2)(0) = \\det([T]_B)\\).
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 2 (בינונית: המטריצה המייצגת של אופרטור הגזירה \\(D(p) = p'(x)\\) ונילפוטנטיות):</strong></p>
  <p>במרחב הפולינומים \\(\\mathbb{R}_2[x]\\), נתבונן באופרטור הגזירה \\(D(p) = p'(x)\\).
  נמצא את המטריצה המייצגת \\([D]_B\\) בבסיס הסטנדרטי \\(B = (1, x, x^2)\\), ונחשב את חזקותיה \\([D]_B^2\\) ו־\\([D]_B^3\\).</p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>נפעיל את \\(D\\) על איברי הבסיס:
      \\(D(1) = 0 = 0 \\cdot 1 + 0 \\cdot x + 0 \\cdot x^2 \\implies [D(1)]_B = \\begin{pmatrix} 0 \\\\ 0 \\\\ 0 \\end{pmatrix}\\).<br>
      \\(D(x) = 1 = 1 \\cdot 1 + 0 \\cdot x + 0 \\cdot x^2 \\implies [D(x)]_B = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}\\).<br>
      \\(D(x^2) = 2x = 0 \\cdot 1 + 2 \\cdot x + 0 \\cdot x^2 \\implies [D(x^2)]_B = \\begin{pmatrix} 0 \\\\ 2 \\\\ 0 \\end{pmatrix}\\).
    </li>
    <li>נעמיד את הווקטורים כעמודות:
      \\[ [D]_B = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 2 \\\\ 0 & 0 & 0 \\end{pmatrix} \\]
    </li>
    <li>נחשב את החזקות של המטריצה:
      \\[ [D]_B^2 = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 2 \\\\ 0 & 0 & 0 \\end{pmatrix} \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 2 \\\\ 0 & 0 & 0 \\end{pmatrix} = \\begin{pmatrix} 0 & 0 & 2 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\]
      (זוהי המטריצה המייצגת של הנגזרת השנייה \\(D^2(p) = p''(x)\\), השולחת את \\(x^2\\) ל־2!).
    </li>
    <li>נעלה לחזקה השלישית:
      \\[ [D]_B^3 = [D]_B^2 \\cdot [D]_B = \\begin{pmatrix} 0 & 0 & 2 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 2 \\\\ 0 & 0 & 0 \\end{pmatrix} = \\begin{pmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} = 0 \\]
    </li>
    <li>מסקנה: \\([D]_B\\) היא <strong>מטריצה נילפוטנטית מאינדקס 3</strong>! זה הגיוני לחלוטין, שכן גזירה שלוש פעמים ברציפות של כל פולינום ממעלה שנייה מאפסת אותו לחלוטין. זוהי הכנה ישירה ליחידות 9–11 על צורת ז'ורדן!</li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 3 (ברמת לינארית 2: שלילת דמיון מטריצות בעזרת אינווריאנטים):</strong></p>
  <p>נתונות שתי המטריצות ב־\\(M_{2 \\times 2}(\\mathbb{R})\\):
    \\[ A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix} \\]
    נוכיח כי \\(A\\) ו־\\(B\\) אינן דומות זו לזו (כלומר לא קיימת מטריצה הפיכה \\(P\\) כך ש־\\(B = P^{-1}AP\\)).
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>אם שתי מטריצות דומות, הן חייבות לחלוק את אותה עקבה, אותה דטרמיננטה, ואותו פולינום אופייני.</li>
    <li>נבדוק תחילה את העקבה:
      \\[ \\text{tr}(A) = 1 + 4 = 5, \\quad \\text{tr}(B) = 2 + 3 = 5 \\]
      העקבות שוות! מבחן העקבה אינו מספיק כדי לפסול דמיון.
    </li>
    <li>נבדוק את הדטרמיננטה:
      \\[ \\det(A) = 1 \\cdot 4 - 2 \\cdot 3 = 4 - 6 = -2 \\]
      \\[ \\det(B) = 2 \\cdot 3 - 1 \\cdot 1 = 6 - 1 = 5 \\]
    </li>
    <li>מכיוון ש־\\(\\det(A) = -2 \\ne 5 = \\det(B)\\), והדטרמיננטה היא אינווריאנט של דמיון (\\(\\det(P^{-1}AP) = \\det(A)\\) לכל \\(P\\) הפיכה), נובע בוודאות מוחלטת כי <strong>המטריצות אינן דומות</strong>!</li>
  </ol>
</div>

<div class="linear-lab" data-linear-lab="rep-matrix-similarity"></div>
      `,
    },
    {
      id: "l0-det-charpoly",
      title: "דטרמיננטות והפולינום האופייני (Determinants and Characteristic Polynomial)",
      html: `
<p>הדטרמיננטה היא אחד הכלים העוצמתיים ביותר באלגברה לינארית. היא מצמידה לכל מטריצה ריבועית סקלר יחיד המסכם את תכונותיה: האם היא הפיכה? כיצד היא משנה נפחים במרחב? ומהם הערכים העצמיים שלה דרך הפולינום האופייני?</p>

<h3>אינטואיציה גיאומטרית: פקטור מתיחת השטח והנפח</h3>
<p>חשבו על מטריצה \\(2 \\times 2\\) הפועלת על ריבוע היחידה במישור שצלעותיו הן וקטורי היחידה \\(e_1 = (1, 0)^t\\) ו־\\(e_2 = (0, 1)^t\\). שטח הריבוע הזה הוא \\(1\\).
כאשר המטריצה פועלת, היא מעבירה את הריבוע למקבילית שצלעותיה הן עמודות המטריצה: \\(v_1 = A e_1\\) ו־\\(v_2 = A e_2\\).
<strong>השטח של המקבילית הזו הוא בדיוק הערך המוחלט של הדטרמיננטה: \\(|\\det(A)| = |ad - bc|\\)!</strong></p>
<p>אם \\(\\det(A) = 0\\), פירוש הדבר שהמקבילית "נמעכה" לקו ישר או לנקודה – שטח אפס! במצב כזה, המטריצה דחסה מרחב דו־ממדי לממד נמוך יותר, מידע אבד, ולכן <strong>אי אפשר לשחזר את המקור והמטריצה אינה הפיכה</strong>. הסימן של הדטרמיננטה מעיד האם האוריינטציה (כיוון השעון) נשמרה (\\(\\gt 0\\)) או התהפכה (\\(\\lt 0\\)).</p>

<!-- SVG Diagram: Unit Square mapped to Parallelogram -->
<svg viewBox="0 0 500 200" style="max-width:100%;height:auto;display:block;margin:1.5rem auto;background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:12px;" aria-label="איור גיאומטרי של דטרמיננטה: מתיחת שטח מריבוע למקבילית">
  <defs>
    <marker id="arr-det" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--ink,#1e293b)"/>
    </marker>
    <marker id="arr-map" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent,#3b82f6)"/>
    </marker>
  </defs>

  <!-- Left: Unit Square (Area = 1) -->
  <g transform="translate(30, 20)">
    <text x="80" y="18" font-size="12.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ink,#1e293b)">ריבוע היחידה (שטח = 1)</text>

    <!-- Axes -->
    <line x1="30" y1="140" x2="150" y2="140" stroke="var(--ink,#94a3b8)" stroke-width="1.2" marker-end="url(#arr-det)"/>
    <line x1="30" y1="140" x2="30" y2="35" stroke="var(--ink,#94a3b8)" stroke-width="1.2" marker-end="url(#arr-det)"/>

    <!-- Square -->
    <rect x="30" y="60" width="80" height="80" fill="rgba(59,130,246,0.15)" stroke="var(--accent,#3b82f6)" stroke-width="2"/>
    <circle cx="30" cy="140" r="3.5" fill="var(--ink,#1e293b)"/>
    <circle cx="110" cy="140" r="3.5" fill="var(--accent,#3b82f6)"/>
    <circle cx="30" cy="60" r="3.5" fill="var(--accent,#3b82f6)"/>
    <circle cx="110" cy="60" r="3.5" fill="var(--accent,#3b82f6)"/>

    <text x="70" y="105" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--accent,#3b82f6)">שטח = 1</text>
    <text x="110" y="155" font-size="11" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#1e293b)">e₁ = (1,0)</text>
    <text x="20" y="55" font-size="11" font-family="sans-serif" text-anchor="end" fill="var(--ink,#1e293b)">e₂ = (0,1)</text>
  </g>

  <!-- Mapping Arrow with Matrix A -->
  <g transform="translate(195, 80)">
    <line x1="10" y1="20" x2="70" y2="20" stroke="var(--accent,#3b82f6)" stroke-width="2.5" marker-end="url(#arr-map)"/>
    <text x="40" y="12" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--accent,#3b82f6)">הכפלה ב־A</text>
  </g>

  <!-- Right: Parallelogram (Area = |det A|) -->
  <g transform="translate(290, 20)">
    <text x="95" y="18" font-size="12.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ok,#10b981)">מקבילית תמונה (שטח = |det A|)</text>

    <!-- Axes -->
    <line x1="20" y1="140" x2="185" y2="140" stroke="var(--ink,#94a3b8)" stroke-width="1.2" marker-end="url(#arr-det)"/>
    <line x1="20" y1="140" x2="20" y2="35" stroke="var(--ink,#94a3b8)" stroke-width="1.2" marker-end="url(#arr-det)"/>

    <!-- Parallelogram: (20,140) -> (100, 140) [v1=(80,0)] -> (140, 50) [v1+v2] -> (60, 50) [v2=(40, 90)] -->
    <polygon points="20,140 100,125 150,55 70,70" fill="rgba(16,185,129,0.2)" stroke="var(--ok,#10b981)" stroke-width="2"/>
    <circle cx="20" cy="140" r="3.5" fill="var(--ink,#1e293b)"/>
    <circle cx="100" cy="125" r="3.5" fill="var(--ok,#10b981)"/>
    <circle cx="70" cy="70" r="3.5" fill="var(--ok,#10b981)"/>

    <text x="85" y="105" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ok,#10b981)">שטח = |det(A)|</text>
    <text x="120" y="138" font-size="11" font-family="sans-serif" fill="var(--ok,#10b981)">v₁ = A e₁</text>
    <text x="50" y="60" font-size="11" font-family="sans-serif" fill="var(--ok,#10b981)">v₂ = A e₂</text>
  </g>
</svg>

<h3>לוח השחמט של הסימנים לפיתוח לפי שורה או עמודה</h3>
<p>כאשר מפתחים דטרמיננטה \\(3 \\times 3\\) לפי לפלס, לכל תא מוצמד סימן \\((-1)^{i+j}\\). לוח הסימנים הזה יוצר דפוס שחמט פשוט:</p>
<div style="display:flex;justify-content:center;margin:1rem 0;">
  <div style="background:var(--card,#ffffff);border:1px solid var(--line,#cbd5e1);border-radius:8px;padding:0.8rem 1.5rem;font-family:monospace;font-size:16px;text-align:center;">
    \\(\\begin{pmatrix} + & - & + \\\\ - & + & - \\\\ + & - & + \\end{pmatrix}\\)
  </div>
</div>
<p><strong>כלל הזהב לחישוב מהיר בבחינה:</strong> תמיד בחרו לפתח לפי השורה או העמודה המכילה את <strong>מספר האפסים הגדול ביותר</strong>! כל אפס מאפס מיידית את המינור שלו וחוסך חישוב שלם.</p>

<dl class="term-list">
  <dt>דטרמיננטה (Determinant)</dt>
  <dd>פונקציה המצמידה לכל מטריצה ריבועית \\(A \\in M_{n \\times n}\\) סקלר \\(\\det(A)\\).
    עבור \\(2 \\times 2\\):
    \\[ \\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc \\]
    עבור מטריצה משולשית או אלכסונית: הדטרמיננטה היא פשוט <strong>מכפלת איברי האלכסון הראשי</strong>:
    \\[ \\det(A) = a_{11} a_{22} \\cdots a_{nn} \\]
  </dd>
  <dt>מינור וקו־פקטור (Minor and Cofactor)</dt>
  <dd>המינור \\(M_{i,j}\\) הוא הדטרמיננטה של תת־המטריצה המתקבלת ממחיקת שורה \\(i\\) ועמודה \\(j\\).<br>
    הקו־פקטור (אלגברי) הוא:
    \\[ C_{i,j} = (-1)^{i+j} M_{i,j} \\]
  </dd>
  <dt>פיתוח לפלס (Laplace Expansion)</dt>
  <dd>ניתן לחשב את הדטרמיננטה לפי פיתוח לאורך כל שורה \\(i\\) או כל עמודה \\(j\\):
    \\[ \\det(A) = \\sum_{j=1}^n A_{i,j} (-1)^{i+j} M_{i,j} \\quad \\text{(פיתוח לפי שורה } i\\text{)} \\]
  </dd>
  <dt>תכונות מפתח של הדטרמיננטה</dt>
  <dd>
    <ul>
      <li><strong>קריטריון ההפיכות:</strong> \\(A\\) הפיכה \\(\\iff \\det(A) \\ne 0\\).</li>
      <li><strong>כפליות מלאה:</strong> \\(\\det(AB) = \\det(A) \\det(B)\\). בפרט: \\(\\det(A^{-1}) = \\frac{1}{\\det(A)}\\).</li>
      <li><strong>שחלוף:</strong> \\(\\det(A^t) = \\det(A)\\) ו־\\(\\det(A^*) = \\overline{\\det(A)}\\).</li>
      <li><strong>כפל בסקלר:</strong> עבור \\(A \\in M_{n \\times n}\\), מתקיים \\(\\det(c A) = c^n \\det(A)\\) (הסקלר יוצא בחזקת סדר המטריצה \\(n\\)!).</li>
      <li><strong>פעולות שורה:</strong>
        החלפת שתי שורות מכפילה ב־\\((-1)\\).<br>
        הוספת כפולה של שורה לשורה אחרת <strong>אינה משנה כלל</strong> את הדטרמיננטה!
      </li>
    </ul>
  </dd>
  <dt>הפולינום האופייני (Characteristic Polynomial)</dt>
  <dd>הפולינום האופייני של מטריצה \\(A \\in M_{n \\times n}\\) מוגדר כ־:
    \\[ P_A(x) = \\det(xI - A) \\]
    זהו פולינום מוני ממעלה \\(n\\). שורשיו של \\(P_A(x)\\) הם בדיוק <strong>הערכים העצמיים</strong> של \\(A\\).<br>
    עבור מטריצה \\(2 \\times 2\\):
    \\[ P_A(x) = x^2 - \\text{tr}(A)x + \\det(A) \\]
  </dd>
</dl>

<div class="panel">
  <h4>מתכון עבודה שלב־אחר־שלב: פירוק חכם של פולינום אופייני \\(3 \\times 3\\) ללא משוואה ממעלה שלישית</h4>
  <p>טעות נפוצה של סטודנטים היא לפתוח את כל הסוגריים של \\(\\det(xI - A)\\) ולקבל ביטוי ממעלה שלישית \\(x^3 - \\dots\\) שקשה מאוד לנחש את שורשיו. הנה המתכון המנצח לפריטה חכמה:</p>
  <ol>
    <li>רושמים את המטריצה \\(xI - A\\) (מציבים \\(x\\) על האלכסון ומחסרים את איברי \\(A\\)).</li>
    <li>מחפשים שורה או עמודה שמכילה אפסים. אם קיימת כזו, מפתחים לפיה ישירות – מיד יופיע גורם לינארי \\((x - \\lambda)\\) מחוץ לסוגריים!</li>
    <li>אם אין אפסים: מבצעים פעולת שורה או עמודה אחת (כגון חיסור שורה 1 משורה 2) כדי לייצר אפס או כדי לייצר שורה שבה יש גורם משותף \\((x - \\lambda)\\).</li>
    <li>מוציאים את הגורם \\((x - \\lambda)\\) אל מחוץ לדטרמיננטה. נשארים עם מינור \\(2 \\times 2\\) פשוט שקל לפתור בעזרת טרינום או נוסחת שורשים!</li>
  </ol>
</div>

<h3>דוגמאות פתורות צעד־אחר־צעד</h3>

<div class="panel">
  <p><strong>דוגמה 1 (קלה: חישוב דטרמיננטה \\(3 \\times 3\\) בפיתוח לפי עמודה עם אפסים ומול דירוג):</strong></p>
  <p>נחשב את הדטרמיננטה של המטריצה הבאה בשתי דרכים:
    \\[ A = \\begin{pmatrix} 2 & 0 & 3 \\\\ 1 & 4 & -1 \\\\ 5 & 0 & 2 \\end{pmatrix} \\]
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li><strong>דרך א' (פיתוח לפי העמודה השנייה):</strong>
      בעמודה 2 יש שני אפסים! האיבר היחיד שאינו אפס הוא \\(A_{2,2} = 4\\).
      הסימן לפי לוח השחמט עבור תא \\((2,2)\\) הוא \\((-1)^{2+2} = +1\\).
      נמחק את שורה 2 ועמודה 2:
      \\[ \\det(A) = 4 \\cdot (-1)^{2+2} \\cdot \\det \\begin{pmatrix} 2 & 3 \\\\ 5 & 2 \\end{pmatrix} = 4 \\cdot (2 \\cdot 2 - 3 \\cdot 5) = 4 \\cdot (4 - 15) = 4 \\cdot (-11) = -44 \\]
      החישוב לקח שורה אחת בלבד!
    </li>
    <li><strong>דרך ב' (באמצעות פעולות שורה):</strong>
      נאפס את עמודה 1 בעזרת שורה 2:
      נחליף תחילה בין שורה 1 לשורה 2 (\\(R_1 \\leftrightarrow R_2\\)), מה שמכפיל את הדטרמיננטה ב־\\((-1)\\):
      \\[ \\det(A) = -\\det \\begin{pmatrix} 1 & 4 & -1 \\\\ 2 & 0 & 3 \\\\ 5 & 0 & 2 \\end{pmatrix} \\]
      פעולות שאינן משנות דטרמיננטה:
      \\(R_2 \\leftarrow R_2 - 2R_1 \\implies (0, -8, 5)\\).<br>
      \\(R_3 \\leftarrow R_3 - 5R_1 \\implies (0, -20, 7)\\).<br>
      כעת נאפס בשורה 3: \\(R_3 \\leftarrow R_3 - \\frac{5}{2} R_2 \\implies (0, 0, 7 - \\frac{25}{2} = -\\frac{11}{2})\\).<br>
      המטריצה כעת משולשית עליונה!
      \\[ \\det(A) = - \\left( 1 \\cdot (-8) \\cdot \\left(-\\frac{11}{2}\\right) \\right) = -(44) = -44 \\]
      שתי הדרכים הניבו בדיוק את אותה תוצאה: \\(-44\\).
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 2 (בינונית: שימוש בתכונות האלגבריות של דטרמיננטות — שאלת מבחן קלאסית):</strong></p>
  <p>נתונות מטריצות \\(A, B \\in M_{3 \\times 3}(\\mathbb{R})\\) כך ש־\\(\\det(A) = 4\\) ו־\\(\\det(B) = -2\\).
  נחשב את ערך הביטויים הבאים ללא ידיעת איברי המטריצות:</p>
  <ol>
    <li>\\(\\det(AB) = \\det(A) \\cdot \\det(B) = 4 \\cdot (-2) = -8\\).</li>
    <li>\\(\\det(2A)\\):
      זהירות! המטריצה היא מגודל \\(3 \\times 3\\). לכן לפי הנוסחה \\(\\det(cA) = c^n \\det(A)\\):
      \\[ \\det(2A) = 2^3 \\cdot \\det(A) = 8 \\cdot 4 = 32 \\]
      (ולא \\(2 \\cdot 4 = 8\\)!).
    </li>
    <li>\\(\\det(A^{-1} B^t)\\):
      לפי כפליות ושחלוף:
      \\[ \\det(A^{-1} B^t) = \\det(A^{-1}) \\cdot \\det(B^t) = \\frac{1}{\\det(A)} \\cdot \\det(B) = \\frac{1}{4} \\cdot (-2) = -\\frac{1}{2} \\]
    </li>
    <li>\\(\\det(-B)\\):
      כאן הסקלר הוא \\(c = -1\\), והגודל הוא \\(n = 3\\):
      \\[ \\det(-B) = (-1)^3 \\det(B) = -1 \\cdot (-2) = 2 \\]
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 3 (ברמת לינארית 2: מציאת הפולינום האופייני ופירוק חכם ללא פתיחת סוגריים ממעלה 3):</strong></p>
  <p>נמצא ונפרק לגורמים את הפולינום האופייני של המטריצה הבאה מגודל \\(3 \\times 3\\):
    \\[ A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 0 & 3 & 0 \\\\ 2 & 0 & 1 \\end{pmatrix} \\]
  </p>
  <p><strong>פתרון מפורט:</strong></p>
  <ol>
    <li>נרשום את המטריצה \\(xI - A\\):
      \\[ xI - A = \\begin{pmatrix} x - 1 & 0 & -2 \\\\ 0 & x - 3 & 0 \\\\ -2 & 0 & x - 1 \\end{pmatrix} \\]
    </li>
    <li>שימו לב לשורה השנייה: היא מכילה שני אפסים והאיבר היחיד הוא \\((x - 3)\\) באלכסון!
      נפתח לפלס לאורך השורה השנייה:
      הסימן בתא \\((2,2)\\) הוא \\((-1)^{2+2} = +1\\). לכן:
      \\[ P_A(x) = \\det(xI - A) = (x - 3) \\cdot \\det \\begin{pmatrix} x - 1 & -2 \\\\ -2 & x - 1 \\end{pmatrix} \\]
    </li>
    <li>נפתח את הדטרמיננטה \\(2 \\times 2\\):
      \\[ \\det \\begin{pmatrix} x - 1 & -2 \\\\ -2 & x - 1 \\end{pmatrix} = (x - 1)^2 - (-2)^2 = (x - 1)^2 - 4 \\]
    </li>
    <li><strong>טריק הפרש ריבועים (ללא פתיחת סוגריים!):</strong>
      נשתמש בזהות \\(u^2 - v^2 = (u - v)(u + v)\\) עבור \\(u = x-1\\) ו־\\(v = 2\\):
      \\[ (x - 1)^2 - 4 = ((x - 1) - 2)((x - 1) + 2) = (x - 3)(x + 1) \\]
    </li>
    <li>נציב חזרה ונקבל את הפירוק המלא לגורמים לינאריים:
      \\[ P_A(x) = (x - 3) \\cdot (x - 3)(x + 1) = (x - 3)^2 (x + 1) \\]
    </li>
    <li>שורשי הפולינום האופייני הם הערכים העצמיים:
      \\(\\lambda_1 = 3\\) בעל <strong>ריבוי אלגברי 2</strong> (\\(\\text{ר"א} = 2\\)).<br>
      \\(\\lambda_2 = -1\\) בעל <strong>ריבוי אלגברי 1</strong> (\\(\\text{ר"א} = 1\\)).
    </li>
    <li>בדיקת עקבה ודטרמיננטה:
      סכום שורשי הפולינום: \\(3 + 3 + (-1) = 5 = 1 + 3 + 1 = \\text{tr}(A)\\) (נכון!).<br>
      מכפלת שורשי הפולינום: \\(3 \\cdot 3 \\cdot (-1) = -9 = \\det(A)\\) (נכון!).
    </li>
  </ol>
</div>

<div class="linear-lab" data-linear-lab="det-charpoly-3x3"></div>
      `,
    },
    {
      id: "l0-eigen-diag",
      title: "ערכים עצמיים ולכסון מטריצות (Eigenvalues and Diagonalization)",
      html: `
<p>הגענו לשיא של מכינת ההשלמות! לכסון מטריצות הוא הכלי המרכזי שמפשט כמעט כל בעיה מסובכת באלגברה לינארית, במדעי הנתונים (PCA), בגרפיקה ממוחשבת, במערכות דינמיות ובמכניקת הקוונטים. כאן נבין בדיוק מהו וקטור עצמי, מה ההבדל בין ריבוי אלגברי לריבוי גיאומטרי, ומה קורה כאשר מטריצה "נכשלת" בלכסון – מה שפותח את הדלת לצורת ז'ורדן ביחידה 11!</p>

<h3>אינטואיציה גיאומטרית: צירי השלד של המטריצה</h3>
<p>כאשר מטריצה \\(A\\) פועלת על וקטור אקראי \\(u\\), היא בדרך כלל משנה את כיוונו (מסובבת אותו) ומשנה את אורכו.
אך עבור כיוונים מיוחדים מסוימים, המטריצה <strong>אינה מסובבת את הווקטור כלל</strong>! הווקטור נשאר בדיוק על אותו קו ישר העובר בראשית, ורק נמתח, מתכווץ, או הופך כיוון פי סקלר קבוע \\(\\lambda\\):
\\[ A v = \\lambda v \\]
הווקטור המיוחד הזה \\(v\\) (שאינו אפס!) נקרא <strong>וקטור עצמי</strong>, ופקטור המתיחה \\(\\lambda\\) נקרא <strong>ערך עצמי</strong>.</p>
<p>אם המרחב כולו יכול להיפרש על ידי בסיס המורכב מווקטורים עצמיים בלבד (\\(B = (v_1, \\dots, v_n)\\)), אזי בבסיס הזה המטריצה הופכת להיות <strong>מטריצה אלכסונית \\(D\\)</strong>, שאיברי האלכסון שלה הם הערכים העצמיים! במצב כזה, חישוב חזקה של מטריצה \\(A^k\\) הופך מפעולה מפלצתית להעלאה פשוטה בחזקה של מספרים: \\(A^k = P D^k P^{-1}\\).</p>

<!-- SVG Diagram: General Vector vs Eigenvector -->
<svg viewBox="0 0 520 220" style="max-width:100%;height:auto;display:block;margin:1.5rem auto;background:var(--surface,#f8fafc);border:1px solid var(--line,#cbd5e1);border-radius:12px;" aria-label="איור וקטור עצמי מול וקטור רגיל">
  <defs>
    <marker id="arr-u" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--bad,#ef4444)"/>
    </marker>
    <marker id="arr-v" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--ok,#10b981)"/>
    </marker>
    <marker id="arr-axis" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--ink,#94a3b8)"/>
    </marker>
  </defs>

  <!-- Left: General Vector (Rotates!) -->
  <g transform="translate(15, 15)">
    <rect width="235" height="190" rx="8" fill="var(--card,#ffffff)" stroke="var(--bad,#ef4444)" stroke-width="1.2"/>
    <text x="117" y="24" font-size="12.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--bad,#dc2626)">וקטור רגיל u: משנה כיוון ומסתובב!</text>

    <!-- Axes -->
    <line x1="115" y1="170" x2="115" y2="40" stroke="var(--line,#e2e8f0)" stroke-width="1.5"/>
    <line x1="20" y1="120" x2="215" y2="120" stroke="var(--line,#e2e8f0)" stroke-width="1.5"/>

    <!-- Origin -->
    <circle cx="115" cy="120" r="4" fill="var(--ink,#1e293b)"/>

    <!-- Vector u -->
    <line x1="115" y1="120" x2="175" y2="85" stroke="var(--ink,#1e293b)" stroke-width="2.5" marker-end="url(#arr-u)"/>
    <text x="182" y="85" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--ink,#1e293b)">u</text>

    <!-- Vector Au (rotated) -->
    <line x1="115" y1="120" x2="80" y2="55" stroke="var(--bad,#ef4444)" stroke-width="2.5" marker-end="url(#arr-u)"/>
    <text x="75" y="48" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--bad,#dc2626)">Au (כיוון שונה!)</text>

    <!-- Rotation arc -->
    <path d="M 155 97 A 45 45 0 0 0 95 80" fill="none" stroke="var(--bad,#ef4444)" stroke-width="1.5" stroke-dasharray="3,3"/>
    <text x="117" y="180" font-size="11" font-family="sans-serif" text-anchor="middle" fill="var(--ink,#475569)">Au אינו כפולה בסקלר של u</text>
  </g>

  <!-- Right: Eigenvector (Stays on same line!) -->
  <g transform="translate(270, 15)">
    <rect width="235" height="190" rx="8" fill="var(--card,#ffffff)" stroke="var(--ok,#10b981)" stroke-width="1.8"/>
    <text x="117" y="24" font-size="12.5" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="var(--ok,#10b981)">וקטור עצמי v: נשאר על אותו הישר!</text>

    <!-- Invariant line (Eigenspace) -->
    <line x1="30" y1="175" x2="200" y2="65" stroke="rgba(16,185,129,0.3)" stroke-width="4"/>
    <text x="180" y="55" font-size="10.5" font-family="sans-serif" font-weight="bold" fill="var(--ok,#10b981)">מרחב עצמי V_λ</text>

    <!-- Origin -->
    <circle cx="115" cy="120" r="4" fill="var(--ink,#1e293b)"/>

    <!-- Vector v -->
    <line x1="115" y1="120" x2="148" y2="98" stroke="var(--ink,#1e293b)" stroke-width="2.5" marker-end="url(#arr-v)"/>
    <text x="155" y="105" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--ink,#1e293b)">v</text>

    <!-- Vector Av = lambda * v (stretched along the same line) -->
    <line x1="115" y1="120" x2="185" y2="74" stroke="var(--ok,#10b981)" stroke-width="3" marker-end="url(#arr-v)"/>
    <text x="190" y="80" font-size="12" font-family="sans-serif" font-weight="bold" fill="var(--ok,#10b981)">Av = λv</text>

    <text x="117" y="180" font-size="11" font-family="sans-serif" text-anchor="middle" fill="var(--ok,#10b981)">רק מתיחה פי λ ללא כל סיבוב!</text>
  </g>
</svg>

<h3>ההבחנה החשובה ביותר: ריבוי אלגברי (\\(\\text{ר"א}\\)) מול ריבוי גיאומטרי (\\(\\text{ר"ג}\\))</h3>
<p>זהו המפתח המוחלט לשאלות לכסינות במבחנים:
<ul>
  <li><strong>ריבוי אלגברי (\\(\\text{ר"א} / \\mu_A(\\lambda)\\)):</strong> כמה פעמים הגורם \\((x - \\lambda)\\) מופיע בפולינום האופייני \\(P_A(x)\\). (נמדד לפי שורשי הפולינום).</li>
  <li><strong>ריבוי גיאומטרי (\\(\\text{ר"ג} / d_A(\\lambda)\\)):</strong> ממד המרחב העצמי, כלומר <strong>כמה וקטורים עצמיים בת"ל קיימים עבור \\(\\lambda\\)</strong>:
    \\[ \\text{ר"ג}(\\lambda) = \\dim V_\\lambda = \\dim \\ker(A - \\lambda I) = n - \\text{rank}(A - \\lambda I) \\]
  </li>
</ul>
אי־השוויון הבסיסי שתמיד מתקיים עבור כל ערך עצמי:
\\[ 1 \\le \\text{ר"ג}(\\lambda) \\le \\text{ר"א}(\\lambda) \\]
</p>

<h3>מתי מטריצה לכסינה ומתי היא נכשלת?</h3>
<div style="background:var(--card,#ffffff);border:2px solid var(--accent,#3b82f6);border-radius:10px;padding:1.2rem;margin:1.5rem 0;">
  <h4 style="margin:0 0 0.8rem;color:var(--accent,#3b82f6);text-align:center;">משפט הלכסינות המלא (קריטריון הלכסינות)</h4>
  <p style="margin:0 0 0.5rem;font-size:13.5px;">מטריצה \\(A \\in M_{n \\times n}(\\mathbb{F})\\) ניתנת ללכסון אם ורק אם מתקיימים שני התנאים הבאים:</p>
  <ol style="margin:0 0 0.8rem;padding-right:1.5rem;font-size:13px;">
    <li><strong>הפולינום האופייני מתפרק לגורמים לינאריים מעל השדה \\(\\mathbb{F}\\)</strong> (אין שורשים ש"ברחו" לשדה הרחבה, למשל שורשים מרוכבים מעל \\(\\mathbb{R}\\)).</li>
    <li><strong>לכל ערך עצמי מתקיים שוויון ריבויים מלא:</strong>
      \\[ \\text{ר"ג}(\\lambda) = \\text{ר"א}(\\lambda) \\]
    </li>
  </ol>
  <p style="margin:0;font-size:12.5px;color:var(--ink,#475569);line-height:1.5;">
    <strong>מה קורה אם \\(\\text{ר"ג}(\\lambda) \\lt \\text{ר"א}(\\lambda)\\)?</strong><br>
    המטריצה נקראת <strong>מטריצה פגומה (Defective)</strong>. במקרה זה חסרים לנו וקטורים עצמיים כדי לבנות בסיס שלם ל־\\(\\mathbb{F}^n\\), והמטריצה <strong>אינה ניתנת ללכסון</strong>!<br>
    זהו בדיוק המקום שבו נלמד ביחידה 11 על <strong>צורת ז'ורדן (Jordan Canonical Form)</strong> – התחליף האלגנטי ביותר ללכסון כאשר המטריצה אינה לכסינה!
  </p>
</div>

<dl class="term-list">
  <dt>ערך עצמי ווקטור עצמי (Eigenvalue and Eigenvector)</dt>
  <dd>יהי \\(A \\in M_{n \\times n}(\\mathbb{F})\\). סקלר \\(\\lambda \\in \\mathbb{F}\\) נקרא ערך עצמי (ע"ע) אם קיים וקטור <strong>שאינו אפס</strong> \\(v \\ne 0\\) כך ש־
    \\[ A v = \\lambda v \\iff (A - \\lambda I)v = 0 \\]
    הווקטור \\(v\\) נקרא וקטור עצמי (ו"ע) המתאים ל־\\(\\lambda\\).
  </dd>
  <dt>מרחב עצמי (Eigenspace)</dt>
  <dd>עבור ע"ע \\(\\lambda\\), המרחב העצמי \\(V_\\lambda\\) הוא אוסף כל הווקטורים העצמיים המתאימים ל־\\(\\lambda\\) יחד עם וקטור האפס:
    \\[ V_\\lambda = \\ker(A - \\lambda I) = \\{v \\in \\mathbb{F}^n \\mid Av = \\lambda v\\} \\]
    זהו תת־מרחב של \\(\\mathbb{F}^n\\).
  </dd>
  <dt>ריבוי אלגברי (Algebraic Multiplicity)</dt>
  <dd>החזקה של הגורם \\((x - \\lambda)\\) בפירוק הפולינום האופייני \\(P_A(x)\\). מסומן \\(\\text{ר"א}(\\lambda)\\) או \\(\\mu_A(\\lambda)\\).</dd>
  <dt>ריבוי גיאומטרי (Geometric Multiplicity)</dt>
  <dd>ממד המרחב העצמי: \\(\\text{ר"ג}(\\lambda) = \\dim V_\\lambda = \\dim \\ker(A - \\lambda I) = n - \\text{rank}(A - \\lambda I)\\). מתקיים תמיד: \\(1 \\le \\text{ר"ג} \\le \\text{ר"א}\\).</dd>
  <dt>לכסון מטריצה (Matrix Diagonalization)</dt>
  <dd>מטריצה \\(A\\) נקראת לכסינה אם קיימת מטריצה הפיכה \\(P\\) ומטריצה אלכסונית \\(D\\) כך ש־
    \\[ P^{-1} A P = D \\iff A = P D P^{-1} \\]
    עמודות \\(P\\) הן וקטורים עצמיים בת"ל של \\(A\\), ואיברי האלכסון של \\(D\\) הם הערכים העצמיים המתאימים.
  </dd>
</dl>

<div class="panel">
  <h4>מתכון עבודה שלב־אחר־שלב: אלגוריתם הלכסון המלא ב־4 שלבים</h4>
  <ol>
    <li><strong>שלב 1: מציאת ע"ע וריבויים אלגבריים:</strong> מחשבים את הפולינום האופייני \\(P_A(x) = \\det(xI - A)\\), מפרקים לגורמים לינאריים, ומוצאים את כל השורשים \\(\\lambda_i\\) ואת הריבוי האלגברי של כל אחד (\\(\\text{ר"א}\\)).</li>
    <li><strong>שלב 2: מציאת ו"ע וריבויים גיאומטריים:</strong> לכל ערך עצמי \\(\\lambda_i\\), מדרגים את המערכת ההומוגנית \\((A - \\lambda_i I)v = 0\\), מחלצים בסיס למרחב העצמי \\(V_{\\lambda_i}\\), ובודקים ש־\\(\\text{ר"ג} = \\text{ר"א}\\). (אם עבור ע"ע כלשהו \\(\\text{ר"ג} \\lt \\text{ר"א}\\) – עוצרים מיד: המטריצה אינה לכסינה!).</li>
    <li><strong>שלב 3: הרכבת המטריצות \\(P\\) ו־\\(D\\):</strong> מציבים את הווקטורים העצמיים שמצאנו כעמודות המטריצה המלכסנת \\(P\\). בונים את המטריצה האלכסונית \\(D\\) כך שהערכים העצמיים מופיעים באלכסון בדיוק באותו סדר של העמודות ב־\\(P\\).</li>
    <li><strong>שלב 4: חישוב חזקות מהיר:</strong> \\(A^k = P D^k P^{-1}\\), כאשר \\(D^k = \\text{diag}(\\lambda_1^k, \\dots, \\lambda_n^k)\\).</li>
  </ol>
</div>

<h3>דוגמאות פתורות צעד־אחר־צעד</h3>

<div class="panel">
  <p><strong>דוגמה 1 (קלה: לכסון מלא של מטריצה \\(2 \\times 2\\) וחישוב חזקה גבוהה \\(A^{10}\\)):</strong></p>
  <p>נלכסן את המטריצה \\(A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}\\), ונחשב את \\(A^{10}\\).</p>
  <p><strong>פתרון מפורט צעד־אחר־צעד:</strong></p>
  <ol>
    <li><strong>פולינום אופייני וע"ע:</strong>
      \\[ P_A(x) = \\det \\begin{pmatrix} x - 4 & -1 \\\\ -2 & x - 3 \\end{pmatrix} = (x - 4)(x - 3) - (-1)(-2) = x^2 - 7x + 12 - 2 = x^2 - 7x + 10 \\]
      פירוק לטרינום: \\(P_A(x) = (x - 2)(x - 5)\\).
      הערכים העצמיים הם \\(\\lambda_1 = 2\\) ו־\\(\\lambda_2 = 5\\).
      מכיוון שיש שני ע"ע שונים במטריצה \\(2 \\times 2\\), <strong>המטריצה לכסינה בוודאות</strong>!
    </li>
    <li><strong>וקטור עצמי עבור \\(\\lambda_1 = 2\\):</strong>
      נפתור \\((A - 2I)v = 0\\):
      \\[ A - 2I = \\begin{pmatrix} 4 - 2 & 1 \\\\ 2 & 3 - 2 \\end{pmatrix} = \\begin{pmatrix} 2 & 1 \\\\ 2 & 1 \\end{pmatrix} \\xrightarrow{R_2 \\leftarrow R_2 - R_1} \\begin{pmatrix} 2 & 1 \\\\ 0 & 0 \\end{pmatrix} \\]
      המשוואה: \\(2x + y = 0 \\implies y = -2x\\). נבחר \\(x = 1\\), ונקבל ו"ע:
      \\[ v_1 = \\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix} \\]
    </li>
    <li><strong>וקטור עצמי עבור \\(\\lambda_2 = 5\\):</strong>
      נפתור \\((A - 5I)v = 0\\):
      \\[ A - 5I = \\begin{pmatrix} 4 - 5 & 1 \\\\ 2 & 3 - 5 \\end{pmatrix} = \\begin{pmatrix} -1 & 1 \\\\ 2 & -2 \\end{pmatrix} \\xrightarrow{R_2 \\leftarrow R_2 + 2R_1} \\begin{pmatrix} -1 & 1 \\\\ 0 & 0 \\end{pmatrix} \\]
      המשוואה: \\(-x + y = 0 \\implies y = x\\). נבחר \\(x = 1\\), ונקבל ו"ע:
      \\[ v_2 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} \\]
    </li>
    <li><strong>הרכבת \\(P, D, P^{-1}\\):</strong>
      \\[ P = \\begin{pmatrix} v_1 & v_2 \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ -2 & 1 \\end{pmatrix}, \\quad D = \\begin{pmatrix} 2 & 0 \\\\ 0 & 5 \\end{pmatrix} \\]
      הדטרמיננטה: \\(\\det(P) = 1(1) - 1(-2) = 3\\).
      ההופכית:
      \\[ P^{-1} = \\frac{1}{3} \\begin{pmatrix} 1 & -1 \\\\ 2 & 1 \\end{pmatrix} \\]
    </li>
    <li><strong>חישוב החזקה \\(A^{10}\\):</strong>
      \\[ A^{10} = P D^{10} P^{-1} = \\begin{pmatrix} 1 & 1 \\\\ -2 & 1 \\end{pmatrix} \\begin{pmatrix} 2^{10} & 0 \\\\ 0 & 5^{10} \\end{pmatrix} \\frac{1}{3} \\begin{pmatrix} 1 & -1 \\\\ 2 & 1 \\end{pmatrix} \\]
      \\[ = \\frac{1}{3} \\begin{pmatrix} 2^{10} & 5^{10} \\\\ -2 \\cdot 2^{10} & 5^{10} \\end{pmatrix} \\begin{pmatrix} 1 & -1 \\\\ 2 & 1 \\end{pmatrix} = \\frac{1}{3} \\begin{pmatrix} 2^{10} + 2 \\cdot 5^{10} & -2^{10} + 5^{10} \\\\ -2 \\cdot 2^{10} + 2 \\cdot 5^{10} & 2 \\cdot 2^{10} + 5^{10} \\end{pmatrix} \\]
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 2 (בינונית: לכסון מטריצה \\(3 \\times 3\\) עם ע"ע כפול שבו \\(\\text{ר"ג} = \\text{ר"א} = 2\\) — לכסינה!):</strong></p>
  <p>נלכסן את המטריצה:
    \\[ A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 0 & 3 & 0 \\\\ 2 & 0 & 1 \\end{pmatrix} \\]
    (חישבנו את הפולינום האופייני שלה בסעיף הקודם: \\(P_A(x) = (x - 3)^2 (x + 1)\\)).
  </p>
  <p><strong>פתרון מפורט צעד־אחר־צעד:</strong></p>
  <ol>
    <li>הערכים העצמיים הם: \\(\\lambda_1 = 3\\) עם \\(\\text{ר"א} = 2\\), ו־\\(\\lambda_2 = -1\\) עם \\(\\text{ר"א} = 1\\).
      כדי ש־\\(A\\) תהיה לכסינה, אנו חייבים שעבור \\(\\lambda = 3\\) המרחב העצמי יהיה ממימד 2 (\\(\\text{ר"ג} = 2\\)).
    </li>
    <li><strong>בדיקת \\(\\lambda_1 = 3\\) ומציאת שני וקטורים עצמיים בת"ל:</strong>
      נפתור \\((A - 3I)v = 0\\):
      \\[ A - 3I = \\begin{pmatrix} 1 - 3 & 0 & 2 \\\\ 0 & 3 - 3 & 0 \\\\ 2 & 0 & 1 - 3 \\end{pmatrix} = \\begin{pmatrix} -2 & 0 & 2 \\\\ 0 & 0 & 0 \\\\ 2 & 0 & -2 \\end{pmatrix} \\]
      נדרג: שורה 3 שווה ל־\\(-R_1\\), ושורה 2 כולה אפסים:
      \\[ \\xrightarrow{R_3 \\leftarrow R_3 + R_1} \\begin{pmatrix} -2 & 0 & 2 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\xrightarrow{R_1 \\leftarrow -\\frac{1}{2} R_1} \\begin{pmatrix} 1 & 0 & -1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\]
      יש לנו רק שורה אחת שאינה אפס: \\(x - z = 0 \\implies x = z\\).<br>
      המשתנים \\(y\\) ו־\\(z\\) הם <strong>שני משתנים חופשיים</strong>!
      לכן \\(\\dim V_3 = 2 = \\text{ר"ג}\\), ומתקיים שוויון מלא \\(\\text{ר"ג} = \\text{ר"א} = 2\\)!
    </li>
    <li>נחלץ 2 וקטורים עצמיים בת"ל בעזרת טריק ה־"1 ו־0":
      הצבה 1: \\((y = 1, z = 0) \\implies x = 0 \\implies v_1 = \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix}\\).<br>
      הצבה 2: \\((y = 0, z = 1) \\implies x = 1 \\implies v_2 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix}\\).
    </li>
    <li><strong>בדיקת \\(\\lambda_2 = -1\\):</strong>
      נפתור \\((A - (-1)I)v = (A + I)v = 0\\):
      \\[ A + I = \\begin{pmatrix} 2 & 0 & 2 \\\\ 0 & 4 & 0 \\\\ 2 & 0 & 2 \\end{pmatrix} \\xrightarrow{R_3 \\leftarrow R_3 - R_1} \\begin{pmatrix} 2 & 0 & 2 \\\\ 0 & 4 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\to \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\]
      משורה 2: \\(y = 0\\). משורה 1: \\(x + z = 0 \\implies x = -z\\). משתנה חופשי \\(z = 1\\):
      \\[ v_3 = \\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\end{pmatrix} \\]
    </li>
    <li><strong>מסקנה והרכבת המטריצות:</strong>
      יש לנו 3 וקטורים עצמיים בת"ל, ולכן \\(A\\) לכסינה!
      \\[ P = \\begin{pmatrix} v_1 & v_2 & v_3 \\end{pmatrix} = \\begin{pmatrix} 0 & 1 & -1 \\\\ 1 & 0 & 0 \\\\ 0 & 1 & 1 \\end{pmatrix}, \\quad D = \\begin{pmatrix} 3 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & -1 \\end{pmatrix} \\]
      מתקיים במדויק: \\(P^{-1} A P = D\\).
    </li>
  </ol>
</div>

<div class="panel">
  <p><strong>דוגמה 3 (ברמת לינארית 2: מטריצה \\(3 \\times 3\\) עם ע"ע כפול שבו \\(\\text{ר"ג} = 1 \\lt 2 = \\text{ר"א}\\) — אינה לכסינה וגשר לצורת ז'ורדן!):</strong></p>
  <p>נתונה המטריצה:
    \\[ A = \\begin{pmatrix} 3 & 1 & 0 \\\\ -1 & 1 & 0 \\\\ 0 & 0 & 4 \\end{pmatrix} \\]
    נקבע האם \\(A\\) ניתנת ללכסון, נסביר מדוע הלכסון נכשל, ונקשר זאת לצורת ז'ורדן ביחידה 11.
  </p>
  <p><strong>פתרון מפורט צעד־אחר־צעד:</strong></p>
  <ol>
    <li><strong>מציאת הפולינום האופייני:</strong>
      \\[ xI - A = \\begin{pmatrix} x - 3 & -1 & 0 \\\\ 1 & x - 1 & 0 \\\\ 0 & 0 & x - 4 \\end{pmatrix} \\]
      נפתח לפי השורה השלישית:
      \\[ P_A(x) = (x - 4) \\cdot \\det \\begin{pmatrix} x - 3 & -1 \\\\ 1 & x - 1 \\end{pmatrix} = (x - 4) \\left( (x - 3)(x - 1) - (-1)(1) \\right) \\]
      \\[ = (x - 4) (x^2 - 4x + 3 + 1) = (x - 4)(x^2 - 4x + 4) = (x - 4)(x - 2)^2 \\]
    </li>
    <li>הערכים העצמיים הם:
      \\(\\lambda_1 = 4\\) בעל ריבוי אלגברי \\(\\text{ר"א} = 1\\).<br>
      \\(\\lambda_2 = 2\\) בעל ריבוי אלגברי \\(\\text{ר"א} = 2\\).
    </li>
    <li><strong>בדיקת הריבוי הגיאומטרי עבור \\(\\lambda = 2\\):</strong>
      נפתור את המערכת ההומוגנית \\((A - 2I)v = 0\\):
      \\[ A - 2I = \\begin{pmatrix} 3 - 2 & 1 & 0 \\\\ -1 & 1 - 2 & 0 \\\\ 0 & 0 & 4 - 2 \\end{pmatrix} = \\begin{pmatrix} 1 & 1 & 0 \\\\ -1 & -1 & 0 \\\\ 0 & 0 & 2 \\end{pmatrix} \\]
      נדרג שורות:
      \\(R_2 \\leftarrow R_2 + R_1 \\implies (0, 0, 0)\\).<br>
      נחליף בין שורה 2 לשורה 3 ונחלק ב־2:
      \\[ \\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix} \\]
      שימו לב: ישנם שני איברים מובילים (בעמודה 1 ובעמודה 3)!
      המשוואות: \\(z = 0\\), ו־\\(x + y = 0 \\implies x = -y\\).
      יש <strong>רק משתנה חופשי אחד (\\(y\\))</strong>!
      לכן:
      \\[ \\text{ר"ג}(2) = \\dim V_2 = 3 - \\text{rank}(A - 2I) = 3 - 2 = 1 \\]
    </li>
    <li><strong>קריסת הלכסינות:</strong>
      קיבלנו:
      \\[ \\text{ר"ג}(2) = 1 \\lt 2 = \\text{ר"א}(2) \\]
      הריבוי הגיאומטרי קטן ממש מהריבוי האלגברי! חסר לנו וקטור עצמי אחד כדי להגיע ל־3 וקטורים עצמיים בת"ל.
      לכן: <strong>המטריצה \\(A\\) אינה ניתנת ללכסון בשום בסיס!</strong>
    </li>
    <li><strong>הגשר ליחידה 11 (צורת ז'ורדן):</strong>
      אף על פי שאי אפשר ללכסן את \\(A\\), ביחידה 11 נלמד שניתן להביא אותה ל<strong>צורת ז'ורדן</strong>:
      \\[ J = \\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 4 \\end{pmatrix} \\]
      הבלוק \\(\\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}\\) הוא <strong>בלוק ז'ורדן</strong> מגודל \\(2 \\times 2\\), וה־1 שמעל האלכסון מפצה על הוקטור העצמי החסר בעזרת "וקטור עצמי מוכלל" (\\((A - 2I)^2 v = 0\\)).
    </li>
  </ol>
</div>

<div class="linear-lab" data-linear-lab="eigen-2d"></div>
      `,
    },
  ],
};
