import type { Proyek } from "@/lib/data";

// ---------- Tipe filter ----------
export type SortKey = "featured" | "harga-asc" | "harga-desc" | "nama-asc";

export type FilterState = {
  q: string;
  kategori: string; // "" = semua
  status: string; // "" = semua
  kamarTidur: number | null; // minimal N kamar; null = semua
  hargaMax: number | null; // batas atas; null = tanpa batas
  sort: SortKey;
};

export const FILTER_KOSONG: FilterState = {
  q: "",
  kategori: "",
  status: "",
  kamarTidur: null,
  hargaMax: null,
  sort: "featured",
};

// ---------- Opsi filter (dibangun dari data yang benar-benar ada) ----------
export type OpsiFilter = {
  kategori: string[];
  status: string[];
  kamarTidur: number[]; // nilai minimal yang masuk akal
  hargaMin: number;
  hargaMax: number;
};

/** Ambil angka kamar tidur terbesar dari string seperti "3-4" atau "5". */
export function maxKamarTidur(card: Proyek["card"]): number | null {
  if (!card?.kamar_tidur) return null;
  const angka = card.kamar_tidur.match(/\d+/g)?.map(Number) ?? [];
  return angka.length ? Math.max(...angka) : null;
}

export function buildOpsi(proyek: Proyek[]): OpsiFilter {
  const uniq = (arr: (string | null | undefined)[]) =>
    [...new Set(arr.filter((x): x is string => Boolean(x)))].sort();

  const harga = proyek
    .map((p) => p.harga_mulai_dari)
    .filter((h): h is number => typeof h === "number");

  return {
    kategori: uniq(proyek.map((p) => p.kategori)),
    status: uniq(proyek.map((p) => p.status)),
    kamarTidur: [2, 3, 4, 5],
    hargaMin: harga.length ? Math.min(...harga) : 0,
    hargaMax: harga.length ? Math.max(...harga) : 0,
  };
}

// ---------- Filter + sort ----------
function cocokPencarian(p: Proyek, q: string): boolean {
  if (!q) return true;
  const kata = q.toLowerCase().trim();
  const hay = [
    p.nama,
    p.deskripsi,
    p.keunggulan,
    p.lokasi,
    ...p.tipe_unit.map((t) => t.nama_tipe),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(kata);
}

export function terapkanFilter(proyek: Proyek[], f: FilterState): Proyek[] {
  const hasil = proyek.filter((p) => {
    if (f.kategori && p.kategori !== f.kategori) return false;
    if (f.status && p.status !== f.status) return false;
    if (f.hargaMax != null && (p.harga_mulai_dari ?? 0) > f.hargaMax) return false;
    if (f.kamarTidur != null) {
      const kt = maxKamarTidur(p.card);
      if (kt == null || kt < f.kamarTidur) return false;
    }
    if (!cocokPencarian(p, f.q)) return false;
    return true;
  });

  const urut = [...hasil];
  switch (f.sort) {
    case "harga-asc":
      urut.sort(
        (a, b) => (a.harga_mulai_dari ?? Infinity) - (b.harga_mulai_dari ?? Infinity),
      );
      break;
    case "harga-desc":
      urut.sort((a, b) => (b.harga_mulai_dari ?? 0) - (a.harga_mulai_dari ?? 0));
      break;
    case "nama-asc":
      urut.sort((a, b) => a.nama.localeCompare(b.nama, "id"));
      break;
    case "featured":
    default:
      // biarkan urutan asli JSON (featured lalu urutan_tampil)
      break;
  }
  return urut;
}

/** Apakah ada filter aktif (untuk menampilkan tombol reset). */
export function adaFilterAktif(f: FilterState): boolean {
  return (
    f.q !== "" ||
    f.kategori !== "" ||
    f.status !== "" ||
    f.kamarTidur != null ||
    f.hargaMax != null
  );
}
