import { supabase, waitForAuth } from "@/lib/supabase";
import { ensureProfile } from "@/lib/profile/ensure-profile";
import { Profile } from "@/types/profile";

export async function getProfile(): Promise<Profile | null> {
  await waitForAuth();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user) return null;

  return ensureProfile(supabase, user);
}

export async function updateProfile(
  payload: {
    username: string;
    nama_lengkap: string;
    bio: string | null;
    foto_profil: string | null;
  }
) {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(
      "User tidak ditemukan"
    );
  }

  const { error } =
    await supabase
      .from("profil")
      .update({
        username:
          payload.username,
        nama_lengkap:
          payload.nama_lengkap,
        bio: payload.bio,
        foto_profil:
          payload.foto_profil,
        diperbarui_pada:
          new Date().toISOString(),
      })
      .eq(
        "id",
        user.id
      );

  if (error) {
    throw error;
  }
}
