interface Activity {
  id: string;
  nama_lokal: string;
  nama_ilmiah: string;
  status: string;
  dibuat_pada: string;
}

interface ActivitySectionProps {
  activities: Activity[];
}

export default function ActivitySection({
  activities,
}: ActivitySectionProps) {
  return (
    <section
      className="bg-neutral-950 border border-yellow-500/20 rounded-2xl p-6 sm:p-8 h-full"
    >
      <h2
        className="text-yellow-400 text-2xl font-bold mb-8"
      >
        Aktivitas Terbaru
      </h2>

      {activities.length === 0 ? (
        <div className="text-gray-500">
          Belum ada aktivitas.
        </div>
      ) : (
        <div className="space-y-5">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="border-l border-yellow-500/30 pl-4"
            >
              <p className="text-white">
                Sighting 
                {activity.nama_lokal}
                
              </p>

              <p className="text-sm text-gray-400">
                {activity.status}
              </p>

              <p className="text-xs text-gray-500" suppressHydrationWarning>
                {new Date(activity.dibuat_pada).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}