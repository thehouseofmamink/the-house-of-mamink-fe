import { ArrowRight, ImageIcon } from "lucide-react";
import Link from "next/link";
import { Gallery } from "@/types/gallery";

const imageUrl = (image: string) =>
  image.startsWith("http") ? image : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`;

export default function HighlightGallery({ data }: { data: Gallery[] }) {
  const highlights = data.slice(0, 5);

  return (
    <section className="bg-[#fffdf8] py-20 md:py-28">
      <div className="page-shell">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Pilihan terbaru</span>
            <h2 className="mt-4 font-display text-4xl text-[#2f2118] md:text-5xl">Potongan cerita dalam gambar</h2>
          </div>
          <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8a6423] hover:text-[#5b3a27]">
            Lihat seluruh galeri <ArrowRight size={16} />
          </Link>
        </div>

        {highlights.length > 0 ? (
          <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[230px] md:grid-cols-4 md:gap-5">
            {highlights.map((item, index) => (
              <Link
                href={`/gallery/${item.id}`}
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl bg-[#eadfc9] ${index === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <img src={imageUrl(item.image)} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#25170f]/80 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-6">
                  <p className={`${index === 0 ? "font-display text-2xl md:text-3xl" : "text-sm font-semibold md:text-base"}`}>{item.title}</p>
                  {index === 0 && item.description && <p className="mt-2 hidden max-w-lg text-sm text-white/70 line-clamp-2 md:block">{item.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid min-h-72 place-items-center rounded-3xl border border-dashed border-[#c8aa6a] bg-[#f8f3e9] text-center">
            <div>
              <ImageIcon className="mx-auto text-[#b9892f]" size={34} strokeWidth={1.4} />
              <p className="mt-4 font-display text-2xl text-[#4a3325]">Galeri sedang disiapkan</p>
              <p className="mt-2 text-sm text-[#77675d]">Karya dan momen terbaru akan segera hadir di sini.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
