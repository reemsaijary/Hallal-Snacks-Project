import React, { useState } from "react";
import "../Styling/About.css";

function About() {
  const [glow, setGlow] = useState(false);

  const handleClick = () => {
    setGlow(true);
    setTimeout(() => setGlow(false), 800);
  };

  const features = [
    { icon: <img src="/assets/icons/fresh.png" alt=""/>, title: "Fresh Ingredients", desc: "Only the freshest vegetables, meats, and sauces." },
    { icon: <img src="/assets/icons/fast.png" alt=""/>, title: "Fast Delivery", desc: "Hot and delicious food delivered to your door." },
    { icon: <img src="/assets/icons/service.png" alt=""/>, title: "Friendly Service", desc: "We treat every customer like family." },
    { icon: <img src="/assets/icons/variety.png" alt=""/>, desc: "Burgers, sandwiches, fries – something for everyone!" },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <img src="/assets/About-imgs/about-bg.jpeg" alt="Hallal Snacks" className="hero-img" />
        <div className="hero-overlay">
          <h1 className="hero-title">Where There is Food There is Love</h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div
          className={`story-text ${glow ? "glow" : ""}`}
          onClick={handleClick}
        >
          <h2>About Hallal Snacks</h2>
          <p>
            At Hallal Snacks, every bite tells a story of freshness, care, and passion.
            We are more than just a restaurant – we are a place where flavor, quality,
            and heart come together. Join us for a tasty adventure every day from 12:00 PM to 2:00 AM.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <img src={feature.icon} alt={feature.title} />
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Opening Hours & Contact</h2>
        <p>Open from 12 PM to 12 AM every day</p>
        <p>
          Contact us:{" "}
          <a
            href="https://wa.me/96103675158"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-number"
          >
            +961 03 675 158
          </a>
        </p>
        <div className="social-links">
          <a href="https://www.instagram.com/hallalsnacks" target="_blank" rel="noopener noreferrer">
            <img src="/assets/icons/instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/@hallalsnacks26" target="_blank" rel="noopener noreferrer">
            <img src="/assets/icons/tiktok.png" alt="TikTok" />
          </a>
          <a href="https://www.facebook.com/@hallalsnacks" target="_blank" rel="noopener noreferrer">
            <img src="/assets/icons/facebook.png" alt="Facebook" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
