UNIT4.sections.push(
  {
    id: "u4-list",
    title: "רשימה (list): גודל, חיתוך ושיטות",
    html: `
      <p><code>list</code> שומרת כמה פריטים במשתנה אחד, בתוך סוגריים מרובעים. הסדר נשמר. אפשר לשנות, להוסיף ולהסיר אחרי היצירה, ואפשר גם אותו ערך פעמיים. האיבר הראשון הוא באינדקס 0, השני ב־1, וכן הלאה. <code>len</code> אומר כמה איברים יש. הפריטים לא חייבים להיות מאותו טיפוס: מותר לערבב מספר ומחרוזת. אין צורך להצהיר מראש על האורך.</p>
      <pre class="code"><code>l1 = [1, 2, 3]
l2 = ["a", "b", "c"]
l1 = l1 + l2
print(l1)
l1[4] = "d"
print(l1)</code></pre>
      <p>חיבור עם <code>+</code> יוצר רשימה חדשה. השמה לאינדקס, כמו <code>l1[4] = "d"</code>, משנה את הרשימה הקיימת. אחרי שחיברו <code>[1, 2, 3]</code> עם <code>["a", "b", "c"]</code>, האינדקס 4 הוא <code>"b"</code>, כי סופרים מאפס: 0 הוא 1, 1 הוא 2, 2 הוא 3, 3 הוא <code>"a"</code>, 4 הוא <code>"b"</code>.</p>
      <p>אפשר לקחת גם מהסוף או טווח. ב־<code>[start:end]</code> האיבר ב־end לא נכלל. אינדקס שלילי סופר מהסוף: <code>-1</code> הוא האחרון.</p>
      <pre class="code"><code>squares = [1, 4, 9, 16, 25, 36]
print(len(squares))     # 6
print(squares[0:2])     # [1, 4]
print(squares[-2:-1])   # [25]
print(squares[-2:])     # [25, 36]</code></pre>
      <p>שיטות נפוצות במצגת:</p>
      <ul>
        <li><code>append</code> — בסוף.</li>
        <li><code>clear</code> — מרוקן.</li>
        <li><code>copy</code> — רשימה חדשה עם אותם איברים (עותק רדוד).</li>
        <li><code>count</code> — כמה פעמים ערך מופיע.</li>
        <li><code>extend</code> — מצרף סדרת איברים.</li>
        <li><code>insert(index, value)</code> — דוחף במקום.</li>
        <li><code>sort</code> / <code>reverse</code> — ממיינים / הופכים <em>במקום</em>.</li>
      </ul>
      <p>רוב שיטות הרשימה משנות את האובייקט הקיים ולא מחזירות עותק. מלכודת מול <code>str.upper</code>.</p>
    `,
  },
  {
    id: "u4-join",
    title: "split ו־join",
    html: `
      <p>רשימה ומחרוזת נפגשות בשתי פעולות הפוכות: פירוק משפט למילים, וחיבור המילים בחזרה למשפט.</p>
      <p><code>split</code> ממחרוזת לרשימת מילים. <code>join</code> הפוך: קוראים ל־join <em>על מחרוזת הדבק</em>, והרשימה היא הארגומנט.</p>
      <pre class="code"><code>abc = "This sentence is a lie"
list_abc = abc.split(" ")
print("_".join(list_abc))</code></pre>
      <p>הפלט: מילים מחוברות בקו תחתון. אם קוראים <code>list_abc.join("_")</code> — זו שגיאה: ל־list אין join.</p>
    `,
  },
  {
    id: "u4-aliasing",
    title: "כינוי כפול (aliasing) מול copy, is מול ==",
    html: `
      <p>כי הרשימה mutable, השמה <code>vegs = fruit</code> היא <strong>כינוי כפול (aliasing)</strong>: שני שמות לאותו אובייקט. שינוי איבר דרך אחד נראה בשני. במצגת: אחרי <code>fruit[0] = "pear"</code> ו־<code>fruit[-1] = "orange"</code>, גם <code>vegs</code> מציג את אותם ערכים.</p>
      <p><code>copy()</code> או חיתוך <code>[:]</code> יוצרים רשימה חדשה. שינוי ב־fruit לא יעבור ל־vegs (כל עוד האיברים עצמם לא אובייקטים משותפים עמוקים יותר — עותק רדוד).</p>
      <p>שתי רשימות שנבנו בנפרד עם אותו תוכן:</p>
      <pre class="code"><code>alist = ["a", "b", "c"]
blist = ["a", "b", "c"]
print(alist is blist)   # False — שני אובייקטים
print(alist == blist)   # True  — אותו תוכן
print(id(alist), id(blist))</code></pre>
      <ul>
        <li><code>==</code> משווה תוכן (ערך).</li>
        <li><code>is</code> משווה זהות (אותו אובייקט בזיכרון).</li>
        <li><code>id(x)</code> — מזהה האובייקט (כתובת לוגית במפרש).</li>
      </ul>
      <p>מעבדת fruit/vegs למטה מדגימה את זה בלי להריץ פייתון בדפדפן.</p>
      <div class="panel">
        <p><strong>למה זה מבלבל בהתחלה.</strong> ב־C++ <code>int a = b</code> מעתיק מספר. בפייתון <code>vegs = fruit</code> על רשימה מדביק שני פתקים לאותה קופסה. לכן שינוי "ב־vegs" משנה גם את fruit. <code>==</code> שואל "אותו תוכן?"; <code>is</code> שואל "אותה קופסה?". דפנסיבית: אם מעבירים רשימה לפונקציה, הפונקציה עלולה לשנות את המקור — אלא אם מעתיקים במודע.</p>
      </div>
    `,
  },
  {
    id: "u4-loop-seq",
    title: "לולאת for, טווח (range) ו־tuple",
    html: `
      <p><code>for x in seq:</code> עובר על כל איבר בסדרה, לפי הסדר, ושם אותו ב־<code>x</code> בכל סיבוב. <code>print(..., end=" ")</code> מדפיס בלי לרדת שורה. בלי <code>end</code>, כל הדפסה מתחילה שורה חדשה.</p>
      <pre class="code"><code>mylist = ["this", "is", "a", "list"]
for word in mylist:
    print(word.capitalize(), end=" ")</code></pre>
      <p><code>range(n)</code> נותן את המספרים מ־0 עד n-1. יש n ערכים, והמספר n עצמו לא נכלל. זה נוח כשרוצים n חזרות. לולאה על אינדקסים נכתבת <code>for i in range(len(args)):</code>. הרשימה <code>[len(args)-1]</code> היא לא טווח: יש בה איבר אחד בלבד, ולכן הלולאה רצה פעם אחת.</p>
      <p>במצגת: פיבונאצ'י עם החלפה כפולה בשורה אחת:</p>
      <pre class="code"><code>a, b = 0, 1
for num in range(8):
    print(a)
    a, b = b, a + b</code></pre>
      <p>שמונה מספרים ראשונים בסדרה (0 עד 13). שימו לב: <code>range(8)</code> זה 8 חזרות, לא "עד 8 כולל".</p>
      <p><strong>tuple</strong> היא סדרה בסוגריים עגולים. בניגוד לרשימה, אחרי היצירה אי אפשר להחליף איבר. קוראים לפי אינדקס כמו ברשימה: <code>thistuple[1]</code> בדוגמה הוא <code>banana</code>. היא מתאימה כמפתח במילון כשהאיברים עצמם לא משתנים, למשל מספרים או מחרוזות. רשימה לא יכולה להיות מפתח, כי אפשר לשנות אותה.</p>
      <pre class="code"><code>thistuple = ("apple", "banana", "cherry")
print(thistuple[1])</code></pre>
    `,
  },
  {
    id: "u4-set-dict",
    title: "קבוצה (set) ומילון (dict)",
    html: `
      <p><strong>קבוצה (set)</strong> היא אוסף שבו כל ערך מופיע פעם אחת. אם מכניסים כפילות, היא נבלעת. אין סדר שאפשר לסמוך עליו: שני מעברים על אותה קבוצה לא חייבים להדפיס באותו סדר, ולכן לא בונים על הסדר הזה חישוב או פלט. כן משתמשים בה לבדיקת שייכות, לאיחוד ולחיתוך.</p>
      <p><strong>מילון (dict)</strong> שומר זוגות של מפתח וערך. המפתח ייחודי, והוא לרוב מחרוזת, לא בהכרח מספר. <code>thisdict["year"]</code> מביא את הערך של המפתח year. השמה לאותו מפתח מחליפה את הערך. מפתח שאין במילון, בתוך סוגריים מרובעים, זורק שגיאה. <code>get</code> מחזיר במקום זה <code>None</code> או ערך ברירת מחדל.</p>
      <pre class="code"><code>thisdict = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964,
}
print(thisdict["year"])
thisdict["year"] = 1980</code></pre>
      <p>במדריך זה אחד המבנים השימושיים ביותר: מחלקות ורוב המופעים הרגילים מחזיקים מרחב שמות דמוי מילון (<code>__dict__</code>). לכן שתי הגדרות מתודה באותו שם באותו גוף מחלקה אינן העמסה — ההגדרה המאוחרת מחליפה את המוקדמת. יש חריגים, למשל מחלקות שמשתמשות ב־<code>__slots__</code>.</p>
      <p>שיטות במצגת:</p>
      <ul>
        <li><code>clear</code> / <code>copy</code> / <code>fromkeys</code></li>
        <li><code>get</code> — ערך למפתח, בלי KeyError אם חסר (None או ברירת מחדל).</li>
        <li><code>items</code> — זוגות כ־tuples; <code>keys</code> / <code>values</code></li>
        <li><code>pop</code> — מוחק לפי מפתח ומחזיר ערך.</li>
        <li>גישה ב־<code>[]</code> למפתח חסר זורקת KeyError.</li>
      </ul>
      <p>תרגיל רעיון במצגת: קובץ שורות <code>foo=1</code> — לקרוא למילון: לכל שורה לפצל לפי <code>=</code>, מפתח משמאל, ערך מימין (אחרי המרה אם צריך).</p>
    `,
  },
  {
    id: "u4-files",
    title: "קבצים: פתיחה, מצבים וסגירה",
    html: `
      <p><code>open(path, "r")</code> מחזיר אובייקט קובץ. <code>read()</code> קורא את <em>כל</em> התוכן בבת אחת — לקובץ גדול זו בעיית זיכרון. <code>read(n)</code> קורא עד n תווים במצב טקסט; <code>readline</code> שורה; <code>for line in f</code> שורה־שורה. דפנסיבית משתמשים ב־<code>with</code>, שסוגר גם אם יש חריגה, ומציינים קידוד כשפורמט הקובץ ידוע.</p>
      <pre class="code"><code>with open("demofile.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line, end="")</code></pre>
      <ul>
        <li><code>"r"</code> קריאה (ברירת מחדל לעיתים).</li>
        <li><code>"w"</code> כתיבה ש<strong>דורסת</strong> תוכן קיים.</li>
        <li><code>"a"</code> הוספה בסוף הקובץ.</li>
      </ul>
      <p>בדיקה לפני פתיחה במצגת: <code>os.path.isfile</code>, ואז <code>readable()</code>. זה עדיין פער בין בדיקה לשימוש — TOCTOU מיחידה 3: הקובץ יכול להיעלם או להחליף זהות בין ה־if ל־open.</p>
    `,
  },
  {
    id: "u4-ex",
    title: "טיפול בחריגות (try, except, else, raise)",
    html: `
      <p>אירוע לא רצוי (קובץ חסר, המרה נכשלת) עלול "להעיף" את התוכנית עם Traceback. כמתכנתים רוצים להישאר בשליטה ולהציג הודעה ברורה. עוטפים ב־<code>try</code> (סביבה מוגנת) ויוצאים ב־<code>except</code>.</p>
      <p><code>except:</code> לבד תופס גם חריגות מערכת כגון <code>KeyboardInterrupt</code> ו־<code>SystemExit</code>. עדיף לתפוס טיפוס מפורש; אם נדרש ענף כללי לשגיאות רגילות, משתמשים ב־<code>except Exception</code>, רושמים ומחליטים אם להעביר הלאה. <code>else</code> רץ רק אם ה־try הסתיים בלי חריגה; <code>finally</code> רץ בכל מקרה ומשמש לניקוי שאינו מנוהל ב־<code>with</code>.</p>
      <pre class="code"><code>import sys
try:
    with open("myfile.txt") as f:
        s = f.readline()
        i = int(s.strip())
except OSError as err:
    print("OS error:", err)
except ValueError:
    print("Could not convert to integer")
except Exception:
    print("Unexpected:", sys.exc_info()[0])
    raise
else:
    print("all ok")</code></pre>
      <p><code>with</code> סוגר את הקובץ גם אם ההמרה נכשלת. בלי <code>with</code> צריך <code>finally</code> או סגירה ידנית — קל לשכוח בענף שגיאה.</p>
      <p>מילים שמורות במצגת (אי אפשר שמות משתנים): False, None, True, and, as, assert, async, await, break, class, continue, def, del, elif, else, except, finally, for, from, global, if, import, in, is, lambda, nonlocal, not, or, pass, raise, return, try, while, with, yield.</p>
      <p><strong>Pickle / Shelve</strong> — סדרת־אובייקטים של פייתון: <code>pickle.dump</code> שומר אובייקט לקובץ, <code>pickle.load</code> משחזר. השחזור יכול להפעיל קוד כחלק מבניית האובייקט; לכן טוענים רק קובץ ממקור אמין שעבורו נשמרה גם שלמות. לא <code>loads</code> על גוף בקשת משתמש. להחלפת נתונים עם מערכות אחרות מעדיפים JSON עם סכימה, מגבלות גודל ואימות ערכים.</p>
      <pre class="code"><code>import pickle
# כתיבה למקום שבשליטתכם, לא לקלט משתמש
with open("state.pkl", "wb") as out:
    pickle.dump({"n": 3}, out)

# קריאה רק מאותו מקור אמין
with open("state.pkl", "rb") as inp:
    state = pickle.load(inp)</code></pre>
    `,
  }
);
