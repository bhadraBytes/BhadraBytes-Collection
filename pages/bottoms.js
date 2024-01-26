// pages/bottoms.js
import React from "react";
import { Product } from "../components";
import { client } from "@/lib/client";

const BottomsPage = ({ products }) => {
  const bottoms = products.filter((product) => product.category === "BOTTOMS");

  return (
    <div>
      <div className="products-heading">
        <h2>Bottoms</h2>
      </div>
      {bottoms.length > 0 ? (
        <div className="products-container">
          {bottoms.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="app__center">No bottoms available right now. Check back later!</p>
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

export default BottomsPage;
