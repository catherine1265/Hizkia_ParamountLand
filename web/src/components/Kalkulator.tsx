"use client";

import { useMemo, useState } from "react";
import { hitungCashBertahap } from "@/lib/kalkulator";
import type { Proyek } from "@/lib/data";

const OPSI_DP = [0, 0.1, 0.2, 0.3];
const OPSI_TERMIN = [12, 24, 36, 60, 120];

export default function Kalkulator({
  proyek,
  waNomor,
}: {
  proyek: Proyek;
  waNomor: string;
}) {
  const tipeBerharga = proyek.tipe_unit.filter(
    (t) => typeof t.harga_rupiah === "number"
  );
  const [idxTipe, setIdxTipe] = useState(0);
  const [persenDP, setPersenDP] = useState(0);
  const [termin, setTermin] = useState(120);

  const tipe = tipeBerharga[idxTipe];
  const harga = tipe?.harga_rupiah ?? proyek.harga_mulai_dari ?? 0;

  const hasil = useMemo(
    () => hitungCashBertahap({ harga, persenDP, jumlahTermin: termin }),
    [harga, persenDP, termin]
  );

  const pesanWa = encodeURIComponent(
    `Halo Hizkia, saya mau tanya skema cash bertahap untuk *${proyek.nama}*` +
      (tipe ? ` tipe ${tipe.nama_tipe}` : "") +
      `. Estimasi: DP ${Math.round(persenDP * 100)}%, ${termin}x cicilan ` +
      `${hasil.displays.cicilanPerBulan}/bulan. Boleh info lebih lanjut?`
  );

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] p-6">
      <h3 className="text-xl font-semibold tracking-tight">Simulasi Cash Bertahap</h3>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
        Tanpa KPR bank. Cicilan bertahap langsung dari developer.
      </p>

      <div className="mt-6 grid gap-5">
        {/* Tipe unit */}
        <label className="block">
          <span className="text-sm font-medium">Tipe Unit</span>
          <select
            value={idxTipe}
            onChange={(e) => setIdxTipe(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-sm"
          >
            {tipeBerharga.map((t, i) => (
              <option key={i} value={i}>
                {t.nama_tipe} — {t.harga_display}
              </option>
            ))}
          </select>
        </label>

        {/* DP */}
        <div>
          <span className="text-sm font-medium">Uang Muka (DP)</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {OPSI_DP.map((dp) => (
              <button
                key={dp}
                onClick={() => setPersenDP(dp)}
                className={
                  "rounded-full px-4 py-1.5 text-sm transition " +
                  (persenDP === dp
                    ? "bg-[var(--color-accent)] text-white"
                    : "border border-[var(--color-line)] hover:bg-[var(--color-bg-soft)]")
                }
              >
                {Math.round(dp * 100)}%
              </button>
            ))}
          </div>
        </div>

        {/* Termin */}
        <div>
          <span className="text-sm font-medium">Jumlah Cicilan (bulan)</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {OPSI_TERMIN.map((t) => (
              <button
                key={t}
                onClick={() => setTermin(t)}
                className={
                  "rounded-full px-4 py-1.5 text-sm transition " +
                  (termin === t
                    ? "bg-[var(--color-accent)] text-white"
                    : "border border-[var(--color-line)] hover:bg-[var(--color-bg-soft)]")
                }
              >
                {t}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hasil */}
      <div className="mt-6 rounded-lg bg-[var(--color-bg-soft)] p-5">
        <div className="text-sm text-[var(--color-ink-soft)]">Estimasi cicilan per bulan</div>
        <div className="mt-1 text-3xl font-semibold tracking-tight">
          {hasil.displays.cicilanPerBulan}
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-[var(--color-ink-soft)]">Harga unit</dt>
          <dd className="text-right">{hasil.displays.harga}</dd>
          <dt className="text-[var(--color-ink-soft)]">Uang muka</dt>
          <dd className="text-right">{hasil.displays.dpAmount}</dd>
          <dt className="text-[var(--color-ink-soft)]">Booking fee</dt>
          <dd className="text-right">{hasil.displays.bookingFee}</dd>
        </dl>
      </div>

      <a
        href={`https://wa.me/${waNomor}?text=${pesanWa}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 py-3 text-center font-medium text-white transition hover:bg-[var(--color-accent-hover)]"
      >
        Konsultasi Skema Ini
      </a>

      <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
        Simulasi. Angka final mengikuti skema resmi Paramount Land.
      </p>
    </div>
  );
}
