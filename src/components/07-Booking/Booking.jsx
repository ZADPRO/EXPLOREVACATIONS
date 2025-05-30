import React from "react";
import { useLocation } from "react-router-dom";
import "./Booking.css";
import { useTranslation } from "react-i18next";
import Parking from "../11-Parking/Parking";
import Flight from "../15-FlightBooking/Flight";
import Event from "./Event";

export default function Booking() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const { t, i18n } = useTranslation("global");

  // Set image based on booking type
  const backgroundClass =
    type === "flight"
      ? "bookingflight"
      : type === "ship"
      ? "bookingship"
      : type === "hotel"
      ? "bookinghotel"
      : type === "parking"
      ? "bookingparking"
      : type === "Flightform"
      ? "eventcontent"
      : type === "event"
      ? "event"
      : "";

  return (
    <div>
      {/* Background Hero Section (for all types except flightform) */}
      {type !== "Flightform" && type !== "parking" && type !== "event" && (
        <div
          className={`booking-hero ${backgroundClass}`}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="h-[80vh] w-full bg-opacity-30 flex items-center justify-center"></div>
        </div>
      )}

      {/* Parking Form */}
      {type === "parking" && (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen lg:p-6 md:p-6 p-0 bg-gray-100">
          <Parking />
        </div>
      )}

      {/* Flight Booking Form (custom React component) */}
      {type === "Flightform" && (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen lg:p-6 md:p-6 p-0 ">
          <Flight />
        </div>
      )}
      {type === "event" && (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen lg:p-6 md:p-6 p-0 bg-gray-100">
          <Event />
        </div>
      )}

      {/* Embedded Flight Iframe */}
      {type === "flight" && (
        <div style={{margin:0}} className="flex flex-col md:flex-row justify-center items-center min-h-[100vh] bg-[#e6e6e6] m-0  ">
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

      {/* Ship Iframe */}
      {type === "ship" && (
      <div className="flex flex-col md:flex-row justify-center items-center min-h-[100vh] bg-[#e6e6e6]  ">
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

      {/* Hotel Iframe */}
      {type === "hotel" && (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-[100vh] bg-[#e6e6e6]  ">
          <iframe
            src="https://www.interhome.de/?partnerextra=A-29505-0&partnerid=DE0599010&iframe=true"
            width="100%"
            height="600"
            style={{ border: "none", borderRadius: "10px" }}
            allowFullScreen
            loading="lazy"
            title="Book a hotel"
          ></iframe>
        </div>
      )}
    </div>
  );
}
