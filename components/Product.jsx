import React, { useState } from "react";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { toast } from "react-hot-toast";

const Product = ({
  product: { _id, image, name, slug, price, discountPercentage, details },
  isWishlistItem,
  onClose,
  isSearchResult,
  index, // Add the index prop to track the position of the product
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
              <img
                src={urlFor(image[currentIndex])
                  .width(isSearchResult ? 180 : 350)
                  .height(isSearchResult ? 180 : 350)
                  .toString()}
                className="product-image"
                alt={name}
              />
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
        {truncateText(details, 50)} {/* Adjust the maxCharacters as needed */}
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


      {/* Display the additional HTML section after the first 8 products */}
      {index === 8 && (
        <section id="banner" className="section-m1">
          <h4 data-aos="slide-up" data-aos-duration="800" data-aos-delay="" data-aos-easing="linear">Sale Is Live</h4>
          <h2 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="" data-aos-easing="ease">Upto <span>70% Off</span>- All T-Shirts & Accessories</h2>
          <button className="normal" data-aos="fade" data-aos-duration="800" data-aos-delay="" data-aos-easing="linear">Explore More</button>
        </section>
      )}
    </div>
  );
};

export default Product;
