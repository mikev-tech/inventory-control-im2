import { NextResponse } from 'next/server';
import db  from '../../lib/db'; 

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT jewelryItemID, name, image, stockQuantity
      FROM jewelry_items
      WHERE top_selling=TRUE
    `);

    return NextResponse.json(rows); 
  } catch (error) {
    console.error('Error fetching top-selling items:', error);
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 });
  }
}
