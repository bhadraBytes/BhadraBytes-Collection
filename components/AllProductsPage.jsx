// AllProductsPage.jsx
import React from "react";
import { Product } from "../components";

const AllProductsPage = ({ products }) => {
  return (
    <div>
      <div className="products-container">
        <div className="products-heading">
          <h2>Alll Products</h2>
          <p>Winter Collection New Modern Design</p>
        </div>
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
