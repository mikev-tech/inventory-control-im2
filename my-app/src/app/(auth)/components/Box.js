'use client'

import React from 'react'
import styles from './box.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Box = ({ type, label, placeholder, path, handleSignin, value, onChange, loading, handleSignUp }) => {
  const router = useRouter();

  if (type === 'email' || type === 'password' || type === 'name'){
    return (
      <div style={{display: 'flex', flexDirection: 'column', marginBottom: '10px'}}>
      <label>{label}</label>
      <input
        type={type}
        style={{
          width: '350px',
          height: '50px',
          borderRadius: '5px',
          border: '1px solid',
          padding: '10px'
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
    )
  } else if (type === 'checkBox'){
    return (
        <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '350px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input
        type="checkbox"
        style={{ width: '20px', height: '20px', border: '1px solid' }}
      />
      <label>Remember me</label>
    </div>

    <p style={{ fontSize: '0.9rem', color: '#0070f3', cursor: 'pointer' }}>
      Forgot password?
    </p>
  </div>
    )
  } else if (type === 'signinbutton'){
    return(
      <div style={{width: '350px', height: '50px', display: 'flex', justifyContent: 'center', borderRadius: '5px', marginTop: '20px', flexDirection: 'column'}}>
       <button onClick={handleSignin}className={styles.button} disabled={loading}>{loading ? 'Signing in...' : label}</button>
       <p>Don't have an account? <Link style={{color: 'blue'}} href={path}>Sign up here</Link></p>
      </div>
    )
  } else if (type === 'signupbutton'){
    return(
      <div style={{width: '350px', height: '50px', display: 'flex', justifyContent: 'center', borderRadius: '5px', marginTop: '20px', flexDirection: 'column'}}>
       <button onClick={handleSignUp} className={styles.button} disabled={loading}>{loading ? 'Signing up...' : label}</button>
       <p>Already have an account? <Link style={{color: 'blue'}} href={path}>Sign in here</Link></p>
      </div>
    )
  }
}

export default Box
