import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function DELETE(req, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: 'Audit ID is required' }, { status: 400 });
  }

  try {
    await db.query('DELETE FROM inventory_audits WHERE auditID = ?', [id]);
    return NextResponse.json({ message: 'Audit deleted successfully' });
  } catch (error) {
    console.error('Delete audit error:', error);
    return NextResponse.json({ message: 'Failed to delete audit' }, { status: 500 });
  }
}
