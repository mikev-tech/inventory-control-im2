'use client';

import React, { useEffect, useState } from 'react';
import styles from './user.module.css';
import axios from 'axios';

const Page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/systemusers');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = (id, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.userid === id ? { ...user, role: newRole } : user
      )
    );
  };

  const updateRole = async (id, role) => {
    try {
      await axios.put(`/api/systemusers/${id}`, { role });
      alert('Role updated!');
    } catch (err) {
      console.error('Error updating role:', err);
      alert('Failed to update role');
    }
  };

  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/systemusers/${id}`);
      setUsers((prev) => prev.filter((user) => user.userid !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  return (
    <div className={styles.container}>
      <h1 style={{ color: 'black', fontSize: '26px', fontWeight: 'bold', marginLeft: '50px' }}>
        System Users
      </h1>

      <div className={styles.content}>
        {users.length > 0 ? (
          <div className={styles.userList}>
            {users.map((user) => (
              <div key={user.userid} className={styles.userCard}>
                <img
                  src={user.profile_picture || '/images/default-avatar.png'}
                  alt={`${user.username}'s profile`}
                  className={styles.profilePic}
                />
                <strong>{user.username}</strong>
                <p>
                  Role:{' '}
                  <input
                    type="text"
                    value={user.role || ''}
                    onChange={(e) => handleRoleChange(user.userid, e.target.value)}
                    className={styles.roleInput}
                    style={{ border: '1px solid black', borderRadius: '4px', width: '100px', marginRight: '20px'}}
                  />
                </p>
                <button onClick={() => updateRole(user.userid, user.role)} className={styles.updateBtn}>
                  Update Role
                </button>
                <button onClick={() => deleteUser(user.userid)} className={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </div>
  );
};

export default Page;
