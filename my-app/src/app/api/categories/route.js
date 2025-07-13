// /app/api/categories/route.js
import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function GET() {
  const [rows] = await db.query('SELECT * FROM categories');
  return NextResponse.json(rows);
}

export async function POST(request) {
  const { name, image } = await request.json();
  if (!name || !image) {
    return NextResponse.json({ message: 'Missing name or image' }, { status: 400 });
  }

  await db.query('INSERT INTO categories (name, image) VALUES (?, ?)', [name, image]);
  return NextResponse.json({ message: 'Category added successfully' });
}

export async function DELETE(request) {
  const { categoryID } = await request.json();
  if (!categoryID) {
    return NextResponse.json({ message: 'Missing category ID' }, { status: 400 });
  }

  await db.query('DELETE FROM categories WHERE categoryID = ?', [categoryID]);
  return NextResponse.json({ message: 'Category deleted successfully' });
}
