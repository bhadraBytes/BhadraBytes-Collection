import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import styles from '../styles/Home.module.css'; // Import your CSS file

const HeroBanner = ({ heroBanner }) => {
  const [backgroundColor, setBackgroundColor] = useState('#ffff');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundColor(getRandomColor());
    }, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className={`hero-banner-container ${styles.heroBanner}`} style={{ backgroundColor }}>
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" />

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
