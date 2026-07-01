import BandingkanClient from "@/components/BandingkanClient";
import Footer from "@/components/Footer";

export const metadata = { title: "Bandingkan Proyek" };

export default function BandingkanPage() {
  return (
    <>
      <section className="mx-auto max-w-[1120px] px-5 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Bandingkan Proyek</h1>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          Perbandingan berdampingan hingga 3 proyek.
        </p>
        <BandingkanClient />
      </section>
      <Footer />
    </>
  );
}
