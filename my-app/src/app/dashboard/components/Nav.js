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
  const [userRole, setUserRole] = useState('');
  const pathname = usePathname();

  // Get userId from localStorage after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('userId');
      if (id) setUserId(id);
    }
  }, []);

  // Fetch user name and role via token
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(res.data.name);
        setUserRole(res.data.role); // ✅ save the role
        console.log('📦 /api/me response:', res.data); // ✅ now inside
        setUserName(res.data.name);
        setUserRole(res.data.role);
        console.log('🧑‍💻 Role set in state:', res.data.role);
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
        path={`/dashboard/Suppliers/${userId}`}
        isActive={pathname.startsWith(`/dashboard/Suppliers/${userId}`)}
      />

      {userRole?.toLowerCase() === 'admin' && (
        <DashButton
        label="System User"
        path={`/dashboard/SystemUsers/${userId}`}
        isActive={pathname.startsWith(`/dashboard/SystemUsers/${userId}`)}
        />
      )}
    </div>
  );
};

export default Nav;
