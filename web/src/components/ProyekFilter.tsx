"use client";

import { useMemo, useState } from "react";
import CardProyek from "@/components/CardProyek";
import type { Proyek } from "@/lib/data";
import {
  FILTER_KOSONG,
  adaFilterAktif,
  buildOpsi,
  terapkanFilter,
  type FilterState,
  type SortKey,
} from "@/lib/filter";

// Ambang harga (Rupiah) untuk dropdown "harga maksimal".
const AMBANG_HARGA: { label: string; nilai: number | null }[] = [
  { label: "Semua harga", nilai: null },
  { label: "≤ Rp 1 M", nilai: 1_000_000_000 },
  { label: "≤ Rp 2 M", nilai: 2_000_000_000 },
  { label: "≤ Rp 5 M", nilai: 5_000_000_000 },
  { label: "≤ Rp 10 M", nilai: 10_000_000_000 },
  { label: "≤ Rp 20 M", nilai: 20_000_000_000 },
];

const OPSI_SORT: { label: string; nilai: SortKey }[] = [
  { label: "Paling relevan", nilai: "featured" },
  { label: "Harga termurah", nilai: "harga-asc" },
  { label: "Harga termahal", nilai: "harga-desc" },
  { label: "Nama A–Z", nilai: "nama-asc" },
];

const KELAS_SELECT =
  "h-11 rounded-full border border-[var(--color-line)] bg-[var(--color-bg)] px-4 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent)]";

export default function ProyekFilter({ proyek }: { proyek: Proyek[] }) {
  const [f, setF] = useState<FilterState>(FILTER_KOSONG);
  const opsi = useMemo(() => buildOpsi(proyek), [proyek]);
  const hasil = useMemo(() => terapkanFilter(proyek, f), [proyek, f]);

  const set = <K extends keyof FilterState>(k: K, v: FilterState[K]) =>
    setF((prev) => ({ ...prev, [k]: v }));

  return (
    <>
      {/* Toolbar filter — sticky, minimalis */}
      <div className="sticky top-0 z-10 -mx-5 mb-8 border-b border-[var(--color-line)] bg-[var(--color-bg)]/80 px-5 py-4 backdrop-blur">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[220px] flex-1">
            <input
              type="search"
              value={f.q}
              onChange={(e) => set("q", e.target.value)}
              placeholder="Cari nama proyek, tipe unit…"
              className="h-11 w-full rounded-full border border-[var(--color-line)] bg-[var(--color-bg)] pl-11 pr-4 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent)]"
              aria-label="Cari proyek"
            />
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          {opsi.kategori.length > 1 && (
            <select
              value={f.kategori}
              onChange={(e) => set("kategori", e.target.value)}
              className={KELAS_SELECT}
              aria-label="Filter kategori"
            >
              <option value="">Semua kategori</option>
              {opsi.kategori.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          )}

          {opsi.status.length > 1 && (
            <select
              value={f.status}
              onChange={(e) => set("status", e.target.value)}
              className={KELAS_SELECT}
              aria-label="Filter status"
            >
              <option value="">Semua status</option>
              {opsi.status.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}

          <select
            value={f.kamarTidur ?? ""}
            onChange={(e) =>
              set("kamarTidur", e.target.value ? Number(e.target.value) : null)
            }
            className={KELAS_SELECT}
            aria-label="Filter kamar tidur"
          >
            <option value="">Semua kamar</option>
            {opsi.kamarTidur.map((n) => (
              <option key={n} value={n}>
                {n}+ kamar
              </option>
            ))}
          </select>

          <select
            value={f.hargaMax ?? ""}
            onChange={(e) =>
              set("hargaMax", e.target.value ? Number(e.target.value) : null)
            }
            className={KELAS_SELECT}
            aria-label="Filter harga maksimal"
          >
            {AMBANG_HARGA.map((a) => (
              <option key={a.label} value={a.nilai ?? ""}>
                {a.label}
              </option>
            ))}
          </select>

          <select
            value={f.sort}
            onChange={(e) => set("sort", e.target.value as SortKey)}
            className={KELAS_SELECT}
            aria-label="Urutkan"
          >
            {OPSI_SORT.map((o) => (
              <option key={o.nilai} value={o.nilai}>
                {o.label}
              </option>
            ))}
          </select>

          {adaFilterAktif(f) && (
            <button
              type="button"
              onClick={() => setF(FILTER_KOSONG)}
              className="h-11 rounded-full px-4 text-sm text-[var(--color-ink-soft)] transition hover:text-[var(--color-ink)]"
            >
              Reset
            </button>
          )}
        </div>

        <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
          Menampilkan {hasil.length} dari {proyek.length} proyek
        </p>
      </div>

      {/* Hasil */}
      {hasil.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((p) => (
            <CardProyek key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-[var(--color-line)] py-20 text-center">
          <p className="text-lg font-medium">Tidak ada proyek yang cocok</p>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            Coba longgarkan filter atau ubah kata kunci pencarian.
          </p>
          <button
            type="button"
            onClick={() => setF(FILTER_KOSONG)}
            className="mt-5 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink-invert)] transition hover:opacity-90"
          >
            Reset filter
          </button>
        </div>
      )}
    </>
  );
}
