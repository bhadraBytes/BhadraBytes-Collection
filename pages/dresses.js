// pages/dresses.js
import React from "react";
import { Product } from "../components";
import { client } from "@/lib/client";

const DressesPage = ({ products }) => {
  const dresses = products.filter((product) => product.category === "DRESSES");

  return (
    <div>
      <div className="products-heading">
        <h2>Dresses</h2>
      </div>
      {dresses.length > 0 ? (
        <div className="products-container">
          {dresses.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="app__center">No dresses available right now. Check back later!</p>
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

export default DressesPage;
