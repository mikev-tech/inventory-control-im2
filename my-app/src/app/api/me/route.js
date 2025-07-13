import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from '../../lib/db'; 

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure 'role' is selected
    const [rows] = await db.query(
      'SELECT username, profile_picture, role FROM systemusers WHERE userid = ?', 
      [decoded.id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      name: rows[0].username, 
      role: rows[0].role, // now this will work
      profilePicture: rows[0].profile_picture || '/images/default-avatar.png' 
    });

  } catch (err) {
    console.error('JWT error:', err);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
