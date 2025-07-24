import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import db from '../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

  export async function POST(req) {
    try {
      const formData = await req.formData();
      const name = formData.get('name');
      const description = formData.get('description');
      const categoryID = formData.get('categoryID');
      const purchaseDate = formData.get('purchaseDate');
      const purchaseCost = formData.get('purchaseCost');
      const stockQuantity = formData.get('stockQuantity');
      const condition = formData.get('condition');
      const supplierID = formData.get('supplierID');
      const top_selling = formData.get('top_selling') || 0;
      const imageFile = formData.get('image');
      let imageFilename = '';

      if (imageFile && typeof imageFile.name === 'string') {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        imageFilename = Date.now() + '-' + imageFile.name;
        const filePath = path.join(uploadDir, imageFilename);
        await fs.writeFile(filePath, buffer);
      }

      const [result] = await db.query(
        `INSERT INTO jewelry_items 
        (name, description, categoryID, purchaseDate, purchaseCost, stockQuantity, \`condition\`, supplierID, image, top_selling)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          description,
          categoryID,
          purchaseDate,
          purchaseCost,
          stockQuantity,
          condition,
          supplierID,
          imageFilename,
          top_selling,
        ]
      );

      return NextResponse.json({ message: 'Product added', id: result.insertId });
    } catch (error) {
      console.error('Upload error:', error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }

  export async function GET() {
    try {
      const [rows] = await db.query('SELECT * FROM jewelry_items');
      return NextResponse.json(rows);
    } catch (error) {
      console.error('Fetch jewelry error:', error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }


