"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
        setLoading(true);

        if (!username || !password) {
            alert("Username dan password wajib diisi");
            return;
        }

        const { data: email, error: rpcError } =
            await supabase.rpc(
            "cari_email_dari_username",
            {
                p_username: username,
            }
            );

        if (rpcError || !email) {
            alert("Username tidak ditemukan");
            return;
        }

        const { error } =
            await supabase.auth.signInWithPassword({
            email,
            password,
            });

        if (error) {
            if (
            error.message
                .toLowerCase()
                .includes("email not confirmed")
            ) {
            alert(
                "Silakan verifikasi email terlebih dahulu."
            );
            return;
            }

            alert(error.message);
            return;
        }

        router.push("/dashboard");
        } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat login");
        } finally {
        setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="bg-neutral-900 p-8 rounded-xl w-full max-w-md">
            <h1 className="text-white text-2xl font-bold mb-6">
            Login
            </h1>

            <div className="space-y-4">
            <input
                value={username}
                placeholder="Username"
                className="w-full p-3 rounded bg-black text-white outline-none"
                onChange={(e) =>
                setUsername(e.target.value)
                }
            />

            <input
                value={password}
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded bg-black text-white outline-none"
                onChange={(e) =>
                setPassword(e.target.value)
                }
            />

            <button
                disabled={loading}
                onClick={handleLogin}
                className="w-full bg-yellow-400 text-black py-3 rounded font-semibold disabled:opacity-50"
            >
                {loading ? "Memproses..." : "Login"}
            </button>

            <p className="text-gray-400 text-sm text-center">
                Belum punya akun?{" "}
                <Link
                href="/register"
                className="text-yellow-400 font-semibold"
                >
                Register
                </Link>
            </p>
            </div>
        </div>
        </main>
    );
}