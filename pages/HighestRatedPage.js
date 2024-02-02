import React, { useEffect, useState } from 'react';
import Loading from './Loading'; // Import the Loading component
import { useLoading } from '../context/LoadingContext'; // Import useLoading
import { client } from '../lib/client';
import Product from '../components/Product';
import { getHighestRatedProducts } from '../lib/rating'; // Adjust the path accordingly

const HighestRatedPage = () => {
  const { startLoading, stopLoading } = useLoading();
  const [highestRatedProducts, setHighestRatedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        const reviewsQuery = '*[_type == "review"]';
        const productsQuery = '*[_type == "product"]';

        const reviews = await client.fetch(reviewsQuery);
        const products = await client.fetch(productsQuery);

        const highestRatedData = getHighestRatedProducts(products, reviews);
        setHighestRatedProducts(highestRatedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, []);

  return (
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
      <Loading /> {/* Place the Loading component where you want it */}
    </div>
  );
};

export default HighestRatedPage;
