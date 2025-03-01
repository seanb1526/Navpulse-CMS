// src/pages/Dashboard.js

import Sidebar from "../components/Sidebar";
import styles from "../assets/styles/Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <h2>Welcome to your Dashboard</h2>
          {/* Additional dashboard content can go here */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
