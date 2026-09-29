UNIT2.sections.push(
  {
    id: "fnptr",
    title: "מצביעים לפונקציות (function pointers) — לפני vtable",
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
      <p>הסינטקס מכוער בכוונה: "מצביע לפונקציה שמקבלת שני int ומחזירה long". במצגת מקצרים ב־<code>typedef long (*OP)(int, int);</code> ואז מערך <code>OP funcptr[2]</code>. הרעיון החשוב: <strong>בחירה איזו פונקציה תרוץ יכולה לקרות בזמן ריצה</strong>, לפי מה ששמרתם במערך. הטבלה הווירטואלית היא בדיוק מערך כזה, שהמהדר ממלא בשבילכם לכל מחלקה.</p>
    `,
  },
  {
    id: "virtual",
    title: "פולימורפיזם (polymorphism), virtual, vptr ו־vtable",
    html: `
      <p><strong>קישור מוקדם</strong> נקבע בקומפילציה, לפי טיפוס המצביע. <strong>קישור דינמי</strong> נקבע בזמן ריצה, לפי האובייקט עצמו. פונקציה שמקושרת בריצה נקראת <strong>פונקציה וירטואלית</strong>, והיא נשארת כזו בכל היררכיית הירושה.</p>
      <pre class="code"><code>class Shape {
public:
    virtual void draw() { std::cout &lt;&lt; "shape\\n"; }
};
class Circle : public Shape {
public:
    void draw() override { std::cout &lt;&lt; "circle\\n"; }
};
Shape* p = new Circle();
p-&gt;draw();  // circle — כי draw וירטואלית</code></pre>
      <p>כאן <code>p</code> הוא <code>Shape*</code>, אבל האובייקט הוא <code>Circle</code>. הקריאה לא בוחרת את <code>Shape::draw</code> לפי טיפוס המצביע. היא קוראת את ה־vptr שבתחילת האובייקט, קופצת לכניסה של <code>draw</code> בטבלה של Circle, ומדפיסה circle.</p>
      <p>לכל מחלקה שיש בה לפחות פונקציה וירטואלית אחת, המהדר בונה <strong>טבלה וירטואלית (vtable)</strong> אחת: רשימת כתובות של המימושים, משותפת לכל המופעים. בכל אובייקט הוא שותל <strong>vptr</strong> בתחילת הזיכרון, בהיסט 0, לפני השדות שכתבתם. הקריאה נראית בערך כמו <code>object-&gt;vptr[index]()</code>. התקן מחייב את ההתנהגות הפולימורפית, לא את הפריסה הזו. זה בכל זאת המודל שמופיע בשאלות על ארגון האובייקט בזיכרון.</p>
      <pre class="code" dir="ltr"><code>Object                         Vtable of the class
+---------------------------+  +------------------------------+
| vptr (offset 0) --------->|->| [0] &amp;Class::gainAccess       |
| char name[100]            |  | [1] &amp;Class::denyAccess       |
| int age                   |  +------------------------------+
+---------------------------+</code></pre>
      <p>בבנאי, אחרי שבנאי האב רץ, ה־vptr מתעדכן לטבלה של המחלקה שנבנית עכשיו. בזמן הבנייה וההריסה אי אפשר לסמוך על דריסה של חלק שעוד לא נבנה, או שכבר נהרס.</p>
      <p>פונקציה טהורה: <code>virtual void f() = 0;</code> — אין מימוש כאן, אי אפשר ליצור מופע, היורשות חייבות לממש. מחלקה אבסטרקטית.</p>
      <p>יחידה 3: אם תוקף דורס vptr, הקפיצה הווירטואלית הולכת לפונקציה שלו. קודם מבינים את המנגנון התקין.</p>
      <div class="panel">
        <p><strong>למה virtual.</strong> יש לכם רשימת צורות ומציירים בלי לדעת מראש אם זו עיגול או ריבוע. בלי <code>virtual</code> המהדר בוחר לפי טיפוס המצביע (<code>Shape*</code>) — תמיד "צורה". עם <code>virtual</code> האובייקט נושא פתק (vptr) לטבלת כתובות של המחלקה האמיתית. זה שימושי לפולימורפיזם, וזו גם הסיבה שדריסת הפתק ביחידה 3 שוברת זרימת ביצוע: הקפיצה סומכת על הכתובת שבטבלה.</p>
      </div>
    `,
  },
  {
    id: "slice",
    title: "חיתוך אובייקט (object slicing)",
    html: `
      <p>המרת מצביע/הפניה מהבן לאב נקראת upcasting והיא תקינה לפולימורפיזם: <code>Shape* p = new Circle();</code></p>
      <p>אם מעתיקים <strong>לפי ערך</strong> לפרמטר מסוג האב, מועתק רק חלק האב. שדות הבן נזרקים. ה־vtable הופך לשל האב. קוראים לזה slicing.</p>
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
      <p>שגיאת הידור: הקוד לא חוקי, אין תוכנית. שגיאת ריצה: התוכנית רצה ונכשלת (חלוקה באפס, קובץ חסר, new שנכשל).</p>
      <p>ב־C נהגו להחזיר קוד מיוחד:</p>
      <pre class="code"><code>int safe_div(int a, int b) {
    if (b == 0) return -1;
    return a / b;
}</code></pre>
      <p>הבעיה: צריך לזכור לבדוק את ‎-1 בכל קורא. ב־C++ אפשר לזרוק חריגה. זורקים רק אם אי אפשר לטפל במקום. החריגה מטפסת במחסנית הקריאות עד catch. בלי catch — קריסה.</p>
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
      <p>כלל: <strong>throw by value, catch by const reference</strong>. כך לא חותכים חריגה יורשת, ולא שוכחים delete על מצביע שנזרק.</p>
      <ul>
        <li>זורקים חריגה רק אם אי אפשר לטפל בשגיאה באותו מקום.</li>
        <li>החריגה מפעפעת במחסנית הקריאות (call stack) עד <code>catch</code>.</li>
        <li>במהלך הפעפוע מתבצעת <strong>פריקת מחסנית (stack unwinding)</strong>: מפרקים של אובייקטים מקומיים שכבר נבנו נקראים. לכן RAII מונע דליפות גם במסלול חריגה.</li>
        <li>בלי תפיסה — התוכנית קורסת.</li>
      </ul>
      <div class="panel">
        <p><strong>למה חריגה ולא רק ‎-1.</strong> אם כל פונקציה מחזירה קוד שגיאה, די לשכוח בדיקה אחת בדרך. חריגה מטפסת אוטומטית עד מי שיודע לטפל — ופריקת המחסנית מריצה מפרקים, לכן קובץ שנפתח ב־RAII נסגר גם במסלול כישלון. זורקים כשאין תיקון מקומי (חלוקה באפס, קובץ חובה חסר); לא במקום תנאי רגיל.</p>
      </div>
    `,
  },
  {
    id: "tpl",
    title: "תבניות (templates) וספריית STL",
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
      <p>המהדר מייצר עותק נפרד לכל טיפוס שביקשתם. ה־STL כבר נתן מבנים מוכנים: <code>vector</code> (מערך דינמי), <code>list</code>, <code>map</code>, <code>set</code>, <code>queue</code>, <code>unordered_map</code> ועוד.</p>
      <pre class="code"><code>#include &lt;vector&gt;
#include &lt;string&gt;
std::vector&lt;std::string&gt; cars = {"Volvo", "Ford"};
for (const std::string&amp; c : cars) {
    std::cout &lt;&lt; c &lt;&lt; std::endl;
}</code></pre>
      <p>עדיף vector על מערך גולמי: הוא מנהל גודל ובעלות, ולכן מצמצם שגיאות הקצאה ידניות. עם זאת <code>operator[]</code> אינו בודק גבול; כאשר האינדקס אינו מובטח, משתמשים בבדיקה מפורשת או ב־<code>at()</code>, שזורקת <code>std::out_of_range</code>. גם כאן הקלט והאינדקס הם גבול אמון.</p>
      <p><strong>איטרטור (iterator)</strong> מסמן מיקום במכולה: <code>*it</code> ניגש לאיבר, <code>++it</code> מתקדם לפי מבנה המכולה (ברשימה מקושרת זה לא "הכתובת הבאה בזיכרון"). הוא נראה כמו מצביע, אך אינו בהכרח מצביע גולמי. <code>begin()</code> לאיבר הראשון; <code>end()</code> הוא מיקום אחרי האחרון, לא איבר חוקי.</p>
      <p><code>std::find(first, last, value)</code> מחפש בטווח: אם נמצא מחזיר איטרטור לאיבר, אחרת מחזיר <code>last</code> (בדרך כלל <code>end()</code>). בודקים <code>if (it != friends.end())</code> לפני שימוש ב־<code>*it</code>.</p>
    `,
  },
  {
    id: "smart",
    title: "מצביעים חכמים (Smart Pointers)",
    html: `
      <p>מצביע חכם מ־<code>&lt;memory&gt;</code> הוא אובייקט שמחזיק מצביע גולמי ומשחרר אותו במפרק. כך לא צריך לזכור <code>delete</code>, וכלל השלוש והחמישה נכתבים בשבילכם.</p>
      <ul>
        <li><code>std::unique_ptr&lt;T&gt;</code> — בעלים יחיד. אי אפשר להעתיק אותו. אפשר רק להעביר את הבעלות עם <code>std::move</code>. כשהבעלים נהרס, המשאב נמחק.</li>
        <li><code>std::shared_ptr&lt;T&gt;</code> — כמה בעלים על אותו בלוק. מונה הפניות עולה בכל עותק ויורד בכל הריסה. כשהמונה מגיע ל־0, רץ המפרק.</li>
        <li><code>std::weak_ptr&lt;T&gt;</code> — מצביע בלי בעלות. הוא לא מעלה את המונה. משתמשים בו כדי לשבור מעגל: אם שני <code>shared_ptr</code> מצביעים זה על זה, המונה לא יורד לאפס והזיכרון נשאר. <code>weak_ptr</code> שובר את המעגל.</li>
      </ul>
      <pre class="code"><code>auto p = std::make_unique&lt;int&gt;(7);  // בעלים יחיד
auto a = std::make_shared&lt;int&gt;(3);
auto b = a;                          // מונה = 2
std::weak_ptr&lt;int&gt; w = a;            // לא בעלים</code></pre>
      <p>מצביע גולמי יכול לצפות באובייקט, אבל אסור ליצור ממנו בעלים חכם שני לאותו בלוק. הוא גם לא אמור לחיות אחרי שהבעלים נהרס. מצביע חכם מונע דליפה ושחרור כפול. הוא לא בודק את תוכן הקלט.</p>
    `,
  }
);
