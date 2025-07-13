import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from '../../../lib/db'; // adjust path if needed

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [users] = await db.query('SELECT role FROM systemusers WHERE userid = ?', [decoded.id]);
    if (!users.length || users[0].role.toLowerCase() !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { jewelryItemID, quantity } = body;

    if (!jewelryItemID || !quantity || quantity <= 0) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
    }

    const [result] = await db.query(
      'UPDATE jewelry_items SET stockQuantity = stockQuantity + ? WHERE jewelryItemID = ?',
      [quantity, jewelryItemID]
    );

    // Get new stock to confirm
    const [updated] = await db.query(
      'SELECT stockQuantity FROM jewelry_items WHERE jewelryItemID = ?',
      [jewelryItemID]
    );

    return NextResponse.json({
      message: 'Restocked successfully!',
      newStock: updated[0]?.stockQuantity ?? null
    });
  } catch (err) {
    console.error('Restock error:', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
