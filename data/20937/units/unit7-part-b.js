UNIT7.sections.push(
  {
    id: "u7-ddl",
    title: "יצירת טבלאות והגדרת מבנה (CREATE TABLE)",
    html: `
      <p>שפת <strong>DDL (Data Definition Language)</strong> היא המשפחה האחראית על עיצוב השלד והמבנה של מסד הנתונים. ללא טבלאות מוגדרות מראש, אין היכן לאחסן רשומות ואין ממה לשלוף מידע — לכן כל פרויקט מסדי נתונים מתחיל כאן.</p>
      <p>תחביר היצירה הבסיסי מגדיר את שם הטבלה, ורשימה מופרדת בפסיקים של שמות העמודות, טיפוסי הנתונים שלהן והאילוצים (Constraints) בתוך סוגריים:</p>
      <pre class="code"><code>CREATE TABLE UserAccounts (
    id INTEGER PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(32) DEFAULT 'standard'
);</code></pre>
      <ul>
        <li><code>INTEGER PRIMARY KEY</code> — מגדיר את העמודה כמפתח ראשי מספרי ייחודי. ב-SQLite עמודה זו מתפקדת גם כ־<code>ROWID</code> הפנימי של מנוע ה-B-Tree, ומבטיחה שליפה מהירה במיוחד.</li>
        <li><code>VARCHAR(64)</code> / <code>VARCHAR(255)</code> — מייצג מחרוזת טקסט באורך משתנה עם מגבלת תווים מרבית.</li>
        <li><code>NOT NULL</code> — אילוץ שלמות האוסר על הכנסת שדות ריקים.</li>
        <li><code>UNIQUE</code> — מונע כפילויות של שמות משתמש במערכת ברמת מנוע המסד.</li>
        <li><code>DEFAULT 'standard'</code> — ערך ברירת מחדל אוטומטי אם השדה לא סופק בעת ההוספה.</li>
      </ul>
      <div class="panel">
        <p><strong>כלל ברזל באבטחת מזהים (Identifiers vs. Values):</strong></p>
        <p>מצייני מקום (כגון הסימן <code>?</code> בשאילתות פרמטריות) מיועדים אך ורק עבור <strong>ערכים (Literal Values)</strong> המוכנסים לשורות, ולא עבור <strong>מזהים (Identifiers)</strong> כמו שמות טבלאות או שמות עמודות. מנוע ה-SQL אינו מאפשר לקשור שם טבלה כפרמטר דינמי.
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
      <pre class="code"><code>-- 1. ציון שמות העמודות במפורש (תבנית דפנסיבית מומלצת)
INSERT INTO UserAccounts (id, username, email, role)
VALUES (101, 'alex_sec', 'alex@cyberdefense.org', 'analyst');

-- 2. הוספה מרומזת (ללא שמות עמודות - מסתמכת על סדר העמודות המקורי)
INSERT INTO UserAccounts
VALUES (102, 'maya_dev', 'maya@cloudnet.io', 'admin');</code></pre>
      <p><em>טיפ תכנות דפנסיבי:</em> תמיד חובה לציין במפורש את שמות העמודות (הצורה הראשונה). אם בעתיד תתווסף עמודה חדשה לטבלה (כגון <code>phone</code> או <code>created_at</code>), פקודה שמציינת עמודות במפורש תמשיך לפעול ללא תקלה, בעוד פקודה ללא שמות עמודות תקרוס מיד עקב אי-התאמה במספר הערכים.</p>

      <p><strong>שליפת נתונים (SELECT):</strong></p>
      <p>פקודת <code>SELECT</code> היא לב ליבה של שפת השאילתות. המבנה הנפוץ כולל את העמודות המבוקשות, שם הטבלה (<code>FROM</code>), תנאי סינון (<code>WHERE</code>), סדר מיון (<code>ORDER BY</code>), והגבלת כמות תוצאות (<code>LIMIT</code>):</p>
      <ul>
        <li><code>SELECT * FROM UserAccounts;</code> — שליפת כל העמודות וכל השורות בטבלה. נוח לתרגול מהיר, אך במערכות ייצור כתיבה זו מפרה את עקרון המידור: היא מבזבזת זיכרון ורוחב פס ברשת, ועלולה לחשוף שדות רגישים שיתווספו לסכמה בעתיד (כמו גיבוב סיסמה או טוקנים).</li>
        <li><code>SELECT username, email FROM UserAccounts WHERE id = ?;</code> — שליפה ממוקדת של שדות ספציפיים לפי מזהה. שימו לב לסימן <code>?</code>: הערך נקשר בנפרד כפרמטר ואינו משורשר למחרוזת!</li>
      </ul>
      <div class="panel">
        <p><strong>ניתוח שאלת מבחן אופיינית (מטמון דפים ב-SQLite - מבחן 2025ג):</strong></p>
        <p>במבחן התבקשו הסטודנטים לאתר את הרשומה הישנה ביותר במטמון (Cache) כדי למחוק אותה ולפנות מקום עבור רשומה חדשה (מדיניות פינוי מסוג LRU / FIFO). השאילתה המדויקת שנבחרה:</p>
        <pre class="code"><code>SELECT url FROM Cache ORDER BY updated_at ASC LIMIT 1;</code></pre>
        <p><strong>פירוק המרכיבים ומלכודות הבחינה:</strong></p>
        <ul>
          <li><code>ORDER BY updated_at ASC</code> — מיון לפי חותמת הזמן בסדר עולה (Ascending, מהישן ביותר לחדש ביותר). <em>מלכודת מסיח:</em> שימוש ב־<code>DESC</code> (סדר יורד) היה שולף דווקא את הרשומה החדשה ביותר ומוחק אותה בטעות!</li>
          <li><code>LIMIT 1</code> — הגבלה מדויקת לשורה בודדת. <em>מלכודת מסיח:</em> השמטת ה־<code>LIMIT</code> מחזירה את כל שורות הטבלה, מה שעלול להוביל לחריגת זיכרון ביישום.</li>
          <li>למחיקת אותה שורה ישירות ב-SQL ניתן לשלב שאילתה מקוננת: <code>DELETE FROM Cache WHERE url = (SELECT url FROM Cache ORDER BY updated_at ASC LIMIT 1);</code>.</li>
        </ul>
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
      
      <h3>1. עבודה ב-Python (התבנית הדפנסיבית לבחינה)</h3>
      <ol>
        <li><strong>פתיחת חיבור:</strong> <code>conn = sqlite3.connect("production.db")</code>. <em>מלכודת מבחן שכיחה:</em> כישלון בהתחברות (למשל נתיב לא חוקי או היעדר הרשאות קובץ) זורק <strong>חריגה (Exception)</strong> מסוג <code>sqlite3.Error</code>, ואינו מחזיר <code>None</code>! יש לתפוס אותה באמצעות <code>try-except</code>.</li>
        <li><strong>יצירת סמן (Cursor):</strong> <code>cur = conn.cursor()</code>. הסמן הוא האובייקט שדרכו משגרים פקודות ומנווטים בין שורות התוצאה.</li>
        <li><strong>הרצת שאילתה פרמטרית:</strong> <code>cur.execute(sql, parameters)</code>. מעבירים מחרוזת קבועה עם <code>?</code> עבור כל ערך, ואת הערכים עצמם בתוך <strong>טיפל (Tuple)</strong> נפרד.</li>
        <li><strong>שמירת שינויים (Commit):</strong> <code>conn.commit()</code>. חובה לבצע עבור פעולות DML המשנות נתונים (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>), אחרת השינויים יימחקו ולא יישמרו בדיסק עם סגירת החיבור!</li>
        <li><strong>סגירת משאבים:</strong> <code>conn.close()</code> בבלוק <code>finally</code> או שימוש במנהל הקשר <code>with</code>.</li>
      </ol>
      <pre class="code"><code>import sqlite3

conn = None
try:
    conn = sqlite3.connect("production.db")
    cur = conn.cursor()

    # שליפה בטוחה עם פרמטר יחיד — שימו לב לפסיק שיוצר Tuple!
    account_id = 101
    cur.execute(
        "SELECT username, email, role FROM UserAccounts WHERE id = ?",
        (account_id,)  # טיפל בן איבר אחד חייב להסתיים בפסיק!
    )
    user_record = cur.fetchone()  # שליפת שורה בודדת (חסכוני בזיכרון RAM)
    if user_record:
        print(f"User: {user_record[0]}, Email: {user_record[1]}")

    # הוספת שורה בצורה מאובטחת לטבלת ביקורת
    cur.execute(
        "INSERT INTO AuditLogs (account_id, action, ip_address) VALUES (?, ?, ?)",
        (account_id, "LOGIN_ATTEMPT", "10.0.0.15")
    )
    conn.commit()  # שמירת הנתונים בדיסק
except sqlite3.Error as db_err:
    print(f"Database error: {db_err}")
    if conn:
        conn.rollback()  # ביטול שינויים במקרה שגיאה
finally:
    if conn:
        conn.close()</code></pre>
      <p><em>דגש קריטי בפייתון לבחינה:</em> כדי להגדיר טיפל עם איבר בודד, חובה להוסיף פסיק: <code>(account_id,)</code>. כתיבה כגון <code>(account_id)</code> ללא פסיק היא רק ביטוי חשבוני בסוגריים, שגורמת לשגיאת ריצה <code>TypeError: parameters are of unsupported type</code>!</p>

      <h3>2. עבודה ב-C++ (הממשק המלא וניהול משאבים)</h3>
      <p>ב-C++ סדר הפעולות מורכב יותר ודורש משמעת שחרור משאבים קפדנית למניעת דליפות זיכרון:</p>
      <ol>
        <li><code>sqlite3_open("production.db", &amp;db);</code> — פתיחת המסד ובדיקה שקוד החזרה שווה לקבוע ההצלחה <code>SQLITE_OK</code>.</li>
        <li><code>sqlite3_prepare_v2(db, query, -1, &amp;stmt, nullptr);</code> — הכנת "משפט מוכן" (Prepared Statement). המנוע מפרסר ומקמפל את תבנית ה-SQL מראש. שימוש ב־<code>prepare_v2</code> מומלץ על פני הגרסה המיושנת מכיוון שהוא מנהל סכמות דינמיות בצורה עמידה יותר.</li>
        <li><code>sqlite3_bind_text(stmt, 1, val.c_str(), -1, SQLITE_TRANSIENT);</code> — קשירת הערך למציין המקום. <em>מלכודת אינדקסים קריטית:</em> ב-C++ אינדקס הפרמטרים בקשירה (Bind) מתחיל מ-<strong>1</strong> ולא מ-0! הדגל <code>SQLITE_TRANSIENT</code> מורה לספרייה להעתיק את המחרוזת לחיץ זיכרון פנימי, ובכך מונע מצב של מצביע מרחף (Dangling Pointer) או שימוש לאחר שחרור (Use-After-Free) אם המחרוזת המקורית תשתחרר.</li>
        <li><code>sqlite3_step(stmt);</code> — ביצוע הצעד: בלולאה מול <code>SQLITE_ROW</code> עבור שליפה (קריאת עמודות עם <code>sqlite3_column_text</code> שבהן אינדקס העמודות מתחיל מ־<strong>0</strong>!), או פעם אחת עד לקבלת <code>SQLITE_DONE</code> עבור הוספה/עדכון.</li>
        <li><code>sqlite3_finalize(stmt);</code> — שחרור זיכרון המשפט המוכן (חובה למניעת זליגות זיכרון!).</li>
        <li><code>sqlite3_close(db);</code> — סגירת החיבור למסד.</li>
      </ol>
      <pre class="code"><code>#include &lt;iostream&gt;
#include &lt;sqlite3.h&gt;

bool fetchUserRole(const std::string&amp; email, std::string&amp; outRole) {
    sqlite3* db = nullptr;
    if (sqlite3_open("production.db", &amp;db) != SQLITE_OK) {
        std::cerr &lt;&lt; "Failed to open database" &lt;&lt; std::endl;
        sqlite3_close(db);
        return false;
    }

    sqlite3_stmt* stmt = nullptr;
    const char* sql = "SELECT role FROM UserAccounts WHERE email = ?";
    if (sqlite3_prepare_v2(db, sql, -1, &amp;stmt, nullptr) != SQLITE_OK) {
        sqlite3_close(db);
        return false;
    }

    // קשירת פרמטר - אינדקס 1!
    sqlite3_bind_text(stmt, 1, email.c_str(), -1, SQLITE_TRANSIENT);

    bool found = false;
    if (sqlite3_step(stmt) == SQLITE_ROW) {
        // קריאת עמודה - אינדקס 0!
        const unsigned char* text = sqlite3_column_text(stmt, 0);
        if (text) {
            outRole = reinterpret_cast&lt;const char*&gt;(text);
            found = true;
        }
    }

    sqlite3_finalize(stmt); // שחרור המשפט
    sqlite3_close(db);      // סגירת החיבור
    return found;
}</code></pre>
    `,
  },
  {
    id: "u7-csv",
    title: "הזנה בטוחה מקובץ CSV: מפתח ראשי, מניעת כפילויות ואצווה",
    html: `
      <p>בבחינות רבות (כגון 2021א, 2021ג, 2026א), הסטודנט מתבקש לקרוא נתונים מתוך קובץ טקסט או קובץ CSV (ערכים מופרדים בפסיקים) ולהזינם לתוך טבלת SQLite. שורות הקובץ הן <strong>קלט חיצוני לחלוטין</strong> — ולכן יש לטפל בהן בדפנסיביות מלאה.</p>
      
      <p><strong>שלושת העקרונות המנחים לפתרון בחינה מושלם:</strong></p>
      <ul>
        <li><strong>מניעת כפילויות (Duplicate Prevention):</strong> מגדירים <code>PRIMARY KEY</code> על עמודת המזהה. בשאילתת ההוספה משתמשים בפקודה <code>INSERT OR IGNORE INTO DeviceInventory...</code>. אם שורה עם אותו מזהה כבר קיימת במסד, המנוע פשוט מדלג עליה בשקט וממשיך הלאה במקום לקרוס או לבטל את כל הטרנזקציה.</li>
        <li><strong>הכנסה באצווה (Batch Insertion):</strong> שימוש בפונקציה <code>cur.executemany()</code> המקבלת תבנית שאילתה יחידה ורשימה של טיפלים. פונקציה זו מבצעת את הקשירה וההכנסה בלולאה פנימית מותאמת ומהירה, בלי שרשור מחרוזות ובמינימום תקשורת מול הדיסק.</li>
        <li><strong>אימות מבנה והמרת טיפוסים (Validation &amp; Type Casting):</strong> מפרקים כל שורה בזהירות, בודקים שיש בדיוק את מספר השדות המצופה (<code>len(parts) == 3</code>), וממירים מזהים למספר (<code>int</code>) בתוך בלוק <code>try-except</code>. כישלון המרה מוביל לדחיית השורה הפגומה ללא עצירת כל התוכנית.</li>
      </ul>
      <pre class="code"><code>import sqlite3

# יצירת הטבלה עם מפתח ראשי ייחודי לאיסור כפילויות
conn = sqlite3.connect("inventory.db")
cur = conn.cursor()
cur.execute("""
    CREATE TABLE IF NOT EXISTS DeviceInventory (
        device_id INTEGER PRIMARY KEY,
        hostname TEXT NOT NULL,
        ip_address TEXT NOT NULL
    );
""")

# קריאת הקובץ ועיבוד קלט דפנסיבי
records_to_insert = []
with open("devices.csv", "r", encoding="utf-8") as f:
    for line_num, line in enumerate(f, start=1):
        cleaned_line = line.strip()
        if not cleaned_line or cleaned_line.startswith("#"):
            continue  # דילוג על שורות ריקות והערות
            
        parts = cleaned_line.split(",")
        if len(parts) != 3:
            print(f"Skipping malformed row at line {line_num}")
            continue
            
        try:
            device_id = int(parts[0].strip())
            hostname = parts[1].strip()
            ip_address = parts[2].strip()
        except ValueError:
            print(f"Invalid integer device_id at line {line_num}")
            continue
            
        records_to_insert.append((device_id, hostname, ip_address))

# ביצוע הכנסה באצווה עם דילוג שקט על כפילויות מפתח ראשי
cur.executemany(
    "INSERT OR IGNORE INTO DeviceInventory (device_id, hostname, ip_address) VALUES (?, ?, ?)",
    records_to_insert,
)
conn.commit()
conn.close()</code></pre>
      <p>שימו לב לפרמטר <code>encoding="utf-8"</code>: הוא מבטיח קריאה נכונה של תווים רב-בייטיים ועברית. הקוד לעיל מדגים הגנה רב-שכבתית: אימות מבנה קלט, המרת טיפוסים קפדנית, מניעת כפילויות מובנית במסד, וקשירה פרמטרית מלאה המונעת הזרקת SQL.</p>
    `,
  }
);
