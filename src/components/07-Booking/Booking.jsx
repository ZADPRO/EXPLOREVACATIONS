import React from "react";
import { useLocation } from "react-router-dom";
import "./Booking.css";

export default function Booking() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  // Set image based on booking type
  const backgroundClass =
  type === "flight"
    ? "bookingflight"
    : type === "ship"
    ? "bookingship"
    : type === "hotel"
    ? "bookinghotel"
    : "";

  return (
    <div>
      <div
         className={`booking-hero ${backgroundClass}`}
        style={{
                  backgroundSize: "cover",
          backgroundPosition: "center",

        }}
      >
        <div className="h-[80vh] w-full  bg-opacity-30 flex items-center justify-center"></div>
      </div>

      {type === "flight" && (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-6 bg-gray-100">
          <iframe
            src="https://partner-app.tbe2.io/index.html#/region?ngn=flight&pid=A-29505-0&cntry=&rgn=&cty=&giata=&iff=&ddate=2025-04-10&rdate=2025-04-24&dur=&attr=&trvlr=2&room=&meal=&prtr=&dep=&cat=0&rtng=0&rtnga=0&rcmnd=0&htl=&htln="
            width="100%"
            height="600"
            style={{ border: "none", borderRadius: "10px" }}
            allowFullScreen
            loading="lazy"
            title="Flight Booking"
          ></iframe>
        </div>
      )}

      {type === "ship" && (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-6 bg-gray-100">
          <iframe
            src="https://kreuzfahrten.travelsystem.de/de/suche?subid=A-29505-0"
            width="100%"
            height="600"
            style={{ border: "none", borderRadius: "10px" }}
            allowFullScreen
            loading="lazy"
            title="Ship Booking"
          ></iframe>
        </div>
      )}

      {type === "hotel" && (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-6 bg-gray-100">
          <iframe
            src="https://www.interhome.de/?partnerextra=A-29505-0&partnerid=DE0599010&iframe=true"
            width="100%"
            height="600"
            style={{ border: "none", borderRadius: "10px" }}
            allowFullScreen
            loading="lazy"
            title="Hotel Booking"
          ></iframe>
        </div>
      )}
    
    </div>
  );
}
