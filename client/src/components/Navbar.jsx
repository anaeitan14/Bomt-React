import React from "react";
import instance from "../pages/axios-instance";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const URL = "/logout";
    const data = {
      email: localStorage.getItem("email"),
    };

    localStorage.clear();
    
    const response = await instance.post(URL, data);
    if (response.status === 200) {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand text-decoration-underline text-info" href="/profile">
          Signed in as {localStorage.getItem("email")}
        </a>
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
            <li className="nav-item">
              <a className="nav-link" href="/home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/queries">
                Queries
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logs">
                Logs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reports">
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/users">
                Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <button
                  style={{
                    background: "none",
                    color: "rgba(255, 255, 255, 0.55)",
                    border: "none",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
