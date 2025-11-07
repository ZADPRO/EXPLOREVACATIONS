import React from 'react';
import './HeroBanner.css';
import chickenImage from '../../assets/images/chicken.png';
import chilli1 from '../../assets/images/chilli1.png';
import offer from '../../assets/images/offer.png';
import chilli from '../../assets/images/chilli-shape-2.png'
const HeroBanner: React.FC = () => {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <p className="tagline">CRISPY, EVERY BITE TASTE</p>
        <h1 className="headline">
          AWESOME <br /> FRIEDCHIKEN
        </h1>
        <div className="bubble">
          <span>SAVE UPTO</span>
          <strong>50%</strong>
        </div>
      </div>
      <img src={offer} alt="Fried Chicken" className="hero1" />
      <img src={chilli} alt="Fried Chicken" className="hero" />
      <div className="hero-image-wrapper">
        <img src={chickenImage} alt="Fried Chicken" className="hero-chicken bounce" />
        <img src={chilli1} alt="Fried Chicken" className="her" />
         {/* <p className="food-label1">Todays's Best Deal</p> */}
      </div>
    </section>
  );
};

export default HeroBanner;
