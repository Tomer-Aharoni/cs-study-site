UNIT5.sections.push({
  id: "u5-hw",
  title: "תרגילי המרצה",
  html: `
<p>תרגילי תקשורת בפייתון מהמרצה, עם פתרון. הם סגורים בהתחלה. כתובת היעד במטלת הקובץ היא זו שמופיעה בשאלה: תרגיל על מבנה חבילה, לא סריקה של רשת.</p>
<details class="fold">
  <summary>שאלה · סגירת socket בתוך with</summary>
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
    <p><strong>תשובה: ג.</strong> מנהל הקשר (<code>with</code>) קורא ל־<code>close</code> ביציאה מהבלוק, גם אם הייתה חריגה. אפשר <code>close</code> ידני אם אין <code>with</code>.</p>
  </div>
</details>
<details class="fold">
  <summary>מטלה · שליחת קובץ בחבילות עם כותרת 12 בתים — הדרישה</summary>
  <div class="fold-body">
    <p>תוכנית פייתון מקבלת שם קובץ ושולחת לשרת בכתובת <code>8.8.8.8</code> פורט 7070. מחלקים לחבילות בגודל כולל מקסימלי 2048 בתים. לכל חבילה כותרת 12 בתים:</p>
    <ul>
      <li>מספר החבילה</li>
      <li>מספר החבילות הכולל</li>
      <li>גודל ה־Data בחבילה הנוכחית</li>
    </ul>
    <p>השדות ב־big-endian. מעל TCP — כי TCP הוא זרם בלי גבולות הודעה, הכותרת נותנת מסגור.</p>
  </div>
</details>
<details class="fold">
  <summary>מטלה · שליחת קובץ — הפתרון</summary>
  <div class="fold-body">
    <p>2048 הוא גודל יחידת האפליקציה כולה: 12 בתים כותרת ועד 2036 בתים נתונים. החבילה האחרונה יכולה להיות קצרה, ו־<code>size</code> אומר כמה בתים אחרי הכותרת באמת שייכים לה. מספור החבילות מתחיל ב־0, כמו בפתרון. קובץ ריק נותן 0 בנוסחה, ולכן הלולאה לא שולחת כלום.</p>
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
    <p>בצד השרת קוראים בדיוק 12 בתים, מפענחים שלושה מספרים, ואז קוראים בדיוק <code>size</code> בתים. פונקציית עזר לקריאה מדויקת מעל TCP:</p>
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
  </div>
</details>
  `,
});
