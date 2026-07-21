"use client";

import { useEffect, useState } from "react";
import { Activity } from "../../../types/activity";
import ActivityRow from "./ActivityRow";
import {
  deleteActivity,
  updateActivity,
} from "../../../services/activity.service";

export default function ActivityTable() {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities`, {
        cache: "no-store",
      });
      const json = await res.json();
      setData(Array.isArray(json) ? json : json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id: number) => {
    console.log("🔥 DELETE KE API:", id);

    const confirmDelete = confirm("Yakin ingin menghapus activity ini?");
    if (!confirmDelete) return;

    try {
      await deleteActivity(id);
      await fetchActivities();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  const handleUpdate = async (id: number, formData: FormData) => {
    console.log("🔥 UPDATE KE API:", id);
    try {
      await updateActivity(id, formData);
      await fetchActivities();
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Terjadi error saat update");
    }
  };

  return (
    <div className="p-4 border border-amber-600 rounded-xl bg-white">
      <h2 className="text-lg font-bold mb-4 text-amber-700">Activity List</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-amber-200 text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Date</th>
            <th className="p-2">Image</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-400">
                Belum ada activity
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <ActivityRow
                key={item.id}
                data={item}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
