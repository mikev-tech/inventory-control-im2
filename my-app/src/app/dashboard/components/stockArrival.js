'use client';

import React, { useEffect, useState } from 'react';
import styles from './stockArrivals.module.css';

const StockArrivals = () => {
  const [userRole, setUserRole] = useState('');
  const [arrivals, setArrivals] = useState([]);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    jewelryItemID: '',
    arrivalDate: '',
    quantity: '',
    supplierID: '',
    unitCost: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const me = await fetch('/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const meData = await me.json();
      setUserRole(meData.role);

      const arrivalsRes = await fetch('/api/stock_arrivals');
      const arrivalsData = await arrivalsRes.json();
      setArrivals(arrivalsData);

      const itemsRes = await fetch('/api/jewelry');
      const itemsData = await itemsRes.json();
      setItems(itemsData);

      const suppliersRes = await fetch('/api/supplier');
      const suppliersData = await suppliersRes.json();
      setSuppliers(suppliersData);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/stock_arrivals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message || 'Saved');
  };

  if (userRole !== 'Admin') return null;

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this stock arrival?");
  if (!confirmDelete) return;

  const res = await fetch(`/api/stock_arrivals/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json();
  alert(data.message || 'Deleted');

  // Refresh arrivals after deletion
  const arrivalsRes = await fetch('/api/stock_arrivals');
  const arrivalsData = await arrivalsRes.json();
  setArrivals(arrivalsData);
};


  return (
    <div className={styles.arrivalContainer}>
      <h2 className={styles.title}>Stock Arrivals</h2>

      <div className={styles.form}>
        <select
          name="jewelryItemID"
          value={form.jewelryItemID}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Select Jewelry Item</option>
          {items.map((item) => (
            <option key={item.jewelryItemID} value={item.jewelryItemID}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          className={styles.input}
          type="date"
          name="arrivalDate"
          value={form.arrivalDate}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />

        <select
          name="supplierID"
          value={form.supplierID}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Select Supplier</option>
          {suppliers.map((sup) => (
            <option key={sup.supplierID} value={sup.supplierID}>
              {sup.name}
            </option>
          ))}
        </select>

        <input
          className={styles.input}
          type="number"
          name="unitCost"
          placeholder="Unit Cost"
          value={form.unitCost}
          onChange={handleChange}
        />

        <button className={styles.button} onClick={handleSubmit}>Save</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.cellHeader}>Item</th>
              <th className={styles.cellHeader}>Date</th>
              <th className={styles.cellHeader}>Quantity</th>
              <th className={styles.cellHeader}>Supplier</th>
              <th className={styles.cellHeader}>Cost</th>
              <th className={styles.cellHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {arrivals.map((a) => (
              <tr key={a.stockArrivalID}>
                <td className={styles.cell}>{items.find(i => i.jewelryItemID === a.jewelryItemID)?.name || '—'}</td>
                <td className={styles.cell}>
                  {new Date(a.arrivalDate).toLocaleDateString('en-PH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
                <td className={styles.cell}>{a.quantity}</td>
                <td className={styles.cell}>{suppliers.find(s => s.supplierID === a.supplierID)?.name || '—'}</td>
                <td className={styles.cell}>₱{parseFloat(a.unitCost).toFixed(2)}</td>
                <td className={styles.cell}>
                  <button className={styles.deleteButton} onClick={() => handleDelete(a.stockArrivalID)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockArrivals;
