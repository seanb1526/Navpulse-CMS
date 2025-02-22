// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { useState, useEffect } from "react";

// Master Firebase configuration (Main database containing user data)
const masterFirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Salisbury Firebase configuration
const salisburyFirebaseConfig = {
  apiKey: process.env.REACT_APP_SALISBURY_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_SALISBURY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_SALISBURY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SALISBURY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SALISBURY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_SALISBURY_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_SALISBURY_FIREBASE_MEASUREMENT_ID
};

// Initialize the Master Firebase app (Main user authentication)
const masterApp = initializeApp(masterFirebaseConfig);
const masterAuth = getAuth(masterApp);
const masterDb = getFirestore(masterApp);

// Function to get user's location from Master Firestore and initialize the correct project
const initializeSubProject = async (uid) => {
  try {
    const userDocRef = doc(masterDb, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User Data:", userData);

      if (userData.location === "Salisbury") {
        console.log("Initializing Salisbury Firebase Project...");
        const subApp = initializeApp(salisburyFirebaseConfig, "salisburyApp");
        return {
          auth: getAuth(subApp),
          db: getFirestore(subApp),
          storage: getStorage(subApp),
          analytics: getAnalytics(subApp)
        };
      }
    }
  } catch (error) {
    console.error("Error initializing sub-project:", error);
  }

  return null; // If no matching location, return null
};

// Hook to check user authentication state
const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(masterAuth, async (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []);

  return user;
};

export { masterAuth, masterDb, useAuth, initializeSubProject , masterFirebaseConfig, salisburyFirebaseConfig };
