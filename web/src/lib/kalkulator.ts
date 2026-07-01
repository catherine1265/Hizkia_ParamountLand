/**
 * Kalkulator Cash Bertahap (bukan KPR).
 * Rumus terverifikasi terhadap sheet resmi:
 *   cicilan = (1 - persenDP) * harga / jumlahTermin
 * Contoh: harga 14.466.400.000, DP 0%, 120 termin -> 120.553.333/bulan.
 */

export type HasilKalkulator = {
  harga: number;
  persenDP: number;
  jumlahTermin: number;
  bookingFee: number;
  dpAmount: number;
  cicilanPerBulan: number;
  totalBayar: number;
  displays: {
    harga: string;
    dpAmount: string;
    cicilanPerBulan: string;
    bookingFee: string;
    totalBayar: string;
  };
};

export const KALKULATOR_DEFAULT = {
  bookingFee: 50_000_000,
  jumlahTermin: 120,
  persenDP: 0,
};

export function rupiah(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

export function hitungCashBertahap(opt: {
  harga: number;
  persenDP?: number;
  jumlahTermin?: number;
  bookingFee?: number;
}): HasilKalkulator {
  const harga = Number(opt.harga) || 0;
  const persenDP = clamp(Number(opt.persenDP ?? KALKULATOR_DEFAULT.persenDP), 0, 1);
  const jumlahTermin = Math.max(
    1,
    Math.floor(Number(opt.jumlahTermin ?? KALKULATOR_DEFAULT.jumlahTermin))
  );
  const bookingFee = Number(opt.bookingFee ?? KALKULATOR_DEFAULT.bookingFee);

  const dpAmount = Math.round(persenDP * harga);
  const sisaSetelahDP = harga - dpAmount;
  const cicilanPerBulan = Math.round(sisaSetelahDP / jumlahTermin);
  const totalBayar = dpAmount + cicilanPerBulan * jumlahTermin;

  return {
    harga,
    persenDP,
    jumlahTermin,
    bookingFee,
    dpAmount,
    cicilanPerBulan,
    totalBayar,
    displays: {
      harga: rupiah(harga),
      dpAmount: rupiah(dpAmount),
      cicilanPerBulan: rupiah(cicilanPerBulan),
      bookingFee: rupiah(bookingFee),
      totalBayar: rupiah(totalBayar),
    },
  };
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}
