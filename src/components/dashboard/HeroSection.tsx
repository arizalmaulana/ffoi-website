import { Profile } from "@/types/profile";
import Link from "next/link";

interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({
  profile,
}: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-yellow-500/20 min-h-[420px] bg-[url('/images/dashboard-user.png')] bg-cover bg-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />

      {/* Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center h-full max-w-3xl">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-medium w-fit mb-6"
        >
          🌿 Kontributor FFOI
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Halo,{" "}
          <span className="text-yellow-400">
            {profile.nama_lengkap}
          </span>
          👋
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
          Terima kasih telah berkontribusi dalam penelitian,
          dokumentasi, dan konservasi ikan asli Indonesia.
          Setiap sighting yang Anda laporkan membantu
          melindungi biodiversitas perairan Indonesia.
        </p>

        {/* Member Since */}
        <div
          className="mt-6 text-sm text-gray-400"
          suppressHydrationWarning
        >
          Bergabung sejak{" "}
          <span className="text-yellow-400 font-medium">
            {new Date(
              profile.dibuat_pada
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 mt-8">

          <Link
            href="/dashboard/sighting/create"
            className="inline-flex items-center gap-2 bg-yellow-400 text-black px-7 py-3.5 rounded-xl font-bold transition-all duration-300 hover:bg-yellow-300 hover:-translate-y-1"
          >
            + Tambah Sighting
          </Link>

          <Link
            href="/dashboard/sighting"
            className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur-sm text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-white/10"
          >
            Lihat Sighting Saya
          </Link>

        </div>

      </div>
    </section>
  );
}