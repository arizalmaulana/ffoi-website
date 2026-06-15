import { Profile } from "@/types/profile";
import Link from "next/link";

interface ProfileSectionProps {
  profile: Profile;
}

export default function ProfileSection({
  profile,
}: ProfileSectionProps) {
  return (
    <section
      className="bg-neutral-950 border border-yellow-500/20 rounded-2xl p-6 sm:p-8"
    >
      <h2
        className="text-yellow-400 text-xl sm:text-2xl font-bold mb-8"
      >
        Profil Saya
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 mb-4">

        {/* FOTO */}
        <div>
          <img
            src={
              profile.foto_profil ||
              "/avatar-kosong.png"
            }
            alt={profile.nama_lengkap}
            className="w-40 h-40 rounded-full object-cover border border-yellow-500/30"
          />
        </div>

        {/* DATA */}
        <div className="flex-1 space-y-4">

          <ProfileRow
            label="Nama Lengkap"
            value={profile.nama_lengkap}
          />

          <ProfileRow
            label="Username"
            value={profile.username}
          />

          <ProfileRow
            label="Email"
            value={profile.email}
          />

          <ProfileRow
            label="Role"
            value={profile.role === "pengguna" ? "Citizen Ichthyologist" : profile.role}
          />

          <ProfileRow
            label="Bergabung Sejak"
            value={new Date(profile.dibuat_pada).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            suppressHydrationWarning
          />

          <ProfileRow
            label="Bio"
            value={
              profile.bio ||
              "Belum ada bio."
            }
          />

        </div>
      </div>

      <Link

        href="/profile/edit"
        className="mt-8 px-5 py-3 rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
      >
        Edit Profil
      </Link>
    </section>
  );
}

function ProfileRow({
  label,
  value,
  suppressHydrationWarning,
}: {
  label: string;
  value: string;
  suppressHydrationWarning?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4">
      <span className="text-gray-400 text-sm sm:text-base">
        {label}
      </span>

      <span
        className="text-white text-sm sm:text-base break-words"
        suppressHydrationWarning={suppressHydrationWarning}
      >
        {value}
      </span>
    </div>
  );
}