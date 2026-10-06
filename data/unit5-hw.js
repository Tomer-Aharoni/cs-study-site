UNIT5.sections.push({
  id: "u5-hw",
  title: "תרגילי המרצה",
  html: `
<p>תרגילי תקשורת בפייתון מהמרצה, עם פתרון. הם סגורים בהתחלה. כתובת היעד במטלת הקובץ היא זו שמופיעה בשאלה: תרגיל על מבנה חבילה, לא סריקה של רשת.</p>
<details class="fold">
  <summary>שאלה מקורית מהמרצה · סגירת socket בתוך with</summary>
  <div class="fold-body">
    <p>בקטע הבא, מה נדרש כדי לסגור את הערוץ בסוף ההתקשרות?</p>
    <pre class="code"><code>import socket
HOST = "127.0.0.1"
PORT = 65432
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(b"Hello, world")
    data = s.recv(1024)
    print("Received", repr(data))</code></pre>
    <ul>
      <li>א. <code>s.disconnect()</code></li>
      <li>ב. <code>s.close()</code> בתוך הבלוק (חובה תמיד, גם עם with)</li>
      <li>ג. הערוץ כבר ייסגר בסוף בלוק ה־<code>with</code>.</li>
      <li>ד. <code>s.shutdown()</code> בלי with</li>
    </ul>
    <div class="callout callout-success">
      <p><strong>תשובה נכונה: ג.</strong></p>
      <p><strong>הסבר פדגוגי שורה-אחר-שורה:</strong></p>
      <ul>
        <li><code>with socket.socket(...) as s:</code> — שימוש במנהל הקשר (Context Manager) של פייתון. בעת כניסה לבלוק נקראת המתודה <code>__enter__</code> שמחזירה את אובייקט השקע <code>s</code>.</li>
        <li>ביציאה מבלוק ה־<code>with</code> (בין אם בסיום תקין של הקוד ובין אם עקב זריקת חריגה כגון <code>ConnectionResetError</code> או <code>TimeoutError</code>), פייתון מפעיל אוטומטית ובאופן דטרמיניסטי את מתודת <code>__exit__</code> של השקע, אשר קוראת ל־<code>s.close()</code> ומשחררת את מתאר הקובץ (File Descriptor) במערכת ההפעלה.</li>
      </ul>
      <p><strong>מדוע כל מסיח שגוי:</strong></p>
      <ul>
        <li><strong>מסיח א' שגוי:</strong> אין כלל מתודה בשם <code>disconnect()</code> באובייקט socket בפייתון (ובממשק שקעי BSD בכלל). קריאה כזו תזרוק מיד <code>AttributeError</code>.</li>
        <li><strong>מסיח ב' שגוי:</strong> קריאה ידנית ל־<code>s.close()</code> בתוך הבלוק מיותרת לחלוטין. יתרה מזאת, אם תיזרק חריגה (למשל ב־<code>connect</code> או ב־<code>recv</code>) לפני הקריאה הידנית, השורה לא תגיע לביצוע — בדיוק מה ש־<code>with</code> מונע באמצעות מנגנון <code>try...finally</code> פנימי.</li>
        <li><strong>מסיח ד' שגוי:</strong> הפונקציה <code>s.shutdown()</code> משמשת להפסקת תעבורה חד-כיוונית בזרם ה־TCP (למשל <code>SHUT_WR</code> להודעה לצד השני שלא יישלחו עוד נתונים), אך היא <em>אינה סוגרת</em> את השקע ואינה משחררת את משאבי הקרנל; חובה לקרוא ל־<code>close()</code> בסיום.</li>
      </ul>
      <p><strong>מוקש בחינה:</strong> במבחן נבדקת ההבנה שמנהל הקשר (<code>with</code>) מעניק שחרור משאבים אוטומטי (בדומה לדפוס RAII ב־C++), המונע דליפת מתארי קבצים (File Descriptor Leak) גם כאשר מתרחשות תקלות רשת.</p>
    </div>
  </div>
</details>
<details class="fold">
  <summary>מטלה · שליחת קובץ בחבילות עם כותרת 12 בתים — הדרישה</summary>
  <div class="fold-body">
    <p>תוכנית פייתון מקבלת שם קובץ ושולחת לשרת בכתובת <code>8.8.8.8</code> פורט 7070. מחלקים לחבילות בגודל כולל מקסימלי 2048 בתים. לכל חבילה כותרת בת 12 בתים:</p>
    <ul>
      <li><strong>שדה 1 (4 בתים):</strong> מספר החבילה הנוכחית (Packet Number / ID).</li>
      <li><strong>שדה 2 (4 בתים):</strong> מספר החבילות הכולל (Total Packets).</li>
      <li><strong>שדה 3 (4 בתים):</strong> גודל הנתונים בחבילה הנוכחית בבתים (Payload Length / Size).</li>
    </ul>
    <p>כל השדות מקודדים בסדר רשת (Network Byte Order = Big-Endian). התקשורת מתבצעת מעל שקע TCP — מאחר ש־TCP מספק זרם בתים רציף (Byte Stream) ללא גבולות הודעה (No Message Boundaries), הכותרת הקבועה מספקת את מנגנון המסגור (Framing) הדרוש לצד המקבל.</p>
  </div>
</details>
<details class="fold">
  <summary>מטלה מקורית מהמרצה · שליחת קובץ — הפתרון והסבר שורה-אחר-שורה</summary>
  <div class="fold-body">
    <p><strong>ניתוח פדגוגי שורה-אחר-שורה של קוד הלקוח:</strong></p>
    <ul>
      <li><code>PACKET_SIZE = 2048, HEADER_SIZE = 12</code>: הגדרת תקרת הגודל הכולל של החבילה ואורך הכותרת הקבועה.</li>
      <li><code>DATA_SIZE = PACKET_SIZE - HEADER_SIZE</code>: מאחר שהחבילה הכוללת מוגבלת ל־2048 בתים והכותרת תופסת 12 בתים, נותרים לכל היותר <code>2048 - 12 = 2036</code> בתים של נתונים (Payload) לכל חבילה.</li>
      <li><code>with open(filename, "rb") as f: data = f.read()</code>: קריאת הקובץ במצב בינארי (<code>"rb"</code>). <em>מוקש קריטי:</em> חובה לקרוא כבינארי; פתיחה כטקסט תשבש קבצים בינאריים עקב המרת תווי ירידת שורה (<code>\r\n</code> לעומת <code>\n</code>).</li>
      <li><code>total_packets = (len(data) + DATA_SIZE - 1) // DATA_SIZE</code>: חישוב מתמטי של חלוקה בעיגול כלפי מעלה (Ceil Division). אם הקובץ מכיל למשל 2037 בתים, נקבל <code>(2037 + 2035) // 2036 = 2</code> חבילות (חבילה מלאה של 2036 + חבילה של בית 1). אם הקובץ ריק (0 בתים), הנוסחה מחזירה 0.</li>
      <li><code>with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:</code>: יצירת שקע TCP (IPv4) מנוהל הקשר שייסגר אוטומטית.</li>
      <li><code>s.connect((HOST, PORT))</code>: ייזום לחיצת יד משולשת (SYN, SYN-ACK, ACK) והתחברות לשרת.</li>
      <li><code>chunk = data[start:start + DATA_SIZE]</code>: חיתוך פרוסת הבתים עבור החבילה הנוכחית. עבור החבילה האחרונה, אורך ה־chunk עשוי להיות קטן מ־<code>DATA_SIZE</code>.</li>
      <li><code>header = packet_number.to_bytes(4, "big") + ...</code>: המרת כל מספר שלם בן 4 בתים (32 סיביות) לפורמט Big-Endian תקני של הרשת, ושרשורם לכותרת רציפה בת 12 בתים.</li>
      <li><code>s.sendall(header + chunk)</code>: שליחה בטוחה. <em>מוקש:</em> שימוש ב־<code>send()</code> רגיל עלול לשדר רק חלק מהמידע (Partial Send); הפונקציה <code>sendall()</code> מבצעת לולאה פנימית עד שכל המידע שודר במלואו.</li>
    </ul>
    <pre class="code"><code>import socket

HOST = "8.8.8.8"
PORT = 7070
PACKET_SIZE = 2048
HEADER_SIZE = 12
DATA_SIZE = PACKET_SIZE - HEADER_SIZE

filename = input("Enter file name: ")
with open(filename, "rb") as f:
    data = f.read()

total_packets = (len(data) + DATA_SIZE - 1) // DATA_SIZE

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    for packet_number in range(total_packets):
        start = packet_number * DATA_SIZE
        chunk = data[start:start + DATA_SIZE]
        header = (
            packet_number.to_bytes(4, "big")
            + total_packets.to_bytes(4, "big")
            + len(chunk).to_bytes(4, "big")
        )
        s.sendall(header + chunk)</code></pre>

    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;" />

    <p><strong>ניתוח פדגוגי שורה-אחר-שורה של קוד השרת (Receiving & Framing):</strong></p>
    <ul>
      <li><code>def recv_exact(conn, n):</code> — פונקציית עזר הכרחית לקריאה מדויקת מעל TCP. מכיוון ש־TCP הוא זרם בתים (Byte Stream), קריאה יחידה ל־<code>conn.recv(n)</code> עשויה להחזיר רק חלק מהבתים (Partial Read).</li>
      <li><code>buf = bytearray()</code>: צבירת הבתים בחוצץ גמיש ויעיל, ללא יצירה חוזרת ונשנית של אובייקטי מחרוזות בזיכרון.</li>
      <li><code>chunk = conn.recv(n - len(buf))</code>: קריאת יתרת הבתים החסרים בלבד. כך מובטח שלא נשאב בטעות בתים השייכים כבר לחבילה הבאה בזרם!</li>
      <li><code>if not chunk: raise OSError("connection closed")</code>: <em>מלכודת קלאסית בבחינה!</em> כאשר הלקוח סוגר את החיבור (FIN / EOF), פונקציית <code>recv</code> אינה זורקת שגיאה אלא מחזירה מחרוזת ריקה (<code>b''</code>). ללא בדיקה זו, הלולאה תיכנס ללולאה אינסופית ותתקע את המעבד ב־100% עומס.</li>
      <li><code>header = recv_exact(conn, 12)</code>: קריאה מובטחת של בדיוק 12 בתים עבור הכותרת.</li>
      <li><code>int.from_bytes(..., "big")</code>: פענוח שלושת השדות מפורמט רשת Big-Endian למספרים שלמים בפייתון. (לחלופין ניתן להשתמש ב־<code>struct.unpack('!III', header)</code>).</li>
      <li><code>payload = recv_exact(conn, size)</code>: קריאה מובטחת של בדיוק <code>size</code> בתים של תוכן הנתונים (Payload).</li>
    </ul>
    <pre class="code"><code>def recv_exact(conn, n):
    buf = bytearray()
    while len(buf) &lt; n:
        chunk = conn.recv(n - len(buf))
        if not chunk:
            raise OSError("connection closed")
        buf.extend(chunk)
    return bytes(buf)

header = recv_exact(conn, 12)
packet_no = int.from_bytes(header[0:4], "big")
total = int.from_bytes(header[4:8], "big")
size = int.from_bytes(header[8:12], "big")
payload = recv_exact(conn, size)</code></pre>

    <div class="callout callout-warning">
      <p><strong>מוקשי בחינה קריטיים (2025ג מועד ג מול שקפי המרצה):</strong></p>
      <ul>
        <li><strong>מוקש 1 — גודל 2048 (כולל כותרת או לא כולל?):</strong> במצגת המרצה נקבע כי 2048 הוא גודל החבילה הכולל (ולכן <code>DATA_SIZE = 2036</code>). בשחזור מבחן 2025ג מועד ג, בדוגמה לקובץ של 5120 בתים חילקו ל־2048, 2048, 1024 (כלומר התייחסו ל־2048 כגודל הנתונים נטו, והכותרת נוספת עליהם). <em>המלצה מעשית לנבחן:</em> שתי הגישות מתקבלות במבחן. הגדירו קבוע ברור בראש הקוד והוסיפו הערה: <code>DATA_SIZE = 2036 # 2048 including 12B header</code>.</li>
        <li><strong>מוקש 2 — מתקפת מניעת שירות (DoS) עקב גודל בלתי מוגבל:</strong> שרת דפנסיבי אמיתי חייב לבדוק: <code>if size > DATA_SIZE: raise ValueError("Payload exceeds maximum packet limit")</code>. אחרת, תוקף זדוני יוכל לשלוח כותרת עם <code>size = 2^32 - 1</code> (~4GB) ולגרום לקריסת השרת עקב הקצאת זיכרון ענקית ב־<code>recv_exact</code> (Memory Exhaustion DoS).</li>
        <li><strong>מוקש 3 — התחייבות לסדר בתים (Endianness):</strong> שימוש ב־<code>"little"</code> במקום <code>"big"</code> יגרום לכך שמספר כמו 1 (<code>0x00000001</code>) יישלח כ־<code>0x01000000</code> ויפוענח בשרת כ־16,777,216!</li>
      </ul>
    </div>
  </div>
</details>
  `,
});
