import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ppt1 from "../../assets/carousel/T1.jpg";
import ppt2 from "../../assets/carousel/T2.jpg";
import ppt3 from "../../assets/carousel/T3.jpg";
import ppt4 from "../../assets/carousel/T4.jpg";
import { useTranslation } from "react-i18next";

const TourCarousel = () => {
  const { t, i18n } = useTranslation("global");
  const images = [
    {
      src: ppt1,
      title: t("carousel.title1"),
      subtitle: t("carousel.subtitle1"),
    },
    {
      src: ppt2,
      title: t("carousel.title2"),
      subtitle: t("carousel.subtitle2"),
    },
    {
      src: ppt3,
      title: t("carousel.title3"),
      subtitle: t("carousel.subtitle3"),
    },
    {
      src: ppt4,
      title: t("carousel.title4"),
      subtitle: t("carousel.subtitle4"),
    },
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

            {/* Top-left Title */}
            <div className="absolute top-10 left-40">
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl  tracking-wide drop-shadow-md uppercase"
               style={{
                   fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "1px",
                  textShadow: "0px 2px 8px rgba(0,0,0,0.6)",
                }}>
                {item.title}
              </h2>
            </div>

            {/* Bottom-right Subtitle */}
            <div className="absolute bottom-20 right-20 text-right">
              <h3
                className="text-white text-lg sm:text-xl md:text-6xl italic font-semibold drop-shadow-lg"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  textShadow: "0px 2px 8px rgba(0,0,0,0.6)",
                }}
              >
                {item.subtitle}
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TourCarousel;
