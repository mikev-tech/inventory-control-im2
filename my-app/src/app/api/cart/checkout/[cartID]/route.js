import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from '../../../../lib/db'; // adjust this path if needed

export async function POST(request, { params }) {
  const { cartID } = await params;
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 1. Get the cart item details
    const [cartRows] = await db.query(
      `SELECT c.*, j.purchaseCost 
       FROM cart c 
       JOIN jewelry_items j ON c.jewelryItemID = j.jewelryItemID 
       WHERE c.cartID = ? AND c.userID = ?`,
      [cartID, decoded.id]
    );

    if (cartRows.length === 0) {
      return NextResponse.json({ message: 'Cart item not found.' }, { status: 404 });
    }

    const cartItem = cartRows[0];

    // ✅ 2. Insert a record in `sales` WITH userID
    const [saleResult] = await db.query(
      `INSERT INTO sales (totalAmount, userID) VALUES (?, ?)`,
      [cartItem.purchaseCost * cartItem.quantity, decoded.id]
    );
    const salesID = saleResult.insertId;

    // 3. Insert into sale_items
    await db.query(
      `INSERT INTO sale_items (jewelryItemID, salesID, quantity, unitPrice)
       VALUES (?, ?, ?, ?)`,
      [cartItem.jewelryItemID, salesID, cartItem.quantity, cartItem.purchaseCost]
    );

    // 4. Update stock in jewelry_items
    await db.query(
      `UPDATE jewelry_items 
       SET stockQuantity = stockQuantity - ? 
       WHERE jewelryItemID = ?`,
      [cartItem.quantity, cartItem.jewelryItemID]
    );

    // 5. Delete from cart
    await db.query(`DELETE FROM cart WHERE cartID = ?`, [cartID]);

    return NextResponse.json({ message: 'Item checked out successfully.' }, { status: 200 });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
