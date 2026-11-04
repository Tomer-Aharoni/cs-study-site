// edit-pass: 1 | unit: 1 | date: 2026-11-04
window.UNIT1 = {
  id: "1",
  title: "מרחבי מכפלה פנימית (Inner Product Spaces)",
  goals: [
    "להבין את הצורך הגיאומטרי במכפלה פנימית כמנגנון המגדיר אורך, זווית ומרחק במרחב וקטורי מופשט.",
    "לשלוט באקסיומות המכפלה הפנימית מעל שדה הממשיים (מרחב אוקלידי) ומעל שדה המרוכבים (מרחב אוניטרי).",
    "לחשב מכפלות פנימיות סטנדרטיות בווקטורים, מכפלת פרובניוס במטריצות ומכפלה פנימית באינטגרל של פונקציות רציפות.",
    "לאפיין כל מכפלה פנימית במרחב סוף־ממדי באמצעות מטריצה הרמיטית מוגדרת חיובית, ולדעת להוכיח קיום מכפלה פנימית עבורה בסיס נתון הוא אורתונורמלי (שליף ענבר).",
    "להגדיר נורמה ומרחק מושרים, להוכיח ולהפעיל את אי־שוויון קושי־שוורץ, אי־שוויון המשולש, שוויון המקבילית וזהות הקיטוב.",
    "לזהות וקטורים אורתוגונליים, להוכיח אי־תלות לינארית של קבוצה אורתוגונלית, ולהכיר את משפט פיתגורס הכללי.",
    "להשתמש בבסיס אורתונורמלי (בא\"נ) כדי לחשב וקטורי קואורדינטות ישירות באמצעות מקדמי פורייה וזהות פרסבל ללא פתרון מערכות משוואות.",
    "לחשב היטל אורתוגונלי של וקטור על תת־מרחב, למצוא את המרחק המינימלי לתת־מרחב, ולהשתמש במטריצת גרם.",
    "לפרק מרחב לסכום ישר עם המשלים האורתוגונלי שלו, ולהפעיל את אלגוריתם גרם־שמידט המלא למציאת בסיס אורתונורמלי צעד־אחר־צעד."
  ],
  sections: [
    {
      id: "l1-inner-product-def",
      title: "הגדרת מכפלה פנימית ואקסיומות (Inner Product Definition and Axioms)",
      html: `
        <p>במרחב וקטורי כללי מלינארית 1 יש לנו רק שתי פעולות: לחבר וקטורים ולכפול בסקלר. אין לנו שום מושג של <strong>אורך</strong> של וקטור, <strong>מרחק</strong> בין שני וקטורים, או <strong>זווית</strong> וניצבות (אורתוגונליות) ביניהם. מכפלה פנימית היא המנגנון המתמטי המופלא שמכניס את כל הגיאומטריה העשירה הזו לתוך האלגברה!</p>
        <p>מכפלה פנימית היא פונקציה שמקבלת שני וקטורים ומחזירה <strong>סקלר</strong> יחיד מהשדה (מספר ממשי או מרוכב), המסומן \\(\\langle u, v \\rangle\\).</p>
        <dl class="term-list">
          <dt>מרחב מכפלה פנימית (Inner Product Space / ממ\"פ)</dt>
          <dd>מרחב וקטורי \\(V\\) מעל שדה \\(\\mathbb{F}\\) (כאשר \\(\\mathbb{F} = \\mathbb{R}\\) או \\(\\mathbb{F} = \\mathbb{C}\\)), שעליו מוגדרת פונקציה \\(\\langle \\cdot, \\cdot \\rangle: V \\times V \\to \\mathbb{F}\\) המקיימת את ארבע האקסיומות הבאות לכל \\(u, v, w \\in V\\) ולכל \\(\\alpha \\in \\mathbb{F}\\):
            <ol>
              <li><strong>לינאריות ברכיב הראשון (Linearity in the First Argument):</strong>
                \\[ \\langle u + v, w \\rangle = \\langle u, w \\rangle + \\langle v, w \\rangle \\]
                \\[ \\langle \\alpha u, v \\rangle = \\alpha \\langle u, v \\rangle \\]
              </li>
              <li><strong>הרמיטיות / סימטריה מרוכבת (Conjugate Symmetry / Hermiticity):</strong>
                \\[ \\langle u, v \\rangle = \\overline{\\langle v, u \\rangle} \\]
                (מעל שדה הממשיים \\(\\mathbb{R}\\), הצמדה של מספר ממשי אינה משנה אותו, ולכן האקסיומה הופכת לסימטריה רגילה: \\(\\langle u, v \\rangle = \\langle v, u \\rangle\\)).
              </li>
              <li><strong>חיוביות מוגדרת (Positive-Definiteness):</strong>
                \\[ \\langle v, v \\rangle \\ge 0 \\quad \\text{לכל } v \\in V \\]
                וכן: \\(\\langle v, v \\rangle = 0 \\iff v = 0\\).
              </li>
            </ol>
          </dd>
          <dt>מרחב אוקלידי ומרחב אוניטרי (Euclidean Space & Unitary Space)</dt>
          <dd>
            <ul>
              <li><strong>מרחב אוקלידי (Euclidean Space):</strong> מרחב מכפלה פנימית מעל שדה הממשיים \\(\\mathbb{R}\\).</li>
              <li><strong>מרחב אוניטרי (Unitary Space):</strong> מרחב מכפלה פנימית מעל שדה המרוכבים \\(\\mathbb{C}\\).</li>
            </ul>
          </dd>
          <dt>אנטי־לינאריות ברכיב השני (Conjugate Linearity in the Second Argument)</dt>
          <dd>מה קורה כשמוציאים סקלר מהרכיב השני? נבדוק בעזרת תכונת ההרמיטיות:
            \\[ \\langle u, \\alpha v \\rangle = \\overline{\\langle \\alpha v, u \\rangle} = \\overline{\\alpha \\langle v, u \\rangle} = \\overline{\\alpha} \\cdot \\overline{\\langle v, u \\rangle} = \\overline{\\alpha} \\langle u, v \\rangle \\]
            <strong>כלל ברזל:</strong> סקלר מהרכיב הראשון יוצא כמות שהוא (\\(\\alpha\\)), אך סקלר מהרכיב השני יוצא עם <strong>צמוד מרוכב (\\(\\overline{\\alpha}\\))</strong>!
            (מעל \\(\\mathbb{R}\\), מכיוון ש־\\(\\overline{\\alpha} = \\alpha\\), המכפלה לינארית לחלוטין בשני הרכיבים – ולכן נקראת בילינארית).
          </dd>
        </dl>
        <div class="panel">
          <p><strong>שימו לב — מדוע \\(\\langle v, v \\rangle\\) הוא תמיד ממשי?</strong></p>
          <p>במרחב מרוכב, הערך של \\(\\langle u, v \\rangle\\) יכול להיות מספר מרוכב כללי עם חלק מדומה (למשל \\(2 + 3i\\)). אבל עבור אותו וקטור, לפי אקסיומת ההרמיטיות מתקיים:</p>
          \\[ \\langle v, v \\rangle = \\overline{\\langle v, v \\rangle} \\]
          <p>מספר השווה לצמוד של עצמו הוא בהכרח <strong>מספר ממשי טהור</strong>! לכן דרישת החיוביות \\(\\langle v, v \\rangle \\ge 0\\) מוגדרת היטב ובעלת משמעות מלאה גם מעל המרוכבים.</p>
        </div>
      `,
    },
    {
      id: "l1-standard-frobenius",
      title: "מכפלות פנימיות סטנדרטיות ומכפלת פרובניוס (Standard & Frobenius Inner Products)",
      html: `
        <p>כדי שנוכל לעבוד הלכה למעשה, נכיר את המכפלות הפנימיות השימושיות ביותר בעולם המתמטיקה ומדעי המחשב: ב־\\(\\mathbb{F}^n\\), במטריצות, ובמרחבי פונקציות.</p>
        <dl class="term-list">
          <dt>המכפלה הפנימית הסטנדרטית ב־\\(\\mathbb{C}^n\\) וב־\\(\\mathbb{R}^n\\)</dt>
          <dd>עבור שני וקטורי עמודה \\(x = (x_1, \\dots, x_n)^t\\) ו־\\(y = (y_1, \\dots, y_n)^t\\):
            <ul>
              <li>מעל \\(\\mathbb{C}^n\\):
                \\[ \\langle x, y \\rangle = \\sum_{i=1}^n x_i \\overline{y_i} = y^* x \\]
                (שימו לב: הצמדה מרוכבת על רכיבי הווקטור השני \\(y\\)).
              </li>
              <li>מעל \\(\\mathbb{R}^n\\):
                \\[ \\langle x, y \\rangle = \\sum_{i=1}^n x_i y_i = y^t x \\]
                זוהי המכפלה הסקלרית המוכרת מהתיכון (Dot Product).
              </li>
            </ul>
          </dd>
          <dt>מכפלת פרובניוס במטריצות (Frobenius Inner Product)</dt>
          <dd>במרחב המטריצות \\(M_{n \\times n}(\\mathbb{C})\\), המכפלה הפנימית הסטנדרטית מוגדרת באמצעות העקבה וההצמדה ההרמיטית:
            \\[ \\langle A, B \\rangle = \\text{tr}(B^* A) = \\sum_{i=1}^n \\sum_{j=1}^n A_{i,j} \\overline{B_{i,j}} \\]
            היא שקולה לחלוטין ל"יישור" המטריצות לווקטורים ארוכים באורך \\(n^2\\) וביצוע המכפלה הסטנדרטית!
            מעל הממשיים \\(M_{n \\times n}(\\mathbb{R})\\): \\(\\langle A, B \\rangle = \\text{tr}(B^t A) = \\sum_{i,j} A_{ij} B_{ij}\\).
          </dd>
          <dt>מכפלה פנימית במרחב הפונקציות הרציפות \\(C[a, b]\\)</dt>
          <dd>במרחב כל הפונקציות הרציפות בקטע \\([a, b]\\), המכפלה הפנימית מוגדרת באמצעות אינטגרל:
            \\[ \\langle f, g \\rangle = \\int_a^b f(x) \\overline{g(x)} \\, dx \\]
            אינטגרל זה מקיים את כל אקסיומות המכפלה הפנימית: הוא לינארי באינטגרציה, הרמיטי, וחיובי ממש (אם \\(f\\) רציפה ו־\\(\\int_a^b |f(x)|^2 dx = 0\\), אז בהכרח \\(f(x) = 0\\) לכל \\(x\\)).
          </dd>
        </dl>
        <div class="panel">
          <p><strong>דוגמה חישובית במכפלת פרובניוס:</strong></p>
          <p>נחשב את המכפלה הפנימית של המטריצות הממשיות הבאות ב־\\(M_{2 \\times 2}(\\mathbb{R})\\):</p>
          \\[ A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 3 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 2 & -1 \\\\ 4 & 1 \\end{pmatrix} \\]
          <p>דרך א' (לפי סכום מכפלות הרכיבים המקבילים):</p>
          \\[ \\langle A, B \\rangle = 1 \\cdot 2 + 2 \\cdot (-1) + 0 \\cdot 4 + 3 \\cdot 1 = 2 - 2 + 0 + 3 = 3 \\]
          <p>דרך ב' (לפי נוסחת העקבה \\(\\text{tr}(B^t A)\\)):</p>
          \\[ B^t = \\begin{pmatrix} 2 & 4 \\\\ -1 & 1 \\end{pmatrix} \\]
          \\[ B^t A = \\begin{pmatrix} 2 & 4 \\\\ -1 & 1 \\end{pmatrix} \\begin{pmatrix} 1 & 2 \\\\ 0 & 3 \\end{pmatrix} = \\begin{pmatrix} 2\\cdot 1 + 4\\cdot 0 & 2\\cdot 2 + 4\\cdot 3 \\\\ -1\\cdot 1 + 1\\cdot 0 & -1\\cdot 2 + 1\\cdot 3 \\end{pmatrix} = \\begin{pmatrix} 2 & 16 \\\\ -1 & 1 \\end{pmatrix} \\]
          \\[ \\text{tr}(B^t A) = 2 + 1 = 3 \\]
          <p>שתי הדרכים נותנות בדיוק את אותה תוצאה!</p>
        </div>
      `,
    },
    {
      id: "l1-hermitian-pos-mat",
      title: "אפיון מכפלה פנימית ע״י מטריצה חיובית (Hermitian Positive Matrices)",
      html: `
        <p>שאלה יסודית: האם כל מכפלה פנימית במרחב סוף־ממדי ניתנת לייצוג באמצעות מטריצה? התשובה היא כן מוחלט! קיים קשר חד־חד־ערכי בין מכפלות פנימיות לבין מטריצות הרמיטיות מוגדרות חיובית.</p>
        <dl class="term-list">
          <dt>מטריצה הרמיטית (Hermitian Matrix)</dt>
          <dd>מטריצה ריבועית \\(A \\in M_{n \\times n}(\\mathbb{C})\\) נקראת הרמיטית (צמודה לעצמה) אם היא שווה לצמודה ההרמיטית שלה:
            \\[ A^* = A \\quad (\\text{כלומר } A_{i,j} = \\overline{A_{j,i}}) \\]
            בפרט, כל איברי האלכסון הראשי של מטריצה הרמיטית הם מספרים ממשיים (כי \\(A_{i,i} = \\overline{A_{i,i}}\\)).
            מעל הממשיים, מטריצה הרמיטית היא פשוט מטריצה סימטרית: \\(A^t = A\\).
          </dd>
          <dt>מטריצה חיובית לחלוטין (Positive-Definite Matrix)</dt>
          <dd>מטריצה הרמיטית \\(A\\) נקראת <strong>חיובית לחלוטין</strong> אם לכל וקטור עמודה \\(x \\ne 0\\) מתקיים:
            \\[ x^* A x \\gt 0 \\]
            (ובממשיים: \\(x^t A x \\gt 0\\)).
          </dd>
          <dt>משפט הייצוג של מכפלה פנימית במטריצה (Matrix Representation of Inner Product)</dt>
          <dd>יהי \\(V\\) מרחב וקטורי עם בסיס סדור \\(B = (v_1, \\dots, v_n)\\).
            פונקציה \\(\\langle \\cdot, \\cdot \\rangle\\) היא מכפלה פנימית על \\(V\\) אם ורק אם קיימת מטריצה הרמיטית חיובית לחלוטין \\(G\\) כך שלכל \\(u, v \\in V\\):
            \\[ \\langle u, v \\rangle = [v]_B^* G [u]_B \\]
            איברי המטריצה נתונים על ידי: \\(G_{i,j} = \\langle v_j, v_i \\rangle\\).
          </dd>
        </dl>
        <div class="panel">
          <p><strong>תבנית בחינה קלאסית — שאלת "הוכח שקיימת מכפלה פנימית עבורה הקבוצה היא בסיס אורתונורמלי" (שליף ענבר #1):</strong></p>
          <p>שאלה שחוזרת במבחנים רבים: <em>"תהי \\(B = \\{v_1, \\dots, v_n\\}\\) קבוצת וקטורים במרחב \\(V\\). הוכח שקיימת מכפלה פנימית על \\(V\\) שביחס אליה \\(B\\) הוא בסיס אורתונורמלי."</em></p>
          <p><strong>אלגוריתם הפתרון בן 4 השלבים:</strong></p>
          <ol>
            <li><strong>שלב 1: הוכחה ש־\\(B\\) הוא בסיס.</strong> נוכיח שהווקטורים בת\"ל ומספרם שווה ל־\\(\\dim V\\), או שהם פורשים.</li>
            <li><strong>שלב 2: הגדרת המכפלה הפנימית.</strong> נגדיר את המכפלה הפנימית בין שני וקטורים \\(u, w \\in V\\) כמכפלה הסטנדרטית של וקטורי הקואורדינטות שלהם לפי הבסיס \\(B\\):
              \\[ \\langle u, w \\rangle = [w]_B^* [u]_B = \\sum_{i=1}^n \\alpha_i \\overline{\\beta_i} \\]
              כאשר \\([u]_B = (\\alpha_1, \\dots, \\alpha_n)^t\\) ו־\\([w]_B = (\\beta_1, \\dots, \\beta_n)^t\\).
            </li>
            <li><strong>שלב 3: אימות תכונות מכפלה פנימית.</strong> המכפלה שהגדרנו היא המכפלה הסטנדרטית על \\(\\mathbb{F}^n\\) מורכבת עם איזומורפיזם הקואורדינטות, ולכן מקיימת אוטומטית לינאריות ברכיב ראשון, הרמיטיות, וחיוביות מוגדרת (\\(\\sum |\\alpha_i|^2 \\ge 0\\) ושוויון לאפס רק כשכל המקדמים אפס, כלומר \\(u=0\\)).</li>
            <li><strong>שלב 4: הוכחת אורתונורמליות של \\(B\\).</strong> עבור כל שני איברים \\(v_i, v_j \\in B\\), וקטור הקואורדינטות של \\(v_i\\) לפי \\(B\\) הוא וקטור היחידה הסטנדרטי \\(e_i\\) (שיש בו 1 במקום ה־\\(i\\) ו־0 בכל מקום אחר). לכן:
              \\[ \\langle v_i, v_j \\rangle = [v_j]_B^* [v_i]_B = e_j^* e_i = \\begin{cases} 1 & i = j \\\\ 0 & i \\ne j \\end{cases} = \\delta_{ij} \\]
              משמע הקבוצה \\(B\\) היא אכן בסיס אורתונורמלי ביחס למכפלה שהגדרנו!
            </li>
          </ol>
        </div>
      `,
    },
    {
      id: "l1-norm-dist-cauchy",
      title: "נורמה, מרחק ואי־שוויון קושי־שוורץ (Norm, Distance, Cauchy-Schwarz)",
      html: `
        <p>ברגע שיש לנו מכפלה פנימית, מושגי האורך והמרחק נובעים ממנה באופן טבעי ומיידי. הנורמה מודדת את "גודלו" של וקטור, והמרחק מודד את ההפרש בין שני וקטורים.</p>
        <dl class="term-list">
          <dt>נורמה מושרת (Induced Norm)</dt>
          <dd>הנורמה של וקטור \\(v \\in V\\) מוגדרת כשורש הריבועי החיובי של המכפלה הפנימית שלו עם עצמו:
            \\[ \\|v\\| = \\sqrt{\\langle v, v \\rangle} \\]
            (ולכן \\(\\|v\\|^2 = \\langle v, v \\rangle\\)).
            תכונות יסוד של נורמה:
            <ul>
              <li>\\(\\|v\\| \\ge 0\\), ו־\\(\\|v\\| = 0 \\iff v = 0\\).</li>
              <li>כפל בסקלר: \\(\\|\\alpha v\\| = |\\alpha| \\cdot \\|v\\|\\) (הסקלר יוצא בערך מוחלט!).</li>
            </ul>
          </dd>
          <dt>וקטור יחידה ונרמול (Unit Vector and Normalization)</dt>
          <dd>וקטור \\(u\\) נקרא <strong>וקטור יחידה</strong> אם הנורמה שלו היא 1, כלומר \\(\\|u\\| = 1\\).
            לכל וקטור \\(v \\ne 0\\), הווקטור \\(\\widehat{v} = \\frac{v}{\\|v\\|}\\) הוא וקטור יחידה באותו כיוון של \\(v\\). פעולה זו נקראת <strong>נרמול הווקטור</strong>.
          </dd>
          <dt>מרחק מושרה (Induced Metric / Distance)</dt>
          <dd>המרחק בין שני וקטורים \\(u, v \\in V\\) מוגדר כאורך וקטור ההפרש ביניהם:
            \\[ d(u, v) = \\|u - v\\| = \\sqrt{\\langle u - v, u - v \\rangle} \\]
          </dd>
          <dt>אי־שוויון קושי־שוורץ (Cauchy-Schwarz Inequality)</dt>
          <dd>לכל שני וקטורים \\(u, v\\) במרחב מכפלה פנימית מתקיים:
            \\[ |\\langle u, v \\rangle| \\le \\|u\\| \\cdot \\|v\\| \\]
            <strong>תנאי השוויון:</strong> שוויון \\(|\\langle u, v \\rangle| = \\|u\\| \\cdot \\|v\\|\\) מתקיים אם ורק אם הווקטורים \\(u\\) ו־\\(v\\) <strong>תלויים לינארית</strong> (כלומר אחד מהם הוא כפולה בסקלר של השני).
          </dd>
          <dt>אי־שוויון המשולש (Triangle Inequality)</dt>
          <dd>לכל שני וקטורים \\(u, v \\in V\\):
            \\[ \\|u + v\\| \\le \\|u\\| + \\|v\\| \\]
            משמעות גיאומטרית: אורך צלע אחת במשולש לעולם אינו עולה על סכום אורכי שתי הצלעות האחרות.
          </dd>
          <dt>שוויון המקבילית (Parallelogram Law)</dt>
          <dd>לכל \\(u, v \\in V\\):
            \\[ \\|u + v\\|^2 + \\|u - v\\|^2 = 2\\|u\\|^2 + 2\\|v\\|^2 \\]
            משמעות גיאומטרית: במקבילית, סכום ריבועי אורכי שני האלכסונים שווה לסכום ריבועי אורכי ארבע הצלעות.
          </dd>
          <dt>זהות הקיטוב (Polarization Identity)</dt>
          <dd>הקשר המאפשר לשחזר את המכפלה הפנימית מתוך הנורמה בלבד:
            <ul>
              <li>במרחב ממשי (אוקלידי):
                \\[ \\langle u, v \\rangle = \\frac{1}{4} \\left( \\|u + v\\|^2 - \\|u - v\\|^2 \\right) \\]
              </li>
              <li>במרחב מרוכב (אוניטרי):
                \\[ \\langle u, v \\rangle = \\frac{1}{4} \\left( \\|u + v\\|^2 - \\|u - v\\|^2 + i \\|u + iv\\|^2 - i \\|u - iv\\|^2 \\right) \\]
              </li>
            </ul>
          </dd>
        </dl>
        <div class="panel">
          <p><strong>הוכחת אי־שוויון קושי־שוורץ (שלב אחר שלב):</strong></p>
          <p>אם \\(v = 0\\), אז \\(\\langle u, 0 \\rangle = 0\\) ו־\\(\\|0\\| = 0\\), ומתקיים שוויון \\(0 \\le 0\\). לכן נניח \\(v \\ne 0\\).</p>
          <ol>
            <li>נבחר סקלר חכם \\(\\lambda = \\frac{\\langle u, v \\rangle}{\\|v\\|^2}\\).</li>
            <li>נתבונן בווקטור \\(w = u - \\lambda v\\). לפי אקסיומת החיוביות, הנורמה הריבועית שלו אי־שלילית:
              \\[ 0 \\le \\|w\\|^2 = \\langle u - \\lambda v, u - \\lambda v \\rangle \\]
            </li>
            <li>נפתח את המכפלה לפי לינאריות:
              \\[ \\langle u - \\lambda v, u - \\lambda v \\rangle = \\langle u, u \\rangle - \\lambda \\langle v, u \\rangle - \\overline{\\lambda} \\langle u, v \\rangle + |\\lambda|^2 \\langle v, v \\rangle \\]
            </li>
            <li>נציב את \\(\\lambda\\) שבחרנו, ונזכור כי \\(\\langle v, u \\rangle = \\overline{\\langle u, v \\rangle}\\) ו־\\(\\langle v, v \\rangle = \\|v\\|^2\\):
              \\[ = \\|u\\|^2 - \\frac{\\langle u, v \\rangle}{\\|v\\|^2} \\overline{\\langle u, v \\rangle} - \\frac{\\overline{\\langle u, v \\rangle}}{\\|v\\|^2} \\langle u, v \\rangle + \\frac{|\\langle u, v \\rangle|^2}{\\|v\\|^4} \\|v\\|^2 \\]
            </li>
            <li>מכיוון ש־\\(z \\overline{z} = |z|^2\\), הביטוי מצטמצם להפליא:
              \\[ = \\|u\\|^2 - \\frac{|\\langle u, v \\rangle|^2}{\\|v\\|^2} - \\frac{|\\langle u, v \\rangle|^2}{\\|v\\|^2} + \\frac{|\\langle u, v \\rangle|^2}{\\|v\\|^2} = \\|u\\|^2 - \\frac{|\\langle u, v \\rangle|^2}{\\|v\\|^2} \\]
            </li>
            <li>קיבלנו: \\(0 \\le \\|u\\|^2 - \\frac{|\\langle u, v \\rangle|^2}{\\|v\\|^2}\\). נכפול ב־\\(\\|v\\|^2 \\gt 0\\) ונעביר אגף:
              \\[ |\\langle u, v \\rangle|^2 \\le \\|u\\|^2 \\|v\\|^2 \\]
              נוציא שורש חיובי משני האגפים ונקבל את אי־שוויון קושי־שוורץ:
              \\[ |\\langle u, v \\rangle| \\le \\|u\\| \\cdot \\|v\\| \\]
            </li>
          </ol>
        </div>
        <div class="linear-lab" data-linear-lab="lab-inner-product"></div>
      `,
    },
    {
      id: "l1-orthogonality-pythagoras",
      title: "אורתוגונליות ומשפט פיתגורס (Orthogonality and Pythagorean Theorem)",
      html: `
        <p>בגיאומטריה קלאסית, שני ישרים הם ניצבים אם הזווית ביניהם היא 90 מעלות, ומכיוון ש־\\(\\cos(90^\\circ) = 0\\), המכפלה הסקלרית שלהם מתאפסת. במרחב מכפלה פנימית מופשט, אנו <em>מגדירים</em> ניצבות ישירות דרך התאפסות המכפלה הפנימית!</p>
        <dl class="term-list">
          <dt>וקטורים אורתוגונליים (Orthogonal Vectors)</dt>
          <dd>שני וקטורים \\(u, v \\in V\\) נקראים <strong>אורתוגונליים</strong> (או מאונכים, מסומן \\(u \\perp v\\)) אם המכפלה הפנימית שלהם היא אפס:
            \\[ \\langle u, v \\rangle = 0 \\]
            שימו לב: מכיוון ש־\\(\\langle u, v \\rangle = \\overline{\\langle v, u \\rangle}\\), אם \\(\\langle u, v \\rangle = 0\\) אז גם \\(\\langle v, u \\rangle = 0\\), ולכן ניצבות היא יחס סימטרי.
            וקטור האפס מאונך לכל וקטור במרחב: \\(\\langle 0, v \\rangle = 0\\) לכל \\(v\\).
          </dd>
          <dt>משפט פיתגורס (Pythagorean Theorem in Inner Product Spaces)</dt>
          <dd>אם \\(u \\perp v\\) (כלומר \\(\\langle u, v \\rangle = 0\\)), אז:
            \\[ \\|u + v\\|^2 = \\|u\\|^2 + \\|v\\|^2 \\]
            הוכחה פשוטה:
            \\[ \\|u + v\\|^2 = \\langle u + v, u + v \\rangle = \\|u\\|^2 + \\langle u, v \\rangle + \\langle v, u \\rangle + \\|v\\|^2 = \\|u\\|^2 + 0 + 0 + \\|v\\|^2 = \\|u\\|^2 + \\|v\\|^2 \\]
            המשפט מתרחב לכל קבוצה של \\(k\\) וקטורים אורתוגונליים בזוגות:
            \\[ \\left\\| \\sum_{i=1}^k v_i \\right\\|^2 = \\sum_{i=1}^k \\|v_i\\|^2 \\]
          </dd>
          <dt>משפט: קבוצה אורתוגונלית היא בלתי תלויה לינארית</dt>
          <dd>תהי \\(S = \\{v_1, \\dots, v_k\\}\\) קבוצה של וקטורים שכולם שונים מאפס (\\(v_i \\ne 0\\)), שהם אורתוגונליים בזוגות (\\(\\langle v_i, v_j \\rangle = 0\\) לכל \\(i \\ne j\\)).
            אזי הקבוצה \\(S\\) היא <strong>בלתי תלויה לינארית (בת\"ל)</strong>!
            <p><strong>הוכחה בארבע שורות:</strong> נניח שקיים צירוף לינארי שמתאפס: \\(\\sum_{j=1}^k \\alpha_j v_j = 0\\).
            נכפול פנימית את שני האגפים בווקטור מסוים \\(v_i\\):
            \\[ 0 = \\langle 0, v_i \\rangle = \\left\\langle \\sum_{j=1}^k \\alpha_j v_j, v_i \\right\\rangle = \\sum_{j=1}^k \\alpha_j \\langle v_j, v_i \\rangle \\]
            בגלל האורתוגונליות, כל האיברים בסכום שבהם \\(j \\ne i\\) מתאפסים לחלוטין! נשאר רק האיבר שבו \\(j = i\\):
            \\[ 0 = \\alpha_i \\langle v_i, v_i \\rangle = \\alpha_i \\|v_i\\|^2 \\]
            מכיוון ש־\\(v_i \\ne 0\\), מתקיים \\(\\|v_i\\|^2 \\gt 0\\). לכן בהכרח \\(\\alpha_i = 0\\).
            טענה זו נכונה לכל \\(i\\), ולכן כל המקדמים מתאפסים — הקבוצה בת\"ל!</p>
          </dd>
          <dt>קבוצה אורתונורמלית (Orthonormal Set)</dt>
          <dd>קבוצה \\(\\{e_1, \\dots, e_k\\}\\) נקראת <strong>אורתונורמלית</strong> אם כל הווקטורים בה מאונכים זה לזה וכולם באורך 1:
            \\[ \\langle e_i, e_j \\rangle = \\delta_{ij} = \\begin{cases} 1 & i = j \\\\ 0 & i \\ne j \\end{cases} \\]
            הסמל \\(\\delta_{ij}\\) נקרא <strong>הדלתא של קרונקר (Kronecker Delta)</strong>.
          </dd>
        </dl>
      `,
    },
    {
      id: "l1-onb-fourier-parseval",
      title: "בסיס אורתונורמלי, מקדמי פורייה וזהות פרסבל (ONB, Fourier, Parseval)",
      html: `
        <p>בסיס רגיל מאפשר לייצג כל וקטור, אך מציאת המקדמים דורשת פתרון מייגע של מערכת משוואות לינאריות. לעומת זאת, <strong>בסיס אורתונורמלי (בא\"נ)</strong> הוא הפסגה של אלגברה לינארית: הוא מאפשר למצוא את הקואורדינטות של כל וקטור מיד, בלחיצת כפתור אחת, באמצעות מכפלה פנימית בלבד!</p>
        <dl class="term-list">
          <dt>בסיס אורתונורמלי (Orthonormal Basis / בא\"נ)</dt>
          <dd>בסיס של מרחב מכפלה פנימית שהוא קבוצה אורתונורמלית.
            כל מרחב מכפלה פנימית ממימד סופי מכיל בסיס אורתונורמלי.
          </dd>
          <dt>מקדמי פורייה (Fourier Coefficients)</dt>
          <dd>יהי \\(B = (e_1, \\dots, e_n)\\) בסיס אורתונורמלי של \\(V\\). לכל וקטור \\(v \\in V\\), הפירוק לפי הבסיס נתון במפורש על ידי:
            \\[ v = \\sum_{i=1}^n \\langle v, e_i \\rangle e_i = \\langle v, e_1 \\rangle e_1 + \\langle v, e_2 \\rangle e_2 + \\dots + \\langle v, e_n \\rangle e_n \\]
            המקדמים \\(\\alpha_i = \\langle v, e_i \\rangle\\) נקראים <strong>מקדמי פורייה</strong> של הווקטור \\(v\\) ביחס לבסיס האורתונורמלי.
            וקטור הקואורדינטות הוא בפשטות:
            \\[ [v]_B = \\begin{pmatrix} \\langle v, e_1 \\rangle \\\\ \\langle v, e_2 \\rangle \\\\ \\vdots \\\\ \\langle v, e_n \\rangle \\end{pmatrix} \\]
          </dd>
          <dt>נוסחת המכפלה הפנימית וזהות פרסבל (Parseval's Identity)</dt>
          <dd>אם \\(B = (e_1, \\dots, e_n)\\) הוא בא\"נ, אז לכל שני וקטורים \\(u, w \\in V\\):
            \\[ \\langle u, w \\rangle = \\sum_{i=1}^n \\langle u, e_i \\rangle \\overline{\\langle w, e_i \\rangle} \\]
            ובפרט עבור נורמת הווקטור \\(u\\) (<strong>זהות פרסבל</strong>):
            \\[ \\|u\\|^2 = \\sum_{i=1}^n |\\langle u, e_i \\rangle|^2 = |\\langle u, e_1 \\rangle|^2 + |\\langle u, e_2 \\rangle|^2 + \\dots + |\\langle u, e_n \\rangle|^2 \\]
            משמעות: ריבוע אורך הווקטור שווה בדיוק לסכום ריבועי מקדמי פורייה שלו!
          </dd>
          <dt>אי־שוויון בסל (Bessel's Inequality)</dt>
          <dd>אם \\(\\{e_1, \\dots, e_k\\}\\) היא קבוצה אורתונורמלית כלשהי (לא בהכרח בסיס של כל המרחב, אלא אולי רק של תת־מרחב \\(k \\lt n\\)), אז לכל \\(v \\in V\\):
            \\[ \\sum_{i=1}^k |\\langle v, e_i \\rangle|^2 \\le \\|v\\|^2 \\]
            ושוויון מתקיים אם ורק אם \\(v \\in \\text{Sp}\\{e_1, \\dots, e_k\\}\\).
          </dd>
        </dl>
      `,
    },
    {
      id: "l1-ortho-projection-gram",
      title: "היטל אורתוגונלי ומטריצת גרם (Orthogonal Projection & Gram Matrix)",
      html: `
        <p>נניח שיש לנו מישור דו־ממדי \\(W\\) במרחב התלת־ממדי ונקודה שמרחפת מעליו. מהי הנקודה במישור שהכי קרובה אליה? התשובה הגיאומטרית היא: נפיל אנך מהנקודה אל המישור! נקודת הפגיעה היא <strong>ההיטל האורתוגונלי</strong>. כלי זה עומד בבסיס שיטת הריבועים הפחותים בלמידת מכונה ובעיבוד אותות.</p>
        <dl class="term-list">
          <dt>היטל אורתוגונלי על תת־מרחב (Orthogonal Projection)</dt>
          <dd>יהי \\(W\\) תת־מרחב של מרחב מכפלה פנימית \\(V\\), ויהי \\(\\{e_1, \\dots, e_k\\}\\) בסיס אורתונורמלי של \\(W\\).
            ההיטל האורתוגונלי של וקטור \\(v \\in V\\) על \\(W\\), המסומן \\(P_W(v)\\) או \\(\\pi_W(v)\\), נתון על ידי:
            \\[ P_W(v) = \\sum_{i=1}^k \\langle v, e_i \\rangle e_i \\]
            וקטור השארית \\(v - P_W(v)\\) מאונך לכל וקטור ב־\\(W\\), כלומר \\(v - P_W(v) \\in W^\\perp\\).
          </dd>
          <dt>משפט הקירוב המיטבי (Best Approximation Theorem)</dt>
          <dd>ההיטל האורתוגונלי \\(P_W(v)\\) הוא הווקטור הייחודי ב־\\(W\\) שהוא הקרוב ביותר ל־\\(v\\):
            \\[ \\|v - P_W(v)\\| = \\min_{w \\in W} \\|v - w\\| \\]
            המרחק של הווקטור \\(v\\) מתת־המרחב \\(W\\) מוגדר בדיוק כאורך וקטור השארית:
            \\[ d(v, W) = \\|v - P_W(v)\\| \\]
          </dd>
          <dt>מטריצת גרם (Gram Matrix / Gramian)</dt>
          <dd>עבור קבוצת וקטורים כלשהי \\(S = \\{v_1, \\dots, v_k\\}\\) (לא בהכרח אורתונורמלית!), מטריצת גרם \\(G = G(v_1, \\dots, v_k)\\) היא מטריצה מגודל \\(k \\times k\\) שאיבריה הם המכפלות הפנימיות:
            \\[ G_{i,j} = \\langle v_j, v_i \\rangle \\]
            תכונות יסוד של מטריצת גרם:
            <ul>
              <li>\\(G\\) היא תמיד הרמיטית וחיובית למחצה: \\(\\det(G) \\ge 0\\).</li>
              <li><strong>קריטריון אי־תלות לינארית:</strong> הווקטורים \\(v_1, \\dots, v_k\\) הם <strong>בלתי תלויים לינארית</strong> אם ורק אם הדטרמיננטה של גרם שונה מאפס:
                \\[ \\det G(v_1, \\dots, v_k) \\gt 0 \\]
              </li>
            </ul>
          </dd>
        </dl>
      `,
    },
    {
      id: "l1-ortho-complement-decomp",
      title: "המשלים האורתוגונלי ומשפט הפירוק (Orthogonal Complement and Decomposition)",
      html: `
        <p>אם ניקח תת־מרחב \\(W\\), ונאסוף את כל הווקטורים במרחב שמאונכים לו בו־זמנית, נקבל תת־מרחב חדש ומרתק הנקרא <strong>המשלים האורתוגונלי</strong>. יחד, שני המרחבים הללו מפרקים את המרחב כולו בצורה המושלמת ביותר האפשרית.</p>
        <dl class="term-list">
          <dt>המשלים האורתוגונלי (Orthogonal Complement)</dt>
          <dd>עבור תת־קבוצה \\(S \\subseteq V\\), המשלים האורתוגונלי מסומן \\(S^\\perp\\) (נקרא "S ניצב" או "S פרפ") ומוגדר כ:
            \\[ S^\\perp = \\{v \\in V \\mid \\langle v, s \\rangle = 0 \\text{ for all } s \\in S\\} \\]
            \\(S^\\perp\\) הוא תמיד <strong>תת־מרחב</strong> של \\(V\\), גם אם \\(S\\) המקורית אינה תת־מרחב!
          </dd>
          <dt>משפט הפירוק האורתוגונלי (Orthogonal Decomposition Theorem)</dt>
          <dd>אם \\(W\\) הוא תת־מרחב ממימד סופי של מרחב מכפלה פנימית \\(V\\), אז המרחב כולו מתפרק לסכום ישר של \\(W\\) והמשלים האורתוגונלי שלו:
            \\[ V = W \\oplus W^\\perp \\]
            פירוש הדבר:
            <ol>
              <li>כל וקטור \\(v \\in V\\) נרשם באופן יחיד כסכום:
                \\[ v = w + w^\\perp, \\quad \\text{כאשר } w = P_W(v) \\in W \\text{ ו־} w^\\perp = v - P_W(v) \\in W^\\perp \\]
              </li>
              <li>החיתוך מכיל את אפס בלבד: \\(W \\cap W^\\perp = \\{0\\}\\).</li>
              <li>סכום הממדים שווה לממד המרחב כולו:
                \\[ \\dim(W) + \\dim(W^\\perp) = \\dim(V) \\iff \\dim(W^\\perp) = \\dim(V) - \\dim(W) \\]
              </li>
            </ol>
          </dd>
          <dt>תכונות מרכזיות של המשלים האורתוגונלי</dt>
          <dd>
            <ul>
              <li><strong>ניצב כפול:</strong> במרחב ממימד סופי, \\((W^\\perp)^\\perp = W\\).</li>
              <li><strong>היפוך הכלה:</strong> אם \\(U \\subseteq W\\), אז \\(W^\\perp \\subseteq U^\\perp\\).</li>
              <li><strong>חוקי דה־מורגן לאורתוגונליות:</strong>
                \\[ (U + W)^\\perp = U^\\perp \\cap W^\\perp \\]
                \\[ (U \\cap W)^\\perp = U^\\perp + W^\\perp \\]
              </li>
            </ul>
          </dd>
        </dl>
      `,
    },
    {
      id: "l1-gram-schmidt",
      title: "תהליך גרם־שמידט המלא (Gram-Schmidt Orthogonalization Process)",
      html: `
        <p>כיצד מייצרים בסיס אורתונורמלי מבסיס שרירותי כלשהו שקיבלנו? <strong>תהליך גרם־שמידט</strong> הוא האלגוריתם המרכזי העושה זאת. הרעיון הגיאומטרי פשוט: משאירים את הווקטור הראשון, ומכל וקטור הבא בתור מחסירים את ההיטל שלו על המרחב שנפרש על ידי הווקטורים הקודמים. מה שנשאר הוא בהכרח מאונך לכולם!</p>
        <dl class="term-list">
          <dt>אלגוריתם גרם־שמידט (Gram-Schmidt Algorithm)</dt>
          <dd>יהי \\((v_1, v_2, \\dots, v_k)\\) בסיס של תת־מרחב. אנו בונים בסיס אורתוגונלי \\((u_1, u_2, \\dots, u_k)\\) לפי הנוסחאות:
            \\[ u_1 = v_1 \\]
            \\[ u_2 = v_2 - \\frac{\\langle v_2, u_1 \\rangle}{\\|u_1\\|^2} u_1 \\]
            \\[ u_3 = v_3 - \\frac{\\langle v_3, u_1 \\rangle}{\\|u_1\\|^2} u_1 - \\frac{\\langle v_3, u_2 \\rangle}{\\|u_2\\|^2} u_2 \\]
            ובאופן כללי עבור השלב ה־\\(m\\):
            \\[ u_m = v_m - \\sum_{j=1}^{m-1} \\frac{\\langle v_m, u_j \\rangle}{\\|u_j\\|^2} u_j \\]
            <strong>שלב הנרמול (לקבלת בא\"נ):</strong> מחלקים כל וקטור בנורמה שלו:
            \\[ e_i = \\frac{u_i}{\\|u_i\\|} \\quad (i = 1, \\dots, k) \\]
          </dd>
        </dl>
        <div class="panel">
          <p><strong>דוגמה חישובית מלאה ומפורטת (גרם־שמידט ב־\\(\\mathbb{R}^3\\) ללא דילוג על שברים):</strong></p>
          <p>נתון הבסיס הבא של \\(\\mathbb{R}^3\\) (ביחס למכפלה הפנימית הסטנדרטית):</p>
          \\[ v_1 = \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}, \\quad v_2 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix}, \\quad v_3 = \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix} \\]
          <p><strong>שלב 1: מציאת \\(u_1\\):</strong></p>
          \\[ u_1 = v_1 = \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix} \\]
          \\[ \\|u_1\\|^2 = \\langle u_1, u_1 \\rangle = 1^2 + 1^2 + 0^2 = 2 \\]

          <p><strong>שלב 2: מציאת \\(u_2\\):</strong></p>
          <p>נחשב את המכפלה הפנימית \\(\\langle v_2, u_1 \\rangle\\):</p>
          \\[ \\langle v_2, u_1 \\rangle = 1 \\cdot 1 + 0 \\cdot 1 + 2 \\cdot 0 = 1 \\]
          <p>נחסיר את ההיטל:</p>
          \\[ u_2 = v_2 - \\frac{\\langle v_2, u_1 \\rangle}{\\|u_1\\|^2} u_1 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix} - \\frac{1}{2} \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 1 - \\frac{1}{2} \\\\ 0 - \\frac{1}{2} \\\\ 2 - 0 \\end{pmatrix} = \\begin{pmatrix} 1/2 \\\\ -1/2 \\\\ 2 \\end{pmatrix} \\]
          <p>נבדוק אורתוגונליות: \\(\\langle u_2, u_1 \\rangle = \\frac{1}{2}\\cdot 1 + (-\\frac{1}{2})\\cdot 1 + 2\\cdot 0 = 0\\). מדויק!</p>
          <p>נחשב את נורמת \\(u_2\\):</p>
          \\[ \\|u_2\\|^2 = \\left(\\frac{1}{2}\\right)^2 + \\left(-\\frac{1}{2}\\right)^2 + 2^2 = \\frac{1}{4} + \\frac{1}{4} + 4 = \\frac{2}{4} + 4 = \\frac{1}{2} + 4 = \\frac{9}{2} \\]

          <p><strong>שלב 3: מציאת \\(u_3\\):</strong></p>
          <p>נחשב את שתי המכפלות הפנימיות:</p>
          \\[ \\langle v_3, u_1 \\rangle = 0 \\cdot 1 + 1 \\cdot 1 + 1 \\cdot 0 = 1 \\]
          \\[ \\langle v_3, u_2 \\rangle = 0 \\cdot \\frac{1}{2} + 1 \\cdot \\left(-\\frac{1}{2}\\right) + 1 \\cdot 2 = -\\frac{1}{2} + 2 = \\frac{3}{2} \\]
          <p>נחשב את מקדמי ההיטל:</p>
          \\[ \\frac{\\langle v_3, u_1 \\rangle}{\\|u_1\\|^2} = \\frac{1}{2} \\]
          \\[ \\frac{\\langle v_3, u_2 \\rangle}{\\|u_2\\|^2} = \\frac{3/2}{9/2} = \\frac{3}{9} = \\frac{1}{3} \\]
          <p>נחסיר את שני ההיטלים מ־\\(v_3\\):</p>
          \\[ u_3 = v_3 - \\frac{1}{2} u_1 - \\frac{1}{3} u_2 = \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix} - \\frac{1}{2} \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix} - \\frac{1}{3} \\begin{pmatrix} 1/2 \\\\ -1/2 \\\\ 2 \\end{pmatrix} \\]
          <p>נחשב כל רכיב בנפרד:</p>
          <ul>
            <li>רכיב ראשון: \\(0 - \\frac{1}{2} - \\frac{1}{6} = -\\frac{3}{6} - \\frac{1}{6} = -\\frac{4}{6} = -\\frac{2}{3}\\).</li>
            <li>רכיב שני: \\(1 - \\frac{1}{2} - \\left(-\\frac{1}{6}\\right) = \\frac{1}{2} + \\frac{1}{6} = \\frac{3}{6} + \\frac{1}{6} = \\frac{4}{6} = \\frac{2}{3}\\).</li>
            <li>רכיב שלישי: \\(1 - 0 - \\frac{2}{3} = \\frac{1}{3}\\).</li>
          </ul>
          \\[ u_3 = \\begin{pmatrix} -2/3 \\\\ 2/3 \\\\ 1/3 \\end{pmatrix} \\]
          <p>בדיקת אורתוגונליות של \\(u_3\\):</p>
          \\[ \\langle u_3, u_1 \\rangle = -\\frac{2}{3}\\cdot 1 + \\frac{2}{3}\\cdot 1 + \\frac{1}{3}\\cdot 0 = 0 \\]
          \\[ \\langle u_3, u_2 \\rangle = -\\frac{2}{3}\\cdot \\frac{1}{2} + \\frac{2}{3}\\cdot \\left(-\\frac{1}{2}\\right) + \\frac{1}{3}\\cdot 2 = -\\frac{1}{3} - \\frac{1}{3} + \\frac{2}{3} = 0 \\]
          <p>הווקטור \\(u_3\\) מאונך לשניהם באופן מושלם!</p>
          <p><strong>שלב 4: נרמול הווקטורים לקבלת בא\"נ:</strong></p>
          <ul>
            <li>\\(\\|u_1\\| = \\sqrt{2} \\implies e_1 = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}\\).</li>
            <li>\\(\\|u_2\\| = \\sqrt{9/2} = \\frac{3}{\\sqrt{2}} \\implies e_2 = \\frac{\\sqrt{2}}{3} \\begin{pmatrix} 1/2 \\\\ -1/2 \\\\ 2 \\end{pmatrix} = \\frac{1}{3\\sqrt{2}} \\begin{pmatrix} 1 \\\\ -1 \\\\ 4 \\end{pmatrix}\\).</li>
            <li>\\(\\|u_3\\|^2 = (-2/3)^2 + (2/3)^2 + (1/3)^2 = \\frac{4+4+1}{9} = 1 \\implies e_3 = u_3 = \\begin{pmatrix} -2/3 \\\\ 2/3 \\\\ 1/3 \\end{pmatrix}\\).</li>
          </ul>
          <p>הקבוצה \\(\\{e_1, e_2, e_3\\}\\) היא בסיס אורתונורמלי של \\(\\mathbb{R}^3\\)!</p>
        </div>
        <div class="linear-lab" data-linear-lab="lab-gram-schmidt"></div>
      `,
    },
  ],
};
