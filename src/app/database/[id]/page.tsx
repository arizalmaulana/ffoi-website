"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function SpeciesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const [species, setSpecies] =
    useState<any>(null);

  useEffect(() => {

    async function load() {

      const { id } =
        await params;

      const { data } =
        await supabase
          .from("spesies")
          .select("*")
          .eq("id", id)
          .single();

      setSpecies(data);
    }

    load();

  }, [params]);

  if (!species)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold">
          {species.nama_lokal ??
            "Tidak ada nama lokal"}
        </h1>

        <p className="italic text-xl text-gray-400 mt-2">
          {species.species}
        </p>

        <div className="mt-10 space-y-4">

          <p>
            <strong>Ordo:</strong>{" "}
            {species.ordo}
          </p>

          <p>
            <strong>Family:</strong>{" "}
            {species.family}
          </p>

          <p>
            <strong>Occurrence:</strong>{" "}
            {species.occurrence}
          </p>

          <p>
            <strong>Status Konservasi:</strong>{" "}
            {species.status_konservasi ??
              "-"}
          </p>

          <p>
            <strong>Deskripsi:</strong>{" "}
            {species.deskripsi ??
              "-"}
          </p>

        </div>

      </div>

    </main>
  );
}