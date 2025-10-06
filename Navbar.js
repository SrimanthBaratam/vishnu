import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Phone, Database, LogOut } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if current page is login or signup
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  // Links to show on non-auth pages
  const navLinks = [
    {
      label: "Home",
      to: "/home",
      icon: <Home size={16} strokeWidth={1.8} />,
    },
    {
      label: "Health Data",
      to: "/health-data",
      icon: <Database size={16} strokeWidth={1.8} />,
    },
    {
      label: "About Us",
      to: "/about",
      icon: <Users size={16} strokeWidth={1.8} />,
    },
    {
      label: "Contact",
      to: "/contact",
      icon: <Phone size={16} strokeWidth={1.8} />,
    },
  ];

  const handleLogout = () => {
    // Clear any authentication tokens or session data here
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="nav-root">
      <div className="nav-brand">
        <span className="nav-logo">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <rect width="44" height="44" rx="12" fill="#2563eb" />
            <path
              d="M29.7 16.5c-1.9 0-3.74 1.17-5 2.85C23.04 17.67 21.21 16.5 19.3 16.5c-2.77 0-5 2.11-5 5 0 2.53 2.1 5.2 6.75 8.95.92.77 2.03.77 2.95 0 4.65-3.75 6.75-6.42 6.75-8.95 0-2.89-2.23-5-5-5z"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </span>
        <div>
          <span className="nav-title">HDIMS</span>
          <div className="nav-subtitle">Healthcare Data &amp; Information Management</div>
        </div>
      </div>

      {/* Show navigation links and logout button only if not on login/signup pages */}
      {!isAuthPage && (
        <>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link-btn${location.pathname === link.to ? " nav-link-active" : ""}`}
                >
                  <span className="nav-link-icon">{link.icon}</span>
                  <span style={{ fontSize: "0.97rem", fontWeight: 500 }}>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-buttons">
            <button className="nav-btn nav-btn-logout" onClick={handleLogout}>
              <LogOut size={16} strokeWidth={1.8} />
              <span style={{ marginLeft: "5px" }}>Logout</span>
            </button>
          </div>
        </>
      )}

      {/* Show Login/Signup buttons only on login/signup pages */}
      {isAuthPage && (
        <div className="nav-buttons">
          <Link to="/login" className="nav-btn nav-btn-login">
            Login
          </Link>
          <Link to="/signup" className="nav-btn nav-btn-signup">
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}
