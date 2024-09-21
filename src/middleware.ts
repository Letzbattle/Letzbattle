import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '../routes';

const secret = process.env.NEXTAUTH_SECRET;
const apiUrl = process.env.API_URL;

export default async function middleware(req: any) {
  const { nextUrl } = req;
  console.log(`Middleware triggered for path: ${nextUrl.pathname}`);

  try {
    const token = await getToken({ req, secret:"supersecret" });
    console.log(`Token retrieved: ${!!token}`);

    const isLoggedIn = !!token;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      console.log('API auth route, proceeding');
      return NextResponse.next();
    }

    if (isLoggedIn) {
      console.log('User is logged in, fetching user data');
      const userResponse = await fetch(`${apiUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${token?.idToken}`,
        },
      });

      if (!userResponse.ok) {
        console.error(`Failed to fetch user details: ${userResponse.statusText}`);
        return NextResponse.redirect(new URL('/login', nextUrl));
      }

      const userData = await userResponse.json();
      console.log(`User onboarding status: ${userData.user.isOnboarded}`);

      if (!userData.user.isOnboarded && nextUrl.pathname !== '/onboard') {
        console.log('Redirecting to onboarding');
        return NextResponse.redirect(new URL('/onboard', nextUrl));
      }
      if (userData.user.isOnboarded && nextUrl.pathname === '/onboard') {
        console.log('Redirecting to home');
        return NextResponse.redirect(new URL('/', nextUrl));
      }
    } else if (!isPublicRoute && nextUrl.pathname !== '/login') {
      console.log('User not logged in, redirecting to login');
      return NextResponse.redirect(new URL('/login', nextUrl));
    }

    console.log('Proceeding with request');
    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/error', nextUrl));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};