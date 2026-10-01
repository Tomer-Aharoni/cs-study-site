UNIT5.sections.push(
  {
    id: "u5-sock",
    title: "שקע (socket): יצירה וטיפוסים",
    html: `
      <p><strong>שקע (socket)</strong> הוא קצה ערוץ שהמערכת נותנת לתוכנית, דומה לידית קובץ (file descriptor). ביוניקס/לינוקס:</p>
      <pre class="code"><code>#include &lt;sys/socket.h&gt;
int sockfd = socket(domain, type, protocol);</code></pre>
      <ul>
        <li><code>domain</code> — למשל <code>AF_INET</code> (IPv4) או <code>AF_INET6</code>.</li>
        <li><code>type</code> — <code>SOCK_STREAM</code> (TCP) או <code>SOCK_DGRAM</code> (UDP).</li>
        <li><code>protocol</code> — בדרך כלל 0 כדי שמערכת ההפעלה תבחר את פרוטוקול ברירת המחדל המתאים לצירוף domain/type; אפשר לציין במפורש, למשל <code>IPPROTO_TCP</code>.</li>
      </ul>
      <p>הערך המוחזר הוא מספר שלם. בדיקה דפנסיבית: ערך <strong>שלילי</strong> = כשל ביצירה. דוגמת המצגת בודקת <code>== 0</code> — זה שגוי: 0 הוא ידית חוקית, לפעמים של הקלט הסטנדרטי (<code>stdin</code>) — הזרם שממנו התוכנית קוראת הקלדה. ביוניקס בודקים <code>&lt; 0</code>.</p>
      <div class="panel">
        <p><strong>למה שקע.</strong> תוכנית לא "מדברת עם האינטרנט" ישירות. היא מבקשת מהמערכת קצה ערוץ — כמו לקבל שפופרת. <code>SOCK_STREAM</code> היא שיחה רציפה (TCP); <code>SOCK_DGRAM</code> היא גלויות (UDP). אחרי שיש שפופרת, לקוח מתקשר (<code>connect</code>) ושרת ממתין לצלצול (<code>bind</code>/<code>listen</code>/<code>accept</code>).</p>
      </div>
    `,
  },
  {
    id: "u5-client",
    title: "לקוח ב-C++: connect, send, read",
    html: `
      <p>הלקוח יוצר שקע, וממלא מבנה <code>sockaddr_in</code> — רשומה לכתובת IPv4: משפחת הכתובות, פורט אחרי <code>htons</code>, וכתובת ש־<code>inet_pton</code> ממיר מטקסט (למשל 127.0.0.1) לבתים. אחר כך <code>connect</code>, ואז <code>send</code> / <code>read</code> (או <code>recv</code>).</p>
      <pre class="code"><code>int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen);</code></pre>
      <p>זו קריאת מערכת — בקשה למערכת ההפעלה, לא פונקציה רגילה בקוד שלכם — שמתחילה חיבור אל כתובת IP ופורט של היעד. מערכת ההפעלה בוחרת בדרך כלל גם כתובת ופורט מקומיים אם הלקוח לא ביצע <code>bind</code>, כלומר לא קשר בעצמו כתובת מקומית. אחרי חיבור מוצלח שני הצדדים מחליפים זרם בתים.</p>
      <p>שלד לקוח, באותו סדר פעולות:</p>
      <ul>
        <li><code>socket(AF_INET, SOCK_STREAM, 0)</code></li>
        <li><code>serv_addr.sin_family = AF_INET</code>; <code>sin_port = htons(PORT)</code></li>
        <li><code>inet_pton(AF_INET, "127.0.0.1", &amp;serv_addr.sin_addr)</code> — כתובת לא חוקית → יציאה</li>
        <li><code>connect</code> — כשל → יציאה</li>
        <li><code>send</code> הודעה; <code>read</code> לחוצץ בגודל ידוע</li>
      </ul>
      <p>דפנסיבית: <code>send</code> עלול לשלוח רק חלק מהבתים, ו־<code>read</code>/<code>recv</code> מחזירים עד גודל החוצץ — לא "הודעה שלמה". החזרה 0 ב־TCP מציינת סגירה מסודרת מצד העמית; ערך שלילי הוא שגיאה. בונים לולאות שליחה/קבלה. אם הקריאה נקטעה לפני שהסתיימה, מנסים שוב. <strong>timeout</strong> מנתק כשאין התקדמות בזמן שנקבע. מסגור בפרוטוקול הוא אורך, מפריד, או הודעה בגודל קבוע. לא מתייחסים לחוצץ כמחרוזת שמסתיימת בתו <code>\0</code> בלי להוסיף את הסיום בתוך המקום שהוקצה. 127.0.0.1 הוא המחשב המקומי.</p>
    `,
  },
  {
    id: "u5-server",
    title: "שרת ב-C++: bind, listen, accept",
    html: `
      <p>רצף השרת במצגת (ובמצגת המשלימה): <code>socket</code> → לעיתים <code>setsockopt</code> → <code>bind</code> → <code>listen</code> → <code>accept</code> → <code>read</code>/<code>send</code>.</p>
      <ul>
        <li><code>setsockopt</code> — אפשרויות לשקע. המשמעות של <code>SO_REUSEADDR</code> ו־<code>SO_REUSEPORT</code> תלויה במערכת ההפעלה; אין להפעילן אוטומטית בלי להבין אם הן מאפשרות שיתוף כתובת לא רצוי.</li>
        <li><code>bind</code> — קושר שקע לכתובת ולפורט מקומיים. במצגת <code>INADDR_ANY</code> — כל ממשקי הרשת של המכונה. דפנסיבית: האזנה על כל הממשקים חושפת יותר מ־localhost.</li>
        <li><code>listen(sockfd, backlog)</code> — מעביר את השקע למצב פסיבי. <code>backlog</code> הוא בקשה למגבלת חיבורים ממתינים; מערכת ההפעלה רשאית לעגל או להגביל אותה, והמימוש עשוי לנהל יותר מתור אחד.</li>
        <li><code>accept</code> — שולף את הבקשה הראשונה מהתור. נוצר שקע <em>חדש</em> לשיחה עם הלקוח הזה; השקע המקורי ממשיך להאזין.</li>
      </ul>
      <p>הלקוח עושה connect בזמן שהשרת תקוע ב־accept (או בתור). אחרי accept: read מהלקוח, send תשובה.</p>
      <p>בדוגמת המצגת יש עוד שני באגים ללמוד מהם, לא להעתיק:</p>
      <ul>
        <li><code>accept(..., (socklen_t*)&amp;addlen)</code> — שם משתנה שגוי; הנכון <code>addrlen</code>. קוד שלא מתקמפל אינו שרת.</li>
        <li><code>read</code> אינו מוסיף אפס סיום, ו־<code>printf("%s", buffer)</code> מניחה מחרוזת C. מדפיסים לפי האורך שחזר, או מוסיפים <code>'\\0'</code> בתחום שהוקצה אחרי בדיקת האורך.</li>
      </ul>
    `,
  },
  {
    id: "u5-boost",
    title: "Boost כספריות C++ לתקשורת",
    html: `
      <p>המצגת מפנה לאתר <code>boost.org</code>: אוסף ספריות קוד פתוח מובילות ב־C++, המשמשות בסיס לרבות מההרחבות בתקן הרשמי של השפה. בסביבת Visual Studio מתקינים אותן בקלות דרך מנהל החבילות <strong>NuGet</strong>. בתחום התקשורת בקורס, ספריית <strong>Boost.Asio</strong> (Asynchronous Input/Output) היא התשתית המודרנית לכתיבת יישומי רשת מונחי־עצמים, ברמה גבוהה ובטוחה בהרבה מעל ה־API המסורתי של מערכת ההפעלה, והיא מופיעה בשאלות בחינה (כגון 2026א, שאלה 8).</p>
      <p><strong>למה Boost.Asio במקום ה־API הגולמי של שקעים?</strong> ב־API הישן (Berkeley Sockets) נדרשנו לבצע סדרת קריאות נפרדות, מסורבלות ורוויות באגים פוטנציאליים: <code>socket</code>, <code>setsockopt</code>, מילוי מבנה כתובת, <code>bind</code>, <code>listen</code>, ולבסוף <code>accept</code>, תוך בדיקת קודי שגיאה שליליים בכל צעד וניהול ידני של סגירת השקע. Boost.Asio מפשטת ומאבטחת את התהליך:</p>
      <ul>
        <li><code>boost::asio::io_context</code> — <strong>מנוע הקלט/פלט המרכזי:</strong> האובייקט שדרכו מתווכים מול מנגנוני התקשורת של מערכת ההפעלה. הוא אחראי על ניתוב כל פעולות התקשורת (הן הסינכרוניות והן האסינכרוניות).</li>
        <li><strong>צד השרת (Server) — המחלקה <code>tcp::acceptor</code>:</strong> יתרונה הגדול הוא <strong>איגוד שלבי ההקמה לאובייקט יחיד!</strong> הקונסטרקטור של ה־<code>acceptor</code> מאגד בתוכו את כל שלבי ה־<code>socket()</code>, ה־<code>bind()</code> וה־<code>listen()</code> יחד עם הגדרת הכתובת והפורט (ה־<code>endpoint</code>). קריאה יחידה למתודה <code>accept()</code> ממתינה לחיבור ומחזירה ישירות אובייקט <code>tcp::socket</code> מחובר ומוכן לשיחה.</li>
        <li><strong>צד הלקוח (Client) — המחלקה <code>tcp::resolver</code>:</strong> מתרגמת שמות מארח ופורטים לכתובות רשת (נקודות קצה / Endpoints), שלאחריהן מתבצע החיבור באמצעות <code>boost::asio::connect</code>.</li>
        <li><strong>קריאה וכתיבה מוגנות:</strong> פונקציות כמו <code>boost::asio::read</code>, <code>boost::asio::write</code> ו־<code>socket.read_some</code> פועלות יחד עם מעטפת הזיכרון <code>boost::asio::buffer</code> — המונעת גלישות חוצץ על ידי הצמדת גודל המערך למצביע.</li>
      </ul>
      <pre class="code"><code>#include &lt;boost/asio.hpp&gt;
#include &lt;iostream&gt;

using boost::asio::ip::tcp;

// שרת בסיסי ומודרני ב-Boost.Asio:
void run_server(int port) {
    // 1. יצירת מנוע הקלט/פלט של הספרייה
    boost::asio::io_context io_context;

    // 2. ה-acceptor מאגד socket, bind ו-listen בשורה אחת:
    tcp::acceptor acceptor(io_context, tcp::endpoint(tcp::v4(), port));

    // 3. המתנה לחיבור לקוח והחזרת שקע מוכן לעבודה:
    tcp::socket socket = acceptor.accept(); // קריאה חוסמת עד הגעת לקוח

    // 4. קריאה וכתיבה בטוחות דרך מעטפת buffer:
    char data[1024];
    size_t length = socket.read_some(boost::asio::buffer(data));
    boost::asio::write(socket, boost::asio::buffer(data, length));
}</code></pre>
      <p><strong>יתרונות דפנסיביים של Boost.Asio:</strong></p>
      <ul>
        <li><strong>ניהול משאבים אוטומטי (RAII, Resource Acquisition Is Initialization):</strong> השקעים והחיבורים נסגרים אוטומטית בהריסת האובייקט (בדסטרקטור) ברגע שהם יוצאים מטווח ההגדרה (Scope). מנגנון זה מונע לחלוטין דליפת מתארי קבצים (File Descriptors) במערכת ההפעלה גם במקרה של שגיאה או יציאה מוקדמת.</li>
        <li><strong>טיפול מובנה בשגיאות באמצעות חריגות (Exceptions):</strong> במקום להסתמך על בדיקות שבירות של קודי החזרה שליליים שקל לשכוח, פעולות שנכשלות זורקות חריגה מסוג <code>boost::system::system_error</code> שניתן לטפל בה בצורה מסודרת בבלוק <code>try...catch</code>.</li>
      </ul>
      <p><strong>ספריות הצפנה משלימות:</strong> תקן שפת C++ אינו כולל אלגוריתמי הצפנה מובנים. כאשר נדרש ערוץ תקשורת מאובטח ומוצפן, משתמשים בספריות ייעודיות מוכחות — לעולם אין לממש אלגוריתם קריפטוגרפי לבד! במצגת המשלימה מודגשות <strong>OpenSSL</strong> (מימוש תקני ונפוץ ביותר של TLS ושל צפנים) ו־<strong>Crypto++</strong> (ספריית C++ עשירה לאלגוריתמים קריפטוגרפיים, המוזכרת בחומרי הקורס).</p>
    `,
  },
  {
    id: "u5-pysock",
    title: "שקעים בפייתון, ומה לבדוק",
    html: `
      <p>מודול <code>socket</code>. לקוח טיפוסי: יוצרים שקע ב־<code>with</code> (סוגר לבד), מגדירים timeout מתאים, קוראים ל־<code>connect((HOST, PORT))</code>, משתמשים ב־<code>sendall</code> לשליחת כל הבתים, וקוראים ל־<code>recv</code> בלולאה לפי מסגור הפרוטוקול.</p>
      <pre class="code"><code>import socket
HOST = "127.0.0.1"
PORT = 65432
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.settimeout(5)
    s.connect((HOST, PORT))
    s.sendall(b"Hello, world")
    data = s.recv(1024)
print("Received", repr(data))</code></pre>
      <p>הדוגמה קוראת מקטע אחד בלבד לצורך פשטות. <code>recv(1024)</code> מחזיר לכל היותר 1024 בתים, ועשוי להחזיר פחות גם כשהשולח שלח יותר בקריאה אחת. בפרוטוקול אמיתי ממשיכים עד שהתקבל האורך שהוגדר או עד מפריד תקין, עם תקרת גודל.</p>
      <p>נקודות דפנסיביות במצגת:</p>
      <ul>
        <li>שגיאות ב־<code>try</code>/<code>except</code> (חיבור סורב, timeout).</li>
        <li>האם הפורט פתוח בשרת — אחרת החיבור ייכשל; זה לא "ניסור פורטים" כתרגיל תקיפה, אלא בדיקת תצורה של השירות שלכם.</li>
        <li>האם השרת מצפה לאורך הודעה מתאים — פער אורך = באג פרוטוקול או חוצץ.</li>
        <li>לסגור במפורש (<code>close</code>) אם לא משתמשים ב־<code>with</code>.</li>
      </ul>
      <p>שרת פייתון מקביל לרצף C++: <code>bind</code> → <code>listen</code> → <code>accept</code>. המצגת מראה בעיקר לקוח; זה השלמה לפי יעדי היחידה.</p>
      <pre class="code"><code>import socket
HOST = "127.0.0.1"
PORT = 65432
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as srv:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind((HOST, PORT))
    srv.listen(1)
    conn, addr = srv.accept()
    with conn:
        conn.settimeout(5)
        data = conn.recv(1024)
        conn.sendall(b"ok")</code></pre>
      <p><code>listen(1)</code> הוא backlog קטן לדוגמה; בייצור קובעים תקרה במודע. <code>recv</code> עדיין עשוי להחזיר חלק — מסגור ותקרת גודל חלים גם כאן. 127.0.0.1 הוא רק המחשב הזה. <code>0.0.0.0</code>, כמו <code>INADDR_ANY</code>, פירושו האזנה על כל כרטיסי הרשת, ולכן משטח חשיפה גדול יותר.</p>
    `,
  },
  {
    id: "u5-frame",
    title: "מסגור (Framing) מעל זרם בתים של TCP",
    html: `
      <p><strong>הבעיה המרכזית ב־TCP: זרם בתים (Byte Stream) ללא גבולות הודעה.</strong> פרוטוקול TCP מבטיח שהנתונים יימסרו במלואם ולפי הסדר, אך הוא מתייחס לנתונים כאל זרם רציף של בתים (Byte Stream). ל־TCP אין שום מושג היכן "הודעה" אחת מתחילה והיכן היא מסתיימת.</p>
      <div class="panel">
        <p><strong>אנלוגיית צינור המים:</strong> דמיינו שאתם שופכים שלוש כוסות מים מובחנות בזו אחר זו לתוך צינור גינה ארוך. בקצה השני של הצינור המים יזרמו כסילון רציף אחד. המקבל בצד השני אינו רואה "שלוש כוסות", אלא רק זרם מים רציף! אם הוא יפתח דלי ל־2 שניות, הוא עשוי לתפוס כוס וחצי, חצי כוס, או שתי כוסות יחד.</p>
      </div>
      <p><strong>המלכודת הקריטית בבחינה ובפיתוח:</strong> קריאה בודדת לפונקציה <code>sock.recv(2048)</code> <strong>אינה מבטיחה קבלת הודעה שלמה!</strong> ברשת עלולים להתרחש שני תרחישים שכיחים:</p>
      <ul>
        <li><strong>קריאה חלקית (Partial Read):</strong> ביקשתם 2048 בתים, אך מערכת ההפעלה החזירה כרגע רק 150 בתים, מכיוון ששאר החבילה עדיין בדרך. אם תנסו לפענח את 150 הבתים כאילו הם ההודעה כולה — התוכנית תקרוס!</li>
        <li><strong>התמזגות חבילות (Packet Coalescing):</strong> השולח קרא פעמיים ברצף ל־<code>send</code> עם שתי הודעות נפרדות, אך כרטיס הרשת איחד אותן למקטע TCP יחיד. קריאת <code>recv</code> אחת תחזיר את שתי ההודעות צמודות יחד.</li>
      </ul>
      <p><strong>הפתרון: מסגור (Framing) בשכבת היישום.</strong> מכיוון ש־TCP אינו תוחם הודעות, שכבת היישום (Application Layer) חייבת להגדיר פרוטוקול מסגור (Framing) המאפשר למקבל לחלץ הודעות מובחנות מתוך הזרם. שלוש שיטות המסגור הנפוצות הן: (1) תו מפריד (Delimiter כגון <code>\\n</code>), (2) אורך קבוע לכל הודעה, או (3) <strong>כותרת מקדימה עם שדה אורך (Length-Prefixed Header)</strong> — זוהי השיטה הנדרשת במטלת הקורס ובבחינות.</p>
      <h3>פרוטוקול הכותרת בת 12 בתים (Big-Endian)</h3>
      <p>במטלת הקורס ובשאלות מבחן מתקדמות (כגון 2025ג מועד ג), מגדירים חבילה בעלת <strong>כותרת קבועה בת 12 בתים</strong>, המורכבת משלושה שדות של 4 בתים (32 סיביות ללא סימן) בפורמט Network Byte Order (Big-Endian):</p>
      <ol>
        <li><strong>מספר החבילה (Packet Number / ID):</strong> 4 בתים — מספור סידורי (0, 1, 2...).</li>
        <li><strong>סך כל החבילות (Total Packets):</strong> 4 בתים — לכמה חבילות פוצל הקובץ/המסר.</li>
        <li><strong>אורך המטען (Payload Length):</strong> 4 בתים — כמות הבתים של הנתונים האמיתיים בחבילה הנוכחית.</li>
      </ol>
      <p><strong>אלגוריתם הקליטה הנכון (4 שלבים):</strong></p>
      <ol>
        <li><strong>קריאת הכותרת במלואה:</strong> קוראים בלולאה <em>בדיוק 12 בתים</em> באמצעות פונקציית עזר <code>receive_exact</code>.</li>
        <li><strong>פענוח הכותרת:</strong> מפענחים את 12 הבתים באמצעות <code>struct.unpack("!III", header)</code> — הסימן <code>!</code> מציין סדר רשת (Big-Endian), ו־<code>III</code> מציין שלושה מספרים שלמים של 4 בתים (32 סיביות).</li>
        <li><strong>בדיקה דפנסיבית נגד DoS:</strong> בודקים ששדה האורך אינו עולה על תקרת הגודל המקסימלית המותרת (<code>MAX_PAYLOAD</code>). ללא בדיקה זו, תוקף יכול לשלוח אורך זדוני של 4GB ולגרום לשרת לקרוס ממצוקת זיכרון!</li>
        <li><strong>קריאת המטען:</strong> קוראים בלולאה <em>בדיוק <code>size</code> בתים</em> לתוך חוצץ המטען.</li>
      </ol>
      <pre class="code"><code>import socket
import struct

def receive_exact(sock, n):
    """פונקציית עזר המבטיחה לקרוא בדיוק n בתים מזרם ה-TCP בלולאה"""
    buffer = bytearray()
    while len(buffer) &lt; n:
        chunk = sock.recv(n - len(buffer))
        if not chunk:
            raise ConnectionError("החיבור נסגר במפתיע על ידי הצד השני")
        buffer.extend(chunk)
    return bytes(buffer)

def parse_framed_message(sock, max_payload=2036):
    # שלב 1: קריאת כותרת קבועה בת 12 בתים
    header_bytes = receive_exact(sock, 12)

    # שלב 2: פענוח בפורמט Network Byte Order (Big-Endian)
    pkt_id, total_pkts, payload_len = struct.unpack("!III", header_bytes)

    # שלב 3: אימות דפנסיבי למניעת מתקפת מיצוי זיכרון (DoS)
    if payload_len &gt; max_payload:
        raise ValueError(f"Payload size {payload_len} exceeds limit of {max_payload}")

    # שלב 4: קריאת המטען במדויק לפי האורך שחולץ מהכותרת
    payload = receive_exact(sock, payload_len)

    return pkt_id, total_pkts, payload</code></pre>
      <div class="panel">
        <p><strong>הבהרת חישוב גודל החבילה (מצגת המרצה מול מבחן 2025ג):</strong></p>
        <ul>
          <li><strong>במצגת הרשמית:</strong> גודל החבילה הכולל (Header + Payload) מוגבל ל־2048 בתים. לכן גודל המטען המקסימלי הוא <code>DATA_SIZE = 2048 - 12 = 2036</code> בתים.</li>
          <li><strong>בשחזור מבחן 2025ג מועד ג:</strong> הוגדר שהנתונים עצמם מפוצלים למנות של עד 2048 בתים (למשל קובץ של 5120 בתים פוצל ל־2048, 2048, ו־1024), ועליהם נוספה הכותרת בת 12 הבתים.</li>
          <li><strong>המלצה למבחן:</strong> שתי הגישות תקינות. הגדירו קבוע ברור בקוד (כמו <code>PACKET_SIZE = 2048</code> או <code>DATA_SIZE = 2048</code>) והוסיפו הערה קצרה על כוונתכם.</li>
        </ul>
      </div>
      <h3>שאלת תרגול לבחינה</h3>
      <p>מדוע קריאת <code>recv(1024)</code> בלבד אינה מספיקה לקליטת הודעה ב־TCP, וכיצד שיטת המסגור באמצעות כותרת 12 בתים פותרת את הבעיה?</p>
      <details class="fold"><summary>💡 רמז לפתרון</summary><div class="fold-body"><p>התייחסו להבדל בין זרם בתים (Byte Stream) לבין גבולות הודעה (Message Boundaries), ולצורך בלולאת <code>receive_exact</code> סביב <code>recv</code>.</p></div></details>
      <details class="fold"><summary>פתרון מפורט ודרך חישוב</summary><div class="fold-body">
        <p><strong>תשובה מלאה:</strong></p>
        <ol>
          <li><strong>אופי הזרם ב־TCP:</strong> פרוטוקול TCP מספק זרם בתים רציף ללא שימור גבולות ההודעה שנשלחו ב־<code>send</code>. קריאת <code>recv(1024)</code> תחזיר כל כמות בתים שזמינה כרגע בחוצץ המערכת (בין 1 ל־1024), ועלולה לקרוא הודעה חלקית (Partial Read) או מספר הודעות שהתמזגו יחד (Packet Coalescing).</li>
          <li><strong>פתרון המסגור:</strong> שכבת היישום מגדירה כותרת קבועה של 12 בתים המכילה את אורך המטען (Payload Length) ב־Big-Endian. המקבל מריץ לולאת קריאה מדויקת (<code>receive_exact</code>) שמבטיחה לקבל תחילה בדיוק 12 בתים, מפענח באמצעות <code>struct.unpack("!III", ...)</code>, בודק שהאורך תקין, ולאחר מכן מפעיל שוב את הלולאה כדי לקרוא בדיוק את כמות הבתים של המטען.</li>
        </ol>
      </div></details>
    `,
  }
);
