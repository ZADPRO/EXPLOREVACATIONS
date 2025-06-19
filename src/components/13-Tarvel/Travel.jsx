import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";

import img1 from "../../assets/Banner/card1.jpg";
import img2 from "../../assets/Banner/card2.jpg";
import img3 from "../../assets/Banner/card3.jpg";
import img4 from "../../assets/Banner/card4.jpg";
import img5 from "../../assets/Banner/card5.jpg";
import img6 from "../../assets/Banner/card6.jpg";
import img7 from "../../assets/Banner/card7.jpg";
import img8 from "../../assets/Banner/card8.jpg";
import img9 from "../../assets/Banner/card9.jpg";
import img10 from "../../assets/Banner/card10.jpg";
import img11 from "../../assets/Banner/card11.jpg";
import img12 from "../../assets/Banner/card12.jpg";

const IMGS = [
  {
    url: img1,
    description: `Distance: 208 km // Driving Time: ~2 hr 45 min
Renowned for its elegance, pristine slopes, and vibrant winter culture, St. Moritz is a destination that defines alpine luxury.`,
  },
  {
    url: img2,
    description: `Distance: 140 km // Driving Time: ~1 hr 45 min
A hub for freestyle skiing and snowboarding enthusiasts, Laax is famous for its state-of-the-art snow parks and thrilling terrain.`,
  },
  {
    url: img3,
    description: `Distance: 154 km // Driving Time: ~2 hr
Known for hosting the World Economic Forum, Davos Klosters also boasts over 300 km of ski slopes and a vibrant alpine atmosphere.`,
  },
  {
    url: img4,
    description: `Distance: 154 km // Driving Time: ~2 hr 20 min
Perfect for families, this resort offers stunning trails, cozy lodges, and a seamless connection between Arosa and Lenzerheide via the Urdenbahn cable car.`,
  },
  {
    url: img5,
    description: `Distance: 101 km // Driving Time: ~1 hr 30 min
Famous for its glacier skiing and breathtaking vistas, Engelberg is home to the Titlis Rotair, the world’s first rotating cable car.`,
  },
  {
    url: img6,
    description: `Distance: 125 km // Driving Time: ~1 hr 30 min
A hidden gem offering tranquil slopes and exclusivity, Andermatt is part of the largest ski area in Central Switzerland.`,
  },
  {
    url: img7,
    description: `Distance: 240 km // Driving Time: ~3 hr 30 min
Reach Täsch for car-free access to Zermatt, a resort famed for its views of the Matterhorn and impeccable ski terrain.`,
  },
  {
    url: img8,
    description: `Distance: 170 km // Driving Time: ~2 hr 45 min
Accessed via Lauterbrunnen, these picturesque car-free villages offer unforgettable alpine experiences and world-class skiing.`,
  },
  {
    url: img9,
    description: `Distance: 180 km // Driving Time: ~2 hr 30 min
A picturesque village with dramatic views and thrilling ski runs, Grindelwald is a favorite for its charm and accessibility to the Jungfrau region.`,
  },
  {
    url: img10,
    description: `Distance: 220 km // Driving Time: ~2 hr 45 min
Synonymous with upscale sophistication, Gstaad is known for its boutique charm and a mix of luxurious experiences and scenic trails.`,
  },
  {
    url: img11,
    description: `Distance: 195 km // Driving Time: ~2 hr 40 min
Welcoming and diverse, Adelboden-Lenk offers trails suitable for all skill levels, surrounded by a warm alpine village atmosphere.`,
  },
  {
    url: img12,
    description: `Distance: 130 km // Driving Time: ~2 hr
A unique blend of wellness and skiing, Bad Ragaz is ideal for those seeking relaxation alongside excellent slopes.`,
  },
];

const Carousel = ({ images = IMGS }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const controls = useAnimation();
  const autoPlayRef = useRef(null);
  const navigate = useNavigate(); // ✅ Use inside the component

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) =>
          prev >= images.length - itemsPerView ? 0 : prev + 1
        );
      }, 3000);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, images.length, itemsPerView]);

  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  const handleDragEnd = (_, info) => {
    const threshold = 50;
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (
      info.offset.x < -threshold &&
      currentIndex < images.length - itemsPerView
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= images.length - itemsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? images.length - itemsPerView : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index * itemsPerView);
  };

  const handleCardClick = () => {
    navigate("/tours");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div
        className="overflow-hidden rounded-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${(100 / itemsPerView) * currentIndex}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 px-2 cursor-pointer"
              style={{ width: `${100 / itemsPerView}%` }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={handleCardClick} // ✅ Navigate on click
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={image.url}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    {image.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(images.length / itemsPerView) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-[10px] h-[10px] rounded-full transition-all duration-200 ${Math.floor(currentIndex / itemsPerView) === index
                  ? "bg-black w-[20px]"
                  : "bg-[#858484] hover:bg-[#858484]"
                }`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default function Travel() {
  return (
    <div>
      {/* Iframe section */}
      <div className="flex h-screen mt-10 lg:mt-20 flex-col md:flex-row justify-center items-center min-h-screen p-3 bg-gray-100">
        <iframe
          src="https://explorevacations.yelowtaxi.com/ride/add"
          width="100%"
          height="100%"
          style={{ border: "none", borderRadius: "10px" }}
          allowFullScreen
          loading="lazy"
          title="Car Booking"
        />
      </div>

      {/* Carousel section */}
      <div className="px-2 pb-10  w-full">
        <h2 className="text-2xl font-semibold text-center text-white my-6">
          Explore Our Destinations
        </h2>
        <Carousel images={IMGS} />
      </div>
    </div>
  );
}
