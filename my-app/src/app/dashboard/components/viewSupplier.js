'use client';

import React, { useEffect, useState } from 'react';
import styles from './viewSupplier.module.css';

const ViewSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  // Fetch all suppliers
  const fetchSuppliers = async () => {
    try {
      const res = await fetch('/api/supplier');
      const data = await res.json();
      setSuppliers(data);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this supplier?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/supplier/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      setSuppliers((prev) => prev.filter((s) => s.supplierID !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Could not delete supplier.');
    }
  };

  // Add new supplier handler
  const handleAdd = async () => {
    const { name, phone, email, address } = newSupplier;

    if (!name || !phone || !email || !address) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const res = await fetch('/api/supplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupplier),
      });

      if (!res.ok) throw new Error('Failed to add');

      const addedSupplier = await res.json();
      setSuppliers((prev) => [...prev, addedSupplier]);

      // Reset form
      setNewSupplier({ name: '', phone: '', email: '', address: '' });
    } catch (err) {
      console.error('Add error:', err);
      alert('Could not add supplier.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Supplier List</h1>

      {/* Add Supplier Form */}
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={newSupplier.name}
          onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newSupplier.phone}
          onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newSupplier.email}
          onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newSupplier.address}
          onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
        />
        <button onClick={handleAdd}>Add Supplier</button>
      </div>

      {/* Supplier Table */}
      {loading ? (
        <p>Loading suppliers...</p>
      ) : suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Supplier ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.supplierID}>
                <td>{supplier.supplierID}</td>
                <td>{supplier.name}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.email}</td>
                <td>{supplier.address}</td>
                <td>
                  <button className={styles.delete} onClick={() => handleDelete(supplier.supplierID)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewSupplier;
