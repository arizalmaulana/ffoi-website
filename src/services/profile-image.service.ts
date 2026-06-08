import { supabase } from "@/lib/supabase";

export async function uploadProfileImage(
  file: File
): Promise<string | null> {

  const extension =
    file.name.split(".").pop() ??
    "jpg";

  const fileName =
    `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${extension}`;

  const filePath =
    `avatars/${fileName}`;

  const { error } =
    await supabase.storage
      .from("avatars")
      .upload(
        filePath,
        file,
        {
          upsert: false,
        }
      );

  if (error) {

    console.error(error);

    return null;
  }

  const {
    data: publicUrlData,
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(
      filePath
    );

  return (
    publicUrlData.publicUrl
  );
}