import React from "react";
import { useNavigate } from "react-router-dom";

import logoImg from "../../assets/logo/Explorelogo.png";

export default function Footer() {
  const navigate = useNavigate();


  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  return (
    <div className="footerImg">
      <div className="flex w-10/12 mx-auto gap-5 py-10 px-4 lg:flex-row flex-col">
        <div className="flex-1">
          <img src={logoImg} alt="" className="w-40 rounded-xl" />
          <p className="text-white mt-3 text-[17px] font-semibold text-justify indent-4">
            We are a full travel and tourism company in Switzerland. We offer a
            large selection of tailor-made FIT / group trips, beach tours,
            safaris and holiday expeditions to Sri Lanka.
          </p>
        </div>
        <div className="flex-1 lg:pl-5">
          <p className="text-white text-[22px] font-bold underline">
            Our Services
          </p>
          <p className="text-white py-2 text-[17px] font-semibold"   onClick={() => handleNavigate("/Tours")}>Tours</p>
          <p className="text-white py-2 text-[17px] font-semibold"    onClick={() => handleNavigate("/Cars")}>Cars</p>
          <p className="text-white py-2 text-[17px] font-semibold"    onClick={() => handleNavigate("/Contact")}>
            Contact Us
          </p>
        </div>
        {/* <div className="flex-1">
          <p className="text-white text-[22px] font-bold underline">
            Quick Links
          </p>
          <p className="text-white py-2 text-[17px] font-semibold">
           Terms and Condition
          </p>
          <p className="text-white py-2 text-[17px] font-semibold">
           Privacy Policy
          </p>
     
        </div> */}
        <div className="flex-1">
          <p className="text-white text-[22px] font-bold underline">
            Contact Information
          </p>
          <p className="text-white py-2 text-[17px] font-semibold">
            info@explorevacations.ch
          </p>
          <p className="text-white py-2 text-[17px] font-semibold">
            (+ 41) 44 442 30 35
          </p>
          <p className="text-white py-2 text-[17px] font-semibold">
            Oberfeldstrasse 10, 8302 Kloten, Switzerland
          </p>
          <p className="text-white py-2 text-[17px] font-semibold">
            371/5, Negombo Road, Seeduwa Sri Lanka Office
          </p>
        </div>
        <div className="flex-1">
          <p className="text-white text-[22px] font-bold underline">
            Social Media Links
          </p>
          <p className="text-white py-2 text-[17px] font-semibold">Facebook</p>
          <p className="text-white py-2 text-[17px] font-semibold">Instagram</p>
          <p className="text-white py-2 text-[17px] font-semibold">Twitter</p>
        </div>
      </div>
    </div>
  );
}
