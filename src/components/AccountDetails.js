import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { masterAuth } from "../firebase/firebaseConfig";
import { useEffect } from "react";
import styles from "../assets/styles/AccountDetails.module.css"; // Add styles if needed

const AccountDetails = () => {
  const navigate = useNavigate();

  // Logout function (same as in Dashboard)
  const handleLogout = async () => {
    try {
      await signOut(masterAuth);
      console.log("Logged out successfully!");
      localStorage.removeItem('user'); // Remove user from localStorage
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage

    if (!user) {
      // If no user found in localStorage, redirect to login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>Navpulse</Link>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Log out
        </button>
      </header>
      <main>
        <h2>Account Details</h2>
        <p>Manage your Navpulse business account here.</p>
        {/* Button to go back to the Dashboard */}
        <Link to="/dashboard" className={styles.button}>Go Back to Dashboard</Link>
      </main>
    </div>
  );
};

export default AccountDetails;
