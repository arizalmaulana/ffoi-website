import SightingForm
from "@/components/sighting/SightingForm";
import Link from "next/link";

export default function
AdminCreateSightingPage() {

  return (

    <div className="max-w-5xl mx-auto">

      <div className="mb-8">
        <Link
            href="/admin/sighting"
            className="
            inline-flex
            items-center
            gap-2
            text-yellow-400
            hover:text-yellow-300
            mb-6
            "
        >
            ← Kembali ke Review Sighting
        </Link>

        <h1 className="text-4xl font-bold">
          Tambah Sighting
        </h1>

        <p className="text-gray-400 mt-2">
          Tambahkan data observasi
          langsung ke database.
        </p>

      </div>

      <div
        className="
        bg-neutral-950
        border
        border-yellow-500/20
        rounded-xl
        p-8
        "
      >

        <SightingForm
          isAdmin
        />

      </div>

    </div>

  );
}