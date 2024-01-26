// pages/tops.js
import React from "react";
import { Product } from "../components";
import { client } from "@/lib/client";

const TopsPage = ({ products }) => {
  const tops = products.filter((product) => product.category === "TOPS");

  return (
    <div>
      <div className="products-heading">
        <h2>Tops</h2>
      </div>
      {tops.length > 0 ? (
        <div className="products-container">
          {tops.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="app__center">No tops available right now. Check back later!</p>
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

export default TopsPage;
