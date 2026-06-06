interface Props {
  ordo: string;
  family: string;
  occurrence: string;

  setOrdo: (value: string) => void;
  setFamily: (value: string) => void;
  setOccurrence: (value: string) => void;

  ordoOptions: string[];
  familyOptions: string[];
}

export default function FilterBar({
  ordo,
  family,
  occurrence,

  setOrdo,
  setFamily,
  setOccurrence,

  ordoOptions,
  familyOptions,
}: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8">

      <select
        value={ordo}
        onChange={(e) => setOrdo(e.target.value)}
        className="bg-neutral-900 border border-yellow-500/20 rounded-xl p-3"
      >
        <option value="">Semua Ordo</option>

        {ordoOptions.map((item) => (
          <option key={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={family}
        onChange={(e) => setFamily(e.target.value)}
        className="bg-neutral-900 border border-yellow-500/20 rounded-xl p-3"
      >
        <option value="">Semua Family</option>

        {familyOptions.map((item) => (
          <option key={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={occurrence}
        onChange={(e) =>
          setOccurrence(e.target.value)
        }
        className="bg-neutral-900 border border-yellow-500/20 rounded-xl p-3"
      >
        <option value="">
          Semua Occurrence
        </option>

        <option value="native">
          Native
        </option>

        <option value="endemic">
          Endemic
        </option>

        <option value="introduced">
          Introduced
        </option>

        <option value="invasive">
          Invasive
        </option>

      </select>

    </div>
  );
}