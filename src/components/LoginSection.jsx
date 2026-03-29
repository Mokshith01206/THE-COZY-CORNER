// src/components/LoginSection.jsx
import React, { useState, useEffect } from "react";
import "./LoginSection.css";
import logo from "../assets/logo.png"; // ensure this exists

export default function LoginSection({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 250);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!username.trim()) {
      alert("Please enter a username (or use Quick Guest).");
      return;
    }
    if (typeof onLogin === "function") onLogin(username.trim());
  };

  const quickGuest = () => {
    const guest = "Guest_" + Math.floor(Math.random() * 1000);
    setUsername(guest);
    setPassword("");
    setTimeout(() => onLogin && onLogin(guest), 350);
  };

  const demoCreds = () => {
    setUsername("demo_user");
    setPassword("password123");
  };

  return (
    <section className="login-section">
      <div className={`login-card ${pulse ? "active" : ""}`}>
        <div className="login-left">
          <div className="logo-wrap">
            <img
              src={logo}
              alt="Cozy Logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='%230b0f12'/><text x='50%' y='50%' fill='%23fff' font-size='18' text-anchor='middle' dominant-baseline='middle'>The Cozy Corner</text></svg>";
              }}
            />
          </div>
          <h1>Welcome to The Cozy Corner</h1>
          <p className="muted">
            Sign in to browse & buy. Quick guest access available.
          </p>
        </div>

        <form className="login-right" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              name="username"
              type="text"
              placeholder="Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">Password</label>
            <div className="pass-row">
              <input
                id="login-password"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPass((s) => !s)}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="login-actions">
            <button type="submit" className="btn primary">
              Login
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={quickGuest}
            >
              Quick Guest
            </button>
            <button
              type="button"
              className="btn outline"
              onClick={demoCreds}
            >
              Demo creds
            </button>
          </div>

          <div className="tip">
            Tip: use <strong>Quick Guest</strong> to browse instantly. After
            login you can add books to cart.
          </div>
        </form>
      </div>
    </section>
  );
}
