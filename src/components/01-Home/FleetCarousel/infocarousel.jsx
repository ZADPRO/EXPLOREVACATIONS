import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../../assets/Home1/img1.png'
import img2 from '../../../assets/Home1/img2.png'

import car from '../../../assets/Home1/car8.jpg'
import car5 from "../../../assets/Home1/Car7.jpg";
import { useTranslation } from "react-i18next";

// import car5 from '../../assets/Home1/car5.jpeg';
// import car from '../../assets/cars/car1.webp'
const InfoCarousel = () => {
  const { t } = useTranslation();

  const slides = [
    //  { img: car },
    //  { img: car5 },
    {
      img: img1,
      title: t("Best Travel Agency"),
      description: t(
        "Are you tired of the typical tourist destinations and looking to step out of your comfort zone? Discover the best travel spots with us for an unforgettable experience."
      ),
    },
    {
      img: img2,
      title: t("Secure Journey With Us"),
      description: t(
        "Your safety and comfort are our top priorities. Travel with confidence knowing every detail is handled with care and professionalism."
      ),
    },
  ];



  return (
    <div className="w-full max-w-7xl mx-auto mt-1 flex flex-col lg:flex-row items-center justify-between">
      {/* LEFT SIDE CAROUSEL */}
      <div className="flex-1" data-aos="fade-right">
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={4000}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-20 h-20 lg:w-24 lg:h-44 object-contain"
                />
                <div className="flex flex-col pl-4">
                  <p className="font-bold text-[22px]">{slide.title}</p>
                  <p className="text-gray-600 mt-1">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div
        className="flex-1 py-10 flex justify-center items-center"
        data-aos="fade-left"
      >
        <div className="relative flex justify-center items-center">
          <div className="relative w-[100%] left-[10%] lg:left-[5%] lg:w-[70%] group">
            <img
              src={car}
              alt="Main"
              className="lg:w-[500px] w-[240px] h-auto rounded-lg shadow-lg ml-[10px] mr-[10px] transform transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          {/* Sub Image (Overlay) */}
          <div className="absolute top-[50%] lg:left-[30%] left-[25%] w-3/5 lg:w-[60%] transform -translate-x-1/2 -translate-y-1/2 group">
            <img
              src={car5}
              alt="Sub"
              className="w-[250px] h-auto rounded-lg shadow-xl border border-white object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCarousel;
