"use client";

import { useState } from "react";
import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";
import ActivityModal from "./ActivityModal";

export default function ActivityList({ data }: { data: Activity[] }) {
  const [selected, setSelected] = useState<Activity | null>(null);

  return (
    <>
      <section className="page-shell py-16 md:py-20">
        {data.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => <ActivityCard key={item.id} item={item} onClick={() => setSelected(item)} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#c8aa6a] bg-[#fffdf8] px-6 py-20 text-center">
            <p className="font-display text-3xl text-[#4a3325]">Belum ada cerita baru</p>
            <p className="mt-2 text-sm text-[#77675d]">Aktivitas terbaru akan muncul di halaman ini.</p>
          </div>
        )}
      </section>
      {selected && <ActivityModal item={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
