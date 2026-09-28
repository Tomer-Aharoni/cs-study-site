(window.EXAM_SIMS = window.EXAM_SIMS || []).push(
  {
    id: "e-2021a74",
    title: "סימולציה בסגנון 2021א-74",
    minutes: 180,
    pick: 3,
    note: "חלק א על אפחות. שאלות 6–7 על נושאים שחוזרים. שאלות 8–9: שקע עם SQLite, וארגז חול עם exec.",
    partA: [
      {
        id: "a1",
        prompt: "אפחות (Mitigation) פירושה:",
        options: [
          { id: "a", text: "המערכת בלי באגים וללא בעיות אבטחה." },
          { id: "b", text: "שמירת נתונים בלי גישה לגורמים לא מורשים (סודיות)." },
          { id: "c", text: "תקיפה שנובעת מחולשה." },
          { id: "d", text: "הגנה שמזערה נזק מתקיפה." },
        ],
        answer: "d",
      },
      {
        id: "a2",
        prompt: "IPv6 — כמה סיביות לכתובת?",
        options: [
          { id: "a", text: "32" },
          { id: "b", text: "64" },
          { id: "c", text: "128" },
          { id: "d", text: "256" },
        ],
        answer: "c",
      },
      {
        id: "a3",
        prompt: "העמסת פונקציות בפייתון:",
        options: [
          { id: "a", text: "כמו C++ לפי טיפוסי פרמטרים." },
          { id: "b", text: "אין העמסה; שם חדש מסתיר, ברירות מחדל ו-kwargs." },
          { id: "c", text: "רק עם private." },
          { id: "d", text: "רק במפרש 2." },
        ],
        answer: "b",
      },
      {
        id: "a4",
        prompt: "list.copy() בפייתון ואז שינוי איבר פנימי ברשימה מקוננת:",
        options: [
          { id: "a", text: "העתקה עמוקה תמיד." },
          { id: "b", text: "העתקה רדודה: הרשימה החדשה נפרדת, האובייקטים הפנימיים משותפים." },
          { id: "c", text: "שתי הרשימות הן אותו אובייקט (is)." },
          { id: "d", text: "אסור בפייתון 3." },
        ],
        answer: "b",
      },
      {
        id: "a5",
        prompt: "שכבת הייצוג ב-OSI אחראית בעיקר ל:",
        options: [
          { id: "a", text: "ניתוב IP." },
          { id: "b", text: "קידוד, דחיסה, הצפנה של המידע." },
          { id: "c", text: "כבלים." },
          { id: "d", text: "DNS בלבד." },
        ],
        answer: "b",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון בסיסי (דפוס חוזר)",
        prompt: "פונקציה שמפצלת מחרוזת ומדפיסה מילים לפי תחילית/סיומת; מחלקה עם בנאי; קריאת קובץ לאובייקטים. בחרו דפוס ando/pre/im כמו במועד — כאן: מילים שמתחילות ב-pre באותיות גדולות.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr">def print_pre(text):
    for w in text.split():
        if w.lower().startswith("pre"):
            print(w.upper())

class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year</pre>`,
        verdictKind: "new",
        verdict: "אין פתרון רשמי למועד הזה בסעיף הזה. זה ממלא פיצול + מחלקה. למועד 2024 הוסיפו type() לתת-מחלקה — ראו סימולציית 2024.",
      },
      {
        id: "q7",
        title: "שאלה 7 · אפחות לדריסת כתובת חזרה",
        prompt: "לפחות שלוש דרכים להגן מפני דריסת כתובת החזרה במחסנית.",
        hadOfficial: false,
        official: "",
        proposed: "<ul><li>קנרית המחסנית — ערך סודי לפני כתובת החזרה, בדיקה לפני ret.</li><li>ASLR — כתובות משתנות בין הרצות.</li><li>NX/DEP — מחסנית לא להריץ.</li><li>בדיקת אורך לפני copy; פונקציות מוגבלות.</li></ul>",
        verdictKind: "new",
        verdict: "אין פתרון רשמי מצורף. שלוש הראשונות הן מהיחידה; הרביעית היא תיקון שורש.",
      },
      {
        id: "q8",
        title: "שאלה 8 · לקוח פייתון ו־SQLite",
        prompt: "לקוח ל-119.4.7.5:8080, שליחת message.txt, הדפסת תשובה עד 128 בתים או 5 שורות (המוקדם), בלי Traceback. אחר כך טבלת messages עם מספר סידורי ועד 5 הודעות — פרמטרים.",
        hadOfficial: false,
        official: "השאלון קיים; פתרון רשמי מלא לא היה בחומר הקריא.",
        proposed: `<pre class="exam-code" dir="ltr">import socket, sqlite3
def main():
    try:
        with open("message.txt", "rb") as f:
            payload = f.read()
    except OSError as e:
        print("cannot read file:", e)
        return
    try:
        s = socket.create_connection(("119.4.7.5", 8080), timeout=10)
    except OSError as e:
        print("connect failed:", e)
        return
    try:
        s.sendall(payload)
        data = b""
        while len(data) &lt; 128 and data.count(b"\\n") &lt; 5:
            chunk = s.recv(64)
            if not chunk:
                break
            data += chunk
        lines = data.splitlines(True)
        out, n = b"", 0
        for ln in lines:
            if n &gt;= 5:
                break
            room = 128 - len(out)
            out += ln[:room]
            n += 1
            if len(out) &gt;= 128:
                break
        print(out.decode("utf-8", errors="replace"))
    finally:
        s.close()

conn = sqlite3.connect("table.db")
conn.execute("CREATE TABLE IF NOT EXISTS messages(id INTEGER, body TEXT)")
# replies: עד 5 מחרוזות מהשרת
for i, body in enumerate(replies[:5], start=1):
    conn.execute("INSERT INTO messages VALUES(?, ?)", (i, body))
conn.commit()
conn.close()</pre>`,
        verdictKind: "new",
        verdict: "עונה בדיוק: קובץ, IP/פורט, הגבלת פלט, הודעות שגיאה, טבלה עם ? . replies במבחן מגיע מסעיף א.",
      },
      {
        id: "q9",
        title: "שאלה 9 · ארגז חול ו־exec",
        prompt: "שירות ענן שמריץ קוד. א. Sandbox: מטרה, בעיות, מימוש עקרוני. ב. בעיות exec על קוד פייתון מהלקוח; אפחות; מה נשאר.",
        hadOfficial: false,
        official: "השאלה במבחן; אין פתרון רשמי קריא מעבר לניסוח.",
        proposed: `<p>א. ארגז חול מצמצם מה שקוד לא אמין יכול לגעת בו (קבצים, רשת, הרשאות). מימוש: תהליך חסר הרשאות, מגבלות משאבים, מרחב שמות. לא חסין באג בבקר.</p>
<p>ב. exec מריץ את המחרוזת כקוד. אפחות: לא במפרש של השרת; תהליך ילד מבודד. נשאר: בריחת ארגז, DoS עד התקרה. בלי מטען בריחה.</p>`,
        verdictKind: "new",
        verdict: "תואם את יחידה 6 ואת נוסח 2021א. אין פתרון רשמי לבדוק מולו.",
      },
    ],
  },
  {
    id: "e-2022c",
    title: "סימולציה בסגנון 2022ג",
    minutes: 180,
    pick: 3,
    note: "שחזור לפי זיכרון. אין פתרון רשמי.",
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
      },
      {
        id: "a5",
        prompt: "bind לכתובת IP נקובה בשרת (לא INADDR_ANY):",
        options: [
          { id: "a", text: "השרת מקשיב רק בממשק הזה." },
          { id: "b", text: "זה NAT." },
          { id: "c", text: "זה HTTPS." },
          { id: "d", text: "זה CGI." },
        ],
        answer: "a",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · שטח משולש ומצולע",
        prompt: "פונקציה לשטח לפי שתי צלעות וזווית כלולה 0.5·a·b·sin(γ), ברירות מחדל ו-kwargs; הדגמה בלי כל הארגומנטים; מחלקת מצולע (הדפסה+היקף) ומשולש שווה-צלעות יורש עם שטח.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr">import math
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
        return (math.sqrt(3) / 4) * a * a</pre>`,
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
        proposed: `<pre class="exam-code" dir="ltr">#include &lt;arpa/inet.h&gt;
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
}</pre>`,
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
    title: "סימולציה בסגנון 26.2.2024",
    minutes: 180,
    pick: 3,
    note: "שאלה 9 לא זכורה, ולכן אין לה פתרון כאן.",
    partA: [
      {
        id: "a1",
        prompt: "הצורה הנכונה לביטוי משולש ב-C++:",
        options: [
          { id: "a", text: "cond ? a : b" },
          { id: "b", text: "cond ?? a" },
          { id: "c", text: "a if cond else b כמו פייתון." },
          { id: "d", text: "רק if בלי ערך." },
        ],
        answer: "a",
      },
      {
        id: "a2",
        prompt: "חולשה (Vulnerability):",
        options: [
          { id: "a", text: "התקיפה עצמה." },
          { id: "b", text: "פגם שמאפשר ניצול." },
          { id: "c", text: "רק באג חישוב." },
          { id: "d", text: "אפחות." },
        ],
        answer: "b",
      },
      {
        id: "a3",
        prompt: "סיביות ב-IPv6:",
        options: [
          { id: "a", text: "32" },
          { id: "b", text: "128" },
          { id: "c", text: "48" },
          { id: "d", text: "8" },
        ],
        answer: "b",
      },
      {
        id: "a4",
        prompt: "b = a.copy ברשימה ואז שינוי איבר:",
        options: [
          { id: "a", text: "העתקה רדודה — a ו-b רשימות נפרדות." },
          { id: "b", text: "אותו אובייקט." },
          { id: "c", text: "עמוקה תמיד כולל כל הקינון." },
          { id: "d", text: "שגיאה." },
        ],
        answer: "a",
      },
      {
        id: "a5",
        prompt: "העמסה בפייתון:",
        options: [
          { id: "a", text: "נתמכת כמו C++." },
          { id: "b", text: "לא נתמכת." },
          { id: "c", text: "רק על אופרטורים." },
          { id: "d", text: "רק ב-C." },
        ],
        answer: "b",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, ספר, ויצירת מחלקה",
        prompt: "א. מילים שמתחילות ב-pre באותיות גדולות (פיצול רווח/שורה). ב. Book(שם, כותב, שנה). ג. קלט שם תת-מחלקה; type; בנאי קורא ל-Book; openu_id=20535.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr">def print_pre(s):
    for w in s.split():
        if w.lower().startswith("pre"):
            print(w.upper())

class Book:
    def __init__(self, title, author, year):
        self.title, self.author, self.year = title, author, year

name = input("class name: ").strip()
Sub = type(name, (Book,), {"openu_id": 20535})
# אם דורשים __init__ שקורא לבסיס במפורש:
def _init(self, title, author, year):
    Book.__init__(self, title, author, year)
Sub = type(name, (Book,), {"openu_id": 20535, "__init__": _init})</pre>`,
        verdictKind: "new",
        verdict: "אין רשמי. type() עם openu_id ממלא את סעיף ג כמו בשחזור.",
      },
      {
        id: "q7",
        title: "שאלה 7 · שלוש הגנות לכתובת חזרה",
        prompt: "ASLR, קנרית, ועוד.",
        hadOfficial: false,
        official: "",
        proposed: "<p>קנרית המחסנית; ASLR; NX/DEP. אפשר להוסיף בדיקת אורך.</p>",
        verdictKind: "new",
        verdict: "אין רשמי.",
      },
      {
        id: "q8",
        title: "שאלה 8 · שליחת קובץ בחלקים ושרת C++",
        prompt: "לקוח פייתון שולח קובץ בצ'אנקים ≤1024 לכתובת ופורט; שרת C++ מקבל ומאשר.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr"># לקוח
import socket
s = socket.create_connection((HOST, PORT))
with open("data.bin", "rb") as f:
    while True:
        chunk = f.read(1024)
        if not chunk:
            break
        s.sendall(chunk)
print(s.recv(64))
s.close()

/* שרת: recv בלולאה, send "OK" */</pre>`,
        verdictKind: "new",
        verdict: "HOST/PORT כמו בשאלה. אין רשמי.",
      },
      {
        id: "q9",
        title: "שאלה 9 · אין שחזור אמין",
        prompt: "בשחזור המקורי הסעיף לא זכור.",
        hadOfficial: false,
        official: "",
        proposed: "<p>אין הצעת קוד — עדיף לא לבחור את השאלה הזו בסימולציה אם אתם מתרגלים מועד אמיתי.</p>",
        verdictKind: "new",
        verdict: "לא ממציאים קטע C++.",
      },
    ],
  },
  {
    id: "e-2025c",
    title: "סימולציה בסגנון 2025ג מועד ג",
    minutes: 180,
    pick: 3,
    note: "שחזור לפי מחברות. לחלק א אין גוף שאלות, ולכן הוא לא נבחן כאן.",
    partA: [
      {
        id: "a1",
        prompt: "ASLR נועד בעיקר:",
        options: [
          { id: "a", text: "להצפין דיסק." },
          { id: "b", text: "לערבב כתובות זיכרון בין הרצות." },
          { id: "c", text: "להחליף TCP ב-UDP." },
          { id: "d", text: "למנוע SQL." },
        ],
        answer: "b",
      },
      {
        id: "a2",
        prompt: "שאילתה פרמטרית:",
        options: [
          { id: "a", text: "מדביקה קלט ל-SQL." },
          { id: "b", text: "מפרידה תבנית מערכים נקשרים." },
          { id: "c", text: "רק ב-Oracle." },
          { id: "d", text: "מחליפה HTTPS." },
        ],
        answer: "b",
      },
      {
        id: "a3",
        prompt: "type(name, bases, dict) בפייתון:",
        options: [
          { id: "a", text: "יוצר מחלקה בזמן ריצה." },
          { id: "b", text: "רק מדפיס טיפוס." },
          { id: "c", text: "זה htons." },
          { id: "d", text: "זה CGI." },
        ],
        answer: "a",
      },
      {
        id: "a4",
        prompt: "DDoS פוגע בעיקר ב:",
        options: [
          { id: "a", text: "זמינות." },
          { id: "b", text: "רק סודיות." },
          { id: "c", text: "רק שלמות." },
          { id: "d", text: "רק קנרית." },
        ],
        answer: "a",
      },
      {
        id: "a5",
        prompt: "vtable בפולימורפיזם:",
        options: [
          { id: "a", text: "טבלת מצביעים לפונקציות וירטואליות." },
          { id: "b", text: "טבלת SQL." },
          { id: "c", text: "קובץ /etc/passwd." },
          { id: "d", text: "שכבת OSI 1." },
        ],
        answer: "a",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, קובץ, ויצירת מחלקה",
        prompt: "wordp: str או ValueError; פיצול בפסיק; מילים שמתחילות ב-im; אות ראשונה גדולה והשאר קטנות. x_file: Setup.csv לכל שורה wordp → Setup-revised.txt, קובץ חסר. מחלקת Book + type לתת-מחלקה עם MainChar.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr">def wordp(s):
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
book = Dyn("t", "a", 1999)</pre>`,
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
<pre class="exam-code" dir="ltr">int x; printf("%p\\n", (void *)&amp;x);</pre>`,
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
        proposed: `<pre class="exam-code" dir="ltr">from dataclasses import dataclass
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
    conn.commit()</pre>
<p>השרת: recv, בדיקת אורך, אם במטמון קוראים קובץ, אחרת get_response, שומרים קובץ+רשומה. URL לא מודבק ל-SQL.</p>`,
        verdictKind: "new",
        verdict: "אין רשמי. ORDER BY ts + ? למחיקה ממלאים את סעיף ב' בלי הזרקה.",
      },
    ],
  },
  {
    id: "e-2026a",
    title: "סימולציה בסגנון 2026א",
    minutes: 180,
    pick: 3,
    note: "שחזור לפי מחברות. שאלה 9 לא שוחזרה.",
    partA: [
      {
        id: "a1",
        prompt: "פונקציה וירטואלית ב-C++ נקשרת:",
        options: [
          { id: "a", text: "רק בקומפילציה, תמיד של המצביע הסטטי." },
          { id: "b", text: "בזמן ריצה לפי טיפוס האובייקט (vtable)." },
          { id: "c", text: "רק בפייתון." },
          { id: "d", text: "רק עם SQL." },
        ],
        answer: "b",
      },
      {
        id: "a2",
        prompt: "פונקציה לא-וירטואלית דרך מצביע בסיס:",
        options: [
          { id: "a", text: "תמיד של הנגזר." },
          { id: "b", text: "של טיפוס המצביע (בסיס), גם אם האובייקט נגזר." },
          { id: "c", text: "שגיאת קישור." },
          { id: "d", text: "זה UDP." },
        ],
        answer: "b",
      },
      {
        id: "a3",
        prompt: "INSERT עם ? ב-SQLite:",
        options: [
          { id: "a", text: "הערך נשאר נתון." },
          { id: "b", text: "חובה שרשור." },
          { id: "c", text: "רק DDL." },
          { id: "d", text: "זה ASLR." },
        ],
        answer: "a",
      },
      {
        id: "a4",
        prompt: "צ'אנק 1024 בקבצים ברשת:",
        options: [
          { id: "a", text: "מגביל גודל send/recv לכל מקטע." },
          { id: "b", text: "זה IPv6 בלבד." },
          { id: "c", text: "זה eval." },
          { id: "d", text: "זה cohesion." },
        ],
        answer: "a",
      },
      {
        id: "a5",
        prompt: "כתיבה ל-vtable של אובייקט:",
        options: [
          { id: "a", text: "שוברת שלמות / פולימורפיזם — חולשה אם אפשרית." },
          { id: "b", text: "חובה בכל תוכנית." },
          { id: "c", text: "זה HTTPS." },
          { id: "d", text: "זה KISS." },
        ],
        answer: "a",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, ספר, וקובץ",
        prompt: "מילים עם pre באותיות גדולות; Book; מחלקה עם כמה סופרים; קובץ → רשימת אובייקטים.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr">class Book:
    def __init__(self, title, author, year):
        self.title, self.author, self.year = title, author, year
class BookMany:
    def __init__(self, title, authors, year):
        self.title, self.authors, self.year = title, list(authors), year
# קובץ: שורה שמתחילה ב-MANY| כותרת|שנה|סופר,סופר
def load(path):
    out = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            p = line.strip().split("|")
            if p[0] == "MANY":
                out.append(BookMany(p[1], p[3].split(","), p[2]))
            else:
                out.append(Book(p[0], p[1], p[2]))
    return out</pre>`,
        verdictKind: "new",
        verdict: "פורמט הקובץ לא פורט בשחזור — סימן MANY ממלא \"רגיל מול כמה סופרים\".",
      },
      {
        id: "q7",
        title: "שאלה 7 · פולימורפיזם וחולשה",
        prompt: "איך עובד מצביע וירטואלי ו-vtable; הבדל וירטואלי/לא; איזו חולשה אם אפשר לכתוב לטבלה.",
        hadOfficial: false,
        official: "",
        proposed: "<p>וירטואלי: אינדקס ב-vtable של האובייקט. לא-וירטואלי: לפי טיפוס המצביע בקומפילציה. כתיבה לטבלה מחליפה את הפונקציה שתופעל — שבירת שלמות. בלי PoC.</p>",
        verdictKind: "new",
        verdict: "אין רשמי.",
      },
      {
        id: "q8",
        title: "שאלה 8 · שליחה בחלקים ושורות ל־SQLite",
        prompt: "שרת Linux קורא קובץ ושולח מקטעים 1024 עם כותרת שם/מספר/גודל. תוכנית מעבירה שורות קובץ לטבלה (מספר + תוכן) כולל CREATE.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr">/* כותרת טקסטואלית פשוטה ואז send של 1024 */
char hdr[128];
snprintf(hdr, sizeof hdr, "%s %d %d\\n", name, idx, (int)n);
send(fd, hdr, strlen(hdr), 0);
send(fd, buf, n, 0);

import sqlite3
con = sqlite3.connect("out.db")
con.execute("CREATE TABLE IF NOT EXISTS lines(id INTEGER, body TEXT)")
with open("in.txt", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        con.execute("INSERT INTO lines VALUES(?, ?)", (i, line.rstrip("\\n")))
con.commit()</pre>`,
        verdictKind: "new",
        verdict: "אין רשמי. פרמטרים ב-INSERT.",
      },
      {
        id: "q9",
        title: "שאלה 9 · אין שחזור אמין",
        prompt: "במחברות הסעיף ריק.",
        hadOfficial: false,
        official: "",
        proposed: "<p>אין פתרון מוצע.</p>",
        verdictKind: "new",
        verdict: "אין שחזור לשאלה הזו.",
      },
    ],
  }
);
