"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Link from "next/link";

import {
  createSpecies,
} from "@/services/species.service";

export default function CreateSpeciesPage() {

  const router =
    useRouter();

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({
        species: "",

        nama_lokal: "",

        nama_internasional: "",

        ordo: "",

        family: "",

        occurrence: "native" as
        | "native"
        | "endemic"
        | "introduced"
        | "invasive",

        status_konservasi: "",

        deskripsi: "",
    });

  async function handleSubmit(
    e: React.FormEvent
    ) {

    e.preventDefault();

    try {

        setSaving(true);

        await createSpecies({
        ...form,
        });

        alert(
        "Species berhasil ditambahkan"
        );

        router.push(
        "/admin/species"
        );

    } catch (error) {

        console.error(error);

        alert(
        "Gagal menambahkan species"
        );

    } finally {

        setSaving(false);

    }
    }

  return (
    <div>

      <Link
        href="/admin/species"
        className="
        text-yellow-400
        mb-6
        inline-block
        "
      >
        ← Kembali
      </Link>

      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Tambah Species
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="
        bg-neutral-950
        border
        border-yellow-500/20
        rounded-xl
        p-8
        space-y-5
        "
      >

        <input
          placeholder="Nama Ilmiah"
          value={form.species}
          onChange={(e) =>
            setForm({
              ...form,
              species:
                e.target.value,
            })
          }
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          required
        />

        <input
          placeholder="Nama Lokal"
          value={
            form.nama_lokal
          }
          onChange={(e) =>
            setForm({
              ...form,
              nama_lokal:
                e.target.value,
            })
          }
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
        />

        <input
          placeholder="Nama Internasional"
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
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
        />

        <input
          placeholder="Ordo"
          value={form.ordo}
          onChange={(e) =>
            setForm({
              ...form,
              ordo:
                e.target.value,
            })
          }
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          required
        />

        <input
          placeholder="Family"
          value={
            form.family
          }
          onChange={(e) =>
            setForm({
              ...form,
              family:
                e.target.value,
            })
          }
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          required
        />

        <select
          value={
            form.occurrence
          }
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
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
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

        <select
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
        className="
        w-full
        bg-black
        border
        border-yellow-500/20
        rounded-lg
        p-3
        "
        >

        <option value="">
            Pilih Status Konservasi
        </option>

        <option value="LC">
            Least Concern (LC)
        </option>

        <option value="NT">
            Near Threatened (NT)
        </option>

        <option value="VU">
            Vulnerable (VU)
        </option>

        <option value="EN">
            Endangered (EN)
        </option>

        <option value="CR">
            Critically Endangered (CR)
        </option>

        <option value="DD">
            Data Deficient (DD)
        </option>

        <option value="NE">
            Not Evaluated (NE)
        </option>

        </select>

        <textarea
          placeholder="Deskripsi"
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
          rows={5}
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
        />

        <button
          type="submit"
          disabled={saving}
          className="
          bg-yellow-400
          text-black
          px-6
          py-3
          rounded-lg
          font-semibold
          "
        >
          {saving
            ? "Menyimpan..."
            : "Simpan Species"}
        </button>

      </form>

    </div>
  );
}