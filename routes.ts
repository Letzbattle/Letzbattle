import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
// import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from './routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isAPiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    // For API auth routes, continue without modification
    if (isAPiAuthRoute) {
        return NextResponse.next();
    }

    // If accessing an auth route (e.g., /auth/login) and logged in, redirect to default page
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next(); // Allow access to auth routes if not logged in
    }

    // If accessing a protected route (not public or auth route), and not logged in, redirect to login
    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", nextUrl));  // Redirect to login if not authenticated
    }

    return NextResponse.next();  // Continue for public routes or authenticated users
});

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};

export const publicRoutes = [
    "/",  // Add more public routes as necessary
];

export const authRoutes = [
    "/auth/login",
    "/auth/register"
];

export const apiAuthPrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/settings";
