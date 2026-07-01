# Fitur: WhatsApp CTA + Lead Form

Konversi utama seorang agent = orang klik → chat WA. Ada di **setiap** halaman proyek.

## Nomor WA

Dari `data/social.json` → `whatsapp`: `https://wa.me/6281211418507`
(atau `proyek.wa_khusus` jika proyek punya nomor sendiri — saat ini semua null → pakai utama)

## Tombol WA prefill

Pesan otomatis terisi nama proyek + link halaman:

```js
function waLink(proyek, waNomor = "6281211418507") {
  const pesan =
    `Halo Hizkia, saya tertarik dengan proyek *${proyek.nama}* ` +
    `(mulai ${proyek.harga_mulai_dari_display}). ` +
    `Boleh minta info lebih lanjut?`;
  return `https://wa.me/${waNomor}?text=${encodeURIComponent(pesan)}`;
}
```

## Penempatan (ala Apple: jelas tapi tidak norak)

1. **Floating button** WA di pojok kanan bawah (semua halaman).
2. **Tombol utama** di halaman detail proyek: "Tanya via WhatsApp".
3. Tombol di tiap kolom tabel `compare.md`.

## Lead Form (opsional, tangkap kontak)

Form ringkas: Nama, No. WA, Proyek diminati (auto-fill dari halaman), Pesan.
Karena ini situs statis (belum ada backend), 2 opsi pengiriman:

- **Opsi A (paling simpel):** submit → buka WA prefill berisi isian form. Tanpa server.
- **Opsi B:** kirim ke email `paramounthizkia@gmail.com` via layanan form
  (Formspree / Web3Forms / Google Form). Perlu setup akun.

Rekomendasi: **Opsi A** dulu (nol biaya, nol backend), upgrade ke B kalau butuh
simpan database lead.

## Data profil untuk footer/kontak

Dari `data/profil.json`: `nama`, `jabatan`, `email`, `wa_link`, `foto`.
Dari `data/social.json`: `instagram`, `tiktok` (link profil), `post_terbaru[]` (embed).
