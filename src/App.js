import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LogIn from "./components/LogIn";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./components/Dashboard";
import AccountDetails from "./components/AccountDetails";
import UploadPromos from "./components/UploadPromos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />} // Protect the Dashboard route
        />
        <Route
          path="/account-details"
          element={<PrivateRoute element={<AccountDetails />} />} // Protect AccountDetails route
        />
        <Route
          path="/upload-promos"
          element={<PrivateRoute element={<UploadPromos />} />} // Protect UploadPromos route
        />
      </Routes>
    </Router>
  );
}

export default App;
