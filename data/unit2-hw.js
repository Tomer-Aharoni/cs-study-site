UNIT2.sections.push({
  id: "u2-hw",
  title: "תרגילי המרצה",
  html: `
<p>כאן התרגילים שהמרצה שלח, עם הפתרון. הם סגורים בהתחלה: אפשר לנסות לבד, ואז לפתוח את הכותרת.</p><details class="fold"><summary>שאלה 2 · CSV וזרמים (Streams) ב־C++ — הדרישה</summary><div class="fold-body"><p>כאן CSV (Comma-Separated Values) הוא פורמט מפושט: כל שורה היא רשומה והפסיקים מפרידים בין שדות; אין שדות מצוטטים שמכילים פסיקים. רק שדה שמייצג מספר שלם מסוג <code>int</code> נספר. הערך מתווסף גם לסכום השורה וגם לסכום העמודה שלו, וכל השורות חייבות להכיל אותו מספר שדות.</p><p>בדוגמה יש שתי שורות. <code>10,20,hello,30</code> מסתכמת ל־60, ו־<code>5,test,15,25</code> מסתכמת ל־45. סכומי העמודות: 15, 20, 15 ו־55. העמודה השנייה היא רק 20 כי <code>test</code> אינו מספר, והשלישית רק 15 כי <code>hello</code> אינו מספר.</p><p>ארגומנטים של שורת הפקודה (Command-Line Arguments) מגיעים אל <code>main</code> דרך <code>argc</code>, מספר הארגומנטים, ו־<code>argv</code>, מערך המחרוזות שלהם. שם הקובץ נמצא ב־<code>argv[1]</code>. התוכנית מדפיסה את סכום כל שורה ואחר כך את סכום כל עמודה.</p></div></details><details class="fold"><summary>שאלה 2 · CSV — פתרון מלא</summary><div class="fold-body"><p>הפתרון משתמש במחלקה עם זרם קלט (Input Stream), ב־<code>getline</code> לקריאת שורה וב־<code>stringstream</code> לפירוק שדה. בדיקה מספרית קוראת <code>int</code> ואז מנסה לקרוא תו עודף; אם אין תו, כל השדה היה מספר שלם. <code>std::vector</code> היא מכולה שמנהלת בעצמה את הזיכרון, <code>std::size_t</code> הוא טיפוס למידות ולאינדקסים, ו־<code>long long</code> נותן לסכומים טווח רחב יותר. <code>std::count</code> סופרת פסיקים, ו־<code>std::numeric_limits</code> מספקת את גבולות הטיפוס כדי לזהות גלישת סכום.</p><p><strong>CSVProcessor.h</strong></p><pre class="code"><code>#pragma once
#include &lt;cstddef&gt;
#include &lt;fstream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
class CSVProcessor
{
private:
    std::ifstream input;
    void processLine(const std::string&amp; line,
                     std::vector&lt;long long&gt;&amp; columnSums,
                     std::size_t rowNumber);
    static void addChecked(long long&amp; sum, int value);
public:
    CSVProcessor(const std::string&amp; fileName);
    void process();
};</code></pre><p><strong>CSVProcessor.cpp</strong></p><pre class="code"><code>#include "CSVProcessor.h"
#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;limits&gt;
#include &lt;sstream&gt;
#include &lt;stdexcept&gt;
CSVProcessor::CSVProcessor(const std::string&amp; fileName)
    : input(fileName)
{
    if (!input)
        throw std::runtime_error("Could not open file");
}
void CSVProcessor::addChecked(long long&amp; sum, int value)
{
    const long long max = std::numeric_limits&lt;long long&gt;::max();
    const long long min = std::numeric_limits&lt;long long&gt;::min();
    if ((value &gt; 0 &amp;&amp; sum &gt; max - value) ||
        (value &lt; 0 &amp;&amp; sum &lt; min - value))
        throw std::overflow_error("sum is too large");
    sum += value;
}
void CSVProcessor::process()
{
    std::string line;
    if (!std::getline(input, line))
        return;
    const std::size_t columnCount =
        1 + std::count(line.begin(), line.end(), ',');
    std::vector&lt;long long&gt; columnSums(columnCount, 0);
    std::size_t rowNumber = 1;
    processLine(line, columnSums, rowNumber);
    ++rowNumber;
    while (std::getline(input, line))
    {
        processLine(line, columnSums, rowNumber);
        ++rowNumber;
    }
    std::cout &lt;&lt; "Column sums:" &lt;&lt; std::endl;
    for (std::size_t i = 0; i &lt; columnSums.size(); ++i)
    {
        std::cout &lt;&lt; "Column " &lt;&lt; i + 1
                  &lt;&lt; ": " &lt;&lt; columnSums[i] &lt;&lt; std::endl;
    }
}
void CSVProcessor::processLine(
    const std::string&amp; line,
    std::vector&lt;long long&gt;&amp; columnSums,
    std::size_t rowNumber)
{
    const std::size_t fieldCount =
        1 + std::count(line.begin(), line.end(), ',');
    if (fieldCount != columnSums.size())
        throw std::runtime_error("inconsistent column count");
    std::stringstream lineStream(line);
    std::string field;
    std::size_t column = 0;
    long long rowSum = 0;
    while (std::getline(lineStream, field, ','))
    {
        std::stringstream fieldStream(field);
        int value;
        char extra;
        if ((fieldStream &gt;&gt; value) &amp;&amp; !(fieldStream &gt;&gt; extra))
        {
            addChecked(rowSum, value);
            addChecked(columnSums[column], value);
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
}</code></pre></div></details><details class="fold"><summary>כלל השלוש (Rule of Three) · מחלקת Number וחידונים</summary><div class="fold-body"><p>כלל השלוש (Rule of Three): אם המחלקה מחזיקה משאב בבעלותה וכותבים מפרק, בנאי העתקה או אופרטור השמה, כמעט תמיד צריך את שלושתם. כל <code>Number</code> מחזיק <code>int</code> נפרד בערימה. הבדיקה <code>this != &amp;other</code> מטפלת בהשמה עצמית (Self-Assignment), כגון <code>a = a</code>. בהשמה מקצים קודם עותק חדש; רק לאחר שההקצאה הצליחה משחררים את הבלוק הישן.</p><pre class="code"><code>class Number {
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
            int* copy = new int(*other.value);
            delete value;
            value = copy;
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
}</code></pre><p><strong>חידון 1 (שאלון המרצה בנושא בנאים, השמה ומחזור חיים) — ניתוח ביצוע ומעקב זיכרון מלא:</strong></p><p>מעקב מפורט שורה-אחר-שורה בזיכרון:</p><ol><li><code>Person a(10);</code> — יצירת מופע מקומי ראשון על גבי המחסנית (Stack Frame). מועבר ארגומנט שלם, ולכן מופעל הבנאי הרגיל (Regular Constructor). הדפסה: <code>regular constructor</code>.</li><li><code>Person b = a;</code> — <strong>מוקש הבחינה המרכזי!</strong> למרות נוכחות הסימן <code>=</code>, זוהי שורת הכרזה ואתחול של אובייקט חדש <code>b</code> שטרם היה קיים. ב-C++, אתחול מופע חדש ממופע קיים מפעיל תמיד את <strong>בנאי ההעתקה (Copy Constructor)</strong> ולא את אופרטור ההשמה! הדפסה: <code>copy constructor</code>.</li><li><code>Person c(30);</code> — יצירת מופע מקומי נוסף על המחסנית עם ארגומנט. מופעל שוב הבנאי הרגיל. הדפסה: <code>regular constructor</code>.</li><li><code>c = a;</code> — האובייקט <code>c</code> כבר נוצר והוגדר קודם לכן. זוהי פעולת השמה בין שני אובייקטים קיימים, ולכן נקרא <strong>אופרטור ההשמה (Copy Assignment Operator)</strong>. הדפסה: <code>assignment operator</code>.</li><li><strong>סיום הפונקציה <code>main</code> ויציאה מהתחום (Scope Exit):</strong> שלושת האובייקטים (a, b, c) נוצרו במחסנית כמשתנים מקומיים (Automatic Storage Duration). לפי חוק הברזל של C++, אובייקטים במחסנית נהרסים בסדר הפוך לחלוטין מסדר בנייתם — <strong>LIFO (Last-In, First-Out)</strong>:<ul><li>ראשון נהרס <code>c</code> (נבנה שלישי) &larr; מפרק מדפיס <code>destructor</code>.</li><li>שני נהרס <code>b</code> (נבנה שני) &larr; מפרק מדפיס <code>destructor</code>.</li><li>שלישי נהרס <code>a</code> (נבנה ראשון) &larr; מפרק מדפיס <code>destructor</code>.</li></ul></li></ol><p>סדר ההדפסה הסופי המלא: <code>regular constructor</code> &larr; <code>copy constructor</code> &larr; <code>regular constructor</code> &larr; <code>assignment operator</code> &larr; <code>destructor</code> &larr; <code>destructor</code> &larr; <code>destructor</code>.</p><p><em>פירוק מסיחים ומלכודות:</em> מי שבוחר אופרטור השמה עבור <code>Person b = a</code> נופל במלכודת הסימן <code>=</code>; מי שמניח שהמפרק מופעל באמצע שוכח שמשתנים מקומיים נהרסים אך ורק ביציאה מטווח ההגדרה; ומי שסופר פחות משלושה מפרקים מתעלם מכך שנוצרו שלושה אובייקטים שלמים במחסנית.</p><p><strong>חידון 2 (דוגמת אבטחה — הפניה לטוקן אימות):</strong> אחרי ההצהרה <code>std::string authToken = "SecretAuthToken_42";</code>, הפניה לטוקן (Reference) נכתבת <code>std::string&amp; tokenRef = authToken;</code> (כינוי ישיר לאותו תא זיכרון, שאינו מעתיק את המחרוזת הרגישה). לעומת זאת, <code>std::string tokenCopy = authToken;</code> מבצעת העתקה עמוקה ומייצרת עותק נוסף של הסוד בזיכרון. הכרזה <code>std::string* pToken = &amp;authToken;</code> יוצרת מצביע שמחזיק את כתובת הטוקן. ההצהרה <code>std::string&amp; tokenRef = &amp;authToken;</code> תיכשל בהידור: בצד ימין יש כתובת זיכרון מטיפוס מצביע, ולא אובייקט (Lvalue).</p><p><strong>חידון 3 (דוגמת אבטחה — מצביע לטוקן אימות):</strong> מצביע לאותו טוקן אבטחה נכתב <code>std::string* pToken = &amp;authToken;</code>. ללא הכוכבית זו מחרוזת חדשה המעתיקה ערך. עם <code>&amp;</code> בטיפוס (<code>std::string&amp;</code>) זו הפניה (Reference). ההצהרה <code>std::string* pToken = authToken;</code> תיכשל בהידור: מצביע דורש כתובת זיכרון (אופרטור <code>&amp;</code>), ולא את ערך המחרוזת עצמה.</p></div></details><details class="fold"><summary>תרגיל 3 · USocial (UML, מחלקה אבסטרקטית, איטרטור, find)</summary><div class="fold-body"><p>תרגיל 3 לפי תרשים UML: מדיה אבסטרקטית (Abstract Media), פוסט בעלים של Media, משתמש רגיל שולח רק לחברים באותה רשת, BusinessUser לכל משתמש באותה רשת, <code>std::find</code> עם איטרטור (Iterator) על רשימת מזהים, ו־<code>friend</code> בין USocial ל־User.</p><p>הפתרון משתמש בבעלות יחידה (Unique Ownership): כל משאב מוחזק ב־<code>std::unique_ptr</code>, מצביע חכם שמוחק אותו אוטומטית. העברת בעלות נעשית ב־<code>std::move</code>. המחלקות שמחזיקות בעלות אוסרות העתקה כדי שלא יהיו שני בעלים לאותו אובייקט.</p><p>הכרזה מקדימה (Forward Declaration), כגון <code>class Media;</code>, מודיעה למהדר שהטיפוס קיים בלי לכלול עדיין את כל הגדרתו. ההגדרה המלאה נכללת בקובץ המימוש שבו משתמשים באיברי הטיפוס.</p><details class="fold"><summary>Media / Photo / Audio / Video</summary><div class="fold-body"><p>Media.h</p><pre class="code"><code>#pragma once
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
    void display() const override
    {
        std::cout &lt;&lt; "image";
    }
};</code></pre><p>Audio.h</p><pre class="code"><code>#pragma once
#include "Media.h"
#include &lt;iostream&gt;
class Audio : public Media
{
public:
    void display() const override
    {
        std::cout &lt;&lt; "audio";
    }
};</code></pre><p>Video.h</p><pre class="code"><code>#pragma once
#include "Media.h"
#include &lt;iostream&gt;
class Video : public Media
{
public:
    void display() const override
    {
        std::cout &lt;&lt; "video";
    }
};</code></pre></div></details><details class="fold"><summary>Message ו־Post — בעלות (Ownership) על Media</summary><div class="fold-body"><p>Message.h</p><pre class="code"><code>#pragma once
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
#include &lt;memory&gt;
#include &lt;string&gt;
class Media;
class Post
{
private:
    std::string text;
    std::unique_ptr&lt;Media&gt; media;
public:
    Post(const std::string&amp; text);
    Post(const std::string&amp; text, std::unique_ptr&lt;Media&gt; media);
    ~Post();
    Post(const Post&amp;) = delete;
    Post&amp; operator=(const Post&amp;) = delete;
    std::string getText() const;
    const Media* getMedia() const;
};</code></pre><p>Post.cpp</p><pre class="code"><code>#include "Post.h"
#include "Media.h"
#include &lt;utility&gt;
Post::Post(const std::string&amp; text)
    : text(text), media(nullptr)
{
}
Post::Post(const std::string&amp; text, std::unique_ptr&lt;Media&gt; media)
    : text(text), media(std::move(media))
{
}
Post::~Post() = default;
std::string Post::getText() const
{
    return text;
}
const Media* Post::getMedia() const
{
    return media.get();
}</code></pre></div></details><details class="fold"><summary>User.h / User.cpp</summary><div class="fold-body"><p>User.h</p><pre class="code"><code>#pragma once
#include &lt;list&gt;
#include &lt;memory&gt;
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
    std::list&lt;std::unique_ptr&lt;Post&gt;&gt; posts;
    std::list&lt;std::unique_ptr&lt;Message&gt;&gt; receivedMsgs;
    User();
    void validateTarget(User* user) const;
public:
    virtual ~User();
    User(const User&amp;) = delete;
    User&amp; operator=(const User&amp;) = delete;
    unsigned long getId() const;
    std::string getName() const;
    void addFriend(User* user);
    void removeFriend(User* user);
    void post(const std::string&amp; text);
    void post(const std::string&amp; text, std::unique_ptr&lt;Media&gt; media);
    const std::list&lt;std::unique_ptr&lt;Post&gt;&gt;&amp; getPosts() const;
    void viewFriendsPosts() const;
    void receiveMessage(std::unique_ptr&lt;Message&gt; message);
    virtual void sendMessage(User* user, std::unique_ptr&lt;Message&gt; message);
    void viewReceivedMessages() const;
};</code></pre><p>User.cpp</p><pre class="code"><code>#include "User.h"
#include "USocial.h"
#include "Post.h"
#include "Message.h"
#include "Media.h"
#include &lt;algorithm&gt;
#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;stdexcept&gt;
#include &lt;utility&gt;
User::User()
    : us(nullptr), id(0)
{
}
User::~User() = default;
void User::validateTarget(User* user) const
{
    if (user == nullptr)
        throw std::invalid_argument("invalid user");
    if (us == nullptr || user-&gt;us != us)
        throw std::runtime_error("users belong to different networks");
}
unsigned long User::getId() const { return id; }
std::string User::getName() const { return name; }
void User::addFriend(User* user)
{
    validateTarget(user);
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
    validateTarget(user);
    std::list&lt;unsigned long&gt;::iterator it;
    it = std::find(friends.begin(), friends.end(), user-&gt;getId());
    if (it == friends.end())
        throw std::runtime_error("user is not a friend");
    friends.erase(it);
}
void User::post(const std::string&amp; text)
{
    posts.push_back(std::make_unique&lt;Post&gt;(text));
}
void User::post(const std::string&amp; text, std::unique_ptr&lt;Media&gt; media)
{
    posts.push_back(std::make_unique&lt;Post&gt;(text, std::move(media)));
}
const std::list&lt;std::unique_ptr&lt;Post&gt;&gt;&amp; User::getPosts() const
{
    return posts;
}
void User::viewFriendsPosts() const
{
    std::list&lt;unsigned long&gt;::const_iterator friendIt;
    for (friendIt = friends.begin(); friendIt != friends.end(); ++friendIt)
    {
        User* friendUser = us-&gt;getUserById(*friendIt);
        if (friendUser == nullptr)
            continue;
        const std::list&lt;std::unique_ptr&lt;Post&gt;&gt;&amp; friendPosts =
            friendUser-&gt;getPosts();
        std::list&lt;std::unique_ptr&lt;Post&gt;&gt;::const_iterator postIt;
        for (postIt = friendPosts.begin(); postIt != friendPosts.end(); ++postIt)
        {
            const Post* currentPost = postIt-&gt;get();
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
void User::receiveMessage(std::unique_ptr&lt;Message&gt; message)
{
    if (message == nullptr)
        throw std::invalid_argument("invalid message");
    receivedMsgs.push_back(std::move(message));
}
void User::sendMessage(User* user, std::unique_ptr&lt;Message&gt; message)
{
    validateTarget(user);
    if (message == nullptr)
        throw std::invalid_argument("invalid message");
    std::list&lt;unsigned long&gt;::iterator it;
    it = std::find(friends.begin(), friends.end(), user-&gt;getId());
    if (it == friends.end())
        throw std::runtime_error("regular user can send messages only to friends");
    user-&gt;receiveMessage(std::move(message));
}
void User::viewReceivedMessages() const
{
    std::list&lt;std::unique_ptr&lt;Message&gt;&gt;::const_iterator it;
    for (it = receivedMsgs.begin(); it != receivedMsgs.end(); ++it)
        std::cout &lt;&lt; (*it)-&gt;getText() &lt;&lt; std::endl;
}</code></pre></div></details><details class="fold"><summary>BusinessUser</summary><div class="fold-body"><p>BusinessUser.h</p><pre class="code"><code>#pragma once
#include "User.h"
class BusinessUser : public User
{
    friend class USocial;
protected:
    BusinessUser() = default;
public:
    void sendMessage(User* user, std::unique_ptr&lt;Message&gt; message) override;
};</code></pre><p>BusinessUser.cpp</p><pre class="code"><code>#include "BusinessUser.h"
#include "Message.h"
#include &lt;stdexcept&gt;
#include &lt;utility&gt;
void BusinessUser::sendMessage(
    User* user,
    std::unique_ptr&lt;Message&gt; message)
{
    validateTarget(user);
    if (message == nullptr)
        throw std::invalid_argument("invalid message");
    user-&gt;receiveMessage(std::move(message));
}</code></pre></div></details><details class="fold"><summary>USocial</summary><div class="fold-body"><p><code>std::map</code> היא מכולת מפתח–ערך; כאן המפתח הוא מזהה המשתמש והערך הוא הבעלים החכם שלו. בפרמטר <code>bool business = false</code>, הערך שאחרי סימן השווה הוא ארגומנט ברירת מחדל (Default Argument), ולכן אפשר להשמיט אותו. <code>nextId</code> הוא שדה שמחזיק את המזהה הבא בתוך הרשת.</p><p>USocial.h</p><pre class="code"><code>#pragma once
#include &lt;map&gt;
#include &lt;memory&gt;
#include &lt;string&gt;
class User;
class USocial
{
    friend class User;
private:
    std::map&lt;unsigned long, std::unique_ptr&lt;User&gt;&gt; users;
    unsigned long nextId;
public:
    USocial();
    ~USocial();
    USocial(const USocial&amp;) = delete;
    USocial&amp; operator=(const USocial&amp;) = delete;
    User* registerUser(const std::string&amp; name, bool business = false);
    void removeUser(User* user);
    User* getUserById(unsigned long id) const;
};</code></pre><p>USocial.cpp</p><pre class="code"><code>#include "USocial.h"
#include "User.h"
#include "BusinessUser.h"
#include &lt;memory&gt;
#include &lt;stdexcept&gt;
#include &lt;utility&gt;
USocial::USocial()
    : nextId(1)
{
}
USocial::~USocial() = default;
User* USocial::registerUser(const std::string&amp; name, bool business)
{
    std::unique_ptr&lt;User&gt; user;
    if (business)
        user.reset(new BusinessUser());
    else
        user.reset(new User());
    user-&gt;id = nextId;
    ++nextId;
    user-&gt;name = name;
    user-&gt;us = this;
    User* result = user.get();
    users[user-&gt;id] = std::move(user);
    return result;
}
void USocial::removeUser(User* user)
{
    if (user == nullptr)
        throw std::invalid_argument("invalid user");
    std::map&lt;unsigned long, std::unique_ptr&lt;User&gt;&gt;::iterator it;
    it = users.find(user-&gt;getId());
    if (it == users.end() || it-&gt;second.get() != user)
        throw std::runtime_error("user does not exist");
    unsigned long removedId = user-&gt;getId();
    std::map&lt;unsigned long, std::unique_ptr&lt;User&gt;&gt;::iterator userIt;
    for (userIt = users.begin(); userIt != users.end(); ++userIt)
        userIt-&gt;second-&gt;friends.remove(removedId);
    users.erase(it);
}
User* USocial::getUserById(unsigned long id) const
{
    std::map&lt;unsigned long, std::unique_ptr&lt;User&gt;&gt;::const_iterator it;
    it = users.find(id);
    if (it == users.end())
        return nullptr;
    return it-&gt;second.get();
}</code></pre></div></details><details class="fold"><summary>main.cpp לבדיקה</summary><div class="fold-body"><pre class="code"><code>#include "USocial.h"
#include "User.h"
#include "Photo.h"
#include "Audio.h"
#include "Video.h"
#include "Message.h"
#include &lt;exception&gt;
#include &lt;iostream&gt;
#include &lt;memory&gt;
int main()
{
    USocial us;
    User* u1 = us.registerUser("Liron");
    User* u2 = us.registerUser("Yahav");
    User* u3 = us.registerUser("Shachaf");
    User* u4 = us.registerUser("Tsur", true);
    User* u5 = us.registerUser("Elit");
    u1-&gt;post("Hello world!");
    u2-&gt;post("I'm having a great time here :)",
             std::make_unique&lt;Audio&gt;());
    u3-&gt;post("This is awesome!", std::make_unique&lt;Photo&gt;());
    u5-&gt;addFriend(u1);
    u5-&gt;addFriend(u2);
    u5-&gt;viewFriendsPosts();
    u4-&gt;sendMessage(
        u5, std::make_unique&lt;Message&gt;("Buy Falafel!"));
    u5-&gt;viewReceivedMessages();
    try
    {
        u3-&gt;sendMessage(
            u5,
            std::make_unique&lt;Message&gt;("All your base are belong to us"));
    }
    catch (const std::exception&amp; e)
    {
        std::cout &lt;&lt; "error: " &lt;&lt; e.what() &lt;&lt; std::endl;
    }
    u5-&gt;viewReceivedMessages();
    u3-&gt;addFriend(u5);
    u3-&gt;sendMessage(
        u5,
        std::make_unique&lt;Message&gt;("All your base are belong to us"));
    u5-&gt;viewReceivedMessages();
    return 0;
}</code></pre></div></details></div></details>
  `,
});
