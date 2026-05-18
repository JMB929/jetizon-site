import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";

import type { NextRequest } from "next/server";

export const AUTH_COOKIE = "jetizon_onsite_auth";
const CREDENTIAL_STORE_PATH = path.join(
  process.cwd(),
  ".data",
  "onsite-auth.json",
);

export type OnsiteCredentials = {
  username: string;
  password: string;
};

type CredentialStoreFile = OnsiteCredentials;

function sanitizeCredential(value: string | undefined | null) {
  return value?.trim() || "";
}

export function encodedCredentials(username: string, password: string) {
  return Buffer.from(`${username}:${password}`, "utf8").toString("base64");
}

export async function loadActiveCredentials(): Promise<OnsiteCredentials | null> {
  try {
    const raw = await readFile(CREDENTIAL_STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<CredentialStoreFile>;

    if (typeof parsed.username === "string" && typeof parsed.password === "string") {
      const username = sanitizeCredential(parsed.username);
      const password = sanitizeCredential(parsed.password);

      if (username && password) {
        return { username, password };
      }
    }
  } catch {
    // Fall back to env-configured credentials when there is no stored override.
  }

  const username = sanitizeCredential(process.env.ONSITE_ASSISTANT_USERNAME);
  const password = sanitizeCredential(process.env.ONSITE_ASSISTANT_PASSWORD);

  if (!username || !password) {
    return null;
  }

  return { username, password };
}

export async function saveActiveCredentials(credentials: OnsiteCredentials) {
  const directory = path.dirname(CREDENTIAL_STORE_PATH);
  await mkdir(directory, { recursive: true });

  const tempPath = `${CREDENTIAL_STORE_PATH}.tmp`;
  const body = `${JSON.stringify(credentials, null, 2)}\n`;

  await writeFile(tempPath, body, "utf8");
  await rename(tempPath, CREDENTIAL_STORE_PATH);
}

export function parseBasicAuthHeader(authorization: string | null) {
  if (!authorization?.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = Buffer.from(authorization.slice("Basic ".length), "base64").toString(
      "utf8",
    );
    const separator = decoded.indexOf(":");

    if (separator === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export function matchesRequestCredentials(
  request: NextRequest,
  credentials: OnsiteCredentials,
) {
  const expected = encodedCredentials(credentials.username, credentials.password);

  const sessionCookie = request.cookies.get(AUTH_COOKIE)?.value;
  if (sessionCookie === expected) {
    return { authorized: true, matchedBy: "cookie" as const, expected };
  }

  const provided = parseBasicAuthHeader(request.headers.get("authorization"));
  if (!provided) {
    return { authorized: false, matchedBy: null, expected };
  }

  if (
    provided.username !== credentials.username ||
    provided.password !== credentials.password
  ) {
    return { authorized: false, matchedBy: null, expected };
  }

  return { authorized: true, matchedBy: "basic" as const, expected };
}

