import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Axios from "axios";
import decrypt from "../../helper";
import image from "../../assets/tours/glamour[1].jpg";

const BannerCarousel = ({ moduleId }) => {
  const [banners, setBanners] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const fetchBanner = async () => {
    try {
      const response = await Axios.get(
        import.meta.env.VITE_API_URL + "/bookingRoutes/listhomeImageUserSide",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      if (data.success) {
        const validBanners = data.result.filter(
          (item) => item.refModuleId === moduleId
        );
        setBanners(validBanners);
      }
    } catch (e) {
      console.error("Error fetching Banner:", e);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, [moduleId]);

  return (
    <div className="w-full max-w-7xl mx-auto relative overflow-hidden">
      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes textGradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes floatAnimation {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .gradient-text {
          background: linear-gradient(
            45deg,
            #ff6b6b,
            #4ecdc4,
            #45b7d1,
            #f9d56e
          );
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textGradientAnimation 10s ease infinite;
        }

        .float-animation {
          animation: floatAnimation 4s ease-in-out infinite;
        }
      `}</style>

      {/* Main Banner Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        // className="shadow-2xl rounded-3xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        interval={isHovered ? 10000000 : 5000}
      >
        {banners.map((item, index) => (
          <div key={index} className="relative group">
            {/* Image with overlay */}
            <div className="relative overflow-hidden">
              <img
                src={
                  item.homePageImage
                    ? `data:${item.homePageImage.contentType};base64,${item.homePageImage.content}`
                    : image
                }
                alt={`Slide ${index}`}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-blue-500/30 opacity-60 group-hover:opacity-70 transition-opacity duration-500"></div>
            </div>

            {/* Text Overlay */}
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full max-w-[90%] sm:max-w-2xl px-4 sm:px-6">
              <div className="bg-white/50 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-4xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 sm:mb-4 gradient-text uppercase tracking-wide text-center sm:text-left">
                  {item.homePageHeading}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-black mb-3 sm:mb-5 italic font-light tracking-wide text-center sm:text-left">
                  {item.homePageContent}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 sm:mt-6 gap-2 sm:gap-0 text-center sm:text-left">
                  <span className="text-base sm:text-lg font-semibold text-black">
                    {item.refOfferName}:
                  </span>
                  <span className="text-base sm:text-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-3 sm:px-4 py-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 inline-block">
                    {item.refOffer}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Grid of Smaller Banners */}
      {/* {banners.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {banners.map((item, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden shadow-lg h-64 group">
           
              <img
                src={
                  item.homePageImage
                    ? `data:${item.homePageImage.contentType};base64,${item.homePageImage.content}`
                    : image
                }
                alt={item.homePageHeading}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-blue-500/30 opacity-70"></div>
              
          
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-2xl font-serif italic">
                    {item.homePageHeading}
                  </h3>
                  <p className="text-white text-sm mt-1 line-clamp-2">
                    {item.homePageContent}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="bg-white/80 text-blue-600 font-bold py-1 px-3 rounded-full text-sm">
                    {item.refOffer}
                  </span>
                  <button className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-1 px-3 rounded-lg text-sm transition-all duration-300 transform hover:scale-105">
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default BannerCarousel;
