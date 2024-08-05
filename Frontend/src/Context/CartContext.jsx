import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext)
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [shopItems, setShopItems] = useState([]);

  const incrementQuantity = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
  }

  const decrementQuantity = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0 }))
  }

  const addToCart = (fruit) => {
    setCartItems((prevItems) => {
      const existingQuantity = prevItems[fruit._id] || 0;
      return { ...prevItems, [fruit._id]: existingQuantity + 1 };
    });
  };


  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const filteredEntries = Object.entries(prevItems).filter(([key]) => key !== id);

      return Object.fromEntries(filteredEntries);
    });
  };


  const emptyCart = () => {
    setCartItems({});
  };


  const getFruits = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/fruit", {
        method: "GET",
      })

      if (response.ok) {
        const fruits = await response.json();
        console.log("fruits:", fruits);
        setShopItems(fruits);
      }
    } catch (error) {
      console.error("Error fetching fruits:", error);
    }
  }

  useEffect(() => {
    getFruits();
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        emptyCart,
        shopItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
