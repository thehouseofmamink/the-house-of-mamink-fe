import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Gallery } from "@/types/gallery";

const imageUrl = (image: string) =>
  image.startsWith("http") ? image : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`;

async function getGalleryDetail(id: string): Promise<Gallery | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getOtherGallery(currentId: string): Promise<Gallery[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, { cache: "no-store" });
    if (!res.ok) return [];
    const data: Gallery[] = await res.json();
    return data.filter((item) => String(item.id) !== currentId).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [data, others] = await Promise.all([getGalleryDetail(id), getOtherGallery(id)]);

  if (!data) {
    return (
      <main className="page-shell grid min-h-[70vh] place-items-center pt-24 text-center">
        <div><p className="font-display text-4xl">Cerita tidak ditemukan</p><Link href="/gallery" className="mt-5 inline-flex text-sm font-semibold text-[#9a7025]">Kembali ke galeri</Link></div>
      </main>
    );
  }

  return (
    <main className="page-shell pb-10 pt-32 md:pt-36">
      <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8a6423] hover:text-[#5b3a27]"><ArrowLeft size={16} /> Kembali ke galeri</Link>

      <article className="mt-8 overflow-hidden rounded-[2rem] border border-[#ddcfb4] bg-[#fffdf8] shadow-[0_24px_70px_rgba(70,45,27,0.1)]">
        <img src={imageUrl(data.image)} alt={data.title} className="max-h-[70vh] w-full bg-[#e8dcc5] object-contain" />
        <div className="mx-auto max-w-3xl px-6 py-10 text-center md:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a67827]">Dari galeri Mamink</p>
          <h1 className="mt-4 font-display text-4xl text-[#2f2118] md:text-6xl">{data.title}</h1>
          {data.description && <p className="mt-6 whitespace-pre-line leading-8 text-[#65564c]">{data.description}</p>}
        </div>
      </article>

      {others.length > 0 && (
        <section className="py-20">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div><span className="eyebrow">Lanjut melihat</span><h2 className="mt-3 font-display text-3xl text-[#2f2118] md:text-4xl">Cerita lainnya</h2></div>
            <Link href="/gallery" className="text-sm font-semibold text-[#8a6423]">Semua galeri</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <Link key={item.id} href={`/gallery/${item.id}`} className="group overflow-hidden rounded-2xl bg-[#fffdf8] shadow-[0_12px_32px_rgba(70,45,27,0.07)]">
                <img src={imageUrl(item.image)} alt={item.title} className="h-52 w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="flex items-center justify-between gap-4 p-5"><p className="font-display text-xl text-[#3b281d]">{item.title}</p><ArrowUpRight className="text-[#b9892f]" size={17} /></div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
