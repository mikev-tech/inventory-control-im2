'use client';

import React, { useEffect, useState } from 'react';
import styles from './invoice.module.css';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return setIsAdmin(false);

        const res = await fetch('/api/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return setIsAdmin(false);

        const data = await res.json();
        setIsAdmin((data.role || '').toLowerCase() === 'admin');
      } catch (err) {
        console.error('Error checking user role:', err);
        setIsAdmin(false);
      } finally {
        setCheckingRole(false);
      }
    };

    checkUserRole();
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch('/api/invoices');
        const data = await res.json();
        setInvoices(data);
      } catch (err) {
        console.error('Failed to fetch invoices:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchInvoices();
    }
  }, [isAdmin]);

  if (checkingRole) return null;
  if (!isAdmin) return null;

  return (
      <>
        <h1 className={styles.title}>Recently Purchased Invoices</h1>
        {loading ? (
          <p className={styles.message}>Loading...</p>
        ) : invoices.length === 0 ? (
          <p className={styles.message}>No invoices found.</p>
        ) : (
          <div className={styles.grid}>
            {invoices.map((invoice) => (
              <div key={invoice.salesID} className={styles.card}>
                <h3>Invoice #{invoice.salesID}</h3>
                <p className={styles.date}>
                  {new Date(invoice.salesDate).toLocaleString('en-PH', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
                <p><strong>User ID:</strong> {invoice.userID}</p> {/* 👈 NEW */}
                <p><strong>Items:</strong> {invoice.itemCount}</p>
                <p>
                  <strong>Total:</strong>{' '}
                  {Number(invoice.totalAmount).toLocaleString('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </>

  );
};

export default Invoice;
