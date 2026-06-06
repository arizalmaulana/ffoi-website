import { Sighting } from "@/types/sighting";
import SightingCard from "./SightingCard";

interface Props {
  sightings: Sighting[];
}

export default function SightingSection({
  sightings,
}: Props) {
  return (
    <section>
      <div
        className="
        flex
        items-center
        justify-between
        mb-6
        "
      >
        <h2
          className="
          text-2xl
          font-bold
          text-yellow-400
          "
        >
          Sighting Saya
        </h2>
      </div>

      {sightings.length === 0 ? (
        <div
          className="
          bg-neutral-950
          border
          border-yellow-500/20
          rounded-xl
          p-10
          text-center
          text-gray-400
          "
        >
          Belum ada sighting.
        </div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
          "
        >
          {sightings.map((sighting) => (
            <SightingCard
              key={sighting.id}
              sighting={sighting}
            />
          ))}
        </div>
      )}
    </section>
  );
}