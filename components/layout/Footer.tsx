import { ArrowUpRight, Camera, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Profile } from "@/types/profile";
import CreateByMe from "./CreateByMe";

export default function Footer({ profile }: { profile?: Profile | null }) {
  const phone = profile?.phone?.replace(/\D/g, "") || "6285169757490";

  return (
    <footer className="relative mt-24 overflow-hidden bg-[#2b1d15] text-[#f8f0df]">
      <div className="absolute -right-24 -top-24 size-80 rounded-full border border-[#d6ad55]/10" />
      <div className="absolute -right-8 -top-8 size-48 rounded-full border border-[#d6ad55]/10" />

      <div className="page-shell relative py-16 md:py-20">
        <div className="grid gap-12 border-b border-[#d6ad55]/20 pb-14 md:grid-cols-[1.3fr_0.7fr_0.8fr]">
          <div className="max-w-md">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full border border-[#d6ad55]/55 font-display text-[#e4c882]">HM</span>
              <div>
                <p className="font-display text-2xl">The House of Mamink</p>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#d6ad55]">Stories worth keeping</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-[#e8dcc6]/65">
              Ruang personal untuk merawat cerita, membagikan perjalanan, dan menyimpan momen yang berarti.
            </p>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#d6ad55]">Jelajahi</p>
            <div className="space-y-3 text-sm text-[#e8dcc6]/75">
              <Link href="/activity" className="block hover:text-[#e4c882]">Aktivitas</Link>
              <Link href="/gallery" className="block hover:text-[#e4c882]">Galeri</Link>
              <Link href="/profile" className="block hover:text-[#e4c882]">Profil</Link>
              <Link href="/admin-login" className="block hover:text-[#e4c882]">Area pemilik</Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#d6ad55]">Terhubung</p>
            <div className="space-y-4 text-sm text-[#e8dcc6]/75">
              {profile?.region && <p className="flex gap-3"><MapPin className="mt-0.5 shrink-0 text-[#d6ad55]" size={17} />{profile.region}</p>}
              {profile?.email && <a href={`mailto:${profile.email}`} className="flex gap-3 hover:text-[#e4c882]"><Mail className="shrink-0 text-[#d6ad55]" size={17} />{profile.email}</a>}
              {profile?.instagram && <a href={`https://instagram.com/${profile.instagram.replace(/^@/, "")}`} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-[#e4c882]"><Camera className="shrink-0 text-[#d6ad55]" size={17} />@{profile.instagram.replace(/^@/, "")}</a>}
              <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-[#e4c882]">
                <MessageCircle size={17} /> Hubungi via WhatsApp <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        <CreateByMe />
      </div>
    </footer>
  );
}
