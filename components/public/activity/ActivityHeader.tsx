import { BookOpen } from "lucide-react";

export default function ActivityHeader() {
  return (
    <section className="brand-pattern px-4 pb-16 pt-36 md:pb-20 md:pt-44">
      <div className="page-shell text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full border border-[#b9892f]/35 bg-white/40 text-[#9a7025]"><BookOpen size={20} /></span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#9a7025]">Jurnal Mamink</p>
        <h1 className="mt-4 font-display text-5xl text-[#2f2118] md:text-7xl">Aktivitas & cerita</h1>
        <p className="mx-auto mt-5 max-w-xl leading-7 text-[#77675d]">Mengikuti perjalanan melalui kabar, kegiatan, dan momen kecil yang membentuk cerita kami.</p>
      </div>
    </section>
  );
}
