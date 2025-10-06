import React from "react";
import "./About.css";

const achievements = [
  { number: "2019", label: "Company Founded" },
  { number: "100+", label: "Healthcare Facilities" },
  { number: "500K+", label: "Patient Records Managed" },
  { number: "99.99%", label: "Data Security Rate" }
];

export default function About() {
  return (
    <div className="aboutpage">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div>
            <span className="about-badge">🏆 Healthcare Innovation Leaders</span>
            <h1>
              Revolutionizing <span className="about-highlight">Healthcare Management</span>
            </h1>
            <p>
              Since 2019, HDIMS has been at the forefront of healthcare technology, providing secure,
              efficient, and innovative solutions that transform how medical facilities manage patient data and operations.
            </p>
            <div className="about-achievements">
              {achievements.map((a, i) => (
                <div key={i} className="about-achievement">
                  <div className="about-ach-num">{a.number}</div>
                  <div className="about-ach-label">{a.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1576091160399-1125d25d1f?w=600&h=500"
              alt="Modern Healthcare Facility"
              className="about-hero-img"
            />
            <div className="about-hero-badge">
              🌍 <strong>Global Reach</strong>
              <span>Serving 15+ countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission-vision">
        <div className="about-mission">
          <h2>🎯 Our Mission</h2>
          <p>
            To empower healthcare providers with innovative, secure, and user-friendly technology solutions
            that improve patient outcomes, streamline operations, and advance the future of healthcare delivery.
          </p>
          <ul>
            <li>✔️ Enhance patient care through better data accessibility</li>
            <li>✔️ Reduce administrative burden on healthcare staff</li>
            <li>✔️ Ensure the highest standards of data security and privacy</li>
            <li>✔️ Drive innovation in healthcare technology</li>
          </ul>
        </div>
        <div className="about-vision">
          <h2>Our Vision</h2>
          <p>
            To be the global leader in healthcare management, creating a world where providers have instant,
            secure access to the information they need to deliver exceptional patient care.
          </p>
          <div className="about-vision-card">
            <h4>Looking Ahead to 2030</h4>
            <p>
              We envision a healthcare ecosystem where HDIMS powers seamless data exchange,
              predictive analytics drive preventive care, and every patient receives personalized,
              data-informed treatment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
