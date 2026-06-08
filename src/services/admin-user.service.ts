import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/profile";

export async function getAllUsers(): Promise<Profile[]> {

  const { data, error } =
    await supabase
      .from("profil")
      .select("*")
      .order(
        "dibuat_pada",
        {
          ascending: false,
        }
      );

  if (error) {
    console.error(error);
    return [];
  }

  return data as Profile[];
}

export async function searchUsers(
  keyword: string
): Promise<Profile[]> {

  const { data, error } =
    await supabase
      .from("profil")
      .select("*")
      .or(
        `username.ilike.%${keyword}%,nama_lengkap.ilike.%${keyword}%,email.ilike.%${keyword}%`
      );

  if (error) {
    console.error(
      "searchUsers:",
      error
    );
    return [];
  }

  console.log(
    "keyword:",
    keyword
    );

    console.log(
    "hasil:",
    data
    );

  return data as Profile[];
}

export async function getUserById(
  id: string
): Promise<Profile | null> {

  const { data, error } =
    await supabase
      .from("profil")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as Profile;
}

export async function updateUserRole(
  id: string,
  role: "admin" | "pengguna"
) {
  const response = await fetch(
    `/api/admin/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.error ||
      "Gagal memperbarui role pengguna";
    throw new Error(message);
  }
}

export async function deleteUser(
  id: string
) {
  const response = await fetch(
    `/api/admin/users/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.error ||
      "Gagal menghapus user";
    throw new Error(message);
  }
}