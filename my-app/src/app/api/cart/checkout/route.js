import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get cart items
    const [cartItems] = await db.query(
      `SELECT c.jewelryItemID, c.quantity, j.purchaseCost
       FROM cart c
       JOIN jewelry_items j ON c.jewelryItemID = j.jewelryItemID
       WHERE c.userID = ?`,
      [decoded.id]
    );

    if (cartItems.length === 0) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 });
    }

    // Insert into sales table
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.purchaseCost * item.quantity,
      0
    );

    const [saleResult] = await db.query(
      'INSERT INTO sales (totalAmount) VALUES (?)',
      [totalAmount]
    );

    const salesID = saleResult.insertId;

    // Insert each item into sale_items
    for (const item of cartItems) {
      await db.query(
        `INSERT INTO sale_items (salesID, jewelryItemID, quantity, unitPrice)
         VALUES (?, ?, ?, ?)`,
        [salesID, item.jewelryItemID, item.quantity, item.purchaseCost]
      );

      // Decrease stock
      await db.query(
        `UPDATE jewelry_items SET stockQuantity = stockQuantity - ? WHERE jewelryItemID = ?`,
        [item.quantity, item.jewelryItemID]
      );
    }

    // Clear cart
    await db.query('DELETE FROM cart WHERE userID = ?', [decoded.id]);

    return NextResponse.json({ message: 'Checkout complete' }, { status: 200 });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
