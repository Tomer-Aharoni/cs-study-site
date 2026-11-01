UNIT5.sections.push(
  {
    id: "u5-sock",
    title: "שקע (socket): יצירה וטיפוסים",
    html: `
      <p><strong>שקע תקשורת (Socket):</strong> הפשטה שמספקת מערכת ההפעלה המהווה נקודת קצה (Endpoint) דו־כיוונית להעברת נתונים בין תוכניות ברשת. במערכות הפעלה מבוססות Unix/Linux, שבהן מתקיים העיקרון "הכול הוא קובץ" (Everything is a file), שקע מיוצג בתוכנית באמצעות <strong>מתאר קובץ (File Descriptor)</strong> — מספר שלם פשוט המשמש מפתח בטבלת הקבצים הפתוחים של התהליך.</p>
      <p>יצירת שקע מתבצעת באמצעות קריאת המערכת <code>socket</code> (מוגדרת ב־<code>&lt;sys/socket.h&gt;</code> בלינוקס וב־<code>&lt;winsock2.h&gt;</code> בחלונות):</p>
      <pre class="code"><code>#include &lt;sys/socket.h&gt;
int sockfd = socket(int domain, int type, int protocol);</code></pre>
      <p><strong>פירוט הפרמטרים:</strong></p>
      <ul>
        <li><code>domain</code> (משפחת הכתובות / Address Family) — מגדיר את פרוטוקול השכבה השלישית. הערכים הנפוצים: <code>AF_INET</code> עבור כתובות IPv4 (32 סיביות), <code>AF_INET6</code> עבור IPv6 (128 סיביות), ו־<code>AF_UNIX</code> (או <code>AF_LOCAL</code>) עבור תקשורת פנים־מחשבית מהירה בין תהליכים באותו מחשב (IPC).</li>
        <li><code>type</code> (טיפוס הערוץ) — מגדיר את אופי התקשורת בשכבת התובלה:
          <ul>
            <li><code>SOCK_STREAM</code> — ערוץ מבוסס זרם בתים אמין, מכוון־חיבור ומסודר (פרוטוקול <strong>TCP</strong>).</li>
            <li><code>SOCK_DGRAM</code> — שידור מנות מידע בדידות (Datagrams) ללא חיבור, ללא הבטחת הגעה או סדר (פרוטוקול <strong>UDP</strong>).</li>
          </ul>
        </li>
        <li><code>protocol</code> — הפרוטוקול הספציפי. בדרך כלל מעבירים <code>0</code>, ומערכת ההפעלה בוחרת אוטומטית את הפרוטוקול המתאים לפי שילוב ה־domain וה־type (למשל, עבור <code>AF_INET</code> ו־<code>SOCK_STREAM</code> ייבחר <code>IPPROTO_TCP</code>).</li>
      </ul>
      <div class="panel">
        <p><strong>מוקש בחינה קריטי — בדיקת שגיאות ביצירת שקע:</strong></p>
        <p>קריאת המערכת <code>socket</code> מחזירה מספר שלם אי־שלילי בעת הצלחה (המתאר של השקע), או <code>-1</code> במקרה של כשל (ומעדכנת את משתנה השגיאה הגלובלי <code>errno</code>).</p>
        <p><strong>המלכודת:</strong> בדיקה כגון <code>if (sockfd == 0)</code> היא <strong>שגויה לחלוטין!</strong> במערכות יוניקס, המספר 0 הוא מתאר קובץ חוקי ותקין — הוא מייצג את הקלט הסטנדרטי (<code>stdin</code>). אם הקלט הסטנדרטי נסגר מוקדם יותר, ייתכן שהשקע החדש יקבל דווקא את הערך 0! הבדיקה הדפנסיבית היחידה הנכונה היא בדיקת ערך שלילי:</p>
        <pre class="code"><code>if (sockfd &lt; 0) {
    perror("socket creation failed");
    exit(EXIT_FAILURE);
}</code></pre>
      </div>
      <div class="panel">
        <p><strong>למה שקע? (אנלוגיית שפופרת הטלפון):</strong> תוכנית מחשב אינה "מדברת ישירות עם הכבל". היא מבקשת ממערכת ההפעלה שפופרת טלפון (השקע). עבור <code>SOCK_STREAM</code> (TCP), הלקוח מחייג (<code>connect</code>) והשרת מרים את השפופרת (<code>accept</code>) כדי לנהל שיחה רציפה; עבור <code>SOCK_DGRAM</code> (UDP), אין חיוג — אלא שליחת גלויות דואר לכתובת היעד.</p>
      </div>
    `,
  },
  {
    id: "u5-client",
    title: "לקוח ב-C++: connect, send, read",
    html: `
      <p>בניית לקוח TCP ב־C++ דורשת רצף מדויק של שלבים מול ממשק מערכת ההפעלה: יצירת השקע, אתחול כתובת היעד, התחברות לשרת, והחלפת נתונים דפנסיבית.</p>
      <p><strong>מבנה הכתובת <code>sockaddr_in</code>:</strong> רשומה מובנית במערכת ההפעלה המגדירה כתובת יעד של IPv4. כוללת את משפחת הכתובות (<code>sin_family = AF_INET</code>), את מספר הפורט שהומר לסדר רשת באמצעות <code>htons(PORT)</code>, ואת כתובת ה־IP בפורמט בינארי. הפונקציה <code>inet_pton</code> (Presentation to Network) ממירה מחרוזת כתובת קריאה (כגון <code>"127.0.0.1"</code> — כתובת ה־Loopback המקומית) למבנה בינארי ברשת.</p>
      <p><strong>קריאת המערכת <code>connect</code>:</strong></p>
      <pre class="code"><code>int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen);</code></pre>
      <p>קריאה זו יוזמת את תהליך לחיצת היד המשולשת של TCP (<span dir="ltr">SYN, SYN-ACK, ACK</span>) מול השרת בכתובת ובפורט שצוינו. מערכת ההפעלה מקצה ללקוח פורט מקומי זמני (Ephemeral Port). אם החיבור נכשל (למשל, אין שרת שמאזין בפורט זה), הפונקציה מחזירה <code>-1</code>.</p>
      <p><strong>דוגמת קוד מקורית ומלאה — לקוח TCP דפנסיבי ב־C++:</strong></p>
      <pre class="code"><code>#include &lt;iostream&gt;
#include &lt;cstring&gt;
#include &lt;unistd.h&gt;
#include &lt;arpa/inet.h&gt;
#include &lt;sys/socket.h&gt;

const char* SERVER_IP = "127.0.0.1";
const int SERVER_PORT = 9050;
const int BUFFER_SIZE = 1024;

int main() {
    // שלב 1: יצירת שקע TCP
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd &lt; 0) {
        std::cerr &lt;&lt; "Error: socket creation failed\\n";
        return 1;
    }

    // שלב 2: הגדרת כתובת שרת היעד
    struct sockaddr_in serv_addr;
    std::memset(&amp;serv_addr, 0, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(SERVER_PORT); // חובה: המרה לסדר רשת (Big-Endian)!

    if (inet_pton(AF_INET, SERVER_IP, &amp;serv_addr.sin_addr) &lt;= 0) {
        std::cerr &lt;&lt; "Error: invalid address format\\n";
        close(sockfd);
        return 1;
    }

    // שלב 3: התחברות לשרת
    if (connect(sockfd, (struct sockaddr*)&amp;serv_addr, sizeof(serv_addr)) &lt; 0) {
        std::cerr &lt;&lt; "Error: connection to server failed\\n";
        close(sockfd);
        return 1;
    }
    std::cout &lt;&lt; "Connected successfully to " &lt;&lt; SERVER_IP &lt;&lt; ":" &lt;&lt; SERVER_PORT &lt;&lt; "\\n";

    // שלב 4: שליחת הודעה בצורה דפנסיבית
    const char* message = "QUERY_STATUS\\n";
    size_t total_sent = 0;
    size_t msg_len = std::strlen(message);

    // לולאת שליחה מלאה המגינה מפני שליחה חלקית (Partial Write)
    while (total_sent &lt; msg_len) {
        ssize_t sent = send(sockfd, message + total_sent, msg_len - total_sent, 0);
        if (sent &lt;= 0) {
            std::cerr &lt;&lt; "Error: send failed\\n";
            close(sockfd);
            return 1;
        }
        total_sent += sent;
    }

    // שלב 5: קריאת תשובה מהשרת
    char response[BUFFER_SIZE];
    ssize_t bytes_read = recv(sockfd, response, BUFFER_SIZE - 1, 0);
    if (bytes_read &lt; 0) {
        std::cerr &lt;&lt; "Error: recv failed\\n";
    } else if (bytes_read == 0) {
        std::cout &lt;&lt; "Server closed connection cleanly (EOF)\\n";
    } else {
        // מוקש אבטחה: recv אינו שם תו סיום מחרוזת '\\0'! חובה להוסיף ידנית:
        response[bytes_read] = '\\0';
        std::cout &lt;&lt; "Server response: " &lt;&lt; response &lt;&lt; "\\n";
    }

    // שלב 6: סגירת השקע ושחרור המשאב
    close(sockfd);
    return 0;
}</code></pre>
      <div class="panel">
        <p><strong>דגשים דפנסיביים קריטיים בקוד לקוח:</strong></p>
        <ul>
          <li><strong>שליחה חלקית (Partial Write):</strong> הקריאה ל־<code>send</code> אינה מבטיחה שכל הבתים נשלחו! אם חוצץ מערכת ההפעלה מלא, <code>send</code> עשויה לשלוח רק חלק מהבתים. חובה לממש לולאת שליחה (כמו בלולאת <code>while (total_sent &lt; msg_len)</code> למעלה).</li>
          <li><strong>משמעות ערך ההחזרה של <code>recv</code> / <code>read</code>:</strong>
            <ul>
              <li>ערך <strong>גדול מ־0</strong>: כמות הבתים שנקראו בפועל.</li>
              <li>ערך <strong>בדיוק 0</strong>: סגירה מסודרת של החיבור על ידי הצד השני (מקטע TCP FIN / סיום קובץ EOF). זה אינו כשל, אלא אינדיקציה שהעמית סיים לשדר.</li>
              <li>ערך <strong>שלילי (1-)</strong>: כשל או שגיאה בתקשורת.</li>
            </ul>
          </li>
          <li><strong>סכנת אי־סיום מחרוזת C:</strong> הפונקציות <code>recv</code> ו־<code>read</code> עובדות עם בתים גולמיים ולעולם אינן שמות תו <code>'\\0'</code> בסוף. הדפסת החוצץ עם <code>printf("%s")</code> ללא הוספת <code>'\\0'</code> תגרום לקריאת זיכרון בלתי חוקית מעבר לגבולות החוצץ (Buffer Over-read)!</li>
        </ul>
      </div>
    `,
  },
  {
    id: "u5-server",
    title: "שרת ב-C++: bind, listen, accept",
    html: `
      <p>שרת TCP פועל במודל פסיבי: הוא מקים שקע האזנה, קושר אותו לפורט מקומי, ממתין לבקשות חיבור מלקוחות, ומטפל בהן. סדר הפעולות המחייב ב־C++:</p>
      <p><span dir="ltr"><code>socket</code> → <code>setsockopt (SO_REUSEADDR)</code> → <code>bind</code> → <code>listen</code> → <code>accept</code> → <code>recv/send</code> → <code>close</code></span></p>
      <p><strong>פירוט פונקציות השרת ותפקידן:</strong></p>
      <ul>
        <li><code>setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, ...)</code> — מאפשרת לשקע לקשור את הפורט מחדש מיד לאחר הפעלה מחדש של השרת. ללא אפשרות זו, אם השרת הופסק, הפורט נותר במצב <code>TIME_WAIT</code> למשך 1–2 דקות, וניסיון הרצה מיידי ייכשל בשגיאת "Address already in use".</li>
        <li><code>bind</code> — קושרת את השקע לכתובת IP ולפורט מקומיים במחשב. שימוש ב־<code>INADDR_ANY</code> (<code>0.0.0.0</code>) מורה למערכת להאזין בכל ממשקי הרשת של המכונה (כולל כתובות ציבוריות וכרטיסי Wi-Fi); שימוש ב־<code>127.0.0.1</code> מגביל את ההאזנה לחיבורים מקומיים בלבד (משטח תקיפה מצומצם).</li>
        <li><code>listen(sockfd, backlog)</code> — מעבירה את השקע ממצב אקטיבי למצב האזנה פסיבי. הפרמטר <code>backlog</code> קובע את האורך המקסימלי של תור החיבורים הממתינים שהשלימו לחיצת יד של TCP אך טרם נשלפו על ידי <code>accept</code>.</li>
        <li><code>accept(sockfd, (struct sockaddr*)&amp;client_addr, &amp;addrlen)</code> — <strong>קריאה חוסמת</strong> השולפת את בקשת החיבור הראשונה מהתור. <strong>הנקודה החשובה ביותר:</strong> <code>accept</code> מחזירה שקע <em>חדש לחלוטין</em> (מתאר קובץ חדש) המוקדש לשיחה הבלעדית מול הלקוח הספציפי שהתחבר! השקע המקורי (<code>sockfd</code>) נשאר פתוח וממשיך להאזין לחיבורים נוספים.</li>
      </ul>
      <p><strong>דוגמת קוד מקורית ומלאה — שרת TCP ב־C++:</strong></p>
      <pre class="code"><code>#include &lt;iostream&gt;
#include &lt;cstring&gt;
#include &lt;unistd.h&gt;
#include &lt;arpa/inet.h&gt;
#include &lt;sys/socket.h&gt;

const int LISTEN_PORT = 9050;
const int BACKLOG = 10;
const int BUFFER_SIZE = 1024;

int main() {
    // 1. יצירת שקע האזנה
    int listen_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (listen_fd &lt; 0) {
        perror("socket failed");
        return 1;
    }

    // 2. הגדרת SO_REUSEADDR למניעת שגיאת "Address already in use" בעת אתחול מהיר
    int opt = 1;
    if (setsockopt(listen_fd, SOL_SOCKET, SO_REUSEADDR, &amp;opt, sizeof(opt)) &lt; 0) {
        perror("setsockopt failed");
        close(listen_fd);
        return 1;
    }

    // 3. הגדרת כתובת וקשירה (bind)
    struct sockaddr_in serv_addr;
    std::memset(&amp;serv_addr, 0, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_addr.s_addr = htonl(INADDR_ANY); // האזנה בכל הממשקים המקומיים
    serv_addr.sin_port = htons(LISTEN_PORT);

    if (bind(listen_fd, (struct sockaddr*)&amp;serv_addr, sizeof(serv_addr)) &lt; 0) {
        perror("bind failed");
        close(listen_fd);
        return 1;
    }

    // 4. מעבר למצב האזנה
    if (listen(listen_fd, BACKLOG) &lt; 0) {
        perror("listen failed");
        close(listen_fd);
        return 1;
    }
    std::cout &lt;&lt; "Server listening on port " &lt;&lt; LISTEN_PORT &lt;&lt; "...\\n";

    // 5. קבלת חיבור לקוח (accept)
    struct sockaddr_in client_addr;
    socklen_t client_len = sizeof(client_addr); // חובה לאתחל את האורך לפני הקריאה!

    int client_fd = accept(listen_fd, (struct sockaddr*)&amp;client_addr, &amp;client_len);
    if (client_fd &lt; 0) {
        perror("accept failed");
        close(listen_fd);
        return 1;
    }

    char client_ip[INET_ADDRSTRLEN];
    inet_ntop(AF_INET, &amp;client_addr.sin_addr, client_ip, sizeof(client_ip));
    std::cout &lt;&lt; "Client connected from " &lt;&lt; client_ip &lt;&lt; ":" &lt;&lt; ntohs(client_addr.sin_port) &lt;&lt; "\\n";

    // 6. קריאת הודעה מהלקוח
    char buffer[BUFFER_SIZE];
    ssize_t bytes_received = recv(client_fd, buffer, sizeof(buffer) - 1, 0);
    if (bytes_received &gt; 0) {
        buffer[bytes_received] = '\\0'; // סיום מחרוזת בטוח
        std::cout &lt;&lt; "Received command: " &lt;&lt; buffer &lt;&lt; "\\n";

        // שליחת תגובה ללקוח
        const char* response = "STATUS_OK: SYSTEM_HEALTHY\\n";
        send(client_fd, response, std::strlen(response), 0);
    }

    // 7. שחרור משאבים: חובה לסגור הן את שקע הלקוח והן את שקע ההאזנה
    close(client_fd);
    close(listen_fd);
    std::cout &lt;&lt; "Connection closed cleanly.\\n";
    return 0;
}</code></pre>
      <div class="panel">
        <p><strong>מוקשי בחינה קלאסיים בקוד שרת C++:</strong></p>
        <ol>
          <li><strong>מלכודת ארגומנט ה־<code>addrlen</code> ב־<code>accept</code>:</strong> הפרמטר השלישי הוא מצביע למשתנה מסוג <code>socklen_t</code> שחייב להיות מאותחל ל־<code>sizeof(client_addr)</code> <em>לפני</em> הקריאה (זהו Value-Result Argument). טעויות נפוצות במבחנים כוללות העברת מצביע לא מאותחל, העברת שם משתנה שגוי (כגון <code>addlen</code>), או העברת ערך ישיר ולא מצביע — מה שמונע קומפילציה או גורם להתנהגות בלתי צפויה.</li>
          <li><strong>דליפת מתארי קבצים (File Descriptor Leak):</strong> עבור כל לקוח שמתחבר, נוצר שקע נפרד (<code>client_fd</code>). אם בסיום השיחה לא קוראים ל־<code>close(client_fd)</code>, מתארי הקבצים של מערכת ההפעלה אוזלים במהירות והשרת מפסיק לקבל חיבורים חדשים!</li>
        </ol>
      </div>
    `,
  },
  {
    id: "u5-boost",
    title: "Boost כספריות C++ לתקשורת",
    html: `
      <p>ספריות <strong>Boost</strong> (זמינות ב־<code>boost.org</code>) הן אוסף ספריות קוד פתוח מובילות ומוערכות ב־C++, המשמשות באופן מסורתי כר פיתוח ובדיקה להצעות המאומצות לאחר מכן בתקן הרשמי של השפה (ISO C++). בסביבת הפיתוח Visual Studio מתקינים אותן ישירות דרך מנהל החבילות <strong>NuGet</strong> (או דרך <code>vcpkg</code>). בעולם התקשורת והרשתות, ספריית <strong>Boost.Asio</strong> (Asynchronous Input/Output) היא התשתית הסטנדרטית והמודרנית לכתיבת יישומי רשת מונחי־עצמים, מאובטחים ובעלי ביצועים גבוהים, בהשוואה ל־API המסורתי של מערכת ההפעלה.</p>
      <p><strong>מדוע להשתמש ב־Boost.Asio במקום ב־API הגולמי של שקעים?</strong> ב־API הישן (Berkeley Sockets) נדרש רצף של קריאות מערכת ברמה נמוכה: <span dir="ltr"><code>socket</code>, <code>setsockopt</code></span>, מילוי מבני כתובות C גולמיים, <span dir="ltr"><code>bind</code>, <code>listen</code></span>, ו־<code>accept</code> — תוך סכנה מתמדת לדליפת מתארי קבצים, שגיאות המרת בתים, ובדיקות ערכי החזרה שליליים שקל לפספס. Boost.Asio עוטפת את כל הפעולות הללו במבנה מודרני מונחה־עצמים:</p>
      <ul>
        <li><code>boost::asio::io_context</code> — <strong>מנוע הקלט/פלט המרכזי:</strong> מנהל את ערוץ התקשורת מול מערכת ההפעלה, מפעיל את לולאת האירועים (Event Loop), ומנתב פעולות קלט/פלט סינכרוניות ואסינכרוניות.</li>
        <li><strong>צד השרת — המחלקה <code>tcp::acceptor</code>:</strong> מאגדת בתוכה בצורה אלגנטית את כל שלבי ההקמה של השרת (<span dir="ltr"><code>socket</code>, <code>bind</code></span> ו־<code>listen</code>) לכדי אובייקט יחיד המקבל נקודת קצה (<code>endpoint</code>). קריאה למתודה <code>accept()</code> ממתינה לחיבור ומחזירה ישירות אובייקט <code>tcp::socket</code> מוכן לשיחה.</li>
        <li><strong>צד הלקוח — המחלקה <code>tcp::resolver</code>:</strong> מתרגמת שמות מארח (Hostnames כגון <code>"api.example.com"</code>) ומספרי פורט לכתובות רשת (Endpoints) ומאפשרת חיבור פשוט באמצעות <code>boost::asio::connect</code>.</li>
        <li><strong>מעטפת חוצץ בטוחה (Safe Buffering):</strong> פונקציות הקלט/פלט עובדות מול <code>boost::asio::buffer</code>, שמצמידה למצביע הזיכרון את גודל החוצץ במדויק ומונעת גלישות חוצץ (Buffer Overflow). פונקציות עזר כגון <code>boost::asio::read</code> ו־<code>boost::asio::write</code> מבטיחות קריאה וכתיבה של מלוא הבתים הנדרשים ללא באגים של קריאה חלקית.</li>
      </ul>
      <pre class="code"><code>#include &lt;boost/asio.hpp&gt;
#include &lt;iostream&gt;

using boost::asio::ip::tcp;

// שרת בסיסי ומודרני ב-Boost.Asio המציג הקמה בטוחה של שקע
void run_echo_server(int port) {
    try {
        // 1. יצירת מנוע הקלט/פלט של הספרייה
        boost::asio::io_context io_context;

        // 2. ה-acceptor מאגד socket, bind ו-listen בשורה אחת:
        tcp::acceptor acceptor(io_context, tcp::endpoint(tcp::v4(), port));
        std::cout &lt;&lt; "Boost.Asio server listening on port " &lt;&lt; port &lt;&lt; "...\\n";

        // 3. המתנה חוסמת לחיבור לקוח והחזרת שקע מוכן לעבודה:
        tcp::socket socket = acceptor.accept();
        std::cout &lt;&lt; "Client connected from " &lt;&lt; socket.remote_endpoint() &lt;&lt; "\\n";

        // 4. קריאה בטוחה דרך מעטפת buffer:
        char data[1024];
        boost::system::error_code ec;
        size_t length = socket.read_some(boost::asio::buffer(data), ec);

        if (!ec) {
            // הדהוד (Echo) הנתונים בחזרה ללקוח
            boost::asio::write(socket, boost::asio::buffer(data, length));
        } else if (ec == boost::asio::error::eof) {
            std::cout &lt;&lt; "Connection closed cleanly by peer\\n";
        }
    } catch (const std::exception&amp; ex) {
        std::cerr &lt;&lt; "Boost.Asio Exception: " &lt;&lt; ex.what() &lt;&lt; "\\n";
    }
}</code></pre>
      <div class="panel">
        <p><strong>יתרונות דפנסיביים של Boost.Asio:</strong></p>
        <ul>
          <li><strong>ניהול משאבים אוטומטי (RAII, Resource Acquisition Is Initialization):</strong> שקעים וחיבורים נסגרים אוטומטית כאשר האובייקט יוצא מהתחום (Scope) בהריסתו בדסטרקטור. מנגנון זה מונע דליפת מתארי קבצים (File Descriptors) במערכת ההפעלה גם כאשר נזרקת שגיאה או מתבצעת יציאה מוקדמת.</li>
          <li><strong>טיפול בשגיאות בעזרת חריגות או קודי שגיאה מפורשים:</strong> רוב פונקציות הספרייה מציעות שתי גרסאות — גרסה הזורקת חריגה מטיפוס <code>boost::system::system_error</code>, או גרסה המקבלת אובייקט <code>boost::system::error_code</code> לבדיקה מקומית ללא חריגות.</li>
        </ul>
      </div>
      <p><strong>ספריות קריפטוגרפיה משלימות ל־C++:</strong> תקן שפת C++ אינו מספק ספריות מובנות להצפנה. בבניית יישומי רשת אמיתיים, נעזרים בספריות קריפטוגרפיות מוכרות ונבדקות היטב, כגון <strong>OpenSSL</strong> (הספרייה המובילה בעולם למימוש TLS/SSL וצפנים סימטריים ואסימטריים) ו־<strong>Crypto++</strong> (ספריית C++ מקיפה ועשירה באלגוריתמים קריפטוגרפיים). <em>כלל ברזל באבטחת מידע: לעולם אין לממש אלגוריתמי הצפנה בעצמכם!</em></p>
    `,
  },
  {
    id: "u5-pysock",
    title: "שקעים בפייתון, ומה לבדוק",
    html: `
      <p>שפת פייתון מספקת את מודול <code>socket</code>, המאפשר עבודה מול שקעי רשת ברמת מערכת ההפעלה בתחביר תמציתי ונקי. בעת כתיבת קוד רשת בפייתון, יש להקפיד על ניהול משאבים נכון, קביעת זמני קצוב (Timeouts), וטיפול מדויק בזרם הבתים.</p>
      <p><strong>לקוח TCP דפנסיבי בפייתון:</strong> שימוש במנהל הקשר (<code>with</code>) מבטיח שהשקע ייסגר אוטומטית בסיום העבודה גם אם נזרקה שגיאה. הגדרת <code>settimeout</code> מונעת מהתוכנית להיתקע לנצח במקרה של שרת שאינו מגיב:</p>
      <pre class="code"><code>import socket

SERVER_HOST = "127.0.0.1"
SERVER_PORT = 65432
SOCKET_TIMEOUT_SECONDS = 5.0

def query_sensor_service():
    # מנהל ההקשר with מבטיח סגירה אוטומטית של השקע (RAII)
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client_sock:
        client_sock.settimeout(SOCKET_TIMEOUT_SECONDS)
        try:
            client_sock.connect((SERVER_HOST, SERVER_PORT))
            print(f"Connected to {SERVER_HOST}:{SERVER_PORT}")

            # שליחה בטוחה: sendall מבטיחה שכל הבתים נשלחו במלואם בלולאה פנימית
            request_command = b"READ_METRICS\\n"
            client_sock.sendall(request_command)

            # קריאת תגובה: recv(1024) מחזיר עד 1024 בתים
            response_data = client_sock.recv(1024)
            if not response_data:
                print("Server closed connection without data")
                return None

            return response_data.decode("utf-8").strip()

        except socket.timeout:
            print("Error: socket operation timed out")
        except ConnectionRefusedError:
            print(f"Error: connection refused — is server running on port {SERVER_PORT}?")
        except OSError as err:
            print(f"Network error occurred: {err}")
    return None</code></pre>
      <p><strong>שרת TCP בסיסי בפייתון:</strong> מקביל לרצף הפעולות ב־C++ (<span dir="ltr"><code>socket</code> → <code>bind</code> → <code>listen</code> → <code>accept</code></span>):</p>
      <pre class="code"><code>import socket

LISTEN_HOST = "127.0.0.1"
LISTEN_PORT = 65432
CONNECTION_BACKLOG = 5

def start_metrics_server():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_sock:
        # אפשור שימוש חוזר בפורט מיד לאחר אתחול
        server_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        server_sock.bind((LISTEN_HOST, LISTEN_PORT))
        server_sock.listen(CONNECTION_BACKLOG)
        print(f"Metrics server listening on {LISTEN_HOST}:{LISTEN_PORT}...")

        while True:
            # המתנה לקבלת חיבור לקוח חדש
            conn, client_address = server_sock.accept()
            # conn מייצג שקע ייעודי חדש עבור לקוח זה
            with conn:
                conn.settimeout(5.0)
                print(f"Accepted connection from {client_address}")
                try:
                    request = conn.recv(1024)
                    if request:
                        print(f"Received request: {request}")
                        conn.sendall(b"STATUS: OK | CPU: 12% | RAM: 45%\\n")
                except socket.timeout:
                    print(f"Client {client_address} timed out")</code></pre>
      <div class="panel">
        <p><strong>כללי אצבע דפנסיביים לתכנות שקעים בפייתון:</strong></p>
        <ul>
          <li><strong>שימוש ב־<code>sendall</code> לעומת <code>send</code>:</strong> המתודה <code>send</code> מחזירה את מספר הבתים שנשלחו בפועל ועלולה לשלוח חלקית בלבד (Short Write). המתודה <code>sendall</code> מריצה לולאה פנימית עד שכל הבתים משודרים או שנזרקת שגיאה.</li>
          <li><strong>הגדרת Timeout חובה:</strong> ברירת המחדל של שקעים היא חוסמת ללא הגבלת זמן. שרת שלא מגדיר timeout עלול להישאר תלוי לנצח בגלל לקוח תקוע, ולמצות את משאבי המערכת (מתקפת Slowloris).</li>
          <li><strong>כתובת האזנה:</strong> האזנה על <code>127.0.0.1</code> חושפת את השירות רק למחשב המקומי (סביבת פיתוח בטוחה). האזנה על <code>0.0.0.0</code> פותחת את הפורט לכלל כרטיסי הרשת והעולם החיצון ודורשת בדיקות אבטחה, אימות וחומת אש.</li>
        </ul>
      </div>
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
      <p><strong>הפתרון: מסגור (Framing) בשכבת היישום.</strong> מכיוון ש־TCP אינו תוחם הודעות, שכבת היישום (Application Layer) חייבת להגדיר פרוטוקול מסגור (Framing) המאפשר למקבל לחלץ הודעות מובחנות מתוך הזרם. שלוש שיטות המסגור הנפוצות הן: (1) תו מפריד (Delimiter כגון <code>\\n</code>), (2) אורך קבוע לכל הודעה, או (3) <strong>כותרת מקדימה עם שדה אורך (Length-Prefixed Header)</strong> — זוהי השיטה הנדרשת במטלות הקורס ובבחינות.</p>
      <h3>פרוטוקול הכותרת בת 12 בתים (Big-Endian)</h3>
      <p>בפרוטוקולי רשת רבים ובבחינות, מגדירים חבילה בעלת <strong>כותרת קבועה בת 12 בתים</strong>, המורכבת משלושה שדות של 4 בתים (32 סיביות ללא סימן) בפורמט Network Byte Order (Big-Endian):</p>
      <ol>
        <li><strong>מספר החבילה (Packet Number / ID):</strong> 4 בתים — מספור סידורי (0, 1, 2...).</li>
        <li><strong>סך כל החבילות (Total Packets):</strong> 4 בתים — לכמה חבילות פוצל הקובץ או המסר כולו.</li>
        <li><strong>אורך המטען (Payload Length):</strong> 4 בתים — כמות הבתים של הנתונים האמיתיים בחבילה הנוכחית.</li>
      </ol>
      <p><strong>אלגוריתם הקליטה הנכון (4 שלבים):</strong></p>
      <ol>
        <li><strong>קריאת הכותרת במלואה:</strong> קוראים בלולאה <em>בדיוק 12 בתים</em> באמצעות פונקציית עזר <code>receive_exact</code>.</li>
        <li><strong>פענוח הכותרת:</strong> מפענחים את 12 הבתים באמצעות <code>struct.unpack("!III", header)</code> — הסימן <code>!</code> מציין סדר רשת (Big-Endian), ו־<code>III</code> מציין שלושה מספרים שלמים של 4 בתים (32 סיביות).</li>
        <li><strong>בדיקה דפנסיבית נגד DoS:</strong> בודקים ששדה האורך אינו עולה על תקרת הגודל המקסימלית המותרת (<code>MAX_PAYLOAD</code>). ללא בדיקה זו, תוקף יכול לשלוח אורך זדוני של 4GB ולגרום לשרת להקצות זיכרון ענק ולקרוס (Memory Exhaustion DoS)!</li>
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
        <p><strong>הגדרת גודל החבילה ופיצול נתונים (חישוב גדלים בפועל):</strong></p>
        <ul>
          <li><strong>חלופה א' (תקרת חבילה כוללת):</strong> גודל החבילה הכולל ברשת (כותרת + מטען) מוגבל ל־2048 בתים. במקרה זה, גודל המטען המקסימלי לכל חבילה הוא <code>DATA_SIZE = 2048 - 12 = 2036</code> בתים.</li>
          <li><strong>חלופה ב' (תקרת מטען):</strong> גודל המטען עצמו מוגבל ל־2048 בתים (למשל קובץ של 5120 בתים יפוצל לשני נתחים של 2048 ונתח שלישי של 1024), ועליהם מתווספת הכותרת בת 12 הבתים, כך שגודל החבילה הכולל בכבל הוא 2060 בתים.</li>
          <li><strong>המלצה למבחן ולפיתוח:</strong> הגדירו קבוע ברור ומפורש בקוד (כמו <code>PACKET_SIZE = 2048</code> או <code>MAX_PAYLOAD = 2036</code>) והוסיפו הערה המתעדת את שיקול הדעת.</li>
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
