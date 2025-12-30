import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext"; 

function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();//gets total of items nb cart from CartContext
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? "scrolled" : "transparent"}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/assets/logoo.jpeg" alt="Hallal Snacks Logo" width="80" height="80" className="me-2 rounded-circle"/>
          <span>Hallal Snacks</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/menu">Menu</Link></li>
            {/* Cart Link with Count */}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart size={20} className="me-1" />
                Cart
                {cartCount > 0 && (
                  <span className="badge rounded-pill bg-danger ms-1">
                    {cartCount}
                  </span>
                )}
                </Link>
            </li>
            <li className="nav-item">
    <Link className="nav-link" to="/login">Login</Link>
  </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;