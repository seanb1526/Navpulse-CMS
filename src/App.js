import { BrowswerRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
