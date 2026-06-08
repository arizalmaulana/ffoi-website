interface RecentSighting {
  id: string;
  nama_lokal: string | null;
  nama_lokasi: string;
  status: string;
  dibuat_pada: string;
}

interface Props {
  data: RecentSighting[];
}

export default function AdminRecentSightings({
  data,
}: Props) {

  function getStatusColor(
    status: string
  ) {

    switch (status) {

      case "disetujui":
        return "text-emerald-400";

      case "ditolak":
        return "text-rose-400";

      default:
        return "text-yellow-400";
    }
  }

  function getStatusIcon(
    status: string
  ) {

    switch (status) {

      case "disetujui":
        return "✅";

      case "ditolak":
        return "❌";

      default:
        return "⏳";
    }
  }

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
        Aktivitas Terbaru
      </h2>

      {data.length === 0 ? (

        <p className="text-gray-400">
          Belum ada aktivitas.
        </p>

      ) : (

        <div className="space-y-4">

          {data.map((item) => (

            <div
              key={item.id}
              className="
              border-b
              border-neutral-800
              pb-4
              last:border-none
              "
            >

              <div className="flex gap-3">

                <div className="text-lg">
                  {getStatusIcon(
                    item.status
                  )}
                </div>

                <div className="flex-1">

                  <p className="font-semibold">
                    {
                      item.nama_lokal ??
                      "Tanpa Nama Lokal"
                    }
                  </p>

                  <p
                    className="
                    text-sm
                    text-gray-400
                    "
                  >
                    {item.nama_lokasi}
                  </p>

                  <p
                    className={`
                      text-sm
                      mt-1
                      font-medium
                      ${getStatusColor(
                        item.status
                      )}
                    `}
                  >
                    {item.status}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}