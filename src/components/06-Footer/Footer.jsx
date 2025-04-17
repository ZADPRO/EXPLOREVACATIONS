import React from "react";
import { useNavigate } from "react-router-dom";
import bgimg from "../../assets/footer/footerbg.png";
import logoImg from "../../assets/logo/Explorelogo.png";
import footer from "../../assets/footer/footer.png";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <div>
        {" "}
        <img src={footer} alt="footer" className="mb-0 border-0" />
      </div>
      <div className="  bg-[#065784] -mt-2">
        {/* style={{   backgroundImage: `url(${bgimg})`,}} */}
        <div className="">
          <div className="flex  w-10/12 mx-auto gap-5 py-10 px-4 h-[full]   lg:flex-row md:flex-row  flex-col ">
            <div className="flex-1">
              <img src={logoImg} alt="" className="w-40 rounded-xl" />
              <p className="text-white mt-3 text-[15px] font-medium text-justify tracking-[-0.015em]">
                We are a full travel and tourism company in Switzerland. We
                offer a large selection of tailor-made FIT / group trips, beach
                tours, safaris and holiday expeditions to Sri Lanka.
              </p>
            </div>
            <div className="flex-1 lg:pl-5">
              <p className="text-white text-[22px] font-semibold  ">
                Our Services
              </p>
              <p
                className="text-white py-2 text-[15px] font-medium cursor-pointer"
                onClick={() => handleNavigate("/Tours")}
              >
                Tours
              </p>
              <p
                className="text-white py-2 text-[15px] font-medium cursor-pointer"
                onClick={() => handleNavigate("/Cars")}
              >
                Cars
              </p>
              <p
                className="text-white py-2 text-[15px] font-medium cursor-pointer"
                onClick={() => handleNavigate("/Contact")}
              >
                Contact Us
              </p>
              <p
                className="text-white py-2 text-[15px] font-medium cursor-pointer"
                onClick={() => handleNavigate("/terms")}
              >
                Terms and Condition
              </p>
              <p
                className="text-white py-2 text-[15px] font-medium cursor-pointer"
                onClick={() => handleNavigate("/privacy")}
              >
                Privacy Policy
              </p>
            </div>
            {/* <div className="flex-1">
          <p className="text-white text-[22px] font-bold ">
            Quick Links
          </p>
          <p className="text-white py-2 text-[15px] font-medium">
           Terms and Condition
          </p>
          <p className="text-white py-2 text-[15px] font-medium">
           Privacy Policy
          </p>
     
        </div> */}
            <div className="flex-1">
              <p className="text-white text-[22px] font-bold ">
                Contact Information
              </p>
              <p className="text-white py-2 text-[15px] font-medium">
                info@explorevacations.ch
              </p>
              <p className="text-white py-2 text-[15px] font-medium">
                (+ 41) 44 442 30 35
              </p>
              <p className="text-white py-2 text-[15px] font-medium">
                Oberfeldstrasse 10, 8302 Kloten, Switzerland
              </p>
              <p className="text-white py-2 text-[15px] font-medium">
                371/5, Negombo Road, Seeduwa Sri Lanka Office
              </p>
            </div>
            <div className="flex-1">
              <p className="text-white text-[22px] font-bold ">
                Social Media Links
              </p>
              <a
                href="https://www.facebook.com/share/1BeRaztYie/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-white py-2 text-[15px] font-medium">
                  Facebook
                </p>
              </a>

              <p className="text-white py-2 text-[15px] font-medium">
                Instagram
              </p>
              <p className="text-white py-2 text-[15px] font-medium">Twitter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
