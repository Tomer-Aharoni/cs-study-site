# יחידות 5 ו-6: תקשורת סוקטים, ארכיטקטורות ומחשוב ענן - מערך שיעור מורחב ומקיף והנחיות ל-Cursor

---

> ### 🤖 הנחיות ממוקדות עבור Cursor (Context Directives)
> **מטרת ההנחיה:** הטמעת התוכן והשיפורים של יחידות 5 ו-6 בלבד באתר הלימוד (`cs-study-site`).
> 
> **נתיב הקבצים יעד לעריכה במאגר (Target Files):**
> * חפש ועדכן **אך ורק** קובץ המתאים ליחידות 5 ו-6, כגון:
>   * `src/content/docs/unit-5.md` / `unit-6.md`
>   * `content/units/unit5.md` / `content/units/unit6.md` / `docs/unit5-6.mdx`
> 
> ⛔ **מגבלת הקשר חמורה (Strict Scope Constraint):**
> 1. **אל תמחק** קבצים אחרים בתוכנית הלימודים.
> 2. **אל תיגש ואל תערוך** קבצים המיועדים ליחידות 1, 2, 3, 4, 7.
> 3. אנאמזג (Merge) את הסעיפים והדגשים שלהלן לתוך קובצי יחידות 5 ו-6 הקיים, או החלף את התוכן של יחידות 5 ו-6 בלבד.

---

## 1. בעיית ה-Byte Stream ב-TCP והצורך ב-Framing

בפרוטוקול TCP, הנתונים מועברים כזרם רציף של בתים (**Byte Stream**). ל-TCP אין מושג של "גבולות הודעה" (Message Boundaries).

### ⚠️ הבעיה במבחן:
קריאה בודדת ל-`sock.recv(2048)` **אינה מבטיחה** קבלת הודעה שלמה!
* הנתונים עלולים להגיע במקומץ קטן (Partial Read) או לחלופין שתי הודעות יתמזגו לקריאה אחת (Packet Coalescing).

### ✅ הפתרון: Framing באמצעות Header קבוע
מגדירים בפרוטוקול האפליקציה **Header קבוע** בתחילת כל חבילה (למשל 12 בתים) המכיל את אורך ה-Payload.

```python
import socket
import struct

def receive_exact(sock, n):
    """פונקציית עזר המבטיחה לקרוא בדיוק n בתים מזרם ה-TCP"""
    buffer = bytearray()
    while len(buffer) < n:
        chunk = sock.recv(n - len(buffer))
        if not chunk:
            raise ConnectionError("Socket closed unexpectedly")
        buffer.extend(chunk)
    return bytes(buffer)

def parse_framed_message(sock):
    # 1. קריאת Header קבוע בן 12 בתים [Packet ID (4B), Total Packets (4B), Payload Len (4B)]
    header_bytes = receive_exact(sock, 12)
    
    # 2. פענוח בתקן Big-Endian (Network Byte Order - '!III')
    pkt_id, total_pkts, payload_len = struct.unpack("!III", header_bytes)
    
    # 3. קריאה מדויקת של ה-Payload לפי האורך שחולץ מה-Header
    payload = receive_exact(sock, payload_len)
    
    return pkt_id, total_pkts, payload
```

---

## 2. מניעת חסימות ב-I/O בעזרת `selectors` (Non-blocking I/O)

במקום לפתוח Thread לכל לקוח (שנחשף לעומס משאבים ולמתקפות DoS), משתמשים במנגנון **`selectors.DefaultSelector()`** של מערכת ההפעלה (epoll / kqueue / select):

```python
import selectors
import socket

sel = selectors.DefaultSelector()

def accept_client(server_sock, mask):
    conn, addr = server_sock.accept()
    conn.setblocking(False)  # מעבר למצב Non-blocking
    sel.register(conn, selectors.EVENT_READ, read_client)

def read_client(conn, mask):
    data = conn.recv(1024)
    if data:
        conn.sendall(data)
    else:
        sel.unregister(conn)
        conn.close()

# הגדרת סוקט השרת
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('0.0.0.0', 8080))
server.listen()
server.setblocking(False)

sel.register(server, selectors.EVENT_READ, accept_client)

while True:
    events = sel.select(timeout=None)
    for key, mask in events:
        callback = key.data
        callback(key.fileobj, mask)
```

---

## 3. קריאה לפרוצדורה מרחוק (RPC - Remote Procedure Call)
* **Stub לקוח ו-Stub שרת:** רכיבי התיווך המבצעים אריזה (Marshalling/Serialization) ופריקה (Unmarshalling/Deserialization) של הארגומנטים ותוצאות ההחזרה.
* **סכנת אבטחה ב-RPC:** פגיעויות Deserialization (הזרקת אובייקטים זדוניים) וקריאות ללא אימות (Unauthenticated RPC Calls).

---

## 4. מחשוב ענן, וירטואליזציה והצפנה פוסט-קוואנטית (PQC)

### מודלי שירות בענן:
* **IaaS (Infrastructure as a Service):** אספקת תשתיות חומרה, וירטואליזציה ורשת (למשל AWS EC2).
* **PaaS (Platform as a Service):** אספקת סביבת פיתוח והרצה (למשל Google App Engine).
* **SaaS (Software as a Service):** תוכנה מוכנה לשימוש קצה דרך הרשת (למשל Office 365).

### וירטואליזציה:
* **Hypervisor Type 1 (Bare-Metal):** רץ ישירות על החומרה (VMware ESXi, Hyper-V, Xen).
* **Hypervisor Type 2 (Hosted):** רץ מעל מערכת הפעלה מארחת (VirtualBox, VMware Workstation).
* **קונטיינרים (Containers - Docker/LXC):** חולקים את הליבה (Kernel) של מערכת ההפעלה המארחת בעזרת Namespaces ו-cgroups. קלים בהרבה מ-VMs אך דורשים בידוד אבטחתי קפדני.

### הצפנה פוסט-קוואנטית (PQC):
* **אלגוריתם שור (Shor's Algorithm):** פורץ הצפנה אסימטרית קלאסית (RSA, ECC, Diffie-Hellman) בזמן פולינומי.
* **אלגוריתם גרובר (Grover's Algorithm):** מקטין בחצי את חוזק ההצפנה הסימטרית (למשל AES-128 הופך ל-64-bit, ולכן נדרש מעבר ל-AES-256).
* **תקני NIST פוסט-קוואנטיים:** **CRYSTALS-Kyber (ML-KEM)** להחלפת מפתחות ו-**CRYSTALS-Dilithium (ML-DSA)** לחתימה דיגיטלית.

---

> ### 🛑 הנחיות ל-Cursor להטמעת הקובץ:
> 1. פתח את הקובץ המתאים ליחידות 5 ו-6 בלבד במאגר.
> 2. עדכן את התוכן על פי הסעיפים לעיל.
> 3. ודא כי קוד ה-Framing וה-selectors מופיעים בבירור.
