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
      <p>כיצד הקסם הזה עובד מאחורי הקלעים? (Zero Assumptions):</p>
      <p>כאשר פונקציה מסומנת כמילת המפתח <code>virtual</code>, המהדר מבין שאינו יכול לקבוע את כתובת הפונקציה בזמן ההידור (Early Binding). במקום זאת, הוא מייצר מנגנון דו־שלבי של <strong>קישור דינמי (Dynamic Binding)</strong>:</p>
      <ol>
        <li><strong>טבלה וירטואלית (Virtual Table / Vtable):</strong> לכל מחלקה פולימורפית נבנית טבלה סטטית אחת בזיכרון הנתונים הקבוע (מקטע <code>rodata</code> לקריאה בלבד). הטבלה מכילה מערך של מצביעים לכתובות הפונקציות הווירטואליות של אותה מחלקה.</li>
        <li><strong>מצביע לטבלה וירטואלית (Virtual Pointer / vptr):</strong> בכל אובייקט (מופע) של המחלקה, המהדר משתיל שדה נסתר בראש הזיכרון (בהיסט 0, בגודל 4 בתים במערכת 32-bit או 8 בתים ב-64-bit). שדה זה מצביע ישירות אל ה־Vtable של המחלקה שיצרה את המופע.</li>
      </ol>
      <p><strong>זרימת הקריאה בזמן ריצה:</strong> כאשר מבוצעת הקריאה <code>p-&gt;draw()</code> דרך מצביע לבסיס:</p>
      <ul>
        <li>התוכנית ניגשת לראש האובייקט בזיכרון ושולפת משם את ה־<code>vptr</code> (בהיסט 0).</li>
        <li>היא עוקבת אחר ה־<code>vptr</code> היישר אל ה־Vtable של <code>Circle</code>.</li>
        <li>היא שולפת את כתובת הפונקציה <code>Circle::draw</code> מהאינדקס המתאים ומבצעת את הקריאה בפועל: <code>object-&gt;vptr[index]()</code>.</li>
      </ul>
      <pre class="code" dir="ltr"><code>Object in Memory (at offset 0)     Vtable in rodata
+---------------------------+       +------------------------------+
| vptr (4/8 Bytes) -------->|-----> | [0] &amp;Class::gainAccess       |
| char name[100]            |       | [1] &amp;Class::denyAccess       |
| int age                   |       +------------------------------+
+---------------------------+</code></pre>
      <p><strong>מדוע מבנה הזיכרון הזה חיוני לאבטחה (הכנה ליחידה 3)?</strong> הביטו בתרשים: ה־<code>vptr</code> יושב ממש בראש האובייקט בצמוד לשדות הנתונים. אם התוכנית כוללת גלישת חוצץ (Buffer Overflow), למשל במערך סמוך או בשדה <code>name[100]</code>, תוקף עלול לדרוס את ה־<code>vptr</code> ולגרום לו להצביע על טבלה מזויפת בשליטתו! בעת הקריאה הווירטואלית הבאה, התוכנית תקפוץ ישירות לקוד זדוני של התוקף במקום לפונקציה המקורית.</p>
      <p><strong>סדר עדכון ה־vptr בזמן בנייה והריסה:</strong> בזמן שבנאי האב רץ, ה־<code>vptr</code> מצביע על ה־Vtable של האב בלבד (כי תת־אובייקט הבן עדיין לא נבנה!). רק כשרץ בנאי הבן ה־<code>vptr</code> מתעדכן ל־Vtable של הבן. לכן קריאה לפונקציה וירטואלית מתוך בנאי או מפרק תגיע תמיד למימוש של המחלקה הנבנית או הנהרסת באותו רגע, ולא תגיע לדריסה של מחלקה נגזרת.</p>
      <p><strong>פונקציה וירטואלית טהורה (Pure Virtual Function):</strong> נכתבת בתחביר <code>virtual void f() = 0;</code>. פונקציה זו מצהירה על ממשק ללא מימוש מלא, והופכת את המחלקה ל<strong>מחלקה אבסטרקטית (Abstract Class)</strong> שאי אפשר ליצור ממנה מופעים ישירים בערימה או במחסנית. כל מחלקה נגזרת חייבת לדרוס ולממש את הפונקציה כדי שניתן יהיה ליצור ממנה אובייקטים.</p>
      <div class="panel">
        <p><strong>למה virtual ומתי משתמשים בו:</strong> תארו לעצמכם רשימה של צורות גיאומטריות שונות, ואתם רוצים לצייר את כולן בלולאה פשוטה. בלי <code>virtual</code> המהדר היה בודק רק את טיפוס המצביע (<code>Shape*</code>) ומפעיל תמיד את התנהגות האב הכללית. עם <code>virtual</code>, כל אובייקט נושא עימו "תעודת זהות" סודית בדמות <code>vptr</code>, המבטיחה שבזמן ריצה יופעל המימוש האמיתי והמדויק של האובייקט הספציפי.</p>
      </div>
    `,
  },
  {
    id: "slice",
    title: "חיתוך אובייקט (object slicing)",
    html: `
      <p>המרת מצביע או הפניה ממחלקת הבן למחלקת האב נקראת <strong>המרה כלפי מעלה (Upcasting)</strong>, והיא הבסיס לפולימורפיזם תקין: למשל, <code>Circle circle; Shape* p = &amp;circle;</code>.</p>
      
      <p><strong>מהי תופעת חיתוך האובייקט (Object Slicing)?</strong></p>
      <p>אובייקט של מחלקת הבן (כגון <code>SecureStack</code> או <code>Circle</code>) מורכב בזיכרון משני חלקים: תת־אובייקט של מחלקת הבסיס, ובנוסף השדות הייחודיים שהבן הוסיף (כגון שדה מפתח סודי <code>_secretkey</code>). נפח הזיכרון שלו גדול יותר מנפח מחלקת הבסיס לבדה.</p>
      <p>כאשר מעבירים אובייקט כזה <strong>לפי ערך (Pass by Value)</strong> לפונקציה המצפה לקבל אובייקט בסיס (למשל <code>void check(Stack s)</code>):</p>
      <ul>
        <li>הקומפיילר מקצה במחסנית מקום בדיוק בגודל של מחלקת הבסיס <code>Stack</code>.</li>
        <li>אין במחסנית מקום להכיל את שדות הבן המורחבים! לכן, הקומפיילר ממש "חותך" (Slices) ומשליך את שדות הבן, ומעתיק אך ורק את חלק הבסיס.</li>
        <li>יתרה מכך: האובייקט החדש שנוצר במחסנית מקבל <code>vptr</code> שמצביע לטבלה של <code>Stack</code>, כך שכל התנהגות פולימורפית וכל דריסה ייחודית של הבן הולכות לאיבוד לחלוטין!</li>
      </ul>
      <pre class="code"><code>void check(Stack s);     // שגיאה חמורה: העתקה לפי ערך חותכת (Slicing) את הבן!
void check(Stack&amp; s);    // מצוין: הפניה שומרת על האובייקט המקורי במלואו
void check(Stack* s);    // מצוין: מצביע שומר על האובייקט המקורי במלואו</code></pre>
      <div class="panel">
        <p><strong>כלל הברזל לתכנות דפנסיבי:</strong> פולימורפיזם מעבירים תמיד <strong>לפי הפניה (<code>const Base&amp;</code>)</strong> או <strong>לפי מצביע (<code>Base*</code>)</strong> — לעולם לא לפי ערך (By-Value)!</p>
      </div>
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
      <p>בעולם של C++ הקלאסית, כל <code>new</code> חייב <code>delete</code> תואם. אך בעולם האמיתי קיימות יציאות מוקדמות מפונקציות, שגיאות וחריגות (Exceptions), או סתם שכחה אנושית — כל אלה גורמים לזליגות זיכרון חמורות או למצביעים יתומים. הפתרון המודרני של C++ הוא <strong>מצביעים חכמים (Smart Pointers)</strong> מתוך הספרייה <code>&lt;memory&gt;</code>.</p>
      
      <p><strong>הרעיון הפדגוגי — RAII במיטבו:</strong> המצביע החכם הוא אובייקט קטן שחי על <em>המחסנית (Stack)</em> ומחזיק בתוכו את המצביע לזיכרון הדינמי ב־<em>ערימה (Heap)</em>. כאשר האובייקט במחסנית יוצא מהתחום ומסיים את חייו, המפרק שלו מופעל אוטומטית ומשחרר את הזיכרון בערימה. כך מובטח שחרור מלא בכל תרחיש, ומיושם <strong>כלל האפס (Rule of Zero)</strong> — מחלקה המשתמשת במצביעים חכמים אינה צריכה לכתוב מפרק או פעולות העתקה ידניות!</p>

      <h3>שלושת סוגי המצביעים החכמים — אנלוגיות ושימוש</h3>
      <ul>
        <li><strong><code>std::unique_ptr&lt;T&gt;</code> — בעלות בלעדית (אנלוגיית מפתח הדירה היחיד):</strong>
          <br>יש רק מפתח אחד ויחיד למשאב בערימה. אי אפשר לשכפל את המפתח — פעולות ההעתקה חסומות במפורש (<code>= delete</code>). כדי להעביר את הדירה למישהו אחר, חייבים למסור את המפתח פיזית באמצעות <strong>סמנטיקת העברה (Move Semantics)</strong> עם <code>std::move</code> (המעביר מאפס את המקור ומעניק בעלות בלעדית ליעד). כשהבעלים היחיד מסיים את חייו, המשאב מושמד ומשתחרר מיד. יוצרים בעזרת <code>std::make_unique&lt;T&gt;(...)</code>.
        </li>
        <li><strong><code>std::shared_ptr&lt;T&gt;</code> — בעלות משותפת (אנלוגיית מונה המבקרים):</strong>
          <br>כמה בעלים חולקים יחד את אותו המשאב. המערכת מחזיקה בלוק בקרה פנימי עם <strong>מונה הפניות (Reference Count)</strong>: כל העתקה מעלה את המונה ב־1, וכל מפרק של אחד השותפים מוריד אותו ב־1. המשאב בערימה נהרס ומשתחרר אך ורק כאשר המונה מגיע ל־0 בדיוק (השותף האחרון עזב). יוצרים בעזרת <code>std::make_shared&lt;T&gt;(...)</code>.
        </li>
        <li><strong><code>std::weak_ptr&lt;T&gt;</code> — צופה ללא בעלות ושבירת מעגלי תלות (Cyclic References):</strong>
          <br>מצביע ש"צופה" על משאב שמנוהל על ידי <code>shared_ptr</code> מבלי להעלות את מונה ההפניות.
          <br><strong>מדוע הוא הכרחי?</strong> אם אובייקט A מחזיק <code>shared_ptr</code> ל־B, ובמקביל B מחזיק <code>shared_ptr</code> ל־A, נוצר מעגל תלות: המונה של שניהם לעולם לא יוכל לרדת ל־0 ושניהם יישארו תקועים בערימה לנצח כזליגת זיכרון ענקית! הפתרון: שוברים את המעגל על ידי הפיכת אחת ההפניות ל־<code>weak_ptr</code>.
          <br><strong>כיצד ניגשים בבטחה?</strong> מכיוון שהמשאב עלול להשתחרר בכל רגע בידי שותפי ה־<code>shared_ptr</code>, אי אפשר לגשת אליו ישירות עם <code>*</code> או <code>-&gt;</code>. קוראים למתודה <code>lock()</code>: אם המשאב עודנו חי, מקבלים <code>shared_ptr</code> תקף ובטוח לשימוש; אם הוא כבר שוחרר (<code>expired() == true</code>), מקבלים מצביע ריק (<code>nullptr</code>).
        </li>
      </ul>

      <pre class="code"><code>#include &lt;iostream&gt;
#include &lt;memory&gt;

// 1. בעלות בלעדית:
auto p = std::make_unique&lt;int&gt;(7);
// auto p2 = p;             // שגיאת קומפילציה! העתקה אסורה
auto p2 = std::move(p);      // תקין: p2 הוא הבעלים החדש, p הפך ל-nullptr

// 2. בעלות משותפת:
auto a = std::make_shared&lt;int&gt;(3);  // מונה בעלים = 1
auto b = a;                          // מונה בעלים = 2

// 3. צופה ללא בעלות ושבירת מעגלים:
std::weak_ptr&lt;int&gt; w = a;            // אינו בעלים; מונה הבעלים נשאר 2 בדיוק!

// שימוש בטוח ב-weak_ptr דרך lock():
if (auto shared = w.lock()) {
    std::cout &lt;&lt; *shared &lt;&lt; "\\n";   // המשאב חי ובטוח לשימוש דרך shared
} else {
    std::cout &lt;&lt; "המשאב כבר שוחרר מהזיכרון!\\n";
}</code></pre>
      <p><strong>זהירות מתבקשת:</strong> מצביע גולמי יכול להביט על אובייקט, אך אסור לעולם ליצור ממנו שני בעלים חכמים נפרדים (למשל שני <code>unique_ptr</code> מאותו מצביע גולמי), כי כל אחד מהם ינסה להפעיל <code>delete</code> משלו, מה שיוביל להתרסקות בגלל שחרור כפול (Double Free).</p>
    `,
  }
);
