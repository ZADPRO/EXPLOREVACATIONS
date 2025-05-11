import React, { useRef, useState, useEffect } from "react";
import Popup from "../../pages/Popup/Popup";

export default function Travel() {
  return (
    <div>
         <Popup />
       <div className="toursPageContents02 flex flex-col justify-end items-center min-h-[80vh] px-4 text-center">
              {/* Centered Text */}
              <h1 className="text-4xl md:text-6xl mb-5 lg:text-7xl font-bold bg-gradient-to-r from-[#ff7e00] via-[#ffa94d] to-[#ffffff] text-transparent bg-clip-text testingFont">
  Rides as smooth as your favorite playlist
</h1>



      
          
            </div>
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-6 bg-gray-100">
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
    </div>
  );
}
