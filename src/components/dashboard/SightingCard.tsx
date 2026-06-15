import Image from "next/image";
import { Sighting } from "@/types/sighting";

interface Props {
  sighting: Sighting;
}

export default function SightingCard({
  sighting,
}: Props) {
  return (
    <div
      className="group overflow-hidden rounded-2xl bg-neutral-950 border border-yellow-500/10 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]"
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={
            sighting.foto_url ??
            "/images/fish-placeholder.jpg"
          }
          alt={
            sighting.nama_lokal ??
            "Foto sighting"
          }
          fill
          sizes="400px"
          className="object-cover transition-transform duration-500 group-hover:scale-100"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-3 left-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/20 text-yellow-300 backdrop-blur-md"
          >
            {sighting.status}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <h3 className="text-lg font-bold text-white line-clamp-2">
          {sighting.nama_lokal ??
            "Tanpa Nama Lokal"}
        </h3>

        <p className="italic text-yellow-400 text-sm mt-1 line-clamp-1">
          {sighting.nama_ilmiah ?? "-"}
        </p>

        <div className="mt-4 h-px bg-white/10" />

        <div className="mt-4 flex items-start gap-2">
          <span className="text-yellow-400">
            📍
          </span>

          <p className="text-sm text-gray-400 line-clamp-2">
            {sighting.nama_lokasi},{" "}
            {sighting.provinsi}
          </p>
        </div>

      </div>
    </div>
  );
}