import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { masterAuth } from '../firebase/firebaseConfig';
import styles from '../assets/styles/Sidebar.module.css';
import logo from '../assets/images/navpulse.png';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(masterAuth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="Navpulse Logo" />
      </div>
      
      <nav className={styles.navigation}>
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            isActive ? styles.activeLink : styles.link
          }
        >
          <i className="fas fa-home"></i>
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/account-details" 
          className={({ isActive }) => 
            isActive ? styles.activeLink : styles.link
          }
        >
          <i className="fas fa-user"></i>
          Account Details
        </NavLink>
        
        <NavLink 
          to="/upload-promos" 
          className={({ isActive }) => 
            isActive ? styles.activeLink : styles.link
          }
        >
          <i className="fas fa-tags"></i>
          Upload Promos
        </NavLink>
      </nav>
      
      <div className={styles.userSection}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;