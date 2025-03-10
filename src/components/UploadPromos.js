import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { masterFirebaseConfig, salisburyFirebaseConfig } from "../firebase/firebaseConfig";
import imageCompression from "browser-image-compression";
import styles from "../assets/styles/UploadPromos.module.css";
import Sidebar from "./Sidebar";

// Initialize Master Firebase Project
const masterApp = initializeApp(masterFirebaseConfig);
const masterAuth = getAuth(masterApp);
const masterDb = getFirestore(masterApp);

const UploadPromos = () => {
  const [firebaseStorage, setFirebaseStorage] = useState(null);
  const [file, setFile] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]); // Track selected days
  const [isDefault, setIsDefault] = useState(true); // Track if default is selected
  const [currentImages, setCurrentImages] = useState([]); // Store current images
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [deleteInProgress, setDeleteInProgress] = useState(false); // Track deletion in progress

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

          let storage;
          if (userData.location === "Salisbury") {
            const salisburyApp = initializeApp(salisburyFirebaseConfig, `salisbury-${user.uid}`);
            storage = getStorage(salisburyApp);
          } else {
            storage = getStorage(masterApp);
          }

          setFirebaseStorage(storage);
          setIsInitialized(true);

          // Load existing images once we have storage initialized
          await loadExistingImages(storage, userData.store);
        }
      } catch (error) {
        console.error("Error initializing Firebase:", error);
        setIsLoading(false);
      }
    };

    initializeCorrectFirebaseProject();
  }, []);

  const loadExistingImages = async (storage, store) => {
    if (!storage || !store) return;

    setIsLoading(true);
    try {
      // List all items in the Promos folder
      const listRef = ref(storage, 'Promos');
      const result = await listAll(listRef);

      const storePrefix = `${store}.jpeg`;
      const daySpecificPrefix = `${store}_day_`;

      const imagePromises = result.items
        .filter(item => {
          const name = item.name;
          return name === storePrefix || name.startsWith(daySpecificPrefix);
        })
        .map(async (item) => {
          const url = await getDownloadURL(item);
          const name = item.name;
          const isDaySpecific = name.startsWith(daySpecificPrefix);
          let day = null;

          if (isDaySpecific) {
            const match = name.match(/_day_(\d)/);
            if (match && match[1]) {
              day = parseInt(match[1]);
            }
          }

          return {
            name: name,
            url: url,
            isDaySpecific: isDaySpecific,
            day: day,
            dayName: day ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][day - 1] : "Default"
          };
        });

      const images = await Promise.all(imagePromises);
      setCurrentImages(images);
    } catch (error) {
      console.error("Error loading existing images:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

      // Reset file selection and form
      setFile(null);
      document.getElementById('file-upload').value = '';
      
      // Reset days selection if it was a day-specific upload
      if (!isDefault) {
        setSelectedDays([]);
        setIsDefault(true);
      }

      // Reload images after upload
      await loadExistingImages(firebaseStorage, storeName);

      // Clear any previous errors
      // setUploadUrl(uploadedUrls);
    } catch (error) {
      console.error("Upload failed:", error);
      // Only show error if it's not a successful upload
      if (!error.message.includes('already exists')) {
        alert("Upload failed. Please try again.");
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

  const handleDelete = async (imageName) => {
    if (!firebaseStorage || deleteInProgress) return;

    // Prevent deletion of default image
    if (imageName === `${storeName}.jpeg`) {
      alert("Default image cannot be deleted. You must have at least one image displayed.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this image?")) {
      setDeleteInProgress(true);
      try {
        const imageRef = ref(firebaseStorage, `Promos/${imageName}`);
        await deleteObject(imageRef);

        // Reload images after deletion
        await loadExistingImages(firebaseStorage, storeName);
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("Failed to delete image. Please try again.");
      } finally {
        setDeleteInProgress(false);
      }
    }
  };

  const getDayLabel = (day) => {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][day - 1];
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Upload Promos</h1>
          <p className={styles.subtitle}>Manage promotional images for {storeName}</p>
        </div>

        <div className={styles.uploadCard}>
          <h2>Upload New Promotion</h2>
          <div className={styles.uploadForm}>
            <div className={styles.fileInput}>
              <label htmlFor="file-upload" className={styles.fileLabel}>
                <i className="fas fa-cloud-upload-alt"></i>
                Choose Image
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                className={styles.hiddenInput}
              />
              {file && <span className={styles.fileName}>{file.name}</span>}
            </div>

            <div className={styles.scheduleSection}>
              <h3>Display Schedule</h3>
              <label className={styles.defaultToggle}>
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={handleDefaultChange}
                />
                <span>Display Every Day (Default)</span>
              </label>

              <div className={`${styles.daysGrid} ${isDefault ? styles.disabled : ''}`}>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <label key={day} className={styles.dayCheckbox}>
                    <input
                      type="checkbox"
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDayChange(day)}
                      disabled={isDefault}
                    />
                    <span>{getDayLabel(day)}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              className={styles.uploadButton}
              onClick={handleUpload}
              disabled={!file}
            >
              <i className="fas fa-upload"></i>
              Upload Promotion
            </button>
          </div>
        </div>

        <div className={styles.currentPromos}>
          <h2>Current Promotions</h2>
          {isLoading ? (
            <div className={styles.loading}>Loading promotions...</div>
          ) : (
            <div className={styles.promosGrid}>
              {currentImages.map((image, index) => {
                console.log('Rendering image:', image); // Keep this debug log
                return (
                  <div key={index} className={styles.imageCard}>
                    <div className={styles.imageWrapper}>
                      <img src={image.url} alt={`Promo for ${image.dayName}`} />
                    </div>
                    <div className={styles.imageInfo}>
                      <p><strong>{image.isDaySpecific ? `${image.dayName}` : "Default (Every Day)"}</strong></p>
                      {image.isDaySpecific && (
                        <button 
                          className={styles.deleteButton}
                          onClick={() => handleDelete(image.name)}
                          disabled={deleteInProgress}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UploadPromos;