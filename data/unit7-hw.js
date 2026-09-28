UNIT7.sections.push({
  id: "u7-hw",
  title: "תרגילי SQL מהמרצה",
  html: `
<p>פתרונות מהמרצה לשאלות SQLite. הקלט נכנס דרך <code>?</code>, לא בהדבקה למחרוזת. הם סגורים בהתחלה.</p><details class="fold"><summary>2021א · שקע וטבלת הודעות</summary><div class="fold-body"><p>קוראים קובץ, שולחים ב־TCP, מדפיסים עד חמש שורות תשובה, ושומרים ב־INSERT עם פרמטרים. <code>recv(128)</code> פעם אחת לא מבטיח שהגיעו חמש שורות: בזרם TCP הקריאה יכולה לחזור חלקית, כמו <code>recv_exact</code> ביחידה 5.</p><pre class="code"><code>import socket
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
    conn.executescript("""
        CREATE TABLE messages(
            MessageNumber int NOT NULL PRIMARY KEY,
            MessageText varchar(128)
        );
    """)
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
main()</code></pre></div></details><details class="fold"><summary>2021א (75/78) · Students לפי שם</summary><div class="fold-body"><p>אם מדביקים את השם לתוך מחרוזת השאילתה, זו הזרקת SQL. האפחות היא <code>?</code> והעברת השם בנפרד. במחרוזות SQL עדיף גרש בודד. בפתרון כאן יש גרשיים כפולים; SQLite מקבל אותם כמחרוזת כשאין עמודה בשם הזה, אבל מנוע אחר עלול לקרוא אותם כשם עמודה.</p><pre class="code"><code>import sqlite3
conn = sqlite3.connect("server.db")
conn.executescript("""
    CREATE TABLE Students(
        Name varchar(255),
        Id int NOT NULL PRIMARY KEY,
        Major varchar(255)
    );
    INSERT INTO Students VALUES ("Miri Regev", 1001, "Computer Science");
    INSERT INTO Students VALUES ("Dana Cohen", 1002, "Mathematics");
""")
conn.commit()
conn.close()
conn = sqlite3.connect("server.db")
cur = conn.cursor()
name = input("Enter student name: ")
cur.execute("SELECT * FROM Students WHERE Name = ?", [name])
rows = cur.fetchall()
if len(rows) &gt; 0:
    print(rows[0][2])
else:
    print("Student not found")
conn.close()</code></pre></div></details><details class="fold"><summary>2021ג · Students ו־School</summary><div class="fold-body"><pre class="code"><code>import sqlite3
conn = sqlite3.connect("server.db")
conn.executescript("""
    CREATE TABLE Students(
        Name varchar(255),
        Id int NOT NULL PRIMARY KEY,
        School varchar(255)
    );
    INSERT INTO Students VALUES ("Yifat Shaha-Biton", 2001, "Open University");
    INSERT INTO Students VALUES ("Dana Cohen", 2002, "Technion");
""")
conn.commit()
conn.close()
conn = sqlite3.connect("server.db")
cur = conn.cursor()
name = input()
cur.execute("SELECT School FROM Students WHERE Name = ?", [name])
rows = cur.fetchall()
if len(rows) &gt; 0:
    print(rows[0][0])
conn.close()</code></pre></div></details><details class="fold"><summary>2026א · סעיף ב · FileData מקובץ טקסט</summary><div class="fold-body"><p>סעיף א בפתרון המרצה הוא שרת קבצים ב־C++ (Boost.Asio). כאן סעיף ב' בלבד — טבלה ו־INSERT עם פרמטרים. שרת השקעים נלמד ביחידה 5.</p><pre class="code"><code>import sqlite3
conn = sqlite3.connect("file_data.db")
conn.executescript("""
    CREATE TABLE FileData(
        LineNumber int NOT NULL PRIMARY KEY,
        Content varchar(1024)
    );
""")
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
conn.close()</code></pre></div></details>
  `,
});
