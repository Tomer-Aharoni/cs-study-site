window.EXAM_RECONS = [
  {
    id: "e-2022c",
    title: "2022ג מועד 85 · שחזור מלא ומאומת",
    source: "שחזור מפורט ממחברות הבחינה ודוחות סיכום (ציון 95).",
    html: `
      <h3>חלק א' — שאלות רב-ברירה (25 נקודות)</h3>
      <ul>
        <li><strong>שאלה 1 — הגדרת אפחות (Mitigation):</strong> מנגנון או אמצעי הגנה שנועד למזער את הנזק מתקיפה או להקשות על ניצול החולשה (כגון ASLR, קנרית מחסנית או DEP), מבלי להבטיח מערכת נקייה מבאגים (תשובה ב').</li>
        <li><strong>שאלה 2 — תפקיד שכבת הייצוג (Presentation Layer - שכבה 6) ב-OSI:</strong> אחראית על קידוד נתונים, דחיסת מידע והצפנה/פענוח של המידע המועבר בין היישומים (תשובה ב').</li>
        <li><strong>שאלה 3 — קטעי קוד ב-++C:</strong> הכרזה על משתנה ללא ציון טיפוס נתונים מובילה לשגיאת הידור (Compilation Error), בעוד שמימוש מחסנית תקין מקצה ומנהל זיכרון במדויק (תשובה א').</li>
        <li><strong>שאלה 4 — פייתון ומנגנון העמסה:</strong> פייתון אינה תומכת בהעמסת פונקציות (Overloading) סטטית; הגדרה כפולה דורסת את הקודמת, והעברת פרמטרים גמישה מתבצעת באמצעות ברירות מחדל או <code>**kwargs</code> המועבר כמילון (תשובה ג').</li>
        <li><strong>שאלה 5 — הפניות (References) ב-++C:</strong> הפניה מהווה כינוי (Alias) למשתנה קיים; היא חייבת להיות מאותחלת בעת יצירתה ולא ניתן לאתחלה ל-<code>nullptr</code> או לשנות את יעד ההפניה שלה בהמשך (תשובה ב').</li>
      </ul>

      <h3>חלק ב' — שאלות פתוחות (75 נקודות)</h3>

      <h4>שאלה 6 · פייתון: שטח משולש עם kwargs ומחלקות מצולע</h4>
      <p><strong>סעיף א:</strong> פונקציה <code>calc_triangle_area</code> לחישוב שטח משולש לפי שתי צלעות וזווית כלולה: <code>S = 0.5 * a * b * sin(radians(angle))</code>, כולל ערכי ברירת מחדל ותמיכה ב-<code>**kwargs</code>.</p>
      <p><strong>סעיף ב:</strong> הדגמת קריאה לפונקציה בעזרת מילון ו-<code>**kwargs</code> ללא העברה ישירה של כל הארגומנטים.</p>
      <p><strong>סעיף ג:</strong> מחלקה <code>Polygon</code> עם שיטות להדפסה וחישוב היקף, ותת-מחלקה יורשת <code>EquilateralTriangle</code> עם חישוב שטח.</p>
      <details class="fold"><summary>פתרון מפורט — שאלה 6</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>import math

# סעיף א' ו-ב'
def calc_triangle_area(a=1.0, b=1.0, angle_deg=90.0, **kwargs):
    # חילוץ ערכים מתוך kwargs אם הועברו
    side_a = kwargs.get('a', a)
    side_b = kwargs.get('b', b)
    angle = kwargs.get('angle_deg', angle_deg)
    
    rad = math.radians(angle)
    area = 0.5 * side_a * side_b * math.sin(rad)
    return area

# הדגמת שימוש ב-kwargs
params = {"a": 6.0, "b": 8.0, "angle_deg": 30.0}
print("Area from kwargs:", calc_triangle_area(**params))

# סעיף ג' — מחלקות מצולע ומשולש
class Polygon:
    def __init__(self, sides: list):
        self.sides = list(sides)
        
    def perimeter(self) -> float:
        return sum(self.sides)
        
    def __str__(self):
        return f"Polygon with sides: {self.sides}, Perimeter: {self.perimeter()}"

class EquilateralTriangle(Polygon):
    def __init__(self, side_length: float):
        super().__init__([side_length, side_length, side_length])
        self.side = side_length
        
    def area(self) -> float:
        # שטח משולש שווה-צלעות: (sqrt(3)/4) * a^2
        return (math.sqrt(3) / 4.0) * (self.side ** 2)
        
    def __str__(self):
        return f"EquilateralTriangle(side={self.side}, area={self.area():.2f})"</code></pre>
      </div></details>

      <h4>שאלה 7 · שיטות אפחות (Mitigation) מפני מתקפות Buffer Overflow</h4>
      <p>יש לפרט לפחות שלוש שיטות אפחות מובילות:</p>
      <details class="fold"><summary>פתרון מפורט — שאלה 7</summary><div class="fold-body">
      <ul>
        <li><strong>1. קנרית המחסנית (Stack Canary / Cookie):</strong> ערך אקראי וסודי שהקומפיילר שותל במחסנית בין המשתנים המקומיים לכתובת החזרה (Saved EIP/RIP). לפני ה-<code>RET</code> נבדק האם הערך שונה; אם כן, התוכנית מופסקת מיידית לפני שהמעבד קופץ לכתובת שנדרסה.</li>
        <li><strong>2. מנגנון DEP / NX (Data Execution Prevention):</strong> סימון דפי ה-Stack וה-Heap כלא ניתנים להרצה ($W \oplus X$). מונע הרצת Shellcode שהוזרק לזיכרון.</li>
        <li><strong>3. הגרלת מרחב הכתובות (ASLR):</strong> רנדומיזציה של כתובות הבסיס של המחסנית, הערימה והספריות המשותפות בכל הרצה, מה שמשבש מתקפות ROP ו-Return-to-libc.</li>
      </ul>
      </div></details>

      <h4>שאלה 8 · שרת TCP ב-Linux המקשיב לכתובת ספציפית ומבצע Echo</h4>
      <p>שרת ב-C/++C המבצע <code>bind</code> מפורש לכתובת <code>192.168.1.5</code> (ולא ל-<code>INADDR_ANY</code>), מאזין, מקבל לקוח ומחזיר כל הודעה שהתקבלה.</p>
      <details class="fold"><summary>פתרון מפורט — שאלה 8</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>#include &lt;iostream&gt;
#include &lt;cstring&gt;
#include &lt;unistd.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;netinet/in.h&gt;
#include &lt;arpa/inet.h&gt;

int main() {
    int server_fd = socket(AF_INET, socket.SOCK_STREAM, 0);
    if (server_fd &lt; 0) {
        perror("socket failed");
        return 1;
    }

    struct sockaddr_in address;
    memset(&address, 0, sizeof(address));
    address.sin_family = AF_INET;
    address.sin_port = htons(8080);
    
    // קשירה לממשק ספציפי 192.168.1.5 ולא ל-INADDR_ANY
    if (inet_pton(AF_INET, "192.168.1.5", &address.sin_addr) &lt;= 0) {
        // במידה והממשק אינו קיים במחשב הבדיקה, שימוש ב-loopback
        address.sin_addr.s_addr = htonl(INADDR_LOOPBACK);
    }

    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) &lt; 0) {
        perror("bind failed");
        close(server_fd);
        return 1;
    }

    listen(server_fd, 5);
    std::cout &lt;&lt; "Echo Server listening on 192.168.1.5:8080..." &lt;&lt; std::endl;

    int client_fd = accept(server_fd, NULL, NULL);
    if (client_fd &gt;= 0) {
        char buffer[1024];
        ssize_t bytes_read = recv(client_fd, buffer, sizeof(buffer) - 1, 0);
        if (bytes_read &gt; 0) {
            buffer[bytes_read] = '\0';
            // ביצוע Echo: שליחה חזרה ללקוח
            send(client_fd, buffer, bytes_read, 0);
        }
        close(client_fd);
    }
    close(server_fd);
    return 0;
}</code></pre>
      </div></details>

      <h4>שאלה 9 · ארגז חול (Sandbox) ופגיעות פקודת exec בפייתון</h4>
      <p><strong>סעיף א:</strong> מהו מנגנון Sandbox וכיצד הוא פועל.<br>
      <strong>סעיף ב:</strong> מדוע הרצת <code>exec()</code> על קוד לקוח אינה בטוחה בפייתון וכיצד עוקפים ארגז חול מבוסס פייתון.</p>
      <details class="fold"><summary>פתרון מפורט — שאלה 9</summary><div class="fold-body">
      <ul>
        <li><strong>סעיף א — מנגנון Sandbox:</strong> סביבת הרצה מבודדת המגבילה את הגישה של תהליך בלתי אמין למשאבי מערכת קריטיים (קבצים, רשת, תהליכים אחרים וקריאות מערכת). יישום אמיתי חייב להתבסס על מנגנוני בידוד של מערכת ההפעלה (כגון seccomp, namespaces, AppArmor, cgroups או Virtual Machines).</li>
        <li><strong>סעיף ב — פגיעות exec בפייתון:</strong> ניסיון לבנות ארגז חול בפייתון ע"י חסימת פקודות או איפוס <code>__builtins__</code> נכשל כיוון שמנגנון ה-Reflection בפייתון מאפשר לתוקף להגיע לאובייקטי מערכת מכל אובייקט קיים:</li>
      </ul>
<pre class="code" dir="ltr"><code># עקיפת ארגז חול בפייתון והרצת פקודות מערכת דרך Reflection:
[c for c in ().__class__.__bases__[0].__subclasses__() if c.__name__ == 'BuiltinImporter'][0]().load_module('os').system('id')</code></pre>
      </div></details>

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
    title: "2025ג מועד ג (1.12.2025) · בחינה מלאה ומאומתת",
    source: "שחזור מקורי מלא מתוך טופס הבחינה ודוחות הסריקה הרשמיים (ציון 85).",
    html: `
      <h3>חלק א' — שאלות רב-ברירה (25 נקודות)</h3>
      <ul>
        <li><strong>שאלה 1 — מהי מטרת מתקפת DDoS (תשובה ג'):</strong> הצפת שרת היעד בבקשות מרובות ממקורות מבוזרים כדי לגרום למניעת שירות, להפיל את המערכת או לשתק את זמינותה למשתמשים לגיטימיים.</li>
        <li><strong>שאלה 2 — סדר בתים במעבד Intel ב-32 סיביות (תשובה א'):</strong> המספר <code>0xC00010FF</code> מועתק למערך בתים. מעבדי Intel x86 פועלים ב-Little-Endian (הבית הנמוך LSB בכתובת הנמוכה), ולכן ערכי המערך יהיו: <code>FF, 10, 00, C0</code>.</li>
        <li><strong>שאלה 3 — תכונות חוטים (Threads) במערכת ההפעלה (תשובה א'):</strong> חוטים של אותו תהליך חולקים את אותו מרחב זיכרון וירטואלי (Code, Data, Heap), אך לכל חוט יש מחסנית (Stack) פרטית וסט רגיסטרים עצמאי משלו.</li>
        <li><strong>שאלה 4 — ברירת מחדל של שדות ב-class מול struct ב-++C (תשובה ג'):</strong> ב-<code>class</code> שדות שלא הוגדרה להם רמת הרשאה הם פרטיים (<code>private</code>) כברירת מחדל, ואילו ב-<code>struct</code> הם ציבוריים (<code>public</code>).</li>
        <li><strong>שאלה 5 — שימוש באלגוריתם AES (תשובה א'):</strong> אלגוריתם Advanced Encryption Standard הוא אלגוריתם הצפנה סימטרית (Symmetric Encryption) מבוסס בלוקים.</li>
      </ul>

      <h3>חלק ב' — שאלות פתוחות (75 נקודות)</h3>

      <h4>שאלה 1 · מחלקת Mahrozet וניהול זיכרון ב-++C (Rule of Three)</h4>
      <p><strong>סעיף א:</strong> מחלקה <code>Mahrozet</code> המכילה <code>std::string</code> עם תוכן קובץ, בנאי דיפולטי, בנאי שפותח קובץ ומעתיק את תוכנו, מתודה <code>fetch()</code> וטיפול במקרי קצה (קובץ לא קיים / מחרוזת ריקה).</p>
      <p><strong>סעיף ב:</strong> מחלקת <code>Big</code> המנהלת תור ב-Heap (<code>int* queue, int size, int last</code>) — מימוש בנאי העתקה ואופרטור השמה המבצעים העתקה עמוקה (Deep Copy) למניעת שחרור כפול (Double Free).</p>
      <details class="fold"><summary>פתרון מפורט — שאלה 1</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>#include &lt;iostream&gt;
#include &lt;fstream&gt;
#include &lt;string&gt;
#include &lt;algorithm&gt;

// סעיף א'
class Mahrozet {
private:
    std::string content;
public:
    Mahrozet() : content("") {}
    
    Mahrozet(const std::string& filename) {
        std::ifstream file(filename);
        if (!file.is_open()) {
            std::cerr &lt;&lt; "Error: File '" &lt;&lt; filename &lt;&lt; "' could not be opened." &lt;&lt; std::endl;
            content = "";
            return;
        }
        std::string line;
        while (std::getline(file, line)) {
            content += line + "\n";
        }
        file.close();
    }
    
    std::string fetch() const {
        if (content.empty()) return "[Empty Content]";
        return content;
    }
};

// סעיף ב' — מחלקת Big עם Rule of Three
class Big {
private:
    int* queue;
    int size;
    int last;
public:
    Big(int s = 100) : size(s), last(0) {
        queue = new int[size];
    }
    
    // בנאי העתקה (Deep Copy)
    Big(const Big& other) : size(other.size), last(other.last) {
        queue = new int[size];
        for (int i = 0; i &lt; last; ++i) {
            queue[i] = other.queue[i];
        }
    }
    
    // אופרטור השמה
    Big& operator=(const Big& other) {
        if (this != &other) {
            int* new_queue = new int[other.size];
            for (int i = 0; i &lt; other.last; ++i) {
                new_queue[i] = other.queue[i];
            }
            delete[] queue;
            queue = new_queue;
            size = other.size;
            last = other.last;
        }
        return *this;
    }
    
    ~Big() {
        delete[] queue;
    }
};</code></pre>
      </div></details>

      <h4>שאלה 2 · מנגנון DEP / NX (Data Execution Prevention)</h4>
      <p><strong>סעיף א (התקפות מוגנות):</strong> המנגנון מגן מפני הרצת קוד (Code Execution) מאזורי זיכרון המיועדים לנתונים (מחסנית ו-Heap), בדגש על הזרקת Shellcode במתקפות Stack Buffer Overflow.<br>
      <strong>סעיף ב (אופן פעולה ורכיבים):</strong> מתבסס על ביט החומרה <strong>NX (No-Execute) / XD (Execute Disable)</strong> בטבלאות הדפים (Page Table Entry) של המעבד/MMU. מערכת ההפעלה מסמנת את דפי ה-Stack וה-Heap כ-Read/Write בלבד ($W \oplus X$). הקומפיילר מסמן מקטעי ELF/PE בהתאם.<br>
      <strong>סעיף ג (תוכנית הדגמה):</strong></p>
      <details class="fold"><summary>פתרון מפורט — סעיף ג</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    // מערך פקודות מכונה במחסנית (ret = 0xc3)
    unsigned char shellcode[] = { 0xc3 };
    void (*func_ptr)() = (void (*)())shellcode;
    
    printf("Attempting to execute code from stack...\n");
    // תחת מנגנון DEP/NX פעיל — תזרוק מיד SIGSEGV / General Protection Fault
    func_ptr();
    printf("Execution succeeded (DEP is DISABLED!)\n");
    return 0;
}</code></pre>
      </div></details>

      <h4>שאלה 3 · גלישה נומרית (Integer Overflow) לפני calloc</h4>
      <pre class="code" dir="ltr"><code>char* read_string(int sock) {
    char* string;
    size_t length = 0;
    if (read(sock, &length, sizeof(length)) < 0) return NULL;
    string = calloc(length + 2, sizeof(char));
    if (string == NULL) return NULL;
    if (read_bytes(sock, string, length) < 0) {
        free(string);
        return NULL;
    }
    string[length] = '\0';
    return string;
}</code></pre>
      <details class="fold"><summary>פתרון מפורט — שאלה 3</summary><div class="fold-body">
      <ul>
        <li><strong>סעיף א (החולשה):</strong> גלישה נומרית ועטיפה מודולרית (Integer Overflow / Wraparound) בביטוי <code>length + 2</code>. כאשר <code>length = SIZE_MAX</code> (או <code>SIZE_MAX - 1</code>), החיבור עם 2 גולש לערך קטנטן (למשל 1).</li>
        <li><strong>סעיף ב (ניצול החולשה):</strong> תוקף שולח <code>length = 0xFFFFFFFF</code> (במערכת 32-ביט). <code>calloc</code> מקצה בית אחד בלבד (או מספר קטן), אך בהמשך <code>read_bytes(sock, string, length)</code> ינסה לקרוא כמות ענקית של בתים לתוך החוצץ הקטן. התוצאה היא <strong>Heap-based Buffer Overflow</strong> קטלני שדורס מטא-דאטה של ה-Heap או אובייקטים סמוכים.</li>
        <li><strong>סעיף ג (תיקון דפנסיבי):</strong> בדיקת חסם עליון סביר לפני החישוב וההקצאה:</li>
      </ul>
<pre class="code" dir="ltr"><code>#define MAX_ALLOWED_LEN (10 * 1024 * 1024) // 10MB limit

if (length > MAX_ALLOWED_LEN || length > SIZE_MAX - 2) {
    return NULL; // דחיית אורך לא חוקי
}</code></pre>
      </div></details>

      <h4>שאלה 4 · לקוח פייתון — שליחת קובץ בצ'אנקים של 2048 בתים וכותרת Big-Endian</h4>
      <p>שליחת קובץ ל-<code>8.8.8.8:7070</code> בחבילות של עד 2048 בתים עם Header בינארי של 12 בתים: מספר חבילה (4 בתים), סך חבילות (4 בתים), גודל חבילה נוכחית (4 בתים) בסדר Big-Endian (<code>struct.pack('>III', ...)</code>).</p>
      <details class="fold"><summary>פתרון מפורט — שאלה 4</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>import socket
import struct
import os
import math

def send_file_chunked(filename: str, host: str = "8.8.8.8", port: int = 7070):
    if not os.path.exists(filename):
        print(f"Error: File '{filename}' not found.")
        return
    
    file_size = os.path.getsize(filename)
    chunk_size = 2048
    total_packets = math.ceil(file_size / chunk_size) if file_size > 0 else 1
    
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.connect((host, port))
            with open(filename, "rb") as f:
                packet_num = 1
                while True:
                    payload = f.read(chunk_size)
                    if not payload and packet_num > 1:
                        break
                    
                    current_payload_size = len(payload)
                    # 12-byte header: (packet_num, total_packets, current_size) in Big-Endian (>III)
                    header = struct.pack(">III", packet_num, total_packets, current_payload_size)
                    sock.sendall(header + payload)
                    
                    packet_num += 1
                    if packet_num > total_packets:
                        break
        print(f"Successfully sent {total_packets} packets for '{filename}'.")
    except Exception as e:
        print(f"Network error while sending file: {e}")</code></pre>
      </div></details>

      <h4>שאלה 5 · מחשוב ענן: Hypervisor מול Container</h4>
      <details class="fold"><summary>פתרון מפורט — שאלה 5</summary><div class="fold-body">
      <ul>
        <li><strong>Hypervisor (וירטואליזציה של חומרה - Virtual Machine):</strong>
          <ul>
            <li><strong>אופן פעולה:</strong> מנהל מכונות וירטואליות (VMs) המריצות מערכת הפעלה מלאה כולל Kernel עצמאי משלהן מעל חומרה מדומה (למשל VMware, KVM, VirtualBox).</li>
            <li><strong>יתרונות/חסרונות:</strong> בידוד חזק מאוד (Strong Isolation ברמת החומרה), אך תקורה (Overhead) כבדה בזמן עלייה, צריכת זיכרון וביצועים.</li>
            <li><strong>דוגמת שימוש:</strong> הרצת סביבות שונות לחלוטין (למשל שרת Windows מעל שרת Linux) או סביבות Multi-tenancy בענן ציבורי עם דרישות בידוד מחמירות.</li>
          </ul>
        </li>
        <li><strong>Container (וירטואליזציה ברמת מערכת ההפעלה - OS-level Virtualization):</strong>
          <ul>
            <li><strong>אופן פעולה:</strong> כל הקונטיינרים חולקים את אותו ה-Host Kernel. הבידוד מושג ע"י מנגנוני לינוקס: <strong>Namespaces</strong> (בידוד תהליכים, רשת ומערכת קבצים) ו-<strong>cgroups</strong> (הגבלת משאבי CPU וזיכרון). דוגמה: Docker, Podman.</li>
            <li><strong>יתרונות/חסרונות:</strong> קלי משקל, עלייה תוך מילישניות, ניצול משאבים מיטבי, אך בידוד חלש יותר — פרצת Kernel בתהליך אחד עלולה לסכן את השרת כולו.</li>
            <li><strong>דוגמת שימוש:</strong> הרצת מיקרו-שירותים (Microservices) זהים המריצים קוד לקוחות בסביבה מבודדת ומהירה.</li>
          </ul>
        </li>
      </ul>
      </div></details>

    `,
  },
  {
    id: "e-2026a1",
    title: "2026א מועד א1 (19 בפברואר 2026) · שחזור מלא",
    source: "שחזור מלא ומדויק לפי מחברות בחינה ודוחות סריקה רשמיים (ציון 94).",
    html: `
      <h3>חלק א' — שאלות רב-ברירה (25 נקודות)</h3>
      <ul>
        <li><strong>שאלה 1 — בנאי העתקה ברירת-מחדל ב-++C (תשובה ב'):</strong> כאשר מחלקה מקצה זיכרון דינמי ב-Heap ולא מוגדר בה בנאי העתקה מפורש, ברירת המחדל היא העתקה שטחית (Memberwise / Shallow Copy). שני האובייקטים מצביעים לאותו זיכרון, מה שמוביל להשחתת נתונים ולשחרור כפול (Double Free) בעת ההריסה.</li>
        <li><strong>שאלה 2 — מניעת הרצת קוד במחסנית (תשובה ב'):</strong> מנגנון <strong>DEP / NX (Data Execution Prevention)</strong> מסמן את דפי ה-Stack כלא ניתנים להרצה (Non-Executable), ובכך מונע מ-Shellcode שהוזרק למחסנית לרוץ.</li>
        <li><strong>שאלה 3 — העמסת פונקציות בפייתון (תשובה ג'):</strong> פייתון אינה תומכת בהעמסת פונקציות סטטית (Function Overloading). אם מוגדרות מספר פונקציות בעלות אותו שם, ההגדרה האחרונה דורסת לחלוטין את כל ההגדרות שקדמו לה.</li>
        <li><strong>שאלה 4 — מטרת מנגנון ASLR (תשובה ב'):</strong> רנדומיזציה של כתובות הבסיס (Stack, Heap, ספריות משותפות וקוד PIE) בכל הפעלה מחדש, במטרה למנוע מתוקף לנחש כתובות קבועות בזיכרון לצורך הזרקת קוד או תקיפת ROP.</li>
        <li><strong>שאלה 5 — סדר בתים ברשת ומספרים בינאריים (תשובה ג'):</strong> בפרוטוקול TCP חובה להשתמש ב-<code>htons</code> ו-<code>htonl</code> כדי להמיר מסדר בתים של המחשב (Host Byte Order - לרוב Little Endian) לסדר בתים תקני של הרשת (Network Byte Order - תמיד Big Endian).</li>
      </ul>

      <h3>חלק ב' — שאלות פתוחות (75 נקודות)</h3>

      <h4>שאלה 6 · פייתון: עיבוד מחרוזות, קבצים ותכנות דינמי (type)</h4>
      <p><strong>סעיף א (8 נקודות):</strong> פונקציה דפנסיבית <code>wordp</code> לבדיקת טיפוס מחרוזת, פיצול לפי פסיק, סינון מילים שמתחילות ב-<code>im</code> והחזרה באות ראשונה גדולה והשאר קטנות.</p>
      <details class="fold"><summary>💡 רמז לסעיף א</summary><div class="fold-body"><p>השתמשו ב-<code>isinstance(text, str)</code> ובמתודה <code>w.capitalize()</code>.</p></div></details>
      <details class="fold"><summary>פתרון מפורט — סעיף א</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>def wordp(text: str) -> list[str]:
    # 1. בדיקת טיפוס דפנסיבית
    if not isinstance(text, str):
        raise TypeError("Input must be a string")
    
    # 2. פיצול לפי פסיק
    raw_words = text.split(',')
    
    # 3+4. סינון מילים ב-im ושינוי לאות ראשונה גדולה
    result = []
    for raw in raw_words:
        w = raw.strip()
        if w.lower().startswith('im'):
            result.append(w.capitalize())
            
    # 5. החזרת הרשימה
    return result</code></pre>
      </div></details>

      <p><strong>סעיף ב (9 נקודות):</strong> פונקציה <code>fix_file</code> לקריאת <code>Setup.csv</code>, עיבוד כל שורה באמצעות <code>wordp</code>, כתיבה ל-<code>Setup-revised.txt</code> וטיפול מלא בשגיאות.</p>
      <details class="fold"><summary>פתרון מפורט — סעיף ב</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>def fix_file():
    in_file = "Setup.csv"
    out_file = "Setup-revised.txt"
    try:
        with open(in_file, "r", encoding="utf-8") as fin:
            with open(out_file, "w", encoding="utf-8") as fout:
                for line in fin:
                    cleaned = line.strip()
                    if not cleaned:
                        continue
                    processed = wordp(cleaned)
                    fout.write(",".join(processed) + "\n")
        print("File processed successfully.")
    except FileNotFoundError:
        print(f"Error: Could not find input file '{in_file}'.")
    except PermissionError:
        print(f"Error: Access denied while reading '{in_file}' or writing '{out_file}'.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")</code></pre>
      </div></details>

      <p><strong>סעיף ג (8 נקודות):</strong> מטא-פרוגרמינג — יצירת מחלקה דינמית היורשת מ-<code>Book</code> באמצעות <code>type()</code> עם שדה מחלקה <code>MainChar</code>.</p>
      <details class="fold"><summary>פתרון מפורט — סעיף ג</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>class Book:
    def __init__(self, title: str, author: str, year: int):
        self.title = title
        self.author = author
        self.year = year

# קליטה מהמשתמש
new_cls_name = input("Class name: ").strip() or "DetectiveBook"
series = input("Series name: ").strip() or "Sherlock"
main_char = input("Main character: ").strip() or "Sherlock Holmes"

# יצירה דינמית באמצעות type(name, bases, dict)
DynamicBook = type(
    new_cls_name,
    (Book,),
    {
        "MainChar": main_char,
        "series": series
    }
)

# יצירת מופע של המחלקה הדינמית
book_instance = DynamicBook(title="Study in Scarlet", author="Conan Doyle", year=1887)
print(f"Instantiated {type(book_instance).__name__} with MainChar: {book_instance.MainChar}")</code></pre>
      </div></details>

      <h4>שאלה 7 · אבטחת זיכרון ומערכות הפעלה: מנגנון ASLR</h4>
      <p><strong>סעיף א (8 נקודות):</strong> הסבר מהות ASLR, הבעיה האבטחתית שהוא מונע (ניבוי כתובות מחסנית, Heap וספריות לצורך הזרקת קוד / ROP), וכיצד הוא פועל (הגרלת היסט בסיס בכל טעינת תהליך ע"י ה-Loader).</p>
      <p><strong>סעיף ב (9 נקודות):</strong> תוכנית C/C++ לבדיקה האם ASLR פעיל במערכת ההפעלה.</p>
      <details class="fold"><summary>פתרון מפורט — סעיף ב</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    // בדיקה ישירה דרך ממשק מערכת ההפעלה Linux
    FILE* f = fopen("/proc/sys/kernel/randomize_va_space", "r");
    if (f) {
        int aslr = -1;
        if (fscanf(f, "%d", &aslr) == 1) {
            if (aslr == 0) printf("ASLR is Disabled (0)\n");
            else if (aslr == 1) printf("ASLR is Conservative/Partial (1)\n");
            else if (aslr == 2) printf("ASLR is Full (2)\n");
        }
        fclose(f);
    } else {
        // גישה היוריסטית: הדפסת כתובת משתנה מחסנית
        int stack_var = 1;
        printf("Stack address: %p\n", (void*)&stack_var);
        printf("(In ASLR, this address changes between different runs)\n");
    }
    return 0;
}</code></pre>
      </div></details>

      <p><strong>סעיף ג (8 נקודות):</strong> הגנות נוספות (DEP/NX, Stack Canaries) ושיטות עקיפת ASLR (דליפת כתובת Memory Leak, מודולים ללא PIE, ו-Brute-Force במערכות 32-ביט).</p>

      <h4>שאלה 8 · ++C: מניפולציות זיכרון ו-Vtables (חטיפת פונקציה וירטואלית)</h4>
      <p><strong>סעיף א (8 נקודות):</strong> הסבר מנגנון <code>vptr</code> ו-<code>vtable</code>. שני האובייקטים <code>obj</code> ו-<code>obj2</code> נוצרו מאותו טיפוס <code>Derived</code> ולכן חולקים את אותה ה-vtable בדיוק!</p>
      <p><strong>סעיף ב (9 נקודות):</strong> כתיבת קוד הדורס את הטבלה ומפנה את הכניסה הראשונה ל-<code>hacked_function</code>.</p>
      <details class="fold"><summary>פתרון מפורט — סעיף ב</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>// דרך 1: החלפת מצביע ה-vtable באובייקט למערך מצביעים מזויף (Fake Vtable)
uintptr_t fake_vtable[1];
fake_vtable[0] = (uintptr_t)hacked_function;
*(uintptr_t**)obj = fake_vtable;

// דרך 2: דריסה ישירה של חריץ 0 ב-vtable (אם מותרת כתיבה לזיכרון)
// uintptr_t* vtable = *(uintptr_t**)obj;
// vtable[0] = (uintptr_t)hacked_function;</code></pre>
      </div></details>
      <p><strong>סעיף ג (8 נקודות):</strong> הרצת <code>obj->show()</code> תקרא ל-<code>hacked_function</code> ותדפיס <code>Hacked Function!</code> במקום הפונקציה המקורית. אם שונתה הטבלה המשותפת עצמה, גם <code>obj2->show()</code> יושפע!</p>

      <h4>שאלה 9 · פייתון ומסדי נתונים: שרת Proxy ומטמון SQLite</h4>
      <p><strong>סעיף א (13 נקודות):</strong> שרת TCP על פורט 8080, בדיקת תקינות אורך URL עד 2048 תווים, בדיקה בטבלת <code>url_cache</code>, החזרת קובץ שמור או שמירת תוכן חדש עם <code>UrlRecord</code> (dataclass).</p>
      <p><strong>סעיף ב (12 נקודות):</strong> ניהול גודל מטמון (מעל 10 רשומות) — שליפת הרשומה הישנה ביותר לפי שדה זמן, מחיקת הקובץ מהדיסק עם <code>os.remove</code> ומחיקה מאובטחת מהמסד עם שאילתה פרמטרית.</p>
      <details class="fold"><summary>פתרון מלא — שאלה 9</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>import socket
import sqlite3
import os
import time
import hashlib
from dataclasses import dataclass

@dataclass
class UrlRecord:
    url: str
    filename: str
    last_accessed: float

def init_db(db_name="proxy_cache.db"):
    with sqlite3.connect(db_name) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS url_cache (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT UNIQUE NOT NULL,
                filename TEXT NOT NULL,
                last_accessed REAL NOT NULL
            )
        """)
        conn.commit()

def evict_oldest_cache(conn: sqlite3.Connection, max_records=10):
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM url_cache")
    count = cursor.fetchone()[0]
    if count > max_records:
        cursor.execute("SELECT id, filename FROM url_cache ORDER BY last_accessed ASC LIMIT 1")
        oldest = cursor.fetchone()
        if oldest:
            rec_id, filename = oldest
            if os.path.exists(filename):
                try:
                    os.remove(filename)
                except OSError:
                    pass
            # שאילתה פרמטרית מוגנת מ-SQL Injection
            cursor.execute("DELETE FROM url_cache WHERE id = ?", (rec_id,))
            conn.commit()

def run_proxy():
    init_db()
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(("0.0.0.0", 8080))
    server.listen(5)
    print("Proxy server running on port 8080...")

    while True:
        client, addr = server.accept()
        with client:
            data = client.recv(4096)
            if not data or len(data) > 2048:
                client.sendall(b"HTTP/1.1 400 Bad Request: Invalid or too large URL\r\n\r\n")
                continue
            
            url = data.decode("utf-8", errors="replace").strip()
            with sqlite3.connect("proxy_cache.db") as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT filename FROM url_cache WHERE url = ?", (url,))
                row = cursor.fetchone()

                if row and os.path.exists(row[0]):
                    with open(row[0], "r", encoding="utf-8") as f:
                        client.sendall(f.read().encode("utf-8"))
                    cursor.execute("UPDATE url_cache SET last_accessed = ? WHERE url = ?", (time.time(), url))
                    conn.commit()
                else:
                    content = f"Fetched content for {url} at {time.ctime()}"
                    fname = f"cache_{hashlib.md5(url.encode()).hexdigest()}.txt"
                    with open(fname, "w", encoding="utf-8") as f:
                        f.write(content)
                    
                    rec = UrlRecord(url=url, filename=fname, last_accessed=time.time())
                    cursor.execute(
                        "INSERT OR REPLACE INTO url_cache (url, filename, last_accessed) VALUES (?, ?, ?)",
                        (rec.url, rec.filename, rec.last_accessed)
                    )
                    conn.commit()
                    evict_oldest_cache(conn, max_records=10)
                    client.sendall(content.encode("utf-8"))</code></pre>
      </div></details>
    `,
  },
  {
    id: "e-2026a",
    title: "2026א מועד א2 (מועד 91, שאלון 534) · בחינה מקורית מלאה",
    source: "שאלון 534 מקורי ומלא (26 בפברואר 2026).",
    html: `
      <h3>חלק א' — שאלות רב-ברירה (25 נקודות)</h3>
      <ul>
        <li><strong>שאלה 1 — אופרטור טרינארי ב-++C:</strong> התחביר הנכון הוא <code>string Greeting = (time>18) ? ...</code> (תשובה ג'). (משפטי if-else רגילים או טיפוס <code>str</code> אינם חוקיים ב-C++).</li>
        <li><strong>שאלה 2 — תקיפת הזרקת SQL:</strong> שרשור מחרוזת באמצעות <code>'%s' % qry</code> אינו שאילתה פרמטרית, ולכן ניתן לתקוף בעזרת <code>AAA' or 1=1; --</code> שסוגר את הגרש, מחזיר True לכל השורות ומבטל את יתר השאילתה (תשובה ב').</li>
        <li><strong>שאלה 3 — הגנה מפני ROP:</strong> מנגנון <strong>ASLR</strong> חיוני כנגד מתקפות Return-Oriented Programming (ROP) כיוון שהוא מגריל את כתובות הבסיס של מקטעי הקוד והספריות בכל הרצה (תשובה א').</li>
        <li><strong>שאלה 4 — הגדרת Coupling (צימוד):</strong> רמת הקשר והתלות ההדדית בין שתי מחלקות או שני מודולים שונים (תשובה ב').</li>
        <li><strong>שאלה 5 — טיפוס משתנה 20.0 בפייתון:</strong> <code>x = 20.0</code> מכיל נקודה עשרונית ולכן <code>type(x)</code> מחזיר <code>&lt;class 'float'&gt;</code> (תשובה ב').</li>
      </ul>

      <h3>חלק ב' — שאלות פתוחות (75 נקודות)</h3>

      <h4>שאלה 6 · פייתון: מילים ב-pre, מחלקות ספר וקריאת קובץ</h4>
      <pre class="code" dir="ltr"><code>def print_pre_words(text: str) -> None:
    if not isinstance(text, str):
        raise TypeError("Argument must be of type string")
    for word in text.split():
        if word.lower().startswith("pre"):
            print(word.upper())

class Book:
    def __init__(self, title: str, author: str, year: int):
        self.title, self.author, self.year = str(title), str(author), int(year)

class BookRevised(Book):
    def __init__(self, title: str, authors: list, year: int):
        super().__init__(title, "many", year)
        self.authors = list(authors)

def load_books(filename: str) -> list:
    all_books = []
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            for line in f:
                parts = [p.strip() for p in line.split(',') if p.strip()]
                if len(parts) >= 3:
                    title, year = parts[0], int(parts[-1])
                    auth = ','.join(parts[1:-1]).strip()
                    if auth.startswith('(') and auth.endswith(')'):
                        all_books.append(BookRevised(title, [a.strip() for a in auth[1:-1].split(',')], year))
                    else:
                        all_books.append(Book(title, auth, year))
    except Exception as e:
        print(f"Friendly Error: {e}")
    return all_books</code></pre>

      <h4>שאלה 7 · פולימורפיזם, vptr/vtable וחולשת Vtable Hijacking ב-++C</h4>
      <p><strong>א.</strong> פולימורפיזם ממומש ע"י טבלת פונקציות וירטואליות סטטית (<code>vtable</code>) במקטע הקריאה בלבד (.rodata), ומצביע נסתר (<code>vptr</code>) הנוסף לכל אובייקט ומפנה ל-vtable של מחלקתו.<br>
      <strong>ב.</strong> פונקציה לא-וירטואלית נקשרת סטטית בקומפילציה לפי טיפוס המצביע (Early Binding). פונקציה וירטואלית נקשרת דינמית בזמן ריצה בעקיפין דרך ה-vptr וה-vtable.<br>
      <strong>ג. חולשה (Vtable Hijacking):</strong> ה-<code>vptr</code> נמצא בזיכרון האובייקט (Heap/Stack). גלישת חוצץ מאפשרת לדרוס את ה-<code>vptr</code> ולהפנותו ל-vtable מזויפת בזיכרון, כך שקריאה וירטואלית תקפוץ ישירות לקוד זדוני (RCE). הגנה: CFI ו-ASLR.</p>

      <h4>שאלה 8 · לקוח תקשורת לינוקס ו-SQLite</h4>
      <p><strong>א.</strong> לקוח C++ הפותח שקע ל-<code>192.168.14.25:8080</code>, קורא את <code>messages.txt</code>, מצרף כותרת של 3 מספרי int ב-Big Endian (<code>htonl</code>) עבור מזהה קובץ, גודל ומספר חבילה, ושולח בצ'אנקים $\le 1024$ בתים.<br>
      <strong>ב.</strong> תוכנית פייתון הקוראת את <code>phrases.txt</code> ומכניסה בצורה מאובטחת לטבלת <code>texts (line_number, content)</code> במסד <code>messages.db</code> באמצעות <code>executemany</code> ושאילתה פרמטרית (<code>?</code>).</p>

      <h4>שאלה 9 · עץ חיפוש בינארי ב-++C ותיקון Double Free</h4>
      <p><strong>הבאג:</strong> בנאי ההעתקה ב-<code>BTree</code> מבצע העתקה שטחית (<code>_root = tree._root;</code>). שני האובייקטים מחזיקים מצביעים לאותם צמתים, ובעת הריסתם נקרא <code>delete</code> כפול שגורם להתרסקות <strong>Double Free</strong>.<br>
      <strong>התיקון:</strong> מימוש בנאי העתקה רקורסיבי עמוק ב-<code>Node</code> (המשכפל את <code>_left</code> ו-<code>_right</code> בעזרת <code>new Node</code>), בנאי העתקה עמוק ב-<code>BTree</code>, ואופרטור השמה בטוח בשיטת Copy-and-Swap.</p>
    `,
  },
  {
    id: "e-2024-09-61",
    title: "19.9.2024 שאלון 61 (18.9.2025) · בחינה מלאה ומאומתת",
    source: "שאלון מודפס ומחברות בחינה מאומתות מדוחות הסריקה הרשמיים (ציון 94).",
    html: `
      <h3>חלק א' — שאלות רב-ברירה (25 נקודות)</h3>
      <ul>
        <li><strong>שאלה 1 — מאגר חולשות CVE (תשובה ד'):</strong> מילון ה-CVE (Common Vulnerabilities and Exposures) הוא מאגר ציבורי ובינלאומי המקטלג ומזהה באופן חד-ערכי חולשות אבטחה מוכרות בתוכנות ובמערכות.</li>
        <li><strong>שאלה 2 — ניסיון כתיבה לקובץ שנפתח לקריאה בלבד בפייתון (תשובה ב'):</strong> פתיחת קובץ ב-<code>open("file.txt")</code> ללא פרמטר mode פותחת אותו כברירת מחדל לקריאה (<code>'r'</code>). הפעלת <code>f.write()</code> תזרוק חריגת <code>io.UnsupportedOperation: not writable</code>.</li>
        <li><strong>שאלה 3 — מנגנון CET של אינטל ו-Shadow Stack (תשובה ג'):</strong> מנגנון החומרה <strong>CET</strong> שומר עותק מבודד של כתובת החזרה ב-Shadow Stack פנימי במעבד, שאינו נגיש לפקודות כתיבה רגילות בזיכרון, ובכך חוסם מתקפות ROP.</li>
        <li><strong>שאלה 4 — פונקציית ntohl (תשובה א'):</strong> ממירה מספר בן 32 סיביות מסדר בתים של הרשת (Network Byte Order, שהוא Big-Endian) לסדר בתים של המחשב המקומי (Host Byte Order, לרוב Little-Endian).</li>
        <li><strong>שאלה 5 — מניעת הרצת קוד עוין בקלט (תשובה ב'):</strong> בפייתון חל איסור להשתמש ב-<code>eval()</code> או <code>exec()</code> על קלט משתמש; יש להשתמש בפרסור בטוח כגון <code>ast.literal_eval()</code>.</li>
      </ul>

      <h3>חלק ב' — שאלות פתוחות (75 נקודות)</h3>

      <h4>שאלה 6 · פייתון: מחלקת Book, חריגת BookDataError ופונקציית Buy</h4>
      <p><strong>סעיף א:</strong> מחלקה <code>Book</code> עם אימות טיפוסים קפדני (Title, Author, CatalogNum, Price, Quantity) וחריגה מותאמת <code>BookDataError</code>.<br>
      <strong>סעיף ב:</strong> ניהול מילון ספרים לפי מספר קטלוגי.<br>
      <strong>סעיף ג:</strong> פונקציה <code>buy_book</code> המאפשרת רכישה לפי מספר קטלוגי או לפי שם+מחבר, ומעדכנת מלאי.</p>
      <details class="fold"><summary>פתרון מפורט — שאלה 6</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>class BookDataError(Exception):
    """חריגה מותאמת עבור שגיאות בנתוני ספר"""
    pass

class Book:
    def __init__(self, cat_id: int, title: str, author: str, price: float, quantity: int):
        if not isinstance(cat_id, int) or cat_id &lt;= 0:
            raise BookDataError("Invalid catalog ID")
        if not isinstance(title, str) or not title.strip():
            raise BookDataError("Title must be a non-empty string")
        if not isinstance(author, str) or not author.strip():
            raise BookDataError("Author must be a non-empty string")
        if not isinstance(price, (int, float)) or price &lt; 0:
            raise BookDataError("Price must be a non-negative number")
        if not isinstance(quantity, int) or quantity &lt; 0:
            raise BookDataError("Quantity must be a non-negative integer")

        self.cat_id = cat_id
        self.title = title.strip()
        self.author = author.strip()
        self.price = float(price)
        self.quantity = quantity

    def __str__(self):
        return f"[{self.cat_id}] '{self.title}' by {self.author} - " + str(self.price) + " (In stock: " + str(self.quantity) + ")"

def buy_book(catalog: dict, identifier, amount: int = 1) -> bool:
    """מאפשרת קנייה לפי מספר קטלוגי (int) או לפי טאפל (title, author)"""
    target_book = None
    if isinstance(identifier, int):
        target_book = catalog.get(identifier)
    elif isinstance(identifier, tuple) and len(identifier) == 2:
        req_title, req_author = identifier
        for b in catalog.values():
            if b.title.lower() == req_title.lower() and b.author.lower() == req_author.lower():
                target_book = b
                break

    if target_book is None:
        print("Error: Book not found in catalog.")
        return False

    if target_book.quantity &lt; amount:
        print(f"Error: Not enough stock for '{target_book.title}'. Available: {target_book.quantity}")
        return False

    target_book.quantity -= amount
    print(f"Purchase successful! Bought {amount} copy/ies of '{target_book.title}'. Remaining: {target_book.quantity}")
    return True</code></pre>
      </div></details>

      <h4>שאלה 7 · קנרית המחסנית (Stack Canary) מול CET (Shadow Stack)</h4>
      <p>השוואה מקיפה בין מנגנוני הגנת כתובת החזרה:</p>
      <details class="fold"><summary>פתרון מפורט — שאלה 7</summary><div class="fold-body">
      <table style="width:100%; border-collapse:collapse; margin-top:10px;">
        <thead>
          <tr style="background:var(--bg-accent, #2a2a3e);">
            <th style="padding:8px; border:1px solid #444;">מאפיין</th>
            <th style="padding:8px; border:1px solid #444;">קנרית המחסנית (Stack Canary)</th>
            <th style="padding:8px; border:1px solid #444;">CET (Control-flow Enforcement Technology)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding:8px; border:1px solid #444;"><strong>שכבת המימוש</strong></td>
            <td style="padding:8px; border:1px solid #444;">תוכנה / קומפיילר בלבד (GCC/Clang <code>-fstack-protector</code>).</td>
            <td style="padding:8px; border:1px solid #444;">חומרה ייעודית במעבד (Intel Tiger Lake ואילך) + תמיכת OS.</td>
          </tr>
          <tr>
            <td style="padding:8px; border:1px solid #444;"><strong>מנגנון פעולה</strong></td>
            <td style="padding:8px; border:1px solid #444;">שתילת ערך סודי לפני כתובת החזרה ובדיקתו ב-Epilog של הפונקציה.</td>
            <td style="padding:8px; border:1px solid #444;">מחסנית צל (Shadow Stack) מבודדת שבה נשמרת כתובת החזרה במקביל.</td>
          </tr>
          <tr>
            <td style="padding:8px; border:1px solid #444;"><strong>הגנה מפני ROP</strong></td>
            <td style="padding:8px; border:1px solid #444;">חלקית בלבד; אינה מגינה אם התוקף לא דרס את הקנרית או הדליף את ערכה.</td>
            <td style="padding:8px; border:1px solid #444;">הגנה מלאה וקשיחה; כל סטייה בין המחסניות זורקת חריגת חומרה (#CP).</td>
          </tr>
          <tr>
            <td style="padding:8px; border:1px solid #444;"><strong>חולשות ועקיפות</strong></td>
            <td style="padding:8px; border:1px solid #444;">דליפת זיכרון (Memory Disclosure via Format String) או דריסת vptr.</td>
            <td style="padding:8px; border:1px solid #444;">דורש מעבד תומך; אינו מגן מפני מניפולציות נתונים טהורות (Data-only attacks).</td>
          </tr>
        </tbody>
      </table>
      </div></details>

      <h4>שאלה 8 · תקשורת רשת: תאימות פרוטוקולים ושליחת קובץ ב-8192 בתים</h4>
      <p><strong>סעיף א (עקרונות תקשורת):</strong>
      1. לקוח ב-++C ושרת בפייתון יכולים לתקשר באופן מלא כל עוד הם פועלים לפי אותו פרוטוקול רשת מוגדר (כגון TCP/IP ופורמט הודעות אחיד).<br>
      2. תקשורת בין IPv4 ל-IPv6 אינה ישירה כיוון שמבנה כתובות ו-Headers שונה; נדרש מנגנון תרגום (NAT64 / Dual-Stack).<br>
      3. RSA (הצפנה א-סימטרית) משמשת להחלפת מפתחות ואימות, בעוד AES (הצפנה סימטרית) משמשת להצפנת תעבורת הנתונים בפועל.<br>
      <strong>סעיף ב (קוד לקוח ב-++C):</strong></p>
      <details class="fold"><summary>פתרון מפורט — סעיף ב</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>#include &lt;iostream&gt;
#include &lt;fstream&gt;
#include &lt;cstring&gt;
#include &lt;unistd.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;netinet/in.h&gt;
#include &lt;arpa/inet.h&gt;

#define CHUNK_SIZE 8192 // 64K bits = 8192 Bytes

void send_input_file(const char* host, int port) {
    std::ifstream file("input.txt", std::ios::binary);
    if (!file.is_open()) {
        std::cerr &lt;&lt; "Error: Could not open input.txt" &lt;&lt; std::endl;
        return;
    }

    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock &lt; 0) {
        perror("Socket creation failed");
        return;
    }

    struct sockaddr_in serv_addr;
    memset(&serv_addr, 0, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(port);
    inet_pton(AF_INET, host, &serv_addr.sin_addr);

    if (connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) &lt; 0) {
        perror("Connection to 8.8.8.8 failed");
        close(sock);
        return;
    }

    char buffer[CHUNK_SIZE];
    while (file.read(buffer, sizeof(buffer)) || file.gcount() &gt; 0) {
        std::streamsize bytes_to_send = file.gcount();
        ssize_t sent = send(sock, buffer, bytes_to_send, 0);
        if (sent &lt; 0) {
            perror("Failed to send chunk");
            break;
        }
    }

    file.close();
    close(sock);
    std::cout &lt;&lt; "File input.txt successfully transmitted." &lt;&lt; std::endl;
}</code></pre>
      </div></details>

      <h4>שאלה 9 · גלישה נומרית ב-read_string עם ntohl</h4>
      <p>ניתוח דפנסיבי של פונקציית קריאת מחרוזת מהסוקט עם המרת <code>ntohl</code>:</p>
      <details class="fold"><summary>פתרון מפורט — שאלה 9</summary><div class="fold-body">
      <ul>
        <li><strong>החולשה:</strong> קבלת אורך מהרשת והמרתו ב-<code>ntohl(length)</code>. לאחר מכן חישוב <code>length + 2</code> בתוך <code>calloc</code> גורם לעטיפת שלמים (Integer Overflow). עבור ערך <code>0xFFFFFFFF</code> (ב-32 ביט), החיבור עוטף ל-1. <code>calloc</code> מקצה בית אחד בלבד, אך <code>read_bytes</code> קורא את כל האורך המקורי — מה שיוצר <strong>Heap Buffer Overflow</strong> קריטי.</li>
        <li><strong>באגים תחביריים נוספים בקוד המקורי:</strong> היעדר פסיק בין הארגומנטים של <code>calloc</code>, ושימוש בסוגריים עגולים <code>string(length)</code> במקום סוגריים מרובעים <code>string[length]</code>.</li>
        <li><strong>התיקון הדפנסיבי:</strong> הגבלת אורך מקסימלי סביר (למשל 10MB) ובדיקת מניעת גלישה:</li>
      </ul>
<pre class="code" dir="ltr"><code>#define MAX_STRING_LEN (10 * 1024 * 1024)

uint32_t length = ntohl(net_length);
if (length &gt; MAX_STRING_LEN || length &gt; UINT32_MAX - 2) {
    return NULL; // דחיית קלט עוין
}
char* string = (char*)calloc(length + 2, sizeof(char));
if (!string) return NULL;</code></pre>
      </div></details>

    `,
  },
  {
    id: "e-2025a-12-2",
    title: "2024א מועד ב (10.3.2024, שאלון 92) · פתרון רשמי מלא",
    source: "שאלון 92 מקורי ופתרון רשמי מלא מתוך מאגר הבחינות (שוחזר בעבר כ-12.2).",
    html: `
      <h3>חלק א' — שאלות רב-ברירה (25 נקודות)</h3>
      <ul>
        <li><strong>שאלה 1 — יצירת הפניה (Reference) ב-++C (תשובה ב'):</strong> כדי לייצר הפניה למחרוזת קיימת <code>string food = "Pizza";</code> התחביר הנכון הוא <code>string &amp;meal = food;</code>. (ללא אמפרסנד לפני המשתנה המקורי, וללא כוכבית של מצביע).</li>
        <li><strong>שאלה 2 — מטרת תוכנת כופר (Ransomware) (תשובה א'):</strong> סחיטת כסף או נכס אחר מארגון על ידי הצפנת קבציו ומניעת גישה אליהם עד לתשלום דמי הכופר.</li>
        <li><strong>שאלה 3 — פתיחת קובץ כברירת מחדל בפייתון (תשובה ב'):</strong> פקודת <code>with open("filename.txt") as f:</code> פותחת קובץ לקריאה בלבד (<code>'r'</code>). ניסיון כתיבה לקובץ קיים יזרוק <code>io.UnsupportedOperation: not writable</code>, ואם הקובץ אינו קיים תיזרק <code>FileNotFoundError</code>.</li>
        <li><strong>שאלה 4 — קריאה לבנאי מחלקת הבסיס בפייתון (תשובה ד'):</strong> כאשר המחלקה היורשת <code>ColPoint(Point)</code> אינה קוראת ל-<code>super().__init__()</code>, שדות הבסיס <code>self.x</code> ו-<code>self.y</code> אינם נוצרים. הפעלת <code>print(p1)</code> המפעילה את <code>__str__</code> תיכשל ותזרוק <code>AttributeError: 'ColPoint' object has no attribute 'x'</code>.</li>
        <li><strong>שאלה 5 — הגדרת חולשות CVE (תשובה ב'):</strong> חולשות אבטחה המדווחות ומקוטלגות במאגר הציבורי הבינלאומי של חולשות תוכנה (Common Vulnerabilities and Exposures).</li>
      </ul>

      <h3>חלק ב' — שאלות פתוחות (75 נקודות)</h3>

      <h4>שאלה 6 · פייתון: עיבוד מחרוזות, מחלקת HPBook וקריאת קובץ ספרים</h4>
      <p><strong>סעיף א:</strong> פונקציה <code>process_str</code> המקבלת מחרוזת, מפצלת לפי נקודה-פסיק (<code>;</code>), מזהה מילים המתחילות ב-<code>de</code> ומדפיסה אותן באות ראשונה גדולה (<code>word.capitalize()</code>).<br>
      <strong>סעיף ב:</strong> מחלקה <code>Book(title, author, year)</code> ומחלקה יורשת <code>HPBook(Book)</code> שבה רשימת הדמויות <code>MainChars</code> מקבלת כברירת מחדל את <code>("Harry", "Hermione", "Ron")</code>.<br>
      <strong>סעיף ג:</strong> פונקציה <code>read_bookfile(fname)</code> לפתיחת קובץ, בניית רשימת ספרים עם יצירת <code>HPBook</code> לספרי הארי פוטר, וטיפול ידידותי בשגיאות ללא Traceback.</p>
      <details class="fold"><summary>פתרון מפורט — שאלה 6</summary><div class="fold-body">
<pre class="code" dir="ltr"><code># סעיף א'
def process_str(my_str: str) -> None:
    if not isinstance(my_str, str):
        raise TypeError("Argument must be of type string")
    for word in my_str.split(';'):
        word = word.strip()
        if word.lower().startswith('de'):
            print(word.capitalize())

# סעיף ב'
class Book:
    def __init__(self, title: str, author: str, year):
        self.title = str(title)
        self.author = str(author)
        self.year = int(year)

class HPBook(Book):
    def __init__(self, title: str, author: str, year, chars=("Harry", "Hermione", "Ron")):
        super().__init__(title, author, year)
        self.MainChars = list(chars)

# סעיף ג'
import os

def read_bookfile(fname: str) -> list:
    if not os.path.isfile(fname):
        print(f"Friendly Error: File '{fname}' does not exist.")
        return []
    all_books = []
    try:
        with open(fname, "r", encoding="utf-8") as f:
            for line in f:
                fields = [x.strip() for x in line.split(',') if x.strip()]
                if len(fields) &lt; 3:
                    continue
                title, author, year = fields[0], fields[1], fields[2]
                if "Harry Potter" in title:
                    chars = fields[3:] if len(fields) &gt; 3 else ("Harry", "Hermione", "Ron")
                    all_books.append(HPBook(title, author, year, chars))
                else:
                    all_books.append(Book(title, author, year))
        return all_books
    except Exception as err:
        print(f"Friendly Error while reading books file: {err}")
        return []</code></pre>
      </div></details>

      <h4>שאלה 7 · מנגנון החומרה CET (Control-Flow Enforcement Technology)</h4>
      <p><strong>סעיף א (הבעיה):</strong> שיבוש כתובת החזרה (Return Address) או ה-Saved EBP במחסנית באמצעות Buffer Overflow, לצורך ביצוע מתקפות הזרקת קוד או שימוש חוזר בקוד (ROP / JOP).<br>
      <strong>סעיף ב (הפתרון):</strong> מנגנון חומרה ייעודי של Intel הכולל <strong>Shadow Stack (מחסנית צל)</strong> באזור זיכרון מבודד שאינו נגיש לפקודות כתיבה רגילות. בעת <code>CALL</code> נשמרת כתובת החזרה בשתי המחסניות במקביל, ובעת <code>RET</code> המעבד משווה ביניהן. כל אי-התאמה מעידה על מתקפה ומפעילה מיידית חריגת בקרה (Control Protection Exception - <code>#CP</code>).<br>
      <strong>סעיף ג (השפעה על המחסנית):</strong> אינו משנה את מבנה המחסנית המקורית כלל; המחסנית הרגילה ממשיכה לתפקד ללא שינוי, ללא צורך בעריכת קוד המקור.<br>
      <strong>סעיף ד (פתרונות חלופיים):</strong> מנגנון GCS של ARM (Guarded Control Stack), קנרית המחסנית (Stack Canary), ו-ASLR.</p>

      <h4>שאלה 8 · תקשורת רשת: לקוח C/++C ושרת פייתון עם אישור (ACK)</h4>
      <p><strong>סעיף א:</strong> לקוח C/++C הפותח תקשורת לשרת <code>192.168.14.25:8080</code> ושולח את תוכן <code>messages.txt</code> בחבילות של עד 1024 בתים, עם טיפול בשגיאת קובץ חסר.<br>
      <strong>סעיף ב:</strong> שרת פייתון המקשיב בפורט 8080, מקבל את הקובץ ומחזיר הודעת אישור (ACK).</p>
      <details class="fold"><summary>פתרון מפורט — שאלה 8</summary><div class="fold-body">
<pre class="code" dir="ltr"><code>// סעיף א' — לקוח C++ בלינוקס
#include &lt;iostream&gt;
#include &lt;fstream&gt;
#include &lt;cstring&gt;
#include &lt;unistd.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;arpa/inet.h&gt;

void send_messages_file() {
    std::ifstream file("messages.txt", std::ios::binary);
    if (!file.is_open()) {
        std::cerr &lt;&lt; "Friendly Error: Could not open messages.txt" &lt;&lt; std::endl;
        return;
    }
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in serv;
    serv.sin_family = AF_INET;
    serv.sin_port = htons(8080);
    inet_pton(AF_INET, "192.168.14.25", &serv.sin_addr);

    if (connect(sock, (struct sockaddr*)&serv, sizeof(serv)) &gt;= 0) {
        char buf[1024];
        while (file.read(buf, sizeof(buf)) || file.gcount() &gt; 0) {
            send(sock, buf, file.gcount(), 0);
        }
    }
    close(sock);
    file.close();
}

# סעיף ב' — שרת פייתון
import socket

def run_ack_server(port=8080):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("0.0.0.0", port))
        s.listen(1)
        conn, addr = s.accept()
        with conn:
            received_data = b""
            while True:
                chunk = conn.recv(1024)
                if not chunk: break
                received_data += chunk
            conn.sendall(b"ACK: File received successfully")</code></pre>
      </div></details>

      <h4>שאלה 9 · גלישת ערימה בשני שלבים (Two-Stage Heap Overflow)</h4>
      <pre class="code" dir="ltr"><code>#define FIELDSIZE (24)
struct field {
    unsigned char f_id;
    char* f_data;
};

void handle_fields(int argc, char** argv) {
    if (argc != 2) exit(1);
    field* r1 = (struct field*)malloc(sizeof(struct field));
    r1->f_id = 1;
    r1->f_data = (char*)malloc(FIELDSIZE);

    field* r2 = (struct field*)malloc(sizeof(struct field));
    r2->f_id = 2;
    r2->f_data = (char*)malloc(FIELDSIZE);

    strcpy(r1->f_data, argv[0]);
    strcpy(r2->f_data, argv[1]);
}</code></pre>
      <details class="fold"><summary>פתרון מפורט — שאלה 9</summary><div class="fold-body">
      <ul>
        <li><strong>סעיף א — החולשה וניצולה:</strong> בהנחת הקצאות רציפות ב-Heap, החוצץ <code>r1->f_data</code> ממוקם לפני המבנה <code>r2</code>. הפקודה <code>strcpy(r1->f_data, argv[0])</code> אינה בודקת גבולות. הזנת מחרוזת ארוכה מ-24 תווים ב-<code>argv[0]</code> גולשת ודורסת את השדות של <code>r2</code>, ובפרט את המצביע <code>r2->f_data</code>. לאחר מכן, השורה הבאה <code>strcpy(r2->f_data, argv[1])</code> מעתיקה את <code>argv[1]</code> לתוך הכתובת הנדרסת! זוהי פגיעות <strong>Arbitrary Memory Write (Write-What-Where)</strong> המאפשרת לתוקף לשכתב כתובת חזרה, כניסה ב-GOT או מצביע פונקציה.</li>
        <li><strong>סעיף ב — התיקון הדפנסיבי:</strong> בדיקת אורך קפדנית לפני ההעתקה או שימוש ב-<code>strncpy</code> / מחרוזות בטוחות ב-++C:</li>
      </ul>
<pre class="code" dir="ltr"><code>if (strlen(argv[0]) &gt;= FIELDSIZE || strlen(argv[1]) &gt;= FIELDSIZE) {
    fprintf(stderr, "Input string exceeds maximum field size!\n");
    exit(1);
}
strncpy(r1-&gt;f_data, argv[0], FIELDSIZE - 1);
r1-&gt;f_data[FIELDSIZE - 1] = '\0';</code></pre>
      </div></details>

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
