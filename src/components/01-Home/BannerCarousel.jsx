import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useTranslation } from "react-i18next";

import ppt1 from "../../assets/Home1/pp1.jpg";
import ppt2 from "../../assets/Home1/pp2.jpg";
import ppt3 from "../../assets/Home1/pp3.jpg";
import ppt4 from "../../assets/Home1/pp4.jpg";

const BannerCarousel = () => {
  const { t } = useTranslation("global");

  const images = [
    { src: ppt1, title: t("carousel.rent_a_car") },
    { src: ppt2, title: t("carousel.holiday_packages") },
    { src: ppt3, title: t("carousel.airport_parking") },
    { src: ppt4, title: t("carousel.airport_transfer") },
  ];

  return (
    <div className="w-full mx-auto my-10 relative overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows
        showIndicators
        interval={6000}
        transitionTime={1500}
        stopOnHover={false}
        swipeable
        emulateTouch
        dynamicHeight={false}
      >
        {images.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]"
          >
            {/* Background Image */}
            <img
              src={item.src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Centered Title */}
   <div className="absolute inset-0 flex items-start justify-start">
  <h2
    className="absolute top-24 left-16 text-white text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold uppercase tracking-wider drop-shadow-2xl"
    style={{
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: "2.5px",
      textShadow: "0px 4px 15px rgba(0,0,0,0.8)",
    }}
  >
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
