import { supabase } from "@/lib/supabase";

export async function uploadSightingImage(
  file: File
): Promise<string | null> {

  const extension =
    file.name.split(".").pop() ?? "jpg";

  const fileName =
    `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${extension}`;

  const filePath =
    `sightings/${fileName}`;

  const bucketCandidates = ["sightings"];

  let lastError: unknown = null;

  for (const bucket of bucketCandidates) {
    try {
      const { data, error } =
        await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

      if (error) {
        lastError = error;

        console.error(
          "uploadSightingImage failed",
          error,
          { filePath, bucket, data }
        );
        return null;
      }

      const { data: publicUrlData } =
        supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

      const publicUrl = publicUrlData?.publicUrl;

      if (!publicUrl) {
        console.error(
          "uploadSightingImage publicUrl failed",
          { filePath, bucket, publicUrlData }
        );
        return null;
      }

      console.debug(
        "uploadSightingImage success",
        { filePath, bucket, publicUrl }
      );

      return publicUrl;
    } catch (exception) {
      lastError = exception;
      console.error(
        "uploadSightingImage exception",
        exception,
        { filePath, bucket }
      );
    }
  }

  console.error(
    "uploadSightingImage could not find a valid bucket",
    { filePath, bucketCandidates, lastError }
  );

  return null;
}
