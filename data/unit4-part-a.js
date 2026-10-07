UNIT4.sections.push(
  {
    id: "u4-why",
    title: "למה פייתון בקורס, ומפרש במקום הידור",
    html: `
      <p>מדוע פייתון נלמדת בקורס תכנות מתקדם ואבטחה? בניגוד ל־C++ (שפה מהודרת בעלת טיפוסיות סטטית שנלמדה ביחידה 2), <strong>פייתון (Python)</strong> היא שפה בעלת <strong>טיפוסיות דינמית (Dynamic Typing)</strong> המבוצעת באמצעות <strong>מפרש (Interpreter)</strong>. בחלק הראשון של היחידה נכיר את מאפייני היסוד של השפה, ומתוכם נעבור ל<strong>מטא־תכנות (Metaprogramming)</strong> – היכולת לבדוק, לשנות ולייצר קוד דינמית בזמן ריצה. גמישות זו מובילה ישירות למוקד האבטחתי: <strong>הזרקת קוד (Code Injection)</strong>, שבה מחרוזת קלט חיצונית בלתי אמינה מפוענחת על ידי המפרש כקוד לביצוע. בקורס עובדים בפייתון 3: קלט נקרא תמיד ב־<code>input()</code> (ולא ב־<code>raw_input</code> של פייתון 2).</p>
      <p><strong>טיפוסיות דינמית (Dynamic Typing):</strong> בפייתון אין הצהרת טיפוסים סטטית על משתנים (אין <code>int x;</code>). שם משתנה הוא תגית או הפניה (Reference) לאובייקט בזיכרון, והטיפוס שייך לאובייקט עצמו – לא לשם. תקינות הפעולות אינה נבדקת מראש בהידור, אלא בזמן ריצה (Runtime) בעת הביצוע. אם האובייקט תומך בפעולה והארגומנטים מתאימים, הפעולה מצליחה; אחרת נזרקת חריגה (Exception). זוהי הבחנה יסודית מול C++.</p>
      <p><strong>מפרש ומכונה וירטואלית (Interpreter &amp; VM):</strong> במימוש הסטנדרטי של השפה (CPython), קוד המקור (<code>.py</code>) אינו מהודר ישירות לקוד מכונה של המעבד (Machine Code / <code>.exe</code> כמו ב־C++). במקום זאת, הוא עובר תחילה הידור ל<strong>קוד־ביניים (Bytecode)</strong>, הנשמר לעיתים בדיסק בקובצי <code>.pyc</code>, ואז <strong>מכונה וירטואלית (Python Virtual Machine - PVM)</strong> מבצעת אותו פקודה אחר פקודה. היכולת לייצר ולהריץ קוד בזמן ריצה היא בסיס המטא־תכנות, אך כל נתון ממקור חיצוני החוצה <strong>גבול אמון (Trust Boundary)</strong> חייב לעבור אימות קפדני – לעולם אין להריץ קלט משתמש כקוד!</p>
      <p><strong>רקע והתפתחות:</strong> השפה פותחה על ידי חידו ואן רוסום (Guido van Rossum) בסוף שנות ה־80; גרסה 2.0 שוחררה בשנת 2000, וגרסה 3.0 (שאינה תואמת לאחור) בשנת 2008. מאז 2018 ניהול הפיתוח מופקד בידי ועדת היגוי קהילתית. חוזקותיה המרכזיות הן פשטות, תחביר קריא ויכולות הרחבה דינמיות נרחבות.</p>
      <ul>
        <li>הורדת המפרש הרשמי: <code>python.org</code>. סביבות פיתוח נפוצות: PyCharm, VS Code, או שורת הפקודה (<code>python.exe</code>).</li>
        <li>שני אופני עבודה עיקריים: כתיבת סקריפט שלם בקובץ <code>.py</code> והרצתו, או הזנת פקודות בדיאלוג שורה־אחר־שורה ב<strong>מפרש האינטראקטיבי (Interactive REPL)</strong>.</li>
      </ul>
      <p>במפרש האינטראקטיבי, כל פקודה מתבצעת מיד ומעדכנת את מרחב השמות (Namespace), כך שהתוצאה נשמרת בין פקודות עוקבות:</p>
      <pre class="code"><code>base_url = "https://api.internal/v1"
endpoint = "/health"
base_url + endpoint</code></pre>
      <p>הפלט המתקבל מיד הוא <code>'https://api.internal/v1/health'</code>. זוהי בדיוק אותה סביבת הרצה שמבצעת אחר כך סקריפטים שלמים מקבצים.</p>
      <div class="panel">
        <p><strong>מבנה היחידה ביחס למדריך הלמידה.</strong> פרקים 1–5 במדריך עוסקים בתחביר הבסיסי, ופרקים 6–11 במבני נתונים ומחלקות. כאן אנו מתמקדים בעקרונות הליבה של השפה, בסכנות אבטחה, ובמנגנוני הזרקה ומטא־תכנות הנבדקים בבחינה.</p>
      </div>
    `,
  },
  {
    id: "u4-indent",
    title: "תחביר: שורות, הזחה (Indentation), תנאים",
    html: `
      <p>התחביר בפייתון מבוסס על שורות ועל <strong>הזחה (Indentation)</strong>. בניגוד ל־C++ או Java, בלוק של פונקציה, תנאי או לולאה אינו נתחם בסוגריים מסולסלים <code>{}</code>. במקום זאת, כותבים נקודתיים (<code>:</code>) בסוף שורת ההצהרה, וכל השורות השייכות לבלוק מוזחות ימינה ברווחים. בשפות אחרות הזחה נועדה רק לקריאות הקוד; בפייתון היא מגדירה את המבנה הלוגי של התוכנית. השמטת הזחה אחרי נקודתיים גוררת מיד שגיאת תחביר (<code>IndentationError</code>).</p>
      <p>סיום הבלוק מתבצע פשוט על ידי חזרה לעמודת ההזחה של השורה שמעליו. מספר הרווחים חייב להיות זהה ועקבי בכל שורות הבלוק. מוסכמת התעשייה לפי תקן <strong>PEP 8</strong> היא שימוש ב־<strong>4 רווחים</strong> לכל רמת הזחה. מותר להשתמש גם בטאב (Tab), אך ערבוב של טאבים ורווחים באותו קובץ אסור בתכלית וגורר שגיאת <code>TabError</code>, או גורם לשורות קוד להשתייך לבלוק שונה ממה שהתכוון המתכנת מבלי שניתן להבחין בכך בעין.</p>
      <p>פונקציית <code>print()</code> מדפיסה פלט למסך. ניתן להריץ פקודות ישירות במפרש האינטראקטיבי (אחרי סימן ההזמנה <code>&gt;&gt;&gt;</code>) או לשמור קובץ בסיומת <code>.py</code> ולהריצו מהטרמינל (<code>python app.py</code>). הערה מתחילה בתו <code>#</code>, והמפרש מתעלם מכל מה שנכתב אחריה עד סוף השורה. משתנה נוצר ברגע שמוצב בו ערך – אין פקודת הצהרה נפרדת כמו <code>int x;</code> ב־C++. שמות משתנים רגישים לאותיות גדולות וקטנות (Case-Sensitive): <code>session_id</code> ו־<code>Session_ID</code> הם שני משתנים נפרדים לחלוטין.</p>
      <pre class="code"><code>status_code = 200
if status_code == 200:
    print("Request succeeded")
    print("Processing payload...")
print("Logging transaction attempt")</code></pre>
      <p>שתי ההדפסות המוזחות יתבצעו רק אם התנאי אמת. השורה האחרונה אינה מוזחת, ולכן תתבצע בכל מקרה. שימו לב: אם מזיזים את השורה האחרונה בטעות פנימה ב־4 רווחים, היא הופכת לחלק מה־<code>if</code> ותרוץ רק כשהתנאי מתקיים – זהו באג לוגי שאינו מייצר שום שגיאת תחביר!</p>
      <div class="panel">
        <p><strong>מדוע הזחה במקום סוגריים מסולסלים?</strong> יוצרי פייתון קבעו שהמבנה החזותי של הקוד חייב לשקף במדויק את המבנה הלוגי שלו. הדבר מונע כשלים שכיחים ב־C++, כמו נקודה־פסיק מיותרת אחרי <code>if</code> או הזחה מטעה המציגה פקודה כאילו היא מותנית אף שהיא רצה תמיד. המחיר: רווח שגוי משנה את התנהגות התוכנית. לכן מקפידים על 4 רווחים עקביים ונמנעים לחלוטין מערבוב טאבים.</p>
      </div>
      <p>בלוקים מקוננים (Nested Blocks): כל רמה פנימית מוסיפה 4 רווחים נוספים. יציאה מבלוק פנימי חזרה לחיצוני דורשת חזרה לעמודת ההזחה המתאימה לו:</p>
      <pre class="code"><code>user_authenticated = True
has_admin_privileges = False

if user_authenticated:
    print("User session is active")
    if has_admin_privileges:
        print("Granting administrative access")
print("Authentication check complete")</code></pre>
      <ul>
        <li>הקפדה על PEP 8: תמיד 4 רווחים להזחה, ללא Tab, למניעת שגיאות <code>TabError</code>.</li>
        <li>מבנה <span dir="ltr"><code>if</code> / <code>elif</code> / <code>else</code></span>: הענפים מוציאים זה את זה לפי סדר בדיקתם.</li>
        <li>שרשור פקודות באותה שורה באמצעות נקודה־פסיק <code>;</code> נתמך תחבירית אך אינו מקובל. באופן דומה, כתיבת <code>if cond: print(...)</code> בשורה אחת נחשבת לפרקטיקה לא קריאה.</li>
      </ul>
      <pre class="code"><code>latency_ms = 45

if latency_ms &lt; 50:
    print("Latency status: Optimal")
elif latency_ms &lt;= 150:
    print("Latency status: Acceptable")
else:
    print("Latency status: High latency warning")</code></pre>
    `,
  },
  {
    id: "u4-types",
    title: "טיפוסים דינמיים, type, ופונקציה ראשונה",
    html: `
      <p>בפייתון אין חובת הצהרת טיפוס לפני שימוש. שם משתנה נקשר לאובייקט בזיכרון, ובהצבה הבאה ניתן לקשור את אותו השם לאובייקט מטיפוס שונה לחלוטין. פעולה זו אינה "משנה את טיפוס המשתנה" – היא פשוט מפנה את השם לאובייקט חדש בזיכרון (Rebinding):</p>
      <pre class="code"><code>if __name__ == "__main__":
    resource_id = 1024
    print(resource_id)  # 1024 (שלם - int)
    resource_id = "srv-cluster-01"
    print(resource_id)  # srv-cluster-01 (מחרוזת - str)</code></pre>
      <p>אותו שם מצביע לשני טיפוסים בזה אחר זה. ב־C++ קוד כזה אינו מתהדר כלל ללא המרה או תבנית גנרית (template). בפייתון זהו קוד תקין לחלוטין, אך הוא עלול להוות מקור לבאגים אם מניחים בטעות הנחה שגויה לגבי הטיפוס שנמצא במשתנה ברגע נתון. השורה <code>if __name__ == "__main__":</code> מוודאת שבלוק הקוד יורץ רק כאשר הקובץ מופעל ישירות כתוכנית ראשית, ולא כאשר קובץ אחר מייבא אותו כמודול ספריה.</p>
      <div class="panel">
        <p><strong>אנלוגיית הפתקיות והקופסאות:</strong> דמיינו שמות משתנים כפתקיות שם מודבקות על קופסאות זיכרון. ההוראה <code>resource_id = 1024</code> מדביקה את הפתקית <code>resource_id</code> על קופסת מספר שלם. ההשמה הבאה <code>resource_id = "srv-cluster-01"</code> מקלפת את הפתקית ומדביקה אותה על קופסת מחרוזת; המספר הישן יפונה על ידי מנגנון איסוף הזבל (Garbage Collector) אם אין פתקיות נוספות המצביעות עליו. ב־C++, לעומת זאת, הפתקית חקוקה בקיר (הצהרת הטיפוס בהידור) ואינה ניתנת להזזה. לכן בפייתון <code>compute_ratio("a", "b")</code> נכשל רק בזמן ריצה כשהמפרש מנסה לבצע חילוק – אין שום שומר סף בהידור שימנע זאת מראש.</p>
      </div>
      <ul>
        <li>בדיקת טיפוס: <code>type(x)</code> מחזיר את המחלקה (Class) שממנה נוצר האובייקט (למשל <code>&lt;class 'int'&gt;</code>).</li>
        <li>משפחות הטיפוסים המובנות: מחרוזת <code>str</code> (טקסט בלתי משתנה בקידוד Unicode); מספרים <code>int</code> (שלם בדיוק בלתי מוגבל), <code>float</code> (ממשי עשרוני בנקודה צפה), <code>complex</code> (מספר מרוכב עם חלק ממשי ומדומה); סדרות <code>list</code> (רשימה דינמית ניתנת לשינוי), <code>tuple</code> (סדרה קבועה בלתי ניתנת לשינוי), <code>range</code> (טווח מספרים מחולל); מיפוי <code>dict</code> (מילון מפתח-ערך); קבוצה <code>set</code>; וערך אמת <code>bool</code>.</li>
      </ul>
      <p>הגדרת פונקציה מתבצעת עם המילה השמורה <code>def</code>, שם הפונקציה, רשימת פרמטרים בסוגריים, נקודתיים <code>:</code>, גוף מוזח ופקודת <code>return</code> להחזרת ערך:</p>
      <pre class="code"><code>def compute_ratio(a, b):
    return (a * 2) / b

print(compute_ratio(10, 4))</code></pre>
      <p>הקריאה מדפיסה <code>5.0</code> (אופרטור החילוק <code>/</code> בפייתון 3 מחזיר תמיד <code>float</code>, בעוד שחילוק שלם מסומן ב־<code>//</code>). שימו לב: קריאה ל־<code>compute_ratio("abc", 4)</code> אינה נחסמת מראש בהידור – רק בריצה תתקבל שגיאת <code>TypeError</code> כשננסה לחלק מחרוזת. זוהי בדיוק משמעותה של טיפוסיות דינמית: אימות התאמה בעת הביצוע בזמן ריצה.</p>
      <div class="panel">
        <p><strong>מלכודת מבחן קריטית 1: אין העמסת פונקציות (Function Overloading) בפייתון!</strong></p>
        <p>שאלה שחוזרת במבחנים שוב ושוב: האם פייתון תומכת בהעמסת פונקציות (הגדרת מספר פונקציות בעלות אותו שם עם טיפוסים או מספר פרמטרים שונה)?<br>
        <strong>תשובה חד־משמעית: לא!</strong><br>
        בפייתון אין מנגנון העמסה מבוסס חתימה. אם נגדיר שתי פונקציות בעלות אותו שם באותו סקופ, ההגדרה השנייה פשוט <strong>דורסת ומחליפה (Overrides)</strong> את הראשונה במילון המודול (<code>globals()</code>). גמישות בפרמטרים משיגים אך ורק באמצעות ארגומנטים עם ערכי ברירת מחדל, פרמטרים באורך משתנה (<code>*args, **kwargs</code>), או בדיקת טיפוסים ידנית בעזרת <code>isinstance()</code>.</p>
      </div>
      <p><strong>מלכודת מבחן קריטית 2: ארגומנט ברירת מחדל שניתן לשינוי (Mutable Default Argument).</strong> ארגומנט ברירת מחדל מוערך <em>פעם אחת בלבד</em> – בזמן הגדרת הפונקציה (Definition Time), ולא בכל קריאה מחדש! אם מגדירים רשימה כברירת מחדל, כל הקריאות חולקות בדיוק את אותו אובייקט רשימה בזיכרון, כך שאיבר שנוסף בקריאה אחת נשמר לקריאות הבאות:</p>
      <pre class="code"><code>def register_participant(user_id, attendee_list=[]):
    attendee_list.append(user_id)
    return attendee_list

print(register_participant("alice"))  # ['alice']
print(register_participant("bob"))    # ['alice', 'bob'] — שגיאה! אותה רשימה משותפת לכל הקריאות</code></pre>
      <p><strong>התיקון הדפנסיבי:</strong> מגדירים את ברירת המחדל ל־<code>None</code>, ויוצרים רשימה חדשה באופן מפורש בתוך גוף הפונקציה בכל קריאה:</p>
      <pre class="code"><code>def register_participant(user_id, attendee_list=None):
    if attendee_list is None:
        attendee_list = []
    attendee_list.append(user_id)
    return attendee_list

print(register_participant("alice"))  # ['alice']
print(register_participant("bob"))    # ['bob'] — רשימה עצמאית ונקייה לכל קריאה</code></pre>
    `,
  },
  {
    id: "u4-bool",
    title: "ערכי אמת (bool) והאופרטורים and, or, not",
    html: `
      <p>השוואה לוגית מחזירה ערך בוליאני מסוג <code>bool</code>: <code>True</code> או <code>False</code> (אות ראשונה רישית תמיד). תוצאת ההשוואה ניתנת לשמירה במשתנה רגיל:</p>
      <pre class="code"><code>is_valid_port = 8080 &gt; 1024
print(is_valid_port)        # True
print(type(is_valid_port))  # &lt;class 'bool'&gt;</code></pre>
      <p>שלושת האופרטורים הלוגיים הם <strong>מילים שמורות באנגלית</strong> (<code>and</code>, <code>or</code>, <code>not</code>) ולא סימנים כמו <code>&amp;&amp;</code>, <code>||</code>, <code>!</code> של C++.</p>
      <div class="panel">
        <p><strong>מלכודת מבחן קריטית: ערך ההחזרה של <code>and</code> ו־<code>or</code>!</strong></p>
        <p>בניגוד לרוב השפות, בפייתון <code>and</code> ו־<code>or</code> <strong>אינם מחזירים בהכרח ערך בוליאני (True/False)</strong>, אלא מחזירים את <strong>האופרנד עצמו</strong> שקבע סופית את ערך הביטוי:</p>
        <ul>
          <li><code>expr1 and expr2</code>: אם <code>expr1</code> כוזבי (Falsy), הוא מוחזר מיד; אחרת מוחזר <code>expr2</code>.</li>
          <li><code>expr1 or expr2</code>: אם <code>expr1</code> אמתי (Truthy), הוא מוחזר מיד; אחרת מוחזר <code>expr2</code>.</li>
          <li><code>not expr1</code>: מחזיר תמיד ערך בוליאני הפוך (<code>True</code> או <code>False</code>).</li>
        </ul>
        <p>ערכים כוזביים (Falsy) בפייתון הם: <code>False</code>, <code>None</code>, המספרים <code>0</code> ו־<code>0.0</code>, ומבנים ריקים כמו מחרוזת ריקה <code>""</code>, רשימה ריקה <code>[]</code>, או מילון ריק <code>{}</code>. כל שאר הערכים נחשבים אמתיים (Truthy).</p>
      </div>
      <p>התנהגות זו משמשת לעיתים קרובות לקביעת ערכי ברירת מחדל אלגנטיים: <code>active_profile = "" or "guest_user"</code> יציב את המחרוזת <code>"guest_user"</code>.</p>
      <p><strong>קיצור חישוב (Short-Circuit Evaluation):</strong> המפרש מעריך ביטויים משמאל לימין ועוצר ברגע שהתוצאה הסופית נקבעה. אם הצד השמאלי של <code>and</code> הוא כוזבי – הצד הימני <em>לא יחושב כלל</em>. אם הצד השמאלי של <code>or</code> הוא אמתי – הצד הימני <em>לא יחושב כלל</em>.</p>
      <pre class="code"><code># מניעת קריסה (חילוק באפס) בזכות קיצור חישוב:
divisor = 0
safe_calc = (divisor != 0) and (100 / divisor &gt; 5)
print(safe_calc)  # False — החילוק באפס לא התבצע כלל!</code></pre>
      <ul>
        <li><strong>סכנת באגים:</strong> אם הצד הימני מכיל קריאה לפונקציה בעלת תופעות לוואי (Side Effects), היא לא תרוץ אם הצד השמאלי הכריע את הביטוי.</li>
        <li><strong>היבט אבטחה (מיחידה 3):</strong> קיצור חישוב יוצר הבדלי זמני ריצה הניתנים למדידה. אם בדיקת הרשאות או בדיקת סיסמה מתבצעת תוך קיצור חישוב, תוקף יכול לנצל זאת ל<strong>ערוץ צדדי מבוסס זמן (Timing Attack)</strong> כדי לנחש נתונים סודיים תו אחר תו.</li>
      </ul>
    `,
  },
  {
    id: "u4-str",
    title: "מחרוזות: לא משתנות, שיטות, קלט וביטויים",
    html: `
      <p>בפייתון, תו בודד ומחרוזת שלמה שניהם מטיפוס <code>str</code> (אין טיפוס <code>char</code> נפרד כמו ב־C++). ניתן לתחום מחרוזת בגרש בודד <code>'abc'</code> או במירכאות כפולות <code>"abc"</code>. אם רוצים לכלול את אותו תו תוחם בתוך המחרוזת, משתמשים בלוכסן הפוך כמילוט: <code>\'</code> או <code>\"</code>.</p>
      <ul>
        <li>בדיקת הכלה: האופרטור <code>in</code> בודק האם תת־מחרוזת מוכלת במחרוזת. אורך מחרוזת מוחזר על ידי <code>len(s)</code>.</li>
        <li>מחרוזת היא סדרה (Sequence) של תווים: ניתן לעבור עליה בלולאת <code>for char in s:</code>, בדיוק כמו על רשימה.</li>
      </ul>
      <p><strong>אי־השתנות (Immutability):</strong> מחרוזות בפייתון אינן ניתנות לשינוי לאחר יצירתן. כל מתודת עריכה מחזירה מחרוזת <em>חדשה לחלוטין</em>; המחרוזת המקורית נשארת ללא כל שינוי בזיכרון. ללא השמה חוזרת למשתנה, השינוי לא יישמר. תכונה זו הפוכה מרשימות (<code>list</code>), שרובן מבוצעות במקום (In-Place Mutation).</p>
      <pre class="code"><code>system_state = "cluster_healthy"
print(system_state.upper())  # CLUSTER_HEALTHY (מחרוזת חדשה)
print(system_state)          # cluster_healthy (המקור נותר ללא שינוי!)</code></pre>
      <p>מתודות מחרוזת שימושיות במיוחד:</p>
      <ul>
        <li><code>capitalize()</code>: הופכת את התו הראשון לאות גדולה.</li>
        <li><code>lower()</code> מול <code>casefold()</code>: שניהן הופכות לאותיות קטנות, אך <code>casefold()</code> מבצעת המרה אגרסיבית יותר להשוואות בלתי תלויות ברישיות (Case-Insensitive) התומכות בכל תקני Unicode.</li>
        <li><code>count(sub)</code>: סופרת כמה פעמים תת־מחרוזת מופיעה.</li>
        <li><code>find(sub)</code> / <code>index(sub)</code>: מאתרות מיקום תת־מחרוזת. <code>find</code> מחזירה <code>-1</code> אם חסר; <code>index</code> זורקת שגיאת <code>ValueError</code>.</li>
        <li><code>isalnum()</code> / <code>isdigit()</code>: בודקות האם כל התווים הם אותיות וספרות / ספרות בלבד.</li>
        <li><code>split(sep)</code>: מפרקת מחרוזת לרשימת מחרוזות לפי תו מפריד (ברירת מחדל: רווחים).</li>
        <li><code>join(iterable)</code>: מחברת רשימת מחרוזות למחרוזת אחת; ה"דבק" הוא המחרוזת שעליה קוראים למתודה.</li>
        <li><code>startswith(prefix)</code> / <code>endswith(suffix)</code>: בדיקת קידומת וסיומת.</li>
      </ul>
      <p><strong>קלט משתמש עם <code>input()</code> והמרות טיפוסים:</strong><br>
      הפונקציה <code>input()</code> מחזירה <strong>תמיד מחרוזת</strong> (<code>str</code>), גם אם המשתמש הקיש ספרות בלבד. לפני ביצוע חישוב או פעולה מספרית חובה להמיר מפורשות: <code>int()</code> למספר שלם או <code>float()</code> למספר עשרוני. אם הקלט אינו מייצג מספר חוקי, ההמרה זורקת חריגת <code>ValueError</code>. מתכנת דפנסיבי עוטף תמיד את ההמרה בבלוק <code>try/except</code>, ומאמת את טווח הערכים באמצעות <code>raise</code>:</p>
      <pre class="code"><code>raw_input_port = input("Enter listening port: ")
try:
    port = int(raw_input_port)
    if not 1 &lt;= port &lt;= 65535:
        raise ValueError("Port must be between 1 and 65535")
    print(f"Service configured on port {port}")
except ValueError as err:
    print(f"Configuration rejected: {err}")</code></pre>
      <p>שימו לב: <code>str.isdigit()</code> לבדה אינה בדיקה מספקת לפני המרה, שכן היא מחזירה <code>False</code> על מספרים שליליים (בגלל סימן המינוס) ועל רווחים, ואינה בודקת תקינות טווח.</p>
      <p><strong>ביטויים רגולריים (Regular Expressions) עם מודול <code>re</code>:</strong><br>
      ביטוי רגולרי הוא תבנית תיאורית המגדירה מבנה חוקי של מחרוזת. במקום לכתוב לולאות ובדיקות מורכבות על כל תו, משתמשים בתחביר תבניות סטנדרטי. מומלץ להגדיר תבניות כמחרוזות גולמיות (Raw Strings) עם הקידומת <code>r"..."</code>, כדי שלוכסנים הפוכים (כמו <code>\\d</code>) לא יפוענחו בטעות כתווי מילוט של פייתון:</p>
      <pre class="code"><code>import re

auth_token = "AUTH_BEARER_98412_SESSION"
# בדיקה האם הטוקן מתחיל בקידומת המורשית, מכיל ספרות ומסתיים בסשן
match = re.search(r"^AUTH_BEARER_\d+_SESSION$", auth_token)
if match:
    print("Valid authentication token format")
else:
    print("Invalid token format rejected")</code></pre>
      <ul>
        <li><code>^</code> מייצג את תחילת המחרוזת, <code>$</code> מייצג את סוף המחרוזת.</li>
        <li><code>\\d+</code> מייצג רצף של ספרה אחת או יותר. <code>.*</code> מייצג רצף כלשהו של תווים.</li>
        <li><strong>דגש אבטחה:</strong> ביטויים רגולריים מורכבים שמקבלים קלט בלתי מבוקר ממשתמש עלולים לגרום לסיבוכיות חישוב מעריכית ולחסימת המערכת – מתקפת <strong>ReDoS (Regular Expression Denial of Service)</strong>. לכן משתמשים בתבניות מוגדרות מראש בלבד.</li>
      </ul>
    `,
  }
);
