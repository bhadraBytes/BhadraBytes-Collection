import React, { useEffect, useState } from 'react';
import { Product } from '../components';
import Loading from './Loading';
import { useLoading } from '../context/LoadingContext';
import { client } from '@/lib/client';

const BestSellers = ({ products }) => {
  const { startLoading, stopLoading } = useLoading();
  const [loading, setLoading] = useState(true);  // Add loading state
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        const bestSellersData = products ? products.filter((product) => product.bestSeller) : [];
        setBestSellers(bestSellersData);
      } catch (error) {
        console.error('Error loading best sellers data:', error);
      } finally {
        stopLoading();
        setLoading(false);  // Set loading to false after fetching
      }
    };

    fetchData();
  }, [products, startLoading, stopLoading]);

  return (
    <div>
      <div className="products-heading">
        <h2>Best Sellers</h2>
        <Loading style={{ display: loading ? 'flex' : 'none' }} />
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
  try {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);

    console.log('Fetched products:', products);

    return {
      props: { products },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { products: [] },
    };
  }
};

export default BestSellers;
