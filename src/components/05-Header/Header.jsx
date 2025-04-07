import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logoPng.png";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setVisibleRight(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "#0067b6" : "#0067b6";
 

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#eef0eec2]" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-center items-center h-[70px] py-10 lg:px-40">
        <div className="w-[85%] lg:w-full flex justify-between items-center px-6">
          <div className="hidden lg:flex flex-1 justify-evenly">
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

          <div className="hidden lg:flex flex-1 justify-evenly">
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
              Contact
            </div>
          </div>

          <div className="lg:hidden">
            <Button
              icon="pi pi-arrow-left"
              onClick={() => setVisibleRight(true)}
            />
          </div>
        </div>
      </div>

      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <div className="flex flex-col">
          <div
            className="text-[16px] cursor-pointer py-3 font-semibold"
            onClick={() => handleNavigation("/")}
          >
            Home
          </div>
          <div
            className="text-[16px] cursor-pointer py-3 font-semibold"
            onClick={() => handleNavigation("/tours")}
          >
            Tours
          </div>
          <div
            className="text-[16px] cursor-pointer py-3 font-semibold"
            onClick={() => handleNavigation("/cars")}
          >
            Cars
          </div>
          <div
            className="text-[16px] cursor-pointer py-3 font-semibold"
            onClick={() => handleNavigation("/contact")}
          >
            Contact
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
