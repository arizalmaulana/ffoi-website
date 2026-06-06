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