import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, verifyAdminSession } from "@/lib/adminAuth";
import { deleteAdminMediaItem, getAdminMediaItems } from "@/lib/adminMedia";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(adminCookieName)?.value);
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ uploads: await getAdminMediaItems() });
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const input = (await request.json()) as { url?: string; force?: boolean };

  if (!input.url) {
    return NextResponse.json({ error: "URL slike je obavezan." }, { status: 400 });
  }

  try {
    await deleteAdminMediaItem(input.url, Boolean(input.force));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Brisanje slike nije uspelo.",
      },
      { status: 400 },
    );
  }
}
