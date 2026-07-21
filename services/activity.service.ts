import { apiFetch } from "@/lib/api";

export async function getActivity() {
  return apiFetch("/activities");
}

export async function createActivity(formData: FormData) {
  return apiFetch("/activities", {
    method: "POST",
    body: formData,
  });
}

export async function updateActivity(id: number, formData: FormData) {
  return apiFetch(`/activities/${id}`, {
    method: "PATCH",
    body: formData,
  });
}

export async function deleteActivity(id: number) {
  return apiFetch(`/activities/${id}`, {
    method: "DELETE",
  });
}
