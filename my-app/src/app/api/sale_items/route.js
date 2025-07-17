// /app/api/sale-items/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import db from '../../lib/db';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user role from DB
    const [users] = await db.query('SELECT role FROM systemusers WHERE userID = ?', [decoded.id]);

    if (users.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const role = users[0].role;

    let rows;
    if (role === 'Admin') {
      // Admin can view all sale items
      [rows] = await db.query(`
        SELECT 
          si.saleItemID,
          si.quantity,
          si.unitPrice,
          j.name AS jewelryName,
          s.userID
        FROM sale_items si
        JOIN jewelry_items j ON si.jewelryItemID = j.jewelryItemID
        JOIN sales s ON si.salesID = s.salesID
      `);
    } else {
      // Normal user: only their own sale items
      [rows] = await db.query(`
        SELECT 
          si.saleItemID,
          si.quantity,
          si.unitPrice,
          j.name AS jewelryName
        FROM sale_items si
        JOIN jewelry_items j ON si.jewelryItemID = j.jewelryItemID
        JOIN sales s ON si.salesID = s.salesID
        WHERE s.userID = ?
      `, [decoded.id]);
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error('Failed to fetch sale_items:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
