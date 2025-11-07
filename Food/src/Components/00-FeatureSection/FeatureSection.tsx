import React from 'react';
import './FeatureSection.css';
import { FaHamburger, FaMortarPestle, FaMotorcycle, FaAppleAlt } from 'react-icons/fa';
import burgerImg from '../../assets/images/burger.png';


const features = [
  {
    icon: <FaHamburger />,
    title: 'SUPER QUALITY FOOD',
    description: 'Delicious meals made with care and premium ingredients.',
  },
  {
    icon: <FaMortarPestle />,
    title: 'ORIGINAL RECIPES',
    description: 'Hand-crafted recipes with a unique touch of creativity.',
  },
  {
    icon: <FaMotorcycle />,
    title: 'QUICK FAST DELIVERY',
    description: 'Lightning-fast delivery ensuring your food stays fresh.',
  },
  {
    icon: <FaAppleAlt />,
    title: '100% FRESH FOODS',
    description: 'Only the freshest and healthiest ingredients used.',
  },
];
// const features = {
//   primary: [
//     {
//       icon: <FaHamburger />,
//       title: 'SUPER QUALITY FOOD',
//       description: 'Delicious meals made with care and premium ingredients.',
//     },
//     {
//       icon: <FaMortarPestle />,
//       title: 'ORIGINAL RECIPES',
//       description: 'Hand-crafted recipes with a unique touch of creativity.',
//     },
//   ],  {features.secondary.map((item, index) => (
    // <div className="feature-box" key={`secondary-${index}`}></div>
//   secondary: [
//     {
//       icon: <FaMotorcycle />,
//       title: 'QUICK FAST DELIVERY',
//       description: 'Lightning-fast delivery ensuring your food stays fresh.',
//     },
//     {
//       icon: <FaAppleAlt />,
//       title: '100% FRESH FOODS',
//       description: 'Only the freshest and healthiest ingredients used.',
//     },
//   ],
// };

const FeatureSection: React.FC = () => {
  return (
    <div>
 
      <div className="feature-banner">
        <div className="feature-text">
          <p className="tagline">CRISPY, EVERY BITE TASTE</p>
          <h1 className="headline">SUPER<br />DELICIOUS</h1>
          <div className="offer-badge">50%<br /><span>OFF</span></div>
        </div>
        <div className="feature-image-wrapper">
          <img src={burgerImg} alt="Burger Combo" className="feature-image" />
          <p className="food-label">Burger</p>
        </div>
      </div>
{/* {features.primary.map((f,index)=> (<h3 key={`primary-${index}`}>{f.icon}</h3>))} */}
      <section className="feature-icons">
        {features.map((feature, index) => (
          <div className="feature-box" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
      
    </div>
  );
};

export default FeatureSection;
