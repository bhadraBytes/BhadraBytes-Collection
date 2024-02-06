import React from "react";
import Link from "next/link";
import { useAuth } from "../lib/firebase/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast"; // Import the toast library

const Footer = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/"); // Navigate to the home page
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Error logging out:", error.message);
      toast.error("Error logging out. Please try again.");
    }
  };
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
              <Link href="/allproducts">all product</Link>
            </li>
            <li>
              <Link href="/bestsellers">BEST SELLERS</Link>
            </li>
            <li>
              <Link href="/newarrivals">NEW ARRIVALS</Link>
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
              <Link href="/onepieces">ONE-PIECES</Link>
            </li>
            <li>
              <Link href="/aboutus">About Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section about-section">
          <h4>Shop</h4>
          <ul>
            <li>
              <Link href="/aboutus">ABOUT Us</Link>
            </li>
            <li>
              <Link href="/allproducts">SHOP All product</Link>
            </li>
            <li>
              <Link href="/bottoms">Bottoms</Link>
            </li>
            <li>
              <Link href="/dresses">Dressess</Link>
            </li>
            <li>
              <Link href="/tops">Tops</Link>
            </li>
            <li>
              <Link href="/sets">Sets</Link>
            </li>
            <li>
              <Link href="/onepieces">one pieces</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section customer-service">
          <h4>CUSTOMER SERVICE</h4>
          <ul>
            <li>
              <Link href="/">Contact Us</Link>
            </li>
            <li>
              <Link href="/aboutus">About Us</Link>
            </li>
            <li>
              <Link href="/shipping">SHIPPING</Link>
            </li>
            <li>
              <Link href="/exchangesreturns">EXCHANGES & RETURNS</Link>
            </li>
            <li>
              <Link href="/contactusform">CONTACT US</Link>
            </li>
            <li>
              <Link href="/privacypolicy">PRIVACY POLICY</Link>
            </li>
            <li>
              <Link href="/termsofservice">TERMS OF SERVICE</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section blog-sidebar-menu">
          <h4>My Account</h4>
          <ul>
            <li>
              {isLoggedIn ? (
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              ) : (
                <Link href="/login">Login</Link>
              )}
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
