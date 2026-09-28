UNIT2.sections.push({
  id: "u2-hw",
  title: "תרגילי המרצה",
  html: `
<p>כאן התרגילים שהמרצה שלח, עם הפתרון. הם סגורים בהתחלה: אפשר לנסות לבד, ואז לפתוח את הכותרת.</p><details class="fold"><summary>שאלה 2 · CSV וזרמי C++ — הדרישה</summary><div class="fold-body"><p>CSV (Comma-Separated Values) הוא טקסט טבלאי: כל שורה היא רשומה, והפסיקים מפרידים בין השדות. שדה שמכיל אותיות לא נספר. שדה מספרי מתווסף גם לסכום השורה וגם לסכום העמודה שלו.</p><p>בדוגמה יש שתי שורות. <code>10,20,hello,30</code> מסתכמת ל־60, ו־<code>5,test,15,25</code> מסתכמת ל־45. סכומי העמודות: 15, 20, 15 ו־55. העמודה השנייה היא רק 20 כי <code>test</code> אינו מספר, והשלישית רק 15 כי <code>hello</code> אינו מספר.</p><p>התוכנית מקבלת שם קובץ ב־<code>argv[1]</code>, מדפיסה את סכום כל שורה, ואחר כך את סכום כל עמודה.</p></div></details><details class="fold"><summary>שאלה 2 · CSV — פתרון מלא</summary><div class="fold-body"><p>פתרון המרצה במחלקה עם זרם קלט, <code>getline</code> לשורה ו־<code>stringstream</code> לשדה. בדיקה מספרית: קריאת <code>int</code> ואז תו עודף — אם אין תו, כל השדה היה מספר.</p><p>המימוש כאן משתמש ב־<code>new int[]</code>; בקורס עדיף בדרך כלל <code>std::vector</code>, אבל זה הקוד שנשלח עם המטלה.</p><p><strong>CSVProcessor.h</strong></p><pre class="code"><code>#pragma once
#include &lt;fstream&gt;
#include &lt;string&gt;
class CSVProcessor
{
private:
    std::ifstream input;
    void processLine(const std::string&amp; line,
                     int* columnSums,
                     unsigned int columnCount,
                     unsigned int rowNumber);
public:
    CSVProcessor(const std::string&amp; fileName);
    void process();
};</code></pre><p><strong>CSVProcessor.cpp</strong></p><pre class="code"><code>#include "CSVProcessor.h"
#include &lt;iostream&gt;
#include &lt;sstream&gt;
#include &lt;stdexcept&gt;
CSVProcessor::CSVProcessor(const std::string&amp; fileName)
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
    for (unsigned int i = 0; i &lt; line.length(); ++i)
    {
        if (line[i] == ',')
            ++columnCount;
    }
    int* columnSums = new int[columnCount];
    for (unsigned int i = 0; i &lt; columnCount; ++i)
        columnSums[i] = 0;
    unsigned int rowNumber = 1;
    processLine(line, columnSums, columnCount, rowNumber);
    ++rowNumber;
    while (std::getline(input, line))
    {
        processLine(line, columnSums, columnCount, rowNumber);
        ++rowNumber;
    }
    std::cout &lt;&lt; "Column sums:" &lt;&lt; std::endl;
    for (unsigned int i = 0; i &lt; columnCount; ++i)
    {
        std::cout &lt;&lt; "Column " &lt;&lt; i + 1
                  &lt;&lt; ": " &lt;&lt; columnSums[i] &lt;&lt; std::endl;
    }
    delete[] columnSums;
}
void CSVProcessor::processLine(
    const std::string&amp; line,
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
        if ((fieldStream &gt;&gt; value) &amp;&amp; !(fieldStream &gt;&gt; extra))
        {
            rowSum += value;
            if (column &lt; columnCount)
                columnSums[column] += value;
        }
        ++column;
    }
    std::cout &lt;&lt; "Row " &lt;&lt; rowNumber
              &lt;&lt; " sum: " &lt;&lt; rowSum &lt;&lt; std::endl;
}</code></pre><p><strong>main.cpp</strong></p><pre class="code"><code>#include "CSVProcessor.h"
#include &lt;exception&gt;
#include &lt;iostream&gt;
int main(int argc, char* argv[])
{
    if (argc != 2)
    {
        std::cout &lt;&lt; "Usage: csv_read &lt;file.csv&gt;" &lt;&lt; std::endl;
        return 1;
    }
    try
    {
        CSVProcessor processor(argv[1]);
        processor.process();
    }
    catch (const std::exception&amp; e)
    {
        std::cout &lt;&lt; "Error: " &lt;&lt; e.what() &lt;&lt; std::endl;
        return 1;
    }
    return 0;
}</code></pre></div></details><details class="fold"><summary>כלל השלוש · מחלקת Number וחידונים</summary><div class="fold-body"><p>כלל השלוש: אם המחלקה מחזיקה משאב וכותבים מפרק, בנאי העתקה או אופרטור השמה, כמעט תמיד צריך את שלושתם. כל <code>Number</code> מחזיק <code>int</code> נפרד בערימה. <code>this != &amp;other</code> מונע השמה עצמית כמו <code>a = a</code>, שבה היינו מוחקים את הערך ואז קוראים ממנו. בגרסה הזו מוחקים את הבלוק הישן לפני <code>new</code>. אם ההקצאה נכשלת, האובייקט נשאר עם מצביע שכבר שוחרר.</p><pre class="code"><code>class Number {
private:
    int* value;
public:
    Number(int n) {
        value = new int(n);
    }
    ~Number() {
        delete value;
    }
    Number(const Number&amp; other) {
        value = new int(*other.value);
    }
    Number&amp; operator=(const Number&amp; other) {
        if (this != &amp;other) {
            delete value;
            value = new int(*other.value);
        }
        return *this;
    }
};</code></pre><p><strong>חידון 1.</strong> מה יודפס?</p><pre class="code"><code>#include &lt;iostream&gt;
class Person {
public:
    Person(int value) : age(value) {
        std::cout &lt;&lt; "regular constructor\\n";
    }
    Person(const Person&amp; other) : age(other.age) {
        std::cout &lt;&lt; "copy constructor\\n";
    }
    Person&amp; operator=(const Person&amp; other) {
        age = other.age;
        std::cout &lt;&lt; "assignment operator\\n";
        return *this;
    }
    ~Person() {
        std::cout &lt;&lt; "destructor\\n";
    }
private:
    int age;
};
int main() {
    Person a(10);
    Person b = a;
    Person c(30);
    c = a;
}</code></pre><p><code>Person a(10)</code> קורא לבנאי הרגיל. <code>Person b = a</code> הוא אתחול, ולכן בנאי העתקה ולא השמה. <code>Person c(30)</code> שוב בנאי רגיל, ורק <code>c = a</code> הוא אופרטור השמה. בסוף שלושת האובייקטים המקומיים נהרסים בסדר הפוך לבנייה: c, אחר כך b, אחר כך a. מי שבוחר השמה גם עבור <code>b = a</code>, או מפרק באמצע, מפספס את ההבחנה בין אתחול להשמה.</p><p><strong>חידון 2.</strong> אחרי <code>string food = "Pizza";</code>, הפניה נכתבת <code>string&amp; meal = food;</code>. <code>string meal = food</code> מעתיק. <code>string* meal = &amp;food</code> הוא מצביע. <code>string&amp; meal = &amp;food</code> לא מתקמפל: בצד ימין יש כתובת, לא אובייקט.</p><p><strong>חידון 3.</strong> מצביע לאותה מחרוזת: <code>string* pMeal = &amp;food;</code>. בלי הכוכבית זו מחרוזת חדשה. עם <code>&amp;</code> בטיפוס זו הפניה. <code>string* pMeal = food</code> לא מתקמפל: מצביע מקבל כתובת, לא את המחרוזת עצמה.</p></div></details><details class="fold"><summary>תרגיל 3 · USocial (UML, אבסטרקטי, איטרטור, find)</summary><div class="fold-body"><p>תרגיל 3 לפי תרשים UML: מדיה אבסטרקטית, פוסט בבעלות על Media, משתמש רגיל שולח רק לחברים, BusinessUser לכולם, <code>std::find</code> על רשימת מזהים, <code>friend</code> בין USocial ל־User.</p><details class="fold"><summary>Media / Photo / Audio / Video</summary><div class="fold-body"><p>Media.h</p><pre class="code"><code>#pragma once
class Media
{
public:
    virtual ~Media() = default;
    virtual void display() const = 0;
};</code></pre><p>Photo.h</p><pre class="code"><code>#pragma once
#include "Media.h"
#include &lt;iostream&gt;
class Photo : public Media
{
public:
    void display() const
    {
        std::cout &lt;&lt; "image";
    }
};</code></pre><p>Audio.h</p><pre class="code"><code>#pragma once
#include "Media.h"
#include &lt;iostream&gt;
class Audio : public Media
{
public:
    void display() const
    {
        std::cout &lt;&lt; "audio";
    }
};</code></pre><p>Video.h</p><pre class="code"><code>#pragma once
#include "Media.h"
#include &lt;iostream&gt;
class Video : public Media
{
public:
    void display() const
    {
        std::cout &lt;&lt; "video";
    }
};</code></pre></div></details><details class="fold"><summary>Message ו־Post (בעלות על media)</summary><div class="fold-body"><p>Message.h</p><pre class="code"><code>#pragma once
#include &lt;string&gt;
class Message
{
private:
    std::string text;
public:
    Message(const std::string&amp; text)
        : text(text)
    {
    }
    std::string getText() const
    {
        return text;
    }
};</code></pre><p>Post.h</p><pre class="code"><code>#pragma once
#include &lt;string&gt;
class Media;
class Post
{
private:
    std::string text;
    Media* media;
public:
    Post(const std::string&amp; text);
    Post(const std::string&amp; text, Media* media);
    ~Post();
    std::string getText() const;
    Media* getMedia() const;
};</code></pre><p>Post.cpp</p><pre class="code"><code>#include "Post.h"
#include "Media.h"
Post::Post(const std::string&amp; text)
    : text(text), media(nullptr)
{
}
Post::Post(const std::string&amp; text, Media* media)
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
}</code></pre></div></details><details class="fold"><summary>User.h / User.cpp</summary><div class="fold-body"><p>User.h</p><pre class="code"><code>#pragma once
#include &lt;list&gt;
#include &lt;string&gt;
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
    std::list&lt;unsigned long&gt; friends;
    std::list&lt;Post*&gt; posts;
    std::list&lt;Message*&gt; receivedMsgs;
    User();
    virtual ~User();
public:
    unsigned long getId() const;
    std::string getName() const;
    void addFriend(User* user);
    void removeFriend(User* user);
    void post(const std::string&amp; text);
    void post(const std::string&amp; text, Media* media);
    std::list&lt;Post*&gt; getPosts() const;
    void viewFriendsPosts() const;
    void receiveMessage(Message* message);
    virtual void sendMessage(User* user, Message* message);
    void viewReceivedMessages() const;
};</code></pre><p>User.cpp</p><pre class="code"><code>#include "User.h"
#include "USocial.h"
#include "Post.h"
#include "Message.h"
#include "Media.h"
#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
User::User()
    : us(nullptr), id(0)
{
}
User::~User()
{
    std::list&lt;Post*&gt;::iterator postIt;
    for (postIt = posts.begin(); postIt != posts.end(); ++postIt)
        delete *postIt;
    std::list&lt;Message*&gt;::iterator msgIt;
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
    std::list&lt;unsigned long&gt;::iterator it;
    it = std::find(friends.begin(), friends.end(), user-&gt;getId());
    if (it != friends.end())
        throw std::runtime_error("user is already a friend");
    friends.push_back(user-&gt;getId());
}
void User::removeFriend(User* user)
{
    if (user == nullptr)
        throw std::invalid_argument("invalid user");
    std::list&lt;unsigned long&gt;::iterator it;
    it = std::find(friends.begin(), friends.end(), user-&gt;getId());
    if (it == friends.end())
        throw std::runtime_error("user is not a friend");
    friends.erase(it);
}
void User::post(const std::string&amp; text)
{
    posts.push_back(new Post(text));
}
void User::post(const std::string&amp; text, Media* media)
{
    posts.push_back(new Post(text, media));
}
std::list&lt;Post*&gt; User::getPosts() const { return posts; }
void User::viewFriendsPosts() const
{
    std::list&lt;unsigned long&gt;::const_iterator friendIt;
    for (friendIt = friends.begin(); friendIt != friends.end(); ++friendIt)
    {
        User* friendUser = us-&gt;getUserById(*friendIt);
        if (friendUser == nullptr)
            continue;
        std::list&lt;Post*&gt; friendPosts = friendUser-&gt;getPosts();
        std::list&lt;Post*&gt;::const_iterator postIt;
        for (postIt = friendPosts.begin(); postIt != friendPosts.end(); ++postIt)
        {
            Post* currentPost = *postIt;
            std::cout &lt;&lt; friendUser-&gt;getName() &lt;&lt; ": " &lt;&lt; currentPost-&gt;getText();
            if (currentPost-&gt;getMedia() != nullptr)
            {
                std::cout &lt;&lt; " ";
                currentPost-&gt;getMedia()-&gt;display();
            }
            std::cout &lt;&lt; std::endl;
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
    std::list&lt;unsigned long&gt;::iterator it;
    it = std::find(friends.begin(), friends.end(), user-&gt;getId());
    if (it == friends.end())
        throw std::runtime_error("regular user can send messages only to friends");
    user-&gt;receiveMessage(message);
}
void User::viewReceivedMessages() const
{
    std::list&lt;Message*&gt;::const_iterator it;
    for (it = receivedMsgs.begin(); it != receivedMsgs.end(); ++it)
        std::cout &lt;&lt; (*it)-&gt;getText() &lt;&lt; std::endl;
}</code></pre></div></details><details class="fold"><summary>BusinessUser</summary><div class="fold-body"><p>BusinessUser.h</p><pre class="code"><code>#pragma once
#include "User.h"
class BusinessUser : public User
{
public:
    void sendMessage(User* user, Message* message);
};</code></pre><p>BusinessUser.cpp</p><pre class="code"><code>#include "BusinessUser.h"
#include "Message.h"
#include &lt;stdexcept&gt;
void BusinessUser::sendMessage(User* user, Message* message)
{
    if (user == nullptr || message == nullptr)
        throw std::invalid_argument("invalid user or message");
    user-&gt;receiveMessage(message);
}</code></pre></div></details><details class="fold"><summary>USocial</summary><div class="fold-body"><p>USocial.h</p><pre class="code"><code>#pragma once
#include &lt;map&gt;
#include &lt;string&gt;
class User;
class USocial
{
    friend class User;
private:
    std::map&lt;unsigned long, User*&gt; users;
public:
    USocial();
    ~USocial();
    User* registerUser(const std::string&amp; name, bool business = false);
    void removeUser(User* user);
    User* getUserById(unsigned long id) const;
};</code></pre><p>USocial.cpp</p><pre class="code"><code>#include "USocial.h"
#include "User.h"
#include "BusinessUser.h"
#include &lt;stdexcept&gt;
USocial::USocial() {}
USocial::~USocial()
{
    std::map&lt;unsigned long, User*&gt;::iterator it;
    for (it = users.begin(); it != users.end(); ++it)
        delete it-&gt;second;
}
User* USocial::registerUser(const std::string&amp; name, bool business)
{
    static unsigned long nextId = 1;
    User* user = nullptr;
    if (business)
        user = new BusinessUser();
    else
        user = new User();
    user-&gt;id = nextId;
    ++nextId;
    user-&gt;name = name;
    user-&gt;us = this;
    users[user-&gt;id] = user;
    return user;
}
void USocial::removeUser(User* user)
{
    if (user == nullptr)
        throw std::invalid_argument("invalid user");
    std::map&lt;unsigned long, User*&gt;::iterator it;
    it = users.find(user-&gt;getId());
    if (it == users.end())
        throw std::runtime_error("user does not exist");
    unsigned long removedId = user-&gt;getId();
    std::map&lt;unsigned long, User*&gt;::iterator userIt;
    for (userIt = users.begin(); userIt != users.end(); ++userIt)
        userIt-&gt;second-&gt;friends.remove(removedId);
    delete it-&gt;second;
    users.erase(it);
}
User* USocial::getUserById(unsigned long id) const
{
    std::map&lt;unsigned long, User*&gt;::const_iterator it;
    it = users.find(id);
    if (it == users.end())
        return nullptr;
    return it-&gt;second;
}</code></pre></div></details><details class="fold"><summary>main.cpp לבדיקה</summary><div class="fold-body"><pre class="code"><code>#include "USocial.h"
#include "User.h"
#include "Photo.h"
#include "Audio.h"
#include "Video.h"
#include "Message.h"
#include &lt;exception&gt;
#include &lt;iostream&gt;
int main()
{
    USocial us;
    User* u1 = us.registerUser("Liron");
    User* u2 = us.registerUser("Yahav");
    User* u3 = us.registerUser("Shachaf");
    User* u4 = us.registerUser("Tsur", true);
    User* u5 = us.registerUser("Elit");
    u1-&gt;post("Hello world!");
    u2-&gt;post("I'm having a great time here :)", new Audio());
    u3-&gt;post("This is awesome!", new Photo());
    u5-&gt;addFriend(u1);
    u5-&gt;addFriend(u2);
    u5-&gt;viewFriendsPosts();
    u4-&gt;sendMessage(u5, new Message("Buy Falafel!"));
    u5-&gt;viewReceivedMessages();
    try
    {
        u3-&gt;sendMessage(u5, new Message("All your base are belong to us"));
    }
    catch (const std::exception&amp; e)
    {
        std::cout &lt;&lt; "error: " &lt;&lt; e.what() &lt;&lt; std::endl;
    }
    u5-&gt;viewReceivedMessages();
    u3-&gt;addFriend(u5);
    u3-&gt;sendMessage(u5, new Message("All your base are belong to us"));
    u5-&gt;viewReceivedMessages();
    return 0;
}</code></pre></div></details></div></details>
  `,
});
