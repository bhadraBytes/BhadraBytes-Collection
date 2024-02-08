import React from "react";

const DiscountBanner = ({ title, subtitle, discountPercentage }) => {
  const redirectToAllProducts = () => {
    window.location.href = "/allproducts";
  };

  return (
    <section id="banner" className="section-m1">
      <h4
        data-aos="slide-up"
        data-aos-duration="800"
        data-aos-delay=""
        data-aos-easing="linear"
      >
        {title}
      </h4>
      <h2
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay=""
        data-aos-easing="ease"
      >
        Upto <span>{discountPercentage}% Off</span> - {subtitle}
      </h2>
      <button
        className="normal"
        data-aos="fade"
        data-aos-duration="800"
        data-aos-delay=""
        data-aos-easing="linear"
        onClick={redirectToAllProducts}
      >
        Explore More
      </button>
    </section>
  );
};

export default DiscountBanner;
