UNIT7.sections.push(
  {
    id: "u7-inj",
    title: "הזרקת SQL (SQL injection) — מה נשבר",
    html: `
      <p>בסעיפים על הוספה, שליפה והממשק בשפה, הערך אמור להיכנס דרך פרמטר. כאן רואים מה נשבר כשאותו ערך מודבק למחרוזת הפקודה.</p>
      <p><strong>הזרקת SQL (SQL injection)</strong> במצגת: שיטה לניצול חולשה בקוד שמשתמש ב-SQL. התבנית השבורה: בונים מחרוזת פקודה עם אופרטור <code>+</code> (או פורמט) מקלט.</p>
      <p>במצגת: <code>query = "SELECT * FROM Students WHERE id = " + id</code> כש־<code>id</code> מגיע מ־<code>getstudentid()</code> או מ־HTTP. המנוע לא יודע שחלק מהמחרוזת "היה אמור להיות מספר". הוא מפרסר <em>משפט אחד</em>.</p>
      <p>מה נשבר (המצגת מראה תנאי שהופך תמיד לאמת): במקום שורה אחת חוזרות יותר שורות ממה שתוכנן — פגיעה בסודיות. ב־<code>UPDATE</code>/<code>DELETE</code> אותה הדבקה פוגעת בשלמות. לא מרכיבים כאן מטענים.</p>
      <pre class="code"><code># פגיע: הדבקה. גם format / f-string / % — אותה משפחה
cur.execute("SELECT school FROM students WHERE name = '" + name + "'")

# עדיין פגיע: format / f-string / % — הקלט נכנס לתחביר
cur.execute("SELECT school FROM students WHERE name = '{}'".format(name))

# דפנסיבי: תבנית קבועה, ערך בטיפל
cur.execute("SELECT school FROM students WHERE name = ?", (name,))</code></pre>
      <pre class="code"><code>/* פגיע */
std::string q = "SELECT school FROM students WHERE id = " + id;
sqlite3_exec(db, q.c_str(), nullptr, nullptr, &amp;err);

/* דפנסיבי */
sqlite3_prepare_v2(db, "SELECT school FROM students WHERE id = ?", -1, &amp;st, nullptr);
sqlite3_bind_text(st, 1, id.c_str(), -1, SQLITE_TRANSIENT);
while (sqlite3_step(st) == SQLITE_ROW) { /* קריאת עמודה */ }
sqlite3_finalize(st);</code></pre>
      <p>זו אותה משפחה כמו הזרקת קוד ב־<code>eval</code>: גבול אמון בין נתון לבין שפה. סינון תווים ("אין גרש") נשבר בקלות מול קידודים וניבים — לא אפחות יחידה.</p>
    `,
  },
  {
    id: "u7-param",
    title: "שאילתות פרמטריות (Parameterized queries)",
    html: `
      <p>הגנת המצגת: <strong>שאילתות פרמטריות (Parameterized queries)</strong> — אותו רעיון נקרא גם משפט מוכן (prepared statement). המחרוזת מכילה מציין מקום (ב-SQLite לרוב <code>?</code>); הערך נשלח בנפרד ונקשר כנתון.</p>
      <p>שבורה: <code>"SELECT * FROM Students WHERE id = " + id</code></p>
      <p>מתוקנת במצגת: תבנית קבועה <code>SELECT * FROM Students WHERE id = ?</code> ורשימת ערכים. אחרי קשירה, גם מחרוזת שנראית כמו תחביר SQL מושווית כערך, לא כחלק מהדקדוק — מספר השורות נקבע לפי התבנית שבקוד.</p>
      <p>מלכודת מבחן: <code>execute("... WHERE name='{}'.format(user))</code> עדיין הזרקה. גרש במחרוזת לא "סוגר" את הגבול. רק <code>?</code> וטיפל (או bind ב־C++) מפרידים נתון מתחביר.</p>
      <div class="panel">
        <p><strong>למה פרמטר ולא גרשיים.</strong> דמיינו טופס מודפס: "מצא תלמיד שמספרו ____". המספר נכתב במשבצת; הספרן לא קורא אותו כהוראה. הדבקה עם <code>+</code> או <code>format</code> היא מכתב חופשי — הקורא יכול להוסיף משפטים. הגרשיים במחרוזת שלכם הם חלק מהמכתב, לא קיר. לכן <code>?</code> וטיפל: התבנית בקוד, הערך בצינור נפרד.</p>
      </div>
      <p>מגבלות:</p>
      <ul>
        <li>מציין מקום ל<strong>ערכים</strong>, לא לשמות טבלה/עמודה. מזהה דינמי — רק whitelist בקוד.</li>
        <li>בניית SQL דינמית ממחרוזות תבנית עדיין שבירה אם מדביקים קלט לתוך התבנית.</li>
        <li>ORM לא קסם: ממשקי "SQL גולמי" חוזרים לאותה מלכודת.</li>
      </ul>
    `,
  },
  {
    id: "u7-trust",
    title: "לא סומכים על קלט: כמה שכבות בדיקה",
    html: `
      <p>שקופית המצגת: לעולם אל תסמכו על קלט מהמשתמש. זה כלל יחידות 3–6, בשפה של SQL.</p>
      <ul>
        <li>פרמטרים — חובה לכל ערך שמגיע מבחוץ (גם מעוגיה, גם מקובץ שהמשתמש העלה).</li>
        <li>אם מצפים למספר: המרה לטיפוס מספר בקוד <em>לפני</em> הקשירה — כישלון המרה = דחייה, לא הדבקה.</li>
        <li>חשבון בסיס עם הרשאה מינימלית (בשרת SQL: בלי DDL אם היישום רק קורא וכותב שורות).</li>
        <li>לא להדפיס משפטי SQL מלאים עם ערכים בלוג ציבורי.</li>
      </ul>
      <p>המצגת לא מחליפה את זה ב"ניקוי גרשיים". אפחות עמוקה: הפרדת רשת — בסיס לא חשוף ישירות לאינטרנט; היישום מדבר אליו אחרי אימות.</p>
    `,
  }
);
