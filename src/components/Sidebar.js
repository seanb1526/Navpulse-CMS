// src/components/Sidebar.js

import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { masterAuth } from "../firebase/firebaseConfig";
import styles from "../assets/styles/Sidebar.module.css"; // Updated import

const Sidebar = () => {
  const location = useLocation(); // Get current path

  const handleLogout = async () => {
    try {
      await signOut(masterAuth);
      console.log("Logged out successfully!");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className={styles.sidebar}>
      <Link to="/" className={styles.logo}>Navpulse</Link>
      <ul className={styles.navList}>
        <li>
          <Link 
            to="/dashboard" 
            className={`${styles.navLink} ${location.pathname === "/dashboard" ? styles.active : ""}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/account-details" 
            className={`${styles.navLink} ${location.pathname === "/account-details" ? styles.active : ""}`}
          >
            Account Details
          </Link>
        </li>
        <li>
          <Link 
            to="/upload-promos" 
            className={`${styles.navLink} ${location.pathname === "/upload-promos" ? styles.active : ""}`}
          >
            Upload Promos
          </Link>
        </li>
      </ul>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Log out
      </button>
    </nav>
  );
};

export default Sidebar;
