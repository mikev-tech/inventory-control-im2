import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from '../../lib/db';

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { jewelryItemID, quantity } = await request.json();

    if (!jewelryItemID || !quantity || quantity < 1) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    await db.query(
      'INSERT INTO cart (userID, jewelryItemID, quantity) VALUES (?, ?, ?)',
      [decoded.id, jewelryItemID, quantity]
    );

    return NextResponse.json({ message: 'Added to cart' }, { status: 200 });
  } catch (err) {
    console.error('Cart add error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await db.query(
      `SELECT 
        c.cartID,
        c.quantity,
        j.jewelryItemID,
        j.name,
        j.purchaseCost
      FROM cart c
      JOIN jewelry_items j ON c.jewelryItemID = j.jewelryItemID
      WHERE c.userID = ?`,
      [decoded.id]
    );

    const rows = result[0]; // Get the first element which is the actual data
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error('Cart fetch error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

