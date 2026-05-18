import { NextRequest, NextResponse } from "next/server";

function isApiRequest(request: NextRequest) {
  return request.nextUrl.pathname.startsWith("/api/");
}

async function validateRequest(request: NextRequest) {
  const validationUrl = new URL("/api/onsite-auth/validate", request.url);

  return fetch(validationUrl, {
    method: "GET",
    headers: new Headers(request.headers),
    cache: "no-store",
  });
}

function unauthorizedResponse(request: NextRequest) {
  if (isApiRequest(request)) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  const loginUrl = new URL("/onsite-login", request.url);
  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );
  return NextResponse.redirect(loginUrl);
}

export async function proxy(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const validationResponse = await validateRequest(request);

  if (validationResponse.ok) {
    const response = NextResponse.next();

    if (authorization?.startsWith("Basic ")) {
      response.cookies.set({
        name: "jetizon_onsite_auth",
        value: authorization.slice("Basic ".length),
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
      });
    }

    return response;
  }

  if (validationResponse.status === 503) {
    return new NextResponse(
      "Onsite assistant credentials are not configured on the server.",
      { status: 503 },
    );
  }

  return unauthorizedResponse(request);
}

export const config = {
  matcher: ["/onsite-assistant/:path*", "/api/onsite-photo-analysis/:path*"],
};
