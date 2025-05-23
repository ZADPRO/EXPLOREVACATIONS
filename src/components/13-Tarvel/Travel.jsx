import React, { useRef, useState, useEffect } from "react";
import Popup from "../../pages/Popup/Popup";

import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import RollingGallery from "./RollingGallery";



export default function Travel() {
  return (
    <div>
      <Popup />
      
      <div className="flex h-[100vh] mt-10 lg:mt-20  flex-col md:flex-row justify-center items-center min-h-screen p-3 bg-gray-100">
        <iframe
          src="https://explorevacations.yelowtaxi.com/ride/add"
          width="100%"
          height="600"
          style={{ border: "none", borderRadius: "10px" }}
          allowFullScreen
          loading="lazy"
          title="Car Booking"
        ></iframe>
      </div>


      <div>
        <RollingGallery autoplay pauseOnHover />
      </div>
    </div>
  );
}
