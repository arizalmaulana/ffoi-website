import { supabase } from "@/lib/supabase";
import { Species } from "@/types/species";


const PAGE_SIZE = 50;
interface SpeciesFilter {
  page?: number;
  search?: string;
  ordo?: string;
  family?: string;
  occurrence?: string;
}

export async function getSpecies({
  page = 1,
  search = "",
  ordo = "",
  family = "",
  occurrence = "",
}: SpeciesFilter): Promise<Species[]> {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("spesies")
    .select("*")
    .order("species");

  if (search.trim()) {
    query = query.or(
      `species.ilike.%${search}%,nama_lokal.ilike.%${search}%`
    );
  }

  if (ordo) {
    query = query.eq("ordo", ordo);
  }

  if (family) {
    query = query.eq("family", family);
  }

  if (occurrence) {
    query = query.eq("occurrence", occurrence);
  }

  const { data, error } = await query.range(from, to);

  if (error) {
    console.error(error);
    return [];
  }

  return data as Species[];
}

export async function getSpeciesCount({
  search = "",
  ordo = "",
  family = "",
  occurrence = "",
}: Omit<SpeciesFilter, "page">) {

  let query = supabase
    .from("spesies")
    .select("*", {
      count: "exact",
      head: true,
    });

  if (search.trim()) {
    query = query.or(
      `species.ilike.%${search}%,nama_lokal.ilike.%${search}%`
    );
  }

  if (ordo) {
    query = query.eq("ordo", ordo);
  }

  if (family) {
    query = query.eq("family", family);
  }

  if (occurrence) {
    query = query.eq("occurrence", occurrence);
  }

  const { count } = await query;

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