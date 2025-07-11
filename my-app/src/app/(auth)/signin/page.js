import styles from './signin.module.css';
import React from 'react';
import Link from 'next/link';
import Box from '../components/Box';

export default function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Welcome to</h1>
        <h1>Vinz and Vanz Jewelry</h1>
        <div className={styles.form}>
          <Box
            type='input'
            label='Email'
            placeholder='Enter your email'
          ></Box>

          <Box
            type='input'
            label='Password'
            placeholder='Enter your password'
          ></Box>

          <Box
            type='checkBox'
            >Remember me
          </Box>
          
          <Box
            type='signinbutton'
            label='Sign in'
            path='/signup'
          >
            
          </Box>
        </div>
      </div>
    </div>
  );
}
