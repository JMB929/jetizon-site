import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "jetizon_onsite_auth";

function encodedCredentials(username: string, password: string) {
  return btoa(`${username}:${password}`);
}

export async function POST(request: NextRequest) {
  const validUsername = process.env.ONSITE_ASSISTANT_USERNAME;
  const validPassword = process.env.ONSITE_ASSISTANT_PASSWORD;

  if (!validUsername || !validPassword) {
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
    payload.username !== validUsername ||
    payload.password !== validPassword
  ) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: AUTH_COOKIE,
    value: encodedCredentials(validUsername, validPassword),
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
    name: AUTH_COOKIE,
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
  return response;
}
