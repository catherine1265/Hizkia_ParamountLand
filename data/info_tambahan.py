# -*- coding: utf-8 -*-
"""
Info tambahan hasil BACAAN MANUAL teks brosur (OCR + native) oleh asisten,
ditulis bersih & akurat (bukan regex mentah). Digabung ke proyek.json oleh gen_json.py.

Struktur per slug:
  highlight        : list[str]  - poin menarik singkat (selling points)
  spesifikasi      : list[str]  - spesifikasi teknis/material bila ada
  fasilitas_kawasan: list[str]  - fasilitas & lingkungan detail
  promo            : list[str]  - promo/skema bila disebut di brosur
  arsitek          : str|None   - konsultan/arsitek bila disebut
"""

INFO = {
    # ---------------- FEATURED ----------------
    "matera-lakeside": {
        "highlight": [
            "Konsep 'A New Genre of Lakeside Luxury' — hunian resort tepi danau",
            "Empat enclave eksklusif: Lakeview (tepi danau), Main Boulevard, Green Tunnel, dan Curvilinear",
            "Signature 'Dual Panoramic Balcony' — balkon dua arah pandang",
            "Rumah 3 lantai dengan fasad elegan & material selektif",
        ],
        "fasilitas_kawasan": [
            "Danau (lakeside) di dalam kawasan",
            "Matera Community Club sebagai pusat sosial warga",
            "Green Tunnel & jalan berkelok bersuasana resort",
        ],
        "arsitek": None,
    },
    "matera-residences": {
        "highlight": [
            "Konsep 'Luxurious Living with Greenery Environment' dengan koridor hijau 'Verde Corridor'",
            "Landmark ikonik: patung 'Ballerina' dan gerbang 'Grand Fiore'",
            "Peraih penghargaan 'Best High End Housing Development'",
        ],
        "fasilitas_kawasan": [
            "Matera Community Club",
            "Verde Corridor (koridor hijau utama)",
        ],
        "arsitek": "Arsitektur oleh Graha Cipta Hadiprana; interior oleh Sonny Sutanto Architects",
    },
    "matera-signature": {
        "highlight": [
            "Konsep 'The Ultimate Luxury Living'",
            "Hunian mewah di lokasi eksklusif & strategis",
            "Material premium dengan arsitektur elegan",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
    "anza-homes-malibu": {
        "highlight": [
            "Tipe terbaru di Malibu Cluster dengan desain modern",
            "Clubhouse eksklusif untuk rekreasi keluarga",
            "Empat konfigurasi unit fleksibel dengan pencahayaan alami maksimal",
        ],
        "fasilitas_kawasan": [
            "Clubhouse eksklusif",
            "Carport 1 unit per rumah",
        ],
        "arsitek": None,
    },
    "grand-pasadena-village": {
        "highlight": [
            "Konsep 'Prestigious Living' di Pasadena Central District",
            "Berlokasi di distrik mega baru yang berkembang pesat",
            "Sirkulasi udara alami & desain interior luas",
        ],
        "fasilitas_kawasan": [
            "Bagian dari Pasadena Central District (mixed-use 40 hektar)",
        ],
        "arsitek": None,
        "promo": ["Bebas PPN hingga Rp 220 juta (serah terima 2026)"],
    },
    "oxford-square": {
        "highlight": [
            "Konsep 'Modern Classic Commercial Space' 4 lantai di Victoria Central District",
            "Cocok untuk kafe, restoran, retail, butik, kantor & jasa profesional",
            "Dilengkapi teras alfresco & balkon luas",
        ],
        "fasilitas_kawasan": [
            "Bagian dari Victoria Central District (kawasan komersial 6 hektar)",
        ],
        "arsitek": None,
    },

    # ---------------- FRESCO PARADE (satu keluarga cluster) ----------------
    "fresco-parade-arcadia": {
        "highlight": [
            "Konsep 'Modern Tropical' untuk kesejukan & kenyamanan maksimal",
            "Cluster ready stock dengan keamanan 24 jam",
            "Dekat sekolah Tarakanita, Stella Maris & Universitas Matana",
        ],
        "spesifikasi": [
            "Pondasi: Strauss pile / tapak batu kali",
            "Struktur beton bertulang, atap rangka baja ringan + genteng beton",
            "Finishing eksterior cat / homogeneous tile motif travertine",
        ],
        "fasilitas_kawasan": ["Keamanan 24 jam", "Dekat pusat perbelanjaan & kuliner"],
        "arsitek": None,
    },
    "fresco-parade-trimezia": {
        "highlight": [
            "Konsep 'Modern Tropical Style' di Trimezia Cluster",
            "Dekat RS Bethsaida, G-Town culinary, dan universitas",
            "Desain estetika kontemporer, ruang praktis & nyaman",
        ],
        "spesifikasi": [
            "Pondasi: Strauss pile / tapak batu kali",
            "Struktur beton bertulang, atap rangka baja ringan + genteng beton",
            "Finishing eksterior cat / homogeneous tile motif travertine",
        ],
        "fasilitas_kawasan": ["Keamanan 24 jam"],
        "arsitek": None,
    },
    "fresco-parade-virginia": {
        "highlight": [
            "Konsep 'Modern Tropical' di Virginia Cluster",
            "Hunian praktis & nyaman untuk keluarga, ready stock",
            "Akses mudah ke sekolah, komersial & pusat perbelanjaan",
        ],
        "spesifikasi": [
            "Pondasi: Strauss pile / tapak batu kali",
            "Struktur beton bertulang, atap rangka baja ringan + genteng beton",
            "Finishing eksterior cat / homogeneous tile motif travertine",
        ],
        "fasilitas_kawasan": ["Keamanan 24 jam"],
        "arsitek": None,
    },
    "fresco-parade-bohemia": {
        "highlight": [
            "Konsep 'Modern Tropical' di Bohemia Cluster, jantung Gading Serpong",
            "Dekat Summarecon Serpong Mall & Paramount Modern Market",
            "Lingkungan keluarga dengan keamanan 24 jam",
        ],
        "spesifikasi": [
            "Pondasi: Strauss pile / tapak batu kali; struktur beton bertulang",
            "Lantai utama homogeneous tile 60x60; dinding bata ringan",
            "Atap rangka baja ringan + genteng beton flat",
        ],
        "fasilitas_kawasan": ["Keamanan 24 jam"],
        "arsitek": None,
    },
    "fresco-parade-british": {
        "highlight": [
            "Konsep 'Modern Tropical' di British Cluster",
            "Gated community dengan keamanan 24 jam",
            "Dekat Summarecon Serpong Mall, sekolah & universitas",
        ],
        "spesifikasi": [
            "Pondasi: Strauss pile / tapak batu kali",
            "Struktur beton bertulang, atap rangka baja ringan + genteng beton",
            "Finishing eksterior cat / homogeneous tile motif travertine",
        ],
        "fasilitas_kawasan": ["Carport 1-2 per unit", "Keamanan 24 jam"],
        "arsitek": None,
    },
    "menteng-grand": {
        "highlight": [
            "Townhouse 2 lantai mewah di Menteng Village Cluster (iL Lago)",
            "±500 meter dari Gading Serpong Boulevard",
            "Kapasitas 4 carport per unit",
        ],
        "fasilitas_kawasan": ["Community amenities", "Akses cepat pusat belanja & hiburan"],
        "arsitek": None,
    },
    "new-menteng": {
        "highlight": [
            "Konsep 'Open Floor Plan' untuk interior luas di Menteng Village",
            "Dekat G-Town culinary center & Bez Plaza",
            "Gated community dengan keamanan terjaga",
        ],
        "fasilitas_kawasan": [
            "Community club, kolam renang, gym",
            "Lapangan basket & area foosball",
            "Keamanan gated",
        ],
        "arsitek": None,
    },
    "pasadena-grand-residences": {
        "highlight": [
            "Hunian premium konsep 'Green Living & Green Energy'",
            "Iconic Entrance Gate dengan water fountain & taman",
            "Club House seluas 2.300 m2",
        ],
        "fasilitas_kawasan": [
            "Club House 2.300 m2",
            "Entrance garden, bicycle line & street furniture",
            "Lingkungan hijau dengan sebaran danau alami",
        ],
        "arsitek": None,
    },
    "new-elista-village": {
        "highlight": [
            "'Rumah-Rumah Cantik' di Gading Serpong, dekat perbatasan BSD",
            "Akses langsung jalan BSD & gerbang tol",
            "Desain cluster modern beragam layout",
        ],
        "fasilitas_kawasan": ["Dekat Ruko Aniva", "Fasilitas cluster & kota"],
        "arsitek": None,
    },
    "alma-omaha-village": {
        "highlight": [
            "Dekat kawasan premium iL-Lago",
            "Beragam pilihan lebar unit (8, 10, 12 meter)",
            "Dekat institusi pendidikan TK hingga universitas",
        ],
        "spesifikasi": [
            "Pondasi Strauss pile; plafon gypsum finish cat",
            "Fitur premium: Solar Water Heater, Canopy, Smart Door Lock",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
    "navona-village": {
        "highlight": [
            "Konsep 'Everything is Here' di kawasan terintegrasi",
            "Rumah 1 lantai dengan beragam ukuran lahan (72-175 m2)",
            "Ready stock untuk unit terpilih",
        ],
        "fasilitas_kawasan": ["Akses fasilitas kota Paramount"],
        "arsitek": None,
    },
    "padova-milano-village": {
        "highlight": [
            "Hunian modern terjangkau untuk milenial",
            "Lokasi strategis antara Gading Serpong & BSD",
            "Area mapan dengan infrastruktur & amenitas berkualitas",
        ],
        "spesifikasi": [
            "Pondasi tapak beton & batu kali; plafon gypsum",
            "Lantai carport keramik 40x40",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
    "new-zuma-north-malibu": {
        "highlight": [
            "Konsep minimalis modern di utara Malibu Village",
            "Strategis dekat perbatasan Gading Serpong-BSD",
            "Townhouse 2 lantai, 1 carport per unit",
        ],
        "spesifikasi": [
            "Pondasi tapak beton & batu kali; atap rangka baja ringan",
            "Kusen aluminium anodize; dinding bata ringan",
            "Lantai utama keramik 40x40; sanitair TOTO",
        ],
        "fasilitas_kawasan": ["Carport 1 per unit"],
        "arsitek": None,
    },
    "omaha-village": {
        "highlight": [
            "Konsep 'CANTIK': Ceria, Aman, Nyaman, Terjangkau, Inovatif",
            "Hunian semi-detached dengan desain inovatif",
            "Lingkungan ramah keluarga",
        ],
        "spesifikasi": [
            "Pondasi batu kali; plafon gypsum",
            "Lantai teras & carport keramik 40x40; sanitair standar Paramount",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
    "la-bella-atlanta-village": {
        "highlight": [
            "Lakeside residence yang menenangkan di Atlanta Village",
            "Desain kontemporer 2 lantai",
            "Dikelilingi pusat komersial & pendidikan",
        ],
        "fasilitas_kawasan": ["Danau di dalam kawasan", "Dekat pusat perbelanjaan"],
        "arsitek": None,
    },
    "amalfi-village": {
        "highlight": [
            "Konsep 'Everything is Here' untuk gaya hidup urban",
            "Tipe unit fleksibel untuk beragam kebutuhan keluarga",
            "Harga kompetitif untuk area Gading Serpong",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
    "alma-montana-village": {
        "highlight": [
            "Material bangunan berkualitas tinggi & fasad modern",
            "Dekat Sorrento culinary center",
            "Dekat universitas & rumah sakit",
        ],
        "spesifikasi": ["Lantai carport keramik motif 40x40"],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
    "latigo-village": {
        "highlight": [
            "Townhouse 2 lantai, ready stock",
            "Beragam pilihan ukuran (8x12+ & 8x15+)",
            "Lokasi strategis di Paramount Gading Serpong",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
    "carrillo-residence": {
        "highlight": [
            "Konsep 'Everything is Here', komunitas terintegrasi",
            "Beragam tipe unit termasuk pilihan corner (Hoek)",
            "Lokasi strategis di pengembangan Gading Serpong mapan",
        ],
        "fasilitas_kawasan": ["Akses fasilitas kota Paramount"],
        "arsitek": None,
    },
    "granada-alicante": {
        "highlight": [
            "Hunian mewah konsep modern klasik di Alicante Cluster",
            "Di Jl. Jendral Gatot Subroto, akses cepat ke BSD & tol",
            "Dekat pusat kuliner & pertokoan",
        ],
        "spesifikasi": [
            "Lantai homogeneous tile 80x80 (L12) / 60x60 (L8, L10)",
            "Dinding bata ringan finish cat; pondasi tapak/batu kali",
            "Hardware Deckson atau setara",
        ],
        "fasilitas_kawasan": ["Carport 1-2 per unit"],
        "arsitek": None,
    },
    "magnolia": {
        "highlight": [
            "Konsep modern klasik, hunian 2 lantai dengan lahan 200 m2+",
            "Dekat RS Bethsaida, Fame Hotel & BEZ Walk",
            "Potensi investasi tinggi",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
    "the-lavender": {
        "highlight": [
            "Cluster dengan tampilan depan menarik & lahan sisa luas",
            "Dekat sekolah internasional (Tarakanita, Stella Maris)",
            "Dekat kampus UPH, Untar & UMN",
        ],
        "spesifikasi": ["Daya listrik 3.300 VA", "Carport per unit"],
        "fasilitas_kawasan": ["Danau di sekitar kawasan"],
        "arsitek": None,
    },
    "new-alicante": {
        "highlight": [
            "Hunian mewah bernuansa klasik di Alicante Cluster",
            "Semua unit ready stock, 2 carport per unit",
            "Di Jl. Jendral Gatot Subroto, akses cepat ke BSD & tol",
        ],
        "spesifikasi": [
            "Struktur beton bertulang; penutup atap genteng keramik",
        ],
        "fasilitas_kawasan": ["Carport 2 per unit"],
        "arsitek": None,
    },
    "bellano-lobelisco": {
        "highlight": [
            "Hunian premium modern klasik di kawasan eksklusif iL Lago",
            "One gate system dengan keamanan 24 jam",
            "Dekat BSD & Tangerang Selatan, akses gerbang tol",
        ],
        "fasilitas_kawasan": ["One gate system", "Keamanan 24 jam"],
        "arsitek": None,
    },
    "amarillo-village": {
        "highlight": [
            "Cluster dengan fasilitas lengkap & tampilan depan menarik",
            "Dekat gerbang tol Jakarta-Tangerang & BSD",
            "Ready stock & show unit tersedia",
        ],
        "fasilitas_kawasan": ["Fasilitas cluster lengkap"],
        "arsitek": None,
    },
    "new-amarillo": {
        "highlight": [
            "Ekstensi desain Amarillo di Cluster Amarillo",
            "Akses strategis ke BSD & gerbang tol",
            "Townhouse 2 lantai dengan amenitas modern",
        ],
        "fasilitas_kawasan": ["Dekat Malibu Village & Latigo Village"],
        "arsitek": None,
    },
    "fresco-parade-amarillo": {
        "highlight": [
            "Hunian eksklusif konsep 'Modern Tropical' di Amarillo Cluster",
            "Keamanan 24 jam & fasilitas clubhouse",
            "Dekat fasilitas pendidikan, komersial & kesehatan",
        ],
        "spesifikasi": [
            "Pondasi Strauss pile / tapak batu kali; struktur beton bertulang",
            "Atap rangka baja ringan + genteng beton",
        ],
        "fasilitas_kawasan": ["Clubhouse", "Keamanan 24 jam"],
        "arsitek": None,
    },

    # ---------------- KOMERSIAL ----------------
    "victoria-business-loft": {
        "highlight": [
            "Premium business loft 6 lantai di Victoria Central District",
            "Untuk showroom, kantor korporat, klinik & butik",
            "Fasad kontemporer modern dengan parkir memadai",
        ],
        "fasilitas_kawasan": ["Bagian dari Victoria Central District (6 hektar)", "Parkir luas"],
        "arsitek": None,
    },
    "maxim-square": {
        "highlight": [
            "Kawasan komersial 6 hektar di Victoria Central District",
            "Beragam unit: Business Loft, Studio Loft, Alfresco & Regular Shophouse",
            "Peluang investasi strategis di jantung Gading Serpong",
        ],
        "fasilitas_kawasan": ["Bagian dari Victoria Central District", "Area parkir"],
        "arsitek": None,
        "promo": ["Bebas PPN hingga Rp 220 juta (serah terima 2026)"],
    },
    "pasadena-square": {
        "highlight": [
            "Area komersial pertama di Pasadena Central District (mixed-use 40 hektar)",
            "Konsep '10-minute city' dengan akses mudah ke BSD",
            "High foot traffic 1.000+ kendaraan/jam, double facade & teras alfresco",
        ],
        "fasilitas_kawasan": ["Teras alfresco", "Jalur pedestrian"],
        "arsitek": None,
    },
    "pasadena-square-south": {
        "highlight": [
            "Komersial 'the complete market' di Pasadena Central District",
            "Terpapar 1.500+ kendaraan/jam di boulevard utama",
            "Melayani 20+ cluster residensial sekitar",
        ],
        "fasilitas_kawasan": ["Berhadapan dengan Taman Rasa"],
        "arsitek": None,
    },
    "pasadena-square-north": {
        "highlight": [
            "Pusat komersial modern 3 lantai dengan double facade",
            "Desain minimalis & teras alfresco",
            "Unit terbatas, ekspansi pertama pusat komersial Pasadena",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
        "promo": ["Bebas PPN hingga Rp 220 juta (serah terima 2026)"],
    },
    "pasadena-square-north-studio-loft": {
        "highlight": [
            "Studio loft untuk entrepreneur milenial di Boulevard Row 45",
            "Fitur mezzanine, balkon alfresco & double facade",
            "Penghubung strategis BSD & Boulevard Pasadena",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
        "promo": ["Bebas PPN hingga Rp 220 juta (serah terima 2026)"],
    },
    "grand-boulevard-aniva-studio-loft": {
        "highlight": [
            "'The Most Happening Commercial' di jalan penghubung Gading Serpong-BSD",
            "Unit 5x17 dengan pilihan lantai standar atau mezzanine",
            "Bangunan 3 lantai dengan desain fleksibel",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
    "il-lago-grande": {
        "highlight": [
            "Kawasan komersial dengan desain art deco modern",
            "Unit ruko dari studio loft hingga tipe standar (2-3 lantai)",
            "Terintegrasi dengan area komersial sekitar",
        ],
        "fasilitas_kawasan": ["Ekosistem district komersial terhubung"],
        "arsitek": None,
        "promo": ["Bebas PPN hingga Rp 220 juta (serah terima 2026)"],
    },
    "il-lago-square": {
        "highlight": [
            "Kawasan komersial dengan desain art deco modern di jantung Gading Serpong",
            "Terhubung akses utama (ROW 20, 45, 30)",
            "Dekat pengembangan premium",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
        "promo": ["Bebas PPN hingga Rp 220 juta (serah terima 2026)"],
    },
    "madison-grande": {
        "highlight": [
            "Kompleks retail konsep 'One Stop Shopping' di Manhattan District",
            "F&B, hobi, olahraga, fashion & hiburan",
            "Dikelilingi cluster residensial premium",
        ],
        "fasilitas_kawasan": ["Bagian dari Manhattan District (22 hektar)"],
        "arsitek": None,
        "promo": ["Bebas PPN hingga Rp 220 juta (serah terima 2026)"],
    },
    "menteng-studio-loft": {
        "highlight": [
            "Ruko premium konsep green/eco lifestyle",
            "Desain dual tenancy dalam satu bangunan",
            "Dekat Menteng Village & Bellano Village",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
    "hampton-east-manhattan-district": {
        "highlight": [
            "Komersial di Manhattan District dengan double facade & grand canopy",
            "Plafon tinggi 5,4 meter untuk interior lapang",
            "Studio Loft tersedia, ±800 m ke Boulevard Utama Gading Serpong",
        ],
        "fasilitas_kawasan": ["Grand canopy", "Area parkir luas"],
        "arsitek": None,
        "promo": ["Bebas PPN hingga Rp 220 juta (serah terima 2026)"],
    },
    "new-santa-anna": {
        "highlight": [
            "Ruko ekstensi 2 lantai, unit terbatas",
            "Dekat cluster residensial premium",
            "Dekat sekolah internasional Tarakanita & Stella Maris",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
    "new-santa-monica": {
        "highlight": [
            "Ruko ekstensi Santa Monica, unit terbatas",
            "Berdekatan dengan puluhan area residensial premium",
            "Dekat sekolah Tarakanita & Stella Maris",
        ],
        "fasilitas_kawasan": [],
        "arsitek": None,
    },
}

# konteks kota Paramount Gading Serpong — dipakai bila proyek belum punya info kredibilitas
KONTEKS_KOTA = {
    "ringkas": "Paramount Gading Serpong: kota mandiri ~1.000 hektar, 120.000+ penduduk, 18 km barat Jakarta. Terhubung 3 tol (Jakarta-Merak, Serpong-Balaraja, JORR 2), akses langsung Bandara Soekarno-Hatta. Pertumbuhan nilai ~15% per tahun.",
    "penghargaan": [
        "Best Township Developer (Asia) 2024",
        "Best Township Developer Indonesia 2024",
        "Best High End Housing Development 2024",
        "Best Commercial Developer 2023",
    ],
}

if __name__ == "__main__":
    import json, os
    out = os.path.join(os.path.dirname(__file__), "brosur-info-bersih.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump({"info": INFO, "konteks_kota": KONTEKS_KOTA}, f, ensure_ascii=False, indent=2)
    print(f"OK: {len(INFO)} proyek -> {out}")
