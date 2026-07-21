import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Gallery } from "@/types/gallery";

const imageUrl = (image: string) =>
  image.startsWith("http") ? image : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`;

export default function GalleryCard({ item, featured = false }: { item: Gallery; featured?: boolean }) {
  return (
    <Link href={`/gallery/${item.id}`} className={`group block ${featured ? "sm:col-span-2" : ""}`}>
      <article className="overflow-hidden rounded-2xl border border-[#ddcfb4] bg-[#fffdf8] shadow-[0_12px_32px_rgba(70,45,27,0.06)]">
        <div className={`overflow-hidden bg-[#e8dcc5] ${featured ? "h-72 md:h-[28rem]" : "h-64"}`}>
          <img src={imageUrl(item.image)} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="flex items-start justify-between gap-4 p-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a67827]">Cerita visual</p>
            <h2 className={`mt-2 font-display text-[#3b281d] ${featured ? "text-3xl" : "text-2xl"}`}>{item.title}</h2>
            {item.description && <p className="mt-2 text-sm leading-6 text-[#77675d] line-clamp-2">{item.description}</p>}
          </div>
          <ArrowUpRight className="mt-1 shrink-0 text-[#b9892f] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} />
        </div>
      </article>
    </Link>
  );
}
