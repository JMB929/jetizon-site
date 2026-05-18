import { NextRequest, NextResponse } from "next/server";

import {
  loadActiveCredentials,
  matchesRequestCredentials,
} from "@/lib/onsite-auth";

export async function GET(request: NextRequest) {
  const credentials = await loadActiveCredentials();

  if (!credentials) {
    return NextResponse.json(
      { error: "Onsite assistant credentials are not configured on the server." },
      { status: 503 },
    );
  }

  const authCheck = matchesRequestCredentials(request, credentials);

  if (!authCheck.authorized) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    authenticated: true,
    matchedBy: authCheck.matchedBy,
  });
}

