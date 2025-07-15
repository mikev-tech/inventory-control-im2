'use client';

import React, { useEffect, useState } from 'react';
import styles from './invoice.module.css';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [userID, setUserID] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('No token found.');
          return;
        }

        // Get user info
        const userRes = await fetch('/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.ok) throw new Error('Failed to fetch user info');

        const userData = await userRes.json();
        if (!userData?.id) throw new Error('Invalid user data');

        setUserID(userData.id);
        setIsAdmin((userData.role || '').toLowerCase() === 'admin');

        // Get invoices
        const invoiceRes = await fetch('/api/invoices', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!invoiceRes.ok) throw new Error('Failed to fetch invoices');

        const invoiceData = await invoiceRes.json();
        setInvoices(invoiceData);
      } catch (err) {
        console.error('Fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteInvoice = async (salesID) => {
    if (!window.confirm(`Delete invoice #${salesID}?`)) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/invoices/${salesID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete invoice.');

      setInvoices((prev) => prev.filter((inv) => inv.salesID !== salesID));
      alert(`Invoice #${salesID} deleted.`);
    } catch (err) {
      alert(err.message || 'Something went wrong.');
    }
  };

  const visibleInvoices = isAdmin
    ? invoices
    : invoices.filter((inv) => Number(inv.userID) === Number(userID));

  if (loading) {
    return <p className={styles.message}>Loading invoices...</p>;
  }

  if (userID === null) {
    return <p className={styles.message}>User ID not found.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Purchased Invoices</h1>

      {visibleInvoices.length === 0 ? (
        <p className={styles.message}>
          No invoices found for user <strong>#{userID}</strong>.
        </p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Date</th>
              {isAdmin && <th>User ID</th>}
              <th>Items</th>
              <th>Total</th>
              {(isAdmin || visibleInvoices.some(inv => inv.userID === userID)) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {visibleInvoices.map((invoice) => (
              <tr key={invoice.salesID}>
                <td>{invoice.salesID}</td>
                <td>
                  {new Date(invoice.salesDate).toLocaleString('en-PH', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </td>
                {isAdmin && <td>{invoice.userID}</td>}
                <td>{invoice.itemCount}</td>
                <td>
                  {Number(invoice.totalAmount).toLocaleString('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  })}
                </td>
                {(isAdmin || invoice.userID === userID) && ( 
                  <td>
                    <button
                      onClick={() => handleDeleteInvoice(invoice.salesID)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}

          </tbody>
        </table>
      )}
    </div>
  );
};

export default Invoice;
