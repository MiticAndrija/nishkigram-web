import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { adminCookieName, verifyAdminSession } from "@/lib/adminAuth";
import { blogImageUploadConfig, saveBlogImageUpload } from "@/lib/blogUploads";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(adminCookieName)?.value);
}

const allowedContentTypes = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  if (request.headers.get("content-type")?.includes("application/json")) {
    const body = (await request.json()) as HandleUploadBody;

    if (body.type === "blob.generate-client-token" && !isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const response = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async (pathname) => {
          if (!pathname.startsWith("uploads/blog/")) {
            throw new Error("Invalid upload path.");
          }

          return {
            allowedContentTypes,
            maximumSizeInBytes: blogImageUploadConfig.maxUploadSizeBytes,
            addRandomSuffix: true,
          };
        },
        onUploadCompleted: async () => undefined,
      });

      return NextResponse.json(response);
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Upload slike nije uspeo.",
        },
        { status: 400 },
      );
    }
  }

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
