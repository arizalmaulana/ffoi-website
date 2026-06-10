"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminTopProvinces from "@/components/admin/AdminTopProvinces";
import AdminRecentSightings from "@/components/admin/AdminRecentSightings";
import AdminTopContributors from "@/components/admin/AdminTopContributors";

import AdminPendingAction
from "@/components/admin/AdminPendingAction";

import {
  getPendingActions,
} from "@/services/admin.service";

import {
  PendingAction,
} from "@/types/admin"; 

import {
  getAdminStats,
  getTopProvinces,
  getRecentSightings,
  getTopContributors,
} from "@/services/admin.service";

import {
  AdminStats,
  ProvinceData,
  RecentSighting,
  TopContributor,
} from "@/types/admin";

export default function AdminDashboardPage() {

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<AdminStats>({
      totalUsers: 0,
      totalSpecies: 0,
      totalSightings: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    });

  const [
    pendingAction,
    setPendingAction,
  ] = useState<PendingAction>({
    pendingSighting: 0,
    pendingSpecies: 0,
    totalPending: 0,
  });

  const [provinces, setProvinces] =
    useState<ProvinceData[]>([]);

  const [
    recentSightings,
    setRecentSightings,
  ] = useState<
    RecentSighting[]
  >([]);

  const [
    contributors,
    setContributors,
  ] = useState<
    TopContributor[]
  >([]);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [
          statsData,
          provincesData,
          recentData,
          contributorData,
          pendingData,
        ] = await Promise.all([
          getAdminStats(),
          getTopProvinces(),
          getRecentSightings(),
          getTopContributors(),
          getPendingActions(),
        ]);

        if (!active) return;

        setStats(statsData);
        setProvinces(provincesData);
        setRecentSightings(recentData);
        setContributors(contributorData);
        setPendingAction(pendingData);
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
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        text-white
        "
      >
        Memuat dashboard...
      </div>
    );
  }

  const totalStatus =
    stats.pending +
    stats.approved +
    stats.rejected;

  const pendingPercent =
    totalStatus === 0
      ? 0
      : (
          stats.pending /
          totalStatus
        ) * 100;

  const approvedPercent =
    totalStatus === 0
      ? 0
      : (
          stats.approved /
          totalStatus
        ) * 100;

  const rejectedPercent =
    totalStatus === 0
      ? 0
      : (
          stats.rejected /
          totalStatus
        ) * 100;

  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-6
      py-8
      space-y-8
      "
    >

      {/* Header */}

      <div>

        <h1
          className="
          text-4xl
          font-bold
          text-yellow-400
          "
        >
          Dashboard Admin
        </h1>

        <p
          className="
          text-gray-400
          mt-2
          "
        >
          Ringkasan aktivitas dan pengelolaan
          data Freshwater Fish of Indonesia.
        </p>

      </div>

      {/* KPI */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-5
        "
      >

        <AdminStatCard
          title="Total Pengguna"
          value={stats.totalUsers}
          accent="amber"
        />

        <AdminStatCard
          title="Total Species"
          value={stats.totalSpecies}
          accent="amber"
        />

        <AdminStatCard
          title="Total Sighting"
          value={stats.totalSightings}
          accent="amber"
        />

        <AdminStatCard
          title="Menunggu Review"
          value={stats.pending}
          accent="amber"
        />

        <AdminStatCard
          title="Disetujui"
          value={stats.approved}
          accent="emerald"
        />

        <AdminStatCard
          title="Ditolak"
          value={stats.rejected}
          accent="rose"
        />

      </div>

      {/* Quick Action */}

      <div>

        <h2
          className="
          text-2xl
          font-bold
          mb-4
          "
        >
          Aksi Cepat
        </h2>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
          "
        >

          <Link
            href="/admin/sighting"
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-2xl
            p-5
            hover:border-yellow-400
            transition
            "
          >

            <div className="text-3xl">
              🔍
            </div>

            <h3
              className="
              mt-3
              font-semibold
              "
            >
              Review Sighting
            </h3>

            <p
              className="
              text-xs
              text-gray-400
              mt-1
              "
            >
              Tinjau laporan sighting baru.
            </p>

          </Link>

          <Link
            href="/admin/species-review"
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-2xl
            p-5
            hover:border-yellow-400
            transition
            "
          >

            <div className="text-3xl">
              🧬
            </div>

            <h3
              className="
              mt-3
              font-semibold
              "
            >
              Review Species
            </h3>

            <p
              className="
              text-xs
              text-gray-400
              mt-1
              "
            >
              Validasi spesies baru.
            </p>

          </Link>

          <Link
            href="/admin/species"
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-2xl
            p-5
            hover:border-yellow-400
            transition
            "
          >

            <div className="text-3xl">
              🐟
            </div>

            <h3
              className="
              mt-3
              font-semibold
              "
            >
              Database Species
            </h3>

            <p
              className="
              text-xs
              text-gray-400
              mt-1
              "
            >
              Kelola data spesies.
            </p>

          </Link>

          <Link
            href="/admin/users"
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-2xl
            p-5
            hover:border-yellow-400
            transition
            "
          >

            <div className="text-3xl">
              👥
            </div>

            <h3
              className="
              mt-3
              font-semibold
              "
            >
              Pengguna
            </h3>

            <p
              className="
              text-xs
              text-gray-400
              mt-1
              "
            >
              Kelola akun dan hak akses.
            </p>

          </Link>

        </div>

      </div>

      {/* Status + Aktivitas */}

      <div
        className="grid lg:grid-cols-2 gap-6 mb-6">
        <AdminPendingAction
          pendingSighting={pendingAction.pendingSighting}
          pendingSpecies={pendingAction.pendingSpecies}
          totalPending={pendingAction.totalPending}
        />

        <AdminRecentSightings
          data={recentSightings}
        />

      </div>

      {/* Bottom */}

      <div
        className="
        grid
        lg:grid-cols-2
        gap-6
        "
      >

        <AdminTopProvinces
          data={provinces}
        />

        <AdminTopContributors
          data={contributors}
        />

      </div>

    </div>
  );
}