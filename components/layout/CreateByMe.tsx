export default function CreateByMe() {
  return (
    <a
      href="https://portofolio-ku-gold.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 text-xs rounded-full bg-white/70 backdrop-blur-md shadow-lg hover:scale-105 hover:bg-white/90 transition transform cursor-pointer"
    >
      <div className="flex items-center justify-center gap-1">
        <span className="text-gray-600">Created by:</span>
        <span className="font-semibold text-medium text-amber-600">mas don</span>
      </div>
    </a>
  );
}
