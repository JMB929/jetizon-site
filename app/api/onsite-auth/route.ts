import { NextRequest, NextResponse } from "next/server";

import { encodedCredentials, loadActiveCredentials } from "@/lib/onsite-auth";

export async function POST(request: NextRequest) {
  const credentials = await loadActiveCredentials();

  if (!credentials) {
    return NextResponse.json(
      { error: "Onsite assistant credentials are not configured on the server." },
      { status: 503 },
    );
  }

  let payload: { username?: string; password?: string } = {};

  try {
    payload = (await request.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    payload.username !== credentials.username ||
    payload.password !== credentials.password
  ) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "jetizon_onsite_auth",
    value: encodedCredentials(credentials.username, credentials.password),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: "jetizon_onsite_auth",
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
  return response;
}
