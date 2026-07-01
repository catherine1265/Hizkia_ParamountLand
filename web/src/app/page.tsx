import Image from "next/image";
import Link from "next/link";
import {
  aset,
  profil,
  proyekByKategori,
  proyekFeatured,
  semuaProyek,
  waLink,
} from "@/lib/data";
import CardProyek from "@/components/CardProyek";
import Footer from "@/components/Footer";

export default function Home() {
  const featured = proyekFeatured();
  const hero = featured[0] ?? semuaProyek[0];
  const residensial = proyekByKategori("Residensial").slice(0, 6);
  const komersial = proyekByKategori("Komersial").slice(0, 6);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden">
        <Image
          src={aset(hero.foto.cover)}
          alt={hero.nama}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* overlay gelap bergradasi untuk keterbacaan */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
        <div className="reveal relative z-10 mx-auto max-w-3xl px-5 text-center text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-white/90">
            Paramount Gading Serpong
          </p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            Temukan hunian
            <br className="hidden sm:block" /> impian Anda.
          </h1>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/proyek"
              className="rounded-[var(--radius-pill)] bg-white px-7 py-3.5 font-medium text-[var(--color-ink)] shadow-lg transition hover:scale-[1.03] hover:bg-white/95"
            >
              Jelajahi Proyek
            </Link>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[var(--radius-pill)] border border-white/70 bg-white/5 px-7 py-3.5 font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Konsultasi Gratis
            </a>
          </div>
        </div>
      </section>

      {/* ---------- RESIDENSIAL ---------- */}
      <SectionKategori
        judul="Residensial"
        subjudul="Hunian untuk keluarga Anda di Paramount Gading Serpong."
        proyek={residensial}
        hrefSemua="/proyek?kategori=Residensial"
      />

      {/* ---------- KOMERSIAL ---------- */}
      <SectionKategori
        judul="Komersial"
        subjudul="Ruko, kantor, dan ruang usaha strategis."
        proyek={komersial}
        hrefSemua="/proyek?kategori=Komersial"
        soft
      />

      {/* ---------- KALKULATOR TEASER ---------- */}
      <section id="kalkulator" className="border-t border-[var(--color-line)]">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-6 px-5 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Simulasi Cash Bertahap
          </h2>
          <p className="max-w-xl text-[var(--color-ink-soft)]">
            Hitung estimasi cicilan bulanan tanpa KPR bank. Fleksibel dengan skema
            pembayaran bertahap langsung dari developer.
          </p>
          <Link
            href="/proyek"
            className="rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 py-3 font-medium text-white transition hover:bg-[var(--color-accent-hover)]"
          >
            Coba Simulasi
          </Link>
        </div>
      </section>

      {/* ---------- TENTANG ---------- */}
      <section className="mx-auto max-w-[1120px] px-5 py-20">
        <div className="grid items-center gap-10 sm:grid-cols-[280px_1fr]">
          <div className="relative mx-auto aspect-[3/4] w-56 overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-bg-soft)] shadow-[var(--shadow-soft)]">
            <Image
              src={aset(profil.foto)}
              alt={profil.nama}
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">{profil.nama}</h2>
            <p className="mt-1 text-[var(--color-ink-soft)]">{profil.jabatan}</p>
            <div className="mt-5 space-y-3 leading-relaxed text-[var(--color-ink-soft)]">
              {profil.pengalaman.map((kal, i) => (
                <p key={i}>{kal}</p>
              ))}
            </div>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 py-3 font-medium text-white transition hover:bg-[var(--color-accent-hover)]"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function SectionKategori({
  judul,
  subjudul,
  proyek,
  hrefSemua,
  soft = false,
}: {
  judul: string;
  subjudul: string;
  proyek: import("@/lib/data").Proyek[];
  hrefSemua: string;
  soft?: boolean;
}) {
  return (
    <section className={soft ? "bg-[var(--color-bg-soft)]" : ""}>
      <div className="mx-auto max-w-[1120px] px-5 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">{judul}</h2>
            <p className="mt-1 text-[var(--color-ink-soft)]">{subjudul}</p>
          </div>
          <Link
            href={hrefSemua}
            className="hidden text-[var(--color-accent)] hover:underline sm:block"
          >
            Lihat semua
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proyek.map((p) => (
            <CardProyek key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
