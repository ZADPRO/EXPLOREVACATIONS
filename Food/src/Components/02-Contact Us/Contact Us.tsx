import React from 'react';
import './Contact Us.css'; 
import bg from '../../assets/Contact/contact.jpg';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
const Contact: React.FC = () => {
  return (
     <>
      <div className="contact-section" style={{ backgroundImage: `url(${bg})` }}>
        <div className="contact-content">
          <h1>CONTACT</h1>
          <h3>Cooking the Dishes<br /> with Care & Craft</h3>
        </div>
      </div>

      <div className="contact-main">
        <div className="contact-left">
          <h2>GET IN TOUCH</h2>
          <p></p>
          
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125042.27043136791!2d78.05589379539336!3d11.65389151185905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1ccf52cba0b%3A0xee9989007068ca47!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1753784811636!5m2!1sen!2sin" width="600" height="450" loading="lazy" ></iframe>
        </div>
<div className="contact-right">
          <h2>FILL UP THE FORM</h2>
          <p>Your email address will not be published. Required fields are marked *</p>
          <form className="contact-form">
            <div className="form-group">
              <InputText placeholder="Your Name*" className="w-full" required/>
            </div>

            <div className="form-group">
              <InputText type="email" placeholder="Email Address*" className="w-full" required/>
            </div>

            <div className="form-group">
              <InputTextarea placeholder="Enter Your Message Here" rows={5} className="w-full" required/>
            </div>

            <Button type="button" label="Send Message" className="form-submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
