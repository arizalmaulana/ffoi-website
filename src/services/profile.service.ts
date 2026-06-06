import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/profile";

export async function getProfile(): Promise<Profile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profil")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("getProfile:", error);
    return null;
  }

  return data as Profile;
}