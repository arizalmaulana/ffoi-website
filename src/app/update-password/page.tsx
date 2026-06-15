"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AuthLayout from "@/components/auth/AuthLayout";

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [checkingSession, setCheckingSession] =
    useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setCheckingSession(false);
    };

    checkSession();
  }, [router]);

  const handleUpdatePassword = async () => {
    try {
        setLoading(true);

        if (!password) {
        alert("Password wajib diisi");
        return;
        }

        if (password !== confirmPassword) {
        alert("Konfirmasi password tidak cocok");
        return;
        }

        // Jangan await karena ini yang bikin freeze
        supabase.auth.updateUser({
        password,
        });

        setTimeout(async () => {
        // Bersihkan session browser
        await supabase.auth.signOut();

        // Bersihkan cookie SSR
        await fetch("/api/auth/signout", {
            method: "POST",
        });

        alert(
            "Password berhasil diperbarui. Silakan login menggunakan password baru."
        );

        window.location.replace("/login");
        }, 1500);
    } catch (error) {
        console.error(error);

        alert(
        "Terjadi kesalahan saat memperbarui password"
        );
    } finally {
        setLoading(false);
    }
    };

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">
          Memuat...
        </p>
      </main>
    );
  }

  return (
    <AuthLayout title="Password Baru" subtitle="Masukkan password baru untuk akun Anda">
        <div className="space-y-4">
            <input
                type="password"
                value={password}
                placeholder="Password Baru"
                className="w-full p-3 rounded bg-black text-white outline-none"
                onChange={(e) =>
                setPassword(e.target.value)
                }
            />

            <input
                type="password"
                value={confirmPassword}
                placeholder="Konfirmasi Password"
                className="w-full p-3 rounded bg-black text-white outline-none"
                onChange={(e) =>
                setConfirmPassword(
                    e.target.value
                )
                }
            />

            <button
                disabled={loading}
                onClick={handleUpdatePassword}
                className="w-full bg-yellow-400 text-black py-3 rounded font-semibold disabled:opacity-50"
            >
                {loading
                ? "Menyimpan..."
                : "Simpan Password"}
            </button>
        </div>
    </AuthLayout>
  );
}