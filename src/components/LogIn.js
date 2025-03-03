import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { masterAuth, useAuth } from "../firebase/firebaseConfig"; // Import masterAuth and useAuth
import styles from "../assets/styles/LogIn.module.css"; // Import CSS module
import navpulseLogo from '../assets/images/navpulse.png';

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(masterAuth, email, password); // Use masterAuth for login
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setError(
        error.code === 'auth/invalid-credential'
          ? 'Invalid email or password'
          : 'An error occurred during sign in. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logoLink}>
          <img src={navpulseLogo} alt="Navpulse Logo" className={styles.logo} />
        </Link>
        <Link to="/" className={styles.backLink}>
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </Link>
      </nav>

      <div className={styles.container}>
        <div className={styles.loginCard}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your Navpulse Business account</p>

          {error && (
            <div className={styles.errorMessage}>
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.loadingSpinner}>
                  <i className="fas fa-spinner fa-spin"></i>
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              Need help? <a href="mailto:support@navpulse.com" className={styles.link}>Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
