# -*- coding: utf-8 -*-
"""OCR lecturer PDFs that had little or no extractable text."""
from __future__ import annotations

import os
import sys
from pathlib import Path

import pypdfium2 as pdfium
import pytesseract

DOWNLOADS = Path(r"C:\Users\tomer\Downloads")
OUT = Path(r"C:\Users\tomer\source\cs-study-site\_extract\ocr-lecturer")
TESSDATA = Path(r"C:\Users\tomer\source\cs-study-site\_extract\tessdata")
TESS = Path(r"C:\Program Files\Tesseract-OCR\tesseract.exe")

pytesseract.pytesseract.tesseract_cmd = str(TESS)
os.environ["TESSDATA_PREFIX"] = str(TESSDATA)

FILES = [
    "security_mechanisms_corrected.pdf",
    "מחשוב_ענן_סיכום_עם_RPC_ו_Hypervisor (2).pdf",
    "Python_Networking_with_question_v2.pdf",
    "תכנות_מערכות_דפנסיבי_יחידה1_משופר_RTL_v11.pdf",
]

SCALE = 1.8
CONFIG = "--psm 6"


def ocr_pdf(name: str) -> Path | None:
    src = DOWNLOADS / name
    if not src.exists():
        print("MISSING", name, flush=True)
        return None
    safe = "".join(c if c.isalnum() or c in "._- " else "_" for c in name)
    dest = OUT / f"{safe}.txt"
    pdf = pdfium.PdfDocument(str(src))
    n = len(pdf)
    print(f"START {name} pages={n}", flush=True)
    parts = []
    for i in range(n):
        try:
            page = pdf[i]
            pil = page.render(scale=SCALE).to_pil()
            page.close()
            if pil.mode != "RGB":
                pil = pil.convert("RGB")
            w, h = pil.size
            if w * h > 12_000_000:
                pil = pil.resize((w // 2, h // 2))
            text = pytesseract.image_to_string(pil, lang="heb+eng", config=CONFIG)
            parts.append(f"\n\n--- page {i + 1}/{n} ---\n{text.strip()}\n")
            print(f"  page {i + 1}/{n} chars={len(text.strip())} px={pil.size}", flush=True)
        except Exception as e:
            parts.append(f"\n\n--- page {i + 1}/{n} ---\n[OCR_ERROR] {e!r}\n")
            print(f"  page {i + 1}/{n} ERROR {e!r}", flush=True)
    pdf.close()
    blob = "".join(parts)
    dest.write_text(blob, encoding="utf-8", errors="replace")
    print(f"WROTE {dest.name} total_chars={len(blob)}", flush=True)
    return dest


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    names = sys.argv[1:] or FILES
    for name in names:
        ocr_pdf(name)


if __name__ == "__main__":
    main()
