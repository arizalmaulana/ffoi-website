"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Sighting } from "@/types/sighting";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./MapView"), {
  ssr: false,
});

export default function ExplorePage() {
  const [data, setData] = useState<Sighting[]>([]);

  useEffect(() => {
    supabase
      .from("sighting")
      .select("*")
      .then(({ data: sightings }) => setData(sightings || []));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Explore Data</h1>

      <Map data={data} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="border border-yellow-500/20 rounded-xl p-3">
            <img
              src={item.foto_url ?? "/images/no-image.png"}
              alt={item.nama_lokal ?? "Sighting"}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h2 className="font-semibold">{item.nama_lokal}</h2>
            <p className="text-gray-400 text-sm">{item.provinsi}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
