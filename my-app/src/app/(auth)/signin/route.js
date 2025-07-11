import prisma from '@/lib/prisma';

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  return new Response(JSON.stringify({ userId: user.id }), { status: 200 });
}
