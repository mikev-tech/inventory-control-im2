'use client';

import React, { useEffect, useState } from 'react';
import styles from './sales.module.css';

const Page = () => {
  const [cart, setCart] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [hasMounted, setHasMounted] = useState(false); 

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Fetch user role
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
        setUserRole(data.role);
      } catch (err) {
        console.error('Role fetch error:', err);
        setUserRole(null); // explicitly block
      } finally {
        setAuthChecked(true);
      }
    };

    fetchUserRole();
  }, []);

  // Fetch cart (only if user)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCart(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    if (userRole === 'user') {
      fetchCart();
    }
  }, [userRole]);

  // Fetch sale items (only if user)
  useEffect(() => {
    const fetchSaleItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/sale_items', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (Array.isArray(data)) setSaleItems(data);
      } catch (err) {
        console.error('Failed to fetch sale items:', err);
      }
    };

    if (userRole === 'user') {
      fetchSaleItems();
    }
  }, [userRole]);

  // Delete cart item
  const handleDelete = async (cartID) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/cart/${cartID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete item.');
      setCart((prev) => prev.filter((item) => item.cartID !== cartID));
    } catch (err) {
      alert(err.message);
    }
  };

  // Checkout item
  const handleCheckoutItem = async (cartID) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/cart/checkout/${cartID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Checkout failed for this item.');
      alert('Item checked out!');
      setCart((prev) => prev.filter((item) => item.cartID !== cartID));
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete sale item
  const handleDeleteSaleItem = async (saleItemID) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/sale_items/${saleItemID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete sale item.');
      setSaleItems((prev) => prev.filter((item) => item.saleItemID !== saleItemID));
    } catch (err) {
      alert(err.message);
    }
  };

  if (!hasMounted || !authChecked) return null;


  return (
    <div className={styles.container}>
      {loading && userRole?.toLowerCase() === 'user' && (
        <h1 className={styles.title}>Cart</h1>
      )}

        {userRole?.toLowerCase() === 'user' ? (
          loading ? (
            <p>Loading cart...</p>
          ) : cart.length === 0 ? (
            <p style={{ marginLeft: '40px' }}>No items in cart.</p>
          ) : (
            <div className={styles.content}>
              {cart.map((item) => (
                <div key={item.cartID} className={styles.card}>
                  <h3>{item.name}</h3>
                  <p>₱{Number(item.purchaseCost).toLocaleString('en-PH')}</p>
                  <p>Quantity: {item.quantity}</p>

                  <button onClick={() => handleDelete(item.cartID)} className={styles.delete}>
                    Remove
                  </button>
                  <button onClick={() => handleCheckoutItem(item.cartID)} className={styles.checkout}>
                    Checkout Item
                  </button>
                </div>
              ))}
            </div>
          )
        ) : null}

        {saleItems.length > 0 ? (
          <>
            <h1 style={{ marginTop: '60px', marginBottom: '20px', fontSize: '26px', fontWeight: 'bold' }}>
              Recent Sales
            </h1>
            <div className={styles.content}>
              {saleItems.map((item) => (
                <div key={item.saleItemID} className={styles.card}>
                  <h3>{item.jewelryName}</h3>
                  <p>₱{Number(item.unitPrice).toLocaleString('en-PH')}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => handleDeleteSaleItem(item.saleItemID)} className={styles.delete}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h1 style={{ marginTop: '40px', fontSize: '26px', fontWeight: 'bold'}}>No recent sales</h1>
        )}

          
    </div>
  );
};

export default Page;
