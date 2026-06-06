"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  getMySightingById,
} from "@/services/sighting.service";

import { Sighting } from "@/types/sighting";

import EditSightingForm from "@/components/sighting/EditSightingForm";

export default function EditSightingPage() {
  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [sighting, setSighting] =
    useState<Sighting | null>(null);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const data =
        await getMySightingById(
          params.id as string,
          user.id
        );

      if (!data) {
        router.push(
          "/dashboard/sighting"
        );

        return;
      }

      if (
        data.status ===
        "disetujui"
      ) {
        alert(
          "Sighting yang sudah disetujui tidak dapat diedit"
        );

        router.push(
          `/dashboard/sighting/${data.id}`
        );

        return;
      }

      setSighting(data);

      setLoading(false);
    }

    loadData();
  }, [params.id, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        Memuat data...
      </main>
    );
  }

  if (!sighting) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        Data tidak ditemukan
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-10 px-6">

      <div className="max-w-5xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Edit Sighting
          </h1>

          <p className="text-gray-400 mt-2">
            Perbarui data hasil
            pengamatan organisme.
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
          <EditSightingForm
            sighting={sighting}
          />
        </div>

      </div>

    </main>
  );
}