import React from "react";
import { Carousel } from "primereact/carousel";
import "./FleetCarousel.css";

import t1 from "../../../assets/Home1/t1.png";
import t2 from "../../../assets/Home1/t2.png";
import t3 from "../../../assets/Home1/t3.png";
import t4 from "../../../assets/Home1/t4.png";
import t5 from "../../../assets/Home1/t5.png";
import t6 from "../../../assets/Home1/t6.png";
import ppt1 from "../../../assets/Home1/ppt1.png";
import ppt2 from "../../../assets/Home1/ppt2.png";
import ppt3 from "../../../assets/Home1/ppt3.png";
import ppt4 from "../../../assets/Home1/ppt4.png";
import ppt5 from "../../../assets/Home1/ppt5.png";

const fleetData = [
  { image: ppt1 },
  { image: ppt2 },
  { image: ppt3 },
  { image: ppt4 },
  { image: ppt5 },
  {
    description:
      "Our modern compact cars offer comfort, efficiency, and style for every journey. Perfect for city driving or business trips – with generous space and advanced technology.",
    highlights: [
      "Air-conditioned & fuel-efficient",
      "Seats up to 4 passengers",
      "Ideal for city rides and short trips",
    ],
    image: t1,
  },
  {
    description:
      "Our SUVs combine performance and luxury. With elevated seating, modern design, and spacious interiors, they’re perfect for families or long-distance travel – whether in the city, mountains, or countryside.",
    highlights: [
      "Seats up to 5 passengers",
      "Large luggage capacity & optional 4WD",
      "Smooth driving experience on any terrain",
    ],
    image: t2,
  },
  {
    description:
      "Our minivans are ideal for families or groups. With up to 8 seats, flexible interior layouts, and plenty of luggage space, they ensure a comfortable and relaxed journey for all passengers.",
    highlights: [
      "Seats up to 8 passengers",
      "Comfortable seating & sliding doors",
      "Perfect for airport transfers and group travel",
    ],
    image: t3,
  },
  {
    description:
      "For business trips or special occasions, our premium vehicles stand for comfort, class, and quality. Experience refined driving pleasure with elegance and sophistication.",
    highlights: [
      "Seats up to 3 passengers",
      "Luxurious design with leather interiors",
      "Ideal for VIP or executive transfers",
    ],
    image: t4,
  },
  {
    description:
      "Elegance meets space and comfort. This business-class van is the perfect choice for chauffeur services, corporate travel, and stylish group transfers. Experience refined driving pleasure with elegance and sophistication.",
    highlights: [
      "Seats up to 7 passengers",
      "Leather seats & spacious cabin",
      "Perfect for airport and VIP transfers",
    ],
    image: t5,
  },
  {
    description:
      "Experience the thrill of driving! Our sports cars combine stunning design with powerful performance – offering an unforgettable driving experience full of adrenaline and excitement.",
    highlights: [
      "Seats 1–2 passengers",
      "Sporty design & high-performance engine",
      "Perfect for weekend drives and events",
    ],
    image: t6,
  },
];

const FleetCarousel = () => {
  const fleetTemplate = (item, index) => {
    const isFullImage = !item.description;
    const isReversed = index % 2 !== 0;

    if (isFullImage) {
      return (
        <div className="fleet-full-image w-full flex justify-center items-center">
          <img
            src={item.image}
            alt={`Fleet ${index}`}
            className="w-full h-[400px] sm:h-[500px] md:h-[500px] lg:h-[500px] object-contain"
          />
        </div>
      );
    }

    return (
      <div
        className={`fleet flex flex-col lg:flex-row items-center justify-between gap-6 p-4 sm:p-6 ${
          isReversed ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="fleet-image w-full lg:w-1/2 flex justify-center">
          <img
            src={item.image}
            alt={`Fleet ${index}`}
            className="w-full sm:w-[400px] md:w-[450px] lg:w-[480px] h-auto object-contain"
          />
        </div>
        <div className="fleet-text w-full lg:w-1/2 text-center lg:text-left mt-4 lg:mt-0">
          <p className="fleet-description text-gray-800 text-sm sm:text-base md:text-lg">
            {item.description}
          </p>
          <ul className="list-disc mt-4 ml-6 text-gray-700 text-sm sm:text-base md:text-base">
            {item.highlights.map((point, idx) => (
              <li key={idx} className="mb-1">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="fleet-carousel-container mt-4 py-4">
      <Carousel
        value={fleetData}
        numVisible={1}
        numScroll={1}
        circular
        autoplayInterval={3000}
        itemTemplate={fleetTemplate}
        showIndicators
      />
    </div>
  );
};

export default FleetCarousel;
