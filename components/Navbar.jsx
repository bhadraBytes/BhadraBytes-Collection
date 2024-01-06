import React, { useState } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { TbSearch } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import { useAuth } from "../lib/firebase/auth";
import { useRouter } from "next/router";
import { Wishlist } from "./";

// ... (other imports)

const Navbar = () => {
  const router = useRouter();
  const { user } = useAuth();
  const {
    showCart,
    setShowCart,
    totalQuantities,
    showWishlist, // Add the showWishlist state
    setShowWishlist, // Add the setShowWishlist function
  } = useStateContext();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  return (
    <>
      <div className="anouncement-container">
        <p className="p-text">
          Sign up and get 20% off to your first order. Sign Up Now
        </p>
        <p className="p-text">
          Sign up and get 20% off to your first order. Sign Up Now
        </p>
        <p className="p-text">
          Sign up and get 20% off to your first order. Sign Up Now
        </p>
      </div>
      <div className="logo">
        <Link href="/">
          <img src="../bhadrabytes.png" alt="bhadrabytes" />
        </Link>
      </div>
      <div className="navbar-container">
        <div className="app__header">
          <ul className="left">
            <div
              className={`menu-toggle ${showMenu ? "change" : ""}`}
              onClick={handleMenuToggle}
            >
              <div className="bar bar1"></div>
              <div className="bar bar2"></div>
              <div className="bar bar3"></div>
            </div>

            <div className="app__header-icon">
              <h3 className="search">Search</h3>
              <TbSearch className="icon-hover search-icon" />
            </div>
            {user ? (
              <div className="userName">
                <Link href="/UserDashboard">
                  {user.displayName?.split(" ")[0] || "User"}
                </Link>
              </div>
            ) : (
              <div className="app__header-icon user">
                <Link href="/login">
                  <FaRegUserCircle className="icon-hover" />
                </Link>
              </div>
            )}
          </ul>
          <div className="center-container">
            <ul className="center">
              <li>
                <a href="/">Home </a>
              </li>
              <li>
                <a href="/allproducts">All Products</a>
              </li>
              <li>
                <a href="#">BEST SELLERS</a>
              </li>
              <li>
                <a href="#">NEW ARRIVALS</a>
              </li>
              <li>
                <a href="#">TOPS</a>
              </li>
              <li>
                <a href="#">BOTTOMS</a>
              </li>
              <li>
                <a href="#">DRESSES</a>
              </li>
              <li>
                <a href="#">SETS</a>
              </li>
              <li>
                <a href="#">ONE-PIECES</a>
              </li>
              <li>
                <a href="#">ABOUT US</a>
              </li>
            </ul>
            <div className="small-logo">
              <Link href="/">
                <img src="../bhadrabytes.png" alt="bhadrabytes" />
              </Link>
            </div>
          </div>
          <div className="right">
            <div
              className="heart app__header-icon"
              onClick={() => setShowWishlist(!showWishlist)} // Toggle wishlist visibility
            >
              <FaRegHeart className="icon-hover" />
            </div>
            <div
              type="button"
              className="cart-icon"
              onClick={() => setShowCart(true)}
            >
              <h3 className="search">Cart</h3>
              <FiShoppingCart className="cart" />
              <span className="cart-item-qty">{totalQuantities}</span>
            </div>
            {showWishlist && <Wishlist />}
            {showCart && <Cart />}
          </div>
        </div>
      </div>

      {showMenu && (
        <div className={`mobile-menu ${showMenu ? "show" : ""}`}>
          <ul>
            <li
              onClick={() => {
                handleMenuClose();
                router.push("/");
              }}
            >
              <a href="#">Home</a>
            </li>
            <li
              onClick={() => {
                handleMenuClose();
                router.push("/");
              }}
            >
              <a href="#">All Products</a>
            </li>
            <li
              onClick={() => {
                handleMenuClose();
                router.push("/contact");
              }}
            >
              <a href="#">Contact</a>
            </li>
            {user ? (
              <div className="user-small" onClick={handleMenuClose}>
                <FaRegUserCircle className="user-small-icon"/>
                <Link href="/UserDashboard">
                  {user.displayName?.split(" ")[0] || "User"}
                </Link>
              </div>
            ) : (
              <div className="user-small">
                <Link href="/login">
                  <FaRegUserCircle className="icon-hover" />
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
