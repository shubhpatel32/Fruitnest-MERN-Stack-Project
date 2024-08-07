import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from 'react-toastify';
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
      await axios.post("http://localhost:5000/api/cart/add", { itemId }, { headers: { token } });
    }
  }

  const decrementQuantity = async (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] > 1) {
        newCartItems[itemId] -= 1;
      } else {
        delete newCartItems[itemId];
      }
      return newCartItems;
    });

    if (token) {
      await axios.post("http://localhost:5000/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const totalPrice = (cartItems, shopItems) => {
    return Object.keys(cartItems).reduce((acc, itemId) => {
      const item = shopItems.find((fruit) => fruit._id === itemId);
      if (item) {
        acc += item.price * cartItems[itemId];
      }
      return acc;
    }, 0);
  };


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    if (token) {
      const response = await axios.post("http://localhost:5000/api/cart/add", { itemId }, { headers: { token } });
      console.log("ressss", response)

      if (response.data.success) {
        toast.success("Added to Cart")
      }
      else {
        toast.error("Failed to add to cart")
      }
    }
  };


  const deleteFromCart = async (itemId) => {
    setCartItems((prevItems) => {
      const newCartItems = { ...prevItems };
      delete newCartItems[itemId];
      return newCartItems;
    });

    if (token) {
      const response = await axios.post("http://localhost:5000/api/cart/delete", { itemId }, { headers: { token } });

      if (response.data.success) {
        toast.success("Deleted from Cart")
      }
      else {
        toast.error("Failed to delete from cart")
      }
    }
  };

  const emptyCart = () => {
    setCartItems({});
  };


  const getFruits = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/fruit/data", {
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
    const response = await axios.post("http://localhost:5000/api/cart/data", {}, { headers: { token } });
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
        shopItems,
        totalPrice,
        token
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
