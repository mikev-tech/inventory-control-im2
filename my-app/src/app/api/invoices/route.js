import { NextResponse } from 'next/server';
import db from '../../lib/db'; 

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        s.salesID,
        s.salesDate,
        s.totalAmount,
        COUNT(si.saleItemID) AS itemCount
      FROM sales s
      LEFT JOIN sale_items si ON s.salesID = si.salesID
      GROUP BY s.salesID
      ORDER BY s.salesDate DESC
      LIMIT 10
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Failed to load invoices' }, { status: 500 });
  }
}
