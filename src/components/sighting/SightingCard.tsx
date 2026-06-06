import { Sighting } from "@/types/sighting";

interface Props {
  sighting: Sighting;
}

export default function SightingCard({
  sighting,
}: Props) {
  return (
    <div className="bg-neutral-900 border border-yellow-500/20 rounded-xl p-5">
      <h3 className="font-bold text-xl">
        {sighting.nama_lokal ??
          "Tanpa Nama Lokal"}
      </h3>

      <p className="italic text-gray-400">
        {sighting.nama_ilmiah}
      </p>

      <div className="mt-4 space-y-1 text-sm">
        <p>
          📍 {sighting.nama_lokasi}
        </p>

        <p>
          📅 {sighting.tanggal_temuan}
        </p>

        <p>
          Status: {sighting.status}
        </p>
      </div>
    </div>
  );
}