'use client';

import React, { useEffect, useState } from 'react';
import styles from './card.module.css';

const Card = ({ type, description }) => {
  const [lowStockCount, setLowStockCount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No token in localStorage');
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const res = await fetch('/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.warn('Failed to fetch /api/me');
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const data = await res.json();

        // ✅ Case-insensitive role check
        setIsAdmin((data.role || '').toLowerCase() === 'admin');
      } catch (err) {
        console.error('Error fetching user role:', err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, []);

  useEffect(() => {
    if (type === 'stockitem' && isAdmin) {
      const fetchLowStock = async () => {
        try {
          const res = await fetch('/api/low-stock');
          const data = await res.json();
          setLowStockCount(data.count);
        } catch (err) {
          console.error('Error fetching low stock count:', err);
          setLowStockCount(0);
        }
      };

      fetchLowStock();
    }
  }, [type, isAdmin]);

  if (loading || !isAdmin) return null; // Only render if done loading and is admin

  if (type === 'stockitem') {
    return (
      <div className={styles.stockitems}>
        <h1 style={{ fontSize: '32px' }}>
          {lowStockCount !== null ? lowStockCount : '...'}
        </h1>
        <div
          style={{
            marginTop: '60px',
            backgroundColor: '#b85547ff',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <p>{description}</p>
        </div>
      </div>
    );
  }

  if (type === 'sales') {
    return (
      <div className={styles.sales}>
        <h1 style={{ fontSize: '32px' }}>P19564.00</h1>
        <div
          style={{
            marginTop: '60px',
            backgroundColor: '#556d52ff',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <p>{description}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Card;
