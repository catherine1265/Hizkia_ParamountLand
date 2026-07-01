# Design System — ala apple.com

Referensi visual: **apple.com**. Prinsip: bersih, banyak ruang kosong, foto besar
sebagai bintang utama, tipografi tebal & besar, animasi halus, warna netral +
1 aksen. Untuk properti mewah Paramount, ini cocok: elegan & premium.

## 1. Prinsip inti (yang bikin "terasa Apple")

1. **Whitespace berlimpah** — jangan padat. Beri napas antar elemen (section padding besar, mis. 96–120px vertikal).
2. **Foto full-bleed** — hero & section pakai foto besar edge-to-edge, teks di atasnya.
3. **Tipografi besar & tegas** — headline 48–80px, bold/semibold, letter-spacing rapat.
4. **Netral + 1 aksen** — dasar putih/abu sangat terang & hitam pekat; aksen biru (bisa diganti warna brand Paramount).
5. **Gerakan halus** — fade/slide saat scroll (reveal on scroll), hover skala lembut.
6. **Grid rapi & center** — konten max-width ~980–1200px, ketengah.
7. **Sudut membulat lembut** — radius 12–18px pada card & tombol.

## 2. Design Tokens (lihat `tokens.css`)

- Warna, spacing, radius, shadow, tipografi — semua sebagai CSS variables.
- Pakai `tokens.css` sebagai fondasi; komponen tinggal refer ke `var(--...)`.

## 3. Tipografi

- Font: **-apple-system, "SF Pro Display", "Inter", "Helvetica Neue", Arial, sans-serif**
  (SF Pro tidak bebas didistribusikan; **Inter** adalah pengganti gratis paling mirip).
- Skala:
  - Display: 56–80px / weight 600 / line-height 1.05
  - H1: 40–48px / 600
  - H2: 28–32px / 600
  - Body: 17–19px / 400 / line-height 1.5
  - Caption: 13–14px / 400 / warna abu

## 4. Komponen kunci

- **Hero**: foto proyek featured full-width, judul besar center/left, 2 tombol (Lihat Proyek / WhatsApp).
- **Card proyek** (reusable — lihat `related-properties.md`): foto besar atas, info ringkas, hover angkat lembut (`translateY(-4px)` + shadow).
- **Tombol**:
  - Primer: latar aksen, teks putih, radius penuh (pill) atau 12px.
  - Sekunder: teks aksen tanpa latar, atau garis tipis.
- **Section reveal**: opacity 0→1 + translateY(20px→0) saat masuk viewport.

## 5. Layout halaman (saran)

- **Homepage**: Hero → Proyek Featured (grid card) → Kategori (Residensial/Komersial) → Kalkulator teaser → Social proof (embed IG/TikTok) → Tentang Hizkia → Footer WA.
- **Katalog**: filter atas/samping + grid card (`filter-search.md`).
- **Detail proyek**: galeri foto besar → info + harga + CTA WA → tabel tipe unit → kalkulator → brosur → **Rekomendasi (card + compare)**.

## 6. Referensi teknis pembuatan (nanti)

- Stack ringan yang cocok: **Next.js / Astro** (SSG, cepat, SEO bagus) atau HTML+Tailwind.
- Tailwind memudahkan meniru spacing & tipografi Apple dengan util classes.
- Semua data dari `../data/*.json` (jangan hardcode).

> Catatan hukum: **jangan** menyalin logo/aset/branding Apple. "Ala Apple" di sini =
> meniru *prinsip desain* (whitespace, tipografi, foto besar), bukan meng-copy identitas mereka.
