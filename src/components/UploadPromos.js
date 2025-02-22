import { Link, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { masterFirebaseConfig, salisburyFirebaseConfig } from "../firebase/firebaseConfig";
import styles from "../assets/styles/UploadPromos.module.css";

// Initialize Master Firebase Project
const masterApp = initializeApp(masterFirebaseConfig);
const masterAuth = getAuth(masterApp);
const masterDb = getFirestore(masterApp);

const UploadPromos = () => {
  const navigate = useNavigate();
  const [firebaseStorage, setFirebaseStorage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);

  useEffect(() => {
    const initializeCorrectFirebaseProject = async () => {
      const user = masterAuth.currentUser;
      if (!user) {
        console.error("No user signed in.");
        return;
      }

      // Fetch user document from Firestore
      const userRef = doc(masterDb, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log("User Data:", userData);

        // Determine Firebase project based on user location
        if (userData.location === "Salisbury") {
          console.log("Initializing Salisbury Firebase Project...");
          const salisburyApp = initializeApp(salisburyFirebaseConfig, "salisbury");
          setFirebaseStorage(getStorage(salisburyApp)); // Set correct storage
        } else {
          console.log("Using Master Firebase Project.");
          setFirebaseStorage(getStorage(masterApp));
        }
      } else {
        console.error("User not found in Firestore.");
      }
    };

    initializeCorrectFirebaseProject();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload file to Firebase Storage
  const handleUpload = async () => {
    if (!file || !firebaseStorage) {
      console.error("No file selected or storage not initialized.");
      return;
    }

    const storageRef = ref(firebaseStorage, `promos/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setUploadUrl(downloadURL);
      console.log("File uploaded successfully:", downloadURL);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(masterAuth);
      console.log("Logged out successfully!");
      localStorage.removeItem('user');
      navigate("/login");
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
        <h2>Upload Promos</h2>
        <p>Manage the promos displayed for your business.</p>
        
        {/* File Upload UI */}
        <input type="file" onChange={handleFileChange} />
        <button className={styles.button} onClick={handleUpload}>Upload</button>

        {uploadUrl && (
          <p>
            File uploaded! <a href={uploadUrl} target="_blank" rel="noopener noreferrer">View Image</a>
          </p>
        )}

        {/* Button to go back to the Dashboard */}
        <Link to="/dashboard" className={styles.button}>Go Back to Dashboard</Link>
      </main>
    </div>
  );
};

export default UploadPromos;
