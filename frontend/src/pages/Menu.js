import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../Styling/Menu.css";

function Menu() {
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addItemToCart } = useCart();
  const navigate = useNavigate(); 
  const fallback = "/assets/Menu-items/placeholder.jpeg"

  useEffect(() => {
    document.body.style.backgroundImage = "url('/assets/home-bg1.jpeg')";
    axios.get("http://localhost:5000/api/products")
      .then((res) => {
        const grouped = res.data.reduce((acc, item) => {
          const cat = item.category || "Other";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
          return acc;
        }, {});
        
        setMenuData(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Database connection error:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (item) => {
    // Check if user is logged in
    const user = localStorage.getItem("hallal_user");

    if (!user) {
      // If not logged in, stop them here
      alert("Please login first to start ordering your Hallal Snacks items");
      navigate("/login");
      return;
    }
    // If logged in, proceed to add the snack
    addItemToCart({ ...item, imageUrl: item.image_url || fallback }, 1); 
    alert(`1 x ${item.name} added to cart!`); 
  };

  if (loading) {
    return (
      <div className="container text-center" style={{ marginTop: "150px" }}>
        <h3 className="text-warning">Loading Hallal Snacks Menu...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      {Object.keys(menuData).map((sectionKey) => (
        <div key={sectionKey} className="mb-5">
          <h2 className="mb-4 text-white">{sectionKey.split(/(?=[A-Z])/).join(" ")}</h2> 
          <div className="row justify-content-center">
            {menuData[sectionKey].map((item) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4" key={item.id}>
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-img-top img-clickable"
                    style={{
                      backgroundImage: `url(${item.image_url || fallback})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedImage(item.image_url || fallback)}
                    role="button"
                    aria-label={`View ${item.name}`}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text" style={{ fontSize: "0.9rem", color: "#666" }}>
                      {item.ingredients}
                    </p>
                    <p className="card-text fw-bold text-dark mt-auto">
                      ${Number(item.price).toFixed(2)}
                    </p>
                    <div className="d-flex mt-2">
                      <button 
                        className="btn btn-warning flex-grow-1 fw-bold"
                        onClick={() => handleAddToCart(item)}
                      > 
                       Add to Cart 
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Image Popup Modal */}
      {selectedImage && (
        <div className="image-popup" onClick={() => setSelectedImage(null)}>
          <div className="popup-overlay" />
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setSelectedImage(null)}>✕</button>
            <img src={selectedImage} alt="Full view" className="popup-image" />
          </div>
        </div>
      )}
    </div>
  );
}
export default Menu;