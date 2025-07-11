import React from 'react'
import styles from './signup.module.css'
import Box from '../components/Box'

const Signup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h1 style={{fontSize: '22px'}}>Sign Up</h1>
              <h2>to Vinz and Vanz</h2>
            </div>
            <Box
              type='input'
              label='Name'
              placeholder='your name'
            >
            </Box>

            <Box
              type='input'
              label='Email'
              placeholder='your email'
            >
            </Box>

            <Box
              type='password'
              label='Password'
              placeholder='your password'
            >
            </Box>

            <Box
              type='signupbutton'
              label='Sign Up'
              path='/signin'
            >

            </Box>
      </div>
    </div>
  )
}

export default Signup
