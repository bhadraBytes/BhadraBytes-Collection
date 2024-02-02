// DiscountBanner.jsx
import React from "react";

const DiscountBanner = () => {
  return (
    <section id="banner" className="section-m1">
      <h4
        data-aos="slide-up"
        data-aos-duration="800"
        data-aos-delay=""
        data-aos-easing="linear"
      >
        Sale Is Live
      </h4>
      <h2
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay=""
        data-aos-easing="ease"
      >
        Upto <span>70% Off</span>- All T-Shirts & Accessories
      </h2>
      <button
        className="normal"
        data-aos="fade"
        data-aos-duration="800"
        data-aos-delay=""
        data-aos-easing="linear"
      >
        Explore More
      </button>
    </section>
  );
};

export default DiscountBanner;
