'use client';

import React, { useEffect, useState } from 'react';
import styles from './auditLogs.module.css';

const AuditLogs = () => {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [audits, setAudits] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/jewelry');
      const data = await res.json();
      setProducts(data);
    };

    const fetchUserRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setUserRole('guest');

      const res = await fetch('/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUserRole(data.role);
      } else {
        setUserRole('guest');
      }
    };

    fetchProducts();
    fetchUserRole();
  }, []);

  const handleAuditChange = (id, field, value) => {
    setAudits((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const submitAudit = async (item) => {
    const audit = audits[item.jewelryItemID];
    if (!audit || !audit.counted_quantity) return alert('Count is required.');

    const res = await fetch('/api/audits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jewelryItemID: item.jewelryItemID,
        inventoryID: item.jewelryItemID,
        counted_quantity: audit.counted_quantity,
        audit_date: new Date().toISOString().split('T')[0],
        notes: audit.notes || '',
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  if (userRole !== 'Admin') return null;

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.auditContainer}>
      <h2 className={styles.title}>Inventory Audit Logs</h2>

      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search item..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.cellHeader}>Item</th>
            <th className={styles.cellHeader}>Current Stock</th>
            <th className={styles.cellHeader}>Counted</th>
            <th className={styles.cellHeader}>Notes</th>
            <th className={styles.cellHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item) => (
            <tr key={item.jewelryItemID}>
              <td className={styles.cell}>{item.name}</td>
              <td className={styles.cell}>{item.stockQuantity}</td>
              <td className={styles.cell}>
                <input
                  className={styles.input}
                  type="number"
                  value={audits[item.jewelryItemID]?.counted_quantity || ''}
                  onChange={(e) =>
                    handleAuditChange(item.jewelryItemID, 'counted_quantity', e.target.value)
                  }
                />
              </td>
              <td className={styles.cell}>
                <input
                  className={styles.input}
                  type="text"
                  value={audits[item.jewelryItemID]?.notes || ''}
                  onChange={(e) =>
                    handleAuditChange(item.jewelryItemID, 'notes', e.target.value)
                  }
                />
              </td>
              <td className={styles.cell}>
                <button className={styles.button} onClick={() => submitAudit(item)}>
                  Save Audit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogs;
