import React, { useEffect, useState } from 'react';
import { Product } from '../components';
import Loading from './Loading'; // Import the Loading component
import { useLoading } from '../context/LoadingContext'; // Import useLoading
import { client } from '@/lib/client';

const BottomsPage = ({ products }) => {
  const { startLoading, stopLoading } = useLoading();
  const [bottoms, setBottoms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        // Simulate some API call for bottoms
        const bottomsData = products ? products.filter((product) => product.category === 'BOTTOMS') : [];
        setBottoms(bottomsData);
      } catch (error) {
        console.error('Error loading bottoms data:', error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, [products]);

  return (
    <div>
      <div className="products-heading">
        <h2>Bottoms</h2>
        <Loading /> {/* Place the Loading component where you want it */}
      </div>
      {bottoms.length > 0 ? (
        <div className="products-container">
          {bottoms.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="app__center">No bottoms available right now. Check back later!</p>
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

export default BottomsPage;
