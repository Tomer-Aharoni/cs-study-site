window.EXAM_OCR_REJECT = [
  {
    file: "פתרונות סרוקים (2026_a1/a2, N10250…, 2021c-83-sol)",
    why: "דוחות משוב וכתב יד: עמודים ריקים או שברי מספרים. לא טקסט שאלון.",
  },
  {
    file: "2021c-83.pdf אחרי OCR",
    why: "כותרות השאלון יצאו סביר; גוף השאלות (קוד C++, אפשרויות) נשבר. לא לשימוש כמקור.",
  },
  {
    file: "unknown.pdf",
    why: "קטעי קוד חתוכים ומעורבבים עם רעש. אי אפשר לסמוך על שורה בודדת.",
  },
  {
    file: "זיכרון 7.4.2025.pdf / זיכרון 24.2.2025.pdf",
    why: "סריקה בלי שכבת טקסט. אין שאלות שאפשר לשלב.",
  },
];

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
    title: "2021א מועד 74 · נקודות מהשאלון",
    source: "הנקודות המרכזיות מהשאלון.",
    html: `
      <p>חלק א לדוגמה: אפחות (Mitigation) = הגנת מערכת בפני תקיפה כדי למזער נזק — לא סודיות ולא ניצול.</p>
      <p>שאלה 8 (רעיון): לקוח פייתון ל-IP ופורט נתונים, שליחת קובץ, הדפסת תשובה מוגבלת, הודעות שגיאה בלי Traceback; SQLite: טבלת <code>messages</code> עם מספר סידורי ותוכן — עם פרמטרים, לא שרשור.</p>
      <p>שאלה 9: Sandbox — מטרה, בעיות, מימוש עקרוני. אחר כך: <code>exec</code> על קוד מהלקוח שובר אמון; אפחות בשכבות; מה נשאר אחריהן.</p>
      <h3>שאלות מהשאלון · רמזים ופתרונות</h3>
      <p><strong>שאלה 1 (אמריקאית):</strong> מה פירוש המושג אפחות (Mitigation)?</p>
      <ul>
        <li>א. מצב שבו המערכת נקייה מבאגים וללא בעיות אבטחה.</li>
        <li>ב. שמירה על הנתונים ללא אפשרות גישה לגורמים בלתי מורשים.</li>
        <li>ג. תקיפת מערכת המתאפשרת בעקבות חולשת אבטחה.</li>
        <li>ד. הגנת המערכת בפני תקיפה לצורך מזעור הנזק העלול להיגרם ממנה.</li>
      </ul>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p>חשבו אם אפחות מסיר את עצם קיום החולשה בקוד, או שהוא מצמצם את הנגישות והנזק שהתוקף יכול לגרום.</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body"><p><strong>התשובה: ד'.</strong> אפחות אינו בהכרח תיקון שמבטל את החולשה מהשורש (כמו א'), אלא הגנה היקפית או הנדסית — קנרית, ASLR, הרשאה מינימלית — שממזערת את הנזק בזמן תקיפה. תיקון השורש עדיף כשאפשר; אפחות היא שכבה נוספת.</p>
      <p><strong>למה המסיחים שגויים?</strong></p>
      <ul>
        <li>• <strong>א' שגויה:</strong> מערכת נקייה מבאגים היא שאיפה תאורטית או יעד של בדיקות איכות (QA/Auditing), אך אינה הגדרת אפחות. אפחות מניחה שחולשות עשויות להתקיים ונועדה להקשות על ניצולן ולמזער נזק.</li>
        <li>• <strong>ב' שגויה:</strong> שמירה על הנתונים מפני גישה בלתי מורשית היא הגדרת סודיות (Confidentiality) מתוך משולש ה-CIA, ולא הגדרת אפחות.</li>
        <li>• <strong>ג' שגויה:</strong> תקיפת מערכת היא ניצול חולשה (Exploitation / Attack), ההפך הגמור ממנגנון הגנה ואפחות.</li>
      </ul></div></details>
      <p><strong>שאלה 2 (אמריקאית):</strong> היכן יאוחסנו <code>f1</code> ו־<code>p1</code>?</p>
      <pre class="code" dir="ltr"><code>Frog f1(5);
Frog *p1 = &amp;f1;
f1.hop();</code></pre>
      <ul>
        <li>א. <code>f1</code> במחסנית, <code>p1</code> בערימה.</li>
        <li>ב. שניהם בערימה.</li>
        <li>ג. שניהם במחסנית.</li>
        <li>ד. <code>p1</code> במחסנית, <code>f1</code> בערימה.</li>
      </ul>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p>בדקו אם נעשה שימוש ב־<code>new</code>. איפה יושבים משתנה מקומי ומצביע שמוגדרים ישירות בתוך פונקציה?</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body"><p><strong>התשובה: ג'.</strong> <code>f1</code> הוא אובייקט מקומי על מסגרת המחסנית של <code>main</code>. <code>p1</code> הוא מצביע מקומי, גם הוא על המחסנית, ומחזיק את כתובת <code>f1</code>. בלי <code>new</code> שום דבר לא הוקצה בערימה.</p>
      <p><strong>למה המסיחים שגויים?</strong></p>
      <ul>
        <li>• <strong>א' ו-ד' שגויות:</strong> שום משתנה אינו מוקצה בערימה (Heap) מכיוון שלא נעשה שימוש באופרטור new או בפונקציה malloc.</li>
        <li>• <strong>ב' שגויה:</strong> שני המשתנים הם משתנים לוקאליים אוטומטיים בפונקציה main ולכן יושבים שניהם על מסגרת המחסנית (Stack Frame). המצביע p1 מאוחסן במחסנית ומחזיק את כתובת הזיכרון של f1 שנמצאת גם היא במחסנית.</li>
      </ul></div></details>
      <p><strong>שאלה 3 (אמריקאית):</strong> מדוע הקוד לא יתקמפל?</p>
      <pre class="code" dir="ltr"><code>struct Thread { void run() {} };
struct Sender : public Thread {};
struct Receiver : public Thread {};
class Messenger : public Sender, public Receiver {};

int main() {
    Messenger m;
    m.run(); // שגיאת קומפילציה
}</code></pre>
      <ul>
        <li>א. בגלל ירושה מרובה.</li>
        <li>ב. בגלל בעיית המשולש.</li>
        <li>ג. בגלל בעיית היהלום.</li>
        <li>ד. הקוד יתקמפל.</li>
      </ul>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p><code>Messenger</code> יורש גם מ־<code>Sender</code> וגם מ־<code>Receiver</code>. כמה עותקים של <code>Thread</code>, וכך של <code>run()</code>, קיימים בתוך מופע <code>Messenger</code>?</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body"><p><strong>התשובה: ג' (בעיית היהלום).</strong> <code>Sender</code> ו־<code>Receiver</code> יורשים שניהם מ־<code>Thread</code> בירושה רגילה, ולכן במופע <code>m</code> יש שני עותקים של <code>Thread</code>. הקריאה <code>m.run()</code> דו־משמעית, כי המהדר לא יודע לאיזה עותק להתקשר. הפתרון: ירושה וירטואלית (<code>virtual public Thread</code>) שמשאירה עותק אחד.</p>
      <p><strong>למה המסיחים שגויים?</strong></p>
      <ul>
        <li>• <strong>א' שגויה:</strong> ירושה מרובה (Multiple Inheritance) כשלעצמה מותרת וחוקית לחלוטין ב-C++; השגיאה הספציפית נובעת מכפילות של מחלקת הבסיס המשותפת בראש היהלום.</li>
        <li>• <strong>ב' שגויה:</strong> אין מושג כזה "בעיית המשולש" בהנדסת תוכנה או ב-C++ (זהו מסיח פיקטיבי).</li>
        <li>• <strong>ד' שגויה:</strong> הקוד נכשל בוודאות בהידור בשל קריאה עמומה (Ambiguous call to member 'run').</li>
      </ul></div></details>
      <p><strong>שאלה 4 (אמריקאית):</strong> האם יש זליגת זיכרון?</p>
      <pre class="code" dir="ltr"><code>class Foo {
    char* buffer1;
public:
    Foo(size_t size) { buffer1 = new char[size]; }
    ~Foo() { delete[] buffer1; }
};
class Bar : public Foo {
    char* buffer2;
public:
    Bar(size_t size) : Foo(size) { buffer2 = new char[size]; }
    ~Bar() { delete[] buffer2; }
};
int main() {
    Foo* f = new Bar(100);
    delete f;
}</code></pre>
      <ul>
        <li>א. כן, של <code>buffer1</code>.</li>
        <li>ב. כן, של <code>buffer2</code>.</li>
        <li>ג. כן, של <code>buffer1</code> ו־<code>buffer2</code>.</li>
        <li>ד. לא, אין זליגה.</li>
      </ul>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p>המצביע <code>f</code> הוא <code>Foo*</code>, אבל האובייקט הוא <code>Bar</code>. האם <code>~Foo()</code> מוגדר <code>virtual</code>?</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body"><p><strong>התשובה: ב' (של <code>buffer2</code>).</strong> המפרק <code>~Foo()</code> אינו וירטואלי, ולכן <code>delete f;</code> דרך <code>Foo*</code> מפעיל רק את <code>~Foo()</code> (קישור סטטי). <code>~Bar()</code> לא רץ, ו־<code>buffer2</code> זולג. <code>buffer1</code> כן משתחרר כי <code>~Foo()</code> רץ. התיקון: <code>virtual ~Foo()</code>.</p>
      <p><strong>למה המסיחים שגויים?</strong></p>
      <ul>
        <li>• <strong>א' שגויה:</strong> buffer1 אינו זולג כלל, משום שהמפרק ~Foo() נקרא ומשחרר אותו כראוי בעזרת delete[] buffer1.</li>
        <li>• <strong>ג' שגויה:</strong> buffer1 משתחרר בהצלחה; רק buffer2 זולג.</li>
        <li>• <strong>ד' שגויה:</strong> ישנה זליגת זיכרון ודאית של buffer2 (בגודל 100 בתים), כיוון שמפרק הנגזרת ~Bar() לעולם אינו נקרא.</li>
      </ul></div></details>
      <p><strong>שאלה 5 (פתוחה):</strong> נתחו את מנגנון קנרית המחסנית (Stack Canary): הבעיה שהובילה אליו, אופן הפעולה, מבנה המחסנית עם ובלי הקנרית, וחלופה.</p>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p>הקנרית היא ערך סודי שנשתל במחסנית לפני כתובת החזרה. מה קורה לערך הזה כשגלישה רציפה מנסה להגיע לכתובת החזרה?</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body"><ul>
        <li><strong>הבעיה:</strong> בגלישת חוצץ במחסנית, קלט ארוך מהחוצץ המקומי נכתב מעבר לו. העתקה בלי גבול (<code>strcpy</code>, <code>gets</code>) מתקדמת אל EBP/RBP שמור ואל כתובת החזרה.</li>
        <li><strong>הפעולה:</strong> המהדר שותל ערך אקראי סודי בין המשתנים המקומיים לבין כתובת החזרה. בכניסה לפונקציה הערך נרשם, ולפני <code>ret</code> נבדק. אם גלישה רציפה שינתה אותו, התהליך נעצר לפני החזרה.</li>
        <li><strong>מבנה המחסנית:</strong> בלי קנרית — חוצצים מקומיים, EBP שמור, כתובת חזרה. עם קנרית — חוצצים מקומיים, קנרית, EBP שמור, כתובת חזרה.</li>
        <li><strong>חלופות:</strong> ASLR מגריל כתובות כדי שלא יהיה יעד קבוע; מחסנית צל (CET) שומרת עותק מוגן של כתובת החזרה ומשווה ב־<code>ret</code>.</li>
        <li>הקנרית אינה מתקנת את <code>strcpy</code>, ואינה עוצרת גלישת ערימה, דריסת vptr, או מצב שבו ערכה כבר דלף.</li>
      </ul></div></details>
    `,
  },
  {
    id: "e-2021c-sample",
    title: "2021ג · בחינה לדוגמה",
    source: "הבחינה לדוגמה של הקורס, באותו דפוס.",
    html: `
      <p>חלק א: קטע <code>Base</code>/<code>Der</code> עם <code>f</code> וירטואלית, <code>g</code> לא וירטואלית, <code>h</code> וירטואלית. מה יודפס ב-<code>b-&gt;f()</code>, <code>d-&gt;f()</code>, <code>b-&gt;g()</code>, <code>d-&gt;g()</code>. זה פולימורפיזם וטבלה וירטואלית (יחידה 2).</p>
      <p>גם: <code>protected</code>, מילים שמורות בפייתון, by-reference מול by-value.</p>
      <p>חלק ב (בבחינות האלה חוזר): SQLite ב-C++/פייתון; תקשורת; אפחות זיכרון.</p>
      <h3>שאלות מהשאלון · רמזים ופתרונות</h3>
      <p><strong>שאלה 1 (אמריקאית):</strong> מה יודפס?</p>
      <pre class="code" dir="ltr"><code>class Base {
public:
    virtual void f() { g(); cout &lt;&lt; "B::f" &lt;&lt; endl; }
    void g() { h(); cout &lt;&lt; "B::g" &lt;&lt; endl; }
    virtual void h() { cout &lt;&lt; "B::h" &lt;&lt; endl; }
};
class Der : public Base {
public:
    void g() { h(); cout &lt;&lt; "D::g" &lt;&lt; endl; }
    void h() { cout &lt;&lt; "D::h" &lt;&lt; endl; }
};
int main() {
    Base* b; Der* d = new Der();
    b = d;
    b-&gt;f(); cout &lt;&lt; "---" &lt;&lt; endl;
    d-&gt;f(); cout &lt;&lt; "---" &lt;&lt; endl;
    b-&gt;g(); cout &lt;&lt; "---" &lt;&lt; endl;
    d-&gt;g();
}</code></pre>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p><code>f()</code> וירטואלית ב־<code>Base</code>. <code>g()</code> <strong>אינה</strong> וירטואלית. <code>h()</code> וירטואלית. כשקוראים ל־<code>g()</code> מתוך <code>Base::f()</code>, לאיזו גרסה מגיעים?</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body"><ol>
        <li><code>b-&gt;f()</code>: <code>f</code> וירטואלית ו־<code>Der</code> לא דורסת אותה, לכן <code>Base::f</code>. בתוכה <code>g()</code> אינה וירטואלית, לכן <code>Base::g</code>. בתוכה <code>h()</code> וירטואלית והאובייקט הוא <code>Der</code>, לכן <code>Der::h</code>. פלט: <code>D::h</code>, <code>B::g</code>, <code>B::f</code>.</li>
        <li><code>d-&gt;f()</code>: <code>f</code> מורשת מ־<code>Base</code>, אותו מסלול. פלט: <code>D::h</code>, <code>B::g</code>, <code>B::f</code>.</li>
        <li><code>b-&gt;g()</code>: <code>b</code> מסוג <code>Base*</code> ו־<code>g</code> אינה וירטואלית, לכן <code>Base::g</code>. בתוכה <code>h()</code> הווירטואלית נותנת <code>Der::h</code>. פלט: <code>D::h</code>, <code>B::g</code>.</li>
        <li><code>d-&gt;g()</code>: <code>d</code> מסוג <code>Der*</code>, לכן <code>Der::g</code> (הסתרה). בתוכה <code>Der::h</code>. פלט: <code>D::h</code>, <code>D::g</code>.</li>
      </ol>
      <p>הכלל: קריאה לפונקציה לא־וירטואלית נקבעת לפי טיפוס המצביע; קריאה וירטואלית נקבעת לפי טיפוס האובייקט בפועל.</p>
      <p><strong>למה המסיחים שגויים?</strong></p>
      <ul>
        <li>• <strong>הטענה שמופעל רק B:: בכל הקריאות שגויה:</strong> הפונקציה h היא וירטואלית ולכן תמיד מנותבת למימוש הנגזר (Der::h) בזמן ריצה כשהאובייקט הוא Der.</li>
        <li>• <strong>הטענה שמופעל רק D:: בכל הקריאות שגויה:</strong> הפונקציה g אינה וירטואלית, ולכן קריאה דרך מצביע Base* או מתוך Base::f מנותבת בקומפילציה ל-Base::g בלבד.</li>
        <li>• <strong>הטענה ש-g היא תמיד D::g שגויה:</strong> ללא virtual אין קישור דינמי עבור g; מתרחשת הסתרה (Hiding) ולא דריסה (Overriding), כך ש-Base* אינו מודע לקיומה של Der::g.</li>
      </ul></div></details>
      <p><strong>שאלה 9 (פתוחה):</strong> שני מבני <code>field</code> על הערימה, <code>strcpy</code> מ־<code>argv</code>. מה החולשה, מה נשבר, ואיך מתקנים?</p>
      <pre class="code" dir="ltr"><code>#define FIELDSIZE (16)
struct field {
    unsigned char f_id;
    char* f_data;
};
void handle_fields(int argc, char** argv) {
    if (argc != 2) exit(1);
    field* r1 = (struct field*)malloc(sizeof(struct field));
    r1-&gt;f_id = 1;
    r1-&gt;f_data = (char*)malloc(FIELDSIZE);
    field* r2 = (struct field*)malloc(sizeof(struct field));
    r2-&gt;f_id = 2;
    r2-&gt;f_data = (char*)malloc(FIELDSIZE);
    strcpy(r1-&gt;f_data, argv[0]);
    strcpy(r2-&gt;f_data, argv[1]);
}</code></pre>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p>מה קורה כשמחרוזת ארוכה מ־16 בתים נכנסת ל־<code>r1-&gt;f_data</code>? אילו הקצאות יושבות על הערימה בצמוד לחוצץ הזה?</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body"><ul>
        <li><strong>החולשה:</strong> <code>strcpy</code> לא בודק את אורך הקלט מול <code>FIELDSIZE</code>. זו גלישת ערימה (Heap Buffer Overflow).</li>
        <li><strong>מה נשבר:</strong> ההקצאות עלולות לשבת ברצף — <code>r1</code>, החוצץ שלו, <code>r2</code>, החוצץ שלו. כתיבה עודפת לחוצץ של <code>r1</code> עלולה להגיע למבנה <code>r2</code> ולשנות את המצביע <code>f_data</code> שבו. אז ה־<code>strcpy</code> הבא כותב לאן שהמצביע המושחת מצביע — פגיעה בשלמות, בלי לגעת בכתובת חזרה.</li>
        <li><strong>באג נוסף בשאלה:</strong> עם <code>argc != 2</code>, <code>argv[0]</code> הוא שם התוכנית ו־<code>argv[1]</code> הוא הארגומנט היחיד. זה לא "שני ערכי קלט" רגילים.</li>
        <li><strong>התיקון:</strong> לבדוק אורך מול <code>FIELDSIZE - 1</code> לפני ההעתקה, או העתקה חסומה עם אפס סיום, ולבדוק את ההחזרה של <code>malloc</code>.</li>
      </ul>
      <pre class="code" dir="ltr"><code>strncpy(r1-&gt;f_data, argv[0], FIELDSIZE - 1);
r1-&gt;f_data[FIELDSIZE - 1] = '\\0';</code></pre>
      <p>הרחקת המצביע מהחוצץ אינה תחליף לבדיקת הגבול.</p></div></details>
    `,
  },
  {
    id: "e-2024mem",
    title: "26.2.2024 · שחזור",
    source: "שחזור שאפשר לקרוא.",
    html: `
      <p>חלק א ששוחזר: ביטוי משולש ב-C++; חולשה (Vulnerability); כמה סיביות ב-IPv6 (128); האם <code>b = a.copy</code> ואז שינוי איבר הוא העתקה רדודה/עמוקה לפי הטיפוס (בפייתון <code>list.copy</code> רדודה); העמסה בפייתון — אין.</p>
      <p>שאלה 6: פיצול מחרוזת והדפסת מילים שמתחילות ב-<code>pre</code> באותיות גדולות; מחלקת Book (שם, כותב, שנה); תת-מחלקה ששמה נקלט מהמשתמש, קוראת לבנאי הבסיס, שדה <code>openu_id</code>.</p>
      <p>שאלה 7: לפחות שלוש דרכים מול דריסת כתובת חזרה (ASLR, קנרית, NX…).</p>
      <p>שאלה 8: לקוח פייתון ששולח קובץ בצ'אנקים עד 1024; שרת C++ שמאשר קבלה.</p>
      <p>שאלה 9 בשחזור המקורי לא זכורה — לא ממציאים קטע קוד.</p>
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
];
