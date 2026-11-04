// edit-pass: 1 | unit: 2 | date: 2026-11-04
(window.UNIT2 = window.UNIT2 || { sections: [] }).sections.push({
  id: "l2-hw",
  title: "תרגילי בית: העתקות לינאריות במרחבי מכפלה פנימית",
  html: `
<p>פרק זה מרכז תרגילי מבחן נבחרים מתוך חומרי הלימוד הרשמיים בנושא העתקות לינאריות במרחבי מכפלה פנימית. הנושאים המכוסים: מציאת ההעתקה הצמודה לפי הגדרה ובאמצעות מטריצה מייצגת בבא\"נ, העתקות צמודות לעצמן (הרמיטיות) והוכחת ממשיות ע\"ע ואורתוגונליות ו\"ע, פירוק אופרטור לחלק הרמיטי ואנטי־הרמיטי, העתקות חיוביות לחלוטין ומכפלות פנימיות מושרות, העתקות ומטריצות אוניטריות/אורתוגונליות, ומשפטי פרדהולם לקשר בין גרעין ותמונה. כל התרגילים מלווים בפתרונות מלאים צעד־אחר־צעד.</p>

<details class="fold">
  <summary>תרגיל 1 · מציאת ההעתקה הצמודה T* ישירות לפי ההגדרה</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>תהי \\(T: \\mathbb{R}^3 \\to \\mathbb{R}^2\\) העתקה לינארית המוגדרת על ידי:</p>
    \\[ T \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} x + 2y \\\\ y - 3z \\end{pmatrix} \\]
    <p>כאשר בשני המרחבים מוגדרת המכפלה הפנימית הסטנדרטית.
    מצאו נוסחה מפורשת עבור ההעתקה הצמודה \\(T^*: \\mathbb{R}^2 \\to \\mathbb{R}^3\\) ישירות מתוך השוויון \\(\\langle T(u), w \\rangle = \\langle u, T^*(w) \\rangle\\).</p>

    <p><strong>פתרון מפורט:</strong></p>
    <ol>
      <li>נסמן וקטור כללי במקור \\(u = \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} \\in \\mathbb{R}^3\\), ווקטור כללי ביעד \\(w = \\begin{pmatrix} a \\\\ b \\end{pmatrix} \\in \\mathbb{R}^2\\).</li>
      <li>נחשב את אגף שמאל, \\(\\langle T(u), w \\rangle\\), לפי המכפלה הסטנדרטית ב־\\(\\mathbb{R}^2\\):
        \\[ \\langle T(u), w \\rangle = \\left\\langle \\begin{pmatrix} x + 2y \\\\ y - 3z \\end{pmatrix}, \\begin{pmatrix} a \\\\ b \\end{pmatrix} \\right\\rangle = (x + 2y)a + (y - 3z)b \\]
      </li>
      <li>נפתח סוגריים:
        \\[ = ax + 2ay + by - 3bz \\]
      </li>
      <li>כעת, <strong>נקבץ את האיברים לפי משתני המקור \\(x, y, z\\)</strong> כדי להביא את הביטוי לצורה של מכפלה פנימית עם \\(u\\):
        \\[ = x(a) + y(2a + b) + z(-3b) \\]
      </li>
      <li>נזהה את המבנה של מכפלה פנימית סטנדרטית ב־\\(\\mathbb{R}^3\\):
        \\[ x(a) + y(2a + b) + z(-3b) = \\left\\langle \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix}, \\begin{pmatrix} a \\\\ 2a + b \\\\ -3b \\end{pmatrix} \\right\\rangle = \\langle u, T^*(w) \\rangle \\]
      </li>
      <li>לפי יחידות ההעתקה הצמודה, הווקטור הימני הוא בדיוק \\(T^*(w)\\)! לכן:
        \\[ T^* \\begin{pmatrix} a \\\\ b \\end{pmatrix} = \\begin{pmatrix} a \\\\ 2a + b \\\\ -3b \\end{pmatrix} \\]
      </li>
    </ol>
    <p><strong>בדיקה במטריצות:</strong> המטריצה המייצגת של \\(T\\) בבסיסים הסטנדרטיים היא \\([T] = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & -3 \\end{pmatrix}\\).
    המטריצה הצמודה (המשוחלפת) היא \\([T]^t = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\\\ 0 & -3 \\end{pmatrix}\\).
    נכפול ב־\\(\\begin{pmatrix} a \\\\ b \\end{pmatrix}\\):
    \\[ \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\\\ 0 & -3 \\end{pmatrix} \\begin{pmatrix} a \\\\ b \\end{pmatrix} = \\begin{pmatrix} a \\\\ 2a + b \\\\ -3b \\end{pmatrix} \\]
    התוצאות תואמות לחלוטין!</p>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> לשכוח לקבץ לפי משתני המקור. הרעיון במציאה לפי הגדרה הוא תמיד להוציא את \\(x, y, z\\) כגורמים משותפים, והמקדמים שנותרים בסוגריים הם בדיוק רכיבי הווקטור הצמוד.
    </div>

    <p><strong>בדקו את עצמכם:</strong> אם \\(S: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) מוגדרת ע\"י \\(S(x, y) = (3x - y, 2x + 4y)\\), מהי \\(S^*(a, b)\\)?<br />
    <em>תשובה:</em> \\(\\langle S(u), w \\rangle = (3x-y)a + (2x+4y)b = x(3a+2b) + y(-a+4b)\\). לכן \\(S^*(a,b) = (3a+2b, -a+4b)\\).</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 2 · המטריצה המייצגת של ההעתקה הצמודה בבסיס אורתונורמלי</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>במרחב \\(\\mathbb{C}^2\\) עם המכפלה הפנימית הסטנדרטית, נתון הבסיס האורתונורמלי:</p>
    \\[ B = \\left( e_1 = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 \\\\ i \\end{pmatrix}, \\quad e_2 = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 \\\\ -i \\end{pmatrix} \\right) \\]
    <p>ונתון אופרטור לינארי \\(T: \\mathbb{C}^2 \\to \\mathbb{C}^2\\) שהמטריצה המייצגת שלו בבסיס \\(B\\) היא:</p>
    \\[ [T]_B = \\begin{pmatrix} 1 + i & 2 \\\\ 3i & 4 - 2i \\end{pmatrix} \\]
    <p>א. מצאו את המטריצה המייצגת של ההעתקה הצמודה, \\([T^*]_B\\).</p>
    <p>ב. יהי \\(v \\in \\mathbb{C}^2\\) וקטור שקואורדינטותיו בבסיס \\(B\\) הן \\([v]_B = \\begin{pmatrix} 1 \\\\ 2i \\end{pmatrix}\\). חשבו את \\([T^*(v)]_B\\).</p>

    <p><strong>פתרון מפורט:</strong></p>
    <p><strong>סעיף א:</strong></p>
    <ol>
      <li>נבדוק תחילה האם הבסיס \\(B\\) הוא אכן בא\"נ:
        \\[ \\langle e_1, e_1 \\rangle = \\frac{1}{2}(1\\cdot 1 + i\\cdot(-i)) = \\frac{1}{2}(1 + 1) = 1 \\]
        \\[ \\langle e_2, e_2 \\rangle = \\frac{1}{2}(1\\cdot 1 + (-i)\\cdot i) = \\frac{1}{2}(1 + 1) = 1 \\]
        \\[ \\langle e_1, e_2 \\rangle = \\frac{1}{2}(1\\cdot 1 + i\\cdot i) = \\frac{1}{2}(1 - 1) = 0 \\]
        הבסיס הוא אכן בא\"נ מושלם!
      </li>
      <li>מכיוון שהבסיס \\(B\\) הוא בסיס אורתונורמלי, מתקיים המשפט:
        \\[ [T^*]_B = [T]_B^* = \\overline{[T]_B}^t \\]
      </li>
      <li>נבצע שחלוף והצמדה מרוכבת:
        \\[ [T]_B^t = \\begin{pmatrix} 1 + i & 3i \\\\ 2 & 4 - 2i \\end{pmatrix} \\]
        \\[ [T^*]_B = \\overline{[T]_B^t} = \\begin{pmatrix} \\overline{1 + i} & \\overline{3i} \\\\ \\overline{2} & \\overline{4 - 2i} \\end{pmatrix} = \\begin{pmatrix} 1 - i & -3i \\\\ 2 & 4 + 2i \\end{pmatrix} \\]
      </li>
    </ol>

    <p><strong>סעיף ב:</strong></p>
    <p>הקואורדינטות של \\(T^*(v)\\) מתקבלות על ידי כפל מטריצה בעמודה:</p>
    \\[ [T^*(v)]_B = [T^*]_B [v]_B = \\begin{pmatrix} 1 - i & -3i \\\\ 2 & 4 + 2i \\end{pmatrix} \\begin{pmatrix} 1 \\\\ 2i \\end{pmatrix} \\]
    \\[ = \\begin{pmatrix} (1 - i)\\cdot 1 + (-3i)\\cdot (2i) \\\\ 2\\cdot 1 + (4 + 2i)\\cdot (2i) \\end{pmatrix} = \\begin{pmatrix} 1 - i - 6i^2 \\\\ 2 + 8i + 4i^2 \\end{pmatrix} \\]
    מכיוון ש־\\(i^2 = -1\\):
    \\[ = \\begin{pmatrix} 1 - i + 6 \\\\ 2 + 8i - 4 \\end{pmatrix} = \\begin{pmatrix} 7 - i \\\\ -2 + 8i \\end{pmatrix} \\]

    <div class="panel">
      <strong>מוקש נפוץ:</strong> ביצוע שחלוף בלבד ללא הצמדה מרוכבת מעל \\(\\mathbb{C}\\). זכרו: מעל המרוכבים, הצימוד דורש שחלוף <em>וגם</em> הצמדה של כל איבר מרוכב (\\(a+bi \\mapsto a-bi\\)).
    </div>

    <p><strong>בדקו את עצמכם:</strong> האם \\([T^*]_B\\) הפיכה אם \\([T]_B\\) הפיכה?<br />
    <em>תשובה:</em> כן! \\(\\det([T^*]_B) = \\overline{\\det([T]_B)}\\). אם \\(\\det([T]_B) \\ne 0\\), אז גם הצמוד שונה מאפס, ולכן ההעתקה הצמודה הפיכה.</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 3 · העתקה הרמיטית — הוכחת ממשיות ע״ע ואורתוגונליות ו״ע</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>נתונה המטריצה המרוכבת הבאה ב־\\(M_{2 \\times 2}(\\mathbb{C})\\):</p>
    \\[ H = \\begin{pmatrix} 2 & 1 - i \\\\ 1 + i & 3 \\end{pmatrix} \\]
    <p>א. הוכיחו כי \\(H\\) היא מטריצה הרמיטית (צמודה לעצמה).</p>
    <p>ב. מצאו את הערכים העצמיים של \\(H\\) והראו כי הם ממשיים טהורים.</p>
    <p>ג. מצאו את הווקטורים העצמיים והוכיחו כי הם אורתוגונליים זה לזה ביחס למכפלה הפנימית הסטנדרטית.</p>

    <p><strong>פתרון מפורט:</strong></p>
    <p><strong>סעיף א — הוכחה שהמטריצה הרמיטית:</strong></p>
    \\[ H^* = \\overline{H}^t = \\begin{pmatrix} \\overline{2} & \\overline{1 + i} \\\\ \\overline{1 - i} & \\overline{3} \\end{pmatrix} = \\begin{pmatrix} 2 & 1 - i \\\\ 1 + i & 3 \\end{pmatrix} = H \\]
    <p>מכיוון ש־\\(H^* = H\\), המטריצה היא הרמיטית.</p>

    <p><strong>סעיף ב — מציאת ע\"ע:</strong></p>
    <p>נחשב את הפולינום האופייני:</p>
    \\[ P_H(x) = \\det(xI - H) = \\det \\begin{pmatrix} x - 2 & -(1 - i) \\\\ -(1 + i) & x - 3 \\end{pmatrix} \\]
    \\[ = (x - 2)(x - 3) - [-(1 - i)][-(1 + i)] = (x^2 - 5x + 6) - (1 - i)(1 + i) \\]
    נחשב את המכפלה המרוכבת: \\((1 - i)(1 + i) = 1^2 - i^2 = 1 - (-1) = 2\\). נציב:
    \\[ P_H(x) = x^2 - 5x + 6 - 2 = x^2 - 5x + 4 = (x - 1)(x - 4) \\]
    השורשים הם:
    \\[ \\lambda_1 = 1, \\quad \\lambda_2 = 4 \\]
    שני הערכים העצמיים הם מספרים <strong>ממשיים טהורים</strong>, בדיוק כפי שמבטיח המשפט להעתקות הרמיטיות!</p>

    <p><strong>סעיף ג — וקטורים עצמיים ואורתוגונליות:</strong></p>
    <ol>
      <li>עבור \\(\\lambda_1 = 1\\): נפתור \\((H - I)v = 0\\):
        \\[ H - I = \\begin{pmatrix} 2 - 1 & 1 - i \\\\ 1 + i & 3 - 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 1 - i \\\\ 1 + i & 2 \\end{pmatrix} \\]
        משורה 1: \\(x + (1 - i)y = 0 \\implies x = -(1 - i)y\\).
        נבחר \\(y = 1\\), ונקבל: \\(v_1 = \\begin{pmatrix} -1 + i \\\\ 1 \\end{pmatrix}\\).
      </li>
      <li>עבור \\(\\lambda_2 = 4\\): נפתור \\((H - 4I)v = 0\\):
        \\[ H - 4I = \\begin{pmatrix} 2 - 4 & 1 - i \\\\ 1 + i & 3 - 4 \\end{pmatrix} = \\begin{pmatrix} -2 & 1 - i \\\\ 1 + i & -1 \\end{pmatrix} \\]
        משורה 2: \\((1 + i)x - y = 0 \\implies y = (1 + i)x\\).
        נבחר \\(x = 1\\), ונקבל: \\(v_2 = \\begin{pmatrix} 1 \\\\ 1 + i \\end{pmatrix}\\).
      </li>
      <li>נבדוק אורתוגונליות במכפלה הפנימית הסטנדרטית של \\(\\mathbb{C}^2\\) (נזכור להצמיד את הרכיב השני!):
        \\[ \\langle v_1, v_2 \\rangle = (-1 + i) \\cdot \\overline{1} + 1 \\cdot \\overline{1 + i} = (-1 + i)(1) + 1(1 - i) = -1 + i + 1 - i = 0 \\]
        המכפלה הפנימית מתאפסת בדיוק! הווקטורים העצמיים הם אורתוגונליים.
      </li>
    </ol>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> אי־הצמדה של הווקטור השני בבדיקת אורתוגונליות מרוכבת: אם מחשבים בטעות \\((-1+i)(1) + (1)(1+i) = 2i \\ne 0\\), נראה כאילו הם אינם מאונכים! חובה להצמיד את הווקטור השני: \\(\\langle u, v \\rangle = u_1 \\overline{v_1} + u_2 \\overline{v_2}\\).
    </div>

    <p><strong>בדקו את עצמכם:</strong> האם המטריצה \\(H\\) חיובית לחלוטין?<br />
    <em>תשובה:</em> כן! כל ערכיה העצמיים חיוביים ממש (\\(\\lambda_1 = 1 \\gt 0, \\lambda_2 = 4 \\gt 0\\)).</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 4 · פירוק אופרטור לינארי לסכום הרמיטי ואנטי־הרמיטי</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>נתונה המטריצה \\(A = \\begin{pmatrix} 1 & 2 \\\\ 4 & 5 \\end{pmatrix} \\in M_{2 \\times 2}(\\mathbb{R})\\).</p>
    <p>א. פרקו את \\(A\\) לסכום של מטריצה סימטרית \\(A_1\\) ומטריצה אנטי־סימטרית \\(A_2\\).</p>
    <p>ב. ודאו כי \\(A_1^t = A_1\\), \\(A_2^t = -A_2\\), ו־\\(A_1 + A_2 = A\\).</p>
    <p>ג. הוכיחו כי פירוק זה הוא יחיד.</p>

    <p><strong>פתרון מפורט:</strong></p>
    <p><strong>סעיפים א' ו־ב':</strong></p>
    <ol>
      <li>נחשב את המשוחלפת: \\(A^t = \\begin{pmatrix} 1 & 4 \\\\ 2 & 5 \\end{pmatrix}\\).</li>
      <li>לפי נוסחאות הפירוק:
        \\[ A_1 = \\frac{A + A^t}{2} = \\frac{1}{2} \\left( \\begin{pmatrix} 1 & 2 \\\\ 4 & 5 \\end{pmatrix} + \\begin{pmatrix} 1 & 4 \\\\ 2 & 5 \\end{pmatrix} \\right) = \\frac{1}{2} \\begin{pmatrix} 2 & 6 \\\\ 6 & 10 \\end{pmatrix} = \\begin{pmatrix} 1 & 3 \\\\ 3 & 5 \\end{pmatrix} \\]
        נבדוק סימטריה: \\(A_1^t = \\begin{pmatrix} 1 & 3 \\\\ 3 & 5 \\end{pmatrix} = A_1\\). סימטרית!
      </li>
      <li>החלק האנטי־סימטרי:
        \\[ A_2 = \\frac{A - A^t}{2} = \\frac{1}{2} \\left( \\begin{pmatrix} 1 & 2 \\\\ 4 & 5 \\end{pmatrix} - \\begin{pmatrix} 1 & 4 \\\\ 2 & 5 \\end{pmatrix} \\right) = \\frac{1}{2} \\begin{pmatrix} 0 & -2 \\\\ 2 & 0 \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix} \\]
        נבדוק אנטי־סימטריה: \\(A_2^t = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix} = -A_2\\). אנטי־סימטרית!
      </li>
      <li>בדיקת הסכום:
        \\[ A_1 + A_2 = \\begin{pmatrix} 1 & 3 \\\\ 3 & 5 \\end{pmatrix} + \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} 1+0 & 3-1 \\\\ 3+1 & 5+0 \\end{pmatrix} = \\begin{pmatrix} 1 & 2 \\\\ 4 & 5 \\end{pmatrix} = A \\]
      </li>
    </ol>

    <p><strong>סעיף ג — הוכחת יחידות הפירוק:</strong></p>
    <p>נניח שקיים פירוק נוסף \\(A = S + K\\), כאשר \\(S^t = S\\) ו־\\(K^t = -K\\).</p>
    <p>נפעיל שחלוף: \\(A^t = (S + K)^t = S^t + K^t = S - K\\).</p>
    <p>נחבר את שתי המשוואות: \\(A + A^t = (S + K) + (S - K) = 2S \\implies S = \\frac{A + A^t}{2} = A_1\\).</p>
    <p>נחסר את המשוואות: \\(A - A^t = (S + K) - (S - K) = 2K \\implies K = \\frac{A - A^t}{2} = A_2\\).</p>
    <p>לכן הפירוק נקבע באופן חד־ערכי ומוחלט — הוא יחיד!</p>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> האם איברי האלכסון של מטריצה אנטי־סימטרית יכולים להיות שונים מאפס? בממשיים: \\(A_{i,i} = -A_{i,i} \\implies 2A_{i,i} = 0 \\implies A_{i,i} = 0\\). לכן כל איברי האלכסון של מטריצה אנטי־סימטרית הם בהכרח 0! (שימו לב: שוב השתמשנו בכך שמותר לחלק ב־2, כלומר \\(\\text{char} \\ne 2\\)).
    </div>

    <p><strong>בדקו את עצמכם:</strong> מהם הערכים העצמיים של \\(A_2 = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\)?<br />
    <em>תשובה:</em> \\(\\det(xI - A_2) = x^2 + 1 = 0 \\implies \\lambda = \\pm i\\). שניהם מדומים טהורים, כפי שנדרש מהעתקה אנטי־הרמיטית!</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 5 · העתקה חיובית לחלוטין ומכפלה פנימית מושרת</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>נתונה המטריצה הממשית הסימטרית: \\(A = \\begin{pmatrix} 3 & 1 \\\\ 1 & 2 \\end{pmatrix}\\).</p>
    <p>א. הוכיחו כי \\(A\\) היא חיובית לחלוטין באמצעות קריטריון סילבסטר ובאמצעות ערכים עצמיים.</p>
    <p>ב. נגדיר פונקציה \\(f: \\mathbb{R}^2 \\times \\mathbb{R}^2 \\to \\mathbb{R}\\) על ידי \\(f(u, v) = v^t A u\\). הראו כי \\(f\\) היא מכפלה פנימית כשרה.</p>
    <p>ג. חשבו את הנורמה המושרת של הווקטור \\(u = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}\\) ביחס למכפלה פנימית זו.</p>

    <p><strong>פתרון מפורט:</strong></p>
    <p><strong>סעיף א — קריטריון סילבסטר וע\"ע:</strong></p>
    <ol>
      <li><strong>לפי קריטריון סילבסטר (מינורים ראשיים מובילים):</strong>
        \\[ \\Delta_1 = \\det(3) = 3 \\gt 0 \\]
        \\[ \\Delta_2 = \\det \\begin{pmatrix} 3 & 1 \\\\ 1 & 2 \\end{pmatrix} = 3\\cdot 2 - 1\\cdot 1 = 6 - 1 = 5 \\gt 0 \\]
        כל המינורים הראשיים המובילים חיוביים ממש, ולכן לפי משפט סילבסטר \\(A\\) חיובית לחלוטין!
      </li>
      <li><strong>לפי ערכים עצמיים:</strong>
        \\[ P_A(x) = \\det \\begin{pmatrix} x - 3 & -1 \\\\ -1 & x - 2 \\end{pmatrix} = (x - 3)(x - 2) - 1 = x^2 - 5x + 6 - 1 = x^2 - 5x + 5 \\]
        השורשים לפי נוסחת השורשים:
        \\[ \\lambda_{1,2} = \\frac{5 \\pm \\sqrt{25 - 20}}{2} = \\frac{5 \\pm \\sqrt{5}}{2} \\]
        מכיוון ש־\\(\\sqrt{5} \\approx 2.236 \\lt 5\\), שני הערכים העצמיים מקיימים:
        \\[ \\lambda_1 = \\frac{5 + \\sqrt{5}}{2} \\gt 0, \\quad \\lambda_2 = \\frac{5 - \\sqrt{5}}{2} \\gt 0 \\]
        שני הערכים העצמיים חיוביים ממש, מה שמוכיח שוב ש־\\(A\\) חיובית לחלוטין.
      </li>
    </ol>

    <p><strong>סעיף ב — מכפלה פנימית כשרה:</strong></p>
    <p>מכיוון ש־\\(A\\) סימטרית וחיובית לחלוטין, לכל \\(u \\ne 0\\) מתקיים \\(f(u, u) = u^t A u \\gt 0\\). הכפל המטריציוני לינארי ברכיבים ושומר סימטריה (כי \\(A^t = A\\)). לכן כל אקסיומות המכפלה הפנימית מתקיימות.</p>

    <p><strong>סעיף ג — חישוב הנורמה המושרת:</strong></p>
    \\[ \\|u\\|_A^2 = f(u, u) = u^t A u = \\begin{pmatrix} 1 & -1 \\end{pmatrix} \\begin{pmatrix} 3 & 1 \\\\ 1 & 2 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} \\]
    \\[ = \\begin{pmatrix} 1 & -1 \\end{pmatrix} \\begin{pmatrix} 3(1) + 1(-1) \\\\ 1(1) + 2(-1) \\end{pmatrix} = \\begin{pmatrix} 1 & -1 \\end{pmatrix} \\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix} = 1\\cdot 2 + (-1)\\cdot(-1) = 2 + 1 = 3 \\]
    לכן הנורמה היא:
    \\[ \\|u\\|_A = \\sqrt{3} \\]

    <div class="panel">
      <strong>מוקש נפוץ:</strong> חישוב הנורמה הסטנדרטית במקום הנורמה המושרת על ידי \\(A\\). הנורמה הסטנדרטית של \\((1, -1)\\) היא \\(\\sqrt{1^2 + (-1)^2} = \\sqrt{2}\\), אך ביחס למכפלה הפנימית המותאמת ל־\\(A\\) קיבלנו \\(\\sqrt{3}\\).
    </div>

    <p><strong>בדקו את עצמכם:</strong> מהי הנורמה המושרת של \\(e_1 = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}\\)?<br />
    <em>תשובה:</em> \\(\\|e_1\\|_A^2 = e_1^t A e_1 = A_{1,1} = 3 \\implies \\|e_1\\|_A = \\sqrt{3}\\).</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 6 · מטריצות אוניטריות ואורתוגונליות ושימור נורמה</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>נתונה המטריצה המרוכבת:</p>
    \\[ U = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & 1 \\\\ i & -i \\end{pmatrix} \\]
    <p>א. הוכיחו כי \\(U\\) היא מטריצה אוניטרית.</p>
    <p>ב. מצאו את הדטרמיננטה של \\(U\\) והראו כי \\(|\\det(U)| = 1\\).</p>
    <p>ג. הוכיחו כי לכל וקטור \\(x \\in \\mathbb{C}^2\\) מתקיים \\(\\|Ux\\| = \\|x\\|\\).</p>

    <p><strong>פתרון מפורט:</strong></p>
    <p><strong>סעיף א — הוכחת אוניטריות:</strong></p>
    <p>עלינו לוודא כי \\(U^* U = I_2\\):</p>
    \\[ U^* = \\overline{U}^t = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & -i \\\\ 1 & i \\end{pmatrix} \\]
    \\[ U^* U = \\frac{1}{2} \\begin{pmatrix} 1 & -i \\\\ 1 & i \\end{pmatrix} \\begin{pmatrix} 1 & 1 \\\\ i & -i \\end{pmatrix} \\]
    נחשב את ארבעת האיברים במכפלה:
    \\[ (U^* U)_{1,1} = 1\\cdot 1 + (-i)\\cdot i = 1 - i^2 = 1 - (-1) = 2 \\]
    \\[ (U^* U)_{1,2} = 1\\cdot 1 + (-i)\\cdot(-i) = 1 + i^2 = 1 - 1 = 0 \\]
    \\[ (U^* U)_{2,1} = 1\\cdot 1 + i\\cdot i = 1 + i^2 = 0 \\]
    \\[ (U^* U)_{2,2} = 1\\cdot 1 + i\\cdot(-i) = 1 - i^2 = 2 \\]
    נכפול בסקלר \\(\\frac{1}{2}\\):
    \\[ U^* U = \\frac{1}{2} \\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = I_2 \\]
    לכן \\(U\\) היא מטריצה אוניטרית!

    <p><strong>סעיף ב — דטרמיננטה:</strong></p>
    \\[ \\det(U) = \\left(\\frac{1}{\\sqrt{2}}\\right)^2 \\det \\begin{pmatrix} 1 & 1 \\\\ i & -i \\end{pmatrix} = \\frac{1}{2} [1(-i) - 1(i)] = \\frac{1}{2}(-2i) = -i \\]
    הערך המוחלט של הדטרמיננטה:
    \\[ |\\det(U)| = |-i| = \\sqrt{0^2 + (-1)^2} = 1 \\]
    בהתאמה מושלמת למשפט הקובע שלכל מטריצה אוניטרית \\(|\\det(U)| = 1\\).

    <p><strong>סעיף ג — שימור נורמה:</strong></p>
    <p>לפי הגדרת הנורמה במכפלה הפנימית הסטנדרטית: \\(\\|Ux\\|^2 = \\langle Ux, Ux \\rangle = (Ux)^* (Ux) = x^* U^* U x\\).</p>
    <p>מכיוון ש־\\(U^* U = I\\):</p>
    \\[ = x^* I x = x^* x = \\|x\\|^2 \\]
    <p>נוציא שורש חיובי משני האגפים: \\(\\|Ux\\| = \\|x\\|\\). הנורמה נשמרת תמיד!</p>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> הוצאת סקלר מדטרמיננטה: עבור מטריצה \\(n \\times n\\), \\(\\det(c A) = c^n \\det(A)\\). במקרה זה \\(n=2\\), ולכן \\(\\left(\\frac{1}{\\sqrt{2}}\\right)^2 = \\frac{1}{2}\\). אם שוכחים להעלות בריבוע, מקבלים תוצאה שגויה.
    </div>

    <p><strong>בדקו את עצמכם:</strong> האם מכפלה של שתי מטריצות אוניטריות \\(U_1, U_2\\) היא אוניטרית?<br />
    <em>תשובה:</em> כן! \\((U_1 U_2)^* (U_1 U_2) = U_2^* U_1^* U_1 U_2 = U_2^* I U_2 = U_2^* U_2 = I\\).</p>
  </div>
</details>

<details class="fold">
  <summary>תרגיל 7 · משפטי פרדהולם ויחסי גרעין ותמונה</summary>
  <div class="fold-body">
    <p><strong>ניסוח השאלה:</strong></p>
    <p>נתונה המטריצה הממשית: \\(A = \\begin{pmatrix} 1 & 1 & 2 \\\\ 2 & 2 & 4 \\end{pmatrix} \\in M_{2 \\times 3}(\\mathbb{R})\\).</p>
    <p>א. מצאו בסיס וממד לגרעין \\(\\ker(A)\\).</p>
    <p>ב. מצאו את המטריצה הצמודה \\(A^* = A^t\\), ומצאו בסיס וממד לתמונתה \\(\\text{Im}(A^*)\\).</p>
    <p>ג. הוכיחו ישירות את משפט פרדהולם: \\((\\ker A)^\\perp = \\text{Im}(A^*)\\).</p>

    <p><strong>פתרון מפורט:</strong></p>
    <p><strong>סעיף א — מציאת \\(\\ker(A)\\):</strong></p>
    <p>המשוואה היא \\(Ax = 0\\):</p>
    \\[ \\begin{pmatrix} 1 & 1 & 2 \\\\ 2 & 2 & 4 \\end{pmatrix} \\xrightarrow{R_2 \\leftarrow R_2 - 2R_1} \\begin{pmatrix} 1 & 1 & 2 \\\\ 0 & 0 & 0 \\end{pmatrix} \\]
    <p>המשוואה היחידה היא \\(x_1 + x_2 + 2x_3 = 0 \\implies x_1 = -x_2 - 2x_3\\).</p>
    <p>המשתנים החופשיים הם \\(x_2 = s\\), \\(x_3 = t\\). הווקטור הכללי:</p>
    \\[ \\begin{pmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{pmatrix} = \\begin{pmatrix} -s - 2t \\\\ s \\\\ t \\end{pmatrix} = s \\begin{pmatrix} -1 \\\\ 1 \\\\ 0 \\end{pmatrix} + t \\begin{pmatrix} -2 \\\\ 0 \\\\ 1 \\end{pmatrix} \\]
    <p>בסיס ל־\\(\\ker(A)\\) הוא: \\(B_{\\ker} = \\left\\{ \\begin{pmatrix} -1 \\\\ 1 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} -2 \\\\ 0 \\\\ 1 \\end{pmatrix} \\right\\}\\), וממדו \\(\\dim \\ker(A) = 2\\).</p>

    <p><strong>סעיף ב — מציאת \\(\\text{Im}(A^*)\\):</strong></p>
    \\[ A^* = A^t = \\begin{pmatrix} 1 & 2 \\\\ 1 & 2 \\\\ 2 & 4 \\end{pmatrix} \\]
    <p>עמודות \\(A^*\\) הן \\(\\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix}\\) ו־\\(\\begin{pmatrix} 2 \\\\ 2 \\\\ 4 \\end{pmatrix}\\). העמודה השנייה היא כפולה מדויקת של הראשונה (פי 2).</p>
    <p>לכן בסיס לתמונה \\(\\text{Im}(A^*)\\) הוא: \\(B_{\\text{Im}(A^*)} = \\left\\{ \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix} \\right\\}\\), וממדו \\(\\dim \\text{Im}(A^*) = 1\\).</p>

    <p><strong>סעיף ג — הוכחת השוויון \\((\\ker A)^\\perp = \\text{Im}(A^*)\\):</strong></p>
    <ol>
      <li>נבדוק האם הווקטור הפורש של \\(\\text{Im}(A^*)\\), \\(w = \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix}\\), מאונך לכל איברי הבסיס של \\(\\ker(A)\\):
        \\[ \\left\\langle \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix}, \\begin{pmatrix} -1 \\\\ 1 \\\\ 0 \\end{pmatrix} \\right\\rangle = 1(-1) + 1(1) + 2(0) = -1 + 1 + 0 = 0 \\]
        \\[ \\left\\langle \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix}, \\begin{pmatrix} -2 \\\\ 0 \\\\ 1 \\end{pmatrix} \\right\\rangle = 1(-2) + 1(0) + 2(1) = -2 + 0 + 2 = 0 \\]
        לכן \\(w \\in (\\ker A)^\\perp\\), ומכאן ש־\\(\\text{Im}(A^*) \\subseteq (\\ker A)^\\perp\\).
      </li>
      <li>נבדוק שוויון ממדים:
        מרחב המקור הוא \\(\\mathbb{R}^3\\), ולכן לפי משפט הפירוק האורתוגונלי:
        \\[ \\dim((\\ker A)^\\perp) = 3 - \\dim(\\ker A) = 3 - 2 = 1 \\]
        מאידך, מצאנו ש־\\(\\dim(\\text{Im}(A^*)) = 1\\).
      </li>
      <li>מכיוון ש־\\(\\text{Im}(A^*) \\subseteq (\\ker A)^\\perp\\) ושני המרחבים הם מאותו ממד (1), נובע בהכרח כי:
        \\[ (\\ker A)^\\perp = \\text{Im}(A^*) \\]
        והמשפט הוכח במלואו!
      </li>
    </ol>

    <div class="panel">
      <strong>מוקש נפוץ:</strong> בלבול בין \\((\\ker A)^\\perp\\) לבין \\(\\ker(A^*)\\). משפט פרדהולם קובע שהניצב של הגרעין הוא <em>התמונה</em> של הצמודה, בעוד שהניצב של התמונה הוא <em>הגרעין</em> של הצמודה: \\((\\text{Im } A)^\\perp = \\ker(A^*)\\).
    </div>

    <p><strong>בדקו את עצמכם:</strong> מהו \\(\\dim \\ker(A^*)\\) עבור המטריצה הנתונה?<br />
    <em>תשובה:</em> \\(\\dim \\ker(A^*) = \\dim(\\mathbb{R}^2) - \\dim(\\text{Im } A^*) = 2 - 1 = 1\\). ואכן \\(\\dim \\ker(A^*) = \\dim((\\text{Im } A)^\\perp) = 2 - 1 = 1\\).</p>
  </div>
</details>
`
});
