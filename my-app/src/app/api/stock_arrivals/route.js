import { NextResponse } from 'next/server';
import db from '../../lib/db'; // adjust if your db connection is in a different path

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT sa.*, j.name AS itemName, s.name AS supplierName
      FROM stock_arrivals sa
      LEFT JOIN jewelry_items j ON sa.jewelryItemID = j.jewelryItemID
      LEFT JOIN suppliers s ON sa.supplierID = s.supplierID
      ORDER BY sa.arrivalDate DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching stock arrivals' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { jewelryItemID, arrivalDate, quantity, supplierID, unitCost } = await req.json();

    if (!jewelryItemID || !arrivalDate || !quantity || !supplierID || !unitCost) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    await db.query(
      `INSERT INTO stock_arrivals (jewelryItemID, arrivalDate, quantity, supplierID, unitCost)
       VALUES (?, ?, ?, ?, ?)`,
      [jewelryItemID, arrivalDate, quantity, supplierID, unitCost]
    );

    return NextResponse.json({ message: 'Stock arrival added successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error adding stock arrival' }, { status: 500 });
  }
}
