# הנחיות מובנות להפעלת Cursor בפרויקט `cs-study-site`

מסמך זה מרכז את **כל פקודות ההפעלה המדויקות (Prompts)** לעריכת אתר הלימוד בעזרת Cursor.
ההנחיות מוגבלות-הקשר (Context-Bounded) לכל יחידה בנפרד, כדי למנוע מ-Cursor לערוך או למחוק קבצים של יחידות אחרות בטעות.

---

## 🧭 איך להשתמש בהנחיות בתוך Cursor?

1. פתח את פרויקט `cs-study-site` ב-Cursor.
2. פתח את חלונית **Cursor Composer** (מקשים: `Ctrl + I` או `Cmd + I`).
3. העתק והדבק את הפרומפט הרלוונטי מתוך המסמך להלן עבור היחידה שברצונך לעדכן.
4. רשום ל-Cursor לשלב את התוכן מתוך קובץ ה-Markdown המתאים של אותה יחידה (למשל `unit1_defensive_programming_additions.md`).

---

## 1️⃣ פרומפט מוגדר-הקשר ליחידה 1 (מבוא לתכנות דפנסיבי)

```text
@unit1_defensive_programming_additions.md

אנא עדכן את התוכן של יחידה 1 באתר.

מגבלת הקשר קשיחה:
1. ערוך אך ורק את הקובץ המתאים ליחידה 1 במאגר (למשל: src/content/docs/unit-1.md, src/content/docs/unit1.md, או content/unit1.md).
2. אל תיגש ואל תערוך שום קובץ של יחידות 2, 3, 4, 5, 6, 7!
3. שמר על עיצוב ה-Markdown/MDX הקיים באתר, ואנאמזג לתוכו את הסעיפים הבאים מתוך הקובץ המצורף:
   - הבחנה יסודית בין QA לביקורת אבטחה (Auditing).
   - תבנית רשמית לממצא ביקורת קוד (Audit Finding Template) עם כל שדות החובה.
   - זיקה בין פגיעה ב-CIA לבין מנגנוני אפחות (Mitigation).
   - נוסחת הסיכון, מדדי CVE/CWE/CVSS ומודל STRIDE.
   - עקרונות תכנון דפנסיבי (Defense in Depth, Least Privilege, Fail-Safe Defaults).
```

---

## 2️⃣ פרומפט מוגדר-הקשר ליחידה 2 (שפת C++ ואבטחת זיכרון)

```text
@unit2_cpp_memory_additions.md

אנא עדכן את התוכן של יחידה 2 באתר.

מגבלת הקשר קשיחה:
1. ערוך אך ורק את הקובץ המתאים ליחידה 2 במאגר (למשל: src/content/docs/unit-2.md, src/content/docs/unit2.md, או content/unit2.md).
2. אל תיגש ואל תערוך שום קובץ של יחידות 1, 3, 4, 5, 6, 7!
3. שמר על עיצוב ה-Markdown/MDX הקיים באתר, ואנאמזג לתוכו את הסעיפים הבאים מתוך הקובץ המצורף:
   - מלכודת מבחן: הבחנה בין בנאי העתקה (Person p2 = p1;) לבין אופרטור השמה (p2 = p1;).
   - כלל השלושה (Rule of Three) וכלל החמישה (Rule of Five C++11) והסבר על Shallow Copy vs Deep Copy.
   - מימוש בדיקת השמה עצמית (if (this == &other) return *this;) והסיכון בלעדיה.
   - מפרק וירטואלי (virtual ~Base()) והמלכודת בשחרור מחלקה נגזרת.
   - ארגון האובייקט בזיכרון, vptr בהיסט 0 וטבלה וירטואלית (Vtable).
   - מצביעים חכמים (unique_ptr, shared_ptr, weak_ptr).
```

---

## 3️⃣ פרומפט מוגדר-הקשר ליחידה 3 (חולשות זיכרון C/C++ ומנגנוני הגנה)

```text
@unit3_memory_vulnerabilities_defenses.md

אנא עדכן את התוכן של יחידה 3 באתר.

מגבלת הקשר קשיחה:
1. ערוך אך ורק את הקובץ המתאים ליחידה 3 במאגר (למשל: src/content/docs/unit-3.md, src/content/docs/unit3.md, או content/unit3.md).
2. אל תיגש ואל תערוך שום קובץ של יחידות 1, 2, 4, 5, 6, 7!
3. שמר על עיצוב ה-Markdown/MDX הקיים באתר, ואנאמזג לתוכו את הסעיפים הבאים מתוך הקובץ המצורף:
   - חולשת גלישה נומרית בהקצאת זיכרון (Integer Overflow in Malloc) עם קוד מדגים.
   - חולשת מחרוזות פורמט (Format String) והסבר על %x, %s, %n.
   - חולשת Use-After-Free (UAF) והגנה בעזרת nullptr / smart pointers.
   - דריסת Vtable ומצביעי פונקציות ב-C++ להרצת פונקציה זדונית.
   - טבלת השוואה מרוכזת של מנגנוני הגנה (Stack Canary, ASLR, DEP/NX, CET/Shadow Stack, ROP).
```

---

## 4️⃣ פרומפט מוגדר-הקשר ליחידה 4 (שפת פייתון ומטא-תכנות דינמי)

```text
@unit4_python_metaprogramming_additions.md

אנא עדכן את התוכן של יחידה 4 באתר.

מגבלת הקשר קשיחה:
1. ערוך אך ורק את הקובץ המתאים ליחידה 4 במאגר (למשל: src/content/docs/unit-4.md, src/content/docs/unit4.md, או content/unit4.md).
2. אל תיגש ואל תערוך שום קובץ של יחידות 1, 2, 3, 5, 6, 7!
3. שמר על עיצוב ה-Markdown/MDX הקיים באתר, ואנאמזג לתוכו את הסעיפים הבאים מתוך הקובץ המצורף:
   - יצירת מחלקה דינמית עם type() ומלכודת הטופל (Book,) במבחן.
   - דיקורטורים (Decorators) ושמירת מטא-נתונים בעזרת @functools.wraps.
   - סיכוני eval()/exec() והחלופה הדפנסיבית ast.literal_eval().
   - רפלקציה (getattr, setattr, hasattr) ו-Monkey Patching דינמי.
```

---

## 5️⃣ פרומפט מוגדר-הקשר ליחידות 5 ו-6 (תקשורת סוקטים ומחשוב ענן)

```text
@unit5_6_networking_cloud_additions.md

אנא עדכן את התוכן של יחידות 5 ו-6 באתר.

מגבלת הקשר קשיחה:
1. ערוך אך ורק את הקבצים המתאימים ליחידות 5 ו-6 במאגר (למשל: src/content/docs/unit-5.md, unit-6.md).
2. אל תיגש ואל תערוך שום קובץ של יחידות 1, 2, 3, 4, 7!
3. שמר על עיצוב ה-Markdown/MDX הקיים באתר, ואנאמזג לתוכו את הסעיפים הבאים מתוך הקובץ המצורף:
   - בעיית ה-Byte Stream ב-TCP ומנגנון Framing מלא (Header 12B Big-Endian + receive_exact).
   - מניעת חסימות ב-I/O בעזרת selectors.DefaultSelector().
   - ארכיטקטורת RPC, Stubs וסכנות Deserialization.
   - מודלי ענן (IaaS, PaaS, SaaS) וסוגי Hypervisors (Type 1 vs Type 2, Containers).
   - הצפנה פוסט-קוואנטית (PQC), אלגוריתמי Shor/Grover ותקני NIST (CRYSTALS-Kyber/Dilithium).
```

---

## 6️⃣ פרומפט מוגדר-הקשר ליחידה 7 (בסיסי נתונים וקוד נקי)

```text
@unit7_sql_clean_code_additions.md

אנא עדכן את התוכן של יחידה 7 באתר.

מגבלת הקשר קשיחה:
1. ערוך אך ורק את הקובץ המתאים ליחידה 7 במאגר (למשל: src/content/docs/unit-7.md, src/content/docs/unit7.md, או content/unit7.md).
2. אל תיגש ואל תערוך שום קובץ של יחידות 1, 2, 3, 4, 5, 6!
3. שמר על עיצוב ה-Markdown/MDX הקיים באתר, ואנאמזג לתוכו את הסעיפים הבאים מתוך הקובץ המצורף:
   - הגנה מוחלטת בהזרקות SQL בעזרת שאילתות פרמטריות (?) ב-SQLite.
   - פירוק "קוד חץ" (Arrow Code) בעזרת Guard Clauses / חיתוך מוקדם.
   - עקרונות תכנון SOLID (SRP, OCP, LSP, ISP, DIP) וקוד נקי (KISS, DRY).
```
