// /app/api/suppliers/route.js

import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM suppliers');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req) {
  const { name, phone, email, address } = await req.json();

  try {
    const [result] = await db.query(
      'INSERT INTO suppliers (name, phone, email, address) VALUES (?, ?, ?, ?)',
      [name, phone, email, address]
    );

    return NextResponse.json({
      supplierID: result.insertId,
      name,
      phone,
      email,
      address,
    }, { status: 201 });
  } catch (err) {
    console.error('Add supplier error:', err);
    return NextResponse.json({ error: 'Failed to add supplier' }, { status: 500 });
  }
}
