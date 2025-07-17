import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.auditID, a.inventoryID, a.audit_date, a.counted_quantity, 
        a.jewelryItemID, a.notes, j.name AS jewelryName
      FROM inventory_audits a
      LEFT JOIN jewelry_items j ON a.jewelryItemID = j.jewelryItemID
      ORDER BY a.audit_date DESC
    `);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
