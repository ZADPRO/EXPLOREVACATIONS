import React from "react";
import { Carousel } from "primereact/carousel";
import { useTranslation } from "react-i18next";
import "./FleetCarousel.css";

import t1 from "../../../assets/Home1/t1.png";
import t2 from "../../../assets/Home1/t2.png";
import t3 from "../../../assets/Home1/t3.png";
import t4 from "../../../assets/Home1/t4.png";
import t5 from "../../../assets/Home1/t5.png";
import t6 from "../../../assets/Home1/t6.png";

const fleetData = [
  { id: 1, image: t1 },
  { id: 2, image: t2 },
  { id: 3, image: t3 },
  { id: 4, image: t4 },
  { id: 5, image: t5 },
  { id: 6, image: t6 },
];

const FleetCarousel = () => {
  const { t } = useTranslation("global");

  const fleetTemplate = (item) => {
    const i = item.id;

    // Get description + highlights safely
    const highlights = Array.isArray(
      t(`home1.highlights${i}`, { returnObjects: true })
    )
      ? t(`home1.highlights${i}`, { returnObjects: true })
      : [];

    return (
    <div key={i} className="fleet w-full sm:max-w-full max-w-[95%] mx-auto">
  <div className="slide-inner
        flex flex-col 
        lg:flex-row 
        items-center justify-between
        gap-6
        p-4 sm:p-6 
        text-center lg:text-left
        w-full">

        {/* Image Section */}
        <div className="fleet-image w-full lg:w-1/2 flex justify-center">
          <img
            src={item.image}
            alt={`Fleet ${i}`}
            className="w-full max-w-[260px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[480px] h-auto object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="fleet-text w-full lg:w-1/2 text-center lg:text-left mt-4 lg:mt-0">
          {/* Description */}
          <p className="fleet-description text-gray-800 
              text-sm sm:text-base md:text-lg 
              leading-relaxed px-2 sm:px-0">
            {t(`home1.description${i}`)}
          </p>

          {/* Highlights */}
          <ul className="list-disc mt-4 ml-6 
              text-gray-700 text-sm sm:text-base md:text-base text-left">
            {highlights.map((point, idx) => (
              <li key={idx} className="mb-1">
                {point}
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fleet-carousel-container mt-4 py-4 w-full px-2">
      <Carousel
        value={fleetData}
        numVisible={1}
        numScroll={1}
        circular
        itemTemplate={fleetTemplate}
        showIndicators
        autoplayInterval={3500}
      />
    </div>
  );
};

export default FleetCarousel;
