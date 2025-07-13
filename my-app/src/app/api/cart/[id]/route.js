// /app/api/cart/[id]/route.js
import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import jwt from 'jsonwebtoken';

export async function DELETE(request, { params }) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const cartID = params.id;

    const [result] = await db.query(
      'DELETE FROM cart WHERE cartID = ? AND userID = ?',
      [cartID, decoded.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Not found or not authorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item removed' }, { status: 200 });
  } catch (err) {
    console.error('Delete cart error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
