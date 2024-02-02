import React, { useEffect, useState } from 'react';
import Loading from './Loading'; // Import the Loading component
import { useLoading } from '../context/LoadingContext'; // Import useLoading
import { client } from '../lib/client';
import Product from '../components/Product';

const SetsPage = () => {
  const { startLoading, stopLoading } = useLoading();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        const query = '*[_type == "product"]';
        const response = await client.fetch(query);
        setProducts(response);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, []);

  const sets = products.filter((product) => product.category === 'SETS');

  return (
    <div>
      <div className="products-heading">
        <h2>Sets</h2>
      </div>
      <Loading /> {/* Place the Loading component where you want it */}
      {sets.length > 0 ? (
        <div className="products-container">
          {sets.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="app__center">No sets available right now. Check back later!</p>
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

export default SetsPage;
