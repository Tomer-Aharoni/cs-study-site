UNIT4.sections.push(
  {
    id: "u4-fn",
    title: "פונקציות: אובייקט, למדא (lambda), מיקום ושם",
    html: `
      <p>פונקציה היא אובייקט לכל דבר: אפשר להעביר אותה כארגומנט, להחזיר אותה מפונקציה אחרת, ולשמור אותה במשתנה. זו התשתית ל<strong>מעטפת (decorator)</strong> בהמשך: פונקציה שמקבלת פונקציה ומחזירה אותה עטופה בקוד נוסף.</p>
      <p><strong>למדא (lambda)</strong> — פונקציה קצרה בלי שם, ביטוי אחד. נוחה כשצריך פונקציה כערך בלי להגדיר <code>def</code>.</p>
      <ul>
        <li><strong>ארגומנטי מיקום (positional arguments)</strong> — לפי הסדר בהגדרה.</li>
        <li><strong>ארגומנטים בעלי שם (keyword arguments)</strong> — <code>f(x=1)</code>, הסדר גמיש בין השמות.</li>
        <li>אחרי keyword באותה קריאה לא חוזרים לארגומנט מיקום (שגיאת תחביר).</li>
      </ul>
      <p><strong>אריזת פרמטרים:</strong> <code>*args</code> אוסף עודפי מיקום ל־tuple; <code>**kwargs</code> עודפי שם ל־dict. במדריך אפשר גם מתודה שמקבלת רשימה או אובייקט מורכב במקום "מספר ארגומנטים משתנה" עם כמה חתימות.</p>
      <p><strong>תחום משתנים (scope):</strong> שם שהוגדר בתוך פונקציה הוא מקומי. <code>global</code> אומר שההשמה נוגעת במשתנה של כל הקובץ. <code>nonlocal</code> אומר שההשמה נוגעת במשתנה של פונקציה חיצונית שעוטפת את הנוכחית. פונקציה מקוננת רואה משתנים של הפונקציה החיצונית. זה נקרא <strong>סגירה (closure)</strong>: הפונקציה הפנימית זוכרת ערכים מהחוץ גם אחרי שהחיצונית הסתיימה. לדוגמה, <code>make_adder(n)</code> מקבלת מספר n ומחזירה פונקציה שזוכרת את n.</p>
    `,
  },
  {
    id: "u4-dec",
    title: "מעטפת (decorator)",
    html: `
      <p>בסעיף הקודם פונקציה הייתה ערך שאפשר להעביר ולשמור. מעטפת משתמשת בזה: פונקציה מקבלת פונקציה ומחזירה אותה עטופה, בלי לשנות את הגוף המקורי.</p>
      <p>הרעיון במצגת: לעטוף שיטה בקוד נוסף <em>בלי לשנות את גוף המקור</em>. מקבלים f, מגדירים פונקציה פנימית שמדפיסה ואז קוראת ל־f, ומחזירים את הפנימית. אחר כך מחליפים את השם: <code>square = decotitle(square)</code>. תחביר <code>@decotitle</code> מעל <code>def</code> עושה אותה השמה. העטיפה מתבצעת בזמן ההגדרה, לא מחדש בכל קריאה.</p>
      <pre class="code"><code>from functools import wraps

def decotitle(f):
    @wraps(f)
    def ret(*args, **kwargs):
        print("now running", f)
        return f(*args, **kwargs)
    return ret

def square(n):
    return n * n

square = decotitle(square)
print(square(10))</code></pre>
      <p>קודם הודעת המעטפת, אחר כך 100. <code>square</code> עכשיו מצביע על <code>ret</code>, ו־<code>ret</code> עדיין קורא לפונקציה המקורית דרך f שנסגרה בסגירה. <code>wraps</code> משמר שם, תיעוד ומטא־נתונים; <code>**kwargs</code> שומר גם קריאות עם ארגומנטים בעלי שם.</p>
      <p>מלכודת מבחן: בלי <code>@wraps(f)</code> השם <code>__name__</code> והתיעוד <code>__doc__</code> הם של הפונקציה הפנימית (כאן <code>ret</code>), לא של <code>square</code>. עם <code>functools.wraps</code> הם נשארים של הפונקציה המקורית. במבחן שואלים מה יודפס מ־<code>__name__</code> אחרי העטיפה.</p>
      <div class="panel">
        <p><strong>למה מעטפת.</strong> רוצים לוג, מדידת זמן או בדיקת הרשאה סביב פונקציות קיימות בלי להעתיק את הגוף. <code>@decotitle</code> מחליף את השם בפונקציה שעוטפת. זה כוח מטא־תכנות: נוח, וגם גבול אמון אם המעטפת עצמה מגיעה מקלט או משנה התנהגות לפי מחרוזת חיצונית.</p>
      </div>
    `,
  },
  {
    id: "u4-class",
    title: "מחלקות: class, __init__, מופע, שדות גלויים",
    html: `
      <p>מחלקה מתחילה ב־<code>class</code> ואז השם. <code>__new__</code> יוצר את המופע, ו־<code>__init__</code> מאתחל מופע שכבר נוצר. בקורס מתמקדים ב־<code>__init__</code>, ולעיתים מכנים אותו בקיצור "בנאי". יצירת <strong>מופע (Instance)</strong> נעשית בקריאה למחלקה: <code>Person("John", 36)</code>. בלי סוגריים <code>Person</code> היא המחלקה עצמה, אובייקט מסוג <code>type</code>, כלומר ערך שאפשר להעביר ולשמור. ניצור מחלקות חדשות בעזרת <code>type</code> בהמשך. זו לא קריאה שיוצרת אדם.</p>
      <p>המידע במחלקות <strong>גלוי כלפי חוץ כברירת מחדל</strong>. אין הצהרת שדות כמו C++. מוסיפים שדה בריצה: <code>self.x = 0</code> יוצר/מעדכן שדה על האובייקט הנוכחי. זו הדרך הטבעית במדריך, במקום רשימת שדות סגורה.</p>
      <pre class="code"><code>class Person:
    i = 12345
    def __init__(self, name, age):
        self.name = name
        self.age = age

p1 = Person("John", 36)
print(p1.name)
print(p1.age)</code></pre>
      <p>הארגומנט הראשון במתודה הוא <em>המופע</em>. המוסכמה <code>self</code> אינה מילה שמורה — אפשר שם אחר, ואף אחד לא עושה את זה. קריאה <code>p1.age</code> שקולה להעברת p1 כ־self.</p>
    `,
  },
  {
    id: "u4-classvar",
    title: "משתנה מחלקה מול משתנה מופע",
    html: `
      <p>אפשר להגדיר במחלקה משתנים כלליים שאינם שייכים למופע אחד — בדרך כלל מחוץ למתודות, למשל <code>printed_rep = "*"</code> ב־Point.</p>
      <p>במקרה הבסיסי, קריאת <code>obj.varname</code> מחפשת כך:</p>
      <ul>
        <li>קודם שדה מופע בשם הזה;</li>
        <li>אם אין — משתנה מחלקה;</li>
        <li>אם גם זה חסר — שגיאה.</li>
      </ul>
      <p>בהשמה רגילה <code>obj.varname = ...</code> נוצר או מתעדכן שדה <em>מופע</em>, גם אם היה משתנה מחלקה באותו שם. המחלקה עצמה לא משתנה; מופעים אחרים עדיין רואים את ערך המחלקה. יש מנגנונים שמיירטים קריאה או השמה לשדה, למשל <strong>מתאר (descriptor)</strong>, <strong>תכונה (property)</strong> ו־<code>__setattr__</code>. הם יכולים לשנות את הכלל הזה. לא נדרשים עכשיו.</p>
    `,
  },
  {
    id: "u4-point",
    title: "מחלקת Point: הזזה, ייצוג כמחרוזת, והרצה כקובץ ראשי",
    html: `
      <p>דוגמת המדריך: נקודה עם שתי קואורדינטות, הזזה, וייצוג מחרוזת.</p>
      <pre class="code"><code>class Point:
    def __init__(self, xcor, ycor):
        self.x = xcor
        self.y = ycor
    def move(self, addx, addy):
        self.x += addx
        self.y += addy
    def __str__(self):
        return "(" + str(self.x) + "," + str(self.y) + ")"

if __name__ == "__main__":
    p = Point(1, 2)
    p.move(10, 21)
    print(p)</code></pre>
      <p>הפלט <code>(11,23)</code>. <code>print</code> על אובייקט משתמש ב־<code>__str__</code> אם קיימת: המתודה שמחזירה תיאור טקסט. בשפות אחרות קוראים לזה לעיתים toString. בלי מימוש מתאים מתקבל בדרך כלל ייצוג ברירת מחדל טכני שאינו מיועד לקורא אדם.</p>
      <p><code>str</code> על מספר כבר יודע להחזיר את הטקסט שלו. ב־<code>__str__</code> של Point משרשרים את טקסט הקואורדינטות עם סוגריים.</p>
      <p><code>if __name__ == "__main__":</code> — הבלוק רץ רק כשהקובץ הוא התוכנית הראשית. בייבוא המודול הבדיקות לא רצות מעצמן. זה מאפשר לייבא את Point בלי להדפיס דוגמאות.</p>
    `,
  },
  {
    id: "u4-dict-oop",
    title: "מילון המחלקה, בלי העמסת חתימות, וגישה לפי שם",
    html: `
      <p>למחלקות ולרוב המופעים הרגילים יש מרחב שמות נגיש דרך <code>__dict__</code>: <code>Point.__dict__</code> מול <code>p.__dict__</code>. מפתחות = שמות שדות ומתודות; ערכים = נתונים או אובייקטי פונקציה. <code>dir(Point)</code> ו־<code>dir(p)</code> מציגים שמות זמינים, כולל שמות מירושה. מופעים עם <code>__slots__</code> אינם חייבים מילון מופע.</p>
      <p>מלכודת מבחן: לפייתון <strong>אין העמסה (overloading)</strong> לפי חתימה, בניגוד ל־C++. הגדרה שנייה באותו שם דורסת את הראשונה במילון המחלקה או המודול. אם כותבים <code>reset(self)</code> ואחר כך <code>reset(self, x, y)</code>, קריאה בלי ארגומנטים תיכשל: נשארה רק החתימה הארוכה. גמישות באותה פונקציה: ברירות מחדל, <code>*args</code> ו־<code>**kwargs</code>, או בדיקת טיפוס עם <code>isinstance</code>. <code>isinstance(obj, int)</code> שואל אם האובייקט הוא מהטיפוס הנתון, או ממחלקה שיורשת ממנו.</p>
      <p>עוקפים במדריך עם ברירות מחדל באותה מתודה:</p>
      <pre class="code"><code>def reset(self, xcor=0, ycor=0):
    self.x = xcor
    self.y = ycor</code></pre>
      <p><code>p.reset(10, 20)</code>, <code>p.reset(30)</code> (y נשאר 0), <code>p.reset()</code> — שלושת הצירופים עובדים.</p>
      <p>לגישה לפי שם מחרוזת משתמשים בפונקציות <code>getattr</code>, <code>setattr</code> ו־<code>hasattr</code>. <code>dir</code> מציג שמות. יחד זו <strong>רפלקציה (reflection)</strong>: בדיקה ושינוי של מאפיינים בזמן ריצה לפי מחרוזת. המתודות <code>__getattribute__</code> ו־<code>__getattr__</code> נקראות כשקוראים שדה, ו־<code>__setattr__</code> נקראת כשכותבים שדה. אפשר להחליף אותן כדי לשנות את מנגנון הגישה. אפשר גם לחבר שם מתודה לשם אחר בריצה, למשל reset שיפעיל את move. גמישות רבה, וסיכון אם קלט משתמש קובע שם או ערך בלי רשימת מותרים והרשאה.</p>
      <pre class="code"><code>setattr(p, "reset", getattr(p, "move"))</code></pre>
      <p><strong>רכיבה דינמית (monkey patching)</strong> היא החלפת פונקציה או מתודה בזמן ריצה, כמו ההשמה הזו. השמה על המופע משנה רק אותו. השמה על המחלקה משנה את כל המופעים:</p>
      <pre class="code"><code>class Service:
    def process(self):
        return "normal"

def patched_process(self):
    return "checked"

Service.process = patched_process  # כל המופעים, לא רק אחד</code></pre>
      <p>אם קלט לא אמין בוחר את השם או את הפונקציה, אפשר להחליף בדיקת התחברות או בדיקת הרשאה בלי לשנות את קובץ המקור. אפחות: רשימת שמות מותרים, לא לקבל קוד מהלקוח, ובידוד תהליך כשמריצים קוד זר. בידוד תהליך הוא הרצה בתהליך נפרד, כדי שהקוד הזר לא ייגע בתוכנית שלכם. זה יחידה 6.</p>
      <p>אין אכיפת <code>private</code> כמו ב־C++. קידומת <code>_</code> היא מוסכמה "לשימוש פנימי". קידומת כפולה כגון <code>__secret</code> מפעילה <strong>שינוי שם (Name Mangling)</strong>, שמצמצם התנגשויות בירושה אך אינו מנגנון אבטחה.</p>
      <p>אפשר להמשיך שורה בעזרת <code>\\</code>, אך עדיף המשך משתמע בתוך <code>()</code>, <code>[]</code> או <code>{}</code>; הוא עמיד וקריא יותר.</p>
    `,
  },
  {
    id: "u4-inh",
    title: "ירושה, super, ירושה מרובה, פולימורפיזם (polymorphism)",
    html: `
      <p>ירושה פשוטה: <code>class Colpoint(Point):</code>. אפשר לאתחל x/y/color ידנית, או לקרוא לבנאי האב:</p>
      <pre class="code"><code>class Colpoint(Point):
    def __init__(self, xcor, ycor, color):
        super().__init__(xcor, ycor)
        self.color = color

y = Colpoint(2, 5, "blue")</code></pre>
      <p>בלי <code>super()</code> עלולים לשכוח אתחול האב ולדרוס התנהגות. פייתון תומכת ב<strong>ירושה מרובה (multiple inheritance)</strong> — יותר מהורה אחד בסוגריים.</p>
      <p>חיפוש מתודה נעשה לפי <strong>סדר פתרון המתודות (Method Resolution Order, MRO)</strong>: הרשימה שקובעת באיזה הורה מחפשים קודם. בירושה מרובה פייתון בונה את הרשימה באלגוריתם בשם C3, שנותן סדר חיפוש אחד עקבי. <code>super()</code> מתקדם לפי ה־MRO, לא בהכרח אל "האב היחיד".</p>
      <p><strong>פולימורפיזם (polymorphism)</strong> חי כברירת מחדל, בניגוד ל־<code>virtual</code> ב־C++ שצריך לסמן במפורש: רשימה של אובייקטים מסוגים שונים, אותה קריאת מתודה, והביצוע לפי הטיפוס האמיתי בריצה. במדריך זה מופיעה היררכיה של מערפלים (obfuscators), כלים שמסווים קוד, עם מתודה משותפת <code>apply</code>. הרעיון לבחינה הוא הפולימורפיזם, לא מימוש הערפול.</p>
    `,
  }
);
