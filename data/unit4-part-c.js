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
      <div class="panel">
        <p><strong>מלכודת מבחן קריטית: אובדן זהות המעטפת ושימור מטא־נתונים עם <code>@functools.wraps</code></strong></p>
        <p>כאשר אנו עוטפים פונקציה באמצעות מעטפת (Decorator), הפונקציה המקורית "מאבדת את זהותה": המאפיינים <code>__name__</code> (שם הפונקציה) ו־<code>__doc__</code> (מחרוזת התיעוד שלה) נדרסים ומוחלפים במטא־נתונים של פונקציית המעטפת הפנימית (כאן <code>ret</code>). בבחינות נשאלת תדיר השאלה: <em>מה ידפיס <code>square.__name__</code> לאחר העטיפה?</em> ללא מעטפת מיוחדת — יודפס <code>"ret"</code>!</p>
        <p><strong>התיקון התקני:</strong> הוספת <code>@wraps(f)</code> (מתוך ספריית <code>functools</code>) ישירות מעל הגדרת הפונקציה הפנימית. דיקורטור זה מעתיק בחזרה את השם, התיעוד ומרחב המודול המקוריים, ומבטיח שקיפות מלאה.</p>
      </div>
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
      <p>למחלקות ולרוב המופעים הרגילים יש מרחב שמות נגיש דרך <code>__dict__</code>: <code>Point.__dict__</code> מול <code>p.__dict__</code>. המפתחות הם שמות השדות והמתודות כמחרוזות, והערכים הם הנתונים או אובייקטי הפונקציות. הפונקציה <code>dir(Point)</code> או <code>dir(p)</code> מציגה את כל השמות הזמינים, כולל שמות מירושה (מופעים המגדירים <code>__slots__</code> חוסכים זיכרון ואינם מחזיקים מילון זה).</p>
      
      <div class="panel">
        <p><strong>מלכודת מבחן קריטית: העמסת פונקציות (Function Overloading) בפייתון</strong></p>
        <p>שאלה שחוזרת על עצמה שוב ושוב בבחינות (למשל 2022ג, 2024): <em>האם פייתון תומכת בהעמסת פונקציות (Function Overloading) לפי חתימת ארגומנטים כמו ב־C++?</em></p>
        <p><strong>תשובה חד־משמעית: לא!</strong> בפייתון אין מנגנון שמבדיל בין גרסאות שונות של אותה פונקציה לפי סוג או כמות הפרמטרים. מאחר שמרחב השמות הוא מילון (<code>__dict__</code>), כל מפתח יכול להצביע על ערך יחיד בלבד. הגדרה שנייה של פונקציה בעלת אותו שם פשוט <strong>דורסת ומחליפה (Override)</strong> לחלוטין את ההגדרה הקודמת!</p>
        <p>אם נגדיר <code>def reset(self):</code> ואחריה <code>def reset(self, x, y):</code>, ההגדרה הראשונה נמחקת, וקריאה ללא ארגומנטים תיכשל בשגיאה. <strong>כיצד משיגים גמישות בפייתון?</strong></p>
        <ul>
          <li><strong>ערכי ברירת מחדל (Default Arguments):</strong> כגון <code>def reset(self, xcor=0, ycor=0):</code> המאפשרת קריאה עם 0, 1 או 2 ארגומנטים.</li>
          <li><strong>מספר ארגומנטים משתנה:</strong> בעזרת <code>*args</code> ו־<code>**kwargs</code>.</li>
          <li><strong>בדיקת טיפוסים דינמית:</strong> בעזרת הפונקציה <code>isinstance(obj, type)</code> הבודקת האם ערך שייך לטיפוס מסוים או למחלקה היורשת ממנו.</li>
        </ul>
      </div>

      <pre class="code"><code>def reset(self, xcor=0, ycor=0):
    self.x = xcor
    self.y = ycor

# שלוש הקריאות יעבדו בזכות ברירות המחדל:
p.reset(10, 20)  # מעדכן את שניהם
p.reset(30)      # מעדכן את xcor ל־30, ycor נשאר 0
p.reset()        # שניהם מקבלים 0</code></pre>

      <h3>רפלקציה (Reflection) ואינטרוספקציה בפייתון</h3>
      <p>במצב רגיל אנו ניגשים לשדה ישירות: <code>p.x</code>. אך מה עושים כאשר שם השדה או המתודה מגיע כמחרוזת בזמן ריצה (למשל מקובץ הגדרות או קלט משתמש)? לצורך זה משתמשים ב<strong>רפלקציה (Reflection / Introspection)</strong> — היכולת של תוכנית לבחון ולשנות את המבנה הפנימי של עצמה בזמן ריצה:</p>
      <ul>
        <li><code>hasattr(obj, "name")</code> — בודק אם קיים מאפיין או מתודה בשם זה.</li>
        <li><code>getattr(obj, "name")</code> — שולף את הערך או המתודה לפי שמה כמחרוזת.</li>
        <li><code>setattr(obj, "name", val)</code> — קובע ערך לשדה קיים או יוצר שדה חדש.</li>
        <li><code>delattr(obj, "name")</code> — מוחק את המאפיין מהאובייקט.</li>
      </ul>

      <div class="panel">
        <p><strong>הבחנה טכנית קריטית למבחן: כיצד פייתון מיירטת גישה לשדות?</strong></p>
        <ul>
          <li><code>__getattribute__</code> — <em>שומר הסף הראשי:</em> מתודה זו מופעלת <strong>תמיד ובאופן בלתי־מותנה</strong> בכל ניסיון קריאה של שדה או מתודה (<code>obj.name</code>), לפני כל חיפוש במילון.</li>
          <li><code>__getattr__</code> — <em>גלגל ההצלה (Fallback):</em> מתודה זו מופעלת <strong>אך ורק אם המאפיין לא נמצא</strong> (כלומר החיפוש הרגיל במילון המופע ובמחלקות האב נכשל). אם השדה קיים, <code>__getattr__</code> לעולם לא תיקרא!</li>
          <li><code>__setattr__</code> — מופעלת בכל השמה של ערך לשדה כלשהו (<code>obj.name = val</code>).</li>
        </ul>
      </div>

      <pre class="code"><code># החלפת מתודת reset כך שתפנה למתודת move של האובייקט
setattr(p, "reset", getattr(p, "move"))</code></pre>

      <h3>רכיבה דינמית (Monkey Patching): שינוי קוד בזמן ריצה</h3>
      <p><strong>רכיבה דינמית (Monkey Patching)</strong> היא שינוי או החלפה של מתודות ופונקציות בזמן ריצה ("על חי"), כאילו החלפנו מנוע במכונית תוך כדי תנועה. יש להבחין היטב בין שני היקפים של שינוי:</p>
      <ul>
        <li><strong>החלפה ברמת המופע הבודד (Instance Level):</strong> <code>p.reset = p.move</code> או <code>setattr(p, "reset", getattr(p, "move"))</code> משנה אך ורק את המילון המקומי של המופע <code>p.__dict__</code>. שאר המופעים של אותה מחלקה אינם מושפעים כלל. (שימו לב: <code>p.move</code> שנשלף ממופע הוא מתודה כבולה — Bound Method — שבה <code>p</code> כבר כבול כארגומנט <code>self</code> הראשון).</li>
        <li><strong>החלפה ברמת המחלקה (Class Level):</strong> השמה ישירה לשם של המחלקה משנה את מילון המחלקה המשותף, ומשפיעה באופן מיידי על <strong>כל המופעים כולם</strong> — הן אלה שכבר נוצרו והן אלה שייווצרו בעתיד!</li>
      </ul>

      <pre class="code"><code>class Service:
    def process(self):
        return "normal"

def patched_process(self):
    return "checked"

# רכיבה ברמת המחלקה — משפיעה על כל המופעים הקיימים והעתידיים!
Service.process = patched_process</code></pre>
      <p><strong>סיכון אבטחה:</strong> אם קלט לא אמין שולט בשם המאפיין או בפונקציה הנדרסת, תוקף יכול לדרוס בדיקת הרשאות (כגון פונקציית <code>is_admin</code>) ולעקוף את כל מנגנוני האבטחה בלי לשנות תו בודד בקובץ המקור בדיסק. <strong>אפחות (Mitigation):</strong> הגבלת שמות מול רשימת שמות מותרים (Allowlist), מניעת קבלת שמות מתודות מקלט לקוח, ואכיפת בידוד תהליך (Process Isolation) להרצת קוד זר (נושא שנעמיק בו ביחידה 6).</p>
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
