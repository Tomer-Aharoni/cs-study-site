# -*- coding: utf-8 -*-
import warnings
from pathlib import Path
import zipfile
import xml.etree.ElementTree as ET

warnings.filterwarnings("ignore")
from pypdf import PdfReader

OUT = Path(r"C:\Users\tomer\source\cs-study-site\_extract\lecturer")
OUT.mkdir(parents=True, exist_ok=True)
DL = Path(r"C:\Users\tomer\Downloads")
FILES = [
    "Question2_CSV_OOP_With_Full_Stream_Summary.pdf",
    "Defensive_Systems_Unit3_exam_questions_reordered_updated.pdf",
    "UML_Abstract_With_Iterator_Find_Exercise3_v4_fixed_message_ownership.pdf",
    "Cpp_Constructors_Copy_Assignment_Rule_of_Three_Final_v2.pdf",
    "שאלות_ותשובות_אבטחה.docx",
    "תכנות מערכות דפנסיבי, יחידה 2 - שפת C++ - 2025 - updated-final-protected-friend.pdf",
    "תכנות_מערכות_דפנסיבי_יחידה1_משופר_RTL_v11.pdf",
    "מחשוב_ענן_סיכום_עם_RPC_ו_Hypervisor (2).pdf",
    "SQL_Exam_Questions_Solutions_final.pdf",
    "quantum_computing_cryptography_final.pdf",
    "תכנות מערכות דפנסיבי, יחידה 7 - בסיסי נתונים וקוד נקי - לשליחה.pptx.pdf",
    "Python_Networking_with_question_v2.pdf",
    "תכנות מערכות דפנסיבי - יחידה 5 חדשה - עם הסבר subnet NAT וכתובות IP.pdf",
    "python_solutions_updated_with_book_solution.pdf",
    "security_mechanisms_corrected.pdf",
    "תכנות_מערכות_דפנסיבי_יחידה4_עם_שאלות.pdf",
]


def safe_name(name: str) -> str:
    return "".join(c if c.isalnum() or c in "._- " else "_" for c in name)


for name in FILES:
    p = DL / name
    dest = OUT / (safe_name(name) + ".txt")
    print("FILE", name, "exists", p.exists(), flush=True)
    if not p.exists():
        continue
    if p.suffix.lower() == ".docx":
        with zipfile.ZipFile(p) as z:
            xml = z.read("word/document.xml")
        root = ET.fromstring(xml)
        texts = []
        for t in root.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t"):
            if t.text:
                texts.append(t.text)
            if t.tail:
                texts.append(t.tail)
        blob = " ".join(texts)
        dest.write_text(blob, encoding="utf-8", errors="replace")
        print("  docx", len(blob), flush=True)
        continue
    reader = PdfReader(str(p), strict=False)
    n = len(reader.pages)
    parts = []
    for i, page in enumerate(reader.pages):
        t = page.extract_text() or ""
        parts.append(f"\n\n--- page {i+1}/{n} ---\n{t}")
        if (i + 1) % 20 == 0:
            print("  page", i + 1, "/", n, flush=True)
    blob = "".join(parts)
    dest.write_text(blob, encoding="utf-8", errors="replace")
    print("  pages", n, "chars", len(blob), flush=True)
