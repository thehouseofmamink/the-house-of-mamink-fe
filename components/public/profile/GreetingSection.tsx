export default function GreetingSection() {
    return (
        <section className="relative overflow-hidden py-24 px-6 text-center bg-gradient-to-b from-orange-100 via-orange-50 to-white">
            {/* Background Glow */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-amber-300/30 rounded-full blur-3xl"></div>

            <div className="relative max-w-3xl mx-auto">

                {/* Badge */}
                <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold tracking-wide text-orange-700 bg-orange-100 rounded-full">
                    Personal Profile
                </span>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    Halo, Saya Mamink <span className="inline-block">👋</span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                    Selamat datang di halaman profile. Di sini kamu bisa mengenal lebih dekat tentang saya,
                    perjalanan, dan cerita yang saya bagikan.
                </p>

                {/* Divider */}
                <div className="mt-10 flex justify-center">
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"></div>
                </div>

                {/* Tagline */}
                <p className="mt-6 text-sm text-gray-500 italic">
                    "Sharing stories through moments and memories"
                </p>

            </div>
        </section>
    );
}
