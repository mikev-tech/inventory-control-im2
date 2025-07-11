import React from 'react';
import styles from './dashbutton.module.css';

const DashButton = ({ label, path }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>
        <h1>{label}</h1>
      </button>
    </div>
  );
};

export default DashButton;
