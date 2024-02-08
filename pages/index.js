import React, { useEffect, useState } from "react";
import { client } from "../lib/client";
import HeroBanner from "../components/HeroBanner";
import FooterBanner from "../components/FooterBanner";
import DiscountBanner from "../components/DiscountBanner";
import HighestRatedPage from "./HighestRatedPage";
import BestSellers from "./bestsellers"; // Import BestSellers component
import Loading from "./Loading"; // Import the Loading component
import { getHighestRatedProducts } from "../lib/rating";

const Home = ({
  bannerData,
  highestRatedProducts,
  bestSellerProducts,
  discountBannerData,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Set loading to false when the component mounts
  }, []);

  // Check if discountBannerData is available before accessing its properties
  const discountBannerTitle = discountBannerData?.title || "";
  const discountBannerSubtitle = discountBannerData?.subtitle || "";
  const discountBannerPercentage = discountBannerData?.discountPercentage || 0;

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Highest Rated Products</h2>
        {/* Additional content if needed */}
      </div>

      {loading ? (
        <Loading />
      ) : (
        <HighestRatedPage highestRatedProducts={highestRatedProducts} />
      )}

      {/* Display DiscountBanner component below highest-rated products */}
      <DiscountBanner
        title={discountBannerTitle}
        subtitle={discountBannerSubtitle}
        discountPercentage={discountBannerPercentage}
      />  
      {/* Display first four latest best seller products */}
      <BestSellers products={bestSellerProducts} />

      {bannerData && bannerData.length > 0 && (
        <FooterBanner footerBanner={bannerData[0]} />
      )}
    </div>
  );
};

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

  // Fetch data for DiscountBanner
  const discountBannerQuery = '*[_type == "discountBanner"][0]'; // Assuming there is only one DiscountBanner
  const discountBannerData = await client.fetch(discountBannerQuery);

  // Get the first four best seller products
  const bestSellerProducts = products
    .filter((product) => product.bestSeller)
    .slice(0, 4);

  return {
    props: {
      bannerData,
      highestRatedProducts,
      bestSellerProducts,
      discountBannerData,
    },
  };
};

export default Home;
