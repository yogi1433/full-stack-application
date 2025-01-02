import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginSignup from "./LoginSignup";
import HomePage from "./Homepage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  useEffect(() => {
    // Check if there is a saved logged-in user in localStorage
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user); // Set the logged-in user from localStorage
    }
    setIsLoading(false); // Mark loading as complete
  }, []);

  const handleLogin = (username) => {
    setLoggedInUser(username);
    localStorage.setItem("loggedInUser", username); // Save to localStorage
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser"); // Remove from localStorage
  };

  if (isLoading) {
    return <div>Loading...</div>; // Optional: Add a loading spinner or placeholder
  }

  return (
    <Router>
      <div>
        <Routes>
          {/* HomePage Route */}
          <Route
            path="/"
            element={
              loggedInUser ? (
                <HomePage username={loggedInUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" /> // Redirect to login if not logged in
              )
            }
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={<LoginSignup onLogin={handleLogin} />}
          />

          {/* Signup Route */}
          <Route
            path="/signup"
            element={<LoginSignup onLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
