# יחידה 4: שפת פייתון ומטא-תכנות דינמי - תוספות ומערך שיעור מורחב

> **CURSOR DIRECTIVE / CONTEXT BOUNDARY:**
> - **Target File to Edit:** `docs/unit-4.md` (or `content/unit-4.md` in the repo).
> - **Scope Restriction:** Edit ONLY Unit 4 files. Do NOT modify any other unit files or global settings.

---

## 1. מלכודת מבחן קריטית: העמסת פונקציות (Overloading) בפייתון

שאלה אמריקאית שחוזרת על עצמה שוב ושוב (למשל 2022ג מועד 85, 2024):
* **האם פייתון תומכת בהעמסת פונקציות (Function Overloading)?**
* **תשובה חד-משמעית למבחן:** **לא!** בפייתון אין מנגנון העמסה לפי חתימת פרמטרים. הגדרה של פונקציה בעלת אותו שם פשוט **דורסת ומחליפה (Override)** את ההגדרה הקודמת במילון המודול.
* **איך משיגים התנהגות גמישה בפייתון?** בעזרת ערכי ברירת מחדל (Default Arguments), פרמטרים משתנים (`*args`, `**kwargs`), או בדיקת טיפוסים דינמית (`isinstance`).

---

## 2. יצירת מחלקה דינמית עם `type()` – מלכודת הטופל (Tuple) במבחן

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
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year

# יצירת מחלקה נגזרת דינמית - תקני ומדויק למבחן
DetectiveBook = type(
    "DetectiveBook",       # 1. שם המחלקה החדשה
    (Book,),               # 2. מחלקות אב (שימו לב לפסיק - חובה!)
    {"openu_id": 20535}    # 3. מילון שדות ומתודות
)

# יצירת מופע מהמחלקה הדינמית
my_book = DetectiveBook("A Study in Scarlet", "Conan Doyle", 1887)
print(my_book.openu_id)  # 20535
```

---

## 3. דיקורטורים (Decorators) ושמירת מטא-נתונים עם `@functools.wraps`

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
    """Calculates monthly employee salary."""
    return hours * 50

print(calculate_salary.__name__)  # מדפיס: calculate_salary
print(calculate_salary.__doc__)   # מדפיס: Calculates monthly employee salary.
```

---

## 4. הזרקת קוד ב-Python: `eval()` מול חלופות בטוחות

שימוש ב-`eval()` או `exec()` על קלט שמגיע מלקוח לא מהימן מהווה חולשת **Code Injection (RCE)** קטלנית.

### ✅ הפתרון הדפנסיבי:
אם נדרשים לקרוא מבני נתונים או ליטרלים מפייתון (מספרים, מחרוזות, רשימות, מילונים), משתמשים ב-**`ast.literal_eval()`**:

```python
import ast

# ✅ בטוח לחלוטין! דוחה פקודות קוד ומאפשר רק ליטרלים
user_input = "{'name': 'Alice', 'role': 'admin'}"
data = ast.literal_eval(user_input)  # מעבד מילון בצורה בטוחה
```

---

## 5. שינוי דינמי של קוד (Monkey Patching & `setattr`)

שינוי התנהגות של מחלקה או מודול בזמן ריצה מתבצע על ידי הצבת פונקציה חדשה במילון המודול/המחלקה או בעזרת `setattr()`:

```python
class Service:
    def process(self):
        return "Normal Result"

def patched_process(self):
    return "Patched Secure Result"

# Monkey Patching בזמן ריצה
Service.process = patched_process
```
