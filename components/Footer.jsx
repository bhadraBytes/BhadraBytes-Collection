import React from "react";
import Link from "next/link";
import { AiFillInstagram, AiFillGithub } from "react-icons/ai";
import { FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import CustomerSupport from "./CustomerSupport";

const Footer = () => {
  return (
    <footer>
      <section id="newsletter" class="section-p1 section-m1">
        <div class="newstext">
          <h4>SignUp For NewsLetters</h4>
          <p>
            Get E-mail Updates About Our Latest <span>Special Offers</span>
          </p>
        </div>
        <div class="form">
          <input type="email" name="" id="" placeholder="Your Email Address" />
          <button class="normal">SignUp</button>
        </div>
      </section>
      <div className="footer-logo section-p1">
        <Link href="/">
          <img src="../bhadrabytes.png" alt="bhadrabytes" />
        </Link>
      </div>
      <div className="footer-container section-p1">
        <div className="footer-section main-menu">
          <h4>MAIN MENU</h4>
          <ul>
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/">all product</Link>
            </li>
            <li>
              <Link href="/best-sellers">BEST SELLERS</Link>
            </li>
            <li>
              <Link href="/new-arrivals">NEW ARRIVALS</Link>
            </li>
            <li>
              <Link href="/tops">TOPS</Link>
            </li>
            <li>
              <Link href="/bottoms">BOTTOMS</Link>
            </li>
            <li>
              <Link href="/dresses">DRESSES</Link>
            </li>
            <li>
              <Link href="/sets">SETS</Link>
            </li>
            <li>
              <Link href="/one-pieces">ONE-PIECES</Link>
            </li>
            <li>
              <Link href="/one-pieces">About Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section about-section">
          <h4>Shop</h4>
          <ul>
            <li>
              <Link href="/about">ABOUT Us</Link>
            </li>
            <li>
              <Link href="/shop">SHOP All product</Link>
            </li>
            <li>
              <Link href="/shop">Bottoms</Link>
            </li>
            <li>
              <Link href="/shop">Dressess</Link>
            </li>
            <li>
              <Link href="/shop">Tops</Link>
            </li>
            <li>
              <Link href="/shop">Sets</Link>
            </li>
            <li>
              <Link href="/shop">one pieces</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section customer-service">
          <h4>CUSTOMER SERVICE</h4>
          <ul>
            <li>
              <Link href="/customer-service">Contact Us</Link>
            </li>
            <li>
              <Link href="/customer-service">About Us</Link>
            </li>
            <li>
              <Link href="/shipping">SHIPPING</Link>
            </li>
            <li>
              <Link href="/exchanges-returns">EXCHANGES & RETURNS</Link>
            </li>
            <li>
              <Link href="/contact-us">CONTACT US</Link>
            </li>
            <li>
              <Link href="/privacy-policy">PRIVACY POLICY</Link>
            </li>
            <li>
              <Link href="/terms-of-service">TERMS OF SERVICE</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section blog-sidebar-menu">
          <h4>My Account</h4>
          <ul>
            <li>
              <Link href="/Articles">Login</Link>
            </li>
            <li>
              <Link href="/Articles">view cart</Link>
            </li>
            <li>
              <Link href="/Articles">My Wishlist</Link>
            </li>
            <li>
              <Link href="/Articles">Track my order</Link>
            </li>
            <li>
              <Link href="/Articles">Help</Link>
            </li>
          </ul>
        </div>
      </div>

      <p className="footer-p">© 2024 BhadraBytes, ALL RIGHTS RESERVED</p>
    </footer>
  );
};

export default Footer;
