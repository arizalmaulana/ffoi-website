import Link from "next/link";
import { Species } from "@/types/species";

interface Props {
  data: Species[];
}

export default function DatabaseTable({
  data,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-yellow-500/20">
      <table className="w-full text-sm">
        <thead className="bg-yellow-400 text-black">
          <tr>
            <th className="p-3 text-left">Ordo </th>
            <th className="p-3 text-left">Family</th>
            <th className="p-3 text-left">Species</th>
            <th className="p-3 text-left">Occurrence</th>
            <th className="p-3 text-left">Nama Internasional</th>
            <th className="p-3 text-left">Nama Lokal</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-yellow-500/10 hover:bg-neutral-900"
            >              
              <td className="p-3">
                {item.ordo}
              </td>
              
              <td className="p-3">
                {item.family}
              </td>
              
              <td className="p-3">
                <Link
                  href={`/database/${item.id}`}
                  className="italic text-yellow-400"
                >
                  {item.species}
                </Link>
              </td>

                <td className="p-3">
                    {item.occurrence}
                </td>

              <td className="p-3">
                {item.nama_internasional ?? "-"}
              </td>

              <td className="p-3">
                {item.nama_lokal ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}