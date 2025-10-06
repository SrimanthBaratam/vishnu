import React, { memo } from "react";
import "./Home.css";

const DashboardCard = memo(({ icon, label, value, color }) => (
  <div className="dashboard-card">
    <div className={`card-icon ${color}`}>{icon}</div>
    <p className="card-label">{label}</p>
    <p className="card-value">{value}</p>
  </div>
));

const Home = memo(() => {
  // Removed unused handleLogout function to fix the compile error

  const host = localStorage.getItem("host");

  return (
    <div className="home-container">
     
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-grid">
            <div className="hero-text">
              <h2>Welcome  {host}</h2>
              <div className="hero-badge">
                <span className="badge-icon">❤️</span>
                <span>Healthcare Innovation</span>
              </div>
              <h1 className="hero-title">
                Advanced Healthcare
                <span className="hero-gradient-text"> Data Management</span>
              </h1>
              <p className="hero-description">
                HDIMS revolutionizes healthcare with secure, intelligent patient data management, 
                streamlined workflows, and comprehensive healthcare solutions.
              </p>
              <div className="hero-buttons">
                <a href="/health-data" className="btn btn-primary">
                  <span className="btn-icon">👤</span>
                  Manage Patients <span className="btn-arrow">→</span>
                </a>
                <a href="/about" className="btn btn-outline">Learn More</a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="dashboard-preview">
                <div className="dashboard-grid">
                  <div className="dashboard-col">
                    <DashboardCard icon="🩺" label="Medical Records" value="Secure" color="" />
                    <DashboardCard icon="📊" label="Patient Status" value="Active" color="green" />
                  </div>
                  <div className="dashboard-col">
                    <DashboardCard icon="❤️" label="Care Quality" value="Premium" color="red" />
                    <DashboardCard icon="🛡️" label="Data Security" value="HIPAA" color="yellow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Home;
