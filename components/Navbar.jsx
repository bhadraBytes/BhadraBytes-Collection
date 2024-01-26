import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { TbSearch } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Cart, Wishlist, Product, Search } from "./"; // Import the Search component
import searchProducts from "./"; // Adjust the path
import { useStateContext } from "../context/StateContext";
import { useAuth } from "../lib/firebase/auth";
import { useRouter } from "next/router";
import { client } from "../lib/client"; // Adjust the path to your client file

// ... (other imports)
const Navbar = () => {
  const router = useRouter();
  const { user } = useAuth();
  const {
    showCart,
    setShowCart,
    totalQuantities,
    showWishlist,
    setShowWishlist,
    wishlistItems, // Add wishlistItems
  } = useStateContext();
  const [showMenu, setShowMenu] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const handleSearchIconClick = () => {
    setShowSearch(true);
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const body = document.body;
    if (showMenu) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    // Cleanup: Reset the overflow property when the component is unmounted
    return () => {
      body.style.overflow = "auto";
    };
  }, [showMenu]);

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

            {/* <div className="app__header-icon">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <button type="submit">
                  <TbSearch className="icon-hover search-icon" />
                </button>
              </form>
            </div> */}

            <div className="app__header-icon" onClick={handleSearchIconClick}>
              <h3 className="search">Search</h3>
              <TbSearch className="icon-hover search-icon" />
            </div>

            {showSearch && <Search onClose={() => setShowSearch(false)} />}

            {/* <div className="search-results">
              {Array.isArray(searchResults) && searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              ) : (
                <p>No results found</p>
              )}
            </div> */}

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
                <Link
                  href="/"
                  className={router.pathname === "/" ? "active" : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/allproducts"
                  className={router.pathname === "/allproducts" ? "active" : ""}
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/bestsellers"
                  className={router.pathname === "/bestsellers" ? "active" : ""}
                >
                  BEST SELLERS
                </Link>
              </li>

              <li>
                <Link
                  href="/newarrivals"
                  className={router.pathname === "/newarrivals" ? "active" : ""}
                >
                  NEW ARRIVALS
                </Link>
              </li>
              <li>
                <Link
                  href="/tops"
                  className={router.pathname === "/tops" ? "active" : ""}
                >
                  TOPS
                </Link>
              </li>
              <li>
                <Link
                  href="/bottoms"
                  className={router.pathname === "/bottoms" ? "active" : ""}
                >
                  BOTTOMS
                </Link>
              </li>
              <li>
                <Link
                  href="/dresses"
                  className={router.pathname === "/dresses" ? "active" : ""}
                >
                  DRESSES
                </Link>
              </li>
              <li>
                <Link
                  href="/sets"
                  className={router.pathname === "/sets" ? "active" : ""}
                >
                  SETS
                </Link>
              </li>
              <li>
                <Link
                  href="/onepieces"
                  className={router.pathname === "/onepieces" ? "active" : ""}
                >
                  ONE-PIECES
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={router.pathname === "/about" ? "active" : ""}
                >
                  ABOUT US
                </Link>
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
              {wishlistItems.length > 0 && (
                <span className="wishlist-item-qty">
                  {wishlistItems.length}
                </span>
              )}
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
            <li>
              <Link
                onClick={() => {
                  handleMenuClose();
                }}
                href="/"
                className={router.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  handleMenuClose();
                }}
                href="/allproducts"
                className={router.pathname === "/allproducts" ? "active" : ""}
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  handleMenuClose();
                }}
                href="/bestsellers"
                className={router.pathname === "/bestsellers" ? "active" : ""}
              >
                Best Sellers
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  handleMenuClose();
                }}
                href="/newarrivals"
                className={router.pathname === "/newarrivals" ? "active" : ""}
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  handleMenuClose();
                }}
                href="/tops"
                className={router.pathname === "/tops" ? "active" : ""}
              >
                Tops
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  handleMenuClose();
                }}
                href="/bottoms"
                className={router.pathname === "/bottoms" ? "active" : ""}
              >
                Bottoms
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  handleMenuClose();
                }}
                href="/dresses"
                className={router.pathname === "/dresses" ? "active" : ""}
              >
                Dresses
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  handleMenuClose();
                }}
                href="/sets"
                className={router.pathname === "/sets" ? "active" : ""}
              >
                Sets
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  handleMenuClose();
                }}
                href="/onepieces"
                className={router.pathname === "/onepieces" ? "active" : ""}
              >
                One Pieces
              </Link>
            </li>
            {user ? (
              <div className="user-small" onClick={handleMenuClose}>
                <FaRegUserCircle className="user-small-icon" />
                <Link href="/UserDashboard">
                  {user.displayName?.split(" ")[0] || "User"}
                </Link>
              </div>
            ) : (
              <div className="user-small" onClick={handleMenuClose}>
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
