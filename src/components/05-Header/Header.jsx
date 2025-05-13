import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logoPng.png";
import flagEN from "../../assets/flags/english.png";
import flagDE from "../../assets/flags/german.png";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";

import "./Header.css";
import { useTranslation } from "react-i18next";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [language, setLanguage] = useState("en");

  const bookingDropdownRef = useRef();
  const userDropdownRef = useRef();
  const langDropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const isActive = (path) =>
    location.pathname === path ? "#3b82f6" : "#0067b6";

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowLangDropdown(false);
    handleChangeLang(lang);
    // Optionally: Save to localStorage and/or trigger i18n
    localStorage.setItem("language", lang);
  };

  const getFlag = () => {
    switch (language) {
      case "en":
        return flagEN;
      case "de":
        return flagDE;
      default:
        return flagEN;
    }
  };

  const { t, i18n } = useTranslation("global");

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
   <div
  className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
    scrolled
      ? "bg-[#eef0eec2]"
      : "bg-transparent md:bg-white/30 md:backdrop-blur-lg"
  }`}
>
<div className="w-full flex justify-center items-center h-[70px] py-10 px-6 md:px-12 lg:px-40">
        <div className="w-full flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center w-[30%] min-w-[100px]">
            <img
              src={logo}
              alt="Explore Vacations"
              className="h-15 lg:h-23 md:h-23 cursor-pointer"
              onClick={() => handleNavigation("/")}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 gap-10">
            {[
              { path: "/", label: t("header.home") },
              { path: "/tours", label: t("header.tours") },
              { path: "/cars", label: t("header.Cars") },
              { path: "/transfer", label: t("header.Transfers") },
              { path: "/contact", label: t("header.Contact") },
            ].map(({ path, label }) => (
              <div
                key={path}
                className="text-[16px] cursor-pointer font-bold underline-animation"
                style={{ color: isActive(path) }}
                onClick={() => handleNavigation(path)}
              >
                {label}
              </div>
            ))}

            {/* Booking Dropdown */}
            <div className="relative" ref={bookingDropdownRef}>
              <div
                className="text-[16px] cursor-pointer font-bold underline-animation flex items-center"
                onClick={() => setShowDropdown((prev) => !prev)}
                style={{ color: isActive("/booking") }}
              >
                {t("header.Booking")} <FaChevronDown className="ml-1 text-sm" />
              </div>

              {showDropdown && (
                <div className="absolute top-[100%] mt-2 bg-[#dfe6f1] shadow-lg rounded-md w-40 z-50">
                  {["flight", "ship", "hotel", "parking"].map((type) => (
                    <div
                      key={type}
                      className="px-4 py-2 hover:bg-white text-[#0067b6] cursor-pointer"
                      onClick={() => handleNavigation(`/booking?type=${type}`)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                      {t("header.Booking")}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="relative mr-4" ref={langDropdownRef}>
            <img
              src={getFlag()}
              alt="Language"
              className="h-6 w-6 rounded-full cursor-pointer"
              onClick={() => setShowLangDropdown((prev) => !prev)}
            />
            {showLangDropdown && (
              <div className="absolute right-0 mt-2 bg-[#dfe6f1] shadow-lg rounded-md w-32 z-50">
                <div
                  className="flex items-center px-4 py-2 hover:bg-white cursor-pointer gap-2"
                  onClick={() => handleLanguageChange("en")}
                >
                  <img src={flagEN} alt="English" className="w-5 h-5" />
                  English
                </div>
                <div
                  className="flex items-center px-4 py-2 hover:bg-white cursor-pointer gap-2"
                  onClick={() => handleLanguageChange("de")}
                >
                  <img src={flagDE} alt="German" className="w-5 h-5" />
                  German
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          {!isLoggedIn ? (
            <div
              className="text-[16px] cursor-pointer font-bold underline-animation"
              style={{ color: isActive("/login") }}
              onClick={() => handleNavigation("/login")}
            >
              Login
            </div>
          ) : (
            <div className="relative" ref={userDropdownRef}>
              <div
                className="cursor-pointer text-[20px]"
                title="User Profile"
                onClick={() => setShowUserDropdown((prev) => !prev)}
              >
                <FaUserCircle className="text-[#0067b6]" />
              </div>

              {showUserDropdown && (
                <div className="absolute right-0 top-[100%] mt-2 bg-[#dfe6f1] shadow-lg rounded-md w-32 z-50">
                  <div
                    className="px-4 py-2 hover:bg-white text-[#0067b6] cursor-pointer"
                    onClick={() => handleNavigation("/profile")}
                  >
                    {t("header.Profile")}
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-white text-[#0067b6] cursor-pointer"
                    onClick={handleLogout}
                  >
                    {t("header.Logout")}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Button
              icon="pi pi-bars"
              onClick={() => setVisibleRight(true)}
              className="p-button-text"
            />
          </div>
        </div>
      </div>

      {/* Sidebar for mobile */}
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <div className="flex flex-col">
          {[
            { path: "/", label: t("header.home") },
            { path: "/tours", label: t("header.tours") },
            { path: "/cars", label: t("header.Cars") },
            { path: "/transfer", label: t("header.Transfers") },
            { path: "/contact", label: t("header.Contact") },
          ].map((item) => (
            <div
              key={item.path}
              className="text-[16px] cursor-pointer py-3 font-semibold"
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </div>
          ))}

          {/* Mobile Booking Dropdown */}
          <div
            className="text-[16px] cursor-pointer py-3 font-semibold flex items-center justify-between"
            onClick={() => setShowMobileBooking(!showMobileBooking)}
          >
            {t("header.Booking")}
            <FaChevronDown
              className={`ml-2 transform ${
                showMobileBooking ? "rotate-180" : ""
              }`}
            />
          </div>

          {showMobileBooking && (
            <div className="ml-4 flex flex-col">
              {["flight", "ship", "hotel", "parking"].map((type) => (
                <div
                  key={type}
                  className="py-2 cursor-pointer text-[#0067b6] text-sm"
                  onClick={() => handleNavigation(`/booking?type=${type}`)}
                >
                  {t(`header.${type}`)} {t("header.Booking")}
                </div>
              ))}
            </div>
          )}

          {!isLoggedIn ? (
            <div
              className="text-[16px] cursor-pointer font-bold mt-3 underline-animation"
              style={{ color: isActive("/login") }}
              onClick={() => handleNavigation("/login")}
            >
              {t("header.Login")}
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-3 text-[#0067b6]">
              <div
                className="text-[16px] cursor-pointer font-bold"
                onClick={() => handleNavigation("/profile")}
              >
                {t("header.Profile")}
              </div>
              <div
                className="text-[16px] cursor-pointer font-bold"
                onClick={handleLogout}
              >
                {t("header.Logout")}
              </div>
            </div>
          )}
        </div>
      </Sidebar>
    </div>
  );
}
