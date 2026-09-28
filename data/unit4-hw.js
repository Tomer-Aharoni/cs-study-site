UNIT4.sections.push({
  id: "u4-hw",
  title: "תרגילי המרצה",
  html: `
<p>תרגילי פייתון מהמרצה, כולל דוגמה מהספר. הם סגורים בהתחלה.</p><details class="fold"><summary>תרגיל 1 · ספירת תנועות</summary><div class="fold-body"><p>סופרים כמה תווים מ־s נמצאים במחרוזת vowels.</p><pre class="code"><code>def count_vowels(s, vowels):
    num_vowels = 0
    for letter in s:
        if letter in vowels:
            num_vowels += 1
    return num_vowels</code></pre></div></details><details class="fold"><summary>תרגיל 2 · מילים שמתחילות ומסתיימות באותה אות</summary><div class="fold-body"><pre class="code"><code>def count_words_same_first_last(sentence):
    same_letter_count = 0
    words = sentence.split()
    for word in words:
        if word[0] == word[-1]:
            same_letter_count += 1
    return same_letter_count</code></pre></div></details><details class="fold"><summary>תרגיל 3 · קובץ key=value למילון</summary><div class="fold-body"><p>הפתרון של המרצה פותח ב־open/close. אפשר גם with.</p><pre class="code"><code>def read_file_to_dictionary(filename):
    dictionary = {}
    file = open(filename, "r")
    for line in file:
        pair = line.split("=")
        dictionary[pair[0]] = int(pair[1])
    file.close()
    return dictionary</code></pre></div></details><details class="fold"><summary>תרגיל 4 · מחלקת Board</summary><div class="fold-body"><p>לוח n×n, תא [i][j] מתחיל כ־i*j, set, ו־__str__.</p><pre class="code"><code>class Board:
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
        return result</code></pre></div></details><details class="fold"><summary>דוגמה · Replicator (מעטפת שמדביקה deco למחלקה)</summary><div class="fold-body"><p>ב־<code>p.hello()</code> מודפס פעם אחת <code>=== Affected ===</code> ואז hello. בתוך <code>affect</code> כל מתודה של המחלקה נעטפת שוב, ולכן <code>bye</code> כבר עטוף פעמיים. ב־<code>p.bye("Irena", q)</code> השורה מודפסת פעמיים, ואז <code>bye Irena</code>. מי שמושפע הוא הארגומנט האחרון, כאן <code>q</code>, לא המחרוזת Irena.</p><pre class="code"><code>class Person:
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
p.bye("Irena", q)</code></pre></div></details><details class="fold"><summary>BankAccount / InvestmentAccount מקובץ</summary><div class="fold-body"><pre class="code"><code>class BankAccount:
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
    return accounts</code></pre><p>שורה ריקה שוברת את הלולאה: <code>parts[0]</code> בלי בדיקה שאכן יש שדה. בקוד דפנסיבי בודקים את האורך לפני הגישה.</p></div></details><details class="fold"><summary>Book / BookSomething מקובץ</summary><div class="fold-body"><pre class="code"><code>class Book:
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
    return books</code></pre><p>גם כאן שורה קצרה מדי, בלי שדה שני, תזרוק כשניגשים ל־<code>parts[1]</code>. בודקים קודם שיש מספיק שדות.</p></div></details>
  `,
});
