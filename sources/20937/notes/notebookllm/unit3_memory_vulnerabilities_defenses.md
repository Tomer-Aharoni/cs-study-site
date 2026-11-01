# יחידה 3: חולשות זיכרון C/C++ ומנגנוני הגנה - תוספות ומערך שיעור מורחב

> **CURSOR DIRECTIVE / CONTEXT BOUNDARY:**
> - **Target File to Edit:** `docs/unit-3.md` (or `content/unit-3.md` in the repo).
> - **Scope Restriction:** Edit ONLY Unit 3 files. Do NOT modify any other unit files or global settings.

---

## 1. חולשת גלישה נומרית בהקצאות זיכרון (Integer Overflow in Malloc)

בבחינות עדכניות רבות (כגון 2024, 2025ג מועד ג), מופיעות שאלות העוסקות בגלישה נומרית המובילה לגלישת ערימה (Heap Overflow).

### איך החולשה עובדת?
1. התוכנית קוראת מספר מהרשת או מהמשתמש (למשל `count` או `length`).
2. התוכנית מחשבת את גודל הזיכרון להקצאה: `size = count * sizeof(int)`.
3. אם התוקף מזין ערך ענקי (למשל `count = 0x40000001`), התוצאה עוברת גלישה נומרית (Wrap-around) ונחתכת למספר קטן מאוד (למשל 4 בתים).
4. הפונקציה `malloc(size)` מקצה חוצץ קטן של 4 בתים בלבד.
5. לולאת ההעתקה/הקריאה רצה לפי ה-`count` המקורי הענקי ודורסת את זיכרון הערימה הסמוך.

```c
// קוד בלתי מאובטח (מתוך שאלות בחינה)
void process_network_packet(int sock) {
    unsigned int count;
    read(sock, &count, sizeof(count)); // התוקף שולח 0x40000001

    // גלישה נומרית! 0x40000001 * 4 = 0x100000004 -> מוקצים 4 בתים בלבד!
    size_t bytes_to_allocate = count * sizeof(int); 
    
    int* buffer = (int*)malloc(bytes_to_allocate); 
    if (!buffer) return;

    // דריסת זיכרון מסיבית בערימה (Heap Overflow)
    for (unsigned int i = 0; i < count; i++) {
        read(sock, &buffer[i], sizeof(int)); 
    }
}
```

---

## 2. גלישה בין שדות במבנה / אובייקט (Struct Field & Constructor Overflow)

שאלה נפוצה בבחינות (2021ג שאלה 9, שאלות לדפנסיבי):
כאשר מבנה נתונים מכיל שדות או מצביעים המוקצים ברצף בזיכרון (למשל `struct field { char* f_data; } r1, r2;` או `soldier` עם `first_name[8]`, `last_name[10]`, `degree[14]`):
* קריאה ל-`strcpy` ללא בדיקת אורך דורסת את השדה הסמוך במבנה.
* במקרה של מצביעים, דריסת המצביע `f_data` של `r2` גורמת לכך שקריאה הבאה ל-`strcpy(r2->f_data, ...)` תכתוב לכתובת שרירותית שהתוקף שתל!

---

## 3. דריסת Vtable ומצביעי פונקציות ב-C++

בשאלות בחינה מתקדמות (כגון 2025ג שאלה 8), מציגים תרחיש שבו תוקף משנה את טבלת הפונקציות הווירטואליות (`Vtable`) של אובייקט בזיכרון כדי להריץ פונקציה זדונית (`hacked_function`).

```cpp
#include <iostream>

class Base {
public:
    virtual void show() { std::cout << "Original Function\n"; }
};

void hacked_function() {
    std::cout << "HACKED! Malicious Code Executed!\n";
}

int main() {
    Base* obj = new Base();

    // 1. חילוץ המצביע ל-Vtable הממוקם בתחילת האובייקט (vptr)
    uintptr_t* vptr = *(uintptr_t**)obj;

    // 2. שינוי הכניסה הראשונה ב-Vtable כך שתצביע ל-hacked_function
    vptr[0] = (uintptr_t)&hacked_function;

    // 3. הקריאה הווירטואלית תפעיל כעת את הפונקציה הזדונית!
    obj->show(); // מדפיס: HACKED!

    return 0;
}
```

---

## 4. התקפות ערוץ צדדי (Side-Channel Attacks) בהשוואת מחרוזות

* **הבעיה:** השוואת סיסמאות בעזרת `strcmp()` יוצאת מהלולאה ברגע שמתגלה התו השגוי הראשון (Early Exit).
* **הסכנה:** תוקף יכול למדוד את זמן התגובה (Timing Attack) ולדעת כמה תווים ראשונים בסיסמה היו נכונים.
* **פתרון דפנסיבי:** השוואה בזמן קבוע (Constant-Time Comparison) שאינה יוצאת מוקדם.

---

## 5. טבלת השוואה מרוכזת של מנגנוני הגנה בזיכרון (Exam Cheat-Sheet)

| מנגנון הגנה | אופן הפעולה | ממה הוא מגן? | מגבלות ודרכי עקיפה |
| :--- | :--- | :--- | :--- |
| **Stack Canary (קנרית)** | שתילת ערך אקראי לפני כתובת החזרה בדק בשלב ה-`ret`. אם הערך השתנה, התוכנית מוקפאת. | דריסת כתובת חזרה במחסנית באמצעות Stack Overflow. | אינו מגן מפני Heap Overflow, דריסת מצביעי פונקציות, דריסת משתנים מקומיים, או הדלפת ערך הקנרית. |
| **ASLR (Address Randomization)** | הגרלת כתובות הזיכרון (Stack, Heap, Code/Libraries) בכל הרצת תוכנית. | התקפות המסתמכות על כתובות קבועות בזיכרון. | הדלפת זיכרון (Memory/Info Leak), טכניקות Heap Spraying, או ROP חלקי. |
| **DEP / NX (Non-Executable)** | סימון דפי זיכרון של נתונים (Stack & Heap) כבלתי ניתנים להרצה ברמת החומרה/המעבד. | הזרקת קוד זדוני (Shellcode) למחסנית או לערימה הרצת קוד מהם. | התקפות ROP (Return-Oriented Programming) המשמשות בקוד קיים בזיכרון (כמו `system()`). |
| **CET / Shadow Stack** | שמירת עותק מוגן ומוצפן של כתובות החזרה במחסנית צל חומורתית (Shadow Stack). | דריסת כתובות חזרה והתקפות ROP במחסנית. | נדרשת תמיכת חומרה ומעבד מודרני (Intel Tiger Lake ומעלה / ARM Pointer Auth). |
