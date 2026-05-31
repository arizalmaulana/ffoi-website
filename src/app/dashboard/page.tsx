import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen bg-black text-white p-10">
        <h1 className="text-3xl font-bold">
            Dashboard
        </h1>

        <p className="mt-4 text-gray-400">
            Selamat datang 👋
        </p>
        </main>
    );
}