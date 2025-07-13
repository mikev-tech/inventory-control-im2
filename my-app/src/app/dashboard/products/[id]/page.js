import React from 'react'
import styles from './products.module.css'
import Products from '../../components/products'

const Page = () => {
  return (
    <div className={styles.container}>
        <h1 style={{color: 'black', fontSize: '26px', fontWeight: 'bold'}}>Produt List</h1>
        <div className={styles.content}>
          <Products />
        </div>
    </div>
  )
}

export default Page
