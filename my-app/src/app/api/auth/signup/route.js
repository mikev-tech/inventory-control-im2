// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma'; // Uncomment when you're ready to use DB

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Optional: hash password (recommended when using real DB)
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Simulate user creation
    const user = {
      id: 'mock-id',
      name,
      email,
    };

    return NextResponse.json({ message: 'User created', user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Sign up failed' }, { status: 500 });
  }
}
