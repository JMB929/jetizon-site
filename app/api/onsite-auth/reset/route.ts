import { NextRequest, NextResponse } from "next/server";

import { saveActiveCredentials } from "@/lib/onsite-auth";

export async function POST(request: NextRequest) {
  const resetCode = process.env.ONSITE_ASSISTANT_RESET_CODE;

  if (!resetCode) {
    return NextResponse.json(
      { error: "Reset is not configured on the server." },
      { status: 503 },
    );
  }

  let payload: {
    resetCode?: string;
    username?: string;
    password?: string;
  } = {};

  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const username = payload.username?.trim() || "";
  const password = payload.password?.trim() || "";

  if (!payload.resetCode || payload.resetCode !== resetCode) {
    return NextResponse.json({ error: "Invalid reset code." }, { status: 401 });
  }

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 },
    );
  }

  await saveActiveCredentials({ username, password });

  const response = NextResponse.json({
    ok: true,
    username,
  });

  response.cookies.set({
    name: "jetizon_onsite_auth",
    value: Buffer.from(`${username}:${password}`, "utf8").toString("base64"),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
}
