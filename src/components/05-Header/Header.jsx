import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logoPng.png";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";

import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const bookingDropdownRef = useRef();
  const userDropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
    setVisibleRight(false);
    setShowDropdown(false);
    setShowUserDropdown(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    setShowUserDropdown(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        bookingDropdownRef.current &&
        !bookingDropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }

      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "#3b82f6" : "#0067b6";

  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#eef0eec2]" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-center items-center h-[70px] py-10 lg:px-40">
        <div className="w-[90%] lg:w-full flex justify-between items-center px-6">
          {/* Logo */}
          <div className="flex items-center w-[20%] min-w-[100px]">
            <img
              src={logo}
              alt="Explore Vacations"
              className="h-15 lg:h-23 md:h-23 cursor-pointer"
              onClick={() => handleNavigation("/")}
            />
          </div>

          {/* Center Nav */}
          <div className="hidden lg:flex lg:px-15 flex-1 justify-between gap-10">
            <div
              className="text-[16px] cursor-pointer font-bold underline-animation"
              style={{ color: isActive("/") }}
              onClick={() => handleNavigation("/")}
            >
              Home
            </div>
            <div
              className="text-[16px] cursor-pointer font-bold underline-animation"
              style={{ color: isActive("/tours") }}
              onClick={() => handleNavigation("/tours")}
            >
              Tours
            </div>
            <div
              className="text-[16px] cursor-pointer font-bold underline-animation"
              style={{ color: isActive("/cars") }}
              onClick={() => handleNavigation("/cars")}
            >
              Cars
            </div>
            <div
              className="text-[16px] cursor-pointer font-bold underline-animation"
              style={{ color: isActive("/contact") }}
              onClick={() => handleNavigation("/contact")}
            >
              Contact
            </div>
          </div>

          {/* Right Nav */}
          {/* <div className="hidden lg:flex flex-1 justify-end gap-6 items-center relative"> */}
          {/* Booking Dropdown */}
          {/* <div className="relative" ref={bookingDropdownRef}>
              <div className="text-[16px] cursor-pointer font-bold underline-animation flex items-center" onClick={() => setShowDropdown((prev) => !prev)} style={{ color: isActive("/booking") }}>
                Booking <FaChevronDown className="ml-1 text-sm" />
              </div>

              {showDropdown && (
                <div className="absolute top-[100%] mt-2 bg-[#dfe6f1] shadow-lg rounded-md w-40 z-50">
                  {["flight", "ship", "hotel", "car"].map((type) => (
                    <div
                      key={type}
                      className="px-4 py-2 hover:bg-[#ffffff] text-[#0067b6] cursor-pointer"
                      onClick={() => handleNavigation(`/booking?type=${type}`)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)} Booking
                    </div>
                  ))}
                </div>
              )}
            </div> */}

          {/* User/Login Dropdown */}
          {/* {!isLoggedIn ? (
              <div
                className="text-[16px] cursor-pointer font-bold underline-animation"
                style={{ color: isActive("/login") }}
                onClick={() => handleNavigation("/login")}
              >
                Login
              </div>
            ) : (
              <div className="relative" ref={userDropdownRef}>
                <div className="cursor-pointer text-[20px]" title="User Profile" onClick={() => setShowUserDropdown((prev) => !prev)}>
                  <FaUserCircle className="text-[#0067b6]" />
                </div>

                {showUserDropdown && (
                  <div className="absolute right-0 top-[100%] mt-2 bg-[#dfe6f1] shadow-lg rounded-md w-32 z-50">
                    <div className="px-4 py-2 hover:bg-[#ffffff] text-[#0067b6] cursor-pointer" onClick={() => handleNavigation("/profile")}>Profile</div>
                    <div className="px-4 py-2 hover:bg-[#ffffff] text-[#0067b6] cursor-pointer" onClick={handleLogout}>Logout</div>
                  </div>
                )}
              </div>
            )} */}
          {/* </div> */}

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <Button
              icon="pi pi-bars"
              onClick={() => setVisibleRight(true)}
              className="p-button-text"
            />
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <div className="flex flex-col">
          {["/", "/tours", "/cars", "/contact"].map((path) => (
            <div
              key={path}
              className="text-[16px] cursor-pointer py-3 font-semibold"
              onClick={() => handleNavigation(path)}
            >
              {path === "/"
                ? "Home"
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </div>
          ))}

          {/* Booking */}
          {/* <div className="text-[16px] cursor-pointer py-3 font-semibold flex items-center justify-between" onClick={() => setShowMobileBooking(!showMobileBooking)}>
            Booking <FaChevronDown className={`ml-2 transform ${showMobileBooking ? "rotate-180" : ""}`} />
          </div> */}

          {/* {showMobileBooking && (
            <div className="ml-4 flex flex-col">
              {["flight", "ship", "hotel", "car"].map((type) => (
                <div key={type} className="py-2 cursor-pointer text-[#0067b6] text-sm" onClick={() => handleNavigation(`/booking?type=${type}`)}>
                  {type.charAt(0).toUpperCase() + type.slice(1)} Booking
                </div>
              ))}
            </div>
          )} */}

          {/* {!isLoggedIn ? (
            <div className="text-[16px] cursor-pointer font-bold mt-3 underline-animation" style={{ color: isActive("/login") }} onClick={() => handleNavigation("/login")}>
              Login
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-3 text-[#0067b6]">
              <div className="text-[16px] cursor-pointer font-bold" onClick={() => handleNavigation("/profile")}>Profile</div>
              <div className="text-[16px] cursor-pointer font-bold" onClick={handleLogout}>Logout</div>
            </div>
          )} */}
        </div>
      </Sidebar>
    </div>
  );
}
