import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("cart", []);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const count = cartItems.length;

  const value = useMemo(
    () => ({ cartItems, addToCart, clearCart, count }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
