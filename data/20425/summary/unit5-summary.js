// edit-pass: 1 | expansion: L1 | date: 2026-11-02
window.SUMMARY_PROSE = window.SUMMARY_PROSE || [];
window.SUMMARY_PROSE.push({
  unit: "5",
  title: "יחידה 5 · משתנים מקריים רציפים",
  intro: "צפיפות מול הסתברות בנקודה, מעבר אל פונקציית ההתפלגות המצטברת, חישוב תוחלת ושונות באינטגרלים, התפלגויות אחידה, נורמלית ומעריכית, קירוב נורמלי לבינומית וטרנספורמציות.",
  parts: [
    {
      id: "density",
      title: "צפיפות, CDF ותוחלת",
      html: `
        <ul>
          <li><strong>פונקציית צפיפות:</strong> \\(f(x)\\ge 0\\) והשטח הכולל תחתיה הוא \\(\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1\\). הסתברות של קטע היא השטח תחת הגרף: \\(P(a\\le X\\le b) = \\int_a^b f(x)\\,dx\\).</li>
          <li><strong>נקודה בודדת:</strong> ברציף \\(P(X=a)=0\\) לכל \\(a\\), ולכן קצוות הקטע אינם משפיעים: \\(P(a\\le X\\le b) = P(a\\lt X\\lt b)\\). גובה הצפיפות אינו הסתברות ויכול לעלות על 1.</li>
          <li><strong>קשר ל־CDF:</strong> הפונקציה המצטברת היא אינטגרל הצפיפות \\(F(x) = \\int_{-\\infty}^x f(t)\\,dt\\), וגוזרים אותה לקבלת הצפיפות: \\(F'(x) = f(x)\\). הסתברות קטע: \\(P(a\\le X\\le b) = F(b) - F(a)\\).</li>
          <li><strong>תוחלת ושונות:</strong> \\(E[X] = \\int_{-\\infty}^{\\infty} x f(x)\\,dx\\), \\(E[X^2] = \\int_{-\\infty}^{\\infty} x^2 f(x)\\,dx\\), ו־\\(\\operatorname{Var}(X) = E[X^2] - (E[X])^2\\). לינאריות: \\(E[aX+b] = aE[X]+b\\), \\(\\operatorname{Var}(aX+b) = a^2\\operatorname{Var}(X)\\).</li>
          <li><strong>LOTUS:</strong> \\(E[g(X)] = \\int_{-\\infty}^{\\infty} g(x) f(x)\\,dx\\). ממצעים ישירות דרך צפיפות \\(X\\), ללא בניית צפיפות עבור \\(g(X)\\).</li>
          <li><strong>למת הזנב:</strong> עבור משתנה אי־שלילי (\\(X\\ge 0\\)) בלבד: \\(E[X] = \\int_0^{\\infty} P(X > x)\\,dx = \\int_0^{\\infty} (1 - F(x))\\,dx\\).</li>
        </ul>
        <!-- L2: להוסיף נוסחת תוחלת מפוצלת לשני זנבות עבור משתנה רציף כללי היכול לקבל גם ערכים שליליים -->
      `,
    },
    {
      id: "named",
      title: "אחידה, נורמלית, מעריכית וגמא",
      html: `
        <table class="dist-table" style="width:100%; border-collapse:collapse; text-align:right;">
          <thead>
            <tr>
              <th style="border:1px solid var(--line); padding:0.35rem;">התפלגות</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">צפיפות \\(f(x)\\)</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">תוחלת \\(E[X]\\)</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">שונות \\(\\operatorname{Var}(X)\\)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">אחידה \\(U(a,b)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(1/(b-a)\\) על \\([a,b]\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\((a+b)/2\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\((b-a)^2/12\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">נורמלית \\(N(\\mu,\\sigma^2)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\frac{1}{\\sigma\\sqrt{2\\pi}}\\exp\\big(-(x-\\mu)^2/(2\\sigma^2)\\big)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\mu\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\sigma^2\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">מעריכית \\(\\operatorname{Exp}(\\lambda)\\) (קצב)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\lambda e^{-\\lambda x}\\), \\(x\\ge 0\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(1/\\lambda\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(1/\\lambda^2\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">גמא \\(\\operatorname{Gamma}(\\alpha,\\lambda)\\) (הרחבה)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\lambda^{\\alpha} x^{\\alpha-1}e^{-\\lambda x}/\\Gamma(\\alpha)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\alpha/\\lambda\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\alpha/\\lambda^2\\)</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li><strong>תקנון נורמלי:</strong> \\(Z = (X-\\mu)/\\sigma\\sim N(0,1)\\). סימטריה: \\(\\Phi(-z) = 1 - \\Phi(z)\\), \\(P(|Z|\\le z) = 2\\Phi(z) - 1\\). כלל 68–95–99.7: כ־0.6827, 0.9545 ו־0.9973 עבור 1, 2 ו־3 סטיות תקן.</li>
          <li><strong>דה־מואבר–לפלס:</strong> \\(B(n,p)\\approx N(np, np(1-p))\\) כש־\\(np, n(1-p)\\ge 10\\). עם תיקון רציפות: \\(P(a\\le X\\le b)\\approx\\Phi\\big((b+0.5-\\mu)/\\sigma\\big) - \\Phi\\big((a-0.5-\\mu)/\\sigma\\big)\\).</li>
          <li><strong>חוסר־הזיכרון של המעריכית:</strong> \\(P(X > s+t \\mid X > t) = P(X > s)\\) לכל \\(s,t\\ge 0\\). בקורס זוהי ההתפלגות היחידה שנקראת חסרת־זיכרון. בתהליך פואסון בקצב \\(\\lambda\\), הזמן עד המופע הראשון הוא \\(\\operatorname{Exp}(\\lambda)\\).</li>
          <li><strong>קצב סיכון (הרחבה):</strong> \\(r(t) = f(t)/(1-F(t))\\). למעריכית קצב הסיכון הוא הקבוע \\(\\lambda\\).</li>
          <li><strong>גמא (הרחבה):</strong> סכום של \\(n\\) מעריכיות i.i.d. הוא \\(\\operatorname{Gamma}(n,\\lambda)\\), זמן ההמתנה עד האירוע ה־\\(n\\) בתהליך פואסון.</li>
        </ul>
        <!-- L2: להוסיף דיאגרמת זרימה לבחירת מודל רציף: אחידה (ללא העדפה), מעריכית (זמן ללא בלאי), נורמלית (סכום רעשים) -->
      `,
    },
    {
      id: "transform",
      title: "פונקציה של משתנה מקרי",
      html: `
        <ul>
          <li><strong>שיטת ה־CDF:</strong> עובדת תמיד! רושמים \\(F_Y(y) = P(g(X)\\le y)\\), מחשבים בעזרת \\(F_X\\), וגוזרים: \\(f_Y(y) = F_Y'(y)\\).</li>
          <li><strong>הנוסחה לטרנספורמציה מונוטונית:</strong> כאשר \\(g\\) מונוטונית ממש וגזירה עם הופכית \\(h = g^{-1}\\):
            \\[ f_Y(y) = f_X\\big(h(y)\\big) \\cdot \\big|h'(y)\\big| \\]
          </li>
          <li><strong>העתקה לינארית:</strong> \\(Y = aX + b\\) נותן \\(f_Y(y) = \\frac{1}{|a|} f_X\\left(\\frac{y-b}{a}\\right)\\). משתנה נורמלי נשאר נורמלי.</li>
          <li><strong>פונקציה שאינה חח\"ע (כגון \\(Y=X^2\\) על תחום חיובי ושלילי):</strong> מפצלים לענפים מונוטוניים וסוכמים את התרומות, או משתמשים בשיטת ה־CDF.</li>
        </ul>
        <!-- L2: להוסיף את שיטת היעקוביאן לטרנספורמציה של וקטור מקרי דו-ממדי כהכנה ליחידה 6 -->
      `,
    },
  ],
});

window.SUMMARY_DETAIL = window.SUMMARY_DETAIL || {};
Object.assign(window.SUMMARY_DETAIL, {
  "p5-c1": "אחידה על (0, 1/2) היא צפיפות בגובה 2. השטח 1, וכל נקודה בודדת בהסתברות 0.",
  "p5-c2": "בבדיד הקצוות חשובים: F(b)-F(a) משמיט את a. ברציף עם צפיפות אין קפיצה, וההבדל בין אי־שוויון חלש לחזק נעלם.",
  "p5-c3": "באחידה על [a,b] ה-CDF רציפה, אבל השיפוע נשבר ב-a וב-b. ערך הצפיפות בנקודת השבר אינו משנה אינטגרלים.",
  "p5-c4": "למת הזנב דורשת X≥0. על הצפיפות x/2 בקטע (0,2) האינטגרל של 1-F יוצא 4/3, וזו גם התוחלת הישירה.",
  "p5-c5": "הסתברות של תת-קטע היא האורך חלקי b-a. השונות נושאת את אורך הקטע בריבוע, חלקי 12.",
  "p5-c6": "N(70,64) פירושו סטיית תקן 8. מי שמחלק ב-64 מקבל תקנון שגוי. טבלת Φ נותנת שטח משמאל; זנב ימני הוא 1-Φ(z).",
  "p5-c7": "Φ(-1.5)=1-Φ(1.5). עם Φ(1.5)≈0.9332 מתקבל 0.0668, וזה גם P(Z≥1.5).",
  "p5-c8": "Bin(100,1/2): P(45≤X≤55) יוצא בערך 0.7287 גם בחישוב מדויק וגם עם תיקון אל [44.5,55.5]. בלי תיקון נשארים על 0.6827.",
  "p5-c9": "אם הפרמטר בספר הוא הממוצע θ, הצפיפות היא (1/θ)e^{-x/θ}. כאן λ הוא קצב והממוצע הוא 1/λ. P(X>5 | X>2)=P(X>3) כש-λ=1.",
  "p5-c10": "ל-Exp(2) מתקבל r(t)=2 לכל t>0. הצפיפות 2e^{-2t} יורדת כי נשארת פחות מסה, לא כי הסיכון המותנה יורד.",
  "p5-c11": "זמן עד האירוע השלישי בקצב 1 הוא Gamma(3,1), תוחלת 3. P(T>2)=P(N(2)≤2)=5e^{-2}≈0.6767.",
  "p5-c12": "ל-U(0,1) ול-Y=X^2 הצפיפות היא 1/(2√y) על (0,1). בנקודה 1/4 הערך הוא 1. כש-X אחיד על (-1,1) שתי הופכיות, והסכום נותן אותה צפיפות.",
});
