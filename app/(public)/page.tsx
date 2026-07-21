import Hero from "@/components/public/home/Hero";
import HighlightGallery from "@/components/public/home/HighlightGallery";
import CTA from "@/components/public/home/CTA";
import { Activity } from "@/types/activity";
import { Gallery } from "@/types/gallery";
import { Profile } from "@/types/profile";
import { ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";

async function getData<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, { cache: "no-store" });
    if (!res.ok) return fallback;
    return res.json();
  } catch {
    return fallback;
  }
}

export default async function Home() {
  const [gallery, activities, profile] = await Promise.all([
    getData<Gallery[]>("/gallery", []),
    getData<Activity[]>("/activities", []),
    getData<Profile | null>("/profile", null),
  ]);

  return (
    <>
      <Hero name={profile?.name} />

      <section className="page-shell py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <span className="eyebrow">Jurnal perjalanan</span>
            <h2 className="mt-4 font-display text-4xl leading-tight text-[#2f2118] md:text-5xl">Kabar dan aktivitas terbaru</h2>
            <p className="mt-5 leading-7 text-[#77675d]">Catatan tentang apa yang sedang dikerjakan, dipelajari, dan dibagikan dari waktu ke waktu.</p>
            <Link href="/activity" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8a6423]">Baca semua aktivitas <ArrowRight size={16} /></Link>
          </div>

          <div className="divide-y divide-[#d9c9aa] border-y border-[#d9c9aa]">
            {activities.slice(0, 3).map((item) => (
              <Link key={item.id} href="/activity" className="group grid gap-3 py-6 sm:grid-cols-[150px_1fr_auto] sm:items-center">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#9a846f]"><CalendarDays size={14} />{new Date(item.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</p>
                <div>
                  <h3 className="font-display text-2xl text-[#3b281d] transition group-hover:text-[#a67827]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#77675d] line-clamp-1">{item.description}</p>
                </div>
                <ArrowRight className="hidden text-[#b9892f] transition group-hover:translate-x-1 sm:block" size={18} />
              </Link>
            ))}
            {activities.length === 0 && <p className="py-12 text-sm text-[#77675d]">Belum ada aktivitas yang diterbitkan.</p>}
          </div>
        </div>
      </section>

      <HighlightGallery data={gallery} />
      <CTA phone={profile?.phone} />
      <Analytics />
    </>
  );
}
