"use client";

import { useEffect } from "react";
import { Activity } from "@/types/activity";
import { CalendarDays, X } from "lucide-react";

const imageUrl = (image: string) =>
  image.startsWith("http") ? image : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`;

export default function ActivityModal({ item, onClose }: { item: Activity; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-[#20140d]/80 p-4 backdrop-blur-sm" onClick={onClose} role="presentation">
      <article className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#fffdf8] shadow-2xl" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="activity-title">
        <button type="button" onClick={onClose} aria-label="Tutup detail aktivitas" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-[#2f2118]/85 text-white backdrop-blur hover:bg-[#2f2118]"><X size={18} /></button>
        <img src={imageUrl(item.image)} alt={item.title} className="h-64 w-full object-cover sm:h-80" />
        <div className="p-6 sm:p-9">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#9a7025]"><CalendarDays size={14} />{new Date(item.date).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</p>
          <h2 id="activity-title" className="mt-4 font-display text-3xl text-[#2f2118] sm:text-4xl">{item.title}</h2>
          <p className="mt-5 whitespace-pre-line leading-7 text-[#65564c]">{item.description}</p>
        </div>
      </article>
    </div>
  );
}
