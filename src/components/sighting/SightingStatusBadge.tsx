interface Props {
  status: string;
}

export default function SightingStatusBadge({
  status,
}: Props) {
  let className =
    "px-3 py-1 rounded-full text-xs font-medium";

  if (status === "disetujui") {
    className +=
      " bg-green-500/20 text-green-400";
  } else if (status === "ditolak") {
    className +=
      " bg-red-500/20 text-red-400";
  } else {
    className +=
      " bg-yellow-500/20 text-yellow-400";
  }

  return (
    <span className={className}>
      {status}
    </span>
  );
}