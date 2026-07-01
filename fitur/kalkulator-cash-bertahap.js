/**
 * FITUR: Kalkulator Cash Bertahap (Paramount Land)
 * ------------------------------------------------
 * Bukan KPR. Skema pembayaran developer: DP (opsional) + cicilan rata per bulan.
 *
 * Diverifikasi dari sheet resmi:
 *   Harga 14.466.400.000, DP 0%, termin 120  ->  cicilan 120.553.333 x 120 = harga (persis)
 *
 * Rumus (referensi sel sheet -> arti):
 *   G25 = persen DP           (0 s/d 1, mis. 0.1 = 10%)
 *   F28 = harga
 *   F32 = booking fee
 *   H26 = jumlah termin cicilan rata (mis. 120)
 *   H25 = jumlah termin tahap-1 (untuk pelunasan DP), 0 jika DP dibayar sekaligus
 *
 *   Installment 1   = IF(DP=0 AND H25=0, F38, (Harga*DP - BookingFee)/H25)
 *   Installment 2-N = (1 - DP) * Harga / H26
 *
 * Untuk web, disederhanakan ke bentuk yang mudah dipakai user:
 *   - user pilih: harga, persenDP, jumlahTermin, bookingFee
 *   - hasil: dpAmount, cicilanPerBulan, totalCicilan, ringkasan jadwal
 */

const DEFAULT = {
  bookingFee: 50000000, // Rp 50 juta (default dari sheet)
  jumlahTermin: 120,    // default 120x (bisa diubah user)
  persenDP: 0,          // 0% (cash bertahap murni)
};

/**
 * Hitung skema cash bertahap.
 * @param {Object} opt
 * @param {number} opt.harga          Harga unit (angka murni rupiah)
 * @param {number} [opt.persenDP=0]   Persen DP dalam desimal (0.2 = 20%)
 * @param {number} [opt.jumlahTermin=120] Jumlah cicilan rata
 * @param {number} [opt.bookingFee=50000000] Booking fee (bagian dari harga)
 * @param {number} [opt.terminDP=1]   Jumlah termin untuk melunasi DP (jika DP > 0)
 * @returns {Object} rincian pembayaran
 */
function hitungCashBertahap(opt) {
  const harga = num(opt.harga);
  const persenDP = clamp(num(opt.persenDP ?? DEFAULT.persenDP), 0, 1);
  const jumlahTermin = Math.max(1, Math.floor(num(opt.jumlahTermin ?? DEFAULT.jumlahTermin)));
  const bookingFee = num(opt.bookingFee ?? DEFAULT.bookingFee);
  const terminDP = Math.max(1, Math.floor(num(opt.terminDP ?? 1)));

  if (!harga || harga <= 0) {
    throw new Error("Harga tidak valid");
  }

  const dpAmount = Math.round(persenDP * harga);
  const sisaSetelahDP = harga - dpAmount; // (1 - DP) * harga
  const cicilanPerBulan = Math.round(sisaSetelahDP / jumlahTermin);

  // Cicilan DP (jika DP dibayar bertahap sebelum cicilan pokok)
  const cicilanDP = persenDP > 0 ? Math.round((dpAmount - bookingFee) / terminDP) : 0;

  const totalCicilanPokok = cicilanPerBulan * jumlahTermin;

  return {
    input: { harga, persenDP, jumlahTermin, bookingFee, terminDP },
    bookingFee,
    dpAmount,
    dpPersen: persenDP,
    cicilanDP,                 // per termin DP (0 jika DP 0%)
    cicilanPerBulan,           // cicilan rata pokok
    jumlahTermin,
    totalCicilanPokok,
    // total keseluruhan (untuk validasi ~ harga)
    totalBayar: dpAmount + totalCicilanPokok,
    displays: {
      harga: rupiah(harga),
      dpAmount: rupiah(dpAmount),
      cicilanPerBulan: rupiah(cicilanPerBulan),
      bookingFee: rupiah(bookingFee),
      totalBayar: rupiah(dpAmount + totalCicilanPokok),
    },
  };
}

// ---------- util ----------
function num(v) {
  if (typeof v === "number") return v;
  return Number(String(v ?? "").replace(/[^\d.-]/g, "")) || 0;
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function rupiah(n) {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

// ---------- export (dukung web & node) ----------
if (typeof module !== "undefined" && module.exports) {
  module.exports = { hitungCashBertahap, DEFAULT, rupiah };
}
