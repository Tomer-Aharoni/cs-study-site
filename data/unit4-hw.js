UNIT4.sections.push({
  id: "u4-hw",
  title: "תרגילי המרצה",
  html: `
<p>פרק זה מרכז תרגילי כיתה ומטלות רשמיות מאת מרצה הקורס, לצד שאלות מבחן מקוריות המיישמות מודל מונחה-עצמים, קריאת קבצים ומטא-תכנות בפייתון. לכל תרגיל מובא ניתוח פדגוגי מפורט: עקרון הפעולה, הסבר שורה-אחר-שורה, מוקשי בחינה מרכזיים ודגשים לתכנות דפנסיבי.</p><details class="fold"><summary>תרגיל 1 · ספירת תנועות</summary><div class="fold-body"><p><strong>מה המטרה:</strong> ספירת כמות המופעים של תווים מתוך אוסף אותיות נתון (<code>vowels</code>) בתוך מחרוזת קלט (<code>s</code>).</p><pre class="code"><code>def count_vowels(s, vowels):
    num_vowels = 0
    for letter in s:
        if letter in vowels:
            num_vowels += 1
    return num_vowels</code></pre><p><strong>איך הקוד עובד (שורה אחר שורה):</strong></p><ul><li><code>num_vowels = 0</code>: מאתחלים מונה ספירה.</li><li><code>for letter in s:</code>: לולאת <code>for</code> עוברת על המחרוזת תו אחר תו. בפייתון מחרוזת היא אובייקט איטרבילי (סדרה של תווים), ולכן אין צורך באינדוקס מספרי מסורבל.</li><li><code>if letter in vowels:</code>: האופרטור <code>in</code> בודק האם התו הנוכחי מוכל באוסף <code>vowels</code>. אם התנאי מתקיים, מקדמים את המונה ב-1.</li></ul><p><strong>מוקשי בחינה ודגשים דפנסיביים:</strong></p><ul><li><em>רגישות לאותיות גדולות וקטנות (Case Sensitivity):</em> האופרטור <code>in</code> מבצע השוואת תווים מדויקת לפי ערך ה-Unicode שלהם. אם המחרוזת כוללת אות גדולה (למשל <code>'A'</code>) בעוד ש-<code>vowels</code> מכילה אותיות קטנות בלבד (<code>'aeiou'</code>), האות תוחמץ. בתכנות דפנסיבי יש לנרמל את הקלט (למשל <code>letter.lower() in vowels.lower()</code>).</li><li><em>יעילות וסיבוכיות זמן (Time Complexity):</em> בדיקת <code>in</code> על גבי מחרוזת מבצעת סריקה ליניארית של \(O(k)\), כאשר \(k\) הוא אורך מחרוזת התנועות. אם <code>vowels</code> מומרת לקבוצה (<code>set</code>), בדיקת השייכות מתבצעת בזמן ממוצע של \(O(1)\) באמצעות טבלת גיבוב (Hash Table).</li></ul></div></details><details class="fold"><summary>תרגיל 2 · מילים שמתחילות ומסתיימות באותה אות</summary><div class="fold-body"><p><strong>מה המטרה:</strong> ספירת מספר המילים במשפט שמתחילות ומסתיימות באותו תו בדיוק (למשל <code>"level"</code>, <code>"radar"</code>, או מילה בת תו בודד כמו <code>"a"</code>).</p><pre class="code"><code>def count_words_same_first_last(sentence):
    same_letter_count = 0
    words = sentence.split()
    for word in words:
        if word[0] == word[-1]:
            same_letter_count += 1
    return same_letter_count</code></pre><p><strong>איך הקוד עובד (שורה אחר שורה):</strong></p><ul><li><code>words = sentence.split()</code>: המתודה <code>split()</code> ללא פרמטרים מפרקת את המחרוזת לרשימת מילים לפי כל רצף של רווחים (רווח רגיל, טאב, ירידת שורה), ומתעלמת מרווחים עודפים בתחילת המשפט או בסופו.</li><li><code>for word in words:</code>: איטרציה על כל מילה ברשימה.</li><li><code>if word[0] == word[-1]:</code>: השוואה בין התו הראשון באינדקס <code>0</code> לבין התו האחרון באינדוקס שלילי <code>-1</code>. אם הם שווים, המונה מקודם.</li></ul><p><strong>מוקשי בחינה ודגשים דפנסיביים:</strong></p><ul><li><em>אינדוקס שלילי ומילים בנות תו יחיד:</em> בפייתון אינדקס <code>[-1]</code> מצביע תמיד על האיבר האחרון ברצף. במילה בת אות אחת בלבד (למשל <code>"I"</code>), האינדקס <code>0</code> והאינדקס <code>-1</code> פונים שניהם לאותו תו יחיד, ולכן התנאי מתקיים והמילה נספרת כחוק.</li><li><em>הבדל קריטי בפיצול (split ללא ארגומנט מול split עם רווח):</em> קריאה ל-<code>sentence.split()</code> ללא ארגומנטים לעולם אינה מייצרת מחרוזות ריקות. לעומת זאת, אם היו כותבים <code>sentence.split(" ")</code>, רווח כפול היה מייצר איבר ריק (<code>""</code>), והפנייה <code>word[0]</code> הייתה קורסת מיד עם שגיאת <code>IndexError: string index out of range</code>!</li></ul></div></details><details class="fold"><summary>תרגיל 3 · קובץ key=value למילון</summary><div class="fold-body"><p><strong>מה המטרה:</strong> קריאת קובץ תצורה שבו כל שורה מופיעה במבנה של מפתח וערך מספרי המופרדים בסימן שווה (<code>key=value</code>), והמרתו למילון פייתון (<code>dict</code>).</p><pre class="code"><code>def read_file_to_dictionary(filename):
    dictionary = {}
    file = open(filename, "r")
    for line in file:
        pair = line.split("=")
        dictionary[pair[0]] = int(pair[1])
    file.close()
    return dictionary</code></pre><p><strong>איך הקוד עובד (שורה אחר שורה):</strong></p><ul><li><code>file = open(filename, "r")</code>: פתיחת הקובץ לקריאה (מצב <code>"r"</code>).</li><li><code>for line in file:</code>: מעבר איטרטיבי שורה-אחר-שורה על פני הקובץ. כל שורה נקראת כאיטרטור מבלי לטעון את כל הקובץ בבת אחת לזיכרון.</li><li><code>pair = line.split("=")</code>: פיצול השורה לשני חלקים לפי תו השווה (המפתח והערך).</li><li><code>dictionary[pair[0]] = int(pair[1])</code>: המרת מחרוזת הערך למספר שלם והשמתה במילון תחת המפתח.</li><li><code>file.close()</code>: סגירה ידנית של הקובץ בסיום.</li></ul><p><strong>מוקשי בחינה ודגשים דפנסיביים קריטיים:</strong></p><ul><li><em>דליפת משאבים (File Descriptor Leak):</em> שימוש ב-<code>open</code> וב-<code>close</code> ידניים מהווה סיכון דפנסיבי מובהק. אם השורה בקובץ משובשת (אינה מספר) והפונקציה <code>int()</code> זורקת שגיאת <code>ValueError</code>, או אם יש שגיאת אינדוקס, הביצוע ייקטע מיד והקריאה ל-<code>file.close()</code> שלמטה לעולם לא תתבצע! ידית הקובץ תישאר פתוחה במערכת ההפעלה. <strong>הפתרון הדפנסיבי המחייב:</strong> שימוש במנהל הקשר (Context Manager) באמצעות משפט <code>with open(filename, "r") as file:</code>, המבטיח סגירה ודאית של הקובץ גם בעת זריקת חריגה.</li><li><em>שורות פגומות ואינדוקס חסר:</em> שורה ריקה בקובץ או שורה ללא הסימן <code>=</code> תחזיר רשימה בעלת איבר בודד, והגישה ל-<code>pair[1]</code> תזרוק <code>IndexError</code>. בנוסף, אם הערך עצמו מכיל סימני שווה נוספים, פיצול רגיל ייצור יותר משני איברים; בתכנות דפנסיבי יש להגביל את הפיצול באמצעות <code>line.split("=", 1)</code>.</li></ul></div></details><details class="fold"><summary>תרגיל 4 · מחלקת Board</summary><div class="fold-body"><p><strong>מה המטרה:</strong> מימוש מחלקה המייצגת לוח דו-ממדי בגודל \(n \times n\), אתחול כל תא למכפלת שורתו ועמודתו, עדכון תאים והדפסה נוחה למשתמש.</p><pre class="code"><code>class Board:
    def __init__(self, n):
        self.board = []
        for i in range(n):
            row = []
            for j in range(n):
                row.append(i * j)
            self.board.append(row)
    def set(self, x, y, value):
        self.board[x][y] = value
    def __str__(self):
        result = ""
        for row in self.board:
            result += str(row) + "\\n"
        return result</code></pre><p><strong>איך הקוד עובד (שורה אחר שורה):</strong></p><ul><li><code>__init__(self, n)</code>: בנאי המחלקה. בכל איטרציה של לולאת ה-<code>i</code> נוצרת רשימה פנימית חדשה (<code>row = []</code>), שלתוכה מתווספים \(n\) תאים המאותחלים ל-<code>i * j</code>. לאחר מכן השורה מתווספת לרשימת הלוח <code>self.board</code>.</li><li><code>set(self, x, y, value)</code>: מתודה לעדכון תא בלוח באמצעות גישה דו-ממדית <code>self.board[x][y] = value</code>.</li><li><code>__str__(self)</code>: מתודת קסם (Dunder Method) המופעלת אוטומטית בעת קריאה ל-<code>print(board)</code> או <code>str(board)</code>. היא עוברת על כל שורה ומשרשרת אותה עם תו ירידת שורה <code>\\n</code>.</li></ul><p><strong>מוקש בחינה קלאסי (כינוי כפול / Aliasing במטריצות!):</strong></p><ul><li>שימו לב שבבנאי נוצר אובייקט רשימה חדש לחלוטין (<code>row = []</code>) עבור כל שורה. מלכודת שכיחה ביותר במבחנים היא ניסיון לקצר את האתחול ע"י הכפלת רשימות: <code>self.board = [[0] * n] * n</code>. בפייתון, אופרטור ההכפלה על רשימה אינו משכפל את האובייקטים אלא יוצר \(n\) הפניות לאותה רשימה בודדת בזיכרון! במצב כזה, שינוי תא בשורה 0 ישנה אוטומטית את אותו תא בכל השורות האחרות בלוח. הלולאה המפורשת של המרצה מונעת באג זה.</li></ul></div></details><details class="fold"><summary>דוגמה · Replicator (מעטפת שמדביקה deco למחלקה)</summary><div class="fold-body"><p><strong>מה המטרה ועקרון הפעולה:</strong> דוגמה מתקדמת המדגימה רכיבה דינמית (Monkey Patching), מעטפות (Decorators) ואינטרוספקציה באמצעות <code>setattr</code> ו-<code>__dict__</code>. המחלקה <code>Replicator</code> עוטפת מתודות כך שבעת קריאה אליהן, הן "מדביקות" את המעטפת גם לאובייקט שהועבר בארגומנטים ולכל המתודות של המחלקה שלו.</p><pre class="code"><code>class Person:
    def hello(self):
        print("hello")
    def bye(self, name, other_person):
        print("bye " + name)
class Replicator:
    def deco(self, f):
        def ret(*args):
            print("=== Affected ===")
            for i in [len(args) - 1]:
                self.affect(args[i])
            f(*args)
        return ret
    def affect(self, obj):
        setattr(obj, "deco", self.deco)
        setattr(obj, "affect", self.affect)
        cls = obj.__class__
        for attr, item in cls.__dict__.items():
            if callable(item):
                setattr(cls, attr, self.deco(item))
p = Person()
q = Person()
r = Replicator()
Person.hello = r.deco(Person.hello)
Person.bye = r.deco(Person.bye)
p.hello()
p.bye("Irena", q)</code></pre><p><strong>מעקב הרצה צעד אחר צעד (Execution Trace):</strong></p><ul><li><strong>שלב 1 (עטיפה ראשונית):</strong> השורות <code>Person.hello = r.deco(Person.hello)</code> ו-<code>Person.bye = r.deco(Person.bye)</code> מחליפות את המתודות המקוריות בפונקציית המעטפת <code>ret</code>. כעת שתי המתודות עטופות בשכבה ראשונה של <code>deco</code>.</li><li><strong>שלב 2 (קריאה ראשונה: <code>p.hello()</code>):</strong><ul><li>המעטפת <code>ret</code> רצה. רשימת הארגומנטים היא <code>(p,)</code> (המופע <code>self</code> מועבר כארגומנט ראשון).</li><li>מודפסת שורה: <code>=== Affected ===</code> (פעם ראשונה).</li><li>הלולאה ניגשת לארגומנט האחרון (<code>args[0]</code> שהוא <code>p</code>) ומפעילה <code>self.affect(p)</code>.</li><li>בתוך <code>affect</code>: מילון המחלקה <code>Person.__dict__</code> נסרק, וכל מתודה בת-קריאה נעטפת שוב ב-<code>self.deco</code>! כתוצאה מכך, גם <code>hello</code> וגם <code>bye</code> עטופות כעת <strong>פעמיים</strong>!</li><li>הפונקציה המקורית <code>hello</code> מתבצעת ומדפיסה <code>hello</code>.</li></ul></li><li><strong>שלב 3 (קריאה שנייה: <code>p.bye("Irena", q)</code>):</strong><ul><li>המתודה <code>Person.bye</code> כבר עטופה בשתי שכבות של <code>deco</code>.</li><li>השכבה החיצונית ביותר רצה: מדפיסה <code>=== Affected ===</code> (פעם ראשונה בקריאה זו). רשימת הארגומנטים היא <code>(p, "Irena", q)</code>. הארגומנט האחרון באינדקס <code>len(args)-1</code> הוא האובייקט <code>q</code> (ולא המחרוזת <code>"Irena"</code>!). מופעל <code>affect(q)</code> שעוטף שוב את כל מתודות המחלקה <code>Person</code>.</li><li>לאחר מכן השכבה החיצונית קוראת ל-<code>f(*args)</code> – אך <code>f</code> היא השכבה הפנימית של <code>bye</code>!</li><li>השכבה הפנימית רצה: מדפיסה <code>=== Affected ===</code> (פעם שנייה בקריאה זו), מפעילה שוב <code>affect(q)</code>, ורק אז קוראת לפונקציה המקורית <code>bye</code>.</li><li>הפונקציה המקורית מדפיסה: <code>bye Irena</code>.</li></ul></li></ul><p><strong>מוקשי בחינה מרכזיים:</strong></p><ul><li><em>מי הארגומנט שמושפע?</em> בלולאה <code>for i in [len(args) - 1]</code>, מי שנבחר הוא תמיד הארגומנט האחרון ברשימת <code>*args</code>. בקריאה <code>p.bye("Irena", q)</code>, מועברים שלושה ארגומנטים: <code>p</code> באינדקס 0, <code>"Irena"</code> באינדקס 1, והמופע <code>q</code> באינדקס 2. לכן האובייקט <code>q</code> הוא זה שמושפע, ולא המחרוזת.</li><li><em>שינוי ברמת המחלקה משפיע על כל המופעים:</em> הפונקציה <code>affect</code> מבצעת <code>setattr(cls, attr, ...)</code> על המחלקה (<code>cls = obj.__class__</code>). שינוי במילון המחלקה אינו מוגבל למופע הנוכחי, אלא משנה מיידית את התנהגות כל המופעים של <code>Person</code> הקיימים והעתידיים במערכת ויוצר שכבות מעטפת הולכות ומצטברות.</li></ul></div></details><details class="fold"><summary>BankAccount / InvestmentAccount מקובץ</summary><div class="fold-body"><p><strong>מה המטרה ומבנה הנתונים:</strong> שאלת מבחן מקורית (2021א מועד 75, שאלה 6) העוסקת בקריאת קובץ נתונים בעל רשומות מרובות שורות ומבנים היררכיים, תוך שילוב ירושה מונחית-עצמים:</p><ul><li>חשבון בנק רגיל (<code>BankAccount</code>): מתואר בשורה בודדת בת 2 שדות – שם ויתרה (<code>name balance</code>).</li><li>חשבון השקעות (<code>InvestmentAccount</code>): יורש מ-<code>BankAccount</code> ומרחיב אותו עם מילון השקעות <code>investments</code>. הוא מתחיל בשורת כותרת בת 3 שדות (<code>name balance investments:</code>), לאחריה מופיעות שורות השקעה (<code>ticker qty</code>), והרשומה נחתמת בשורה שמתחילה במילה <code>"done"</code>.</li></ul><pre class="code"><code>class BankAccount:
    def __init__(self, name, balance):
        self.name = name
        self.balance = balance
class InvestmentAccount(BankAccount):
    def __init__(self, name, balance):
        super().__init__(name, balance)
        self.investments = {}
    def add_investment(self, ticker, qty):
        self.investments[ticker] = qty
def read_accounts(filename):
    accounts = []
    f = open(filename, "r")
    for line in f:
        parts = line.split()
        if len(parts) == 2:
            accounts.append(BankAccount(parts[0], float(parts[1])))
        elif len(parts) == 3 and parts[2] == "investments:":
            account = InvestmentAccount(parts[0], float(parts[1]))
            for line in f:
                parts = line.split()
                if parts[0] == "done":
                    break
                account.add_investment(parts[0], int(parts[1]))
            accounts.append(account)
    f.close()
    return accounts</code></pre><p><strong>איך הקוד עובד (שורה אחר שורה):</strong></p><ul><li>הלולאה החיצונית <code>for line in f:</code> קוראת את הקובץ שורה אחר שורה ומפצלת כל שורה לפי רווחים (<code>parts = line.split()</code>).</li><li>אם אורך השורה הוא 2, נוצר אובייקט <code>BankAccount</code> עם המרה ל-<code>float</code> של היתרה ומתווסף לרשימה.</li><li>אם אורך השורה הוא 3 והשדה השלישי הוא <code>"investments:"</code>, נוצר אובייקט <code>InvestmentAccount</code>. כעת הקוד נכנס ללולאה פנימית (<code>for line in f:</code>) הקוראת שורות נוספות מאותו איטרטור של הקובץ! כל שורה מוסיפה נייר ערך וכמות למילון, עד אשר מזוהה השורה <code>"done"</code>, הגורמת ל-<code>break</code> ומחזירה את השליטה ללולאה החיצונית.</li></ul><p><strong>מוקשי בחינה ודגשים דפנסיביים:</strong></p><ul><li><em>לולאה מקוננת על אותו Iterator:</em> הלולאה הפנימית רצה ישירות על אותו משתנה קובץ <code>f</code>. מכיוון שאובייקט קובץ בפייתון הוא איטרטור בעל סמן מתקדם (Cursor), שורות שנקראות בלולאה הפנימית נצרכות ואינן נקראות שוב בלולאה החיצונית.</li><li><em>מלכודת שורה ריקה בלולאה הפנימית:</em> אם מופיעה שורה ריקה בין שורות ההשקעה, <code>line.split()</code> תחזיר רשימה ריקה <code>[]</code>. הגישה ל-<code>parts[0]</code> תזרוק מיד <code>IndexError: list index out of range</code> ותפיל את התוכנית! בקוד דפנסיבי חובה להקדים בדיקה: <code>if not parts: continue</code>.</li><li><em>סיום קובץ בלתי צפוי (EOF):</em> אם הקובץ יסתיים לפני שמופיעה שורת <code>"done"</code>, הלולאה הפנימית תסתיים ללא התראה, והחשבון יתווסף במצב חלקי. בנוסף, יש לעטוף את פתיחת הקובץ ב-<code>with open(...)</code> כדי למנוע דליפת משאבים במקרה של שגיאת המרה מספרית (<code>ValueError</code>).</li></ul></div></details><details class="fold"><summary>Book / BookSomething מקובץ</summary><div class="fold-body"><p><strong>מה המטרה ומבנה הנתונים:</strong> שאלת מבחן מקורית (2021א מועד 78, שאלה 6) העוסקת בפענוח קובץ ספרים הכולל שני מבני שורות שונים לפי שדה מזהה:</p><ul><li>ספר בעל מחבר יחיד: <code>name author year</code> (השדה השני מכיל את שם המחבר).</li><li>ספר בעל מספר מחברים: <code>name many year author1 author2 ...</code> (השדה השני מכיל את המילה המזהה <code>"many"</code>).</li></ul><pre class="code"><code>class Book:
    def __init__(self, name, author, year):
        self.name = name
        self.author = author
        self.year = year
class BookSomething(Book):
    def __init__(self, name, year, authors):
        super().__init__(name, "many", year)
        self.authors = authors
def read_books(filename):
    books = []
    f = open(filename, "r")
    for line in f:
        parts = line.split()
        if parts[1] == "many":
            name = parts[0]
            year = int(parts[2])
            authors = parts[3:]
            books.append(BookSomething(name, year, authors))
        else:
            books.append(Book(parts[0], parts[1], int(parts[2])))
    f.close()
    return books</code></pre><p><strong>איך הקוד עובד (שורה אחר שורה):</strong></p><ul><li>המחלקה <code>BookSomething</code> יורשת מ-<code>Book</code>. בקריאה לבנאי האב <code>super().__init__(name, "many", year)</code>, היא מעבירה את המחרוזת <code>"many"</code> כשם המחבר של מחלקת הבסיס, ושומרת את רשימת המחברים המלאה ב-<code>self.authors</code>.</li><li>בפונקציה <code>read_books</code>, השורה מפוצלת לפי רווחים. אם <code>parts[1] == "many"</code>, חיתוך רשימה (Slicing) באגף הימני <code>parts[3:]</code> לוכד את כל שמות המחברים מהאינדקס השלישי ועד סוף השורה לתוך רשימה חדשה. אם לא, נוצר מופע רגיל של <code>Book</code>.</li></ul><p><strong>מוקשי בחינה ודגשים דפנסיביים:</strong></p><ul><li><em>מלכודת אינדוקס <code>IndexError</code> על שורות קצרות:</em> הקוד ניגש ישירות ל-<code>parts[1]</code> ללא בדיקה מקדימה של אורך הרשימה. שורה ריקה או שורה עם מילה בודדת תזרוק <code>IndexError</code>. בתכנות דפנסיבי חובה לוודא <code>if len(parts) < 3: continue</code> לפני גישה לאיברים.</li><li><em>המרות מספריות בטוחות:</em> המרת השנה למספר שלם <code>int(parts[2])</code> תזרוק <code>ValueError</code> אם הנתון בקובץ פגום או אם סדר העמודות שגוי. יש לטפל בחריגה בצורה מבוקרת.</li><li><em>סדר הפרמטרים בקריאה ל-super():</em> שימו לב להבדל בסדר הפרמטרים: ב-<code>BookSomething</code> הסדר הוא <code>(name, year, authors)</code>, בעוד שב-<code>Book</code> הסדר הוא <code>(name, author, year)</code>. הקריאה ל-<code>super().__init__</code> חייבת להתאים בדיוק לחתימה של מחלקת האב!</li></ul></div></details>
  `,
});
