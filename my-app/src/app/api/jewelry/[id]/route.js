import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const result = await db.query('DELETE FROM jewelry_items WHERE jewelryItemID = ?', [id]);

    if (result[0].affectedRows === 0) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { purchaseCost, stockQuantity } = body;

    const result = await db.query(
      'UPDATE jewelry_items SET purchaseCost = ?, stockQuantity = ? WHERE jewelryItemID = ?',
      [purchaseCost, stockQuantity, id]
    );

    return NextResponse.json({ message: 'Product updated' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

