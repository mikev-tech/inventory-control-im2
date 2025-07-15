// /app/api/jewelry/route.js
import { NextResponse } from 'next/server';
import db from '../../lib/db'; // Adjust path to your db.js

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM jewelry_items');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch jewelry items:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}