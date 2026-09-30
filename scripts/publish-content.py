"""Copy published course text from Supabase into the original data files.

Runs only on the machine where you start it. It does not listen on the network
and does not accept a service-role key.

Each published item replaces the matching object in its original data/*.js file.
Banners have no source object, so they remain in data/published-content.js.
"""

import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG = ROOT / "js" / "config.js"
TARGET = (ROOT / "data" / "published-content.js").resolve()
DATA = (ROOT / "data").resolve()
UNIT_IDS = tuple(str(number) for number in range(1, 8))
UNIT_KINDS = {"unit_meta", "section", "quiz"}
KINDS = {
    "course",
    "unit_meta",
    "section",
    "summary_unit",
    "summary_part",
    "card",
    "quiz",
    "exam_meta",
    "exam_question",
    "banner",
}
DANGER = re.compile(
    r"<\s*script|<\s*/\s*script|<\s*iframe|<\s*object|<\s*embed|<\s*link|<\s*meta|<\s*style"
    r"|javascript\s*:|data\s*:\s*text/html|\son[a-z]+\s*=",
    re.IGNORECASE,
)


def fail(message):
    print(message, file=sys.stderr)
    raise SystemExit(1)


def read_config():
    if not CONFIG.is_file():
        fail("לא נמצא js/config.js")
    text = CONFIG.read_text(encoding="utf-8")
    url = re.search(r'url:\s*"(https://[a-z0-9-]+\.supabase\.co)"', text, re.IGNORECASE)
    key = re.search(r'anonKey:\s*"([A-Za-z0-9_\.\-=]+)"', text)
    if not url or not key or key.group(1) == "YOUR_ANON_KEY" or len(key.group(1)) < 20:
        fail("ב-js/config.js חסרים כתובת פרויקט או מפתח ציבורי.")
    if "service_role" in key.group(1) or key.group(1).startswith("sb_secret_"):
        fail("בקובץ ההגדרות מופיע מפתח סודי. הסקריפט מקבל רק מפתח ציבורי.")
    return url.group(1), key.group(1)


def fetch_items(url, key):
    rows = []
    start = 0
    page = 400
    while True:
        request = urllib.request.Request(
            url + "/rest/v1/content_items?select=id,kind,unit_id,sort,title,html,body&order=id.asc",
            headers={
                "apikey": key,
                "Authorization": "Bearer " + key,
                "Accept": "application/json",
                "Range": "%d-%d" % (start, start + page - 1),
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                chunk = json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as err:
            fail("הקריאה מהשרת נכשלה (%s)." % err.code)
        except urllib.error.URLError:
            fail("אין חיבור לשרת.")
        if not isinstance(chunk, list):
            fail("תשובת השרת אינה רשימת תוכן.")
        rows.extend(chunk)
        if len(chunk) < page:
            return rows
        start += page


def clean(rows):
    ready = []
    for row in rows:
        if not isinstance(row, dict):
            fail("נמצאה שורה שאינה אובייקט.")
        kind = row.get("kind")
        item_id = row.get("id")
        if kind not in KINDS or not isinstance(item_id, str) or not 1 <= len(item_id) <= 200:
            fail("נמצא פריט מסוג לא מוכר.")
        title = row.get("title")
        html = row.get("html")
        if title is not None and not isinstance(title, str):
            fail("הפריט %s נדחה: שדה הכותרת אינו תקין." % item_id)
        if html is not None and (not isinstance(html, str) or len(html) > 200000):
            fail("הפריט %s נדחה: שדה ה-HTML לא תקין." % item_id)
        title = title or ""
        body = row.get("body") if isinstance(row.get("body"), dict) else {}
        blob = title + " " + (html or "") + " " + json.dumps(body, ensure_ascii=False)
        if DANGER.search(blob):
            fail("הפריט %s נדחה: יש בו HTML אסור." % item_id)
        unit_id = row.get("unit_id") if isinstance(row.get("unit_id"), str) else None
        if kind in UNIT_KINDS and unit_id not in UNIT_IDS:
            fail("לפריט %s חסר מספר יחידה תקין." % item_id)
        if kind == "section" and not item_id.startswith("section:" + unit_id + ":"):
            fail("מזהה המקטע %s אינו מתאים ליחידה." % item_id)
        if kind == "quiz":
            qid = body.get("qid")
            if not isinstance(qid, str) or not qid or len(qid) > 200:
                fail("לשאלת התרגול %s חסר qid תקין." % item_id)
            if not item_id.startswith("quiz:" + unit_id + ":"):
                fail("מזהה שאלת התרגול %s אינו מתאים ליחידה." % item_id)
        try:
            sort = int(row.get("sort") or 0)
        except (TypeError, ValueError):
            fail("לפריט %s יש ערך sort לא תקין." % item_id)
        ready.append(
            {
                "id": item_id,
                "kind": kind,
                "unit_id": unit_id,
                "sort": sort,
                "title": title,
                "html": html,
                "body": body,
            }
        )
    ready.sort(key=lambda item: item["id"])
    return ready


def js_string(value):
    return (
        json.dumps(value, ensure_ascii=False)
        .replace("<", "\\u003c")
        .replace("\u2028", "\\u2028")
        .replace("\u2029", "\\u2029")
    )


def skip_quoted(text, index, quote):
    index += 1
    limit = len(text)
    while index < limit:
        if text[index] == "\\":
            index += 2
            continue
        if text[index] == quote:
            return index + 1
        index += 1
    fail("מחרוזת לא סגורה בקובץ נתונים.")


def skip_template(text, index):
    index += 1
    limit = len(text)
    while index < limit:
        if text[index] == "\\":
            index += 2
            continue
        if text[index] == "`":
            return index + 1
        if text[index] == "$" and index + 1 < limit and text[index + 1] == "{":
            index = end_of_value(text, index + 1)
            continue
        index += 1
    fail("תבנית JavaScript לא סגורה בקובץ נתונים.")


def end_of_value(text, index):
    limit = len(text)
    while index < limit and text[index] in " \t\r\n":
        index += 1
    stack = []
    while index < limit:
        char = text[index]
        if char in "\"'":
            index = skip_quoted(text, index, char)
            if not stack:
                return index
            continue
        if char == "`":
            index = skip_template(text, index)
            if not stack:
                return index
            continue
        if char == "/" and index + 1 < limit and text[index + 1] == "/":
            newline = text.find("\n", index)
            index = limit if newline < 0 else newline + 1
            continue
        if char == "/" and index + 1 < limit and text[index + 1] == "*":
            comment = text.find("*/", index + 2)
            index = limit if comment < 0 else comment + 2
            continue
        if char in "{[(":
            stack.append(char)
            index += 1
            continue
        if char in "}])":
            if not stack:
                return index
            stack.pop()
            index += 1
            if not stack:
                return index
            continue
        if char == "," and not stack:
            return index
        index += 1
    return index


def scan_objects(text):
    objects = []
    stack = []
    index = 0
    limit = len(text)
    while index < limit:
        char = text[index]
        if stack and char in "\"'":
            end = skip_quoted(text, index, char)
            cursor = end
            while cursor < limit and text[cursor] in " \t\r\n":
                cursor += 1
            if cursor < limit and text[cursor] == ":":
                cursor += 1
                while cursor < limit and text[cursor] in " \t\r\n":
                    cursor += 1
                stack[-1]["props"][decode_value(text[index:end])] = (cursor, end_of_value(text, cursor))
                index = cursor
                continue
            index = end
            continue
        if char in "\"'":
            index = skip_quoted(text, index, char)
            continue
        if char == "`":
            index = skip_template(text, index)
            continue
        if char == "/" and index + 1 < limit and text[index + 1] == "/":
            newline = text.find("\n", index)
            index = limit if newline < 0 else newline + 1
            continue
        if char == "/" and index + 1 < limit and text[index + 1] == "*":
            comment = text.find("*/", index + 2)
            index = limit if comment < 0 else comment + 2
            continue
        if char == "{":
            stack.append({"start": index, "props": {}})
            index += 1
            continue
        if char == "}":
            if not stack:
                fail("סוגריים לא מאוזנים בקובץ נתונים.")
            obj = stack.pop()
            obj["end"] = index + 1
            objects.append(obj)
            index += 1
            continue
        if stack and (char.isalpha() or char in "_$"):
            match = re.match(r"[A-Za-z_$][\w$]*", text[index:])
            name = match.group(0)
            cursor = index + len(name)
            while cursor < limit and text[cursor] in " \t\r\n":
                cursor += 1
            if cursor < limit and text[cursor] == ":":
                cursor += 1
                while cursor < limit and text[cursor] in " \t\r\n":
                    cursor += 1
                stack[-1]["props"][name] = (cursor, end_of_value(text, cursor))
                index = cursor
                continue
        index += 1
    if stack:
        fail("סוגריים לא מאוזנים בקובץ נתונים.")
    return objects


def decode_template(body):
    output = []
    index = 0
    while index < len(body):
        if body[index] == "\\" and index + 1 < len(body):
            mapping = {"n": "\n", "r": "\r", "t": "\t", "\\": "\\", "`": "`", "$": "$"}
            output.append(mapping.get(body[index + 1], body[index + 1]))
            index += 2
            continue
        output.append(body[index])
        index += 1
    return "".join(output)


def decode_value(raw):
    raw = raw.strip()
    if not raw:
        return ""
    if raw[0] == "`":
        if len(raw) < 2 or raw[-1] != "`":
            fail("תבנית JavaScript לא סגורה בקובץ נתונים.")
        return decode_template(raw[1:-1])
    if raw[0] == '"':
        return json.loads(raw)
    if raw[0] == "'":
        return decode_template(raw[1:-1])
    if raw == "true":
        return True
    if raw == "false":
        return False
    if raw == "null":
        return None
    if re.fullmatch(r"-?\d+", raw):
        return int(raw)
    return raw


def prop_equals(text, obj, name, expected):
    if name not in obj["props"]:
        return False
    start, end = obj["props"][name]
    return decode_value(text[start:end]) == expected


def indent_at(text, index):
    line = text.rfind("\n", 0, index) + 1
    return re.match(r"[ \t]*", text[line:index]).group(0)


def render_string(old_raw, value, indent):
    if old_raw.strip().startswith("`"):
        escaped = value.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
        return "`" + escaped + "`"
    return js_string(value)


def render_string_array(items, indent):
    newline = "\n"
    if not items:
        return "[]"
    rows = [indent + "  " + js_string(item) for item in items]
    return "[" + newline + ("," + newline).join(rows) + "," + newline + indent + "]"


def render_options(options, indent):
    newline = "\n"
    rows = []
    for option in options:
        rows.append(
            "%s  { id: %s, text: %s }"
            % (indent, js_string(str(option.get("id", ""))), js_string(str(option.get("text", ""))))
        )
    return "[" + newline + ("," + newline).join(rows) + "," + newline + indent + "]"


def option_values(raw):
    found = []
    for obj in scan_objects(raw):
        if "id" not in obj["props"] or "text" not in obj["props"]:
            continue
        found.append(
            {
                "id": decode_value(raw[obj["props"]["id"][0] : obj["props"]["id"][1]]),
                "text": decode_value(raw[obj["props"]["text"][0] : obj["props"]["text"][1]]),
            }
        )
    return found


def same_value(old_raw, value):
    if isinstance(value, list) and all(isinstance(item, str) for item in value):
        try:
            return json.loads(old_raw) == value
        except json.JSONDecodeError:
            return False
    if isinstance(value, list) and all(isinstance(item, dict) for item in value):
        current = option_values(old_raw)
        expected = [{"id": str(item.get("id", "")), "text": str(item.get("text", ""))} for item in value]
        return current == expected
    return decode_value(old_raw) == value


def render_value(old_raw, value, indent):
    if isinstance(value, str):
        return render_string(old_raw, value, indent)
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, int):
        return str(value)
    if isinstance(value, list) and all(isinstance(item, str) for item in value):
        return render_string_array(value, indent)
    if isinstance(value, list) and all(isinstance(item, dict) for item in value):
        return render_options(value, indent)
    fail("סוג ערך לא נתמך להטמעה בקובץ המקורי.")


def existing_files(paths):
    found = []
    for path in paths:
        resolved = path.resolve()
        if resolved.parent != DATA:
            fail("יעד הכתיבה מחוץ לתיקיית data.")
        if resolved.is_file():
            found.append(resolved)
    return found


def load_text(texts, path):
    if path not in texts:
        texts[path] = path.read_text(encoding="utf-8")
    return texts[path]


def find_one(texts, paths, predicate, label):
    found = []
    for path in existing_files(paths):
        text = load_text(texts, path)
        for obj in scan_objects(text):
            if predicate(text, obj):
                found.append((path, obj))
    if len(found) != 1:
        fail("%s: נמצאו %d התאמות בקובצי המקור." % (label, len(found)))
    return found[0]


def replace_props(texts, paths, predicate, label, updates):
    changed = False
    for prop, value in updates:
        path, obj = find_one(texts, paths, predicate, label)
        if prop not in obj["props"]:
            fail("%s: חסר השדה %s במקור." % (label, prop))
        text = texts[path]
        start, end = obj["props"][prop]
        old = text[start:end]
        if same_value(old, value):
            continue
        literal = render_value(old, value, indent_at(text, start))
        texts[path] = text[:start] + literal + text[end:]
        changed = True
    return changed


def unit_content_files(unit_id):
    return existing_files([DATA / ("unit%s.js" % unit_id), *sorted(DATA.glob("unit%s-part-*.js" % unit_id))])


def quiz_files(unit_id):
    return existing_files([*sorted(DATA.glob("unit%s*.js" % unit_id)), DATA / "exam-prep-bank.js"])


def string_list(value, label):
    if not isinstance(value, list) or not all(isinstance(item, str) for item in value):
        fail("%s צריך להיות רשימת מחרוזות." % label)
    return value


def embed_row(texts, row):
    kind = row["kind"]
    body = row["body"]
    if kind == "banner":
        return False
    if kind == "course":
        paths = [DATA / "course.js"]

        def course_obj(text, obj):
            return "units" in obj["props"] and "code" in obj["props"]

        updates = []
        if row["title"]:
            updates.append(("name", row["title"]))
        if isinstance(body.get("code"), str):
            updates.append(("code", body["code"]))
        if isinstance(body.get("blurb"), str):
            updates.append(("blurb", body["blurb"]))
        if isinstance(body.get("languages"), list):
            updates.append(("languages", string_list(body["languages"], row["id"])))
        return replace_props(texts, paths, course_obj, row["id"], updates)
    if kind == "unit_meta":
        unit_id = row["unit_id"]

        def lesson_obj(text, obj):
            return "goals" in obj["props"] and prop_equals(text, obj, "id", unit_id)

        def course_unit_obj(text, obj):
            return "hue" in obj["props"] and prop_equals(text, obj, "id", unit_id)

        changed = False
        lesson_updates = []
        if row["title"]:
            lesson_updates.append(("title", row["title"]))
        if isinstance(body.get("goals"), list):
            lesson_updates.append(("goals", string_list(body["goals"], row["id"])))
        changed = replace_props(texts, [DATA / ("unit%s.js" % unit_id)], lesson_obj, row["id"], lesson_updates) or changed
        course_updates = []
        if row["title"]:
            course_updates.append(("title", row["title"]))
        if isinstance(body.get("blurb"), str):
            course_updates.append(("blurb", body["blurb"]))
        if isinstance(body.get("hue"), str):
            course_updates.append(("hue", body["hue"]))
        if body.get("status") in ("ready", "soon"):
            course_updates.append(("status", body["status"]))
        return replace_props(texts, [DATA / "course.js"], course_unit_obj, row["id"], course_updates) or changed
    if kind == "section":
        prefix = "section:%s:" % row["unit_id"]
        section_id = row["id"][len(prefix) :]

        def section_obj(text, obj):
            return "html" in obj["props"] and prop_equals(text, obj, "id", section_id)

        updates = [("html", row["html"] or "")]
        if row["title"]:
            updates.insert(0, ("title", row["title"]))
        return replace_props(texts, unit_content_files(row["unit_id"]), section_obj, row["id"], updates)
    if kind == "quiz":
        qid = row["body"]["qid"]

        def quiz_obj(text, obj):
            return "prompt" in obj["props"] and "options" in obj["props"] and prop_equals(text, obj, "id", qid)

        return replace_props(
            texts,
            quiz_files(row["unit_id"]),
            quiz_obj,
            row["id"],
            [
                ("prompt", body.get("prompt") or ""),
                ("options", body.get("options") if isinstance(body.get("options"), list) else []),
                ("answer", body.get("answer") or ""),
                ("explain", body.get("explain") or ""),
            ],
        )
    if kind == "summary_unit":
        def chapter_obj(text, obj):
            return "intro" in obj["props"] and prop_equals(text, obj, "unit", row["unit_id"])

        updates = []
        if row["title"]:
            updates.append(("title", row["title"]))
        if isinstance(body.get("intro"), str):
            updates.append(("intro", body["intro"]))
        return replace_props(texts, [DATA / "summary-prose.js"], chapter_obj, row["id"], updates)
    if kind == "summary_part":
        prefix = "summary:%s:" % row["unit_id"]
        part_id = row["id"][len(prefix) :]

        def part_obj(text, obj):
            return "html" in obj["props"] and prop_equals(text, obj, "id", part_id)

        updates = [("html", row["html"] or "")]
        if row["title"]:
            updates.insert(0, ("title", row["title"]))
        return replace_props(texts, [DATA / "summary-prose.js"], part_obj, row["id"], updates)
    if kind == "card":
        card_id = row["id"][len("card:") :]

        def card_obj(text, obj):
            return "kind" in obj["props"] and "body" in obj["props"] and prop_equals(text, obj, "id", card_id)

        updates = []
        if row["title"]:
            updates.append(("title", row["title"]))
        if row["unit_id"]:
            updates.append(("unit", row["unit_id"]))
        if isinstance(body.get("cardKind"), str):
            updates.append(("kind", body["cardKind"]))
        if isinstance(body.get("body"), str):
            updates.append(("body", body["body"]))
        changed = replace_props(texts, sorted(DATA.glob("unit*-interact.js")), card_obj, row["id"], updates)
        if isinstance(body.get("detail"), str):
            detail_path = (DATA / "summary-detail.js").resolve()

            def detail_obj(text, obj):
                return card_id in obj["props"]

            changed = replace_props(texts, [detail_path], detail_obj, row["id"], [(card_id, body["detail"])]) or changed
        return changed
    if kind == "exam_meta":
        exam_id = row["id"][len("exam:") :]

        def exam_obj(text, obj):
            return "partA" in obj["props"] and prop_equals(text, obj, "id", exam_id)

        updates = []
        if row["title"]:
            updates.append(("title", row["title"]))
        if body.get("minutes"):
            updates.append(("minutes", int(body["minutes"])))
        if body.get("pick"):
            updates.append(("pick", int(body["pick"])))
        if isinstance(body.get("note"), str):
            updates.append(("note", body["note"]))
        return replace_props(texts, [DATA / "exam-sims.js", DATA / "exam-sims-recon.js"], exam_obj, row["id"], updates)
    if kind == "exam_question":
        exam_id = body.get("examId")
        qid = body.get("qid")
        part = "partA" if body.get("part") == "A" else "partB"

        def question_obj(text, obj):
            if "prompt" not in obj["props"] or not prop_equals(text, obj, "id", qid):
                return False
            exams = [
                exam
                for exam in scan_objects(text)
                if "partA" in exam["props"] and prop_equals(text, exam, "id", exam_id) and part in exam["props"]
            ]
            if len(exams) != 1:
                return False
            start, end = exams[0]["props"][part]
            return start <= obj["start"] < end

        updates = [("prompt", body.get("prompt") or "")]
        if body.get("part") == "A":
            updates.append(("options", body.get("options") if isinstance(body.get("options"), list) else []))
            updates.append(("answer", body.get("answer") or ""))
        else:
            if row["title"]:
                updates.append(("title", row["title"]))
            updates.append(("hadOfficial", bool(body.get("hadOfficial"))))
            updates.append(("official", body.get("official") or ""))
            updates.append(("verdictKind", body.get("verdictKind") or "new"))
            updates.append(("verdict", body.get("verdict") or ""))
            updates.append(("proposed", row["html"] or ""))
        return replace_props(
            texts,
            [DATA / "exam-sims.js", DATA / "exam-sims-recon.js"],
            question_obj,
            row["id"],
            updates,
        )
    fail("אין יעד מקורי לפריט %s." % row["id"])


def changed_paths(texts):
    changed = []
    for path, text in texts.items():
        if path.read_text(encoding="utf-8") != text:
            changed.append(path)
    return changed


def published_text(rows):
    payload = (
        json.dumps(rows, ensure_ascii=False, separators=(",", ":"))
        .replace("<", "\\u003c")
        .replace("\u2028", "\\u2028")
        .replace("\u2029", "\\u2029")
    )
    return (
        "/* באנרים שאין להם אובייקט מקורי בתיקיית data. שאר התוכן מוטמע בקובצי המקור. */\n"
        "window.PUBLISHED_CONTENT = "
        + payload
        + ";\n"
    )


def write_atomic(path, text):
    resolved = path.resolve()
    if resolved.parent != DATA:
        fail("יעד הכתיבה מחוץ לתיקיית data.")
    temporary = resolved.with_name(resolved.name + ".tmp")
    temporary.write_text(text, encoding="utf-8", newline="")
    temporary.replace(resolved)


def main():
    write = "--write" in sys.argv
    url, key = read_config()
    rows = clean(fetch_items(url, key))
    if not rows:
        fail("אין בשרת טקסט שפורסם. הקבצים המקומיים לא הוחלפו.")
    texts = {}
    leftovers = []
    for row in rows:
        if row["kind"] == "banner":
            leftovers.append(row)
            continue
        embed_row(texts, row)
    changed = changed_paths(texts)
    print("נמצאו %d פריטים." % len(rows))
    print("%d פריטים הוטמעו במקום התוכן המקורי." % (len(rows) - len(leftovers)))
    if changed:
        for path in changed:
            print("ישתנה %s" % path.relative_to(ROOT).as_posix())
    else:
        print("תוכן המקור זהה לתוכן שפורסם.")
    if leftovers:
        print("%d באנרים יישארו ב-data/published-content.js." % len(leftovers))
    if not write:
        print("בדיקה בלבד. לכתיבה הריצו שוב עם --write")
        return
    for path in changed:
        write_atomic(path, texts[path])
        print("נכתב %s" % path.relative_to(ROOT).as_posix())
    write_atomic(TARGET, published_text(leftovers))
    print("נכתב data/published-content.js (%d באנרים)" % len(leftovers))


if __name__ == "__main__":
    main()
