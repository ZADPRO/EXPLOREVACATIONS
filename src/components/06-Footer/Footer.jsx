import React from "react";

import logoImg from "../../assets/logo/logo.jpg";

export default function Footer() {
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
        <div className="flex-1 pl-5">
          <p className="text-white text-[22px] font-bold ">Our Services</p>
          <p className="text-white py-2 text-[17px] font-semibold">Tours</p>
          <p className="text-white py-2 text-[17px] font-semibold">Cars</p>
          <p className="text-white py-2 text-[17px] font-semibold">
            Contact Us
          </p>
        </div>
        <div className="flex-1">
          <p className="text-white text-[22px] font-bold ">
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
          <p className="text-white">
            371/5, Negombo Road, Seeduwa Sri Lanka Office
          </p>
        </div>
        <div className="flex-1">
          <p className="text-white text-[22px] font-bold ">
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
