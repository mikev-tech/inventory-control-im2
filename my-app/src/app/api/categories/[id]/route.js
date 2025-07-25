import db from '../../../lib/db';

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { categoryID } = body;

    if (!categoryID) {
      return Response.json({ message: 'Missing category ID' }, { status: 400 });
    }

    const [result] = await db.query('DELETE FROM categories WHERE categoryID = ?', [categoryID]);

    if (result.affectedRows === 0) {
      return Response.json({ message: 'Category not found' }, { status: 404 });
    }

    return Response.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
