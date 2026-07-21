"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { href: "/", label: "Beranda" },
  { href: "/activity", label: "Aktivitas" },
  { href: "/gallery", label: "Galeri" },
  { href: "/profile", label: "Profil" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d8bd7b]/20 bg-[#2b1d15]/95 text-[#fff9eb] shadow-[0_10px_40px_rgba(38,24,15,0.16)] backdrop-blur-xl">
      <nav className="page-shell flex h-20 items-center justify-between" aria-label="Navigasi utama">
        <Link href="/" className="group flex items-center gap-3" aria-label="The House of Mamink - Beranda">
          <span className="grid size-10 place-items-center rounded-full border border-[#d8bd7b]/65 bg-[#fff9eb]/5 font-display text-sm font-bold text-[#e4c882] transition group-hover:bg-[#e4c882] group-hover:text-[#2b1d15]">
            HM
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg text-[#fff9eb]">The House</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.28em] text-[#d8bd7b]">of Mamink</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm transition ${
                isActive(item.href)
                  ? "bg-[#e4c882] font-semibold text-[#2b1d15]"
                  : "text-[#f4ead6]/75 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/profile"
          className="hidden rounded-full border border-[#d8bd7b]/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#e4c882] transition hover:bg-[#e4c882] hover:text-[#2b1d15] md:block"
        >
          Kenal lebih dekat
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-full border border-[#d8bd7b]/35 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="border-t border-[#d8bd7b]/20 bg-[#2b1d15] px-4 pb-6 pt-3 md:hidden">
          <div className="page-shell flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm ${
                  isActive(item.href) ? "bg-[#e4c882] font-semibold text-[#2b1d15]" : "text-[#f4ead6]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
