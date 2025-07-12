import React from 'react'
import styles from './product.module.css'
import Addbutton from './addproduct'

const Products = () => {
  return (
    <div className={styles.container}>
        <div className={styles.main}></div>
        <Addbutton />
    </div>
  )
}

export default Products
