import React from 'react';
import Link from 'next/link';
import { AiOutlineHeart } from 'react-icons/ai';
import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <AiOutlineHeart className="wishlist-icon" />
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">₹{price}</p>
          {/* <div className="size-dropdown">
            <label htmlFor="size">Size:</label>
            <select id="size">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div> */}
        </div>
      </Link>
    </div>
  );
};

export default Product;
