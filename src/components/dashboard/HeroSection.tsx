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
      className="
      relative
      overflow-hidden
      rounded-2xl
      border
      border-yellow-500/20
      min-h-[400px]
      bg-[url('/images/dashboard-user.png')]
      bg-cover
      bg-center
      "
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 p-6 sm:p-10 max-w-xl">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
          Halo, {profile.nama_lengkap}! 👋
        </h1>

        <p className="text-yellow-400 text-xl sm:text-2xl font-semibold mb-6">
          Kontributor Freshwater Fish of Indonesia
        </p>

        <p className="text-gray-300 leading-8 mb-6">
          Terima kasih telah berkontribusi dalam penelitian,
          dokumentasi, dan konservasi ikan asli Indonesia.
          Setiap laporan Anda sangat berarti untuk masa depan
          perairan kita.
        </p>

        <p className="text-gray-400 mb-8" suppressHydrationWarning>
          Bergabung sejak{" "}
          {new Date(profile.dibuat_pada).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <Link href="/dashboard/sighting/create"
          className="
          bg-yellow-400
          hover:bg-yellow-300
          text-black
          font-bold
          px-6
          py-3
          rounded-lg
          transition
          "
        >
          + Tambah Sighting
        </Link>
      </div>
    </section>
  );
}