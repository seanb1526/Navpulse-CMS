// src/pages/AccountDetails.js

import Sidebar from "../components/Sidebar";
import styles from "../assets/styles/AccountDetails.module.css"; // Use the correct CSS

const AccountDetails = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <h2>Account Details</h2>
          </div>
          <section className={styles.accountInfo}>
            <h3>Business Information</h3>
            <p><strong>Name:</strong> Business Name</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
          </section>
          <section className={styles.accountActions}>
            <h3>Account Actions</h3>
            <button className={styles.button}>Update Info</button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AccountDetails;
