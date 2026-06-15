import type { SupabaseClient, User } from "@supabase/supabase-js";

import type { Profile } from "@/types/profile";

type ProfileInsert = {
  id: string;
  email: string;
  username: string;
  nama_lengkap: string;
  foto_profil: string | null;
  bio: string | null;
  role: "admin" | "pengguna";
};

function deriveProfileFields(user: User): ProfileInsert {
  const meta = user.user_metadata ?? {};
  const email = user.email ?? "";

  const nama_lengkap =
    (meta.nama_lengkap as string | undefined) ??
    (meta.full_name as string | undefined) ??
    (meta.name as string | undefined) ??
    email.split("@")[0] ??
    "Pengguna";

  const baseUsername =
    (meta.username as string | undefined) ??
    email.split("@")[0] ??
    `user_${user.id.replace(/-/g, "").slice(0, 8)}`;

  const foto_profil =
    (meta.avatar_url as string | undefined) ??
    (meta.picture as string | undefined) ??
    null;

  return {
    id: user.id,
    email,
    username: baseUsername,
    nama_lengkap,
    foto_profil,
    bio: null,
    role: "pengguna",
  };
}

export async function ensureProfile(
  supabase: SupabaseClient,
  user: User
): Promise<Profile | null> {
  const { data: existing, error: selectError } = await supabase
    .from("profil")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (selectError) {
    console.error("ensureProfile select error:", selectError);
    return null;
  }

  if (existing) {
    return existing as Profile;
  }

  const base = deriveProfileFields(user);
  let username = base.username;

  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, error } = await supabase
      .from("profil")
      .insert({ ...base, username })
      .select("*")
      .single();

    if (!error && data) {
      return data as Profile;
    }

    if (error?.code === "23505") {
      const suffix = user.id.replace(/-/g, "").slice(0, 6);
      username =
        attempt === 0
          ? `${base.username}_${suffix}`
          : `${base.username}_${suffix}${attempt}`;
      continue;
    }

    console.error("ensureProfile insert error:", error);
    return null;
  }

  return null;
}
