UNIT7.sections.push(
  {
    id: "u7-intro",
    title: "מבוא: בסיסי נתונים, הזרקות SQL וקוד נקי",
    html: `
      <p>ברוכים הבאים ליחידה 7! יחידה זו מחברת בין שלושה עולמות מרכזיים במדעי המחשב ובאבטחת מידע: ניהול <strong>בסיסי נתונים (Databases)</strong>, הגנה הרמטית מפני <strong>הזרקת SQL (SQL Injection - SQLi)</strong>, וכתיבת <strong>קוד נקי (Clean Code)</strong> ודפנסיבי.</p>
      <p>במרבית המערכות המודרניות (כגון שרתי רשת, אפליקציות מובייל ושירותי ענן שפגשנו ביחידה 6), היישום אינו שומר את כל המידע בזיכרון ה-RAM וגם לא בקובצי טקסט פשוטים, אלא מסתמך על מנוע מסד נתונים. התקשורת מול המנוע מתבצעת באמצעות שפת שאילתות הנקראת <strong>SQL (Structured Query Language)</strong>.</p>
      <p>אולם, כאן טמונה סכנה אבטחתית עצומה: כאשר מתכנת בונה את פקודת ה-SQL על ידי <strong>שרשור מחרוזות גולמי (String Concatenation)</strong> עם קלט שהתקבל מהמשתמש, המנוע אינו מסוגל להבדיל בין הוראות התוכנית המקוריות לבין הטקסט החיצוני. כתוצאה מכך, קלט נתונים הופך לתחביר פקודה פעיל — בדיוק כפי שפונקציית <code>eval</code> ביחידה 4 הפכה מחרוזת לקוד פייתון פעיל! ערבוב זה בין ערוץ הבקרה (Control Plane) לערוץ הנתונים (Data Plane) הוא המקור לפרצת הזרקת SQL.</p>
      <p>כדי להתגונן באופן מוחלט, נלמד ליישם <strong>שאילתות פרמטריות (Parameterized Queries / Prepared Statements)</strong>: מנגנון שבו שלד השאילתה מוגדר ומקומפל מראש, והקלט מוזרם כנתון בלבד (Literal Value) שאינו מסוגל לשנות את התחביר. בנוסף, נראה כיצד עקרונות תכנון כגון <strong>SOLID</strong>, פשטות (<strong>KISS</strong>), מניעת כפילויות (<strong>DRY</strong>) ושימוש בחיתוך מוקדם (<strong>Guard Clauses</strong>) מייצרים קוד קריא, קל לבדיקה ועמיד מפני כשלי אבטחה חמורים.</p>
    `,
  },
  {
    id: "u7-db",
    title: "בסיס נתונים (Database) ומודל הנתונים היחסי",
    html: `
      <p><strong>בסיס נתונים (Database)</strong> הוא מערכת תוכנה ייעודית לאחסון, ניהול, אחזור וארגון יעיל של נתונים במחשב. מדוע מערכות אמיתיות אינן מסתפקות בקובץ טקסט פשוט (כגון <code>records.txt</code> או קובץ JSON)?</p>
      <ul>
        <li><strong>שליפה מהירה ואינדוקס (Indexing):</strong> בקובץ טקסט רגיל, כדי לאתר משתמש לפי כתובת דוא"ל יש לסרוק את כל הקובץ מהתחלתו ועד סופו — פעולה בעלת סיבוכיות זמן לינארית \(O(n)\). בסיס נתונים מחזיק מבני נתונים מהירים הנקראים <strong>אינדקסים (Indexes)</strong>, המבוססים לרוב על עצי B-Tree או טבלאות גיבוב, ומאפשרים איתור שורות בסיבוכיות לוגריתמית \(O(\log n)\) בשבריר שנייה.</li>
        <li><strong>גישה מקבילית ובקרת התנגשויות (Concurrency Control):</strong> כאשר עשרות משתמשים או תהליכים מנסים לקרוא ולכתוב לאותו קובץ טקסט בו-זמנית, הם עלולים לדרוס זה את נתוניו של זה (Race Conditions) או להשחית את הקובץ. מנוע בסיס הנתונים מנהל נעילות ותנועות (Transactions) המונעות התנגשויות.</li>
        <li><strong>תנועות ועמידות (ACID Transactions):</strong> מסד נתונים מספק ערובה לארבעת עקרונות ACID:
          <strong>אטומיות (Atomicity)</strong> — פעולה מורכבת מתבצעת כולה או מתבטלת כולה (הכל או כלום);
          <strong>עקביות (Consistency)</strong> — המעבר הוא רק בין מצבים חוקיים של הנתונים;
          <strong>בידוד (Isolation)</strong> — תנועות מקבילות אינן משבשות זו את זו;
          <strong>עמידות (Durability)</strong> — נתונים שנשמרו ישרדו גם קריסת שרת או הפסקת חשמל פתאומית (בזכות מנגנון יומן פעולות מקדים, Write-Ahead Logging / WAL).</li>
        <li><strong>אכיפת טיפוסים ואילוצים (Constraints &amp; Data Types):</strong> מסד נתונים אוכף ששדה מספרי יכיל אך ורק מספרים, שערכים מסוימים לא יישארו ריקים (<code>NOT NULL</code>), ושמזהים יהיו ייחודיים לחלוטין (<code>UNIQUE</code>).</li>
      </ul>
      <p>הקורס מתמקד ב־<strong>מודל היחסי (Relational Model)</strong>: במודל זה, כל המידע מאורגן בתוך <strong>טבלאות (Tables)</strong> המורכבות משורות (רשומות - Records/Rows) ומעמודות (Columns/Fields) בעלות טיפוסים מוגדרים, כאשר קשרים לוגיים מקשרים בין טבלאות שונות.</p>
      <div class="panel">
        <p><strong>ארכיטקטורת לקוח-שרת במסדי נתונים:</strong> היישום שלנו (בין אם זה סקריפט CGI, שרת פייתון או תוכנית C++) אינו ניגש ישירות לבתים השמורים בדיסק הקשיח. היישום מתפקד כ־<strong>לקוח (Client)</strong> הפונה אל <strong>מנוע בסיס הנתונים (Database Engine)</strong> ומבקש ממנו לבצע פעולות. מכיוון שהתקשורת נעשית באמצעות ניסוח בקשות טקסטואליות, אם קלט לא מהימן מהמשתמש מתערבב בניסוח הבקשה, הוא מעוות את מהות הבקשה עצמה!</p>
      </div>
      <p><strong>הקשר אבטחת מידע (משולש ה־CIA):</strong></p>
      <ul>
        <li><strong>סודיות (Confidentiality):</strong> הבטחה שרק משתמשים בעלי הרשאה מתאימה יורשו לקרוא נתונים רגישים (למשל, לקוח לא יוכל לראות כרטיסי אשראי או רשומות רפואיות של משתמש אחר). הזרקת SQL מאפשרת עקיפת מנגנוני סינון ושליפת כל נתוני המאגר.</li>
        <li><strong>שלמות (Integrity):</strong> הבטחה שמידע לא ישונה, יימחק או יתווסף על ידי גורם בלתי מורשה (למשל, מניעת עדכון שרירותי של יתרות בנק או איפוס סיסמאות). הזרקת SQL בערוצי עדכון ומחיקה עלולה להשחית את המידע לחלוטין.</li>
        <li><strong>זמינות (Availability):</strong> מניעת נעילת המסד, מניעת הצפות של שאילתות חישוב כבדות המשתקות את השרת (Denial of Service), והבטחת גיבוי ושחזור שוטפים. פרצות הזרקת SQL המריצות פקודות מחיקת טבלאות פוגעות בזמינות המערכת באופן קטסטרופלי.</li>
      </ul>
    `,
  },
  {
    id: "u7-sql",
    title: "SQL — שפה הצהרתית (Declarative Language)",
    html: `
      <p><strong>SQL (Structured Query Language)</strong> היא שפת המחשב הסטנדרטית בעולם לתקשורת, שאילתה וניהול של מסדי נתונים יחסיים. מאפיינה המהותי ביותר הוא היותה <strong>שפה הצהרתית (Declarative Language)</strong>, בניגוד לשפות ציוויות שפגשנו עד כה.</p>
      
      <p><strong>מה ההבדל בין שפה ציוויית לשפה הצהרתית?</strong></p>
      <ul>
        <li><strong>שפה ציוויית (Imperative Language):</strong> שפות כגון C++ או Python, שבהן המתכנת מפרט במדויק <em>כיצד (How)</em> לבצע כל שלב חישובי: הקצאת משתנים, לולאות, תנאים ומניפולציות זיכרון.</li>
        <li><strong>שפה הצהרתית (Declarative Language):</strong> ב-SQL, המתכנת רק מתאר <em>מה (What)</em> המידע המבוקש. מנוע מסד הנתונים מפעיל רכיב פנימי מתקדם בשם <strong>מייעל שאילתות (Query Optimizer)</strong>, הקובע את תוכנית הביצוע היעילה ביותר — האם לסרוק את הטבלה כולה (Full Table Scan) או לשלוף את השורות דרך אינדקס B-Tree מהיר.</li>
      </ul>

      <p><strong>השוואת קוד: שפה ציוויית מול שפה הצהרתית:</strong></p>
      <pre class="code"><code># גישה ציוויית (Python): פירוט מלא של דרך הביצוע צעד-אחר-צעד
urgent_tickets = []
for ticket in all_tickets:
    if ticket["status"] == "OPEN" and ticket["priority"] >= 4:
        urgent_tickets.append(ticket["title"])

-- גישה הצהרתית (SQL): הגדרת תוצאת המטרה בלבד, המנוע מייעל את הסריקה
SELECT title FROM SupportTickets WHERE status = 'OPEN' AND priority >= 4;</code></pre>

      <div class="panel">
        <p><strong>אנלוגיית הספרן ומשמעותה הביטחונית:</strong></p>
        <p>דמיינו שאתם נכנסים לספרייה עצומה בת מיליון ספרים. בשפה ציוויית, הייתם צריכים ללכת בעצמכם למדף מספר 7, לבדוק ספר אחר ספר בלולאה, ולהשוות את שם המחבר. בשפה הצהרתית, אתם פשוט פונים לספרן בדלפק ומצהירים: "אנא הבא לי את כל הספרים שכתב ש"י עגנון". הספרן (מנוע ה-DB) מכיר את קטלוג הספרייה, יודע בדיוק איפה כל ספר נמצא, ומגיש לכם את התוצאה.</p>
        <p><strong>המחיר הביטחוני:</strong> המחרוזת שאתם מוסרים לספרן איננה 'סתם טקסט' — <strong>היא תוכנית פעולה ברת-ביצוע</strong> עבור המנוע. אם קורא זדוני יוסיף לטופס הבקשה שלו הוראה נוספת (כמו: "...וגם תשרוף את כל שאר הספרים באגף!"), והספרן יקרא זאת כחלק מההוראות — הספרייה תיהרס. מי ששולט בתוכן המחרוזת — שולט לחלוטין בפעולת המנוע!</p>
      </div>
    `,
  },
  {
    id: "u7-sub",
    title: "תת-שפות ב-SQL: הגדרה, מניפולציה, שאילתה ובקרה (DDL, DML, DQL, DCL)",
    html: `
      <p>שפת SQL מאגדת בתוכה מגוון פקודות. כדי להבין מה כל פקודה עושה ואיזה יעד אבטחה (מסודיות ועד זמינות) היא עלולה לסכן, מקובל לחלק את פקודות השפה לארבע <strong>תת-שפות</strong>:</p>
      <ul>
        <li>
          <strong>1. שפת שאילתות נתונים (Data Query Language - DQL):</strong>
          פקודות המשמשות לקריאה ושליפה בלבד של נתונים מתוך הטבלאות, ללא שינוי מצב המסד. הפקודה המרכזית היא <code>SELECT</code>:
          <pre class="code"><code>SELECT account_id, balance, status FROM Accounts WHERE balance > 1000.0;</code></pre>
          <em>סיכון אבטחה:</em> הזרקת SQL בערוץ DQL עלולה לחשוף נתונים סודיים (כמו סיסמאות, מספרי אשראי או רשומות רפואיות) ולרמוס את ה<strong>סודיות (Confidentiality)</strong>.
        </li>
        <li>
          <strong>2. שפת מניפולציית נתונים (Data Manipulation Language - DML):</strong>
          פקודות המשמשות להוספה, שינוי ומחיקה של שורות ורשומות בתוך הטבלאות הקיימות:
          <pre class="code"><code>-- הוספת רשומה חדשה
INSERT INTO Accounts (account_id, balance, status) VALUES (201, 1500.0, 'ACTIVE');

-- עדכון שדות ברשומות קיימות
UPDATE Accounts SET balance = balance + 200.0 WHERE account_id = 201;

-- מחיקת רשומות
DELETE FROM Accounts WHERE account_id = 201;</code></pre>
          <em>סיכון אבטחה:</em> הזרקה ב-DML מאפשרת לתוקף לשנות יתרות חשבון, לשנות סיסמאות או למחוק רשומות — פגיעה קשה ב<strong>שלמות (Integrity)</strong> וב<strong>זמינות (Availability)</strong>.
        </li>
        <li>
          <strong>3. שפת הגדרת נתונים (Data Definition Language - DDL):</strong>
          פקודות המגדירות ומשנות את מבנה מסד הנתונים עצמו (הסכמה):
          <pre class="code"><code>-- יצירת טבלה
CREATE TABLE Accounts (
    account_id INTEGER PRIMARY KEY,
    balance REAL NOT NULL,
    status TEXT NOT NULL
);

-- שינוי מבנה עמודות קיים
ALTER TABLE Accounts ADD COLUMN email TEXT;

-- מחיקת טבלה שלמה על כל תוכנה
DROP TABLE Accounts;</code></pre>
          <em>סיכון אבטחה:</em> הרצת פקודת DDL זדונית עלולה למחוק טבלאות שלמות של הארגון ברגע (<code>DROP TABLE</code>), דבר המוביל להרס מוחלט של <strong>זמינות</strong> ו<strong>שלמות</strong> המערכת.
        </li>
        <li>
          <strong>4. שפת בקרת נתונים (Data Control Language - DCL):</strong>
          פקודות לניהול הרשאות גישה של משתמשים ותפקידים במסד הנתונים:
          <pre class="code"><code>-- הענקת הרשאות קריאה וכתיבה ממוקדות למשתמש האפליקציה
GRANT SELECT, INSERT, UPDATE ON Accounts TO 'app_service'@'localhost';

-- שלילת הרשאות מסוכנות
REVOKE DROP, ALTER, DELETE ON Accounts FROM 'app_service'@'localhost';</code></pre>
          <em>הגנה דפנסיבית:</em> יישום <strong>עקרון ההרשאה המינימלית (Principle of Least Privilege)</strong> דורש שחשבון המסד שבו משתמשת אפליקציית האינטרנט יוגדר ללא שום הרשאות DDL או DCL. אם האפליקציה רק צריכה לקרוא ולרשום הזמנות, אין לה שום סיבה להחזיק בהרשאה למחוק טבלאות (<code>DROP</code>)!
        </li>
      </ul>
    `,
  },
  {
    id: "u7-tab",
    title: "טבלאות, עמודות, מפתח ראשי ומפתח זר (Primary & Foreign Keys)",
    html: `
      <p>במסד נתונים יחסי, המידע מאורגן בצורה היררכית ומובנית היטב:</p>
      <ul>
        <li><strong>טבלה (Table):</strong> אוסף של רשומות (שורות - Rows/Records) המכילות מידע על ישות מסוימת (כגון חשבונות, מוצרים או מנויים).</li>
        <li><strong>עמודות (Columns / Fields):</strong> לכל עמודה בטבלה יש שם וטיפוס נתונים מוגדר: למשל מספר שלם (<code>INT</code> או <code>INTEGER</code>), מחרוזת מוגבלת באורך (<code>VARCHAR(255)</code>), טקסט חופשי (<code>TEXT</code>), או מספר ממשי (<code>REAL</code> / <code>FLOAT</code>).</li>
        <li><strong>מפתח ראשי (Primary Key):</strong> עמודה אחת (או צירוף עמודות) המזהה כל שורה בטבלה באופן ייחודי וחד-משמעי (Unique). מפתח ראשי אינו יכול להכיל ערך ריק (<code>NOT NULL</code>) ואוסר כפילויות לחלוטין (למשל, מזהה מספרי רץ <code>account_id</code>).</li>
        <li><strong>מפתח זר (Foreign Key):</strong> עמודה בטבלה אחת המצביעה על מפתח ראשי בטבלה אחרת. המפתח הזר יוצר את הקשר הלוגי (Relationship) בין הטבלאות ומבטיח <strong>שלמות התייחסותית (Referential Integrity)</strong> — כלומר, מנוע המסד יאסור יצירת מנוי עבור חשבון שאינו קיים כלל במערכת!</li>
      </ul>
      <div class="panel">
        <p><strong>דוגמה מעשית והקשר האבטחה של פסוקית <code>WHERE</code>:</strong></p>
        <p>נניח שיש לנו טבלת חשבונות <code>Accounts</code> עם מפתח ראשי <code>account_id</code>, וטבלת מנויים <code>Subscriptions</code> שבה עמודת <code>account_id</code> היא מפתח זר המפנה לחשבון. כאשר מנהל מעדכן מנוי עבור לקוח ספציפי, השאילתה המתוכננת אמורה לעדכן שורה בודדת בלבד:</p>
        <pre class="code"><code>UPDATE Subscriptions SET is_active = 1, tier = 'PREMIUM' WHERE account_id = 1042;</code></pre>
        <p>פסוקית <code>WHERE</code> היא המחסום הלוגי שמגדיר בדיוק אילו שורות יושפעו מהפעולה. אם תוקף מצליח להזריק ביטוי שהופך את התנאי לתמיד-אמת (Tautology), כגון הוספת <code>OR 1=1</code> לקלט:</p>
        <pre class="code"><code>UPDATE Subscriptions SET is_active = 1, tier = 'PREMIUM' WHERE account_id = 1042 OR 1=1;</code></pre>
        <p>התנאי מתקיים עבור <strong>כל השורות בטבלה</strong>! כתוצאה מכך, פעולת העדכון תשדרג את כל המנויים של כל הלקוחות במערכת ללא תשלום, או במקרה של פקודת <code>DELETE</code> — תמחק את כל המנויים במסד בבת אחת — אסון מוחלט לשלמות ולזמינות המידע.</p>
      </div>
    `,
  }
);
