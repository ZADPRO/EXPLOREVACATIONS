import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logoPng.png";
import flagEN from "../../assets/flags/english.png";
import flagDE from "../../assets/flags/german.png";
import flagFR from "../../assets/flags/french.png";
import flagIT from "../../assets/flags/italia.png";

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

  // Dropdown states
  const [showBookingDropdown, setShowBookingDropdown] = useState(false);
  const [showTransferDropdown, setShowTransferDropdown] = useState(false);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const [showMobileTransfer, setShowMobileTransfer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [language, setLanguage] = useState("en");

  // Refs for detecting outside clicks
  const bookingDropdownRef = useRef();
  const transferDropdownRef = useRef();
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
        setShowBookingDropdown(false);
      }
      if (
        transferDropdownRef.current &&
        !transferDropdownRef.current.contains(event.target)
      ) {
        setShowTransferDropdown(false);
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
    setShowBookingDropdown(false);
    setShowTransferDropdown(false);
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
    localStorage.setItem("language", lang);
  };

  const getFlag = () => {
    switch (language) {
      case "en":
        return flagEN;
      case "de":
        return flagDE;
      case "fr":
        return flagFR;
      case "it":
        return flagIT;
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
            {/* Normal Links */}
            {[
              { path: "/", label: t("header.home") },
              { path: "/tours", label: t("header.tours") },
              { path: "/cars", label: t("header.Cars") },
              // We remove transfer here because we'll add dropdown below
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
                onClick={() => setShowBookingDropdown((prev) => !prev)}
                style={{ color: isActive("/booking") }}
              >
                {t("header.Booking")} <FaChevronDown className="ml-1 text-sm" />
              </div>

              {showBookingDropdown && (
                <div className="absolute top-[100%] mt-2 bg-[#dfe6f1] shadow-lg rounded-md w-40 z-50">
                  {["flight", "ship", "hotel", "parking", "Flightform"].map(
                    (type) => (
                      <div
                        key={type}
                        className="px-4 py-2 hover:bg-white text-[#0067b6] cursor-pointer"
                        onClick={() =>
                          handleNavigation(`/booking?type=${type}`)
                        }
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                        {t("header.Booking")}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Transfer Dropdown */}
            <div className="relative" ref={transferDropdownRef}>
              <div
                className="text-[16px] cursor-pointer font-bold underline-animation flex items-center"
                onClick={() => setShowTransferDropdown((prev) => !prev)}
                style={{ color: isActive("/transfer") }}
              >
                {t("header.Transfers")}{" "}
                <FaChevronDown className="ml-1 text-sm " />
              </div>

              {showTransferDropdown && (
                <div className="absolute top-[100%] mt-2 bg-[#dfe6f1] shadow-lg rounded-md w-40 z-50">
                  {/* Add your transfer options here */}
                  {["Transfer", "event"].map((type) => (
                    <div
                      key={type}
                      className="px-4 py-2 hover:bg-white text-[#0067b6] cursor-pointer"
                      onClick={() =>
                        type === "event"
                          ? handleNavigation("/event")
                          : handleNavigation(`/transfer?type=${type}`)
                      }
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
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
                <div
                  className="flex items-center px-4 py-2 hover:bg-white cursor-pointer gap-2"
                  onClick={() => handleLanguageChange("fr")}
                >
                  <img src={flagFR} alt="French" className="w-5 h-5" />
                  French
                </div>
                <div
                  className="flex items-center px-4 py-2 hover:bg-white cursor-pointer gap-2"
                  onClick={() => handleLanguageChange("it")}
                >
                  <img src={flagIT} alt="Italian" className="w-5 h-5" />
                  Italian
                </div>
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative" ref={userDropdownRef}>
            {isLoggedIn ? (
              <>
                <FaUserCircle
                  className="text-3xl cursor-pointer text-[#0067b6]"
                  onClick={() => setShowUserDropdown((prev) => !prev)}
                />
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 bg-[#dfe6f1] shadow-lg rounded-md w-40 z-50">
                    <div
                      className="px-4 py-2 hover:bg-white cursor-pointer"
                      onClick={() => handleNavigation("/profile")}
                    >
                      {t("header.Profile")}
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-white cursor-pointer"
                      onClick={handleLogout}
                    >
                      {t("header.Logout")}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Button
                label={t("header.Login")}
                className="p-button-text"
                onClick={() => navigate("/login")}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            icon="pi pi-bars"
            className="lg:hidden"
            onClick={() => setVisibleRight(true)}
            aria-label="Menu"
          />

          {/* Mobile Sidebar */}
          <Sidebar
            visible={visibleRight}
            position="right"
            onHide={() => setVisibleRight(false)}
          >
            {/* Mobile Menu Items */}
            <div className="flex flex-col mx-5  gap-4 mt-4">
              {[
                { path: "/", label: t("header.home") },
                { path: "/tours", label: t("header.tours") },
                { path: "/cars", label: t("header.Cars") },
                { path: "/contact", label: t("header.Contact") },
              ].map(({ path, label }) => (
                <div
                  key={path}
                  className="text-lg cursor-pointer font-bold"
                  onClick={() => handleNavigation(path)}
                >
                  {label}
                </div>
              ))}

              {/* Mobile Booking Dropdown */}
              <div>
                <div
                  className="text-lg cursor-pointer font-bold flex items-center"
                  onClick={() => setShowMobileBooking((prev) => !prev)}
                >
                  {t("header.Booking")} <FaChevronDown className="ml-2" />
                </div>
                {showMobileBooking && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {["flight", "ship", "hotel", "parking", "Flightform"].map(
                      (type) => (
                        <div
                          key={type}
                          className="text-md cursor-pointer text-[#0067b6]"
                          onClick={() =>
                            handleNavigation(`/booking?type=${type}`)
                          }
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                          {t("header.Booking")}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Transfers Dropdown */}
              <div>
                <div
                  className="text-lg cursor-pointer font-bold flex items-center"
                  onClick={() => setShowMobileTransfer((prev) => !prev)}
                >
                  {t("header.Transfers")} <FaChevronDown className="ml-2" />
                </div>
                {showMobileTransfer && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {["airport", "event"].map((type) => (
                      <div
                        key={type}
                        className="text-md cursor-pointer text-[#0067b6]"
                        onClick={() =>
                          handleNavigation(`/transfer?type=${type}`)
                        }
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                       
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* User Login or Profile */}
              {isLoggedIn ? (
                <>
                  <div
                    className="text-lg cursor-pointer font-bold"
                    onClick={() => {
                      setVisibleRight(false);
                      navigate("/profile");
                    }}
                  >
                    {t("header.Profile")}
                  </div>
                  <div
                    className="text-lg cursor-pointer font-bold"
                    onClick={() => {
                      handleLogout();
                      setVisibleRight(false);
                    }}
                  >
                    {t("header.Logout")}
                  </div>
                </>
              ) : (
                <div
                  className="text-lg cursor-pointer font-bold"
                  onClick={() => {
                    navigate("/login");
                    setVisibleRight(false);
                  }}
                >
                  {t("header.Login")}
                </div>
              )}
            </div>
          </Sidebar>
        </div>
      </div>
    </div>
  );
}
