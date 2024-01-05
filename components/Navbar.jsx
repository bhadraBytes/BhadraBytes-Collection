import React, { useState } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { TbSearch } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";
import { useAuth } from "../pages/firebase/auth";

const Navbar = () => {
  const { user } = useAuth();
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
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
          <img src="./assets/bhadrabytes.png" alt="" />
        </Link>
      </div>
      <div className="navbar-container">
        <div className="app__header">
          <ul className="left">
            <div className="menu-toggle" onClick={handleMenuToggle}>
              <div className={showMenu ? "bar bar1" : "bar"}></div>
              <div className={showMenu ? "bar bar2" : "bar"}></div>
              <div className={showMenu ? "bar bar3" : "bar"}></div>
            </div>
            <div className="app__header-icon">
              <h3 className="search">Search</h3>
              <TbSearch className="icon-hover search-icon" />
            </div>
            {user ? (
              <div className="app__header-icon user">
                <Link href="/UserDashboard">
                  {/* <FiUser className="icon-hover" /> */}
                  {user.displayName?.split(" ")[0] || "User"}
                </Link>
              </div>
            ) : (
              <div className="app__header-icon user">
                <Link href="/login">
                  <FiUser className="icon-hover" />
                </Link>
              </div>
            )}
          </ul>
          <div className="center-container">
            <ul className="center">
              <li>
                <a href="#">Home </a>
              </li>
              <li>
                <a href="#">All Products</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Headphones</a>
              </li>
              <li>
                <a href="#">DuoPods</a>
              </li>
              <li>
                <a href="#">Speaker</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
            <div className="small-logo">
              <Link href="/">
                <img src="./assets/bhadrabytes.png" alt="" />
              </Link>
            </div>
          </div>
          <div className="right">
            <div className="heart app__header-icon">
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
            {showCart && <Cart />}
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="mobile-menu">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">All Products</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
