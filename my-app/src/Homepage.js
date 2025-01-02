import React from "react";
import "./homepage.css";

function HomePage({ username, onLogout }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <div>
          <h1>LINUX-AWS-DevOps-Automation</h1>
          <br />
          <h1>Welcome, {username}!</h1>
        </div>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main className="home-content">
        <div className="card">
          <h2>Profile</h2>
          <p>View and edit your personal details.</p>
        </div>
        <div className="card">
          <h2>Dashboard</h2>
          <p>Check your activities and insights here.</p>
        </div>
        <div className="card">
          <h2>Settings</h2>
          <p>Manage your preferences and privacy.</p>
        </div>
      </main>
      <footer className="home-footer">
        <p>© 2025 DevOps. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
