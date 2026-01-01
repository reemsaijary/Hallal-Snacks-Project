import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext"; 

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null); 
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Check for logged-in user
    const checkUser = () => {
      const savedUser = localStorage.getItem("hallal_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    // Re-check whenever the window focuses 
    window.addEventListener('focus', checkUser);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('focus', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hallal_user"); //
    setUser(null); 
    navigate("/"); // Send back to home
  };

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
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/menu">Menu</Link></li>
            
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

            {/* --- CLEAN LOGOUT LOGIC --- */}
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/OrderHistory">Orders</Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link" 
                    onClick={handleLogout}
                    style={{ 
                      background: "none",
                      border: "none",
                      color: "#bbb",
                      textTransform: "uppercase",
                      fontWeight: "500",
                      cursor: "pointer"
                    }}
                    onMouseOver={(e) => e.target.style.color = "#ff6600"}
                    onMouseOut={(e) => e.target.style.color = "#bbb"}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;