'use client';

import React, { useEffect, useState } from 'react';
import styles from './user.module.css';
import Navigation from '../../components/Nav';
import Profile from '../../components/Profile';
import Dashbutton from '../../components/DashButton';
import axios from 'axios';
import Card from '../../components/Card'
import Products from '../../components/TopProducts'
import Invoice from '../../components/Invoice'

const Page = ({ params }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(res.data.name);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.container}>
      <Navigation>
        <Profile name={userName} />

        <Dashbutton label='Dashboard' />
        <Dashbutton label='Products' />
        <Dashbutton label='Sales' />
        <Dashbutton label='Categories' />
        <Dashbutton label='Supplier' />
        <Dashbutton label='System User' />
      </Navigation>

      
      <div className={styles.main}>
        <div>
          <h1 style={{fontSize: '28px'}}>
            Inventory Analytics
          </h1>
        </div>
        <div className={styles.content}>
          <Card 
            type='stockitem'
            description='Low Stock Items'
          />
          <Card 
            type='sales'
            description='Total Sales this Month'
          />
        </div>

        <div className={styles.main2}>
            <Products/>
            <Invoice />
        </div>
      </div>


 
    </div>
  );
};

export default Page;
