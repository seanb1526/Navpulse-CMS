// src/pages/AccountDetails.js

import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Sidebar from './Sidebar';
import styles from '../assets/styles/AccountDetails.module.css';

const AccountDetails = () => {
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    store: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadBusinessInfo();
  }, []);

  const loadBusinessInfo = async () => {
    const auth = getAuth();
    const db = getFirestore();
    
    if (auth.currentUser) {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setBusinessInfo(data);
        setEditForm(data);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const auth = getAuth();
    const db = getFirestore();
    
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), editForm);
      setBusinessInfo(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setEditForm(businessInfo);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Account Details</h1>
          {!isEditing && (
            <button className={styles.editButton} onClick={handleEdit}>
              <i className="fas fa-edit"></i>
              Edit Profile
            </button>
          )}
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.infoCard}>
            <h2>Business Information</h2>
            {isEditing ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label>Business Name</label>
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Store Name</label>
                  <input
                    type="text"
                    value={editForm.store || ''}
                    onChange={(e) => setEditForm({...editForm, store: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Address</label>
                  <input
                    type="text"
                    value={editForm.address || ''}
                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Location</label>
                  <input
                    type="text"
                    value={editForm.location || ''}
                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  />
                </div>
                <div className={styles.buttonGroup}>
                  <button className={styles.saveButton} onClick={handleSave}>
                    Save Changes
                  </button>
                  <button className={styles.cancelButton} onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.infoDisplay}>
                <div className={styles.infoRow}>
                  <span>Business Name</span>
                  <span>{businessInfo.name}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Store Name</span>
                  <span>{businessInfo.store}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Email</span>
                  <span>{businessInfo.email}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Phone</span>
                  <span>{businessInfo.phone}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Address</span>
                  <span>{businessInfo.address}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Location</span>
                  <span>{businessInfo.location}</span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.infoCard}>
            <h2>Account Security</h2>
            <button className={styles.securityButton}>
              <i className="fas fa-key"></i>
              Change Password
            </button>
            <button className={styles.securityButton}>
              <i className="fas fa-shield-alt"></i>
              Two-Factor Authentication
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountDetails;
