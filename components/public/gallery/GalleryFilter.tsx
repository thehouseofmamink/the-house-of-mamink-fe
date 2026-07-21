"use client";

import { Search } from "lucide-react";

export default function GalleryFilter({ value, onSearch }: { value: string; onSearch: (value: string) => void }) {
  return (
    <label className="relative block">
      <span className="sr-only">Cari galeri</span>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a38d78]" size={17} />
      <input
        type="search"
        placeholder="Cari judul atau cerita..."
        value={value}
        onChange={(event) => onSearch(event.target.value)}
        className="w-full rounded-full border border-[#d8c7a7] bg-[#fffdf8] py-3 pl-11 pr-5 text-sm text-[#3b281d] outline-none transition placeholder:text-[#a38d78] focus:border-[#b9892f] focus:ring-4 focus:ring-[#b9892f]/10"
      />
    </label>
  );
}
