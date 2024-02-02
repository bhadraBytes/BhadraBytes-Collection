import React, { useEffect, useState } from 'react';
import { Product } from '../components';
import Loading from './Loading'; // Import the Loading component
import { useLoading } from '../context/LoadingContext'; // Import useLoading
import { client } from '@/lib/client';

const BestSellers = ({ products }) => {
  const { startLoading, stopLoading } = useLoading();
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        // Simulate some API call for best sellers
        const bestSellersData = products ? products.filter((product) => product.bestSeller) : [];
        setBestSellers(bestSellersData);
      } catch (error) {
        console.error('Error loading best sellers data:', error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, [products]);

  return (
    <div>
      <div className="products-heading">
        <h2>Best Sellers</h2>
        <Loading /> {/* Place the Loading component where you want it */}
      </div>
      {bestSellers.length > 0 ? (
        <div className="products-container">
          {bestSellers.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="app__center">No best-selling products available right now. Check back later!</p>
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

export default BestSellers;
