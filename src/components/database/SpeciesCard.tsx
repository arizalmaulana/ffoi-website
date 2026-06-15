import { Species } from "@/types/species";

interface Props {
  species: Species;
}

export default function SpeciesCard({
  species,
}: Props) {
  return (
    <div
      className="bg-neutral-950 border border-yellow-500/20 rounded-xl p-5"
    >
      <h3
        className="text-lg font-semibold text-white"
      >
        {species.nama_lokal ??
          "Belum ada nama lokal"}
      </h3>

      <p
        className="italic text-gray-400"
      >
        {species.species}
      </p>

      <div className="mt-4 text-sm">

        <p>
          <span className="text-yellow-400">
            Family:
          </span>{" "}
          {species.family}
        </p>

        <p>
          <span className="text-yellow-400">
            Ordo:
          </span>{" "}
          {species.ordo}
        </p>

        <p>
          <span className="text-yellow-400">
            Occurrence:
          </span>{" "}
          {species.occurrence}
        </p>

      </div>
    </div>
  );
}