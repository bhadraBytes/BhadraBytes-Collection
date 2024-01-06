// components/Wishlist/Wishlist.jsx
import React from 'react';
import { useStateContext } from '../context/StateContext';
import { AiOutlineLeft } from "react-icons/ai";
import { FiShoppingCart  } from "react-icons/fi";
import { Product } from './';

const Wishlist = () => {
  const { wishlistItems, setShowWishlist, onRemoveFromWishlist, onAdd } = useStateContext();

  const handleMoveToCart = () => {
    // Assuming onAdd function adds items to the cart
    wishlistItems.forEach((item) => {
      onAdd(item, 1); // You might need to adjust the quantity as needed
      onRemoveFromWishlist(item); // Remove the item from the wishlist after adding to the cart
    });
    setShowWishlist(false); // Close the wishlist after moving items to the cart
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowWishlist(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Wishlist</span>
          <span className="cart-num-items">({wishlistItems.length} items)</span>
        </button>

        {wishlistItems.length < 1 && (
          <div className="empty-cart">
            <FiShoppingCart size={150} />
            <h3>Your wishlist is empty</h3>
            <button
              type="button"
              onClick={() => setShowWishlist(false)}
              className="btn"
            >
              Continue Shopping
            </button>
          </div>
        )}

        <div className="product-container">
          {wishlistItems.map((product) => (
            <Product key={product._id} product={product} onRemove={onRemoveFromWishlist} isWishlistItem />
          ))}
        </div>

        {wishlistItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={handleMoveToCart}
              >
                Move to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
