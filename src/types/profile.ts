export interface Profile {
  id: string;
  email: string;
  username: string;
  nama_lengkap: string;

  foto_profil: string | null;
  bio: string | null;

  role: "admin" | "pengguna";

  dibuat_pada: string;
  diperbarui_pada: string;
}