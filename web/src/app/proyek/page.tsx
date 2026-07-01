import { semuaProyek } from "@/lib/data";
import CardProyek from "@/components/CardProyek";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Semua Proyek — Paramount Gading Serpong",
};

export default function ProyekIndex() {
  return (
    <>
      <section className="mx-auto max-w-[1120px] px-5 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Semua Proyek</h1>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          {semuaProyek.length} proyek di Paramount Gading Serpong.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {semuaProyek.map((p) => (
            <CardProyek key={p.slug} p={p} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
