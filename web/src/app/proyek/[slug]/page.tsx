import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProyek,
  semuaProyek,
  social,
  waLink,
  type Proyek,
} from "@/lib/data";
import Galeri from "@/components/Galeri";
import Kalkulator from "@/components/Kalkulator";
import CardProyek from "@/components/CardProyek";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return semuaProyek.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProyek(slug);
  if (!p) return {};
  return {
    title: `${p.nama} — ${p.lokasi}`,
    description: p.deskripsi,
  };
}

export default async function DetailProyek({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProyek(slug);
  if (!p) notFound();

  const waNomor = (social.whatsapp.match(/\d+/) || ["6281211418507"])[0];
  const rekomendasi = p.rekomendasi
    .map((s) => getProyek(s))
    .filter((x): x is Proyek => Boolean(x));

  const keunggulan = pisahKeunggulan(p.keunggulan);

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1120px] px-5 pt-6 text-sm text-[var(--color-ink-soft)]">
        <Link href="/proyek" className="hover:text-[var(--color-accent)]">
          Proyek
        </Link>
        <span className="mx-2">/</span>
        <span>{p.nama}</span>
      </div>

      <section className="mx-auto max-w-[1120px] px-5 py-8">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Kiri: galeri + info */}
          <div className="min-w-0">
            <Galeri foto={p.foto} nama={p.nama} />

            <div className="mt-8">
              <div className="mb-2 flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
                <span>{p.kategori}</span>
                <span>/</span>
                <span>{p.status}</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {p.nama}
              </h1>
              <p className="mt-1 text-[var(--color-ink-soft)]">{p.alamat}</p>

              <p className="mt-6 leading-relaxed text-[var(--color-ink-soft)]">
                {p.deskripsi}
              </p>

              {p.arsitek && (
                <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
                  <span className="font-medium text-[var(--color-ink)]">
                    Konsultan:{" "}
                  </span>
                  {p.arsitek}
                </p>
              )}

              {p.highlight.length > 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {p.highlight.map((h, i) => (
                    <div
                      key={i}
                      className="rounded-[var(--radius-card)] border border-[var(--color-line)] p-4 text-sm"
                    >
                      {h}
                    </div>
                  ))}
                </div>
              )}

              {p.promo.length > 0 && (
                <div className="mt-6 rounded-[var(--radius-card)] bg-[var(--color-accent)]/5 p-4">
                  <h2 className="text-sm font-semibold text-[var(--color-accent)]">
                    Promo
                  </h2>
                  <ul className="mt-2 space-y-1 text-sm">
                    {p.promo.map((pr, i) => (
                      <li key={i}>{pr}</li>
                    ))}
                  </ul>
                </div>
              )}

              {keunggulan.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold">Keunggulan</h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--color-ink-soft)]">
                    {keunggulan.map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>
              )}

              {p.fasilitas_detail.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold">Fasilitas Kawasan</h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--color-ink-soft)]">
                    {p.fasilitas_detail.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {p.spesifikasi.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold">Spesifikasi</h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--color-ink-soft)]">
                    {p.spesifikasi.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(p.fasilitas_tags.length > 0 || p.poi_terdekat.length > 0) && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {[...p.fasilitas_tags, ...p.poi_terdekat].map((t, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-[var(--color-bg-soft)] px-3 py-1 text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Kanan: harga + CTA + kalkulator */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-line)] p-6">
              <div className="text-sm text-[var(--color-ink-soft)]">Harga mulai dari</div>
              <div className="mt-1 text-3xl font-semibold tracking-tight">
                {p.harga_mulai_dari_display ?? "-"}
              </div>
              {p.harga_tertinggi_display &&
                p.harga_tertinggi !== p.harga_mulai_dari && (
                  <div className="text-sm text-[var(--color-ink-soft)]">
                    hingga {p.harga_tertinggi_display}
                  </div>
                )}

              <a
                href={waLink(p)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-6 py-3 text-center font-medium text-white transition hover:bg-[var(--color-accent-hover)]"
              >
                Tanya via WhatsApp
              </a>

              {p.brosur && (
                <a
                  href={"/aset/" + p.brosur}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block rounded-[var(--radius-pill)] border border-[var(--color-line)] px-6 py-3 text-center font-medium transition hover:bg-[var(--color-bg-soft)]"
                >
                  Download Brosur
                </a>
              )}
            </div>

            <div className="mt-6">
              <Kalkulator proyek={p} waNomor={waNomor} />
            </div>
          </aside>
        </div>
      </section>

      {/* Tabel tipe unit */}
      <section className="mx-auto max-w-[1120px] px-5 py-10">
        <h2 className="text-2xl font-semibold tracking-tight">Tipe Unit</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line)] text-left text-[var(--color-ink-soft)]">
                <th className="py-3 pr-4 font-medium">Tipe</th>
                <th className="py-3 pr-4 font-medium">LT (m²)</th>
                <th className="py-3 pr-4 font-medium">LB (m²)</th>
                <th className="py-3 pr-4 font-medium">KT</th>
                <th className="py-3 pr-4 font-medium">KM</th>
                <th className="py-3 pr-4 font-medium">Lantai</th>
                <th className="py-3 pr-4 font-medium">Harga</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {p.tipe_unit.map((t, i) => (
                <tr key={i} className="border-b border-[var(--color-line)]/60">
                  <td className="py-3 pr-4 font-medium">{t.nama_tipe}</td>
                  <td className="py-3 pr-4">{t.luas_tanah_m2 ?? "-"}</td>
                  <td className="py-3 pr-4">{t.luas_bangunan_m2 ?? "-"}</td>
                  <td className="py-3 pr-4">{t.kamar_tidur ?? "-"}</td>
                  <td className="py-3 pr-4">{t.kamar_mandi ?? "-"}</td>
                  <td className="py-3 pr-4">{t.jumlah_lantai ?? "-"}</td>
                  <td className="py-3 pr-4">{t.harga_display ?? "-"}</td>
                  <td className="py-3">
                    <span
                      className={
                        "rounded-full px-2 py-0.5 text-xs " +
                        (t.status_unit === "Tersedia"
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-200 text-neutral-600")
                      }
                    >
                      {t.status_unit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rekomendasi */}
      {rekomendasi.length > 0 && (
        <section className="border-t border-[var(--color-line)] bg-[var(--color-bg-soft)]">
          <div className="mx-auto max-w-[1120px] px-5 py-16">
            <h2 className="text-2xl font-semibold tracking-tight">
              Rekomendasi Lainnya
            </h2>
            <p className="mt-1 text-[var(--color-ink-soft)]">
              Proyek {p.kategori.toLowerCase()} dengan kisaran harga serupa.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rekomendasi.slice(0, 3).map((r) => (
                <CardProyek key={r.slug} p={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

function pisahKeunggulan(teks: string): string[] {
  if (!teks) return [];
  // format "1. xxx 2. yyy 3. zzz"
  return teks
    .split(/\s*\d+\.\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}
