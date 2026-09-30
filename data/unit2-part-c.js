UNIT2.sections.push(
  {
    id: "ctor",
    title: "בנאי (constructor), מפרק (destructor), וסדר החיים",
    html: `
      <p>ה<strong>בנאי (constructor)</strong> נקרא תמיד ביצירה. שמו כשם המחלקה, בלי טיפוס חוזר. שם מאתחלים שדות ומקצים משאבים.</p>
      <p>ה<strong>מפרק (destructor)</strong> נקרא כשהאובייקט נהרס. שמו <code>~Point</code>. שם משחררים משאבים שבבעלות האובייקט, למשל זיכרון שהוא עצמו הקצה או קובץ שהוא פתח. למפרק אין פרמטרים, ואי אפשר להעמיס אותו: למחלקה יש מפרק אחד.</p>
      <pre class="code"><code>class Point {
    int x, y;
public:
    Point() { x = 0; y = 0; }           // בנאי ברירת מחדל
    Point(int a, int b) : x(a), y(b) {} // אתחול ברשימה — עדיף
    ~Point() { /* אין משאב דינמי — ריק בסדר */ }
};</code></pre>
      <p><code>: x(a), y(b)</code> היא רשימת אתחול. השדות נולדים עם הערך, לא "נוצרים ואז מושמים". חשוב במיוחד ל־const ולהפניות.</p>
      <p>על המחסנית: סוף הבלוק → מפרק אוטומטי. אובייקט שנוצר ידנית בערימה באמצעות <code>new</code> נהרס בקריאת <code>delete</code>; מצביע חכם יכול לבצע אותה אוטומטית. שכחתם לשחרר אובייקט בניהול ידני — המפרק לא רץ ונוצרת דליפה.</p>
      <p>לא כל בנאי חייבים לכתוב. אם לא הכרזתם אף בנאי, המהדר מייצר בנאי ברירת מחדל בלי ארגומנטים. ברגע שהכרזתם בנאי כלשהו (למשל <code>Person(int)</code>), בנאי ברירת המחדל האוטומטי נעלם: <code>Person p;</code> לא מתקמפל עד שכותבים במפורש <code>Person() = default;</code> או בנאי ריק.</p>
      <p>מ־C++11: <code>= default</code> מבקש מהמהדר לייצר את המימוש הרגיל; <code>= delete</code> אוסר פעולה (למשל <code>Person(const Person&amp;) = delete;</code> אוסר העתקה). כתיבת בנאי רגיל לבדה אינה מוחקת את בנאי ההעתקה, אך הוא עשוי להימחק אוטומטית אם אחד השדות אינו ניתן להעתקה או אם המחלקה הכריזה על פעולת העברה.</p>
      <p>בירושה (בהמשך): בנאי האב רץ קודם, אחר כך הבן. מפרקים בסדר הפוך: קודם הבן, אחר כך האב.</p>
    `,
  },
  {
    id: "copy",
    title: "העתקה רדודה (Shallow Copy) והעתקה עמוקה (Deep Copy), בנאי העתקה והשמה",
    html: `
      <p>במבחן קל לערבב שתי שורות שנראות כמעט אותו דבר. ההבדל הוא אם האובייקט משמאל כבר חי.</p>
      <pre class="code"><code>Person p1("Alice", 20);

Person p2 = p1;   // בנאי העתקה: p2 נולד עכשיו
Person p3(p1);    // גם זה בנאי העתקה

Person p4("Bob", 25);
p4 = p1;          // אופרטור השמה: p4 כבר היה קיים</code></pre>
      <p><code>Person p2 = p1</code> היא <strong>אתחול בהעתקה (Copy Initialization)</strong>: למרות סימן השווה, זו אינה השמה. נוצר אובייקט חדש, ואין משאב ישן לשחרר. <code>Person p3(p1)</code> מפעיל את אותו בנאי העתקה, רק בלי סימן השווה. <code>p4 = p1</code> ממלא אובייקט שכבר נבנה. אם הוא בעל משאב, צריך לטפל במשאב הישן שלו ולוודא שההשמה בטוחה גם בהשמה עצמית.</p>
      <p>אם לא כתבתם את הפונקציות האלה, המהדר מעתיק שדה־שדה. ל־<code>int</code> זה מתאים. כאשר שדה הוא מצביע גולמי שבבעלות האובייקט ומצביע לבלוק שהוקצה ב־<code>new</code>, זו <strong>העתקה רדודה (Shallow Copy)</strong>: מועתקת רק הכתובת. שני האובייקטים חושבים שהם בעליו של אותו בלוק בערימה. המפרק של הראשון עושה <code>delete</code>, והשני נשאר עם מצביע יתום (Dangling Pointer). כשהשני נהרס, הוא מנסה לשחרר את אותו בלוק שוב. זו שגיאת שחרור כפול (Double Free). מצביע שאינו מייצג בעלות יכול להעתיק כתובת בכוונה, ולכן צריך להגדיר תחילה מי הבעלים.</p>
      <p><strong>העתקה עמוקה (Deep Copy)</strong> מקצה בלוק חדש ומעתיקה אליו את התוכן. לכל אובייקט בעלות משלו, והמפרק של אחד לא נוגע בשני.</p>
      <p>בתרשים זיכרון אפשר לעקוב בלי להריץ קוד מסוכן: אחרי העתקה רדודה <code>a</code> ו־<code>b</code> מחזיקים אותה כתובת; אחרי שחרור דרך <code>a</code>, הכתובת שב־<code>b</code> כבר אינה מצביעה לאובייקט חי ואסור לגשת דרכה.</p>
      <div class="panel">
        <p><strong>איך לזכור במבחן.</strong> אם השם משמאל מופיע בפעם הראשונה באותה שורה, זה בנאי העתקה. אם השם כבר הוצהר למעלה, זו השמה. בנאי העתקה לא משחרר ישן, כי אין ישן. השמה כן.</p>
      </div>
      <h3>שאלת תרגול</h3>
      <p>איזה מנגנון מופעל בכל אחת מהשורות המסומנות?</p>
      <pre class="code"><code>Person p1("Alice", 20);
Person p2 = p1;   // שורה 1
Person p3("Bob", 25);
p3 = p1;          // שורה 2</code></pre>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p>בדקו אם בשורה נוצר אובייקט חדש שלא היה קיים קודם, או שמבצעים השמה לתוך אובייקט שכבר נבנה.</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body">
        <p><strong>שורה 1</strong> מפעילה את <strong>בנאי ההעתקה</strong>. יש שם <code>=</code>, אבל זו הצהרה על <code>p2</code> שנבנה מ־<code>p1</code>.</p>
        <p><strong>שורה 2</strong> מפעילה את <strong>אופרטור ההשמה</strong>. <code>p3</code> כבר היה קיים, ולכן משחררים את המשאב הישן שלו (אחרי בדיקת השמה עצמית) ומעתיקים לתוכו את התוכן של <code>p1</code>.</p>
      </div></details>
    `,
  },
  {
    id: "rule3",
    title: "כלל השלוש (Rule of Three), כלל החמישה (Rule of Five), והשמה עצמית",
    html: `
      <p>אם מחלקה מחזיקה בבעלותה משאב דינמי, למשל דרך מצביע גולמי מ־<code>new</code>, המהדר לא יודע לשכפל או לשחרר אותו בבטחה. ברירת המחדל שלו היא העתקה רדודה. לכן, כשכותבים ידנית אחת מפונקציות הבעלות, בדרך כלל צריך להגדיר גם את האחרות או לאסור במפורש העתקה.</p>
      <p><strong>כלל השלוש (Rule of Three):</strong> אם מימשתם אחד משלושת אלה, בדקו אם צריך לממש או למחוק גם את האחרים:</p>
      <ul>
        <li>מפרק: <code>~MyClass()</code></li>
        <li>בנאי העתקה: <code>MyClass(const MyClass&amp; other)</code></li>
        <li>אופרטור השמת העתקה: <code>MyClass&amp; operator=(const MyClass&amp; other)</code></li>
      </ul>
      <p><strong>כלל החמישה (Rule of Five)</strong> נוסף ב־C++11, כשהשפה קיבלה <strong>סמנטיקת העברה (Move Semantics)</strong> דרך <strong>הפניה לערך ימני (Rvalue Reference)</strong>, שנכתבת <code>&amp;&amp;</code> ובדרך כלל מתייחסת לאובייקט זמני. לשלוש הפונקציות מצטרפות שתיים, כדי להעביר בעלות במקום להעתיק בלוק גדול. אחרי העברה אובייקט המקור עדיין תקף וניתן להריסה או להשמה מחדש, אך אין להניח מה ערכו:</p>
      <ul>
        <li>בנאי העברה: <code>MyClass(MyClass&amp;&amp; other) noexcept</code></li>
        <li>אופרטור השמת העברה: <code>MyClass&amp; operator=(MyClass&amp;&amp; other) noexcept</code></li>
      </ul>
      <p>עדיף לא לכתוב את החמש ידנית. זהו <strong>כלל האפס (Rule of Zero)</strong>: שומרים משאבים בתוך <code>std::string</code>, <code>std::vector</code> או מצביע חכם, ונותנים לפעולות שלהם לקבוע את התנהגות המחלקה. למשל, מחלקה שמכילה <code>std::unique_ptr</code> ניתנת להעברה אך אינה ניתנת להעתקה, וזה מכוון.</p>
      <h3>השמה עצמית (Self-Assignment)</h3>
      <p>אופרטור השמה חייב להיות בטוח גם כששמים את האובייקט לתוך עצמו, כמו <code>a = a</code>. בדיקה מפורשת היא דרך אחת לעשות זאת: בלעדיה, המימוש הבא היה משחרר את הבלוק של <code>this</code>, שהוא גם הבלוק של <code>other</code>, ואז מנסה להעתיק מזיכרון שכבר שוחרר. מימושים אחרים יכולים להיות בטוחים גם בלי בדיקה נפרדת.</p>
      <pre class="code"><code>MyBuffer&amp; MyBuffer::operator=(const MyBuffer&amp; other) {
    if (this == &amp;other)
        return *this;
    delete[] m_data;
    m_size = other.m_size;
    m_data = new char[m_size];
    std::memcpy(m_data, other.m_data, m_size);
    return *this;
}</code></pre>
      <p><code>return *this</code> מאפשר שרשור: <code>a = b = c</code>. גם אחרי בדיקת ההשמה העצמית, אם <code>new</code> נכשל אחרי ה־<code>delete</code>, האובייקט נשאר עם מצביע שכבר שוחרר. לכן בטוח יותר להקצות את העותק החדש קודם. אפשר גם להשתמש ב<strong>העתקה והחלפה (Copy-and-Swap)</strong>: בונים עותק זמני תקין ורק אז מחליפים איתו את השדות.</p>
      <p>העמסת אופרטורים על טיפוס בלי משאב דינמי פשוטה יותר. <code>+</code> מחזיר אובייקט חדש, והשמה מעתיקה שדות ומחזירה <code>*this</code>:</p>
      <pre class="code"><code>Point Point::operator+(const Point&amp; o) const {
    return Point(x + o.x, y + o.y);
}
Point&amp; Point::operator=(const Point&amp; o) {
    if (this == &amp;o) return *this;
    x = o.x;
    y = o.y;
    return *this;
}</code></pre>
      <p>אז <code>p3 = p1 + p2</code> קריא. מאחורי הקלעים זו קריאת פונקציה.</p>
    `,
  },
  {
    id: "inherit",
    title: "ירושה (inheritance) והכלה (composition): הוא־סוג־של (is-a) מול יש־לו (has-a)",
    html: `
      <p>שאלה אחת: המחלקה החדשה <strong>היא סוג של</strong> משהו, או ש<strong>יש לה</strong> משהו?</p>
      <ul>
        <li>תפוח הוא פרי → ירושה (<code>class Apple : public Fruit</code>).</li>
        <li>לבית יש חלונות → הכלה (שדה <code>std::list&lt;Window&gt;</code>).</li>
        <li>מעגל הוא צורה → ירושה.</li>
        <li>מכונית היא כלי רכב ויש לה גלגלים → ירושה מ־Vehicle והכלה של Wheel[4].</li>
        <li>ריבוע ומלבן: במילון ריבוע הוא מלבן. בקוד, אם מלבן מאפשר רוחב ≠ גובה, יורש שכופה שוויון שובר ציפיות. לא כל is-a מילוני הוא ירושה טובה.</li>
      </ul>
      <p>ירושה נותנת שימוש חוזר בלי לשנות את מחלקת האב, ויוצרת היררכיה. מבחינה רעיונית, אובייקט נגזר כולל תת־אובייקט של האב ואת השדות שלו. במודל הפריסה הפשוט שמופיע במצגת, <code>SecureStack</code> יורש מ־<code>Stack</code> ומוסיף <code>_secretkey</code>, ולכן המפתח מוצג אחרי שדות המחסנית. תקן C++ אינו מבטיח סדר בתים כללי כזה, במיוחד בירושה מרובה או וירטואלית.</p>
      <p>הכלה משתמשת במחלקה קיימת בלי להרחיב אותה מבחוץ — "יש לי" לא "אני סוג של".</p>
      <div class="panel">
        <p><strong>למה הוא־סוג־של (is-a) מול יש־לו (has-a).</strong> ירושה = "מעגל הוא צורה", כדי לצייר רשימת צורות בלי לדעת את הסוג בעזרת פונקציה וירטואלית (Virtual Function), שבוחרת מימוש בזמן ריצה. הכלה = "למכונית יש מנוע", כי מכונית אינה סוג של מנוע. שימוש מיותר בירושה עלול להוביל למבנים מורכבים כמו בסיס משותף שמגיע משני מסלולים, או לאובדן חלק הנגזרת בהעתקה לפי ערך; שני המקרים מוסברים בהמשך. במבחן: נמקו ביחס, לא לפי "בא לי לחסוך הקלדה".</p>
      </div>
    `,
  },
  {
    id: "hide-over",
    title: "הסתרה (hiding), דריסה (override), וסדר בנאים",
    html: `
      <p><strong>הסתרה (hiding):</strong> במחלקה יורשת פונקציה באותו שם. החתימה לא חייבת להיות זהה, ואין חובה ב־virtual. אם קוראים דרך מצביע לטיפוס האב, רצה הפונקציה של האב בגלל <strong>קישור מוקדם (Early Binding)</strong>: הבחירה נעשית בזמן ההידור לפי הטיפוס הסטטי של המצביע.</p>
      <p><strong>דריסה (override):</strong> אותו שם, אותה חתימה, והפונקציה באב <code>virtual</code>. בזמן ריצה נבחר המימוש לפי האובייקט האמיתי.</p>
      <pre class="code"><code>struct Ink {
    void print() { std::cout &lt;&lt; "ink\\n"; }
};
struct Laser : Ink {
    void print() { std::cout &lt;&lt; "laser\\n"; }  // הסתרה, לא virtual
};
Laser printer;
Ink* p = &amp;printer;
p-&gt;print();  // מדפיס ink — הפתעה למי שציפה לפולימורפיזם
// אין new, ולכן אין כאן בעלות או delete</code></pre>
      <p>דוגמת ההסתרה משתמשת באובייקט מקומי כדי להתמקד בקישור המוקדם בלי לערב ניהול זיכרון. אם מקצים באמצעות <code>new</code>, צריך להגדיר בעלות ולשחרר בבטחה, בדרך כלל באמצעות מצביע חכם.</p>
      <p>סדר: <code>new Baz()</code> אם Baz יורש Bar יורש Foo → Foo::Foo, Bar::Bar, Baz::Baz. ב־delete: Baz::~Baz, Bar::~Bar, Foo::~Foo.</p>
      <p><strong>מפרק וירטואלי (virtual destructor):</strong> כשמוחקים אובייקט של מחלקה נגזרת דרך מצביע למחלקת הבסיס, המפרק של הבסיס חייב להיות <code>virtual</code>. בלי מפרק וירטואלי, המחיקה דרך מצביע הבסיס היא <strong>התנהגות לא־מוגדרת (Undefined Behavior)</strong>; אי אפשר להניח שרק מפרק הבסיס ירוץ.</p>
      <pre class="code"><code>class Base {
public:
    virtual ~Base() {}
};
class Derived : public Base {
    int* data;
public:
    Derived() { data = new int[100]; }
    ~Derived() override { delete[] data; }
};
Base* ptr = new Derived();
delete ptr;  // בטוח: ~Base הוא virtual, ולכן ~Derived נקרא תחילה</code></pre>
    `,
  },
  {
    id: "diamond",
    title: "ירושה מרובה (multiple inheritance) ובעיית היהלום (diamond problem)",
    html: `
      <p>C++ מאפשר לרשת משתי מחלקות. פרד הוא חמור וגם סוס. נשמע הגיוני, ואז:</p>
      <pre class="code"><code>struct Animal { void kick(); };
struct Donkey : Animal {};
struct Horse : Animal {};
struct Mule : Donkey, Horse {};
Mule m;
m.kick();  // איזה kick? של המסלול דרך Donkey או Horse?</code></pre>
      <p>ל־Mule יש <em>שתי</em> תתי־חיה. זו <strong>בעיית היהלום (diamond problem)</strong>: בסיס משותף מגיע פעמיים. הקריאה דו־משמעית. בקורס מעדיפים להימנע מהמבנה. אם בכל זאת יש בסיס משותף אחד, <strong>ירושה וירטואלית (Virtual Inheritance)</strong> במחלקות הביניים משאירה עותק אחד של הבסיס:</p>
      <pre class="code"><code>struct Animal { void kick(); };
struct Donkey : virtual Animal {};
struct Horse : virtual Animal {};
struct Mule : Donkey, Horse {};
Mule m;
m.kick();  // עותק אחד של Animal, הקריאה חד-משמעית</code></pre>
    `,
  }
);
