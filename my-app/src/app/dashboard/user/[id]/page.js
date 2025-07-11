import React from 'react'
import styles from './user.module.css'
import Navigation from '../../components/Nav'
import Profile from '../../components/Profile'
import Dashbutton from '../../components/DashButton'

const page = () => {
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
    </div>
  )
}

export default page
