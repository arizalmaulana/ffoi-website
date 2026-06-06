import { Profile } from "./profile";
import { Sighting } from "./sighting";

export interface DashboardStats {
    total: number;
    disetujui: number;
    menunggu: number;
    ditolak: number;
}

export interface DashboardActivity {
    id: string;
    nama_lokal: string;
    nama_ilmiah: string;
    status: string;
    dibuat_pada: string;
}

export interface DashboardData {
    profile: Profile;
    stats: DashboardStats;
    activities: DashboardActivity[];
    sightings: Sighting[];
}