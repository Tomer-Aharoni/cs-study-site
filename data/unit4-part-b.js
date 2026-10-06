UNIT4.sections.push(
  {
    id: "u4-list",
    title: "רשימה (list): גודל, חיתוך ושיטות",
    html: `
      <p><strong>רשימה (list)</strong> היא סדרה דינמית, ממוינת לפי אינדקסים וניתנת לשינוי (Mutable). היא מוגדרת בסוגריים מרובעים <code>[...]</code>. סדר האיברים נשמר כפי שהוגדר. ניתן להוסיף, להסיר ולשנות איברים בכל עת, ואיברים בעלי ערך זהה יכולים להופיע מספר פעמים. האינדקס של האיבר הראשון הוא <code>0</code>, השני <code>1</code> וכן הלאה. הפונקציה <code>len(l)</code> מחזירה את מספר האיברים ברשימה. פייתון מאפשרת רשימות הטרוגניות: מותר לערבב טיפוסים שונים (למשל מספר ומחרוזת) באותה רשימה, ואין צורך להצהיר מראש על אורכה.</p>
      <pre class="code"><code>active_nodes = ["node-1", "node-2", "node-3"]
standby_nodes = ["node-x", "node-y"]
all_nodes = active_nodes + standby_nodes
print(all_nodes)      # ['node-1', 'node-2', 'node-3', 'node-x', 'node-y']

# עדכון איבר קיים במקום (In-Place Mutation):
all_nodes[3] = "node-4"
print(all_nodes)      # ['node-1', 'node-2', 'node-3', 'node-4', 'node-y']</code></pre>
      <p>חיבור רשימות באמצעות האופרטור <code>+</code> מייצר <strong>רשימה חדשה</strong> בזיכרון. לעומת זאת, השמה לאינדקס (כמו <code>all_nodes[3] = "node-4"</code>) משנה את הרשימה הקיימת <strong>במקום (In-Place)</strong>. לאחר שחיברנו את שתי הרשימות, באינדקס 3 שכן האיבר <code>"node-x"</code> (בספירה מאפס: 0 הוא <code>"node-1"</code>, 1 הוא <code>"node-2"</code>, 2 הוא <code>"node-3"</code>, 3 הוא <code>"node-x"</code>, 4 הוא <code>"node-y"</code>), והוא הוחלף ב־<code>"node-4"</code>.</p>
      <p><strong>חיתוך רשימות (Slicing):</strong> התחביר <code>[start:end]</code> מחזיר תת־רשימה מהאינדקס <code>start</code> ועד <code>end - 1</code> (האיבר ב־<code>end</code> אינו נכלל). אינדקס שלילי סופר איברים מסוף הרשימה: <code>-1</code> הוא האיבר האחרון, <code>-2</code> הוא הלפני־אחרון. השמטת <code>end</code> חותכת עד סוף הרשימה:</p>
      <pre class="code"><code>buffer_sizes = [64, 128, 256, 512, 1024, 2048]
print(len(buffer_sizes))       # 6
print(buffer_sizes[0:2])       # [64, 128]
print(buffer_sizes[-2:-1])     # [1024]
print(buffer_sizes[-2:])       # [1024, 2048]</code></pre>
      <p>מתודות נפוצות של רשימה:</p>
      <ul>
        <li><code>append(x)</code>: מוסיפה איבר בסוף הרשימה.</li>
        <li><code>extend(iterable)</code>: מצרפת את כל איברי הסדרה הנתונה לסוף הרשימה.</li>
        <li><code>insert(index, x)</code>: מכניסה איבר במיקום מוגדר ומזיזה את השאר ימינה.</li>
        <li><code>clear()</code>: מרוקנת את כל האיברים מהרשימה.</li>
        <li><code>copy()</code>: יוצרת <strong>עותק רדוד (Shallow Copy)</strong> של הרשימה (הרשימה עצמה חדשה, אך איברים פנימיים מורכבים עדיין מצביעים לאותם אובייקטים).</li>
        <li><code>count(x)</code>: סופרת כמה פעמים ערך מופיע ברשימה.</li>
        <li><code>sort()</code> / <code>reverse()</code>: ממיינות והופכות את הרשימה <em>במקום</em> (משנות את האובייקט ומחזירות <code>None</code>).</li>
      </ul>
      <p><strong>מלכודת מבחן:</strong> רוב מתודות הרשימה (כגון <code>sort</code>, <code>append</code>, <code>reverse</code>) פועלות <strong>In-Place</strong> – הן משנות את הרשימה הקיימת ומחזירות <code>None</code>! ניסיון לכתוב <code>l = l.sort()</code> ידרוס את המשתנה ב־<code>None</code> וימחק את הרשימה. זאת בניגוד למחרוזות שבהן כל מתודה מחזירה תמיד אובייקט חדש.</p>
    `,
  },
  {
    id: "u4-join",
    title: "split ו־join",
    html: `
      <p>רשימה ומחרוזת נפגשות בשתי פעולות משלימות: פירוק מחרוזת לרשימת חלקים, וחיבור איברי רשימה חזרה למחרוזת אחת.</p>
      <p>המתודה <code>split(sep)</code> היא מתודת מחרוזת: היא מפרקת אותה לרשימת תת־מחרוזות לפי תו מפריד. לעומתה, <code>join(iterable)</code> פועלת הפוך: קוראים לה <strong>על מחרוזת הדבק (Delimiter)</strong>, והרשימה מועברת כארגומנט:</p>
      <pre class="code"><code>raw_audit = "user:admin:read_write:authenticated"
fields = raw_audit.split(":")
print(fields)                 # ['user', 'admin', 'read_write', 'authenticated']

formatted_entry = " -> ".join(fields)
print(formatted_entry)        # 'user -> admin -> read_write -> authenticated'</code></pre>
      <p><strong>מלכודת מבחן:</strong> ניסיון לקרוא <code>fields.join(" -&gt; ")</code> יזרוק <code>AttributeError: 'list' object has no attribute 'join'</code>! זכרו תמיד: <code>join</code> שייכת למחרוזת הדבק, ולא לרשימה.</p>
    `,
  },
  {
    id: "u4-aliasing",
    title: "כינוי כפול (aliasing) מול copy, is מול ==",
    html: `
      <p>מכיוון שרשימה היא אובייקט <strong>בר־שינוי (Mutable)</strong>, השמה פשוטה <code>shared_keys = primary_keys</code> אינה יוצרת עותק, אלא מייצרת <strong>כינוי כפול (Aliasing)</strong>: שני משתנים המצביעים על אותו אובייקט רשימה בדיוק בזיכרון. שינוי של איבר דרך שם אחד ישתקף מיד גם דרך השם השני:</p>
      <pre class="code"><code>primary_keys = ["k1", "k2", "k3"]
backup_keys = ["k1", "k2", "k3"]

print(primary_keys is backup_keys)  # False — שני אובייקטים נפרדים בזיכרון
print(primary_keys == backup_keys)  # True  — תוכן זהה לחלוטין
print(id(primary_keys), id(backup_keys))

# השמה פשוטה יוצרת כינוי כפול (Aliasing):
shared_keys = primary_keys
print(shared_keys is primary_keys)  # True  — שני שמות לאותו אובייקט בדיוק!
shared_keys[0] = "k_revoked"
print(primary_keys[0])              # 'k_revoked' — המקור השתנה!</code></pre>
      <ul>
        <li><code>==</code> משווה תוכן (Equality): בודק האם הערכים בתוך המבנים שווים.</li>
        <li><code>is</code> משווה זהות אובייקט (Identity): בודק האם שני המשתנים מצביעים על אותה כתובת זיכרון ממש (שקול לבדיקה <code>id(a) == id(b)</code>).</li>
        <li><code>id(x)</code>: מחזיר את המזהה הייחודי של האובייקט (הכתובת הלוגית בזיכרון ה־CPython).</li>
      </ul>
      <p>כדי למנוע תופעה זו וליצור רשימה נפרדת, יש ליצור עותק מפורש באמצעות <code>primary_keys.copy()</code> או בעזרת חיתוך מלא <code>primary_keys[:]</code>. זהו <strong>עותק רדוד (Shallow Copy)</strong>: הרשימה עצמה משוכפלת, כך שהוספה או החלפה של איבר בה לא תשפיע על המקור (אך אם האיברים שבתוכה הם אובייקטים מורכבים ברי־שינוי, הם עדיין יהיו משותפים. לשכפול מלא ועמוק משתמשים ב־<code>copy.deepcopy()</code>).</p>
      <p>תופעת הכינוי הכפול (Aliasing) מודגמת גם במעבדה האינטראקטיבית (תרחיש <code>servers</code> ו־<code>backup_servers</code>) שבתחתית העמוד.</p>
      <div class="panel">
        <p><strong>למה זה מבלבל מתכנתים המגיעים מ־C++?</strong> ב־C++, השמה בין משתנים רגילים מעתיקה את הערך למיקום זיכרון חדש. בפייתון, כל המשתנים הם הפניות (References). השמת <code>b = a</code> רק מדביקה פתקית שם נוספת לאותה קופסת זיכרון. <strong>דגש דפנסיבי קריטי:</strong> כאשר פונקציה מקבלת רשימה כפרמטר ומבצעת בה שינויים (כגון <code>append</code>), היא משנה ישירות את הרשימה של הקורא! כדי להגן על נתוני הקורא, על הפונקציה ליצור עותק מפורש בתחילת הריצה.</p>
      </div>
    `,
  },
  {
    id: "u4-loop-seq",
    title: "לולאת for, טווח (range) ו־tuple",
    html: `
      <p>לולאת <code>for x in seq:</code> עוברת לפי הסדר על כל איבר בסדרה (כגון רשימה, טופל או מחרוזת), ומציבה אותו במשתנה <code>x</code> בכל איטרציה. הפרמטר <code>end</code> בפונקציית <code>print()</code> מאפשר לקבוע איזה תו יודפס בסוף (ברירת המחדל היא ירידת שורה <code>\\n</code>):</p>
      <pre class="code"><code>services = ["auth", "billing", "gateway"]
for s in services:
    print(s.upper(), end=" | ")
# פלט: AUTH | BILLING | GATEWAY | </code></pre>
      <p><strong>טווח (range):</strong> הפונקציה <code>range(n)</code> מייצרת סדרת מספרים שלמים מ־<code>0</code> ועד <code>n - 1</code>. ישנם בדיוק n ערכים, והמספר n עצמו אינו נכלל! התחביר המלא <code>range(start, stop, step)</code> מאפשר לקבוע נקודת התחלה, נקודת סיום וצעד התקדמות. ריצה על אינדקסים נכתבת לרוב: <code>for i in range(len(items)):</code>.</p>
      <p><strong>השמה מרובה (Tuple Unpacking) וסימולטניות:</strong> פייתון מאפשרת השמה של מספר משתנים בשורה אחת. כל הביטויים בצד ימין מחושבים קודם ונארזים בזיכרון, ורק אז נפרקים למשתנים בצד שמאל. הדבר מאפשר עדכון מצב סימולטני או החלפת משתנים (Swap) ללא משתנה עזר זמני:</p>
      <pre class="code"><code># השמה מרובה ועדכון מצב סימולטני בתוך לולאה:
prev_state, curr_state = 1, 2
for step in range(6):
    print(prev_state, end=" ")
    prev_state, curr_state = curr_state, prev_state + curr_state
# פלט: 1 2 3 5 8 13</code></pre>
      <p>הסבר: <code>range(6)</code> מבצע 6 איטרציות בדיוק (עבור ערכי step מ־0 עד 5). בכל סיבוב, הערכים <code>curr_state</code> ו־<code>prev_state + curr_state</code> מוערכים יחד לפני ביצוע ההשמה, כך ש־<code>prev_state</code> מקבל את ערכו הישן של <code>curr_state</code>.</p>
      <p><strong>סדרה קבועה (tuple):</strong> טופל הוא סדרה התחומה בסוגריים עגולים <code>(...)</code>. בניגוד לרשימה, טופל הוא <strong>בלתי ניתן לשינוי (Immutable)</strong>: לאחר יצירתו לא ניתן להוסיף, להסיר או להחליף איברים. הגישה לאיברים נעשית באמצעות אינדקס בסוגריים מרובעים בדיוק כמו ברשימה:</p>
      <pre class="code"><code>server_endpoint = ("192.168.1.10", 8080, "HTTPS")
print(server_endpoint[1])  # 8080

# ניסיון שינוי יגרור שגיאת זמן ריצה:
# server_endpoint[1] = 9000  # TypeError: 'tuple' object does not support item assignment</code></pre>
      <div class="panel">
        <p><strong>מלכודות מבחן קריטיות ב־Tuple:</strong></p>
        <ul>
          <li><strong>טופל כמפתח במילון:</strong> מכיוון שטופל הוא בלתי משתנה (Immutable) וניתן לגיבוב (Hashable, בתנאי שכל איבריו הם Immutable), הוא יכול לשמש כמפתח בתוך מילון (<code>dict</code>). רשימה (<code>list</code>), לעומת זאת, היא Mutable ולכן <em>לעולם אינה יכולה לשמש כמפתח במילון</em> (ניסיון כזה זורק <code>TypeError: unhashable type: 'list'</code>)!</li>
          <li><strong>טופל עם איבר בודד:</strong> כתיבת <code>t = (42)</code> מייצרת מספר שלם <code>int</code> מוקף בסוגריים רגילים, ולא טופל! כדי להגדיר טופל עם איבר יחיד, <strong>חובה להוסיף פסיק</strong>: <code>t = (42,)</code>. הבחנה זו קריטית במיוחד ביצירת מחלקות דינמיות עם <code>type()</code> במטא־תכנות.</li>
        </ul>
      </div>
    `,
  },
  {
    id: "u4-set-dict",
    title: "קבוצה (set) ומילון (dict)",
    html: `
      <p><strong>קבוצה (set):</strong> אוסף בלתי ממוין של איברים ייחודיים בסוגריים מסולסלים <code>{...}</code>. כפילויות נבלעות אוטומטית. מכיוון שהקבוצה ממומשת כטבלת גיבוב (Hash Table), בדיקת שייכות (<code>item in my_set</code>) מתבצעת בזמן ממוצע מהיר של <code>O(1)</code>, בניגוד לרשימה הדורשת סריקה ליניארית של <code>O(n)</code>. קבוצה תומכת בפעולות איחוד (<code>|</code>), חיתוך (<code>&amp;</code>) והפרש (<code>-</code>). אין סדר מובטח לאיברים בקבוצה, ולכן אסור להסתמך על סדר האיטרציה שלה.</p>
      <pre class="code"><code>allowed_roles = {"admin", "operator", "auditor"}
allowed_roles.add("operator")    # הכפילות נבלעת, גודל הקבוצה נותר 3
print("admin" in allowed_roles)  # True — בדיקת שייכות בסיבוכיות O(1)</code></pre>
      <p><strong>מילון (dict):</strong> מבנה נתונים יסודי בפייתון הממפה מפתחות לערכים (Key-Value Mapping). המפתחות חייבים להיות מטיפוס בלתי משתנה ובר־גיבוב (Hashable), כגון מחרוזות, מספרים או טופלים. המילון שומר על סדר ההכנסה (החל מפייתון 3.7):</p>
      <pre class="code"><code>server_config = {
    "host": "10.0.0.1",
    "port": 8080,
    "environment": "staging",
}
print(server_config["port"])        # 8080
server_config["port"] = 443         # עדכון ערך של מפתח קיים
server_config["ssl_enabled"] = True # הוספת זוג מפתח-ערך חדש

# גישה בטוחה עם get לעומת גישה ישירה בסוגריים מרובעים:
# server_config["timeout"]          # שגיאה: זורק KeyError אם המפתח חסר!
timeout = server_config.get("timeout", 30)  # מחזיר ברירת מחדל 30 ללא שגיאה</code></pre>
      <p>מתודות נפוצות של מילון:</p>
      <ul>
        <li><code>get(key, default=None)</code>: מחזיר את הערך, או ברירת מחדל אם המפתח אינו קיים, מבלי לזרוק <code>KeyError</code>.</li>
        <li><code>keys()</code> / <code>values()</code> / <code>items()</code>: מחזירות מבטים (Views) על המפתחות, הערכים, או זוגות טופלים של <code>(key, value)</code>.</li>
        <li><code>pop(key)</code>: מוחקת את המפתח ומחזירה את הערך שהיה צמוד אליו.</li>
        <li><code>clear()</code>: מרוקנת את המילון; <code>copy()</code>: יוצרת עותק רדוד.</li>
        <li><code>fromkeys(seq, val)</code>: בונה מילון מסדרת מפתחות עם ערך התחלתי זהה.</li>
      </ul>
      <div class="panel">
        <p><strong>החיבור הקריטי של מילון למטא־תכנות ולמחלקות בפייתון:</strong></p>
        <p>בפייתון, מחלקות ומופעים שומרים את כל התכונות והמתודות שלהם בתוך מילון פנימי סטנדרטי בשם <code>__dict__</code>! כל גישה ל־<code>obj.x</code> מתורגמת בפועל לחיפוש במילון <code>obj.__dict__['x']</code>. זוהי בדיוק הסיבה ש<strong>אין העמסת פונקציות (Function Overloading)</strong> בפייתון: הגדרת מתודה שנייה באותו שם במחלקה פשוט מציבה ערך חדש באותו מפתח במילון <code>__dict__</code>, ודורסת לחלוטין את ההגדרה הקודמת!</p>
        <p>חריג: שימוש ב־<code>__slots__</code> במחלקה מבטל את יצירת המילון הדינמי <code>__dict__</code> לכל מופע ומגדיר רשימת שדות קבועה מראש כדי לחסוך מקום בזיכרון.</p>
      </div>
      <p>דוגמה מעשית מהמצגת: קריאת קובץ הגדרות שבו כל שורה בנויה כ־<code>key=val</code> – מפצלים כל שורה עם <code>line.split("=", 1)</code> ומכניסים למילון את המפתח משמאל ואת הערך מימין.</p>
    `,
  },
  {
    id: "u4-files",
    title: "קבצים: פתיחה, מצבים וסגירה",
    html: `
      <p>הפונקציה <code>open(path, mode, encoding)</code> פותחת קובץ ומחזירה אובייקט קובץ (File Descriptor מנוהל). שימוש ב־<code>read()</code> ללא פרמטר קורא את <em>כל</em> תוכן הקובץ לזיכרון בבת אחת – עבור קובצי ענק מדובר בסכנת מיצוי זיכרון (Out of Memory - OOM). כדי לעבד קבצים ביעילות ובאופן חסכוני בזיכרון, עוברים על השורות באמצעות לולאת <code>for line in f:</code>, הפועלת כאיטרטור וטוענת שורה אחת בלבד בכל רגע נתון.</p>
      <p><strong>ניהול משאבים דפנסיבי עם <code>with</code> (Context Manager):</strong> שימוש בבלוק <code>with</code> מבטיח שהקובץ ייסגר באופן אוטומטי ואמין (שחרור משאב המערכת) ברגע היציאה מהבלוק, גם אם נזרקה חריגה או התרחשה שגיאה במהלך הקריאה:</p>
      <pre class="code"><code>with open("system_audit.log", "r", encoding="utf-8") as log_file:
    for log_entry in log_file:
        print(log_entry, end="")</code></pre>
      <ul>
        <li>מצבי פתיחה: <code>"r"</code> לקריאת טקסט (ברירת מחדל); <code>"w"</code> לכתיבה (<strong>דורס</strong> תוכן קיים ויוצר קובץ חדש); <code>"a"</code> להוספה בסוף הקובץ (Append); <code>"rb"</code> ו־<code>"wb"</code> לקריאה ולכתיבה בינארית (Raw Bytes).</li>
        <li><strong>חובת קידוד:</strong> מומלץ לציין תמיד <code>encoding="utf-8"</code> כדי למנוע שיבושי פענוח תווים ועקביות מלאה בין מערכות הפעלה שונות (Windows מול Linux).</li>
      </ul>
      <div class="panel">
        <p><strong>מוקש אבטחה: בדיקת קיום קובץ (TOCTOU) מול פילוסופיית EAFP של פייתון!</strong></p>
        <p>בדיקה האם קובץ קיים באמצעות <code>os.path.isfile(path)</code> לפני פתיחתו נראית לכאורה בטוחה, אך היא מייצרת בדיוק את כשל ה־<strong>TOCTOU (Time of Check to Time of Use)</strong> שנלמד ביחידה 3: בין רגע הבדיקה לרגע הפתיחה בפועל, תוקף מקומי או תהליך מקביל יכול למחוק את הקובץ או להחליפו בקישור סמלי (Symlink) לקובץ מערכת רגיש!</p>
        <p>לכן בפייתון דוגלים בעיקרון <strong>EAFP (Easier to Ask for Forgiveness than Permission)</strong>: לא בודקים מראש עם <code>if</code>, אלא פותחים ישירות את הקובץ בתוך בלוק <code>try/except OSError</code> ותופסים את החריגה אם הפתיחה נכשלה.</p>
      </div>
    `,
  },
  {
    id: "u4-ex",
    title: "טיפול בחריגות (try, except, else, raise)",
    html: `
      <p>אירוע שגיאה בלתי צפוי בזמן ריצה – כגון קובץ שאינו נמצא, המרת טיפוס שנכשלה או חלוקה באפס – קוטע את זרימת התוכנית הרגילה ומייצר חריגה (Exception). אם החריגה אינה מטופלת, התוכנית קורסת ומדפיסה <strong>מעקב קריאות (Traceback)</strong> המפרט את שרשרת הקריאות שהובילה לקריסה. כדי לטפל בשגיאות באופן מבוקר ולהבטיח שרידות ויציבות, עוטפים את הקוד המועד לפורענות בבלוק <code>try</code> ותופסים את השגיאה בבלוק <code>except</code>.</p>
      <div class="panel">
        <p><strong>מלכודת מבחן קריטית: לעולם אין להשתמש ב־<code>except:</code> חשוף (Bare Except)!</strong></p>
        <p>כתיבת <code>except:</code> ללא ציון שם מחלקת החריגה תופסת <em>כל חריגה שהיא</em>, כולל חריגות מערכת קריטיות: <code>KeyboardInterrupt</code> (בקשת המשתמש לעצור את התוכנית עם Ctrl+C) ו־<code>SystemExit</code> (יציאה מסודרת מהתהליך). הדבר גורם לתוכנית "להינעל" ולסרב לעצור גם כשהמשתמש או מערכת ההפעלה דורשים זאת!</p>
        <p>אם נדרש לתפוס את כל שגיאות התוכנה הסטנדרטיות (מבלי לפגוע בחריגות המערכת), תופסים במפורש <code>except Exception:</code>, שהיא מחלקת הבסיס של שגיאות התוכנה הרגילות. עם זאת, השיטה הדפנסיבית המומלצת היא לתפוס תמיד <strong>טיפוסי שגיאה ספציפיים</strong> (כגון <code>OSError</code>, <code>ValueError</code>, <code>KeyError</code>).</p>
      </div>
      <p><strong>מבנה הבלוק המלא: <code>try</code>, <code>except</code>, <code>else</code>, <code>finally</code>:</strong></p>
      <ul>
        <li><code>try</code>: בלוק הקוד שבו עלולה להתרחש שגיאה.</li>
        <li><code>except ErrorType as err</code>: מטפל בשגיאה מהסוג שצוין.</li>
        <li><code>else</code>: מתבצע אך ורק אם בלוק ה־<code>try</code> <strong>הסתיים בהצלחה מלאה ללא אף חריגה</strong>.</li>
        <li><code>finally</code>: מתבצע <strong>תמיד</strong> – בין אם נזרקה חריגה, בין אם היא נתפסה, ואפילו אם התבצעה פקודת <code>return</code> בתוך הבלוק. משמש לניקוי משאבים ולשחרור נעילות.</li>
        <li><code>raise</code>: זורק חריגה במפורש או זורק מחדש (Reraise) את החריגה הנוכחית.</li>
      </ul>
      <pre class="code"><code>import sys

try:
    with open("service_config.json", "r", encoding="utf-8") as conf:
        first_line = conf.readline()
        timeout_val = int(first_line.strip())
except OSError as err:
    print(f"File system error occurred: {err}")
except ValueError:
    print("Configuration parameter is not a valid integer")
except Exception:
    print(f"Unexpected fatal error: {sys.exc_info()[0]}")
    raise
else:
    print(f"Configuration loaded successfully with timeout={timeout_val}")
finally:
    print("Configuration read attempt concluded")</code></pre>
      <p>שילוב <code>with</code> סוגר את הקובץ אוטומטית גם אם ההמרה ב־<code>int()</code> נכשלת. הפונקציה <code>sys.exc_info()[0]</code> מחזירה את טיפוס החריגה שנזרקה.</p>
      <p><strong>מילים שמורות בפייתון (Reserved Keywords):</strong> מילים אלו שייכות לתחביר השפה ואינן יכולות לשמש כשמות משתנים או פונקציות: <code>False, None, True, and, as, assert, async, await, break, class, continue, def, del, elif, else, except, finally, for, from, global, if, import, in, is, lambda, nonlocal, not, or, pass, raise, return, try, while, with, yield</code>.</p>
      <p><strong>שימור אובייקטים: סִדּוּר (Serialization) ושחזור מסִדּוּר (Deserialization).</strong> בזיכרון התוכנית, אובייקטים חיים כמבנים דינמיים מקושרים. כדי לשמור אובייקט לקובץ בדיסק או לשדרו ברשת, נדרשים שני תהליכים משלימים:</p>
      <ul>
        <li><strong>סִדּוּר (Serialization):</strong> המרת אובייקט חי מזיכרון ה־RAM לרצף בתים בינארי שניתן לאחסן בקובץ או לשדר ברשת.</li>
        <li><strong>שחזור מסִדּוּר (Deserialization):</strong> קריאת רצף הבתים ובנייה מחדש של האובייקט המקורי בזיכרון המחשב.</li>
      </ul>
      <p>בפייתון, המודול המובנה לתהליך זה נקרא <code>pickle</code> (שימוש ב־<code>pickle.dump</code> / <code>dumps</code> לסִדּוּר, וב־<code>pickle.load</code> / <code>loads</code> לשחזור). המודול <code>shelve</code> הוא מסד נתוני מפתח־ערך הנשמר בדיסק ומבוסס ישירות על מנגנון <code>pickle</code>.</p>
      <div class="panel">
        <p><strong>מלכודת אבטחה קריטית במבחן: הרצת קוד מרחוק (Remote Code Execution, RCE) דרך Pickle!</strong></p>
        <p><strong>מדוע Pickle מסוכן?</strong> בניגוד לפורמטים טקסטואליים פסיביים (כמו JSON, המתעדים רק נתונים יבשים כגון מספרים ומחרוזות), פורמט Pickle הוא למעשה <em>תוכנית פעולה שלמה</em> עבור מכונה וירטואלית קטנה (Pickle VM) המרכיבה את האובייקט מחדש שלב אחר שלב.</p>
        <p><strong>איך עובד הניצול (Exploit) דרך <code>__reduce__</code>?</strong></p>
        <ul>
          <li>כאשר פייתון משחזרת אובייקט, היא בודקת האם מוגדרת בו המתודה המיוחדת <code>__reduce__()</code>. תפקידה של מתודה זו הוא להורות למפרש כיצד לבנות את האובייקט מחדש.</li>
          <li>מתודה זו מחזירה טופל (Tuple) המכיל פונקציה להפעלה (Callable) ואת הארגומנטים שלה.</li>
          <li>תוקף שמייצר קלט Pickle זדוני יכול להגדיר ב־<code>__reduce__</code> פונקציית מערכת כגון <code>os.system</code> עם הפקודה <code>('whoami',)</code> או כל פקודה זדונית אחרת.</li>
          <li>בעת קריאה ל־<code>pickle.load(inp)</code>, המפרש מפעיל את הפקודה של התוקף <strong>מיד ובאופן אוטומטי בהרשאות התהליך</strong>.</li>
        </ul>
        <p><strong>מדוע <code>try/except</code> אינו מגן מפני הנזק?</strong> המפרש מבצע את פקודת התוקף כבר בעת הרכבת האובייקט בתוך <code>pickle.load</code>, <em>לפני</em> שמוחזר ערך כלשהו ולפני שנזרקת שגיאה. לכן הנזק כבר נגרם במלואו, ועטיפת הפקודה ב־<code>try/except</code> תופסת לכל היותר שגיאת סיום אך אינה מונעת את ביצוע הפקודה הזדונית.</p>
      </div>
      <p><strong>הכלל הדפנסיבי (Mitigation):</strong> לעולם אין לקרוא קובץ או מחרוזת Pickle מקלט משתמש, מרשת או מכל מקור שלא הובטחה שלמותו הקריפטוגרפית (למשל בעזרת חתימת HMAC מאובטחת). לתקשורת בין מערכות וקליטת נתונים חיצוניים משתמשים אך ורק בפורמטים מבוססי טקסט בטוחים כמו <strong>JSON</strong> (דרך <code>json.loads</code>), תוך אימות קפדני לפי סכימה (Schema) והגבלת גודל הקלט.</p>
      <pre class="code"><code>import pickle

# הדגמת הסכנה: אובייקט זדוני המגדיר __reduce__ ומריץ פקודת מערכת בעת שחזור
class Exploit:
    def __reduce__(self):
        import os
        # מחזיר פונקציה להפעלה וארגומנטים — יופעל אוטומטית בעת pickle.load!
        return (os.system, ('whoami',))

# שימוש תקין: שמירה וטעינה אך ורק בקובץ מקומי שבשליטתכם המלאה
with open("state.pkl", "wb") as out:
    pickle.dump({"score": 100}, out)

with open("state.pkl", "rb") as inp:
    state = pickle.load(inp)  # בטוח רק כשהמקור אמין ושלמותו מובטחת</code></pre>
    `,
  }
);
