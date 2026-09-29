window.EXAM_SIMS = [
  {
    id: "sample-a",
    title: "מבחן לדוגמה א'",
    minutes: 180,
    pick: 3,
    note: "מבוסס על מבחן לדוגמה של הקורס: לכידות, שקעים והצפנה.",
    partA: [
      {
        id: "a1",
        prompt: "מה מודדת לכידות (cohesion) במצגת יחידה 1?",
        options: [
          { id: "a", text: "עד כמה מתכנתים בצוות משתפים פעולה." },
          { id: "b", text: "עד כמה רכיבים במחלקות שונות קשורים." },
          { id: "c", text: "עד כמה רכיבים באותה מחלקה קשורים זה לזה." },
          { id: "d", text: "עד כמה רכיבים בתכניות שונות קשורים." },
        ],
        answer: "c",
      },
      {
        id: "a2",
        prompt: "העמסת פונקציה (overloading) ב-C++ היא:",
        options: [
          { id: "a", text: "אותו שם עם טיפוס חזרה שונה בלבד." },
          { id: "b", text: "אותו שם עם פרמטרים מטיפוסים/מספר שונה." },
          { id: "c", text: "טעינת פונקציה לערמה וקפיצה במצביע." },
          { id: "d", text: "מימוש פונקציה וירטואלית טהורה." },
        ],
        answer: "b",
      },
      {
        id: "a3",
        prompt: "הסתרת איברים במחלקה בפייתון — לפי הקורס:",
        options: [
          { id: "a", text: "מילת המפתח private." },
          { id: "b", text: "מילת המפתח protected." },
          { id: "c", text: "אין הסתרה אמיתית; __ הוא מוסכמה ולא מונע גישה." },
          { id: "d", text: "שני קווים תחתיים כופים הרשאה כמו C++." },
        ],
        answer: "c",
      },
      {
        id: "a4",
        prompt: "גלישת חוצץ יכולה להתרחש:",
        options: [
          { id: "a", text: "רק במחסנית." },
          { id: "b", text: "רק בערמה." },
          { id: "c", text: "רק באזור הקוד." },
          { id: "d", text: "בכל אזור שמצביע מצביע אליו, אם מעתיקים יותר ממה שהוקצה." },
        ],
        answer: "d",
      },
      {
        id: "a5",
        prompt: "חוטים (threads) באותו תהליך:",
        options: [
          { id: "a", text: "לכל אחד מרחב כתובות נפרד לגמרי." },
          { id: "b", text: "רגיסטרים ומחסנית לכל חוט; מרחב זיכרון משותף." },
          { id: "c", text: "עותק binary נפרד לכל חוט." },
          { id: "d", text: "חולקים גם את אותה מחסנית ואותם רגיסטרים." },
        ],
        answer: "b",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · לקוח TCP בלינוקס",
        prompt: "כתבו לקוח C/C++ שמתקמפל ב-gcc/g++ בלינוקס, מתחבר ל-119.4.7.5 פורט 8080, שולח שתי שורות (Good morning server / Nice to see you) ומדפיס תשובה עד 128 בתים או עד תו שורה — המוקדם.",
        hadOfficial: true,
        official: "בפתרון הרשמי: סוקט POSIX, וגם ניסיון Boost. מאקרו DEST בלי מרכאות, חסר # ב-include, וב-Boost יש שגיאות הקלדה (chart, bugger, buffer).",
        proposed: `<pre class="exam-code\" dir=\"ltr\">#include &lt;arpa/inet.h&gt;
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;unistd.h&gt;

int main(void) {
  int s = socket(AF_INET, SOCK_STREAM, 0);
  if (s &lt; 0) { perror("socket"); return 1; }
  struct sockaddr_in a;
  memset(&amp;a, 0, sizeof a);
  a.sin_family = AF_INET;
  a.sin_port = htons(8080);
  if (inet_pton(AF_INET, "119.4.7.5", &amp;a.sin_addr) != 1) {
    fprintf(stderr, "bad address\\n");
    return 1;
  }
  if (connect(s, (struct sockaddr *)&amp;a, sizeof a) &lt; 0) {
    perror("connect");
    return 1;
  }
  const char *m1 = "Good morning server\\n";
  const char *m2 = "Nice to see you\\n";
  if (send(s, m1, strlen(m1), 0) &lt; 0 || send(s, m2, strlen(m2), 0) &lt; 0) {
    perror("send");
    return 1;
  }
  char buf[129];
  memset(buf, 0, sizeof buf);
  ssize_t n = recv(s, buf, 128, 0);
  if (n &lt; 0) { perror("recv"); return 1; }
  for (ssize_t i = 0; i &lt; n; i++) {
    if (buf[i] == '\\n') { buf[i + 1] = 0; break; }
  }
  fputs(buf, stdout);
  close(s);
  return 0;
}</pre>`,
        verdictKind: "fix",
        verdict: "הרעיון בפתרון הרשמי נכון (לא Winsock). המאקרו DEST בלי מחרוזת לא יתקמפל; Boost שם שבור. הגרסה למעלה ממלאת את הדרישה: לינוקס, שתי הודעות, recv עד 128, חיתוך בשורה.",
      },
      {
        id: "q7",
        title: "שאלה 7 · מפתח ציבורי והיברידי",
        prompt: "א. תארו הצפנה במפתח ציבורי ואת בעיותיה. ב. תארו את הסכמה הנפוצה באינטרנט ואיך מועבר המפתח.",
        hadOfficial: true,
        official: "אסימטרי: זוג פומבי/פרטי; פומבי מצפין, פרטי מפענח. חסרונות: איטיות, ומפתח פומבי מזויף בנתיב (MITM). היברידי: מעבירים מפתח סימטרי בעזרת הפומבי ואז מצפינים בסימטרי.",
        proposed: "<p>אותו שלד כמו בפתרון הרשמי. חובה להוסיף: בלי <strong>אימות המפתח הפומבי</strong> (תעודה / סמכות סרטיפיקטים, יחידה 5) שלב העברת המפתח עצמו חשוף ל-MITM.</p>",
        verdictKind: "fix",
        verdict: "הפתרון הרשמי נכון ברמת המודל, וחסר את שכבת האימות שמלמד הקורס. לא טעות בפיזיקה של RSA/ECC — חסר CIA של זהות.",
      },
      {
        id: "q8",
        title: "שאלה 8 · פולימורפיזם וטבלה וירטואלית",
        prompt: "א. מהי פונקציה וירטואלית. ב. מהו vptr ואיפה הוא בזיכרון. ג. איך ממומש פולימורפיזם.",
        hadOfficial: true,
        official: "קישור בזמן ריצה דרך vtable; virtual. vptr בתחילת האובייקט, מתעדכן בבנאי. דריסה מחליפה מצביע בטבלה; הקריאה היא אינדקס בטבלה.",
        proposed: "<p>ההסבר הרשמי מספיק למבחן. באתר לא מתרגלים כתיבה ל-vtable כתקיפה — רק את המודל: מצביע בסיס, אובייקט נגזר, איזו פונקציה נבחרת.</p>",
        verdictKind: "ok",
        verdict: "נכון. הקטע שקורא דרך הטבלה ממחיש את הרעיון.",
      },
      {
        id: "q9",
        title: "שאלה 9 · מילון, משפט וזוגות לקובץ",
        prompt: "רשימת מילים: א. מילון אורך לכל מילה. ב. משפט עם אות גדולה במילה הראשונה ובכל מילה שמסתיימת ב-a (בלי שמות מילים בקוד). ג. names לזוגות בקובץ couples.txt, 4 שורות.",
        hadOfficial: true,
        official: "א. comprehension. ב. capitalize לפי endswith. ג. zip על המנה; open בלי מצב כתיבה.",
        proposed: `<pre class="exam-code\" dir=\"ltr\">my_length = {w: len(w) for w in mylist}

def cap_a(w):
    return w.capitalize() if w.endswith("a") else w
words = list(mylist)
words[0] = words[0].capitalize()
phrase = " ".join(cap_a(w) for w in words)

names = ("Tom", "Daniel", "Ofir", "Ofri", "Andrea", "Silvia", "Manuel", "Jessica")
pairs = list(zip(names[0::2], names[1::2]))
try:
    with open("couples.txt", "w", encoding="utf-8") as f:
        f.write("\\n".join(f"{a} - {b}\" for a, b in pairs))
except OSError:
    print("Error writing to file couples.txt")</pre>`,
        verdictKind: "fix",
        verdict: "א נכון (מילה כפולה ברשימה נדרסת במפתח). ב נכון לרעיון. ג בפתרון הרשמי: open בלי 'w' לא כותב; ובשאלון המקורי חסר גרש ב-Silvia. כאן open('w') ו-with.",
      },
    ],
  },
  {
    id: "sample-2021c",
    title: "בחינה לדוגמה · בסגנון 2021ג",
    minutes: 180,
    pick: 3,
    note: "מבוסס על בחינה לדוגמה: פולימורפיזם, htons, פייתון, SQLite, ASLR ו־DEP.",
    partA: [
      {
        id: "a1",
        prompt: "Base::f וירטואלית קוראת ל-g הלא-וירטואלית שקוראת ל-h הווירטואלית. Der דורסת g ו-h. b מצביע Base* לאובייקט Der. מה סדר ההדפסות של b->f() ואחר כך d->g()?",
        options: [
          { id: "a", text: "תמיד רק B:: בכל הקריאות." },
          { id: "b", text: "תמיד רק D:: בכל הקריאות." },
          { id: "c", text: "h תמיד D::h; g מתוך f ומתוך b היא B::g; רק d->g מדפיס D::g; f מדפיס B::f." },
          { id: "d", text: "g תמיד D::g כי האובייקט הוא Der." },
        ],
        answer: "c",
        hint: "<p><code>f()</code> וירטואלית ב־<code>Base</code>. <code>g()</code> <strong>אינה</strong> וירטואלית. <code>h()</code> וירטואלית. כשקוראים ל־<code>g()</code> מתוך <code>Base::f()</code>, לאיזו גרסה מגיעים?</p>",
        solution: `<ol>
<li><code>b-&gt;f()</code>: <code>f</code> וירטואלית ו־<code>Der</code> לא דורסת אותה, לכן <code>Base::f</code>. בתוכה <code>g()</code> אינה וירטואלית, לכן <code>Base::g</code>. בתוכה <code>h()</code> וירטואלית והאובייקט הוא <code>Der</code>, לכן <code>Der::h</code>. פלט: <code>D::h</code>, <code>B::g</code>, <code>B::f</code>.</li>
<li><code>d-&gt;g()</code>: <code>d</code> מסוג <code>Der*</code>, לכן <code>Der::g</code> (הסתרה). בתוכה <code>h()</code> נותנת <code>Der::h</code>. פלט: <code>D::h</code>, <code>D::g</code>.</li>
</ol>
<p>הכלל: קריאה לא־וירטואלית נקבעת לפי טיפוס המצביע; קריאה וירטואלית לפי טיפוס האובייקט בפועל.</p>`,
      },
      {
        id: "a2",
        prompt: "שדה protected ב-C++:",
        options: [
          { id: "a", text: "רק מתוך אותה מחלקה (כמו private)." },
          { id: "b", text: "מאותה מחלקה או מיורשת." },
          { id: "c", text: "רק ממחלקה חברה, בלי יורשות." },
          { id: "d", text: "רק באותו קובץ מקור." },
        ],
        answer: "b",
      },
      {
        id: "a3",
        prompt: "אילו מ-int / float / str / bool הם מילים שמורות בפייתון?",
        options: [
          { id: "a", text: "Int, float, char, str" },
          { id: "b", text: "int, float, str, bool כולם keywords." },
          { id: "c", text: "int, float, double, str" },
          { id: "d", text: "אף אחד מאלה אינו keyword — אלה builtins." },
        ],
        answer: "d",
      },
      {
        id: "a4",
        prompt: "העתקה by-reference עדיפה על by-value כי:",
        options: [
          { id: "a", text: "האובייקט מועתק מהר יותר תמיד." },
          { id: "b", text: "לא מועתק האובייקט, רק הפניה." },
          { id: "c", text: "אין מצביעים בשפה." },
          { id: "d", text: "היא אף פעם לא עדיפה." },
        ],
        answer: "b",
      },
      {
        id: "a5",
        prompt: "תפקיד htons על מספר פורט:",
        options: [
          { id: "a", text: "מוודאת שהשרת מכיר את הפורט." },
          { id: "b", text: "ממירה לסדר רשת (big-endian)." },
          { id: "c", text: "ממירה מחרוזת למספר." },
          { id: "d", text: "ממירה IPv4 ל-IPv6." },
        ],
        answer: "b",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, מחלקה וקובץ",
        prompt: "א. מילים שמסתיימות ב-ando בהדפסה באותיות קטנות. ב. University(name, location, students) ו-OpenUniversity עם מילון מקצועות. ג. קריאת קובץ עם בלוק courses: … done courses, סיכום מוסדות וסטודנטים, ומקצוע עם הכי הרבה קורסים לכל OpenU.",
        hadOfficial: true,
        official: "split + endswith; super().__init__; קורא שורות עם דגל openu. בקוד הרשמי: משתנה currnet_students כתוב שגוי בהצהרה, except גורף, ו-split לקורסים בלי strip.",
        proposed: `<pre class="exam-code\" dir=\"ltr\">def find_ando(text):
    for word in text.split():
        if word.endswith("ando"):
            print(word.lower(), end=" ")

class University:
    def __init__(self, name, location, students):
        self.name = name
        self.location = location
        self.students = int(students)

class OpenUniversity(University):
    def __init__(self, name, location, students, subjects):
        super().__init__(name, location, students)
        self.subjects = dict(subjects)

def read_univ_list(filename):
    unis = []
    try:
        lines = open(filename, encoding="utf-8").read().splitlines()
    except OSError:
        print("Could not read from file:", filename)
        return
    i = 0
    while i &lt; len(lines):
        line = lines[i].strip()
        if "courses:" in line:
            head, _ = line.split("courses:", 1)
            parts = [p.strip() for p in head.split(",")]
            subs = {}
            i += 1
            while i &lt; len(lines) and not lines[i].startswith("done courses"):
                name, n = [p.strip() for p in lines[i].split(",", 1)]
                subs[name] = int(n)
                i += 1
            unis.append(OpenUniversity(parts[0], parts[1], parts[2], subs))
        elif line:
            parts = [p.strip() for p in line.split(",")]
            unis.append(University(parts[0], parts[1], parts[2]))
        i += 1
    print("Number of universities:", len(unis))
    print("Total number of students", sum(u.students for u in unis))
    for u in unis:
        if isinstance(u, OpenUniversity) and u.subjects:
            maj = max(u.subjects, key=u.subjects.get)
            print("University", u.name, "max courses in", maj, "-", u.subjects[maj], "courses.")</pre>`,
        verdictKind: "fix",
        verdict: "המבנה הרשמי עונה על הדרישה. תיקנתי שם משתנה שבור, סגירת בלוק OpenU, ופיצול עמיד יותר לפסיקים. split() כבר מפצל גם שורות חדשות — מתאים לסעיף א.",
      },
      {
        id: "q7",
        title: "שאלה 7 · SQLite ב־C++ ובפייתון",
        prompt: "א. C/C++: פתיחת table.db, יצירת Students (Name, Id, School), שתי רשומות, סגירה. ב. פייתון: קלט חיפוש והדפסת School. ג. איזו חולשה ואיך מונעים.",
        hadOfficial: true,
        official: "sqlite3_exec עם מחרוזות קבועות; בפייתון execute(...format(קלט)) — זו הזרקה. \"התיקון\" הרשמי עדיין format לתוך SQL.",
        proposed: `<pre class="exam-code\" dir=\"ltr\">/* א. ערכים קבועים — exec סביר. נתיב יחסי, בדיקת rc. */
sqlite3 *db;
if (sqlite3_open("table.db", &amp;db) != SQLITE_OK) return 1;
sqlite3_exec(db,
  "CREATE TABLE IF NOT EXISTS Students(Name TEXT, Id INTEGER, School TEXT);",
  0, 0, 0);
sqlite3_exec(db,
  "INSERT INTO Students VALUES('Ada', 1, 'OpenU');", 0, 0, 0);
sqlite3_exec(db,
  "INSERT INTO Students VALUES('Mimi', 2, 'HUJI');", 0, 0, 0);
sqlite3_close(db);

# ב+ג. קלט = ערך, לא דקדוק SQL
import sqlite3
conn = sqlite3.connect("table.db")
name = input("name: ")
cur = conn.execute("SELECT School FROM Students WHERE Name = ?", (name,))
row = cur.fetchone()
print(row[0] if row else "not found")
conn.close()</pre>`,
        verdictKind: "fix",
        verdict: "סעיף א הרשמי ממלא יצירה והכנסה (נתיב Windows ו-#include חסרים). סעיף ב הרשמי נכשל בדרישה הדפנסיבית של הקורס: הקלט נכנס לדקדוק. סעיף ג מזהה הזרקה אבל הדוגמה עם format עדיין שבירה. הפרמטר ? הוא מה שמתאים ליחידה 7.",
      },
      {
        id: "q8",
        title: "שאלה 8 · ASLR ו־DEP",
        prompt: "לכל מנגנון: מטרה, פעולה, וקטע C/C++ שבו רואים את האפקט (בלי מטען תקיפה).",
        hadOfficial: true,
        official: "ASLR: כתובות אקראיות; מדפיסים &amp;main ומשתנה מקומי בהרצות חוזרות. DEP/NX: לא מריצים ממגזר נתונים.",
        proposed: `<p><strong>ASLR:</strong> מקשה על ניחוש כתובת מחסנית/קוד. קוד בחינה: להדפיס כתובת של פונקציה ושל משתנה מקומי בשתי הרצות — אם משתנה, ASLR פעיל.</p>
<pre class="exam-code\" dir=\"ltr\">#include &lt;stdio.h&gt;
int main(void) {
  int local = 0;
  printf("main %p local %p\\n", (void *)main, (void *)&amp;local);
}</pre>
<p><strong>DEP:</strong> דפים עם נתונים בלי הרשאת ביצוע. במבחן מספיק להסביר שקפיצה למערך תווים תיכשל אם NX דלוק. לא מביאים כאן מערך אופקודים.</p>`,
        verdictKind: "fix",
        verdict: "ההסברים הרשמיים נכונים. דוגמת ה-DEP הרשמית היא קפיצה לחוצץ עם פקודת מכונה — באתר מוחלפת בהסבר: מה נשבר (הרצה מנתונים) ואיך המנגנון חוסם, בלי מטען.",
      },
      {
        id: "q9",
        title: "שאלה 9 · העתקה לשני שדות",
        prompt: "שני מבני field עם f_data בגודל 24, strcpy מ-argv. א. החולשה ומה היא מאפשרת. ב. שלבים ברעיון (לא קוד תקיפה). ג. תיקון.",
        hadOfficial: true,
        official: "strcpy בלי גבול; אם ההקצאות צמודות אפשר לדרוס מצביע של הרשומה השנייה ואז לכתוב דרכו. תיקון: אורך לפני העתקה / strncpy + null.",
        proposed: `<p>א. <code>strcpy</code> לא יודע את FIELDSIZE. חריגה מ-f_data עלולה לדרוס זיכרון סמוך (כולל מצביע של רשומה אחרת אם המקצה שם אותם ברצף — ההנחה בשאלה). בנוסף: <code>argc != 2</code> ואז שימוש ב-argv[0] ו-argv[1] לא תואם "שני ערכי קלט" רגילים מ-main (שם התוכנית + ארגומנט).</p>
<p>ב. ברעיון: קלט ארוך מדי לשדה הראשון משנה מטא-נתונים או מצביע ליד, והקלט לשדה השני נכתב ליעד שנקבע כך.</p>
<p>ג. לבדוק אורך מול FIELDSIZE-1; <code>strncpy</code> + כתיבת <code>'\\0'</code> בסוף; או פונקציה שגוזרת אורך; בדיקת ההחזרה של malloc.</p>`,
        verdictKind: "ok",
        verdict: "אבחון החולשה והתיקון הרשמיים נכונים. לא מעתיקים לאתר את פירוט הניצול לפי בתים. שמו לב לבאג argc/argv בשאלה עצמה.",
        hint: "<p>מה קורה כשמחרוזת ארוכה מ־<code>FIELDSIZE</code> נכנסת ל־<code>r1-&gt;f_data</code>? אילו הקצאות יושבות על הערימה בצמוד לחוצץ הזה?</p>",
        solution: `<ul>
<li><strong>החולשה:</strong> <code>strcpy</code> לא בודק את אורך הקלט מול <code>FIELDSIZE</code>. זו גלישת ערימה (Heap Buffer Overflow).</li>
<li><strong>מה נשבר:</strong> ההקצאות עלולות לשבת ברצף — <code>r1</code>, החוצץ שלו, <code>r2</code>, החוצץ שלו. כתיבה עודפת לחוצץ של <code>r1</code> עלולה להגיע למבנה <code>r2</code> ולשנות את המצביע <code>f_data</code> שבו. ה־<code>strcpy</code> הבא כותב לאן שהמצביע המושחת מצביע — פגיעה בשלמות, בלי לגעת בכתובת חזרה.</li>
<li><strong>התיקון:</strong> לבדוק אורך מול <code>FIELDSIZE - 1</code>, או העתקה חסומה עם אפס סיום, ולבדוק את ההחזרה של <code>malloc</code>.</li>
</ul>
<pre class="exam-code" dir="ltr">strncpy(r1-&gt;f_data, argv[0], FIELDSIZE - 1);
r1-&gt;f_data[FIELDSIZE - 1] = '\\0';</pre>`,
      },
    ],
  },
];
