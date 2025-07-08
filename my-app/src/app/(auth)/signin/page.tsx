import styles from './signin.module.css';
import React from 'react';

export default function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <h1 className={styles.formHeader}>Sign In to Vinz and Vanz Jewelry</h1>
          <label>Email</label>
          <input type="email" required />

          <label>Password</label>
          <input type="password" required />

          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}
