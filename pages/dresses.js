// DressesPage.jsx
import React, { useEffect,useState } from "react";
import { Product } from "../components";
import Loading from "./Loading";
import { useLoading } from "../context/LoadingContext"; // Import useLoading
import { client } from "@/lib/client";

const DressesPage = () => {
  const { startLoading, stopLoading } = useLoading(); // Use the hook

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading(); // Start loading
        const response = await client.fetch('*[_type == "product"]');
        setProducts(response);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        stopLoading(); // Stop loading
      }
    };

    fetchData();
  }, []);
  const dresses = products.filter((product) => product.category === "DRESSES");
  return (
    <div>
      <div className="products-heading">
        <h2>Dresses</h2>
      </div>
      <Loading /> {/* Use the Loading component */}
      {dresses.length > 0 ? (
        <div className="products-container">
          {dresses.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="app__center">
          No dresses available right now. Check back later!
        </p>
      )}
    </div>
  );
};

export default DressesPage;
