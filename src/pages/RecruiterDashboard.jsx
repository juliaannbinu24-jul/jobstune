import React, { useState, useEffect } from "react";
import "./dashboard.css";

export default function RecruiterDashboard() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [activeTab, setActiveTab] = useState("dashboard");
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [profile, setProfile] = useState({
    id: currentUser?.id || "",
    companyName: currentUser?.companyName || "",
    email: currentUser?.email || "",
    website: currentUser?.website || "",
    location: currentUser?.location || ""
  });

  const [editMode, setEditMode] = useState(false);
  const [appliedCandidates, setAppliedCandidates] = useState([]);

  // 🔥 Interview modal state
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [interviewMessage, setInterviewMessage] = useState("");

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    if (!currentUser) return;

    const allJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
    setJobs(allJobs.filter(j => j.recruiterId === currentUser.id));

    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedCandidates(
      applied.filter(a => a.recruiterId === currentUser.id)
    );
  }, [currentUser]);

  if (!currentUser) {
    return <p className="no-user-msg">Please login again.</p>;
  }

  /* ---------------- ADD JOB ---------------- */
  const handleAddJob = () => {
    if (!jobTitle.trim()) {
      alert("Job title is required");
      return;
    }

    const newJob = {
      id: Date.now(),
      recruiterId: currentUser.id,
      company: profile.companyName,
      title: jobTitle,
      description: jobDescription
    };

    const allJobs = JSON.parse(localStorage.getItem("allJobs")) || [];
    localStorage.setItem("allJobs", JSON.stringify([...allJobs, newJob]));

    setJobs([...jobs, newJob]);
    setJobTitle("");
    setJobDescription("");
  };

  /* ---------------- SAVE PROFILE ---------------- */
  const handleProfileSave = () => {
    const recruiters = JSON.parse(localStorage.getItem("recruiters")) || [];

    const updatedRecruiters = recruiters.map(r =>
      r.id === profile.id ? profile : r
    );

    localStorage.setItem("recruiters", JSON.stringify(updatedRecruiters));
    localStorage.setItem("currentUser", JSON.stringify(profile));

    setEditMode(false);
    alert("Profile updated successfully!");
  };

  /* ---------------- UPDATE STATUS (ANYTIME) ---------------- */
  const updateCandidateStatus = (applicationId, newStatus) => {
    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    const updated = applied.map(app =>
      app.applicationId === applicationId
        ? { ...app, status: newStatus, interviewMessage: app.interviewMessage || "" }
        : app
    );

    localStorage.setItem("appliedJobs", JSON.stringify(updated));

    setAppliedCandidates(
      updated.filter(a => a.recruiterId === currentUser.id)
    );
  };

  /* ---------------- SEND INTERVIEW MESSAGE ---------------- */
  const sendInterviewMessage = () => {
    if (!interviewMessage.trim()) {
      alert("Please enter interview details");
      return;
    }

    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    const updated = applied.map(app =>
      app.applicationId === selectedCandidate.applicationId
        ? {
            ...app,
            status: "Interview Scheduled",
            interviewMessage
          }
        : app
    );

    localStorage.setItem("appliedJobs", JSON.stringify(updated));

    setAppliedCandidates(
      updated.filter(a => a.recruiterId === currentUser.id)
    );

    setShowInterviewModal(false);
    setInterviewMessage("");
    setSelectedCandidate(null);
  };

  /* ---------------- UI ---------------- */
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <section className="profile-section">
            <h2>Company Profile</h2>

            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {profile.companyName?.[0] || "C"}
                </div>
                <h3>{profile.companyName}</h3>
                <p>{profile.email}</p>
              </div>

              <div className="profile-body">
                {[
                  ["Company Name", "companyName"],
                  ["Email", "email"],
                  ["Website", "website"],
                  ["Location", "location"]
                ].map(([label, field]) => (
                  <div className="profile-row" key={field}>
                    <label>{label}</label>
                    <input
                      type="text"
                      value={profile[field]}
                      readOnly={!editMode}
                      onChange={(e) =>
                        setProfile({ ...profile, [field]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="profile-actions">
                {editMode ? (
                  <button className="edit-btn" onClick={handleProfileSave}>
                    Save Changes
                  </button>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </section>
        );

      case "addjob":
        return (
          <section className="jobs-section">
            <h2>Add New Job</h2>

            <input
              className="signup-input"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <textarea
              className="signup-input textarea"
              placeholder="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button className="signup-button" onClick={handleAddJob}>
              Add Job
            </button>

            <h3>Your Jobs</h3>
            <ul className="job-list">
              {jobs.map(job => (
                <li key={job.id} className="job-item">
                  <p className="job-title">{job.title}</p>
                  <p>{job.description}</p>
                </li>
              ))}
            </ul>
          </section>
        );

      case "candidates":
        return (
          <section className="jobs-section">
            <h2>Applied Candidates</h2>

            {appliedCandidates.length === 0 ? (
              <p>No candidates yet.</p>
            ) : (
              <div className="candidate-grid">
                {appliedCandidates.map(c => (
                  <div key={c.applicationId} className="candidate-card">

                    <div className="candidate-header">
                      <div className="candidate-avatar">
                        {c.userName?.[0] || "U"}
                      </div>
                      <div>
                        <h3>{c.userName}</h3>
                        <p>{c.userEmail}</p>
                      </div>
                    </div>

                    <div className="candidate-body">
                      <p><strong>Applied For:</strong> {c.title}</p>

                      <span className={`status-badge ${c.status.toLowerCase()}`}>
                        {c.status}
                      </span>

                      {c.interviewMessage && (
                        <p className="interview-msg">
                          <strong>Interview:</strong> {c.interviewMessage}
                        </p>
                      )}
                    </div>

                    {c.resume && (
                      <a
                        href={c.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="resume-btn"
                      >
                        View Resume
                      </a>
                    )}

                    <div className="candidate-actions">
                      <select
                        value={c.status}
                        onChange={(e) =>
                          updateCandidateStatus(c.applicationId, e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>Rejected</option>
                        <option>Verified</option>
                        <option>Interview Scheduled</option>
                        <option>Approved</option>
                      </select>

                      {c.status === "Verified" && (
                        <button
                          className="approve-btn"
                          onClick={() => {
                            setSelectedCandidate(c);
                            setShowInterviewModal(true);
                          }}
                        >
                          Schedule Interview
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );

      default:
        return (
          <section className="jobs-section">
            <h2>Welcome, {profile.companyName}</h2>
            <p>Manage your jobs and candidates from the menu.</p>
          </section>
        );
    }
  };

  return (
    <div className="dashboard-fullscreen">
      <nav className="dashboard-nav">
        <h1>Recruiter Dashboard</h1>

        <ul className="nav-links">
          <li onClick={() => setActiveTab("dashboard")}>Home</li>
          <li onClick={() => setActiveTab("profile")}>Profile</li>
          <li onClick={() => setActiveTab("addjob")}>Add Job</li>
          <li onClick={() => setActiveTab("candidates")}>Candidates</li>
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

      {/* 🔥 INTERVIEW MODAL */}
      {showInterviewModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Interview Details</h2>

            <textarea
              placeholder="Interview date, time, venue / meeting link..."
              value={interviewMessage}
              onChange={(e) => setInterviewMessage(e.target.value)}
            />

            <div className="modal-actions">
              <button className="approve-btn" onClick={sendInterviewMessage}>
                Send
              </button>
              <button
                className="reject-btn"
                onClick={() => setShowInterviewModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
