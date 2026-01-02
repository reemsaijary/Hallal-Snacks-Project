import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import "../Styling/Cart.css";

const CheckoutModal = ({ show, onClose, cartItems, total, clearCart }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState("Pickup");
  const [address, setAddress] = useState("");
  if (!show) return null;
  const handleWhatsAppOrder = async (e) => { // Added async
    e.preventDefault();
    if (!name || !phone) {
      alert("Please enter your Name and Phone Number.");
      return;
    }
    if (orderType === "Delivery" && !address) {
      alert("Please enter a Delivery Address.");
      return;
    }

    // --- SAVE TO DATABASE START ---
    const user = JSON.parse(localStorage.getItem("hallal_user"));
    try {
      await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email || "Guest",
          items: cartItems,
          total: total
        }),
      });
    } catch (err) {
      console.error("History save failed, continuing to WhatsApp:", err);
    }
    // --- SAVE TO DATABASE END ---

    const phoneNumber = "96103675158"; 
    let message = "Hello please place my Order:\n\n";
    message += `Name: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Order Type: ${orderType}\n`;
    if (orderType === "Delivery") message += `Delivery Address:${address}\n`;
    message += "---  Order Details  ---\n";
    cartItems.forEach((item) => {
      message += ` ${item.name} ${item.quantity}x ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    message += `TOTAL: $${total.toFixed(2)}\n`;
    message += "\nPlease confirm the order is ready for preparation. Thank you!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");

    clearCart();
    onClose();
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-success">Finalize Your Order</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleWhatsAppOrder}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-bold">Your Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Phone Number</label>
                <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold d-block">Order Type</label>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" value="Pickup" checked={orderType === "Pickup"} onChange={() => setOrderType("Pickup")} />
                  <label className="form-check-label"> Pickup</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" value="Delivery" checked={orderType === "Delivery"} onChange={() => setOrderType("Delivery")} />
                  <label className="form-check-label"> Delivery</label>
                </div>
              </div>
              {orderType === "Delivery" && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Delivery Address</label>
                  <textarea className="form-control" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, Building, Floor/Apartment, Landmark" required />
                  <div className="form-text">Please be specific to ensure fast delivery.</div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-success">Send Order via WhatsApp (${total.toFixed(2)})</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function Cart() {
  const { cartItems, updateItemQuantity, removeItemFromCart, clearCart, calculateTotal } = useCart();
  const total = calculateTotal();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  return (
    <div className="cart-page container my-5">
      <h1 className="cart-title text-center mb-4">Your Order</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart-message text-center p-5">
          <p className="lead">Your cart is currently empty. Go grab some Hallal Snacks!</p>
          <a href="/menu" className="btn btn-warning mt-3">View Menu</a>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="cart-table-responsive">
              <table className="table cart-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Adjust</th>
                    <th className="text-end">Subtotal</th>
                    <th className="text-center">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.name}>
                      <td><span className="fw-bold me-2">{item.quantity} x</span>{item.name}</td>
                      <td className="text-center">${Number(item.price).toFixed(2)}</td>
                      <td className="text-center quantity-control">
                        <div className="input-group input-group-sm justify-content-center">
                          <button className="btn btn-outline-warning" onClick={() => updateItemQuantity(item.name, item.quantity - 1)} disabled={item.quantity <= 1}><FaMinus size={10} /></button>
                          <span className="form-control text-center quantity-display">{item.quantity}</span>
                          <button className="btn btn-outline-warning" onClick={() => updateItemQuantity(item.name, item.quantity + 1)}><FaPlus size={10} /></button>
                        </div>
                      </td>
                      <td className="text-end fw-bold">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
                      <td className="text-center">
                        <button className="btn btn-danger btn-sm" onClick={() => removeItemFromCart(item.name)}><FaTrash size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between mt-3"> 
              <button className="btn btn-secondary" onClick={clearCart}>Clear Cart</button> 
              <Link to="/menu" className="btn btn-warning">Add more from menu</Link>
            </div> 
          </div>
          <div className="col-lg-4">
            <div className="card order-summary-card p-4">
              <h4 className="card-title mb-3">Order Summary</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">Subtotal: <span>${total.toFixed(2)}</span></li>
                <li className="list-group-item d-flex justify-content-between align-items-center fw-bold text-warning">Estimated Tax: <span>$0.00</span></li>
                <li className="list-group-item d-flex justify-content-between align-items-center fw-bold fs-5 total-row">Total: <span>${total.toFixed(2)}</span></li>
              </ul>
              <button className="btn btn-success btn-lg mt-4 checkout-btn" onClick={() => setShowCheckoutModal(true)} disabled={cartItems.length === 0}>PROCEED TO WHATSAPP ORDER</button>
            </div>
          </div>
        </div>
      )}
      <CheckoutModal show={showCheckoutModal} onClose={() => setShowCheckoutModal(false)} cartItems={cartItems} total={total} clearCart={clearCart} />
    </div>
  );
}

export default Cart;