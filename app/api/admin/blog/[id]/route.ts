import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, verifyAdminSession } from "@/lib/adminAuth";
import { deletePost, updatePost, type BlogPostInput } from "@/lib/blog";

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

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
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

  const { id } = await context.params;
  const post = await updatePost(id, input);

  if (!post) {
    return NextResponse.json({ error: "Objava nije pronađena." }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const deleted = await deletePost(id);

  if (!deleted) {
    return NextResponse.json({ error: "Objava nije pronađena." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
