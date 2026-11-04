// edit-pass: 1 | unit: 4 | date: 2026-11-04
window.SUMMARY_PROSE = window.SUMMARY_PROSE || [];
window.SUMMARY_DETAIL = window.SUMMARY_DETAIL || {};

window.SUMMARY_PROSE.push({
  unit: "4",
  title: "יחידה 4 · תבניות בילינאריות ותבניות ריבועיות",
  intro: "פתיחת חלק התבניות של הקורס: תבניות בילינאריות סימטריות ואנטי־סימטריות, מטריצה מייצגת תבנית, תבניות ריבועיות וזהות הקיטוב, מעבר בסיס וחפיפת מטריצות, וההבחנה המכרעת בין חפיפה לדמיון.",
  parts: [
    {
      id: "a",
      title: "תבניות בילינאריות ומטריצה מייצגת",
      html: `
        <p>תבנית בילינארית היא פונקציה של שני משתנים וקטוריים המחזירה סקלר, והיא לינארית בכל משתנה בנפרד. היא מהווה הכללה אלגברית של מכפלה פנימית (ללא דרישת חיוביות וללא הצמדה מרוכבת).</p>
        <dl class="term-list">
          <dt>תבנית בילינארית (Bilinear Form)</dt>
          <dd>פונקציה \\(B: V \\times V \\to \\mathbb{F}\\) המקיימת לכל \\(u, u_1, u_2, v, v_1, v_2 \\in V\\) ו־\\(\\alpha \\in \\mathbb{F}\\):
            <ul>
              <li><strong>לינאריות ברכיב הראשון:</strong> \\(B(u_1 + u_2, v) = B(u_1, v) + B(u_2, v)\\) וכן \\(B(\\alpha u, v) = \\alpha B(u, v)\\).</li>
              <li><strong>לינאריות ברכיב השני:</strong> \\(B(u, v_1 + v_2) = B(u, v_1) + B(u, v_2)\\) וכן \\(B(u, \\alpha v) = \\alpha B(u, v)\\).</li>
            </ul>
          </dd>
          <dt>תבניות סימטריות ואנטי־סימטריות (Symmetric and Skew-Symmetric Forms)</dt>
          <dd>
            <ul>
              <li>\\(B\\) נקראת <strong>סימטרית</strong> אם לכל \\(u, v \\in V\\): \\(B(u, v) = B(v, u)\\).</li>
              <li>\\(B\\) נקראת <strong>אנטי־סימטרית (מתחלפת)</strong> אם לכל \\(u, v \\in V\\): \\(B(u, v) = -B(v, u)\\). כאשר \\(\\text{char}(\\mathbb{F}) \\ne 2\\), זה שקול לתנאי \\(B(v, v) = 0\\) לכל \\(v\\).</li>
              <li><strong>פירוק קנוני:</strong> במאפיין שונה מ־2, כל תבנית בילינארית מתפרקת ביחידות לסכום של תבנית סימטרית ואנטי־סימטרית:
                \\[ B(u, v) = \\underbrace{\\frac{B(u, v) + B(v, u)}{2}}_{B_{\\text{sym}}} + \\underbrace{\\frac{B(u, v) - B(v, u)}{2}}_{B_{\\text{skew}}} \\]
              </li>
            </ul>
          </dd>
          <dt>מטריצה מייצגת תבנית בילינארית (Matrix Representation)</dt>
          <dd>בהינתן בסיס סדור \\(E = (e_1, \\dots, e_n)\\) של \\(V\\), המטריצה המייצגת \\([B]_E\\) מוגדרת ע\"י ערכי התבנית על איברי הבסיס:
            \\[ ([B]_E)_{ij} = B(e_i, e_j) \\]
            לכל שני וקטורים \\(u, v \\in V\\), ערך התבנית מחושב ע\"י כפל מטריצות:
            \\[ B(u, v) = [u]_E^t [B]_E [v]_E \\]
            <strong>משפט:</strong> \\(B\\) סימטרית \\(\\iff\\) המטריצה \\([B]_E\\) סימטרית (\\(A^t = A\\)). \\(B\\) אנטי־סימטרית \\(\\iff\\) \\([B]_E\\) אנטי־סימטרית (\\(A^t = -A\\)).
          </dd>
        </dl>
      `,
    },
    {
      id: "b",
      title: "תבניות ריבועיות וקוטביות",
      html: `
        <p>תבנית ריבועית מתקבלת מהצבת אותו וקטור בשני הרכיבים של תבנית בילינארית. היא מתארת פולינום הומוגני מדרגה שנייה (כגון משוואות אליפסה, היפרבולה, או אנרגיה קינטית בפיזיקה).</p>
        <dl class="term-list">
          <dt>תבנית ריבועית (Quadratic Form)</dt>
          <dd>פונקציה \\(q: V \\to \\mathbb{F}\\) נקראת תבנית ריבועית אם קיימת תבנית בילינארית \\(B\\) כך ש־\\(q(v) = B(v, v)\\) לכל \\(v \\in V\\).<br>
          בבסיס \\(E\\), אם \\([B]_E = A\\) היא מטריצה סימטרית ו־\\(x = [v]_E\\), התבנית היא פולינום ריבועי הומוגני:
            \\[ q(x) = x^t A x = \\sum_{i=1}^n A_{ii} x_i^2 + 2 \\sum_{1 \\le i \\lt j \\le n} A_{ij} x_i x_j \\]
          </dd>
          <dt>בניית המטריצה הסימטרית מתוך פולינום ריבועי</dt>
          <dd>
            <ul>
              <li>באלכסון הראשי \\(A_{ii}\\): מציבים בדיוק את המקדם של האיבר הריבועי \\(x_i^2\\).</li>
              <li>מחוץ לאלכסון \\(A_{ij}\\) (עבור \\(i \\ne j\\)): מציבים בדיוק <strong>חצי</strong> מהמקדם של האיבר המעורב \\(x_i x_j\\) (כדי לשמור על סימטריות \\(A_{ij} = A_{ji}\\)).</li>
            </ul>
          </dd>
          <dt>זהות הקיטוב (Polarization Identity)</dt>
          <dd>מעל שדה שבו \\(1 + 1 \\ne 0\\) (\\(\\text{char}(\\mathbb{F}) \\ne 2\\)), לכל תבנית ריבועית \\(q\\) קיימת תבנית בילינארית <em>סימטרית יחידה</em> \\(B\\) המקיימת \\(q(v) = B(v, v)\\), והיא משוחזרת מתוך \\(q\\) ע\"י זהות הקיטוב:
            \\[ B(u, v) = \\frac{1}{2} \\left( q(u + v) - q(u) - q(v) \\right) = \\frac{1}{4} \\left( q(u + v) - q(u - v) \\right) \\]
            משפט זה מבסס התאמה חח\"ע ועל מושלמת בין תבניות בילינאריות סימטריות לבין תבניות ריבועיות.
          </dd>
        </dl>
      `,
    },
    {
      id: "c",
      title: "מעבר בסיס וחפיפת מטריצות",
      html: `
        <p>כאשר מחליפים בסיס במרחב, המטריצה המייצגת של תבנית בילינארית משתנה לפי כלל שונה לחלוטין מזה של העתקה לינארית. הבנת ההבדל בין חפיפה לדמיון היא מאבני הראשה של המבחן.</p>
        <dl class="term-list">
          <dt>נוסחת שינוי בסיס לתבנית בילינארית</dt>
          <dd>יהיו \\(B, B'\\) שני בסיסים של \\(V\\), ותהי \\(P = [I]_{B'}^B\\) מטריצת המעבר (המקיימת \\([v]_B = P [v]_{B'}\\)). אזי:
            \\[ [B]_{B'} = P^t [B]_B P \\]
            שימו לב: משמאל מופיע השחלוף \\(P^t\\), ולא ההופכית \\(P^{-1}\\)!
          </dd>
          <dt>חפיפת מטריצות (Matrix Congruence)</dt>
          <dd>שתי מטריצות ריבועיות \\(A, B \\in M_n(\\mathbb{F})\\) נקראות <strong>חופפות</strong> (מסומן \\(A \\cong B\\)) אם קיימת מטריצה הפיכה \\(P\\) כך ש־:
            \\[ B = P^t A P \\]
            חפיפה היא יחס שקילות (רפלקסיבי, סימטרי וטרנזיטיבי).
          </dd>
        </dl>
        <div class="note-box exam-tip">
          <strong>טבלת השוואה קריטית לבחינה: חפיפה מול דמיון</strong>
          <table style="width:100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border);">
                <th style="text-align:right; padding:6px;">קריטריון</th>
                <th style="text-align:right; padding:6px;">חפיפה: \\(B = P^t A P\\)</th>
                <th style="text-align:right; padding:6px;">דמיון: \\(B = P^{-1} A P\\)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding:6px;"><strong>האובייקט הגיאומטרי</strong></td>
                <td style="padding:6px;">תבנית בילינארית / ריבועית \\(B(u, v)\\)</td>
                <td style="padding:6px;">העתקה לינארית \\(T: V \\to V\\)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding:6px;"><strong>דרגה (Rank)</strong></td>
                <td style="padding:6px;">נשמרת: \\(\\text{rank}(B) = \\text{rank}(A)\\)</td>
                <td style="padding:6px;">נשמרת: \\(\\text{rank}(B) = \\text{rank}(A)\\)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding:6px;"><strong>דטרמיננטה</strong></td>
                <td style="padding:6px;"><strong>לא נשמרת!</strong> \\(\\det(B) = (\\det P)^2 \\det(A)\\) (נשמר רק הסימן מעל \\(\\mathbb{R}\\))</td>
                <td style="padding:6px;">נשמרת במדויק: \\(\\det(B) = \\det(A)\\)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding:6px;"><strong>ערכים עצמיים</strong></td>
                <td style="padding:6px;"><strong>אינם נשמרים!</strong> ע\"ע של מטריצות חופפות עשויים להיות שונים לחלוטין</td>
                <td style="padding:6px;">נשמרים במדויק (עם אותם ריבויים)</td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding:6px;"><strong>עקבה (Trace)</strong></td>
                <td style="padding:6px;"><strong>אינה נשמרת!</strong></td>
                <td style="padding:6px;">נשמרת במדויק: \\(\\text{tr}(B) = \\text{tr}(A)\\)</td>
              </tr>
              <tr>
                <td style="padding:6px;"><strong>סימטריות</strong></td>
                <td style="padding:6px;">נשמרת: אם \\(A\\) סימטרית אז \\(P^t A P\\) סימטרית</td>
                <td style="padding:6px;">לא בהכרח נשמרת (אלא אם \\(P\\) אורתוגונלית)</td>
              </tr>
            </tbody>
          </table>
          <p style="margin-top:8px;"><strong>מתי חפיפה שווה לדמיון?</strong> כאשר \\(P\\) היא מטריצה אורתוגונלית (\\(P^{-1} = P^t\\))! במקרה זה \\(P^t A P = P^{-1} A P\\), והחפיפה והדמיון מתלכדים.</p>
        </div>
      `,
    },
  ],
});
