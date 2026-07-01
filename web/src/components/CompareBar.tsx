"use client";

import Link from "next/link";
import { useCompare } from "@/components/CompareProvider";

export default function CompareBar() {
  const { list, clear } = useCompare();
  if (list.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-4 rounded-[var(--radius-pill)] bg-black/90 px-5 py-3 text-white shadow-[var(--shadow-lift)] backdrop-blur">
        <span className="text-sm">{list.length} proyek dipilih</span>
        <Link
          href="/bandingkan"
          className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Bandingkan
        </Link>
        <button
          onClick={clear}
          className="text-sm text-white/70 transition hover:text-white"
          aria-label="Kosongkan perbandingan"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
