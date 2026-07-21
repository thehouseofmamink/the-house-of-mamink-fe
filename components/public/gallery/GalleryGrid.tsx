import { Gallery } from "@/types/gallery";
import GalleryCard from "./GalleryCard";

export default function GalleryGrid({ data }: { data: Gallery[] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[#c8aa6a] bg-[#fffdf8] px-6 py-20 text-center">
        <p className="font-display text-3xl text-[#4a3325]">Belum ada galeri yang cocok</p>
        <p className="mt-2 text-sm text-[#77675d]">Coba gunakan kata pencarian yang berbeda.</p>
      </div>
    );
  }

  return <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">{data.map((item, index) => <GalleryCard key={item.id} item={item} featured={index === 0} />)}</div>;
}
