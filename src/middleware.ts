import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { DEFAULT_LOGIN_REDIRECT, publicRoutes } from "../routes";

const secret = process.env.AUTH_SECRET || "supersecret";

async function refreshAccessToken(token: any) {
  try {
    if (!token.refreshToken) {
      throw new Error("Missing refresh token");
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Missing Google client credentials");
    }

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });

    const response = await fetch(`https://oauth2.googleapis.com/token?${params.toString()}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const refreshedTokens = await response.json();

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Token validity in milliseconds
      refreshToken: refreshedTokens.refresh_token || token.refreshToken, // Use existing refresh token if no new one
    };
  } catch (error) {
    console.error("Error refreshing token", error);
    return null;
  }
}

export default async function middleware(req: any) {
  const { nextUrl } = req;

  // Get the token
  const token = await getToken({ req, secret });

  // Log for debugging
  console.log("Token in middleware:", token);

  // Ensure that token is not null and contains the exp property
  if (!token || typeof token.exp !== "number") {
    console.log("Token is invalid or exp is not a number, redirecting to login...");
    if (!publicRoutes.includes(nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    return NextResponse.next();
  }

  const isLoggedIn = !!token;
  const isLoginPage = nextUrl.pathname === "/login";
  const isOnboardingPage = nextUrl.pathname === "/onboard";

  if (isLoggedIn) {
    const currentTime = Date.now();

    // Check if the token is expired
    if (token.exp < currentTime / 1000) {
      console.log("Access token expired, attempting to refresh...");
      const refreshedToken = await refreshAccessToken(token);

      if (!refreshedToken) {
        console.log("Token refresh failed, redirecting to login");
        const response = NextResponse.redirect(new URL("/login", nextUrl));
        response.headers.set(
          "Set-Cookie",
          "next-auth.session-token=; Max-Age=0; Path=/; HttpOnly; Secure"
        );
        return response;
      }

      // Update token with refreshed access token
      token.accessToken = refreshedToken.accessToken;
      token.accessTokenExpires = refreshedToken.accessTokenExpires;
      token.refreshToken = refreshedToken.refreshToken;
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
    matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico|public).*)",  // Explicitly allow `/public` paths (or your specific image path)
    ],
  };