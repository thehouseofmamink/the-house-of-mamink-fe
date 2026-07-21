"use client";

import { useState } from "react";
import GalleryGrid from "./GalleryGrid";
import GalleryFilter from "./GalleryFilter";
import { Gallery } from "@/types/gallery";

export default function GalleryClient({ data }: { data: Gallery[] }) {
  const [search, setSearch] = useState("");
  const normalized = search.toLowerCase().trim();
  const filtered = data.filter((item) =>
    `${item.title} ${item.description ?? ""}`.toLowerCase().includes(normalized)
  );

  return (
    <>
      <section className="brand-pattern px-4 pb-14 pt-36 md:pb-16 md:pt-44">
        <div className="page-shell grid gap-8 md:grid-cols-[1fr_320px] md:items-end">
          <div>
            <span className="eyebrow">Arsip visual</span>
            <h1 className="mt-4 font-display text-5xl text-[#2f2118] md:text-7xl">Galeri cerita</h1>
            <p className="mt-5 max-w-xl leading-7 text-[#77675d]">Kumpulan karya, suasana, dan momen yang dipilih untuk tetap dikenang.</p>
          </div>
          <GalleryFilter value={search} onSearch={setSearch} />
        </div>
      </section>
      <section className="page-shell py-14 md:py-20">
        <div className="mb-7 flex items-center justify-between border-b border-[#d9c9aa] pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8a7460]">{filtered.length} cerita ditemukan</p>
          {search && <button type="button" onClick={() => setSearch("")} className="text-xs font-semibold text-[#9a7025]">Hapus pencarian</button>}
        </div>
        <GalleryGrid data={filtered} />
      </section>
    </>
  );
}
