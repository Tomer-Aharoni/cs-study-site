UNIT4.sections.push(
  {
    id: "u4-fn",
    title: "פונקציות: אזרח מדרגה ראשונה, למדא (lambda), ארגומנטים וסגירה (closure)",
    html: `
      <p>בפייתון, <strong>פונקציה היא אזרח מדרגה ראשונה (First-Class Citizen)</strong>: היא אובייקט לכל דבר. המשמעות היא שניתן להציב פונקציה במשתנה, להעביר אותה כארגומנט לפונקציה אחרת, ולהחזיר אותה כערך מוחזר מפונקציה. תכונה זו מהווה את התשתית הישירה ל<strong>מעטפת (Decorator)</strong> ולתכנות פונקציונלי.</p>
      
      <p><strong>פונקציית למדא (lambda)</strong> — פונקציה אנונימית (ללא שם) המוגדרת בשורת קוד יחידה ומכילה ביטוי בודד המוחזר אוטומטית. היא נוחה כאשר זקוקים לפונקציה קצרה וחד־פעמית (למשל כפונקציית מיון) בלי להגדיר בלוק <code>def</code> מלא.</p>
      
      <h3>העברת ארגומנטים לפונקציה</h3>
      <ul>
        <li><strong>ארגומנטי מיקום (Positional Arguments):</strong> מועברים לפי סדר הופעתם בהגדרת הפונקציה.</li>
        <li><strong>ארגומנטים בעלי שם (Keyword Arguments):</strong> מועברים בתחביר <code>f(x=1)</code>; הסדר ביניהם אינו מחייב, שכן השם מזהה את הפרמטר.</li>
        <li><strong>כלל תחבירי מחייב:</strong> לעולם אין להעביר ארגומנט מיקום לאחר ארגומנט בעל שם באותה קריאה (ניסיון כזה גורר שגיאת תחביר <code>SyntaxError</code>).</li>
      </ul>
      
      <p><strong>אריזת פרמטרים ופירוק (Packing &amp; Unpacking):</strong></p>
      <ul>
        <li><code>*args</code> — אוסף עודפי ארגומנטי מיקום לסדרה בלתי־משתנה (<code>tuple</code>).</li>
        <li><code>**kwargs</code> — אוסף עודפי ארגומנטים בעלי שם למילון (<code>dict</code>).</li>
      </ul>
      
      <h3>תחום הכרה (Scope) וסגירה (Closure)</h3>
      <p>משתנה הנוצר בתוך פונקציה הוא <strong>מקומי (Local)</strong> אליה. כדי לשנות משתנה ברמת המודול יש להשתמש במילת המפתח <code>global</code>. כאשר פונקציה מוגדרת בתוך פונקציה אחרת (פונקציה מקוננת), מילת המפתח <code>nonlocal</code> מאפשרת לה לבצע השמה למשתנה של הפונקציה החיצונית העוטפת אותה.</p>
      
      <p><strong>סגירה (Closure):</strong> פונקציה פנימית השומרת גישה למשתנים של הפונקציה העוטפת, גם לאחר שהפונקציה העוטפת סיימה את ריצתה וחזרה. זהו מנגנון המאפשר "לזכור" מצב בלי להשתמש במשתנים גלובליים.</p>
      
      <pre class="code"><code>def make_multiplier(factor):
    # הפונקציה הפנימית סוגרת על המשתנה factor מהפונקציה החיצונית
    def multiply(x):
        return x * factor
    return multiply

double = make_multiplier(2)
print(double(5))  # פלט: 10

def format_record(prefix, *args, **kwargs):
    # args נאסף ל-tuple, kwargs נאסף ל-dict
    print(f"{prefix}: args={args}, kwargs={kwargs}")

format_record("UserLog", 101, "active", role="admin")
# פלט: UserLog: args=(101, 'active'), kwargs={'role': 'admin'}</code></pre>
      <p>בדוגמה זו, <code>make_multiplier</code> מחזירה את הפונקציה <code>multiply</code> כשהיא "סוגרת" על הערך <code>factor=2</code>. הפונקציה <code>format_record</code> מדגימה אריזה דינמית: שני ערכי המיקום נארזו לטופל ב־<code>args</code>, וארגומנט השם נארז למילון ב־<code>kwargs</code>.</p>
    `,
  },
  {
    id: "u4-dec",
    title: "מעטפת (Decorator): הרחבת התנהגות ושמירת מטא־נתונים",
    html: `
      <p><strong>מעטפת (Decorator)</strong> היא פונקציה המקבלת פונקציה אחרת כארגומנט, עוטפת אותה בלוגיקה נוספת (לפני הקריאה, אחריה או במקומה), ומחזירה את הפונקציה העטופה — <em>מבלי לשנות את קוד המקור של הפונקציה המקורית</em>.</p>
      
      <p><strong>כיצד המעטפת פועלת?</strong></p>
      <p>המעטפת מגדירה בתוכה פונקציה פנימית (בדרך כלל בשם <code>wrapper</code>), שמבצעת פעולות נוספות (כגון רישום בלוג או מדידת זמנים) וקוראת לפונקציה המקורית. לאחר מכן, המעטפת מחזירה את הפונקציה הפנימית. ההצבה <code>func = decorator(func)</code> מחליפה את שם הפונקציה המקורית בפונקציה העוטפת.</p>
      <p>התחביר <code>@decorator</code> מעל הגדרת <code>def</code> הוא קיצור תחבירי (Syntactic Sugar) המבצע בדיוק את אותה השמה. <strong>חשוב:</strong> פעולת העטיפה מתבצעת <em>בזמן טעינת והגדרת הפונקציה</em>, ולא מחדש בכל קריאה וקריאה.</p>
      
      <pre class="code"><code>from functools import wraps

def audit_log(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[LOG] Executing: {func.__name__} with args={args}")
        return func(*args, **kwargs)
    return wrapper

@audit_log
def calculate_fee(amount, rate=0.05):
    """Calculates transaction fee based on amount and rate."""
    return amount * rate

print(calculate_fee(200, rate=0.1))
# פלט:
# [LOG] Executing: calculate_fee with args=(200,)
# 20.0</code></pre>
      <p>בקוד שלעיל, הקריאה ל־<code>calculate_fee</code> מפעילה בפועל את <code>wrapper</code>, שמדפיס את הודעת הרישום ולאחר מכן מפעיל את הפונקציה המקורית בעזרת <code>*args, **kwargs</code> ומחזיר את תוצאת החישוב (20.0).</p>
      
      <div class="panel">
        <p><strong>מלכודת מבחן קריטית: אובדן זהות המעטפת ושימור מטא־נתונים עם <code>@functools.wraps</code></strong></p>
        <p>כאשר עוטפים פונקציה במעטפת, הפונקציה המקורית "מאבדת את זהותה": המאפיינים <code>__name__</code> (שם הפונקציה) ו־<code>__doc__</code> (מחרוזת התיעוד שלה) נדרסים ומוחלפים במטא־נתונים של הפונקציה הפנימית (<code>wrapper</code>). בבחינות נשאלת תדיר השאלה: <em>מה ידפיס <code>calculate_fee.__name__</code> לאחר העטיפה?</em> ללא מעטפת מיוחדת — יודפס <code>"wrapper"</code>!</p>
        <p><strong>התיקון התקני:</strong> הוספת <code>@wraps(func)</code> (מתוך ספריית <code>functools</code>) ישירות מעל הגדרת הפונקציה הפנימית. מעטפת זו מעתיקה בחזרה את השם, התיעוד ומרחב המודול המקוריים, ומבטיחה שקיפות מלאה (כך ש־<code>__name__</code> יישאר <code>"calculate_fee"</code> ו־<code>__doc__</code> יישמר במלואו).</p>
      </div>
      
      <div class="panel">
        <p><strong>חשיבות הגנתית (Defensive Security):</strong> מעטפות הן כלי מרכזי בארכיטקטורה דפנסיבית. הן מאפשרות לאכוף בקרת גישה (למשל <code>@require_permission("admin")</code>), בדיקת תקינות קלט והגבלת קצב קריאות (Rate Limiting) באופן אחיד סביב נקודות קצה ושירותים, ללא שכפול קוד. עם זאת, אם המעטפת עצמה נטענת ממקור לא אמין או נקבעת על פי קלט חיצוני, היא מהווה נקודת תורפה חמורה (גבול אמון).</p>
      </div>
    `,
  },
  {
    id: "u4-class",
    title: "מחלקות: class, __init__, מופע, שדות גלויים",
    html: `
      <p>הגדרת מחלקה מתחילה במילת המפתח <code>class</code> ולאחריה שם המחלקה. בעת יצירת אובייקט מתבצע תהליך דו־שלבי: המתודה <code>__new__</code> מקצה את הזיכרון ויוצרת את המופע הריק, ולאחריה המתודה <code>__init__</code> מאתחלת את שדות המופע שנוצר. בקורס אנו מתמקדים ב־<code>__init__</code>, והיא מכונה לעיתים בקיצור "בנאי" (Constructor).</p>
      
      <p>יצירת <strong>מופע (Instance)</strong> נעשית על ידי קריאה למחלקה עם סוגריים: <code>UserAccount("alice", 3)</code>. שים לב: פנייה לשם המחלקה ללא סוגריים (<code>UserAccount</code>) אינה יוצרת מופע, אלא מהווה הפניה לאובייקט המחלקה עצמו (שהוא אובייקט מסוג <code>type</code> — ערך שניתן לשמור במשתנה או להעביר לפונקציה).</p>
      
      <p><strong>השדות גלויים כלפי חוץ כברירת מחדל:</strong> בניגוד לשפות כגון C++ או Java, בפייתון אין הצהרה מוקדמת על שדות פרטיים או מוגנים (אין מילות מפתח כגון <code>private</code>). שדות מופע נוצרים או מתעדכנים ישירות בריצה בעזרת השמה: <code>self.x = 0</code> יוצר את השדה על האובייקט הנוכחי.</p>
      
      <pre class="code"><code>class UserAccount:
    default_role = "standard"  # משתנה מחלקה (Class Variable)

    def __init__(self, username, login_count):
        self.username = username          # משתנה מופע (Instance Variable)
        self.login_count = login_count

user = UserAccount("alice", 3)
print(user.username)     # alice
print(user.login_count)  # 3</code></pre>
      <p><strong>מהו הפרמטר <code>self</code>?</strong> הארגומנט הראשון בכל מתודת מופע מייצג את המופע הספציפי שעליו הופעלה המתודה. המוסכמה לקרוא לו <code>self</code> אינה מילה שמורה (ניתן תיאורטית לבחור כל שם, אך זו המוסכמה האוניברסלית). קריאה לשדה <code>user.username</code> ניגשת ישירות למילון השדות של המופע <code>user</code>.</p>
    `,
  },
  {
    id: "u4-classvar",
    title: "משתנה מחלקה (Class Variable) מול משתנה מופע (Instance Variable)",
    html: `
      <p>בפייתון קיימת הבחנה קריטית בין שני סוגי משתנים בתוך מחלקה:</p>
      <ul>
        <li><strong>משתנה מחלקה (Class Variable):</strong> מוגדר בגוף המחלקה מחוץ לכל המתודות. ערכו משותף לכל המופעים של אותה מחלקה.</li>
        <li><strong>משתנה מופע (Instance Variable):</strong> מוגדר בתוך מתודה (בדרך כלל <code>__init__</code>) ומוצמד ל־<code>self</code>. ערכו ייחודי למופע הספציפי.</li>
      </ul>
      
      <h3>סדר החיפוש בעת קריאת שדה (<code>obj.varname</code>)</h3>
      <ol>
        <li>פייתון בודקת תחילה במילון המופע הספציפי (<code>obj.__dict__</code>). אם השדה קיים בו — ערכו מוחזר.</li>
        <li>אם השדה אינו קיים במופע, פייתון מחפשת במילון המחלקה (<code>Class.__dict__</code>) ובמחלקות האב שלה.</li>
        <li>אם השדה אינו נמצא באף אחד מהם — נזרקת שגיאת <code>AttributeError</code>.</li>
      </ol>
      
      <div class="panel">
        <p><strong>מלכודת מבחן קריטית: השמה לשדה מופע אינה משנה את משתנה המחלקה!</strong></p>
        <p>כאשר מבצעים השמה דרך מופע: <code>obj.varname = ...</code>, פייתון <strong>תמיד יוצרת או מעדכנת שדה מופע</strong> במילון המקומי של אותו מופע, גם אם קיים משתנה מחלקה באותו שם! משתנה המחלקה עצמו אינו משתנה, וכל שאר המופעים ימשיכו לראות את הערך המקורי של המחלקה.</p>
      </div>
      
      <pre class="code"><code>class ServerNode:
    region = "eu-central"  # משתנה מחלקה: ערך משותף כברירת מחדל לכל השרתים

    def __init__(self, node_id):
        self.node_id = node_id  # משתנה מופע: ייחודי לשרת זה

s1 = ServerNode("srv-1")
s2 = ServerNode("srv-2")

print(s1.region)  # eu-central (נשלף ממשתנה המחלקה)
s1.region = "us-east"  # יוצר שדה מופע חדש על s1 בלבד!
print(s1.region)  # us-east (משתנה המופע מסתיר את משתנה המחלקה)
print(s2.region)  # eu-central (המופע s2 והמחלקה ServerNode נותרו ללא שינוי!)
print(ServerNode.region)  # eu-central</code></pre>
      <p>כדי לשנות את משתנה המחלקה עבור כל המופעים, יש לבצע השמה מפורשת דרך שם המחלקה עצמה: <code>ServerNode.region = "us-west"</code>.</p>
    `,
  },
  {
    id: "u4-point",
    title: "מחלקת Vector2D: אתחול, שינוי מצב, ייצוג כמחרוזת (__str__) והרצה כקובץ ראשי",
    html: `
      <p>דוגמה יסודית למחלקה: וקטור דו־ממדי המחזיק שתי קואורדינטות, תומך בשינוי מצב (הזזה), ומממש ייצוג טקסטואלי לקריאה נוחה.</p>
      <pre class="code"><code>class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def shift(self, dx, dy):
        self.x += dx
        self.y += dy

    def __str__(self):
        return f"Vector2D({self.x}, {self.y})"

if __name__ == "__main__":
    v = Vector2D(3, 4)
    v.shift(2, -1)
    print(v)</code></pre>
      <p>הפלט המודפס הוא <code>Vector2D(5, 3)</code>. הבה נבחן את הרכיבים המרכזיים בקוד זה:</p>
      <ul>
        <li><strong>המתודה המיוחדת <code>__str__</code>:</strong> נקראת אוטומטית כאשר מעבירים את המופע לפונקציה <code>print(v)</code> או לפונקציה <code>str(v)</code>. מטרתה להחזיר מחרוזת קריאה וידידותית למשתמש (מקבילה ל־<code>toString</code> ב־Java). ללא מימוש מתודה זו, פייתון תדפיס ייצוג ברירת מחדל טכני המכיל את כתובת הזיכרון של האובייקט (למשל <code>&lt;__main__.Vector2D object at 0x...&gt;</code>).</li>
        <li><strong>מבנה <code>if __name__ == "__main__":</code>:</strong> תבנית פייתון תקנית שמשמעותה: הבלוק ירוץ אך ורק כאשר קובץ זה מופעל כתוכנית הראשית של המפרש. אם קובץ זה יובא כמודול על ידי תוכנית אחרת (<code>import</code>), הבלוק לא יתבצע. הדבר מאפשר לכלול בדיקות והדגמות בקובץ המודול מבלי שהן יופעלו מעצמן בעת יבוא.</li>
      </ul>
    `,
  },
  {
    id: "u4-dict-oop",
    title: "מילון המחלקה (__dict__), איסור העמסת חתימות, ורפלקציה",
    html: `
      <p>למחלקות ולרוב מופעי האובייקטים בפייתון יש מרחב שמות פנימי הנגיש ישירות דרך המאפיין <code>__dict__</code>: <code>Vector2D.__dict__</code> (מילון המחלקה) מול <code>v.__dict__</code> (מילון המופע). המפתחות במילון הם שמות השדות והמתודות כמחרוזות, והערכים הם הנתונים או אובייקטי הפונקציות. הפונקציה <code>dir(Vector2D)</code> או <code>dir(v)</code> מציגה את כל השמות הנגישים, כולל שמות שהורשו ממחלקות האב (מופעים המגדירים <code>__slots__</code> חוסכים זיכרון ואינם מחזיקים מילון <code>__dict__</code> דינמי).</p>
      
      <div class="panel">
        <p><strong>מלכודת מבחן קריטית: העמסת פונקציות (Function Overloading) בפייתון</strong></p>
        <p>שאלה שחוזרת על עצמה שוב ושוב בבחינות (למשל 2022ג, 2024): <em>האם פייתון תומכת בהעמסת פונקציות (Function Overloading) לפי חתימת ארגומנטים כמו ב־C++?</em></p>
        <p><strong>תשובה חד־משמעית: לא!</strong> בפייתון אין מנגנון שמבדיל בין גרסאות שונות של אותה פונקציה לפי סוג או כמות הפרמטרים. מאחר שמרחב השמות ממומש כמילון (<code>__dict__</code>), כל מפתח יכול להצביע על ערך יחיד בלבד. הגדרה שנייה של פונקציה בעלת אותו שם פשוט <strong>דורסת ומחליפה (Override)</strong> לחלוטין את ההגדרה הקודמת במילון!</p>
        <p>אם נגדיר <code>def reset(self):</code> ואחריה <code>def reset(self, x, y):</code>, ההגדרה הראשונה נדרסת ונמחקת, וקריאה ללא ארגומנטים תיכשל בשגיאת <code>TypeError</code>. <strong>כיצד משיגים גמישות בחתימות בפייתון?</strong></p>
        <ul>
          <li><strong>ערכי ברירת מחדל (Default Arguments):</strong> כגון <code>def reset(self, x=0, y=0):</code> המאפשרת קריאה עם 0, 1 או 2 ארגומנטים.</li>
          <li><strong>מספר ארגומנטים משתנה:</strong> בעזרת <code>*args</code> ו־<code>**kwargs</code>.</li>
          <li><strong>בדיקת טיפוסים דינמית:</strong> בעזרת הפונקציה <code>isinstance(obj, type)</code> הבודקת האם ערך שייך לטיפוס מסוים או למחלקה היורשת ממנו.</li>
        </ul>
      </div>

      <pre class="code"><code>def reset(self, x=0, y=0):
    self.x = x
    self.y = y

# שלוש הקריאות יעבדו בזכות ברירות המחדל:
v.reset(10, 20)  # מעדכן את שני השדות ל-10 ול-20
v.reset(30)      # מעדכן את x ל־30, y מקבל ערך ברירת מחדל 0
v.reset()        # שניהם מקבלים ערך ברירת מחדל 0</code></pre>

      <h3>רפלקציה (Reflection) ואינטרוספקציה (Introspection) בפייתון</h3>
      <p>במצב רגיל אנו ניגשים לשדה ישירות בקוד: <code>v.x</code>. אך מה עושים כאשר שם השדה או המתודה מגיע כמחרוזת בזמן ריצה (למשל מתוך קובץ הגדרות, בקשת רשת או קלט משתמש)? לצורך זה משתמשים ב<strong>רפלקציה (Reflection)</strong> — היכולת של תוכנית לבחון ולשנות את המבנה הפנימי של עצמה בזמן ריצה:</p>
      <ul>
        <li><code>hasattr(obj, "name")</code> — בודק האם קיים מאפיין או מתודה בשם זה (מחזיר <code>True</code> או <code>False</code>).</li>
        <li><code>getattr(obj, "name")</code> — שולף את הערך או המתודה לפי שמה כמחרוזת.</li>
        <li><code>setattr(obj, "name", val)</code> — קובע ערך לשדה קיים או יוצר שדה חדש דינמית.</li>
        <li><code>delattr(obj, "name")</code> — מוחק את המאפיין מהאובייקט.</li>
      </ul>

      <div class="panel">
        <p><strong>הבחנה טכנית קריטית למבחן: כיצד פייתון מיירטת גישה לשדות?</strong></p>
        <ul>
          <li><code>__getattribute__</code> — <em>שומר הסף הראשי:</em> מתודה זו מופעלת <strong>תמיד ובאופן בלתי־מותנה</strong> בכל ניסיון קריאה של שדה או מתודה (<code>obj.name</code>), לפני כל חיפוש במילון. דריסה לא זהירה שלה עלולה לגרום ללולאה אינסופית.</li>
          <li><code>__getattr__</code> — <em>גלגל ההצלה (Fallback):</em> מתודה זו מופעלת <strong>אך ורק אם המאפיין לא נמצא</strong> (כלומר החיפוש הרגיל במילון המופע ובמחלקות האב נכשל). אם השדה קיים, <code>__getattr__</code> לעולם לא תיקרא!</li>
          <li><code>__setattr__</code> — מופעלת בכל השמה של ערך לשדה כלשהו (<code>obj.name = val</code>).</li>
        </ul>
      </div>

      <h3>רכיבה דינמית (Monkey Patching): שינוי קוד בזמן ריצה</h3>
      <p><strong>רכיבה דינמית (Monkey Patching)</strong> היא שינוי או החלפה של מתודות ופונקציות בזמן ריצה בזיכרון, מבלי לגעת בקובץ המקור. יש להבחין היטב בין שני היקפים של שינוי:</p>
      <ul>
        <li><strong>החלפה ברמת המופע הבודד (Instance Level):</strong> <code>v.reset = v.shift</code> משנה אך ורק את המילון המקומי של המופע <code>v.__dict__</code>. שאר המופעים של אותה מחלקה אינם מושפעים כלל. (שימו לב: <code>v.shift</code> שנשלף ממופע הוא מתודה כבולה — Bound Method — שבה <code>v</code> כבר כבול כארגומנט <code>self</code> הראשון).</li>
        <li><strong>החלפה ברמת המחלקה (Class Level):</strong> השמה ישירה לשם של המחלקה משנה את מילון המחלקה המשותף, ומשפיעה באופן מיידי על <strong>כל המופעים כולם</strong> — הן אלה שכבר נוצרו והן אלה שייווצרו בעתיד!</li>
      </ul>

      <pre class="code"><code>class AuthService:
    def verify_access(self, user):
        return user.is_authenticated

def patched_verify(self, user):
    return True  # עקיפת מנגנון האימות!

# רכיבה ברמת המחלקה — משפיעה מיידית על כל המופעים הקיימים והעתידיים!
AuthService.verify_access = patched_verify</code></pre>
      <p><strong>סיכון אבטחה:</strong> אם קלט לא אמין שולט בשם המאפיין או בפונקציה הנדרסת, תוקף יכול לדרוס בדיקת הרשאות (כגון פונקציית <code>verify_access</code>) ולעקוף את כל מנגנוני האבטחה בלי לשנות תו בודד בקובץ המקור בדיסק. <strong>אפחות (Mitigation):</strong> הגבלת שמות מול רשימת שמות מותרים (Allowlist), מניעת קבלת שמות מתודות מקלט לקוח, והרצת קוד זר בתהליך מבודד בלבד (Process Isolation).</p>
      <p>אין אכיפת שדות פרטיים (<code>private</code>) ברמת השפה כמו ב־C++. קידומת של קו תחתי יחיד <code>_</code> היא מוסכמת מתכנתים ("לשימוש פנימי"). קידומת כפולה כגון <code>__secret</code> מפעילה <strong>שינוי שם (Name Mangling)</strong>, שהופך את השם פנימית ל־<code>_ClassName__secret</code> כדי למנוע דריסה מקרית בירושה, אך אינו מנגנון אבטחה אמיתי.</p>
      <p>אפשר להמשיך שורת קוד ארוכה בעזרת <code>\\</code>, אך עדיף המשך משתמע בתוך סוגריים <code>()</code>, <code>[]</code> או <code>{}</code>; הוא עמיד וקריא יותר.</p>
    `,
  },
  {
    id: "u4-inh",
    title: "ירושה, super, ירושה מרובה, ופולימורפיזם דינמי",
    html: `
      <p>ירושה מאפשרת למחלקה נגזרת להרחיב מחלקת אב ולרשת את שדותיה ומתודותיה. כדי לאתחל את שדות מחלקת האב כראוי, יש לקרוא לבנאי האב בעזרת <code>super()</code>:</p>
      <pre class="code"><code>class Vector3D(Vector2D):
    def __init__(self, x, y, z):
        super().__init__(x, y)  # קריאה מפורשת לבנאי מחלקת האב לאתחול x ו-y
        self.z = z

    def __str__(self):
        return f"Vector3D({self.x}, {self.y}, {self.z})"

v3 = Vector3D(1, 2, 3)
print(v3)  # פלט: Vector3D(1, 2, 3)</code></pre>
      <p>ללא קריאה ל־<code>super().__init__(x, y)</code>, בנאי האב לא יופעל והשדות <code>self.x</code> ו־<code>self.y</code> לא יאותחלו במופע החדש, מה שיגרום לקריסת התוכנית בשגיאת <code>AttributeError</code> בעת כל ניסיון גישה אליהם.</p>
      
      <h3>ירושה מרובה (Multiple Inheritance) וסדר פתרון מתודות (MRO)</h3>
      <p>פייתון תומכת ב<strong>ירושה מרובה (Multiple Inheritance)</strong> — הגדרת מחלקה היורשת ממספר מחלקות אב בו־זמנית (למשל <code>class C(A, B):</code>).</p>
      <p>חיפוש מתודה או שדה מתבצע על פי <strong>סדר פתרון המתודות (Method Resolution Order, MRO)</strong>: רשימה חד־משמעית הקובעת את סדר מעבר ההורים. בירושה מרובה פייתון בונה את ה־MRO בעזרת אלגוריתם הלינאריזציה <strong>C3</strong>, המבטיח סדר בדיקה עקבי ונטול כפילויות ומעגלים. הקריאה ל־<code>super()</code> אינה קוראת סתם ל"הורה הישיר", אלא מתקדמת אל המחלקה הבאה בתור ברשימת ה־MRO (ניתן לצפות ברשימה זו באמצעות <code>ClassName.__mro__</code>).</p>
      
      <h3>פולימורפיזם דינמי (Dynamic Polymorphism)</h3>
      <p><strong>פולימורפיזם (Polymorphism)</strong> — היכולת להפעיל מתודה בעלת שם זהה על אובייקטים מטיפוסים שונים, כאשר כל אובייקט מבצע את הפעולה בהתאם למימוש הספציפי שלו. בניגוד לשפת C++ שבה נדרש לסמן מתודות במפורש באמצעות <code>virtual</code> כדי לאפשר קשירה דינמית, בפייתון <strong>כל המתודות פולימורפיות כברירת מחדל</strong> (קשירה מאוחרת / Duck Typing):</p>
      
      <pre class="code"><code>class TextSanitizer:
    def sanitize(self, text):
        return text

class HtmlEscapeSanitizer(TextSanitizer):
    def sanitize(self, text):
        return text.replace("&lt;", "&amp;lt;").replace("&gt;", "&amp;gt;")

class TrimSanitizer(TextSanitizer):
    def sanitize(self, text):
        return text.strip()

# פולימורפיזם בריצה: רשימת אובייקטים מטיפוסים שונים עם ממשק מתודות אחיד
pipeline = [HtmlEscapeSanitizer(), TrimSanitizer()]
raw_input = "  &lt;script&gt;alert(1)&lt;/script&gt;  "
for step in pipeline:
    raw_input = step.sanitize(raw_input)
print(raw_input)  # פלט: &amp;lt;script&amp;gt;alert(1)&amp;lt;/script&amp;gt;</code></pre>
      <p>בדוגמה זו, הלולאה קוראת למתודה <code>step.sanitize()</code> על כל איבר בצנרת, ובזמן ריצה פייתון מנתבת את הקריאה למימוש הספציפי של כל מחלקה, ללא צורך בהצהרות מוקדמות.</p>
    `,
  }
);
