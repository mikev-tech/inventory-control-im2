import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function GET() {
  try {
    const [rows] = await db.query(
      'SELECT userid, username, role, profile_picture FROM systemusers'
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { role } = await req.json();

  try {
    await db.query('UPDATE systemusers SET role = ? WHERE userid = ?', [role, id]);
    return NextResponse.json({ message: 'Role updated successfully' });
  } catch (err) {
    console.error('PUT error:', err);
    return NextResponse.json({ message: 'Failed to update role' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await db.query('DELETE FROM systemusers WHERE userid = ?', [id]);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('DELETE error:', err);
    return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
  }
}