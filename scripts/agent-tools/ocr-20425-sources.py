"""OCR (heb+eng) for scanned PDFs listed as scanned in sources/20425/_report.json. Overwrites their text/*.md."""
import json
import os
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parents[2]
DST = ROOT / "sources" / "20425"
TESS = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
TESSDATA = DST / "_tessdata"
DPI = 220


def ocr_page(args):
    pdf, index = args
    doc = pymupdf.open(pdf)
    pix = doc[index].get_pixmap(dpi=DPI, colorspace=pymupdf.csGRAY)
    with tempfile.TemporaryDirectory() as tmp:
        img = Path(tmp) / "p.png"
        pix.save(img)
        env = dict(os.environ, OMP_THREAD_LIMIT="1")
        out = subprocess.run(
            [TESS, str(img), "stdout", "-l", "heb+eng", "--psm", "3", "--tessdata-dir", str(TESSDATA)],
            capture_output=True, env=env,
        )
    lines = [" ".join(l.split()) for l in out.stdout.decode("utf-8", "replace").splitlines()]
    return "\n".join(l for l in lines if l)


def main():
    report = json.loads((DST / "_report.json").read_text(encoding="utf-8"))
    todo = [e for e in report if e.get("scanned")]
    with ThreadPoolExecutor(max_workers=max(2, (os.cpu_count() or 4) - 1)) as pool:
        for entry in todo:
            pdf = DST / "raw" / entry["file"]
            n = pymupdf.open(pdf).page_count
            pages = list(pool.map(ocr_page, [(pdf, i) for i in range(n)]))
            body = "\n".join(f"## עמוד {i}\n\n{t}\n" for i, t in enumerate(pages, 1))
            out = DST / "text" / Path(entry["file"]).with_suffix(".md")
            out.write_text(f"# {entry['file']} (OCR)\n\n{body}", encoding="utf-8")
            entry["ocr_chars"] = sum(len(t) for t in pages)
            (DST / "_report.json").write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
            print(entry["file"], n, entry["ocr_chars"], flush=True)


if __name__ == "__main__":
    main()
