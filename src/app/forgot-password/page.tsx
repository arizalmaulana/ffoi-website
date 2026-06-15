"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import AuthLayout from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    try {
      setLoading(true);

      if (!email) {
        alert("Email wajib diisi");
        return;
      }

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo:
              `${window.location.origin}/auth/reset-password`,
          }
        );

      if (error) {
        alert(error.message);
        return;
      }

      alert(
        "Link reset password berhasil dikirim. Silakan cek email."
      );
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Lupa Password" subtitle="Masukkan email untuk menerima link reset password">
        <div className="space-y-4">
            <input
                type="email"
                value={email}
                placeholder="Email"
                className="w-full p-3 rounded bg-black text-white outline-none"
                onChange={(e) =>
                setEmail(e.target.value)
                }
            />

            <button
                disabled={loading}
                onClick={handleReset}
                className="w-full bg-yellow-400 text-black py-3 rounded font-semibold disabled:opacity-50"
            >
                {loading
                ? "Mengirim..."
                : "Kirim Link Reset"}
            </button>

            <p className="text-center text-sm text-gray-400">
                <Link
                href="/login"
                className="text-yellow-400 font-semibold"
                >
                Kembali ke Login
                </Link>
            </p>
        </div>
    </AuthLayout>
  );
}