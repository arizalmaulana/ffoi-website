export interface Sighting {
  id: string;

  spesies_id: string | null;

  nama_lokal: string | null;

  nama_ilmiah: string | null;

  tipe_organisme: string;

  deskripsi: string | null;

  foto_url: string | null;

  nama_lokasi: string;

  provinsi: string;

  latitude: number;

  longitude: number;

  habitat: string;

  substrat: string;

  tanggal_temuan: string;

  status: string;

  diunggah_oleh: string;

  dibuat_pada: string;

  diperbarui_pada: string;

  spesies_baru: boolean;

  catatan_admin: string | null;

  ditinjau_pada: string | null;
}