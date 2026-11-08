// edit-pass: 2 | expansion: L2 | date: 2026-11-08
window.SUMMARY_PROSE = window.SUMMARY_PROSE || [];
window.SUMMARY_PROSE.push({
  unit: "4",
  title: "יחידה 4 · משתנים מקריים בדידים",
  intro: "מדריך חשיבה מקיף ומעשי לבחינה: משתנה מקרי כחיישן דטרמיניסטי ממרחב המדגם, פונקציית הסתברות (PMF) כמסת בצק של 1 ק\"ג, פונקציית התפלגות מצטברת (CDF) כגרף מדרגות, תוחלת כמרכז כובד על נדנדה, קיצור הדרך של LOTUS, שונות כמדד סיכון ותנודתיות, וארסנל שבע ההתפלגויות הבדידות שבדף הנוסחאות עם עץ החלטות לזיהוי מיידי.",
  parts: [
    {
      id: "rv",
      title: "משתנה מקרי, פונקציית הסתברות ו־CDF",
      html: `
        <ul>
          <li><strong>משתנה מקרי (\\(X\\)):</strong> חיישן או מד־מדידה דטרמיניסטי לחלוטין ממרחב המדגם אל המספרים הממשיים (\\(X:\\Omega\\to\\mathbb{R}\\)). כל האקראיות מתרחשת בשלב שבו הטבע בוחר את התוצאה \\(\\omega\\). המאורע \\(\\{X=x\\}\\) הוא אוסף כל התוצאות שעבורן החיישן מדווח \\(x\\).</li>
          <li><strong>תומך (Support):</strong> קבוצת הערכים שעבורם ההסתברות חיובית ממש: \\(S_X = \\{x : p(x) \\gt 0\\}\\). במשתנה בדיד, התומך הוא סופי או בן־מנייה.</li>
          <li><strong>פונקציית הסתברות (PMF):</strong> \\(p(x) = P(X=x)\\). שני תנאי סף מחייבים:
            \\[ p(x) \\ge 0, \\qquad \\sum_{x \\in S_X} p(x) = 1 \\]
            ההסתברות ש־\\(X\\) ייפול בקבוצה \\(A\\) היא סכום המשקלים: \\(P(X \\in A) = \\sum_{x \\in A} p(x)\\).
          </li>
          <li><strong>פונקציית התפלגות מצטברת (CDF):</strong> \\(F(x) = P(X \\le x)\\). צוברת את כל ההסתברות משמאל לימין. תכונות ברזל: מונוטונית לא־יורדת, גבול 0 ב־\\(-\\infty\\), גבול 1 ב־\\(\\infty\\), ורציפה מימין (\\(\\lim_{t \\downarrow x} F(t) = F(x)\\)).</li>
          <li><strong>קפיצות וקטעים ב־CDF (נוסחאות מפתח למבחן):</strong>
            <ul>
              <li>גובה הקפיצה בנקודה הוא ההסתברות הנקודתית: \\(P(X=a) = F(a) - F(a^-)\\).</li>
              <li>קטע פתוח משמאל: \\(P(a \\lt X \\le b) = F(b) - F(a)\\).</li>
              <li><strong>למשתנה שלם (חובה!):</strong> הקטע הסגור שכולל את \\(a\\) הוא \\(P(a \\le X \\le b) = F(b) - F(a-1)\\), והזנב הוא \\(P(X \\ge a) = 1 - F(a-1)\\). חיסור \\(F(a)\\) במקום \\(F(a-1)\\) משמיט בשוגג את הנקודה \\(a\\)!</li>
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
          <li><strong>תוחלת (מרכז הכובד):</strong> \\(E[X] = \\sum x \\cdot p(x)\\), בתנאי שהטור מתכנס בהחלט: \\(\\sum |x| p(x) \\lt \\infty\\). זוהי נקודת שיווי המשקל המדויקת של נדנדה עם משקולות ההסתברות, ואינה חייבת להיות ערך שהמשתנה יכול לקבל בפועל!</li>
          <li><strong>נוסחת סכומי זנב (לערכים שלמים אי־שליליים):</strong>
            \\[ E[X] = \\sum_{k=1}^{\\infty} P(X \\ge k) = \\sum_{k=0}^{\\infty} P(X \\gt k) \\]
            חוסכת זמן רב כאשר הסתברויות הזנב פשוטות לחישוב (במיוחד בהתפלגות גיאומטרית).
          </li>
          <li><strong>משפט LOTUS (קיצור הדרך הגאוני):</strong> \\(E[g(X)] = \\sum g(x) p(x)\\). מחשבים תוחלת של פונקציה מתוך ההתפלגות המקורית של \\(X\\), ללא צורך בבניית טבלת התפלגות חדשה ל־\\(g(X)\\).</li>
          <li><strong>לינאריות מול פונקציות כלליות:</strong> \\(E[aX + b] = aE[X] + b\\).
            <strong>אזהרת מבחן:</strong> באופן כללי \\(E[g(X)] \\ne g(E[X])\\), ובפרט \\(E[X^2] \\ne (E[X])^2\\) (למעט קבוע).
          </li>
          <li><strong>שונות (מדד פיזור וסיכון):</strong> \\(\\operatorname{Var}(X) = E[(X - E[X])^2]\\).
            הנוסחה המקוצרת לחישוב מהיר:
            \\[ \\operatorname{Var}(X) = E[X^2] - (E[X])^2 \\]
            תמיד אי־שלילית, ושווה 0 אך ורק לקבוע דטרמיניסטי.
          </li>
          <li><strong>טרנספורמציה של שונות:</strong> \\(\\operatorname{Var}(aX + b) = a^2 \\operatorname{Var}(X)\\), וסטיית התקן היא \\(\\operatorname{SD}(aX+b) = |a|\\operatorname{SD}(X)\\). ההזזה \\(b\\) נופלת, והמקדם \\(a\\) מועלה בריבוע.</li>
          <li><strong>כוח־העל של לינאריות בסכומים:</strong> \\(E[\\sum a_i X_i] = \\sum a_i E[X_i]\\) תקף <strong>תמיד, ללא שום תלות בין המשתנים</strong>! למשתנה אינדיקטור: \\(E[I_A] = P(A)\\). שונות של סכום מתפרקת לסכום שונויות רק בהינתן אי־תלות.</li>
        </ul>
      `,
    },
    {
      id: "dists",
      title: "שבע ההתפלגויות הבדידות שבדף הנוסחאות",
      html: `
        <table class="dist-table" style="width:100%; border-collapse:collapse; text-align:right;">
          <thead>
            <tr>
              <th style="border:1px solid var(--line); padding:0.35rem;">התפלגות וסימון</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">פונקציית הסתברות \\(P(X=k)\\)</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">תוחלת</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">שונות</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">סימן היכר במבחן</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;"><strong>אחיד בדיד</strong><br>\\(U\\{m+1,\\ldots,m+n\\}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(1/n\\)<br>\\(k=m+1,\\ldots,m+n\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(m+\\frac{n+1}{2}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\frac{n^2-1}{12}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">קובייה הוגנת; שליפה ללא החזרה מתוך \\(n\\) עד למציאת הפריט המיוחד היחיד</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;"><strong>ברנולי</strong><br>\\(\\operatorname{Bernoulli}(p)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(P(1)=p, P(0)=1-p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(p(1-p)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">ניסוי יחיד (הצלחה/כישלון); משתנה אינדיקטור \\(I_A\\) למאורע</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;"><strong>בינומית</strong><br>\\(B(n,p)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\binom{n}{k}p^k(1-p)^{n-k}\\)<br>\\(0\\le k\\le n\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(np\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(np(1-p)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">ספירת הצלחות בסדרה קבועה מראש של \\(n\\) ניסויים בלתי תלויים</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;"><strong>פואסון</strong><br>\\(\\operatorname{Po}(\\lambda)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(e^{-\\lambda}\\frac{\\lambda^k}{k!}\\)<br>\\(k\\ge 0\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\lambda\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\lambda\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">ספירת מאורעות נדירים ברצף זמן/שטח בקצב \\(\\lambda\\); תוחלת שווה לשונות!</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;"><strong>גיאומטרית</strong><br>\\(\\operatorname{Geo}(p)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\((1-p)^{k-1}p\\)<br>\\(k\\ge 1\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\frac{1}{p}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\frac{1-p}{p^2}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">ספירת ניסיונות עצמאיים עד וכולל ההצלחה הראשונה; זנב \\(P(X\\gt k)=(1-p)^k\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;"><strong>בינומית שלילית</strong><br>\\(\\operatorname{NB}(r,p)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\binom{k-1}{r-1}p^r(1-p)^{k-r}\\)<br>\\(k\\ge r\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\frac{r}{p}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\frac{r(1-p)}{p^2}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">ספירת ניסיונות עצמאיים עד וכולל ההצלחה ה־\\(r\\); סכום \\(r\\) גיאומטריים</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;"><strong>היפרגיאומטרית</strong><br>\\(H(N,m,n)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\frac{\\binom{m}{k}\\binom{N-m}{n-k}}{\\binom{N}{n}}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(n\\frac{m}{N}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(n\\frac{m}{N}\\left(1-\\frac{m}{N}\\right)\\frac{N-n}{N-1}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">דגימה <strong>ללא החזרה</strong> מתוך אוכלוסייה סופית בגודל \\(N\\)</td>
            </tr>
          </tbody>
        </table>

        <ul>
          <li><strong>שכיח בינומי:</strong> \\(\\lfloor (n+1)p \\rfloor\\). אם \\((n+1)p\\) שלם, שני ערכים עוקבים חולקים את שיא ההסתברות: \\((n+1)p - 1\\) ו־\\((n+1)p\\).</li>
          <li><strong>קירוב פואסון לבינומי:</strong> תקף כאשר \\(n\\) גדול ו־\\(p\\) קטן (\\(n \\ge 100, p \\le 0.05\\) או \\(np \\le 10\\)). מציבים \\(\\lambda = np\\). סכום פואסונים בלתי תלויים הוא פואסון עם סכום הקצבים.</li>
          <li><strong>חוסר זיכרון (זהות לשלמים):</strong> \\(P(X \\gt s+t \\mid X \\gt t) = P(X \\gt s)\\) בגיאומטרית – כישלונות העבר אינם משפיעים על סיכויי העתיד.</li>
          <li><strong>מקדם תיקון אוכלוסייה סופית:</strong> \\(\\frac{N-n}{N-1} \\lt 1\\) מצמצם את השונות ההיפרגיאומטרית ביחס לבינומית.</li>
        </ul>
      `,
    },
    {
      id: "pick",
      title: "מדריך חי לזיהוי מיידי של ההתפלגות במבחן",
      html: `
        <p>כדי לפענח שאלת מבחן תוך 10 שניות, ענו על ארבע שאלות האבחון לפי הסדר:</p>
        <ol>
          <li><strong>האם מדובר בספירת מאורעות ברצף זמן או שטח לפי קצב ממוצע?:</strong>
            אם כן \\(\\implies\\) <strong>פואסון \\(\\operatorname{Po}(\\lambda)\\)</strong>. (שימו לב: התאימו את \\(\\lambda\\) לאורך חלון הזמן המבוקש בשאלה!).
          </li>
          <li><strong>האם מספר הניסיונות \\(n\\) קבוע וסגור מראש?:</strong>
            <ul>
              <li>אם הניסויים <strong>בלתי תלויים</strong> (או דגימה עם החזרה) \\(\\implies\\) <strong>בינומית \\(B(n, p)\\)</strong>.</li>
              <li>אם הדגימה היא <strong>ללא החזרה מתוך אוכלוסייה סופית</strong> בגודל \\(N\\) \\(\\implies\\) <strong>היפרגיאומטרית \\(H(N, m, n)\\)</strong>.</li>
              <li>אם מדובר בניסוי בודד אחד (\\(n=1\\)) \\(\\implies\\) <strong>ברנולי \\(\\operatorname{Bernoulli}(p)\\)</strong>.</li>
            </ul>
          </li>
          <li><strong>האם ממשיכים לנסות שוב ושוב עד שמגיעים להצלחה?:</strong>
            <ul>
              <li>אם עוצרים בהצלחה <strong>הראשונה</strong> \\(\\implies\\) <strong>גיאומטרית \\(\\operatorname{Geo}(p)\\)</strong> (תוחלת \\(1/p\\), זנב \\((1-p)^k\\)).</li>
              <li>אם עוצרים בהצלחה מספר <strong>\\(r\\)</strong> \\(\\implies\\) <strong>בינומית שלילית \\(\\operatorname{NB}(r, p)\\)</strong> (תוחלת \\(r/p\\)).</li>
              <li>אם שולפים <strong>ללא החזרה</strong> מתוך \\(n\\) פריטים עד למציאת הפריט המיוחד היחיד \\(\\implies\\) <strong>אחיד בדיד על \\(\\{1, \\ldots, n\\}\\)</strong>.</li>
            </ul>
          </li>
          <li><strong>האם מחפשים תוחלת של סכום מורכב עם תלות?:</strong>
            אל תנסו למצוא את ההתפלגות המשותפת! פרקו את המשתנה לסכום אינדיקטורים \\(X = \\sum I_i\\) והשתמשו בלינאריות התוחלת \\(E[X] = \\sum P(A_i)\\).
          </li>
        </ol>
      `,
    },
  ],
});

window.SUMMARY_DETAIL = window.SUMMARY_DETAIL || {};
Object.assign(window.SUMMARY_DETAIL, {
  "p4-c1": "דוגמה מהירה: בהטלת שני מטבעות, X מספר העצים. ארבע תוצאות יסודיות מתכנסות לשלושה ערכים בלבד: P(X=1)=0.5 כי שתי תוצאות שונות (HT ו־TH) מפיקות את הערך 1.",
  "p4-c2": "כלל זהב: לפני חישוב תוחלת מוודאים שסכום ההסתברויות בתומך שווה 1.0 בדיוק ושאין שום ערך שלילי או גדול מ־1. חריגה מעידה מייד על טעות בבניית המודל.",
  "p4-c3": "זהירות בקצוות CDF: הנוסחה F(b)-F(a) פתוחה משמאל. למשתנה שלם, כדי לכלול את a חובה לחסר את המדרגה הקודמת F(a-1): P(a≤X≤b) = F(b)-F(a-1). חיסור F(a) משמיט את a!",
  "p4-c4": "קיצור דרך לתוחלת: למשתנה שלם אי־שלילי, סכום הזנבות P(X≥k) שווה לתוחלת. בגיאומטרי, סכימת הטור ההנדסי (1-p)^j נותנת מייד 1/p ללא שום גזירת טורים!",
  "p4-c5": "תמרור אזהרה: שונות היא תמיד חיובית או אפס. אם קיבלתם שונות שלילית (למשל במציאת Var(10-2Z)), החלפתם בטעות בין ממוצע הריבועים E[X²] לבין ריבוע הממוצע (E[X])².",
  "p4-c6": "שכיח בינומי: הערך הסביר ביותר הוא רצפת (n+1)p. אם (n+1)p יוצא מספר שלם בדיוק, יש שני שכיחים תאומים עוקבים: (n+1)p-1 ו־(n+1)p. השכיח אינו תמיד השלם הקרוב ביותר לתוחלת np.",
  "p4-c7": "מבחן פואסון: בפואסון התוחלת שווה תמיד לשונות: E[X]=Var(X)=λ. אם נתונים בשאלה מציגים שונות הרחוקה מהממוצע, פואסון אינו מודל מתאים.",
  "p4-c8": "זנב גיאומטרי: P(X>k)=(1-p)^k משום שנדרש שכל k הניסיונות הראשונים ייכשלו. בקורס 20425 X כולל את ניסיון ההצלחה ולכן התומך מתחיל מ־1 והתוחלת היא 1/p.",
  "p4-c9": "ההיגיון במקדם הבינומי השלילי: הניסיון ה־k חייב להיות הצלחה (הוא שסיים את התהליך). לכן r-1 ההצלחות הקודמות מתפזרות חופשי בין k-1 הניסיונות הראשונים: C(k-1, r-1).",
  "p4-c10": "תיקון אוכלוסייה סופית: הגורם (N-n)/(N-1) קטן מ־1 ומקטין את השונות בהיפרגיאומטרית ביחס לבינומית. כש־n=1 המקדם שווה 1; כש־n=N אין שונות כלל (0) כי כל האוכלוסייה נדגמה.",
  "p4-c11": "האינדיקטורים של פריטים במדגם ללא החזרה תלויים זה בזה, אך תוחלת הסכום שווה לסכום התוחלות תמיד! זהו מפתח הקסם להוכחת תוחלת היפרגיאומטרית ובעיית חלוקת הכובעים.",
  "p4-c12": "עץ החלטות ב־2 שאלות: האם מספר הניסיונות קבוע מראש (בינומית/היפרגיאומטרית) או שעוצרים בהצלחה (גיאומטרית/בינומית שלילית)? האם הדגימה היא עם החזרה או בלי החזרה?"
});
