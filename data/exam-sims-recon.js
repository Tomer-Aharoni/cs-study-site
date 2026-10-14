(window.EXAM_SIMS = window.EXAM_SIMS || []).push(
    {
    id: "e-2021a74",
    title: "סימולציה מלאה · 2021א מועד 74 (טופס 543)",
    minutes: 180,
    pick: 3,
    note: "שאלון 543 (מועד 74) מלא ומדויק: אפחות, f1 ו-p1 במחסנית, telnet מול ssh, בעיית היהלום, מפרק לא וירטואלי, קנרית המחסנית, מחלקת Mahrozet ב-++C, לקוח TCP בפייתון ומסד SQLite, וארגז חול (Sandbox).",
    partA: [
      {
        id: "a1",
        prompt: "מה פירוש המושג אפחות (Mitigation)?",
        fromAsset: true,
        options: [
          { id: "a", text: "מצב שבו המערכת נקיה מבאגים וללא בעיות אבטחה." },
          { id: "b", text: "שמירה על הנתונים כך שרק מי שמורשה לגשת אליהם יוכל לגשת (סודיות)." },
          { id: "c", text: "תקיפה שנובעת מתוך חולשה." },
          { id: "d", text: "הגנה על המערכת מפני תקיפה כדי למזער את הנזק." },
        ],
        answer: "d",
        hint: "<p>האם אפחות מסירה את עצם קיום הבאג בקוד, או שהיא נותנת מענה לצמצום חומרת הנזק וההסתברות לניצולו?</p>",
        solution: "<p><strong>התשובה: ד'.</strong> אפחות (Mitigation) מתייחסת לנקיטת אמצעי הגנה ובקרות שנועדו להקטין את ההסתברות להתרחשות תקיפה או לצמצם את חומרת הנזק הנגרם ממנה (למשל קנרית, ASLR או DEP). א' מתארת מערכת אידיאלית שאינה קיימת בפועל; ב' היא הגדרת סודיות (Confidentiality); ו-ג' היא תיאור של ניצול (Exploit).</p>",
      },
      {
        id: "a2",
        fromAsset: true,
        prompt: "בקטע הקוד הבא בשפת ++C/C, האם הרשומה f1 והמצביע שלה p1 יאוחסנו על המחסנית או הערמה?",
        code: "#include <frog.h>\nint main() {\n    Frog f1(5);\n    Frog *p1 = &f1;\n    f1.hop();\n    return 0;\n}",
        options: [
          { id: "a", text: "הרשומה f1 תאוחסן על המחסנית והמצביע p1 יאוחסן על הערמה." },
          { id: "b", text: "הרשומה f1 תאוחסן על הערמה והמצביע p1 יאוחסן על המחסנית." },
          { id: "c", text: "גם f1 וגם p1 יאוחסנו על המחסנית." },
          { id: "d", text: "גם f1 וגם p1 יאוחסנו על הערמה." },
        ],
        answer: "c",
        hint: "<p>האם יש בקוד שימוש באופרטור new או בפונקציה malloc? היכן מוקצים משתנים מקומיים אוטומטיים בפונקציה?</p>",
        solution: "<p><strong>התשובה: ג'.</strong> שני המשתנים (f1 מטיפוס Frog ו-p1 מטיפוס *Frog) מוגדרים כמשתנים מקומיים אוטומטיים בתוך הפונקציה main ללא שימוש בהקצאה דינמית (new או malloc), ולכן שניהם מוקצים במסגרת המחסנית (Stack Frame).</p>",
      },
      {
        id: "a3",
        prompt: "מהו החיסרון המרכזי של פרוטוקול telnet לעומת ssh?",
        options: [
          { id: "a", text: "הפרוטוקול לא מוצפן והמידע (כולל סיסמאות) עובר כטקסט גלוי (Cleartext)." },
          { id: "b", text: "telnet עובד רק ברשת מקומית (LAN) ולא באינטרנט." },
          { id: "c", text: "telnet דורש רוחב פס גדול בהרבה מ-ssh." },
          { id: "d", text: "אין הבדל אבטחתי ביניהם, ההבדל הוא רק בביצועים." },
        ],
        answer: "a",
        hint: "<p>חשבו על מודל האיומים ברשת פתוחה — כיצד המידע והאימות מועברים ב-telnet בהשוואה ל-SSH?</p>",
        solution: "<p><strong>התשובה: א'.</strong> פרוטוקול Telnet מעביר את כל תעבורת הנתונים – לרבות שמות משתמש, סיסמאות ופקודות – כטקסט גלוי ללא הצפנה וללא אימות שלמות, ולכן כל צותת ברשת (Man-In-The-Middle / Packet Sniffing) יכול לחשוף את המידע. לעומתו, SSH מבצע הצפנה חזקה ואימות הדדי.</p>",
      },
      {
        id: "a4",
        prompt: "מדוע הקוד הבא לא יתקמפל בשפת ++C (בעיית היהלום)?",
        code: "class Thread {\npublic:\n    void run() {}\n};\nclass Sender : public Thread {};\nclass Receiver : public Thread {};\nclass Messenger : public Sender, public Receiver {};\n\nint main() {\n    Messenger m;\n    m.run();\n    return 0;\n}",
        options: [
          { id: "a", text: "בגלל שירושה מרובה אסורה לחלוטין בשפת ++C." },
          { id: "b", text: "משום שהפונקציה run אינה מוגדרת כ-virtual במחלקת Thread." },
          { id: "c", text: "בגלל בעיית היהלום (Diamond Problem): נוצרת עמימות לקומפיילר לאיזה עותק של run() לקרוא." },
          { id: "d", text: "הקוד כן מתקמפל בהצלחה ללא שגיאות." },
        ],
        answer: "c",
        hint: "<p>כמה מופעים של המחלקה Thread מוכלים בתוך האובייקט Messenger, וכאשר קוראים ל-run() איזה מסלול הקומפיילר בוחר?</p>",
        solution: "<p><strong>התשובה: ג'.</strong> זוהי 'בעיית היהלום' (Diamond Problem) הנובעת מירושה מרובה ללא ירושה וירטואלית. המחלקה Messenger יורשת מ-Sender ומ-Receiver, ושתיהן יורשות מ-Thread, ולכן באובייקט נוצרים שני עותקים נפרדים של המחלקה Thread. הקריאה <code>m.run()</code> יוצרת עמימות (Ambiguity) לקומפיילר והקוד נכשל בקומפילציה. הפתרון הוא ירושה וירטואלית: <code>virtual public Thread</code>.</p>",
      },
      {
        id: "a5",
        prompt: "האם יש זליגת זיכרון כאשר מוחקים אובייקט של מחלקה נגזרת דרך מצביע בסיס שה-Destructor שלו אינו וירטואלי?",
        code: "class Base {\n    char* buffer1;\npublic:\n    Base() { buffer1 = new char[50]; }\n    ~Base() { delete[] buffer1; } // אינו וירטואלי!\n};\nclass Derived : public Base {\n    char* buffer2;\npublic:\n    Derived() { buffer2 = new char[50]; }\n    ~Derived() { delete[] buffer2; }\n};\n\nint main() {\n    Base* b = new Derived();\n    delete b;\n    return 0;\n}",
        options: [
          { id: "a", text: "כן, יש זליגה של buffer1 בלבד." },
          { id: "b", text: "כן, יש זליגה של buffer2 של המחלקה הנגזרת Derived." },
          { id: "c", text: "כן, שני החוצצים buffer1 ו-buffer2 זולגים." },
          { id: "d", text: "לא, אין שום זליגת זיכרון." },
        ],
        answer: "b",
        hint: "<p>איזה Destructor ייקרא בזמן ריצה כאשר המצביע הוא מסוג Base* והמפרק ב-Base אינו מוגדר כ-virtual?</p>",
        solution: "<p><strong>התשובה: ב'.</strong> כאשר מוחקים אובייקט דרך מצביע למחלקת בסיס שה-Destructor שלה אינו וירטואלי, מופעל רק המפרק של מחלקת הבסיס (<code>~Base()</code>). המפרק של המחלקה הנגזרת (<code>~Derived()</code>) אינו מופעל כלל, ולכן הזיכרון הדינמי שהוקצה בה (<code>buffer2</code>) אינו משוחרר וזולג לחלוטין (ומהווה התנהגות לא מוגדרת לפי תקן C++).</p>",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · קנרית המחסנית (Stack Canary)",
        prompt: "ענו על הסעיפים הבאים בנוגע למנגנון קנרית המחסנית (Stack Canary):\nא. (6 נקודות) על איזו בעיית אבטחה המנגנון מנסה להגן, ומהו הנזק שהיא עלולה לגרום?\nב. (7 נקודות) תארו כיצד המנגנון פועל ומתי מתבצעת בדיקת הערך.\nג. (6 נקודות) שרטטו/הסבירו את מבנה ה-Stack Frame כאשר מנגנון הקנרית פעיל.\nד. (6 נקודות) ציינו מנגנון הגנה חלופי או משלים הקיים במערכות הפעלה מודרניות להגנה מפני מתקפה זו.",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<p><strong>סעיף א':</strong> מגן מפני <strong>Stack Buffer Overflow</strong> שבו קלט חורג דורס את כתובת החזרה (Return Address). הנזק: הסטת זרימת התוכנית והרצת פקודות זדוניות (RCE).</p>
<p><strong>סעיף ב':</strong> בעת כניסה לפונקציה (Prolog), הקומפיילר שותל ערך אקראי וסודי (Canary) לפני כתובת החזרה וה-Saved EBP. לפני פקודת החזרה (<code>RET</code> ב-Epilog), מתבצעת השוואה של הערך השמור במחסנית לעותק סודי (ברגיסטר או מקטע זיכרון מוגן). אם הערך שונה, התוכנית מזהה תקיפה, מופסקת מיידית (<code>__stack_chk_fail</code>) ומונעת את השימוש בכתובת שנדרסה.</p>
<p><strong>סעיף ג' (מבנה ה-Stack Frame):</strong></p>
<pre class="code" dir="ltr"><code>[ כתובת חזרה - Return Address ]  (כתובת גבוהה)
[ EBP שמור - Saved EBP        ]
[ ערך הקנרית - STACK CANARY   ]
[ משתנים מקומיים / Buffers    ]  (כתובת נמוכה - גדלה מעלה)</code></pre>
<p><strong>סעיף ד':</strong> מנגנון חלופי/משלים: <strong>DEP/NX</strong> (מניעת הרצת פקודות מאזור הנתונים של המחסנית) או <strong>ASLR</strong> (הגרלת כתובות זיכרון).</p>`,
        verdictKind: "official",
        verdict: "תואם במלואו את פתרון הבחינה הרשמי.",
      },
      {
        id: "q7",
        title: "שאלה 7 · מחלקת Mahrozet וניהול זיכרון ב-++C",
        prompt: "א. (13 נקודות) כתבו מחלקה ב-++C בשם Mahrozet בעלת בנאי ברירת מחדל, ובנאי המקבל שם קובץ טקסט וטוען את כל תוכן הקובץ לתוך משתנה מחרוזת פנימי בצורה בטוחה. ממשו מתודה בשם fetch() המחזירה את המחרוזת.\nב. (12 נקודות) נתונה מחלקה בשם Big המנהלת תור דינמי של מספרים שלמים באמצעות מצביע int* queue ושדות size ו-last. ממשו עבורה Copy Constructor ו-Copy Assignment Operator לפי עקרון Deep Copy.",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<pre class="code" dir="ltr"><code>// סעיף א' - מחלקת Mahrozet
#include &lt;fstream&gt;
#include &lt;sstream&gt;
#include &lt;string&gt;

class Mahrozet {
    std::string content;
public:
    Mahrozet() : content("") {}
    Mahrozet(const std::string& filename) {
        std::ifstream file(filename);
        if (file.is_open()) {
            std::stringstream ss;
            ss &lt;&lt; file.rdbuf();
            content = ss.str();
        }
    }
    virtual ~Mahrozet() {} // מפרק וירטואלי דפנסיבי
    std::string fetch() const { return content; }
};

// סעיף ב' - מחלקת Big עם העתקה עמוקה (Rule of Three)
#include &lt;algorithm&gt;

class Big {
    int* queue;
    int size;
    int last;
public:
    // בנאי העתקה (Deep Copy)
    Big(const Big& o) : size(o.size), last(o.last), queue(nullptr) {
        if (o.size > 0 && o.queue) {
            queue = new int[o.size];
            std::copy(o.queue, o.queue + o.size, queue);
        }
    }

    // אופרטור השמה (Copy Assignment) עם בדיקת השמה עצמית ושחרור ישן
    Big& operator=(const Big& o) {
        if (this == &o) return *this; // מניעת השמה עצמית
        int* nq = nullptr;
        if (o.size > 0 && o.queue) {
            nq = new int[o.size];
            std::copy(o.queue, o.queue + o.size, nq);
        }
        delete[] queue; // שחרור הזיכרון הישן
        queue = nq;
        size = o.size;
        last = o.last;
        return *this;
    }

    virtual ~Big() {
        delete[] queue;
    }
};</code></pre>`,
        verdictKind: "official",
        verdict: "פתרון מלא ותקין לפי דרישות הקורס: Deep Copy, בדיקת השמה עצמית ושחרור זיכרון ישן.",
      },
      {
        id: "q8",
        title: "שאלה 8 · לקוח TCP בפייתון ומסד נתונים SQLite",
        prompt: "א. (13 נקודות) כתבו תוכנית לקוח בפייתון המתחברת באמצעות TCP Socket לשרת בכתובת 119.4.7.5:8080. הלקוח קורא קובץ בשם message.txt, שולח את תוכנו במלואו, מקבל מהשרת תשובה באורך של עד 128 בתים, ומדפיס עד 5 שורות ראשונות מהתשובה.\nב. (12 נקודות) כתבו פונקציה המקבלת חיבור למסד נתונים SQLite ואת השורות שהתקבלו בסעיף א', יוצרת טבלה בשם messages בעלת עמודות serial_number ו-message_text, ושומרת את השורות בבסיס הנתונים בצורה מאובטחת.",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<pre class="code" dir="ltr"><code>import socket
import os
import sqlite3

# סעיף א' - לקוח TCP
def run_client():
    lines = []
    if not os.path.exists("message.txt"):
        print("Error: message.txt not found")
        return lines
    try:
        with open("message.txt", "rb") as f:
            data = f.read()
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(5.0)
            s.connect(("119.4.7.5", 8080))
            s.sendall(data)
            # קריאת תשובה של עד 128 בתים
            response = s.recv(128).decode('utf-8', errors='replace')
            lines = response.splitlines()[:5]
            for l in lines:
                print(l)
    except Exception as e:
        print(f"Communication error: {e}")
    return lines

# סעיף ב' - שמירה מאובטחת ב-SQLite
def save_to_db(conn, lines):
    c = conn.cursor()
    c.execute('CREATE TABLE IF NOT EXISTS messages (serial_number INTEGER, message_text TEXT)')
    # שימוש בשאילתה פרמטרית למניעת SQL Injection
    c.executemany('INSERT INTO messages VALUES (?, ?)', 
                  [(i + 1, m) for i, m in enumerate(lines[:5])])
    conn.commit()</code></pre>`,
        verdictKind: "official",
        verdict: "פתרון מלא ותואם למבחן: הגבלת 128 בתים, הדפסת עד 5 שורות, שימוש בשאילתה פרמטרית.",
      },
      {
        id: "q9",
        title: "שאלה 9 · ארגז חול (Sandbox) ופונקציית exec",
        prompt: "א. (12 נקודות) מהו ארגז חול (Sandbox) וכיצד הוא מאפשר הרצה מבוקרת של קוד שאינו מהימן?\nב. (13 נקודות) תוכניתן מנסה להריץ סקריפטים של משתמשים באמצעות הפונקציה exec() בפייתון, ומעביר מילון גלובלי ללא __builtins__ במטרה לחסום גישה לפונקציות מסוכנות. מדוע גישה זו אינה בטוחה, כיצד ניתן לעקוף אותה, ומה הפתרון המומלץ?",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<p><strong>סעיף א':</strong> ארגז חול (Sandbox) הוא מנגנון אבטחה המבודד סביבת ריצה ומונע מקוד זדוני או לא מהימן לגשת למשאבי מערכת קריטיים (קבצים, תהליכים, רשת וזיכרון). הוא מיושם באמצעות הגבלת קריאות מערכת בקרנל (כגון <code>seccomp</code>), בידוד מרחבי שמות (Namespaces) והגבלת משאבים (cgroups).</p>
<p><strong>סעיף ב' (חולשת exec וריקון builtins):</strong></p>
<ol>
<li><strong>מדוע זה אינו בטוח:</strong> ריקון המילון <code>__builtins__</code> אינו מונע עקיפה. בפייתון, מנגנון ה-Reflection (התבוננות עצמית של אובייקטים) מאפשר לתוקף להגיע לאובייקטי בסיס במערכת ולהחזיר גישה לכל מודול קיים.</li>
<li><strong>כיצד ניתן לעקוף:</strong> דרך כל אובייקט קיים (כגון מחרוזת ריקה <code>""</code> או טאפל), ניתן לגשת למחלקת הבסיס <code>object</code> ולאתר מחלקות טעונות דרך:
<pre class="code" dir="ltr"><code>[c for c in ().__class__.__bases__[0].__subclasses__() if c.__name__ == 'catch_warnings'][0]()._module.__builtins__['__import__']('os').system('whoami')</code></pre>
או גישה ישירה ל-<code>os._wrap_close</code>. הדבר מאפשר הרצת פקודות מערכת שרירותיות (RCE) בקלות.</li>
<li><strong>הפתרון המומלץ:</strong> אין להסתמך על בידוד ברמת מפרש הפייתון עבור קוד עוין. יש להריץ את הקוד בתוך תהליך מבודד חיצוני ברמת מערכת ההפעלה (Container / Docker, מכונה וירטואלית VM, או סינון קריאות מערכת עם <code>seccomp</code> ללא הרשאות root).</li>
</ol>`,
        verdictKind: "official",
        verdict: "הסבר מקיף של שיטת ה-Sandbox Escape דרך Reflection ו-subclasses.",
      },
    ],
  },
  {
    id: "e-2022c",
    title: "סימולציה בסגנון 2022ג",
    minutes: 180,
    pick: 3,
    note: "שחזור לפי זיכרון. אין פתרון רשמי. האמריקאית על bind אינה מהמועד: שאלת ההפניות לא שוחזרה.",
    partA: [
      {
        id: "a1",
        prompt: "אפחות (Mitigation):",
        options: [
          { id: "a", text: "ניצול חולשה." },
          { id: "b", text: "הגנה שמזערה נזק." },
          { id: "c", text: "רק הצפנה." },
          { id: "d", text: "מערכת בלי באגים." },
        ],
        answer: "b",
        hint: "<p>האם אפחות מסלק את החולשה עצמה או שהוא מנגנון שמפחית את ההשפעה ומקשה על הניצול בזמן תקיפה?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> אפחות (Mitigation) היא אמצעי הגנה או מנגנון אבטחה שנועד למזער את הנזק מתקיפה או להקשות על ניצול החולשה (כדוגמת ASLR, קנרית מחסנית או DEP), מבלי לחסל לחלוטין את שורש החולשה בקוד.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> ניצול חולשה (Exploit) הוא שלב התקיפה שמבצע התוקף כדי להשיג גישה, ההפך הגמור מאפחות.</li>
<li><strong>ג' שגויה:</strong> הצפנה היא רק כלי הגנה נקודתי אחד להבטחת סודיות או שלמות, בעוד אפחות כוללת מגוון רחב של מנגנוני הגנה מערכתיים והנדסיים.</li>
<li><strong>ד' שגויה:</strong> מערכת ללא באגים היא מצב אידיאלי בלתי מציאותי. אפחות מניחה מראש שבאגים וחולשות עלולים להתקיים, ופועלת להקטנת פגיעתם.</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "שכבת הייצוג ב-OSI:",
        options: [
          { id: "a", text: "ניתוב." },
          { id: "b", text: "קידוד / דחיסה / הצפנה." },
          { id: "c", text: "לחיצת יד TCP." },
          { id: "d", text: "DHCP." },
        ],
        answer: "b",
        hint: "<p>מהן שלוש הפעולות העיקריות המזוהות עם שכבה 6 (Presentation) במודל OSI?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> שכבת הייצוג (Presentation Layer - שכבה 6) עוסקת במבנה וייצוג המידע: קידוד נתונים והמרת תחביר (Syntax), דחיסת מידע, והצפנה/פענוח ברמת הייצוג.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> ניתוב מנות מתבצע בשכבת הרשת (Network Layer - שכבה 3) באמצעות נתבים ופרוטוקול IP.</li>
<li><strong>ג' שגויה:</strong> לחיצת יד משולשת (3-way handshake) שייכת לפרוטוקול TCP בשכבת התעבורה (Transport Layer - שכבה 4).</li>
<li><strong>ד' שגויה:</strong> פרוטוקול DHCP פועל בשכבת היישום (Application Layer - שכבה 7) להקצאת כתובות IP דינמיות.</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "פייתון והעמסה:",
        options: [
          { id: "a", text: "יש העמסה כמו C++." },
          { id: "b", text: "אין; הסתרת שם, ברירות מחדל, kwargs." },
          { id: "c", text: "רק עם virtual." },
          { id: "d", text: "רק ב-C." },
        ],
        answer: "b",
        hint: "<p>מה קורה בפייתון כשמגדירים שתי פונקציות בעלות אותו שם אך עם חתימות שונות?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> בפייתון אין העמסת פונקציות (Function Overloading) קלאסית לפי טיפוסי או מספר הפרמטרים כמו ב-C++. הגדרת פונקציה בעלת אותו שם דורסת/מסתירה (shadows) את ההגדרה הקודמת. התנהגות גמישה מושגת באמצעות ערכי ברירת מחדל, פרמטרים שמיים ו-<code>*args, **kwargs</code>.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> פייתון אינה תומכת בהעמסה מובנית לפי חתימה (signature dispatch) כפי שקיים בשפות סטטיות כמו C++ או ג'אווה.</li>
<li><strong>ג' שגויה:</strong> המילה <code>virtual</code> כלל אינה קיימת בפייתון; כל המתודות בפייתון וירטואליות ופולימורפיות כברירת מחדל.</li>
<li><strong>ד' שגויה:</strong> שפת C אינה תומכת בהעמסת פונקציות (Overloading).</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "קטע C++ בלי טיפוס למשתנה:",
        options: [
          { id: "a", text: "רץ עם auto תמיד." },
          { id: "b", text: "שגיאת קומפילציה (בלי auto/תבנית)." },
          { id: "c", text: "רק אזהרה." },
          { id: "d", text: "זה פייתון." },
        ],
        answer: "b",
        hint: "<p>האם C++ היא שפה בעלת טיפוסיות סטטית? מה מחייב התקן בעת הצהרה על משתנה?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> C++ היא שפה בעלת טיפוסיות סטטית חזקה (Statically Typed). כל משתנה חייב להיות מוצהר עם טיפוס מוגדר מראש (או באמצעות מילת המפתח <code>auto</code> להסקה סטטית, או כפרמטר תבנית). הצהרה על משתנה ללא טיפוס תוביל לשגיאת קומפילציה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> הקומפיילר אינו מנחש <code>auto</code> מעצמו אם המשתמש השמיט כליל את הטיפוס; חובה לציין מפורשות <code>auto</code> (החל מ-C++11) ואתחול.</li>
<li><strong>ג' שגויה:</strong> זו אינה אזהרה (Warning) אלא שגיאת קומפילציה חמורה המונעת לחלוטין את בניית הקובץ.</li>
<li><strong>ד' שגויה:</strong> השאלה עוסקת במפורש בקוד C++, שבו כללי הטיפוסיות קשיחים.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. שאלת ההפניות בחלק א לא שוחזרה בניסוח שאפשר לסמוך עליו. bind לכתובת IP נקובה בשרת (לא INADDR_ANY):",
        options: [
          { id: "a", text: "השרת מקשיב ומקבל חיבורים רק בממשק הרשת הספציפי ששויך לכתובת זו." },
          { id: "b", text: "השרת מקבל תעבורה מכל ממשקי הרשת המחוברים ומבצע סינון בחומת האש." },
          { id: "c", text: "מתבצעת הפניית פורטים אוטומטית (NAT) בנתב החיצוני המפנה אליו." },
          { id: "d", text: "הקריאה תיכשל בזמן ריצה, כיוון ששקע שרת מחויב להיקשר אך ורק ל-INADDR_ANY." },
        ],
        answer: "a",
        hint: "<p>מה ההבדל בין קשירת שקע ל-INADDR_ANY לבין קשירתו לכתובת IP מפורשת של ממשק יחיד (כגון 127.0.0.1)?</p>",
        solution: `<p><strong>התשובה: א'.</strong> כאשר שרת מבצע קריאת <code>bind()</code> לכתובת IP ספציפית (לדוגמה <code>127.0.0.1</code>), השקע מאזין ומקבל פניות אך ורק דרך ממשק הרשת (Network Interface) המשויך לאותה כתובת. לעומת זאת, קשירה ל-<code>INADDR_ANY</code> מאפשרת קבלת חיבורים מכלל ממשקי הרשת הזמינים במכונה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> קבלת תעבורה מכל הממשקים מאפיינת שימוש ב-<code>INADDR_ANY</code>, ואילו ציון IP ספציפי חוסם פיזית ברמת מערכת ההפעלה הגעת חבילות מממשקים אחרים.</li>
<li><strong>ג' שגויה:</strong> הפונקציה <code>bind</code> היא קריאת מערכת מקומית במערכת ההפעלה ואינה מגדירה או מתקשרת עם טבלאות NAT בנתבים חיצוניים.</li>
<li><strong>ד' שגויה:</strong> קשירה לכתובת ספציפית היא תקינה ונפוצה ביותר (למשל לצורך הגבלת שרת לשירות פנימי בלבד דרך Loopback).</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · שטח משולש ומצולע",
        prompt: "פונקציה לשטח לפי שתי צלעות וזווית כלולה 0.5·a·b·sin(γ), ברירות מחדל ו-kwargs; הדגמה בלי כל הארגומנטים; מחלקת מצולע (הדפסה+היקף) ומשולש שווה-צלעות יורש עם שטח.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>import math
def area(a=3, b=4, gamma=90, **kwargs):
    g = kwargs.get("gamma", gamma)
    return 0.5 * a * b * math.sin(math.radians(g))
print(area())
print(area(b=5, gamma=60))

class Polygon:
    def __init__(self, sides):
        self.sides = list(sides)
    def perimeter(self):
        return sum(self.sides)
    def __str__(self):
        return "Polygon " + str(self.sides)

class Equilateral(Polygon):
    def __init__(self, a):
        super().__init__([a, a, a])
    def area(self):
        a = self.sides[0]
        return (math.sqrt(3) / 4) * a * a</code></pre>`,
        verdictKind: "new",
        verdict: "אין פתרון רשמי. מכסה נוסחה, kwargs, ירושה ושטח למשולש שווה-צלעות.",
      },
      {
        id: "q7",
        title: "שאלה 7 · שלוש אפחות לגלישה",
        prompt: "לפחות שלוש שיטות מול התקפות מבוססות overflow / דריסת חזרה.",
        hadOfficial: false,
        official: "",
        proposed: "<p>קנרית; ASLR; NX; בדיקות אורך; קומפיילר (stack protector).</p>",
        verdictKind: "new",
        verdict: "אין רשמי. די כמו שאלה 7 ב-2024.",
      },
      {
        id: "q8",
        title: "שאלה 8 · echo על 192.168.1.5",
        prompt: "שרת TCP שמקשיב לכתובת הנקובה ומחזיר echo. הכתובת אינה INADDR_ANY.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>#include &lt;arpa/inet.h&gt;
#include &lt;string.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;unistd.h&gt;
int main(void) {
  int ls = socket(AF_INET, SOCK_STREAM, 0);
  int yes = 1;
  setsockopt(ls, SOL_SOCKET, SO_REUSEADDR, &amp;yes, sizeof yes);
  struct sockaddr_in a;
  memset(&amp;a, 0, sizeof a);
  a.sin_family = AF_INET;
  a.sin_port = htons(8080);
  inet_pton(AF_INET, "192.168.1.5", &amp;a.sin_addr);
  bind(ls, (struct sockaddr *)&amp;a, sizeof a);
  listen(ls, 4);
  int c = accept(ls, 0, 0);
  char buf[512];
  ssize_t n = recv(c, buf, sizeof buf, 0);
  if (n &gt; 0) send(c, buf, (size_t)n, 0);
  close(c);
  close(ls);
}</code></pre>`,
        verdictKind: "new",
        verdict: "פורט לא צוין בשחזור — 8080 כמקובל בקורס. bind לכתובת הספציפית.",
      },
      {
        id: "q9",
        title: "שאלה 9 · ארגז חול ו־exec",
        prompt: "כמו 2021א-74 שאלה 9.",
        hadOfficial: false,
        official: "",
        proposed: "<p>ראו סימולציית 2021א-74 שאלה 9 — אותו נוסח משוחזר.</p>",
        verdictKind: "new",
        verdict: "השחזור הפנה במפורש לשם.",
      },
    ],
  },
    {
    id: "e-2024",
    title: "סימולציה מלאה · 2024א מועד א (26.2.2024)",
    minutes: 180,
    pick: 3,
    note: "שאלון 26.2.2024 מלא ומדויק: אופרטור טרינארי ב-++C, חולשה (Vulnerability), סיביות ב-IPv6, העתקה רדודה בפייתון, העמסת פונקציות, פייתון מילים וספר עם type(), שלוש הגנות לכתובת חזרה (קנרית, ASLR, Shadow Stack), לקוח פייתון בצ'אנקים ושרת ++C מלא, וניתוח חולשות Off-by-one / UAF ב-++C.",
    partA: [
      {
        id: "a1",
        prompt: "מה הדרך הנכונה לרשום ביטוי מותנה משולש (Ternary Operator) ב-++C?",
        options: [
          { id: "a", text: "condition ? expr_if_true : expr_if_false;" },
          { id: "b", text: "condition ?? expr_if_true : expr_if_false;" },
          { id: "c", text: "expr_if_true if condition else expr_if_false;" },
          { id: "d", text: "רק באמצעות בלוק if-else רגיל, אין אופרטור טרינארי ב-++C." },
        ],
        answer: "a",
        hint: "<p>מהו התחביר הסטנדרטי של האופרטור הטרנרי בשפות ממשפחת C/C++?</p>",
        solution: "<p><strong>התשובה: א'.</strong> האופרטור המותנה המשולש (Ternary Conditional Operator) ב-C++ נכתב בתחביר <code>condition ? expr_if_true : expr_if_false</code>. הוא מעריך את התנאי ומחזיר את ערך הביטוי המתאים. ב' משתמש בסימן לא קיים ב-C++; ג' הוא התחביר של פייתון; ו-ד' שגוי כיוון שהאופרטור קיים ונתמך.</p>",
      },
      {
        id: "a2",
        prompt: "מהי ההגדרה המדויקת של חולשת אבטחה (Vulnerability) לפי מדריך הלמידה?",
        options: [
          { id: "a", text: "פעולת התקיפה בפועל שמבצע התוקף כנגד המערכת." },
          { id: "b", text: "פגם או ליקוי תכנוני/מימושי במערכת המאפשר לתוקף לחרוג ממדיניות האבטחה." },
          { id: "c", text: "באג חישובי שגורם לקריסת התוכנית אך אינו מאפשר פגיעה באבטחה." },
          { id: "d", text: "אמצעי ההגנה שמפתח המערכת מתקין כדי לחסום תקיפות." },
        ],
        answer: "b",
        hint: "<p>האם חולשה היא הפעולה של התוקף (Exploit), או הליקוי הקיים בתוך המערכת?</p>",
        solution: "<p><strong>התשובה: ב'.</strong> חולשה (Vulnerability) מוגדרת כפגם, לקות או פרצה בתכנון, במימוש או בתצורה של מערכת מחשב, אשר מאפשרת ליריב/תוקף לפגוע באחד מעקרונות ה-CIA (סודיות, שלמות, זמינות) ולחרוג ממדיניות האבטחה המוגדרת.</p>",
      },
      {
        id: "a3",
        prompt: "כמה סיביות (Bits) יש בכתובת פרוטוקול IPv6?",
        options: [
          { id: "a", text: "32 סיביות (4 בתים)." },
          { id: "b", text: "128 סיביות (16 בתים)." },
          { id: "c", text: "64 סיביות (8 בתים)." },
          { id: "d", text: "48 סיביות (6 בתים)." },
        ],
        answer: "b",
        hint: "<p>כתובת IPv4 מכילה 32 סיביות. פי כמה הוגדל מרחב הכתובות ב-IPv6?</p>",
        solution: "<p><strong>התשובה: ב'.</strong> כתובת פרוטוקול IPv6 מורכבת מ-128 סיביות שהן בדיוק 16 בתים (פי 4 מאורך כתובת IPv4 שהיא 32 סיביות / 4 בתים).</p>",
      },
      {
        id: "a4",
        prompt: "האם הקוד הבא מעתיק את הרשימה a בצורה רדודה (Shallow) או עמוקה (Deep):\na = [[1, 2], [3, 4], [5, 6]]\nb = a.copy()\nb[0].append(4)",
        options: [
          { id: "a", text: "העתקה רדודה (Shallow Copy). האיבר הראשון ב-a ישתנה גם הוא (נקבל [1, 2, 4])." },
          { id: "b", text: "העתקה עמוקה (Deep Copy). שינוי ב-b לא ישפיע כלל על a." },
          { id: "c", text: "העתקה לפי הפניה מלאה (Aliasing), שני המשתנים הם בדיוק אותו אובייקט a is b." },
          { id: "d", text: "שגיאת זמן ריצה בעת הוספת האיבר לתת-הרשימה." },
        ],
        answer: "a",
        hint: "<p>המתודה copy() מעתיקה רק את הרשימה החיצונית ביותר. מה קורה לאובייקטים המוכלים בתוכה?</p>",
        solution: "<p><strong>התשובה: א'.</strong> המתודה <code>list.copy()</code> (כמו גם slicing <code>a[:]</code>) מבצעת העתקה רדודה (Shallow Copy): היא מייצרת רשימה חיצונית חדשה, אך איבריה הם עדיין אותם מצביעים/הפניות לתת-הרשימות המקוריות שבזיכרון. לכן הוספת איבר לתת-הרשימה <code>b[0]</code> משפיעה ישירות גם על <code>a[0]</code>. להעתקה עמוקה מלאה נדרש <code>copy.deepcopy()</code>.</p>",
      },
      {
        id: "a5",
        prompt: "האם וכיצד ניתן לבצע העמסת פונקציות (Function Overloading) בשפת פייתון?",
        options: [
          { id: "a", text: "ניתן להגדיר פונקציות מרובות באותו שם ופייתון בוחרת לפי חתימת הטיפוסים כמו ב-++C." },
          { id: "b", text: "אי אפשר. השפה אינה תומכת בהעמסה מובנית — הגדרה מאוחרת דורסת לחלוטין את הקודמת." },
          { id: "c", text: "ניתן רק בתוך מחלקות (מתודות), אך לא בפונקציות גלובליות." },
          { id: "d", text: "ניתן רק באמצעות שימוש במילה השמורה overload." },
        ],
        answer: "b",
        hint: "<p>כיצד פייתון מנהלת שמות במילון מרחב השמות (Namespace)? מה קורה כשמגדירים פעמיים פונקציה עם אותו שם?</p>",
        solution: "<p><strong>התשובה: ב'.</strong> פייתון אינה תומכת בהעמסת פונקציות מובנית לפי חתימת טיפוסים (Method Overloading). בפייתון פונקציה מוגדרת לפי שמה בלבד; אם נגדיר פונקציה נוספת באותו שם, ההגדרה השנייה תדרוס לחלוטין את הראשונה. במקום העמסה, נהוג להשתמש בפרמטרים אופציונליים (Default Arguments) או ב-<code>*args, **kwargs</code>.</p>",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, ספר, ויצירת מחלקה דינמית",
        prompt: "א. (8 נקודות) לכתוב פונקציה בפייתון שמקבלת מחרוזת עם מילים שמופרדות על ידי רווחים או ירידות שורה, ומדפיסה באותיות גדולות (Uppercase) את המילים שמתחילות ב-pre.\nב. (8 נקודות) ליצור מחלקה בפייתון בשם Book בעלת השדות book_name, writer, year וממשו מתודת הדפסה __str__.\nג. (9 נקודות) קלטו מהמשתמש שם למחלקה חדשה. צרו מחלקה דינמית היורשת מ-Book בעלת השדה openu_id המכיל את מספר הקורס, וממשו בנאי הקורא לבנאי האב.",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<pre class="code" dir="ltr"><code># סעיף א' - סינון והדפסת מילים
def print_pre_words(text: str) -> None:
    if not isinstance(text, str):
        raise ValueError("Input must be a string")
    # split() ללא פרמטרים מפרק לפי כל רווח לבן: רווח, טאב, ירידת שורה
    for word in text.split():
        if word.lower().startswith("pre"):
            print(word.upper())

# סעיף ב' - מחלקת Book
class Book:
    def __init__(self, book_name: str, writer: str, year: int):
        self.book_name = book_name
        self.writer = writer
        self.year = year

    def __str__(self):
        return f"Book: '{self.book_name}' by {self.writer} ({self.year})"

# סעיף ג' - יצירת תת-מחלקה דינמית באמצעות type()
def create_dynamic_book_class():
    class_name = input("Enter subclass name: ").strip()
    if not class_name:
        class_name = "MyCourseBook"

    # בנאי מפורש הקורא לבנאי של Book
    def dynamic_init(self, book_name, writer, year):
        super(self.__class__, self).__init__(book_name, writer, year)

    # יצירת המחלקה בזמן ריצה
    DynamicClass = type(
        class_name,
        (Book,),
        {
            "openu_id": "20937",
            "__init__": dynamic_init
        }
    )
    return DynamicClass</code></pre>`,
        verdictKind: "official",
        verdict: "פתרון מלא ותקין לסעיפים א, ב, ג כולל יצירה דינמית באמצעות type().",
      },
      {
        id: "q7",
        title: "שאלה 7 · מנגנוני הגנה לדריסת כתובת החזרה",
        prompt: "לפרט לפחות על שלוש דרכים להגנה מפני דריסת כתובת החזרה של הפונקציה (הסבירו כיצד כל מנגנון פועל, מה מטרתו וכיצד הוא מסכל את המתקפה).",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<ul>
<li><strong>1. קנרית המחסנית (Stack Canaries / Guard):</strong>
    <ul>
        <li><strong>כיצד זה עובד:</strong> הקומפיילר שותל ערך אקראי וסודי (Canary) במסגרת המחסנית מיד לפני ה-Saved Frame Pointer וכתובת החזרה (Return Address).</li>
        <li><strong>אופן הסיכול:</strong> כל גלישת חוצץ רציפה במחסנית תחויב לדרוס את הקנרית לפני שתגיע לכתובת החזרה. לפני ה-<code>RET</code>, הקוד משווה את הערך במחסנית לעותק השמור ברגיסטר/זיכרון מוגן. אם הערך שונה, התוכנית מזהה תקיפה, מופסקת מיידית (<code>__stack_chk_fail</code>) ומונעת את הקפיצה לכתובת הזדונית.</li>
    </ul>
</li>
<li><strong>2. ASLR (Address Space Layout Randomization):</strong>
    <ul>
        <li><strong>כיצד זה עובד:</strong> מערכת ההפעלה מגרילה בכל הרצה מחדש את כתובות הבסיס של המחסנית, הערמה וספריות המערכת (libc).</li>
        <li><strong>אופן הסיכול:</strong> גם אם התוקף מצליח לדרוס פיזית את כתובת החזרה, הוא אינו יכול לדעת לאן לכוון אותה. ניחוש לא מדויק יוביל לגישה לכתובת לא ממופה ולחיסול מיידי של התהליך על ידי <code>Segmentation Fault</code>.</li>
    </ul>
</li>
<li><strong>3. Shadow Stack (מחסנית צל):</strong>
    <ul>
        <li><strong>כיצד זה עובד:</strong> מנגנון מבוסס חומרה (כגון Intel CET) או תוכנה המחזיק מחסנית שנייה, נפרדת ומוגנת ברמת החומרה/קרנל, המיועדת אך ורק לשמירת כתובות חזרה.</li>
        <li><strong>אופן הסיכול:</strong> בעת פקודת <code>CALL</code>, כתובת החזרה נדחפת לשתי המחסניות. בפקודת <code>RET</code> המעבד משווה ביניהן. אם חוסר התאמה מתגלה עקב דריסה, נוצרת חריגת אבטחה מיידית המונעת את הסטת הביצוע.</li>
    </ul>
</li>
<li><strong>4. מנגנון משלים - DEP / NX (Data Execution Prevention):</strong>
    <ul>
        <li><strong>אופן הפעולה:</strong> סימון דפי ה-Stack כלא ניתנים להרצה ($W \oplus X$). גם אם נדרסה כתובת חזרה והופנתה למחסנית, המעבד יסרב להריץ את הבתים ויוביל לקריסת התוכנית.</li>
    </ul>
</li>
</ul>`,
        verdictKind: "official",
        verdict: "הסבר מקיף של 4 מנגנונים מרכזיים (Canary, ASLR, Shadow Stack, DEP/NX).",
      },
      {
        id: "q8",
        title: "שאלה 8 · העברת קובץ בצ'אנקים: לקוח פייתון ושרת ++C",
        prompt: "סעיף א': ליצור תוכנית בפייתון שקוראת קובץ ושולחת את תוכן הקובץ לשרת בכתובת ופורט מסוימים, כך שגודל כל חבילה לא יעלה על 1024 בתים, ומקבלת אישור מהשרת.\nסעיף ב': לכתוב שרת ב-++C שמקבל את מה שהתוכנית בסעיף א' שולחת ומאשר קבלה (ACK).",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<pre class="code" dir="ltr"><code># סעיף א' - לקוח בפייתון
import socket
import os

SERVER_IP = "127.0.0.1"
SERVER_PORT = 9090
CHUNK_SIZE = 1024

def send_file(filename: str):
    if not os.path.exists(filename):
        print(f"Error: File '{filename}' not found.")
        return

    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_sock:
            client_sock.connect((SERVER_IP, SERVER_PORT))
            with open(filename, "rb") as f:
                while True:
                    chunk = f.read(CHUNK_SIZE)
                    if not chunk:
                        break
                    client_sock.sendall(chunk)

            # סגירת צד הכתיבה להודעה לשרת שהקובץ הסתיים
            client_sock.shutdown(socket.SHUT_WR)

            ack = client_sock.recv(1024)
            print("Server response:", ack.decode('utf-8', errors='ignore'))
    except Exception as e:
        print(f"Communication error: {e}")

# סעיף ב' - שרת ב-++C
/*
#include &lt;iostream&gt;
#include &lt;cstring&gt;
#include &lt;unistd.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;netinet/in.h&gt;

#define PORT 9090
#define BUFFER_SIZE 1024

int main() {
    int server_fd, client_fd;
    struct sockaddr_in address;
    int opt = 1;
    socklen_t addrlen = sizeof(address);
    char buffer[BUFFER_SIZE];

    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) return -1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) &lt; 0) return -1;
    if (listen(server_fd, 3) &lt; 0) return -1;

    std::cout &lt;&lt; "Server listening on port " &lt;&lt; PORT &lt;&lt; std::endl;
    if ((client_fd = accept(server_fd, (struct sockaddr*)&address, &addrlen)) &lt; 0) return -1;

    ssize_t bytes_read;
    while ((bytes_read = recv(client_fd, buffer, sizeof(buffer) - 1, 0)) &gt; 0) {
        buffer[bytes_read] = '\0';
        std::cout &lt;&lt; buffer;
    }

    const char* ack_msg = "ACK: File content received successfully.";
    send(client_fd, ack_msg, strlen(ack_msg), 0);

    close(client_fd);
    close(server_fd);
    return 0;
}
*/</code></pre>`,
        verdictKind: "official",
        verdict: "קוד מלא עבור שני הסעיפים: לקוח פייתון עם shutdown וצ'אנקים, ושרת C++ מלא כולל שקעים והחזרת ACK.",
      },
      {
        id: "q9",
        title: "שאלה 9 · ניתוח חולשות ב-++C (Off-by-One / UAF / Integer Overflow)",
        prompt: "נתון קטע קוד ב-++C ושואלים מה פרצת האבטחה בקטע הקוד, מה נזקה וכיצד לתקנה בצורה דפנסיבית.",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<p>בחינות הקורס כוללות שלוש חולשות זיכרון קלאסיות ב-C/++C:</p>
<ol>
<li><strong>שגיאת Off-by-one:</strong>
    <ul>
        <li><strong>החולשה:</strong> הקצאה של <code>N</code> בתים עבור מחרוזת והעתקה של <code>N</code> תווים יחד עם תו ה-Null Terminator (<code>'\0'</code>), הגולש בית אחד מעבר לגבולות החוצץ (לבית ה-<code>N+1</code>).</li>
        <li><strong>הנזק:</strong> דריסת ה-Saved EBP/RBP במחסנית או מטא-דאטה של בלוק ה-Heap הסמוך, המאפשרת הסטת כתובות זיכרון והשתלטות על זרימת התוכנית (RCE).</li>
        <li><strong>תיקון דפנסיבי:</strong> הקצאה של <code>N + 1</code> בתים, או שימוש ב-<code>std::string</code> המנהל גבולות אוטומטית.</li>
    </ul>
</li>
<li><strong>Use-After-Free / Dangling Pointer:</strong>
    <ul>
        <li><strong>החולשה:</strong> שימוש במצביע לאחר שחרורו באמצעות <code>delete</code> או <code>free</code> ללא איפוסו ל-<code>nullptr</code>.</li>
        <li><strong>הנזק:</strong> תוקף יכול לגרום להקצאת אובייקט זדוני באותו בלוק זיכרון ששוחרר, ולגרום לקריאה למצביעי פונקציות מזויפים (Vtable Hijacking).</li>
        <li><strong>תיקון דפנסיבי:</strong> איפוס מיידי <code>ptr = nullptr;</code> לאחר שחרור, או שימוש ב-Smart Pointers (כגון <code>std::unique_ptr</code>).</li>
    </ul>
</li>
<li><strong>Integer Overflow to Buffer Overflow:</strong>
    <ul>
        <li><strong>החולשה:</strong> חישוב גודל הקצאה כגון <code>malloc(count * sizeof(int))</code> כאשר המכפלה עולה על ערך ה-Integer המקסימלי וגולשת לערך קטן מאוד.</li>
        <li><strong>הנזק:</strong> הקצאת חוצץ קטן בפועל וכתיבה של כמות נתונים גדולה לתוכו, מה שמוביל לגלישת ערמה חמורה (Heap Overflow).</li>
        <li><strong>תיקון דפנסיבי:</strong> בדיקה לפני הכפלה: <code>if (count > SIZE_MAX / sizeof(int)) return ERROR;</code>.</li>
    </ul>
</li>
</ol>`,
        verdictKind: "official",
        verdict: "ניתוח מקיף של שלוש החולשות החוזרות ב-C++ עם הסבר הנזק והתיקון הדפנסיבי.",
      },
    ],
  },
  {
    id: "e-2025c",
    title: "סימולציה בסגנון 2025ג מועד ג",
    minutes: 180,
    pick: 3,
    note: "שאלות 6–9 מהשחזור. חמש האמריקאיות אינן מהמועד: גוף חלק א לא היה במחברות, רק מפתח.",
    partA: [
      {
        id: "a1",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. ASLR נועד בעיקר:",
        options: [
          { id: "a", text: "להצפין את תוכן הדיסק ומערכת הקבצים במנוחה." },
          { id: "b", text: "לגרום לכתובות הזיכרון (מחסנית, ערימה, ספריות) להשתנות באקראי בכל הרצה." },
          { id: "c", text: "למנוע הרצת פקודות מקטעי זיכרון המיועדים לנתונים בלבד." },
          { id: "d", text: "לחסום גלישות חוצץ על ידי שתילת ערך סודי לפני כתובת החזרה." },
        ],
        answer: "b",
        hint: "<p>מהי המשמעות המילולית של Address Space Layout Randomization ואיזה יעד היא שוללת מתוקף?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> מנגנון ASLR (Address Space Layout Randomization) מגריל את כתובות הבסיס של אזורי הזיכרון השונים (המחסנית, הערימה והספריות המשותפות) בכל הפעלה מחדש של התוכנית. כתוצאה מכך, תוקף אינו יכול לחזות מראש כתובות מדויקות (כגון כתובת פונקציה בספרייה או מיקום Shellcode) לצורך קפיצה או מתקפת Return-to-libc.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> הצפנת דיסק (כמו BitLocker) שייכת לשכבת האחסון ואינה קשורה לניהול מרחב הכתובות הווירטואלי של תהליכים.</li>
<li><strong>ג' שגויה:</strong> מניעת הרצת פקודות מאזורי נתונים היא תפקידו של מנגנון DEP / NX (Data Execution Prevention / No-Execute bit).</li>
<li><strong>ד' שגויה:</strong> שתילת ערך סודי במחסנית לפני כתובת החזרה ובדיקתו בסיום הפונקציה היא אופן הפעולה של קנרית המחסנית (Stack Canary).</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. שאילתה פרמטרית (Parameterized Query) מגנה מפני הזרקת SQL כי:",
        options: [
          { id: "a", text: "היא משרשרת את קלט המשתמש ישירות למחרוזת הפקודה לאחר סינון תווים ידני." },
          { id: "b", text: "היא מפרידה לחלוטין בין תחביר הפקודה לבין הנתונים, כך שהקלט לעולם אינו מפוענח כפקודה." },
          { id: "c", text: "היא מצפינה את כל בסיס הנתונים ברמת הטבלאות והשורות." },
          { id: "d", text: "היא מגבילה את הגישה למסד הנתונים אך ורק למשתמש מנהל (root)." },
        ],
        answer: "b",
        hint: "<p>כיצד מסד הנתונים מתייחס לערכים שמועברים בפרמטרים (מצייני מקום כגון <code>?</code>) בהשוואה למחרוזת SQL גולמית?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> שאילתה פרמטרית מפרידה באופן מוחלט בין מבנה השאילתה (התחביר המקומפל מראש על ידי מנוע ה-DB) לבין הערכים המוזנים. הקלט שמספק המשתמש נקשר כפרמטר (Data Literal) בלבד, ולכן גם אם הוא כולל גרשים, גרשיים או פקודות SQL זדוניות (כמו <code>OR 1=1</code>), המנוע לעולם לא יפרש אותם כחלק מתחביר הפקודה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> שרשור מחרוזות ישיר הוא בדיוק הפרקטיקה הפגומה שגורמת לפרצות הזרקת SQL (SQL Injection); רשימות שחורות או סינון ידני אינם תחליף לפרמטריזציה.</li>
<li><strong>ג' שגויה:</strong> שאילתות פרמטריות אינן מנגנון הצפנה של בסיס הנתונים אלא מנגנון תעבורה והרצה מאובטח של פקודות.</li>
<li><strong>ד' שגויה:</strong> שימוש בחשבון מנהל אינו מונע הזרקת SQL (להפך, הוא מעצים את פוטנציאל הנזק), ושאילתות פרמטריות אינן מנהלות הרשאות משתמשים.</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. הקריאה type(name, bases, dict) בפייתון עם 3 ארגומנטים משמשת ל:",
        options: [
          { id: "a", text: "יצירה דינמית של מחלקה חדשה בזמן ריצה (Metaclass construction)." },
          { id: "b", text: "החזרת טיפוס הנתונים של אובייקט קיים לבדיקת טיפוסים בלבד." },
          { id: "c", text: "המרת מחרוזת לערך מספרי שלם (Type Casting)." },
          { id: "d", text: "מחיקת מחלקה מזיכרון המפרש." },
        ],
        answer: "a",
        hint: "<p>מה ההבדל בין קריאה ל-<code>type(obj)</code> עם ארגומנט אחד לבין קריאה עם שלושה ארגומנטים?</p>",
        solution: `<p><strong>התשובה: א'.</strong> בפייתון, לפונקציה <code>type</code> יש שתי מטרות שונות: עם ארגומנט אחד (<code>type(obj)</code>) היא מחזירה את הטיפוס של האובייקט; עם שלושה ארגומנטים (<code>type(name, bases, dict)</code>) היא מתפקדת כמטה-מחלקה (Metaclass) ויוצרת באופן דינמי מחלקה חדשה בזמן ריצה, עם שם, מחלקות בסיס ומילון תכונות/מתודות.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> החזרת טיפוס מתבצעת רק בקריאה ל-<code>type</code> עם ארגומנט יחיד.</li>
<li><strong>ג' שגויה:</strong> המרת מחרוזת למספר שלם נעשית באמצעות הפונקציה <code>int()</code>, לא <code>type()</code>.</li>
<li><strong>ד' שגויה:</strong> <code>type</code> אינו מוחק מחלקות; מחיקת הפניה לאובייקט מתבצעת באמצעות פקודת <code>del</code>.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. מתקפת מניעת שירות מבוזרת (DDoS) פוגעת בעיקר בצלע הבאה של משולש ה-CIA:",
        options: [
          { id: "a", text: "זמינות (Availability)." },
          { id: "b", text: "סודיות (Confidentiality)." },
          { id: "c", text: "שלמות (Integrity)." },
          { id: "d", text: "אי-התכחשות (Non-Repudiation)." },
        ],
        answer: "a",
        hint: "<p>מטרת מתקפת DoS/DDoS היא להציף את השרת בבקשות סרק כך שמשתמשים לגיטימיים לא יוכלו לקבל שירות. לאיזה יעד ב-CIA זה שייך?</p>",
        solution: `<p><strong>התשובה: א'.</strong> מתקפת DDoS (Distributed Denial of Service) מציפה את המערכת, השרת או רוחב הפס התקשורתי בעומס חריג במטרה להשבית את השירות ולמנוע ממשתמשים מורשים גישה אליו. בכך היא פוגעת ישירות בזמינות (Availability) של המערכת.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> פגיעה בסודיות מתרחשת כאשר מידע רגיש נחשף לגורם בלתי מורשה (Data Breach/Leak), דבר שאינו המטרה הישירה של מתקפת מניעת שירות.</li>
<li><strong>ג' שגויה:</strong> פגיעה בשלמות מתרחשת כאשר נתונים משתנים, נמחקים או מושחתים באופן בלתי מורשה.</li>
<li><strong>ד' שגויה:</strong> אי-התכחשות מובטחת באמצעות חתימות דיגיטליות ורישום פעולות (Audit Logs), ואינה הצלע המותקפת ב-DDoS.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. מה תפקידה של טבלת הפונקציות הווירטואליות (vtable) ב-C++?",
        options: [
          { id: "a", text: "לשמור טבלת מצביעים לפונקציות וירטואליות לצורך קישור דינמי (Dynamic Dispatch) בזמן ריצה." },
          { id: "b", text: "לנהל את הקצאות הזיכרון בערימה בעת קריאה לאופרטור new." },
          { id: "c", text: "לשמור את שמות המשתנים המקומיים וכתובותיהם במסגרת המחסנית." },
          { id: "d", text: "למנוע גלישות חוצץ באמצעות בדיקת גבולות מערכים בזמן קומפילציה." },
        ],
        answer: "a",
        hint: "<p>כיצד האובייקט יודע לאיזה מימוש של פונקציה וירטואלית לקרוא כאשר הפנייה אליו נעשית דרך מצביע למחלקת הבסיס?</p>",
        solution: `<p><strong>התשובה: א'.</strong> טבלת ה-vtable (Virtual Method Table) היא מבנה נתונים סטטי שנוצר עבור כל מחלקה המכילה פונקציה וירטואלית אחת לפחות. היא מכילה מצביעים למימושים המתאימים של הפונקציות הווירטואליות. כל אובייקט כולל מצביע (vptr) המפנה ל-vtable של המחלקה האמיתית שממנה הוא נוצר, מה שמאפשר קריאה פולימורפית (קישור דינמי) בזמן ריצה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> ניהול הקצאות זיכרון בערימה מבוצע על ידי ה-Heap Manager / Memory Allocator של מערכת ההפעלה וספריית הריצה, ללא קשר ל-vtable.</li>
<li><strong>ג' שגויה:</strong> משתנים מקומיים מנוהלים על ידי מסגרת המחסנית (Stack Frame) והרגיסטרים (כגון RBP/RSP), ללא קשר למנגנון וירטואלי.</li>
<li><strong>ד' שגויה:</strong> ה-vtable אינה מנגנון אבטחה ואינה בודקת גבולות מערכים (להפך, דריסת מצביע ה-vptr על ידי גלישת חוצץ היא וקטור תקיפה מסוכן).</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, קובץ, ויצירת מחלקה",
        prompt: "wordp: str או ValueError; פיצול בפסיק; מילים שמתחילות ב-im; אות ראשונה גדולה והשאר קטנות. x_file: Setup.csv לכל שורה wordp → Setup-revised.txt, קובץ חסר. מחלקת Book + type לתת-מחלקה עם MainChar.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>def wordp(s):
    if not isinstance(s, str):
        raise ValueError("expected str")
    out = []
    for raw in s.split(","):
        w = raw.strip()
        if w.lower().startswith("im"):
            out.append(w[0].upper() + w[1:].lower() if len(w) else w)
    return out

def x_file():
    try:
        inf = open("Setup.csv", encoding="utf-8")
    except FileNotFoundError:
        print("Setup.csv missing")
        return
    try:
        with inf, open("Setup-revised.txt", "w", encoding="utf-8") as out:
            for line in inf:
                out.write(",".join(wordp(line)) + "\\n")
    except OSError as e:
        print("write failed:", e)

class Book:
    def __init__(self, title, author, year):
        self.title, self.author, self.year = title, author, year
cls_name = input("class: ")
main_char = input("MainChar: ")
Dyn = type(cls_name, (Book,), {"MainChar": main_char})
book = Dyn("t", "a", 1999)</code></pre>`,
        verdictKind: "new",
        verdict: "אין רשמי. פיצול בפסיק כמו בשחזור; startswith im בלי תלות רישיות.",
      },
      {
        id: "q7",
        title: "שאלה 7 · פריסה אקראית (ASLR)",
        prompt: "מהו ASLR, איזו בעיית אבטחה, איך בודקים אם פעיל, ומנגנון נוסף או מגבלה.",
        hadOfficial: false,
        official: "",
        proposed: `<p>ערבוב כתובות מקשה על שימוש בכתובת קבועה לדריסת ret. בדיקה: להדפיס כתובת מקומית בשתי הרצות. נוסף: קנרית / NX. מגבלה: דליפת כתובת מבטלת חלק מההגנה; לא מתרגלים עקיפה.</p>
<pre class="code" dir="ltr"><code>int x; printf("%p\\n", (void *)&amp;x);</code></pre>`,
        verdictKind: "new",
        verdict: "אין רשמי.",
      },
      {
        id: "q8",
        title: "שאלה 8 · טבלה וירטואלית, הסבר בלבד",
        prompt: "הסבירו פונקציות וירטואליות, קשר מצביע-אובייקט, ומה קורה ב-obj->show(). לא משנים כניסות בטבלה באתר.",
        hadOfficial: false,
        official: "במחברות ביקשו גם להצביע את הכניסה הראשונה לפונקציה חיצונית — זה תרגיל כתיבה לזיכרון. לא בסימולציה.",
        proposed: "<p>ל-Derived יש vtable עם show של הבסיס אם לא נדרס. obj מסוג Base* לאובייקט Derived: הקריאה בזמן ריצה לפי הטבלה של האובייקט. כתיבה לטבלה שוברת שלמות — לא מממשים.</p>",
        verdictKind: "new",
        verdict: "עונה על סעיף ההסבר. סעיף ההחלפה נחסם במכוון.",
      },
      {
        id: "q9",
        title: "שאלה 9 · פרוקסי ומטמון SQLite",
        prompt: "שרת 8080, URL עד 2048, טבלת url_cache עם ?, קובץ בדיסק, dataclass, מחיקת הישן מעל 10 רשומות.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>from dataclasses import dataclass
import sqlite3, time
@dataclass
class UrlRecord:
    url: str
    path: str
    ts: float

def get_cached(conn, url):
    row = conn.execute(
        "SELECT path FROM url_cache WHERE url = ?", (url,)
    ).fetchone()
    return row[0] if row else None

def put(conn, rec: UrlRecord):
    conn.execute(
        "INSERT INTO url_cache(url, path, ts) VALUES(?,?,?)",
        (rec.url, rec.path, rec.ts),
    )
    n = conn.execute("SELECT COUNT(*) FROM url_cache").fetchone()[0]
    while n &gt; 10:
        old = conn.execute(
            "SELECT url, path FROM url_cache ORDER BY ts ASC LIMIT 1"
        ).fetchone()
        conn.execute("DELETE FROM url_cache WHERE url = ?", (old[0],))
        # os.remove(old[1]) אם הקובץ קיים
        n -= 1
    conn.commit()</code></pre>
<p>השרת: recv, בדיקת אורך, אם במטמון קוראים קובץ, אחרת get_response, שומרים קובץ+רשומה. URL לא מודבק ל-SQL.</p>`,
        verdictKind: "new",
        verdict: "אין רשמי. ORDER BY ts + ? למחיקה ממלאים את סעיף ב' בלי הזרקה.",
      },
    ],
  },
    {
    id: "e-2026a",
    title: "בחינה רשמית מלאה · 2026א מועד 91 (שאלון 534)",
    minutes: 180,
    pick: 3,
    note: "שאלון 534 (מועד 91 - 26 בפברואר 2026) מלא ומדויק: אופרטור טרינארי ב-++C, הזרקת SQL עם %s בפייתון, הגנת ASLR מול ROP, הגדרת צימוד (Coupling), טיפוס type(x) בפייתון, פייתון Book ו-BookRevised מקובץ עם שגיאות, פולימורפיזם ודריסת vtable ב-++C, לקוח Linux C++ שולח קובץ בצ'אנקים עם כותרת big-endian ומסד phrases.txt ב-SQLite, ועץ חיפוש בינארי BTree עם Double-Free.",
    partA: [
      {
        id: "a1",
        prompt: "מהו הפורמט הנכון לשורת ++C המעוניינת להציב במחרוזת Greeting את הערך \"Good day\" כאשר השעה קטנה מ-18, ו-\"Good evening\" לאחר מכן?",
        options: [
          { id: "a", text: "string Greeting = if (time>18) \"Good evening\" else \"Good day\";" },
          { id: "b", text: "str Greeting = if (time>18) {\"Good Evening\"} else {\"Good day\"};" },
          { id: "c", text: "string Greeting = (time>18) ? \"Good day\" : \"Good evening\";" },
          { id: "d", text: "str Greeting = (time>18) ? \"good evening\" : \"Good day\";" },
        ],
        answer: "c",
        hint: "<p>מהו התחביר התקני של האופרטור הטרינארי ב-C++, ואיזה טיפוס מחרוזת קיים בשפה?</p>",
        solution: "<p><strong>התשובה: ג'.</strong> האופרטור הטרינארי ב-++C נכתב במבנה <code>condition ? expr_true : expr_false</code>, וטיפוס המחרוזת הוא <code>string</code> (ולא <code>str</code> כמו בפייתון). משפטי if-else רגילים אינם יכולים לשמש ישירות כביטוי השמה. (הערה: בשאלון המקורי סומנה כבעייתית כיוון שהפכו בין הערכים במסיח, אך ג' היא האפשרות התחבירית התקינה היחידה ב-C++).</p>",
      },
      {
        id: "a2",
        prompt: "יובל כתב את קוד הפייתון הבא לשליפת מידע מבסיס הנתונים. האם תוכלו לתקוף אותו באמצעות הזרקת SQL?\nqry = input(\"Enter a name to search for:\")\nconn = sqlite3.connect(r'c:\\openu\\openu.db')\nc = conn.cursor()\nc.execute(\"SELECT id, name FROM users WHERE name='%s'\" % qry)\nresults = c.fetchall()",
        options: [
          { id: "a", text: "לא. הוא מוגן כי נעשה שימוש בשאילתה פרמטרית." },
          { id: "b", text: "כן. ע\"י המחרוזת: \"AAA' or 1=1; --\"" },
          { id: "c", text: "כן. ע\"י המחרוזת: \"AAA or 1=1\"" },
          { id: "d", text: "לא, מפני שלא ניתן להזין תווים מיוחדים לקלט." },
        ],
        answer: "b",
        hint: "<p>האם שרשור מחרוזות באמצעות אופרטור האחוזים (%) מגן מפני הזרקת SQL? מה עושה הגרש שבתחילת המחרוזת?</p>",
        solution: "<p><strong>התשובה: ב'.</strong> הקוד משתמש בשרשור מחרוזות באמצעות אופרטור האחוזים (<code>% qry</code>) ולא בשאילתה פרמטרית (מציין <code>?</code>). לכן קלט הכולל גרש (<code>'</code>) סוגר את מחרוזת ה-name, הביטוי <code>or 1=1</code> הופך את התנאי ל-True עבור כל השורות, והתווים <code>; --</code> חותכים את המשך השאילתה המקורית בהערה, מה שמאפשר הדלפה מלאה של כל המשתמשים.</p>",
      },
      {
        id: "a3",
        prompt: "כנגד איזו חולשה או שיטת התקפה, יש חשיבות גדולה להגנה מסוג ASLR:",
        options: [
          { id: "a", text: "Return-Oriented Programming (ROP)" },
          { id: "b", text: "Integer Overflow" },
          { id: "c", text: "Heap Spraying" },
          { id: "d", text: "Use-after-free" },
        ],
        answer: "a",
        hint: "<p>איזו מבין המתקפות מבוססת באופן ישיר על ידיעה מראש של כתובות קבועות של מקטעי פקודות (Gadgets) בספריות המערכת?</p>",
        solution: "<p><strong>התשובה: א'.</strong> מתקפת ROP (Return-Oriented Programming) מתבצעת על ידי שרשור קפיצות ל-Gadgets (מקטעי פקודות קיימים בספריות המערכת כגון libc המסתיימים ב-<code>ret</code>). מנגנון ASLR מגריל את כתובות הבסיס של הספריות בכל הרצה מחדש, ובכך מונע מהתוקף לדעת לאן לכוון את כתובות החזרה ומשבש לחלוטין את שרשרת ה-ROP.</p>",
      },
      {
        id: "a4",
        prompt: "מה פירוש המושג Coupling בקורס:",
        options: [
          { id: "a", text: "קיבול חשמלי בין שני חוטים או מוליכים קרובים, שיוצר השפעה ביניהם." },
          { id: "b", text: "רמת הקשר והתלות בין שתי מחלקות או שני מודולים שונים." },
          { id: "c", text: "רמת הקשר בין משתנים ושיטות בתוך אותו מודול או אותה מחלקה." },
          { id: "d", text: "קשר בין שני צמתים שונים בעץ האיומים." },
        ],
        answer: "b",
        hint: "<p>הבחינו בין צימוד (Coupling) בין מודולים שונים, לבין לכידות (Cohesion) בתוך אותו מודול.</p>",
        solution: "<p><strong>התשובה: ב'.</strong> צימוד (Coupling) מגדיר את מידת התלות והקשר ההדדי בין מחלקות או מודולים שונים במערכת (המטרה בהנדסת תוכנה מאובטחת היא Loose Coupling - צימוד רופף). לעומת זאת, אפשרות ג' מגדירה לכידות (Cohesion - מידת המיקוד של רכיבים בתוך אותה מחלקה).</p>",
      },
      {
        id: "a5",
        prompt: "מה יחזיר קטע הקוד הבא בפייתון:\nx = 20.0\nprint(type(x))",
        options: [
          { id: "a", text: "תלוי כיצד הוגדר המשתנה x במקור." },
          { id: "b", text: "<class 'float'>" },
          { id: "c", text: "<class 'str'>" },
          { id: "d", text: "<class 'int'>" },
        ],
        answer: "b",
        hint: "<p>איזה טיפוס נתונים נוצר אוטומטית בפייתון עבור מספר המכיל נקודה עשרונית?</p>",
        solution: "<p><strong>התשובה: ב'.</strong> הערך 20.0 הוא מספר בעל נקודה עשרונית ולכן פייתון מזהה אותו אוטומטית כמספר ממשי מטיפוס <code>float</code>. הפונקציה <code>type(x)</code> מחזירה את טיפוס האובייקט: <code>&lt;class 'float'&gt;</code>.</p>",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, מחלקות Book ו-BookRevised, וקריאת קובץ",
        prompt: "א. (8 נקודות) פונקציה שמקבלת מחרוזת, מזהה מילים שמתחילות ב-pre ומדפיסה באותיות גדולות (אם לא מחרוזת יש לזרוק TypeError).\nב. (8 נקודות) מחלקה Book עם title, author, year, ומחלקה יורשת BookRevised שבה author='many' ונוספת רשימת authors.\nג. (9 נקודות) פונקציה שמקבלת שם קובץ טקסט, טוענת את הספרים ומחזירה רשימת אובייקטים all_books, תוך טיפול בשגיאות ומניעת נפילה עם Traceback.",
        hadOfficial: true,
        official: "פתרון רשמי מתוך שאלון 534 (מועד 91).",
        proposed: `<pre class="code" dir="ltr"><code># סעיף א'
def print_pre_words(text: str) -> None:
    if not isinstance(text, str):
        raise TypeError("Argument must be of type string")
    for word in text.split():
        if word.lower().startswith("pre"):
            print(word.upper())

# סעיף ב'
class Book:
    def __init__(self, title: str, author: str, year: int):
        self.title = str(title)
        self.author = str(author)
        self.year = int(year)

class BookRevised(Book):
    def __init__(self, title: str, authors: list, year: int):
        super().__init__(title, "many", year)
        self.authors = list(authors)

# סעיף ג'
def load_books(filename: str) -> list:
    all_books = []
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                parts = [p.strip() for p in line.split(',')]
                if len(parts) < 3:
                    continue
                title = parts[0]
                year = int(parts[-1])
                author_part = ','.join(parts[1:-1]).strip()
                if author_part.startswith('(') and author_part.endswith(')'):
                    raw_authors = author_part[1:-1].split(',')
                    authors_list = [a.strip() for a in raw_authors if a.strip()]
                    all_books.append(BookRevised(title, authors_list, year))
                else:
                    all_books.append(Book(title, author_part, year))
    except FileNotFoundError:
        print(f"Friendly Error: File '{filename}' was not found.")
    except Exception as e:
        print(f"Friendly Error: Could not read books file: {e}")
    return all_books</code></pre>`,
        verdictKind: "official",
        verdict: "קוד מלא ותקין לפי דרישות הבחינה: TypeError בא', מחלקות וירושה ב-ב', וטיפול שגיאות ללא Traceback ב-ג'.",
      },
      {
        id: "q7",
        title: "שאלה 7 · פולימורפיזם, מצביע וטבלה וירטואלית ב-++C (Vtable Hijacking)",
        prompt: "א. תאר/י את מנגנון הפולימורפיזם בשפת ++C, תן/י דוגמה כיצד נראים מצביע וירטואלי וטבלה וירטואלית.\nב. במה שונה התנהגות של פונקציה וירטואלית, מפונקציה דומה באותה מחלקה שאיננה מוגדרת כוירטואלית?\nג. איזה חולשה קיימת במנגנון שתיארת בסעיף א', כיצד ניתן לנצל אותו? הסביר/י בפירוט.",
        hadOfficial: true,
        official: "פתרון רשמי מתוך שאלון 534 (מועד 91).",
        proposed: `<p><strong>סעיף א' (מנגנון הפולימורפיזם):</strong></p>
<p>ב-++C פולימורפיזם דינמי בזמן ריצה ממומש באמצעות:</p>
<ol>
<li><strong>טבלה וירטואלית (vtable):</strong> מערך סטטי יחיד ברמת המחלקה הנוצר ע"י הקומפיילר במקטע קריאה בלבד (<code>.rodata</code>), המכיל מצביעים לפונקציות הווירטואליות של אותה מחלקה.</li>
<li><strong>מצביע וירטואלי (vptr):</strong> שדה נסתר הנוסף לכל מופע (אובייקט) של המחלקה (לרוב בראש האובייקט, 8 בתים בארכיטקטורת 64-bit), המצביע ל-vtable של המחלקה שנוצרה.</li>
</ol>

<p><strong>סעיף ב' (וירטואלי מול לא-וירטואלי):</strong></p>
<ul>
<li><strong>פונקציה רגילה (לא וירטואלית):</strong> נקשרת סטטית בזמן קומפילציה (Early Binding) לפי הטיפוס המוצהר של המצביע (<code>Base*</code>). הקומפיילר מייצר קריאה ישירה (<code>CALL address</code>) ללא תלות באובייקט שבזיכרון.</li>
<li><strong>פונקציה וירטואלית:</strong> נקשרת דינמית בזמן ריצה (Late Binding) לפי הטיפוס הדינמי של האובייקט. הקריאה מתבצעת בעקיפין דרך ה-vptr וה-vtable, ומפעילה את המימוש הדרוס בנגזרת.</li>
</ul>

<p><strong>סעיף ג' (החולשה וניצולה - Vtable Hijacking):</strong></p>
<ul>
<li><strong>החולשה:</strong> מצביע ה-<code>vptr</code> נמצא בזיכרון הנתונים של האובייקט (ב-Heap או ב-Stack). אם קיימת גלישת חוצץ (Buffer Overflow / Use-After-Free), תוקף יכול לדרוס את ה-<code>vptr</code>.</li>
<li><strong>אופן הניצול:</strong> התוקף בונה בזיכרון vtable מזויפת ומכוון אליה את ה-<code>vptr</code>. כאשר התוכנית תבצע קריאה לפונקציה וירטואלית, המעבד יקרא את מצביע הפונקציה מה-vtable המזויפת ויקפוץ ישירות לקוד שהתוקף שתל (Arbitrary Code Execution / RCE).</li>
<li><strong>אפחות:</strong> הגנת CFI (Control Flow Integrity), בדיקת גבולות קפדנית, ו-ASLR.</li>
</ul>`,
        verdictKind: "official",
        verdict: "הסבר מקיף של מנגנון ה-vptr/vtable, ההבדל בקישור, וחולשת Vtable Hijacking.",
      },
      {
        id: "q8",
        title: "שאלה 8 · לקוח Linux ב-++C ששולח קובץ עם Header, ו-phrases.txt ל-SQLite",
        prompt: "א. (15 נקודות) קוד C/C++ בלינוקס שפותח תקשורת ל-192.168.14.25:8080 ושולח messages.txt בצ'אנקים <= 1024 בתים, עם כותרת 3 מספרי int בייצוג big endian (שם/מזהה, גודל, ומספר חבילה), וטיפול בשגיאות.\nב. (10 נקודות) תוכנית פייתון/C++ שפותחת phrases.txt וקובץ SQLite בשם messages.db ומייצרת טבלת texts (מספר שורה עוקב מ-1, ותוכן השורה).",
        hadOfficial: true,
        official: "פתרון רשמי מתוך שאלון 534 (מועד 91).",
        proposed: `<pre class="code" dir="ltr"><code>// סעיף א' - לקוח לינוקס ב-++C
#include &lt;iostream&gt;
#include &lt;fstream&gt;
#include &lt;cstring&gt;
#include &lt;sys/socket.h&gt;
#include &lt;arpa/inet.h&gt;
#include &lt;unistd.h&gt;

struct PacketHeader {
    int file_id;
    int file_size;
    int packet_seq;
};

void send_messages_file() {
    std::ifstream file("messages.txt", std::ios::binary | std::ios::ate);
    if (!file.is_open()) {
        std::cerr &lt;&lt; "Friendly Error: Could not open 'messages.txt'.\n";
        return;
    }
    std::streamsize total_size = file.tellg();
    file.seekg(0, std::ios::beg);

    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock &lt; 0) {
        std::cerr &lt;&lt; "Friendly Error: Failed to create socket.\n";
        return;
    }

    struct sockaddr_in serv_addr;
    std::memset(&serv_addr, 0, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(8080);
    inet_pton(AF_INET, "192.168.14.25", &serv_addr.sin_addr);

    if (connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) &lt; 0) {
        std::cerr &lt;&lt; "Friendly Error: Could not connect to server.\n";
        close(sock);
        return;
    }

    char buffer[1024];
    int seq = 1;
    while (file) {
        file.read(buffer, 1024);
        std::streamsize bytes_read = file.gcount();
        if (bytes_read &lt;= 0) break;

        PacketHeader hdr;
        hdr.file_id = htonl(101); // Big Endian
        hdr.file_size = htonl((int)total_size);
        hdr.packet_seq = htonl(seq++);

        send(sock, (const char*)&hdr, sizeof(hdr), 0);
        send(sock, buffer, bytes_read, 0);
    }
    close(sock);
}

// סעיף ב' - פייתון ומסד SQLite
import sqlite3
import os

def phrases_to_db():
    if not os.path.exists("phrases.txt"):
        print("Error: phrases.txt not found.")
        return
    try:
        with open("phrases.txt", "r", encoding="utf-8") as f:
            lines = [l.strip() for l in f if l.strip()]

        conn = sqlite3.connect("messages.db")
        c = conn.cursor()
        c.execute("CREATE TABLE IF NOT EXISTS texts (line_number INTEGER, content TEXT)")
        c.executemany("INSERT INTO texts VALUES (?, ?)", 
                      [(i + 1, line) for i, line in enumerate(lines)])
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error processing phrases: {e}")</code></pre>`,
        verdictKind: "official",
        verdict: "קוד מלא ותקין לפי כל דרישות השאלון: כותרת big-endian, צ'אנקים <= 1024, וטבלת texts ב-SQLite.",
      },
      {
        id: "q9",
        title: "שאלה 9 · עץ חיפוש בינארי ב-++C ותיקון באג ניהול זיכרון",
        prompt: "נתון מימוש של עץ חיפוש בינארי (Node ו-BTree).\nא. (5 נקודות) בקוד המוצג יש באג. מצאו אותו והסבירו אותו היטב.\nב. (20 נקודות) כיתבו קוד לתיקון הבאג.",
        hadOfficial: true,
        official: "פתרון רשמי מתוך שאלון 534 (מועד 91).",
        proposed: `<p><strong>סעיף א' (הבאג והסברו):</strong></p>
<p>בנאי ההעתקה במחלקה <code>BTree</code> מבצע העתקה שטחית (Shallow Copy):</p>
<pre class="code" dir="ltr"><code>BTree(const BTree& tree) {
    _root = tree._root; // העתקה שטחית!
}</code></pre>
<p>הוא מעתיק רק את ערך המצביע <code>_root</code>, כך ששני אובייקטי העץ מצביעים לאותם צמתים בדיוק ב-Heap. בעת יציאה מבלוק, ה-Destructor של שני האובייקטים ייקרא ויבצע <code>delete _root</code>, מה שיגרום לשחרור כפול של אותו זיכרון (<strong>Double Free Crash</strong>). בנוסף, לא הוגדר אופרטור השמה (הפרת Rule of Three).</p>

<p><strong>סעיף ב' (קוד מתוקן ודפנסיבי - Deep Copy מלא):</strong></p>
<pre class="code" dir="ltr"><code>// בנאי העתקה רקורסיבי עמוק ב-Node
Node(const Node& other) : _value(other._value), _left(nullptr), _right(nullptr) {
    if (other._left != nullptr)
        _left = new Node(*other._left);
    if (other._right != nullptr)
        _right = new Node(*other._right);
}

// ב-BTree: בנאי העתקה עמוק
BTree(const BTree& tree) : _root(nullptr) {
    if (tree._root != nullptr)
        _root = new Node(*tree._root);
}

// אופרטור השמה בטוח בשיטת Copy-and-Swap
BTree& operator=(BTree other) {
    std::swap(_root, other._root);
    return *this;
}</code></pre>`,
        verdictKind: "official",
        verdict: "ניתוח מדויק של שגיאת ה-Shallow Copy / Double Free ותיקון מלא עם Deep Copy ו-Copy and Swap.",
      },
    ],
  },
  {
    id: "e-2024-09-61",
    title: "סימולציה · 19.9.2024 שאלון 61",
    minutes: 180,
    pick: 3,
    note: "שאלון מודפס. חלק א מלא. שאלה 9 בלי ניצול.",
    partA: [
      {
        id: "a1",
        prompt: "מהן חולשות CVE?",
        options: [
          { id: "a", text: "חולשות שהתגלו בתוכנת VPN בשם CVE." },
          { id: "b", text: "חולשות מוכרות בארגון מניסיון קודם באותו ארגון." },
          { id: "c", text: "חולשות מוכרות בארגון הקשורות לתוכנות שהוא משתמש בהן." },
          { id: "d", text: "חולשות אבטחה המקוטלגות במאגר ציבורי בשם CVE." },
        ],
        answer: "d",
        hint: "<p>מהם ראשי התיבות של CVE (Common Vulnerabilities and Exposures) ואיזה סוג מאגר הוא מהווה עבור קהילת האבטחה העולמית?</p>",
        solution: `<p><strong>התשובה: ד'.</strong> מילון ה-CVE (Common Vulnerabilities and Exposures) הוא מאגר ציבורי עולמי סטנדרטי המספק מזהה ייחודי, תיאור ומידע על חולשות אבטחה ידועות בתוכנות ובחומרות לצורך שיתוף מידע ותיאום הגנה בתעשייה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> CVE אינו מוצר VPN ספציפי אלא תקן ומאגר מידע עולמי לחולשות אבטחה.</li>
<li><strong>ב' שגויה:</strong> חולשות פנימיות של ארגון מסוים אינן ההגדרה של CVE; CVE הוא מאגר גלובלי ופומבי.</li>
<li><strong>ג' שגויה:</strong> הגדרה זו מתארת ניהול סיכונים ארגוני של מלאי תוכנה, אך CVE עצמו מקיף חולשות בכלל התוכנות והפלטפורמות בעולם, ללא קשר לארגון יחיד.</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "מה גורם ליצירת חריגה (Exception) בפייתון?",
        options: [
          { id: "a", text: "פקודת raise שזורקת חריגה." },
          { id: "b", text: "שגיאה בהפעלת התכנית שיוצרת מצב לא צפוי." },
          { id: "c", text: "פקודת assert שהתנאי שלה לא מתמלא." },
          { id: "d", text: "כל התשובות נכונות." },
        ],
        answer: "d",
        hint: "<p>האם חריגות בפייתון נוצרות רק באופן יזום בקוד (raise, assert) או גם בעקבות שגיאות זמן ריצה של המפרש (כמו חלוקה באפס או חריגה מגבולות)?</p>",
        solution: `<p><strong>התשובה: ד'.</strong> כל האפשרויות מייצרות חריגות בפייתון: קוד יכול להעלות חריגה באופן מפורש באמצעות <code>raise</code>, המפרש מייצר חריגה בזמן ריצה בעת שגיאה או מצב בלתי צפוי (כגון <code>ZeroDivisionError</code> או <code>IndexError</code>), ופקודת <code>assert</code> שאינה מתקיימת זורקת חריגת <code>AssertionError</code>.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א', ב' ו-ג' חלקיות:</strong> כל אחת מהן אכן גורמת ליצירת חריגה, ולכן התשובה הכוללת והמלאה היא ד' ("כל התשובות נכונות").</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "Basic::tweet וירטואלית נקראת מבנאי Basic. Derived דורס. Basic* p = new Derived(). מה יודפס?",
        options: [
          { id: "a", text: "Basic::tweet()" },
          { id: "b", text: "Derived::tweet()" },
          { id: "c", text: "Basic::tweet() ואז Derived::tweet()" },
          { id: "d", text: "תלוי בקומפיילר, אי אפשר לדעת." },
        ],
        answer: "a",
        hint: "<p>מה קורה לקריאות וירטואליות מתוך בנאי (Constructor) ב-C++? האם האובייקט הנגזר כבר נבנה כאשר בנאי מחלקת הבסיס רץ?</p>",
        solution: `<p><strong>התשובה: א'.</strong> ב-C++, כאשר בנאי של מחלקת בסיס (Basic) רץ, האובייקט הנגזר (Derived) עדיין לא אותחל ושדותיו עדיין אינם קיימים בזיכרון. לכן, מצביע ה-vptr מכוון זמנית ל-vtable של מחלקת הבסיס בלבד. קריאה לפונקציה וירטואלית מתוך בנאי הבסיס תפעיל תמיד את המימוש של הבסיס (Basic::tweet), ולא תופנה למחלקה הנגזרת.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> הפעלת המימוש של Derived אינה מתרחשת ב-C++ בתוך בנאי הבסיס, כדי למנוע גישה לשדות של הנגזר שטרם אותחלו (בשונה למשל מג'אווה שבה הכלל שונה).</li>
<li><strong>ג' שגויה:</strong> אין קריאה כפולה; מבוצעת קריאה בודדת לפונקציה שנקראה, והיא של הבסיס.</li>
<li><strong>ד' שגויה:</strong> התנהגות זו מוגדרת היטב בתקן C++ (סדר בנייה דטרמיניסטי) ואינה תלויה במימוש הקומפיילר.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "Frog f1(5); Frog *p1 = &f1; איפה הם נשמרים?",
        options: [
          { id: "a", text: "f1 במחסנית, p1 בערמה." },
          { id: "b", text: "שניהם בערמה." },
          { id: "c", text: "שניהם במחסנית." },
          { id: "d", text: "p1 במחסנית, f1 בערמה." },
        ],
        answer: "c",
        hint: "<p>האם מופיע בקטע הקוד <code>new</code> או <code>malloc</code>? היכן מוקצים משתנים מקומיים רגילים?</p>",
        solution: `<p><strong>התשובה: ג'.</strong> שני המשתנים <code>f1</code> (אובייקט מסוג Frog) ו-<code>p1</code> (משתנה מצביע מסוג Frog*) מוגדרים כמשתנים מקומיים אוטומטיים בפונקציה, ולכן שניהם מוקצים במסגרת המחסנית (Stack Frame).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' ו-ב' שגויות:</strong> הקצאה בערימה מתבצעת אך ורק כאשר מבוצעת הקצאה דינמית מפורשת עם <code>new</code> או <code>malloc</code>. היות ש-<code>f1</code> הוא משתנה אוטומטי, הוא יושב במחסנית.</li>
<li><strong>ד' שגויה:</strong> <code>f1</code> אינו בערימה; <code>p1</code> מצביע על כתובת במחסנית של <code>f1</code>, והמצביע <code>p1</code> עצמו שמור גם הוא במחסנית.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "אורך כתובת IPv4 מול IPv6?",
        options: [
          { id: "a", text: "32 מול 64 סיביות." },
          { id: "b", text: "32 מול 128 סיביות." },
          { id: "c", text: "48 בשניהם." },
          { id: "d", text: "64 מול 128 סיביות." },
        ],
        answer: "b",
        hint: "<p>כמה בתים יש בכתובת IPv4 (למשל 192.168.1.1) וכמה בתים יש בכתובת IPv6 (16 בתים)?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> כתובת פרוטוקול IPv4 היא באורך 32 סיביות (4 בתים, 4 מספרים עשרוניים בטווח 0–255), בעוד כתובת פרוטוקול IPv6 הורחבה לאורך של 128 סיביות (16 בתים, 8 קבוצות הקסדצימליות).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> 64 סיביות אינו הגודל של כתובת IPv6 אלא רק של ה-Interface Identifier (המחצית הנמוכה).</li>
<li><strong>ג' שגויה:</strong> 48 סיביות הוא הגודל של כתובת MAC בשכבת הקישור (שכבה 2), ולא של כתובת IP בשכבת הרשת.</li>
<li><strong>ד' שגויה:</strong> כתובת IPv4 היא בת 32 סיביות, לא 64.</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · Book, מילון, וחריגה",
        prompt: "Book עם מחרוזות (שם, מחבר, שפה) ומספרים (קטלוג, מחיר, שנה) ובדיקת טיפוסים. מילון books לפי קטלוג. BookDataError. Buy לפי שם+מחבר או קטלוג.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>class BookDataError(Exception):
    pass

class Book:
    def __init__(self, name, author, lang, cat, price, year):
        if not all(isinstance(x, str) for x in (name, author, lang)):
            raise BookDataError("strings")
        if not isinstance(cat, int) or not isinstance(year, int):
            raise BookDataError("ints")
        if isinstance(price, bool) or not isinstance(price, (int, float)):
            raise BookDataError("price")
        self.name, self.author, self.lang = name, author, lang
        self.cat, self.price, self.year = cat, price, year

books = {}

def buy(name=None, author=None, cat=None):
    if cat is not None:
        b = books.get(cat)
        if b is None:
            raise BookDataError("unknown catalog")
        return b
    for b in books.values():
        if b.name == name and b.author == author:
            return b
    raise BookDataError("no match")</code></pre>`,
        verdictKind: "new",
        verdict: "אין פתרון רשמי מצורף. bool הוא תת-טיפוס של int, ולכן מחיר נבדק בנפרד.",
      },
      {
        id: "q7",
        title: "שאלה 7 · קנרית מול CET",
        prompt: "השוו קנרית המחסנית ו-CET: מטרה, פעולה, תוכנה או חומרה, ולאילו חולשות כל מנגנון עונה.",
        hadOfficial: false,
        official: "",
        proposed: "<p>שניהם אפחות מול דריסת כתובת חזרה, לא תיקון של העתקה בלי גבול. קנרית: ערך סודי בין המקומיים לכתובת החזרה, נבדק לפני ret, בתוכנה (המהדר). CET / מחסנית צל: עותק מוגן של כתובת החזרה, השוואה ב-ret, בחומרה עם תמיכת המהדר. קנרית לא שומרת על vptr בערימה. CET לא מונע גלישת ערימה.</p>",
        verdictKind: "new",
        verdict: "ההבחנה: קנרית היא בדיקת ערך בתוכנה; CET הוא מעקב חומרתי אחרי כתובות חזרה.",
      },
      {
        id: "q8",
        title: "שאלה 8 · ערוץ משותף ושליחת קובץ",
        prompt: "האם אפשרי: לקוח C++ מול שרת פייתון; לקוח IPv6 מול שרת IPv4; לקוח RSA מול שרת AES. אחר כך: input.txt אל 8.8.8.8, חבילה עד 64K סיביות.",
        hadOfficial: false,
        official: "",
        proposed: `<p>אפשר כשהפרוטוקול זהה, בלי תלות בשפה או ב-IDE. IPv6 מול IPv4 לא ישירות; צריך תרגום (gateway / NAT64). RSA ו-AES אינם מתחלפים לבד: צריך הסכמה על האלגוריתם.</p>
<pre class="code" dir="ltr"><code>#include &lt;arpa/inet.h&gt;
#include &lt;stdio.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;unistd.h&gt;
enum { CHUNK = 8192 }; /* 64K bits */
int main(void) {
  FILE *f = fopen("input.txt", "rb");
  if (!f) return 1;
  int s = socket(AF_INET, SOCK_STREAM, 0);
  struct sockaddr_in a = {0};
  a.sin_family = AF_INET;
  a.sin_port = htons(80);
  inet_pton(AF_INET, "8.8.8.8", &amp;a.sin_addr);
  if (connect(s, (struct sockaddr *)&amp;a, sizeof a) &lt; 0) return 1;
  char buf[CHUNK];
  size_t n;
  while ((n = fread(buf, 1, CHUNK, f)) &gt; 0)
    if (send(s, buf, n, 0) &lt; 0) break;
  fclose(f);
  close(s);
}</code></pre>`,
        verdictKind: "new",
        verdict: "הפורט לא נקוב בשאלון. 64K סיביות הן 8192 בתים, לא 64K בתים.",
      },
      {
        id: "q9",
        title: "שאלה 9 · אורך לפני calloc",
        prompt: "read_string קורא אורך מהשקע, ntohl, ואז calloc(length+2). מה נשבר, ואיך מתקנים? בלי מתכון ניצול.",
        hadOfficial: false,
        official: "",
        proposed: "<p>אחרי המרה לסדר המכונה, <code>length + 2</code> יכול להיעטף אם האורך קרוב לקצה של <code>size_t</code>. <code>calloc</code> מקצה מעט, והקריאה עדיין לפי האורך המקורי. בקטע המודפס חסר גם פסיק, והסיום כתוב כקריאה ולא כאינדקס. התיקון: לדחות אורך לפני החיבור (<code>length &gt; SIZE_MAX - 2</code> או תקרה קבועה), ורק אז להקצות.</p>",
        verdictKind: "new",
        verdict: "השאלון ביקש גם ניצול. באתר נשאר מה נשבר והבדיקה שלפני החיבור.",
      },
    ],
  },
  {
    id: "e-2025a-12-2",
    title: "סימולציה · 2025א 12.2",
    minutes: 180,
    pick: 3,
    note: "מהזיכרון: range, פייתון, קנרית, לקוח עם כותרת, ושרת. שאר האמריקאיות אינן ניסוח המועד — האפשרויות לא שוחזרו.",
    partA: [
      {
        id: "a1",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. בזיכרון נשמר רק ניסוח אחד על DEP, בלי שאר האפשרויות. מה DEP מונע?",
        options: [
          { id: "a", text: "כל כתיבה או שינוי של נתונים במחסנית או בערימה." },
          { id: "b", text: "את עצם גלישת החוצץ הפיזית מעבר לגבולות המערך." },
          { id: "c", text: "זליגת כתובות זיכרון של פונקציות מערכת (Info Leak)." },
          { id: "d", text: "הרצת קוד (ביצוע פקודות מעבד) מתוך אזורי זיכרון המסומנים כנתונים בלבד." },
        ],
        answer: "d",
        hint: "<p>מה מסמן ביט ה-NX (No-Execute) בדפי הזיכרון של המחסנית והערימה, ואיזה ניסיון של התוקף הוא מכשיל?</p>",
        solution: `<p><strong>התשובה: ד'.</strong> מנגנון DEP / NX (Data Execution Prevention / No-Execute bit) מסמן דפי זיכרון המיועדים לנתונים (כגון המחסנית והערימה) כדפים שאינם ניתנים להרצה. אם המעבד מנסה לטעון את מונה הפקודות (EIP/RIP) מתוך כתובת באזורים אלו (למשל כדי להריץ Shellcode שהוזרק לחוצץ), נזרקת שגיאת הרשאת גישה (Segmentation Fault) והתוכנית מופסקת מיידית.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> המחסנית והערימה חייבות להישאר קריאות וכתיבות (Read/Write) כדי שהתוכנית תוכל לעבוד; DEP מונע הרצה (Execute) בלבד.</li>
<li><strong>ב' שגויה:</strong> DEP אינו מונע את פעולת הגלישה עצמה — הכתיבה מעבר לגבולות עדיין מתרחשת ודורסת נתונים, אלא שהרצת קוד מתוך המחסנית תיחסם.</li>
<li><strong>ג' שגויה:</strong> מניעת זליגת כתובות אינה קשורה ל-DEP, ו-DEP גם אינו מגן בפני מתקפות שאינן מריצות קוד מהמחסנית (כמו Return-Oriented Programming / ROP ו-Return-to-libc).</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. בזיכרון יש תיאור של קריאה מבנאי, בלי השאלה עצמה. קריאה וירטואלית מתוך בנאי הבסיס, כשהנגזר דורס אותה, מגיעה ל:",
        options: [
          { id: "a", text: "מימוש מחלקת הבסיס, כיוון שבזמן ריצת בנאי הבסיס האובייקט הנגזר טרם אותחל." },
          { id: "b", text: "תמיד למימוש המחלקה הנגזרת, כי הזיכרון הוקצה עבור הנגזר." },
          { id: "c", text: "לשגיאת קומפילציה, כי אסור לקרוא לפונקציה וירטואלית מבנאי." },
          { id: "d", text: "שתי הגרסאות מופעלות בזו אחר זו בסדר היררכי." },
        ],
        answer: "a",
        hint: "<p>ב-C++, איזה vtable תקף בזמן שרץ הבנאי של מחלקת הבסיס?</p>",
        solution: `<p><strong>התשובה: א'.</strong> ב-C++, בעת הרצת בנאי מחלקת הבסיס, האובייקט עדיין מוגדר כשייך למחלקת הבסיס (המצביע <code>vptr</code> מכוון ל-vtable של הבסיס). הסיבה היא ששדות המחלקה הנגזרת עדיין לא אותחלו, והפעלת מתודה של הנגזר עלולה לגשת לזיכרון בלתי מאותחל. לכן הקריאה מגיעה תמיד למימוש הבסיס.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> הפעלת המימוש של הנגזר לא תתרחש ב-C++ (בשונה מג'אווה שבה הכלל שונה), שכן C++ מקפידה על בטיחות אתחול מלאה לפי סדר היררכיית הירושה.</li>
<li><strong>ג' שגויה:</strong> התחביר חוקי ומתקמפל לחלוטין (אם כי מוגדר לעיתים כ-Code Smell עקב בלבול אפשרי).</li>
<li><strong>ד' שגויה:</strong> אין שרשור אוטומטי של פונקציות וירטואליות; נקרא אך ורק המימוש היחיד של הבסיס.</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "range(50, 60) מחזיר:",
        options: [
          { id: "a", text: "list" },
          { id: "b", text: "tuple" },
          { id: "c", text: "range" },
          { id: "d", text: "set" },
        ],
        answer: "c",
        hint: "<p>בפייתון 3 (בשונה מפייתון 2 שבה הוחזרה רשימה), איזה אובייקט איטרבילי עצמאי מחזירה הפונקציה <code>range</code>?</p>",
        solution: `<p><strong>התשובה: ג'.</strong> בפייתון 3, הקריאה <code>range(50, 60)</code> מחזירה אובייקט מסוג <code>range</code> (סוג נתונים איטרבילי עצמאי שמייצר ערכים לפי דרישה באופן עצל - Lazy Evaluation, בצריכת זיכרון קבועה O(1)).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> בפייתון 2 פונקציית <code>range</code> החזירה <code>list</code>, אך בפייתון 3 היא מייצרת אובייקט <code>range</code> ייעודי; כדי לקבל רשימה יש להמיר מפורשות: <code>list(range(...))</code>.</li>
<li><strong>ב' שגויה:</strong> טאפל נוצר באמצעות סוגריים עגולים או <code>tuple()</code>, לא על ידי <code>range</code>.</li>
<li><strong>ד' שגויה:</strong> קבוצה (set) נוצרת באמצעות סוגריים מסולסלים או <code>set()</code>, ללא סדר וללא כפילויות.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. אפשרויות ההפניה בזיכרון סומנו כלא מדויקות. הפניה (reference) ב-C++ למחרוזת קיימת s1 נכתבת:",
        options: [
          { id: "a", text: "std::string a = s1; (זו העתקה של המחרוזת)" },
          { id: "b", text: "std::string &a = s1;" },
          { id: "c", text: "std::string *a = &s1; (זה מצביע ולא הפניה)" },
          { id: "d", text: "std::string &a = &s1; (שגיאת קומפילציה עקב אי-התאמת טיפוסים)" },
        ],
        answer: "b",
        hint: "<p>מהו התחביר ב-C++ להגדרת משתנה ייחוס/הפניה (Reference), המחייב קידומת <code>&amp;</code> לצד הטיפוס והשמת האובייקט עצמו ללא אופרטור כתובת?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> ב-C++, הגדרת הפניה (Reference) נעשית באמצעות הסימן <code>&amp;</code> הצמוד לטיפוס בעת ההגדרה, והשמה ישירה של האובייקט המקורי: <code>std::string &amp;a = s1;</code>. כעת <code>a</code> מהווה כינוי (Alias) ישיר ל-<code>s1</code> וכל פעולה עליו מתבצעת על האובייקט המקורי.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> זוהי יצירת משתנה חדש והעתקת ערך (Copy Constructor) של <code>s1</code>, ולא הפניה.</li>
<li><strong>ג' שגויה:</strong> זוהי הגדרת מצביע (Pointer) המחזיק את כתובת הזיכרון של המחרוזת (דורש שימוש באופרטור <code>-&gt;</code> או <code>*a</code> לגישה), ולא הפניה.</li>
<li><strong>ד' שגויה:</strong> ביטוי זה אינו מתקמפל כיוון ש-<code>&amp;s1</code> מחזיר מצביע (<code>std::string*</code>) בעוד ש-<code>a</code> מוגדר כהפניה לאובייקט (<code>std::string&amp;</code>).</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. משפט האפחות בזיכרון לא שלם. אפחות (Mitigation) היא:",
        options: [
          { id: "a", text: "מערכת הפועלת ללא שום באגים או פרצות אבטחה." },
          { id: "b", text: "דרישה להצפנה מלאה בלבד של כלל תעבורת הרשת בארגון." },
          { id: "c", text: "מנגנון הגנה שמטרתו לצמצם את ההשפעה או הנזק הפוטנציאלי מתקיפה ולמנוע את הצלחת הניצול." },
          { id: "d", text: "פעולת הניצול הזדוני המבוצעת על ידי תוקף כנגד חולשה ידועה." },
        ],
        answer: "c",
        hint: "<p>אפחות אינה מנסה להבטיח עולם תיאורטי נטול תקלות, אלא להגן בפועל על המערכת מפני נזקי התקיפה.</p>",
        solution: `<p><strong>התשובה: ג'.</strong> אפחות (Mitigation) מוגדרת כאמצעי בקרה, תכנון או מנגנון אבטחה שמטרתו להפחית את חומרת הנזק, לצמצם את מרחב התקיפה (Attack Surface) או להקשות באופן משמעותי על ניצול מוצלח של חולשות קיימות (דוגמת הגבלת הרשאות, ASLR, קנרית מחסנית וסינון עומסים).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> מערכת נקייה לחלוטין מבאגים אינה יעד מציאותי; אפחות נועדה להגן על המערכת מתוך הנחת עבודה שבאגים תמיד עשויים להימצא.</li>
<li><strong>ב' שגויה:</strong> הצפנה היא רק כלי הגנה נקודתי אחד ואינה מכסה את המושג הרחב של אפחות (הכולל מנגנוני בידוד תהליכים, מניעת גלישות, הגבלת משאבים ועוד).</li>
<li><strong>ד' שגויה:</strong> זוהי הגדרת הניצול (Exploit / Attack), ההפך הגמור מאפחות.</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · im, קובץ, ו-HPBook",
        prompt: "מילים מופרדות בפסיק שמתחילות ב-im: אות ראשונה גדולה והשאר קטנות. קובץ שורה-שורה לקובץ אחר. Book ו-HPBook; בלי ארגומנטים mainChar הוא harry, hermione, Ron.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>def im_words(s):
    if not isinstance(s, str):
        raise ValueError("expected str")
    out = []
    for raw in s.split(","):
        w = raw.strip()
        if w.lower().startswith("im") and w:
            out.append(w[0].upper() + w[1:].lower())
    return out

def convert(src, dst):
    try:
        with open(src, encoding="utf-8") as inf, open(dst, "w", encoding="utf-8") as out:
            for line in inf:
                out.write(",".join(im_words(line)) + "\\n")
    except OSError as e:
        print("file:", e)

class Book:
    def __init__(self, title, author, year):
        self.title, self.author, self.year = title, author, year

class HPBook(Book):
    def __init__(self, title="Harry Potter", author="Rowling", year=1997, mainChar=None):
        super().__init__(title, author, year)
        self.mainChar = ["harry", "hermione", "Ron"] if mainChar is None else mainChar</code></pre>`,
        verdictKind: "new",
        verdict: "הזיכרון לא קובע אם מסננים רק מילות im. כאן כמו הדפוס של מועד ג: נשארות המילים שמתחילות ב-im.",
      },
      {
        id: "q8",
        title: "שאלה 8 · קנרית המחסנית",
        prompt: "למה נוצרה, איך פועלת, מחסנית עם ובלי, ומנגנון נוסף מול אותה בעיה.",
        hadOfficial: false,
        official: "",
        proposed: "<p>נוצרה כי העתקה בלי גבול מגיעה לכתובת החזרה. ערך סודי נשתל לפניה ונבדק לפני ret. בלי קנרית: מקומיים, מסגרת שמורה, כתובת חזרה. עם קנרית: מקומיים, קנרית, מסגרת, כתובת חזרה. נוסף: ASLR או NX/DEP. הקנרית לא מתקנת את ההעתקה.</p>",
        verdictKind: "new",
        verdict: "אין שרטוט רשמי. הסדר הוא של מודל הקורס.",
      },
      {
        id: "q9",
        title: "שאלה 9 · קובץ, כותרת 12 בתים, וארגז חול",
        prompt: "לקוח פייתון שולח קובץ. כותרת: size, packet number, number of packets — 4 בתים כל אחד, big-endian. מטען עד 1024. שגיאה מסודרת אם הקובץ לא נפתח. מה ארגז חול ומה המטרה.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>import socket, struct
def send_file(host, port, path):
    try:
        data = open(path, "rb").read()
    except OSError as e:
        print("cannot open:", e)
        return
    step = 1024
    n = max(1, (len(data) + step - 1) // step)
    s = socket.socket()
    try:
        s.connect((host, port))
        for i in range(n):
            chunk = data[i * step:(i + 1) * step]
            hdr = struct.pack("!III", len(chunk), i + 1, n)
            s.sendall(hdr + chunk)
    except OSError as e:
        print("net:", e)
    finally:
        s.close()</code></pre>
<p>ארגז חול מריץ קוד לא מהימן עם הרשאות וממשקים מצומצמים, כדי שכשל לא יהפוך לשליטה במערכת. מימוש עקרוני: תהליך נפרד, משתמש חלש, בלי רשת אם לא צריך.</p>`,
        verdictKind: "new",
        verdict: "הזיכרון לא קובע אם size הוא גודל המטען או גודל הקובץ. כאן גודל המטען.",
      },
      {
        id: "q10",
        title: "שאלה 10 · שרת שמקבל את אותה כותרת",
        prompt: "שרת C++ שמקבל את הודעות שאלה 9. מה להחזיר ללקוח לא זכור.",
        hadOfficial: false,
        official: "",
        proposed: "<p>קוראים 12 בתים, מפרשים שלושה <code>uint32_t</code> בסדר רשת, ואז קוראים בדיוק את גודל המטען שאושר (לכל היותר 1024). אין תשובה משוחזרת ללקוח, ולכן לא ממציאים פורמט תגובה.</p>",
        verdictKind: "new",
        verdict: "סעיף התגובה חסר בזיכרון.",
      },
    ],
  },
  {
    id: "sim-style-a",
    title: "סימולצייה שלוקטה באמצעות AI",
    minutes: 180,
    pick: 3,
    note: "אותם תפקידי שאלות כמו במבחן לדוגמה א': חלק א על לכידות, העמסה, הסתרה בפייתון, גלישה וחוטים. חלק ב: לקוח TCP, הצפנה היברידית, טבלה וירטואלית, ופייתון על מילון וקובץ. הניסוח חדש, מהחומר שבסבבי השאלות.",
    partA: [
      {
        id: "a1",
        prompt: "מחלקה אחת מחשבת מחיר, פותחת שקע, ובונה HTML. מה נמדד כאן?",
        options: [
          { id: "a", text: "לכידות חזקה: כל המתודות באותה מחלקה." },
          { id: "b", text: "לכידות חלשה: רכיבים באותה מחלקה לא משרתים אחריות אחת." },
          { id: "c", text: "צמידות חלשה בין מחלקות שונות." },
          { id: "d", text: "צמידות הדוקה: תלות ישירה בין מודולים שונים במערכת." },
        ],
        answer: "b",
        hint: "<p>מה ההבדל בין לכידות (Cohesion - פנימי למחלקה) לבין צמידות (Coupling - בין מחלקות)?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> לכידות (Cohesion) מתארת את מידת המיקוד של מחלקה או מודול באחריות לוגית בודדת (Single Responsibility Principle). כאשר מחלקה אחת מבצעת משימות בלתי קשורות (חישוב עסקי, תקשורת רשת, ורינדור תצוגה), הלכידות שלה היא חלשה (Low Cohesion), מה שפוגע בתחזוקתיות, בבדיקות ובשימוש חוזר.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> לכידות חזקה (High Cohesion) מתקיימת רק כאשר כל המתודות והשדות במחלקה משרתים מטרה אחת ממוקדת ומגובשת היטב.</li>
<li><strong>ג' ו-ד' שגויות:</strong> צמידות (Coupling) עוסקת ברמת התלות ההדדית בין רכיבים או מודולים נפרדים, ולא במבנה התפקידים הפנימי בתוך מחלקה בודדת.</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "איזו זוג חתימות היא העמסה (overloading) ב-C++?",
        options: [
          { id: "a", text: "void f(int) ו-int f(int). רק טיפוס החזרה שונה." },
          { id: "b", text: "void f(int) ו-void f(double)." },
          { id: "c", text: "שתי הגדרות void f(int) באותו תחום." },
          { id: "d", text: "פונקציה וירטואלית במחלקת בסיס ודריסתה בנגזרת." },
        ],
        answer: "b",
        hint: "<p>מה נדרש כדי שהעמסת פונקציות (Function Overloading) תהיה תקפה ב-C++ — האם די בשינוי טיפוס ההחזרה, או שרשימת הפרמטרים חייבת להיות שונה?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> ב-C++, העמסת פונקציות (Overloading) מחייבת שהפונקציות ייבדלו ברשימת הפרמטרים שלהן (מספר הפרמטרים, סוגיהם או סדרם). החתימות <code>void f(int)</code> ו-<code>void f(double)</code> נבדלות בטיפוס הפרמטר, ולכן מהוות העמסה תקינה לחלוטין.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> שינוי טיפוס ההחזרה בלבד אינו מספיק להעמסה, ויוביל לשגיאת קומפילציה עקב חתימות פרמטרים זהות שאינן ניתנות להכרעה בקריאה.</li>
<li><strong>ג' שגויה:</strong> שתי הגדרות זהות לחלוטין באותו תחום מהוות הגדרה כפולה (Redefinition Error).</li>
<li><strong>ד' שגויה:</strong> דריסת פונקציה וירטואלית במחלקה נגזרת היא דריסה (Overriding), ולא העמסה (Overloading).</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "בפייתון, obj._Point__x אחרי שדה בשם __x:",
        options: [
          { id: "a", text: "שגיאת קומפילציה כמו private ב-C++." },
          { id: "b", text: "הגישה נחסמת בזמן ריצה על ידי מנגנון הרשאות פנימי." },
          { id: "c", text: "הגישה מצליחה: שני קווים תחתיים מפעילים שינוי שם (Name Mangling) בלבד." },
          { id: "d", text: "זה protected של C++." },
        ],
        answer: "c",
        hint: "<p>מה עושה מנגנון ה-Name Mangling בפייתון לשדות המתחילים בשני קווים תחתיים (כמו <code>__x</code>), והאם הוא מונע גישה פיזית?</p>",
        solution: `<p><strong>התשובה: ג'.</strong> בפייתון אין הרשאות גישה אמיתיות ברמת השפה כמו <code>private</code> ב-C++. כאשר שדה מוגדר עם שני קווים תחתיים (כמו <code>__x</code>), המפרש מבצע עיוות שם (Name Mangling) ומשנה את שמו הפנימי ל-<code>_ClassName__x</code> (למשל <code>_Point__x</code>) כדי למנוע דריסות מקריות בירושה. ניתן לגשת לשדה זה ישירות ולקרוא אותו ללא שום שגיאה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> פייתון אינה שפה מקומפלת סטטית ואינה מייצרת שגיאות קומפילציה על הרשאות גישה.</li>
<li><strong>ב' שגויה:</strong> המפרש אינו חוסם את הגישה לשם המעוות <code>_Point__x</code> בזמן ריצה.</li>
<li><strong>ד' שגויה:</strong> ב-C++ שדה <code>protected</code> נגיש רק למחלקות יורשות, בעוד בפייתון הגישה לשם המעוות אפשרית מכל מקום.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "גלישת חוצץ (Buffer Overflow) יכולה להתרחש:",
        options: [
          { id: "a", text: "רק במחסנית, ליד כתובת חזרה." },
          { id: "b", text: "רק בערימה." },
          { id: "c", text: "רק במקטע הקוד (Text)." },
          { id: "d", text: "בכל אזור שאליו כותבים מעבר לגודל שהוקצה." },
        ],
        answer: "d",
        hint: "<p>האם באג של כתיבה ללא בדיקת גבולות מוגבל רק למחסנית, או שהוא יכול לקרות גם במערך שהוקצה ב-malloc או במשתנה גלובלי?</p>",
        solution: `<p><strong>התשובה: ד'.</strong> גלישת חוצץ (Buffer Overflow) היא פגם כללי בניהול זיכרון שבו תוכנית כותבת נתונים מעבר לגבולות המוקצים של החוצץ. תופעה זו יכולה להתרחש במחסנית (Stack-based Overflow), בערימה (Heap-based Overflow) ובמקטע הנתונים הגלובלי/סטטי (BSS/Data Segment Overflow).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> גלישת מחסנית היא רק סוג אחד של גלישה; גלישות ערימה נפוצות לא פחות (Heap Corruption).</li>
<li><strong>ב' שגויה:</strong> גלישה אינה מוגבלת לערימה בלבד.</li>
<li><strong>ג' שגויה:</strong> מקטע הקוד (Text) מסומן בדרך כלל לקריאה ולהרצה בלבד (Read-Only), וניסיון כתיבה אליו יוביל מיד לשגיאת Segmentation Fault.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "שני חוטים באותו תהליך:",
        options: [
          { id: "a", text: "מרחב כתובות נפרד לכל חוט." },
          { id: "b", text: "ערימה וקבצים משותפים; מחסנית ורגיסטרים נפרדים." },
          { id: "c", text: "עותק נפרד של התוכנית." },
          { id: "d", text: "גם המחסנית משותפת, ולכן אין מרוץ." },
        ],
        answer: "b",
        hint: "<p>מה משותף לכל החוטים בתהליך (זיכרון ומשאבים) ומה חייב להיות פרטי לכל חוט כדי שיוכל לבצע קוד עצמאי?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> חוטים (Threads) בתוך אותו תהליך פועלים באותו מרחב כתובות וירטואלי, ולכן חולקים את הערימה (Heap), את קוד התוכנית (Text), את המשתנים הגלובליים ואת מתארי הקבצים הפתוחים. עם זאת, לכל חוט יש מסלול ריצה עצמאי, ולכן לכל חוט יש מחסנית פרטית (Private Stack), מונה פקודות (PC) ורגיסטרים ייעודיים משלו.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' ו-ג' שגויות:</strong> מרחב כתובות נפרד ועותק זיכרון נפרד מאפיינים תהליכים נפרדים (Processes), לא חוטים באותו תהליך.</li>
<li><strong>ד' שגויה:</strong> המחסנית לעולם אינה משותפת בין חוטים (שיתוף מחסנית היה משבש את רצף הקריאות והחזרות של הפונקציות); בנוסף, עקב השיתוף של הערימה והמשתנים הגלובליים, נדרש סנכרון למניעת תנאי מרוץ (Race Conditions).</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · לקוח TCP",
        prompt: "כתבו לקוח C/C++ ללינוקס שמתחבר ל-10.1.2.3 בפורט 9000, שולח את השורה PING ואז קורא עד 64 בתים או עד תו שורה, המוקדם, ומדפיס.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>#include &lt;arpa/inet.h&gt;
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;unistd.h&gt;
int main(void) {
  int s = socket(AF_INET, SOCK_STREAM, 0);
  if (s &lt; 0) return 1;
  struct sockaddr_in a;
  memset(&amp;a, 0, sizeof a);
  a.sin_family = AF_INET;
  a.sin_port = htons(9000);
  if (inet_pton(AF_INET, "10.1.2.3", &amp;a.sin_addr) != 1) return 1;
  if (connect(s, (struct sockaddr *)&amp;a, sizeof a) &lt; 0) return 1;
  const char *msg = "PING\\n";
  if (send(s, msg, strlen(msg), 0) &lt; 0) return 1;
  char buf[65];
  ssize_t n = recv(s, buf, 64, 0);
  if (n &lt; 0) return 1;
  buf[n] = 0;
  for (ssize_t i = 0; i &lt; n; i++) if (buf[i] == '\\n') { buf[i + 1] = 0; break; }
  fputs(buf, stdout);
  close(s);
}</code></pre>`,
        verdictKind: "new",
        verdict: "אותו דפוס כמו מבחן לדוגמה א': שקע TCP, htons, שליחה, וקריאה חסומה. הכתובת והטקסט כאן אחרים.",
      },
      {
        id: "q7",
        title: "שאלה 7 · מפתח ציבורי והיברידי",
        prompt: "תארו הצפנה במפתח ציבורי ואת מגבלותיה, ואז את הסכמה ההיברידית: איך עובר המפתח ובמה מוצפנים הנתונים אחר כך.",
        hadOfficial: false,
        official: "",
        proposed: "<p>למפתח ציבורי יש זוג: פומבי מצפין, פרטי מפענח. זה איטי, ומפתח פומבי בלי אימות ניתן להחלפה בדרך (MITM). בסכמה ההיברידית מעבירים מפתח סימטרי בעזרת המפתח הפומבי, ואחר כך מצפינים את הנתונים בסימטרי. אימות המפתח הפומבי נעשה בתעודה מול סמכות סרטיפיקטים (Certificate Authority).</p>",
        verdictKind: "new",
        verdict: "המודל הוא של מבחן לדוגמה א' ושל יחידה 5. בלי תעודה, שלב העברת המפתח חשוף.",
      },
      {
        id: "q8",
        title: "שאלה 8 · טבלה וירטואלית",
        prompt: "מהי פונקציה וירטואלית, מהו vptr לפי מודל הקורס, ואיך נבחר המימוש כשמצביע לבסיס מצביע לאובייקט נגזר.",
        hadOfficial: false,
        official: "",
        proposed: "<p>בלי virtual הקריאה נקבעת לפי טיפוס המצביע. עם virtual, לכל מחלקה יש טבלה של כתובות מימוש, ולכל אובייקט יש vptr. במודל הקורס ה-vptr יושב בתחילת האובייקט ומצביע לטבלה של המחלקה האמיתית. הקריאה היא קפיצה לכניסה בטבלה, לא לפי טיפוס המצביע הסטטי. לא כותבים לטבלה.</p>",
        verdictKind: "new",
        verdict: "הסבר בלבד, כמו שאלה 8 במבחן לדוגמה א'.",
      },
      {
        id: "q9",
        title: "שאלה 9 · מילון, משפט וקובץ",
        prompt: "לרשימת מילים: מילון מאורך לכל מילה; משפט שבו המילה הראשונה וכל מילה שמסתיימת ב-n מתחילות באות גדולה; זוגות שמות לקובץ pairs.txt.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>lengths = {w: len(w) for w in words}
out = []
for i, w in enumerate(words):
    out.append(w.capitalize() if i == 0 or w.endswith("n") else w)
phrase = " ".join(out)
names = ("Noa", "Amit", "Dana", "Roni")
pairs = list(zip(names[0::2], names[1::2]))
try:
    with open("pairs.txt", "w", encoding="utf-8") as f:
        f.write("\\n".join(f"{a} - {b}" for a, b in pairs))
except OSError:
    print("Error writing to file pairs.txt")</code></pre>`,
        verdictKind: "new",
        verdict: "אותם שלושה סעיפים כמו שאלה 9 במבחן לדוגמה א'. open בלי מצב כתיבה לא כותב.",
      },
    ],
  },
  {
    id: "sim-style-2021c",
    title: "סימולצייה שלוקטה באמצעות AI · ב'",
    minutes: 180,
    pick: 3,
    note: "אותם תפקידי שאלות כמו בבחינה לדוגמה 2021ג: חלק א על פולימורפיזם, protected, מילים שמורות, הפניה ו-htons. חלק ב: פייתון, SQLite, ASLR ו-DEP, וניתוח גלישה בלי מטען.",
    partA: [
      {
        id: "a1",
        prompt: "Animal::speak וירטואלית. Animal::eat אינה וירטואלית. Dog דורס את שתיהן. Animal* a = new Dog(); a->speak(); a->eat();",
        options: [
          { id: "a", text: "שתיהן Dog, כי האובייקט הוא Dog." },
          { id: "b", text: "שתיהן Animal, כי המצביע הוא Animal*." },
          { id: "c", text: "speak של Dog, eat של Animal." },
          { id: "d", text: "שגיאת קומפילציה על דריסה בלי virtual." },
        ],
        answer: "c",
        hint: "<p>מה ההבדל בקישור (Binding) בין פונקציה שהוגדרה כ-<code>virtual</code> לבין פונקציה רגילה כאשר מפעילים אותן דרך מצביע למחלקת הבסיס?</p>",
        solution: `<p><strong>התשובה: ג'.</strong> הפונקציה <code>speak()</code> הוגדרה כוירטואלית בבסיס, ולכן הקריאה אליה נפתרת בזמן ריצה באמצעות קישור דינמי (vtable) ומפעילה את המימוש הדורס של המחלקה הממשית — <code>Dog::speak()</code>. לעומת זאת, <code>eat()</code> אינה וירטואלית, ולכן הקריאה אליה נפתרת סטטית בזמן קומפילציה לפי הטיפוס המוצהר של המצביע (<code>Animal*</code>) ומפעילה את <code>Animal::eat()</code>.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> <code>eat()</code> אינה וירטואלית, ולכן הקומפיילר אינו משתמש ב-vtable ומקשר אותה ישירות למחלקת הבסיס.</li>
<li><strong>ב' שגויה:</strong> <code>speak()</code> היא וירטואלית, ולכן היא מוכרעת דינמית לפי טיפוס האובייקט (Dog) ולא לפי טיפוס המצביע.</li>
<li><strong>ד' שגויה:</strong> הגדרת פונקציה בעלת שם זהה במחלקה הנגזרת היא פעולה חוקית לחלוטין (הסתרת שמות / Name Hiding) ואינה גורמת לשגיאת קומפילציה.</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "שדה protected ב-C++ נגיש:",
        options: [
          { id: "a", text: "רק מאותה מחלקה בלבד (זהה ל-private)." },
          { id: "b", text: "מהמחלקה ומיורשת, לא מקוד חיצוני רגיל." },
          { id: "c", text: "מכל קובץ באותה תיקייה." },
          { id: "d", text: "מכל מקום בתוכנית ללא שום הגבלה (זהה ל-public)." },
        ],
        answer: "b",
        hint: "<p>מה מבדיל בין <code>private</code> (סגור ליורשות) לבין <code>protected</code> בהיררכיית ירושה מונחית עצמים?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> רמת ההרשאה <code>protected</code> מאפשרת גישה ישירה לשדות ולמתודות מתוך המחלקה המגדירה ומתוך כל מחלקה הנגזרת (יורשת) ממנה. עם זאת, גישה ישירה משאר חלקי הקוד (אובייקטים חיצוניים או פונקציות חופשיות) חסומה לחלוטין, בדיוק כמו <code>private</code>.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> הגבלה לאותה מחלקה בלבד (ללא יורשות) היא ההגדרה של <code>private</code>.</li>
<li><strong>ג' שגויה:</strong> הרשאות גישה ב-C++ הן ברמת טיפוס המחלקה, ואינן מושפעות ממיקום הפונקציה באותו קובץ מקור.</li>
<li><strong>ד' שגויה:</strong> גישה חופשית לכל שייכת ל-<code>public</code>.</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "int, float, str, bool בפייתון הם:",
        options: [
          { id: "a", text: "כולם מילים שמורות (Keywords) שלא ניתן לדרוס." },
          { id: "b", text: "טיפוסים מובנים (builtins), לא keywords." },
          { id: "c", text: "מילים שמורות רק בפייתון 2." },
          { id: "d", text: "אופרטורים מיוחדים של המפרש המוגנים בקומפיילר." },
        ],
        answer: "b",
        hint: "<p>האם פייתון מאפשרת לבצע השמה כגון <code>int = 5</code> בקוד (אף שזו פרקטיקה גרועה מאוד), בשונה ממילים שמורות כמו <code>def</code> או <code>class</code>?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> שמות הטיפוסים הבסיסיים בפייתון (<code>int</code>, <code>str</code>, <code>list</code>, <code>bool</code> וכו') אינם מילים שמורות (Keywords כגון <code>if</code>, <code>def</code>, <code>while</code> שמופיעות ב-<code>keyword.kwlist</code>). הם אובייקטי טיפוס מובנים המוגדרים במודול <code>builtins</code>, וטכנית ניתן אפילו לדרוס אותם במרחב השמות המקומי (למשל <code>str = \"hello\"</code>, הגורם להסתרת הטיפוס המובנה).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> מילים שמורות בפייתון אינן ניתנות להשמה בשום מצב (ניסיון השמה כמו <code>pass = 1</code> יגרור <code>SyntaxError</code> מיידי), בעוד לשמות טיפוסים ניתן לבצע השמה.</li>
<li><strong>ג' ו-ד' שגויות:</strong> שמות אלו מעולם לא היו מילים שמורות ואינם אופרטורים של השפה.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "העברה לפי הפניה (reference) עדיפה על העברה לפי ערך כי:",
        options: [
          { id: "a", text: "היא מונעת שכפול מיותר של תוכן האובייקט וחוסכת זמן העתקה, ומונעת slicing." },
          { id: "b", text: "לא נוצר עותק של האובייקט, והזהות שלו נשמרת." },
          { id: "c", text: "היא הופכת את כל המתודות לוירטואליות אוטומטית." },
          { id: "d", text: "היא מחייבת הרצת הפונקציה במקביל במספר חוטים." },
        ],
        answer: "b",
        hint: "<p>מה קורה כאשר מעבירים אובייקט גדול (כגון וקטור עם מיליון איברים) לפי ערך לפונקציה?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> בהעברה לפי ערך (Pass by Value), מופעל בנאי ההעתקה ונוצר עותק חדש של האובייקט במחסנית. בהעברה לפי הפניה (Pass by Reference, ובפרט <code>const T&amp;</code>), מועברת רק כתובת/כינוי לאובייקט המקורי, לא נוצר עותק, זהות האובייקט נשמרת ונחסכת תקורה חישובית משמעותית.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ג' שגויה:</strong> וירטואליות של מתודות נקבעת אך ורק על ידי מילת המפתח <code>virtual</code> בהגדרת המחלקה, ואינה קשורה לאופן העברת הארגומנט.</li>
<li><strong>ד' שגויה:</strong> העברה בהפניה היא מנגנון סינכרוני רגיל לחלוטין ואינה קשורה לריבוי חוטים.</li>
<li><strong>א' מנוסח באופן חלקי לעומת ב' המדויק:</strong> ב' מתמקד בליבת היתרון — שמירת זהות האובייקט ואי-שכפולו.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "htons על מספר פורט:",
        options: [
          { id: "a", text: "בודקת שהשרת מאזין." },
          { id: "b", text: "ממירה לסדר בתים של הרשת (big-endian)." },
          { id: "c", text: "הופכת מחרוזת למספר." },
          { id: "d", text: "מצפינה את הפורט למניעת האזנה." },
        ],
        answer: "b",
        hint: "<p>מעבדי x86 פועלים בשיטת Little-Endian, ואילו פרוטוקולי הרשת (TCP/IP) מצפים למספרים בסדר Big-Endian. מה עושות פונקציות משפחת htons/htonl?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> ארכיטקטורות מעבדים שונות מייצגות מספרים בזיכרון בסדר בתים שונה (למשל Little-Endian ב-x86/x64 מול Big-Endian). פרוטוקולי האינטרנט מחייבים סדר בתים אחיד ברשת (Network Byte Order, שהוא Big-Endian - הבית המשמעותי ביותר נשלח ראשון). הפונקציה <code>htons</code> (Host to Network Short) מבצעת המרה זו עבור שלם קצר בן 16 סיביות (כמו מספר פורט).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> בדיקת זמינות הפורט מתבצעת על ידי מערכת ההפעלה בעת קריאה ל-<code>bind()</code>, לא על ידי <code>htons</code>.</li>
<li><strong>ג' שגויה:</strong> המרת מחרוזת למספר נעשית באמצעות פונקציות כמו <code>atoi()</code>, בעוד ש-<code>htons</code> מקבלת מספר מספרי וממירה את סדר הבתים שלו.</li>
<li><strong>ד' שגויה:</strong> <code>htons</code> אינה פונקציית הצפנה כלל, ומספר הפורט מועבר גלוי בכותרת ה-TCP/UDP.</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, מחלקה וקובץ",
        prompt: "הדפיסו מילים שמסתיימות ב-ly באותיות קטנות. מחלקת Lab(name, city, seats) ותת-מחלקה RemoteLab עם מילון כלים. קראו שורות name,city,seats מקובץ והדפיסו כמה מעבדות וכמה מקומות יחד.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>def ly_words(text):
    for w in text.split():
        if w.endswith("ly"):
            print(w.lower(), end=" ")

class Lab:
    def __init__(self, name, city, seats):
        self.name, self.city, self.seats = name, city, int(seats)

class RemoteLab(Lab):
    def __init__(self, name, city, seats, tools):
        super().__init__(name, city, seats)
        self.tools = dict(tools)

def load(path):
    labs = []
    try:
        lines = open(path, encoding="utf-8").read().splitlines()
    except OSError:
        print("Could not read from file:", path)
        return
    for line in lines:
        parts = [p.strip() for p in line.split(",")]
        if len(parts) != 3 or not parts[0]:
            continue
        labs.append(Lab(parts[0], parts[1], parts[2]))
    print("Number of labs:", len(labs))
    print("Total seats", sum(x.seats for x in labs))</code></pre>`,
        verdictKind: "new",
        verdict: "אותו שלד כמו שאלה 6 בבחינה לדוגמה 2021ג: סינון מילה, ירושה, וקובץ עם טיפול בשגיאה.",
      },
      {
        id: "q7",
        title: "שאלה 7 · SQLite",
        prompt: "ב-C/C++ פתחו grades.db, צרו Grades(Name, Id, Score), הכניסו שתי רשומות קבועות וסגרו. בפייתון קבלו מזהה והדפיסו ציון. מה נשבר אם מדביקים את המזהה למחרוזת, ואיך נמנעים.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>sqlite3 *db;
if (sqlite3_open("grades.db", &amp;db) != SQLITE_OK) return 1;
sqlite3_exec(db, "CREATE TABLE IF NOT EXISTS Grades(Name TEXT, Id INTEGER, Score INTEGER);", 0, 0, 0);
sqlite3_exec(db, "INSERT INTO Grades VALUES('Ada', 1, 90);", 0, 0, 0);
sqlite3_exec(db, "INSERT INTO Grades VALUES('Mimi', 2, 80);", 0, 0, 0);
sqlite3_close(db);

import sqlite3
conn = sqlite3.connect("grades.db")
sid = input("id: ")
row = conn.execute("SELECT Score FROM Grades WHERE Id = ?", (sid,)).fetchone()
print(row[0] if row else "not found")
conn.close()</code></pre>
<p>הדבקה עם format או f-string מכניסה את הקלט לתחביר. סימן שאלה וטיפל משאירים אותו נתון. exec מתאים כאן רק כי שתי ההכנסות קבועות.</p>`,
        verdictKind: "new",
        verdict: "כמו שאלה 7 בבחינה לדוגמה: DDL קבוע ב-exec, וקלט רק דרך פרמטר.",
      },
      {
        id: "q8",
        title: "שאלה 8 · ASLR ו-DEP",
        prompt: "לכל אחד מ-ASLR ו-DEP: מה המטרה, איך זה פועל, ומה הוא לא מתקן. בלי מטען.",
        hadOfficial: false,
        official: "",
        proposed: `<p><strong>ASLR</strong> מערבב כתובות בין הרצות, כדי שכתובת קבועה של מחסנית או קוד לא תישאר יעד. רואים את זה בהדפסת כתובת מקומית בשתי הרצות. הוא לא מתקן העתקה בלי גבול, ודליפת כתובת מחלישה אותו.</p>
<pre class="code" dir="ltr"><code>int local = 0;
printf("%p\\n", (void *)&amp;local);</code></pre>
<p><strong>DEP / NX</strong> מסמן אזורי נתונים כלא-להרצה. קפיצה למערך תווים נעצרת. דריסת כתובת חזרה אל קוד שכבר מותר להרצה לא נמחקה על ידי זה. קנרית המחסנית היא שכבה נוספת: ערך לפני כתובת החזרה נבדק לפני ret.</p>`,
        verdictKind: "new",
        verdict: "שאלה 8 בבחינה לדוגמה היא ASLR ו-DEP. הקנרית נוספת כשכבה מאותו נושא, בלי קוד תקיפה.",
      },
      {
        id: "q9",
        title: "שאלה 9 · גלישה במחסנית",
        prompt: "char buf[16] ומעתיקים לתוכו שורה בלי גבול. מה החולשה, מה עלול להישבר במחסנית, ואיך מתקנים. בלי מטען.",
        hadOfficial: false,
        official: "",
        proposed: "<p>ההעתקה לא מכירה את 16 הבתים. כתיבה רציפה עוברת את החוצץ אל מה שיושב מעליו במחסנית, כולל כתובת החזרה ש-<code>ret</code> שולף. קנרית שנשתלה לפני הכתובת נדרסת בגלישה רציפה, והבדיקה לפני <code>ret</code> עוצרת. זה לא תיקון: הבאג נשאר. התיקון הוא קריאה או העתקה עם גבול ואפס סיום, למשל <code>fgets(buf, sizeof buf, stdin)</code>.</p>",
        verdictKind: "new",
        verdict: "כמו שאלה 9 בבחינה לדוגמה: מה נשבר ואיך מתקנים. שם זו גלישת ערימה לשדה סמוך; כאן גלישת מחסנית לכתובת חזרה.",
      },
    ],
  },
  {
    id: "e-2021a75",
    title: "סימולציה מלאה · 2021א מועד 75 (טופס 543)",
    minutes: 180,
    pick: 3,
    note: "שאלון 543 (מועד 75) מלא ומדויק: שכבת התעבורה, שדה protected, קריאות וירטואליות, by-value מול by-ref, htons, פייתון מילים ב-ly ו-safe_append, מסד SQLite ושאילתות פרמטריות, עץ בינארי BTree עם Double-Free, ומחלקת Soldier עם גלישת חוצץ.",
    partA: [
      {
        id: "a1",
        prompt: "איזה מהמשפטים הבאים מתאר בצורה הנכונה ביותר את שכבת התעבורה (Transport Layer) במודל OSI / TCP-IP?",
        options: [
          { id: "a", text: "אחראית על ניתוב מנות בין רשתות שונות באמצעות כתובות IP של 32 סיביות." },
          { id: "b", text: "אחראית על תקשורת תהליך-אל-תהליך מקצה לקצה, ניהול מספרי פורט (16 סיביות) ובקרת זרימה/גודש." },
          { id: "c", text: "אחראית על העברת פריימים בין ממשקים פיזיים באותה רשת מקומית בעזרת כתובות MAC." },
          { id: "d", text: "אחראית אך ורק על הצפנת תעבורה ודחיסת נתונים." },
        ],
        answer: "b",
        hint: "<p>מהן יחידות המידע (Segments) ואיזה מזהה משמש להבחנה בין שירותים ותהליכים שונים באותו מארח?</p>",
        solution: "<p><strong>התשובה: ב'.</strong> שכבת התעבורה (שכבה 4, פרוטוקולי TCP/UDP) אחראית על העברת נתונים אמינה או בלתי-אמינה מקצה לקצה (End-to-End) בין תהליכים, ומזהה אותם באמצעות מספרי Port בני 16 סיביות (0-65535). א' שייך לשכבת הרשת (Network); ג' שייך לשכבת הקו (Data Link); ו-ד' שייך לשכבת הייצוג (Presentation).</p>",
      },
      {
        id: "a2",
        prompt: "מה המשמעות של שדה או מתודה מוגנים (protected) במחלקה ב-++C?",
        options: [
          { id: "a", text: "השדה נגיש רק מתוך קוד אותה מחלקה עצמה, ואף מחלקה יורשת אינה יכולה לגשת אליו." },
          { id: "b", text: "השדה נגיש מתוך המחלקה המגדירה ומתוך כל מחלקה שיורשת ממנה, אך לא מחוץ להן." },
          { id: "c", text: "השדה פתוח לגישה חופשית לכל קוד באותו קובץ מקור בלבד." },
          { id: "d", text: "השדה מוצפן בזיכרון על ידי מערכת ההפעלה." },
        ],
        answer: "b",
        hint: "<p>במה רמת ההרשאה protected שונה מ-private ומ-public בהקשר של עצי ירושה?</p>",
        solution: "<p><strong>התשובה: ב'.</strong> הרשאת <code>protected</code> מאפשרת גישה לחברי המחלקה מתוך המחלקה עצמה ומתוך מחלקות נגזרות (יורשות), אך חוסמת גישה ישירה מכל קוד חיצוני (אובייקטים חיצוניים או פונקציות שאינן חברות). בכך היא מאפשרת שיתוף מידע בתוך היררכיית המחלקות תוך שמירה על עקרון הכימוס (Encapsulation).</p>",
      },
      {
        id: "a3",
        prompt: "מה ידפיס קטע הקוד הבא בשפת ++C (פולימורפיזם וקריאות סטטיות):\nclass Base {\npublic:\n    virtual void f() { g(); }\n    void g() { std::cout << \"Base::g \"; }\n};\nclass Derived : public Base {\npublic:\n    void g() { std::cout << \"Derived::g \"; }\n};\nint main() {\n    Base* p = new Derived();\n    p->f();\n    return 0;\n}",
        options: [
          { id: "a", text: "יודפס: Derived::g" },
          { id: "b", text: "יודפס: Base::g" },
          { id: "c", text: "שגיאת קומפילציה כיוון ש-g אינה מוגדרת וירטואלית." },
          { id: "d", text: "שגיאת זמן ריצה (Segmentation Fault)." },
        ],
        answer: "b",
        hint: "<p>שימו לב: הפונקציה f() היא וירטואלית, אך הפונקציה g() אינה וירטואלית (Non-Virtual)! מאיזה הקשר נקראת g() מתוך f()?</p>",
        solution: "<p><strong>התשובה: ב'.</strong> כאשר <code>f()</code> רצה (אפילו מתוך אובייקט Derived), היא קוראת לפונקציה <code>g()</code>. היות ש-<code>g()</code> אינה פונקציה וירטואלית, הקריאה אליה נקשרת סטטית בזמן קומפילציה (Early Binding) לפי הטיפוס שבו היא מוכלת (<code>Base</code>). לכן נקראת <code>Base::g</code> ומודפס <code>Base::g</code>.</p>",
      },
      {
        id: "a4",
        prompt: "באיזה מובן העברת ארגומנט לפי ערך (by-value) עדיפה על פני העברה לפי הפניה (by-reference)?",
        options: [
          { id: "a", text: "העברה לפי ערך תמיד מהירה וצורכת פחות זיכרון מכל העברה אחרת." },
          { id: "b", text: "העברה לפי ערך מבטיחה בידוד ומניעת תופעות לוואי (Side Effects) על האובייקט המקורי אצל הקורא." },
          { id: "c", text: "העברה לפי ערך מאפשרת לפונקציה לשנות ישירות את ערכו של המשתנה המקורי." },
          { id: "d", text: "העברה לפי ערך מחייבת שימוש במצביעים ובאופרטור &." },
        ],
        answer: "b",
        hint: "<p>מה קורה כאשר פונקציה מקבלת עותק עצמאי של הנתון ומשנה אותו בתוכה?</p>",
        solution: "<p><strong>התשובה: ב'.</strong> בהעברה לפי ערך (by-value), הפונקציה מקבלת עותק נפרד לחלוטין של האובייקט. כל שינוי שיבוצע בו בתוך הפונקציה לא ישפיע על המשתנה המקורי אצל הפונקציה הקוראת, מה שמספק הגנה מפני תופעות לוואי בלתי רצויות (אי-מוטטיביות). מבחינת ביצועים וזיכרון, by-reference לרוב יעיל יותר עבור אובייקטים כבדים.</p>",
      },
      {
        id: "a5",
        prompt: "בקטע הקוד הבא ליצירת שקע תקשורת, מה תפקידה של הפונקציה htons?\nserv_addr.sin_port = htons(PORT);",
        options: [
          { id: "a", text: "ממירה מחרוזת של מספר פורט למספר בינארי שלם." },
          { id: "b", text: "ממירה מספר שלם בן 16 סיביות מסדר בתים של המחשב (Host - לרוב Little-Endian) לסדר בתים של הרשת (Network - Big-Endian)." },
          { id: "c", text: "מצפינה את מספר הפורט בפרוטוקול SSL/TLS." },
          { id: "d", text: "בודקת האם הפורט פנוי להאזנה במערכת ההפעלה." },
        ],
        answer: "b",
        hint: "<p>ראשי התיבות של הפונקציה: Host TO Network Short.</p>",
        solution: "<p><strong>התשובה: ב'.</strong> <code>htons</code> מייצגת 'Host TO Network Short'. ברשתות מחשבים (TCP/IP), סדר הבתים הסטנדרטי הוא Big-Endian (Network Byte Order). במעבדים מודרניים רבים (כגון ארכיטקטורת x86), סדר הבתים הוא Little-Endian. הפונקציה ממירה מספר בן 16 סיביות (כמו מספר פורט) לסדר בתים תקין של הרשת כדי שהשרת והנתבים יפענחו את הפורט כהלכה.</p>",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: עיבוד מחרוזות, safe_append ומחלקות חשבון",
        prompt: "א. (8 נקודות) כתבו פונקציה בפייתון המקבלת מחרוזת, מפרקת אותה למילים, ומחזירה רשימה של כל המילים המסתיימות ב-ly באותיות קטנות.\nב. (8 נקודות) כתבו פונקציה safe_append(val, lst) שמוסיפה איבר לרשימה, בצורה שפותרת את מלכודת ה-Mutable Default Argument בפייתון.\nג. (9 נקודות) כתבו מחלקות BankAccount ו-InvestmentAccount ופונקציית טעינה מקובץ.",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<pre class="code" dir="ltr"><code># סעיף א' - מילים שמסתיימות ב-ly
def filter_ly_words(text: str) -> list:
    if not isinstance(text, str):
        return []
    return [w.lower() for w in text.split() if w.lower().endswith("ly")]

# סעיף ב' - פונקציה בטוחה safe_append
def safe_append(val, lst=None):
    if lst is None:
        lst = []
    lst.append(val)
    return lst

# סעיף ג' - מחלקות חשבון וטעינה מקובץ
class BankAccount:
    def __init__(self, name: str, balance: float):
        self.name = name
        self.balance = balance

class InvestmentAccount(BankAccount):
    def __init__(self, name: str, balance: float):
        super().__init__(name, balance)
        self.investments = {}

    def add_investment(self, ticker: str, amount: float):
        self.investments[ticker] = self.investments.get(ticker, 0.0) + amount

def load_accounts(filename: str):
    accounts = []
    with open(filename, 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]
    i, n = 0, len(lines)
    while i < n:
        name = lines[i]; i += 1
        if i >= n: break
        bal_line = lines[i]; i += 1
        if "investments:" in bal_line:
            bal = float(bal_line.split()[0])
            acc = InvestmentAccount(name, bal)
            while i < n and lines[i] != "done investments":
                ticker = lines[i]; qty = float(lines[i+1]); i += 2
                acc.add_investment(ticker, qty)
            if i < n and lines[i] == "done investments": i += 1
            accounts.append(acc)
        else:
            accounts.append(BankAccount(name, float(bal_line)))
    return accounts</code></pre>`,
        verdictKind: "official",
        verdict: "קוד מלא ותקין לסעיפים א, ב, ג כולל פתרון מלכודת ברירת המחדל בפייתון.",
      },
      {
        id: "q7",
        title: "שאלה 7 · פייתון ומסד נתונים SQLite (מניעת SQL Injection)",
        prompt: "א. (10 נקודות) כתבו תוכנית ב-Python ופקודות SQL אשר ניגשת לקובץ מסד נתונים מסוג SQLite בשם server.db, מייצרת בו טבלה בשם Students עם העמודות: Id (מפתח ראשי), Name, ו-Major. הוסיפו 2 רשומות לטבלה עם נתונים לבחירתכם, ושמרו את השינויים.\nב. (10 נקודות) כתבו פונקציה בפייתון המקבלת שם סטודנט מהקלט, מבצעת שאילתת חיפוש במסד הנתונים שנוצר בסעיף א', ומדפיסה את חוג הלימודים (Major) של אותו סטודנט.\nג. (5 נקודות) איזו חולשת אבטחה עלולה להיווצר במימוש שאילתות מסוג זה מול קלט משתמש, וכיצד ניתן להתגונן מפניה?",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<pre class="code" dir="ltr"><code>import sqlite3

# סעיף א' - הקמת טבלה והזנת נתונים
def init_db():
    conn = sqlite3.connect('server.db')
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS Students (Id TEXT PRIMARY KEY, Name TEXT, Major TEXT)")
    c.executemany("INSERT OR REPLACE INTO Students VALUES (?, ?, ?)", [
        ('123456789', 'Miri Regev', 'Computer Science'),
        ('987654321', 'Israel Israeli', 'Information Systems')
    ])
    conn.commit()
    conn.close()

# סעיף ב' - חיפוש מאובטח
def get_major(name: str):
    conn = sqlite3.connect('server.db')
    c = conn.cursor()
    # שימוש בשאילתה פרמטרית עם מציין מיקום ?
    c.execute("SELECT Major FROM Students WHERE Name = ?", (name,))
    row = c.fetchone()
    if row:
        print(f"Major: {row[0]}")
    else:
        print("Student not found")
    conn.close()</code></pre>
<p><strong>סעיף ג' (חולשת אבטחה והגנה):</strong></p>
<ul>
    <li><strong>החולשה:</strong> <strong>SQL Injection (SQLi)</strong> – כאשר משרשרים קלט משתמש ישירות למחרוזת השאילתה (למשל עם <code>f"SELECT ... WHERE Name = '{name}'"</code>), תוקף יכול להזין קלט זדוני כגון <code>' OR '1'='1</code>, לעקוף אימות, לצפות במידע רגיש או להרוס נתונים (<code>; DROP TABLE Students; --</code>).</li>
    <li><strong>ההגנה:</strong> שימוש בשאילתות פרמטריות מכינות (Parameterized Queries / Prepared Statements) בעזרת מצייני מקום (<code>?</code>), המפרידות לחלוטין בין פקודת ה-SQL לקלט הנתונים.</li>
</ul>`,
        verdictKind: "official",
        verdict: "קוד מלא ותקין עם שאילתות פרמטריות והסבר מלא של חולשת SQLi ואפחותה.",
      },
      {
        id: "q8",
        title: "שאלה 8 · עץ חיפוש בינארי ב-++C ותיקון ניהול זיכרון (Double Free)",
        prompt: "לפניכם מימוש של עץ חיפוש בינארי פשוט ב-++C. מצאו את שגיאות ניהול הזיכרון בקוד, הסבירו אותן, ותקנו את הקוד כך שיפעל בצורה בטוחה:\nclass Node {\npublic:\n    int _value;\n    Node* _left;\n    Node* _right;\n    Node(int v) : _value(v), _left(nullptr), _right(nullptr) {}\n    ~Node() { delete _left; delete _right; }\n};\nclass BTree {\n    Node* _root;\npublic:\n    BTree() : _root(nullptr) {}\n    BTree(const BTree& t) { _root = t._root; } // באג כאן\n    ~BTree() { delete _root; }\n};",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<p><strong>הסבר שגיאות הזיכרון:</strong></p>
<ol>
<li>בנאי ההעתקה ב-<code>BTree</code> מבצע <strong>העתקה שטחית (Shallow Copy)</strong> של המצביע <code>_root</code> בלבד. שני האובייקטים מחזיקים כעת מצביע לאותו עץ זיכרון ב-Heap. בעת הריסת שני העצים, ה-Destructor יופעל פעמיים על אותם צמתים, מה שגורם להתרסקות עקב <strong>Double Free</strong>.</li>
<li>הפרת <strong>Rule of Three</strong>: לא מומש אופרטור השמה (<code>operator=</code>), מה שמוביל להעתקה שטחית כברירת מחדל ולדליפת הזיכרון הישן.</li>
</ol>
<p><strong>קוד מתוקן ודפנסיבי (Deep Copy מלא):</strong></p>
<pre class="code" dir="ltr"><code>#include &lt;utility&gt;

class Node {
public:
    int _value;
    Node* _left;
    Node* _right;

    Node(int v) : _value(v), _left(nullptr), _right(nullptr) {}
    
    // בנאי העתקה רקורסיבי (Deep Copy)
    Node(const Node& o) : _value(o._value), _left(nullptr), _right(nullptr) {
        if (o._left) _left = new Node(*o._left);
        if (o._right) _right = new Node(*o._right);
    }
    
    ~Node() {
        delete _left;
        delete _right;
    }
};

class BTree {
    Node* _root;
public:
    BTree() : _root(nullptr) {}
    
    // בנאי העתקה עמוקה מלא
    BTree(const BTree& t) : _root(nullptr) {
        if (t._root) _root = new Node(*t._root);
    }
    
    // אופרטור השמה בטוח בשיטת Copy-and-Swap
    BTree& operator=(BTree o) {
        std::swap(_root, o._root);
        return *this;
    }
    
    virtual ~BTree() {
        delete _root;
    }
};</code></pre>`,
        verdictKind: "official",
        verdict: "פתרון מושלם לפי עקרונות ה-Rule of Three ו-Copy and Swap.",
      },
      {
        id: "q9",
        title: "שאלה 9 · מחלקת Soldier וחולשת Buffer Overflow ב-++C",
        prompt: "נתונה המחלקה Soldier ב-++C המקבלת מחרוזות ומעתיקה אותן באמצעות strcpy למערכים סטטיים של 10 בתים:\nSoldier(char* f, char* l, char* d) { strcpy(first_name, f); strcpy(last_name, l); strcpy(degree, d); }\nא. איזו חולשת אבטחה קיימת בקוד?\nב. מה תוקף יכול להשיג בעזרת חולשה זו בהינתן קלט מתאים?\nג. כיצד יש לתקן את הקוד בצורה דפנסיבית?",
        hadOfficial: true,
        official: "פתרון רשמי מתוך מאגר הבחינות.",
        proposed: `<p><strong>סעיף א':</strong> קיימת חולשת <strong>Stack Buffer Overflow (גלישת חוצץ)</strong> חמורה הנובעת משימוש בפונקציה הבלתי-בטוחה <code>strcpy</code> לתוך מערכים קבועים של 10 בתים ללא שום בדיקת גבולות של אורך הקלט, ובנוסף מחסור בבדיקת מספר הארגומנטים <code>argc</code> לפני גישה למערך <code>argv</code>.</p>
<p><strong>סעיף ב':</strong> קלט ארוך מ-9 תווים יגלוש מעבר לגבולות החוצץ וידרוס שדות סמוכים במחלקה, את ה-Saved Frame Pointer ואת <strong>כתובת החזרה (Return Address)</strong> במחסנית. הדבר מאפשר לתוקף להסיט את זרימת התוכנית (Control Flow Hijacking) ולהריץ פקודות שרירותיות בהרשאות התהליך (RCE) או לנתב לקוד shellcode.</p>
<p><strong>סעיף ג' (תיקון דפנסיבי מלא):</strong></p>
<pre class="code" dir="ltr"><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class Soldier {
public:
    std::string first_name;
    std::string last_name;
    std::string degree;

    Soldier(const std::string& f, const std::string& l, const std::string& d)
        : first_name(f), last_name(l), degree(d) {}
};

int main(int argc, char** argv) {
    // בדיקת מספר פרמטרים למניעת קריסה מקריאה מעבר לגבולות
    if (argc < 4) {
        std::cerr &lt;&lt; "Usage: " &lt;&lt; argv[0] &lt;&lt; " &lt;first_name&gt; &lt;last_name&gt; &lt;degree&gt;" &lt;&lt; std::endl;
        return -1;
    }
    
    Soldier s2(argv[1], argv[2], argv[3]);
    std::cout &lt;&lt; s2.first_name &lt;&lt; " " &lt;&lt; s2.last_name &lt;&lt; " " &lt;&lt; s2.degree &lt;&lt; std::endl;
    return 0;
}</code></pre>`,
        verdictKind: "official",
        verdict: "ניתוח מלא של החולשה, בדיקת argc, ומעבר בטוח ל-std::string.",
      },
    ],
  }
);
