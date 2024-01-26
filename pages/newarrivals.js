// pages/newarrivals.js
import React from "react";
import { Product } from "../components";
import { client } from "@/lib/client";

const NewArrivalsPage = ({ products }) => {
  const newArrivals = products.filter(
    (product) => product.category === "NEW ARRIVALS"
  );

  return (
    <div>
      <div className="products-heading">
        <h2>New Arrivals</h2>
      </div>
      {newArrivals.length > 0 ? (
        <div className="products-container">
          {newArrivals.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="app__center">
          No new arrivals right now. Check back later!
        </p>
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

export default NewArrivalsPage;
