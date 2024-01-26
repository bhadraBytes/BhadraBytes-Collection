// pages/onepieces.js
import React from "react";
import { Product } from "../components";
import { client } from "@/lib/client";

const OnePiecesPage = ({ products }) => {
  const onePieces = products.filter(
    (product) => product.category === "ONE-PIECES"
  );

  return (
    <div>
      <div className="products-heading">
        <h2>One Pieces</h2>
      </div>
      {onePieces.length > 0 ? (
        <div className="products-container">
          {onePieces.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="app__center">
          No one-pieces available right now. Check back later!
        </p>
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

export default OnePiecesPage;
