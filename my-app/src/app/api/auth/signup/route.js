import db from '../../../lib/db'; 
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const [existing] = await db.query('SELECT * FROM systemusers WHERE email = ?', [email]);

    if (existing.length > 0) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO systemusers (username, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    return new Response(
      JSON.stringify({
        message: 'User created',
        userId: result.insertId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return new Response(JSON.stringify({ message: 'Signup failed' }), { status: 500 });
  }
}
