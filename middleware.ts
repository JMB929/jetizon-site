import { NextRequest, NextResponse } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Jetizon Onsite Assistant"',
    },
  });
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

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const encodedCredentials = authorization.slice("Basic ".length);
  const decodedCredentials = atob(encodedCredentials);
  const separatorIndex = decodedCredentials.indexOf(":");

  if (separatorIndex === -1) {
    return unauthorizedResponse();
  }

  const providedUsername = decodedCredentials.slice(0, separatorIndex);
  const providedPassword = decodedCredentials.slice(separatorIndex + 1);

  if (providedUsername !== username || providedPassword !== password) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/onsite-assistant/:path*"],
};
