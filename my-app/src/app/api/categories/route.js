import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import db from '../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  const [rows] = await db.query('SELECT * FROM categories');
  return NextResponse.json(rows);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const imageFile = formData.get('image');

    if (!name || !imageFile) {
      return NextResponse.json({ message: 'Missing name or image' }, { status: 400 });
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const imageFilename = Date.now() + '-' + imageFile.name;
    const filePath = path.join(uploadDir, imageFilename);
    await fs.writeFile(filePath, buffer);

    await db.query('INSERT INTO categories (name, image) VALUES (?, ?)', [name, `uploads/${imageFilename}`]);

    return NextResponse.json({ message: 'Category added successfully' });
  } catch (err) {
    console.error('Category Upload Error:', err);
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
  }
}
