import React from 'react'
import styles from './sales.module.css'
import AddSales from './addsales'

const Sales = () => {
  return (
   <div className={styles.container}>
        <div className={styles.main}></div>
        <AddSales />
    </div>
  )
}

export default Sales
