UNIT5.sections.push(
  {
    id: "u5-conc",
    title: "תכנות מקבילי: חוט (thread) ותהליך (process)",
    html: `
      <p><strong>בו־זמניות (Concurrency)</strong> היא ניהול כמה משימות שזמני הביצוע שלהן חופפים; הן עשויות להתחלף על ליבה אחת — יחידת עיבוד אחת במעבד. <strong>מקביליות (Parallelism)</strong> היא ביצוע ממשי של כמה פעולות באותו זמן, למשל על כמה ליבות. המצגת מציגה אותן יחד, אך ההבחנה חשובה: שרת יכול להיות בו־זמני גם בלי להריץ שתי הוראות באותו רגע.</p>
      <ul>
        <li><strong>חוט (thread)</strong> — יחידת ביצוע של קוד, מקושרת לפונקציית כניסה (entry point).</li>
        <li><strong>תהליך (process)</strong> — מופע של "תוכנית". לכל תהליך לפחות חוט אחד, ומרחב כתובות משלו.</li>
        <li><strong>חוטים באותו תהליך</strong> חולקים ערימה, קבצים פתוחים ושקעים. לכל חוט רגיסטרים ומחסנית משלו. משתנה מקומי יושב על המחסנית של החוט; משתנה גלובלי או בלוק בערימה משותף, ולכן שם מופיע מרוץ.</li>
      </ul>
      <div class="panel">
        <p><strong>מלכודת מבחן.</strong> תהליך מבודד בזיכרון. חוט אינו תהליך קטן עם זיכרון פרטי: הוא חולק את מרחב הכתובות, ושומר לעצמו רק את המחסנית ואת הרגיסטרים. לכן באג כתיבה בערימה של חוט אחד נראה גם אצל השני, ומחסנית של פונקציה בחוט אחד אינה המחסנית של חוט אחר.</p>
      </div>
      <p>ב־C++11: <code>std::thread</code>. יוצרים חוט עם פונקציה והוא מתחיל לרוץ. לפני שאובייקט thread חי נהרס חייבים לבצע <code>join</code> — להמתין שהחוט יסתיים — או <code>detach</code> — לנתק אותו כדי שימשיך לבד. הריסת thread שעדיין joinable, כלומר לא בוצע עליו אחד מהשניים, קוראת ל־<code>std::terminate</code> וסוגרת את התוכנית.</p>
      <pre class="code"><code>#include &lt;thread&gt;
void work() { /* ... */ }
int main() {
    std::thread t1(work);
    t1.join();
    return 0;
}</code></pre>
    `,
  },
  {
    id: "u5-gil",
    title: "פייתון: נעילת המפרש הגלובלית (GIL) ו־multiprocessing",
    html: `
      <p>החוטים ב־C++ יכולים לרוץ במקביל על כמה ליבות. בפייתון, בבנייה הרגילה של CPython, המפרש עצמו מגביל את זה.</p>
      <p>בבנייה הרגילה של CPython יש <strong>נעילת המפרש הגלובלית (Global Interpreter Lock, GIL)</strong>: בכל רגע חוט אחד מבצע bytecode של פייתון — קוד הביניים של המפרש מיחידה 4 — בתוך אותו מפרש. חוטים עדיין שימושיים כשממתינים לרשת או לקובץ (I/O). ספרייה <strong>native</strong> — קוד בשפה כמו C שרץ מחוץ למפרש — עשויה לשחרר את ה־GIL בזמן העבודה שלה. לחישוב שמעמיס על המעבד המצגת מפנה ל־<code>multiprocessing</code> — תהליכים נפרדים, כל אחד עם מפרש משלו.</p>
    `,
  },
  {
    id: "u5-race",
    title: "מרוץ נתונים (Data Race), סנכרון, מנעולים",
    html: `
      <p>בפייתון ה־GIL מצמצם מקביליות של bytecode. ב־C++ אין מנעול כזה: שני חוטים שנוגעים באותו משתנה בלי תיאום כבר נמצאים במרוץ.</p>
      <p>חידת המצגת: שני חוטים מגדילים <code>g_value</code> עשר פעמים כל אחד בלי סנכרון. אינטואיטיבית אפשר לאבד עדכונים, כי <code>++</code> הוא קריאה־שינוי־כתיבה ולא בהכרח פעולה אטומית. מבחינת תקן C++, גישה מקבילית לאותו אובייקט כאשר לפחות אחת כותבת וללא סנכרון היא <strong>מרוץ נתונים (Data Race)</strong>, והתנהגות התוכנית אינה מוגדרת — לא מובטח אפילו "מספר קטן מ־20".</p>
      <p><strong>תנאי מרוץ (Race Condition)</strong> הוא כשל שבו התוצאה תלויה בתזמון. <strong>מרוץ נתונים</strong> הוא מקרה מוגדר במיוחד של גישות זיכרון מתנגשות ללא סנכרון. זה באג נכונות ואבטחה שמופיע בשרתים תחת עומס.</p>
      <div class="panel">
        <p><strong>למה מנעול.</strong> שני עובדים מעדכנים את אותו דף נוכחות בלי תור: כל אחד קורא 10, מוסיף 1, כותב 11 — אבדתם עדכון. מנעול = רק אחד כותב בכל רגע. בשרת זה חשבון יתרה, מונה חיבורים, או אותו שקע. בלי סנכרון זו לא "לפעמים 19" ב־C++ — זו התנהגות לא מוגדרת.</p>
      </div>
      <p>דרכי סנכרון במצגת:</p>
      <ul>
        <li><strong>המתנה פעילה (busy waiting)</strong> — לולאה שבודקת דגל. מבזבזת מעבד; לפעמים פשוטה, לעיתים לא מתאימה.</li>
        <li><strong>פעולות אטומיות</strong> — החומרה מבטיחה שהצעד נראה בלתי ניתן לפיצול.</li>
        <li><strong>מנעולים (locks)</strong> — רק מחזיק המנעול ניגש למשאב.</li>
      </ul>
      <p>ב־C++: <code>std::mutex</code> עם <code>std::lock_guard</code> או <code>std::unique_lock</code>, כדי שהנעילה תשוחרר גם בחריגה; <code>std::atomic</code> לפעולות פשוטות; ו־<code>std::condition_variable</code> להמתנה לאירוע עם בדיקת תנאי בלולאה. מעבדת המרוץ למטה מדמה את ההבדל.</p>
      <p>במצגת המשלימה: <strong>בעיית הפילוסופים (dining philosophers)</strong> — כמה סועדים, מזלגות משותפים; בלי סדר מוסכם כולם יכולים לחכות לנצח (<strong>קיפאון, deadlock</strong>). אפחות: סדר גלובלי על משאבים, או timeout — לא "איך לתקוע שרת".</p>
    `,
  },
  {
    id: "u5-sel",
    title: "ריבוי לקוחות: תהליך מול Selector",
    html: `
      <p>תקשורת לקוח אחד מול שרת — במדריך (עמ' 117 במצגת). השאלה: איך מול <em>הרבה</em> לקוחות במקביל?</p>
      <ul>
        <li>תהליך (או חוט) לכל חיבור — הקצאת משאבים לכל אחד. בעומס: מצוקת זיכרון/מעבד.</li>
        <li>חשוף ל<strong>הצפת התחברויות</strong> ממשתמש זדוני — זו משפחת <strong>מניעת שירות (DoS, Denial of Service)</strong>: למצות משאבים כדי שהשירות לא יעמוד. אפחות: הגבלת תור, timeout, לא ליצור תהליך בלי תקרה.</li>
        <li>הפתרון במצגת: <strong>Selector</strong> — אובייקט שמחלק טיפול בערוצים לפי מי שמוכן, בלי קריאה חוסמת על כל לקוח. קריאה חוסמת עוצרת את התוכנית עד שהנתון מגיע. בפייתון: מודול <code>selectors</code>, להתחיל ב־<code>DefaultSelector</code>. זה אותו רעיון כמו תבנית <strong>Reactor</strong> במדריך ביחידה 1: לא תהליך לכל לקוח, אלא המתנה ל"מי מוכן".</li>
      </ul>
      <p>רעיון: חוט או תהליך אחד ממתין ל"מי מוכן לקריאה או לכתיבה", ומטפל רק במי שמוכן. זה <strong>ריבוב קלט־פלט (I/O multiplexing)</strong>: ערוץ אחד של המתנה להרבה חיבורים. <code>selectors.DefaultSelector</code> בוחר את מנגנון מערכת ההפעלה, למשל <code>select</code>, <code>epoll</code> בלינוקס, או <code>kqueue</code> ב־macOS. <code>setblocking(False)</code> אומר שהשקע לא עוצר את התוכנית כשאין עדיין נתון. רושמים אותו לאירוע קריאה, ו־<code>select</code> מחזיר רק ערוצים מוכנים.</p>
      <pre class="code"><code>import selectors
import socket

sel = selectors.DefaultSelector()

def accept_client(server_sock, mask):
    conn, _addr = server_sock.accept()
    conn.setblocking(False)
    sel.register(conn, selectors.EVENT_READ, read_client)

def read_client(conn, mask):
    data = conn.recv(1024)
    if not data:
        sel.unregister(conn)
        conn.close()
        return
    conn.sendall(data)

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("127.0.0.1", 8080))
server.listen(16)
server.setblocking(False)
sel.register(server, selectors.EVENT_READ, accept_client)

while True:
    for key, mask in sel.select(timeout=1):
        key.data(key.fileobj, mask)</code></pre>
      <p>השלד מראה רישום וחלוקה, לא שרת מוכן לייצור. <code>sendall</code> על שקע לא־חוסם עלול לא לשלוח הכול; כתיבה חלקית ו־<code>EVENT_WRITE</code> — אירוע "אפשר לכתוב עכשיו" — משלימים את זה. Selector לבדו אינו הגנת DoS: עדיין נדרשים תקרות חיבור וגודל, timeout, <strong>backpressure</strong> — האטת הקבלה כשהשרת לא מספיק לעבד, כדי שהתור לא יצמח בלי גבול — ומכסות עבודה לכל לקוח.</p>
    `,
  }
);
