import ActivitySection from "@/components/public/activity/ActivitySection";
import { Activity } from "@/types/activity";

async function getActivities(): Promise<Activity[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activities`, {
        cache: "no-store",
        });

        if (!res.ok) return [];

        return res.json();
    } catch {
        return [];
    }
}

export default async function ActivityPage() {
    const data = await getActivities();

    return (
        <main className="">
            <ActivitySection data={data} />
        </main>
    );
}