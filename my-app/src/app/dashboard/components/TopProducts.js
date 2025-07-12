'use client';

import React, { useEffect, useState } from 'react';
import styles from './top.module.css';

const TopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await fetch('/api/top-selling');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch top-selling products:', err);
      }
    };

    fetchTopSelling();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Top Selling Products</h1>
      <div className={styles.scrollContainer}>
        <div className={styles.container}>
          {products.map((product) => (
            <div key={product.jewelryItemID} className={styles.card}>
              <img src={`/${product.image}`} alt={product.name} className={styles.image} />
              <div className={styles.details}>
                <h3>{product.name}</h3>
                <p>Stock: {product.stockQuantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
