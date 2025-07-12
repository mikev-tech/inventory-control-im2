'use client'

import { useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import styles from './signin.module.css';
import React from 'react';
import Link from 'next/link';
import Box from '../components/Box';


export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const handleSignIn = async () => {
  setLoading(true);
  try {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json(); // ✅ Get response first!

    if (!res.ok) {
      setError(data.message || 'Sign in failed');
      return;
    }

    localStorage.setItem('token', data.token); // ✅ Now this works
    localStorage.setItem('userId', data.userId); 
    router.push(`/dashboard/user/${data.userId}`); // ✅ Redirect
    
  } catch (err) {
    setError('Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Welcome to</h1>
        <h1>Vinz and Vanz Jewelry</h1>
        <div className={styles.form}>
          <Box
            type='email'
            label='Email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Box>

          <Box
            type='password'
            label='Password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Box>

          <Box
            type='checkBox'
            >Remember me
          </Box>
          
          <Box
            type='signinbutton'
            label='Sign in'
            path='/signup'
            handleSignin={handleSignIn}
            loading={loading}
          >
            
          </Box>
        </div>
      </div>
    </div>
  );
}
