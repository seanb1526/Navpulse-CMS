import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { masterAuth } from "../firebase/firebaseConfig";
import styles from "../assets/styles/Sidebar.module.css";
import navpulseLogo from "../assets/images/navpulse.png";

const Sidebar = () => {
  const location = useLocation();

  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path ? styles.active : "";
  };

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
      <Link to="/" className={styles.logo}>
        <img src={navpulseLogo} alt="Navpulse Logo" />
      </Link>
      <ul className={styles.navList}>
        <li>
          <Link
            to="/dashboard"
            className={`${styles.navLink} ${isActive("/dashboard")}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/account-details"
            className={`${styles.navLink} ${isActive("/account-details")}`}
          >
            Account Details
          </Link>
        </li>
        <li>
          <Link
            to="/upload-promos"
            className={`${styles.navLink} ${isActive("/upload-promos")}`}
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