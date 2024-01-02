import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { TbSearch } from "react-icons/tb";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <>
      <div className="anouncement-container">
        <p className="p-text">Sign up and get 20% off to your first order. Sign Up Now</p>
        <p className="p-text">Sign up and get 20% off to your first order. Sign Up Now</p>
        <p className="p-text">Sign up and get 20% off to your first order. Sign Up Now</p>
      </div>
      <div className="navbar-container">
        <div className="app__header">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li>About</li>
            <li>Contact Us</li>
          </ul>

          <p className="logo">
            <Link href="/">
              <img src="./assets/bhadrabytes.png" alt="" />
            </Link>
          </p>
          <div className="right">
            <TbSearch className="search-icon" />
            <button
              type="button"
              className="cart-icon"
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShopping />
              <span className="cart-item-qty">{totalQuantities}</span>
            </button>

            {showCart && <Cart />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
