import { NextResponse } from "next/server";
import {
  adminCookieName,
  adminCookieOptions,
  createAdminSessionToken,
  verifyAdminPassword,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") || "");

  if (!verifyAdminPassword(password)) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const response = NextResponse.redirect(new URL("/admin/blog", request.url));
  response.cookies.set(
    adminCookieName,
    createAdminSessionToken(),
    adminCookieOptions,
  );
  return response;
}
