# -*- coding: utf-8 -*-
"""
Ekstrak gambar embedded dari tiap brosur PDF ->
data/foto-proyek/[slug]/brosur-1.jpg, brosur-2.jpg, ...
Hanya ambil gambar besar (skip logo/ikon kecil). Dedupe by hash.
"""
import fitz, os, glob, hashlib

DATA = r"c:\Users\Sharon\paramount-website\data"
BROSUR = os.path.join(DATA, "brosur")
FOTO = os.path.join(DATA, "foto-proyek")

MIN_W, MIN_H = 500, 400      # minimal dimensi biar bukan ikon/logo
MIN_BYTES = 40_000           # minimal ukuran file
MAX_PER_PROYEK = 15          # batasi jumlah

pdfs = sorted(glob.glob(os.path.join(BROSUR, "brosur-*.pdf")))
total_saved = 0
for pdf in pdfs:
    slug = os.path.basename(pdf)[7:-4]
    outdir = os.path.join(FOTO, slug)
    os.makedirs(outdir, exist_ok=True)
    doc = fitz.open(pdf)
    seen_hash = set()
    saved = 0
    for page in doc:
        for img in page.get_images(full=True):
            if saved >= MAX_PER_PROYEK:
                break
            xref = img[0]
            try:
                base = doc.extract_image(xref)
            except Exception:
                continue
            data = base["image"]
            w, h = base.get("width", 0), base.get("height", 0)
            ext = base.get("ext", "jpg")
            if w < MIN_W or h < MIN_H or len(data) < MIN_BYTES:
                continue
            hsh = hashlib.md5(data).hexdigest()
            if hsh in seen_hash:
                continue
            seen_hash.add(hsh)
            saved += 1
            fn = os.path.join(outdir, f"brosur-{saved}.{ext}")
            with open(fn, "wb") as f:
                f.write(data)
    doc.close()
    total_saved += saved
    print(f"{slug}: {saved} gambar")

print(f"\nTOTAL gambar embedded diekstrak: {total_saved}")
