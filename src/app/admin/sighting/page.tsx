"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  getPendingSightingsForReview,
} from "@/services/sighting.service";

import { Sighting } from "@/types/sighting";

import SightingStatusBadge
from "@/components/sighting/SightingStatusBadge";

export default function AdminSightingPage() {

  const [loading, setLoading] =
    useState(true);

  const [sightings, setSightings] =
    useState<Sighting[]>([]);

  const [keyword, setKeyword] =
    useState("");

  const [filter, setFilter] =
    useState("semua");

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const data = await getPendingSightingsForReview();
        if (active) setSightings(data);
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

  const filteredSightings =
    filter === "semua"
      ? sightings
      : sightings.filter(
          (item) =>
            item.status === filter
        );

  const totalMenunggu =
    sightings.filter(
      (item) =>
        item.status ===
        "menunggu"
    ).length;

  const totalDisetujui =
    sightings.filter(
      (item) =>
        item.status ===
        "disetujui"
    ).length;

  const totalDitolak =
    sightings.filter(
      (item) =>
        item.status ===
        "ditolak"
    ).length;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl bg-neutral-950 p-6 text-center text-gray-400">
          Memuat data...
        </div>
      </div>
    );
  }

  const searchingSightings =
    filteredSightings.filter(
      (item) => {

        const search =
          keyword
            .trim()
            .toLowerCase();

        if (!search) {
          return true;
        }

        return (

          (item.nama_lokal ?? "")
            .toLowerCase()
            .includes(search)

          ||

          (item.nama_ilmiah ?? "")
            .toLowerCase()
            .includes(search)

          ||

          (item.nama_lokasi ?? "")
            .toLowerCase()
            .includes(search)

          ||

          (item.provinsi ?? "")
            .toLowerCase()
            .includes(search)

        );

      }
    );

  return (
    <div className="max-w-7xl mx-auto">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">
          Review Sighting
        </h1>

        <Link
          href="/admin/sighting/create"
          className="
          bg-yellow-400
          text-black
          px-5
          py-3
          rounded-xl
          font-semibold
          "
        >
          + Tambah Sighting
        </Link>

      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          type="button"
          onClick={() => setFilter("semua")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            filter === "semua"
              ? "bg-yellow-400 text-black"
              : "bg-neutral-900 text-white hover:bg-neutral-800"
          }`}
        >
          Semua
        </button>

        <button
          type="button"
          onClick={() => setFilter("menunggu")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            filter === "menunggu"
              ? "bg-yellow-400 text-black"
              : "bg-neutral-900 text-white hover:bg-neutral-800"
          }`}
        >
          Menunggu
        </button>

        <button
          type="button"
          onClick={() => setFilter("disetujui")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            filter === "disetujui"
              ? "bg-yellow-400 text-black"
              : "bg-neutral-900 text-white hover:bg-neutral-800"
          }`}
        >
          Disetujui
        </button>

        <button
          type="button"
          onClick={() => setFilter("ditolak")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            filter === "ditolak"
              ? "bg-yellow-400 text-black"
              : "bg-neutral-900 text-white hover:bg-neutral-800"
          }`}
        >
          Ditolak
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="rounded-2xl border border-yellow-500/20 bg-neutral-950 p-4 text-sm text-gray-300">
          <div className="text-gray-400">Total Review</div>
          <div className="mt-2 text-2xl font-semibold text-white">{sightings.length}</div>
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

      <input
        value={keyword}
        onChange={(e) =>
          setKeyword(
            e.target.value
          )
        }
        placeholder="Cari sighting..."
        className="
        w-full
        bg-neutral-950
        border
        border-yellow-500/20
        rounded-xl
        p-4
        mb-6
        "
      />

      <div
        className="
        bg-neutral-950
        border
        border-yellow-500/20
        rounded-xl
        overflow-x-auto
        "
      >

        <table className="w-full min-w-[720px]">

          <thead>

            <tr
              className="
              border-b
              border-yellow-500/20
              "
            >

              <th className="p-4">
                Foto
              </th>

              <th className="p-4">
                Spesies
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

            {searchingSightings.map((item) => (
              <tr
                key={item.id}
                className="border-b border-yellow-500/20 text-center"
              >
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <Image
                    src={item.foto_url ?? ""}
                    alt={item.nama_lokal ?? item.nama_ilmiah ?? "Foto sighting"}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  </div>
                </td>

                <td className="p-4">
                  <div>{item.nama_lokal}</div>
                  <div className="text-sm italic text-gray-400">
                    {item.nama_ilmiah}
                  </div>
                </td>

                <td className="p-4">{item.nama_lokasi}</td>

                <td className="p-4">
                  <SightingStatusBadge status={item.status} />
                </td>

                <td className="p-4">
                  <Link
                    href={`/admin/sighting/${item.id}`}
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg"
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