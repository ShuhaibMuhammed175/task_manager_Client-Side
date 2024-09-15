import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../user/AuthContext";
import "./css/navbar.css";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);

  const createTask = () => {
    navigate("/create-task");
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>Task Manager</h1>
        </div>
        <div className="navbar-menu">
          {user ? (
            <>
              <span className="navbar-username">
                <FaUserAlt className="user-icon" /> {user.username}
              </span>
              <button className="navbar-button logout-btn" onClick={createTask}>
                Add Task
              </button>

              <button
                className="navbar-button logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <span className="navbar-username">
              <button
                className="navbar-button logout-btn"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="navbar-button logout-btn"
                onClick={handleRegister}
              >
                Register
              </button>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
