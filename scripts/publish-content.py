"""Copy published course text from Supabase into data/published-content.js.

Runs only on the machine where you start it. It does not listen on the network,
does not accept a service-role key, and writes a single data file inside this repo.
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
    if re.search(r"service_role|sb_secret_", text):
        fail("בקובץ ההגדרות מופיע מפתח סודי. הסקריפט מקבל רק מפתח ציבורי.")
    url = re.search(r'url:\s*"(https://[a-z0-9-]+\.supabase\.co)"', text, re.IGNORECASE)
    key = re.search(r'anonKey:\s*"([A-Za-z0-9_\.\-=]+)"', text)
    if not url or not key or key.group(1) == "YOUR_ANON_KEY" or len(key.group(1)) < 20:
        fail("ב-js/config.js חסרים כתובת פרויקט או מפתח ציבורי.")
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
        title = row.get("title") or ""
        html = row.get("html")
        body = row.get("body") if isinstance(row.get("body"), dict) else {}
        blob = title + " " + (html or "") + " " + json.dumps(body, ensure_ascii=False)
        if DANGER.search(blob):
            fail("הפריט %s נדחה: יש בו HTML אסור." % item_id)
        if html is not None and (not isinstance(html, str) or len(html) > 200000):
            fail("הפריט %s נדחה: שדה ה-HTML לא תקין." % item_id)
        ready.append(
            {
                "id": item_id,
                "kind": kind,
                "unit_id": row.get("unit_id") if isinstance(row.get("unit_id"), str) else None,
                "sort": int(row.get("sort") or 0),
                "title": title if isinstance(title, str) else "",
                "html": html,
                "body": body,
            }
        )
    ready.sort(key=lambda item: item["id"])
    return ready


def write_target(rows):
    if TARGET.parent.resolve() != (ROOT / "data").resolve():
        fail("יעד הכתיבה מחוץ לתיקיית data.")
    payload = json.dumps(rows, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")
    text = (
        "/* טקסט שפורסם מהשרת. נוצר רק על ידי scripts/publish-content.py במחשב המנהל. */\n"
        "window.PUBLISHED_CONTENT = "
        + payload
        + ";\n"
    )
    TARGET.write_text(text, encoding="utf-8", newline="\n")


def main():
    write = "--write" in sys.argv
    url, key = read_config()
    rows = clean(fetch_items(url, key))
    if not rows:
        fail("אין בשרת טקסט שפורסם. הקובץ המקומי לא הוחלף.")
    print("נמצאו %d פריטים." % len(rows))
    if not write:
        print("בדיקה בלבד. לכתיבה הריצו שוב עם --write")
        return
    write_target(rows)
    print("נכתב data/published-content.js")


if __name__ == "__main__":
    main()
