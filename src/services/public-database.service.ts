import { supabase } from "@/lib/supabase";

export interface HomepageSpecies {
  id: string;
  foto_url: string | null;
  lokasi: string;
  species: string;
  family: string;
  ordo: string;
  status_konservasi: string;
}

export async function getHomepageSpecies(): Promise<HomepageSpecies[]> {

  const { data, error } =
    await supabase
      .from("sighting")
      .select(`
        id,
        foto_url,
        nama_lokasi,
        spesies_id
      `)
      .eq("status", "disetujui")
      .not("spesies_id", "is", null)
      .order("dibuat_pada", {
        ascending: false,
      })
      .limit(5);

  if (error || !data) {
    console.error(
      "getHomepageSpecies:",
      error
    );

    return [];
  }

  const result =
    await Promise.all(

      data.map(
        async (item) => {

          const {
            data: species,
          } = await supabase
            .from("spesies")
            .select(`
              species,
              family,
              ordo,
              status_konservasi
            `)
            .eq(
              "id",
              item.spesies_id
            )
            .single();

          return {
            id: item.id,
            foto_url:
              item.foto_url,
            lokasi:
              item.nama_lokasi,
            species:
              species?.species ??
              "-",
            family:
              species?.family ??
              "-",
            ordo:
              species?.ordo ??
              "-",
            status_konservasi:
              species?.status_konservasi ?? "NE",
          };
        }
      )

    );

  return result;
}

export async function getBiodiversityDetail(
  sightingId: string
) {

  const {
    data: sighting,
    error,
  } = await supabase
    .from("sighting")
    .select("*")
    .eq("id", sightingId)
    .eq("status", "disetujui")
    .single();

  if (error || !sighting) {
    return null;
  }

  const {
    data: species,
  } = await supabase
    .from("spesies")
    .select("*")
    .eq(
      "id",
      sighting.spesies_id
    )
    .single();

  const {
    data: contributor,
  } = await supabase
    .from("profil")
    .select(`
      username,
      nama_lengkap,
      email,
      foto_profil,
      bio
    `)
    .eq(
      "id",
      sighting.diunggah_oleh
    )
    .single();


  return {
    sighting,
    species,
    contributor,
  };
}

export async function getRelatedSightings(
  speciesId: string,
  currentSightingId: string
) {

  const { data, error } =
    await supabase
      .from("sighting")
      .select(`
        id,
        foto_url,
        nama_lokasi,
        spesies_id
      `)
      .eq("status", "disetujui")
      .eq(
        "spesies_id",
        speciesId
      )
      .neq(
        "id",
        currentSightingId
      )
      .order(
        "dibuat_pada",
        {
          ascending: false,
        }
      )
      .limit(4);

  if (error) {
    console.error(error);
    return [];
  }

  const result =
    await Promise.all(
      (data ?? []).map(
        async (item) => {

          const {
            data: species,
          } = await supabase
            .from("spesies")
            .select(`
              species,
              family
            `)
            .eq(
              "id",
              item.spesies_id
            )
            .single();

          return {
            ...item,
            species:
              species?.species ??
              "-",
            family:
              species?.family ??
              "-",
          };
        }
      )
    );

  return result;
}

export async function getSpeciesDetail(
  speciesId: string
) {

  const {
    data: species,
    error,
  } = await supabase
    .from("spesies")
    .select("*")
    .eq("id", speciesId)
    .single();

  if (error || !species) {
    return null;
  }

  const {
    data: sightings,
  } = await supabase
    .from("sighting")
    .select("*")
    .eq("status", "disetujui")
    .eq(
      "spesies_id",
      speciesId
    )
    .order(
      "dibuat_pada",
      {
        ascending: false,
      }
    );

  return {
    species,
    sightings:
      sightings ?? [],
  };
}