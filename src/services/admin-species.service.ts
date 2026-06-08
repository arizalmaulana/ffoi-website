import { supabase } from "@/lib/supabase";
import { Sighting } from "@/types/sighting";

export async function getSpeciesReviewList() {

  const { data, error } =
    await supabase
      .from("sighting")
      .select("*")
      .eq("spesies_baru", true)
      .order("dibuat_pada", {
        ascending: false,
      });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Sighting[];
}


export async function getSpeciesReviewById(
  id: string
) {
  const { data, error } =
    await supabase
      .from("sighting")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as Sighting;
}

export async function approveSpeciesReview(
  sightingId: string,
  payload: {
    species: string;
    nama_lokal: string;
    nama_internasional: string;
    ordo: string;
    family: string;
    occurrence: string;
    status_konservasi: string;
    deskripsi: string;
  }
) {
  const response = await fetch(
    `/api/admin/species-review/${sightingId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "approve",
        payload,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.error ||
        "Gagal menyetujui species baru"
    );
  }
}

export async function rejectSpeciesReview(
  sightingId: string
) {
  const response = await fetch(
    `/api/admin/species-review/${sightingId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "reject",
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.error ||
        "Gagal menolak species baru"
    );
  }
}