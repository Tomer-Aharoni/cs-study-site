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

מנהל נכנס ל-`#/admin`: עריכת טקסט הלימוד, ייבוא מהקבצים המצורפים, ואיפוס מעקב אחרי הקלדת הדוא״ל. שמירת HTML נדחית אם יש `script`, `iframe`, `javascript:` או מאפיין אירוע.

## מבנה

- `index.html` — מעטפת
- `app.js` — ניווט בין קורס / לימוד / סיכום / תרגול
- `data/course.js` — מטא־נתוני הקורס
- `data/unit1.js` / `unit1-interact.js` — יחידה 1
- `data/unit2.js` / `unit2-interact.js` — יחידה 2 (C++)
