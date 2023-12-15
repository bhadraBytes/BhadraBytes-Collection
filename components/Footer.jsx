import React from 'react';
import { AiFillInstagram, AiFillGithub} from 'react-icons/ai';


const Footer = () => {
  const openSocialMediaLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="footer-container">
      <p>2022 BhadraBytes-Collection All rights reserverd</p>
      <p className="icons">
        <div onClick={() => openSocialMediaLink("https://www.instagram.com/_yash_bhadra_/")}>
        <AiFillInstagram />
        </div>
        <div onClick={() => openSocialMediaLink("https://github.com/bhadraBytes")}>
        <AiFillGithub />
        </div>
      </p>
    </div>
  )
}

export default Footer