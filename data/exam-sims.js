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
        fromAsset: true,
        answerFromAsset: true,
        prompt: "מה מודדת לכידות (cohesion)?",
        options: [
          { id: "a", text: "עד כמה מתכנתים בצוות עובדים בשיתוף פעולה." },
          { id: "b", text: "עד כמה רכיבים במחלקות שונות קשורים זה לזה." },
          { id: "c", text: "עד כמה רכיבים באותה מחלקה קשורים זה לזה." },
          { id: "d", text: "עד כמה רכיבים בתכניות שונות קשורים זה לזה." },
        ],
        answer: "c",
        solution: "<p><strong>התשובה: ג'.</strong> על פי מצגת יחידה 1: לכידות (Cohesion) מודדת את מידת הקשר והתאימות בין הפונקציות והמשתנים בתוך אותה מחלקה, ומבטאת את עקרון האחריות היחידה (Single Responsibility Principle).</p><p><strong>למה המסיחים שגויים?</strong></p><ul><li>• <strong>א' שגויה:</strong> שיתוף פעולה של צוות פיתוח הוא מדד ארגוני ולא מושג הנדסי במבנה הקוד.</li><li>• <strong>ב' שגויה:</strong> מידת הקשר והתלות בין מחלקות שונות מוגדרת כצמידות (Coupling), ולא כלכידות.</li><li>• <strong>ד' שגויה:</strong> קשר בין תוכניות שונות שייך לתקשורת בין-תהליכית (IPC) ולא ללכידות מודולרית פנימית.</li></ul>",
      },
      {
        id: "a2",
        fromAsset: true,
        answerFromAsset: true,
        prompt: "מהו מנגנון העמסת פונקציה (overloading)?",
        options: [
          { id: "a", text: "הגדרה של מספר פונקציות בעלות אותו שם אך עם טיפוס חזרה שונה." },
          { id: "b", text: "הגדרה של מספר פונקציות בעלות אותו שם אך עם פרמטרים מטיפוסים שונים." },
          { id: "c", text: "טעינת פונקציה לזיכרון הערמה וקפיצה אליה באמצעות מצביע." },
          { id: "d", text: "מימוש של פונקציה וירטואלית טהורה." },
        ],
        answer: "b",
        solution: "<p><strong>התשובה: ב'.</strong> על פי יחידה 2: העמסת פונקציה (Function Overloading) מאפשרת להגדיר באותו Scope פונקציות בעלות אותו שם הנבדלות בכמות או בטיפוסי הפרמטרים שלהן.</p><p><strong>למה המסיחים שגויים?</strong></p><ul><li>• <strong>א' שגויה:</strong> שוני בטיפוס החזרה בלבד אינו מאפשר העמסה ב-C++ וגורר שגיאת קומפילציה.</li><li>• <strong>ג' שגויה:</strong> טעינה לערימה וקפיצה עקיפה שייכת למצביעי פונקציה ולא להעמסה סטטית בקומפילציה.</li><li>• <strong>ד' שגויה:</strong> פונקציה וירטואלית טהורה שייכת לפולימורפיזם דינמי ומחלקות מופשטות (דריסה - Overriding), ולא להעמסה.</li></ul>",
      },
      {
        id: "a3",
        fromAsset: true,
        answerFromAsset: true,
        prompt: "כיצד ניתן להסתיר איברים ושיטות במחלקה בפייתון?",
        options: [
          { id: "a", text: "באמצעות מילת המפתח private." },
          { id: "b", text: "באמצעות מילת המפתח protected." },
          { id: "c", text: "לא ניתן להסתיר בפייתון." },
          { id: "d", text: "באמצעות הוספת פעמיים קו תחתי." },
        ],
        answer: "c",
        solution: "<p><strong>התשובה: ג'.</strong> בפייתון אין מנגנון הגבלת גישה מוחלט ברמת השפה כמו ב-C++, ולכן לא ניתן להסתיר איברים לחלוטין.</p><p><strong>למה המסיחים שגויים?</strong></p><ul><li>• <strong>א' וב' שגויות:</strong> מילות המפתח private ו-protected כלל אינן קיימות בתחביר פייתון.</li><li>• <strong>ד' שגויה:</strong> הוספת שני קווים תחתיים (כגון __x) אינה מסתירה את השדה, אלא רק מפעילה שינוי שם פנימי (Name Mangling) ל-_ClassName__x; השדה עדיין נגיש וניתן לקריאה וכתיבה ישירה.</li></ul>",
      },
      {
        id: "a4",
        fromAsset: true,
        answerFromAsset: true,
        prompt: "גלישת חוצץ יכולה להתרחש:",
        options: [
          { id: "a", text: "באזור המחסנית." },
          { id: "b", text: "באזור הערמה." },
          { id: "c", text: "באזור קוד הריצה של התכניות." },
          { id: "d", text: "בכל אזור שניתן להצביע אליו עם מצביע, כשמעתיקים אליו יותר בתים מגודל הזיכרון שהוקצה." },
        ],
        answer: "d",
        solution: "<p><strong>התשובה: ד'.</strong> גלישת חוצץ (Buffer Overflow) מתרחשת בכל מקום שבו נכתבים נתונים מעבר לגודל שהוקצה עבורם דרך מצביע, ללא תלות במקטע הזיכרון.</p><p><strong>למה המסיחים שגויים?</strong></p><ul><li>• <strong>א' שגויה:</strong> גלישת מחסנית (Stack Overflow) היא מקרה נפוץ, אך הגלישה אינה מוגבלת למחסנית בלבד.</li><li>• <strong>ב' שגויה:</strong> גלישת ערימה (Heap Overflow) מתרחשת לעיתים קרובות בהקצאות malloc/new, אך גם היא אינה המקום היחיד.</li><li>• <strong>ג' שגויה:</strong> קוד התוכנית (.text) מסומן לרוב כ-Read-Only; הגלישה מתרחשת במקטעי נתונים ופוגעת במצביעים או בקרת זרימה.</li></ul>",
      },
      {
        id: "a5",
        fromAsset: true,
        answerFromAsset: true,
        prompt: "חוטים (threads) בתכנית:",
        options: [
          { id: "a", text: "לכל אחד אזור ריצה משלו ומרחב זיכרון משלו." },
          { id: "b", text: "לכל אחד רגיסטרים משלו, אבל מרחב זיכרון משותף." },
          { id: "c", text: "לכל אחד עותק משלו של קוד התכנית (binary) ואזור זיכרון נפרד." },
          { id: "d", text: "חולקים את אותו מרחב זיכרון, אותה מחסנית ואותם ערכי רגיסטרים." },
        ],
        answer: "b",
        solution: "<p><strong>התשובה: ב'.</strong> חוטים (Threads) השייכים לאותו תהליך חולקים את אותו מרחב כתובות וירטואלי (כולל מקטע הקוד, משתנים גלובליים, ערימה וקבצים פתוחים), אך לכל חוט יש מחסנית עצמאית וסט רגיסטרים פרטי משלו.</p><p><strong>למה המסיחים שגויים?</strong></p><ul><li>• <strong>א' שגויה:</strong> מרחב זיכרון נפרד ומבודד קיים בין תהליכים (Processes) שונים, ולא בין חוטים באותו תהליך.</li><li>• <strong>ג' שגויה:</strong> כל החוטים חולקים עותק יחיד של קוד התוכנית (.text).</li><li>• <strong>ד' שגויה:</strong> לכל חוט חייבת להיות מחסנית משלו ורגיסטרים משלו כדי לנהל קריאות לפונקציות ומשתנים מקומיים עצמאיים.</li></ul>",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · לקוח TCP בלינוקס",
        fromAsset: true,
        prompt: "כתבו קוד ב-C או ב-C++ שיפתח לקוח תקשורת אל שרת בכתובת 119.4.7.5 בפורט 8080, וישלח לו את השורות:\nGood morning server\nNice to see you\nלאחר מכן ידפיס את התשובה עד 128 בתים או עד סימן סוף שורה, הראשון מביניהם.\nמותר להשתמש בספריות שנלמדו בקורס. הקוד צריך להתקמפל ב-gcc או ב-g++ בלינוקס.",
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
        fromAsset: true,
        answerFromAsset: true,
        prompt: "א. תארו את מנגנון ההצפנה המבוסס על מפתח ציבורי. אילו בעיות יש במנגנון זה?\nב. תארו את סכמת ההצפנה הנפוצה כיום באינטרנט, וכיצד מועבר המפתח.",
        hadOfficial: true,
        official: "אסימטרי: זוג פומבי/פרטי; פומבי מצפין, פרטי מפענח. חסרונות: איטיות, ומפתח פומבי מזויף בנתיב (MITM). היברידי: מעבירים מפתח סימטרי בעזרת הפומבי ואז מצפינים בסימטרי.",
        proposed: "<p>א. הצפנה במפתח ציבורי היא הצפנה א-סימטרית: מפתח ההצפנה שונה ממפתח הפענוח. המקבל מייצר זוג: מפתח ציבורי ומפתח פרטי שנשמר בסוד. את המפתח הציבורי אפשר להעביר לשולח גם בערוץ לא סודי. השולח מצפין בו, והמקבל מפענח במפתח הפרטי.</p><p>התהליך מגן מפני מי שרק קולט את התשדורת. הוא לא מגן מפני מי שיכול לשבש את הערוץ ולהחליף את המפתח הציבורי במפתח של פולש. חסרון נוסף: הסיבוכיות גבוהה, ולכן משתמשים במפתח ציבורי בעיקר להעברת מסרים קצרים, כמו מפתח סימטרי.</p><p>ב. צד ב יוצר זוג מפתחות א-סימטרי ושולח את הפומבי לצד א. צד א יוצר מפתח סימטרי, מצפין אותו בפומבי ושולח. צד ב מפענח בפרטי. אחר כך שני הצדדים מדברים בהצפנה סימטרית.</p>",
        verdictKind: "fix",
        verdict: "הפתרון הרשמי נכון ברמת המודל, וחסר את שכבת האימות שמלמד הקורס. לא טעות בפיזיקה של RSA/ECC — חסר CIA של זהות.",
      },
      {
        id: "q8",
        title: "שאלה 8 · פולימורפיזם וטבלה וירטואלית",
        fromAsset: true,
        answerFromAsset: true,
        prompt: "פולימורפיזם ב-C++:\nא. מהי פונקציה וירטואלית?\nב. מהו ה-vptr ואיפה הוא מוחזק בזיכרון?\nג. תארו איך ממומש מנגנון הפולימורפיזם.",
        hadOfficial: true,
        official: "קישור בזמן ריצה דרך vtable; virtual. vptr בתחילת האובייקט, מתעדכן בבנאי. דריסה מחליפה מצביע בטבלה; הקריאה היא אינדקס בטבלה.",
        proposed: "<p>א. פונקציה וירטואלית מקושרת לקוד בזמן ריצה דרך טבלת פונקציות (vtable). מצהירים עליה במילה virtual.</p><p>ב. vptr הוא מצביע לטבלה הווירטואלית של המחלקה. במודל הקורס הוא יושב בתחילת מופע המחלקה, כמשתנה נסתר, וערכו מתעדכן ביצירת האובייקט.</p><p>ג. הטבלה מחזיקה מצביעים לפונקציות הווירטואליות. בדריסה, המצביע בטבלה של המחלקה היורשת מוחלף. קריאה וירטואלית היא קריאה דרך המצביע בהיסט המתאים בטבלה, לא לפי טיפוס המצביע הסטטי.</p>",
        verdictKind: "ok",
        verdict: "נכון. הקטע שקורא דרך הטבלה ממחיש את הרעיון.",
      },
      {
        id: "q9",
        title: "שאלה 9 · מילון, משפט וזוגות לקובץ",
        fromAsset: true,
        prompt: "נתונה רשימת מילים בפייתון:\neverybody, in, this, group, should, be, able, to, dance, salsa, but, only, some, can, dance, bachata.\nא. צרו מילון my_length: המפתח הוא המילה, הערך הוא מספר התווים בה.\nב. תרגמו את הרשימה למשפט phrase. האות הראשונה של המילה הראשונה, ושל כל מילה שמסתיימת ב-a, צריכה להיות גדולה. אסור להשתמש בקוד בשמות המילים מהרשימה.\nג. names = (Tom, Daniel, Ofir, Ofri, Andrea, Silvia, Manuel, Jessica). חלקו לזוגות וכתבו קובץ couples.txt עם 4 שורות, זוג בכל שורה.",
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
        fromAsset: true,
        answerFromAsset: true,
        prompt: "מה ידפיס קטע הקוד הבא ב-C++?",
        code: "class Base {\npublic:\n    virtual void f() { g(); cout << \"B::f\" << endl; }\n    void g() { h(); cout << \"B::g\" << endl; }\n    virtual void h() { cout << \"B::h\" << endl; }\n};\nclass Der : public Base {\npublic:\n    void g() { h(); cout << \"D::g\" << endl; }\n    void h() { cout << \"D::h\" << endl; }\n};\nint main() {\n    Base* b;\n    Der* d = new Der();\n    b = d;\n    b->f();\n    cout << \"---\" << endl;\n    d->f();\n    cout << \"---\" << endl;\n    b->g();\n    cout << \"---\" << endl;\n    d->g();\n    return 0;\n}",
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
<p>הכלל: קריאה לא־וירטואלית נקבעת לפי טיפוס המצביע; קריאה וירטואלית לפי טיפוס האובייקט בפועל.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li>• <strong>הטענה שמופעל רק B:: בכל הקריאות שגויה:</strong> הפונקציה h היא וירטואלית ולכן תמיד מנותבת למימוש הנגזר (Der::h) בזמן ריצה כשהאובייקט הוא Der.</li>
<li>• <strong>הטענה שמופעל רק D:: בכל הקריאות שגויה:</strong> הפונקציה g אינה וירטואלית, ולכן קריאה דרך מצביע Base* או מתוך Base::f מנותבת בקומפילציה ל-Base::g בלבד.</li>
<li>• <strong>הטענה ש-g היא תמיד D::g שגויה:</strong> ללא virtual אין קישור דינמי עבור g; מתרחשת הסתרה (Hiding) ולא דריסה (Overriding), כך ש-Base* אינו מודע לקיומה של Der::g.</li>
</ul>`,
      },
      {
        id: "a2",
        fromAsset: true,
        answerFromAsset: true,
        prompt: "מה המשמעות של שדה מוגן (protected) במחלקה ב-C++?",
        options: [
          { id: "a", text: "שדה שאפשר לגשת אליו רק מתוך קוד אותה מחלקה." },
          { id: "b", text: "שדה שאפשר לגשת אליו רק ממחלקה זו או ממחלקה יורשת." },
          { id: "c", text: "שדה שאפשר לגשת אליו רק ממחלקה זו או ממחלקה חברה." },
          { id: "d", text: "שדה שאפשר לגשת אליו רק באותו קובץ שבו הוא מוגדר." },
        ],
        answer: "b",
        solution: "<p><strong>התשובה: ב'.</strong> על פי יחידה 2: שדה protected נגיש מתוך קוד המחלקה עצמה, מתוך מחלקות יורשות (Derived Classes), ומתוך פונקציות/מחלקות שהוגדרו כ-friend. גישה מקוד חיצוני שאינו יורש חסומה.</p><p><strong>למה המסיחים שגויים?</strong></p><ul><li>• <strong>א' שגויה:</strong> גישה רק מתוך אותה מחלקה היא רמת הגישה של private.</li><li>• <strong>ג' שגויה:</strong> האפשרות משמיטה מחלקות יורשות, שהן המטרה המרכזית לשמה נועד protected.</li><li>• <strong>ד' שגויה:</strong> גבול הגישה ב-C++ הוא ברמת ה-Class Scope ולא ברמת קובץ המקור (Translation Unit).</li></ul>",
      },
      {
        id: "a3",
        fromAsset: true,
        answerFromAsset: true,
        prompt: "אילו טיפוסי משתנים הם מילים שמורות (reserved keywords) בפייתון?",
        options: [
          { id: "a", text: "Int, float, char, str" },
          { id: "b", text: "int, float, str, bool" },
          { id: "c", text: "int, float, double, str" },
          { id: "d", text: "אף אחד מאלה אינו מילה שמורה." },
        ],
        answer: "d",
        solution: "<p><strong>התשובה: ד'.</strong> בפייתון, int, float, str, bool אינן מילים שמורות (Reserved Keywords) אלא טיפוסים מובנים (Built-in Types). שמות מובנים יושבים במודול builtins__ ואינם מופיעים ברשימת keyword.kwlist.</p><p><strong>למה המסיחים שגויים?</strong></p><ul><li>• <strong>א', ב', ג' שגויות:</strong> בפייתון אין מילים שמורות עבור טיפוסים; השפה דינמית ומשתנים אינם מוצהרים עם טיפוס בעת הגדרתם. בנוסף, char ו-double כלל אינם קיימים בפייתון.</li></ul>",
      },
      {
        id: "a4",
        fromAsset: true,
        answerFromAsset: true,
        prompt: "במה העתקה by-reference עדיפה על פני העתקה by-value?",
        options: [
          { id: "a", text: "האובייקט מועתק מהר יותר." },
          { id: "b", text: "האובייקט עצמו לא מועתק, אלא רק ההפניה אליו." },
          { id: "c", text: "אין צורך להתעסק עם מצביעים." },
          { id: "d", text: "העתקה כזו אינה עדיפה." },
        ],
        answer: "b",
        solution: "<p><strong>התשובה: ב'.</strong> בהעברה לפי הפניה (by-reference), לא נוצר עותק של האובייקט בזיכרון, אלא מועבר כינוי (Alias) או כתובת לאובייקט הקיים. הדבר חוסך זמן הקצאה, מונע קריאות לבנאי העתקה ומפרקים, ומונע חיתוך אובייקט (Object Slicing).</p><p><strong>למה המסיחים שגויים?</strong></p><ul><li>• <strong>א' שגויה:</strong> האובייקט כלל אינו מועתק; העברת הפניה אינה העתקה מהירה של האובייקט אלא הימנעות מוחלטת מהעתקתו.</li><li>• <strong>ג' שגויה:</strong> הפניה היא מימוש תחבירי מעל מצביע קבוע; היתרון המרכזי הוא ביצועים, מניעת שכפול ושימור זהות פולימורפית.</li><li>• <strong>ד' שגויה:</strong> עבור טיפוסים שאינם פרימיטיביים, העברה בהפניה לקריאה (const T&) היא המוסכמה המובילה ב-C++.</li></ul>",
      },
      {
        id: "a5",
        fromAsset: true,
        answerFromAsset: true,
        prompt: "בקטע שיוצר שקע TCP, מה תפקיד htons(PORT) לפני connect?",
        options: [
          { id: "a", text: "מוודאת שהשרת מכיר את מספר הפורט המבוקש." },
          { id: "b", text: "ממירה בין Little-Endian ל-Big-Endian." },
          { id: "c", text: "ממירה בין מחרוזת לערך מספרי." },
          { id: "d", text: "ממירה חבילה בין IPv4 ל-IPv6." },
        ],
        answer: "b",
        solution: "<p><strong>התשובה: ב'.</strong> הפונקציה htons (Host to Network Short) ממירה את מספר הפורט (מספר בן 16 סיביות) מסדר הבתים של המחשב המארח (Little-Endian ב-x86) לסדר הבתים של הרשת (Big-Endian).</p><p><strong>למה המסיחים שגויים?</strong></p><ul><li>• <strong>א' שגויה:</strong> htons אינה מתקשרת ברשת ואינה בודקת זמינות שרת.</li><li>• <strong>ג' שגויה:</strong> המרת מחרוזת למספר נעשית ע\"י atoi/strtol ולא ע\"י htons.</li><li>• <strong>ד' שגויה:</strong> htons אינה ממירה חבילות ואינה קשורה להבדלים בין גרסאות פרוטוקול ה-IP.</li></ul>",
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, מחלקה וקובץ",
        fromAsset: true,
        prompt: "כתבו בפייתון:\nא. פונקציה שמקבלת מחרוזת. המילים מופרדות ברווחים או בסימני שורה חדשה. זהו כל מילה שמסתיימת ב-ando והדפיסו אותה באותיות קטנות.\nב. מחלקה University עם בנאי (name, location, students). מחלקה יורשת OpenUniversity עם מילון מקצועות: לכל מקצוע שם ומספר קורסים.\nג. פונקציה שקוראת קובץ. שורה רגילה היא name, location, students. אם מופיע courses: מתחיל בלוק של מקצוע ומספר קורסים עד השורה done courses. הדפיסו כמה מוסדות נמצאו, את סכום הסטודנטים, ולכל OpenUniversity את המקצוע עם מספר הקורסים הגדול ביותר.",
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
        fromAsset: true,
        prompt: "א. כתבו תכנית C/C++ שניגשת לקובץ SQLite בשם table.db, יוצרת טבלת Students עם העמודות Name, Id, School, מוסיפה שתי רשומות לפי בחירתכם, וסוגרת.\nב. כתבו תכנית פייתון שפונה לאותו בסיס, מקבלת מהקלט חיפוש (למשל שם סטודנטית) ומדפיסה את School.\nג. איזו חולשת אבטחה עלולה להיות בקוד כזה, וכיצד ניתן למנוע אותה?",
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
        fromAsset: true,
        prompt: "מהם ASLR ו-DEP, מה מטרתם וכיצד הם פועלים? לכל אחד תנו דוגמת קוד C/C++ שבה רואים את פעולת המנגנון, בלי מטען תקיפה.\nא. ASLR\nב. DEP",
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
        fromAsset: true,
        code: "#define FIELDSIZE (24)\nstruct field {\n    unsigned char f_id;\n    char* f_data;\n};\nvoid handle_fields(int argc, char** argv) {\n    if (argc != 2) exit(1);\n    field* r1 = (struct field*)malloc(sizeof(struct field));\n    r1->f_id = 1;\n    r1->f_data = (char*)malloc(FIELDSIZE);\n    field* r2 = (struct field*)malloc(sizeof(struct field));\n    r2->f_id = 2;\n    r2->f_data = (char*)malloc(FIELDSIZE);\n    strcpy(r1->f_data, argv[0]);\n    strcpy(r2->f_data, argv[1]);\n}",
        fromAsset: true,
        prompt: "הקוד מקבל שני ערכים ומעתיק אותם לזיכרון. אפשר להניח שההקצאות רציפות. שני מבני field, לכל אחד f_id ו-f_data שהוקצה בגודל FIELDSIZE (24), ואז strcpy מ-argv בלי בדיקת אורך.\nא. מצאו את החולשה והסבירו מה אפשר להשיג באמצעותה.\nב. תארו את שלבי הניצול בלי לכתוב קוד תקיפה.\nג. הציעו תיקון.",
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
