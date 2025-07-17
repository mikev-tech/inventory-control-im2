import React from 'react'
import styles from './supplier.module.css'
import ViewSupplier from '../../components/viewSupplier'
import StockArrival from '../../components/stockArrival'

const Page = () => {
  return (
    <div className={styles.container}>
        <h1 style={{color: 'black', fontSize: '32px', fontWeight: 'bold', marginTop: '20px'}}>Product Suppliers</h1>
        <div className={styles.content}>
            <ViewSupplier />
        </div>
        <div className={styles.stockContainer}>
          <StockArrival />
        </div>
    </div>
  )
}

export default Page
