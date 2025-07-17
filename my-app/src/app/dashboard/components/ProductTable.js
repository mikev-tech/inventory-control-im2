// Code from Claude Ai
// components/ProductTable.js
import { useState } from 'react';
import styles from './ProductTable.module.css';

export default function ProductTable({ products, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = (product) => {
    setDeleteConfirm(product);
  };

  const confirmDelete = () => {
    onDelete(deleteConfirm.id);
    setDeleteConfirm(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products by name, SKU, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')} className={styles.sortable}>
                Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('sku')} className={styles.sortable}>
                SKU {sortField === 'sku' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('category')} className={styles.sortable}>
                Category {sortField === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('price')} className={styles.sortable}>
                Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('quantity')} className={styles.sortable}>
                Quantity {sortField === 'quantity' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('created_at')} className={styles.sortable}>
                Created {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className={styles.noData}>
                  {searchTerm ? 'No products match your search.' : 'No products found.'}
                </td>
              </tr>
            ) : (
              sortedProducts.map((product) => (
                <tr key={product.id}>
                  <td className={styles.productName}>
                    <div>
                      <strong>{product.name}</strong>
                      {product.description && (
                        <p className={styles.description}>{product.description}</p>
                      )}
                    </div>
                  </td>
                  <td className={styles.sku}>{product.sku}</td>
                  <td>
                    {product.category && (
                      <span className={styles.category}>{product.category}</span>
                    )}
                  </td>
                  <td className={styles.price}>{formatPrice(product.price)}</td>
                  <td className={styles.quantity}>
                    <span className={product.quantity < 10 ? styles.lowStock : ''}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className={styles.date}>{formatDate(product.created_at)}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        onClick={() => onEdit(product)}
                        className={styles.editButton}
                        title="Edit product"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className={styles.deleteButton}
                        title="Delete product"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{deleteConfirm.name}"?</p>
            <p className={styles.warning}>This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setDeleteConfirm(null)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className={styles.confirmDeleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}