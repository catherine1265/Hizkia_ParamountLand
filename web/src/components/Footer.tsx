import Link from "next/link";
import { profil, social, waLink } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="tentang" className="border-t border-[var(--color-line)] bg-[var(--color-bg-soft)]">
      <div className="mx-auto max-w-[1120px] px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{profil.nama}</h2>
            <p className="text-[var(--color-ink-soft)]">{profil.jabatan}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-ink-soft)]">
              {profil.pengalaman[0]}
            </p>
          </div>
          <div className="sm:text-right">
            <div className="flex flex-col gap-2 sm:items-end">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
                WhatsApp: {profil.wa}
              </a>
              <a href={`mailto:${profil.email}`} className="hover:text-[var(--color-accent)]">
                {profil.email}
              </a>
              <div className="mt-3 flex gap-4 sm:justify-end">
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
                    Instagram
                  </a>
                )}
                {social.tiktok && (
                  <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
                    TikTok
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-ink-soft)] sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {profil.nama}. Inhouse Agent Paramount Land.</span>
          <Link href="/proyek" className="hover:text-[var(--color-accent)]">Lihat semua proyek</Link>
        </div>
      </div>
    </footer>
  );
}
