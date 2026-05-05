type Props = {
    data: {
        title: string;
        description?: string;
        image: string;
    };
};

export default function GalleryDetail({ data }: Props) {
    return (
        <div className="max-w-4xl mx-auto">
        <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${data.image}`}
            alt={data.title}
            className="w-full h-[400px] object-cover rounded-xl shadow"
        />

        <h1 className="text-2xl font-bold mt-6">{data.title}</h1>

        {data.description && (
            <p className="mt-4 text-gray-600">{data.description}</p>
        )}
        </div>
    );
}
