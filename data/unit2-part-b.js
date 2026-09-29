UNIT2.sections.push(
  {
    id: "build",
    title: "איך תוכנית נהפכת לקובץ הרצה",
    html: `
      <p>שלושה שלבים, לפי הסדר. בלי להבין אותם, שגיאות הפניה לא מוגדרת (undefined reference) ייראו כמו קסם.</p>
      <h3>1. עיבוד מקדים (preprocessing)</h3>
      <p>המעבד המקדים רץ לפני המהדר. <code>#include "frog.h"</code> משלב את תוכן הכותרת בקובץ המקור; הקובץ לאחר ההכללות נקרא יחידת תרגום (translation unit). גם <code>#include &lt;iostream&gt;</code> משלב כותרת מהספרייה. מונעי הכללה (include guards), כמו <code>#ifndef</code> או <code>#pragma once</code>, מונעים הכללה חוזרת באותה יחידת תרגום. כלל ההגדרה האחת (One Definition Rule, ODR) דורש שלהגדרה רגילה יהיה מימוש יחיד בתוכנית, ולכן הגדרה כזו בכותרת עלולה להיכלל בכמה קובצי cpp ולהפר את הכלל. פונקציה שמסומנת <code>inline</code> ותבנית (template), שהיא תיאור שממנו המהדר יוצר קוד לפי טיפוס, רשאיות להופיע באופן זהה בכמה יחידות תרגום ולכן מוגדרות בדרך כלל בכותרת.</p>
      <h3>2. הידור (compilation)</h3>
      <p>כל יחידת תרגום הופכת לקובץ אובייקט (object file) שמכיל קוד מכונה ומידע לקישור: <code>.obj</code> בחלונות, <code>.o</code> בלינוקס. המהדר בודק בה תחביר וטיפוסים, אך עדיין לא מחבר את יחידות התרגום זו לזו.</p>
      <h3>3. קישור (linking)</h3>
      <p>מחברים את כל קובצי האובייקט, ועוד ספריות, לקובץ הרצה אחד. אם קראתם לפונקציה שהוכרזה בכותרת אבל אף cpp לא מימש — כאן תקבלו שגיאת undefined reference.</p>
      <p>פיצול מקובל למחלקה (class) — טיפוס שמקבץ נתונים ופונקציות — הוא לשים את הגדרת המחלקה והצהרות הפונקציות בכותרת, ואת המימושים בקובץ cpp. בדוגמה, <code>Point</code> היא המחלקה ו־<code>Point(int, int)</code> הוא בנאי (constructor) שמאתחל אובייקט חדש:</p>
      <pre class="code"><code>// Point.h — הגדרת המחלקה והצהרות הפונקציות
#ifndef POINT_H
#define POINT_H
class Point {
    int x, y;
public:
    Point(int a, int b);
    int getX() const;
};
#endif

// Point.cpp  — מימוש
#include "Point.h"
Point::Point(int a, int b) : x(a), y(b) {}
int Point::getX() const { return x; }</code></pre>
      <p><code>Point::</code> אומר "הפונקציה הזו שייכת למחלקה Point". הרשימה <code>: x(a), y(b)</code> מאתחלת את השדות, ו־<code>const</code> מציין ש־<code>getX</code> אינה משנה אותם. <code>#ifndef</code> מונע שילוב כפול של אותה כותרת ביחידת תרגום אחת.</p>
    `,
  },
  {
    id: "libs",
    title: "ספריות (libraries) ומרחב שמות (namespace)",
    html: `
      <p>ספרייה (library) היא קוד וממשקים מוכנים לשימוש. חלק מהספריות מספקות קוד מהודר שמקשרים (link) לתוכנית, ואחרות ממומשות בכותרות. <code>&lt;iostream&gt;</code>, <code>&lt;string&gt;</code>, <code>&lt;memory&gt;</code> ו־<code>&lt;thread&gt;</code> הן כותרות שמספקות רכיבים של הספרייה התקנית (Standard Library), ולא תוכניות שמריצים לבדן.</p>
      <ul>
        <li><strong>מרחב שמות (namespace)</strong> — תיקייה לשמות. אם שתי ספריות מגדירות פונקציה בשם <code>find</code>, בלי מרחב שמות המהדר לא יודע לאיזו התכוונתם. <code>std::find</code> היא זו של הספרייה התקנית; <code>find</code> שלכם יכולה לחפש משהו אחר.</li>
        <li>הסטנדרט כמעט כולו תחת <code>std</code>.</li>
        <li><code>using namespace std;</code> מוסיף את שמות <code>std</code> לחיפוש שמות ללא קידומת בתחום שבו ההנחיה נכתבה. זה נוח בדף קטן אך עלול ליצור התנגשויות בפרויקט. בקורס: <code>std::string</code>.</li>
      </ul>
    `,
  },
  {
    id: "memory",
    title: "מודל הזיכרון בזמן ריצה (code, data, stack, heap)",
    html: `
      <p>במימוש טיפוסי, תהליך רץ משתמש בכמה אזורי זיכרון. זו תמונת עבודה שימושית, לא חלוקה שתקן C++ מחייב. תזכרו ארבעה:</p>
      <ul>
        <li><strong>מקטע קוד (code / text)</strong> — ההוראות שכבר תורגמו. בדרך כלל אינו ניתן לכתיבה. בהמשך נכיר מניעת ביצוע נתונים (Data Execution Prevention, DEP), שמונעת הרצת הוראות מאזורים כגון מחסנית הנתונים.</li>
        <li><strong>מקטע נתונים (data) ו־BSS</strong> — משמשים בדרך כלל למשתנים גלובליים וסטטיים, שחיים כל זמן ריצת התוכנית. ערכים שאינם אפס נשמרים בדרך כלל ב־data; משתנים שמאותחלים לאפס, גם במפורש, יכולים להישמר ב־BSS ולאפס אותם בעת הטעינה. המיקום המדויק תלוי במימוש.</li>
        <li><strong>מחסנית קריאות (call stack) ואחסון אוטומטי</strong> — מימוש טיפוסי יוצר לכל קריאה מסגרת שעשויה להכיל מקומיים, פרמטרים וכתובת חזרה. המהדר יכול גם לשמור ערכים ברגיסטרים או לוותר על מסגרת. האחסון האוטומטי מסתיים ביציאה מהבלוק.</li>
        <li><strong>ערימה / ערמה (זיכרון דינמי, heap)</strong> — <code>new</code>/<code>delete</code> (ב־C: malloc/free). בהקצאה ידנית, בעל הקצאה מוצלחת חייב לדאוג לשחרור מתאים. טעויות יוצרות דליפה, שימוש לאחר שחרור או שחרור כפול (double-free).</li>
      </ul>
      <pre class="code"><code>void demo() {
    int local = 1;                 // אחסון אוטומטי, מסתיים בסוף demo
    int* p = new int(5);           // p אוטומטי, המספר 5 בזיכרון דינמי
    std::cout &lt;&lt; *p;
    delete p;                      // שחרור הבעלות הידנית
    p = nullptr;                   // מפחית שימוש חוזר דרך p, אך לא מאפס עותקים אחרים
}</code></pre>
      <p>בנאי (constructor) מאתחל אובייקט, ומפרק (destructor) מסיים את חייו ומשחרר משאבים שבבעלותו. לאובייקט מקומי בעל אחסון אוטומטי, <code>Frog f;</code>, הבנאי רץ בהצהרה והמפרק רץ לבד בסוף הבלוק. בהקצאה דינמית, <code>Frog* f = new Frog;</code>, קריאת <code>delete f;</code> מפעילה את המפרק ומשחררת את הזיכרון.</p>
      <p>בקוד C++ מודרני מעדיפים בעלות אוטומטית: אובייקט מקומי, מכולה (container) שמנהלת אוסף ערכים, או מצביע בעלות יחידה <code>std::unique_ptr</code>. כך המפרק משחרר את המשאב גם ביציאה מוקדמת או בחריגה — יציאה לא רגילה עקב שגיאה. זהו עקרון <strong>רכישת משאב היא אתחול (Resource Acquisition Is Initialization, RAII)</strong>.</p>
      <p>מלכודת שמות במצגת: מחלקה בשם <code>Stack</code> אינה <strong>מחסנית הקריאות (call stack)</strong>. הראשונה היא טיפוס שאתם כותבים; השנייה היא מבנה זמן ריצה טיפוסי לקריאות פונקציה. בהמשך הקורס גם <code>SecureStack</code> יורש מ־<code>Stack</code>, כלומר מקבל ומרחיב את ההתנהגות שלו — ועדיין אינו מחסנית הקריאות של יחידה 3.</p>
      <p>כל מופע הוא עותק נפרד. שני אובייקטי <code>Stack</code> לא חולקים שדות — אלא אם שדה הוא מצביע לאותו בלוק בערימה. מצב זה נקרא העתקה רדודה (shallow copy), ויוסבר בהמשך.</p>
      <p>במעבדה למטה לחצו new ואז "יציאה מהפונקציה": תראו שהערימה נשארת. זה הסיפור של דליפה.</p>
      <div class="panel">
        <p><strong>למה שני אזורים (מחסנית וערימה).</strong> במודל הטיפוסי, מחסנית היא שולחן עבודה: אחסון של הקריאה הנוכחית מסתיים ביציאה, והוא מהיר ומוגבל. ערימה היא מחסן: מבקשים מדף (<code>new</code>) וחייבים להחזיר אותו (<code>delete</code>), אחרת נוצרת דליפה; החזרה פעמיים היא שחרור כפול (double-free). עקרון RAII קושר את המשאב לחיי אובייקט: רכישה באתחול ושחרור במפרק, גם ביציאה עקב חריגה.</p>
      </div>
    `,
  },
  {
    id: "class-first",
    title: "מחלקה ואובייקט — הצעד הראשון בתכנות מונחה עצמים (Object-Oriented Programming, OOP)",
    html: `
      <p>גם ב־C אפשר לקבץ נתונים במבנים ולפעול עליהם בעזרת פונקציות. C++ מוסיפה מחלקות שמקבצות את הנתונים והפעולות תחת טיפוס אחד: <strong>מחלקה (class)</strong> היא התבנית ("מה זה צפרדע"). <strong>אובייקט / מופע (object / instance)</strong> הוא הצפרדע החיה בזיכרון.</p>
      <p>לאובייקט יש מצב (state), כלומר ערכי השדות, והתנהגות (behavior), כלומר המתודות.</p>
      <pre class="code"><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class Frog {
public:
    std::string name;
    int strength;
    void hop() {
        std::cout &lt;&lt; name &lt;&lt; " hops\\n";
    }
};

int main() {
    Frog f1;
    f1.name = "Kermit";
    f1.strength = 100;
    f1.hop();
    return 0;
}</code></pre>
      <p><code>struct</code> ב־C++ כמעט זהה ל־class. ברירת המחדל לגישת חברים ולירושה היא <code>public</code> ב־struct ו־<code>private</code> ב־class. בהמשך נסתיר שדות.</p>
    `,
  },
  {
    id: "this-encap",
    title: "המצביע this, כימוס (encapsulation), והרשאות גישה",
    html: `
      <p>איך <code>hop</code> יודעת אם מדובר ב־f1 או ב־f2? מבחינה מושגית, מתודה מקבלת מצביע נסתר לאובייקט שעליו נקראה: <code>this</code>. לכן אפשר לחשוב על <code>f1.hop()</code> כאילו הועבר אליה <code>&amp;f1</code>, אף שזה אינו שכתוב C++ רגיל. בתוך המתודה, <code>name</code> הוא קיצור ל־<code>this-&gt;name</code>.</p>
      <p><strong>כימוס (encapsulation)</strong> מקבץ מצב והתנהגות ושולט בגישה אליהם. הרשאות הגישה (<code>public</code>, <code>private</code>, <code>protected</code>) הן הכלי שמסתיר פרטים. כך פונקציית קביעה (setter) יכולה לאסור רדיוס שלילי, ואפשר לשנות מימוש בלי לשבור קוראים.</p>
      <ul>
        <li><code>public</code> — כולם.</li>
        <li><code>private</code> — רק המחלקה עצמה, ומי שהמחלקה הכריזה עליו כ־<strong>חבר (friend)</strong>.</li>
        <li><code>protected</code> — המחלקה והיורשות, לא קוד שמחוץ להיררכיה. במבחן זו מלכודת מול private.</li>
      </ul>
      <p><code>friend class USocial;</code> (או חברות לפונקציה) היא הרשאה מפורשת: החבר ניגש ל־private/protected בלי להיות יורש. זו לא ירושה ולא public. במטלות OO זה מאפשר לרשת החברתית לאתחל <code>id</code> של משתמש בלי setter ציבורי.</p>
      <pre class="code"><code>class Circle {
    double r = 0;  // private כברירת מחדל ב-class
public:
    void setR(double x) {
        if (x &gt; 0) r = x;
    }
    double getR() const { return r; }
};</code></pre>
      <p><code>const</code> אחרי getR אומר שהמתודה אינה רשאית לשנות דרכה את השדות הרגילים של האובייקט. אפשר לקרוא לה על אובייקט קבוע.</p>
    `,
  }
);
