import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">

      {/* 🔝 Navbar */}
      <div className="navbar">
        <h2 style={{ color: "white", fontWeight: "bold" }}>JOBSTUNE</h2>

        <div className="nav-buttons">
          <Link to="/login">Login</Link>
          <Link to="/signup">Register</Link>
          <Link to="/about">About Us</Link>
          <Link to="/help">Help</Link>
        </div>
      </div>

      {/* ✨ Center Quote */}
      <div className="center-text">
        <p>
          “Where connections become careers, and dreams turn into achievements.”
        </p>
      </div>

      {/* 🔻 Footer */}
      <div className="footer">
        <p>© 2025 JOBSTUNE</p>
      </div>

    </div>
  );
}
