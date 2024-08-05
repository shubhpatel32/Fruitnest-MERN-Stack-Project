import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext)
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [shopItems, setShopItems] = useState([]);
  const [token, setToken] = useState("");

  const incrementQuantity = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    if (token) {
      await axios.post("http://localhost:5000/api/add/cart", { itemId }, { headers: { token } });
    }
  }

  const decrementQuantity = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0 }))
    if (token) {
      await axios.post("http://localhost:5000/api/remove/cart", { itemId }, { headers: { token } });
    }
  }

  const addToCart = (fruit) => {
    setCartItems((prevItems) => {
      const existingQuantity = prevItems[fruit._id] || 0;
      return { ...prevItems, [fruit._id]: existingQuantity + 1 };
    });
  };


  const deleteFromCart = (id) => {
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

  const loadCartData = async (token) => {
    const response = await axios.post("http://localhost:5000/api/data/cart", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
      await getFruits();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        deleteFromCart,
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
