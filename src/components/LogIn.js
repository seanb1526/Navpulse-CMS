import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { masterAuth, useAuth } from "../firebase/firebaseConfig"; // Import masterAuth and useAuth
import styles from "../assets/styles/LogIn.module.css"; // Import CSS module

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Navigation hook
  const user = useAuth(); // Get the current authenticated user

  // Redirect user to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    try {
      await signInWithEmailAndPassword(masterAuth, email, password); // Use masterAuth for login
      console.log("Logged in successfully!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Log In to Navpulse</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className={styles.button}>Log in</button>
      </form>
      <p className={styles.link} onClick={() => navigate("/signup")}>
        Don't have an account? Contact Support
      </p>
    </div>
  );
};

export default LogIn;
