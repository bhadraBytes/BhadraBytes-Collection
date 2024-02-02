import React, { useEffect, useState } from 'react';
import Loading from './Loading'; // Import the Loading component
import { useLoading } from '../context/LoadingContext'; // Import useLoading
import { client } from '../lib/client';
import Product from '../components/Product';

const TopsPage = () => {
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

  const tops = products.filter((product) => product.category === 'TOPS');

  return (
    <div>
      <div className="products-heading">
        <h2>Tops</h2>
      </div>
      <Loading /> {/* Place the Loading component where you want it */}
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
