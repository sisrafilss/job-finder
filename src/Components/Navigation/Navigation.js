import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
  const { user, logOut } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          TechJobs
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>

            {user?.email ? (
              <button
                onClick={logOut}
                style={{ outline: 0, border: 0, borderRadius: "3px" }}
              >
                LogOut
              </button>
            ) : (
              <li className="nav-item fitpal-nav-item me-4">
                <Link className="nav-link topic login-btn" to="/login">
                  Login
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
