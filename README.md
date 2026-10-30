# אתר לימודי · 20937 ו־20425

אתר סטטי. `index.html` הוא הקורס 20937, תכנות מערכות דפנסיבי. `prob.html` הוא הקורס 20425, הסתברות ומבוא לסטטיסטיקה למדעי המחשב. אותו מנוע, נתונים נפרדים.

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
3. ב-Google Cloud הוסיפו כתובת הפניה מהצורה `https://PROJECT.supabase.co/auth/v1/callback`, וב-Supabase הוסיפו את כתובת האתר (למשל `http://localhost:8000`) ל-Redirect URLs. ההתחברות חוזרת אל `location.pathname`, ולכן צריך לרשום גם את `prob.html` (למשל `http://localhost:8000/prob.html`) או תבנית עם תו כללי. בלי זה ההתחברות מ־20425 לא חוזרת לעמוד.
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

אין דגל `--course`. הסקריפט כותב רק את קבצי 20937. שורות שמזהה שלהן מתחיל ב־`20425/` נדלגות, כדי שתוכן של 20425 בשרת לא ישבור את הפרסום של 20937. פרסום של 20425 אל `data/20425/` עדיין לא ממומש.

מעקב מקומי של 20425 נשמר במפתחות עם הסיומת `:20425` (`cs-study-progress:20425`, `cs-study-progress-anon:20425`, `cs-lab-names:20425`, `cs-cloud-seeded:<uid>:20425`). בשרת, שורת `learner_state` נשארת אחת: `seen` ו־`resume.unit` הם של 20937, וההתקדמות של 20425 יושבת ב־`resume.c20425`. שאלות, מעבדות וסימניות של 20425 נשמרות עם קידומת `20425:` ב־`practice_status` וב־`bookmarks`. מזהי תוכן לעריכה הם `20425/section:…` וכדומה; באנרים נשארים גלובליים בלי קידומת.

## מבנה

- `index.html` — מעטפת של 20937. סדר התגיות קובע את סדר הטעינה.
- `prob.html` — מעטפת של 20425. טוענת `data/20425/` ואת KaTeX, ולא את `data/content-origin.js`.
- `app.js` — ניווט, מעטפת, והאזנה ללחיצות. הפונקציות גלובליות כי `js/content-store.js` קורא להן.
- `js/labs.js`, `js/summary.js`, `js/practice.js`, `js/print.js` — אותן פונקציות, מחולקות לפי מסך. נטענות לפני `app.js`.
- `js/ai.js` — עוזר לטקסט מסומן. נטען אחרי `app.js`.
- `styles.css` — עיצוב
- `js/auth.js`, `js/banners.js`, `js/content-store.js`, `js/progress-sync.js`, `js/admin.js` — התחברות, באנרים, שמירת תוכן והתקדמות
- `data/` — תוכן הקורס. נשאר בתיקייה שטוחה: `index.html` ו־`scripts/publish-content.py` פונים לקבצים בשם `data/unitN*.js`.
- `scripts/publish-content.py` — העתקת תוכן שפורסם מהשרת אל קבצי המקור
- `scripts/agent-tools/` — כלי עיבוד מקורות והערות שלא נטענים באתר. נשארים להמשך עבודה של סוכנים.
- `notebookLLM_review/` — מקורות עומק לסיכומים. לא חלק מהאתר הרץ.
- `sources/20425/` — חומרי הקורס 20425 וטקסט שחולץ מהם, מחוץ לגיט. בגיט נשמרת רק המפה, `sources/20425/INDEX.md`, שמסבירה גם איך לשחזר את התיקייה.
- `scripts/agent-tools/20425-brief.md` — החוזה לסוכנים שכותבים תוכן לאזור 20425: קבצים, מזהים, נוסחאות, מעבדות ומקורות. `check-20425.js` בודק את התוכן.
