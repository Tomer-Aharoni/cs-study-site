# כלי סוכן

הקבצים בתיקייה הזו לא נטענים מ־`index.html`. הם נשארים לעיבוד מקורות ולהמשך פיתוח.

- `_extract_lecturer.py` — חילוץ טקסט מ־PDF ו־DOCX של המרצה אל `sources/20937/text/lecturer`
- `_ocr_lecturer.py` — OCR למצגות בלי שכבת טקסט, אל `sources/20937/text/lecturer-ocr`
- `_ocr_exams.py` — OCR לשאלונים סרוקים, אל `sources/20937/text/exams-ocr`
- `_build_hw.py` — בניית HTML מתקפל של שיעורי בית אל `data/*-hw.js`
- `exam-ocr-reject.js` — סריקות שנבדקו ולא נכנסו לאתר
- `nb_additions.cursorrules` — הנחיית מיזוג ישנה מול `sources/20937/notes/notebookllm`

`scripts/publish-content.py` נשאר מחוץ לתיקייה הזו. הוא מעתיק תוכן שפורסם באתר אל קבצי המקור.
