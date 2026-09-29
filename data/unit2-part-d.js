UNIT2.sections.push(
  {
    id: "fnptr",
    title: "מצביעים לפונקציות (function pointers) — לפני טבלה וירטואלית (vtable)",
    html: `
      <p>אפשר לקרוא לפונקציה בשם, ואפשר לשמור את הכתובת שלה במשתנה.</p>
      <pre class="code"><code>long add(int a, int b) { return a + b; }
long mul(int a, int b) { return a * b; }

int main() {
    long (*op)(int, int) = add;
    op(5, 7);                 // 12
    long (*arr[2])(int, int) = { add, mul };
    arr[1](5, 7);             // 35
}</code></pre>
      <p>התחביר עשוי להיראות מסורבל: "מצביע לפונקציה שמקבלת שני <code>int</code> ומחזירה <code>long</code>". במצגת מקצרים ב־<code>typedef long (*OP)(int, int);</code> ואז מערך <code>OP funcptr[2]</code>. הרעיון החשוב: <strong>בחירה איזו פונקציה תרוץ יכולה לקרות בזמן ריצה</strong>, לפי מה ששמרתם במערך. מהדרים מממשים בדרך כלל טבלה וירטואלית כרשימת כתובות דומה, אך תקן C++ אינו מחייב מבנה כזה.</p>
    `,
  },
  {
    id: "virtual",
    title: "פולימורפיזם (polymorphism), פונקציה וירטואלית (virtual function), מצביע לטבלה וירטואלית (vptr) וטבלה וירטואלית (vtable)",
    html: `
      <p><strong>קישור מוקדם (Early Binding)</strong> נקבע בקומפילציה, לפי טיפוס המצביע. <strong>קישור דינמי (Dynamic Binding)</strong> נקבע בזמן ריצה, לפי האובייקט עצמו. פונקציה שמקושרת בריצה נקראת <strong>פונקציה וירטואלית (Virtual Function)</strong>, והיא נשארת כזו בכל היררכיית הירושה.</p>
      <pre class="code"><code>class Shape {
public:
    virtual ~Shape() = default;
    virtual void draw() { std::cout &lt;&lt; "shape\\n"; }
};
class Circle : public Shape {
public:
    void draw() override { std::cout &lt;&lt; "circle\\n"; }
};
Shape* p = new Circle();
p-&gt;draw();  // circle — כי draw וירטואלית
delete p;    // בטוח כי ל־Shape יש מפרק וירטואלי</code></pre>
      <p>כאן <code>p</code> הוא <code>Shape*</code>, אבל האובייקט הוא <code>Circle</code>. הקריאה לא בוחרת את <code>Shape::draw</code> לפי טיפוס המצביע. במימוש נפוץ היא נעזרת ב<strong>מצביע לטבלה וירטואלית (vptr)</strong>, שמוביל לכניסה של <code>draw</code> בטבלה של <code>Circle</code>, ולכן מודפס <code>circle</code>.</p>
      <p>למחלקה פולימורפית המהדר בונה בדרך כלל <strong>טבלה וירטואלית (vtable)</strong>: מבנה משותף למופעים שמכיל כתובות של מימושים וירטואליים. האובייקט מכיל בדרך כלל <strong>מצביע לטבלה וירטואלית (vptr)</strong>, והקריאה דומה רעיונית ל־<code>object-&gt;vptr[index]()</code>. התרשים הבא הוא מודל פשוט שמופיע בשאלות הקורס, ולא הבטחה של תקן C++: מיקום ה־vptr ומספר הטבלאות או המצביעים תלויים במהדר ובמבנה הירושה.</p>
      <pre class="code" dir="ltr"><code>Object                         Vtable of the class
+---------------------------+  +------------------------------+
| vptr (common model) ----->|->| [0] &amp;Class::gainAccess       |
| char name[100]            |  | [1] &amp;Class::denyAccess       |
| int age                   |  +------------------------------+
+---------------------------+</code></pre>
      <p>במודל המימוש הנפוץ, אחרי שבנאי האב רץ ה־vptr מתעדכן לטבלה של המחלקה שנבנית עכשיו. לכן קריאה וירטואלית מתוך בנאי או מפרק נשלחת למימוש של המחלקה שבנייתה או הריסתה מתבצעת באותו רגע, ולא למימוש של מחלקה נגזרת שעדיין לא נבנתה או שכבר נהרסה.</p>
      <p><strong>פונקציה וירטואלית טהורה (Pure Virtual Function)</strong> נכתבת למשל <code>virtual void f() = 0;</code>. מחלקה שמכילה פונקציה כזו היא <strong>מחלקה אבסטרקטית (Abstract Class)</strong> ואי אפשר ליצור ממנה אובייקט ישירות. יורשת שרוצים ליצור ממנה אובייקטים חייבת לדרוס את הפונקציה; לפונקציה טהורה עדיין יכולה להיות הגדרה נפרדת שבה יורשות משתמשות.</p>
      <p>יחידה 3 תחזור לכך ששחיתת נתוני הניתוב של קריאה וירטואלית עלולה להעביר את הבקרה ליעד לא תקין. כאן מתמקדים רק במנגנון התקין ובהגנות עליו.</p>
      <div class="panel">
        <p><strong>למה virtual.</strong> יש לכם רשימת צורות ומציירים בלי לדעת מראש אם זו עיגול או ריבוע. בלי <code>virtual</code> המהדר בוחר לפי טיפוס המצביע (<code>Shape*</code>) — תמיד "צורה". עם <code>virtual</code> המימוש הנפוץ מצרף לאובייקט מצביע לטבלת הכתובות של המחלקה האמיתית. זה שימושי לפולימורפיזם, ולכן חשוב להגן על נתוני הניתוב מפני שחיתת זיכרון.</p>
      </div>
    `,
  },
  {
    id: "slice",
    title: "חיתוך אובייקט (object slicing)",
    html: `
      <p>המרת מצביע או הפניה מהבן לאב נקראת <strong>המרה כלפי מעלה (Upcasting)</strong>, והיא תקינה לפולימורפיזם: למשל, <code>Circle circle; Shape* p = &amp;circle;</code>.</p>
      <p>אם מעתיקים <strong>לפי ערך</strong> לפרמטר מסוג האב, נוצר אובייקט אב חדש שמכיל רק עותק של תת־אובייקט האב; אובייקט המקור אינו משתנה, אך שדות הבן אינם נמצאים בעותק. זהו <strong>חיתוך אובייקט (Object Slicing)</strong>. במימוש עם vtable, האובייקט החדש מתנהג כאובייקט אב בקריאות וירטואליות; ה־vtable עצמה אינה מועתקת או "הופכת".</p>
      <pre class="code"><code>void check(Stack s);     // רע: העתקה חותכת יורש
void check(Stack&amp; s);    // טוב
void check(Stack* s);    // טוב</code></pre>
      <p>כלל: פולימורפיזם עובר במצביע או בהפניה, לא באובייקט ערך.</p>
    `,
  },
  {
    id: "except",
    title: "שגיאות וחריגות (exceptions)",
    html: `
      <p>שגיאת הידור: הקוד לא חוקי, אין תוכנית. שגיאה בזמן ריצה מתגלה לאחר שהתוכנית התחילה, למשל קובץ חובה שחסר או <code>new</code> שנכשל וזורק <code>std::bad_alloc</code>. חלוקה של מספר שלם באפס היא התנהגות לא־מוגדרת, ולכן אין להניח שתיצור כשל מסוים.</p>
      <p>ב־C נהגו להחזיר קוד מיוחד:</p>
      <pre class="code"><code>int safe_div(int a, int b) {
    if (b == 0) return -1;
    return a / b;
}</code></pre>
      <p>הבעיה: צריך לזכור לבדוק את ‎-1 בכל קורא, ו־‎-1 עשויה להיות גם תוצאה חוקית, למשל עבור <code>-1 / 1</code>. ב־C++ אפשר לזרוק חריגה כשאי אפשר לטפל בשגיאה במקום. החריגה מטפסת במחסנית הקריאות עד <code>catch</code>. אם אין תפיסה מתאימה, נקראת <code>std::terminate</code> והתוכנית מסתיימת.</p>
      <pre class="code"><code>int safe_div2(int a, int b) {
    if (b == 0)
        throw std::invalid_argument("b is 0");
    return a / b;
}
int main() {
    try {
        std::cout &lt;&lt; safe_div2(12, 0);
    } catch (const std::invalid_argument&amp; e) {
        std::cerr &lt;&lt; e.what();
    }
}</code></pre>
      <p>כלל: <strong>זריקה בערך (Throw by Value), תפיסה בהפניה קבועה (Catch by Const Reference)</strong>. כך לא חותכים חריגה יורשת, ולא שוכחים <code>delete</code> על מצביע שנזרק.</p>
      <ul>
        <li>זורקים חריגה רק אם אי אפשר לטפל בשגיאה באותו מקום.</li>
        <li>החריגה מפעפעת במחסנית הקריאות (call stack) עד <code>catch</code>.</li>
        <li>במהלך הפעפוע מתבצעת <strong>פריקת מחסנית (stack unwinding)</strong>: מפרקים של אובייקטים מקומיים שכבר נבנו נקראים. לכן RAII מונע דליפות גם במסלול חריגה.</li>
        <li>בלי תפיסה מתאימה — נקראת <code>std::terminate</code> והתוכנית מסתיימת.</li>
      </ul>
      <div class="panel">
        <p><strong>למה חריגה ולא רק ‎-1.</strong> אם כל פונקציה מחזירה קוד שגיאה, די לשכוח בדיקה אחת בדרך. חריגה מטפסת אוטומטית עד מי שיודע לטפל — ופריקת המחסנית מריצה מפרקים, לכן קובץ שנפתח ב־RAII נסגר גם במסלול כישלון. זורקים כשאין תיקון מקומי (חלוקה באפס, קובץ חובה חסר); לא במקום תנאי רגיל.</p>
      </div>
    `,
  },
  {
    id: "tpl",
    title: "תבניות (templates) והספרייה התקנית לתבניות (Standard Template Library, STL)",
    html: `
      <p>תבנית (template) היא מחלקה או פונקציה עם טיפוס שמשלימים אחר כך. כותבים מחסנית פעם אחת, משתמשים ב־int וב־string בלי לשכפל קוד.</p>
      <pre class="code"><code>template&lt;class T&gt;
class Array {
    T a[100];
public:
    T&amp; operator[](int i) { return a[i]; }
};
Array&lt;int&gt; ia;
Array&lt;float&gt; fa;
ia[0] = 3;</code></pre>
      <p>המהדר מייצר עותק נפרד לכל טיפוס שביקשתם. הספרייה התקנית לתבניות (STL) כבר מספקת <strong>מכולות (Containers)</strong> — אובייקטים שמחזיקים אוסף איברים — ובהן <code>vector</code> (מערך דינמי), <code>list</code>, <code>map</code>, <code>set</code>, <code>queue</code>, <code>unordered_map</code> ועוד.</p>
      <pre class="code"><code>#include &lt;vector&gt;
#include &lt;string&gt;
std::vector&lt;std::string&gt; cars = {"Volvo", "Ford"};
for (const std::string&amp; c : cars) {
    std::cout &lt;&lt; c &lt;&lt; std::endl;
}</code></pre>
      <p>עדיף vector על מערך גולמי: הוא מנהל גודל ובעלות, ולכן מצמצם שגיאות הקצאה ידניות. עם זאת <code>operator[]</code> אינו בודק גבול; כאשר האינדקס אינו מובטח, משתמשים בבדיקה מפורשת או ב־<code>at()</code>, שזורקת <code>std::out_of_range</code>. גם כאן הקלט והאינדקס הם גבול אמון.</p>
      <p><strong>איטרטור (iterator)</strong> מסמן מיקום במכולה: <code>*it</code> ניגש לאיבר, <code>++it</code> מתקדם לפי מבנה המכולה (ברשימה מקושרת זה לא "הכתובת הבאה בזיכרון"). הוא נראה כמו מצביע, אך אינו בהכרח מצביע גולמי. <code>begin()</code> לאיבר הראשון; <code>end()</code> הוא מיקום אחרי האחרון, לא איבר חוקי.</p>
      <p>אחרי הכללת <code>&lt;algorithm&gt;</code>, הפונקציה <code>std::find(first, last, value)</code> מחפשת בטווח: אם נמצא ערך היא מחזירה איטרטור לאיבר, אחרת היא מחזירה <code>last</code> (בדרך כלל <code>end()</code>). בודקים <code>if (it != friends.end())</code> לפני שימוש ב־<code>*it</code>.</p>
    `,
  },
  {
    id: "smart",
    title: "מצביעים חכמים (Smart Pointers)",
    html: `
      <p>מצביע חכם מ־<code>&lt;memory&gt;</code> הוא אובייקט שמנהל בעלות על משאב ומשחרר אותו לפי כללי הבעלות שלו. כך בדרך כלל לא צריך לכתוב <code>delete</code> ידנית, ומחלקה שמכילה מצביע חכם יכולה להסתמך על <strong>כלל האפס (Rule of Zero)</strong>: פעולות ברירת המחדל שלה נגזרות מפעולות המצביע החכם. למשל, <code>unique_ptr</code> גורם להעתקה להיות אסורה.</p>
      <ul>
        <li><code>std::unique_ptr&lt;T&gt;</code> — בעלים יחיד. אי אפשר להעתיק אותו. אפשר רק להעביר את הבעלות עם <code>std::move</code>. כשהבעלים נהרס, המשאב נמחק.</li>
        <li><code>std::shared_ptr&lt;T&gt;</code> — כמה בעלים על אותו אובייקט. מונה הבעלים עולה בכל עותק ויורד בכל הריסה. כשהמונה מגיע ל־0, האובייקט המנוהל נהרס; בלוק הבקרה עשוי להישאר כל עוד קיימים <code>weak_ptr</code>.</li>
        <li><code>std::weak_ptr&lt;T&gt;</code> — מצביע בלי בעלות. הוא לא מעלה את מונה הבעלים. משתמשים בו כדי לשבור מעגל: אם שני <code>shared_ptr</code> מצביעים זה על זה, המונה לא יורד לאפס והזיכרון נשאר. אי אפשר לגשת לאובייקט ישירות דרך <code>weak_ptr</code>; קוראים ל־<code>lock()</code> ומקבלים <code>shared_ptr</code> ריק אם האובייקט כבר נהרס.</li>
      </ul>
      <pre class="code"><code>auto p = std::make_unique&lt;int&gt;(7);  // בעלים יחיד
auto a = std::make_shared&lt;int&gt;(3);
auto b = a;                          // מונה = 2
std::weak_ptr&lt;int&gt; w = a;            // לא בעלים</code></pre>
      <p>מצביע גולמי יכול לצפות באובייקט, אבל אסור ליצור ממנו בעלים חכם שני לאותו בלוק. הוא גם לא אמור לחיות אחרי שהבעלים נהרס. שימוש נכון במצביעים חכמים מצמצם דליפות ושחרור כפול, אך שימוש שגוי עדיין מסוכן: מעגל של <code>shared_ptr</code> עלול לדלוף, ושני בעלים חכמים שנוצרו בנפרד מאותו מצביע גולמי עלולים לשחרר פעמיים. מצביע חכם אינו בודק את תוכן הקלט.</p>
    `,
  }
);
