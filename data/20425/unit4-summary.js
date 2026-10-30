window.SUMMARY_PROSE = window.SUMMARY_PROSE || [];
window.SUMMARY_PROSE.push({
  unit: "4",
  title: "יחידה 4 · משתנים מקריים בדידים",
  intro: "משתנה מקרי כפונקציה על מרחב המדגם, פונקציית ההסתברות וההתפלגות המצטברת, תוחלת ושונות, וההתפלגויות הבדידות שבדף הנוסחאות: אחיד בדיד, בינומית, גיאומטרית, פואסון, בינומית שלילית והיפרגיאומטרית.",
  parts: [
    {
      id: "rv",
      title: "משתנה מקרי, פונקציית הסתברות והתפלגות מצטברת",
      html: `
        <ul>
          <li><strong>משתנה מקרי:</strong> פונקציה \\(X\\) ממרחב המדגם אל הממשיים. \\(\\{X=x\\}=\\{\\omega:X(\\omega)=x\\}\\).</li>
          <li><strong>בדיד:</strong> הטווח בן מנייה. \\(p(x)=P(X=x)\\ge 0\\) ו־\\(\\sum p(x)=1\\).</li>
          <li><strong>CDF:</strong> \\(F(x)=P(X\\le x)\\). מונוטונית לא יורדת, שואפת ל־0 ול־1, רציפה מימין.</li>
          <li>\\(P(a\\lt X\\le b)=F(b)-F(a)\\). הקפיצה \\(P(X=a)=F(a)-F(a-)\\).</li>
          <li><strong>שלם־ערכי:</strong> \\(P(a\\le X\\le b)=F(b)-F(a-1)\\). \\(F(b)-F(a)\\) משמיט את המסה ב־\\(a\\).</li>
        </ul>
      `,
    },
    {
      id: "moments",
      title: "תוחלת, LOTUS ושונות",
      html: `
        <ul>
          <li>\\(E[X]=\\sum x\\,p(x)\\), אם \\(\\sum |x|p(x)\\) מתכנס.</li>
          <li>לערכים \\(0,1,2,\\ldots\\): \\(E[X]=\\sum_{k\\ge 1}P(X\\ge k)=\\sum_{k\\ge 0}P(X\\gt k)\\).</li>
          <li><strong>LOTUS:</strong> \\(E[g(X)]=\\sum g(x)p(x)\\). \\(E[aX+b]=aE[X]+b\\). \\(E[X^2]\\neq (E[X])^2\\) אלא אם \\(X\\) קבוע.</li>
          <li>\\(\\operatorname{Var}(X)=E[(X-E[X])^2]=E[X^2]-(E[X])^2\\).</li>
          <li>\\(\\operatorname{Var}(aX+b)=a^2\\operatorname{Var}(X)\\), \\(\\operatorname{SD}(aX+b)=|a|\\operatorname{SD}(X)\\).</li>
          <li><strong>סכום:</strong> \\(E[\\sum X_i]=\\sum E[X_i]\\) בלי אי־תלות. \\(E[I_A]=P(A)\\).</li>
        </ul>
      `,
    },
    {
      id: "dists",
      title: "שש ההתפלגויות",
      html: `
        <table class="dist-table" style="width:100%; border-collapse:collapse; text-align:right;">
          <thead>
            <tr>
              <th style="border:1px solid var(--line); padding:0.35rem;">התפלגות</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">פונקציית הסתברות</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">תוחלת</th>
              <th style="border:1px solid var(--line); padding:0.35rem;">שונות</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">ברנולי \\(p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(P(X=1)=p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(p(1-p)\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">בינומית \\(n,p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\binom{n}{k}p^{k}(1-p)^{n-k}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(np\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(np(1-p)\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">פואסון \\(\\lambda\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(e^{-\\lambda}\\lambda^{k}/k!\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\lambda\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\lambda\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">גיאומטרית \\(p\\) (ניסויים)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\((1-p)^{k-1}p\\), \\(k\\ge 1\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(1/p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\((1-p)/p^{2}\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">בינומית שלילית \\(r,p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\binom{k-1}{r-1}p^{r}(1-p)^{k-r}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(r/p\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(r(1-p)/p^{2}\\)</td>
            </tr>
            <tr>
              <td style="border:1px solid var(--line); padding:0.35rem;">היפרגיאומטרית \\(H(N,m,n)\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(\\binom{m}{i}\\binom{N-m}{n-i}/\\binom{N}{n}\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(nm/N\\)</td>
              <td style="border:1px solid var(--line); padding:0.35rem;">\\(n\\frac{m}{N}(1-\\frac{m}{N})\\frac{N-n}{N-1}\\)</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li><strong>שכיח בינומי:</strong> \\(\\lfloor(n+1)p\\rfloor\\). אם \\((n+1)p\\) שלם, שני ערכים עוקבים.</li>
          <li><strong>פואסון:</strong> גבול של \\(B(n,p)\\) כש־\\(np\\to\\lambda\\). פרדיגמה: סכום ניסויים נדירים בלתי תלויים, גם עם \\(p_i\\) שונים. סכום פואסונים בלתי תלויים הוא פואסון.</li>
          <li><strong>גיאומטרי:</strong> \\(P(X\\gt i)=(1-p)^i\\). הזהות \\(P(X\\gt s+t\\mid X\\gt t)=P(X\\gt s)\\) רק לשלמים, ובקורס אינה נקראת חוסר־זיכרון.</li>
          <li><strong>היפרגיאומטרית \\(H(N,m,n)\\):</strong> בלי החזרה. \\(E=nm/N\\). השונות כוללת \\((N-n)/(N-1)\\).</li>
          <li><strong>אחיד בדיד:</strong> \\(n\\) ערכים מ־\\(m+1\\) עד \\(m+n\\), הסתברות \\(1/n\\), תוחלת \\(m+(n+1)/2\\), שונות \\((n^2-1)/12\\).</li>
          <li><strong>קירוב פואסון:</strong> \\(n\\) גדול ו־\\(p\\) קטן. בקורס: \\(np\\gt 10\\) ו־\\(p\\lt 0.1\\).</li>
        </ul>
      `,
    },
    {
      id: "pick",
      title: "איך בוחרים",
      html: `
        <ul>
          <li>ניסוי אחד, 0 או 1: ברנולי.</li>
          <li>\\(n\\) קבוע, ניסויים בלתי תלויים, אותו \\(p\\): בינומית.</li>
          <li>עוצרים בהצלחה הראשונה וסופרים ניסויים: גיאומטרית, תוחלת \\(1/p\\).</li>
          <li>עוצרים בהצלחה ה־\\(r\\): בינומית שלילית, תוחלת \\(r/p\\).</li>
          <li>מדגם בלי החזרה: היפרגיאומטרית.</li>
          <li>ספירה נדירה, או \\(n\\) גדול ו־\\(p\\) קטן: פואסון עם \\(\\lambda=np\\) או \\(\\lambda=\\sum p_i\\).</li>
          <li>מוסכמת כישלונות לפני ההצלחה מזיזה את התומך ב־1 ומחליפה תוחלת \\(1/p\\) ב־\\((1-p)/p\\). השונות זהה. בקורס סופרים ניסויים.</li>
        </ul>
      `,
    },
  ],
});

window.SUMMARY_DETAIL = window.SUMMARY_DETAIL || {};
Object.assign(window.SUMMARY_DETAIL, {
  "p4-c1": "דוגמה: שני מטבעות, X מספר העצים. ארבע תוצאות מתכווצות לשלושה ערכים, ו־P(X=1)=1/2 כי שתי תוצאות נותנות 1.",
  "p4-c2": "לפני שגוזרים תוחלת, בודקים שהסכום הוא 1. ערך גדול מ־1 פוסל את הרשימה מיד.",
  "p4-c3": "F(b)-F(a) פתוח משמאל וסגור מימין. בנקודת קפיצה F יושבת על המדרגה העליונה, כי ההגדרה כוללת את X≤a.",
  "p4-c4": "למשתנה שלם־ערכי אי־שלילי, סכום הזנבות P(X≥k) שווה לתוחלת. זו הדרך הקצרה לגיאומטרית: סכום הנדסי של (1-p)^k נותן 1/p.",
  "p4-c5": "Var(-2X+5)=4·Var(X). מי שמקבל שונות שלילית החליף בדרך כלל בין E[X^2] לבין (E[X])^2.",
  "p4-c6": "היחס P(X=k)/P(X=k-1) גדול מ־1 כל עוד k<(n+1)p. לכן ההסתברויות עולות עד השכיח ויורדות אחריו. השכיח אינו בהכרח הערך השלם הקרוב לתוחלת.",
  "p4-c7": "אם λ שלם, P(X=λ)=P(X=λ-1) ושניהם שכיחים. בלי אי־תלות, סכום של פואסונים אינו בהכרח פואסון, אף שהתוחלת כן מתחברת.",
  "p4-c8": "P(X>k)=(1-p)^k. אם השאלה סופרת כישלונות, מחסירים 1 מהמשתנה ומחליפים את התוחלת ל־(1-p)/p.",
  "p4-c9": "ההצלחה ה־r נופלת בניסוי k רק אם בניסוי k יש הצלחה, וב־k-1 הקודמים יש בדיוק r-1 הצלחות. לכן המקדם הוא C(k-1,r-1) ולא C(k,r).",
  "p4-c10": "תיקון האוכלוסייה הסופית (N-n)/(N-1) מקטין את השונות ביחס לבינומית. כש־n=N המדגם הוא כל האוכלוסייה והשונות אפס.",
  "p4-c11": "במדגם בלי החזרה, לכל עצם מיוחד הסתברות n/N להיבחר. כופלים ב־m ומקבלים nm/N, בלי לבנות את פונקציית ההסתברות.",
  "p4-c12": "שאלה אחת מפרידה: האם עוצרים אחרי מספר ניסיונות קבוע, או אחרי מספר הצלחות קבוע? שאלה שנייה: עם החזרה או בלי.",
});
