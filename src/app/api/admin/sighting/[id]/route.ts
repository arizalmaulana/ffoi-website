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
  const status = body?.status as string;
  const catatanAdmin = body?.catatanAdmin as string | undefined;

  if (!status || !["disetujui", "ditolak"].includes(status)) {
    return NextResponse.json(
      { error: "Status must be disetujui or ditolak" },
      { status: 400 }
    );
  }

  const { error } = await adminSupabase
    .from("sighting")
    .update({
      status,
      catatan_admin: catatanAdmin ?? null,
      ditinjau_pada: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to review sighting" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
