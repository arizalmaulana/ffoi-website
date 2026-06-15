interface Contributor {
  id: string;
  username: string;
  total: number;
}

interface Props {
  data: Contributor[];
}

export default function AdminTopContributors({
  data,
}: Props) {

  function getRank(
    index: number
  ) {

    switch (index) {

      case 0:
        return "🥇";

      case 1:
        return "🥈";

      case 2:
        return "🥉";

      default:
        return `#${index + 1}`;
    }
  }

  return (
    <div
      className="bg-neutral-950 border border-yellow-500/20 rounded-2xl p-6"
    >

      <h2
        className="text-xl font-bold mb-6"
      >
        Top Kontributor
      </h2>

      {data.length === 0 ? (

        <p className="text-gray-400">
          Belum ada data.
        </p>

      ) : (

        <div className="space-y-4">

          {data.map(
            (
              item,
              index
            ) => (

              <div
                key={item.id}
                className="flex justify-between items-center border-b border-neutral-800 pb-4 last:border-none"
              >

                <div
                  className="flex items-center gap-3"
                >

                  <span
                    className="text-xl min-w-[40px]"
                  >
                    {getRank(
                      index
                    )}
                  </span>

                  <div>

                    <p
                      className="font-semibold"
                    >
                      {item.username}
                    </p>

                    <p
                      className="text-xs text-gray-400"
                    >
                      Kontributor
                    </p>

                  </div>

                </div>

                <span
                  className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold"
                >
                  {item.total}
                </span>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}