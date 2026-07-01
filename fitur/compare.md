# Fitur: Bandingkan Proyek (Compare)

User menandai 2–3 proyek (via tombol `+ Bandingkan` di card) → tampil tabel
perbandingan side-by-side.

## Keranjang compare (state)

- Simpan array `slug` di state global + `localStorage` (mis. key `compare`).
- Batas maksimal 3 proyek (UX ala Apple: fokus, tidak berantakan).
- Floating bar muncul di bawah saat ada ≥1 item: "Bandingkan (2)" → buka halaman/modal.

```js
const MAX = 3;
function addToCompare(slug) {
  const list = getCompare();
  if (list.includes(slug) || list.length >= MAX) return list;
  const next = [...list, slug];
  localStorage.setItem("compare", JSON.stringify(next));
  return next;
}
function removeFromCompare(slug) { /* filter keluar */ }
function getCompare() { return JSON.parse(localStorage.getItem("compare") || "[]"); }
```

## Baris perbandingan (tabel)

Ambil dari `proyek.json`. Kolom = tiap proyek, baris = atribut:

| Baris | Field |
|-------|-------|
| Foto | `foto.cover` |
| Nama | `nama` |
| Kategori | `kategori` |
| Lokasi | `lokasi` |
| Status | `status` |
| Harga mulai | `harga_mulai_dari_display` |
| Harga tertinggi | `harga_tertinggi_display` |
| Kamar tidur | `card.kamar_tidur` |
| Kamar mandi | `card.kamar_mandi` |
| Luas tanah | `card.luas_tanah_m2` |
| Luas bangunan | `card.luas_bangunan_m2` |
| Jumlah tipe | `jumlah_tipe` |
| Fasilitas | `fasilitas_tags` (chips) |
| POI terdekat | `poi_terdekat` (chips) |
| Brosur | `brosur` (tombol download) |
| CTA | tombol WA (lihat `wa-cta.md`) |

## Highlight beda (opsional, nilai tambah)

Untuk baris angka (harga, luas), tandai nilai **termurah/terluas** dengan warna aksen —
membantu user memutuskan cepat.

## Catatan UI

- Sticky kolom pertama (nama baris) saat scroll horizontal di mobile.
- Tombol "Hapus" (×) di header tiap kolom untuk keluarkan proyek dari perbandingan.
