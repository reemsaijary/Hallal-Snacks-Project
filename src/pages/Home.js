import React from "react";
import "../Styling/Home.css";

function Home() {
  return (
    <section className="home-section">
      {/* Overlay div */}
      <div className="home-overlay"></div>

      {/* Content div */}
      <div className="home-content text-center">
        <h1 className="home-title">Welcome to Hallal Snacks</h1>
        <p className="home-subtitle">Fresh, Fast, and Hallal</p>
        <a href="#menu" className="btn btn-warning btn-lg mt-3 fw-bold">
          Order Now
        </a>
      </div>
    </section>
  );
}

export default Home;
