"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";

import { getProfile } from "@/services/profile.service";
import { getPostLoginPath, isProtectedRoute } from "@/lib/auth/routes";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      if (!email || !password) {
        alert("Email dan password wajib diisi");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          alert("Silakan verifikasi email terlebih dahulu.");
          return;
        }

        alert(error.message);
        return;
      }

      const profile = await getProfile();

      if (!profile) {
        alert("Profil tidak ditemukan");
        await supabase.auth.signOut();
        return;
      }

      const redirectParam = searchParams.get("redirect");
      const fallbackPath = getPostLoginPath(profile.role);
      const destination =
        redirectParam &&
        redirectParam.startsWith("/") &&
        !redirectParam.startsWith("//") &&
        isProtectedRoute(redirectParam)
          ? redirectParam
          : fallbackPath;

      router.push(destination);
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      alert("Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Gagal login dengan Google");
    }
  };

  return (
    <AuthLayout title="Login" subtitle="Masuk ke akun FFOI Anda">
      <div className="space-y-4">
        <input
          value={email}
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-black text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          value={password}
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-black text-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={handleLogin}
          className="w-full bg-yellow-400 text-black py-3 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Login"}
        </button>

        <p className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-yellow-400"
          >
            Lupa Password?
          </Link>
        </p>

        <div className="relative my-4">
          <div className="border-t border-gray-700"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-700 py-3 rounded text-white hover:bg-neutral-800 transition flex items-center justify-center gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-5 h-5"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.195 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.318 4.337-17.694 10.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.144 35.091 26.67 36 24 36c-5.174 0-9.627-3.329-11.287-7.946l-6.522 5.025C9.53 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.084 5.57l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>

          <span>Login dengan Google</span>
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
    </AuthLayout>
  );
}
