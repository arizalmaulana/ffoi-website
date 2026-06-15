"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Species }
from "@/types/species";

import {
  getSpecies,
  getSpeciesCount,
} from "@/services/species.service";

const PAGE_SIZE = 50;

export default function AdminSpeciesPage() {

  const [loading, setLoading] =
    useState(true);

  const [keyword, setKeyword] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [species, setSpecies] =
    useState<Species[]>([]);

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);

      try {
        const [speciesData, totalCount] =
          await Promise.all([
            getSpecies({
              page,
              search: keyword,
            }),

            getSpeciesCount({
              search: keyword,
            }),
          ]);

        if (!active) return;

        setSpecies(speciesData);

        setTotalPages(
          Math.ceil(totalCount / PAGE_SIZE)
        );
      } catch (error) {
        console.error(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [
    page,
    keyword,
  ]);

  function handleSearch(
    value: string
  ) {
    setKeyword(value);
    setPage(1);
  }

  function getConservationInfo(
    status: string | null
  ) {

    switch (status) {

      case "LC":
        return {
          label: "LC",
          className:
            "bg-green-500/20 text-green-400",
        };

      case "NT":
        return {
          label: "NT",
          className:
            "bg-yellow-500/20 text-yellow-400",
        };

      case "VU":
        return {
          label: "VU",
          className:
            "bg-orange-500/20 text-orange-400",
        };

      case "EN":
        return {
          label: "EN",
          className:
            "bg-red-500/20 text-red-400",
        };

      case "CR":
        return {
          label: "CR",
          className:
            "bg-red-700/20 text-red-300",
        };

      case "DD":
        return {
          label: "DD",
          className:
            "bg-blue-500/20 text-blue-400",
        };

      default:
        return {
          label: "NE",
          className:
            "bg-gray-500/20 text-gray-300",
        };
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
  <div className="space-y-8">

    {/* HEADER */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      <div>

        <p className="text-yellow-400 uppercase tracking-[0.25em] text-xs font-semibold mb-2">
          Admin Panel
        </p>

        <h1 className="text-4xl font-bold">
          Database Species
        </h1>

        <p className="text-gray-400 mt-2">
          Kelola seluruh data spesies ikan Indonesia.
        </p>

        <div className="flex flex-wrap gap-2 mt-5 text-xs">

          <span className="text-green-400 font-semibold">
            LC
          </span>
          <span className="text-gray-500">
            Least Concern
          </span>

          <span className="text-yellow-400 font-semibold">
            NT
          </span>
          <span className="text-gray-500">
            Near Threatened
          </span>

          <span className="text-orange-400 font-semibold">
            VU
          </span>
          <span className="text-gray-500">
            Vulnerable
          </span>

          <span className="text-red-400 font-semibold">
            EN
          </span>
          <span className="text-gray-500">
            Endangered
          </span>

          <span className="text-red-300 font-semibold">
            CR
          </span>
          <span className="text-gray-500">
            Critically Endangered
          </span>

          <span className="text-blue-400 font-semibold">
            DD
          </span>
          <span className="text-gray-500">
            Data Deficient
          </span>

          <span className="text-gray-300 font-semibold">
            NE
          </span>
          <span className="text-gray-500">
            Not Evaluated
          </span>

        </div>

      </div>

      <Link
        href="/admin/species/create"
        className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold transition hover:bg-yellow-300 hover:-translate-y-1"
      >
        + Tambah Species
      </Link>

    </div>

    {/* SEARCH */}
    <input
      value={keyword}
      onChange={(e) =>
        handleSearch(e.target.value)
      }
      placeholder="Cari species atau nama lokal..."
      className="w-full bg-neutral-950 border border-yellow-500/20 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-400 transition"
    />

    {/* TABLE */}
    <div
      className="overflow-hidden rounded-2xl border border-yellow-500/20 bg-neutral-950 shadow-[0_0_40px_rgba(250,204,21,0.05)]"
    >

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="bg-yellow-400 text-black">

            <tr>

              <th className="p-4 text-left">
                Species
              </th>

              <th className="p-4 text-left">
                Nama Lokal
              </th>

              <th className="p-4 text-left">
                Family
              </th>

              <th className="p-4 text-left">
                Occurrence
              </th>

              <th className="p-4 text-left">
                Konservasi
              </th>

              <th className="p-4 text-left">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {species.map((item) => {

              const conservation =
                getConservationInfo(
                  item.status_konservasi
                );

              return (

                <tr
                  key={item.id}
                  className="border-b border-yellow-500/10 hover:bg-white/5 transition"
                >

                  <td className="p-4">

                    <div>

                      <p className="italic text-yellow-400 font-medium">
                        {item.species}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.ordo}
                      </p>

                    </div>

                  </td>

                  <td className="p-4">
                    {item.nama_lokal ?? "-"}
                  </td>

                  <td className="p-4">
                    {item.family}
                  </td>

                  <td className="p-4">

                    <span
                      className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400"
                    >
                      {item.occurrence}
                    </span>

                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${conservation.className}`}
                    >
                      {conservation.label}
                    </span>

                  </td>

                  <td className="p-4">

                    <Link
                      href={`/admin/species/${item.id}`}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold transition hover:bg-yellow-300"
                    >
                      Detail
                    </Link>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      <div
        className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 border-t border-yellow-500/20"
      >

        <p className="text-sm text-gray-400">
          Halaman {page} dari {totalPages}
        </p>

        <div className="flex gap-3">

          <button
            onClick={() =>
              setPage(page - 1)
            }
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-yellow-500/20 disabled:opacity-40 hover:bg-white/5 transition"
          >
            ← Sebelumnya
          </button>

          <button
            onClick={() =>
              setPage(page + 1)
            }
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold disabled:opacity-40"
          >
            Berikutnya →
          </button>

        </div>

      </div>

    </div>

  </div>
);
}