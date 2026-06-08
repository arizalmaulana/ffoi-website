"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  deleteSightingAdmin,
} from "@/services/sighting.service";
import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  getSightingById,
  reviewSighting,
} from "@/services/sighting.service";

import { Sighting } from "@/types/sighting";

export default function AdminReviewPage() {
  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [catatan, setCatatan] =
    useState("");

  const [sighting, setSighting] =
    useState<Sighting | null>(null);

  useEffect(() => {
    async function loadData() {
      const data =
        await getSightingById(
          params.id as string
        );

      setSighting(data);

      setLoading(false);
    }

    loadData();
  }, [params.id]);

  async function handleReview(
    status:
      | "disetujui"
      | "ditolak"
  ) {
    try {

      if (
        status === "ditolak" &&
        !catatan.trim()
      ) {
        alert(
          "Catatan penolakan wajib diisi"
        );

        return;
      }

      setSaving(true);

      await reviewSighting(
        sighting!.id,
        status,
        catatan
      );

      alert(
        `Sighting berhasil ${status}`
      );

      router.push(
        "/admin/sighting"
      );

      router.refresh();

    } catch (error) {

      console.error(error);

      alert(
        "Gagal menyimpan review"
      );

    } finally {

      setSaving(false);

    }
  }

  async function handleDelete() {

    const confirmed =
      window.confirm(
        "Hapus sighting ini?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await deleteSightingAdmin(
        sighting!.id
      );

      alert(
        "Sighting berhasil dihapus"
      );

      router.push(
        "/admin/sighting"
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
      <div>
        Memuat data...
      </div>
    );
  }

  if (!sighting) {
    return (
      <div>
        Data tidak ditemukan
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <Link
        href="/admin/sighting"
        className="
        inline-flex
        items-center
        gap-2
        text-yellow-400
        hover:text-yellow-300
        mb-6
        "
      >
        ← Kembali ke Review Sighting
      </Link>

      <h1 className="text-4xl font-bold mb-8">
        Review Sighting
      </h1>

      <div
        className="
        bg-neutral-950
        border
        border-yellow-500/20
        rounded-xl
        overflow-hidden
        "
      >

        {sighting.foto_url && (
          <Image
            src={sighting.foto_url}
            alt={
              sighting.nama_ilmiah ??
              ""
            }
            width={1200}
            height={500}
            priority
            className="
            w-full
            h-125
            object-cover
            "
          />
        )}

        <div className="p-8">

          <h2 className="text-3xl font-bold">
            {sighting.nama_lokal}
          </h2>

          <p
            className="
            italic
            text-gray-400
            mt-2
            "
          >
            {sighting.nama_ilmiah}
          </p>

          <div
            className="
            grid
            md:grid-cols-2
            gap-6
            mt-8
            "
          >

            <div>
              <p className="text-gray-400">
                Lokasi
              </p>

              <p>
                {
                  sighting.nama_lokasi
                }
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Provinsi
              </p>

              <p>
                {sighting.provinsi}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Habitat
              </p>

              <p>
                {sighting.habitat}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Substrat
              </p>

              <p>
                {sighting.substrat}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Latitude
              </p>

              <p>
                {sighting.latitude}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Longitude
              </p>

              <p>
                {sighting.longitude}
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Tanggal Temuan
              </p>

              <p>
                {
                  sighting.tanggal_temuan
                }
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Status
              </p>

              <p>
                {sighting.status}
              </p>
            </div>

          </div>

          <div className="mt-8">

            <h3
              className="
              font-semibold
              mb-2
              "
            >
              Deskripsi
            </h3>

            <p className="leading-relaxed">
              {
                sighting.deskripsi
              }
            </p>

          </div>

          <div className="mt-8">

            <label className="block mb-2">
              Catatan Admin
            </label>

            <textarea
              rows={5}
              value={catatan}
              onChange={(e) =>
                setCatatan(
                  e.target.value
                )
              }
              className="
              w-full
              bg-black
              border
              border-yellow-500/20
              rounded-lg
              p-4
              "
              placeholder="Alasan penolakan atau catatan tambahan..."
            />

          </div>

          <div className="mt-8 space-y-4">

            <div className="flex flex-wrap gap-3">

              <Link
                href={`/admin/sighting/${sighting.id}/edit`}
                className="
                bg-yellow-400
                text-black
                px-6
                py-3
                rounded-xl
                font-semibold
                hover:bg-yellow-300
                transition
                "
              >
                Edit Data
              </Link>

              <button
                disabled={saving}
                onClick={() =>
                  handleReview("disetujui")
                }
                className="
                bg-green-600
                hover:bg-green-300
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                transition
                "
              >
                Setujui
              </button>

              <button
                disabled={saving}
                onClick={() =>
                  handleReview("ditolak")
                }
                className="
                bg-red-600
                hover:bg-red-500
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                transition
                "
              >
                Tolak
              </button>

            </div>

            <div>

              <button
                onClick={handleDelete}
                className="
                text-red-400
                border
                border-red-500/30
                px-6
                py-3
                rounded-xl
                hover:bg-red-500/10
                transition
                "
              >
                Hapus Sighting
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}