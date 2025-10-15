import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image1 from "../../assets/tours/glamour[1].jpg";
import image2 from "../../assets/tours/glamour[2].jpg";
import image3 from "../../assets/tours/glamour[3].jpg";

import ppt1 from "../../assets/carousel/T1.jpg";
import ppt2 from "../../assets/carousel/T2.jpg";
import ppt3 from "../../assets/carousel/T3.JPg";
import ppt4 from "../../assets/carousel/T4.jpg";

const TourCarousel = () => {
  const images = [ppt1, ppt2, ppt3, ppt4];

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
        {images.map((src, index) => (
          <div
            key={index}
            className="relative flex items-center justify-center w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] mt-2 mb-5"
          >
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TourCarousel;