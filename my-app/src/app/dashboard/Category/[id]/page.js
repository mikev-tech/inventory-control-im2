import React from 'react'
import styles from './category.module.css'
import ViewCategory from '../../components/viewCategory'
import AddCategory from '../../components/addCategory'

const Page = () => {
  return (
    <div className={styles.container}>
        <h1 style={{color: 'black', fontSize: '26px', fontWeight: 'bold', marginTop: '20px'}}>Product Categories </h1>
      <div className={styles.content}>
        <ViewCategory />
        <AddCategory />
      </div>
    </div>
  )
}

export default Page
