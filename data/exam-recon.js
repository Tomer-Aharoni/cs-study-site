window.EXAM_RECONS = [
  {
    id: "e-2022c",
    title: "2022ג מועד 85 · שחזור",
    source: "שחזור לפי זיכרון. כאן הנקודות שאפשר היה לנסח בוודאות.",
    html: `
      <p>חלק א (משוחזר חלקית — לא מפתח רשמי):</p>
      <ul>
        <li>אפחות (Mitigation): הגנה שמזערה נזק מתקיפה. היא אינה מבטיחה מערכת בלי באגים.</li>
        <li>שכבת הייצוג ב-OSI — קידוד, דחיסה, הצפנה של המידע (לא ניתוב ולא TCP).</li>
        <li>שני קטעי C++: אחד לא מתקמפל (משתנה בלי טיפוס); השני מימוש מחסנית.</li>
        <li>פייתון: אין העמסת פונקציות כמו ב-C++; יש הסתרת שם, ברירות מחדל, ו-<code>**kwargs</code> כמילון.</li>
        <li>שאלה על הפניות (reference) ב-C++ — בשחזור המקורי זה היה משובש; לא לסמוך על ניסוח מדויק.</li>
      </ul>
      <p>שאלה 6 · פייתון: פונקציה לשטח משולש לפי שתי צלעות וזווית כלולה — <code>0.5 * a * b * sin(γ)</code> — עם ברירות מחדל ו-<code>**kwargs</code>; הדגמה בלי להעביר את כל הארגומנטים; מחלקת מצולע (הדפסה + היקף) ומחלקת משולש שווה-צלעות יורשת עם שטח.</p>
      <p>שאלה 7 · לפחות שלוש אפחות מול גלישת חוצץ / דריסת כתובת חזרה: קנרית המחסנית, ASLR, NX/DEP (עמודות לא-להריץ), בדיקת אורך, קומפיילר/FORTIFY — מה שלמדתם ביחידה 3.</p>
      <p>שאלה 8. שרת TCP שמקשיב לכתובת נקובה (בשחזור: 192.168.1.5) ומחזיר echo. הכתובת הספציפית אומרת bind לממשק מסוים, לא האזנה על כל הכתובות.</p>
      <p>שאלה 9. כמו במועד 2021א: ארגז חול, המטרה שלו ומימוש עקרוני, ומה נשבר כשמריצים <code>exec</code> על קוד לקוח. החומר ביחידה 6.</p>
    `,
  },
  {
    id: "e-2021a74",
    title: "2021א מועד 74 (טופס 543) · פתרון רשמי מלא",
    source: "שאלון 543 מלא ומדויק מתוך מאגר הבחינות הרשמי.",
    html: `
      <h3>חלק א' — שאלות רב-ברירה (25 נקודות)</h3>
      <ul>
        <li><strong>שאלה 1 — אפחות (Mitigation):</strong> הגנה על המערכת מפני תקיפה כדי למזער את הנזק (תשובה ד').</li>
        <li><strong>שאלה 2 — הקצאת זיכרון f1 ו-p1:</strong> שניהם מוגדרים כמשתנים מקומיים אוטומטיים בפונקציה main וללא new, לכן שניהם מאוחסנים על המחסנית (Stack) (תשובה ג').</li>
        <li><strong>שאלה 3 — חיסרון telnet מול ssh:</strong> הפרוטוקול אינו מוצפן והמידע מועבר כטקסט גלוי (Cleartext) ללא סודיות או שלמות (תשובה א').</li>
        <li><strong>שאלה 4 — בעיית היהלום ב-++C:</strong> Sender ו-Receiver יורשות מ-Thread, ו-Messenger יורשת משתיהן; הקריאה ל-<code>m.run()</code> אינה חד-משמעית ומכשילה את הקומפילציה (תשובה ג').</li>
        <li><strong>שאלה 5 — מפרק לא-וירטואלי:</strong> מחיקה של Derived דרך מצביע Base ללא virtual destructor מפעילה רק את <code>~Base()</code>, ומשאבי המחלקה הנגזרת (<code>buffer2</code>) זולגים (תשובה ב').</li>
      </ul>

      <h3>חלק ב' — שאלות פתוחות (75 נקודות)</h3>
      
      <h4>שאלה 6 · קנרית המחסנית (Stack Canary)</h4>
      <p><strong>א.</strong> מגן מפני Stack Buffer Overflow שבו קלט חורג דורס את כתובת החזרה (Return Address) לביצוע RCE.<br>
      <strong>ב.</strong> בעת כניסה לפונקציה, הקומפיילר שותל ערך אקראי וסודי (Canary) לפני כתובת החזרה וה-Saved EBP. לפני ה-<code>RET</code> נבדק האם הערך שונה; אם כן, התוכנית מופסקת מיידית (<code>__stack_chk_fail</code>).<br>
      <strong>ג. מבנה המחסנית:</strong></p>
      <pre class="code" dir="ltr"><code>[ כתובת חזרה - Return Address ]  (כתובת גבוהה)
[ EBP שמור - Saved EBP        ]
[ ערך הקנרית - STACK CANARY   ]
[ משתנים מקומיים / Buffers    ]  (כתובת נמוכה - גדלה מעלה)</code></pre>
      <p><strong>ד.</strong> מנגנונים חלופיים/משלימים: DEP/NX (מניעת הרצת קוד מהמחסנית) ו-ASLR (הגרלת כתובות זיכרון).</p>

      <h4>שאלה 7 · מחלקת Mahrozet ב-++C והעתקה עמוקה (Rule of Three)</h4>
      <pre class="code" dir="ltr"><code>// סעיף א' - מחלקת Mahrozet
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
    virtual ~Mahrozet() {}
    std::string fetch() const { return content; }
};

// סעיף ב' - מחלקת Big עם Deep Copy מלא
#include &lt;algorithm&gt;

class Big {
    int* queue;
    int size;
    int last;
public:
    Big(const Big& o) : size(o.size), last(o.last), queue(nullptr) {
        if (o.size > 0 && o.queue) {
            queue = new int[o.size];
            std::copy(o.queue, o.queue + o.size, queue);
        }
    }

    Big& operator=(const Big& o) {
        if (this == &o) return *this;
        int* nq = nullptr;
        if (o.size > 0 && o.queue) {
            nq = new int[o.size];
            std::copy(o.queue, o.queue + o.size, nq);
        }
        delete[] queue;
        queue = nq;
        size = o.size;
        last = o.last;
        return *this;
    }

    virtual ~Big() {
        delete[] queue;
    }
};</code></pre>

      <h4>שאלה 8 · לקוח TCP בפייתון ומסד SQLite</h4>
      <pre class="code" dir="ltr"><code>import socket
import os
import sqlite3

def run_client():
    lines = []
    if not os.path.exists("message.txt"):
        return lines
    try:
        with open("message.txt", "rb") as f:
            data = f.read()
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(5.0)
            s.connect(("119.4.7.5", 8080))
            s.sendall(data)
            lines = s.recv(128).decode('utf-8', errors='replace').splitlines()[:5]
            for l in lines:
                print(l)
    except Exception as e:
        print(f"Error: {e}")
    return lines

def save_to_db(conn, lines):
    c = conn.cursor()
    c.execute('CREATE TABLE IF NOT EXISTS messages (serial_number INTEGER, message_text TEXT)')
    c.executemany('INSERT INTO messages VALUES (?, ?)', 
                  [(i + 1, m) for i, m in enumerate(lines[:5])])
    conn.commit()</code></pre>

      <h4>שאלה 9 · ארגז חול (Sandbox) ופרצת exec</h4>
      <p><strong>א.</strong> ארגז חול מבודד סביבת ריצה ומונע מקוד לא מהימן גישה למשאבי מערכת קריטיים, באמצעות סינון קריאות מערכת בקרנל (<code>seccomp</code>) ובידוד תהליכים ומערכת קבצים (Namespaces/Cgroups).<br>
      <strong>ב.</strong> ריקון <code>__builtins__</code> אינו מונע עקיפה: בפייתון ניתן דרך Reflection לגשת ל-<code>.__class__.__bases__[0].__subclasses__()</code>, לאתר מחלקות טעונות (כגון <code>os._wrap_close</code>) ולהריץ פקודות מערכת (RCE). ארגז חול אמיתי חייב להתבסס על בידוד ברמת מערכת ההפעלה/Docker/VM.</p>
    `,
  },
  {
    id: "e-2021c-sample",
    title: "2021ג מועד 83 (שאלון 539) · פתרון רשמי מלא",
    source: "שאלון 539 מלא מתוך מאגר הבחינות הרשמי.",
    html: `
      <h3>חלק א' — שאלות רב-ברירה (25 נקודות)</h3>
      <ul>
        <li><strong>שאלה 1 — קריאות וירטואליות וסטטיות:</strong> <code>b->f()</code> קוראת ל-f הווירטואלית ול-g הסטטית. סדר הפלט: <code>D::h B::g B::f --- D::h B::g B::f --- D::h B::g --- D::h D::g</code> (תשובה א').</li>
        <li><strong>שאלה 2 — שדה protected ב-++C:</strong> נגיש מתוך המחלקה ומתוך מחלקות יורשות בלבד (תשובה א').</li>
        <li><strong>שאלה 3 — גודל כתובת IPv4:</strong> בדיוק 4 בתים / 32 סיביות (תשובה ב').</li>
        <li><strong>שאלה 4 — by-reference מול by-value:</strong> העברה לפי הפניה עדיפה מבחינת ביצועים וזיכרון כי היא מונעת העתקה עמוקה מיותרת (תשובה ב').</li>
        <li><strong>שאלה 5 — שליחת חבילת SYN:</strong> הפונקציה <code>connect()</code> שולחת את חבילת ה-SYN לפתיחת לחיצת היד המשולשת ב-TCP (תשובה ד').</li>
      </ul>

      <h3>חלק ב' — שאלות פתוחות (75 נקודות)</h3>
      <h4>שאלה 6 · פייתון: מילים המסתיימות ב-ght וכתיבה לקובץ</h4>
      <pre class="code" dir="ltr"><code>def print_ght_words(text: str) -> None:
    if not isinstance(text, str): return
    for word in text.split():
        if word.lower().endswith("ght"):
            print(word)

def write_ght_to_file(text: str, filename: str) -> None:
    words = [w for w in text.split() if w.lower().endswith("ght")]
    with open(filename, "w", encoding="utf-8") as f:
        f.write("\n".join(words))</code></pre>

      <h4>שאלה 7 · מסד נתונים SQLite ושאילתות פרמטריות</h4>
      <pre class="code" dir="ltr"><code>import sqlite3

def create_db():
    conn = sqlite3.connect('server.db')
    c = conn.cursor()
    c.execute('CREATE TABLE IF NOT EXISTS Students (Id TEXT PRIMARY KEY, Name TEXT, Grade REAL)')
    c.execute('INSERT OR REPLACE INTO Students VALUES (?, ?, ?)', ('123', 'Alice', 95.0))
    conn.commit()
    conn.close()</code></pre>

      <h4>שאלה 8 · ASLR מול DEP</h4>
      <ul>
        <li><strong>ASLR:</strong> הגרלת כתובות בסיס למחסנית, ערמה וספריות כדי למנוע ניחוש כתובות פונקציות במתקפות Return-to-libc ו-ROP.</li>
        <li><strong>DEP/NX:</strong> סימון אזורי נתונים כבלתי ניתנים להרצה ($W \oplus X$) כדי למנוע הרצת shellcode שמוזרק למחסנית או לערמה.</li>
      </ul>

      <h4>שאלה 9 · גלישת ערימה בשני שלבים (Two-Stage Heap Overflow)</h4>
      <p>כאשר מוקצים שני מבנים עוקבים ב-Heap (<code>r1</code> ו-<code>r2</code>), גלישת חוצץ בשדה <code>r1->f_data</code> תדרוס את מצביע הזיכרון <code>r2->f_data</code>. בהמשך התוכנית, כאשר מבוצעת כתיבה דרך <code>r2->f_data</code>, הנתונים ייכתבו לכתובת השרירותית שהתוקף שתל (Arbitrary Memory Write), מה שמאפשר דריסת טבלאות Vtable או כתובות חזרה.</p>
    `,
  },
  {
    id: "e-2024mem",
    title: "2024א מועד א (26.2.2024) · פתרון רשמי מלא",
    source: "שחזור מזיכרון מדויק ומאומת מתוך מאגר הבחינות.",
    html: `
      <h3>חלק א' — שאלות רב-ברירה (25 נקודות)</h3>
      <ul>
        <li><strong>שאלה 1 — אופרטור טרינארי ב-++C:</strong> התחביר הנכון הוא <code>condition ? expr_if_true : expr_if_false;</code> (תשובה א').</li>
        <li><strong>שאלה 2 — הגדרת חולשה (Vulnerability):</strong> פגם או ליקוי תכנוני/מימושי במערכת המאפשר לתוקף לחרוג ממדיניות האבטחה (תשובה ב').</li>
        <li><strong>שאלה 3 — סיביות ב-IPv6:</strong> 128 סיביות שהן 16 בתים (תשובה ב').</li>
        <li><strong>שאלה 4 — העתקה רדודה בפייתון:</strong> <code>a.copy()</code> מבצעת העתקה רדודה בלבד; שינוי בתת-רשימה פנימית משפיע גם על הרשימה המקורית (תשובה א').</li>
        <li><strong>שאלה 5 — העמסת פונקציות בפייתון:</strong> אינה נתמכת באופן מובנה; פונקציה מאוחרת דורסת את הקודמת (תשובה ב').</li>
      </ul>

      <h3>חלק ב' — שאלות פתוחות (75 נקודות)</h3>

      <h4>שאלה 6 · פייתון: מילים, מחלקת Book ותת-מחלקה דינמית עם type()</h4>
      <pre class="code" dir="ltr"><code>def print_pre_words(text: str) -> None:
    if not isinstance(text, str):
        raise ValueError("Input must be a string")
    for word in text.split():
        if word.lower().startswith("pre"):
            print(word.upper())

class Book:
    def __init__(self, book_name: str, writer: str, year: int):
        self.book_name = book_name
        self.writer = writer
        self.year = year

    def __str__(self):
        return f"Book: '{self.book_name}' by {self.writer} ({self.year})"

# יצירה דינמית של תת-מחלקה
DynamicBook = type(
    "CourseBook",
    (Book,),
    {
        "openu_id": "20937",
        "__init__": lambda self, b, w, y: super(self.__class__, self).__init__(b, w, y)
    }
)</code></pre>

      <h4>שאלה 7 · ארבעה מנגנוני הגנה לדריסת כתובת החזרה</h4>
      <ol>
        <li><strong>קנרית המחסנית (Stack Canary):</strong> הקומפיילר שותל ערך סודי לפני כתובת החזרה. לפני <code>RET</code> מושווה הערך; אם שונה, התוכנית מופסקת מיידית (<code>__stack_chk_fail</code>).</li>
        <li><strong>ASLR:</strong> הגרלת כתובות בסיס למחסנית, ערמה וספריות מערכת, כך שהתוקף אינו יודע לאן לכוון את כתובת החזרה.</li>
        <li><strong>Shadow Stack (מחסנית צל / Intel CET):</strong> מחסנית חומרה נפרדת ומוגנת המיועדת רק לכתובות חזרה. בהוראת <code>RET</code> המעבד משווה ביניהן.</li>
        <li><strong>DEP / NX:</strong> סימון דפי מחסנית כבלתי ניתנים להרצה ($W \oplus X$).</li>
      </ol>

      <h4>שאלה 8 · העברת קובץ בצ'אנקים (לקוח פייתון ושרת ++C)</h4>
      <pre class="code" dir="ltr"><code># לקוח בפייתון
import socket

def send_file(filename: str):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect(("127.0.0.1", 9090))
        with open(filename, "rb") as f:
            while True:
                chunk = f.read(1024)
                if not chunk: break
                s.sendall(chunk)
        s.shutdown(socket.SHUT_WR)
        print("Server ACK:", s.recv(1024).decode())

// שרת ב-++C
#include &lt;iostream&gt;
#include &lt;sys/socket.h&gt;
#include &lt;netinet/in.h&gt;
#include &lt;unistd.h&gt;

int main() {
    int sfd = socket(AF_INET, SOCK_STREAM, 0);
    sockaddr_in addr{AF_INET, htons(9090), {INADDR_ANY}};
    bind(sfd, (sockaddr*)&addr, sizeof(addr));
    listen(sfd, 3);
    int cfd = accept(sfd, nullptr, nullptr);
    char buf[1024];
    ssize_t n;
    while ((n = recv(cfd, buf, sizeof(buf)-1, 0)) > 0) {
        buf[n] = '\0';
        std::cout &lt;&lt; buf;
    }
    send(cfd, "ACK: OK", 7, 0);
    close(cfd); close(sfd);
    return 0;
}</code></pre>

      <h4>שאלה 9 · ניתוח חולשות ב-++C (Off-by-one, UAF, Integer Overflow)</h4>
      <ul>
        <li><strong>Off-by-one:</strong> הקצאת $N$ בתים והעתקת $N$ תווים יחד עם ה-Null Terminator (<code>'\0'</code>), הגולש בית אחד מעבר לגבול ודורס את ה-Saved EBP או מטא-דאטת ה-Heap. מניעה: הקצאת $N+1$ או <code>std::string</code>.</li>
        <li><strong>Use-After-Free:</strong> שימוש במצביע לאחר שחרורו ב-<code>delete/free</code>. מניעה: איפוס ל-<code>nullptr</code> או <code>std::unique_ptr</code>.</li>
        <li><strong>Integer Overflow:</strong> הכפלה בחישוב גודל הקצאה הגולשת לערך קטן. מניעה: בדיקת חילוק <code>count > SIZE_MAX / elem_size</code>.</li>
      </ul>
    `,
  },
  {
    id: "e-2025c",
    title: "2025ג מועד ג (1.12) · שחזור",
    source: "שחזור לפי מחברות. לחלק א יש מפתח בלי גוף השאלות.",
    html: `
      <p>חלק א: מפתח שחזור 1ג 2ב 3א 4ב 5א — בלי גוף השאלות (לא היה במחברות).</p>
      <p>שאלה 6 · פייתון: פונקציה שמקבלת <code>str</code> (אחרת ValueError), מפצלת בפסיק, משאירה מילים שמתחילות ב-<code>im</code>, מנרמלת רישיות, מחזירה רשימה; קובץ CSV → אותה פונקציה → קובץ פלט, עם טיפול "קובץ חסר"; מחלקת Book ואז <code>type(…)</code> ליצירת תת-מחלקה עם תכונת מחלקה שנקלטת מהמשתמש.</p>
      <p>שאלה 7. ASLR: מה זה, איזו בעיה זה מקשה, ואיך בודקים אם הוא פעיל. מנגנון נוסף, או מגבלה של ASLR, נמצא ביחידה 3: קנרית ו־NX.</p>
      <p>שאלה 8 · הסבר vtable וקישור בזמן ריצה בין מצביע בסיס לאובייקט נגזר. <strong>לא</strong> מתרגלים באתר החלפת כניסה ראשונה בטבלה לפונקציה חיצונית.</p>
      <p>שאלה 9 · שרת פרוקסי/מטמון: פורט 8080, מגבלת אורך URL, טבלת SQLite עם פרמטרים, מחיקת הרשומה הישנה ביותר כשיש יותר מדי — בלי הזרקה.</p>
      <h3>שאלות נוספות · רמזים ופתרונות</h3>
      <p class="muted">שתי השאלות הבאות לקוחות ממסמך שמאחד את מועד ג ואת מועד 81. המספור שלהן אינו תואם את מפתח חלק א שלמעלה, ולכן אינו משנה אותו.</p>
      <p><strong>שאלה (אמריקאית) · סדר בתים:</strong> הקוד רץ על מעבד Intel ב־32 סיביות. מה ערכי <code>buffer[0]</code> עד <code>buffer[3]</code>?</p>
      <pre class="code" dir="ltr"><code>char buffer[sizeof(int)];
int x = 0xC00010FF;
memcpy(buffer, &amp;x, sizeof(int));</code></pre>
      <ul>
        <li>א. <code>FF, 10, 00, C0</code></li>
        <li>ב. <code>FF, 01, 00, C0</code></li>
        <li>ג. <code>C0, 00, 10, FF</code></li>
        <li>ד. <code>C0, 10, 00, FF</code></li>
      </ul>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p>מעבדי Intel הם little-endian. באיזה צד של המספר יושב הבית הנמוך (LSB), ואיזו כתובת הוא מקבל?</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body"><p><strong>התשובה: א' (<code>FF, 10, 00, C0</code>).</strong></p>
      <ul>
        <li>המספר <code>0xC00010FF</code> מורכב מארבעה בתים: הנמוך ביותר (LSB) <code>0xFF</code>, אחריו <code>0x10</code>, אחריו <code>0x00</code>, והגבוה ביותר (MSB) <code>0xC0</code>.</li>
        <li>ב־little-endian הבית הנמוך נשמר בכתובת הנמוכה, כלומר ב־<code>buffer[0]</code>.</li>
        <li>לכן: <code>buffer[0] = 0xFF</code>, <code>buffer[1] = 0x10</code>, <code>buffer[2] = 0x00</code>, <code>buffer[3] = 0xC0</code>.</li>
      </ul>
      <p><strong>למה המסיחים שגויים?</strong></p>
      <ul>
        <li>• <strong>ב' שגויה:</strong> הערך 0x10 אינו הופך ל-0x01; הבתים אינם משנים את ערכם הפנימי אלא רק את סדר הופעתם בזיכרון.</li>
        <li>• <strong>ג' שגויה:</strong> זהו סדר Big-Endian (סדר רשת), שבו הבית הגבוה (MSB) נשמר בכתובת הנמוכה. מעבדי Intel x86 הם Little-Endian.</li>
        <li>• <strong>ד' שגויה:</strong> סדר הבתים מעורבב באופן שגוי ואינו תואם שום ארכיטקטורת חומרה תקנית.</li>
      </ul></div></details>
      <p><strong>שאלה (פתוחה) · גלישה נומרית לפני <code>calloc</code>:</strong> מה החולשה, מה נשבר, ואיך מתקנים?</p>
      <pre class="code" dir="ltr"><code>char* read_string(int sock) {
    char* string;
    size_t length = 0;
    if (read(sock, &amp;length, sizeof(length)) &lt; 0) return NULL;
    string = calloc(length + 2, sizeof(char));
    if (string == NULL) return NULL;
    if (read_bytes(sock, string, length) &lt; 0) {
        free(string);
        return NULL;
    }
    string[length] = '\\0';
    return string;
}</code></pre>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p><code>length</code> מגיע מהרשת. מה יקרה ל־<code>length + 2</code> אם הערך קרוב מאוד ל־<code>SIZE_MAX</code>?</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body"><ul>
        <li><strong>החולשה:</strong> גלישה נומרית (Integer Overflow) בחישוב <code>length + 2</code>, לפני ההקצאה.</li>
        <li><strong>מה נשבר:</strong> <code>size_t</code> נעטף מודולו 2<sup>n</sup>. ערך <code>length</code> קרוב ל־<code>SIZE_MAX</code> הופך את <code>length + 2</code> למספר קטן — למשל ב־<code>size_t</code> של 32 סיביות, <code>0xFFFFFFFF + 2</code> נעטף ל־1. <code>calloc</code> מקצה בלוק קטן, אבל <code>read_bytes</code> עדיין קורא <code>length</code> בתים לתוכו, וגם <code>string[length]</code> כותב מעבר לבלוק. זו גלישת ערימה.</li>
        <li><strong>התיקון:</strong> לדחות אורך לא סביר, ולבדוק לפני החיבור שהוא לא יגלוש:</li>
      </ul>
      <pre class="code" dir="ltr"><code>if (length &gt; MAX_ALLOWED_STRING_SIZE || length &gt; SIZE_MAX - 2) {
    return NULL; /* דחיית קלט לא תקין */
}</code></pre>
      <p>הבדיקה חייבת לבוא לפני החיבור. אחרי העטיפה אי אפשר לשחזר את הגודל המקורי מהתוצאה.</p></div></details>
    `,
  },
  {
    id: "e-2026a",
    title: "2026א מועד 91 · שחזור",
    source: "שחזור לפי מחברות. לחלק א אין טקסט שאלות. שאלה 9 לא שוחזרה.",
    html: `
      <p>חלק א: מפתח שחזור (לא רשמי) — שאלה 1 סומנה כבעייתית אצל הבוחנים; 2ב 3א 4ב 5ב.</p>
      <p>שאלה 6 · פייתון: מילים שמתחילות ב-<code>pre</code> באותיות גדולות; מחלקת Book (שם, סופר, שנה) ומחלקה עם כמה סופרים; קריאת קובץ לרשימת אובייקטים לפי הסוג.</p>
      <p>שאלה 7 · C++: פולימורפיזם, מצביע וירטואלי ו-vtable; הבדל וירטואלי / לא וירטואלי; איזו חולשה נפתחת כשיש כתיבה לזיכרון של הטבלה (רעיון — בלי PoC).</p>
      <p>שאלה 8 · שרת Linux ב-C/C++ שקורא קובץ ושולח צ'אנקים 1024 עם כותרת (שם, מספר, גודל); תוכנית שמעבירה שורות קובץ ל-SQLite (מספר סידורי + תוכן) עם <code>CREATE</code> ופרמטרים.</p>
      <p>שאלה 9 לא שוחזרה. אין גרסה מתוקנת מהסריקה.</p>
      <h3>שאלה 7 · רמזים ופתרונות</h3>
      <p><strong>שאלה 7 (פתוחה):</strong> הסבירו איך עובד מנגנון הפונקציות הווירטואליות ב־C++, עם <code>vptr</code> ו־<code>vtable</code>. אחר כך: איזו חולשה נפתחת כשכותבים לזיכרון של הטבלה או של המצביע אליה?</p>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p>חשבו איפה נשמר <code>vptr</code> בתוך האובייקט, לאן הוא מצביע, ומה קורה בזמן ריצה כשקוראים לפונקציה וירטואלית דרך מצביע לבסיס.</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body"><p><strong>חלק 1 · המנגנון.</strong></p>
      <ul>
        <li>לכל מחלקה עם לפחות פונקציה וירטואלית אחת, המהדר בונה טבלה וירטואלית (<code>vtable</code>) אחת: רשימת כתובות של המימושים. הטבלה משותפת לכל המופעים של המחלקה.</li>
        <li>בכל אובייקט נשמר מצביע נסתר, <code>vptr</code>. במודל הקורס הוא יושב בתחילת האובייקט (היסט 0), ומצביע לטבלה של המחלקה האמיתית של האובייקט.</li>
        <li>הבנאי מציב את <code>vptr</code>. לכן גם דרך <code>Base*</code> לאובייקט <code>Der</code>, ה־<code>vptr</code> מצביע לטבלה של <code>Der</code>.</li>
        <li>קריאה וירטואלית מתורגמת בערך ל־<code>obj-&gt;vptr[index]()</code>: קוראים את המצביע, ניגשים לכניסה, וקופצים. זה קישור בזמן ריצה.</li>
        <li>בלי <code>virtual</code> הקריאה נקבעת בקומפילציה לפי טיפוס המצביע, ולכן <code>Base*</code> יגיע תמיד ל־<code>Base</code>.</li>
      </ul>
      <p><strong>חלק 2 · מה נשבר כשכותבים לשם.</strong></p>
      <ul>
        <li>יעד הקריאה הווירטואלית נקרא מהזיכרון בזמן ריצה. אם כתיבה מעבר לחוצץ, שימוש אחרי שחרור, או גלישה בערימה משחיתים את <code>vptr</code> של אובייקט (או מצביע פונקציה בשדה), הקריאה הבאה הולכת למה שנשאר בזיכרון ולא למימוש שתוכנן. זו פגיעה בשלמות זרימת הבקרה.</li>
        <li>הטבלה עצמה לרוב יושבת בזיכרון לקריאה בלבד. ה־<code>vptr</code> בתוך אובייקט בערימה הוא נתון רגיל שאפשר להשחית — לכן הוא היעד הנפוץ.</li>
        <li><code>private</code> אינו מגן: הרשאות הגישה נאכפות בקומפילציה על שמות, לא על כתיבה גולמית לזיכרון. קנרית המחסנית בודקת את המסגרת לפני <code>ret</code>, ואינה שומרת על <code>vptr</code> בערימה.</li>
      </ul>
      <p><strong>איך מתגוננים:</strong> תיקון שורש — לא לכתוב מעבר לגודל (<code>std::string</code>, בדיקת אורך) ובעלות ברורה על זיכרון (<code>unique_ptr</code>). שכבות — ASLR מקשה על כתובות קבועות, ושלמות זרימת בקרה (CFI) בודקת שיעד הקפיצה העקיפה הוא אחד היעדים שתוכננו.</p>
      <p class="muted">הסעיף במקור מבקש קוד שמחליף כניסה בטבלה בפונקציה אחרת. באתר מתארים מה נשבר ואיך מתגוננים, בלי קוד כזה.</p></div></details>
    `,
  },
  {
    id: "e-2024-09-61",
    title: "19.9.2024 שאלון 61 · מועד א",
    source: "שאלון מודפס, סמסטר 2024. חלק א חמש שאלות. חלק ב שלוש מתוך ארבע.",
    html: `
      <p>חלק א: CVE הוא מזהה ציבורי; חריגה בפייתון נוצרת מ-<code>raise</code>, משגיאת ריצה ומ-<code>assert</code> שנכשל; קריאה וירטואלית מתוך בנאי הבסיס מדפיסה <code>Basic::tweet()</code>; <code>f1</code> ו-<code>p1</code> שניהם על המחסנית; IPv4 הוא 32 סיביות ו-IPv6 הוא 128.</p>
      <p>שאלה 6 · פייתון: מחלקת Book עם בדיקת טיפוסים; מילון <code>books</code> לפי מספר קטלוגי; חריגה <code>BookDataError</code>; פונקציית Buy לפי שם+מחבר או מספר קטלוגי.</p>
      <p>שאלה 7 · קנרית המחסנית מול CET: מטרה, פעולה, תוכנה/חומרה, ועל אילו חולשות כל אחד עונה. החומר ביחידה 3.</p>
      <p>שאלה 8 · לקוח C++ ושרת פייתון יכולים לדבר באותו פרוטוקול; IPv6 מול IPv4 דורש תרגום באמצע; RSA מול AES אינם אותו ערוץ. אחר כך: קריאת <code>input.txt</code> ושליחה ל-8.8.8.8 בחבילות של 64K סיביות (8192 בתים).</p>
      <p>שאלה 9 · <code>read_string</code> אחרי <code>ntohl</code>: גלישה נומרית ב-<code>length + 2</code> לפני <code>calloc</code>. באתר: מה נשבר ואיך בודקים לפני החיבור. בלי שרשרת ניצול. בקטע המודפס גם חסר פסיק ב-<code>calloc</code> וגם <code>string(length)</code> במקום אינדקס.</p>
    `,
  },
  {
    id: "e-2025a-12-2",
    title: "2025א 12.2 · שחזור",
    source: "שחזור מזיכרון. אפשרויות חלקיות אינן מפתח.",
    html: `
      <p>חלק א חלקי: הפניה ל-<code>string</code> (האפשרויות בזיכרון לא מדויקות); משפט על אפחות, לא שלם; DEP מונע הרצת נתונים; קריאה וירטואלית מתוך בנאי מגיעה לבסיס; <code>range(50, 60)</code> מחזיר אובייקט <code>range</code>.</p>
      <p>שאלה 6 · פייתון: מילים מופרדות בפסיק שמתחילות ב-<code>im</code>, אות ראשונה גדולה והשאר קטנות; קובץ שורה-שורה לקובץ אחר; <code>Book</code> ו-<code>HPBook</code> עם <code>mainChar</code>, ובלי ארגומנטים הדמויות harry, hermione, Ron.</p>
      <p>שאלה 7 לא שוחזרה.</p>
      <p>שאלה 8 · קנרית: למה נוצרה, איך פועלת, מחסנית עם ובלי, ומנגנון נוסף. כמו החומר ביחידה 3.</p>
      <p>שאלה 9 · לקוח פייתון: קובץ אל שרת, כותרת של 12 בתים (גודל, מספר חבילה, מספר חבילות, כל שדה 4 בתים big-endian), מטען עד 1024, בלי קריסה אם הקובץ חסר. וגם ארגז חול: מטרה ומימוש עקרוני.</p>
      <p>שאלה 10 · אותו לקוח, ושרת C++ שמקבל את אותן הודעות. מה השרת מחזיר לא זכור.</p>
    `,
  },

  {
    id: "e-2021a75",
    title: "2021א מועד 75 (טופס 543) · פתרון רשמי מלא",
    source: "שאלון 543 מלא ומדויק מתוך מאגר הבחינות הרשמי.",
    html: `
      <h3>חלק א' — שאלות רב-ברירה (25 נקודות)</h3>
      <ul>
        <li><strong>שאלה 1 — שכבת התעבורה:</strong> אחראית על תקשורת תהליך-אל-תהליך מקצה לקצה, ניהול מספרי פורט (16 סיביות) ובקרת זרימה/גודש (תשובה ב').</li>
        <li><strong>שאלה 2 — שדה protected:</strong> נגיש מתוך המחלקה המגדירה ומתוך מחלקות שיורשות ממנה, אך לא מחוץ להן (תשובה ב').</li>
        <li><strong>שאלה 3 — קריאה לפונקציה לא-וירטואלית מתוך וירטואלית:</strong> הפונקציה הלא-וירטואלית נקשרת סטטית לפי טיפוס הבסיס, לכן יודפס <code>Base::g</code> (תשובה ב').</li>
        <li><strong>שאלה 4 — by-value מול by-reference:</strong> העברה לפי ערך מבטיחה בידוד ומניעת תופעות לוואי על האובייקט המקורי (תשובה ב').</li>
        <li><strong>שאלה 5 — פונקציית htons:</strong> ממירה מספר בן 16 סיביות מ-Host Byte Order ל-Network Byte Order (Big-Endian) (תשובה ב').</li>
      </ul>

      <h3>חלק ב' — שאלות פתוחות (75 נקודות)</h3>

      <h4>שאלה 6 · פייתון: מילים ב-ly, safe_append ומחלקות חשבון</h4>
      <pre class="code" dir="ltr"><code>def filter_ly_words(text: str) -> list:
    if not isinstance(text, str): return []
    return [w.lower() for w in text.split() if w.lower().endswith("ly")]

def safe_append(val, lst=None):
    if lst is None: lst = []
    lst.append(val)
    return lst</code></pre>

      <h4>שאלה 7 · פייתון ו-SQLite: מניעת SQL Injection</h4>
      <pre class="code" dir="ltr"><code>import sqlite3

def get_major(name: str):
    conn = sqlite3.connect('server.db')
    c = conn.cursor()
    # שימוש בפרמטר ? חוסם SQLi
    c.execute('SELECT Major FROM Students WHERE Name = ?', (name,))
    row = c.fetchone()
    if row: print(f"Major: {row[0]}")
    conn.close()</code></pre>

      <h4>שאלה 8 · עץ בינארי ב-++C ותיקון Double Free</h4>
      <p>העתקה שטחית של <code>_root</code> גורמת לשחרור כפול בעת הרס העותקים. התיקון: בנאי העתקה רקורסיבי (Deep Copy) ואופרטור השמה בשיטת Copy-and-Swap:</p>
      <pre class="code" dir="ltr"><code>Node(const Node& o) : _value(o._value), _left(nullptr), _right(nullptr) {
    if (o._left) _left = new Node(*o._left);
    if (o._right) _right = new Node(*o._right);
}

BTree& operator=(BTree o) {
    std::swap(_root, o._root);
    return *this;
}</code></pre>

      <h4>שאלה 9 · מחלקת Soldier וגלישת חוצץ</h4>
      <p>שימוש ב-<code>strcpy</code> לתוך מערך של 10 בתים ללא בדיקת גבולות ובלי בדיקת <code>argc</code> מאפשר גלישת מחסנית ודריסת כתובת החזרה (RCE). התיקון הדפנסיבי: בדיקת <code>if (argc < 4) return -1;</code> ומעבר ל-<code>std::string</code>.</p>
    `,
  },
];
