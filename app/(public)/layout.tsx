import { Suspense } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import AdminLoginModal from "@/components/auth/AdminLoginModal";
import { Profile } from "@/types/profile";

async function getProfile(): Promise<Profile | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
            cache: "no-store",
        });

        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const profile = await getProfile();

    return (
        <div className="min-h-screen flex flex-col bg-[#f8f3e9]">
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer profile={profile} />

            <Suspense fallback={null}>
                <AdminLoginModal />
            </Suspense>
        </div>
    );
}
