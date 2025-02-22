// src/utils/PrivateRoute.js

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { masterAuth } from "../firebase/firebaseConfig";

const PrivateRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(masterAuth, (user) => {
      setUser(user);  // Set the user state
      setLoading(false);  // Stop loading after user state is set
    });

    return () => unsubscribe();  // Clean up on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner here if you prefer
  }

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
