import React from "react";
import { useNavigate } from "react-router-dom";
import bgimg from "../../assets/footer/footerbg.png";
import logoImg from "../../assets/logo/latestLogo.png";
import footer from "../../assets/footer/footer.png";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
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
    <div className="w-full">
      {/* 🔹 Top 20% Yellow Section with Logo */}
      <div className="bg-[#065784] py-2 px-6 flex flex-col items-center text-center">
        <img src={logoImg} alt="ZuriCar Logo" className="w-[150px] mb-4" />
        <p className="text-white text-[15px] max-w-[130vh] font-medium tracking-[-0.015em]">
          {t("footer.footer")}
        </p>
      </div>

      {/* 🔹 Bottom Menus Section */}
      <div className="bg-[#065784]">
        <div className="w-11/12 mx-auto py-10 flex flex-wrap lg:flex-nowrap gap-8 justify-between text-white">
          {/* Grow with ZuriCar */}
          <div className="flex-1 min-w-[200px] ml-26 mb-5  md:ml-0 md:mt-0">
            <h3 className="text-[22px] font-semibold mb-3">
              {t("footer.grow_with_zuricar")}
            </h3>
            <p
              className="cursor-pointer py-1 hover:text-yellow-300"
              onClick={() => handleNavigate("/becomePartner")}
            >
              {t("footer.become_partner")}
            </p>
            <p
              className="cursor-pointer py-1 hover:text-yellow-300"
              onClick={() => handleNavigate("/becometransfer")}
            >
              {t("footer.become_transfer_partner")}
            </p>
            <p
              className="cursor-pointer py-1 hover:text-yellow-300"
              onClick={() => handleNavigate("/becometravelagency")}
            >
              {t("footer.travel_agency_partnership")}
            </p>
          </div>
          {/* Our Services */}
          <div className="flex-1 min-w-[100px] ml-26 mt-[-71px]  md:ml-0 md:mt-0">
            <h3 className="text-[22px] font-semibold mb-3">
              {t("footer.Our Services")}
            </h3>
            <p
              className="cursor-pointer py-1 hover:text-yellow-300"
              onClick={() => handleNavigate("/Cars")}
            >
              {t("footer.Cars")}
            </p>
            <p
              className="cursor-pointer py-1 hover:text-yellow-300"
              onClick={() => handleNavigate("/Tours")}
            >
              {t("footer.Tours")}
            </p>
            <p
              className="cursor-pointer py-1 hover:text-yellow-300"
              onClick={() => handleNavigate("/Contact")}
            >
              {t("footer.Contact Us")}
            </p>
          </div>
          {/* About Us */}
          <div className="flex-1 min-w-[200px] ml-26 mt-[-51px]  md:ml-0 md:mt-0 ">
            <h3 className="text-[22px] font-semibold mb-3">
              {t("footer.about_us")}
            </h3>
            <p
              className="cursor-pointer py-1 hover:text-yellow-300"
              onClick={() => handleNavigate("/generalpdf")}
            >
              {t("footer.Terms and Conditions")}
            </p>
            <p
              className="cursor-pointer py-1 hover:text-yellow-300"
              onClick={() => handleNavigate("/privacy")}
            >
              {t("footer.Privacy Policy")}
            </p>
            <p
              className="cursor-pointer py-1 hover:text-yellow-300"
              onClick={() => handleNavigate("/impressum")}
            >
              {t("Impressum")}
            </p>
            <p
              className="cursor-pointer py-1 hover:text-yellow-300"
              onClick={() => handleNavigate("/cookies")}
            >
              {t("Cookies")}
            </p>
          </div>
          {/* Contact Info */}
          <div className="flex-1 min-w-[200px] ml-26 mt-[-51px]  md:ml-0 md:mt-0">
            <h3 className="text-[22px] font-semibold mb-3">
              {t("footer.Contact Information")}
            </h3>
            <p className="text-[15px] py-1">info@zuricar.ch</p>
            <p className="text-[15px] py-1">+41 79 766 99 60</p>
            <p className="text-[15px] py-1">ZüriCar GO GmbH</p>
            <p className="text-[15px] py-1 leading-tight">
              Europa-Strasse 19
              <br />
              8152 Glattbrugg (ZH), Switzerland
            </p>
          </div>
        </div>
        {/* 🔹 Bottom Small Line */}
        <div className="border-t border-white/20 py-4 text-center text-sm text-white">
          © {new Date().getFullYear()} ZüriCar GO GmbH. All rights reserved.
        </div>
      </div>
    </div>
  );
}
