window.SUMMARY_PROSE = window.SUMMARY_PROSE || [];
window.SUMMARY_PROSE.push({
  unit: "5",
  title: "יחידה 5 · משתנים מקריים רציפים",
  intro: "צפיפות מול הסתברות של נקודה, הקשר אל פונקציית ההתפלגות, תוחלת ושונות, אחידה נורמלית ומעריכית, קירוב נורמלי לבינומית, ופונקציה של משתנה מקרי.",
  parts: [
    {
      id: "density",
      title: "צפיפות, CDF ותוחלת",
      html: `
        <ul>
          <li>\\(f\\ge 0\\) ו־\\(\\int_{-\\infty}^{\\infty}f=1\\). \\(P(a\\le X\\le b)=\\int_a^b f\\). \\(P(X=a)=0\\), ולכן קצוות הקטע אינם משנים.</li>
          <li>\\(F(x)=\\int_{-\\infty}^{x}f\\), ו־\\(F'(x)=f(x)\\) במקום רציפות של \\(f\\). \\(P(a\\lt X\\le b)=F(b)-F(a)\\).</li>
          <li>\\(E[X]=\\int x f(x)\\,dx\\), \\(E[g(X)]=\\int g(x)f(x)\\,dx\\), \\(\\operatorname{Var}(X)=E[X^2]-(E[X])^2\\).</li>
          <li>\\(\\operatorname{Var}(aX+b)=a^2\\operatorname{Var}(X)\\). \\(E[g(X)]=g(E[X])\\) לפונקציה לינארית בלבד, בדרך כלל.</li>
          <li>אם \\(X\\ge 0\\): \\(E[X]=\\int_0^{\\infty}P(X\\gt x)\\,dx\\).</li>
        </ul>
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
              <th style="border:1px solid var(--line); padding:0.35rem;">צפיפות</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">תוחלת</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">שונות</th>
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
              <td style="border:1px solid var(--line); padding:0.35rem;">מעריכית \\(\\operatorname{Exp}(\\lambda)\\), קצב</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\lambda e^{-\\lambda x}\\), \\(x\\ge 0\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(1/\\lambda\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(1/\\lambda^2\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">גמא \\(\\alpha,\\lambda\\) (הרחבה)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\lambda^{\\alpha} x^{\\alpha-1}e^{-\\lambda x}/\\Gamma(\\alpha)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\alpha/\\lambda\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\alpha/\\lambda^2\\)</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li><strong>תקנון:</strong> \\(Z=(X-\\mu)/\\sigma\\). \\(\\Phi(-z)=1-\\Phi(z)\\). \\(P(|Z|\\le z)=2\\Phi(z)-1\\).</li>
          <li><strong>68–95–99.7:</strong> בפועל כ־\\(0.6827\\), \\(0.9545\\), \\(0.9973\\). \\(\\Phi(1)\\approx 0.8413\\), \\(\\Phi(2)\\approx 0.9772\\), \\(\\Phi(1.96)\\approx 0.9750\\).</li>
          <li><strong>דה־מואבר–לפלס:</strong> \\(B(n,p)\\) קרובה ל־\\(N(np,np(1-p))\\) כש־\\(np\\) ו־\\(n(1-p)\\) גדולים (אצבע: לפחות 10). \\(P(a\\le X\\le b)\\approx\\Phi((b+0.5-\\mu)/\\sigma)-\\Phi((a-0.5-\\mu)/\\sigma)\\).</li>
          <li><strong>מעריכית:</strong> \\(P(X\\gt s+t\\mid X\\gt t)=P(X\\gt s)\\) לכל \\(s,t\\ge 0\\). זהו המשתנה היחיד שהקורס מכנה חסר־זיכרון. בתהליך פואסון בקצב \\(\\lambda\\), \\(N(t)\\sim\\operatorname{Po}(\\lambda t)\\) והזמן עד המופע הראשון הוא \\(\\operatorname{Exp}(\\lambda)\\).</li>
          <li><strong>הרחבה:</strong> קצב סיכון וגמא אינם בסיכום פרק 5. תיקון רציפות נלמד בפרק 8.</li>
          <li><strong>קצב סיכון (הרחבה):</strong> \\(r(t)=f(t)/(1-F(t))\\). למעריכית הוא הקבוע \\(\\lambda\\).</li>
          <li><strong>גמא (הרחבה):</strong> סכום של \\(n\\) מעריכיות i.i.d. הוא \\(\\operatorname{Gamma}(n,\\lambda)\\), זמן עד האירוע ה־\\(n\\).</li>
        </ul>
      `,
    },
    {
      id: "transform",
      title: "פונקציה של משתנה מקרי",
      html: `
        <ul>
          <li><strong>CDF:</strong> \\(F_Y(y)=P(g(X)\\le y)\\), ואז \\(f_Y=F_Y'\\).</li>
          <li><strong>מונוטונית:</strong> אם \\(h=g^{-1}\\), אז \\(f_Y(y)=f_X(h(y))\\,|h'(y)|\\).</li>
          <li>לא חד־חד־ערכי, למשל \\(Y=X^2\\) כש־\\(X\\) דו־צדדי: מחברים את ענפי ההופכיות, או נשארים עם שיטת ה־CDF.</li>
          <li>\\(Y=aX+b\\): \\(f_Y(y)=f_X((y-b)/a)/|a|\\). נורמלית נשארת נורמלית.</li>
          <li>רק תוחלת של \\(g(X)\\): LOTUS, בלי לבנות את \\(f_Y\\).</li>
        </ul>
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
