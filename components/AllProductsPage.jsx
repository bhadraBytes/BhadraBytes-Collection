import React, { useEffect, useState } from "react";
import { Product } from "../components";
import Loading from "../pages/Loading";  // Import the Loading component

const AllProductsPage = ({ products }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);  // Set loading to false when the component mounts
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="products-heading">
            <h2>All Products</h2>
            <p>Winter Collection New Modern Design</p>
          </div>
          <div className="products-container">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProductsPage;
