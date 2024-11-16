import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { DEFAULT_LOGIN_REDIRECT, publicRoutes } from "../routes";
import { signOut } from "next-auth/react";

const secret = "supersecret";

export default async function middleware(req: any) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret });
  console.log({ token });

  const isLoggedIn = !!token; // Check if user is logged in
  const isLoginPage = nextUrl.pathname === "/login";
  const isOnboardingPage = nextUrl.pathname === "/onboard";

  console.log("Middleware triggered");

  if (isLoggedIn) {
    console.log(isLoggedIn,token,'avdc')
    // Check if the token has expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (token.exp && token.exp < currentTime) {
      console.log("Token has expired, logging out user");
      await signOut()
      return NextResponse.redirect(new URL("/login", nextUrl));
    }

    // If logged in and accessing the login page, redirect away
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }

    // Handle onboarding redirection
    if (token?.isOnboarded) {
      // If the user is onboarded, redirect them away from the onboarding page
      if (isOnboardingPage) {
        return NextResponse.redirect(new URL("/", nextUrl));
      }
    } else {
      // If the user is not onboarded, redirect them to the onboarding page
      if (!isOnboardingPage) {
        return NextResponse.redirect(new URL("/onboard", nextUrl));
      }
    }
  } else {
    // If not logged in, only allow access to public routes (e.g., login page)
    if (!isLoginPage && !publicRoutes.includes(nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
