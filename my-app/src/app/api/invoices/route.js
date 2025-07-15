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
    const userID = decoded.id;
    const role = decoded.role?.toLowerCase();

    let query, params;

    if (role === 'admin') {
      // Admin can view all invoices
      query = `
        SELECT 
          s.salesID,
          s.userID,
          s.salesDate,
          s.totalAmount,
          COUNT(si.saleItemID) AS itemCount
        FROM sales s
        LEFT JOIN sale_items si ON s.salesID = si.salesID
        GROUP BY s.salesID
        ORDER BY s.salesDate DESC
      `;
      params = [];
    } else {
      // Regular user sees only their invoices
      query = `
        SELECT 
          s.salesID,
          s.userID,
          s.salesDate,
          s.totalAmount,
          COUNT(si.saleItemID) AS itemCount
        FROM sales s
        LEFT JOIN sale_items si ON s.salesID = si.salesID
        WHERE s.userID = ?
        GROUP BY s.salesID
        ORDER BY s.salesDate DESC
      `;
      params = [userID];
    }

    const [rows] = await db.query(query, params);
    return NextResponse.json(rows);
  } catch (err) {
    console.error('Error fetching invoices:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
