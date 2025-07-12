'use client';
import React from 'react';
import Nav from './components/Nav';
import styles from './layout.module.css';

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.container}>
      <Nav />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
