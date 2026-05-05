"use client";

import { Activity } from "@/types/activity";

export default function ActivityModal({
  item,
  onClose,
}: {
  item: Activity;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}`}
          className="w-full h-60 object-cover rounded-lg"
        />

        <h2 className="text-xl font-bold mt-3">{item.title}</h2>

        <p className="text-gray-600 mt-2">{item.description}</p>
      </div>
    </div>
  );
}