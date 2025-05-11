// BannerCarousel.tsx

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Axios from "axios";
import decrypt from "../../helper";
import "./BannerCarousel.css";
import image from "../../assets/tours/glamour[1].jpg";
const BannerCarousel = ({ moduleId }) => {
  const [banners, setBanners] = useState([]);

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
        console.log("fetchbanner--------->", data);
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
  }, []);

  return (
    <div
      className="carousel-container"
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        minHeight: "250px",
      }}
    >
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
      >
        {banners.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                position: "relative",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              <img
                src={
                  item.homePageImage
                    ? `data:${item.homePageImage.contentType};base64,${item.homePageImage.content}`
                    : image
                }
                alt={`Slide ${index}`}
                style={{ height: "500px", width: "100%", objectFit: "cover" }}
              />

              <div
                className="legend"
                style={{
                  position: "absolute",
                  bottom: "30%",
                  left: "100%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(255 255 255 / 50%)",
                  padding: "30px 40px",
                  textAlign: "center",
                  maxWidth: "600px",
                  borderRadius: "10px",
                  color: "#000",
                }}
              >
                <h2
                  style={{
                    fontSize: "2.2rem",
                    margin: "0",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.homePageHeading}
                </h2>
                <p style={{ fontSize: "1.1rem", margin: "10px 0" }}>
                  {item.homePageContent}
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "",
                    fontSize: "1.2rem",
                    marginTop: "10px",
                  }}
                >
                  {item.refOfferName}:{" "}
                  <span style={{ color: "" }}>{item.refOffer}</span>
                </p>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
