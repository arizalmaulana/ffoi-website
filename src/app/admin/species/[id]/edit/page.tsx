"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  useParams,
  useRouter,
} from "next/navigation";


import {
  getSpeciesById,
  updateSpecies,
} from "@/services/species.service";

import { Species }
from "@/types/species";

export default function EditSpeciesPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState<{
        species: string;
        nama_lokal: string;
        nama_internasional: string;
        ordo: string;
        family: string;
        occurrence:
        | "native"
        | "endemic"
        | "introduced"
        | "invasive";
        status_konservasi: string;
        deskripsi: string;
    }>({
        species: "",
        nama_lokal: "",
        nama_internasional: "",
        ordo: "",
        family: "",
        occurrence: "native",
        status_konservasi: "",
        deskripsi: "",
    });

  useEffect(() => {

    async function loadData() {

      const data =
        await getSpeciesById(
          params.id as string
        );

      if (!data) {
        router.push(
          "/admin/species"
        );
        return;
      }

      setForm({
        species:
          data.species,

        nama_lokal:
          data.nama_lokal ?? "",

        nama_internasional:
          data.nama_internasional ?? "",

        ordo:
          data.ordo,

        family:
          data.family,

        occurrence:
          data.occurrence,

        status_konservasi:
          data.status_konservasi ?? "",

        deskripsi:
          data.deskripsi ?? "",
      });

      setLoading(false);
    }

    loadData();

  }, [params.id, router]);

  function validateForm() {

    if (!form.species) {
      alert(
        "Species wajib diisi"
      );
      return false;
    }

    if (!form.ordo) {
      alert(
        "Ordo wajib diisi"
      );
      return false;
    }

    if (!form.family) {
      alert(
        "Family wajib diisi"
      );
      return false;
    }

    return true;
  }

  async function handleSubmit() {

    if (!validateForm()) {
      return;
    }

    try {

      setSaving(true);

      await updateSpecies(
        params.id as string,
        {
            species: form.species,
            nama_lokal:
            form.nama_lokal || null,
            nama_internasional:
            form.nama_internasional ||
            null,
            ordo: form.ordo,
            family: form.family,
            occurrence:
            form.occurrence,
            status_konservasi:
            form.status_konservasi ||
            null,
            deskripsi:
            form.deskripsi || null,
        }
        );

      alert(
        "Species berhasil diperbarui"
      );

      router.push(
        `/admin/species/${params.id}`
      );

      router.refresh();

    } catch (error) {

      console.error(error);

      alert(
        "Gagal memperbarui species"
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

  return (
    <div>

        <Link
        href={`/admin/species/${params.id}`}
        className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6"
        >
        ← Kembali ke Detail Species
        </Link>

        <h1
        className="text-4xl font-bold mb-8"
        >
        Edit Species
        </h1>

      <div
        className="bg-neutral-950 border border-yellow-500/20 rounded-xl p-8"
      >

        <div className="space-y-4">

          <input
            value={form.species}
            onChange={(e) =>
              setForm({
                ...form,
                species:
                  e.target.value,
              })
            }
            placeholder="Species"
            className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          />

          <input
            value={form.nama_lokal}
            onChange={(e) =>
              setForm({
                ...form,
                nama_lokal:
                  e.target.value,
              })
            }
            placeholder="Nama Lokal"
            className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          />

          <input
            value={
              form.nama_internasional
            }
            onChange={(e) =>
              setForm({
                ...form,
                nama_internasional:
                  e.target.value,
              })
            }
            placeholder="Nama Internasional"
            className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          />

          <input
            value={form.ordo}
            onChange={(e) =>
              setForm({
                ...form,
                ordo:
                  e.target.value,
              })
            }
            placeholder="Ordo"
            className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          />

          <input
            value={form.family}
            onChange={(e) =>
              setForm({
                ...form,
                family:
                  e.target.value,
              })
            }
            placeholder="Family"
            className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          />

          <select
            value={form.occurrence}
            onChange={(e) =>
                setForm({
                ...form,
                occurrence:
                    e.target.value as
                    | "native"
                    | "endemic"
                    | "introduced"
                    | "invasive",
                })
            }
            >
            <option value="native">
              Native
            </option>

            <option value="endemic">
              Endemic
            </option>

            <option value="introduced">
              Introduced
            </option>

            <option value="invasive">
              Invasive
            </option>
          </select>

          <input
            value={
              form.status_konservasi
            }
            onChange={(e) =>
              setForm({
                ...form,
                status_konservasi:
                  e.target.value,
              })
            }
            placeholder="Status Konservasi"
            className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          />

          <textarea
            rows={6}
            value={
              form.deskripsi
            }
            onChange={(e) =>
              setForm({
                ...form,
                deskripsi:
                  e.target.value,
              })
            }
            placeholder="Deskripsi"
            className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          />

          <button
            onClick={
              handleSubmit
            }
            disabled={saving}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {saving
              ? "Menyimpan..."
              : "Simpan Perubahan"}
          </button>

        </div>

      </div>

    </div>
  );
}