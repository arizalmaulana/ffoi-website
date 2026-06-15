"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  getSpeciesById,
  deleteSpecies,
} from "@/services/species.service";

import { Species }
from "@/types/species";

export default function SpeciesDetailPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [species, setSpecies] =
    useState<Species | null>(
      null
    );

  useEffect(() => {

    async function loadData() {

      const data =
        await getSpeciesById(
          params.id as string
        );

      setSpecies(data);

      setLoading(false);
    }

    loadData();

  }, [params.id]);

  async function handleDelete() {

    if (!species) return;

    const confirmed =
      confirm(
        "Yakin ingin menghapus species ini?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await deleteSpecies(
        species.id
      );

      alert(
        "Species berhasil dihapus"
      );

      router.push(
        "/admin/species"
      );

      router.refresh();

    } catch (error) {

      console.error(error);

      alert(
        "Gagal menghapus species"
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

  if (!species) {
    return (
      <div>
        Species tidak ditemukan
      </div>
    );
  }

 return (
  <div>

    <Link
      href="/admin/species"
      className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-6"
    >
      ← Kembali ke Database Species
    </Link>

    <div
      className="flex justify-between items-center mb-8"
    >

      <div>

        <h1
          className="text-4xl font-bold"
        >
          {species.species}
        </h1>

        <p
          className="text-gray-400 mt-2"
        >
          Detail species
        </p>

      </div>

      <div
        className="flex gap-3"
      >

        <Link
          href={`/admin/species/${species.id}/edit`}
          className="bg-yellow-400 text-black px-5 py-3 rounded-lg font-semibold"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-600 px-5 py-3 rounded-lg font-semibold"
        >
          Hapus
        </button>

      </div>

    </div>

      <div
        className="bg-neutral-950 border border-yellow-500/20 rounded-xl p-8"
      >

        <div className="space-y-5">

          <p>
            <b>Nama Ilmiah:</b>{" "}
            {species.species}
          </p>

          <p>
            <b>Nama Lokal:</b>{" "}
            {species.nama_lokal ??
              "-"}
          </p>

          <p>
            <b>Nama Internasional:</b>{" "}
            {species.nama_internasional ??
              "-"}
          </p>

          <p>
            <b>Ordo:</b>{" "}
            {species.ordo}
          </p>

          <p>
            <b>Family:</b>{" "}
            {species.family}
          </p>

          <p>
            <b>Occurrence:</b>{" "}
            {species.occurrence}
          </p>

          <p>
            <b>Status Konservasi:</b>{" "}
            {species.status_konservasi ??
              "-"}
          </p>

          <p>
            <b>Deskripsi:</b>{" "}
            {species.deskripsi ??
              "-"}
          </p>

        </div>

      </div>

    </div>
  );
}