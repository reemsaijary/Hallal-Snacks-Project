import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const addItemToCart = (item, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.name === item.name);
      if (existingItem) {
        return prevItems.map(i =>
          i.name === item.name ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };
  const updateItemQuantity = (itemName, newQuantity) => {
    if (newQuantity < 1) {
      removeItemFromCart(itemName);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItemFromCart = (itemName) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== itemName));
  };
  
  const clearCart = () => {
    setCartItems([]);
  };
  // Calculate totals
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCart,
        calculateTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
