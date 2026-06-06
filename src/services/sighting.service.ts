import { supabase } from "@/lib/supabase";
import { Sighting } from "@/types/sighting";

export async function getMySightings(
  userId: string
): Promise<Sighting[]> {
  const { data, error } = await supabase
    .from("sighting")
    .select("*")
    .eq("diunggah_oleh", userId)
    .order("dibuat_pada", {
      ascending: false,
    });

  if (error) {
    console.error(
      "getMySightings:",
      error
    );

    return [];
  }

  return (data ?? []) as Sighting[];
}

export async function createSighting(
  payload: {
    spesies_id: string | null;

    spesies_baru?: boolean;

    nama_lokal?: string | null;

    nama_ilmiah?: string | null;

    tipe_organisme: string;

    deskripsi?: string | null;

    foto_url: string;

    nama_lokasi: string;

    provinsi: string;

    latitude: number;

    longitude: number;

    habitat: string;

    substrat: string;

    tanggal_temuan: string;

    diunggah_oleh: string;
  }
) {
  const { data, error } = await supabase
    .from("sighting")
    .insert({
      spesies_id: payload.spesies_id,

      nama_lokal: payload.nama_lokal ?? null,

      nama_ilmiah: payload.nama_ilmiah ?? null,

      tipe_organisme: payload.tipe_organisme,

      deskripsi: payload.deskripsi ?? null,

      foto_url: payload.foto_url,

      nama_lokasi: payload.nama_lokasi,

      provinsi: payload.provinsi,

      latitude: payload.latitude,

      longitude: payload.longitude,

      habitat: payload.habitat,

      substrat: payload.substrat,

      tanggal_temuan: payload.tanggal_temuan,

      diunggah_oleh: payload.diunggah_oleh,

      status: "menunggu",

      spesies_baru: payload.spesies_baru ?? false,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getSightingById(
  id: string
): Promise<Sighting | null> {

  const { data, error } =
    await supabase
      .from("sighting")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    console.error(
      "getSightingById:",
      error
    );

    return null;
  }

  return data as Sighting;
}

export async function deleteSighting(
  id: string,
  userId: string
) {
  const { error } =
    await supabase
      .from("sighting")
      .delete()
      .eq("id", id)
      .eq(
        "diunggah_oleh",
        userId
      );

  if (error) {
    throw error;
  }
}

export async function updateSighting(
  id: string,
  payload: Partial<Sighting>
) {
  const { error } =
    await supabase
      .from("sighting")
      .update({
        ...payload,
        diperbarui_pada:
          new Date().toISOString(),
      })
      .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function getMySightingById(
  sightingId: string,
  userId: string
) {
  const { data, error } =
    await supabase
      .from("sighting")
      .select("*")
      .eq("id", sightingId)
      .eq("diunggah_oleh", userId)
      .single();

  if (error) {
    return null;
  }

  return data;
}