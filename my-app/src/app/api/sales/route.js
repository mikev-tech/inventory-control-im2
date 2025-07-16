// Get total sales

import { NextResponse } from 'next/server';
import db from '../../lib/db'; 

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT SUM(totalAmount) as total
      FROM sales `);

    return NextResponse.json({ total: rows[0].total });
  } catch (error) {
    console.error('Failed to fetch low-stock count:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}