"use client";

import { useEffect, useState } from "react";
import { Profile } from "../../../types/profile";
import { getProfile, updateProfile } from "../../../services/profile.service";
import { apiFetch } from "../../../lib/api";

export function useProfileForm() {
  const [form, setForm] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const data = await apiFetch("/upload", {
        method: "POST",
        body: formData,
      });

      setForm((prev) => ({
        ...prev,
        avatar: data.filename,
      }));
    } catch (err) {
      console.error("Upload gagal", err);
      alert("Upload gagal");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (data) setForm(data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(form);
      alert("Profile berhasil disimpan");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    uploading,
    handleChange,
    handleFileUpload,
    handleSubmit,
  };
}
