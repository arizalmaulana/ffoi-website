"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase, waitForAuth } from "@/lib/supabase";

import { Sighting } from "@/types/sighting";

import { getMySightings } from "@/services/sighting.service";

import SightingTable from "@/components/sighting/SightingTable";

export default function SightingPage() {
  const [loading, setLoading] =
    useState(true);

  const [sightings, setSightings] =
    useState<Sighting[]>([]);

  const [filter, setFilter] =
    useState("semua");

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        await waitForAuth();

        const {
          data: { session },
        } = await supabase.auth.getSession();

        const user = session?.user;

        if (!user) return;

        const data = await getMySightings(user.id);

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

  const totalSightings =
    sightings.length;

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

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Sighting Saya
            </h1>

            <p className="text-gray-400 mt-2">
              Kelola seluruh sighting
              yang pernah Anda unggah.
            </p>
          </div>

          <Link
            href="/dashboard/sighting/create"
            className="
            bg-yellow-400
            text-black
            px-5
            py-3
            rounded-lg
            font-semibold
            "
          >
            + Tambah Sighting
          </Link>

        </div>

        {/* Statistik */}
        <div className="grid grid-cols-4 gap-4 mb-8">

          <div
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-xl
            p-5
            "
          >
            <p className="text-gray-400 text-sm">
              Total
            </p>

            <p className="text-3xl font-bold mt-2">
              {totalSightings}
            </p>
          </div>

          <div
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-xl
            p-5
            "
          >
            <p className="text-gray-400 text-sm">
              Menunggu
            </p>

            <p className="text-3xl font-bold text-yellow-400 mt-2">
              {totalMenunggu}
            </p>
          </div>

          <div
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-xl
            p-5
            "
          >
            <p className="text-gray-400 text-sm">
              Disetujui
            </p>

            <p className="text-3xl font-bold text-green-400 mt-2">
              {totalDisetujui}
            </p>
          </div>

          <div
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-xl
            p-5
            "
          >
            <p className="text-gray-400 text-sm">
              Ditolak
            </p>

            <p className="text-3xl font-bold text-red-400 mt-2">
              {totalDitolak}
            </p>
          </div>

        </div>

        {/* Filter */}
        <div className="flex gap-3 mb-6">

          <button
            onClick={() =>
              setFilter(
                "semua"
              )
            }
            className={`
              px-4
              py-2
              rounded-lg
              transition
              ${
                filter ===
                "semua"
                  ? "bg-yellow-400 text-black"
                  : "bg-neutral-900 text-white"
              }
            `}
          >
            Semua
          </button>

          <button
            onClick={() =>
              setFilter(
                "menunggu"
              )
            }
            className={`
              px-4
              py-2
              rounded-lg
              transition
              ${
                filter ===
                "menunggu"
                  ? "bg-yellow-400 text-black"
                  : "bg-neutral-900 text-white"
              }
            `}
          >
            Menunggu
          </button>

          <button
            onClick={() =>
              setFilter(
                "disetujui"
              )
            }
            className={`
              px-4
              py-2
              rounded-lg
              transition
              ${
                filter ===
                "disetujui"
                  ? "bg-yellow-400 text-black"
                  : "bg-neutral-900 text-white"
              }
            `}
          >
            Disetujui
          </button>

          <button
            onClick={() =>
              setFilter(
                "ditolak"
              )
            }
            className={`
              px-4
              py-2
              rounded-lg
              transition
              ${
                filter ===
                "ditolak"
                  ? "bg-yellow-400 text-black"
                  : "bg-neutral-900 text-white"
              }
            `}
          >
            Ditolak
          </button>

        </div>

        {/* Table */}
        {loading ? (
          <div
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-xl
            p-10
            text-center
            "
          >
            <p className="text-gray-400">
              Memuat data...
            </p>
          </div>
        ) : (
          <SightingTable
            sightings={
              filteredSightings
            }
          />
        )}

      </div>
    </main>
  );
}