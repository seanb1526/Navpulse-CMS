// src/pages/Dashboard.js

import React from 'react';
import Sidebar from './Sidebar';
import styles from '../assets/styles/Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Dashboard</h1>
        </div>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Active Promotions</h3>
            <p className={styles.statNumber}>12</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Views</h3>
            <p className={styles.statNumber}>1,234</p>
          </div>
          <div className={styles.statCard}>
            <h3>Redemptions</h3>
            <p className={styles.statNumber}>89</p>
          </div>
        </div>
        
        <div className={styles.recentActivity}>
          <h2>Recent Activity</h2>
          {/* Add your recent activity content here */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
