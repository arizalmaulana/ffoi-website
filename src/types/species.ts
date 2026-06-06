export interface Species {
  id: string;

  species: string;

  nama_lokal: string | null;

  nama_internasional: string | null;

  ordo: string;

  family: string;

  occurrence: string;

  status_konservasi: string | null;

  endemik: boolean;

  deskripsi: string | null;
}

export interface SpeciesFilters {
  search?: string;
  family?: string;
  ordo?: string;
  occurrence?: string;
}