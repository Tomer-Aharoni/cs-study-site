UNIT2.sections.push(
  {
    id: "build",
    title: "איך תוכנית נהפכת לקובץ הרצה",
    html: `
      <p>שלושה שלבים, לפי הסדר. בלי להבין אותם, שגיאות "undefined reference" ייראו כמו קסם.</p>
      <h3>1. עיבוד מקדים (preprocessor)</h3>
      <p>רץ לפני המהדר. <code>#include "frog.h"</code> משלב את תוכן הכותרת ביחידת התרגום; <code>#include &lt;iostream&gt;</code> משלב כותרת מהספרייה. מונעי הכללה (<code>#ifndef</code> או <code>#pragma once</code>) מונעים הכללה חוזרת באותה יחידת תרגום. הגדרה שאינה <code>inline</code> בכותרת עלולה להפר את כלל ההגדרה האחת (ODR) כאשר כמה קובצי cpp כוללים אותה; תבניות ופונקציות <code>inline</code> מוגדרות בדרך כלל בכותרת.</p>
      <h3>2. הידור (compilation)</h3>
      <p>כל קובץ <code>.cpp</code> הופך לקובץ מכונה: <code>.obj</code> בחלונות, <code>.o</code> בלינוקס. המהדר בודק תחביר וטיפוסים <em>בתוך הקובץ הזה</em>. הוא עדיין לא מחבר קבצים.</p>
      <h3>3. קישור (linkage)</h3>
      <p>מחברים את כל קבצי המכונה, ועוד ספריות, לקובץ הרצה אחד. אם קראתם לפונקציה שהוכרזה בכותרת אבל אף cpp לא מימש — כאן תקבלו undefined reference.</p>
      <p>פיצול מקובל למחלקה:</p>
      <pre class="code"><code>// Point.h  — רק הכרזות
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
      <p><code>Point::</code> אומר "הפונקציה הזו שייכת למחלקה Point". <code>#ifndef</code> מונע הדבקה כפולה של אותה כותרת.</p>
    `,
  },
  {
    id: "libs",
    title: "ספריות ומרחב שמות (namespace)",
    html: `
      <p>ספרייה היא קוד שכבר הודר. <strong>לא מריצים</strong> אותה לבד — <strong>קושרים</strong> (bind) אותה לתוכנית. דוגמאות מהספרייה התקנית (Standard Library): <code>iostream</code>, <code>string</code>, <code>memory</code>, <code>thread</code>.</p>
      <ul>
        <li><strong>מרחב שמות (namespace)</strong> — תיקייה לשמות. אם שתי ספריות מגדירות פונקציה בשם <code>find</code>, בלי מרחב שמות המהדר לא יודע לאיזו התכוונתם. <code>std::find</code> היא זו של הספרייה התקנית; <code>find</code> שלכם יכולה לחפש משהו אחר.</li>
        <li>הסטנדרט כמעט כולו תחת <code>std</code>.</li>
        <li><code>using namespace std;</code> פותח הכול גלובלית — נוח בדף קטן, מסוכן בפרויקט. בקורס: <code>std::string</code>.</li>
      </ul>
    `,
  },
  {
    id: "memory",
    title: "מודל הזיכרון בזמן ריצה (code, data, stack, heap)",
    html: `
      <p>אחרי שהתוכנית רצה, הזיכרון מחולק לאזורים. תזכרו ארבעה:</p>
      <ul>
        <li><strong>Code / text</strong> — ההוראות שכבר תורגמו. בדרך כלל לקריאה בלבד. תוקף שרוצה להריץ קוד מהמחסנית נתקל אחר כך ב־DEP (יחידה 3).</li>
        <li><strong>Data / BSS</strong> — משתנים גלובליים וסטטיים, שחיים כל זמן ריצת התוכנית. <strong>Data</strong>: יש להם ערך התחלתי בקוד. <strong>BSS</strong>: הוצהרו בלי ערך, והמערכת מאפסת אותם לאפס. שניהם לא על המחסנית ולא על הערימה.</li>
        <li><strong>מחסנית (זיכרון אוטומטי, Stack)</strong> — כל קריאה דוחפת מסגרת: פרמטרים, כתובת חזרה, מקומיים. ביציאה נזרקת. מהיר, מוגבל בגודל.</li>
        <li><strong>ערימה / ערמה (זיכרון דינמי, Heap)</strong> — <code>new</code>/<code>delete</code> (ב־C: malloc/free). גמיש. חובה לשחרר. דליפה או double-free אם טועים.</li>
      </ul>
      <pre class="code"><code>void demo() {
    int local = 1;                 // מחסנית, מת בסוף demo
    int* p = new int(5);           // p במחסנית, המספר 5 בערימה
    std::cout &lt;&lt; *p;
    delete p;                      // שחרור הבעלות הידנית
    p = nullptr;                   // מפחית שימוש חוזר דרך p, אך לא מאפס עותקים אחרים
}</code></pre>
      <p>אובייקט מחלקה על המחסנית: <code>Frog f;</code> — הבנאי רץ, בסוף הבלוק המפרק רץ לבד. אובייקט בערימה: <code>Frog* f = new Frog;</code> — אתם קוראים <code>delete f;</code> ואז המפרק רץ.</p>
      <p>בקוד C++ מודרני מעדיפים בעלות אוטומטית: אובייקט מקומי, מכולה, או <code>std::unique_ptr</code>. כך המפרק משחרר את המשאב גם ביציאה מוקדמת או בחריגה. זהו עקרון <strong>RAII (Resource Acquisition Is Initialization)</strong>.</p>
      <p>מלכודת שמות במצגת: מחלקה בשם <code>Stack</code> אינה <strong>מחסנית הקריאות (call stack)</strong>. הראשונה היא טיפוס שאתם כותבים; השנייה היא אזור זיכרון אוטומטי של המעבד. בהמשך הקורס גם <code>SecureStack</code> יורש מ־<code>Stack</code> — עדיין לא "המחסנית" של יחידה 3.</p>
      <p>כל מופע הוא עותק נפרד. שני אובייקטי <code>Stack</code> לא חולקים שדות — אלא אם שדה הוא מצביע לאותו בלוק בערימה (העתקה רדודה, בהמשך).</p>
      <p>במעבדה למטה לחצו new ואז "יציאה מהפונקציה": תראו שהערימה נשארת. זה הסיפור של דליפה.</p>
      <div class="panel">
        <p><strong>למה שני אזורים (מחסנית וערימה).</strong> מחסנית = שולחן עבודה: מה שמניחים לקריאה הנוכחית נזרק ביציאה, מהיר ומוגבל. ערימה = מחסן: מבקשים מדף (<code>new</code>) וחייבים להחזיר אותו (<code>delete</code>), אחרת המחסן מתמלא (דליפה) או מחזירים פעמיים (double-free). RAII אומר: הקצאה בבנאי, שחרור במפרק — כמו להשאיל ספר עם כרטיס שמוחזר אוטומטית בסגירת הדלת, גם אם יצאתם בחריגה.</p>
      </div>
    `,
  },
  {
    id: "class-first",
    title: "מחלקה ואובייקט — הצעד הראשון ב־OOP (Object-Oriented Programming)",
    html: `
      <p>ב־C התוכנית היא אוסף פונקציות. ב־C++ אפשר לקבץ נתונים ופעולות ליחידה אחת: <strong>מחלקה</strong> היא התבנית ("מה זה צפרדע"). <strong>אובייקט / מופע</strong> הוא הצפרדע החיה בזיכרון.</p>
      <p>לאובייקט יש מצב (ערכי השדות) והתנהגות (המתודות).</p>
      <pre class="code"><code>class Frog {
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
      <p><code>struct</code> ב־C++ כמעט זהה ל־class. ההבדל הקלאסי: ב־struct ברירת המחדל public, ב־class — private. בהמשך נסתיר שדות.</p>
    `,
  },
  {
    id: "this-encap",
    title: "המצביע this, כימוס (encapsulation), והרשאות גישה",
    html: `
      <p>איך <code>hop</code> יודעת אם מדובר ב־f1 או ב־f2? המהדר מעביר מצביע נסתר: <code>this</code>. הקריאה <code>f1.hop()</code> היא בעצם <code>hop(&amp;f1)</code>. בתוך המתודה, <code>name</code> הוא קיצור ל־<code>this-&gt;name</code>.</p>
      <p><strong>כימוס</strong> — מנגנון שמסתיר פונקציות ומשתנים; מתאפשר בזכות הרשאות הגישה (public / private / protected). למה: setter יכול לאסור רדיוס שלילי; אפשר לשנות מימוש בלי לשבור קוראים.</p>
      <ul>
        <li><code>public</code> — כולם.</li>
        <li><code>private</code> — רק המחלקה עצמה, ומי שהמחלקה הכריזה עליו כ־<strong>חבר (friend)</strong>.</li>
        <li><code>protected</code> — המחלקה והיורשות, לא קוד שמחוץ להיררכיה. במבחן זו מלכודת מול private.</li>
      </ul>
      <p><code>friend class USocial;</code> (או חברות לפונקציה) היא הרשאה מפורשת: החבר ניגש ל־private/protected בלי להיות יורש. זו לא ירושה ולא public. במטלות OO זה מאפשר לרשת החברתית לאתחל <code>id</code> של משתמש בלי setter ציבורי.</p>
      <pre class="code"><code>class Circle {
    double r;  // private כברירת מחדל ב-class
public:
    void setR(double x) {
        if (x &gt; 0) r = x;
    }
    double getR() const { return r; }
};</code></pre>
      <p><code>const</code> אחרי getR אומר: המתודה לא משנה את האובייקט. אפשר לקרוא לה על אובייקט קבוע.</p>
    `,
  }
);
