# Fitur: Rekomendasi Properti + Card (di halaman detail)

Di bawah halaman detail 1 proyek, tampilkan **card proyek lain yang mirip**.
Klik card → pindah ke halaman proyek itu. Ada tombol kecil **Bandingkan** di card.

## Data (sudah siap di proyek.json)

Tiap proyek punya:
- `rekomendasi`: array 6 slug proyek termirip (kategori sama + harga terdekat)
- `card`: ringkasan info penting untuk ditampilkan di card

```json
"card": {
  "kamar_tidur": "3-4",
  "kamar_mandi": "4-5",
  "luas_tanah_m2": "128-288",
  "luas_bangunan_m2": "226-316"
}
```

## Anatomi Card

```
┌────────────────────────┐
│  [foto.cover]          │  ← foto besar (rasio 4:3 / 16:10)
│                        │
├────────────────────────┤
│  Nama Proyek           │  ← p.nama
│  Gading Serpong        │  ← p.lokasi
│  Mulai Rp 5,82 M       │  ← p.harga_mulai_dari_display
│  🛏 3-4   🚽 4-5       │  ← p.card.kamar_tidur / kamar_mandi
│  [ + Bandingkan ]      │  ← tombol kecil, tidak memicu navigasi card
└────────────────────────┘
   ↑ klik area card (selain tombol) → /proyek/{slug}
```

## Logic render

```js
function renderRelated(proyekSekarang, semuaProyek) {
  const byslug = Object.fromEntries(semuaProyek.map(p => [p.slug, p]));
  return proyekSekarang.rekomendasi
    .map(slug => byslug[slug])
    .filter(Boolean)
    .map(p => ({
      slug: p.slug,
      nama: p.nama,
      lokasi: p.lokasi,
      harga: p.harga_mulai_dari_display,
      cover: p.foto.cover,
      kt: p.card.kamar_tidur,
      km: p.card.kamar_mandi,
      href: `/proyek/${p.slug}`,
    }));
}
```

## Interaksi tombol Bandingkan

- Klik `+ Bandingkan` → `addToCompare(slug)` (lihat `compare.md`), JANGAN navigasi.
- `event.stopPropagation()` supaya klik tombol tidak ikut memicu klik card.
- Card yang sudah di keranjang compare: tombol berubah jadi `✓ Dibandingkan`.

## Catatan

- Card ini **komponen reusable** — dipakai juga di `filter-search.md` (katalog) & homepage (featured).
- Kalau `foto.cover` null, pakai placeholder abu-abu minimalis.
