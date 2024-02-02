// pages/bestsellers.js
import React from "react";
import { Product } from "../components";
import { client } from "@/lib/client";

const BestSellers = ({ products }) => {
  // Check if products is defined before filtering
  const bestSellers = products ? products.filter((product) => product.bestSeller) : [];

  return (
    <div>
      <div className="products-heading">
        <h2>Best Sellers</h2>
      </div>
      {bestSellers.length > 0 ? (
        <div className="products-container">
          {bestSellers.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="app__center">No best-selling products available right now. Check back later!</p>
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};

export default BestSellers;
