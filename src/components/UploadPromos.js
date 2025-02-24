import { Link, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { masterFirebaseConfig, salisburyFirebaseConfig } from "../firebase/firebaseConfig";
import imageCompression from "browser-image-compression";
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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeCorrectFirebaseProject = async () => {
      const user = masterAuth.currentUser;
      if (!user) {
        console.log("No user signed in.");
        return;
      }

      try {
        const userRef = doc(masterDb, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          if (userData.location === "Salisbury") {
            // Initialize with a unique name to prevent conflicts
            const salisburyApp = initializeApp(salisburyFirebaseConfig, `salisbury-${user.uid}`);
            const storage = getStorage(salisburyApp);
            setFirebaseStorage(storage);
          } else {
            const storage = getStorage(masterApp);
            setFirebaseStorage(storage);
          }
          setIsInitialized(true);
        }
      } catch (error) {
        console.error("Error initializing Firebase:", error);
      }
    };

    initializeCorrectFirebaseProject();
  }, []);



  const handleUpload = async () => {
    if (!file || !firebaseStorage || !isInitialized) {
      console.error("Upload prerequisites not met:", {
        hasFile: !!file,
        hasStorage: !!firebaseStorage,
        isInitialized
      });
      return;
    }
  
    try {
      const extension = file.type === "image/png" ? "png" : "jpeg"; // Ensure consistent extension
      const storageRef = ref(firebaseStorage, `Promos/${file.name.split(".")[0]}.${extension}`);
      
      console.log("Uploading to:", storageRef.fullPath);
      
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Upload snapshot:", snapshot);
      
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);
      
      setUploadUrl(downloadURL);
    } catch (error) {
      console.error("Upload failed:", error);
      if (error.code === "storage/unauthorized") {
        console.error("Storage unauthorized. Check storage rules.");
      }
    } 
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) return;
  
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PNG and JPEG files are allowed.");
      return;
    }
  
    let convertedFile = selectedFile;
  
    // Convert .jpg to .jpeg for compatibility
    if (selectedFile.type === "image/jpg") {
      try {
        const options = { maxWidthOrHeight: 1024, fileType: "image/jpeg" };
        convertedFile = await imageCompression(selectedFile, options);
      } catch (error) {
        console.error("Error converting image:", error);
        return;
      }
    }
  
    setFile(convertedFile);
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
