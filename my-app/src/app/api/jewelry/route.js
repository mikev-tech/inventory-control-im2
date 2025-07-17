import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryID = searchParams.get('categoryID');

    let query = 'SELECT * FROM jewelry_items';
    let params = [];

    if (categoryID) {
      query += ' WHERE categoryID = ?';
      params.push(categoryID);
    }

    const [rows] = await db.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch jewelry items:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
