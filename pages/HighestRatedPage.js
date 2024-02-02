// pages/HighestRatedPage.js
import React from "react";
import { client } from "../lib/client";
import Product from "../components/Product";
import { getHighestRatedProducts } from "../lib/rating"; // Adjust the path accordingly

const HighestRatedPage = ({ highestRatedProducts }) => (
  <div>

    <div className="products-container">
      {highestRatedProducts && highestRatedProducts.length > 0 ? (
        highestRatedProducts.map((product) => (
          <Product key={product._id} product={product} />
        ))
      ) : (
        <p className="app__center">No highest-rated products available.</p>
      )}
    </div>
  </div>
);

export const getServerSideProps = async () => {
  try {
    const reviewsQuery = '*[_type == "review"]';
    const productsQuery = '*[_type == "product"]';

    const reviews = await client.fetch(reviewsQuery);
    const products = await client.fetch(productsQuery);

    const highestRatedProducts = getHighestRatedProducts(products, reviews);

    return {
      props: { highestRatedProducts },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { highestRatedProducts: [] },
    };
  }
};

export default HighestRatedPage;
