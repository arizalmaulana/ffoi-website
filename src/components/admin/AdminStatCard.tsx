type Accent =
  | "amber"
  | "emerald"
  | "rose";

interface Props {
  title: string;
  value: number;
  accent?: Accent;
}

const accentMap: Record<
  Accent,
  string
> = {
  amber: "bg-yellow-400",
  emerald: "bg-emerald-400",
  rose: "bg-rose-400",
};

export default function AdminStatCard({
  title,
  value,
  accent = "amber",
}: Props) {

  return (
    <div
      className="bg-neutral-950 border border-yellow-500/20 rounded-2xl p-5 hover:border-yellow-400 transition"
    >

      <div
        className={`h-1 w-12 rounded-full mb-4 ${accentMap[accent]}`}
      />

      <p
        className="text-gray-400 text-sm"
      >
        {title}
      </p>

      <h2
        className="text-4xl font-bold mt-2"
      >
        {value}
      </h2>

    </div>
  );
}