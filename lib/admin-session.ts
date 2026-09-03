/**
 * Minimal stateless admin session token.
 *
 * There is no user database for the admin area (it's a single shared
 * password, set via ADMIN_PASSWORD) so sessions are a signed, expiring
 * token rather than a server-side session store. Uses Web Crypto (not
 * node:crypto) so it also works from Edge middleware.
 *
 * This is intentionally lightweight — swap for real auth (e.g. Supabase
 * Auth) if the admin area grows beyond a single shared password.
 */
export const ADMIN_COOKIE = "craftmint_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "craftmint-dev-secret";
  return new TextEncoder().encode(secret);
}

function toBase64Url(bytes: ArrayBuffer): string {
  const binary = Array.from(new Uint8Array(bytes), (b) => String.fromCharCode(b)).join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", getSecret(), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return toBase64Url(signature);
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  const signature = await sign(payload);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = await sign(payload);
  if (expected !== signature) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;
  return true;
}
