# הנחיות ופרומפטים מעודכנים להטמעת שינויים ב-Cursor

מסמך זה מכיל הנחיות קשיחות ופרומפטים מותאמי-הקשר (Context-Bound Prompts) עבור Cursor Agent / Composer.
השתמש בפרומפטים להלן כדי להטמיע את התוכן של כל יחידה מבלי לזלוג לקבצים לא רלוונטיים.

---

## 🛠️ הנחיית אג'נט כללית (Custom Agent Definition / `.cursorrules`)

אם ברצונך להגדיר אג'נט ייעודי ב-Cursor, הדבק את התוכן הבא בקובץ `.cursorrules` בשורש הפרויקט:

```markdown
# Custom Agent Definition: Defensive Programming Content Integrator

## Role & Expertise
You are an expert Content Integrator, Technical Writer, and Subject Matter Expert in Defensive Programming (Open University course 20937 - C++ & Python Security). Your primary responsibility is to seamlessly integrate newly developed, exam-oriented study materials into the existing project repository (`cs-study-site`).

## Core Responsibilities & Workflow
1. **Analyze Project Structure First**: Before editing any file, inspect the target project file to understand its existing layout, markdown heading hierarchy (H1/H2/H3), code block styles, callout syntax (e.g., `:::note`, `> [!NOTE]`), and overall tone.
2. **Seamless Content Merging**: Adapt and blend new concepts, exam traps, code examples, and comparison tables into the target file without overwriting or destroying existing accurate material.
3. **Enhance Pedagogy & Clarity**: Maintain an accessible, student-friendly Hebrew tone while preserving technical precision and academic accuracy required for Open University exams.
4. **Enforce Scope Isolation**: Strictly limit modifications to the specific unit file(s) assigned in each turn. Never alter unrelated units or global project settings.

## Integration Rules & Scope Mapping
- **Unit 1**: Target: `docs/unit-1.md` | Source Context: `unit1_defensive_programming_additions.md`
- **Unit 2**: Target: `docs/unit-2.md` | Source Context: `unit2_cpp_memory_additions.md`
- **Unit 3**: Target: `docs/unit-3.md` | Source Context: `unit3_memory_vulnerabilities_defenses.md`
- **Unit 4**: Target: `docs/unit-4.md` | Source Context: `unit4_python_metaprogramming_additions.md`
- **Units 5 & 6**: Target: `docs/unit-5.md` & `docs/unit-6.md` | Source Context: `unit5_6_networking_cloud_additions.md`
- **Unit 7**: Target: `docs/unit-7.md` | Source Context: `unit7_sql_clean_code_additions.md`
```

---

## 📋 פרומפטים מוכנים להעתקה ל-Cursor Composer (`Ctrl+I` / `Cmd+I`)

### 1. פרומפט להטמעת יחידה 1:
```text
@docs/unit-1.md @unit1_defensive_programming_additions.md
אנא שנה וערוך אך ורק את הקובץ docs/unit-1.md.
קח את התוספות מתוך unit1_defensive_programming_additions.md (הבחנה בין QA ל-Auditing, תבנית ממצא ביקורת, זיקת CIA למנגנוני אפחות, צמידות חלשה מול לכידות חזקה, ומלכודת מבחן בנושא חולשות אבטחה) והטמע אותן במיקום המתאים בתוך unit-1.md.
שמור על סגנון העיצוב והמבנה הקיים בקובץ. אל תגע בשום קובץ אחר בפרויקט.
```

### 2. פרומפט להטמעת יחידה 2:
```text
@docs/unit-2.md @unit2_cpp_memory_additions.md
אנא שנה וערוך אך ורק את הקובץ docs/unit-2.md.
קח את התוספות מתוך unit2_cpp_memory_additions.md (בנאי העתקה מול אופרטור השמה, כלל ה-3 וה-5, בדיקת השמה עצמית, מפרק וירטואלי וזליגת זיכרון, תופעת Object Slicing, בעיית היהלום, וייצוג vptr ב-Vtable) והטמע אותן בתוך unit-2.md.
שמור על העיצוב והמבנה הקיים בקובץ. אל תגע בשום קובץ אחר בפרויקט.
```

### 3. פרומפט להטמעת יחידה 3:
```text
@docs/unit-3.md @unit3_memory_vulnerabilities_defenses.md
אנא שנה וערוך אך ורק את הקובץ docs/unit-3.md.
קח את התוספות מתוך unit3_memory_vulnerabilities_defenses.md (חולשת Integer Overflow ב-malloc, גלישה בין שדות במבנה/בנאי, דריסת Vtable בקוד C++, התקפות ערוץ צדדי, שטבלאות השוואה של מנגנוני הגנה: Canary, ASLR, DEP/NX, CET/Shadow Stack) והטמע אותן בתוך unit-3.md.
שמור על העיצוב והמבנה הקיים בקובץ. אל תגע בשום קובץ אחר בפרויקט.
```

### 4. פרומפט להטמעת יחידה 4:
```text
@docs/unit-4.md @unit4_python_metaprogramming_additions.md
אנא שנה וערוך אך ורק את הקובץ docs/unit-4.md.
קח את התוספות מתוך unit4_python_metaprogramming_additions.md (היעדר העמסת פונקציות בפייתון, יצירת מחלקה דינמית עם type והפסיק ב-Tuple, דיקורטורים עם @functools.wraps, אבטחת eval עם ast.literal_eval, ו-Monkey Patching) והטמע אותן בתוך unit-4.md.
שמור על העיצוב והמבנה הקיים בקובץ. אל תגע בשום קובץ אחר בפרויקט.
```

### 5. פרומפט להטמעת יחידות 5 ו-6:
```text
@docs/unit-5.md @docs/unit-6.md @unit5_6_networking_cloud_additions.md
אנא שנה וערוך אך ורק את הקבצים docs/unit-5.md ו-docs/unit-6.md.
קח את התוספות מתוך unit5_6_networking_cloud_additions.md (בעיית ה-Byte Stream ב-TCP, מנגנון Framing עם Header בן 12 בתים ב-Big-Endian, מודל זיכרון תהליכים מול חוטים, סדר בתים ו-htons, מניעת חסימות ב-selectors, מודלי ענן IaaS/PaaS/SaaS, Hypervisors, והצפנה פוסט-קוואנטית PQC) והטמע אותן בקבצי היחידות המתאימים.
שמור על העיצוב והמבנה הקיים בקבצים. אל תגע בשום קובץ אחר בפרויקט.
```

### 6. פרומפט להטמעת יחידה 7:
```text
@docs/unit-7.md @unit7_sql_clean_code_additions.md
אנא שנה וערוך אך ורק את הקובץ docs/unit-7.md.
קח את התוספות מתוך unit7_sql_clean_code_additions.md (מניעת הזרקות SQL בעזרת שאילתות פרמטריות ?, קריאת קבצים והזנה בטוחה ל-SQLite מניעת כפילויות, פירוק "קוד חץ" בעזרת Guard Clauses, ועקרונות SOLID/KISS/DRY) והטמע אותן בתוך unit-7.md.
שמור על העיצוב והמבנה הקיים בקובץ. אל תגע בשום קובץ אחר בפרויקט.
```
