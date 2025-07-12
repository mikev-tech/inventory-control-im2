import { NextResponse } from 'next/server';
import db from '../../lib/db'; 

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT COUNT(*) as count
      FROM jewelry_items
      WHERE stockQuantity <= 5
    `);

    return NextResponse.json({ count: rows[0].count });
  } catch (error) {
    console.error('Failed to fetch low-stock count:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
