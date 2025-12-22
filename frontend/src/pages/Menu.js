
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../Styling/Menu.css";
import MenuData from "../data/MenuData"; 
const importAll = (r) => {
  let images = {};
  r.keys().forEach((key) => {
    const baseName = key.replace("./", "").replace(/\.(jpe?g|png|webp)$/i, "");
    const normalizedName = baseName.toLowerCase().replace(/[^a-z0-9]/g, ''); 
    images[normalizedName] = r(key).default || r(key);
  });
  return images;
};

const chickenImages = importAll(require.context("../assets/Menu-items/ChickenBurger", false, /\.(jpe?g|png|webp)$/));
const beefImages = importAll(require.context("../assets/Menu-items/BeefBurger", false, /\.(jpe?g|png|webp)$/));
const sandwichImages = importAll(require.context("../assets/Menu-items/Sandwiches", false, /\.(jpe?g|png|webp)$/));
const friesImages = importAll(require.context("../assets/Menu-items/Fries", false, /\.(jpe?g|png|webp)$/));
const fallback = "/assets/Menu-items/placeholder.jpeg";
const getImage = (section, itemName) => {
  const keyName = itemName.toLowerCase().replace(/[^a-z0-9]/g, ''); 
  let imageSet;
  switch (section) {
    case "ChickenBurger": imageSet = chickenImages; break;
    case "BeefBurger": imageSet = beefImages; break;
    case "Sandwiches": imageSet = sandwichImages; break;
    case "Fries": imageSet = friesImages; break;
    default: return fallback; 
  }
  return imageSet.hasOwnProperty(keyName) ? imageSet[keyName] : fallback;
};
function Menu() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { addItemToCart } = useCart(); 
  const handleAddToCart = (item, sectionKey) => {
    const quantityToAdd = 1; 
    const imageUrl = getImage(sectionKey, item.name); 
    addItemToCart({ ...item, imageUrl, section: sectionKey }, quantityToAdd); 
    alert(`1 x ${item.name} added to cart!`); 
  };
  const openImage = (section, itemName) => {
    setSelectedImage(getImage(section, itemName));
  };
  const closePopup = () => setSelectedImage(null);
  return (
    <div className="container">
      {Object.keys(MenuData).map((sectionKey) => (
        <div key={sectionKey} className="mb-5">
          <h2 className="mb-4">
           {sectionKey.split(/(?=[A-Z])/).join(" ")}
           </h2>
          <div className="row justify-content-center">
            {MenuData[sectionKey].map((item, idx) => (
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
                      <button 
                         className="btn btn-warning flex-grow-1"
                         onClick={() => handleAddToCart(item, sectionKey)}> Add to Cart </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
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