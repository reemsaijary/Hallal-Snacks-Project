
import React, { useState } from "react";
import "../Styling/Menu.css";
import menuData from "../Data/MenuData"; 

// Helper to dynamically load images 
const importAll = (r) => {
  let images = {};
  r.keys().forEach((key) => {
    const name = key.replace("./", "").replace(/\.(jpe?g|png|webp)$/i, "").toLowerCase();
    images[name] = r(key).default || r(key);
  });
  return images;
};

const chickenImages = importAll(require.context("../assets/Menu-items/ChickenBurger", false, /\.(jpe?g|png|webp)$/));
const beefImages = importAll(require.context("../assets/Menu-items/BeefBurger", false, /\.(jpe?g|png|webp)$/));
const sandwichImages = importAll(require.context("../assets/Menu-items/Sandwiches", false, /\.(jpe?g|png|webp)$/));
const friesImages = importAll(require.context("../assets/Menu-items/Fries", false, /\.(jpe?g|png|webp)$/));

const fallback = "/assets/Menu-items/placeholder.jpeg";

function Menu() {
  const [quantities, setQuantities] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleQuantityChange = (itemName, value) => {
    setQuantities({ ...quantities, [itemName]: value < 1 ? 1 : value });
  };

  const getImage = (section, itemName) => {
    const key = itemName.toLowerCase().replace(/ /g, "-");
    if (section === "ChickenBurger") return chickenImages[key] || fallback;
    if (section === "BeefBurger") return beefImages[key] || fallback;
    if (section === "Sandwiches") return sandwichImages[key] || fallback;
    if (section === "Fries") return friesImages[key] || fallback;
    return fallback;
  };

  const openImage = (section, itemName) => {
    const src = getImage(section, itemName);
    setSelectedImage(src);
  };

  const closePopup = () => setSelectedImage(null);

  return (
    <div className="container">
      {Object.keys(menuData).map((sectionKey) => (
        <div key={sectionKey} className="mb-5">
          <h2 className="mb-4">
           {sectionKey.split(/(?=[A-Z])/).join(" ")}
           </h2>
          <div className="row justify-content-center">
            {menuData[sectionKey].map((item, idx) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4" key={idx}>
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-img-top img-clickable"
                    style={{
                      backgroundImage: `url(${getImage(sectionKey, item.name)})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                      cursor: "pointer",
                    }}
                    onClick={() => openImage(sectionKey, item.name)}
                    role="button"
                    aria-label={`View ${item.name}`}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.ingredients}</p>
                    <p className="card-text fw-bold">${Number(item.price).toFixed(2)}</p>
                    <div className="d-flex mb-2">
                      <input
                        type="number"
                        min="1"
                        className="form-control me-2"
                        style={{ width: "80px" }}
                        value={quantities[item.name] || 1}
                        onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value || 1))}
                      />
                      <button className="btn btn-warning flex-grow-1">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Image popup/lightbox */}
      {selectedImage && (
        <div className="image-popup" onClick={closePopup} role="dialog" aria-modal="true">
          <div className="popup-overlay" />
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup} aria-label="Close">✕</button>
            <img src={selectedImage} alt="Full view" className="popup-image" />
          </div>
        </div>
      )}
    </div>
  );
}
export default Menu;