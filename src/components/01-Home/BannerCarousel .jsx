// import React, { useEffect, useState } from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Axios from "axios";
// import decrypt from "../../helper";
// import image from "../../assets/tours/glamour[1].jpg";

// const BannerCarousel = ({ moduleId }) => {
//   const [banners, setBanners] = useState([]);
//   const [isHovered, setIsHovered] = useState(false);

//   const fetchBanner = async () => {
//     try {
//       const response = await Axios.get(
//         import.meta.env.VITE_API_URL + "/bookingRoutes/listhomeImageUserSide",
//         {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = decrypt(
//         response.data[1],
//         response.data[0],
//         import.meta.env.VITE_ENCRYPTION_KEY
//       );

//       if (data.success) {
//         const validBanners = data.result.filter(
//           (item) => item.refModuleId === moduleId
//         );
//         setBanners(validBanners);
//       }
//     } catch (e) {
//       console.error("Error fetching Banner:", e);
//     }
//   };

//   useEffect(() => {
//     fetchBanner();
//   }, [moduleId]);

//   return (
//     <div className="w-full m-0 p-0 mx-auto relative overflow-hidden">
//       <Carousel
//         autoPlay
//         infiniteLoop
//         showThumbs={false}
//         showStatus={false}
//         showIndicators={true}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         interval={isHovered ? 999999 : 5000}
//       >
//         {banners.map((item, index) => {
//           const imgSrc = item?.homePageImage?.content
//             ? `data:${item.homePageImage.contentType};base64,${item.homePageImage.content}`
//             : image;

//           return (
//             <div
//               key={index}
//               className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center text-white"
//               style={{ margin: 0, padding: 0, width: "100%" }}
//             >
//               {/* Background */}
//               <img
//                 src={imgSrc}
//                 alt={`Slide ${index}`}
//                 className="absolute inset-0 w-full h-full object-cover brightness-75"
//               />
//               <div
//                 className="absolute inset-0 bg-black/0 backdrop-blur-[2px]"
//                 style={{ margin: 0, padding: 0, width: "100%" }}
//               ></div>

//               {/* Content */}
//               <div className="relative z-10 px-6 text-center max-w-5xl mx-auto">
//                 <h2 className="text-2xl sm:text-4xl md:text-7xl font-bold gradient-text animate-fadeInUp">
//                   {item.homePageHeading}
//                 </h2>
//                 <p className="mt-4 text-base sm:text-lg md:text-xl font-serif animate-fadeInUp delay-100">
//                   {item.homePageContent}
//                 </p>
//                 <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp delay-200">
//                   <span className="text-sm sm:text-base md:text-6xl font-medium text-white testingFont  px-4 py-2 ">
//                     {item.refOfferName}: {item.refOffer}
//                   </span>
//                   <button className="px-6 py-2 text-4xl rounded-full testingFont  text-[#f0b71e] font-semibold ">
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </Carousel>

//       {/* Gradient Text Animation */}
//       <style jsx>{`
//         @keyframes textGradientAnimation {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }

//         @keyframes floatAnimation {
//           0% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//           100% {
//             transform: translateY(0);
//           }
//         }

//         .gradient-text {
//           background: linear-gradient(
//             45deg,
//             #e47083,
//             #ffb876,
//             #f49aa3,
//             #6c4572,
//             #a8bf89,
//             #75d1c5,
//             #a9ffe0,
//             #ffad9e,
//             #9a5371,
//             #ff726b
//           );
//           background-size: 400% 400%;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: textGradientAnimation 10s ease infinite;
//         }

//         .float-animation {
//           animation: floatAnimation 4s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BannerCarousel;


import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image1 from "../../assets/tours/glamour[1].jpg";
import image2 from "../../assets/tours/glamour[2].jpg";
import image3 from "../../assets/tours/glamour[3].jpg";

import ppt1 from "../../assets/Home1/ppt1.jpg";
import ppt3 from "../../assets/Home1/ppt3.jpg";
import ppt4 from "../../assets/Home1/ppt4.jpg";
import ppt2 from "../../assets/Home1/ppt2.jpg";
const BannerCarousel = () => {
  const images = [ ppt2 ,ppt1, ppt3 ,ppt4,];

  return (
  <div className="w-full mx-auto my-10 relative overflow-hidden">
    <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={3000}        // time between slides (ms)
        transitionTime={1000}  // smooth transition
        stopOnHover={false}    // keeps autoPlay running
        swipeable={true}
        emulateTouch={true}
        dynamicHeight={false}
      >
    {images.map((src, index) => (
      <div
        key={index}
        className="relative flex items-center justify-center w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] 
                   mt-5 mb-5 px-4 "
      >
        <img
          src={src}
          alt={`Slide ${index}`}
          className="w-full h-full object-contain rounded-lg"
          style={{
            // marginLeft: "auto",
            // marginRight: "auto",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
      </div>
    ))}
  </Carousel>
</div>

  );
};

export default BannerCarousel;
