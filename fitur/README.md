# Fitur Website — Paramount Land / Hizkia

Tiap fitur dipisah dalam file sendiri. Ini **spesifikasi + logic** yang siap dipakai
saat membangun website. Semua membaca data dari `../data/proyek.json`, `profil.json`,
`social.json` (satu sumber kebenaran).

| File | Fitur | Status data |
|------|-------|-------------|
| `kalkulator-cash-bertahap.js` | Kalkulator Cash Bertahap (bukan KPR) | ✅ teruji |
| `filter-search.md` | Filter & pencarian katalog proyek | ✅ siap |
| `related-properties.md` | Rekomendasi proyek + card di halaman detail | ✅ siap |
| `compare.md` | Bandingkan 2-3 proyek side-by-side | ✅ siap |
| `wa-cta.md` | Tombol WhatsApp prefill + lead form | ✅ siap |
| `design-system.md` | Panduan desain ala apple.com | — |

## Skema Pembayaran (penting)

Paramount pakai **Cash Bertahap**, bukan KPR bank:
- Booking Fee (default Rp 50 jt, bagian dari harga)
- DP opsional (0% / 10% / 20% dst)
- Cicilan rata per bulan selama N termin (default 120x, tiap tanggal 16)
- Rumus terverifikasi: `cicilan = (1 - DP%) x harga / jumlahTermin`

## Prinsip

- **1 sumber data**: semua fitur baca `data/*.json`. Jangan hardcode data proyek di komponen.
- **Konversi = WhatsApp**: setiap halaman proyek punya CTA WA yang prefill nama proyek.
- **Slug = kunci**: navigasi antar proyek pakai `slug` (mis. `/proyek/matera-lakeside`).
