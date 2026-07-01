# -*- coding: utf-8 -*-
"""Generate thumbnail halaman 1 tiap brosur PDF -> brosur/preview/[slug].png"""
import fitz, os, glob

DATA = r"c:\Users\Sharon\paramount-website\data"
BROSUR = os.path.join(DATA, "brosur")
PREVIEW = os.path.join(BROSUR, "preview")
os.makedirs(PREVIEW, exist_ok=True)

ok, fail = 0, 0
for pdf in sorted(glob.glob(os.path.join(BROSUR, "brosur-*.pdf"))):
    slug = os.path.basename(pdf)[len("brosur-"):-len(".pdf")]
    out = os.path.join(PREVIEW, slug + ".png")
    try:
        doc = fitz.open(pdf)
        page = doc[0]
        # render ~800px lebar
        zoom = 800 / page.rect.width
        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom))
        pix.save(out)
        doc.close()
        ok += 1
    except Exception as e:
        print("  FAIL", slug, e)
        fail += 1

print(f"Preview brosur: OK={ok} FAIL={fail} -> {PREVIEW}")
