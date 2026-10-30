"""Copy 20425 source PDFs into sources/20425/raw and extract per-page text to sources/20425/text."""
import json
import shutil
import sys
from pathlib import Path

import pymupdf as fitz

ROOT = Path(__file__).resolve().parents[2]
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Documents" / "MEGA downloads"
DST = ROOT / "sources" / "20425"
RAW, TXT = DST / "raw", DST / "text"

report = []
for f in sorted(SRC.rglob("*.pdf")):
    rel = f.relative_to(SRC)
    out = RAW / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    if not out.exists() or out.stat().st_size != f.stat().st_size:
        shutil.copy2(f, out)
    entry = {"file": rel.as_posix(), "mb": round(f.stat().st_size / 2**20, 2)}
    try:
        doc = fitz.open(f)
        parts, chars = [], 0
        for i, page in enumerate(doc, 1):
            blocks = page.get_text("blocks", sort=True)
            t = "\n".join(" ".join(b[4].split()) for b in blocks if b[6] == 0 and b[4].strip())
            chars += len(t)
            parts.append(f"## עמוד {i}\n\n{t}\n")
        entry.update(pages=doc.page_count, chars=chars, scanned=chars < 80 * max(doc.page_count, 1))
        txt = TXT / rel.with_suffix(".md")
        txt.parent.mkdir(parents=True, exist_ok=True)
        txt.write_text(f"# {rel.as_posix()}\n\n" + "\n".join(parts), encoding="utf-8")
    except Exception as e:
        entry["error"] = str(e)
    report.append(entry)

(DST / "_report.json").write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
print(len(report), "pdfs")
