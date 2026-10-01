(window.EXAM_SIMS = window.EXAM_SIMS || []).push(
  {
    id: "e-2021a74",
    title: "סימולציה בסגנון 2021א-74",
    minutes: 180,
    pick: 3,
    note: "מהשאלון: אפחות, Frog, יהלום, מפרק לא וירטואלי, קנרית, לקוח וארגז חול. שתי שאלות מסומנות כתוספת לסימולציה כי לא שוחזרו.",
    partA: [
      {
        id: "a1",
        prompt: "מה פירוש המושג אפחות (Mitigation)?",
        fromAsset: true,
        options: [
          { id: "a", text: "המערכת בלי באגים וללא בעיות אבטחה." },
          { id: "b", text: "שמירת נתונים בלי גישה לגורמים לא מורשים (סודיות)." },
          { id: "c", text: "תקיפה שנובעת מחולשה." },
          { id: "d", text: "הגנה שמזערה נזק מתקיפה." },
        ],
        answer: "d",
        hint: "<p>חשבו אם אפחות מסיר את עצם קיום החולשה בקוד, או שהוא מצמצם את הנגישות והנזק שהתוקף יכול לגרום.</p>",
        solution: "<p><strong>התשובה: ד'.</strong> אפחות אינו בהכרח תיקון שמבטל את החולשה מהשורש (כמו א'). היא הגנה היקפית או הנדסית — קנרית, ASLR, הרשאה מינימלית — שממזערת את הנזק בזמן תקיפה. ב' היא הגדרה של סודיות, ו־ג' היא ניצול.</p>",
      },
      {
        id: "a2",
        fromAsset: true,
        prompt: "בקטע הבא, היכן יאוחסנו f1 ו-p1?",
        code: "Frog f1(5);\nFrog *p1 = &f1;\nf1.hop();",
        options: [
          { id: "a", text: "f1 במחסנית, p1 בערמה." },
          { id: "b", text: "שניהם בערמה." },
          { id: "c", text: "שניהם במחסנית." },
          { id: "d", text: "p1 במחסנית, f1 בערמה." },
        ],
        answer: "c",
        hint: "<p>האם יש כאן קריאה לאופרטור <code>new</code> או <code>malloc</code>? היכן מוקצים משתנים מקומיים אוטומטיים בפונקציה?</p>",
        solution: `<p><strong>התשובה: ג'.</strong> שני המשתנים מוגדרים כמשתנים מקומיים אוטומטיים בפונקציה (ללא שימוש באופרטור <code>new</code>), ולכן שניהם מוקצים במסגרת המחסנית (Stack Frame).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' ו-ב' שגויות:</strong> הקצאה בערימה (Heap) מתבצעת רק באמצעות קריאה מפורשת ל-<code>new</code> או <code>malloc</code>. היות ש-<code>f1</code> אותחל ישירות כמשתנה מקומי אוטומטי, הוא נשמר במחסנית.</li>
<li><strong>ד' שגויה:</strong> <code>p1</code> הוא משתנה מקומי מטיפוס מצביע (Frog*), וגם הוא מוקצה במחסנית ומכיל את כתובת הזיכרון של <code>f1</code> (שנמצא גם כן במחסנית).</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "Messenger יורש מ-Sender ומ-Receiver, ושניהם יורשים מ-Thread. m.run() לא מתקמפל. למה?",
        options: [
          { id: "a", text: "בגלל ירושה מרובה לבדה." },
          { id: "b", text: "בגלל בעיית המשולש." },
          { id: "c", text: "בגלל בעיית היהלום: שני עותקים של Thread." },
          { id: "d", text: "הקוד כן מתקמפל." },
        ],
        answer: "c",
        hint: "<p>שימו לב לעץ הירושה: כאשר שני מסלולי ירושה מגיעים מאותו אב משותף ללא <code>virtual public</code>, כמה עותקים של מחלקת האב נוצרים?</p>",
        solution: `<p><strong>התשובה: ג'.</strong> זוהי בעיית היהלום (Diamond Problem) הקלאסית: גם Sender וגם Receiver יורשים מ-Thread ללא ירושה וירטואלית. לכן Messenger מכיל שני מופעים נפרדים של Thread, והקריאה ל-<code>m.run()</code> אינה חד-משמעית (ambiguous), מה שגורם לשגיאת קומפילציה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> ירושה מרובה היא חוקית ותקינה ב-C++ ואינה גורמת כשלעצמה לשגיאת קומפילציה, אלא אם כן נוצרת כפילות שמות בלתי ניתנת להכרעה.</li>
<li><strong>ב' שגויה:</strong> המונח המקובל במדעי המחשב הוא "בעיית היהלום" (Diamond Problem) עקב צורת גרף הירושה, ואין מושג בשם "בעיית המשולש".</li>
<li><strong>ד' שגויה:</strong> הקוד אינו מתקמפל אלא אם כן משתמשים בירושה וירטואלית (<code>virtual public Thread</code>) או מציינים מפורשות את הנתיב הרצוי (כגון <code>m.Sender::run()</code>).</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "Foo* f = new Bar(100); והמפרק של Foo אינו וירטואלי. delete f. מה זולג?",
        options: [
          { id: "a", text: "buffer1 של Foo." },
          { id: "b", text: "buffer2 של Bar. מפרק הבן לא רץ." },
          { id: "c", text: "שני החוצצים." },
          { id: "d", text: "אין זליגה." },
        ],
        answer: "b",
        hint: "<p>איזה מפרק ייקרא בזמן ריצה כאשר המצביע הוא מטיפוס הבסיס והמפרק בבסיס אינו וירטואלי?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> כאשר מוחקים אובייקט דרך מצביע למחלקת הבסיס (<code>Foo*</code>) שהמפרק שלה אינו וירטואלי, הקישור למפרק מתבצע סטטית בזמן קומפילציה לפי טיפוס המצביע. לכן נקרא רק <code>~Foo()</code>, ואילו מפרק הבן <code>~Bar()</code> אינו מופעל כלל, והמשאבים הייחודיים שהוקצו ב-Bar (כגון buffer2) זולגים.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' ו-ג' שגויות:</strong> המפרק של Foo כן מופעל ומנקה את buffer1, כך ש-buffer1 אינו זולג.</li>
<li><strong>ד' שגויה:</strong> אי-הפעלת מפרק המחלקה הנגזרת מונעת שחרור זיכרון ומשאבים וגורמת לדליפת זיכרון מובהקת (ומהווה התנהגות בלתי מוגדרת לפי תקן השפה).</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. שכבת הייצוג ב-OSI אחראית בעיקר ל:",
        options: [
          { id: "a", text: "ניתוב מנות בין רשתות ובקרת גודש." },
          { id: "b", text: "תרגום תחביר נתונים, דחיסה והצפנה/פענוח." },
          { id: "c", text: "העברה אמינה מקצה לקצה ובקרת זרימה." },
          { id: "d", text: "ניהול מסגרות ובקרת גישה לתווך הפיזי." },
        ],
        answer: "b",
        hint: "<p>זכרו את שכבה 6 במודל שבע השכבות של OSI — מה תפקידה בעיבוד המידע בין היישום לשיחה?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> שכבת הייצוג (Presentation Layer - שכבה 6 במודל OSI) עוסקת באופן שבו המידע מיוצג, כולל המרת פורמטים ותחביר נתונים (כגון תרגום בין תווי ASCII ל-EBCDIC), דחיסת נתונים והצפנה/פענוח.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> ניתוב ובקרת גודש הם תפקידי שכבת הרשת (Network Layer - שכבה 3, פרוטוקול IP).</li>
<li><strong>ג' שגויה:</strong> העברה אמינה ובקרת זרימה מקצה לקצה הם תפקידי שכבת התעבורה (Transport Layer - שכבה 4, פרוטוקול TCP).</li>
<li><strong>ד' שגויה:</strong> ניהול מסגרות (Frames) ובקרת גישה לתווך הם תפקידי שכבת הקו (Data Link Layer - שכבה 2).</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · לא מהמועד",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. פיצול מחרוזת והדפסת מילים שמתחילות ב-pre באותיות גדולות, ומחלקת Book.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>def print_pre(text):
    for w in text.split():
        if w.lower().startswith("pre"):
            print(w.upper())

class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year</code></pre>`,
        verdictKind: "new",
        verdict: "אין פתרון רשמי למועד הזה בסעיף הזה. זה ממלא פיצול + מחלקה. למועד 2024 הוסיפו type() לתת-מחלקה — ראו סימולציית 2024.",
      },
      {
        id: "q7",
        title: "שאלה 7 · קנרית המחסנית",
        prompt: "מהשאלון (שם זו שאלה 5): הבעיה שהובילה לקנרית, אופן הפעולה, מבנה המחסנית עם ובלי הקנרית, וחלופה.",
        hadOfficial: false,
        official: "",
        proposed: "<p>העתקה בלי גבול מגיעה לכתובת החזרה. ערך סודי נשתל לפניה ונבדק לפני ret. בלי קנרית: מקומיים, מסגרת שמורה, כתובת חזרה. עם קנרית: מקומיים, קנרית, מסגרת, כתובת חזרה. חלופה: ASLR או NX/DEP. הקנרית לא מתקנת את ההעתקה.</p>",
        verdictKind: "new",
        verdict: "זו שאלת הקנרית מהשאלון, לא שאלת שלוש האפחות הגנרית.",
      },
      {
        id: "q8",
        title: "שאלה 8 · לקוח פייתון ו־SQLite",
        prompt: "לקוח ל-119.4.7.5:8080, שליחת message.txt, הדפסת תשובה עד 128 בתים או 5 שורות (המוקדם), בלי Traceback. אחר כך טבלת messages עם מספר סידורי ועד 5 הודעות — פרמטרים.",
        hadOfficial: false,
        official: "השאלון קיים; פתרון רשמי מלא לא היה בחומר הקריא.",
        proposed: `<pre class="code" dir="ltr"><code>import socket, sqlite3
def main():
    try:
        with open("message.txt", "rb") as f:
            payload = f.read()
    except OSError as e:
        print("cannot read file:", e)
        return
    try:
        s = socket.create_connection(("119.4.7.5", 8080), timeout=10)
    except OSError as e:
        print("connect failed:", e)
        return
    try:
        s.sendall(payload)
        data = b""
        while len(data) &lt; 128 and data.count(b"\\n") &lt; 5:
            chunk = s.recv(64)
            if not chunk:
                break
            data += chunk
        lines = data.splitlines(True)
        out, n = b"", 0
        for ln in lines:
            if n &gt;= 5:
                break
            room = 128 - len(out)
            out += ln[:room]
            n += 1
            if len(out) &gt;= 128:
                break
        print(out.decode("utf-8", errors="replace"))
    finally:
        s.close()

conn = sqlite3.connect("table.db")
conn.execute("CREATE TABLE IF NOT EXISTS messages(id INTEGER, body TEXT)")
# replies: עד 5 מחרוזות מהשרת
for i, body in enumerate(replies[:5], start=1):
    conn.execute("INSERT INTO messages VALUES(?, ?)", (i, body))
conn.commit()
conn.close()</code></pre>`,
        verdictKind: "new",
        verdict: "עונה בדיוק: קובץ, IP/פורט, הגבלת פלט, הודעות שגיאה, טבלה עם ? . replies במבחן מגיע מסעיף א.",
      },
      {
        id: "q9",
        title: "שאלה 9 · ארגז חול ו־exec",
        prompt: "שירות ענן שמריץ קוד. א. Sandbox: מטרה, בעיות, מימוש עקרוני. ב. בעיות exec על קוד פייתון מהלקוח; אפחות; מה נשאר.",
        hadOfficial: false,
        official: "השאלה במבחן; אין פתרון רשמי קריא מעבר לניסוח.",
        proposed: `<p>א. ארגז חול מצמצם מה שקוד לא אמין יכול לגעת בו (קבצים, רשת, הרשאות). מימוש: תהליך חסר הרשאות, מגבלות משאבים, מרחב שמות. לא חסין באג בבקר.</p>
<p>ב. exec מריץ את המחרוזת כקוד. אפחות: לא במפרש של השרת; תהליך ילד מבודד. נשאר: בריחת ארגז, DoS עד התקרה. בלי מטען בריחה.</p>`,
        verdictKind: "new",
        verdict: "תואם את יחידה 6 ואת נוסח 2021א. אין פתרון רשמי לבדוק מולו.",
      },
    ],
  },
  {
    id: "e-2022c",
    title: "סימולציה בסגנון 2022ג",
    minutes: 180,
    pick: 3,
    note: "שחזור לפי זיכרון. אין פתרון רשמי. האמריקאית על bind אינה מהמועד: שאלת ההפניות לא שוחזרה.",
    partA: [
      {
        id: "a1",
        prompt: "אפחות (Mitigation):",
        options: [
          { id: "a", text: "ניצול חולשה." },
          { id: "b", text: "הגנה שמזערה נזק." },
          { id: "c", text: "רק הצפנה." },
          { id: "d", text: "מערכת בלי באגים." },
        ],
        answer: "b",
        hint: "<p>האם אפחות מסלק את החולשה עצמה או שהוא מנגנון שמפחית את ההשפעה ומקשה על הניצול בזמן תקיפה?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> אפחות (Mitigation) היא אמצעי הגנה או מנגנון אבטחה שנועד למזער את הנזק מתקיפה או להקשות על ניצול החולשה (כדוגמת ASLR, קנרית מחסנית או DEP), מבלי לחסל לחלוטין את שורש החולשה בקוד.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> ניצול חולשה (Exploit) הוא שלב התקיפה שמבצע התוקף כדי להשיג גישה, ההפך הגמור מאפחות.</li>
<li><strong>ג' שגויה:</strong> הצפנה היא רק כלי הגנה נקודתי אחד להבטחת סודיות או שלמות, בעוד אפחות כוללת מגוון רחב של מנגנוני הגנה מערכתיים והנדסיים.</li>
<li><strong>ד' שגויה:</strong> מערכת ללא באגים היא מצב אידיאלי בלתי מציאותי. אפחות מניחה מראש שבאגים וחולשות עלולים להתקיים, ופועלת להקטנת פגיעתם.</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "שכבת הייצוג ב-OSI:",
        options: [
          { id: "a", text: "ניתוב." },
          { id: "b", text: "קידוד / דחיסה / הצפנה." },
          { id: "c", text: "לחיצת יד TCP." },
          { id: "d", text: "DHCP." },
        ],
        answer: "b",
        hint: "<p>מהן שלוש הפעולות העיקריות המזוהות עם שכבה 6 (Presentation) במודל OSI?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> שכבת הייצוג (Presentation Layer - שכבה 6) עוסקת במבנה וייצוג המידע: קידוד נתונים והמרת תחביר (Syntax), דחיסת מידע, והצפנה/פענוח ברמת הייצוג.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> ניתוב מנות מתבצע בשכבת הרשת (Network Layer - שכבה 3) באמצעות נתבים ופרוטוקול IP.</li>
<li><strong>ג' שגויה:</strong> לחיצת יד משולשת (3-way handshake) שייכת לפרוטוקול TCP בשכבת התעבורה (Transport Layer - שכבה 4).</li>
<li><strong>ד' שגויה:</strong> פרוטוקול DHCP פועל בשכבת היישום (Application Layer - שכבה 7) להקצאת כתובות IP דינמיות.</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "פייתון והעמסה:",
        options: [
          { id: "a", text: "יש העמסה כמו C++." },
          { id: "b", text: "אין; הסתרת שם, ברירות מחדל, kwargs." },
          { id: "c", text: "רק עם virtual." },
          { id: "d", text: "רק ב-C." },
        ],
        answer: "b",
        hint: "<p>מה קורה בפייתון כשמגדירים שתי פונקציות בעלות אותו שם אך עם חתימות שונות?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> בפייתון אין העמסת פונקציות (Function Overloading) קלאסית לפי טיפוסי או מספר הפרמטרים כמו ב-C++. הגדרת פונקציה בעלת אותו שם דורסת/מסתירה (shadows) את ההגדרה הקודמת. התנהגות גמישה מושגת באמצעות ערכי ברירת מחדל, פרמטרים שמיים ו-<code>*args, **kwargs</code>.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> פייתון אינה תומכת בהעמסה מובנית לפי חתימה (signature dispatch) כפי שקיים בשפות סטטיות כמו C++ או ג'אווה.</li>
<li><strong>ג' שגויה:</strong> המילה <code>virtual</code> כלל אינה קיימת בפייתון; כל המתודות בפייתון וירטואליות ופולימורפיות כברירת מחדל.</li>
<li><strong>ד' שגויה:</strong> שפת C אינה תומכת בהעמסת פונקציות (Overloading).</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "קטע C++ בלי טיפוס למשתנה:",
        options: [
          { id: "a", text: "רץ עם auto תמיד." },
          { id: "b", text: "שגיאת קומפילציה (בלי auto/תבנית)." },
          { id: "c", text: "רק אזהרה." },
          { id: "d", text: "זה פייתון." },
        ],
        answer: "b",
        hint: "<p>האם C++ היא שפה בעלת טיפוסיות סטטית? מה מחייב התקן בעת הצהרה על משתנה?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> C++ היא שפה בעלת טיפוסיות סטטית חזקה (Statically Typed). כל משתנה חייב להיות מוצהר עם טיפוס מוגדר מראש (או באמצעות מילת המפתח <code>auto</code> להסקה סטטית, או כפרמטר תבנית). הצהרה על משתנה ללא טיפוס תוביל לשגיאת קומפילציה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> הקומפיילר אינו מנחש <code>auto</code> מעצמו אם המשתמש השמיט כליל את הטיפוס; חובה לציין מפורשות <code>auto</code> (החל מ-C++11) ואתחול.</li>
<li><strong>ג' שגויה:</strong> זו אינה אזהרה (Warning) אלא שגיאת קומפילציה חמורה המונעת לחלוטין את בניית הקובץ.</li>
<li><strong>ד' שגויה:</strong> השאלה עוסקת במפורש בקוד C++, שבו כללי הטיפוסיות קשיחים.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. שאלת ההפניות בחלק א לא שוחזרה בניסוח שאפשר לסמוך עליו. bind לכתובת IP נקובה בשרת (לא INADDR_ANY):",
        options: [
          { id: "a", text: "השרת מקשיב ומקבל חיבורים רק בממשק הרשת הספציפי ששויך לכתובת זו." },
          { id: "b", text: "השרת מקבל תעבורה מכל ממשקי הרשת המחוברים ומבצע סינון בחומת האש." },
          { id: "c", text: "מתבצעת הפניית פורטים אוטומטית (NAT) בנתב החיצוני המפנה אליו." },
          { id: "d", text: "הקריאה תיכשל בזמן ריצה, כיוון ששקע שרת מחויב להיקשר אך ורק ל-INADDR_ANY." },
        ],
        answer: "a",
        hint: "<p>מה ההבדל בין קשירת שקע ל-INADDR_ANY לבין קשירתו לכתובת IP מפורשת של ממשק יחיד (כגון 127.0.0.1)?</p>",
        solution: `<p><strong>התשובה: א'.</strong> כאשר שרת מבצע קריאת <code>bind()</code> לכתובת IP ספציפית (לדוגמה <code>127.0.0.1</code>), השקע מאזין ומקבל פניות אך ורק דרך ממשק הרשת (Network Interface) המשויך לאותה כתובת. לעומת זאת, קשירה ל-<code>INADDR_ANY</code> מאפשרת קבלת חיבורים מכלל ממשקי הרשת הזמינים במכונה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> קבלת תעבורה מכל הממשקים מאפיינת שימוש ב-<code>INADDR_ANY</code>, ואילו ציון IP ספציפי חוסם פיזית ברמת מערכת ההפעלה הגעת חבילות מממשקים אחרים.</li>
<li><strong>ג' שגויה:</strong> הפונקציה <code>bind</code> היא קריאת מערכת מקומית במערכת ההפעלה ואינה מגדירה או מתקשרת עם טבלאות NAT בנתבים חיצוניים.</li>
<li><strong>ד' שגויה:</strong> קשירה לכתובת ספציפית היא תקינה ונפוצה ביותר (למשל לצורך הגבלת שרת לשירות פנימי בלבד דרך Loopback).</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · שטח משולש ומצולע",
        prompt: "פונקציה לשטח לפי שתי צלעות וזווית כלולה 0.5·a·b·sin(γ), ברירות מחדל ו-kwargs; הדגמה בלי כל הארגומנטים; מחלקת מצולע (הדפסה+היקף) ומשולש שווה-צלעות יורש עם שטח.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>import math
def area(a=3, b=4, gamma=90, **kwargs):
    g = kwargs.get("gamma", gamma)
    return 0.5 * a * b * math.sin(math.radians(g))
print(area())
print(area(b=5, gamma=60))

class Polygon:
    def __init__(self, sides):
        self.sides = list(sides)
    def perimeter(self):
        return sum(self.sides)
    def __str__(self):
        return "Polygon " + str(self.sides)

class Equilateral(Polygon):
    def __init__(self, a):
        super().__init__([a, a, a])
    def area(self):
        a = self.sides[0]
        return (math.sqrt(3) / 4) * a * a</code></pre>`,
        verdictKind: "new",
        verdict: "אין פתרון רשמי. מכסה נוסחה, kwargs, ירושה ושטח למשולש שווה-צלעות.",
      },
      {
        id: "q7",
        title: "שאלה 7 · שלוש אפחות לגלישה",
        prompt: "לפחות שלוש שיטות מול התקפות מבוססות overflow / דריסת חזרה.",
        hadOfficial: false,
        official: "",
        proposed: "<p>קנרית; ASLR; NX; בדיקות אורך; קומפיילר (stack protector).</p>",
        verdictKind: "new",
        verdict: "אין רשמי. די כמו שאלה 7 ב-2024.",
      },
      {
        id: "q8",
        title: "שאלה 8 · echo על 192.168.1.5",
        prompt: "שרת TCP שמקשיב לכתובת הנקובה ומחזיר echo. הכתובת אינה INADDR_ANY.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>#include &lt;arpa/inet.h&gt;
#include &lt;string.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;unistd.h&gt;
int main(void) {
  int ls = socket(AF_INET, SOCK_STREAM, 0);
  int yes = 1;
  setsockopt(ls, SOL_SOCKET, SO_REUSEADDR, &amp;yes, sizeof yes);
  struct sockaddr_in a;
  memset(&amp;a, 0, sizeof a);
  a.sin_family = AF_INET;
  a.sin_port = htons(8080);
  inet_pton(AF_INET, "192.168.1.5", &amp;a.sin_addr);
  bind(ls, (struct sockaddr *)&amp;a, sizeof a);
  listen(ls, 4);
  int c = accept(ls, 0, 0);
  char buf[512];
  ssize_t n = recv(c, buf, sizeof buf, 0);
  if (n &gt; 0) send(c, buf, (size_t)n, 0);
  close(c);
  close(ls);
}</code></pre>`,
        verdictKind: "new",
        verdict: "פורט לא צוין בשחזור — 8080 כמקובל בקורס. bind לכתובת הספציפית.",
      },
      {
        id: "q9",
        title: "שאלה 9 · ארגז חול ו־exec",
        prompt: "כמו 2021א-74 שאלה 9.",
        hadOfficial: false,
        official: "",
        proposed: "<p>ראו סימולציית 2021א-74 שאלה 9 — אותו נוסח משוחזר.</p>",
        verdictKind: "new",
        verdict: "השחזור הפנה במפורש לשם.",
      },
    ],
  },
  {
    id: "e-2024",
    title: "סימולציה בסגנון 26.2.2024",
    minutes: 180,
    pick: 3,
    note: "שאלה 9 לא זכורה, ולכן אין לה פתרון כאן.",
    partA: [
      {
        id: "a1",
        prompt: "הצורה הנכונה לביטוי משולש ב-C++:",
        options: [
          { id: "a", text: "cond ? a : b" },
          { id: "b", text: "cond ?? a" },
          { id: "c", text: "a if cond else b כמו פייתון." },
          { id: "d", text: "רק if בלי ערך." },
        ],
        answer: "a",
        hint: "<p>מהו התחביר של האופרטור הטרנרי (Ternary Operator) בשפות ממשפחת C/C++?</p>",
        solution: `<p><strong>התשובה: א'.</strong> האופרטור המותנה המשולש (Ternary Conditional Operator) ב-C++ נכתב בתחביר <code>condition ? expr_true : expr_false</code>. הוא מעריך את התנאי ומחזיר את תוצאת אחד משני הביטויים כערך.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> <code>??</code> הוא אופרטור Null Coalescing המוכר משפות כמו C# או JavaScript, ואינו קיים כלל בתקן C++.</li>
<li><strong>ג' שגויה:</strong> התחביר <code>x if cond else y</code> הוא הביטוי המותנה של שפת פייתון, ואינו חוקי ב-C++.</li>
<li><strong>ד' שגויה:</strong> הצהרת <code>if</code> רגילה היא משפט (Statement) שאינו מחזיר ערך כביטוי (Expression), ולכן אינה יכולה לשמש ישירות בתוך השמה.</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "חולשה (Vulnerability):",
        options: [
          { id: "a", text: "התקיפה עצמה." },
          { id: "b", text: "פגם שמאפשר ניצול." },
          { id: "c", text: "רק באג חישוב." },
          { id: "d", text: "אפחות." },
        ],
        answer: "b",
        hint: "<p>האם חולשה היא הפעולה של התוקף או הליקוי הקיים במערכת שמאפשר את הפעולה?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> לפי הגדרות אבטחת מידע והקורס, חולשה (Vulnerability) היא פגם, פרצה או ליקוי בתכנון, במימוש או בתצורה של מערכת, המאפשר לתוקף לבצע פעולה בלתי מורשית או לגרום נזק.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> התקיפה עצמה היא הניצול (Exploitation / Attack) של החולשה, ולא החולשה עצמה.</li>
<li><strong>ג' שגויה:</strong> לא כל חולשה היא באג חישוב; חולשות רבות נובעות מבעיות הרשאות, היעדר אימות קלט, ארכיטקטורה שגויה, ניהול זיכרון לקוי ועוד.</li>
<li><strong>ד' שגויה:</strong> אפחות (Mitigation) היא מנגנון ההגנה שמצמצם את הסיכון או הנזק, כלומר המענה לחולשה ולא החולשה עצמה.</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "סיביות ב-IPv6:",
        options: [
          { id: "a", text: "32" },
          { id: "b", text: "128" },
          { id: "c", text: "48" },
          { id: "d", text: "8" },
        ],
        answer: "b",
        hint: "<p>כתובת IPv4 היא בת 32 סיביות (4 בתים). לכמה סיביות הורחב מרחב הכתובות ב-IPv6?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> כתובת פרוטוקול IPv6 מורכבת מ-128 סיביות (16 בתים), ונכתבת בדרך כלל ב-8 קבוצות של 4 ספרות הקסדצימליות המופרדות בנקודתיים.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> 32 סיביות (4 בתים) הוא גודלה של כתובת IPv4.</li>
<li><strong>ג' שגויה:</strong> 48 סיביות (6 בתים) הוא גודלה של כתובת פיזית MAC בשכבת הקו (Ethernet).</li>
<li><strong>ד' שגויה:</strong> 8 סיביות הן בית בודד, גודל בלתי אפשרי לכתובת רשת גלובלית.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "b = a.copy ברשימה ואז שינוי איבר:",
        options: [
          { id: "a", text: "העתקה רדודה — a ו-b רשימות נפרדות." },
          { id: "b", text: "אותו אובייקט." },
          { id: "c", text: "עמוקה תמיד כולל כל הקינון." },
          { id: "d", text: "שגיאה." },
        ],
        answer: "a",
        hint: "<p>מה ההבדל בין השמה <code>b = a</code> לבין מתודת ההעתקה <code>b = a.copy()</code> ברשימות פייתון, ומהי העתקה רדודה (Shallow Copy)?</p>",
        solution: `<p><strong>התשובה: א'.</strong> המתודה <code>a.copy()</code> (או שימוש ב-slice <code>a[:]</code>) יוצרת העתקה רדודה (Shallow Copy). נוצר אובייקט רשימה חדש ונפרד <code>b</code>, כך ששינוי, הוספה או החלפת איבר ברשימה <code>b</code> (ברמה העליונה) לא ישפיע על הרשימה המקורית <code>a</code>.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> אותו אובייקט מתקבל רק בהשמה פשוטה <code>b = a</code> (המעתיקה את ההפניה בלבד, כך ש-<code>a is b</code>). ב-<code>a.copy()</code> נוצר אובייקט נפרד (<code>a is not b</code>).</li>
<li><strong>ג' שגויה:</strong> העתקה עמוקה (Deep Copy) משכפלת רקורסיבית גם איברים מוכלים (כמו תת-רשימות) ודורשת שימוש במודול <code>copy.deepcopy()</code>, ואילו <code>copy()</code> היא רדודה בלבד.</li>
<li><strong>ד' שגויה:</strong> זוהי פעולה תקינה ושגרתית לחלוטין בפייתון 3 ואינה גורמת לשום שגיאה.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "העמסה בפייתון:",
        options: [
          { id: "a", text: "נתמכת כמו C++." },
          { id: "b", text: "לא נתמכת." },
          { id: "c", text: "רק על אופרטורים." },
          { id: "d", text: "רק ב-C." },
        ],
        answer: "b",
        hint: "<p>האם פייתון מאפשרת להגדיר פונקציות בעלות אותו שם עם טיפוסי קלט שונים באותו מרחב שמות?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> פייתון אינה תומכת בהעמסת פונקציות (Function Overloading) מובנית לפי חתימת הפרמטרים. אם מוגדרת פונקציה עם אותו שם, ההגדרה המאוחרת דורסת ומחליפה לחלוטין את הקודמת. במקום זאת, בפייתון משתמשים בפרמטרים אופציונליים עם ערכי ברירת מחדל או ב-<code>*args, **kwargs</code>.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> בשונה מ-C++, אין בפייתון מנגנון חתימות (Name Mangling / Signature Resolution) המאפשר ריבוי פונקציות בעלות אותו שם.</li>
<li><strong>ג' שגויה:</strong> העמסת אופרטורים (Operator Overloading) מתבצעת באמצעות מתודות קסם (כמו <code>__add__</code>), אך השאלה עוסקת בהעמסת פונקציות כללית שאינה נתמכת בשפה.</li>
<li><strong>ד' שגויה:</strong> שפת C כלל אינה תומכת בהעמסה מכל סוג שהוא.</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, ספר, ויצירת מחלקה",
        prompt: "א. מילים שמתחילות ב-pre באותיות גדולות (פיצול רווח/שורה). ב. Book(שם, כותב, שנה). ג. קלט שם תת-מחלקה; type; בנאי קורא ל-Book; openu_id=20535.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>def print_pre(s):
    for w in s.split():
        if w.lower().startswith("pre"):
            print(w.upper())

class Book:
    def __init__(self, title, author, year):
        self.title, self.author, self.year = title, author, year

name = input("class name: ").strip()
Sub = type(name, (Book,), {"openu_id": 20535})
# אם דורשים __init__ שקורא לבסיס במפורש:
def _init(self, title, author, year):
    Book.__init__(self, title, author, year)
Sub = type(name, (Book,), {"openu_id": 20535, "__init__": _init})</code></pre>`,
        verdictKind: "new",
        verdict: "אין רשמי. type() עם openu_id ממלא את סעיף ג כמו בשחזור.",
      },
      {
        id: "q7",
        title: "שאלה 7 · שלוש הגנות לכתובת חזרה",
        prompt: "ASLR, קנרית, ועוד.",
        hadOfficial: false,
        official: "",
        proposed: "<p>קנרית המחסנית; ASLR; NX/DEP. אפשר להוסיף בדיקת אורך.</p>",
        verdictKind: "new",
        verdict: "אין רשמי.",
      },
      {
        id: "q8",
        title: "שאלה 8 · שליחת קובץ בחלקים ושרת C++",
        prompt: "לקוח פייתון שולח קובץ בצ'אנקים ≤1024 לכתובת ופורט; שרת C++ מקבל ומאשר.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code># לקוח
import socket
s = socket.create_connection((HOST, PORT))
with open("data.bin", "rb") as f:
    while True:
        chunk = f.read(1024)
        if not chunk:
            break
        s.sendall(chunk)
print(s.recv(64))
s.close()

/* שרת: recv בלולאה, send "OK" */</code></pre>`,
        verdictKind: "new",
        verdict: "HOST/PORT כמו בשאלה. אין רשמי.",
      },
      {
        id: "q9",
        title: "שאלה 9 · אין שחזור אמין",
        prompt: "בשחזור המקורי הסעיף לא זכור.",
        hadOfficial: false,
        official: "",
        proposed: "<p>אין הצעת קוד — עדיף לא לבחור את השאלה הזו בסימולציה אם אתם מתרגלים מועד אמיתי.</p>",
        verdictKind: "new",
        verdict: "לא ממציאים קטע C++.",
      },
    ],
  },
  {
    id: "e-2025c",
    title: "סימולציה בסגנון 2025ג מועד ג",
    minutes: 180,
    pick: 3,
    note: "שאלות 6–9 מהשחזור. חמש האמריקאיות אינן מהמועד: גוף חלק א לא היה במחברות, רק מפתח.",
    partA: [
      {
        id: "a1",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. ASLR נועד בעיקר:",
        options: [
          { id: "a", text: "להצפין את תוכן הדיסק ומערכת הקבצים במנוחה." },
          { id: "b", text: "לגרום לכתובות הזיכרון (מחסנית, ערימה, ספריות) להשתנות באקראי בכל הרצה." },
          { id: "c", text: "למנוע הרצת פקודות מקטעי זיכרון המיועדים לנתונים בלבד." },
          { id: "d", text: "לחסום גלישות חוצץ על ידי שתילת ערך סודי לפני כתובת החזרה." },
        ],
        answer: "b",
        hint: "<p>מהי המשמעות המילולית של Address Space Layout Randomization ואיזה יעד היא שוללת מתוקף?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> מנגנון ASLR (Address Space Layout Randomization) מגריל את כתובות הבסיס של אזורי הזיכרון השונים (המחסנית, הערימה והספריות המשותפות) בכל הפעלה מחדש של התוכנית. כתוצאה מכך, תוקף אינו יכול לחזות מראש כתובות מדויקות (כגון כתובת פונקציה בספרייה או מיקום Shellcode) לצורך קפיצה או מתקפת Return-to-libc.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> הצפנת דיסק (כמו BitLocker) שייכת לשכבת האחסון ואינה קשורה לניהול מרחב הכתובות הווירטואלי של תהליכים.</li>
<li><strong>ג' שגויה:</strong> מניעת הרצת פקודות מאזורי נתונים היא תפקידו של מנגנון DEP / NX (Data Execution Prevention / No-Execute bit).</li>
<li><strong>ד' שגויה:</strong> שתילת ערך סודי במחסנית לפני כתובת החזרה ובדיקתו בסיום הפונקציה היא אופן הפעולה של קנרית המחסנית (Stack Canary).</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. שאילתה פרמטרית (Parameterized Query) מגנה מפני הזרקת SQL כי:",
        options: [
          { id: "a", text: "היא משרשרת את קלט המשתמש ישירות למחרוזת הפקודה לאחר סינון תווים ידני." },
          { id: "b", text: "היא מפרידה לחלוטין בין תחביר הפקודה לבין הנתונים, כך שהקלט לעולם אינו מפוענח כפקודה." },
          { id: "c", text: "היא מצפינה את כל בסיס הנתונים ברמת הטבלאות והשורות." },
          { id: "d", text: "היא מגבילה את הגישה למסד הנתונים אך ורק למשתמש מנהל (root)." },
        ],
        answer: "b",
        hint: "<p>כיצד מסד הנתונים מתייחס לערכים שמועברים בפרמטרים (מצייני מקום כגון <code>?</code>) בהשוואה למחרוזת SQL גולמית?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> שאילתה פרמטרית מפרידה באופן מוחלט בין מבנה השאילתה (התחביר המקומפל מראש על ידי מנוע ה-DB) לבין הערכים המוזנים. הקלט שמספק המשתמש נקשר כפרמטר (Data Literal) בלבד, ולכן גם אם הוא כולל גרשים, גרשיים או פקודות SQL זדוניות (כמו <code>OR 1=1</code>), המנוע לעולם לא יפרש אותם כחלק מתחביר הפקודה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> שרשור מחרוזות ישיר הוא בדיוק הפרקטיקה הפגומה שגורמת לפרצות הזרקת SQL (SQL Injection); רשימות שחורות או סינון ידני אינם תחליף לפרמטריזציה.</li>
<li><strong>ג' שגויה:</strong> שאילתות פרמטריות אינן מנגנון הצפנה של בסיס הנתונים אלא מנגנון תעבורה והרצה מאובטח של פקודות.</li>
<li><strong>ד' שגויה:</strong> שימוש בחשבון מנהל אינו מונע הזרקת SQL (להפך, הוא מעצים את פוטנציאל הנזק), ושאילתות פרמטריות אינן מנהלות הרשאות משתמשים.</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. הקריאה type(name, bases, dict) בפייתון עם 3 ארגומנטים משמשת ל:",
        options: [
          { id: "a", text: "יצירה דינמית של מחלקה חדשה בזמן ריצה (Metaclass construction)." },
          { id: "b", text: "החזרת טיפוס הנתונים של אובייקט קיים לבדיקת טיפוסים בלבד." },
          { id: "c", text: "המרת מחרוזת לערך מספרי שלם (Type Casting)." },
          { id: "d", text: "מחיקת מחלקה מזיכרון המפרש." },
        ],
        answer: "a",
        hint: "<p>מה ההבדל בין קריאה ל-<code>type(obj)</code> עם ארגומנט אחד לבין קריאה עם שלושה ארגומנטים?</p>",
        solution: `<p><strong>התשובה: א'.</strong> בפייתון, לפונקציה <code>type</code> יש שתי מטרות שונות: עם ארגומנט אחד (<code>type(obj)</code>) היא מחזירה את הטיפוס של האובייקט; עם שלושה ארגומנטים (<code>type(name, bases, dict)</code>) היא מתפקדת כמטה-מחלקה (Metaclass) ויוצרת באופן דינמי מחלקה חדשה בזמן ריצה, עם שם, מחלקות בסיס ומילון תכונות/מתודות.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> החזרת טיפוס מתבצעת רק בקריאה ל-<code>type</code> עם ארגומנט יחיד.</li>
<li><strong>ג' שגויה:</strong> המרת מחרוזת למספר שלם נעשית באמצעות הפונקציה <code>int()</code>, לא <code>type()</code>.</li>
<li><strong>ד' שגויה:</strong> <code>type</code> אינו מוחק מחלקות; מחיקת הפניה לאובייקט מתבצעת באמצעות פקודת <code>del</code>.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. מתקפת מניעת שירות מבוזרת (DDoS) פוגעת בעיקר בצלע הבאה של משולש ה-CIA:",
        options: [
          { id: "a", text: "זמינות (Availability)." },
          { id: "b", text: "סודיות (Confidentiality)." },
          { id: "c", text: "שלמות (Integrity)." },
          { id: "d", text: "אי-התכחשות (Non-Repudiation)." },
        ],
        answer: "a",
        hint: "<p>מטרת מתקפת DoS/DDoS היא להציף את השרת בבקשות סרק כך שמשתמשים לגיטימיים לא יוכלו לקבל שירות. לאיזה יעד ב-CIA זה שייך?</p>",
        solution: `<p><strong>התשובה: א'.</strong> מתקפת DDoS (Distributed Denial of Service) מציפה את המערכת, השרת או רוחב הפס התקשורתי בעומס חריג במטרה להשבית את השירות ולמנוע ממשתמשים מורשים גישה אליו. בכך היא פוגעת ישירות בזמינות (Availability) של המערכת.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> פגיעה בסודיות מתרחשת כאשר מידע רגיש נחשף לגורם בלתי מורשה (Data Breach/Leak), דבר שאינו המטרה הישירה של מתקפת מניעת שירות.</li>
<li><strong>ג' שגויה:</strong> פגיעה בשלמות מתרחשת כאשר נתונים משתנים, נמחקים או מושחתים באופן בלתי מורשה.</li>
<li><strong>ד' שגויה:</strong> אי-התכחשות מובטחת באמצעות חתימות דיגיטליות ורישום פעולות (Audit Logs), ואינה הצלע המותקפת ב-DDoS.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. מה תפקידה של טבלת הפונקציות הווירטואליות (vtable) ב-C++?",
        options: [
          { id: "a", text: "לשמור טבלת מצביעים לפונקציות וירטואליות לצורך קישור דינמי (Dynamic Dispatch) בזמן ריצה." },
          { id: "b", text: "לנהל את הקצאות הזיכרון בערימה בעת קריאה לאופרטור new." },
          { id: "c", text: "לשמור את שמות המשתנים המקומיים וכתובותיהם במסגרת המחסנית." },
          { id: "d", text: "למנוע גלישות חוצץ באמצעות בדיקת גבולות מערכים בזמן קומפילציה." },
        ],
        answer: "a",
        hint: "<p>כיצד האובייקט יודע לאיזה מימוש של פונקציה וירטואלית לקרוא כאשר הפנייה אליו נעשית דרך מצביע למחלקת הבסיס?</p>",
        solution: `<p><strong>התשובה: א'.</strong> טבלת ה-vtable (Virtual Method Table) היא מבנה נתונים סטטי שנוצר עבור כל מחלקה המכילה פונקציה וירטואלית אחת לפחות. היא מכילה מצביעים למימושים המתאימים של הפונקציות הווירטואליות. כל אובייקט כולל מצביע (vptr) המפנה ל-vtable של המחלקה האמיתית שממנה הוא נוצר, מה שמאפשר קריאה פולימורפית (קישור דינמי) בזמן ריצה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> ניהול הקצאות זיכרון בערימה מבוצע על ידי ה-Heap Manager / Memory Allocator של מערכת ההפעלה וספריית הריצה, ללא קשר ל-vtable.</li>
<li><strong>ג' שגויה:</strong> משתנים מקומיים מנוהלים על ידי מסגרת המחסנית (Stack Frame) והרגיסטרים (כגון RBP/RSP), ללא קשר למנגנון וירטואלי.</li>
<li><strong>ד' שגויה:</strong> ה-vtable אינה מנגנון אבטחה ואינה בודקת גבולות מערכים (להפך, דריסת מצביע ה-vptr על ידי גלישת חוצץ היא וקטור תקיפה מסוכן).</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, קובץ, ויצירת מחלקה",
        prompt: "wordp: str או ValueError; פיצול בפסיק; מילים שמתחילות ב-im; אות ראשונה גדולה והשאר קטנות. x_file: Setup.csv לכל שורה wordp → Setup-revised.txt, קובץ חסר. מחלקת Book + type לתת-מחלקה עם MainChar.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>def wordp(s):
    if not isinstance(s, str):
        raise ValueError("expected str")
    out = []
    for raw in s.split(","):
        w = raw.strip()
        if w.lower().startswith("im"):
            out.append(w[0].upper() + w[1:].lower() if len(w) else w)
    return out

def x_file():
    try:
        inf = open("Setup.csv", encoding="utf-8")
    except FileNotFoundError:
        print("Setup.csv missing")
        return
    try:
        with inf, open("Setup-revised.txt", "w", encoding="utf-8") as out:
            for line in inf:
                out.write(",".join(wordp(line)) + "\\n")
    except OSError as e:
        print("write failed:", e)

class Book:
    def __init__(self, title, author, year):
        self.title, self.author, self.year = title, author, year
cls_name = input("class: ")
main_char = input("MainChar: ")
Dyn = type(cls_name, (Book,), {"MainChar": main_char})
book = Dyn("t", "a", 1999)</code></pre>`,
        verdictKind: "new",
        verdict: "אין רשמי. פיצול בפסיק כמו בשחזור; startswith im בלי תלות רישיות.",
      },
      {
        id: "q7",
        title: "שאלה 7 · פריסה אקראית (ASLR)",
        prompt: "מהו ASLR, איזו בעיית אבטחה, איך בודקים אם פעיל, ומנגנון נוסף או מגבלה.",
        hadOfficial: false,
        official: "",
        proposed: `<p>ערבוב כתובות מקשה על שימוש בכתובת קבועה לדריסת ret. בדיקה: להדפיס כתובת מקומית בשתי הרצות. נוסף: קנרית / NX. מגבלה: דליפת כתובת מבטלת חלק מההגנה; לא מתרגלים עקיפה.</p>
<pre class="code" dir="ltr"><code>int x; printf("%p\\n", (void *)&amp;x);</code></pre>`,
        verdictKind: "new",
        verdict: "אין רשמי.",
      },
      {
        id: "q8",
        title: "שאלה 8 · טבלה וירטואלית, הסבר בלבד",
        prompt: "הסבירו פונקציות וירטואליות, קשר מצביע-אובייקט, ומה קורה ב-obj->show(). לא משנים כניסות בטבלה באתר.",
        hadOfficial: false,
        official: "במחברות ביקשו גם להצביע את הכניסה הראשונה לפונקציה חיצונית — זה תרגיל כתיבה לזיכרון. לא בסימולציה.",
        proposed: "<p>ל-Derived יש vtable עם show של הבסיס אם לא נדרס. obj מסוג Base* לאובייקט Derived: הקריאה בזמן ריצה לפי הטבלה של האובייקט. כתיבה לטבלה שוברת שלמות — לא מממשים.</p>",
        verdictKind: "new",
        verdict: "עונה על סעיף ההסבר. סעיף ההחלפה נחסם במכוון.",
      },
      {
        id: "q9",
        title: "שאלה 9 · פרוקסי ומטמון SQLite",
        prompt: "שרת 8080, URL עד 2048, טבלת url_cache עם ?, קובץ בדיסק, dataclass, מחיקת הישן מעל 10 רשומות.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>from dataclasses import dataclass
import sqlite3, time
@dataclass
class UrlRecord:
    url: str
    path: str
    ts: float

def get_cached(conn, url):
    row = conn.execute(
        "SELECT path FROM url_cache WHERE url = ?", (url,)
    ).fetchone()
    return row[0] if row else None

def put(conn, rec: UrlRecord):
    conn.execute(
        "INSERT INTO url_cache(url, path, ts) VALUES(?,?,?)",
        (rec.url, rec.path, rec.ts),
    )
    n = conn.execute("SELECT COUNT(*) FROM url_cache").fetchone()[0]
    while n &gt; 10:
        old = conn.execute(
            "SELECT url, path FROM url_cache ORDER BY ts ASC LIMIT 1"
        ).fetchone()
        conn.execute("DELETE FROM url_cache WHERE url = ?", (old[0],))
        # os.remove(old[1]) אם הקובץ קיים
        n -= 1
    conn.commit()</code></pre>
<p>השרת: recv, בדיקת אורך, אם במטמון קוראים קובץ, אחרת get_response, שומרים קובץ+רשומה. URL לא מודבק ל-SQL.</p>`,
        verdictKind: "new",
        verdict: "אין רשמי. ORDER BY ts + ? למחיקה ממלאים את סעיף ב' בלי הזרקה.",
      },
    ],
  },
  {
    id: "e-2026a",
    title: "סימולציה בסגנון 2026א",
    minutes: 180,
    pick: 3,
    note: "שאלות 6–8 מהשחזור. שאלה 9 לא שוחזרה. חמש האמריקאיות אינן מהמועד: לא היה טקסט שאלות.",
    partA: [
      {
        id: "a1",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. פונקציה וירטואלית ב-C++ נקשרת:",
        options: [
          { id: "a", text: "בקומפילציה (קישור סטטי), לפי טיפוס המצביע או הייחוס בלבד." },
          { id: "b", text: "בזמן ריצה (קישור דינמי), לפי הטיפוס הדינמי האמיתי של האובייקט (באמצעות vtable)." },
          { id: "c", text: "בזמן ריצה, אך רק אם האובייקט הוקצה במחסנית ולא בערימה." },
          { id: "d", text: "בעת טעינת התוכנית (Load Time) על ידי המקשר (Linker) של מערכת ההפעלה." },
        ],
        answer: "b",
        hint: "<p>מה מאפשרת מילת המפתח <code>virtual</code> ב-C++ ואיזה מנגנון (Dynamic Dispatch) פועל בעת קריאה לה?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> פונקציה וירטואלית מוכרעת ומקושרת בזמן ריצה (קישור דינמי / Dynamic Dispatch). הקומפיילר מייצר קריאה עקיפה דרך טבלת הפונקציות הווירטואליות (vtable) ומוצא את המימוש המתאים לפי הטיפוס הממשי של האובייקט שעליו הופעלה הפונקציה, גם אם הקריאה בוצעה דרך מצביע או הפניה למחלקת בסיס.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> קישור סטטי בקומפילציה לפי טיפוס המצביע מאפיין פונקציות שאינן וירטואליות (Non-virtual).</li>
<li><strong>ג' שגויה:</strong> מנגנון הפולימורפיזם הווירטואלי פועל בדיוק באותו אופן בין אם האובייקט הוקצה במחסנית, בערימה או במקטע סטטי.</li>
<li><strong>ד' שגויה:</strong> המקשר (Linker) אינו מבצע הכרעה פולימורפית של פונקציות וירטואליות; ההכרעה מתבצעת תוך כדי ריצה בעזרת ה-vptr.</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. קריאה לפונקציה לא-וירטואלית דרך מצביע למחלקת בסיס שמצביע על אובייקט נגזר תפעיל את המימוש של:",
        options: [
          { id: "a", text: "המחלקה הנגזרת, כי הטיפוס האמיתי בזיכרון הוא הנגזר." },
          { id: "b", text: "מחלקת הבסיס, כיוון שהקריאה מוכרעת סטטית לפי הטיפוס המוצהר של המצביע." },
          { id: "c", text: "המחלקה שבה הפונקציה הוגדרה אחרונה בקובץ הקוד." },
          { id: "d", text: "שגיאת קומפילציה, כי אסור לדרוס פונקציה שאינה וירטואלית." },
        ],
        answer: "b",
        hint: "<p>כאשר פונקציה אינה מוגדרת כ-<code>virtual</code>, כיצד הקומפיילר קובע לאיזו כתובת לקפוץ?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> עבור פונקציה שאינה וירטואלית (Non-virtual), הקישור מתבצע סטטית בזמן הידור (Static Early Binding) על פי טיפוס המצביע (הטיפוס הסטטי). היות שהמצביע הוא מטיפוס מחלקת הבסיס, הקומפיילר מייצר קריאה ישירה לקוד של מחלקת הבסיס, ללא תלות בטיפוס האובייקט שנוצר בערימה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> כדי לקרוא למימוש הנגזר דרך מצביע בסיס חובה להגדיר את הפונקציה כ-<code>virtual</code> בבסיס.</li>
<li><strong>ג' שגויה:</strong> סדר ההגדרות בקובץ אינו משפיע על כללי הקישור הסטטי והירושה ב-C++.</li>
<li><strong>ד' שגויה:</strong> מותר להגדיר פונקציה בעלת אותו שם בבן (הסתרת שם / Name Hiding), והדבר מתקמפל באופן תקין לחלוטין.</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. שימוש בסימן שאלה ? כ-placeholder בשאילתת INSERT ב-SQLite (למשל conn.execute(\"INSERT ... VALUES (?)\", (val,))):",
        options: [
          { id: "a", text: "מבטיח שהערך נשלח כנתון נפרד (Bound Parameter) ומונע לחלוטין הזרקת SQL." },
          { id: "b", text: "מבצע בדיקת תקינות רגקס על תוכן המחרוזת val." },
          { id: "c", text: "מחייב את המשתמש להעביר רק ערכים מספריים מטיפוס int." },
          { id: "d", text: "פועל רק אם השאילתה מבוצעת מול מסד נתונים מרוחק ולא מקומי." },
        ],
        answer: "a",
        hint: "<p>מהו תפקידם של סימני שאלה כ-placeholders בשאילתות מוכנות (Prepared Statements)?</p>",
        solution: `<p><strong>התשובה: א'.</strong> שימוש ב-placeholder (כגון <code>?</code> ב-SQLite וב-DB-API של פייתון) שולח את הערך כפרמטר קשור (Bound Parameter) הנפרד מתחביר ה-SQL. מנוע ה-DB מפרש את הערך אך ורק כנתון (Data Literal), ובכך מנוטרלת לחלוטין כל סכנה של הזרקת SQL (SQL Injection).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> מנוע ה-DB אינו מבצע סינון רגקס על הערך, אלא מתייחס אליו ישירות כערך נתונים ללא צורך בסניטציה תחבירית.</li>
<li><strong>ג' שגויה:</strong> ניתן להעביר כל טיפוס נתונים חוקי (מחרוזות, בייטים, מספרים, תאריכים), לא רק מספרים שלמים.</li>
<li><strong>ד' שגויה:</strong> SQLite הוא מסד נתונים משובץ (Embedded) מקומי, ומנגנון הפרמטרים פועל בו באופן מלא.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. מדוע נהוג להעביר קבצים ברשת במקטעים (Chunks) בגודל קבוע (למשל 1024 בתים) בלולאה?",
        options: [
          { id: "a", text: "כדי למנוע צריכת זיכרון מופרזת והצפת זיכרון של קריאת קובץ ענק בבת אחת, ולהתאים לזרימת הנתונים ב-TCP." },
          { id: "b", text: "משום שפרוטוקול IP אינו מסוגל להעביר מנות גדולות מ-1024 בתים בשום תצורה." },
          { id: "c", text: "כדי להצפין אוטומטית את תוכן הקובץ ברמת מערכת ההפעלה." },
          { id: "d", text: "משום שפונקציית recv תיכשל בזמן ריצה אם גודל החוצץ יעלה על 1024." },
        ],
        answer: "a",
        hint: "<p>מה יקרה לזיכרון של תוכנית אם ננסה לקרוא קובץ של 20 ג'יגה-בייט כולו לפקודת קריאה בודדת?</p>",
        solution: `<p><strong>התשובה: א'.</strong> חלוקת העברת קבצים למקטעים (Streaming / Chunks) מונעת טעינה של קבצים שלמים וגדולים אל זיכרון ה-RAM (מה שעלול לגרום למחסור בזיכרון וקריסת התוכנית - DoS). בנוסף, היא מתאימה לאופי זרימת המידע בשקעי TCP המעבירים נתונים כזרם בתים (Byte Stream) רציף במקטעים.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> גודל חבילת IP מוגבל על ידי ה-MTU (בדרך כלל 1500 בתים ב-Ethernet), וברמת היישום TCP מטפל בפיצול מקטעים באופן שקוף.</li>
<li><strong>ג' שגויה:</strong> קריאה במקטעים אינה מצפינה דבר; הצפנה דורשת שימוש באלגוריתמי קריפטוגרפיה (כגון AES).</li>
<li><strong>ד' שגויה:</strong> הפונקציה <code>recv</code> תומכת בגודלי חוצץ שונים בהתאם לזיכרון שהוקצה (למשל 4096, 8192 או יותר), ו-1024 הוא רק גודל בלוק מקובל.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. דריסה של מצביע ה-vtable (vptr) באובייקט C++ עקב גלישת חוצץ מאפשרת לתוקף:",
        options: [
          { id: "a", text: "להפנות את המצביע ל-vtable מזויפת ולשלוט על זרימת הבקרה (Control Flow Hijacking) בעת קריאה וירטואלית." },
          { id: "b", text: "לקרוא ישירות מכל משתנה מקומי במחסנית של פונקציות אחרות ללא הרשאה." },
          { id: "c", text: "לעקוף לחלוטין את מנגנון ה-Firewall ברשת המקומית." },
          { id: "d", text: "גרום לקומפיילר לקמפל מחדש את התוכנית בזמן ריצה." },
        ],
        answer: "a",
        hint: "<p>מה קורה כאשר האובייקט מבצע קריאה לפונקציה וירטואלית ומצביע ה-vptr שלו שונה להצביע למבנה שהוכן על ידי התוקף?</p>",
        solution: `<p><strong>התשובה: א'.</strong> כאשר מתרחשת גלישת חוצץ באובייקט והתוקף דורס את מצביע ה-vptr (היושב לרוב בתחילת האובייקט), הוא יכול לכוון אותו לטבלה מזויפת (Fake vtable) שהוכנה בזיכרון. כאשר התוכנית תבצע קריאה לפונקציה וירטואלית דרך האובייקט, המעבד יקפוץ לכתובת הזדונית שמופיעה בטבלה המזויפת, וכך התוקף משתלט על זרימת הבקרה (Control Flow Hijacking).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> דריסת vptr אינה מאפשרת כשלעצמה קריאה שרירותית של משתנים מקומיים במחסנית אלא השתלטות על ניתוב הקריאה הווירטואלית.</li>
<li><strong>ג' שגויה:</strong> פגיעה במבני זיכרון של תהליך מקומי אינה קשורה לחומת אש (Firewall) המבצעת סינון חבילות ברמת הרשת.</li>
<li><strong>ד' שגויה:</strong> הקומפיילר אינו פעיל בזמן ריצה, והתוכנית כבר מקומפלת לקוד מכונה.</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, ספר, וקובץ",
        prompt: "מילים עם pre באותיות גדולות; Book; מחלקה עם כמה סופרים; קובץ → רשימת אובייקטים.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>class Book:
    def __init__(self, title, author, year):
        self.title, self.author, self.year = title, author, year
class BookMany:
    def __init__(self, title, authors, year):
        self.title, self.authors, self.year = title, list(authors), year
# קובץ: שורה שמתחילה ב-MANY| כותרת|שנה|סופר,סופר
def load(path):
    out = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            p = line.strip().split("|")
            if p[0] == "MANY":
                out.append(BookMany(p[1], p[3].split(","), p[2]))
            else:
                out.append(Book(p[0], p[1], p[2]))
    return out</code></pre>`,
        verdictKind: "new",
        verdict: "פורמט הקובץ לא פורט בשחזור — סימן MANY ממלא \"רגיל מול כמה סופרים\".",
      },
      {
        id: "q7",
        title: "שאלה 7 · פולימורפיזם וחולשה",
        prompt: "איך עובד מצביע וירטואלי ו-vtable; הבדל וירטואלי/לא; איזו חולשה אם אפשר לכתוב לטבלה.",
        hadOfficial: false,
        official: "",
        proposed: "<p>וירטואלי: אינדקס ב-vtable של האובייקט. לא-וירטואלי: לפי טיפוס המצביע בקומפילציה. כתיבה לטבלה מחליפה את הפונקציה שתופעל — שבירת שלמות. בלי PoC.</p>",
        verdictKind: "new",
        verdict: "אין רשמי.",
        hint: "<p>חשבו איפה נשמר <code>vptr</code> בתוך האובייקט, לאן הוא מצביע, ומה קורה בזמן ריצה כשקוראים לפונקציה וירטואלית דרך מצביע לבסיס.</p>",
        solution: `<ul>
<li>לכל מחלקה עם פונקציה וירטואלית המהדר בונה <code>vtable</code> אחת, משותפת לכל המופעים. בכל אובייקט יש <code>vptr</code> — במודל הקורס בהיסט 0 — שמצביע לטבלה של המחלקה האמיתית.</li>
<li>קריאה וירטואלית היא בערך <code>obj-&gt;vptr[index]()</code>, ולכן נקבעת בזמן ריצה. בלי <code>virtual</code> הקריאה נקבעת בקומפילציה לפי טיפוס המצביע.</li>
<li>אם כתיבה מעבר לחוצץ או שימוש אחרי שחרור משחיתים את <code>vptr</code>, הקריאה הבאה הולכת למה שנשאר בזיכרון. הטבלה עצמה לרוב לקריאה בלבד; ה־<code>vptr</code> באובייקט בערימה הוא הנתון הפגיע.</li>
<li>הגנה: גבול כתיבה ובעלות ברורה (<code>std::string</code>, <code>unique_ptr</code>); שכבות — ASLR ו־CFI. <code>private</code> וקנרית המחסנית לא שומרים על <code>vptr</code> בערימה.</li>
</ul>`,
      },
      {
        id: "q8",
        title: "שאלה 8 · שליחה בחלקים ושורות ל־SQLite",
        prompt: "שרת Linux קורא קובץ ושולח מקטעים 1024 עם כותרת שם/מספר/גודל. תוכנית מעבירה שורות קובץ לטבלה (מספר + תוכן) כולל CREATE.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>/* כותרת טקסטואלית פשוטה ואז send של 1024 */
char hdr[128];
snprintf(hdr, sizeof hdr, "%s %d %d\\n", name, idx, (int)n);
send(fd, hdr, strlen(hdr), 0);
send(fd, buf, n, 0);

import sqlite3
con = sqlite3.connect("out.db")
con.execute("CREATE TABLE IF NOT EXISTS lines(id INTEGER, body TEXT)")
with open("in.txt", encoding="utf-8") as f:
    for i, line in enumerate(f, 1):
        con.execute("INSERT INTO lines VALUES(?, ?)", (i, line.rstrip("\\n")))
con.commit()</code></pre>`,
        verdictKind: "new",
        verdict: "אין רשמי. פרמטרים ב-INSERT.",
      },
      {
        id: "q9",
        title: "שאלה 9 · אין שחזור אמין",
        prompt: "במחברות הסעיף ריק.",
        hadOfficial: false,
        official: "",
        proposed: "<p>אין פתרון מוצע.</p>",
        verdictKind: "new",
        verdict: "אין שחזור לשאלה הזו.",
      },
    ],
  },
  {
    id: "e-2024-09-61",
    title: "סימולציה · 19.9.2024 שאלון 61",
    minutes: 180,
    pick: 3,
    note: "שאלון מודפס. חלק א מלא. שאלה 9 בלי ניצול.",
    partA: [
      {
        id: "a1",
        prompt: "מהן חולשות CVE?",
        options: [
          { id: "a", text: "חולשות שהתגלו בתוכנת VPN בשם CVE." },
          { id: "b", text: "חולשות מוכרות בארגון מניסיון קודם באותו ארגון." },
          { id: "c", text: "חולשות מוכרות בארגון הקשורות לתוכנות שהוא משתמש בהן." },
          { id: "d", text: "חולשות אבטחה המקוטלגות במאגר ציבורי בשם CVE." },
        ],
        answer: "d",
        hint: "<p>מהם ראשי התיבות של CVE (Common Vulnerabilities and Exposures) ואיזה סוג מאגר הוא מהווה עבור קהילת האבטחה העולמית?</p>",
        solution: `<p><strong>התשובה: ד'.</strong> מילון ה-CVE (Common Vulnerabilities and Exposures) הוא מאגר ציבורי עולמי סטנדרטי המספק מזהה ייחודי, תיאור ומידע על חולשות אבטחה ידועות בתוכנות ובחומרות לצורך שיתוף מידע ותיאום הגנה בתעשייה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> CVE אינו מוצר VPN ספציפי אלא תקן ומאגר מידע עולמי לחולשות אבטחה.</li>
<li><strong>ב' שגויה:</strong> חולשות פנימיות של ארגון מסוים אינן ההגדרה של CVE; CVE הוא מאגר גלובלי ופומבי.</li>
<li><strong>ג' שגויה:</strong> הגדרה זו מתארת ניהול סיכונים ארגוני של מלאי תוכנה, אך CVE עצמו מקיף חולשות בכלל התוכנות והפלטפורמות בעולם, ללא קשר לארגון יחיד.</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "מה גורם ליצירת חריגה (Exception) בפייתון?",
        options: [
          { id: "a", text: "פקודת raise שזורקת חריגה." },
          { id: "b", text: "שגיאה בהפעלת התכנית שיוצרת מצב לא צפוי." },
          { id: "c", text: "פקודת assert שהתנאי שלה לא מתמלא." },
          { id: "d", text: "כל התשובות נכונות." },
        ],
        answer: "d",
        hint: "<p>האם חריגות בפייתון נוצרות רק באופן יזום בקוד (raise, assert) או גם בעקבות שגיאות זמן ריצה של המפרש (כמו חלוקה באפס או חריגה מגבולות)?</p>",
        solution: `<p><strong>התשובה: ד'.</strong> כל האפשרויות מייצרות חריגות בפייתון: קוד יכול להעלות חריגה באופן מפורש באמצעות <code>raise</code>, המפרש מייצר חריגה בזמן ריצה בעת שגיאה או מצב בלתי צפוי (כגון <code>ZeroDivisionError</code> או <code>IndexError</code>), ופקודת <code>assert</code> שאינה מתקיימת זורקת חריגת <code>AssertionError</code>.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א', ב' ו-ג' חלקיות:</strong> כל אחת מהן אכן גורמת ליצירת חריגה, ולכן התשובה הכוללת והמלאה היא ד' ("כל התשובות נכונות").</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "Basic::tweet וירטואלית נקראת מבנאי Basic. Derived דורס. Basic* p = new Derived(). מה יודפס?",
        options: [
          { id: "a", text: "Basic::tweet()" },
          { id: "b", text: "Derived::tweet()" },
          { id: "c", text: "Basic::tweet() ואז Derived::tweet()" },
          { id: "d", text: "תלוי בקומפיילר, אי אפשר לדעת." },
        ],
        answer: "a",
        hint: "<p>מה קורה לקריאות וירטואליות מתוך בנאי (Constructor) ב-C++? האם האובייקט הנגזר כבר נבנה כאשר בנאי מחלקת הבסיס רץ?</p>",
        solution: `<p><strong>התשובה: א'.</strong> ב-C++, כאשר בנאי של מחלקת בסיס (Basic) רץ, האובייקט הנגזר (Derived) עדיין לא אותחל ושדותיו עדיין אינם קיימים בזיכרון. לכן, מצביע ה-vptr מכוון זמנית ל-vtable של מחלקת הבסיס בלבד. קריאה לפונקציה וירטואלית מתוך בנאי הבסיס תפעיל תמיד את המימוש של הבסיס (Basic::tweet), ולא תופנה למחלקה הנגזרת.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> הפעלת המימוש של Derived אינה מתרחשת ב-C++ בתוך בנאי הבסיס, כדי למנוע גישה לשדות של הנגזר שטרם אותחלו (בשונה למשל מג'אווה שבה הכלל שונה).</li>
<li><strong>ג' שגויה:</strong> אין קריאה כפולה; מבוצעת קריאה בודדת לפונקציה שנקראה, והיא של הבסיס.</li>
<li><strong>ד' שגויה:</strong> התנהגות זו מוגדרת היטב בתקן C++ (סדר בנייה דטרמיניסטי) ואינה תלויה במימוש הקומפיילר.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "Frog f1(5); Frog *p1 = &f1; איפה הם נשמרים?",
        options: [
          { id: "a", text: "f1 במחסנית, p1 בערמה." },
          { id: "b", text: "שניהם בערמה." },
          { id: "c", text: "שניהם במחסנית." },
          { id: "d", text: "p1 במחסנית, f1 בערמה." },
        ],
        answer: "c",
        hint: "<p>האם מופיע בקטע הקוד <code>new</code> או <code>malloc</code>? היכן מוקצים משתנים מקומיים רגילים?</p>",
        solution: `<p><strong>התשובה: ג'.</strong> שני המשתנים <code>f1</code> (אובייקט מסוג Frog) ו-<code>p1</code> (משתנה מצביע מסוג Frog*) מוגדרים כמשתנים מקומיים אוטומטיים בפונקציה, ולכן שניהם מוקצים במסגרת המחסנית (Stack Frame).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' ו-ב' שגויות:</strong> הקצאה בערימה מתבצעת אך ורק כאשר מבוצעת הקצאה דינמית מפורשת עם <code>new</code> או <code>malloc</code>. היות ש-<code>f1</code> הוא משתנה אוטומטי, הוא יושב במחסנית.</li>
<li><strong>ד' שגויה:</strong> <code>f1</code> אינו בערימה; <code>p1</code> מצביע על כתובת במחסנית של <code>f1</code>, והמצביע <code>p1</code> עצמו שמור גם הוא במחסנית.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "אורך כתובת IPv4 מול IPv6?",
        options: [
          { id: "a", text: "32 מול 64 סיביות." },
          { id: "b", text: "32 מול 128 סיביות." },
          { id: "c", text: "48 בשניהם." },
          { id: "d", text: "64 מול 128 סיביות." },
        ],
        answer: "b",
        hint: "<p>כמה בתים יש בכתובת IPv4 (למשל 192.168.1.1) וכמה בתים יש בכתובת IPv6 (16 בתים)?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> כתובת פרוטוקול IPv4 היא באורך 32 סיביות (4 בתים, 4 מספרים עשרוניים בטווח 0–255), בעוד כתובת פרוטוקול IPv6 הורחבה לאורך של 128 סיביות (16 בתים, 8 קבוצות הקסדצימליות).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> 64 סיביות אינו הגודל של כתובת IPv6 אלא רק של ה-Interface Identifier (המחצית הנמוכה).</li>
<li><strong>ג' שגויה:</strong> 48 סיביות הוא הגודל של כתובת MAC בשכבת הקישור (שכבה 2), ולא של כתובת IP בשכבת הרשת.</li>
<li><strong>ד' שגויה:</strong> כתובת IPv4 היא בת 32 סיביות, לא 64.</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · Book, מילון, וחריגה",
        prompt: "Book עם מחרוזות (שם, מחבר, שפה) ומספרים (קטלוג, מחיר, שנה) ובדיקת טיפוסים. מילון books לפי קטלוג. BookDataError. Buy לפי שם+מחבר או קטלוג.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>class BookDataError(Exception):
    pass

class Book:
    def __init__(self, name, author, lang, cat, price, year):
        if not all(isinstance(x, str) for x in (name, author, lang)):
            raise BookDataError("strings")
        if not isinstance(cat, int) or not isinstance(year, int):
            raise BookDataError("ints")
        if isinstance(price, bool) or not isinstance(price, (int, float)):
            raise BookDataError("price")
        self.name, self.author, self.lang = name, author, lang
        self.cat, self.price, self.year = cat, price, year

books = {}

def buy(name=None, author=None, cat=None):
    if cat is not None:
        b = books.get(cat)
        if b is None:
            raise BookDataError("unknown catalog")
        return b
    for b in books.values():
        if b.name == name and b.author == author:
            return b
    raise BookDataError("no match")</code></pre>`,
        verdictKind: "new",
        verdict: "אין פתרון רשמי מצורף. bool הוא תת-טיפוס של int, ולכן מחיר נבדק בנפרד.",
      },
      {
        id: "q7",
        title: "שאלה 7 · קנרית מול CET",
        prompt: "השוו קנרית המחסנית ו-CET: מטרה, פעולה, תוכנה או חומרה, ולאילו חולשות כל מנגנון עונה.",
        hadOfficial: false,
        official: "",
        proposed: "<p>שניהם אפחות מול דריסת כתובת חזרה, לא תיקון של העתקה בלי גבול. קנרית: ערך סודי בין המקומיים לכתובת החזרה, נבדק לפני ret, בתוכנה (המהדר). CET / מחסנית צל: עותק מוגן של כתובת החזרה, השוואה ב-ret, בחומרה עם תמיכת המהדר. קנרית לא שומרת על vptr בערימה. CET לא מונע גלישת ערימה.</p>",
        verdictKind: "new",
        verdict: "ההבחנה: קנרית היא בדיקת ערך בתוכנה; CET הוא מעקב חומרתי אחרי כתובות חזרה.",
      },
      {
        id: "q8",
        title: "שאלה 8 · ערוץ משותף ושליחת קובץ",
        prompt: "האם אפשרי: לקוח C++ מול שרת פייתון; לקוח IPv6 מול שרת IPv4; לקוח RSA מול שרת AES. אחר כך: input.txt אל 8.8.8.8, חבילה עד 64K סיביות.",
        hadOfficial: false,
        official: "",
        proposed: `<p>אפשר כשהפרוטוקול זהה, בלי תלות בשפה או ב-IDE. IPv6 מול IPv4 לא ישירות; צריך תרגום (gateway / NAT64). RSA ו-AES אינם מתחלפים לבד: צריך הסכמה על האלגוריתם.</p>
<pre class="code" dir="ltr"><code>#include &lt;arpa/inet.h&gt;
#include &lt;stdio.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;unistd.h&gt;
enum { CHUNK = 8192 }; /* 64K bits */
int main(void) {
  FILE *f = fopen("input.txt", "rb");
  if (!f) return 1;
  int s = socket(AF_INET, SOCK_STREAM, 0);
  struct sockaddr_in a = {0};
  a.sin_family = AF_INET;
  a.sin_port = htons(80);
  inet_pton(AF_INET, "8.8.8.8", &amp;a.sin_addr);
  if (connect(s, (struct sockaddr *)&amp;a, sizeof a) &lt; 0) return 1;
  char buf[CHUNK];
  size_t n;
  while ((n = fread(buf, 1, CHUNK, f)) &gt; 0)
    if (send(s, buf, n, 0) &lt; 0) break;
  fclose(f);
  close(s);
}</code></pre>`,
        verdictKind: "new",
        verdict: "הפורט לא נקוב בשאלון. 64K סיביות הן 8192 בתים, לא 64K בתים.",
      },
      {
        id: "q9",
        title: "שאלה 9 · אורך לפני calloc",
        prompt: "read_string קורא אורך מהשקע, ntohl, ואז calloc(length+2). מה נשבר, ואיך מתקנים? בלי מתכון ניצול.",
        hadOfficial: false,
        official: "",
        proposed: "<p>אחרי המרה לסדר המכונה, <code>length + 2</code> יכול להיעטף אם האורך קרוב לקצה של <code>size_t</code>. <code>calloc</code> מקצה מעט, והקריאה עדיין לפי האורך המקורי. בקטע המודפס חסר גם פסיק, והסיום כתוב כקריאה ולא כאינדקס. התיקון: לדחות אורך לפני החיבור (<code>length &gt; SIZE_MAX - 2</code> או תקרה קבועה), ורק אז להקצות.</p>",
        verdictKind: "new",
        verdict: "השאלון ביקש גם ניצול. באתר נשאר מה נשבר והבדיקה שלפני החיבור.",
      },
    ],
  },
  {
    id: "e-2025a-12-2",
    title: "סימולציה · 2025א 12.2",
    minutes: 180,
    pick: 3,
    note: "מהזיכרון: range, פייתון, קנרית, לקוח עם כותרת, ושרת. שאר האמריקאיות אינן ניסוח המועד — האפשרויות לא שוחזרו.",
    partA: [
      {
        id: "a1",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. בזיכרון נשמר רק ניסוח אחד על DEP, בלי שאר האפשרויות. מה DEP מונע?",
        options: [
          { id: "a", text: "כל כתיבה או שינוי של נתונים במחסנית או בערימה." },
          { id: "b", text: "את עצם גלישת החוצץ הפיזית מעבר לגבולות המערך." },
          { id: "c", text: "זליגת כתובות זיכרון של פונקציות מערכת (Info Leak)." },
          { id: "d", text: "הרצת קוד (ביצוע פקודות מעבד) מתוך אזורי זיכרון המסומנים כנתונים בלבד." },
        ],
        answer: "d",
        hint: "<p>מה מסמן ביט ה-NX (No-Execute) בדפי הזיכרון של המחסנית והערימה, ואיזה ניסיון של התוקף הוא מכשיל?</p>",
        solution: `<p><strong>התשובה: ד'.</strong> מנגנון DEP / NX (Data Execution Prevention / No-Execute bit) מסמן דפי זיכרון המיועדים לנתונים (כגון המחסנית והערימה) כדפים שאינם ניתנים להרצה. אם המעבד מנסה לטעון את מונה הפקודות (EIP/RIP) מתוך כתובת באזורים אלו (למשל כדי להריץ Shellcode שהוזרק לחוצץ), נזרקת שגיאת הרשאת גישה (Segmentation Fault) והתוכנית מופסקת מיידית.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> המחסנית והערימה חייבות להישאר קריאות וכתיבות (Read/Write) כדי שהתוכנית תוכל לעבוד; DEP מונע הרצה (Execute) בלבד.</li>
<li><strong>ב' שגויה:</strong> DEP אינו מונע את פעולת הגלישה עצמה — הכתיבה מעבר לגבולות עדיין מתרחשת ודורסת נתונים, אלא שהרצת קוד מתוך המחסנית תיחסם.</li>
<li><strong>ג' שגויה:</strong> מניעת זליגת כתובות אינה קשורה ל-DEP, ו-DEP גם אינו מגן בפני מתקפות שאינן מריצות קוד מהמחסנית (כמו Return-Oriented Programming / ROP ו-Return-to-libc).</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. בזיכרון יש תיאור של קריאה מבנאי, בלי השאלה עצמה. קריאה וירטואלית מתוך בנאי הבסיס, כשהנגזר דורס אותה, מגיעה ל:",
        options: [
          { id: "a", text: "מימוש מחלקת הבסיס, כיוון שבזמן ריצת בנאי הבסיס האובייקט הנגזר טרם אותחל." },
          { id: "b", text: "תמיד למימוש המחלקה הנגזרת, כי הזיכרון הוקצה עבור הנגזר." },
          { id: "c", text: "לשגיאת קומפילציה, כי אסור לקרוא לפונקציה וירטואלית מבנאי." },
          { id: "d", text: "שתי הגרסאות מופעלות בזו אחר זו בסדר היררכי." },
        ],
        answer: "a",
        hint: "<p>ב-C++, איזה vtable תקף בזמן שרץ הבנאי של מחלקת הבסיס?</p>",
        solution: `<p><strong>התשובה: א'.</strong> ב-C++, בעת הרצת בנאי מחלקת הבסיס, האובייקט עדיין מוגדר כשייך למחלקת הבסיס (המצביע <code>vptr</code> מכוון ל-vtable של הבסיס). הסיבה היא ששדות המחלקה הנגזרת עדיין לא אותחלו, והפעלת מתודה של הנגזר עלולה לגשת לזיכרון בלתי מאותחל. לכן הקריאה מגיעה תמיד למימוש הבסיס.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ב' שגויה:</strong> הפעלת המימוש של הנגזר לא תתרחש ב-C++ (בשונה מג'אווה שבה הכלל שונה), שכן C++ מקפידה על בטיחות אתחול מלאה לפי סדר היררכיית הירושה.</li>
<li><strong>ג' שגויה:</strong> התחביר חוקי ומתקמפל לחלוטין (אם כי מוגדר לעיתים כ-Code Smell עקב בלבול אפשרי).</li>
<li><strong>ד' שגויה:</strong> אין שרשור אוטומטי של פונקציות וירטואליות; נקרא אך ורק המימוש היחיד של הבסיס.</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "range(50, 60) מחזיר:",
        options: [
          { id: "a", text: "list" },
          { id: "b", text: "tuple" },
          { id: "c", text: "range" },
          { id: "d", text: "set" },
        ],
        answer: "c",
        hint: "<p>בפייתון 3 (בשונה מפייתון 2 שבה הוחזרה רשימה), איזה אובייקט איטרבילי עצמאי מחזירה הפונקציה <code>range</code>?</p>",
        solution: `<p><strong>התשובה: ג'.</strong> בפייתון 3, הקריאה <code>range(50, 60)</code> מחזירה אובייקט מסוג <code>range</code> (סוג נתונים איטרבילי עצמאי שמייצר ערכים לפי דרישה באופן עצל - Lazy Evaluation, בצריכת זיכרון קבועה O(1)).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> בפייתון 2 פונקציית <code>range</code> החזירה <code>list</code>, אך בפייתון 3 היא מייצרת אובייקט <code>range</code> ייעודי; כדי לקבל רשימה יש להמיר מפורשות: <code>list(range(...))</code>.</li>
<li><strong>ב' שגויה:</strong> טאפל נוצר באמצעות סוגריים עגולים או <code>tuple()</code>, לא על ידי <code>range</code>.</li>
<li><strong>ד' שגויה:</strong> קבוצה (set) נוצרת באמצעות סוגריים מסולסלים או <code>set()</code>, ללא סדר וללא כפילויות.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. אפשרויות ההפניה בזיכרון סומנו כלא מדויקות. הפניה (reference) ב-C++ למחרוזת קיימת s1 נכתבת:",
        options: [
          { id: "a", text: "std::string a = s1; (זו העתקה של המחרוזת)" },
          { id: "b", text: "std::string &a = s1;" },
          { id: "c", text: "std::string *a = &s1; (זה מצביע ולא הפניה)" },
          { id: "d", text: "std::string &a = &s1; (שגיאת קומפילציה עקב אי-התאמת טיפוסים)" },
        ],
        answer: "b",
        hint: "<p>מהו התחביר ב-C++ להגדרת משתנה ייחוס/הפניה (Reference), המחייב קידומת <code>&amp;</code> לצד הטיפוס והשמת האובייקט עצמו ללא אופרטור כתובת?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> ב-C++, הגדרת הפניה (Reference) נעשית באמצעות הסימן <code>&amp;</code> הצמוד לטיפוס בעת ההגדרה, והשמה ישירה של האובייקט המקורי: <code>std::string &amp;a = s1;</code>. כעת <code>a</code> מהווה כינוי (Alias) ישיר ל-<code>s1</code> וכל פעולה עליו מתבצעת על האובייקט המקורי.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> זוהי יצירת משתנה חדש והעתקת ערך (Copy Constructor) של <code>s1</code>, ולא הפניה.</li>
<li><strong>ג' שגויה:</strong> זוהי הגדרת מצביע (Pointer) המחזיק את כתובת הזיכרון של המחרוזת (דורש שימוש באופרטור <code>-&gt;</code> או <code>*a</code> לגישה), ולא הפניה.</li>
<li><strong>ד' שגויה:</strong> ביטוי זה אינו מתקמפל כיוון ש-<code>&amp;s1</code> מחזיר מצביע (<code>std::string*</code>) בעוד ש-<code>a</code> מוגדר כהפניה לאובייקט (<code>std::string&amp;</code>).</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "השאלה אינה מהמועד המקורי אלא נוספה לסימולציה בלבד. משפט האפחות בזיכרון לא שלם. אפחות (Mitigation) היא:",
        options: [
          { id: "a", text: "מערכת הפועלת ללא שום באגים או פרצות אבטחה." },
          { id: "b", text: "דרישה להצפנה מלאה בלבד של כלל תעבורת הרשת בארגון." },
          { id: "c", text: "מנגנון הגנה שמטרתו לצמצם את ההשפעה או הנזק הפוטנציאלי מתקיפה ולמנוע את הצלחת הניצול." },
          { id: "d", text: "פעולת הניצול הזדוני המבוצעת על ידי תוקף כנגד חולשה ידועה." },
        ],
        answer: "c",
        hint: "<p>אפחות אינה מנסה להבטיח עולם תיאורטי נטול תקלות, אלא להגן בפועל על המערכת מפני נזקי התקיפה.</p>",
        solution: `<p><strong>התשובה: ג'.</strong> אפחות (Mitigation) מוגדרת כאמצעי בקרה, תכנון או מנגנון אבטחה שמטרתו להפחית את חומרת הנזק, לצמצם את מרחב התקיפה (Attack Surface) או להקשות באופן משמעותי על ניצול מוצלח של חולשות קיימות (דוגמת הגבלת הרשאות, ASLR, קנרית מחסנית וסינון עומסים).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> מערכת נקייה לחלוטין מבאגים אינה יעד מציאותי; אפחות נועדה להגן על המערכת מתוך הנחת עבודה שבאגים תמיד עשויים להימצא.</li>
<li><strong>ב' שגויה:</strong> הצפנה היא רק כלי הגנה נקודתי אחד ואינה מכסה את המושג הרחב של אפחות (הכולל מנגנוני בידוד תהליכים, מניעת גלישות, הגבלת משאבים ועוד).</li>
<li><strong>ד' שגויה:</strong> זוהי הגדרת הניצול (Exploit / Attack), ההפך הגמור מאפחות.</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · im, קובץ, ו-HPBook",
        prompt: "מילים מופרדות בפסיק שמתחילות ב-im: אות ראשונה גדולה והשאר קטנות. קובץ שורה-שורה לקובץ אחר. Book ו-HPBook; בלי ארגומנטים mainChar הוא harry, hermione, Ron.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>def im_words(s):
    if not isinstance(s, str):
        raise ValueError("expected str")
    out = []
    for raw in s.split(","):
        w = raw.strip()
        if w.lower().startswith("im") and w:
            out.append(w[0].upper() + w[1:].lower())
    return out

def convert(src, dst):
    try:
        with open(src, encoding="utf-8") as inf, open(dst, "w", encoding="utf-8") as out:
            for line in inf:
                out.write(",".join(im_words(line)) + "\\n")
    except OSError as e:
        print("file:", e)

class Book:
    def __init__(self, title, author, year):
        self.title, self.author, self.year = title, author, year

class HPBook(Book):
    def __init__(self, title="Harry Potter", author="Rowling", year=1997, mainChar=None):
        super().__init__(title, author, year)
        self.mainChar = ["harry", "hermione", "Ron"] if mainChar is None else mainChar</code></pre>`,
        verdictKind: "new",
        verdict: "הזיכרון לא קובע אם מסננים רק מילות im. כאן כמו הדפוס של מועד ג: נשארות המילים שמתחילות ב-im.",
      },
      {
        id: "q8",
        title: "שאלה 8 · קנרית המחסנית",
        prompt: "למה נוצרה, איך פועלת, מחסנית עם ובלי, ומנגנון נוסף מול אותה בעיה.",
        hadOfficial: false,
        official: "",
        proposed: "<p>נוצרה כי העתקה בלי גבול מגיעה לכתובת החזרה. ערך סודי נשתל לפניה ונבדק לפני ret. בלי קנרית: מקומיים, מסגרת שמורה, כתובת חזרה. עם קנרית: מקומיים, קנרית, מסגרת, כתובת חזרה. נוסף: ASLR או NX/DEP. הקנרית לא מתקנת את ההעתקה.</p>",
        verdictKind: "new",
        verdict: "אין שרטוט רשמי. הסדר הוא של מודל הקורס.",
      },
      {
        id: "q9",
        title: "שאלה 9 · קובץ, כותרת 12 בתים, וארגז חול",
        prompt: "לקוח פייתון שולח קובץ. כותרת: size, packet number, number of packets — 4 בתים כל אחד, big-endian. מטען עד 1024. שגיאה מסודרת אם הקובץ לא נפתח. מה ארגז חול ומה המטרה.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>import socket, struct
def send_file(host, port, path):
    try:
        data = open(path, "rb").read()
    except OSError as e:
        print("cannot open:", e)
        return
    step = 1024
    n = max(1, (len(data) + step - 1) // step)
    s = socket.socket()
    try:
        s.connect((host, port))
        for i in range(n):
            chunk = data[i * step:(i + 1) * step]
            hdr = struct.pack("!III", len(chunk), i + 1, n)
            s.sendall(hdr + chunk)
    except OSError as e:
        print("net:", e)
    finally:
        s.close()</code></pre>
<p>ארגז חול מריץ קוד לא מהימן עם הרשאות וממשקים מצומצמים, כדי שכשל לא יהפוך לשליטה במערכת. מימוש עקרוני: תהליך נפרד, משתמש חלש, בלי רשת אם לא צריך.</p>`,
        verdictKind: "new",
        verdict: "הזיכרון לא קובע אם size הוא גודל המטען או גודל הקובץ. כאן גודל המטען.",
      },
      {
        id: "q10",
        title: "שאלה 10 · שרת שמקבל את אותה כותרת",
        prompt: "שרת C++ שמקבל את הודעות שאלה 9. מה להחזיר ללקוח לא זכור.",
        hadOfficial: false,
        official: "",
        proposed: "<p>קוראים 12 בתים, מפרשים שלושה <code>uint32_t</code> בסדר רשת, ואז קוראים בדיוק את גודל המטען שאושר (לכל היותר 1024). אין תשובה משוחזרת ללקוח, ולכן לא ממציאים פורמט תגובה.</p>",
        verdictKind: "new",
        verdict: "סעיף התגובה חסר בזיכרון.",
      },
    ],
  },
  {
    id: "sim-style-a",
    title: "סימולצייה שלוקטה באמצעות AI",
    minutes: 180,
    pick: 3,
    note: "אותם תפקידי שאלות כמו במבחן לדוגמה א': חלק א על לכידות, העמסה, הסתרה בפייתון, גלישה וחוטים. חלק ב: לקוח TCP, הצפנה היברידית, טבלה וירטואלית, ופייתון על מילון וקובץ. הניסוח חדש, מהחומר שבסבבי השאלות.",
    partA: [
      {
        id: "a1",
        prompt: "מחלקה אחת מחשבת מחיר, פותחת שקע, ובונה HTML. מה נמדד כאן?",
        options: [
          { id: "a", text: "לכידות חזקה: כל המתודות באותה מחלקה." },
          { id: "b", text: "לכידות חלשה: רכיבים באותה מחלקה לא משרתים אחריות אחת." },
          { id: "c", text: "צמידות חלשה בין מחלקות שונות." },
          { id: "d", text: "צמידות הדוקה: תלות ישירה בין מודולים שונים במערכת." },
        ],
        answer: "b",
        hint: "<p>מה ההבדל בין לכידות (Cohesion - פנימי למחלקה) לבין צמידות (Coupling - בין מחלקות)?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> לכידות (Cohesion) מתארת את מידת המיקוד של מחלקה או מודול באחריות לוגית בודדת (Single Responsibility Principle). כאשר מחלקה אחת מבצעת משימות בלתי קשורות (חישוב עסקי, תקשורת רשת, ורינדור תצוגה), הלכידות שלה היא חלשה (Low Cohesion), מה שפוגע בתחזוקתיות, בבדיקות ובשימוש חוזר.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> לכידות חזקה (High Cohesion) מתקיימת רק כאשר כל המתודות והשדות במחלקה משרתים מטרה אחת ממוקדת ומגובשת היטב.</li>
<li><strong>ג' ו-ד' שגויות:</strong> צמידות (Coupling) עוסקת ברמת התלות ההדדית בין רכיבים או מודולים נפרדים, ולא במבנה התפקידים הפנימי בתוך מחלקה בודדת.</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "איזו זוג חתימות היא העמסה (overloading) ב-C++?",
        options: [
          { id: "a", text: "void f(int) ו-int f(int). רק טיפוס החזרה שונה." },
          { id: "b", text: "void f(int) ו-void f(double)." },
          { id: "c", text: "שתי הגדרות void f(int) באותו תחום." },
          { id: "d", text: "פונקציה וירטואלית במחלקת בסיס ודריסתה בנגזרת." },
        ],
        answer: "b",
        hint: "<p>מה נדרש כדי שהעמסת פונקציות (Function Overloading) תהיה תקפה ב-C++ — האם די בשינוי טיפוס ההחזרה, או שרשימת הפרמטרים חייבת להיות שונה?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> ב-C++, העמסת פונקציות (Overloading) מחייבת שהפונקציות ייבדלו ברשימת הפרמטרים שלהן (מספר הפרמטרים, סוגיהם או סדרם). החתימות <code>void f(int)</code> ו-<code>void f(double)</code> נבדלות בטיפוס הפרמטר, ולכן מהוות העמסה תקינה לחלוטין.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> שינוי טיפוס ההחזרה בלבד אינו מספיק להעמסה, ויוביל לשגיאת קומפילציה עקב חתימות פרמטרים זהות שאינן ניתנות להכרעה בקריאה.</li>
<li><strong>ג' שגויה:</strong> שתי הגדרות זהות לחלוטין באותו תחום מהוות הגדרה כפולה (Redefinition Error).</li>
<li><strong>ד' שגויה:</strong> דריסת פונקציה וירטואלית במחלקה נגזרת היא דריסה (Overriding), ולא העמסה (Overloading).</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "בפייתון, obj._Point__x אחרי שדה בשם __x:",
        options: [
          { id: "a", text: "שגיאת קומפילציה כמו private ב-C++." },
          { id: "b", text: "הגישה נחסמת בזמן ריצה על ידי מנגנון הרשאות פנימי." },
          { id: "c", text: "הגישה מצליחה: שני קווים תחתיים מפעילים שינוי שם (Name Mangling) בלבד." },
          { id: "d", text: "זה protected של C++." },
        ],
        answer: "c",
        hint: "<p>מה עושה מנגנון ה-Name Mangling בפייתון לשדות המתחילים בשני קווים תחתיים (כמו <code>__x</code>), והאם הוא מונע גישה פיזית?</p>",
        solution: `<p><strong>התשובה: ג'.</strong> בפייתון אין הרשאות גישה אמיתיות ברמת השפה כמו <code>private</code> ב-C++. כאשר שדה מוגדר עם שני קווים תחתיים (כמו <code>__x</code>), המפרש מבצע עיוות שם (Name Mangling) ומשנה את שמו הפנימי ל-<code>_ClassName__x</code> (למשל <code>_Point__x</code>) כדי למנוע דריסות מקריות בירושה. ניתן לגשת לשדה זה ישירות ולקרוא אותו ללא שום שגיאה.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> פייתון אינה שפה מקומפלת סטטית ואינה מייצרת שגיאות קומפילציה על הרשאות גישה.</li>
<li><strong>ב' שגויה:</strong> המפרש אינו חוסם את הגישה לשם המעוות <code>_Point__x</code> בזמן ריצה.</li>
<li><strong>ד' שגויה:</strong> ב-C++ שדה <code>protected</code> נגיש רק למחלקות יורשות, בעוד בפייתון הגישה לשם המעוות אפשרית מכל מקום.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "גלישת חוצץ (Buffer Overflow) יכולה להתרחש:",
        options: [
          { id: "a", text: "רק במחסנית, ליד כתובת חזרה." },
          { id: "b", text: "רק בערימה." },
          { id: "c", text: "רק במקטע הקוד (Text)." },
          { id: "d", text: "בכל אזור שאליו כותבים מעבר לגודל שהוקצה." },
        ],
        answer: "d",
        hint: "<p>האם באג של כתיבה ללא בדיקת גבולות מוגבל רק למחסנית, או שהוא יכול לקרות גם במערך שהוקצה ב-malloc או במשתנה גלובלי?</p>",
        solution: `<p><strong>התשובה: ד'.</strong> גלישת חוצץ (Buffer Overflow) היא פגם כללי בניהול זיכרון שבו תוכנית כותבת נתונים מעבר לגבולות המוקצים של החוצץ. תופעה זו יכולה להתרחש במחסנית (Stack-based Overflow), בערימה (Heap-based Overflow) ובמקטע הנתונים הגלובלי/סטטי (BSS/Data Segment Overflow).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> גלישת מחסנית היא רק סוג אחד של גלישה; גלישות ערימה נפוצות לא פחות (Heap Corruption).</li>
<li><strong>ב' שגויה:</strong> גלישה אינה מוגבלת לערימה בלבד.</li>
<li><strong>ג' שגויה:</strong> מקטע הקוד (Text) מסומן בדרך כלל לקריאה ולהרצה בלבד (Read-Only), וניסיון כתיבה אליו יוביל מיד לשגיאת Segmentation Fault.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "שני חוטים באותו תהליך:",
        options: [
          { id: "a", text: "מרחב כתובות נפרד לכל חוט." },
          { id: "b", text: "ערימה וקבצים משותפים; מחסנית ורגיסטרים נפרדים." },
          { id: "c", text: "עותק נפרד של התוכנית." },
          { id: "d", text: "גם המחסנית משותפת, ולכן אין מרוץ." },
        ],
        answer: "b",
        hint: "<p>מה משותף לכל החוטים בתהליך (זיכרון ומשאבים) ומה חייב להיות פרטי לכל חוט כדי שיוכל לבצע קוד עצמאי?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> חוטים (Threads) בתוך אותו תהליך פועלים באותו מרחב כתובות וירטואלי, ולכן חולקים את הערימה (Heap), את קוד התוכנית (Text), את המשתנים הגלובליים ואת מתארי הקבצים הפתוחים. עם זאת, לכל חוט יש מסלול ריצה עצמאי, ולכן לכל חוט יש מחסנית פרטית (Private Stack), מונה פקודות (PC) ורגיסטרים ייעודיים משלו.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' ו-ג' שגויות:</strong> מרחב כתובות נפרד ועותק זיכרון נפרד מאפיינים תהליכים נפרדים (Processes), לא חוטים באותו תהליך.</li>
<li><strong>ד' שגויה:</strong> המחסנית לעולם אינה משותפת בין חוטים (שיתוף מחסנית היה משבש את רצף הקריאות והחזרות של הפונקציות); בנוסף, עקב השיתוף של הערימה והמשתנים הגלובליים, נדרש סנכרון למניעת תנאי מרוץ (Race Conditions).</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · לקוח TCP",
        prompt: "כתבו לקוח C/C++ ללינוקס שמתחבר ל-10.1.2.3 בפורט 9000, שולח את השורה PING ואז קורא עד 64 בתים או עד תו שורה, המוקדם, ומדפיס.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>#include &lt;arpa/inet.h&gt;
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;sys/socket.h&gt;
#include &lt;unistd.h&gt;
int main(void) {
  int s = socket(AF_INET, SOCK_STREAM, 0);
  if (s &lt; 0) return 1;
  struct sockaddr_in a;
  memset(&amp;a, 0, sizeof a);
  a.sin_family = AF_INET;
  a.sin_port = htons(9000);
  if (inet_pton(AF_INET, "10.1.2.3", &amp;a.sin_addr) != 1) return 1;
  if (connect(s, (struct sockaddr *)&amp;a, sizeof a) &lt; 0) return 1;
  const char *msg = "PING\\n";
  if (send(s, msg, strlen(msg), 0) &lt; 0) return 1;
  char buf[65];
  ssize_t n = recv(s, buf, 64, 0);
  if (n &lt; 0) return 1;
  buf[n] = 0;
  for (ssize_t i = 0; i &lt; n; i++) if (buf[i] == '\\n') { buf[i + 1] = 0; break; }
  fputs(buf, stdout);
  close(s);
}</code></pre>`,
        verdictKind: "new",
        verdict: "אותו דפוס כמו מבחן לדוגמה א': שקע TCP, htons, שליחה, וקריאה חסומה. הכתובת והטקסט כאן אחרים.",
      },
      {
        id: "q7",
        title: "שאלה 7 · מפתח ציבורי והיברידי",
        prompt: "תארו הצפנה במפתח ציבורי ואת מגבלותיה, ואז את הסכמה ההיברידית: איך עובר המפתח ובמה מוצפנים הנתונים אחר כך.",
        hadOfficial: false,
        official: "",
        proposed: "<p>למפתח ציבורי יש זוג: פומבי מצפין, פרטי מפענח. זה איטי, ומפתח פומבי בלי אימות ניתן להחלפה בדרך (MITM). בסכמה ההיברידית מעבירים מפתח סימטרי בעזרת המפתח הפומבי, ואחר כך מצפינים את הנתונים בסימטרי. אימות המפתח הפומבי נעשה בתעודה מול סמכות סרטיפיקטים (Certificate Authority).</p>",
        verdictKind: "new",
        verdict: "המודל הוא של מבחן לדוגמה א' ושל יחידה 5. בלי תעודה, שלב העברת המפתח חשוף.",
      },
      {
        id: "q8",
        title: "שאלה 8 · טבלה וירטואלית",
        prompt: "מהי פונקציה וירטואלית, מהו vptr לפי מודל הקורס, ואיך נבחר המימוש כשמצביע לבסיס מצביע לאובייקט נגזר.",
        hadOfficial: false,
        official: "",
        proposed: "<p>בלי virtual הקריאה נקבעת לפי טיפוס המצביע. עם virtual, לכל מחלקה יש טבלה של כתובות מימוש, ולכל אובייקט יש vptr. במודל הקורס ה-vptr יושב בתחילת האובייקט ומצביע לטבלה של המחלקה האמיתית. הקריאה היא קפיצה לכניסה בטבלה, לא לפי טיפוס המצביע הסטטי. לא כותבים לטבלה.</p>",
        verdictKind: "new",
        verdict: "הסבר בלבד, כמו שאלה 8 במבחן לדוגמה א'.",
      },
      {
        id: "q9",
        title: "שאלה 9 · מילון, משפט וקובץ",
        prompt: "לרשימת מילים: מילון מאורך לכל מילה; משפט שבו המילה הראשונה וכל מילה שמסתיימת ב-n מתחילות באות גדולה; זוגות שמות לקובץ pairs.txt.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>lengths = {w: len(w) for w in words}
out = []
for i, w in enumerate(words):
    out.append(w.capitalize() if i == 0 or w.endswith("n") else w)
phrase = " ".join(out)
names = ("Noa", "Amit", "Dana", "Roni")
pairs = list(zip(names[0::2], names[1::2]))
try:
    with open("pairs.txt", "w", encoding="utf-8") as f:
        f.write("\\n".join(f"{a} - {b}" for a, b in pairs))
except OSError:
    print("Error writing to file pairs.txt")</code></pre>`,
        verdictKind: "new",
        verdict: "אותם שלושה סעיפים כמו שאלה 9 במבחן לדוגמה א'. open בלי מצב כתיבה לא כותב.",
      },
    ],
  },
  {
    id: "sim-style-2021c",
    title: "סימולצייה שלוקטה באמצעות AI · ב'",
    minutes: 180,
    pick: 3,
    note: "אותם תפקידי שאלות כמו בבחינה לדוגמה 2021ג: חלק א על פולימורפיזם, protected, מילים שמורות, הפניה ו-htons. חלק ב: פייתון, SQLite, ASLR ו-DEP, וניתוח גלישה בלי מטען.",
    partA: [
      {
        id: "a1",
        prompt: "Animal::speak וירטואלית. Animal::eat אינה וירטואלית. Dog דורס את שתיהן. Animal* a = new Dog(); a->speak(); a->eat();",
        options: [
          { id: "a", text: "שתיהן Dog, כי האובייקט הוא Dog." },
          { id: "b", text: "שתיהן Animal, כי המצביע הוא Animal*." },
          { id: "c", text: "speak של Dog, eat של Animal." },
          { id: "d", text: "שגיאת קומפילציה על דריסה בלי virtual." },
        ],
        answer: "c",
        hint: "<p>מה ההבדל בקישור (Binding) בין פונקציה שהוגדרה כ-<code>virtual</code> לבין פונקציה רגילה כאשר מפעילים אותן דרך מצביע למחלקת הבסיס?</p>",
        solution: `<p><strong>התשובה: ג'.</strong> הפונקציה <code>speak()</code> הוגדרה כוירטואלית בבסיס, ולכן הקריאה אליה נפתרת בזמן ריצה באמצעות קישור דינמי (vtable) ומפעילה את המימוש הדורס של המחלקה הממשית — <code>Dog::speak()</code>. לעומת זאת, <code>eat()</code> אינה וירטואלית, ולכן הקריאה אליה נפתרת סטטית בזמן קומפילציה לפי הטיפוס המוצהר של המצביע (<code>Animal*</code>) ומפעילה את <code>Animal::eat()</code>.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> <code>eat()</code> אינה וירטואלית, ולכן הקומפיילר אינו משתמש ב-vtable ומקשר אותה ישירות למחלקת הבסיס.</li>
<li><strong>ב' שגויה:</strong> <code>speak()</code> היא וירטואלית, ולכן היא מוכרעת דינמית לפי טיפוס האובייקט (Dog) ולא לפי טיפוס המצביע.</li>
<li><strong>ד' שגויה:</strong> הגדרת פונקציה בעלת שם זהה במחלקה הנגזרת היא פעולה חוקית לחלוטין (הסתרת שמות / Name Hiding) ואינה גורמת לשגיאת קומפילציה.</li>
</ul>`,
      },
      {
        id: "a2",
        prompt: "שדה protected ב-C++ נגיש:",
        options: [
          { id: "a", text: "רק מאותה מחלקה בלבד (זהה ל-private)." },
          { id: "b", text: "מהמחלקה ומיורשת, לא מקוד חיצוני רגיל." },
          { id: "c", text: "מכל קובץ באותה תיקייה." },
          { id: "d", text: "מכל מקום בתוכנית ללא שום הגבלה (זהה ל-public)." },
        ],
        answer: "b",
        hint: "<p>מה מבדיל בין <code>private</code> (סגור ליורשות) לבין <code>protected</code> בהיררכיית ירושה מונחית עצמים?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> רמת ההרשאה <code>protected</code> מאפשרת גישה ישירה לשדות ולמתודות מתוך המחלקה המגדירה ומתוך כל מחלקה הנגזרת (יורשת) ממנה. עם זאת, גישה ישירה משאר חלקי הקוד (אובייקטים חיצוניים או פונקציות חופשיות) חסומה לחלוטין, בדיוק כמו <code>private</code>.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> הגבלה לאותה מחלקה בלבד (ללא יורשות) היא ההגדרה של <code>private</code>.</li>
<li><strong>ג' שגויה:</strong> הרשאות גישה ב-C++ הן ברמת טיפוס המחלקה, ואינן מושפעות ממיקום הפונקציה באותו קובץ מקור.</li>
<li><strong>ד' שגויה:</strong> גישה חופשית לכל שייכת ל-<code>public</code>.</li>
</ul>`,
      },
      {
        id: "a3",
        prompt: "int, float, str, bool בפייתון הם:",
        options: [
          { id: "a", text: "כולם מילים שמורות (Keywords) שלא ניתן לדרוס." },
          { id: "b", text: "טיפוסים מובנים (builtins), לא keywords." },
          { id: "c", text: "מילים שמורות רק בפייתון 2." },
          { id: "d", text: "אופרטורים מיוחדים של המפרש המוגנים בקומפיילר." },
        ],
        answer: "b",
        hint: "<p>האם פייתון מאפשרת לבצע השמה כגון <code>int = 5</code> בקוד (אף שזו פרקטיקה גרועה מאוד), בשונה ממילים שמורות כמו <code>def</code> או <code>class</code>?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> שמות הטיפוסים הבסיסיים בפייתון (<code>int</code>, <code>str</code>, <code>list</code>, <code>bool</code> וכו') אינם מילים שמורות (Keywords כגון <code>if</code>, <code>def</code>, <code>while</code> שמופיעות ב-<code>keyword.kwlist</code>). הם אובייקטי טיפוס מובנים המוגדרים במודול <code>builtins</code>, וטכנית ניתן אפילו לדרוס אותם במרחב השמות המקומי (למשל <code>str = \"hello\"</code>, הגורם להסתרת הטיפוס המובנה).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> מילים שמורות בפייתון אינן ניתנות להשמה בשום מצב (ניסיון השמה כמו <code>pass = 1</code> יגרור <code>SyntaxError</code> מיידי), בעוד לשמות טיפוסים ניתן לבצע השמה.</li>
<li><strong>ג' ו-ד' שגויות:</strong> שמות אלו מעולם לא היו מילים שמורות ואינם אופרטורים של השפה.</li>
</ul>`,
      },
      {
        id: "a4",
        prompt: "העברה לפי הפניה (reference) עדיפה על העברה לפי ערך כי:",
        options: [
          { id: "a", text: "היא מונעת שכפול מיותר של תוכן האובייקט וחוסכת זמן העתקה, ומונעת slicing." },
          { id: "b", text: "לא נוצר עותק של האובייקט, והזהות שלו נשמרת." },
          { id: "c", text: "היא הופכת את כל המתודות לוירטואליות אוטומטית." },
          { id: "d", text: "היא מחייבת הרצת הפונקציה במקביל במספר חוטים." },
        ],
        answer: "b",
        hint: "<p>מה קורה כאשר מעבירים אובייקט גדול (כגון וקטור עם מיליון איברים) לפי ערך לפונקציה?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> בהעברה לפי ערך (Pass by Value), מופעל בנאי ההעתקה ונוצר עותק חדש של האובייקט במחסנית. בהעברה לפי הפניה (Pass by Reference, ובפרט <code>const T&amp;</code>), מועברת רק כתובת/כינוי לאובייקט המקורי, לא נוצר עותק, זהות האובייקט נשמרת ונחסכת תקורה חישובית משמעותית.</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>ג' שגויה:</strong> וירטואליות של מתודות נקבעת אך ורק על ידי מילת המפתח <code>virtual</code> בהגדרת המחלקה, ואינה קשורה לאופן העברת הארגומנט.</li>
<li><strong>ד' שגויה:</strong> העברה בהפניה היא מנגנון סינכרוני רגיל לחלוטין ואינה קשורה לריבוי חוטים.</li>
<li><strong>א' מנוסח באופן חלקי לעומת ב' המדויק:</strong> ב' מתמקד בליבת היתרון — שמירת זהות האובייקט ואי-שכפולו.</li>
</ul>`,
      },
      {
        id: "a5",
        prompt: "htons על מספר פורט:",
        options: [
          { id: "a", text: "בודקת שהשרת מאזין." },
          { id: "b", text: "ממירה לסדר בתים של הרשת (big-endian)." },
          { id: "c", text: "הופכת מחרוזת למספר." },
          { id: "d", text: "מצפינה את הפורט למניעת האזנה." },
        ],
        answer: "b",
        hint: "<p>מעבדי x86 פועלים בשיטת Little-Endian, ואילו פרוטוקולי הרשת (TCP/IP) מצפים למספרים בסדר Big-Endian. מה עושות פונקציות משפחת htons/htonl?</p>",
        solution: `<p><strong>התשובה: ב'.</strong> ארכיטקטורות מעבדים שונות מייצגות מספרים בזיכרון בסדר בתים שונה (למשל Little-Endian ב-x86/x64 מול Big-Endian). פרוטוקולי האינטרנט מחייבים סדר בתים אחיד ברשת (Network Byte Order, שהוא Big-Endian - הבית המשמעותי ביותר נשלח ראשון). הפונקציה <code>htons</code> (Host to Network Short) מבצעת המרה זו עבור שלם קצר בן 16 סיביות (כמו מספר פורט).</p>
<p><strong>למה המסיחים שגויים?</strong></p>
<ul>
<li><strong>א' שגויה:</strong> בדיקת זמינות הפורט מתבצעת על ידי מערכת ההפעלה בעת קריאה ל-<code>bind()</code>, לא על ידי <code>htons</code>.</li>
<li><strong>ג' שגויה:</strong> המרת מחרוזת למספר נעשית באמצעות פונקציות כמו <code>atoi()</code>, בעוד ש-<code>htons</code> מקבלת מספר מספרי וממירה את סדר הבתים שלו.</li>
<li><strong>ד' שגויה:</strong> <code>htons</code> אינה פונקציית הצפנה כלל, ומספר הפורט מועבר גלוי בכותרת ה-TCP/UDP.</li>
</ul>`,
      },
    ],
    partB: [
      {
        id: "q6",
        title: "שאלה 6 · פייתון: מילים, מחלקה וקובץ",
        prompt: "הדפיסו מילים שמסתיימות ב-ly באותיות קטנות. מחלקת Lab(name, city, seats) ותת-מחלקה RemoteLab עם מילון כלים. קראו שורות name,city,seats מקובץ והדפיסו כמה מעבדות וכמה מקומות יחד.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>def ly_words(text):
    for w in text.split():
        if w.endswith("ly"):
            print(w.lower(), end=" ")

class Lab:
    def __init__(self, name, city, seats):
        self.name, self.city, self.seats = name, city, int(seats)

class RemoteLab(Lab):
    def __init__(self, name, city, seats, tools):
        super().__init__(name, city, seats)
        self.tools = dict(tools)

def load(path):
    labs = []
    try:
        lines = open(path, encoding="utf-8").read().splitlines()
    except OSError:
        print("Could not read from file:", path)
        return
    for line in lines:
        parts = [p.strip() for p in line.split(",")]
        if len(parts) != 3 or not parts[0]:
            continue
        labs.append(Lab(parts[0], parts[1], parts[2]))
    print("Number of labs:", len(labs))
    print("Total seats", sum(x.seats for x in labs))</code></pre>`,
        verdictKind: "new",
        verdict: "אותו שלד כמו שאלה 6 בבחינה לדוגמה 2021ג: סינון מילה, ירושה, וקובץ עם טיפול בשגיאה.",
      },
      {
        id: "q7",
        title: "שאלה 7 · SQLite",
        prompt: "ב-C/C++ פתחו grades.db, צרו Grades(Name, Id, Score), הכניסו שתי רשומות קבועות וסגרו. בפייתון קבלו מזהה והדפיסו ציון. מה נשבר אם מדביקים את המזהה למחרוזת, ואיך נמנעים.",
        hadOfficial: false,
        official: "",
        proposed: `<pre class="code" dir="ltr"><code>sqlite3 *db;
if (sqlite3_open("grades.db", &amp;db) != SQLITE_OK) return 1;
sqlite3_exec(db, "CREATE TABLE IF NOT EXISTS Grades(Name TEXT, Id INTEGER, Score INTEGER);", 0, 0, 0);
sqlite3_exec(db, "INSERT INTO Grades VALUES('Ada', 1, 90);", 0, 0, 0);
sqlite3_exec(db, "INSERT INTO Grades VALUES('Mimi', 2, 80);", 0, 0, 0);
sqlite3_close(db);

import sqlite3
conn = sqlite3.connect("grades.db")
sid = input("id: ")
row = conn.execute("SELECT Score FROM Grades WHERE Id = ?", (sid,)).fetchone()
print(row[0] if row else "not found")
conn.close()</code></pre>
<p>הדבקה עם format או f-string מכניסה את הקלט לתחביר. סימן שאלה וטיפל משאירים אותו נתון. exec מתאים כאן רק כי שתי ההכנסות קבועות.</p>`,
        verdictKind: "new",
        verdict: "כמו שאלה 7 בבחינה לדוגמה: DDL קבוע ב-exec, וקלט רק דרך פרמטר.",
      },
      {
        id: "q8",
        title: "שאלה 8 · ASLR ו-DEP",
        prompt: "לכל אחד מ-ASLR ו-DEP: מה המטרה, איך זה פועל, ומה הוא לא מתקן. בלי מטען.",
        hadOfficial: false,
        official: "",
        proposed: `<p><strong>ASLR</strong> מערבב כתובות בין הרצות, כדי שכתובת קבועה של מחסנית או קוד לא תישאר יעד. רואים את זה בהדפסת כתובת מקומית בשתי הרצות. הוא לא מתקן העתקה בלי גבול, ודליפת כתובת מחלישה אותו.</p>
<pre class="code" dir="ltr"><code>int local = 0;
printf("%p\\n", (void *)&amp;local);</code></pre>
<p><strong>DEP / NX</strong> מסמן אזורי נתונים כלא-להרצה. קפיצה למערך תווים נעצרת. דריסת כתובת חזרה אל קוד שכבר מותר להרצה לא נמחקה על ידי זה. קנרית המחסנית היא שכבה נוספת: ערך לפני כתובת החזרה נבדק לפני ret.</p>`,
        verdictKind: "new",
        verdict: "שאלה 8 בבחינה לדוגמה היא ASLR ו-DEP. הקנרית נוספת כשכבה מאותו נושא, בלי קוד תקיפה.",
      },
      {
        id: "q9",
        title: "שאלה 9 · גלישה במחסנית",
        prompt: "char buf[16] ומעתיקים לתוכו שורה בלי גבול. מה החולשה, מה עלול להישבר במחסנית, ואיך מתקנים. בלי מטען.",
        hadOfficial: false,
        official: "",
        proposed: "<p>ההעתקה לא מכירה את 16 הבתים. כתיבה רציפה עוברת את החוצץ אל מה שיושב מעליו במחסנית, כולל כתובת החזרה ש-<code>ret</code> שולף. קנרית שנשתלה לפני הכתובת נדרסת בגלישה רציפה, והבדיקה לפני <code>ret</code> עוצרת. זה לא תיקון: הבאג נשאר. התיקון הוא קריאה או העתקה עם גבול ואפס סיום, למשל <code>fgets(buf, sizeof buf, stdin)</code>.</p>",
        verdictKind: "new",
        verdict: "כמו שאלה 9 בבחינה לדוגמה: מה נשבר ואיך מתקנים. שם זו גלישת ערימה לשדה סמוך; כאן גלישת מחסנית לכתובת חזרה.",
      },
    ],
  }
);
