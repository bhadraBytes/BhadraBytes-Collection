// ratings.js
export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  return averageRating.toFixed(1);
};

export const getHighestRatedProducts = (products, reviews, minRating = 3) => {
  const averageRatings = products.map((product) => {
    const productReviews = reviews.filter(
      (review) => review.productName === product.name.trim()
    );
    const averageRating = calculateAverageRating(productReviews);

    return {
      ...product,
      averageRating: parseFloat(averageRating),
    };
  });

  const highestRatedProducts = averageRatings.filter(
    (product) => product.averageRating >= minRating
  );

  return highestRatedProducts;
};
