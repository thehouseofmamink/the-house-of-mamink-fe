'use client';

import { useEffect, useState } from 'react';
import { Activity } from '../../../types/activity';
import ActivityRow from './ActivityRow';
import { useAuthStore } from '../../../store/useAuthStore';

export default function ActivityTable() {
    const [data, setData] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const token = useAuthStore((state) => state.token);
    console.log('🔥 TOKEN:', token);

    const fetchActivities = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities`, {
                cache: 'no-store',
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
        console.log('🔥 DELETE KE API:', id);

        const confirmDelete = confirm('Yakin ingin menghapus activity ini?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities/${id}`, {
                method: 'DELETE',
                headers: token
                    ? { Authorization: `Bearer ${token}` }
                    : {},
            });

            console.log('DELETE STATUS:', res.status);
            const text = await res.text();
            console.log('DELETE RESPONSE:', text);

            await fetchActivities();
        } catch (err) {
            console.error('DELETE ERROR:', err);
        }
    };

    const handleUpdate = async (id: number, formData: FormData) => {
        console.log('🔥 UPDATE KE API:', id);
        console.log('🔥 URL:', `${process.env.NEXT_PUBLIC_API_URL}/activities/${id}`);

        try {
            const resUpdate = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities/${id}`, {
                method: 'PATCH',
                headers: token
                    ? { Authorization: `Bearer ${token}` }
                    : {},
                body: formData,
            });

            console.log('STATUS:', resUpdate.status);
            const text = await resUpdate.text();
            console.log('RESPONSE:', text);

            if (!resUpdate.ok) {
                console.error('UPDATE ERROR:', text);
                alert('Gagal update activity');
                return;
            }

            await fetchActivities();
        } catch (err) {
            console.error('UPDATE ERROR:', err);
            alert('Terjadi error saat update');
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