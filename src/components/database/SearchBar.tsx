interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="Cari spesies atau nama lokal..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
        w-full
        bg-neutral-900
        border
        border-yellow-500/20
        rounded-xl
        px-4
        py-3
        text-white
        mb-6
      "
    />
  );
}