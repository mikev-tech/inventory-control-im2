export async function POST(req) {
  const { email, password } = await req.json();

  // Simulated login check — REMOVE once DB is connected
  if (email !== 'test@example.com' || password !== 'password123') {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  return new Response(JSON.stringify({ userId: 'fake-user-id' }), { status: 200 });
}
