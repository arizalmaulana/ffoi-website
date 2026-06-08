"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
} from "next/navigation";

import SightingForm
from "@/components/sighting/SightingForm";

import {
  getSightingById,
} from "@/services/sighting.service";

import { Sighting }
from "@/types/sighting";

export default function
AdminEditSightingPage() {

  const params =
    useParams();

  const [loading, setLoading] =
    useState(true);

  const [sighting, setSighting] =
    useState<Sighting | null>(
      null
    );

  useEffect(() => {

    async function loadData() {

      const data =
        await getSightingById(
          params.id as string
        );

      setSighting(data);

      setLoading(false);
    }

    loadData();

  }, [params.id]);

  if (loading) {

    return (
      <div>
        Memuat data...
      </div>
    );

  }

  if (!sighting) {

    return (
      <div>
        Data tidak ditemukan
      </div>
    );

  }

  return (

    <div className="max-w-5xl mx-auto">

      <Link
        href={`/admin/sighting/${sighting.id}`}
        className="
        text-yellow-400
        mb-6
        inline-block
        "
      >
        ← Kembali
      </Link>

      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Edit Sighting
      </h1>

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
          initialData={sighting}
        />

      </div>

    </div>

  );
}