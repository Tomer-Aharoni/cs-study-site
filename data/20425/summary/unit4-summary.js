// edit-pass: 1 | expansion: L1 | date: 2026-11-02
window.SUMMARY_PROSE = window.SUMMARY_PROSE || [];
window.SUMMARY_PROSE.push({
  unit: "4",
  title: "יחידה 4 · משתנים מקריים בדידים",
  intro: "תמצית ממוקדת: משתנה מקרי כפונקציה ממרחב המדגם, פונקציית הסתברות ופונקציית התפלגות מצטברת, תוחלת, משפט LOTUS ושונות, ושבע ההתפלגויות הבדידות שבדף הנוסחאות: אחיד בדיד, ברנולי, בינומית, פואסון, גיאומטרית, בינומית שלילית והיפרגיאומטרית.",
  parts: [
    {
      id: "rv",
      title: "משתנה מקרי, פונקציית הסתברות ו־CDF",
      html: `
        <ul>
          <li><strong>משתנה מקרי (\\(X\\)):</strong> פונקציה דטרמיניסטית ממרחב המדגם אל הממשיים (\\(X:\\Omega\\to\\mathbb{R}\\)). המאורע \\(\\{X=x\\}\\) הוא קבוצת התוצאות שעבורן \\(X(\\omega)=x\\).</li>
          <li><strong>משתנה בדיד ותומך:</strong> הטווח בן־מנייה (סופי או אינסופי כגון \\(\\{0,1,2,\\ldots\\}\\)). התומך הוא קבוצת הערכים שבהם \\(p(x) > 0\\).</li>
          <li><strong>פונקציית הסתברות (PMF):</strong> \\(p(x)=P(X=x)\\). שני תנאים מחייבים:
            \\[ p(x) \\ge 0, \\qquad \\sum_{x} p(x) = 1 \\]
            לכל קבוצה \\(A\\): \\(P(X \\in A) = \\sum_{x \\in A} p(x)\\).
          </li>
          <li><strong>פונקציית התפלגות מצטברת (CDF):</strong> \\(F(x)=P(X\\le x)\\). מונוטונית לא־יורדת, שואפת ל־0 ב־\\(-\\infty\\), ל־1 ב־\\(\\infty\\), ורציפה מימין: \\(\\lim_{t\\downarrow x} F(t) = F(x)\\).</li>
          <li><strong>קפיצות וקטעים ב־CDF:</strong>
            <ul>
              <li>גובה הקפיצה בנקודה: \\(P(X=a) = F(a) - F(a^-)\\).</li>
              <li>קטע פתוח משמאל: \\(P(a < X \\le b) = F(b) - F(a)\\).</li>
              <li>למשתנה שלם־ערכי: הקטע הסגור הוא \\(P(a \\le X \\le b) = F(b) - F(a-1)\\), והזנב הוא \\(P(X \\ge a) = 1 - F(a-1)\\).</li>
            </ul>
          </li>
        </ul>
      `,
    },
    {
      id: "moments",
      title: "תוחלת, LOTUS ושונות",
      html: `
        <ul>
          <li><strong>תוחלת (מרכז כובד):</strong> \\(E[X] = \\sum x \\cdot p(x)\\), בתנאי ש־\\(\\sum |x| p(x) < \\infty\\).</li>
          <li><strong>נוסחת סכומי זנב (לערכים \\(0,1,2,\\ldots\\)):</strong>
            \\[ E[X] = \\sum_{k=1}^{\\infty} P(X \\ge k) = \\sum_{k=0}^{\\infty} P(X > k) \\]
          </li>
          <li><strong>משפט LOTUS:</strong> \\(E[g(X)] = \\sum g(x) p(x)\\) ללא צורך במציאת התפלגות \\(g(X)\\).</li>
          <li><strong>לינאריות:</strong> \\(E[aX + b] = aE[X] + b\\). שימו לב: באופן כללי \\(E[g(X)] \\ne g(E[X])\\), ובפרט \\(E[X^2] \\ne (E[X])^2\\).</li>
          <li><strong>שונות (מדד פיזור):</strong> \\(\\operatorname{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2\\). תמיד אי־שלילית, ושווה 0 רק לקבוע.</li>
          <li><strong>טרנספורמציה של שונות:</strong> \\(\\operatorname{Var}(aX + b) = a^2 \\operatorname{Var}(X)\\), וסטיית התקן היא \\(\\operatorname{SD}(aX+b) = |a|\\operatorname{SD}(X)\\). הקבוע החופשי \\(b\\) נופל.</li>
          <li><strong>סכום ללא תלות:</strong> \\(E[\\sum a_i X_i] = \\sum a_i E[X_i]\\) תקף תמיד, ללא שום דרישת אי־תלות! למשתנה אינדיקטור: \\(E[I_A] = P(A)\\). שונות של סכום מתפרקת לסכום שונויות רק בהינתן אי־תלות.</li>
        </ul>
      `,
    },
    {
      id: "dists",
      title: "ההתפלגויות הבדידות שבדף הנוסחאות",
      html: `
        <table class="dist-table" style="width:100%; border-collapse:collapse; text-align:right;">
          <thead>
            <tr>
              <th style="border:1px solid var(--line); padding:0.35rem;">התפלגות</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">פונקציית הסתברות \\(P(X=k)\\)</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">תוחלת</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">שונות</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">אחיד בדיד \\(U\\{m+1,\\dots,m+n\\}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(1/n\\), \\(k=m+1,\\ldots,m+n\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(m+\\frac{n+1}{2}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\frac{n^2-1}{12}\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">ברנולי \\(\\operatorname{Bernoulli}(p)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(P(1)=p, P(0)=1-p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(p(1-p)\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">בינומית \\(B(n,p)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\binom{n}{k}p^k(1-p)^{n-k}\\), \\(0\\le k\\le n\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(np\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(np(1-p)\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">פואסון \\(\\operatorname{Po}(\\lambda)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(e^{-\\lambda}\\lambda^k/k!\\), \\(k\\ge 0\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\lambda\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\lambda\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">גיאומטרית \\(\\operatorname{Geo}(p)\\) (ניסויים)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\((1-p)^{k-1}p\\), \\(k\\ge 1\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(1/p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\frac{1-p}{p^2}\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">בינומית שלילית \\(\\operatorname{NB}(r,p)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\binom{k-1}{r-1}p^r(1-p)^{k-r}\\), \\(k\\ge r\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(r/p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\frac{r(1-p)}{p^2}\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">היפרגיאומטרית \\(H(N,m,n)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\binom{m}{k}\\binom{N-m}{n-k}/\\binom{N}{n}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(n\\frac{m}{N}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(n\\frac{m}{N}(1-\\frac{m}{N})\\frac{N-n}{N-1}\\)</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li><strong>שכיח בינומי:</strong> \\(\\lfloor(n+1)p\\rfloor\\). אם \\((n+1)p\\) שלם, שני ערכים עוקבים שכיחים.</li>
          <li><strong>קירוב פואסון:</strong> \\(n\\) גדול ו־\\(p\\) קטן (כלל אצבע: \\(np>10, p<0.1\\) או \\(n\\ge 100, p\\le 0.05\\)). פרדיגמת פואסון מאפשרת הסתברויות \\(p_i\\) שונות. סכום פואסונים בלתי תלויים הוא פואסון.</li>
          <li><strong>גיאומטרי:</strong> זנב \\(P(X>k)=(1-p)^k\\). זהות אי־התלות בעבר תקפה לשלמים; השם חוסר זיכרון שמור למעריכית.</li>
          <li><strong>תיקון אוכלוסייה סופית:</strong> \\(\\frac{N-n}{N-1}\\) מקטין שונות היפרגיאומטרית ביחס לבינומית.</li>
        </ul>
      `,
    },
    {
      id: "pick",
      title: "מדריך החלטה – מתי להשתמש בכל כלי",
      html: `
        <ul>
          <li><strong>ניסוי יחיד (0 או 1):</strong> ברנולי עם פרמטר \\(p\\).</li>
          <li><strong>מספר קבוע \\(n\\) של ניסויים בלתי תלויים, סופרים הצלחות:</strong> בינומית \\(B(n,p)\\).</li>
          <li><strong>סופרים ניסיונות עצמאיים עד הצלחה ראשונה:</strong> גיאומטרית \\(\\operatorname{Geo}(p)\\), תוחלת \\(1/p\\).</li>
          <li><strong>סופרים ניסיונות עצמאיים עד הצלחה מספר \\(r\\):</strong> בינומית שלילית \\(\\operatorname{NB}(r,p)\\), תוחלת \\(r/p\\).</li>
          <li><strong>דגימה ללא החזרה מאוכלוסייה סופית:</strong> היפרגיאומטרית \\(H(N,m,n)\\).</li>
          <li><strong>ספירת מאורעות נדירים ברצף זמן או שטח:</strong> פואסון \\(\\operatorname{Po}(\\lambda)\\). בחלון באורך \\(t\\) הקצב הוא \\(\\lambda t\\).</li>
          <li><strong>שליפה ללא החזרה עד למציאת הפריט המיוחד היחיד:</strong> אחיד בדיד על \\(\\{1, \\ldots, n\\}\\).</li>
        </ul>
      `,
    },
  ],
});

window.SUMMARY_DETAIL = window.SUMMARY_DETAIL || {};
Object.assign(window.SUMMARY_DETAIL, {
  "p4-c1": "דוגמה: שני מטבעות, X מספר העצים. ארבע תוצאות מתכווצות לשלושה ערכים מספריים: P(X=1)=1/2 כי שתי תוצאות מובילות לערך 1.",
  "p4-c2": "לפני חישוב תוחלת מוודאים שההסתברויות מסתכמות ל־1 בדיוק. ערך גדול מ־1 או שלילי מעיד על שגיאה ופוסל את ההתפלגות.",
  "p4-c3": "F(b)-F(a) פתוח משמאל. למשתנה שלם, כדי לכלול את a מחסירים את F(a-1): P(a≤X≤b) = F(b)-F(a-1). בנקודת קפיצה הגרף רציף מימין.",
  "p4-c4": "למשתנה שלם אי־שלילי, סכום הזנבות P(X≥k) נותן את התוחלת. הוכחה קצרה לגיאומטרי: סכום הנדסי של (1-p)^k נותן מיד 1/p ללא גזירת טורים.",
  "p4-c5": "Var(-2X+5) = (-2)^2 · Var(X) = 4·Var(X). שונות שלילית מעידה תמיד שהוחלף בטעות בין E[X^2] לבין (E[X])^2.",
  "p4-c6": "השכיח הבינומי הוא רצפת (n+1)p. אם (n+1)p שלם, יש שני שכיחים עוקבים. השכיח אינו בהכרח המספר השלם הקרוב ביותר לתוחלת np.",
  "p4-c7": "בפואסון התוחלת שווה לשונות: E[X]=Var(X)=λ. אם נתונים אמפיריים מציגים שונות הרחוקה מאוד מהממוצע, פואסון אינה מודל מתאים.",
  "p4-c8": "זנב גיאומטרי: P(X>k)=(1-p)^k. אם שאלה מגדירה את המשתנה כמספר הכישלונות בלבד, התומך מתחיל מ־0 והתוחלת היא (1-p)/p.",
  "p4-c9": "ההצלחה ה־r חייבת להתרחש בניסוי האחרון k, ולכן r-1 ההצלחות הקודמות מתפזרות ב־k-1 הניסיונות הראשונים. מכאן המקדם C(k-1, r-1).",
  "p4-c10": "תיקון אוכלוסייה סופית (N-n)/(N-1) קטן מ־1 ומקטין את השונות ביחס לבינומית. כש־n=1 המקדם הוא 1; כש־n=N אין שונות כלל (0).",
  "p4-c11": "האינדיקטורים של פריטים במדגם תלויים זה בזה, אך תוחלת הסכום שווה לסכום התוחלות תמיד. זהו כלי המפתח להוכחת תוחלת בינומית והיפרגיאומטרית.",
  "p4-c12": "עץ החלטות ב־2 שאלות: האם מספר הניסיונות קבוע (בינומית/היפרגיאומטרית) או שעוצרים בהצלחה (גיאומטרית/בינומית שלילית)? האם יש החזרה או שאין?",
});
