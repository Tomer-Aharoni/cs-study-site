UNIT7.sections.push(
  {
    id: "u7-ddl",
    title: "יצירת טבלאות והגדרת מבנה (CREATE TABLE)",
    html: `
      <p>שפת <strong>DDL (Data Definition Language)</strong> היא המשפחה האחראית על עיצוב השלד והמבנה של מסד הנתונים. ללא טבלאות מוגדרות מראש, אין היכן לאחסן רשומות ואין ממה לשלוף מידע — לכן כל פרויקט מסדי נתונים מתחיל כאן.</p>
      <p>תחביר היצירה הבסיסי מגדיר את שם הטבלה, ורשימה מופרדת בפסיקים של שמות העמודות וטיפוסי הנתונים שלהן בתוך סוגריים:</p>
      <pre class="code"><code>CREATE TABLE Students (
    id INT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255)
);</code></pre>
      <ul>
        <li><code>INT</code> או <code>INTEGER</code> — מייצג מספר שלם (כגון מזהה סטודנט או גיל).</li>
        <li><code>VARCHAR(255)</code> — מייצג מחרוזת טקסט באורך משתנה עם מגבלת תווים מרבית (במקרה זה, עד 255 תווים).</li>
        <li><code>PRIMARY KEY</code> — מגדיר את העמודה כמפתח ראשי ייחודי שלא יכול להיות ריק.</li>
      </ul>
      <div class="panel">
        <p><strong>כלל ברזל באבטחת מזהים (Identifiers vs. Values):</strong></p>
        <p>מצייני מקום (כגון הסימן <code>?</code> שיוסבר בהמשך) מיועדים אך ורק עבור <strong>ערכים (Literal Values)</strong> המוכנסים לשורות, ולא עבור <strong>מזהים (Identifiers)</strong> כמו שמות טבלאות או שמות עמודות. מנוע ה-SQL אינו מאפשר לקשור שם טבלה כפרמטר דינמי.
        <br>לכן, אם האפליקציה שלכם מאפשרת למשתמש לבחור לאיזו טבלה לפנות, <strong>לעולם אין לשרשר את שם הטבלה ישירות לפקודת ה-SQL!</strong> הדרך המאובטחת היחידה היא השוואה מול <strong>רשימת שמות מותרים סגורה (Whitelist Validation)</strong> המוגדרת מראש בתוך הקוד שלכם.</p>
      </div>
    `,
  },
  {
    id: "u7-dml",
    title: "הוספה ושליפה של נתונים (INSERT & SELECT)",
    html: `
      <p>לאחר שהטבלה נוצרה, אנו משתמשים בפקודות <strong>DML (הוספה ועדכון)</strong> ובפקודות <strong>DQL (שאילתות ושליפה)</strong> כדי לעבוד עם הנתונים בפועל. פקודות אלו הן המקום השכיח ביותר שבו קלט מהמשתמש פוגש את מסד הנתונים, ולכן הן מהוות את מוקד הסיכון להזרקות SQL.</p>
      
      <p><strong>הוספת שורה (INSERT):</strong></p>
      <pre class="code"><code>-- ציון שמות העמודות במפורש (מומלץ ודפנסיבי)
INSERT INTO Students (id, firstname, lastname) VALUES (1, 'Blaise', 'Pascal');

-- הוספה לכל העמודות לפי הסדר המקורי של הטבלה
INSERT INTO Students VALUES (2, 'Ada', 'Lovelace');</code></pre>
      <p><em>טיפ הגנתי:</em> תמיד עדיף לציין במפורש את שמות העמודות (הצורה הראשונה). אם בעתיד תתווסף עמודה חדשה לטבלה (כגון <code>email</code>), פקודה שמציינת עמודות במפורש תמשיך לעבוד, בעוד פקודה ללא שמות עמודות תקרוס מיד עקב אי-התאמה במספר הערכים.</p>

      <p><strong>שליפת נתונים (SELECT):</strong></p>
      <p>פקודת <code>SELECT</code> היא לב ליבה של שפת השאילתות. המבנה הנפוץ כולל את העמודות המבוקשות, שם הטבלה (<code>FROM</code>), תנאי סינון (<code>WHERE</code>), סדר מיון (<code>ORDER BY</code>), והגבלת כמות תוצאות (<code>LIMIT</code>):</p>
      <ul>
        <li><code>SELECT * FROM Students;</code> — שליפת כל העמודות וכל השורות בטבלה. נוח לתרגול ראשוני, אך במערכות ייצור עדיף לנקוב במפורש בשמות העמודות הדרושות כדי למנוע דליפת מידע רגיש (עקרון המידור).</li>
        <li><code>SELECT firstname, lastname FROM Students WHERE id = ?;</code> — שליפה ממוקדת של שם הסטודנט לפי מזהה. שימו לב לסימן <code>?</code>: הערך נקשר בנפרד ואינו משורשר למחרוזת!</li>
      </ul>
      <div class="panel">
        <p><strong>שאלת מבחן אופיינית (מטמון URL ב-SQLite):</strong></p>
        <p>במבחן (כגון 2025ג) התבקשו הסטודנטים למצוא את הרשומה הישנה ביותר במטמון כדי למחוק אותה ולפנות מקום. עושים זאת באמצעות מיון לפי עמודת הזמן בסדר עולה (מהישן לחדש) והגבלה לשורה בודדת:
        <br><code>SELECT url FROM Cache ORDER BY updated_at ASC LIMIT 1;</code>
        <br>כאשר <code>ASC</code> (Ascending) פירושו סדר עולה (מהקטן לגדול), ו־<code>DESC</code> (Descending) פירושו סדר יורד.</p>
      </div>
    `,
  },
  {
    id: "u7-eng",
    title: "מנועי SQL: שרתי מסדי נתונים מול מנוע משובץ (SQLite)",
    html: `
      <p>בעולם קיימים מנועי מסדי נתונים רבים: Oracle, Microsoft SQL Server, PostgreSQL, MySQL ו-SQLite. כולם דוברים את שפת ה-SQL (אם כי לכל מנוע יש "ניב" קל עם הרחבות תחביריות ייחודיות לו). ההבדל הארכיטקטוני המרכזי ביניהם הוא בין <strong>שרת מסד נתונים</strong> לבין <strong>מנוע משובץ קובץ (Embedded Engine)</strong>.</p>
      <ul>
        <li><strong>שרת מסדי נתונים (Client-Server):</strong> מנועים כמו PostgreSQL או MySQL רצים כשירות/תהליך רקע עצמאי ומאזינים לחיבורי רשת (TCP Port). היישום פותח שקע רשת אל השרת, שולח שאילתות, ומנוע השרת מנהל משתמשים והרשאות DCL מורכבות.</li>
        <li><strong>SQLite — מנוע מסד נתונים משובץ:</strong>
          SQLite הוא מנוע SQL עצמאי לחלוטין (Self-contained), שנכתב בשפת C כספרייה קומפקטית. במקום לרוץ כשרת נפרד ברשת, הספרייה נטענת ישירות <strong>לתוך תהליך הריצה של האפליקציה שלכם</strong>. מסד הנתונים כולו מאוחסן בתוך <strong>קובץ יחיד בדיסק המקומי</strong> (למשל <code>app.db</code>).
        </li>
      </ul>
      <p>בשל פשטותו, העובדה שאינו דורש התקנת שרתים, ואמינותו הגבוהה, SQLite הוא המנוע הנבחר עבור בחינות הקורס, אפליקציות מובייל, דפדפנים ומטמונים מקומיים.</p>
      <div class="panel">
        <p><strong>היבטי אבטחה ב-SQLite:</strong></p>
        <ul>
          <li><strong>הרשאות ברמת מערכת הקבצים:</strong> ב-SQLite אין משתמשים עם פקודות DCL (כמו <code>GRANT</code>). מי שמחזיק בהרשאת קריאה וכתיבה לקובץ ה-<code>.db</code> בדיסק — שולט בכל המסד! לכן יש להקפיד על הרשאות קובץ מחמירות במערכת ההפעלה.</li>
          <li><strong>איסור חשיפה לאינטרנט:</strong> לעולם אין לשמור את קובץ ה-<code>.db</code> בתוך תיקייה ציבורית של שרת ה-Web, שכן אז כל גולש יוכל פשוט להוריד את קובץ המסד השלם ישירות למחשבו.</li>
          <li><strong>פונקציית <code>sqlite3_exec</code> ב-C:</strong> זוהי פונקציית נוחות המריצה מחרוזת SQL שלמה בבת אחת. אם תזינו לה מחרוזת שנוצרה בשרשור קלט — היא פגיעה להזרקת SQL בדיוק כמו כל מנוע אחר!</li>
        </ul>
      </div>
    `,
  },
  {
    id: "u7-api",
    title: "עבודה עם SQLite ב-Python וב-C++",
    html: `
      <p>במבחני הקורס תידרשו להשתמש בספריית SQLite הן בפייתון (<code>import sqlite3</code>) והן ב-C++ (<code>#include &lt;sqlite3.h&gt;</code>). להלן השלבים המדויקים לכתיבה נכונה ומאובטחת ללא שרשור מחרוזות.</p>
      
      <h3>1. עבודה ב-Python (התבנית הבטוחה לבחינה)</h3>
      <ol>
        <li><strong>פתיחת חיבור:</strong> <code>conn = sqlite3.connect("server.db")</code>. שימו לב: כישלון בהתחברות זורק <strong>חריגה (Exception)</strong> מסוג <code>sqlite3.Error</code>, ואינו מחזיר <code>None</code>! יש לתפוס אותה באמצעות <code>try-except</code>.</li>
        <li><strong>יצירת סמן (Cursor):</strong> <code>cur = conn.cursor()</code>. הסמן הוא האובייקט שדרכו משגרים פקודות ומנווטים בין שורות התוצאה.</li>
        <li><strong>הרצת שאילתה פרמטרית:</strong> <code>cur.execute(sql, parameters)</code>. מעבירים מחרוזת קבועה עם <code>?</code> עבור כל ערך, ואת הערכים עצמם בתוך <strong>טיפל (Tuple)</strong>.</li>
        <li><strong>שמירת שינויים (Commit):</strong> <code>conn.commit()</code>. חובה לבצע עבור פעולות המשנות נתונים (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>), אחרת השינויים יאבדו עם סגירת החיבור!</li>
        <li><strong>סגירת משאבים:</strong> <code>conn.close()</code> או שימוש במנהל הקשר <code>with</code>.</li>
      </ol>
      <pre class="code"><code>import sqlite3

# שליפה בטוחה עם פרמטר יחיד — שימו לב לפסיק שיוצר Tuple!
cur.execute("SELECT firstname FROM Students WHERE id = ?", (sid,))
rows = cur.fetchall()  # מחזיר רשימה של שורות התוצאה

# הוספת שורה בצורה מאובטחת
cur.execute("INSERT INTO messages (id, body) VALUES (?, ?)", (i, text))
conn.commit()</code></pre>
      <p><em>דגש קריטי בפייתון:</em> כדי להגדיר טיפל עם איבר בודד, חובה להוסיף פסיק: <code>(sid,)</code>. כתיבה כמו <code>(sid)</code> ללא פסיק היא רק ביטוי מתמטי בסוגריים ואינה יוצרת טיפל!</p>

      <h3>2. עבודה ב-C++ (הממשק העקרוני)</h3>
      <p>ב-C++ סדר הפעולות מורכב מעט יותר ודורש משמעת שחרור משאבים:</p>
      <ol>
        <li><code>sqlite3_open("server.db", &amp;db);</code> — פתיחת המסד ובדיקה שקוד החזרה שווה לקבוע ההצלחה <code>SQLITE_OK</code>.</li>
        <li><code>sqlite3_prepare_v2(db, query, -1, &amp;stmt, nullptr);</code> — הכנת "משפט מוכן" (Prepared Statement). המנוע מפרסר ומקמפל את תבנית ה-SQL מראש.</li>
        <li><code>sqlite3_bind_text(stmt, 1, val.c_str(), -1, SQLITE_TRANSIENT);</code> — קשירת הערך למציין המקום. <em>שימו לב:</em> ב-C++ אינדקס הפרמטרים מתחיל מ-<strong>1</strong> ולא מ-0! הדגל <code>SQLITE_TRANSIENT</code> מורה לספרייה להעתיק את המחרוזת לזיכרון בטוח.</li>
        <li><code>sqlite3_step(stmt);</code> — ביצוע הצעד: בלולאה מול <code>SQLITE_ROW</code> עבור שליפה, או פעם אחת עד לקבלת <code>SQLITE_DONE</code> עבור הוספה.</li>
        <li><code>sqlite3_finalize(stmt);</code> — שחרור זיכרון המשפט (חובה למניעת דליפות זיכרון!).</li>
        <li><code>sqlite3_close(db);</code> — סגירת החיבור למסד.</li>
      </ol>
    `,
  },
  {
    id: "u7-csv",
    title: "הזנה בטוחה מקובץ CSV: מפתח ראשי, מניעת כפילויות ואצווה",
    html: `
      <p>בבחינות רבות (כגון 2021א, 2021ג, 2026א), הסטודנט מתבקש לקרוא נתונים מתוך קובץ טקסט או קובץ CSV (ערכים מופרדים בפסיקים) ולהזינם לתוך טבלת SQLite. שורות הקובץ הן <strong>קלט חיצוני לחלוטין</strong> — ולכן יש לטפל בהן בדפנסיביות מלאה.</p>
      
      <p><strong>העקרונות המנחים לפתרון בחינה מושלם:</strong></p>
      <ul>
        <li><strong>מניעת כפילויות (Duplicate Prevention):</strong> מגדירים <code>PRIMARY KEY</code> על עמודת המזהה. בשאילתת ההוספה משתמשים בפקודה <code>INSERT OR IGNORE INTO Students...</code>. אם שורה עם אותו מזהה כבר קיימת במסד, המנוע פשוט מדלג עליה בשקט וממשיך הלאה במקום לקרוס או להכשיל את כל הריצה.</li>
        <li><strong>הכנסה באצווה (Batch Insertion):</strong> שימוש בפונקציה <code>cur.executemany()</code> המקבלת תבנית שאילתה יחידה ורשימה של טיפלים. פונקציה זו מבצעת את הקשירה וההכנסה בלולאה פנימית מותאמת ומהירה, בלי שרשור מחרוזות.</li>
        <li><strong>בדיקת תקינות והמרת טיפוסים (Type Casting):</strong> מפרקים כל שורה בזהירות, בודקים שיש בדיוק את מספר השדות המצופה, וממירים מזהים למספר (<code>int</code>) בתוך בלוק <code>try-except</code>. כישלון המרה מוביל לדחיית השורה הפגומה ולא לשבירת התוכנית.</li>
      </ul>
      <pre class="code"><code>import sqlite3

# יצירת הטבלה עם מפתח ראשי ייחודי
conn = sqlite3.connect("university.db")
cur = conn.cursor()
cur.execute("""
    CREATE TABLE IF NOT EXISTS Students (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );
""")

# קריאת הקובץ ועיבוד בטוח
rows_to_insert = []
with open("students.csv", "r", encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split(",", 1)
        if len(parts) != 2:
            continue  # דילוג על שורות במבנה שגוי
        try:
            student_id = int(parts[0])
            student_name = parts[1].strip()
        except ValueError:
            continue  # דילוג אם המזהה אינו מספר חוקי
        rows_to_insert.append((student_id, student_name))

# ביצוע הכנסה באצווה עם דילוג על כפילויות
cur.executemany(
    "INSERT OR IGNORE INTO Students (id, name) VALUES (?, ?)",
    rows_to_insert,
)
conn.commit()
conn.close()</code></pre>
      <p>שימו לב לפרמטר <code>encoding="utf-8"</code>: הוא מבטיח קריאה נכונה של תווים רב-בייטיים ועברית. הקוד לעיל מדגים הגנה רב-שכבתית: אימות מבנה, אימות טיפוסים, מניעת כפילויות ברמת המסד, וקשירה פרמטרית מלאה המונעת הזרקת SQL.</p>
    `,
  }
);
