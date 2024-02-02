import React from 'react';
import { client } from '../lib/client';
import HeroBanner from '../components/HeroBanner';
import FooterBanner from '../components/FooterBanner';
import DiscountBanner from '../components/DiscountBanner';
import HighestRatedPage from './HighestRatedPage';
import BestSellers from './bestsellers';  // Import BestSellers component
import { getHighestRatedProducts } from '../lib/rating';

const Home = ({ bannerData, highestRatedProducts, bestSellerProducts }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

    <div className="products-heading">
      <h2>Highest Rated Products</h2>
      {/* Additional content if needed */}
    </div>

    {/* Display highest-rated products */}
    <HighestRatedPage highestRatedProducts={highestRatedProducts} />

    {/* Display DiscountBanner component below highest-rated products */}
    <DiscountBanner />

    {/* Display first four latest best seller products */}
    <BestSellers products={bestSellerProducts} />

    {bannerData && bannerData.length > 0 && <FooterBanner footerBanner={bannerData[0]} />}
  </div>
);

export const getServerSideProps = async () => {
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  // Fetch all reviews
  const reviewsQuery = '*[_type == "review"]';
  const reviews = await client.fetch(reviewsQuery);

  // Fetch all products
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  // Use the getHighestRatedProducts function to filter highest-rated products
  const highestRatedProducts = getHighestRatedProducts(products, reviews);

  // Sort highest-rated products by rating in descending order
  highestRatedProducts.sort((a, b) => b.averageRating - a.averageRating);

  // Sort products by date to get the latest ones
  products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Get the first four best seller products
  const bestSellerProducts = products.filter((product) => product.bestSeller).slice(0, 4);

  return {
    props: { bannerData, highestRatedProducts, bestSellerProducts },
  };
};

export default Home;
