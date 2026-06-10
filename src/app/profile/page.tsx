"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  getProfile,
} from "@/services/profile.service";

import {
  getMySightings,
} from "@/services/sighting.service";

import { Profile } from "@/types/profile";
import { Sighting } from "@/types/sighting";

import SightingStatusBadge
from "@/components/sighting/SightingStatusBadge";

export default function ProfilePage() {

  const [loading, setLoading] =
    useState(true);

  const [profile, setProfile] =
    useState<Profile | null>(
      null
    );

  const [sightings, setSightings] =
    useState<Sighting[]>([]);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const profileData = await getProfile();

        if (!profileData) {
          return;
        }

        const sightingData = await getMySightings(profileData.id);

        if (!active) return;

        setProfile(profileData);
        setSightings(sightingData);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {

    return (

      <main
        className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        "
      >
        Memuat profil...
      </main>

    );
  }

  if (!profile) {

    return (

      <main
        className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        "
      >
        Silakan login terlebih dahulu.
      </main>

    );
  }

  const totalSightings =
    sightings.length;

  const totalApproved =
    sightings.filter(
      (item) =>
        item.status ===
        "disetujui"
    ).length;

  const totalPending =
    sightings.filter(
      (item) =>
        item.status ===
        "menunggu"
    ).length;

  const totalRejected =
    sightings.filter(
      (item) =>
        item.status ===
        "ditolak"
    ).length;

  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-10
        "
      >

        {/* HEADER PROFILE */}
        <div
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-2xl
            p-8
            "
            >

            <div
                className="
                flex
                flex-col
                lg:flex-row
                gap-8
                items-start
                "
            >

                {/* FOTO PROFIL */}

                <div
                className="
                relative
                w-36
                h-36
                rounded-full
                overflow-hidden
                border-4
                border-yellow-500/20
                shrink-0
                "
                >

                <Image
                    src={
                    profile.foto_profil ??
                    "/images/default-avatar.png"
                    }
                    alt={
                    profile.nama_lengkap
                    }
                    fill
                    priority
                    unoptimized
                    className="object-cover"
                />

                </div>

                {/* INFORMASI */}

                <div className="flex-1">

                <div
                    className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-start
                    md:justify-between
                    gap-4
                    "
                >

                    <div>

                    <h1
                        className="
                        text-4xl
                        font-bold
                        "
                    >
                        {profile.nama_lengkap}
                    </h1>

                    <p
                        className="
                        text-yellow-400
                        mt-2
                        "
                    >
                        @{profile.username}
                    </p>

                    </div>

                    <Link
                    href="/profile/edit"
                    className="
                    bg-yellow-400
                    text-black
                    px-5
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-yellow-300
                    transition
                    "
                    >
                    Edit Profil
                    </Link>

                </div>

                <div className="mt-6">

                    <p
                    className="
                    text-gray-300
                    leading-relaxed
                    "
                    >
                    {
                        profile.bio ??
                        "Belum ada bio."
                    }
                    </p>

                </div>

                <div
                    className="
                    flex
                    flex-wrap
                    gap-3
                    mt-6
                    "
                >

                    <span
                    className="
                    px-3
                    py-1
                    rounded-full
                    bg-yellow-500/10
                    border
                    border-yellow-500/20
                    text-yellow-300
                    text-sm
                    "
                    >
                    {profile.role === "pengguna" ? "Citizen Ichthyologist" : profile.role}
                    </span>

                    <span
                    className="
                    px-3
                    py-1
                    rounded-full
                    bg-white/5
                    border
                    border-white/10
                    text-sm
                    "
                    >
                    {profile.email}
                    </span>

                </div>

                </div>

            </div>

            </div>

        {/* STATISTIK */}
        <div
            className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-4
            mt-8
            "
            >

            <div
                className="
                bg-neutral-950
                border
                border-yellow-500/20
                rounded-xl
                p-5
                "
            >

                <p className="text-gray-400">
                Total Sighting
                </p>

                <p
                className="
                text-3xl
                font-bold
                mt-2
                "
                >
                {totalSightings}
                </p>

            </div>

            <div
                className="
                bg-neutral-950
                border
                border-yellow-500/20
                rounded-xl
                p-5
                "
            >

                <p className="text-gray-400">
                Disetujui
                </p>

                <p
                className="
                text-3xl
                font-bold
                text-green-400
                mt-2
                "
                >
                {totalApproved}
                </p>

            </div>

            <div
                className="
                bg-neutral-950
                border
                border-yellow-500/20
                rounded-xl
                p-5
                "
            >

                <p className="text-gray-400">
                Menunggu
                </p>

                <p
                className="
                text-3xl
                font-bold
                text-yellow-400
                mt-2
                "
                >
                {totalPending}
                </p>

            </div>

            <div
                className="
                bg-neutral-950
                border
                border-yellow-500/20
                rounded-xl
                p-5
                "
            >

                <p className="text-gray-400">
                Ditolak
                </p>

                <p
                className="
                text-3xl
                font-bold
                text-red-400
                mt-2
                "
                >
                {totalRejected}
                </p>

            </div>

            </div>

        {/* SIGHTING SAYA */}

      </div>

    </main>

  );
}