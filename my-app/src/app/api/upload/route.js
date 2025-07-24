import db from '../../lib/db'; 
import jwt from 'jsonwebtoken';
import path from 'path';
import { writeFile } from 'fs/promises'; 

export const POST = async (req) => {
  const data = await req.formData();
  const file = data.get('image');

  if (!file) {
    return new Response(JSON.stringify({ message: 'No file uploaded' }), {
      status: 400,
    });
  }

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return new Response(JSON.stringify({ message: 'No token provided' }), {
      status: 401,
    });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Invalid token' }), {
      status: 401,
    });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);

    await writeFile(filePath, buffer);

    const imagePath = `/uploads/${fileName}`;
    await db.query(
      'UPDATE systemusers SET profile_picture = ? WHERE userid = ?',
      [imagePath, userId]
    );

    return new Response(JSON.stringify({ filePath: imagePath }), {
      status: 200,
    });
  } catch (err) {
    console.error('Upload failed:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
};
