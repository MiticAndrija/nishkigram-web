import { NextResponse } from "next/server";
import { adminCookieName } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.delete(adminCookieName);
  return response;
}
