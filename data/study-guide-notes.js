window.STUDY_GUIDE_NOTES = [
// --- יחידה 1: מבוא לתכנות דפנסיבי וביקורת אבטחה ---
  {
    unit: "1",
    title: "הבחנה מבדלת: באג, חולשת אבטחה (Vulnerability), ניצול (Exploit) ואפחות (Mitigation)",
    content: `
      <p>שפת המושגים הרשמית מתוך ספר הקורס (AOSSA) והמצגות, המהווה בסיס לכל שאלות חלק א' במבחנים:</p>
      <ul>
        <li><strong>באג (Bug / Defect):</strong> שגיאה לוגית או פונקציונלית בקוד שגורמת לסטייה מהמפרט. כל עוד אין לה השלכות על הרשאות או יעדי אבטחה, היא אינה מוגדרת כחולשה.</li>
        <li><strong>חולשת אבטחה (Vulnerability):</strong> פגם בתכנון, במימוש או בתפעול המאפשר לגורם כלשהו לחרוג ממדיניות האבטחה (CIA). <em>החולשה קיימת בקוד מרגע כתיבתו, גם אם איש טרם גילה אותה או ניצל אותה.</em></li>
        <li><strong>ניצול חולשה (Exploitation / Exploit):</strong> הפעולה הזדונית האקטיבית (או קוד תקיפה ייעודי) שבאמצעותה מופקת תועלת מהחולשה.</li>
        <li><strong>אפחות (Mitigation):</strong> מנגנון הגנה הנדסי או נוהל שמטרתו למזער את הנזק והסיכון מתקיפה. <em>אפחות אינה מבטיחה הסרה מוחלטת של הבאג מהשורש, אלא מצמצמת את יכולת הניצול.</em></li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>"כל חולשת אבטחה היא באג, אך לא כל באג הוא חולשת אבטחה." חולשה נמדדת תמיד ביחס למדיניות האבטחה (Security Policy) של המערכת. אפחות (Mitigation) אינה שוות ערך לתיקון שורש (Remediation/Patch), אלא שכבת הגנה הממזערת פגיעה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (מתוך שחזורי 2021א מועד 74 ו-2022ג):</strong>
        <p>שאלה אמריקאית שחוזרת על עצמה שואלת: <em>"מהי ההגדרה המדויקת של אפחות (Mitigation)?"</em>
        <br><strong>המסיח הנכון:</strong> הגנת המערכת בפני תקיפה לצורך מזעור הנזק העלול להיגרם ממנה.
        <br><strong>מסיחים שגויים נפוצים:</strong> "מצב שבו המערכת נקייה לחלוטין מבאגים" (שגוי! אפחות לא מנקה באגים), או "שמירה על סודיות המידע בלבד" (שגוי! זו הגדרת סודיות).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט-שיט השוואתי:</strong>
        <table border="1" style="border-collapse:collapse; width:100%; font-size:0.9em;">
          <tr><th>מושג</th><th>מהות</th><th>דוגמה מהחיים</th></tr>
          <tr><td><strong>באג</strong></td><td>סטייה ממפרט ללא פגיעה ב-CIA</td><td>כפתור ביטול מציג טקסט הפוך</td></tr>
          <tr><td><strong>חולשה</strong></td><td>פגם המאפשר עקיפת מדיניות אבטחה</td><td>פונקציית <code>gets()</code> שאינה בודקת אורך קלט</td></tr>
          <tr><td><strong>ניצול</strong></td><td>הפעלת מטען תקיפה הלכה למעשה</td><td>שליחת מחרוזת של 200 בתים הדורסת כתובת חזרה</td></tr>
          <tr><td><strong>אפחות</strong></td><td>שכבת בלימה ומזעור נזק</td><td>קנרית מחסנית שעוצרת את התהליך לפני <code>ret</code></td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "1",
    title: "משולש ה-CIA, יעדי הפגיעה ואמצעי אפחות מותאמים לכל יעד",
    content: `
      <p>שלושת עמודי התווך של אבטחת מידע. בכל ניתוח ממצא ביקורת חובה לציין במפורש את היעד שנפגע:</p>
      <ul>
        <li><strong>סודיות (Confidentiality):</strong> מניעת צפייה או חשיפה של מידע לגורמים לא מורשים.
          <br><em>אפחות מותאם:</em> הצפנה חזקה (AES, TLS), בקרת גישה (Access Control), הרשאת מינימום.</li>
        <li><strong>שלמות (Integrity):</strong> מניעת שינוי, השחתה, הזרקה או מחיקה בלתי מורשית של מידע, קוד או מצביעים.
          <br><em>אפחות מותאם:</em> חתימות דיגיטליות, קודי גיבוב (SHA-256, HMAC), בקרת גבולות זיכרון, הרשאות כתיבה צרות.</li>
        <li><strong>זמינות (Availability):</strong> הבטחת נגישות המערכת והמשאבים למשתמשים מורשים בכל עת.
          <br><em>אפחות מותאם:</em> יתירות (Redundancy), הגבלת קצב (Rate Limiting), Timeouts, תבנית Reactor.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>יעדי ה-CIA הם בלתי תלויים: מתקפת DoS פוגעת בזמינות בלבד (הנתונים לא נחשפו ולא שונו); קריאת זיכרון דרך Format String פוגעת בסודיות בלבד; שינוי מחיר במסד נתונים פוגע בשלמות בלבד.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (ניתוח תרחישים):</strong>
        <p>כאשר מוצג תרחיש בשאלות פתוחות, הקפידו על התאמה מדויקת:
        <br>• גיבוי שנשאר פתוח ברשת / לוג המכיל סיסמאות / Heartbleed &rarr; <strong>פגיעה בסודיות</strong>.
        <br>• הזרקת SQL המעדכנת יתרות / דריסת מצביע בזיכרון / זיוף תעודת זהות &rarr; <strong>פגיעה בשלמות</strong>.
        <br>• קריסת שרת עקב Segfault / הצפת DDoS / נעילת קבצים ע"י כופרה &rarr; <strong>פגיעה בזמינות</strong>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט-שיט מיפוי CIA &rarr; מנגנוני אפחות:</strong>
        <ul>
          <li><strong>סודיות:</strong> הצפנה (AES/RSA) &bull; ערוץ מאובטח (TLS) &bull; מידור הרשאות.</li>
          <li><strong>שלמות:</strong> גיבוב קריפטוגרפי (SHA-2) &bull; חתימה דיגיטלית &bull; בדיקת גבולות מערך &bull; W^X.</li>
          <li><strong>זמינות:</strong> חסימת הצפות (Rate Limiter) &bull; Timeouts לחיבורים &bull; מניעת דליפות זיכרון ב-RAII.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "סיווג חולשות: עיצוב, מימוש, תפעול ושטחים אפורים (Gray Areas)",
    content: `
      <p>סיווג מקור הפגם לפי שלב מחזור החיים שבו נוצר:</p>
      <ul>
        <li><strong>חולשת עיצוב (Design):</strong> פגם במפרט, בארכיטקטורה או בפרוטוקול. הקוד נכתב ללא אף שגיאה ופועל במדויק לפי האפיון, אך המודל עצמו פרוץ. <em>דוגמה:</em> פרוטוקול Telnet/HTTP המעביר סיסמאות בטקסט גלוי; ממשק שסומך על הלקוח לבצע אימות נתונים.</li>
        <li><strong>חולשת מימוש (Implementation):</strong> פגם בקוד המקור שנוצר ע"י המתכנת. התכנון היה תקין אך הקוד שגוי. <em>דוגמה:</em> שימוש ב-<code>gets()</code> במקום <code>fgets()</code>; שגיאת Off-by-One; חוסר בדיקת גבולות.</li>
        <li><strong>חולשה תפעולית (Operational):</strong> פגם שמקורו בסביבת הפריסה, בתחזוקה, בקונפיגורציה או בגורם האנושי. <em>דוגמה:</em> סיסמת ברירת מחדל admin/admin; אי-התקנת טלאי אבטחה (1-Day); השארת שירותי Debug פעילים.</li>
        <li><strong>שטחים אפורים (Gray Areas):</strong> מקרים שבהם שתי פרשנויות עשויות להתקבל (כגון הודעות שגיאה מפורטות או מדיניות סיסמאות).</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>"תיקון קוד נקודתי לעולם אינו מרפא חולשת עיצוב." אם הפרוטוקול אינו כולל הצפנה, כתיבה מושלמת ב-C++ לא תמנע האזנה בתווך (MITM).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שאלת Telnet ושאלות סיווג):</strong>
        <p>במבחן נשאלה השאלה: <em>"מערכת שרתים מעבירה סיסמאות בפרוטוקול Telnet. מהו סיווג החולשה?"</em>
        <br><strong>תשובה: חולשת עיצוב!</strong> כי Telnet תוכנן במקור ללא הצפנה. גם אם תכתוב את שרת ה-Telnet הטוב בעולם ללא באג יחיד – הסיסמאות יזרמו בגלוי.
        <br>לעומת זאת, אם המפרט דרש קריאת 16 בתים והמתכנת השתמש ב-<code>strcpy</code> ללא גבול &rarr; <strong>חולשת מימוש</strong>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>טבלת החלטה מהירה:</strong>
        <table border="1" style="border-collapse:collapse; width:100%; font-size:0.9em;">
          <tr><th>האם הקוד תואם למפרט?</th><th>האם הפרוטוקול מאובטח?</th><th>הסיווג</th></tr>
          <tr><td>לא (יש באג בקוד)</td><td>תקין</td><td><strong>חולשת מימוש</strong></td></tr>
          <tr><td>כן (הקוד מדויק)</td><td>לא (המודל שבור)</td><td><strong>חולשת עיצוב</strong></td></tr>
          <tr><td>כן (קוד ועיצוב תקינים)</td><td>תקין (הבעיה בהתקנה/ניהול)</td><td><strong>חולשה תפעולית</strong></td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "1",
    title: "יחסי אמון, גבולות אמון (Trust Boundaries) ושרשרת אמון (Trust Chain)",
    content: `
      <p>הנדסת תוכנה דפנסיבית מבוססת על ההבנה שכל מתן אמון מייצר משטח תקיפה:</p>
      <ul>
        <li><strong>גבול אמון (Trust Boundary):</strong> הממשק המפריד בין שני רכיבים בעלי רמות אמון או הרשאות שונות (למשל: תהליך משתמש מול קרנל, קלט מהאינטרנט מול שרת פנימי).
          <br><em>חוק ברזל:</em> <strong>כל נתון שחוצה גבול אמון נחשב עוין עד שהוכח אחרת! חובה לבצע אימות טיפוס, טווח, ואורך.</strong></li>
        <li><strong>שרשרת אמון (Trust Chain):</strong> יחסי אמון הם טרנזיטיביים: אם A סומך על B ו-B סומך על C &larr; A סומך בפועל על C. פריצה ל-C מובילה להשתלטות על A.</li>
        <li><strong>רשות תעודות דיגיטליות (CA) ומתקפת אדם-באמצע (MITM):</strong> הדפדפן סומך על ה-CA. אם תוקף מצליח להנפיק תעודה מזויפת בחסות CA פרוץ, שרשרת האמון קורסת, והתוקף יכול לפענח תעבורת HTTPS.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>ההבדל בין Windows 98 ל-Windows מודרני: ב-Windows 98 לא היו גבולות אמון פנימיים וכל תוכנית יכלה לפנות ישירות לזיכרון הקרנל. במערכות מודרניות, בידוד מרחב הכתובות הוא גבול אמון קשיח הנאכף בחומרה ע"י ה-MMU.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>בשאלות ניתוח ארכיטקטורה, תמיד חפשו: <em>"היכן עובר גבול האמון והאם הרכיב הפנימי סומך על בדיקות של רכיב חיצוני?"</em>
        הסתמכות של השרת על כך שהלקוח ביצע בדיקת אורך (Client-side validation) היא שבירה קטלנית של גבול האמון (חולשת עיצוב חמורה).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט-שיט עקרונות גבול אמון:</strong>
        <ul>
          <li>אין בדיקה בצד הלקוח בלבד &ndash; השרת חייב לבדוק שוב תמיד.</li>
          <li>כל קלט חיצוני (רשת, קובץ, argv, משתני סביבה) הוא מעבר לגבול אמון.</li>
          <li>שרשרת אמון נמדדת לפי החוליה החלשה ביותר שלה (Weakest Link).</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "צמידות חלשה ולכידות חזקה, תרשים מחלקות UML ומבנה ממשקים מאובטח",
    content: `
      <p>עקרונות מבנה תוכנה המשרתים ישירות את אבטחת המערכת:</p>
      <ul>
        <li><strong>לכידות גבוהה (High Cohesion):</strong> מחלקה מתמקדת באחריות יחידה. לכידות נמוכה מייצרת "מחלקות מפלצת" המקבלות עודף הרשאות וקשות לביקורת.</li>
        <li><strong>צמידות חלשה (Low Coupling):</strong> תלות מינימלית בין מודולים דרך ממשקים צרים. מונעת התפשטות נזק (Blast Radius) בעת פריצה לרכיב מסוים.</li>
        <li><strong>סימוני UML בסיסיים:</strong>
          <br><code>+</code> ציבורי (Public), <code>-</code> פרטי (Private), <code>#</code> מוגן (Protected).
          <br><em>קשרים:</em> ירושה (חץ רציף משולש חלול, <code>is-a</code>); הרכבה (מעוין מלא, תלות חיים בלעדית); צבירה (מעוין חלול, הכלה עצמאית); תלות (חץ מקווקו); חברות (<code>&lt;&lt;friend&gt;&gt;</code> &ndash; שוברת כימוס ומגדילה צמידות!).
        </li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>מלכודת סדר מתודות ציבוריות (API Order):</strong> אם מחלקה חושפת מתודת <code>execute()</code> ומתודת <code>check()</code> בנפרד כציבוריות, תוקף יקרא ישירות ל-<code>execute()</code>.
        <em>הפתרון המאובטח:</em> שתי המתודות חייבות להיות פרטיות, ומתודה ציבורית יחידה תאכוף קריאה ל-check לפני execute.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (מיפוי שמות משתמשים - User Enumeration):</strong>
        <p>טיפול בשגיאות ממשק: החזרת הודעה "שם משתמש שגוי" מול "סיסמה שגויה" היא חולשת אבטחה! היא מאפשרת לתוקף לבצע Brute-Force כדי למפות שמות משתמשים תקפים במערכת.
        <strong>הפתרון הדפנסיבי:</strong> הודעה כללית ואחידה תמיד: <em>"שם משתמש או סיסמה שגויים"</em>, בתוספת השהיית זמן מדורגת.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט-שיט קשרי UML:</strong>
        <ul>
          <li><code>Base &lt;|-- Derived</code> : ירושה (Generalization / is-a)</li>
          <li><code>Car *-- Engine</code> : הרכבה (Composition - מנוע מת עם הרכב)</li>
          <li><code>Course o-- Student</code> : צבירה (Aggregation - סטודנט חי ללא הקורס)</li>
          <li><code>A ..&gt; B</code> : תלות (Dependency)</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "עקרונות תכנון דפנסיבי: הגנה לעומק, הרשאת מינימום, ברירת מחדל בטוחה ותיווך מלא",
    content: `
      <p>ארבעת עקרונות התכנון המאובטח הקלאסיים של Saltzer & Schroeder החוזרים בכל פרקי הקורס:</p>
      <ul>
        <li><strong>הגנה לעומק (Defense in Depth):</strong> בניית שכבות הגנה בלתי תלויות זו בזו. כשל במנגנון הגנה אחד אינו מפיל את המערכת משום שהשכבה הבאה בולמת את התוקף (לדוגמה: אימות קלט + קנרית + ASLR + DEP + הרשאות משתמש מוגבלות).</li>
        <li><strong>הרשאת מינימום (Least Privilege):</strong> כל תהליך או משתמש מקבל אך ורק את סט ההרשאות החיוני לביצוע משימתו (שירות כתיבת לוגים אינו מקבל הרשאה למסד נתוני לקוחות; שרת ווב לא רץ כ-root).</li>
        <li><strong>ברירת מחדל בטוחה (Fail-Safe Defaults):</strong> ברירת המחדל היא מניעת גישה (Deny by default). גישה מאושרת רק לפי רשימה לבנה מפורשת (Whitelist). במקרה של שגיאה או תקלה &ndash; המערכת ננעלת ולא פותחת הרשאות.</li>
        <li><strong>תיווך מלא (Complete Mediation):</strong> כל פנייה למשאב מאומתת ונבדקת מחדש בכל פעם, ללא הסתמכות עיוורת על אישורים קודמים במטמון (Cache).</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>"אפחות אינה תחליף לתיקון שורש, והגנה לעומק אינה הצדקה להשארת באג בקוד." הגנה לעומק מניחה שחולשות יתקיימו ומונעת מהן להפוך לקטסטרופה מלאה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שאלת שירות לוגים):</strong>
        <p>שאלה במבחן: <em>"שירות שכל תפקידו לרשום שגיאות לקובץ לוג רץ עם הרשאות מנהל מלאות (Root). איזה עיקרון הופר?"</em>
        <br><strong>תשובה: הרשאת מינימום (Least Privilege)!</strong> שירות לוגים זקוק להרשאת הוספה (Append) לקובץ בודד בלבד.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>סיכום עקרונות במילה אחת:</strong>
        <ul>
          <li><strong>Defense in Depth:</strong> שכבות מרובות.</li>
          <li><strong>Least Privilege:</strong> מינימום הרשאות.</li>
          <li><strong>Fail-Safe Defaults:</strong> ברירת מחדל חסומה (Whitelist).</li>
          <li><strong>Complete Mediation:</strong> בדיקה בכל פנייה מחדש.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "מידול איומים בשיטת STRIDE, עץ איומים ונוסחת הסיכון (DREAD)",
    content: `
      <p>כלים מתודולוגיים לזיהוי, סיווג ותעדוף סיכוני אבטחה בשלב התכנון:</p>
      <ul>
        <li><strong>מודל STRIDE (מיפוי איומים ומענים הנדסיים):</strong>
          <br>&bull; <strong>S - Spoofing (התחזות):</strong> התחזות לישות אחרת &larr; <em>מענה: Authentication (אימות זהות, MFA, תעודות).</em>
          <br>&bull; <strong>T - Tampering (שיבוש):</strong> שינוי בלתי מורשה של קוד או נתונים &larr; <em>מענה: Integrity (חתימות דיגיטליות, SHA-256).</em>
          <br>&bull; <strong>R - Repudiation (התכחשות):</strong> חוסר יכולת להוכיח ביצוע פעולה &larr; <em>מענה: Non-Repudiation (חתימה, יומני ביקורת מאובטחים).</em>
          <br>&bull; <strong>I - Information Disclosure (חשיפת מידע):</strong> דליפת מידע לגורם לא מורשה &larr; <em>מענה: Confidentiality (הצפנה, מידור).</em>
          <br>&bull; <strong>D - Denial of Service (מניעת שירות):</strong> השבתת זמינות &larr; <em>מענה: Availability (יתירות, Rate Limiting).</em>
          <br>&bull; <strong>E - Elevation of Privilege (הרמת הרשאות):</strong> משתמש רגיל משיג הרשאות ניהול &larr; <em>מענה: Authorization, הרשאת מינימום.</em>
        </li>
        <li><strong>עץ איומים (Threat Tree):</strong> שורש = מטרת התוקף; ענפים = שיטות פעולה; עלים = פעולות תקיפה קונקרטיות. עלה בעיגול = מוגן/מנוטרל ע"י אפחות; עלה במלבן = נתיב תקיפה פתוח.</li>
        <li><strong>נוסחת הסיכון הבסיסית:</strong><br>
          <code>Risk = Probability × Impact</code> (מכפלה! אם אחד מהם 0 &ndash; הסיכון הכולל הוא 0).</li>
        <li><strong>מודל DREAD (ציון מ-1 עד 10):</strong> Damage (נזק), Reproducibility (שחזוריות), Exploitability (קלות ניצול), Affected Users (כמות מושפעים), Discoverability (קלות גילוי).</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>מיפוי ישיר: STRIDE מול CIA:
        <br>T &harr; Integrity &bull; I &harr; Confidentiality &bull; D &harr; Availability.
        <br>שלושת הנוספים מרחיבים את המודל: S (אימות), R (אי-התכחשות), E (הרשאות).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>זכרו את נוסחת הסיכון כמכפלה: אירוע בעל פוטנציאל נזק קטסטרופלי (נזק = 10) שההסתברות לו היא 0.0001 (כגון שרת שנפגע מברק ישיר) יקבל ציון סיכון נמוך בהרבה מחולשת XSS קלה לניצול המתרחשת יומיום.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>ראשי תיבות DREAD:</strong>
        <ul>
          <li><strong>D</strong>amage &ndash; פוטנציאל הנזק</li>
          <li><strong>R</strong>eproducibility &ndash; קלות השחזור</li>
          <li><strong>E</strong>xploitability &ndash; קלות הניצול הטכני</li>
          <li><strong>A</strong>ffected Users &ndash; היקף המשתמשים הנפגעים</li>
          <li><strong>D</strong>iscoverability &ndash; קלות גילוי הפרצה</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "בקרת איכות (QA) מול ביקורת אבטחה (Auditing) ותבנית ממצא ביקורת (5 שדות חובה)",
    content: `
      <p>ההבדל היסודי בין בדיקות תוכנה שגרתיות לביקורת אבטחה:</p>
      <ul>
        <li><strong>QA (בקרת איכות):</strong> שואל <em>"האם המערכת מבצעת את מה שנדרש לפי האפיון?"</em>. בודק תסריטים חוקיים ונורמטיביים (קופסה שחורה לרוב).</li>
        <li><strong>Security Auditing (ביקורת אבטחה):</strong> שואל <em>"האם המערכת מבצעת פעולות שאסור לה לבצע תחת קלט זדוני?"</em>. כולל White-box (סקירת קוד מלאה), Black-box ומבחני חדירה (Pentest).</li>
      </ul>
      <h3>חמשת שדות החובה לכתיבת ממצא ביקורת אבטחה (Audit Finding)</h3>
      <p>כל ממצא ביקורת קוד במבחן ובפרויקט חייב לכלול במדויק 5 רכיבים אלו:</p>
      <ol>
        <li><strong>מיקום (Location):</strong> קובץ, פונקציה ומספר שורה מדויק.</li>
        <li><strong>סיווג החולשה (Classification):</strong> עיצוב, מימוש, או תפעול.</li>
        <li><strong>יעד ה-CIA שנפגע (Target CIA):</strong> סודיות, שלמות, או זמינות.</li>
        <li><strong>פוטנציאל הנזק וההשפעה (Impact):</strong> מה התוקף מרוויח ומסוגל לבצע.</li>
        <li><strong>אפחות ותיקון (Mitigation / Remediation):</strong> כיצד לתקן את הקוד מהשורש ולהוסיף הגנה.</li>
      </ol>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>מבחני חדירה (Penetration Testing) מבוצעים לרוב בקופסה שחורה ומטרתם הדגמת שרשור חולשות לנזק עסקי מעשי; ביקורת קוד (White-box) מאתרת חולשות עמוקות שלא יתגלו לעולם בקופסה שחורה (כגון מרוצי זמנים TOCTOU, דליפות זיכרון, וקוד ללא שימוש).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (תבנית תשובה מוכנה לשאלת ממצא ביקורת):</strong>
        <p>כאשר נדרש לנתח קוד פגום, כתבו ישירות לפי התבנית:
        <br><strong>1. מיקום:</strong> קובץ <code>server.cpp</code>, פונקציה <code>login()</code>, שורה 42.
        <br><strong>2. סיווג:</strong> חולשת מימוש (קריאה ל-gets ללא בדיקת אורך).
        <br><strong>3. יעד CIA:</strong> שלמות וסודיות (חטיפת זרימת בקרה וקריאת זיכרון).
        <br><strong>4. השפעה:</strong> גלישת מחסנית המאפשרת דריסת כתובת חזרה והרצת פקודות ב-ROP.
        <br><strong>5. אפחות:</strong> החלפה ל-<code>fgets(buf, sizeof(buf), stdin)</code> וקימפול עם Stack Canary ו-DEP.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט-שיט QA מול Auditing:</strong>
        <ul>
          <li><strong>QA:</strong> בודק משתמש רגיל &bull; קלט תקין &bull; דרישות פונקציונליות.</li>
          <li><strong>Auditing:</strong> מניח יריב זדוני &bull; קלט חריג/גבולי &bull; מדיניות אבטחה.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "איום ברמת רכיב מול איום מערכתי, ארגז חול (Sandbox) ותבנית Reactor",
    content: `
      <p>הבחנה בין רמות הפשטה ארכיטקטוניות בהתמודדות עם איומים:</p>
      <ul>
        <li><strong>איום ברמת רכיב (Component-Level):</strong> פגם שמקורו בקוד מקומי ברכיב תוכנה בודד (למשל פונקציה המשתמשת ב-<code>strcpy</code>). התיקון הוא ברמת הקוד המקומי.</li>
        <li><strong>איום מערכתי (Systemic):</strong> איום הנובע מהחיבור והאינטראקציה בין רכיבים תקינים לכאורה (תקשורת לא מוצפנת, מרוצי זמנים, שרשרת אמון שבורה, רוגלת מקלדת בסביבה, או הצפת חיבורים במקביל).</li>
        <li><strong>ארגז חול (Sandbox):</strong> סביבת הרצה מבודדת ברמת מערכת ההפעלה המגבילה קריאות מערכת (Syscalls) וגישה לקבצים ורשת. גם אם הקוד בתוכו נפרץ, הנזק נשאר כלוא בסביבה המבודדת. <em>אינו מתקן את הבאג, אלא מגביל את רדיוס הנזק (Blast Radius).</em></li>
        <li><strong>תבנית Reactor (הגנה מפני DoS):</strong> במקום מודל Thread-per-Client (הקורס תחת מתקפת הצפת חיבורים עקב מיצוי זיכרון והחלפות הקשר), הריאקטור משתמש בלולאת אירועים אחת (I/O Multiplexing כגון <code>select / poll / epoll</code>) המאזינה לערוצים מרובים ומטפלת רק בערוץ שבו זמינים נתונים.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>יישום תבנית Reactor ללא הגנות משלים אינו מספיק לאבטחה: חובה לקבוע תקרת חיבורים מרבית (Max Connections) ולהגדיר פס זמן (Timeout) לסגירת חיבורים רדומים כדי למנוע Slowloris DoS.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שחזור 2021א ו-2022ג שאלה 9):</strong>
        <p>שאלה פתוחה: <em>"מה מטרתו של Sandbox, ומה נשבר כאשר מריצים בתוכו <code>exec</code> על קוד שהתקבל מלקוח ללא בדיקה?"</em>
        <br><strong>תשובה:</strong> מטרת ארגז החול היא בידוד נזק; הרצת <code>exec</code> ישירה שוברת את גבול האמון ומאפשרת לקוד הלקוח לנצל הרשאות של תהליך הארגז חול או לבצע בריחה מארגז החול (Sandbox Escape) אם הוגדרו קריאות מערכת רחבות מדי.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט-שיט שרתי רשת:</strong>
        <ul>
          <li><strong>Thread-per-client:</strong> פגיע ל-DoS &bull; צריכת זיכרון מחסנית לכל חוט &bull; תקורה גבוהה.</li>
          <li><strong>Reactor:</strong> עמיד יותר &bull; חוט יחיד עם I/O Multiplexing &bull; דורש timeouts ותקרת ערוצים.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "1",
    title: "מושגי עולם אמיתי ודוח מערך הסייבר: CWE מול CVE מול CVSS, ו-0-Day מול 1-Day",
    content: `
      <p>סטנדרטים ומונחים עולמיים המשמשים לתיאור ותעדוף חולשות אבטחה:</p>
      <ul>
        <li><strong>CWE (Common Weakness Enumeration):</strong> מילון קטגוריות ופגמי תוכנה כלליים (הדפוס הכללי, "המחלה"). מנוהל ע"י MITRE. דוגמאות: CWE-121 (Stack-based Buffer Overflow), CWE-89 (SQL Injection).</li>
        <li><strong>CVE (Common Vulnerabilities and Exposures):</strong> מזהה פומבי וייחודי לחולשה ספציפית במוצר מוגדר ("החולה הקונקרטי"). לדוגמה: CVE-2021-44228 עבור פרצת Log4Shell.</li>
        <li><strong>CVSS (Common Vulnerability Scoring System):</strong> ציון מספרי מ-0.0 עד 10.0 המכמת את חומרת החולשה. Base Score נקבע לפי וקטור התקיפה, מורכבות, הרשאות נדרשות והשפעה על יעדי ה-CIA.</li>
        <li><strong>חולשת 0-Day (יום אפס):</strong> חולשה שנודעה לתוקפים בטרם נודעה ליצרן או שטרם פורסם לה תיקון (Zero days to prepare). האפחות מתמקד בהגנה לעומק וניטור.</li>
        <li><strong>חולשת 1-Day:</strong> חולשה שכבר נחשפה ופורסם עבורה טלאי אבטחה, אך ארגונים רבים טרם התקינו אותו. <em>דוח מערך הסייבר הלאומי 2024</em> מציין כי ניצול חולשות 1-Day במערכות לא מעודכנות הוא ציר התקיפה הנפוץ וההרסני ביותר.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>ההבדל בין CWE ל-CVE:</strong> CWE הוא סוג הפגם הכללי (למשל "גלישת חוצץ במחסנית"); CVE הוא מופע ספציפי של פגם זה בתוכנה קונקרטית בגרסה מסוימת.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>אם בשאלה מופיע תרחיש של שרת שנפרץ שבועיים לאחר שפורסם עדכון אבטחה שהמנהל שכח להתקין &ndash; זוהי <strong>חולשת 1-Day</strong> וסיווגה הוא <strong>חולשה תפעולית (Operational)</strong>!</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט-שיט מושגי עולם אמיתי:</strong>
        <ul>
          <li><strong>CWE:</strong> סוג הפגם הכללי (Abstract Flaw Type).</li>
          <li><strong>CVE:</strong> מזהה פרצה קונקרטית בתוכנה מסוימת (Specific Vulnerability ID).</li>
          <li><strong>CVSS:</strong> ציון חומרה כמותי מ-0.0 עד 10.0.</li>
          <li><strong>0-Day:</strong> חולשה ללא טלאי קיים &bull; <strong>1-Day:</strong> חולשה פומבית עם טלאי שטרם הותקן.</li>
        </ul>
      </div>
    `
  },

  // --- יחידה 2: שפת C++ כבסיס לתכנות דפנסיבי ---
  {
    unit: "2",
    title: "מודל הזיכרון של C++ בזמן ריצה וזמני חיים (Text, Data, Stack, Heap)",
    content: `
      <p>מיפוי ארבעת אזורי הזיכרון בתהליך ריצה ב-C++:</p>
      <ul>
        <li><strong>Text / Code:</strong> מכיל הוראות מכונה מקומפלות. מסומן בחומרה כ-Read-Only ו-Executable (קשור ישירות ל-DEP/NX). כתיבה אליו גורמת לקריסה.</li>
        <li><strong>Data / BSS:</strong> משתנים גלובליים וסטטיים (<code>static</code>). Data מכיל מאותחלים; BSS מכיל לא-מאותחלים. חיים מתחילת התוכנית ועד סיומה.</li>
        <li><strong>Stack (המחסנית):</strong> זיכרון אוטומטי מהיר הפועל בשיטת LIFO. מאחסן מסגרות פונקציות: פרמטרים, כתובת חזרה, EBP שמור ומשתנים מקומיים. משתנים נהרסים אוטומטית ביציאה מהבלוק (RAII). גודלה מוגבל (מספר מגה-בייטים).</li>
        <li><strong>Heap (הערימה):</strong> זיכרון דינמי המנוהל ידנית ע"י <code>new</code> ו-<code>delete</code> (או <code>malloc/free</code>). גודלו מוגבל רק ע"י ה-RAM והזיכרון הווירטואלי. אינו משתחרר אוטומטית ביציאה מבלוק!</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>משתנה מקומי הנוצר כ-<code>T obj;</code> יושב במחסנית ונהרס ביציאה מהבלוק. הקצאה ב-<code>new T()</code> יוצרת את האובייקט בערימה, בעוד המצביע שמחזיק את כתובתו יושב במחסנית.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שאלת שחזור 2021א מועד 74 שאלה 2):</strong>
        <p>נתון הקוד:
        <pre class="code" dir="ltr"><code>Frog f1(5);
Frog *p1 = &f1;
f1.hop();</code></pre>
        <strong>שאלה:</strong> היכן יאוחסנו <code>f1</code> ו-<code>p1</code>?
        <br><strong>תשובה: שניהם במחסנית (Stack)!</strong> מכיוון שלא נעשה שימוש ב-<code>new</code>, <code>f1</code> הוא משתנה מקומי במחסנית, ו-<code>p1</code> הוא מצביע מקומי במחסנית המחזיק את כתובת <code>f1</code>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט-שיט השוואת אזורי זיכרון:</strong>
        <table border="1" style="border-collapse:collapse; width:100%; font-size:0.9em;">
          <tr><th>אזור</th><th>מי מקצה?</th><th>מתי משתחרר?</th><th>סכנת אבטחה מרכזית</th></tr>
          <tr><td><strong>Stack</strong></td><td>מהדר / חומרה</td><td>ביציאה מהבלוק (אוטומטי)</td><td>גלישת חוצץ ודריסת כתובת חזרה</td></tr>
          <tr><td><strong>Heap</strong></td><td>המתכנת (new)</td><td>רק בקריאה ל-delete</td><td>זליגת זיכרון, UAF, Double Free</td></tr>
          <tr><td><strong>Data/BSS</strong></td><td>מערכת ההפעלה</td><td>בסיום התהליך</td><td>משתנים גלובליים משותפים (Race conditions)</td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "2",
    title: "מצביעים (Pointers) מול הפניות (References) ומלכודות זיכרון מת",
    content: `
      <p>הבדלים מהותיים בין שני סוגי הגישה לכתובות זיכרון ב-C++:</p>
      <ul>
        <li><strong>מצביע (<code>T*</code>):</strong> משתנה עצמאי המאחסן כתובת זיכרון. יכול לקבל <code>nullptr</code>, ניתן לניתוב מחדש (Reassignment) לכתובת אחרת בכל עת, וגישה לערך מתבצעת בעזרת אופרטור הסרת הפניה (<code>*p</code>).</li>
        <li><strong>הפניה (<code>T&</code>):</strong> שם נרדף (Alias) קבוע לאובייקט קיים. <strong>חובה לאתחל בעת ההגדרה!</strong> אינה יכולה לקבל null, ולא ניתן לנתב אותה מחדש לאובייקט אחר. תחבירית עובדים איתה כאובייקט רגיל.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>מלכודת קטלנית &ndash; החזרת הפניה או מצביע למשתנה מקומי:</strong>
        <pre class="code" dir="ltr"><code>int& badFunc() {
    int x = 42;
    return x; // אסור בהחלט! משתנה מקומי במחסנית
}</code></pre>
        ביציאה מהפונקציה מסגרת המחסנית משתחררת. הפניה או המצביע שחזרו מצביעים לזיכרון מת (Dangling). כל שימוש בהם הוא Undefined Behavior ופרצת אבטחה חמורה!</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>העברת אובייקטים לפונקציה: העברה לפי ערך (by-value) מבצעת העתקה של כל האובייקט (איטית וגורמת לחיתוך). העברה בהפניה קבועה (<code>const T&</code>) מונעת העתקה, מהירה ביותר, ומגנה על האובייקט מפני שינוי בלתי מורשה.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>השוואה מהירה: Pointer מול Reference:</strong>
        <ul>
          <li>יכול להיות <code>nullptr</code>? מצביע: כן &bull; הפניה: לא.</li>
          <li>חובה לאתחל ביצירה? מצביע: לא &bull; הפניה: כן.</li>
          <li>ניתן לניתוב מחדש? מצביע: כן &bull; הפניה: לא (השמה משנה את האובייקט המוצבע).</li>
          <li>תחביר גישה לשדה: מצביע: <code>p-&gt;x</code> &bull; הפניה: <code>r.x</code>.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "בנאי העתקה (Copy Constructor) מול אופרטור השמה (Copy Assignment) ובדיקת השמה עצמית",
    content: `
      <p>שתי פעולות שונות לחלוטין שמתכנתים רבים נוטים לבלבל ביניהן:</p>
      <ul>
        <li><strong>בנאי העתקה (<code>T(const T& other)</code>):</strong> נקרא כאשר <strong>נוצר אובייקט חדש</strong> בזיכרון על בסיס אובייקט קיים:
          <br><code>MyClass b = a;</code> או <code>MyClass b(a);</code> או העברת אובייקט לפונקציה לפי ערך.</li>
        <li><strong>אופרטור השמה (<code>T& operator=(const T& other)</code>):</strong> נקרא כאשר מתבצעת השמה לתוך <strong>אובייקט שכבר נבנה וקיים</strong>:
          <br><code>MyClass b; b = a;</code>.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>בדיקת השמה עצמית (Self-Assignment Check):</strong> באופרטור השמה חובה לבדוק תמיד:
        <pre class="code" dir="ltr"><code>if (this == &other) return *this;</code></pre>
        ללא בדיקה זו, כאשר יבוצע <code>a = a;</code>, השלב הבא שבו משחררים את המשאב הישן של האובייקט ישמיד את הנתונים של עצמנו בטרם יועתקו, ויגרום לקריסה או ל-Use-After-Free!</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (מבנה חובה לאופרטור השמה):</strong>
        <p>ארבעת השלבים שחובה לכתוב בכל מימוש של <code>operator=</code>:
        <ol>
          <li><code>if (this == &other) return *this;</code> (השמה עצמית).</li>
          <li><code>delete[] data;</code> (שחרור זיכרון קיים).</li>
          <li>הקצאת זיכרון חדש והעתקת הנתונים מ-other (העתקה עמוקה).</li>
          <li><code>return *this;</code> (החזרת הפניה לעצמנו לתמיכה בשרשור <code>a = b = c;</code>).</li>
        </ol></p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>איך לדעת במבחן מי מופעל?</strong>
        <ul>
          <li>יש טיפוס בצד שמאל? &rarr; <code>MyClass b = a;</code> &rarr; <strong>בנאי העתקה!</strong> (אובייקט חדש נולד).</li>
          <li>אין טיפוס בצד שמאל? &rarr; <code>b = a;</code> &rarr; <strong>אופרטור השמה!</strong> (האובייקט b כבר היה קיים).</li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "העתקה רדודה (Shallow) מול עמוקה (Deep), כלל השלוש וכלל החמישה",
    content: `
      <p>ניהול משאבים בעת העתקת אובייקטים בעלי מצביעים לערימה:</p>
      <ul>
        <li><strong>העתקה רדודה (Shallow Copy):</strong> העתקת ברירת המחדל של המהדר (העתקת ביטים). עבור מצביע, מועתקת הכתובת בלבד. כתוצאה מכך, שני אובייקטים שונים מצביעים לאותו בלוק זיכרון בערימה!
          <br><em>האסון:</em> כאשר האובייקט הראשון נהרס, המפרק שלו משחרר את הבלוק; האובייקט השני נותר עם מצביע יתום (Dangling Pointer), וכאשר הוא ייהרס יתרחש שחרור כפול (Double Free) וקריסה.</li>
        <li><strong>העתקה עמוקה (Deep Copy):</strong> הקצאת בלוק זיכרון חדש ועצמאי בערימה ושכפול מלא של המידע. לכל אובייקט יש עותק פרטי משלו.</li>
        <li><strong>כלל השלוש (Rule of Three):</strong> אם מחלקה מנהלת משאב ערימה וזקוקה למימוש מפורש של אחד מבין השלושה &ndash; <strong>מפרק (Destructor), בנאי העתקה (Copy Constructor), אופרטור השמה (Copy Assignment)</strong> &ndash; היא מחויבת לממש את <strong>כל השלושה!</strong></li>
        <li><strong>כלל החמישה (Rule of Five ב-C++11):</strong> מוסיף Move Constructor ו-Move Assignment Operator לביצועים יעילים עם rvalue references.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>אם לא מימשתם בנאי העתקה ואופרטור השמה במחלקה שמחזיקה מצביע ב-<code>new</code>, המהדר ייצר העתקה רדודה אוטומטית שתוביל בוודאות ל-Double Free בעת העברה לפונקציה או השמה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>אם בשאלת קוד מופיע אובייקט שמקצה זיכרון בבנאי ומשחרר במפרק, אך אין לו Copy Ctor, וב-main מועבר האובייקט כפרמטר לפונקציה לפי ערך (by-value) &ndash; סמנו מיד: <strong>התרסקות בריצה עקב Double Free!</strong></p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תבנית כלל השלוש:</strong>
        <pre class="code" dir="ltr"><code>class Buffer {
    char* data;
    size_t size;
public:
    ~Buffer() { delete[] data; } // 1. מפרק
    Buffer(const Buffer& o) { ... } // 2. בנאי העתקה
    Buffer& operator=(const Buffer& o) { ... } // 3. אופרטור השמה
};</code></pre>
      </div>
    `
  },
  {
    unit: "2",
    title: "הקצאה ושחרור מערכים: new[] מול delete[] (מוקש בחינה קריטי)",
    content: `
      <p>כללי הברזל של הקצאה ושחרור זיכרון ב-C++:</p>
      <ul>
        <li>הקצאת איבר יחיד: <code>T* p = new T();</code> &harr; שחרור ב-<code>delete p;</code></li>
        <li>הקצאת מערך איברים: <code>T* arr = new T[100];</code> &harr; <strong>שחרור אך ורק ב-<code>delete[] arr;</code></strong></li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>שחרור מערך ב-<code>delete</code> רגיל ללא סוגריים הוא התנהגות לא מוגדרת (Undefined Behavior)!</strong>
        מנהל הערימה שומר בתחילת בלוק המערך את מספר האיברים. קריאה ל-delete רגיל מפעילה את המפרק רק עבור האיבר הראשון, מתעלמת משאר האיברים, ומשחיתה את מבני הבקרה של מנהל ה-Heap.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שאלת שחזור מתוך בנק הבחינות):</strong>
        <p>נתון הקוד: <code>char* buf = new char[100]; delete buf;</code>.
        <br><strong>שאלה:</strong> מהי הקביעה המדויקת?
        <br><strong>תשובה נכונה:</strong> זוהי התנהגות לא מוגדרת (UB) והשחתת ערימה!
        <br><strong>מסיח מטעה נפוץ:</strong> "זה תקין עבור טיפוסים פרימיטיביים כמו char כי אין להם מפרק" &ndash; <strong>שגוי לחלוטין!</strong> התקן אוסר ערבוב בין new[] ל-delete ללא יוצא מן הכלל.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>התאמת הקצאות ושחרורים:</strong>
        <ul>
          <li><code>malloc / calloc</code> &harr; <code>free</code> (שפת C)</li>
          <li><code>new</code> &harr; <code>delete</code> (איבר בודד)</li>
          <li><code>new[]</code> &harr; <code>delete[]</code> (מערך)</li>
          <li><em>ערבוב ביניהם הוא תמיד Undefined Behavior!</em></li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "מפרק וירטואלי (Virtual Destructor) במחלקת בסיס — מוקש הבחינה המרכזי ב-C++",
    content: `
      <p>הכשל הנפוץ ביותר בירושה פולימורפית ב-C++:</p>
      <ul>
        <li>כאשר מחזיקים אובייקט ממחלקה נגזרת (Derived) דרך מצביע למחלקת בסיס (<code>Base* p = new Derived();</code>):</li>
        <li>כאשר מבצעים <code>delete p;</code> &ndash; אם המפרק של מחלקת הבסיס <strong>אינו מוגדר כ-<code>virtual</code></strong>, המהדר מבצע קישור סטטי מוקדם ומפעיל <strong>אך ורק את המפרק של מחלקת הבסיס (Base Dtor)!</strong></li>
        <li><strong>המפרק של מחלקת הבן (Derived Dtor) אינו נקרא לעולם!</strong> כל הזיכרון, החוצצים והמשאבים שהבן הקצה בתוכו ידלפו במלואם (Memory Leak חמור והתנהגות לא מוגדרת).</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>כלל הברזל לפולימורפיזם:</strong> כל מחלקה המכילה לפחות פונקציה וירטואלית אחת, או המיועדת לשמש כמחלקת בסיס לירושה &ndash; <strong>חובה להגדיר בה מפרק וירטואלי:</strong>
        <pre class="code" dir="ltr"><code>virtual ~Base() {}</code></pre></p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שאלת שחזור 2021א מועד 74 שאלה 4):</strong>
        <p>נתון הקוד:
        <pre class="code" dir="ltr"><code>class Foo {
    char* buffer1;
public:
    Foo(size_t s) { buffer1 = new char[s]; }
    ~Foo() { delete[] buffer1; } // שגיאה: לא וירטואלי!
};
class Bar : public Foo {
    char* buffer2;
public:
    Bar(size_t s) : Foo(s) { buffer2 = new char[s]; }
    ~Bar() { delete[] buffer2; }
};
int main() {
    Foo* f = new Bar(100);
    delete f;
}</code></pre>
        <strong>שאלה:</strong> האם יש זליגת זיכרון?
        <br><strong>תשובה נכונה: כן, של <code>buffer2</code>!</strong>
        <br><strong>הסבר:</strong> <code>buffer1</code> משתחרר כי <code>~Foo()</code> רץ; אך <code>~Bar()</code> לא רץ לעולם כי <code>~Foo()</code> אינו וירטואלי, ולכן <code>buffer2</code> זולג.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>מה קורה ב-delete דרך מצביע אב?</strong>
        <ul>
          <li>בלי <code>virtual ~Base()</code> &rarr; מופעל רק <code>~Base()</code> &rarr; <strong>זליגת משאבי הבן!</strong></li>
          <li>עם <code>virtual ~Base()</code> &rarr; מופעל <code>~Derived()</code> ואחריו <code>~Base()</code> &rarr; <strong>שחרור מלא ותקין!</strong></li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "הסתרה (Hiding) מול דריסה (Overriding) ופולימורפיזם דינמי ב-C++",
    content: `
      <p>ההבדל בין קישור מוקדם בקומפילציה לקישור מאוחר בריצה:</p>
      <ul>
        <li><strong>הסתרה (Function Hiding):</strong> פונקציה בבן בעלת אותו שם של פונקציה באב, כאשר באב היא <strong>ללא <code>virtual</code></strong> (או בעלת חתימת פרמטרים שונה). המהדר מקשר לפי הטיפוס הסטטי של המצביע בקומפילציה. קריאה דרך <code>Base*</code> תפעיל תמיד את פונקציית האב.</li>
        <li><strong>דריסה (Overriding):</strong> פונקציה באב המוגדרת עם <code>virtual</code> ובן המממש אותה עם חתימה זהה בדיוק (כולל <code>const</code>). הקריאה מנותבת בזמן ריצה לפי האובייקט האמיתי (Dynamic Binding דרך vtable).</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>מילת המפתח <code>override</code> (C++11) בנגזרת מבקשת מהמהדר לוודא שמתבצעת דריסה אמיתית. אם חל שינוי בחתימה או שבאב חסר virtual, תיזרק שגיאת קומפילציה במקום הסתרה שקטה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שחזור 2021ג שאלה 1):</strong>
        <p>תרגיל מעקב פלטים: Base מגדיר <code>virtual void f() { g(); }</code>, <code>void g() { h(); }</code> (ללא virtual!), ו-<code>virtual void h()</code>.
        <br>כאשר קוראים ל-<code>b-&gt;f()</code> כשהאובייקט הוא <code>Der</code>:
        <br>1. <code>f()</code> וירטואלית ולכן מגיעה ל-<code>Base::f</code>.
        <br>2. מתוכה נקראת <code>g()</code>. מכיוון ש-<code>g</code> <strong>אינה וירטואלית</strong>, מופעלת <code>Base::g</code> (קישור סטטי!).
        <br>3. מתוכה נקראת <code>h()</code>. מכיוון ש-<code>h</code> <strong>וירטואלית</strong>, מופעלת <code>Der::h</code>!
        <br><strong>כלל הזהב לפענוח במבחן:</strong> פונקציה לא-וירטואלית נקבעת לפי טיפוס המצביע; פונקציה וירטואלית נקבעת לפי האובייקט האמיתי.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>חוקי הניתוב במבחן:</strong>
        <ul>
          <li>קריאה ללא virtual &rarr; <code>Base*</code> קורא תמיד ל-<code>Base::func</code> (הסתרה).</li>
          <li>קריאה עם virtual &rarr; <code>Base*</code> קורא ל-<code>Derived::func</code> (דריסה פולימורפית).</li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "סדר בנייה והריסה בירושה ומלכודת קריאה ל-virtual בבנאי ובמפרק",
    content: `
      <p>סדר הפעלת פונקציות האתחול והניקוי בהיררכיית ירושה:</p>
      <ul>
        <li><strong>סדר בנייה:</strong> קודם כל נבנה הבסיס (Base Ctor) ורק לאחר מכן הנגזרת (Derived Ctor). האב חייב להתקיים לפני שהבן משתמש בשדותיו.</li>
        <li><strong>סדר הריסה:</strong> הפוך בדיוק! קודם כל נהרסת הנגזרת (Derived Dtor) ורק בסוף הבסיס (Base Dtor). הבן משחרר את שלו לפני שחלק האב מושמד.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>מלכודת קריאה ל-virtual בתוך בנאי או מפרק:</strong>
        בזמן ריצת בנאי מחלקת הבסיס, חלקי מחלקת הבן טרם נבנו, ומצביע ה-vptr מכוון לטבלת ה-vtable של מחלקת הבסיס.
        <strong>לכן, קריאה לפונקציה וירטואלית מתוך בנאי האב תפעיל תמיד את המימוש של האב &ndash; ולא של הבן!</strong>
        באופן דומה, במפרק האב חלקי הבן כבר הושמדו, ולכן שוב תופעל גרסת האב.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>אם רואים בשאלת הדפסה קריאה לפונקציה וירטואלית בתוך Constructor או בתוך Destructor &ndash; אל תתפתו לנתב למחלקת הבן! באותו רגע פועל המימוש של המחלקה שהבנאי/מפרק שלה רץ כעת.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>סדר כרונולוגי:</strong>
        <ol>
          <li><code>Base::Base()</code> (vptr מכוון ל-Base)</li>
          <li><code>Derived::Derived()</code> (vptr מתעדכן ל-Derived)</li>
          <li>... שימוש באובייקט ...</li>
          <li><code>Derived::~Derived()</code> (vptr חוזר ל-Base)</li>
          <li><code>Base::~Base()</code></li>
        </ol>
      </div>
    `
  },
  {
    unit: "2",
    title: "בעיית היהלום (Diamond Problem) בירושה מרובה ופתרונה בעזרת ירושה וירטואלית",
    content: `
      <p>בעיה הנוצרת כאשר שתי מחלקות יורשות ממחלקת בסיס אחת, ומחלקה רביעית יורשת משתיהן:</p>
      <ul>
        <li><code>A</code> היא מחלקת בסיס. <code>B</code> ו-<code>C</code> יורשות מ-<code>A</code>. המחלקה <code>D</code> יורשת מ-<code>B</code> ומ-<code>C</code> (ירושה מרובה: <code>class D : public B, public C</code>).</li>
        <li><strong>הכשל:</strong> בתוך אובייקט מסוג D ישנם <strong>שני עותקים נפרדים של מחלקת הבסיס A</strong>! כל פנייה לשדה או מתודה של A מתוך D נכשלת בהידור עקב עמימות (Ambiguity).</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>הפתרון &ndash; ירושה וירטואלית (Virtual Inheritance):</strong>
        <pre class="code" dir="ltr"><code>struct B : virtual public A {};
struct C : virtual public A {};
class D : public B, public C {};</code></pre>
        מילת המפתח <code>virtual</code> בהוראת הירושה מורה למהדר לחלוק מופע פיזי יחיד של מחלקת הבסיס A עבור כל המחלקות הנגזרות.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שחזור 2021א מועד 74 שאלה 3):</strong>
        <p>נתון הקוד:
        <pre class="code" dir="ltr"><code>struct Thread { void run() {} };
struct Sender : public Thread {};
struct Receiver : public Thread {};
class Messenger : public Sender, public Receiver {};
int main() { Messenger m; m.run(); }</code></pre>
        <strong>שאלה:</strong> מדוע הקוד לא יתקמפל?
        <br><strong>תשובה: בגלל בעיית היהלום!</strong> יש שני עותקים של Thread, והקריאה <code>m.run()</code> היא עמומה.
        <br><em>שימו לב למסיח:</em> "בגלל בעיית המשולש" &ndash; מסיח פיקטיבי!</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תרשים יהלום:</strong>
        <pre dir="ltr"><code>      Thread
     /      \\
  Sender   Receiver
     \\      /
    Messenger</code></pre>
        <em>ללא virtual: 2 עותקי Thread. עם virtual: עותק יחיד ומשותף.</em>
      </div>
    `
  },
  {
    unit: "2",
    title: "חיתוך אובייקט (Object Slicing) ומנגנון הטבלה הווירטואלית (Vtable & Vptr)",
    content: `
      <p>האופן שבו מהדרים מממשים פולימורפיזם דינמי והסכנה בחיתוך מידע:</p>
      <ul>
        <li><strong>vtable:</strong> מערך סטטי של מצביעי פונקציות הנוצר ע"י המהדר ברמת המחלקה.</li>
        <li><strong>vptr:</strong> מצביע מוסתר בראש כל אובייקט פולימורפי (היסט 0) המצביע ל-vtable של המחלקה.</li>
        <li><strong>חיתוך אובייקט (Object Slicing):</strong> מתרחש כאשר משייכים או מעבירים אובייקט נגזר למשתנה מסוג מחלקת הבסיס <strong>לפי ערך (by-value)</strong>: <code>Base b = derivedObj;</code>.</li>
        <li>המהדר מעתיק אך ורק את השדות של Base; כל שדות הנגזרת נחתכים ונעלמים, וה-vptr של האובייקט החדש מכוון ל-Base. הפולימורפיזם מתבטל לחלוטין!</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>כדי למנוע חיתוך אובייקט ולשמר התנהגות פולימורפית, <strong>חובה להעביר אובייקטים בהפניה (<code>Base&</code> / <code>const Base&</code>) או במצביע (<code>Base*</code>)!</strong></p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>אם רואים פונקציה המקבלת <code>void print(Base b)</code> לפי ערך &ndash; זהו חיתוך אובייקט ודאי! כל קריאה לפונקציה וירטואלית בתוכה תפעיל רק את המימוש של Base.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>צ'יט-שיט מניעת Slicing:</strong>
        <ul>
          <li><code>void foo(Base b)</code> &rarr; חיתוך אובייקט! (רע)</li>
          <li><code>void foo(const Base& b)</code> &rarr; פולימורפיזם נשמר, אפס העתקות! (מצוין)</li>
          <li><code>void foo(Base* b)</code> &rarr; פולימורפיזם נשמר! (מצוין)</li>
        </ul>
      </div>
    `
  },
  {
    unit: "2",
    title: "ניהול משאבים דטרמיניסטי (RAII) ומצביעים חכמים (unique_ptr, shared_ptr, weak_ptr)",
    content: `
      <p>העקרונות המודרניים של C++ המייתרים שימוש ב-new ו-delete ידניים:</p>
      <ul>
        <li><strong>RAII (Resource Acquisition Is Initialization):</strong> קשירת משאב (זיכרון, קובץ, סוקט) לאובייקט במחסנית. הבנאי רוכש; המפרק משחרר. פועל דטרמיניסטית גם בעת זריקת חריגות ופריסת מחסנית (Stack Unwinding).</li>
        <li><strong><code>std::unique_ptr&lt;T&gt;</code>:</strong> בעלות בלעדית. אינו ניתן להעתקה אלא רק להעברה (<code>std::move</code>). אפס תקורה ביצועית (Zero-cost). משחרר את הזיכרון אוטומטית ביציאה מהתחום.</li>
        <li><strong><code>std::shared_ptr&lt;T&gt;</code>:</strong> בעלות משותפת. מחזיק מונה הפניות פנימי (Reference Count). הבלוק ישוחרר רק כשהמונה מתאפס.</li>
        <li><strong><code>std::weak_ptr&lt;T&gt;</code>:</strong> מצביע בלתי מחזיק (Non-owning). אינו מעלה את מונה ההפניות. חיוני למניעת <strong>מעגלי הפניות (Cyclic References)</strong> הגורמים לדליפות זיכרון ב-shared_ptr.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>בטיחות חריגות במכולות STL:</strong> עבור <code>std::vector</code>, שימוש ב-<code>vec[i]</code> אינו מבצע שום בדיקת גבולות. שימוש ב-<code>vec.at(i)</code> מבצע בדיקת גבולות וזורק חריגת <code>std::out_of_range</code> במקרה של חריגה.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>אם נשאלתם כיצד לתקן דליפת זיכרון של שני אובייקטים המצביעים זה על זה באמצעות <code>shared_ptr</code> &ndash; התשובה היא להמיר את אחד המצביעים ל-<code>std::weak_ptr</code> כדי לשבור את מעגל ההפניות.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>מתי להשתמש בכל מצביע חכם?</strong>
        <ul>
          <li>ברירת מחדל ראשונה תמיד: <code>std::unique_ptr</code> (בעלות בלעדית ופשוטה).</li>
          <li>נדרש שיתוף בעלות בין כמה רכיבים: <code>std::shared_ptr</code>.</li>
          <li>מצביע לתצפית ללא בעלות או למניעת מעגל: <code>std::weak_ptr</code>.</li>
        </ul>
      </div>
    `
  },

  // --- יחידה 3: התמודדות עם חולשות אבטחה בשפות C ו־C++ ---
  {
    unit: "3",
    title: "מבנה מסגרת המחסנית (Stack Frame), מוסכמות קריאה וסדר בתים Little-Endian",
    content: `
      <p>המבנה הפיזי של מחסנית הקריאות בארכיטקטורת x86 והגורמים המאפשרים דריסת זיכרון:</p>
      <ul>
        <li><strong>כיוון גדילת המחסנית:</strong> המחסנית גדלה <strong>מכתובות גבוהות לנמוכות</strong> (הוראת push מקטינה את ESP).</li>
        <li><strong>אוגרים מרכזיים:</strong>
          <br>&bull; <code>ESP / RSP:</code> Stack Pointer &ndash; ראש המחסנית הנוכחי.
          <br>&bull; <code>EBP / RBP:</code> Base Pointer &ndash; בסיס המסגרת, משמש עוגן יציב למשתנים וארגומנטים.
          <br>&bull; <code>EIP / RIP:</code> Instruction Pointer &ndash; מצביע לפקודת המכונה הבאה לביצוע.
        </li>
        <li><strong>סדר הדברים במסגרת (מלמעלה למטה / מכתובת גבוהה לנמוכה):</strong>
          <ol>
            <li>ארגומנטים לפונקציה (שנדחפו ע"י הקורא)</li>
            <li>כתובת חזרה (Saved Return Address / Saved EIP)</li>
            <li>מצביע מסגרת קודם שמור (Saved EBP)</li>
            <li>קנרית המחסנית (Stack Canary &ndash; אם מופעלת)</li>
            <li>משתנים מקומיים וחוצצים (Buffers)</li>
          </ol>
        </li>
        <li><strong>מוסכמות קריאה:</strong> <code>cdecl</code> &ndash; הקורא מנקה את המחסנית (תומך במספר משתנה של ארגומנטים כמו printf); <code>stdcall</code> &ndash; הפונקציה הנקראת מנקה את המחסנית בעצמה.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>המלכודת הארכיטקטונית של המחסנית:</strong> בעוד המחסנית גדלה מכתובות גבוהות לנמוכות, כתיבה לתוך מערך מקומי (למשל מאינדקס 0 ל-100) מתקדמת <strong>מכתובות נמוכות לגבוהות</strong> &ndash; כלומר ישירות לעבר הקנרית, ה-Saved EBP וכתובת החזרה!</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שאלת Little-Endian משוחזרת מועד 2025ג מועד ג):</strong>
        <p>נתון הקוד הבא:
        <pre class="code" dir="ltr"><code>int x = 0xC00010FF;
char buffer[4];
memcpy(buffer, &x, sizeof(x));</code></pre>
        <strong>שאלה:</strong> מה יהיה ערך הבתים ב-<code>buffer[0]</code> עד <code>buffer[3]</code>?
        <br><strong>תשובה:</strong> מכיוון שמערכות x86 הן <strong>Little-Endian</strong>, הבית הפחות משמעותי (LSB) נשמר בכתובת הנמוכה ביותר:
        <br><code>buffer[0] = 0xFF</code> (LSB)
        <br><code>buffer[1] = 0x10</code>
        <br><code>buffer[2] = 0x00</code>
        <br><code>buffer[3] = 0xC0</code> (MSB)
        <br><em>אזהרה: המסיח הנפוץ מציג את הסדר ההפוך (Big-Endian: C0, 00, 10, FF)!</em></p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>תרשים זיכרון המסגרת:</strong>
        <pre dir="ltr"><code>[כתובת גבוהה]
  |  ארגומנטים (Arguments)
  |  כתובת חזרה (Saved Return Address) &lt;-- יעד השתלטות ראשי
  |  Saved EBP
  |  Stack Canary (אם מופעל)
  |  משתנים מקומיים / חוצצים (כתיבה מתקדמת כלפי מעלה!)
[כתובת נמוכה - ESP]</code></pre>
      </div>
    `
  },
  {
    unit: "3",
    title: "גלישת חוצץ במחסנית (Buffer Overflow), פונקציות מסוכנות ומלכודת Off-by-One",
    content: `
      <p>הכשלים הקלאסיים בהעתקת מחרוזות וניהול חוצצים:</p>
      <ul>
        <li><strong>פונקציות אסורות ופסולות:</strong>
          <br>&bull; <code>gets():</code> נמחקה מתקן C11! אינה מקבלת מגבלת אורך ואינה ניתנת לשימוש בטוח לעולם.
          <br>&bull; <code>strcpy(), strcat(), sprintf(), scanf("%s"):</code> מסוכנות מאוד &ndash; מעתיקות עד למציאת תו <code>\\0</code> ללא בדיקת קיבולת החוצץ ביעד.
        </li>
        <li><strong>חלופות בטוחות:</strong>
          <br>&bull; <code>fgets(buf, sizeof(buf), stdin):</code> קוראת עד מגבלת האורך כולל שמירת מקום ל-NULL.
          <br>&bull; <code>snprintf(buf, sizeof(buf), ...):</code> מבטיחה אי-חריגה מסף האורך.
          <br>&bull; ב-C++: מעבר ל-<code>std::string</code> המנהלת זיכרון באופן דינמי ואוטומטי.
        </li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>מלכודת <code>strncpy</code>:</strong> אם אורך המחרוזת במקור מגיע למגבלה שצוינה ב-<code>n</code>, פונקציית <code>strncpy</code> <strong>אינה מוסיפה תו NULL מסיים (<code>\\0</code>)!</strong>
        החוצץ נותר בלתי סגור, וכל קריאה הבאה (כמו <code>strlen</code> או <code>printf("%s")</code>) תמשיך לקרוא תאי זיכרון שכנים.
        <em>התיקון הדפנסיבי:</em> תמיד להוסיף ידנית: <code>buf[sizeof(buf) - 1] = '\\0';</code>.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (חולשת Off-by-One והסטת מחסנית):</strong>
        <p>טעות אינדקס קלאסית: לולאה עם תנאי שוויון: <code>for (int i = 0; i &lt;= 32; i++) buf[i] = ...;</code> במערך של 32 בתים.
        <br>הלולאה כותבת בית 33 בודד מעבר לגבול. ב-x86, בית בודד זה דורס את הבית התחתון של <strong>Saved EBP</strong>.
        <br>בעת החזרה מהפונקציה, המהדר מבצע <code>leave</code> (המשחזר את ESP מתוך EBP) ו-<code>ret</code>. המחסנית מוסטת לאזור שבשליטת התוקף &ndash; מתקפה המכונה <strong>Stack Pivoting</strong>.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>השוואת פונקציות C:</strong>
        <ul>
          <li><code>gets(buf)</code> &rarr; <strong>אסור לחלוטין!</strong></li>
          <li><code>strcpy(dst, src)</code> &rarr; <strong>מסוכן מאוד</strong> (אין בדיקת גודל).</li>
          <li><code>strncpy(dst, src, n)</code> &rarr; <strong>זהיר</strong> (דורש סגירת NULL ידנית).</li>
          <li><code>snprintf(dst, sizeof(dst), ...)</code> &rarr; <strong>בטוח ומומלץ</strong>.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "3",
    title: "קנרית המחסנית (Stack Canary / StackGuard) — עקרון פעולה, מבנה מחסנית ומגבלות",
    content: `
      <p>מנגנון אפחות מהדר נפוץ להגנה מפני גלישות מחסנית לינאריות:</p>
      <ul>
        <li><strong>עקרון הפעולה:</strong> המהדר שותל ערך אקראי סודי (Canary Word) במסגרת המחסנית בין המשתנים המקומיים לבין ה-Saved EBP וכתובת החזרה.</li>
        <li><strong>בדיקה ביציאה:</strong> מיד לפני פקודת <code>ret</code>, המהדר משווה את הערך במחסנית לעותק השמור. אם הערך שונה &ndash; התוכנית קורסת מיד (<code>abort / __stack_chk_fail</code>) ומונעת את ביצוע החזרה.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>חמש מגבלות ומעקפי הקנרית (שאלת מבחן קלאסית 2021א שאלה 5, 2022ג, 2024):</strong>
        <ol>
          <li><strong>מגינה רק על המחסנית:</strong> אינה מגינה כלל על חוצצים בערימה (Heap Buffer Overflow)!</li>
          <li><strong>אינה מגינה על משתנים מקומיים:</strong> משתנים מקומיים, דגלי הרשאה ומצביעי פונקציה הנמצאים לפני הקנרית באותה מסגרת נדרסים ונפגעים ללא אזהרה.</li>
          <li><strong>אינה מגינה על vptr בערימה:</strong> דריסת מצביע טבלה וירטואלית של אובייקט בערימה אינה מפעילה את הקנרית.</li>
          <li><strong>עקיפה באמצעות זליגת זיכרון (Information Leak):</strong> אם התוקף מדליף את ערך הקנרית (למשל דרך Format String), הוא יכול לשתול אותו במדויק בתוך מחרוזת הגלישה ולעקוף את הבדיקה.</li>
          <li><strong>אינה מתקנת את שורש הבאג:</strong> הבאג קיים וגורם לקריסה (פגיעה בזמינות / DoS).</li>
        </ol></p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>שאלה במבחן: <em>"האם הפעלת Stack Canary מגנה מפני גלישת חוצץ בערימה (Heap)?"</em>
        <br><strong>תשובה: לא!</strong> הקנרית קיימת אך ורק במסגרות מחסנית של פונקציות.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>סיכום תפקיד הקנרית:</strong>
        <ul>
          <li>בולמת: גלישת מחסנית לינארית הדורסת את כתובת החזרה.</li>
          <li>אינה בולמת: גלישת ערימה &bull; שינוי משתנים מקומיים &bull; מתקפות קריאה &bull; מעקף עם זליגת ערך הקנרית.</li>
        </ul>
      </div>
    `
  },
  {
    unit: "3",
    title: "הגנות מרחב כתובות והרצה: ASLR ו-DEP/NX מול מתקפות ROP",
    content: `
      <p>מנגנוני הגנה מערכתיים ברמת מערכת ההפעלה והחומרה:</p>
      <ul>
        <li><strong>ASLR (Address Space Layout Randomization):</strong> מערכת ההפעלה מגרילה בכל הרצה מחדש את כתובות הבסיס של המחסנית, הערימה והספריות המשותפות (<code>libc / DLLs</code>). התוקף אינו יכול להסתמך על כתובות פונקציות קבועות מראש.
          <br><em>מעקף:</em> דליפת זיכרון של כתובת מצביע בודדת מאפשרת חישוב כתובת הבסיס (<code>Base = Leaked_Address - Known_Offset</code>). כמו כן, קובץ ללא PIE מאפשר קפיצה לקוד קבוע.</li>
        <li><strong>DEP / NX (Data Execution Prevention / No-Execute / W^X):</strong> הגנת חומרה (ביט NX בטבלאות הדפים של המעבד). דפי נתונים (מחסנית וערימה) מסומנים כבלתי ניתנים להרצה.
          <br><em>חוסם לחלוטין:</em> הזרקת Shellcode למחסנית או לערימה.</li>
        <li><strong>ROP (Return-Oriented Programming):</strong> טכניקת תקיפה מתקדמת העוקפת את DEP/NX.
          <br>התוקף אינו מזריק קוד חדש, אלא שוזר קטעי קוד לגיטימיים קיימים במקטע ה-Text או ב-libc המסתיימים בפקודת <code>ret</code> (המכונים <strong>Gadgets</strong>). שרשרת כתובות הגאדג'טים מוזנת למחסנית, וביצוע <code>ret</code> מפעיל אותם בזה אחר זה.</li>
        <li><strong>מחסנית צל (Shadow Stack / Intel CET):</strong> פתרון חומרתי חדש ל-ROP: המעבד מנהל מחסנית צל פנימית מבודדת שבה נשמר עותק של כתובות החזרה, ומשווה אותן ב-<code>ret</code> &ndash; חוסם ROP חומרתית!</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>משוואת הבחינה החשובה ביותר:</strong>
        <br>• האם DEP מגן מפני הזרקת Shellcode למחסנית? &rarr; <strong>כן!</strong>
        <br>• האם DEP מגן מפני מתקפת ROP? &rarr; <strong>לא!</strong> (כי ROP משתמש בקוד במקטע Text שכבר מורשה להרצה).
        <br>• מה מגן מפני ROP? &rarr; ASLR (מבלבל כתובות גאדג'טים), ו-CET / Shadow Stack (חוסם ברמת חומרה).</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שחזורי 2021-2024):</strong>
        <p>שאלה: <em>"תוכנית קומפלה עם הגנת DEP בלבד, ללא ASLR. האם היא פגיעה להשתלטות?"</em>
        <br><strong>תשובה: כן, באמצעות ROP / ret2libc!</strong> מכיוון שאין ASLR, כתובות הפונקציות ב-libc (כגון <code>system()</code>) קבועות וידועות מראש, ו-DEP אינו מונע קפיצה אליהן.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>מטריצת הגנות:</strong>
        <table border="1" style="border-collapse:collapse; width:100%; font-size:0.9em;">
          <tr><th>מנגנון</th><th>רמת הגנה</th><th>ממה מגן?</th><th>וקטור מעקף</th></tr>
          <tr><td><strong>Canary</strong></td><td>מהדר</td><td>דריסת Saved EIP במחסנית</td><td>זליגת ערך (Format String), גלישת ערימה</td></tr>
          <tr><td><strong>DEP/NX</strong></td><td>חומרה (MMU)</td><td>ביצוע Shellcode במחסנית/ערימה</td><td>ROP (שימוש בקוד קיים)</td></tr>
          <tr><td><strong>ASLR</strong></td><td>מערכת הפעלה</td><td>קפיצה לכתובות קבועות</td><td>זליגת זיכרון של כתובת בודדת, No-PIE</td></tr>
          <tr><td><strong>Shadow Stack</strong></td><td>חומרה (CET)</td><td>דריסת כתובת חזרה ו-ROP</td><td>קפיצות שאינן מבוססות ret (כגון vptr)</td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "3",
    title: "דריסת מצביע טבלה וירטואלית (Vptr Smashing) בערימה ובמחסנית",
    content: `
      <p>שאלת בחינה פתוחה מובהקת החוזרת במועדים רבים (2026א שאלה 7, 2025ג שאלה 8):</p>
      <ul>
        <li><strong>מבנה האובייקט בזיכרון:</strong> באובייקט פולימורפי, השדה הראשון (היסט 0) הוא מצביע ה-<code>vptr</code>, המכוון לטבלת ה-vtable של המחלקה.</li>
        <li><strong>מנגנון התקיפה:</strong> אם חוצץ שכן נגלש (במחסנית או בערימה), או בעקבות שגיאת Use-After-Free &ndash; התוקף דורס את שדה ה-vptr ומכוון אותו לטבלה מזויפת (Fake Vtable) שבשליטתו.</li>
        <li><strong>הניצול:</strong> ברגע שהקוד מבצע קריאה פולימורפית (<code>obj-&gt;virtualMethod()</code>), המעבד שולף את כתובת הפונקציה מהטבלה המזויפת וקופץ לקוד זדוני (חטיפת זרימת בקרה &ndash; Control Flow Hijacking).</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>ארבע נקודות זהב לתשובה בבחינה:</strong>
        <ol>
          <li>מילת המפתח <code>private</code> אינה מהווה הגנת זיכרון! (היא נאכפת ע"י המהדר בקומפילציה בלבד; בזיכרון הפיזי הכל בתים רציפים הניתנים לדריסה).</li>
          <li>קנרית המחסנית (Stack Canary) <strong>אינה מגנה</strong> על vptr של אובייקטים בערימה.</li>
          <li>שינוי סדר השדות במחלקה אינו אפחות הנדסי תקני.</li>
          <li><strong>ההגנות האמיתיות:</strong> בדיקות גבולות קפדניות בקוד, שימוש ב-CFI (Control Flow Integrity), והפעלת ASLR.</li>
        </ol></p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שאלת שחזור 2026א שאלה 7):</strong>
        <p>קוד נתון: מבנה עם חוצץ <code>char buf[64]</code> ואובייקט <code>Widget</code> פולימורפי סמוך. מתבצעת גלישה ל-buf.
        <br><strong>שאלה:</strong> כיצד התוקף משיג הרצת קוד?
        <br><strong>תשובה:</strong> הגלישה מ-buf דורסת את ה-vptr של Widget; התוקף מכוון אותו למבנה בערימה המדמה vtable; הקריאה <code>w-&gt;render()</code> קופצת לכתובת הזדונית.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>שרשרת vptr hijacking:</strong>
        <p><code>גלישת חוצץ שכן &rarr; שכתוב כתובת vptr &rarr; הצבעה ל-Fake Vtable &rarr; קריאה למתודה וירטואלית &rarr; קפיצה לקוד תוקף</code></p>
      </div>
    `
  },
  {
    unit: "3",
    title: "גלישות מספרים שלמים (Integer Overflow / Underflow) ומלכודת malloc(count * size)",
    content: `
      <p>שגיאות חישוב מתמטיות המובילות להרס מנגנוני הקצאת זיכרון:</p>
      <ul>
        <li><strong>גלישת מספר בלתי חתום (unsigned):</strong> מוגדרת היטב בתקן השפה כפעולת מודולו 2 בחזקת מספר הסיביות (Wrap-around). <code>UINT_MAX + 1 == 0</code>.</li>
        <li><strong>גלישת מספר בעל סימן (signed):</strong> <strong>מוגדרת בתקן כ-Undefined Behavior (UB)!</strong> מהדרים מודרניים מניחים שגלישה כזו אינה קורית, ומוחקים בדיקות אבטחה בדיעבד כגון <code>if (a + b &lt; a)</code>.</li>
        <li><strong>מלכודת ההקצאה הקלאסית (שחזורי 2024 ו-2025ג מועד ג):</strong>
          <pre class="code" dir="ltr"><code>size_t count = read_input(); // ערך גדול מהרשת
int* arr = (int*)malloc(count * sizeof(int));
for (size_t i = 0; i &lt; count; i++) {
    arr[i] = read_int();
}</code></pre>
          אם <code>count = 0x40000001</code> במערכת 32 סיביות:
          <code>0x40000001 * 4 = 0x100000004</code> &larr; נקטם במודולו ל-<strong>4 בתים בלבד!</strong>
          <code>malloc</code> מקצה בהצלחה חוצץ זעיר של 4 בתים. הלולאה מיד לאחר מכן מנסה לכתוב מעל מיליארד איברים &larr; <strong>גלישת ערימה קטסטרופלית (Heap Overflow)!</strong>
        </li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>הבדיקה הדפנסיבית הנכונה למניעת גלישת כפל בהקצאה:</strong>
        <pre class="code" dir="ltr"><code>if (count &gt; SIZE_MAX / sizeof(int)) {
    // דיווח שגיאה וחסימת הקצאה!
    return ERROR_OVERFLOW;
}</code></pre>
        בודקים חלוקה <strong>לפני</strong> ביצוע פעולת הכפל!</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שחזור 2025ג מועד ג שאלה 6):</strong>
        <p>קוד נתון: <code>calloc(length + 2, sizeof(char));</code> כאשר length מגיע כקלט.
        <br><strong>שאלה:</strong> מהי חולשת האבטחה?
        <br><strong>תשובה: Integer Overflow בחיבור!</strong> אם length שווה ל-<code>SIZE_MAX - 1</code>, החיבור של 2 גולש ל-0 או 1, calloc מקצה בלוק זעיר, והעתקת המחרוזת גורמת לגלישת ערימה.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>בדיקות בטוחות לפעולות חשבון:</strong>
        <ul>
          <li>בדיקת חיבור בטוח: <code>if (a &gt; SIZE_MAX - b) // overflow</code></li>
          <li>בדיקת כפל בטוח: <code>if (b != 0 &amp;&amp; a &gt; SIZE_MAX / b) // overflow</code></li>
        </ul>
      </div>
    `
  },
  {
    unit: "3",
    title: "חולשת מחרוזת פורמט (Format String) — קריאה (%x/%p), כתיבה שרירותית (%n) ומניעה",
    content: `
      <p>חולשה חמורה הנובעת מהעברת קלט משתמש כפרמטר פורמט לפונקציות ממשפחת printf:</p>
      <ul>
        <li><strong>שורש החולשה:</strong> קריאה כגון <code>printf(user_input);</code> במקום <code>printf("%s", user_input);</code>.
        הפונקציה מפרשת כל תו <code>%</code> כהוראת עיצוב ושולפת ערכים מהמחסנית.</li>
        <li><strong>ניצול לקריאה (Information Leak):</strong>
          <br>&bull; <code>%x / %p:</code> מדפיסים ערכים מראש המחסנית &ndash; מאפשרים הדלפת כתובות חזרה (עקיפת ASLR) והדלפת ערך הקנרית (Stack Canary).
          <br>&bull; <code>%s:</code> מתייחס לערך במחסנית ככתובת זיכרון ומדפיס את המחרוזת &ndash; מאפשר קריאת זיכרון מכל כתובת שרירותית.
        </li>
        <li><strong>ניצול לכתיבה שרירותית (Arbitrary Memory Write):</strong>
          <br>&bull; <code>%n:</code> <strong>כותב את מספר התווים שהודפסו עד כה</strong> לתוך הכתובת המוצבעת ע"י הפרמטר במחסנית!
          התוקף מעצב את רוחב ההדפסה ומשתמש ב-<code>%n</code> כדי לשכתב כתובות חזרה, מצביעי פונקציה או vptr!
        </li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>כלל ברזל דפנסיבי:</strong> מחרוזת הפורמט של printf חייבת להיות תמיד <strong>מחרוזת קבועה סטטית (String Literal)</strong> בקוד המקור. קלט משתמש יועבר תמיד אך ורק כפרמטר נתון: <code>printf("%s", user_str);</code>.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>במבחן נשאל: <em>"כיצד מציין הפורמט <code>%n</code> שונה מכל שאר מצייני הפורמט ב-printf?"</em>
        <br><strong>תשובה:</strong> כל מצייני הפורמט האחרים (<code>%d, %s, %p, %x</code>) <strong>קוראים</strong> נתונים ומציגים אותם; מציין <code>%n</code> הוא היחיד שמבצע <strong>כתיבה (Write) לתוך הזיכרון!</strong></p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>סכנות Format String:</strong>
        <ul>
          <li><code>%x / %p</code> &rarr; הדלפת מחסנית, חשיפת Canary &amp; ASLR base.</li>
          <li><code>%s</code> &rarr; קריאת זיכרון שרירותית (סודיות).</li>
          <li><code>%n</code> &rarr; כתיבת זיכרון שרירותית והשתלטות (שלמות וביצוע).</li>
        </ul>
      </div>
    `
  },
  {
    unit: "3",
    title: "כשלי ניהול זיכרון בערימה: Use-After-Free, Double Free ו-Memory Leak",
    content: `
      <p>שלושת פגמי הזיכרון המובילים בניהול ידני של הערימה ב-C/C++:</p>
      <ul>
        <li><strong>Use-After-Free (UAF):</strong> גישה למצביע לאחר שהבלוק שהוקצה עבורו שוחרר ב-<code>free()</code> או ב-<code>delete</code> (המצביע הופך למצביע יתום &ndash; Dangling Pointer).
          <br><em>מנגנון הניצול:</em> מנהל הערימה ממחזר בלוקים משוחררים. אם מוקצה אובייקט חדש באותו מקום, כתיבה דרך המצביע הישן דורסת את שדותיו של האובייקט החדש (במיוחד מצביע ה-vptr שלו) ומאפשרת השתלטות מלאה.
          <br><em>מניעה:</em> איפוס מיידי של מצביעים לאחר שחרור: <code>p = nullptr;</code>, ומעבר למצביעים חכמים (<code>std::unique_ptr</code>).</li>
        <li><strong>Double Free:</strong> שחרור כפול של אותו בלוק זיכרון בערימה. משחית את הרשימות המקושרות הפנימיות של מנהל ה-Heap (כגון Fastbins/Tcache ב-glibc) ועלול להוביל לכתיבה שרירותית.</li>
        <li><strong>Memory Leak (דליפת זיכרון):</strong> אי-שחרור של בלוקים שהוקצו. מוביל למיצוי משאבים מתמשך, להאטה ובסופו של דבר לקריסת התהליך &ndash; פגיעה מובהקת ביעד ה-<strong>Availability (זמינות)</strong>.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p><strong>פתרון מבני לכשלי ערימה:</strong> אימוץ עקרון RAII ושימוש ב-<code>std::unique_ptr</code> ו-<code>std::shared_ptr</code> מונע לחלוטין דליפות זיכרון ושחרור כפול על ידי ניהול בעלות אוטומטי.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן (שאלת ניתוח קוד UAF):</strong>
        <p>אם רואים בקוד:
        <pre class="code" dir="ltr"><code>free(ptr);
// ... קוד נוסף שמקצה אובייקט חדש ...
ptr-&gt;action(); // שגיאה!</code></pre>
        זהו Use-After-Free קלאסי! הקריאה ל-action תתבצע על האובייקט החדש שהתמקם באותה כתובת זיכרון.</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>טבלת השוואת כשלי ערימה:</strong>
        <table border="1" style="border-collapse:collapse; width:100%; font-size:0.9em;">
          <tr><th>כשל</th><th>הגדרה</th><th>סכנה עיקרית</th><th>אפחות מומלץ</th></tr>
          <tr><td><strong>UAF</strong></td><td>שימוש במצביע לאחר free</td><td>חטיפת בקרה / דריסת vptr</td><td>איפוס ל-nullptr, unique_ptr</td></tr>
          <tr><td><strong>Double Free</strong></td><td>קריאה כפולה ל-free</td><td>השחתת מטא-דאטה בערימה</td><td>איפוס ל-nullptr, בדיקת בעלות</td></tr>
          <tr><td><strong>Memory Leak</strong></td><td>חוסר שחרור משאבים</td><td>מיצוי זיכרון ו-DoS</td><td>עקרון RAII, מכולות STL</td></tr>
        </table>
      </div>
    `
  },
  {
    unit: "3",
    title: "כשלים מתקדמים: TOCTOU, מחיקת איפוס סודי (Dead Store Elimination) וארגז כלי בדיקה",
    content: `
      <p>חולשות מערכת ייחודיות וכלים מעשיים לאיתורן:</p>
      <ul>
        <li><strong>TOCTOU (Time-of-Check to Time-of-Use):</strong> מצב מרוץ (Race Condition) במערכת קבצים:
          המערכת בודקת הרשאות לקובץ (למשל עם <code>access()</code>), ורק לאחר מכן פותחת אותו (עם <code>open()</code>).
          בפער הזמן הזעיר שבין הבדיקה לשימוש, התוקף מחליף את הקובץ בקישור סימבולי (Symlink) לקובץ מערכת רגיש (כגון <code>/etc/passwd</code>).
          <br><em>מניעה:</em> פעולות פתיחה אטומיות (<code>open</code> עם דגלי <code>O_CREAT | O_EXCL</code>) ועבודה רציפה עם מתארי קבצים (File Descriptors: <code>fstat, fchmod</code>) במקום שמות קבצים.</li>
        <li><strong>מחיקת איפוס סודי (Dead Store Elimination):</strong>
          מתכנתים מאפסים חוצץ סיסמאות בזיכרון בסיום הפונקציה: <code>memset(password, 0, len);</code>.
          המהדר, בעת ביצוע אופטימיזציה, מזהה שחוצץ הסיסמה אינו נקרא עוד לעולם לפני סיום הפונקציה, ומחליט <strong>למחוק לחלוטין את פעולת ה-memset</strong> כ"קוד מת"!
          התוצאה: הסיסמה נותרת גלויה בזיכרון ה-RAM וחשופה לזליגות.
          <br><em>מניעה:</em> שימוש בפונקציות איפוס ייעודיות שהמהדר אינו רשאי למחוק (כגון <code>explicit_bzero</code> בלינוקס או <code>SecureZeroMemory</code> ב-Windows).</li>
        <li><strong>מתקפות תזמון (Timing Attacks):</strong> השוואת סיסמאות בעזרת <code>strcmp</code> או <code>==</code> מסתיימת בתו הראשון שאינו תואם. מדידת זמני תגובה מאפשרת ניחוש הסיסמה תו אחר תו.
          <br><em>מניעה:</em> השוואה בזמן קבוע (Constant-Time Comparison).</li>
      </ul>
      <h3>ארגז כלי הבדיקה והניתוח</h3>
      <ul>
        <li><strong>ניתוח סטטי (Static Analysis - כגון <code>cppcheck</code>):</strong> סריקת קוד המקור ללא הרצה; מאתר חריגות גבולות, מצביעים שלא אותחלו ופונקציות מסוכנות.</li>
        <li><strong>ניתוח דינמי (Dynamic Analysis - כגון <code>Valgrind Memcheck</code> / <code>AddressSanitizer (ASan)</code>):</strong> הרצת התוכנית ומעקב בזמן אמת אחרי גישות לזיכרון; מזהה דליפות זיכרון, UAF וגלישות ערימה ומחסנית.</li>
        <li><strong>עירפול (Fuzzing):</strong> כלי המזריק כמויות עצומות של קלטים אקראיים ומשובשים לתוכנית כדי לחשוף קריסות וכשלי פיענוח חבויים.</li>
      </ul>
      <div class="note-box highlight">
        <strong>מה למרקר במדריך:</strong>
        <p>בדיקה סטטית ודינמית משלימות זו את זו: ניתוח סטטי מקיף את כל נתיבי הקוד אך סובל מ-False Positives; ניתוח דינמי בודק רק נתיבים שהופעלו בפועל אך מציג שגיאות אמיתיות בלבד.</p>
      </div>
      <div class="note-box exam-tip">
        <strong>טיפ למבחן:</strong>
        <p>אם נשאלתם כיצד למנוע מרוץ זמנים מסוג TOCTOU בפתיחת קובץ &ndash; התשובה היא <strong>פתיחה אטומית באמצעות מתארי קבצים</strong> (ולא בדיקת access מקדימה!).</p>
      </div>
      <div class="note-box cheat-sheet">
        <strong>ארגז כלי בדיקה:</strong>
        <ul>
          <li><strong>cppcheck:</strong> ניתוח סטטי &bull; אין צורך בהרצה &bull; מאתר פונקציות מסוכנות.</li>
          <li><strong>Valgrind / ASan:</strong> ניתוח דינמי &bull; מנטר זיכרון בריצה &bull; מאתר UAF ודליפות.</li>
          <li><strong>Fuzzer:</strong> קלטים אקראיים &bull; מגלה מקרי קצה חבויים.</li>
        </ul>
      </div>
    `
  },
{
    unit: "4",
    title: "צ'יט-שיט מבחן: יצירת מחלקה דינמית עם type(name, bases, dict)",
    content: `<p><b>תחביר מלא של יצירה דינמית בזמן ריצה:</b></p>
<pre class="code" dir="ltr"><code># הגדרת פונקציה שתשמש כמתודה (חובה self כפרמטר ראשון!):
def say_hello(self):
    return f"Hello, I am {self.name}"

# קריאה ל-type עם 3 ארגומנטים:
# 1. שם המחלקה (str)
# 2. טאפל מחלקות אב (tuple)
# 3. מילון מתודות ושדות (dict)
DynamicPerson = type("DynamicPerson", (object,), {
    "species": "Homo sapiens",
    "greet": say_hello
})

p = DynamicPerson()
p.name = "Alice"
print(p.greet())  # מדפיס: Hello, I am Alice</code></pre>
<ul>
  <li><b>מלכודת מבחן קריטית — פסיק בטאפל של אב יחיד:</b> בירושה ממחלקה אחת בלבד, חובה לכתוב <code>(BaseClass,)</code> עם פסיק בסוף! אם כותבים <code>(BaseClass)</code>, פייתון מתייחסת לזה כאל ביטוי סוגריים חשבוני רגיל וזורקת שגיאת <code>TypeError: bases must be types</code>.</li>
  <li><b>שאלת מבחן קלאסית:</b> יצירת מחלקות באופן אוטומטי מתוך רשימת מילים או קטגוריות מקובץ.</li>
</ul>`
  },
  {
    unit: "4",
    title: "צ'יט-שיט מבחן: עיבוד מחרוזות, מילים, וספירת תדירויות (שאלת 6)",
    content: `<p>שאלות 6 במבחנים רבות עוסקות בעיבוד טקסט ומילים מתוך קובץ או מחרוזת:</p>
<pre class="code" dir="ltr"><code>def process_words(filename):
    word_counts = {}
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            # split() ללא ארגומנט מפרק לפי כל רווח לבן: רווחים כפולים, \t, \n
            words = line.split()
            for w in words:
                clean_w = w.strip(".,!?:;"'").lower()
                if not clean_w:
                    continue
                # זיהוי מילים שמתחילות ומסתיימות באותה אות:
                if clean_w[0] == clean_w[-1]:
                    pass
                # המרת אות ראשונה לגדולה והשאר קטנות (Capitalize):
                # clean_w.capitalize() או: clean_w[0].upper() + clean_w[1:]
                
                # ספירת תדירות בטוחה ללא KeyError:
                word_counts[clean_w] = word_counts.get(clean_w, 0) + 1
    return word_counts</code></pre>
<ul>
  <li><b>אי־השתנות של str:</b> מתודות כמו <code>upper()</code>, <code>replace()</code> או חיתוך אינן משנות את המחרוזת המקורית, אלא מחזירות תמיד אובייקט חדש.</li>
  <li><b>אינדוקס שלילי:</b> <code>s[-1]</code> מחזיר את התו האחרון; חיתוך <code>s[::-1]</code> הופך את המחרוזת.</li>
</ul>`
  },
  {
    unit: "4",
    title: "מלכודת מבחן: היעדר העמסת פונקציות (Function Overloading) וברירות מחדל מוטביליות",
    content: `<ul>
  <li><b>אין העמסת פונקציות בפייתון:</b> אם נגדיר באותה מחלקה שתי מתודות בעלות אותו שם אך חתימה שונה (למשל אחת עם פרמטר אחד והשנייה עם שניים) — <b>ההגדרה השנייה פשוט תדרוס ותמחק לחלוטין את הראשונה!</b><br>
  <i>הפתרון הדפנסיבי:</i> שימוש בערכי ברירת מחדל אופציונליים (<code>def f(x, y=None)</code>) או בדיקת טיפוסים דינמית עם <code>isinstance()</code>.</li>
  <li><b>מלכודת ברירת מחדל ניתנת לשינוי (Mutable Default Argument):</b>
<pre class="code" dir="ltr"><code># שגיאה קשה: הרשימה נוצרת פעם אחת בלבד בעת טעינת הפונקציה ומשותפת לכל הקריאות!
def add_to_list(val, my_list=[]):
    my_list.append(val)
    return my_list

# פתרון דפנסיבי תקני:
def add_to_list_safe(val, my_list=None):
    if my_list is None:
        my_list = []
    my_list.append(val)
    return my_list</code></pre>
  </li>
</ul>`
  },
  {
    unit: "4",
    title: "מה למרקר במדריך: כינוי כפול (Aliasing), העתקה רדודה לעומת עמוקה, ו-is מול ==",
    content: `<p><b>כינוי כפול (Aliasing):</b> השמה <code>b = a</code> אינה מעתיקה רשימה, אלא יוצרת הפניה נוספת לאותו אובייקט בזיכרון. שינוי דרך <code>b</code> משנה מיד את <code>a</code>.</p>
<p><b>העתקה רדודה (Shallow Copy) מול עמוקה (Deep Copy):</b></p>
<pre class="code" dir="ltr"><code>import copy
a = [[1, 2], [3, 4]]
b = a.copy()          # העתקה רדודה (או a[:])
b[0].append(99)
print(a[0])           # פלט: [1, 2, 99]! האיברים הפנימיים עדיין משותפים!

c = copy.deepcopy(a)  # העתקה עמוקה מלאה
c[0].append(100)
print(a[0])           # פלט: [1, 2, 99] - נשאר ללא שינוי!</code></pre>
<p><b>השוואת <code>is</code> מול <code>==</code>:</b> <code>is</code> בודק האם שתי הפניות מצביעות לאותו אובייקט פיזי בזיכרון (זהות כתובת לפי <code>id()</code>); <code>==</code> קורא למתודה <code>__eq__</code> ובודק האם הערכים והתכנים שווים.</p>`
  },
  {
    unit: "4",
    title: "צ'יט-שיט מבחן: בריחת ארגז חול ברפלקציה (Python Sandbox Escape) מול ast.literal_eval",
    content: `<p><b>סכנת eval ו-exec:</b> מאפשרות הרצת קוד שרירותי (RCE). ניסיון לחסום פקודות ע״י איפוס הפונקציות המובנות (<code>eval(code, {"__builtins__": {}})</code>) נכשל לחלוטין באמצעות <b>רפלקציה (Reflection)</b>:</p>
<pre class="code" dir="ltr"><code># מנגנון העקיפה של התוקף:
# 1. יצירת אובייקט פשוט וטיפוס למחלקת object
subclasses = ().__class__.__base__.__subclasses__()

# 2. סריקת מאות המחלקות הטעונות לאיתור מודול מערכת (למשל catch_warnings או Popen)
target = [c for c in subclasses if c.__name__ == 'catch_warnings'][0]

# 3. חילוץ מודול os דרך המילון הגלובלי והפעלת פקודות מערכת:
os_mod = target.__repr__.__globals__['sys'].modules['os']
os_mod.system('whoami')  # RCE מלא!</code></pre>
<p><b>הפתרון הדפנסיבי: <code>ast.literal_eval()</code></b> — מפרסר בבטחה אך ורק מבני נתונים בסיסיים (מספרים, מחרוזות, רשימות, מילונים, טאפלים, בוליאנים, None). אם הקלט מכיל קריאה לפונקציה, אופרטור או קוד זדוני — נזרקת שגיאת <code>ValueError</code> או <code>SyntaxError</code> ללא הרצה.</p>`
  },
  {
    unit: "4",
    title: "מה למרקר במדריך: סכנות סריאליזציה עם pickle ו-shelve (__reduce__ RCE)",
    content: `<p><b>מנגנון הכשל ב-pickle:</b> בעת שחזור אובייקט ע״י <code>pickle.loads()</code>, פייתון מאפשרת לאובייקט להגדיר את המתודה המיוחדת <code>__reduce__()</code>. מתודה זו מחזירה טאפל המכיל פונקציה להפעלה ורשימת ארגומנטים.</p>
<p>תוקף יכול להרכיב בייטקוד סדורי של pickle שמפעיל ישירות את <code>os.system("rm -rf /")</code> או פותח Reverse Shell בעת הטעינה בשרת:</p>
<pre class="code" dir="ltr"><code>import pickle, os

class Exploit:
    def __reduce__(self):
        return (os.system, ('cat /etc/passwd',))

malicious_bytes = pickle.dumps(Exploit())
# טעינת הבייטים בשרת תריץ מיד את הפקודה!
pickle.loads(malicious_bytes)</code></pre>
<p><b>כלל ברזל במבחן:</b> לעולם אין לקרוא קובץ <code>pickle</code> או <code>shelve</code> ממקור רשת או ממשתמש חיצוני! להעברת נתונים בין מערכות יש להשתמש אך ורק בפורמטים טקסטואליים בטוחים (כמו JSON) יחד עם אימות סכימה.</p>`
  },
  {
    unit: "4",
    title: "טיפ מבחן: כימוס, שיבוש שמות (Name Mangling) וחטיפת מודולים (sys.path)",
    content: `<ul>
  <li><b>כימוס בפייתון:</b>
    <ul>
      <li>קו תחתון בודד (<code>_x</code>): מוסכמת מתכנתים בלבד לשימוש פנימי. אין שום אכיפה מצד המפרש.</li>
      <li>שני קווים תחתונים (<code>__x</code>): מפעיל <b>Name Mangling</b> — המפרש משנה את השם אוטומטית ל־<code>_ClassName__x</code>. המטרה: מניעת דריסה מקרית בירושה מרובה, ולא אבטחה (השדה עדיין נגיש לחלוטין תחת שמו המשובש).</li>
    </ul>
  </li>
  <li><b>חטיפת מודולים (sys.path Hijacking):</b> בעת ביצוע <code>import foo</code>, פייתון סורקת את <code>sys.path</code> לפי סדר. האיבר הראשון (<code>sys.path[0]</code>) הוא התיקייה שבה נמצא הסקריפט המורץ. אם תוקף שותל קובץ בשם <code>math.py</code> או <code>socket.py</code> באותה תיקייה, המפרש יטען את הקובץ המקומי במקום את הספרייה הסטנדרטית.</li>
  <li><b>בלוק ההגנה:</b> <code>if __name__ == "__main__":</code> מבטיח שקוד בדיקה או הרצה ראשית לא יתבצע כאשר הקובץ מיובא כספרייה ע״י קוד אחר.</li>
</ul>`
  },
  {
    unit: "5",
    title: "צ'יט-שיט מבחן: תבנית שרת ולקוח TCP ב-C++ ובפייתון ומלכודות קריטיות",
    content: `<p><b>מחזור חיי שרת ולקוח TCP:</b></p>
<pre class="code" dir="ltr"><code># שרת בפייתון:
import socket
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as srv:
    srv.bind(("127.0.0.1", 8080))  # לא INADDR_ANY שחושף לעולם!
    srv.listen(5)
    # accept מחזיר שקע חדש מול הלקוח! השקע המקורי srv ממשיך להאזין:
    client_sock, client_addr = srv.accept()
    with client_sock:
        data = client_sock.recv(1024)
        client_sock.sendall(data)</code></pre>
<ul>
  <li><b>מלכודת ה-accept:</b> שקע ההאזנה (Listening Socket) משמש אך ורק לקבלת חיבורים חדשים. התקשורת מול הלקוח מתבצעת תמיד דרך שקע השיחה החדש המוחזר מ־<code>accept()</code>.</li>
  <li><b>בדיקת שגיאות ב-C++:</b> <code>socket()</code> מחזיר <code>-1</code> בכישלון. אסור לבדוק <code>== 0</code> (מתאר 0 הוא stdin החוקי).</li>
  <li><b>מלכודת תו האפס במחרוזות ב-C++:</b> <code>recv()</code> קוראת בתים בינאריים גולמיים ו<strong>אינה מוסיפה תו אפס סיום (<code>\0</code>)</strong>! הדפסה עיוורת ע״י <code>printf("%s", buf)</code> גוררת קריאה מעבר לגבולות החוצץ (Buffer Over-read) ודליפת מידע. יש להוסיף ידנית: <code>buf[bytes_received] = '\0';</code>.</li>
</ul>`
  },
  {
    unit: "5",
    title: "צ'יט-שיט מבחן: בעיית ה-Framing מעל TCP ושליחת קבצים בצ'אנקים עם כותרת struct.pack",
    content: `<p><b>TCP כ-Byte Stream:</b> אין גבולות הודעה! <code>recv(1024)</code> עשוי להחזיר רק חלק מההודעה, או מספר הודעות צמודות. חובה לממש <b>מסגור (Framing)</b>.</p>
<p><b>קריאה שלמה מדויקת (תבנית חובה):</b></p>
<pre class="code" dir="ltr"><code>def recv_exact(sock, n):
    buf = bytearray()
    while len(buf) < n:
        chunk = sock.recv(n - len(buf))
        if not chunk:
            raise ConnectionError("Connection closed before receiving all bytes")
        buf.extend(chunk)
    return bytes(buf)</code></pre>
<p><b>תרגיל המרצה — שליחת קובץ בחבילות (Chunks) עם כותרת 12 בתים ב-Big-Endian:</b></p>
<pre class="code" dir="ltr"><code>import struct, math, socket

MAX_PACKET_SIZE = 2048
HEADER_SIZE = 12
CHUNK_SIZE = MAX_PACKET_SIZE - HEADER_SIZE  # 2036 בתים נטו

with open("file.bin", "rb") as f:
    data = f.read()

total_packets = math.ceil(len(data) / CHUNK_SIZE) or 1
with socket.create_connection(("8.8.8.8", 7070)) as sock:
    for pkt_num in range(1, total_packets + 1):
        chunk = data[(pkt_num - 1) * CHUNK_SIZE : pkt_num * CHUNK_SIZE]
        # כותרת: מספר חבילה, סה"כ חבילות, גודל Data - כולם Big-Endian 4-bytes:
        header = struct.pack(">III", pkt_num, total_packets, len(chunk))
        sock.sendall(header + chunk)</code></pre>`
  },
  {
    unit: "5",
    title: "מה למרקר במדריך: 7 שכבות מודל OSI מול TCP/IP ומלכודת שכבת הייצוג (Presentation)",
    content: `<ul>
  <li><b>שכבה 1 (פיזית - Physical):</b> ביטים גולמיים, כבלים, Wi-Fi.</li>
  <li><b>שכבה 2 (ערוץ הנתונים - Data Link):</b> מסגרות (Frames), כתובת פיזית <b>MAC בת 48 סיביות (6 בתים)</b>, מתג (Switch) ברשת מקומית (LAN).</li>
  <li><b>שכבה 3 (רשת - Network):</b> חבילות (Packets), כתובות IP (IPv4 באורך 32 סיביות / 4 בתים; IPv6 באורך 128 סיביות / 16 בתים), נתב (Router) ברשת רחבה (WAN).</li>
  <li><b>שכבה 4 (תובלה - Transport):</b> תקשורת קצה לקצה בין תהליכים, <b>פורטים (16 סיביות)</b>, TCP (אמין, זרם בתים) מול UDP (לא אמין, Datagrams). סדר בתים ברשת Big-Endian (המרה ע״י <code>htons</code>/<code>ntohs</code> ו־<code>htonl</code>/<code>ntohl</code>).</li>
  <li><b>שכבה 5 (שיחה - Session):</b> ניהול מושבי שיחה ותיאום.</li>
  <li><b>שכבה 6 (ייצוג - Presentation) — מוקש בחינה מובהק:</b> אחראית על פורמט נתונים, קידוד תווים (ASCII, UTF-8), דחיסה ו<strong>הצפנה (SSL/TLS)</strong>!</li>
  <li><b>שכבה 7 (יישום - Application):</b> HTTP, DNS, SSH, SMTP, FTP.</li>
</ul>`
  },
  {
    unit: "5",
    title: "מלכודת מבחן ענקית: NAT אינו חומת אש (Firewall)",
    content: `<p><b>NAT (Network Address Translation):</b> מנגנון בשכבת הרשת המתרגם טווח של כתובות IP פרטיות (כגון 192.168.0.0/16 או 10.0.0.0/8) לכתובת IP ציבורית אחת כלפי חוץ. מטרתו המקורית היא לחסוך בכתובות IPv4 ציבוריות.</p>
<p><b>שאלת מפתח שחוזרת במבחנים: האם NAT מספק הגנה ואבטחה?</b></p>
<ul>
  <li><b>תשובה: לא! NAT אינו חומת אש (Firewall).</b></li>
  <li>הוא אינו בודק את תוכן החבילות, אינו מסנן תעבורה זדונית, ואינו מגן מפני נוזקות, סוסים טרויאניים או הזרקות ברמת היישום (SQLi, XSS).</li>
  <li>העובדה שכתובת פרטית אינה נגישה ישירות מחוץ לרשת אינה מונעת מתוכנה זדונית פנימית ליזום חיבור החוצה (Reverse Connection) או להיפגע מפרוטוקולים שפותחים פורטים (כגון UPnP).</li>
  <li>חומת אש אמיתית (Firewall) נדרשת כדי לסנן חבילות לפי מדיניות אבטחה, לפקח על מצב החיבורים (Stateful Inspection) ולחסום פורטים מסוכנים.</li>
</ul>`
  },
  {
    unit: "5",
    title: "צ'יט-שיט מבחן: חוטים מול תהליכים, מרוץ נתונים (Data Race) וסכנת std::thread ללא join",
    content: `<ul>
  <li><b>תהליכים (Processes):</b> מרחב זיכרון וירטואלי מבודד לחלוטין. שיתוף מידע מחייב IPC. בידוד חזק אך תקורה כבדה.</li>
  <li><b>חוטים (Threads):</b> חולקים את אותו מרחב זיכרון (ערימה משותפת, משתנים גלובליים וסטטיים משותפים; מחסנית מקומית נפרדת לכל חוט). מהירים, אך חשופים למרוצי נתונים.</li>
  <li><b>מרוץ נתונים (Data Race):</b> גישה בו־זמנית של שני חוטים לאותו זיכרון ללא סנכרון כשלפחות אחת כותבת. ב-C++ זהו <b>Undefined Behavior (UB)</b>.
    <br><code>counter++</code> אינו פעולה אטומית (הוא מורכב מ־3 שלבי מכונה: Read, Add, Write)! שני חוטים שמבצעים זאת בו־זמנית ידרסו עדכונים זה של זה.
    <br><i>פתרון:</i> <code>std::atomic&lt;int&gt; counter{0};</code> או נעילה עם <code>std::mutex</code>.</li>
  <li><b>מלכודת <code>std::thread</code> ב-C++:</b> כל חוט שנוצר נמצא במצב <code>joinable</code>. אם אובייקט החוט נהרס לפני שנקראה עליו מתודת <code>join()</code> או <code>detach()</code> — המערכת מפעילה מיד <code>std::terminate()</code> והתוכנית כולה מתרסקת!</li>
  <li><b>נעילת RAII:</b> תמיד משתמשים ב־<code>std::lock_guard&lt;std::mutex&gt; lock(mtx);</code> המבטיחה שחרור מנעול אוטומטי ביציאה מבלוק או בעת זריקת חריגה (מניעת Deadlock).</li>
</ul>`
  },
  {
    unit: "5",
    title: "מה למרקר במדריך: נעילת המפרש (GIL בפייתון) וריבוי מעבדים (multiprocessing)",
    content: `<p><b>נעילת המפרש העולמית (GIL - Global Interpreter Lock):</b> במפרש הסטנדרטי של פייתון (CPython), מנעול ה־GIL מאפשר רק לחוט אחד בכל רגע נתון לבצע Bytecode של פייתון.</p>
<ul>
  <li><b>משימות קלט/פלט (I/O-Bound):</b> עבודה מול רשת, שקעים, או קבצים בדיסק. במשימות אלו ריבוי חוטים (<code>threading</code>) יעיל מאוד, משום שה־GIL משתחרר אוטומטית בעת המתנה לקלט/פלט של מערכת ההפעלה.</li>
  <li><b>משימות חישוביות (CPU-Bound):</b> עיבוד תמונה, קריפטוגרפיה, או חישובים מתמטיים כבדים. בריבוי חוטים בפייתון <b>אין שום ניצול של מספר ליבות</b> (למעשה יש האטה עקב מלחמה על ה־GIL!).
  <br><b>הפתרון הדפנסיבי:</b> שימוש במודול <code>multiprocessing</code>, המייצר תהליכים נפרדים של מערכת ההפעלה, שלכל אחד מהם מפרש, מרחב זיכרון ו־GIL עצמאיים לחלוטין.</li>
</ul>`
  },
  {
    unit: "5",
    title: "צ'יט-שיט מבחן: ריבוב קלט/פלט (Reactor / Selectors) מול מודל חוט לכל לקוח",
    content: `<p><b>הבעיה במודל חוט לכל לקוח (Thread-per-client):</b> הקצאת חוט לכל חיבור גורמת לתקורה עצומה בהקצאת מחסניות ובהחלפות הקשר (Context Switches). תוקף יכול לפתוח אלפי חיבורים סרק (Slowloris / DoS) ולהפיל את השרת עקב מחסור במשאבי זיכרון.</p>
<p><b>הפתרון: תבנית Reactor וריבוב קלט/פלט (I/O Multiplexing):</b></p>
<ul>
  <li>שימוש במודול <code>selectors</code> בפייתון (או <code>select</code>/<code>epoll</code> ב-C++).</li>
  <li>חוט יחיד או מאגר חוטים מצומצם רושם עניין באירועים (קריאה/כתיבה) על פני אלפי שקעים במקביל.</li>
  <li>השרת ישן בתוך <code>sel.select()</code> ומתעורר אך ורק כאשר יש מידע מוכן לקריאה, ומנתב את הטיפול לפונקציית Callback מתאימה.</li>
  <li><b>בקרות הגנה חיוניות:</b> הגדרת זמני קצוב (Timeouts) לחיבורים רדומים, הגבלת קצב בקשות (Rate Limiting), ותקרת חיבורים מקסימלית.</li>
</ul>`
  },
  {
    unit: "5",
    title: "צ'יט-שיט מבחן: הצפנה היברידית (TLS), קריפטוגרפיה פוסט־קוונטית (PQC) ואיומי שור/גרובר",
    content: `<p><b>הצפנה היברידית (TLS/HTTPS):</b> שילוב בין אסימטרי לסימטרי. בשלב הלחיצה הראשונית (Handshake) משתמשים בהצפנה אסימטרית (RSA / ECDH) לאימות תעודת השרת (CA) ולהסכמה על מפתח סודי ארעי (Session Key). מיד לאחר מכן עוברים להצפנה סימטרית מהירה (AES-GCM) להעברת כל תוכן הנתונים.</p>
<p><b>איומי מחשוב קוונטי ו־PQC:</b></p>
<ul>
  <li><b>אלגוריתם שור (Shor):</b> פותר פירוק לגורמים ראשוניים ולוגריתם בדיד בזמן פולינומי. מפצח לחלוטין את כל ההצפנה האסימטרית הקלאסית: <b>RSA, Diffie-Hellman, ECC</b>!</li>
  <li><b>אלגוריתם גרובר (Grover):</b> מאיץ חיפוש ממצה ומוציא שורש ממרחב המפתחות הסימטריים. מפחית את חוזק AES-128 ל־64 סיביות (אינו מספק). פתרון: הגדלת מפתחות סימטריים ל־<b>AES-256</b> (המספק 128 סיביות הגנה קוונטית).</li>
  <li><b>איום Harvest Now, Decrypt Later:</b> תוקפים אוגרים תעבורה מוצפנת כיום לפענוח עתידי במחשב קוונטי.</li>
  <li><b>תקני NIST PQC:</b> Crystals-Kyber (ML-KEM) למפתחות; Crystals-Dilithium ו־SPHINCS+ לחתימות.</li>
</ul>
<p><b>מתקפת שידור חוזר (Replay):</b> שידור מחדש של הודעה אותנטית שנקלטה בעבר. <i>אפחות:</i> שילוב מספר חד־פעמי (Nonce), חותמת זמן (Timestamp), ומוני רצף בצד המקבל.</p>`
  },
  {
    unit: "6",
    title: "צ'יט-שיט מבחן: מכונות וירטואליות (VM) מול קונטיינרים (Containers) — מבחן 2025ג",
    content: `<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr style="background:#f2f2f2;">
    <th>מאפיין</th>
    <th>מכונה וירטואלית (VM)</th>
    <th>קונטיינר (Container / Docker)</th>
  </tr>
  <tr>
    <td><b>רמת הווירטואליזציה</b></td>
    <td>חומרה מלאה מעל Hypervisor (סוג 1 או 2)</td>
    <td>מערכת הפעלה מעל Namespaces ו־cgroups</td>
  </tr>
  <tr>
    <td><b>ליבת מערכת הפעלה (Kernel)</b></td>
    <td><b>ליבה נפרדת ועצמאית</b> לכל VM</td>
    <td><b>ליבה משותפת</b> של השרת המארח לכולם!</td>
  </tr>
  <tr>
    <td><b>רמת בידוד</b></td>
    <td>בידוד חזק במיוחד מבוסס חומרה (VM Escape נדיר)</td>
    <td>בידוד תהליכים לוגי (באג ליבה = בריחה מכל הקונטיינרים)</td>
  </tr>
  <tr>
    <td><b>זמן עליה ומשאבים</b></td>
    <td>איטי (דקות), צורך גיגה־בייטים של RAM</td>
    <td>מהיר ביותר (שניות), צורך מגה־בייטים בודדים</td>
  </tr>
  <tr>
    <td><b>הכרעת מבחן 2025ג</b></td>
    <td><b>מתי נבחר ב־VM:</b> להרצת קוד זר שאינו מהימן כלל, להפרדת דיירים רגישים בענן, או כשנדרשת ליבה שונה (Windows על Linux).</td>
    <td><b>מתי נבחר ב־Container:</b> לפריסה מהירה של מיקרו־שירותים פנימיים מהימנים, חסכון במשאבים, וסביבות פיתוח וטסטים.</td>
  </tr>
</table>`
  },
  {
    unit: "6",
    title: "צ'יט-שיט מבחן: תכנון ארגז חול (Sandbox) להרצת קוד זר ומהדר מקוון — מבחן 2021א",
    content: `<p><b>הסכנות בהרצת קוד לקוח (exec / קומפילציה):</b> הרצת קוד שרירותי (RCE), גניבת סודות מתוך <code>os.environ</code>, מחיקת קבצים, פתיחת סוקטים לתקיפת הרשת הפנימית, ו־DoS ע״י לולאות אינסופיות או פצצת מזלג (Fork Bomb).</p>
<p><b>חמשת עקרונות המימוש של ארגז חול דפנסיבי:</b></p>
<ol>
  <li><b>משתמש נטול הרשאות:</b> הרצת תהליך הלקוח תחת משתמש מוגבל (כגון <code>nobody</code>) ללא הרשאות מנהל.</li>
  <li><b>מערכת קבצים מבודדת:</b> שימוש ב־<code>chroot</code> או Mount Namespace עם מערכת קבצים לקריאה בלבד (Read-only root), וספרייה זמנית זעירה.</li>
  <li><b>סינון קריאות מערכת (Syscalls):</b> שימוש ב־<code>seccomp</code> לחסימת קריאות מסוכנות (<code>socket</code>, <code>fork</code>, <code>execve</code>, <code>ptrace</code>).</li>
  <li><b>מכסות משאבים קשיחות:</b> הגבלת זמן CPU (שעון מעורר/Timeout), תקרת זיכרון RAM, והגבלת מספר תהליכים ע״י <code>cgroups</code> ו־<code>setrlimit</code>.</li>
  <li><b>בידוד רשת מוחלט:</b> ניתוק ממשקי הרשת למניעת כל תקשורת פנימית או חיצונית.</li>
</ol>
<p><b>מה נשאר כבעיה במבחן ("אילו בעיות נשארות?"):</b> חולשות יום־אפס בליבת מערכת ההפעלה, ערוצים צדדיים (Side-Channel — מדידת זמני ביצוע וצריכת זיכרון), ובאגים במנגנון הבקר עצמו.</p>`
  },
  {
    unit: "6",
    title: "מה למרקר במדריך: מדיניות המוצא הזהה (SOP) וההבדל המהותי בין XSS ל-CSRF",
    content: `<p><b>Same-Origin Policy (SOP):</b> מוצא מוגדר ע״י <code>(scheme, host, port)</code>. הדפדפן מונע מסקריפט במוצא אחד לקרוא תוכן DOM, עוגיות או תשובות רשת ממוצא אחר. <b>שימו לב:</b> ה־SOP אינו מונע שליחת בקשות כותבות (כגון טופס POST)!</p>
<ul>
  <li><b>XSS (Cross-Site Scripting):</b> התוקף <b>מזריק סקריפט JavaScript זדוני</b> לתוך הדף של הקורבן. הסקריפט רץ בהקשר המוצא הלגיטימי ולכן <b>עוקף את ה־SOP</b> לחלוטין ויכול לקרוא עוגיות או לבצע פעולות בשם המשתמש.
    <br><i>מניעה:</i> קידוד פלט מותאם־הקשר (Context-aware escaping), עוגיות עם דגל <code>HttpOnly</code>, ומדיניות אבטחת תוכן (CSP).</li>
  <li><b>CSRF (Cross-Site Request Forgery):</b> התוקף <b>אינו מזריק סקריפט לאתר המותקף</b>, אלא מפתה את הקורבן להיכנס לאתר זדוני השולח בקשה משנת־מצב אל אתר היעד. הדפדפן מצרף אוטומטית את העוגיות. התוקף אינו רואה את התשובה (כי ה־SOP חוסם קריאה), אך הפעולה כבר בוצעה!
    <br><i>מניעה:</i> אסימוני אנטי־CSRF סודיים (Synchronizer Tokens), עוגיות <code>SameSite=Strict/Lax</code>, ובדיקת כותרות <code>Origin</code>/<code>Referer</code>.</li>
</ul>`
  },
  {
    unit: "6",
    title: "מלכודת מבחן: ניהול מושב, אבטחת עוגיות (HttpOnly, Secure, SameSite) ו-Web 2.0",
    content: `<p><b>עוגיות וניהול מושב (Session Management):</b> HTTP הוא פרוטוקול חסר מצב (Stateless). מזהה המושב (Session ID) בעוגיה מגדיר את זהות המשתמש מול השרת. לעולם אין לשמור בעוגיה שדות הרשאה שניתנים לעריכה כגון <code>role=admin</code>!</p>
<p><b>שלושת דגלי החובה במבחן לכל עוגיית מושב:</b></p>
<ol>
  <li><code>HttpOnly</code>: מונע מסקריפטים (JavaScript דרך <code>document.cookie</code>) לקרוא את העוגיה. <b>מסכל גניבת מושב בעת פרצת XSS!</b></li>
  <li><code>Secure</code>: מבטיח שהעוגיה תישלח אך ורק בחיבור HTTPS מוצפן. <b>מסכל האזנה בציתות רשת (MITM / Sniffing)!</b></li>
  <li><code>SameSite=Strict</code> (או <code>Lax</code>): מורה לדפדפן לא לשלוח את העוגיה בבקשות שמקורן באתר אחר. <b>מסכל מתקפות CSRF!</b></li>
</ol>
<p><b>Web 2.0:</b> תכנים המועלים ע״י משתמשים (תגובות, פרופילים) מהווים גבול אמון מרכזי ומשטח תקיפה פורה ל־Stored XSS והעלאת קבצים זדוניים.</p>`
  },
  {
    unit: "6",
    title: "מה למרקר במדריך: מודלי שירות בענן (IaaS, PaaS, SaaS, FaaS) ומודל האחריות המשותפת",
    content: `<ul>
  <li><b>IaaS (Infrastructure as a Service - כגון EC2):</b> תשתית חומרה וירטואלית. הספק אחראי על החומרה וההיפרוויזר; הלקוח אחראי על מערכת ההפעלה, טלאי אבטחה, סביבת זמן ריצה והאפליקציה.</li>
  <li><b>PaaS (Platform as a Service - כגון App Engine):</b> פלטפורמת פיתוח והרצה מנוהלת. הספק אחראי על החומרה, מערכת ההפעלה והשרתים; הלקוח אחראי על קוד היישום והנתונים.</li>
  <li><b>FaaS / Serverless (כגון AWS Lambda):</b> פונקציות מונעות־אירועים. סקיילינג אוטומטי מ־0; תשלום לפי מילי־שניות ביצוע. סיכונים: הרשאות יתר בתפקידי IAM והזרקת אירועים.</li>
  <li><b>SaaS (Software as a Service - כגון Gmail, Office 365):</b> תוכנה מוגמרת. הספק מנהל את כל השכבות; הלקוח מנהל משתמשים והרשאות.</li>
  <li><b>עקרון האחריות המשותפת במבחן:</b> שום מודל ענן אינו פוטר את המפתח מאבטחת הקוד שלו! באגים באפליקציה, פרצות SQL Injection, כשלי הרשאות או דליפת מפתחות API הם תמיד באחריות הבלעדית של הלקוח.</li>
</ul>`
  },
  {
    unit: "6",
    title: "טיפ מבחן: רשת עמוקה (Deep Web) מול Tor, ומגבלות צומת היציאה (Exit Node)",
    content: `<ul>
  <li><b>הרשת העמוקה (Deep Web):</b> כלל התכנים ברשת שאינם מאונדקסים ע״י מנועי חיפוש ציבוריים (Google), כגון מסדי נתונים פנימיים, פורטלים סגורים, תיבות מייל ורשתות ארגוניות. זהו מונח טכני ניטרלי לחלוטין ואינו מעיד על פשיעה.</li>
  <li><b>רשת Tor:</b> רשת ניתוב אנונימית המעבירה תעבורה דרך 3 צמתים אקראיים (Guard, Middle, Exit Node) תוך הצפנת שכבות (בצל).</li>
  <li><b>מלכודת מבחן קריטית — מגבלת צומת היציאה:</b>
    <br>Tor מספק אנונימיות במסלול בלבד (מסתיר מיהו השולח), אך <b>אינו מחליף הצפנת TLS!</b>
    <br>צומת היציאה (Exit Node) מפענח את שכבת ההצפנה האחרונה ושולח את המידע לשרת היעד. אם החיבור אינו מוצפן ב־HTTPS, מפעיל צומת היציאה יכול לרחרח (Sniff) סיסמאות, עוגיות ותוכן מלא העובר בגלוי!</li>
</ul>`
  },
  {
    unit: "7",
    title: "מה למרקר במדריך: תת-השפות של SQL (DQL, DML, DDL, DCL) והשפעתן על יעדי CIA",
    content: `<table border="1" cellpadding="5" style="border-collapse:collapse; width:100%;">
  <tr style="background:#f2f2f2;">
    <th>תת-שפה</th>
    <th>פקודות מרכזיות</th>
    <th>יעד האבטחה (CIA) שנפגע בהזרקה</th>
  </tr>
  <tr>
    <td><b>DQL (Data Query)</b></td>
    <td><code>SELECT</code></td>
    <td><b>סודיות (Confidentiality):</b> שליפת נתונים רגישים, סיסמאות וכרטיסי אשראי ע״י תוקף בלתי מורשה.</td>
  </tr>
  <tr>
    <td><b>DML (Data Manipulation)</b></td>
    <td><code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></td>
    <td><b>שלמות (Integrity) וזמינות (Availability):</b> שינוי בלתי מורשה של נתונים (שינוי ציונים) או מחיקת שורות.</td>
  </tr>
  <tr>
    <td><b>DDL (Data Definition)</b></td>
    <td><code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>TRUNCATE</code></td>
    <td><b>זמינות ושלמות:</b> הריסת מבנה הסכימה, מחיקת טבלאות שלמות והשבתת בסיס הנתונים.</td>
  </tr>
  <tr>
    <td><b>DCL (Data Control)</b></td>
    <td><code>GRANT</code>, <code>REVOKE</code></td>
    <td><b>בקרת גישה:</b> הסלמת הרשאות ומתן גישת מנהל (DBA) לתוקף.</td>
  </tr>
</table>
<p><b>מפתחות:</b> <i>Primary Key</i> — מזהה ייחודי של שורה, לעולם אינו NULL; <i>Foreign Key</i> — שדה המקשר למפתח ראשי בטבלה אחרת ואוכף שלמות קשרים (Referential Integrity).</p>`
  },
  {
    unit: "7",
    title: "מלכודת מבחן ענקית ב-C API של SQLite: אינדקס 1-based ב-Bind מול 0-based ב-Column",
    content: `<p><b>בחינות C++ רבות בודקות בדיוק את האינדוקס של הפונקציות ב-SQLite C API:</b></p>
<pre class="code" dir="ltr"><code>sqlite3_stmt* stmt;
// 1. קומפילציית השאילתה מראש:
sqlite3_prepare_v2(db, "SELECT Name, Score FROM Students WHERE Id = ?", -1, &stmt, nullptr);

// 2. קשירת ערך לפרמטר (?) - שים לב: האינדקס מתחיל מ-1!
sqlite3_bind_int(stmt, 1, student_id); // מלכודת: אם תכתוב 0, תקבל שגיאת SQLITE_RANGE!

// 3. צעידה לשורה הבאה:
if (sqlite3_step(stmt) == SQLITE_ROW) {
    // 4. שליפת עמודות - שים לב: אינדקס העמודה מתחיל מ-0!
    const unsigned char* name = sqlite3_column_text(stmt, 0); // עמודה ראשונה: Name
    int score = sqlite3_column_int(stmt, 1);                  // עמודה שנייה: Score
    std::cout << name << ": " << score << std::endl;
}

// 5. חובה לשחרר את ה-statement למניעת דליפת זיכרון:
sqlite3_finalize(stmt);</code></pre>
<ul>
  <li><b>כלל הברזל לבחינה:</b> בקשירה (<code>sqlite3_bind_*</code>) האינדקס מתחיל מ־<b>1</b>; בשליפה (<code>sqlite3_column_*</code>) האינדקס מתחיל מ־<b>0</b>!</li>
  <li><b>פונקציית <code>sqlite3_exec()</code>:</b> מתאימה להרצת פקודות DDL סטטיות בלבד (כמו <code>CREATE TABLE</code> קבוע), ואין להשתמש בה לעולם עם קלט משתמש.</li>
</ul>`
  },
  {
    unit: "7",
    title: "צ'יט-שיט מבחן: SQLite בפייתון — שאילתות פרמטריות, טופל פסיק (val,) ו-commit",
    content: `<p><b>תבנית העבודה התקנית בפייתון:</b></p>
<pre class="code" dir="ltr"><code>import sqlite3

try:
    conn = sqlite3.connect("students.db")
    cursor = conn.cursor()
    
    # יצירת טבלה:
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Students (
            Id INTEGER PRIMARY KEY,
            Name TEXT NOT NULL,
            Score INTEGER
        )
    ''')
    
    # הכנסת נתונים עם שאילתה פרמטרית:
    sid = 123
    name = "Tomer"
    score = 95
    # מלכודת פייתון: בטאפל של פרמטר בודד חובה פסיק: (sid,)
    cursor.execute("INSERT INTO Students VALUES (?, ?, ?)", (sid, name, score))
    
    # חובה commit על פעולות DML (INSERT/UPDATE/DELETE) כדי לקבע בדיסק!
    conn.commit()
    
    # שליפה פרמטרית:
    cursor.execute("SELECT Name, Score FROM Students WHERE Id = ?", (sid,))
    row = cursor.fetchone()
    if row:
        print(f"Name: {row[0]}, Score: {row[1]}")

except sqlite3.Error as e:
    print("Database error:", e)
finally:
    if conn:
        conn.close()</code></pre>`
  },
  {
    unit: "7",
    title: "מלכודת מבחן עליונה: מצייני מקום (?) לא עובדים על שמות טבלאות ועמודות (Identifiers) — חובת Whitelist",
    content: `<p><b>מוקש הבחינה המתוחכם ביותר:</b> מצייני מקום (<code>?</code>) בשאילתות פרמטריות נתמכים עבור <b>ערכי נתונים (Data Literals) בלבד</b>!</p>
<p><b>מה קורה אם מנסים להשתמש ב־? עבור שם עמודה או טבלה?</b></p>
<pre class="code" dir="ltr"><code># שגיאה! תחביר בלתי חוקי שיזרוק OperationalError או יתפרש כמחרוזת קבועה:
cursor.execute("SELECT * FROM Users ORDER BY ?", (sort_column,))</code></pre>
<p><b>הפתרון הדפנסיבי התקני במבחן — רשימה לבנה קשיחה (Strict Whitelist):</b></p>
<pre class="code" dir="ltr"><code>ALLOWED_SORT_COLUMNS = {
    "name": "Name",
    "score": "Score",
    "date": "RegistrationDate"
}

user_input = request.args.get("sort_by")
if user_input not in ALLOWED_SORT_COLUMNS:
    raise ValueError("Invalid sorting column")

# כעת ורק כעת בטוח לשרשר את השם המאושר מתוך המילון הפנימי:
safe_column = ALLOWED_SORT_COLUMNS[user_input]
cursor.execute(f"SELECT * FROM Users ORDER BY {safe_column} ASC")</code></pre>`
  },
  {
    unit: "7",
    title: "צ'יט-שיט מבחן: מנגנון הזרקות SQL (SQLi), אשליות f-string/format, וטכניקות מעקף",
    content: `<p><b>מנגנון התקיפה:</b> קלט כמו <code>admin' --</code> או <code>' OR '1'='1</code> פורץ מתוך גבולות הגרש של הליטרל ומזריק תנאי אמת (Tautology) או מבטל את שאר השאילתה ע״י תווי הערה (<code>--</code>).</p>
<ul>
  <li><b>אשליית ה־f-string:</b> כתיבה של <code>f"SELECT * FROM users WHERE user='{uname}'"</code> היא אסון אבטחתי! פייתון מפענחת את המחרוזת <i>לפני</i> שהיא מועברת למסד הנתונים, ולכן מפרסר ה־SQL רואה את תווי התוקף כהוראות תחביר לכל דבר.</li>
  <li><b>כשלי מילוט תווים (Escaping) ורשימות שחורות (Blacklists):</b> ניסיון להחליף גרשים (<code>replace("'", "''")</code>) נכשל לחלוטין מול הזרקות מספריות:
    <br><code>SELECT * FROM users WHERE id = 1 OR 1=1</code> (אין צורך בגרש כלל!).</li>
  <li><b>הגנה מוחלטת:</b> שאילתות פרמטריות (Prepared Statements) הן קו ההגנה היחיד שמפריד באופן מוחלט בין קוד ה־SQL לבין הנתונים.</li>
</ul>`
  },
  {
    unit: "7",
    title: "מה למרקר במדריך: עקרונות Clean Code באבטחה — SOLID, KISS, DRY וחוק קרניגן",
    content: `<ul>
  <li><b>KISS (Keep It Simple, Stupid):</b> פשטות וקריאות. קוד פשוט קל לתחזק ולבדוק בביקורת אבטחה.
    <br><b>חוק קרניגן (Kernighan's Law):</b> "ניפוי שגיאות (Debugging) קשה פי שניים מכתיבת הקוד מלכתחילה. לכן, אם אתם כותבים את הקוד בצורה הכי מתוחכמת שאתם יכולים, לפי ההגדרה אינכם חכמים מספיק כדי לנפות ממנו שגיאות".</li>
  <li><b>DRY (Don't Repeat Yourself):</b> מניעת שכפול קוד. שכפול שאילתות או בדיקות אבטחה גורר באגים כשמתקנים באג במקום אחד ושוכחים מקום אחר.</li>
  <li><b>עקרון האחריות היחידה (SRP):</b> מחלקה צריכה לעסוק בנושא אחד בלבד.
    <br><i>שאלת מבחן קלאסית:</i> מחלקה שגם מתחברת לשקע תקשורת, גם מחשבת מחיר וגם בונה דף HTML — מפרה את SRP לחלוטין! חובה להפריד לשלוש מחלקות נפרדות.</li>
  <li><b>שייום והעלמת מספרי קסם:</b> החלפת ערכים קבועים מסתוריים בקבועים בעלי שם מפורש (כגון <code>MAX_LOGIN_ATTEMPTS = 3</code>).</li>
  <li><b>הערות מסבירות (Why, Not What):</b> תיעוד הרציונל והשיקול הביטחוני, ולא פעולות תחביר ברורות מאליהן.</li>
</ul>`
  },
  {
    unit: "7",
    title: "צ'יט-שיט מבחן: פירוק קוד חץ (Arrow Anti-Pattern) בעזרת תנאי שמירה (Guard Clauses)",
    content: `<p><b>קוד חץ (Arrow Code):</b> קינון עמוק ומסורבל של תנאי <code>if</code> המקשה על הקריאה ומסתיר כשלי אבטחה.</p>
<pre class="code" dir="ltr"><code># קוד חץ מסורבל (Bad):
def transfer_funds(sender, receiver, amount):
    if sender is not None:
        if receiver is not None:
            if amount > 0:
                if sender.balance >= amount:
                    sender.balance -= amount
                    receiver.balance += amount
                    return True
    return False

# פירוק באמצעות תנאי שמירה ויציאה מוקדמת (Guard Clauses - Clean & Safe):
def transfer_funds_clean(sender, receiver, amount):
    if sender is None or receiver is None:
        return False
    if amount <= 0:
        return False
    if sender.balance < amount:
        return False
        
    # הנתיב הראשי נשאר שטוח, נקי וקריא לחלוטין ללא הזחות מיותרות!
    sender.balance -= amount
    receiver.balance += amount
    return True</code></pre>`
  },
  {
    unit: "7",
    title: "טיפ מבחן: קריאת קבצים והזנה בטוחה ל-SQLite ללא כפילויות (executemany / INSERT OR IGNORE)",
    content: `<p><b>שאלת מבחן שחוזרת תכופות:</b> קריאת קובץ נתונים (CSV או טקסט) והזנת הרשומות ל־SQLite ללא כפילויות וללא פגיעה בביצועים:</p>
<pre class="code" dir="ltr"><code>import sqlite3

def load_data_safely(db_path, csv_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # מפתח ראשי מונע כפילויות ברמת הסכימה:
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Users (
            UserId INTEGER PRIMARY KEY,
            Username TEXT NOT NULL
        )
    ''')
    
    rows_to_insert = []
    with open(csv_path, "r", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split(",")
            if len(parts) == 2:
                uid, uname = int(parts[0]), parts[1]
                rows_to_insert.append((uid, uname))
                
    # שימוש ב-INSERT OR IGNORE למניעת קריסה על כפילויות של Primary Key:
    # שימוש ב-executemany בתוך טרנזקציה יחידה לביצועים מרביים:
    cursor.executemany("INSERT OR IGNORE INTO Users VALUES (?, ?)", rows_to_insert)
    conn.commit()
    conn.close()</code></pre>`
  }
];
