import { supabase } from "@/lib/supabase";
import { Species } from "@/types/species";


const PAGE_SIZE = 100;

export async function getSpecies(
  page: number = 1
): Promise<Species[]> {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("spesies")
    .select("*")
    .order("species")
    .range(from, to);

  if (error) {
    console.error(error);
    return [];
  }

  return data as Species[];
}

export async function getSpeciesCount() {
  const { count } = await supabase
    .from("spesies")
    .select("*", {
      count: "exact",
      head: true,
    });

  return count ?? 0;
}
    
export async function getOrdoOptions() {
  const { data } = await supabase
    .from("spesies")
    .select("ordo");

  return [...new Set(data?.map((x) => x.ordo) ?? [])];
}

export async function getFamilyOptions() {
  const { data } = await supabase
    .from("spesies")
    .select("family");

  return [...new Set(data?.map((x) => x.family) ?? [])];
}

export async function searchSpecies(
  keyword: string
): Promise<
  Pick<
    Species,
    "id" |
    "species" |
    "nama_lokal"
  >[]
> {
  if (!keyword.trim()) {
    return [];
  }

  const { data, error } =
    await supabase
      .from("spesies")
      .select(`
        id,
        species,
        nama_lokal
      `)
      .or(
        `species.ilike.%${keyword}%,nama_lokal.ilike.%${keyword}%`
      )
      .order("species")
      .limit(10);

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export async function getAllSpecies(): Promise<Species[]> {

  const { data, error } =
    await supabase
      .from("spesies")
      .select("*")
      .order("species");

  if (error) {
    console.error(error);
    return [];
  }

  return data as Species[];
}

export async function searchSpeciesAdmin(
  keyword: string
): Promise<Species[]> {
  const searchPattern = `%${keyword.trim()}%`;

  const { data, error } =
    await supabase
      .from("spesies")
      .select("*")
      .or(`species.ilike.${searchPattern},nama_lokal.ilike.${searchPattern}`)
      .order("species")
      .limit(50);

  if (error) {
    console.error("searchSpeciesAdmin:", error);
    return [];
  }

  return data as Species[];
}

export async function getSpeciesById(
  id: string
): Promise<Species | null> {

  const { data, error } =
    await supabase
      .from("spesies")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as Species;
}

export async function deleteSpecies(
  id: string
) {

  const { error } =
    await supabase
      .from("spesies")
      .delete()
      .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function updateSpecies(
  id: string,
  payload: Partial<Species>
) {

  const { error } =
    await supabase
      .from("spesies")
      .update(payload)
      .eq("id", id);

  if (error) {
    throw error;
  }
}

export interface CreateSpeciesPayload {
  species: string;

  nama_lokal: string;

  nama_internasional: string;

  ordo: string;

  family: string;

  occurrence:
    | "native"
    | "endemic"
    | "introduced"
    | "invasive";

  status_konservasi: string;

  deskripsi: string;
}

export async function createSpecies(
  payload: CreateSpeciesPayload
) {

  const { error } =
    await supabase
      .from("spesies")
      .insert({
        species:
          payload.species,

        nama_lokal:
          payload.nama_lokal || null,

        nama_internasional:
          payload.nama_internasional || null,

        ordo:
          payload.ordo,

        family:
          payload.family,

        occurrence:
          payload.occurrence,

        status_konservasi:
          payload.status_konservasi || null,

        deskripsi:
          payload.deskripsi || null,
      });

  if (error) {

    console.error(error);

    throw error;

  }
}