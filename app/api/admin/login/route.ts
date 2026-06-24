import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Attempt to find the user in the admin_user table
    const user = await prisma.admin_user.findFirst({
      where: {
        admin_code: username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // In a real scenario, you should hash passwords and use something like bcrypt.compare.
    // Given the current table structure and problem description, we will do a direct or basic check.
    // If you guys are using MD5 or plaintext, you can adjust this logic respectively.
    if (user.admin_password !== password) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Ensure we don't send the password back to the client
    const { admin_password, ...safeUser } = user;

    // Return successful login indicator. Usually, you'd set an HTTP-only cookie containing a JWT here.
    return NextResponse.json(
      { message: 'Login successful', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login API error:', error);
    // Return explicit error details to diagnose the 500 error instead of failing silently.
    return NextResponse.json(
      {
        message: 'Internal server error occurred',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
