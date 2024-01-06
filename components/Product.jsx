// components/Product.jsx
import React from 'react';
import Link from 'next/link';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import { toast } from 'react-hot-toast';

const Product = ({ product: { _id, image, name, slug, price }, onRemove, isWishlistItem }) => {
  const { wishlistItems, onAddToWishlist, onRemoveFromWishlist } = useStateContext();

  const isProductInWishlist = wishlistItems.some(item => item._id === _id);

  const handleToggleWishlist = () => {
    if (isProductInWishlist) {
      onRemove({ _id, name, price, image, slug });
      toast.info(`${name} removed from wishlist.`);
    } else {
      onAddToWishlist({ _id, name, price, image, slug });
      toast.success(`${name} added to wishlist.`);
    }
  };

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          {/* Heart icon to add/remove from wishlist */}
          {isProductInWishlist ? (
            <AiFillHeart onClick={handleToggleWishlist} className="wishlist-icon" />
          ) : (
            <AiOutlineHeart onClick={handleToggleWishlist} className="wishlist-icon" />
          )}
          {/* Product image */}
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          {/* Product details */}
          <p className="product-name">{name}</p>
          <p className="product-price">₹{price}</p>
          {/* Remove button for wishlist */}
          {isWishlistItem && (
            <button
              type="button"
              className="remove-item"
              onClick={() => onRemove({ _id, name, price, image, slug })}
            >
              Remove
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Product;
