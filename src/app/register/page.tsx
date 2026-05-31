"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        nama_lengkap: "",
        username: "",
        email: "",
        password: "",
    });

    const handleRegister = async () => {
        // 1. cek username unik
        const { data: existing } = await supabase
        .from("profil")
        .select("id")
        .eq("username", form.username)
        .single();

        if (existing) {
        return alert("Username sudah digunakan");
        }

        // 2. register auth
        const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        });

        if (error) return alert(error.message);

        // 3. insert ke profil
        await supabase.from("profil").insert({
        id: data.user?.id,
        email: form.email,
        username: form.username,
        nama_lengkap: form.nama_lengkap,
        role: "user",
        });

        alert("Register berhasil!");
        router.push("/login");
    };

    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-6">

        <div className="bg-neutral-900 p-8 rounded-xl w-full max-w-md">

            <h1 className="text-white text-2xl font-bold mb-6">
            Register
            </h1>

            <div className="space-y-4">

            <input
                placeholder="Nama Lengkap"
                className="w-full p-3 rounded bg-black text-white outline-none"
                onChange={(e) => setForm({ ...form, nama_lengkap: e.target.value })}
            />

            <input
                placeholder="Username"
                className="w-full p-3 rounded bg-black text-white outline-none"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <input
                placeholder="Email"
                className="w-full p-3 rounded bg-black text-white outline-none"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded bg-black text-white outline-none"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
                onClick={handleRegister}
                className="w-full bg-yellow-400 text-black py-3 rounded font-semibold"
            >
                Register
            </button>

            {/* 🔥 LOGIN LINK */}
            <p className="text-gray-400 text-sm text-center">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-yellow-400 font-semibold">
                Login
                </Link>
            </p>

            </div>
        </div>
        </main>
    );
}