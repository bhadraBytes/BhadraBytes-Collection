import React from "react";
import Link from "next/link";

const FooterBanner = () => {
  return (
    <div>
      {/* First Section: Two Banners */}
      <section id="sm-banner" className="section-p1">
        <div className="banner-box banner-box1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" data-aos-easing="linear">
          <h4>Crazy Deals</h4>
          <h2>Buy 1 Get 1 Free</h2>
          <span>The best Indian dress is on Sale at Livinum</span>
          <button className="Promotion">
            <Link href="/product1">Learn More</Link>
          </button>
        </div>
        <div className="banner-box banner-box2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" data-aos-easing="linear">
          <h4>Diwali Festival</h4>
          <h2>Upcoming Fashion</h2>
          <span>The best Indian dresses are on Sale at Livinum</span>
          <button className="Promotion">
            <Link href="/product2">Collection</Link>
          </button>
        </div>
      </section>

      {/* Second Section: Three Banners */}
      <section id="banner3">
        <div className="banner-box" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="" data-aos-easing="linear">
          <h2>Upcoming Sale</h2>
          <h3>Winter Sale Is Back, Get Discount Up to 50%</h3>
        </div>
        <div className="banner-box banner-box2" data-aos="fade-right" data-aos-duration="1500" data-aos-delay="" data-aos-easing="linear">
          <h2>Trendy Fashion</h2>
          <h3>New Trendy Prints</h3>
        </div>
        <div className="banner-box banner-box3" data-aos="fade-right" data-aos-duration="2000" data-aos-delay="" data-aos-easing="linear">
          <h2>Women's Sale</h2>
          <h3>Get Discount Up to 50%</h3>
        </div>
      </section>
    </div>
  );
};

export default FooterBanner;
