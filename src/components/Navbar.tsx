"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import UserMenu from "./navbar/UserMenu";
import { usePathname } from "next/navigation";

type Profile = {
  id: string;
  username: string | null;
  nama_lengkap: string | null;
};

export default function Navbar() {
  const [mounted, setMounted] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const pathname = usePathname();

  const baseClass = "transition-all duration-200 font-medium";

  const inactiveClass = "text-white hover:text-yellow-400";

  const activeClass = "text-yellow-400 font-bold border-b-2 border-yellow-400 pb-1";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } =
        await supabase
          .from("profil")
          .select(
            "id, username, nama_lengkap"
          )
          .eq("id", session.user.id)
          .single();

      if (!error && data) {
        setProfile(data);
      }

      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session?.user) {
          setProfile(null);
          return;
        }

        const { data, error } =
          await supabase
            .from("profil")
            .select(
              "id, username, nama_lengkap"
            )
            .eq("id", session.user.id)
            .single();

        if (!error && data) {
          setProfile(data);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const isLoggedIn =
    profile !== null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-black border-b border-yellow-500/20">
      <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo/Logo FFOI Transparan.png"
            alt="FFOI"
            className="w-12"
          />

          <div>
            <p className="text-white font-bold">
              FFOI
            </p>

            <p className="text-yellow-400 text-xs">
              Yayasan Freshwater Fish of
              Indonesia
            </p>
          </div>
        </Link>

        {/* Menu Landing */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`${baseClass} ${pathname === '/' ? activeClass : inactiveClass}`}
          >
            Beranda
          </Link>

          <Link
            href="/tentang"
            className={`${baseClass} ${pathname === '/tentang' ? activeClass : inactiveClass}`}
          >
            Tentang
          </Link>

          <Link
            href="/program"
            className={`${baseClass} ${pathname === '/program' ? activeClass : inactiveClass}`}
          >
            Program
          </Link>

          <Link
            href="/database"
            className={`${baseClass} ${pathname === '/database' ? activeClass : inactiveClass}`}
          >
            Database
          </Link>

          <Link
            href="/kontak"
            className={`${baseClass} ${pathname === '/kontak' ? activeClass : inactiveClass}`}
          >
            Kontak
          </Link>
        </div>

        {/* User Area */}
        <div className="flex items-center gap-8">
          {isLoggedIn && (
            <>
              <Link
                href="/dashboard"
                className={`${baseClass} ${pathname === '/dashboard' ? activeClass : inactiveClass}`}
              >
                Dashboard
              </Link>

            </>
          )}

          {!loading &&
            !isLoggedIn && (
              <Link
                href="/login"
                className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold"
              >
                Login
              </Link>
            )}

          {!loading &&
            isLoggedIn &&
            profile && (
              <UserMenu
                username={
                  profile.username ??
                  profile.nama_lengkap ??
                  "User"
                }
              />
            )}
        </div>
      </div>
    </nav>
  );
}