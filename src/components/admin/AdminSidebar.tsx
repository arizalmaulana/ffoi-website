"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
  }

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const menu = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/sighting", label: "Sighting" },
    { href: "/admin/species-review", label: "Review Species" },
    { href: "/admin/species", label: "Database Species" },
    { href: "/admin/users", label: "Users" },
  ];

  const sidebarContent = (
    <>
      <div className="mb-8 lg:mb-10">
        <h1 className="text-xl lg:text-2xl font-bold text-yellow-400">
          FFOI Admin
        </h1>
        <p className="text-sm text-gray-400 mt-2">Management Panel</p>
      </div>

      <nav className="space-y-1 lg:space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`block px-4 py-2.5 lg:py-3 rounded-lg transition text-sm lg:text-base ${ isActive(item.href) ? "bg-yellow-400 text-black font-semibold" : "hover:bg-yellow-500/10" }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-8 lg:mt-10 w-full border border-red-500/30 text-red-400 py-2.5 lg:py-3 rounded-lg hover:bg-red-500/10 text-sm lg:text-base"
      >
        Logout
      </button>
    </>
  );

  return (
    <>
      <div className="lg:hidden sticky top-0 z-40 bg-neutral-950 border-b border-yellow-500/20 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-yellow-400 font-bold">FFOI Admin</p>
          <p className="text-xs text-gray-400">Management Panel</p>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="text-white p-2 rounded-lg hover:bg-white/10"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Tutup menu admin" : "Buka menu admin"}
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
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto w-72 max-w-[85vw] bg-neutral-950 border-r border-yellow-500/20 h-screen p-6 overflow-y-auto transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
