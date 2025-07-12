'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './nav.module.css';
import DashButton from './DashButton'; 
import Profile from './Profile';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  // Get userId from localStorage after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('userId');
      if (id) setUserId(id);
      setHasMounted(true); // now we can safely render
    }
  }, []);

  // Fetch user name via token
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('/api/me', {
          headers: { Authorization: `Bearer ${token}` },
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
      <Profile name={userName} />

      <DashButton
        label="Dashboard"
        path={`/dashboard/user/${userId}`}
        isActive={pathname.startsWith(`/dashboard/user/${userId}`)}
      />

      <DashButton
        label="Products"
        path={`/dashboard/products/${userId}`}
        isActive={pathname.startsWith(`/dashboard/products/${userId}`)}
      />
      <DashButton
        label="Sales"
        path={`/dashboard/Sales/${userId}`}
        isActive={pathname.startsWith(`/dashboard/Sales/${userId}`)}
      />
      <DashButton
        label="Categories"
        path={`/dashboard/Category/${userId}`}
        isActive={pathname.startsWith(`/dashboard/Category/${userId}`)}
      />
      <DashButton
        label="Supplier"
        path="/dashboard/supplier"
        isActive={pathname === '/dashboard/supplier'}
      />
      <DashButton
        label="System User"
        path="/dashboard/system-user"
        isActive={pathname === '/dashboard/system-user'}
      />
    </div>
  );
};

export default Nav;
