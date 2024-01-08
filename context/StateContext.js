import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

// StateContext.js

// ... (existing code)

// Function to clear wishlist data from local storage
const clearWishlistLocalStorage = () => {
  localStorage.removeItem("wishlist");
  setWishlistItems([]); // Update the local state as well
};

// ... (existing code)


export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const [wishlistItems, setWishlistItems] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  const updateCartInLocalStorage = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  // Function to update wishlist data in Local Storage
  const updateWishlistInLocalStorage = (wishlistData) => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistData));
  };

  useEffect(() => {
    // Load cart data from Local Storage on component mount
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCartItems(storedCart);
    }

    // Load wishlist data from Local Storage on component mount
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (storedWishlist) {
      setWishlistItems(storedWishlist);
    }
  }, []);

  const searchProducts = async (query) => {
    try {
      const response = await client.fetch(
        `
        *[_type == "product" && (name match $query || description match $query)] {
          _id,
          name,
          description
        }
      `,
        { query }
      );

      return response;
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
    }
  };

  const onAddToWishlist = (product) => {
    if (!wishlistItems.find((item) => item._id === product._id)) {
      const updatedWishlist = [...wishlistItems, { ...product }];
      setWishlistItems(updatedWishlist);
      updateWishlistInLocalStorage(updatedWishlist);
      toast.success(`${product.name} added to wishlist.`);
    } else {
      toast.error(`${product.name} is already in the wishlist.`);
    }
  };

  const onRemoveFromWishlist = (product) => {
    const newWishlistItems = wishlistItems.filter(
      (item) => item._id !== product._id
    );
    setWishlistItems(newWishlistItems);
    updateWishlistInLocalStorage(newWishlistItems);
    // toast.info(`${product.name} removed from wishlist.`);
  };

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
  
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
  
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });
  
      setCartItems(updatedCartItems);
      updateCartInLocalStorage(updatedCartItems);
    } else {
      const newCartItem = { ...product, quantity };
      setCartItems([...cartItems, newCartItem]);
      updateCartInLocalStorage([...cartItems, newCartItem]);
    }
  
    toast.success(`${quantity} ${product.name} added to the cart.`);
  };
  

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
  
    // Check if foundProduct is defined before accessing its properties
    if (foundProduct) {
      const newCartItems = cartItems.filter((item) => item._id !== product._id);
  
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct.price * foundProduct.quantity
      );
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
      );
      setCartItems(newCartItems);
      updateCartInLocalStorage(newCartItems);
    }
  };

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        wishlistItems,
        onAddToWishlist,
        onRemoveFromWishlist,
        showWishlist,
        setShowWishlist,
        searchProducts,
        clearWishlistLocalStorage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
