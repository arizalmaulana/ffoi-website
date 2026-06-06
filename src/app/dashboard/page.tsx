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

  useEffect(() => {
    async function load() {
      const dashboardData =
        await getDashboardData();

      setData(dashboardData);
    }

    load();
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

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