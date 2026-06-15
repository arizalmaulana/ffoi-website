"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  FaUser,
  FaFish,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

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

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function handleLogout() {
    console.log("LOGOUT BUTTON CLICKED");;
    await supabase.auth.signOut();

    await fetch(
      "/api/auth/signout",
      {
        method: "POST",
      }
    );

    router.push("/");
    router.refresh();
  }

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      {/* BUTTON */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-white/5"
      >
        <div className="relative w-10 h-10">
          <Image
            src={
              fotoProfil ||
              "/avatar-kosong.png"
            }
            alt={username}
            fill
            sizes="40px"
            className="rounded-full object-cover border border-yellow-500/30"
          />
        </div>

        <div className="hidden md:block text-left">
          <p className="text-xs text-gray-400">
            Selamat Datang
          </p>

          <p className="text-sm font-medium text-white">
            {username}
          </p>
        </div>

        <span
          className={`text-yellow-400 text-xs transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {/* MENU */}
      {open && (
        <div
          className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-yellow-500/20 bg-neutral-950/95 backdrop-blur-xl shadow-2xl z-50"
        >
          {/* HEADER */}
          <div className="px-4 py-4 border-b border-white/10">
            <p className="text-sm text-gray-400">
              Login sebagai
            </p>

            <p className="font-semibold text-white truncate">
              {username}
            </p>
          </div>

          {/* MENU ITEMS */}
          <div className="py-2">

            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 hover:bg-yellow-500/10 transition"
            >
              <FaUser
                size={14}
                className="text-yellow-400"
              />

              <span>
                Profil Saya
              </span>
            </Link>

            <Link
              href="/dashboard/sighting"
              className="flex items-center gap-3 px-4 py-3 hover:bg-yellow-500/10 transition"
            >
              <FaFish
                size={14}
                className="text-yellow-400"
              />

              <span>
                Sighting Saya
              </span>
            </Link>

            <Link
              href="/dashboard/sighting/create"
              className="flex items-center gap-3 px-4 py-3 hover:bg-yellow-500/10 transition"
            >
              <FaPlus
                size={14}
                className="text-yellow-400"
              />

              <span>
                Tambah Sighting
              </span>
            </Link>

          </div>

          {/* FOOTER */}
          <div className="border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition"
            >
              <FaSignOutAlt size={14} />

              <span>
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}