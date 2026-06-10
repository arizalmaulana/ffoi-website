"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter }
from "next/navigation";

import {
  getProfile,
  updateProfile,
} from "@/services/profile.service";

import {
  uploadProfileImage,
} from "@/services/profile-image.service";

export default function EditProfilePage() {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const [
    namaLengkap,
    setNamaLengkap,
  ] = useState("");

  const [bio, setBio] =
    useState("");

  const [
    fotoProfil,
    setFotoProfil,
  ] = useState<string | null>(
    null
  );

  const [
    imageFile,
    setImageFile,
  ] = useState<File | null>(
    null
  );

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const profile = await getProfile();

        if (!active) return;

        if (!profile) {
          router.push("/login");
          return;
        }

        setUsername(profile.username ?? "");
        setNamaLengkap(profile.nama_lengkap ?? "");
        setBio(profile.bio ?? "");
        setFotoProfil(profile.foto_profil);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, [router]);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setSaving(true);

      let imageUrl =
        fotoProfil;

      if (imageFile) {

        imageUrl =
          await uploadProfileImage(
            imageFile
          );
      }

      await updateProfile({
        username,
        nama_lengkap:
          namaLengkap,
        bio,
        foto_profil:
          imageUrl,
      });

      alert(
        "Profil berhasil diperbarui"
      );

      router.push(
        "/profile"
      );

      router.refresh();

    } catch (error) {

      console.error(error);

      alert(
        "Gagal memperbarui profil"
      );

    } finally {

      setSaving(false);

    }
  }

  if (loading) {

    return (
      <div
        className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        "
      >
        Memuat...
      </div>
    );
  }

  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      "
    >

      <div
        className="
        max-w-3xl
        mx-auto
        px-6
        py-10
        "
      >

        {/* FORM */}

        <form
            onSubmit={handleSubmit}
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-2xl
            p-8
            space-y-6
            "
            >

            <div>

                <h1
                className="
                text-3xl
                font-bold
                "
                >
                Edit Profil
                </h1>

                <p
                className="
                text-gray-400
                mt-2
                "
                >
                Perbarui informasi akun Anda.
                </p>

            </div>

            {/* FOTO PROFIL */}

            <div>

                <label
                className="
                block
                text-sm
                mb-3
                "
                >
                Foto Profil
                </label>

                <div
                className="
                flex
                items-center
                gap-5
                "
                >

                <img
                    src={
                    imageFile
                        ? URL.createObjectURL(
                            imageFile
                        )
                        : fotoProfil ??
                        "/images/avatar-default.png"
                    }
                    alt="Preview"
                    className="
                    w-28
                    h-28
                    rounded-full
                    object-cover
                    border
                    border-yellow-500/20
                    "
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                    setImageFile(
                        e.target.files?.[0] ??
                        null
                    )
                    }
                    className="
                    text-sm
                    text-gray-400
                    "
                />

                </div>

            </div>

            {/* USERNAME */}

            <div>

                <label
                className="
                block
                text-sm
                mb-2
                "
                >
                Username
                </label>

                <input
                value={username}
                onChange={(e) =>
                    setUsername(
                    e.target.value
                    )
                }
                className="
                w-full
                bg-black
                border
                border-yellow-500/20
                rounded-xl
                p-4
                outline-none
                "
                required
                />

            </div>

            {/* NAMA LENGKAP */}

            <div>

                <label
                className="
                block
                text-sm
                mb-2
                "
                >
                Nama Lengkap
                </label>

                <input
                value={namaLengkap}
                onChange={(e) =>
                    setNamaLengkap(
                    e.target.value
                    )
                }
                className="
                w-full
                bg-black
                border
                border-yellow-500/20
                rounded-xl
                p-4
                outline-none
                "
                required
                />

            </div>

            {/* BIO */}

            <div>

                <label
                className="
                block
                text-sm
                mb-2
                "
                >
                Bio
                </label>

                <textarea
                rows={5}
                value={bio}
                onChange={(e) =>
                    setBio(
                    e.target.value
                    )
                }
                className="
                w-full
                bg-black
                border
                border-yellow-500/20
                rounded-xl
                p-4
                outline-none
                resize-none
                "
                placeholder="Ceritakan sedikit tentang diri Anda..."
                />

            </div>

            {/* ACTION */}

            <div
                className="
                flex
                gap-4
                pt-4
                "
            >

                <button
                type="submit"
                disabled={saving}
                className="
                bg-yellow-400
                text-black
                px-6
                py-3
                rounded-xl
                font-semibold
                disabled:opacity-50
                "
                >
                {saving
                    ? "Menyimpan..."
                    : "Simpan Perubahan"}
                </button>

                <button
                type="button"
                onClick={() =>
                    router.back()
                }
                className="
                border
                border-yellow-500/20
                px-6
                py-3
                rounded-xl
                "
                >
                Batal
                </button>

            </div>

            </form>

      </div>

    </main>

  );
}