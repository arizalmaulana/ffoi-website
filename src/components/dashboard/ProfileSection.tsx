import { Profile } from "@/types/profile";

interface ProfileSectionProps {
  profile: Profile;
}

export default function ProfileSection({
  profile,
}: ProfileSectionProps) {
  return (
    <section
      className="
      bg-neutral-950
      border
      border-yellow-500/20
      rounded-2xl
      p-8
      "
    >
      <h2
        className="
        text-yellow-400
        text-2xl
        font-bold
        mb-8
        "
      >
        Profil Saya
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* FOTO */}
        <div>
          <img
            src={
              profile.foto_profil ||
              "/images/foto-profil.jpg"
            }
            alt={profile.nama_lengkap}
            className="
            w-40
            h-40
            rounded-full
            object-cover
            border
            border-yellow-500/30
            "
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
            value={profile.role}
          />

          <ProfileRow
            label="Bergabung Sejak"
            value={new Date(
              profile.dibuat_pada
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
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

      <button
        className="
        mt-8
        px-5
        py-3
        rounded-lg
        border
        border-yellow-400
        text-yellow-400
        hover:bg-yellow-400
        hover:text-black
        transition
        "
      >
        Edit Profil
      </button>
    </section>
  );
}

function ProfileRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[180px_1fr]">
      <span className="text-gray-400">
        {label}
      </span>

      <span className="text-white">
        {value}
      </span>
    </div>
  );
}