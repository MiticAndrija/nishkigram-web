import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, verifyAdminSession } from "@/lib/adminAuth";
import { createPost, getAllPosts, type BlogPostInput } from "@/lib/blog";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(adminCookieName)?.value);
}

function validateInput(input: BlogPostInput) {
  return Boolean(
    input.title?.trim() &&
      input.excerpt?.trim() &&
      input.author?.trim() &&
      input.contentHtml?.trim(),
  );
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ posts: await getAllPosts() });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const input = (await request.json()) as BlogPostInput;

  if (!validateInput(input)) {
    return NextResponse.json(
      { error: "Naslov, excerpt, autor i sadržaj su obavezni." },
      { status: 400 },
    );
  }

  const post = await createPost(input);
  return NextResponse.json({ post }, { status: 201 });
}
