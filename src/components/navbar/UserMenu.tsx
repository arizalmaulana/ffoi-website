"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Props = {
  username: string;
  fotoProfil?: string | null;
};

export default function UserMenu({
  username,
  fotoProfil,
}: Props) {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    await fetch("/api/auth/signout", { method: "POST" });

    router.push("/");
    router.refresh();
  }
  

  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="flex items-center gap-3"
      >
        <img
          src={
            fotoProfil ||
            "/images/avatar-default.png"
          }
          
          alt={username}
          
          onError={(e) => {
            e.currentTarget.src =
              "/images/avatar-default.png";
          }}
          className="
          w-10
          h-10
          rounded-full
          object-cover
          border
          border-yellow-500/30
          "
        />
        <span className="text-white">
          Halo, {username}
        </span>

        <span className="text-yellow-400">
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-14 w-56 bg-neutral-950 border border-yellow-500/20 rounded-xl overflow-hidden shadow-xl">
          <Link
            href="/profile"
            className="block px-4 py-3 hover:bg-yellow-500/10"
          >
            Profil Saya
          </Link>

          <Link
                href="/dashboard/sighting"
                className="block px-4 py-3 hover:bg-yellow-500/10"
              >
                Sighting Saya
              </Link>

              <Link
                href="/dashboard/sighting/create"
                className="block px-4 py-3 hover:bg-yellow-500/10"
              >
                Tambah Sighting
              </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}