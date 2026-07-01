import Image from "next/image";
import Link from "next/link";
import { aset } from "@/lib/data";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)]/60 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={aset("logo/logo-paramount.png")}
            alt="Paramount Land"
            width={160}
            height={40}
            style={{ width: "auto", height: "2.25rem" }}
            className="object-contain"
          />
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/proyek" className="hover:text-[var(--color-accent)]">
            Proyek
          </Link>
          <Link href="/#kalkulator" className="hidden hover:text-[var(--color-accent)] sm:inline">
            Simulasi
          </Link>
          <Link href="/#tentang" className="hidden hover:text-[var(--color-accent)] sm:inline">
            Tentang
          </Link>
        </div>
      </nav>
    </header>
  );
}
