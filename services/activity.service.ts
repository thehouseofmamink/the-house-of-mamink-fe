import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

export async function getActivity() {
    return apiFetch('/activities');
}

export async function createActivity(formData: FormData) {
    const token = useAuthStore.getState().token;

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    }).then(res => res.json());
}

export async function updateActivity(id: number, formData: FormData) {
    const token = useAuthStore.getState().token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities/${id}`, {
        method: 'PATCH',
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
    });

    if (!res.ok) {
        const text = await res.text();
        console.error('UPDATE ERROR:', res.status, text);
        throw new Error(`Update failed: ${res.status}`);
    }

    const data = await res.json();
    console.log('UPDATE SUCCESS:', data);
    return data;
}

export async function deleteActivity(id: number) {
    const token = useAuthStore.getState().token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities/${id}`, {
        method: 'DELETE',
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!res.ok) {
        const text = await res.text();
        console.error('DELETE ERROR:', res.status, text);
        throw new Error(`Delete failed: ${res.status}`);
    }

    const data = await res.json();
    console.log('DELETE SUCCESS:', data);
    return data;
}