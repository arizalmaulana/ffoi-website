import { supabase } from "@/lib/supabase";
import { getProfile } from "./profile.service";
import { getMySightings } from "./sighting.service";

export async function getDashboardStats(userId: string) {
  const { count: total } = await supabase
    .from("sighting")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("diunggah_oleh", userId);

  const { count: disetujui } = await supabase
    .from("sighting")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("diunggah_oleh", userId)
    .eq("status", "disetujui");

  const { count: menunggu } = await supabase
    .from("sighting")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("diunggah_oleh", userId)
    .eq("status", "menunggu");

  const { count: ditolak } = await supabase
    .from("sighting")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("diunggah_oleh", userId)
    .eq("status", "ditolak");

  return {
    total: total ?? 0,
    disetujui: disetujui ?? 0,
    menunggu: menunggu ?? 0,
    ditolak: ditolak ?? 0,
  };
}


export async function getDashboardData() {
    const profile = await getProfile();

    if (!profile) {
        return null;
    }

    const stats =
    await getDashboardStats(profile.id);

    const activities =
    await getRecentActivities(profile.id);

    const sightings =
    await getMySightings(profile.id);

    return {
    profile,
    stats,
    activities,
    sightings,
    };
}


export async function getRecentActivities(
  userId: string
) {
  const { data } = await supabase
    .from("sighting")
    .select(`
      id,
      nama_lokal,
      nama_ilmiah,
      status,
      dibuat_pada
    `)
    .eq("diunggah_oleh", userId)
    .order("dibuat_pada", {
      ascending: false,
    })
    .limit(5);

  return data ?? [];
}