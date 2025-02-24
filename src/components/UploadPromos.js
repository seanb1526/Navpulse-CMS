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
  const [storeName, setStoreName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]); // Track selected days
  const [isDefault, setIsDefault] = useState(true); // Track if default is selected

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
          if (userData.store) setStoreName(userData.store);

          if (userData.location === "Salisbury") {
            const salisburyApp = initializeApp(salisburyFirebaseConfig, `salisbury-${user.uid}`);
            setFirebaseStorage(getStorage(salisburyApp));
          } else {
            setFirebaseStorage(getStorage(masterApp));
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
      console.error("Upload prerequisites not met.");
      return;
    }

    try {
      let uploadedUrls = [];

      if (isDefault) {
        // Upload as default image
        const storageRef = ref(firebaseStorage, `Promos/${storeName}.jpeg`);
        await uploadBytes(storageRef, file);
        uploadedUrls.push(await getDownloadURL(storageRef));
      } else {
        // Upload an image for each selected day
        for (let day of selectedDays) {
          const storageRef = ref(firebaseStorage, `Promos/${storeName}_day_${day}.jpeg`);
          await uploadBytes(storageRef, file);
          uploadedUrls.push(await getDownloadURL(storageRef));
        }
      }

      setUploadUrl(uploadedUrls);
    } catch (error) {
      console.error("Upload failed:", error);
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

    try {
      const options = { maxWidthOrHeight: 1024, fileType: "image/jpeg" };
      setFile(await imageCompression(selectedFile, options));
    } catch (error) {
      console.error("Error converting image:", error);
    }
  };

  const handleDayChange = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleDefaultChange = () => {
    setIsDefault(!isDefault);
    if (!isDefault) setSelectedDays([]); // Reset days if switching back to default
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>Navpulse</Link>
        <button className={styles.logoutButton} onClick={async () => {
          await signOut(masterAuth);
          navigate("/login");
        }}>Log out</button>
      </header>

      <main>
        <h2>Upload Promos</h2>
        <p>Manage the promos displayed for your business.</p>
        {storeName && <p><strong>Store Name:</strong> {storeName}</p>}

        <input type="file" onChange={handleFileChange} />
        
        <div className={styles.daySelection}>
          <label>
            <input type="checkbox" checked={isDefault} onChange={handleDefaultChange} />
            Default (Every Day)
          </label>

          <div className={`${styles.checkboxGroup} ${isDefault ? styles.disabled : ""}`}>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayChange(day)}
                  disabled={isDefault}
                />
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][day - 1]}
              </label>
            ))}
          </div>
        </div>

        <button className={styles.button} onClick={handleUpload} disabled={!file}>
          Upload
        </button>

        {uploadUrl && uploadUrl.map((url, index) => (
          <p key={index}>
            File uploaded! <a href={url} target="_blank" rel="noopener noreferrer">View Image</a>
          </p>
        ))}

        <Link to="/dashboard" className={styles.button}>Go Back to Dashboard</Link>
      </main>
    </div>
  );
};

export default UploadPromos;
