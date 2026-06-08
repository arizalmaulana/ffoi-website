"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import AdminSidebar
from "@/components/admin/AdminSidebar";

import {
  getProfile,
} from "@/services/profile.service";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function checkRole() {

      const profile =
        await getProfile();

      if (
        !profile ||
        profile.role !==
          "admin"
      ) {

        router.replace(
          "/dashboard"
        );

        

        return;
      }

      setLoading(false);
    }

    checkRole();

  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Memuat...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}