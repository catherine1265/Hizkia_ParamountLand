"use client";

import { useCompare } from "@/components/CompareProvider";

export default function CompareButton({ slug }: { slug: string }) {
  const { has, toggle, penuh } = useCompare();
  const aktif = has(slug);
  const nonaktif = !aktif && penuh;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!nonaktif) toggle(slug);
      }}
      disabled={nonaktif}
      className={
        "mt-3 w-full rounded-full border px-3 py-1.5 text-sm transition " +
        (aktif
          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
          : nonaktif
          ? "cursor-not-allowed border-[var(--color-line)] text-[var(--color-ink-soft)] opacity-50"
          : "border-[var(--color-line)] hover:bg-[var(--color-bg-soft)]")
      }
    >
      {aktif ? "Dibandingkan" : "Bandingkan"}
    </button>
  );
}
