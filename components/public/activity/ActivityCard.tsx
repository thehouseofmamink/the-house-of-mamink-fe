import { Activity } from "@/types/activity";
import { ArrowUpRight, CalendarDays } from "lucide-react";

const imageUrl = (image: string) =>
  image.startsWith("http") ? image : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`;

export default function ActivityCard({ item, onClick }: { item: Activity; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full overflow-hidden rounded-2xl border border-[#ddcfb4] bg-[#fffdf8] text-left shadow-[0_15px_40px_rgba(70,45,27,0.07)] transition hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(70,45,27,0.12)]"
      aria-label={`Baca aktivitas ${item.title}`}
    >
      <div className="relative h-52 overflow-hidden bg-[#e8dcc5]">
        <img src={imageUrl(item.image)} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#2f2118]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#f8f0df] backdrop-blur">
          <CalendarDays size={12} /> {new Date(item.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl leading-tight text-[#3b281d]">{item.title}</h3>
          <ArrowUpRight className="mt-1 shrink-0 text-[#b9892f] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} />
        </div>
        <p className="mt-3 text-sm leading-6 text-[#77675d] line-clamp-3">{item.description}</p>
      </div>
    </button>
  );
}
