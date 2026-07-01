# -*- coding: utf-8 -*-
"""OCR semua brosur PDF (image-based) -> teks mentah per proyek di data/brosur-teks/."""
import fitz, pytesseract, io, os, glob
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

DATA = r"c:\Users\Sharon\paramount-website\data"
BROSUR = os.path.join(DATA, "brosur")
OUT = os.path.join(DATA, "brosur-teks")
os.makedirs(OUT, exist_ok=True)

MAX_HAL = 12   # batasi halaman per brosur (konten penting biasanya di depan)
ZOOM = 3.0     # resolusi render untuk OCR

pdfs = sorted(glob.glob(os.path.join(BROSUR, "brosur-*.pdf")))
print(f"Total brosur: {len(pdfs)}")

for idx, pdf in enumerate(pdfs, 1):
    slug = os.path.basename(pdf)[7:-4]
    out_path = os.path.join(OUT, slug + ".txt")
    try:
        doc = fitz.open(pdf)
        n = min(doc.page_count, MAX_HAL)
        parts = []
        for i in range(n):
            pg = doc[i]
            # coba teks native dulu (lebih akurat)
            native = pg.get_text().strip()
            if len(native) > 100:
                parts.append(native)
            else:
                pix = pg.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM))
                img = Image.open(io.BytesIO(pix.tobytes("png")))
                parts.append(pytesseract.image_to_string(img, lang="eng"))
        doc.close()
        teks = "\n\n".join(parts)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(teks)
        print(f"[{idx}/{len(pdfs)}] {slug}: {len(teks)} char")
    except Exception as e:
        print(f"[{idx}/{len(pdfs)}] {slug}: ERROR {e}")

print("DONE")
