// src/components/HeroSection.jsx
import React from "react";
import "./animations.css";

export default function HeroSection({ title = "Cozy Corner Books", subtitle = "Interstellar Reads", cta = "Browse", onBrowse }) {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <h1 className="neon-title">{title}</h1>
        <p className="type-sub">{subtitle}</p>
        <div className="hero-cta">
          <button className="primary-cta" onClick={() => { if (onBrowse) onBrowse(); }}>{cta}</button>
          <button className="secondary-cta">Contact</button>
        </div>
      </div>
    </section>
  );
}
