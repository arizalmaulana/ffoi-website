import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await context.params;
  const body = await request.json();
  const action = body?.action as string;

  if (!action) {
    return NextResponse.json(
      { error: "Action is required" },
      { status: 400 }
    );
  }

  if (action === "approve") {
    const payload = body?.payload;

    if (!payload) {
      return NextResponse.json(
        { error: "Payload is required for approve action" },
        { status: 400 }
      );
    }

    const { error: speciesError } = await adminSupabase
      .from("spesies")
      .insert(payload);

    if (speciesError) {
      return NextResponse.json(
        { error: speciesError.message || "Failed to insert species" },
        { status: 500 }
      );
    }

    const { error: sightingError } = await adminSupabase
      .from("sighting")
      .update({
        status: "disetujui",
        ditinjau_pada: new Date().toISOString(),
      })
      .eq("id", id);

    if (sightingError) {
      return NextResponse.json(
        { error: sightingError.message || "Failed to update sighting" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  }

  if (action === "reject") {
    const { error } = await adminSupabase
      .from("sighting")
      .update({ status: "ditolak" })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to reject sighting" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Unsupported action" },
    { status: 400 }
  );
}
