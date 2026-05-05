import Link from "next/link";

async function getGalleryDetail(id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}`, {
        cache: "no-store",
        });

        if (!res.ok) return null;

        return res.json();
    } catch {
        return null;
    }
}

async function getOtherGallery(currentId: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.filter((item: any) => String(item.id) !== currentId).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const data = await getGalleryDetail(id);

    if (!data) {
        return <div className="p-10">Data not found</div>;
    }

    const others = await getOtherGallery(id);

    return (
      <div className="px-6 py-10 max-w-5xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/gallery"
            className="inline-block text-sm text-blue-600 hover:underline"
          >
            ← Back to Gallery
          </Link>
        </div>

        {/* Current Gallery Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${data.image}`}
            alt={data.title}
            className="rounded-2xl w-full max-w-3xl mx-auto shadow"
          />

          <div className="mt-8 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="mt-4 text-gray-600">{data.description}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-gray-200"></div>

        {/* Other Gallery */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
            Other Gallery
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {others.map((item: any) => (
              <Link
                key={item.id}
                href={`/gallery/${item.id}`}
                className="rounded-xl overflow-hidden shadow hover:scale-105 transition block"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}`}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-medium">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
}