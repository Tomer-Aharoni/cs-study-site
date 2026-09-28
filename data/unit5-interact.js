window.UNIT5_QUIZZES = [
  {
    id: "u5-osi4",
    prompt: "מה מאפיין את שכבת התובלה במודל OSI, לפי המצגת?",
    options: [
      { id: "a", text: "רק מתח וסיב אופטי." },
      { id: "b", text: "קצה-לקצה, חלוקה ליחידות, אפשר ערוץ לפי סדר או הודעות בלי אחריות לסדר." },
      { id: "c", text: "רק כתובות MAC." },
    ],
    answer: "b",
    explain: "פיזית=תווך. ערוץ=מסגרות ו-MAC. רשת=ניתוב וחבילות.",
  },
  {
    id: "u5-ipv4",
    prompt: "IPv4 לפי דף התיקונים והמצגת?",
    options: [
      { id: "a", text: "128 סיביות כמו IPv6." },
      { id: "b", text: "32 סיביות: ארבעה בתים של 8. ייצוג נפוץ בארבעה מספרים 0–255." },
      { id: "c", text: "48 סיביות כמו MAC." },
    ],
    answer: "b",
    explain: "MAC 48. IPv6 128. NAT כשחסרות כתובות ציבוריות. מסכת רשת מפרידה קידומת מארח.",
  },
  {
    id: "u5-mask",
    prompt: "למה משמשת מסכת רשת (subnet mask) ב-IPv4?",
    options: [
      { id: "a", text: "להצפין את החבילה כמו AES." },
      { id: "b", text: "לסמן אילו סיביות הן קידומת הרשת (AND עם הכתובת) ואילו שייכות למארח באותה רשת." },
      { id: "c", text: "רק לקבוע את מספר הפורט." },
    ],
    answer: "b",
    explain: "CIDR כמו /24 הוא אותה קידומת במספר סיביות. NAT מתרגם כתובות פרטיות לציבוריות ואינו חומת אש.",
  },
  {
    id: "u5-tcpudp",
    prompt: "SOCK_STREAM מול SOCK_DGRAM?",
    options: [
      { id: "a", text: "שניהם UDP." },
      { id: "b", text: "STREAM = זרם TCP אמין ומסודר; DGRAM = מנות UDP ללא הבטחת מסירה או סדר." },
      { id: "c", text: "רק הבדל של פורט." },
    ],
    answer: "b",
    explain: "פורט 16 סיביות בשניהם. TCP הוא זרם בתים ואינו שומר גבולות הודעה; UDP שומר גבול של datagram.",
  },
  {
    id: "u5-htons",
    prompt: "למה htons לפני פורט בשקע?",
    options: [
      { id: "a", text: "רק לייפוי הדפסה." },
      { id: "b", text: "ממיר short מסדר המחשב לסדר רשת (big-endian) של IP." },
      { id: "c", text: "פותח חומת אש." },
    ],
    answer: "b",
    explain: "בלי המרה על little-endian הפורט ישודר הפוך.",
  },
  {
    id: "u5-acc",
    prompt: "מה accept עושה בשרת TCP?",
    options: [
      { id: "a", text: "מחליף את socket המאזין ולא ניתן להאזין שוב." },
      { id: "b", text: "שולף בקשה מהתור ויוצר שקע חדש לשיחה; המאזין ממשיך." },
      { id: "c", text: "רק bind נוסף." },
    ],
    answer: "b",
    explain: "listen עם backlog מגדיר את התור. הלקוח עושה connect.",
  },
  {
    id: "u5-gilq",
    prompt: "GIL בפייתון (CPython) אומר ש…",
    options: [
      { id: "a", text: "חוטים תמיד מנצלים את כל הליבות ל-bytecode." },
      { id: "b", text: "חוטי פייתון לא רצים במקביל על bytecode; לחישוב כבד — multiprocessing." },
      { id: "c", text: "אין שקעים בפייתון." },
    ],
    answer: "b",
    explain: "I/O עדיין נהנה מחוטים כי מחכים לרשת מחוץ ל-GIL חלק מהזמן.",
  },
  {
    id: "u5-raceq",
    prompt: "שני חוטים עושים ++ לעשר על אותו int בלי מנעול. מה נכון?",
    options: [
      { id: "a", text: "תמיד 20 כי ++ אטומי בכל מכונה." },
      { id: "b", text: "זה מרוץ נתונים והתנהגות C++ אינה מוגדרת; משתמשים ב־mutex או ב־atomic מתאים." },
      { id: "c", text: "רק GIL של פייתון רלוונטי ב-C++." },
    ],
    answer: "b",
    explain: "\"איבוד עדכון\" מסביר את האינטואיציה, אך התקן אינו מבטיח רק תוצאה קטנה מ־20. גישות מתנגשות ללא סנכרון הן undefined behavior.",
  },
  {
    id: "u5-selq",
    prompt: "למה Selector במקום תהליך לכל לקוח?",
    options: [
      { id: "a", text: "כי TCP אוסר חוטים." },
      { id: "b", text: "תהליך לכל חיבור יקר וחשוף להצפה (DoS). Selector מטפל בערוצים מוכנים בלי חסימה לכל אחד." },
      { id: "c", text: "רק בשביל UDP." },
    ],
    answer: "b",
    explain: "DefaultSelector בפייתון כנקודת התחלה במצגת.",
  },
  {
    id: "u5-hyb",
    prompt: "במודל ההיברידי במצגת, אחרי שיש מפתח סימטרי לשני הצדדים — במה מצפינים את הנתונים?",
    options: [
      { id: "a", text: "רק במפתח הפומבי לכל בית." },
      { id: "b", text: "בהצפנה סימטרית; האסימטרית שימשה להעברת המפתח." },
      { id: "c", text: "בלי הצפנה, רק htons." },
    ],
    answer: "b",
    explain: "אסימטרי יקר יותר ומשמש להסכמה/העברת מפתח ולאימות; סימטרי לנפח. בפרוטוקול מודרני משתמשים גם בהצפנה מאומתת ובודקים תעודה.",
  },
  {
    id: "u5-mitm",
    prompt: "MITM מול Replay — ההבחנה הדפנסיבית?",
    options: [
      { id: "a", text: "אותו דבר לגמרי." },
      { id: "b", text: "MITM: גורם על הנתיב קורא/משנה. Replay: הודעה ישנה משודרת שוב. אפחות שונות: TLS+תעודה מול nonce/מונה." },
      { id: "c", text: "רק DoS קשור לרשת." },
    ],
    answer: "b",
    explain: "DoS ממצה משאבים. שלושתם שמות בסיום המצגת.",
  },
  {
    id: "u5-pqcq",
    prompt: "Harvest now, decode later אומר ש…",
    options: [
      { id: "a", text: "אין טעם לעדכן הצפנה עד 2100." },
      { id: "b", text: "אפשר להקליט היום ולפענח בעתיד במחשב קוונטי — לכן PQC עכשיו." },
      { id: "c", text: "רק NAT." },
    ],
    answer: "b",
    explain: "NIST: Kyber, Dilithium, SPHINCS+, Falcon במצגת. שור שובר RSA/DH/ECC; גרובר מחליש AES/SHA/MAC בלי אותו שבירה.",
  },
  {
    id: "u5-shor",
    prompt: "מה מבדיל את אלגוריתם שור מאלגוריתם גרובר בהשפעה על הצפנה?",
    options: [
      { id: "a", text: "שניהם שוברים AES לגמרי כמו RSA." },
      { id: "b", text: "שור פוגע בבעיות מפתח ציבורי קלאסיות (RSA, Diffie–Hellman, ECC). גרובר מאיץ חיפוש גס ולכן מחליש AES/SHA/MAC — מגדילים מפתח, לא מחליפים משפחה באותו אופן." },
      { id: "c", text: "גרובר שובר רק תעודות, שור שובר רק Wifi." },
    ],
    answer: "b",
    explain: "קיובית לא מאיצה כל בעיה. TLS נפגע בעיקר בחלק האסימטרי של הסכמת המפתח.",
  },
  {
    id: "u5-p2p",
    prompt: "עמית-לעמית (peer-to-peer) לפי המצגת?",
    options: [
      { id: "a", text: "רק שרת אחד מרכזי." },
      { id: "b", text: "כל צומת מתפקד גם כלקוח וגם כשרת." },
      { id: "c", text: "רק שכבה פיזית." },
    ],
    answer: "b",
    explain: "יישום (שכבה 7) קובע client-server או P2P.",
  },
  {
    id: "u5-tcp-framing",
    prompt: "לקוח שלח הודעה של 1,000 בתים בקריאת send אחת. מה שרת TCP רשאי לקבל ב־recv הראשון?",
    options: [
      { id: "a", text: "בדיוק 1,000 בתים תמיד." },
      { id: "b", text: "כל מספר חיובי עד גודל החוצץ; TCP הוא זרם, ולכן צריך מסגור ולולאת קבלה." },
      { id: "c", text: "תמיד בית אחד בלבד." },
    ],
    answer: "b",
    explain: "גבולות send אינם גבולות recv. הפרוטוקול מגדיר אורך, מפריד או גודל קבוע ותקרת הודעה; recv שמחזיר 0 מציין EOF מסודר.",
  },
  {
    id: "u5-mitm-replay",
    prompt: "למה הצפנה בלבד אינה בהכרח מספיקה להגנת הודעה?",
    options: [
      { id: "a", text: "כי היא תמיד חושפת את המפתח." },
      { id: "b", text: "כי בלי אימות זהות (תעודה) אדם-באמצע יכול להגיש מפתח משלו; Replay דורש גם freshness (nonce או מונה)." },
      { id: "c", text: "כי htons כבר מספק הצפנה." },
    ],
    answer: "b",
    explain: "סודיות לבדה לא מזהה שינוי ולא מוכיחה מי העמית. במצגת: MITM ו־Replay לצד ההצפנה ההיברידית.",
  },
  {
    id: "u5-sock-zero",
    prompt: "בדיקת if (sockfd == 0) אחרי socket() — מה הבעיה?",
    options: [
      { id: "a", text: "אין בעיה: 0 תמיד אומר כישלון, כמו בפייתון." },
      { id: "b", text: "כישלון הוא ערך שלילי. 0 הוא ידית חוקית (לעיתים stdin). דוגמת המצגת כאן מטעה." },
      { id: "c", text: "רק IPv6 מחזיר 0 בהצלחה." },
    ],
    answer: "b",
    explain: "יוניקס: FD אי־שלילי בהצלחה. בודקים < 0, לא == 0.",
  },
  {
    id: "u5-py-srv",
    prompt: "מה רצף שרת TCP בפייתון, מול הלקוח במצגת?",
    options: [
      { id: "a", text: "רק connect ו־sendall, כמו הלקוח." },
      { id: "b", text: "socket, bind, listen, accept, ואז recv/send על שקע השיחה. listen מגדיר תור; accept מחזיר חיבור חדש." },
      { id: "c", text: "רק Selector בלי bind." },
    ],
    answer: "b",
    explain: "אותו רצף כמו C++. המצגת מדגימה לקוח; השרת משלים את יעדי היחידה. 127.0.0.1 צר מ־INADDR_ANY.",
  },
  {
    id: "u5-ddos",
    prompt: "DoS מול DDoS?",
    options: [
      { id: "a", text: "DDoS פוגע בסודיות, DoS בשלמות." },
      { id: "b", text: "שניהם פוגעים בזמינות. DDoS = ממקורות רבים. אפחות גם תשתיתית, לא רק תיקון פונקציה." },
      { id: "c", text: "אין הבדל בשם." },
    ],
    answer: "b",
    explain: "Selector לבדו אינו הגנת הצפה. תקרות, timeout, rate limit וניטור.",
  },
];

window.U5_OSI_LAB = {
  title: "מעבדה: שכבות OSI",
  intro: "בחרו שכבה. תראו מה עוברת שם (תווך, מסגרת, חבילה, קצה-לקצה, שיחה, קידוד, יישום) — לא מפענחים תעבורת אחרים.",
};

window.U5_SOCK_LAB = {
  title: "מעבדה: סדר קריאות שקע",
  intro: "שרת מאזין; לקוח מתחבר. לחצו לפי התפקיד ותראו את הצעד הבא ברצף הקורס.",
};

window.U5_RACE_LAB = {
  title: "מעבדה: מרוץ מול מנעול",
  intro: "שני חוטים מוסיפים 10 למונה. += אינו אטומי. שזרו קריאה-כתיבה ותראו עדכון שאבד. עם mutex מגיעים ל-20 בחוזה. ב-C++ גישה מקבילית בלי סנכרון היא מרוץ נתונים (UB).",
};

window.U5_OSI = [
  { id: "1", name: "1 פיזית", body: "תווך: Wifi/רדיו, נחושת, סיב. מתח, תדר, חד/דו-כיווני." },
  { id: "2", name: "2 ערוץ", body: "מסגרות (frames), MAC 48 סיביות, ניפוי שגיאות בסיסי." },
  { id: "3", name: "3 רשת", body: "חבילות, ניתוב, subnet, QoS." },
  { id: "4", name: "4 תובלה", body: "קצה-לקצה בין תהליכים. TCP: זרם בתים אמין ומסודר; UDP: datagrams ללא הבטחות מסירה/סדר." },
  { id: "5", name: "5 שיחה", body: "תור שידור, מניעת פעולה כפולה, סינכרון שידור ארוך." },
  { id: "6", name: "6 ייצוג", body: "קידוד, דחיסה, הצפנה — לשכבת היישום." },
  { id: "7", name: "7 יישום", body: "HTTP, SMTP, FTP, DHCP. שרת-לקוח או P2P." },
];


(window.SUMMARY_CARDS = window.SUMMARY_CARDS || []).push(
  { id: "u5-lan", unit: "5", kind: "הגדרה", title: "רשת מקומית ורחבה (LAN, WAN)", body: "רשת מקומית מול רחבה. Ethernet / Wifi." },
  { id: "u5-mac", unit: "5", kind: "לזכור", title: "כתובת פיזית (MAC)", body: "כתובת פיזית 48 סיביות. שכבת הערוץ, מסגרות." },
  { id: "u5-phy", unit: "5", kind: "הגדרה", title: "שכבה פיזית", body: "תווך: אלחוט, נחושת, סיב. מתח, תדר, כיווניות." },
  { id: "u5-net", unit: "5", kind: "הגדרה", title: "שכבת הרשת", body: "ניתוב, חבילות, subnet, QoS." },
  { id: "u5-tr", unit: "5", kind: "הגדרה", title: "תובלה", body: "קצה-לקצה. TCP או UDP. פורט 16 סיביות." },
  { id: "u5-ses", unit: "5", kind: "לזכור", title: "שיחה / ייצוג", body: "Session: תור וסינכרון. Presentation: קידוד, דחיסה, הצפנה." },
  { id: "u5-app", unit: "5", kind: "הגדרה", title: "שכבת היישום", body: "HTTP, SMTP, FTP, DHCP. שרת-לקוח או P2P." },
  { id: "u5-5lay", unit: "5", kind: "לזכור", title: "TCP/IP מעשי", body: "חמש שכבות: יישום, תובלה, רשת, ערוץ, פיזית." },
  { id: "u5-v4", unit: "5", kind: "לזכור", title: "IPv4 32 סיביות", body: "ארבעה בתים. מסכת רשת / CIDR לקידומת. NAT כשחסרות כתובות." },
  { id: "u5-mask", unit: "5", kind: "הגדרה", title: "מסכת רשת (subnet mask)", body: "AND עם הכתובת נותן את הרשת. השאר מארח. /24 = 255.255.255.0." },
  { id: "u5-shor", unit: "5", kind: "לזכור", title: "שור מול גרובר (Shor / Grover)", body: "שור: RSA, DH, ECC, חתימות/תעודות. גרובר: מחליש AES, SHA, MAC/HMAC — לא אותו שבירה." },
  { id: "u5-v6", unit: "5", kind: "לזכור", title: "כתובת IPv6", body: "128 סיביות (16 בתים). במצגת הוגדר ב־1994. המעבר מ־IPv4 נמשך." },
  { id: "u5-end", unit: "5", kind: "מלכודת", title: "סדר בתים (endian, htons)", body: "IP ב-big-endian. htons לפורט." },
  { id: "u5-rpc", unit: "5", kind: "הגדרה", title: "קריאה מרחוק (RPC)", body: "קריאה שנראית מקומית ורצה בשרת." },
  { id: "u5-cs", unit: "5", kind: "הגדרה", title: "שרת-לקוח", body: "לקוח פונה; שרת מאזין. P2P: שני התפקידים." },
  { id: "u5-prx", unit: "5", kind: "הגדרה", title: "פרוקסי / רחרחן", body: "מתווך רואה בקשה. Sniffer מתעד תעבורה — כלי מורשה." },
  { id: "u5-so", unit: "5", kind: "הגדרה", title: "יצירת שקע (socket)", body: "AF_INET/6, STREAM/DGRAM, protocol 0. כישלון: ערך שלילי, לא השוואה ל־0." },
  { id: "u5-cl", unit: "5", kind: "לזכור", title: "לקוח", body: "socket, htons, inet_pton, connect, send/read." },
  { id: "u5-sv", unit: "5", kind: "לזכור", title: "שרת", body: "setsockopt, bind, listen(backlog), accept → שקע שיחה. בפייתון אותו רצף. addrlen לא addlen." },
  { id: "u5-any", unit: "5", kind: "מלכודת", title: "האזנה על כל הממשקים (INADDR_ANY)", body: "האזנה לכל הממשקים — משטח גדול מ-127.0.0.1." },
  { id: "u5-rd", unit: "5", kind: "מלכודת", title: "שליחה וקבלה (send, recv)", body: "TCP הוא זרם: שליחה/קבלה יכולות להיות חלקיות. מגדירים מסגור, תקרה ו־timeout." },
  { id: "u5-th", unit: "5", kind: "הגדרה", title: "חוט / תהליך", body: "thread יחידת ביצוע; process מופע תוכנית. thread joinable שנהרס גורם terminate." },
  { id: "u5-gil", unit: "5", kind: "מלכודת", title: "נעילת המפרש (GIL)", body: "CPython: אין מקביליות bytecode. multiprocessing לחישוב." },
  { id: "u5-rac", unit: "5", kind: "מלכודת", title: "מרוץ נתונים (Data Race)", body: "גישה מתנגשת ללא סנכרון ב־C++ = undefined behavior. mutex/atomic לפי החוזה." },
  { id: "u5-dl", unit: "5", kind: "לזכור", title: "קיפאון (deadlock)", body: "פילוסופים (dining philosophers): כולם מחכים. סדר משאבים." },
  { id: "u5-sel", unit: "5", kind: "הגדרה", title: "בורר ערוצים (Selector)", body: "ריבוב I/O בלי תהליך לכל לקוח. עדיין צריך תקרות, timeout ו־backpressure." },
  { id: "u5-dos", unit: "5", kind: "הגדרה", title: "מניעת שירות (DoS, DDoS)", body: "מיצוי משאב, פגיעה בזמינות. DDoS ממקורות רבים. תקרות, timeout, rate limit, מכסות וניטור." },
  { id: "u5-sym", unit: "5", kind: "הגדרה", title: "הצפנה סימטרית / AES", body: "אותו מפתח סודי לשני הצדדים. AES מצפין בלוקים באורך קבוע. מהיר לנפח; המפתח עדיין צריך להגיע בבטחה." },
  { id: "u5-asy", unit: "5", kind: "הגדרה", title: "הצפנה אסימטרית (Public-Key)", body: "פומבי/פרטי. איטית יותר לנפח נתונים." },
  { id: "u5-hy", unit: "5", kind: "לזכור", title: "הצפנה היברידית", body: "אסימטרי למפתח הסימטרי, סימטרי לנתונים. לאמת זהות מול סמכות סרטיפיקטים." },
  { id: "u5-pqc", unit: "5", kind: "לזכור", title: "הצפנה פוסט־קוונטית (PQC)", body: "Harvest now, decode later. Kyber, Dilithium, SPHINCS+, Falcon — שמות המצגת; NIST מאשר תקנים." },
  { id: "u5-mm", unit: "5", kind: "הגדרה", title: "אדם-באמצע (MITM)", body: "גורם על הנתיב. ערוץ מוצפן ומאומת + תעודה." },
  { id: "u5-rp", unit: "5", kind: "הגדרה", title: "התקפת שידור חוזר (Replay Attack)", body: "הודעה ישנה שוב. nonce / מונה / זמן." },
  { id: "u5-nul", unit: "5", kind: "מלכודת", title: "read בלי אפס סיום", body: "read/recv לא מוסיפים אפס סיום. printf %s על החוצץ עלול לקרוא מעבר. מדפיסים לפי האורך שחזר." }
);
