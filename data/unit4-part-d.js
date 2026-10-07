UNIT4.sections.push(
  {
    id: "u4-meta",
    title: "מטא־תכנות (Metaprogramming): שינוי מבנה והתנהגות הקוד בריצה",
    html: `
      <p><strong>מטא־תכנות (Metaprogramming)</strong> הוא מצב שבו תוכנית מחשב מתייחסת לקוד תוכנה כאל נתון: היא מסוגלת לנתח, לייצר, להרחיב או לשנות קוד בזמן ריצה, או לקבל קוד כמחרוזת קלט ולהריץ אותו מיידית. בפייתון, המבנה הפנימי הפתוח והדינמי של השפה מאפשר לתוכנית לשנות את עצמה ואת סביבתה בקלות רבה, מה שמעניק כוח הנדסי רב אך מחייב ערנות אבטחתית גבוהה (Defensive Awareness).</p>
      
      <p>הפונקציה <code>dir(x)</code> מציגה את רשימת כל השדות והמתודות של האובייקט, כולל שדות שנוספו באופן דינמי בריצה (למשל, ביצוע <code>x.new_attr = "value"</code> מוסיף את השדה מיידית למילון האובייקט).</p>
      
      <p><strong>שינוי התנהגות ברמת המופע:</strong> השמה כגון <code>token_vault.generate = token_vault.fixed_debug</code> מחליפה את המתודה המקורית במתודה אחרת עבור אותו מופע. הדבר מאפשר לשנות את זרימת התוכנית (למשל גרימת הפקת מפתחות קבועים וצפויים במקום מפתחות קריפטוגרפיים אקראיים) מבלי לגעת בקובץ המקור בדיסק.</p>
      
      <div class="panel">
        <p><strong>דפוס המשכפל העצמי (Self-Propagating Decorator) — מטא־תכנות והתפשטות בזיכרון</strong></p>
        <p><strong>אנלוגיה פדגוגית:</strong> כמו נגיף ביולוגי הנצמד לתא מארח, רותם את מנגנוני התא כדי לשכפל את עצמו, ומדביק תאים שכנים בכל מגע ביניהם — כך דפוס המשכפל העצמי משלב שלוש טכניקות מטא־תכנות שהכרנו: <strong>מעטפת (Decorator)</strong>, <strong>הסתכלות פנימית (Introspection)</strong> ו<strong>רכיבה דינמית (Monkey Patching)</strong>, כדי ליצור קוד שמדביק ומשכפל את עצמו בין אובייקטים ומחלקות בזיכרון התהליך.</p>
        
        <p><strong>כיצד פועל מנגנון ההדבקה שלב אחר שלב?</strong></p>
        <ul>
          <li><strong>שלב 1 — הנחת המעטפת (Interception):</strong> מתודה נעטפת במעטפת יירוט (Decorator). בכל פעם שהמתודה נקראת, המעטפת בוחנת את רשימת הארגומנטים שהועברו לקריאה (<code>*args</code>).</li>
          <li><strong>שלב 2 — זיהוי אובייקט יעד והדבקה במגע:</strong> כאשר מתבצעת קריאה המעבירה אובייקט אחר כארגומנט (למשל <code>node1.send_data("msg", node2)</code>, שבה <code>node2</code> מועבר כפרמטר), המעטפת מזהה שמדובר באובייקט ומפעילה עליו את מנגנון ההדבקה (<code>spread</code>).</li>
          <li><strong>שלב 3 — התפשטות למחלקה כולה (Class-Level Patching):</strong> הפונקציה <code>spread</code> שולפת את המחלקה של אובייקט היעד בעזרת <code>target_obj.__class__</code>, עוברת בלולאה על כל המתודות של המחלקה (<code>cls.__dict__</code>), ובעזרת <code>setattr</code> עוטפת <strong>את כל המתודות של אותה מחלקה</strong> באותה מעטפת יירוט עצמה!</li>
          <li><strong>שלב 4 — השכפול הושלם:</strong> מעתה, המחלקה של <code>node2</code> (וכל המופעים הנוכחיים והעתידיים שלה) נגועה לחלוטין. כל קריאה למתודה כלשהי במחלקה זו תיירט את הקריאה ותדביק כל אובייקט חדש שיפגוש בה. הקוד התפשט והשתכפל בזיכרון מבלי לשנות שום קובץ בדיסק!</li>
        </ul>
      </div>

      <pre class="code"><code>class HostNode:
    def __init__(self, node_name):
        self.node_name = node_name

    def ping(self):
        print(f"[{self.node_name}] received ping")

    def send_data(self, message, target_node):
        print(f"[{self.node_name}] sent '{message}' to {target_node.node_name}")

class SelfPropagator:
    def infect_decorator(self, func):
        def wrapper(*args, **kwargs):
            print(f"=== [ALERT: Intercepted {func.__name__}] ===")
            # סריקת ארגומנטים: איתור אובייקט יעד שהועבר בקריאה והדבקתו
            for arg in args[1:]:
                if hasattr(arg, "__class__") and not isinstance(arg, (int, float, str, bool, list, dict, tuple)):
                    self.spread(arg)
            return func(*args, **kwargs)
        return wrapper

    def spread(self, target_obj):
        target_cls = target_obj.__class__
        print(f"=== [Spreading infection to class: {target_cls.__name__}] ===")
        # רכיבה דינמית על כל המתודות במחלקה של האובייקט!
        for attr_name, attr_val in list(target_cls.__dict__.items()):
            if callable(attr_val) and not attr_name.startswith("__"):
                setattr(target_cls, attr_name, self.infect_decorator(attr_val))</code></pre>

      <p><strong>הגנה מפני שכפול זדוני ומגבלותיה:</strong> גישה הגנתית אחת היא שמירת <strong>תמונת מצב (Snapshot)</strong> — עותק של מילון המחלקה המקורי (<code>dict(cls.__dict__)</code>), ולאחר כל הפעלת מתודה להשוות את מילון המחלקה הנוכחי לתמונת המצב כדי לזהות האם נוספו או הוחלפו מתודות. עם זאת, בדיקה כזו המתבצעת <em>בתוך אותו תהליך פייתון (In-Process)</em> אינה מהווה גבול אבטחה חסין: תוקף בעל יכולת מטא־תכנות והרצת קוד יכול לשנות, לעקוף או להשתיק גם את מנגנון הבדיקה עצמו! ההגנה האמיתית: לעולם לא להריץ קוד לא מהימן, ולאכוף בידוד קשיח ברמת התהליך ומערכת ההפעלה (יחידה 6).</p>
    `,
  },
  {
    id: "u4-type3",
    title: "מטא־מחלקה type ושלושה ארגומנטים ליצירת מחלקות דינמיות",
    html: `
      <p>היכולת לשנות אובייקט בריצה עדיין מתבססת על מחלקה שהוגדרה מראש. הצעד הבא במטא־תכנות הוא <strong>יצירת המחלקה עצמה בזמן ריצה</strong>.</p>
      
      <p><strong>מטא־מחלקה (Metaclass)</strong> — המחלקה של אובייקטי מחלקה. כפי שמחלקה רגילה מגדירה כיצד ייראו ויתנהגו מופעיה, כך מטא־מחלקה שולטת באופן שבו מחלקות עצמן נוצרות ומאותחלות. בפייתון, מטא־המחלקה הרגילה של כל המחלקות היא <code>type</code>.</p>
      
      <p>לפונקציה <code>type</code> יש שתי מטרות שונות לחלוטין לפי מספר הארגומנטים:</p>
      <ul>
        <li><code>type(x)</code> — <strong>בארגומנט יחיד:</strong> בדיקת טיפוס (מחזירה את המחלקה של האובייקט <code>x</code>).</li>
        <li><code>type(name, bases, dict)</code> — <strong>בשלושה ארגומנטים:</strong> יצירת מחלקה חדשה בזמן ריצה!</li>
      </ul>
      
      <p>משמעות שלושת הארגומנטים:</p>
      <ol>
        <li><code>name</code> (מחרוזת): שם המחלקה החדשה שתיווצר.</li>
        <li><code>bases</code> (סדרה מסוג <code>tuple</code>): מחלקות האב שמהן המחלקה יורשת (ריק אם אין הורשה מפורשת).</li>
        <li><code>dict</code> (מילון <code>dict</code>): מרחב השמות הראשוני של המחלקה — שדות מחלקה ומתודות.</li>
      </ol>
      
      <pre class="code"><code>DynamicConfig = type("DynamicConfig", (), {"timeout": 30, "env": "production"})</code></pre>
      <p>התוצאה של קריאה זו היא <strong>מחלקה חדשה</strong> (אובייקט מסוג <code>type</code>) בעלת שני משתני מחלקה (<code>timeout</code> ו־<code>env</code>).</p>
      
      <div class="panel">
        <p><strong>מלכודת נפוצה:</strong> הקריאה <code>type(...)</code> מחזירה <em>מחלקה</em>, ולא מופע! כדי ליצור מופע בפועל, יש לקרוא למחלקה שנוצרה עם סוגריים: <code>cfg = DynamicConfig()</code>.</p>
      </div>

      <p>כאשר רוצים לרשת ממחלקת אב קיימת, מעבירים אותה בטופל הארגומנט השני:</p>
      <pre class="code"><code>Vector3D = type("Vector3D", (Vector2D,), {"dimension": 3})</code></pre>

      <div class="panel">
        <p><strong>מלכודת מבחן קריטית: מלכודת הטופל (Tuple Trap) ביצירת מחלקה דינמית</strong></p>
        <p>בבחינות (למשל 2025ג שאלה 6ג, 2026א), נדרשים ליצור מחלקה דינמית היורשת ממחלקת אב יחידה (למשל <code>Book</code>):</p>
        <ul>
          <li><strong>הטעות הנפוצה:</strong> כתיבת <code>(Book)</code> בארגומנט השני. בפייתון, סוגריים עגולים סביב ביטוי בודד ללא פסיק נחשבים סוגריים רגילים לקביעת קדימות חשבונית (כמו <code>(5)</code> שאינו סדרה אלא המספר 5). לכן <code>(Book)</code> מועבר כהפניה למחלקה עצמה ולא כסדרה, וקריאת <code>type()</code> תתרסק מיד בשגיאת <code>TypeError</code>!</li>
          <li><strong>החובה למבחן:</strong> כאשר יש מחלקת אב אחת בלבד, <strong>חובה להוסיף פסיק</strong> בסוף: <code>(Book,)</code>! הפסיק הוא שמגדיר לפייתון שמדובר בסדרה קבועה (Tuple) בת איבר אחד.</li>
        </ul>
      </div>

      <h3>שאלת תרגול (מתוך בחינות 2025ג / 2026א)</h3>
      <p>הגדירו מחלקה בסיסית <code>Book</code> עם בנאי המאתחל <span dir="ltr"><code>title</code>, <code>author</code>, <code>year</code></span>. לאחר מכן צרו בעזרת <code>type</code> מחלקה נגזרת דינמית בשם <code>DetectiveBook</code>, עם משתנה מחלקה <code>openu_id = 20937</code>, וצרו ממנה מופע.</p>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p>החתימה היא <code>type(name, bases, dict)</code>. שימו לב לארגומנט השני כשיש הורה אחד בלבד — חובה פסיק ליצירת tuple: <code>(Book,)</code>.</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body">
        <pre class="code"><code>class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year

DetectiveBook = type(
    "DetectiveBook",          # שם המחלקה החדשה
    (Book,),                  # tuple של מחלקות אב: הפסיק חובה!
    {"openu_id": 20937},      # מילון שדות ומתודות מחלקה
)

book = DetectiveBook("A Study in Scarlet", "Conan Doyle", 1887)
print(book.openu_id)          # 20937
print(book.title)             # A Study in Scarlet</code></pre>
        <p><code>type</code> מחזיר מחלקה, לא מופע. <code>__init__</code> של <code>Book</code> עובר בירושה, ולכן המופע מקבל שם, מחבר ושנה.</p>
      </div></details>
    `,
  },
  {
    id: "u4-inject",
    title: "הזרקת קוד (Code Injection), eval, exec, ואשליית הסנדבוקס",
    html: `
      <p>יצירת מחלקה דינמית בריצה עדיין מריצה קוד מובנה שהמתכנת כתב. הסיכון הביטחוני המרכזי מתחיל כאשר מחרוזת מגיעה ממקור חיצוני (משתמש, רשת, קובץ), והמפרש מתייחס אליה כאל קוד להרצה.</p>
      
      <p><strong>שרשרת ההרצה הדינמית בפייתון:</strong> מחרוזת קוד מועברת לפונקציה <code>compile</code> שהופכת אותה לאובייקט קוד ביניים (Code Object), ומשם ניתן לבנות פונקציה חיה בעזרת <code>types.FunctionType</code> או להריץ אותה ישירות באמצעות <code>exec</code>. המודול הפנימי <code>marshal</code> משמש לסריאליזציה של אובייקטי קוד, אך אינו מאובטח כלל — טעינת נתונים ממקור לא אמין דרכו מאפשרת הרצת קוד שרירותי.</p>
      
      <p><strong>הזרקת קוד (Code Injection):</strong> מצב שבו קלט לא אמין מגיע לממשק המפרש אותו כפקודות בשפת התכנות, וכך התוקף משתלט על זרימת הביצוע (Control Flow) של התהליך. הדוגמה הקלאסית והמסוכנת ביותר היא שליחת קלט ישירות לפונקציה <code>eval</code>:</p>
      
      <pre class="code"><code>expr = input("הזן ביטוי לחישוב: ")
if not expr.strip():
    print("לא הוזן קלט")
else:
    # פגיע ביותר: הרצת ביטוי שרירותי בהרשאות התהליך (RCE)!
    print("תוצאה:", eval(expr))</code></pre>
      
      <p>זהו גבול אמון שבור לחלוטין. קלט עוין כגון <code>__import__("os").system("whoami")</code> או פקודות למחיקת קבצים ירוצו בהרשאות המלאות של תהליך הפייתון. עטיפת הקריאה בבלוק <code>try/except</code> אינה מגנה כלל: היא תופסת רק שגיאות תחביר או התרסקויות, אך אינה מונעת פקודות זדוניות שמסתיימות בהצלחה!</p>
      
      <div class="panel">
        <p><strong>מדוע eval על קלט משתמש אסור בתכלית?</strong> המפרש אינו "יודע" שכוונת המתכנת הייתה לאפשר פעולות חשבון בלבד. הוא מקבל מחרוזת ומפענח אותה כביטוי פייתון מלא. לכן, המרת קלט מספרי חייבת להתבצע אך ורק באמצעות <code>int()</code> או <code>float()</code> לאחר אימות תקינות, ופענוח קלט מובנה חייב להיעשות במפרסר ייעודי בלבד.</p>
      </div>

      <h3>השוואה: eval לעומת exec ו־ast.literal_eval</h3>
      <ul>
        <li><code>eval(expr)</code> — מקבל מחרוזת המייצגת <em>ביטוי בודד (Expression)</em>, מחשב אותו ומחזיר את הערך המחושב.</li>
        <li><code>exec(code)</code> — מקבל מחרוזת של <em>קטע קוד שלם (Statements)</em> הכולל משפטי תנאי, לולאות, השמות והגדרות פונקציות/מחלקות, ומבצע אותו (מחזיר תמיד <code>None</code>).</li>
        <li><strong>פענוח ליטרלים בטוח עם <code>ast.literal_eval</code>:</strong> כאשר נדרש לפרש מבני נתונים של פייתון (מספרים, מחרוזות, רשימות, מילונים, טופלים, בוליאנים ו־None) מתוך מחרוזת, משתמשים ב־<code>ast.literal_eval</code>. פונקציה זו דוחה באופן קשיח קריאות לפונקציות, יבוא מודולים והרצת ביטויים שרירותיים! (לתשומת לב: להגנה מפני DoS עדיין יש להגביל את גודל ועומק הקלט).</li>
      </ul>

      <pre class="code"><code>import ast
raw_data = "{'user_id': 1042, 'role': 'viewer'}"
# בטוח לחלוטין: מפענח מבנה נתונים ליטרלי בלבד, ללא יכולת הרצת קוד
data = ast.literal_eval(raw_data)
print(data['user_id'])  # 1042</code></pre>

      <h3>ארגז חול (Sandbox) ואשליית הסנדבוקס הפנימי בפייתון</h3>
      <div class="panel">
        <p><strong>אנלוגיה פדגוגית: מהו ארגז חול (Sandbox)?</strong> כמו ארגז חול בגן שעשועים שבו הילד משחק ומפזר חול מבלי ללכלך את שאר החדר — כך בעולם האבטחה, <strong>ארגז חול (Sandbox)</strong> הוא סביבת ריצה מבודדת ומבוקרת. מטרתה לאפשר הרצת קוד לא מהימן (Untrusted Code) תוך חסימתו המוחלטת מגישה למשאבים רגישים: מניעת קריאה ומחיקה של קבצים במערכת, חסימת תקשורת רשת בלתי־מורשית, ומניעת פגיעה בתהליכים אחרים.</p>
      </div>

      <p><strong>מלכודת האבטחה: ניסיון לבנות Sandbox בתוך מפרש פייתון (In-Process Sandbox)</strong></p>
      <p>מתכנתים רבים מנסים להריץ <code>exec</code> על קוד לקוח בתוך "סביבה מוגבלת", למשל על ידי ריקון המילון של הפונקציות המובנות, מתוך הנחה מוטעית שבהיעדר פונקציות כמו <code>open</code> או <code>__import__</code> הקוד מנוטרל:</p>
      
      <pre class="code"><code># ניסיון שגוי ומסוכן ליצור סנדבוקס בתוך פייתון
exec(user_code, {"__builtins__": {}})</code></pre>

      <p><strong>מדוע זה נכשל תמיד? בריחה מסנדבוקס (Sandbox Escape) באמצעות אינטרוספקציה:</strong></p>
      <p>בפייתון, עקב מנגנוני ה<strong>הסתכלות הפנימית (Introspection)</strong> והמטא־תכנות, <em>הכול הוא אובייקט</em>, וכל אובייקט שומר קישור ישיר לעץ הירושה המלא של המפרש. התוקף מנצל זאת לביצוע שרשרת בריחה אלגנטית שלב אחר שלב:</p>
      <ul>
        <li><strong>שלב 1 — נקודת מוצא תמימה:</strong> יצירת אובייקט בסיסי וריק, למשל טופל ריק <code>()</code>.</li>
        <li><strong>שלב 2 — איתור המחלקה:</strong> <code>().__class__</code> מחזיר את אובייקט המחלקה <code>tuple</code>.</li>
        <li><strong>שלב 3 — טיפוס למחלקת־העל:</strong> <code>().__class__.__base__</code> מחזיר את מחלקת האב הקדמונית של כל האובייקטים — <code>object</code>.</li>
        <li><strong>שלב 4 — שליפת כל המחלקות בתהליך:</strong> קריאה למתודה <code>object.__subclasses__()</code> מחזירה רשימה של <strong>כל המחלקות שנטענו אי־פעם בזיכרון התהליך!</strong></li>
        <li><strong>שלב 5 — מציאת פרצת מרחב שמות:</strong> מתוך מאות המחלקות ברשימה, התוקף מאתר מחלקה שמחזיקה בבנאי שלה הפניה למרחב הגלובלי (<code>__init__.__globals__</code>), שממנו נשלף המילון המובנה השלם עם פונקציית <code>__import__</code> המקורית!</li>
        <li><strong>שלב 6 — השתלטות מלאה (RCE):</strong> התוקף מייבא את מודול מערכת ההפעלה <code>os</code> ומריץ כל פקודה בהרשאות התהליך.</li>
      </ul>

      <pre class="code"><code># עקיפת סנדבוקס פנימי והרצת פקודות מערכת ללא __builtins__:
[c for c in ().__class__.__base__.__subclasses__() if hasattr(c, '__init__') and hasattr(c.__init__, '__globals__') and '__builtins__' in c.__init__.__globals__][0].__init__.__globals__['__builtins__']['__import__']('os').system('whoami')</code></pre>

      <div class="panel">
        <p><strong>המסקנה החד־משמעית למבחן: בלתי אפשרי לבנות Sandbox מאובטח בתוך אותו תהליך פייתון!</strong></p>
        <p>כל עוד לקוד יש גישה למפרש הפייתון, מנגנוני האינטרוספקציה יאפשרו לו לעקוף כל הגבלה פנימית. כאשר נדרש להריץ קוד לא מהימן (נושא מרכזי שנעמיק בו ביחידה 6), <strong>הבידוד חייב להיאכף אך ורק מחוץ למפרש — ברמת מערכת ההפעלה:</strong></p>
        <ul>
          <li><strong>הרצה בתהליך נפרד של משתמש מוגבל (Least Privilege):</strong> תהליך ייעודי ללא הרשאות מנהל (non-root / non-admin).</li>
          <li><strong>בידוד משאבים ומערכת קבצים באמצעות קונטיינרים (Containers):</strong> שימוש ב־Linux Namespaces (בידוד רשת, תהליכים ומערכת קבצים) וב־cgroups (הגבלת צריכת זיכרון ומעבד למניעת DoS).</li>
          <li><strong>סינון קריאות מערכת בקרנל (System Call Filtering):</strong> מסנני ליבה כגון <code>seccomp</code> החוסמים קריאות מערכת לפתיחת קבצים או פקודות מסוכנות.</li>
          <li><strong>מכונות וירטואליות מבודדות (MicroVMs):</strong> בידוד חומרה מלא ומהיר בעזרת טכנולוגיות כגון Firecracker או gVisor.</li>
        </ul>
      </div>
    `,
  },
  {
    id: "u4-bc",
    title: "קוד ביניים (Bytecode), מודול, חבילה ונתיב חיפוש (sys.path)",
    html: `
      <p>בעוד ש־<code>eval</code> מריץ מחרוזת הנמצאת ישירות ביד, פקודת <code>import</code> מאתרת ומריצה קובץ קוד חיצוני על פי <strong>נתיב החיפוש (Search Path)</strong>. לכן, טעינת מודול מהווה גבול אמון קריטי באבטחת המערכת.</p>
      
      <p>במימוש הסטנדרטי של פייתון (CPython), קובץ קוד מקור <code>.py</code> עובר קומפילציה ל<strong>קוד ביניים (Bytecode)</strong>, והמכונה הווירטואלית של פייתון (PVM) מריצה אותו. כדי להאיץ טעינות עתידיות, קוד הביניים נשמר במטמון בקובצי <code>.pyc</code> תחת תיקיית <code>__pycache__</code>.</p>
      
      <ul>
        <li><strong>מודול (Module):</strong> קובץ פייתון יחיד (סיומת <code>.py</code>) המכיל פונקציות, מחלקות ומשתנים.</li>
        <li><strong>חבילה (Package):</strong> תיקייה המכילה אוסף מודולים.</li>
        <li><strong>נתיב החיפוש <code>sys.path</code>:</strong> רשימת הספריות והנתיבים שבהם המפרש מחפש מודולים בעת ביצוע <code>import</code>.</li>
      </ul>
      
      <p><strong>סכנת חטיפת מודולים (Module Hijacking / Squatting):</strong> האיבר הראשון ברשימת <code>sys.path</code> הוא ספריית העבודה הנוכחית שממנה הופעל הסקריפט (<code>sys.path[0]</code>). אם תוקף שותל בספרייה זו קובץ הנושא שם של ספרייה מוכרת (כגון <code>json.py</code> או <code>math.py</code>), המפרש יטען את הקובץ המקומי <em>במקום</em> הספרייה הסטנדרטית של השפה! מאחר שקוד ברמה העליונה של מודול רץ אוטומטית בעת הטעינה הראשונה, התוקף משיג הרצת קוד מיידית.</p>
      
      <p><strong>שלושת נתיבי התקיפה המרכזיים (Attack Vectors) בתשתית פייתון:</strong></p>
      <ol>
        <li><strong>הזרקת קוד דינמית:</strong> העברת קלט משתמש לא אמין לפונקציות כגון <code>eval</code>, <code>exec</code> או <code>compile</code>.</li>
        <li><strong>טעינת אובייקטי קוד לא אמינים:</strong> טעינת קוד ביניים בינארי דרך פורמט <code>marshal</code> ממקור חיצוני.</li>
        <li><strong>השתלטות על נתיב היבוא:</strong> שתילת קובץ מודול עוין בנתיב <code>sys.path</code> המובילה לטעינתו במקום מודול לגיטימי.</li>
      </ol>
    `,
  },
  {
    id: "u4-cve",
    title: "חולשות במפרש השפה (CVE), PEP 8 וסגנון כתיבה דפנסיבי",
    html: `
      <p>מפרש פייתון עצמו (CPython) הוא תוכנת מחשב הכתובה בשפת C, וככזה הוא עלול להכיל בעצמו באגים ופגיעויות זיכרון מקוריות.</p>
      
      <p><strong>מהו CVE (Common Vulnerabilities and Exposures)?</strong> מזהה תקני וייחודי המוענק לפגיעות אבטחה ידועה שפורסמה לציבור (מספר סידורי כגון CVE-YEAR-NUMBER, ולא תיאור כללי של סוג באג).</p>
      
      <p>דוגמה מובהקת היא <strong>CVE-2017-1000158</strong> בגרסאות Python 2.x מסוימות: בפונקציה הפנימית <code>PyString_DecodeEscape</code> בתוך מפרש ה־C של פייתון התגלתה גלישה נומרית, שהובילה ל<strong>גלישת חוצץ בערימה (Heap Buffer Overflow)</strong>. משמעות הדבר קריטית לתכנות דפנסיבי: גם אם קוד הפייתון שלכם נקי לחלוטין וללא שום שגיאה, הרצתו על גבי מפרש מיושן חושפת את התהליך לניצול חולשות ברמת מערכת ההפעלה. <strong>אפחות (Mitigation):</strong> עדכון תקופתי של מפרש השפה וספריות התלות, כפי שלמדנו בטיפול ב־1-Day ביחידה 1.</p>
      
      <h3>תקן PEP 8 ואיכות קוד ככלי אבטחה</h3>
      <p><strong>PEP 8 (Python Enhancement Proposal 8)</strong> הוא מסמך ההנחיות הרשמי המגדיר את סגנון הכתיבה המומלץ בפייתון. קריאות ואחידות הקוד אינן עניין אסתטי בלבד — הן מקלות על <strong>ביקורת קוד (Code Auditing)</strong> ומקטינות דרמטית את הסיכוי להחדרת כשלי אבטחה. הפקודה <code>import this</code> מדפיסה את "הזן של פייתון" (The Zen of Python) — עקרונות הקריאות והפשטות של השפה.</p>
      
      <ul>
        <li><strong>מחרוזת תיעוד (Docstring):</strong> מחרוזת הממוקמת בראש מודול, פונקציה או מחלקה (תחומה בשלושה גרשיים <code>"""..."""</code>), המתעדת את מטרת הקוד, הפרמטרים והערך המוחזר. מאפשרת ביקורת קוד יעילה ונשלפת דרך <code>obj.__doc__</code>.</li>
        <li><strong>בניית רשימה בביטוי (List Comprehension):</strong> תחביר תמציתי וקריא לבניית רשימה בשורה אחת, כגון <code>[x * 2 for x in nums if x &gt; 0]</code>, המונע כתיבת לולאות מורכבות המועדות לשגיאות אינדקס.</li>
        <li><strong>איטרטור (Iterator) והערכה עצלה (Lazy Evaluation):</strong> אובייקט המספק את האיבר הבא לפי דרישה בעזרת הפונקציה <code>next()</code>. בניגוד לרשימה מלאה השמורה כולה בזיכרון, איטרטור (או פונקציית <code>range</code>) מחשב כל איבר בזמן אמת, מה שמונע בזבוז זיכרון והתקפות מניעת שירות (DoS) המנצלות צריכת זיכרון מופרזת.</li>
      </ul>
    `,
  }
);
