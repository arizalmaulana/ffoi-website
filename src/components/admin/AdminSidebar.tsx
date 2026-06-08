"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function AdminSidebar() {
  const pathname =
    usePathname();

  const router =
    useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/");
  }

  function isActive(
    href: string
  ) {

    if (
      href === "/admin"
    ) {

      return (
        pathname ===
        "/admin"
      );

    }

    return (
      pathname === href ||
      pathname.startsWith(
        href + "/"
      )
    );
  }

  const menu = [
    {
      href: "/admin",
      label: "Dashboard",
    },
    {
      href: "/admin/sighting",
      label: "Sighting",
    },
    {
      href:
        "/admin/species-review",
      label: "Review Species",
    },
    {
      href: "/admin/species",
      label: "Database Species",
    },
    {
      href: "/admin/users",
      label: "Users",
    },
  ];

  return (
    <aside
      className="
      w-72
      bg-neutral-950
      border-r
      border-yellow-500/20
      h-screen
      sticky
      top-0
      p-6
      "
    >

      <div className="mb-10">

        <h1
          className="
          text-2xl
          font-bold
          text-yellow-400
          "
        >
          FFOI Admin
        </h1>

        <p
          className="
          text-sm
          text-gray-400
          mt-2
          "
        >
          Management Panel
        </p>

      </div>

      <nav className="space-y-2">

        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              block
              px-4
              py-3
              rounded-lg
              transition
              ${
                isActive(item.href)
                  ? "bg-yellow-400 text-black font-semibold"
                  : "hover:bg-yellow-500/10"
              }
            `}
          >
            {item.label}
          </Link>
        ))}

      </nav>

      <button
        onClick={handleLogout}
        className="
        mt-10
        w-full
        border
        border-red-500/30
        text-red-400
        py-3
        rounded-lg
        hover:bg-red-500/10
        "
      >
        Logout
      </button>

    </aside>
  );
}