'use client';

import { useState } from 'react';
import { Activity } from '@/types/activity';
import { createActivity } from '@/services/activity.service';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type Props = {
  initialData?: Activity;
};

export default function ActivityForm({ initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [image, setImage] = useState<File | null>(null);

  // 🔥 preview state
  const [preview, setPreview] = useState<string | null>(
    initialData?.image
      ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${initialData.image}`
      : null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);

    if (image) {
      formData.append('image', image);
    }

    createActivity(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl border border-amber-200 shadow-sm space-y-6"
    >
      <h2 className="text-xl font-bold text-amber-700">
        Activity Management
      </h2>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="text-sm font-semibold text-amber-700">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-amber-700">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write description"
          />
        </div>

        {/* Date */}
        <div>
          <label className="text-sm font-semibold text-amber-700">Date</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Image */}
        <div>
          <label className="text-sm font-semibold text-amber-700">Image</label>
          <Input
            className="mt-1 w-full border border-amber-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setImage(file || null);

              if (file) {
                setPreview(URL.createObjectURL(file)); // 🔥 preview
              }
            }}
          />
        </div>

        {/* 🔥 Preview Box (disamain dengan gallery) */}
        <div>
          {preview ? (
            <img
              src={preview}
              className="w-full h-40 object-cover rounded-lg"
            />
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-400">
              Belum ada gambar
            </div>
          )}
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-end">
        <Button type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}