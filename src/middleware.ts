import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { DEFAULT_LOGIN_REDIRECT, publicRoutes } from "../routes";

const secret = process.env.AUTH_SECRET || "supersecret";

export default async function middleware(req: any) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret });

  console.log("Token in middleware:", token);

  const isLoggedIn = !!token;
  const isLoginPage = nextUrl.pathname === "/login";
  const isOnboardingPage = nextUrl.pathname === "/onboard";

  if (isLoggedIn) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (token.exp && token.exp < currentTime) {
      console.log("Token has expired, redirecting to login");
      const response = NextResponse.redirect(new URL("/login", nextUrl));
      response.headers.set(
        "Set-Cookie",
        "next-auth.session-token=; Max-Age=0; Path=/; HttpOnly; Secure"
      );
      return response;
    }

    if (isLoginPage) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }

    if (!token.isOnboarded && !isOnboardingPage) {
      return NextResponse.redirect(new URL("/onboard", nextUrl));
    }

    if (token.isOnboarded && isOnboardingPage) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  } else {
    if (!isLoginPage && !publicRoutes.includes(nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
