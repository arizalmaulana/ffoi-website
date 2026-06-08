export interface Species {
  id: string;

  species: string;

  nama_lokal: string | null;

  nama_internasional: string | null;

  ordo: string;

  family: string;

  occurrence:
    | "native"
    | "endemic"
    | "introduced"
    | "invasive";

  status_konservasi: string | null;

  deskripsi: string | null;
}

export interface SpeciesFilters {
  search?: string;
  family?: string;
  ordo?: string;
  occurrence?: string;
}