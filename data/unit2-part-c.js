UNIT2.sections.push(
  {
    id: "ctor",
    title: "בנאי (constructor), מפרק (destructor), וסדר החיים",
    html: `
      <p>ה<strong>בנאי (constructor)</strong> נקרא תמיד ביצירה. שמו כשם המחלקה, בלי טיפוס חוזר. שם מאתחלים שדות ומקצים משאבים.</p>
      <p>ה<strong>מפרק (destructor)</strong> נקרא תמיד בהריסה. שמו <code>~Point</code>. שם משחררים מה ש־new הקצה, סוגרים קובץ, וכו׳.</p>
      <pre class="code"><code>class Point {
    int x, y;
public:
    Point() { x = 0; y = 0; }           // בנאי ברירת מחדל
    Point(int a, int b) : x(a), y(b) {} // אתחול ברשימה — עדיף
    ~Point() { /* אין משאב דינמי — ריק בסדר */ }
};</code></pre>
      <p><code>: x(a), y(b)</code> היא רשימת אתחול. השדות נולדים עם הערך, לא "נוצרים ואז מושמים". חשוב במיוחד ל־const ולהפניות.</p>
      <p>על המחסנית: סוף הבלוק → מפרק אוטומטי. בערימה: רק ב־<code>delete</code>. שכחתם delete — המפרק לא רץ — דליפה.</p>
      <p>לא כל בנאי חייבים לכתוב. אם לא הכרזתם אף בנאי, המהדר מייצר בנאי ברירת מחדל בלי ארגומנטים. ברגע שהכרזתם בנאי כלשהו (למשל <code>Person(int)</code>), בנאי ברירת המחדל האוטומטי נעלם: <code>Person p;</code> לא מתקמפל עד שכותבים במפורש <code>Person() = default;</code> או בנאי ריק.</p>
      <p>מ־C++11: <code>= default</code> מבקש מהמהדר לייצר את המימוש הרגיל; <code>= delete</code> אוסר פעולה (למשל <code>Person(const Person&amp;) = delete;</code> אוסר העתקה). כתיבת בנאי רגיל אינה מוחקת את בנאי ההעתקה של המהדר — רק הכרזה או מחיקה מפורשת עושות זאת.</p>
      <p>בירושה (בהמשך): בנאי האב רץ קודם, אחר כך הבן. מפרקים בסדר הפוך: קודם הבן, אחר כך האב.</p>
    `,
  },
  {
    id: "copy",
    title: "העתקה רדודה (shallow) ועמוקה (deep), בנאי העתקה, השמה",
    html: `
      <p>במבחן קל לערבב שתי שורות שנראות כמעט אותו דבר. ההבדל הוא אם האובייקט משמאל כבר חי.</p>
      <pre class="code"><code>Person p1("Alice", 20);

Person p2 = p1;   // בנאי העתקה: p2 נולד עכשיו
Person p3(p1);    // גם זה בנאי העתקה

Person p4("Bob", 25);
p4 = p1;          // אופרטור השמה: p4 כבר היה קיים</code></pre>
      <p><code>Person p2 = p1</code> היא הצהרה והשמה באותה שורה. נוצר אובייקט חדש, ואין זיכרון ישן לשחרר. <code>Person p3(p1)</code> הוא אותו בנאי העתקה, רק בלי סימן השווה. <code>p4 = p1</code> ממלא אובייקט שכבר הוקצה. כאן כן צריך לטפל במשאב הישן של p4, ולבדוק השמה עצמית.</p>
      <p>אם לא כתבתם את הפונקציות האלה, המהדר מעתיק שדה־שדה. ל־<code>int</code> זה מתאים. למצביע שהוקצה ב־<code>new</code> זו <strong>העתקה רדודה (Shallow Copy)</strong>: מועתקת רק הכתובת. שני האובייקטים מצביעים לאותו בלוק בערימה. המפרק של הראשון עושה <code>delete</code>, והשני נשאר עם מצביע יתום (Dangling Pointer). כשהשני נהרס, הוא משחרר את אותו בלוק שוב. זו שגיאת שחרור כפול (Double Free).</p>
      <p><strong>העתקה עמוקה (Deep Copy)</strong> מקצה בלוק חדש ומעתיקה אליו את התוכן. לכל אובייקט בעלות משלו, והמפרק של אחד לא נוגע בשני.</p>
      <p>במעבדה: העתיקו רדוד, מחקו את a, וראו שגם b מצביע למת.</p>
      <div class="panel">
        <p><strong>איך לזכור במבחן.</strong> אם השם משמאל מופיע בפעם הראשונה באותה שורה, זה בנאי העתקה. אם השם כבר הוצהר למעלה, זו השמה. בנאי העתקה לא משחרר ישן, כי אין ישן. השמה כן.</p>
      </div>
    `,
  },
  {
    id: "rule3",
    title: "כלל השלוש (Rule of Three), כלל החמישה, והשמה עצמית",
    html: `
      <p>אם מחלקה מחזיקה משאב דינמי, למשל מצביע מ־<code>new</code>, המהדר לא יודע לשכפל או לשחרר אותו בבטחה. ברירת המחדל שלו היא העתקה רדודה. ברגע שכותבים ידנית אחת מפונקציות הבעלות, צריך את כולן.</p>
      <p><strong>כלל השלוש (Rule of Three):</strong> אם מימשתם אחד משלושת אלה, מממשים את שלושתם:</p>
      <ul>
        <li>מפרק: <code>~MyClass()</code></li>
        <li>בנאי העתקה: <code>MyClass(const MyClass&amp; other)</code></li>
        <li>אופרטור השמת העתקה: <code>MyClass&amp; operator=(const MyClass&amp; other)</code></li>
      </ul>
      <p><strong>כלל החמישה (Rule of Five)</strong> נוסף ב־C++11, כשהשפה קיבלה העברה (Move Semantics) דרך הפניה לערך ימני (<code>&amp;&amp;</code>). לשלוש הפונקציות מצטרפות שתיים, כדי לא להעתיק בלוק גדול כשאפשר פשוט לגנוב את הבעלות מאובייקט זמני:</p>
      <ul>
        <li>בנאי העברה: <code>MyClass(MyClass&amp;&amp; other) noexcept</code></li>
        <li>אופרטור השמת העברה: <code>MyClass&amp; operator=(MyClass&amp;&amp; other) noexcept</code></li>
      </ul>
      <p>עדיף לא לכתוב את החמש ידנית. אם המשאב יושב ב־<code>std::string</code>, ב־<code>std::vector</code> או במצביע חכם, המהדר כבר מקבל העתקה והעברה נכונות.</p>
      <h3>השמה עצמית (Self-Assignment)</h3>
      <p>באופרטור השמה חובה לשאול אם שמים את האובייקט לתוך עצמו, כמו <code>a = a</code>. בלי הבדיקה, <code>delete</code> משחרר את הבלוק של <code>this</code>, וזה גם הבלוק של <code>other</code>, כי זה אותו אובייקט. אחר כך מנסים להעתיק מזיכרון שכבר שוחרר.</p>
      <pre class="code"><code>MyBuffer&amp; MyBuffer::operator=(const MyBuffer&amp; other) {
    if (this == &amp;other)
        return *this;
    delete[] m_data;
    m_size = other.m_size;
    m_data = new char[m_size];
    std::memcpy(m_data, other.m_data, m_size);
    return *this;
}</code></pre>
      <p><code>return *this</code> מאפשר שרשור: <code>a = b = c</code>. גם אחרי בדיקת ההשמה העצמית, אם <code>new</code> נכשל אחרי ה־<code>delete</code>, האובייקט נשאר עם מצביע שכבר שוחרר. לכן בטוח יותר להקצות את העותק החדש קודם, או להשתמש ב־copy-and-swap, ורק אז להחליף.</p>
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
    title: "ירושה (inheritance) והכלה (composition): is-a מול has-a",
    html: `
      <p>שאלה אחת: המחלקה החדשה <strong>היא סוג של</strong> משהו, או ש<strong>יש לה</strong> משהו?</p>
      <ul>
        <li>תפוח הוא פרי → ירושה (<code>class Apple : public Fruit</code>).</li>
        <li>לבית יש חלונות → הכלה (שדה <code>std::list&lt;Window&gt;</code>).</li>
        <li>מעגל הוא צורה → ירושה.</li>
        <li>מכונית היא כלי רכב ויש לה גלגלים → ירושה מ־Vehicle והכלה של Wheel[4].</li>
        <li>ריבוע ומלבן: במילון ריבוע הוא מלבן. בקוד, אם מלבן מאפשר רוחב ≠ גובה, יורש שכופה שוויון שובר ציפיות. לא כל is-a מילוני הוא ירושה טובה.</li>
      </ul>
      <p>ירושה נותנת שימוש חוזר בלי לשנות את מחלקת האב, ויוצרת היררכיה. האובייקט היורש מכיל בזיכרון קודם את שדות האב, אחר כך את שלו. במצגת: <code>SecureStack</code> יורש מ־<code>Stack</code> ומוסיף <code>_secretkey</code> — בפריסה מופיע מפתח אחרי שדות המחסנית, לא במקומם.</p>
      <p>הכלה משתמשת במחלקה קיימת בלי להרחיב אותה מבחוץ — "יש לי" לא "אני סוג של".</p>
      <div class="panel">
        <p><strong>למה is-a מול has-a.</strong> ירושה = "מעגל הוא צורה", כדי לצייר רשימת צורות בלי לדעת את הסוג (עם virtual). הכלה = "למכונית יש מנוע", כי מכונית אינה סוג של מנוע. בחירה לא נכונה יוצרת יהלום, חיתוך אובייקט, או מחלקה שיודעת יותר מדי. במבחן: נמקו ביחס, לא לפי "בא לי לחסוך הקלדה".</p>
      </div>
    `,
  },
  {
    id: "hide-over",
    title: "הסתרה (hiding), דריסה (override), וסדר בנאים",
    html: `
      <p><strong>הסתרה (hiding):</strong> במחלקה יורשת פונקציה באותו שם. החתימה לא חייבת להיות זהה, ואין חובה ב־virtual. אם קוראים דרך מצביע לטיפוס האב — רצה של האב (קישור מוקדם).</p>
      <p><strong>דריסה (override):</strong> אותו שם, אותה חתימה, והפונקציה באב <code>virtual</code>. בזמן ריצה נבחר המימוש לפי האובייקט האמיתי.</p>
      <pre class="code"><code>struct Ink {
    void print() { std::cout &lt;&lt; "ink\\n"; }
};
struct Laser : Ink {
    void print() { std::cout &lt;&lt; "laser\\n"; }  // הסתרה, לא virtual
};
Ink* p = new Laser();
p-&gt;print();  // מדפיס ink — הפתעה למי שציפה לפולימורפיזם
delete p;    // בלי זה: דליפה. ובלי מפרק וירטואלי באב — גם הריסה חלקית</code></pre>
      <p>הקצאת <code>new</code> בלי <code>delete</code> (או מצביע חכם) היא דליפה. דוגמת ההסתרה למעלה מדגימה קישור מוקדם; היא אינה פוטרת מבעלות על הערימה.</p>
      <p>סדר: <code>new Baz()</code> אם Baz יורש Bar יורש Foo → Foo::Foo, Bar::Bar, Baz::Baz. ב־delete: Baz::~Baz, Bar::~Bar, Foo::~Foo.</p>
      <p><strong>מפרק וירטואלי (virtual destructor):</strong> כשמוחקים אובייקט של מחלקה נגזרת דרך מצביע למחלקת הבסיס, המפרק של הבסיס חייב להיות <code>virtual</code>. בלי זה רץ רק המפרק של הבסיס. המפרק של הנגזרת לא נקרא, והזיכרון שהיא הקצתה נשאר תלוי.</p>
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
delete ptr;  // בלי virtual ~Base(), ~Derived לא רץ</code></pre>
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
      <p>ל־Mule יש <em>שתי</em> תתי־חיה. זו <strong>בעיית היהלום (diamond problem)</strong>: בסיס משותף מגיע פעמיים. הקריאה דו־משמעית. בקורס מעדיפים להימנע מהמבנה. אם בכל זאת יש בסיס משותף אחד, ירושה וירטואלית במחלקות הביניים משאירה עותק אחד של הבסיס:</p>
      <pre class="code"><code>struct Animal { void kick(); };
struct Donkey : virtual Animal {};
struct Horse : virtual Animal {};
struct Mule : Donkey, Horse {};
Mule m;
m.kick();  // עותק אחד של Animal, הקריאה חד-משמעית</code></pre>
    `,
  }
);
