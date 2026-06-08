interface Props {
  pendingSighting: number;
  pendingSpecies: number;
  totalPending: number;
}

export default function AdminPendingAction({
  pendingSighting,
  pendingSpecies,
  totalPending,
}: Props) {

  return (
    <div
      className="
      bg-neutral-950
      border
      border-yellow-500/20
      rounded-2xl
      p-6
      "
    >

      <h2
        className="
        text-xl
        font-bold
        mb-6
        "
      >
        Pending Action
      </h2>

      <p
        className="
        text-sm
        text-gray-400
        mb-6
        leading-relaxed
        "
        >
        Saat ini terdapat beberapa
        laporan yang memerlukan
        validasi. Terima kasih telah
        membantu menjaga kualitas data
        Freshwater Fish of Indonesia.
        </p>

      <div className="space-y-5">

        <div
          className="
          flex
          justify-between
          items-center
          "
        >
          <div>

            <p className="font-medium">
              🔍 Review Sighting
            </p>

            <p
              className="
              text-sm
              text-gray-400
              "
            >
              Menunggu validasi
            </p>

          </div>

          <span
            className="
            bg-yellow-400
            text-black
            px-3
            py-1
            rounded-full
            font-semibold
            "
          >
            {pendingSighting}
          </span>

        </div>

        <div
          className="
          flex
          justify-between
          items-center
          "
        >
          <div>

            <p className="font-medium">
              🧬 Review Species
            </p>

            <p
              className="
              text-sm
              text-gray-400
              "
            >
              Menunggu persetujuan
            </p>

          </div>

          <span
            className="
            bg-yellow-400
            text-black
            px-3
            py-1
            rounded-full
            font-semibold
            "
          >
            {pendingSpecies}
          </span>

        </div>

        <div
          className="
          border-t
          border-neutral-800
          pt-4
          flex
          justify-between
          items-center
          "
        >

          <span
            className="
            font-semibold
            "
          >
            Total Pending
          </span>

          <span
            className="
            text-2xl
            font-bold
            text-yellow-400
            "
          >
            {totalPending}
          </span>

            <p
            className="
            text-xs
            text-gray-500
            mt-1
            "
            >
            Prioritaskan review species baru
            terlebih dahulu.
            </p>

        </div>

      </div>

    </div>
  );
}