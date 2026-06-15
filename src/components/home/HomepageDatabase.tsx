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

<section className="relative text-white overflow-hidden">

  {/* BACKGROUND */}
  <div className="absolute inset-0">
    <Image
      src="/image/bg-db.png"
      alt="Database Background"
      fill
      priority
      className="object-cover"
    />

    <div className="absolute inset-0 bg-black/75" />
  </div>

  <div className="relative z-10 py-2 md:py-6 px-6 md:px-10">

    {/* HEADER */}
    <div className="max-w-3xl mb-12">

      <span className="text-yellow-400 font-semibold uppercase tracking-[0.25em] text-sm">
        Biodiversity Database
      </span>

      <h2 className="mt-3 text-4xl md:text-6xl font-bold leading-tight">
        DATABASE IKAN <br />
        <span className="text-yellow-400">
          INDONESIA
        </span>
      </h2>

      <p className="mt-5 text-gray-300 leading-relaxed max-w-2xl">
        Jelajahi lebih dari 1.200 spesies ikan asli Indonesia melalui
        database biodiversitas berbasis sains yang terus diperbarui oleh
        tim peneliti dan kontributor FFOI.
      </p>

    </div>

    {/* STATS */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl">

      {[
        { title: "1.200+", label: "Spesies Terdokumentasi" },
        { title: "37", label: "Provinsi Indonesia" },
        { title: "1.000+", label: "Referensi Ilmiah" },
        { title: "Terus", label: "Diperbarui" },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 transition hover:border-yellow-400/50"
        >
          <h3 className="text-2xl font-bold text-yellow-400">
            {item.title}
          </h3>

          <p className="text-sm text-gray-300 mt-1">
            {item.label}
          </p>
        </div>
      ))}

    </div>

    {/* SEARCH */}
    <div className="max-w-2xl mb-12">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari spesies, family, ordo, atau lokasi..."
        className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:outline-none transition"
      />

    </div>

    {/* CARD LIST */}
    {filteredData.length > 0 ? (

      <div className="flex gap-6 overflow-x-auto pb-4">

        {filteredData.map((item) => (

          <Link
            key={item.id}
            href={`/database/sighting/${item.id}`}
            className="group w-[320px] h-[430px] flex-none bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-400 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(250,204,21,0.15)]"
          >

            {/* IMAGE */}
            <div className="relative h-[220px]">

              <Image
                src={item.foto_url ?? "/images/no-image.png"}
                alt={item.species}
                fill
                sizes="320px"
                className="object-cover transition-transform duration-500 group-hover:scale-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col h-[210px]">

              <div className="flex items-center justify-between mb-4">

                <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-400 font-semibold">
                  Freshwater Fish
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${getConservationbadge( item.status_konservasi ?? "NE" )}`}
                >
                  {item.status_konservasi ?? "NE"}
                </span>

              </div>

              <h4 className="text-xl font-bold text-white line-clamp-2">
                {item.species}
              </h4>

              <p className="text-yellow-300 mt-2 text-sm">
                {item.family}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {item.ordo}
              </p>

              <div className="mt-auto">

                <div className="h-px bg-white/10 mb-4" />

                <p className="text-sm text-gray-400">
                  📍 {item.lokasi}
                </p>

              </div>

            </div>

          </Link>

        ))}

      </div>

    ) : (

      <div
        className="h-[320px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl flex items-center justify-center text-gray-300"
      >
        Tidak ada data ditemukan
      </div>

    )}

    {/* CTA */}
    <div className="mt-14">

      <Link
        href="/database"
        className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold transition hover:bg-yellow-300 hover:-translate-y-1"
      >
        JELAJAHI 1.200+ SPESIES
        <span>→</span>
      </Link>

    </div>

  </div>

</section>

);
}