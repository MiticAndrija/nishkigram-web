import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const adminCookieName = "niskigram_admin";

const sessionValue = "admin";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "niskigram-admin";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "niskigram-local-secret";
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function createAdminSessionToken() {
  return `${sessionValue}.${sign(sessionValue)}`;
}

export function verifyAdminSession(token?: string) {
  if (!token) {
    return false;
  }

  const [value, signature] = token.split(".");

  if (value !== sessionValue || !signature) {
    return false;
  }

  return safeCompare(signature, sign(value));
}

export function verifyAdminPassword(password: string) {
  return password === getAdminPassword();
}

export async function isAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(adminCookieName)?.value);
}

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 8,
};
