import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import jwt from 'jsonwebtoken';

export async function DELETE(request, { params }) {
  const { saleItemID } = params;
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Only allow admins to delete sale items
    const [userRows] = await db.query('SELECT role FROM systemusers WHERE userID = ?', [decoded.id]);
    if (userRows[0]?.role?.toLowerCase() !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await db.query('DELETE FROM sale_items WHERE saleItemID = ?', [saleItemID]);
    return NextResponse.json({ message: 'Sale item deleted' }, { status: 200 });
  } catch (err) {
    console.error('Delete sale item error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
