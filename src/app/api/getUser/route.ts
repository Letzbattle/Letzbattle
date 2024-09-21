// src/app/api/getUser/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust the import based on your Prisma client setup

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
  }
}
