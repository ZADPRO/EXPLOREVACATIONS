import React from 'react';
import './About.css';
import chef1 from '../../assets/about/big-pizza.png';
import chef2 from '../../assets/about/grilled.png';
import chef3 from '../../assets/about/kfc.png';
import bg from '../../assets/Contact/contact.jpg';

const CookingSection: React.FC = () => {
  return (
    <>
      <div className="contact-section" style={{ backgroundImage: `url(${bg})` }}>
        <div className="contact-content">
          <h1>ABOUT</h1>
        </div>
      </div>
      <div className="about-container">
        <div className="about-images">
          <div className="img-row">
            <img
              src={chef1}
              alt="Chef 1"
              className="img-rounded img-animate"
              style={{ '--x': '-80px', '--y': '-40px' } as React.CSSProperties}
            />
            <img
              src={chef2}
              alt="Chef 2"
              className="img-rounded img-animate"
              style={{ '--x': '80px', '--y': '-40px' } as React.CSSProperties}
            />
          </div>
          <img
            src={chef3}
            alt="Chef 3"
            className="img-rounded img-bottom img-animate"
            style={{ '--x': '0px', '--y': '80px' } as React.CSSProperties}
          />
        </div>

        <div className="about-content animate-text">
          <h1>ABOUT OUR KITCHEN</h1>
          <h3>Cooking the Dishes<br /> with Care & Craft</h3>
          <ul>
            <li>✅ Fresh, handpicked ingredients with rich aroma</li>
            <li>✅ Expert marination and time-tested preparation methods</li>
            <li>✅ Balanced seasoning for perfect flavor</li>
            <li>✅ Hygienic cooking practices in a clean environment</li>
            <li>✅ Beautifully plated dishes to delight your senses</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CookingSection;
