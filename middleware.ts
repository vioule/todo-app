import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT_SECRET } from "@/lib/constants";
import * as jose from "jose";
import { JWTPayload } from "./app/api/auth/verify-email/route";

const PUBLIC_PATHS = ["/login", "/signup"];
const PRIVATE_PATHS = ["/dashboard", "/"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (PUBLIC_PATHS.includes(pathname)) {
    const jwt = request.cookies.get("jwt");
    if (jwt && jwt.value) {
      try {
        await jose.jwtVerify<JWTPayload>(jwt.value, JWT_SECRET);
        const redirectUrl = new URL("/dashboard", request.url);
        return NextResponse.redirect(redirectUrl);
      } catch (error) {
        console.log(error);
      }
    }
  } else if (PRIVATE_PATHS.includes(pathname)) {
    const jwt = request.cookies.get("jwt");
    if (jwt && jwt.value) {
      try {
        await jose.jwtVerify<JWTPayload>(jwt.value, JWT_SECRET);
      } catch (error) {
        const redirectUrl = new URL("/login", request.url);
        return NextResponse.redirect(redirectUrl);
      }
    } else {
      const redirectUrl = new URL("/login", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: ["/dashboard", "/", "/login", "/signup"],
};
