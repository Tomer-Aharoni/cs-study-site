UNIT7.sections.push(
  {
    id: "u7-ddl",
    title: "יצירת טבלה (CREATE TABLE)",
    html: `
      <p>DDL, מהסעיף על תת־השפות, היא המשפחה שבונה את המבנה. בלי טבלה אין מה להכניס ואין מה לשלוף, ולכן מתחילים כאן.</p>
      <p>תבנית DDL במצגת: שם טבלה, ואז לכל עמודה שם וטיפוס בסוגריים. דוגמה לימודית (שמות עמודות מהמצגת, בלי העתקת דף שלם):</p>
      <p><code>CREATE TABLE Students (id INT, firstname VARCHAR(255), lastname VARCHAR(255));</code></p>
      <p>במבחן (למשל טבלת הודעות): מגדירים עמודות לפי הצורך — מספר סידורי, תוכן, זמן — ואז <code>INSERT</code> עם פרמטרים. <code>CREATE</code> עצמו לא מקבל קלט משתמש; אם שם הטבלה מגיע מהלקוח אי אפשר לקשור אותו ב־<code>?</code> (זה מזהה, לא ערך) — רק רשימת שמות מותרים בקוד.</p>
    `,
  },
  {
    id: "u7-dml",
    title: "הוספה ושליפה (INSERT, SELECT)",
    html: `
      <p>אחרי שהטבלה קיימת, DML מוסיף שורות ו־DQL שולף אותן. שתי הפקודות האלה הן גם המקום שבו קלט מהמשתמש נכנס למחרוזת, ולכן הן הגשר להזרקה בהמשך.</p>
      <p><code>INSERT INTO Students VALUES (1, 'Blaise', 'Pascal');</code> — כל העמודות לפי הסדר. חלופה בטוחה יותר לקריאה: לציין שמות עמודות ואז ערכים, כדי שלא יישבר כשמוסיפים עמודה.</p>
      <p><code>SELECT</code> במצגת: עמודות, <code>FROM</code>, <code>WHERE</code> (תנאי), <code>ORDER BY</code> עם <code>ASC</code> או <code>DESC</code>.</p>
      <ul>
        <li><code>SELECT * FROM Students;</code> — כל העמודות. נוח לתרגול; בייצור מעדיפים לנקוב עמודות (פחות דליפה אם נוספת עמודת סוד).</li>
        <li><code>SELECT firstname, lastname FROM Students WHERE id = ?</code> — השליפה לפי מזהה; את הערך קושרים, לא מדביקים.</li>
      </ul>
      <p>מבחן 2025ג (מטמון URL ב-SQLite): למצוא רשומה ישנה לפי שדה זמן — זה <code>ORDER BY</code> + הגבלת שורה, עם פרמטרים לכל ערך שמגיע מהלקוח (הכתובת עצמה).</p>
    `,
  },
  {
    id: "u7-eng",
    title: "מנועי SQL ו-SQLite",
    html: `
      <p>המצגת מונה בין השאר Oracle, MySQL, SQL Server, SQLite. כולם מדברים SQL (עם ניבים). ההבדל התפעולי: שרת מול קובץ.</p>
      <p><strong>SQLite</strong> במצגת: מנוע SQL עצמאי, כתוב ב־C. ספרייה שיושבת בתהליך שלכם; בסיס הנתונים לרוב קובץ אחד. מתאים לתרגול, למטמון מקומי, ולבחינות הקורס. אין תהליך שרת נפרד חובה — הרשאות הקובץ במערכת ההפעלה חשובות.</p>
      <p>דפנסיבית: כמה תהליכים שכותבים לאותו קובץ; גיבוי הקובץ; לא לחשוף את נתיב הקובץ באינטרנט. SQLite לא מחליף פרמטרים — <code>sqlite3_exec</code> על מחרוזת מודבקת שביר כמו בכל מנוע.</p>
    `,
  },
  {
    id: "u7-api",
    title: "SQL ב-C++ ובפייתון",
    html: `
      <p>מצגת: ב־C++ <code>#include "sqlite3.h"</code>. בפייתון <code>import sqlite3</code>.</p>
      <p>פייתון (תבנית בחינה בלי הדבקה): <code>conn = sqlite3.connect('table.db')</code> — כישלון זורק חריגה, לא מחזיר <code>None</code>. סמן (<code>cursor</code>), <code>execute</code> עם מחרוזת קבועה ופרמטרים בטיפל, <code>commit</code> אחרי כתיבה, <code>close</code> (או <code>with</code>). בדיקת שגיאות במקום לתת לתוכנית ליפול בלי הודעה — אותה משמעת כמו בשקעים ביחידה 5.</p>
      <p>C++ עקרונית: <code>sqlite3_open</code>, בדיקת <code>SQLITE_OK</code>, הכנת משפט (<code>sqlite3_prepare_v2</code>), קשירה (<code>sqlite3_bind_int</code> / <code>bind_text</code>), הרצה ב־<code>sqlite3_step</code>, שחרור ב־<code>sqlite3_finalize</code>, <code>sqlite3_close</code>. <code>sqlite3_exec</code> נוח ל־DDL קבוע בלי קלט משתמש; לקלט — הכנה וקשירה, לא שרשור ל־<code>char*</code>.</p>
      <p>דוגמת קשירה בפייתון:</p>
      <pre class="code"><code>cur.execute("SELECT firstname FROM Students WHERE id = ?", (sid,))</code></pre>
      <p>הפסיק ב־<code>(sid,)</code> יוצר טיפל של איבר אחד. כמה <code>?</code> — טיפל באותו אורך. ב־C++ האינדקס של הפרמטר מתחיל ב־1.</p>
      <p>מבחן (טבלת הודעות, בלי קלט ב־DDL):</p>
      <pre class="code"><code>cur.execute("CREATE TABLE IF NOT EXISTS messages (id INTEGER, body TEXT)")
cur.execute("INSERT INTO messages (id, body) VALUES (?, ?)", (i, text))
conn.commit()</code></pre>
      <p>מטמון URL (מבחן 2025ג): ערך הכתובת ב־<code>?</code>; מחיקת הישן לפי עמודה שאתם קובעים בקוד, לא שם עמודה מהלקוח. <code>ORDER BY updated ASC LIMIT 1</code> — מזהה העמודה whitelist בקוד.</p>
    `,
  },
  {
    id: "u7-csv",
    title: "קובץ לטבלה: מפתח, התעלמות מכפילות, ואצווה",
    html: `
      <p>במבחן קוראים שורות מקובץ טקסט ומכניסים אותן ל־SQLite. הקובץ הוא קלט: כל שדה נכנס כפרמטר, לא כחלק ממחרוזת ה־SQL.</p>
      <ul>
        <li><code>PRIMARY KEY</code> על המזהה אוסר שתי שורות עם אותו מפתח.</li>
        <li><code>INSERT OR IGNORE</code> מדלג על שורה שמפרה אילוץ, כולל מפתח כפול, במקום להפיל את כל האצווה. הדילוג לא מספר למה השורה נדחתה; אם צריך לדעת, בודקים כמה שורות באמת השתנו.</li>
        <li><code>executemany</code> מריץ אותה תבנית על רשימת טיפלים. זה עדיין קשירה, לא שרשור מהיר יותר.</li>
      </ul>
      <pre class="code"><code>cur.execute(
    "CREATE TABLE IF NOT EXISTS Students ("
    "id INTEGER PRIMARY KEY, name TEXT)"
)
rows = []
with open("students.csv", encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split(",", 1)
        if len(parts) != 2:
            continue
        try:
            sid = int(parts[0])
        except ValueError:
            continue
        rows.append((sid, parts[1]))
cur.executemany(
    "INSERT OR IGNORE INTO Students (id, name) VALUES (?, ?)",
    rows,
)
conn.commit()</code></pre>
      <p>פיצול לפי פסיק נשבר אם השם עצמו מכיל פסיק. בודקים שיש שני שדות, וממירים את המזהה למספר לפני הקשירה. כישלון המרה הוא דחיית השורה, לא הדבקה ל־SQL.</p>
    `,
  }
);
