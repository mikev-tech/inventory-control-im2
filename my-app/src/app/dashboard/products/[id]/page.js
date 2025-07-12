import React from 'react'
import styles from './products.module.css'
import Products from '../../components/products'

const Page = () => {
  return (
    <div className={styles.container}>
        <Products />
    </div>
  )
}

export default Page
