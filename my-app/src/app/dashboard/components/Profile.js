'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from './profile.module.css';
import { useRouter } from 'next/navigation';

const Profile = ({ name }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState('/images/default-avatar.png');

  // Fetch profile picture when component mounts
  useEffect(() => {
    const fetchProfilePicture = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.profilePicture) {
          setPreview(data.profilePicture);
        }
      } catch (err) {
        console.error('Failed to fetch profile picture:', err);
      }
    };

    fetchProfilePicture();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/');
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.filePath) {
        setPreview(data.filePath); // update with real path from server
      }

    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profilePic} onClick={handleImageClick}>
        <img src={preview} alt="Profile" className={styles.image} />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <h1 className={styles.name}>{name}</h1>
      <button className={styles.changeProfile} onClick={handleImageClick}>
        Change Profile Picture
      </button>
      <button onClick={handleLogout} className={styles.logout}>
        Log out
      </button>
    </div>
  );
};

export default Profile;
