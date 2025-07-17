import React from 'react'
import styles from './products.module.css'
import Products from '../../components/products'

const Page = () => {
  return (
    <div className={styles.container}>
        <h1 style={{color: 'black', fontSize: '32px', fontWeight: 'bold', marginLeft: '5px', marginBottom: '50px'}}>Product List</h1>   
          <Products />
    </div>
  )
}

export default Page
