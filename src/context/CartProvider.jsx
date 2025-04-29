import React, { useMemo, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("cart", []);

  const addToCart = useCallback(
    (item) => {
      setCartItems((prev) => [...prev, item]);
    },
    [setCartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const count = cartItems.length;

  const value = useMemo(
    () => ({ cartItems, addToCart, clearCart, count }),
    [cartItems, addToCart, clearCart, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
