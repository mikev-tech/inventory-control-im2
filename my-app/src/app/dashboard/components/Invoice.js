'use client';

import React, { useEffect, useState } from 'react';
import styles from './invoice.module.css';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [userID, setUserID] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch('/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        setUserID(data.id); // Get the logged-in user ID
        setIsAdmin((data.role || '').toLowerCase() === 'admin');
      } catch (err) {
        console.error('Error checking user role:', err);
      } finally {
        setCheckingRole(false);
      }
    };

    checkUserRole();
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch('/api/invoices', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setInvoices(data);
      } catch (err) {
        console.error('Failed to fetch invoices:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!checkingRole) fetchInvoices();
  }, [checkingRole]);

  const handleDeleteInvoice = async (salesID) => {
    const confirm = window.confirm(`Are you sure you want to delete invoice #${salesID}?`);
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/invoices/${salesID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to delete invoice.');
      }

      setInvoices((prev) => prev.filter((inv) => inv.salesID !== salesID));
      alert(`Invoice #${salesID} deleted.`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (checkingRole) return null;

  // Filter invoices if not admin
  const visibleInvoices = isAdmin
    ? invoices
    : invoices.filter((inv) => inv.userID === userID);

  return (
    <>
      <h1 className={styles.title}>Purchased Invoices</h1>
      {loading ? (
        <p className={styles.message}>Loading...</p>
      ) : visibleInvoices.length === 0 ? (
        <p className={styles.message}>No invoices found.</p>
      ) : (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Date</th>
            {isAdmin && <th>User ID</th>}
            <th>Items</th>
            <th>Total</th>
            {isAdmin && <th>Actions</th>}
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
              {isAdmin && (
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
    </>
  );
};

export default Invoice;
