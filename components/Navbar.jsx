import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { TbSearch } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

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
            <div className="app__header-icon">
              <h3 className="search">Search</h3><TbSearch className="search-icon"/>
            </div>
            <div className="app__header-icon user">
              <FiUser />
            </div>
          </ul>
          <ul className="center">
            <li>Home</li>
            <li>All Products</li>
            <li>All Products</li>
            <li>All Products</li>
            <li>New Arrivals</li>
            <li>Tops</li>
            <li>Bottoms</li>
            <li>Dresses</li>
            <li>Sets</li>
          </ul>
          <div className="right">
              <div className="heart app__header-icon">
                <FaRegHeart />
              </div>
            <div 
              type="button"
              className="cart-icon"
              onClick={() => setShowCart(true)}
            >
              <h3 className="search">Cart</h3><AiOutlineShopping className="cart"/>
              <span className="cart-item-qty">{totalQuantities}</span>
            </div>

            {showCart && <Cart />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
