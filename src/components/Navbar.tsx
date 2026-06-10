"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { supabase, waitForAuth } from "@/lib/supabase";
import UserMenu from "./navbar/UserMenu";

type Profile = {
  id: string;
  username: string | null;
  nama_lengkap: string | null;
  foto_profil: string | null;
};

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/program", label: "Program" },
  { href: "/database", label: "Database" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  const baseClass = "transition-all duration-200 font-medium";
  const inactiveClass = "text-white hover:text-yellow-400";
  const activeClass =
    "text-yellow-400 font-bold border-b-2 border-yellow-400 pb-1";

  useEffect(() => {
    let active = true;

    async function loadUser() {
      await waitForAuth();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!active) return;

      if (!session?.user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profil")
        .select("id, username, nama_lengkap, foto_profil")
        .eq("id", session.user.id)
        .single();

      if (!active) return;

      if (!error && data) {
        setProfile(data);
      }

      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profil")
        .select("id, username, nama_lengkap, foto_profil")
        .eq("id", session.user.id)
        .single();

      if (!error && data) {
        setProfile(data);
      }

      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const isLoggedIn = profile !== null;

  function linkClass(href: string) {
    const isActive =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);

    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-black border-b border-yellow-500/20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <img
            src="/logo/Logo FFOI Transparan.png"
            alt="FFOI"
            className="w-10 sm:w-12"
          />

          <div className="min-w-0">
            <p className="text-white font-bold text-sm sm:text-base">FFOI</p>
            <p className="text-yellow-400 text-[10px] sm:text-xs leading-tight hidden sm:block">
              Yayasan Freshwater Fish of Indonesia
            </p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {isLoggedIn && (
            <Link
              href="/dashboard"
              className={`${baseClass} ${
                pathname.startsWith("/dashboard")
                  ? activeClass
                  : inactiveClass
              }`}
            >
              Dashboard
            </Link>
          )}

          {loading ? (
            <div className="w-20 h-9 bg-white/10 rounded-lg animate-pulse" />
          ) : !isLoggedIn ? (
            <Link
              href="/login"
              className="bg-yellow-400 text-black px-4 xl:px-5 py-2 rounded-lg font-semibold text-sm whitespace-nowrap"
            >
              Login
            </Link>
          ) : (
            profile && (
              <UserMenu
                username={
                  profile.username ?? profile.nama_lengkap ?? "User"
                }
                fotoProfil={profile.foto_profil}
              />
            )
          )}
        </div>

        <button
          type="button"
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-yellow-500/20 bg-black px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg ${linkClass(link.href)}`}
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn && (
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg ${linkClass("/dashboard")}`}
            >
              Dashboard
            </Link>
          )}

          <div className="pt-3 border-t border-white/10 mt-2">
            {loading ? (
              <div className="h-10 bg-white/10 rounded-lg animate-pulse" />
            ) : !isLoggedIn ? (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-yellow-400 text-black px-5 py-2.5 rounded-lg font-semibold"
              >
                Login
              </Link>
            ) : (
              profile && (
                <div className="px-1">
                  <UserMenu
                    username={
                      profile.username ?? profile.nama_lengkap ?? "User"
                    }
                    fotoProfil={profile.foto_profil}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
