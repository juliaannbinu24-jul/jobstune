import React from "react";
import "./help.css";

export default function HelpPage() {
  return (
    <div className="help-container">

      {/* Header */}
      <div className="help-header">
        <h1 className="help-title">Help & Support</h1>
        <p className="help-subtitle">
          We're here to assist you with anything you need.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="help-section">
        <h2 className="section-title">Frequently Asked Questions</h2>

        <div className="question-box">• How do I create an account?</div>
        <div className="question-box">• How do I apply for a job?</div>
        <div className="question-box">• Why am I not receiving job alerts?</div>
        <div className="question-box">• How do I update my profile?</div>
      </div>

      {/* Contact Support */}
      <div className="help-section">
        <h2 className="section-title">Contact Support</h2>
        <p className="section-text">
          If you need direct help, feel free to reach us anytime.
        </p>
        <p className="contact">📧 support@jobstune.com</p>
        <p className="contact">📞 +91 9446135380</p>
      </div>

      {/* Report Issue */}
      <div className="help-section">
        <h2 className="section-title">Report an Issue</h2>
        <p className="section-text">
          Found a bug or facing a problem? Let us know.
        </p>

        <button className="help-button">Report a Problem</button>
      </div>

      <p className="footer">© 2025 Jobstune. All rights reserved.</p>

    </div>
  );
}
