// AllProductsPage.jsx
import React from 'react';
import {  Product } from '../components';

const AllProductsPage = ({ products }) => {
  return (
    <div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
