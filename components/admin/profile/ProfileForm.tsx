"use client";

import ProfileFields from "./ProfileFields";
import AvatarUpload from "./AvatarUpload";
import { Button } from "../../ui/button";
import { useProfileForm } from "./useProfileForm";
import { getUploadUrl } from "@/lib/constants";

export default function ProfileForm() {
  const {
    form,
    loading,
    uploading,
    handleChange,
    handleFileUpload,
    handleSubmit,
  } = useProfileForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl border border-amber-200 shadow space-y-6"
    >
      <h2 className="text-xl font-bold text-amber-700">Profile Management</h2>

      <div className="space-y-4">
        <AvatarUpload
          avatar={getUploadUrl(form.avatar)}
          uploading={uploading}
          onUpload={handleFileUpload}
        />

        <ProfileFields form={form} onChange={handleChange} />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading || uploading}
          className="disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </form>
  );
}
