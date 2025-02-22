// src/pages/Dashboard.js

import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { masterAuth } from "../firebase/firebaseConfig";
import styles from "../assets/styles/Dashboard.module.css";

const Dashboard = () => {
  const handleLogout = async () => {
    try {
      await signOut(masterAuth);
      console.log("Logged out successfully!");
      localStorage.removeItem('user'); // Remove user from localStorage
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>Navpulse</Link>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Log out
        </button>
      </header>
      <main>
        <h2>Welcome to your Dashboard</h2>
        
        <div className={styles.dashboardLinks}>
          <Link to="/account-details" className={styles.dashboardLink}>
            <button className={styles.dashboardButton}>Account Details</button>
          </Link>
          <Link to="/upload-promos" className={styles.dashboardLink}>
            <button className={styles.dashboardButton}>Upload Promos</button>
          </Link>
        </div>

        {/* You can add more dashboard content here */}
      </main>
    </div>
  );
};

export default Dashboard;
