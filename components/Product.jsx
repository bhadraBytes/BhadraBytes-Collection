import React, { useState } from "react";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { toast } from "react-hot-toast";

const Product = ({
  product: { _id, image, name, slug, price },
  isWishlistItem,
  onClose,
  isSearchResult, // New prop to indicate if it's a search result
}) => {
  const { wishlistItems, onAddToWishlist, onRemoveFromWishlist, onRemove } =
    useStateContext();
  const [index, setIndex] = useState(0);

  const isProductInWishlist = wishlistItems.some((item) => item._id === _id);

  const handleToggleWishlist = () => {
    if (isProductInWishlist) {
      onRemoveFromWishlist({ _id, name, price, image, slug });
      toast.error(`${name} removed from wishlist.`);
    } else {
      onAddToWishlist({ _id, name, price, image, slug });
      toast.success(`${name} added to wishlist.`);
    }
  };

  return (
    <div className="product-card">
      {isSearchResult ? null : (
        // Only show heart icon if it's not a search result
        isProductInWishlist ? (
          <AiFillHeart onClick={handleToggleWishlist} className="wishlist-icon" />
        ) : (
          <AiOutlineHeart
            onClick={handleToggleWishlist}
            className="wishlist-icon"
          />
        )
      )}
      {slug && (
        <Link onClick={onClose} href={`/product/${slug.current}`}>
          {image && image[index] && image[index].asset ? (
            <img
              src={urlFor(image[index])
                .width(isSearchResult ? 180 : 250)
                .height(isSearchResult ? 180 : 250)
                .toString()}
              className="product-image"
              alt={name}
            />
          ) : (
            <div>No Image Available</div>
          )}
        </Link>
      )}
      <p className="product-name">{name}</p>
      {price && <p className="product-price">₹{price}</p>}
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
    </div>
  );
};

export default Product;
