window.STUDY_GUIDE_NOTES = [
// --- יחידה 1: מבוא לתכנות דפנסיבי וביקורת אבטחה ---
  {
    unit: "1",
    title: "הבחנה מבדלת: באג, חולשת אבטחה (Vulnerability), ניצול (Exploit) ואפחות (Mitigation)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>"כל חולשה היא באג, לא כל באג הוא חולשה." חולשה נמדדת מול Security Policy. אפחות (Mitigation) אינה תיקון שורש אלא מזעור נזק.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>הגדרת <strong>אפחות (Mitigation)</strong>: הגנה לצורך <em>מזעור נזק</em>. מסיח שגוי נפוץ: "מערכת נקייה מבאגים".</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <table border="1" style="border-collapse:collapse; width:100%; font-size:0.85em;">
          <tr><th>מושג</th><th>תמצות</th><th>דוגמה</th></tr>
          <tr><td><strong>באג</strong></td><td>סטייה ממפרט</td><td>כפתור הפוך</td></tr>
          <tr><td><strong>חולשה</strong></td><td>פגם באבטחה</td><td><code>gets()</code> ללא גבול</td></tr>
          <tr><td><strong>ניצול</strong></td><td>תקיפה מעשית</td><td>דריסת כתובת חזרה</td></tr>
          <tr><td><strong>אפחות</strong></td><td>מזעור נזק</td><td>קנרית מחסנית</td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "1",
    title: "משולש ה-CIA, יעדי הפגיעה ואמצעי אפחות מותאמים לכל יעד",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>יעדי CIA בלתי תלויים: DoS פוגע רק בזמינות; דליפת זיכרון פוגעת רק בסודיות; שינוי ערך פוגע רק בשלמות.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>זיהוי יעד בתרחיש: לוג סיסמאות/Heartbleed = <strong>סודיות</strong> &bull; הזרקת SQL/שינוי זיכרון = <strong>שלמות</strong> &bull; קריסת תהליך/DDoS = <strong>זמינות</strong>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>סודיות (C):</strong> הצפנה, TLS, מידור הרשאות.</li>
          <li><strong>שלמות (I):</strong> גיבוב קריפטוגרפי, חתימה, W^X, בדיקת גבולות.</li>
          <li><strong>זמינות (A):</strong> Rate Limit, Timeouts, מניעת דליפות.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "סיווג חולשות: עיצוב, מימוש, תפעול ושטחים אפורים (Gray Areas)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>תיקון קוד אינו פותר חולשת עיצוב: אם הפרוטוקול לקוי (כמו Telnet ללא הצפנה), כתיבה מושלמת לא תועיל.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>Telnet מעביר סיסמה בגלוי = <strong>חולשת עיצוב</strong> (המפרט שגוי). שימוש ב-<code>strcpy</code> ללא בדיקה = <strong>חולשת מימוש</strong> (באג בקוד).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <table border="1" style="border-collapse:collapse; width:100%; font-size:0.85em;">
          <tr><th>כשל</th><th>סיווג</th><th>דוגמה</th></tr>
          <tr><td>באג בקוד</td><td><strong>מימוש</strong></td><td>גלישת חוצץ</td></tr>
          <tr><td>כשל במפרט</td><td><strong>עיצוב</strong></td><td>Telnet בגלוי</td></tr>
          <tr><td>קונפיגורציה</td><td><strong>תפעול</strong></td><td>אי-התקנת טלאי</td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "1",
    title: "יחסי אמון, גבולות אמון (Trust Boundaries) ושרשרת אמון (Trust Chain)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>גבול אמון מפריד רמות הרשאה. שרשרת אמון חזקה רק כחוזק החוליה החלשה ביותר שלה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>הסתמכות שרת על בדיקת לקוח (Client-side validation) = שבירת גבול אמון ו<strong>חולשת עיצוב</strong> קריטית.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>כלל ברזל:</strong> שרת בודק הכל מחדש תמיד.</li>
          <li><strong>מעבר גבול:</strong> רשת, קלט משתמש, argv, משתני סביבה.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "צמידות חלשה ולכידות חזקה, תרשים מחלקות UML ומבנה ממשקים מאובטח",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>הסתרת סדר ביצוע (API Order): פונקציות <code>check()</code> ו-<code>execute()</code> חייבות להיות פרטיות, עטופות במתודה ציבורית יחידה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>הודעות שגיאה שונות ("משתמש לא קיים" מול "סיסמה שגויה") מאפשרות מיפוי משתמשים (User Enumeration). חובה: הודעה אחידה.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><code>&lt;|--</code> ירושה (is-a).</li>
          <li><code>*--</code> הרכבה (Composition &ndash; חיים תלויים).</li>
          <li><code>o--</code> צבירה (Aggregation &ndash; עצמאיים).</li>
          <li><code>..&gt;</code> תלות (Dependency).</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "עקרונות תכנון דפנסיבי: הגנה לעומק, הרשאת מינימום, ברירת מחדל בטוחה ותיווך מלא",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>הגנה לעומק מניחה שחולשות יתקיימו ומונעת קריסה מלאה, אך אינה מצדיקה השארת באגים בקוד.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>שירות לוגים שרץ כ-Root = הפרת <strong>Least Privilege</strong> (זקוק רק להרשאת הוספה לקובץ בודד).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>Defense in Depth:</strong> שכבות מרובות.</li>
          <li><strong>Least Privilege:</strong> מינימום הרשאה לנחיצות.</li>
          <li><strong>Fail-Safe:</strong> ברירת מחדל חסומה (Whitelist).</li>
          <li><strong>Complete Mediation:</strong> אימות בכל גישה מחדש.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "מידול איומים בשיטת STRIDE, עץ איומים ונוסחת הסיכון (DREAD)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>מיפוי STRIDE ל-CIA: Tampering &harr; I &bull; Information Disclosure &harr; C &bull; DoS &harr; A. נוספים: Spoofing, Repudiation, Elevation.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>סיכון = מכפלת נזק בהסתברות. נזק עצום בהסתברות אפסית מקבל ציון סיכון כולל נמוך.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>D:</strong> נזק &bull; <strong>R:</strong> שחזור &bull; <strong>E:</strong> ניצול &bull; <strong>A:</strong> משתמשים &bull; <strong>D:</strong> גילוי.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "בקרת איכות (QA) מול ביקורת אבטחה (Auditing) ותבנית ממצא ביקורת (5 שדות חובה)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>Penetration Test מדגים שרשור תקיפה מעשי (קופסה שחורה); ביקורת קוד (White-box) מאתרת כשלי TOCTOU וזיכרון נסתרים.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>5 שדות חובה בממצא ביקורת: 1. מיקום &bull; 2. סיווג (מימוש/עיצוב) &bull; 3. יעד CIA &bull; 4. השפעה מעשית &bull; 5. אפחות מומלץ.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>QA:</strong> משתמש רגיל, קלט תקין, פונקציונליות.</li>
          <li><strong>Auditing:</strong> תוקף זדוני, מקרי קצה, מדיניות אבטחה.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "איום ברמת רכיב מול איום מערכתי, ארגז חול (Sandbox) ותבנית Reactor",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>בשרת Reactor חובה לקבוע תקרת חיבורים מרבית ו-Timeout למניעת הרעבת משאבים (Slowloris DoS).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>הרצת <code>exec</code> ישירה בתוך ארגז חול שוברת את גבול האמון ועלולה להוביל לבריחה מהארגז (Sandbox Escape).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>Thread-per-client:</strong> תקורה כבדה, פגיע ל-DoS.</li>
          <li><strong>Reactor:</strong> חוט יחיד עם I/O Multiplexing, חסכוני.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "מושגי עולם אמיתי ודוח מערך הסייבר: CWE מול CVE מול CVSS, ו-0-Day מול 1-Day",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>CWE = סוג הפגם הכללי. CVE = מופע ספציפי בתוכנה מסוימת. CVSS = ציון חומרה (0-10).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>פריצה עקב אי-התקנת עדכון אבטחה שפורסם = <strong>חולשת 1-Day</strong> וסיווגה <strong>חולשה תפעולית</strong>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>0-Day:</strong> אין טלאי &bull; <strong>1-Day:</strong> קיים טלאי שלא עודכן.</li>
          <li><strong>CWE:</strong> קטגוריה כללית &bull; <strong>CVE:</strong> פגיעות ספציפית &bull; <strong>CVSS:</strong> חומרה.</li>
        </ul>
      </div>
    `
  },

  // --- יחידה 2: שפת C++ כבסיס לתכנות דפנסיבי ---
    {
    unit: "2",
    title: "המונח volatile ומלכודת ריבוי חוטים",
    content: `
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>המונח <code>volatile</code> <strong>לא</strong> הופך משתנה ל-Thread-Safe ולא מונע Race Conditions! הוא רק מונע מהקומפיילר למטמֵן (אופטימיזציות) משתנה שמשתנה חיצונית (ע"י חומרה). למקביליות משתמשים ב-<code>std::atomic</code>.</p>
      </div>
    `
  },
{
    unit: "2",
    title: "מודל הזיכרון של C++ בזמן ריצה וזמני חיים (Text, Data, Stack, Heap)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p><code>T obj;</code> נוצר במחסנית ונהרס אוטומטית ביציאה מהבלוק. <code>new T</code> מוקצה בערימה ומשתחרר רק ב-<code>delete</code>.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p><code>Frog f1; Frog *p1 = &f1;</code> &ndash; שניהם יושבים במחסנית (Stack)! אין כאן <code>new</code> ולכן אין שום הקצאה בערימה.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <table border="1" style="border-collapse:collapse; width:100%; font-size:0.85em;">
          <tr><th>אזור</th><th>הקצאה</th><th>שחרור</th><th>סכנה</th></tr>
          <tr><td><strong>Stack</strong></td><td>מהדר</td><td>יציאה מבלוק</td><td>גלישת חוצץ, דריסת ret</td></tr>
          <tr><td><strong>Heap</strong></td><td>new</td><td>delete ידני</td><td>UAF, דליפה, Double Free</td></tr>
          <tr><td><strong>Data/BSS</strong></td><td>OS</td><td>סיום תוכנית</td><td>Race Conditions בגלובליים</td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "2",
    title: "מצביעים (Pointers) מול הפניות (References) ומלכודות זיכרון מת",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>איסור חמור על החזרת הפניה או מצביע למשתנה מקומי: ביציאה מהפונקציה המחסנית מתפרקת ונוצר Dangling Pointer (UB).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>העברה לפי ערך (by-value) גורמת להעתקה מיותרת ולחיתוך אובייקט. העברה ב-<code>const T&</code> מונעת העתקה ושומרת פולימורפיזם.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>Nullptr:</strong> מצביע כן, הפניה לא.</li>
          <li><strong>אתחול חובה:</strong> מצביע לא, הפניה כן.</li>
          <li><strong>ניתוב מחדש:</strong> מצביע כן, הפניה לא.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "בנאי העתקה (Copy Constructor) מול אופרטור השמה (Copy Assignment) ובדיקת השמה עצמית",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>ב-<code>operator=</code> חובה לבדוק השמה עצמית <code>if (this == &other) return *this;</code> לפני שחרור הזיכרון הקיים.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p><code>T b = a;</code> מפעיל <strong>בנאי העתקה</strong> (אובייקט חדש נולד). <code>b = a;</code> מפעיל <strong>operator=</strong> (האובייקט כבר היה קיים).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ol>
          <li>בדיקת <code>this == &other</code> &bull; 2. <code>delete[]</code> ישן &bull; 3. הקצאה והעתקה עמוקה &bull; 4. <code>return *this;</code></li>
        </ol>
      </div>
    `
  },
  {
    unit: "2",
    title: "העתקה רדודה (Shallow) מול עמוקה (Deep), כלל השלוש וכלל החמישה",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>אי-מימוש בנאי העתקה במחלקה שמחזיקה מצביע גורם להעתקה רדודה ול-Double Free בהעברה לפונקציה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>העברת אובייקט עם מצביע by-value ללא Copy Ctor מובילה לקריסה ודאית ב-<strong>Double Free</strong> בסיום הפונקציה.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <p>כלל השלוש: אם מנהלים זיכרון ידנית ב-<code>new</code>, חובה לממש <strong>מפרק</strong>, <strong>בנאי העתקה</strong>, ו-<strong>אופרטור השמה</strong>.</p>
      </div>
    `
  },
  {
    unit: "2",
    title: "הקצאה ושחרור מערכים: new[] מול delete[] (מוקש בחינה קריטי)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>שחרור מערך שהוקצה ב-<code>new[]</code> באמצעות <code>delete</code> ללא סוגריים הוא Undefined Behavior והשחתת ערימה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p><code>delete p;</code> על מערך פרימיטיבי (כגון <code>char*</code>) הוא <strong>UB חמור</strong>! אין הקלות לטיפוסים פרימיטיביים.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><code>new</code> &harr; <code>delete</code></li>
          <li><code>new[]</code> &harr; <code>delete[]</code></li>
          <li><code>malloc</code> &harr; <code>free</code></li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "מפרק וירטואלי (Virtual Destructor) במחלקת בסיס — מוקש הבחינה המרכזי ב-C++",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>כל מחלקת בסיס פולימורפית חייבת <code>virtual ~Base() {}</code>, אחרת מחיקה דרך מצביע אב לא תפעיל את מפרק הבן.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p><code>Base* p = new Derived(); delete p;</code> ללא מפרק וירטואלי מפעיל רק את <code>~Base()</code> &ndash; כל משאבי הבן <strong>זולגים</strong>!</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>בלי virtual:</strong> רק מפרק האב נקרא &rarr; זליגת זיכרון הבן.</li>
          <li><strong>עם virtual:</strong> מפרק הבן נקרא תחילה, אחריו האב &rarr; תקין.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "הסתרה (Hiding) מול דריסה (Overriding) ופולימורפיזם דינמי ב-C++",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>דריסה דורשת <code>virtual</code> באב וחתימה זהה. ללא <code>virtual</code> מתבצעת הסתרה בלבד (קישור סטטי לפי טיפוס המצביע).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>כלל הניתוב: פונקציה <strong>ללא virtual</strong> נקבעת לפי סוג המצביע; פונקציה <strong>עם virtual</strong> נקבעת לפי סוג האובייקט האמיתי.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li>ללא virtual &rarr; קריאה למתודת המצביע (הסתרה).</li>
          <li>עם virtual &rarr; קריאה למתודת האובייקט בפועל (דריסה).</li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "סדר בנייה והריסה בירושה ומלכודת קריאה ל-virtual בבנאי ובמפרק",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>בבנאים ובמפרקים אין פולימורפיזם! קריאה למתודה וירטואלית מפעילה תמיד את גרסת המחלקה שהבנאי/מפרק שלה רץ כעת.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>קריאה ל-virtual בתוך <code>Base()</code> או <code>~Base()</code> תפעיל <strong>אך ורק את Base</strong> (חלקי הנגזרת טרם נבנו או כבר נהרסו).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>בנייה:</strong> אב תחילה, ואז בן.</li>
          <li><strong>הריסה:</strong> בן תחילה, ואז אב (סדר הפוך).</li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "בעיית היהלום (Diamond Problem) בירושה מרובה ופתרונה בעזרת ירושה וירטואלית",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>פתרון בעיית היהלום: ירושה וירטואלית <code>: virtual public Base</code> המבטיחה מופע פיזי יחיד של מחלקת הבסיס.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>ללא ירושה וירטואלית, קריאה למתודת הבסיס מהמחלקה התחתונה נכשלת בקומפילציה עקב עמימות (שני עותקים!).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li>ירושה רגילה: שני עותקי בסיס ועמימות.</li>
          <li>ירושה וירטואלית: עותק יחיד ומשותף.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "חיתוך אובייקט (Object Slicing) ומנגנון הטבלה הווירטואלית (Vtable & Vptr)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>מניעת חיתוך אובייקט (Slicing): העברה בהפניה (<code>Base&</code>) או במצביע (<code>Base*</code>) &ndash; לעולם לא לפי ערך.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p><code>void f(Base b)</code> מקבלת לפי ערך: שדות הנגזרת נחתכים, ה-vptr מאופס ל-Base, והפולימורפיזם מושמד.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><code>Base b</code> &rarr; חיתוך אובייקט (שגיאה).</li>
          <li><code>Base& / Base*</code> &rarr; פולימורפיזם נשמר במלואו (תקין).</li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "ניהול משאבים דטרמיניסטי (RAII) ומצביעים חכמים (unique_ptr, shared_ptr, weak_ptr)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>בטיחות במכולות: גישה עם <code>vec[i]</code> אינה בודקת גבולות; גישה עם <code>vec.at(i)</code> בודקת וזורקת חריגה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>מעגל הפניות של <code>shared_ptr</code> גורם לדליפת זיכרון. הפתרון: המרת אחד המצביעים ל-<code>std::weak_ptr</code>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>unique_ptr:</strong> בעלות בלעדית (ברירת מחדל).</li>
          <li><strong>shared_ptr:</strong> בעלות משותפת עם מונה.</li>
          <li><strong>weak_ptr:</strong> צפייה ללא בעלות ושבירת מעגלים.</li>
        </ul>
      </div>
    `
  },

  // --- יחידה 3: התמודדות עם חולשות אבטחה בשפות C ו־C++ ---
  {
    unit: "3",
    title: "מבנה מסגרת המחסנית (Stack Frame), מוסכמות קריאה וסדר בתים Little-Endian",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>המחסנית גדלה מכתובות גבוהות לנמוכות, אך כתיבה לחוצץ מתקדמת מנמוכות לגבוהות &ndash; ישירות לעבר כתובת החזרה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>ב-Little-Endian: <code>0xC00010FF</code> נשמר בזיכרון כ-<code>FF 10 00 C0</code> (הבית הנמוך LSB בכתובת הנמוכה ביותר).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <p>מבנה מחסנית (מגבוה לנמוך): ארגומנטים &larr; כתובת חזרה (Ret) &larr; Saved EBP &larr; קנרית &larr; חוצצים מקומיים.</p>
      </div>
    `
  },
  {
    unit: "3",
    title: "גלישת חוצץ במחסנית (Buffer Overflow), פונקציות מסוכנות ומלכודת Off-by-One",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p><code>strncpy</code> אינה מוסיפה תו NULL מסיים אם המחרוזת מלאה! חובה לסגור ידנית או להשתמש ב-<code>snprintf</code>.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>גלישת בית יחיד (Off-by-One בלולאה <code>&lt;= SIZE</code>) דורסת את הבית הנמוך של EBP ומאפשרת הסטת מחסנית (Stack Pivoting).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><code>gets()</code> &rarr; אסור לחלוטין.</li>
          <li><code>strcpy()</code> &rarr; מסוכן (אין גבול).</li>
          <li><code>strncpy()</code> &rarr; דורש סגירת NULL ידנית.</li>
          <li><code>snprintf()</code> &rarr; בטוח ומומלץ.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "3",
    title: "קנרית המחסנית (Stack Canary / StackGuard) — עקרון פעולה, מבנה מחסנית ומגבלות",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>קנרית מוצבת לפני Saved EBP. מגינה רק מדריסת כתובת חזרה במחסנית; אינה מגינה על משתנים מקומיים או על הערימה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>הקנרית אינה מגנה על גלישת ערימה (Heap), נחשפת בזליגת זיכרון (Format String), ואינה מונעת DoS (התרסקות).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>בולמת:</strong> דריסת כתובת חזרה לינארית במחסנית.</li>
          <li><strong>לא בולמת:</strong> גלישת ערימה, דריסת משתנים מקומיים, קריאת זיכרון.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "3",
    title: "הגנות מרחב כתובות והרצה: ASLR ו-DEP/NX מול מתקפות ROP",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>DEP חוסם הרצת Shellcode במחסנית אך אינו מגן מ-ROP (המשתמש בקוד קיים). ASLR ו-CET מגנים מ-ROP.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>תוכנית עם DEP בלבד (ללא ASLR) פגיעה לחלוטין ל-<strong>ROP / ret2libc</strong> לקוד קיים (כגון <code>system()</code>).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <table border="1" style="border-collapse:collapse; width:100%; font-size:0.85em;">
          <tr><th>מנגנון</th><th>שכבה</th><th>מטרה</th><th>מעקף</th></tr>
          <tr><td><strong>Canary</strong></td><td>Compiler</td><td>הגנת ret</td><td>זליגת ערך</td></tr>
          <tr><td><strong>DEP/NX</strong></td><td>MMU</td><td>חסימת הרצה במחסנית</td><td>ROP / ret2libc</td></tr>
          <tr><td><strong>ASLR</strong></td><td>OS</td><td>גיבוב כתובות</td><td>דליפת כתובת</td></tr>
          <tr><td><strong>CET</strong></td><td>Hardware</td><td>חסימת ROP (Shadow Stack)</td><td>קפיצות עקיפות</td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "3",
    title: "דריסת מצביע טבלה וירטואלית (Vptr Smashing) בערימה ובמחסנית",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p><code>private</code> אינו מספק הגנת זיכרון. קנרית אינה מגנה על vptr בערימה. הגנה אמיתית: CFI ובדיקת גבולות קפדנית.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>גלישה לחוצץ שכן דורסת את ה-vptr &larr; הפניה ל-Fake Vtable &larr; קריאה למתודה וירטואלית מפעילה קוד תוקף.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <p>גלישת חוצץ שכן &larr; דריסת vptr &larr; זיוף Vtable בערימה &larr; קריאה וירטואלית &larr; הרצת קוד זדוני.</p>
      </div>
    `
  },
  {
    unit: "3",
    title: "גלישות מספרים שלמים (Integer Overflow / Underflow) ומלכודת malloc(count * size)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>מניעת גלישת כפל בהקצאה: <code>if (count &gt; SIZE_MAX / sizeof(T)) return ERR;</code> (בדיקת חלוקה לפני הכפל!).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p><code>malloc(len + 1)</code> כאשר <code>len = UINT_MAX</code> גולש ל-0 &ndash; מוקצה חוצץ זעיר והעתקה אליו מובילה ל-Heap Overflow.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>חיבור:</strong> <code>if (a &gt; MAX - b)</code></li>
          <li><strong>כפל:</strong> <code>if (b != 0 &amp;&amp; a &gt; MAX / b)</code></li>
        </ul>
      </div>
    `
  },
  {
    unit: "3",
    title: "חולשת מחרוזת פורמט (Format String) — קריאה (%x/%p), כתיבה שרירותית (%n) ומניעה",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>מחרוזת פורמט חייבת להיות קבועה סטטית בקוד: לעולם לא <code>printf(user)</code>, תמיד <code>printf("%s", user)</code>.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p><code>%n</code> הוא המציין היחיד שמבצע <strong>כתיבה</strong> לזיכרון. שאר המציינים (<code>%x, %s, %p</code>) מבצעים קריאה והדלפה.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><code>%x / %p:</code> הדלפת ערכי מחסנית וקנרית.</li>
          <li><code>%s:</code> קריאת זיכרון שרירותית.</li>
          <li><code>%n:</code> כתיבה שרירותית לזיכרון.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "3",
    title: "כשלי ניהול זיכרון בערימה: Use-After-Free, Double Free ו-Memory Leak",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>איפוס מצביע ל-<code>nullptr</code> מיד לאחר שחרור מונע UAF ו-Double Free. אימוץ RAII מונע כשלים אלה מהשורש.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>גישה למצביע לאחר <code>free(p)</code> = <strong>Use-After-Free</strong> (הזיכרון יועד לאובייקט חדש והקריאה תשחית אותו).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <table border="1" style="border-collapse:collapse; width:100%; font-size:0.85em;">
          <tr><th>כשל</th><th>מהות</th><th>סכנה</th><th>אפחות</th></tr>
          <tr><td><strong>UAF</strong></td><td>שימוש לאחר שחרור</td><td>חטיפת בקרה</td><td>איפוס ל-nullptr</td></tr>
          <tr><td><strong>Double Free</strong></td><td>שחרור כפול</td><td>השחתת ערימה</td><td>איפוס ל-nullptr</td></tr>
          <tr><td><strong>Leak</strong></td><td>אי-שחרור משאב</td><td>מיצוי זיכרון</td><td>עקרון RAII</td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "3",
    title: "כשלים מתקדמים: TOCTOU, מחיקת איפוס סודי (Dead Store Elimination) וארגז כלי בדיקה",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר במדריך הלמידה:</strong>
        <p>TOCTOU נמנע ע"י פעולות אטומיות במתארי קבצים. ניתוח סטטי מכסה את כל הקוד; ניתוח דינמי מנטר שגיאות אמת בריצה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>מוקשים/טיפים למבחן:</strong>
        <p>בדיקת הרשאה עם <code>access()</code> לפני <code>open()</code> = חולשת <strong>TOCTOU</strong> קלאסית. הפתרון: פתיחה אטומית ישירה.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תמצות קצרצר של מושגים:</strong>
        <ul>
          <li><strong>cppcheck:</strong> ניתוח סטטי, ללא הרצה.</li>
          <li><strong>Valgrind / ASan:</strong> ניתוח דינמי בריצה לאיתור UAF ודליפות.</li>
          <li><strong>Fuzzer:</strong> קלטים אקראיים לגילוי מקרי קצה.</li>
        </ul>
      </div>
    `
  },
{
    unit: "4",
    title: "צ'יט-שיט מבחן: יצירת מחלקה דינמית עם type(name, bases, dict)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p>תחביר <code>type(name, bases_tuple, dict)</code>: מקבל שם מחלקה (מחרוזת), טאפל של מחלקות אב, ומילון מתודות ושדות. כל מתודה חייבת לקבל <code>self</code> כפרמטר ראשון.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>מלכודת הפסיק בטאפל:</strong> בירושה ממחלקה בודדת חובה פסיק: <code>(BaseClass,)</code>! ללא פסיק <code>(BaseClass)</code> נחשב ביטוי סוגריים רגיל וזורק <code>TypeError: bases must be types</code>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <pre class="code" dir="ltr"><code>say = lambda self: f"Hi {self.name}"
Person = type("Person", (object,), {"greet": say})
p = Person(); p.name = "Alice"; print(p.greet())</code></pre>
      </div>
    `
  },
  {
    unit: "4",
    title: "צ'יט-שיט מבחן: עיבוד מחרוזות, מילים, וספירת תדירויות (שאלת 6)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>אי-השתנות של str:</strong> מתודות כמו <code>upper()</code>, <code>strip()</code> או חיתוך לעולם אינן משנות את המחרוזת המקורית, אלא מחזירות אובייקט חדש.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><code>line.split()</code> ללא פרמטר מפצל לפי כל רווח לבן (כולל רווחים כפולים ו-<code>\\n</code>). לספירת מילים ללא <code>KeyError</code> השתמשו ב-<code>d[w] = d.get(w, 0) + 1</code>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p><code>s[::-1]</code> היפוך מחרוזת &bull; <code>s[-1]</code> תו אחרון &bull; <code>w.strip(".,!?:;\\"'")</code> ניקוי פיסוק &bull; <code>w[0] == w[-1]</code> אות ראשונה ואחרונה זהות.</p>
      </div>
    `
  },
  {
    unit: "4",
    title: "מלכודת מבחן: היעדר העמסת פונקציות (Function Overloading) וברירות מחדל מוטביליות",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>אין העמסת פונקציות בפייתון!</strong> הגדרת מתודה שנייה בעלת אותו שם דורסת ומוחקת לחלוטין את הראשונה. פתרון דפנסיבי: פרמטרי ברירת מחדל (<code>y=None</code>) או <code>*args</code>.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>מלכודת ברירת מחדל מוטבילית:</strong> <code>def f(lst=[])</code> יוצר את הרשימה פעם אחת בלבד בטעינת הקוד והיא משותפת לכל הקריאות! פתרון: <code>lst=None</code> ואז בדיקת <code>if lst is None: lst = []</code>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <pre class="code" dir="ltr"><code>def safe_append(val, lst=None):
    if lst is None: lst = []
    lst.append(val); return lst</code></pre>
      </div>
    `
  },
  {
    unit: "4",
    title: "מה למרקר במדריך: כינוי כפול (Aliasing), העתקה רדודה לעומת עמוקה, ו-is מול ==",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><code>is</code> בודק זהות פיזית בזיכרון (<code>id(a) == id(b)</code>); בעוד <code>==</code> בודק שוויון תוכן (מתודת <code>__eq__</code>). השמה <code>b = a</code> יוצרת כינוי (Alias) לאותו אובייקט בדיוק.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>העתקה רדודה (<code>a.copy()</code> או <code>a[:]</code>) מעתיקה רק את המעטפת החיצונית. אם יש רשימות מקוננות, שינוי בהן ישתקף במקור! חובה <code>copy.deepcopy()</code> להפרדה מלאה.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p><code>b = a</code> (כינוי זהה) &bull; <code>b = a[:]</code> (העתקה רדודה: איברים פנימיים משותפים) &bull; <code>b = copy.deepcopy(a)</code> (העתקה עמוקה עצמאית לחלוטין).</p>
      </div>
    `
  },
  {
    unit: "4",
    title: "צ'יט-שיט מבחן: בריחת ארגז חול ברפלקציה (Python Sandbox Escape) מול ast.literal_eval",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><code>eval()</code> ו-<code>exec()</code> מאפשרות הרצת קוד שרירותי (RCE). איפוס <code>__builtins__</code> אינו מגן: תוקף משתמש ברפלקציה <code>().__class__.__base__.__subclasses__()</code> כדי לטפס ל-<code>object</code> ולשלוף את <code>os.system</code>.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>הפתרון הדפנסיבי:</strong> <code>ast.literal_eval()</code> &ndash; מפרסר בבטחה אך ורק מבני נתונים בסיסיים (מספרים, מחרוזות, רשימות, מילונים) וזורק שגיאה מיידית על כל קריאת פונקציה או קוד זדוני.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p><code>eval/exec</code> &larr; מסוכן תמיד (עקיף ברפלקציה) &bull; <code>ast.literal_eval</code> &larr; בטוח (נתונים פסיביים בלבד, ללא הרצת קוד).</p>
      </div>
    `
  },
  {
    unit: "4",
    title: "מה למרקר במדריך: סכנות סריאליזציה עם pickle ו-shelve (__reduce__ RCE)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p>מודול <code>pickle</code> (ו-<code>shelve</code> המבוסס עליו) אינו מאובטח! בעת דה-סריאליזציה (<code>loads</code>), מתודת <code>__reduce__</code> של האובייקט נקראת ומאפשרת לתוקף להריץ פקודות מערכת שרירותיות (RCE).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>כלל ברזל:</strong> לעולם אין לפתוח קובץ <code>pickle</code> ממקור חיצוני או מהרשת! להעברת נתונים בין מערכות יש להשתמש אך ורק בפורמט טקסטואלי בטוח כגון JSON.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <pre class="code" dir="ltr"><code>class Exploit:
    def __reduce__(self):
        return (os.system, ('cat /etc/passwd',))
# pickle.loads(pickle.dumps(Exploit())) -> מריץ פקודה מיד!</code></pre>
      </div>
    `
  },
  {
    unit: "4",
    title: "טיפ מבחן: כימוס, שיבוש שמות (Name Mangling) וחטיפת מודולים (sys.path)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><code>_x</code> היא מוסכמה לשימוש פנימי ללא אכיפה. <code>__x</code> מפעיל <strong>Name Mangling</strong> (משתנה ל-<code>_ClassName__x</code>) למניעת התנגשות בירושה &ndash; זהו אינו מנגנון אבטחה והשדה עדיין נגיש.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>חטיפת מודולים (sys.path[0]):</strong> האיבר הראשון בסריקה הוא תיקיית הסקריפט. קובץ מקומי בשם <code>math.py</code> ידרוס את המודול הסטנדרטי. בלוק <code>if __name__ == "__main__":</code> מונע הרצת קוד בייבוא.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p><code>_x</code> = מוסכמה &bull; <code>__x</code> = שיבוש שם לשם המחלקה &bull; <code>sys.path[0]</code> = תיקייה נוכחית קודמת לספריות מערכת.</p>
      </div>
    `
  },
  {
    unit: "5",
    title: "צ'יט-שיט מבחן: תבנית שרת ולקוח TCP ב-C++ ובפייתון ומלכודות קריטיות",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p>שקע ההאזנה (Listening Socket) משמש אך ורק לקבלת חיבורים ב-<code>listen/accept</code>. כל התקשורת מול הלקוח מתבצעת תמיד דרך השקע <strong>החדש</strong> שחוזר מ-<code>accept()</code>.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>מלכודת <code>recv()</code> ב-C++:</strong> הקריאה אינה מוסיפה תו סיום <code>\\0</code>! הדפסה ישירה ב-<code>printf("%s")</code> גוררת Buffer Over-read ודליפת זיכרון. חובה לבצע: <code>buf[bytes] = '\\0'</code>. בבדיקת שגיאות: <code>-1</code> מסמן שגיאה (ולא <code>0</code>!).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט סדר שרת TCP:</strong>
        <p><code>socket()</code> &rarr; <code>bind()</code> &rarr; <code>listen()</code> &rarr; <code>accept()</code> &rarr; <code>recv()/send()</code> &rarr; <code>close()</code>. קשירה ל-<code>127.0.0.1</code> בטוחה מקשירה ל-<code>0.0.0.0</code> (INADDR_ANY).</p>
      </div>
    `
  },
  {
    unit: "5",
    title: "צ'יט-שיט מבחן: בעיית ה-Framing מעל TCP ושליחת קבצים בצ'אנקים עם כותרת struct.pack",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>TCP כ-Byte Stream:</strong> אין גבולות הודעה! <code>recv(n)</code> עשוי להחזיר פחות מ-n בתים או לחבר מספר הודעות צמודות. חובה לממש מסגור (Framing) כגון כותרת אורך קבועה או תו מפריד.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>תבנית קריאה מלאה <code>recv_exact</code>: יש לקרוא בלולאה עד צבירת כל הבתים הנדרשים. אם <code>recv</code> החזיר 0 בתים &ndash; השקע נסגר בצד השני ויש לזרוק חריגת ניתוק.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <pre class="code" dir="ltr"><code># כותרת 12 בתים ברשת (Big-Endian):
header = struct.pack(">III", pkt_num, total_pkts, len(chunk))
sock.sendall(header + chunk)</code></pre>
      </div>
    `
  },
  {
    unit: "5",
    title: "מה למרקר במדריך: 7 שכבות מודל OSI מול TCP/IP ומלכודת שכבת הייצוג (Presentation)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>שכבה 6 (Presentation) &ndash; מוקש בחינה מובהק:</strong> אחראית על קידוד נתונים (ASCII, UTF-8), דחיסה ו<strong>הצפנה (SSL/TLS)</strong>! שכבה 4 (Transport) אחראית לפורטים (16 סיביות) ולסדר בתים ברשת (Big-Endian).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>כתובת MAC שייכת לשכבה 2 (48 סיביות / 6 בתים, מתג). כתובת IP שייכת לשכבה 3 (IPv4: 32 סיביות / 4 בתים; IPv6: 128 סיביות, נתב). המרת סדר בתים: <code>htons/ntohs</code> לפורטים, <code>htonl/ntohl</code> לכתובות IP.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט 7 שכבות:</strong>
        <p>1. פיזית (Bits) &bull; 2. Data Link (Frames, MAC) &bull; 3. Network (Packets, IP) &bull; 4. Transport (Segments, Ports, TCP/UDP) &bull; 5. Session &bull; 6. Presentation (הצפנה/TLS) &bull; 7. Application (HTTP, DNS).</p>
      </div>
    `
  },
  {
    unit: "5",
    title: "מלכודת מבחן ענקית: NAT אינו חומת אש (Firewall)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>NAT אינו חומת אש (Firewall)!</strong> תכליתו היא שימור כתובות IPv4 ע"י תרגום טווח כתובות פרטיות לכתובת ציבורית אחת. הוא אינו מספק אבטחה או סינון תוכן.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>בשאלות מבחן: האם NAT מגן מפני תקיפות? <strong>תשובה: לא!</strong> הוא אינו מסנן חבילות זדוניות, אינו חוסם Reverse Shell שיוצא מבפנים ואינו מגן מהזרקות יישום. רק Firewall אוכף מדיניות אבטחה.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p><strong>NAT:</strong> חסכון בכתובות IP &bull; <strong>Firewall:</strong> סינון חבילות, בדיקת מצב חיבורים (Stateful Inspection) וחסימת פורטים מסוכנים.</p>
      </div>
    `
  },
  {
    unit: "5",
    title: "צ'יט-שיט מבחן: חוטים מול תהליכים, מרוץ נתונים (Data Race) וסכנת std::thread ללא join",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><code>counter++</code> אינו פעולה אטומית (כולל Read, Add, Write)! גישה מקבילית ללא סנכרון כשיש כותב היא Data Race המהווה Undefined Behavior (UB) ב-C++. פתרון: <code>std::atomic&lt;int&gt;</code> או נעילה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>מלכודת <code>std::thread</code>:</strong> אם אובייקט חוט נהרס לפני שנקרא עליו <code>join()</code> או <code>detach()</code>, מופעלת מיד <code>std::terminate()</code> והתוכנית מתרסקת! נעילה תתבצע תמיד ב-RAII דרך <code>std::lock_guard</code> למניעת Deadlock.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p>תהליכים = מרחב זיכרון נפרד (IPC) &bull; חוטים = ערימה משותפת, מחסנית נפרדת לכל חוט &bull; מניעת Deadlock: רכישת מנעולים בסדר גלובלי אחיד.</p>
      </div>
    `
  },
  {
    unit: "5",
    title: "מה למרקר במדריך: נעילת המפרש (GIL בפייתון) וריבוי מעבדים (multiprocessing)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p>ה-GIL ב-CPython מאפשר רק לחוט אחד בכל רגע לבצע Bytecode של פייתון. לכן, ריבוי חוטים (<code>threading</code>) אינו מנצל ריבוי ליבות במשימות חישוביות (CPU-Bound).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>במשימות I/O-Bound (רשת, קבצים) מודול <code>threading</code> יעיל כי ה-GIL משתחרר בהמתנה למערכת ההפעלה. למשימות CPU-Bound (עיבוד תמונה, קריפטו) חובה להשתמש ב-<code>multiprocessing</code> שמייצר תהליכים עם GIL עצמאי לכל אחד.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p>I/O-Bound &larr; <code>threading</code> (ה-GIL משתחרר בקלט/פלט) &bull; CPU-Bound &larr; <code>multiprocessing</code> (תהליכים נפרדים וניצול ליבות מלא).</p>
      </div>
    `
  },
  {
    unit: "5",
    title: "צ'יט-שיט מבחן: ריבוב קלט/פלט (Reactor / Selectors) מול מודל חוט לכל לקוח",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p>מודל Thread-per-client פגיע למתקפות DoS/Slowloris בגלל תקורה כבדה של הקצאת מחסניות והחלפות הקשר (Context Switches) עבור אלפי חיבורי סרק.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>תבנית Reactor:</strong> חוט יחיד מאזין לאלפי שקעים במקביל באמצעות <code>selectors</code>/<code>epoll</code> ומתעורר רק כשיש מידע מוכן לקריאה. הגנות חובה: הגדרת Timeouts לחיבורים רדומים ותקרת חיבורים מקסימלית.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p>Thread-per-client: תקורה כבדה וסכנת DoS &bull; Reactor (I/O Multiplexing): חוט יחיד, מונחה אירועים (Event-driven), עמידות גבוהה בעומסים.</p>
      </div>
    `
  },
  {
    unit: "5",
    title: "צ'יט-שיט מבחן: הצפנה היברידית (TLS), קריפטוגרפיה פוסט־קוונטית (PQC) ואיומי שור/גרובר",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>הצפנה היברידית (TLS):</strong> הצפנה אסימטרית (RSA/ECDH) משמשת בשלב הלחיצה (Handshake) לאימות השרת והחלפת מפתח סודי ארעי; תוכן הנתונים עצמו מוצפן בהצפנה סימטרית מהירה (AES-GCM).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>איום קוונטי:</strong> אלגוריתם שור (Shor) שובר לחלוטין את כל ההצפנה האסימטרית הקלאסית (RSA, DH, ECC). אלגוריתם גרובר (Grover) מוציא שורש ממפתחות סימטריים &ndash; לכן חובה להגדיל ל-<strong>AES-256</strong> (המספק 128 סיביות הגנה קוונטית).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p>מתקפת Replay נמנעת ע"י Nonce וחותמת זמן &bull; תקני NIST PQC: מפתחות ML-KEM (Kyber), חתימות ML-DSA (Dilithium) ו-SPHINCS+.</p>
      </div>
    `
  },
  {
    unit: "6",
    title: "צ'יט-שיט מבחן: מכונות וירטואליות (VM) מול קונטיינרים (Containers) — מבחן 2025ג",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p>ההבדל הארכיטקטוני המרכזי: לכל VM יש ליבת מערכת הפעלה (Kernel) עצמאית ונפרדת; קונטיינרים חולקים כולם את אותה ליבת מארח יחידה דרך Namespaces ו-cgroups.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (הכרעת 2025ג):</strong>
        <p>להרצת קוד זר עוין או הפרדת דיירים רגישים נבחר ב-<strong>VM</strong> (בידוד חומרה חזק). לפריסת מיקרו-שירותים פנימיים מהירים וחסכון במשאבים נבחר ב-<strong>Container</strong>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <table border="1" cellpadding="4" style="border-collapse:collapse; width:100%; font-size:0.9em;">
          <tr style="background:#f2f2f2;"><th>מאפיין</th><th>מכונה וירטואלית (VM)</th><th>קונטיינר (Docker)</th></tr>
          <tr><td><b>וירטואליזציה</b></td><td>חומרה מלאה (Hypervisor)</td><td>מערכת הפעלה (Namespaces, cgroups)</td></tr>
          <tr><td><b>Kernel</b></td><td>ליבה עצמאית ונפרדת לכל מכונה</td><td>ליבה משותפת של המארח לכולם</td></tr>
          <tr><td><b>בידוד אבטחתי</b></td><td>חזק מאוד (VM Escape נדיר)</td><td>בידוד תהליכים לוגי (פגיע לבאג ליבה)</td></tr>
          <tr><td><b>משאבים ועליה</b></td><td>איטי (דקות), צורך גיגה-בייטים</td><td>מהיר (שניות), צורך מגה-בייטים</td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "6",
    title: "צ'יט-שיט מבחן: תכנון ארגז חול (Sandbox) להרצת קוד זר ומהדר מקוון — מבחן 2021א",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p>בידוד רב-שכבתי להרצת קוד זר: משתמש מוגבל (<code>nobody</code>), מערכת קבצים לקריאה בלבד (<code>chroot</code>), חסימת קריאות מערכת (<code>seccomp</code>), הגבלת משאבים (<code>cgroups</code>) וניתוק רשת מלא.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שאלת "אילו בעיות נשארות?"):</strong>
        <p>גם בארגז חול מוקפד נותרות חולשות יום-אפס (0-Day) בליבת מערכת ההפעלה, מתקפות ערוץ צדדי (Side-Channel) למדידת זמנים וזיכרון, ובאגים במנגנון הבקר עצמו.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט 5 עקרונות Sandbox:</strong>
        <p>1. משתמש ללא הרשאות &bull; 2. מערכת קבצים לקריאה בלבד &bull; 3. סינון Syscalls (seccomp) &bull; 4. מכסות CPU/RAM (cgroups, rlimit) &bull; 5. בידוד רשת מוחלט.</p>
      </div>
    `
  },
  {
    unit: "6",
    title: "מה למרקר במדריך: מדיניות המוצא הזהה (SOP) וההבדל המהותי בין XSS ל-CSRF",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>Same-Origin Policy:</strong> מוצא מוגדר ע"י פרוטוקול, מארח ופורט. הוא מונע <i>קריאת</i> מידע ממוצא אחר, אך אינו חוסם <i>שליחת</i> בקשות (כמו שליחת טופס POST ברשת).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>ההבדל בין XSS ל-CSRF:</strong> ב-XSS התוקף <strong>מזריק קוד JS</strong> לאתר היעד ועוקף את ה-SOP לחלוטין. ב-CSRF התוקף <strong>אינו מריץ קוד</strong> באתר היעד, אלא מפתה לשליחת בקשה המצרפת עוגיות אוטומטית.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p>מניעת XSS: קידוד פלט מותאם-הקשר, <code>HttpOnly</code> ו-CSP &bull; מניעת CSRF: אסימוני Anti-CSRF (Tokens), ודגל <code>SameSite=Strict/Lax</code>.</p>
      </div>
    `
  },
  {
    unit: "6",
    title: "מלכודת מבחן: ניהול מושב, אבטחת עוגיות (HttpOnly, Secure, SameSite) ו-Web 2.0",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p>HTTP הוא Stateless; מזהה המושב (Session ID) מגדיר את זהות המשתמש מול השרת. לעולם אין לשמור בעוגיה שדות הניתנים לעריכה בצד הלקוח כמו <code>role=admin</code>!</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (3 דגלי החובה לעוגיה):</strong>
        <p><code>HttpOnly</code> מונע גישה מ-JavaScript ומסכל גניבת מושב ב-XSS; <code>Secure</code> שולח רק ב-HTTPS ומסכל ציתות רשת (MITM); <code>SameSite=Strict/Lax</code> מונע שליחה מאתר זר ומסכל CSRF.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p><code>HttpOnly</code> &larr; הגנה מגניבת סשן ב-XSS &bull; <code>Secure</code> &larr; הגנה מציתות MITM &bull; <code>SameSite</code> &larr; הגנה מ-CSRF.</p>
      </div>
    `
  },
  {
    unit: "6",
    title: "מה למרקר במדריך: מודלי שירות בענן (IaaS, PaaS, SaaS, FaaS) ומודל האחריות המשותפת",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>אחריות משותפת בענן:</strong> שום מודל שירות אינו פוטר את המפתח מאבטחת הקוד שלו. פרצות אפליקטיביות (כמו SQLi) ודליפת מפתחות API הן תמיד באחריות הבלעדית של הלקוח!</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>ב-IaaS הלקוח מנהל את מערכת ההפעלה והטלאים. ב-PaaS וב-FaaS (Serverless) הספק מנהל את מערכת ההפעלה וזמן הריצה, והלקוח אחראי על קוד האפליקציה והנתונים בלבד.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט מודלי ענן:</strong>
        <p>IaaS: חומרה מנוהלת (VMs) &bull; PaaS: פלטפורמה מנוהלת (App Engine) &bull; FaaS: פונקציות לפי אירוע (Lambda) &bull; SaaS: שירות שלם מנוהל (Gmail).</p>
      </div>
    `
  },
  {
    unit: "6",
    title: "טיפ מבחן: רשת עמוקה (Deep Web) מול Tor, ומגבלות צומת היציאה (Exit Node)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>Deep Web:</strong> כל תוכן שאינו מאונדקס ע"י מנועי חיפוש (כמו תיבות מייל ומסדי נתונים פנימיים) &ndash; מונח ניטרלי שאינו מעיד על פשיעה. רשת Darknet/Tor היא רק תת-קבוצה ייעודית.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (מלכודת צומת היציאה):</strong>
        <p>Tor מספק אנונימיות זהות במסלול בלבד אך <strong>אינו תחליף ל-TLS/HTTPS!</strong> צומת היציאה (Exit Node) מפענח את שכבת ההצפנה האחרונה ורואה תעבורת HTTP לא מוצפנת בגלוי (סיסמאות ועוגיות).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p>Tor מצפין ב-3 צמתים (Guard, Middle, Exit) &bull; צומת יציאה רואה תעבורה גלויה מול שרת היעד &bull; חובה להשתמש ב-HTTPS גם בתוך Tor.</p>
      </div>
    `
  },
  {
    unit: "7",
    title: "מה למרקר במדריך: תת-השפות של SQL (DQL, DML, DDL, DCL) והשפעתן על יעדי CIA",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p>מפתח ראשי (Primary Key) מזהה שורה באופן ייחודי ולעולם אינו NULL. מפתח זר (Foreign Key) מקשר למפתח ראשי בטבלה אחרת ואוכף שלמות קשרים (Referential Integrity).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>מיפוי פקודות SQL ליעדי CIA: פקודת <code>SELECT</code> (DQL) פוגעת בסודיות (Confidentiality); פקודות <code>INSERT/UPDATE/DELETE</code> (DML) ו-<code>DROP/TRUNCATE</code> (DDL) פוגעות בשלמות ובזמינות.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <table border="1" cellpadding="4" style="border-collapse:collapse; width:100%; font-size:0.9em;">
          <tr style="background:#f2f2f2;"><th>תת-שפה</th><th>פקודות</th><th>יעד CIA שנפגע בהזרקה</th></tr>
          <tr><td><b>DQL</b></td><td><code>SELECT</code></td><td><b>סודיות</b> &ndash; הדלפת נתונים רגישים</td></tr>
          <tr><td><b>DML</b></td><td><code>INSERT, UPDATE, DELETE</code></td><td><b>שלמות וזמינות</b> &ndash; שינוי ומחיקת שורות</td></tr>
          <tr><td><b>DDL</b></td><td><code>CREATE, ALTER, DROP</code></td><td><b>זמינות ושלמות</b> &ndash; הריסת טבלאות וסכימה</td></tr>
          <tr><td><b>DCL</b></td><td><code>GRANT, REVOKE</code></td><td><b>בקרת גישה</b> &ndash; הסלמת הרשאות לתוקף</td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "7",
    title: "מלכודת מבחן ענקית ב-C API של SQLite: אינדקס 1-based ב-Bind מול 0-based ב-Column",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>חובת שחרור statement:</strong> בסיום שימוש ב-<code>sqlite3_stmt*</code> חובה לקרוא ל-<code>sqlite3_finalize(stmt)</code> למניעת דליפת זיכרון. פונקציית <code>sqlite3_exec()</code> מיועדת ל-DDL סטטי בלבד.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (מלכודת האינדוקס הקריטית ב-C API):</strong>
        <p>בקשירת פרמטרים (<code>sqlite3_bind_*</code>) האינדקס מתחיל מ-<strong>1</strong> (העברת 0 זורקת <code>SQLITE_RANGE</code>); בשליפת עמודות (<code>sqlite3_column_*</code>) האינדקס מתחיל מ-<strong>0</strong>!</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט אינדוקס SQLite ב-C++:</strong>
        <p><code>sqlite3_bind_*</code> &larr; 1-based (ה-? הראשון הוא 1) &bull; <code>sqlite3_column_*</code> &larr; 0-based (העמודה הראשונה היא 0) &bull; צעידה: <code>sqlite3_step</code> &bull; שחרור: <code>sqlite3_finalize</code>.</p>
      </div>
    `
  },
  {
    unit: "7",
    title: "צ'יט-שיט מבחן: SQLite בפייתון — שאילתות פרמטריות, טופל פסיק (val,) ו-commit",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>חובת commit:</strong> בפעולות משנות נתונים (DML: <code>INSERT/UPDATE/DELETE</code>) חובה לקרוא ל-<code>conn.commit()</code>, אחרת השינויים יאבדו בסגירת החיבור ולא יישמרו בדיסק.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (מלכודת הטאפל):</strong>
        <p>כשמעבירים פרמטר בודד לשאילתה פרמטרית, חובה להעביר טאפל עם פסיק <code>(val,)</code>! ללא פסיק, פייתון מתייחסת לביטוי כאל סוגריים רגילים ומפרקת את המחרוזת לתווים בודדים.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <pre class="code" dir="ltr"><code># שאילתה פרמטרית תקנית בפייתון:
cursor.execute("SELECT * FROM Users WHERE id = ?", (user_id,))
conn.commit(); conn.close()</code></pre>
      </div>
    `
  },
  {
    unit: "7",
    title: "מלכודת מבחן עליונה: מצייני מקום (?) לא עובדים על שמות טבלאות ועמודות (Identifiers) — חובת Whitelist",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p>מצייני מקום (<code>?</code>) עובדים על <strong>ערכי נתונים (Data) בלבד</strong>! לא ניתן להשתמש ב-<code>?</code> עבור שמות טבלאות או עמודות (Identifiers כמו ב-<code>ORDER BY ?</code>).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>הפתרון הדפנסיבי לשמות דינמיים:</strong> שימוש ברשימה לבנה קשיחה (Whitelist) במילון. בודקים שהקלט קיים במילון המאושר, ומשרשרים לשאילתה אך ורק את הערך המאומת מתוך המילון.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <pre class="code" dir="ltr"><code>COLS = {"name": "Name", "score": "Score"}
if col_input not in COLS: raise ValueError("Invalid column")
cursor.execute(f"SELECT * FROM Users ORDER BY {COLS[col_input]}")</code></pre>
      </div>
    `
  },
  {
    unit: "7",
    title: "צ'יט-שיט מבחן: מנגנון הזרקות SQL (SQLi), אשליות f-string/format, וטכניקות מעקף",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p>שרשור מחרוזות (כולל f-strings ו-format) ל-SQL שובר את גבול האמון ומאפשר הזרקת תחביר. מילוט גרשים (Escaping) נכשל לחלוטין מול הזרקות מספריות (כמו <code>WHERE id = 1 OR 1=1</code> ללא גרש!).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p><strong>קו ההגנה היחיד:</strong> שאילתות פרמטריות (Prepared Statements עם <code>?</code>). ה-DB מפרסר את מבנה הפקודה תחילה, ומתייחס לקלט כנתון טהור שלעולם אינו משנה את עץ התחביר.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט תבניות SQLi:</strong>
        <p>עקיפת אימות: <code>' OR '1'='1</code> &bull; חיתוך סיסמה: <code>admin' --</code> &bull; שליפת מידע: <code>' UNION SELECT null, password FROM users --</code>.</p>
      </div>
    `
  },
  {
    unit: "7",
    title: "מה למרקר במדריך: עקרונות Clean Code באבטחה — SOLID, KISS, DRY וחוק קרניגן",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>חוק קרניגן:</strong> "ניפוי שגיאות קשה פי שניים מכתיבת הקוד. אם כתבתם אותו בצורה הכי מתוחכמת שאפשר, אינכם חכמים מספיק כדי לנפות ממנו שגיאות". עקרון KISS וסילוק מספרי קסם הם מפתח לקוד הניתן לביקורת אבטחה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שאלת הפרת SRP):</strong>
        <p>מחלקה אחת שגם מנהלת חיבור רשת, גם מעבדת נתונים עסקיים וגם כותבת ל-DB מפרה את עקרון האחריות היחידה (Single Responsibility). יש לפצלה לשלוש מחלקות ייעודיות ונפרדות.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <p><strong>SRP:</strong> אחריות יחידה וסיבה בודדת לשינוי &bull; <strong>DRY:</strong> מניעת שכפול בדיקות אבטחה &bull; הערות בקוד: לתעד <i>למה</i> (Why) ולא <i>מה</i> (What).</p>
      </div>
    `
  },
  {
    unit: "7",
    title: "צ'יט-שיט מבחן: פירוק קוד חץ (Arrow Anti-Pattern) בעזרת תנאי שמירה (Guard Clauses)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><strong>Arrow Anti-Pattern:</strong> קינון עמוק של תנאי <code>if</code> מקשה על מעקב ובדיקות אבטחה ומסתיר באגים. הפתרון הוא תנאי שמירה (Guard Clauses) ויציאה מוקדמת לשמירה על נתיב ריצה שטוח וקריא.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>בשאלות שיפור קוד (Refactoring): החליפו מיד בלוקי <code>if-else</code> מקוננים בבדיקות כשל שליליות בתחילת הפונקציה (<code>if invalid: return False</code>).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <pre class="code" dir="ltr"><code># תנאי שמירה ונתיב שטוח (Clean & Safe):
if not sender or not receiver: return False
if amount <= 0 or sender.balance < amount: return False
sender.balance -= amount; receiver.balance += amount; return True</code></pre>
      </div>
    `
  },
  {
    unit: "7",
    title: "טיפ מבחן: קריאת קבצים והזנה בטוחה ל-SQLite ללא כפילויות (executemany / INSERT OR IGNORE)",
    content: `
      <div class="note-box highlight">
        <strong>מה למרקר:</strong>
        <p><code>INSERT OR IGNORE</code> מונע קריסת תוכנית בהתנגשות מפתח ראשי (Primary Key) בדילוג שקט על שורות כפולות. לביצועים מרביים משתמשים ב-<code>cursor.executemany()</code> בטרנזקציה יחידה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>בשאלות הזנת קבצים ל-DB: יש לצבור את כל השורות התקינות לטאפלים ברשימה, ולהזין בפקודה אחת ע"י <code>executemany("INSERT OR IGNORE...", rows)</code> וסיום ב-<code>conn.commit()</code>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט שיט:</strong>
        <pre class="code" dir="ltr"><code># הזנה מרוכזת ובטוחה מכפילויות:
cursor.executemany("INSERT OR IGNORE INTO Users VALUES (?, ?)", rows)
conn.commit()</code></pre>
      </div>
    `
  }
];
