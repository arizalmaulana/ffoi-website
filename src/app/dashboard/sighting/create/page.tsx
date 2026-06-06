import SightingForm from "@/components/sighting/SightingForm";

export default function CreateSightingPage() {
  return (
    <main className="min-h-screen bg-black text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Tambah Sighting
          </h1>

          <p className="text-gray-400 mt-2">
            Laporkan hasil pengamatan organisme air tawar
            untuk mendukung dokumentasi dan konservasi
            biodiversitas Indonesia.
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
          <SightingForm />
        </div>

      </div>
    </main>
  );
}