"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./MapView"), {
ssr: false,
});

export default function ExplorePage() {
const [data, setData] = useState<any[]>([]);

useEffect(() => {
    supabase
    .from("sighting")
    .select("*")
    .then(({ data }) => setData(data || []));
}, []);

return (
    <div className="p-6 space-y-6">

    <h1 className="text-3xl font-bold">
        Explore Data
    </h1>

    <Map data={data} />

    <div className="grid grid-cols-3 gap-4">
        {data.map((item) => (
        <div key={item.id} className="border p-3">
            <img src={item.foto_url} />
            <h2>{item.nama_lokal}</h2>
            <p>{item.provinsi}</p>
        </div>
        ))}
    </div>
    </div>
);
}