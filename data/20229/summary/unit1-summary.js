// edit-pass: 1 | unit: 1 | date: 2026-11-04
window.SUMMARY_PROSE = window.SUMMARY_PROSE || [];
window.SUMMARY_DETAIL = window.SUMMARY_DETAIL || {};

window.SUMMARY_PROSE.push({
  unit: "1",
  title: "יחידה 1 · מרחבי מכפלה פנימית",
  intro: "הכללת המושגים הגיאומטריים של אורך וזווית למרחבים וקטוריים כלליים: אקסיומות מכפלה פנימית, נורמה ומרחק, אי־שוויון קושי־שוורץ, בסיסים אורתונורמליים, פירוק לסכום ישר עם המשלים האורתוגונלי ואלגוריתם גרם־שמידט.",
  parts: [
    {
      id: "a",
      title: "מכפלה פנימית ומרחבים",
      html: `
        <p>מכפלה פנימית היא פונקציה המצמידה לכל זוג וקטורים סקלר, ומאפשרת להגדיר אורך, זווית וניצבות. מעל \\(\\mathbb{R}\\) המרחב נקרא מרחב אוקלידי (Euclidean Space), ומעל \\(\\mathbb{C}\\) נקרא מרחב אוניטרי (Unitary Space).</p>
        <dl class="term-list">
          <dt>מרחב מכפלה פנימית (Inner Product Space - מ\"פ)</dt>
          <dd>מרחב וקטורי \\(V\\) מעל \\(\\mathbb{F}\\) (כאשר \\(\\mathbb{F} = \\mathbb{R}\\) או \\(\\mathbb{F} = \\mathbb{C}\\)) יחד עם פעולה \\(\\langle \\cdot, \\cdot \\rangle: V \\times V \\to \\mathbb{F}\\) המקיימת לכל \\(u, v, w \\in V\\) ו־\\(\\alpha \\in \\mathbb{F}\\):
            <ol>
              <li><strong>לינאריות ברכיב הראשון:</strong> \\(\\langle u + w, v \\rangle = \\langle u, v \\rangle + \\langle w, v \\rangle\\), וכן \\(\\langle \\alpha u, v \\rangle = \\alpha \\langle u, v \\rangle\\).</li>
              <li><strong>הרמיטיות / סימטריה מצומדת:</strong> \\(\\langle u, v \\rangle = \\overline{\\langle v, u \\rangle}\\). מעל \\(\\mathbb{R}\\) זוהי סימטריה רגילה: \\(\\langle u, v \\rangle = \\langle v, u \\rangle\\).</li>
              <li><strong>חיוביות ואי־שליליות:</strong> \\(\\langle v, v \\rangle \\ge 0\\) לכל \\(v\\), ומתקיים \\(\\langle v, v \\rangle = 0 \\iff v = 0\\).</li>
            </ol>
          </dd>
          <dt>תכונות נגזרות של מכפלה פנימית</dt>
          <dd>
            <ul>
              <li><strong>התנהגות ברכיב השני מעל \\(\\mathbb{C}\\):</strong> \\(\\langle u, v + w \\rangle = \\langle u, v \\rangle + \\langle u, w \\rangle\\), אך סקלר יוצא עם צמוד:
                \\[ \\langle u, \\alpha v \\rangle = \\overline{\\alpha} \\langle u, v \\rangle \\]
              </li>
              <li><strong>התאפסות עם וקטור האפס:</strong> \\(\\langle 0, v \\rangle = \\langle v, 0 \\rangle = 0\\) לכל \\(v \\in V\\).</li>
              <li>אם \\(\\langle u, v \\rangle = 0\\) לכל \\(v \\in V\\), אז בהכרח \\(u = 0\\) (תכונת אי־ניוון).</li>
            </ul>
          </dd>
          <dt>מכפלות פנימיות סטנדרטיות (Standard Inner Products)</dt>
          <dd>
            <ul>
              <li>ב־\\(\\mathbb{R}^n\\): \\(\\langle u, v \\rangle = v^t u = \\sum_{i=1}^n u_i v_i\\).</li>
              <li>ב־\\(\\mathbb{C}^n\\): \\(\\langle u, v \\rangle = v^* u = \\sum_{i=1}^n u_i \\overline{v_i}\\).</li>
              <li>במרחב המטריצות \\(M_{m \\times n}(\\mathbb{F})\\) (מכפלת פרובניוס): \\(\\langle A, B \\rangle = \\text{tr}(B^* A) = \\sum_{i,j} A_{ij} \\overline{B_{ij}}\\).</li>
              <li>במרחב הפונקציות הרציפות \\(C[a, b]\\): \\(\\langle f, g \\rangle = \\int_a^b f(x) \\overline{g(x)} \\, dx\\).</li>
            </ul>
          </dd>
        </dl>
      `,
    },
    {
      id: "b",
      title: "נורמה, מרחק וקושי־שוורץ",
      html: `
        <p>המכפלה הפנימית משרה באופן טבעי גודל גיאומטרי לכל וקטור (נורמה) ומרחק בין כל שני וקטורים.</p>
        <dl class="term-list">
          <dt>נורמה מושרית (Induced Norm)</dt>
          <dd>הנורמה של וקטור \\(v\\) מוגדרת כ־\\(\\|v\\| = \\sqrt{\\langle v, v \\rangle}\\). תכונות הנורמה:
            <ul>
              <li>\\(\\|v\\| \\ge 0\\), ו־\\(\\|v\\| = 0 \\iff v = 0\\).</li>
              <li>\\(\\|\\alpha v\\| = |\\alpha| \\cdot \\|v\\|\\) לכל סקלר \\(\\alpha\\). וקטור עם \\(\\|v\\| = 1\\) נקרא <strong>וקטור יחידה</strong> או מנורמל. נרמול וקטור נעשה ע\"י \\(\\hat{v} = \\frac{v}{\\|v\\|}\\).</li>
              <li>אי־שוויון המשולש: \\(\\|u + v\\| \\le \\|u\\| + \\|v\\|\\).</li>
            </ul>
          </dd>
          <dt>מרחק מושרה (Induced Distance)</dt>
          <dd>המרחק בין שני וקטורים \\(u, v\\) הוא \\(d(u, v) = \\|u - v\\|\\). מקיים את אקסיומות המטריקה: אי־שליליות, סימטריה ואי־שוויון המשולש \\(d(u, w) \\le d(u, v) + d(v, w)\\).</dd>
          <dt>אי־שוויון קושי־שוורץ (Cauchy-Schwarz Inequality)</dt>
          <dd>לכל שני וקטורים \\(u, v \\in V\\) במרחב מכפלה פנימית מתקיים:
            \\[ |\\langle u, v \\rangle| \\le \\|u\\| \\cdot \\|v\\| \\]
            שוויון מתקיים אם ורק אם \\(u\\) ו־\\(v\\) תלויים לינארית (אחד מהם הוא כפולה סקלרית של האחר).<br>
            <strong>חשיבות לבחינה:</strong> קושי־שוורץ הוא הבסיס להוכחת אי־שוויון המשולש ולהגדרת זווית בין וקטורים במרחב ממשי: \\(\\cos \\theta = \\frac{\\langle u, v \\rangle}{\\|u\\| \\|v\\|}\\).
          </dd>
          <dt>כלל המקבילית וזהות הקיטוב (Parallelogram Law and Polarization)</dt>
          <dd>
            <ul>
              <li><strong>כלל המקבילית:</strong> \\(\\|u + v\\|^2 + \\|u - v\\|^2 = 2\\|u\\|^2 + 2\\|v\\|^2\\). סכום ריבועי האלכסונים שווה לסכום ריבועי ארבע הצלעות. משפט יסודי קובע: נורמה מוגדרת ע\"י מכפלה פנימית אם ורק אם היא מקיימת את כלל המקבילית!</li>
              <li><strong>זהות הקיטוב (Polarization Identity):</strong> מאפשרת לשחזר את המכפלה הפנימית מתוך הנורמה:
                <p>מעל \\(\\mathbb{R}\\):</p>
                \\[ \\langle u, v \\rangle = \\frac{1}{4} \\left( \\|u + v\\|^2 - \\|u - v\\|^2 \\right) \\]
                <p>מעל \\(\\mathbb{C}\\):</p>
                \\[ \\langle u, v \\rangle = \\frac{1}{4} \\left( \\|u + v\\|^2 - \\|u - v\\|^2 + i \\|u + iv\\|^2 - i \\|u - iv\\|^2 \\right) \\]
              </li>
            </ul>
          </dd>
        </dl>
      `,
    },
    {
      id: "c",
      title: "אורתוגונליות ובסיס אורתונורמלי",
      html: `
        <p>אורתוגונליות (ניצבות) היא המושג המרכזי בלינארית 2. עבודה בבסיס אורתונורמלי מפשטת כל חישוב אלגברי והופכת מציאת קואורדינטות להצבה פשוטה.</p>
        <dl class="term-list">
          <dt>וקטורים אורתוגונליים (Orthogonal Vectors)</dt>
          <dd>שני וקטורים \\(u, v\\) נקראים <strong>אורתוגונליים</strong> (מאונכים), ומסומן \\(u \\perp v\\), אם \\(\\langle u, v \\rangle = 0\\). וקטור האפס אורתוגונלי לכל וקטור במרחב, והוא הוקטור היחיד שאורתוגונלי לעצמו.</dd>
          <dt>משפט פיתגורס (Pythagorean Theorem)</dt>
          <dd>אם \\(u \\perp v\\), אזי:
            \\[ \\|u + v\\|^2 = \\|u\\|^2 + \\|v\\|^2 \\]
            בהרחבה: לכל קבוצה אורתוגונלית של וקטורים \\(\\{v_1, \\dots, v_k\\}\\) מתקיים \\(\\left\\| \\sum_{i=1}^k v_i \\right\\|^2 = \\sum_{i=1}^k \\|v_i\\|^2\\).
          </dd>
          <dt>משפט אי־התלות של קבוצה אורתוגונלית</dt>
          <dd>כל קבוצה של וקטורים אורתוגונליים שכולם שונים מאפס היא <strong>בלתי תלויה לינארית (בת\"ל)</strong>.</dd>
          <dt>בסיס אורתונורמלי (Orthonormal Basis - בא\"נ)</dt>
          <dd>בסיס \\(B = (e_1, \\dots, e_n)\\) של \\(V\\) נקרא בא\"נ אם כל איבריו מנורמלים והם אורתוגונליים זה לזה בזוגות:
            \\[ \\langle e_i, e_j \\rangle = \\delta_{ij} = \\begin{cases} 1 & i = j \\\\ 0 & i \\ne j \\end{cases} \\]
          </dd>
          <dt>מקדמי פורייה וזהות פרסבל (Fourier Coefficients and Parseval's Identity)</dt>
          <dd>אם \\(B = (e_1, \\dots, e_n)\\) הוא בסיס אורתונורמלי של \\(V\\):
            <ul>
              <li><strong>נוסחת הפירוק לפי פורייה:</strong> לכל וקטור \\(v \\in V\\) הקואורדינטה ה־\\(i\\) ניתנת ישירות ע\"י מכפלה פנימית, ללא צורך בדירוג מערכת משוואות:
                \\[ v = \\sum_{i=1}^n \\langle v, e_i \\rangle e_i, \\quad [v]_B = \\begin{pmatrix} \\langle v, e_1 \\rangle \\\\ \\vdots \\\\ \\langle v, e_n \\rangle \\end{pmatrix} \\]
              </li>
              <li><strong>זהות פרסבל:</strong> \\(\\|v\\|^2 = \\sum_{i=1}^n |\\langle v, e_i \\rangle|^2\\), ובאופן כללי:
                \\[ \\langle u, v \\rangle = \\sum_{i=1}^n \\langle u, e_i \\rangle \\overline{\\langle v, e_i \\rangle} = [v]_B^* [u]_B \\]
                בבסיס אורתונורמלי, המכפלה הפנימית של כל שני וקטורים שווה בדיוק למכפלה הפנימית הסטנדרטית של וקטורי הקואורדינטות שלהם!
              </li>
            </ul>
          </dd>
        </dl>
      `,
    },
    {
      id: "d",
      title: "היטל אורתוגונלי וגרם־שמידט",
      html: `
        <p>כיצד מוצאים את הוקטור הקרוב ביותר לתת־מרחב נתון? וכיצד הופכים בסיס שרירותי לבסיס אורתונורמלי? הכלים של היטל אורתוגונלי ותהליך גרם־שמידט מספקים את התשובה.</p>
        <dl class="term-list">
          <dt>המשלים האורתוגונלי (Orthogonal Complement)</dt>
          <dd>עבור תת־קבוצה \\(S \\subseteq V\\), המשלים האורתוגונלי מוגדר כאוסף כל הוקטורים המאונכים לכל איברי \\(S\\):
            \\[ S^\\perp = \\{v \\in V \\mid \\forall s \\in S, \\langle v, s \\rangle = 0\\} \\]
            \\(S^\\perp\\) הוא תמיד תת־מרחב של \\(V\\) (גם אם \\(S\\) סתם קבוצה). אם \\(W = \\text{span}(S)\\), אזי \\(S^\\perp = W^\\perp\\).</dd>
          <dt>משפט הפירוק האורתוגונלי לסכום ישר (Orthogonal Decomposition Theorem)</dt>
          <dd>יהי \\(W\\) תת־מרחב מממד סופי של מרחב מכפלה פנימית \\(V\\). אזי:
            \\[ V = W \\oplus W^\\perp \\]
            כל וקטור \\(v \\in V\\) ניתן לפירוק יחיד: \\(v = w + w^\\perp\\) כאשר \\(w \\in W\\) ו־\\(w^\\perp \\in W^\\perp\\). נובע מכך:
            \\[ \\dim W + \\dim W^\\perp = \\dim V, \\quad (W^\\perp)^\\perp = W \\]
          </dd>
          <dt>היטל אורתוגונלי וקירוב מיטבי (Orthogonal Projection and Best Approximation)</dt>
          <dd>ההעתקה \\(P_W: V \\to W\\) השולחת כל \\(v\\) לרכיב שלו \\(w \\in W\\) בפירוק הסכום הישר נקראת <strong>ההיטל האורתוגונלי</strong> על \\(W\\).<br>
          אם \\((e_1, \\dots, e_k)\\) הוא בסיס אורתונורמלי ל־\\(W\\), נוסחת ההיטל המפורשת היא:
            \\[ P_W(v) = \\sum_{i=1}^k \\langle v, e_i \\rangle e_i \\]
          <strong>משפט הקירוב המיטבי:</strong> \\(P_W(v)\\) הוא הנקודה הקרובה ביותר ל־\\(v\\) מבין כל נקודות \\(W\\):
            \\[ \\|v - P_W(v)\\| = \\min_{w \\in W} \\|v - w\\| \\]
          </dd>
          <dt>תהליך גרם־שמידט (Gram-Schmidt Orthonormalization Process)</dt>
          <dd>אלגוריתם המקבל בסיס כללי \\((u_1, u_2, \\dots, u_n)\\) ומייצר ממנו בסיס אורתונורמלי \\((e_1, e_2, \\dots, e_n)\\) כך ש־\\(\\text{span}(e_1, \\dots, e_k) = \\text{span}(u_1, \\dots, u_k)\\) לכל \\(k\\):
            <ol>
              <li>שלב 1: \\(v_1 = u_1\\), ולאחר נרמול: \\(e_1 = \\frac{v_1}{\\|v_1\\|}\\).</li>
              <li>שלב 2: מחסירים את ההיטל על \\(e_1\\):
                \\[ v_2 = u_2 - \\langle u_2, e_1 \\rangle e_1, \\quad e_2 = \\frac{v_2}{\\|v_2\\|} \\]
              </li>
              <li>שלב \\(k\\) כללי: מחסירים מ־\\(u_k\\) את ההיטלים על כל הוקטורים המנורמלים הקודמים:
                \\[ v_k = u_k - \\sum_{j=1}^{k-1} \\langle u_k, e_j \\rangle e_j, \\quad e_k = \\frac{v_k}{\\|v_k\\|} \\]
              </li>
            </ol>
          </dd>
        </dl>
        <div class="note-box exam-tip">
          <strong>טיפ חישוב לגרם־שמידט:</strong>
          כדי להימנע משברים מסורבלים ושורשים בכל שלב, ניתן קודם לייצר בסיס אורתוגונלי בלבד \\((v_1, \\dots, v_n)\\) בעזרת הנוסחה:
          \\[ v_k = u_k - \\sum_{j=1}^{k-1} \\frac{\\langle u_k, v_j \\rangle}{\\|v_j\\|^2} v_j \\]
          ורק בסוף התהליך לנרמל את כל \\(v_i\\) על ידי חלוקה ב־\\(\\|v_i\\|\\)!
        </div>
      `,
    },
  ],
});
