import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { getUsers, getRecruiters } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("employer"); 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setMessage("Email and Password are required");
      return;
    }

    const list = role === "jobseeker" ? getUsers() : getRecruiters();
    const user = list.find((u) => u.email === email && u.password === password);

    if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setMessage(`${role === "jobseeker" ? "Job Seeker" : "Employer"} logged in successfully!`);

    setTimeout(() => {
      // ✅ Navigate based on role
      if (role === "jobseeker") {
        navigate("/dashboard"); // Job Seeker dashboard
      } else {
        navigate("/RecruiterDashboard"); // Employer dashboard
      }
    }, 500);
  } else {
    setMessage("Invalid email or password");
  }
};
  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleLogin}>
        <h2 className="login-header">Login</h2>

        {message && <p className="login-msg">{message}</p>}

        <div className="role-switch">
          <button
            type="button"
            className={role === "employer" ? "active" : ""}
            onClick={() => setRole("employer")}
          >
            Employer
          </button>
          <button
            type="button"
            className={role === "jobseeker" ? "active" : ""}
            onClick={() => setRole("jobseeker")}
          >
            Job Seeker
          </button>
        </div>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="login-input"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="login-button" type="submit">
          Login
        </button>

        <p className="login-footer">
          Don’t have an account?{" "}
          <span
            className="login-signup"
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={() => navigate("/signup")} // ✅ navigate to signup page
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
