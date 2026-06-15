import Link from "next/link";

import { Sighting } from "@/types/sighting";

import SightingStatusBadge from "./SightingStatusBadge";

interface Props {
  sightings: Sighting[];
}

export default function SightingTable({
  sightings,
}: Props) {
  if (sightings.length === 0) {
    return (
      <div
        className="bg-neutral-950 border border-yellow-500/20 rounded-xl p-10 text-center"
      >
        <p className="text-gray-400">
          Belum ada sighting.
        </p>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-xl border border-yellow-500/20"
    >
      <table className="w-full">
        <thead
          className="bg-neutral-950 border-b border-yellow-500/20"
        >
          <tr>
            <th className="p-4 text-left">
              Foto
            </th>

            <th className="p-4 text-left">
              Spesies
            </th>

            <th className="p-4 text-left">
              Lokasi
            </th>

            <th className="p-4 text-left">
              Tanggal
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {sightings.map(
            (sighting) => (
              <tr
                key={sighting.id}
                className="border-b border-yellow-500/10"
              >
                <td className="p-4">
                  <img
                    src={
                      sighting.foto_url ??
                      "/images/fish-placeholder.jpg"
                    }
                    alt={
                      sighting.nama_lokal ??
                      "Sighting"
                    }
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4">
                  <div>
                    <p className="font-medium">
                      {sighting.nama_lokal ??
                        "Tanpa Nama Lokal"}
                    </p>

                    <p
                      className="text-sm italic text-gray-400"
                    >
                      {sighting.nama_ilmiah}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  {sighting.nama_lokasi}
                </td>

                <td className="p-4" suppressHydrationWarning>
                  {new Date(sighting.tanggal_temuan).toLocaleDateString("id-ID")}
                </td>

                <td className="p-4">
                  <SightingStatusBadge
                    status={
                      sighting.status
                    }
                  />
                </td>

                <td className="p-4">
                  <Link
                    href={`/dashboard/sighting/${sighting.id}`}
                    className="text-yellow-400 hover:underline"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}