import { Profile } from "@/types/profile";
import { Camera, Mail, MapPin, Phone } from "lucide-react";

export default function ProfileCard({ data }: { data: Profile | null }) {
  if (!data) {
    return <section className="page-shell py-20 text-center"><p className="font-display text-3xl text-[#4a3325]">Profil sedang disiapkan</p><p className="mt-2 text-sm text-[#77675d]">Informasi pemilik akan segera tampil di sini.</p></section>;
  }

  const avatar = data.avatar
    ? data.avatar.startsWith("http") ? data.avatar : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${data.avatar}`
    : null;

  return (
    <section className="page-shell py-16 md:py-24">
      <div className="grid overflow-hidden rounded-[2rem] border border-[#d8c6a5] bg-[#fffdf8] shadow-[0_30px_80px_rgba(70,45,27,0.1)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-[380px] bg-[#3b281d]">
          {avatar ? <img src={avatar} alt={`Foto ${data.name}`} className="absolute inset-0 h-full w-full object-cover" /> : <div className="grid h-full min-h-[380px] place-items-center"><span className="font-display text-8xl text-[#e4c882]/35">{data.name.slice(0, 1).toUpperCase()}</span></div>}
          <div className="absolute inset-0 bg-gradient-to-t from-[#25170f]/70 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-[0.18em] text-[#f5d98f]">The person behind the story</p>
        </div>

        <div className="p-7 md:p-12 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a67827]">Tentang saya</p>
          <h2 className="mt-4 font-display text-4xl text-[#2f2118] md:text-5xl">{data.name}</h2>
          {data.description && <p className="mt-6 whitespace-pre-line text-base leading-8 text-[#65564c]">{data.description}</p>}

          <div className="my-9 h-px bg-[#dfd1b7]" />
          <div className="grid gap-4 sm:grid-cols-2">
            {data.region && <div className="flex gap-3 rounded-2xl bg-[#f8f3e9] p-4"><MapPin className="mt-0.5 shrink-0 text-[#b9892f]" size={18} /><div><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a846f]">Domisili</p><p className="mt-1 text-sm text-[#4a382d]">{data.region}</p></div></div>}
            {data.email && <a href={`mailto:${data.email}`} className="flex gap-3 rounded-2xl bg-[#f8f3e9] p-4"><Mail className="mt-0.5 shrink-0 text-[#b9892f]" size={18} /><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a846f]">Email</p><p className="mt-1 truncate text-sm text-[#4a382d]">{data.email}</p></div></a>}
            {data.phone && <a href={`https://wa.me/${data.phone.replace(/\D/g, "")}`} className="flex gap-3 rounded-2xl bg-[#f8f3e9] p-4"><Phone className="mt-0.5 shrink-0 text-[#b9892f]" size={18} /><div><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a846f]">Telepon</p><p className="mt-1 text-sm text-[#4a382d]">{data.phone}</p></div></a>}
            {data.instagram && <a href={`https://instagram.com/${data.instagram.replace(/^@/, "")}`} target="_blank" rel="noreferrer" className="flex gap-3 rounded-2xl bg-[#f8f3e9] p-4"><Camera className="mt-0.5 shrink-0 text-[#b9892f]" size={18} /><div><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a846f]">Instagram</p><p className="mt-1 text-sm text-[#4a382d]">@{data.instagram.replace(/^@/, "")}</p></div></a>}
          </div>
        </div>
      </div>
    </section>
  );
}
