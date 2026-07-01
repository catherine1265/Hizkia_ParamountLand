"use client";

import Image from "next/image";
import Link from "next/link";
import { useCompare } from "@/components/CompareProvider";
import { aset, getProyek, waLink, type Proyek } from "@/lib/data";

type Baris = {
  label: string;
  get: (p: Proyek) => string;
};

const BARIS: Baris[] = [
  { label: "Kategori", get: (p) => p.kategori },
  { label: "Lokasi", get: (p) => p.lokasi },
  { label: "Status", get: (p) => p.status },
  { label: "Harga mulai", get: (p) => p.harga_mulai_dari_display ?? "-" },
  { label: "Harga tertinggi", get: (p) => p.harga_tertinggi_display ?? "-" },
  { label: "Kamar tidur", get: (p) => p.card.kamar_tidur ?? "-" },
  { label: "Kamar mandi", get: (p) => p.card.kamar_mandi ?? "-" },
  { label: "Luas tanah (m²)", get: (p) => p.card.luas_tanah_m2 ?? "-" },
  { label: "Luas bangunan (m²)", get: (p) => p.card.luas_bangunan_m2 ?? "-" },
  { label: "Jumlah tipe", get: (p) => String(p.jumlah_tipe) },
  {
    label: "Fasilitas",
    get: (p) => p.fasilitas_tags.join(", ") || "-",
  },
];

export default function BandingkanClient() {
  const { list, remove } = useCompare();
  const proyek = list
    .map((s) => getProyek(s))
    .filter((x): x is Proyek => Boolean(x));

  if (proyek.length === 0) {
    return (
      <div className="mt-12 rounded-[var(--radius-card)] border border-dashed border-[var(--color-line)] p-12 text-center">
        <p className="text-[var(--color-ink-soft)]">
          Belum ada proyek untuk dibandingkan.
        </p>
        <Link
          href="/proyek"
          className="mt-4 inline-block rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 py-3 font-medium text-white transition hover:bg-[var(--color-accent-hover)]"
        >
          Pilih Proyek
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="w-40" />
            {proyek.map((p) => (
              <th key={p.slug} className="p-3 text-left align-top">
                <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-lg bg-[var(--color-bg-soft)]">
                  <Image
                    src={aset(p.foto.cover)}
                    alt={p.nama}
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
                <Link
                  href={`/proyek/${p.slug}`}
                  className="font-semibold hover:text-[var(--color-accent)]"
                >
                  {p.nama}
                </Link>
                <button
                  onClick={() => remove(p.slug)}
                  className="mt-1 block text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-accent)]"
                >
                  Hapus
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BARIS.map((b) => (
            <tr key={b.label} className="border-t border-[var(--color-line)]/60">
              <td className="py-3 pr-4 font-medium text-[var(--color-ink-soft)]">
                {b.label}
              </td>
              {proyek.map((p) => (
                <td key={p.slug} className="py-3 pr-4 align-top">
                  {b.get(p)}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-[var(--color-line)]/60">
            <td className="py-3 pr-4 font-medium text-[var(--color-ink-soft)]">
              Kontak
            </td>
            {proyek.map((p) => (
              <td key={p.slug} className="py-3 pr-4">
                <a
                  href={waLink(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-[var(--color-accent)] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[var(--color-accent-hover)]"
                >
                  WhatsApp
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
