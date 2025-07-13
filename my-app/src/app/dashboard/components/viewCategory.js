'use client';

import React, { useEffect, useState } from 'react';
import styles from './viewCategory.module.css';

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
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
        setUserRole(data.role); // e.g., 'Admin'
      } else {
        setUserRole('guest');
      }
    };

    fetchCategories();
    fetchUserRole();
  }, []);

  const handleAdd = async () => {
    if (!name || !image) return alert('All fields required');
    const token = localStorage.getItem('token');

    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, image }),
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
            type="text"
            placeholder="Image path"
            className={styles.input}
            value={image}
            onChange={(e) => setImage(e.target.value)}
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
            {userRole === 'Admin' && <th className={styles.th}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.categoryID} className={styles.tr}>
              <td className={styles.td}>{cat.categoryID}</td>
              <td className={styles.td}>{cat.name}</td>
              <td className={styles.td}>
                <img
                  src={`/${cat.image}`}
                  alt={cat.name}
                  className={styles.image}
                />
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCategory;
