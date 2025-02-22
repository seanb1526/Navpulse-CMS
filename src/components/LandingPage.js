import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../assets/styles/LandingPage.module.css"; // Import CSS module

const LandingPage = () => {
    const navigate = useNavigate(); // Hook for navigation

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logo}>Navpulse</h1>
        <button className={styles.signInButton} onClick={() => navigate("/login")}>
          Sign In
        </button>
      </header>

      {/* Hero Section */}
      <main className={styles.hero}>
        <h2>Welcome to Navpulse</h2>
        <p>Discover exclusive promotions and rewards as you explore the city.</p>
      </main>
    </div>
  );
};

export default LandingPage;
