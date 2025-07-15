'use client';

import React, { useEffect, useState } from 'react';
import styles from './product.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [userRole, setUserRole] = useState('');
  const [authChecked, setAuthChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
const [editProduct, setEditProduct] = useState(null);


  useEffect(() => {
    fetchJewelry();
    fetchUserRole();
  }, []);

  const fetchJewelry = async () => {
    try {
      const res = await fetch('/api/jewelry');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch jewelry items:', err);
    }
  };

  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Unauthorized');
      const data = await res.json();
      setUserRole(data.role?.toLowerCase());
    } catch (err) {
      console.error('Role fetch error:', err);
      setUserRole(null);
    } finally {
      setAuthChecked(true);
    }
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Number(value),
    }));
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProduct = async (id) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this product?');
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/jewelry/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || 'Failed to delete product');
    }

    alert('Product deleted successfully.');
    fetchJewelry();
  } catch (err) {
    console.error('Delete error:', err);
    alert(err.message || 'Something went wrong.');
  }
};


  return (
    <div className={styles.container}>

      {editModalOpen && editProduct && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Edit Product</h3>
            <label>
              Price:
              <input
                type="number"
                value={editProduct.purchaseCost}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, purchaseCost: e.target.value })
                }
              />
            </label>
            <label>
              Stock Quantity:
              <input
                type="number"
                value={editProduct.stockQuantity}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, stockQuantity: e.target.value })
                }
              />
            </label>
            <div className={styles.modalActions}>
              <button onClick={() => setEditModalOpen(false)}>Cancel</button>
              <button onClick={async () => {
                try {
                  const token = localStorage.getItem('token');
                  const res = await fetch(`/api/jewelry/${editProduct.jewelryItemID}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      purchaseCost: editProduct.purchaseCost,
                      stockQuantity: editProduct.stockQuantity,
                    }),
                  });

                  if (!res.ok) throw new Error('Failed to update product');

                  alert('Product updated!');
                  setEditModalOpen(false);
                  fetchJewelry();
                } catch (err) {
                  console.error('Update error:', err);
                  alert(err.message || 'Something went wrong.');
                }
              }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchBar}
      />

      {authChecked && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                {userRole === 'user' && <th>Quantity</th>}
                {userRole === 'user' && <th>Action</th>}
                {userRole === 'admin' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item) => (
                <tr key={item.jewelryItemID}>
                  <td>
                    <img src={`/${item.image}`} alt={item.name} className={styles.image} />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    {Number(item.purchaseCost).toLocaleString('en-PH', {
                      style: 'currency',
                      currency: 'PHP',
                    })}
                  </td>
                  <td>{item.stockQuantity}</td>
                  {userRole === 'user' && (
                    <>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max={item.stockQuantity}
                          value={quantities[item.jewelryItemID] || 1}
                          onChange={(e) =>
                            handleQuantityChange(item.jewelryItemID, e.target.value)
                          }
                          style={{ width: '45px', color: 'black' }}
                        />
                      </td>
                      <td>
                        <button className={styles.actionBtn}>Add to Cart</button>
                      </td>
                    </>
                  )}
                  {userRole === 'admin' && (
                  <td>
                    <button
                    className={styles.actionBtn}
                    onClick={() => {
                      setEditProduct(item);
                      setEditModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleDeleteProduct(item.jewelryItemID)}
                      style={{ marginLeft: '8px', backgroundColor: 'red' }}
                    >
                      Delete
                    </button>
                  </td>
                )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
