import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '../routes';

const secret =  "supersecret";

export default async function middleware(req:any) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret });
  console.log({token})
  const isLoggedIn = !!token; // Check if user is logged in
  const isAPiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  console.log("Middleware triggered");

  // Allow API auth routes
  if (isAPiAuthRoute) {
    return NextResponse.next();
  }

  // Redirect logic for logged-in users
  if (isLoggedIn) {
    try {
      const userResponse = await fetch(
        `https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token?.idToken}`,
          },
        }
      );

      if (!userResponse.ok) {
        console.log("inside")
        console.error("Failed to fetch user details:", userResponse.statusText);
        return NextResponse.redirect(new URL("/login", nextUrl));
      }

      const userData = await userResponse.json();
      const isOnboarded = userData?.isOnboarded;

      console.log(userData.user.isOnboarded);

      // Redirect based on onboarding status
      if (!userData?.user?.isOnboarded && nextUrl.pathname !== "/onboard") {
        return NextResponse.redirect(new URL("/onboard", nextUrl));
      }
      if (userData?.user?.isOnboarded && nextUrl.pathname === "/onboard") {
        return NextResponse.redirect(new URL("/", nextUrl));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  } else {
    // If not logged in, redirect to login if not on a public route or the login page
    if (!isPublicRoute && nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
