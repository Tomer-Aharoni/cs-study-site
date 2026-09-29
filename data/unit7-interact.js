window.UNIT7_QUIZZES = [
  {
    id: "u7-dbq",
    prompt: "בסיס נתונים במצגת?",
    options: [
      { id: "a", text: "אמצעי לאחסון נתונים במחשב — לרוב במודל טבלאות ושאילתות." },
      { id: "b", text: "רק שקע TCP." },
      { id: "c", text: "רק hypervisor." },
    ],
    answer: "a",
    explain: "היישום הוא לקוח של המנוע. CIA חל גם על שורות בטבלה.",
  },
  {
    id: "u7-sqlq",
    prompt: "SQL לפי המצגת?",
    options: [
      { id: "a", text: "שפה הצהרתית לטיפול ועיבוד מידע." },
      { id: "b", text: "חובה לולאת for על כל שורה בקוד C++." },
      { id: "c", text: "רק פרוטוקול HTTP." },
    ],
    answer: "a",
    explain: "אתם מתארים מה; המנוע מפרסר את המחרוזת כשפה — לכן הדבקת קלט מסוכנת.",
  },
  {
    id: "u7-subq",
    prompt: "CREATE TABLE שייך לאיזו תת-שפה?",
    options: [
      { id: "a", text: "DQL בלבד." },
      { id: "b", text: "DDL — הגדרת מבנה." },
      { id: "c", text: "רק Tor." },
    ],
    answer: "b",
    explain: "DQL זה SELECT. DML זה INSERT/UPDATE/DELETE. DCL זה GRANT/REVOKE.",
  },
  {
    id: "u7-selq",
    prompt: "SELECT firstname FROM Students WHERE id = ? ואז קשירת sid — מה נכון?",
    options: [
      { id: "a", text: "המציין ? מחליף ערך; sid נשאר נתון, לא תחביר." },
      { id: "b", text: "חובה לשרשר sid למחרוזת עם +." },
      { id: "c", text: "אי אפשר ב-SQLite." },
    ],
    answer: "a",
    explain: "זו שאילתה פרמטרית. בפייתון execute עם טיפל; ב-C++ bind אחרי prepare.",
  },
  {
    id: "u7-lite",
    prompt: "SQLite במצגת?",
    options: [
      { id: "a", text: "מנוע SQL עצמאי ב-C, לרוב קובץ, בלי שרת חובה." },
      { id: "b", text: "רק שירות Oracle בענן." },
      { id: "c", text: "מחליף HTTPS." },
    ],
    answer: "a",
    explain: "מתאים לבחינות ולמטמון. sqlite3_exec על מחרוזת מודבקת עדיין שביר.",
  },
  {
    id: "u7-py",
    prompt: "import sqlite3 ואז connect — איך מעבירים קלט לשאילתה?",
    options: [
      { id: "a", text: "execute עם ? וטיפל ערכים, לא שרשור למחרוזת ה-SQL." },
      { id: "b", text: "תמיד sql = sql + user." },
      { id: "c", text: "רק דרך CGI בלי פרמטרים." },
    ],
    answer: "a",
    explain: "(sid,) — טיפל ליחיד. commit אחרי כתיבה. close בסוף.",
  },
  {
    id: "u7-injq",
    prompt: "הזרקת SQL נשברת כשמה?",
    options: [
      { id: "a", text: "קלט נדבק למחרוזת הפקודה והמנוע מפרסר אותו כתחביר." },
      { id: "b", text: "רק כשמשתמשים ב-HTTPS." },
      { id: "c", text: "רק במכונות וירטואליות." },
    ],
    answer: "a",
    explain: "כמו eval: נתון מול שפה. אפחות: פרמטרים, לא סינון תווים כהגנה יחידה.",
  },
  {
    id: "u7-parq",
    prompt: "שאילתה פרמטרית במצגת עושה מה?",
    options: [
      { id: "a", text: "מפרידה תבנית SQL קבועה מערכים נקשרים — הקלט נשאר נתון." },
      { id: "b", text: "מחליפה הצפנה." },
      { id: "c", text: "מאפשרת לשרשר חופשי כי \"יש מסגרת\"." },
    ],
    answer: "a",
    explain: "? לערכים, לא לשמות טבלה. רשימת שמות מותרים (whitelist) למזהים.",
  },
  {
    id: "u7-idq",
    prompt: "שם טבלה שמגיע מהמשתמש — מה נכון?",
    options: [
      { id: "a", text: "לקשור ב-? כמו כל ערך." },
      { id: "b", text: "אי אפשר לקשור מזהה; רק רשימת שמות מותרים בקוד." },
      { id: "c", text: "תמיד בטוח כי זה DDL." },
    ],
    answer: "b",
    explain: "מצייני מקום הם לערכים. מזהה דינמי בלי רשימת שמות מותרים (whitelist) חוזר להזרקה.",
  },
  {
    id: "u7-trq",
    prompt: "\"לעולם אל תסמכו על קלט\" ביחידה הזו?",
    options: [
      { id: "a", text: "גם מעוגיה ומשדה טופס — פרמטרים, ואם צריך מספר אז המרה לפני הקשירה." },
      { id: "b", text: "רק קלט עם המילה SQL." },
      { id: "c", text: "רק ב-C++, לא בפייתון." },
    ],
    answer: "a",
    explain: "הרשאה מינימלית בחשבון הבסיס היא שכבה נוספת.",
  },
  {
    id: "u7-kissq",
    prompt: "KISS במצגת?",
    options: [
      { id: "a", text: "פשטות לקריאה ולתחזוקה — דורשת עבודה, לא קיצור שמסתיר באג." },
      { id: "b", text: "להשמיט בדיקת טווח במערך ימים." },
      { id: "c", text: "רק הערות ארוכות." },
    ],
    answer: "a",
    explain: "יציאה מטווח חייבת להיכשל במפורש, לא לקרוא מחוץ למערך.",
  },
  {
    id: "u7-dryq",
    prompt: "DRY מול SQL?",
    options: [
      { id: "a", text: "פונקציה אחת עם קשירה עדיפה על העתק של אותה הדבקה בכל מסך." },
      { id: "b", text: "חובה אבסטרקציה שמשרשרת כל שאילתה ממחרוזות קלט." },
      { id: "c", text: "DRY אוסר פרמטרים." },
    ],
    answer: "a",
    explain: "מייבשים את הקשירה, לא את השרשור החופשי.",
  },
  {
    id: "u7-solq",
    prompt: "עקרון השימוש בעקרונות במצגת?",
    options: [
      { id: "a", text: "עקרונות אינם חוקים; צריך להבין מה עושים — חל גם על עצמו." },
      { id: "b", text: "SOLID מבטל הזרקת SQL אוטומטית." },
      { id: "c", text: "חובה ליישם את כל חמש האותיות בכל קובץ בן עשר שורות." },
    ],
    answer: "a",
    explain: "אחריות יחידה עוזרת לא לערבב HTML עם מחרוזות SQL, אבל הפרמטרים עדיין חובה.",
  },
  {
    id: "u7-arq",
    prompt: "קוד חץ — אפחות במצגת?",
    options: [
      { id: "a", text: "יציאה מוקדמת כשתנאי נכשל, במקום if בתוך if בתוך if." },
      { id: "b", text: "להעמיק עוד רמת הזחה." },
      { id: "c", text: "רק מספרי קסם." },
    ],
    answer: "a",
    explain: "קל לראות מסלול דחייה. שייום ומספרי קסם הם קווים נפרדים באותו חלק.",
  },
  {
    id: "u7-ignore",
    prompt: "קוראים שורות מקובץ אל טבלת Students עם id כמפתח ראשי. איך מכניסים בלי הדבקה ובלי ליפול על כפילות?",
    options: [
      { id: "a", text: "בונים INSERT עם f-string לכל שורה, ומתעלמים משגיאה." },
      { id: "b", text: "executemany עם INSERT OR IGNORE וטיפל (?, ?). OR IGNORE מדלג על הפרת מפתח." },
      { id: "c", text: "PRIMARY KEY לבדו הופך כל מחרוזת מהקובץ לפרמטר." },
    ],
    answer: "b",
    explain: "הקובץ הוא קלט. התבנית קבועה, הערכים בטיפל. OR IGNORE מדלג על אילוץ, כולל מפתח כפול, ולא מסביר למה.",
  },
  {
    id: "u7-cmq",
    prompt: "הערות לפי המצגת?",
    options: [
      { id: "a", text: "להסביר ולְבָאֵר; לא לחזור על הקוד ולא להשאיר \"לא סיימתי\" במקום מימוש." },
      { id: "b", text: "חובה הערה לכל שורת השמה." },
      { id: "c", text: "הערות מחליפות פרמטרים ב-SQL." },
    ],
    answer: "a",
    explain: "הערה טובה: למה נבחרה קשירה, לא \"execute מריץ שאילתה\".",
  },
  {
    id: "u7-fmtq",
    prompt: "execute עם '... {}'.format(user) או f-string בתוך מחרוזת SQL — מה נכון? (מלכודת מבחן)",
    options: [
      { id: "a", text: "זה תיקון: הגרשיים במחרוזת סוגרים את הקלט כערך." },
      { id: "b", text: "עדיין הזרקה: format מכניס את המחרוזת לתחביר. רק ? וטיפל (או bind) מפרידים נתון." },
      { id: "c", text: "רק f-string שבור; format בטוח." },
    ],
    answer: "b",
    explain: "אותה משפחה כמו +. גרש במחרוזת לא יוצר גבול אמון. מבחן 2021ג: \"תיקון\" בפורמט עדיין שבור.",
  },
  {
    id: "u7-execsql",
    prompt: "מתי sqlite3_exec מתאים בקורס?",
    options: [
      { id: "a", text: "לכל שאילתה, כולל ערכים מטופס — השם exec מגן." },
      { id: "b", text: "ל־DDL קבוע בלי קלט משתמש. לקלט: prepare ו־bind, לא שרשור ל־char*." },
      { id: "c", text: "רק בפייתון, לא ב־C++." },
    ],
    answer: "b",
    explain: "sqlite3_exec מקבל מחרוזת SQL שלמה. מחרוזת מודבקת שבירה כמו + בפייתון.",
  },
  {
    id: "u7-noneq",
    prompt: "sqlite3.connect נכשל בפייתון — מה נכון?",
    options: [
      { id: "a", text: "בודקים if conn == None ואז ממשיכים." },
      { id: "b", text: "כישלון זורק חריגה, לא מחזיר None. תופסים חריגה או נותנים לה לעלות אחרי טיפול." },
      { id: "c", text: "connect תמיד מצליח אם הקובץ לא קיים." },
    ],
    answer: "b",
    explain: "השוואה ל־None היא דפוס C (מצביע ריק), לא API של sqlite3 בפייתון. קובץ חסר לרוב נוצר.",
  },
  {
    id: "u7-tupq",
    prompt: "execute עם פרמטר יחיד בפייתון — איך מעבירים ערך?",
    options: [
      { id: "a", text: "execute(sql, sid) בלי טיפל." },
      { id: "b", text: "execute(sql, (sid,)) — הפסיק יוצר טיפל של איבר אחד." },
      { id: "c", text: "רק רשימה; טיפל אסור." },
    ],
    answer: "b",
    explain: "(sid) בלי פסיק הוא רק סוגריים. כמה ? — טיפל באותו אורך.",
  },
  {
    id: "u7-kernq",
    prompt: "ציטוט Kernighan בסיום המצגת — מה המסקנה הדפנסיבית?",
    options: [
      { id: "a", text: "קוד מבריק תמיד קל יותר לדיבאג." },
      { id: "b", text: "דיבאג קשה בערך פי שניים מכתיבה; פשטות וקשירה עדיפות על חכמה שמסתירה הדבקה." },
      { id: "c", text: "SOLID מבטל את הצורך בפרמטרים." },
    ],
    answer: "b",
    explain: "KISS ופרמטרים הם אותה משמעת: אפשר לקרוא ולבדוק, לא \"להוכיח\" במקום לבדוק.",
  },
];

window.U7_SQL_LAB = {
  title: "מעבדה: הדבקה מול פרמטר",
  intro: "אותה שליפה לפי מזהה. איך המחרוזת מגיעה למנוע — בלי מטען תקיפה.",
};

window.U7_LANG_LAB = {
  title: "מעבדה: תת-שפות SQL",
  intro: "שייכו פקודה למשפחה. זה עוזר לדעת מה הזרקה עלולה לשנות (שליפה מול מבנה).",
};

window.U7_CLN_LAB = {
  title: "מעבדה: קוד נקי כמשמעת דפנסיבית",
  intro: "פשטות, אי-חזרה, יציאה מוקדמת, שמות — איך זה מצמצם באג הדבקה.",
};

(window.SUMMARY_CARDS = window.SUMMARY_CARDS || []).push(
  { id: "u7-db", unit: "7", kind: "הגדרה", title: "בסיס נתונים (Database)", body: "אחסון מאורגן במחשב. יישום = לקוח של המנוע." },
  { id: "u7-sql", unit: "7", kind: "הגדרה", title: "שפת שאילתות (SQL)", body: "שפה הצהרתית. המחרוזת היא תוכנית למנוע." },
  { id: "u7-dql", unit: "7", kind: "לזכור", title: "שפת שאילתות (DQL)", body: "שאילתה — בעיקר SELECT." },
  { id: "u7-dml", unit: "7", kind: "לזכור", title: "שפת שינוי נתונים (DML)", body: "INSERT, UPDATE, DELETE — שינוי שורות." },
  { id: "u7-ddl", unit: "7", kind: "לזכור", title: "שפת הגדרת מבנה (DDL)", body: "CREATE/ALTER/DROP — מבנה." },
  { id: "u7-dcl", unit: "7", kind: "לזכור", title: "שפת בקרת הרשאות (DCL)", body: "GRANT/REVOKE. ב-SQLite הרשאת הקובץ במערכת." },
  { id: "u7-pk", unit: "7", kind: "הגדרה", title: "מפתחות (Primary / Foreign key)", body: "ראשי מזהה שורה; זר מצביע לטבלה אחרת." },
  { id: "u7-cr", unit: "7", kind: "לזכור", title: "יצירת טבלה (CREATE TABLE)", body: "שם טבלה ועמודות עם טיפוס. לא לקבל שם טבלה מקלט בלי רשימת שמות מותרים (whitelist)." },
  { id: "u7-ins", unit: "7", kind: "לזכור", title: "הוספה ושליפה (INSERT, SELECT)", body: "הוספה לפי עמודות. SELECT עם WHERE/ORDER. ערכים ב-?." },
  { id: "u7-lite", unit: "7", kind: "הגדרה", title: "מנוע SQLite", body: "מנוע ב-C, קובץ בתהליך. תרגול ומבחן." },
  { id: "u7-api", unit: "7", kind: "לזכור", title: "ממשק SQLite ב־C++ ובפייתון", body: "C++: prepare+bind. פייתון: execute(?, tuple). connect זורק חריגה, לא None." },
  { id: "u7-inj", unit: "7", kind: "מלכודת", title: "הזרקת SQL (SQL injection)", body: "קלט נדבק לפקודה והופך לתחביר. כמו eval לשפת SQL. תנאי תמיד-אמת → יותר שורות." },
  { id: "u7-par", unit: "7", kind: "הגדרה", title: "שאילתה פרמטרית (Parameterized query)", body: "תבנית קבועה + ערכים נקשרים. הקלט נשאר נתון." },
  { id: "u7-csv", unit: "7", kind: "לזכור", title: "קובץ ל-SQLite", body: "PRIMARY KEY על המזהה. executemany עם INSERT OR IGNORE וטיפל. הקובץ הוא קלט, לא חלק מה-SQL." },
  { id: "u7-fmt", unit: "7", kind: "מלכודת", title: "הדבקה ב־format וב־f-string", body: "עדיין הזרקה. גרש במחרוזת אינו גבול. רק ? וטיפל או bind." },
  { id: "u7-execs", unit: "7", kind: "מלכודת", title: "הרצה ישירה (sqlite3_exec)", body: "נוח ל־DDL קבוע בלי קלט. לקלט — prepare ו־bind, לא שרשור." },
  { id: "u7-idt", unit: "7", kind: "מלכודת", title: "מזהה דינמי (identifier)", body: "? לא לשמות טבלה/עמודה. רק רשימה סגורה בקוד." },
  { id: "u7-nst", unit: "7", kind: "מלכודת", title: "קלט לא מהימן", body: "גם המרה למספר לפני קשירה. הרשאה מינימלית בחשבון." },
  { id: "u7-kiss", unit: "7", kind: "הגדרה", title: "פשטות (KISS)", body: "פשטות. מערך ימים עם טווח 1..7. לא קיצור שמסתיר בדיקה." },
  { id: "u7-dry", unit: "7", kind: "הגדרה", title: "בלי חזרה (DRY)", body: "פונקציית קשירה אחת, לא העתק באג הדבקה." },
  { id: "u7-sol", unit: "7", kind: "לזכור", title: "עקרונות SOLID", body: "SRP אחריות, OCP פתוח-סגור, LSP ליסקוב, ISP הפרדת ממשקים, DIP היפוך תלות. לא תחליף לפרמטרים ב-SQL." },
  { id: "u7-pr", unit: "7", kind: "לזכור", title: "שימוש בעקרונות", body: "לא חוקים. לא קישוט שמסתיר הזרקה." },
  { id: "u7-arr", unit: "7", kind: "לזכור", title: "קוד חץ (arrow code)", body: "חיתוך מוקדם (guard clause): יציאה במקרי קצה, בלי if מקונן. בפייתון וב־C++." },
  { id: "u7-nam", unit: "7", kind: "לזכור", title: "שייום (naming)", body: "שמות שמסגירים כוונה — במיוחד לקלט." },
  { id: "u7-mag", unit: "7", kind: "לזכור", title: "מספרי קסם (magic numbers)", body: "קבוע בשם במקום ספרה פזורה." },
  { id: "u7-cmt", unit: "7", kind: "לזכור", title: "הערות (comments)", body: "להסביר למה. לא לחזור על מה ולא חוב לא גמור." },
  { id: "u7-kern", unit: "7", kind: "לזכור", title: "קרניגהאן על דיבאג", body: "דיבאג קשה פי שניים מכתיבה. קוד מבריק מדי קשה לתיקון." }
);
