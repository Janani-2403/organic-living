import React from "react";
import "../styles/about.css";
import whyChooseImg from "../assets/about-why-choose.webp";


export default function About() {
  return (
    <section className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-text">
          <h1>
            About <span>Organic</span> Living
          </h1>
          <p>
            We’re passionate about connecting people with nature through clean,
            healthy, and sustainable food. Every bite tells a story of care,
            purity, and respect for the Earth.
          </p>
        </div>

        <div className="hero-image">
          {/* 🌿 Using Unsplash image instead of local file */}
         <img
           src={whyChooseImg}
           alt="Organic farm"
           loading="lazy"
         />
        </div>
      </div>

      {/* Mission Section */}
      <div className="about-section">
        <h2>Our Mission 🌱</h2>
        <p>
          To make organic living an everyday choice — supporting local farmers,
          reducing our carbon footprint, and ensuring everyone has access to
          chemical-free food that nourishes both body and soul.
        </p>
      </div>

      {/* Core Values */}
      <div className="values-grid">
        <div className="value-card">
          <h3>🌾 Sustainability</h3>
          <p>
            We follow a zero-waste approach — from biodegradable packaging to
            carbon-neutral delivery methods, helping protect our planet for
            future generations.
          </p>
        </div>

        <div className="value-card">
          <h3>🤝 Local Partnerships</h3>
          <p>
            Our products come directly from small, trusted farmers who share our
            passion for ethical, chemical-free, and eco-friendly farming
            practices.
          </p>
        </div>

        <div className="value-card">
          <h3>💚 Transparency</h3>
          <p>
            Every product is traceable — you can know where your food is grown,
            how it’s harvested, and who made it possible with complete
            honesty and care.
          </p>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="about-footer">
        <h2>“Good food starts with good soil.” 🌿</h2>
        <p>Join us in making the world greener, one meal at a time.</p>
      </div>
    </section>
  );
}
