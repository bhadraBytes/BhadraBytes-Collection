// In the file searchProducts.js

import { client } from '../lib/client';

const searchProducts = async (query) => {
  try {
    const response = await client.fetch(`
      *[_type == "product" && (name match $query || description match $query)] {
        _id,
        name,
        description
      }
    `, { query });

    return response;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};

export default searchProducts;
