UNIT7.sections.push({
  id: "u7-hw",
  title: "תרגילי SQL מהמרצה",
  html: `
<p>להלן פתרונות מודרכים לשאלות SQLite מבחינות עבר של המרצה. בכל הפתרונות הקלט החיצוני נקשר אך ורק באמצעות מצייני מקום (<code>?</code>) ושאילתות פרמטריות, ללא שרשור מחרוזות. השאלות מובאות בתוך תיבות נפתחות לתרגול עצמי:</p><details class="fold"><summary>2021א · שקע וטבלת הודעות</summary><div class="fold-body"><p><strong>מה המטרה ומבנה הנתונים:</strong> שאלת מבחן מקורית (2021א, שאלה 5). התרגיל דורש שילוב מלא בין תקשורת רשת מבוססת שקעים (TCP Sockets) לבין שמירת נתונים במסד SQLite מקומי: קריאת קובץ בינארי מהדיסק, שידור תוכנו לשרת מרוחק, קליטת התשובה, הדפסת חמש השורות הראשונות של המענה, ואחסונן המאובטח בטבלת SQLite בעלת מפתח ראשי ייחודי לכל הודעה.</p><pre class="code"><code>import socket
import sqlite3
HOST = "119.4.7.5"
PORT = 8080
def read_message():
    with open("message.txt", "rb") as f:
        return f.read()
def receive_answer(sock):
    answer = sock.recv(128)
    text = answer.decode("utf-8")
    return text.splitlines()[:5]
def communicate_with_server(message):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((HOST, PORT))
        sock.sendall(message)
        return receive_answer(sock)
def save_messages(messages):
    conn = sqlite3.connect("messages.db")
    conn.executescript("""
        CREATE TABLE messages(
            MessageNumber int NOT NULL PRIMARY KEY,
            MessageText varchar(128)
        );
    """)
    cur = conn.cursor()
    for i, message in enumerate(messages, 1):
        cur.execute("INSERT INTO messages VALUES (?, ?)", [i, message])
    conn.commit()
    conn.close()
def main():
    try:
        message = read_message()
        messages = communicate_with_server(message)
        for message in messages:
            print(message)
        save_messages(messages)
    except (OSError, UnicodeError, sqlite3.Error) as error:
        print("Error:", error)
main()</code></pre><p><strong>איך הקוד עובד (שורה אחר שורה):</strong></p><ul><li><code>read_message()</code>: פותח את הקובץ <code>message.txt</code> במצב קריאת בתים (<code>"rb"</code>) באמצעות מנהל הקשר (<code>with open</code>) המבטיח סגירה אוטומטית של הקובץ גם אם נזרקת שגיאה, ומחזיר את הבתים הגולמיים (<code>f.read()</code>).</li><li><code>receive_answer(sock)</code>: קורא עד 128 בתים מהשקע (<code>sock.recv(128)</code>), מפענח את מערך הבתים למחרוזת UTF-8 (<code>answer.decode("utf-8")</code>), מפצל את הטקסט לשורות לפי תווי סוף שורה (<code>text.splitlines()</code>), ומחזיר חיתוך (Slice) של עד חמש השורות הראשונות בלבד (<code>[:5]</code>).</li><li><code>communicate_with_server(message)</code>: יוצר שקע TCP ב-IPv4 (<code>socket.AF_INET, socket.SOCK_STREAM</code>) תחת מנהל הקשר <code>with</code> הסוגר את השקע בסיום. מתחבר לכתובת היעד (<code>sock.connect((HOST, PORT))</code>), משדר את כל הבתים בבטחה בעזרת <code>sock.sendall(message)</code> (המבטיחה שכל הבתים ישודרו בלולאה פנימית), ומפעיל את פונקציית הקליטה.</li><li><code>save_messages(messages)</code>: מתחבר לקובץ מסד הנתונים <code>messages.db</code> (אם אינו קיים, SQLite יוצר אותו אוטומטית). מריץ פקודת DDL באמצעות <code>conn.executescript()</code> ליצירת טבלת <code>messages</code> בעלת מפתח ראשי <code>MessageNumber int NOT NULL PRIMARY KEY</code> ועמודת תוכן <code>MessageText varchar(128)</code>.</li><li><em>הזנה פרמטרית בלולאה:</em> פותח סמן (Cursor) ורץ בלולאת <code>for i, message in enumerate(messages, 1):</code> כאשר <code>enumerate</code> מייצר מונה מספרי המתחיל מ-1. לכל הודעה מתבצעת שאילתה פרמטרית <code>cur.execute("INSERT INTO messages VALUES (?, ?)", [i, message])</code>. בסיום, מבוצע <code>conn.commit()</code> לכתיבה קבועה לדיסק ו-<code>conn.close()</code> לשחרור המשאבים.</li><li><code>main()</code>: מנהל את רצף הפעולות בתוך בלוק <code>try-except</code> התופס שלוש מחלקות חריגה: <code>OSError</code> (לשגיאות קובץ או רשת), <code>UnicodeError</code> (לכשלי פענוח תווים ב-decode), ו-<code>sqlite3.Error</code> (לשגיאות מסד נתונים), ומדפיס הודעת שגיאה מסודרת במקום קריסת התוכנית.</li></ul><p><strong>מוקשי בחינה ודגשים דפנסיביים:</strong></p><ul><li><em>מלכודת הזרם (TCP Streaming) ב-recv:</em> קריאת <code>sock.recv(128)</code> יחידה היא מוקש בחינה קלאסי מתחום הרשתות (יחידה 5). פרוטוקול TCP אינו שומר על גבולות הודעה (Message Boundaries); אם תשובת השרת מפוצלת בין מקטעי רשת (Packets), הקריאה עלולה להחזיר רק חלק מחמש השורות. בקוד ייצור דפנסיבי נדרש מנגנון מסגור (Framing) או קריאה בלולאה עד קבלת תו מוסכם.</li><li><em>ההבדל בין executescript ל-execute:</em> פונקציית <code>conn.executescript()</code> מסוגלת להריץ מספר פקודות SQL המופרדות בנקודה-פסיק במחרוזת אחת, אך היא <strong>אינה תומכת</strong> במצייני מקום (<code>?</code>). לכן, השימוש בה בטוח אך ורק עבור מחרוזת סטטית קבועה בקוד (כמו יצירת הטבלה). כאשר מזינים נתוני משתמש (הודעות), חובה להשתמש ב-<code>cur.execute</code> עם מצייני מקום <code>?</code>.</li><li><em>העברת פרמטרים כרשימה (<code>[i, message]</code>):</em> פונקציית <code>execute</code> מקבלת מבנה איטרבילי (Sequence). המרצה בחר להעביר רשימה (List) במקום Tuple; שניהם תקינים לחלוטין בפייתון, אך שימוש ברשימה מונע את הבאג השכיח של שכחת פסיק בטאפל של איבר בודד.</li><li><em>שכחת commit וסגירת משאבים:</em> פעולות כתיבה (INSERT/UPDATE/DELETE) ב-SQLite אינן נשמרות פיזית בקובץ הדיסק ללא קריאה מפורשת ל-<code>conn.commit()</code>. השמטת שורה זו תוביל לכך שהטבלה תיווצר אך תישאר ריקה לחלוטין עם סגירת התוכנית!</li></ul></div></details><details class="fold"><summary>2021א (75/78) · Students לפי שם</summary><div class="fold-body"><p><strong>מה המטרה ומבנה הנתונים:</strong> שאלת מבחן מקורית (2021א מועד 75/78, שאלה 5). השאלה בודקת יכולת עבודה עם מודול <code>sqlite3</code> בפייתון, הקמת סכמה עם אילוץ מפתח ראשי (<code>PRIMARY KEY</code>), הזנת נתוני דוגמה, וקליטת קלט משתמש לצורך שליפה מסוננת של עמודת חוג הלימודים (<code>Major</code>) תוך מניעת הזרקת SQL וטיפול מסודר במצב שבו הערך אינו קיים בטבלה.</p><pre class="code"><code>import sqlite3
conn = sqlite3.connect("server.db")
conn.executescript("""
    CREATE TABLE Students(
        Name varchar(255),
        Id int NOT NULL PRIMARY KEY,
        Major varchar(255)
    );
    INSERT INTO Students VALUES ("Miri Regev", 1001, "Computer Science");
    INSERT INTO Students VALUES ("Dana Cohen", 1002, "Mathematics");
""")
conn.commit()
conn.close()
conn = sqlite3.connect("server.db")
cur = conn.cursor()
name = input("Enter student name: ")
cur.execute("SELECT * FROM Students WHERE Name = ?", [name])
rows = cur.fetchall()
if len(rows) > 0:
    print(rows[0][2])
else:
    print("Student not found")
conn.close()</code></pre><p><strong>איך הקוד עובד (שורה אחר שורה):</strong></p><ul><li>הקוד פותח התחברות ראשונית ל-<code>server.db</code>, מריץ תסריט <code>executescript</code> המכיל פקודת DDL ליצירת טבלת <code>Students</code> (עם עמודות <code>Name</code>, <code>Id</code> כמפתח ראשי, ו-<code>Major</code>) ושתי פקודות INSERT המזינות סטודנטים לדוגמה.</li><li>מבצע <code>conn.commit()</code> כדי לקבע את השינויים בדיסק וסוגר את החיבור ב-<code>conn.close()</code>.</li><li>פותח מחדש חיבור למסד הנתונים ויוצר אובייקט סמן (<code>cur = conn.cursor()</code>) לביצוע שאילתות ושליפת תוצאות.</li><li>קולט שם מהמשתמש באמצעות <code>name = input("Enter student name: ")</code>.</li><li>מריץ שאילתה פרמטרית מוגנת: <code>cur.execute("SELECT * FROM Students WHERE Name = ?", [name])</code>. סימן השאלה (<code>?</code>) משמש כמציין מקום (Placeholder), והמשתנה <code>name</code> מועבר כאיבר ברשימה <code>[name]</code>. מנוע ה-DB קושר את הערך כנתון ליטרלי בלבד.</li><li><code>rows = cur.fetchall()</code> שולף את כל השורות התואמות בצורת רשימת טאפלים (למשל: <code>[('Dana Cohen', 1002, 'Mathematics')]</code>).</li><li>התנאי <code>if len(rows) > 0:</code> בודק האם נמצאה לפחות שורה אחת. אם כן, מודפס הערך באינדקס 2 של השורה הראשונה (<code>rows[0][2]</code>) — המייצג את עמודת <code>Major</code>. אם הרשימה ריקה, מודפסת ההודעה <code>"Student not found"</code>.</li><li>סוגר את החיבור באמצעות <code>conn.close()</code> לשחרור נעילת הקובץ.</li></ul><p><strong>מוקשי בחינה ודגשים דפנסיביים:</strong></p><ul><li><em>מלכודת הזרקת ה-SQL (SQL Injection Trap):</em> אם במקום מציין מקום <code>?</code> המתכנת היה כותב שרשור: <code>cur.execute(f"SELECT * FROM Students WHERE Name = '{name}'")</code>, תוקף שהיה מזין <code>' OR '1'='1</code> היה גורם להחזרת כל הרשומות בטבלה. שימוש ב-<code>?</code> מונע זאת לחלוטין כי הקלט לעולם אינו מפורסר כחלק מעץ התחביר של השאילתה.</li><li><em>מלכודת קריסה עקב אינדוקס (IndexError):</em> אם משתמש מקליד שם שלא קיים במסד, <code>fetchall()</code> מחזירה רשימה ריקה <code>[]</code>. גישה ישירה ל-<code>rows[0]</code> ללא בדיקת <code>if len(rows) > 0</code> הייתה זורקת <code>IndexError: list index out of range</code> ומפילה את התוכנית! בדיקת האורך היא רכיב קריטי בקוד דפנסיבי.</li><li><em>הסתמכות שברירית על SELECT *:</em> הקוד שולף <code>SELECT *</code> וניגש לאינדקס 2 (<code>rows[0][2]</code>). גישה זו מניחה שהעמודה השלישית היא תמיד <code>Major</code>. אם מפתח ישנה בעתיד את סדר העמודות ב-CREATE TABLE או יוסיף עמודה באמצע, הקוד ישלוף שדה שגוי! תכנות דפנסיבי נכון מחייב שליפה מפורשת: <code>SELECT Major FROM Students WHERE Name = ?</code> וגישה ל-<code>rows[0][0]</code>.</li><li><em>גרשיים כפולים לעומת גרש בודד ב-SQL:</em> בפקודת ה-INSERT בקוד המקורי נכתבו מחרוזות בגרשיים כפולים (<code>"Miri Regev"</code>). ב-SQLite זה עובד כמחרוזת רק משום שאין עמודה בשם כזה, אך בתקן ANSI SQL ובמנועים כמו PostgreSQL גרשיים כפולים שמורים לשמות עמודות ומזהים, והדבר היה גורם לשגיאה. תמיד מומלץ להשתמש בגרש בודד (<code>'Miri Regev'</code>) לערכי מחרוזות.</li></ul></div></details><details class="fold"><summary>2021ג · Students ו־School</summary><div class="fold-body"><p><strong>מה המטרה ומבנה הנתונים:</strong> שאלת מבחן מקורית (2021ג, שאלה 5). התרגיל מדגים שליפה ממוקדת של עמודה בודדת (<code>School</code>) מתוך טבלת סטודנטים לפי שם הנקלט מהקלט הסטנדרטי. המטרה היא להדגים שימוש נכון בשאילתה פרמטרית, גישה מדויקת לאינדקס התוצאה, ועקרון המידור (Principle of Least Privilege) ברמת השאילתה.</p><pre class="code"><code>import sqlite3
conn = sqlite3.connect("server.db")
conn.executescript("""
    CREATE TABLE Students(
        Name varchar(255),
        Id int NOT NULL PRIMARY KEY,
        School varchar(255)
    );
    INSERT INTO Students VALUES ("Yifat Shaha-Biton", 2001, "Open University");
    INSERT INTO Students VALUES ("Dana Cohen", 2002, "Technion");
""")
conn.commit()
conn.close()
conn = sqlite3.connect("server.db")
cur = conn.cursor()
name = input()
cur.execute("SELECT School FROM Students WHERE Name = ?", [name])
rows = cur.fetchall()
if len(rows) > 0:
    print(rows[0][0])
conn.close()</code></pre><p><strong>איך הקוד עובד (שורה אחר שורה):</strong></p><ul><li>יוצר את טבלת <code>Students</code> בעזרת <code>executescript</code> עם העמודות <code>Name</code>, <code>Id</code> כמפתח ראשי המבטיח ייחודיות, ו-<code>School</code>, ומזין שתי רשומות הדגמה ("Yifat Shaha-Biton" ב-"Open University", ו-"Dana Cohen" ב-"Technion").</li><li>מבצע <code>conn.commit()</code> כדי לשמור את הטבלה לדיסק, וסוגר את החיבור הראשוני ב-<code>conn.close()</code>.</li><li>מתחבר שוב ל-<code>server.db</code> ומייצר סמן <code>cur = conn.cursor()</code>.</li><li>קולט מחרוזת מהמשתמש באמצעות <code>name = input()</code> (ללא הודעת הנחיה, בהתאם לדרישות בדיקה אוטומטית במבחן).</li><li>מריץ שאילתת שליפה ממוקדת: <code>cur.execute("SELECT School FROM Students WHERE Name = ?", [name])</code>. השאילתה דורשת רק את העמודה <code>School</code> וקושרת את <code>[name]</code> באופן פרמטרי מוגן.</li><li><code>rows = cur.fetchall()</code> אוסף את כל השורות התואמות. מכיוון שנשלפה עמודה יחידה, כל איבר ברשימה הוא טאפל של איבר בודד, למשל: <code>[('Technion',)]</code>.</li><li>התנאי <code>if len(rows) > 0:</code> מאמת שנמצאה התאמה, והפקודה <code>print(rows[0][0])</code> מדפיסה את האיבר הראשון של השורה הראשונה — שהוא הערך של <code>School</code>.</li><li>סוגר את החיבור בסיום בעזרת <code>conn.close()</code>.</li></ul><p><strong>מוקשי בחינה ודגשים דפנסיביים:</strong></p><ul><li><em>שליפה ממוקדת לעומת <code>SELECT *</code>:</em> בניגוד לשאלה מ-2021א, כאן ננקט דפוס נכון בהרבה: השאילתה שולפת אך ורק <code>SELECT School</code>. מבחינה דפנסיבית הדבר מונע זליגת מידע רגיש לערוצי זיכרון (עקרון המידור) ומבטיח שהאינדקס <code>rows[0][0]</code> תמיד יצביע לעמודה המבוקשת ללא תלות בשינויי סכמה עתידיים.</li><li><em>טיפול בקלט ריק ורווחים עודפים:</em> הפונקציה <code>input()</code> קולטת את המחרוזת כמות שהיא. השוואת שוויון ב-SQL (<code>WHERE Name = ?</code>) היא רגישה לרווחים: אם המשתמש יקיש בטעות <code>"Dana Cohen "</code> (עם רווח בסוף), השאילתה לא תמצא התאמה. בקוד דפנסיבי מומלץ לבצע <code>name = name.strip()</code> לפני השאילתה.</li><li><em>סגירת חיבור בבלוק סופי (Resource Cleanup):</em> אם מתרחשת שגיאת תקשורת או קריאה במהלך הריצה, הקריאה ל-<code>conn.close()</code> שבסוף הקוד לא תתבצע ומשאב הקובץ יישאר נעול. הנוהג הדפנסיבי המומלץ בפייתון הוא שימוש ב-Context Manager: <code>with sqlite3.connect(...) as conn:</code>.</li><li><em>שאלת בחינה שכיחה — מה מודפס אם הסטודנט לא קיים?</em> אם לא נמצא סטודנט תואם, <code>len(rows)</code> יהיה 0 והתוכנית תסיים את ריצתה מבלי להדפיס דבר (ולא תקרוס). במבחן יש לשים לב האם השאלה דרשה להדפיס הודעת שגיאה במקרה כזה או לא להדפיס כלל.</li></ul></div></details><details class="fold"><summary>2026א · סעיף ב · FileData מקובץ טקסט</summary><div class="fold-body"><p><strong>מה המטרה ומבנה הנתונים:</strong> שאלת מבחן מקורית (2026א, שאלה 5 סעיף ב'). סעיף א' בבחינה דרש הקמת שרת קבצים ב-C++ עם ספריית Boost.Asio (נושא שנלמד ביחידה 5). כאן מובא סעיף ב' בלבד: כתיבת סקריפט בפייתון שקורא קובץ טקסט מקומי (<code>data.txt</code>), ומזין כל שורה לטבלת SQLite בשם <code>FileData</code> תוך מספור השורות כמפתח ראשי עולה (<code>LineNumber</code>) ושמירת תוכן השורה המנוקה מתווי ירידת שורה (<code>Content</code>), תוך שימוש בשאילתות פרמטריות.</p><pre class="code"><code>import sqlite3
conn = sqlite3.connect("file_data.db")
conn.executescript("""
    CREATE TABLE FileData(
        LineNumber int NOT NULL PRIMARY KEY,
        Content varchar(1024)
    );
""")
cur = conn.cursor()
with open("data.txt", "r", encoding="utf-8") as f:
    line_number = 1
    for line in f:
        cur.execute(
            "INSERT INTO FileData VALUES (?, ?)",
            [line_number, line.rstrip("\\n")]
        )
        line_number += 1
conn.commit()
conn.close()</code></pre><p><strong>איך הקוד עובד (שורה אחר שורה):</strong></p><ul><li><code>conn = sqlite3.connect("file_data.db")</code> פותח חיבור לקובץ המסד.</li><li><code>conn.executescript(...)</code> מגדיר את סכמת הטבלה <code>FileData</code> הכוללת שתי עמודות: <code>LineNumber int NOT NULL PRIMARY KEY</code> (מספר שורה ייחודי שאינו יכול להיות ריק) ו-<code>Content varchar(1024)</code> (תוכן השורה).</li><li><code>cur = conn.cursor()</code> יוצר סמן לביצוע השאילתות.</li><li><code>with open("data.txt", "r", encoding="utf-8") as f:</code> פותח את קובץ הטקסט לקריאה עם קידוד מפורש ומבטיח את סגירת הקובץ מיד עם היציאה מהבלוק.</li><li><code>line_number = 1</code> מאתחל את מונה השורות למספר השורה הראשון.</li><li><em>איטרציה יעילה על שורות הקובץ:</em> <code>for line in f:</code> קורא את השורות ישירות מהאיטרטור של הקובץ אחת-אחת (Memory Streaming), מבלי לטעון את כל הקובץ בבת-אחת לזיכרון ה-RAM (חיוני בקבצים גדולים).</li><li><em>שאילתה פרמטרית וניקוי תו סוף שורה:</em> <code>cur.execute("INSERT INTO FileData VALUES (?, ?)", [line_number, line.rstrip("\\n")])</code> מזין את השורה כמספר ואת הטקסט המנוקה. הפונקציה <code>rstrip("\\n")</code> מסירה את תו ירידת השורה מסוף המחרוזת כדי שתוכן השורה יישמר נקי במסד.</li><li><code>line_number += 1</code> מקדם את המונה לקראת השורה הבאה.</li><li>בסיום הלולאה: <code>conn.commit()</code> שומר את כל ההוספות באופן קבוע בדיסק (טרנזקציה יחידה), ו-<code>conn.close()</code> סוגר את החיבור בצורה מסודרת.</li></ul><p><strong>מוקשי בחינה ודגשים דפנסיביים:</strong></p><ul><li><em>הזרקת נתונים מקובץ חיצוני (File Input as Untrusted Source):</em> תוכן קובץ הוא קלט חיצוני בלתי מהימן לכל דבר ועניין! אם המפתח היה משתמש ב-f-string כגון <code>cur.execute(f"INSERT INTO FileData VALUES ({line_number}, '{line}')")</code>, שורה בקובץ שהייתה מכילה תווי גרש או פקודות SQL הייתה גורמת לשגיאת תחביר או להזרקת SQL הרסנית. השימוש במצייני מקום <code>(?, ?)</code> הוא ההגנה היחידה המבטיחה שלמות.</li><li><em>מלכודת ה-rstrip("\\n") מול rstrip():</em> שימו לב לדיוק: נכתב <code>line.rstrip("\\n")</code> ולא <code>line.rstrip()</code> סתמי. קריאה ל-<code>rstrip()</code> ללא ארגומנט הייתה מסירה גם רווחים וטאבים לגיטימיים בסוף השורה; העברת <code>"\\n"</code> מסירה אך ורק את תו מעבר השורה ושומרת על תוכן השורה המקורי במדויק.</li><li><em>מלכודת הרצה חוזרת (PRIMARY KEY Collision):</em> מכיוון ש-<code>LineNumber</code> מוגדר כ-<code>PRIMARY KEY</code>, אם נריץ את הסקריפט פעם נוספת על אותו מסד נתונים, פקודת ה-INSERT הראשונה תיכשל מיד ותזרוק <code>sqlite3.IntegrityError: UNIQUE constraint failed: FileData.LineNumber</code>. בקוד ייצור דפנסיבי ניתן להשתמש ב-<code>INSERT OR REPLACE</code> או <code>INSERT OR IGNORE</code> כדי להתמודד עם כפילויות.</li><li><em>ביצועים בהזנת אצוות (Batch Insertion):</em> הרצת <code>execute</code> נפרד לכל שורה בודדת מייצרת תקורה. אם הקובץ מכיל מיליון שורות, הגישה המיטבית והמומלצת בקורס היא שימוש ב-<code>cur.executemany("INSERT INTO FileData VALUES (?, ?)", ...)</code> בצירוף generator, המבצעת את כל ההוספות באצווה מהירה ומאובטחת.</li><li><em>חשיבות ציון <code>encoding="utf-8"</code>:</em> ב-Windows, ברירת המחדל של <code>open()</code> ללא פרמטר <code>encoding</code> נקבעת לפי ה-Code Page של מערכת ההפעלה (לרוב CP1252 / Windows-1255). אם הקובץ מכיל תווים בעברית או ביוניקוד, הוא עלול להיקרא משובש (Mojibake) או לזרוק <code>UnicodeDecodeError</code>. ציון <code>encoding="utf-8"</code> הוא חובה דפנסיבית.</li></ul></div></details>
  `,
});
