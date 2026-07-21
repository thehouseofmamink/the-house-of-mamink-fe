export default function GreetingSection({ name }: { name?: string }) {
  return (
    <section className="brand-pattern px-4 pb-16 pt-36 text-center md:pb-20 md:pt-44">
      <div className="page-shell">
        <span className="eyebrow">Di balik cerita</span>
        <h1 className="mt-5 font-display text-5xl text-[#2f2118] md:text-7xl">Kenal lebih dekat{name ? ` dengan ${name}` : ""}</h1>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#77675d]">Sebuah ruang untuk memperkenalkan perjalanan, nilai, dan hal-hal yang ingin dibagikan kepada dunia.</p>
      </div>
    </section>
  );
}
