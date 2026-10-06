UNIT5.sections.push(
  {
    id: "u5-conc",
    title: "תכנות מקבילי: חוט (thread) ותהליך (process)",
    html: `
      <p>כאשר שרת רשת נדרש לשרת אלפי לקוחות בו־זמנית, או כאשר תוכנית מחשב מבצעת חישוב מורכב תוך שמירה על ממשק משתמש רספונסיבי, נדרש שימוש במנגנוני ריצה מקבילית.</p>
      <p><strong>בו־זמניות (Concurrency) מול מקביליות (Parallelism):</strong> שני מושגים יסודיים שההבחנה ביניהם קריטית:</p>
      <ul>
        <li><strong>בו־זמניות (Concurrency):</strong> היכולת של מערכת לנהל ולהתקדם במספר משימות שונות באותו חלון זמן. המשימות עשויות להתחלף ביניהן לסירוגין על גבי <em>ליבת עיבוד בודדת</em> (באמצעות <strong>החלפת הקשר, Context Switch</strong> המבוצעת על ידי מתזמן מערכת ההפעלה). ברגע נתון רק הוראת מעבד אחת מתבצעת, אך קצב ההחלפה המהיר מייצר אשליה של פעולה מקבילית.</li>
        <li><strong>מקביליות (Parallelism):</strong> ביצוע פיזי ממשי של שתי הוראות מעבד או יותר <em>באותו שבריר שנייה בדיוק</em>. מקביליות אפשרית אך ורק על גבי חומרה בעלת מספר ליבות עיבוד (Multi-core) או מספר מעבדים פיזיים נפרדים.</li>
      </ul>
      <h3>מודל הזיכרון: תהליך (Process) מול חוט ביצוע (Thread)</h3>
      <p>הבנת מודל הזיכרון של מערכת ההפעלה היא לב ליבו של התכנות המקבילי, ואחד הנושאים הנשאלים ביותר בבחינות:</p>
      <ul>
        <li><strong>תהליך (Process):</strong> תוכנית מחשב בזמן הרצה, המהווה יחידת בידוד והקצאת משאבים של מערכת ההפעלה. לכל תהליך מוקצה <strong>מרחב כתובות וירטואלי מבודד משלו (Virtual Address Space)</strong>. תהליך אחד אינו מסוגל לקרוא או לשנות נתונים במרחב הזיכרון של תהליך אחר ללא מנגנוני תקשורת בין־תהליכית (IPC, Inter-Process Communication). בידוד זה מעניק יציבות ואבטחה, אך יצירת תהליך והחלפת הקשר ביניהם יקרות במשאבי מערכת.</li>
        <li><strong>חוט ביצוע (Thread):</strong> יחידת הריצה הבסיסית ביותר המתוזמנת על ידי המעבד, הפועלת <em>בתוך</em> מרחב התהליך. כל תהליך מתחיל בחוט ראשי (Main Thread), ויכול להוליד חוטים נוספים החולקים את משאבי התהליך.</li>
      </ul>
      <div class="panel">
        <p><strong>חלוקת הזיכרון בין חוטים באותו תהליך (חובה לדעת לבחינה!):</strong></p>
        <ul>
          <li><strong>מה משותף לכל החוטים באותו תהליך?</strong>
            <ul>
              <li><strong>מרחב הכתובות הווירטואלי</strong> של התהליך.</li>
              <li><strong>ערימת הזיכרון (Heap):</strong> כל הקצאת זיכרון דינמית (כגון <code>malloc</code> ב־C או <code>new</code> ב־C++) נגישה לקריאה ולכתיבה לכל החוטים בתהליך.</li>
              <li><strong>מקטע הנתונים הגלובלי (Data / BSS Segment):</strong> כל המשתנים הגלובליים והסטטיים.</li>
              <li><strong>משאבי מערכת פתוחים:</strong> מתארי קבצים (File Descriptors), שקעי תקשורת (Sockets), צינורות (Pipes) והרשאות מערכת ההפעלה.</li>
            </ul>
          </li>
          <li><strong>מה נפרד, עצמאי ופרטי לכל חוט?</strong>
            <ul>
              <li><strong>מחסנית קריאות פרטית (Stack):</strong> לכל חוט יש מחסנית זיכרון עצמאית לחלוטין! משתנים מקומיים (Local Variables) של פונקציות יושבים במחסנית של החוט המריץ אותן, כך שחוט אחד אינו דורס משתנים מקומיים של חוט אחר.</li>
              <li><strong>ערכי האוגרים / רגיסטרים במעבד (Registers):</strong> כולל <strong>מונה הפקודות (Program Counter, PC)</strong> המציין איזו הוראת קוד החוט מבצע ברגע זה, ו־Stack Pointer המצביע לראש המחסנית שלו.</li>
            </ul>
          </li>
        </ul>
        <p><em>ההשלכה הדפנסיבית:</em> מכיוון שהערימה והמשתנים הגלובליים משותפים, שינוי בו־זמני של אותו משתנה על ידי מספר חוטים ללא סנכרון יוצר <strong>מרוץ נתונים (Data Race)</strong> והשחתת זיכרון.</p>
      </div>
      <p><strong>ניהול חוטים ב־C++11 ומעלה (<code>std::thread</code>):</strong> החוט מתחיל לרוץ מיד ברגע יצירתו. כלל בטיחות קריטי בשפה: לפני שאובייקט <code>std::thread</code> נהרס (Destructed), חובה לקרוא במפורש לאחת משתי מתודות:</p>
      <ul>
        <li><code>join()</code> — גורמת לחוט הקורא להמתין לחלוטין עד לסיום פעולתו של חוט היעד.</li>
        <li><code>detach()</code> — מנתקת את החוט ומאפשרת לו להמשיך לרוץ ברקע באופן עצמאי כאובייקט דמון (Daemon).</li>
      </ul>
      <p><strong>סכנת קריסה (std::terminate):</strong> אם אובייקט <code>std::thread</code> נהרס בעודו עדיין ניתן להצטרפות (<code>joinable() == true</code>, כלומר לא נקראו <code>join</code> ולא <code>detach</code> — למשל כתוצאה מחריגה שנזרקה לפני שורת ה־join), השפה מפעילה מיד <code>std::terminate()</code> והתוכנית כולה קורסת באחת!</p>
      <pre class="code"><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;numeric&gt;
#include &lt;thread&gt;

// פונקציית עובד המחשבת סכום של מקטע במערך
void compute_partial_sum(const std::vector&lt;int&gt;&amp; data, size_t start, size_t end, long long&amp; result) {
    long long sum = 0;
    for (size_t i = start; i &lt; end; ++i) {
        sum += data[i];
    }
    result = sum;
}

int main() {
    std::vector&lt;int&gt; numbers(1000000, 1); // מיליון מספרים בערך 1
    long long sum1 = 0, sum2 = 0;
    size_t mid = numbers.size() / 2;

    // יצירת שני חוטים לעיבוד מקבילי של שני חצאי המערך
    std::thread worker1(compute_partial_sum, std::cref(numbers), 0, mid, std::ref(sum1));
    std::thread worker2(compute_partial_sum, std::cref(numbers), mid, numbers.size(), std::ref(sum2));

    // המתנה לסיום שני החוטים (חובה דפנסיבית למניעת std::terminate)
    if (worker1.joinable()) worker1.join();
    if (worker2.joinable()) worker2.join();

    long long total_sum = sum1 + sum2;
    std::cout &lt;&lt; "Total sum calculated concurrently: " &lt;&lt; total_sum &lt;&lt; "\\n";
    return 0;
}</code></pre>
    `,
  },
  {
    id: "u5-gil",
    title: "פייתון: נעילת המפרש הגלובלית (GIL) ו־multiprocessing",
    html: `
      <p>בעוד שב־C++ חוטים רצים באופן טבעי במקביל על גבי ליבות פיזיות שונות, בשפת פייתון (במימוש הרשמי והסטנדרטי <strong>CPython</strong>) המצב שונה מהותית בשל מנגנון ה־<strong>GIL</strong>.</p>
      <p><strong>מהו מנגנון נעילת המפרש הגלובלית (GIL, Global Interpreter Lock)?</strong> מנעול פנימי במפרש של פייתון המוודא כי בכל שבריר שנייה נתון, <em>רק חוט יחיד</em> מבצע הוראות קוד ביניים (Bytecode) של פייתון, גם במחשב מרובה ליבות (Multi-core). מנגנון ה־GIL הוטמע במקור כדי להגן על מנגנון ניהול הזיכרון של CPython (המתבסס על ספירת הפניות / Reference Counting) מפני מרוצי נתונים, מבלי להשית תקורה של מנעולים עדינים על ריצה בעלת חוט יחיד.</p>
      <p><strong>השלכות ביצועים: משימות חישוב (CPU-bound) מול משימות קלט/פלט (I/O-bound):</strong></p>
      <ul>
        <li><strong>משימות חישוביות כבדות (CPU-bound):</strong> חישובים מתמטיים טהורים, עיבוד תמונה או הצפנה הכתובים בפייתון <em>אינם מרוויחים דבר</em> משימוש במודול <code>threading</code>! יתרה מכך — התקורה של החלפת ההקשר והמאבק על ה־GIL עשויה לגרום לקוד מרובה חוטים לרוץ <em>לאט יותר</em> מאשר בקוד בעל חוט יחיד!</li>
        <li><strong>משימות קלט/פלט (I/O-bound):</strong> שרתי רשת, קריאות לשקעים, שאילתות מסד נתונים ופעולות קריאה/כתיבה מקבצים. כאן מודול <code>threading</code> מספק שיפור עצום: כאשר חוט מבצע פעולת I/O (כגון המתנה לנתונים מ־<code>sock.recv</code>), מפרש פייתון <strong>משחרר את ה־GIL</strong> באופן יזום, ומאפשר לחוטים אחרים לעבוד במקביל! כמו כן, ספריות שפת C מקוריות (כגון NumPy) משחררות את ה־GIL בזמן ביצוע חישובים כבדים ב־C.</li>
      </ul>
      <p><strong>הפתרון לחישוב מקבילי אמיתי בפייתון: מודול <code>multiprocessing</code>:</strong> כדי לנצל מספר ליבות עיבוד במשימות CPU-bound בפייתון, משתמשים בתהליכים נפרדים של מערכת ההפעלה במקום בחוטים. כל תהליך מקבל מופע עצמאי של מפרש פייתון ומרחב זיכרון מבודד משלו עם GIL נפרד, והתקשורת ביניהם מנוהלת באמצעות צינורות (Pipes), תורים (Queues) או זיכרון משותף (Shared Memory).</p>
    `,
  },
  {
    id: "u5-race",
    title: "מרוץ נתונים (Data Race), סנכרון, מנעולים",
    html: `
      <p>ב־C++ אין מנעול גלובלי כמו ה־GIL. כאשר חוטים שונים ניגשים לזיכרון משותף ללא מנגנון תיאום, עלולות להיווצר פגיעויות אבטחה קשות ושגיאות קריטיות.</p>
      <p><strong>ההבחנה המדויקת בין תנאי מרוץ למרוץ נתונים:</strong></p>
      <ul>
        <li><strong>תנאי מרוץ (Race Condition):</strong> פגם לוגי סמנטי בתוכנית, שבו נכונות התוצאה תלויה בסדר התזמון הבלתי צפוי שבו הוראות החוטים מתבצעות (למשל, תבנית "בדיקה ולאחריה פעולה" — Check-Then-Act, שבה מצב המערכת משתנה בין רגע הבדיקה לרגע ביצוע הפעולה).</li>
        <li><strong>מרוץ נתונים (Data Race):</strong> מצב ספציפי ומוגדר היטב בתקן שפת C++, שבו לפחות שני חוטים ניגשים לאותו מיקום זיכרון בו־זמנית, לפחות אחת מהגישות היא <strong>כתיבה</strong>, וללא מנגנון סנכרון ביניהן.</li>
      </ul>
      <div class="panel">
        <p><strong>מוקש בחינה עמוק — מרוץ נתונים ב־C++ הוא התנהגות בלתי מוגדרת (Undefined Behavior):</strong></p>
        <p>אם שני חוטים מגדילים משתנה גלובלי <code>counter++</code> ללא סנכרון, הפעולה <code>++</code> אינה פעולה יחידה אלא רצף של שלוש הוראות אסמבלי: קריאה מהזיכרון לרגיסטר (Read), הגדלה ברגיסטר (Modify), וכתיבה חזרה לזיכרון (Write). אם מתרחשת פסיקת תזמון באמצע, עדכונים יאבדו.</p>
        <p><strong>אך חמור מכך:</strong> בתקן C++, מרוץ נתונים מוגדר רשמית כ־<strong>Undefined Behavior (UB)</strong>! המהדר (Compiler) רשאי להניח שמרוצי נתונים אינם מתקיימים, ולכן לבצע אופטימיזציות אגרסיביות — כגון השארת המשתנה ברגיסטר לנצח ללא כתיבה לזיכרון, או שינוי סדר ההוראות — מה שעלול לגרום לקריסות מסתוריות של המערכת!</p>
      </div>
      <p><strong>מנגנוני סנכרון מרכזיים ב־C++:</strong></p>
      <ul>
        <li><strong>מנעול הדדי (Mutex, Mutual Exclusion):</strong> אובייקט <code>std::mutex</code> המאפשר רק לחוט אחד בכל רגע נתון להיכנס לקטע הקוד הקריטי. חובה להשתמש במעטפות RAII:
          <ul>
            <li><code>std::lock_guard&lt;std::mutex&gt;</code> — נועלת את המוטקס בבנאי ומשחררת אותו אוטומטית בדסטרקטור בעת יציאה מה־Scope (כולל במקרה של זריקת חריגה!).</li>
            <li><code>std::unique_lock&lt;std::mutex&gt;</code> — מעטפת גמישה יותר המאפשרת נעילה מושהית, שחרור ידני, ועבודה מול משתני תנאי.</li>
          </ul>
        </li>
        <li><strong>טיפוסים אטומיים (<code>std::atomic&lt;T&gt;</code>):</strong> עבור משתנים פשוטים (מונים, דגלים בוליאניים), פעולות אטומיות ממומשות ישירות בחומרת המעבד (הוראות כגון <code>LOCK XADD</code> ב־x86) ללא צורך במנעול כבד, ומבטיחות שהפעולה תיראה כלתי ניתנת לפיצול.</li>
        <li><strong>משתנה תנאי (<code>std::condition_variable</code>):</strong> מנגנון המאפשר לחוט להירדם ביעילות מבלי לבזבז זמן מעבד (במקום <strong>המתנה פעילה / Busy Waiting</strong> הפוגעת קשות בביצועים) עד שחוט אחר מודיע לו (<code>notify_one()</code> / <code>notify_all()</code>) שתנאי מסוים התקיים. חובה תמיד לבדוק את התנאי בתוך לולאת <code>while</code> עקב תופעת התעוררות סרק (Spurious Wakeup).</li>
      </ul>
      <p><strong>בעיית הפילוסופים הסועדים (Dining Philosophers) וסכנת קיפאון (Deadlock):</strong></p>
      <p>דוגמה קלאסית במדעי המחשב שנוסחה על ידי דייקסטרה: 5 פילוסופים יושבים סביב שולחן עגול, ובין כל זוג יש מזלג יחיד (משאב משותף). כדי לאכול, פילוסוף חייב לאחוז בשני המזלגות הסמוכים לו. אם כל פילוסוף מרים בו־זמנית את המזלג השמאלי וממתין למזלג הימני, נוצר <strong>קיפאון (Deadlock)</strong> שבו אף פילוסוף אינו יכול להמשיך, וכולם גוועים ברעב!</p>
      <p><strong>ארבעת התנאים ההכרחיים לקיפאון (תנאי קופמן / Coffman Conditions):</strong> (1) מניעה הדדית (משאב שאינו ניתן לשיתוף), (2) החזק והמתן (חוט מחזיק במשאב וממתין למשאב נוסף), (3) היעדר הפקעה (לא ניתן לקחת משאב בכוח), ו־(4) המתנה מעגלית (מעגל סגור של חוטים הממתינים זה לזה). שבירת כל אחד מארבעת התנאים מונעת קיפאון — למשל באמצעות <strong>קביעת סדר גלובלי אחיד לרכישת נעילות (Lock Ordering)</strong>, או שימוש בפונקציות נעילה מונעות קיפאון (כגון <code>std::lock</code> או <code>std::scoped_lock</code> ב־C++17).</p>
    `,
  },
  {
    id: "u5-sel",
    title: "ריבוי לקוחות: תהליך מול Selector",
    html: `
      <p>כאשר שרת רשת נדרש לשרת אלפי חיבורי לקוחות בו־זמנית, בחירת ארכיטקטורת השרת קובעת את שרידות המערכת וביצועיה.</p>
      <p><strong>השוואת מודלים לטיפול בריבוי לקוחות:</strong></p>
      <ul>
        <li><strong>מודל תהליך או חוט לכל לקוח (Thread/Process-per-Client):</strong> בכל פעם שמתקבל חיבור (<code>accept</code>), השרת יוצר חוט חדש המטפל באותו לקוח בקריאות חוסמות רגילות.
          <br><em>החיסרון הקריטי:</em> כל חוט דורש הקצאת מחסנית זיכרון עצמאית (בין 1MB ל־8MB כברירת מחדל במערכות הפעלה רבות). כאשר מתחברים 10,000 לקוחות בו־זמנית (בעיית C10K הידועה), זיכרון השרת אוזל, והמעבד מבזבז את מרבית זמנו על החלפות הקשר מרובות (Thrashing). מודל זה חשוף ביותר למתקפת <strong>מניעת שירות (DoS)</strong> באמצעות פתיחת חיבורים המונית.</li>
        <li><strong>מודל ריבוב קלט/פלט (I/O Multiplexing) ותבנית Reactor:</strong> במקום ליצור חוט לכל לקוח, חוט יחיד מנהל אלפי שקעים לא־חוסמים (<code>setblocking(False)</code>) בעזרת רכיב <strong>Selector</strong>. ה־Selector פונה למנגנון מובנה ויעיל ביותר של מערכת ההפעלה וממתין עד שאחד או יותר מהשקעים הופך למוכן לקריאה או לכתיבה.
          <br>מנגנוני הליבה במערכות הפעלה: <code>select()</code> (מנגנון ישן התומך בעד 1024 מתארים בסריקה ליניארית $O(N)$), לעומת מנגנונים מודרניים מונחי־אירועים בסיבוכיות $O(1)$: <code>epoll()</code> בלינוקס ו־<code>kqueue()</code> ב־macOS/BSD.</li>
      </ul>
      <p><strong>שרת לא־חוסם מבוסס Selector בפייתון:</strong></p>
      <pre class="code"><code>import selectors
import socket

# DefaultSelector בוחר אוטומטית במנגנון המהיר ביותר במערכת ההפעלה (epoll/kqueue)
sel = selectors.DefaultSelector()

def accept_new_client(server_sock, mask):
    """קבלת חיבור חדש ורישומו ב-Selector כשקע לא-חוסם"""
    conn, client_addr = server_sock.accept()
    print(f"Accepted client connection from {client_addr}")
    conn.setblocking(False) # קריטי: שקע לא-חוסם!
    # רישום השקע לאירוע קריאה בלבד עם פונקציית הטיפול המתאימה
    sel.register(conn, selectors.EVENT_READ, handle_client_data)

def handle_client_data(conn, mask):
    """קריאת נתונים מלקוח קיים ללא חסימת התוכנית"""
    try:
        data = conn.recv(1024)
        if data:
            # שידור תגובה
            conn.sendall(b"ACK: " + data)
        else:
            # כאשר recv מחזיר בתים ריקים, הלקוח סגר את החיבור (EOF)
            print("Client disconnected cleanly")
            sel.unregister(conn)
            conn.close()
    except ConnectionResetError:
        print("Client disconnected abruptly")
        sel.unregister(conn)
        conn.close()

# הקמת שרת ההאזנה
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind(("127.0.0.1", 8080))
server.listen(128)
server.setblocking(False) # שקע ההאזנה גם הוא אינו חוסם

# רישום שרת ההאזנה להמתנה לחיבורים נכנסים
sel.register(server, selectors.EVENT_READ, accept_new_client)
print("Event-driven Selector server running on port 8080...")

try:
    while True:
        # המתנה לאירועים: select חוזר רק כאשר יש שקעים מוכנים בפועל
        events = sel.select(timeout=1.0)
        for key, mask in events:
            callback = key.data
            callback(key.fileobj, mask)
except KeyboardInterrupt:
    print("Shutting down server cleanly...")
finally:
    sel.close()
    server.close()</code></pre>
      <div class="panel">
        <p><strong>עקרונות דפנסיביים קריטיים בארכיטקטורת ריבוב אירועים:</strong></p>
        <ul>
          <li><strong>אי־חסימת לולאת האירועים (Never Block the Event Loop):</strong> מכיוון שחוט יחיד משרת את כלל הלקוחות, אם פונקציית טיפול אחת תבצע פעולה חוסמת (כגון קריאה לקובץ כבד, שינה עם <code>sleep()</code>, או חישוב ממושך), <em>כל שאר הלקוחות יקפאו</em>! חישובים כבדים יש להעביר ל־Thread Pool נפרד.</li>
          <li><strong>הגבלת משאבים ו־Backpressure:</strong> ה־Selector כשלעצמו אינו מגן מפני מתקפת DoS. שרת עמיד מחייב: (1) הגבלת מספר החיבורים המקסימלי הפתוח בו־זמנית, (2) ניתוק חיבורים שקטים לאחר זמן קצוב (Idle Timeout), ו־(3) מנגנון <strong>לחץ חוזר (Backpressure)</strong> המאט או מפסיק לקרוא מלקוחות המציפים נתונים בקצב גבוה מכושר העיבוד.</li>
        </ul>
      </div>
    `,
  }
);
