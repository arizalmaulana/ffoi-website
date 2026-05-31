"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        // ambil email dari username
        const { data: userData, error: userError } = await supabase
        .from("profil")
        .select("email")
        .eq("username", username)
        .single();

        if (userError || !userData) {
        return alert("Username tidak ditemukan");
        }

        // login pakai email
        const { error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password,
        });

        if (error) return alert(error.message);

        router.push("/dashboard");
    };

    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-6">

        <div className="bg-neutral-900 p-8 rounded-xl w-full max-w-md">

            <h1 className="text-white text-2xl font-bold mb-6">
            Login
            </h1>

            <div className="space-y-4">

            <input
                placeholder="Username"
                className="w-full p-3 rounded bg-black text-white outline-none"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded bg-black text-white outline-none"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleLogin}
                className="w-full bg-yellow-400 text-black py-3 rounded font-semibold"
            >
                Login
            </button>

            {/* 🔥 REGISTER LINK */}
            <p className="text-gray-400 text-sm text-center">
                Belum punya akun?{" "}
                <Link href="/register" className="text-yellow-400 font-semibold">
                Register
                </Link>
            </p>

            </div>
        </div>
        </main>
    );
}