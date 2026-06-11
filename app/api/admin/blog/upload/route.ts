import { NextRequest, NextResponse } from "next/server";
import { issueSignedToken } from "@vercel/blob";
import {
  handleUploadPresigned,
  type HandleUploadPresignedBody,
} from "@vercel/blob/client";
import { adminCookieName, verifyAdminSession } from "@/lib/adminAuth";
import { blogImageUploadConfig, saveBlogImageUpload } from "@/lib/blogUploads";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(adminCookieName)?.value);
}

const allowedContentTypes = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  if (request.headers.get("content-type")?.includes("application/json")) {
    const body = (await request.json()) as HandleUploadPresignedBody;

    if (body.type === "blob.generate-presigned-url" && !isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const response = await handleUploadPresigned({
        body,
        request,
        getSignedToken: async (pathname) => {
          if (!pathname.startsWith("uploads/blog/")) {
            throw new Error("Invalid upload path.");
          }

          return {
            token: await issueSignedToken({
              pathname,
              operations: ["put"],
              allowedContentTypes,
              maximumSizeInBytes: blogImageUploadConfig.maxUploadSizeBytes,
              validUntil: Date.now() + 60 * 60 * 1000,
            }),
            urlOptions: {
              access: "public",
              allowedContentTypes,
              maximumSizeInBytes: blogImageUploadConfig.maxUploadSizeBytes,
              addRandomSuffix: true,
            },
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
    return NextResponse.json({ upload, config: blogImageUploadConfig }, { status: 201 });
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
