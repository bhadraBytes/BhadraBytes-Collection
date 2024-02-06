import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const FooterBanner = ({ footerBanners }) => {
  console.log('FooterBanners Data:', footerBanners);

  if (!footerBanners || footerBanners.length === 0) {
    console.log('No data received for FooterBanners');
    return null;
  }

  const renderImage = (imageField) => {
    console.log('Image Field:', imageField);

    if (imageField && imageField.asset) {
      console.log('Image Asset:', imageField.asset);

      return (
        <img
          src={urlFor(imageField.asset)
            .width(350)
            .height(350)
            .toString()}
          alt={imageField.title}
        />
      );
    }
    return null;
  };

  return (
    <div>
      {footerBanners.map((banner, index) => (
        <section key={index} className={`section-p1`}>
          <div
            className={`banner-box banner-box${index + 1}`}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-easing="linear"
          >
            {renderImage(banner.image)}
            <h4>{banner.title}</h4>
            <h2>{banner.largeText}</h2>
            <span>{banner.midText}</span>
            {banner.link && (
              <button className="Promotion">
                <Link href={banner.link}>{banner.buttonText}</Link>
              </button>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default FooterBanner;
