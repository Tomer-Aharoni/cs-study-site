# כללי עבודה עם ביטויים ונוסחאות מתמטיות (Math Expressions & RTL Rules)

מסמך זה מהווה כלל מחייב (Rule) לכל סוכן או מפתח העוסק ביצירה, עריכה או תחזוקה של תוכן מתמטי, קורסי מדעי המחשב ומתמטיקה באתר (`cs-study-site`).

---

## 1. חובת תחימה ב-KaTeX (איסור מוחלט על מתמטיקה בטקסט חופשי)
* **אף ביטוי מתמטי אינו נכתב בטקסט רגיל**: משתנים, משוואות, שמות מרחבים, אי-שוויונות וסימונים אלגבריים חייבים להיות עטופים במפרידי KaTeX:
  * מתמטיקה בשורת הטקסט (Inline): `\( ... \)`
  * משוואות מוצגות נפרדות (Display): `\[ ... \]`
* **מדוע זה קריטי?**
  * הדפים באתר רצים תחת כיווניות עברית (`dir="rtl"`).
  * כאשר כותבים ביטויים כמו `dim(U+W) = dim U + dim W - dim(U∩W)`, `A = B`, `T: V -> W`, או `AB - BA = I` בטקסט רגיל, אלגוריתם ה-BiDi של הדפדפן הופך את סדר התווים והסימנים הניטרליים (`=`, `-`, `+`, `*`), והנוסחה מוצגת הפוך ומשובשת לחלוטין.
  * עטיפה ב-`\(...\)` מבטיחה ש-KaTeX ייצר אלמנט מבודד עם `direction: ltr !important` ו-`unicode-bidi: isolate !important`.

---

## 2. חוקי Escape במחרוזות JavaScript (`.js`)
רוב חומר הלימוד והשאלות מאוחסנים בקובצי JS (`data/20229/...`, `data/20425/...`):
* **פקודות TeX שמתחילות ב-`\t`**:
  * פקודות כמו `\text`, `\tau`, `\theta`, `\times`, `\to`, `\triangle` מחייבות **הכפלת backslash כפולה**: בתוך מחרוזת מירכאות כפולות יש לכתוב `\\text`, `\\tau`, `\\times`, `\\to`.
  * **סכנה חמורה**: כתיבת `\text` יחיד גורמת למפענח ה-JS להמיר את `\t` לתו Tab (`0x09`), מה ששובר את KaTeX בזמן ריצה!
* **מפרידי KaTeX במחרוזות JS**:
  * במחרוזת רגילה: `\\(` ו-`\\)` עבור inline, ו-`\\[` ו-`\\]` עבור display.
  * בתבנית Template Literal (גרש נטוי): יש לוודא שהתווים אינם מתפרשים כ-escapes שגויים.
* **איסור על Markdown backticks בתוך HTML**:
  * אין להשתמש ב-\` בתוך מחרוזות HTML. יש להשתמש ב-`<code>...</code>` לקוד או ב-`\(...\)` למתמטיקה.

---

## 3. אופרטורים, יחסים ואי-שוויונות ב-KaTeX
* **אי-שוויונות בתוך מחרוזות HTML**:
  * **לעולם אין להשתמש בתווי `<` או `>` גולמיים** בתוך נוסחה (`\( x > 0 \)`). הדבר שובר מפענחי HTML ו-DOM.
  * יש להשתמש תמיד ב-TeX entities:
    * `\gt` במקום `>`
    * `\lt` במקום `<`
    * `\ge` או `\geq` במקום `>=`
    * `\le` או `\leq` במקום `<=`
* **יחסי קבוצות והעתקות**:
  * `\subseteq`, `\subset`, `\in`, `\cap`, `\cup`, `\oplus`, `\perp`
  * חצים: `\to` או `\implies` או `\iff`

---

## 4. תשתית ה-CSS לכיווניות מתמטיקה (BiDi & KaTeX Infrastructure)
בכל דף המציג מתמטיקה יש להבטיח את קיומם של כללי ה-CSS הבאים (קיימים כעת ב-`css/styles.css` וב-`css/linear.css`):
```css
.katex,
.katex-html {
  direction: ltr !important;
  unicode-bidi: isolate !important;
  text-align: left;
}

.katex-display {
  direction: ltr !important;
  unicode-bidi: isolate !important;
  text-align: center !important;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 1em 0;
}

.katex-display > .katex {
  display: inline-block;
  text-align: initial;
}

.katex .mtable,
.katex .matrix,
.katex .arraycolsep,
.katex .col-align-c,
.katex .col-align-l,
.katex .col-align-r,
.katex .base {
  direction: ltr !important;
  unicode-bidi: isolate !important;
}
```
* **כלל ברזל**: לעולם אין להגביל את ה-`direction: ltr` של KaTeX למחלקה ספציפית בלבד (כגון `.linear-lab`). הכלל חייב להיות גלובלי לכל רכיבי `.katex` באתר.

---

## 5. מילים בעברית בתוך נוסחה (`\text{...}`)
* גופני KaTeX אינם כוללים תווי עברית (ולכן מודפסות אזהרות `No character metrics for ...`).
* במידת האפשר, יש להעדיף עברית מחוץ לנוסחה:
  * מומלץ: `כלומר \(A = B\)`
  * פחות מומלץ: `\(\text{כלומר } A = B\)`
* כאשר חובה עברית בתוך הנוסחה (למשל `\text{ר"ג}` או `\text{ר"א}`): יש לוודא `\\text{ר"ג}` כדי למנוע יצירת תו Tab.

---

## 6. אימות אוטומטי חובה לפני סיום משימה
בכל שינוי או הוספת תוכן מתמטי, חובה להריץ את סקריפט הבדיקה המתאים ולוודא 0 שגיאות:
* עבור קורס 20229: `node scripts/agent-tools/check-20229.js`
* עבור כל קובץ JS: `node --check <file-path>`
* ודא שאין תווי בקרה (Tabs לא רצויים, Backticks שנשכחו, תגיות פתוחות).
