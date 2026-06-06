"use client";

import Link from "next/link";
import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

import { Sighting } from "@/types/sighting";

import {
  getMySightingById,
  deleteSighting,
} from "@/services/sighting.service";

import SightingStatusBadge from "@/components/sighting/SightingStatusBadge";

export default function SightingDetailPage() {
  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [sighting, setSighting] =
    useState<Sighting | null>(null);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const data =
        await getMySightingById(
          params.id as string,
          user.id
        );

      setSighting(data);

      setLoading(false);
    }

    loadData();
  }, [params.id]);

  async function handleDelete() {
    const confirmed =
      window.confirm(
        "Yakin ingin menghapus sighting ini?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      await deleteSighting(
        sighting!.id,
        user.id
      );

      alert(
        "Sighting berhasil dihapus"
      );

      router.push(
        "/dashboard/sighting"
      );

      router.refresh();

    } catch (error) {
      console.error(error);

      alert(
        "Gagal menghapus sighting"
      );
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <div className="max-w-6xl mx-auto">
          Memuat data...
        </div>
      </main>
    );
  }

  if (!sighting) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-bold mb-4">
            Data Tidak Ditemukan
          </h1>

          <p className="text-gray-400 mb-6">
            Anda tidak memiliki akses
            ke sighting ini atau data
            sudah dihapus.
          </p>

          <Link
            href="/dashboard/sighting"
            className="
            text-yellow-400
            hover:underline
            "
          >
            Kembali ke Sighting Saya
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-10 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Detail Sighting
            </h1>

            <p className="text-gray-400 mt-2">
              Informasi lengkap hasil
              pengamatan organisme.
            </p>
          </div>

          <Link
            href="/dashboard/sighting"
            className="
            border
            border-yellow-500/20
            px-5
            py-3
            rounded-lg
            hover:border-yellow-400
            transition
            "
          >
            ← Kembali
          </Link>

        </div>

        <div
          className="
          bg-neutral-950
          border
          border-yellow-500/20
          rounded-xl
          overflow-hidden
          "
        >

          {/* Foto */}
          <img
            src={
              sighting.foto_url ??
              "/images/fish-placeholder.jpg"
            }
            alt={
              sighting.nama_lokal ??
              "Sighting"
            }
            className="
            w-full
            h-[500px]
            object-cover
            "
          />

          <div className="p-8">

            {/* Nama */}
            <div className="mb-6">

              <h2 className="text-4xl font-bold">
                {sighting.nama_lokal ??
                  "Tanpa Nama Lokal"}
              </h2>

              <p
                className="
                text-xl
                italic
                text-gray-400
                mt-2
                "
              >
                {sighting.nama_ilmiah}
              </p>

            </div>

            {/* Status */}
            <div className="mb-6">
              <SightingStatusBadge
                status={
                  sighting.status
                }
              />
            </div>

            

            {/* Data */}
            <div
              className="
              grid
              grid-cols-2
              gap-6
              "
            >

              <div>
                <p className="text-gray-400 mb-1">
                  Organisme
                </p>

                <p>
                  {
                    sighting.tipe_organisme
                  }
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">
                  Tanggal Temuan
                </p>

                <p>
                  {new Date(
                    sighting.tanggal_temuan
                  ).toLocaleDateString(
                    "id-ID"
                  )}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">
                  Lokasi
                </p>

                <p>
                  {
                    sighting.nama_lokasi
                  }
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">
                  Provinsi
                </p>

                <p>
                  {
                    sighting.provinsi
                  }
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">
                  Latitude
                </p>

                <p>
                  {
                    sighting.latitude
                  }
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">
                  Longitude
                </p>

                <p>
                  {
                    sighting.longitude
                  }
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">
                  Habitat
                </p>

                <p>
                  {
                    sighting.habitat
                  }
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">
                  Substrat
                </p>

                <p>
                  {
                    sighting.substrat
                  }
                </p>
              </div>

            </div>

            {/* Deskripsi */}
            <div className="mt-10">

              <h3 className="text-xl font-semibold mb-3">
                Deskripsi
              </h3>

              <div
                className="
                bg-black
                border
                border-yellow-500/10
                rounded-lg
                p-5
                "
              >
                {sighting.deskripsi ? (
                  <p className="leading-relaxed">
                    {
                      sighting.deskripsi
                    }
                  </p>
                ) : (
                  <p className="text-gray-500">
                    Tidak ada deskripsi.
                  </p>
                )}
              </div>

            </div>

            {/* Metadata */}
            <div
              className="
              mt-8
              pt-6
              border-t
              border-yellow-500/10
              "
            >

              <p className="text-sm text-gray-500">
                Dibuat:
                {" "}
                {new Date(
                  sighting.dibuat_pada
                ).toLocaleString(
                  "id-ID"
                )}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Diperbarui:
                {" "}
                {new Date(
                  sighting.diperbarui_pada
                ).toLocaleString(
                  "id-ID"
                )}
              </p>

            </div>

            {/* Tombol Aksi */}
            {sighting.status !==
              "disetujui" && (
              <div className="flex gap-4 mb-8 mt-6">

                <Link
                  href={`/dashboard/sighting/${sighting.id}/edit`}
                  className="
                  bg-yellow-400
                  text-black
                  px-5
                  py-3
                  rounded-lg
                  font-semibold
                  hover:opacity-90
                  transition
                  "
                >
                  Edit Sighting
                </Link>

                <button
                  onClick={
                    handleDelete
                  }
                  className="
                  bg-red-500
                  text-white
                  px-5
                  py-3
                  rounded-lg
                  font-semibold
                  hover:bg-red-600
                  transition
                  "
                >
                  Hapus Sighting
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}