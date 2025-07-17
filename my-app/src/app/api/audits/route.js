import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { inventoryID, audit_date, counted_quantity, jewelryItemID, notes } = body;

    const result = await db.query(
      'INSERT INTO inventory_audits (inventoryID, audit_date, counted_quantity, jewelryItemID, notes) VALUES (?, ?, ?, ?, ?)',
      [inventoryID, audit_date, counted_quantity, jewelryItemID, notes]
    );

    return NextResponse.json({ message: 'Audit saved successfully' });
  } catch (error) {
    console.error('Error saving audit:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
