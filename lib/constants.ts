export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
  /\/+$/,
  "",
);

export function getUploadUrl(path?: string | null) {
  if (!path) return "";

  if (/^(https?:|blob:|data:)/.test(path)) {
    return path;
  }

  const filename = path.replace(/^\/?uploads\//, "");
  return `${API_URL}/uploads/${filename}`;
}
