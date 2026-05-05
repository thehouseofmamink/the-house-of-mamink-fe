import GreetingSection from "@/components/public/profile/GreetingSection";
import ProfileCard from "@/components/public/profile/ProfileCard";
import Medsos from "@/components/public/profile/Medsos";
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

export default async function ProfilePage() {
    const data = await getProfile();

    return (
        <main className="pt-24">
            <GreetingSection />
            <ProfileCard data={data} />
            <Medsos />
        </main>
    );
}
