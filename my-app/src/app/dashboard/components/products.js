'use client';

import React, { useEffect, useState } from 'react';
import styles from './product.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [userRole, setUserRole] = useState('');
  const [authChecked, setAuthChecked] = useState(false);


  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        const res = await fetch('/api/jewelry');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch jewelry items:', err);
      }
    };

    fetchJewelry();
  }, []);

  useEffect(() => {
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
      setUserRole(data.role?.toLowerCase()); // normalize case
    } catch (err) {
      console.error('Role fetch error:', err);
      setUserRole(null); // block unknown role
    } finally {
      setAuthChecked(true);
    }
    };

    fetchUserRole();
  }, []);


  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Number(value),
    }));
  };

  const handleAddToCart = async (item) => {
    const quantity = quantities[item.jewelryItemID] || 1;

    if (quantity < 1 || quantity > item.stockQuantity) {
      alert('Invalid quantity.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // or use cookie-based auth if you're using that

      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // remove if not using JWT
        },
        body: JSON.stringify({
          jewelryItemID: item.jewelryItemID,
          quantity,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add to cart.');
      }

      alert(`${item.name} added to cart!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert(err.message || 'Something went wrong.');
    }
  };

  const handleRestock = async (item) => {
  const quantity = quantities[item.jewelryItemID] || 1;

  if (quantity < 1) {
    alert('Invalid restock quantity.');
    return;
  }

  try {
    const token = localStorage.getItem('token');

    const res = await fetch('/api/jewelry/restock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        jewelryItemID: item.jewelryItemID,
        quantity,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to restock.');
    }

    alert(`${item.name} restocked!`);
    // Optional: refetch items to reflect updated stock
    const updated = await res.json();
    setProducts((prev) =>
      prev.map((prod) =>
        prod.jewelryItemID === item.jewelryItemID
          ? { ...prod, stockQuantity: updated.newStock }
          : prod
      )
        );
      } catch (err) {
        console.error('Error restocking:', err);
        alert(err.message || 'Something went wrong.');
      }
    };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    marginRight: '25px',
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {products.map((item) => (
          <div key={item.jewelryItemID} className={styles.card}>
            <img src={`/${item.image}`} alt={item.name} className={styles.image} />
            <div className={styles.details}>
              <h3>{item.name}</h3>
              <p>
                {Number(item.purchaseCost).toLocaleString('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                  minimumFractionDigits: 2,
                })}
              </p>
              <p>Stock: {item.stockQuantity}</p>
            {userRole === 'user' && (
            <>
              <input
                type="number"
                min="1"
                max={item.stockQuantity}
                value={quantities[item.jewelryItemID] || 1}
                onChange={(e) => handleQuantityChange(item.jewelryItemID, e.target.value)}
                style={{ width: '35px', marginTop: '5px', color: 'black' }}
              />
              <button
                onClick={() => handleAddToCart(item)}
                style={buttonStyle}
              >
                Add to Cart
              </button>
            </>
          )}

          {userRole === 'admin' && (
            <>
              <input
                type="number"
                min="1"
                value={quantities[item.jewelryItemID] || 1}
                onChange={(e) => handleQuantityChange(item.jewelryItemID, e.target.value)}
                style={{ width: '35px', marginTop: '5px', color: 'black' }}
              />
              <button
                onClick={() => handleRestock(item)}
                style={buttonStyle}
              >
                Restock
              </button>
            </>
          )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
