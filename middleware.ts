import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { getToken } from 'next-auth/jwt';
const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
  const { nextUrl } = req;
  const token = await getToken({ req, secret: "supersecret" });
  const isLoggedIn = !!req.auth;
  const isAPiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log("middleware");
  if (isAPiAuthRoute) {
    return;
  }
  if (isAuthRoute) {
    console.log("Outside isLoggedIn");
    if (isLoggedIn) {
        console.log("Inside isLoggedIn");
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }
  // if (!isLoggedIn && !isPublicRoute) {
  //   console.log("not isLoggedIn");
  //   return Response.redirect(new URL("/login", nextUrl));
  // }
  console.log("Root isLoggedIn");

  // Onboard logic - Check if user needs to be onboarded
  if (isLoggedIn) {
    const sessionToken = token?.idToken; // Extract user token from authentication

    // Fetch user details from the User API using the session token
    const userResponse = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
      "https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/user",
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    console.log(token)
    const userData = await userResponse.json();
    const isOnboarded = userData?.isOnboarded;
    console.log({userData,isOnboarded});

    // If user is not onboarded and not on /onboard route, redirect to /onboard
    if (!isOnboarded) {
      return Response.redirect(new URL("/onboard", nextUrl));
    }

    // If user is onboarded and trying to access /onboard, redirect to home
    if (isOnboarded) {
      return Response.redirect(new URL("/", nextUrl));
    }
  }
  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
