import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/Config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    () => JSON.parse(localStorage.getItem("authToken")) || null
  );
  const [user, setUser] = useState(() =>
    authToken ? jwtDecode(authToken.access) : null
  );
  const [userId, setUserId] = useState(() => (user ? user.user_id : null));
  const [errorMessage, setErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}register/`, userData);
      const data = response.data;
      console.log("Registered user", data);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("User with this email already exists");
      } else {
        setErrorMessage("An unexpected error occurred during registration");
      }
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}token/`, {
        email: e.target.email.value,
        password: e.target.password.value,
      });
      if (response.status === 200) {
        const data = response.data;
        console.log("logged in user", data);
        setAuthToken(data);
        const decodedToken = jwtDecode(data.access);
        setUser(decodedToken);
        setUserId(decodedToken.user_id);
        localStorage.setItem("authToken", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginErrorMessage("Invalid credentials");
      } else {
        setLoginErrorMessage("Login failed");
      }
    }
  };

  const logoutUser = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setAuthToken(null);
      setUser(null);
      setUserId(null);
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  const updateToken = async () => {
    try {
      const response = await axios.post(`${BASE_URL}token/refresh/`, {
        refresh: String(authToken.refresh),
      });
      if (response.status === 200) {
        const data = response.data;
        setAuthToken(data);
        const decodedToken = jwtDecode(data.access);
        setUser(decodedToken);
        setUserId(decodedToken.user_id);
        localStorage.setItem("authToken", JSON.stringify(data));
      } else {
        logoutUser();
      }
    } catch (error) {
      logoutUser();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, [authToken]);

  const contextData = {
    user,
    userId,
    registerUser,
    loginUser,
    logoutUser,
    updateToken,
    authToken,
    errorMessage,
    loginErrorMessage,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
