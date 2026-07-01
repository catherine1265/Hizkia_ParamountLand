"use client";

import Image from "next/image";
import { useState } from "react";
import { aset } from "@/lib/data";

export default function Galeri({
  foto,
  nama,
}: {
  foto: {
    cover: string | null;
    galeri: string[];
    denah: string[];
    brosur: string[];
  };
  nama: string;
}) {
  const semua = [
    ...(foto.cover ? [foto.cover] : []),
    ...foto.galeri,
    ...foto.brosur,
    ...foto.denah,
  ];
  const [aktif, setAktif] = useState(0);
  const utama = semua[aktif] ?? foto.cover;

  return (
    <div>
      <div className="relative h-[300px] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-bg-soft)] sm:h-[420px] lg:h-[480px]">
        {utama && (
          <Image
            src={aset(utama)}
            alt={nama}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
          />
        )}
      </div>

      {semua.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {semua.map((f, i) => (
            <button
              key={i}
              onClick={() => setAktif(i)}
              className={
                "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition " +
                (i === aktif
                  ? "border-[var(--color-accent)]"
                  : "border-transparent opacity-70 hover:opacity-100")
              }
            >
              <Image
                src={aset(f)}
                alt={`${nama} ${i + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
