import Image from "next/image";
import Link from "next/link";
import { aset, type Proyek } from "@/lib/data";
import CompareButton from "@/components/CompareButton";

export default function CardProyek({ p }: { p: Proyek }) {
  return (
    <div className="group overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-soft)] transition-all duration-500 ease-[var(--ease-apple)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link href={`/proyek/${p.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-soft)]">
          <Image
            src={aset(p.foto.cover)}
            alt={p.nama}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-apple)] group-hover:scale-105"
          />
          {p.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              Unggulan
            </span>
          )}
        </div>

        <div className="px-5 pt-5">
          <div className="mb-1 flex items-center gap-2 text-xs text-[var(--color-ink-soft)]">
            <span>{p.kategori}</span>
            <span>·</span>
            <span>{p.status}</span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{p.nama}</h3>
          <p className="text-sm text-[var(--color-ink-soft)]">{p.lokasi}</p>

          <p className="mt-3 font-semibold">
            Mulai {p.harga_mulai_dari_display ?? "-"}
          </p>

          <div className="mt-2 flex gap-4 text-sm text-[var(--color-ink-soft)]">
            {p.card.kamar_tidur && <span>{p.card.kamar_tidur} Kamar Tidur</span>}
            {p.card.kamar_mandi && <span>{p.card.kamar_mandi} Kamar Mandi</span>}
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <CompareButton slug={p.slug} />
      </div>
    </div>
  );
}
