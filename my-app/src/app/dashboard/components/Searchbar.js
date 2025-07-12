'use client';

import React from 'react';
import styles from './searchbar.module.css';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')}>
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
