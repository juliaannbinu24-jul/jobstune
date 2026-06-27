import React from "react";
import "./about.css";

export default function AboutUs() {
  return (
    <div className="about-container">

      {/* Header Section */}
      <header className="about-header">
        <h1 className="about-title">About Jobstune</h1>
        <p className="about-subtitle">
          Your personalized platform to simplify job search & hiring.
        </p>
      </header>

      {/* Who We Are */}
      <section className="about-section">
        <h2 className="section-title">Who We Are</h2>
        <p className="section-text">
          Jobstune is a modern job-matching platform designed to connect job 
          seekers with the right opportunities effortlessly. Our goal is to 
          simplify the hiring process by using technology that understands 
          skills, preferences, and individual career goals.
        </p>
      </section>

      {/* Mission */}
      <section className="about-section">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-text">
          To create a job ecosystem where every candidate finds the right role 
          and every company finds the right talent—quickly, easily, and 
          transparently.
        </p>
      </section>

      {/* What We Do */}
      <section className="about-section">
        <h2 className="section-title">What We Do</h2>
        <p className="section-text">
          • Provide personalized job recommendations <br />
          • Help companies discover the best candidates <br />
          • Offer resume screening tools <br />
          • Support students and freshers in preparing for placements <br />
          • Deliver job alerts, tests, and career resources
        </p>
      </section>

      {/* Team */}
      <section className="about-section">
        <h2 className="section-title">Our Team</h2>
        <p className="section-text">
          The Jobstune team consists of passionate developers, designers, and 
          career experts who are dedicated to making job search smarter and 
          simpler for everyone.
        </p>
      </section>

      <footer className="about-footer">
        © 2025 Jobstune. All rights reserved.
      </footer>

    </div>
  );
}
