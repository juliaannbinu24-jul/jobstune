import React, { useState } from "react";
import "./signup.css";
import { saveUser, saveRecruiter } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [role, setRole] = useState("employer");
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    if (!formData.email || !formData.password) {
      setMessage("Email and Password are required");
      return;
    }

    const id = Date.now(); // unique id for every user

    if (role === "jobseeker") {
      const payload = { id, role, ...formData };
      saveUser(payload); // store in users list
      localStorage.setItem("currentUser", JSON.stringify(payload));
      setMessage("Job Seeker registered successfully!");
      setTimeout(() => navigate("/dashboard"), 800);
    } else {
      const recruiterPayload = {
        id,
        role,
        companyName: formData.companyName,
        email: formData.email,
        website: formData.website,
        location: formData.location,
        password: formData.password,
      };
      saveRecruiter(recruiterPayload); // store in recruiters list
      localStorage.setItem("currentUser", JSON.stringify(recruiterPayload));
      setMessage("Recruiter registered successfully!");
      setTimeout(() => navigate("/recruiterdashboard"), 800);
    }

    setFormData({});
  };

  return (
    <div className="signup-bg">
      <form
        className="signup-card"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <h2 className="signup-header">Register</h2>
        {message && <p className="success-msg">{message}</p>}

        <div className="role-switch">
          <button
            type="button"
            className={role === "employer" ? "active" : ""}
            onClick={() => setRole("employer")}
          >
            As a Recruiter
          </button>
          <button
            type="button"
            className={role === "jobseeker" ? "active" : ""}
            onClick={() => setRole("jobseeker")}
          >
            As a Job Seeker
          </button>
        </div>

        {role === "employer" && (
          <>
            <input
              className="signup-input"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName || ""}
              onChange={handleChange}
              required
            />
            <input
              className="signup-input"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
            <input
              className="signup-input"
              name="website"
              placeholder="Website"
              value={formData.website || ""}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              name="location"
              placeholder="Location"
              value={formData.location || ""}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password || ""}
              onChange={handleChange}
              required
            />
          </>
        )}

       {/* JOB SEEKER SIGNUP */}
        {role === "jobseeker" && (
          <>
            <input
              className="signup-input"
              name="fullName"
              placeholder="Full Name"
              autoComplete="name"
              value={formData.fullName || ""}
              onChange={handleChange}
              required
            />
            <input
              className="signup-input"
              name="email"
              type="email"
              placeholder="Email ID"
              value={formData.email || ""}
              autoComplete="username"
              onChange={handleChange}
              required
            />
            <input
              className="signup-input"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone || ""}
              autoComplete="tel"
              onChange={handleChange}
            />
            <input
              className="signup-input"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password || ""}
              autoComplete="new-password"
              onChange={handleChange}
              required
            />
            <input
              className="signup-input"
              name="location"
              placeholder="Location"
              value={formData.location || ""}
              autoComplete="address-level2"
              onChange={handleChange}
            />
            <input
              className="signup-input"
              name="qualification"
              placeholder="Highest Qualification"
              value={formData.qualification || ""}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              name="skills"
              placeholder="Skills"
              value={formData.skills || ""}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              name="experience"
              placeholder="Experience"
              value={formData.experience || ""}
              onChange={handleChange}
            />
          </>
        )}

        <button className="signup-button" type="submit">
          Create Account
        </button>

        <p className="signup-footer">
          Already registered?{" "}
          <span
            className="signup-login"
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
