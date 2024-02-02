// pages/allproducts.js
import React from 'react';
import AllProductsPage from '../components/AllProductsPage';
import { client } from '../lib/client';

const AllProducts = ({ products }) => {
  return (
    <div>
      <AllProductsPage products={products} />
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

export default AllProducts;
