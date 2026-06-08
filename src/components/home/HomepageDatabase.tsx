"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";
import Image from "next/image";

import {
  HomepageSpecies,
} from "@/services/public-database.service";

interface HomepageDatabaseProps {
  data: HomepageSpecies[];
}

function getConservationbadge(
  status: string
) {

  switch (status) {

    case "LC":
        return "bg-green-500 text-white";

      case "NT":
        return "bg-yellow-500 text-black";

      case "VU":
        return "bg-orange-500 text-white";

      case "EN":
        return "bg-red-500 text-white";

      case "CR":
        return "bg-red-800 text-white";

      case "DD":
        return "bg-blue-500 text-white";

      default:
        return "bg-gray-500 text-white";
  }
}

export default function HomepageDatabase(
  {
    data,
  }: HomepageDatabaseProps
) {

  const [search, setSearch] =
    useState("");

  const filteredData =
    useMemo(() => {

      const keyword =
        search.toLowerCase();

      return data.filter(
        (item) =>

          item.species
            ?.toLowerCase()
            .includes(keyword)

          ||

          item.family
            ?.toLowerCase()
            .includes(keyword)

          ||

          item.ordo
            ?.toLowerCase()
            .includes(keyword)

          ||

          item.lokasi
            ?.toLowerCase()
            .includes(keyword)

      );

    }, [
      search,
      data,
    ]);

return (

<section className="relative text-white min-h-[950px]">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src="/images/background database.png"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 py-20 px-6 md:px-10">

          {/* TITLE */}
          <div className="mb-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              DATABASE IKAN <br />
              <span className="text-yellow-400">
                INDONESIA
              </span>
            </h2>

            <p className="mt-4 text-gray-300 text-sm">
              Jelajahi lebih dari 1.700 spesies ikan asli Indonesia melalui database biodiversitas berbasis sains milik FFOI.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl">
            {[
              { title: "1.700+", label: "Spesies Terdokumentasi" },
              { title: "37", label: "Provinsi Indonesia" },
              { title: "1.000+", label: "Referensi Ilmiah" },
              { title: "Terus", label: "Diperbarui" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10"
              >
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-xs text-gray-300">{item.label}</p>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <div className="flex gap-3 mb-10 max-w-4xl">
            <input
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
  placeholder="Cari spesies ikan, family, ordo, lokasi..."
  className="
  flex-1
  bg-white/10
  backdrop-blur-md
  border
  border-white/10
  rounded-lg
  px-4
  py-3
  text-sm
  outline-none
  "
/>
          </div>

 {/* CARD LIST */}
<div
  className="
  min-h-[400px]
  mt-4
  items-center
  "
>

  {filteredData.length > 0 ? (

    <div
      className="
      flex
      gap-5
      overflow-x-auto
      pb-3
      "
    >

      {filteredData.map((item) => (

        <Link
          key={item.id}
          href={`/database/sighting/${item.id}`}
          className="
          w-[280px]
          h-[340px]
          flex-none
          bg-white/10
          backdrop-blur-md
          border
          border-white/10
          rounded-xl
          overflow-hidden
          hover:border-yellow-400
          hover:-translate-y-1
          transition-all
          duration-300
          "
        >

      <div className="h-[180px] w-full overflow-hidden">

          
        <img
          src={
            item.foto_url ??
            "/images/no-image.png"
          }
          alt={item.species}
          className="
          w-full
          h-[200px]
          object-cover
          object-center
          "
        />

      </div>

      <div
        className="
        p-4
        flex
        flex-col
        h-[160px]
        "
      >

        <div
          className="
          flex
          items-center
          justify-between
          mb-3
          "
        >

          <span
            className="
            text-[10px]
            uppercase
            tracking-widest
            text-yellow-400
            font-semibold
            "
          >
            Freshwater Fish
          </span>

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-bold
              shadow-lg
              backdrop-blur-md
              ${getConservationbadge(
                item.status_konservasi ?? "NE"
              )}
            `}
          >
            {item.status_konservasi ?? "NE"}
          </span>

        </div>

        <h4
          className="
          text-lg
          font-bold
          text-white
          line-clamp-2
          min-h-[56px]
          "
        >
          {item.species}
        </h4>

        <p
          className="
          text-sm
          text-yellow-300
          mt-2
          line-clamp-1
          "
        >
          {item.family}
        </p>

        <p
          className="
          text-xs
          text-gray-400
          mt-1
          line-clamp-1
          "
        >
          {item.ordo}
        </p>

        <div className="mt-auto">

          <div
            className="
            h-px
            bg-white/10
            mb-3
            "
          />

          <p
            className="
            text-xs
            text-gray-400
            "
          >
            📍 {item.lokasi}
          </p>

        </div>

      </div>

     </Link>

      ))}

    </div>

  ) : (

    <div
      className="
      h-[340px]
      w-full
      bg-white/10
      backdrop-blur-md
      border
      border-white/10
      rounded-xl
      flex
      items-center
      justify-center
      text-gray-300
      "
    >
      Tidak ada data ditemukan
    </div>

  )}

</div>

          {/* BUTTON */}
          <div className="mt-10">
            <a href="\database" className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-full font-semibold">
              JELAJAHI SEMUA 1.700+ SPESIES →
            </a>
          </div>

        </div>
      </section>

);
}