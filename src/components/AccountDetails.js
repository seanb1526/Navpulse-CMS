// src/pages/AccountDetails.js

import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { masterAuth, masterDb } from '../firebase/firebaseConfig';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import Sidebar from './Sidebar';
import styles from '../assets/styles/AccountDetails.module.css';

const AccountDetails = () => {
  const [businessInfo, setBusinessInfo] = useState({
    email: '',
    phone: '',
    address: '',
    location: '',
    store: '',
    userId: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    loadBusinessInfo();
  }, []);

  const loadBusinessInfo = async () => {
    try {
      const user = masterAuth.currentUser;
      if (!user) {
        setError('No user logged in');
        return;
      }

      const userDoc = await getDoc(doc(masterDb, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setBusinessInfo({
          ...data,
          userId: user.uid
        });
        setEditForm({
          phone: data.phone || '',
          address: data.address || ''
        });
      } else {
        setError('User data not found');
      }
    } catch (error) {
      console.error('Error loading business info:', error);
      setError('Failed to load business information');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    try {
      const user = masterAuth.currentUser;
      if (!user) {
        setError('No user logged in');
        return;
      }

      const updateData = {
        phone: editForm.phone,
        address: editForm.address
      };

      await updateDoc(doc(masterDb, 'users', user.uid), updateData);

      setBusinessInfo(prev => ({
        ...prev,
        phone: editForm.phone,
        address: editForm.address
      }));
      setIsEditing(false);
      setSuccess('Profile updated successfully');
      setError('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
      setSuccess('');
    }
  };

  const handleCancel = () => {
    setEditForm({
      phone: businessInfo.phone || '',
      address: businessInfo.address || ''
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const handlePasswordChange = async () => {
    setPasswordError('');
    setPasswordSuccess('');

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    try {
      const user = masterAuth.currentUser;
      if (!user) {
        setPasswordError('No user logged in');
        return;
      }

      // Reauthenticate user before password change
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);

      setPasswordSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setShowPasswordModal(false);
      }, 2000);
    } catch (error) {
      console.error('Error updating password:', error);
      if (error.code === 'auth/wrong-password') {
        setPasswordError('Current password is incorrect');
      } else if (error.code === 'auth/requires-recent-login') {
        setPasswordError('Please log in again to change your password');
      } else {
        setPasswordError('Failed to update password');
      }
    }
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

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.contentGrid}>
          <div className={styles.infoCard}>
            <h2>Business Information</h2>
            {isEditing ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label>Store Name</label>
                  <input
                    type="text"
                    value={businessInfo.store}
                    disabled
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={businessInfo.email}
                    disabled
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Address</label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Location</label>
                  <input
                    type="text"
                    value={businessInfo.location}
                    disabled
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
            <button 
              className={styles.securityButton}
              onClick={() => setShowPasswordModal(true)}
            >
              <i className="fas fa-key"></i>
              Change Password
            </button>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Change Password</h2>
              {passwordError && <div className={styles.error}>{passwordError}</div>}
              {passwordSuccess && <div className={styles.success}>{passwordSuccess}</div>}
              <div className={styles.formGroup}>
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div className={styles.formGroup}>
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <div className={styles.buttonGroup}>
                <button 
                  className={styles.saveButton}
                  onClick={handlePasswordChange}
                >
                  Update Password
                </button>
                <button 
                  className={styles.cancelButton}
                  onClick={() => {
                    setShowPasswordModal(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordError('');
                    setPasswordSuccess('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AccountDetails;
