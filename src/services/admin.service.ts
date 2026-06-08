import { supabase } from "@/lib/supabase";

export async function getAdminStats() {

  const users =
    await supabase.rpc(
      "get_total_users"
    );

  const species =
    await supabase.rpc(
      "get_total_species"
    );

  const [
    sightings,
    pending,
    approved,
    rejected,
  ] = await Promise.all([

    supabase
      .from("sighting")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("sighting")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "menunggu")
      .eq("spesies_baru", false)
      .order("dibuat_pada", {
        ascending: false,
      }),

      

    supabase
      .from("sighting")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "disetujui"),

    supabase
      .from("sighting")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "ditolak"),
  ]);

  return {
    totalUsers:
      users.data ?? 0,

    totalSpecies:
      species.data ?? 0,

    totalSightings:
      sightings.count ?? 0,

    pending:
      pending.count ?? 0,

    approved:
      approved.count ?? 0,

    rejected:
      rejected.count ?? 0,
  };
}

export async function getTopProvinces() {

  const { data, error } =
    await supabase
      .from("sighting")
      .select("provinsi");

  if (error) {
    console.error(error);
    return [];
  }

  const counts =
    new Map<string, number>();

  data.forEach((item) => {

    const current =
      counts.get(
        item.provinsi
      ) ?? 0;

    counts.set(
      item.provinsi,
      current + 1
    );

  });

  return [...counts.entries()]
    .sort(
      (a, b) =>
        b[1] - a[1]
    )
    .slice(0, 5)
    .map(([name, total]) => ({
      name,
      total,
    }));
}

export async function getRecentSightings() {

  const { data, error } =
    await supabase
      .from("sighting")
      .select(`
        id,
        nama_lokal,
        nama_lokasi,
        status,
        dibuat_pada
      `)
      .order(
        "dibuat_pada",
        {
          ascending: false,
        }
      )
      .limit(5);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getTopContributors() {

  const { data, error } =
    await supabase
      .from("sighting")
      .select(
        "diunggah_oleh"
      );

  if (error) {
    console.error(error);
    return [];
  }

  const counts =
    new Map<string, number>();

  data.forEach((item) => {

    if (!item.diunggah_oleh)
      return;

    const current =
      counts.get(
        item.diunggah_oleh
      ) ?? 0;

    counts.set(
      item.diunggah_oleh,
      current + 1
    );

  });

  const ranking =
    [...counts.entries()]
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 5);

  const result = [];

  for (
    const [
      userId,
      total,
    ] of ranking
  ) {

    const {
      data: profile,
      error,
    } = await supabase
      .from("profil")
      .select(
        "id, username"
      )
      .eq("id", userId)
      .single();

    if (
      !error &&
      profile
    ) {

      result.push({
        id: profile.id,
        username:
          profile.username ??
          "Unknown User",
        total,
      });

    }
  }

  return result;
}

export async function getPendingActions() {

  const [
    sighting,
    species,
  ] = await Promise.all([

    supabase
      .from("sighting")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "menunggu")
      .eq("spesies_baru", false),

    supabase
      .from("sighting")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("spesies_baru", true),

  ]);

  const pendingSighting =
    sighting.count ?? 0;

  const pendingSpecies =
    species.count ?? 0;

  return {
    pendingSighting,
    pendingSpecies,
    totalPending:
      pendingSighting +
      pendingSpecies,
  };
}