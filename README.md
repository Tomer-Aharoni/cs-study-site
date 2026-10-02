# אתר לימודי · 20937

אתר סטטי לקורס תכנות מערכות דפנסיבי.

## הרצה

פתחו את `index.html`, או:

```bash
python -m http.server 8000
```

ואז http://localhost:8000

## חשבונות וניהול

`js/config.js` מכיל את כתובת הפרויקט ואת מפתח ה-publishable. בלי ערכים תקינים האתר נשאר קריא, וההתקדמות נשמרת רק בדפדפן.

כדי להפעיל התחברות Google, מעקב בחשבון ופאנל ניהול:

1. צרו פרויקט ב-Supabase.
2. ב-Authentication → Providers הפעילו Google. את מזהה הלקוח ואת הסוד שמים רק בלוח Supabase, לא בקוד.
3. ב-Google Cloud הוסיפו כתובת הפניה מהצורה `https://PROJECT.supabase.co/auth/v1/callback`, וב-Supabase הוסיפו את כתובת האתר (למשל `http://localhost:8000`) ל-Redirect URLs.
4. הריצו את [supabase/migrations/001_auth_progress_content.sql](supabase/migrations/001_auth_progress_content.sql) ב-SQL Editor.
5. `js/config.js` כבר במאגר, עם כתובת הפרויקט ומפתח `anon` / publishable. מפתח `service_role` לא נכנס לאתר. לפרויקט Supabase אחר, העתיקו את `js/config.example.js`.
6. התחברו פעם אחת עם Google, ואז ב-SQL:

```sql
update public.profiles set role = 'admin' where email = 'you@gmail.com';
```

המשתמש הראשון אינו מנהל. תפקיד אפשר לשנות רק מהמסד, לא מהדפדפן.

מנהל נכנס ל-`#/admin`: עריכת טקסט הלימוד, באנרים עליונים, ייבוא מהקבצים המצורפים, ואיפוס מעקב אחרי הקלדת הדוא״ל. שמירת HTML נדחית אם יש `script`, `iframe`, `javascript:` או מאפיין אירוע.

כדי להעתיק את הטקסט שנשמר בשרת אל הפרויקט, בתיקיית האתר:

```bash
py scripts/publish-content.py --write
```

הפקודה רצה רק אצלכם. היא קוראת את התוכן הציבורי וכותבת קובץ נתונים אחד, `data/published-content.js`. אין לה כתובת רשת, והיא לא נוגעת בשאר הקבצים. אחר כך שומרים את הקובץ בגיט.

## מבנה

- `index.html` — מעטפת. סדר התגיות קובע את סדר הטעינה.
- `app.js` — ניווט, מעטפת, והאזנה ללחיצות. הפונקציות גלובליות כי `js/content-store.js` קורא להן.
- `js/labs.js`, `js/summary.js`, `js/practice.js`, `js/print.js` — אותן פונקציות, מחולקות לפי מסך. נטענות לפני `app.js`.
- `js/ai.js` — עוזר לטקסט מסומן. נטען אחרי `app.js`.
- `styles.css` — עיצוב
- `js/auth.js`, `js/banners.js`, `js/content-store.js`, `js/progress-sync.js`, `js/admin.js` — התחברות, באנרים, שמירת תוכן והתקדמות
- `data/` — תוכן הקורס. נשאר בתיקייה שטוחה: `index.html` ו־`scripts/publish-content.py` פונים לקבצים בשם `data/unitN*.js`.
- `scripts/publish-content.py` — העתקת תוכן שפורסם מהשרת אל קבצי המקור
- `scripts/agent-tools/` — כלי עיבוד מקורות והערות שלא נטענים באתר. נשארים להמשך עבודה של סוכנים.
- `notebookLLM_review/` — מקורות עומק לסיכומים. לא חלק מהאתר הרץ.
