// pages/sets.js
import React from "react";
import { Product } from "../components";
import { client } from "@/lib/client";

const SetsPage = ({ products }) => {
  const sets = products.filter((product) => product.category === "SETS");

  return (
    <div>
      <div className="products-heading">
        <h2>Sets</h2>
      </div>
      {sets.length > 0 ? (
        <div className="products-container">
          {sets.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="app__center">No sets available right now. Check back later!</p>
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

export default SetsPage;
