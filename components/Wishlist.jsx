// components/Wishlist/Wishlist.jsx
import React from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";
import { AiOutlineLeft } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { Product } from "./";
import { urlFor } from "@/lib/client";

const Wishlist = () => {
  const {
    wishlistItems,
    setShowWishlist,
    onRemoveFromWishlist,
    onAdd,
    setWishlistItems,
  } = useStateContext();

  const handleMoveToCart = () => {
    wishlistItems.forEach((item) => {
      onAdd(item, 1); // You might need to adjust the quantity as needed
    });

    // Remove all items from the wishlist after adding to the cart
    setWishlistItems([]);

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
          {wishlistItems.length >= 1 &&
            wishlistItems.map((item) => (
              <div className="product" key={item._id}>
                <Link href={`/product/${item.slug.current}`}>
                  <img
                    src={urlFor(item?.image[0])}
                    className="cart-product-image"
                  />
                </Link>
                <div className="item-desc">
                  <div className="flex top">
                    <h5>
                      <Link href={`/product/${item.slug.current}`}>
                        {item.name}
                      </Link>
                    </h5>
                    <h4>₹{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemoveFromWishlist(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {wishlistItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleMoveToCart}>
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
