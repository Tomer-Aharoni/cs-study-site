UNIT2.sections.push(
  {
    id: "ctor",
    title: "בנאי (constructor), מפרק (destructor), וסדר החיים",
    html: `
      <p>ה<strong>בנאי (constructor)</strong> נקרא תמיד ביצירה. שמו כשם המחלקה, בלי טיפוס חוזר. שם מאתחלים שדות ומקצים משאבים.</p>
      <p>ה<strong>מפרק (destructor)</strong> נקרא כשהאובייקט נהרס. שמו <code>~PacketHeader</code>. שם משחררים משאבים שבבעלות האובייקט, למשל זיכרון שהוא עצמו הקצה או קובץ שהוא פתח. למפרק אין פרמטרים, ואי אפשר להעמיס אותו: למחלקה יש מפרק אחד.</p>
      <pre class="code"><code>class PacketHeader {
    int protocolId;
    int payloadLength;
public:
    PacketHeader() : protocolId(0), payloadLength(0) {}                     // בנאי ברירת מחדל
    PacketHeader(int proto, int len) : protocolId(proto), payloadLength(len) {} // אתחול ברשימה — עדיף
    ~PacketHeader() { /* אין משאב דינמי — ריק בסדר */ }
};</code></pre>
      <p><code>: protocolId(proto), payloadLength(len)</code> היא רשימת אתחול. השדות נולדים עם הערך, לא "נוצרים ואז מושמים". חשוב במיוחד ל־const ולהפניות.</p>
      <p>על המחסנית: סוף הבלוק → מפרק אוטומטי. אובייקט שנוצר ידנית בערימה באמצעות <code>new</code> נהרס בקריאת <code>delete</code>; מצביע חכם יכול לבצע אותה אוטומטית. שכחתם לשחרר אובייקט בניהול ידני — המפרק לא רץ ונוצרת דליפה.</p>
      <p>לא כל בנאי חייבים לכתוב. אם לא הכרזתם אף בנאי, המהדר מייצר בנאי ברירת מחדל בלי ארגומנטים. ברגע שהכרזתם בנאי כלשהו (למשל <code>Session(int)</code>), בנאי ברירת המחדל האוטומטי נעלם: <code>Session s;</code> לא מתקמפל עד שכותבים במפורש <code>Session() = default;</code> או בנאי ריק.</p>
      <p>מ־C++11: <code>= default</code> מבקש מהמהדר לייצר את המימוש הרגיל; <code>= delete</code> אוסר פעולה (למשל <code>Session(const Session&amp;) = delete;</code> אוסר העתקה). כתיבת בנאי רגיל לבדה אינה מוחקת את בנאי ההעתקה, אך הוא עשוי להימחק אוטומטית אם אחד השדות אינו ניתן להעתקה או אם המחלקה הכריזה על פעולת העברה.</p>
      <p>בירושה (בהמשך): בנאי האב רץ קודם, אחר כך הבן. מפרקים בסדר הפוך: קודם הבן, אחר כך האב.</p>
    `,
  },
  {
    id: "copy",
    title: "העתקה רדודה (Shallow Copy) והעתקה עמוקה (Deep Copy), בנאי העתקה והשמה",
    html: `
      <p>במבחן קל לערבב שתי שורות שנראות כמעט אותו דבר. ההבדל הוא אם האובייקט משמאל כבר חי.</p>
      <pre class="code"><code>Session s1("admin", 1001);

Session s2 = s1;   // בנאי העתקה: s2 נולד עכשיו
Session s3(s1);    // גם זה בנאי העתקה

Session s4("guest", 2002);
s4 = s1;          // אופרטור השמה: s4 כבר היה קיים</code></pre>
      <p>כדי להבין את ההבדל מהיסוד (Zero Assumptions), נשתמש באנלוגיה אינטואיטיבית:</p>
      <ul>
        <li><strong>בנאי העתקה (Copy Constructor):</strong> יצירת אובייקט סשן חדש לגמרי שהוא שכפול מדויק של סשן קיים. האובייקט לא היה קיים שנייה קודם לכן — הוא נברא ברגע זה ממש! לכן אין לו שום עבר, אין לו משאבים קודמים שצריך לנקות, אלא רק להקצות לעצמו זיכרון ולהעתיק לתוכו את פרטי המקור.</li>
        <li><strong>אופרטור השמה (Copy Assignment Operator):</strong> עדכון כולל של אובייקט סשן קיים כדי שפרטיו יהיו זהים לאלו של סשן אחר. האובייקט כבר קיים ומחזיק משאבים ישנים בזיכרון. כדי להעתיק לתוכו תוכן חדש, חייבים קודם כל לפנות ולשחרר את המשאבים הישנים (שחרור הזיכרון הישן), ורק אז להכניס את התוכן החדש — תוך בדיקת השמה עצמית כדי לא למחוק בטעות את המשאב של עצמנו!</li>
      </ul>
      <p>לכן, שורת הקוד <code>Session s2 = s1;</code> נקראת <strong>אתחול בהעתקה (Copy Initialization)</strong>: למרות סימן השווה, זו אינה השמה! נוצר כאן אובייקט חדש לחלוטין ולכן נקרא בנאי ההעתקה. הכתיבה <code>Session s3(s1);</code> עושה בדיוק את אותו הדבר בתחביר ישיר. לעומת זאת, <code>s4 = s1;</code> מתבצע על אובייקט <code>s4</code> שכבר נבנה קודם לכן, ולכן מפעיל את אופרטור ההשמה.</p>
      
      <h3>העתקה רדודה (Shallow Copy) מול העתקה עמוקה (Deep Copy)</h3>
      <p>אם לא כתבתם בנאי העתקה או אופרטור השמה בעצמכם, המהדר מייצר מימוש ברירת מחדל שמעתיק שדה־אחר־שדה (Member-wise Copy). עבור מספרים פשוטים כמו <code>int</code> זה מצוין. אך כאשר המחלקה מחזיקה במצביע לזיכרון דינמי בערימה (שהוקצה עם <code>new</code>), מתרחשת <strong>העתקה רדודה (Shallow Copy)</strong>:</p>
      <p><strong>אנלוגיית הפתק:</strong> במקום לשכפל את החוצץ עצמו, מעתיקים רק פתק שבו רשומה כתובת הזיכרון של החוצץ. עכשיו שני אובייקטים נפרדים מחזיקים בכתובת המצביעה לאותו חוצץ יחיד בערימה!</p>
      <p><strong>שרשרת הכשלים של העתקה רדודה:</strong></p>
      <ol>
        <li>שני אובייקטים נפרדים מצביעים על אותו בלוק זיכרון בערימה.</li>
        <li>האובייקט הראשון מסיים את חייו ונהרס — המפרק (Destructor) שלו מופעל ומשחרר את הזיכרון (<code>delete</code>).</li>
        <li>האובייקט השני נשאר עם <strong>מצביע יתום (Dangling Pointer)</strong> שמצביע לאזור זיכרון שכבר שוחרר.</li>
        <li>כשהאובייקט השני מסיים את חייו, המפרק שלו מנסה לשחרר בשנית את אותו אזור זיכרון — מתרחש כשל קטלני של <strong>שחרור כפול (Double Free)</strong> שמרסק את התוכנית!</li>
      </ol>
      <p><strong>הפתרון — העתקה עמוקה (Deep Copy):</strong> במקום להעתיק את הכתובת בלבד, מקצים בלוק זיכרון חדש ועצמאי בערימה, ומעתיקים לתוכו את כל תוכן הנתונים. לכל אובייקט יש בעלות בלעדית על בלוק משלו, והשחרור של אחד לעולם אינו משפיע על האחר.</p>
      <div class="panel">
        <p><strong>כלל הברזל למבחן:</strong></p>
        <ul>
          <li><strong>הצהרה + השמה באותה שורה (<code>Session s2 = s1;</code> או <code>Session s3(s1);</code>):</strong> &larr; <strong>בנאי העתקה (Copy Constructor)!</strong> (נולד אובייקט חדש, אין זיכרון ישן לפנות).</li>
          <li><strong>השמה לתוך אובייקט שכבר הוגדר קודם (<code>s4 = s1;</code>):</strong> &larr; <strong>אופרטור השמה (Copy Assignment Operator)!</strong> (האובייקט כבר חי, חובה לפנות את זיכרונו הישן).</li>
        </ul>
      </div>
      <h3>שאלת תרגול</h3>
      <p>איזה מנגנון מופעל בכל אחת מהשורות המסומנות?</p>
      <pre class="code"><code>Session s1("admin", 1001);
Session s2 = s1;   // שורה 1
Session s3("guest", 2002);
s3 = s1;          // שורה 2</code></pre>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p>בדקו אם בשורה נוצר אובייקט חדש שלא היה קיים קודם, או שמבצעים השמה לתוך אובייקט שכבר נבנה.</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body">
        <p><strong>שורה 1</strong> מפעילה את <strong>בנאי ההעתקה</strong>. יש שם <code>=</code>, אבל זו הצהרה על <code>s2</code> שנבנה מ־<code>s1</code>.</p>
        <p><strong>שורה 2</strong> מפעילה את <strong>אופרטור ההשמה</strong>. <code>s3</code> כבר היה קיים, ולכן משחררים את המשאב הישן שלו (אחרי בדיקת השמה עצמית) ומעתיקים לתוכו את התוכן של <code>s1</code>.</p>
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
      <h3>השמה עצמית (Self-Assignment) — מלכודת מבחן קלאסית</h3>
      <p>אופרטור השמה חייב להיות בטוח גם כשמשייכים את האובייקט לתוך עצמו, כגון <code>a = a;</code> (או בעקיפין דרך מצביעים: <code>*ptr1 = *ptr2;</code> כשהם מצביעים לאותו אובייקט). בלעדי בדיקת השמה עצמית (<code>if (this == &amp;other)</code>), השלב הבא יבצע <code>delete[] m_data</code> על החוצץ של <code>this</code> — שהוא בדיוק אותו החוצץ של <code>other</code>! מיד אחר כך הפונקציה תנסה להעתיק מתוכו ב־<code>memcpy</code>, מה שיוביל לכשל חמור של <strong>שימוש לאחר שחרור (Use-After-Free)</strong> והעתקת נתונים מושחתים.</p>
      <p><strong>ארבעת שלבי הברזל במימוש אופרטור השמה:</strong></p>
      <ol>
        <li><strong>בדיקת השמה עצמית:</strong> <code>if (this == &amp;other) return *this;</code> — חובה קריטית למניעת שחרור עצמי ו־Use-After-Free!</li>
        <li><strong>שחרור משאב ישן:</strong> <code>delete[] m_data;</code> — מניעת זליגת הזיכרון של היעד.</li>
        <li><strong>הקצאה עמוקה (Deep Copy):</strong> הקצאת חוצץ חדש והעתקת תוכן המקור (למשל עם <code>std::memcpy</code>).</li>
        <li><strong>החזרת הפניה לעצמנו:</strong> <code>return *this;</code> — מאפשר שרשור השמות כגון <code>a = b = c;</code>.</li>
      </ol>
      <pre class="code"><code>MyBuffer&amp; MyBuffer::operator=(const MyBuffer&amp; other) {
    // 1. בדיקת השמה עצמית - קריטי במבחן!
    if (this == &amp;other)
        return *this;

    // 2. שחרור הזיכרון הישן של האובייקט הנוכחי
    delete[] m_data;

    // 3. הקצאה עמוקה (Deep Copy) של הזיכרון החדש
    m_size = other.m_size;
    m_data = new char[m_size];
    std::memcpy(m_data, other.m_data, m_size);

    // 4. החזרת הפניה לעצמנו (מאפשר שרשור a = b = c)
    return *this;
}</code></pre>
      <p><code>return *this</code> מאפשר שרשור: <code>a = b = c</code>. גם אחרי בדיקת ההשמה העצמית, אם <code>new</code> נכשל אחרי ה־<code>delete</code>, האובייקט נשאר עם מצביע שכבר שוחרר. לכן בטוח יותר להקצות את העותק החדש קודם. אפשר גם להשתמש ב<strong>העתקה והחלפה (Copy-and-Swap)</strong>: בונים עותק זמני תקין ורק אז מחליפים איתו את השדות.</p>
      <p>העמסת אופרטורים על טיפוס בלי משאב דינמי פשוטה יותר. <code>+</code> מחזיר אובייקט חדש, והשמה מעתיקה שדות ומחזירה <code>*this</code>:</p>
      <pre class="code"><code>BandwidthUsage BandwidthUsage::operator+(const BandwidthUsage&amp; o) const {
    return BandwidthUsage(downloadBytes + o.downloadBytes, uploadBytes + o.uploadBytes);
}
BandwidthUsage&amp; BandwidthUsage::operator=(const BandwidthUsage&amp; o) {
    if (this == &amp;o) return *this;
    downloadBytes = o.downloadBytes;
    uploadBytes = o.uploadBytes;
    return *this;
}</code></pre>
      <p>אז <code>usage3 = usage1 + usage2</code> קריא ואינטואיטיבי. מאחורי הקלעים זו קריאת פונקציה.</p>
    `,
  },
  {
    id: "inherit",
    title: "ירושה (inheritance) והכלה (composition): הוא־סוג־של (is-a) מול יש־לו (has-a)",
    html: `
      <p>שאלה אחת: המחלקה החדשה <strong>היא סוג של</strong> משהו, או ש<strong>יש לה</strong> משהו?</p>
      <ul>
        <li>שקע TCP הוא שקע רשת (is-a) → ירושה (<code>class TCPSocket : public NetworkSocket</code>).</li>
        <li>לשרת (Server) יש שקע האזנה ורשימת חיבורים (has-a) → הכלה (שדה <code>std::vector&lt;ClientSession&gt;</code>).</li>
        <li>ערוץ מוצפן הוא ערוץ תקשורת (is-a) → ירושה (<code>class EncryptedChannel : public NetworkChannel</code>).</li>
        <li>לשרת אבטחה יש מנהל מפתחות והתקן הצפנה (has-a) → הכלה של <code>KeyVault</code> ושל <code>CipherEngine</code>.</li>
        <li>ריבוע ומלבן: במילון ריבוע הוא מלבן. בקוד, אם מלבן מאפשר רוחב ≠ גובה, יורש שכופה שוויון שובר ציפיות (עקרון ההחלפה של ליסקוב - Liskov Substitution Principle). לא כל is-a מילוני הוא ירושה טובה.</li>
      </ul>
      <p>ירושה נותנת שימוש חוזר בלי לשנות את מחלקת האב, ויוצרת היררכיה. מבחינה רעיונית, אובייקט נגזר כולל תת־אובייקט של האב ואת השדות שלו. במודל הפריסה הפשוט שמופיע במצגת, <code>SecureStack</code> יורש מ־<code>Stack</code> ומוסיף <code>_secretkey</code>, ולכן המפתח מוצג אחרי שדות המחסנית. תקן C++ אינו מבטיח סדר בתים כללי כזה, במיוחד בירושה מרובה או וירטואלית.</p>
      <p>הכלה משתמשת במחלקה קיימת בלי להרחיב אותה מבחוץ — "יש לי" לא "אני סוג של".</p>
      <div class="panel">
        <p><strong>למה הוא־סוג־של (is-a) מול יש־לו (has-a).</strong> ירושה = "EncryptedChannel הוא NetworkChannel", כדי לעבד רשימת ערוצי תקשורת בלי לדעת את הסוג הספציפי בעזרת פונקציה וירטואלית (Virtual Function), שבוחרת מימוש בזמן ריצה. הכלה = "לשרת יש שקע האזנה", כי שרת אינו סוג של שקע. שימוש מיותר בירושה עלול להוביל למבנים מורכבים כמו בסיס משותף שמגיע משני מסלולים, או לאובדן חלק הנגזרת בהעתקה לפי ערך; שני המקרים מוסברים בהמשך. במבחן: נמקו ביחס, לא לפי "בא לי לחסוך הקלדה".</p>
      </div>
    `,
  },
  {
    id: "hide-over",
    title: "הסתרה (hiding), דריסה (override), וסדר בנאים",
    html: `
      <p><strong>הסתרה (hiding):</strong> במחלקה יורשת פונקציה באותו שם. החתימה לא חייבת להיות זהה, ואין חובה ב־virtual. אם קוראים דרך מצביע לטיפוס האב, רצה הפונקציה של האב בגלל <strong>קישור מוקדם (Early Binding)</strong>: הבחירה נעשית בזמן ההידור לפי הטיפוס הסטטי של המצביע.</p>
      <p><strong>דריסה (override):</strong> אותו שם, אותה חתימה, והפונקציה באב <code>virtual</code>. בזמן ריצה נבחר המימוש לפי האובייקט האמיתי.</p>
      <pre class="code"><code>struct NetworkChannel {
    void send() { std::cout &lt;&lt; "plaintext transmission\\n"; }
};
struct EncryptedChannel : NetworkChannel {
    void send() { std::cout &lt;&lt; "encrypted transmission\\n"; }  // הסתרה, לא virtual!
};
EncryptedChannel secureChan;
NetworkChannel* p = &amp;secureChan;
p-&gt;send();  // מדפיס plaintext transmission — סיכון אבטחה והפתעה למי שציפה לפולימורפיזם!
// אין new, ולכן אין כאן בעלות או delete</code></pre>
      <p>דוגמת ההסתרה מדגימה סיכון אבטחה מובהק: המפתח חשב שהקריאה תשלח מידע מוצפן (<code>encrypted transmission</code>), אך מאחר שהפונקציה בבסיס לא הוגדרה כ־<code>virtual</code>, הקישור המוקדם (Early Binding) של המהדר קרא ישירות למימוש הבסיסי שמשדר בטקסט גלוי (<code>plaintext transmission</code>)! דוגמה זו משתמשת באובייקט מקומי כדי להתמקד בקישור המוקדם בלי לערב ניהול זיכרון. אם מקצים באמצעות <code>new</code>, צריך להגדיר בעלות ולשחרר בבטחה, בדרך כלל באמצעות מצביע חכם.</p>
      <p>סדר: <code>new Baz()</code> אם Baz יורש Bar יורש Foo → Foo::Foo, Bar::Bar, Baz::Baz. ב־delete: Baz::~Baz, Bar::~Bar, Foo::~Foo.</p>
      <p><strong>מפרק וירטואלי (Virtual Destructor) ומניעת זליגת זיכרון בירושה — מלכודת בחינה קלאסית:</strong> זוהי אחת השאלות הנפוצות ביותר בבחינות (כגון שאלת מפתח במבחן 2021א מועד 74 שאלה 5). נבחן מה קורה כאשר מחזיקים מצביע מטיפוס מחלקת הבסיס שמצביע על אובייקט נגזר בערימה: <code>Base* ptr = new Derived();</code> ואז קוראים <code>delete ptr;</code>:</p>
      <ul>
        <li><strong>אם המפרק בבסיס אינו וירטואלי (<code>~Base()</code> רגיל):</strong> הקומפיילר מבצע <strong>קישור מוקדם (Early Binding)</strong> לפי טיפוס המצביע הסטטי (<code>Base*</code>). כתוצאה מכך, ייקרא המפרק <code>~Base</code> בלבד! המפרק של מחלקת הבן (<code>~Derived</code>) לעולם לא יופעל. אם מחלקת הבן הקצתה משאבים דינמיים בערימה (כגון מערך <code>new int[100]</code>), שורת השחרור <code>delete[] data</code> לא תרוץ לעולם &larr; <strong>זליגת זיכרון (Memory Leak)</strong> חמורה! (הערה: לפי תקן C++ הפורמלי, מחיקה כזו היא התנהגות לא־מוגדרת - Undefined Behavior).</li>
        <li><strong>אם המפרק בבסיס מוגדר וירטואלי (<code>virtual ~Base()</code>):</strong> מתבצע <strong>קישור דינמי (Dynamic Binding)</strong> בזמן ריצה דרך הטבלה הווירטואלית. מערכת הריצה מזהה שהאובייקט האמיתי הוא מסוג <code>Derived</code>. לכן מופעל קודם כול המפרק של הבן <code>~Derived</code> (ומשחרר את כל משאביו בבטחה), ולאחריו נקרא אוטומטית המפרק של האב <code>~Base</code>. כל הזיכרון משתחרר בשלמותו!</li>
      </ul>
      <pre class="code"><code>class Base {
public:
    virtual ~Base() {} // מפרק וירטואלי - קריטי כשמורישים!
};
class Derived : public Base {
    int* data;
public:
    Derived() { data = new int[100]; }
    ~Derived() override {
        delete[] data; // ישוחרר בוודאות רק אם ~Base וירטואלי!
    }
};

Base* ptr = new Derived();
delete ptr;  // בטוח לחלוטין: בזכות virtual נקרא קודם ~Derived ואז ~Base</code></pre>
    `,
  },
  {
    id: "diamond",
    title: "ירושה מרובה (multiple inheritance) ובעיית היהלום (diamond problem)",
    html: `
      <p>שפת C++ מאפשרת <strong>ירושה מרובה (Multiple Inheritance)</strong> — כלומר מחלקה שיורשת מיותר ממחלקת אב אחת. למשל, פרד (Mule) הוא שילוב של חמור (Donkey) ושל סוס (Horse). אך מה קורה כששני ההורים יורשים בעצמם מאותה מחלקת בסיס קדומה (Animal)?</p>
      <pre class="code"><code>struct Animal {
    int energy = 100;
    void kick() {}
};
struct Donkey : public Animal {};
struct Horse : public Animal {};
struct Mule : public Donkey, public Horse {};

Mule m;
m.kick();  // שגיאת קומפילציה! Member is ambiguous (דו-משמעי)</code></pre>
      <p><strong>מדוע הקומפיילר מתלונן? (הסבר ברמת הזיכרון):</strong></p>
      <p>מבנה ההורשה יוצר צורת מעוין (יהלום): <code>Animal</code> בראש, <code>Donkey</code> ו־<code>Horse</code> באמצע, ו־<code>Mule</code> בתחתית.
      בזיכרון, האובייקט <code>m</code> כולל תת־אובייקט של <code>Donkey</code> (שמכיל <code>Animal</code> משלו), וגם תת־אובייקט של <code>Horse</code> (שמכיל עוד <code>Animal</code> משלו!).
      התוצאה: בתוך <code>m</code> יש <strong>שני עותקים נפרדים של Animal</strong> בזיכרון! אם ננסה לגשת ל־<code>m.energy</code> או לקרוא ל־<code>m.kick()</code>, הקומפיילר אינו יודע לאיזה מבין שני עותקי הבסיס התכוונו.</p>
      
      <p><strong>הפתרון הפדגוגי — ירושה וירטואלית (Virtual Inheritance):</strong></p>
      <p>כדי לפתור זאת, מגדירים את הירושה של מחלקות הביניים כירושה וירטואלית באמצעות מילת המפתח <code>virtual</code>. בכך אנו מורים לקומפיילר: "אם מישהו יירש את שתינו, אנא ודא שקיים רק עותק אחד יחיד ומשותף של מחלקת הבסיס בזיכרון":</p>
      <pre class="code"><code>struct Donkey : virtual public Animal {}; // ירושה וירטואלית
struct Horse : virtual public Animal {};  // ירושה וירטואלית
struct Mule : public Donkey, public Horse {};

Mule m;
m.kick();  // תקין לחלוטין! קיים רק עותק אחד משותף של Animal</code></pre>
      <p><em>דוגמה קלאסית נוספת ממערכות:</em> מחלקת <code>Sender</code> ומחלקת <code>Receiver</code> שיורשות שתיהן ב־<code>virtual public Thread</code>, ומחלקת תקשורת <code>Messenger</code> שיורשת משתיהן — בזכות הירושה הווירטואלית, יש רק מופע <code>Thread</code> יחיד שמנוהל עבור ההודעה.</p>
    `,
  }
);
