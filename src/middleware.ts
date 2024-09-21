// src/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: Request) {
  const token = await getToken({
      req,
      secret: 'supersecret'
  });

  if (token) {
    // Call the API route to fetch the user
    const res = await fetch(`${req.url}/api/getUser?email=${token.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const user = await res.json();

    if (user && !user.isOnboarded) {
      return NextResponse.redirect(new URL('/onboard', req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to the homepage
export const config = {
  matcher: '/', // Only apply middleware to the root route
};
