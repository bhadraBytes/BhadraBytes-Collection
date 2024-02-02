import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart, AiFillStar } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { toast } from "react-hot-toast";
import DiscountBanner from "./DiscountBanner";

const Product = ({
  product: {
    _id,
    image,
    name,
    slug,
    price,
    discountPercentage,
    details,
    averageRating,
  },
  isWishlistItem,
  onClose,
  isSearchResult,
  index,
}) => {
  const { wishlistItems, onAddToWishlist, onRemoveFromWishlist, onRemove } =
    useStateContext();
  const [currentIndex, setIndex] = useState(0);

  const isProductInWishlist = wishlistItems.some((item) => item._id === _id);

  const handleToggleWishlist = () => {
    if (isProductInWishlist) {
      onRemoveFromWishlist({ _id, name, price, image, slug });
    } else {
      onAddToWishlist({ _id, name, price, image, slug });
    }
  };

  const truncateText = (text, maxCharacters) => {
    if (!text) {
      return "";
    }

    if (text.length > maxCharacters) {
      return text.slice(0, maxCharacters) + "...";
    }

    return text;
  };

  const calculateDiscountedPrice = () => {
    if (price && discountPercentage) {
      const discountedPrice = Math.floor(
        price - (price * discountPercentage) / 100
      );
      return discountedPrice.toString();
    }
    return null;
  };

  return (
    <div className="product-card">
      {isSearchResult ? null : (
        <div className="wishlist-container">
          {isProductInWishlist ? (
            <AiFillHeart
              onClick={handleToggleWishlist}
              className="wishlist-icon"
            />
          ) : (
            <AiOutlineHeart
              onClick={handleToggleWishlist}
              className="wishlist-icon"
            />
          )}
        </div>
      )}
      {slug && (
        <Link onClick={onClose} href={`/product/${slug.current}`}>
          <div className="product-image-container">
            {image && image[currentIndex] && image[currentIndex].asset ? (
              <div>
                {/* Display the rating badge */}
                {averageRating && (
                  <div className="rating-badge">
                    <span>{averageRating.toFixed(1)}</span>
                    <span><AiFillStar /></span>
                  </div>
                )}
                <img
                  src={urlFor(image[currentIndex])
                    .width(isSearchResult ? 180 : 350)
                    .height(isSearchResult ? 180 : 350)
                    .toString()}
                  className="product-image"
                  alt={name}
                />
              </div>
            ) : (
              <div>No Image Available</div>
            )}
            {discountPercentage && (
              <div className="discount-box">
                <p>{discountPercentage}% off</p>
              </div>
            )}
          </div>
        </Link>
      )}
      <p className="product-name" style={{ overflowWrap: "break-word" }}>
        {truncateText(name, 25)}
      </p>
      <p className="product-desc" style={{ overflowWrap: "break-word" }}>
        {truncateText(details, 50)}
      </p>

      {price && discountPercentage && (
        <p className="product-price">
          <span className="rsSign">₹</span>
          {calculateDiscountedPrice()}
          <span className="strikethrough">
            <span className="rsSign">₹</span>
            {price}
          </span>
          <span
            className="discoutnPercent"
            style={{ color: "red", fontWeight: "600" }}
          >{` ${discountPercentage}% off`}</span>
        </p>
      )}

      {!discountPercentage && price && (
        <p className="product-price">
          <span className="rsSign">₹</span>
          {price}
        </p>
      )}

      {isWishlistItem && (
        <button
          type="button"
          className="remove-item"
          onClick={() =>
            onRemoveFromWishlist({ _id, name, price, image, slug })
          }
        >
          <TiDeleteOutline />
        </button>
      )}

      {/* Conditionally render the banner based on your requirement */}
      {/* <DiscountBanner /> */}
    </div>
  );
};

export default Product;
