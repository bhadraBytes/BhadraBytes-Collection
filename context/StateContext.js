import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { urlFor } from '@/lib/client';

const STORAGE_KEY = 'MyECommerceApp_data';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const [wishlistItems, setWishlistItems] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setCartItems(parsedData.cartItems || []);
      setTotalPrice(parsedData.totalPrice || 0);
      setTotalQuantities(parsedData.totalQuantities || 0);
      setWishlistItems(parsedData.wishlistItems || []);
    }
  }, []);

  // Save data to localStorage whenever there is a change
  useEffect(() => {
    const dataToSave = {
      cartItems,
      totalPrice,
      totalQuantities,
      wishlistItems,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [cartItems, totalPrice, totalQuantities, wishlistItems]);

  const searchProducts = async (query) => {
    // Your existing searchProducts function remains unchanged
  };

  const onAddToWishlist = (product) => {
    if (!wishlistItems.find((item) => item._id === product._id)) {
      setWishlistItems((prev) => [...prev, { ...product }]);
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
    toast.error(`${product.name} removed from wishlist.`);
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) =>
        cartProduct._id === product._id
          ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
          : cartProduct
      );

      setCartItems(updatedCartItems);
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity }]);
    }

    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);

    if (foundProduct) {
      const newCartItems = cartItems.filter(
        (item) => item._id !== product._id
      );

      setTotalPrice((prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
      );
      setTotalQuantities((prevTotalQuantities) =>
        prevTotalQuantities - foundProduct.quantity
      );
      setCartItems(newCartItems);
    }
  };

  const toggleCartItemQuanitity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);

    if (foundProduct) {
      const newCartItems = cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                value === 'inc' ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      );

      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) =>
        value === 'inc' ? prevTotalPrice + foundProduct.price : prevTotalPrice - foundProduct.price
      );
      setTotalQuantities((prevTotalQuantities) =>
        value === 'inc' ? prevTotalQuantities + 1 : prevTotalQuantities - 1
      );
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
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
        setWishlistItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
