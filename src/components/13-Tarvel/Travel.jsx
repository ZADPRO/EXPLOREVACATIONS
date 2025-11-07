// import React, { useRef, useState, useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// import img1 from "../../assets/Banner/card1.jpg";
// import img2 from "../../assets/Banner/card2.jpg";
// import img3 from "../../assets/Banner/card3.jpg";
// import img4 from "../../assets/Banner/card4.jpg";
// import img5 from "../../assets/Banner/card5.jpg";
// import img6 from "../../assets/Banner/card6.jpg";
// import img7 from "../../assets/Banner/card7.jpg";
// import img8 from "../../assets/Banner/card8.jpg";
// import img9 from "../../assets/Banner/card9.jpg";
// import img10 from "../../assets/Banner/card10.jpg";
// import img11 from "../../assets/Banner/card11.jpg";
// import img12 from "../../assets/Banner/card12.jpg";

// const IMGS = [
//   {
//     url: img1,
//     description: `Distance: 208 km // Driving Time: ~2 hr 45 min
// Renowned for its elegance, pristine slopes, and vibrant winter culture, St. Moritz is a destination that defines alpine luxury.`,
//   },
//   {
//     url: img2,
//     description: `Distance: 140 km // Driving Time: ~1 hr 45 min
// A hub for freestyle skiing and snowboarding enthusiasts, Laax is famous for its state-of-the-art snow parks and thrilling terrain.`,
//   },
//   {
//     url: img3,
//     description: `Distance: 154 km // Driving Time: ~2 hr
// Known for hosting the World Economic Forum, Davos Klosters also boasts over 300 km of ski slopes and a vibrant alpine atmosphere.`,
//   },
//   {
//     url: img4,
//     description: `Distance: 154 km // Driving Time: ~2 hr 20 min
// Perfect for families, this resort offers stunning trails, cozy lodges, and a seamless connection between Arosa and Lenzerheide via the Urdenbahn cable car.`,
//   },
//   {
//     url: img5,
//     description: `Distance: 101 km // Driving Time: ~1 hr 30 min
// Famous for its glacier skiing and breathtaking vistas, Engelberg is home to the Titlis Rotair, the world’s first rotating cable car.`,
//   },
//   {
//     url: img6,
//     description: `Distance: 125 km // Driving Time: ~1 hr 30 min
// A hidden gem offering tranquil slopes and exclusivity, Andermatt is part of the largest ski area in Central Switzerland.`,
//   },
//   {
//     url: img7,
//     description: `Distance: 240 km // Driving Time: ~3 hr 30 min
// Reach Täsch for car-free access to Zermatt, a resort famed for its views of the Matterhorn and impeccable ski terrain.`,
//   },
//   {
//     url: img8,
//     description: `Distance: 170 km // Driving Time: ~2 hr 45 min
// Accessed via Lauterbrunnen, these picturesque car-free villages offer unforgettable alpine experiences and world-class skiing.`,
//   },
//   {
//     url: img9,
//     description: `Distance: 180 km // Driving Time: ~2 hr 30 min
// A picturesque village with dramatic views and thrilling ski runs, Grindelwald is a favorite for its charm and accessibility to the Jungfrau region.`,
//   },
//   {
//     url: img10,
//     description: `Distance: 220 km // Driving Time: ~2 hr 45 min
// Synonymous with upscale sophistication, Gstaad is known for its boutique charm and a mix of luxurious experiences and scenic trails.`,
//   },
//   {
//     url: img11,
//     description: `Distance: 195 km // Driving Time: ~2 hr 40 min
// Welcoming and diverse, Adelboden-Lenk offers trails suitable for all skill levels, surrounded by a warm alpine village atmosphere.`,
//   },
//   {
//     url: img12,
//     description: `Distance: 130 km // Driving Time: ~2 hr
// A unique blend of wellness and skiing, Bad Ragaz is ideal for those seeking relaxation alongside excellent slopes.`,
//   },
// ];

// const Carousel = ({ images = IMGS }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(true);
//   const [itemsPerView, setItemsPerView] = useState(3);
//   const controls = useAnimation();
//   const autoPlayRef = useRef(null);
//   const navigate = useNavigate(); // ✅ Use inside the component

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setItemsPerView(1);
//       } else if (window.innerWidth < 1024) {
//         setItemsPerView(2);
//       } else {
//         setItemsPerView(3);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (isAutoPlay) {
//       autoPlayRef.current = setInterval(() => {
//         setCurrentIndex((prev) =>
//           prev >= images.length - itemsPerView ? 0 : prev + 1
//         );
//       }, 3000);
//     }

//     return () => clearInterval(autoPlayRef.current);
//   }, [isAutoPlay, images.length, itemsPerView]);

//   const handleMouseEnter = () => setIsAutoPlay(false);
//   const handleMouseLeave = () => setIsAutoPlay(true);

//   const handleDragEnd = (_, info) => {
//     const threshold = 50;
//     if (info.offset.x > threshold && currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     } else if (
//       info.offset.x < -threshold &&
//       currentIndex < images.length - itemsPerView
//     ) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prev) =>
//       prev >= images.length - itemsPerView ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev <= 0 ? images.length - itemsPerView : prev - 1
//     );
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index * itemsPerView);
//   };

//   const handleCardClick = () => {
//     navigate("/pages");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="relative w-full max-w-7xl mx-auto">
//       <div
//         className="overflow-hidden rounded-lg"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <motion.div
//           className="flex"
//           drag="x"
//           dragConstraints={{ left: 0, right: 0 }}
//           dragElastic={0.2}
//           onDragEnd={handleDragEnd}
//           animate={{ x: `-${(100 / itemsPerView) * currentIndex}%` }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         >
//           {images.map((image, index) => (
//             <motion.div
//               key={index}
//               className="flex-shrink-0 px-2 cursor-pointer"
//               style={{ width: `${100 / itemsPerView}%` }}
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.2 }}
//               onClick={handleCardClick} // ✅ Navigate on click
//             >
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80">
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={image.url}
//                     alt={`Slide ${index + 1}`}
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
//                 </div>
//                 <div className="p-4">
//                   <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
//                     {image.description}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
//       >
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M15 19l-7-7 7-7"
//           />
//         </svg>
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
//       >
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 5l7 7-7 7"
//           />
//         </svg>
//       </button>

//       {/* Dots */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {Array.from({ length: Math.ceil(images.length / itemsPerView) }).map(
//           (_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-[10px] h-[10px] rounded-full transition-all duration-200 ${Math.floor(currentIndex / itemsPerView) === index
//                   ? "bg-black w-[20px]"
//                   : "bg-[#858484] hover:bg-[#858484]"
//                 }`}
//             />
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default function Travel() {
//   return (
//     <div>
//       {/* Iframe section */}
//       <div className="flex h-screen mt-10 lg:mt-20 flex-col md:flex-row justify-center items-center min-h-screen p-3 bg-gray-100">
//         <iframe
//           src="https://explorevacations.yelowtaxi.com/ride/add"
//           width="100%"
//           height="100%"
//           style={{ border: "none", borderRadius: "10px" }}
//           allowFullScreen
//           loading="lazy"
//           title="Car Booking"
//         />
//       </div>

//       {/* Carousel section */}
//       <div className="px-2 pb-10  w-full">
//         <h2 className="text-2xl font-semibold text-center text-black my-6">
//           Explore Our Destinations
//         </h2>
//         <Carousel images={IMGS} />
//       </div>
//     </div>
//   );
// }

// import React, { useRef, useState, useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// import img1 from "../../assets/Banner/card1.jpg";
// import img2 from "../../assets/Banner/card2.jpg";
// import img3 from "../../assets/Banner/card3.jpg";
// import img4 from "../../assets/Banner/card4.jpg";
// import img5 from "../../assets/Banner/card5.jpg";
// import img6 from "../../assets/Banner/card6.jpg";
// import img7 from "../../assets/Banner/card7.jpg";
// import img8 from "../../assets/Banner/card8.jpg";
// import img9 from "../../assets/Banner/card9.jpg";
// import img10 from "../../assets/Banner/card10.jpg";
// import img11 from "../../assets/Banner/card11.jpg";
// import img12 from "../../assets/Banner/card12.jpg";

// const IMGS = [
//   {
//     url: img1,
//     description: `Distance: 208 km // Driving Time: ~2 hr 45 min
// Renowned for its elegance, pristine slopes, and vibrant winter culture, St. Moritz is a destination that defines alpine luxury.`,
//   },
//   {
//     url: img2,
//     description: `Distance: 140 km // Driving Time: ~1 hr 45 min
// A hub for freestyle skiing and snowboarding enthusiasts, Laax is famous for its state-of-the-art snow parks and thrilling terrain.`,
//   },
//   {
//     url: img3,
//     description: `Distance: 154 km // Driving Time: ~2 hr
// Known for hosting the World Economic Forum, Davos Klosters also boasts over 300 km of ski slopes and a vibrant alpine atmosphere.`,
//   },
//   {
//     url: img4,
//     description: `Distance: 154 km // Driving Time: ~2 hr 20 min
// Perfect for families, this resort offers stunning trails, cozy lodges, and a seamless connection between Arosa and Lenzerheide via the Urdenbahn cable car.`,
//   },
//   {
//     url: img5,
//     description: `Distance: 101 km // Driving Time: ~1 hr 30 min
// Famous for its glacier skiing and breathtaking vistas, Engelberg is home to the Titlis Rotair, the world’s first rotating cable car.`,
//   },
//   {
//     url: img6,
//     description: `Distance: 125 km // Driving Time: ~1 hr 30 min
// A hidden gem offering tranquil slopes and exclusivity, Andermatt is part of the largest ski area in Central Switzerland.`,
//   },
//   {
//     url: img7,
//     description: `Distance: 240 km // Driving Time: ~3 hr 30 min
// Reach Täsch for car-free access to Zermatt, a resort famed for its views of the Matterhorn and impeccable ski terrain.`,
//   },
//   {
//     url: img8,
//     description: `Distance: 170 km // Driving Time: ~2 hr 45 min
// Accessed via Lauterbrunnen, these picturesque car-free villages offer unforgettable alpine experiences and world-class skiing.`,
//   },
//   {
//     url: img9,
//     description: `Distance: 180 km // Driving Time: ~2 hr 30 min
// A picturesque village with dramatic views and thrilling ski runs, Grindelwald is a favorite for its charm and accessibility to the Jungfrau region.`,
//   },
//   {
//     url: img10,
//     description: `Distance: 220 km // Driving Time: ~2 hr 45 min
// Synonymous with upscale sophistication, Gstaad is known for its boutique charm and a mix of luxurious experiences and scenic trails.`,
//   },
//   {
//     url: img11,
//     description: `Distance: 195 km // Driving Time: ~2 hr 40 min
// Welcoming and diverse, Adelboden-Lenk offers trails suitable for all skill levels, surrounded by a warm alpine village atmosphere.`,
//   },
//   {
//     url: img12,
//     description: `Distance: 130 km // Driving Time: ~2 hr
// A unique blend of wellness and skiing, Bad Ragaz is ideal for those seeking relaxation alongside excellent slopes.`,
//   },
// ];

// const Carousel = ({ images = IMGS }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlay, setIsAutoPlay] = useState(true);
//   const [itemsPerView, setItemsPerView] = useState(3);
//   const controls = useAnimation();
//   const autoPlayRef = useRef(null);
//   const navigate = useNavigate(); // ✅ Use inside the component

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setItemsPerView(1);
//       } else if (window.innerWidth < 1024) {
//         setItemsPerView(2);
//       } else {
//         setItemsPerView(3);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (isAutoPlay) {
//       autoPlayRef.current = setInterval(() => {
//         setCurrentIndex((prev) =>
//           prev >= images.length - itemsPerView ? 0 : prev + 1
//         );
//       }, 3000);
//     }

//     return () => clearInterval(autoPlayRef.current);
//   }, [isAutoPlay, images.length, itemsPerView]);

//   const handleMouseEnter = () => setIsAutoPlay(false);
//   const handleMouseLeave = () => setIsAutoPlay(true);

//   const handleDragEnd = (_, info) => {
//     const threshold = 50;
//     if (info.offset.x > threshold && currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     } else if (
//       info.offset.x < -threshold &&
//       currentIndex < images.length - itemsPerView
//     ) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prev) =>
//       prev >= images.length - itemsPerView ? 0 : prev + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev <= 0 ? images.length - itemsPerView : prev - 1
//     );
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index * itemsPerView);
//   };

//   const handleCardClick = () => {
//     navigate("/pages");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="relative w-full max-w-7xl mx-auto">
//       <div
//         className="overflow-hidden rounded-lg"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <motion.div
//           className="flex"
//           drag="x"
//           dragConstraints={{ left: 0, right: 0 }}
//           dragElastic={0.2}
//           onDragEnd={handleDragEnd}
//           animate={{ x: `-${(100 / itemsPerView) * currentIndex}%` }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         >
//           {images.map((image, index) => (
//             <motion.div
//               key={index}
//               className="flex-shrink-0 px-2 cursor-pointer"
//               style={{ width: `${100 / itemsPerView}%` }}
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.2 }}
//               onClick={handleCardClick} // ✅ Navigate on click
//             >
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80">
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={image.url}
//                     alt={`Slide ${index + 1}`}
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
//                 </div>
//                 <div className="p-4">
//                   <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
//                     {image.description}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Arrows */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
//       >
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M15 19l-7-7 7-7"
//           />
//         </svg>
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
//       >
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 5l7 7-7 7"
//           />
//         </svg>
//       </button>

//       {/* Dots */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {Array.from({ length: Math.ceil(images.length / itemsPerView) }).map(
//           (_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-[10px] h-[10px] rounded-full transition-all duration-200 ${Math.floor(currentIndex / itemsPerView) === index
//                   ? "bg-black w-[20px]"
//                   : "bg-[#858484] hover:bg-[#858484]"
//                 }`}
//             />
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default function Travel() {
//   return (
//     <div>
//       {/* Iframe section */}
//       <div className="flex h-screen mt-10 lg:mt-20 flex-col md:flex-row justify-center items-center min-h-screen p-3 bg-gray-100">
//         <iframe
//           src="https://explorevacations.yelowtaxi.com/ride/add"
//           width="100%"
//           height="100%"
//           style={{ border: "none", borderRadius: "10px" }}
//           allowFullScreen
//           loading="lazy"
//           title="Car Booking"
//         />
//       </div>

//       {/* Carousel section */}
//       <div className="px-2 pb-10  w-full">
//         <h2 className="text-2xl font-semibold text-center text-black my-6">
//           Explore Our Destinations
//         </h2>
//         <Carousel images={IMGS} />
//       </div>
//     </div>
//   );
// }


import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import tt1 from '../../assets/Travel/Transfer[1].jpg'


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
import { ChevronDown, Clock, MapPin, Calendar, Users } from 'lucide-react';
import './TravelBooking.css'
import TourrCarousel from "../01-Home/tourrcarousel";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUser, FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";
import driverImg from "../../assets/Home1/2.png"
import BookingFlow from "../BookingFlow/BookingFlow";
const IMGS = [
  {
    id: "st-moritz",
    title: "St. Moritz",
    url: img1,
    description: `Distance: 208 km // Driving Time: ~2 hr 45 min
Renowned for its elegance, pristine slopes, and vibrant winter culture, St. Moritz is a destination that defines alpine luxury.`,
    fullDescription: `St. Moritz is a world-renowned alpine resort town in Switzerland's Engadin valley. Famous for hosting two Winter Olympics and numerous world championships, it's synonymous with luxury and winter sports excellence. The town offers over 350 km of ski slopes, elegant boutiques, gourmet restaurants, and stunning mountain vistas. Whether you're seeking thrilling winter sports or sophisticated après-ski experiences, St. Moritz delivers an unforgettable alpine adventure.`
  },
  {
    id: "laax",
    title: "Laax",
    url: img2,
    description: `Distance: 140 km // Driving Time: ~1 hr 45 min
A hub for freestyle skiing and snowboarding enthusiasts, Laax is famous for its state-of-the-art snow parks and thrilling terrain.`,
    fullDescription: `Laax is Switzerland's premier freestyle destination, home to one of Europe's largest snow parks. With four state-of-the-art halfpipes and innovative terrain features, it attracts snowboarders and freestyle skiers from around the globe. The resort spans three villages - Laax, Flims, and Falera - offering 224 km of varied terrain, modern lift systems, and a vibrant après-ski scene. Perfect for those seeking adrenaline-pumping action combined with modern mountain hospitality.`
  },
  {
    id: "davos-klosters",
    title: "Davos Klosters",
    url: img3,
    description: `Distance: 154 km // Driving Time: ~2 hr
Known for hosting the World Economic Forum, Davos Klosters also boasts over 300 km of ski slopes and a vibrant alpine atmosphere.`,
    fullDescription: `Davos Klosters is one of Switzerland's largest ski areas, offering 300 km of slopes across six different mountains. Beyond its fame as the World Economic Forum venue, it's a paradise for winter sports enthusiasts with diverse terrain for all skill levels. The area combines traditional Swiss charm with modern facilities, featuring excellent cross-country trails, winter hiking paths, and ice sports. The twin resorts of Davos and Klosters each offer unique character while sharing an extensive lift system.`
  },
  {
    id: "arosa-lenzerheide",
    title: "Arosa Lenzerheide",
    url: img4,
    description: `Distance: 154 km // Driving Time: ~2 hr 20 min
Perfect for families, this resort offers stunning trails, cozy lodges, and a seamless connection between Arosa and Lenzerheide via the Urdenbahn cable car.`,
    fullDescription: `Arosa Lenzerheide is Switzerland's largest interconnected ski area in Graubünden, created by linking the traditional resorts of Arosa and Lenzerheide. With 225 km of slopes and 43 lifts, it offers incredible variety for all abilities. The area is particularly family-friendly, featuring dedicated children's areas, gentle learning slopes, and numerous mountain restaurants. The scenic Urdenbahn cable car connection provides breathtaking views while seamlessly linking the two resort areas.`
  },
  {
    id: "engelberg",
    title: "Engelberg",
    url: img5,
    description: `Distance: 101 km // Driving Time: ~1 hr 30 min
Famous for its glacier skiing and breathtaking vistas, Engelberg is home to the Titlis Rotair, the world's first rotating cable car.`,
    fullDescription: `Engelberg, meaning "Mountain of Angels," is a stunning resort centered around the iconic Mount Titlis. The Titlis Rotair, the world's first rotating cable car, offers 360-degree panoramic views during the ascent to 3,020 meters. The resort provides year-round glacier skiing, dramatic off-piste terrain, and family-friendly slopes. With its charming monastery village atmosphere, extensive freeride opportunities, and the spectacular Titlis Cliff Walk suspension bridge, Engelberg combines natural beauty with thrilling alpine experiences.`
  },
  {
    id: "andermatt",
    title: "Andermatt",
    url: img6,
    description: `Distance: 125 km // Driving Time: ~1 hr 30 min
A hidden gem offering tranquil slopes and exclusivity, Andermatt is part of the largest ski area in Central Switzerland.`,
    fullDescription: `Andermatt has transformed into one of Switzerland's most exciting ski destinations while retaining its authentic alpine charm. As part of the SkiArena Andermatt-Sedrun, it offers 120 km of slopes with reliable snow conditions and dramatic mountain scenery. The area is renowned for its extensive off-piste terrain and freeride opportunities. Recent development has brought world-class hotels and dining while preserving the village's traditional character, making it ideal for those seeking exclusivity and adventure in equal measure.`
  },
  {
    id: "zermatt",
    title: "Zermatt (via Täsch)",
    url: img7,
    description: `Distance: 240 km // Driving Time: ~3 hr 30 min
Reach Täsch for car-free access to Zermatt, a resort famed for its views of the Matterhorn and impeccable ski terrain.`,
    fullDescription: `Zermatt is Switzerland's most iconic ski resort, dominated by the majestic Matterhorn peak. This car-free village offers 360 km of slopes across Swiss and Italian terrain, with the highest ski area in Europe reaching 3,883 meters. The resort provides year-round skiing on the glacier, world-class dining, luxury shopping, and charming traditional chalets. Electric taxis and horse-drawn carriages maintain the village's unique atmosphere. Park in Täsch and take the shuttle train for easy access to this alpine paradise.`
  },
  {
    id: "murren-wengen",
    title: "Mürren & Wengen",
    url: img8,
    description: `Distance: 170 km // Driving Time: ~2 hr 45 min
Accessed via Lauterbrunnen, these picturesque car-free villages offer unforgettable alpine experiences and world-class skiing.`,
    fullDescription: `Mürren and Wengen are two charming car-free villages perched on opposite sides of the Lauterbrunnen Valley, offering access to the spectacular Jungfrau ski region. These traditional Swiss villages have preserved their authentic character with no through traffic, only mountain trains and cable cars. The area features 206 km of slopes with stunning views of the Eiger, Mönch, and Jungfrau peaks. Both villages offer a peaceful, family-friendly atmosphere with excellent skiing, traditional Swiss hospitality, and some of the most dramatic alpine scenery in Switzerland.`
  },
  {
    id: "grindelwald",
    title: "Grindelwald",
    url: img9,
    description: `Distance: 180 km // Driving Time: ~2 hr 30 min
A picturesque village with dramatic views and thrilling ski runs, Grindelwald is a favorite for its charm and accessibility to the Jungfrau region.`,
    fullDescription: `Grindelwald is a stunning alpine village nestled beneath the iconic north face of the Eiger. Part of the extensive Jungfrau ski region, it offers access to 206 km of slopes via modern lift systems including the new Eiger Express tricable gondola. The village combines traditional Swiss charm with modern amenities, featuring excellent skiing for all levels, spectacular mountain views, and easy access to the famous Jungfraujoch - Top of Europe. With its dramatic setting and comprehensive winter offerings, Grindelwald is perfect for both adventure seekers and those wanting scenic mountain experiences.`
  },
  {
    id: "gstaad",
    title: "Gstaad",
    url: img10,
    description: `Distance: 220 km // Driving Time: ~2 hr 45 min
Synonymous with upscale sophistication, Gstaad is known for its boutique charm and a mix of luxurious experiences and scenic trails.`,
    fullDescription: `Gstaad epitomizes Swiss alpine luxury and sophistication. This exclusive resort in the Bernese Oberland attracts celebrities and discerning travelers with its elegant chalets, Michelin-starred restaurants, designer boutiques, and world-class hotels. The ski area encompasses 200 km of slopes across multiple mountains, offering varied terrain from gentle slopes to challenging runs. Beyond skiing, Gstaad is renowned for its cultural events, including classical music festivals, and its refined après-ski scene. The car-free village center maintains a sophisticated yet welcoming atmosphere.`
  },
  {
    id: "adelboden-lenk",
    title: "Adelboden-Lenk",
    url: img11,
    description: `Distance: 195 km // Driving Time: ~2 hr 40 min
Welcoming and diverse, Adelboden-Lenk offers trails suitable for all skill levels, surrounded by a warm alpine village atmosphere.`,
    fullDescription: `Adelboden-Lenk is a family-friendly ski area in the Bernese Oberland, offering 210 km of slopes with something for everyone. The connected resorts of Adelboden and Lenk maintain their traditional Swiss village character while providing modern lift systems and excellent snow reliability. The area is famous for hosting World Cup ski races and offers superb intermediate skiing, extensive children's facilities, and welcoming mountain restaurants. With its authentic atmosphere, reasonable prices, and diverse terrain, it's ideal for families and those seeking genuine Swiss hospitality.`
  },
  {
    id: "bad-ragaz",
    title: "Bad Ragaz",
    url: img12,
    description: `Distance: 130 km // Driving Time: ~2 hr
A unique blend of wellness and skiing, Bad Ragaz is ideal for those seeking relaxation alongside excellent slopes.`,
    fullDescription: `Bad Ragaz offers a unique combination of world-class thermal spa facilities and access to excellent skiing in the nearby Pizol and Flumserberg ski areas. This elegant spa town has been renowned for its healing thermal waters since the 13th century. Visitors can enjoy skiing during the day and return to luxurious spa treatments in the evening. The nearby ski areas offer 65 km of varied terrain with spectacular views of the Rhine Valley. Perfect for those who want to combine active mountain pursuits with wellness and relaxation in sophisticated surroundings.`
  },
];

const Carousel = ({ images = IMGS }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const controls = useAnimation();
  const autoPlayRef = useRef(null);
  const navigate = useNavigate();

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

  const handleCardClick = (destination) => {
    navigate(`/destination/${destination.id}`);
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
              onClick={() => handleCardClick(image)}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
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
      <div className="flex justify-center mb-5 mt-5 space-x-2">
        {Array.from({ length: Math.ceil(images.length / itemsPerView) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-[10px] h-[10px] rounded-full transition-all duration-200 ${
                Math.floor(currentIndex / itemsPerView) === index
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

// Destination Detail Page Component
export function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = IMGS.find((img) => img.id === id);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Destination not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={destination.url}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => navigate("/transfer")}
              className="mb-4 flex items-center text-white/90 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Back to Destinations
            </button>
            <h1 className="text-5xl font-bold mb-4">{destination.title}</h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {destination.description}
          </p>
          <div className="border-t pt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Detailed Information
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {destination.fullDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingForm() {
  // State declarations
  const [bookingType, setBookingType] = useState('transfer');
  const [showReturn, setShowReturn] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    pickupDate: '',
    pickupTime: '01:45 PM',
    returnDate: '',
    returnTime: '01:45 PM',
    passengers: 2,
    duration: '2'
  });
  
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeTimeField, setActiveTimeField] = useState(null);
  const [activeDateField, setActiveDateField] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('45');
  const [selectedPeriod, setSelectedPeriod] = useState('PM');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const navigate = useNavigate();

  // Constants
  const hours12 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const hours24 = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  const minutes = ['00', '15', '30', '45'];
  const durations = ['2', '4', '6', '8', '10', '12', '24'];

  // Handler functions
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const openTimePicker = (field) => {
    setActiveTimeField(field);
    const currentTime = formData[field];
    if (currentTime) {
      const parts = currentTime.split(' ');
      const [hour, minute] = parts[0].split(':');
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setSelectedPeriod(parts[1] || 'PM');
    }
    setShowTimePicker(true);
  };

  const openCalendar = (field) => {
    setActiveDateField(field);
    setShowCalendar(true);
  };

  const saveTime = () => {
    const timeString = timeFormat === '12h' 
      ? `${selectedHour}:${selectedMinute} ${selectedPeriod}`
      : `${selectedHour}:${selectedMinute}`;
    handleInputChange(activeTimeField, timeString);
    setShowTimePicker(false);
  };

  const selectDate = (date) => {
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const formattedDate = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
    handleInputChange(activeDateField, formattedDate);
    setShowCalendar(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (bookingType === 'transfer') {
      if (!formData.from) newErrors.from = 'Pickup location is required';
      if (!formData.to) newErrors.to = 'Drop-off location is required';
      if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
      if (showReturn && !formData.returnDate) newErrors.returnDate = 'Return date is required';
    } else {
      if (!formData.from) newErrors.from = 'Pickup location is required';
      if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSeePrices = () => {
    if (validateForm()) {
      const bookingFormData = {
        outbound: {
          from: formData.from,
          to: formData.to,
          date: formatDate(formData.pickupDate),
          time: formData.pickupTime,
          passengers: formData.passengers,
          estimatedArrival: '08:32 pm (6h 47m)',
          distance: '1328 km / 825 Miles'
        },
        return: showReturn && formData.returnDate ? {
          from: formData.to,
          to: formData.from,
          date: formatDate(formData.returnDate),
          time: formData.returnTime,
          passengers: formData.passengers,
          estimatedArrival: '08:32 pm (6h 47m)',
          distance: '1328 km / 825 Miles'
        } : null
      };
      navigate("/BookingFlow", { state: { bookingFormData } });
    }
  };

  const incrementValue = (type) => {
    if (type === 'hour') {
      const hours = timeFormat === '12h' ? hours12 : hours24;
      const idx = hours.indexOf(selectedHour);
      setSelectedHour(hours[idx < hours.length - 1 ? idx + 1 : 0]);
    } else if (type === 'minute') {
      const idx = minutes.indexOf(selectedMinute);
      setSelectedMinute(minutes[idx < minutes.length - 1 ? idx + 1 : 0]);
    }
  };

  const decrementValue = (type) => {
    if (type === 'hour') {
      const hours = timeFormat === '12h' ? hours12 : hours24;
      const idx = hours.indexOf(selectedHour);
      setSelectedHour(hours[idx > 0 ? idx - 1 : hours.length - 1]);
    } else if (type === 'minute') {
      const idx = minutes.indexOf(selectedMinute);
      setSelectedMinute(minutes[idx > 0 ? idx - 1 : minutes.length - 1]);
    }
  };

  const togglePeriod = () => {
    setSelectedPeriod(prev => prev === 'AM' ? 'PM' : 'AM');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
    const days = [];
    const today = new Date();
    const pickupDateObj = formData.pickupDate ? new Date(formData.pickupDate) : null;

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day disabled"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPickupCalendar = activeDateField === 'pickupDate';
      const isReturnCalendar = activeDateField === 'returnDate';
      const isToday = date.toDateString() === today.toDateString();
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = formData[activeDateField] === formattedDate;

      let isDisabled = false;
      if (isPickupCalendar && date < new Date(today.setHours(0, 0, 0, 0))) {
        isDisabled = true;
      }
      if (isReturnCalendar && pickupDateObj) {
        const pickupCopy = new Date(pickupDateObj);
        pickupCopy.setHours(0, 0, 0, 0);
        if (date < pickupCopy) {
          isDisabled = true;
        }
      }

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
          onClick={() => !isDisabled && selectDate(date)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  // Main render
  return (
    <div className="booking-container">
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', textAlign: 'center', marginBottom: '32px' }}>
        Your Reliable Worldwide<br />Airport Transfers
      </h1>

      <div className="booking-grid">
        <div className="booking-form-wrapper">
 <div className="booking-tabs">
  <div className="booking-text">Transfer</div>
</div>
 {/* <button
              className={`booking-tab ${bookingType === 'hourly' ? 'active' : ''}`}
              onClick={() => setBookingType('hourly')}
            >
              <Clock style={{ width: '18px', height: '18px' }} />
              By the Hour
            </button> */}
  

          {bookingType === 'transfer' && (
            <div>
              {/* Pickup Field */}
              <div className="form-group">
                <label className="form-label">From</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" />
                  <input
                    type="text"
                    placeholder="Enter pickup location in Switzerland"
                    value={formData.from}
                    onChange={(e) => handleInputChange("from", e.target.value)}
                    className={`form-input ${errors.from ? 'error' : ''}`}
                  />
                </div>
                {errors.from && <p className="error-message">{errors.from}</p>}
              </div>

              {/* Drop-off Field */}
              <div className="form-group">
                <label className="form-label">To</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" />
                  <input
                    type="text"
                    placeholder="Enter drop-off location in Switzerland"
                    value={formData.to}
                    onChange={(e) => handleInputChange("to", e.target.value)}
                    className={`form-input ${errors.to ? 'error' : ''}`}
                  />
                </div>
                {errors.to && <p className="error-message">{errors.to}</p>}
              </div>

              {/* Date and Time fields */}
              <div className="date-time-grid">
                <div className="form-group">
                  <label className="form-label">Pickup date</label>
                  <div className="input-wrapper">
                    <Calendar className="input-icon" />
                    <input
                      type="text"
                      value={formatDate(formData.pickupDate)}
                      onClick={() => openCalendar('pickupDate')}
                      readOnly
                      placeholder="Select date"
                      className={`form-input ${errors.pickupDate ? 'error' : ''}`}
                      style={{ cursor: 'pointer' }}
                    />
                    {showCalendar && activeDateField === 'pickupDate' && (
                      <div className="calendar-picker">
                        <div className="calendar-header">
                          <button className="calendar-nav-btn" onClick={() => navigateMonth(-1)}>
                            <ChevronDown style={{ transform: 'rotate(90deg)', width: '20px', height: '20px' }} />
                          </button>
                          <div className="calendar-month">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </div>
                          <button className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
                            <ChevronDown style={{ transform: 'rotate(-90deg)', width: '20px', height: '20px' }} />
                          </button>
                        </div>
                        <div className="calendar-grid">
                          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                            <div key={day} className="calendar-day-header">{day}</div>
                          ))}
                          {renderCalendar()}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.pickupDate && <p className="error-message">{errors.pickupDate}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Pickup time</label>
                  <div className="input-wrapper">
                    <Clock className="input-icon" />
                    <input
                      type="text"
                      value={formData.pickupTime}
                      onClick={() => openTimePicker('pickupTime')}
                      readOnly
                      className="form-input"
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>

              {/* Add Return Button */}
              {!showReturn && (
                <button 
                  className="add-return-btn"
                  onClick={() => setShowReturn(true)}
                >
                  ADD RETURN
                </button>
              )}

              {/* Return Trip Section */}
              {showReturn && (
                <div className="return-section">
                  <div className="return-header">
                    <h3 className="return-title">Return Trip</h3>
                    <button
                      className="remove-return-btn"
                      onClick={() => { 
                        setShowReturn(false); 
                        handleInputChange('returnDate', ''); 
                        handleInputChange('returnTime', '01:45 PM'); 
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="date-time-grid">
                    <div className="form-group">
                      <label className="form-label">Return date</label>
                      <div className="input-wrapper">
                        <Calendar className="input-icon" />
                        <input
                          type="text"
                          value={formatDate(formData.returnDate)}
                          onClick={() => openCalendar('returnDate')}
                          readOnly
                          placeholder="Select date"
                          className={`form-input ${errors.returnDate ? 'error' : ''}`}
                          style={{ cursor: 'pointer', background: 'white' }}
                        />
                        {showCalendar && activeDateField === 'returnDate' && (
                          <div className="calendar-picker">
                            <div className="calendar-header">
                              <button className="calendar-nav-btn" onClick={() => navigateMonth(-1)}>
                                <ChevronDown style={{ transform: 'rotate(90deg)', width: '20px', height: '20px' }} />
                              </button>
                              <div className="calendar-month">
                                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                              </div>
                              <button className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
                                <ChevronDown style={{ transform: 'rotate(-90deg)', width: '20px', height: '20px' }} />
                              </button>
                            </div>
                            <div className="calendar-grid">
                              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                                <div key={day} className="calendar-day-header">{day}</div>
                              ))}
                              {renderCalendar()}
                            </div>
                          </div>
                        )}
                      </div>
                      {errors.returnDate && <p className="error-message">{errors.returnDate}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Return time</label>
                      <div className="input-wrapper">
                        <Clock className="input-icon" />
                        <input
                          type="text"
                          value={formData.returnTime}
                          onClick={() => openTimePicker('returnTime')}
                          readOnly
                          className="form-input"
                          style={{ cursor: 'pointer', background: 'white' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Passengers */}
              <div className="form-group">
                <label className="form-label">
                  <Users style={{ marginTop: '10px', marginBottom: '10px', width: '18px', height: '18px', display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                  Passengers
                </label>
                <div className="passengers-control">
                  <span className="passengers-count">{formData.passengers}</span>
                  <div className="passengers-buttons">
                    <button
                      className="passenger-btn"
                      onClick={() => handleInputChange('passengers', Math.max(1, formData.passengers - 1))}
                    >
                      −
                    </button>
                    <button
                      className="passenger-btn"
                      onClick={() => handleInputChange('passengers', formData.passengers + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* {bookingType === 'hourly' && (
            <div>
              <div className="form-group">
                <label className="form-label">From</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" />
                  <input
                    type="text"
                    placeholder="Address, airport, hotel in Switzerland..."
                    value={formData.from}
                    onChange={(e) => handleInputChange('from', e.target.value)}
                    className={`form-input ${errors.from ? 'error' : ''}`}
                  />
                </div>
                {errors.from && <p className="error-message">{errors.from}</p>}
              </div>

              <div className="date-time-grid">
                <div className="form-group">
                  <label className="form-label">Pickup date</label>
                  <div className="input-wrapper">
                    <Calendar className="input-icon" />
                    <input
                      type="text"
                      value={formatDate(formData.pickupDate)}
                      onClick={() => openCalendar('pickupDate')}
                      readOnly
                      placeholder="Select date"
                      className={`form-input ${errors.pickupDate ? 'error' : ''}`}
                      style={{ cursor: 'pointer' }}
                    />
                    {showCalendar && activeDateField === 'pickupDate' && (
                      <div className="calendar-picker">
                        <div className="calendar-header">
                          <button className="calendar-nav-btn" onClick={() => navigateMonth(-1)}>
                            <ChevronDown style={{ transform: 'rotate(90deg)', width: '20px', height: '20px' }} />
                          </button>
                          <div className="calendar-month">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </div>
                          <button className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
                            <ChevronDown style={{ transform: 'rotate(-90deg)', width: '20px', height: '20px' }} />
                          </button>
                        </div>
                        <div className="calendar-grid">
                          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                            <div key={day} className="calendar-day-header">{day}</div>
                          ))}
                          {renderCalendar()}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.pickupDate && <p className="error-message">{errors.pickupDate}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Pickup time</label>
                  <div className="input-wrapper">
                    <Clock className="input-icon" />
                    <input
                      type="text"
                      value={formData.pickupTime}
                      onClick={() => openTimePicker('pickupTime')}
                      readOnly
                      className="form-input"
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock style={{ width: '18px', height: '18px', display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                  Duration
                </label>
                <div className="select-wrapper">
                  <select
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="duration-select"
                  >
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration} Hours</option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Users style={{ width: '18px', height: '18px', display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
                  Passengers
                </label>
                <div className="passengers-control">
                  <span className="passengers-count">{formData.passengers}</span>
                  <div className="passengers-buttons">
                    <button
                      className="passenger-btn"
                      onClick={() => handleInputChange('passengers', Math.max(1, formData.passengers - 1))}
                    >
                      −
                    </button>
                    <button
                      className="passenger-btn"
                      onClick={() => handleInputChange('passengers', formData.passengers + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          <button className="see-prices-btn" onClick={handleSeePrices}>
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            See prices
          </button>

          <div className="trustpilot-section">
            <span className="trustpilot-rating">EXCELLENT</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="star" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="trustpilot-logo">Trustpilot</span>
          </div>
        </div>

        <div className="booking-image">
          <img
            src={tt1}
               alt="Premium Transfer Service"
          />
        </div>
      </div>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <div className="time-picker-overlay" onClick={() => setShowTimePicker(false)}>
          <div className="time-picker-modal" onClick={(e) => e.stopPropagation()}>
            <div className="time-format-tabs">
              <button
                className={`time-format-tab ${timeFormat === '24h' ? 'active' : ''}`}
                onClick={() => setTimeFormat('24h')}
              >
                24h
              </button>
              <button
                className={`time-format-tab ${timeFormat === '12h' ? 'active' : ''}`}
                onClick={() => setTimeFormat('12h')}
              >
                12h
              </button>
            </div>

            <div className="time-selectors">
              <div className="time-column">
                <button className="time-arrow" onClick={() => decrementValue('hour')}>
                  <ChevronDown style={{ transform: 'rotate(180deg)', width: '20px', height: '20px' }} />
                </button>
                <div className="time-value">{selectedHour}</div>
                <button className="time-arrow" onClick={() => incrementValue('hour')}>
                  <ChevronDown style={{ width: '20px', height: '20px' }} />
                </button>
              </div>

              <span className="time-separator">:</span>

              <div className="time-column">
                <button className="time-arrow" onClick={() => decrementValue('minute')}>
                  <ChevronDown style={{ transform: 'rotate(180deg)', width: '20px', height: '20px' }} />
                </button>
                <div className="time-value">{selectedMinute}</div>
                <button className="time-arrow" onClick={() => incrementValue('minute')}>
                  <ChevronDown style={{ width: '20px', height: '20px' }} />
                </button>
              </div>

              {timeFormat === '12h' && (
                <div className="time-column">
                  <button className="time-arrow" onClick={togglePeriod}>
                    <ChevronDown style={{ transform: 'rotate(180deg)', width: '20px', height: '20px' }} />
                  </button>
                  <div className="time-value">{selectedPeriod}</div>
                  <button className="time-arrow" onClick={togglePeriod}>
                    <ChevronDown style={{ width: '20px', height: '20px' }} />
                  </button>
                </div>
              )}
            </div>

            <button className="save-time-btn" onClick={saveTime}>
              Save
            </button>
          </div>
        </div>
      )}

      {showCalendar && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'transparent',
            zIndex: 50
          }}
          onClick={() => setShowCalendar(false)}
        />
      )}
    </div>
  );
}


export default function Travel() {
   const [bookingType, setBookingType] = useState('transfer');
  const [showReturn, setShowReturn] = useState(false);
  const [formData, setFormData] = useState({
    from: '', to: '', pickupDate: '', pickupTime: '',
    returnDate: '', returnTime: '', passengers: 2, duration: '2'
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [activeTimeField, setActiveTimeField] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('45');
  const [selectedPeriod, setSelectedPeriod] = useState('PM');
  const [timeFormat, setTimeFormat] = useState('12h');

  const hours12 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const hours24 = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  const minutes = ['00', '15', '30', '45'];
  const durations = ['2', '4', '6', '8', '10', '12', '24'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const openTimePicker = (field) => {
    setActiveTimeField(field);
    const currentTime = formData[field];
    const parts = currentTime.split(' ');
    const [hour, minute] = parts[0].split(':');
    setSelectedHour(hour);
    setSelectedMinute(minute);
    setSelectedPeriod(parts[1] || 'PM');
    setShowTimePicker(true);
  };

  const saveTime = () => {
    const timeString = timeFormat === '12h' 
      ? `${selectedHour}:${selectedMinute} ${selectedPeriod}`
      : `${selectedHour}:${selectedMinute}`;
    handleInputChange(activeTimeField, timeString);
    setShowTimePicker(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (bookingType === 'transfer') {
      if (!formData.from) newErrors.from = 'Pickup location is required';
      if (!formData.to) newErrors.to = 'Drop-off location is required';
      if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
      if (showReturn && !formData.returnDate) newErrors.returnDate = 'Return date is required';
    } else {
      if (!formData.from) newErrors.from = 'Pickup location is required';
      if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSeePrices = () => {
    if (validateForm()) alert('Form is valid! Proceeding to prices...');
  };
  return (
    <div>
 {/* <BookingSection />  */}
      {/* Carousel section */}
    <div className="px-2 w-full mt-[70px]">
    <div className="mt-5">
        <TourrCarousel moduleId={4} />
      </div>
     <> <BookingForm/></>
     <h2 className="text-2xl font-semibold text-center text-black my-6">
    Explore Our Destination
  </h2>
  <Carousel images={IMGS} />
</div>
</div>
  );
}

// Export the destination data for use in routing
export { IMGS };