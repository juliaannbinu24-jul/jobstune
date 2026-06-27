import React, { useState, useEffect } from "react";
import "./dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser")); // Jobseeker

  const [activeTab, setActiveTab] = useState("dashboard");
  const [newJobs, setNewJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // ⭐ Resume upload
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    if (!user) return;

    // Load all jobs
    const allJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
    setNewJobs(allJobs);

    // Load applied jobs
    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    const myApplied = applied.filter(job => job.userId === user.id);
    setAppliedJobs(myApplied);
  }, [user]);

  if (!user) {
    return <p className="no-user-msg">Please login to view your dashboard.</p>;
  }

  /* ---------------- RESUME UPLOAD ---------------- */
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedResume(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /* ---------------- APPLY JOB ---------------- */
  const handleApply = (job) => {
    if (!selectedResume) {
      alert("Please upload your resume before applying.");
      return;
    }

    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    const alreadyApplied = applied.some(
      a => a.jobId === job.id && a.userId === user.id
    );

    if (alreadyApplied) {
      alert("You already applied for this job");
      return;
    }

    const jobToApply = {
      applicationId: Date.now(),
      jobId: job.id,
      title: job.title,
      recruiterId: job.recruiterId,
      userId: user.id,
      userName: user.fullName,
      userEmail: user.email,
      resume: selectedResume,
      status: "Pending",
      interviewMessage: ""
    };

    applied.push(jobToApply);
    localStorage.setItem("appliedJobs", JSON.stringify(applied));

    setAppliedJobs([...appliedJobs, jobToApply]);
    setSelectedResume(null);

    alert("Job applied successfully!");
  };

  /* ---------------- UI ---------------- */
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <section className="profile-section">
            <h2>Profile Info</h2>

            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {user.fullName?.[0] || "U"}
                </div>
                <h3>{user.fullName}</h3>
                <p>{user.email}</p>
              </div>

              <div className="profile-body">
                <div className="profile-row">
                  <label>Full Name</label>
                  <input value={user.fullName} readOnly />
                </div>

                <div className="profile-row">
                  <label>Email</label>
                  <input value={user.email} readOnly />
                </div>

                {user.location && (
                  <div className="profile-row">
                    <label>Location</label>
                    <input value={user.location} readOnly />
                  </div>
                )}

                {user.skills && (
                  <div className="profile-row">
                    <label>Skills</label>
                    <input value={user.skills} readOnly />
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case "applied":
        return (
          <section className="jobs-section">
            <h2>Applied Jobs</h2>

            {appliedJobs.length === 0 ? (
              <p>No applied jobs yet.</p>
            ) : (
              <ul className="job-list">
                {appliedJobs.map(job => (
                  <li key={job.applicationId} className="job-item">
                    <p className="job-title">{job.title}</p>

                    <span className={`status-badge ${job.status.toLowerCase()}`}>
                      {job.status}
                    </span>

                    {job.interviewMessage && (
                      <p className="interview-indicator">
                        📅 Interview Scheduled – check Messages
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        );

      case "messages":
        return (
          <section className="messages-section">
            <h2>Messages</h2>

            {appliedJobs.filter(j => j.interviewMessage).length === 0 ? (
              <p>No interview messages yet.</p>
            ) : (
              <ul className="message-list">
                {appliedJobs
                  .filter(j => j.interviewMessage)
                  .map(j => (
                    <li key={j.applicationId} className="message-item">
                      <p className="message-title">
                        🎯 Interview Invitation – {j.title}
                      </p>
                      <p>{j.interviewMessage}</p>
                      <span className="message-status">
                        Current Status: {j.status}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </section>
        );

      default:
        return (
          <section className="jobs-section">
            <h2>All Jobs</h2>

            {newJobs.length === 0 ? (
              <p>No jobs available.</p>
            ) : (
              <ul className="job-list">
                {newJobs.map(job => {
                  const alreadyApplied = appliedJobs.some(
                    a => a.jobId === job.id
                  );

                  return (
                    <li key={job.id} className="job-item">
                      <p className="job-title">{job.title}</p>
                      <p className="job-company">{job.company}</p>
                      {job.description && <p>{job.description}</p>}

                      {!alreadyApplied && (
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeUpload}
                        />
                      )}

                      {alreadyApplied ? (
                        <button className="apply-btn applied" disabled>
                          Already Applied
                        </button>
                      ) : (
                        <button
                          className="apply-btn"
                          onClick={() => handleApply(job)}
                        >
                          Apply
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
    }
  };

  return (
    <div className="dashboard-fullscreen">
      <nav className="dashboard-nav">
        <h1>JobSeeker Dashboard</h1>

        <ul className="nav-links">
          <li onClick={() => setActiveTab("dashboard")}>All Jobs</li>
          <li onClick={() => setActiveTab("profile")}>Profile</li>
          <li onClick={() => setActiveTab("applied")}>Applied Jobs</li>
          <li onClick={() => setActiveTab("messages")}>
            Messages
            {appliedJobs.some(j => j.interviewMessage) && (
              <span className="notif-dot">•</span>
            )}
          </li>
          <li>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("currentUser");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <main className="dashboard-content">{renderTabContent()}</main>
    </div>
  );
}
