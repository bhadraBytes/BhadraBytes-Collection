import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { createClient } from "@sanity/client";
import { useAuth } from "../../lib/firebase/auth"; // Import Firebase authentication object
import Star from "../Star"; // Import the Star component

const sanityClient = createClient({
  projectId: "57eqepqo",
  dataset: "production",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

const ProductDetails = ({ product, products, reviews }) => {
  const router = useRouter();
  const { auth } = useAuth();
  const { image, name, details, price, discountPercentage } = product;
  const [index, setIndex] = useState(0);
  const {
    decQty,
    incQty,
    qty,
    onAdd,
    onAddToWishlist,
    setShowCart,
    setShowWishlist,
  } = useStateContext();

  // State to track review submission status
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // State for review form visibility
  const [showReviewForm, setShowReviewForm] = useState(false);

  // State for star rating
  const [rating, setRating] = useState(0);

  // Declare reviewFormStyles
  const reviewFormStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    backgroundColor: "#fff",
    padding: "30px",
    boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    maxWidth: "600px",
    width: "100%",
  };

  // State for user name and feedback
  const [userName, setUserName] = useState("");
  const [feedback, setFeedback] = useState("");

  // Get the current user ID
  const userId = auth?.currentUser?.uid || null;

  // Handle "Write a review" button click
  const handleWriteReview = () => {
    setShowReviewForm(true);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  // Handle star rating click
  const handleStarClick = (star) => {
    setRating(star);
  };

  // Handle cancel button click
  const handleCancel = () => {
    setShowReviewForm(false);
    document.body.style.overflow = "auto"; // Enable scrolling
    // Reset form values
    setRating(0);
    setUserName("");
    setFeedback("");
  };

  // Handle save button click
  const handleSave = async () => {
    // Check if user is authenticated
    const isAuthenticated = auth?.currentUser;

    // Check if already submitting review
    if (isSubmittingReview) {
      return;
    }

    // Set the flag to indicate review submission is in progress
    setIsSubmittingReview(true);

    // Check if authentication information is still loading
    if (auth.loading) {
      console.log("Authentication information is still loading. Please wait.");
      return;
    }

    if (!isAuthenticated) {
      // You can redirect the user to the login page or handle it as needed
      router.push("/login"); // Adjust the path accordingly
      return;
    }

    console.log("User is authenticated. Continue with the review submission.");

    try {
      // Save the review data to Sanity using your existing Sanity client
      await sanityClient.create({
        _type: "review", // Adjust based on your Sanity schema
        productName: name,
        productImage: image[index],
        rating,
        userName,
        feedback,
        userId,
      });

      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review to Sanity:", error);
      toast.error("Failed to submit the review. Please try again.");
    } finally {
      // Reset form values and close the review form
      setRating(0);
      setUserName("");
      setFeedback("");
      setShowReviewForm(false);
      document.body.style.overflow = "auto"; // Enable scrolling

      // Reset the flag after review submission is completed
      setIsSubmittingReview(false);
    }
  };

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

  const handleAddToWishlist = async () => {
    try {
      await onAddToWishlist(product);
      toast.success(`${name} added to wishlist.`);
    } catch (error) {
      setShowWishlist(false);
      toast.error(`${name} error from wishlist.`);
    }
  };

  const calculateDiscountedPrice = () => {
    if (price && discountPercentage) {
      const discountedPrice = Math.floor(
        price - (price * discountPercentage) / 100
      );
      return discountedPrice.toString(); // Convert to string for display
    }
    return null;
  };

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  // Get highest rated review
  const highestRatedReview =
    reviews.length > 0
      ? reviews.reduce(
          (maxReview, review) =>
            review.rating > maxReview.rating ? review : maxReview,
          reviews[0]
        )
      : null;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          {/* Display average rating and number of reviews on a new line */}
          <div className="rating-reviews">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= averageRating}
                onClick={() => handleStarClick(star)}
              />
            ))}
            <span className="average-rating">
              {averageRating} out of 5 stars ({reviews.length} reviews)
            </span>
          </div>
          <h4>Details: </h4>
          <p className="details">{details}</p>

          {price && discountPercentage && (
            <p>
              <span className="rsSign">₹</span>
              <span className="price">{calculateDiscountedPrice()}</span>
              <span className="inclusive-taxes"> Inclusive of all taxes</span>
            </p>
          )}

          {price && discountPercentage && (
            <p className="discounted-price">
              <span className="strikethrough">
                <span className="rsSign">₹</span>
                {price}
              </span>
              <span className="margin-save">Save</span>
              <span className="rsSign">₹</span>
              {calculateDiscountedPrice()}
              <span
                style={{ color: "red", fontWeight: "600" }}
              >{` ${discountPercentage}% off`}</span>
            </p>
          )}

          {!discountPercentage && price && (
            <p className="price">
              <span className="rsSign">₹</span>
              {price}
            </p>
          )}
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
          <div className="buttons">
            <button
              type="button"
              onClick={handleAddToWishlist}
              className="add-to-wishlist"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Banner Section */}
      <div className="reviews-banner">
        <h2>Reviews</h2>
        <p>What do you think about this product?</p>
        <button
          type="button"
          onClick={handleWriteReview}
          className="WriteReview"
        >
          Write a review
        </button>
      </div>

      {/* Review Form Section */}
      {showReviewForm && (
        <div className="review-form" style={reviewFormStyles}>
          <div className="main-text-form">
            <h2>Write a review</h2>
            <p>What do you think about this product?</p>
          </div>
          <img src={urlFor(image && image[index])} alt={name} />
          <h3>{name}</h3>
          {/* Your rating */}
          <div>
            <p>Your rating?</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= rating}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>

          <div className="formName">
            {/* User Name */}
            <input
              type="text"
              placeholder="Your Name / Enter Title"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="feedbackForm">
            {/* Feedback */}
            <textarea
              placeholder="Your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          {/* Cancel and Save Buttons */}
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      )}

      <h3 className="customer-reviews-text">
        CUSTOMER REVIEWS <span>({reviews.length})</span>
      </h3>
      <div className="customer-reviews">
        {reviews.length > 0 ? (
          reviews
            .slice()
            .sort((a, b) => b.rating - a.rating)
            .map((review) => (
              <div key={review._id} className="review-item">
                <h3>{review.userName}</h3>
                <p>{review.feedback}</p>
                {/* User rating */}
                <div className="user-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      filled={star <= review.rating}
                      // You can add onClick handler if needed
                    />
                  ))}
                </div>
                <p>{new Date(review._createdAt).toLocaleDateString("en-US")}</p>
              </div>
            ))
        ) : (
          <p className="app__center">No reviews available.</p>
        )}
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="maylike-products-container">
          {products.map((item, index) =>
            // Display only products from the same category
            item.category === product.category ? (
              <Product key={item._id} product={item} index={index} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const reviewsQuery = '*[_type == "review" && productName == $productName]';

  const product = await client.fetch(productQuery);
  const products = await client.fetch(productsQuery);
  const reviews = await client.fetch(reviewsQuery, {
    productName: product.name,
  });

  console.log(product);

  return {
    props: { products, product, reviews },
  };
};

export default ProductDetails;
