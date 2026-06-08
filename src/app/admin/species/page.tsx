"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Species }
from "@/types/species";

import {
  getSpecies,
  getSpeciesCount,
  searchSpeciesAdmin,
} from "@/services/species.service";

const PAGE_SIZE = 100;

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

    async function loadData() {

      setLoading(true);

      const [
        speciesData,
        totalCount,
      ] = await Promise.all([
        getSpecies(page),
        getSpeciesCount(),
      ]);

      setSpecies(
        speciesData
      );

      setTotalPages(
        Math.ceil(
          totalCount /
          PAGE_SIZE
        )
      );

      setLoading(false);
    }

    loadData();

  }, [page]);

  async function handleSearch(
    value: string
  ) {

    setKeyword(value);

    if (!value.trim()) {

      const result =
        await getSpecies(
          page
        );

      setSpecies(result);

      return;
    }

    const result =
      await searchSpeciesAdmin(
        value
      );

    setSpecies(result);
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
    <div>

      <div
        className="
        flex
        justify-between
        items-center
        mb-8
        "
      >

        <div>

          <h1
            className="
            text-4xl
            font-bold
            "
          >
            Database Species
          </h1>

          <div
            className="
            flex
            flex-wrap
            gap-2
            mt-4
            text-xs
            text-gray-400
            "
          >

            <span className="text-green-400 font-semibold">
              LC
            </span>

            <span>- Least Concern</span>

            <span className="text-yellow-400 font-semibold">
              NT
            </span>

            <span>- Near Threatened</span>

            <span className="text-orange-400 font-semibold">
              VU
            </span>

            <span>- Vulnerable</span>

            <span className="text-red-400 font-semibold">
              EN
            </span>

            <span>- Endangered</span>

            <span className="text-red-300 font-semibold">
              CR
            </span>

            <span>- Critically Endangered</span>

            <span className="text-blue-400 font-semibold">
              DD
            </span>

            <span>- Data Deficient</span>

            <span className="text-gray-300 font-semibold">
              NE
            </span>

            <span>- Not Evaluated</span>

          </div>

        </div>

        <Link
          href="/admin/species/create"
          className="
          bg-yellow-400
          text-black
          px-5
          py-3
          rounded-xl
          font-semibold
          "
        >
          + Tambah Species
        </Link>

      </div>

      <input
        value={keyword}
        onChange={(e) =>
          handleSearch(
            e.target.value
          )
        }
        placeholder="Cari species..."
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
        overflow-hidden
        "
      >

        <table className="w-full">

          <thead>

            <tr
              className="
              border-b
              border-yellow-500/20
              "
            >

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

              <th
                className="
                p-4
                text-left
                min-w-[160px]
                "
              >
                Konservasi
              </th>

              <th className="p-4 text-left">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {species.map(
              (item) => (

              <tr
                key={item.id}
                className="
                border-b
                border-yellow-500/10
                "
              >

                <td className="p-4 italic">
                  {item.species}
                </td>

                <td className="p-4">
                  {item.nama_lokal}
                </td>

                <td className="p-4">
                  {item.family}
                </td>

                <td className="p-4">
                  {item.occurrence}
                </td>

                <td className="p-4">

                {(() => {

                  const conservation =
                    getConservationInfo(
                      item.status_konservasi
                    );

                  return (

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${conservation.className}
                      `}
                    >
                      {conservation.label}
                    </span>

                  );

                })()}

              </td>

                <td className="p-4">

                  <Link
                    href={`/admin/species/${item.id}`}
                    className="
                    bg-yellow-400
                    text-black
                    px-4
                    py-2
                    rounded-lg
                    font-semibold
                    "
                  >
                    Detail
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div
          className="
          flex
          justify-between
          items-center
          p-4
          border-t
          border-yellow-500/20
          "
        >

          <button
            onClick={() =>
              setPage(
                page - 1
              )
            }
            disabled={
              page === 1
            }
            className="
            px-4
            py-2
            rounded-lg
            bg-neutral-900
            border
            border-yellow-500/20
            disabled:opacity-50
            "
          >
            Sebelumnya
          </button>

          <span>
            Halaman {page}
            {" / "}
            {totalPages}
          </span>

          <button
            onClick={() =>
              setPage(
                page + 1
              )
            }
            disabled={
              page ===
              totalPages
            }
            className="
            px-4
            py-2
            rounded-lg
            bg-neutral-900
            border
            border-yellow-500/20
            disabled:opacity-50
            "
          >
            Berikutnya
          </button>

        </div>

      </div>

    </div>
  );
}