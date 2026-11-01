# יחידות 5 ו-6: תקשורת סוקטים ומחשוב ענן - תוספות ומערך שיעור מורחב

> **CURSOR DIRECTIVE / CONTEXT BOUNDARY:**
> - **Target File to Edit:** `docs/unit-5.md` & `docs/unit-6.md` (or `content/unit-5.md`, `content/unit-6.md` in the repo).
> - **Scope Restriction:** Edit ONLY Unit 5 & 6 files. Do NOT modify any other unit files or global settings.

---

## 1. בעיית ה-Byte Stream ב-TCP והצורך ב-Framing

בפרוטוקול TCP, הנתונים מועברים כזרם רציף של בתים (**Byte Stream**). ל-TCP אין מושג של "גבולות הודעה" (Message Boundaries).

### ⚠️ הבעיה במבחן:
קריאה בודדת ל-`sock.recv(2048)` **אינה מבטיחה** קבלת הודעה שלמה!
* הנתונים עלולים להגיע במקומץ קטן (Partial Read) או לחלופין שתי הודעות יתמזגו לקריאה אחת (Packet Coalescing).

### ✅ הפתרון: Framing באמצעות Header קבוע (Big-Endian)
בשאלות בחינה מתקדמות (כגון 2025ג מועד ג, 2026א), נדרשים לבנות תקשורת עם **Header קבוע בן 12 בתים** בתחילת כל חבילה המכיל שדות בפורמט Network Byte Order (Big-Endian):

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

## 2. מודל הזיכרון: תהליכים (Processes) מול חוטים (Threads)

שאלה אמריקאית שכיחה (2021א, 2025ג מועד ג):
* **תהליכים (Processes):** לכל תהליך יש מרחב זיכרון מבודד משלו (Virtual Address Space).
* **חוטים (Threads):** חולקים את אותו מרחב זיכרון (Shared Memory Space & Heap), את אותם הקבצים/סוקטים הפתוחים, אך לכל חוט יש **רגיסטרים ומחסנית (Stack) נפרדים משלו!**

---

## 3. סדר בתים ברשת (Network Byte Order & `htons`)

* **Little-Endian:** רוב מעבדי Intel/AMD מאחסנים את הבית הפחות משמעותי בכתובת הנמוכה.
* **Big-Endian:** פרוטוקולי תקשורת רשת דורשים שהבית המשמעותי ביותר יישלח ראשון.
* **`htons(PORT)`:** הפונקציה (Host To Network Short) ממירה את מספר הפורט מ-Little-Endian ל-Big-Endian כדי להבטיח תאימות תקשורת ברשת.

---

## 4. מניעת חסימות ב-I/O בעזרת `selectors` (Non-blocking I/O)

במקום לפתוח Thread לכל לקוח (שנחשף לעומס משאבים ולמתקפות DoS), משתמשים במנגנון **`selectors.DefaultSelector()`** של מערכת ההפעלה (epoll / kqueue / select) המנהל מרובי-סוקטים בלולאה יחידה.

---

## 5. מושגי מפתח: מחשוב ענן, וירטואליזציה והצפנה פוסט-קוואנטית (PQC)

### מודלי שירות בענן:
* **IaaS (Infrastructure as a Service):** אספקת תשתיות חומרה, וירטואליזציה ורשת (למשל AWS EC2). המשתמש מנהל את מערכת ההפעלה והתוכנה.
* **PaaS (Platform as a Service):** אספקת סביבת פיתוח והרצה (למשל Heroku, Google App Engine). המשתמש מנהל את הקוד בלבד.
* **SaaS (Software as a Service):** תוכנה מוכנה לשימוש קצה דרך הרשת (למשל Office 365, Google Drive).

### וירטואליזציה:
* **Hypervisor Type 1 (Bare-Metal):** רץ ישירות על החומרה (למשל VMware ESXi, Xen).
* **Hypervisor Type 2 (Hosted):** רץ מעל מערכת הפעלה מארחת (למשל VirtualBox).
* **Containers (Docker):** חולקים את הקרנל של מערכת ההפעלה המארחת, קלים ומהירים בהרבה מ-VMs.

### הצפנה פוסט-קוואנטית (PQC):
מחשבים קוואנטיים עתידיים יוכלו לפרוץ הצפנה אסימטרית קלאסית (RSA, ECC) בזמן קצר באמצעות אלגוריתם שור (Shor's Algorithm). תקני ה-PQC של NIST (כגון **CRYSTALS-Kyber** להחלפת מפתחות ו-**CRYSTALS-Dilithium** לחתימה דיגיטלית) מבוססים על סריגים (Lattice-based Cryptography) ועמידים בפני התקפות אלו.
