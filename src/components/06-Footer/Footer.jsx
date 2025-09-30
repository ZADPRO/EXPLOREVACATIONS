import React from "react";
import { useNavigate } from "react-router-dom";
import bgimg from "../../assets/footer/footerbg.png";
import logoImg from "../../assets/logo/logofooter.png";
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
    <div>
      <div className="w-full ">
        {" "}
        {/* <img
          src={footer}
          style={{ objectFit: "cover" }}
          alt="footer"
          className="w-full h-auto mb-0 border-0"
        /> */}
      </div>
      <div className="  bg-[#065784] -mt-2">
        {/* style={{   backgroundImage: `url(${bgimg})`,}} */}
        <div className="">
          <div className="flex  w-10/12 mx-auto gap-5 py-10 px-4 h-[full]   lg:flex-row md:flex-row  flex-col ">
            <div className="flex-1">
              <img src={logoImg} alt="" className="w-[180px] rounded-xl" />
              <p className="text-white mt-3 text-[15px] font-medium text-left tracking-[-0.015em]">
                {t("footer.footer")}
              </p>
            </div>
            <div className="flex-1 lg:pl-5">
              <p className="text-white text-[22px] font-semibold  ">
                {t("footer.Our Services")}
              </p>
              <p
                className="text-white py-2 text-[15px] font-medium cursor-pointer"
                onClick={() => handleNavigate("/Tours")}
              >
                {t("footer.Tours")}
              </p>
              <p
                className="text-white py-2 text-[15px] font-medium cursor-pointer"
                onClick={() => handleNavigate("/Cars")}
              >
                {t("footer.Cars")}
              </p>
              <p
                className="text-white py-2 text-[15px] font-medium cursor-pointer"
                onClick={() => handleNavigate("/Contact")}
              >
                {t("footer.Contact Us")}
              </p>
              <p
                className="text-white py-2 text-[15px] font-medium cursor-pointer"
                onClick={() => handleNavigate("/generalpdf")}
              >
                {t("footer.Terms and Condition")}
              </p>
              <p
                className="text-white py-2 text-[15px] font-medium cursor-pointer"
                onClick={() => handleNavigate("/privacy")}
              >
                {" "}
                {t("footer.Privacy Policy")}
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
                {t("footer.Contact Information")}
              </p>
              <p className="text-white py-2 text-[15px] font-medium">
                info@züricar.ch
              </p>
              <p className="text-white py-2 text-[15px] font-medium">
                +41 79 766 99 60
              </p>
              <p className="text-white py-2 text-[15px] font-medium">
                ZüriCar GmbH

              </p>
              <p className="text-white py-2 text-[15px] font-medium">
                Oberfeldstrasse 6
                CH-8306 Kloten
                Switzerland
              </p>
            </div>
            {/* <div className="flex-1">
              <p className="text-white text-[22px] font-bold ">
                {t("footer.Social Media Links")}
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

              <a
                href="https://www.instagram.com/evag.001111111/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-white py-2 text-[15px] font-medium">
                  Instagram
                </p>
              </a>

              <p className="text-white py-2 text-[15px] font-medium">Twitter</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
