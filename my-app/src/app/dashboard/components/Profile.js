'use client';

import React from 'react';
import styles from './profile.module.css';
import { useRouter } from 'next/navigation';

const Profile = ({ name }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/'); // redirect to root or login page
  };

  return (
    <div className={styles.container}>
      <div className={styles.Profile}></div>
      <h1 style={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>{name}</h1>
      <h1 style={{ marginTop: '20px' }}>Change Profile</h1>
      <button onClick={handleLogout} className={styles.logout}>Log out</button>
    </div>
  );
};

export default Profile;
