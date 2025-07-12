'use client';

import React from 'react';
import styles from './Skeleton.module.css';

const Skeleton = ({ width = '100%', height = '20px', borderRadius = '4px' }) => {
  return (
    <div
      className={styles.skeleton}
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default Skeleton;
