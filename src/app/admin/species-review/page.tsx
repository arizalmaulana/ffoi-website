"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  getSpeciesReviewList,
} from "@/services/admin-species.service";

import { Sighting } from "@/types/sighting";
import SightingStatusBadge from "@/components/sighting/SightingStatusBadge";

export default function SpeciesReviewPage() {

  const [loading, setLoading] =
    useState(true);

  const [data, setData] =
    useState<Sighting[]>([]);

  const [filter, setFilter] =
    useState("semua");

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const result = await getSpeciesReviewList();
        if (active) setData(result);
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
  }, []);

  const filteredData =
    filter === "semua"
      ? data
      : data.filter(
          (item) =>
            item.status === filter
        );

  const totalMenunggu =
    data.filter(
      (item) =>
        item.status ===
        "menunggu"
    ).length;

  const totalDisetujui =
    data.filter(
      (item) =>
        item.status ===
        "disetujui"
    ).length;

  const totalDitolak =
    data.filter(
      (item) =>
        item.status ===
        "ditolak"
    ).length;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl bg-neutral-950 p-6 text-center text-gray-400">
          Memuat...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold mb-6">
        Review Species Baru
      </h1>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          type="button"
          onClick={() => setFilter("semua")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${ filter === "semua" ? "bg-yellow-400 text-black" : "bg-neutral-900 text-white hover:bg-neutral-800" }`}
        >
          Semua
        </button>

        <button
          type="button"
          onClick={() => setFilter("menunggu")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${ filter === "menunggu" ? "bg-yellow-400 text-black" : "bg-neutral-900 text-white hover:bg-neutral-800" }`}
        >
          Menunggu
        </button>

        <button
          type="button"
          onClick={() => setFilter("disetujui")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${ filter === "disetujui" ? "bg-yellow-400 text-black" : "bg-neutral-900 text-white hover:bg-neutral-800" }`}
        >
          Disetujui
        </button>

        <button
          type="button"
          onClick={() => setFilter("ditolak")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${ filter === "ditolak" ? "bg-yellow-400 text-black" : "bg-neutral-900 text-white hover:bg-neutral-800" }`}
        >
          Ditolak
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="rounded-2xl border border-yellow-500/20 bg-neutral-950 p-4 text-sm text-gray-300">
          <div className="text-gray-400">Total Species Baru</div>
          <div className="mt-2 text-2xl font-semibold text-white">{data.length}</div>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-neutral-950 p-4 text-sm text-gray-300">
          <div className="text-gray-400">Menunggu</div>
          <div className="mt-2 text-2xl font-semibold text-yellow-300">{totalMenunggu}</div>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-neutral-950 p-4 text-sm text-gray-300">
          <div className="text-gray-400">Disetujui</div>
          <div className="mt-2 text-2xl font-semibold text-green-300">{totalDisetujui}</div>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-neutral-950 p-4 text-sm text-gray-300">
          <div className="text-gray-400">Ditolak</div>
          <div className="mt-2 text-2xl font-semibold text-red-300">{totalDitolak}</div>
        </div>
      </div>

      <div
        className="bg-neutral-950 border border-yellow-500/20 rounded-xl overflow-x-auto"
      >

        <table className="w-full min-w-[720px]">

          <thead>

            <tr
              className="border-b border-yellow-500/20 bg-neutral-900"
            >
              <th className="p-4">
                Foto
              </th>

              <th className="p-4">
                Species
              </th>

              <th className="p-4">
                Lokasi
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Aksi
              </th>
            </tr>

          </thead>

          <tbody>

            {filteredData.map(
              (item) => (

              <tr
                key={item.id}
                className="border-b border-yellow-500/10 text-center"
              >

                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <Image
                    src={item.foto_url ?? ""}
                    alt={item.nama_lokal ?? item.nama_ilmiah ?? "Foto sighting"}
                    width={96}
                    height={64}
                    className="w-24 h-16 rounded object-cover"
                  />
                  </div>
                </td>

                <td className="p-4">
                  {item.nama_ilmiah}
                </td>

                <td className="p-4">
                  {item.nama_lokasi}
                </td>

                <td className="p-4">

                <SightingStatusBadge
                    status={
                    item.status
                    }
                />

                </td>

                <td className="p-4">

                  <Link
                    href={`/admin/species-review/${item.id}`}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
                  >
                    Review
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}