import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#222" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={navbarBrandStyle}>
            TODO App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* Show Login when not logged in */}
              {!isLoggedIn && (
                <>
                <li className="nav-item">
                  <Link className="nav-link" to="/" style={navLinkStyle}>
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" style={navLinkStyle}>
                    Login
                  </Link>
                </li>
                </>
              )}

              {/* Show Logout when logged in */}
              {isLoggedIn && (
                <li className="nav-item">
                  <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                    style={logoutButtonStyle}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Custom Styles */}
      <style jsx>{`
        .nav-link:hover {
          color: #ff6f00 !important; /* Bright orange hover color */
        }

        .btn-danger:hover {
          background-color: #ff6f00;
          border-color: #ff6f00;
        }

        .nav-item:hover .nav-link {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

// Styling
const navbarBrandStyle = {
  color: "#ff6f00",
  fontWeight: "bold",
};

const navLinkStyle = {
  color: "#fff",
  transition: "color 0.3s ease",
};

const logoutButtonStyle = {
  backgroundColor: "#ff3e00",
  borderColor: "#ff3e00",
  color: "#fff",
  fontWeight: "bold",
  transition: "background-color 0.3s ease, border-color 0.3s ease",
};

export default Navbar;
