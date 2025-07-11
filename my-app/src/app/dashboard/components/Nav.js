import React from 'react'
import styles from './nav.module.css'

const Nav = ({children}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default Nav
