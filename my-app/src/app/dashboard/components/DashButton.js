// components/DashButton.js
'use client';
import React from 'react';
import Link from 'next/link';
import styles from './dashbutton.module.css';

const DashButton = ({ label, path, isActive }) => {
  return (
    <Link href={path} className={`${styles.button} ${isActive ? styles.active : ''}`}>
      {label}
    </Link>
  );
};

export default DashButton;
