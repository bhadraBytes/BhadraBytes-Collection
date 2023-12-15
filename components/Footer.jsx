import React from 'react';
import { AiFillInstagram, AiFillGithub } from 'react-icons/ai';
import CustomerSupport from './CustomerSupport';

const Footer = () => {
  const openSocialMediaLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="footer-container">
      <p>2022 BhadraBytes-Collection All rights reserved</p>
      <div className="icons">
        <div className='s-icon' onClick={() => openSocialMediaLink("https://www.instagram.com/_yash_bhadra_/")}>
          <AiFillInstagram />
        </div>
        <div className='s-icon' onClick={() => openSocialMediaLink("https://github.com/bhadraBytes")}>
          <AiFillGithub />
        </div>
        {/* Include the CustomerSupport component */}
        <CustomerSupport />
      </div>
    </div>
  );
};

export default Footer;
