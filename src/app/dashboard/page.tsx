"use client";

import { useEffect, useState } from "react";

import HeroSection from "@/components/dashboard/HeroSection";
import StatsCards from "@/components/dashboard/StatsCards";
import ProfileSection from "@/components/dashboard/ProfileSection";
import ActivitySection from "@/components/dashboard/ActivitySection";
import SightingSection from "@/components/dashboard/SightingSection";


import { getDashboardData } from "@/services/dashboard.service";
import { DashboardData } from "@/types/dashboard";

export default function DashboardPage() {
  const [data, setData] =
  useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const dashboardData = await getDashboardData();

        if (active) {
          setData(dashboardData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10">
        Loading...
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10 flex items-center justify-center">
        <p className="text-gray-400">
          Silakan login untuk mengakses dashboard.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">

        <HeroSection
          profile={data.profile}
        />

        <StatsCards
          total={data.stats.total}
          disetujui={data.stats.disetujui}
          menunggu={data.stats.menunggu}
          ditolak={data.stats.ditolak}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ProfileSection
            profile={data.profile}
          />

          <ActivitySection
            activities={data.activities}
          />
        </div>
        <SightingSection
          sightings={data.sightings}
        />
      </div>
    </main>
  );
}