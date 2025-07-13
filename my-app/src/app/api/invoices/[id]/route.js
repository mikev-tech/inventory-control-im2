// /app/api/invoices/[id]/route.js
import { NextResponse } from 'next/server';
import db from '../../../lib/db'; // adjust path if needed
import jwt from 'jsonwebtoken';

export async function DELETE(request, { params }) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET); // Optional: you may want to check admin role here

    const { id } = await params;

    // First delete sale_items linked to this salesID (because of FK)
    await db.query('DELETE FROM sale_items WHERE salesID = ?', [id]);
    await db.query('DELETE FROM sales WHERE salesID = ?', [id]);

    return NextResponse.json({ message: 'Invoice deleted' });
  } catch (err) {
    console.error('Invoice delete error:', err);
    return NextResponse.json({ message: 'Error deleting invoice' }, { status: 500 });
  }
}
