import { API_URL } from "./constants";

function getStoredToken() {
  if (typeof window === "undefined") return null;

  try {
    return (
      JSON.parse(localStorage.getItem("auth-storage") || "{}")?.state?.token ??
      null
    );
  } catch {
    localStorage.removeItem("auth-storage");
    return null;
  }
}

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getStoredToken();

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL belum dikonfigurasi");
  }

  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (typeof options.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("auth-storage");

    if (window.location.pathname.startsWith("/admin")) {
      window.location.assign("/admin-login");
    }
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} - ${text}`);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}
