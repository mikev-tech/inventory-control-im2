'use client'

import React from 'react'
import styles from './signup.module.css'
import Box from '../components/Box'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) {
        const { message } = await res.json();
        setError(message || 'Sign up failed');
        return;
      }


      router.push('/signin');
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{fontSize: '22px'}}>Sign Up</h1>
              <h2>
                <a href="/" className={styles.logoText}>Vinz and Vanz Jewelry</a>
              </h2>
            </div>
              <Box
                type='name'
                label='Name'
                placeholder='Your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              >
              </Box>

              <Box
                type='email'
                label='Email'
                placeholder='Your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
              </Box>

              <Box
                type='password'
                label='Password'
                placeholder='Your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              >
              </Box>

              <Box
                type='signupbutton'
                label='Sign Up'
                path='/signin'
                handleSignUp={handleSignUp}
                loading={loading}
              >
            </Box>
      </div>
    </div>
  )
}

export default Signup
