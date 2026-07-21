"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, KeyRound, LoaderCircle, LockKeyhole, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { login as loginRequest } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthResponse } from "@/types/auth";

export default function AdminLoginModal() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const saveToken = useAuthStore((state) => state.login);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isOpen = searchParams.get("admin") === "login";

  const closeModal = useCallback(() => {
    if (loading) return;

    const params = new URLSearchParams(searchParams.toString());
    params.delete("admin");
    const query = params.toString();

    setError("");
    setPassword("");
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [loading, pathname, router, searchParams]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    emailInputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isOpen]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = (await loginRequest(email, password)) as AuthResponse;
      saveToken(data.access_token);
      router.push("/admin/dashboard");
    } catch (loginError: unknown) {
      const message =
        loginError instanceof Error ? loginError.message : "Terjadi kesalahan";

      setError(
        message.includes("401")
          ? "Email atau kata sandi tidak sesuai."
          : "Login belum berhasil. Silakan coba kembali.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#21140d]/75 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <section
        aria-describedby="admin-login-description"
        aria-labelledby="admin-login-title"
        aria-modal="true"
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#d6ad55]/30 bg-[#fffaf0] p-7 shadow-[0_30px_90px_rgba(43,29,21,0.35)] sm:p-9"
        role="dialog"
      >
        <div className="absolute -right-16 -top-16 size-40 rounded-full border border-[#d6ad55]/20" />
        <div className="absolute -right-8 -top-8 size-24 rounded-full border border-[#d6ad55]/20" />

        <button
          aria-label="Tutup login admin"
          className="absolute right-5 top-5 z-10 grid size-10 place-items-center rounded-full border border-[#6f4b2f]/15 text-[#6f4b2f] transition hover:border-[#6f4b2f]/35 hover:bg-[#f3e8d4]"
          disabled={loading}
          onClick={closeModal}
          type="button"
        >
          <X size={18} />
        </button>

        <div className="relative">
          <div className="mb-6 grid size-12 place-items-center rounded-full bg-[#2b1d15] text-[#e4c882] shadow-lg shadow-[#2b1d15]/20">
            <LockKeyhole size={21} />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#a9782c]">
            Area Pemilik
          </p>
          <h2
            className="font-display text-3xl text-[#2b1d15] sm:text-4xl"
            id="admin-login-title"
          >
            Masuk sebagai admin
          </h2>
          <p
            className="mt-3 max-w-sm text-sm leading-6 text-[#6f6258]"
            id="admin-login-description"
          >
            Akses ini khusus pemilik untuk mengelola konten The House of Mamink.
          </p>

          {error && (
            <div
              aria-live="polite"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              role="alert"
            >
              {error}
            </div>
          )}

          <form className="mt-7 space-y-5" onSubmit={handleLogin}>
            <div>
              <label
                className="mb-2 block text-sm font-semibold text-[#46362b]"
                htmlFor="admin-email"
              >
                Email
              </label>
              <input
                autoComplete="email"
                className="w-full rounded-xl border border-[#b99b75]/45 bg-white px-4 py-3 text-[#2b1d15] outline-none transition placeholder:text-[#8a7a6d]/55 focus:border-[#a9782c] focus:ring-4 focus:ring-[#d6ad55]/15"
                id="admin-email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Masukkan email admin"
                ref={emailInputRef}
                required
                type="email"
                value={email}
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold text-[#46362b]"
                htmlFor="admin-password"
              >
                Kata sandi
              </label>
              <div className="relative">
                <input
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-[#b99b75]/45 bg-white px-4 py-3 pr-12 text-[#2b1d15] outline-none transition placeholder:text-[#8a7a6d]/55 focus:border-[#a9782c] focus:ring-4 focus:ring-[#d6ad55]/15"
                  id="admin-password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan kata sandi"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  className="absolute right-1.5 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-[#76675c] transition hover:bg-[#f3e8d4] hover:text-[#2b1d15]"
                  onClick={() => setShowPassword((visible) => !visible)}
                  type="button"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2b1d15] px-5 py-3.5 text-sm font-bold text-[#fff8e8] shadow-lg shadow-[#2b1d15]/20 transition hover:bg-[#3a281d] disabled:cursor-not-allowed disabled:opacity-65"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin" size={18} />
                  Memeriksa akun...
                </>
              ) : (
                <>
                  <KeyRound size={18} />
                  Masuk ke dashboard
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
