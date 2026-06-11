import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, verifyAdminSession } from "@/lib/adminAuth";
import { blogImageUploadConfig, saveBlogImageUpload } from "@/lib/blogUploads";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(adminCookieName)?.value);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Slika je obavezna." }, { status: 400 });
  }

  try {
    const upload = await saveBlogImageUpload(file);
    return NextResponse.json(
      { upload, config: blogImageUploadConfig },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Upload slike nije uspeo.",
      },
      { status: 400 },
    );
  }
}
