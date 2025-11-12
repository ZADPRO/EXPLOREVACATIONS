import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useTranslation } from "react-i18next";

import ppt1 from "../../assets/carousel/ppt1.jpg";
import ppt2 from "../../assets/carousel/ppt2.jpg";
import ppt3 from "../../assets/carousel/ppt3.jpg";
import ppt4 from "../../assets/carousel/ppt4.jpg";

const SecondCarousel = () => {
  const { t } = useTranslation("global");

  const images = [
    { src: ppt1, title: t("carousel.title5") },
    { src: ppt2, title: t("carousel.title6") },
    { src: ppt3, title: t("carousel.title7") },
    { src: ppt4, title: t("carousel.title8") },
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
            <img
              src={item.src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Title top-left, slightly down */}
            <div className="absolute top-24 left-16">
              <h2
  className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide drop-shadow-2xl leading-snug max-w-[60%] break-words"
  style={{
    fontFamily: "'Montserrat', sans-serif",
    letterSpacing: "2.5px",
    textShadow: "0px 4px 15px rgba(0,0,0,0.8)",
    wordBreak: "break-word",
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

export default SecondCarousel;
