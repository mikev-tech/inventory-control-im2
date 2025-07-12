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

  if (checkingRole) return null; // wait until role check finishes

  if (!isAdmin) return null; // not admin, render nothing

  return (
    <>
      <h1 className={styles.title}>Recently Purchased Invoices</h1>
      <div className={styles.container}>
        {loading ? (
          <p>Loading...</p>
        ) : invoices.length === 0 ? (
          <p>No invoices found.</p>
        ) : (
          invoices.map((invoice) => (
            <div key={invoice.salesID} className={styles.card}>
              <h3>Invoice #{invoice.salesID}</h3>
              <p>Date: {new Date(invoice.salesDate).toLocaleString()}</p>
              <p>Items: {invoice.itemCount}</p>
              <p>Total: ₱{invoice.totalAmount.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Invoice;
