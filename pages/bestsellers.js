// pages/bestsellers.js

import React from "react";
import { Product } from "../components";
import { client } from "@/lib/client";

const BestSellers = ({ products }) => {
  // Filter out only the best-selling products
  const bestSellers = products.filter((product) => product.bestSeller);

  return (
    <div>
      <div className="products-heading">
        <h2>Best Sellers</h2>
      </div>
      <div className="products-container">
        {bestSellers.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
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
