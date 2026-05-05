import { Profile } from "@/types/profile";

export default function ProfileCard({ data }: { data: Profile | null }) {
    if (!data) {
        return (
        <section className="py-16 px-6 text-center">
            <p className="text-gray-500">Data profile belum tersedia</p>
        </section>
        );
    }

    return (
        <section id="profile" className="py-20 px-6 bg-gradient-to-b from-white to-orange-50">
            <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 border border-white/40">

                {/* Image + Info */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="relative">
                        <img
                            src={data.avatar || "https://source.unsplash.com/random/300x300?person"}
                            alt="profile"
                            className="w-40 h-40 rounded-full object-cover shadow-lg ring-4 ring-orange-200"
                        />
                        <span className="absolute -bottom-2 -right-2 px-3 py-1 text-xs bg-orange-500 text-white rounded-full shadow">
                            Online
                        </span>
                    </div>

                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        {data.name}
                        </h2>

                        {data.instagram && (
                        <a
                            href={`https://instagram.com/${data.instagram}`}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-orange-600 text-sm mt-2 px-3 py-1 rounded-full bg-orange-50 hover:bg-orange-100 transition"
                        >
                            @{data.instagram}
                        </a>
                        )}

                        <p className="mt-4 text-gray-600 leading-relaxed">
                            {data.description}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                    {/* Detail */}
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                    {data.region && (
                        <div className="p-4 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md transition">
                            <h3 className="font-semibold text-gray-800 mb-1">Alamat</h3>
                            <p className="text-gray-600">{data.region}</p>
                        </div>
                    )}

                    {data.email && (
                        <div className="p-4 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md transition">
                            <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                            <p className="text-gray-600">{data.email}</p>
                        </div>
                    )}

                    {data.phone && (
                        <div className="p-4 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md transition">
                            <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                            <p className="text-gray-600">{data.phone}</p>
                        </div>
                    )}

                    {data.instagram && (
                        <div className="p-4 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md transition">
                            <h3 className="font-semibold text-gray-800 mb-1">Instagram</h3>
                            <p className="text-gray-600">@{data.instagram}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
