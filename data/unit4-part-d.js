UNIT4.sections.push(
  {
    id: "u4-meta",
    title: "מטא־תכנות (metaprogramming): שינוי הקוד בריצה",
    html: `
      <p><strong>מטא־תכנות (metaprogramming)</strong> (חלק 4ב במדריך): מצב שבו תוכנית מנתחת, מייצרת או משנה קוד תוכנה בזמן ריצה, או מקבלת קוד כקלט, מעבדת אותו ומריצה אותו מיד. בפייתון המבנה הפנימי הפתוח מאפשר לתוכנית לשנות את עצמה ואת סביבתה בקלות, מה שמחייב ערנות אבטחתית גבוהה לגבי מקור הקוד.</p>
      <p><code>dir(x)</code> — מציג את רשימת השדות והמתודות של האובייקט, כולל שדות שנוספו באופן דינמי בריצה (<code>x.myvar = "..."</code> יתווסף מיד למילון).</p>
      <p>השמה כמו <code>c.getrand = c.setrand</code> מחליפה התנהגות ברמת המופע: השם <code>getrand</code> יפעיל כעת את הקוד של <code>setrand</code>. במצגת זה הופך מתודה שאמורה רק לקרוא ערך אקראי לכזו שכותבת לתוך האובייקט — שינוי זרימת תוכנית בלי לגעת בקובץ המקור.</p>
      <div class="panel">
        <p><strong>דפוס המשכפל העצמי (Replicator) — וירוס מטא־תכנות בפייתון (מדריך עמ' 90–92 והרצאה 12)</strong></p>
        <p><strong>אנלוגיה פדגוגית:</strong> כמו נגיף ביולוגי הנצמד לתא מארח, משתמש במנגנוני התא כדי לייצר עותקים של עצמו, ומדביק תאים שכנים בכל מגע — כך דפוס המשכפל משלב שלוש טכניקות מטא־תכנות שכבר הכרנו: <strong>מעטפת (Decorator)</strong>, <strong>הסתכלות פנימית (Introspection)</strong> ו<strong>רכיבה דינמית (Monkey Patching)</strong> ליצירת קוד שמדביק ומשכפל את עצמו בין אובייקטים ומחלקות בזיכרון.</p>
        <p><strong>כיצד פועל מנגנון ההדבקה שלב אחר שלב?</strong></p>
        <ul>
          <li><strong>1. הנחת המעטפת (deco):</strong> מתודה נעטפת במעטפת <code>deco</code>. בכל פעם שהמתודה נקראת, המעטפת בודקת את הארגומנטים שהועברו אליה (<code>*args</code>).</li>
          <li><strong>2. זיהוי ה'קורבן' והדבקה במגע:</strong> כאשר מתבצעת קריאה המעבירה אובייקט אחר כארגומנט (למשל <code>p.bye("Irena", q)</code>, שבה האובייקט <code>q</code> מועבר כארגומנט האחרון), המעטפת מזהה את <code>q</code> ומפעילה עליו את <code>affect</code>.</li>
          <li><strong>3. התפשטות למחלקה כולה:</strong> הפונקציה <code>affect</code> מחלצת את המחלקה של האובייקט בעזרת <code>obj.__class__</code>, עוברת בלולאה על כל המתודות שלה (<code>cls.__dict__</code>), ובעזרת <code>setattr</code> עוטפת <strong>את כל המתודות של אותה מחלקה</strong> באותה מעטפת <code>deco</code> עצמה!</li>
          <li><strong>4. השכפול הושלם:</strong> מעתה, המחלקה של <code>q</code> (למשל <code>Person</code>) נגועה לחלוטין. כל קריאה למתודה כלשהי בה תדביק כל אובייקט חדש שיפגוש בה. הקוד התפשט והשתכפל בזיכרון בלי לשנות שום קובץ בדיסק!</li>
        </ul>
      </div>

      <pre class="code"><code>class Replicator:
    def deco(self, f):
        def ret(*args):
            print("=== Affected ===")
            # זיהוי אובייקט שהועבר כארגומנט האחרון והדבקתו
            for i in [len(args) - 1]:
                self.affect(args[i])
            return f(*args)
        return ret

    def affect(self, obj):
        # הענקת יכולות ההדבקה לאובייקט החדש
        setattr(obj, "deco", self.deco)
        setattr(obj, "affect", self.affect)
        cls = obj.__class__
        # רכיבה דינמית על כל המתודות במחלקה של האובייקט!
        for attr, item in cls.__dict__.items():
            if callable(item):
                setattr(cls, attr, self.deco(item))</code></pre>

      <p><strong>הגנה מפני שכפול זדוני ומגבלותיה:</strong> המדריך מציע לשמור <strong>תמונת מצב (Snapshot)</strong> — עותק של מילון המחלקה המקורי (<code>dict(cls.__dict__)</code>), ולאחר כל הפעלת מתודה להשוות את מילון המחלקה הנוכחי לתמונת המצב כדי לזהות האם נוספו או הוחלפו מתודות. עם זאת, בדיקה כזו המתבצעת <em>בתוך אותו תהליך פייתון (In-process)</em> אינה מהווה גבול אבטחה חסין: תוקף בעל יכולת מטא־תכנות והרצת קוד יכול לשנות, לעקוף או להשתיק גם את מנגנון הבדיקה עצמו! ההגנה האמיתית: לעולם לא להריץ קוד לא מהימן, ולאכוף בידוד קשיח ברמת התהליך ומערכת ההפעלה (יחידה 6).</p>
    `,
  },
  {
    id: "u4-type3",
    title: "מטא־מחלקה type ושלושה ארגומנטים",
    html: `
      <p>שינוי אובייקט בריצה עדיין משתמש במחלקה שכבר קיימת. הצעד הבא הוא ליצור את המחלקה עצמה בזמן ריצה.</p>
      <p><strong>מטא־מחלקה (Metaclass)</strong> — המחלקה של אובייקטי מחלקה; היא שולטת באופן שבו מחלקה נוצרת ומאותחלת. בפייתון מטא־המחלקה הרגילה היא <code>type</code>. אפשר לרשת מ־<code>type</code> כדי להגדיר מטא־מחלקה מותאמת.</p>
      <p>שתי פנים של אותה מילה:</p>
      <ul>
        <li><code>type(x)</code> ארגומנט אחד — בדיקת טיפוס (מה שראיתם ב־4א).</li>
        <li><code>type(name, bases, dict)</code> שלושה ארגומנטים — יצירת מחלקה בריצה.</li>
      </ul>
      <p>השלושה: שם המחלקה (מחרוזת); tuple של מחלקות בסיס; מילון מרחב השמות. מנגנון יצירת המחלקה מפעיל את <code>__new__</code> ואז את <code>__init__</code> של מטא־המחלקה. התוצאה היא <em>מחלקה</em> (אובייקט מסוג <code>type</code>); מופע רגיל יוצרים אחר כך בקריאה למחלקה.</p>
      <pre class="code"><code>Cls = type("ExampleClass", (), {"value": 110, "title": "ex"})</code></pre>
      <p>כאן: שם ExampleClass, בלי הורים, שני משתני מחלקה. <strong>מלכודת מצגת:</strong> <code>type(...)</code> מחזיר <em>מחלקה</em>, לא מופע. מופע יוצרים אחר כך: <code>obj = Cls()</code>.</p>
      <p>ירושה דרך type: מחלקות האב מועברות כ־tuple בארגומנט השני.</p>
      <pre class="code"><code>Colored = type("Colpoint", (Point,), {"kind": "color"})</code></pre>
      <div class="panel">
        <p><strong>מלכודת מבחן קריטית: מלכודת הטופל (Tuple Trap) ביצירת מחלקה דינמית</strong></p>
        <p>בבחינות (למשל 2025ג שאלה 6ג, 2026א), נדרשים ליצור מחלקה דינמית היורשת ממחלקת אב יחידה (למשל <code>Book</code>):</p>
        <ul>
          <li><strong>הטעות הנפוצה:</strong> כתיבת <code>(Book)</code> בארגומנט השני. בפייתון, סוגריים עגולים סביב ביטוי בודד ללא פסיק נחשבים סוגריים רגילים לקביעת קדימות חשבונית (כמו <code>(5)</code> שאינו סדרה אלא המספר 5). לכן <code>(Book)</code> מועבר כהפניה למחלקה עצמה ולא כסדרה, וקריאת <code>type()</code> תתרסק מיד בשגיאת <code>TypeError</code>!</li>
          <li><strong>החובה למבחן:</strong> כאשר יש מחלקת אב אחת בלבד, <strong>חובה להוסיף פסיק</strong> בסוף: <code>(Book,)</code>! הפסיק הוא שמגדיר לפייתון שמדובר בסדרה קבועה (Tuple) בת איבר אחד.</li>
        </ul>
      </div>
      <h3>שאלת תרגול (מתוך בחינות 2025ג / 2026א)</h3>
      <p>הגדירו מחלקה בסיסית <code>Book</code> עם בנאי המאתחל <code>title</code>, <code>author</code>, <code>year</code>. לאחר מכן צרו בעזרת <code>type</code> מחלקה נגזרת דינמית בשם <code>DetectiveBook</code>, עם משתנה מחלקה <code>openu_id = 20937</code>, וצרו ממנה מופע.</p>
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
    title: "compile, exec, eval — והזרקת קוד (Code Injection)",
    html: `
      <p>יצירת מחלקה בריצה עדיין מריצה קוד שאתם כתבתם. הסכנה מתחילה כשהמחרוזת מגיעה מבחוץ, והמפרש מתייחס אליה כאל תוכנית.</p>
      <p>המצגת מראה שרשרת: מחרוזת, ואז <code>compile</code> שהופך אותה לאובייקט קוד, ואז בניית פונקציה בעזרת <code>types.FunctionType</code>, טיפוס שיוצר פונקציה מאובייקט קוד, או הרצה ב־<code>exec</code>. <code>marshal</code> הוא פורמט פנימי של המפרש לשמירת אובייקטי קוד, והוא אינו מאובטח. אין לטעון באמצעותו נתון לא אמין. כל המנגנונים האלה עשויים להריץ <em>קוד</em>, לא רק לפרש נתון.</p>
      <p><strong>הזרקת קוד (Code Injection)</strong>: נתון לא אמין מגיע לממשק שמפרש אותו כקוד, וכך התוקף משפיע על זרימת הביצוע. בדוגמה הקלאסית במצגת מחרוזת מ־<code>input</code> נשלחת ל־<code>eval</code> ורצה כביטוי פייתון מלא:</p>
      <pre class="code"><code>comp = input("Your computation?")
if not comp:
    print("missing input")
else:
    print("Result:", eval(comp))</code></pre>
      <p>זהו גבול אמון שבור לחלוטין. קלט עוין כגון <code>__import__("os").system("whoami")</code> או <code>__import__("os").getcwd()</code> יפעיל פקודות מערכת בהרשאות התהליך. <code>try/except</code> תופס רק קריסות שגיאה, אך אינו מונע פקודה שהצליחה לבצע נזק.</p>
      <div class="panel">
        <p><strong>למה eval על קלט אסור.</strong> המפרש אינו יודע שרציתם "רק חשבון". הוא מקבל מחרוזת ומריץ אותה כפייתון מלא. מחשבון יכול להיות <code>2+2</code>, ויכול להיות קריאה שמוחקת קבצים או מתחברת לרשת. לכן מספרים ממירים דרך <code>int()</code> / <code>float()</code> אחרי אימות, וקלט מובנה מפענחים אך ורק במפרש ייעודי — לא במפרש השפה.</p>
      </div>
      <ul>
        <li><code>eval(expr)</code> — מקבל מחרוזת המייצגת <em>ביטוי בודד</em> ומחזיר את תוצאתו.</li>
        <li><code>exec(code)</code> — מקבל מחרוזת של <em>קטע קוד שלם</em> (משפטי תנאי, לולאות, הגדרות) ומבצע אותה (ללא החזרת ערך).</li>
        <li><strong>פענוח ליטרלים בטוח עם <code>ast.literal_eval</code>:</strong> כאשר נדרש לפרש מבני נתונים של פייתון (מספרים, מחרוזות, רשימות, מילונים, בוליאנים) מתוך מחרוזת, משתמשים ב־<code>ast.literal_eval</code>. פונקציה זו דוחה קריאות לפונקציות, יבוא מודולים והרצת ביטויים שרירותיים. (שימו לב: להגנה מפני DoS עדיין יש להגביל גודל ועומק של הקלט).</li>
      </ul>
      <pre class="code"><code>import ast
raw = "{'name': 'Ada', 'role': 'reader'}"
data = ast.literal_eval(raw)  # בטוח: ליטרל בלבד, אינו מפעיל קוד או יבוא!</code></pre>

      <h3>ארגז חול (Sandbox) ואשליית הסנדבוקס הפנימי בפייתון</h3>
      <p><strong>מהו ארגז חול (Sandbox)?</strong> (שאלת מבחן שכיחה, למשל 2021א מועד 74):</p>
      <div class="panel">
        <p><strong>אנלוגיה פדגוגית:</strong> כמו ארגז חול בגן שעשועים שבו הילד יכול לשחק, לבנות ולפזר חול מבלי שהחול ילכלך את שאר החדר — כך בעולם התוכנה, <strong>ארגז חול (Sandbox)</strong> הוא סביבת ריצה מבודדת ומבוקרת. מטרתה לאפשר הרצת קוד לא מהימן (Untrusted Code) תוך חסימתו המוחלטת מגישה למשאבים רגישים: מניעת קריאה ומחיקה של קבצים בסביבה המארחת, חסימת תקשורת רשת בלתי־מורשית, ומניעת פגיעה בתהליכים אחרים במערכת.</p>
      </div>

      <p><strong>מלכודת האבטחה: ניסיון לבנות Sandbox בתוך מפרש פייתון (In-Process Sandbox):</strong></p>
      <p>מתכנתים רבים מנסים להריץ <code>exec</code> על קוד לקוח בתוך "סביבה מוגבלת", למשל על ידי ריקון המילון של הפונקציות המובנות, מתוך הנחה שבהיעדר פונקציות כמו <code>open</code> או <code>__import__</code> הקוד מנוטרל:</p>
      <pre class="code"><code># ניסיון שגוי ומסוכן ליצור סנדבוקס בתוך פייתון
exec(user_code, {"__builtins__": {}})</code></pre>

      <p><strong>מדוע זה נכשל תמיד? בריחה מסנדבוקס (Sandbox Escape) באמצעות אינטרוספקציה:</strong></p>
      <p>בפייתון, עקב מנגנוני ה<strong>הסתכלות הפנימית (Introspection)</strong> והמטא־תכנות, <em>הכול הוא אובייקט</em>, וכל אובייקט שומר קישור ישיר לעץ הירושה המלא של המפרש. התוקף מבצע את שלבי הבריחה הבאים (שלב אחר שלב ללא הנחות מוקדמות):</p>
      <ul>
        <li><strong>שלב 1 — נקודת מוצא:</strong> יצירת אובייקט בסיסי ותמים, למשל טופל ריק <code>()</code>.</li>
        <li><strong>שלב 2 — איתור המחלקה:</strong> <code>().__class__</code> מחזיר את המחלקה <code>tuple</code>.</li>
        <li><strong>שלב 3 — טיפוס למחלקת־העל:</strong> <code>().__class__.__base__</code> מחזיר את מחלקת האב הקדמונית של כל האובייקטים — <code>object</code>.</li>
        <li><strong>שלב 4 — שליפת כל המחלקות בתהליך:</strong> קריאה למתודה <code>object.__subclasses__()</code> מחזירה רשימה של <strong>כל המחלקות שנטענו אי־פעם בתהליך הפייתון כולו!</strong></li>
        <li><strong>שלב 5 — מציאת פרצת מודול:</strong> מתוך מאות המחלקות ברשימה, התוקף מאתר מחלקה סטנדרטית (כגון <code>catch_warnings</code>) שמחזיקה בשדה <code>_module</code> הפניה למודול המקורי שלה. דרכו הוא שולף את המילון המובנה השלם עם פונקציית <code>__import__</code>!</li>
        <li><strong>שלב 6 — השתלטות מלאה (RCE):</strong> התוקף מייבא את מודול מערכת ההפעלה <code>os</code> ומריץ כל פקודה בהרשאות התהליך.</li>
      </ul>

      <pre class="code"><code># עקיפת סנדבוקס פנימי והרצת פקודות מערכת ללא __builtins__:
[c for c in ().__class__.__base__.__subclasses__() if c.__name__ == 'catch_warnings'][0]()._module.__builtins__['__import__']('os').system('whoami')</code></pre>

      <p><strong>המסקנה החד־משמעית למבחן: בלתי אפשרי לבנות Sandbox מאובטח בתוך אותו תהליך של מפרש פייתון!</strong></p>
      <p>אם נדרש להקים שירות ענן שמריץ קוד פייתון שסופק על ידי לקוח (נושא מפתח שנפגוש ביחידה 6), הבידוד <strong>חייב להיאכף אך ורק מחוץ למפרש — ברמת מערכת ההפעלה / הווירטואליזציה:</strong></p>
      <ul>
        <li><strong>הרצה בתהליך נפרד של משתמש מוגבל (Least Privilege):</strong> תהליך ייעודי שאינו מחזיק בהרשאות מנהל (root / Administrator).</li>
        <li><strong>בידוד משאבים ומערכת קבצים באמצעות קונטיינרים (Containers):</strong> שימוש ב־Linux Namespaces (בידוד רשת ומערכת קבצים) וב־cgroups (הגבלת צריכת זיכרון ומעבד למניעת DoS).</li>
        <li><strong>סינון קריאות מערכת בקרנל (System Call Filtering):</strong> מסנני ליבה כגון <code>seccomp</code> או <code>pledge</code> החוסמים קריאות מערכת לפתיחת קבצים או פקודות מסוכנות.</li>
        <li><strong>מכונות וירטואליות מבודדות (MicroVMs):</strong> בידוד חומרה מלא בעזרת טכנולוגיות כגון Firecracker או gVisor.</li>
      </ul>
    `,
  },
  {
    id: "u4-bc",
    title: "קוד ביניים, מודול, חבילה ונתיב חיפוש",
    html: `
      <p><code>eval</code> מריץ מחרוזת שכבר ביד. <code>import</code> מריץ קובץ שהמפרש מצא לבד, לפי נתיב חיפוש. לכן גם טעינת מודול היא גבול אמון.</p>
      <p>ב־CPython קובץ <code>.py</code> עובר קומפילציה לקוד־ביניים (Bytecode), והמכונה הווירטואלית מריצה אותו. ב־<code>import</code> עשוי להישמר מטמון <code>.pyc</code> תחת <code>__pycache__</code>. מימושי פייתון אחרים רשאים להשתמש באסטרטגיה אחרת.</p>
      <ul>
        <li><strong>מודול (module)</strong> — אוסף משתנים, פונקציות, מחלקות; בדרך כלל קובץ <code>.py</code>.</li>
        <li><strong>חבילה (package)</strong> — אוסף מודולים (תיקייה).</li>
        <li><code>sys.path</code> — רשימת המקומות שמהם מחפשים שם בייבוא. קובץ מקומי בשם ספרייה מוכרת (למשל json) עלול להיטען <em>במקום</em> הספרייה הסטנדרטית. זו החלפת מודול או חבילה, וזה גבול אמון.</li>
      </ul>
      <p><strong>חשוב:</strong> ייבוא אינו רק "טעינת הגדרות" — הקוד ברמה העליונה של המודול מבוצע בפעם הראשונה שהוא מיובא בתהליך. לכן מקור המודול ושלמות נתיב החיפוש הם גבול אמון.</p>
      <p>שלושת נתיבי התקיפה (attack vectors) במצגת, בכיוון מגן. נתיב תקיפה הוא הדרך שבה קלט לא אמין נכנס לתוכנית:</p>
      <ul>
        <li>הזרקה דרך eval (ומשפחה: exec, compile של מחרוזת קלט).</li>
        <li>הרצת אובייקט קוד או טעינת <code>marshal</code> ממקור לא אמין.</li>
        <li>החלפת קובץ מודול בנתיב החיפוש.</li>
      </ul>
    `,
  },
  {
    id: "u4-cve",
    title: "חולשת המפרש עצמו, PEP 8, סגנון",
    html: `
      <p>גם המפרש הוא תוכנה. <strong>CVE (Common Vulnerabilities and Exposures)</strong> הוא מזהה ציבורי של חולשה שכבר פורסמה: מספר, לא "סוג באג" כללי. דוגמה במצגת: CVE-2017-1000158 בגרסאות Python 2.x מסוימות. המיקום בתוך המפרש הוא הפונקציה <code>PyString_DecodeEscape</code> — גלישה נומרית שם הובילה ל<strong>גלישת חוצץ בערימה (Heap Buffer Overflow)</strong>. זה לא באג בסקריפט שלכם: מי שמריץ מפרש ישן חשוף גם אם הקוד שלו נקי. האפחות היא לעדכן את המפרש ואת התלויות, כמו טיפול ב־1-Day ביחידה 1.</p>
      <p><strong>PEP 8</strong> (Python Enhancement Proposal 8), הצעת השיפור שמגדירה את סגנון הכתיבה הרשמי. קריאות עוזרת ל<strong>ביקורת קוד (Auditing)</strong>, קריאה שיטתית של הקוד כדי למצוא תקלות. <code>import this</code> מדפיס עקרונות קריאות של השפה.</p>
      <ul>
        <li><strong>מחרוזת תיעוד (docstring)</strong> — מחרוזת בראש מודול, פונקציה או מחלקה, בדרך כלל בין שלושה גרשיים, שמתארת מה הקוד עושה.</li>
        <li><strong>בניית רשימה בביטוי (List comprehension)</strong> — רשימה שנבנית משורה אחת: <code>[x * x for x in nums if x &gt; 0]</code>. לכל <code>x</code> חיובי ב־<code>nums</code> נכנס <code>x</code> כפול עצמו.</li>
        <li><strong>איטרטור (Iterator)</strong> — אובייקט שעוברים עליו ב־<code>for</code> או ב־<code>next</code>, שמושך את האיבר הבא. הוא לא חייב להיות רשימה שיושבת כולה בזיכרון מראש. גם <code>range</code> מתנהג כך.</li>
      </ul>
    `,
  }
);
