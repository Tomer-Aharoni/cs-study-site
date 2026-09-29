# יחידה 7: בסיסי נתונים (SQL) וקוד נקי (Clean Code) - מערך שיעור מורחב ומקיף והנחיות ל-Cursor

---

> ### 🤖 הנחיות ממוקדות עבור Cursor (Context Directives)
> **מטרת ההנחיה:** הטמעת התוכן והשיפורים של יחידה 7 בלבד באתר הלימוד (`cs-study-site`).
> 
> **נתיב הקבצים יעד לעריכה במאגר (Target Files):**
> * חפש ועדכן **אך ורק** קובץ המתאים ליחידה 7, כגון:
>   * `src/content/docs/unit-7.md` / `src/content/docs/unit7.md`
>   * `content/units/unit7.md` / `docs/unit7.mdx` / `pages/unit7.tsx`
> 
> ⛔ **מגבלת הקשר חמורה (Strict Scope Constraint):**
> 1. **אל תמחק** קבצים אחרים בתוכנית הלימודים.
> 2. **אל תיגש ואל תערוך** קבצים המיועדים ליחידות 1, 2, 3, 4, 5, 6.
> 3. אנאמזג (Merge) את הסעיפים והדגשים שלהלן לתוך קובץ יחידה 7 הקיים, או החלף את התוכן של יחידה 7 בלבד.

---

## 1. הגנה מוחלטת מפני הזרקות SQL (SQL Injection Protection)

חולשת הזרקת SQL מתרחשת כאשר שרשור מחרוזות (Concatenation / `format()`) משמש לבניית שאילתת SQL עם קלט מהמשתמש.

### ❌ הקוד הבלתי מאובטח:
```python
# התוקף מזין כ-username את המחרוזת: admin' OR '1'='1
query = "SELECT * FROM Users WHERE username = '" + user_input + "' AND password = '" + pass_input + "'"
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

## 2. פירוק "קוד חץ" (Arrow Code) בעזרת Guard Clauses

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

## 3. עקרונות תכנון SOLID וקוד נקי למבחן

* **S - Single Responsibility Principle (SRP):** מחלקה או פונקציה צריכה להיות אחראית על נושא אחד בלבד (הפרדת אחריות).
* **O - Open/Closed Principle (OCP):** רכיבי תוכנה צריכים להיות פתוחים להרחבה אך סגורים לשינויים.
* **L - Liskov Substitution Principle (LSP):** מחלקות נגזרות חייבות להיות ניתנות להחלפה במחלקות הבסיס שלהן ללא פגיעה בתקינות התוכנית.
* **I - Interface Segregation Principle (ASP):** העדפת מספר ממשקים קטנים וממוקדים על פני ממשק יחיד ומנופח.
* **D - Dependency Inversion Principle (DIP):** התלכדות מול מופשטים (Interfaces/Abstract Classes) ולא מול מימושים קונקרטיים.
* **KISS (Keep It Simple, Stupid):** העדפת פתרון פשוט וברור על פני תחכום יתר מיותר.
* **DRY (Don't Repeat Yourself):** מניעת שכפול קוד ואיחוד לוגיקה לפונקציות שימושיות.

---

> ### 🛑 הנחיות ל-Cursor להטמעת הקובץ:
> 1. פתח את הקובץ המתאים ליחידה 7 בלבד במאגר.
> 2. עדכן את התוכן על פי הסעיפים לעיל.
> 3. ודא כי קוד ה-SQL וה-Guard Clauses מופיעים בצורה ברורה.
