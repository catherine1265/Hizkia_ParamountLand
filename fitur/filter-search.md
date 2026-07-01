# Fitur: Filter & Pencarian Katalog Proyek

Halaman daftar semua proyek dengan filter & search. Baca dari `data/proyek.json` → `proyek[]`.

## Filter yang tersedia (semua field sudah ada di data)

| Filter | Field data | Contoh nilai |
|--------|-----------|--------------|
| Kategori | `kategori` | Residensial, Komersial |
| Lokasi | `lokasi` | Gading Serpong, Tangerang |
| Status | `status` | Ready Stock, Pre-Launch, Sold Out Sebagian |
| Range harga | `harga_mulai_dari` | slider 800 jt – 60 M |
| Kamar tidur | `card.kamar_tidur` | 2, 3, 4, 5 |
| Fasilitas | `fasilitas_tags` | Clubhouse, Kolam Renang, Keamanan 24 Jam |
| POI terdekat | `poi_terdekat` | Sekolah, Rumah Sakit, Akses Tol |
| Featured | `featured` | true/false |

## Search (teks bebas)

Cari di gabungan field: `nama`, `deskripsi`, `keunggulan`, `lokasi`, `tipe_unit[].nama_tipe`.

## Sorting

- Harga termurah → termahal (`harga_mulai_dari` asc)
- Harga termahal → termurah (desc)
- Featured dulu (default: sudah terurut di JSON — featured lalu `urutan_tampil`)

## Contoh logic (pseudo-JS)

```js
function filterProyek(proyek, f) {
  return proyek.filter(p => {
    if (f.kategori && p.kategori !== f.kategori) return false;
    if (f.status && p.status !== f.status) return false;
    if (f.hargaMax && p.harga_mulai_dari > f.hargaMax) return false;
    if (f.hargaMin && p.harga_mulai_dari < f.hargaMin) return false;
    if (f.fasilitas?.length &&
        !f.fasilitas.every(x => p.fasilitas_tags.includes(x))) return false;
    if (f.q) {
      const hay = (p.nama + p.deskripsi + p.keunggulan + p.lokasi).toLowerCase();
      if (!hay.includes(f.q.toLowerCase())) return false;
    }
    return true;
  });
}
```

## Catatan UI (ala Apple — lihat design-system.md)

- Grid card bersih, banyak whitespace, foto besar (`foto.cover`).
- Filter di sidebar/atas, sticky, minimalis.
- Tiap card = komponen sama dengan `related-properties.md` (reusable).
