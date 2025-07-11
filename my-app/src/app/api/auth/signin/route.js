import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), {
      status: 401,
    });
  }

  // ✅ Compare input password with hashed one in DB
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({ userId: user.id, email: user.email }),
    { status: 200 }
  );
}
