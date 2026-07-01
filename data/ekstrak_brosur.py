# -*- coding: utf-8 -*-
"""
Ekstrak info penting dari teks brosur (data/brosur-teks/[slug].txt) ->
data/brosur-info.json : { slug: {highlight[], fasilitas[], promo[], jarak[]} }
Keyword-based supaya tahan terhadap noise OCR.
"""
import json, os, re, glob

DATA = r"c:\Users\Sharon\paramount-website\data"
SRC = os.path.join(DATA, "brosur-teks")
OUT = os.path.join(DATA, "brosur-info.json")

KW = {
    "fasilitas": [
        "clubhouse", "club house", "kolam renang", "swimming", "jogging",
        "gym", "fitness", "playground", "taman", "park", "jogging track",
        "basketball", "one gate", "gated", "cctv", "security", "keamanan",
        "boulevard", "danau", "lake", "canopy", "mezzanine", "alfresco",
    ],
    "jarak": [
        "menit", "minute", "km ", "kilometer", "meter", "toll", "tol",
        "airport", "bandara", "stasiun", "station", "exit", "gerbang",
    ],
    "promo": [
        "ppn", "tax free", "tax-free", "free ppn", "bebas ppn", "bebas pajak",
        "promo", "cashback", "discount", "diskon", "subsidi", "dp 0",
        "booking fee", "hadiah", "voucher", "gratis",
    ],
    "highlight": [
        "luxury", "mewah", "eksklusif", "exclusive", "premium", "signature",
        "the ultimate", "new genre", "green living", "smart home", "concept",
        "konsep", "award", "penghargaan", "best ", "terbaik", "iconic", "ikonik",
        "limited", "terbatas", "investment", "investasi", "strategic", "strategis",
    ],
}

# baris/kalimat yang harus dibuang (boilerplate, disclaimer, noise OCR)
STOP = [
    "disclaimer", "materi promosi", "sewaktu-waktu", "developer berhak",
    "syarat dan ketentuan", "terms and condition", "www.", "http", "@",
    "hak cipta", "copyright", "all rights",
]

def kalimat(teks):
    # pisah jadi kalimat kasar
    teks = re.sub(r"\s+", " ", teks)
    return re.split(r"(?<=[.!?])\s+|\n+", teks)

def bersih(s):
    s = re.sub(r"\s+", " ", s).strip(" -•·|�,")
    return s

def relevan(s):
    low = s.lower()
    if len(s) < 15 or len(s) > 240:
        return None
    if any(x in low for x in STOP):
        return None
    # buang kalimat yang mayoritas simbol/noise OCR
    huruf = sum(c.isalpha() or c.isspace() for c in s)
    if huruf / max(len(s), 1) < 0.7:
        return None
    for kat, kws in KW.items():
        if any(k in low for k in kws):
            return kat
    return None

hasil = {}
for path in sorted(glob.glob(os.path.join(SRC, "*.txt"))):
    slug = os.path.basename(path)[:-4]
    teks = open(path, encoding="utf-8").read()
    buckets = {"highlight": [], "fasilitas": [], "promo": [], "jarak": []}
    seen = set()
    for kal in kalimat(teks):
        s = bersih(kal)
        kat = relevan(s)
        if not kat:
            continue
        key = s.lower()[:50]
        if key in seen:
            continue
        seen.add(key)
        if len(buckets[kat]) < 6:   # maksimal 6 per kategori
            buckets[kat].append(s)
    # buang kategori kosong
    hasil[slug] = {k: v for k, v in buckets.items() if v}

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(hasil, f, ensure_ascii=False, indent=2)

total = sum(len(v2) for v in hasil.values() for v2 in v.values())
print(f"Diproses: {len(hasil)} brosur, {total} butir info -> {OUT}")
for slug, b in list(hasil.items())[:3]:
    print(f"\n=== {slug} ===")
    for kat, items in b.items():
        print(f"  [{kat}]")
        for it in items[:3]:
            print(f"    - {it}")
