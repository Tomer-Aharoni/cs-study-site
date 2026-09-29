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
      <p>הערך המוחזר הוא מספר שלם. בדיקה דפנסיבית: ערך <strong>שלילי</strong> = כשל ביצירה. דוגמת המצגת בודקת <code>== 0</code> — זה שגוי: 0 הוא ידית חוקית (לעיתים stdin). ביוניקס בודקים <code>&lt; 0</code>.</p>
      <div class="panel">
        <p><strong>למה שקע.</strong> תוכנית לא "מדברת עם האינטרנט" ישירות. היא מבקשת מהמערכת קצה ערוץ — כמו לקבל שפופרת. <code>SOCK_STREAM</code> היא שיחה רציפה (TCP); <code>SOCK_DGRAM</code> היא גלויות (UDP). אחרי שיש שפופרת, לקוח מתקשר (<code>connect</code>) ושרת ממתין לצלצול (<code>bind</code>/<code>listen</code>/<code>accept</code>).</p>
      </div>
    `,
  },
  {
    id: "u5-client",
    title: "לקוח ב-C++: connect, send, read",
    html: `
      <p>הלקוח יוצר שקע, ממלא <code>sockaddr_in</code> (משפחה, פורט ב־<code>htons</code>, כתובת ב־<code>inet_pton</code> מטקסט לבינרי), קורא ל־<code>connect</code>, ואז <code>send</code> / <code>read</code> (או <code>recv</code>).</p>
      <pre class="code"><code>int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen);</code></pre>
      <p>זו קריאת מערכת שמתחילה חיבור אל כתובת IP ופורט של היעד. מערכת ההפעלה בוחרת בדרך כלל גם כתובת ופורט מקומיים אם הלקוח לא ביצע <code>bind</code>. אחרי חיבור מוצלח שני הצדדים מחליפים זרם בתים.</p>
      <p>שלד לקוח, באותו סדר פעולות:</p>
      <ul>
        <li><code>socket(AF_INET, SOCK_STREAM, 0)</code></li>
        <li><code>serv_addr.sin_family = AF_INET</code>; <code>sin_port = htons(PORT)</code></li>
        <li><code>inet_pton(AF_INET, "127.0.0.1", &amp;serv_addr.sin_addr)</code> — כתובת לא חוקית → יציאה</li>
        <li><code>connect</code> — כשל → יציאה</li>
        <li><code>send</code> הודעה; <code>read</code> לחוצץ בגודל ידוע</li>
      </ul>
      <p>דפנסיבית: <code>send</code> עלול לשלוח רק חלק מהבתים, ו־<code>read</code>/<code>recv</code> מחזירים עד גודל החוצץ — לא "הודעה שלמה". החזרה 0 ב־TCP מציינת סגירה מסודרת מצד העמית; ערך שלילי הוא שגיאה. בונים לולאות שליחה/קבלה, מטפלים בהפרעות וב־timeout, ומגדירים מסגור בפרוטוקול (אורך, מפריד או הודעה בגודל קבוע). לא מתייחסים לחוצץ כמחרוזת מזוהה־אפס בלי להוסיף סיום בתחום המוקצה. 127.0.0.1 הוא המחשב המקומי.</p>
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
      <p>המצגת מפנה ל־boost.org: חבילות מקור לפיתוח C++. אפשר להתקין לבד, או ב־Visual Studio 2019 דרך <strong>NuGet</strong> שמוריד חבילות הרחבה, כולל Boost. בקורס זה תשתית לכתיבת שקעים ברמה גבוהה יותר מה־API הגולמי — לא חובה לשנן כל מחלקה.</p>
      <p>C++ לא כוללת הצפנה בתקן השפה. כשצריך ערוץ מוצפן או צופן, קוראים לספרייה — לא ממציאים אלגוריתם. במצגת המשלימה: <strong>OpenSSL</strong> (מימוש נפוץ של TLS ושל צפנים) ו־<strong>Crypto++</strong> (ספריית C++ לאלגוריתמים קריפטוגרפיים; מופיעה גם בחומרי הקורס).</p>
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
      <p><code>listen(1)</code> הוא backlog קטן לדוגמה; בייצור קובעים תקרה במודע. <code>recv</code> עדיין עשוי להחזיר חלק — מסגור ותקרת גודל חלים גם כאן. האזנה ל־127.0.0.1 צרה מ־<code>0.0.0.0</code> / INADDR_ANY.</p>
    `,
  },
  {
    id: "u5-frame",
    title: "מסגור (Framing) מעל זרם בתים של TCP",
    html: `
      <p>TCP מעביר <strong>זרם בתים (byte stream)</strong>. אין לו גבול של "הודעה". קריאה אחת ל־<code>recv</code> יכולה לחזור עם חלק מההודעה, או עם זנב של הודעה אחת ותחילת ההודעה הבאה באותו חוצץ.</p>
      <p>הפרוטוקול של היישום מגדיר מסגור. במטלת הקורס זו כותרת קבועה של 12 בתים, שלושה מספרים של 4 בתים כל אחד, בסדר רשת big-endian:</p>
      <ul>
        <li>מספר החבילה</li>
        <li>מספר החבילות הכולל</li>
        <li>אורך ה־payload בחבילה הזו</li>
      </ul>
      <p>קודם קוראים בדיוק 12 בתים, מפענחים, ורק אז קוראים בדיוק את האורך שכתוב. הלולאה חובה: <code>recv</code> רשאי להחזיר פחות ממה שביקשתם. אורך שמגיע מהכותרת הוא קלט, ולכן יש תקרה לפני הקריאה השנייה. בלי תקרה, שדה אורך ענקי מבקש מהשרת לצבור זיכרון.</p>
      <pre class="code"><code>def recv_exact(conn, n):
    buf = bytearray()
    while len(buf) &lt; n:
        chunk = conn.recv(n - len(buf))
        if not chunk:
            raise OSError("connection closed")
        buf.extend(chunk)
    return bytes(buf)

HEADER = 12
MAX_PAYLOAD = 2036
header = recv_exact(conn, HEADER)
pkt_id = int.from_bytes(header[0:4], "big")
total = int.from_bytes(header[4:8], "big")
size = int.from_bytes(header[8:12], "big")
if size &gt; MAX_PAYLOAD:
    raise ValueError("payload too large")
payload = recv_exact(conn, size)</code></pre>
      <p><code>struct.unpack("!III", header)</code> מפענח את אותם שלושה מספרים: <code>!</code> הוא big-endian. <code>send</code> גם הוא עלול לשלוח חלק, ולכן בצד השולח משתמשים ב־<code>sendall</code> או בלולאה עד שכל הכותרת וה־payload יצאו. 2036 הוא המקום שנשאר כשהיחידה כולה מוגבלת ל־2048 בתים (12 כותרת). הפתרון המלא של המטלה נמצא בתרגול.</p>
    `,
  }
);
