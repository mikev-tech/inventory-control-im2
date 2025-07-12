'use client';
import React, { useState } from 'react'; 
import styles from './sales.module.css';
import Sales from '../../components/sales';
import SearchBar from '../../components/Searchbar';

const Page = () => {
  const [query, setQuery] = useState(''); 

  return (
    <div className={styles.container}>
      <h1 style={{ marginLeft: '40px', fontSize: '26px', fontWeight: 'bold', marginTop: '30px' }}>
        Sales
      </h1>

      <SearchBar 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search sales..."
      />

      <div className={styles.content}>
        <Sales search={query} />
      </div>
    </div>
  );
};

export default Page;
