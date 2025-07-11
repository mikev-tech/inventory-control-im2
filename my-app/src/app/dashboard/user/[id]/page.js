import React from 'react'
import styles from './user.module.css'
import Navigation from '../../components/Nav'
import Profile from '../../components/Profile'
import Dashbutton from '../../components/DashButton'

const page = ({ params }) => {
  return (
    <div className={styles.container}>
      <Navigation>
        <Profile />
        <Dashbutton
          label='Dashboard'
        />

         <Dashbutton
          label='Products'
        />

         <Dashbutton
          label='Sales'
        />

         <Dashbutton
          label='Categories'
        />

         <Dashbutton
          label='Supplier'
        />

         <Dashbutton
          label='System User'
        />
        
      </Navigation>

      <div style={{ padding: '1rem' }}>
        <h2>Welcome, User ID: {params.userId}</h2>
      </div>
    </div>
  )
}

export default page
