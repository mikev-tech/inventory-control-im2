import { NextResponse } from 'next/server';
import db from '../../../lib/db'; 

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const [result] = await db.query(
      'DELETE FROM stock_arrivals WHERE stockArrivalID = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Stock arrival not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Stock arrival deleted successfully' });
  } catch (error) {
    console.error('Error deleting stock arrival:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
