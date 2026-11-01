window.SUMMARY_PROSE = [
{
    unit: "1",
    title: "יחידה 1 · מבוא לתכנות דפנסיבי וביקורת אבטחה",
    intro: "תמצית ממוקדת לרענון מהיר לפני מבחן: מושגי היסוד, משולש ה-CIA, סיווג חולשות, יחסי אמון, עקרונות תכנון דפנסיבי, מידול איומים (STRIDE, DREAD, עץ איומים), ביקורת אבטחה מול QA, ואיומי מערכת.",
    parts: [
      {
        id: "names",
        title: "שמות לבעיות: באג, חולשה, ניצול ואפחות",
        html: `
          <ul>
            <li><strong>באג (Bug):</strong> שגיאה לוגית או פונקציונלית ביחס למפרט התוכנה. אינו בהכרח בעל השלכות אבטחה.</li>
            <li><strong>חולשת אבטחה (Vulnerability):</strong> פגם בתכנון, במימוש או בתפעול המאפשר פגיעה במדיניות האבטחה (CIA). <em>כלל ברזל: כל חולשה היא באג, אך לא כל באג הוא חולשה.</em> קיימת במערכת גם אם איש טרם גילה או ניצל אותה.</li>
            <li><strong>ניצול חולשה (Exploit):</strong> הפעולה הזדונית או הקוד/מטען (Payload) המפיקים תועלת מהחולשה בפועל כדי להשיג גישה או שליטה.</li>
            <li><strong>אפחות (Mitigation):</strong> שכבת הגנה הנדסית לצמצום הנזק והסיכון מניצול חולשה (למשל Canary, ASLR, Least Privilege). <em>אינה מבטיחה הסרה של הבאג מהשורש.</em></li>
            <li><strong>אבטחה מול אמינות ופרטיות:</strong> <strong>אבטחה</strong> מתמודדת עם יריב אקטיבי בעל כוונת זדון; <strong>אמינות</strong> מבטיחה פעולה רציפה ללא תקלות וקריסות; <strong>פרטיות</strong> עוסקת בשליטת משתמשים על המידע האישי שלהם.</li>
            <li><strong>סביבת ריצה (Runtime):</strong> קוד תלוי במערכת הפעלה, חומרה וספריות; שינוי קונפיגורציה עלול להפוך קוד בטוח לחשוף.</li>
          </ul>
        `
      },
      {
        id: "cia",
        title: "משולש ה-CIA ואמצעי אפחות ייעודיים",
        html: `
          <ul>
            <li><strong>סודיות (Confidentiality &ndash; C):</strong> מניעת צפייה או חשיפה של מידע ללא הרשאה.
              <br>&bull; <em>אפחות:</em> הצפנה חזקה במנוחה (AES) ובתנועה (TLS), בקרת גישה, הרשאת מינימום.</li>
            <li><strong>שלמות (Integrity &ndash; I):</strong> מניעת שינוי, השחתה, הזרקה או דריסה של קוד או נתונים.
              <br>&bull; <em>אפחות:</em> חתימות דיגיטליות, קודי גיבוב (SHA-256, HMAC), בקרת גבולות זיכרון, הרשאות כתיבה צרות.</li>
            <li><strong>זמינות (Availability &ndash; A):</strong> הבטחת נגישות השירות והמשאבים למשתמשים מורשים בכל עת.
              <br>&bull; <em>אפחות:</em> יתירות (Redundancy), הגבלת קצב (Rate Limiting), Timeouts לחיבורים, עמידות ב-DoS.</li>
            <li><strong>עקרון האי-תלות:</strong> היעדים אינם תלויים זה בזה &ndash; מערכת יכולה להיות זמינה ב-100% בעוד כל המידע בה נגנב (פגיעה בסודיות), או לקרוס לחלוטין מבלי שדלף מידע (פגיעה בזמינות).</li>
            <li><strong>פגיעה משולבת באירוע אחד:</strong> אף שהיעדים נפרדים, אירוע אחד כגון הרצת קוד יכול לפגוע בסודיות, בשלמות ובזמינות יחד. אפחות של יעד אחד אינה מכסה את שני האחרים.</li>
          </ul>
        `
      },
      {
        id: "kinds",
        title: "סיווג חולשות: עיצוב, מימוש, תפעול ושטחים אפורים",
        html: `
          <ul>
            <li><strong>חולשת עיצוב (Design):</strong> פגם במפרט, בארכיטקטורה או בפרוטוקול. הקוד נכתב ללא שגיאות ותואם במדויק לדרישות, אך המודל פרוץ מיסודו (דוגמה קלאסית: Telnet או HTTP המעבירים סיסמאות בטקסט גלוי; הסתמכות עיוורת על בדיקות בצד הלקוח).</li>
            <li><strong>חולשת מימוש (Implementation):</strong> פגם שנוצר בשלב כתיבת הקוד. התכנון תקין אך המתכנת שגה במימוש (דוגמה: שימוש ב-<code>gets()</code>, שגיאת Off-by-One, חוסר בדיקת גבולות מערך, Use-After-Free).</li>
            <li><strong>חולשה תפעולית (Operational):</strong> פגם בסביבת הפריסה, בתחזוקה או בגורם האנושי (דוגמה: סיסמת ברירת מחדל admin/admin, אי-התקנת טלאי אבטחה לחולשת 1-Day, נפילה בפישינג).</li>
            <li><strong>שטחים אפורים (Gray Areas):</strong> הודעות שגיאה מפורטות מדי או מדיניות סיסמאות חלשה &ndash; הסיווג תלוי במקור הפגם (האם הוגדר כך באפיון, מומש כך בקוד, או הופעל בהגדרות שרת). הודעה אחידה למשתמש מונעת מניית משתמשים (User Enumeration) ופירוט נשאר בלוג פנימי; אם האפיון דרש הודעה מפורטת זה פגם עיצוב, ואם הקוד בחר כך זה מימוש.</li>
          </ul>
        `
      },
      {
        id: "quality",
        title: "נכונות, יעילות וגמישות מול אבטחה",
        html: `
          <ul>
            <li><strong>נכונות (Correctness) מול אבטחה:</strong> תוכנה יכולה להיות נכונה ב-100% עבור קלטים תקינים אך לקרוס או להותיר מפתח הצפנה בזיכרון תחת קלט זדוני.</li>
            <li><strong>יעילות (Efficiency) מול אבטחה:</strong> אסור שאופטימיזציה תבוא על חשבון אבטחה בגבולות אמון (אסור לדלג על אימות קלט כדי לחסוך זמן מעבד, ואסור לאפשר Dead Store Elimination שמוחקת איפוס סיסמאות).</li>
            <li><strong>גמישות (Flexibility) מול אבטחה:</strong> גמישות יתר (כגון תמיכה בהרצת פקודות דינמיות או פלאגינים ללא אימות) מרחיבה את משטח התקיפה ומסכנת את המערכת.</li>
          </ul>
        `
      },
      {
        id: "trust",
        title: "יחסי אמון, גבולות אמון ושרשרת אמון",
        html: `
          <ul>
            <li><strong>גבול אמון (Trust Boundary):</strong> הממשק המפריד בין רכיבים בעלי רמות אמון שונות. <em>חוק ברזל: כל נתון שחוצה גבול אמון חייב לעבור אימות מלא (טיפוס, אורך, טווח וסינון) אצל הרכיב המקבל!</em></li>
            <li><strong>שרשרת אמון (Trust Chain):</strong> אמון הוא טרנזיטיבי (A סומך על B ו-B על C &rArr; A סומך על C). פריצה לרכיב בודד (כגון רשות תעודות CA מזויפת המאפשרת MITM) מפילה את כל שרשרת האמון.</li>
            <li><strong>Windows 98 מול מודרני:</strong> ב-Win98 לא הייתה הפרדת זיכרון וכל תוכנית יכלה לכתוב לקרנל; במערכות מודרניות מיושם בידוד חומרתי קשיח בין תהליכים ובין User ל-Kernel.</li>
            <li><strong>יחס אמון (Trust Relationship) מול אמון מלא (Complete Trust):</strong> ביחס אמון רכיב סומך על רכיב אחר לפעולה מסוימת. באמון מלא ניתנת גישה בלי בדיקה נוספת, ולכן פריצת הרכיב שעליו סומכים מעבירה שליטה. מצמצמים אמון מלא לרכיב שבאמת בשליטה, ובגבול אמון בודקים מחדש.</li>
            <li><strong>סמכות סרטיפיקטים (Certificate Authority):</strong> גורם שחותם על תעודות, והלקוח סומך על החתימה כדי לזהות שרת. פריצה לסמכות מאפשרת לחתום תעודה מזויפת ולהתחזות לשרת; זהות כל שרת שהיא אישרה תלויה בשלמותה.</li>
          </ul>
        `
      },
      {
        id: "cc",
        title: "צמידות, לכידות, הרשאת מינימום ותרשים מחלקות UML",
        html: `
          <ul>
            <li><strong>לכידות גבוהה (High Cohesion):</strong> אחריות מוגדרת ויחידה לכל רכיב &bull; מונעת מחלקות ענק בעלות עודף הרשאות.</li>
            <li><strong>צמידות חלשה (Low Coupling):</strong> תלות מינימלית בין מודולים דרך ממשקים צרים &bull; מבודדת נזק במקרה פריצה (Blast Radius).</li>
            <li><strong>הרשאת מינימום (Least Privilege):</strong> מתן הרשאות חיוניות בלבד לכל תהליך (שירות לוג לא ירוץ כ-root).</li>
            <li><strong>תרשים מחלקות UML:</strong> <code>+</code> Public, <code>-</code> Private, <code>#</code> Protected. קשרים: ירושה (משולש חלול, is-a), הרכבה (מעוין מלא, תלות חיים בלעדית), צבירה (מעוין ריק), תלות (חץ מקווקו), <code>friend</code> (שובר כימוס ומגדיל צמידות).</li>
            <li><strong>מלכודת סדר ממשק:</strong> מתודות בדיקה וביצוע חייבות להיות פרטיות; מתודה ציבורית יחידה תאכוף בדיקה לפני ביצוע.</li>
          </ul>
        `
      },
      {
        id: "review",
        title: "מידול איומים (STRIDE, DREAD), ביקורת אבטחה ועקרונות תכנון",
        html: `
          <ul>
            <li><strong>תרשים DFD:</strong> ממפה ישויות חיצוניות, תהליכים, מאגרי נתונים, וגבולות אמון (קווים מקווקוים).</li>
            <li><strong>מודל STRIDE ומענים:</strong> Spoofing &rarr; Authentication &bull; Tampering &rarr; Integrity &bull; Repudiation &rarr; Non-Repudiation &bull; Info Disclosure &rarr; Confidentiality &bull; DoS &rarr; Availability &bull; Elevation of Privilege &rarr; Authorization.</li>
            <li><strong>עץ איומים (Threat Tree):</strong> שורש = מטרה; ענפים = שיטות; עלים = פעולות תקיפה. עלה בעיגול = מטופל/מוגן; במלבן = נתיב פתוח.</li>
            <li><strong>נוסחת סיכון:</strong> <code>Risk = Probability × Impact</code> (מכפלה).</li>
            <li><strong>מודל DREAD (סולם 1-10):</strong> כל מדד מודד דבר אחר: נזק (Damage), שחזוריות (Reproducibility), ניצול (Exploitability), משתמשים נפגעים (Affected Users), גילוי (Discoverability). הציון הוא הממוצע של חמשת המדדים.</li>
            <li><strong>QA מול ביקורת אבטחה:</strong> QA בודק שהמערכת פועלת כנדרש בקלט תקין (קופסה שחורה); ביקורת אבטחה בודקת מה אסור למערכת לבצע בקלט זדוני (כולל White-box לאיתור כשלי זיכרון ומרוצי זמנים).</li>
            <li><strong>מבחן חדירה (Penetration Test) מול ביקורת קוד (Code Audit):</strong> מבחן חדירה בקופסה שחורה (Black Box) או אפורה (Gray Box) שואל אם תוקף פורץ עכשיו, מתוך מה שנראה מבחוץ או ממידע חלקי. ביקורת קוד בקופסה לבנה (White Box) שואלת אם הקוד נקי, כי רואים את המימוש. פריצה שנכשלה אינה מוכיחה שאין פגם, ובדיקת קוד אינה מדמה תוקף חיצוני.</li>
            <li><strong>5 שדות חובה לממצא ביקורת:</strong> 1. מיקום (Location) &bull; 2. סיווג (Classification) &bull; 3. יעד ה-CIA שנפגע &bull; 4. השפעה ונזק (Impact) &bull; 5. אפחות ותיקון (Mitigation).</li>
            <li><strong>עקרונות תכנון:</strong> Defense in Depth (שכבות הגנה בלתי תלויות) &bull; Least Privilege (מינימום הרשאות) &bull; Fail-Safe Defaults (ברירת מחדל חסומה/Whitelist) &bull; Complete Mediation (אימות בכל פנייה מחדש).</li>
          </ul>
        `
      },
      {
        id: "systemic",
        title: "איומי רכיב מול מערכת, ארגז חול ותבנית Reactor",
        html: `
          <ul>
            <li><strong>איום רכיב (Component-Level):</strong> פגם מקומי בקוד רכיב בודד (כגון קריאה ל-gets).</li>
            <li><strong>איום מערכתי (Systemic):</strong> איום הנובע מחיבור רכיבים תקינים לכאורה (תקשורת לא מוצפנת, הצפת חיבורים, רוגלת מקלדת בסביבה).</li>
            <li><strong>ארגז חול (Sandbox):</strong> בידוד תהליך ברמת מערכת ההפעלה &bull; מגביל קריאות מערכת, כולא נזק אך אינו מתקן את הבאג.</li>
            <li><strong>תבנית Reactor:</strong> לולאת אירועים אחת ב-I/O Multiplexing (select/epoll) במקום Thread-per-Client שקורס ב-DoS &bull; מחייבת הגדרת Timeouts ותקרת חיבורים.</li>
            <li><strong>ערוץ צדדי (Side Channel):</strong> דליפה דרך תופעת לוואי ולא דרך הפלט הרשמי. השוואת סוד שנעצרת מוקדם מגלה בזמן הריצה היכן ההתאמה נכשלה, גם כשהתשובה למשתמש אחידה. האפחות היא השוואה בזמן קבוע (Constant-Time), שאורכה אינו תלוי בתוכן הסוד.</li>
          </ul>
        `
      },
      {
        id: "threats",
        title: "מושגי עולם אמיתי, מאגרי חולשות ודוח מערך הסייבר",
        html: `
          <ul>
            <li><strong>CWE:</strong> סוג הפגם הכללי (Abstract Type, כגון CWE-121).</li>
            <li><strong>CVE:</strong> מזהה ייחודי לפרצה במוצר מסוים (כגון CVE-2021-44228).</li>
            <li><strong>CVSS:</strong> ציון חומרה מספרי מ-0.0 עד 10.0.</li>
            <li><strong>0-Day מול 1-Day:</strong> 0-Day &ndash; חולשה ללא טלאי קיים &bull; 1-Day &ndash; חולשה שפורסם לה טלאי אך המערכת לא עודכנה (וקטור תקיפה מוביל לפי דוח מערך הסייבר הלאומי 2024).</li>
            <li><strong>כופרה (Ransomware):</strong> הצפנת קבצים וסחיטה כפולה &bull; פוגעת בזמינות, בשלמות ובסודיות.</li>
            <li><strong>שרשרת אספקה (Supply Chain):</strong> פגיעה דרך ספק, חבילה או עדכון שנכנסים כרכיב לגיטימי. שונה מחולשה שנכתבה אצלנו: האמון ניתן מראש לספק. לפני שימוש מאמתים את מקור החבילה או העדכון.</li>
            <li><strong>דיוג (Phishing):</strong> הנדסה אנושית שמשכנעת אדם למסור סוד או לבצע פעולה. זה אינו פגם בקוד אלא ניצול של הגורם האנושי, ולכן הרשאת מינימום מגבילה מה חשבון שנפל יכול לעשות.</li>
            <li><strong>מניעת שירות (DoS) מול מניעת שירות מבוזרת (DDoS):</strong> DoS מגיע ממקור אחד; DDoS מרשת נגועה של מקורות רבים. שתיהן פוגעות בזמינות, וחסימת כתובת יחידה אינה עוצרת מתקפה מבוזרת.</li>
          </ul>
        `
      }
    ]
  },
  {
    unit: "2",
    title: "יחידה 2 · שפת C++ כבסיס לתכנות דפנסיבי",
    intro: "תמצית ממוקדת לרענון מהיר לפני מבחן: מודל הזיכרון, תהליך הבנייה, מצביעים והפניות, OOP ופונקציות מיוחדות, כלל השלוש והחמישה, ירושה ומפרק וירטואלי, בעיית היהלום, פולימורפיזם (vtable/vptr), חיתוך אובייקט, חריגות ו-RAII, ו-STL.",
    parts: [
      {
        id: "start",
        title: "נקודת הכניסה main, קלט/פלט, טיפוסים, const והעמסה",
        html: `
          <ul>
            <li><strong>הפונקציה main:</strong> נקודת הכניסה של קוד המשתמש. קוד ה-CRT מופעל לפניה ומריץ בנאים של אובייקטים סטטיים וגלובליים; ביציאה מופעלים המפרקים שלהם. ערך 0 מדווח הצלחה למערכת ההפעלה.</li>
            <li><strong>זרמי קלט/פלט:</strong> <code>cin, cout, cerr</code> (ללא חציצה &ndash; לשגיאות), <code>clog</code>. קלט מ-cin הוא גבול אמון ומחייב אימות טיפוס וטווח.</li>
            <li><strong>מילת המפתח const:</strong> חוזה קומפילציה &bull; מונעת שינוי משתנים, מגנה על אובייקטים בהפניה (<code>const T&</code>), ומתודות const אינן משנות את שדות המחלקה.</li>
            <li><strong>העמסת פונקציות (Overloading):</strong> שם זהה עם רשימת פרמטרים שונה &bull; נפתרת סטטית בקומפילציה &bull; <em>טיפוס ערך החזרה לבדו אינו מספיק להעמסה.</em></li>
            <li><strong>אופרטור טרינרי:</strong> <code>cond ? expr1 : expr2</code> להשמה תלוית תנאי תמציתית.</li>
            <li><strong>נדיף (<code>volatile</code>):</strong> מונע מהמהדר לבטל קריאה או כתיבה מול חומרה או זיכרון שמשתנה מבחוץ. אינו סנכרון בין חוטים; לסנכרון צריך <code>std::atomic</code> או מנעול (lock).</li>
            <li><strong>משתנה מקומי שלא הושם:</strong> קריאה ממנו היא התנהגות לא מוגדרת (Undefined Behavior). המהדר רשאי להניח שהייתה השמה, ולכן חובה לאתחל לפני כל קריאה.</li>
          </ul>
        `
      },
      {
        id: "ptr",
        title: "מצביעים, מערכים גולמיים והפניות (References)",
        html: `
          <ul>
            <li><strong>מצביע (<code>T*</code>):</strong> משתנה המחזיק כתובת זיכרון &bull; <code>&</code> שולף כתובת, <code>*</code> שולף ערך &bull; לאתחל תמיד ל-<code>nullptr</code> (C++11).</li>
            <li><strong>מערכים גולמיים:</strong> רציפים בזיכרון, מתנוונים למצביע &bull; <strong>אין בדיקת גבולות ב-<code>[]</code></strong> &bull; גישה חורגת משחיתה זיכרון שכן ומהווה מקור לגלישות חוצץ.</li>
            <li><strong>הפניה (<code>T&</code>):</strong> כינוי (Alias) קבוע לאובייקט קיים &bull; חובה לאתחל ביצירה, אינה יכולה להיות null, ולא ניתנת לניתוב מחדש.</li>
            <li><strong>העברה לפי ערך (Pass by Value):</strong> ברירת המחדל מעתיקה את הארגומנט, והפונקציה משנה את העותק. הפניה (Reference) משנה את המקור, כי היא כינוי לאותו אובייקט. <code>const T&amp;</code> נמנעת מהעתקה בלי לאפשר שינוי, ומתאימה לקריאת אובייקט גדול.</li>
            <li><strong>מלכודת הפניה/מצביע מתים (Dangling):</strong> החזרת מצביע או הפניה למשתנה מקומי שהוגדר במחסנית &bull; מסגרת הפונקציה נהרסת בסיום והגישה לכתובת היא UB חמור!</li>
            <li><strong>תחביר גישה:</strong> אובייקט בנקודה (<code>obj.f</code>); מצביע בחץ (<code>p->f</code> שווה ל-<code>(*p).f</code>).</li>
          </ul>
        `
      },
      {
        id: "build",
        title: "תהליך הבנייה, מרחבי שמות ופולימורפיזם של זרמים",
        html: `
          <ul>
            <li><strong>ארבעת שלבי הבנייה:</strong>
              1. <em>Preprocessor:</em> החלפות טקסט, <code>#include</code>, מניעת כפילות עם <code>#pragma once</code> או Include Guards &bull;
              2. <em>Compiler:</em> בדיקות טיפוסים, הפקת קובצי <code>.obj</code> וטבלאות vtable &bull;
              3. <em>Linker:</em> פתרון כתובות וחיבור ספריות (שגיאות <code>undefined reference</code>) &bull;
              4. <em>Loader & Runtime.</em>
            </li>
            <li><strong>מרחבי שמות (Namespaces):</strong> מניעת התנגשויות שמות. <strong>איסור מוחלט על <code>using namespace std;</code> בקובצי <code>.h</code></strong> כדי למנוע זיהום שמות של קבצים מכלילים.</li>
            <li><strong>זרמים וניתוח CSV:</strong> <code>std::istream&</code> מקבל פולימורפית קובץ (ifstream), מחרוזת (stringstream) או cin &bull; בנאי העתקה של זרמים מחוק, מועברים תמיד בהפניה &bull; ניתוח CSV בעזרת <code>getline(file, line)</code> ו-<code>getline(ss, token, ',')</code>.</li>
            <li><strong>כלל ההגדרה האחת (ODR):</strong> הגדרה רגילה של פונקציה או משתנה מותרת פעם אחת בתוכנית. הגדרת <code>inline</code> ותבנית (Template) זהות מותרות בכמה יחידות תרגום (Translation Unit), ולכן הן יושבות בכותרת. שתי הגדרות רגילות של אותו שם שוברות את הקישור.</li>
          </ul>
        `
      },
      {
        id: "mem",
        title: "אזורי זיכרון בזמן ריצה, RAII וסכנות ניהול ידני",
        html: `
          <ul>
            <li><strong>ארבעת אזורי הזיכרון:</strong>
              &bull; <em>Text/Code:</em> הוראות מכונה, לקריאה בלבד, קשור ל-DEP/NX &bull;
              &bull; <em>Data/BSS:</em> משתנים גלובליים וסטטיים לכל חיי התוכנית. Data שומר ערכים שאינם אפס; BSS שומר ערכים שמאופסים &bull;
              &bull; <em>Stack:</em> משתנים מקומיים אוטומטיים, מהיר, LIFO, מוגבל בגודלו &bull;
              &bull; <em>Heap:</em> זיכרון דינמי ידני (new/delete), גמיש אך מועד לשגיאות.
            </li>
            <li><strong>עקרון RAII:</strong> קשירת משאב (זיכרון, קובץ, מנעול) לאובייקט במחסנית &bull; הבנאי רוכש, המפרק משחרר אוטומטית ביציאה מתחום או בפריסת מחסנית (Stack Unwinding) עקב חריגה.</li>
            <li><strong>סכנות ניהול ידני:</strong> Memory Leak (אי-שחרור, פוגע בזמינות) &bull; Double Free (שחרור כפול המשחית ערימה) &bull; Use-After-Free (גישה דרך מצביע יתום לאחר שחרור).</li>
            <li><strong>הקצאת מערך:</strong> <span dir="ltr"><code>new T[n]</code> → <code>delete[]</code></span>. <code>delete</code> בלי סוגריים מפעיל מפרק רק לאיבר הראשון ומשחית את הערימה. ערבוב של השניים הוא התנהגות לא מוגדרת (Undefined Behavior).</li>
          </ul>
        `
      },
      {
        id: "oop",
        title: "מחלקות, כימוס, פונקציות מיוחדות וכלל השלוש/החמישה",
        html: `
          <ul>
            <li><strong>כימוס (Encapsulation):</strong> שדות פרטיים ומתודות בקרה ציבוריות. <code>struct</code> ברירת מחדל public; <code>class</code> ברירת מחדל private. מצביע <code>this</code> לאובייקט הנוכחי.</li>
            <li><strong>רמות גישה:</strong> <code>private</code> נגיש למחלקה ול-<code>friend</code> בלבד. <code>protected</code> נגיש גם למחלקות יורשות, ולא לקוד חיצוני. <code>friend</code> הוא היתר גישה נקודתי ואינו ירושה: אין קשר is-a, וההיתר אינו עובר ליורשי החבר.</li>
            <li><strong>בנאי ורשימת אתחול:</strong> בנאי עם פרמטרים מבטל את בנאי ברירת המחדל &bull; רשימת אתחול חובה ל-<code>const</code> והפניות &bull; <em>סדר האתחול נקבע לפי סדר ההכרזה במחלקה ולא לפי סדר הכתיבה ברשימה!</em></li>
            <li><strong>מפרק יחיד:</strong> ללא פרמטרים/העמסה &bull; משחרר משאבים (RAII).</li>
            <li><strong>בנאי העתקה מול אופרטור השמה:</strong> בנאי העתקה יוצר אובייקט חדש (<code>T b = a;</code>); אופרטור השמה פועל על אובייקט קיים (<code>b = a;</code>).</li>
            <li><strong>שלבי אופרטור השמה:</strong> בדיקת השמה עצמית (<code>if (this == &other) return *this;</code>), הקצאת עותק חדש לפני שחרור הישן, והחזרת <code>*this</code>. אפשר גם העתקה-והחלפה (Copy-and-Swap). כך כשל הקצאה אינו משאיר מצביע יתום אחרי שהמשאב הישן כבר שוחרר.</li>
            <li><strong>העתקה רדודה מול עמוקה:</strong> רדודה מעתיקה כתובות וגורמת ל-Double Free &bull; עמוקה מקצה בלוק נפרד בערימה.</li>
            <li><strong>כלל השלוש / החמישה:</strong> צורך באחד מבין מפרק, בנאי העתקה או אופרטור השמה מחייב מימוש של שלושתם! (ב-C++11: כלל החמישה כולל Move Ctor ו-Move Assignment).</li>
            <li><strong><code>=default</code> ו-<code>=delete</code>:</strong> <code>=default</code> מחזיר בנאי ברירת מחדל שנעלם אחרי שהוגדר בנאי אחר. <code>=delete</code> אוסר פעולה, למשל העתקה, והקומפיילר דוחה אותה. מחיקת העתקה מונעת שכפול בעלות על משאב יחיד.</li>
            <li><strong>כלל האפס (Rule of Zero):</strong> מחזיקים את המשאב ב-<code>std::string</code>, ב-<code>std::vector</code> או במצביע חכם, כדי לא לממש את חמש פונקציות הבעלות. זה שונה מכלל החמישה, שבו המחלקה מנהלת זיכרון גולמי וחייבת לממש את כולן.</li>
            <li><strong>העברה (Move):</strong> הפניה <code>&amp;&amp;</code> מעבירה בעלות בלי להעתיק את המשאב. המקור נשאר תקף להריסה, אך ערכו אחרי ההעברה אינו מובטח; מסתמכים עליו רק להשמדה או להשמה מחדש.</li>
          </ul>
        `
      },
      {
        id: "inherit",
        title: "ירושה, LSP, הסתרה מול דריסה, מפרק וירטואלי ובעיית היהלום",
        html: `
          <ul>
            <li><strong>is-a מול has-a:</strong> ירושה ציבורית רק לקשר מהותי של סוג-של; אחרת יש להעדיף הכלה (Composition).</li>
            <li><strong>עקרון ליסקוב (LSP):</strong> נגזרת חייבת לפעול כשורה בכל מקום שבו מצפים לבסיס (ריבוע אינו רשאי לרשת ממלבן).</li>
            <li><strong>הסתרה (Hiding) מול דריסה (Overriding):</strong> ללא virtual באב = הסתרה סטטית לפי טיפוס המצביע; עם virtual באב וחתימה זהה = דריסה פולימורפית דינמית בזמן ריצה (מומלץ override).</li>
            <li><strong>מפרק וירטואלי (Virtual Destructor):</strong> מחיקת אובייקט יורש דרך מצביע אב (<code>delete basePtr</code>) ללא <code>virtual ~Base()</code> מפעילה רק את מפרק האב &ndash; משאבי היורש זולגים (Memory Leak ו-UB)! <em>חובה בכל מחלקה פולימורפית.</em></li>
            <li><strong>סדר בנייה והריסה:</strong> בנייה: אב ואז בן; הריסה: בן ואז אב.</li>
            <li><strong>קריאה ל-virtual בבנאי/מפרק:</strong> מפעילה תמיד את גרסת המחלקה שרצה כעת ולא את הנגזרת (vptr מכוון לאב).</li>
            <li><strong>בעיית היהלום:</strong> ירושה מרובה מאותו אב מייצרת כפילות ועמימות &bull; <em>פתרון:</em> ירושה וירטואלית (<code>virtual public Base</code>).</li>
          </ul>
        `
      },
      {
        id: "poly",
        title: "פולימורפיזם דינמי, Vtable/Vptr וחיתוך אובייקט",
        html: `
          <ul>
            <li><strong>מנגנון vtable ו-vptr:</strong> טבלה סטטית לכל מחלקה פולימורפית עם כתובות פונקציות; vptr הוא שדה מוסתר בראש האובייקט המצביע לטבלה. קריאה וירטואלית מנותבת דרך <code>vptr[offset]</code>.</li>
            <li><strong>מחלקה מופשטת:</strong> מכילה לפחות פונקציה טהורה אחת (<code>virtual void f() = 0;</code>) &bull; אי אפשר ליצור מופע ישיר &bull; חוזה מחייב ליורשים.</li>
            <li><strong>חיתוך אובייקט (Object Slicing):</strong> העברה או השמה לפי ערך (by-value) של נגזרת למשתנה מסוג הבסיס חותכת את שדות הנגזרת ואת ה-vptr ומבטלת פולימורפיזם! &bull; <em>מניעה:</em> העברה תמיד בהפניה (<code>const Base&</code>) או במצביע (<code>Base*</code>).</li>
            <li><strong>מצביע לפונקציה (Function Pointer):</strong> משתנה שמחזיק כתובת של פונקציה, והקריאה דרכו בוחרת את הכתובת בזמן ריצה. אין כאן טבלת מחלקה כמו ב-vptr. דריסת המצביע מפנה את הקריאה ליעד אחר; מאתחלים אותו ליעד ידוע, ואין מאפשרים לקלט לכתוב אליו.</li>
            <li><strong>גלישה אל ה-vptr:</strong> ה-vptr יושב בראש האובייקט, וגלישה בשדה סמוך יכולה לנתב קריאה וירטואלית לטבלה מזויפת. נשברת בחירת המתודה לפי הטיפוס האמיתי. מתגוננים בבדיקת גבולות על השדות הסמוכים; <code>private</code> אינו מחסום בזיכרון.</li>
          </ul>
        `
      },
      {
        id: "ex-tpl",
        title: "חריגות, תבניות, STL ומצביעים חכמים",
        html: `
          <ul>
            <li><strong>חריגות:</strong> <code>try, catch, throw</code>. זריקה לפי ערך, תפיסה לפי הפניה קבועה (<code>const std::exception&</code>) למניעת חיתוך &bull; Stack Unwinding מפעיל מפרקים (RAII). אסור לזרוק חריגה ממפרק!</li>
            <li><strong>מסלול חריגה (Exception):</strong> חריגה עולה במחסנית עד <code>catch</code> תואם. בלי תפיסה נקרא <code>terminate</code> והתוכנית נעצרת. חלוקת שלם באפס היא התנהגות לא מוגדרת (Undefined Behavior) ולא חריגה, ולכן <code>try</code> אינו תופס אותה; בודקים את המחלק לפני החלוקה.</li>
            <li><strong>תבניות (Templates):</strong> קוד גנרי המיוצר בקומפילציה לכל טיפוס מופעל; מוגדרות בקובצי <code>.h</code>.</li>
            <li><strong>מכולות STL:</strong> ב-<code>std::vector</code>: <code>vec[i]</code> אינו בודק גבולות; <code>vec.at(i)</code> בודק וזורק <code>std::out_of_range</code>. איטרטור (Iterator) אינו בהכרח מצביע גולמי. <code>end</code> מסמן את המיקום שאחרי האחרון, ואסור לבטל אליו הפניה (Dereference).</li>
            <li><strong>מצביעים חכמים:</strong> <code>unique_ptr</code> (בעלות בלעדית, אפס תקורה, מועבר ב-move) &bull; <code>shared_ptr</code> (בעלות משותפת עם מונה הפניות) &bull; <code>weak_ptr</code> חסר בעלות ושובר מעגלי תלות. אסור לבנות שני <code>unique_ptr</code> או <code>shared_ptr</code> מאותו מצביע גולמי, כי שניהם ישחררו אותו. גישה דרך <code>weak_ptr</code> רק ב-<code>lock</code>, שמחזיר <code>shared_ptr</code> חי או ריק.</li>
          </ul>
        `
      }
    ]
  },
  {
    unit: "3",
    title: "יחידה 3 · התמודדות עם חולשות אבטחה בשפות C ו־C++",
    intro: "תמצית ממוקדת לרענון מהיר לפני מבחן: מחסנית הקריאות, גלישת חוצץ במחסנית ובערימה, ROP מול Shellcode, דריסת vptr, מנגנוני אפחות (Canary, ASLR, DEP/NX, CET), גלישות מספרים, UAF, מחרוזות פורמט, TOCTOU, וכלי בדיקה.",
    parts: [
      {
        id: "stack",
        title: "מחסנית הקריאות, מסגרת המחסנית ו-Little-Endian",
        html: `
          <ul>
            <li><strong>מבנה המחסנית:</strong> LIFO, גדלה מכתובות גבוהות לנמוכות (ESP קטן ב-push).</li>
            <li><strong>אוגרים מרכזיים:</strong> ESP (ראש המחסנית), EBP (עוגן מסגרת קבוע למשתנים/ארגומנטים), EIP (מצביע הפקודה הבאה לביצוע).</li>
            <li><strong>פקודות call ו-ret:</strong> <code>call</code> דוחפת כתובת חזרה; <code>ret</code> שולפת מראש המחסנית ל-EIP.</li>
            <li><strong>מוסכמות קריאה:</strong> <code>cdecl</code> &ndash; הקורא מנקה מחסנית (תומך ב-printf); <code>stdcall</code> &ndash; הנקרא מנקה בעצמו.</li>
            <li><strong>סדר המסגרת (מגבוה לנמוך):</strong> ארגומנטים &larr; כתובת חזרה <span dir="ltr">(Saved EIP) &rarr; Saved EBP &rarr; Canary</span> &larr; חוצצים ומשתנים מקומיים.</li>
            <li><strong>המלכודת המובנית:</strong> כתיבה במערך מקומי מתקדמת מנמוך לגבוה &ndash; ישירות לעבר כתובת החזרה!</li>
            <li><strong>Little-Endian (x86):</strong> LSB בכתובת הנמוכה. <code>0xC00010FF</code> במערך בתים: <code>FF, 10, 00, C0</code>.</li>
          </ul>
        `
      },
      {
        id: "bof",
        title: "גלישת חוצץ, Off-by-One, הזרקת קוד מול ROP, ודריסת Vptr",
        html: `
          <ul>
            <li><strong>גלישת מחסנית מול מיצוי:</strong> גלישה דורסת כתובות שליטה; מיצוי (רקורסיה עמוקה) פוגע ב-Guard Page וקורס ב-DoS.</li>
            <li><strong>פונקציות מסוכנות:</strong> <code>gets</code> (נמחקה מ-C11, אסורה לחלוטין), <code>strcpy, strcat, sprintf, scanf("%s")</code> ללא בדיקת אורך.
              <br>&bull; <em>חלופות בטוחות:</em> <code>fgets, snprintf, std::string</code>.
              <br>&bull; <em>זהירות עם strncpy:</em> אינה שמה <code>\0</code> אם הקלט באורך מרבי; חובה לאפס תו אחרון ידנית.</li>
            <li><strong>Off-by-One:</strong> לולאה עם <code><=</code> דורסת בית בודד מעבר לגבול &bull; ב-x86 דורסת את ה-LSB של Saved EBP ומאפשרת הסטת מחסנית (Stack Pivoting).</li>
            <li><strong>Code Injection מול חזרה לקוד קיים:</strong> הזרקת Shellcode נחסמת ע"י DEP/NX. Return-to-libc קופצת לפונקציה שכבר קיימת בספרייה; ROP (Return-Oriented Programming) היא שרשרת של קטעי קוד קיימים. DEP אינו עוצר את שתיהן, כי הדפים שמהם קופצים כבר מסומנים להרצה.</li>
            <li><strong>גלישת ערימה (Heap Overflow):</strong> כתיבה חורגת ב-malloc/new משחיתה מטא-דאטה של הערימה או שדות/מצביעים סמוכים.</li>
            <li><strong>דריסת vptr (Vptr Smashing):</strong> גלישה דורסת את ה-vptr של אובייקט סמוך להצביע לטבלה מזויפת, וקריאה למתודה וירטואלית יוצאת מהמסלול של המחלקה. דריסת ה-vptr של מופע אחד משפיעה רק עליו; שינוי כניסה בטבלה המשותפת משפיע על כל המופעים. <em>הרשאת private וקנרית מחסנית אינן מגנות על השדה הזה.</em></li>
          </ul>
        `
      },
      {
        id: "def",
        title: "מנגנוני אפחות מערכתיים: קנרית, ASLR, DEP/NX, CFI ו-CET",
        html: `
          <ul>
            <li><strong>Stack Canary:</strong> ערך אקראי לפני Saved EBP שנבדק לפני <code>ret</code>.
              <br>&bull; <em>מגבלות קריטיות:</em> מגינה רק על המחסנית (לא על ערימה), לא מגינה על משתנים מקומיים לפניה, לא מגינה על vptr בערימה, ונעקפת ע"י זליגת מידע (Information Leak). כתיבה לא רציפה שמדלגת על הקנרית משאירה אותה תקינה, והבדיקה לפני <code>ret</code> אינה רואה את הדריסה שמעבר לה.</li>
            <li><strong>ASLR:</strong> הגרלת כתובות בסיס (מחסנית, ערימה, ספריות). PIE (Position Independent Executable) מגריל גם את קוד התוכנית עצמה; בלי PIE כתובות הקוד קבועות. ההגרלה נעקפת גם בהדלפת כתובת בודדת (<code>Base = Leaked - Offset</code>).</li>
            <li><strong>DEP / NX (W^X):</strong> הגנת חומרה המונעת הרצה מדפי נתונים. חוסמת Shellcode במחסנית ובערימה; אינה חוסמת ROP!</li>
            <li><strong>CFI & Shadow Stack (CET):</strong> CFI מאמת יעדי קפיצות עקיפות (חוסם דריסת vptr ומצביעי פונקציה); Shadow Stack מנהל עותק חומרתי מבודד של כתובות חזרה וחוסם ROP חומרתית.</li>
            <li><strong>Defense in Depth:</strong> שכבות הגנה בלתי תלויות; אפחות אינה תחליף לתיקון הבאג בשורש.</li>
            <li><strong>אימות בגבול האמון (Trust Boundary):</strong> על כל קלט חיצוני בודקים אורך, טווח ותקינות תווים לפני שימוש. קנרית (Canary), ASLR ו-DEP אינם מחליפים את השכבה הזו: הם מקשים על ניצול אחרי שהבאג כבר קיים.</li>
          </ul>
        `
      },
      {
        id: "more",
        title: "פגמי מספרים, כשלי ערימה, Format String, TOCTOU וארגז כלים",
        html: `
          <ul>
            <li><strong>גלישות מספרים:</strong> unsigned נקטם במודולו 2^n; signed הוא UB והמהדר מוחק בדיקות בדיעבד!
              <br>&bull; <em>מלכודת malloc:</em> <code>malloc(count * sizeof(int))</code> כאשר count גדול גולש לכפל זעיר (למשל 4 בתים), והלולאה כותבת מעל מיליארד איברים &larr; Heap Overflow קטסטרופלי. בדיקה נכונה: <code>if (count > SIZE_MAX / sizeof(int)) return ERROR;</code>.</li>
            <li><strong>השוואת signed ל-unsigned:</strong> המרה מרומזת בהשוואה הופכת ערך שלילי למספר ענק, והתנאי אינו אומר מה שהוא נראה. דוחים ערך שלילי לפני ההמרה, ומשווים טיפוסים מאותה משפחת סימן.</li>
            <li><strong>הרחבת סימן (Sign Extension):</strong> <code>char</code> עם סימן משכפל את הביט הגבוה כשמרחיבים אותו לטיפוס רחב. <code>unsigned char</code> ממלא אפסים, ולכן בית מעל 127 נשאר בטווח 128 עד 255. קוראים בתים גולמיים כ-<code>unsigned char</code> כדי שלא יהפכו לשלילי.</li>
            <li><strong>אורך שלילי ל-<code>size_t</code>:</strong> אורך שלילי שעובר בדיקת חסם על טיפוס עם סימן הופך בהמרה ל-<code>size_t</code> ענק, וההעתקה חורגת מהחוצץ. בודקים שהאורך אינו שלילי לפני שהוא נמסר לפרמטר גודל.</li>
            <li><strong>כשלי ערימה:</strong> Use-After-Free (גישה דרך מצביע יתום; דורס אובייקט ממוחזר ו-vptr) &bull; Double Free (השחתת רשימות ערימה) &bull; Memory Leak (מיצוי זיכרון ו-DoS). אחרי השחרור מאפסים את המצביע, כדי ששימוש או שחרור נוסף דרכו ייעצר; ב-C++ מחזיקים את המשאב במצביע חכם (RAII).</li>
            <li><strong>Format String:</strong> <code>printf(user_input)</code> ללא <code>"%s"</code> &bull; <code>%x/%p</code> מדליף מחסנית, Canary ו-ASLR; <code>%s</code> קורא מכתובת שרירותית; <code>%n</code> <strong>כותב</strong> מספר תווים לתוך כתובת בזיכרון ומאפשר השתלטות מלאה! חובה: מחרוזת פורמט קבועה בקוד.</li>
            <li><strong>TOCTOU:</strong> מרוץ זמנים בין <code>access()</code> ל-<code>open()</code>; תוקף מחליף ל-Symlink. מניעה: פתיחה אטומית עם <code>O_CREAT | O_EXCL</code> ושימוש ב-File Descriptors.</li>
            <li><strong>Dead Store Elimination:</strong> המהדר מוחק <code>memset(pwd, 0, len)</code> בסוף פונקציה כאופטימיזציה. מניעה: <code>explicit_bzero</code> או <code>SecureZeroMemory</code>.</li>
            <li><strong>מתקפות תזמון:</strong> <code>strcmp</code> עוצר באי-התאמה ראשונה; מניעה: השוואה בזמן קבוע (Constant-Time).</li>
            <li><strong>ארגז כלים:</strong> ניתוח סטטי (cppcheck ללא הרצה), ניתוח דינמי (Valgrind / ASan בריצה לאיתור UAF ודליפות), ו-Fuzzing (קלטים אקראיים לחשיפת קריסות).</li>
          </ul>
        `
      }
    ]
  },
{
    unit: "4",
    title: "יחידה 4 · שפת פייתון ושינוי דינמי של קוד",
    intro: "יחידה 4 עוסקת במודל הריצה של פייתון 3 כשפה מפורשת ודינמית, במבני הנתונים המובנים ובמודל הזיכרון (הפניות, כינוי כפול והעתקות), בתכנות מונחה־עצמים ללא הרשאות גישה קשיחות, ובמטא־תכנות — יצירת מחלקות והרצת קוד דינמי (eval, exec, pickle) והסכנות הביטחוניות הנלוות אליהן.",
    parts: [
      {
        id: "lang",
        title: "מפרש, הזחה, טיפוסיות דינמית וברווזית ומחרוזות",
        html: `<p><strong>מודל הריצה של פייתון 3:</strong> פייתון היא שפה מפורשת (Interpreted). במימוש הסטנדרטי (CPython), קוד המקור אינו מתקמפל ישירות לשפת מכונה עצמאית (כמו ב־C++), אלא מתורגם תחילה לקוד ביניים פנימי — <strong>Bytecode</strong> (נשמר לעיתים כקובצי <code>.pyc</code>), המבוצע על גבי המכונה הווירטואלית של פייתון (PVM - Python Virtual Machine). היעדר שלב הידור וקישור סטטי לקובץ בינארי עצמאי מחייב נוכחות של סביבת זמן ריצה (Runtime) מלאה, המהווה בעצמה חלק ממשטח התקיפה ומחייבת עדכוני אבטחה שוטפים.</p>

<p><strong>טיפוסיות דינמית וברווזית (Dynamic &amp; Duck Typing):</strong> בפייתון הטיפוס שייך לאובייקט הנמצא בזיכרון, ולא לשם המשתנה. שמות משתנים הם הפניות (References) בלבד שנקשרות מחדש לאובייקטים מכל טיפוס. השפה דוגלת ב־Duck Typing ("אם זה הולך כמו ברווז ומגעגע כמו ברווז — זה ברווז"): תקינות הפעולה נבדקת בזמן ריצה בלבד. אם האובייקט תומך במתודה המבוקשת — הפעולה תצליח; אם לא — תיזרק שגיאת <code>AttributeError</code> או <code>TypeError</code>.</p>

<p><strong>כללי תחביר והזחה (Indentation):</strong> בלוקים של קוד מוגדרים אך ורק באמצעות רמת הזחה (רווחים) לאחר תו נקודתיים (<code>:</code>), ללא שימוש בסוגריים מסולסלים (<code>{}</code>). תקן PEP 8 קובע מוסכמה קשיחה של 4 רווחים לכל רמת הזחה. ערבוב של טאבים ורווחים אסור לחלוטין וגורר שגיאת <code>TabError</code>.</p>

<p><strong>אופרטורים בוליאניים וערכי אמת (Truthiness):</strong> האופרטורים הלוגיים הם מילים שמורות באנגלית: <code>and</code>, <code>or</code>, <code>not</code> (ולא הסימנים <code>&&</code>, <code>||</code>, <code>!</code> של C++). פעולות <code>and</code> ו־<code>or</code> פועלות במנגנון קיצור דרך (Short-circuiting) ומחזירות את האובייקט האחרון שהוערך. ערכים הנחשבים ל־False (Falsy): <code>None</code>, <code>False</code>, אפס מכל סוג (<code>0</code>, <code>0.0</code>), ומבני נתונים ריקים (מחרוזת ריקה <code>""</code>, רשימה ריקה <code>[]</code>, מילון ריק <code>{}</code>). כל שאר האובייקטים נחשבים ל־True (Truthy).</p>

<p><strong>מחרוזות (str) ואי־השתנות (Immutability):</strong> מחרוזות בפייתון 3 מיוצגות ביוניקוד (Unicode) והן בלתי ניתנות לשינוי (Immutable). פעולות מניפולציה כגון <code>s.upper()</code>, <code>s.replace()</code> או שרשור אינן משנות את המחרוזת המקורית, אלא מחזירות תמיד אובייקט מחרוזת חדש בזיכרון. גישה לתו נעשית באינדוקס (כולל אינדקס שלילי מהסוף: <code>s[-1]</code>), וחיתוך (Slicing) מתבצע בתחביר <code>s[start:stop:step]</code>.</p>

<p><strong>קלט משתמש ואימות דפנסיבי:</strong> הפונקציה <code>input()</code> בפייתון 3 מחזירה תמיד מחרוזת (<code>str</code>). <strong>מוקש בחינה קלאסי:</strong> המרת קלט למספר חייבת להתבצע תמיד בתוך בלוק <code>try-except ValueError</code> המלווה בבדיקת טווחים עסקיים. הסתמכות על <code>s.isnumeric()</code> בלבד אינה מספקת — היא נכשלת על מספרים שליליים או שברים עשרוניים, ומאשרת תווי יוניקוד מיוחדים שאינם ניתנים להמרה פשוטה.</p>
<ul>
  <li><strong>ביטוי רגולרי (Regular Expression):</strong> תבנית על קלט לא מבוקר עלולה לרוץ זמן ארוך מאוד ולפגוע בזמינות. זו מניעת שירות על ביטוי רגולרי (ReDoS, Regular Expression Denial of Service). התבנית קבועה מראש בקוד.</li>
</ul>`
      },
      {
        id: "data",
        title: "מבני נתונים, כינוי כפול, קבצים, חריגות וסריאליזציה",
        html: `<p><strong>מבני הנתונים המובנים:</strong></p>
<ul>
  <li><strong>רשימה (list):</strong> מערך דינמי הניתן לשינוי במקום (Mutable). תומכת בהוספה (<code>append</code>), מחיקה, והארכה. אינה ניתנת לגיבוב (Not Hashable) ולכן אינה יכולה לשמש כמפתח במילון.</li>
  <li><strong>טאפל (tuple):</strong> סדרה קבועה של איברים בלתי ניתנת לשינוי (Immutable). מכיוון שאינה משתנה, היא ניתנת לגיבוב (Hashable) ויכולה לשמש כמפתח במילון או כאיבר בקבוצה. טאפל בעל איבר בודד מחייב פסיק בסוף: <code>(item,)</code>.</li>
  <li><strong>קבוצה (set):</strong> אוסף של איברים ייחודיים ללא סדר מובטח, הממומש כטבלת גיבוב. מאפשר בדיקת שייכות (<code>x in s</code>) והסרת כפילויות בזמן ממוצע של <code>O(1)</code>.</li>
  <li><strong>מילון (dict):</strong> מערך אסוציאטיבי של זוגות מפתח-ערך (Key-Value) מבוסס טבלת גיבוב. גישה ישירה ע״י <code>d[key]</code> זורקת <code>KeyError</code> אם המפתח אינו קיים; מתודת <code>d.get(key, default)</code> מחזירה בבטחה ערך ברירת מחדל ללא קריסה.</li>
</ul>

<p><strong>כינוי כפול (Aliasing) מול העתקה רדודה ועמוקה — מלכודת זיכרון:</strong></p>
<ul>
  <li>השמה פשוטה <code>b = a</code> אינה יוצרת עותק של הרשימה, אלא יוצרת כינוי (Alias) — שני שמות המצביעים לאותו אובייקט בזיכרון (<code>id(a) == id(b)</code>). שינוי דרך אחד השמות משנה מיד את האובייקט גם עבור השם השני.</li>
  <li>העתקה רדודה (Shallow Copy): <code>b = a.copy()</code> או <code>b = a[:]</code> יוצרת אובייקט רשימה חדש, אך איבריה הפנימיים הם אותן הפניות. אם הרשימה מכילה אובייקטים מקוננים (כגון רשימה של רשימות <code>[[1, 2], [3, 4]]</code>), שינוי איבר פנימי ישתקף בשני העותקים!</li>
  <li>העתקה עמוקה (Deep Copy): שימוש ב־<code>copy.deepcopy(a)</code> משכפל באופן רקורסיבי את כל גרף האובייקטים ומנתק לחלוטין את התלות.</li>
  <li>השוואת זהות מול תוכן: אופרטור <code>is</code> בודק זהות פיזית בזיכרון (אותה כתובת); אופרטור <code>==</code> בודק שוויון ערכים לפי מתודת <code>__eq__</code>.</li>
</ul>

<p><strong>עבודה דפנסיבית עם קבצים:</strong> פתיחת קבצים נעשית תמיד באמצעות מנהל הקשר: <code>with open(path, mode, encoding='utf-8') as f:</code>, המבטיח סגירה ושחרור מובטחים של ידית הקובץ גם בעת זריקת חריגה. בקריאת קבצים ממקור בלתי מהימן, אסור להשתמש ב־<code>f.read()</code> הטוען את כל הקובץ לזיכרון בבת אחת (סכנת מיצוי זיכרון ו־DoS), אלא יש לקרוא שורה־שורה בלולאת <code>for line in f:</code> או במקטעים קצובים מראש.</p>

<p><strong>טיפול בחריגות (Exception Handling):</strong> בלוק <code>try-except-else-finally</code> מאפשר טיפול מבוקר בשגיאות. דפוס ה־"Bare Except" (תפיסה עיוורת ע״י <code>except:</code>) הוא אנטי־דפוס מסוכן, משום שהוא לוכד חריגות מערכת חיוניות כגון <code>KeyboardInterrupt</code> ו־<code>SystemExit</code> ומסתיר באגים קריטיים. חובה לתפוס חריגות ספציפיות בלבד (כגון <code>except ValueError:</code>).</p>
<ul>
  <li><strong><code>split</code> מול <code>join</code>:</strong> <code>split</code> מפרק מחרוזת לרשימה לפי מפריד. <code>join</code> נקרא על מחרוזת המפריד, והרשימה היא הארגומנט, כמו <code>sep.join(items)</code>. קריאה על הרשימה עצמה אינה מחברת את האיברים.</li>
  <li><strong><code>sort</code>, <code>append</code> ו-<code>reverse</code>:</strong> משנות את הרשימה במקום ומחזירות <code>None</code>. השמת התוצאה, <code>items = items.sort()</code>, מוחקת את הרשימה כי השם מצביע עכשיו ל-<code>None</code>.</li>
  <li><strong>מצבי פתיחה:</strong> <code>"w"</code> דורס קובץ קיים, <code>"a"</code> מוסיף בסופו, ו-<code>"b"</code> פותח בינארית בלי תרגום טקסט. פתיחה ב-<code>"w"</code> של קובץ שרצו לשמור מוחקת את התוכן.</li>
  <li><strong>EAFP:</strong> לפי EAFP (Easier to Ask Forgiveness than Permission) פותחים את הקובץ ולוכדים <code>OSError</code>. בדיקת קיום מראש ואז פתיחה היא TOCTOU (Time-of-Check to Time-of-Use): המצב יכול להשתנות בין הבדיקה לפעולה.</li>
  <li><strong><code>else</code>, <code>finally</code> ו-<code>raise</code>:</strong> <code>else</code> רץ רק כשאין חריגה בבלוק <code>try</code>. <code>finally</code> רץ תמיד, גם אחרי <code>return</code>, ולכן שמים בו שחרור משאב. <code>raise</code> זורק חריגה במכוון כשהקורא חייב לראות את הכשל.</li>
</ul>

<p><strong>סכנת סריאליזציה עם pickle ו־shelve:</strong> מודול <code>pickle</code> מבצע סריאליזציה של גרף אובייקטים שלם. בעת שחזור אובייקט (Deserialization) ע״י <code>pickle.loads()</code>, פייתון מאפשרת לאובייקט להגדיר את מתודת <code>__reduce__</code>, המורה למפרש אילו פונקציות להפעיל עם אילו ארגומנטים. תוקף יכול לבנות מחרוזת בייטקוד של pickle המפעילה פקודות מערכת שרירותיות (Remote Code Execution - RCE). <strong>כלל ברזל דפנסיבי: לעולם אין לטעון קובץ pickle או shelve ממקור חיצוני או רשתי!</strong> להעברת נתונים יש להשתמש ב־JSON עם אימות סכימה הדוק.</p>`
      },
      {
        id: "oop",
        title: "פונקציות, דקורטורים, מודל המחלקות וירושה",
        html: `<p><strong>פונקציות כאזרחים ממדרגה ראשונה (First-Class Citizens):</strong> בפייתון פונקציות הן אובייקטים לכל דבר: ניתן להציב אותן במשתנים, להעביר אותן כפרמטרים, להחזיר אותן מפונקציות אחרות, ולאחסן אותן במבני נתונים. פונקציה פנימית יכולה ללכוד משתנים מההיקף החיצוני שלה (Closure). מנגנון הארגומנטים הגמיש מאפשר קבלת ארגומנטים לפי מיקום עודפים (<code>*args</code>, הנארזים לטאפל) וארגומנטים בעלי שם עודפים (<code>**kwargs</code>, הנארזים למילון).</p>

<p><strong>מעטפות ודקורטורים (Decorators):</strong> דקורטור הוא פונקציה המקבלת פונקציה כארגומנט ומחזירה פונקציה עטופה (Wrapper), ובכך מוסיפה התנהגות (כגון רישום לוגים, מדידת זמנים, או בדיקת הרשאות) ללא שינוי קוד המקור. כדי למנוע דריסת המטא־דאטה של הפונקציה המקורית (כמו שמה <code>__name__</code> ותיעודה <code>__doc__</code>), חובה להשתמש בדקורטור <code>@functools.wraps(func)</code> מעל פונקציית המעטפת הפנימית.</p>

<p><strong>מחזור חיי מופע: <code>__new__</code> מול <code>__init__</code>:</strong> המתודה <code>__new__(cls, ...)</code> היא בנאי ההקצאה הסטטי האחראי על יצירת האובייקט הפיזי בזיכרון והחזרתו; המתודה <code>__init__(self, ...)</code> מקבלת את האובייקט שנוצר (<code>self</code>) ומאתחלת את שדות המופע שלו. שדות מופע נוצרים דרך השמה ל־<code>self.field = value</code>.</p>

<p><strong>משתנה מחלקה מול משתנה מופע:</strong> משתנים המוגדרים ישירות בגוף המחלקה הם משתני מחלקה (Class Attributes) המשותפים לכל המופעים (ומאוחסנים ב־<code>ClassName.__dict__</code>). ברגע שמופע מסוים מבצע השמה לשם זה (<code>obj.x = 5</code>), נוצר עבורו שדה מופע מקומי ב־<code>obj.__dict__</code> המסתיר את משתנה המחלקה עבור אותו מופע בלבד.</p>

<p><strong>היעדר העמסת חתימות (No Function Overloading):</strong> בפייתון אין העמסת פונקציות או שיטות כמו ב־C++ או Java. אם מגדירים באותה מחלקה שתי מתודות בעלות אותו שם, <strong>ההגדרה השנייה פשוט דורסת ומוחקת לחלוטין את הראשונה!</strong> התנהגות מגוונת מושגת באמצעות ארגומנטים אופציונליים עם ערכי ברירת מחדל, או בדיקת טיפוסים עם <code>isinstance()</code>.</p>

<p><strong>כימוס ושיבוש שמות (Name Mangling):</strong> בפייתון אין הרשאות גישה קשיחות (כמו <code>private</code> או <code>protected</code>). שדה ששמו מתחיל בקו תחתון יחיד (<code>_x</code>) מסמן מוסכמת מתכנתים פנימית. שדה ששמו מתחיל בשני קווים תחתונים ללא סיומת כפולה (<code>__x</code>) מפעיל שיבוש שמות אוטומטי (Name Mangling) ע״י המפרש, והופך ל־<code>_ClassName__x</code>. <strong>הדגש לבחינה:</strong> שיבוש זה נועד אך ורק למנוע התנגשויות שמות בירושה מרובה, ואינו מהווה מחסום אבטחה (השדה עדיין נגיש לחלוטין תחת שמו המשובש).</p>

<p><strong>ירושה מרובה, <code>super()</code> ו־MRO:</strong> קריאה ל־<code>super()</code> קוראת למתודה הבאה בתור לפי סדר פתרון המתודות (Method Resolution Order - MRO), המחושב באמצעות אלגוריתם C3 Linearization. בירושה מרובה (כולל מבנה "יהלום"), <code>super()</code> מבטיח שכל מחלקת אב תתבצע פעם אחת בלבד ובסדר קבוע מראש.</p>

<p><strong>הגנת קוד עליון עם <code>if __name__ == "__main__":</code>:</strong> בעת פקודת <code>import</code>, מפרש פייתון מבצע את כל הקוד העליון של המודול המיובא. עטיפת קוד הריצה והבדיקות בבלוק זה מבטיחה שהקוד ירוץ רק כאשר הקובץ מופעל ישירות כתוכנית ראשית, ולא כאשר הוא מיובא כספרייה.</p>
<ul>
  <li><strong>ארגומנט ברירת מחדל בר-שינוי (Mutable Default):</strong> ערך כמו רשימה ריקה מחושב פעם אחת בהגדרת הפונקציה ומשותף לכל הקריאות. קריאה שמשנה אותו משנה את ברירת המחדל של כולן. התיקון הוא <code>None</code> ויצירת רשימה חדשה בתוך הפונקציה.</li>
  <li><strong>למבדה (lambda):</strong> פונקציה אנונימית של ביטוי יחיד, בלי גוף של כמה פקודות כמו ב-<code>def</code>. בדיקות וטיפול בשגיאות נשארים בפונקציה בעלת שם.</li>
  <li><strong>סגירה (Closure) ו-<code>nonlocal</code>:</strong> פונקציה פנימית קוראת משתנה מההיקף העוטף. השמה למשתנה עוטף בלי <code>nonlocal</code> יוצרת שם מקומי, והערך החיצוני נשאר כמו שהיה. <code>nonlocal</code> מצהירה שההשמה חלה על המשתנה העוטף.</li>
  <li><strong><code>__getattribute__</code> מול <code>__getattr__</code>:</strong> <code>__getattribute__</code> רץ על כל גישה לשם. <code>__getattr__</code> נקרא רק אם השם חסר במופע ובמחלקה. דריסת <code>__getattribute__</code> משנה כל קריאה, ולכן מפנים ממנה למימוש הבסיס.</li>
  <li><strong>טלאי (Monkey Patch):</strong> השמה למתודה על מופע משנה רק אותו מופע; השמה על המחלקה משנה את כל המופעים. ההגנה היא רשימת שמות מותרים (Allowlist), כדי שקלט לא יחליף מתודה שרירותית.</li>
</ul>`
      },
      {
        id: "dyn",
        title: "מטא־תכנות, type דינמי, סכנות eval/exec וחטיפת מודולים",
        html: `<p><strong>שני השימושים של פונקציית <code>type()</code>:</strong></p>
<ul>
  <li><strong>בירור טיפוס:</strong> קריאה עם ארגומנט יחיד <code>type(obj)</code> מחזירה את טיפוס/מחלקת האובייקט.</li>
  <li><strong>יצירת מחלקה דינמית בזמן ריצה:</strong> קריאה עם שלושה ארגומנטים <code>type(name, bases, dict)</code> יוצרת מחלקה חדשה לגמרי!
    <ul>
      <li><code>name</code> (מחרוזת): שם המחלקה שנוצרת.</li>
      <li><code>bases</code> (טאפל): מחלקות הבסיס מהן היא יורשת. <strong>מוקש בחינה קריטי:</strong> עבור ירושה ממחלקה בודדת חובה לכלול פסיק בסוף הטאפל: <code>(BaseClass,)</code>! השמטת הפסיק תיצור ביטוי סוגריים רגיל ותגרור <code>TypeError</code>.</li>
      <li><code>dict</code> (מילון): מילון המכיל את כל משתני המחלקה והמתודות שלה (כאשר פונקציות המועברות במילון חייבות לקבל <code>self</code> כפרמטר ראשון).</li>
    </ul>
  </li>
</ul>

<p><strong>סכנות הרצת קוד דינמי (eval, exec) והזרקת קוד (Code Injection):</strong></p>
<ul>
  <li>הפונקציה <code>eval(expr)</code> מעריכה ביטוי פייתון יחיד ומחזירה את תוצאתו; הפונקציה <code>exec(stmt)</code> מריצה בלוק שלם של פקודות פייתון. העברת קלט משתמש או תוכן בלתי מאומת לפונקציות אלו מעניקה לתוקף יכולת הרצת קוד שרירותי (RCE) במלוא הרשאות השרת.</li>
  <li><strong>בריחת ארגז חול (Python Sandbox Escape) דרך רפלקציה — מוקש בחינה מרכזי:</strong> ניסיון להגביל את הקוד ע״י איפוס הפונקציות המובנות (כגון <code>eval(user_code, {"__builtins__": {}})</code>) <strong>אינו מגן מפני פריצה!</strong> בפייתון כל אובייקט יורש בסופו של דבר מ־<code>object</code>. תוקף יכול ליצור אובייקט תמים (כגון טאפל ריק <code>()</code>), לגשת למחלקתו (<code>().__class__</code>), לטפס למחלקת הבסיס (<code>.__base__</code>), ולתחקר את רשימת כל תת־המחלקות שנטענו אי פעם לזיכרון המפרש: <code>.__subclasses__()</code>. מתוך הרשימה הוא מאתר מחלקות בעלות גישה למודולי מערכת (כגון <code>os._wrap_close</code> או <code>subprocess.Popen</code>) ומפעיל דרכן פקודות מערכת הפעלה ללא הגבלה.</li>
  <li><strong>פתרון מגן תקני:</strong> לפרסור מבני נתונים ליטרליים (כגון מספרים, רשימות ומילונים) יש להשתמש אך ורק ב־<code>ast.literal_eval()</code>, המפרסר תחביר סטטי ומסרב להפעיל פונקציות או אופרטורים. לקבלת נתונים מורכבים ברשת יש לעבוד ב־JSON בלבד.</li>
  <li><strong>החלפת מתודה בזיכרון:</strong> השמת פונקציה אחרת על מתודה חיה משנה התנהגות בלי לגעת בקובץ, ולכן גיבוב של הקובץ נשאר תקין. בדיקת שלמות בתוך אותו תהליך ניתנת להשתקה על ידי אותו קוד. הגבול הוא לא להריץ קוד לא מהימן.</li>
  <li><strong><code>compile</code> ו-<code>marshal</code>:</strong> הידור מחרוזת וטעינת <code>marshal</code> ממקור לא מהימן מריצים קוד, כמו <code>eval</code>. צורת הבייטקוד אינה הופכת מקור לא מהימן למקור נתונים.</li>
  <li><strong>מפרש C:</strong> קוד פייתון נקי עדיין רץ על מפרש C שעלול להכיל חולשת זיכרון. זה שונה מבאג בסקריפט. האפחות היא עדכון המפרש.</li>
  <li><strong>איפוס builtins אינו ארגז חול (Sandbox):</strong> מחיקת <code>__builtins__</code> בתוך אותו מפרש אינה בידוד. הבידוד חייב להיות מחוץ למפרש, בתהליך מוגבל.</li>
</ul>

<p><strong>סדר נתיבי חיפוש וחטיפת מודולים (sys.path Hijacking):</strong> בעת פקודת <code>import</code>, מפרש פייתון סורק את רשימת הנתיבים ב־<code>sys.path</code> לפי סדר. הנתיב הראשון ברשימה (אינדקס 0) הוא התיקייה הנוכחית של הסקריפט המורץ. אם תוקף מצליח לשתול קובץ בשם של ספרייה סטנדרטית (כגון <code>math.py</code>, <code>json.py</code> או <code>os.py</code>) בתיקיית העבודה, התוכנית תייבא את הקובץ הזדוני במקום את הספרייה האמיתית.</p>`
      }
    ]
  },
  {
    unit: "5",
    title: "יחידה 5 · תקשורת, מקביליות ואבטחת רשת",
    intro: "יחידה 5 פורסת את יסודות הרשת והתקשורת מהשכבה הפיזית ועד ליישום: מודלי OSI ו־TCP/IP, תכנות שקעים דפנסיבי ב־C++ ובפייתון, מסגור (Framing) מעל זרם TCP, מקביליות וחוטים מול תהליכים, נעילת המפרש (GIL), ארכיטקטורת Reactor לריבוי לקוחות, הצפנה היברידית, קריפטוגרפיה פוסט־קוונטית (PQC) והתקפות רשת נפוצות.",
    parts: [
      {
        id: "layers",
        title: "מודל השכבות (OSI מול TCP/IP), כתובות MAC ו־IP, NAT, ופרוטוקולי TCP מול UDP",
        html: `<p><strong>מודל OSI (7 שכבות) מול מודל האינטרנט TCP/IP (5 שכבות):</strong> מודל OSI מגדיר חלוקה רעיונית של תהליך התקשורת: פיזית, ערוץ הנתונים, רשת, תובלה, שיחה, ייצוג ויישום. מודל TCP/IP המעשי ממזג את שכבות השיחה והייצוג לתוך שכבת היישום:</p>
<ul>
  <li><strong>שכבה פיזית (Physical):</strong> העברת ביטים גולמיים על גבי תווך פיזי (סיב אופטי, כבל נחושת, גלי רדיו ב־Wi-Fi).</li>
  <li><strong>שכבת ערוץ הנתונים (Data Link):</strong> העברת מסגרות (Frames) מקומית בתוך אותו מקטע רשת באמצעות <strong>כתובת MAC בת 48 סיביות (6 בתים)</strong> הצרובה בכרטיס הרשת. מנוהלת ע״י מתג (Switch) ברשת מקומית (LAN).</li>
  <li><strong>שכבת הרשת (Network / Internet):</strong> ניתוב חבילות (Packets) בין רשתות מרוחקות ברשת רחבה (WAN) ע״י נתבים (Routers), תוך שימוש ב־<strong>כתובות IP</strong> (ב־IPv4 האורך 32 סיביות / 4 בתים; ב־IPv6 האורך 128 סיביות / 16 בתים).</li>
  <li><strong>שכבת התובלה (Transport):</strong> תקשורת תהליך־אל־תהליך מקצה לקצה באמצעות <strong>פורטים (16 סיביות)</strong>. סדר בתים קטן (Little-Endian), כמו ב־x86, שומר את הבית הנמוך בכתובת הנמוכה, והרשת דורשת Big-Endian (סדר בתים רשתי - Network Byte Order); בלי <code>htons</code> לפורט ו־<code>htonl</code> לשדה של 32 סיביות הבתים יוצאים הפוכים והיעד לא מזהה את הפורט. המרה חזרה נעשית ע״י <code>ntohs</code> (16 סיביות) ו־<code>ntohl</code> (32 סיביות).</li>
  <li><strong>שכבת השיחה (Session):</strong> מקימה שיחה בין הצדדים, מנהלת אותה ושומרת נקודות ביקורת לשחזור. במודל TCP/IP שכבה זו ושכבת הייצוג (Presentation), שעוסקת בקידוד, דחיסה והצפנה, נכללות בשכבת היישום; ב־OSI הן שכבות נפרדות.</li>
  <li><strong>שכבת הייצוג (Presentation - שכבה 6 ב־OSI) — דגש לבחינה:</strong> אחראית על קידוד נתונים, דחיסה והצפנה (כגון ASCII, UTF-8, SSL/TLS).</li>
  <li><strong>שכבת היישום (Application):</strong> פרוטוקולי קצה כגון HTTP, DNS, SSH, SMTP, FTP.</li>
  <li><strong>קריאה מרחוק (RPC - Remote Procedure Call):</strong> בדל (Stub) בצד הלקוח אורז פרמטרים, ושלד (Skeleton) בשרת פורק אותם ומפעיל את הפרוצדורה. הקריאה נראית מקומית, אבל השרת מריץ רק פעולה שהממשק חשף.</li>
  <li><strong>עמית־לעמית (P2P - Peer-to-Peer):</strong> צומת שהוא גם לקוח וגם שרת, בניגוד לשרת פסיבי שממתין לבקשות. כל עמית הוא גבול אמון, ולכן קלט שמגיע ממנו נבדק כמו קלט לקוח.</li>
  <li><strong>פרוקסי (Proxy):</strong> מתווך בין לקוח לשרת, ולכן גבול אמון נוסף. מה שהגיע לפרוקסי כבר יצא מהגבול המקורי, ומעבירים הלאה רק מה שהמדיניות מתירה.</li>
  <li><strong>פריקה שמפעילה אובייקטים:</strong> שחזור אובייקט חי, כמו <code>pickle</code>, עלול להריץ קוד בצד המקבל. מעבירים מבני נתונים בלבד, לא גרף אובייקטים שאפשר להפעיל.</li>
</ul>

<p><strong>חלוקת רשתות ו־NAT — מלכודת בחינה קריטית:</strong> מסכת רשת (Subnet Mask) מפרידה בין מזהה הרשת למזהה המארח. מנגנון NAT (Network Address Translation) מתרגם טווח כתובות IP פרטיות (כגון 10.0.0.0/8 או 192.168.0.0/16) לכתובת ציבורית אחת כדי לחסוך בכתובות IPv4. <strong>מוקש בחינה מובהק: NAT אינו חומת אש (Firewall)!</strong> NAT אינו מסנן תוכן, אינו בודק חבילות ואינו מגן מפני סוסים טרויאניים, נוזקות או התקפות ברמת היישום.</p>

<p><strong>פרוטוקול TCP מול פרוטוקול UDP:</strong></p>
<ul>
  <li><strong>TCP (Transmission Control Protocol):</strong> פרוטוקול מונחה־חיבור (דורש לחיצת יד משולשת: <span dir="ltr">SYN, SYN-ACK, ACK</span>), אמין (מבטיח הגעה של כל בית ללא שגיאות או כפילויות), שומר על סדר מסירה מדויק ומנהל בקרת עומסים. <strong>מאפיין יסוד: TCP הוא זרם בתים (Byte Stream) רציף ללא שום גבולות הודעה מובנים!</strong></li>
  <li><strong>UDP (User Datagram Protocol):</strong> פרוטוקול חסר־חיבור, לא אמין (אין אישור מסירה, חבילות עלולות ללכת לאיבוד או להגיע בסדר שגוי) וללא בקרת עומס. יתרונותיו: תקורה מזערית, מהירות גבוהה, ושימור גבולות חבילה (Datagram Boundaries — כל קריאת קבלה מחזירה בדיוק הודעה אחת שנשלחה).</li>
</ul>`
      },
      {
        id: "sock",
        title: "ממשק שקעים (Sockets) ב־C++ ובפייתון ומסגור (Framing)",
        html: `<p><strong>מחזור חיי שקעי רשת (Sockets):</strong></p>
<ul>
  <li><strong>בצד השרת:</strong>
    <ol>
      <li><code>socket()</code>: הקצאת מתאר שקע (File Descriptor).</li>
      <li><code>bind()</code>: שיוך השקע לכתובת IP ולפורט מקומי.</li>
      <li><code>listen()</code>: מעבר למצב האזנה והגדרת גודל תור ההמתנה (backlog).</li>
      <li><code>accept()</code>: חסימה והמתנה לחיבור לקוח. <strong>מוקש בחינה קריטי:</strong> <code>accept()</code> מחזיר <strong>שקע תקשורת חדש ונפרד לחלוטין</strong> הייעודי לשיחה מול הלקוח שהתחבר! השקע המאזין המקורי ממשיך להאזין בפורט ללקוחות חדשים. אחרי הטיפול סוגרים את שקע השיחה שהחזיר <code>accept()</code>, אחרת נגמרים מתארי הקבצים; שקע ההאזנה נשאר פתוח.</li>
    </ol>
  </li>
  <li><strong>בצד הלקוח:</strong> <span dir="ltr"><code>socket()</code> → <code>connect()</code> → <code>send()</code> / <code>recv()</code> → <code>close()</code></span> — יצירת שקע, התחברות לשרת, שליחה וקבלה, וסגירה.</li>
  <li><strong>בדיקת שגיאות ב־C/C++:</strong> פונקציית <code>socket()</code> מחזירה <code>-1</code> במקרה של כישלון. השוואה ל־0 היא שגיאה חמורה (מתאר 0 הוא stdin התקני).</li>
  <li><strong><code>SO_REUSEADDR</code>:</strong> מאפשרת לקשור את הפורט מחדש מיד, במקום להמתין ל־<code>TIME_WAIT</code>. בלי הדגל השירות לא עולה שוב על אותו פורט; הדגל אינו מרחיב את כתובת ההאזנה.</li>
  <li><strong>Boost.Asio:</strong> ספריית C++ שמאגדת את מחזור השקע וסוגרת אותו ב־RAII, גם ביציאה בחריגה. סגירה ידנית מפוזרת מפספסת נתיב שגיאה, ומתארי הקבצים נגמרים.</li>
  <li><strong>הצפנת הערוץ:</strong> נלקחת רק מספרייה בדוקה (OpenSSL), לא ממימוש עצמי של צופן. מימוש ביתי נשבר גם כשהפורטים ולחיצת היד נראים תקינים.</li>
  <li><strong>מסגור (Framing):</strong> TCP הוא זרם בלי גבולות הודעה, ולכן קריאה אחת אינה הודעה אחת. כותרת הקורס בת 12 בתים ב־Big-Endian נושאת מספר חבילה, סך חבילות ואורך מטען; קוראים אותה במלואה לפני המטען, ומגבילים את האורך בתקרה.</li>
</ul>

<p><strong>כתובת האזנה — סכנת חשיפה:</strong> האזנה ל־<code>INADDR_ANY</code> (או <code>0.0.0.0</code>) פותחת את השירות להאזנה בכל כרטיסי הרשת של המכונה, כולל ממשקים חיצוניים ואינטרנט ציבורי. שירות פנימי בלבד חובה לקשור לכתובת ה־Loopback המקומית (<code>127.0.0.1</code> / localhost).</p>

<p><strong>קריאות חלקיות ומסגור הודעות ב־TCP (Framing):</strong> מכיוון ש־TCP מעביר זרם בתים רציף, קריאת <code>recv()</code> או <code>read()</code> עשויה להחזיר רק חלק מההודעה שנשלחה או להדביק יחד שתי הודעות שנשלחו ברצף. בפייתון <code>sendall()</code> מבטיחה שליחה של כל המידע, אך בצד המקבל <code>recv(bufsize)</code> עשויה לחזור עם מידע חלקי. קבלת 0 בתים מסמנת סגירה תקינה של החיבור ע״י הצד המרוחק (EOF). יישום דפנסיבי חייב לממש <strong>מסגור (Framing)</strong>: קידומת אורך קבועה (Length-prefix) ב־Big-Endian (למשל 4 בתים עם <code>struct.pack('>I', length)</code>) יחד עם לולאת קריאה שלמה (תבנית <code>recv_exact</code>) ותקרת גודל מרבית למניעת מיצוי זיכרון ו־DoS.</p>

<p><strong>מלכודת תו האפס במחרוזות C:</strong> קריאת רשת באמצעות <code>read()</code> או <code>recv()</code> קוראת בתים גולמיים ו<strong>אינה מוסיפה תו אפס סיום (<code>\0</code>)</strong> בסוף החוצץ! הדפסה עיוורת כמחרוזת (<code>%s</code> או <code>cout</code>) גוררת קריאה מעבר לגבולות החוצץ עד לתו אפס מקרי, ויוצרת דליפת זיכרון או קריסה.</p>`
      },
      {
        id: "par",
        title: "מקביליות ובו־זמניות, חוטים מול תהליכים, סנכרון, GIL ו־Selector",
        html: `<p><strong>בו־זמניות (Concurrency) מול מקביליות (Parallelism):</strong> בו־זמניות היא ניהול של מספר משימות במקביל ע״י שזירת זמנים במעבד; מקביליות היא ביצוע פיזי של מספר משימות בו־רגע על גבי מספר ליבות חומרה נפרדות.</p>

<p><strong>תהליכים (Processes) מול חוטים (Threads):</strong> תהליכים נהנים מבידוד מוחלט במרחבי זיכרון וירטואליים נפרדים; שיתוף מידע ביניהם דורש מנגנוני IPC (תקשורת בין־תהליכית או זיכרון משותף). חוטים רצים בתוך אותו תהליך וחולקים את כל מרחב הכתובות של הזיכרון (הערימה, משתנים גלובליים וסטטיים משותפים, כאשר לכל חוט מחסנית עצמאית בלבד). שיתוף זה מהיר ויעיל, אך חושף את התוכנית למרוצי נתונים קריטיים.</p>

<p><strong>מלכודת <code>std::thread</code> ב־C++:</strong> חוט שנוצר הוא במצב <code>joinable</code>. אם אובייקט החוט נהרס (ביציאה מהבלוק או בעת חריגה) לפני שנקראה עליו מתודת <code>join()</code> או <code>detach()</code> — מערכת הריצה מפעילה מיד <code>std::terminate()</code> והתוכנית כולה מתרסקת!</p>

<p><strong>מרוץ נתונים (Data Race):</strong> מצב שבו שני חוטים או יותר ניגשים בו־זמנית לאותו מיקום בזיכרון, כאשר לפחות אחת הגישות היא פעולת כתיבה, ללא סנכרון מתאים. ב־C++ מצב זה מוגדר כ־<strong>התנהגות לא מוגדרת (Undefined Behavior)</strong>. סנכרון מושג באמצעות מנעולים (<code>std::mutex</code> המשולב עם מעטפת RAII: <code>std::lock_guard</code> לשחרור מובטח ביציאה), משתנים אטומיים (<code>std::atomic</code> עבור פעולות כמו <code>counter++</code>), ומשתני תנאי (<code>std::condition_variable</code>).</p>
<ul>
  <li><strong>תנאי מרוץ (Race Condition) מול מרוץ נתונים (Data Race):</strong> תנאי מרוץ הוא תוצאה שתלויה בסדר התזמון. מרוץ נתונים הוא כתיבה מקבילה לאותו מקום בלי סנכרון, והיא התנהגות לא מוגדרת ב־C++; מנעול או משתנה אטומי סוגרים את החלון.</li>
  <li><strong>קיפאון (Deadlock):</strong> חוטים ממתינים זה לזה במעגל, ואף אחד לא מתקדם. מונעים זאת בסדר נעילות אחיד: כל החוטים תופסים את המנעולים באותו סדר.</li>
  <li><strong>משתנה תנאי (Condition Variable):</strong> מרדים את החוט עד התראה, בלי המתנה פעילה ששורפת מעבד. הוא נבדל ממנעול, שרק שומר על קטע קריטי ואינו מודיע שהמצב השתנה.</li>
</ul>

<p><strong>נעילת המפרש העולמית (GIL) בפייתון:</strong> ב־CPython מנעול ה־GIL מאפשר רק לחוט אחד בכל רגע נתון לבצע Bytecode של פייתון. חוטים בפייתון יעילים אך ורק לבו־זמניות מונעת קלט/פלט (I/O-Bound, מכיוון שה־GIL משתחרר בעת המתנה לרשת או לדיסק). למשימות חישוביות כבדות (CPU-Bound) על פני מספר ליבות, חובה להשתמש בריבוי תהליכים באמצעות מודול <code>multiprocessing</code>.</p>

<p><strong>ריבוב קלט/פלט (I/O Multiplexing) ותבנית Reactor:</strong> מודל של "חוט לכל לקוח" (Thread-per-client) גורם לתקורה עצומה בהחלפת הקשרים ולסכנת DoS מקריסה בעומס חיבורים. תבנית Reactor (המופעלת ע״י מודול <code>selectors</code> בפייתון או <code>select</code>/<code>epoll</code> ב־C++) מאפשרת לחוט יחיד או לקבוצה קטנה של חוטים להאזין לאלפי שקעים במקביל, ולהתעורר רק כאשר שקע מסוים מוכן לקריאה או כתיבה. ארכיטקטורה זו מחייבת אכיפת זמני קצוב (Timeouts), תקרות חיבורים ומגבלות גודל. ב־Reactor השקעים לא־חוסמים; קריאה חוסמת בחוט היחיד עוצרת את כל הלקוחות.</p>`
      },
      {
        id: "cry",
        title: "קריפטוגרפיה, הצפנה היברידית, איומי קוונטום (PQC) ומתקפות רשת",
        html: `<p><strong>הצפנה סימטרית, אסימטרית והצפנה היברידית:</strong></p>
<ul>
  <li><strong>הצפנה סימטרית:</strong> מפתח סודי יחיד ומשותף משמש להצפנה ולפענוח (כגון AES). מהירה מאוד, אידיאלית לנפחי נתונים גדולים, אך דורשת ערוץ מאובטח להחלפת המפתח הסודי.</li>
  <li><strong>הצפנה אסימטרית (מפתח ציבורי):</strong> זוג מפתחות — מפתח ציבורי המשמש להצפנה או לאימות חתימה, ומפתח פרטי המשמש לפענוח או ליצירת חתימה (כגון RSA, ECC, Diffie-Hellman). איטית וצורכת כוח חישוב רב.</li>
  <li><strong>הצפנה היברידית (Hybrid Encryption):</strong> השילוב המנצח המשמש בפרוטוקולי TLS/HTTPS — שימוש בהצפנה אסימטרית בתחילת החיבור לצורך אימות הדדי של הצדדים והסכמה מאובטחת על מפתח שיחה סודי ארעי (Session Key), ולאחר מכן מעבר להצפנה סימטרית מהירה (AES) לכל שאר תעבורת הנתונים.</li>
  <li><strong>עקרון קרקהופס (Kerckhoffs):</strong> הסודיות נמצאת במפתח, לא באלגוריתם. הסתרת הצופן אינה הגנה; מפתח שנחשף מוחלף, והאלגוריתם נשאר ציבורי וניתן לביקורת.</li>
  <li><strong>פנקס חד־פעמי (One-Time Pad):</strong> נותן סודיות מושלמת אם המפתח אקראי, באורך ההודעה, וחד־פעמי. נבדל מצופן מעשי בכך שהפצת המפתח אינה מעשית לנפח, ומפתח שנעשה בו שימוש חוזר שובר את הסודיות.</li>
</ul>

<p><strong>אימות שלמות וזהות ברשת:</strong></p>
<ul>
  <li><strong>קוד אימות הודעה (MAC / HMAC):</strong> מנגנון המשלב מפתח סודי משותף יחד עם פונקציית גיבוב קריפטוגרפית (כגון SHA-256) להבטחת שלמות ואימות מקור ההודעה. <strong>מוקש בחינה מובהק:</strong> אין שום קשר לכתובת MAC הפיזית של כרטיס הרשת!</li>
  <li><strong>חתימה דיגיטלית ושרשרת אמון (PKI):</strong> השולח חותם על גיבוב ההודעה במפתחו הפרטי, והמקבל מוודא באמצעות המפתח הציבורי. סמכות תעודות (Certificate Authority - CA) חותמת דיגיטלית על תעודות הקושרות זהות מאומתת למפתח ציבורי, ובכך בונה את שרשרת האמון.</li>
  <li><strong>אימות תעודה:</strong> בודקים שם מארח, תוקף, שרשרת אמון מול סמכות סרטיפיקטים (Certificate Authority), וביטול. חתימה תקינה אינה מספיקה: תעודה שפגה, שבוטלה, או שאינה שייכת לשם המארח — נדחית.</li>
</ul>

<p><strong>איום המחשוב הקוונטי והצפנה פוסט־קוונטית (PQC):</strong></p>
<ul>
  <li><strong>הצפנה פוסט־קוונטית (PQC - Post-Quantum Cryptography):</strong> אלגוריתם שרץ על מחשב רגיל ועמיד לתקיפה ממחשב קוונטי. נבדלת מהצפנה אסימטרית קלאסית, שאלגוריתם שור מפצח; ההגנה היא בחירת אלגוריתם עמיד, לא מעבר לחומרה קוונטית.</li>
  <li><strong>אלגוריתם שור (Shor's Algorithm):</strong> פותר פירוק לגורמים ראשוניים ולוגריתם בדיד בזמן פולינומי, ומפצח באופן מוחלט את כל ההצפנה האסימטרית הקלאסית: RSA, Diffie-Hellman ו־ECC.</li>
  <li><strong>אלגוריתם גרובר (Grover's Algorithm):</strong> מאיץ חיפוש ממצה ומוציא שורש ריבועי ממרחב המפתחות, מה שחוצה למעשה את חוזק האבטחה של צפנים סימטריים וגיבובים. פתרון מגן: הגדלת אורך המפתחות (מעבר ל־AES-256 ו־SHA-512 לשמירה על רמת הגנה שוות ערך ל־128 סיביות).</li>
  <li><strong>איום "אגור עכשיו, פענח אחר כך" (Harvest now, decrypt later):</strong> תוקפים מקליטים ושומרים תעבורה מוצפנת כיום, מתוך כוונה לפענח אותה בעתיד באמצעות מחשב קוונטי.</li>
  <li><strong>תקני PQC מובילים (NIST):</strong> Crystals-Kyber (ML-KEM) למנגנון עטיפת מפתחות; Crystals-Dilithium (ML-DSA), SPHINCS+, Falcon לחתימות דיגיטליות עמידות לקוונטום.</li>
</ul>

<p><strong>מתקפות רשת נפוצות ואפחות:</strong> מתקפת אדם־באמצע (MITM) מסוכלת ע״י הצפנה ואימות הדדי של תעודות דיגיטליות (TLS).</p>
<ul>
  <li><strong>שידור חוזר (Replay):</strong> הודעה מוצפנת במפתח תקין עדיין ניתנת לשידור שוב, כי ההצפנה אינה מוכיחה שההודעה חדשה. הטריות מגיעה ממספר חד־פעמי (Nonce), חותמת זמן (Timestamp) או מונה עולה, והצד המקבל דוחה ערך שכבר נראה.</li>
  <li><strong>מניעת שירות (DoS) מול מניעת שירות מבוזרת (DDoS):</strong> DoS ממצה משאב ממקור אחד; DDoS עושה זאת ממקורות רבים. חסימת כתובת יחידה אינה עוצרת מתקפה מבוזרת; מגבילים קצב בקשות, מכסות משאבים, וזמני קצוב לחיבורים פתוחים.</li>
</ul>`
      }
    ]
  },
  {
    unit: "6",
    title: "יחידה 6 · מחשוב ענן ויישומי רשת",
    intro: "יחידה 6 עוסקת בעולם יישומי הווב ומחשוב הענן: מארכיטקטורת HTTP, עוגיות ומודל האבטחה של הדפדפן (SOP, XSS, CSRF), דרך מודלי שירות בענן (IaaS, PaaS, SaaS, FaaS) והאחריות המשותפת, ועד לווירטואליזציה (מכונות וירטואליות והיפרוויזרים מול קונטיינרים) ותכנון ארגז חול (Sandbox) דפנסיבי להרצת קוד לקוח זר.",
    parts: [
      {
        id: "web",
        title: "פרוטוקול HTTP, ניהול מושב ועוגיות, SOP,‏ XSS ו־CSRF",
        html: `<p><strong>פרוטוקול HTTP ובקשות GET מול POST:</strong> פרוטוקול HTTP הוא פרוטוקול חסר מצב (Stateless) הפועל במודל בקשה-תשובה. בקשת GET מיועדת לשליפת מידע לקריאה; הפרמטרים מועברים בשורת הכתובת (URL/Query String), נשמרים בהיסטוריית הדפדפן וביומני השרת, ואסור להשתמש בה לפעולות המשנות את מצב המערכת. בקשת POST מעבירה נתונים בגוף הבקשה (Body) ומיועדת לפעולות כתיבה, עדכון או מחיקה.</p>
<ul>
  <li><strong>401 מול 403:</strong> 401 הוא היעדר אימות (Authentication): הלקוח לא הוכיח זהות. 403 הוא היעדר הרשאה (Authorization): הזהות ידועה, אך הפעולה אינה מותרת לה.</li>
</ul>

<p><strong>עוגיות (Cookies) וניהול מושב:</strong> כדי לנהל מצב מעל HTTP, השרת מנפיק עוגיה המכילה מזהה מושב אקראי (Session ID). מי שמחזיק בעוגיה מייצג את המשתמש במערכת. דגלי אבטחה קריטיים לעוגיות:</p>
<ul>
  <li><code>HttpOnly</code>: חוסם לחלוטין גישה לעוגיה מתוך סקריפטים בדפדפן (<code>document.cookie</code>), ובכך מונע גניבת מושב בעת מתקפת XSS.</li>
  <li><code>Secure</code>: מבטיח שהעוגיה תישלח אך ורק מעל ערוץ HTTPS מוצפן, ובכך מונע יירוט ע״י ציתות ברשת (MITM).</li>
  <li><code>SameSite</code>: מגדיר מתי העוגיה יוצאת בבקשה מדומיין אחר, וזהו קו הגנה מפני CSRF. <code>Strict</code> לא נשלח בבקשה מדומיין אחר; <code>Lax</code> נשלח בניווט GET בטוח; <code>None</code> נשלח תמיד, ורק יחד עם <code>Secure</code>.</li>
</ul>

<p><strong>מדיניות המוצא הזהה (SOP - Same-Origin Policy):</strong> מודל האבטחה הבסיסי של הדפדפן. "מוצא" (Origin) מוגדר כשלישייה: <strong>(פרוטוקול, דומיין, פורט)</strong>. ה־SOP מונע מסקריפט הנטען ממוצא אחד לקרוא תוכן DOM, עוגיות או תשובות רשת ממוצא אחר (שיתוף מבוקר מתאפשר באמצעות כותרות CORS). <strong>חשוב לבחינה:</strong> SOP אינו מונע שליחת בקשות כותבות (כגון שליחת טופס POST ממוצא זר)!</p>

<p><strong>מתקפת הזרקת סקריפטים (XSS - Cross-Site Scripting):</strong> החדרת קוד JavaScript זדוני לדפדפן של משתמש קורבן. שמור (Stored) נשמר בשרת ופוגע בכל צופה; מוחזר (Reflected) חוזר באותה תשובה; מבוסס DOM רץ בדפדפן בלי שהשרת שמר את המטען. הקוד הזדוני רץ תחת המוצא הלגיטימי של האתר ועוקף את ה־SOP. מניעה: קידוד פלט מותאם־הקשר (Context-aware escaping), אימות קלט מבוסס רשימה לבנה, מדיניות אבטחת תוכן (CSP - Content Security Policy), ושימוש בעוגיות <code>HttpOnly</code>.</p>

<p><strong>מתקפת זיוף בקשות בין־אתריות (CSRF - Cross-Site Request Forgery):</strong> ניצול העובדה שהדפדפן מצרף אוטומטית עוגיות אימות לכל בקשה היוצאת לדומיין היעד. הקורבן מבקר באתר תוקף, והאתר שולח בשמו בקשה משנת־מצב (כגון העברת כספים או שינוי סיסמה) אל שרת היעד. התוקף אינו רואה את התשובה (עקב SOP), אך הפעולה מתבצעת. מניעה: אסימוני אנטי־CSRF סודיים ובלתי ניתנים לניבוי (Synchronizer Tokens) המאומתים בשרת, עוגיות <code>SameSite=Strict/Lax</code>, ובדיקת כותרות <code>Origin</code> ו־<code>Referer</code>.</p>`
      },
      {
        id: "svc",
        title: "ארכיטקטורות שרתי ווב, מודלי שירות בענן (IaaS/PaaS/SaaS/FaaS) ו־Tor",
        html: `<p><strong>ארכיטקטורות שרתי אינטרנט:</strong></p>
<ul>
  <li><strong>שרת סטטי (Static Web Server):</strong> ממפה נתיבי URL לקבצים פיזיים בדיסק (HTML, CSS, תמונות) ומגיש אותם ללא עיבוד לוגיקה יישומית. מהיר ומאובטח מאוד, אך מוגבל לתוכן קבוע.</li>
  <li><strong>מעבר נתיבים (Path Traversal):</strong> בקשה שמטפסת אל קובץ מחוץ לתיקייה שנועדה להגשה. מנרמלים את הנתיב כך שיישאר תחת שורש המסמכים, ומריצים את התהליך בהרשאת קריאה מינימלית, כדי שגם נתיב שעקף בדיקה לא יגיע לסוד.</li>
  <li><strong>ממשק שער משותף (CGI - Common Gateway Interface):</strong> מנגנון היסטורי שבו השרת מייצר תהליך חדש של מערכת ההפעלה עבור כל בקשת HTTP נכנסת. סובל מתקורה כבדה וזמני תגובה איטיים, ורגיש למתקפות DoS עקב הצפת תהליכים. משתני הסביבה וגוף הבקשה הם קלט לקוח עוין; שרשור שלהם לשאילתה או לפקודת מערכת הוא כשל.</li>
  <li><strong>יישומי רשת מודרניים (Web Applications / WSGI / FastCGI):</strong> תהליך שרת ייעודי ורציף המנהל מאגר חוטים (Thread Pool) או לולאת אירועים אסינכרונית, מטפל בבקשות בזיכרון, מתחבר למסד נתונים ומבצע לוגיקה עסקית מורכבת.</li>
</ul>

<p><strong>מודלי שירות במחשוב ענן:</strong></p>
<ul>
  <li><strong>IaaS (Infrastructure as a Service):</strong> אספקת תשתית חומרה וירטואלית גולמית — מכונות וירטואליות, נפחי אחסון ורשת (למשל AWS EC2). הלקוח אחראי על התקנת מערכת ההפעלה, עדכוני אבטחה, סביבת זמן הריצה וקוד היישום.</li>
  <li><strong>PaaS (Platform as a Service):</strong> אספקת סביבת פיתוח והרצה מנוהלת (למשל Google App Engine). הספק אחראי על החומרה, מערכת ההפעלה והשרתים; הלקוח מעלה אך ורק את קוד היישום והנתונים.</li>
  <li><strong>FaaS / Serverless (Function as a Service):</strong> הרצת פונקציות בודדות מונעות־אירועים (למשל AWS Lambda). התרחבות אוטומטית מ־0 משאבים וחיוב על זמן ביצוע נטו במילי־שניות. סיכונים: הזרקת אירועים (Event Injection) והרשאות יתר בתפקידי IAM.</li>
  <li><strong>SaaS (Software as a Service):</strong> יישום תוכנה מוגמר המסופק דרך הדפדפן (למשל Gmail, Microsoft 365). הספק מנהל את כל השכבות; הלקוח מנהל רק משתמשים והרשאות קצה.</li>
</ul>

<p><strong>מודל האחריות המשותפת (Shared Responsibility Model) — עקרון ברזל:</strong> ספק הענן אחראי על אבטחת התשתית הפיזית ("Security OF the Cloud"). הלקוח אחראי תמיד על אבטחת המידע שלו ("Security IN the Cloud") — כולל ניהול הרשאות, מניעת הזרקות SQL ו־XSS, והגנה על מפתחות גישה. העברת שרת לענן אינה מתקנת באגים באפליקציה!</p>

<p><strong>Web 2.0, רשת עמוקה (Deep Web) ו־Tor:</strong></p>
<ul>
  <li><strong>Web 2.0:</strong> מעבר מאתרים סטטיים לאתרים המבוססים על תוכן שנוצר ע״י המשתמשים (User-Generated Content). תוכן זה מהווה גבול אמון מרכזי ומשטח תקיפה פורה להזרקות XSS והעלאת קבצים זדוניים.</li>
  <li><strong>הרשת העמוקה (Deep Web):</strong> כלל התכנים ברשת שאינם מאונדקסים ע״י מנועי חיפוש סטנדרטיים (מאגרי מידע פנימיים, תיבות דוא״ל, פורטלים מאובטחים). מונח טכני ניטרלי שאינו מעיד על פשיעה או פעילות בלתי חוקית.</li>
  <li><strong>רשת Tor (The Onion Router):</strong> רשת ניתוב בצל המנתבת תעבורה דרך שלושה ממסרים אקראיים (ממסר כניסה, ממסר אמצע, וממסר יציאה) כדי להסתיר את כתובת ה־IP של המשתמש. <strong>מוקש בחינה קריטי:</strong> Tor אינו תחליף להצפנת TLS! ממסר היציאה (Exit Node) רואה את כל תעבורת הנתונים בגלוי אם המשתמש אינו גולש מעל HTTPS.</li>
</ul>`
      },
      {
        id: "cloud",
        title: "וירטואליזציה: מכונה וירטואלית (VM) מול קונטיינר (Container)",
        html: `<p><strong>מאפייני מחשוב ענן (NIST):</strong> שירות עצמי לפי דרישה, גישה רחבת־פס, איגום משאבים וריבוי דיירים (Multi-tenancy — סכנת "השכן הרועש" הנוטל משאבים משכניו ללא מכסות), אלסטיות מהירה, ושירות מדיד (Pay-as-you-go).</p>

<p><strong>מכונה וירטואלית (Virtual Machine — VM) ו־Hypervisor:</strong></p>
<ul>
  <li>וירטואליזציה מלאה ברמת החומרה. ה־Hypervisor (VMM) מנהל חומרה מדומה לכל מכונה.
    <ul>
      <li><strong>Hypervisor סוג 1 (Bare-Metal):</strong> רץ ישירות על גבי החומרה הפיזית ללא מערכת הפעלה מארחת (למשל VMware ESXi, KVM, Xen). ביצועים מעולים, תקורה אפסית, ומשטח תקיפה מינימלי.</li>
      <li><strong>Hypervisor סוג 2 (Hosted):</strong> רץ מעל מערכת הפעלה מארחת (למשל VirtualBox, VMware Workstation). נוח לפיתוח אך בעל תקורה גבוהה יותר.</li>
    </ul>
  </li>
  <li><strong>מאפיין מהותי: לכל מכונה וירטואלית יש ליבת מערכת הפעלה (Kernel) נפרדת ועצמאית משלה!</strong> בידוד חזק במיוחד מבוסס חומרה; פריצה החוצה (VM Escape) נדירה ביותר ומחייבת באג בהיפרוויזר עצמו.</li>
</ul>

<p><strong>וירטואליזציה ברמת מערכת ההפעלה — קונטיינרים (Containers / Docker):</strong></p>
<ul>
  <li>בידוד תהליכים מעל אותה מערכת הפעלה באמצעות יכולות ליבת לינוקס:
    <ul>
      <li><strong>Namespaces (מרחבי שמות):</strong> מבודדים את שדה הראייה של התהליך (תהליכים - PID, רשת - Net, מערכת קבצים - Mount, משתמשים - User).</li>
      <li><strong>cgroups (Control Groups):</strong> מגבילים ואוכפים מכסות שימוש במשאבים פיזיים (מגבלות זיכרון RAM, זמן מעבד CPU, רוחב פס ופעולות דיסק).</li>
    </ul>
  </li>
  <li><strong>מאפיין מהותי: כל הקונטיינרים חולקים את אותה ליבת מערכת הפעלה (Host Kernel) יחד עם השרת המארח!</strong> הבידוד קל משקל ומהיר בהרבה מ־VM (עולה בשניות), אך חולשת אבטחה בליבה מאפשרת בריחה מכל הקונטיינרים (Container Breakout) והשתלטות על השרת המארח.</li>
</ul>

<p><strong>שאלת מפתח מבחינת 2025ג — מתי לבחור ב־VM ומתי ב־Container:</strong></p>
<ul>
  <li><strong>נבחר ב־VM:</strong> כאשר נדרש בידוד קשיח ומקסימלי (למשל להרצת קוד זר בלתי מהימן), להפרדת דיירים רגישים בענן ציבורי (Multi-tenancy), או כאשר נדרשת מערכת הפעלה בעלת ליבה שונה (למשל הרצת Windows על שרת לינוקס).</li>
  <li><strong>נבחר ב־Container:</strong> לפריסה זריזה של מיקרו־שירותים פנימיים מהימנים, לאריזה וניוד של סביבות פיתוח, ולמיצוי משאבים יעיל וחסכוני.</li>
</ul>`
      },
      {
        id: "iso",
        title: "מהדר מקוון, סכנות exec, בריחת סנדבוקס ובידוד רב־שכבתי",
        html: `<p><strong>תרחיש מהדר מקוון (Online Compiler / Runner):</strong> שירות ענן המקבל קוד מקור מהלקוח, מקמפל ומריץ אותו בשרת (תרחיש המבחנים 2021א ו־2024). תהליך זה מחולק לשני שלבים נפרדים: שלב הקומפילציה (סכנת DoS על המהדר) ושלב ההרצה (סכנת הרצת קוד עוין ישירות במערכת).</p>

<p><strong>הסכנות בהרצת קוד לקוח באמצעות <code>exec()</code> או תהליך חופשי:</strong> העברת קוד לקוח ללא בידוד מאפשרת <strong>הרצת קוד שרירותי (RCE)</strong>: גניבת סודות ומפתחות ענן מתוך <code>os.environ</code>, מחיקה או הצפנה של קובצי שרת, הרצת פקודות מערכת (כגון פתיחת Reverse Shell), תקיפת שרתים פנימיים ברשת המקומית, וגרימת מניעת שירות (DoS) ע״י לולאות אינסופיות או פצצת מזלג (Fork Bomb).</p>

<p><strong>אשליית ההגנה ברמת השפה (Python Sandbox Escape):</strong> ניסיון להגביל את המפרש ע״י ריקון סביבת הפונקציות המובנות (כגון <code>exec(code, {"__builtins__": None})</code>) <strong>נפרץ בקלות ע״י רפלקציה!</strong> תוקף מטפס במעלה עץ ההורשה של השפה דרך <code>().__class__.__base__.__subclasses__()</code>, מאתר מחלקות טעונות בעלות גישה למודולי מערכת (כגון <code>os</code> או <code>subprocess</code>), ומפעיל פקודות מערכת ללא שום מגבלה.</p>

<p><strong>מימוש ארגז חול דפנסיבי רב־שכבתי (Sandbox Defense in Depth):</strong></p>
<ol>
  <li><strong>משתמש נטול הרשאות:</strong> הרצת תהליך הלקוח תחת משתמש מוגבל ייעודי (כגון <code>nobody</code>) ללא הרשאות שורש.</li>
  <li><strong>מערכת קבצים מבודדת:</strong> שימוש ב־<code>chroot</code> או Mount Namespace עם מערכת קבצים לקריאה בלבד (Read-only root), וספרייה זמנית קטנה מוגבלת מקום.</li>
  <li><strong>מכסות משאבים קשיחות:</strong> אכיפת מגבלות זמן מעבד (CPU Timeout עם <code>setrlimit</code>), תקרת זיכרון RAM מרבית, ומספר תהליכים מקסימלי (למניעת Fork Bomb).</li>
  <li><strong>סינון קריאות מערכת:</strong> חסימת קריאות מערכת מסוכנות ע״י <code>seccomp</code> (חסימת פתיחת שקעי רשת <code>socket</code>, יצירת תהליכים <code>fork</code>, או ביצוע פקודות <code>execve</code>).</li>
  <li><strong>בידוד רשת מלא:</strong> ניתוק מוחלט של מרחב שמות הרשת (Network Namespace ללא גישה פנימית או חיצונית).</li>
</ol>

<p><strong>מה נשאר כבעיה במבחן ("אילו בעיות נשארות?"):</strong> פרצות יום־אפס בבקר הווירטואליזציה או בהיפרוויזר, חולשות ליבה משותפת בקונטיינרים, ערוצים צדדיים (Side-Channel Attacks — מדידת זמני ריצה וצריכת זיכרון), ומניעת שירות מקומית בתוך גבולות המכסות המותרות.</p>
<ul>
  <li><strong>הסלמת הרשאות אנכית (Vertical) מול אופקית (Horizontal):</strong> אנכית מגיעה לפעולת מנהל; אופקית מגיעה לנתוני משתמש אחר באותה רמה. מאמתים זהות והרשאה בכל בקשה, לא רק ברגע הכניסה.</li>
</ul>

<p><strong>חלופה בטוחה — קריאה מרחוק (RPC / RMI):</strong> במקום לשלוח קוד פייתון או C++ חופשי להרצה בשרת, המערכת מגדירה ממשק מבוקר של פונקציות קבועות מראש (Remote Procedure Call / Method Invocation). הלקוח שולח ארגומנטים מאומתים בלבד דרך סטאב (Stub), והשרת מבצע אך ורק פעולות מורשות ומוגדרות מראש.</p>
<ul>
  <li><strong>סטאב (Stub) מול סקלטון (Skeleton):</strong> הסטאב אורז בצד הקורא, והסקלטון פורק ומפעיל בצד המרוחק. RPC מפעילה פרוצדורה; RMI (Remote Method Invocation) מפעילה מתודה על אובייקט. בשני המקרים עוברים ארגומנטים, לא קוד להרצה.</li>
  <li><strong>פריקת אובייקטים חיים:</strong> שחזור כמו <code>pickle</code> עלול להריץ קוד בצד המקבל. מעבירים מבני נתונים בלבד, לא אובייקטים חיים.</li>
</ul>`
      }
    ]
  },
  {
    unit: "7",
    title: "יחידה 7 · הגנה מפני הזרקות SQL וקוד נקי",
    intro: "יחידה 7 מתמקדת בהגנה על שכבת הנתונים ובכתיבת קוד דפנסיבי: המודל היחסי ותת-השפות של SQL (DQL, DML, DDL, DCL), עבודה נכונה עם SQLite ב-C++ ובפייתון, מנגנון הזרקות SQL (SQLi) והסיבה ששרשור ו-format נכשלים, הגנה מוחלטת באמצעות שאילתות פרמטריות ורשימות לבנות למזהים, ועקרונות Clean Code (KISS, DRY, SOLID, Guard Clauses ופירוק קוד חץ).",
    parts: [
      {
        id: "sql",
        title: "בסיס נתונים יחסי, מפתחות ותת־השפות של SQL",
        html: `<p><strong>מודל מסד נתונים יחסי (RDBMS):</strong> נתונים מאורגנים בטבלאות המורכבות משורות (רשומות / Records) ומעמודות (שדות / Attributes). כל שורה מזוהה באופן ייחודי וחד־חד־ערכי ע״י <strong>מפתח ראשי (Primary Key - PK)</strong>, שאינו יכול להכיל ערך <code>NULL</code> לעולם. קשרים בין טבלאות נאכפים באמצעות <strong>מפתח זר (Foreign Key - FK)</strong> המצביע למפתח ראשי בטבלה מקושרת, ובכך מבטיח שלמות קשרים (Referential Integrity).</p>

<p><strong>ארבע תת־השפות של SQL וההשלכות על יעדי האבטחה (CIA):</strong></p>
<ul>
  <li><strong>DQL (Data Query Language):</strong> שליפת נתונים לקריאה באמצעות פקודת <code>SELECT</code> (סינון לפי תנאים בפסוקית <code>WHERE</code>, מיון ע״י <code>ORDER BY</code>). פגיעה ע״י הזרקה מסכנת ישירות את יעד ה־<strong>סודיות (Confidentiality)</strong> ע״י דליפת מידע רגיש.</li>
  <li><strong>DML (Data Manipulation Language):</strong> שינוי תוכן הרשומות בטבלאות באמצעות <code>INSERT</code> (הוספה), <code>UPDATE</code> (עדכון), ו־<code>DELETE</code> (מחיקה). פגיעה ע״י הזרקה מסכנת ישירות את יעד ה־<strong>שלמות (Integrity)</strong> (שינוי בלתי מורשה של נתונים וציונים) ואת יעד ה־<strong>זמינות (Availability)</strong> (מחיקת מידע).</li>
  <li><strong>DDL (Data Definition Language):</strong> הגדרה ושינוי מבנה הסכימה של מסד הנתונים באמצעות <code>CREATE TABLE</code>, <code>ALTER TABLE</code>, <code>DROP TABLE</code> ו־<code>TRUNCATE</code>. פגיעה בהזרקה משמידה את מבנה המערכת כולה.</li>
  <li><strong>DCL (Data Control Language):</strong> ניהול הרשאות הגישה של משתמשי המערכת והתהליכים באמצעות פקודות <code>GRANT</code> ו־<code>REVOKE</code>.</li>
  <li><strong>קובץ שטוח מול מסד:</strong> קובץ שטוח אינו נותן אינדקס, בקרת מקביליות, ו־ACID: אטומיות (Atomicity), עקביות (Consistency), בידוד (Isolation), עמידות (Durability). בלי אלה עדכון שנקטע משאיר נתונים חלקיים, ושתי כתיבות מקבילות דורסות זו את זו.</li>
  <li><strong>SQL כשפה הצהרתית (Declarative):</strong> מצהירים את התוצאה הרצויה, והמייעל (Optimizer) בוחר את הביצוע. נבדלת משפה ציוויית, שבה סדר הפקודות עצמו הוא התוכנית.</li>
  <li><strong>מחרוזת ה־SQL היא תוכנית:</strong> המנוע מפרש אותה כהוראות, לא כנתון. ערך שמגיע מהלקוח נשאר מחוץ למחרוזת ונקשר כפרמטר.</li>
</ul>`
      },
      {
        id: "eng",
        title: "מנוע SQLite וממשקי עבודה ב־Python וב־C++",
        html: `<p><strong>ארכיטקטורת מנוע SQLite:</strong> SQLite הוא מנוע מסד נתונים עצמאי, ללא שרת (Serverless), המשולב ישירות כספריית C בתוך תהליך היישום עצמו (Embedded). הוא אינו מאזין לרשת ואינו מריץ תהליך שרת נפרד, אלא שומר את כל המאגר בתוך קובץ דיסק יחיד. אבטחת הנתונים נשענת על הרשאות הגישה של מערכת ההפעלה לקובץ.</p>

<p><strong>עבודה מול SQLite בפייתון:</strong></p>
<ul>
  <li>התחברות: <code>conn = sqlite3.connect("app.db")</code> (במקרה של שגיאה נזרקת חריגת <code>sqlite3.Error</code>).</li>
  <li>ביצוע שאילתה פרמטרית: <code>cursor.execute("SELECT * FROM users WHERE id = ?", (uid,))</code>. <strong>מוקש תחבירי בבחינה:</strong> עבור פרמטר בודד חובה לכלול פסיק בתוך הסוגריים <code>(uid,)</code> כדי להגדירו כטאפל חוקי!</li>
  <li>קיבוע שינויים (Commit): עבור פעולות DML (כגון INSERT או UPDATE), חובה לקרוא ל־<code>conn.commit()</code> כדי לשמור את השינויים בדיסק.</li>
  <li>הוספת אצווה יעילה: שימוש ב־<code>cursor.executemany(sql, rows)</code> בטרנזקציה אחת מונע פתיחה ונעילה חוזרת של הקובץ ומאיץ ביצועים פי כמה.</li>
  <li><strong>הזנת CSV:</strong> קובץ CSV הוא קלט עוין: מאמתים שדות וממירים טיפוס לפני הכתיבה. מפתח ראשי עם <code>INSERT OR IGNORE</code> מונע כפילות, וההזנה היא אצווה פרמטרית ולא שרשור השורה אל השאילתה.</li>
  <li><strong>אין משתמשי <code>GRANT</code> ב־SQLite:</strong> מי שקורא את הקובץ שולט במסד. אין למקם את הקובץ בתיקייה ציבורית של שרת הווב; ההגנה היא הרשאת הקובץ במערכת ההפעלה.</li>
</ul>

<p><strong>עבודה מול SQLite ב־C/C++ (sqlite3 C API) — מלכודות בחינה קריטיות:</strong></p>
<ul>
  <li>הכנת שאילתה (Prepare): <code>sqlite3_prepare_v2(db, sql, -1, &amp;stmt, nullptr)</code> מקמפל את תבנית השאילתה מראש לעץ פקודות בינארי.</li>
  <li>קשירת ערכים (Bind): <code>sqlite3_bind_text(stmt, 1, text, -1, SQLITE_TRANSIENT)</code>. <strong>מוקש בחינה מובהק: אינדקס הפרמטרים בקשירה (Bind) מתחיל מ־1 (ולא מ־0)!</strong></li>
  <li>צעידה (Step): <code>sqlite3_step(stmt)</code> מריץ שלב. מחזיר <code>SQLITE_ROW</code> כאשר יש שורה זמינה לקריאה, או <code>SQLITE_DONE</code> בסיום.</li>
  <li>שליפת עמודה (Column): <code>sqlite3_column_text(stmt, 0)</code>. <strong>מוקש בחינה מובהק: אינדקס העמודות בשליפה מתחיל מ־0!</strong> (השילוב: Bind מתחיל ב־1, Column מתחיל ב־0).</li>
  <li>שחרור משאבים: חובה לקרוא ל־<code>sqlite3_finalize(stmt)</code> למניעת דליפת זיכרון. פונקציית <code>sqlite3_exec()</code> מתאימה לפקודות DDL סטטיות בלבד ואינה תומכת בקשירת פרמטרים.</li>
</ul>`
      },
      {
        id: "inj",
        title: "הזרקות SQL, אשליות הגנה ושאילתות פרמטריות",
        html: `<p><strong>מנגנון התקפת הזרקת SQL (SQL Injection - SQLi):</strong> מתרחש כאשר קלט בלתי מאומת מהמשתמש משורשר ישירות למחרוזת השאילתה. תוקף מזין תו גרש (<code>'</code>) כדי לפרוץ מתוך גבולות הליטרל הטקסטואלי, ומזריק פקודות SQL משלו. הזנת תנאי טאוטולוגיה כגון <code>' OR '1'='1</code> או <code>' OR 1=1 --</code> הופכת את פסוקית הסינון לנכונה תמיד ומחזירה את כל שורות הטבלה (עקיפת אימות ודליפת מידע). תווי ההערה <code>--</code> מנטרלים את המשך השאילתה המקורית.</p>

<p><strong>אשליות הגנה — מדוע שרשור, format ו־f-strings נכשלים לחלוטין:</strong></p>
<ul>
  <li>שימוש ב־f-strings (כגון <code>f"SELECT * FROM users WHERE name = '{name}'"</code>) או ב־<code>format()</code> בפייתון <strong>אינו מגן כלל!</strong> פענוח המחרוזת נעשה ע״י פייתון עוד לפני שהשאילתה מגיעה למסד הנתונים. כאשר המחרוזת מגיעה למנוע ה־SQL, המפרסר רואה את תווי התוקף כהוראות תחביריות לכל דבר.</li>
  <li>סינון ידני (Blacklist) או מילוט תווים (Escaping) נכשלים מול הזרקות מספריות ללא גרשים (כגון <code>WHERE id = 5 OR 1=1</code>), פענוח כפול, או סוגי קידוד מורכבים.</li>
</ul>

<p><strong>הפתרון התקני: שאילתות פרמטריות (Parameterized Queries / Prepared Statements):</strong> תבנית ה־SQL עם סימני שאלה (<code>?</code>) נשלחת למסד הנתונים ומקומפלת מראש לעץ פקודות בינארי. ערכי הפרמטרים מועברים בנפרד ומטופלים ע״י המנוע כנתונים גולמיים (Literals) בלבד. קלט התוקף לעולם לא יפורש כהוראת SQL, גם אם יכיל גרשים, רווחים או פקודת <code>DROP TABLE</code>.</p>

<p><strong>מלכודת הבחינה העליונה — שמות טבלאות ועמודות (Identifiers):</strong> מצייני מקום (<code>?</code>) משמשים לערכי נתונים בלבד! <strong>לא ניתן להשתמש ב־<code>?</code> עבור שמות טבלאות או שמות עמודות (למשל בפסוקית <code>ORDER BY ?</code>)</strong>. אם שם עמודה או טבלה מתקבל ממשתמש, ההגנה היחידה היא <strong>רשימה לבנה קשיחה (Strict Whitelist) בקוד</strong>: בדיקה שהשם המבוקש קיים בקבוצה סגורה של שמות מאושרים, ורק אז שרשורו לשאילתה.</p>
<ul>
  <li><strong>שלוש משפחות לפי ערוץ החזרת המידע:</strong> בתוך הערוץ (In-band) הנתונים חוזרים בתשובת השאילתה; עיוורת (Blind) מסיקה משינוי בהתנהגות, בלי שהשורות עצמן חוזרות; מחוץ לערוץ (Out-of-band) התשובה יוצאת בערוץ אחר. ההבחנה היא רק איך המידע חוזר; ההגנה בכולן היא שאילתה פרמטרית.</li>
  <li><strong>פרוצדורה מאוחסנת (Stored Procedure):</strong> מגנה רק כשהשאילתה בתוכה סטטית ופרמטרית. אם היא מרכיבה את מחרוזת ה־SQL מהקלט, ההזרקה נשארת בתוך הפרוצדורה.</li>
  <li><strong>חשבון היישום והרשת:</strong> החשבון מקבל רק שליפה ושינוי נתונים (DQL ו־DML), לא הגדרת סכימה או הרשאות. המסד יושב ברשת פנימית, ולא נפתח לאינטרנט יחד עם שרת הווב.</li>
</ul>`
      },
      {
        id: "cln",
        title: "עקרונות קוד נקי ותכנות דפנסיבי (Clean Code & SOLID)",
        html: `<p><strong>עקרונות יסוד בקוד נקי ובטיחותי:</strong></p>
<ul>
  <li><strong>KISS (Keep It Simple, Stupid):</strong> העדפת פשטות וקריאות. קוד פשוט קל לבדיקה, לתחזוקה ולביקורת אבטחה. <strong>חוק קרניגן (Kernighan's Law):</strong> "ניפוי שגיאות (Debugging) קשה פי שניים מכתיבת הקוד מלכתחילה. לכן, אם אתם כותבים את הקוד בצורה הכי מתוחכמת שאתם יכולים, לפי ההגדרה אינכם חכמים מספיק כדי לנפות ממנו שגיאות".</li>
  <li><strong>DRY (Don't Repeat Yourself):</strong> מניעת שכפול קוד. שכפול שאילתות או בדיקות אבטחה גורם לכך שתיקון באג במקום אחד ישאיר מקומות מקבילים פרוצים. ייבוש־יתר (wrong DRY) הוא הקיצון ההפוך: פונקציה אחת שמשרשרת שמות טבלאות ומחזירה את ההזרקה.</li>
  <li><strong>עקרונות SOLID באבטחה:</strong>
    <ul>
      <li><em>Single Responsibility (SRP):</em> מחלקה אחת אחראית על פעולה אחת. <strong>דוגמת בחינה:</strong> מחלקה שגם פותחת שקע תקשורת, גם מחשבת מחיר וגם מייצרת דף HTML מפרה את SRP לחלוטין ויש להפרידה לשלוש שכבות נפרדות.</li>
      <li><em>Open/Closed (OCP):</em> פתוח להרחבה, סגור לשינוי. מנוע השאילתות נשאר סגור, וההרחבה היא פרמטרים ולא שרשור אל מחרוזת ה־SQL.</li>
      <li><em>Liskov Substitution (LSP):</em> יורש חייב להתאים לכל מקום של האב מבלי לשבור חוזי אבטחה.</li>
      <li><em>Interface Segregation (ISP):</em> ממשקים קטנים וממוקדים, מניעת חשיפת שיטות ניהול רגישות למי שאינו זקוק להן.</li>
      <li><em>Dependency Inversion (DIP):</em> תלות באבסטרקציות ולא במימושים קונקרטיים. הלוגיקה אינה קוראת ישירות ל־API של המסד, כדי שאפשר לבדוק אותה בלי המסד.</li>
    </ul>
  </li>
  <li><strong>פירוק "קוד חץ" (Arrow Anti-Pattern):</strong> קינון עמוק ומסורבל של תנאי <code>if</code> הופך קוד לבלתי קריא ומסתיר כשלי אבטחה. הפתרון הדפנסיבי: שימוש ב־<strong>תנאי שמירה ויציאה מוקדמת (Guard Clauses / Early Return)</strong> — בדיקת תנאי שגיאה או קלט לא חוקי בראש הפונקציה ויציאה מיידית, תוך שמירה על הנתיב הראשי שטוח וקריא.</li>
  <li><strong>שמות בעלי משמעות והעלמת מספרי קסם:</strong> החלפת ערכים קבועים מסתוריים בקבועים בעלי שמות מפורשים (כגון <code>MAX_BUFFER_SIZE = 1024</code>).</li>
  <li><strong>הערות מסבירות (Why, Not What):</strong> תיעוד הרציונל והשיקול הביטחוני שמאחורי הקוד, ולא חזרה על הפעולה התחבירית הברורה מאליה.</li>
</ul>`
      }
    ]
  }
];
