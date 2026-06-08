export interface AdminStats {
  totalUsers: number;
  totalSpecies: number;
  totalSightings: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface ProvinceData {
  name: string;
  total: number;
}

export interface RecentSighting {
  id: string;
  nama_lokal: string | null;
  nama_lokasi: string;
  status: string;
  dibuat_pada: string;
}

export interface TopContributor {
  id: string;
  username: string;
  total: number;
}

export interface PendingAction {
  pendingSighting: number;
  pendingSpecies: number;
  totalPending: number;
}