import { Sighting } from "@/types/sighting";

interface Props {
  sighting: Sighting;
}

export default function SightingCard({
  sighting,
}: Props) {
  return (
    <div className="bg-neutral-950 border border-yellow-500/20 rounded-xl overflow-hidden">
      <img
        src={
          sighting.foto_url ??
          "/images/fish-placeholder.jpg"
        }
        
        alt={
          sighting.nama_lokal ??
          "Foto sighting"
        }
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-white text-lg font-semibold">
          {sighting.nama_lokal ??
            "Tanpa Nama Lokal"}
        </h3>

        <p className="text-sm text-gray-400 italic">
          {sighting.nama_ilmiah ?? "-"}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {sighting.nama_lokasi},{" "}
          {sighting.provinsi}
        </p>

        <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
          {sighting.status}
        </div>
      </div>
    </div>
  );
}