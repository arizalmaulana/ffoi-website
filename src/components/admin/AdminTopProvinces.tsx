interface ProvinceData {
  name: string;
  total: number;
}

interface Props {
  data: ProvinceData[];
}

export default function AdminTopProvinces({
  data,
}: Props) {

  const maxTotal =
    Math.max(
      ...data.map(
        item => item.total
      ),
      1
    );

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
        Top Provinsi
      </h2>

      <div className="space-y-5">

        {data.map(item => (

          <div key={item.name}>

            <div
              className="
              flex
              justify-between
              mb-2
              "
            >

              <span>
                {item.name}
              </span>

              <span>
                {item.total}
              </span>

            </div>

            <div
              className="
              h-2
              bg-neutral-800
              rounded-full
              overflow-hidden
              "
            >

              <div
                className="
                h-2
                bg-yellow-400
                rounded-full
                "
                style={{
                  width:
                    `${
                      (
                        item.total /
                        maxTotal
                      ) * 100
                    }%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}