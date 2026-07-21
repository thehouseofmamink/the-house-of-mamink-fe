import { ArrowUpRight, MessageCircle } from "lucide-react";

export default function CTA({ phone }: { phone?: string }) {
  const normalizedPhone = phone?.replace(/\D/g, "") || "6285169757490";

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="page-shell relative overflow-hidden rounded-[2rem] bg-[#a67827] px-6 py-14 text-[#fffaf0] shadow-[0_24px_60px_rgba(91,58,39,0.16)] md:px-14 md:py-16">
        <div className="absolute -right-14 -top-20 size-64 rounded-full border-[45px] border-white/5" />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2f2118]/65">Mari terhubung</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Punya cerita atau ingin berbincang?</h2>
          </div>
          <a href={`https://wa.me/${normalizedPhone}`} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#2f2118] px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#4a3325]">
            <MessageCircle size={18} /> Hubungi saya <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
