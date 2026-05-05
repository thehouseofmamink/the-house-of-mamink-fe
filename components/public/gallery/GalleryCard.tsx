import Link from "next/link";

type Props = {
    item: {
        id: string | number;
        title: string;
        image: string;
    };
};

export default function GalleryCard({ item }: Props) {
    return (
        <Link href={`/gallery/${item.id}`}>
        <div className="group cursor-pointer rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <div className="relative">
            <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}`}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-sm p-2">
                {item.title}
            </div>
            </div>
        </div>
        </Link>
    );
}
