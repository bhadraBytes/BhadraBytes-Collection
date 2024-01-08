import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";
import Product from "./Product";
import { client } from "@/lib/client";
import { urlFor } from "@/lib/client";
import { FiSearch, FiX } from "react-icons/fi"; // Import search and close icons

const Search = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchProducts } = useStateContext();
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false); // New state for no results

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const results = await client.fetch(
        `
        *[_type == "product" && (name match $query || description match $query)] {
          _id,
          name,
          details,
          slug,
          image,
        }
      `,
        { query: searchQuery }
      );

      if (results.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error in search:", error);
    }
  };

  return (
    <div className="search-container">
      <button className="close-btn" onClick={onClose}>
        <FiX />
      </button>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="icon-hover app__header-icon search-btn"
        >
          <FiSearch />
        </button>
      </form>

      <div className="search-results">
        {noResults ? (
          <p>No matching products found.</p>
        ) : (
          searchResults.map((product) => (
            <Product
              key={product._id}
              product={product}
              onClose={onClose}
              isSearchResult={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
