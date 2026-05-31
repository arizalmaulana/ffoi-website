"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-5 text-white">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3">
            <img src="/logo/Logo FFOI Transparan.png" className="w-10" />
            <div className="text-sm leading-tight">
            <p className="font-bold">FFOI</p>
            <p className="text-yellow-400 text-xs">
                Yayasan Freshwater Fish of Indonesia
            </p>
            </div>
        </div>

        {/* MENU */}
        <div className="flex gap-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/tentang">Tentang</Link>
            <Link href="/program">Program</Link>
            <Link href="/database">Database</Link>
            <Link href="/kontak">Kontak</Link>
        </div>

        <Link
            href="/login"
            className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold"
        >
            Login
        </Link>

        </nav>
    );
}