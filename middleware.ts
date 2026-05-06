import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "jetizon_onsite_auth";

function encodedCredentials(username: string, password: string) {
  return btoa(`${username}:${password}`);
}

function isAuthorized(
  request: NextRequest,
  username: string,
  password: string,
) {
  const expected = encodedCredentials(username, password);

  const sessionCookie = request.cookies.get(AUTH_COOKIE)?.value;
  if (sessionCookie === expected) {
    return { authorized: true, matchedBy: "cookie" as const, expected };
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) {
    return { authorized: false, matchedBy: null, expected };
  }

  const provided = authorization.slice("Basic ".length);
  if (provided !== expected) {
    return { authorized: false, matchedBy: null, expected };
  }

  return { authorized: true, matchedBy: "basic" as const, expected };
}

function isApiRequest(request: NextRequest) {
  return request.nextUrl.pathname.startsWith("/api/");
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

export function middleware(request: NextRequest) {
  const username = process.env.ONSITE_ASSISTANT_USERNAME;
  const password = process.env.ONSITE_ASSISTANT_PASSWORD;

  if (!username || !password) {
    return new NextResponse(
      "Onsite assistant credentials are not configured on the server.",
      { status: 503 },
    );
  }

  const authCheck = isAuthorized(request, username, password);

  if (!authCheck.authorized) {
    return unauthorizedResponse(request);
  }

  const response = NextResponse.next();

  if (authCheck.matchedBy === "basic") {
    response.cookies.set({
      name: AUTH_COOKIE,
      value: authCheck.expected,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
  }

  return response;
}

export const config = {
  matcher: ["/onsite-assistant/:path*", "/api/onsite-photo-analysis/:path*"],
};
