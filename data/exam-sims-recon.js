(window.EXAM_SIMS = window.EXAM_SIMS || []).push(
  {
    id: "e-2021a74",
    title: "סימולציה בסגנון 2021א-74",
    minutes: 180,
    pick: 3,
    note: "מהשאלון: אפחות, Frog, יהלום, מפרק לא וירטואלי, קנרית, לקוח וארגז חול. שתי שאלות מסומנות כתוספת לסימולציה כי לא שוחזרו.",
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
        hint: "<p>חשבו אם אפחות מסיר את עצם קיום החולשה בקוד, או שהוא מצמצם את הנגישות והנזק שהתוקף יכול לגרום.</p>",
        solution: "<p><strong>התשובה: ד'.</strong> אפחות אינו בהכרח תיקון שמבטל את החולשה מהשורש (כמו א'). היא הגנה היקפית או הנדסית — קנרית, ASLR, הרשאה מינימלית — שממזערת את הנזק בזמן תקיפה. ב' היא הגדרה של סודיות, ו־ג' היא ניצול.</p>",
      },
      {
        id: "a2",
        prompt: "Frog f1(5); Frog *p1 = &f1; בלי new. היכן נשמרים?",
        options: [
          { id: "a", text: "f1 במחסנית, p1 בערמה." },
          { id: "b", text: "שניהם בערמה." },
          { id: "c", text: "שניהם במחסנית." },
          { id: "d", text: "p1 במחסנית, f1 בערמה." },
        ],
        answer: "c",
      },
      {
        id: "a3",
        prompt: "Messenger יורש מ-Sender ומ-Receiver, ושניהם יורשים מ-Thread. m.run() לא מתקמפל. למה?",
        options: [
          { id: "a", text: "בגלל ירושה מרובה לבדה." },
          { id: "b", text: "בגלל בעיית המשולש." },
          { id: "c", text: "בגלל בעיית היהלום: שני עותקים של Thread." },
          { id: "d", text: "הקוד כן מתקמפל." },
        ],
        answer: "c",
      },
      {
        id: "a4",
        prompt: "Foo* f = new Bar(100); והמפרק של Foo אינו וירטואלי. delete f. מה זולג?",
        options: [
          { id: "a", text: "buffer1 של Foo." },
          { id: "b", text: "buffer2 של Bar. מפרק הבן לא רץ." },
          { id: "c", text: "שני החוצצים." },
          { id: "d", text: "אין זליגה." },
        ],
        answer: "b",
      },
      {
        id: "a5",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. שכבת הייצוג ב-OSI אחראית בעיקר ל:",
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
        title: "שאלה 6 · לא מהמועד",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. פיצול מחרוזת והדפסת מילים שמתחילות ב-pre באותיות גדולות, ומחלקת Book.",
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
        title: "שאלה 7 · קנרית המחסנית",
        prompt: "מהשאלון (שם זו שאלה 5): הבעיה שהובילה לקנרית, אופן הפעולה, מבנה המחסנית עם ובלי הקנרית, וחלופה.",
        hadOfficial: false,
        official: "",
        proposed: "<p>העתקה בלי גבול מגיעה לכתובת החזרה. ערך סודי נשתל לפניה ונבדק לפני ret. בלי קנרית: מקומיים, מסגרת שמורה, כתובת חזרה. עם קנרית: מקומיים, קנרית, מסגרת, כתובת חזרה. חלופה: ASLR או NX/DEP. הקנרית לא מתקנת את ההעתקה.</p>",
        verdictKind: "new",
        verdict: "זו שאלת הקנרית מהשאלון, לא שאלת שלוש האפחות הגנרית.",
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
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. שאלת ההפניות בחלק א לא שוחזרה בניסוח שאפשר לסמוך עליו. bind לכתובת IP נקובה בשרת (לא INADDR_ANY):",
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
    note: "שאלות 6–9 מהשחזור. חמש האמריקאיות אינן מהמועד: גוף חלק א לא היה במחברות, רק מפתח.",
    partA: [
      {
        id: "a1",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. ASLR נועד בעיקר:",
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
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. שאילתה פרמטרית:",
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
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. type(name, bases, dict) בפייתון:",
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
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. DDoS פוגע בעיקר ב:",
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
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. vtable בפולימורפיזם:",
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
    note: "שאלות 6–8 מהשחזור. שאלה 9 לא שוחזרה. חמש האמריקאיות אינן מהמועד: לא היה טקסט שאלות.",
    partA: [
      {
        id: "a1",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. פונקציה וירטואלית ב-C++ נקשרת:",
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
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. פונקציה לא-וירטואלית דרך מצביע בסיס:",
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
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. INSERT עם ? ב-SQLite:",
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
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. צ'אנק 1024 בקבצים ברשת:",
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
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. כתיבה ל-vtable של אובייקט:",
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
        hint: "<p>חשבו איפה נשמר <code>vptr</code> בתוך האובייקט, לאן הוא מצביע, ומה קורה בזמן ריצה כשקוראים לפונקציה וירטואלית דרך מצביע לבסיס.</p>",
        solution: `<ul>
<li>לכל מחלקה עם פונקציה וירטואלית המהדר בונה <code>vtable</code> אחת, משותפת לכל המופעים. בכל אובייקט יש <code>vptr</code> — במודל הקורס בהיסט 0 — שמצביע לטבלה של המחלקה האמיתית.</li>
<li>קריאה וירטואלית היא בערך <code>obj-&gt;vptr[index]()</code>, ולכן נקבעת בזמן ריצה. בלי <code>virtual</code> הקריאה נקבעת בקומפילציה לפי טיפוס המצביע.</li>
<li>אם כתיבה מעבר לחוצץ או שימוש אחרי שחרור משחיתים את <code>vptr</code>, הקריאה הבאה הולכת למה שנשאר בזיכרון. הטבלה עצמה לרוב לקריאה בלבד; ה־<code>vptr</code> באובייקט בערימה הוא הנתון הפגיע.</li>
<li>הגנה: גבול כתיבה ובעלות ברורה (<code>std::string</code>, <code>unique_ptr</code>); שכבות — ASLR ו־CFI. <code>private</code> וקנרית המחסנית לא שומרים על <code>vptr</code> בערימה.</li>
</ul>`,
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
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · Book, מילון, וחריגה",
        prompt: "Book עם מחרוזות (שם, מחבר, שפה) ומספרים (קטלוג, מחיר, שנה) ובדיקת טיפוסים. מילון books לפי קטלוג. BookDataError. Buy לפי שם+מחבר או קטלוג.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr">class BookDataError(Exception):
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
    raise BookDataError("no match")</pre>`,
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
<pre class="exam-code" dir="ltr">#include &lt;arpa/inet.h&gt;
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
}</pre>`,
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
          { id: "a", text: "כל כתיבה למחסנית." },
          { id: "b", text: "גלישת חוצץ עצמה." },
          { id: "c", text: "SQL." },
          { id: "d", text: "הרצת קוד מאזור שמיועד לנתונים." },
        ],
        answer: "d",
      },
      {
        id: "a2",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. בזיכרון יש תיאור של קריאה מבנאי, בלי השאלה עצמה. קריאה וירטואלית מתוך בנאי הבסיס, כשהנגזר דורס אותה, מגיעה ל:",
        options: [
          { id: "a", text: "מימוש הבסיס. בזמן בניית הבסיס האובייקט עדיין בסיס." },
          { id: "b", text: "תמיד לנגזר, כי new יצר נגזר." },
          { id: "c", text: "שגיאת קומפילציה." },
          { id: "d", text: "שתי הגרסאות." },
        ],
        answer: "a",
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
      },
      {
        id: "a4",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. אפשרויות ההפניה בזיכרון סומנו כלא מדויקות. הפניה (reference) ב-C++ למחרוזת קיימת s1 נכתבת:",
        options: [
          { id: "a", text: "std::string a = s1; זו העתקה." },
          { id: "b", text: "std::string &a = s1;" },
          { id: "c", text: "std::string *a = &s1; זה מצביע." },
          { id: "d", text: "std::string &a = &s1; לא מתקמפל." },
        ],
        answer: "b",
      },
      {
        id: "a5",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. משפט האפחות בזיכרון לא שלם. אפחות (Mitigation) היא:",
        options: [
          { id: "a", text: "מערכת בלי באגים." },
          { id: "b", text: "רק הצפנת הערוץ." },
          { id: "c", text: "הגנה שמזערה נזק מתקיפה, למשל זיהוי בקשות חריגות בזמן עומס." },
          { id: "d", text: "התקיפה עצמה." },
        ],
        answer: "c",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · im, קובץ, ו-HPBook",
        prompt: "מילים מופרדות בפסיק שמתחילות ב-im: אות ראשונה גדולה והשאר קטנות. קובץ שורה-שורה לקובץ אחר. Book ו-HPBook; בלי ארגומנטים mainChar הוא harry, hermione, Ron.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr">def im_words(s):
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
        self.mainChar = ["harry", "hermione", "Ron"] if mainChar is None else mainChar</pre>`,
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
        proposed: `<pre class="exam-code" dir="ltr">import socket, struct
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
        s.close()</pre>
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
          { id: "d", text: "רק יעילות של הצוות." },
        ],
        answer: "b",
      },
      {
        id: "a2",
        prompt: "איזו זוג חתימות היא העמסה (overloading) ב-C++?",
        options: [
          { id: "a", text: "void f(int) ו-int f(int). רק טיפוס החזרה שונה." },
          { id: "b", text: "void f(int) ו-void f(double)." },
          { id: "c", text: "שתי הגדרות void f(int) באותו תחום." },
          { id: "d", text: "פונקציה וירטואלית בלי מימוש." },
        ],
        answer: "b",
      },
      {
        id: "a3",
        prompt: "בפייתון, obj._Point__x אחרי שדה בשם __x:",
        options: [
          { id: "a", text: "שגיאת קומפילציה כמו private ב-C++." },
          { id: "b", text: "הגישה נחסמת בזמן ריצה." },
          { id: "c", text: "אפשר עדיין לקרוא. שני קווים תחתיים הם מוסכמה ושינוי שם, לא הרשאה." },
          { id: "d", text: "זה protected של C++." },
        ],
        answer: "c",
      },
      {
        id: "a4",
        prompt: "גלישת חוצץ (Buffer Overflow) יכולה להתרחש:",
        options: [
          { id: "a", text: "רק במחסנית, ליד כתובת חזרה." },
          { id: "b", text: "רק בערימה." },
          { id: "c", text: "רק בקוד." },
          { id: "d", text: "בכל אזור שאליו כותבים מעבר לגודל שהוקצה." },
        ],
        answer: "d",
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
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · לקוח TCP",
        prompt: "כתבו לקוח C/C++ ללינוקס שמתחבר ל-10.1.2.3 בפורט 9000, שולח את השורה PING ואז קורא עד 64 בתים או עד תו שורה, המוקדם, ומדפיס.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr">#include &lt;arpa/inet.h&gt;
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
}</pre>`,
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
        proposed: `<pre class="exam-code" dir="ltr">lengths = {w: len(w) for w in words}
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
    print("Error writing to file pairs.txt")</pre>`,
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
      },
      {
        id: "a2",
        prompt: "שדה protected ב-C++ נגיש:",
        options: [
          { id: "a", text: "רק מאותה מחלקה." },
          { id: "b", text: "מהמחלקה ומיורשת, לא מקוד חיצוני רגיל." },
          { id: "c", text: "מכל קובץ באותה תיקייה." },
          { id: "d", text: "רק ממחלקה חברה, בלי יורשות." },
        ],
        answer: "b",
      },
      {
        id: "a3",
        prompt: "int, float, str, bool בפייתון הם:",
        options: [
          { id: "a", text: "כולם מילים שמורות." },
          { id: "b", text: "טיפוסים מובנים (builtins), לא keywords." },
          { id: "c", text: "מילים שמורות רק בפייתון 2." },
          { id: "d", text: "שקולים ל-private." },
        ],
        answer: "b",
      },
      {
        id: "a4",
        prompt: "העברה לפי הפניה (reference) עדיפה על העברה לפי ערך כי:",
        options: [
          { id: "a", text: "תמיד מעתיקים מהר יותר." },
          { id: "b", text: "לא נוצר עותק של האובייקט, והזהות שלו נשמרת." },
          { id: "c", text: "אין מצביעים בשפה." },
          { id: "d", text: "היא אף פעם לא עדיפה." },
        ],
        answer: "b",
      },
      {
        id: "a5",
        prompt: "htons על מספר פורט:",
        options: [
          { id: "a", text: "בודקת שהשרת מאזין." },
          { id: "b", text: "ממירה לסדר בתים של הרשת (big-endian)." },
          { id: "c", text: "הופכת מחרוזת למספר." },
          { id: "d", text: "מחליפה IPv4 ב-IPv6." },
        ],
        answer: "b",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, מחלקה וקובץ",
        prompt: "הדפיסו מילים שמסתיימות ב-ly באותיות קטנות. מחלקת Lab(name, city, seats) ותת-מחלקה RemoteLab עם מילון כלים. קראו שורות name,city,seats מקובץ והדפיסו כמה מעבדות וכמה מקומות יחד.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr">def ly_words(text):
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
    print("Total seats", sum(x.seats for x in labs))</pre>`,
        verdictKind: "new",
        verdict: "אותו שלד כמו שאלה 6 בבחינה לדוגמה 2021ג: סינון מילה, ירושה, וקובץ עם טיפול בשגיאה.",
      },
      {
        id: "q7",
        title: "שאלה 7 · SQLite",
        prompt: "ב-C/C++ פתחו grades.db, צרו Grades(Name, Id, Score), הכניסו שתי רשומות קבועות וסגרו. בפייתון קבלו מזהה והדפיסו ציון. מה נשבר אם מדביקים את המזהה למחרוזת, ואיך נמנעים.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="exam-code" dir="ltr">sqlite3 *db;
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
conn.close()</pre>
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
<pre class="exam-code" dir="ltr">int local = 0;
printf("%p\\n", (void *)&amp;local);</pre>
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
  }
);
