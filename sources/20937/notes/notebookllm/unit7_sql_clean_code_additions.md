# יחידה 7: בסיסי נתונים (SQL) וקוד נקי (Clean Code) - תוספות ומערך שיעור מורחב

> **CURSOR DIRECTIVE / CONTEXT BOUNDARY:**
> - **Target File to Edit:** `docs/unit-7.md` (or `content/unit-7.md` in the repo).
> - **Scope Restriction:** Edit ONLY Unit 7 files. Do NOT modify any other unit files or global settings.

---

## 1. הגנה מוחלטת מפני הזרקות SQL (SQL Injection Protection)

חולשת הזרקת SQL מתרחשת כאשר שרשור מחרוזות (Concatenation / `format()` / f-strings) משמש לבניית שאילתת SQL עם קלט מהמשתמש.

### ❌ הקוד הבלתי מאובטח:
```python
# התוקף מזין כ-username את המחרוזת: admin' OR '1'='1
query = f"SELECT * FROM Users WHERE username = '{user_input}' AND password = '{pass_input}'"
# השאילתה המפוענחת תהיה: SELECT * FROM Users WHERE username = 'admin' OR '1'='1' ... (מעקף אימות!)
```

### ✅ הפתרון הדפנסיבי: שאילתות פרמטריות (Parameterized Queries)
בשאילתה פרמטרית, מנוע בסיס הנתונים (SQLite) מתייחס לקלט כאל **נתון בלבד** ולא כאל קוד SQL בר ביצוע.

```python
import sqlite3

conn = sqlite3.connect("server.db")
cur = conn.cursor()

user_input = input("Enter username: ")
pass_input = input("Enter password: ")

# ✅ השימוש ב-? מבטיח מניעת הזרקת SQL מוחלטת!
cur.execute(
    "SELECT * FROM Users WHERE username = ? AND password = ?",
    (user_input, pass_input)
)

user_record = cur.fetchone()
```

---

## 2. קריאת CSV / קבצים והזנה בטוחה ל-SQLite מניעת כפילויות

בבחינות רבים (כמו 2021א, 2021ג, 2026א), מתבקשים לקרוא נתונים מקובץ טקסט/CSV ולהכניסם לטבלה ב-SQLite:
* **מניעת כפילויות:** שימוש ב-`PRIMARY KEY` ובשאילתת `INSERT OR IGNORE INTO Students...`.
* **הכנסה באצווה:** שימוש ב-`executemany()` לביצועים מהירים ובטוחים.

---

## 3. פירוק "קוד חץ" (Arrow Code) בעזרת Guard Clauses

"קוד חץ" (Arrow Code) הוא קוד הכולל מקוננות כפולה ומורכבת של תנאי `if`, המרחיקה את הלוגיקה הראשית ימינה ופוגעת בקריאות ובתחזוקתיות.

### ❌ "קוד חץ" בלתי נקי:
```cpp
bool processUserBad(const std::string& name, int age) {
    bool result = false;
    if (!name.empty()) {
        if (age >= 18) {
            if (age <= 120) {
                // לוגיקה ראשית
                result = true;
            }
        }
    }
    return result;
}
```

### ✅ קוד נקי ודפנסיבי בעזרת Guard Clauses (חיתוך מוקדם):
```cpp
bool processUserClean(const std::string& name, int age) {
    // חיתוך מוקדם של מקרי הקצה והשגיאות
    if (name.empty()) return false;
    if (age < 18 || age > 120) return false;

    // הלוגיקה הראשית מבוצעת ברמה הראשית ללא הזחות מיותרות
    return true;
}
```

---

## 4. עקרונות תכנון וקוד נקי למבחן

* **KISS (Keep It Simple, Stupid):** העדפת פתרון פשוט וברור על פני תחכום יתר מיותר.
* **DRY (Don't Repeat Yourself):** מניעת שכפול קוד ואיחוד לוגיקה לפונקציות שימושיות.
* **עקרונות SOLID:**
  * **SRP (Single Responsibility):** מחלקה אחראית על נושא אחד בלבד.
  * **OCP (Open/Closed):** פתוח להרחבה, סגור לשינויים.
  * **LSP (Liskov Substitution):** מחלקת בן יכולה להחליף את מחלקת האב ללא שבירת הקוד.
  * **ISP (Interface Segregation):** העדפת ממשקים קטנים וספציפיים.
  * **DIP (Dependency Inversion):** תלות במופשטים (Abstract) ולא במוגשמים (Concrete).
