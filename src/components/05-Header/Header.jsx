import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logoPng.png";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuStatus, setMenuStatus] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setMenuStatus(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "#0067b6" : "#0067b6";

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#eef0ee]" : "bg-transparent"
      }`}
    >
      <div
        className={`w-full flex justify-center items-center h-[70px] py-10 lg:px-40`}
      >
        <div className="w-[85%] lg:w-full flex justify-between items-center px-6">
          <div
            className="hidden lg:flex flex-1 justify-end"
            style={{ justifyContent: "space-evenly" }}
          >
            <div
              className="text-[16px] text-[#0067b6] cursor-pointer font-bold underline-animation"
              style={{ color: isActive("/") }}
              onClick={() => handleNavigation("/")}
            >
              Home
            </div>
            <div
              className="text-[16px] text-[#0067b6] cursor-pointer font-bold underline-animation"
              style={{ color: isActive("/tours") }}
              onClick={() => handleNavigation("/tours")}
            >
              Tours
            </div>
          </div>

          <div className="flex justify-center lg:w-[20%] w-[50%]">
            <img src={logo} alt="Explore Vacations" />
          </div>

          <div
            className="hidden lg:flex flex-1 justify-start"
            style={{ justifyContent: "space-evenly" }}
          >
            <div
              className="text-[16px] text-[#0067b6] cursor-pointer font-bold underline-animation"
              style={{ color: isActive("/cars") }}
              onClick={() => handleNavigation("/cars")}
            >
              Cars
            </div>
            <div
              className="text-[16px] text-[#0067b6] cursor-pointer font-bold underline-animation"
              style={{ color: isActive("/contact") }}
              onClick={() => handleNavigation("/contact")}
            >
              Customer Care
            </div>
          </div>

          <div className="w-[0%] ml-14 flex lg:hidden justify-center items-center">
            <button
              className={`relative order-10 block self-center lg:hidden ${
                menuStatus
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }`}
              onClick={() => setMenuStatus(!menuStatus)}
              aria-expanded={menuStatus}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-white transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-white transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-white transition-all duration-300"
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`w-full h-[90vh] overflow-y-auto z-50 mt-[70px] fixed top-0 left-0 transition-all duration-500 ease-in-out bg-[#2ea3f2] transform ${
          menuStatus
            ? "translate-x-0 opacity-100 visible"
            : "-translate-x-full opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-start h-full">
          <div className="w-[80%] mt-10">
            <div
              className="text-[16px] cursor-pointer py-3 font-semibold"
              style={{ color: isActive("/") }}
              onClick={() => handleNavigation("/")}
            >
              Home
            </div>
            <div
              className="text-[16px] cursor-pointer py-3 font-semibold"
              style={{ color: isActive("/tours") }}
              onClick={() => handleNavigation("/tours")}
            >
              Tours
            </div>
            <div
              className="text-[16px] cursor-pointer py-3 font-semibold"
              style={{ color: isActive("/cars") }}
              onClick={() => handleNavigation("/cars")}
            >
              Cars
            </div>
            <div
              className="text-[16px] cursor-pointer py-3 font-semibold"
              style={{ color: isActive("/contact") }}
              onClick={() => handleNavigation("/contact")}
            >
              Contact
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
