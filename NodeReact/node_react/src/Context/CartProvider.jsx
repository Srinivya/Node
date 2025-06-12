import React, { useState } from "react";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const RemoveCart = (product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const handleIncrement = (product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === product.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addCart, RemoveCart, handleIncrement, handleDecrement }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
