"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";

export default function RegisterPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        nama_lengkap: "",
        username: "",
        email: "",
        password: "",
    });

    const handleRegister = async () => {
        try {
        setLoading(true);

        if (
            !form.nama_lengkap ||
            !form.username ||
            !form.email ||
            !form.password
        ) {
            alert("Semua field wajib diisi");
            return;
        }

        // cek username unik
        const { data: existingUser } = await supabase
            .from("profil")
            .select("id")
            .eq("username", form.username)
            .maybeSingle();

        if (existingUser) {
            alert("Username sudah digunakan");
            return;
        }

        const { error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
            options: {
            data: {
                username: form.username,
                nama_lengkap: form.nama_lengkap,
            },
            },
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert(
            "Registrasi berhasil. Silakan cek email untuk verifikasi akun sebelum login."
        );

        router.push("/register/success");
        } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat registrasi");
        } finally {
        setLoading(false);
        }
    };

    return (
        <AuthLayout title="Register" subtitle="Buat akun baru FFOI">
            <div className="space-y-4">
                <input
                    value={form.nama_lengkap}
                    placeholder="Nama Lengkap"
                    className="w-full p-3 rounded bg-black text-white outline-none"
                    onChange={(e) =>
                    setForm({
                        ...form,
                        nama_lengkap: e.target.value,
                    })
                    }
                />

                <input
                    value={form.username}
                    placeholder="Username"
                    className="w-full p-3 rounded bg-black text-white outline-none"
                    onChange={(e) =>
                    setForm({
                        ...form,
                        username: e.target.value,
                    })
                    }
                />

                <input
                    value={form.email}
                    placeholder="Email"
                    className="w-full p-3 rounded bg-black text-white outline-none"
                    onChange={(e) =>
                    setForm({
                        ...form,
                        email: e.target.value,
                    })
                    }
                />

                <input
                    value={form.password}
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 rounded bg-black text-white outline-none"
                    onChange={(e) =>
                    setForm({
                        ...form,
                        password: e.target.value,
                    })
                    }
                />

                <button
                    disabled={loading}
                    onClick={handleRegister}
                    className="w-full bg-yellow-400 text-black py-3 rounded font-semibold disabled:opacity-50"
                >
                    {loading ? "Memproses..." : "Register"}
                </button>

                <p className="text-gray-400 text-sm text-center">
                    Sudah punya akun?{" "}
                    <Link
                    href="/login"
                    className="text-yellow-400 font-semibold"
                    >
                    Login
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}