import React from "react";
import event from "../../assets/Booking/event.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
export default function Event() {
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
  const navigate = useNavigate();

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
  };
  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 space-y-6">
        <img src={event} alt="Event Banner" className="w-full rounded-md" />

        <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800">
          {t("event.line1")}
        </h1>

        <p className="text-gray-700 leading-relaxed">{t("event.line2")}</p>

        <ul className="list-disc list-inside text-gray-700 mx-10">
          <li> {t("event.line3")}</li>
          <li> {t("event.line4")}</li>
          <li> {t("event.line5")}</li>
          <li> {t("event.line6")}</li>
          <li> {t("event.line7")}</li>
          <li> {t("event.line8")}</li>
        </ul>

        <p className="text-gray-700 leading-relaxed">{t("event.line9")}</p>

        <p className="text-gray-700 leading-relaxed">{t("event.line10")} </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-4">
          {t("event.line11")}
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mx-10">
          <li>{t("event.line12")} </li>
          <li>{t("event.line13")}</li>
          <li>{t("event.line14")}</li>
          <li>{t("event.line15")}</li>
          <li>{t("event.line16")}</li>
        </ul>

        <p className="text-gray-700 leading-relaxed">{t("event.line17")}</p>

        <h2 className="text-lg font-semibold text-gray-800 mt-4">
          {t("event.line18")}
        </h2>
        <p className="text-gray-700 leading-relaxed">{t("event.line22")}</p>
        <p className="text-gray-700 leading-relaxed mt-2">
          {t("event.line19")}
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          {t("event.line20")}{" "}
        </p>

        <p className="text-gray-700 leading-relaxed">{t("event.line21")}</p>
      </div>

      <div
        onClick={() => handleNavigate("/contact")}
        className=" py-3 sm:px-8 max-w-1xl body mx-auto text-sm sm:text-base  leading-relaxed text-center text-[#014986] font-medium underline cursor-pointer hover:text-[#009ad7] transition"
      >
        <p>Click here to Contact..!</p>
      </div>
    </div>
  );
}
