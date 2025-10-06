import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import HealthData from "./Pages/HealthData";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          {/* Redirect '/' to '/login' */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/health-data" element={<HealthData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
