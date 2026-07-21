import { ArrowDownRight, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero({ name }: { name?: string }) {
  return (
    <section className="brand-pattern relative overflow-hidden bg-[#f8f3e9] px-4 pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="absolute left-[6%] top-32 hidden h-48 w-px bg-gradient-to-b from-transparent via-[#c49a43]/50 to-transparent lg:block" />
      <div className="absolute right-[8%] top-40 hidden size-28 rounded-full border border-[#b9892f]/20 lg:block" />

      <div className="page-shell grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <span className="eyebrow">Selamat datang di ruang kami</span>
          <h1 className="mt-7 font-display text-[3.4rem] leading-[0.98] text-[#2f2118] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            Cerita sederhana,
            <span className="block italic text-[#a77927]">makna yang tinggal.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#77675d] md:text-lg">
            The House of Mamink adalah ruang personal {name ? `${name} ` : ""}untuk berbagi aktivitas, karya, dan momen yang layak dikenang.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/gallery" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#3b281d] px-6 py-3.5 text-sm font-semibold text-[#fff9eb] shadow-[0_12px_30px_rgba(59,40,29,0.2)] transition hover:-translate-y-0.5 hover:bg-[#5b3a27]">
              Jelajahi galeri <ArrowRight size={17} />
            </Link>
            <Link href="/profile" className="inline-flex items-center justify-center gap-3 rounded-full border border-[#b99a5e]/60 bg-white/50 px-6 py-3.5 text-sm font-semibold text-[#5b3a27] transition hover:border-[#9d7426] hover:bg-white">
              Tentang pemilik <ArrowDownRight size={17} />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rotate-3 rounded-[2.5rem] border border-[#b9892f]/25" />
          <div className="relative overflow-hidden rounded-[2rem] bg-[#3b281d] p-8 text-[#fff9eb] shadow-[0_35px_80px_rgba(54,35,24,0.24)] md:p-10">
            <Sparkles className="mb-16 text-[#e4c882]" size={28} strokeWidth={1.4} />
            <p className="font-display text-3xl leading-tight md:text-4xl">“Setiap perjalanan pantas memiliki tempat untuk diceritakan.”</p>
            <div className="mt-10 gold-line" />
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#d8bd7b]">Catatan personal</p>
                <p className="mt-2 text-sm text-[#f4ead6]/65">The House of Mamink</p>
              </div>
              <span className="font-display text-5xl text-[#e4c882]/25">HM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
