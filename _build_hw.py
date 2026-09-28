# -*- coding: utf-8 -*-
"""Build collapsible homework HTML into data/*-hw.js from lecturer extracts."""
from pathlib import Path

OUT = Path(r"C:\Users\tomer\source\cs-study-site\data")
LEC = Path(r"C:\Users\tomer\source\cs-study-site\_extract\lecturer")


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def code(s: str) -> str:
    return f'<pre class="code"><code>{esc(s.strip())}</code></pre>'


def p(s: str) -> str:
    return f"<p>{s}</p>"


def ul(items: list[str]) -> str:
    lis = "".join(f"<li>{x}</li>" for x in items)
    return f"<ul>{lis}</ul>"


def fold(title: str, inner: str) -> str:
    return (
        f'<details class="fold"><summary>{title}</summary>'
        f'<div class="fold-body">{inner}</div></details>'
    )


def js_str(s: str) -> str:
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def write_unit(path: Path, unit: str, section_id: str, title: str, intro: str, folds: list[str]) -> None:
    html = p(intro) + "".join(folds)
    blob = (
        f"{unit}.sections.push({{\n"
        f'  id: "{section_id}",\n'
        f'  title: "{title}",\n'
        f"  html: `\n{js_str(html)}\n  `,\n"
        f"}});\n"
    )
    path.write_text(blob, encoding="utf-8")
    print("wrote", path.name, "chars", len(blob))


# --- CSV ---
csv_req = (
    p("CSV (Comma-Separated Values): כל שורה שורה, פסיקים מפרידים שדות. שדות עם אותיות מתעלמים; שדות מספריים מצטרפים לסכום השורה ולסכום העמודה.")
    + p("דוגמה: <code>10,20,hello,30</code> → סכום שורה 60. עמודה 1=15, 2=20, 3=15, 4=55 לשתי השורות שבמצגת.")
    + p("התוכנית מקבלת שם קובץ ב־<code>argv[1]</code>, מדפיסה סכומי שורות ואז סכומי עמודות.")
)
csv_h = """#pragma once
#include <fstream>
#include <string>
class CSVProcessor
{
private:
    std::ifstream input;
    void processLine(const std::string& line,
                     int* columnSums,
                     unsigned int columnCount,
                     unsigned int rowNumber);
public:
    CSVProcessor(const std::string& fileName);
    void process();
};"""
csv_cpp = """#include "CSVProcessor.h"
#include <iostream>
#include <sstream>
#include <stdexcept>
CSVProcessor::CSVProcessor(const std::string& fileName)
    : input(fileName)
{
    if (!input)
        throw std::runtime_error("Could not open file");
}
void CSVProcessor::process()
{
    std::string line;
    if (!std::getline(input, line))
        return;
    unsigned int columnCount = 1;
    for (unsigned int i = 0; i < line.length(); ++i)
    {
        if (line[i] == ',')
            ++columnCount;
    }
    int* columnSums = new int[columnCount];
    for (unsigned int i = 0; i < columnCount; ++i)
        columnSums[i] = 0;
    unsigned int rowNumber = 1;
    processLine(line, columnSums, columnCount, rowNumber);
    ++rowNumber;
    while (std::getline(input, line))
    {
        processLine(line, columnSums, columnCount, rowNumber);
        ++rowNumber;
    }
    std::cout << "Column sums:" << std::endl;
    for (unsigned int i = 0; i < columnCount; ++i)
    {
        std::cout << "Column " << i + 1
                  << ": " << columnSums[i] << std::endl;
    }
    delete[] columnSums;
}
void CSVProcessor::processLine(
    const std::string& line,
    int* columnSums,
    unsigned int columnCount,
    unsigned int rowNumber)
{
    std::stringstream lineStream(line);
    std::string field;
    unsigned int column = 0;
    int rowSum = 0;
    while (std::getline(lineStream, field, ','))
    {
        std::stringstream fieldStream(field);
        int value;
        char extra;
        if ((fieldStream >> value) && !(fieldStream >> extra))
        {
            rowSum += value;
            if (column < columnCount)
                columnSums[column] += value;
        }
        ++column;
    }
    std::cout << "Row " << rowNumber
              << " sum: " << rowSum << std::endl;
}"""
csv_main = """#include "CSVProcessor.h"
#include <exception>
#include <iostream>
int main(int argc, char* argv[])
{
    if (argc != 2)
    {
        std::cout << "Usage: csv_read <file.csv>" << std::endl;
        return 1;
    }
    try
    {
        CSVProcessor processor(argv[1]);
        processor.process();
    }
    catch (const std::exception& e)
    {
        std::cout << "Error: " << e.what() << std::endl;
        return 1;
    }
    return 0;
}"""
csv_sol = (
    p("פתרון המרצה במחלקה עם זרם קלט, <code>getline</code> לשורה ו־<code>stringstream</code> לשדה. בדיקה מספרית: קריאת <code>int</code> ואז תו עודף — אם אין תו, כל השדה היה מספר.")
    + p("המימוש כאן משתמש ב־<code>new int[]</code>; בקורס עדיף בדרך כלל <code>std::vector</code>, אבל זה הקוד שנשלח עם המטלה.")
    + p("<strong>CSVProcessor.h</strong>")
    + code(csv_h)
    + p("<strong>CSVProcessor.cpp</strong>")
    + code(csv_cpp)
    + p("<strong>main.cpp</strong>")
    + code(csv_main)
)

number_code = """class Number {
private:
    int* value;
public:
    Number(int n) {
        value = new int(n);
    }
    ~Number() {
        delete value;
    }
    Number(const Number& other) {
        value = new int(*other.value);
    }
    Number& operator=(const Number& other) {
        if (this != &other) {
            delete value;
            value = new int(*other.value);
        }
        return *this;
    }
};"""
quiz1 = """#include <iostream>
class Person {
public:
    Person(int value) : age(value) {
        std::cout << "regular constructor\\n";
    }
    Person(const Person& other) : age(other.age) {
        std::cout << "copy constructor\\n";
    }
    Person& operator=(const Person& other) {
        age = other.age;
        std::cout << "assignment operator\\n";
        return *this;
    }
    ~Person() {
        std::cout << "destructor\\n";
    }
private:
    int age;
};
int main() {
    Person a(10);
    Person b = a;
    Person c(30);
    c = a;
}"""
rule_sol = (
    p("כלל השלוש: אם כותבים מפרק / בנאי העתקה / השמה למשאב בבעלות, כמעט תמיד את שלושתם. כל <code>Number</code> מחזיק <code>int</code> נפרד בערימה. <code>this != &amp;other</code> מגן על השמה עצמית.")
    + code(number_code)
    + p("<strong>חידון 1.</strong> מה יודפס?")
    + code(quiz1)
    + p("תשובה: A — בנאי רגיל, בנאי העתקה, בנאי רגיל, אופרטור השמה, ואז שלושה מפרקים בסדר הפוך לבנייה.")
    + p("<strong>חידון 2.</strong> <code>string food = \"Pizza\";</code> הפניה בשם meal: <code>string&amp; meal = food;</code> (לא העתקה, לא מצביע, ולא <code>string&amp; meal = &amp;food</code>).")
    + p("<strong>חידון 3.</strong> מצביע ל־food: <code>string* pMeal = &amp;food;</code>.")
)

# USocial files from extract — abbreviated wrappers with full code
media_h = """#pragma once
class Media
{
public:
    virtual ~Media() = default;
    virtual void display() const = 0;
};"""
photo_h = """#pragma once
#include "Media.h"
#include <iostream>
class Photo : public Media
{
public:
    void display() const
    {
        std::cout << "image";
    }
};"""
audio_h = """#pragma once
#include "Media.h"
#include <iostream>
class Audio : public Media
{
public:
    void display() const
    {
        std::cout << "audio";
    }
};"""
video_h = """#pragma once
#include "Media.h"
#include <iostream>
class Video : public Media
{
public:
    void display() const
    {
        std::cout << "video";
    }
};"""
message_h = """#pragma once
#include <string>
class Message
{
private:
    std::string text;
public:
    Message(const std::string& text)
        : text(text)
    {
    }
    std::string getText() const
    {
        return text;
    }
};"""
post_h = """#pragma once
#include <string>
class Media;
class Post
{
private:
    std::string text;
    Media* media;
public:
    Post(const std::string& text);
    Post(const std::string& text, Media* media);
    ~Post();
    std::string getText() const;
    Media* getMedia() const;
};"""
post_cpp = """#include "Post.h"
#include "Media.h"
Post::Post(const std::string& text)
    : text(text), media(nullptr)
{
}
Post::Post(const std::string& text, Media* media)
    : text(text), media(media)
{
}
Post::~Post()
{
    delete media;
}
std::string Post::getText() const
{
    return text;
}
Media* Post::getMedia() const
{
    return media;
}"""
user_h = """#pragma once
#include <list>
#include <string>
class USocial;
class Post;
class Message;
class Media;
class User
{
    friend class USocial;
protected:
    USocial* us;
    unsigned long id;
    std::string name;
    std::list<unsigned long> friends;
    std::list<Post*> posts;
    std::list<Message*> receivedMsgs;
    User();
    virtual ~User();
public:
    unsigned long getId() const;
    std::string getName() const;
    void addFriend(User* user);
    void removeFriend(User* user);
    void post(const std::string& text);
    void post(const std::string& text, Media* media);
    std::list<Post*> getPosts() const;
    void viewFriendsPosts() const;
    void receiveMessage(Message* message);
    virtual void sendMessage(User* user, Message* message);
    void viewReceivedMessages() const;
};"""
user_cpp = """#include "User.h"
#include "USocial.h"
#include "Post.h"
#include "Message.h"
#include "Media.h"
#include <algorithm>
#include <iostream>
#include <stdexcept>
User::User()
    : us(nullptr), id(0)
{
}
User::~User()
{
    std::list<Post*>::iterator postIt;
    for (postIt = posts.begin(); postIt != posts.end(); ++postIt)
        delete *postIt;
    std::list<Message*>::iterator msgIt;
    for (msgIt = receivedMsgs.begin(); msgIt != receivedMsgs.end(); ++msgIt)
        delete *msgIt;
}
unsigned long User::getId() const { return id; }
std::string User::getName() const { return name; }
void User::addFriend(User* user)
{
    if (user == nullptr)
        throw std::invalid_argument("invalid user");
    if (user == this)
        throw std::runtime_error("cannot add yourself as a friend");
    std::list<unsigned long>::iterator it;
    it = std::find(friends.begin(), friends.end(), user->getId());
    if (it != friends.end())
        throw std::runtime_error("user is already a friend");
    friends.push_back(user->getId());
}
void User::removeFriend(User* user)
{
    if (user == nullptr)
        throw std::invalid_argument("invalid user");
    std::list<unsigned long>::iterator it;
    it = std::find(friends.begin(), friends.end(), user->getId());
    if (it == friends.end())
        throw std::runtime_error("user is not a friend");
    friends.erase(it);
}
void User::post(const std::string& text)
{
    posts.push_back(new Post(text));
}
void User::post(const std::string& text, Media* media)
{
    posts.push_back(new Post(text, media));
}
std::list<Post*> User::getPosts() const { return posts; }
void User::viewFriendsPosts() const
{
    std::list<unsigned long>::const_iterator friendIt;
    for (friendIt = friends.begin(); friendIt != friends.end(); ++friendIt)
    {
        User* friendUser = us->getUserById(*friendIt);
        if (friendUser == nullptr)
            continue;
        std::list<Post*> friendPosts = friendUser->getPosts();
        std::list<Post*>::const_iterator postIt;
        for (postIt = friendPosts.begin(); postIt != friendPosts.end(); ++postIt)
        {
            Post* currentPost = *postIt;
            std::cout << friendUser->getName() << ": " << currentPost->getText();
            if (currentPost->getMedia() != nullptr)
            {
                std::cout << " ";
                currentPost->getMedia()->display();
            }
            std::cout << std::endl;
        }
    }
}
void User::receiveMessage(Message* message)
{
    if (message == nullptr)
        throw std::invalid_argument("invalid message");
    receivedMsgs.push_back(message);
}
void User::sendMessage(User* user, Message* message)
{
    if (user == nullptr || message == nullptr)
        throw std::invalid_argument("invalid user or message");
    std::list<unsigned long>::iterator it;
    it = std::find(friends.begin(), friends.end(), user->getId());
    if (it == friends.end())
        throw std::runtime_error("regular user can send messages only to friends");
    user->receiveMessage(message);
}
void User::viewReceivedMessages() const
{
    std::list<Message*>::const_iterator it;
    for (it = receivedMsgs.begin(); it != receivedMsgs.end(); ++it)
        std::cout << (*it)->getText() << std::endl;
}"""
bus_h = """#pragma once
#include "User.h"
class BusinessUser : public User
{
public:
    void sendMessage(User* user, Message* message);
};"""
bus_cpp = """#include "BusinessUser.h"
#include "Message.h"
#include <stdexcept>
void BusinessUser::sendMessage(User* user, Message* message)
{
    if (user == nullptr || message == nullptr)
        throw std::invalid_argument("invalid user or message");
    user->receiveMessage(message);
}"""
us_h = """#pragma once
#include <map>
#include <string>
class User;
class USocial
{
    friend class User;
private:
    std::map<unsigned long, User*> users;
public:
    USocial();
    ~USocial();
    User* registerUser(const std::string& name, bool business = false);
    void removeUser(User* user);
    User* getUserById(unsigned long id) const;
};"""
us_cpp = """#include "USocial.h"
#include "User.h"
#include "BusinessUser.h"
#include <stdexcept>
USocial::USocial() {}
USocial::~USocial()
{
    std::map<unsigned long, User*>::iterator it;
    for (it = users.begin(); it != users.end(); ++it)
        delete it->second;
}
User* USocial::registerUser(const std::string& name, bool business)
{
    static unsigned long nextId = 1;
    User* user = nullptr;
    if (business)
        user = new BusinessUser();
    else
        user = new User();
    user->id = nextId;
    ++nextId;
    user->name = name;
    user->us = this;
    users[user->id] = user;
    return user;
}
void USocial::removeUser(User* user)
{
    if (user == nullptr)
        throw std::invalid_argument("invalid user");
    std::map<unsigned long, User*>::iterator it;
    it = users.find(user->getId());
    if (it == users.end())
        throw std::runtime_error("user does not exist");
    unsigned long removedId = user->getId();
    std::map<unsigned long, User*>::iterator userIt;
    for (userIt = users.begin(); userIt != users.end(); ++userIt)
        userIt->second->friends.remove(removedId);
    delete it->second;
    users.erase(it);
}
User* USocial::getUserById(unsigned long id) const
{
    std::map<unsigned long, User*>::const_iterator it;
    it = users.find(id);
    if (it == users.end())
        return nullptr;
    return it->second;
}"""
us_main = """#include "USocial.h"
#include "User.h"
#include "Photo.h"
#include "Audio.h"
#include "Video.h"
#include "Message.h"
#include <exception>
#include <iostream>
int main()
{
    USocial us;
    User* u1 = us.registerUser("Liron");
    User* u2 = us.registerUser("Yahav");
    User* u3 = us.registerUser("Shachaf");
    User* u4 = us.registerUser("Tsur", true);
    User* u5 = us.registerUser("Elit");
    u1->post("Hello world!");
    u2->post("I'm having a great time here :)", new Audio());
    u3->post("This is awesome!", new Photo());
    u5->addFriend(u1);
    u5->addFriend(u2);
    u5->viewFriendsPosts();
    u4->sendMessage(u5, new Message("Buy Falafel!"));
    u5->viewReceivedMessages();
    try
    {
        u3->sendMessage(u5, new Message("All your base are belong to us"));
    }
    catch (const std::exception& e)
    {
        std::cout << "error: " << e.what() << std::endl;
    }
    u5->viewReceivedMessages();
    u3->addFriend(u5);
    u3->sendMessage(u5, new Message("All your base are belong to us"));
    u5->viewReceivedMessages();
    return 0;
}"""

uso_inner = (
    p("תרגיל 3 לפי תרשים UML: מדיה אבסטרקטית, פוסט בבעלות על Media, משתמש רגיל שולח רק לחברים, BusinessUser לכולם, <code>std::find</code> על רשימת מזהים, <code>friend</code> בין USocial ל־User.")
    + fold("Media / Photo / Audio / Video", p("Media.h") + code(media_h) + p("Photo.h") + code(photo_h) + p("Audio.h") + code(audio_h) + p("Video.h") + code(video_h))
    + fold("Message ו־Post (בעלות על media)", p("Message.h") + code(message_h) + p("Post.h") + code(post_h) + p("Post.cpp") + code(post_cpp))
    + fold("User.h / User.cpp", p("User.h") + code(user_h) + p("User.cpp") + code(user_cpp))
    + fold("BusinessUser", p("BusinessUser.h") + code(bus_h) + p("BusinessUser.cpp") + code(bus_cpp))
    + fold("USocial", p("USocial.h") + code(us_h) + p("USocial.cpp") + code(us_cpp))
    + fold("main.cpp לבדיקה", code(us_main))
)

write_unit(
    OUT / "unit2-hw.js",
    "UNIT2",
    "u2-hw",
    "מטלות מהמרצה (מוסתרות)",
    "מטלות מלאות עם פתרון מהמרצה. סגורות כברירת מחדל — אפשר לנסות קודם ואחר כך לפתוח. לחצו על הכותרת כדי להרחיב.",
    [
        fold("שאלה 2 · CSV וזרמי C++ — הדרישה", csv_req),
        fold("שאלה 2 · CSV — פתרון מלא", csv_sol),
        fold("כלל השלוש · מחלקת Number וחידונים", rule_sol),
        fold("תרגיל 3 · USocial (UML, אבסטרקטי, איטרטור, find)", uso_inner),
    ],
)

# --- Python ---
ex1 = """def count_vowels(s, vowels):
    num_vowels = 0
    for letter in s:
        if letter in vowels:
            num_vowels += 1
    return num_vowels"""
ex2 = """def count_words_same_first_last(sentence):
    same_letter_count = 0
    words = sentence.split()
    for word in words:
        if word[0] == word[-1]:
            same_letter_count += 1
    return same_letter_count"""
ex3 = """def read_file_to_dictionary(filename):
    dictionary = {}
    file = open(filename, "r")
    for line in file:
        pair = line.split("=")
        dictionary[pair[0]] = int(pair[1])
    file.close()
    return dictionary"""
ex4 = """class Board:
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
        return result"""
repl = """class Person:
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
p.bye("Irena", q)"""
bank = """class BankAccount:
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
    return accounts"""
book = """class Book:
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
    return books"""

write_unit(
    OUT / "unit4-hw.js",
    "UNIT4",
    "u4-hw",
    "מטלות מהמרצה (מוסתרות)",
    "תרגילי פייתון ופתרונות מהמרצה (כולל דוגמת הספר). סגורות כברירת מחדל.",
    [
        fold("תרגיל 1 · ספירת תנועות", p("סופרים כמה תווים מ־s נמצאים במחרוזת vowels.") + code(ex1)),
        fold("תרגיל 2 · מילים שמתחילות ומסתיימות באותה אות", code(ex2)),
        fold("תרגיל 3 · קובץ key=value למילון", p("הפתרון של המרצה פותח ב־open/close. אפשר גם with.") + code(ex3)),
        fold("תרגיל 4 · מחלקת Board", p("לוח n×n, תא [i][j] מתחיל כ־i*j, set, ו־__str__.") + code(ex4)),
        fold("דוגמה · Replicator (מעטפת שמדביקה deco למחלקה)", p("פלט צפוי: שורת === Affected === לפני hello, ואז פעמיים לפני bye Irena (הארגומנט האחרון q מושפע).") + code(repl)),
        fold("BankAccount / InvestmentAccount מקובץ", code(bank)),
        fold("Book / BookSomething מקובץ", code(book)),
    ],
)

sql_21a74 = """import socket
import sqlite3
HOST = "119.4.7.5"
PORT = 8080
def read_message():
    with open("message.txt", "rb") as f:
        return f.read()
def receive_answer(sock):
    answer = sock.recv(128)
    text = answer.decode("utf-8")
    return text.splitlines()[:5]
def communicate_with_server(message):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((HOST, PORT))
        sock.sendall(message)
        return receive_answer(sock)
def save_messages(messages):
    conn = sqlite3.connect("messages.db")
    conn.executescript(\"\"\"
        CREATE TABLE messages(
            MessageNumber int NOT NULL PRIMARY KEY,
            MessageText varchar(128)
        );
    \"\"\")
    cur = conn.cursor()
    for i, message in enumerate(messages, 1):
        cur.execute("INSERT INTO messages VALUES (?, ?)", [i, message])
    conn.commit()
    conn.close()
def main():
    try:
        message = read_message()
        messages = communicate_with_server(message)
        for message in messages:
            print(message)
        save_messages(messages)
    except (OSError, UnicodeError, sqlite3.Error) as error:
        print("Error:", error)
main()"""

sql_students = """import sqlite3
conn = sqlite3.connect("server.db")
conn.executescript(\"\"\"
    CREATE TABLE Students(
        Name varchar(255),
        Id int NOT NULL PRIMARY KEY,
        Major varchar(255)
    );
    INSERT INTO Students VALUES ("Miri Regev", 1001, "Computer Science");
    INSERT INTO Students VALUES ("Dana Cohen", 1002, "Mathematics");
\"\"\")
conn.commit()
conn.close()
conn = sqlite3.connect("server.db")
cur = conn.cursor()
name = input("Enter student name: ")
cur.execute("SELECT * FROM Students WHERE Name = ?", [name])
rows = cur.fetchall()
if len(rows) > 0:
    print(rows[0][2])
else:
    print("Student not found")
conn.close()"""

sql_21c = """import sqlite3
conn = sqlite3.connect("server.db")
conn.executescript(\"\"\"
    CREATE TABLE Students(
        Name varchar(255),
        Id int NOT NULL PRIMARY KEY,
        School varchar(255)
    );
    INSERT INTO Students VALUES ("Yifat Shaha-Biton", 2001, "Open University");
    INSERT INTO Students VALUES ("Dana Cohen", 2002, "Technion");
\"\"\")
conn.commit()
conn.close()
conn = sqlite3.connect("server.db")
cur = conn.cursor()
name = input()
cur.execute("SELECT School FROM Students WHERE Name = ?", [name])
rows = cur.fetchall()
if len(rows) > 0:
    print(rows[0][0])
conn.close()"""

sql_filedata = """import sqlite3
conn = sqlite3.connect("file_data.db")
conn.executescript(\"\"\"
    CREATE TABLE FileData(
        LineNumber int NOT NULL PRIMARY KEY,
        Content varchar(1024)
    );
\"\"\")
cur = conn.cursor()
with open("data.txt", "r", encoding="utf-8") as f:
    line_number = 1
    for line in f:
        cur.execute(
            "INSERT INTO FileData VALUES (?, ?)",
            [line_number, line.rstrip("\\n")]
        )
        line_number += 1
conn.commit()
conn.close()"""

write_unit(
    OUT / "unit7-hw.js",
    "UNIT7",
    "u7-hw",
    "מטלות SQL מהמרצה (מוסתרות)",
    "פתרונות מלאים מהמרצה לשאלות SQLite במבחנים. כולם עם מציין מקום ? — בלי הדבקת קלט למחרוזת. סגורות כברירת מחדל.",
    [
        fold(
            "2021א · שקע + טבלת הודעות",
            p("קריאת קובץ, TCP, חמש שורות תשובה, INSERT עם פרמטרים.")
            + code(sql_21a74),
        ),
        fold(
            "2021א (75/78) · Students לפי שם",
            p("חולשת האבטחה אם מדביקים את השם לשאילתה היא הזרקת SQL. האפחות: ? והעברת השם בנפרד, כמו בסעיף ב'.")
            + code(sql_students),
        ),
        fold("2021ג · Students ו־School", code(sql_21c)),
        fold(
            "2026א · סעיף ב · FileData מקובץ טקסט",
            p("סעיף א בפתרון המרצה הוא שרת קבצים ב־C++ (Boost.Asio). כאן סעיף ב' בלבד — טבלה ו־INSERT עם פרמטרים. שרת השקעים נלמד ביחידה 5.")
            + code(sql_filedata),
        ),
    ],
)

print("done")
