import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import img1 from '../../../assets/Home1/img1.png';
import img2 from '../../../assets/Home1/img2.png';

import car from '../../../assets/cars/car1.webp';
import car5 from "../../../assets/Home1/car5.jpeg";
import { useTranslation } from "react-i18next";
import './FleetCarousel'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const InfoCarousel = () => {
  const { t } = useTranslation();
const isMobile = useIsMobile();
  const slides = [
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
    <div className="w-full max-w-7xl mx-auto mt-1 flex flex-col lg:flex-row items-center justify-between gap-8 px-4 sm:px-6">
      
    <div
  className="flex-1 mobile-aos-fix"
  data-aos="fade-right"
  data-aos-duration="700"
  data-aos-once="true"
>
  {isMobile ? (
    <div className="flex flex-col items-start p-6 bg-white rounded-lg shadow-md max-w-[560px] mx-auto">
      <div className="flex items-center">
        <img
          src={slides[0].img}
          alt={slides[0].title}
          className="w-16 h-16 object-contain"
        />
        <div className="flex flex-col pl-3">
          <p className="font-bold text-[18px]">{slides[0].title}</p>
          <p className="text-gray-600 mt-1 text-sm">{slides[0].description}</p>
        </div>
      </div>
    </div>
  ) : (

 <div className="flex-1 mobile-aos-fix" data-aos="fade-right" data-aos-duration="700" data-aos-once="true">
  <Carousel
    showArrows={true}
    showThumbs={false}
    showStatus={false}
    infiniteLoop={!isMobile}
    autoPlay={!isMobile}
    swipeable={isMobile}
    emulateTouch={isMobile}
    interval={4000}
  >
    {slides.map((slide, index) => (
      <div
        key={index}
        className="flex flex-col items-start p-14 bg-white rounded-lg shadow-md sm:p-5 max-w-[560px] mx-auto md:max-w-full"
      >
        <div className="flex items-center">
          <img
            src={slide.img}
            alt={slide.title}
            className="w-16 h-16 object-contain md:w-20 md:h-20 lg:w-24 lg:h-44"
          />
          <div className="flex flex-col pl-3 md:pl-4">
            <p className="font-bold text-[18px] md:text-[22px]">{slide.title}</p>
            <p className="text-gray-600 mt-1 text-sm md:text-base">{slide.description}</p>
          </div>
        </div>
      </div>
    ))}
  </Carousel>
</div>

  )}
</div>


      {/* RIGHT SIDE IMAGE */}
      <div
  className="flex-1 py-10 flex justify-center items-center mobile-aos-fix"
  data-aos="fade-left"
  data-aos-duration="700"
  data-aos-once="true"
>

        <div className="relative flex justify-center items-center">
     
          <div className="relative w-[100%] left-[10%] lg:left-[5%] lg:w-[70%]">
            <img
              src={car}
              alt="Main"
              className="lg:w-[500px] w-[140px]  h-auto rounded-lg shadow-lg"
            />
          </div>

          <div className="absolute top-[50%] lg:left-[30%] left-[25%] w-3/5 lg:w-[60%] transform -translate-x-1/2 -translate-y-1/2">
            <img
              src={car5}
              alt="Sub"
              className="w-[250px] h-auto rounded-lg shadow-xl border-4 border-white object-cover"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default InfoCarousel;
