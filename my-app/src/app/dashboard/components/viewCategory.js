'use client';

import React, { useEffect, useState } from 'react';
import styles from './viewCategory.module.css';

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [userRole, setUserRole] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    };

    const fetchProducts = async () => {
      const res = await fetch('/api/jewelry');
      const data = await res.json();
      setProducts(data);
    };

    const fetchUserRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setUserRole('guest');

      const res = await fetch('/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUserRole(data.role);
      } else {
        setUserRole('guest');
      }
    };

    fetchCategories();
    fetchProducts();
    fetchUserRole();
  }, []);

  const handleAdd = async () => {
  if (!name || !image) return alert('All fields required');
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('name', name);
  formData.append('image', image);

  const res = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await res.json();
  alert(result.message);
  setName('');
  setImage('');
  window.location.reload();
};


  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    const res = await fetch('/api/categories', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ categoryID: id }),
    });

    const result = await res.json();
    alert(result.message);
    setCategories(categories.filter((cat) => cat.categoryID !== id));
  };

  const toggleDropdown = (categoryID) => {
    setExpandedCategory(expandedCategory === categoryID ? null : categoryID);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Product Categories</h1>

      {userRole === 'Admin' && (
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Category name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className={styles.input}
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button onClick={handleAdd} className={styles.button}>
            Add Category
          </button>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Image</th>
            <th className={styles.th}>Show Products</th>
            {userRole === 'Admin' && <th className={styles.th}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <React.Fragment key={cat.categoryID}>
              <tr className={styles.tr}>
                <td className={styles.td}>{cat.categoryID}</td>
                <td className={styles.td}>{cat.name}</td>
                  <td className={styles.td}>
                    <img
                      src={
                        cat.image.startsWith('uploads/')
                          ? `/${cat.image}`
                          : `/uploads/${cat.image}`
                      }
                      alt={cat.name}
                      className={styles.image}
                    />
                  </td>
                <td className={styles.td}>
                  <button
                    onClick={() => toggleDropdown(cat.categoryID)}
                    className={styles.button}
                  >
                    {expandedCategory === cat.categoryID ? 'Hide' : 'Show'}
                  </button>
                </td>
                {userRole === 'Admin' && (
                  <td className={styles.td}>
                    <button
                      onClick={() => handleDelete(cat.categoryID)}
                      className={styles.actionBtn}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>

              {/* Dropdown Section */}
              {expandedCategory === cat.categoryID && (
                <tr className={styles.tr}>
                  <td colSpan={userRole === 'Admin' ? 5 : 4} className={styles.td}>
                    <div>
                      <strong>Products in {cat.name}:</strong>
                      <table className={styles.subTable}>
                    <thead>
                      <tr>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Name</th>
                        <th className={styles.th}>Image</th>
                        <th className={styles.th}>Price</th>
                        <th className={styles.th}>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                    {products
                      .filter((item) => item.categoryID === cat.categoryID)
                      .map((item) => (
                        <tr key={item.jewelryItemID} className={styles.tr}>
                          <td className={styles.td}>{item.jewelryItemID}</td>
                          <td className={styles.td}>{item.name}</td>
                          <td className={styles.td}>         
                          <img
                            src={
                              item.image.startsWith('uploads/')
                                ? `/${item.image}`
                                : `/uploads/${item.image}`
                              }
                              alt={item.name}
                              className={styles.image}
                          />
                          </td>
                          <td className={styles.td}>₱{item.purchaseCost}</td>
                          <td className={styles.td}>{item.stockQuantity}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCategory;
