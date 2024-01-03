import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroBanner = () => {
  const carouselImages = [
    "https://www.boat-lifestyle.com/cdn/shop/articles/stone_banner.jpg?v=1633938266",
    "https://www.boat-lifestyle.com/cdn/shop/articles/Website-stone-banner_1000x.jpg?v=1659088009",
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/S/aplus-media/vc/ffd3e32d-76a5-4c1f-8ae8-68bcff20159b._CR0,0,970,300_PT0_SX970__.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleDotClick = (index) => {
    sliderRef.current.slickGoTo(index);
    setCurrentImageIndex(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Set autoplay interval to 5000 milliseconds (5 seconds)
  };

  // Update current image index on slide change
  const handleSlideChange = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    // Clear the interval when the component is unmounted or if the images change
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [carouselImages]);

  return (
    <div className="hero-banner-container">
      <Slider ref={sliderRef} {...settings} afterChange={handleSlideChange}>
        {carouselImages.map((image, index) => (
          <div key={index} className="carousel-image">
            <img src={image} alt={`carousel-image-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;
