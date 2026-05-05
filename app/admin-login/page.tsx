"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
        console.log("API:", process.env.NEXT_PUBLIC_API_URL);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!res.ok) {
            throw new Error("Login gagal");
        }

        const data = await res.json();

        // simpan token (sementara di localStorage)
        localStorage.setItem("token", data.access_token);

        // redirect ke admin dashboard
        router.push("/admin/dashboard");
        } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
        } finally {
        setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-100 to-white px-6">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

                {/* Title */}
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    Admin Login
                </h1>
                <p className="text-center text-gray-500 mt-2 text-sm">
                    Masuk untuk mengelola konten
                </p>

                {/* Error */}
                {error && (
                    <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="mt-6 space-y-4">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Masukkan email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50">
                        {loading ? "Loading..." : "Login"}
                    </button>

                    <button 
                        onClick={() => router.back()} 
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                        Kembali
                    </button>
                </form>
            </div>
        </main>
    );
}