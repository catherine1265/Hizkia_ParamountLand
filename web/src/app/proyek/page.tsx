import { semuaProyek } from "@/lib/data";
import ProyekFilter from "@/components/ProyekFilter";
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
        <div className="mt-10">
          <ProyekFilter proyek={semuaProyek} />
        </div>
      </section>
      <Footer />
    </>
  );
}
