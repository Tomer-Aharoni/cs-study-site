# כלי סוכן

הקבצים בתיקייה הזו לא נטענים מ־`index.html`. הם נשארים לעיבוד מקורות ולהמשך פיתוח.

- `_extract_lecturer.py` — חילוץ טקסט מ־PDF ו־DOCX של המרצה אל `_extract/lecturer`
- `_ocr_lecturer.py` — OCR למצגות בלי שכבת טקסט
- `_ocr_exams.py` — OCR לשאלונים סרוקים
- `_build_hw.py` — בניית HTML מתקפל של שיעורי בית אל `data/*-hw.js`
- `exam-ocr-reject.js` — סריקות שנבדקו ולא נכנסו לאתר
- `nb_additions.cursorrules` — הנחיית מיזוג ישנה מול `notebookLLM_review`

`scripts/publish-content.py` נשאר מחוץ לתיקייה הזו. הוא מעתיק תוכן שפורסם באתר אל קבצי המקור.
