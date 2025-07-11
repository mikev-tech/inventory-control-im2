// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Optional: hash the password (recommended for security)
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // use hashedPassword instead in production
      },
    });

    return NextResponse.json({ message: 'User created', user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Sign up failed' }, { status: 500 });
  }
}
