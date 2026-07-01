# Fitur: Kalkulator Cash Bertahap

**Bukan KPR.** Paramount pakai skema cash bertahap developer. Logic ada di
`kalkulator-cash-bertahap.js` (sudah teruji terhadap sheet resmi).

## Input dari user

| Field | Default | Keterangan |
|-------|---------|-----------|
| Harga unit | dari tipe unit terpilih | auto dari `proyek.tipe_unit[].harga_rupiah` |
| Persen DP | 0% | dropdown 0% / 10% / 20% / 30% |
| Jumlah termin | 120 | cicilan rata (tiap tanggal 16) |
| Booking Fee | Rp 50.000.000 | biasanya tetap, bagian dari harga |

## Output

- **DP** (Rp) = `persenDP × harga`
- **Cicilan/bulan** = `(1 − persenDP) × harga / jumlahTermin`
- **Total bayar** ≈ harga (validasi)

## Verifikasi (dari gambar sheet)

Harga Rp 14.466.400.000, DP 0%, 120 termin
→ cicilan **Rp 120.553.333/bulan** ✅ (persis sama dengan sheet)

## Contoh pakai

```js
const { hitungCashBertahap } = require("./kalkulator-cash-bertahap.js");

const r = hitungCashBertahap({
  harga: 2500000000,
  persenDP: 0.2,      // 20%
  jumlahTermin: 60,
});
console.log(r.displays.dpAmount);        // "Rp 500.000.000"
console.log(r.displays.cicilanPerBulan); // "Rp 33.333.333"
```

## UI (ala Apple)

- Slider besar untuk termin & DP, angka hasil update real-time.
- Angka cicilan ditampilkan **besar & tebal** sebagai fokus utama.
- Disclaimer kecil: "Simulasi. Angka final mengikuti skema resmi Paramount Land."
- Tombol WA di bawah hasil: "Konsultasi skema ini" (prefill lihat `wa-cta.md`).

## Catatan akurasi

Selisih pembulatan ± beberapa puluh rupiah pada total (efek pembulatan cicilan
per bulan). Untuk display cukup; angka resmi tetap dari tim Paramount.
