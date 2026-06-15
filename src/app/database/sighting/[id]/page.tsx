import Link from "next/link";
import Image from "next/image";

import {
  getBiodiversityDetail,
  getRelatedSightings,
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

    case "DD":
      return "bg-blue-500 text-white";

    default:
      return "bg-gray-500 text-white";
  }
}

function getConservationLabel(
  status: string | null
) {

  switch (status) {

    case "LC":
      return "Least Concern";

    case "NT":
      return "Near Threatened";

    case "VU":
      return "Vulnerable";

    case "EN":
      return "Endangered";

    case "CR":
      return "Critically Endangered";

    case "DD":
      return "Data Deficient";

    default:
      return "Not Evaluated";
  }
}

function getOccurrenceBadge(
  occurrence: string | null
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

function getOccurrenceLabel(
  occurrence: string | null
) {

  switch (occurrence) {

    case "native":
      return "Native";

    case "endemic":
      return "Endemic";

    case "introduced":
      return "Introduced";

    case "invasive":
      return "Invasive";

    default:
      return "Unknown";
  }
}

function InfoRow(
  {
    label,
    value,
  }: {
    label: string;
    value?: string | number | null;
  }
) {

  return (

    <div>

      <p className="text-gray-400 text-sm">
        {label}
      </p>

      <p className="mt-1 text-white">
        {value || "-"}
      </p>

    </div>

  );
}

export default async function SightingDetailPage(
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
    await getBiodiversityDetail(
      id
    );

  if (!data) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Data tidak ditemukan.
      </div>
    );
  }

  const {
    sighting,
    species,
    contributor,
  } = data;

  const relatedSightings =
    species
      ? await getRelatedSightings(
          species.id,
          sighting.id
        )
      : [];

  return (

  <main className="bg-black text-white min-h-screen">

    <div className="max-w-7xl mx-auto px-6 py-10">

      <Link
        href="/"
        className="text-yellow-400 hover:text-yellow-300"
      >
        ← Kembali
      </Link>

      <div
        className="mt-6 rounded-3xl overflow-hidden border border-yellow-500/20"
      >

        <Image
          src={
            sighting.foto_url ??
            "/images/no-image.png"
          }
          alt={
            species?.species ??
            "Sighting"
          }
          width={1600}
          height={900}
          className="w-full h-[500px] object-cover"
          priority
        />

      </div>

      <div className="mt-8">

        <div
          className="flex flex-wrap gap-3 mb-4"
        >

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getConservationBadge( species?.status_konservasi ?? "NE" )}`}
          >
            {species?.status_konservasi ?? "NE"}
            {" • "}
            {getConservationLabel(
              species?.status_konservasi ??
              "NE"
            )}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getOccurrenceBadge( species?.occurrence ?? null )}`}
          >
            {getOccurrenceLabel(
              species?.occurrence ??
              null
            )}
          </span>

        </div>

        <h1
          className="text-5xl font-bold"
        >
          {species?.species}
        </h1>

        <p
          className="text-xl text-yellow-400 mt-2"
        >
          {species?.nama_lokal}
        </p>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >

          <div
            className="bg-neutral-950 border border-yellow-500/20 rounded-xl p-4"
          >
            <p className="text-gray-400 text-sm">
              Family
            </p>

            <p className="mt-2 font-semibold">
              {species?.family}
            </p>
          </div>

          <div
            className="bg-neutral-950 border border-yellow-500/20 rounded-xl p-4"
          >
            <p className="text-gray-400 text-sm">
              Ordo
            </p>

            <p className="mt-2 font-semibold">
              {species?.ordo}
            </p>
          </div>

          <div
            className="bg-neutral-950 border border-yellow-500/20 rounded-xl p-4"
          >
            <p className="text-gray-400 text-sm">
              Lokasi
            </p>

            <p className="mt-2 font-semibold">
              {sighting.nama_lokasi}
            </p>
          </div>

          <div
            className="bg-neutral-950 border border-yellow-500/20 rounded-xl p-4"
          >
            <p className="text-gray-400 text-sm">
              Tanggal Temuan
            </p>

            <p className="mt-2 font-semibold">
              {sighting.tanggal_temuan}
            </p>
          </div>

        </div>

      </div>

            <div
        className="grid lg:grid-cols-2 gap-6 mt-10"
      >

        {/* TAKSONOMI */}

        <div
          className="bg-neutral-950 border border-yellow-500/20 rounded-2xl p-6"
        >

          <h2
            className="text-2xl font-bold mb-6"
          >
            Informasi Taksonomi
          </h2>

          <div className="space-y-5">

            <InfoRow
              label="Nama Ilmiah"
              value={species?.species}
            />

            <InfoRow
              label="Nama Lokal"
              value={species?.nama_lokal}
            />

            <InfoRow
              label="Nama Internasional"
              value={species?.nama_internasional}
            />

            <InfoRow
              label="Family"
              value={species?.family}
            />

            <InfoRow
              label="Ordo"
              value={species?.ordo}
            />

            <InfoRow
              label="Occurrence"
              value={
                getOccurrenceLabel(
                  species?.occurrence ??
                  null
                )
              }
            />

            <InfoRow
              label="Status Konservasi"
              value={`${species?.status_konservasi ?? "NE"} - ${getConservationLabel(
                species?.status_konservasi ??
                "NE"
              )}`}
            />

          </div>

        </div>

        {/* PENGAMATAN */}

        <div
          className="bg-neutral-950 border border-yellow-500/20 rounded-2xl p-6"
        >

          <h2
            className="text-2xl font-bold mb-6"
          >
            Informasi Pengamatan
          </h2>

          <div className="space-y-5">

            <InfoRow
              label="Lokasi"
              value={
                sighting.nama_lokasi
              }
            />

            <InfoRow
              label="Provinsi"
              value={
                sighting.provinsi
              }
            />

            <InfoRow
              label="Habitat"
              value={
                sighting.habitat
              }
            />

            <InfoRow
              label="Substrat"
              value={
                sighting.substrat
              }
            />

            <InfoRow
              label="Tanggal Temuan"
              value={
                sighting.tanggal_temuan
              }
            />

            <InfoRow
              label="Latitude"
              value={
                sighting.latitude
              }
            />

            <InfoRow
              label="Longitude"
              value={
                sighting.longitude
              }
            />

          </div>

        </div>

      </div>

      <div
        className="mt-6 bg-neutral-950 border border-yellow-500/20 rounded-2xl p-6"
        >

        <h2
            className="text-2xl font-bold mb-6"
        >
            Lokasi Pengamatan
        </h2>

        <div
            className="grid md:grid-cols-2 gap-6"
        >

            <div>

            <InfoRow
                label="Latitude"
                value={
                sighting.latitude
                }
            />

            <div className="mt-5">

                <InfoRow
                label="Longitude"
                value={
                    sighting.longitude
                }
                />

            </div>

            </div>

            <div
            className="flex items-center justify-start"
            >

            <a
                href={`https://www.google.com/maps?q=${sighting.latitude},${sighting.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
            >
                📍 Buka di Google Maps
            </a>

            </div>

        </div>

        </div>

        <div
            className="mt-6 bg-neutral-950 border border-yellow-500/20 rounded-2xl p-6"
            >

            <h2
                className="text-2xl font-bold mb-6"
            >
                Kontributor
            </h2>

            <div
                className="flex flex-col md:flex-row gap-6 items-start"
            >

                <Image
                src={
                    contributor?.foto_profil ??
                    "/avatar-kosong.png"
                }
                unoptimized
                alt={
                    contributor?.nama_lengkap ??
                    "Kontributor"
                }
                width={120}
                height={120}
                className="w-28 h-28 rounded-full object-cover border border-yellow-500/20"
                />

                <div className="flex-1">

                <h3
                    className="text-2xl font-bold"
                >
                    {
                    contributor?.nama_lengkap ??
                    "Pengguna"
                    }
                </h3>

                <p
                    className="text-yellow-400 mt-1 mb-3"
                >
                    @
                    {
                    contributor?.username ??
                    "unknown"
                    }
                </p>

                <span
                    className="mt-3 py-1 text-sm"
                    >
                    {contributor?.email}
                    </span>

                {contributor?.bio && (

                    <p
                    className="mt-4 text-gray-300 leading-relaxed"
                    >
                    {contributor.bio}
                    </p>

                )}

                </div>

            </div>

        </div>

        <div
        className="mt-6"
        >

        <h2
            className="text-2xl font-bold mb-6"
        >
            Pengamatan Serupa
        </h2>

        {relatedSightings.length === 0 ? (

            <div
            className="bg-neutral-950 border border-yellow-500/20 rounded-2xl p-6 text-gray-400"
            >
            Belum ada pengamatan lain untuk spesies ini.
            </div>

        ) : (

            <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            >

            {relatedSightings.map(
                (item) => (

                <Link
                key={item.id}
                href={`/database/sighting/${item.id}`}
                className="bg-neutral-950 border border-yellow-500/20 rounded-2xl overflow-hidden hover:border-yellow-400 transition"
                >

                <Image
                    src={
                    item.foto_url ??
                    "/images/no-image.png"
                    }
                    alt={
                    item.species
                    }
                    width={400}
                    height={250}
                    className="w-full h-44 object-cover"
                />

                <div className="p-4">

                    <h3
                    className="font-bold line-clamp-2"
                    >
                    {item.species}
                    </h3>

                    <p
                    className="text-sm text-yellow-400 mt-1"
                    >
                    {item.family}
                    </p>

                    <p
                    className="text-xs text-gray-400 mt-3"
                    >
                    📍 {item.nama_lokasi}
                    </p>

                </div>

                </Link>

            ))}

            </div>

        )}

        </div>    

    </div>

  </main>

);
}