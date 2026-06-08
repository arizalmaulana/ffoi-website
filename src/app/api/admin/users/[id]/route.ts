import { NextResponse } from "next/server";

import { createClient }
from "@supabase/supabase-js";

const adminSupabase =
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  const { id } =
    await context.params;

  await adminSupabase
    .from("profil")
    .delete()
    .eq("id", id);

  const { error } =
    await adminSupabase
      .auth.admin.deleteUser(
        id
      );

  if (error) {

    return NextResponse.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    success: true,
  });
}

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;
  const body = await request.json();
  const role = body?.role as string;

  if (!role || !["admin", "pengguna"].includes(role)) {
    return NextResponse.json(
      { error: "Role must be admin or pengguna" },
      { status: 400 }
    );
  }

  const { error } = await adminSupabase
    .from("profil")
    .update({ role })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update user role" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
