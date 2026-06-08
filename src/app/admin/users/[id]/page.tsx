"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  getUserById,
  updateUserRole,
  deleteUser,
} from "@/services/admin-user.service";

import { Profile }
from "@/types/profile";

import {
  getProfile,
} from "@/services/profile.service";

export default function UserDetailPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [user, setUser] =
    useState<Profile | null>(
      null
    );

    const [
    currentUserId,
    setCurrentUserId,
    ] = useState("");

  const [role, setRole] =
    useState<
      "admin" | "pengguna"
    >("pengguna");

  useEffect(() => {

    async function loadData() {
        const currentProfile =
        await getProfile();

        if (currentProfile) {

        setCurrentUserId(
            currentProfile.id
        );

        }

      const data =
        await getUserById(
          params.id as string
        );

      if (!data) {

        router.push(
          "/admin/users"
        );

        return;
      }

      setUser(data);

      setRole(data.role);

      setLoading(false);
    }

    loadData();

  }, [params.id, router]);

  async function handleSave() {

    if (!user) return;

    try {

      setSaving(true);

      await updateUserRole(
        user.id,
        role
      );

      alert(
        "Role berhasil diperbarui"
      );

      router.refresh();

    } catch (error) {

      console.error(error);

      alert(
        "Gagal memperbarui role"
      );

    } finally {

      setSaving(false);

    }
  }

  async function handleDelete() {

    if (!user) return;

    const confirmed =
        window.confirm(
        `Yakin ingin menghapus user ${user.username}?`
        );

    if (!confirmed) {
        return;
    }

    try {

        setSaving(true);

        await deleteUser(
        user.id
        );

        alert(
        "User berhasil dihapus"
        );

        router.push(
        "/admin/users"
        );

    } catch (error) {

        console.error(error);

        alert(
        "Gagal menghapus user"
        );

    } finally {

        setSaving(false);

    }
    }

  if (loading) {
    return (
      <div>
        Memuat data...
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        User tidak ditemukan
      </div>
    );
  }

  return (
    <div>

      <Link
        href="/admin/users"
        className="
        inline-flex
        items-center
        gap-2
        text-yellow-400
        hover:text-yellow-300
        mb-6
        "
      >
        ← Kembali ke Users
      </Link>

      <div
        className="
        bg-neutral-950
        border
        border-yellow-500/20
        rounded-xl
        p-8
        "
      >

        <h1
          className="
          text-4xl
          font-bold
          mb-8
          "
        >
          Detail Pengguna
        </h1>

        <div className="space-y-5">

          <div>

            <p className="text-gray-400">
              Username
            </p>

            <p className="text-xl">
              {user.username}
            </p>

          </div>

          <div>

            <p className="text-gray-400">
              Nama Lengkap
            </p>

            <p className="text-xl">
              {user.nama_lengkap}
            </p>

          </div>

          <div>

            <p className="text-gray-400">
              Email
            </p>

            <p className="text-xl">
              {user.email}
            </p>

          </div>

          <div>

            <p className="text-gray-400 mb-2">
              Role
            </p>

            <select
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value as
                    | "admin"
                    | "pengguna"
                )
              }
              className="
              bg-black
              border
              border-yellow-500/20
              rounded-lg
              px-4
              py-3
              "
            >

              <option value="pengguna">
                Pengguna
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>

          <div className="pt-6 flex items-center gap-4">

          <button
            onClick={handleSave}
            disabled={saving}
            className="
            bg-yellow-400
            text-black
            px-6
            py-3
            rounded-lg
            font-semibold
            disabled:opacity-50
            "
          >
            {saving
              ? "Menyimpan..."
              : "Simpan Perubahan"}
          </button>

          <button
            onClick={handleDelete}
            disabled={
            saving ||
            currentUserId ===
            user.id
            }
            className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-6
            py-3
            rounded-lg
            font-semibold
            ml-3
            disabled:opacity-50 
            "
            >
            {
            currentUserId ===
            user.id
                ? "Tidak Bisa Menghapus Diri Sendiri"
                : "Hapus Pengguna"
            }
            </button>

            </div>

        </div>

      </div>

    </div>
  );
}