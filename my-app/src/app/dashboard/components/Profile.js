import React from 'react'
import styles from './profile.module.css'

const Profile = ({name}) => {
  return (
    <>
    <div className={styles.container}>
        <div className={styles.Profile}>
        </div>
        <h1 style={{color: 'black', fontSize: '22px'}}>{name}</h1>
    </div>
    </>
  )
}

export default Profile
