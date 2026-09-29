# יחידה 4: שפת פייתון ומטא-תכנות דינמי - מערך שיעור מורחב ומקיף והנחיות ל-Cursor

---

> ### 🤖 הנחיות ממוקדות עבור Cursor (Context Directives)
> **מטרת ההנחיה:** הטמעת התוכן והשיפורים של יחידה 4 בלבד באתר הלימוד (`cs-study-site`).
> 
> **נתיב הקבצים יעד לעריכה במאגר (Target Files):**
> * חפש ועדכן **אך ורק** קובץ המתאים ליחידה 4, כגון:
>   * `src/content/docs/unit-4.md` / `src/content/docs/unit4.md`
>   * `content/units/unit4.md` / `docs/unit4.mdx` / `pages/unit4.tsx`
> 
> ⛔ **מגבלת הקשר חמורה (Strict Scope Constraint):**
> 1. **אל תמחק** קבצים אחרים בתוכנית הלימודים.
> 2. **אל תיגש ואל תערוך** קבצים המיועדים ליחידות 1, 2, 3, 5, 6, 7.
> 3. אנאמזג (Merge) את הסעיפים והדגשים שלהלן לתוך קובץ יחידה 4 הקיים, או החלף את התוכן של יחידה 4 בלבד.

---

## 1. יצירת מחלקה דינמית עם `type()` – מלכודת הטופל (Tuple) במבחן

בבחינות הקורס (למשל 2025ג שאלה 6ג, 2026א), נדרשים ליצור מחלקה באופן דינמי בזמן ריצה בעזרת המטא-מחלקה `type`.

### התחביר של `type`:
```python
NewClass = type(classname, superclasses_tuple, attribute_dict)
```

### ⚠️ המלכודת הקריטית במבחן:
הארגומנט השני **חייב להיות Tuple (טופל)** של מחלקות אב.
* **אם יורשים ממחלקה אחת בלבד (`Book`), כתיבת `(Book)` תיחשב בסוגריים רגילים ולא בטופל!**
* **חובה להוסיף פסיק:** `(Book,)`!

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

# יצירת מחלקה נגזרת דינמית - תקני ומדויק למבחן
DetectiveBook = type(
    "DetectiveBook",       # 1. שם המחלקה החדשה
    (Book,),               # 2. מחלקות אב (שימו לב לפסיק - חובה!)
    {"genre": "Mystery"}   # 3. מילון שדות ומתודות
)

# יצירת מופע מהמחלקה הדינמית
my_book = DetectiveBook("A Study in Scarlet", "Conan Doyle")
print(my_book.genre)  # Mystery
```

---

## 2. דיקורטורים (Decorators) ושמירת מטא-נתונים עם `@functools.wraps`

כאשר עוטפים פונקציה באמצעות Decorator, הפונקציה המקורית מאבדת את השם (`__name__`) ואת התיעוד (`__doc__`) שלה, משום שהם מוחלפים במטא-נתונים של פונקציית המעטפת (`wrapper`).

כדי למנוע זאת ולשמור על שקילות מלאה, **חובה להשתמש ב-`@functools.wraps(func)`**:

```python
import functools

def audit_logger(func):
    @functools.wraps(func)  # שומר על __name__ ו-__doc__ המקוריים
    def wrapper(*args, **kwargs):
        print(f"[AUDIT] Executing function: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@audit_logger
def calculate_salary(emp_id, hours):
    '''Calculates monthly employee salary.'''
    return hours * 50

print(calculate_salary.__name__)  # מדפיס: calculate_salary (ללא wraps היה מדפיס: wrapper)
print(calculate_salary.__doc__)   # מדפיס: Calculates monthly employee salary.
```

---

## 3. הזרקת קוד ב-Python: `eval()` מול חלופות בטוחות

שימוש ב-`eval()` או `exec()` על קלט שמגיע מלקוח לא מהימן מהווה חולשת **Code Injection (RCE)** קטלנית.

### ❌ הקוד המסוכן:
```python
# התוקף מזין: __import__('os').system('rm -rf /')
user_input = input("Enter math expression: ")
result = eval(user_input)
```

### ✅ הפתרון הדפנסיבי:
אם נדרשים לקרוא מבני נתונים או ליטרלים מפייתון (מספרים, מחרוזות, רשימות, מילונים), משתמשים ב-**`ast.literal_eval()`**:

```python
import ast

# ✅ בטוח לחלוטין! דוחה פקודות קוד ומאפשר רק ליטרלים
user_input = "{'name': 'Alice', 'role': 'admin'}"
data = ast.literal_eval(user_input)  # מעבד מילון בצורה בטוחה
```

---

## 4. רפלקציה (Reflection) ורכיבה דינמית (Monkey Patching)

* **רפלקציה בזמן ריצה:** שימוש בפונקציות `getattr()`, `setattr()`, `hasattr()`, ו-`dir()` לבדיקה ושינוי מאפיינים בזמן ריצה.
* **Monkey Patching (שינוי דינמי בקוד):** החלפת מתודות או פונקציות מודול בזמן ריצה.
  * *סכנה אבטחתית:* שינוי דינמי של פונקציות אימות או תקשורת ללא בקרת הרשאות עלול לאפשר לתוקף לעקוף מנגנוני אבטחה במערכת.

```python
import types

class Service:
    def execute(self):
        return "Normal Execution"

def malicious_execute(self):
    return "Malicious Compromised Execution!"

s = Service()
# Monkey Patching - החלפה דינמית של המתודה בזמן ריצה
s.execute = types.MethodType(malicious_execute, s)
print(s.execute()) # מדפיס: Malicious Compromised Execution!
```

---

> ### 🛑 הנחיות ל-Cursor להטמעת הקובץ:
> 1. פתח את הקובץ המתאים ליחידה 4 בלבד במאגר.
> 2. עדכן את התוכן על פי הסעיפים לעיל.
> 3. ודא כי כל הדוגמאות בפייתון, הדיקורטורים וה-Monkey Patching מופיעים בצורה ברורה.
