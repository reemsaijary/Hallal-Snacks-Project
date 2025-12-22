import { useNavigate } from "react-router-dom";
import "../Styling/Home.css";
import heroImage from "../assets/Home.png";
import {FaHamburger, FaDrumstickBite, FaLeaf, FaStar, FaSmile, FaShippingFast,}
   from "react-icons/fa";
import { GiFrenchFries } from "react-icons/gi";
import { BiBadgeCheck } from "react-icons/bi";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <section className="hero-section">
        <img src={heroImage} alt="Halal Snacks" className="hero-img" />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Hallal Snacks</h1>
            <p>The best Sandwiches are always made with bread, cheese, and love</p>
            <button onClick={() => navigate("/menu")} className="hero-btn">
              View Menu
            </button>
          </div>
        </div>
      </section>
      <section className="offer-section">
        <h2>What We Offer</h2>
        <div className="offer-boxes">
          <div className="offer-card">
            <FaDrumstickBite className="offer-icon" />
            <h5>Chicken Burgers</h5>
          </div>
          <div className="offer-card">
            <FaHamburger className="offer-icon" />
            <h5>Beef Burgers</h5>
          </div>
          <div className="offer-card">
            <GiFrenchFries className="offer-icon" />
            <h5>Fries</h5>
          </div>
          <div className="offer-card">
            <FaHamburger className="offer-icon" />
            <h5>Sandwiches</h5>
          </div>
        </div>
      </section>
      <section className="choose-section">
        <h2>Why Choose Us</h2>
        <div className="choose-boxes">
          <div className="choose-card">
            <BiBadgeCheck className="choose-icon" />
            <h5>100% Halal</h5>
          </div>
          <div className="choose-card">
            <FaLeaf className="choose-icon" />
            <h5>Fresh Ingredients</h5>
          </div>
          <div className="choose-card">
            <FaStar className="choose-icon" />
            <h5>Best Quality</h5>
          </div>
          <div className="choose-card">
            <FaSmile className="choose-icon" />
            <h5>Friendly Service</h5>
          </div>
          <div className="choose-card">
            <FaShippingFast className="choose-icon" />
            <h5>Fast Delivery</h5>
          </div>
        </div>
      </section>
    </div>
  );

}
export default Home;

