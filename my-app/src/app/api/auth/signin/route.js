import db from '../../../lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const [rows] = await db.query('SELECT * FROM systemusers WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 401,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
      });
    }

    const token = jwt.sign(
      {
        id: user.userid,
        email: user.email,
        name: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return new Response(
      JSON.stringify({
        userId: user.userid,
        token,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Login error:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}
