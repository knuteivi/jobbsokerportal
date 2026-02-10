import { auth } from "@/lib/auth";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export default auth(async (request) => {
  if (request.nextUrl.pathname.startsWith("/admin") && !request.auth) {
    return NextResponse.redirect(
      new URL("/auth/login", request.nextUrl.origin),
    );
  }

  if (request.nextUrl.pathname === "/auth/login" && request.auth) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl.origin));
  }

  // if (process.env.NODE_ENV === "production") {
  //   const nonce = randomBytes(32).toString("base64");
  //   const csp = `default-src 'self'; script-src 'self' 'nonce-${nonce}'; connect-src 'self'; media-src 'self'; frame-src 'none'; style-src 'self' 'nonce-${nonce}'; img-src 'self' blob: data:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;`;

  //   const headers = new Headers(request.headers);
  //   headers.set("x-nonce", nonce);
  //   headers.set("content-security-policy", csp);

  //   const response = NextResponse.next({ request: { headers } });
  //   response.headers.set("content-security-policy", csp);

  //   return response;
  // }

  NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
