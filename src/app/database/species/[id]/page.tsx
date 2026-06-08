import Link from "next/link";
import Image from "next/image";

import {
  getSpeciesDetail,
} from "@/services/public-database.service";

function getConservationBadge(
  status: string | null
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

    default:
      return "bg-gray-500 text-white";
  }
}

function getOccurrenceBadge(
  occurrence: string
) {

  switch (occurrence) {

    case "native":
      return "bg-green-500/20 text-green-300";

    case "endemic":
      return "bg-blue-500/20 text-blue-300";

    case "introduced":
      return "bg-yellow-500/20 text-yellow-300";

    case "invasive":
      return "bg-red-500/20 text-red-300";

    default:
      return "bg-gray-500/20 text-gray-300";
  }
}

export default async function SpeciesDetailPage(
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  const { id } =
    await params;

  const data =
    await getSpeciesDetail(
      id
    );

  if (!data) {

    return (

      <div
        className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        "
      >
        Species tidak ditemukan
      </div>

    );
  }

  const {
    species,
    sightings,
  } = data;

  const latestPhoto =
  sightings[0]?.foto_url ??
  "/images/no-image.png";

const totalSightings =
  sightings.length;

const provinces =
  [
    ...new Set(
      sightings.map(
        (item) =>
          item.provinsi
      )
    ),
  ];

  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-10
        "
      >

        <Link
          href="/database"
          className="
          text-yellow-400
          hover:text-yellow-300
          "
        >
          ← Kembali ke Database
        </Link>

        {/* HERO SECTION */}
        <div
          className="
          mt-6
          rounded-3xl
          overflow-hidden
          border
          border-yellow-500/20
          "
        >

          <img
            src={latestPhoto}
            alt={species.species}
            className="
            w-full
            h-[500px]
            object-cover
            "
          />

        </div>

        <div className="mt-8">

          <div
            className="
            flex
            flex-wrap
            gap-3
            mb-4
            "
          >

            <span
              className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                ${getConservationBadge(
                  species.status_konservasi
                )}
              `}
            >
              {species.status_konservasi ?? "NE"}
            </span>

            <span
              className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
                ${getOccurrenceBadge(
                  species.occurrence
                )}
              `}
            >
              {species.occurrence}
            </span>

          </div>

          <h1
            className="
            text-5xl
            font-bold
            "
          >
            {species.species}
          </h1>

          <p
            className="
            text-yellow-400
            text-xl
            mt-2
            "
          >
            {species.nama_lokal}
          </p>

          {species.nama_internasional && (

            <p
              className="
              text-gray-400
              mt-2
              "
            >
              {species.nama_internasional}
            </p>

          )}

        </div>

        {/* INFORMASI SPESIES */}
        <div
          className="
          mt-10
          bg-neutral-950
          border
          border-yellow-500/20
          rounded-2xl
          p-8
          "
        >

          <h2
            className="
            text-2xl
            font-bold
            mb-6
            "
          >
            Informasi Spesies
          </h2>

          <div
            className="
            grid
            md:grid-cols-2
            gap-6
            "
          >

            <div>

              <p className="text-gray-400 text-sm">
                Nama Ilmiah
              </p>

              <p className="mt-1">
                {species.species}
              </p>

            </div>

            <div>

              <p className="text-gray-400 text-sm">
                Nama Lokal
              </p>

              <p className="mt-1">
                {species.nama_lokal ?? "-"}
              </p>

            </div>

            <div>

              <p className="text-gray-400 text-sm">
                Nama Internasional
              </p>

              <p className="mt-1">
                {species.nama_internasional ?? "-"}
              </p>

            </div>

            <div>

              <p className="text-gray-400 text-sm">
                Family
              </p>

              <p className="mt-1">
                {species.family}
              </p>

            </div>

            <div>

              <p className="text-gray-400 text-sm">
                Ordo
              </p>

              <p className="mt-1">
                {species.ordo}
              </p>

            </div>

            <div>

              <p className="text-gray-400 text-sm">
                Occurrence
              </p>

              <p className="mt-1 capitalize">
                {species.occurrence}
              </p>

            </div>

          </div>

          {species.deskripsi && (

            <div className="mt-8">

              <h3
                className="
                text-lg
                font-semibold
                mb-3
                "
              >
                Deskripsi
              </h3>

              <p
                className="
                text-gray-300
                leading-relaxed
                "
              >
                {species.deskripsi}
              </p>

            </div>

          )}

        </div>

        {/* STATISTIK */}
        <div
          className="
          grid
          md:grid-cols-3
          gap-4
          mt-10
          "
        >

          <div
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-xl
            p-5
            "
          >

            <p className="text-gray-400">
              Total Pengamatan
            </p>

            <p
              className="
              text-3xl
              font-bold
              mt-2
              "
            >
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

            <p className="text-gray-400">
              Provinsi
            </p>

            <p
              className="
              text-3xl
              font-bold
              mt-2
              "
            >
              {provinces.length}
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

            <p className="text-gray-400">
              Status Konservasi
            </p>

            <p
              className="
              text-3xl
              font-bold
              mt-2
              "
            >
              {species.status_konservasi ?? "NE"}
            </p>

          </div>

        </div>

        {/* PERSEBARAN */}
        <div
          className="
          mt-10
          bg-neutral-950
          border
          border-yellow-500/20
          rounded-2xl
          p-8
          "
        >

          <h2
            className="
            text-2xl
            font-bold
            mb-6
            "
          >
            Persebaran Pengamatan
          </h2>

          {provinces.length > 0 ? (

            <div
              className="
              flex
              flex-wrap
              gap-3
              "
            >

              {provinces.map(
                (province) => (

                <span
                  key={province}
                  className="
                  px-4
                  py-2
                  rounded-full
                  bg-yellow-500/10
                  border
                  border-yellow-500/20
                  text-yellow-300
                  text-sm
                  "
                >
                  {province}
                </span>

              ))}

            </div>

          ) : (

            <p className="text-gray-400">
              Belum ada data persebaran.
            </p>

          )}

        </div>

        {/* OBSERVASI TERKAIT */}
        <div className="mt-10">

          <h2
            className="
            text-2xl
            font-bold
            mb-6
            "
          >
            Pengamatan Terbaru
          </h2>

          {sightings.length > 0 ? (

            <div
              className="
              grid
              md:grid-cols-2
              lg:grid-cols-4
              gap-5
              "
            >

              {sightings
                .slice(0, 4)
                .map((item) => (

                <Link
                  key={item.id}
                  href={`/database/sighting/${item.id}`}
                  className="
                  bg-neutral-950
                  border
                  border-yellow-500/20
                  rounded-xl
                  overflow-hidden
                  hover:border-yellow-400
                  transition
                  "
                >

                  <img
                    src={
                      item.foto_url ??
                      "/images/no-image.png"
                    }
                    alt={
                      species.species
                    }
                    className="
                    w-full
                    h-48
                    object-cover
                    "
                  />

                  <div className="p-4">

                    <p
                      className="
                      font-semibold
                      line-clamp-2
                      "
                    >
                      {species.species}
                    </p>

                    <p
                      className="
                      text-sm
                      text-gray-400
                      mt-2
                      "
                    >
                      📍 {item.nama_lokasi}
                    </p>

                    <p
                      className="
                      text-xs
                      text-gray-500
                      mt-1
                      "
                    >
                      {item.provinsi}
                    </p>

                  </div>

                </Link>

              ))}

            </div>

          ) : (

            <div
              className="
              bg-neutral-950
              border
              border-yellow-500/20
              rounded-xl
              p-6
              text-gray-400
              "
            >
              Belum ada pengamatan untuk spesies ini.
            </div>

          )}

        </div>

      </div>

    </main>

  );
}