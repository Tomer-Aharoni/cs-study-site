// edit-pass: 1 | expansion: L3 | date: 2026-11-04
(window.UNIT3 = window.UNIT3 || { sections: [] }).sections.push({
  id: "l3-hw",
  title: "תרגילי בית",
  html: `
<p>פרק זה מרכז שאלות נבחרות ברמת בחינה סופית מתוך חומרי הלימוד והבחינות של האוניברסיטה הפתוחה בנושא <strong>לכסון אוניטרי והמשפט הספקטרלי</strong> (יחידה 3). התרגילים מדורגים מהבנת מושגי יסוד ועד לשאלות הוכחה וחישוב מורכבות, וכוללים את כל שלבי האלגברה ללא דילוגים. מומלץ בחום לפתור תחילה על דף באופן עצמאי, ורק לאחר מכן לפתוח את הפתרון המודרך.</p>

<details class="fold">
  <summary>תרגיל 1 · בדיקת נורמליות ולכסינות אוניטרית מעל C ומעל R</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>נתונות שתי מטריצות ריבועיות:
      \\[ A = \\begin{pmatrix} 1 & 2 \\\\ -2 & 1 \\end{pmatrix}, \\qquad B = \\begin{pmatrix} 1 & 2 \\\\ 0 & 3 \\end{pmatrix} \\]
    </p>
    <p>א. קבעו עבור כל אחת מהמטריצות האם היא נורמלית, האם היא לכסינה מעל \\(\\mathbb{C}\\), והאם היא לכסינה אוניטרית מעל \\(\\mathbb{C}\\).</p>
    <p>ב. קבעו עבור כל אחת מהמטריצות האם היא לכסינה אורתוגונלית מעל \\(\\mathbb{R}\\).</p>

    <p><strong>פתרון מפורט:</strong></p>
    <p><strong>סעיף א — ניתוח המטריצה A:</strong></p>
    <ol>
      <li>נחשב את המטריצה הצמודה (מאחר ש־\\(A\\) ממשית, הצמודה שווה לשחלוף \\(A^* = A^t\\)):
        \\[ A^* = A^t = \\begin{pmatrix} 1 & -2 \\\\ 2 & 1 \\end{pmatrix} \\]
      </li>
      <li>נבדוק נורמליות באמצעות חישוב שתי המכפלות:
        \\[ A A^* = \\begin{pmatrix} 1 & 2 \\\\ -2 & 1 \\end{pmatrix} \\begin{pmatrix} 1 & -2 \\\\ 2 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 \\cdot 1 + 2 \\cdot 2 & 1(-2) + 2(1) \\\\ -2(1) + 1(2) & (-2)(-2) + 1(1) \\end{pmatrix} = \\begin{pmatrix} 5 & 0 \\\\ 0 & 5 \\end{pmatrix} \\]
        \\[ A^* A = \\begin{pmatrix} 1 & -2 \\\\ 2 & 1 \\end{pmatrix} \\begin{pmatrix} 1 & 2 \\\\ -2 & 1 \\end{pmatrix} = \\begin{pmatrix} 1(1) + (-2)(-2) & 1(2) + (-2)(1) \\\\ 2(1) + 1(-2) & 2(2) + 1(1) \\end{pmatrix} = \\begin{pmatrix} 5 & 0 \\\\ 0 & 5 \\end{pmatrix} \\]
        קיבלנו \\(A A^* = A^* A = 5I\\). לפיכך, <strong>\\(A\\) היא מטריצה נורמלית</strong>!
      </li>
      <li>לפי משפט הלכסון האוניטרי (משפט 3.2.1), כל מטריצה נורמלית מעל \\(\\mathbb{C}\\) היא <strong>לכסינה אוניטרית מעל \\(\\mathbb{C}\\)</strong> (ובפרט לכסינה רגילה). נחשב לשם בדיקה את ערכיה העצמיים:
        \\[ \\det(\\lambda I - A) = \\det \\begin{pmatrix} \\lambda - 1 & -2 \\\\ 2 & \\lambda - 1 \\end{pmatrix} = (\\lambda - 1)^2 + 4 = 0 \\implies (\\lambda - 1)^2 = -4 \\implies \\lambda = 1 \\pm 2i \\]
        שני הערכים העצמיים שונים ומרוכבים: \\(\\lambda_1 = 1 + 2i\\), \\(\\lambda_2 = 1 - 2i\\).
      </li>
    </ol>

    <p><strong>ניתוח המטריצה B:</strong></p>
    <ol>
      <li>נחשב את הצמודה המשוחלפת:
        \\[ B^* = B^t = \\begin{pmatrix} 1 & 0 \\\\ 2 & 3 \\end{pmatrix} \\]
      </li>
      <li>נבדוק נורמליות:
        \\[ B B^* = \\begin{pmatrix} 1 & 2 \\\\ 0 & 3 \\end{pmatrix} \\begin{pmatrix} 1 & 0 \\\\ 2 & 3 \\end{pmatrix} = \\begin{pmatrix} 1(1) + 2(2) & 1(0) + 2(3) \\\\ 0(1) + 3(2) & 0(0) + 3(3) \\end{pmatrix} = \\begin{pmatrix} 5 & 6 \\\\ 6 & 9 \\end{pmatrix} \\]
        \\[ B^* B = \\begin{pmatrix} 1 & 0 \\\\ 2 & 3 \\end{pmatrix} \\begin{pmatrix} 1 & 2 \\\\ 0 & 3 \\end{pmatrix} = \\begin{pmatrix} 1(1) + 0(0) & 1(2) + 0(3) \\\\ 2(1) + 3(0) & 2(2) + 3(3) \\end{pmatrix} = \\begin{pmatrix} 1 & 2 \\\\ 2 & 13 \\end{pmatrix} \\]
        ברור ש־\\(B B^* \\neq B^* B\\), ולכן <strong>\\(B\\) אינה נורמלית</strong>!
      </li>
      <li>מכיוון ש־\\(B\\) אינה נורמלית, לפי משפט 3.2.1 היא <strong>אינה לכסינה אוניטרית</strong> מעל \\(\\mathbb{C}\\). עם זאת, ערכיה העצמיים הם \\(\\lambda_1 = 1, \\lambda_2 = 3\\) (איברי האלכסון של מטריצה משולשית), ומכיוון שהם שונים זה מזה, \\(B\\) היא <strong>לכסינה רגילה</strong> מעל \\(\\mathbb{C}\\) (וגם מעל \\(\\mathbb{R}\\)).</li>
    </ol>

    <p><strong>סעיף ב — לכסינות אורתוגונלית מעל R:</strong></p>
    <ul>
      <li>עבור \\(A\\): לפי משפט 3.2.1 מעל \\(\\mathbb{R}\\), מטריצה לכסינה אורתוגונלית אמ״מ היא סימטרית (\\(A^t = A\\)). כאן \\(A^t = \\begin{pmatrix} 1 & -2 \\\\ 2 & 1 \\end{pmatrix} \\neq A\\). יתרה מכך, ערכיה העצמיים \\(1 \\pm 2i\\) אינם ממשיים כלל! לכן \\(A\\) <strong>אינה לכסינה אורתוגונלית מעל \\(\\mathbb{R}\\)</strong>.</li>
      <li>עבור \\(B\\): \\(B^t = \\begin{pmatrix} 1 & 0 \\\\ 2 & 3 \\end{pmatrix} \\neq B\\), ולכן \\(B\\) אינה סימטרית, ומכאן שהיא <strong>אינה לכסינה אורתוגונלית מעל \\(\\mathbb{R}\\)</strong>.</li>
    </ul>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> בלבול בין "לכסינה רגילה" לבין "לכסינה אוניטרית". המטריצה \\(B\\) לכסינה לחלוטין (קיים \\(P\\) הפיך כך ש־\\(P^{-1} B P = D\\)), אך הווקטורים העצמיים שלה אינם ניצבים זה לזה, ולכן אין אפשרות לבחור \\(P\\) אוניטרית.
    </div>

    <p><strong>בדקו את עצמכם:</strong> האם המטריצה \\(M = \\begin{pmatrix} 0 & 3 \\\\ -3 & 0 \\end{pmatrix}\\) לכסינה אוניטרית מעל \\(\\mathbb{C}\\)? האם מעל \\(\\mathbb{R}\\)?<br />
    <em>תשובה:</em> \\(M^t = -M\\), כלומר היא אנטי-סימטרית. לכן היא נורמלית (\\(M M^t = 9I = M^t M\\)), ולכן לכסינה אוניטרית מעל \\(\\mathbb{C}\\). מעל \\(\\mathbb{R}\\) אינה סימטרית וערכיה העצמיים הם \\(\\pm 3i\\), ולכן אינה לכסינה מעל \\(\\mathbb{R}\\).</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 2 · לכסון אורתוגונלי של מטריצה סימטרית 3x3 עם מרחב עצמי מנוון וגרם-שמידט</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>נתונה המטריצה הממשית הסימטרית:
      \\[ A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 0 & 3 & 0 \\\\ 2 & 0 & 1 \\end{pmatrix} \\]
    </p>
    <p>א. מצאו את כל הערכים העצמיים של \\(A\\) ואת ריבוייהם האלגבריים והגיאומטריים.</p>
    <p>ב. מצאו מטריצה אורתוגונלית \\(Q\\) ומטריצה אלכסונית \\(D\\) כך ש־\\(Q^t A Q = D\\).</p>

    <p><strong>פתרון מפורט:</strong></p>
    <p><strong>סעיף א — ערכים עצמיים:</strong></p>
    <p>נפתח את הדטרמיננטה לפי השורה השנייה (המכילה שני אפסים):
      \\[ \\det(\\lambda I - A) = \\det \\begin{pmatrix} \\lambda - 1 & 0 & -2 \\\\ 0 & \\lambda - 3 & 0 \\\\ -2 & 0 & \\lambda - 1 \\end{pmatrix} = (\\lambda - 3) \\cdot \\det \\begin{pmatrix} \\lambda - 1 & -2 \\\\ -2 & \\lambda - 1 \\end{pmatrix} \\]
      \\[ = (\\lambda - 3) [(\\lambda - 1)^2 - 4] = (\\lambda - 3)(\\lambda^2 - 2\\lambda - 3) = (\\lambda - 3)(\\lambda - 3)(\\lambda + 1) = (\\lambda - 3)^2 (\\lambda + 1) \\]
      הערכים העצמיים הם:
      \\(\\lambda_1 = 3\\) בריבוי אלגברי 2, ו־\\(\\lambda_2 = -1\\) בריבוי אלגברי 1.
      מכיוון ש־\\(A\\) סימטרית, לפי המשפט הספקטרלי היא לכסינה, ולכן הריבוי הגיאומטרי שווה לריבוי האלגברי עבור כל ע״ע: \\(\\dim V_3 = 2\\) ו־\\(\\dim V_{-1} = 1\\).
    </p>

    <p><strong>סעיף ב — מציאת בא״נ של וקטורים עצמיים והרכבת Q:</strong></p>
    <p><strong>1. עבור \\(\\lambda_1 = 3\\):</strong> נפתור את המערכת ההומוגנית \\((A - 3I)v = 0\\):
      \\[ A - 3I = \\begin{pmatrix} -2 & 0 & 2 \\\\ 0 & 0 & 0 \\\\ 2 & 0 & -2 \\end{pmatrix} \\xrightarrow{R_3 \\leftarrow R_3 + R_1} \\begin{pmatrix} -2 & 0 & 2 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\xrightarrow{R_1 \\leftarrow -\\frac{1}{2} R_1} \\begin{pmatrix} 1 & 0 & -1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\]
      המשוואה היחידה היא \\(x_1 - x_3 = 0 \\implies x_1 = x_3\\). המשתנים \\(x_2\\) ו־\\(x_3\\) חופשיים!
      נבחר שני וקטורי בסיס:
      הצבה \\(x_2 = 1, x_3 = 0 \\implies w_1 = \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix}\\).
      הצבה \\(x_2 = 0, x_3 = 1 \\implies w_2 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix}\\).
      נבדוק אורתוגונליות: \\(\\langle w_1, w_2 \\rangle = 0 \\cdot 1 + 1 \\cdot 0 + 0 \\cdot 1 = 0\\).
      הווקטורים כבר אורתוגונליים במקרה זה (אין צורך בגרם-שמידט מלא)!
      נותר רק לנרמל:
      \\[ u_1 = \\frac{w_1}{\\|w_1\\|} = \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix}, \\qquad u_2 = \\frac{w_2}{\\|w_2\\|} = \\frac{1}{\\sqrt{1^2 + 0^2 + 1^2}} \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix} = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix} \\]
    </p>

    <p><strong>2. עבור \\(\\lambda_2 = -1\\):</strong> נפתור \\((A - (-1)I)v = (A + I)v = 0\\):
      \\[ A + I = \\begin{pmatrix} 2 & 0 & 2 \\\\ 0 & 4 & 0 \\\\ 2 & 0 & 2 \\end{pmatrix} \\to \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\]
      מכאן: \\(x_2 = 0\\) ו־\\(x_1 = -x_3\\).
      נבחר \\(x_3 = 1 \\implies w_3 = \\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\end{pmatrix}\\).
      ננרמל:
      \\[ u_3 = \\frac{w_3}{\\|w_3\\|} = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\end{pmatrix} \\]
    </p>

    <p><strong>3. הרכבת המטריצות Q ו־D:</strong>
      עמודות \\(Q\\) הן הווקטורים המנורמלים \\(u_1, u_2, u_3\\):
      \\[ Q = \\begin{pmatrix} 0 & 1/\\sqrt{2} & -1/\\sqrt{2} \\\\ 1 & 0 & 0 \\\\ 0 & 1/\\sqrt{2} & 1/\\sqrt{2} \\end{pmatrix} \\]
      והמטריצה האלכסונית המתאימה לסדר העמודות היא:
      \\[ D = \\begin{pmatrix} 3 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & -1 \\end{pmatrix} \\]
      בדיקה: \\(Q^t Q = I\\) ומתקיים \\(Q^t A Q = D\\).
    </p>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> לשכוח לנרמל את הווקטורים העצמיים! אם משאירים בעמודות את \\(w_2 = (1,0,1)^t\\) במקום לחלק ב־\\(\\sqrt{2}\\), המטריצה \\(Q\\) תהיה אמנם הפיכה ומלכסנת, אך <em>לא תהיה אורתוגונלית</em>, ויתקיים \\(Q^{-1} \\neq Q^t\\).
    </div>

    <p><strong>בדקו את עצמכם:</strong> ודאו ישירות כי \\(u_2\\) ו־\\(u_3\\) ניצבים זה לזה.<br />
    <em>תשובה:</em> \\(\\langle u_2, u_3 \\rangle = \\frac{1}{\\sqrt{2}} \\cdot \\left(-\\frac{1}{\\sqrt{2}}\\right) + 0 \\cdot 0 + \\frac{1}{\\sqrt{2}} \\cdot \\frac{1}{\\sqrt{2}} = -\\frac{1}{2} + \\frac{1}{2} = 0\\). מדויק!</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 3 · לכסון אוניטרי של מטריצה הרמיטית מרוכבת עם ערכים מדומים</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>נתונה המטריצה המרוכבת:
      \\[ A = \\begin{pmatrix} 1 & -i \\\\ i & 1 \\end{pmatrix} \\]
    </p>
    <p>א. הוכיחו כי \\(A\\) הרמיטית (צמודה לעצמה).</p>
    <p>ב. מצאו מטריצה אוניטרית \\(Q \\in M_2(\\mathbb{C})\\) ומטריצה אלכסונית \\(D\\) כך ש־\\(Q^* A Q = D\\).</p>

    <p><strong>פתרון מפורט:</strong></p>
    <p><strong>סעיף א — בדיקת הרמיטיות:</strong></p>
    <p>נחשב את הצמודה ההרמיטית \\(A^* = \\overline{A^t}\\):
      \\[ A^t = \\begin{pmatrix} 1 & i \\\\ -i & 1 \\end{pmatrix} \\implies A^* = \\overline{A^t} = \\begin{pmatrix} \\overline{1} & \\overline{i} \\\\ \\overline{-i} & \\overline{1} \\end{pmatrix} = \\begin{pmatrix} 1 & -i \\\\ i & 1 \\end{pmatrix} = A \\]
      מכיוון ש־\\(A^* = A\\), המטריצה \\(A\\) היא הרמיטית. לפי משפט 3.3.1, כל ערכיה העצמיים ממשיים, והיא לכסינה אוניטרית מעל \\(\\mathbb{C}\\).
    </p>

    <p><strong>סעיף ב — לכסון אוניטרי:</strong></p>
    <ol>
      <li>נחשב את הפולינום האופייני:
        \\[ \\det(\\lambda I - A) = \\det \\begin{pmatrix} \\lambda - 1 & i \\\\ -i & \\lambda - 1 \\end{pmatrix} = (\\lambda - 1)^2 - (-i)(i) = (\\lambda - 1)^2 - 1 = \\lambda^2 - 2\\lambda = \\lambda(\\lambda - 2) \\]
        הערכים העצמיים הם \\(\\lambda_1 = 0\\) ו־\\(\\lambda_2 = 2\\) (שניהם ממשיים, בדיוק כפי שהמשפט חוזה!).
      </li>
      <li>עבור \\(\\lambda_1 = 0\\): נפתור \\((A - 0I)v = 0\\):
        \\[ \\begin{pmatrix} 1 & -i \\\\ i & 1 \\end{pmatrix} \\xrightarrow{R_2 \\leftarrow R_2 - i R_1} \\begin{pmatrix} 1 & -i \\\\ 0 & 1 - i(-i) \\end{pmatrix} = \\begin{pmatrix} 1 & -i \\\\ 0 & 0 \\end{pmatrix} \\]
        מכאן \\(x_1 - i x_2 = 0 \\implies x_1 = i x_2\\).
        נבחר \\(x_2 = 1 \\implies v_1 = \\begin{pmatrix} i \\\\ 1 \\end{pmatrix}\\).
        ננרמל לפי המכפלה הפנימית המרוכבת הסטנדרטית (\\(\\|v\\|^2 = |x_1|^2 + |x_2|^2\\)):
        \\[ \\|v_1\\| = \\sqrt{|i|^2 + |1|^2} = \\sqrt{1 + 1} = \\sqrt{2} \\implies u_1 = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} i \\\\ 1 \\end{pmatrix} \\]
      </li>
      <li>עבור \\(\\lambda_2 = 2\\): נפתור \\((A - 2I)v = 0\\):
        \\[ A - 2I = \\begin{pmatrix} -1 & -i \\\\ i & -1 \\end{pmatrix} \\xrightarrow{R_2 \\leftarrow R_2 + i R_1} \\begin{pmatrix} -1 & -i \\\\ 0 & 0 \\end{pmatrix} \\xrightarrow{R_1 \\leftarrow -R_1} \\begin{pmatrix} 1 & i \\\\ 0 & 0 \\end{pmatrix} \\]
        מכאן \\(x_1 + i x_2 = 0 \\implies x_1 = -i x_2\\).
        נבחר \\(x_2 = 1 \\implies v_2 = \\begin{pmatrix} -i \\\\ 1 \\end{pmatrix}\\).
        ננרמל:
        \\[ \\|v_2\\| = \\sqrt{|-i|^2 + |1|^2} = \\sqrt{1 + 1} = \\sqrt{2} \\implies u_2 = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} -i \\\\ 1 \\end{pmatrix} \\]
      </li>
      <li>הרכבת \\(Q\\) ו־\\(D\\):
        \\[ Q = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} i & -i \\\\ 1 & 1 \\end{pmatrix}, \\qquad D = \\begin{pmatrix} 0 & 0 \\\\ 0 & 2 \\end{pmatrix} \\]
        בדיקת אוניטריות של \\(Q\\):
        \\[ Q^* = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} -i & 1 \\\\ i & 1 \\end{pmatrix} \\implies Q^* Q = \\frac{1}{2} \\begin{pmatrix} -i & 1 \\\\ i & 1 \\end{pmatrix} \\begin{pmatrix} i & -i \\\\ 1 & 1 \\end{pmatrix} = \\frac{1}{2} \\begin{pmatrix} 1+1 & -1+1 \\\\ -1+1 & 1+1 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} \\]
        מתקיים \\(Q^* A Q = D\\).
      </li>
    </ol>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> חישוב נורמה מרוכבת ללא ערך מוחלט! זכרו כי מעל \\(\\mathbb{C}\\), הנורמה היא \\(\\|(x,y)\\|^2 = |x|^2 + |y|^2\\). אם תחשבו בטעות \\(x^2 + y^2\\), תקבלו עבור \\(v = (i, 1)^t\\) את התוצאה השגויה \\(i^2 + 1^2 = -1 + 1 = 0\\), כלומר "נורמה אפס" לווקטור שאינו אפס!
    </div>

    <p><strong>בדקו את עצמכם:</strong> חשבו את המכפלה הפנימית \\(\\langle u_1, u_2 \\rangle = u_2^* u_1\\) וודאו אורתוגונליות.<br />
    <em>תשובה:</em> \\(u_2^* u_1 = \\frac{1}{2} \\begin{pmatrix} i & 1 \\end{pmatrix} \\begin{pmatrix} i \\\\ 1 \\end{pmatrix} = \\frac{1}{2} (i \\cdot i + 1 \\cdot 1) = \\frac{1}{2}(-1 + 1) = 0\\).</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 4 · פירוק ספקטרלי וחישוב חזקה גבוהה A^{50} באמצעות נוסחאות ענבר</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>נתונה המטריצה:
      \\[ A = \\begin{pmatrix} 5 & 2 \\\\ 2 & 2 \\end{pmatrix} \\]
    </p>
    <p>א. מצאו את הפירוק הספקטרלי של \\(A\\), כלומר מצאו ערכים עצמיים \\(\\lambda_1, \\lambda_2\\) והיטלים אורתוגונליים \\(P_1, P_2\\) כך ש־\\(A = \\lambda_1 P_1 + \\lambda_2 P_2\\) ו־\\(P_1 + P_2 = I\\).</p>
    <p>ב. השתמשו בפירוק הספקטרלי כדי לחשב ביטוי מפורש למטריצה \\(A^{50}\\).</p>

    <p><strong>פתרון מפורט:</strong></p>
    <p><strong>סעיף א — פירוק ספקטרלי עם נוסחאות הקיצור של ענבר:</strong></p>
    <ol>
      <li>נחשב את הפולינום האופייני:
        \\[ \\det(\\lambda I - A) = (\\lambda - 5)(\\lambda - 2) - 4 = \\lambda^2 - 7\\lambda + 6 = (\\lambda - 6)(\\lambda - 1) \\]
        הערכים העצמיים הם \\(\\lambda_1 = 6\\) ו־\\(\\lambda_2 = 1\\).
      </li>
      <li>נחשב ישירות את ההיטל \\(P_1\\) (על המרחב העצמי \\(V_6\\)):
        \\[ P_1 = \\frac{A - \\lambda_2 I}{\\lambda_1 - \\lambda_2} = \\frac{A - I}{6 - 1} = \\frac{1}{5} \\left( \\begin{pmatrix} 5 & 2 \\\\ 2 & 2 \\end{pmatrix} - \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} \\right) = \\frac{1}{5} \\begin{pmatrix} 4 & 2 \\\\ 2 & 1 \\end{pmatrix} = \\begin{pmatrix} 4/5 & 2/5 \\\\ 2/5 & 1/5 \\end{pmatrix} \\]
      </li>
      <li>נחשב ישירות את ההיטל \\(P_2\\) (על המרחב העצמי \\(V_1\\)):
        \\[ P_2 = \\frac{A - \\lambda_1 I}{\\lambda_2 - \\lambda_1} = \\frac{A - 6I}{1 - 6} = -\\frac{1}{5} \\left( \\begin{pmatrix} 5 & 2 \\\\ 2 & 2 \\end{pmatrix} - \\begin{pmatrix} 6 & 0 \\\\ 0 & 6 \\end{pmatrix} \\right) = -\\frac{1}{5} \\begin{pmatrix} -1 & 2 \\\\ 2 & -4 \\end{pmatrix} = \\begin{pmatrix} 1/5 & -2/5 \\\\ -2/5 & 4/5 \\end{pmatrix} \\]
      </li>
      <li>בדיקה מהירה:
        \\[ P_1 + P_2 = \\begin{pmatrix} 4/5+1/5 & 2/5-2/5 \\\\ 2/5-2/5 & 1/5+4/5 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = I \\]
        \\[ 6 P_1 + 1 P_2 = 6 \\begin{pmatrix} 4/5 & 2/5 \\\\ 2/5 & 1/5 \\end{pmatrix} + \\begin{pmatrix} 1/5 & -2/5 \\\\ -2/5 & 4/5 \\end{pmatrix} = \\begin{pmatrix} 24/5+1/5 & 12/5-2/5 \\\\ 12/5-2/5 & 6/5+4/5 \\end{pmatrix} = \\begin{pmatrix} 5 & 2 \\\\ 2 & 2 \\end{pmatrix} = A \\]
      </li>
    </ol>

    <p><strong>סעיף ב — חישוב חזקה A^{50}:</strong></p>
    <p>לפי משפט הפירוק הספקטרלי, מכיוון ש־\\(P_1^2 = P_1\\), \\(P_2^2 = P_2\\) ו־\\(P_1 P_2 = 0\\), מתקיים:
      \\[ A^{50} = 6^{50} P_1 + 1^{50} P_2 = 6^{50} \\begin{pmatrix} 4/5 & 2/5 \\\\ 2/5 & 1/5 \\end{pmatrix} + 1 \\cdot \\begin{pmatrix} 1/5 & -2/5 \\\\ -2/5 & 4/5 \\end{pmatrix} \\]
      \\[ A^{50} = \\frac{1}{5} \\begin{pmatrix} 4 \\cdot 6^{50} + 1 & 2 \\cdot 6^{50} - 2 \\\\ 2 \\cdot 6^{50} - 2 & 6^{50} + 4 \\end{pmatrix} \\]
    </p>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> לשכוח שבמכנה של \\(P_1\\) מופיע \\(\\lambda_1 - \\lambda_2\\), ובמכנה של \\(P_2\\) מופיע \\(\\lambda_2 - \\lambda_1\\). סדר החיסור במכנה חייב להתאים בדיוק לאותו סדר במונה!
    </div>

    <p><strong>בדקו את עצמכם:</strong> חשבו בעזרת הפירוק את \\(A^{-1}\\).<br />
    <em>תשובה:</em> \\(A^{-1} = \\frac{1}{6} P_1 + \\frac{1}{1} P_2 = \\frac{1}{6} \\cdot \\frac{1}{5} \\begin{pmatrix} 4 & 2 \\\\ 2 & 1 \\end{pmatrix} + \\frac{1}{5} \\begin{pmatrix} 1 & -2 \\\\ -2 & 4 \\end{pmatrix} = \\frac{1}{6} \\begin{pmatrix} 2 & -2 \\\\ -2 & 5 \\end{pmatrix}\\). בדיקה: \\(\\det A = 10 - 4 = 6\\), והנוסחה הקלאסית להופכית נותנת בדיוק אותו הדבר!</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 5 · הוכחה תיאורטית: העתקה נורמלית אידמפוטנטית (T^2=T) היא היטל אורתוגונלי</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>תהי \\(T: V \\to V\\) העתקה לינארית נורמלית במרחב מכפלה פנימית נוצר-סופית \\(V\\). נתון כי \\(T^2 = T\\) (כלומר \\(T\\) אידמפוטנטית, הטלה). הוכיחו כי \\(T\\) היא היטל אורתוגונלי, כלומר \\(T^* = T\\).</p>

    <p><strong>פתרון מפורט:</strong></p>
    <ol>
      <li><strong>שלב 1: מציאת הערכים העצמיים האפשריים:</strong>
        יהי \\(\\lambda\\) ערך עצמי כלשהו של \\(T\\), ויהי \\(v \\neq 0\\) וקטור עצמי מתאים: \\(T(v) = \\lambda v\\).
        מצד אחד: \\(T^2(v) = T(T(v)) = T(\\lambda v) = \\lambda T(v) = \\lambda^2 v\\).
        מצד שני, נתון \\(T^2 = T\\), ולכן: \\(T^2(v) = T(v) = \\lambda v\\).
        מכאן: \\(\\lambda^2 v = \\lambda v \\implies (\\lambda^2 - \\lambda) v = 0\\).
        מכיוון ש־\\(v \\neq 0\\), נקבל: \\(\\lambda(\\lambda - 1) = 0\\), כלומר \\(\\lambda = 0\\) או \\(\\lambda = 1\\).
      </li>
      <li><strong>שלב 2: שימוש באפיון הספקטרלי:</strong>
        ראינו שכל הערכים העצמיים של \\(T\\) שייכים לקבוצה \\(\\{0, 1\\}\\).
        בפרט, <em>כל הערכים העצמיים הם מספרים ממשיים</em> (\\(\\lambda_i \\in \\mathbb{R}\\)).
      </li>
      <li><strong>שלב 3: הסקת המסקנה:</strong>
        לפי משפט 3.3.1 (אפיון העתקות נורמליות לפי הספקטרום), העתקה נורמלית שכל ערכיה העצמיים הם ממשיים היא <strong>צמודה לעצמה בהכרח</strong>!
        כלומר:
        \\[ T^* = T \\]
        העתקה המקיימת בו-זמנית \\(T^2 = T\\) ו־\\(T^* = T\\) היא בדיוק ההגדרה של <strong>היטל אורתוגונלי</strong>!
      </li>
    </ol>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> לשכוח את נתוני הנורמליות. ללא הנתון ש־\\(T\\) נורמלית, הטלה \\(T^2 = T\\) יכולה להיות הטלה משופעת (לא אורתוגונלית), כמו \\(A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 0 \\end{pmatrix}\\), שעבורה \\(A^2 = A\\) אך \\(A^* = \\begin{pmatrix} 1 & 0 \\\\ 1 & 0 \\end{pmatrix} \\neq A\\).
    </div>

    <p><strong>בדקו את עצמכם:</strong> הוכיחו בדרך דומה כי אם \\(T\\) נורמלית ו־\\(T^3 = T\\), אזי \\(T^* = T\\).<br />
    <em>תשובה:</em> המשוואה \\(\\lambda^3 = \\lambda\\) נותנת \\(\\lambda \\in \\{-1, 0, 1\\}\\). כל הע״ע ממשיים, ולכן \\(T\\) נורמלית עם ע״ע ממשיים \\(\\implies T^* = T\\).</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 6 · לכסון סימולטני של שתי העתקות נורמליות מתחלפות (ST=TS)</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>יהיו \\(S, T: V \\to V\\) שתי העתקות לינאריות נורמליות במרחב מכפלה פנימית נוצר-סופית מעל \\(\\mathbb{C}\\). נתון כי הן מתחלפות: \\(S T = T S\\).
      הוכיחו כי קיים בסיס אורתונורמלי \\(B\\) של \\(V\\) אשר מורכב מווקטורים עצמיים משותפים של \\(S\\) ושל \\(T\\) בו-זמנית (כלומר \\([S]_B\\) ו־\\([T]_B\\) אלכסוניות שתיהן).
    </p>

    <p><strong>פתרון מפורט:</strong></p>
    <ol>
      <li><strong>שלב 1: פירוק ספקטרלי של T:</strong>
        מכיוון ש־\\(T\\) נורמלית, לפי המשפט הספקטרלי המרחב \\(V\\) מתפרק לסכום ישר אורתוגונלי של מרחביה העצמיים:
        \\[ V = V_{\\lambda_1} \\oplus V_{\\lambda_2} \\oplus \\dots \\oplus V_{\\lambda_k}, \\qquad V_{\\lambda_i} \\perp V_{\\lambda_j} \\text{ for } i \\neq j \\]
      </li>
      <li><strong>שלב 2: המרחבים העצמיים הם S-שמורים:</strong>
        יהי \\(v \\in V_{\\lambda_i}\\), כלומר \\(T(v) = \\lambda_i v\\). נבדוק מה \\(T\\) עושה לווקטור \\(S(v)\\):
        \\[ T(S(v)) = (T S)(v) = (S T)(v) = S(T(v)) = S(\\lambda_i v) = \\lambda_i S(v) \\]
        שוויון זה מראה ש־\\(S(v) \\in V_{\\lambda_i}\\)!
        לכן המרחב העצמי \\(V_{\\lambda_i}\\) הוא <strong>\\(S\\)-שמור</strong> (כלומר \\(S(V_{\\lambda_i}) \\subseteq V_{\\lambda_i}\\)).
      </li>
      <li><strong>שלב 3: צמצום ההעתקה הנורמלית S:</strong>
        נגדיר את הצמצום \\(S_i = S|_{V_{\\lambda_i}}: V_{\\lambda_i} \\to V_{\\lambda_i}\\).
        מכיוון ש־\\(S\\) נורמלית והמרחבים העצמיים הם אורתוגונליים, הצמצום \\(S_i\\) הוא העתקה נורמלית על המרחב \\(V_{\\lambda_i}\\).
      </li>
      <li><strong>שלב 4: מציאת בא״נ בתוך כל מרחב עצמי:</strong>
        לפי משפט הלכסון האוניטרי המופעל על \\(S_i\\), קיים בסיס אורתונורמלי \\(B_i\\) של \\(V_{\\lambda_i}\\) המורכב מווקטורים עצמיים של \\(S_i\\) (שהם כמובן וקטורים עצמיים של \\(S\\)).
        אך כל וקטור ב־\\(B_i\\) שייך מלכתחילה ל־\\(V_{\\lambda_i}\\), ולכן הוא גם וקטור עצמי של \\(T\\) (עם ע״ע \\(\\lambda_i\\))!
      </li>
      <li><strong>שלב 5: איחוד הבסיסים:</strong>
        נגדיר \\(B = B_1 \\cup B_2 \\cup \\dots \\cup B_k\\).
        מכיוון שכל \\(B_i\\) הוא בא״נ של \\(V_{\\lambda_i}\\), והמרחבים \\(V_{\\lambda_i}\\) ניצבים זה לזה, האיחוד \\(B\\) הוא <strong>בסיס אורתונורמלי של כל המרחב V</strong>, שכל וקטור בו הוא וקטור עצמי משותף של \\(S\\) ושל \\(T\\)!
      </li>
    </ol>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> להניח שהתחלפות \\(ST=TS\\) מספיקה ללכסון סימולטני בלי נורמליות. אם ההעתקות אינן לכסינות (למשל מכילות בלוקי ז׳ורדן), התחלפות מבטיחה רק <em>שילוש סימולטני</em> (משפט 8), אך לא לכסון!
    </div>

    <p><strong>בדקו את עצמכם:</strong> האם שתי מטריצות אלכסוניות כלשהן תמיד מתחלפות?<br />
    <em>תשובה:</em> כן! כפל מטריצות אלכסוניות הוא פשוט כפל של איברי האלכסון המתאימים, וכפל מספרים הוא חילופי: \\(d_i c_i = c_i d_i\\).</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 7 · שורש ריבועי חיובי של מטריצה סימטרית חיובית לחלוטין</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>נתונה המטריצה הממשית הסימטרית:
      \\[ A = \\begin{pmatrix} 5 & 2 \\\\ 2 & 2 \\end{pmatrix} \\]
    </p>
    <p>א. הוכיחו כי \\(A\\) חיובית לחלוטין (מוגדרת חיובית).</p>
    <p>ב. מצאו את השורש הריבועי החיובי היחיד \\(S = \\sqrt{A}\\) (כלומר מטריצה חיובית לחלוטין \\(S\\) המקיימת \\(S^2 = A\\)).</p>

    <p><strong>פתרון מפורט:</strong></p>
    <p><strong>סעיף א — הוכחת חיוביות לחלוטין:</strong></p>
    <p>בתרגיל 4 חישבנו את ערכיה העצמיים של \\(A\\):
      \\[ p_A(\\lambda) = \\lambda^2 - 7\\lambda + 6 = (\\lambda - 6)(\\lambda - 1) \\implies \\lambda_1 = 6, \\quad \\lambda_2 = 1 \\]
      שני הערכים העצמיים ממשיים וחיוביים ממש: \\(\\lambda_1 = 6 \\gt 0\\), \\(\\lambda_2 = 1 \\gt 0\\).
      לפי משפט 3.3.2, מטריצה סימטרית היא חיובית לחלוטין אם ורק אם כל ערכיה העצמיים חיוביים ממש. לכן \\(A\\) חיובית לחלוטין.
    </p>

    <p><strong>סעיף ב — מציאת השורש הריבועי החיובי:</strong></p>
    <p>לפי משפט הפירוק הספקטרלי, אם \\(A = \\lambda_1 P_1 + \\lambda_2 P_2\\), אזי השורש הריבועי החיובי מוגדר על ידי:
      \\[ S = \\sqrt{A} = \\sqrt{\\lambda_1} P_1 + \\sqrt{\\lambda_2} P_2 = \\sqrt{6} P_1 + \\sqrt{1} P_2 = \\sqrt{6} P_1 + P_2 \\]
      בתרגיל 4 חישבנו במפורש את ההיטלים:
      \\[ P_1 = \\begin{pmatrix} 4/5 & 2/5 \\\\ 2/5 & 1/5 \\end{pmatrix}, \\qquad P_2 = \\begin{pmatrix} 1/5 & -2/5 \\\\ -2/5 & 4/5 \\end{pmatrix} \\]
      נציב ונקבל:
      \\[ S = \\sqrt{6} \\begin{pmatrix} 4/5 & 2/5 \\\\ 2/5 & 1/5 \\end{pmatrix} + \\begin{pmatrix} 1/5 & -2/5 \\\\ -2/5 & 4/5 \\end{pmatrix} \\]
      \\[ S = \\frac{1}{5} \\begin{pmatrix} 4\\sqrt{6} + 1 & 2\\sqrt{6} - 2 \\\\ 2\\sqrt{6} - 2 & \\sqrt{6} + 4 \\end{pmatrix} \\]
    </p>
    <p><strong>בדיקה:</strong> נחשב את \\(S^2\\):
      מכיוון ש־\\(P_1^2 = P_1, P_2^2 = P_2, P_1 P_2 = 0\\):
      \\[ S^2 = (\\sqrt{6} P_1 + P_2)^2 = (\\sqrt{6})^2 P_1 + 1^2 P_2 = 6 P_1 + P_2 = A \\]
      בדיוק מושלם!
    </p>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> הוצאת שורש ישירות מאיברי המטריצה: \\(\\begin{pmatrix} \\sqrt{5} & \\sqrt{2} \\\\ \\sqrt{2} & \\sqrt{2} \\end{pmatrix}\\). זהו שיבוש אלגברי חמור! כפל מטריצות אינו פועל איבר-איבר, ולכן שורש של מטריצה לעולם אינו שורש של איבריה, אלא שורש של ערכיה העצמיים במרחב המלוכסן.
    </div>

    <p><strong>בדקו את עצמכם:</strong> מהם הערכים העצמיים של המטריצה \\(S\\)?<br />
    <em>תשובה:</em> הערכים העצמיים של \\(S\\) הם \\(\\sqrt{6}\\) ו־\\(\\sqrt{1} = 1\\), שניהם חיוביים ממש, ולכן \\(S\\) חיובית לחלוטין.</p>
  </div>
</details>
`
});
