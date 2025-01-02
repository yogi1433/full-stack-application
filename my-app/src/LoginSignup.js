import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./App.css";

function LoginSignup({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate(); // To navigate after successful login/signup

  const validateForm = () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return false;
    }
    if (!isLogin && password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const endpoint = isLogin ? "/api/login" : "/api/signup";
      const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Use an environment variable for easier config
      const response = await axios.post(`${baseUrl}${endpoint}`, {
        username,
        password,
      });

      if (response.data.success) {
        toast.success(`${isLogin ? "Login" : "Signup"} successful!`, {
          position: "top-right",
          autoClose: 3000, // Duration in milliseconds
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        if (isLogin) {
          onLogin(username); // Transition to HomePage
          navigate("/"); // Navigate to the home page
        } else {
          setIsLogin(true); // After signup, switch to login mode
          setUsername("");
          setPassword("");
        }
      } else {
        setError(response.data.message || "An error occurred.");
        toast.error(response.data.message || "An error occurred.", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <h1>{isLogin ? "Login" : "Signup"} Page</h1>
      <form
        onSubmit={handleSubmit}
        className={`form-container ${isLogin ? "login" : "signup"}`} // Conditional animation class
      >
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        <button className="button-submit" type="submit">
          {isLogin ? "Login" : "Signup"}
        </button>
        <p className="toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin); // Toggle between login and signup
              setUsername(""); // Clear username
              setPassword(""); // Clear password
              setError(""); // Clear error messages
            }}>
            {isLogin ? (
              <Link to="/signup">Signup</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginSignup;
