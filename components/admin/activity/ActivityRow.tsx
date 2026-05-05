'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Activity } from '../../../types/activity';

type Props = {
    data: Activity;
    onDelete: (id: number) => Promise<void>;
    onUpdate: (id: number, formData: FormData) => Promise<void>;
};

export default function ActivityRow({ data, onDelete, onUpdate }: Props) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description || '');
    const [date, setDate] = useState(data.date?.slice(0, 10));
    const [image, setImage] = useState<File | null>(null);

    const formattedDate = data.date
        ? new Date(data.date).toLocaleDateString('id-ID')
        : '-';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('MODAL SUBMIT TRIGGERED');

        const formData = new FormData();

        // 🔥 wajib kirim semua field
        formData.append('title', title);
        formData.append('description', description);

        if (date) {
            formData.append('date', date);
        }

        if (image) {
            formData.append('image', image);
        }

        // 🔍 DEBUG: cek isi FormData
        for (let pair of formData.entries()) {
            console.log('FORMDATA:', pair[0], pair[1]);
        }

        console.log('UPDATE SUBMITT:', {
            id: data.id,
            title,
            description,
            date,
        });

        console.log('CALLING UPDATE API...');
        await onUpdate(data.id, formData);
        console.log('UPDATE FINISHED');

        setOpen(false);
    };

    return (
        <>
        <tr className="border-b border-amber-100">
            <td className="p-3">{data.title}</td>
            <td className="p-3">{formattedDate}</td>
            <td className="p-3">
            {data.image && (
                <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${data.image}`}
                className="w-16 h-16 object-cover rounded"
                />
            )}
            </td>
            <td className="p-3 flex gap-2">
            <button className="text-amber-600 hover:text-amber-700" type="button" onClick={() => setOpen(true)}>
                Edit
            </button>
            <button
                className="text-red-500 hover:text-red-600"
                type="button"
                onClick={async () => {
                    console.log('DELETE CLICKED:', data.id);
                    await onDelete(data.id);
                }}
            >
                Delete
            </button>
            </td>
        </tr>

        {/* 🔥 PORTAL FIX (INI KUNCI NYA) */}
        {open &&
            typeof window !== 'undefined' &&
            createPortal(
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded w-[400px]">
                <h2 className="font-bold mb-4">Edit Activity</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2"
                    />

                    <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2"
                    placeholder="Description"
                    />

                    <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-2"
                    />

                    <input
                    type="file"
                    onChange={(e) =>
                        setImage(e.target.files ? e.target.files[0] : null)
                    }
                    />

                    <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setOpen(false)}>
                        Batal
                    </button>
                    <button type="submit" className="bg-amber-500 text-white px-3 py-1">
                        Simpan
                    </button>
                    </div>
                </form>
                </div>
            </div>,
            document.body
            )}
        </>
    );
}
