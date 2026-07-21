export default function CreateByMe() {
  return (
    <div className="flex flex-col gap-3 pt-7 text-[11px] text-[#e8dcc6]/45 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} The House of Mamink. Semua cerita tersimpan
        dengan hangat.
      </p>
      <a
        href="https://portofolio-ku-gold.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold tracking-wide text-[#e4c882] transition hover:text-[#f3dda3] sm:text-lg"
      >
        Dirancang oleh mas don
      </a>
    </div>
  );
}
