/* שאלות אמריקאיות מהמאגר, שלא הופיעו כבר כשאלה באתר.
   מנוסחות מחדש. בלי מטען. */

(window.UNIT1_QUIZZES = window.UNIT1_QUIZZES || []).push(
  {
    id: "mc-zeroday-fix",
    prompt: "כיצד מתגוננים ממתקפת 0-Day?",
    options: [
      { id: "a", text: "מתקינים עדכון מאתר היצרן." },
      { id: "b", text: "מתקינים עדכון מאתר CVE." },
      { id: "c", text: "אין סיכון, ולכן לא נדרשת פעולה." },
      { id: "d", text: "עדיין אין עדכון שאפשר להתקין; אי אפשר לסגור אותה בעדכון יצרן." },
    ],
    answer: "d",
    explain: "0-Day היא חולשה שהמגנים טרם קיבלו לה תיקון. אחרי שהיצרן מפרסם עדכון זו כבר 1-Day.",
  },
  {
    id: "mc-ransom",
    prompt: "מה מטרת כופרה (ransomware)?",
    options: [
      { id: "a", text: "סחיטת תשלום או נכס מהארגון." },
      { id: "b", text: "הגנה על הרשת מפני נוזקה." },
      { id: "c", text: "איתור חולשות בגרסה חדשה." },
      { id: "d", text: "הצפנת מידע כדי להגן עליו מפורץ." },
    ],
    answer: "a",
    explain: "ההצפנה כאן היא אמצעי סחיטה, לא הגנה של הארגון.",
  },
  {
    id: "mc-ciso",
    prompt: "מהו CISO?",
    options: [
      { id: "a", text: "Chief Information Security Officer — ממונה אבטחת המידע." },
      { id: "b", text: "מרכז תפעול אבטחת אינטרנט." },
      { id: "c", text: "מפעיל מערכות מחשוב משולבות." },
      { id: "d", text: "ארגון ביון סייבר." },
    ],
    answer: "a",
    explain: "התפקיד הוא מדיניות ותהליך אבטחה בארגון, לא מוצר רשת.",
  }
);

(window.UNIT2_QUIZZES = window.UNIT2_QUIZZES || []).push(
  {
    id: "mc-ref",
    prompt: "איך יוצרים הפניה s2 למחרוזת s1 ב-C++?",
    options: [
      { id: "a", text: "std::string* s2 = s1;" },
      { id: "b", text: "std::string& s2 = s1;" },
      { id: "c", text: "std::string* s2 = *s1;" },
      { id: "d", text: "std::string& s2 = &s1;" },
    ],
    answer: "b",
    explain: "תשובה נכונה: ב. בשפת C++, הפניה (Reference) מוגדרת בעזרת התו & בצמוד לטיפוס הנתונים: std::string& s2 = s1;. הפניה היא כינוי (Alias) לאובייקט קיים בזיכרון, אינה תופסת מקום עצמאי במחסנית, וחובה לאתחלה בעת ההגדרה לאובייקט lvalue חי.\n\nלמה המסיחים שגויים?\n• א שגויה: השמת אובייקט למצביע ללא שימוש באופרטור הכתובת (&) אינה חוקית ואינה עוברת קומפילציה.\n• ג שגויה: s1 הוא אובייקט ולא מצביע, ולכן הפעלת אופרטור הסרת הפניה (*) עליו אינה חוקית.\n• d שגויה: &s1 מחזיר מצביע (כתובת הזיכרון של s1), בעוד שהפניה דורשת את האובייקט עצמו ולא את כתובתו.",
  },
  {
    id: "mc-funcptr",
    prompt: "נתון מערך מצביעי פונקציה: funcptr[0] = add, funcptr[1] = mul, ואז לולאה המפעילה: funcptr[i](5, 7) עבור i=0 ו-i=1. מה יודפס בהנחה ש-add מחברת ו-mul מכפילה?",
    options: [
      { id: "a", text: "result:12 result:35" },
      { id: "b", text: "result:5 result:7" },
      { id: "c", text: "result:57" },
      { id: "d", text: "הקוד לא יתקמפל מכיוון שמערך אינו יכול להכיל כתובות פונקציות ב-C++." },
    ],
    answer: "a",
    explain: "תשובה נכונה: א. מצביע לפונקציה (Function Pointer) שומר את כתובת הזיכרון של הוראות הפונקציה במקטע הקוד (Text Segment). מערך של מצביעי פונקציה מאפשר קריאה דינמית לפונקציות שונות על פי אינדקס (בדומה לאופן שבו פועלת טבלת Vtable): באיטרציה הראשונה נקראת add(5, 7) ומחזירה 12, ובאיטרציה השנייה נקראת mul(5, 7) ומחזירה 35.\n\nלמה המסיחים שגויים?\n• ב שגויה: הפונקציות מבצעות חישוב על הארגומנטים 5 ו-7 ולא מדפיסות אותם גולמית.\n• ג שגויה: אלו שתי קריאות נפרדות עם חישוב אריתמטי ולא שרשור מחרוזות.\n• d שגויה: C ו-C++ תומכות באופן מלא במערך מצביעי פונקציה בעזרת typedef או using תקני.",
  }
);

(window.UNIT3_QUIZZES = window.UNIT3_QUIZZES || []).push(
  {
    id: "mc-not-ret",
    prompt: "איזה מנגנון אינו מיועד להגן מפני דריסת כתובת החזרה?",
    options: [
      { id: "a", text: "קנרית המחסנית (stack canary)." },
      { id: "b", text: "CET." },
      { id: "c", text: "ROP." },
      { id: "d", text: "אף תשובה אינה נכונה." },
    ],
    answer: "c",
    explain: "ROP הוא שם לטכניקה שמשתמשת בקוד שכבר קיים. קנרית ו-CET הן אפחות מול דריסת כתובת החזרה.",
  },
  {
    id: "mc-canary-flag",
    prompt: "האם קנרית המחסנית קיימת בכל קומפיילר?",
    options: [
      { id: "a", text: "כן, כל קומפיילר מוסיף אותה תמיד." },
      { id: "b", text: "רק בארכיטקטורת ARM." },
      { id: "c", text: "רק ב-Intel." },
      { id: "d", text: "לא. זה מנגנון של המהדר (GCC, Clang, MSVC), ואפשר להפעיל או לבטל אותו." },
    ],
    answer: "d",
    explain: "הקנרית אינה חלק מהמעבד. בלי הדגל המתאים הבנייה לא שותלת אותה.",
  }
);

(window.UNIT4_QUIZZES = window.UNIT4_QUIZZES || []).push(
  {
    id: "mc-cap",
    prompt: "איך הופכים רק את האות הראשונה של mystr לגדולה, ושאר האותיות נשארות כפי שהן?",
    options: [
      { id: "a", text: "mystr.capitalize()" },
      { id: "b", text: "mystr.upper()" },
      { id: "c", text: "mystr[0].capitalize() + mystr[1:]" },
      { id: "d", text: "mystr[1].capitalize() + mystr[2:]" },
    ],
    answer: "c",
    explain: "capitalize על כל המחרוזת גם מקטין את השאר. upper משנה הכל.",
  },
  {
    id: "mc-shallow",
    prompt: "a = [[1, 2, 3], [4, 5, 6]]; b = a.copy(); b[0].append(4). איזו העתקה זו?",
    options: [
      { id: "a", text: "עמוקה." },
      { id: "b", text: "רדודה: הרשימה החיצונית חדשה, הרשימות הפנימיות משותפות." },
      { id: "c", text: "העתקה מלאה של כל התוכן." },
      { id: "d", text: "אין העתקה. זו אותה רשימה." },
    ],
    answer: "b",
    explain: "list.copy מעתיק רק את השכבה החיצונית. append על האיבר הפנימי נראה גם דרך a.",
  },
  {
    id: "mc-add",
    prompt: "איך מגדירים p1 + p2 למחלקת point בפייתון?",
    options: [
      { id: "a", text: "פונקציה בשם point." },
      { id: "b", text: "פונקציה בשם point__plus." },
      { id: "c", text: "מתודה __add__." },
      { id: "d", text: "לא צריך. זה מוגדר לבד." },
    ],
    answer: "c",
    explain: "האופרטור + על אובייקט מחפש __add__.",
  },
  {
    id: "mc-with",
    prompt: "with open(\"filename.txt\") as f: ואז f.write(...). מה קורה?",
    options: [
      { id: "a", text: "נכתבות שתי שורות והקובץ נשאר פתוח." },
      { id: "b", text: "FileNotFoundError אם הקובץ חסר, ו-UnsupportedOperation אם הוא קיים." },
      { id: "c", text: "נכתבות שתי שורות והקובץ נסגר אוטומטית." },
      { id: "d", text: "UnsupportedOperation רק כשאין הרשאת כתיבה לתיקייה." },
    ],
    answer: "b",
    explain: "בלי מצב, open הוא לקריאה. write על קובץ קריאה נכשל. קובץ חסר נכשל עוד קודם.",
  },
  {
    id: "mc-cpoint",
    prompt: "cpoint יורש מ-point ולא קורא לבנאי הבסיס, ורק שומר color. print(cpoint(1, 2, \"blue\")) כש-__str__ של point מדפיס את x ואת y. מה קורה?",
    options: [
      { id: "a", text: "(1, 2, blue)" },
      { id: "b", text: "(1, 2)" },
      { id: "c", text: "TypeError על חיבור int למחרוזת." },
      { id: "d", text: "AttributeError: אין תכונה x." },
    ],
    answer: "d",
    explain: "בלי אתחול הבסיס אין x ואין y. __str__ נופל לפני חיבור הטיפוסים.",
  }
);

(window.UNIT5_QUIZZES = window.UNIT5_QUIZZES || []).push(
  {
    id: "mc-inet6",
    prompt: "שקע TCP על IPv6 בפייתון:",
    options: [
      { id: "a", text: "socket.AF_INET, socket.SOCK_STREAM6" },
      { id: "b", text: "socket.AF_INET6, socket.SOCK_STREAM" },
      { id: "c", text: "socket.AF_INET, socket.SOCK_STREAM" },
      { id: "d", text: "socket.AF_INET6, socket.SOCK_STREAM6" },
    ],
    answer: "b",
    explain: "AF_INET6 הוא משפחת הכתובות. SOCK_STREAM נשאר TCP. אין SOCK_STREAM6.",
  },
  {
    id: "mc-langs",
    prompt: "האם לקוח ב-C++ יכול לדבר עם שרת בפייתון?",
    options: [
      { id: "a", text: "כן, אם שניהם על אותו פרוטוקול (פורט, TCP או UDP)." },
      { id: "b", text: "רק אם קודקו באותו IDE." },
      { id: "c", text: "רק עם ספריית צד שלישי שתואמת לפייתון." },
      { id: "d", text: "לא. שפות שונות לא מתקשרות." },
    ],
    answer: "a",
    explain: "על השקע עוברים בתים. השפה לא חלק מהפרוטוקול.",
  },
  {
    id: "mc-gw",
    prompt: "האם לקוח IPv6 יכול לדבר עם שרת IPv4?",
    options: [
      { id: "a", text: "כן, ישירות." },
      { id: "b", text: "לא, בשום מצב." },
      { id: "c", text: "כן, אם יש רכיב תרגום באמצע." },
      { id: "d", text: "רק לקוח IPv4 מול שרת IPv6, לא להפך." },
    ],
    answer: "c",
    explain: "הכתובות לא באותו אורך. בלי gateway או NAT64 אין שיחה ישירה.",
  },
  {
    id: "mc-rsa-ssl",
    prompt: "מה נכון לגבי פרוטוקולי הצפנה ותיקים כמו RSA ו-SSL, לפי ניסוח השאלה?",
    options: [
      { id: "a", text: "עמידים למחשב-על עם מעבד וקטורי." },
      { id: "b", text: "עמידים גם למחשב קוונטי." },
      { id: "c", text: "אלה ההצפנות הקשות ביותר שקיימות." },
      { id: "d", text: "פרוטוקולים בדוקים. מעריכים שהסיכוי לפגם בפרוטוקול עצמו נמוך." },
    ],
    answer: "d",
    explain: "ותק ובדיקה אינם הוכחת עמידות קוונטית, ואינם מבטיחים שמימוש מסוים נקי.",
  },
  {
    id: "mc-rsa-aes",
    prompt: "לקוח מצפין ב-RSA והשרת מצפה ל-AES. האם זה עובד?",
    options: [
      { id: "a", text: "כן, בלי שינוי." },
      { id: "b", text: "לא. אלגוריתמים שונים אינם תואמים מעצמם." },
      { id: "c", text: "כן, אם יש מפתח ציבורי משותף." },
      { id: "d", text: "כן, הלקוח ממיר ל-AES לבד." },
    ],
    answer: "b",
    explain: "המפתח הציבורי לא הופך RSA ל-AES. צריך הסכמה על האלגוריתם.",
  },
  {
    id: "mc-udp4",
    prompt: "שקע UDP על IPv4 בפייתון:",
    options: [
      { id: "a", text: "socket.AF_INET, socket.SOCK_STREAM" },
      { id: "b", text: "socket.AF_INET, socket.SOCK_DGRAM" },
      { id: "c", text: "socket.AF_INET4, socket.SOCK_STREAM" },
      { id: "d", text: "socket.AF_INET4, socket.SOCK_DGRAM" },
    ],
    answer: "b",
    explain: "IPv4 הוא AF_INET, לא AF_INET4. UDP הוא SOCK_DGRAM.",
  },
  {
    id: "mc-not-app",
    prompt: "איזה מהבאים אינו בשכבת היישום?",
    options: [
      { id: "a", text: "HTTP" },
      { id: "b", text: "HTTPS" },
      { id: "c", text: "SSH" },
      { id: "d", text: "TCP" },
    ],
    answer: "d",
    explain: "TCP הוא תובלה. HTTP, HTTPS ו-SSH יושבים מעליו.",
  }
);
