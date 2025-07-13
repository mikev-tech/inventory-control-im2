import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function DELETE(_, { params }) {
  const { id } = await params;

  try {
    await db.query('DELETE FROM suppliers WHERE supplierID = ?', [id]);
    return NextResponse.json({ message: 'Supplier deleted' });
  } catch (err) {
    console.error('Delete supplier error:', err);
    return NextResponse.json({ error: 'Failed to delete supplier' }, { status: 500 });
  }
}
