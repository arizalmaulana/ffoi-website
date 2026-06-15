interface StatsCardsProps {
  total: number;
  disetujui: number;
  menunggu: number;
  ditolak: number;
}

export default function StatsCards({
  total,
  disetujui,
  menunggu,
  ditolak,
}: StatsCardsProps) {
  const cards = [
    {
      title: "Total Sighting",
      value: total,
    },
    {
      title: "Disetujui",
      value: disetujui,
    },
    {
      title: "Menunggu",
      value: menunggu,
    },
    {
      title: "Ditolak",
      value: ditolak,
    },
  ];

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-neutral-950 border border-yellow-500/20 rounded-xl p-6"
        >
          <h3 className="text-gray-400 mb-3">
            {card.title}
          </h3>

          <p className="text-5xl font-bold text-white">
            {card.value}
          </p>
        </div>
      ))}
    </section>
  );
}